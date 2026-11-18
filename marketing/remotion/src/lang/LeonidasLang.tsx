import type React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from './basis';
import timing from './leonidas-timing.json';
import { LangAfsluiter } from './LangDecor';
import { JaarLabel, LangTeller, LangWatermerk, Ondertitel } from './LangHud';
import { KaartG, Pijllabel, Regelbord, G_GRIEKENLAND } from './LeonidasKit';
import { S_DorieusKaart, S_GorgoNee, S_MoederClose, S_OntbijtClose, S_PersRoute, S_Slapen, S_SoepClose, S_TeaserBaby, S_Thespier, S_VaderClose } from './LeonidasScenes3';
import { LeonidasOmslag } from './CaesarOmslag';
import { G_SPARTA } from './KaarttafelGriek';
import {
  HoofdstukKaart,
  S_Afscheid,
  S_Agoge,
  S_Broers,
  S_Eforen,
  S_Keuring,
  S_KroonValt,
  S_TeaserKaart,
  S_Trap,
  S_TweeKoningen,
  S_Weg,
  S_Wieg,
  T0_Knal,
  T5_Titel,
} from './LeonidasScenes';
import {
  S_Beeld,
  S_Boodschap,
  S_Close,
  S_Darius,
  S_Delphi,
  S_Dienekes,
  S_Dorieus,
  S_Ephialtes,
  S_Feest,
  S_Film,
  S_Gedenk,
  S_Getal,
  S_Gorgo,
  S_Grieken,
  S_Hellespont,
  S_Helm,
  S_Heuvel,
  S_InvalKaart,
  S_Kroon,
  S_Leger,
  S_Mars,
  S_Nachtpad,
  S_Onsterfelijken,
  S_Ontbijt,
  S_Pas,
  S_PerzieKaart,
  S_Pijlen,
  S_Plataea,
  S_Potjes,
  S_Put,
  S_RouteKaart,
  S_Ruiter,
  S_Salamis,
  S_Slag,
  S_Slot,
  S_Smeden,
  S_Speer,
  S_Stoet,
  S_Troon,
  S_Uitkijk,
  S_XerxesBoek,
  S_XerxesLach,
  S_XerxesSpring,
  S_Zonen,
} from './LeonidasScenes2';

