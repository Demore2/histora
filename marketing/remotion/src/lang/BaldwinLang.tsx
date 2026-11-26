import type React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { S_Draagbaar } from '../watals/WatAlsBaldwin';
import { FPS } from './basis';
import * as A from './BaldwinScenes';
import * as B from './BaldwinScenes2';
import { HoofdstukKaart } from './CaesarScenes';
import { LangAfsluiter } from './LangDecor';
import { LangWatermerk, Ondertitel } from './LangHud';
import timing from './baldwin-timing.json';

/**
 * "What if you were Baldwin IV?" — lange YouTube-video #12 (16:9), één shot per zin, "you"-vorm. Model: Stalin lang
 * (beste lange video tot nu). Teaser zonder knal (eigenaar 26 nov): zacht begin, de enige stevige klap op de titelkaart.
 * Stem: lokaal Chatterbox; muziek: de Caesar-stukken per hoofdstuk.
 */

type Zin = { hoofdstuk: string; zin: string; start: number; eind: number };
const ZINNEN = timing as Zin[];
type ShotDef = { zin: number; na?: number; C: () => React.ReactElement; over?: ReactNode; hoofdstuk?: [string, string]; sfeer?: string; vol?: number; accent?: { bij: number; src: string; vol: number }[] };

const S = { ...A, ...B } as unknown as Record<string, () => React.ReactElement>;
const HOOFDSTUK: Record<number, [string, string]> = {
  6: ['I', 'The boy who felt nothing'], 20: ['II', 'A crown at thirteen'], 28: ['III', 'Saladin'], 39: ['IV', 'Montgisard'], 53: ['V', 'The cracks'],
  67: ['VI', 'The blind king'], 79: ['VII', 'Kerak'], 91: ['VIII', 'The last months'], 102: ['IX', 'After you'],
};
/** Sfeer per zin (lus) en accenten (sec na het begin van de shot). */
const SFEER: Record<number, [string, number]> = {};
const zet = (zinnen: number[], s: string, v: number) => zinnen.forEach((z) => (SFEER[z] = [s, v]));
zet([2, 40, 41, 42, 46, 47, 48, 49, 52, 57, 68, 74, 82, 88, 89, 101, 105, 106, 113, 114], 'wind', 0.12);
zet([11, 12, 19, 37, 44, 62, 80, 83], 'menigte', 0.06);
zet([10, 13, 14, 15, 20, 36, 38, 53, 69, 72, 76, 78, 87, 91, 97, 102, 107], 'vuur', 0.04);
zet([16, 24, 50, 51, 56, 58, 84, 85, 86, 110, 111], 'wind', 0.07);
const ACCENT: Record<number, { bij: number; src: string; vol: number }[]> = {
  1: [{ bij: 1.5, src: 'glans', vol: 0.14 }],
  2: [{ bij: 0.4, src: 'inslag', vol: 0.16 }],
  4: [{ bij: 0.8, src: 'tik', vol: 0.12 }],
  12: [{ bij: 1.5, src: 'tik', vol: 0.18 }],
  15: [{ bij: 1.67, src: 'inslag', vol: 0.18 }],
  21: [{ bij: 1.6, src: 'glans', vol: 0.16 }],
  40: [{ bij: 0.3, src: 'inslag', vol: 0.16 }],
  49: [{ bij: 0.1, src: 'inslag', vol: 0.3 }, { bij: 1.2, src: 'inslag', vol: 0.2 }],
  52: [{ bij: 0.5, src: 'glans', vol: 0.16 }],
  56: [{ bij: 0.3, src: 'val', vol: 0.16 }],
  57: [{ bij: 0.6, src: 'inslag', vol: 0.18 }, { bij: 1.8, src: 'inslag', vol: 0.14 }],
  76: [{ bij: 1.0, src: 'inslag', vol: 0.18 }],
  82: [{ bij: 0.8, src: 'inslag', vol: 0.14 }, { bij: 2.2, src: 'inslag', vol: 0.12 }],
  86: [{ bij: 0.67, src: 'tik', vol: 0.16 }],
  94: [{ bij: 0.8, src: 'tik', vol: 0.18 }],
  100: [{ bij: 0.6, src: 'inslag', vol: 0.18 }],
  106: [{ bij: 3.0, src: 'val', vol: 0.18 }],
  108: [{ bij: 2.3, src: 'val', vol: 0.18 }],
  112: [{ bij: 0.5, src: 'glans', vol: 0.14 }],
  114: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }],
};

/** Intro (26 nov, eigenaar): 4 rustige zinnen zonder muziek, dan meteen hoofdstuk I. De oude teaser (zin 0-5) is eruit;
 * `zin` in SHOTS is vanaf hier de index in de timing, `ti(z)` zet een oud zinnummer (6+) om. */
const N_INTRO = 3;
const ti = (z: number) => z - 6 + N_INTRO;
const SHOTS: ShotDef[] = [
  { zin: 0, C: A.I0, sfeer: 'wind', vol: 0.05 },
  { zin: 1, C: A.I1 },
  { zin: 2, C: A.Z52, sfeer: 'wind', vol: 0.06 },
];
void S_Draagbaar;
for (let z = 6; z <= 114; z++) {
  const C = S[`Z${z}`];
  if (!C) throw new Error(`Geen scène voor zin ${z}`);
  SHOTS.push({ zin: ti(z), C, hoofdstuk: HOOFDSTUK[z], sfeer: SFEER[z]?.[0], vol: SFEER[z]?.[1], accent: ACCENT[z] });
}

