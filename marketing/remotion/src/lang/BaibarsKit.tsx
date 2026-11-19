import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import {
  Avondlicht,
  Berg,
  Binnenlicht,
  Camera,
  Daglicht,
  Duinen,
  Grond,
  Heuvels,
  Kameel,
  Lucht,
  Menigte,
  Nachtlicht,
  Paard,
  Rook,
  TekstVlak,
  Zee,
  Zon,
} from '../watals/Decor';
import { Blok, Kroon, type Kleding, type Overschrijf, type Pose, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { BPLAATS, KaarttafelBaibars, opB, SpeldB, type BPlaats, type BStand } from './KaarttafelBaibars';
import { Zeilschip } from './LangDecor';
import { LangTeller, ORANJE, SERIF } from './LangHud';
import { camPos, FiguurL, Stofjes, Strooisel, Vogels } from './LeonidasKit';

/**
 * Kit voor "What if you were Baibars?" (lange video #05): personages, hoofddeksels, rekwisieten, dieren, decors
 * (steppe, slavenmarkt, Mansoura, paleis, Cairo, de Nijl, het strand van Damiate, Ain Jalut, Krak des Chevaliers)
 * en de kaart van Cairo tot de steppe. Regels uit het scratchboard: geen moskee-interieur, geen moord in beeld,
 * geen hoofden op de poort, kruisvaarders zonder kruis (kleur en lelies), niets tussen camera en onderwerp.
 */

/* ================= kleding ================= */

const OOG = '#4AA8E8';
export const BAIBARS_KIND: Kleding = { huid: '#B07A4E', haar: '#1E1610', tuniek: '#D8CBB0', rand: '#8A6A44', benen: '#6B5236', schoenen: '#5A3B24', riem: '#6B4A2E' };
export const BAIBARS_SLAAF: Kleding = { huid: '#A87048', haar: '#1A1210', tuniek: '#C9B48A', rok: '#B8A278', schoenen: '#6B4A2E', riem: '#7A5A3A' };
export const BAIBARS: Kleding = { huid: '#A87048', haar: '#1A1210', tuniek: '#B3312B', borst: '#8A7A5E', benen: '#5A4030', schoenen: '#2A1E16', laarzen: '#3A2A1C', riem: '#E39A2C' };
export const BAIBARS_KAMP: Kleding = { ...BAIBARS, borst: undefined };
export const BAIBARS_SULTAN: Kleding = { ...BAIBARS, borst: undefined, tuniek: '#E0A93A', cape: '#151210', riem: '#D8A945' };
const MAMELUK_TUNIEK = ['#B3312B', '#E39A2C', '#3E6B8A', '#5E8A5A', '#7B5BA0'];
export const mameluk = (v = 0): Kleding => ({ huid: ['#A87048', '#B98257', '#C9925F'][v % 3], haar: '#1A1210', tuniek: MAMELUK_TUNIEK[v % 5], borst: '#8A7A5E', benen: '#5A4030', schoenen: '#2A1E16', laarzen: '#3A2A1C', riem: '#F2EEE6' });
export const MONGOOL: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#7A2A24', borst: '#5A3A2A', benen: '#4A3424', schoenen: '#2A1E16', laarzen: '#2A1E16', riem: '#C9A646' };
export const KITBUQA: Kleding = { ...MONGOOL, haar: '#9A948A', borst: '#6E5A3A' };
export const HULAGU: Kleding = { huid: '#D0A07A', haar: '#1A1210', tuniek: '#3A2A5A', rok: '#3A2A5A', schoenen: '#2A1E16', cape: '#7A2A24', riem: '#D8A945' };
export const QUTUZ: Kleding = { huid: '#C28C60', haar: '#151210', tuniek: '#2E5A3A', borst: '#7E8088', benen: '#4A3A2E', schoenen: '#2A1E16', laarzen: '#2A1E16', riem: '#3E8A4A' };
export const QUTUZ_HOF: Kleding = { ...QUTUZ, borst: undefined, rok: '#2E5A3A', cape: '#1E3A26' };
export const LODEWIJK: Kleding = { huid: '#EAC7A2', haar: '#E0C060', tuniek: '#2F4F9E', benen: '#8D8A84', schoenen: '#4A4A4E', cape: '#2A448A', riem: '#D8A945' };
export const RIDDER_BLAUW: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#2F4F9E', borst: '#8D8A84', benen: '#8D8A84', schoenen: '#4A4A4E', riem: '#5A3B24' };
export const RIDDER_ROOD: Kleding = { ...RIDDER_BLAUW, tuniek: '#A8322B', haar: '#8A6A40' };
export const RIDDER_WIT: Kleding = { ...RIDDER_BLAUW, tuniek: '#ECE6D8', haar: '#4A3A2C' };
export const ROBERT: Kleding = { ...RIDDER_BLAUW, tuniek: '#2F4F9E', riem: '#A8322B', haar: '#A0703A' };
export const TURANSHAH: Kleding = { huid: '#D0A07A', haar: '#1A1210', tuniek: '#7B5BA0', rok: '#6A4A90', schoenen: '#B8912F', cape: '#D8A945', riem: '#D8A945' };
export const AYDAKIN: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#3E6B8A', rok: '#3E6B8A', schoenen: '#3A2A1C', cape: '#C9A646', riem: '#F2EEE6' };
export const HANDELAAR: Kleding = { huid: '#C28C60', haar: '#3A2A1E', tuniek: '#6A5A3A', rok: '#5A4A30', schoenen: '#3A2A1C', riem: '#C9A66B' };
export const KOPER: Kleding = { huid: '#D0A07A', haar: '#4A3A2C', tuniek: '#2E6A6A', rok: '#2E6A6A', schoenen: '#3A2A1C', cape: '#E9DFC8', riem: '#E9DFC8' };
export const AQTAY: Kleding = { ...mameluk(3), huid: '#B98257' };
export const KALIEF: Kleding = { huid: '#D0A07A', haar: '#2A1E16', tuniek: '#1A1614', rok: '#1A1614', schoenen: '#2A1E16', cape: '#151210', riem: '#151210' };
export const MOEDER_K: Kleding = { huid: '#C9925F', haar: '#1E1610', tuniek: '#3E6B8A', rok: '#3A5A7A', schoenen: '#5A3B24', cape: '#B3542A' };
export const KIPCHAK: Kleding = { huid: '#C28C60', haar: '#1E1610', tuniek: '#6B5A3A', rand: '#B3542A', benen: '#4A3A2A', schoenen: '#3A2A1C', riem: '#B3542A' };
export const BURGER: Kleding = { huid: '#C28C60', haar: '#2A1E16', tuniek: '#E2D6BC', rok: '#D8CBB0', schoenen: '#5A3B24', riem: '#8A6A44' };
export const BURGER2: Kleding = { ...BURGER, tuniek: '#5A7A9A', rok: '#4E6A8A', huid: '#B98257' };
export const VROUW: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#8E4A5A', rok: '#7A3E4E', schoenen: '#3A2A1C', cape: '#E9DFC8' };
export const VERTELLER: Kleding = { huid: '#C28C60', haar: '#B9B4AA', tuniek: '#5A3A6E', rok: '#5A3A6E', schoenen: '#3A2A1C', cape: '#C9A646', riem: '#E9DFC8' };
export const INSTRUCTEUR: Kleding = { ...mameluk(1), huid: '#B98257', haar: '#7A746A' };

/* ================= hoofddeksels (in de hoofdgroep: bovenkant hoofd op y 0,68) ================= */

/** Bontmuts van de Kipchak-jongen. */
export const Bontmuts = ({ kleur = '#B3312B' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.72, -0.01]} s={[0.74, 0.17, 0.68]} c="#8A6A4A" rough={1} />
    <Blok p={[0, 0.88, -0.03]} s={[0.54, 0.2, 0.5]} c={kleur} />
    <Blok p={[0, 1.0, -0.03]} s={[0.12, 0.08, 0.12]} c="#C9A646" />
  </>
);
/** Mamelukse zamt: hoge gekleurde kap in een witte tulband. */
export const Zamt = ({ kap = '#E39A2C', goud = false }: { kap?: string; goud?: boolean }) => (
  <>
    <Blok p={[0, 0.94, -0.03]} s={[0.4, 0.42, 0.38]} c={kap} />
    <Blok p={[0, 1.16, -0.03]} s={[0.3, 0.06, 0.28]} c={kap} />
    <Blok p={[0, 0.74, -0.01]} s={[0.72, 0.16, 0.68]} c="#F2EEE6" rough={0.95} />
    <Blok p={[0, 0.83, -0.02]} s={[0.62, 0.1, 0.58]} c="#E9E2D2" r={[0, 0.35, 0]} rough={0.95} />
    {goud && <Blok p={[0, 0.9, 0.2]} s={[0.36, 0.05, 0.02]} c="#D8A945" metal={0.8} rough={0.3} />}
  </>
);
/** Mongoolse punthelm met bontrand (Kitbuqa: met pluim). */
export const MongoolHelm = ({ pluim = false }: { pluim?: boolean }) => (
  <>
    <Blok p={[0, 0.72, -0.01]} s={[0.74, 0.15, 0.68]} c="#6B4A30" rough={1} />
    <Blok p={[0, 0.86, -0.01]} s={[0.6, 0.18, 0.56]} c="#8D8A84" metal={0.7} rough={0.35} />
    <Blok p={[0, 1.0, -0.01]} s={[0.38, 0.14, 0.36]} c="#8D8A84" metal={0.7} rough={0.35} />
    <Blok p={[0, 1.13, -0.01]} s={[0.07, 0.2, 0.07]} c="#B8912F" metal={0.8} rough={0.3} />
    <Blok p={[0, 0.5, -0.33]} s={[0.66, 0.42, 0.05]} c="#5A3A2A" />
    {pluim && <Blok p={[0, 1.36, -0.03]} s={[0.1, 0.3, 0.1]} c="#B3312B" rough={1} />}
  </>
);
/** Hoge Mongoolse hoed van Hulagu. */
export const HulaguHoed = () => (
  <>
    <Blok p={[0, 0.72, -0.01]} s={[0.86, 0.08, 0.8]} c="#2A1E16" />
    <Blok p={[0, 0.95, -0.01]} s={[0.5, 0.4, 0.48]} c="#7A2A24" />
    <Blok p={[0, 1.2, -0.01]} s={[0.12, 0.12, 0.12]} c="#D8A945" metal={0.8} rough={0.3} />
  </>
);
/** Maliënkap van een ridder: laat het gezicht vrij. */
export const Malienkap = () => (
  <>
    <Blok p={[0, 0.72, -0.02]} s={[0.7, 0.16, 0.64]} c="#8D8A84" metal={0.6} rough={0.45} />
    <Blok p={[0, 0.4, -0.31]} s={[0.7, 0.66, 0.06]} c="#8D8A84" metal={0.6} rough={0.45} />
    {[-1, 1].map((k) => <Blok key={k} p={[k * 0.335, 0.36, 0.0]} s={[0.04, 0.6, 0.56]} c="#8D8A84" metal={0.6} rough={0.45} />)}
    <Blok p={[0, 0.0, 0.0]} s={[0.66, 0.12, 0.6]} c="#8D8A84" metal={0.6} rough={0.45} />
  </>
);
export const KroonOpHoofd = ({ scheef = 0 }: { scheef?: number }) => (
  <group position={[0.02, 0.66, 0]} rotation={[0, 0, scheef]} scale={0.95}>
    <Kroon />
  </group>
);

