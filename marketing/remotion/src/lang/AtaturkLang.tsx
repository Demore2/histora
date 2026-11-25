import type React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from './basis';
import { HoofdstukKaart } from './CaesarScenes';
import { LangAfsluiter } from './LangDecor';
import { LangWatermerk, Ondertitel } from './LangHud';
import timing from './ataturk-timing.json';
import {
  S_Arrest, S_Bal, S_Bevel, S_Compromis, S_Evacuatie, S_Examen, S_Fout, S_Geslaagd, S_Grondwet, S_Horloge, S_JongeTurken, S_Johnnies, S_Journalist,
  S_KaartBalkan, S_KaartDamascus, S_KaartDardanellen, S_KaartIstanbul, S_KaartLibie, S_KaartSaloniki, S_Kemal, S_Kraaien, S_Krant, S_Landing, S_Liggen,
  S_Loopgraven, S_ModerneSchool, S_Moeder, S_MoederZorg, S_Monastir, S_Naam, S_NaamKemal, S_Officieren, S_Pasja, S_Plaats, S_Prijs, S_Regiment,
  S_SalonikiAvond, S_SalonikiVal, S_Scherf, S_Spionnen, S_Sterven, S_TeaserHorloge, S_TeaserKaart, S_TeaserStil, S_TeaserVader, S_Telegram, S_Terug,
  S_Thessaloniki, S_Tobruk, S_Vader, S_VaderDood, S_Vatan, S_Verbond, S_Verjaardag, S_Verrekijker, S_Vluchten, S_Weten, S_Wiskunde, S_ZiekeMan,
  S_Zeeslag, T0_Knal, T5_Titel,
} from './AtaturkScenes';
import {
  S_Aanval, S_Achternaam, S_Afscheid, S_Alfabet, S_Alles, S_Ankara, S_Anitkabir, S_Ataturk, S_Basleraar, S_Biljet, S_Doodvonnis, S_Dolmabahce, S_EenPartij,
  S_Fez, S_Gazi, S_Geldikleri, S_Gewonnen, S_Hoofdkwartier, S_Izmir, S_KaartDoorbraak, S_KaartIzmir, S_KaartOpmars, S_KaartTelegram, S_KaartVerdeling,
  S_Kalifaat, S_Keert, S_KlokStil, S_Krijtbord, S_Latife, S_LatifePubliek, S_Lausanne, S_Middellandse, S_Moe, S_Negen, S_Ontslag, S_Opbouw, S_Opdracht,
  S_Panama, S_President, S_Republiek, S_Rib, S_Sabiha, S_Sakarya, S_Samsun, S_Scheiding, S_Sevres, S_Sirenes, S_Slot, S_Stemrecht, S_Stil, S_Sultan,
  S_Sultanaat, S_SultanWeg, S_Tegendeel, S_Tekort, S_TweeRegeringen, S_Verloren, S_Vlak, S_Vloot, S_Vrede, S_Vrouwen, S_Wetten, S_Wil,
} from './AtaturkScenes2';

/**
 * "What if you were Mustafa Kemal Atatürk?" — lange YouTube-video #10 (16:9), één shot per zin, "you"-vorm.
 * Stem: lokaal Chatterbox (G:/dev-tools/stem/stem.py); timing uit diens timing.json.
 * Muziek: de Caesar-stukken, opnieuw gekozen per hoofdstuk (geen nieuwe credits).
 * Respectvol (Turkse wet 5816); geen geweld in beeld.
 */

type Zin = { hoofdstuk: string; zin: string; start: number; eind: number };
const ZINNEN = timing as Zin[];
type ShotDef = {
  zin: number;
  na?: number;
  C: () => React.ReactElement;
  over?: ReactNode;
  hoofdstuk?: [string, string];
  sfeer?: string;
  vol?: number;
  accent?: { bij: number; src: string; vol: number }[];
};

const tik = (bij: number, vol = 0.16) => ({ bij, src: 'tik', vol });
const knal = (bij: number, vol = 0.24) => ({ bij, src: 'inslag', vol });
const glans = (bij: number, vol = 0.14) => ({ bij, src: 'glans', vol });

