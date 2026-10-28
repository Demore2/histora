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
  /**
   * Een willekeurig id per installatie (1.5.0), voor de trechter in `public.intro_stappen`. Niet
   * het gebruiker-id: wie afhaakt vóórdat het gastaccount er is, telt zo ook mee.
   */
  installatieId: string | null;
  geefInstallatieId: () => string;

  kiesDoel: (doel: OnboardingDoel) => void;
  wisselTijdperk: (id: TijdperkId) => void;
  kiesNiveau: (niveau: OnboardingNiveau) => void;
  zetNaam: (naam: string) => void;
  rondIntroAf: (startVerhaalId: string) => void;
  slaIntroOver: () => void;
  sluitAfronding: () => void;
  /** Draait `rondIntroAf` terug, als het account daarna toch niet tot stand kwam (Google afgebroken). */
  heropenIntro: () => void;
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
    (set, get) => ({
      gezien: false,
      afrondenOpen: false,
      doel: null,
      tijdperken: [],
      niveau: null,
      naam: '',
      startVerhaalId: null,
      installatieId: null,

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
      heropenIntro: () => set({ gezien: false, afrondenOpen: false }),
      geefInstallatieId: () => {
        const bestaand = get().installatieId;
        if (bestaand) return bestaand;
        const id = maakUuid();
        set({ installatieId: id });
        return id;
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/** Een v4-uuid zonder native module; voor een meet-id is `Math.random` ruim voldoende. */
function maakUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