/* ================= personages ================= */

type P = { position?: V3; rotation?: V3; scale?: number; pose?: Pose; inHand?: ReactNode; extra?: ReactNode; o?: Overschrijf };
type Leeftijd = 'kind' | 'tiener' | 'man' | 'kamp' | 'sultan';

/** Baibars, altijd met blauwe ogen en het witte vlekje (kant x < 0). */
export const Baibars = ({ leeftijd = 'man', scale, snor = true, ...p }: P & { leeftijd?: Leeftijd; snor?: boolean }) => {
  const k = leeftijd === 'kind' ? BAIBARS_KIND : leeftijd === 'tiener' ? BAIBARS_SLAAF : leeftijd === 'sultan' ? BAIBARS_SULTAN : leeftijd === 'kamp' ? BAIBARS_KAMP : BAIBARS;
  const hoed = leeftijd === 'kind' ? <Bontmuts /> : leeftijd === 'tiener' ? null : <Zamt kap={leeftijd === 'sultan' ? '#E0A93A' : '#B3312B'} goud={leeftijd === 'sultan'} />;
  return (
    <FiguurL
      kleding={k}
      haar="kort"
      snor={leeftijd !== 'kind' && leeftijd !== 'tiener' && snor}
      oogKleur={OOG}
      oogVlek
      hoofdExtra={hoed}
      scale={scale ?? (leeftijd === 'kind' ? 0.62 : leeftijd === 'tiener' ? 0.88 : 1)}
      {...p}
    />
  );
};
export const Mameluk = ({ v = 0, kap, ...p }: P & { v?: number; kap?: string }) => (
  <FiguurL kleding={mameluk(v)} haar="kort" snor={v % 2 === 0} baard={v % 3 === 1} hoofdExtra={<Zamt kap={kap ?? ['#E39A2C', '#B3312B', '#E0C060', '#B3312B', '#E39A2C'][v % 5]} />} {...p} />
);
export const Mongool = ({ v = 0, ...p }: P & { v?: number }) => (
  <FiguurL kleding={{ ...MONGOOL, tuniek: ['#7A2A24', '#5A3A2A', '#6A2E3A'][v % 3] }} haar="kort" snor hoofdExtra={<MongoolHelm />} {...p} />
);
export const Kitbuqa = (p: P) => <FiguurL kleding={KITBUQA} haar="grijs" snor hoofdExtra={<MongoolHelm pluim />} {...p} />;
export const Hulagu = (p: P) => <FiguurL kleding={HULAGU} haar="kort" snor hoofdExtra={<HulaguHoed />} {...p} />;
export const Qutuz = ({ helm = false, hof = false, ...p }: P & { helm?: boolean; hof?: boolean }) => (
  <FiguurL kleding={hof ? QUTUZ_HOF : QUTUZ} haar="kort" baard hoofddeksel={helm ? 'helm' : 'tulband'} {...p} />
);
export const Lodewijk = ({ kroon = true, scheef = 0, lelies = true, ...p }: P & { kroon?: boolean; scheef?: number; lelies?: boolean }) => (
  <FiguurL
    kleding={LODEWIJK}
    haar="bob"
    hoofdExtra={kroon ? <KroonOpHoofd scheef={scheef} /> : undefined}
    {...p}
    extra={
      <>
        {lelies && LELIES.map(([x, y], i) => <Blok key={i} p={[x, y, 0.2]} s={[0.07, 0.07, 0.02]} r={[0, 0, Math.PI / 4]} c="#E2BE58" metal={0.6} rough={0.3} />)}
        {p.extra}
      </>
    }
  />
);
const LELIES: [number, number][] = [[-0.18, 1.5], [0.18, 1.5], [0, 1.32], [-0.18, 1.14], [0.18, 1.14], [-0.2, 0.86], [0.2, 0.86], [0, 0.78]];
export const Ridder = ({ v = 0, ...p }: P & { v?: number }) => <FiguurL kleding={[RIDDER_BLAUW, RIDDER_ROOD, RIDDER_WIT][v % 3]} haar="kort" baard={v % 2 === 1} hoofdExtra={<Malienkap />} {...p} />;
export const Robert = (p: P) => <FiguurL kleding={ROBERT} haar="kort" hoofdExtra={<Malienkap />} {...p} />;
/** Turanshah: jonge sultan met rode (dronken) wangen. */
export const Turanshah = ({ dronken = true, ...p }: P & { dronken?: boolean }) => (
  <FiguurL
    kleding={TURANSHAH}
    haar="kort"
    hoofddeksel="tulband"
    {...p}
    hoofdExtra={dronken ? [-1, 1].map((k) => <Blok key={k} p={[k * 0.2, 0.28, 0.285]} s={[0.1, 0.06, 0.01]} c="#E86A5A" />) : undefined}
  />
);
/** Aydakin: dikke emir met grote snor. */
export const Aydakin = (p: P) => (
  <FiguurL
    kleding={AYDAKIN}
    haar="kort"
    snor
    hoofddeksel="tulband"
    {...p}
    extra={
      <>
        <Blok p={[0, 1.08, 0.2]} s={[0.66, 0.5, 0.2]} c={AYDAKIN.tuniek} />
        <Blok p={[0, 1.08, 0.31]} s={[0.5, 0.06, 0.02]} c="#F2EEE6" />
        {p.extra}
      </>
    }
  />
);
export const Handelaar = (p: P) => <FiguurL kleding={HANDELAAR} haar="kort" baard hoofddeksel="tulband" {...p} />;
export const Koper = (p: P) => <FiguurL kleding={KOPER} haar="kort" baard hoofddeksel="tulband" {...p} />;
/** Aqtay: mameluk-commandant met een litteken. */
export const Aqtay = (p: P) => (
  <FiguurL kleding={AQTAY} haar="kort" baard hoofdExtra={<><Zamt kap="#5E8A5A" /><Blok p={[-0.16, 0.42, 0.288]} s={[0.02, 0.2, 0.01]} r={[0, 0, 0.3]} c="#7A3A2A" /></>} {...p} />
);
export const Kalief = (p: P) => <FiguurL kleding={KALIEF} haar="kort" baard hoofddeksel="tulband" {...p} />;

/* ================= rekwisieten ================= */

