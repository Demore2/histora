import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import {
  Avondlicht,
  Banier,
  Bed,
  Binnenlicht,
  Camera,
  Daglicht,
  Duinen,
  Fakkel,
  Grond,
  Heuvels,
  Kameel,
  Ketting,
  Koepelkerk,
  Leger,
  Lucht,
  Menigte,
  Moskee,
  Nachtlicht,
  Paard,
  Piramide,
  Rivier,
  Rook,
  Rots,
  Sokkel,
  Tent,
  Vuur,
  Zee,
  Zon,
} from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, BRONS, Figuur, Kroon, omhoog, PAUS, Rol, wijs, Zwaard, type Kleding, type Pose, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { Kaarttafel, Speld } from './Kaarttafel';
import { KaarttafelMO, opMO, SpeldMO, STAD, type MOStand, type StadNaam } from './KaarttafelMO';
import { Zeilschip, Schilderijlijst } from './LangDecor';
import { GroteTitel, JaarLabel, LangTeller, ORANJE, SERIF } from './LangHud';

/**
 * Scènes voor "Saladin" (lange video #02). Generieke decors + kleine scènes per zin.
 * Gevoelig, bewust: geen kruizen op kruisvaarders, geen heilige plaatsen van dichtbij (de Rotskoepel
 * komt niet in beeld; Mekka en Medina alleen als route op de kaart), geen geweld in beeld (het doden
 * van Reynald en van de gevangenen blijft buiten beeld).
 */

/* ---------------- personages ---------------- */

export const SALADIN: Kleding = { huid: '#B98257', haar: '#17110D', tuniek: '#EDE4D0', borst: '#7E8088', benen: '#5A4632', schoenen: '#3A2A1C', cape: '#C99A2E', riem: '#F4EEE2' };
export const SALADIN_HOF: Kleding = { ...SALADIN, borst: undefined, rok: '#EDE4D0' };
export const YUSUF: Kleding = { huid: '#C28C60', haar: '#17110D', tuniek: '#E9DFC8', rok: '#E9DFC8', benen: '#E9DFC8', schoenen: '#5A4030', riem: '#E9DFC8' };
export const SHIRKUH: Kleding = { huid: '#B07A4E', haar: '#1A1210', tuniek: '#5A4A36', borst: '#7E8088', benen: '#4A3A2E', schoenen: '#3A2A1C', cape: '#3E5A3A', riem: '#3E5A3A' };
export const NUR: Kleding = { huid: '#C9925F', haar: '#B9B4AA', tuniek: '#2E4A30', rok: '#2E4A30', schoenen: '#2A1E16', cape: '#1E3420', riem: '#ECE6D8' };
export const SARACEEN: Kleding = { huid: '#B07A4E', haar: '#1A1210', tuniek: '#E2D6BC', borst: '#7E8088', benen: '#6B5236', schoenen: '#3A2A1C', riem: '#E2D6BC' };
export const HOVELING: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#6A4E8A', rok: '#6A4E8A', schoenen: '#2A1E16', riem: '#ECE6D8' };
export const KALIEF: Kleding = { huid: '#D0A07A', haar: '#2A1E16', tuniek: '#ECE6D8', rok: '#ECE6D8', schoenen: '#B8912F', cape: '#5A3E86', riem: '#ECE6D8' };
export const RIDDER: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#ECE6D8', borst: '#8D8A84', benen: '#8D8A84', schoenen: '#4A4A4E', riem: '#5A3B24' };
export const GUY: Kleding = { ...RIDDER, tuniek: '#2F4F8E', cape: '#8E1F2A', haar: '#8A6A40' };
export const REYNALD: Kleding = { ...RIDDER, tuniek: '#3A2A3A', cape: '#1E1A1E', haar: '#4A3A2C' };
export const BALIAN: Kleding = { ...RIDDER, tuniek: '#3E6A9A', haar: '#3A2A1E' };
export const BOUDEWIJN: Kleding = { ...RIDDER, huid: '#E8D2BE', haar: '#C9A060', tuniek: '#F2EEE6', cape: '#2F4F8E' };
export const RICHARD: Kleding = { ...RIDDER, tuniek: '#A8322B', cape: '#7A1E1A', haar: '#B5652E', riem: '#C9A646' };
export const FILIPS: Kleding = { ...RIDDER, tuniek: '#2F4F9E', cape: '#1E2E6E', haar: '#5A4030' };
export const BARBAROSSA: Kleding = { ...RIDDER, tuniek: '#C9A646', cape: '#2A2A2A', haar: '#B5522E' };
export const BURGER: Kleding = { huid: '#E2B48E', haar: '#5A4030', tuniek: '#8A6A4A', rok: '#8A6A4A', schoenen: '#3A2A1C' };
export const VROUW: Kleding = { huid: '#E2B48E', haar: '#3A2A1E', tuniek: '#5A6A8A', rok: '#5A6A8A', schoenen: '#3A2A1C' };
export const OUDJE: Kleding = { huid: '#D9AE8A', haar: '#B9B4AA', tuniek: '#6A5A4A', rok: '#6A5A4A', schoenen: '#3A2A1C' };
export const MONNIK: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#4A3A2E', rok: '#4A3A2E', schoenen: '#2A1E16' };
export const DANTE: Kleding = { huid: '#E2B48E', haar: '#3A2A1E', tuniek: '#9E2A24', rok: '#9E2A24', schoenen: '#3A2A1C', cape: '#7A1E1A' };
export const AL_ADIL: Kleding = { ...SALADIN_HOF, cape: '#5E8A5A', riem: '#5E8A5A' };

const SAL = { kleding: SALADIN, hoofddeksel: 'tulband' as const, baard: true };
const SAL_HOF = { kleding: SALADIN_HOF, hoofddeksel: 'tulband' as const, baard: true };
export const kroonOp = (x: number, y: number, z: number, s = 1) => <Kroon position={[x, y + 2.28 * s, z]} />;

/* ---------------- decors ---------------- */

export const Woestijn = ({ avond = false }: { avond?: boolean }) => (
  <>
    <Lucht boven={avond ? '#3E2E52' : '#8FB4D8'} horizon={avond ? '#F0904A' : '#F2DDB2'} />
    {avond ? <Avondlicht /> : <Daglicht zon={[-10, 14, 8]} />}
    {avond && <Zon position={[-30, 6, -110]} grootte={12} kleur="#FFB070" />}
    <Grond kleur="#D2AE74" />
    <Duinen kleur="#C9A266" />
  </>
);

/** Stadsmuur met torens en een poort op z = 0 (gevel naar +z). */
export const Muur = ({ kleur = '#CDB894', open = 0, bres = false, vlag }: { kleur?: string; open?: number; bres?: boolean; vlag?: string }) => (
  <group>
    {[-1, 1].map((k) => (
      <group key={k}>
        <Blok p={[k * 7.5, 2.5, 0]} s={[11, 5, 1.6]} c={kleur} rough={0.95} />
        {Array.from({ length: 6 }, (_, i) => <Blok key={i} p={[k * (2.8 + i * 1.8), 5.25, 0.55]} s={[0.8, 0.5, 0.5]} c={kleur} />)}
        <Blok p={[k * 2.4, 3.2, 0.2]} s={[2.0, 6.4, 2.2]} c={kleur} rough={0.95} />
      </group>
    ))}
    <Blok p={[0, 4.9, 0]} s={[2.8, 1.0, 1.6]} c={kleur} />
    <Blok p={[-0.7 - open * 0.9, 2.0, 0.65]} s={[1.4, 4.0, 0.12]} c="#5A3B24" r={[0, open * 1.3, 0]} />
    <Blok p={[0.7 + open * 0.9, 2.0, 0.65]} s={[1.4, 4.0, 0.12]} c="#5A3B24" r={[0, -open * 1.3, 0]} />
    {bres && (
      <>
        <Blok p={[-7, 0.6, 1.4]} s={[3, 1.2, 2]} c={kleur} r={[0.2, 0.3, 0.1]} />
        <Blok p={[-6.2, 0.4, 2.4]} s={[1.4, 0.8, 1.2]} c={kleur} r={[0.4, 0.8, 0.2]} />
      </>
    )}
    {vlag && <Banier position={[2.4, 6.4, 0.2]} kleur={vlag} />}
  </group>
);

/** Muur met een gat (bres): de linkerhelft heeft een opening. */
const BresMuur = ({ kleur = '#CDB894' }: { kleur?: string }) => (
  <group>
    <Blok p={[4, 2.5, 0]} s={[12, 5, 1.6]} c={kleur} rough={0.95} />
    <Blok p={[-9, 2.5, 0]} s={[6, 5, 1.6]} c={kleur} rough={0.95} />
    <Blok p={[-4.5, 0.4, 0]} s={[3, 0.8, 1.6]} c={kleur} />
    <Blok p={[-4.8, 0.5, 1.8]} s={[2.4, 1.0, 1.6]} c={kleur} r={[0.3, 0.5, 0.2]} />
    <Blok p={[-3.4, 0.3, 2.6]} s={[1.2, 0.6, 1.0]} c={kleur} r={[0.5, 0.2, 0.4]} />
  </group>
);

/** Stadssilhouet: blokhuizen met platte daken, een paar koepels. */
export const Stad = ({ z = -14, koepels = true, kleur = '#E6D6B6' }: { z?: number; koepels?: boolean; kleur?: string }) => (
  <group position={[0, 0, z]}>
    {Array.from({ length: 18 }, (_, i) => {
      const x = -17 + i * 2;
      const h = 2 + ((i * 7) % 5) * 0.7;
      return <Blok key={i} p={[x, h / 2, ((i * 5) % 3) * -1.2]} s={[1.8, h, 1.8]} c={i % 3 ? kleur : '#D8C6A2'} />;
    })}
    {koepels && <Moskee position={[4, 0, -6]} />}
  </group>
);

/** Paleishal: zuilen, tapijt, troon achterin. */
export const Hal = ({ troon = true }: { troon?: boolean }) => (
  <>
    <Lucht boven="#3A2A20" horizon="#5A4432" />
    <Binnenlicht zon={[3, 12, 6]} kleur="#FFE2B8" />
    <pointLight position={[0, 6, 3]} intensity={10} distance={18} color="#FFD8A0" />
    <Grond kleur="#C9B48E" />
    <Blok p={[0, 0.02, 0]} s={[3, 0.04, 14]} c="#8E1F2A" />
    <Blok p={[0, 4, -6]} s={[18, 8, 0.6]} c="#DCCAA6" />
    {[-1, 1].map((k) => [-4, 0, 4].map((z) => <Blok key={`${k}${z}`} p={[k * 3.6, 3, z - 1]} s={[0.7, 6, 0.7]} c="#E8DCC2" />))}
    {troon && (
      <>
        <Blok p={[0, 0.3, -4.6]} s={[3, 0.6, 2]} c="#6A4E2E" />
        <Blok p={[0, 1.6, -5.3]} s={[1.6, 2.6, 0.3]} c="#B8912F" metal={0.5} rough={0.4} />
      </>
    )}
  </>
);

/** Binnenkant van een tent. */
export const TentBinnen = ({ nacht = false }: { nacht?: boolean }) => (
  <>
    <Lucht boven="#3A2A1A" horizon="#5A4028" />
    <hemisphereLight args={['#FFD8A0', '#3A2A1A', nacht ? 0.35 : 0.7]} />
    <pointLight position={[0, 3.2, 1]} intensity={nacht ? 8 : 12} distance={12} color="#FFB868" />
    <Grond kleur="#7A5A3A" />
    <Blok p={[0, 0.02, 0]} s={[6, 0.04, 4]} c="#8E2A24" />
    <Blok p={[0, 2.5, -3]} s={[12, 5, 0.1]} c="#D9C8A4" />
    <Blok p={[-5, 2.5, 0]} s={[0.1, 5, 8]} c="#CDBB96" />
    <Blok p={[5, 2.5, 0]} s={[0.1, 5, 8]} c="#CDBB96" />
    <Blok p={[0, 5, 0]} s={[12, 0.1, 8]} c="#C2AE88" />
  </>
);

