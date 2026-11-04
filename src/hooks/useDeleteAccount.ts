import { useState } from 'react';

import { appleLogin } from '@/lib/apple-login';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';
import { wisLokaleGebruikersgegevens } from '@/store/lokale-gegevens';
import { foutTekst } from '@/store/sync-hulp';

/** De naam van de edge function; de bron staat in `supabase/functions/delete-account/`. */
const FUNCTIE = 'delete-account';

export type VerwijderResultaat = { ok: true } | { ok: false; fout: string; afgebroken?: boolean };

/**
 * Accountverwijdering, in één handeling (AVG art. 17, en Play's eis van een in-app route).
 *
 * **Het wissen gebeurt op de server, niet hier.** Twee redenen waarom de voor de hand liggende
 * variant — zes `supabase.from(...).delete()`-aanroepen gevolgd door `signOut()` — niet werkt:
 *
 * 1. Op alle zes de tabellen staat RLS aan met alleen select-, insert- en update-policies. Een
 *    `delete` waar geen policy voor bestaat raakt **nul rijen en levert geen fout op**. De app
 *    zou "verwijderd" melden terwijl er niets weg is.
 * 2. `auth.users` is voor een client onbereikbaar. Zonder die rij weg te halen blijft het account
 *    gewoon bestaan en kun je er meteen weer op inloggen — precies niet wat de knop belooft.
 *
 * De edge function draait met de service-role-sleutel en verwijdert de gebruiker uit
 * `auth.users`; de `on delete cascade` op elke foreign key ruimt de zes tabellen mee op. Zij
 * leest het gebruiker-id uit het token, dus deze hook kan niet iemand anders opgeven.
 *
 * Daarna wist hij het toestel (`wisLokaleGebruikersgegevens`) en gooit de sessie weg. Dat laatste
 * met `scope: 'local'`: de gebruiker bestaat niet meer, dus een uitlogverzoek aan de server zou
 * op een dode gebruiker stuiten en een fout teruggeven voor iets dat al gelukt is.
 *
 * Er is bewust géén `router.replace('/login')`: `AuthPoort` in de root layout ziet `user === null`
 * en navigeert. Eén plek die dat besluit neemt, net als bij uitloggen.
 */
export function useDeleteAccount() {
  const [isBezig, setIsBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  async function verwijderAccount(): Promise<VerwijderResultaat> {
    setIsBezig(true);
    setFout(null);

    try {
      // Een verlopen token levert een 401 uit de function op, en dan lijkt het alsof het
      // verwijderen mislukte terwijl alleen de sessie oud was. `getSession()` ververst hem eerst.
      const { data, error: sessieFout } = await supabase.auth.getSession();
      if (sessieFout) throw sessieFout;
      if (!data.session) throw new Error('Geen sessie.');

      // Sign in with Apple (richtlijn 5.1.1(v)): wie met Apple is ingelogd, bevestigt nog één keer
      // met Apple, zodat de function het token bij Apple kan intrekken. Wegklikken breekt het
      // verwijderen af — dat is een keuze van de lezer, geen fout. Mislukt het om een andere reden,
      // dan gaat het verwijderen gewoon door: het account moet weg kunnen, ook zonder intrekking.
      let appleAuthorizationCode: string | undefined;
      const providers = data.session.user.identities?.map((i) => i.provider) ?? [];
      if (providers.includes('apple') && appleLogin.beschikbaar) {
        const code = await appleLogin.haalAutorisatieCode();
        if (!code.ok && code.reden === 'afgebroken') {
          setIsBezig(false);
          return { ok: false, fout: 'afgebroken', afgebroken: true };
        }
        if (code.ok) appleAuthorizationCode = code.code;
      }

      const { error } = await supabase.functions.invoke(FUNCTIE, {
        method: 'POST',
        body: appleAuthorizationCode ? { appleAuthorizationCode } : {},
      });
      if (error) throw error;

      // Pas nu het toestel leegmaken. Andersom zou een mislukte aanroep de lezer met een lege
      // app achterlaten terwijl zijn account er nog is.
      wisLokaleGebruikersgegevens();
      await supabase.auth.signOut({ scope: 'local' });
      useAuthStore.getState().clearUser();

      setIsBezig(false);
      return { ok: true };
    } catch (err) {
      const bericht = foutTekst(err);
      setFout(bericht);
      setIsBezig(false);
      return { ok: false, fout: bericht };
    }
  }

  return { verwijderAccount, isBezig, fout };
}
