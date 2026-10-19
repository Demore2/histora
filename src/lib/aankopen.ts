import { Platform } from 'react-native';

import { supabase } from '@/lib/supabase';

/**
 * Google Play Billing via RevenueCat, als bedoelingen in plaats van als API. Zelfde vorm als
 * `lib/push.ts` en `lib/analytics.ts`:
 *
 * 1. **Niets hierin gooit ooit.** Elke functie geeft een uitkomst terug in plaats van een fout,
 *    zodat de paywall zelf beslist wat hij zegt.
 * 2. **De SDK wordt lui ge`require`d achter een `Platform`-controle.** `react-native-purchases`
 *    is native: op web (waar dit project zijn schermen bekijkt) en in een dev-client van vóór deze
 *    wijziging bestaat hij niet, en een statische `import` laat de app daar omvallen.
 * 3. **Zonder sleutel is er niets.** `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` is de *publieke*
 *    SDK-sleutel (`goog_…`) en mag in de bundel. Ontbreekt hij, dan is `aankopen.beschikbaar`
 *    onwaar en toont de paywall de oude "binnenkort"-stand. De *geheime* sleutel (`sk_…`) hoort
 *    uitsluitend in de secrets van de edge function `revenuecat-sync`, nooit hier.
 *
 * **Deze module zet nooit zelf premium.** Na een aankoop vraagt hij `revenuecat-sync` om de
 * serverrij bij te werken; die vraagt de stand op bij RevenueCat en schrijft met de service role.
 * Wat de app hier van RevenueCat terugkrijgt (`premiumTot`) wordt alleen gebruikt om Pro op dít
 * toestel meteen te tonen, zonder te wachten op die ronde — zie `pasWinkelstandToe` in
 * `subscription-store`.
 */

type AankoopSdk = typeof import('react-native-purchases');
type Purchases = AankoopSdk['default'];
export type KlantInfo = Awaited<ReturnType<Purchases['getCustomerInfo']>>;
export type Pakket = Awaited<ReturnType<Purchases['getOfferings']>>['all'][string]['availablePackages'][number];

/** Het entitlement-id zoals het in het RevenueCat-dashboard heet. Zelfde waarde als in `revenuecat-sync`. */
export const PREMIUM_ENTITLEMENT = 'premium';

const SLEUTEL = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY?.trim();

/** `undefined` = nog niet geprobeerd, `null` = niet beschikbaar op dit platform of deze build. */
let sdk: AankoopSdk | null | undefined;
let geconfigureerdVoor: string | null = null;
let waarschuwingGetoond = false;

function laad(): AankoopSdk | null {
  if (!SLEUTEL) return null;
  // Alleen Android: de iOS-kant heeft een eigen sleutel (`appl_…`) en een App Store-product, en
  // die bestaan nog niet.
  if (Platform.OS !== 'android') return null;
  if (sdk === null) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    sdk ??= require('react-native-purchases') as AankoopSdk;
    return sdk;
  } catch (fout) {
    sdk = null;
    if (!waarschuwingGetoond) {
      waarschuwingGetoond = true;
      // Eén keer. Bijna altijd "de dev-client is niet opnieuw gebouwd".
      console.warn('[aankopen] RevenueCat niet beschikbaar, aankopen worden overgeslagen:', fout);
    }
    return null;
  }
}

/** Wanneer het premium-recht volgens de winkel afloopt: epoch-ms, `Infinity` voor levenslang, `null` voor geen. */
export function premiumTot(info: KlantInfo): number | null {
  const recht = info.entitlements.active[PREMIUM_ENTITLEMENT];
  if (!recht) return null;
  return recht.expirationDateMillis ?? Number.POSITIVE_INFINITY;
}

export type AankoopUitkomst =
  | { soort: 'gekocht'; info: KlantInfo }
  | { soort: 'afgebroken' }
  /** Google houdt de betaling vast (bijv. contant betalen bij een winkel). Nog geen Pro. */
  | { soort: 'in-behandeling' }
  | { soort: 'mislukt'; melding: string };

export type HerstelUitkomst =
  | { soort: 'hersteld'; info: KlantInfo }
  | { soort: 'niets-gevonden' }
  | { soort: 'mislukt'; melding: string };

function foutCode(fout: unknown): string | undefined {
  return typeof fout === 'object' && fout !== null && 'code' in fout
    ? String((fout as { code: unknown }).code)
    : undefined;
}

function foutMelding(fout: unknown): string {
  if (typeof fout === 'object' && fout !== null && 'message' in fout) {
    return String((fout as { message: unknown }).message);
  }
  return String(fout);
}

/**
 * Laat `revenuecat-sync` de serverrij gelijkzetten met RevenueCat. Fire-and-forget voor de
 * aanroeper: mislukt dit, dan vangt de webhook het later alsnog op.
 */
