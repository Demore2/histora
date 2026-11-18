import type React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Figuur } from '../watals/Figuur';
import { FPS } from './basis';
import { CaesarOmslag } from './CaesarOmslag';
import timing from './caesar-timing.json';
import { R_100, R_49, R_50, R_58, R_75, STAD } from './KaarttafelRome';
import { LangAfsluiter } from './LangDecor';
import { JaarLabel, LangTeller, LangWatermerk, Ondertitel } from './LangHud';
import {
  CAESAR_JONG,
  HoofdstukKaart,
  Kaart,
  ks,
  MiniCaesar,
  MiniPompeius,
  MiniSchip,
  S_Alesia,
  S_Alexander,
  S_Alexandrie,
  S_AllIn,
  S_Arm,
  S_Augustus,
  S_Beeld,
  S_Bevel,
  S_Boek,
  S_Brief,
  S_Brittannie,
  S_BroerZus,
  S_Bruiloft,
  S_Brug,
  S_Calpurnia,
  S_Consul,
  S_Dictator,
  S_Drie,
  S_Eer,
  S_Erfenis,
  S_Fluisteren,
  S_Geboorte,
  S_Generaals,
  S_Hoofd,
  S_Hoofd2,
  S_Julia,
  S_Kalender,
  S_Kandidaten,
  S_Kring,
  S_Lijst,
  S_Marius,
  S_Moeder,
  S_NaarSenaat,
  S_Naam,
  S_Onderduiken,
  S_Overgave,
  S_Pharsalus,
  S_Piraten,
  S_PompeiusSenaat,
  S_Prijs,
  S_Republiek,
  S_Rouw,
  S_Rubicon,
  S_Samen,
  S_Schulden,
  S_Slot,
  S_Smeken,
  S_Spelen,
  S_Stammen,
  S_Sulla,
  S_Tapijt,
  S_Terug,
  S_Testament,
  S_Triomf,
  S_Vader,
  S_Venus,
  S_Veni,
  S_Vercingetorix,
  S_Vergeving,
  S_Vlucht,
  S_Volk,
  S_Zege,
  S_Ziener,
  S_ZienerAntwoord,
  Straat,
  T0_Knal,
  T5_Titel,
  VER,
} from './CaesarScenes';

