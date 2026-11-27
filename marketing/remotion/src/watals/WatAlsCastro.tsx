import { ThreeCanvas } from '@remotion/three';
import { createContext, useContext, type ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avondlicht, Berg, Binnenlicht, Bos, Camera, Daglicht, Grond, Lucht, Menigte, Nachtlicht, Rook, Scherpte, Zee, Zon, Zuil } from './Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs, type Kleding, type V3 } from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';
import { hookVolgorde, knippen, startsVoor, type Hook, type HookPlan } from './hooks';
import { Palm } from '../lang/BaibarsKit';
import { Geweer } from '../lang/AtaturkKit';

/**
 * "What if you were Fidel Castro?" — 14 scènes, onder de 58 s. Fanverzoek (@nitheesh21_, "Fidel Castro of Che
 * Guevara", 11♥ onder Stalin). Castro is de held, Che zijn rechterhand (eigenaar, 27 nov).
 * Castro vanaf de Sierra: olijfgroen uniform, volle zwarte baard, pet, sigaar. Daarvoor (student, Moncada, rechtbank,
 * Mexico) zonder baard, met snor. Che: baret met ster, lang haar, dunne baard.
 * Geen geweld in beeld (Moncada = rook en flitsen in de verte, Varkensbaai = rook boven het strand). De tekst noemt de
 * prijs wél: gevangen critici, een miljoen die vertrekken. Slot = de vraag "hero or tyrant?".
 */

const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

type TellerDef = { label: string; waarde: string; pil?: string };
type SceneProps = { children: ReactNode; focus: V3; scherpte?: number; mist?: [string, number, number]; teller?: TellerDef; tekst?: Deel[]; nr: number };

/** Welke hook deze scène opent (null = geen opener). De opener toont tekst en teller vanaf frame 0. */
const OpenerCtx = createContext<Hook | null>(null);

const Scène = ({ children, focus, scherpte = 3, mist, teller, tekst, nr }: SceneProps) => {
  const { width, height } = useVideoConfig();
  const opener = useContext(OpenerCtx);
  const eigen = opener && opener !== 'A' && HOOK_OPENER[opener].scène === nr ? HOOK_OPENER[opener] : undefined;
  const t = eigen?.teller ?? teller;
  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
        {mist && <fog attach="fog" args={mist} />}
        {children}
        <Scherpte focus={focus} sterkte={scherpte} />
      </ThreeCanvas>
      <Vignet />
      {t && <Teller label={t.label} waarde={t.waarde} pil={t.pil} start={opener ? -12 : 3} />}
      {(eigen?.tekst ?? tekst) && <Onderschrift start={opener ? -15 : 9} delen={(eigen?.tekst ?? tekst)!} />}
    </AbsoluteFill>
  );
};

/* ================= kit ================= */

export const OLIJF = '#55603C';
export const CASTRO: Kleding = { huid: '#E2B48E', haar: '#1E1814', tuniek: OLIJF, benen: OLIJF, schoenen: '#151210', laarzen: '#151210', riem: '#2A1E16' };
export const CASTRO_OUD: Kleding = { ...CASTRO, haar: '#B9B4AA' };
export const CASTRO_JONG: Kleding = { huid: '#E2B48E', haar: '#1E1814', tuniek: '#E8E2D2', benen: '#3A3A40', schoenen: '#151210', riem: '#151210' };
export const CASTRO_PAK: Kleding = { huid: '#E2B48E', haar: '#1E1814', tuniek: '#5A5E66', benen: '#5A5E66', schoenen: '#151210' };
export const MONCADA: Kleding = { huid: '#E2B48E', haar: '#1E1814', tuniek: '#8A7A56', benen: '#8A7A56', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const CHE: Kleding = { huid: '#E6BC94', haar: '#2A1E16', tuniek: '#5E6444', benen: '#5E6444', schoenen: '#151210', laarzen: '#151210', riem: '#2A1E16' };
export const CHE_BURGER: Kleding = { huid: '#E6BC94', haar: '#2A1E16', tuniek: '#D8CDB4', benen: '#4A4036', schoenen: '#2A1E16' };
export const VADER: Kleding = { huid: '#E2B48E', haar: '#6A6058', tuniek: '#EDE6D6', benen: '#C9BC9A', schoenen: '#4A3424', riem: '#4A3424' };
export const JONGEN: Kleding = { huid: '#E2B48E', haar: '#1E1814', tuniek: '#F2ECDE', benen: '#8A7A5E', schoenen: '#4A3424' };
export const REBEL: Kleding = { huid: '#D8A880', haar: '#2A1E16', tuniek: '#5A6040', benen: '#4E5436', schoenen: '#151210', laarzen: '#151210', riem: '#2A1E16' };
export const RECHTER: Kleding = { huid: '#E2B48E', haar: '#4A4038', tuniek: '#151214', rok: '#151214', schoenen: '#151210' };
export const STUDENT: Kleding = { huid: '#D8A880', haar: '#2A1E16', tuniek: '#E8E2D2', benen: '#4A4A50', schoenen: '#151210' };
export const RUS: Kleding = { huid: '#E8C4A0', haar: '#8A6A44', tuniek: '#6A6A4A', benen: '#6A6A4A', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };

/** Patrouillepet (hoofdgroep; oorsprong = hals). */
export const Pet = ({ kleur = OLIJF }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.78, -0.01]} s={[0.66, 0.24, 0.62]} c={kleur} rough={0.95} />
    <Blok p={[0, 0.67, 0.37]} s={[0.56, 0.04, 0.22]} c={kleur} rough={0.95} />
  </>
);
/** Sigaar in de mondhoek, met gloeiende punt. */
export const Sigaar = ({ gloed = true }: { gloed?: boolean }) => (
  <group position={[0.1, 0.2, 0.36]} rotation={[0.18, 0.35, 0]}>
    <Blok p={[0, 0, 0.13]} s={[0.06, 0.06, 0.28]} c="#6A3E1E" rough={0.9} />
    <Blok p={[0, 0, 0.28]} s={[0.065, 0.065, 0.03]} c={gloed ? '#FF7A2A' : '#8A8078'} emissive={gloed ? '#FF5A10' : undefined} />
  </group>
);
/** Baret met de ster van Che (hoofdgroep). */
export const Baret = () => (
  <>
    <Blok p={[0.04, 0.73, 0]} s={[0.72, 0.14, 0.68]} r={[0, 0, -0.12]} c="#16161A" rough={0.95} />
    <Blok p={[-0.14, 0.72, 0.345]} s={[0.1, 0.1, 0.02]} r={[0, 0, Math.PI / 4]} c="#C9A646" metal={0.5} rough={0.35} />
  </>
);