const STARTS = SHOTS.map((s) => (s.zin === 0 && !s.na ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
/** Muziek: intro = stil, I-IX de Caesar-stukken op 0,16 (was 0,2; teaser 0,34 is weg). */
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const BALDWIN_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[ti(114)].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, ti(114)).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
};

/* ---------- muziek per hoofdstuk: de Caesar-stukken (zelfde keuze als Stalin) ---------- */
const HOOFDSTUK_START = (() => {
  const uit: number[] = [];
  let vorige = '';
  for (const z of ZINNEN) if (z.hoofdstuk !== vorige) { vorige = z.hoofdstuk; uit.push(z.start); }
  return uit;
})();
const CAESAR_LENGTE = [18.08, 35.06, 39.05, 41.06, 36.08, 42.06, 39.05, 85.05, 37.07, 37.07, 55.07];
/** teaser, I-IX, outro. IV (Montgisard) = de veldslag, VI (blind) = de Iden, VII (Kerak) = de grote slag. */
const STUK = [0, 1, 2, 3, 6, 4, 9, 7, 8, 5, 10];
const OVERLAP = 2.5;
type Stuk = { i: number; k: number; van: number; tot: number; vol: number };
const STUKKEN: Stuk[] = HOOFDSTUK_START.flatMap((st, i) => {
  const van = i === 0 ? 0 : st - 0.6;
  const tot = i < HOOFDSTUK_START.length - 1 ? HOOFDSTUK_START[i + 1] - 0.6 + 1.5 : EIND;
  const vol = 0.16;
  const L = CAESAR_LENGTE[STUK[i]];
  const uit: Stuk[] = [];
  let t = van;
  let k = 0;
  while (t < tot - 0.5) {
    const eind = Math.min(tot, t + L);
    uit.push({ i, k, van: t, tot: eind, vol });
    if (eind >= tot) break;
    t = eind - OVERLAP;
    k++;
  }
  return uit;
});
const Muziek = () => (
  <>
    {STUKKEN.filter((m) => m.i > 0).map((m) => {
      const lengte = Math.round((m.tot - m.van) * FPS);
      // teaser: zacht invloeien over 1,5 s (geen harde inzet op frame 0)
      const inF = Math.min(m.k > 0 ? Math.round(OVERLAP * FPS) : m.i === 1 ? 90 : 36, Math.floor(lengte / 2));
      return (
        <Sequence key={`m${m.i}-${m.k}`} from={Math.round(m.van * FPS)} durationInFrames={lengte}>
          <Audio
            src={staticFile(`lokaal/caesar-muziek/m${STUK[m.i]}.mp3`)}
            volume={(fr) => interpolate(fr, [0, inF, Math.min(lengte - 1, Math.max(inF + 1, lengte - 60)), lengte], [0, m.vol, m.vol, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        </Sequence>
      );
    })}
  </>
);

export const BaldwinLang = ({ muziek = true, stem = false }: { muziek?: boolean; stem?: boolean }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SHOTS.map((s, i) => {
      const van = Math.round(STARTS[i] * FPS);
      const tot = Math.round((i < SHOTS.length - 1 ? STARTS[i + 1] : EIND) * FPS);
      const duur = tot - van;
      return (
        <Sequence key={i} from={van} durationInFrames={duur}>
          <s.C />
          {s.over}
          {s.hoofdstuk && <HoofdstukKaart nr={s.hoofdstuk[0]} titel={s.hoofdstuk[1]} />}
          {s.sfeer && <Audio src={sfx(s.sfeer)} loop volume={(fr) => interpolate(fr, [0, 8, duur - 8, duur], [0, s.vol!, s.vol!, 0], { extrapolateRight: 'clamp' })} />}
          {s.accent?.map((a, k) => (
            <Sequence key={k} from={Math.round(a.bij * FPS)} durationInFrames={60}>
              <Audio src={sfx(a.src)} volume={a.vol} />
            </Sequence>
          ))}
        </Sequence>
      );
    })}
    {STARTS.slice(1).map((st, i) => (
      <Sequence key={`w${i}`} from={Math.max(0, Math.round(st * FPS) - 12)} durationInFrames={24}>
        <Audio src={sfx('whoosh')} volume={0.14} />
      </Sequence>
    ))}
    <Ondertitels />
    <Sequence from={Math.round(AFSLUITER_VAN * FPS)}>
      <LangAfsluiter />
    </Sequence>
    <LangWatermerk />
    {muziek && <Muziek />}
    {stem && <Audio src={staticFile('lokaal/baldwin-lang-voice.wav')} volume={1.25} />}
  </AbsoluteFill>
);

/** Per-shot middenframe (voor de controlestills). */
export const BALDWIN_SHOT_FRAMES = STARTS.map((s, i) => Math.round(((s + (i < STARTS.length - 1 ? STARTS[i + 1] : EIND)) / 2) * FPS));
