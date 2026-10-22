import { Platform } from 'react-native';

import { ADMOB_EENHEDEN } from '@/constants/advertenties';
import { useAdvertentieStore } from '@/store/advertentie-store';

/**
 * AdMob, als bedoelingen in plaats van als API. Zelfde vorm als `lib/aankopen.ts` en `lib/push.ts`:
 *
 * 1. **Niets hierin gooit ooit.** Een advertentie is inkomsten, geen functie van de app; als hij
 *    niet laadt hoort de lezer gewoon verder te lezen.
 * 2. **De SDK wordt lui ge`require`d achter een `Platform`-controle.** Hij is native: op web (waar
 *    dit project zijn schermen bekijkt) en in een dev-client van vóór v1.2 bestaat hij niet.
 * 3. **Mislukt het laden één keer, dan niet opnieuw.** `sdk === null` is "hier is niets".
 *
 * **Eerst toestemming, dan pas de SDK.** `startAdvertenties()` vraagt via Google's UMP om
 * toestemming (alleen waar de wet dat eist — de EU, het VK, Zwitserland) en roept pas daarna
 * `initialize()` aan. Andersom stuurt de SDK al een verzoek uit voordat de lezer iets kon kiezen.
 * Valt de toestemming weg (`canRequestAds` onwaar), dan blijft alles stil.
 *
 * **Pro-lezers komen hier nooit**: `useAdvertenties()` start dit alleen voor een gratis lezer, zodat
 * wie betaalt ook geen toestemmingsvenster te zien krijgt voor advertenties die hij nooit ziet.
 */

type AdSdk = typeof import('react-native-google-mobile-ads');
type Interstitial = ReturnType<AdSdk['InterstitialAd']['createForAdRequest']>;

/** `undefined` = nog niet geprobeerd, `null` = niet beschikbaar op dit platform of deze build. */
let sdk: AdSdk | null | undefined;
let waarschuwingGetoond = false;
let start: Promise<boolean> | null = null;
let interstitial: Interstitial | null = null;
let interstitialGeladen = false;

export function laadAdSdk(): AdSdk | null {
  // Alleen Android: er is geen iOS-app, en dus ook geen iOS-app-ID in AdMob.
  if (Platform.OS !== 'android') return null;
  if (sdk === null) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    sdk ??= require('react-native-google-mobile-ads') as AdSdk;
    return sdk;
  } catch (fout) {
    sdk = null;
    if (!waarschuwingGetoond) {
      waarschuwingGetoond = true;
      // Eén keer. Bijna altijd "de dev-client is niet opnieuw gebouwd".
      console.warn('[advertenties] AdMob niet beschikbaar, advertenties worden overgeslagen:', fout);
    }
    return null;
  }
}

/**
 * De eenheid voor deze plek, of `null` als er op deze plek niets hoort te komen.
 *
 * In `__DEV__` altijd de test-eenheid van Google, ook als de echte al is ingevuld: een eigen
 * advertentie aantikken tijdens het testen is voor AdMob ongeldig verkeer.
 */
export function eenheidVoor(plek: 'banner' | 'interstitial'): string | null {
  const ad = laadAdSdk();
  if (!ad) return null;
  if (__DEV__) return plek === 'banner' ? ad.TestIds.ADAPTIVE_BANNER : ad.TestIds.INTERSTITIAL;
  return ADMOB_EENHEDEN[plek];
}

/**
 * Toestemming vragen en de SDK starten. Idempotent: een tweede aanroep krijgt dezelfde belofte.
 *
 * Geeft `true` als er advertenties mogen komen. Een mislukte ronde (offline, UMP-fout) mag het later
 * opnieuw proberen, daarom wordt `start` dan weer leeggemaakt.
 */