export const FIDEL = { kleding: CASTRO, haar: 'kort' as const, baard: true, levend: true, hoofdExtra: <><Pet /><Sigaar /></> };
export const FIDEL_ZONDER = { kleding: CASTRO, haar: 'kort' as const, baard: true, levend: true, hoofdExtra: <Pet /> };
export const CHE_F = { kleding: CHE, haar: 'lang' as const, baard: true, levend: true, hoofdExtra: <Baret /> };

/** Cubaanse vlag aan een stok (doek naar +x): drie blauwe en twee witte banen, rode driehoek met witte ster. */
export const CubaVlag = ({ position, t = 0, h = 4.6 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.1, h, 0.1]} c="#5A3B24" />
    <group position={[1.05, h - 0.75, 0.03]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      {[0, 1, 2, 3, 4].map((i) => <Blok key={i} p={[0, 0.52 - i * 0.26, 0]} s={[2.0, 0.26, 0.04]} c={i % 2 ? '#F4F0E6' : '#1E3F8A'} />)}
      <mesh position={[-1.0, 0, 0.03]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.75, 0.75, 0.02, 3]} />
        <meshStandardMaterial color="#C8202A" roughness={0.8} />
      </mesh>
      <mesh position={[-0.74, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
    </group>
  </group>
);
/** Rood-zwarte vlag van de 26 juli-beweging. */
export const M26Vlag = ({ position, t = 0, h = 4 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.08, h, 0.08]} c="#5A3B24" />
    <group position={[0.85, h - 0.6, 0.03]} rotation={[0, Math.sin(t * 2.2) * 0.14, 0]}>
      <Blok p={[0, 0.25, 0]} s={[1.6, 0.5, 0.04]} c="#C8202A" />
      <Blok p={[0, -0.25, 0]} s={[1.6, 0.5, 0.04]} c="#161616" />
    </group>
  </group>
);

/** Koloniale gevels van Havana in pastel, met bogen (naar +z). */
export const Gevels = ({ z = -8, x0 = -16, n = 8 }: { z?: number; x0?: number; n?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const k = ['#E8C28A', '#9AC4C0', '#E6A08A', '#F0E2B6', '#B8C890', '#E8B4C0'][i % 6];
      const h = 6 + (i % 3) * 1.4;
      return (
        <group key={i} position={[x0 + i * 4.2, 0, z - (i % 2) * 0.6]}>
          <Blok p={[0, h / 2, 0]} s={[4.1, h, 3]} c={k} rough={1} />
          {[-1.1, 1.1].map((ax) => <Blok key={ax} p={[ax, 1.3, 1.52]} s={[1.3, 2.4, 0.04]} c="#4A3A30" />)}
          {[-1.1, 1.1].map((ax) => <Blok key={`r${ax}`} p={[ax, h - 2.0, 1.52]} s={[0.9, 1.4, 0.04]} c="#3A4A5A" />)}
          <Blok p={[0, h - 1.2, 1.7]} s={[3.6, 0.1, 0.5]} c="#E8E2D2" />
          <Blok p={[0, h + 0.15, 0]} s={[4.3, 0.3, 3.2]} c="#EDE6D6" />
        </group>
      );
    })}
  </>
);

/** Amerikaanse auto uit de jaren '50, neus naar +x. */
export const Oldtimer = ({ position, rotation, kleur = '#C8402A' }: { position: V3; rotation?: V3; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.62, 0]} s={[4.0, 0.62, 1.7]} c={kleur} metal={0.25} rough={0.35} />
    <Blok p={[-0.3, 1.22, 0]} s={[2.0, 0.6, 1.55]} c="#F2ECE0" metal={0.2} rough={0.35} />
    <Blok p={[-0.3, 1.24, 0.79]} s={[1.7, 0.36, 0.02]} c="#3A4450" rough={0.2} />
    <Blok p={[2.02, 0.55, 0]} s={[0.06, 0.2, 1.5]} c="#D8DCE0" metal={0.7} rough={0.25} />
    {[[-1.3, 0.82], [1.3, 0.82], [-1.3, -0.82], [1.3, -0.82]].map(([x, z]) => (
      <mesh key={`${x}${z}`} position={[x, 0.36, z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.2, 12]} />
        <meshStandardMaterial color="#121212" roughness={0.9} />
      </mesh>
    ))}
  </group>
);

/** Tank, loop naar +x (Varkensbaai, de intocht in Havana). */
export const Tank = ({ position, rotation, kleur = '#4E5A3A' }: { position: V3; rotation?: V3; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    {[-1.15, 1.15].map((z) => <Blok key={z} p={[0, 0.45, z]} s={[4.6, 0.9, 0.7]} c="#2A2A26" rough={1} />)}
    <Blok p={[0, 1.15, 0]} s={[4.4, 0.6, 2.6]} c={kleur} rough={0.9} />
    <Blok p={[-0.2, 1.75, 0]} s={[2.0, 0.6, 1.8]} c={kleur} rough={0.9} />
    <Blok p={[1.9, 1.78, 0]} s={[2.4, 0.14, 0.14]} c={kleur} rough={0.9} />
  </group>
);

/** Middellangeafstandsraket op een oplegger, punt naar +x. */
export const Raket = ({ position, rotation }: { position: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.7, 0]} s={[9, 0.4, 2]} c="#4E5A3A" />
    {[-3.5, -2.4, 2.4, 3.5].map((x) => [-0.9, 0.9].map((z) => (
      <mesh key={`${x}${z}`} position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.3, 12]} />
        <meshStandardMaterial color="#121212" roughness={0.9} />
      </mesh>
    )))}
    <mesh position={[-0.3, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.55, 0.55, 7.4, 16]} />
      <meshStandardMaterial color="#E4E6E2" roughness={0.5} />
    </mesh>
    <mesh position={[4.2, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
      <coneGeometry args={[0.55, 1.6, 16]} />
      <meshStandardMaterial color="#E4E6E2" roughness={0.5} />
    </mesh>
    {[0, 1, 2, 3].map((i) => <Blok key={i} p={[-3.8, 1.5 + Math.sin((i * Math.PI) / 2) * 0.7, Math.cos((i * Math.PI) / 2) * 0.7]} s={[0.9, 0.06, 0.5]} r={[(i * Math.PI) / 2, 0, 0]} c="#C8CAC6" />)}
  </group>
);

/** Suikerriet: rijen hoge groene stengels. */
export const Suikerriet = ({ z = -4, rijen = 4, x0 = -12, breed = 24 }: { z?: number; rijen?: number; x0?: number; breed?: number }) => (
  <>
    {Array.from({ length: rijen * 24 }, (_, i) => {
      const r = Math.floor(i / 24);
      const x = x0 + (i % 24) * (breed / 24) + (r % 2) * 0.4;
      const h = 2.4 + ((i * 7) % 5) * 0.15;
      return <Blok key={i} p={[x, h / 2, z - r * 1.4]} s={[0.12, h, 0.12]} r={[0, 0, ((i % 3) - 1) * 0.06]} c={i % 2 ? '#7A9A3E' : '#6A8A34'} />;
    })}
  </>
);

/** Het jacht Granma: wit, veel te klein, mannen dicht op elkaar. Boeg naar +x. */
export const Granma = ({ position, t = 0, children }: { position: V3; t?: number; children?: ReactNode }) => (
  <group position={position} rotation={[Math.sin(t * 1.7) * 0.03, 0, Math.sin(t * 1.3) * 0.04]}>
    <Blok p={[0, 0.4, 0]} s={[8, 1.0, 2.6]} c="#F2F0EA" rough={0.6} />
    <mesh position={[4.4, 0.4, 0]} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1.84, 1.0, 1.84]} />
      <meshStandardMaterial color="#F2F0EA" roughness={0.6} />
    </mesh>
    <Blok p={[0, 0.95, 0]} s={[8.2, 0.12, 2.7]} c="#8A5A34" />
    <Blok p={[-1.2, 1.6, 0]} s={[2.6, 1.2, 1.8]} c="#F2F0EA" rough={0.6} />
    <Blok p={[-1.2, 1.75, 0.91]} s={[2.2, 0.4, 0.02]} c="#3A4A5A" />
    <Blok p={[-3.9, 1.0, 0]} s={[0.1, 0.5, 2.6]} c="#1E2A44" />
    {children}
  </group>
);

