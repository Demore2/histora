// Cleopatra — v1 (maandag 9 november 2026). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/09-cleopatra/script.md
// Opent op een tijdlijn op schaal (piramide · Cleopatra · maanlanding). Hook = "So who was she, really?",
// antwoord aan het eind: een Macedonische Griekse, de eerste van haar familie die Egyptisch leerde.
// Haakt aan op de Alexander-short: haar familie stamde af van een van zijn generaals.
import type { MapStop, ShortConfig } from '../sjabloon/types';

const HERKOMST: MapStop[] = [
  { name: 'Macedon', lon: 22.52, lat: 40.76, label: 'left' }, // 0 (Pella)
  { name: 'Alexandria', lon: 29.92, lat: 31.2 }, // 1
];

const config: ShortConfig = {
  id: 'cleopatra',
  storyId: 'cleopatra',
  hook: 'CLOSER TO THE|{MOON LANDING}|THAN TO THE|{PYRAMIDS}',
  hookUntilBeat: 1,
  voiceTempo: 1.1,
  cover: { src: 'characters/cleopatra.webp', aspect: 880 / 1168, name: ['{CLEOPATRA}'], hook: 'CLOSER TO THE {MOON LANDING}' },
  beats: [
    /* 0 */ { say: 'Cleopatra lived closer to the Moon landing than to the building of the Great Pyramid.', cap: ['Cleopatra lived', 'closer to the {Moon landing}', 'than to the building', 'of the {Great Pyramid.}'], pauseAfter: 0.3 },
    /* 1 */ { say: 'So who was she, really?', cap: ['So who was she,', '{really?}'], pauseAfter: 0.45 },
    /* 2 */ { say: 'At eighteen, she became queen of Egypt.', cap: ['At {eighteen},', 'she became', 'queen of {Egypt.}'], pauseAfter: 0.15 },
    /* 3 */ { say: 'She won over Julius Caesar.', cap: ['She won over', '{Julius Caesar.}'] },
    /* 4 */ { say: 'Then Mark Antony.', cap: ['Then', '{Mark Antony.}'], pauseAfter: 0.2 },
    /* 5 */ { say: 'At Actium, Rome crushed their fleet.', cap: ['At {Actium},', 'Rome {crushed}', 'their fleet.'], pauseAfter: 0.2 },
    /* 6 */ { say: 'A year later, she was dead.', cap: ['A year later,', 'she was {dead.}'], pauseAfter: 0.5 },
    /* 7 */ { say: "But Cleopatra wasn't Egyptian.", cap: ['But Cleopatra', "{wasn't Egyptian.}"], pauseAfter: 0.5 },
    /* 8 */ { say: "Her family were Macedonian Greeks, from one of Alexander the Great's generals.", cap: ['Her family were', '{Macedonian Greeks},', 'from one of', "{Alexander the Great's}", 'generals.'], pauseAfter: 0.2 },
    /* 9 */ { say: 'In almost three hundred years, she was the first of them to learn Egyptian.', cap: ['In almost', '{three hundred years},', 'she was the {first}', 'to learn {Egyptian.}'], pauseAfter: 0.3 },
    /* 10 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    {
      kind: 'timeline', from: 0, backdrop: 'scenes/cleopatra-2.webp',
      points: [
        { year: -2560, yearLabel: '2560 BC', label: 'GREAT|PYRAMID', icon: 'pyramid' },
        { year: -30, yearLabel: '30 BC', label: 'CLEOPATRA', img: 'characters/cleopatra.webp', highlight: true },
        { year: 1969, yearLabel: '1969', label: 'MOON|LANDING', icon: 'moon' },
      ],
      gaps: [
        { a: 0, b: 1, label: '2,530 YEARS', side: 'below' },
        { a: 1, b: 2, label: '1,998 YEARS', side: 'below' },
      ],
    },
    { kind: 'scene', from: 2, src: 'scenes/cleopatra-2.webp', motion: { kind: 'push', fx: 0.28, fy: 0.35 } },
    { kind: 'scene', from: 3, src: 'scenes/cleopatra-3.webp', motion: { kind: 'push', fx: 0.55, fy: 0.35 } },
    { kind: 'scene', from: 4, src: 'scenes/cleopatra-5.webp', motion: { kind: 'push', fx: 0.48, fy: 0.42 } },
    { kind: 'scene', from: 5, src: 'scenes/cleopatra-7.webp', motion: { kind: 'pan', x0: 0.3, x1: 0.55 }, flash: true },
    { kind: 'scene', from: 6, src: 'scenes/cleopatra-8.webp', motion: { kind: 'push', fx: 0.42, fy: 0.4 } },
    { kind: 'scene', from: 7, src: 'characters/cleopatra.webp', aspect: 880 / 1168, motion: { kind: 'push', fx: 0.5, fy: 0.3 }, flash: true },
    { kind: 'map', from: 8, stops: HERKOMST, fromStop: 0, toStop: 1, span: 18, zoom: [1, 0.7], lead: 0.4, draw: 0.6 },
    { kind: 'scene', from: 9, src: 'scenes/cleopatra-1.webp', motion: { kind: 'push', fx: 0.3, fy: 0.3 } },
  ],
  years: [
    { beat: 2, text: '51 BC' },
    { beat: 3, text: '48 BC' },
    { beat: 4, text: '41 BC' },
    { beat: 5, text: '31 BC' },
    { beat: 6, text: '30 BC' },
    { beat: 8, text: '323 BC' },
    { beat: 9, text: '323–30 BC' },
  ],
  stamps: [
    { beat: 2, over: 'QUEEN AT', big: '18', countUp: true },
    { beat: 9, over: 'THE FIRST TO LEARN', big: 'EGYPTIAN' },
  ],
  silenceOn: [7],
};

export default config;
