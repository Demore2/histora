import { useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import { useVoortgangStore } from '@/store/voortgang-store';
import { useWinkelStore } from '@/store/winkel-store';
import { bepaalStreakStand, type StreakStand } from '@/widget/streak-fase';

/**
 * De streak zoals de widget hem toont — fase, dagen, week — maar dan als hook voor een scherm.
 * Zelfde vorm als `useStreak()`: een peilmoment in state, opnieuw gezet bij elke terugkeer naar de
 * voorgrond, want de fase verandert door de tijd (ochtend → avond) en niet door een state-wijziging.
 *
 * **Dezelfde functie als de widget** (`bepaalStreakStand`), met dezelfde bevriezingsgegevens uit
 * `winkel-store`. Zo kunnen de vos op het homescreen en die op Voortgang nooit iets anders zeggen.
 */
export function useStreakStand(): StreakStand {
  const streakDagen = useVoortgangStore((s) => s.streakDagen);
  const laatsteActiviteitDatum = useVoortgangStore((s) => s.laatsteActiviteitDatum);
  const bevriezers = useWinkelStore((s) => s.bevriezers);
  const bevrorenDagen = useWinkelStore((s) => s.bevrorenDagen);
  const [peilmoment, setPeilmoment] = useState(() => Date.now());

  useEffect(() => {
    const abonnement = AppState.addEventListener('change', (status) => {
      if (status === 'active') setPeilmoment(Date.now());
    });
    return () => abonnement.remove();
  }, []);

  return useMemo(
    () =>
      bepaalStreakStand(streakDagen, laatsteActiviteitDatum, new Date(peilmoment), {
        bevriezers,
        bevrorenDagen,
      }),
    [streakDagen, laatsteActiviteitDatum, bevriezers, bevrorenDagen, peilmoment],
  );
}
