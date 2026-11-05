// Genghis Khan — v1 (zondag 15 november 2026, 20:00 NL). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/13-genghis-khan/script.md
// Hook = het DNA-raadsel (1 op 200 mannen), de naam pas op beat 7. Twist: nooit bewezen, en zijn graf is nooit gevonden.
// 9:16-beelden gemaakt voor deze short (public/genghis-khan-v1/) + het Yuan-portret (extra/, public domain).
import type { MapStop, ShortConfig } from '../sjabloon/types';

const V = (n: string) => `genghis-khan-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/genghis-khan/${n}`;

const HERKOMST: MapStop[] = [{ name: 'Mongolia', lon: 108.0, lat: 47.5, label: 'above' }];

const HEERSERS: MapStop[] = [
  { name: 'Khanbaliq', lon: 116.4, lat: 39.9 }, // 0 (Beijing)
  { name: 'Karakorum', lon: 102.8, lat: 47.2, label: 'above' }, // 1
  { name: 'Sarai', lon: 47.5, lat: 48.5, label: 'left' }, // 2 (Gouden Horde, Rusland)
];

// Het Mongoolse rijk rond 1279, vereenvoudigd (lon, lat); wordt op het land geknipt.
const RIJK: [number, number][] = [
  [30.0, 45.0], [30.0, 52.0], [40.0, 56.0], [50.0, 57.0], [60.0, 57.0], [75.0, 55.0], [90.0, 52.0], [100.0, 53.0],
  [110.0, 52.0], [120.0, 53.0], [130.0, 50.0], [132.0, 45.0], [128.0, 40.0], [124.0, 39.0], [122.0, 36.0], [120.0, 30.0],
  [118.0, 24.0], [110.0, 21.0], [105.0, 22.0], [100.0, 22.0], [98.0, 25.0], [95.0, 29.0], [88.0, 30.0], [80.0, 33.0],
  [72.0, 35.0], [66.0, 33.0], [62.0, 27.0], [58.0, 25.0], [52.0, 27.0], [48.0, 30.0], [44.0, 33.0], [40.0, 36.0],
  [38.0, 38.0], [36.0, 40.0], [34.0, 44.0],
];
const TERRITORIUM = { polygon: RIJK, label: 'MONGOL EMPIRE', full: true };

// Waar Zerjal et al. (2003) de lijn bij ~8% van de mannen vonden: van de Kaspische Zee tot de Stille Oceaan, vereenvoudigd.
const VERSPREIDING: [number, number][] = [
  [50.0, 40.0], [52.0, 52.0], [70.0, 55.0], [90.0, 54.0], [110.0, 54.0], [125.0, 52.0], [135.0, 48.0], [130.0, 42.0],
  [120.0, 38.0], [110.0, 36.0], [95.0, 38.0], [80.0, 38.0], [65.0, 36.0], [55.0, 37.0],
];

const config: ShortConfig = {
  id: 'genghis-khan',
  storyId: 'genghis-khan',
  hook: '1 IN 200 MEN|SHARE|{ONE ANCESTOR}.|{WHO?}',
  hookUntilBeat: 1,
  voiceTempo: 1.1,
  cover: { src: X('genghis-khan-yuan-portrait.jpg'), aspect: 1890 / 2400, name: ['GENGHIS', '{KHAN}'], hook: '1 IN 200 MEN. {ONE ANCESTOR?}' },
  beats: [
    /* 0 */ { say: 'One in two hundred men alive today may share one ancestor.', cap: ['{One in two hundred} men', 'alive today', 'may share', '{one ancestor.}'], pauseAfter: 0.3 },
    /* 1 */ { say: 'So who was he?', cap: ['So {who was he?}'], pauseAfter: 0.45 },
    /* 2 */ { say: 'In two thousand three, geneticists found the same Y chromosome in sixteen million men across Asia.', cap: ['In {2003},', 'geneticists found', 'the same {Y chromosome}', 'in {sixteen million} men', 'across Asia.'], pauseAfter: 0.2 },
    /* 3 */ { say: 'It led back about a thousand years, to Mongolia.', cap: ['It led back', 'about a {thousand years},', 'to {Mongolia.}'], pauseAfter: 0.25 },
    /* 4 */ { say: 'Their best suspect: an orphan named Temujin.', cap: ['Their best suspect:', 'an orphan', 'named {Temüjin.}'], pauseAfter: 0.2 },
    /* 5 */ { say: 'His father was poisoned.', cap: ['His father', 'was {poisoned.}'], pauseAfter: 0.15 },
    /* 6 */ { say: 'His family was cast out.', cap: ['His family', 'was {cast out.}'], pauseAfter: 0.3 },
    /* 7 */ { say: 'He became Genghis Khan.', cap: ['He became', '{Genghis Khan.}'], pauseAfter: 0.3 },
    /* 8 */ { say: 'He began the largest land empire in history.', cap: ['He began the', '{largest land empire}', 'in history.'], pauseAfter: 0.15 },
    /* 9 */ { say: 'His sons and grandsons ruled from China to Russia, with many wives.', cap: ['His sons and grandsons', 'ruled from {China}', 'to {Russia},', 'with {many wives.}'], pauseAfter: 0.4 },
    /* 10 */ { say: 'It has never been proven.', cap: ['It has', '{never been proven.}'], pauseAfter: 0.4 },
    /* 11 */ { say: 'And his grave has never been found.', cap: ['And his grave', 'has {never been found.}'], pauseAfter: 0.4 },
    /* 12 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: V('05-leger'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    { kind: 'scene', from: 1, src: V('01-ruiter'), aspect: STAAND, motion: { kind: 'push', fx: 0.48, fy: 0.42 } },
    { kind: 'map', from: 2, stops: HERKOMST, fromStop: 0, toStop: 0, span: 90, zoom: [1, 0.8], territory: { polygon: VERSPREIDING, full: true } },
    { kind: 'scene', from: 4, src: V('02-jongen'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 } },
    { kind: 'scene', from: 5, src: V('03-verlaten'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.4 } },
    { kind: 'scene', from: 7, src: X('portrait-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 }, flash: true },
    { kind: 'map', from: 8, stops: HEERSERS, fromStop: 1, toStop: 1, span: 110, zoom: [1, 0.75], territory: TERRITORIUM },
    { kind: 'map', from: 9, stops: HEERSERS, fromStop: 0, toStop: 2, span: 110, zoom: [1, 0.6], territory: TERRITORIUM },
    { kind: 'scene', from: 11, src: V('04-bergen'), aspect: STAAND, motion: { kind: 'push', fx: 0.75, fy: 0.25 } },
  ],
  years: [
    { beat: 2, text: '2003' },
    { beat: 4, text: 'c. 1170' },
    { beat: 7, text: '1206' },
    { beat: 9, text: '1279' },
    { beat: 11, text: 'TODAY' },
  ],
  stamps: [
    { beat: 2, over: 'MEN ACROSS ASIA', big: '16,000,000' },
    { beat: 10, big: 'NOT PROVEN' },
  ],
  silenceOn: [10],
};

export default config;
