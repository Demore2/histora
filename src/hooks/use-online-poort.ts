import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAbonnement } from '@/hooks/use-abonnement';
import { useAbonnementStore } from '@/store/abonnement-store';
import { useAuthStore } from '@/store/auth-store';
import { useSubscriptionStore } from '@/store/subscription-store';

/**
 * Gratis lezen kan alleen online; Pro leest ook offline (keuze van de eigenaar, 2026-10-23).
 *
 * **Waarom het een poort is en geen technische noodzaak**: de verhalen zitten in de bundel en
 * werken prima zonder netwerk. Maar de vragen na een hoofdstuk komen van de server, en zonder
 * netwerk sloeg `handleMarkeerVoltooid` ze terecht over — wat vliegtuigmodus tot een manier maakte
 * om de vragen, de daglimiet (`haalVerhalenVandaagOp` faalt open) en de advertenties te omzeilen.
 * Offline lezen is daarmee een Pro-voordeel geworden in plaats van een achterdeur.
 *
 * Drie regels houden het eerlijk:
 * - **Twijfel is online.** `isInternetReachable` is `null` zolang NetInfo het nog niet gemeten
 *   heeft; alleen een expliciete `false` blokkeert. Een poort die bij de koude start even
 *   dichtklapt leest als een kapotte app.
 * - **Een Pro-lezer wordt nooit geblokkeerd omdat zijn abonnement nog laadt.** Er wordt pas
 *   beslist als de abonnementsrij van déze lezer binnen is (bij offline: de cache, zie
 *   `loadSubscription`) en `abonnement-store` gehydrateerd is (het tegoed `proTot`). Zelfde
 *   wachtregel als `useAdvertenties`.
 * - **De poort gaat vanzelf weer open** zodra het netwerk terugkomt; de lezer hoeft niets te doen.
 *   `opnieuwProberen` is er voor wie toch wil tikken: dat dwingt een nieuwe meting af.
 */
export function useOnlinePoort(): {
  geblokkeerd: boolean;
  opnieuwProberen: () => void;
  /** Loopt op bij elke overgang offline → online; de reader laadt dan zijn vragen opnieuw. */
  herstelTeller: number;
} {
  const [offline, setOffline] = useState(false);
  const [herstelTeller, setHerstelTeller] = useState(0);
  const wasOffline = useRef(false);
  const { isPremium } = useAbonnement();
  const userId = useAuthStore((s) => s.user?.id ?? null);
  const abonnementVan = useSubscriptionStore((s) => s.userId);
  const laden = useSubscriptionStore((s) => s.loading);
  const [tegoedGelezen, setTegoedGelezen] = useState(() =>
    useAbonnementStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (tegoedGelezen) return;
    return useAbonnementStore.persist.onFinishHydration(() => setTegoedGelezen(true));
  }, [tegoedGelezen]);

  const verwerk = useCallback((status: NetInfoState) => {
    const nu = status.isConnected === false || status.isInternetReachable === false;
    if (wasOffline.current && !nu) setHerstelTeller((n) => n + 1);
    wasOffline.current = nu;
    setOffline(nu);
  }, []);

  useEffect(() => NetInfo.addEventListener(verwerk), [verwerk]);

  const opnieuwProberen = useCallback(() => {
    void NetInfo.refresh().then(verwerk);
  }, [verwerk]);

  const abonnementBekend = userId !== null && abonnementVan === userId && !laden && tegoedGelezen;

  return { geblokkeerd: offline && abonnementBekend && !isPremium, opnieuwProberen, herstelTeller };
}
