import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Banier, Camera, Fakkel, Galei, Ketting, Leger, Nachtlicht, Paard, Rivier, Schuim, Sokkel } from './Decor';
import { ARMEN_GEKRUIST, Blok, BRONS, Dolk, Kroon, omhoog, Rol, wijs, Zwaard, type Pose, type V3 } from './Figuur';
import { ease, FPS, lin, Shot } from '../lang/basis';
import { BoosTeken, camPos, FiguurL, Kat, Kip, Stofjes, Streepjes, Strooisel, Vogels, Wolk, Zweet } from '../lang/LeonidasKit';
import { Kraai, Muntstapel, Uitroep } from '../lang/BaibarsKit';
import {
  BRUTUS,
  BURGER,
  BURGER2,
  CAESAR,
  CAESAR_JONG,
  CLEOPATRA,
  CORNELIA,
  D,
  EGYPTENAAR,
  Forum,
  GALLIËR,
  KR,
  Land,
  LEGIONAIR,
  OpZee,
  Paleis,
  PIRAAT,
  POMPEIUS,
  S_Alesia,
  SENATOR,
  Straat,
  SULLA,
  TOGA_TRIOMF,
  Zaal,
} from '../lang/CaesarScenes';

/**
 * Scènes voor de Caesar-short (9:16), op het detailniveau van Leonidas/Baibars: alles leeft (knipperen, ademen,
 * zwevende camera), tekstwolken en cartoontekens per shot, en een running gag: de heilige kip van Rome
 * (de Romeinen namen echt kippen mee om voortekens te lezen) loopt door bijna elke scène.
 * Eigen camera per shot (wijdere lens voor staand beeld); die overschrijft de camera van het decor.
 */

const Cam = ({ c, k, fov = 46, duur = 130 }: { c: number[]; k: V3; fov?: number; duur?: number }) => {
  const f = useCurrentFrame();
  return <Camera pos={camPos(f, c, duur)} kijk={k} fov={fov} />;
};
const PRATEN = (f: number, snel = 5): Pose['mond'] => (Math.floor(f / snel) % 2 ? 'open' : 'dicht');
const OPZIJ: V3 = [0, Math.PI / 2, 0]; // naar de camera op het schip (die staat aan +x)
const LACH_PIRAAT = (f: number, i: number): Pose['mond'] => (Math.floor(f / 4 + i) % 2 ? 'lach' : 'open');

/** De heilige kip die over de grond scharrelt van a naar b. */
const LoopKip = ({ van, naar, a = 0, b = 110, y = 0 }: { van: [number, number]; naar: [number, number]; a?: number; b?: number; y?: number }) => {
  const f = useCurrentFrame();
  const p = lin(f, a, b, 0, 1);
  const dx = naar[0] - van[0];
  const dz = naar[1] - van[1];
  return <Kip position={[van[0] + dx * p, y, van[1] + dz * p]} rotation={[0, Math.atan2(dx, dz), 0]} t={p < 1 ? f / FPS : 0} />;
};

