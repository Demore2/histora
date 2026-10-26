import type { TijdperkId } from '@/lib/trivia';

/** Kans dat de robot een gewone vraag goed heeft; een kroonvraag is moeilijker. */
export const ROBOT_KANS = 0.6;
export const ROBOT_KROON_KANS = 0.5;
/** Hoeveel vragen de robot hoogstens achter elkaar speelt, zodat een beurt nooit eindeloos duurt. */
const MAX_STAPPEN = 8;

export type RobotStap =
  | { soort: 'vraag'; tijdperk: TijdperkId; goed: boolean }
  | { soort: 'kroon'; tijdperk: TijdperkId; goed: boolean };

export type RobotBeurt = {
  stappen: RobotStap[];
  kroontjes: TijdperkId[];
  reeks: number;
};

/**
 * Speelt één beurt van de robot, met dezelfde regels als de lezer: draaien, ~60% goed, elke drie
 * goede antwoorden geven een kroonvraag uit een tijdperk dat hij nog mist, en een fout beëindigt
 * de beurt. **De kroonmeter blijft bij een fout staan** (zoals in Trivia Crack); alleen een
 * kroonvraag, goed of fout, zet hem terug op nul. Zonder die regel duurt een potje tegen de robot
 * gemiddeld zo'n vijftig beurten.
 *
 * **Zuiver**: de toevalsbron komt als parameter binnen, zodat het scherm de uitkomst één keer
 * uitrekent (bij het begin van de beurt) en daarna alleen nog stap voor stap laat zien. Een
 * hertekening onderweg verandert de uitkomst dus niet.
 */
export function speelRobotBeurt(
  tijdperken: TijdperkId[],
  kroontjes: TijdperkId[],
  reeks: number,
  kroonReeks: number,
  toeval: () => number = Math.random
): RobotBeurt {
  const stappen: RobotStap[] = [];
  let mijnKroontjes = [...kroontjes];
  let mijnReeks = reeks;

  while (stappen.length < MAX_STAPPEN && mijnKroontjes.length < tijdperken.length) {
    if (mijnReeks >= kroonReeks) {
      const open = tijdperken.filter((t) => !mijnKroontjes.includes(t));
      const tijdperk = open[Math.floor(toeval() * open.length)];
      const goed = toeval() < ROBOT_KROON_KANS;
      stappen.push({ soort: 'kroon', tijdperk, goed });
      mijnReeks = 0;
      if (!goed) break;
      mijnKroontjes = [...mijnKroontjes, tijdperk];
      continue;
    }
    const tijdperk = tijdperken[Math.floor(toeval() * tijdperken.length)];
    const goed = toeval() < ROBOT_KANS;
    stappen.push({ soort: 'vraag', tijdperk, goed });
    // Een fout beëindigt de beurt, maar de kroonmeter blijft staan — zelfde regel als bij de lezer.
    if (!goed) break;
    mijnReeks += 1;
  }

  return { stappen, kroontjes: mijnKroontjes, reeks: mijnReeks };
}
