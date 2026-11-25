import type React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from './basis';
import { HoofdstukKaart } from './CaesarScenes';
import { LangAfsluiter } from './LangDecor';
import { LangWatermerk, Ondertitel } from './LangHud';
import timing from './willem-timing.json';
import {
  S_Afscheid,
  S_Afstand,
  S_Alva,
  S_Bedelaars,
  S_Beeldenstorm,
  S_Beslag,
  S_Bevel,
  S_Bevelen,
  S_Bijnaam,
  S_Bloedraad,
  S_Boeken,
  S_Bruiloft,
  S_Dijk,
  S_Dillenburg,
  S_Edelen,
  S_EgmontHorn,
  S_Executies,
  S_Familie,
  S_Favoriet,
  S_Feest,
  S_Filips,
  S_FilipsWoede,
  S_Geuzen,
  S_Gijzelaar,
  S_Herinnering,
  S_Jacht,
  S_Jouw,
  S_KarelOud,
  S_KarelVoorwaarde,
  S_Landgoed,
  S_Maar,
  S_Muur,
  S_Oranje,
  S_Prins,
  S_Raad,
  S_Rijk,
  S_Schermen,
  S_Schouder,
  S_Stadhouder,
  S_StDizier,
  S_TeaserBreuk,
  S_TeaserGoud,
  S_Testament,
  S_Verdriet,
  S_Vlucht,
  S_Wegvaren,
  S_Zon,
  S_Zoon,
  T0_Knal,
  T5_Titel,
} from './WillemScenes';
import {
  S_Achtervolging,
  S_Adolf,
  S_Amerika,
  S_Antwerpen,
  S_Apologie,
  S_Besluit,
  S_Blut,
  S_Bril,
  S_Calvinist,
  S_Charlotte,
  S_DrieStoelen,
  S_Dijken,
  S_EenApril,
  S_Genoeg,
  S_Gerard,
  S_Gezocht,
  S_Graf,
  S_Haring,
  S_Heiligerlee,
  S_Herstel,
  S_Honger,
  S_Huis,
  S_Keuze,
  S_Leiden,
  S_Lied,
  S_Mislukt,
  S_Mook,
  S_Oorlog,
  S_Opmars,
  S_Opstand,
  S_Oranjefeest,
  S_Parijs,
  S_Poort,
  S_Prinsenhof,
  S_Schot,
  S_Schulden,
  S_Slot,
  S_Staten,
  S_TienJuli,
  S_Trap,
  S_Unie,
  S_Universiteit,
  S_Vader,
  S_Vandaag,
  S_Verkopen,
  S_Verlatinghe,
  S_Vloot,
  S_Vrede,
  S_Water,
  S_Wilhelmus,
  S_Woorden,
  S_Wortels,
  S_ZeeHulp,
} from './WillemScenes2';