/** Groene bergen van de Sierra Maestra. */
export const Sierra = ({ z = -30 }: { z?: number }) => (
  <>
    {[-26, -12, 2, 16, 30].map((x, i) => <Berg key={x} position={[x, -2, z - (i % 2) * 8]} h={16 + (i % 3) * 5} r={13} kleur={i % 2 ? '#3E6A3A' : '#4A7A42'} />)}
  </>
);

const Kamer = ({ kleur = '#C9B48E', vloer = '#4A3428' }: { kleur?: string; vloer?: string }) => (
  <>
    <Grond kleur={vloer} />
    <Blok p={[0, 3, -3]} s={[16, 6, 0.3]} c={kleur} rough={0.95} />
  </>
);

/** Podium met microfoon, voor de toespraken. */
const Microfoon = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 0.7, 0]} s={[0.05, 1.4, 0.05]} c="#2A2A2A" metal={0.5} />
    {[-0.16, 0, 0.16].map((x) => <Blok key={x} p={[x, 1.45, 0]} s={[0.12, 0.2, 0.12]} c="#3A3A3A" metal={0.6} rough={0.3} />)}
  </group>
);

/* ================= scènes ================= */

/** 1 — de Plaza: toespraak voor een mensenzee. */
const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène nr={0} focus={[0, 3.4, 0]} scherpte={2.5} mist={['#F0C8A0', 30, 170]} teller={{ label: 'Ruled Cuba', waarde: '49 years', pil: '1959 – 2008' }} tekst={[{ t: 'What if you were ' }, { t: 'Fidel Castro', accent: true }, { t: '?' }]}>
      <Lucht boven="#5E86C0" horizon="#F6D0A0" />
      <Zon position={[-30, 16, -140]} grootte={12} kleur="#FFE6B8" />
      <Camera pos={[ease(f, 0, 140, 3.6, 2.4), ease(f, 0, 140, 2.6, 3.0), ease(f, 0, 140, 8.6, 7.2)]} kijk={[0, 3.3, 0]} fov={34} />
      <Daglicht zon={[-10, 12, 8]} kleur="#FFE8C8" />
      <Grond kleur="#B8A88A" />
      <Blok p={[0, 9, -40]} s={[3, 18, 3]} c="#C9C4B8" rough={1} />
      <Menigte n={22} z={-9} x0={-12} t={t} juich />
      <Menigte n={22} z={-12} x0={-12.5} t={t + 1} juich />
      <Blok p={[0, 0.6, 0]} s={[3.6, 1.2, 2.2]} c="#E8E2D2" />
      <CubaVlag position={[1.6, 0, -6]} t={t} h={3.8} />
      <Microfoon position={[0.75, 1.2, 0.55]} />
      <Figuur {...FIDEL_ZONDER} position={[0, 1.2, 0]} rotation={[0, 0.25, 0]} pose={{ armR: omhoog(), wenk: 0.4, mond: 'open' }} />
    </Scène>
  );
};

/** 2 — Birán: de zoon van een rijke suikerplanter. */
const S2 = () => {
  const f = useCurrentFrame();
  return (
    <Scène nr={1} focus={[0, 1.4, 0]} scherpte={3} mist={['#E8D2A8', 20, 110]} teller={{ label: 'Born', waarde: '1926', pil: 'Birán, Cuba' }} tekst={[{ t: "you're born rich, on your father's sugar " }, { t: 'plantation', accent: true }]}>
      <Lucht boven="#6E9ED2" horizon="#F4E2B8" />
      <Zon position={[20, 18, -140]} grootte={10} />
      <Camera pos={[ease(f, 0, 110, 2.2, 1.2), ease(f, 0, 110, 1.9, 1.8), ease(f, 0, 110, 7.6, 6.6)]} kijk={[0, 1.5, -1]} fov={34} />
      <Daglicht zon={[8, 12, 10]} kleur="#FFE8C0" />
      <Grond kleur="#8A7A50" />
      <group position={[3.2, 0, -9]}>
        <Blok p={[0, 2.6, 0]} s={[7, 3.2, 4.4]} c="#E8D8B0" rough={1} />
        <Blok p={[0, 1.0, 0]} s={[7.4, 2.0, 4.8]} c="#7A5A3A" rough={1} />
        <Blok p={[0, 4.5, 0]} s={[7.6, 0.6, 5]} c="#8A3A2A" rough={1} />
      </group>
      <Suikerriet z={-3.5} rijen={3} x0={-14} breed={12} />
      {[-7, 8, 12].map((x) => <Palm key={x} position={[x, 0, -14]} schaal={1.6} />)}
      <Figuur kleding={VADER} snor haar="grijs" levend position={[1.0, 0, -0.8]} rotation={[0, -0.4, 0]} pose={{ armR: wijs(1.2) }} />
      <Figuur kleding={JONGEN} scale={0.66} levend position={[-0.5, 0, 0.2]} rotation={[0, 0.4, 0]} pose={{ mond: 'lach' }} />
    </Scène>
  );
};

