import { Platform } from 'react-native';

import { APP_VERSIE } from '@/constants/app-info';
import { supabase } from '@/lib/supabase';
import { useOnboardingStore } from '@/store/onboarding-store';
import { useTaalStore } from '@/store/taal-store';

/**
 * De trechter van de intro (1.5.0): één rij in `public.intro_stappen` per getoonde stap, zodat we
 * zien wáár nieuwe lezers afhaken. Analytics staat uit (Firebase-vlag), dus dit is de enige meting
 * van de intro.
 *
 * - **Fire-and-forget, gooit nooit.** Een meting mag de intro niet ophouden of laten vastlopen.
 * - **Per installatie, niet per gebruiker** (`installatieId`): wie op het welkomscherm afhaakt
 *   heeft nog geen gastaccount en moet tóch meetellen. `user_id` vult de database zelf in
 *   (`default auth.uid()`), dus zodra er een gast is staat die er ook bij.
 * - **Geen select-policy**: de app kan zijn eigen rijen niet teruglezen; de uitslag komt uit
 *   `beheer_intro_trechter()` op het beheerbord.
 * - Een stap twee keer tonen (terug en weer verder) geeft twee rijen; de trechter telt
 *   unieke installaties per stap, dus dat is geen fout.
 *
 * `nummer` is de plek in de intro (0 = welkom); de afloop van de accountstap krijgt 100+, zodat
 * hij in de trechter achteraan komt.
 */
export function meetIntroStap(stap: string, nummer: number): void {
  try {
    const installatieId = useOnboardingStore.getState().geefInstallatieId();
    void supabase
      .from('intro_stappen')
      .insert({
        installatie_id: installatieId,
        stap,
        stap_nummer: nummer,
        app_versie: APP_VERSIE,
        platform: Platform.OS,
        taal: useTaalStore.getState().taal,
      })
      .then(({ error }) => {
        if (error) console.warn('[intro-meting] niet opgeslagen:', error.message);
      });
  } catch (fout) {
    console.warn('[intro-meting] mislukt:', fout);
  }
}

/** De afloop van de accountstap, als `stap` in dezelfde tabel. */
export const INTRO_AFLOOP = {
  google: { stap: 'afloop_google', nummer: 100 },
  email: { stap: 'afloop_email', nummer: 101 },
  later: { stap: 'afloop_later', nummer: 102 },
  inloggen: { stap: 'afloop_inloggen', nummer: 103 },
} as const;