/** Grote woorden in beeld (2D), één voor één. */
const Woorden = ({ woorden, top = 330, start = 10, stap = 22, grootte = 130 }: { woorden: string[]; top?: number; start?: number; stap?: number; grootte?: number }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {woorden.map((w, i) => {
          const s = interpolate(f, [start + i * stap, start + i * stap + 6, start + i * stap + 10], [0.2, 1.15, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const o = interpolate(f, [start + i * stap, start + i * stap + 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={w} style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: grootte, color: '#F2C25A', WebkitTextStroke: '3px #4A2A0C', opacity: o, transform: `scale(${s})`, filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.65))' }}>
              {w}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ============ 1 · hook: de Subura ============ */

/** Kleine Caesar zwaait in zijn drukke straat; was boven zijn hoofd, een kat op een krat, de kip steekt over. */
export const C_Subura = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Straat kijk={[0, 1.1, 0]}>
      <Cam c={[0.5, 1.5, 4.6, 0.25, 1.35, 3.5]} k={[0, 1.05, 0]} fov={48} />
      <FiguurL kleding={CAESAR_JONG} position={[0, 0, 0]} scale={0.62} rotation={[0, 0.15, 0]} pose={{ armR: { schouder: [-2.7 + Math.sin(f / 5) * 0.25, 0, -0.35], elleboog: [0, -0.4] }, mond: 'lach' }} />
      {/* waslijn over de straat */}
      <Blok p={[0, 3.3, -1.5]} s={[7, 0.02, 0.02]} c="#3A2A1C" />
      {['#B5543A', '#E9E2D2', '#3E6B8A', '#C9A646', '#ECE6D8'].map((k, i) => (
        <Blok key={i} p={[-1.8 + i * 0.9, 3.0, -1.5]} s={[0.5, 0.55, 0.03]} r={[0, 0, Math.sin(t * 2 + i) * 0.08]} c={k} />
      ))}
      <Blok p={[-1.15, 0.35, -0.7]} s={[0.8, 0.7, 0.6]} c="#7A5A3A" />
      <Kat position={[-1.15, 0.7, -0.7]} rotation={[0, 0.4, 0]} />
      {[0, 1, 2].map((i) => <Blok key={i} p={[1.0 + i * 0.22, 0.12, -0.5]} s={[0.2, 0.24, 0.2]} c={['#C9A646', '#B5543A', '#5D8A40'][i]} />)}
      <FiguurL kleding={BURGER} position={[1.3, 0, -2.4]} rotation={[0, -0.5, 0]} pose={{ armR: wijs(0.9), mond: PRATEN(f, 7) }} />
      <FiguurL kleding={BURGER2} haar="lang" position={[-1.4, 0, -3.6]} rotation={[0, 0.6, 0]} pose={{ mond: PRATEN(f + 3, 7) }} />
      <LoopKip van={[1.6, 0.9]} naar={[-1.6, 0.6]} a={20} b={110} />
      <Vogels n={4} y={9} z={-30} x0={-14} breed={28} />
      <Stofjes midden={[0, 1.4, -1]} n={12} breed={3} />
    </Straat>
  );
};

/* ============ 2-3 · Sulla ============ */

/** Sulla wijst en blaft "DIVORCE HER."; Caesar slikt, Cornelia pakt zijn arm. */
export const C_Bevel = () => {
  const f = useCurrentFrame();
  return (
    <Zaal kijk={[0, 1.7, 0]}>
      <Cam c={[0.3, 2.3, 5.4, 0.1, 2.25, 4.7]} k={[0, 2.15, 0]} />
      <FiguurL kleding={SULLA} haar="grijs" position={[-0.75, 0, -0.2]} rotation={[0, 0.55, 0]} pose={{ armR: wijs(1.45), wenk: 1, mond: PRATEN(f) }} />
      <BoosTeken p={[-0.35, 2.55, 0]} s={0.35} />
      <FiguurL kleding={CAESAR_JONG} position={[0.7, 0, 0.3]} rotation={[0, -0.6, 0]} pose={{ wenk: -0.4, mond: 'dicht' }} />
      <Zweet p={[1.05, 2.25, 0.5]} n={2} />
      <FiguurL kleding={CORNELIA} haar="lang" position={[1.2, 0, -0.6]} rotation={[0, -0.9, 0]} pose={{ armL: wijs(1.0), wenk: -0.8 }} />
      {[-1.9, 1.9].map((x) => <FiguurL key={x} kleding={LEGIONAIR} hoofddeksel="helm" position={[x, 0, -2.4]} rotation={[0, -x * 0.2, 0]} inHand={<Blok p={[0, 0.4, 0]} s={[0.08, 2, 0.08]} c="#6B4A2E" />} />)}
      <Stofjes midden={[0, 2.2, -1.4]} n={14} breed={4} />
    </Zaal>
  );
};

/** Close-up: Caesar met de armen over elkaar, "NO."; achter hem valt Sulla's mond open en laat een wacht zijn speer zakken. */
export const C_Nee = () => {
  const f = useCurrentFrame();
  const val = ease(f, 30, 55, 0, 1);
  return (
    <Zaal kijk={[0.3, 2.0, 0]}>
      <Cam c={[0.55, 2.25, 3.2, 0.45, 2.2, 2.7]} k={[0.35, 2.2, 0]} />
      <FiguurL kleding={CAESAR_JONG} position={[0.35, 0, 0.3]} rotation={[0, -0.15, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.8, mond: f > 14 && f < 34 ? 'open' : 'dicht' }} />
      <FiguurL kleding={SULLA} haar="grijs" position={[-0.9, 0, -1.4]} rotation={[0, 0.5, 0]} pose={{ mond: 'open', wenk: -0.2, armR: wijs(lin(f, 10, 30, 1.45, 0.4)) }} />
      <FiguurL kleding={LEGIONAIR} hoofddeksel="helm" position={[1.6, 0, -1.8]} rotation={[0, -0.4, 0]} pose={{ mond: 'open' }} inHand={<group rotation={[val * 1.2, 0, 0]}><Blok p={[0, 0.4, 0]} s={[0.08, 2, 0.08]} c="#6B4A2E" /></group>} />
    </Zaal>
  );
};

/* ============ 4-9 · piraten ============ */

const DEK = (k: number, z: number): V3 => [k, D, z];

/** Piraten klimmen aan boord met getrokken zwaard; Caesar leest gewoon door. Kip op het dek. */
export const C_Gevangen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const klim = ease(f, 5, 40, -0.9, 0);
  return (
    <OpZee kijk={[0, 2.0, 2.4]}>
      <Cam c={[7.6, 2.7, 2.5, 6.9, 2.65, 2.4]} k={[0, 2.35, 2.3]} fov={44} />
      <FiguurL kleding={CAESAR_JONG} position={DEK(0, 3.5)} rotation={[0, 1.3, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] }, armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] }, hoofd: [0.3, 0, 0] }} inHand={<Rol />} />
      <FiguurL kleding={PIRAAT} hoofddeksel="bandana" baard position={DEK(0.3, 1.6)} rotation={OPZIJ} pose={{ armR: omhoog(), wenk: 1, mond: 'open' }} inHand={<Zwaard />} />
      <FiguurL kleding={PIRAAT} hoofddeksel="bandana" position={[0.9, D + klim, 0.8]} rotation={[0, 1.9, 0]} pose={{ armR: wijs(1.4), armL: wijs(1.2), mond: 'open', wenk: 0.8 }} />
      <Uitroep p={[0.4, 3.15, 1.2]} vanaf={8} />
      <Kip position={[0.6, D, 4.3]} rotation={[0, 2.2, 0]} t={f > 30 ? t : 0} />
      {f > 30 && <Streepjes p={[0.6, D + 0.7, 4.6]} r={OPZIJ} />}
      <group rotation={OPZIJ}><Vogels n={5} y={9} z={-40} meeuw x0={-20} breed={40} /></group>
    </OpZee>
  );
};