/** Kamer bij nacht met kaars (lezen, ziekbed). */
const Kamer = () => (
  <>
    <Lucht boven="#120C08" horizon="#1E1610" />
    <hemisphereLight args={['#6A5A48', '#1A120C', 0.4]} />
    <Grond kleur="#3A2A20" />
    <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#5A4232" />
    <Blok p={[-2.6, 3.4, -2.2]} s={[1.0, 1.6, 0.1]} c="#1E2A3A" />
    <Blok p={[1.4, 1.06, 0.3]} s={[0.08, 0.24, 0.08]} c="#F2EAD8" />
    <Blok p={[1.4, 1.22, 0.3]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
    <Blok p={[1.0, 0.45, 0.3]} s={[1.4, 0.9, 0.8]} c="#5A3B24" />
    <pointLight position={[1.4, 1.5, 0.5]} intensity={6} distance={6} color="#FFA850" />
  </>
);

/** Ruiter: figuur op een paard. */
export const Ruiter = ({ k, position, rotation, t = 0, loopt = false, kleur = '#7A5A3A', dek = '#C99A2E', pose, hoofddeksel = 'tulband', baard = true, inHand }: { k: Kleding; position: V3; rotation?: V3; t?: number; loopt?: boolean; kleur?: string; dek?: string; pose?: Pose; hoofddeksel?: 'tulband' | 'helm' | null; baard?: boolean; inHand?: ReactNode }) => (
  <Paard position={position} rotation={rotation} kleur={kleur} dek={dek} t={t} loopt={loopt} ruiter={<Figuur kleding={k} hoofddeksel={hoofddeksel} baard={baard} pose={{ hoofd: [0, -0.8, 0], ...pose }} inHand={inHand} />} />
);

const Beker = () => <Blok p={[0, 0, 0.08]} s={[0.14, 0.2, 0.14]} c="#C9CDD2" metal={0.7} rough={0.3} />;
const Munt = ({ p, goud = true }: { p: V3; goud?: boolean }) => <Blok p={p} s={[0.16, 0.03, 0.16]} c={goud ? '#E2BE58' : '#C9CDD2'} metal={0.8} rough={0.25} />;

/** Citaat in het midden van het beeld. */
export const Citaat = ({ tekst, wie }: { tekst: string; wie?: string }) => {
  const f = useCurrentFrame();
  const o = lin(f, 6, 18, 0, 1);
  return (
    <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', opacity: o }}>
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 78, color: '#FFF4E0', textShadow: '0 4px 18px rgba(0,0,0,0.8)' }}>“{tekst}”</div>
      {wie && <div style={{ fontFamily: SERIF, fontSize: 30, letterSpacing: 4, color: ORANJE, marginTop: 10, textTransform: 'uppercase', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{wie}</div>}
    </div>
  );
};

/* ---------------- kaart ---------------- */

type KS = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KS, b: KS, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opMO(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
const VER: KS = { lon: 38, lat: 31.5, h: 24, a: 13 };

const RouteMO = ({ punten, p, kleur = ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opMO(lon, lat, 0.5));
  const lengtes = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[2] - pts[i][2]));
  const totaal = lengtes.reduce((x, y) => x + y, 0);
  const blokjes: V3[] = [];
  let d = 0;
  for (let i = 0; i < lengtes.length; i++) {
    for (let s = 0; s < lengtes[i]; s += 0.32) {
      if ((d + s) / totaal > p) break;
      const q = s / lengtes[i];
      blokjes.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q]);
    }
    d += lengtes[i];
  }
  let rest = p * totaal;
  let kopPos: V3 = pts[0];
  for (let i = 0; i < lengtes.length; i++) {
    if (rest <= lengtes[i]) {
      const q = rest / lengtes[i];
      kopPos = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q];
      break;
    }
    rest -= lengtes[i];
    kopPos = pts[i + 1];
  }
  return (
    <>
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.14, 0.06, 0.14]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

export type KaartProps = {
  van: Record<string, MOStand>;
  naar?: Record<string, MOStand>;
  wissel?: [number, number];
  cam?: [KS, KS];
  camDuur?: number;
  spelden?: [StadNaam, string][];
  route?: [number, number][];
  routeTijd?: [number, number];
  kop?: ReactNode;
  licht?: string[];
  over?: ReactNode;
};
export const Kaart = ({ van, naar, wissel = [20, 70], cam = [VER, VER], camDuur = 150, spelden = [], route, routeTijd = [10, 120], kop, licht, over }: KaartProps) => {
  const f = useCurrentFrame();
  const c = kaartCam(cam[0], cam[1], ease(f, 0, camDuur, 0, 1));
  const gloed = licht ? (Math.sin(f / 5) + 1) / 2 : 0;
  return (
    <Shot focus={c.kijk} scherpte={2} over={over}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={c.pos} kijk={c.kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <KaarttafelMO van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldMO key={s} lon={STAD[s][0]} lat={STAD[s][1]} kleur={k} />)}
      {route && <RouteMO punten={route} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={kop} />}
    </Shot>
  );
};
export const ks = (s: StadNaam, h = 7, a = 7, dx = 1.5): KS => ({ lon: STAD[s][0], lat: STAD[s][1], h, a, dx });
export const MiniSal = () => <Figuur {...SAL} scale={0.22} rotation={[0, 0.4, 0]} />;
export const MiniRidder = () => <Figuur kleding={RIDDER} hoofddeksel="helm" scale={0.22} rotation={[0, -0.4, 0]} />;
export const MiniSchip = () => <Zeilschip schaal={0.12} rotation={[0, Math.PI / 2, 0]} vlag="#A8322B" />;

/** Europa (de schok, de derde kruistocht). */
export const KaartEuropa = ({ over }: { over?: ReactNode }) => {
  const f = useCurrentFrame();
  const g = (Math.sin(f / 4) + 1) / 2;
  return (
    <Shot focus={[0, 0.3, 0]} scherpte={1.6} over={over}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={[ease(f, 0, 150, 1, 3), ease(f, 0, 150, 26, 20), ease(f, 0, 150, 15, 12)]} kijk={[0, 0.3, 1]} fov={38} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <Kaarttafel van={{}} licht={(r) => ['France', 'United Kingdom', 'Germany', 'Italy'].includes(r.naam)} gloed={g} />
      <Speld lon={2.35} lat={48.86} kleur="#2F5FA8" />
      <Speld lon={-0.13} lat={51.5} kleur="#A8322B" />
      <Speld lon={12.5} lat={41.9} kleur="#ECE6D8" />
      <Speld lon={11.0} lat={50.0} kleur="#C9A646" />
    </Shot>
  );
};

/* ---------------- teaser ---------------- */

export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.006 : 0;
  return (
    <Shot focus={[0, 2.6, 0]} scherpte={3} mist={['#9A5A3A', 18, 110]} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="SALADIN?" /> : undefined}>
      <Woestijn avond />
      <Camera pos={[1.6 + schok, 2.0 + schok, ease(f, 0, 60, 8.4, 7.4)]} kijk={[0, 2.7, 0]} fov={36} />
      <Leger rijen={3} kolommen={10} kleur="#E2D6BC" schild="#C99A2E" position={[0, 0, -9]} t={t} />
      <Banier position={[-2.6, 0, -2]} kleur="#C99A2E" t={t} />
      <Banier position={[2.8, 0, -2.6]} kleur="#C99A2E" t={t + 1} />
      <Ruiter k={SALADIN} position={[0, 0, 0.3]} rotation={[0, 0.3, 0]} t={t} kleur="#ECE6D8" pose={{ armR: omhoog(), hoofd: [0, -0.5, 0], wenk: 0.6 }} inHand={<Zwaard />} />
    </Shot>
  );
};

/** "Saladin" titelkaart. */
export const T5_Titel = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={2.5} mist={['#E8C89A', 30, 160]} over={<GroteTitel boven="THE LIFE OF" naam="SALADIN" onder="from Tikrit to Jerusalem" />}>
      <Woestijn avond />
      <Camera pos={[ease(f, 0, 200, 4.4, 3.4), 2.0, ease(f, 0, 200, 9.4, 8.2)]} kijk={[0, 3.4, 0]} fov={34} />
      <Rots position={[0, -1, -1]} schaal={[4, 2, 3]} kleur="#B48A5A" />
      <Figuur {...SAL} position={[0, 0.98, -0.4]} rotation={[0, 0.5, 0]} pose={ARMEN_GEKRUIST} />
    </Shot>
  );
};

/* ---------------- generieke scènes ---------------- */

/** Iemand in een woestijn / landschap met optionele bijfiguren; camera duwt langzaam in. */
export const Portret = ({ wie, extra, avond, over, cam = 1, pose, ver = 1, kijkY = 1.9 }: { wie: ReactNode; extra?: ReactNode; avond?: boolean; over?: ReactNode; cam?: number; pose?: never; ver?: number; kijkY?: number }) => {
  const f = useCurrentFrame();
  void pose;
  return (
    <Shot focus={[0, kijkY, 0]} scherpte={3.2 / ver} mist={avond ? ['#9A6A4A', 14 * ver, 90 * ver] : ['#E6D2AE', 16 * ver, 100 * ver]} over={over}>
      <Woestijn avond={avond} />
      <Camera pos={[ease(f, 0, 150, 1.6 * cam, 0.9 * cam) * ver, 2.0 + (ver - 1) * 1.2, ease(f, 0, 150, 6.6, 5.6) * ver]} kijk={[0, kijkY, 0]} fov={34} />
      {wie}
      {extra}
    </Shot>
  );
};

/** In een paleishal. */
export const InHal = ({ children, over, kijk = [0, 1.8, -1] as V3, van = [2.6, 2.6, 7.6] as V3, naar = [1.4, 2.3, 6.2] as V3 }: { children: ReactNode; over?: ReactNode; kijk?: V3; van?: V3; naar?: V3 }) => {
  const f = useCurrentFrame();
  const p = ease(f, 0, 150, 0, 1);
  return (
    <Shot focus={kijk} scherpte={3} mist={['#3A2A20', 14, 60]} over={over}>
      <Hal />
      <Camera pos={[van[0] + (naar[0] - van[0]) * p, van[1] + (naar[1] - van[1]) * p, van[2] + (naar[2] - van[2]) * p]} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** In een tent. */
export const InTent = ({ children, over, nacht, kijk = [0, 1.6, 0] as V3 }: { children: ReactNode; over?: ReactNode; nacht?: boolean; kijk?: V3 }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3.4} mist={['#2A1E14', 8, 30]} over={over}>
      <TentBinnen nacht={nacht} />
      <Camera pos={[ease(f, 0, 150, 1.8, 1.0), 2.1, ease(f, 0, 150, 6.8, 6.0)]} kijk={[kijk[0], kijk[1] + 0.25, kijk[2]]} fov={34} />
      {children}
    </Shot>
  );
};