/** 3 — rechtenstudent in Havana. */
const S3 = () => {
  const f = useCurrentFrame();
  return (
    <Scène nr={2} focus={[0, 1.9, 0]} scherpte={3} mist={['#E8D8B8', 20, 100]} teller={{ label: 'Age', waarde: '24', pil: 'lawyer, Havana 1950' }} tekst={[{ t: 'you become a lawyer, but what you really want is ' }, { t: 'power', accent: true }]}>
      <Lucht boven="#7AA4D4" horizon="#F2E2C2" />
      <Camera pos={[ease(f, 0, 120, 1.8, 1.0), ease(f, 0, 120, 2.4, 2.3), ease(f, 0, 120, 8.4, 7.4)]} kijk={[0, 2.2, -1]} fov={34} />
      <Daglicht zon={[-6, 12, 10]} />
      <Grond kleur="#D2C6AC" />
      {Array.from({ length: 6 }, (_, i) => <Blok key={i} p={[0, 0.15 + i * 0.3, -3 - i * 0.6]} s={[14, 0.3, 0.6]} c="#E4DCCA" rough={1} />)}
      {[-4.5, -1.5, 1.5, 4.5].map((x) => <Zuil key={x} position={[x, 1.8, -7.2]} h={6} />)}
      <Blok p={[0, 8.2, -7.2]} s={[11, 0.8, 1.4]} c="#EDE4D3" />
      {[-3.4, -2.2, 2.6, 3.6].map((x, i) => <Figuur key={x} kleding={STUDENT} levend position={[x, 0.3 + (i % 2) * 0.3, -3.4 - (i % 2) * 0.6]} rotation={[0, x < 0 ? 0.6 : -0.6, 0]} pose={{ armR: i % 2 ? omhoog() : undefined, mond: 'open' }} />)}
      <Figuur kleding={CASTRO_PAK} levend position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ armR: wijs(1.6), wenk: 0.5, mond: 'open' }} />
    </Scène>
  );
};

/** 4 — Moncada, 26 juli 1953: rook en flitsen in de verte, geen gevecht in beeld. */
const S4 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène nr={3} focus={[0, 1.6, 0]} scherpte={2.6} mist={['#E8A070', 15, 90]} teller={{ label: 'Year', waarde: '1953', pil: 'Moncada barracks' }} tekst={[{ t: 'you attack an army barracks with about 160 men. it ' }, { t: 'fails', accent: true }]}>
      <Lucht boven="#4A4A6A" horizon="#F2A070" />
      <Zon position={[-10, 3, -140]} grootte={14} kleur="#FFB070" />
      <Camera pos={[ease(f, 0, 120, 2.0, 1.2), ease(f, 0, 120, 2.0, 1.9), ease(f, 0, 120, 8.2, 7.2)]} kijk={[0, 1.7, -2]} fov={34} />
      <Avondlicht />
      <Grond kleur="#9A8A6A" />
      <group position={[0, 0, -14]}>
        <Blok p={[0, 3, 0]} s={[26, 6, 2]} c="#E8C86A" rough={1} />
        {Array.from({ length: 13 }, (_, i) => <Blok key={i} p={[-12 + i * 2, 6.4, 0.4]} s={[1, 0.8, 1]} c="#E8C86A" rough={1} />)}
        {[-8, -3, 2, 7].map((x) => <Blok key={`r${x}`} p={[x, 3, 1.02]} s={[1.2, 1.6, 0.04]} c="#2A2420" />)}
      </group>
      {[-6, 3.5].map((x, i) => <Rook key={x} position={[x, 2, -12]} t={t + i} kleur="#6A6058" />)}
      {[[-3, 2.8], [4, 3.2], [1, 2.4]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -12.5]}>
          <sphereGeometry args={[0.16 * Math.max(0, Math.sin(t * 9 + i * 2.3)), 8, 8]} />
          <meshStandardMaterial color="#FFE0A0" emissive="#FFC060" emissiveIntensity={6} />
        </mesh>
      ))}
      <Oldtimer position={[-2.4, 0, -3.2]} rotation={[0, 0.3, 0]} kleur="#3A4A5A" />
      <Figuur kleding={MONCADA} snor levend position={[0.6, 0, 0]} rotation={[0, -0.3, 0]} pose={{ armR: wijs(1.4), wenk: 0.8, mond: 'open' }} inHand={<Geweer />} />
    </Scène>
  );
};

/** 5 — de rechtbank: "History will absolve me". */
const S5 = () => {
  const f = useCurrentFrame();
  return (
    <Scène nr={4} focus={[0, 1.8, 0]} scherpte={3.5} mist={['#2A2018', 10, 40]} teller={{ label: 'Sentence', waarde: '15 years', pil: 'Santiago, October 1953' }} tekst={[{ t: 'on trial, you tell the judges: "history will ' }, { t: 'absolve me"', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 110, 1.4, 0.8), ease(f, 0, 110, 2.3, 2.2), ease(f, 0, 110, 8.0, 7.2)]} kijk={[0.2, 1.9, -0.8]} fov={34} />
      <Binnenlicht zon={[-3, 7, 5]} kleur="#FFDDB0" />
      <pointLight position={[0.5, 2.6, 1.6]} intensity={5} distance={8} color="#FFC890" />
      <Kamer kleur="#8A6A4A" vloer="#3A2A20" />
      <Blok p={[0, 0.7, -2.0]} s={[5.4, 1.4, 1]} c="#5A3A24" />
      {[-1.6, 0, 1.6].map((x) => <Figuur key={x} kleding={RECHTER} haar="grijs" levend position={[x, 0.2, -2.5]} pose={{ wenk: 0.5, ...ARMEN_GEKRUIST }} />)}
      <Figuur kleding={CASTRO_PAK} snor levend position={[0.3, 0, 0.9]} rotation={[0, 0.25, 0]} pose={{ armR: omhoog(), wenk: 0.7, mond: 'open' }} />
    </Scène>
  );
};