/** De kapitein: "20 TALENTS!" met twee vingers; Caesar trekt één wenkbrauw op. */
export const C_Twintig = () => {
  const f = useCurrentFrame();
  return (
    <OpZee kijk={[0, 2.2, 2.6]}>
      <Cam c={[5.6, 2.75, 2.6, 5.0, 2.7, 2.6]} k={[0, 2.65, 2.6]} fov={44} />
      <FiguurL kleding={PIRAAT} hoofddeksel="bandana" baard position={DEK(0.2, 1.8)} rotation={[0, 1.2, 0]} pose={{ armR: { schouder: [-2.2, 0, -0.3], elleboog: [0, -0.6] }, mond: PRATEN(f), wenk: 0.6 }} />
      <FiguurL kleding={CAESAR_JONG} position={DEK(0, 3.4)} rotation={[0, 1.9, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: -0.35, hoofd: [0, -0.2, 0.12] }} />
      <FiguurL kleding={PIRAAT} hoofddeksel="bandana" position={DEK(-0.8, 1.0)} rotation={[0, 1.6, 0]} pose={{ mond: 'lach' }} />
      <Muntstapel position={[0.4, D, 2.7]} n={4} />
    </OpZee>
  );
};

/** Caesar lacht: "MAKE IT 50." De piraten kijken elkaar aan, het stapeltje munten groeit. */
export const C_Vijftig = () => {
  const f = useCurrentFrame();
  return (
    <OpZee kijk={[0, 2.1, 2.6]}>
      <Cam c={[5.8, 2.75, 2.7, 5.2, 2.7, 2.6]} k={[0, 2.65, 2.6]} fov={44} />
      <FiguurL kleding={CAESAR_JONG} position={DEK(0, 3.4)} rotation={[0, 1.5, 0]} pose={{ armR: { schouder: [-1.5, 0, -0.6], elleboog: [0, -0.4] }, mond: f > 12 ? 'lach' : 'dicht', wenk: 0.3 }} />
      {[[0.2, 1.8], [-0.7, 1.1]].map(([x, z], i) => (
        <FiguurL key={i} kleding={PIRAAT} hoofddeksel="bandana" baard={i === 0} position={DEK(x, z)} rotation={[0, 1.0 + i * 0.5, 0]} pose={{ mond: 'open', wenk: -0.4, hoofd: [0, f > 50 ? (i ? 0.5 : -0.5) : 0, 0] }} />
      ))}
      <Zweet p={[0.55, 2.4, 1.6]} n={2} />
      <Muntstapel position={[0.4, D, 2.7]} n={Math.round(lin(f, 20, 90, 4, 10))} />
    </OpZee>
  );
};

