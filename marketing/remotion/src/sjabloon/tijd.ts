import type { Shot, ShortConfig, Timing } from './types';
import { FPS } from './theme';

export const f = (sec: number) => Math.round(sec * FPS);

/** Een knip valt net vóór de zin, zodat het beeld al staat als het woord komt. */
const KNIP_VOOR = 0.1;

export const beatStart = (t: Timing, b: number | 'cta') => (b === 'cta' ? t.cta[0] : t.beats[b][0]);

export type GeplandShot = { shot: Shot; van: number; tot: number };

/** Begin- en eindframe van elke shot; de eerste begint op frame 0, de laatste loopt tot het eind. */
export const planShots = (c: ShortConfig, t: Timing): GeplandShot[] => {
  const eind = f(t.total);
  // `lead` haalt een shot naar voren, de pauze vóór zijn zin in (bijv. een uitbarsting die eerst moet klinken).
  const start = (s: Shot) => beatStart(t, s.from) - KNIP_VOOR - (s.lead ?? 0);
  return c.shots.map((shot, i) => {
    const van = i === 0 ? 0 : f(start(shot));
    const volgende = c.shots[i + 1];
    const tot = volgende ? f(start(volgende)) : eind;
    return { shot, van, tot };
  });
};

/** `{woord}` → delen met een oranje-vlag. */
export const kleurDelen = (tekst: string) =>
  tekst.split(/(\{[^}]+\})/).filter(Boolean).map((d) => (d.startsWith('{') ? { tekst: d.slice(1, -1), oranje: true } : { tekst: d, oranje: false }));
