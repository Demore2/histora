// Alexander the Great — v5 (30-secondenformaat, hook: "So who stopped him?") voor het Remotion-sjabloon. Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/06-alexander-the-great/script.md
// Elke beat is één hele zin: zo vindt scripts/timing.mjs de grenzen in een doorlopende opname.
import type { MapStop, ShortConfig } from '../sjabloon/types';

const ROUTE: MapStop[] = [
  { name: 'Pella', lon: 22.52, lat: 40.76, label: 'left' }, // 0
  { name: 'Hellespont', lon: 26.4, lat: 40.2 }, // 1
  { name: 'Issus', lon: 36.2, lat: 36.85, label: 'left' }, // 2
  { name: 'Gaugamela', lon: 43.3, lat: 36.6 }, // 3
  { name: 'Babylon', lon: 44.42, lat: 32.54, label: 'left' }, // 4
  { name: 'Persepolis', lon: 52.89, lat: 29.93 }, // 5
  { name: 'Hyphasis', lon: 75.1, lat: 31.4, label: 'above' }, // 6
];

// Het rijk rond 323 v.Chr., vereenvoudigd (lon, lat). Wordt op het land geknipt, dus de randen over zee
// mogen ruw zijn; alleen de grenzen over land zijn zichtbaar.
const RIJK: [number, number][] = [
  [19.3, 40.0], [20.2, 41.9], [22.8, 42.4], [26.5, 42.1], [29.0, 41.4], [31.5, 41.6], [35.0, 42.3], [39.5, 41.3],
  [42.0, 41.6], [44.8, 41.1], [47.5, 40.4], [49.2, 38.3], [51.0, 37.2], [54.0, 37.4], [56.8, 38.3], [59.5, 39.8],
  [62.5, 41.8], [66.5, 42.0], [69.5, 41.0], [71.0, 39.3], [70.6, 37.2], [71.8, 35.6], [74.2, 35.0], [76.5, 32.8],
  [75.8, 30.4], [72.6, 28.3], [70.8, 25.5], [68.0, 23.5], [64.0, 24.6], [60.0, 24.8], [57.0, 25.8], [54.0, 26.2],
  [50.5, 28.0], [48.3, 29.6], [46.5, 30.0], [44.0, 31.0], [41.0, 32.3], [38.5, 31.2], [36.2, 29.6], [34.6, 28.0],
  [33.8, 26.0], [33.2, 23.6], [32.6, 21.8], [30.8, 21.8], [28.8, 24.6], [27.0, 28.2], [25.2, 31.6], [27.5, 34.0],
  [26.0, 36.5], [23.8, 36.2], [21.2, 37.2],
];
const TERRITORIUM = { polygon: RIJK, label: "ALEXANDER'S EMPIRE" };

// v5 (2026-11-04): terug naar het 30-secondenformaat, max ~35 s mét CTA. Hook = open vraag ("So who stopped
// him?"), het antwoord pas bij beat 7 (Hyphasis), korte twist aan het eind (het verdwenen graf). De neus is eruit.
const config: ShortConfig = {
  id: 'alexander-the-great',
  storyId: 'alexander-the-great',
  hook: 'NEVER {LOST}.|SO WHO|{STOPPED HIM?}',
  hookUntilBeat: 1,
  voiceTempo: 1.1,
  cover: { src: 'characters/alexander-the-great.webp', aspect: 3 / 4, name: ['ALEXANDER', '{THE GREAT}'], hook: 'NEVER LOST. {SO WHO STOPPED HIM?}' },
  beats: [
    /* 0 */ { say: 'He never lost a battle.', cap: ['He {never lost}', 'a battle.'] },
    /* 1 */ { say: 'So who stopped him?', cap: ['So who', '{stopped him?}'], pauseAfter: 0.4 },
    /* 2 */ { say: 'At twenty, Alexander became king of Macedon.', cap: ['At {twenty},', 'Alexander became', 'king of {Macedon.}'], pauseAfter: 0.12 },
    /* 3 */ { say: 'He crossed into Asia.', cap: ['He crossed into {Asia.}'] },
    /* 4 */ { say: 'Twice, the Persian king fled from him.', cap: ['{Twice,}', 'the Persian king', '{fled} from him.'] },
    /* 5 */ { say: 'He marched on, all the way to India.', cap: ['He marched on,', 'all the way to {India.}'] },
    /* 6 */ { say: 'From Greece to India, it was all his.', cap: ['From {Greece}', 'to {India,}', 'it was {all his.}'], pauseAfter: 0.25 },
    /* 7 */ { say: 'Then, at the river Hyphasis, his own soldiers refused to go on.', cap: ['At the river Hyphasis,', '{his own soldiers}', '{refused} to go on.'], pauseAfter: 0.4 },
    /* 8 */ { say: 'Three years later, he was dead, at thirty-two.', cap: ['Three years later,', 'he was {dead,}', 'at {thirty-two.}'], pauseAfter: 0.25 },
    /* 9 */ { say: 'And to this day, no one knows where he is buried.', cap: ['And to this day,', '{no one knows}', 'where he is {buried.}'], pauseAfter: 0.25 },
    /* 10 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: 'scenes/alexander-the-great-6.webp', motion: { kind: 'push', fx: 0.45, fy: 0.5 } },
    { kind: 'scene', from: 1, src: 'scenes/alexander-the-great-2.webp', motion: { kind: 'pan', x0: 0.4, x1: 0.6 } },
    { kind: 'scene', from: 2, src: 'characters/alexander-the-great.webp', aspect: 3 / 4, motion: { kind: 'push', fx: 0.5, fy: 0.35 }, flash: true },
    { kind: 'map', from: 3, stops: ROUTE, fromStop: 0, toStop: 3, span: 26, territory: TERRITORIUM },
    { kind: 'scene', from: 4, src: 'scenes/alexander-the-great-4.webp', motion: { kind: 'push', fx: 0.5, fy: 0.5 }, flash: true },
    { kind: 'map', from: 5, stops: ROUTE, fromStop: 3, toStop: 6, span: 30, territory: TERRITORIUM },
    { kind: 'map', from: 6, stops: ROUTE, fromStop: 6, toStop: 6, span: 30, zoom: [1, 0.4], territory: { ...TERRITORIUM, full: true } },
    { kind: 'scene', from: 7, src: 'scenes/alexander-the-great-7.webp', motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    { kind: 'scene', from: 8, src: 'scenes/alexander-the-great-8.webp', motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    { kind: 'scene', from: 9, src: 'scenes/alexander-the-great-5.webp', motion: { kind: 'pan', x0: 0.35, x1: 0.65 } },
  ],
  years: [
    { beat: 2, text: '336 BC' },
    { beat: 3, text: '334 BC' },
    { beat: 4, text: '333 BC' },
    { beat: 5, text: '326 BC' },
    { beat: 8, text: '323 BC' },
  ],
  stamps: [
    { beat: 2, over: 'KING AT', big: '20', countUp: true },
    { beat: 8, over: 'DEAD AT', big: '32', countUp: true },
    { beat: 9, over: 'HIS TOMB', big: 'LOST' },
  ],
  silenceOn: [7],
};

export default config;
