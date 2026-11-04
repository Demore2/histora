// Mansa Musa — v1 (vrijdag 6 november 2026). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/07-mansa-musa/script.md
// Hook = open vraag ("So why did he go home in debt?"), antwoord pas aan het eind: op de terugweg was het op.
// Het echte bronbeeld (de Catalaanse Atlas, 1375) bij de onthulling van wie hij is.
import type { MapStop, ShortConfig } from '../sjabloon/types';

const ROUTE: MapStop[] = [
  { name: 'Mali', lon: -8.4, lat: 11.4, label: 'left' }, // 0 (Niani, de hoofdstad; precieze plek onzeker)
  { name: 'Walata', lon: -7.0, lat: 17.3, label: 'left' }, // 1
  { name: 'Tuat', lon: 0.2, lat: 27.0, label: 'above' }, // 2
  { name: 'Cairo', lon: 31.24, lat: 30.04, label: 'above' }, // 3
  { name: 'Mecca', lon: 39.83, lat: 21.42, label: 'left' }, // 4
];

// Geen rijksgebied op de kaart: RouteMap centreert bij het uitzoomen op het gebied, en hier moet de hele route
// (Mali → Mecca, en de terugweg) in beeld komen.

const config: ShortConfig = {
  id: 'mansa-musa',
  storyId: 'mansa-musa',
  hook: 'SO MUCH {GOLD}.|SO WHY WAS HE|{IN DEBT?}',
  hookUntilBeat: 1,
  voiceTempo: 1.1,
  cover: { src: 'characters/mansa-musa.webp', aspect: 16 / 9, focus: 0.44, name: ['MANSA', '{MUSA}'], hook: 'TOO MUCH GOLD. {THEN IN DEBT.}' },
  beats: [
    /* 0 */ { say: 'He gave away so much gold, its price in Cairo fell for years.', cap: ['He gave away', 'so much {gold},', 'its price in Cairo', '{fell for years.}'] },
    /* 1 */ { say: 'So why did he go home in debt?', cap: ['So why did he', 'go home {in debt?}'], pauseAfter: 0.45 },
    /* 2 */ { say: 'This is Mansa Musa, king of Mali, a land of gold.', cap: ['This is {Mansa Musa},', 'king of {Mali},', 'a land of {gold.}'], pauseAfter: 0.15 },
    /* 3 */ { say: 'In thirteen twenty-four, he crossed the Sahara to Mecca.', cap: ['In {1324},', 'he crossed the {Sahara}', 'to {Mecca.}'] },
    /* 4 */ { say: 'His camels carried gold, and in Cairo, he gave it away to everyone.', cap: ['His camels', 'carried {gold},', 'and in Cairo,', 'he gave it away', 'to {everyone.}'], pauseAfter: 0.2 },
    /* 5 */ { say: 'Twelve years later, gold there was still worth less.', cap: ['{Twelve years} later,', 'gold there was', 'still {worth less.}'], pauseAfter: 0.35 },
    /* 6 */ { say: 'And on the way home, he ran out.', cap: ['And on the way home,', 'he {ran out.}'], pauseAfter: 0.45 },
    /* 7 */ { say: 'The richest king of his age had to borrow money.', cap: ['The {richest king}', 'of his age', 'had to {borrow money.}'], pauseAfter: 0.25 },
    /* 8 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: 'scenes/mansa-musa-3.webp', motion: { kind: 'push', fx: 0.6, fy: 0.3 } },
    { kind: 'scene', from: 1, src: 'characters/mansa-musa.webp', motion: { kind: 'push', fx: 0.45, fy: 0.3 } },
    { kind: 'scene', from: 2, src: 'extra/mansa-musa/catalaanse-atlas-1375.jpg', aspect: 1600 / 1141, motion: { kind: 'push', fx: 0.45, fy: 0.32 }, flash: true },
    { kind: 'map', from: 3, stops: ROUTE, fromStop: 0, toStop: 4, span: 30, zoom: [1, 0.4] },
    { kind: 'scene', from: 4, src: 'scenes/mansa-musa-4.webp', motion: { kind: 'push', fx: 0.12, fy: 0.45 }, flash: true },
    { kind: 'scene', from: 5, src: 'scenes/mansa-musa-1.webp', motion: { kind: 'pan', x0: 0.3, x1: 0.6 } },
    { kind: 'map', from: 6, stops: ROUTE, fromStop: 4, toStop: 4, span: 30, returnTo: 3, zoom: [0.4, 0.4] },
    { kind: 'scene', from: 7, src: 'scenes/mansa-musa-5.webp', motion: { kind: 'push', fx: 0.38, fy: 0.35 }, flash: true },
    { kind: 'scene', from: 8, src: 'scenes/mansa-musa-6.webp', motion: { kind: 'pan', x0: 0.35, x1: 0.65 } },
  ],
  years: [
    { beat: 3, text: '1324' },
    { beat: 5, text: 'c. 1336' },
  ],
  stamps: [
    { beat: 5, over: 'STILL CHEAP', big: '12', under: 'YEARS LATER', countUp: true },
    { beat: 7, over: 'THE RICHEST KING', big: 'IN DEBT' },
  ],
  silenceOn: [6],
};

export default config;