/** Avondrood: Caesar belooft glimlachend dat hij terugkomt. De piraten liggen dubbel. */
export const C_Belofte = () => {
  const f = useCurrentFrame();
  return (
    <OpZee avond kijk={[0, 2.1, 2.6]}>
      <Cam c={[6.0, 2.8, 2.8, 5.4, 2.75, 2.6]} k={[0, 2.7, 2.6]} fov={44} />
      <FiguurL kleding={CAESAR_JONG} position={DEK(0, 3.4)} rotation={[0, 1.4, 0]} pose={{ armR: wijs(1.3), mond: 'lach', wenk: 0.5 }} />
      {[[0.2, 1.8], [-0.7, 1.1]].map(([x, z], i) => (
        <FiguurL key={i} kleding={PIRAAT} hoofddeksel="bandana" baard={i === 0} position={DEK(x, z)} rotation={[0, 1.2 + i * 0.4, 0]} pose={{ mond: LACH_PIRAAT(f, i), hoofd: [-0.25, 0, 0] }} />
      ))}
    </OpZee>
  );
};

/** De piraten slaan zich op de knieën van het lachen; "HAHA" in wolkjes, de kip schrikt. */
export const C_Grap = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <OpZee avond kijk={[0, 2.0, 1.6]}>
      <Cam c={[5.2, 2.6, 1.6, 4.7, 2.55, 1.55]} k={[0, 2.5, 1.5]} fov={46} />
      {[[0.2, 2.2], [-0.4, 1.1], [0.5, 0.6]].map(([x, z], i) => (
        <FiguurL key={i} kleding={PIRAAT} hoofddeksel="bandana" baard={i !== 1} position={[x, D + Math.abs(Math.sin(f / 4 + i)) * 0.06, z]} rotation={[0, 1.4 - i * 0.2, 0]} pose={{ mond: LACH_PIRAAT(f, i), hoofd: [-0.3, 0, Math.sin(f / 5 + i) * 0.15], armR: { schouder: [-0.4 - Math.abs(Math.sin(f / 4 + i)) * 0.6, 0, -0.2], elleboog: [0, -0.6] } }} />
      ))}
      <Wolk p={[0.4, 3.15, 2.3]} r={OPZIJ} tekst="HAHA" b={0.7} h={0.34} vanaf={6} staart={-1} />
      <Wolk p={[0.6, 3.05, 0.8]} r={OPZIJ} tekst="HAHAHA" b={0.9} h={0.34} vanaf={18} staart={1} />
      <Kip position={[0.8, D, 1.6]} rotation={[0, 1.4, 0]} t={t} />
      <Streepjes p={[0.9, D + 0.7, 1.4]} r={OPZIJ} />
    </OpZee>
  );
};

/** Op het strand: de piraten aan een ketting, Caesar loopt glimlachend langs en zwaait: "TOLD YOU." */
export const C_NietGrap = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 110, 1.6, 0.6);
  return (
    <OpZee avond schip={false} kijk={[0, 1.3, 0]}>
      <Cam c={[0.2, 2.2, 7.6, 0.1, 2.15, 6.8]} k={[0.1, 1.95, 0]} />
      <Blok p={[0, -0.2, 0]} s={[14, 0.6, 8]} c="#C9AE82" />
      {[-1.4, -0.6, 0.2].map((px, i) => (
        <FiguurL key={px} kleding={PIRAAT} hoofddeksel="bandana" baard={i !== 1} position={[px, 0.1, -0.9]} rotation={[0, 0.2, 0]} pose={{ armL: { schouder: [0.3, 0, 0.2], elleboog: [0, -0.6] }, armR: { schouder: [0.3, 0, -0.2], elleboog: [0, 0.6] }, wenk: -0.9, mond: 'dicht', hoofd: [0.25, 0, 0] }} />
      ))}
      <Ketting van={-1.6} tot={0.4} y={0.95} z={-0.75} />
      <Zweet p={[-0.25, 2.3, -0.7]} />
      <FiguurL kleding={CAESAR_JONG} position={[x, 0.1, 0.6]} rotation={[0, -0.3, 0]} pose={{ armR: { schouder: [-2.6 + Math.sin(f / 5) * 0.2, 0, -0.4], elleboog: [0, -0.3] }, mond: 'lach' }} />
      <Wolk p={[x - 0.1, 2.85, 0.8]} tekst="TOLD YOU." b={1.0} h={0.38} vanaf={30} staart={-1} />
      <FiguurL kleding={LEGIONAIR} hoofddeksel="helm" position={[1.9, 0.1, -1.4]} rotation={[0, -0.6, 0]} inHand={<Blok p={[0, 0.4, 0]} s={[0.08, 2, 0.08]} c="#6B4A2E" />} />
      <Galei position={[-6, 0, -12]} rotation={[0, 0.4, 0]} deining={t} />
      <Vogels n={5} y={7} z={-25} meeuw x0={-16} breed={32} />
    </OpZee>
  );
};

/* ============ 10-11 · Gallië ============ */

