// 9/11: Flight 93 — v1 (2026-11-06). Tekst en bronnen:
// marketing/9.archief/30-seconds-of-history/te-posten/16-september-11-attacks/script.md
// Ingetogen: geen inslagen, geen brandende torens, geen kaping in beeld. Hook = het vierde vliegtuig haalde Washington
// niet, omdat het te laat was (open vraag: hoezo?). Antwoord halverwege: door de vertraging wisten de passagiers het.
// Slot: twintig minuten van Washington.
// Echt beeld: de NPS-folder van het Flight 93 National Memorial (Library of Congress, publiek domein,
// extra/september-11-attacks/); de rest gemaakt voor deze short (public/september-11-attacks-v1/) plus een app-scène.
import type { MapStop, ShortConfig } from '../sjabloon/types';

const V = (n: string) => `september-11-attacks-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/september-11-attacks/${n}`;

const ROUTE: MapStop[] = [
  { name: 'Newark', lon: -74.17, lat: 40.69, label: 'right' },
  { name: 'Ohio', lon: -81.4, lat: 41.35, label: 'above' },
  { name: 'Shanksville', lon: -78.9, lat: 40.05, label: 'left' },
  { name: 'Washington', lon: -77.04, lat: 38.9, label: 'right' },
];

const config: ShortConfig = {
  id: 'september-11-attacks',
  storyId: 'september-11-attacks',
  hook: 'THE 4TH PLANE|NEVER REACHED|{WASHINGTON}.|{IT WAS LATE}',
  hookUntilBeat: 1,
  voiceTempo: 1.05,
  cover: { src: V('01-vliegtuig'), aspect: STAAND, name: ['FLIGHT', '{93}'], hook: 'THE PLANE THAT {WAS LATE}' },
  beats: [
    /* 0 */ { say: 'The fourth plane on nine eleven never reached Washington.', cap: ['The fourth plane', 'on {9/11}', 'never reached', '{Washington.}'], pauseAfter: 0.35 },
    /* 1 */ { say: 'Because it was late.', cap: ['Because', 'it was {late.}'], pauseAfter: 0.6 },
    /* 2 */ { say: 'Flight 93 took off twenty-five minutes late.', cap: ['{Flight 93}', 'took off', '{25 minutes late.}'], pauseAfter: 0.3 },
    /* 3 */ { say: 'Over Ohio, hijackers seized it and turned it around.', cap: ['Over {Ohio,}', 'hijackers seized it', 'and {turned it around.}'], pauseAfter: 0.3 },
    /* 4 */ { say: 'By then, both towers had been hit.', cap: ['By then,', 'both towers', 'had {been hit.}'], pauseAfter: 0.4 },
    /* 5 */ { say: 'The passengers called home.', cap: ['The passengers', '{called home.}'], pauseAfter: 0.25 },
    /* 6 */ { say: 'Their families told them what was happening.', cap: ['Their families', 'told them', '{what was happening.}'], pauseAfter: 0.4 },
    /* 7 */ { say: 'They took a vote.', cap: ['They took', 'a {vote.}'], pauseAfter: 0.4 },
    /* 8 */ { say: 'And they fought back.', cap: ['And they', '{fought back.}'], pauseAfter: 0.7 },
    /* 9 */ { say: 'It came down in a field in Pennsylvania.', cap: ['It came down', 'in a field', 'in {Pennsylvania.}'], pauseAfter: 0.4 },
    /* 10 */ { say: 'All forty passengers and crew died.', cap: ['All {forty}', 'passengers and crew', 'died.'], pauseAfter: 0.5 },
    /* 11 */ { say: 'Twenty minutes from Washington.', cap: ['{Twenty minutes}', 'from {Washington.}'], pauseAfter: 0.8 },
    /* 12 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: V('01-vliegtuig'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.3 } },
    { kind: 'scene', from: 1, src: V('02-gate'), aspect: STAAND, motion: { kind: 'push', fx: 0.6, fy: 0.35 } },
    { kind: 'scene', from: 2, src: X('delayed-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.27, zoom0: 1.15, zoom1: 1.4 } },
    { kind: 'map', from: 3, stops: ROUTE, fromStop: 0, toStop: 1, span: 14, zoom: [1, 0.9] },
    { kind: 'scene', from: 4, src: 'scenes/september-11-attacks-2.webp', motion: { kind: 'pan', x0: 0.45, x1: 0.6 } },
    { kind: 'scene', from: 5, src: V('03-telefoon'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.4 } },
    { kind: 'scene', from: 6, src: V('04-belt'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.3 } },
    { kind: 'scene', from: 7, src: V('05-stemming'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.35 } },
    { kind: 'scene', from: 9, src: V('06-veld'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    { kind: 'map', from: 11, stops: ROUTE, fromStop: 2, toStop: 2, span: 14, returnTo: 3, zoom: [0.9, 0.9], draw: 0.6 },
    { kind: 'scene', from: 12, src: X('veld-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.27, zoom0: 1.05, zoom1: 1.2 } },
  ],
  years: [
    { beat: 2, text: '11 SEPT 2001' },
  ],
  stamps: [

  ],
  silenceOn: [8, 11],
};

export default config;
