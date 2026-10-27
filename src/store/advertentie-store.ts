import { create } from 'zustand';

/**
 * Wat de schermen van AdMob moeten weten, als state zodat ze meebewegen.
 *
 * Bewust **niet** ge`persist`-eerd: of er advertenties mogen komen bepaalt de toestemming (UMP),
 * en die bewaart de SDK zelf. Een opgeslagen `klaar: true` zou een banner laten proberen te laden
 * vóórdat `initialize()` in deze sessie gedraaid heeft.
 */
type AdvertentieState = {
  /** De SDK is geïnitialiseerd én de toestemming laat advertenties toe. */
  klaar: boolean;
  /** UMP zegt dat de lezer zijn advertentiekeuze moet kunnen herzien (EU). Toont een regel in Instellingen. */
  privacyKeuzesNodig: boolean;
  /** Er staat een beloonde advertentie klaar ("+1 leven" op Explore). */
  beloondKlaar: boolean;
  zet: (deel: Partial<Pick<AdvertentieState, 'klaar' | 'privacyKeuzesNodig' | 'beloondKlaar'>>) => void;
};

export const useAdvertentieStore = create<AdvertentieState>((set) => ({
  klaar: false,
  privacyKeuzesNodig: false,
  beloondKlaar: false,
  zet: (deel) => set(deel),
}));
