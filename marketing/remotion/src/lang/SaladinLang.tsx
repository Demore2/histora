import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { ARMEN_GEKRUIST, Figuur, Kroon, omhoog, wijs } from '../watals/Figuur';
import { FPS } from './basis';
import { MO_1137, MO_1171, MO_1186, MO_1187, MO_1192, MO_1193, STAD } from './KaarttafelMO';
import { LangAfsluiter } from './LangDecor';
import { JaarLabel, LangTeller, LangWatermerk, Ondertitel } from './LangHud';
import timing from './saladin-timing.json';
import {
  AL_ADIL,
  BOUDEWIJN,
  Citaat,
  FILIPS,
  InHal,
  InTent,
  Kaart,
  KaartEuropa,
  KALIEF,
  ks,
  HOVELING,
  MiniRidder,
  MiniSal,
  MiniSchip,
  NUR,
  Portret,
  RICHARD,
  RIDDER,
  SALADIN,
  SALADIN_HOF,
  SARACEEN,
  SHIRKUH,
  Slagveld,
  S_1099,
  S_Akko,
  S_Arsuf,
  S_Balian,
  S_Bed,
  S_Boogschutters,
  S_Brand,
  S_Bres,
  S_Citadel,
  S_Colonne,
  S_Damascus,
  S_Dante,
  S_Donker,
  S_Eed,
  S_Egypte,
  S_Fort,
  S_Geven,
  S_Graf,
  S_GrootLeger,
  S_Heuvels,
  S_Hoorns,
  S_Kameel,
  S_Karavaan,
  S_Kerak,
  S_Kerk,
  S_Ketens,
  S_Koning,
  S_Koorts,
  S_Lening,
  S_Lezen,
  S_Losgeld,
  S_Moe,
  S_Naam,
  S_Onderhandeling,
  S_Onwillig,
  S_PaardDood,
  S_Paarden,
  S_Paus,
  S_Pelgrims,
  S_Poort,
  S_Ridder,
  S_Rivier,
  S_Rouw,
  S_Ruzie,
  S_Schatkist,
  S_Slot,
  S_Sprong,
  S_TentHattin,
  S_Terugkeer,
  S_TerugDamascus,
  S_TweeKampen,
  S_Uitkijk,
  S_Vrijlaten,
  S_Water,
  S_Ziek,
  S_Afvaart,
  T0_Knal,
  T5_Titel,
  YUSUF,
} from './SaladinScenes';
import { Leger } from '../watals/Decor';

/**
 * "Saladin" — lange YouTube-video #02 (16:9, ~10:30), stem Dylan, één shot per zin.
 * Script: marketing/youtube/te-posten/02-saladin/werk/hoofdstukken.txt.
 */

type Zin = { hoofdstuk: string; zin: string; start: number; eind: number };
const ZINNEN = timing as Zin[];
type ShotDef = { zin: number; na?: number; C: () => React.ReactElement; sfeer?: string; vol?: number; accent?: { bij: number; src: string; vol: number }[] };

const pl = (s: keyof typeof STAD): [number, number] => [STAD[s][0], STAD[s][1]];
const GOUD = '#C99A2E';
const ROOD = '#B3412F';
const GROEN = '#5E8A5A';
const PAARS = '#7A5EA0';
const VER = { lon: 38, lat: 31.5, h: 24, a: 13 };
const KUST = { lon: 35.6, lat: 32.3, h: 11, a: 9, dx: 2 };

