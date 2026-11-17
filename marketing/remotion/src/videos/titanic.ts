// De Titanic — v1 (2026-11-06). Tekst en bronnen:
// marketing/9.archief/30-seconds-of-history/te-posten/14-titanic/script.md
// Hook = een schip zag de noodvuurpijlen en bewoog niet (open vraag: waarom?). Antwoord halverwege: de marconist
// sliep. Twist aan het eind: niemand maakte hem wakker.
// Echt beeld: de ijsberg en de laatste reddingssloep (1912, publiek domein, extra/titanic/); de rest gemaakt voor
// deze short (public/titanic-v1/) plus twee scènes uit de app.
import type { ShortConfig } from '../sjabloon/types';

const V = (n: string) => `titanic-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/titanic/${n}`;

const config: ShortConfig = {
  id: 'titanic',
  storyId: 'titanic',
  hook: 'ONE SHIP SAW|{THE TITANIC\'S}|{ROCKETS}.|IT {DIDN\'T MOVE}',
  hookUntilBeat: 1,
  voiceTempo: 1.05,
  cover: { src: V('01-vuurpijl'), aspect: STAAND, name: ['THE', '{TITANIC}'], hook: 'ONE SHIP SAW {HER ROCKETS}' },
  beats: [
    /* 0 */ { say: "One ship could see the Titanic's rockets.", cap: ['One ship could see', "the {Titanic's rockets.}"], pauseAfter: 0.35 },
    /* 1 */ { say: "It didn't move.", cap: ["It {didn't move.}"], pauseAfter: 0.6 },
    /* 2 */ { say: 'Earlier that night, the Californian had stopped, surrounded by ice.', cap: ['Earlier that night,', 'the {Californian}', 'had stopped,', 'surrounded by {ice.}'], pauseAfter: 0.25 },
    /* 3 */ { say: 'Its radio operator warned the Titanic.', cap: ['Its {radio operator}', 'warned the Titanic.'], pauseAfter: 0.3 },
    /* 4 */ { say: 'The reply: Shut up, shut up. I am busy.', cap: ['The reply:', '"{Shut up, shut up.}', '{I am busy.}"'], pauseAfter: 0.5 },
    /* 5 */ { say: 'He switched off his radio and went to bed.', cap: ['He switched off', 'his radio', 'and {went to bed.}'], pauseAfter: 0.45 },
    /* 6 */ { say: 'Ten minutes later, the Titanic hit the iceberg.', cap: ['{Ten minutes} later,', 'the Titanic', 'hit the {iceberg.}'], pauseAfter: 0.4 },
    /* 7 */ { say: 'For two hours, her radio called for help.', cap: ['For {two hours},', 'her radio', 'called for {help.}'], pauseAfter: 0.3 },
    /* 8 */ { say: 'On the Californian, officers counted eight rockets.', cap: ['On the Californian,', 'officers counted', '{eight rockets.}'], pauseAfter: 0.3 },
    /* 9 */ { say: 'They told the captain.', cap: ['They told', 'the {captain.}'], pauseAfter: 0.6 },
    /* 10 */ { say: 'Nobody woke the radio operator.', cap: ['{Nobody woke}', 'the {radio operator.}'], pauseAfter: 0.7 },
    /* 11 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: V('01-vuurpijl'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3 } },
    { kind: 'scene', from: 2, src: V('02-californian'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    { kind: 'scene', from: 3, src: V('03-marconist'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.42 } },
    { kind: 'scene', from: 4, src: 'scenes/titanic-2.webp', motion: { kind: 'pan', x0: 0.35, x1: 0.6 } },
    { kind: 'scene', from: 5, src: V('04-lege-hut'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.45 } },
    { kind: 'scene', from: 6, src: X('titanic-iceberg-1912.jpg'), aspect: 1308 / 740, motion: { kind: 'push', fx: 0.5, fy: 0.5 }, flash: true },
    { kind: 'scene', from: 7, src: 'scenes/titanic-4.webp', motion: { kind: 'pan', x0: 0.4, x1: 0.6 } },
    { kind: 'scene', from: 8, src: V('05-officieren'), aspect: STAAND, motion: { kind: 'push', fx: 0.6, fy: 0.3 } },
    { kind: 'scene', from: 9, src: V('06-kapitein'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.4 } },
    { kind: 'scene', from: 10, src: V('07-slaapt'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.45 } },
    { kind: 'scene', from: 11, src: X('titanic-lifeboat-1912.jpg'), aspect: 2400 / 1628, motion: { kind: 'push', fx: 0.5, fy: 0.5 }, flash: true },
  ],
  years: [
    { beat: 2, text: 'APRIL 1912' },
  ],
  stamps: [
    { beat: 5, big: '11:30 PM' },
    { beat: 6, big: '11:40 PM' },
    { beat: 8, big: '8', under: 'ROCKETS', countUp: true },
  ],
  silenceOn: [5, 10],
};

export default config;
