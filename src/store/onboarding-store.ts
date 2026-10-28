import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { TijdperkId } from '@/lib/trivia';

export type OnboardingDoel = 'kennis' | 'school' | 'uitdaging' | 'expert';
export type OnboardingNiveau = 'beginner' | 'af-en-toe' | 'geinteresseerd' | 'liefhebber';

type OnboardingState = {
  /**
   * De intro is doorlopen of overgeslagen ("I already have an account"). Daarna stuurt de
   * auth-poort een lezer zonder sessie naar `/login` in plaats van naar `/intro`.
   */
  gezien: boolean;
  /**
   * De intro is af maar de lezer is nog niet ingelogd geweest. Zodra er een sessie is, toont
   * `IntroAfronding` (via de auth-poort) eenmalig `/intro-pro` en opent daarna het eerste verhaal.
   */
  afrondenOpen: boolean;
  doel: OnboardingDoel | null;
  tijdperken: TijdperkId[];
  niveau: OnboardingNiveau | null;
  /** Wat de lezer als naam intikte; vult het registratiescherm alvast in. */
  naam: string;
  /** Het verhaal dat de intro als eerste voorstelde. */
  startVerhaalId: string | null;

  kiesDoel: (doel: OnboardingDoel) => void;
  wisselTijdperk: (id: TijdperkId) => void;
  kiesNiveau: (niveau: OnboardingNiveau) => void;
  zetNaam: (naam: string) => void;
  rondIntroAf: (startVerhaalId: string) => void;
  slaIntroOver: () => void;
  sluitAfronding: () => void;
};

/**
 * De intro voor nieuwe lezers (1.4.5, fase 1). **Bewust device-lokaal en niet gesynchroniseerd**:
 * de antwoorden sturen alleen het eerste verhaal en de naam in het registratiescherm. Gaan we ze
 * ooit voor aanbevelingen of statistiek gebruiken, dan horen ze in `profiles` (een migratie).
 *
 * Geslacht en leeftijd worden niet gevraagd: de app doet er niets mee, en wat je niet gebruikt
 * hoor je onder de AVG ook niet te verzamelen.
 */
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      gezien: false,
      afrondenOpen: false,
      doel: null,
      tijdperken: [],
      niveau: null,
      naam: '',
      startVerhaalId: null,

      kiesDoel: (doel) => set({ doel }),
      wisselTijdperk: (id) =>
        set((s) => ({
          tijdperken: s.tijdperken.includes(id) ? s.tijdperken.filter((x) => x !== id) : [...s.tijdperken, id],
        })),
      kiesNiveau: (niveau) => set({ niveau }),
      zetNaam: (naam) => set({ naam }),
      rondIntroAf: (startVerhaalId) => set({ gezien: true, afrondenOpen: true, startVerhaalId }),
      slaIntroOver: () => set({ gezien: true }),
      sluitAfronding: () => set({ afrondenOpen: false }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