/** Kromme sabel: in de hand vooruit (zelfde stand als Zwaard). */
export const Sabel = () => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <Blok p={[0, 0, 0]} s={[0.07, 0.18, 0.07]} c="#3A2A1C" />
    <Blok p={[0, 0.1, 0]} s={[0.16, 0.04, 0.07]} c="#B8912F" metal={0.8} rough={0.3} />
    <Blok p={[0, 0.46, 0]} s={[0.09, 0.7, 0.03]} c="#E2E6EA" metal={0.35} rough={0.3} />
    <Blok p={[0, 0.93, 0.06]} s={[0.085, 0.36, 0.03]} r={[0.3, 0, 0]} c="#E2E6EA" metal={0.35} rough={0.3} />
    <Blok p={[0, 1.16, 0.17]} s={[0.07, 0.2, 0.03]} r={[0.6, 0, 0]} c="#E2E6EA" metal={0.35} rough={0.3} />
  </group>
);
/** Korte reflexboog (rechtop in de hand). */
export const Boog = () => (
  <group rotation={[0, 0, 0]}>
    <Blok p={[0, 0, 0.05]} s={[0.05, 0.16, 0.05]} c="#5A3B24" />
    <Blok p={[0, 0.28, 0.0]} s={[0.04, 0.42, 0.05]} r={[0.25, 0, 0]} c="#6B4A2E" />
    <Blok p={[0, -0.28, 0.0]} s={[0.04, 0.42, 0.05]} r={[-0.25, 0, 0]} c="#6B4A2E" />
    <Blok p={[0, 0.5, -0.1]} s={[0.04, 0.12, 0.05]} r={[-0.5, 0, 0]} c="#6B4A2E" />
    <Blok p={[0, -0.5, -0.1]} s={[0.04, 0.12, 0.05]} r={[0.5, 0, 0]} c="#6B4A2E" />
    <Blok p={[0, 0, -0.15]} s={[0.01, 1.04, 0.01]} c="#E9DFC8" />
  </group>
);
/** Pijlkoker op de rug (via extra). */
export const Koker = () => (
  <group position={[0.18, 1.3, -0.28]} rotation={[0.2, 0, -0.3]}>
    <Blok p={[0, 0, 0]} s={[0.18, 0.6, 0.16]} c="#7A4A2A" />
    {[-0.04, 0.03].map((x) => <Blok key={x} p={[x, 0.38, 0]} s={[0.03, 0.18, 0.03]} c="#E9DFC8" />)}
  </group>
);
/** Kruisboog (vooruit in de hand). */
export const Kruisboog = () => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <Blok p={[0, 0.2, 0]} s={[0.08, 0.6, 0.08]} c="#6B4A2E" />
    <Blok p={[0, 0.46, 0]} s={[0.6, 0.06, 0.06]} c="#5A3B24" />
    <Blok p={[0, 0.4, -0.02]} s={[0.56, 0.01, 0.01]} c="#E9DFC8" />
  </group>
);
export const Beker = ({ melk = false }: { melk?: boolean }) => (
  <group>
    <Blok p={[0, 0.1, 0]} s={[0.16, 0.2, 0.16]} c="#C9A646" metal={0.7} rough={0.3} />
    <Blok p={[0, 0.2, 0]} s={[0.13, 0.01, 0.13]} c={melk ? '#F4F0E6' : '#7A2A3A'} />
  </group>
);
export const Munt = ({ p, zilver = true }: { p: V3; zilver?: boolean }) => <Blok p={p} s={[0.14, 0.03, 0.14]} c={zilver ? '#D2D6DB' : '#E2BE58'} metal={0.85} rough={0.25} />;
/** Stapel munten die tot `n` groeit. */
export const Muntstapel = ({ position, n, zilver = true }: { position: V3; n: number; zilver?: boolean }) => (
  <group position={position}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <Munt key={i} p={[Math.sin(i * 2.1) * 0.012, 0.015 + i * 0.032, Math.cos(i * 1.7) * 0.012]} zilver={zilver} />)}
  </group>
);
/** Weegschaal met twee schalen; `scheef` tilt het juk. */
export const Weegschaal = ({ position, scheef = 0, links, rechts }: { position: V3; scheef?: number; links?: ReactNode; rechts?: ReactNode }) => (
  <group position={position}>
    <Blok p={[0, 0.45, 0]} s={[0.06, 0.9, 0.06]} c="#8A6A3A" metal={0.4} />
    <group position={[0, 0.9, 0]} rotation={[0, 0, scheef]}>
      <Blok p={[0, 0, 0]} s={[0.9, 0.04, 0.04]} c="#B8912F" metal={0.7} rough={0.3} />
      {[-0.42, 0.42].map((x, i) => (
        <group key={x} position={[x, 0, 0]} rotation={[0, 0, -scheef]}>
          <Blok p={[0, -0.18, 0]} s={[0.01, 0.36, 0.01]} c="#3A2A1C" />
          <Blok p={[0, -0.37, 0]} s={[0.3, 0.03, 0.3]} c="#B8912F" metal={0.7} rough={0.3} />
          <group position={[0, -0.35, 0]}>{i === 0 ? links : rechts}</group>
        </group>
      ))}
    </group>
  </group>
);
/** Houten kist (podium op de markt). */
export const Kist = ({ position, b = 1.1, h = 0.6 }: { position: V3; b?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[b, h, 0.8]} c="#8A6A3A" />
    <Blok p={[0, h / 2, 0.405]} s={[b, 0.06, 0.02]} c="#6B4A2E" />
    <Blok p={[0, h - 0.02, 0]} s={[b + 0.04, 0.04, 0.84]} c="#7A5A32" />
  </group>
);
/** Bordje aan een touwtje (om de nek, via extra van een figuur: y ~1,4). */
export const NekBordje = ({ tekst, y = 1.28 }: { tekst: string; y?: number }) => (
  <group position={[0, y, 0.24]}>
    <Blok p={[-0.14, 0.22, -0.02]} s={[0.012, 0.36, 0.012]} r={[0, 0, -0.5]} c="#5A3B24" />
    <Blok p={[0.14, 0.22, -0.02]} s={[0.012, 0.36, 0.012]} r={[0, 0, 0.5]} c="#5A3B24" />
    <TekstVlak regels={tekst.split('|')} b={0.62} h={0.3} achter="#E9DCBE" voor="#3A1E12" fontPx={84} />
  </group>
);
/** Brief (papier) met een paar regels; liggend of in de hand. */
export const Brief = ({ tekst, b = 0.5, h = 0.66, rood = false }: { tekst: string[]; b?: number; h?: number; rood?: boolean }) => (
  <group>
    <TekstVlak regels={tekst} b={b} h={h} achter="#EFE3C4" voor={rood ? '#9E1F25' : '#2A1A10'} fontPx={Math.round(380 / Math.max(...tekst.map((x) => x.length)))} />
  </group>
);
/** Lakzegel. */
export const Zegel = ({ p }: { p: V3 }) => <Blok p={p} s={[0.1, 0.1, 0.03]} c="#9E1F25" rough={0.4} />;
/** Kaars met vlammetje; `uit` 0..1 dooft hem. */
export const Kaars = ({ position, h = 0.4, uit = 0, schaal = 1 }: { position: V3; h?: number; uit?: number; schaal?: number }) => {
  const f = useCurrentFrame();
  const fl = (1 + Math.sin(f / 2.3 + position[0] * 5) * 0.15) * (1 - uit);
  return (
    <group position={position} scale={schaal}>
      <Blok p={[0, h / 2, 0]} s={[0.08, h, 0.08]} c="#F2EAD8" />
      {fl > 0.05 && <Blok p={[0, h + 0.07 * fl, 0]} s={[0.05 * fl, 0.12 * fl, 0.05 * fl]} c="#FFC24A" emissive="#FF9A2A" />}
      {uit > 0.3 && uit < 1.3 && <Blok p={[0.02 * uit, h + 0.1 + uit * 0.3, 0]} s={[0.04, 0.12, 0.04]} c="#9A948A" rough={1} />}
    </group>
  );
};
/** De leeuw van Baibars (blokken, loopt naar links met een opgeheven poot). */
export const Leeuw = ({ position, rotation, scale = 1, kleur = '#D8A945', o, knipoog = false }: { position?: V3; rotation?: V3; scale?: number; kleur?: string; o?: boolean; knipoog?: boolean }) => {
  const m = o ? { metal: 0.7, rough: 0.3 } : {};
  const manen = o ? kleur : '#B5652E';
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.55, 0]} s={[1.1, 0.42, 0.36]} c={kleur} {...m} />
      <Blok p={[-0.62, 0.72, 0]} s={[0.46, 0.56, 0.46]} c={manen} {...m} />
      <Blok p={[-0.82, 0.72, 0]} s={[0.24, 0.3, 0.3]} c={kleur} {...m} />
      <Blok p={[-0.95, 0.66, 0]} s={[0.08, 0.1, 0.12]} c="#3A2418" />
      {[-1, 1].map((k) => <Blok key={k} p={[-0.86, 0.8, k * 0.13]} s={[0.06, knipoog && k > 0 ? 0.015 : 0.05, 0.02]} c="#1A120A" />)}
      <Blok p={[-0.62, 1.02, 0]} s={[0.14, 0.12, 0.3]} c={manen} {...m} />
      {/* poten: links voor opgeheven */}
      <Blok p={[-0.42, 0.42, 0.12]} s={[0.34, 0.12, 0.12]} r={[0, 0, 0.6]} c={kleur} {...m} />
      <Blok p={[-0.38, 0.2, -0.12]} s={[0.12, 0.4, 0.12]} c={kleur} {...m} />
      {[0.38, 0.32].map((x, i) => <Blok key={i} p={[x, 0.2, i ? 0.12 : -0.12]} s={[0.12, 0.4, 0.12]} c={kleur} {...m} />)}
      <Blok p={[0.68, 0.78, 0]} s={[0.36, 0.06, 0.06]} r={[0, 0, 0.9]} c={kleur} {...m} />
      <Blok p={[0.8, 0.96, 0]} s={[0.12, 0.14, 0.12]} c={manen} {...m} />
    </group>
  );
};
/** Vaandel met de leeuw (geel doek). Stok op de oorsprong. */
export const LeeuwVaandel = ({ position, t = 0, kleur = '#E0A93A', h = 3.6 }: { position: V3; t?: number; kleur?: string; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.08, h, 0.08]} c="#5A3B24" />
    <group position={[0.75, h - 0.75, 0]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      <Blok p={[0, 0, 0]} s={[1.4, 1.2, 0.03]} c={kleur} />
      <Leeuw position={[0.08, -0.42, 0.04]} scale={0.6} kleur="#7A2A24" rotation={[0, 0, 0]} />
    </group>
    <Blok p={[0, h + 0.1, 0]} s={[0.16, 0.2, 0.16]} c="#D8A945" metal={0.8} rough={0.3} />
  </group>
);
/** Gewoon vaandel (Mongools rood met witte staarten, of geel). */
export const Vaandel = ({ position, kleur = '#7A2A24', t = 0, h = 3.4, staarten = true }: { position: V3; kleur?: string; t?: number; h?: number; staarten?: boolean }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.07, h, 0.07]} c="#3A2A1C" />
    <Blok p={[0.45, h - 0.5, 0]} s={[0.9, 0.8, 0.03]} c={kleur} r={[0, Math.sin(t * 2.4) * 0.15, 0]} />
    {staarten && [-0.08, 0.08].map((x, i) => <Blok key={i} p={[x, h - 0.3, 0]} s={[0.06, 0.5, 0.06]} r={[0, 0, Math.sin(t * 3 + i) * 0.2]} c="#E9E2D2" rough={1} />)}
  </group>
);
/** Meetlat (blauw-wit, "6 ft"). */
export const Meetlat = ({ position, h = 3.0 }: { position: V3; h?: number }) => (
  <group position={position}>
    {Array.from({ length: Math.round(h / 0.25) }, (_, i) => <Blok key={i} p={[0, 0.125 + i * 0.25, 0]} s={[0.3, 0.25, 0.04]} c={i % 2 ? '#F2EEE6' : '#3E6B8A'} />)}
    {[1, 2].map((m) => <Blok key={m} p={[0.25, m * 1.2, 0.02]} s={[0.2, 0.03, 0.02]} c="#1A120A" />)}
  </group>
);
/** Gevallen helm in het stof (geen lichaam). `soort` kiest het model. */
export const GevallenHelm = ({ position, soort = 'ridder', rotation }: { position: V3; soort?: 'ridder' | 'mongool' | 'qutuz'; rotation?: V3 }) => (
  <group position={position} rotation={rotation ?? [0.05, 0.55, 0.32]}>
    {soort === 'mongool' ? (
      <group position={[0, -0.7, 0]}>
        <MongoolHelm pluim />
      </group>
    ) : soort === 'qutuz' ? (
      <>
        <Blok p={[0, 0.12, 0]} s={[0.7, 0.24, 0.64]} c="#8D8A84" rough={0.35} metal={0.8} />
        <Blok p={[0, 0.3, 0]} s={[0.1, 0.18, 0.5]} c="#3E8A4A" />
      </>
    ) : (
      <>
        <Blok p={[0, 0.3, 0]} s={[0.62, 0.62, 0.6]} c="#9A968E" metal={0.7} rough={0.35} />
        <Blok p={[0, 0.63, 0]} s={[0.5, 0.06, 0.48]} c="#8D8A84" metal={0.7} rough={0.35} />
        <Blok p={[0, 0.4, 0.305]} s={[0.5, 0.06, 0.02]} c="#1A1614" />
        <Blok p={[0, 0.06, 0.3]} s={[0.56, 0.06, 0.02]} c="#C9A646" metal={0.7} rough={0.3} />
        <Blok p={[0, 0.82, -0.05]} s={[0.12, 0.3, 0.46]} c="#2F4F9E" rough={1} />
        <Blok p={[0, 0.98, -0.24]} s={[0.12, 0.2, 0.14]} c="#2F4F9E" rough={1} />
      </>
    )}
  </group>
);