/** In een kamer bij kaarslicht. */
export const InKamer = ({ children, over, kijk = [0.4, 1.1, 0] as V3 }: { children: ReactNode; over?: ReactNode; kijk?: V3 }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={4} mist={['#1A120C', 5, 18]} over={over}>
      <Kamer />
      <Camera pos={[ease(f, 0, 120, 2.8, 2.4), 2.0, ease(f, 0, 120, 4.6, 4.0)]} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** Voor een stadsmuur (Jeruzalem, Akko, Damascus). */
export const VoorMuur = ({ children, over, open = 0, bres = false, vlag, avond = false, kleur, stad = true, cam = [3, 3.2, 14, 2, 2.4, 11] }: { children?: ReactNode; over?: ReactNode; open?: number; bres?: boolean; vlag?: string; avond?: boolean; kleur?: string; stad?: boolean; cam?: number[] }) => {
  const f = useCurrentFrame();
  const p = ease(f, 0, 160, 0, 1);
  return (
    <Shot focus={[0, 1.6, 4]} scherpte={2.4} mist={avond ? ['#7A4A3A', 20, 120] : ['#E6D2AE', 24, 130]} over={over}>
      <Lucht boven={avond ? '#4A2E3A' : '#8FB4D8'} horizon={avond ? '#E07A4A' : '#F2DDB2'} />
      {avond ? <Avondlicht /> : <Daglicht zon={[-10, 14, 10]} />}
      <Grond kleur="#C8AC7A" />
      <Camera pos={[cam[0] + (cam[3] - cam[0]) * p, cam[1] + (cam[4] - cam[1]) * p, cam[2] + (cam[5] - cam[2]) * p]} kijk={[0, 2.2, 0]} fov={36} />
      <Muur open={open} bres={bres} vlag={vlag} kleur={kleur} />
      {stad && <Stad z={-6} />}
      {children}
    </Shot>
  );
};

/** Slagveld op droge heuvels. */
export const Slagveld = ({ children, over, rook = false, cam = [6, 4, 16, 3, 3.2, 12], kijk = [0, 1.4, 0] as V3, avond = false, groen = false }: { children?: ReactNode; over?: ReactNode; rook?: boolean; cam?: number[]; kijk?: V3; avond?: boolean; groen?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const p = ease(f, 0, 160, 0, 1);
  return (
    <Shot focus={kijk} scherpte={2.2} mist={rook ? ['#8A7A6A', 8, 60] : avond ? ['#8A5A3A', 20, 110] : ['#E6D2AE', 24, 130]} over={over}>
      <Lucht boven={avond ? '#4A2E3A' : rook ? '#8A7E70' : '#9CBCD8'} horizon={avond ? '#E07A4A' : rook ? '#C8AE8A' : '#F2DDB2'} />
      {avond ? <Avondlicht /> : <Daglicht zon={[-10, 14, 8]} kracht={rook ? 1.4 : 2} />}
      <Grond kleur={groen ? '#9AA06A' : '#BFA06A'} />
      <Heuvels kleur={groen ? '#7E8A56' : '#A88A5A'} />
      <Camera pos={[cam[0] + (cam[3] - cam[0]) * p, cam[1] + (cam[4] - cam[1]) * p, cam[2] + (cam[5] - cam[2]) * p]} kijk={kijk} fov={36} />
      {children}
      {rook && [-9, -3, 4, 10].map((x, i) => <Rook key={i} position={[x, 0, -12 - i]} t={t + i} kleur="#6A5E52" />)}
    </Shot>
  );
};

/** Haven / zee met schepen. */
export const Haven = ({ children, over, avond = false, cam = [4, 2.4, 10, 2, 2.2, 8] }: { children?: ReactNode; over?: ReactNode; avond?: boolean; cam?: number[] }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const p = ease(f, 0, 160, 0, 1);
  return (
    <Shot focus={[0, 1.4, 0]} scherpte={2.4} mist={avond ? ['#8A5A4A', 30, 160] : ['#C8D4DC', 30, 160]} over={over}>
      <Lucht boven={avond ? '#3E2E52' : '#8FB4D8'} horizon={avond ? '#F0904A' : '#E2E6E2'} />
      {avond ? <Avondlicht /> : <Daglicht zon={[-10, 14, 8]} />}
      {avond && <Zon position={[0, 4, -120]} grootte={12} kleur="#FFB070" />}
      <group position={[0, -0.4, 0]}>
        <Zee t={t} grootte={240} />
      </group>
      <Camera pos={[cam[0] + (cam[3] - cam[0]) * p, cam[1] + (cam[4] - cam[1]) * p, cam[2] + (cam[5] - cam[2]) * p]} kijk={[0, 1.4, 0]} fov={36} />
      {children}
    </Shot>
  );
};

/* ---------------- hoofdstuk 1: Tikrit ---------------- */

export const S_Naam = () => {
  const f = useCurrentFrame();
  return (
    <Portret
      over={<LangTeller label="Real name" waarde="Yusuf ibn Ayyub" pil={f > 60 ? 'Saladin = Salah ad-Din' : undefined} />}
      wie={<Figuur kleding={YUSUF} hoofddeksel="tulband" position={[0, 0, 0.4]} rotation={[0, 0.25, 0]} scale={0.78} pose={{ mond: 'dicht' }} />}
      extra={<Stad z={-16} />}
    />
  );
};

export const S_Fort = ({ nacht = false }: { nacht?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, -2]} scherpte={2.2} mist={nacht ? ['#141A26', 10, 60] : ['#E6D2AE', 20, 110]} over={nacht ? undefined : <><JaarLabel jaar="c. 1137" sub="Tikrit, on the Tigris" /></>}>
      <Lucht boven={nacht ? '#0A1020' : '#8FB4D8'} horizon={nacht ? '#1E2A44' : '#F2DDB2'} />
      {nacht ? <Nachtlicht /> : <Daglicht zon={[-10, 14, 8]} />}
      <Grond kleur={nacht ? '#4A3E30' : '#C8AC7A'} />
      <group position={[0, 0, 7]} rotation={[0, Math.PI / 2, 0]}>
        <Rivier t={t} breed={5} nacht={nacht} />
      </group>
      <Camera pos={[ease(f, 0, 160, 8, 6), ease(f, 0, 160, 4, 3.4), ease(f, 0, 160, 16, 13)]} kijk={[0, 3, -2]} fov={36} />
      <Rots position={[0, -0.5, -3]} schaal={[9, 3, 6]} kleur="#A88A62" />
      <group position={[0, 2.4, -3]}>
        <Blok p={[0, 1.6, 0]} s={[7, 3.2, 4]} c="#C2A47A" />
        {[[-3.2, -1.8], [3.2, -1.8], [-3.2, 1.8], [3.2, 1.8]].map(([x, z], i) => <Blok key={i} p={[x, 2.4, z]} s={[1.2, 4.8, 1.2]} c="#B8996E" />)}
        {nacht && <Fakkel position={[0, 3.6, 2.1]} t={t} />}
      </group>
      {nacht && (
        <group position={[ease(f, 0, 200, -2, 3), 0, 3.5]}>
          <Paard rotation={[0, -Math.PI / 2, 0]} t={t} loopt ruiter={<Figuur kleding={SHIRKUH} hoofddeksel="tulband" baard pose={{ hoofd: [0, -0.8, 0] }} />} />
          <Kameel position={[-2.6, 0, 0.4]} rotation={[0, -Math.PI / 2, 0]} t={t} loopt />
          <Figuur kleding={VROUW} haar="lang" position={[-4.6, 0, 0.2]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [-0.9, 0, 0.3], elleboog: [0, -1.2] } }} extra={<Blok p={[0, 1.55, 0.25]} s={[0.35, 0.3, 0.3]} c="#ECE6D8" />} />
          <Fakkel position={[-1.2, 0, 0.9]} t={t} />
        </group>
      )}
      {!nacht && <Figuur kleding={{ ...SHIRKUH, cape: '#5A4A36', riem: '#ECE6D8', haar: '#3A2A1E' }} hoofddeksel="tulband" baard position={[0.6, 7.2, -0.9]} rotation={[0, 0.3, 0]} scale={0.8} pose={ARMEN_GEKRUIST} />}
    </Shot>
  );
};

export const S_Ruzie = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.4, 0]} scherpte={3.4} mist={['#141A26', 6, 30]}>
      <Lucht boven="#0A1020" horizon="#1E2A44" />
      <Nachtlicht />
      <Grond kleur="#4A3E30" />
      <Camera pos={[ease(f, 0, 120, 2.6, 1.8), 1.7, ease(f, 0, 120, 5.6, 4.8)]} kijk={[0, 1.3, 0]} fov={34} />
      <Fakkel position={[-1.6, 0, -1]} t={t} />
      <Blok p={[0, 2.5, -2.5]} s={[10, 5, 0.6]} c="#6A5A48" />
      <Figuur kleding={SHIRKUH} hoofddeksel="tulband" baard position={[0.3, 0, 0.3]} rotation={[0, -0.4, 0]} pose={{ wenk: 0.9, mond: 'open', armR: wijs(0.9) }} />
      <Figuur kleding={BURGER} position={[-1.1, 0, -0.3]} rotation={[0, 0.9, 0]} pose={{ wenk: 0.6, armL: wijs(1.0), mond: 'open' }} />
    </Shot>
  );
};

export const S_Damascus = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.4, 2]} scherpte={2.6} mist={['#E6D2AE', 20, 110]} over={<JaarLabel jaar="Damascus" sub="one of the great cities" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#CDB48A" />
      <Camera pos={[ease(f, 0, 170, 7, 4), ease(f, 0, 170, 6, 3), ease(f, 0, 170, 18, 13)]} kijk={[0, 3, -4]} fov={36} />
      <Stad z={-6} />
      <Menigte n={10} z={1.5} x0={-6} t={t} />
      <Figuur kleding={YUSUF} hoofddeksel="tulband" position={[0.6, 0, 3]} rotation={[0, 0.3, 0]} scale={0.72} pose={{ hoofd: [-0.2, 0, 0] }} />
    </Shot>
  );
};

export const S_Lezen = ({ oud = false }: { oud?: boolean }) => (
  <InKamer>
    <Figuur
      kleding={oud ? MONNIK : YUSUF}
      hoofddeksel={oud ? null : 'tulband'}
      position={[0.7, 0, -0.35]}
      rotation={[0, 0.05, 0]}
      scale={0.74}
      pose={{ hoofd: [0.45, 0, 0], armL: { schouder: [-0.7, 0, 0.2], elleboog: [0, -0.4] }, armR: { schouder: [-0.7, 0, -0.2], elleboog: [0, -0.4] } }}
    />
    <Blok p={[0.7, 0.93, 0.35]} s={[0.6, 0.05, 0.42]} c="#EFE3C4" r={[0, 0.2, 0]} />
    {!oud && Array.from({ length: 5 }, (_, i) => <Blok key={i} p={[-0.2, 0.93 + i * 0.09, 0.4]} s={[0.4, 0.08, 0.3]} c={['#8E2A24', '#2F5A3A', '#3E4F7A', '#B8912F', '#5A3B24'][i]} />)}
  </InKamer>
);

export const S_1099 = ({ terug = false }: { terug?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur avond vlag="#ECE6D8" over={<JaarLabel jaar="1099" sub={terug ? '88 years earlier' : 'the First Crusade'} />}>
      <Leger rijen={3} kolommen={10} kleur="#ECE6D8" schild="#8D8A84" position={[0, 0, 6]} rotation={[0, Math.PI, 0]} t={t} />
      {[-4, 4].map((x, i) => <Vuur key={i} position={[x, 0, 2.4]} t={t + i} grootte={1.4} />)}
      {[-6, 5].map((x, i) => <Rook key={i} position={[x, 2, -8]} t={t + i} kleur="#3A302A" />)}
    </VoorMuur>
  );
};

