// De maanlanding — v1 (vrijdag 13 november 2026, 20:00 NL). Tekst en bronnen:
// marketing/shorts/30-seconds-of-history/te-posten/12-moon-landing/script.md
// Hook = de rouwspeech die Nixon klaar had. Spanning: één motor, geen reserve. Twist: de viltstift.
// Bijna alleen echt beeld: NASA-foto's en de Safire-memo (public domain, extra/moon-landing/); twee cabinebeelden gemaakt
// voor deze short (public/moon-landing-v1/).
import type { ShortConfig } from '../sjabloon/types';

const V = (n: string) => `moon-landing-v1/${n}.png`;
const STAAND = 752 / 1344;
const X = (n: string) => `extra/moon-landing/${n}`;

const config: ShortConfig = {
  id: 'moon-landing',
  storyId: 'moon-landing',
  hook: 'NIXON HAD A|{SPEECH READY}.|IN CASE THEY|{NEVER CAME}|{HOME}',
  hookUntilBeat: 1,
  voiceTempo: 1.05,
  cover: { src: X('buzz-aldrin-as11-40-5903.jpg'), aspect: 2400 / 2352, focus: 0.5, name: ['THE MOON', '{LANDING}'], hook: 'NIXON HAD A {SPEECH READY}' },
  beats: [
    /* 0 */ { say: 'Nixon had a speech ready.', cap: ['Nixon had a', '{speech ready.}'], pauseAfter: 0.35 },
    /* 1 */ { say: 'In case they never came home.', cap: ['In case they', '{never came home.}'], pauseAfter: 0.55 },
    /* 2 */ { say: 'In July nineteen sixty-nine, two men stood on the Moon.', cap: ['In {July 1969},', 'two men stood', 'on the {Moon.}'], pauseAfter: 0.25 },
    /* 3 */ { say: 'To leave, one engine had to fire.', cap: ['To leave,', '{one engine}', 'had to fire.'], pauseAfter: 0.3 },
    /* 4 */ { say: 'There was no backup.', cap: ['There was', '{no backup.}'], pauseAfter: 0.55 },
    /* 5 */ { say: 'If it failed, they would stay there until their air ran out.', cap: ['If it failed,', 'they would stay there', 'until their {air ran out.}'], pauseAfter: 0.4 },
    /* 6 */ { say: 'The speech began: Fate has ordained that the men who went to the Moon to explore in peace will stay on the Moon to rest in peace.', cap: ['The speech began:', '"{Fate} has ordained', 'that the men', 'who went to the Moon', 'to explore in peace', 'will stay on the Moon', 'to {rest in peace."}'], pauseAfter: 0.6 },
    /* 7 */ { say: 'Then Aldrin saw a broken switch.', cap: ['Then {Aldrin} saw', 'a {broken switch.}'], pauseAfter: 0.25 },
    /* 8 */ { say: 'The one that armed that engine.', cap: ['The one that', '{armed that engine.}'], pauseAfter: 0.3 },
    /* 9 */ { say: 'He pushed it in with a felt-tip pen.', cap: ['He pushed it in', 'with a {felt-tip pen.}'], pauseAfter: 0.6 },
    /* 10 */ { say: 'It fired.', cap: ['It {fired.}'], pauseAfter: 0.6 },
    /* 11 */ { say: "That's thirty seconds of history.", cap: ["That's {thirty seconds}", 'of history.'] },
  ],
  shots: [
    { kind: 'scene', from: 0, src: X('buzz-aldrin-as11-40-5903.jpg'), aspect: 2400 / 2352, motion: { kind: 'push', fx: 0.5, fy: 0.42 } },
    { kind: 'scene', from: 1, src: X('earthrise-apollo-11-as11-44-6552.jpg'), aspect: 1, motion: { kind: 'push', fx: 0.5, fy: 0.45 } },
    { kind: 'scene', from: 2, src: X('eagle-lunar-module-as11-40-5927.jpg'), aspect: 2349 / 2362, motion: { kind: 'push', fx: 0.5, fy: 0.5 } },
    { kind: 'scene', from: 3, src: X('lunar-module-cockpit-apollo-15.jpg'), aspect: 2714 / 2730, motion: { kind: 'push', fx: 0.5, fy: 0.45 } },
    { kind: 'scene', from: 5, src: X('memo-staand.jpg'), aspect: STAAND, motion: { kind: 'push', fx: 0.5, fy: 0.3, zoom0: 1, zoom1: 1.2 }, flash: true },
    { kind: 'scene', from: 7, src: V('01-cabine'), aspect: STAAND, motion: { kind: 'push', fx: 0.6, fy: 0.45 } },
    { kind: 'scene', from: 9, src: V('02-stift'), aspect: STAAND, motion: { kind: 'push', fx: 0.4, fy: 0.45 } },
    { kind: 'scene', from: 10, src: X('eagle-ascent-stage-earth-as11-44-6642.jpg'), aspect: 1, motion: { kind: 'push', fx: 0.5, fy: 0.5 }, flash: true },
  ],
  years: [
    { beat: 2, text: 'JULY 1969' },
  ],
  stamps: [
    { beat: 4, big: 'NO BACKUP' },
    { beat: 9, over: 'A', big: 'FELT-TIP PEN' },
  ],
  silenceOn: [4, 9],
};

export default config;
