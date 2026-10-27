import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { vandaagSleutel } from '@/store/voortgang-store';

/**
 * De lokale datum van vandaag ('YYYY-MM-DD'), opnieuw gemeten bij elke terugkeer naar de
 * voorgrond — zelfde vorm als `useStreak()`. Een app die gisteren openbleef, hoort vandaag niet
 * meer "nieuw" te zeggen over een verhaal waarvan de week om is.
 */
export function useVandaag(): string {
  const [vandaag, setVandaag] = useState(() => vandaagSleutel());

  useEffect(() => {
    const abonnement = AppState.addEventListener('change', (status) => {
      if (status === 'active') setVandaag(vandaagSleutel());
    });
    return () => abonnement.remove();
  }, []);

  return vandaag;
}
