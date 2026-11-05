// Qin Shi Huang — v1 (woensdag 11 november 2026, 20:00 NL). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/11-qin-shi-huang/script.md
// Hook = "So what killed him at forty-nine?", antwoord halverwege (kwik), twist: het graf is nooit geopend.
// 9:16-beelden gemaakt voor deze short (public/qin-shi-huang-v1/) + echte foto's van het terracottaleger (extra/).
import type { MapStop, ShortConfig } from '../sjabloon/types';

const V = (n: string) => `qin-shi-huang-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/qin-shi-huang/${n}`;

const HOOFDSTAD: MapStop[] = [{ name: 'Xianyang', lon: 108.7, lat: 34.33 }];

// Het Qin-rijk na de eenwording (221 v.Chr.), vereenvoudigd (lon, lat); wordt op het land geknipt.
const RIJK: [number, number][] = [
  [102.0, 36.0], [104.0, 38.0], [108.0, 40.5], [112.0, 41.0], [117.0, 41.0], [121.0, 41.0], [124.0, 40.0],
  [122.0, 37.0], [120.0, 34.0], [121.5, 31.0], [121.0, 28.0], [119.0, 25.0], [116.0, 23.0], [112.0, 22.0],
  [109.0, 21.5], [107.0, 23.0], [104.0, 26.0], [102.0, 28.0], [102.0, 31.0], [103.0, 34.0],
];

const config: ShortConfig = {
  id: 'qin-shi-huang',
  storyId: 'qin-shi-huang',
  hook: 'HE WANTED TO|{LIVE FOREVER}.|SO WHAT|{KILLED HIM?}',
  hookUntilBeat: 1,
  voiceTempo: 1.05,
  cover: { src: V('01-troon'), aspect: STAAND, name: ['QIN', '{SHI HUANG}'], hook: 'WANTED TO {LIVE FOREVER}' },
  beats: [
    /* 0 */ { say: 'He wanted to live forever.', cap: ['He wanted to', '{live forever.}'], pauseAfter: 0.35 },
    /* 1 */ { say: 'So what killed him at forty-nine?', cap: ['So what {killed him}', 'at {forty-nine?}'], pauseAfter: 0.55 },
    /* 2 */ { say: 'He was the First Emperor of China.', cap: ['He was the', '{First Emperor}', 'of China.'], pauseAfter: 0.2 },
    /* 3 */ { say: 'He sent ships across the sea to find the elixir of life.', cap: ['He sent ships', 'across the sea', 'to find the', '{elixir of life.}'], pauseAfter: 0.25 },
    /* 4 */ { say: 'And he swallowed pills made by his alchemists.', cap: ['And he swallowed {pills}', 'made by his {alchemists.}'], pauseAfter: 0.3 },
    /* 5 */ { say: 'Many historians think they contained mercury.', cap: ['Many historians think', 'they contained', '{mercury.}'], pauseAfter: 0.5 },
    /* 6 */ { say: 'He died on the road, far from his capital.', cap: ['He {died} on the road,', 'far from his capital.'], pauseAfter: 0.35 },
    /* 7 */ { say: 'Eight thousand clay soldiers were buried to guard him.', cap: ['{Eight thousand}', 'clay soldiers', 'were buried', 'to guard him.'], pauseAfter: 0.3 },
    /* 8 */ { say: 'But his own tomb has never been opened.', cap: ['But his own tomb', 'has {never been opened.}'], pauseAfter: 0.55 },
    /* 9 */ { say: 'An ancient historian wrote that rivers of mercury flow inside.', cap: ['An ancient historian', 'wrote that', '{rivers of mercury}', 'flow inside.'], pauseAfter: 0.3 },
    /* 10 */ { say: 'And the soil above it still holds strange amounts of mercury.', cap: ['And the soil above it', 'still holds', '{strange amounts}', 'of mercury.'], pauseAfter: 0.45 },
    /* 11 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: V('01-troon'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.38 } },
    { kind: 'scene', from: 1, src: V('02-angst'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.42 } },
    { kind: 'map', from: 2, stops: HOOFDSTAD, fromStop: 0, toStop: 0, span: 30, zoom: [1, 0.75], territory: { polygon: RIJK, label: 'QIN CHINA', full: true } },
    { kind: 'scene', from: 3, src: V('03-vloot'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.55 } },
    { kind: 'scene', from: 4, src: V('04-alchemist'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.5 } },
    { kind: 'scene', from: 5, src: V('05-kwik'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.5 }, flash: true },
    { kind: 'scene', from: 6, src: V('06-wagen'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.45 } },
    { kind: 'scene', from: 7, src: X('terracotta-army-pit-1-rows.jpg'), aspect: 4 / 3, motion: { kind: 'pan', x0: 0.35, x1: 0.62 } },
    { kind: 'scene', from: 8, src: X('terracotta-warrior-face.jpg'), aspect: 2 / 3, motion: { kind: 'push', fx: 0.5, fy: 0.35 }, flash: true },
    { kind: 'scene', from: 9, src: V('07-graf-doorsnede'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.6 } },
    { kind: 'scene', from: 10, src: V('08-grafheuvel'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
  ],
  years: [
    { beat: 2, text: '221 BC' },
    { beat: 3, text: '219 BC' },
    { beat: 6, text: '210 BC' },
    { beat: 8, text: 'TODAY' },
  ],
  stamps: [
    { beat: 5, big: 'MERCURY' },
    { beat: 7, over: 'CLAY SOLDIERS', big: '8000', countUp: true },
    { beat: 10, over: 'THE TOMB IS', big: 'STILL SEALED' },
  ],
  silenceOn: [8],
};

export default config;