/**
 * "What if you were William of Orange?" — lange YouTube-video #08 (16:9), één shot per zin, "you"-vorm.
 * Stem: lokaal Chatterbox (G:/dev-tools/stem/stem.py) in plaats van Higgsfield; timing uit diens timing.json.
 * Muziek: de Caesar-stukken, opnieuw gekozen per hoofdstuk (geen nieuwe credits).
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

const SHOTS: ShotDef[] = [
  // ---------- teaser ----------
  { zin: 0, C: T0_Knal, accent: [{ bij: 0, src: 'inslag', vol: 0.4 }, { bij: 0.07, src: 'inslag', vol: 0.28 }, { bij: 0.15, src: 'glans', vol: 0.16 }] },
  { zin: 1, C: S_TeaserGoud, accent: [{ bij: 0.4, src: 'munt', vol: 0.2 }, { bij: 0.9, src: 'munt', vol: 0.18 }] },
  { zin: 2, C: () => <S_Schouder />, sfeer: 'menigte', vol: 0.05 },
  { zin: 3, C: S_TeaserBreuk, accent: [{ bij: 0.5, src: 'tik', vol: 0.22 }] },
  { zin: 4, C: () => <S_Muur flits />, accent: [{ bij: 0.0, src: 'inslag', vol: 0.3 }, { bij: 0.6, src: 'val', vol: 0.14 }] },
  { zin: 5, C: S_Dijk, sfeer: 'wind', vol: 0.1 },
  { zin: 5, na: 3.6, C: T5_Titel, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.05, src: 'inslag', vol: 0.26 }, { bij: 0.4, src: 'glans', vol: 0.16 }] },
  // ---------- I ----------
  { zin: 6, C: () => <S_Dillenburg />, hoofdstuk: ['I', 'The boy from Dillenburg'], sfeer: 'wind', vol: 0.08 },
  { zin: 7, C: () => <S_Familie fase="vader" />, accent: [{ bij: 1.8, src: 'val', vol: 0.12 }] },
  { zin: 8, C: () => <S_Familie fase="kinderen" />, sfeer: 'menigte', vol: 0.08 },
  { zin: 9, C: () => <S_Familie fase="bijbel" />, sfeer: 'vuur', vol: 0.04 },
  { zin: 10, C: S_StDizier, accent: [{ bij: 0.6, src: 'tik', vol: 0.22 }] },
  { zin: 11, C: S_Testament, accent: [{ bij: 1.7, src: 'glans', vol: 0.16 }] },
  { zin: 12, C: S_Oranje, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 13, C: S_Landgoed, accent: [{ bij: 0.8, src: 'glans', vol: 0.16 }] },
  { zin: 14, C: S_Prins, accent: [{ bij: 0.3, src: 'munt', vol: 0.2 }, { bij: 1.2, src: 'glans', vol: 0.16 }] },
  { zin: 15, C: S_Maar, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 16, C: S_KarelVoorwaarde, sfeer: 'vuur', vol: 0.03, accent: [{ bij: 1.0, src: 'tik', vol: 0.18 }, { bij: 1.7, src: 'tik', vol: 0.18 }] },
  { zin: 17, C: S_Afscheid, sfeer: 'wind', vol: 0.1 },
  // ---------- II ----------
  { zin: 18, C: S_Schermen, hoofdstuk: ['II', "The emperor's favourite"], accent: [{ bij: 1.2, src: 'tik', vol: 0.16 }, { bij: 1.6, src: 'tik', vol: 0.16 }] },
  { zin: 19, C: () => <S_Jacht />, sfeer: 'wind', vol: 0.08 },
  { zin: 20, C: S_Favoriet, accent: [{ bij: 0.6, src: 'glans', vol: 0.12 }] },
  { zin: 21, C: S_Rijk, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }, { bij: 1.6, src: 'tik', vol: 0.2 }] },
  { zin: 22, C: S_Zon, sfeer: 'zee', vol: 0.12 },
  { zin: 23, C: S_Bruiloft, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 24, C: S_Feest, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 1.2, src: 'munt', vol: 0.16 }, { bij: 1.8, src: 'munt', vol: 0.16 }] },
  { zin: 25, C: S_Bevel, sfeer: 'menigte', vol: 0.1, accent: [{ bij: 0.5, src: 'glans', vol: 0.14 }] },
  { zin: 26, C: S_KarelOud, sfeer: 'vuur', vol: 0.04 },
  { zin: 27, C: S_Afstand, sfeer: 'menigte', vol: 0.08 },
  { zin: 28, C: () => <S_Schouder />, sfeer: 'menigte', vol: 0.05 },
  { zin: 29, C: S_Jouw, accent: [{ bij: 0.1, src: 'inslag', vol: 0.18 }] },
  { zin: 30, C: () => <S_Filips />, accent: [{ bij: 0.5, src: 'glans', vol: 0.16 }] },
  { zin: 31, C: () => <S_Filips boos />, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  // ---------- III ----------
  { zin: 32, C: S_Gijzelaar, hoofdstuk: ['III', 'The Silent'], accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  { zin: 33, C: () => <S_Jacht henri fase="rijden" />, sfeer: 'wind', vol: 0.1 },
  { zin: 34, C: () => <S_Jacht henri fase="praat" />, sfeer: 'wind', vol: 0.06 },
  { zin: 35, C: () => <S_Jacht henri fase="plan" />, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.4, src: 'inslag', vol: 0.16 }] },
  { zin: 36, C: S_Herinnering, sfeer: 'vuur', vol: 0.04 },
  { zin: 37, C: () => <S_Jacht henri fase="stil" />, sfeer: 'wind', vol: 0.05 },
  { zin: 38, C: S_Bijnaam, accent: [{ bij: 1.2, src: 'glans', vol: 0.16 }] },
  { zin: 39, C: S_Stadhouder, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  { zin: 40, C: S_Wegvaren, sfeer: 'zee', vol: 0.16 },
  { zin: 41, C: S_Bevelen, accent: [{ bij: 1.0, src: 'inslag', vol: 0.16 }] },
  { zin: 42, C: S_Boeken, sfeer: 'vuur', vol: 0.12 },
  { zin: 43, C: () => <S_Raad />, sfeer: 'menigte', vol: 0.04 },
  { zin: 44, C: () => <S_Raad spreekt />, accent: [{ bij: 0.4, src: 'glans', vol: 0.12 }] },
  // ---------- IV ----------
  { zin: 45, C: S_Edelen, hoofdstuk: ['IV', 'The Iron Duke'], sfeer: 'menigte', vol: 0.12 },
  { zin: 46, C: S_Bedelaars, accent: [{ bij: 0.4, src: 'tik', vol: 0.18 }] },
  { zin: 47, C: S_Geuzen, sfeer: 'menigte', vol: 0.16 },
  { zin: 48, C: S_Beeldenstorm, sfeer: 'menigte', vol: 0.16, accent: [{ bij: 1.9, src: 'val', vol: 0.22 }, { bij: 2.0, src: 'inslag', vol: 0.2 }] },
  { zin: 49, C: S_FilipsWoede, accent: [{ bij: 0.3, src: 'inslag', vol: 0.22 }] },
  { zin: 50, C: S_Alva, sfeer: 'menigte', vol: 0.14 },
  { zin: 51, C: S_Vlucht, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 52, C: S_EgmontHorn },
  { zin: 53, C: S_Bloedraad, sfeer: 'vuur', vol: 0.04 },
  { zin: 54, C: S_Executies, sfeer: 'wind', vol: 0.08 },
  { zin: 55, C: S_Beslag, accent: [{ bij: 1.0, src: 'inslag', vol: 0.22 }] },
  { zin: 56, C: S_Zoon, sfeer: 'zee', vol: 0.14 },
  { zin: 57, C: S_Verdriet, sfeer: 'wind', vol: 0.05 },
  // ---------- V ----------
  { zin: 58, C: S_Besluit, hoofdstuk: ['V', 'Going to war'], accent: [{ bij: 1.35, src: 'inslag', vol: 0.24 }] },
  { zin: 59, C: S_Verkopen, accent: [{ bij: 0.5, src: 'munt', vol: 0.18 }, { bij: 1.0, src: 'munt', vol: 0.18 }, { bij: 1.4, src: 'inslag', vol: 0.16 }] },
  { zin: 60, C: S_Heiligerlee, sfeer: 'menigte', vol: 0.2, accent: [{ bij: 0.6, src: 'inslag', vol: 0.2 }, { bij: 1.6, src: 'inslag', vol: 0.18 }] },
  { zin: 61, C: S_Adolf, sfeer: 'wind', vol: 0.1 },
  { zin: 62, C: S_Opmars, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 63, C: S_Poort, accent: [{ bij: 0.4, src: 'val', vol: 0.14 }] },
  { zin: 64, C: S_Achtervolging, sfeer: 'wind', vol: 0.1 },
  { zin: 65, C: S_Blut, sfeer: 'wind', vol: 0.08 },
  { zin: 66, C: () => <S_ZeeHulp />, sfeer: 'zee', vol: 0.18 },
  { zin: 67, C: () => <S_ZeeHulp briel />, sfeer: 'zee', vol: 0.16, accent: [{ bij: 1.2, src: 'inslag', vol: 0.18 }] },
  { zin: 68, C: S_EenApril, sfeer: 'zee', vol: 0.1, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 69, C: S_Bril, accent: [{ bij: 1.3, src: 'val', vol: 0.16 }, { bij: 2.0, src: 'tik', vol: 0.18 }] },
  { zin: 70, C: S_Opstand, accent: [{ bij: 1.0, src: 'tik', vol: 0.18 }, { bij: 2.0, src: 'tik', vol: 0.18 }, { bij: 3.0, src: 'tik', vol: 0.18 }] },
  { zin: 71, C: () => <S_Lied />, sfeer: 'menigte', vol: 0.1 },
  { zin: 72, C: () => <S_Lied letters />, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 0.3, src: 'glans', vol: 0.14 }] },
  { zin: 73, C: S_Wilhelmus, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.6, src: 'glans', vol: 0.16 }] },
  // ---------- VI ----------
  { zin: 74, C: S_Mislukt, hoofdstuk: ['VI', 'Water as a weapon'], sfeer: 'wind', vol: 0.14 },
  { zin: 75, C: S_Parijs, sfeer: 'vuur', vol: 0.1 },
  { zin: 76, C: S_Graf, sfeer: 'wind', vol: 0.14 },
  { zin: 77, C: S_Calvinist, accent: [{ bij: 0.6, src: 'tik', vol: 0.16 }] },
  { zin: 78, C: S_Mook, sfeer: 'wind', vol: 0.12 },
  { zin: 79, C: S_DrieStoelen, sfeer: 'vuur', vol: 0.04 },
  { zin: 80, C: S_Leiden, sfeer: 'menigte', vol: 0.08 },
  { zin: 81, C: S_Honger, sfeer: 'wind', vol: 0.08 },
  { zin: 82, C: S_Keuze, sfeer: 'wind', vol: 0.08 },
  { zin: 83, C: S_Dijken, sfeer: 'rivier', vol: 0.2, accent: [{ bij: 1.0, src: 'inslag', vol: 0.18 }] },
  { zin: 84, C: S_Water, sfeer: 'rivier', vol: 0.16 },
  { zin: 85, C: S_Vloot, sfeer: 'zee', vol: 0.16 },
  { zin: 86, C: S_Haring, sfeer: 'menigte', vol: 0.16, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  { zin: 87, C: S_Universiteit, accent: [{ bij: 0.8, src: 'glans', vol: 0.16 }] },
  // ---------- VII ----------
  { zin: 88, C: S_Unie, hoofdstuk: ['VII', 'Outlaw'], sfeer: 'menigte', vol: 0.05 },
  { zin: 89, C: S_Genoeg, accent: [{ bij: 0.3, src: 'inslag', vol: 0.2 }] },
  { zin: 90, C: () => <S_Gezocht />, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.4, src: 'inslag', vol: 0.2 }] },
  { zin: 91, C: () => <S_Gezocht bedrag />, accent: [{ bij: 0.6, src: 'munt', vol: 0.18 }, { bij: 1.2, src: 'munt', vol: 0.18 }, { bij: 1.8, src: 'munt', vol: 0.18 }] },
  { zin: 92, C: () => <S_Apologie />, sfeer: 'vuur', vol: 0.04 },
  { zin: 93, C: () => <S_Apologie woorden />, accent: [{ bij: 0.6, src: 'tik', vol: 0.18 }] },
  { zin: 94, C: S_Staten, sfeer: 'menigte', vol: 0.12 },
  { zin: 95, C: S_Verlatinghe, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 96, C: S_Amerika, accent: [{ bij: 0.3, src: 'tik', vol: 0.18 }, { bij: 1.4, src: 'tik', vol: 0.18 }] },
  // ---------- VIII ----------
  { zin: 97, C: S_Antwerpen, hoofdstuk: ['VIII', 'Two bullets'], sfeer: 'vuur', vol: 0.04 },
  { zin: 98, C: () => <S_Schot />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.34 }] },
  { zin: 99, C: () => <S_Herstel />, accent: [{ bij: 1.0, src: 'glans', vol: 0.14 }] },
  { zin: 100, C: () => <S_Herstel charlotte />, sfeer: 'vuur', vol: 0.04 },
  { zin: 101, C: S_Charlotte, sfeer: 'wind', vol: 0.05 },
  { zin: 102, C: S_Prinsenhof, sfeer: 'wind', vol: 0.06 },
  { zin: 103, C: () => <S_Gerard />, sfeer: 'vuur', vol: 0.03 },
  { zin: 104, C: () => <S_Gerard beloning />, accent: [{ bij: 0.6, src: 'munt', vol: 0.18 }] },
  { zin: 105, C: S_TienJuli, sfeer: 'wind', vol: 0.04 },
  { zin: 106, C: S_Trap, accent: [{ bij: 0.6, src: 'tik', vol: 0.16 }] },
  { zin: 107, C: () => <S_Schot delft />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.34 }] },
  { zin: 107, na: 1.6, C: () => <S_Muur />, accent: [{ bij: 0.2, src: 'val', vol: 0.14 }] },
  { zin: 108, C: S_Woorden, sfeer: 'wind', vol: 0.05 },
  { zin: 109, C: S_Vandaag, accent: [{ bij: 0.6, src: 'glans', vol: 0.12 }] },
  // ---------- IX ----------
  { zin: 110, C: S_Schulden, hoofdstuk: ['IX', 'Father of the Fatherland'], sfeer: 'vuur', vol: 0.03 },
  { zin: 111, C: S_Oorlog, sfeer: 'menigte', vol: 0.12 },
  { zin: 112, C: S_Vrede, accent: [{ bij: 0.6, src: 'glans', vol: 0.18 }] },
  { zin: 113, C: S_Vader, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.5, src: 'glans', vol: 0.14 }] },
  { zin: 114, C: S_Huis, accent: [{ bij: 0.5, src: 'glans', vol: 0.16 }] },
  { zin: 115, C: S_Oranjefeest, sfeer: 'menigte', vol: 0.18 },
  { zin: 116, C: S_Wortels, accent: [{ bij: 2.0, src: 'inslag', vol: 0.18 }] },
  { zin: 117, C: S_Slot, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  // ---------- outro ----------
  { zin: 118, C: S_Slot, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const WILLEM_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[118].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, 118).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
};

/* ---------- muziek per hoofdstuk: de Caesar-stukken ---------- */
const HOOFDSTUK_START = (() => {
  const uit: number[] = [];
  let vorige = '';
  for (const z of ZINNEN) if (z.hoofdstuk !== vorige) { vorige = z.hoofdstuk; uit.push(z.start); }
  return uit;
})();
const CAESAR_LENGTE = [18.08, 35.06, 39.05, 41.06, 36.08, 42.06, 39.05, 85.05, 37.07, 37.07, 55.07];
/** teaser, I-IX, outro. IV (Alva) = de veldslag, VIII (Delft) = de Iden. */
const STUK = [0, 1, 2, 6, 7, 4, 3, 5, 9, 8, 10];
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

export const WillemLang = ({ muziek = true, stem = false }: { muziek?: boolean; stem?: boolean }) => (
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
    {stem && <Audio src={staticFile('lokaal/willem-lang-voice.wav')} volume={1.25} />}
  </AbsoluteFill>
);

/** Per-shot middenframe (voor de controlestills). */
export const WILLEM_SHOT_FRAMES = STARTS.map((s, i) => Math.round(((s + (i < STARTS.length - 1 ? STARTS[i + 1] : EIND)) / 2) * FPS));