/* ================= dieren ================= */

export const Schaap = ({ position, rotation, t = 0, eet = true, scale = 1, zwart = false }: { position: V3; rotation?: V3; t?: number; eet?: boolean; scale?: number; zwart?: boolean }) => {
  const kauw = eet ? Math.sin(t * 6 + position[0]) * 0.03 : 0;
  const wol = zwart ? '#3A322C' : '#F2EEE4';
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.52, 0]} s={[0.5, 0.42, 0.74]} c={wol} rough={1} />
      <Blok p={[0, 0.74, 0.05]} s={[0.4, 0.12, 0.6]} c={wol} rough={1} />
      {[-1, 1].map((k) => [-1, 1].map((z) => <Blok key={`${k}${z}`} p={[k * 0.15, 0.17, z * 0.24]} s={[0.08, 0.34, 0.08]} c="#2A221C" />))}
      <group position={[0, eet ? 0.46 : 0.64, 0.44]} rotation={[eet ? 0.5 : 0, 0, 0]}>
        <Blok p={[0, 0, 0]} s={[0.24, 0.26, 0.3]} c="#2A221C" />
        <Blok p={[0, -0.08 + kauw, 0.14]} s={[0.14, 0.08, 0.06]} c="#2A221C" />
        {[-1, 1].map((k) => <Blok key={k} p={[k * 0.16, 0.06, -0.04]} s={[0.12, 0.05, 0.08]} c="#2A221C" />)}
        {[-1, 1].map((k) => <Blok key={`o${k}`} p={[k * 0.07, 0.05, 0.155]} s={[0.04, 0.035, 0.01]} c="#F4EFE6" />)}
      </group>
    </group>
  );
};
/** Duif (wit), optioneel met postzakje; `vliegt` laat hem klapperen. */
export const Duif = ({ position, rotation, scale = 1, vliegt = false, zakje = false }: { position: V3; rotation?: V3; scale?: number; vliegt?: boolean; zakje?: boolean }) => {
  const f = useCurrentFrame();
  const slag = vliegt ? Math.sin(f * 0.9) * 0.7 : 0;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.16, 0]} s={[0.18, 0.18, 0.32]} c="#F4F2EC" />
      <Blok p={[0, 0.3, 0.14]} s={[0.13, 0.13, 0.13]} c="#F4F2EC" />
      <Blok p={[0, 0.28, 0.23]} s={[0.04, 0.03, 0.06]} c="#E8A030" />
      {[-1, 1].map((k) => <Blok key={k} p={[k * 0.05, 0.32, 0.2]} s={[0.02, 0.025, 0.01]} c="#1A120A" />)}
      {[-1, 1].map((k) => <Blok key={`v${k}`} p={[k * (vliegt ? 0.2 : 0.1), 0.2, -0.02]} s={[vliegt ? 0.32 : 0.04, 0.03, 0.22]} r={[0, 0, k * (vliegt ? slag : 0)]} c="#E2E0DA" />)}
      <Blok p={[0, 0.14, -0.2]} s={[0.12, 0.04, 0.12]} c="#E2E0DA" />
      {zakje && <Blok p={[0.06, 0.04, 0.04]} s={[0.08, 0.08, 0.08]} c="#B5643A" />}
      {!vliegt && [-1, 1].map((k) => <Blok key={`p${k}`} p={[k * 0.04, 0.03, 0.02]} s={[0.02, 0.07, 0.02]} c="#D8603A" />)}
    </group>
  );
};
export const Kraai = ({ position, rotation, scale = 1 }: { position: V3; rotation?: V3; scale?: number }) => {
  const f = useCurrentFrame();
  const kop = Math.sin(f / 14) > 0.6 ? 0.5 : 0;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.18, 0]} s={[0.2, 0.2, 0.36]} c="#16141A" />
      <group position={[0, 0.34, 0.16]} rotation={[0, kop, 0]}>
        <Blok p={[0, 0, 0]} s={[0.15, 0.15, 0.15]} c="#16141A" />
        <Blok p={[0, -0.02, 0.12]} s={[0.05, 0.04, 0.1]} c="#3A3A3A" />
        {[-1, 1].map((k) => <Blok key={k} p={[k * 0.06, 0.02, 0.06]} s={[0.01, 0.03, 0.03]} c="#E8D84A" />)}
      </group>
      <Blok p={[0, 0.14, -0.26]} s={[0.12, 0.04, 0.18]} c="#16141A" />
      {[-1, 1].map((k) => <Blok key={`p${k}`} p={[k * 0.05, 0.04, 0.02]} s={[0.02, 0.08, 0.02]} c="#2A2420" />)}
    </group>
  );
};
export const Valk = ({ position, rotation, scale = 1, vliegt = false }: { position: V3; rotation?: V3; scale?: number; vliegt?: boolean }) => {
  const f = useCurrentFrame();
  const slag = vliegt ? Math.sin(f * 0.8) * 0.6 : 0;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.2, 0]} s={[0.2, 0.3, 0.22]} c="#7A5A3A" />
      <Blok p={[0, 0.12, 0.08]} s={[0.15, 0.18, 0.08]} c="#E9DFC8" />
      <Blok p={[0, 0.42, 0.04]} s={[0.15, 0.14, 0.15]} c="#5A4030" />
      <Blok p={[0, 0.4, 0.13]} s={[0.05, 0.04, 0.06]} c="#E8C84A" />
      {[-1, 1].map((k) => <Blok key={k} p={[k * 0.05, 0.44, 0.11]} s={[0.02, 0.03, 0.01]} c="#1A120A" />)}
      {[-1, 1].map((k) => <Blok key={`v${k}`} p={[k * (vliegt ? 0.3 : 0.11), 0.26, -0.02]} s={[vliegt ? 0.5 : 0.05, 0.04, 0.26]} r={[0, 0, k * slag]} c="#6B4A2E" />)}
    </group>
  );
};
export const Haas = ({ position, rotation, op = false }: { position: V3; rotation?: V3; op?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.16, 0]} s={[0.2, 0.2, 0.32]} c="#9A7A5A" />
    <Blok p={[0, op ? 0.34 : 0.26, 0.16]} s={[0.15, 0.15, 0.17]} c="#9A7A5A" />
    {[-1, 1].map((k) => <Blok key={k} p={[k * 0.04, op ? 0.52 : 0.42, 0.12]} s={[0.04, op ? 0.24 : 0.18, 0.04]} c="#9A7A5A" />)}
    {[-1, 1].map((k) => <Blok key={`o${k}`} p={[k * 0.076, op ? 0.36 : 0.28, 0.2]} s={[0.01, op ? 0.04 : 0.025, 0.03]} c="#1A120A" />)}
    <Blok p={[0, 0.2, -0.17]} s={[0.08, 0.08, 0.06]} c="#F2EEE4" />
  </group>
);
export const Krokodil = ({ position, rotation, op = false }: { position: V3; rotation?: V3; op?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.12, 0]} s={[0.5, 0.22, 1.6]} c="#4E6A3A" />
    <Blok p={[0, op ? 0.22 : 0.12, 1.0]} s={[0.36, 0.14, 0.6]} r={[op ? -0.25 : 0, 0, 0]} c="#4E6A3A" />
    {[-1, 1].map((k) => <Blok key={k} p={[k * 0.12, op ? 0.33 : 0.22, 0.78]} s={[0.08, 0.06, 0.06]} c="#E8D84A" />)}
    <Blok p={[0, 0.1, -1.1]} s={[0.24, 0.14, 0.8]} c="#4E6A3A" />
    {[-1, 1].map((k) => [-1, 1].map((z) => <Blok key={`${k}${z}`} p={[k * 0.32, 0.05, z * 0.5]} s={[0.18, 0.1, 0.12]} c="#3E5A2E" />))}
  </group>
);

/* ================= gebouwen en landschap ================= */

/** Joert (vilttent), deur naar +z. */
export const Joert = ({ position, rotation, schaal = 1, rook = false, t = 0 }: { position: V3; rotation?: V3; schaal?: number; rook?: boolean; t?: number }) => (
  <group position={position} rotation={rotation} scale={schaal}>
    <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1.4, 1.4, 1.4, 12]} />
      <meshStandardMaterial color="#EDE4D2" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 1.85, 0]} castShadow>
      <coneGeometry args={[1.5, 0.9, 12]} />
      <meshStandardMaterial color="#E2D6BC" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 1.1, 0]}>
      <cylinderGeometry args={[1.42, 1.42, 0.12, 12]} />
      <meshStandardMaterial color="#B3542A" roughness={1} flatShading />
    </mesh>
    <Blok p={[0, 2.32, 0]} s={[0.3, 0.1, 0.3]} c="#6B4A2E" />
    <Blok p={[0, 0.55, 1.38]} s={[0.6, 1.1, 0.06]} c="#B3542A" />
    <Blok p={[0, 0.55, 1.42]} s={[0.4, 0.02, 0.02]} c="#E0A93A" />
    {rook && <Rookje position={[0, 2.4, 0]} t={t} />}
  </group>
);
/** Klein rookpluimpje (uit een joert of een kampvuur), blijft dicht bij de bron. */
export const Rookje = ({ position, t = 0 }: { position: V3; t?: number }) => (
  <group position={position}>
    {Array.from({ length: 6 }, (_, i) => {
      const y = (t * 0.5 + i * 0.45) % 2.7;
      const s = 0.16 + y * 0.12;
      return <Blok key={i} p={[Math.sin(t * 0.7 + i) * 0.12 + y * 0.25, y, 0]} s={[s, s, s]} c="#D8D2C8" rough={1} r={[i, i, 0]} />;
    })}
  </group>
);

