import { useEffect } from 'react';

import { useAbonnement } from '@/hooks/use-abonnement';
import { startAdvertenties } from '@/lib/advertenties';
import { useAuthStore } from '@/store/auth-store';
import { useOnboardingStore } from '@/store/onboarding-store';
import { useSubscriptionStore } from '@/store/subscription-store';

/**
 * Start AdMob voor een gratis lezer. Eén keer, in de root layout, ná `useAuth()`.
 *
 * **Er wordt gewacht tot het abonnement van déze lezer binnen is.** Vlak na het opstarten staat
 * `tier` nog op `free` voor iedereen; zonder die wachttijd krijgt een Pro-lezer bij elke koude
 * start het toestemmingsvenster te zien voor advertenties die hij nooit zal zien.
 *
 * Wordt een gratis lezer later Pro, dan wordt er niets afgebroken: de SDK draait door, maar elke
 * plek die een advertentie toont kijkt zelf naar `useAbonnement()` en toont niets meer.
 */
export function useAdvertenties(): void {
  const userId = useAuthStore((s) => s.user?.id ?? null);
  const abonnementVan = useSubscriptionStore((s) => s.userId);
  const laden = useSubscriptionStore((s) => s.loading);
  const { isPremium } = useAbonnement();

  // Net uit de intro staat het Pro-aanbod (`/intro-pro`) nog open. Googles toestemmingsvenster komt
  // pas als dat weg is (wens van de eigenaar, 1.4.5): twee vensters over elkaar heen leest als een muur.
  const introAanbodOpen = useOnboardingStore((s) => s.afrondenOpen);

  const abonnementBekend = userId !== null && abonnementVan === userId && !laden;

  useEffect(() => {
    if (abonnementBekend && !isPremium && !introAanbodOpen) void startAdvertenties();
  }, [abonnementBekend, isPremium, introAanbodOpen]);
}