const SHOTS: ShotDef[] = [
  // ---------- teaser ----------
  { zin: 0, C: T0_Knal, sfeer: 'wind', vol: 0.08, accent: [knal(0, 0.4), knal(0.07, 0.28), glans(0.15, 0.16)] },
  { zin: 1, C: S_TeaserVader, sfeer: 'vuur', vol: 0.03 },
  { zin: 2, C: S_TeaserHorloge, accent: [knal(0.27, 0.3), tik(1.2, 0.18)] },
  { zin: 3, C: S_TeaserKaart, accent: [glans(0.5, 0.16)] },
  { zin: 4, C: S_TeaserStil, sfeer: 'wind', vol: 0.1 },
  { zin: 5, C: S_SalonikiAvond, sfeer: 'zee', vol: 0.1 },
  { zin: 5, na: 3.6, C: T5_Titel, sfeer: 'wind', vol: 0.08, accent: [knal(0.05, 0.26), glans(0.4, 0.16)] },
  // ---------- I ----------
  { zin: 6, C: S_KaartSaloniki, hoofdstuk: ['I', 'Little Mustafa'], accent: [tik(1.2, 0.2)] },
  { zin: 7, C: S_Thessaloniki, sfeer: 'zee', vol: 0.1, accent: [tik(0.5, 0.16)] },
  { zin: 8, C: S_Verjaardag, accent: [knal(1.0, 0.18)] },
  { zin: 9, C: S_Naam, sfeer: 'menigte', vol: 0.05 },
  { zin: 10, C: S_Vader, sfeer: 'menigte', vol: 0.05, accent: [tik(2.4, 0.16)] },
  { zin: 11, C: S_Moeder, sfeer: 'wind', vol: 0.06 },
  { zin: 12, C: S_ModerneSchool, accent: [glans(0.6, 0.12)] },
  { zin: 13, C: S_Compromis, sfeer: 'menigte', vol: 0.04 },
  { zin: 14, C: S_VaderDood, sfeer: 'vuur', vol: 0.03 },
  { zin: 15, C: S_Kraaien, sfeer: 'wind', vol: 0.1 },
  { zin: 16, C: S_MoederZorg, sfeer: 'wind', vol: 0.06 },
  { zin: 17, C: S_Officieren, sfeer: 'menigte', vol: 0.08, accent: [tik(0.5, 0.12), tik(1.0, 0.12), tik(1.5, 0.12)] },
  { zin: 18, C: S_Weten, accent: [glans(0.6, 0.14)] },
  // ---------- II ----------
  { zin: 19, C: S_Examen, hoofdstuk: ['II', 'Kemal'], accent: [tik(1.4, 0.12)] },
  { zin: 20, C: S_Geslaagd, accent: [knal(0.5, 0.2)] },
  { zin: 21, C: S_Wiskunde, accent: [tik(0.5, 0.12), tik(0.9, 0.12)] },
  { zin: 22, C: S_Kemal, accent: [glans(1.4, 0.16)] },
  { zin: 23, C: S_NaamKemal, accent: [glans(1.2, 0.18)] },
  { zin: 24, C: S_Monastir, sfeer: 'vuur', vol: 0.03 },
  { zin: 25, C: S_KaartIstanbul, accent: [tik(0.5, 0.18)] },
  { zin: 26, C: S_ZiekeMan },
  { zin: 27, C: S_Spionnen, accent: [knal(1.7, 0.2)] },
  { zin: 28, C: S_Krant, sfeer: 'vuur', vol: 0.03, accent: [tik(0.8, 0.12), tik(1.2, 0.12)] },
  { zin: 29, C: S_Arrest, sfeer: 'wind', vol: 0.05, accent: [knal(1.0, 0.24)] },
  { zin: 30, C: S_KaartDamascus, accent: [tik(0.5, 0.18)] },
  { zin: 31, C: S_Vatan, sfeer: 'vuur', vol: 0.03 },
  // ---------- III ----------
  { zin: 32, C: S_Grondwet, hoofdstuk: ['III', 'The young officer'], sfeer: 'menigte', vol: 0.2 },
  { zin: 33, C: S_JongeTurken, accent: [tik(1.3, 0.14)] },
  { zin: 34, C: S_KaartLibie, accent: [knal(1.0, 0.18)] },
  { zin: 35, C: S_Journalist, sfeer: 'wind', vol: 0.12 },
  { zin: 36, C: S_Tobruk, sfeer: 'wind', vol: 0.1 },
  { zin: 37, C: S_Telegram, sfeer: 'wind', vol: 0.06, accent: [tik(0.3, 0.16), tik(0.5, 0.16), tik(0.7, 0.16)] },
  { zin: 38, C: S_KaartBalkan, accent: [knal(0.8, 0.2)] },
  { zin: 39, C: S_SalonikiVal, sfeer: 'wind', vol: 0.08 },
  { zin: 40, C: S_Vluchten, sfeer: 'zee', vol: 0.1 },
  { zin: 41, C: S_Bal, sfeer: 'menigte', vol: 0.06, accent: [glans(0.6, 0.12)] },
  { zin: 42, C: S_Verbond, accent: [tik(1.4, 0.16)] },
  { zin: 43, C: S_Fout, accent: [knal(0.6, 0.16)] },
  // ---------- IV ----------
  { zin: 44, C: S_KaartDardanellen, hoofdstuk: ['IV', 'Gallipoli'], sfeer: 'zee', vol: 0.05 },
  { zin: 45, C: S_Zeeslag, sfeer: 'zee', vol: 0.12, accent: [knal(0.35, 0.26), knal(0.95, 0.22), knal(1.6, 0.22), knal(2.2, 0.2)] },
  { zin: 46, C: S_Landing, sfeer: 'zee', vol: 0.14 },
  { zin: 47, C: S_Verrekijker, sfeer: 'wind', vol: 0.1 },
  { zin: 48, C: S_Terug, sfeer: 'wind', vol: 0.08 },
  { zin: 49, C: S_Liggen, sfeer: 'wind', vol: 0.08, accent: [tik(1.4, 0.16)] },
  { zin: 50, C: S_Bevel, sfeer: 'wind', vol: 0.08 },
  { zin: 51, C: S_Sterven, sfeer: 'wind', vol: 0.05 },
  { zin: 52, C: S_Plaats, sfeer: 'wind', vol: 0.08 },
  { zin: 53, C: S_Regiment, sfeer: 'wind', vol: 0.1 },
  { zin: 54, C: S_Loopgraven, sfeer: 'wind', vol: 0.08, accent: [knal(1.6, 0.14)] },
  { zin: 55, C: S_Scherf, accent: [knal(0.73, 0.32)] },
  { zin: 56, C: S_Horloge, accent: [tik(0.6, 0.16), tik(1.6, 0.16), glans(2.2, 0.14)] },
  { zin: 57, C: S_Evacuatie, sfeer: 'zee', vol: 0.12 },
  { zin: 58, C: S_Prijs, sfeer: 'wind', vol: 0.06 },
  { zin: 59, C: S_Johnnies, sfeer: 'zee', vol: 0.06 },
  { zin: 60, C: S_Pasja, accent: [glans(0.8, 0.18)] },
  // ---------- V ----------
  { zin: 61, C: S_Verloren, hoofdstuk: ['V', 'Samsun'], sfeer: 'wind', vol: 0.1 },
  { zin: 62, C: S_Vloot, sfeer: 'zee', vol: 0.1 },
  { zin: 63, C: S_Geldikleri, sfeer: 'zee', vol: 0.06 },
  { zin: 64, C: S_KaartVerdeling, accent: [tik(0.9, 0.16), tik(1.4, 0.16), tik(1.9, 0.16), tik(2.4, 0.16)] },
  { zin: 65, C: S_KaartIzmir, accent: [knal(1.6, 0.2)] },
  { zin: 66, C: S_Sultan },
  { zin: 67, C: S_Opdracht, accent: [tik(1.0, 0.14)] },
  { zin: 68, C: S_Samsun, sfeer: 'zee', vol: 0.14 },
  { zin: 69, C: S_Tegendeel, sfeer: 'zee', vol: 0.06, accent: [glans(1.2, 0.18)] },
  { zin: 70, C: S_KaartTelegram, accent: [tik(0.5, 0.14), tik(0.7, 0.14), tik(1.5, 0.14), tik(1.7, 0.14), tik(2.6, 0.14)] },
  { zin: 71, C: S_Wil, sfeer: 'menigte', vol: 0.08 },
  { zin: 72, C: S_Ontslag, accent: [knal(1.4, 0.18)] },
  { zin: 73, C: S_Doodvonnis, accent: [knal(0.7, 0.26)] },
  { zin: 74, C: S_Ankara, sfeer: 'menigte', vol: 0.14 },
  { zin: 75, C: S_Sevres, accent: [knal(2.0, 0.24)] },
  { zin: 76, C: S_TweeRegeringen, sfeer: 'wind', vol: 0.08 },
  // ---------- VI ----------
  { zin: 77, C: S_KaartOpmars, hoofdstuk: ['VI', 'Independence'], accent: [knal(1.2, 0.16)] },
  { zin: 78, C: S_Tekort, sfeer: 'wind', vol: 0.1 },
  { zin: 79, C: S_Vrouwen, sfeer: 'wind', vol: 0.16 },
  { zin: 80, C: S_Rib, accent: [knal(1.4, 0.2)] },
  { zin: 81, C: S_Hoofdkwartier, sfeer: 'wind', vol: 0.06 },
  { zin: 82, C: S_Vlak, accent: [glans(1.0, 0.14)] },
  { zin: 83, C: S_Sakarya, sfeer: 'wind', vol: 0.12, accent: [knal(0.4, 0.2), knal(0.85, 0.18), knal(1.3, 0.18), knal(1.75, 0.18)] },
  { zin: 84, C: S_Keert, accent: [tik(0.5, 0.16)] },
  { zin: 85, C: S_Gazi, sfeer: 'menigte', vol: 0.16, accent: [glans(0.6, 0.18)] },
  { zin: 86, C: S_Opbouw, sfeer: 'wind', vol: 0.08 },
  { zin: 87, C: S_Aanval, accent: [knal(0.33, 0.32), knal(0.73, 0.3), knal(1.13, 0.3), knal(1.5, 0.2)] },
  { zin: 88, C: S_KaartDoorbraak, accent: [knal(2.0, 0.2)] },
  { zin: 89, C: S_Middellandse, sfeer: 'wind', vol: 0.1 },
  { zin: 90, C: S_Izmir, sfeer: 'menigte', vol: 0.18 },
  { zin: 91, C: S_Gewonnen, sfeer: 'zee', vol: 0.08, accent: [knal(0.67, 0.22), glans(0.9, 0.18)] },
  // ---------- VII ----------
  { zin: 92, C: S_Sultanaat, hoofdstuk: ['VII', 'The Republic'], sfeer: 'menigte', vol: 0.06, accent: [knal(1.67, 0.22)] },
  { zin: 93, C: S_SultanWeg, sfeer: 'zee', vol: 0.1 },
  { zin: 94, C: S_Lausanne, accent: [glans(1.4, 0.16)] },
  { zin: 95, C: S_Latife },
  { zin: 96, C: S_LatifePubliek, sfeer: 'menigte', vol: 0.1 },
  { zin: 97, C: S_Scheiding, sfeer: 'vuur', vol: 0.02 },
  { zin: 98, C: S_Republiek, sfeer: 'menigte', vol: 0.2, accent: [knal(0.2, 0.18), knal(0.6, 0.18), knal(1.0, 0.18), knal(1.4, 0.18)] },
  { zin: 99, C: S_President, accent: [glans(0.6, 0.14)] },
  { zin: 100, C: S_Kalifaat, accent: [knal(1.67, 0.2)] },
  // ---------- VIII ----------
  { zin: 101, C: S_Alles, hoofdstuk: ['VIII', 'The great change'] },
  { zin: 102, C: S_Fez, sfeer: 'menigte', vol: 0.06, accent: [tik(2.0, 0.16)] },
  { zin: 103, C: S_Panama, sfeer: 'menigte', vol: 0.16 },
  { zin: 104, C: S_Wetten, accent: [tik(1.4, 0.14)] },
  { zin: 105, C: S_Alfabet, accent: [glans(1.2, 0.18)] },
  { zin: 106, C: S_Krijtbord, sfeer: 'wind', vol: 0.06, accent: [tik(1.0, 0.12), tik(1.3, 0.12), tik(1.6, 0.12)] },
  { zin: 107, C: S_Basleraar, accent: [glans(0.5, 0.14)] },
  { zin: 108, C: S_Stemrecht, accent: [tik(1.2, 0.16)] },
  { zin: 109, C: S_Achternaam, accent: [tik(1.0, 0.14)] },
  { zin: 110, C: S_Ataturk, accent: [glans(1.2, 0.2)] },
  { zin: 111, C: S_Sabiha, sfeer: 'wind', vol: 0.16 },
  { zin: 112, C: S_EenPartij },
  { zin: 113, C: S_Vrede, sfeer: 'zee', vol: 0.08 },
  // ---------- IX ----------
  { zin: 114, C: S_Moe, hoofdstuk: ['IX', 'Five past nine'], accent: [tik(0.5, 0.12), tik(1.5, 0.12), tik(2.5, 0.12)] },
  { zin: 115, C: S_Dolmabahce, sfeer: 'zee', vol: 0.08 },
  { zin: 116, C: S_Negen, accent: [tik(0.5, 0.14), tik(1.5, 0.14), tik(2.5, 0.14)] },
  { zin: 117, C: S_KlokStil },
  { zin: 118, C: S_Afscheid, sfeer: 'menigte', vol: 0.06 },
  { zin: 119, C: S_Anitkabir, sfeer: 'wind', vol: 0.1 },
  { zin: 120, C: S_Biljet, accent: [glans(0.5, 0.14)] },
  { zin: 121, C: S_Sirenes, sfeer: 'wind', vol: 0.1 },
  { zin: 122, C: S_Stil, sfeer: 'wind', vol: 0.12 },
  // ---------- outro ----------
  { zin: 123, C: S_Slot, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const ATATURK_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[123].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, 123).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
};