/** Palm. */
export const Palm = ({ position, schaal = 1 }: { position: V3; schaal?: number }) => (
  <group position={position} scale={schaal}>
    {Array.from({ length: 6 }, (_, i) => <Blok key={i} p={[i * 0.06, 0.3 + i * 0.55, 0]} s={[0.28 - i * 0.015, 0.56, 0.28 - i * 0.015]} r={[0, 0, -0.08]} c={i % 2 ? '#8A6A44' : '#7A5A3A'} />)}
    {Array.from({ length: 7 }, (_, i) => {
      const a = (i / 7) * Math.PI * 2;
      return <Blok key={`b${i}`} p={[0.36 + Math.sin(a) * 0.7, 3.25, Math.cos(a) * 0.7]} s={[0.3, 0.06, 1.5]} r={[0.35, a, 0]} c={i % 2 ? '#5E8A3A' : '#4E7A32'} />;
    })}
  </group>
);
/** Minaret als silhouet in de verte (regel 9: alleen ver weg). */
export const MinaretVer = ({ position, h = 14 }: { position: V3; h?: number }) => (
  <group position={position}>
    <mesh position={[0, h / 2, 0]}>
      <cylinderGeometry args={[0.6, 0.8, h, 8]} />
      <meshStandardMaterial color="#C9B48A" roughness={1} flatShading />
    </mesh>
    <Blok p={[0, h * 0.72, 0]} s={[2.0, 0.3, 2.0]} c="#BFA87E" />
    <mesh position={[0, h + 0.7, 0]}>
      <coneGeometry args={[0.7, 1.6, 8]} />
      <meshStandardMaterial color="#B8A07A" roughness={1} flatShading />
    </mesh>
  </group>
);
/** Huis met plat dak en borstwering (Syrië/Egypte). */
export const PlatHuis = ({ position, rotation, b = 3, h = 2.8, d = 2.6, kleur = '#D8C7A2', luifel }: { position: V3; rotation?: V3; b?: number; h?: number; d?: number; kleur?: string; luifel?: string }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, h / 2, 0]} s={[b, h, d]} c={kleur} rough={1} />
    <Blok p={[0, h + 0.15, d / 2 - 0.05]} s={[b, 0.3, 0.1]} c={kleur} rough={1} />
    <Blok p={[0, h + 0.15, -d / 2 + 0.05]} s={[b, 0.3, 0.1]} c={kleur} rough={1} />
    <Blok p={[0.4, 0.8, d / 2 + 0.01]} s={[0.7, 1.6, 0.04]} c="#5A3B24" />
    <Blok p={[-b / 2 + 0.6, h - 0.8, d / 2 + 0.01]} s={[0.5, 0.5, 0.04]} c="#3A2A1C" />
    {[-0.5, 0, 0.5].map((x) => <Blok key={x} p={[x * (b - 0.6), h - 0.15, d / 2 + 0.05]} s={[0.12, 0.12, 0.2]} c="#6B4A2E" />)}
    {luifel && <Blok p={[0.4, 1.9, d / 2 + 0.4]} s={[1.4, 0.06, 0.8]} r={[0.25, 0, 0]} c={luifel} />}
  </group>
);

type Tijd = 'dag' | 'avond' | 'nacht' | 'dageraad';
const LUCHT: Record<Tijd, { boven: string; horizon: string; mist: string }> = {
  dag: { boven: '#8FB9DC', horizon: '#F2DDB2', mist: '#E2D2AE' },
  avond: { boven: '#4A2E4A', horizon: '#F08A4A', mist: '#9A6A4A' },
  nacht: { boven: '#0B0F1E', horizon: '#242A44', mist: '#0E1220' },
  dageraad: { boven: '#4E4A7A', horizon: '#F4A35A', mist: '#B0806A' },
};
const Licht = ({ tijd }: { tijd: Tijd }) =>
  tijd === 'dag' ? (
    <Daglicht zon={[10, 16, 8]} kracht={1.9} />
  ) : tijd === 'avond' ? (
    <>
      <Avondlicht />
      <Zon position={[40, 6, -110]} grootte={14} kleur="#FFB070" />
    </>
  ) : tijd === 'nacht' ? (
    <Nachtlicht />
  ) : (
    <>
      <Daglicht zon={[30, 6, -20]} kleur="#FFC890" kracht={1.5} omgeving={1.0} />
      <Zon position={[60, 4, -110]} grootte={12} kleur="#FFC07A" />
    </>
  );

type DecorP = { children?: ReactNode; over?: ReactNode; tijd?: Tijd; cam?: number[]; kijk?: V3; duur?: number; scherpte?: number; fov?: number };

/** Sterrenhemel (voor de nacht op de steppe). */
const Sterren = () => (
  <>
    {Array.from({ length: 70 }, (_, i) => {
      const a = (i * 2.399) % (Math.PI * 2);
      const h = 0.18 + ((i * 0.137) % 0.7);
      const r = 150;
      return <Blok key={i} p={[Math.cos(a) * r * Math.cos(h), 10 + Math.sin(h) * r, -Math.abs(Math.sin(a)) * r * Math.cos(h) - 20]} s={[0.5, 0.5, 0.5]} c="#FFF6DA" emissive="#FFF0C0" />;
    })}
  </>
);

