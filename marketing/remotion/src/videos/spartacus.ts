// Spartacus — v3, na de review van de eigenaar. Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/gepost/05-spartacus/script.md
// Eén doorlopende lijn: de berg waar de opstand begon, is de berg die Pompeii begroef. Alle beelden zijn voor
// deze short gemaakt (9:16, schermvullend, één stijl) en staan in public/spartacus-v3/.
import type { MapStop, ShortConfig } from '../sjabloon/types';

const ROUTE: MapStop[] = [
  { name: 'Capua', lon: 14.25, lat: 41.08, label: 'left' }, // 0
  { name: 'Vesuvius', lon: 14.43, lat: 40.82 }, // 1
  { name: 'Alps', lon: 10.93, lat: 44.9, label: 'above' }, // 2 (bij Mutina keerde hij om)
];

const STAAND = 9 / 16;
const beeld = (n: string) => `spartacus-v3/${n}.png`;

const config: ShortConfig = {
  id: 'spartacus',
  storyId: 'spartacus',
  hook: 'SPARTACUS|VS {ROME}',
  hookUntilBeat: 1,
  // 1.25: op 1.2 werd het 43 s. De opname pauzeert bij komma's, dus timing met vaste zinsgrenzen:
  // npm run timing -- spartacus --grens 1.82 --grens 7.78 --grens 9.60 --grens 14.16 --grens 16.70 --grens 18.65
  //   --grens 21.89 --grens 23.23 --grens 27.26 --grens 29.09 --grens 30.62 --grens 33.79 --grens 36.96
  voiceTempo: 1.25,
  cover: { src: beeld('01'), aspect: STAAND, name: ['{SPARTACUS}'], hook: 'ONE GLADIATOR {VS ROME}' },
  beats: [
    /* 0 */ { say: 'Spartacus versus Rome.', cap: ['{Spartacus}', 'versus Rome.'], pauseAfter: 0.22 },
    /* 1 */ { say: 'In seventy-three BC, he and about seventy gladiators broke out of their school in Capua.', cap: ['In 73 BC,', 'he and about', '{seventy gladiators}', '{broke out}', 'of their school in Capua.'] },
    /* 2 */ { say: 'Rome trapped them on a mountain.', cap: ['Rome {trapped} them', 'on a mountain.'] },
    /* 3 */ { say: 'They climbed down the cliffs on ropes of wild vines, and attacked from behind.', cap: ['They climbed down', 'the cliffs', 'on ropes of {wild vines},', 'and attacked', '{from behind.}'], pauseAfter: 0.22 },
    /* 4 */ { say: 'Tens of thousands of slaves joined him.', cap: ['{Tens of thousands}', 'of slaves', 'joined him.'] },
    /* 5 */ { say: 'He beat army after army.', cap: ['He beat {army}', 'after {army.}'], pauseAfter: 0.22 },
    /* 6 */ { say: 'He marched north, to the Alps, then turned back.', cap: ['He marched north,', 'to the {Alps},', 'then {turned back.}'], pauseAfter: 0.22 },
    /* 7 */ { say: 'No one knows why.', cap: ['{No one knows why.}'], pauseAfter: 0.4 },
    /* 8 */ { say: 'In seventy-one BC, Crassus crushed his army in the south of Italy.', cap: ['In 71 BC,', 'Crassus {crushed}', 'his army', 'in the south of Italy.'], pauseAfter: 0.22 },
    /* 9 */ { say: 'Spartacus died fighting.', cap: ['Spartacus', 'died {fighting.}'], pauseAfter: 0.2 },
    /* 10 */ { say: 'His body was never found.', cap: ['His body', 'was {never found.}'], pauseAfter: 0.6 },
    /* 11 */ { say: 'And the mountain where it all began was Vesuvius.', cap: ['And the mountain', 'where it all began', 'was {Vesuvius.}'], pauseAfter: 1.1 },
    /* 12 */ { say: 'A hundred and fifty years later, it buried Pompeii.', cap: ['A hundred and fifty', 'years later,', 'it buried {Pompeii.}'], pauseAfter: 0.4 },
    /* 13 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: beeld('01'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.45 } },
    { kind: 'scene', from: 1, src: beeld('02'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.5 }, flash: true },
    { kind: 'scene', from: 2, src: beeld('03'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 } },
    { kind: 'scene', from: 3, src: beeld('04'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.45 } },
    { kind: 'scene', from: 4, src: beeld('06'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.5 } },
    { kind: 'scene', from: 5, src: beeld('05'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.45 }, flash: true },
    // "He marched north, to the Alps, then turned back. No one knows why."
    { kind: 'map', from: 6, stops: ROUTE, fromStop: 0, toStop: 2, span: 10, zoom: [0.9, 0.7] },
    { kind: 'scene', from: 8, src: beeld('07'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.45 }, flash: true },
    { kind: 'scene', from: 9, src: beeld('08'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    // De berg waar het begon: dezelfde berg als in beat 2, nu vredig; dan de uitbarsting.
    { kind: 'scene', from: 11, src: beeld('09'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 } },
    // lead: de uitbarsting staat en klinkt eerst, de stem volgt (de pauze na beat 11 is daarvoor 1.1 s).
    { kind: 'scene', from: 12, src: beeld('10'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.35 }, flash: true, lead: 0.85 },
  ],
  years: [
    { beat: 2, text: '73 BC' }, // niet op beat 1: daar staat de hook met zijn kicker nog
    { beat: 6, text: '72 BC' },
    { beat: 8, text: '71 BC' },
    { beat: 12, text: 'AD 79', lead: 0.95 },
  ],
  stamps: [],
  silenceOn: [11],
};

export default config;