/** Alesia van bovenaf (twee muren, twee legers), met een rode "YOU"-pijl naar het midden. */
export const C_Alesia = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [30, 38, 42], [0, 1.15, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <>
      <S_Alesia ringen={2} slag />
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 930, left: 0, right: 0, textAlign: 'center', transform: `scale(${s})`, fontFamily: 'Inter, Arial, sans-serif', fontWeight: 900, fontSize: 64, color: '#FF5436', WebkitTextStroke: '3px #2A120C' }}>
          YOU ↓
        </div>
      </AbsoluteFill>
    </>
  );
};

/** Vercingetorix gooit zijn zwaard voor Caesars voeten; de kip pikt eraan, het legioen juicht. */
export const C_Overgave = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const val = ease(f, 22, 40, 0, 1);
  return (
    <Land bos={false} kijk={[0, 1.6, 0]}>
      <Cam c={[0.2, 2.1, 6.4, 0.1, 2.05, 5.6]} k={[0, 1.75, 0]} />
      <Strooisel n={60} straal={9} vrij={1.6} />
      <FiguurL {...KR} position={[0.75, 0, 0.3]} rotation={[0, -0.7, 0]} pose={{ ...ARMEN_GEKRUIST, mond: f > 45 ? 'lach' : 'dicht', wenk: 0.2 }} />
      <FiguurL kleding={GALLIËR} haar="lang" snor position={[-0.8, 0, -0.1]} rotation={[0, 0.8, 0]} pose={{ armR: { schouder: [lin(f, 8, 24, -1.4, -0.3), 0, -0.1], elleboog: [0, -0.2] }, hoofd: [0.3, 0, 0], wenk: -0.8 }} inHand={f < 24 ? <Zwaard /> : undefined} />
      {f >= 24 && <group position={[0.05, 0.05 + (1 - val) * 1.1, 0.5]} rotation={[-(1 - val) * 1.2 - Math.PI / 2, 0.5 + (1 - val) * 1.4, 0]}><Zwaard /></group>}
      <Kip position={[0.3, 0, 1.0]} rotation={[0, -2.6 + (f > 50 ? Math.sin(f / 3) * 0.2 : 0), 0]} t={f > 50 && f < 80 ? t : 0} />
      <Banier position={[1.9, 0, -2.6]} tekst t={t} />
      <Leger rijen={2} kolommen={5} position={[0.8, 0, -4.4]} t={t} geweerOmhoog={f > 45} />
      <Vogels n={4} y={10} z={-30} x0={-14} breed={28} />
    </Land>
  );
};

/* ============ 12-13 · de Rubicon ============ */

/** Nacht aan de Rubicon: Caesar gooit een dobbelsteen op; hij tolt voor de camera omhoog. */
export const C_Teerling = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const p = lin(f, 22, 70, 0, 1);
  const dy = Math.sin(p * Math.PI) * 1.4;
  return (
    <Shot focus={[0, 2.6, -2.6]} scherpte={3} mist={['#0E1220', 10, 45]}>
      <Cam c={[1.9, 3.3, 0.7, 1.6, 3.25, 0.35]} k={[0.1, 3.25, -3]} fov={46} />
      <Nachtlicht />
      <Rivier t={t} breed={6} />
      <Paard position={[0, 0.3, -3]} rotation={[0, Math.PI - 0.15, 0]} t={t} ruiter={<FiguurL {...KR} pose={{ armR: f < 22 ? wijs(1.2) : omhoog(), wenk: 0.7, mond: f > 30 ? 'open' : 'dicht' }} />} />
      {f >= 22 && (
        <group position={[0.45 + p * 0.25, 3.7 + dy, -2.9 + p * 0.3]} rotation={[f * 0.25, f * 0.18, 0]}>
          <Blok p={[0, 0, 0]} s={[0.22, 0.22, 0.22]} c="#F4EEE2" />
          {[[0, 0, 0.112], [0.06, 0.06, 0.112], [-0.06, -0.06, 0.112]].map((q, i) => <Blok key={i} p={q as V3} s={[0.04, 0.04, 0.01]} c="#1A120A" />)}
        </group>
      )}
      <Leger rijen={3} kolommen={6} position={[0, 0.3, -6.5]} t={t} />
      {[-2.4, 2.4].map((x) => <Fakkel key={x} position={[x, 0.3, -4.4]} t={t} />)}
    </Shot>
  );
};

