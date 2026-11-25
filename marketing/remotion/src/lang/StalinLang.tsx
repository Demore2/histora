import type React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from './basis';
import { HoofdstukKaart } from './CaesarScenes';
import { LangAfsluiter } from './LangDecor';
import { LangWatermerk, Ondertitel } from './LangHud';
import timing from './stalin-timing.json';
import {
  S_Arrest, S_Baku, S_Buiten, S_Burgeroorlog, S_Droom, S_Geheim, S_Geld, S_GoriAvond, S_Idee, S_Inval, S_KaartGori, S_KaartKureika, S_KaartSiberie,
  S_KaartTsaritsyn, S_Keke, S_Koba, S_Koets, S_Koor, S_Krant, S_Lenin, S_LeninDood, S_LeninZiek, S_Marx, S_Minister, S_Naam, S_NaamStalin, S_Nieuws,
  S_Oktober, S_Overval, S_Pokken, S_SecGen, S_Seminarie, S_Slaapzaal, S_SneeuwVlucht, S_TeaserBank, S_TeaserKaart, S_TeaserVader, S_Trein, S_Trotski,
  S_Tsaritsyn, S_Vergadering, S_Vissen, S_Weerstation, S_Werkplaats, T0_Knal, T5_Titel,
} from './StalinScenes';
import {
  S_Akker, S_Alleen, S_Auto, S_BeeldValt, S_Begrafenis, S_Berlijn, S_Cultus, S_Datsja, S_Deur, S_Doden, S_Dokters, S_Dood, S_Generaals, S_Honger, S_Industrie,
  S_KaartBlok, S_KaartDeportatie, S_KaartGoelag, S_KaartHonger, S_KaartInval, S_KaartPact, S_Kirov, S_Mexico, S_Nadja, S_Officieel, S_Pact, S_Parade,
  S_Paranoia, S_Plan, S_Prijs, S_Proces, S_Quota, S_Ramen, S_Schaak, S_Slot, S_Spion, S_Stalingrad, S_Supermacht, S_Toespraak, S_TrotskiWeg, S_Verjaardag,
  S_Vijanden, S_Volgograd, S_Yakov, S_Yezhov,
} from './StalinScenes2';

