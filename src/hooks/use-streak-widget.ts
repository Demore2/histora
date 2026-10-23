import { useEffect } from 'react';
import { AppState } from 'react-native';

import { useTaalStore } from '@/store/taal-store';
import { useVoortgangStore } from '@/store/voortgang-store';
import { useWinkelStore } from '@/store/winkel-store';
import { vernieuwStreakWidget } from '@/widget/vernieuw-widget';

/**
 * Houdt de streak-widget op het homescreen bij (1.3). Eén keer, in de root layout.
 *
 * De widget ververst zichzelf elke 30 minuten (het minimum van Android), en dat is genoeg voor het
 * aflopen van de dag — maar niet voor het moment waarop het ertoe doet: wie net een hoofdstuk
 * afrondde en naar zijn homescreen gaat, hoort een juichende vos te zien, niet nog een half uur de
 * smekende. Daarom drie triggers:
 * - de streak verandert (een afgerond hoofdstuk, of een samenvoeging met de server bij het inloggen);
 * - de taal verandert (de zin staat in de widget);
 * - de app gaat naar de achtergrond — precies het moment waarop het homescreen in beeld komt.
 */
export function useStreakWidget(): void {
  useEffect(() => {
    vernieuwStreakWidget();

    const stopStreak = useVoortgangStore.subscribe((nu, vorig) => {
      if (
        nu.streakDagen !== vorig.streakDagen ||
        nu.laatsteActiviteitDatum !== vorig.laatsteActiviteitDatum
      ) {
        vernieuwStreakWidget();
      }
    });
    const stopTaal = useTaalStore.subscribe((nu, vorig) => {
      if (nu.taal !== vorig.taal) vernieuwStreakWidget();
    });
    // Een gekochte of ingezette bevriezer verandert de vos (het ijsblok).
    const stopWinkel = useWinkelStore.subscribe((nu, vorig) => {
      if (nu.bevriezers !== vorig.bevriezers || nu.bevrorenDagen !== vorig.bevrorenDagen) {
        vernieuwStreakWidget();
      }
    });
    const appState = AppState.addEventListener('change', (status) => {
      if (status === 'background') vernieuwStreakWidget();
    });

    return () => {
      stopStreak();
      stopTaal();
      stopWinkel();
      appState.remove();
    };
  }, []);
}