/** Caesar rijdt de rivier in; het water spat op, het legioen volgt, een kikker springt weg. */
export const C_Over = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 100, -3.5, 0.8);
  return (
    <Shot focus={[0, 1.6, z]} scherpte={3} mist={['#0E1220', 8, 40]}>
      <Cam c={[4.4, 3.1, 3.2, 4.0, 3.05, 2.8]} k={[0, 2.75, z]} fov={46} />
      <Nachtlicht />
      <Rivier t={t} breed={10} />
      <Paard position={[0, -0.15, z]} rotation={[0, Math.PI, 0]} t={t} loopt ruiter={<FiguurL {...KR} pose={{ armR: wijs(1.3), mond: 'open', wenk: 0.6 }} />} />
      <Schuim punten={[[0.4, -0.2, z + 0.6], [-0.4, -0.2, z + 0.5], [0.5, -0.2, z - 0.6], [-0.5, -0.2, z - 0.6], [0, -0.2, z + 1.0]]} t={t} />
      <Leger rijen={3} kolommen={4} position={[0, -0.1, z - 3.2]} t={t} />
      {[-2.6, 2.4].map((x, i) => <Fakkel key={x} position={[x, 0.3, z - 2 - i]} t={t} />)}
    </Shot>
  );
};

/* ============ 14 · Cleopatra ============ */

/** Het tapijt rolt uit, Cleopatra springt op: "SURPRISE!"; Caesar schrikt, de kat en de kip ook. */
export const C_Tapijt = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const rol = ease(f, 0, 30, 0, 1);
  const op = ease(f, 28, 46, 0, 1);
  return (
    <Paleis kijk={[0, 1.4, -1.6]}>
      <Cam c={[0.3, 2.3, 4.8, 0.2, 2.25, 4.1]} k={[0, 1.85, -1.4]} />
      <Blok p={[0, 0.02, -rol * 1.0]} s={[1.6, 0.03, 0.01 + rol * 2.0]} c="#8E2A24" />
      {[-0.55, 0, 0.55].map((x) => <Blok key={x} p={[x, 0.04, -rol * 1.0]} s={[0.08, 0.02, rol * 1.9]} c="#D8A945" />)}
      <mesh position={[0, 0.17, -rol * 2.0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.15 + (1 - rol) * 0.25, 0.15 + (1 - rol) * 0.25, 1.6, 12]} /><meshStandardMaterial color="#8E2A24" roughness={0.9} /></mesh>
      <FiguurL kleding={CLEOPATRA} haar="bob" hoofddeksel="hoofdband" position={[0, -2.4 + op * 2.4, -2.1]} pose={{ mond: 'lach', armL: omhoog(), armR: { schouder: [-2.6 + Math.sin(f / 4) * 0.2, 0, -0.4], elleboog: [0, -0.3] } }} />
      {f > 44 && <Wolk p={[-0.55, 2.7, -1.7]} tekst="SURPRISE!" b={1.1} h={0.4} vanaf={44} staart={1} />}
      <FiguurL {...KR} position={[1.0, 0, 0.3]} rotation={[0, -0.7, 0]} pose={f > 40 ? { armL: omhoog(), armR: { schouder: [-2.4, 0, -0.5], elleboog: [0, -0.5] }, mond: 'open', wenk: -0.5 } : { wenk: 0 }} />
      {f > 40 && <Uitroep p={[1.35, 2.7, 0.4]} vanaf={40} />}
      <FiguurL kleding={EGYPTENAAR} position={[-1.3, 0, -0.4]} rotation={[0, 0.7, 0]} pose={{ mond: f > 40 ? 'open' : 'dicht' }} inHand={<Blok p={[0, 0.4, 0]} s={[0.08, 2, 0.08]} c="#8A6A3A" />} />
      <Kat position={[-0.9, 0, 0.9]} rotation={[0, 0.9, 0]} kijk={f > 40} />
      <Kip position={[0.5, 0, 1.0]} rotation={[0, -1.2, 0]} t={f > 42 && f < 70 ? t : 0} />
      {f > 42 && <Streepjes p={[0.75, 0.6, 1.1]} />}
      <Stofjes midden={[0, 1.8, -1.2]} n={14} breed={3} />
    </Paleis>
  );
};

/* ============ 15 · veni vidi vici ============ */

/** Caesar te paard wijst vooruit; in de verte vlucht een vijandelijk leger; VENI / VIDI / VICI. */
export const C_Veni = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <>
      <Land groen={false} bos={false} kijk={[0, 1.8, 0]}>
        <Cam c={[0.6, 2.4, 7.0, 0.4, 2.35, 6.2]} k={[0, 2.4, 0]} />
        <Strooisel n={60} straal={10} vrij={1.6} droog />
        <Paard position={[0, 0, 0]} rotation={[0, Math.PI + 0.4, 0]} t={t} ruiter={<FiguurL {...KR} pose={{ armR: wijs(1.5), mond: 'lach', wenk: 0.4 }} />} />
        <Leger rijen={2} kolommen={6} kleur="#5A6E8A" position={[0, 0, lin(f, 0, 110, -9, -13)]} rotation={[0, Math.PI, 0]} t={t * 2} />
        <Leger rijen={2} kolommen={4} position={[-1.8, 0, -2.4]} t={t} />
        <Vogels n={4} y={10} z={-30} x0={-14} breed={28} />
      </Land>
      <Woorden woorden={['VENI', 'VIDI', 'VICI']} top={120} start={8} stap={24} grootte={92} />
    </>
  );
};

