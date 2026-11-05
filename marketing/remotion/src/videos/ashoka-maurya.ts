// Ashoka — v1 (dinsdag 10 november 2026, 15:30 NL = avond in India). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/10-ashoka-maurya/script.md
// Hook = "So why did he say sorry?", meteen daarna de oorlog (geen biografie). Twist: zijn wiel staat op de vlag van India.
// 9:16-beelden gemaakt voor deze short (public/ashoka-maurya-v1/, Higgsfield gpt_image_2_5) + echte bronbeelden (extra/).
import type { MapStop, ShortConfig } from '../sjabloon/types';

const V = (n: string) => `ashoka-maurya-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/ashoka-maurya/${n}`;

const ROUTE: MapStop[] = [
  { name: 'Pataliputra', lon: 85.14, lat: 25.61, label: 'left' }, // 0, de hoofdstad
  { name: 'Kalinga', lon: 85.84, lat: 20.19 }, // 1 (Dhauli)
];

// Het Mauryarijk rond 250 v.Chr., vereenvoudigd (lon, lat); wordt op het land geknipt.
const RIJK: [number, number][] = [
  [61.5, 30.0], [62.0, 35.0], [66.0, 37.0], [71.0, 37.0], [74.0, 35.5], [77.0, 33.0], [80.0, 30.0], [84.0, 28.0],
  [88.0, 27.0], [92.0, 26.0], [92.0, 23.0], [88.0, 21.5], [86.0, 20.0], [84.0, 18.0], [81.0, 16.0], [79.0, 13.0],
  [76.5, 12.5], [74.5, 14.0], [73.0, 17.0], [72.5, 20.0], [70.0, 22.0], [68.0, 23.5], [66.0, 25.0], [62.0, 25.0],
];
const TERRITORIUM = { polygon: RIJK, label: "ASHOKA'S EMPIRE" };

const config: ShortConfig = {
  id: 'ashoka-maurya',
  storyId: 'ashoka-maurya',
  hook: 'HE WON THE WAR.|SO WHY DID HE|{SAY SORRY?}',
  hookUntilBeat: 1,
  voiceTempo: 1.05,
  cover: { src: V('02-spijt'), aspect: STAAND, name: ['{ASHOKA}'], hook: 'HE WON. {SO WHY SAY SORRY?}' },
  beats: [
    /* 0 */ { say: 'He won one of the bloodiest wars of the ancient world.', cap: ['He won one of', 'the {bloodiest wars}', 'of the ancient world.'], pauseAfter: 0.35 },
    /* 1 */ { say: 'So why did he say sorry?', cap: ['So why did he', '{say sorry?}'], pauseAfter: 0.55 },
    /* 2 */ { say: 'Around two hundred sixty BC, Emperor Ashoka conquered Kalinga, in eastern India.', cap: ['Around {260 BC},', 'Emperor {Ashoka}', 'conquered {Kalinga},', 'in eastern India.'], pauseAfter: 0.2 },
    /* 3 */ { say: 'In his own words: a hundred thousand killed, a hundred and fifty thousand carried away.', cap: ['In his {own words}:', '{100,000} killed,', '{150,000}', 'carried away.'], pauseAfter: 0.35 },
    /* 4 */ { say: 'And he wrote that he felt deep remorse.', cap: ['And he wrote', 'that he felt', '{deep remorse.}'], pauseAfter: 0.45 },
    /* 5 */ { say: 'He turned to Buddhism, and carved his new laws on rocks and pillars across his empire.', cap: ['He turned to {Buddhism},', 'and carved his new laws', 'on {rocks and pillars}', 'across his empire.'], pauseAfter: 0.25 },
    /* 6 */ { say: 'No cruelty.', cap: ['{No cruelty.}'], pauseAfter: 0.2 },
    /* 7 */ { say: 'Respect for every faith.', cap: ['Respect for', '{every faith.}'], pauseAfter: 0.55 },
    /* 8 */ { say: 'Then he was forgotten, for two thousand years.', cap: ['Then he was {forgotten},', 'for {two thousand years.}'], pauseAfter: 0.6 },
    /* 9 */ { say: 'Today, his wheel is on the flag of India.', cap: ['Today, his {wheel}', 'is on the', '{flag of India.}'], pauseAfter: 0.5 },
    /* 10 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: V('01-slag'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.45 } },
    { kind: 'scene', from: 1, src: V('02-spijt'), aspect: STAAND, motion: { kind: 'push', fx: 0.48, fy: 0.3 } },
    { kind: 'map', from: 2, stops: ROUTE, fromStop: 0, toStop: 1, span: 24, territory: TERRITORIUM },
    { kind: 'scene', from: 3, src: V('03-gevangenen'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.4 } },
    { kind: 'scene', from: 4, src: X('rock-edict-brahmi-brahmagiri.jpg'), aspect: 2400 / 1750, motion: { kind: 'push', fx: 0.5, fy: 0.5 }, flash: true },
    { kind: 'map', from: 5, stops: ROUTE, fromStop: 0, toStop: 0, span: 24, zoom: [1, 0.55], territory: { ...TERRITORIUM, full: true } },
    { kind: 'scene', from: 6, src: X('ashoka-pillar-vaishali.jpg'), aspect: 2048 / 1536, motion: { kind: 'push', fx: 0.36, fy: 0.4 } },
    { kind: 'scene', from: 8, src: V('04-zuil-jungle'), aspect: STAAND, motion: { kind: 'push', fx: 0.45, fy: 0.3 } },
    { kind: 'scene', from: 9, src: X('lion-capital-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 }, flash: true },
    { kind: 'scene', from: 10, src: X('flag-of-india.png'), aspect: 1600 / 1066, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
  ],
  years: [
    { beat: 2, text: 'c. 260 BC' },
    { beat: 8, text: '1837' },
    { beat: 9, text: 'TODAY' },
  ],
  stamps: [
    { beat: 3, over: 'IN HIS OWN WORDS', big: '100,000', under: 'KILLED' },
  ],
  silenceOn: [8],
};

export default config;
