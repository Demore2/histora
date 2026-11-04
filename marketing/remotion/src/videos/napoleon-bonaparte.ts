// Napoleon Bonaparte — v1 (zondag 8 november 2026). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/08-napoleon-bonaparte/script.md
// Mythe-ontkrachter. Hook = "Not short. So who made him small?", antwoord in drie stappen: Franse duimen,
// de staven (mythe · gemiddelde Fransman · Napoleon), en de echte Britse spotprent van 1803 (Gillray, CC0).
import type { ShortConfig } from '../sjabloon/types';

const GILLRAY = 'extra/napoleon-bonaparte/gillray-little-boney-1803.jpg';
const GILLRAY_ASPECT = 1920 / 1433;
// De slotgrap: George III bekijkt een piepkleine Napoleon op zijn hand (Gillray, juni 1803, publiek domein).
const BROBDINGNAG = 'extra/napoleon-bonaparte/gillray-brobdingnag-1803.jpg';
const BROBDINGNAG_ASPECT = 1400 / 1766;

const config: ShortConfig = {
  id: 'napoleon-bonaparte',
  storyId: 'napoleon-bonaparte',
  hook: 'NOT {SHORT}.|SO WHO MADE|{HIM SMALL?}',
  hookUntilBeat: 1,
  // 1.0 i.p.v. 1.1: op 1.1 voelde de montage gehaast (eigenaar, 2026-11-04). Ruimere pauzes om dezelfde reden.
  voiceTempo: 1.0,
  cover: { src: 'characters/napoleon-bonaparte.webp', aspect: 16 / 9, focus: 0.5, name: ['NAPOLEON'], hook: 'HE WAS {NOT SHORT}' },
  beats: [
    /* 0 */ { say: "Napoleon wasn't short.", cap: ['Napoleon', "{wasn't short.}"], pauseAfter: 0.4 },
    /* 1 */ { say: 'So who made him small?', cap: ['So who made him', '{small?}'], pauseAfter: 0.6 },
    /* 2 */ { say: 'When he died, he was measured at five foot two.', cap: ['When he died,', 'he was measured', 'at {five foot two.}'], pauseAfter: 0.3 },
    /* 3 */ { say: 'But those were French inches, and they were longer.', cap: ['But those were', '{French inches,}', 'and they were {longer.}'], pauseAfter: 0.3 },
    /* 4 */ { say: 'In English measures, he was about five foot six.', cap: ['In English measures,', 'he was about', '{five foot six.}'], pauseAfter: 0.25 },
    /* 5 */ { say: 'At least as tall as the average Frenchman of his day.', cap: ['At least as tall', 'as the {average Frenchman}', 'of his day.'], pauseAfter: 0.55 },
    /* 6 */ { say: 'British cartoonists drew him as Little Boney, a tiny man in a rage.', cap: ['British {cartoonists}', 'drew him as', '{Little Boney},', 'a tiny man', 'in a {rage.}'], pauseAfter: 0.45 },
    /* 7 */ { say: 'His soldiers did call him the little corporal, but out of affection.', cap: ['His soldiers', 'did call him', '{"the little corporal"},', 'but out of {affection.}'], pauseAfter: 0.45 },
    /* 8 */ { say: 'He conquered an empire.', cap: ['He conquered', 'an {empire.}'], pauseAfter: 0.3 },
    /* 9 */ { say: 'And lost to a cartoon.', cap: ['And lost', 'to a {cartoon.}'], pauseAfter: 0.6 },
    /* 10 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: 'scenes/napoleon-bonaparte-5.webp', motion: { kind: 'push', fx: 0.45, fy: 0.28 } },
    { kind: 'scene', from: 1, src: 'scenes/napoleon-bonaparte-1.webp', motion: { kind: 'push', fx: 0.3, fy: 0.35 } },
    { kind: 'scene', from: 2, src: 'scenes/napoleon-bonaparte-8.webp', motion: { kind: 'push', fx: 0.42, fy: 0.4 } },
    { kind: 'scene', from: 3, src: 'characters/napoleon-bonaparte.webp', motion: { kind: 'push', fx: 0.5, fy: 0.3 }, flash: true },
    {
      kind: 'bars', from: 4, floor: 1.45, title: 'HOW TALL WAS NAPOLEON?', backdrop: 'scenes/napoleon-bonaparte-5.webp',
      bars: [
        { label: 'THE MYTH', value: 1.57, display: "5'2\"", sub: '1.57 m', myth: true },
        { label: 'AVERAGE|FRENCHMAN', value: 1.65, display: '1.65 m', sub: 'c. 1800' },
        { label: 'NAPOLEON', value: 1.69, display: '1.69 m', sub: "5'6\"", highlight: true },
      ],
    },
    { kind: 'scene', from: 6, src: GILLRAY, aspect: GILLRAY_ASPECT, motion: { kind: 'push', fx: 0.52, fy: 0.42 }, flash: true },
    { kind: 'scene', from: 7, src: 'scenes/napoleon-bonaparte-2.webp', motion: { kind: 'pan', x0: 0.35, x1: 0.6 } },
    { kind: 'scene', from: 8, src: 'scenes/napoleon-bonaparte-3.webp', motion: { kind: 'pan', x0: 0.4, x1: 0.62 } },
    { kind: 'scene', from: 9, src: BROBDINGNAG, aspect: BROBDINGNAG_ASPECT, motion: { kind: 'push', fx: 0.28, fy: 0.45 }, flash: true },
  ],
  years: [
    { beat: 2, text: '1821' },
    { beat: 6, text: '1803' },
    { beat: 7, text: '1796' },
    { beat: 8, text: '1798' },
    { beat: 9, text: '1803' },
  ],
  stamps: [
    { beat: 2, over: 'MEASURED AT', big: "5'2\"" },
  ],
  silenceOn: [9],
};

export default config;
