import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from './basis';
import timing from './baibars-timing.json';
import type { ShotDef } from './BaibarsShot';
import { HoofdstukKaart } from './CaesarScenes';
import { LangAfsluiter } from './LangDecor';
import { LangWatermerk, Ondertitel } from './LangHud';
import { Pijllabel } from './LeonidasKit';
import * as A from './BaibarsScenes';
import * as B from './BaibarsScenes2';
import * as C from './BaibarsScenes3';
import { BaibarsOmslag } from './CaesarOmslag';

/**
 * "What if you were Baibars?" — lange YouTube-video #05 (16:9, ~9:00), stem Dylan, één shot per zin, "you"-vorm.
 * Script en scratchboard: marketing/1.videos/1.te-posten/05-baibars/werk/. Zolang de stem er niet is, staat de
 * timing op een schatting (baibars-timing.json, 2,35 woorden/s); `vo-hoofdstukken.mjs` vervangt hem.
 * Muziek: hergebruik van de Caesar-stukken, geen nieuwe credits.
 */

type Zin = { hoofdstuk: string; zin: string; start: number; eind: number };
const ZINNEN = timing as Zin[];
const SHOTS: ShotDef[] = [
  // ---------- teaser ----------
  { zin: 0, C: A.T0_Knal, accent: [{ bij: 0, src: 'inslag', vol: 0.4 }, { bij: 0.07, src: 'inslag', vol: 0.28 }, { bij: 0.15, src: 'glans', vol: 0.16 }] },
  { zin: 1, C: A.S_TeaserMarkt, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 2.9, src: 'tik', vol: 0.26 }] },
  { zin: 2, C: A.S_TeaserStraat, accent: [{ bij: 0.4, src: 'inslag', vol: 0.2 }] },
  { zin: 3, C: A.S_TeaserKaart, accent: [{ bij: 2.0, src: 'inslag', vol: 0.24 }] },
  { zin: 4, C: () => <A.S_LegeTroon />, sfeer: 'wind', vol: 0.08 },
  { zin: 5, C: () => <A.S_KindClose />, accent: [{ bij: 1.5, src: 'glans', vol: 0.12 }] },
  { zin: 5, na: 3.4, C: A.T5_Titel, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.05, src: 'inslag', vol: 0.26 }, { bij: 0.4, src: 'glans', vol: 0.16 }] },
  // ---------- I · The steppe ----------
  { zin: 6, C: A.S_Wieg, hoofdstuk: ['I', 'The steppe'], sfeer: 'wind', vol: 0.1 },
  { zin: 7, C: A.S_Kamp, sfeer: 'wind', vol: 0.1 },
  { zin: 8, C: A.S_Peuter, sfeer: 'wind', vol: 0.08 },
  { zin: 9, C: A.S_Boog, sfeer: 'wind', vol: 0.08, accent: [{ bij: 2.2, src: 'whoosh', vol: 0.16 }, { bij: 2.4, src: 'tik', vol: 0.2 }] },
  { zin: 9, na: 3.6, C: A.S_Sterren, sfeer: 'wind', vol: 0.05 },
  { zin: 10, C: A.S_Stofwolk, sfeer: 'wind', vol: 0.12, accent: [{ bij: 1.7, src: 'val', vol: 0.16 }, { bij: 0.4, src: 'inslag', vol: 0.12 }] },
  { zin: 11, C: A.S_GolfKaart, sfeer: 'wind', vol: 0.08, accent: [{ bij: 1.2, src: 'tik', vol: 0.18 }, { bij: 1.6, src: 'tik', vol: 0.18 }] },
  { zin: 12, C: A.S_Gevangenen, sfeer: 'wind', vol: 0.1 },
  { zin: 13, C: A.S_Verkocht, accent: [{ bij: 0.8, src: 'munt', vol: 0.2 }, { bij: 1.6, src: 'munt', vol: 0.18 }] },
  // ---------- II · Eight hundred coins ----------
  { zin: 14, C: A.S_RouteZuid, hoofdstuk: ['II', 'Eight hundred coins'], accent: [{ bij: 1.6, src: 'tik', vol: 0.2 }, { bij: 3.4, src: 'tik', vol: 0.2 }] },
  { zin: 15, C: A.S_Meetlat, sfeer: 'menigte', vol: 0.06, accent: [{ bij: 1.35, src: 'tik', vol: 0.24 }] },
  { zin: 16, C: A.S_Oog, accent: [{ bij: 1.0, src: 'glans', vol: 0.16 }] },
  { zin: 17, C: A.S_Hama, sfeer: 'menigte', vol: 0.06, accent: [{ bij: 3.7, src: 'inslag', vol: 0.3 }] },
  { zin: 18, C: A.S_Damaged, accent: [{ bij: 0.2, src: 'tik', vol: 0.22 }] },
  { zin: 19, C: A.S_Aydakin, sfeer: 'menigte', vol: 0.05, accent: [{ bij: 0.6, src: 'munt', vol: 0.2 }, { bij: 1.6, src: 'munt', vol: 0.2 }, { bij: 2.6, src: 'munt', vol: 0.2 }] },
  { zin: 20, C: A.S_Kruisboog, accent: [{ bij: 1.0, src: 'whoosh', vol: 0.18 }, { bij: 1.47, src: 'inslag', vol: 0.18 }, { bij: 2.4, src: 'glans', vol: 0.14 }] },
  { zin: 21, C: A.S_NaarCairo, sfeer: 'menigte', vol: 0.08 },
  { zin: 22, C: A.S_Roda, sfeer: 'rivier', vol: 0.12 },
  { zin: 23, C: A.S_Rij, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 24, C: A.S_Training, sfeer: 'wind', vol: 0.08, accent: [{ bij: 1.9, src: 'whoosh', vol: 0.16 }, { bij: 2.1, src: 'tik', vol: 0.2 }, { bij: 2.6, src: 'val', vol: 0.18 }] },
  { zin: 25, C: A.S_SlaafZwaard, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.9, src: 'glans', vol: 0.16 }] },
  // ---------- III · A king in the streets ----------
  { zin: 26, C: A.S_Damiate, hoofdstuk: ['III', 'A king in the streets'], sfeer: 'zee', vol: 0.14, accent: [{ bij: 2.4, src: 'val', vol: 0.16 }] },
  { zin: 27, C: A.S_Heilige, accent: [{ bij: 0.5, src: 'glans', vol: 0.16 }] },
  { zin: 28, C: A.S_PaardSchepen, sfeer: 'zee', vol: 0.16 },
  { zin: 29, C: A.S_NijlKaart, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  { zin: 30, C: A.S_Wacht, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 0.7, src: 'tik', vol: 0.18 }] },
  { zin: 31, C: A.S_Charge, sfeer: 'menigte', vol: 0.16 },
  { zin: 32, C: A.S_Wachten, accent: [{ bij: 0.6, src: 'tik', vol: 0.16 }] },
  { zin: 33, C: A.S_PoortOpen, sfeer: 'menigte', vol: 0.1, accent: [{ bij: 0.3, src: 'val', vol: 0.22 }] },
  { zin: 34, C: A.S_Doolhof, accent: [{ bij: 1.8, src: 'inslag', vol: 0.18 }, { bij: 2.4, src: 'inslag', vol: 0.18 }] },
  { zin: 35, C: A.S_Daken, sfeer: 'menigte', vol: 0.14, accent: [{ bij: 0.5, src: 'whoosh', vol: 0.14 }, { bij: 1.2, src: 'val', vol: 0.14 }] },
  { zin: 36, C: A.S_Helm, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.5, src: 'val', vol: 0.12 }] },
  { zin: 37, C: A.S_Boeien, accent: [{ bij: 0.4, src: 'tik', vol: 0.2 }] },
  { zin: 38, C: A.S_Twintig, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  ...B.SHOTS_B,
  ...C.SHOTS_C,
];
void Pijllabel;

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const BAIBARS_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[98].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, 98).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
};