export function startAdvertenties(): Promise<boolean> {
  start ??= (async () => {
    const ad = laadAdSdk();
    if (!ad) return false;

    try {
      // Laat ook bij een mislukte toestemmingsronde de oude stand gelden: `gatherConsent` gooit
      // bijvoorbeeld offline, terwijl een eerder gegeven toestemming nog gewoon geldt.
      let info;
      try {
        info = await ad.AdsConsent.gatherConsent();
      } catch {
        info = await ad.AdsConsent.getConsentInfo();
      }

      useAdvertentieStore.getState().zet({
        privacyKeuzesNodig:
          info.privacyOptionsRequirementStatus ===
          ad.AdsConsentPrivacyOptionsRequirementStatus.REQUIRED,
      });
      if (!info.canRequestAds) {
        start = null;
        return false;
      }

      // Geschiedenisverhalen gaan over oorlog en dood, maar de advertenties eromheen hoeven dat
      // niet te doen: PG houdt ze geschikt voor een breed publiek.
      await ad.default().setRequestConfiguration({ maxAdContentRating: ad.MaxAdContentRating.PG });
      await ad.default().initialize();

      useAdvertentieStore.getState().zet({ klaar: true });
      laadInterstitial();
      return true;
    } catch (fout) {
      console.warn('[advertenties] starten mislukt:', fout);
      start = null;
      return false;
    }
  })();
  return start;
}

/** Vooraf laden, zodat hij er staat op het moment dat het verhaal uit is. */
function laadInterstitial(): void {
  const ad = laadAdSdk();
  const eenheid = eenheidVoor('interstitial');
  if (!ad || !eenheid || !useAdvertentieStore.getState().klaar) return;
  if (interstitial) return;

  try {
    const nieuw = ad.InterstitialAd.createForAdRequest(eenheid);
    interstitialGeladen = false;
    nieuw.addAdEventListener(ad.AdEventType.LOADED, () => {
      interstitialGeladen = true;
    });
    nieuw.addAdEventListener(ad.AdEventType.ERROR, () => {
      // Geen vulling of geen netwerk. Weggooien, zodat de volgende gelegenheid opnieuw laadt.
      interstitial = null;
      interstitialGeladen = false;
    });
    interstitial = nieuw;
    nieuw.load();
  } catch (fout) {
    interstitial = null;
    console.warn('[advertenties] interstitial laden mislukt:', fout);
  }
}

/**
 * Toont de interstitial en wacht tot hij dicht is. Geeft `false` als er niets te tonen was — dan
 * gaat de lezer meteen door, zonder te wachten op een advertentie die niet geladen is.
 *
 * Laadt daarna meteen de volgende, zodat het volgende uitgelezen verhaal er ook een heeft.
 */
export function toonInterstitial(): Promise<boolean> {
  const ad = laadAdSdk();
  const huidig = interstitial;
  if (!ad || !huidig || !interstitialGeladen) {
    laadInterstitial();
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let klaar = false;
    const rond = (getoond: boolean) => {
      if (klaar) return;
      klaar = true;
      sluit();
      fout();
      interstitial = null;
      interstitialGeladen = false;
      laadInterstitial();
      resolve(getoond);
    };
    const sluit = huidig.addAdEventListener(ad.AdEventType.CLOSED, () => rond(true));
    const fout = huidig.addAdEventListener(ad.AdEventType.ERROR, () => rond(false));
    huidig.show().catch(() => rond(false));
  });
}

/** Het venster waarin een EU-lezer zijn advertentiekeuze herziet. Instellingen → Privacy. */
export async function toonPrivacyKeuzes(): Promise<void> {
  const ad = laadAdSdk();
  if (!ad) return;
  try {
    const info = await ad.AdsConsent.showPrivacyOptionsForm();
    useAdvertentieStore.getState().zet({ klaar: useAdvertentieStore.getState().klaar && info.canRequestAds });
    if (info.canRequestAds) void startAdvertenties();
  } catch (fout) {
    console.warn('[advertenties] privacykeuzes tonen mislukt:', fout);
  }
}