export const S_Uitkijk = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 3.6, 0]} scherpte={3} mist={['#9A6A4A', 20, 110]}>
      <Lucht boven="#3E2E52" horizon="#F0904A" />
      <Avondlicht />
      <Zon position={[-20, 6, -110]} grootte={12} kleur="#FFB070" />
      <Grond kleur="#B8986A" />
      <Camera pos={[ease(f, 0, 160, -2.6, -1.4), 4.2, ease(f, 0, 160, 5.4, 4.4)]} kijk={[0, 3.8, -2]} fov={34} />
      <Blok p={[0, 1.4, 0]} s={[6, 2.8, 4]} c="#CDB48A" />
      <Stad z={-12} />
      <Figuur kleding={YUSUF} hoofddeksel="tulband" position={[0, 2.8, 0.6]} rotation={[0, Math.PI, 0]} scale={0.74} pose={ARMEN_GEKRUIST} />
    </Shot>
  );
};

/* ---------------- hoofdstuk 2: Egypte ---------------- */

export const S_Egypte = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.4, 0]} scherpte={2} mist={['#E6D2AE', 30, 160]} over={<LangTeller label="Egypt" waarde="Rich" pil="but weak" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#C8AC7A" />
      <group position={[0, 0, 4]} rotation={[0, Math.PI / 2, 0]}>
        <Rivier t={t} breed={6} nacht={false} />
      </group>
      <Camera pos={[ease(f, 0, 170, 10, 6), ease(f, 0, 170, 5, 3.5), ease(f, 0, 170, 20, 15)]} kijk={[0, 2.5, -8]} fov={36} />
      <Piramide position={[-6, 0, -22]} h={14} />
      <Piramide position={[6, 0, -28]} h={11} />
      {Array.from({ length: 8 }, (_, i) => <Blok key={i} p={[-9 + i * 2.6, 0.5, 0]} s={[1.4, 1.0, 1.0]} c={i % 2 ? '#D8B54E' : '#C9A040'} metal={0.4} rough={0.4} />)}
    </Shot>
  );
};

export const S_Onwillig = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Portret
      ver={1.9}
      kijkY={2.2}
      wie={
        <group position={[lin(f, 0, 200, 2, -2), 0, 0]}>
          <Ruiter k={SHIRKUH} position={[-1.5, 0, -1]} rotation={[0, Math.PI / 2, 0]} t={t} loopt dek="#3E5A3A" pose={{ armR: wijs(1.2) }} />
          <Ruiter k={YUSUF} baard={false} position={[1.6, 0, 0.5]} rotation={[0, Math.PI / 2, 0]} t={t + 0.3} loopt kleur="#A07A50" dek="#E9DFC8" pose={{ hoofd: [0.4, -0.7, 0], wenk: -0.8 }} />
        </group>
      }
    />
  );
};

export const S_Bed = ({ wie, jaar, sub, teller, donker = 0, bij }: { wie: ReactNode; jaar?: string; sub?: string; teller?: [string, string, string?]; donker?: number; bij?: ReactNode }) => {
  const f = useCurrentFrame();
  const licht = 6 * (1 - donker * lin(f, 30, 150, 0, 1));
  return (
    <Shot focus={[0, 0.8, 0]} scherpte={3.6} mist={['#1A120C', 5, 18]} over={<>{jaar && <JaarLabel jaar={jaar} sub={sub} />}{teller && <LangTeller label={teller[0]} waarde={teller[1]} pil={teller[2]} />}</>}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.35]} />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#5A4232" />
      <pointLight position={[1.6, 1.6, 0.6]} intensity={licht} distance={7} color="#FFA850" />
      <Blok p={[1.6, 1.0, 0.6]} s={[0.08, 0.24, 0.08]} c="#F2EAD8" />
      {donker * lin(f, 30, 150, 0, 1) < 0.9 && <Blok p={[1.6, 1.16, 0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />}
      <Blok p={[1.6, 0.45, 0.6]} s={[0.6, 0.9, 0.6]} c="#5A3B24" />
      <Camera pos={[ease(f, 0, 150, 2.4, 1.8), 2.2, ease(f, 0, 150, 3.6, 3.0)]} kijk={[0, 0.7, 0]} fov={34} />
      <Bed position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <group position={[1.05, 0.95, 0]} rotation={[0, Math.PI / 2, 0]}><group rotation={[-Math.PI / 2, 0, 0]} scale={0.8}>{wie}</group></group>
      {bij}
    </Shot>
  );
};

export const S_Citadel = ({ af = false }: { af?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const h = af ? 1 : lin(f, 0, 150, 0.3, 1);
  return (
    <Shot
      focus={[0, 3, -2]}
      scherpte={2.2}
      mist={af ? ['#9A6A4A', 30, 140] : ['#E6D2AE', 26, 130]}
      over={af ? <LangTeller label="Seat of Egypt's rulers" waarde={`~${Math.round(lin(f, 10, 120, 0, 700))} years`} /> : <JaarLabel jaar="1176" sub="Citadel of Cairo" />}
    >
      <Lucht boven={af ? '#3E2E52' : '#8FB4D8'} horizon={af ? '#F0904A' : '#F2DDB2'} />
      {af ? <Avondlicht /> : <Daglicht zon={[-10, 14, 8]} />}
      <Grond kleur="#C8AC7A" />
      <Camera pos={[ease(f, 0, 170, 10, 7), ease(f, 0, 170, 6, 4.4), ease(f, 0, 170, 18, 14)]} kijk={[0, 3, -2]} fov={36} />
      <Rots position={[0, -0.8, -3]} schaal={[10, 3, 7]} kleur="#B49A6E" />
      <group position={[0, 2.2, -3]} scale={[1, h, 1]}>
        <Blok p={[0, 1.8, 0]} s={[9, 3.6, 5]} c="#D8C29A" />
        {[[-4.4, -2.4], [4.4, -2.4], [-4.4, 2.4], [4.4, 2.4]].map(([x, z], i) => <Blok key={i} p={[x, 2.6, z]} s={[1.4, 5.2, 1.4]} c="#C9B088" />)}
      </group>
      {!af && [-3, -1, 1.5, 3.4].map((x, i) => (
        <Figuur key={i} kleding={BURGER} position={[x, 0, 3 + (i % 2)]} rotation={[0, i % 2 ? 0.6 : -0.6, 0]} scale={0.8} pose={{ armL: omhoog(), armR: omhoog() }} extra={<Blok p={[0, 2.3 + Math.sin(t * 4 + i) * 0.05, 0]} s={[0.6, 0.4, 0.5]} c="#D8C29A" />} />
      ))}
      {!af && <Figuur {...SAL} position={[-5, 0, 4]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.3) }} />}
    </Shot>
  );
};

/* ---------------- hoofdstuk 3 ---------------- */

export const S_Kameel = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 150, 4, -4);
  return (
    <Portret
      wie={
        <group position={[x, 0, 0]}>
          <Kameel rotation={[0, Math.PI / 2, 0]} t={t * 1.6} loopt kleur="#C49A64" />
          <group position={[0, 2.25, 0]} rotation={[0, Math.PI / 2, 0]}>
            <Figuur {...SAL} scale={0.85} pose={{ hoofd: [0, -0.9, 0], wenk: 0.8, mond: 'open', armL: { schouder: [-1.2, 0, 0.2], elleboog: [0, -0.6] } }} />
          </group>
        </group>
      }
      ver={1.8} kijkY={2.6}
    />
  );
};

/* ---------------- hoofdstuk 4: Hattin ---------------- */

export const S_Kerak = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.8, 2]} scherpte={2.6} mist={['#9A7A5A', 20, 110]} over={<LangTeller label="Reynald of Chatillon" waarde="Raider" pil="lord of Kerak castle" />}>
      <Lucht boven="#6A7A8A" horizon="#D8C2A0" />
      <Daglicht zon={[-10, 12, 8]} kracht={1.6} />
      <Grond kleur="#A88A62" />
      <Camera pos={[ease(f, 0, 160, 3, 1.6), 2.0, ease(f, 0, 160, 8, 6.4)]} kijk={[0, 2.2, 0]} fov={34} />
      <Rots position={[0, -1, -9]} schaal={[10, 5, 5]} kleur="#8A7458" />
      <group position={[0, 4, -9]}>
        <Blok p={[0, 2, 0]} s={[8, 4, 4]} c="#8E7E66" />
        {[-3.6, 0, 3.6].map((x) => <Blok key={x} p={[x, 3.2, 0]} s={[1.4, 6.4, 1.4]} c="#7E6E58" />)}
      </group>
      <Figuur kleding={REYNALD} baard position={[0, 0, 1.6]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach', wenk: 0.5 }} />
    </Shot>
  );
};

export const S_Karavaan = ({ aanval = false }: { aanval?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Portret
      over={aanval ? <JaarLabel jaar="1187" sub="in the middle of a truce" /> : undefined}
      ver={2.2}
      kijkY={1.8}
      wie={
        <group position={[lin(f, 0, 200, 3, 0), 0, -1]}>
          {[0, 1, 2, 3].map((i) => <Kameel key={i} position={[i * 2.6 - 4, 0, (i % 2) * 0.6]} rotation={[0, Math.PI / 2, 0]} t={t + i} loopt kleur={['#B88A55', '#C49A64', '#A87C4A', '#BE9460'][i]} />)}
        </group>
      }
      extra={
        aanval && (
          <group position={[lin(f, 0, 200, -9, -5), 0, 2]}>
            {[0, 1, 2].map((i) => <Ruiter key={i} k={i ? RIDDER : REYNALD} hoofddeksel={i ? 'helm' : null} position={[i * -1.6, 0, i * 1.2]} rotation={[0, -Math.PI / 2, 0]} t={t + i} loopt kleur="#3A2A20" dek="#3A2A3A" pose={{ armR: omhoog() }} inHand={<Zwaard />} />)}
          </group>
        )
      }
    />
  );
};

export const S_Eed = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, 0]} scherpte={3.4} mist={['#3A1A10', 8, 40]}>
      <Lucht boven="#2A1410" horizon="#6A2A18" />
      <hemisphereLight args={['#FF9A60', '#2A1410', 0.6]} />
      <Grond kleur="#3A2A20" />
      <Camera pos={[ease(f, 0, 120, 1.4, 0.6), ease(f, 0, 120, 1.6, 1.9), ease(f, 0, 120, 5.2, 4.2)]} kijk={[0, 2.2, 0]} fov={34} />
      <Vuur position={[0, 0, -3]} t={t} grootte={1.1} />
      <pointLight position={[0, 2, -1.4]} intensity={20} distance={10} color="#FF8A3A" />
      <Figuur {...SAL} position={[0, 0, 0.4]} pose={{ armR: omhoog(), wenk: 1, mond: 'open' }} inHand={<Zwaard />} />
    </Shot>
  );
};

export const S_GrootLeger = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.4, -4]} scherpte={1.6} mist={['#E6D2AE', 30, 160]} over={<LangTeller label="His army" waarde={`~${Math.round(lin(f, 10, 100, 0, 30)) * 1000 === 0 ? 0 : (Math.round(lin(f, 10, 100, 0, 30)) * 1000).toLocaleString('en-US')}`} pil="estimates vary" />}>
      <Woestijn />
      <Camera pos={[ease(f, 0, 180, 2, 10), ease(f, 0, 180, 2, 12), ease(f, 0, 180, 9, 18)]} kijk={[0, 1, -6]} fov={38} />
      {[-14, 0, 14].map((x, i) => <Leger key={i} rijen={5} kolommen={11} kleur="#E2D6BC" schild="#C99A2E" position={[x, 0, -10 + (i % 2) * 2]} t={t} />)}
      {[-8, -3, 3, 8].map((x, i) => <Banier key={i} position={[x, 0, -3]} kleur={i % 2 ? '#C99A2E' : '#ECE6D8'} t={t + i} />)}
      <Ruiter k={SALADIN} position={[0, 0, 2]} rotation={[0, Math.PI, 0]} t={t} kleur="#ECE6D8" />
    </Shot>
  );
};

