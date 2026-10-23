import { useEffect } from 'react';
import { AppState } from 'react-native';

import { useAuthStore } from '@/store/auth-store';
import { useCharacterUnlockStore } from '@/store/character-unlock-store';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { wachtOpHydratie } from '@/store/sync-hulp';
import { useVoortgangStore } from '@/store/voortgang-store';
import { dukatenSleutel, useWinkelStore } from '@/store/winkel-store';
import { gemisteDagen } from '@/widget/streak-fase';

/**
 * Houdt de winkel bij (1.3). Eén keer, in de root layout, ná `useAuth()`.
 *
 * Bij een sessie en bij elke terugkeer naar de voorgrond, in deze volgorde:
 * 1. **Eenmalig per account de leesgeschiedenis inleveren.** Wie al vijftig hoofdstukken las voordat
 *    de winkel bestond, krijgt daar alsnog Dukaten voor — anders begint de trouwste lezer op nul.
 *    De server telt elke sleutel één keer, dus dubbel inleveren kan niet.
 * 2. **Pro aanvullen** (de server beslist of je Pro bent en of het deze maand al gebeurde).
 * 3. **De wachtrij verzilveren** en de stand ophalen.
 * 4. **De streak redden** als er dagen gemist zijn en er genoeg bevriezers zijn. Bewust hier en
 *    niet om middernacht: de app kan dan niet draaien. Tot de lezer de app opent toont de widget
 *    de vos alvast in het ijsblok (`streak-fase.ts`), op basis van deze zelfde rekensom.
 */
export function useWinkel(): void {
  const userId = useAuthStore((s) => s.user?.id ?? null);

  useEffect(() => {
    if (!userId) return;
    let afgebroken = false;

    async function ronde() {
      await Promise.all([
        wachtOpHydratie(useWinkelStore),
        wachtOpHydratie(useVoortgangStore),
        wachtOpHydratie(useStoryProgressStore),
        wachtOpHydratie(useCharacterUnlockStore),
      ]);
      if (afgebroken || !userId) return;
      const winkel = useWinkelStore.getState();

      if (winkel.inhaalGedaanVoor !== userId) {
        const sleutels: string[] = [];
        for (const [verhaalId, p] of Object.entries(useStoryProgressStore.getState().progress)) {
          for (const n of p.completedChapters) sleutels.push(dukatenSleutel.hoofdstuk(verhaalId, n));
        }
        for (const c of useCharacterUnlockStore.getState().unlockedCharacters) {
          sleutels.push(dukatenSleutel.verhaal(c.verhaalId));
        }
        winkel.markeerInhaalGedaan(userId);
        winkel.verdien(sleutels);
      }

      await winkel.vulProAan();
      await useWinkelStore.getState().verzilver();
      await useWinkelStore.getState().haalOp();
      if (afgebroken) return;

      const { streakDagen, laatsteActiviteitDatum, overbrugTot } = useVoortgangStore.getState();
      const gemist = gemisteDagen(laatsteActiviteitDatum);
      const { bevriezers } = useWinkelStore.getState();
      if (streakDagen > 0 && gemist.length > 0 && gemist.length <= bevriezers) {
        const gelukt = await useWinkelStore.getState().gebruikBevriezers(gemist);
        if (gelukt && !afgebroken) overbrugTot(gemist[gemist.length - 1]);
      }
    }

    void ronde();
    const abonnement = AppState.addEventListener('change', (status) => {
      if (status === 'active') void ronde();
    });
    return () => {
      afgebroken = true;
      abonnement.remove();
    };
  }, [userId]);
}