const SHOTS: ShotDef[] = [
  // ---------- teaser ----------
  { zin: 0, C: T0_Knal, accent: [{ bij: 0, src: 'inslag', vol: 0.4 }, { bij: 0.07, src: 'inslag', vol: 0.28 }, { bij: 0.15, src: 'glans', vol: 0.16 }] },
  { zin: 1, C: S_Onwillig, sfeer: 'wind', vol: 0.08 },
  { zin: 2, C: () => <S_Brand teaser />, sfeer: 'vuur', vol: 0.16, accent: [{ bij: 0.3, src: 'inslag', vol: 0.16 }] },
  { zin: 3, C: () => <S_Poort uit />, sfeer: 'menigte', vol: 0.08 },
  { zin: 4, C: () => <S_Schatkist />, accent: [{ bij: 1.0, src: 'munt', vol: 0.3 }] },
  { zin: 5, C: T5_Titel, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.05, src: 'inslag', vol: 0.26 }, { bij: 0.4, src: 'glans', vol: 0.16 }] },
  // ---------- A boy from Tikrit ----------
  { zin: 6, C: S_Naam, sfeer: 'wind', vol: 0.05 },
  { zin: 7, C: () => <Kaart van={MO_1137} cam={[VER, ks('tikrit', 7, 6)]} spelden={[['tikrit', GOUD]]} over={<JaarLabel jaar="c. 1137" sub="Tikrit, modern Iraq" />} />, accent: [{ bij: 4, src: 'tik', vol: 0.28 }] },
  { zin: 8, C: () => <S_Fort />, sfeer: 'rivier', vol: 0.08 },
  { zin: 9, C: () => <S_Fort nacht />, sfeer: 'wind', vol: 0.1 },
  { zin: 10, C: S_Ruzie, sfeer: 'vuur', vol: 0.05 },
  { zin: 11, C: () => <Kaart van={{}} naar={MO_1137} cam={[ks('tikrit', 10, 9), ks('aleppo', 9, 8)]} spelden={[['aleppo', GROEN], ['damascus', GROEN]]} route={[pl('tikrit'), pl('mosul'), pl('aleppo')]} kop={<MiniSal />} over={<LangTeller label="New masters" waarde="Zengi" pil="then Nur ad-Din" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.26 }] },
  { zin: 12, C: S_Damascus, sfeer: 'menigte', vol: 0.08 },
  { zin: 13, C: () => <S_Lezen />, sfeer: 'vuur', vol: 0.04 },
  { zin: 14, C: () => <Kaart van={{}} naar={MO_1137} wissel={[5, 50]} cam={[ks('damascus', 14, 10), VER]} over={<LangTeller label="The Middle East" waarde="Divided" />} /> },
  { zin: 15, C: () => <S_1099 />, sfeer: 'vuur', vol: 0.12, accent: [{ bij: 0.3, src: 'inslag', vol: 0.14 }] },
  { zin: 16, C: () => <Kaart van={MO_1137} cam={[VER, KUST]} licht={['Israel', 'Lebanon', 'Palestine']} over={<LangTeller label="Crusader states" waarde="4" pil="along the coast" />} />, accent: [{ bij: 0.4, src: 'tik', vol: 0.26 }] },
  { zin: 17, C: () => <Kaart van={MO_1137} cam={[{ lon: 38, lat: 31.8, h: 22, a: 11 }, { lon: 38, lat: 32, h: 20, a: 10 }]} spelden={[['baghdad', GROEN], ['cairo', PAARS]]} licht={['Iraq', 'Egypt']} over={<LangTeller label="Two caliphs" waarde="Baghdad · Cairo" pil="Sunni vs Shia" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.22 }, { bij: 1.2, src: 'tik', vol: 0.22 }] },
  { zin: 18, C: S_Uitkijk, sfeer: 'wind', vol: 0.06 },
  // ---------- Master of Egypt ----------
  { zin: 19, C: S_Egypte, sfeer: 'rivier', vol: 0.06, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 20, C: () => <Kaart van={MO_1137} cam={[VER, { lon: 33.5, lat: 31, h: 16, a: 9 }]} route={[pl('jerusalem'), [33.5, 30.8], pl('cairo')]} kop={<MiniRidder />} spelden={[['cairo', PAARS]]} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.22 }] },
  { zin: 21, C: () => <Kaart van={MO_1137} cam={[ks('damascus', 14, 10), { lon: 33.6, lat: 31.5, h: 15, a: 9 }]} route={[pl('damascus'), [35.6, 30.4], [33.4, 30.2], pl('cairo')]} kop={<MiniSal />} over={<LangTeller label="Campaigns to Egypt" waarde="3" pil="1164 · 1167 · 1168" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.22 }] },
  { zin: 22, C: S_Onwillig, sfeer: 'wind', vol: 0.1 },
  { zin: 23, C: () => <InHal over={<JaarLabel jaar="1169" sub="Cairo" />}><Figuur kleding={SHIRKUH} hoofddeksel="tulband" baard position={[0, 0.6, -4.4]} pose={ARMEN_GEKRUIST} />{[-1.8, 1.8].map((x) => <Figuur key={x} kleding={HOVELING} hoofddeksel="tulband" position={[x, 0, -1]} rotation={[0.35, x > 0 ? -0.6 : 0.6, 0]} />)}</InHal>, sfeer: 'menigte', vol: 0.04 },
  { zin: 24, C: () => <S_Bed wie={<Figuur kleding={SHIRKUH} hoofddeksel="tulband" baard pose={{ ogen: 'dicht' }} />} teller={['Vizier for', '2 months']} donker={1} />, accent: [{ bij: 2, src: 'val', vol: 0.12 }] },
  { zin: 25, C: () => <InHal><Figuur kleding={KALIEF} hoofddeksel="tulband" position={[0, 0.6, -4.4]} pose={{ armR: wijs(1.2) }} /><Figuur {...{ kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true }} position={[0.6, 0, -1.2]} rotation={[0, Math.PI - 0.3, 0]} />{[-2, 2.2].map((x) => <Figuur key={x} kleding={HOVELING} hoofddeksel="tulband" position={[x, 0, -0.4]} rotation={[0, x > 0 ? -1.2 : 1.2, 0]} pose={{ mond: 'open' }} />)}</InHal>, accent: [{ bij: 0.5, src: 'glans', vol: 0.12 }] },
  { zin: 26, C: () => <Portret wie={<Figuur kleding={SALADIN_HOF} hoofddeksel="tulband" baard position={[0, 0, 0.4]} rotation={[0, 0.3, 0]} />} over={<LangTeller label="Age" waarde="~31" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 27, C: () => <InHal kijk={[0, 1.8, 0]}>{[-1.2, 0, 1.2].map((x, i) => <Figuur key={x} kleding={HOVELING} hoofddeksel="tulband" baard={i === 1} position={[x, 0, 0]} rotation={[0, -x * 0.6, 0]} pose={{ mond: 'lach' }} />)}</InHal> },
  { zin: 28, C: () => <InHal kijk={[0, 2.5, -1.2]} van={[0.6, 2.6, 4.2]} naar={[0.3, 2.6, 3.2]}><Figuur kleding={SALADIN_HOF} hoofddeksel="tulband" baard position={[0, 0, -1.2]} pose={{ wenk: 0.9 }} /></InHal>, accent: [{ bij: 0.2, src: 'inslag', vol: 0.2 }] },
  { zin: 29, C: () => <Slagveld cam={[6, 3, 12, 4, 2.6, 9]}><Leger rijen={3} kolommen={6} kleur="#2A2A2E" schild="#5A3E86" position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} /><Leger rijen={3} kolommen={6} kleur="#E2D6BC" schild={GOUD} position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /><Figuur kleding={SALADIN} hoofddeksel="tulband" baard position={[2.6, 0, 2]} rotation={[0, -0.8, 0]} pose={{ armR: omhoog() }} /></Slagveld>, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.6, src: 'inslag', vol: 0.14 }] },
  { zin: 30, C: () => <Kaart van={MO_1137} naar={MO_1171} wissel={[60, 140]} cam={[ks('cairo', 9, 7), ks('cairo', 12, 9)]} spelden={[['cairo', GOUD], ['baghdad', GROEN]]} over={<JaarLabel jaar="1171" sub="Egypt" />} />, accent: [{ bij: 2.0, src: 'glans', vol: 0.14 }] },
  { zin: 31, C: () => <Kaart van={MO_1137} naar={MO_1171} wissel={[0, 40]} cam={[ks('cairo', 12, 9), ks('cairo', 9, 7)]} licht={['Egypt']} over={<LangTeller label="Fatimid rule" waarde="200 years" pil="ended without a battle" />} /> },
  { zin: 32, C: () => <S_Citadel />, sfeer: 'wind', vol: 0.06 },
  { zin: 33, C: () => <S_Citadel af />, sfeer: 'wind', vol: 0.05 },
  { zin: 34, C: () => <Kaart van={MO_1171} cam={[VER, { lon: 35, lat: 32, h: 18, a: 10 }]} spelden={[['cairo', GOUD], ['damascus', GROEN]]} route={[pl('damascus'), pl('cairo')]} routeTijd={[0, 60]} over={<LangTeller label="On paper" waarde="A servant" pil="of Nur ad-Din" />} /> },
  { zin: 35, C: () => <InHal><Figuur kleding={NUR} haar="grijs" hoofddeksel="tulband" baard position={[0, 0.6, -4.4]} pose={{ wenk: 0.8, armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.4] } }} inHand={<group />} /></InHal> },
  // ---------- A leper king ----------
  { zin: 36, C: () => <S_Bed wie={<Figuur kleding={NUR} haar="grijs" hoofddeksel="tulband" baard pose={{ ogen: 'dicht' }} />} jaar="1174" sub="Nur ad-Din dies" teller={['His heir', 'Age 11']} bij={<Figuur kleding={YUSUF} hoofddeksel="tulband" position={[-1.2, 0, 1.0]} rotation={[0, 0.7, 0]} scale={0.6} pose={{ wenk: -0.8 }} />} />, accent: [{ bij: 2.5, src: 'val', vol: 0.1 }] },
  { zin: 37, C: () => <S_Poort ruiter jaar="1174" sub="Damascus" />, sfeer: 'menigte', vol: 0.12 },
  { zin: 38, C: () => <Kaart van={MO_1171} naar={MO_1186} wissel={[30, 200]} cam={[VER, { lon: 39, lat: 33.5, h: 20, a: 10 }]} spelden={[['damascus', GOUD], ['aleppo', GOUD], ['mosul', GOUD]]} over={<JaarLabel jaar="1174–1186" sub="twelve years" />} />, accent: [{ bij: 1, src: 'tik', vol: 0.2 }, { bij: 3, src: 'tik', vol: 0.2 }] },
  { zin: 39, C: () => <Slagveld cam={[0, 4, 14, 0, 3, 11]}><Leger rijen={3} kolommen={7} kleur="#E2D6BC" schild={GOUD} position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} /><Leger rijen={3} kolommen={7} kleur="#C8D2C0" schild={GROEN} position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /></Slagveld>, sfeer: 'wind', vol: 0.08 },
  { zin: 40, C: () => <Portret wie={<Figuur {...{ kleding: SALADIN, hoofddeksel: 'tulband' as const, baard: true }} position={[0, 0, 0.4]} rotation={[0, -0.2, 0]} pose={{ hoofd: [0.2, 0.3, 0], wenk: -0.3 }} />} /> },
  { zin: 41, C: () => <Kaart van={MO_1186} cam={[{ lon: 38, lat: 32, h: 26, a: 6 }, KUST]} camDuur={200} licht={['Israel', 'Lebanon', 'Palestine']} over={<LangTeller label="Crusader states" waarde="Surrounded" />} />, accent: [{ bij: 1, src: 'tik', vol: 0.2 }] },
  { zin: 42, C: () => <Portret avond wie={<Figuur {...{ kleding: SALADIN, hoofddeksel: 'tulband' as const, baard: true }} position={[0, 0, 0.4]} pose={{ ...ARMEN_GEKRUIST, wenk: -0.4 }} />} />, sfeer: 'wind', vol: 0.08 },
  { zin: 43, C: () => <Kaart van={MO_1186} cam={[ks('cairo', 12, 9), ks('ramla', 8, 7)]} route={[pl('cairo'), [33.8, 31.1], pl('ramla')]} kop={<MiniSal />} spelden={[['ramla', ROOD]]} over={<JaarLabel jaar="1177" sub="invasion" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 44, C: () => <Portret wie={<group position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} scale={0.88}><Figuur kleding={BOUDEWIJN} /><Kroon position={[0, 2.56, 0]} /></group>} over={<LangTeller label="Baldwin IV" waarde="Age 16" pil="king with leprosy" />} />, accent: [{ bij: 0.3, src: 'glans', vol: 0.12 }] },
  { zin: 45, C: () => <Slagveld groen over={<JaarLabel jaar="1177" sub="Montgisard" />} cam={[10, 4, 14, 6, 3, 10]}><Leger rijen={3} kolommen={8} kleur="#E2D6BC" schild={GOUD} position={[6, 0, -2]} rotation={[0, -Math.PI / 2, 0]} /><Leger rijen={2} kolommen={6} kleur="#ECE6D8" schild="#8D8A84" position={[-8, 0, 0]} rotation={[0, Math.PI / 2, 0]} /></Slagveld>, sfeer: 'menigte', vol: 0.14, accent: [{ bij: 0.5, src: 'inslag', vol: 0.18 }] },
  { zin: 46, C: S_Kameel, sfeer: 'wind', vol: 0.14 },
  { zin: 47, C: () => <Slagveld cam={[6, 3, 12, 4, 2.6, 10]} over={<LangTeller label="Rebuilding" waarde="Years" />}><Leger rijen={4} kolommen={8} kleur="#E2D6BC" schild={GOUD} position={[0, 0, -3]} /><Figuur {...{ kleding: SALADIN, hoofddeksel: 'tulband' as const, baard: true }} position={[3, 0, 2]} rotation={[0, -0.6, 0]} pose={{ armR: wijs(1.1) }} /></Slagveld>, sfeer: 'wind', vol: 0.06 },
  { zin: 48, C: () => <InTent nacht><Figuur {...{ kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true }} position={[0, 0, 0]} pose={ARMEN_GEKRUIST} /></InTent>, sfeer: 'vuur', vol: 0.04 },
  // ---------- Thirst at Hattin ----------
  { zin: 49, C: S_Kerak, sfeer: 'wind', vol: 0.06 },
  { zin: 50, C: () => <Kaart van={MO_1186} cam={[{ lon: 36.5, lat: 30, h: 18, a: 10 }, { lon: 36.5, lat: 27, h: 20, a: 10 }]} route={[[35.7, 31.18], [35.0, 29.5], [36.6, 26.5], [38.2, 24]]} kop={<MiniSchip />} spelden={[['jerusalem', ROOD]]} over={<LangTeller label="Reynald's raids" waarde="Red Sea" pil="towards Mecca and Medina" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 51, C: () => <S_Karavaan aanval />, sfeer: 'wind', vol: 0.12, accent: [{ bij: 1.2, src: 'inslag', vol: 0.14 }] },
  { zin: 52, C: S_Eed, sfeer: 'vuur', vol: 0.14, accent: [{ bij: 0.3, src: 'inslag', vol: 0.2 }] },
  { zin: 53, C: S_GrootLeger, sfeer: 'menigte', vol: 0.12 },
  { zin: 54, C: () => <Kaart van={MO_1186} cam={[KUST, ks('tiberias', 6, 5, 1)]} spelden={[['tiberias', ROOD]]} route={[pl('damascus'), pl('tiberias')]} kop={<MiniSal />} over={<JaarLabel jaar="July 1187" sub="Tiberias" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 55, C: () => <S_Colonne />, sfeer: 'wind', vol: 0.12 },
  { zin: 56, C: S_Water, sfeer: 'wind', vol: 0.1 },
  { zin: 57, C: S_Boogschutters, sfeer: 'menigte', vol: 0.12 },
  { zin: 58, C: () => <S_Brand />, sfeer: 'vuur', vol: 0.2 },
  { zin: 59, C: S_Hoorns, sfeer: 'menigte', vol: 0.14, accent: [{ bij: 3.2, src: 'val', vol: 0.18 }] },
  { zin: 60, C: () => <S_TentHattin fase="binnen" />, sfeer: 'vuur', vol: 0.04 },
  { zin: 61, C: () => <S_TentHattin fase="beker" />, accent: [{ bij: 1, src: 'glans', vol: 0.12 }] },
  { zin: 62, C: () => <S_TentHattin fase="door" /> },
  { zin: 63, C: () => <S_TentHattin fase="wijs" />, accent: [{ bij: 0.4, src: 'tik', vol: 0.22 }] },
  { zin: 64, C: () => <S_TentHattin fase="door" over={<LangTeller label="Custom" waarde="A drink" pil="means protection" />} /> },
  { zin: 65, C: () => <S_TentHattin fase="kijk" />, accent: [{ bij: 0.6, src: 'inslag', vol: 0.24 }] },
  { zin: 66, C: () => <S_TentHattin fase="kalm" over={<Citaat tekst="Kings do not kill kings." wie="Saladin to King Guy" />} />, accent: [{ bij: 0.3, src: 'glans', vol: 0.14 }] },
  // ---------- Jerusalem ----------
  { zin: 67, C: () => <Kaart van={MO_1186} naar={MO_1187} wissel={[20, 120]} cam={[VER, KUST]} over={<JaarLabel jaar="1187" sub="after Hattin" />} />, accent: [{ bij: 1, src: 'tik', vol: 0.2 }, { bij: 2.4, src: 'tik', vol: 0.2 }] },
  { zin: 68, C: () => <S_Poort />, sfeer: 'wind', vol: 0.06 },
  { zin: 69, C: () => <Kaart van={MO_1187} cam={[KUST, ks('jerusalem', 6, 5, 1)]} spelden={[['jerusalem', ROOD]]} route={[pl('tiberias'), pl('jerusalem')]} kop={<MiniSal />} over={<JaarLabel jaar="September 1187" sub="Jerusalem" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 70, C: () => <S_Balian />, sfeer: 'wind', vol: 0.08 },
  { zin: 71, C: () => <S_Balian ridders />, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.8, src: 'tik', vol: 0.2 }] },
  { zin: 72, C: S_Bres, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.2, src: 'inslag', vol: 0.18 }] },
  { zin: 73, C: () => <InTent><Figuur {...{ kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true }} position={[1.3, 0, -0.3]} rotation={[0, -0.9, 0]} pose={ARMEN_GEKRUIST} /><Figuur kleding={{ ...RIDDER, tuniek: '#3E6A9A' }} position={[-0.6, 0, 0.3]} rotation={[0, 0.8, 0]} pose={{ armR: wijs(1.3), wenk: 0.9, mond: 'open' }} /></InTent> },
  { zin: 74, C: () => <InTent><Figuur {...{ kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true }} position={[1.3, 0, -0.3]} rotation={[0, -0.9, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.4], elleboog: [0, 0] } }} /><Figuur kleding={{ ...RIDDER, tuniek: '#3E6A9A' }} position={[-0.6, 0, 0.3]} rotation={[0, 0.8, 0]} pose={{ hoofd: [0.3, 0, 0] }} /></InTent>, accent: [{ bij: 0.5, src: 'glans', vol: 0.12 }] },
  { zin: 75, C: S_Losgeld, accent: [{ bij: 0.6, src: 'munt', vol: 0.26 }] },
  { zin: 76, C: () => <S_Poort ruiter jaar="2 October 1187" sub="Jerusalem" />, sfeer: 'menigte', vol: 0.14, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 77, C: () => <S_1099 terug />, sfeer: 'vuur', vol: 0.1 },
  { zin: 78, C: () => <S_Poort uit over={<LangTeller label="Massacre" waarde="None" />} />, sfeer: 'menigte', vol: 0.06 },
  { zin: 79, C: S_Ketens, sfeer: 'wind', vol: 0.06 },
  { zin: 80, C: () => <S_Vrijlaten />, sfeer: 'wind', vol: 0.06 },
  { zin: 81, C: () => <S_Vrijlaten broer />, sfeer: 'wind', vol: 0.06 },
  { zin: 82, C: () => <S_Vrijlaten ouden />, sfeer: 'wind', vol: 0.06 },
  { zin: 83, C: S_Kerk, sfeer: 'menigte', vol: 0.06 },
  { zin: 84, C: S_Terugkeer, sfeer: 'menigte', vol: 0.06 },
  { zin: 85, C: () => <S_Lezen oud />, sfeer: 'vuur', vol: 0.04 },
  // ---------- The Lionheart ----------
  { zin: 86, C: () => <KaartEuropa over={<LangTeller label="News" waarde="Jerusalem has fallen" />} />, accent: [{ bij: 0.4, src: 'inslag', vol: 0.16 }] },
  { zin: 87, C: S_Paus, sfeer: 'menigte', vol: 0.14 },
  { zin: 88, C: S_Rivier, sfeer: 'rivier', vol: 0.14 },
  { zin: 89, C: () => <S_Koning k={FILIPS} label="King of France" waarde="Philip II" vlag="#2F4F9E" />, sfeer: 'zee', vol: 0.1 },
  { zin: 90, C: () => <S_Koning k={RICHARD} label="King of England" waarde="Richard I" pil="the Lionheart" vlag="#A8322B" />, sfeer: 'zee', vol: 0.1, accent: [{ bij: 2.5, src: 'glans', vol: 0.16 }] },
  { zin: 91, C: () => <Kaart van={MO_1187} cam={[{ lon: 33, lat: 33, h: 14, a: 9 }, ks('acre', 6, 5, 1)]} route={[[29, 33.6], [32, 33.3], pl('acre')]} kop={<MiniSchip />} spelden={[['acre', ROOD]]} over={<JaarLabel jaar="1189–1191" sub="Acre" />} />, sfeer: 'zee', vol: 0.05 },
  { zin: 92, C: () => <S_Akko over={<LangTeller label="Siege of Acre" waarde="2 years" />} />, sfeer: 'vuur', vol: 0.12 },
  { zin: 93, C: () => <S_Akko overgave over={<JaarLabel jaar="July 1191" sub="Acre surrenders" />} />, sfeer: 'menigte', vol: 0.1 },
  { zin: 94, C: () => <S_Onderhandeling over={<LangTeller label="Prisoner talks" waarde="Weeks" />} /> },
  { zin: 95, C: () => <S_Donker wie="richard" over={<><JaarLabel jaar="August 1191" sub="Acre" /><LangTeller label="Prisoners killed" waarde="~2,700" /></>} />, sfeer: 'wind', vol: 0.1 },
  { zin: 96, C: () => <S_Donker wie="saladin" />, sfeer: 'wind', vol: 0.08 },
  { zin: 97, C: S_Arsuf, sfeer: 'menigte', vol: 0.14, accent: [{ bij: 0.6, src: 'inslag', vol: 0.16 }] },
  { zin: 98, C: () => <S_Heuvels />, sfeer: 'wind', vol: 0.1 },
  { zin: 99, C: () => <S_Heuvels terug />, sfeer: 'wind', vol: 0.1 },
  { zin: 100, C: () => <Kaart van={MO_1187} cam={[KUST, ks('jaffa', 8, 7)]} route={[pl('jaffa'), pl('ramla'), [35.05, 31.8], pl('ramla'), pl('jaffa'), [33.5, 32.4]]} routeTijd={[5, 160]} kop={<MiniRidder />} spelden={[['jerusalem', GOUD], ['jaffa', ROOD]]} over={<LangTeller label="Take Jerusalem?" waarde="Can't hold it" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.22 }] },
  // ---------- A gift of horses ----------
  { zin: 101, C: () => <S_TweeKampen over={<LangTeller label="Met in person" waarde="Never" />} />, sfeer: 'wind', vol: 0.06 },
  { zin: 102, C: () => <S_TweeKampen bode />, sfeer: 'wind', vol: 0.06 },
  { zin: 103, C: () => <Kaart van={MO_1187} cam={[KUST, ks('jaffa', 6, 5, 1)]} spelden={[['jaffa', ROOD]]} route={[pl('jerusalem'), pl('ramla'), pl('jaffa')]} kop={<MiniSal />} over={<JaarLabel jaar="1192" sub="Jaffa" />} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 104, C: S_Sprong, sfeer: 'zee', vol: 0.16, accent: [{ bij: 1.6, src: 'inslag', vol: 0.14 }] },
  { zin: 105, C: S_PaardDood, sfeer: 'vuur', vol: 0.1, accent: [{ bij: 0.3, src: 'val', vol: 0.16 }] },
  { zin: 106, C: S_Paarden, sfeer: 'wind', vol: 0.06, accent: [{ bij: 2.2, src: 'glans', vol: 0.14 }] },
  { zin: 107, C: S_Koorts, sfeer: 'vuur', vol: 0.03 },
  { zin: 108, C: S_Ziek, sfeer: 'wind', vol: 0.1 },
  { zin: 109, C: S_Moe, sfeer: 'wind', vol: 0.06 },
  { zin: 110, C: () => <S_Onderhandeling verdrag over={<JaarLabel jaar="2 September 1192" sub="Treaty of Jaffa" />} />, accent: [{ bij: 1.5, src: 'glans', vol: 0.14 }] },
  { zin: 111, C: () => <Kaart van={MO_1187} naar={MO_1192} wissel={[10, 80]} cam={[VER, KUST]} spelden={[['jaffa', ROOD], ['tyre', ROOD]]} over={<LangTeller label="Crusaders keep" waarde="A strip of coast" pil="Tyre to Jaffa" />} /> },
  { zin: 112, C: S_Pelgrims, sfeer: 'menigte', vol: 0.06 },
  { zin: 113, C: () => <S_Afvaart />, sfeer: 'zee', vol: 0.14 },
  { zin: 114, C: () => <S_Afvaart achterom />, sfeer: 'zee', vol: 0.12 },
  // ---------- One gold coin ----------
  { zin: 115, C: S_TerugDamascus, sfeer: 'wind', vol: 0.08 },
  { zin: 116, C: () => <S_Bed wie={<Figuur {...{ kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true }} pose={{ ogen: 'dicht', wenk: -0.4 }} />} jaar="February 1193" sub="Damascus" bij={<Figuur kleding={AL_ADIL} hoofddeksel="tulband" baard position={[-1.4, 0, 1.0]} rotation={[0, 0.6, 0]} pose={{ wenk: -0.7 }} />} />, sfeer: 'vuur', vol: 0.03 },
  { zin: 117, C: () => <S_Bed wie={<Figuur {...{ kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true }} pose={{ ogen: 'dicht' }} />} jaar="4 March 1193" teller={['Age', '~55']} donker={1} />, accent: [{ bij: 2.4, src: 'val', vol: 0.12 }] },
  { zin: 118, C: S_Rouw, sfeer: 'wind', vol: 0.08 },
  { zin: 119, C: S_Geven, sfeer: 'menigte', vol: 0.05, accent: [{ bij: 0.6, src: 'munt', vol: 0.22 }, { bij: 2.0, src: 'munt', vol: 0.2 }] },
  { zin: 120, C: () => <S_Schatkist />, accent: [{ bij: 1.2, src: 'munt', vol: 0.3 }, { bij: 2.6, src: 'munt', vol: 0.2 }] },
  { zin: 121, C: () => <S_Schatkist leeg />, accent: [{ bij: 1.0, src: 'val', vol: 0.12 }] },
  { zin: 122, C: S_Lening, sfeer: 'vuur', vol: 0.03, accent: [{ bij: 0.4, src: 'munt', vol: 0.2 }] },
  { zin: 123, C: () => <Kaart van={MO_1192} naar={MO_1193} wissel={[20, 110]} cam={[KUST, VER]} over={<LangTeller label="His empire" waarde="Divided" pil="among sons and brothers" />} />, accent: [{ bij: 1, src: 'val', vol: 0.12 }] },
  { zin: 124, C: () => <KaartEuropa over={<LangTeller label="His fame" waarde="Grew in Europe" />} /> },
  { zin: 125, C: S_Ridder, sfeer: 'wind', vol: 0.04, accent: [{ bij: 0.2, src: 'glans', vol: 0.16 }] },
  { zin: 126, C: S_Dante, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 127, C: () => <S_Graf fase="tuin" />, sfeer: 'wind', vol: 0.05 },
  { zin: 128, C: () => <S_Graf fase="marmer" />, sfeer: 'wind', vol: 0.04 },
  { zin: 129, C: () => <S_Graf fase="hout" />, sfeer: 'wind', vol: 0.04, accent: [{ bij: 0.4, src: 'glans', vol: 0.12 }] },
  // ---------- outro ----------
  { zin: 130, C: S_Slot, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];