/** Kruisvaarderscolonne door droge heuvels. */
export const S_Colonne = ({ dorst = false }: { dorst?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[8, 3, 12, 5, 2.6, 9]} kijk={[0, 1.6, 0]}>
      <Zon position={[30, 40, -80]} grootte={14} kleur="#FFF2C0" />
      <group position={[lin(f, 0, 200, 2, -1), 0, 0]}>
        <Leger rijen={3} kolommen={8} kleur="#ECE6D8" schild="#8D8A84" position={[0, 0, -2]} rotation={[0, -Math.PI / 2, 0]} t={t * (dorst ? 0.3 : 0.6)} />
        <Ruiter k={GUY} hoofddeksel={null} baard={false} position={[-6, 0, 0.6]} rotation={[0, -Math.PI / 2, 0]} t={t} loopt kleur="#3A2A20" dek="#2F4F8E" pose={{ hoofd: dorst ? [0.3, -0.8, 0] : [0, -0.8, 0] }} />
      </group>
    </Slagveld>
  );
};

export const S_Water = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[0, 5, 16, 0, 4, 13]} kijk={[0, 1, -2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -10]}>
        <planeGeometry args={[60, 6]} />
        <meshStandardMaterial color="#4A8AA8" roughness={0.3} />
      </mesh>
      <Leger rijen={2} kolommen={14} kleur="#E2D6BC" schild="#C99A2E" position={[0, 0, -5]} rotation={[0, Math.PI, 0]} t={t} />
      <Leger rijen={2} kolommen={8} kleur="#ECE6D8" schild="#8D8A84" position={[0, 0, 4]} rotation={[0, Math.PI, 0]} t={t * 0.3} />
    </Slagveld>
  );
};

export const S_Boogschutters = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[9, 4, 12, 6, 3, 9]} kijk={[0, 1.4, 0]}>
      <Leger rijen={3} kolommen={7} kleur="#ECE6D8" schild="#8D8A84" position={[0, 0, -4]} rotation={[0, -Math.PI / 2, 0]} t={t * 0.3} />
      {[0, 1, 2, 3].map((i) => {
        const a = t * 0.9 + i * 1.6;
        return <Ruiter key={i} k={SARACEEN} position={[Math.cos(a) * 6, 0, -1 + Math.sin(a) * 4]} rotation={[0, -a, 0]} t={t + i} loopt kleur={['#7A5A3A', '#3A2A20', '#A07A50', '#5A3B24'][i]} dek="#C99A2E" pose={{ armL: { schouder: [-1.4, 0, 0.6], elleboog: [0, 0] }, armR: { schouder: [-1.4, 0, -0.3], elleboog: [0, -1.2] } }} />;
      })}
    </Slagveld>
  );
};

export const S_Brand = ({ teaser = false }: { teaser?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld rook cam={teaser ? [5, 3, 11, 3, 2.6, 9] : [7, 3, 12, 4, 2.4, 9]} kijk={[0, 1.4, -1]}>
      {[-5, -2.4, 0.4, 3.2, 6].map((x, i) => <Vuur key={i} position={[x, 0, -1.8 + (i % 2) * 0.4]} t={t + i} grootte={0.6} />)}
      <Leger rijen={3} kolommen={8} kleur="#ECE6D8" schild="#8D8A84" position={[0, 0, -3.5]} rotation={[0, Math.PI, 0]} t={t * 0.2} />
      <Figuur kleding={RIDDER} hoofddeksel="helm" position={[1, 0, -1.2]} rotation={[0, 0.3, 0]} pose={{ hoofd: [0.4, 0, 0], armL: { schouder: [-2.2, 0, 0.4], elleboog: [0, -1.6] } }} />
    </Slagveld>
  );
};

export const S_Hoorns = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const val = ease(f, 90, 130, 0, 1.4);
  return (
    <Shot focus={[0, 3, -4]} scherpte={1.8} mist={['#9A7A5A', 16, 120]} over={<JaarLabel jaar="4 July 1187" sub="the Horns of Hattin" />}>
      <Lucht boven="#8A7E70" horizon="#E0B07A" />
      <Daglicht zon={[-10, 12, 8]} kracht={1.6} />
      <Grond kleur="#B8986A" />
      <Camera pos={[ease(f, 0, 200, 14, 9), ease(f, 0, 200, 8, 6), ease(f, 0, 200, 20, 15)]} kijk={[0, 3, -4]} fov={38} />
      {[-3.4, 3.4].map((x) => (
        <mesh key={x} position={[x, 1.8, -4]} castShadow receiveShadow>
          <coneGeometry args={[5, 6, 7]} />
          <meshStandardMaterial color="#9A7E58" roughness={1} flatShading />
        </mesh>
      ))}
      <Leger rijen={2} kolommen={5} kleur="#ECE6D8" schild="#8D8A84" position={[0, 2.6, -4]} t={t * 0.2} afstand={0.9} />
      <group position={[0, 3, -3]} rotation={[0, 0, val]}>
        <Banier position={[0, 0, 0]} kleur="#8E1F2A" t={t} />
      </group>
      {[-1, 1].map((k) => <Leger key={k} rijen={2} kolommen={10} kleur="#E2D6BC" schild="#C99A2E" position={[k * 9, 0, 0]} rotation={[0, -k * 0.8, 0]} t={t} />)}
      <Leger rijen={2} kolommen={12} kleur="#E2D6BC" schild="#C99A2E" position={[0, 0, 5]} rotation={[0, Math.PI, 0]} t={t} />
    </Shot>
  );
};

/** De tent na Hattin. fase: 'binnen' | 'beker' | 'door' | 'wijs' | 'kijk' | 'kalm' */
export const S_TentHattin = ({ fase, over }: { fase: 'binnen' | 'beker' | 'door' | 'wijs' | 'kijk' | 'kalm'; over?: ReactNode }) => {
  const f = useCurrentFrame();
  const salArm = fase === 'beker' ? { schouder: [-1.3, 0, -0.2] as V3, elleboog: [0, -0.2] as [number, number] } : fase === 'wijs' ? wijs(1.3) : fase === 'kalm' ? { schouder: [-1.0, 0, -0.5] as V3, elleboog: [0, -0.3] as [number, number] } : undefined;
  const guyArm = fase === 'beker' ? { schouder: [-1.2, 0, 0.1] as V3, elleboog: [0, -0.4] as [number, number] } : fase === 'door' ? { schouder: [-1.3, 0, -0.6] as V3, elleboog: [0, -0.2] as [number, number] } : undefined;
  const kijk: V3 = fase === 'kijk' ? [-0.3, 1.9, 0.4] : [0, 1.6, 0];
  return (
    <InTent nacht kijk={kijk} over={over}>
      <Figuur {...SAL} position={[1.3, 0, -0.3]} rotation={[0, -0.9, 0]} pose={{ ...(salArm ? { armR: salArm } : {}), wenk: fase === 'wijs' ? 0.9 : 0.2 }} inHand={fase === 'beker' ? <Beker /> : undefined} />
      <Figuur kleding={GUY} haar="kort" position={[-0.3, 0, 0.4]} rotation={[0, 0.7, 0]} pose={{ ...(guyArm ? { armR: guyArm } : {}), hoofd: fase === 'kijk' ? [-0.1, 0.4, 0] : [0.2, 0, 0], wenk: fase === 'kijk' ? -0.9 : -0.5, mond: fase === 'kijk' ? 'open' : 'dicht' }} inHand={fase === 'door' ? <Beker /> : undefined} extra={kroonOp(0, 0, 0)} />
      {fase !== 'kijk' && fase !== 'kalm' && <Figuur kleding={REYNALD} baard position={[-1.6, 0, -0.4]} rotation={[0, 0.6, 0]} pose={{ ...(fase === 'door' ? { armL: { schouder: [-1.1, 0, 0.4] as V3, elleboog: [0, -0.4] as [number, number] } } : {}), wenk: 0.4 }} />}
      {Array.from({ length: 2 }, (_, i) => <Figuur key={i} kleding={SARACEEN} hoofddeksel="tulband" baard position={[i ? 2.8 : -2.9, 0, -1.6]} rotation={[0, i ? -0.4 : 0.4, 0]} />)}
      {f < 0 && <group />}
    </InTent>
  );
};

/* ---------------- hoofdstuk 5: Jeruzalem ---------------- */

export const S_Poort = ({ jaar, sub, open = true, ruiter = false, uit = false, over }: { jaar?: string; sub?: string; open?: boolean; ruiter?: boolean; uit?: boolean; over?: ReactNode }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur open={open ? ease(f, 10, 60, 0, 1) : 0} vlag={ruiter || uit ? '#C99A2E' : '#ECE6D8'} over={over ?? (jaar ? <JaarLabel jaar={jaar} sub={sub} /> : undefined)}>
      {ruiter && <Ruiter k={SALADIN} position={[0, 0, lin(f, 0, 200, 6, 1.5)]} rotation={[0, 0, 0]} t={t} loopt kleur="#ECE6D8" />}
      {ruiter && <Menigte n={12} z={5} x0={-9} t={t} />}
      {uit && Array.from({ length: 6 }, (_, i) => (
        <Figuur key={i} kleding={[BURGER, VROUW, OUDJE][i % 3]} haar={i % 3 === 1 ? 'lang' : undefined} position={[-1.5 + (i % 2) * 1.8, 0, lin(f, 0, 200, 0.5, 3) + i * 0.9]} rotation={[0, 0, 0]} scale={i === 4 ? 0.62 : 0.85} pose={{ armR: { schouder: [-0.4, 0, 0], elleboog: [0, -1.0] } }} extra={<Blok p={[0.3, 1.5, -0.3]} s={[0.4, 0.4, 0.3]} c="#8A6A4A" />} />
      ))}
      {uit && [-4, 4].map((x, i) => <Figuur key={i} kleding={SARACEEN} hoofddeksel="tulband" baard position={[x, 0, 3]} rotation={[0, x > 0 ? -0.6 : 0.6, 0]} pose={ARMEN_GEKRUIST} />)}
    </VoorMuur>
  );
};