/** 6 — Mexico, 1955: je ontmoet Che. */
const S6 = () => {
  const f = useCurrentFrame();
  return (
    <Scène nr={5} focus={[0, 1.7, 0]} scherpte={3.5} mist={['#1E1610', 8, 34]} teller={{ label: 'Mexico City', waarde: '1955', pil: 'Che Guevara, 27' }} tekst={[{ t: 'in exile in Mexico, you meet an Argentine doctor: ' }, { t: 'Che', accent: true }]}>
      <Lucht boven="#1E1610" horizon="#2A2018" />
      <Camera pos={[ease(f, 0, 115, 0.6, 0.1), ease(f, 0, 115, 2.4, 2.25), ease(f, 0, 115, 6.8, 5.9)]} kijk={[0, 1.7, 0]} fov={34} />
      <Nachtlicht />
      <pointLight position={[0, 2.2, 0.9]} intensity={8} distance={7} color="#FFB060" />
      <Kamer kleur="#6A4E38" vloer="#2A2018" />
      <Blok p={[0, 0.85, 0.2]} s={[2.2, 0.1, 1.1]} c="#5A3A24" />
      <Blok p={[0, 0.42, 0.2]} s={[2.0, 0.8, 0.9]} c="#3A2418" />
      <Blok p={[0, 0.92, 0.2]} s={[1.3, 0.02, 0.8]} c="#D8CCA8" />
      <Blok p={[0.2, 0.94, 0.25]} s={[0.5, 0.02, 0.3]} c="#7AA4C8" />
      <Figuur kleding={CASTRO_PAK} snor levend position={[-0.9, 0, -0.4]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(0.9), mond: 'open', wenk: 0.3 }} />
      <Figuur kleding={CHE_BURGER} haar="lang" snor levend position={[0.95, 0, -0.3]} rotation={[0, -0.6, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
    </Scène>
  );
};

/** 7 — de Granma: 82 man op een jacht voor 12. */
const S7 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène nr={6} focus={[0, 1.8, 0]} scherpte={2.6} mist={['#6A7A8A', 20, 110]} teller={{ label: 'On board', waarde: '82', pil: 'Granma, December 1956' }} tekst={[{ t: '82 men on a yacht built for 12. barely 20 reach the ' }, { t: 'mountains', accent: true }]}>
      <Lucht boven="#3A4A64" horizon="#A8B4C0" />
      <Camera pos={[ease(f, 0, 115, 6.4, 5.2), ease(f, 0, 115, 4.2, 3.8), ease(f, 0, 115, 12.5, 11.2)]} kijk={[0.8, 1.4, 0]} fov={34} />
      <Daglicht zon={[6, 9, 8]} kleur="#D8E0EA" kracht={1.3} />
      <Zee t={t} kleur="#2E5874" golf={0.28} />
      <Granma position={[0, 0, 0]} t={t}>
        {Array.from({ length: 14 }, (_, i) => (
          <Figuur key={i} kleding={REBEL} scale={0.62} position={[-3.2 + (i % 7) * 0.95, 1.0, i < 7 ? 0.7 : -0.7]} rotation={[0, Math.PI / 2 + ((i % 3) - 1) * 0.3, 0]} />
        ))}
        <Figuur {...FIDEL_ZONDER} scale={0.66} position={[3.6, 1.0, 0.2]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.3), wenk: 0.6 }} />
      </Granma>
    </Scène>
  );
};

/** 8 — de Sierra Maestra: het leger groeit. */
const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const n = Math.round(lin(f, 8, 95, 20, 3000) / 10) * 10;
  return (
    <Scène nr={7} focus={[0, 1.6, 0]} scherpte={2.6} mist={['#B8C8B0', 14, 90]} teller={{ label: 'Rebels', waarde: `${Math.max(20, n).toLocaleString('en-US')}`, pil: 'Sierra Maestra, 1956 – 58' }} tekst={[{ t: 'two years in the mountains. your army keeps ' }, { t: 'growing', accent: true }]}>
      <Lucht boven="#7A9AB8" horizon="#DCE4D4" />
      <Camera pos={[ease(f, 0, 115, 2.4, 1.5), ease(f, 0, 115, 2.3, 2.1), ease(f, 0, 115, 8.6, 7.6)]} kijk={[0, 1.6, -1]} fov={34} />
      <Daglicht zon={[-6, 10, 8]} kleur="#F0EAD0" kracht={1.6} />
      <Grond kleur="#5A6A3A" />
      <Sierra z={-34} />
      <Bos n={30} straal={22} vrij={8} />
      <Rook position={[-1.6, 0.2, -3]} t={t} kleur="#8A8478" />
      <Blok p={[-1.6, 0.15, -2.6]} s={[0.8, 0.3, 0.8]} c="#3A2A1C" />
      {[-4, -3, 3, 4.2].map((x, i) => <Figuur key={x} kleding={REBEL} baard={i % 2 === 0} levend position={[x, 0, -3 - (i % 2)]} rotation={[0, x < 0 ? 0.5 : -0.5, 0]} inHand={<Geweer />} />)}
      <Figuur {...CHE_F} position={[1.4, 0, -1.2]} rotation={[0, -0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.3 }} />
      <Figuur {...FIDEL} position={[-0.4, 0, 0]} rotation={[0, 0.25, 0]} pose={{ armR: wijs(1.1), wenk: 0.4 }} />
    </Scène>
  );
};

/** 9 — Havana, januari 1959: op een tank de stad in (opener van hook B). */
const S9 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 115, -1.6, 0.6);
  return (
    <Scène nr={8} focus={[x, 2.8, 0]} scherpte={2.4} mist={['#F2D2A8', 25, 120]} teller={{ label: 'Age', waarde: '32', pil: 'Havana, January 1959' }} tekst={[{ t: 'the dictator flees. at 32, you roll into ' }, { t: 'Havana', accent: true }]}>
      <Lucht boven="#5E92D0" horizon="#F6DCB0" />
      <Camera pos={[x + ease(f, 0, 115, 3.4, 2.4), ease(f, 0, 115, 3.2, 3.0), ease(f, 0, 115, 9.4, 8.2)]} kijk={[x, 2.9, -1]} fov={34} />
      <Daglicht zon={[-8, 12, 10]} kleur="#FFE8C8" kracht={2.1} />
      <Grond kleur="#A89C88" />
      <Gevels z={-12} />
      <Menigte n={18} z={-5.5} x0={-11} t={t} juich />
      <Menigte n={18} z={3.2} x0={-10.5} t={t + 2} juich />
      {[-6, 5].map((fx, i) => <CubaVlag key={fx} position={[fx, 0, -6.5]} t={t + i} h={5.2} />)}
      <group position={[x, 0, 0]}>
        <Tank position={[0, 0, 0]} />
        <Figuur {...CHE_F} scale={0.9} position={[-1.4, 2.05, -0.5]} rotation={[0, 0.3, 0]} pose={{ armR: omhoog(), mond: 'lach' }} />
        <Figuur {...FIDEL} position={[0.2, 2.05, 0.2]} rotation={[0, 0.35, 0]} pose={{ armR: omhoog(), wenk: 0.3, mond: 'lach' }} />
      </group>
    </Scène>
  );
};

