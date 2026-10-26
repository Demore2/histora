import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { RobotBeurt } from '@/lib/robot';
import type { TijdperkId } from '@/lib/trivia';

/** Zoveel goede antwoorden vullen de kroonmeter in solo; dan mag je om een kroontje spelen. */
export const KROON_REEKS = 3;
/** In een duel tegen de robot sneller, anders duurt een potje zo'n zeventig vragen (zie `lib/robot.ts`). */
export const DUEL_KROON_REEKS = 2;
/** Een kroonvraag is minstens zo moeilijk. */
export const KROON_MOEILIJKHEID = 2;
const AANTAL_TIJDPERKEN = 6;

export type Modus = 'solo' | 'duel';

export type Duel = {
  speler: TijdperkId[];
  robot: TijdperkId[];
  spelerReeks: number;
  robotReeks: number;
  beurt: 'speler' | 'robot';
  winnaar: 'speler' | 'robot' | null;
};

const NIEUW_DUEL: Duel = { speler: [], robot: [], spelerReeks: 0, robotReeks: 0, beurt: 'speler', winnaar: null };

type TriviaState = {
  modus: Modus;

  /** Solo: de tijdperken waar je in dit spel al een kroontje voor hebt. Zes = gewonnen. */
  kroontjes: TijdperkId[];
  /** Solo: goede antwoorden sinds de laatste kroonvraag; vol bij `KROON_REEKS`. */
  reeks: number;
  /** Solo: goede antwoorden in dit spel. */
  score: number;
  /** Solo: de hoogste score van een uitgespeeld spel (alle zes kroontjes). */
  besteScore: number;
  gewonnenSpellen: number;

  /** Het lopende duel tegen de robot. */
  duel: Duel;
  duelsGewonnen: number;
  duelsVerloren: number;

  /**
   * Alle kroontjes die je ooit verdiende, per tijdperk — over spellen en standen heen, voor het
   * blokje op Progress.
   */
  kroonTotaal: Partial<Record<TijdperkId, number>>;
  /** Vragen die je onlangs kreeg, zodat de server ze niet meteen opnieuw trekt. */
  gezien: string[];

  setModus: (modus: Modus) => void;
  registreerAntwoord: (vraagId: string, goed: boolean, kroonVoor: TijdperkId | null) => void;
  robotKlaar: (beurt: RobotBeurt) => void;
  nieuwSpel: () => void;
  nieuwDuel: () => void;
};

/** Houdt de lijst "gezien" kort: de server valt bij een uitgeputte lijst toch terug op alles. */
function voegGezienToe(gezien: string[], id: string): string[] {
  if (gezien.includes(id)) return gezien;
  return [...gezien, id].slice(-200);
}

/**
 * De spelstand van Explore (1.4.1). **Bewust lokaal en niet gesynchroniseerd**: er hangt niets aan
 * (je speelt voor kroontjes en score, geen Dukaten), dus een tweede toestel met een eigen spel is
 * geen probleem. Wat wél op de server moet, de levens, staat daar (`trivia_levens`).
 *
 * **De regel voor de kroonmeter, in beide standen:** elk goed antwoord vult hem, een fout laat
 * hem staan (en kost een leven, en in een duel je beurt), en een kroonvraag — goed of fout — zet
 * hem terug op nul. Zo werkt het in Trivia Crack ook.
 */
export const useTriviaStore = create<TriviaState>()(
  persist(
    (set) => ({
      modus: 'solo',
      kroontjes: [],
      reeks: 0,
      score: 0,
      besteScore: 0,
      gewonnenSpellen: 0,
      duel: NIEUW_DUEL,
      duelsGewonnen: 0,
      duelsVerloren: 0,
      kroonTotaal: {},
      gezien: [],

      setModus: (modus) => set({ modus }),

      registreerAntwoord: (vraagId, goed, kroonVoor) =>
        set((s) => {
          const gezien = voegGezienToe(s.gezien, vraagId);
          const kroonErbij = goed && kroonVoor !== null;
          const kroonTotaal = kroonErbij
            ? { ...s.kroonTotaal, [kroonVoor]: (s.kroonTotaal[kroonVoor] ?? 0) + 1 }
            : s.kroonTotaal;

          if (s.modus === 'duel') {
            const d = s.duel;
            const nieuweKroon = kroonErbij && !d.speler.includes(kroonVoor);
            const speler = nieuweKroon ? [...d.speler, kroonVoor] : d.speler;
            const spelerReeks = kroonVoor !== null ? 0 : goed ? Math.min(d.spelerReeks + 1, DUEL_KROON_REEKS) : d.spelerReeks;
            const gewonnen = speler.length >= AANTAL_TIJDPERKEN;
            return {
              gezien,
              kroonTotaal: nieuweKroon ? kroonTotaal : s.kroonTotaal,
              duelsGewonnen: gewonnen ? s.duelsGewonnen + 1 : s.duelsGewonnen,
              duel: {
                ...d,
                speler,
                spelerReeks,
                beurt: goed || gewonnen ? 'speler' : 'robot',
                winnaar: gewonnen ? 'speler' : null,
              },
            };
          }

          if (!goed) return { gezien, reeks: kroonVoor !== null ? 0 : s.reeks };
          const score = s.score + 1;
          if (kroonVoor === null) return { gezien, score, reeks: Math.min(s.reeks + 1, KROON_REEKS) };

          const nieuw = !s.kroontjes.includes(kroonVoor);
          const kroontjes = nieuw ? [...s.kroontjes, kroonVoor] : s.kroontjes;
          const gewonnen = kroontjes.length >= AANTAL_TIJDPERKEN;
          return {
            gezien,
            score,
            reeks: 0,
            kroontjes,
            kroonTotaal: nieuw ? kroonTotaal : s.kroonTotaal,
            besteScore: gewonnen ? Math.max(s.besteScore, score) : s.besteScore,
            gewonnenSpellen: gewonnen ? s.gewonnenSpellen + 1 : s.gewonnenSpellen,
          };
        }),

      robotKlaar: (beurt) =>
        set((s) => {
          const gewonnen = beurt.kroontjes.length >= AANTAL_TIJDPERKEN;
          return {
            duelsVerloren: gewonnen ? s.duelsVerloren + 1 : s.duelsVerloren,
            duel: {
              ...s.duel,
              robot: beurt.kroontjes,
              robotReeks: beurt.reeks,
              beurt: 'speler',
              winnaar: gewonnen ? 'robot' : null,
            },
          };
        }),

      nieuwSpel: () => set({ kroontjes: [], reeks: 0, score: 0 }),
      nieuwDuel: () => set({ duel: NIEUW_DUEL }),
    }),
    {
      name: 'trivia-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
