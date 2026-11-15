// De Eerste Wereldoorlog — v1 (2026-11-06). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/15-first-world-war/script.md
// Hook = één verkeerde afslag, twintig miljoen doden (open vraag: hoe?). Spanning: de mislukte bomaanslag. Twist: de
// chauffeur stopt om te keren, recht voor Princip.
// Echt beeld: de auto bij het stadhuis, Princip in zijn cel en de plaat van de Domenica del Corriere (1914, publiek
// domein, extra/first-world-war/); de rest gemaakt voor deze short (public/first-world-war-v1/) plus scènes uit de app.
import type { ShortConfig } from '../sjabloon/types';

const V = (n: string) => `first-world-war-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/first-world-war/${n}`;

const config: ShortConfig = {
  id: 'first-world-war',
  storyId: 'first-world-war',
  hook: 'ONE {WRONG TURN}.|{20 MILLION}|{DEAD}.',
  hookUntilBeat: 1,
  voiceTempo: 1.05,
  cover: { src: V('01-bocht'), aspect: STAAND, name: ['WORLD WAR', '{ONE}'], hook: 'ONE {WRONG TURN}' },
  beats: [
    /* 0 */ { say: 'A driver took one wrong turn.', cap: ['A driver took', 'one {wrong turn.}'], pauseAfter: 0.35 },
    /* 1 */ { say: 'Around twenty million people died.', cap: ['Around {twenty million}', 'people {died.}'], pauseAfter: 0.6 },
    /* 2 */ { say: 'Sarajevo, June nineteen fourteen.', cap: ['{Sarajevo,}', 'June 1914.'], pauseAfter: 0.2 },
    /* 3 */ { say: 'Archduke Franz Ferdinand rode through the city in an open car.', cap: ['Archduke', '{Franz Ferdinand}', 'rode through the city', 'in an {open car.}'], pauseAfter: 0.25 },
    /* 4 */ { say: 'A bomb bounced off his car and exploded behind it.', cap: ['A {bomb} bounced off', 'his car and', '{exploded} behind it.'], pauseAfter: 0.3 },
    /* 5 */ { say: 'One of the plotters, Gavrilo Princip, walked away.', cap: ['One of the plotters,', '{Gavrilo Princip,}', 'walked away.'], pauseAfter: 0.45 },
    /* 6 */ { say: 'Within the hour, he went to visit the wounded.', cap: ['{Within the hour,}', 'he went to visit', 'the {wounded.}'], pauseAfter: 0.25 },
    /* 7 */ { say: 'Nobody told his driver the new route.', cap: ['{Nobody told}', 'his driver', 'the {new route.}'], pauseAfter: 0.3 },
    /* 8 */ { say: 'He took a wrong turn and stopped to reverse.', cap: ['He took a {wrong turn}', 'and {stopped}', 'to reverse.'], pauseAfter: 0.35 },
    /* 9 */ { say: 'Right in front of Princip.', cap: ['Right in front', 'of {Princip.}'], pauseAfter: 0.7 },
    /* 10 */ { say: 'Two shots.', cap: ['{Two shots.}'], pauseAfter: 0.6 },
    /* 11 */ { say: 'One month later, Europe was at war.', cap: ['{One month} later,', 'Europe was', '{at war.}'], pauseAfter: 0.5 },
    /* 12 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: V('01-bocht'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.55 } },
    { kind: 'scene', from: 1, src: 'scenes/first-world-war-4.webp', motion: { kind: 'pan', x0: 0.35, x1: 0.6 } },
    { kind: 'scene', from: 2, src: 'scenes/first-world-war-2.webp', motion: { kind: 'pan', x0: 0.6, x1: 0.4 } },
    { kind: 'scene', from: 4, src: V('02-bom'), aspect: STAAND, motion: { kind: 'push', fx: 0.6, fy: 0.4 }, flash: true },
    { kind: 'scene', from: 5, src: X('princip-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3, zoom0: 1, zoom1: 1.15 } },
    { kind: 'scene', from: 6, src: X('ferdinand-sophie-guildhall-car-1914.jpg'), aspect: 1506 / 896, motion: { kind: 'push', fx: 0.6, fy: 0.45 } },
    { kind: 'scene', from: 7, src: V('03-chauffeur'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.3 } },
    { kind: 'scene', from: 8, src: V('04-stilstand'), aspect: STAAND, motion: { kind: 'push', fx: 0.6, fy: 0.6 } },
    { kind: 'scene', from: 9, src: V('05-princip'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 } },
    { kind: 'scene', from: 10, src: X('domenica-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.33, zoom0: 1, zoom1: 1.15 }, flash: true },
    { kind: 'scene', from: 11, src: 'scenes/first-world-war-1.webp', motion: { kind: 'pan', x0: 0.4, x1: 0.6 } },
    { kind: 'scene', from: 12, src: 'scenes/first-world-war-3.webp', motion: { kind: 'pan', x0: 0.5, x1: 0.35 } },
  ],
  years: [
    { beat: 2, text: 'JUNE 1914' },
    { beat: 11, text: 'JULY 1914' },
  ],
  stamps: [
    { beat: 9, big: '5 FEET', under: 'AWAY' },
  ],
  silenceOn: [9, 10],
};

export default config;