/** 10 — Varkensbaai, april 1961. */
const S10 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène nr={9} focus={[0, 2.4, 0]} scherpte={2.6} mist={['#D8D0BC', 20, 110]} teller={{ label: 'Bay of Pigs', waarde: '3 days', pil: 'April 1961' }} tekst={[{ t: 'the CIA lands 1,400 exiles. you beat them in ' }, { t: '3 days', accent: true }]}>
      <Lucht boven="#6E92C0" horizon="#ECE2C8" />
      <Camera pos={[ease(f, 0, 110, 3.6, 2.6), ease(f, 0, 110, 2.6, 2.7), ease(f, 0, 110, 9.4, 8.4)]} kijk={[0, 2.4, -2]} fov={34} />
      <Daglicht zon={[8, 12, 8]} kracht={1.9} />
      <Grond kleur="#E4D6B0" />
      <group position={[0, -0.3, -16]}>
        <Zee t={t} kleur="#3E8AA4" golf={0.14} />
      </group>
      {[-9, 6].map((bx, i) => (
        <group key={bx} position={[bx, 0, -13 - i * 3]} rotation={[0, 0.2, 0]}>
          <Blok p={[0, 0.4, 0]} s={[4, 0.8, 1.8]} c="#5A5E62" />
          <Blok p={[-1.4, 1.0, 0]} s={[0.8, 0.6, 1.4]} c="#4A4E52" />
        </group>
      ))}
      <Rook position={[-7, 0.5, -12]} t={t} kleur="#7A746C" />
      <Rook position={[5, 0.5, -15]} t={t + 2} kleur="#7A746C" />
      {[-12, 11].map((x) => <Palm key={x} position={[x, 0, -6]} schaal={1.5} />)}
      <Tank position={[0.4, 0, -1.8]} rotation={[0, Math.PI - 0.3, 0]} />
      <Figuur {...FIDEL} position={[0.4, 2.05, -1.6]} rotation={[0, 0.2, 0]} pose={{ armR: wijs(1.3), wenk: 0.7 }} />
    </Scène>
  );
};

/** 11 — de Cubacrisis: Sovjetraketten onder de palmen. */
const S11 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const vx = lin(f, 0, 110, -14, 14);
  return (
    <Scène nr={10} focus={[0, 2.0, 0]} scherpte={2.6} mist={['#E8C8A0', 20, 110]} teller={{ label: 'Missile crisis', waarde: '13 days', pil: 'October 1962' }} tekst={[{ t: 'you let Moscow hide nuclear missiles in ' }, { t: 'Cuba', accent: true }]}>
      <Lucht boven="#5A7AAA" horizon="#F2D2A8" />
      <Camera pos={[ease(f, 0, 110, 2.0, 1.2), ease(f, 0, 110, 3.0, 3.2), ease(f, 0, 110, 10.5, 9.5)]} kijk={[0, 1.9, -3]} fov={34} />
      <Daglicht zon={[-8, 10, 8]} kleur="#FFE0B8" />
      <Grond kleur="#7A8A4A" />
      {[-9, -6, 6, 9.5, 12].map((x, i) => <Palm key={x} position={[x, 0, -8 - (i % 2) * 3]} schaal={1.7} />)}
      <Raket position={[0.6, 0, -5.2]} rotation={[0, -1.05, 0]} />
      <group position={[vx, 16, -40]}>
        <Blok p={[0, 0, 0]} s={[2.2, 0.16, 0.3]} c="#2A2A30" />
        <Blok p={[0, 0, 0]} s={[0.3, 0.06, 4.6]} c="#2A2A30" />
      </group>
      <Figuur kleding={RUS} hoofdExtra={<Pet kleur="#5A5A3E" />} levend position={[1.3, 0, -1.6]} rotation={[0, -0.5, 0]} pose={{ armR: wijs(1.0) }} />
      <Figuur {...FIDEL} position={[-0.7, 0, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5, hoofd: [0, -0.4, 0] }} />
      {t < 0 && null}
    </Scène>
  );
};

/** 12 — de sigaar: CIA-plannen om je te doden (opener van hook C). */
const S12 = () => {
  const f = useCurrentFrame();
  const n = Math.round(lin(f, 8, 90, 0, 638));
  return (
    <Scène nr={11} focus={[0, 2.1, 0.4]} scherpte={2.2} mist={['#1A140E', 6, 26]} teller={{ label: 'Assassination plots', waarde: `${n}`, pil: 'claimed by Cuban intelligence' }} tekst={[{ t: 'the CIA plots to kill you. one plan: an exploding ' }, { t: 'cigar', accent: true }]}>
      <Lucht boven="#1A140E" horizon="#2A2018" />
      <Camera pos={[ease(f, 0, 110, 1.0, 0.6), ease(f, 0, 110, 2.3, 2.2), ease(f, 0, 110, 5.6, 4.8)]} kijk={[0, 1.85, 0.2]} fov={34} />
      <Nachtlicht />
      <pointLight position={[0.9, 2.2, 1.4]} intensity={7} distance={6} color="#FFB060" />
      <Kamer kleur="#4A3424" vloer="#2A1E16" />
      <Blok p={[0, 0.95, 0.9]} s={[2.4, 0.1, 1.0]} c="#5A3A24" />
      <Blok p={[0, 0.48, 0.9]} s={[2.2, 0.86, 0.9]} c="#3A2418" />
      <Blok p={[0.7, 1.06, 1.0]} s={[0.6, 0.12, 0.4]} c="#8A5A30" />
      {[0, 1, 2, 3].map((i) => <Blok key={i} p={[0.52 + i * 0.12, 1.14, 1.0]} s={[0.08, 0.06, 0.34]} c="#6A3E1E" />)}
      <Figuur {...FIDEL_ZONDER} position={[0, 0, 0]} rotation={[0, 0.1, 0]} pose={{ armR: { schouder: [-0.7, 0, -0.45], elleboog: [0, -0.7] }, wenk: 0.6, hoofd: [0.3, 0, 0] }} inHand={<group rotation={[Math.PI / 2, 0, 0]}><Blok p={[0, 0.05, 0]} s={[0.07, 0.3, 0.07]} c="#6A3E1E" /><Blok p={[0, 0.21, 0]} s={[0.075, 0.03, 0.075]} c="#C8B8A0" /></group>} />
    </Scène>
  );
};