/* ---------- muziek per hoofdstuk: de Caesar-stukken ---------- */
const HOOFDSTUK_START = (() => {
  const uit: number[] = [];
  let vorige = '';
  for (const z of ZINNEN) if (z.hoofdstuk !== vorige) { vorige = z.hoofdstuk; uit.push(z.start); }
  return uit;
})();
const CAESAR_LENGTE = [18.08, 35.06, 39.05, 41.06, 36.08, 42.06, 39.05, 85.05, 37.07, 37.07, 55.07];
/** teaser, I-IX, outro. IV (Gallipoli) = de veldslag, VI (onafhankelijkheid) = de grote slag, IX = de Iden. */
const STUK = [0, 1, 2, 3, 6, 4, 7, 8, 5, 9, 10];
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
      const inF = Math.min(m.k > 0 ? Math.round(OVERLAP * FPS) : m.i === 0 ? 1 : 36, Math.floor(lengte / 2));
      return (
        <Sequence key={`m${m.i}-${m.k}`} from={Math.round(m.van * FPS)} durationInFrames={lengte}>
          <Audio
            src={staticFile(`lokaal/caesar-muziek/m${STUK[m.i]}.mp3`)}
            volume={(fr) => interpolate(fr, [0, inF, Math.min(lengte - 1, Math.max(inF + 1, lengte - 60)), lengte], [m.i === 0 ? m.vol : 0, m.vol, m.vol, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        </Sequence>
      );
    })}
  </>
);

export const AtaturkLang = ({ muziek = true, stem = false }: { muziek?: boolean; stem?: boolean }) => (
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
    {muziek && <Muziek />}
    {stem && <Audio src={staticFile('lokaal/ataturk-lang-voice.wav')} volume={1.25} />}
  </AbsoluteFill>
);

/** Per-shot middenframe (voor de controlestills). */
export const ATATURK_SHOT_FRAMES = STARTS.map((s, i) => Math.round(((s + (i < STARTS.length - 1 ? STARTS[i + 1] : EIND)) / 2) * FPS));
