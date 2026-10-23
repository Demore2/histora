import { berekenHuidigeStreak, vandaagSleutel } from '@/store/voortgang-store';

/**
 * In welke stemming de vos op de streak-widget staat (1.3).
 *
 * De volgorde loopt mee met de dag waarop de streak nog te redden is: een streak leeft zolang de
 * laatste leesdag vandaag of gisteren was (`berekenHuidigeStreak`), dus "nog niet gelezen" betekent
 * altijd "gisteren gelezen, en om middernacht is hij weg". **De fases tellen af naar die
 * middernacht, niet naar 24 uur na de laatste lezing** — anders toont de widget een skelet terwijl
 * de app nog een levende streak laat zien.
 */
export type StreakFase =
  | 'gevierd' // vandaag gelezen
  | 'ochtend' // nog niet gelezen, vóór 12:00
  | 'middag' // 12:00-18:00
  | 'avond' // 18:00-22:00
  | 'paniek' // laatste twee uur
  | 'skelet' // de streak verliep vannacht (alleen die ene dag)
  | 'slaap'; // nooit gelezen, of langer geleden: tijd voor een nieuwe start

/** Grenzen in lokale uren. Het eerste uur waarop de fase begint. */
const MIDDAG_VANAF = 12;
const AVOND_VANAF = 18;
const PANIEK_VANAF = 22;

export type StreakStand = {
  fase: StreakFase;
  /** De streak zoals de app hem toont (0 als hij verlopen is). */
  dagen: number;
  /**
   * De zeven dagen van deze week (maandag eerst): `true` als het een leesdag binnen de lopende
   * streak was. Afgeleid, niet bijgehouden: de streak is per definitie een aaneengesloten reeks
   * dagen die eindigt op `laatsteActiviteitDatum`.
   */
  week: boolean[];
  /** Index (0 = maandag) van vandaag in `week`. */
  vandaagIndex: number;
};

function eergisteren(nu: Date): string {
  return vandaagSleutel(new Date(nu.getFullYear(), nu.getMonth(), nu.getDate() - 2));
}

export function bepaalStreakStand(
  streakDagen: number,
  laatsteActiviteitDatum: string | null,
  nu: Date = new Date(),
): StreakStand {
  const dagen = berekenHuidigeStreak(streakDagen, laatsteActiviteitDatum, nu);
  const vandaag = vandaagSleutel(nu);
  const uur = nu.getHours();

  let fase: StreakFase;
  if (laatsteActiviteitDatum === vandaag) fase = 'gevierd';
  else if (dagen > 0) {
    fase =
      uur >= PANIEK_VANAF ? 'paniek'
      : uur >= AVOND_VANAF ? 'avond'
      : uur >= MIDDAG_VANAF ? 'middag'
      : 'ochtend';
  } else if (laatsteActiviteitDatum === eergisteren(nu) && streakDagen > 0) {
    // Alleen op de dag ná het verlopen. Daarna de slapende vos die tot een nieuwe start uitnodigt:
    // wekenlang een skelet op je homescreen is geen aansporing meer maar een verwijt.
    fase = 'skelet';
  } else fase = 'slaap';

  // Maandag = 0. `getDay()` begint op zondag.
  const vandaagIndex = (nu.getDay() + 6) % 7;
  const leesdagen = new Set<string>();
  if (dagen > 0 && laatsteActiviteitDatum) {
    const [j, m, d] = laatsteActiviteitDatum.split('-').map(Number);
    for (let i = 0; i < Math.min(dagen, 7); i++) {
      leesdagen.add(vandaagSleutel(new Date(j, m - 1, d - i)));
    }
  }
  const week = Array.from({ length: 7 }, (_, i) =>
    leesdagen.has(vandaagSleutel(new Date(nu.getFullYear(), nu.getMonth(), nu.getDate() - vandaagIndex + i))),
  );

  return { fase, dagen, week, vandaagIndex };
}