export const S_Balian = ({ ridders = false }: { ridders?: boolean }) => {
  const f = useCurrentFrame();
  const tik = Math.max(0, Math.sin(f / 8)) * 0.4;
  return (
    <Shot focus={[0, 6.6, 0.6]} scherpte={2.8} mist={['#E6D2AE', 20, 120]} over={ridders ? undefined : <LangTeller label="Defender" waarde="Balian of Ibelin" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#C8AC7A" />
      <Camera pos={[ease(f, 0, 160, 3.6, 2.4), ease(f, 0, 160, 7.4, 7.2), ease(f, 0, 160, 8, 6.6)]} kijk={[0, 6.6, 0.4]} fov={34} />
      <Muur />
      <Blok p={[0, 5.05, 1.3]} s={[14, 0.1, 1.4]} c="#CDB894" />
      <Figuur kleding={BALIAN} position={[0, 5.1, 1.1]} rotation={[0, ridders ? -0.9 : 0.2, 0]} pose={ridders ? { armR: { schouder: [-1.2 - tik, 0, -0.3], elleboog: [0, 0] } } : { armR: wijs(1.4), wenk: 0.6 }} inHand={ridders ? <Zwaard /> : undefined} />
      {ridders && [0, 1, 2].map((i) => <Figuur key={i} kleding={{ ...BURGER, tuniek: ['#3E6A9A', '#8A6A4A', '#5A4A6A'][i] }} position={[-1.3 - i * 1.0, 5.1, 1.1]} rotation={[0, 0.9, 0]} scale={0.62} pose={{ hoofd: [0.4, 0, 0] }} />)}
    </Shot>
  );
};

export const S_Bres = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[-4.5, 1.4, 2]} scherpte={2.6} mist={['#9A8A7A', 14, 90]}>
      <Lucht boven="#8A8E92" horizon="#D8C2A0" />
      <Daglicht zon={[-10, 14, 8]} kracht={1.5} />
      <Grond kleur="#C8AC7A" />
      <Camera pos={[ease(f, 0, 160, 2, -1.5), 2.4, ease(f, 0, 160, 12, 9.5)]} kijk={[-4.5, 1.6, 0]} fov={36} />
      <BresMuur />
      <Figuur kleding={BALIAN} position={[-4.5, 0, lin(f, 0, 200, 0.4, 3)]} rotation={[0, 0, 0]} pose={{ armR: omhoog() }} inHand={<Blok p={[0, 0, 0.5]} s={[0.04, 0.04, 1]} c="#5A3B24" />} extra={<Blok p={[0.5, 3.4, 0]} s={[0.7, 0.45, 0.03]} c="#F4F1EA" />} />
    </Shot>
  );
};

export const S_Losgeld = () => {
  const f = useCurrentFrame();
  const n = Math.round(lin(f, 10, 80, 0, 10));
  return (
    <Shot focus={[0, 1, 0]} scherpte={3.6} mist={['#2A1E14', 6, 20]} over={<LangTeller label="Ransom" waarde={`${n} dinars`} pil="per man (5 per woman)" />}>
      <TentBinnen />
      <Camera pos={[0.6, ease(f, 0, 150, 2.4, 2.0), ease(f, 0, 150, 2.6, 2.1)]} kijk={[0, 0.95, 0]} fov={34} />
      <Blok p={[0, 0.45, 0]} s={[2.4, 0.9, 1.2]} c="#6A4A2E" />
      {Array.from({ length: n }, (_, i) => <Munt key={i} p={[-0.6 + (i % 5) * 0.3, 0.92 + Math.floor(i / 5) * 0.03, -0.1 + Math.floor(i / 5) * 0.3]} />)}
      <Rol />
    </Shot>
  );
};

export const S_Ketens = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur avond>
      <Ketting van={-3} tot={3} y={1.0} z={4} />
      {[-2.4, -0.8, 0.8, 2.4].map((x, i) => <Figuur key={i} kleding={[BURGER, VROUW, BURGER, OUDJE][i]} haar={i === 1 ? 'lang' : undefined} position={[x, 0, 4]} rotation={[0, -Math.PI / 2, 0]} pose={{ hoofd: [0.4, 0, 0], wenk: -0.8 }} />)}
      <Figuur kleding={SARACEEN} hoofddeksel="tulband" baard position={[-4.2, 0, 4.2]} rotation={[0, -Math.PI / 2, 0]} />
      {void t}
    </VoorMuur>
  );
};

export const S_Vrijlaten = ({ broer = false, ouden = false }: { broer?: boolean; ouden?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Portret
      over={broer ? <LangTeller label="Set free by his brother" waarde={Math.round(lin(f, 10, 100, 0, 1000)).toLocaleString('en-US')} /> : undefined}
      wie={<Figuur kleding={broer ? AL_ADIL : SALADIN_HOF} hoofddeksel="tulband" baard position={[-1.8, 0, 0.4]} rotation={[0, 0.7, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.9], elleboog: [0, 0] }, mond: 'lach' }} />}
      extra={Array.from({ length: 5 }, (_, i) => (
        <Figuur key={i} kleding={ouden ? (i % 2 ? OUDJE : { ...VROUW, tuniek: '#2A2A2E', rok: '#2A2A2E' }) : [BURGER, VROUW, OUDJE][i % 3]} haar={ouden ? (i % 2 ? 'grijs' : 'lang') : i % 3 === 1 ? 'lang' : undefined} position={[0.6 + i * 1.1, 0, lin(f, 0, 200, -1, 2) - i * 0.6]} rotation={[0, 0.9, 0]} scale={0.85} pose={{ hoofd: [-0.1, -0.5, 0], mond: 'lach' }} />
      ))}
    />
  );
};

export const S_Kerk = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, -3]} scherpte={2} mist={['#E6D2AE', 26, 130]} over={<LangTeller label="Church of the Holy Sepulchre" waarde="Left standing" pil="pilgrims allowed" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#CDB48A" />
      <Camera pos={[ease(f, 0, 170, 6, 4), ease(f, 0, 170, 3, 2.4), ease(f, 0, 170, 14, 11)]} kijk={[0, 3.6, -4]} fov={36} />
      <Koepelkerk position={[0, 0, -5]} h={5} koepel="#7A8A8E" />
      <Blok p={[-3, 2, -5]} s={[3, 4, 3]} c="#E2D4B6" />
      <Blok p={[3.2, 2.6, -5.4]} s={[2, 5.2, 2]} c="#D8C8A8" />
      <Menigte n={8} z={0} x0={-5} t={t} />
    </Shot>
  );
};

export const S_Terugkeer = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur open={1} over={<LangTeller label="Jews" waarde="Invited back" />}>
      {Array.from({ length: 5 }, (_, i) => (
        <Figuur key={i} kleding={[BURGER, VROUW, OUDJE][i % 3]} haar={i % 3 === 1 ? 'lang' : undefined} position={[-1 + (i % 2) * 1.6, 0, lin(f, 0, 200, 5, 1.5) + i * 0.9]} rotation={[0, Math.PI, 0]} scale={i === 3 ? 0.62 : 0.85} />
      ))}
      <Paard position={[2.6, 0, lin(f, 0, 200, 6, 2.4)]} rotation={[0, 0, 0]} ezel kleur="#7A6A5A" dek="#8A6A4A" t={t} loopt />
    </VoorMuur>
  );
};

/* ---------------- hoofdstuk 6: Leeuwenhart ---------------- */

export const S_Paus = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.4, 0]} scherpte={2.6} mist={['#C9BCA2', 14, 80]} over={<JaarLabel jaar="1189" sub="the Third Crusade" />}>
      <Lucht boven="#6A7A8A" horizon="#D8D0C0" />
      <Daglicht zon={[-8, 12, 8]} kracht={1.6} />
      <Grond kleur="#8A9A5A" />
      <Camera pos={[ease(f, 0, 160, 4, 2.6), 2.6, ease(f, 0, 160, 11, 9)]} kijk={[0, 2.6, 0]} fov={36} />
      <Blok p={[0, 0.5, -0.4]} s={[3, 1, 2]} c="#B8A88A" />
      <Figuur kleding={PAUS} haar="grijs" hoofddeksel="kap" position={[0, 1, -0.4]} pose={{ armR: omhoog(), armL: omhoog(), mond: 'open' }} />
      {[['#C9A646', -3.6], ['#2F4F9E', 3.4], ['#A8322B', 5.6]].map(([k, x], i) => <Banier key={i} position={[x as number, 0, -2.4]} kleur={k as string} t={t + i} />)}
      <group position={[0, 0, 3.2]} rotation={[0, Math.PI, 0]}>
        <Menigte n={12} x0={-7} t={t} juich />
      </group>
    </Shot>
  );
};

export const S_Rivier = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.2, 0]} scherpte={2.6} mist={['#9AA4A8', 14, 90]} over={<LangTeller label="Frederick Barbarossa" waarde="Drowned" pil="1190, river Saleph" />}>
      <Lucht boven="#7A8A98" horizon="#C6CCCE" />
      <Daglicht zon={[-8, 10, 6]} kleur="#E6E8EA" kracht={1.3} />
      <Grond kleur="#7E8A56" />
      <Rivier t={t} breed={10} nacht={false} />
      <Camera pos={[ease(f, 0, 160, 6, 4), 3, ease(f, 0, 160, 11, 9)]} kijk={[0, 0.8, 0]} fov={36} />
      <group position={[0, lin(f, 40, 200, -0.6, -1.6), 0]}>
        <Ruiter k={BARBAROSSA} hoofddeksel={null} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0.15]} t={t} kleur="#3A2A20" dek="#C9A646" pose={{ armR: omhoog(), mond: 'open' }} />
      </group>
    </Shot>
  );
};

export const S_Koning = ({ k, label, waarde, pil, vlag }: { k: Kleding; label: string; waarde: string; pil?: string; vlag: string }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Haven over={<LangTeller label={label} waarde={waarde} pil={pil} />} cam={[3.4, 2.6, 9, 2.0, 2.5, 7.6]}>
      <Blok p={[0, -0.2, 2]} s={[14, 0.6, 6]} c="#8A7A62" />
      <Zeilschip position={[-6, 0, -8]} rotation={[0, 0.4, 0]} t={t} vlag={vlag} schaal={0.6} />
      <Zeilschip position={[6, 0, -12]} rotation={[0, -0.3, 0]} t={t + 1} vlag={vlag} schaal={0.6} />
      <Banier position={[1.6, 0.1, 1.2]} kleur={vlag} t={t} />
      <Figuur kleding={k} baard position={[0, 0.1, 2.4]} rotation={[0, 0.2, 0]} pose={ARMEN_GEKRUIST} extra={kroonOp(0, 0, 0)} />
    </Haven>
  );
};

export const S_Akko = ({ over, overgave = false }: { over?: ReactNode; overgave?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur over={over} vlag={overgave ? '#A8322B' : '#C99A2E'} open={overgave ? ease(f, 10, 60, 0, 1) : 0} cam={[8, 7, 22, 5, 6, 18]}>
      {!overgave && [-8, -4, 4, 8].map((x, i) => <Tent key={i} position={[x, 0, 8]} kleur={i % 2 ? '#D9C8A4' : '#C8B48E'} />)}
      {!overgave && [-10, -5, 0, 5, 10].map((x, i) => <Tent key={i} position={[x, 0, 15]} kleur="#E2D0A8" />)}
      {overgave && <Leger rijen={2} kolommen={8} kleur="#A8322B" schild="#8D8A84" position={[0, 0, 7]} rotation={[0, Math.PI, 0]} t={t} />}
    </VoorMuur>
  );
};

export const S_Onderhandeling = ({ over, verdrag = false }: { over?: ReactNode; verdrag?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <InTent over={over} kijk={[0, 1.2, 0]}>
      <Blok p={[0, 0.45, 0]} s={[2.4, 0.9, 1.2]} c="#6A4A2E" />
      <group position={[0, 0.95, 0]}>
        <Rol open={verdrag ? ease(f, 30, 90, 0.2, 1) : 0.6} />
      </group>
      <Figuur kleding={AL_ADIL} hoofddeksel="tulband" baard position={[1.6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} pose={{ armR: wijs(0.7) }} />
      <Figuur kleding={RIDDER} position={[-1.6, 0, 0]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: wijs(0.7) }} />
    </InTent>
  );
};