/** 13 — de prijs: critici in de cel, een miljoen vertrekt over zee. */
const S13 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène nr={12} focus={[0, 1.2, -4]} scherpte={2.2} mist={['#C8907A', 20, 110]} teller={{ label: 'Left Cuba', waarde: '1,000,000+', pil: 'since 1959' }} tekst={[{ t: 'your critics go to prison. over a million Cubans ' }, { t: 'leave', accent: true }]}>
      <Lucht boven="#4A4A6E" horizon="#E89A70" />
      <Zon position={[10, 4, -150]} grootte={14} kleur="#FFB878" />
      <Camera pos={[ease(f, 0, 115, 1.6, 0.8), ease(f, 0, 115, 2.4, 2.2), ease(f, 0, 115, 6.4, 5.6)]} kijk={[0, 1.2, -6]} fov={34} />
      <Avondlicht />
      <Zee t={t} kleur="#3A5A74" golf={0.16} />
      <Blok p={[0, 0.5, 1.4]} s={[20, 1.0, 1.0]} c="#D8D0C0" rough={1} />
      {[[-2.5, -7, 0.1], [1.8, -10, 0.3], [-0.4, -14, -0.2], [4, -17, 0.2]].map(([bx, bz, r], i) => (
        <group key={i} position={[bx + t * 0.15, Math.sin(t * 2 + i) * 0.06, bz - t * 0.25]} rotation={[0, r, 0]}>
          <Blok p={[0, 0.15, 0]} s={[1.4, 0.3, 0.9]} c={['#8A6A44', '#C8C0A8', '#5A4A3A', '#9A8A6A'][i]} />
          <Figuur kleding={REBEL} scale={0.45} position={[0, 0.3, 0]} rotation={[0, Math.PI, 0]} />
        </group>
      ))}
    </Scène>
  );
};

/** 14 — het slot: oud, grijs, nog altijd aan de macht. Hero or tyrant? */
const S14 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène nr={13} focus={[0, 2.6, -1]} scherpte={2.2} mist={['#C87A50', 30, 160]} teller={{ label: 'Legacy', waarde: 'hero or tyrant?', pil: '1926 – 2016' }} tekst={[{ t: 'you outlast 10 American presidents. hero, or ' }, { t: 'tyrant?', accent: true }]}>
      <Lucht boven="#3E2A44" horizon="#E8864E" onder="#2A1A14" />
      <Zon position={[0, 6, -150]} grootte={16} kleur="#FFB070" />
      <Camera pos={[ease(f, 0, 210, 3.8, 2.4), ease(f, 0, 210, 2.2, 2.6), ease(f, 0, 210, 10.5, 8.6)]} kijk={[0, 2.8, -2]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFC8A0', '#3A2A20', 0.6]} />
      <Grond kleur="#6A5A4A" />
      <group position={[0, -0.4, -26]}>
        <Zee t={t} kleur="#5A4A5A" golf={0.12} />
      </group>
      <Blok p={[0, 0.5, -6]} s={[30, 1.0, 1.0]} c="#D0C4B0" rough={1} />
      <CubaVlag position={[-3.4, 0, -3]} t={t} h={5} />
      <Menigte n={12} z={1.6} x0={-6.4} t={t} />
      <Blok p={[0, 0.6, -2]} s={[3.2, 1.2, 2]} c="#E8E2D2" />
      <Figuur kleding={CASTRO_OUD} haar="grijs" baard levend hoofdExtra={<Pet />} position={[0, 1.2, -2]} rotation={[0, 0.15, 0]} pose={{ armR: omhoog(), wenk: 0.2 }} />
    </Scène>
  );
};

/** Omslagen per hook (trial reels): elk een eigen beeld, held groot in de 3:4-middenzone. */
export const OmslagCastroScène = ({ hook = 'A' }: { hook?: Hook }) => {
  if (hook === 'B')
    return (
      <>
        <fog attach="fog" args={['#F2C89A', 25, 140]} />
        <Lucht boven="#4E7EC0" horizon="#F8D6A8" />
        <Zon position={[-8, 10, -140]} grootte={14} kleur="#FFE0B0" />
        <Camera pos={[0.6, 3.3, 8.6]} kijk={[-0.5, 3.3, 0]} fov={36} />
        <Daglicht zon={[-6, 10, 9]} kleur="#FFE2C0" kracht={2.4} />
        <Grond kleur="#A89C88" />
        <Gevels z={-12} />
        <Menigte n={18} z={-5.5} x0={-11} juich />
        <CubaVlag position={[-5.2, 0, -5]} h={4.6} />
        <CubaVlag position={[2.6, 0, -5.5]} t={1.5} h={4.6} />
        <Tank position={[0, 0, 0]} />
        <Figuur {...CHE_F} levend={false} scale={0.9} position={[-1.5, 2.05, -0.6]} rotation={[0, 0.35, 0]} pose={{ armR: omhoog(), mond: 'lach' }} />
        <Figuur {...FIDEL} levend={false} position={[0.2, 2.05, 0.3]} rotation={[0, 0.3, 0]} pose={{ armR: omhoog(), wenk: 0.3, mond: 'lach' }} />
      </>
    );
  if (hook === 'C')
    return (
      <>
        <fog attach="fog" args={['#1A140E', 6, 26]} />
        <Lucht boven="#1A140E" horizon="#2A2018" />
        <Camera pos={[0.7, 2.25, 4.6]} kijk={[0, 1.95, 0.2]} fov={36} />
        <directionalLight position={[-3, 4, -3]} intensity={2.2} color="#9AB8E8" />
        <Nachtlicht />
        <pointLight position={[1.1, 2.3, 1.6]} intensity={9} distance={6} color="#FFB060" />
        <pointLight position={[-1.6, 2.6, -0.6]} intensity={4} distance={5} color="#7AA0D8" />
        <Kamer kleur="#4A3424" vloer="#2A1E16" />
        <Blok p={[0, 0.95, 0.9]} s={[2.4, 0.1, 1.0]} c="#5A3A24" />
        <Blok p={[0, 0.48, 0.9]} s={[2.2, 0.86, 0.9]} c="#3A2418" />
        <Figuur {...FIDEL} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ wenk: 0.7, armR: { schouder: [-0.6, 0, -0.5], elleboog: [0, -0.8] } }} inHand={<Blok p={[0, 0.02, 0.04]} s={[0.2, 0.14, 0.3]} c="#8A5A30" />} />
      </>
    );
  return (
    <>
      <fog attach="fog" args={['#F0C8A0', 30, 170]} />
      <Lucht boven="#4E76B8" horizon="#F6C890" />
      <Zon position={[-6, 9, -140]} grootte={18} kleur="#FFD890" />
      <Camera pos={[1.4, 2.7, 7.4]} kijk={[0, 3.05, 0]} fov={36} />
      <Daglicht zon={[-6, 8, 9]} kleur="#FFD8A8" kracht={2.4} />
      <Grond kleur="#B8A88A" />
      <Blok p={[0, 9, -40]} s={[3, 18, 3]} c="#C9C4B8" rough={1} />
      <Menigte n={22} z={-8} x0={-12} juich />
      <Menigte n={22} z={-11} x0={-12.5} t={1} juich />
      <Blok p={[0, 0.6, 0]} s={[3.6, 1.2, 2.2]} c="#E8E2D2" />
      <CubaVlag position={[-4.4, 0, -3.5]} h={4.2} />
      <M26Vlag position={[2.4, 0, -4.4]} t={1} h={4.0} />
      <Microfoon position={[0.75, 1.2, 0.55]} />
      <Figuur {...FIDEL_ZONDER} position={[0, 1.2, 0]} rotation={[0, 0.25, 0]} pose={{ armR: omhoog(), wenk: 0.45, mond: 'open' }} />
    </>
  );
};