/** De Kipchak-steppe: eindeloos gras, joerten, schapen. De ruimte rond (0,0,0) blijft vrij. */
const JOERTEN: [number, number, number][] = [[-6, -8, 0.4], [5, -11, -0.3], [-1.5, -16, 0.1], [11, -18, 0.6], [-12, -14, -0.4]];
export const Steppe = ({ children, over, tijd = 'dag', cam = [4, 2.4, 9, 3, 2.2, 7.4], kijk = [0, 1.3, 0] as V3, duur = 160, joerten = true, kudde = true, scherpte = 2.6, fov = 36 }: DecorP & { joerten?: boolean; kudde?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  const nacht = tijd === 'nacht';
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={[L.mist, 30, 180]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      {nacht && <Sterren />}
      <Grond kleur={nacht ? '#2A3020' : '#A9A65C'} />
      <Duinen kleur={nacht ? '#232A1C' : '#98A05A'} z={-50} n={14} />
      {joerten && JOERTEN.map(([x, z, r], i) => <Joert key={i} position={[x, 0, z]} rotation={[0, r, 0]} rook={i === 1 && !nacht} t={t} />)}
      {kudde && [[-4, -4.5], [-3.2, -5.5], [3.6, -5], [6.5, -6.5], [-8, -7], [2, -9]].map(([x, z], i) => <Schaap key={i} position={[x + Math.sin(t * 0.2 + i) * 0.2, 0, z]} rotation={[0, i * 1.3, 0]} t={t} eet={(i + Math.floor(t)) % 3 !== 0} zwart={i === 3} />)}
      <Strooisel n={90} straal={18} droog={nacht} />
      {!nacht && <Vogels n={4} y={14} />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** De slavenmarkt in een Syrische stad: huizen met luifels, menigte, een kist als podium op (0, 0, 0). */
export const Markt = ({ children, over, tijd = 'dag', cam = [3.4, 2.4, 8.4, 2.4, 2.2, 6.8], kijk = [0, 1.3, 0] as V3, duur = 160, menigte = true, scherpte = 2.8, fov = 36 }: DecorP & { menigte?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={[L.mist, 24, 140]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur="#CDB48A" />
      {[[-7, -7.5, '#B3312B'], [-3.6, -8.2, '#3E6B8A'], [0.2, -7.8, undefined], [3.8, -8.4, '#E39A2C'], [7.4, -7.6, '#5E8A5A']].map(([x, z, l], i) => (
        <PlatHuis key={i} position={[x as number, 0, z as number]} b={3.4} h={2.6 + (i % 3) * 0.6} kleur={['#D8C7A2', '#CDB994', '#E2D2AE'][i % 3]} luifel={l as string | undefined} />
      ))}
      <MinaretVer position={[-18, 0, -48]} />
      <MinaretVer position={[24, 0, -60]} h={12} />
      <Palm position={[-9.5, 0, -4.5]} schaal={0.9} />
      <Palm position={[10, 0, -5.2]} />
      {menigte && <Menigte n={14} z={-4.4} x0={-7.5} t={t} />}
      {[[-4.2, -2.2], [4.6, -2.6]].map(([x, z], i) => <group key={i} position={[x, 0, z]}><Blok p={[0, 0.35, 0]} s={[0.9, 0.7, 0.6]} c="#8A6A3A" /><Blok p={[0, 0.78, 0]} s={[0.7, 0.16, 0.5]} c={i ? '#E39A2C' : '#B3542A'} /></group>)}
      <Strooisel n={40} straal={12} droog />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** Mansoura: een smalle straat langs z (x = 0), huizen aan beide kanten, poort op z = 7. `dicht` sluit zijpoorten. */
export const STRAAT_HUIZEN: [number, number, number][] = Array.from({ length: 12 }, (_, i) => [i % 2 ? 2.6 : -2.6, 4 - Math.floor(i / 2) * 3.3, 3 + ((i * 7) % 4) * 0.6]);
export const Straat = ({ children, over, tijd = 'dag', cam = [0.6, 2.2, 10, 0.4, 2.0, 7.6], kijk = [0, 1.6, 0] as V3, duur = 160, poort = 1, scherpte = 2.6, fov = 38, daken }: DecorP & { poort?: number; daken?: ReactNode }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={[L.mist, 22, 120]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur="#C2A87A" />
      <Blok p={[0, 0.01, -6]} s={[2.4, 0.02, 30]} c="#B49A6E" rough={1} />
      {STRAAT_HUIZEN.map(([x, z, h], i) => (
        <PlatHuis key={i} position={[x + (x > 0 ? 0.25 : -0.25), 0, z]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]} b={3.2} h={h} d={2.4} kleur={['#D8C7A2', '#CDB994', '#E2D2AE', '#C9B48A'][i % 4]} luifel={i % 3 === 0 && z < -1 ? ['#B3312B', '#3E6B8A', '#E39A2C'][i % 4 % 3] : undefined} />
      ))}
      {/* poort op z = 7 */}
      {[-1, 1].map((k) => <Blok key={k} p={[k * 2.2, 2.4, 7]} s={[1.8, 4.8, 1.2]} c="#BFA87E" rough={1} />)}
      <Blok p={[0, 4.3, 7]} s={[2.6, 1.0, 1.2]} c="#BFA87E" rough={1} />
      {[-1, 1].map((k) => (
        <group key={`d${k}`} position={[k * 1.3, 0, 6.6]} rotation={[0, -k * poort * 1.4, 0]}>
          <Blok p={[-k * 0.65, 1.7, 0]} s={[1.3, 3.4, 0.14]} c="#6B4A2E" />
        </group>
      ))}
      {daken}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** Paleishal (geen gebedsruimte): zuilen, spitsbogen in de achterwand, tegelvloer, lampen. */
export const Paleis = ({ children, over, cam = [2.4, 2.4, 7.4, 1.6, 2.2, 6.0], kijk = [0, 1.7, 0] as V3, duur = 150, donker = false, scherpte = 3, fov = 34 }: DecorP & { donker?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={donker ? ['#120C08', 6, 24] : ['#4A3020', 10, 38]} over={over}>
      <Lucht boven={donker ? '#0E0A08' : '#2E1E14'} horizon={donker ? '#1E140C' : '#6A4A2E'} />
      {donker ? (
        <>
          <hemisphereLight args={['#5A4A3A', '#120C08', 0.4]} />
          <pointLight position={[0, 3.2, 1.6]} intensity={7} distance={10} color="#FF9A50" />
        </>
      ) : (
        <Binnenlicht zon={[-4, 9, 4]} kleur="#FFC680" />
      )}
      <Grond kleur="#8A7458" />
      {Array.from({ length: 8 }, (_, i) => Array.from({ length: 6 }, (_, j) => <Blok key={`${i}${j}`} p={[-3.5 + i, 0.005, -3.5 + j * 1.2]} s={[0.98, 0.01, 1.18]} c={(i + j) % 2 ? '#C9B48A' : '#3E6B6A'} rough={0.6} />))}
      <Blok p={[0, 3.2, -4]} s={[14, 6.4, 0.4]} c="#E2D2AE" />
      {[-3.6, 0, 3.6].map((x) => (
        <group key={x} position={[x, 0, -3.78]}>
          <Blok p={[0, 1.7, 0]} s={[1.6, 3.4, 0.05]} c={donker ? '#140E0A' : '#3A2A1E'} />
          <Blok p={[-0.42, 3.55, 0]} s={[0.9, 0.5, 0.05]} r={[0, 0, 0.6]} c={donker ? '#140E0A' : '#3A2A1E'} />
          <Blok p={[0.42, 3.55, 0]} s={[0.9, 0.5, 0.05]} r={[0, 0, -0.6]} c={donker ? '#140E0A' : '#3A2A1E'} />
          {!donker && Array.from({ length: 4 }, (_, i) => <Blok key={i} p={[0, 0.6 + i * 0.75, 0.02]} s={[1.6, 0.04, 0.03]} c="#6B4A2E" />)}
          {!donker && [-0.4, 0, 0.4].map((dx) => <Blok key={dx} p={[dx, 1.7, 0.02]} s={[0.04, 3.4, 0.03]} c="#6B4A2E" />)}
        </group>
      ))}
      <Blok p={[0, 5.2, -3.75]} s={[13, 0.4, 0.1]} c="#3E6B8A" />
      {[-5.4, -1.8, 1.8, 5.4].map((x) => (
        <group key={x} position={[x, 0, -3.0]}>
          <Blok p={[0, 2.6, 0]} s={[0.5, 5.2, 0.5]} c="#D8C9A8" />
          <Blok p={[0, 5.3, 0]} s={[0.75, 0.25, 0.75]} c="#C9B994" />
        </group>
      ))}
      <Blok p={[0, 0.02, 0.2]} s={[4.4, 0.03, 6.4]} c="#8E2A2A" />
      <Blok p={[0, 0.03, 0.2]} s={[3.8, 0.03, 5.8]} c="#A8364A" />
      {[-2.6, 2.6].map((x, i) => (
        <group key={x} position={[x, 3.6, -1.6]}>
          <Blok p={[0, 0.8, 0]} s={[0.02, 1.6, 0.02]} c="#3A2A1C" />
          <Blok p={[0, 0, 0]} s={[0.36, 0.3, 0.36]} c="#D8A945" metal={0.6} rough={0.3} />
          <Blok p={[0, -0.02, 0]} s={[0.22, 0.2, 0.22]} c="#FFC24A" emissive="#FF9A2A" />
          {!donker && i === 0 && <pointLight position={[0, -0.3, 0.6]} intensity={2.4} distance={7} color="#FFB060" />}
        </group>
      ))}
      {!donker && <Stofjes midden={[0, 2.4, -2.4]} n={20} breed={5} />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** Muren van Cairo / de citadel met een poort op x = 0 (z = -2), daken en verre minaretten erachter. */
export const Cairo = ({ children, over, tijd = 'dag', cam = [4, 2.6, 12, 2.6, 2.4, 9.6], kijk = [0, 2.2, -1] as V3, duur = 160, poort = 0, vlag = '#E0A93A', scherpte = 2.4, fov = 36, slingers = false }: DecorP & { poort?: number; vlag?: string; slingers?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  const muurK = '#C9B080';
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={[L.mist, 26, 150]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur="#CBB084" />
      <Berg position={[-30, 0, -70]} h={14} r={30} kleur="#B8A07A" />
      {[-1, 1].map((k) => (
        <group key={k}>
          <Blok p={[k * 6.2, 2.6, -2]} s={[9.6, 5.2, 1.4]} c={muurK} rough={1} />
          {Array.from({ length: 8 }, (_, i) => <Blok key={i} p={[k * (1.9 + i * 1.2), 5.45, -1.4]} s={[0.6, 0.5, 0.3]} c={muurK} rough={1} />)}
          <Blok p={[k * 1.9, 3.3, -2]} s={[1.6, 6.6, 1.8]} c="#BFA474" rough={1} />
          <Blok p={[k * 1.9, 6.8, -2]} s={[1.9, 0.4, 2.1]} c="#B39868" rough={1} />
          <Vaandel position={[k * 1.9, 7.0, -2]} kleur={vlag} t={t + k} h={2.2} staarten={false} />
        </group>
      ))}
      <Blok p={[0, 4.6, -2]} s={[2.4, 1.4, 1.4]} c={muurK} rough={1} />
      <Blok p={[0, 1.95, -2.2]} s={[2.2, 3.9, 0.6]} c="#2A1E14" />
      {[-1, 1].map((k) => (
        <group key={`d${k}`} position={[k * 1.1, 0, -1.4]} rotation={[0, k * poort * 1.5, 0]}>
          <Blok p={[-k * 0.55, 1.95, 0]} s={[1.1, 3.9, 0.14]} c="#6B4A2E" />
          {[0.8, 1.9, 3.0].map((y) => <Blok key={y} p={[-k * 0.55, y, 0.08]} s={[1.1, 0.1, 0.04]} c="#3A2A1C" metal={0.5} />)}
        </group>
      ))}
      {[[-8, -10, 4], [-3, -13, 5], [4, -11, 4.4], [9, -14, 3.6]].map(([x, z, h], i) => <PlatHuis key={i} position={[x, 0, z]} b={3.6} h={h} kleur={['#D8C7A2', '#CDB994', '#E2D2AE'][i % 3]} />)}
      <MinaretVer position={[-14, 0, -40]} h={16} />
      <MinaretVer position={[8, 0, -52]} h={13} />
      <Palm position={[-6, 0, 2.2]} schaal={0.9} />
      <Palm position={[7.2, 0, 1.4]} />
      {slingers && Array.from({ length: 14 }, (_, i) => <Blok key={i} p={[-6.5 + i, 4.2 - Math.sin((i / 13) * Math.PI) * 0.6, -1.2]} s={[0.3, 0.36, 0.02]} r={[0, 0, (i % 2) * 0.2 - 0.1]} c={['#3E8A4A', '#E9E2D2', '#E39A2C'][i % 3]} />)}
      <Strooisel n={50} straal={14} droog zMax={6} />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** Felucca (bootje met driehoekszeil) op de Nijl. */
export const Felucca = ({ position, rotation, t = 0 }: { position: V3; rotation?: V3; t?: number }) => (
  <group position={position} rotation={rotation}>
    <group position={[0, Math.sin(t * 2 + position[0]) * 0.04, 0]}>
      <Blok p={[0, 0.15, 0]} s={[0.7, 0.3, 2.0]} c="#6B4A2E" />
      <Blok p={[0, 1.2, 0.1]} s={[0.06, 2.0, 0.06]} c="#5A3B24" />
      <Blok p={[0, 1.3, -0.3]} s={[0.03, 1.6, 1.0]} r={[0.5, 0, 0]} c="#F2EAD8" />
    </group>
  </group>
);
/** De Nijl met het eiland Roda en het fort van de Bahri-mamelukken (van boven). */
export const Nijl = ({ children, over, cam = [6, 22, 26, 3, 16, 18], kijk = [0, 0, 0] as V3, duur = 170 }: DecorP) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={1.4} mist={['#E2D2AE', 40, 200]} over={over}>
      <Lucht boven="#8FB9DC" horizon="#F2DDB2" />
      <Daglicht zon={[-14, 22, 10]} kracht={2} bereik={30} />
      <Grond kleur="#C9AE7E" y={-0.6} />
      <group position={[0, -0.15, 0]} scale={[0.3, 1, 1]}>
        <Zee t={t} grootte={140} kleur="#3E7E98" golf={0.05} />
      </group>
      {[-1, 1].map((k) => <Blok key={k} p={[k * 34, 0.05, 0]} s={[47, 0.3, 200]} c="#C9AE7E" rough={1} />)}
      {[-1, 1].map((k) => Array.from({ length: 10 }, (_, i) => <Palm key={`${k}${i}`} position={[k * (12.5 + (i % 3)), 0, -40 + i * 9]} schaal={1.1} />))}
      <Blok p={[0, 0.2, 0]} s={[8, 0.5, 18]} c="#A8A060" rough={1} />
      <Blok p={[0, 0.3, 0]} s={[7, 0.3, 16]} c="#B8A86A" rough={1} />
      {/* fort */}
      {[[0, -3.6, 6.4, 0.6], [0, 3.6, 6.4, 0.6], [-3.2, 0, 0.6, 7.8], [3.2, 0, 0.6, 7.8]].map(([x, z, b, d], i) => <Blok key={i} p={[x, 1.3, z]} s={[b, 2.0, d]} c="#C9B080" rough={1} />)}
      {[[-3.2, -3.6], [3.2, -3.6], [-3.2, 3.6], [3.2, 3.6]].map(([x, z], i) => <Blok key={`t${i}`} p={[x, 1.8, z]} s={[1.2, 3.0, 1.2]} c="#BFA474" rough={1} />)}
      {[[-1, -1], [1.2, 0.8], [-0.6, 1.6]].map(([x, z], i) => <Blok key={`g${i}`} p={[x, 0.9, z]} s={[1.4, 1.2, 1.2]} c="#D8C7A2" rough={1} />)}
      <Vaandel position={[3.2, 3.3, -3.6]} kleur="#E0A93A" t={t} h={2} staarten={false} />
      <Felucca position={[-5.8, 0, 8 - ((t * 0.6) % 20)]} t={t} />
      <Felucca position={[6.2, 0, -10 + ((t * 0.5) % 20)]} rotation={[0, Math.PI, 0]} t={t} />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** Het strand bij Damiate: zee op -z, zand op +z. */
export const Strand = ({ children, over, cam = [4, 2.6, 9, 3, 2.3, 7], kijk = [0, 1.4, -2] as V3, duur = 160, schepen = true, tijd = 'dag' }: DecorP & { schepen?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.4} mist={[L.mist, 28, 170]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <group position={[0, -0.2, -60]}>
        <Zee t={t} grootte={140} golf={0.14} />
      </group>
      <Blok p={[0, -0.1, 30]} s={[200, 0.4, 60]} c="#DCC59A" rough={1} />
      <Blok p={[0, -0.12, -0.6]} s={[200, 0.3, 3]} c="#C9B07E" rough={1} />
      {schepen && [[-9, -14, 0.2], [-2, -20, -0.2], [6, -16, 0.4], [14, -24, 0], [-16, -26, 0.3]].map(([x, z, r], i) => <Zeilschip key={i} position={[x, -0.2, z]} rotation={[0, Math.PI / 2 + r, 0]} t={t + i} vlag={i % 2 ? '#2F4F9E' : '#ECE6D8'} schaal={0.9} />)}
      {!['nacht'].includes(tijd) && <Vogels meeuw n={4} y={8} z={-30} />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** Droge heuvels in Palestina (Ain Jalut), met de bron bij (bron[0], bron[1]). */
export const Heuvelland = ({ children, over, tijd = 'dag', cam = [6, 4, 16, 3, 3.2, 12], kijk = [0, 1.4, 0] as V3, duur = 160, bron, stof = false, scherpte = 2.2, fov = 36 }: DecorP & { bron?: [number, number]; stof?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={stof ? ['#B8A07A', 14, 90] : [L.mist, 26, 150]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur="#B8A06A" />
      <Heuvels kleur="#A08A5A" z={-50} />
      <Duinen kleur="#AE9862" z={-24} n={8} />
      {bron && (
        <group position={[bron[0], 0, bron[1]]}>
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.2, 14]} />
            <meshStandardMaterial color="#4A8EB0" roughness={0.15} />
          </mesh>
          {Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return <Blok key={i} p={[Math.sin(a) * 1.35, 0.15, Math.cos(a) * 1.35]} s={[0.5, 0.3, 0.4]} r={[0, a, 0]} c="#9A8C76" />;
          })}
          <Palm position={[1.6, 0, -1.2]} schaal={0.9} />
        </group>
      )}
      <Strooisel n={60} straal={16} droog />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** Krak des Chevaliers op zijn berg, poort op (0, 6.2, 3.4). */
export const Krak = ({ children, over, cam = [10, 6, 22, 7, 5.6, 17], kijk = [0, 7, 0] as V3, duur = 170, tijd = 'dag' }: DecorP) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  const steen = '#C9B48A';
  return (
    <Shot focus={kijk} scherpte={2} mist={[L.mist, 30, 170]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur="#9A9A5A" />
      <Heuvels kleur="#7E8A56" z={-60} />
      <Berg position={[0, 0, 0]} h={8} r={16} kleur="#6E7A4A" />
      <Blok p={[0, 3.0, 0]} s={[16, 6.0, 13]} c="#7A845A" rough={1} />
      <Blok p={[0, 6.0, 0]} s={[12, 1.2, 10]} c="#7E8A5E" rough={1} />
      {[[0, -4.2, 10, 0.8], [0, 4.2, 10, 0.8], [-5, 0, 0.8, 9], [5, 0, 0.8, 9]].map(([x, z, b, d], i) => <Blok key={i} p={[x, 7.6, z]} s={[b, 2.4, d]} c={steen} rough={1} />)}
      {[[-5, -4.2], [5, -4.2], [-5, 4.2], [5, 4.2], [0, 4.2]].map(([x, z], i) => (
        <mesh key={`t${i}`} position={[x, 8.2, z]} castShadow>
          <cylinderGeometry args={[0.9, 1.0, 3.6, 10]} />
          <meshStandardMaterial color="#BFA87E" roughness={1} flatShading />
        </mesh>
      ))}
      {[[0, -2, 6, 0.6], [0, 2, 6, 0.6], [-3, 0, 0.6, 4.6], [3, 0, 0.6, 4.6]].map(([x, z, b, d], i) => <Blok key={`b${i}`} p={[x, 8.8, z]} s={[b, 3.6, d]} c="#D2BE94" rough={1} />)}
      <Blok p={[0, 10.2, -1]} s={[2.4, 3.2, 2.4]} c="#D2BE94" rough={1} />
      <Blok p={[0, 7.2, 4.62]} s={[1.2, 1.6, 0.06]} c="#3A2A1C" />
      <Vaandel position={[0, 11.8, -1]} kleur="#ECE6D8" t={t} h={1.8} staarten={false} />
      <Vogels n={3} y={14} />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** Lichtgewicht ruiter voor legers (paard + ruiter in ~20 blokken), gezicht naar +z. */
export const MiniRuiter = ({ position, rotation, kleur = '#B3312B', soort = 'mameluk', t = 0, loopt = false, paard = '#6B4A30' }: { position: V3; rotation?: V3; kleur?: string; soort?: 'mameluk' | 'mongool' | 'ridder'; t?: number; loopt?: boolean; paard?: string }) => {
  const stap = loopt ? Math.sin(t * 9 + position[0] * 1.7 + position[2]) * 0.4 : 0;
  const hop = loopt ? Math.abs(stap) * 0.08 : 0;
  const huid = soort === 'ridder' ? '#E2B48E' : '#B98257';
  return (
    <group position={position} rotation={rotation}>
      <group position={[0, hop, 0]}>
        <Blok p={[0, 1.15, 0]} s={[0.6, 0.6, 1.5]} c={paard} />
        <Blok p={[0, 1.6, 0.75]} s={[0.36, 0.7, 0.36]} r={[-0.5, 0, 0]} c={paard} />
        <Blok p={[0, 1.95, 1.05]} s={[0.3, 0.3, 0.55]} c={paard} />
        <Blok p={[0, 1.2, -0.85]} s={[0.12, 0.6, 0.12]} r={[0.4, 0, 0]} c="#2A1E16" />
        <Blok p={[0, 1.5, 0]} s={[0.66, 0.08, 0.7]} c={soort === 'ridder' ? '#ECE6D8' : '#5A3B24'} />
        <Blok p={[0, 2.0, -0.05]} s={[0.46, 0.66, 0.32]} c={kleur} />
        <Blok p={[0, 2.55, -0.05]} s={[0.38, 0.38, 0.36]} c={huid} />
        {soort === 'mameluk' && <><Blok p={[0, 2.76, -0.06]} s={[0.44, 0.12, 0.42]} c="#F2EEE6" /><Blok p={[0, 2.9, -0.07]} s={[0.24, 0.22, 0.22]} c="#E39A2C" /></>}
        {soort === 'mongool' && <><Blok p={[0, 2.76, -0.06]} s={[0.44, 0.1, 0.42]} c="#6B4A30" /><Blok p={[0, 2.88, -0.06]} s={[0.3, 0.16, 0.3]} c="#8D8A84" metal={0.6} rough={0.4} /><Blok p={[0, 3.02, -0.06]} s={[0.05, 0.14, 0.05]} c="#B8912F" /></>}
        {soort === 'ridder' && <Blok p={[0, 2.62, -0.05]} s={[0.42, 0.46, 0.4]} c="#8D8A84" metal={0.7} rough={0.35} />}
        {soort === 'ridder' ? <Blok p={[0.32, 2.3, 0.6]} s={[0.05, 0.05, 2.2]} c="#6B4A2E" /> : <Blok p={[-0.3, 2.1, 0.1]} s={[0.04, 0.8, 0.12]} r={[0.2, 0, 0]} c="#6B4A2E" />}
      </group>
      {[[-0.2, 0.55, stap], [0.2, 0.55, -stap], [-0.2, -0.55, -stap], [0.2, -0.55, stap]].map(([x, z, r], i) => (
        <group key={i} position={[x, 0.9, z]} rotation={[r, 0, 0]}>
          <Blok p={[0, -0.45, 0]} s={[0.16, 0.9, 0.18]} c={paard} />
        </group>
      ))}
    </group>
  );
};
/** Een eskadron mini-ruiters, gezicht naar +z. */
export const Eskadron = ({ rijen = 3, kolommen = 8, afstand = 1.3, position = [0, 0, 0] as V3, rotation, t = 0, loopt = false, soort = 'mameluk' as 'mameluk' | 'mongool' | 'ridder', kleuren }: { rijen?: number; kolommen?: number; afstand?: number; position?: V3; rotation?: V3; t?: number; loopt?: boolean; soort?: 'mameluk' | 'mongool' | 'ridder'; kleuren?: string[] }) => {
  const k = kleuren ?? (soort === 'mongool' ? ['#7A2A24', '#5A3A2A', '#6A2E3A'] : soort === 'ridder' ? ['#2F4F9E', '#A8322B', '#ECE6D8'] : MAMELUK_TUNIEK);
  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: rijen }, (_, r) =>
        Array.from({ length: kolommen }, (_, c) => (
          <MiniRuiter key={`${r}-${c}`} position={[(c - (kolommen - 1) / 2) * afstand + (r % 2) * 0.4, 0, -r * afstand * 1.6]} kleur={k[(r * 3 + c) % k.length]} soort={soort} t={t} loopt={loopt} paard={['#6B4A30', '#3A2A20', '#8A6A44', '#5A3B24'][(r + c * 2) % 4]} />
        )),
      )}
    </group>
  );
};

/** Figuur te paard (volledig), gezicht van ruiter en paard naar +z. */
export const OpPaard = ({ position, rotation, t = 0, loopt = false, kleur = '#6B4A30', dek = '#E39A2C', children }: { position: V3; rotation?: V3; t?: number; loopt?: boolean; kleur?: string; dek?: string; children: ReactNode }) => (
  <group position={position} rotation={rotation}>
    <Paard rotation={[0, Math.PI, 0]} kleur={kleur} dek={dek} t={t} loopt={loopt} ruiter={children} />
  </group>
);

/* ================= kaart ================= */

type KS = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KS, b: KS, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opB(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
export const B_VER: KS = { lon: 37, lat: 39, h: 25, a: 13 };
export const B_ZUID: KS = { lon: 35, lat: 32.5, h: 12, a: 7 };
export const B_STEPPE: KS = { lon: 39, lat: 46.5, h: 13, a: 7 };
export const bk = (s: BPlaats, h = 7, a = 5, dx = 1): KS => ({ lon: BPLAATS[s][0], lat: BPLAATS[s][1], h, a, dx });
export const bp = (s: BPlaats): [number, number] => [BPLAATS[s][0], BPLAATS[s][1]];

const RouteB = ({ punten, p, kleur = ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opB(lon, lat, 0.52));
  const lengtes = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[2] - pts[i][2]));
  const totaal = lengtes.reduce((x, y) => x + y, 0);
  const blokjes: V3[] = [];
  let d = 0;
  for (let i = 0; i < lengtes.length; i++) {
    for (let s = 0; s < lengtes[i]; s += 0.26) {
      if ((d + s) / totaal > p) break;
      const q = s / lengtes[i];
      blokjes.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.52, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q]);
    }
    d += lengtes[i];
  }
  let rest = p * totaal;
  let kopPos: V3 = pts[0];
  for (let i = 0; i < lengtes.length; i++) {
    if (rest <= lengtes[i]) {
      const q = rest / lengtes[i];
      kopPos = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.52, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q];
      break;
    }
    rest -= lengtes[i];
    kopPos = pts[i + 1];
  }
  return (
    <>
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.11, 0.05, 0.11]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

/** Dikke pijl over de kaart (Mongools rood of mamluks geel), groeit met p; `stuit` buigt de punt terug. */
export const KaartPijl = ({ van, naar, p = 1, kleur = '#FF4A36', dik = 0.32, stuit = 0 }: { van: [number, number]; naar: [number, number]; p?: number; kleur?: string; dik?: number; stuit?: number }) => {
  const a = opB(van[0], van[1], 0.6);
  const b = opB(naar[0], naar[1], 0.6);
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  const L = Math.hypot(dx, dz) * Math.max(0.001, p);
  const hoek = Math.atan2(dx, dz);
  return (
    <group position={a} rotation={[0, hoek, 0]}>
      <Blok p={[0, 0, L / 2 - 0.2]} s={[dik, 0.16, Math.max(0.01, L - 0.4)]} c={kleur} emissive="#5A0E08" />
      <Blok p={[0, -0.04, L / 2 - 0.2]} s={[dik + 0.14, 0.12, Math.max(0.01, L - 0.3)]} c="#F4E6C0" />
      <group position={[0, 0, L - 0.25]} rotation={[0, stuit, 0]}>
        <Blok p={[0, 0, 0]} s={[dik * 2.6, 0.16, 0.3]} c={kleur} emissive="#5A0E08" />
        <Blok p={[0, 0, 0.22]} s={[dik * 1.6, 0.16, 0.22]} c={kleur} emissive="#5A0E08" />
        <Blok p={[0, 0, 0.4]} s={[dik * 0.7, 0.16, 0.18]} c={kleur} emissive="#5A0E08" />
      </group>
    </group>
  );
};

export const KaartB = ({ van, naar, wissel = [20, 70], cam = [B_VER, B_VER], camDuur = 150, spelden = [], route, routeTijd = [10, 120], routeKleur, kop, licht, over, children }: {
  van: Record<string, BStand>;
  naar?: Record<string, BStand>;
  wissel?: [number, number];
  cam?: [KS, KS];
  camDuur?: number;
  spelden?: [BPlaats, string][];
  route?: [number, number][];
  routeTijd?: [number, number];
  routeKleur?: string;
  kop?: ReactNode;
  licht?: string[];
  over?: ReactNode;
  children?: ReactNode;
}) => {
  const f = useCurrentFrame();
  const c = kaartCam(cam[0], cam[1], ease(f, 0, camDuur, 0, 1));
  const gloed = licht ? (Math.sin(f / 5) + 1) / 2 : 0;
  return (
    <Shot focus={c.kijk} scherpte={2} over={<>{over}<KaartVoet /></>}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={c.pos} kijk={c.kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <KaarttafelBaibars van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldB key={s} lon={BPLAATS[s][0]} lat={BPLAATS[s][1]} kleur={k} />)}
      {route && <RouteB punten={route} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={kop} kleur={routeKleur} />}
      {children}
    </Shot>
  );
};
const KaartVoet = () => (
  <div style={{ position: 'absolute', right: 60, bottom: 26, fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: 'rgba(255,244,224,0.7)' }}>modern borders, approximate</div>
);
/** Plaatsnaam op de kaart (2D-label op een vaste schermpositie gaat mis bij een rijdende camera; daarom 3D). */
export const KaartNaam = ({ plaats, tekst, dx = 0.9, dz = 0 }: { plaats: BPlaats; tekst: string; dx?: number; dz?: number }) => {
  const [x, , z] = opB(BPLAATS[plaats][0], BPLAATS[plaats][1]);
  const b = 0.24 * tekst.length + 0.3;
  return <TekstVlak regels={[tekst]} b={b} h={0.46} achter="#F4E6C0" voor="#3A2418" position={[x + dx + b / 2, 0.75, z + dz]} rotation={[-1.0, 0, 0]} fontPx={180} />;
};
export const MiniBaibars = ({ kind = false }: { kind?: boolean }) => <Baibars leeftijd={kind ? 'kind' : 'man'} scale={kind ? 0.18 : 0.22} rotation={[0, 0.4, 0]} />;
export const MiniKaravaan = () => {
  const f = useCurrentFrame();
  return (
    <group rotation={[0, 0.8, 0]}>
      <group scale={0.22}><KameelK t={f / FPS} /></group>
      <Baibars leeftijd="kind" scale={0.14} position={[0.32, 0, 0.1]} />
    </group>
  );
};

/* kameel uit Decor, met een chagrijnige wenkbrauw (zin 14) */
export const KameelK = ({ t = 0, position, rotation, loopt = true }: { t?: number; position?: V3; rotation?: V3; loopt?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Kameel t={t} loopt={loopt} rotation={[0, Math.PI, 0]} />
    {[-1, 1].map((k) => <Blok key={k} p={[k * 0.12, 3.42, 1.42]} s={[0.12, 0.03, 0.03]} r={[0, 0, k * 0.4]} c="#3A2418" />)}
  </group>
);

/* ================= 2D ================= */

/** Jaarteller (geen duizendtal-komma, anders dan TelTeller). */
export const JaarTeller = ({ label, van, tot, a = 6, b = 60, pil }: { label: string; van: number; tot: number; a?: number; b?: number; pil?: string }) => {
  const f = useCurrentFrame();
  return <LangTeller label={label} waarde={String(Math.round(ease(f, a, b, van, tot)))} pil={pil} />;
};

/** Bord in het midden boven ("MAMLUK = 'OWNED'"). */
export const Bord2D = ({ tekst, sub, vanaf = 6, top = 120 }: { tekst: string; sub?: string; vanaf?: number; top?: number }) => {
  const f = useCurrentFrame();
  const o = lin(f, vanaf, vanaf + 8, 0, 1);
  const s = ease(f, vanaf, vanaf + 12, 0.9, 1);
  return (
    <div style={{ position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: o, transform: `scale(${s})` }}>
      <div style={{ background: 'rgba(28,26,22,0.86)', border: `3px solid ${ORANJE}`, borderRadius: 18, padding: '14px 44px 18px', textAlign: 'center' }}>
        <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 70, color: '#FFF4E0', letterSpacing: 2 }}>{tekst}</div>
        {sub && <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, color: ORANJE, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
};
/** Uitroeptekens die over de wereldkaart opspringen (zin 68) — als 3D-blokjes. */
export const Uitroep = ({ p, vanaf = 0, kleur = '#F2C25A' }: { p: V3; vanaf?: number; kleur?: string }) => {
  const f = useCurrentFrame();
  const s = lin(f, vanaf, vanaf + 6, 0, 1);
  if (s <= 0) return null;
  return (
    <group position={p} scale={s * (1 + Math.max(0, Math.sin((f - vanaf) / 3)) * 0.1)}>
      <Blok p={[0, 0.7, 0]} s={[0.2, 0.8, 0.2]} c={kleur} emissive="#8A5A12" />
      <Blok p={[0, 0.12, 0]} s={[0.2, 0.2, 0.2]} c={kleur} emissive="#8A5A12" />
    </group>
  );
};
void Heuvels;