/* ============ 16-17 · dictator ============ */

/** Gouden stoel, Caesar in purper; twee senatoren buigen, muntjes met zijn hoofd vallen. */
export const C_Dictator = () => {
  const f = useCurrentFrame();
  return (
    <Zaal warm kijk={[0, 1.7, -1]}>
      <Cam c={[0.2, 2.2, 5.2, 0.1, 2.15, 4.4]} k={[0, 2.1, -1]} />
      <Blok p={[0, 0.15, -1]} s={[2.2, 0.3, 1.6]} c="#B8946A" />
      <Blok p={[0, 0.65, -1]} s={[1.0, 0.1, 0.9]} c="#E0B04E" metal={0.6} rough={0.3} />
      <Blok p={[0, 1.35, -1.4]} s={[1.0, 1.4, 0.1]} c="#E0B04E" metal={0.6} rough={0.3} />
      <FiguurL kleding={TOGA_TRIOMF} hoofddeksel="krans" position={[0, 0.7, -1]} pose={{ armR: wijs(0.7), mond: 'lach', wenk: 0.3 }} />
      {[-1.2, 1.2].map((x, i) => <FiguurL key={x} kleding={SENATOR} haar={i ? 'grijs' : 'kort'} position={[x, 0, 0.2]} rotation={[0, x < 0 ? 2.4 : -2.4, 0]} pose={{ hoofd: [0.55, 0, 0], armR: wijs(0.6), armL: wijs(0.6) }} />)}
      {Array.from({ length: 7 }, (_, i) => {
        const y = 3.6 - (((f * 0.03 + i * 0.47) % 3.4));
        return <group key={i} position={[-1.4 + i * 0.47, y, 0.6 - (i % 3) * 0.4]} rotation={[f * 0.1 + i, 0, 0]}><mesh><cylinderGeometry args={[0.09, 0.09, 0.02, 14]} /><meshStandardMaterial color="#E0B04E" metalness={0.6} roughness={0.3} /></mesh></group>;
      })}
      <Stofjes midden={[0, 2.2, -1.6]} n={14} breed={3} />
    </Zaal>
  );
};

/** Een kroon zweeft boven Caesars hoofd; achter hem fluisteren senatoren met boze tekens: "KING?!" */
export const C_Koning = () => {
  const f = useCurrentFrame();
  return (
    <Zaal warm kijk={[0, 1.9, -0.6]}>
      <Cam c={[0.25, 2.5, 4.3, 0.15, 2.45, 3.7]} k={[0, 2.45, -0.6]} />
      <FiguurL kleding={TOGA_TRIOMF} hoofddeksel="krans" position={[0, 0, 0]} pose={{ mond: 'lach', hoofd: [0, 0, 0], armR: { schouder: [-2.4, 0, -0.5], elleboog: [0, -1.2] } }} />
      <Kroon position={[0, 2.95 + Math.sin(f / 8) * 0.06, 0]} />
      {[-1.0, 0.95].map((x, i) => (
        <group key={x}>
          <FiguurL kleding={i ? BRUTUS : SENATOR} haar={i ? 'kort' : 'grijs'} position={[x, 0, -1.7]} rotation={[0, -x * 0.5, 0]} pose={{ wenk: 1, mond: PRATEN(f + i * 3, 6), hoofd: [0, -x * 0.3, 0] }} />
          <BoosTeken p={[x + (x < 0 ? -0.35 : 0.35), 2.6, -1.5]} s={0.3} />
        </group>
      ))}
      <Wolk p={[-0.8, 2.75, -1.0]} tekst="KING?!" b={0.8} h={0.36} vanaf={30} staart={1} />
    </Zaal>
  );
};

/* ============ 18-20 · de Ides ============ */