/* ================= montage ================= */

const SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14];
const DUUR = [140, 110, 120, 120, 110, 115, 115, 115, 115, 110, 110, 110, 115, 210];
/** Trial-reel-hooks: B = de intocht in Havana op 32 (de top), C = de exploderende sigaar (schokdetail). */
export const CASTRO_HOOKS: HookPlan = { B: 8, C: 11 };
/** Eigen opener voor B/C (viral-hooks-audit in youtube.md): je-vorm, A-tegen-B-contrast, antwoord later. */
const HOOK_OPENER: Record<'B' | 'C', { scène: number; tekst: Deel[]; teller?: TellerDef }> = {
  B: { scène: 8, tekst: [{ t: "You're 32. You started with 82 men. Now you rule " }, { t: 'Cuba.', accent: true }], teller: { label: 'Age', waarde: '32', pil: 'Havana, January 1959' } },
  C: { scène: 11, tekst: [{ t: 'The CIA planned to kill you with an ' }, { t: 'exploding cigar.', accent: true }], teller: { label: 'Assassination plots', waarde: '638', pil: 'claimed by Cuban intelligence' } },
};
export const CASTRO_DUUR = DUUR.reduce((a, b) => a + b, 0);
if (CASTRO_DUUR > MAX_SHORT_FRAMES) throw new Error(`CASTRO_DUUR is ${CASTRO_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = CASTRO_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const KLANKEN: Klank[] = [
  { s: 0, src: 'menigte', vol: 0.12, lus: true },
  { s: 0, bij: 6, src: 'glans', vol: 0.14 },
  { s: 1, src: 'wind', vol: 0.05, lus: true },
  { s: 2, src: 'menigte', vol: 0.05, lus: true },
  { s: 2, bij: 50, src: 'tik', vol: 0.16 },
  { s: 3, src: 'vuur', vol: 0.05, lus: true },
  { s: 3, bij: 14, src: 'inslag', vol: 0.2 },
  { s: 3, bij: 70, src: 'val', vol: 0.14 },
  { s: 4, src: 'vuur', vol: 0.03, lus: true },
  { s: 4, bij: 55, src: 'tik', vol: 0.18 },
  { s: 5, src: 'vuur', vol: 0.05, lus: true },
  { s: 5, bij: 60, src: 'glans', vol: 0.12 },
  { s: 6, src: 'zee', vol: 0.14, lus: true },
  { s: 6, bij: 70, src: 'val', vol: 0.12 },
  { s: 7, src: 'wind', vol: 0.08, lus: true },
  { s: 7, bij: 40, src: 'tik', vol: 0.14 },
  { s: 8, src: 'menigte', vol: 0.14, lus: true },
  { s: 8, bij: 8, src: 'inslag', vol: 0.2 },
  { s: 9, src: 'zee', vol: 0.08, lus: true },
  { s: 9, bij: 10, src: 'inslag', vol: 0.2 },
  { s: 10, src: 'wind', vol: 0.06, lus: true },
  { s: 10, bij: 40, src: 'val', vol: 0.16 },
  { s: 11, src: 'vuur', vol: 0.05, lus: true },
  { s: 11, bij: 50, src: 'tik', vol: 0.18 },
  { s: 12, src: 'zee', vol: 0.1, lus: true },
  { s: 13, src: 'menigte', vol: 0.1, lus: true },
  { s: 13, bij: 6, src: 'glans', vol: 0.12 },
];

export const WatAlsCastro = ({ muziek = true, muziekVanaf = 14, hook = 'A' }: { muziek?: boolean; muziekVanaf?: number; hook?: Hook }) => {
  const VOLGORDE = hookVolgorde(SCÈNES.length, CASTRO_HOOKS, hook);
  const STARTS = startsVoor(DUUR, VOLGORDE);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {SCÈNES.map((C, i) => (
        <Sequence key={i} from={STARTS[i]} durationInFrames={DUUR[i]}>
          <OpenerCtx.Provider value={i === VOLGORDE[0] ? hook : null}>
            <C />
          </OpenerCtx.Provider>
        </Sequence>
      ))}
      <Sequence from={AFSLUITER_VANAF}>
        <Afsluiter />
        <Audio src={sfx('afsluiter')} volume={0.22} />
      </Sequence>
      <Watermerk />
      {knippen(STARTS).map((st, i) => (
        <Sequence key={`w${i}`} from={st - 12} durationInFrames={24}>
          <Audio src={sfx('whoosh')} volume={0.1} />
        </Sequence>
      ))}
      {KLANKEN.map((k, i) => {
        const van = STARTS[k.s] + (k.bij ?? 0);
        const lengte = k.lus ? DUUR[k.s] : Math.min(60, DUUR[k.s] - (k.bij ?? 0));
        return (
          <Sequence key={`k${i}`} from={van} durationInFrames={lengte}>
            <Audio src={sfx(k.src)} loop={k.lus} volume={(fr) => (k.lus ? interpolate(fr, [0, 8, lengte - 8, lengte], [0, k.vol, k.vol, 0], { extrapolateRight: 'clamp' }) : k.vol)} />
          </Sequence>
        );
      })}
      {muziek && (
        <Audio
          src={staticFile('lokaal/amour-plastique.mp3')}
          startFrom={Math.round(muziekVanaf * 30)}
          volume={(fr) => interpolate(fr, [0, 10, CASTRO_DUUR - 45, CASTRO_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
        />
      )}
    </AbsoluteFill>
  );
};
