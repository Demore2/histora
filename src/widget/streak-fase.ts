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
  | 'ijs' // een streakbevriezer houdt de streak vast (1.3, de winkel)
  | 'skelet' // de streak verliep vannacht (alleen die ene dag)
  | 'slaap'; // nooit gelezen, of langer geleden: tijd voor een nieuwe start

/** Grenzen in lokale uren. Het eerste uur waarop de fase begint. */
const MIDDAG_VANAF = 12;
const AVOND_VANAF = 18;
const PANIEK_VANAF = 22;

/** Eén vakje van de weekbalk. */
export type WeekDag = 'gelezen' | 'bevroren' | null;

export type StreakStand = {
  fase: StreakFase;
  /** De streak zoals de app hem toont (0 als hij verlopen is). */
  dagen: number;
  /**
   * De zeven dagen van deze week (maandag eerst): een leesdag binnen de lopende streak, een dag
   * die een bevriezer overbrugde, of niets. Afgeleid, niet bijgehouden: de streak is per definitie een aaneengesloten reeks
   * dagen die eindigt op `laatsteActiviteitDatum`.
   */
  week: WeekDag[];
  /** Index (0 = maandag) van vandaag in `week`. */
  vandaagIndex: number;
};

function eergisteren(nu: Date): string {
  return vandaagSleutel(new Date(nu.getFullYear(), nu.getMonth(), nu.getDate() - 2));
}

/**
 * De dagen tussen de laatste leesdag en vandaag (exclusief beide), als lokale datumsleutels.
 * Leeg als de streak nog leeft (laatst gelezen vandaag of gisteren).
 */
export function gemisteDagen(laatsteActiviteitDatum: string | null, nu: Date = new Date()): string[] {
  if (!laatsteActiviteitDatum) return [];
  const [j, m, d] = laatsteActiviteitDatum.split('-').map(Number);
  const dagen: string[] = [];
  for (let i = 1; i < 30; i++) {
    const dag = vandaagSleutel(new Date(j, m - 1, d + i));
    if (dag >= vandaagSleutel(nu)) break;
    dagen.push(dag);
  }
  return dagen;
}

/** Wat de winkel weet over bevriezers (`winkel-store`); leeg als die nog niets geladen heeft. */
export type Bevriezing = { bevriezers: number; bevrorenDagen: string[] };

export function bepaalStreakStand(
  streakDagen: number,
  laatsteActiviteitDatum: string | null,
  nu: Date = new Date(),
  bevriezing: Bevriezing = { bevriezers: 0, bevrorenDagen: [] },
): StreakStand {
  let dagen = berekenHuidigeStreak(streakDagen, laatsteActiviteitDatum, nu);
  const vandaag = vandaagSleutel(nu);
  const gisteren = vandaagSleutel(new Date(nu.getFullYear(), nu.getMonth(), nu.getDate() - 1));
  const uur = nu.getHours();
  const gemist = gemisteDagen(laatsteActiviteitDatum, nu);
  // De streak is (straks) gered door een bevriezer: óf dat gebeurde al voor gisteren, óf de dagen
  // zijn gemist en er liggen genoeg bevriezers klaar die `useWinkel` bij het openen van de app
  // inzet. Dat tweede is een voorspelling — de widget draait ook als de app dicht is, en dan kan
  // er niets ingezet worden — maar dezelfde rekensom als in de hook, dus hij klopt zodra de app
  // opengaat. Een gelezen dag gaat altijd voor: dan juicht de vos gewoon.
  const bevroren =
    laatsteActiviteitDatum !== vandaag &&
    streakDagen > 0 &&
    (bevriezing.bevrorenDagen.includes(gisteren) ||
      (gemist.length > 0 && gemist.length <= bevriezing.bevriezers));
  if (bevroren && dagen === 0) dagen = streakDagen;

  let fase: StreakFase;
  if (laatsteActiviteitDatum === vandaag) fase = 'gevierd';
  else if (bevroren) fase = 'ijs';
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
  const ijsdagen = new Set([...bevriezing.bevrorenDagen, ...(bevroren ? gemist : [])]);
  const leesdagen = new Set<string>();
  if (dagen > 0 && laatsteActiviteitDatum) {
    // Terugtellen vanaf de laatste leesdag; een bevroren dag houdt de reeks vast maar telt niet als
    // leesdag, dus die wordt overgeslagen zonder de telling op te maken.
    const [j, m, d] = laatsteActiviteitDatum.split('-').map(Number);
    let over = Math.min(dagen, 7);
    for (let i = 0; over > 0 && i < 14; i++) {
      const dag = vandaagSleutel(new Date(j, m - 1, d - i));
      if (ijsdagen.has(dag)) continue;
      leesdagen.add(dag);
      over--;
    }
  }
  const week: WeekDag[] = Array.from({ length: 7 }, (_, i) => {
    const dag = vandaagSleutel(new Date(nu.getFullYear(), nu.getMonth(), nu.getDate() - vandaagIndex + i));
    return leesdagen.has(dag) ? 'gelezen' : ijsdagen.has(dag) ? 'bevroren' : null;
  });

  return { fase, dagen, week, vandaagIndex };
}