/**
 * "What if you were Leonidas?" — lange YouTube-video #04 (16:9, ~9:00), stem Dylan, één shot per zin, "you"-vorm.
 * Script en scratchboard: marketing/1.videos/1.te-posten/04-leonidas/werk/. Zolang de stem er niet is, staat de
 * timing op een schatting (leonidas-timing.json, ~2,35 woorden/s); `vo-hoofdstukken.mjs` vervangt hem.
 * Muziek: hergebruik van de Caesar-stukken, geen nieuwe credits.
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
  { zin: 1, C: () => <S_Weg teaser />, sfeer: 'wind', vol: 0.08 },
  { zin: 2, C: S_KroonValt, accent: [{ bij: 0.75, src: 'tik', vol: 0.3 }, { bij: 0.9, src: 'glans', vol: 0.16 }] },
  { zin: 3, C: S_TeaserKaart, accent: [{ bij: 0.3, src: 'tik', vol: 0.24 }] },
  { zin: 4, C: S_Afscheid, sfeer: 'wind', vol: 0.1 },
  { zin: 5, C: S_TeaserBaby, accent: [{ bij: 1.5, src: 'glans', vol: 0.12 }] },
  { zin: 5, na: 3.6, C: T5_Titel, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.05, src: 'inslag', vol: 0.26 }, { bij: 0.4, src: 'glans', vol: 0.16 }] },
  // ---------- I · Born in Sparta ----------
  { zin: 6, C: S_Wieg, hoofdstuk: ['I', 'Born in Sparta'], sfeer: 'wind', vol: 0.03 },
  { zin: 7, C: S_TweeKoningen, accent: [{ bij: 1.7, src: 'tik', vol: 0.2 }, { bij: 1.9, src: 'tik', vol: 0.2 }] },
  { zin: 8, C: () => <S_Broers fase="eerste" />, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 9, C: S_Eforen, sfeer: 'menigte', vol: 0.05, over: <><Pijllabel tekst="the 5 ephors" x={1300} y={250} naar={[1240, 420]} vanaf={14} /><Pijllabel tekst="your father" x={420} y={330} naar={[410, 480]} vanaf={30} /></> },
  { zin: 9, na: 3.4, C: S_VaderClose, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 10, C: () => <S_Broers fase="cleomenes" />, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 11, C: () => <S_Broers fase="drie" />, accent: [{ bij: 1.1, src: 'val', vol: 0.16 }, { bij: 1.3, src: 'val', vol: 0.14 }] },
  { zin: 12, C: () => <S_Broers fase="jij" />, accent: [{ bij: 1.0, src: 'glans', vol: 0.12 }] },
  { zin: 13, C: S_Trap, over: <><Pijllabel tekst="Cleomenes" x={700} y={140} naar={[960, 120]} vanaf={10} /><Pijllabel tekst="Dorieus" x={1420} y={200} naar={[1180, 170]} vanaf={24} /><Pijllabel tekst="you" x={1220} y={560} naar={[990, 600]} vanaf={40} /></>, accent: [{ bij: 0.6, src: 'tik', vol: 0.18 }] },
  { zin: 14, C: () => <S_Keuring fase="test" />, sfeer: 'vuur', vol: 0.03 },
  { zin: 15, C: () => <S_Keuring fase="berg" />, sfeer: 'wind', vol: 0.12 },
  { zin: 16, C: () => <S_Keuring fase="geslaagd" />, accent: [{ bij: 0.2, src: 'inslag', vol: 0.26 }] },
  // ---------- II · The agoge ----------
  { zin: 17, C: () => <S_Weg jaar />, hoofdstuk: ['II', 'The agoge'], sfeer: 'wind', vol: 0.08 },
  { zin: 17, na: 3.0, C: S_MoederClose, sfeer: 'wind', vol: 0.06 },
  { zin: 18, C: () => <S_Agoge fase="kaal" />, sfeer: 'wind', vol: 0.14 },
  { zin: 19, C: () => <S_Agoge fase="riet" />, sfeer: 'rivier', vol: 0.12 },
  { zin: 19, na: 3.8, C: S_Slapen, sfeer: 'wind', vol: 0.08 },
  { zin: 20, C: () => <S_Agoge fase="eten" />, sfeer: 'vuur', vol: 0.03 },
  { zin: 21, C: () => <S_Agoge fase="straf" />, accent: [{ bij: 0.3, src: 'tik', vol: 0.22 }, { bij: 0.9, src: 'tik', vol: 0.22 }] },
  { zin: 22, C: () => <S_Agoge fase="straf" />, over: <Regelbord regels={[['Stealing', true], ['Getting caught', false]]} />, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }, { bij: 1.0, src: 'tik', vol: 0.24 }] },
  { zin: 23, C: () => <S_Agoge fase="vos" />, accent: [{ bij: 1.0, src: 'glans', vol: 0.12 }] },
  { zin: 24, C: () => <S_Agoge fase="vosweg" />, sfeer: 'wind', vol: 0.06 },
  { zin: 25, C: () => <S_Agoge fase="woorden" />, accent: [{ bij: 2.3, src: 'tik', vol: 0.24 }] },
  { zin: 26, C: () => <KaartG van={G_SPARTA} cam={[{ ...G_GRIEKENLAND, h: 9, a: 7 }, { ...G_GRIEKENLAND, lat: 37.4, h: 6, a: 5 }]} spelden={[['sparta', '#B3312B']]} over={<LangTeller label="Laconia" waarde="→ laconic" pil="saying a lot with very little" />} />, accent: [{ bij: 0.4, src: 'tik', vol: 0.22 }] },
  { zin: 27, C: () => <S_Agoge fase="soldaat" />, accent: [{ bij: 0.6, src: 'glans', vol: 0.16 }] },
  { zin: 28, C: () => <S_Agoge fase="huis" />, accent: [{ bij: 0.8, src: 'tik', vol: 0.2 }] },
  { zin: 29, C: () => <S_Agoge fase="soep" />, sfeer: 'menigte', vol: 0.06 },
  { zin: 29, na: 4.6, C: S_SoepClose, sfeer: 'menigte', vol: 0.05, accent: [{ bij: 1.0, src: 'tik', vol: 0.16 }] },
  // ---------- III · King by accident ----------
  { zin: 30, C: () => <S_Troon fase="koning" />, hoofdstuk: ['III', 'King by accident'], accent: [{ bij: 0.5, src: 'glans', vol: 0.14 }] },
  { zin: 31, C: S_Dorieus, sfeer: 'zee', vol: 0.12 },
  { zin: 31, na: 4.0, C: S_DorieusKaart, accent: [{ bij: 0.4, src: 'tik', vol: 0.2 }] },
  { zin: 32, C: () => <S_Troon fase="gek" />, sfeer: 'wind', vol: 0.06 },
  { zin: 33, C: () => <S_Troon fase="leeg" />, accent: [{ bij: 0.6, src: 'val', vol: 0.16 }] },
  { zin: 34, C: () => <S_Troon fase="gorgo" /> },
  { zin: 35, C: () => <S_Kroon fase="zakt" />, accent: [{ bij: 2.0, src: 'glans', vol: 0.18 }, { bij: 2.2, src: 'inslag', vol: 0.14 }] },
  { zin: 36, C: () => <S_Kroon fase="vijftig" />, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 37, C: () => <S_Gorgo fase="bruiloft" />, sfeer: 'menigte', vol: 0.06, over: <><Pijllabel tekst="Gorgo" x={640} y={280} naar={[820, 400]} vanaf={30} /><Pijllabel tekst="you" x={1280} y={300} naar={[1070, 400]} vanaf={44} /></> },
  { zin: 38, C: () => <S_Gorgo fase="raad" /> },
  { zin: 39, C: () => <S_Gorgo fase="omkoping" />, accent: [{ bij: 1.0, src: 'munt', vol: 0.2 }, { bij: 1.6, src: 'munt', vol: 0.18 }] },
  { zin: 39, na: 3.6, C: S_GorgoNee, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 40, C: () => <S_Gorgo fase="vrouwen" />, sfeer: 'wind', vol: 0.04 },
  { zin: 41, C: () => <S_Gorgo fase="antwoord" />, accent: [{ bij: 0.3, src: 'glans', vol: 0.16 }] },
  // ---------- IV · Earth and water ----------
  { zin: 42, C: S_PerzieKaart, hoofdstuk: ['IV', 'Earth and water'], accent: [{ bij: 0.6, src: 'tik', vol: 0.22 }] },
  { zin: 43, C: () => <S_Darius />, sfeer: 'vuur', vol: 0.04 },
  { zin: 44, C: S_Potjes, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 45, C: () => <S_Put fase="athene" />, accent: [{ bij: 0.5, src: 'val', vol: 0.16 }] },
  { zin: 46, C: () => <S_Put fase="sparta" />, accent: [{ bij: 0.7, src: 'val', vol: 0.18 }, { bij: 1.35, src: 'rivier', vol: 0.2 }] },
  { zin: 47, C: () => <S_Put fase="graaf" />, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 48, C: () => <S_Darius dood />, sfeer: 'wind', vol: 0.06 },
  { zin: 49, C: S_XerxesBoek, accent: [{ bij: 1.4, src: 'tik', vol: 0.2 }, { bij: 2.4, src: 'tik', vol: 0.2 }, { bij: 3.2, src: 'tik', vol: 0.22 }] },
  { zin: 50, C: S_Smeden, sfeer: 'vuur', vol: 0.12, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }, { bij: 1.6, src: 'tik', vol: 0.2 }, { bij: 2.6, src: 'tik', vol: 0.2 }] },
  { zin: 51, C: () => <S_Hellespont fase="bouw" />, sfeer: 'zee', vol: 0.12 },
  { zin: 52, C: () => <S_Hellespont fase="zweep" />, sfeer: 'zee', vol: 0.22, accent: [{ bij: 1.2, src: 'tik', vol: 0.22 }, { bij: 1.6, src: 'tik', vol: 0.22 }, { bij: 2.0, src: 'tik', vol: 0.22 }] },
  { zin: 53, C: () => <S_Hellespont fase="mars" />, sfeer: 'menigte', vol: 0.12 },
  { zin: 53, na: 3.6, C: S_PersRoute, sfeer: 'menigte', vol: 0.06 },
  // ---------- V · The oracle ----------
  { zin: 54, C: () => <S_Getal />, hoofdstuk: ['V', 'The oracle'], accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  { zin: 55, C: () => <S_Getal streep />, accent: [{ bij: 0.5, src: 'tik', vol: 0.24 }, { bij: 1.7, src: 'val', vol: 0.2 }] },
  { zin: 56, C: S_Leger, sfeer: 'menigte', vol: 0.16 },
  { zin: 57, C: () => <S_Delphi fase="tempel" />, sfeer: 'wind', vol: 0.08 },
  { zin: 58, C: () => <S_Delphi fase="orakel" />, sfeer: 'vuur', vol: 0.05, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  { zin: 59, C: () => <S_Close />, accent: [{ bij: 0.2, src: 'inslag', vol: 0.16 }] },
  { zin: 60, C: S_Feest, sfeer: 'menigte', vol: 0.16 },
  { zin: 61, C: S_Mars, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.5, src: 'glans', vol: 0.14 }] },
  { zin: 62, C: S_Zonen, sfeer: 'wind', vol: 0.06 },
  { zin: 63, C: S_RouteKaart, accent: [{ bij: 1.0, src: 'tik', vol: 0.2 }, { bij: 2.2, src: 'tik', vol: 0.2 }, { bij: 3.4, src: 'tik', vol: 0.2 }] },
  { zin: 64, C: S_Film, accent: [{ bij: 1.35, src: 'inslag', vol: 0.26 }] },
  // ---------- VI · The hot gates ----------
  { zin: 65, C: () => <S_Pas fase="boven" />, hoofdstuk: ['VI', 'The hot gates'], sfeer: 'wind', vol: 0.12 },
  { zin: 66, C: () => <S_Pas fase="weg" />, sfeer: 'zee', vol: 0.14 },
  { zin: 67, C: () => <S_Pas fase="wagen" />, sfeer: 'zee', vol: 0.08 },
  { zin: 68, C: () => <S_Pas fase="muur" />, accent: [{ bij: 0.8, src: 'tik', vol: 0.18 }, { bij: 1.8, src: 'tik', vol: 0.18 }, { bij: 3.2, src: 'inslag', vol: 0.14 }] },
  { zin: 69, C: S_Ruiter, sfeer: 'wind', vol: 0.12 },
  { zin: 70, C: () => <S_Pas fase="kammen" />, sfeer: 'zee', vol: 0.06 },
  { zin: 71, C: S_XerxesLach, sfeer: 'vuur', vol: 0.04, over: <><Pijllabel tekst="Xerxes" x={560} y={300} naar={[740, 420]} vanaf={8} /><Pijllabel tekst="Demaratus, exiled Spartan king" x={1380} y={240} naar={[1260, 380]} vanaf={40} /></> },
  { zin: 72, C: () => <S_Pas fase="haar" />, sfeer: 'zee', vol: 0.05, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 73, C: () => <S_Pas fase="wachten" />, accent: [{ bij: 0.6, src: 'tik', vol: 0.18 }, { bij: 1.4, src: 'tik', vol: 0.18 }] },
  { zin: 74, C: () => <S_Boodschap />, sfeer: 'wind', vol: 0.06 },
  { zin: 75, C: () => <S_Boodschap antwoord />, accent: [{ bij: 0.15, src: 'inslag', vol: 0.24 }, { bij: 0.8, src: 'val', vol: 0.14 }] },
  // ---------- VII · Fighting in the shade ----------
  { zin: 76, C: () => <S_Slag fase="aanval" />, hoofdstuk: ['VII', 'Fighting in the shade'], sfeer: 'menigte', vol: 0.18 },
  { zin: 77, C: () => <S_Slag fase="muur" />, sfeer: 'menigte', vol: 0.2, accent: [{ bij: 0.3, src: 'inslag', vol: 0.2 }, { bij: 1.1, src: 'inslag', vol: 0.18 }, { bij: 1.9, src: 'inslag', vol: 0.2 }] },
  { zin: 78, C: () => <S_Slag fase="list" />, sfeer: 'menigte', vol: 0.18, accent: [{ bij: 2.4, src: 'whoosh', vol: 0.2 }, { bij: 3.0, src: 'inslag', vol: 0.2 }] },
  { zin: 79, C: S_Pijlen, sfeer: 'wind', vol: 0.16, accent: [{ bij: 0.5, src: 'whoosh', vol: 0.16 }, { bij: 1.5, src: 'whoosh', vol: 0.14 }] },
  { zin: 80, C: S_Dienekes, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 81, C: S_Onsterfelijken, sfeer: 'menigte', vol: 0.18 },
  { zin: 82, C: () => <S_Slag fase="onsterfelijk" />, sfeer: 'menigte', vol: 0.2, accent: [{ bij: 0.3, src: 'inslag', vol: 0.22 }, { bij: 0.9, src: 'val', vol: 0.14 }] },
  { zin: 83, C: () => <S_XerxesSpring />, accent: [{ bij: 0.7, src: 'tik', vol: 0.22 }, { bij: 1.85, src: 'tik', vol: 0.22 }, { bij: 3.0, src: 'tik', vol: 0.24 }] },
  { zin: 84, C: () => <S_Slag fase="dag2" />, sfeer: 'menigte', vol: 0.14 },
  { zin: 85, C: () => <S_Pas fase="hoop" />, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.3, src: 'glans', vol: 0.16 }] },
  // ---------- VIII · The goat path ----------
  { zin: 86, over: <><Pijllabel tekst="Ephialtes" x={1420} y={250} naar={[1230, 390]} vanaf={88} /><Pijllabel tekst="his goat" x={1650} y={620} naar={[1560, 760]} vanaf={100} /></>, C: S_Ephialtes, hoofdstuk: ['VIII', 'The goat path'], sfeer: 'vuur', vol: 0.04, accent: [{ bij: 1.6, src: 'munt', vol: 0.18 }] },
  { zin: 87, C: () => <S_Pas fase="pad" />, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.5, src: 'tik', vol: 0.2 }] },
  { zin: 88, C: S_Nachtpad, sfeer: 'wind', vol: 0.12 },
  { zin: 89, C: S_Uitkijk, sfeer: 'wind', vol: 0.1, accent: [{ bij: 1.6, src: 'inslag', vol: 0.18 }] },
  { zin: 90, C: () => <S_Close dageraad citaat />, sfeer: 'wind', vol: 0.06 },
  { zin: 91, C: () => <S_Pas fase="wegtrekken" />, sfeer: 'menigte', vol: 0.08 },
  { zin: 92, C: () => <S_Pas fase="blijven" />, accent: [{ bij: 1.2, src: 'tik', vol: 0.2 }] },
  { zin: 92, na: 3.2, C: S_Thespier },
  { zin: 93, C: S_Ontbijt, sfeer: 'vuur', vol: 0.06 },
  { zin: 93, na: 3.8, C: S_OntbijtClose, sfeer: 'wind', vol: 0.05 },
  { zin: 94, C: () => <S_Slag fase="uit" />, sfeer: 'menigte', vol: 0.14, accent: [{ bij: 0.4, src: 'inslag', vol: 0.18 }] },
  { zin: 95, C: () => <S_Slag fase="open" />, sfeer: 'menigte', vol: 0.22, accent: [{ bij: 0.5, src: 'inslag', vol: 0.2 }] },
  { zin: 96, C: S_Helm, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.6, src: 'val', vol: 0.12 }] },
  { zin: 97, C: () => <S_Slag fase="lichaam" />, sfeer: 'menigte', vol: 0.18, accent: [{ bij: 0.6, src: 'inslag', vol: 0.16 }, { bij: 2.0, src: 'inslag', vol: 0.16 }] },
  { zin: 98, C: S_Speer, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.8, src: 'val', vol: 0.18 }] },
  { zin: 99, C: S_Heuvel, sfeer: 'wind', vol: 0.14 },
  { zin: 100, C: () => <S_Pas fase="leeg" />, sfeer: 'wind', vol: 0.12 },
  // ---------- IX · Go tell the Spartans ----------
  { zin: 101, C: () => <S_InvalKaart />, hoofdstuk: ['IX', 'Go tell the Spartans'], sfeer: 'vuur', vol: 0.06 },
  { zin: 102, C: () => <S_XerxesSpring verlies />, sfeer: 'wind', vol: 0.06 },
  { zin: 103, C: S_Grieken, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 104, C: S_Salamis, sfeer: 'zee', vol: 0.18, accent: [{ bij: 1.4, src: 'inslag', vol: 0.18 }] },
  { zin: 105, over: <Pijllabel tekst="Pausanias, your nephew" x={1300} y={420} naar={[1000, 560]} vanaf={30} />, C: S_Plataea, sfeer: 'menigte', vol: 0.16, accent: [{ bij: 1.5, src: 'glans', vol: 0.14 }] },
  { zin: 106, C: () => <S_InvalKaart terug />, accent: [{ bij: 0.6, src: 'tik', vol: 0.2 }] },
  { zin: 107, C: () => <S_Gedenk />, sfeer: 'wind', vol: 0.08 },
  { zin: 108, C: () => <S_Gedenk gedicht />, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.4, src: 'glans', vol: 0.12 }] },
  { zin: 109, C: S_Stoet, sfeer: 'menigte', vol: 0.06 },
  { zin: 110, C: () => <S_Beeld />, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  { zin: 111, C: () => <S_Beeld letters />, accent: [{ bij: 0.3, src: 'inslag', vol: 0.2 }, { bij: 0.6, src: 'glans', vol: 0.16 }] },
  // ---------- outro ----------
  { zin: 112, C: S_Slot, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];
void JaarLabel;

const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 3.0;
export const LEONIDAS_LANG_DUUR = Math.round(EIND * FPS);
const AFSLUITER_VAN = ZINNEN[112].start - 0.2;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return <>{ZINNEN.slice(0, 112).map((z, i) => <Ondertitel key={i} zin={z.zin} start={z.start} eind={z.eind} nu={nu} />)}</>;
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
/** Welk Caesar-stuk bij welk Leonidas-hoofdstuk: teaser, I-IX, outro. VII = de veldslag (Gallië), VIII = de Iden (dood). */
const STUK = [0, 1, 2, 4, 6, 7, 3, 5, 9, 8, 10];
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

export const LeonidasLang = ({ muziek = true, stem = false }: { muziek?: boolean; stem?: boolean }) => (
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
      <LeonidasOmslag />
    </Sequence>
    {muziek && <Muziek />}
    {stem && <Audio src={staticFile('lokaal/leonidas-lang-voice.mp3')} volume={1.25} />}
  </AbsoluteFill>
);

/** Per-shot startframe (voor de controlestills). */
export const LEONIDAS_SHOT_FRAMES = STARTS.map((s, i) => Math.round(((s + (i < STARTS.length - 1 ? STARTS[i + 1] : EIND)) / 2) * FPS));