async function vraagServerSync(): Promise<boolean> {
  try {
    const { error } = await supabase.functions.invoke('revenuecat-sync', { method: 'POST' });
    if (error) throw error;
    return true;
  } catch (fout) {
    console.warn('[aankopen] revenuecat-sync mislukt, de webhook haalt dit later in:', fout);
    return false;
  }
}

export const aankopen = {
  /** Staat Billing op dit platform, in deze build en met een sleutel tot onze beschikking? */
  get beschikbaar(): boolean {
    return laad() !== null;
  },

  /**
   * Koppelt RevenueCat aan deze lezer. **`appUserID` is het Supabase-user-id**, en dat is het hele
   * punt: zo weet de webhook bij welke rij in `user_subscriptions` een aankoop hoort. Een anonieme
   * RevenueCat-klant zou een aankoop opleveren die bij niemand terechtkomt.
   *
   * Idempotent: dezelfde lezer opnieuw is een no-op, een andere lezer is een `logIn`.
   */
  async koppel(userId: string): Promise<KlantInfo | null> {
    const geladen = laad();
    if (!geladen) return null;
    const Purchases = geladen.default;
    try {
      if (geconfigureerdVoor === null) {
        Purchases.configure({ apiKey: SLEUTEL as string, appUserID: userId });
        geconfigureerdVoor = userId;
        return await Purchases.getCustomerInfo();
      }
      if (geconfigureerdVoor !== userId) {
        const { customerInfo } = await Purchases.logIn(userId);
        geconfigureerdVoor = userId;
        return customerInfo;
      }
      return await Purchases.getCustomerInfo();
    } catch (fout) {
      console.warn('[aankopen] koppelen mislukt:', fout);
      return null;
    }
  },

  /** Ontkoppelt bij uitloggen, zodat een volgende lezer op dit toestel niet andermans aankopen ziet. */
  async ontkoppel(): Promise<void> {
    const geladen = laad();
    if (!geladen || geconfigureerdVoor === null) return;
    try {
      await geladen.default.logOut();
    } catch {
      // `logOut` gooit als de klant al anoniem is. Dat is precies de stand die we willen.
    }
    geconfigureerdVoor = null;
  },

  /** Luistert naar wijzigingen die RevenueCat zelf ziet (verlenging, opzegging, herstel). */
  luister(terugroep: (info: KlantInfo) => void): () => void {
    const geladen = laad();
    if (!geladen) return () => {};
    try {
      geladen.default.addCustomerInfoUpdateListener(terugroep);
      return () => {
        try {
          geladen.default.removeCustomerInfoUpdateListener(terugroep);
        } catch {
          // Niets aan te doen.
        }
      };
    } catch {
      return () => {};
    }
  },

  /**
   * De pakketten uit de huidige offering, zoals ze in het RevenueCat-dashboard staan. **De prijzen
   * komen van Google** (`product.priceString`), in de valuta van de lezer — dus geen bedrag uit
   * i18n meer zodra dit iets teruggeeft.
   */
  async haalPakkettenOp(): Promise<Pakket[]> {
    const geladen = laad();
    if (!geladen || geconfigureerdVoor === null) return [];
    try {
      const aanbod = await geladen.default.getOfferings();
      return aanbod.current?.availablePackages ?? [];
    } catch (fout) {
      console.warn('[aankopen] offerings ophalen mislukt:', fout);
      return [];
    }
  },

  async koop(pakket: Pakket): Promise<AankoopUitkomst> {
    const geladen = laad();
    if (!geladen) return { soort: 'mislukt', melding: 'niet_beschikbaar' };
    const codes = geladen.default.PURCHASES_ERROR_CODE;
    try {
      const { customerInfo } = await geladen.default.purchasePackage(pakket);
      // Wacht hier niet op: de lezer ziet Pro meteen via `premiumTot`, en de serverronde vult de
      // rij aan op de achtergrond.
      void vraagServerSync();
      return { soort: 'gekocht', info: customerInfo };
    } catch (fout) {
      const code = foutCode(fout);
      if (code === codes.PURCHASE_CANCELLED_ERROR) return { soort: 'afgebroken' };
      if (code === codes.PAYMENT_PENDING_ERROR) return { soort: 'in-behandeling' };
      return { soort: 'mislukt', melding: foutMelding(fout) };
    }
  },

  /**
   * "Aankopen herstellen". Verplicht in elke paywall die een abonnement verkoopt: wie de app
   * opnieuw installeert of een nieuw toestel heeft, moet zijn lopende abonnement terug kunnen
   * halen zonder opnieuw te betalen.
   */
  async herstel(): Promise<HerstelUitkomst> {
    const geladen = laad();
    if (!geladen) return { soort: 'mislukt', melding: 'niet_beschikbaar' };
    try {
      const info = await geladen.default.restorePurchases();
      void vraagServerSync();
      return premiumTot(info) === null ? { soort: 'niets-gevonden' } : { soort: 'hersteld', info };
    } catch (fout) {
      return { soort: 'mislukt', melding: foutMelding(fout) };
    }
  },

  vraagServerSync,
};