/**
 * "What if you were Joseph Stalin?" — lange YouTube-video #09 (16:9), één shot per zin, "you"-vorm.
 * Stem: lokaal Chatterbox (G:/dev-tools/stem/stem.py); timing uit diens timing.json.
 * Muziek: de Caesar-stukken, opnieuw gekozen per hoofdstuk (geen nieuwe credits).
 * Geen geweld in beeld; de tekst noemt de prijs wel. Dit is geen heldenverhaal.
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
  { zin: 1, C: S_TeaserVader, sfeer: 'vuur', vol: 0.04, accent: [{ bij: 1.6, src: 'val', vol: 0.14 }] },
  { zin: 2, C: S_TeaserBank, accent: [{ bij: 0.3, src: 'inslag', vol: 0.22 }, { bij: 0.9, src: 'munt', vol: 0.18 }] },
  { zin: 3, C: S_TeaserKaart, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 4, C: () => <S_Deur />, accent: [{ bij: 0.6, src: 'tik', vol: 0.18 }] },
  { zin: 5, C: S_GoriAvond, sfeer: 'wind', vol: 0.1 },
  { zin: 5, na: 4.0, C: T5_Titel, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.05, src: 'inslag', vol: 0.26 }, { bij: 0.4, src: 'glans', vol: 0.16 }] },
  // ---------- I ----------
  { zin: 6, C: S_KaartGori, hoofdstuk: ['I', "The shoemaker's son"], accent: [{ bij: 1.2, src: 'tik', vol: 0.2 }] },
  { zin: 7, C: S_Naam, sfeer: 'wind', vol: 0.06 },
  { zin: 8, C: () => <S_Werkplaats fase="vader" />, accent: [{ bij: 1.0, src: 'tik', vol: 0.14 }, { bij: 1.5, src: 'tik', vol: 0.14 }] },
  { zin: 9, C: () => <S_Werkplaats fase="drinkt" />, sfeer: 'vuur', vol: 0.04, accent: [{ bij: 0.6, src: 'val', vol: 0.14 }] },
  { zin: 10, C: S_Keke },
  { zin: 11, C: S_Pokken, sfeer: 'vuur', vol: 0.03 },
  { zin: 12, C: S_Koets, accent: [{ bij: 1.0, src: 'inslag', vol: 0.2 }, { bij: 1.4, src: 'val', vol: 0.16 }] },
  { zin: 13, C: S_Koor, sfeer: 'wind', vol: 0.05 },
  { zin: 14, C: S_Droom, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  // ---------- II ----------
  { zin: 15, C: S_Seminarie, hoofdstuk: ['II', "The priest who wasn't"], sfeer: 'menigte', vol: 0.04 },
  { zin: 16, C: () => <S_Slaapzaal fase="controle" />, accent: [{ bij: 1.0, src: 'tik', vol: 0.16 }] },
  { zin: 17, C: S_Krant, accent: [{ bij: 0.5, src: 'glans', vol: 0.14 }] },
  { zin: 18, C: () => <S_Slaapzaal fase="nacht" />, sfeer: 'vuur', vol: 0.03, accent: [{ bij: 0.8, src: 'tik', vol: 0.14 }, { bij: 1.2, src: 'tik', vol: 0.14 }, { bij: 1.6, src: 'tik', vol: 0.14 }] },
  { zin: 19, C: S_Marx, sfeer: 'menigte', vol: 0.1 },
  { zin: 20, C: S_Idee, accent: [{ bij: 0.4, src: 'glans', vol: 0.12 }] },
  { zin: 21, C: S_Geheim, sfeer: 'wind', vol: 0.06 },
  { zin: 22, C: S_Buiten, accent: [{ bij: 1.2, src: 'inslag', vol: 0.24 }] },
  { zin: 23, C: () => <S_Weerstation />, sfeer: 'wind', vol: 0.12 },
  { zin: 24, C: () => <S_Weerstation grap />, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.4, src: 'tik', vol: 0.16 }] },
  // ---------- III ----------
  { zin: 25, C: S_Inval, hoofdstuk: ['III', 'Koba'], sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.6, src: 'tik', vol: 0.18 }] },
  { zin: 26, C: S_Koba, sfeer: 'vuur', vol: 0.03 },
  { zin: 27, C: S_Baku, sfeer: 'menigte', vol: 0.12 },
  { zin: 28, C: S_Lenin, sfeer: 'menigte', vol: 0.06 },
  { zin: 29, C: S_Geld, accent: [{ bij: 0.6, src: 'tik', vol: 0.18 }] },
  { zin: 30, C: () => <S_Overval fase="koets" />, sfeer: 'menigte', vol: 0.08 },
  { zin: 31, C: () => <S_Overval fase="knal" />, accent: [{ bij: 0, src: 'inslag', vol: 0.34 }, { bij: 0.1, src: 'inslag', vol: 0.22 }, { bij: 1.4, src: 'munt', vol: 0.18 }] },
  { zin: 32, C: () => <S_Overval fase="koba" /> },
  { zin: 33, C: S_Arrest, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 34, C: () => <S_KaartSiberie />, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 35, C: S_SneeuwVlucht, sfeer: 'wind', vol: 0.16 },
  { zin: 36, C: S_NaamStalin, sfeer: 'vuur', vol: 0.03, accent: [{ bij: 1.6, src: 'glans', vol: 0.18 }] },
  { zin: 37, C: S_KaartKureika, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 38, C: S_Vissen, sfeer: 'wind', vol: 0.14 },
  { zin: 39, C: S_Nieuws, sfeer: 'wind', vol: 0.08, accent: [{ bij: 1.6, src: 'glans', vol: 0.18 }] },
  // ---------- IV ----------
  { zin: 40, C: S_Trein, hoofdstuk: ['IV', 'Revolution'], sfeer: 'wind', vol: 0.12 },
  { zin: 41, C: S_Oktober, sfeer: 'menigte', vol: 0.2, accent: [{ bij: 1.3, src: 'inslag', vol: 0.2 }] },
  { zin: 42, C: S_Minister, accent: [{ bij: 0.5, src: 'glans', vol: 0.12 }] },
  { zin: 43, C: () => <S_Trotski />, sfeer: 'menigte', vol: 0.12 },
  { zin: 44, C: () => <S_Trotski spot />, sfeer: 'menigte', vol: 0.05, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 45, C: S_Burgeroorlog, sfeer: 'wind', vol: 0.12, accent: [{ bij: 1.0, src: 'inslag', vol: 0.18 }, { bij: 2.0, src: 'inslag', vol: 0.16 }] },
  { zin: 46, C: S_KaartTsaritsyn, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 47, C: S_Tsaritsyn, sfeer: 'wind', vol: 0.08 },
  { zin: 48, C: () => <S_SecGen fase="nieuw" />, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  { zin: 49, C: () => <S_SecGen fase="dossiers" />, accent: [{ bij: 0.5, src: 'tik', vol: 0.14 }, { bij: 1.0, src: 'tik', vol: 0.14 }] },
  { zin: 50, C: () => <S_SecGen fase="kaarten" />, accent: [{ bij: 0.4, src: 'tik', vol: 0.14 }, { bij: 1.2, src: 'tik', vol: 0.14 }, { bij: 2.0, src: 'tik', vol: 0.14 }] },
  { zin: 51, C: () => <S_SecGen fase="buigen" /> },
  { zin: 52, C: () => <S_LeninZiek fase="beroerte" />, sfeer: 'wind', vol: 0.05 },
  { zin: 53, C: () => <S_LeninZiek fase="dicteert" />, sfeer: 'vuur', vol: 0.03 },
  { zin: 54, C: () => <S_LeninZiek fase="brief" />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.18 }] },
  { zin: 55, C: S_LeninDood, sfeer: 'wind', vol: 0.12 },
  { zin: 56, C: () => <S_Vergadering fase="leest" />, accent: [{ bij: 0.5, src: 'tik', vol: 0.14 }] },
  // ---------- V ----------
  { zin: 57, C: () => <S_Schaak />, hoofdstuk: ['V', 'Man of steel'], sfeer: 'vuur', vol: 0.02, accent: [{ bij: 1.4, src: 'tik', vol: 0.16 }] },
  { zin: 58, C: () => <S_Schaak tot={1} />, accent: [{ bij: 1.1, src: 'val', vol: 0.16 }] },
  { zin: 59, C: S_TrotskiWeg, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 60, C: () => <S_Schaak van={1} tot={4} />, accent: [{ bij: 0.75, src: 'val', vol: 0.14 }, { bij: 1.5, src: 'val', vol: 0.14 }, { bij: 2.2, src: 'val', vol: 0.14 }] },
  { zin: 61, C: S_Verjaardag, sfeer: 'menigte', vol: 0.18 },
  { zin: 62, C: S_Plan, accent: [{ bij: 0.6, src: 'tik', vol: 0.16 }, { bij: 2.6, src: 'glans', vol: 0.14 }] },
  { zin: 63, C: S_Industrie, sfeer: 'menigte', vol: 0.06, accent: [{ bij: 0.8, src: 'inslag', vol: 0.16 }, { bij: 2.0, src: 'inslag', vol: 0.14 }] },
  { zin: 64, C: () => <S_Akker fase="graan" />, sfeer: 'wind', vol: 0.1 },
  { zin: 65, C: () => <S_Akker fase="kolchoz" />, sfeer: 'wind', vol: 0.08 },
  { zin: 66, C: S_KaartDeportatie, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 67, C: () => <S_Akker fase="leeg" />, sfeer: 'wind', vol: 0.1 },
  { zin: 68, C: S_KaartHonger, accent: [{ bij: 0.5, src: 'inslag', vol: 0.16 }] },
  { zin: 69, C: S_Honger, sfeer: 'wind', vol: 0.14 },
  { zin: 70, C: S_Nadja, sfeer: 'vuur', vol: 0.03 },
  { zin: 71, C: S_Officieel, accent: [{ bij: 1.0, src: 'inslag', vol: 0.2 }] },
  { zin: 72, C: S_Alleen, sfeer: 'wind', vol: 0.04 },
  // ---------- VI ----------
  { zin: 73, C: S_Kirov, hoofdstuk: ['VI', 'The Terror'], accent: [{ bij: 0.67, src: 'inslag', vol: 0.32 }] },
  { zin: 74, C: S_Vijanden, accent: [{ bij: 0.5, src: 'tik', vol: 0.14 }, { bij: 1.2, src: 'tik', vol: 0.14 }, { bij: 1.9, src: 'tik', vol: 0.14 }] },
  { zin: 75, C: S_Proces, sfeer: 'menigte', vol: 0.04 },
  { zin: 76, C: S_Quota, accent: [{ bij: 0.6, src: 'tik', vol: 0.16 }] },
  { zin: 77, C: S_Auto, sfeer: 'wind', vol: 0.06, accent: [{ bij: 2.4, src: 'tik', vol: 0.18 }] },
  { zin: 78, C: S_Ramen, sfeer: 'wind', vol: 0.05 },
  { zin: 79, C: S_KaartGoelag, accent: [{ bij: 0.5, src: 'tik', vol: 0.16 }, { bij: 1.5, src: 'tik', vol: 0.16 }] },
  { zin: 80, C: S_Generaals, accent: [{ bij: 1.1, src: 'val', vol: 0.14 }, { bij: 1.6, src: 'val', vol: 0.14 }, { bij: 2.2, src: 'val', vol: 0.14 }] },
  { zin: 81, C: () => <S_Yezhov fase="baas" /> },
  { zin: 82, C: () => <S_Yezhov fase="weg" />, sfeer: 'wind', vol: 0.05, accent: [{ bij: 2.0, src: 'inslag', vol: 0.22 }] },
  { zin: 83, C: () => <S_Yezhov fase="foto" />, sfeer: 'zee', vol: 0.06, accent: [{ bij: 1.4, src: 'glans', vol: 0.14 }] },
  { zin: 84, C: () => <S_Mexico />, sfeer: 'wind', vol: 0.05 },
  { zin: 85, C: () => <S_Mexico leeg />, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.3, src: 'val', vol: 0.16 }] },
  // ---------- VII ----------
  { zin: 86, C: S_Pact, hoofdstuk: ['VII', 'The war'], accent: [{ bij: 1.4, src: 'inslag', vol: 0.2 }] },
  { zin: 87, C: S_KaartPact, accent: [{ bij: 0.5, src: 'tik', vol: 0.16 }] },
  { zin: 88, C: () => <S_Spion /> },
  { zin: 89, C: () => <S_Spion boos />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.18 }] },
  { zin: 90, C: () => <S_KaartInval />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.3 }, { bij: 1.4, src: 'inslag', vol: 0.2 }] },
  { zin: 91, C: () => <S_KaartInval verder />, accent: [{ bij: 0.5, src: 'inslag', vol: 0.18 }, { bij: 1.6, src: 'inslag', vol: 0.16 }] },
  { zin: 92, C: () => <S_Parade />, sfeer: 'wind', vol: 0.14 },
  { zin: 93, C: () => <S_Parade weg />, sfeer: 'wind', vol: 0.12 },
  { zin: 94, C: () => <S_Yakov fase="gevangen" />, sfeer: 'wind', vol: 0.06 },
  { zin: 95, C: () => <S_Yakov fase="ruil" />, accent: [{ bij: 0.2, src: 'tik', vol: 0.16 }, { bij: 1.4, src: 'tik', vol: 0.16 }] },
  { zin: 96, C: () => <S_Yakov fase="antwoord" />, sfeer: 'vuur', vol: 0.02 },
  { zin: 97, C: () => <S_Yakov fase="leeg" />, sfeer: 'wind', vol: 0.08 },
  { zin: 98, C: S_Stalingrad, sfeer: 'wind', vol: 0.16, accent: [{ bij: 0.6, src: 'inslag', vol: 0.18 }, { bij: 2.2, src: 'inslag', vol: 0.16 }] },
  { zin: 99, C: S_Berlijn, sfeer: 'wind', vol: 0.1, accent: [{ bij: 2.4, src: 'glans', vol: 0.18 }] },
  { zin: 100, C: S_Doden, sfeer: 'wind', vol: 0.06 },
  // ---------- VIII ----------
  { zin: 101, C: S_KaartBlok, hoofdstuk: ['VIII', 'The last door'], accent: [{ bij: 2.0, src: 'inslag', vol: 0.22 }] },
  { zin: 102, C: S_Cultus, sfeer: 'menigte', vol: 0.12 },
  { zin: 103, C: S_Paranoia, accent: [{ bij: 0.6, src: 'tik', vol: 0.16 }, { bij: 1.2, src: 'tik', vol: 0.16 }, { bij: 1.8, src: 'tik', vol: 0.16 }] },
  { zin: 104, C: S_Dokters, accent: [{ bij: 1.35, src: 'inslag', vol: 0.2 }] },
  { zin: 105, C: S_Datsja, sfeer: 'wind', vol: 0.12 },
  { zin: 106, C: () => <S_Deur fase="bordje" />, accent: [{ bij: 0.6, src: 'tik', vol: 0.14 }] },
  { zin: 107, C: () => <S_Deur fase="wacht" />, accent: [{ bij: 0.5, src: 'tik', vol: 0.14 }, { bij: 1.5, src: 'tik', vol: 0.14 }, { bij: 2.5, src: 'tik', vol: 0.14 }] },
  { zin: 108, C: () => <S_Deur fase="open" />, accent: [{ bij: 0.7, src: 'val', vol: 0.16 }] },
  { zin: 109, C: S_Dood, sfeer: 'wind', vol: 0.08 },
  { zin: 110, C: S_Begrafenis, sfeer: 'menigte', vol: 0.18 },
  // ---------- IX ----------
  { zin: 111, C: () => <S_Toespraak />, hoofdstuk: ['IX', 'Hero or monster?'], accent: [{ bij: 0.6, src: 'tik', vol: 0.14 }] },
  { zin: 112, C: () => <S_Toespraak zaal />, sfeer: 'menigte', vol: 0.06 },
  { zin: 113, C: S_BeeldValt, accent: [{ bij: 2.8, src: 'val', vol: 0.24 }, { bij: 3.0, src: 'inslag', vol: 0.2 }] },
  { zin: 114, C: S_Volgograd, accent: [{ bij: 0.7, src: 'tik', vol: 0.18 }, { bij: 1.2, src: 'glans', vol: 0.16 }] },
  { zin: 115, C: S_Supermacht, sfeer: 'menigte', vol: 0.05 },
  { zin: 116, C: S_Prijs, sfeer: 'wind', vol: 0.06 },
  { zin: 117, C: S_Slot, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  // ---------- outro ----------
  { zin: 118, C: S_Slot, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const STALIN_LANG_DUUR = Math.round(EIND * FPS);
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
/** teaser, I-IX, outro. IV (revolutie) = de veldslag, VI (Terreur) = de Iden, VII (oorlog) = de grote slag. */
const STUK = [0, 1, 2, 3, 6, 4, 9, 7, 8, 5, 10];
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

export const StalinLang = ({ muziek = true, stem = false }: { muziek?: boolean; stem?: boolean }) => (
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
    {stem && <Audio src={staticFile('lokaal/stalin-lang-voice.wav')} volume={1.25} />}
  </AbsoluteFill>
);

/** Per-shot middenframe (voor de controlestills). */
export const STALIN_SHOT_FRAMES = STARTS.map((s, i) => Math.round(((s + (i < STARTS.length - 1 ? STARTS[i + 1] : EIND)) / 2) * FPS));