/* ---------- muziek per hoofdstuk: de Caesar-stukken, opnieuw gekozen per sfeer ---------- */
const HOOFDSTUK_START = (() => {
  const uit: number[] = [];
  let vorige = '';
  for (const z of ZINNEN) if (z.hoofdstuk !== vorige) { vorige = z.hoofdstuk; uit.push(z.start); }
  return uit;
})();
/** Lengte (s) van de Caesar-stukken m0..m10. */
const CAESAR_LENGTE = [18.08, 35.06, 39.05, 41.06, 36.08, 42.06, 39.05, 85.05, 37.07, 37.07, 55.07];
/** Welk Caesar-stuk bij welk Baibars-hoofdstuk: teaser, I-IX, outro. III en VI = veldslagen (5, 7), IV en VII = de moorden (9, 8). */
const STUK = [0, 1, 2, 5, 9, 6, 7, 8, 4, 3, 10];
const OVERLAP = 2.5;
type Stuk = { i: number; k: number; van: number; tot: number; vol: number };
const STUKKEN: Stuk[] = HOOFDSTUK_START.flatMap((st, i) => {
  const van = i === 0 ? 0 : st - 0.6;
  const tot = i < HOOFDSTUK_START.length - 1 ? HOOFDSTUK_START[i + 1] - 0.6 + 1.5 : EIND;
  const vol = i === 0 ? 0.42 : 0.2;
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
    {STUKKEN.map((m) => {
      const lengte = Math.round((m.tot - m.van) * FPS);
      const inF = m.k > 0 ? Math.round(OVERLAP * FPS) : m.i === 0 ? 1 : 36;
      return (
        <Sequence key={`m${m.i}-${m.k}`} from={Math.round(m.van * FPS)} durationInFrames={lengte}>
          <Audio
            src={staticFile(`lokaal/caesar-muziek/m${STUK[m.i]}.mp3`)}
            volume={(fr) => interpolate(fr, [0, inF, Math.max(inF + 1, lengte - 60), lengte], [m.i === 0 ? m.vol : 0, m.vol, m.vol, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        </Sequence>
      );
    })}
  </>
);

export const BaibarsLang = ({ muziek = true, stem = false }: { muziek?: boolean; stem?: boolean }) => (
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
        <Audio src={sfx('whoosh')} volume={0.16} />
      </Sequence>
    ))}
    <Ondertitels />
    <Sequence from={Math.round(AFSLUITER_VAN * FPS)}>
      <LangAfsluiter />
    </Sequence>
    <LangWatermerk />
    {/* de gestapelde omslag in de eerste 3 frames: zo kiest Instagram/TikTok hem vanzelf */}
    <Sequence from={0} durationInFrames={3}>
      <BaibarsOmslag />
    </Sequence>
    {muziek && <Muziek />}
    {stem && <Audio src={staticFile('lokaal/baibars-lang-voice.mp3')} volume={1.25} />}
  </AbsoluteFill>
);

/** Per-shot middenframe (voor de controlestills). */
export const BAIBARS_SHOT_FRAMES = STARTS.map((s, i) => Math.round(((s + (i < STARTS.length - 1 ? STARTS[i + 1] : EIND)) / 2) * FPS));