/**
 * "What if you were Julius Caesar?" — lange YouTube-video #03 (16:9, ~8:50), stem Dylan, één shot per zin,
 * hele video in de "you"-vorm. Script: marketing/1.videos/1.te-posten/03-julius-caesar/werk/script.md.
 * Muziek: hergebruik van Napoleon (en het Egypte-stuk van Saladin), geen nieuwe credits.
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

const pl = (s: keyof typeof STAD): [number, number] => [STAD[s][0], STAD[s][1]];
const GOUD = '#C99A2E';
const ROOD = '#B3412F';
const GROEN = '#5E8A5A';
const BLAUW = '#3E5F9A';
const GALLIE = { lon: 3, lat: 47.5, h: 16, a: 9 };

const SHOTS: ShotDef[] = [
  // ---------- teaser ----------
  { zin: 0, C: T0_Knal, accent: [{ bij: 0, src: 'inslag', vol: 0.4 }, { bij: 0.07, src: 'inslag', vol: 0.28 }, { bij: 0.15, src: 'glans', vol: 0.16 }] },
  { zin: 1, C: () => <S_Piraten fase="lach" />, sfeer: 'zee', vol: 0.1 },
  { zin: 2, C: () => <Kaart van={R_58} naar={R_50} wissel={[5, 40]} cam={[VER, GALLIE]} camDuur={60} licht={['France', 'Belgium']} over={<LangTeller label="Gaul" waarde="Bigger than Italy" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 3, C: () => <S_Rubicon fase="over" />, sfeer: 'rivier', vol: 0.14 },
  { zin: 4, C: () => <S_Kring fase="steek" />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.18 }] },
  { zin: 5, C: T5_Titel, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.05, src: 'inslag', vol: 0.26 }, { bij: 0.4, src: 'glans', vol: 0.16 }] },
  // ---------- I · The boy from the Subura ----------
  { zin: 6, C: S_Geboorte, over: <JaarLabel jaar="July 100 BC" sub="Rome" />, hoofdstuk: ['I', 'The boy from the Subura'], sfeer: 'vuur', vol: 0.04 },
  { zin: 7, C: S_Naam, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 8, C: S_Venus, accent: [{ bij: 0.5, src: 'glans', vol: 0.12 }] },
  { zin: 9, C: S_Arm, accent: [{ bij: 1.0, src: 'munt', vol: 0.18 }] },
  { zin: 10, C: () => <Straat cam={[0.6, 1.6, 4, 0.2, 1.4, 1.5]} kijk={[0, 1.0, -2]}><Figuur kleding={CAESAR_JONG} position={[0.2, 0, -2]} rotation={[0, 0.4, 0]} scale={0.62} pose={{ mond: 'lach' }} /></Straat>, over: <LangTeller label="The Subura" waarde="Loud and dirty" />, sfeer: 'menigte', vol: 0.1 },
  { zin: 11, C: () => <Kaart van={R_100} cam={[{ lon: 14, lat: 40, h: 30, a: 12 }, VER]} licht={['Italy', 'Spain', 'Greece', 'Tunisia']} over={<LangTeller label="Rome rules" waarde="The Mediterranean" />} />, accent: [{ bij: 0.4, src: 'tik', vol: 0.22 }] },
  { zin: 12, C: S_Generaals, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.6, src: 'inslag', vol: 0.14 }] },
  { zin: 13, C: S_Vader, accent: [{ bij: 2.0, src: 'val', vol: 0.16 }] },
  { zin: 14, C: S_Hoofd, sfeer: 'vuur', vol: 0.04 },
  // ---------- II · Hunted by a dictator ----------
  { zin: 15, C: S_Bruiloft, hoofdstuk: ['II', 'Hunted by a dictator'], sfeer: 'menigte', vol: 0.06 },
  { zin: 16, C: () => <S_Sulla />, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.4, src: 'inslag', vol: 0.16 }] },
  { zin: 17, C: () => <S_Lijst />, sfeer: 'wind', vol: 0.06 },
  { zin: 18, C: () => <S_Bevel />, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 19, C: () => <S_Bevel nee />, accent: [{ bij: 0.1, src: 'inslag', vol: 0.2 }] },
  { zin: 20, C: () => <S_Lijst naam />, accent: [{ bij: 1.0, src: 'val', vol: 0.14 }] },
  { zin: 21, C: S_Onderduiken, sfeer: 'wind', vol: 0.12 },
  { zin: 22, C: () => <S_Smeken /> },
  { zin: 23, C: () => <S_Smeken waarschuwing />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.18 }] },
  { zin: 24, C: S_Marius, accent: [{ bij: 0.4, src: 'glans', vol: 0.12 }] },
  // ---------- III · Kidnapped by pirates ----------
  { zin: 25, C: () => <Kaart van={R_75} cam={[VER, { lon: 22, lat: 38.5, h: 18, a: 10 }]} route={[pl('rome'), [15.6, 38.2], [21.5, 36.6], pl('pharmacusa')]} kop={<MiniSchip />} spelden={[['rhodos', ROOD]]} over={<JaarLabel jaar="c. 75 BC" sub="sailing to Rhodes" />} />, hoofdstuk: ['III', 'Kidnapped by pirates'], sfeer: 'zee', vol: 0.06 },
  { zin: 26, C: () => <S_Piraten fase="gevangen" />, sfeer: 'zee', vol: 0.14, accent: [{ bij: 0.6, src: 'inslag', vol: 0.16 }] },
  { zin: 27, C: () => <S_Piraten fase="losgeld" />, sfeer: 'zee', vol: 0.1, accent: [{ bij: 0.5, src: 'munt', vol: 0.22 }] },
  { zin: 28, C: () => <S_Piraten fase="lach" />, sfeer: 'zee', vol: 0.1, accent: [{ bij: 1.2, src: 'munt', vol: 0.22 }, { bij: 1.8, src: 'munt', vol: 0.2 }] },
  { zin: 29, C: () => <S_Piraten fase="leider" />, sfeer: 'zee', vol: 0.12 },
  { zin: 30, C: () => <S_Piraten fase="stil" />, sfeer: 'zee', vol: 0.08 },
  { zin: 31, C: () => <S_Piraten fase="gedicht" />, sfeer: 'zee', vol: 0.08 },
  { zin: 32, C: () => <S_Piraten fase="belofte" />, sfeer: 'zee', vol: 0.08 },
  { zin: 33, C: () => <S_Piraten fase="grap" />, sfeer: 'zee', vol: 0.08 },
  { zin: 34, C: () => <S_Piraten fase="vrij" />, sfeer: 'zee', vol: 0.12, accent: [{ bij: 0.5, src: 'munt', vol: 0.2 }] },
  { zin: 35, C: () => <S_Terug />, sfeer: 'zee', vol: 0.16 },
  { zin: 36, C: () => <S_Terug gevangen />, sfeer: 'zee', vol: 0.08, accent: [{ bij: 0.3, src: 'inslag', vol: 0.2 }] },
  // ---------- IV · Deep in debt ----------
  { zin: 37, C: () => <S_Alexander />, hoofdstuk: ['IV', 'Deep in debt'], sfeer: 'vuur', vol: 0.04, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  { zin: 38, C: () => <S_Alexander lang /> },
  { zin: 39, C: S_AllIn, accent: [{ bij: 1.0, src: 'tik', vol: 0.3 }] },
  { zin: 40, C: S_Spelen, sfeer: 'menigte', vol: 0.16 },
  { zin: 40, na: 3.6, C: S_Schulden, accent: [{ bij: 0.3, src: 'munt', vol: 0.2 }, { bij: 1.2, src: 'munt', vol: 0.2 }] },
  { zin: 41, C: () => <S_Volk />, sfeer: 'menigte', vol: 0.18 },
  { zin: 42, C: S_Kandidaten, sfeer: 'wind', vol: 0.05 },
  { zin: 43, C: S_Moeder, sfeer: 'vuur', vol: 0.03 },
  { zin: 44, C: () => <S_Volk verkiezing />, sfeer: 'menigte', vol: 0.2, accent: [{ bij: 0.1, src: 'glans', vol: 0.16 }] },
  { zin: 45, C: () => <S_Drie />, sfeer: 'vuur', vol: 0.04 },
  { zin: 46, C: () => <S_Drie samen />, accent: [{ bij: 0.6, src: 'munt', vol: 0.2 }] },
  { zin: 47, C: S_Julia, sfeer: 'menigte', vol: 0.06 },
  { zin: 48, C: S_Consul, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 0.3, src: 'glans', vol: 0.16 }] },
  // ---------- V · Gaul ----------
  { zin: 49, C: () => <Kaart van={R_58} cam={[VER, GALLIE]} spelden={[['massilia', ROOD]]} licht={['France', 'Belgium']} over={<JaarLabel jaar="58 BC" sub="the edge of Gaul" />} />, hoofdstuk: ['V', 'Gaul'], accent: [{ bij: 0.4, src: 'tik', vol: 0.22 }] },
  { zin: 50, C: S_Stammen, sfeer: 'wind', vol: 0.1 },
  { zin: 51, C: () => <Kaart van={R_58} naar={R_50} wissel={[10, 110]} cam={[GALLIE, { lon: 4, lat: 48, h: 14, a: 8 }]} over={<LangTeller label="Gaul" waarde="Conquered" pil="58–50 BC" />} />, accent: [{ bij: 1, src: 'tik', vol: 0.2 }, { bij: 2.6, src: 'tik', vol: 0.2 }] },
  { zin: 52, C: () => <S_Brug />, sfeer: 'rivier', vol: 0.12, accent: [{ bij: 0.4, src: 'tik', vol: 0.2 }, { bij: 1.4, src: 'tik', vol: 0.2 }] },
  { zin: 52, na: 4.2, C: () => <S_Brug af />, sfeer: 'rivier', vol: 0.1, accent: [{ bij: 2.0, src: 'val', vol: 0.16 }] },
  { zin: 53, C: S_Brittannie, sfeer: 'zee', vol: 0.14 },
  { zin: 54, C: S_Vercingetorix, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.4, src: 'inslag', vol: 0.16 }] },
  { zin: 55, C: () => <S_Alesia ringen={1} />, sfeer: 'wind', vol: 0.08, accent: [{ bij: 1, src: 'tik', vol: 0.18 }, { bij: 3, src: 'tik', vol: 0.18 }] },
  { zin: 56, C: () => <S_Alesia ringen={2} />, sfeer: 'wind', vol: 0.08, accent: [{ bij: 1, src: 'tik', vol: 0.18 }] },
  { zin: 57, C: () => <S_Alesia ringen={2} slag />, sfeer: 'menigte', vol: 0.18, accent: [{ bij: 0.4, src: 'inslag', vol: 0.18 }] },
  { zin: 58, C: S_Zege, sfeer: 'menigte', vol: 0.18, accent: [{ bij: 0.1, src: 'glans', vol: 0.16 }] },
  { zin: 59, C: S_Overgave, sfeer: 'wind', vol: 0.06, accent: [{ bij: 1.3, src: 'val', vol: 0.18 }] },
  { zin: 60, C: () => <S_Prijs />, sfeer: 'vuur', vol: 0.12 },
  { zin: 61, C: () => <S_Prijs teller={<LangTeller label="Ancient writers" waarde="1,000,000 killed" pil="and 1,000,000 enslaved" />} />, sfeer: 'vuur', vol: 0.1 },
  { zin: 62, C: () => <Kaart van={R_50} cam={[GALLIE, { lon: 3, lat: 47, h: 12, a: 7 }]} licht={['France', 'Belgium']} over={<LangTeller label="Historians" waarde="Numbers too high" pil="but whole peoples destroyed" />} /> },
  { zin: 63, C: S_Boek, sfeer: 'vuur', vol: 0.04 },
  // ---------- VI · The Rubicon ----------
  { zin: 64, C: () => <Kaart van={R_50} naar={R_49} wissel={[20, 90]} cam={[VER, { lon: 13, lat: 42, h: 20, a: 11 }]} spelden={[['rome', BLAUW]]} over={<LangTeller label="In Rome" waarde="Everything falls apart" />} />, hoofdstuk: ['VI', 'The Rubicon'], accent: [{ bij: 1, src: 'val', vol: 0.12 }] },
  { zin: 65, C: S_Rouw, sfeer: 'vuur', vol: 0.03 },
  { zin: 66, C: S_PompeiusSenaat },
  { zin: 67, C: () => <S_Brief />, sfeer: 'vuur', vol: 0.04 },
  { zin: 68, C: () => <S_Brief proces />, sfeer: 'vuur', vol: 0.04 },
  { zin: 69, C: () => <S_Rubicon fase="staan" />, sfeer: 'rivier', vol: 0.14 },
  { zin: 70, C: () => <Kaart van={R_49} cam={[{ lon: 12, lat: 43, h: 14, a: 8 }, ks('rubicon', 7, 6)]} spelden={[['rubicon', ROOD], ['rome', BLAUW]]} over={<LangTeller label="Roman law" waarde="No army" pil="south of the Rubicon" />} />, accent: [{ bij: 0.4, src: 'tik', vol: 0.22 }] },
  { zin: 71, C: () => <S_Rubicon fase="twijfel" />, sfeer: 'rivier', vol: 0.12 },
  { zin: 72, C: () => <S_Rubicon fase="teerling" />, sfeer: 'rivier', vol: 0.12, accent: [{ bij: 0.6, src: 'tik', vol: 0.3 }] },
  { zin: 73, C: () => <S_Rubicon fase="over" />, sfeer: 'rivier', vol: 0.16, accent: [{ bij: 0.2, src: 'inslag', vol: 0.2 }] },
  { zin: 74, C: S_Vlucht, sfeer: 'menigte', vol: 0.1 },
  { zin: 75, C: S_Pharsalus, sfeer: 'menigte', vol: 0.16, accent: [{ bij: 0.6, src: 'inslag', vol: 0.18 }] },
  { zin: 76, C: () => <Kaart van={R_49} cam={[{ lon: 24, lat: 37, h: 20, a: 11 }, { lon: 27, lat: 34, h: 18, a: 10 }]} route={[pl('pharsalus'), [24, 36], pl('alexandrie')]} kop={<MiniPompeius />} spelden={[['alexandrie', GOUD]]} over={<JaarLabel jaar="48 BC" sub="Pompey flees to Egypt" />} />, sfeer: 'zee', vol: 0.05 },
  { zin: 77, C: () => <S_Hoofd2 />, accent: [{ bij: 1.0, src: 'val', vol: 0.14 }] },
  { zin: 78, C: () => <S_Hoofd2 huil />, sfeer: 'wind', vol: 0.05 },
  // ---------- VII · Cleopatra ----------
  { zin: 79, C: () => <S_BroerZus />, hoofdstuk: ['VII', 'Cleopatra'], accent: [{ bij: 0.5, src: 'glans', vol: 0.12 }] },
  { zin: 80, C: () => <S_BroerZus buiten /> },
  { zin: 81, C: S_Tapijt, accent: [{ bij: 1.6, src: 'glans', vol: 0.16 }] },
  { zin: 82, C: () => <S_Samen teller={<LangTeller label="Age" waarde="52 · 21" pil="you · Cleopatra" />} /> },
  { zin: 83, C: () => <S_Alexandrie />, sfeer: 'menigte', vol: 0.16, accent: [{ bij: 0.5, src: 'inslag', vol: 0.16 }] },
  { zin: 84, C: () => <S_Alexandrie brand />, sfeer: 'vuur', vol: 0.2 },
  { zin: 85, C: () => <S_Samen teller={<JaarLabel jaar="47 BC" sub="Cleopatra, queen of Egypt" />} />, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 86, C: () => <S_Samen kind teller={<LangTeller label="Her son" waarde="Caesarion" pil="little Caesar" />} /> },
  { zin: 87, C: () => <Kaart van={R_49} cam={[{ lon: 30, lat: 34, h: 18, a: 10 }, ks('zela', 9, 8)]} route={[pl('alexandrie'), [34.5, 35.5], pl('zela')]} kop={<MiniCaesar />} spelden={[['zela', ROOD]]} over={<LangTeller label="Zela, 47 BC" waarde="5 days" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 88, C: S_Veni, sfeer: 'menigte', vol: 0.1, accent: [{ bij: 0.4, src: 'inslag', vol: 0.2 }, { bij: 1.1, src: 'inslag', vol: 0.2 }, { bij: 1.8, src: 'inslag', vol: 0.22 }] },
  // ---------- VIII · Dictator ----------
  { zin: 89, C: () => <S_Triomf teller={<JaarLabel jaar="45 BC" sub="no one left to fight" />} />, hoofdstuk: ['VIII', 'Dictator'], sfeer: 'menigte', vol: 0.2 },
  { zin: 90, C: () => <S_Eer fase="stoel" />, accent: [{ bij: 1.2, src: 'glans', vol: 0.14 }, { bij: 2.4, src: 'munt', vol: 0.2 }] },
  { zin: 91, C: () => <S_Eer fase="juli" />, accent: [{ bij: 1.0, src: 'glans', vol: 0.16 }] },
  { zin: 92, C: () => <S_Kalender fase="scheef" />, sfeer: 'vuur', vol: 0.03 },
  { zin: 93, C: () => <S_Kalender fase="teller" />, accent: [{ bij: 0.4, src: 'tik', vol: 0.2 }, { bij: 2.0, src: 'tik', vol: 0.2 }] },
  { zin: 94, C: () => <S_Kalender fase="eeuwen" />, accent: [{ bij: 3.5, src: 'glans', vol: 0.14 }] },
  { zin: 95, C: () => <S_Vergeving /> },
  { zin: 96, C: () => <S_Vergeving brutus />, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  { zin: 97, C: () => <S_Dictator />, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 98, C: S_Fluisteren, sfeer: 'vuur', vol: 0.03 },
  { zin: 99, C: () => <S_Dictator koning />, accent: [{ bij: 0.6, src: 'inslag', vol: 0.18 }] },
  // ---------- IX · The Ides of March ----------
  { zin: 100, C: () => <S_Ziener />, hoofdstuk: ['IX', 'The Ides of March'], sfeer: 'wind', vol: 0.05 },
  { zin: 101, C: () => <S_Calpurnia droom />, sfeer: 'wind', vol: 0.05 },
  { zin: 102, C: () => <S_Calpurnia />, sfeer: 'vuur', vol: 0.03 },
  { zin: 103, C: S_NaarSenaat, sfeer: 'menigte', vol: 0.06 },
  { zin: 104, C: () => <S_Ziener grap /> },
  { zin: 105, C: S_ZienerAntwoord, accent: [{ bij: 1.6, src: 'val', vol: 0.14 }] },
  { zin: 106, C: () => <S_Kring fase="om" />, sfeer: 'wind', vol: 0.05 },
  { zin: 107, C: () => <S_Kring fase="zestig" /> },
  { zin: 108, C: () => <S_Kring fase="steek" />, accent: [{ bij: 0.2, src: 'inslag', vol: 0.22 }] },
  { zin: 109, C: () => <S_Kring fase="brutus" />, accent: [{ bij: 1.4, src: 'val', vol: 0.16 }] },
  { zin: 110, C: () => <S_Kring fase="toga" /> },
  { zin: 111, C: () => <S_Beeld />, accent: [{ bij: 0.8, src: 'val', vol: 0.2 }] },
  { zin: 112, C: () => <S_Beeld wonden />, accent: [{ bij: 0.4, src: 'tik', vol: 0.18 }] },
  { zin: 113, C: () => <S_Republiek /> },
  { zin: 114, C: () => <S_Republiek kapot />, sfeer: 'vuur', vol: 0.1 },
  { zin: 115, C: () => <S_Testament />, sfeer: 'menigte', vol: 0.06 },
  { zin: 116, C: () => <S_Testament octavianus /> },
  { zin: 117, C: S_Augustus, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 118, C: S_Erfenis, accent: [{ bij: 1.2, src: 'glans', vol: 0.16 }] },
  // ---------- outro ----------
  { zin: 119, C: S_Slot, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];
void GROEN;

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const CAESAR_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[119].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, 119).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
};

/* ---------- muziek per hoofdstuk (hergebruikt, genormaliseerd op -18 LUFS) ---------- */
const HOOFDSTUK_START = (() => {
  const uit: number[] = [];
  let vorige = '';
  for (const z of ZINNEN) if (z.hoofdstuk !== vorige) { vorige = z.hoofdstuk; uit.push(z.start); }
  return uit;
})();
/** Lengte van elk muziekstuk (s): een hoofdstuk dat langer duurt speelt het stuk opnieuw, met een overvloeier. */
const MUZIEK_LENGTE = [18.08, 35.06, 39.05, 41.06, 36.08, 42.06, 39.05, 85.05, 37.07, 37.07, 55.07];
const OVERLAP = 2.5;
type Stuk = { i: number; k: number; van: number; tot: number; vol: number; inFade: boolean; uitFade: boolean };
const STUKKEN: Stuk[] = HOOFDSTUK_START.flatMap((st, i) => {
  const van = i === 0 ? 0 : st - 0.6;
  const tot = i < HOOFDSTUK_START.length - 1 ? HOOFDSTUK_START[i + 1] - 0.6 + 1.5 : EIND;
  const vol = i === 0 ? 0.42 : 0.2;
  const L = MUZIEK_LENGTE[i];
  const uit: Stuk[] = [];
  let t = van;
  let k = 0;
  while (t < tot - 0.5) {
    const eind = Math.min(tot, t + L);
    uit.push({ i, k, van: t, tot: eind, vol, inFade: k > 0 || i > 0, uitFade: true });
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
            src={staticFile(`lokaal/caesar-muziek/m${m.i}.mp3`)}
            volume={(fr) => interpolate(fr, [0, inF, Math.max(inF + 1, lengte - 60), lengte], [m.i === 0 ? m.vol : 0, m.vol, m.vol, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        </Sequence>
      );
    })}
  </>
);

export const CaesarLang = ({ muziek = true }: { muziek?: boolean }) => (
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
    {/* de staande omslag (gestapeld in het 3:4-midden) in de eerste 3 frames: zo kiest Instagram/TikTok hem vanzelf als omslag */}
    <Sequence from={0} durationInFrames={3}>
      <CaesarOmslag />
    </Sequence>
    {muziek && <Muziek />}
    <Audio src={staticFile('lokaal/caesar-lang-voice.mp3')} volume={1.25} />
  </AbsoluteFill>
);