export const S_Donker = ({ wie, over }: { wie: 'richard' | 'saladin'; over?: ReactNode }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, 0]} scherpte={3.2} mist={['#3A1A14', 10, 60]} over={over}>
      <Lucht boven="#1E1012" horizon="#6A2A1E" />
      <hemisphereLight args={['#C86A4A', '#1E1012', 0.5]} />
      <directionalLight position={[-8, 6, -4]} intensity={1.2} color="#FF8A5A" />
      <Grond kleur="#4A3426" />
      <Camera pos={[ease(f, 0, 160, 1.8, 1.0), ease(f, 0, 160, 2.0, 2.2), ease(f, 0, 160, 6.4, 5.2)]} kijk={[0, 2.1, 0]} fov={34} />
      {wie === 'richard' ? (
        <Figuur kleding={RICHARD} baard position={[0, 0, 0.3]} rotation={[0, -0.3, 0]} pose={{ armR: wijs(1.2), wenk: 1 }} extra={kroonOp(0, 0, 0)} />
      ) : (
        <Figuur {...SAL} position={[0, 0, 0.3]} rotation={[0, 0.3, 0]} pose={{ hoofd: [0.35, 0, 0], wenk: -0.9, traan: lin(f, 30, 150, 0, 1) }} />
      )}
      <Leger rijen={2} kolommen={12} kleur={wie === 'richard' ? '#A8322B' : '#E2D6BC'} schild="#8D8A84" position={[0, 0, -14]} t={t * 0.2} />
    </Shot>
  );
};

export const S_Arsuf = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld groen over={<JaarLabel jaar="September 1191" sub="Arsuf" />} cam={[10, 4, 14, 6, 3, 10]}>
      <group position={[lin(f, 0, 200, -6, 2), 0, 0]}>
        {[0, 1, 2, 3, 4].map((i) => <Ruiter key={i} k={i ? RIDDER : RICHARD} hoofddeksel={i ? 'helm' : null} position={[-i * 1.4, 0, -1 + i * 1.1]} rotation={[0, -Math.PI / 2 + Math.PI, 0]} t={t + i} loopt kleur={['#3A2A20', '#5A3B24', '#E6E0D6', '#3A2A20', '#7A5A3A'][i]} dek={i ? '#ECE6D8' : '#A8322B'} pose={{ armR: omhoog() }} inHand={<Zwaard />} />)}
      </group>
      <Leger rijen={3} kolommen={8} kleur="#E2D6BC" schild="#C99A2E" position={[8, 0, -2]} rotation={[0, -Math.PI / 2, 0]} t={t} />
    </Slagveld>
  );
};

export const S_Heuvels = ({ terug = false }: { terug?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const draai = terug ? ease(f, 20, 90, 0, Math.PI) : 0;
  return (
    <Shot focus={[0, 1.8, 0]} scherpte={2.6} mist={['#9AA4A8', 16, 120]}>
      <Lucht boven="#6A7A8A" horizon="#D8C8B0" />
      <Daglicht zon={[-8, 10, -6]} kracht={1.4} />
      <Grond kleur="#9A9060" />
      <Heuvels kleur="#8A7A5A" z={-40} />
      <group position={[0, 0, -60]} scale={0.6}>
        <Muur kleur="#BEB094" />
      </group>
      <Camera pos={[ease(f, 0, 170, -5, -3.6), 3.6, ease(f, 0, 170, 10, 8.4)]} kijk={[0, 2.0, -14]} fov={34} />
      <Ruiter k={RICHARD} hoofddeksel={null} position={[0, 0, 0]} rotation={[0, draai, 0]} t={t} loopt={terug && f > 20 && f < 90} kleur="#E6E0D6" dek="#A8322B" />
    </Shot>
  );
};

/* ---------------- hoofdstuk 7: paarden ---------------- */

export const S_TweeKampen = ({ over, bode = false }: { over?: ReactNode; bode?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Portret
      over={over}
      cam={0}
      ver={2.3}
      kijkY={1.4}
      wie={
        <>
          <Tent position={[-7, 0, -3]} kleur="#E2D0A8" />
          <Tent position={[7, 0, -3]} kleur="#ECE6D8" />
          <Figuur {...SAL_HOF} position={[-5, 0, -1]} rotation={[0, 0.6, 0]} pose={ARMEN_GEKRUIST} />
          <Figuur kleding={RICHARD} baard position={[5, 0, -1]} rotation={[0, -0.6, 0]} pose={ARMEN_GEKRUIST} extra={kroonOp(0, 0, 0)} />
          {bode && <Ruiter k={SARACEEN} position={[lin(f, 0, 200, -4, 4), 0, -1]} rotation={[0, -Math.PI / 2, 0]} t={t} loopt dek="#5E8A5A" inHand={<Blok p={[0, 0, 0.2]} s={[0.4, 0.3, 0.3]} c="#C9A646" metal={0.5} />} />}
        </>
      }
    />
  );
};

export const S_Sprong = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const y = f < 30 ? 1.2 : Math.max(-0.4, 1.2 - ((f - 30) / 12) ** 2);
  return (
    <Haven over={<JaarLabel jaar="1192" sub="Jaffa" />} cam={[5, 2, 9, 3, 1.8, 7]}>
      <Zeilschip position={[-3, 0, -3]} rotation={[0, Math.PI / 2, 0]} t={t} vlag="#A8322B" schaal={0.6} />
      <Figuur kleding={RICHARD} baard position={[lin(f, 30, 60, -1.2, 0.6), y, 0.4]} rotation={[0, 0.6, 0]} pose={{ armR: omhoog(), mond: 'open', wenk: 0.8 }} inHand={<Zwaard />} />
      <Blok p={[4, 0, -1]} s={[6, 0.6, 8]} c="#C8AC7A" />
    </Haven>
  );
};

export const S_PaardDood = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld rook cam={[4, 2.4, 8, 2.6, 2.2, 6.6]} kijk={[0, 1.2, 0]}>
      <group position={[-1.2, 0.85, -0.6]} rotation={[0, 0.4, Math.PI / 2]}>
        <Paard kleur="#E6E0D6" dek="#A8322B" t={0} />
      </group>
      <Figuur kleding={RICHARD} baard position={[1, 0, 0.4]} rotation={[0, -0.3, 0]} pose={{ armR: omhoog(), wenk: 0.9, mond: 'open' }} inHand={<Zwaard />} extra={kroonOp(0, 0, 0)} />
      {void t}
    </Slagveld>
  );
};

export const S_Paarden = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[5, 2.4, 10, 3, 2.2, 8]} kijk={[0, 1.4, 0]}>
      <Figuur kleding={SARACEEN} hoofddeksel="tulband" baard position={[lin(f, 0, 200, 5, 1.6), 0, 0.6]} rotation={[0, -Math.PI / 2, 0]} pose={{ armR: { schouder: [-1.0, 0, 0.3], elleboog: [0, 0] } }} />
      {[0, 1].map((i) => <Paard key={i} position={[lin(f, 0, 200, 6.6, 3.2) + i * 1.6, 0, 0.6 + i * 0.8]} rotation={[0, -Math.PI / 2, 0]} kleur={i ? '#3A2A20' : '#E6E0D6'} dek="#C99A2E" t={t + i} loopt={f < 200} />)}
      <Figuur kleding={RICHARD} baard position={[-1.8, 0, 0.4]} rotation={[0, 0.8, 0]} pose={{ mond: 'open' }} extra={kroonOp(0, 0, 0)} />
    </Slagveld>
  );
};

export const S_Koorts = () => (
  <S_Bed
    wie={<Figuur kleding={{ ...RICHARD, borst: undefined }} baard pose={{ ogen: 'dicht', wenk: -0.5 }} />}
    teller={['A gift', 'Fruit & snow', 'as the story goes']}
    bij={
      <>
        <Figuur kleding={SARACEEN} hoofddeksel="tulband" baard position={[-1.4, 0, 1.0]} rotation={[0, 0.6, 0]} pose={{ armR: { schouder: [-1.2, 0, 0.2], elleboog: [0, -0.4] } }} />
        <Blok p={[-0.9, 1.2, 1.1]} s={[0.6, 0.06, 0.4]} c="#C9A646" metal={0.5} />
        {[0, 1, 2].map((i) => <Blok key={i} p={[-1.1 + i * 0.18, 1.3, 1.1]} s={[0.14, 0.14, 0.14]} c={['#D8442A', '#E8A43A', '#7AA43A'][i]} />)}
        <Blok p={[-0.7, 1.3, 1.2]} s={[0.2, 0.16, 0.2]} c="#F4F8FA" />
      </>
    }
  />
);

export const S_Ziek = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[5, 3, 11, 3, 2.6, 9]} kijk={[0, 1, 0]}>
      <Tent position={[-4, 0, -3]} kleur="#C8B48E" />
      <Tent position={[4, 0, -4]} kleur="#D9C8A4" />
      {[-2, 0, 2].map((x, i) => (
        <group key={i} position={[x, 0.3, i * 0.6]} rotation={[-Math.PI / 2, 0, 0.3 * i]}>
          <Figuur kleding={i % 2 ? SARACEEN : RIDDER} pose={{ ogen: 'dicht' }} />
        </group>
      ))}
      <Figuur kleding={RIDDER} position={[3.6, 0, 1]} rotation={[0, -0.4, 0]} pose={{ hoofd: [0.4, 0, 0], wenk: -0.8 }} />
      {void t}
    </Slagveld>
  );
};

export const S_Moe = () => {
  const f = useCurrentFrame();
  return (
    <Portret
      avond
      cam={0}
      wie={
        <>
          <Blok p={[-2.4, 0.3, 0]} s={[0.8, 0.6, 0.8]} c="#8A6A4A" />
          <Blok p={[2.4, 0.3, 0]} s={[0.8, 0.6, 0.8]} c="#8A6A4A" />
          <Figuur {...SAL_HOF} position={[-2.4, 0.15, 0.2]} rotation={[0, 0.5, 0]} pose={{ hoofd: [0.45, 0, 0], wenk: -0.7 }} />
          <Figuur kleding={RICHARD} baard position={[2.4, 0.15, 0.2]} rotation={[0, -0.5, 0]} pose={{ hoofd: [0.45, 0, 0], wenk: -0.7 }} extra={kroonOp(0, 0.15, 0)} />
        </>
      }
      extra={f < 0 ? null : undefined}
    />
  );
};

export const S_Pelgrims = () => {
  const f = useCurrentFrame();
  return (
    <VoorMuur open={1} vlag="#C99A2E" over={<LangTeller label="Christian pilgrims" waarde="Welcome" pil="unarmed" />}>
      {Array.from({ length: 6 }, (_, i) => (
        <Figuur key={i} kleding={{ ...MONNIK, tuniek: ['#6A5A4A', '#4A3A2E', '#8A7A62'][i % 3], rok: ['#6A5A4A', '#4A3A2E', '#8A7A62'][i % 3] }} position={[-1.2 + (i % 2) * 1.8, 0, lin(f, 0, 200, 5, 1.5) + i * 0.9]} rotation={[0, Math.PI, 0]} scale={0.85} inHand={<Blok p={[0, 0, 0.6]} s={[0.05, 0.05, 1.6]} c="#6A4A2E" />} />
      ))}
      <Figuur kleding={SARACEEN} hoofddeksel="tulband" baard position={[2.8, 0, 2.6]} rotation={[0, -0.4, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.7], elleboog: [0, 0] } }} />
    </VoorMuur>
  );
};

export const S_Afvaart = ({ achterom = false }: { achterom?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Haven avond over={achterom ? undefined : <JaarLabel jaar="October 1192" sub="Richard sails home" />} cam={achterom ? [2.4, 3.0, 6.4, 1.8, 2.9, 5.6] : [6, 3, 14, 4, 2.6, 12]}>
      {achterom ? (
        <>
          <Blok p={[0, 0.6, 0]} s={[3, 0.3, 4]} c="#5A3B24" />
          <Figuur kleding={RICHARD} baard position={[0, 0.75, 0.6]} rotation={[0, Math.PI - 0.3, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: -0.5 }} extra={kroonOp(0, 0.75, 0)} />
          <Rots position={[0, -1, -40]} schaal={[30, 3, 4]} kleur="#8A7A62" />
        </>
      ) : (
        <Zeilschip position={[lin(f, 0, 220, 0, -6), 0, lin(f, 0, 220, 0, -12)]} rotation={[0, 0.3, 0]} t={t} vlag="#A8322B" schaal={0.9} />
      )}
    </Haven>
  );
};

