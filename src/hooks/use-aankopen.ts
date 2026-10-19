import { useEffect } from 'react';

import { aankopen, premiumTot, type KlantInfo } from '@/lib/aankopen';
import { useAanbodStore } from '@/store/aanbod-store';
import { useAuthStore } from '@/store/auth-store';
import { isAbonnementActief, useSubscriptionStore } from '@/store/subscription-store';

/**
 * Koppelt RevenueCat aan de ingelogde lezer en houdt de winkelstand bij.
 *
 * **Eén keer, in de root layout**, net als `useAuth()` en `useVoortgangSync()`: er is één
 * RevenueCat-klant per app, en twee kopieën van deze hook zouden om de beurt `logIn` doen.
 *
 * Drie dingen:
 *
 * 1. **Inloggen = koppelen, uitloggen = ontkoppelen.** RevenueCat krijgt het Supabase-user-id als
 *    `appUserID`, zodat elke aankoop bij de juiste rij in `user_subscriptions` terechtkomt.
 * 2. **De winkelstand gaat naar `subscription-store.winkelPremiumTot`**, uitsluitend voor de
 *    weergave op dit toestel — zie daar waarom.
 * 3. **Zegt de winkel "premium" en de server nog niet, dan wordt de server gevraagd bij te
 *    werken.** Dat dekt een gemiste webhook: de lezer betaalde, de webhook kwam nooit aan (of de
 *    function was nog niet gedeployd), en bij de volgende start herstelt het zichzelf.
 *
 * Zonder sleutel of op web doet dit niets — `aankopen.beschikbaar` is dan onwaar.
 */
export function useAankopen(): void {
  const userId = useAuthStore((state) => state.user?.id ?? null);

  useEffect(() => {
    if (!aankopen.beschikbaar) return;

    if (!userId) {
      void aankopen.ontkoppel();
      return;
    }

    let afgebroken = false;

    const verwerk = (info: KlantInfo) => {
      if (afgebroken) return;
      const tot = premiumTot(info);
      const store = useSubscriptionStore.getState();
      store.pasWinkelstandToe(tot);

      const serverPremium = isAbonnementActief({ ...store, winkelPremiumTot: null }, Date.now());
      if (tot !== null && !serverPremium) {
        void aankopen.vraagServerSync().then((gelukt) => {
          if (gelukt && !afgebroken) void useSubscriptionStore.getState().loadSubscription(userId);
        });
      }
    };

    void aankopen.koppel(userId).then(async (info) => {
      if (info) verwerk(info);
      // Pas na het koppelen: `haalPakkettenOp` geeft daarvoor altijd een lege lijst.
      const pakketten = await aankopen.haalPakkettenOp();
      if (!afgebroken) useAanbodStore.getState().zetTeKoop(pakketten.length > 0);
    });
    const stop = aankopen.luister(verwerk);

    return () => {
      afgebroken = true;
      stop();
    };
  }, [userId]);
}