void SARACEEN;

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const SALADIN_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[130].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, 130).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
};

/* ---------- muziek per hoofdstuk (ElevenLabs Music v2.5, genormaliseerd op -18 LUFS) ---------- */
const HOOFDSTUK_START = (() => {
  const uit: number[] = [];
  let vorige = '';
  for (const z of ZINNEN) if (z.hoofdstuk !== vorige) { vorige = z.hoofdstuk; uit.push(z.start); }
  return uit;
})();
/** Welk muziekbestand per hoofdstuk (een ontbrekend stuk wordt vervangen door een verwant hoofdstuk). */
export const MUZIEK_BRON = [0, 1, 2, 3, 4, 5, 6, 7, 1, 9];
const MUZIEK = HOOFDSTUK_START.map((st, i) => {
  const van = i === 0 ? 0 : st - 0.6;
  const tot = i < HOOFDSTUK_START.length - 1 ? HOOFDSTUK_START[i + 1] - 0.6 + 1.5 : EIND;
  return { i, van, tot, vol: i === 0 ? 0.42 : 0.2 };
});
const Muziek = () => (
  <>
    {MUZIEK.map((m) => {
      const lengte = Math.round((m.tot - m.van) * FPS);
      return (
        <Sequence key={`m${m.i}`} from={Math.round(m.van * FPS)} durationInFrames={lengte}>
          <Audio
            src={staticFile(`lokaal/saladin-muziek/h${MUZIEK_BRON[m.i]}.mp3`)}
            volume={(fr) => interpolate(fr, [0, m.i === 0 ? 1 : 36, lengte - 45, lengte], [m.i === 0 ? m.vol : 0, m.vol, m.vol, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        </Sequence>
      );
    })}
  </>
);

export const SaladinLang = ({ muziek = true }: { muziek?: boolean }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SHOTS.map((s, i) => {
      const van = Math.round(STARTS[i] * FPS);
      const tot = Math.round((i < SHOTS.length - 1 ? STARTS[i + 1] : EIND) * FPS);
      const duur = tot - van;
      return (
        <Sequence key={i} from={van} durationInFrames={duur}>
          <s.C />
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
    <Audio src={staticFile('lokaal/saladin-lang-voice.mp3')} volume={1.25} />
  </AbsoluteFill>
);