/** De senatoren sluiten de kring, de dolken achter hun rug. Een kraai op een zuil. */
export const C_Kring = () => {
  const f = useCurrentFrame();
  const r = ease(f, 0, 100, 2.3, 1.45);
  return (
    <Zaal kijk={[0, 1.6, 0]} lengte={4}>
      <Cam c={[0.4, 4.6, 5.6, 0.25, 4.0, 4.8]} k={[0, 1.2, 0]} />
      <FiguurL {...KR} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach' }} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.5;
        return (
          <FiguurL
            key={i}
            kleding={i === 2 ? BRUTUS : SENATOR}
            haar={i % 2 ? 'grijs' : 'kort'}
            position={[Math.sin(a) * r, 0, Math.cos(a) * r]}
            rotation={[0, a + Math.PI, 0]}
            pose={{ wenk: 1, armR: { schouder: [0.5, 0, -0.1], elleboog: [0, 0] } }}
            inHand={<group rotation={[Math.PI, 0, 0]}><Dolk /></group>}
          />
        );
      })}
      <Kraai position={[-2.4, 4.2, -2.6]} rotation={[0, 0.6, 0]} />
    </Zaal>
  );
};

/** Close-up: Caesar ziet Brutus. "...BRUTUS?" Brutus' schouder wazig op de voorgrond. */
export const C_Brutus = () => {
  const f = useCurrentFrame();
  return (
    <Zaal kijk={[0.1, 2.1, 0]}>
      <Cam c={[-0.5, 2.15, 2.8, -0.4, 2.1, 2.4]} k={[0.1, 2.05, 0]} />
      <FiguurL {...KR} position={[0.15, 0, 0]} rotation={[0, -0.35, 0]} pose={{ wenk: -1, mond: 'open', traan: lin(f, 40, 100, 0, 1) }} />
      <Wolk p={[0.75, 2.85, 0.3]} tekst="...BRUTUS?" b={1.0} h={0.36} vanaf={24} staart={-1} />
      <FiguurL kleding={BRUTUS} position={[-0.75, 0, 1.0]} rotation={[0, 2.6, 0]} pose={{ wenk: 0.6 }} />
    </Zaal>
  );
};

/** Aan de voet van het beeld van Pompeius trekt Caesar zijn toga over zijn gezicht. Geen bloed. */
export const C_Toga = () => {
  const f = useCurrentFrame();
  const toga = ease(f, 15, 45, 0, 1);
  return (
    <Zaal warm kijk={[0, 1.9, -0.6]}>
      <Cam c={[0.5, 1.9, 4.6, 0.35, 1.9, 3.9]} k={[0, 2.0, -0.6]} />
      <Sokkel position={[-0.8, 0, -1.6]} h={1.2}>
        <FiguurL kleding={POMPEIUS} o={{ kleur: '#E9E4DA', ruw: 0.5 }} rotation={[0, 0.4, 0]} pose={{ armR: wijs(1.0) }} />
      </Sokkel>
      <FiguurL {...KR} position={[0.45, 0, 0]} rotation={[0, -0.3, 0]} pose={{ armL: { schouder: [-2.6 * toga, 0, 0.3], elleboog: [0, -1.6 * toga] }, armR: { schouder: [-2.6 * toga, 0, -0.3], elleboog: [0, -1.6 * toga] }, ogen: 'dicht', wenk: -0.8 }} />
      <Blok p={[0.45 - 0.04, 2.1, 0.13]} s={[0.62 * toga, 0.6 * toga, 0.1]} c="#F1ECE1" r={[0, -0.3, 0]} />
      <Stofjes midden={[0, 2.2, -1.2]} n={14} breed={3} />
    </Zaal>
  );
};

/* ============ 21 · erfenis ============ */

/** Bronzen Caesar op het Forum; de heilige kip zit bovenop zijn hoofd. KAISER / TSAR. */
export const C_Erfenis = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <>
      <Forum kijk={[0, 3.2, 0]}>
        <Cam c={[0.6, 1.6, 9.4, 0.4, 2.0, 8.0]} k={[0, 3.3, 0]} />
        <Sokkel position={[0, 0, 0]} h={1.9}>
          <FiguurL kleding={CAESAR} o={BRONS} hoofddeksel="krans" rotation={[0, 0.25, 0]} scale={1.2} pose={{ armR: wijs(1.45) }} />
          <Kip position={[0, 3.25, 0]} rotation={[0, 0.6 + Math.sin(f / 20) * 0.4, 0]} t={0} />
        </Sokkel>
        {[-2.4, 2.4].map((x, i) => <FiguurL key={x} kleding={i ? BURGER2 : BURGER} position={[x, 0, 1.8]} rotation={[0, x < 0 ? -2.6 : 2.6, 0]} pose={{ hoofd: [-0.4, 0, 0], mond: 'open' }} />)}
        <Vogels n={5} y={11} z={-30} x0={-14} breed={28} />
      </Forum>
      <Woorden woorden={['KAISER', 'TSAR']} top={170} start={14} stap={18} grootte={110} />
    </>
  );
};