/* ---------------- hoofdstuk 8: één gouden munt ---------------- */

export const S_TerugDamascus = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur avond open={1} vlag="#C99A2E" over={<JaarLabel jaar="1192" sub="back to Damascus" />}>
      <Ruiter k={SALADIN} position={[0, 0, lin(f, 0, 220, 6, 2)]} rotation={[0, 0, 0]} t={t * 0.5} loopt kleur="#ECE6D8" pose={{ hoofd: [0.3, -0.8, 0], wenk: -0.6 }} />
    </VoorMuur>
  );
};

export const S_Rouw = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.4, 2]} scherpte={2.4} mist={['#4A3A4A', 14, 80]}>
      <Lucht boven="#2A2238" horizon="#7A5A5A" />
      <Avondlicht />
      <Grond kleur="#8A7A62" />
      <Camera pos={[ease(f, 0, 170, 6, 4), ease(f, 0, 170, 4, 3), ease(f, 0, 170, 14, 11)]} kijk={[0, 2, -2]} fov={36} />
      <Stad z={-6} />
      {Array.from({ length: 14 }, (_, i) => <Figuur key={i} kleding={[BURGER, VROUW, OUDJE, SARACEEN][i % 4]} hoofddeksel={i % 4 === 3 ? 'tulband' : null} haar={i % 4 === 1 ? 'lang' : undefined} position={[-6 + (i % 7) * 2, 0, 1 + Math.floor(i / 7) * 1.6]} rotation={[0, Math.PI, 0]} scale={0.85} pose={{ hoofd: [0.45, 0, 0], wenk: -0.8 }} />)}
      {void t}
    </Shot>
  );
};

export const S_Geven = () => {
  const f = useCurrentFrame();
  return (
    <Portret
      wie={<Figuur {...SAL_HOF} position={[-1.2, 0, 0.3]} rotation={[0, 0.8, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.5], elleboog: [0, 0] }, mond: 'lach' }} inHand={<Munt p={[0, 0, 0.1]} />} />}
      extra={
        <>
          <Figuur kleding={SARACEEN} hoofddeksel="tulband" baard position={[1.2, 0, 0.4]} rotation={[0, -0.8, 0]} pose={{ armL: { schouder: [-1.3, 0, 0.5], elleboog: [0, 0] }, mond: 'lach' }} />
          <Figuur kleding={MONNIK} hoofddeksel="tulband" position={[2.6, 0, -0.6]} rotation={[0, -0.5, 0]} inHand={<Rol />} />
          <Figuur kleding={OUDJE} haar="grijs" position={[0.2, 0, -1.6]} rotation={[0, -0.1, 0]} pose={{ mond: 'lach' }} />
          {Array.from({ length: Math.round(lin(f, 0, 120, 0, 8)) }, (_, i) => <Munt key={i} p={[0, 1.2 - i * 0.12, 0.6]} />)}
        </>
      }
    />
  );
};

export const S_Schatkist = ({ leeg = false }: { leeg?: boolean }) => {
  const f = useCurrentFrame();
  const deksel = ease(f, 10, 50, 0, -1.6);
  const zilver = leeg ? 0 : Math.round(lin(f, 50, 140, 0, 47));
  return (
    <Shot
      focus={[0, 0.8, 0]}
      scherpte={4}
      mist={['#1A120C', 5, 18]}
      over={leeg ? <LangTeller label="His funeral" waarde="Unpaid" pil="money had to be borrowed" /> : <LangTeller label="His treasury" waarde={`1 gold · ${zilver} silver`} />}
    >
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.4]} />
      <pointLight position={[0, 2.4, 1]} intensity={9} distance={7} color="#FFC070" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#4A3426" />
      <Camera pos={[ease(f, 0, 150, 1.6, 0.6), ease(f, 0, 150, 2.2, 1.9), ease(f, 0, 150, 3.4, 2.4)]} kijk={[0, 0.6, 0]} fov={34} />
      <Blok p={[0, 0.35, 0]} s={[1.6, 0.7, 1.0]} c="#6A4A2E" />
      <Blok p={[0, 0.69, 0]} s={[1.5, 0.02, 0.9]} c="#2A1E16" />
      <group position={[0, 0.72, -0.5]} rotation={[deksel, 0, 0]}>
        <Blok p={[0, 0.06, 0.5]} s={[1.62, 0.12, 1.02]} c="#7A5A3A" />
      </group>
      {!leeg && <Munt p={[0, 0.74, 0.05]} />}
      {!leeg && Array.from({ length: zilver }, (_, i) => <Munt key={i} goud={false} p={[-0.6 + (i % 10) * 0.13, 0.72, -0.35 + Math.floor(i / 10) * 0.16]} />)}
    </Shot>
  );
};

export const S_Lening = () => (
  <InKamer over={<LangTeller label="His funeral" waarde="Borrowed" />}>
    <Figuur kleding={BURGER} hoofddeksel="tulband" baard position={[0.2, 0, -0.3]} rotation={[0, 0.3, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.3] } }} inHand={<Blok p={[0, 0, 0.1]} s={[0.3, 0.3, 0.3]} c="#8A6A4A" />} />
    <Figuur kleding={AL_ADIL} hoofddeksel="tulband" baard position={[1.6, 0, 0.6]} rotation={[0, -0.9, 0]} pose={{ armL: { schouder: [-1.1, 0, 0.3], elleboog: [0, -0.2] }, wenk: -0.4 }} />
    {[0, 1, 2, 3].map((i) => <Munt key={i} p={[0.9 + i * 0.12, 0.92, 0.4]} />)}
  </InKamer>
);

export const S_Ridder = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={1.4} over={<><Schilderijlijst titel="The perfect knight" /><LangTeller label="In European stories" waarde="A chivalrous knight" /></>}>
      <Lucht boven="#6A4A8A" horizon="#E8C89A" />
      <Daglicht zon={[-8, 12, 8]} kleur="#FFE8C0" />
      <Grond kleur="#7E9A4E" />
      <Camera pos={[ease(f, 0, 150, 0.6, 0.2), 2.4, ease(f, 0, 150, 9.6, 8.8)]} kijk={[0, 2.3, 0]} fov={34} />
      <Ruiter k={SALADIN} position={[0, 0, 0]} rotation={[0, 0.9, 0]} t={0} kleur="#ECE6D8" dek="#C99A2E" pose={{ armR: omhoog() }} inHand={<Zwaard />} />
    </Shot>
  );
};

export const S_Dante = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2, -1]} scherpte={3} mist={['#2A2420', 10, 40]} over={<LangTeller label="Dante, Inferno IV" waarde="Among the noble souls" pil="c. 1314" />}>
      <Lucht boven="#1E1A18" horizon="#3A3028" />
      <hemisphereLight args={['#B8A88A', '#2A2018', 0.7]} />
      <pointLight position={[0, 5, 2]} intensity={14} distance={16} color="#FFE2A8" />
      <Grond kleur="#5A6A4A" />
      <Camera pos={[ease(f, 0, 170, 3, 1), 2.4, ease(f, 0, 170, 9, 7.4)]} kijk={[0, 2.2, -1.4]} fov={36} />
      {[-4.2, -1.4, 1.4, 4.2].map((x, i) => (
        <Sokkel key={i} position={[x, 0, -2]} h={0.8}>
          <Figuur kleding={i === 2 ? SALADIN_HOF : DANTE} o={BRONS} hoofddeksel={i === 2 ? 'tulband' : 'krans'} baard={i === 2 || i === 0} rotation={[0, -x * 0.08, 0]} pose={i % 2 ? ARMEN_GEKRUIST : { armR: wijs(1.2) }} />
        </Sokkel>
      ))}
      <Figuur kleding={DANTE} hoofddeksel="krans" position={[2.6, 0, 1.6]} rotation={[0, Math.PI + 0.5, 0]} pose={{ hoofd: [-0.2, 0, 0] }} />
    </Shot>
  );
};

export const S_Graf = ({ fase }: { fase: 'tuin' | 'marmer' | 'hout' }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot
      focus={fase === 'hout' ? [1.1, 0.6, 0] : fase === 'marmer' ? [-1.1, 0.6, 0] : [0, 1, 0]}
      scherpte={fase === 'tuin' ? 2.4 : 3.6}
      mist={['#2A3A2A', 10, 50]}
      over={fase === 'tuin' ? <JaarLabel jaar="1898" sub="a gift from the German emperor" /> : fase === 'marmer' ? <LangTeller label="Marble coffin" waarde="Empty" /> : <LangTeller label="Saladin lies in" waarde="The wooden one" />}
    >
      <Lucht boven="#3A5A6A" horizon="#C8D4B0" />
      <Daglicht zon={[-6, 12, 8]} kracht={1.4} />
      <Grond kleur="#6E8A4E" />
      <Camera
        pos={fase === 'tuin' ? [ease(f, 0, 170, 7, 4), ease(f, 0, 170, 4, 2.8), ease(f, 0, 170, 9, 7)] : fase === 'marmer' ? [ease(f, 0, 150, -2.4, -1.8), 1.8, ease(f, 0, 150, 3.2, 2.6)] : [ease(f, 0, 200, 2.6, 1.8), 1.7, ease(f, 0, 200, 3.0, 2.4)]}
        kijk={fase === 'tuin' ? [0, 1, 0] : fase === 'marmer' ? [-1.1, 0.6, 0] : [1.1, 0.6, 0]}
        fov={34}
      />
      <Blok p={[0, 2.2, -2.4]} s={[6, 4.4, 0.4]} c="#E6DCC8" />
      <Blok p={[0, 4.6, -2.4]} s={[6.4, 0.4, 0.8]} c="#D8CCB4" />
      <Blok p={[-1.1, 0.45, 0]} s={[1.0, 0.9, 2.2]} c="#F2EEE6" rough={0.3} />
      <Blok p={[-1.1, 0.95, 0]} s={[1.1, 0.12, 2.3]} c="#E6E0D4" rough={0.3} />
      <Blok p={[1.1, 0.4, 0]} s={[0.9, 0.8, 2.0]} c="#6A4A2E" />
      <Blok p={[1.1, 0.83, 0]} s={[0.95, 0.08, 2.05]} c="#5A3B24" />
      {[-3.4, 3.4].map((x, i) => <group key={i} position={[x, 0, -1]}><Blok p={[0, 1.4, 0]} s={[0.3, 2.8, 0.3]} c="#5A4A32" /><Blok p={[0, 3, 0]} s={[1.4, 1.2, 1.4]} c="#4E7A3A" /></group>)}
      {void t}
    </Shot>
  );
};

export const S_Slot = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={2.5} mist={['#E8C89A', 30, 160]}>
      <Woestijn avond />
      <Camera pos={[ease(f, 0, 200, 3.4, 4.4), 2.0, ease(f, 0, 200, 8.2, 9.4)]} kijk={[0, 3.0, 0]} fov={34} />
      <Rots position={[0, -1, -1]} schaal={[4, 2, 3]} kleur="#B48A5A" />
      <Figuur {...SAL} position={[0, 0.98, -0.4]} rotation={[0, 0.5, 0]} pose={ARMEN_GEKRUIST} />
    </Shot>
  );
};
