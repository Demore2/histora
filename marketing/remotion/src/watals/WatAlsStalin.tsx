import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avondlicht, Binnenlicht, Camera, Daglicht, Grond, Lucht, Nachtlicht, Neerslag, Paard, Rook, Scherpte, Sokkel, TekstVlak, Zee, Zon } from './Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, Rol, wijs, type Kleding, type V3 } from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';
import { hookVolgorde, knippen, startsVoor, type Hook, type HookPlan } from './hooks';

/**
 * "What if you were Stalin?" — 14 scènes, onder de 58 s. Fanverzoek (3 stemmen, stats 2026-11-24).
 * Stalin draagt overal zijn grijsgroene tuniek met laarzen, de dikke snor en de pijp in zijn mond.
 * Geen geweld in beeld: de hongersnood is een weggereden graankar, de Terreur een zwarte auto bij nacht,
 * zijn dood een dichte deur met wachters ervoor. De tekst noemt de prijs wél: dit is geen heldenverhaal.
 */

const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

type SceneProps = { children: ReactNode; focus: V3; scherpte?: number; mist?: [string, number, number]; teller?: { label: string; waarde: string; pil?: string }; tekst?: Deel[] };

const Scène = ({ children, focus, scherpte = 3, mist, teller, tekst }: SceneProps) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
        {mist && <fog attach="fog" args={mist} />}
        {children}
        <Scherpte focus={focus} sterkte={scherpte} />
      </ThreeCanvas>
      <Vignet />
      {teller && <Teller label={teller.label} waarde={teller.waarde} pil={teller.pil} start={3} />}
      {tekst && <Onderschrift start={9} delen={tekst} />}
    </AbsoluteFill>
  );
};

/* ================= kit ================= */

export const ROOD = '#B3241E';
export const KHAKI = '#7E7A5E';
export const STALIN: Kleding = { huid: '#DDAE88', haar: '#2E2622', tuniek: KHAKI, benen: KHAKI, schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const SOSO: Kleding = { huid: '#E2B48E', haar: '#2E2622', tuniek: '#6A5A44', benen: '#4A3E30', schoenen: '#2A1E16' };
export const SEMINARIST: Kleding = { huid: '#DDAE88', haar: '#2E2622', tuniek: '#151210', rok: '#151210', schoenen: '#151210' };
export const VADER: Kleding = { huid: '#D8A880', haar: '#2A1E16', tuniek: '#5A4A3A', benen: '#3A3028', schoenen: '#2A1E16', riem: '#2A1E16' };
export const PRIESTER: Kleding = { huid: '#D8A880', haar: '#6A6058', tuniek: '#151210', rok: '#151210', schoenen: '#151210' };
export const LENIN: Kleding = { huid: '#E2B48E', haar: '#8A5A3A', tuniek: '#2A2A30', benen: '#2A2A30', schoenen: '#151210' };
export const YEZHOV: Kleding = { huid: '#DDAE88', haar: '#2A1E16', tuniek: '#4A5A44', benen: '#2A3A6A', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const SOLDAAT: Kleding = { huid: '#DDAE88', haar: '#4A3A2C', tuniek: '#6E6A4A', benen: '#5A563E', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const BOER: Kleding = { huid: '#D8A880', haar: '#6B4A30', tuniek: '#8A7A5E', benen: '#5A4A3A', schoenen: '#3A2A1C' };
export const BOERIN: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#7A3A2E', rok: '#4A3A2E', schoenen: '#3A2A1C' };
export const WACHT: Kleding = { huid: '#DDAE88', haar: '#2A1E16', tuniek: '#4A5A44', benen: '#2A3A6A', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };

/** Dikke borstelsnor + pijp in de mond (hoofdgroep; oorsprong = hals). */
export const Snor = () => <Blok p={[0, 0.235, 0.3]} s={[0.36, 0.08, 0.05]} c="#2A221E" rough={1} />;
export const Pijp = () => (
  <>
    <Blok p={[0.08, 0.17, 0.4]} s={[0.04, 0.04, 0.22]} r={[0.25, 0.3, 0]} c="#2A1A12" />
    <Blok p={[0.13, 0.14, 0.52]} s={[0.11, 0.14, 0.11]} c="#4A2A18" />
  </>
);
export const HoofdS = ({ pijp = true }: { pijp?: boolean }) => (
  <>
    <Snor />
    {pijp && <Pijp />}
  </>
);
export const Helm = ({ kleur = '#4E5A3A' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.72, 0]} s={[0.72, 0.18, 0.68]} c={kleur} />
    <Blok p={[0, 0.62, 0]} s={[0.8, 0.06, 0.76]} c={kleur} />
  </>
);
export const Pet = ({ kleur = '#2A3A6A' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.74, 0]} s={[0.68, 0.14, 0.64]} c={kleur} />
    <Blok p={[0, 0.66, 0.36]} s={[0.5, 0.04, 0.2]} c="#151210" />
  </>
);

export const SL = { kleding: STALIN, haar: 'kort' as const, hoofdExtra: <HoofdS />, levend: true };

/** Rode vlag met gouden ster, doek naar +x. */
export const RodeVlag = ({ position, t = 0, h = 4.6 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.1, h, 0.1]} c="#5A3B24" />
    <group position={[1.05, h - 0.75, 0.03]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      <Blok p={[0, 0, 0]} s={[2.0, 1.3, 0.04]} c={ROOD} />
      <Blok p={[-0.62, 0.32, 0.03]} s={[0.24, 0.24, 0.02]} r={[0, 0, Math.PI / 4]} c="#E8C04A" />
    </group>
  </group>
);

/** Kremlinmuur met kantelen en een toren met groene spits en rode ster (naar +z). */
export const Kremlin = ({ position, lengte = 50 }: { position: V3; lengte?: number }) => (
  <group position={position}>
    <Blok p={[0, 3.5, 0]} s={[lengte, 7, 2]} c="#9A3A2E" rough={1} />
    {Array.from({ length: Math.floor(lengte / 1.6) }, (_, i) => (
      <Blok key={i} p={[-lengte / 2 + 0.8 + i * 1.6, 7.5, 0.6]} s={[0.8, 1, 0.6]} c="#9A3A2E" rough={1} />
    ))}
    {[-14, 12].map((x, i) => (
      <group key={x} position={[x, 0, 0.5]}>
        <Blok p={[0, 6, 0]} s={[4.4, 12, 4.4]} c="#A8402F" rough={1} />
        <Blok p={[0, 13.5, 0]} s={[3.2, 3, 3.2]} c="#A8402F" rough={1} />
        <mesh position={[0, 18, 0]} castShadow>
          <coneGeometry args={[2.1, 6, 4]} />
          <meshStandardMaterial color="#3E6A4A" roughness={0.8} flatShading />
        </mesh>
        <Blok p={[0, 21.6, 0]} s={[1.1, 1.1, 0.3]} r={[0, i * 0.4, Math.PI / 4]} c="#D8302A" />
      </group>
    ))}
  </group>
);

/** Fabriek: hal met zaagtanddak en schoorstenen die roken. */
export const Fabriek = ({ position, t = 0, schaal = 1 }: { position: V3; t?: number; schaal?: number }) => (
  <group position={position} scale={schaal}>
    <Blok p={[0, 2.5, 0]} s={[12, 5, 6]} c="#6A4A3A" rough={1} />
    {[-4.5, -1.5, 1.5, 4.5].map((x) => <Blok key={x} p={[x, 5.5, 0]} s={[2.8, 1.2, 6]} r={[0, 0, 0.35]} c="#4A3A30" />)}
    {[-4, 0.5, 4].map((x, i) => (
      <group key={x}>
        <mesh position={[x, 7.5, -1.5]} castShadow>
          <cylinderGeometry args={[0.45, 0.65, 15, 8]} />
          <meshStandardMaterial color="#7A5A48" roughness={1} flatShading />
        </mesh>
        <Rook position={[x, 14, -1.5]} t={t + i} kleur="#6A645E" />
      </group>
    ))}
    {[-4, -1.3, 1.3, 4].map((x) => <Blok key={x} p={[x, 2.4, 3.02]} s={[1.6, 1.8, 0.04]} c="#E8B060" />)}
  </group>
);

/** Zwarte auto uit de jaren '30, neus naar +x, koplampen aan. */
export const Auto = ({ position, rotation }: { position: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.7, 0]} s={[3.6, 0.7, 1.6]} c="#141416" metal={0.3} rough={0.35} />
    <Blok p={[-0.3, 1.35, 0]} s={[2.0, 0.7, 1.5]} c="#141416" metal={0.3} rough={0.35} />
    <Blok p={[-0.3, 1.38, 0.76]} s={[1.6, 0.4, 0.02]} c="#3A3A44" rough={0.2} />
    {[[-1.2, 0.8], [1.2, 0.8], [-1.2, -0.8], [1.2, -0.8]].map(([x, z]) => (
      <mesh key={`${x}${z}`} position={[x, 0.38, z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.2, 12]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
      </mesh>
    ))}
    {[-0.5, 0.5].map((z) => (
      <mesh key={z} position={[1.82, 0.85, z]}>
        <boxGeometry args={[0.06, 0.2, 0.24]} />
        <meshStandardMaterial color="#FFF2C0" emissive="#FFE8A0" emissiveIntensity={3} />
      </mesh>
    ))}
    <pointLight position={[3, 0.9, 0]} intensity={8} distance={10} color="#FFE8B0" />
  </group>
);

/** Houten blokhut in de sneeuw (naar +z). */
export const Blokhut = ({ position, rotation }: { position: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    {Array.from({ length: 7 }, (_, i) => <Blok key={i} p={[0, 0.2 + i * 0.36, 0]} s={[4.4, 0.34, 3.4]} c={i % 2 ? '#5A3E28' : '#6A4A30'} rough={1} />)}
    <Blok p={[0, 2.95, 0.9]} s={[4.8, 0.2, 2.4]} r={[0.55, 0, 0]} c="#ECF0F4" />
    <Blok p={[0, 2.95, -0.9]} s={[4.8, 0.2, 2.4]} r={[-0.55, 0, 0]} c="#ECF0F4" />
    <Blok p={[0.9, 1.3, 1.72]} s={[0.7, 0.6, 0.04]} c="#E8A050" />
    <Blok p={[-0.8, 0.85, 1.72]} s={[0.8, 1.5, 0.04]} c="#3A2A1C" />
  </group>
);

/** Ruïnes: kapotte muren in verschillende hoogtes. */
export const Ruines = ({ z = -10 }: { z?: number }) => (
  <>
    {Array.from({ length: 14 }, (_, i) => {
      const x = -26 + i * 4;
      const h = 2 + ((i * 5) % 7);
      return (
        <group key={i} position={[x, 0, z - (i % 3) * 3]}>
          <Blok p={[0, h / 2, 0]} s={[3.2, h, 0.6]} c={i % 2 ? '#8A8076' : '#7A7068'} rough={1} />
          <Blok p={[0.9, h + 0.4, 0]} s={[1.2, 0.8, 0.6]} r={[0, 0, 0.5]} c="#7A7068" rough={1} />
          {[-0.8, 0.6].map((wx) => <Blok key={wx} p={[wx, h * 0.6, 0.31]} s={[0.6, 0.8, 0.02]} c="#1A1614" />)}
        </group>
      );
    })}
  </>
);

/** Sovjetsoldaten in een colonne langs x. */
export const Colonne = ({ z = 0, n = 8, t = 0, x0 = -8 }: { z?: number; n?: number; t?: number; x0?: number }) => (
  <>
    {Array.from({ length: n * 2 }, (_, i) => {
      const x = x0 + (i % n) * 1.6 + ((t * 1.2) % 1.6);
      return <Figuur key={i} kleding={SOLDAAT} hoofdExtra={<Helm />} position={[x, Math.abs(Math.sin(t * 6 + i)) * 0.05, z - Math.floor(i / n) * 1.2]} rotation={[0, Math.PI / 2, 0]} />;
    })}
  </>
);

export const Kamer = ({ kleur = '#C9B48E', vloer = '#4A3428' }: { kleur?: string; vloer?: string }) => (
  <>
    <Grond kleur={vloer} />
    <Blok p={[0, 3, -3]} s={[16, 6, 0.3]} c={kleur} rough={0.95} />
  </>
);

/* ================= scènes ================= */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 3.6, 0]} scherpte={2.5} mist={['#E8C8A8', 30, 170]} teller={{ label: 'Ruled', waarde: '29 years', pil: '1924 – 1953' }} tekst={[{ t: 'What if you were ' }, { t: 'Stalin', accent: true }, { t: '?' }]}>
      <Lucht boven="#6E7EA8" horizon="#F2C8A0" />
      <Zon position={[-30, 14, -140]} grootte={12} kleur="#FFE0B0" />
      <Camera pos={[ease(f, 0, 140, 4.2, 2.8), ease(f, 0, 140, 2.4, 2.8), ease(f, 0, 140, 9, 7.4)]} kijk={[0, 3.4, 0]} fov={34} />
      <Daglicht zon={[-10, 12, 8]} kleur="#FFE4C8" />
      <Grond kleur="#7A746C" />
      <Kremlin position={[0, 0, -30]} />
      <Colonne z={-8} n={12} t={t} x0={-10} />
      <Blok p={[0, 0.6, 0]} s={[3.4, 1.2, 2.2]} c="#7A2A24" />
      <RodeVlag position={[-2.6, 0, -1]} t={t} h={5.4} />
      <RodeVlag position={[2.4, 0, -1.4]} t={t + 1} h={5.4} />
      <Figuur {...SL} position={[0, 1.2, 0]} rotation={[0, 0.25, 0]} pose={{ armR: omhoog(), wenk: 0.35 }} />
    </Scène>
  );
};

const S2 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.3, 0]} scherpte={3.5} mist={['#2A1E16', 10, 40]} teller={{ label: 'Age', waarde: '7', pil: 'Gori, Georgia' }} tekst={[{ t: "a shoemaker's son. your father drinks, and he " }, { t: 'beats you', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 110, 1.8, 1.0), ease(f, 0, 110, 2.0, 1.8), ease(f, 0, 110, 7.4, 6.6)]} kijk={[0, 1.5, 0]} fov={34} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFC890" />
      <pointLight position={[1.5, 2.4, 1.5]} intensity={5} distance={8} color="#FFB070" />
      <Kamer kleur="#7A6048" vloer="#3A2A20" />
      <Blok p={[1.6, 0.4, -1.4]} s={[1.4, 0.8, 0.8]} c="#5A3E28" />
      {[1.2, 1.6, 2.0].map((x) => <Blok key={x} p={[x, 0.9, -1.4]} s={[0.22, 0.18, 0.4]} c="#3A2418" />)}
      <Figuur kleding={SOSO} scale={0.72} levend position={[-0.4, 0, 0.4]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.6, ...ARMEN_GEKRUIST }} />
      <Figuur kleding={VADER} snor levend position={[0.9, 0, -0.7]} rotation={[0, -0.6, 0]} pose={{ wenk: 0.8, mond: 'open', armR: wijs(0.9) }} />
    </Scène>
  );
};

const S3 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.8, 0]} scherpte={3.5} mist={['#2A1E16', 10, 40]} teller={{ label: 'Age', waarde: '15', pil: 'Tiflis seminary, 1894' }} tekst={[{ t: 'you train to be a priest, and secretly read ' }, { t: 'banned books', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 1.4, 0.6), ease(f, 0, 120, 2.3, 2.1), ease(f, 0, 120, 7.2, 6.2)]} kijk={[0, 1.9, -0.5]} fov={34} />
      <Binnenlicht zon={[-3, 7, 5]} kleur="#FFDDB0" />
      <pointLight position={[0, 2.4, 1.2]} intensity={6} distance={8} color="#FFC080" />
      <Kamer kleur="#D9C4A0" />
      {[-3, -1, 1, 3].map((x) => <Blok key={x} p={[x, 3.2, -2.8]} s={[1.2, 1.6, 0.06]} c="#C9A040" metal={0.4} rough={0.4} />)}
      {[-3, -1, 1, 3].map((x) => <Blok key={`i${x}`} p={[x, 3.15, -2.75]} s={[0.7, 1.0, 0.04]} c="#5A3A24" />)}
      <Blok p={[0, 0.5, 0.4]} s={[1.6, 0.08, 0.9]} c="#5A3E28" />
      <Figuur kleding={SEMINARIST} levend position={[0, 0, -0.2]} pose={{ armL: { schouder: [-1.2, 0, 0.2], elleboog: [0, 0.6] }, armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.6] }, hoofd: [0.35, 0, 0] }} />
      <Blok p={[0, 0.6, 0.55]} s={[0.6, 0.06, 0.42]} c={ROOD} />
      <Figuur kleding={PRIESTER} baard haar="grijs" levend position={[-2.6, 0, -1.4]} rotation={[0, 0.7, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.6 }} />
    </Scène>
  );
};

const S4 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const geld = Math.round(lin(f, 10, 95, 0, 341000) / 1000) * 1000;
  const x = lin(f, 0, 120, -3, 2);
  return (
    <Scène focus={[0, 1.8, 0]} scherpte={2.5} mist={['#D8C0A0', 20, 110]} teller={{ label: 'Stolen', waarde: geld.toLocaleString('en-US'), pil: 'roubles, Tiflis, 1907' }} tekst={[{ t: 'you plan a bank robbery to fund the ' }, { t: 'revolution', accent: true }]}>
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 120, 1.6, 0.8), ease(f, 0, 120, 2.4, 2.3), ease(f, 0, 120, 9.5, 8.5)]} kijk={[-0.3, 2.0, -2]} fov={34} />
      <Daglicht zon={[8, 12, 10]} />
      <Grond kleur="#A89A80" />
      {[-12, -6, 0, 6, 12].map((bx, i) => <Blok key={bx} p={[bx, 3, -10]} s={[5.6, 6 + (i % 2), 3]} c={['#C9B48E', '#B8A07A', '#D2BE98'][i % 3]} rough={1} />)}
      <group position={[x, 0, -8]}>
        <Paard position={[2.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#3A2A20" t={t} loopt />
        <Blok p={[-0.6, 1.2, 0]} s={[2.6, 1.6, 1.4]} c="#2A3A2A" />
        {[[-1.4, 0.75], [0.2, 0.75], [-1.4, -0.75], [0.2, -0.75]].map(([wx, wz]) => (
          <mesh key={`${wx}${wz}`} position={[wx, 0.45, wz]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.1, 10]} />
            <meshStandardMaterial color="#3A2A1C" />
          </mesh>
        ))}
      </group>
      {Array.from({ length: 16 }, (_, i) => (
        <Blok key={i} p={[x - 0.6 + Math.sin(i * 3.1) * (0.5 + t * 0.7), 1.6 + ((t * 0.8 + i * 0.37) % 3), -8 + Math.cos(i * 2.3) * (0.5 + t * 0.5)]} s={[0.26, 0.02, 0.14]} r={[t * 3 + i, i, 0]} c="#C9D4B0" />
      ))}
      <Figuur {...SL} kleding={{ ...STALIN, cape: '#3A3028' }} position={[-0.5, 0, 1.4]} rotation={[0, 0.3, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5 }} />
    </Scène>
  );
};

const S5 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 1.6, 0]} scherpte={3} mist={['#C8D2DC', 12, 70]} teller={{ label: 'Exiled to', waarde: 'Siberia', pil: 'again and again' }} tekst={[{ t: 'they send you to Siberia. you escape. they send you ' }, { t: 'back', accent: true }]}>
      <Lucht boven="#8A9AB0" horizon="#DDE4EA" />
      <Camera pos={[ease(f, 0, 110, 3.4, 2.4), ease(f, 0, 110, 2.4, 2.2), ease(f, 0, 110, 9.5, 8.5)]} kijk={[0, 1.8, -1]} fov={34} />
      <Daglicht zon={[6, 10, 8]} kleur="#E0E8F4" kracht={1.4} />
      <Grond kleur="#E4E8EE" />
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={i} position={[-20 + i * 2.7, 2.4, -12 - (i % 3) * 3]} castShadow>
          <coneGeometry args={[1.1, 4.8, 6]} />
          <meshStandardMaterial color={i % 2 ? '#2E4A3A' : '#3A5A44'} roughness={1} flatShading />
        </mesh>
      ))}
      <Blokhut position={[-2.6, 0, -3.5]} rotation={[0, 0.3, 0]} />
      <Neerslag t={t} n={160} breed={16} />
      <Figuur {...SL} kleding={{ ...STALIN, cape: '#3A3028' }} position={[1, 0, 0]} rotation={[0, -0.4, 0]} pose={{ wenk: 0.6, hoofd: [0, 0.5, 0] }} />
    </Scène>
  );
};

const S6 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.8, 0]} scherpte={3.5} mist={['#1E1610', 8, 34]} teller={{ label: 'New name', waarde: 'Stalin', pil: '"man of steel", 1913' }} tekst={[{ t: 'you give yourself a new name: "man of ' }, { t: 'steel"', accent: true }]}>
      <Lucht boven="#1E1610" horizon="#2A2018" />
      <Camera pos={[ease(f, 0, 115, 1.4, 0.7), ease(f, 0, 115, 2.6, 2.4), ease(f, 0, 115, 6.4, 5.4)]} kijk={[0, 1.7, 0]} fov={34} />
      <Nachtlicht />
      <pointLight position={[0.8, 1.6, 1.2]} intensity={7} distance={7} color="#FFB060" />
      <Kamer kleur="#5A4636" vloer="#2A2018" />
      <Blok p={[0, 0.9, 0.8]} s={[2.0, 0.1, 1.0]} c="#4A3020" />
      <Blok p={[0, 0.45, 0.8]} s={[1.8, 0.8, 0.8]} c="#3A2418" />
      <mesh position={[0.75, 1.1, 0.7]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#F2E8D0" emissive="#FFD080" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.75, 1.32, 0.7]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FFD070" emissive="#FFB040" emissiveIntensity={4} />
      </mesh>
      <TekstVlak regels={['STALIN']} b={1.0} h={0.36} achter="#EDE2C8" voor="#2A1A12" position={[-0.1, 0.96, 1.0]} rotation={[-Math.PI / 2 + 0.25, 0, 0]} fontPx={120} />
      <Figuur {...SL} position={[0, 0, 0]} pose={{ armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.5] }, hoofd: [0.35, 0, 0], wenk: 0.4 }} inHand={<Blok p={[0, -0.1, 0.1]} s={[0.03, 0.03, 0.3]} c="#2A1A12" />} />
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.6, 0]} scherpte={3.5} mist={['#2A2420', 10, 40]} teller={{ label: 'Year', waarde: '1923', pil: "Lenin's letter" }} tekst={[{ t: 'a dying Lenin warns them: "remove him." nobody ' }, { t: 'listens', accent: true }]}>
      <Lucht boven="#2A2420" horizon="#4A3E34" />
      <Camera pos={[ease(f, 0, 115, 1.4, 0.8), ease(f, 0, 115, 2.2, 2.1), ease(f, 0, 115, 8.6, 7.8)]} kijk={[0.4, 1.7, -0.8]} fov={34} />
      <Binnenlicht zon={[-4, 7, 5]} kleur="#E8E0D0" />
      <pointLight position={[-1, 2.6, 1.6]} intensity={4} distance={8} color="#F0E0C0" />
      <Kamer kleur="#B8B4A0" />
      <Blok p={[-0.8, 0.5, 0]} s={[1.0, 0.1, 1.0]} c="#5A3E28" />
      <Blok p={[-0.8, 1.0, -0.45]} s={[1.0, 1.0, 0.1]} c="#5A3E28" />
      <Blok p={[-0.8, 0.62, 0.4]} s={[1.2, 0.1, 0.9]} c="#6A6A5A" />
      <Figuur kleding={LENIN} haar="kaal" baard levend position={[-0.8, -0.35, 0]} rotation={[0, 0.3, 0]} pose={{ wenk: 0.4, armR: { schouder: [-0.9, 0, -0.1], elleboog: [0, -0.6] } }} inHand={<Rol />} />
      <Figuur {...SL} position={[1.2, 0, -1.6]} rotation={[0, -0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
    </Scène>
  );
};

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2.4, 0]} scherpte={2.5} mist={['#C8A888', 25, 140]} teller={{ label: 'Year', waarde: '1928', pil: 'Five-Year Plan' }} tekst={[{ t: 'you force a nation of farmers into the age of ' }, { t: 'steel', accent: true }]}>
      <Lucht boven="#7A8AA8" horizon="#E8B888" />
      <Camera pos={[ease(f, 0, 115, 2.6, 1.6), ease(f, 0, 115, 2.2, 2.5), ease(f, 0, 115, 8, 7)]} kijk={[0, 2.8, -3]} fov={34} />
      <Daglicht zon={[8, 12, 10]} kleur="#FFD8B0" />
      <Grond kleur="#6A6058" />
      <Fabriek position={[-8, 0, -18]} t={t} />
      <Fabriek position={[9, 0, -24]} t={t + 2} schaal={1.2} />
      <RodeVlag position={[-3.2, 0, -5]} t={t} h={5} />
      {[-2.6, 2.4, 3.6].map((x, i) => <Figuur key={x} kleding={BOER} hoofdExtra={<Pet kleur="#4A4A44" />} levend position={[x, 0, -3 - i]} rotation={[0, x < 0 ? 0.5 : -0.5, 0]} pose={{ armR: omhoog() }} />)}
      <Figuur {...SL} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ armR: wijs(1.4), wenk: 0.4 }} />
    </Scène>
  );
};

const S9 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 115, -1, 3);
  return (
    <Scène focus={[0, 1.4, 0]} scherpte={3} mist={['#A8A498', 15, 90]} teller={{ label: 'Famine', waarde: 'millions', pil: 'dead, 1932 – 33' }} tekst={[{ t: 'your men take the grain. millions ' }, { t: 'starve', accent: true }]}>
      <Lucht boven="#7A7C80" horizon="#BDB8AC" />
      <Camera pos={[ease(f, 0, 115, 1.0, 0.4), ease(f, 0, 115, 2.6, 2.4), ease(f, 0, 115, 10, 9)]} kijk={[0.4, 1.4, -2.5]} fov={34} />
      <Daglicht zon={[6, 9, 8]} kleur="#D8D4CC" kracht={1.3} />
      <Grond kleur="#8A7A58" />
      {Array.from({ length: 30 }, (_, i) => <Blok key={i} p={[-20 + (i % 15) * 2.8, 0.15, -12 - Math.floor(i / 15) * 6]} s={[2.4, 0.3, 0.3]} c="#6A5A3E" />)}
      <Blok p={[-3.6, 1.2, -3]} s={[3, 2.4, 2.6]} c="#8A7A60" rough={1} />
      <Blok p={[-3.6, 2.7, -3]} s={[3.4, 0.6, 3]} r={[0, 0, 0]} c="#6A5A3A" rough={1} />
      <Figuur kleding={BOERIN} haar="lang" levend position={[-0.9, 0, -0.6]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.8, traan: lin(f, 30, 100, 0, 1) }} />
      <Figuur kleding={BOER} scale={0.7} levend position={[-0.1, 0, -0.2]} rotation={[0, 0.6, 0]} pose={{ wenk: -0.7 }} />
      <group position={[1 + x, 0, -6]}>
        <Paard position={[2.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#5A4A3A" t={t} loopt />
        <Blok p={[-0.4, 0.9, 0]} s={[2.6, 0.6, 1.4]} c="#5A3E28" />
        {[[-1.2, 0], [-0.4, 0.3], [0.4, -0.2], [-0.8, -0.4], [0.2, 0.4]].map(([sx, sz], i) => <Blok key={i} p={[sx, 1.45, sz]} s={[0.6, 0.5, 0.5]} c="#C9B88E" rough={1} />)}
        <Figuur kleding={SOLDAAT} hoofdExtra={<Pet kleur="#2A3A6A" />} position={[1.0, 0, 1.1]} rotation={[0, Math.PI / 2, 0]} />
      </group>
    </Scène>
  );
};

const S10 = () => {
  const f = useCurrentFrame();
  const aantal = Math.round(lin(f, 8, 90, 0, 680000) / 5000) * 5000;
  const x = lin(f, 0, 110, -5, -1);
  return (
    <Scène focus={[0, 1.4, -1]} scherpte={2.5} mist={['#10121A', 8, 40]} teller={{ label: 'Executed', waarde: aantal.toLocaleString('en-US'), pil: 'the Great Terror, 1937 – 38' }} tekst={[{ t: 'at night, a black car comes. people simply ' }, { t: 'vanish', accent: true }]}>
      <Lucht boven="#0E1018" horizon="#1E2230" />
      <Camera pos={[ease(f, 0, 110, 3.4, 2.4), ease(f, 0, 110, 2.6, 2.3), ease(f, 0, 110, 9, 7.8)]} kijk={[0, 1.6, -2]} fov={34} />
      <Nachtlicht />
      <Grond kleur="#2A2A30" />
      {[-8, -2.4, 3.2, 8.8].map((bx, i) => (
        <group key={bx} position={[bx, 0, -5]}>
          <Blok p={[0, 4, 0]} s={[5.4, 8, 3]} c="#4A4650" rough={1} />
          {[-1.5, 0, 1.5].map((wx) => [2, 4.2, 6.4].map((wy) => (
            <Blok key={`${wx}${wy}`} p={[wx, wy, 1.52]} s={[0.8, 1.1, 0.04]} c={(i + wx + wy) % 3 === 0 ? '#E8B060' : '#1A1A22'} />
          )))}
        </group>
      ))}
      <Auto position={[x, 0, -1.8]} />
      <Figuur kleding={WACHT} hoofdExtra={<Pet />} levend position={[1.4, 0, -0.2]} rotation={[0, -0.5, 0]} />
      <Figuur kleding={WACHT} hoofdExtra={<Pet />} levend position={[2.6, 0, -0.8]} rotation={[0, -0.7, 0]} />
    </Scène>
  );
};

const S11 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const weg = lin(f, 45, 75, 1, 0.001);
  return (
    <Scène focus={[0, 1.6, 0]} scherpte={2} mist={['#B8A888', 15, 80]} teller={{ label: 'Photo', waarde: 'edited', pil: 'Yezhov, 1940' }} tekst={[{ t: 'your fallen allies are even erased from ' }, { t: 'photos', accent: true }]}>
      <Lucht boven="#A89A80" horizon="#D8C8A8" />
      <Camera pos={[0, 1.7, 8.2]} kijk={[0, 1.7, 0]} fov={34} />
      <Daglicht zon={[4, 10, 10]} kleur="#F0DCB8" kracht={1.6} />
      <Grond kleur="#A89878" />
      <group position={[0, 0, -9]}>
        <Zee t={t} kleur="#7A8A84" golf={0.05} grootte={40} />
      </group>
      <Blok p={[0, 0.5, -3]} s={[20, 1, 0.4]} c="#9A8A70" />
      <Figuur {...SL} position={[-0.6, 0, 0]} rotation={[0, 0.15, 0]} />
      <group position={[0.7, 0, 0.1]} scale={[weg, weg, weg]}>
        <Figuur kleding={YEZHOV} hoofdExtra={<Pet />} scale={0.85} levend rotation={[0, -0.2, 0]} />
      </group>
      {/* fotolijst in beeld */}
      {[2.45, 0.95].map((y) => <Blok key={`h${y}`} p={[0, y, 5.2]} s={[1.0, 0.05, 0.01]} c="#F2EAD8" />)}
      {[-0.47, 0.47].map((x) => <Blok key={`v${x}`} p={[x, 1.7, 5.2]} s={[0.05, 1.55, 0.01]} c="#F2EAD8" />)}
    </Scène>
  );
};

const S12 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const doden = Math.round(lin(f, 8, 90, 0, 27) );
  return (
    <Scène focus={[0, 3, -2]} scherpte={2.5} mist={['#C8CCD2', 15, 90]} teller={{ label: 'Soviet dead', waarde: `${doden} million`, pil: 'WWII, 1941 – 45' }} tekst={[{ t: 'Hitler invades. you win the war, at a horrific ' }, { t: 'price', accent: true }]}>
      <Lucht boven="#8A929E" horizon="#D4D8DC" />
      <Camera pos={[ease(f, 0, 115, 4, 3), ease(f, 0, 115, 1.8, 2.2), ease(f, 0, 115, 10.5, 9.5)]} kijk={[0, 3.4, -3]} fov={34} />
      <Daglicht zon={[6, 10, 8]} kleur="#E4E8EE" kracht={1.5} />
      <Grond kleur="#DCE0E4" />
      <Ruines z={-10} />
      <Blok p={[0, 1.2, -3]} s={[4, 2.4, 1.6]} r={[0, 0.1, 0.04]} c="#7A7068" rough={1} />
      <RodeVlag position={[0.4, 2.4, -3]} t={t} h={3.4} />
      <Figuur kleding={SOLDAAT} hoofdExtra={<Helm />} levend position={[-0.6, 2.4, -2.8]} pose={{ armR: omhoog(), mond: 'open' }} />
      {[-3, -1.8, 1.8, 3].map((x, i) => <Figuur key={x} kleding={SOLDAAT} hoofdExtra={<Helm />} levend position={[x, 0, -0.6 - (i % 2)]} rotation={[0, Math.PI + (x < 0 ? 0.4 : -0.4), 0]} />)}
      <Neerslag t={t} n={140} breed={16} />
    </Scène>
  );
};

const S13 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.4, -1.6]} scherpte={2.5} mist={['#14141C', 8, 30]} teller={{ label: 'Age', waarde: '74', pil: 'Moscow, March 1953' }} tekst={[{ t: 'you collapse. your guards are too scared to open the ' }, { t: 'door', accent: true }]}>
      <Lucht boven="#14141C" horizon="#22222C" />
      <Camera pos={[ease(f, 0, 115, 1.6, 0.8), ease(f, 0, 115, 2.2, 2.0), ease(f, 0, 115, 7.0, 6.0)]} kijk={[0, 1.6, -1.6]} fov={34} />
      <Nachtlicht />
      <pointLight position={[0, 3, 0.5]} intensity={4} distance={7} color="#D8D0B8" />
      <Grond kleur="#3A2A22" />
      <Blok p={[0, 0.02, -0.4]} s={[2, 0.04, 6]} c="#6E1E22" rough={1} />
      <Blok p={[0, 3, -2.2]} s={[10, 6, 0.3]} c="#7A6A52" rough={1} />
      <Blok p={[0, 1.4, -2.02]} s={[1.4, 2.8, 0.08]} c="#4A3020" />
      <Blok p={[0.5, 1.3, -1.96]} s={[0.1, 0.1, 0.06]} c="#C9A646" metal={0.6} rough={0.3} />
      <mesh position={[0, 0.03, -1.94]}>
        <boxGeometry args={[1.3, 0.03, 0.06]} />
        <meshStandardMaterial color="#FFE0A0" emissive="#FFD080" emissiveIntensity={3} />
      </mesh>
      {[-1.4, 1.4].map((x, i) => <Figuur key={x} kleding={WACHT} hoofdExtra={<Pet />} levend position={[x, 0, -1.3]} rotation={[0, i ? -0.5 : 0.5, 0]} pose={{ wenk: -0.6, hoofd: [0, i ? 0.6 : -0.6, 0] }} />)}
    </Scène>
  );
};

const S14 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 4, -3]} scherpte={2.2} mist={['#C87A50', 30, 160]} teller={{ label: 'Legacy', waarde: 'hero or monster?', pil: '1878 – 1953' }} tekst={[{ t: 'and people still argue about what you ' }, { t: 'were', accent: true }]}>
      <Lucht boven="#3E2A44" horizon="#E8864E" onder="#2A1A14" />
      <Zon position={[0, 6, -150]} grootte={16} kleur="#FFB070" />
      <Camera pos={[ease(f, 0, 210, 5, 3), ease(f, 0, 210, 1.6, 2.2), ease(f, 0, 210, 12, 9.5)]} kijk={[0, 4.4, -4]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFC8A0', '#3A2A20', 0.6]} />
      <Grond kleur="#5A524A" />
      <Kremlin position={[0, 0, -34]} />
      <Sokkel position={[0, 0, -4]} h={2.4}>
        <Figuur kleding={STALIN} hoofdExtra={<HoofdS />} scale={1.6} o={{ kleur: '#7E6440', metaal: 0.3, ruw: 0.45 }} pose={{ armR: { schouder: [-0.4, 0, -0.1], elleboog: [0, -0.8] } }} />
      </Sokkel>
      {Array.from({ length: 16 }, (_, i) => {
        const x = (i % 8) * 1.4 - 4.9;
        const z = 0.2 + Math.floor(i / 8) * 1.3;
        const links = x < 0;
        return <Figuur key={i} kleding={links ? { ...BOER, tuniek: ROOD } : BOERIN} haar={links ? 'kort' : 'lang'} levend position={[x, 0, z]} rotation={[0, Math.PI, 0]} pose={{ armR: links && i % 2 ? omhoog() : undefined }} />;
      })}
      <RodeVlag position={[-4.6, 0, 1]} t={t} h={4.6} />
    </Scène>
  );
};

/** Omslag in de what.if.atlas-opbouw: Stalin ten voeten uit op de tribune voor het Kremlin. */
export const OmslagStalinScène = () => (
  <>
    <fog attach="fog" args={['#E8B888', 30, 170]} />
    <Lucht boven="#4E3A5A" horizon="#F2A060" />
    <Zon position={[-6, 9, -140]} grootte={18} kleur="#FFD08A" />
    <Camera pos={[2.2, 2.6, 9.5]} kijk={[0, 3.4, 0]} fov={36} />
    <Daglicht zon={[-6, 8, 9]} kleur="#FFC890" kracht={2.3} />
    <Grond kleur="#7A746C" />
    <Kremlin position={[0, 0, -28]} />
    <Colonne z={-7} n={12} x0={-10} />
    <Blok p={[0, 0.6, 0]} s={[3.4, 1.2, 2.2]} c="#7A2A24" />
    <RodeVlag position={[-2.6, 0, -1]} h={5.6} />
    <RodeVlag position={[2.4, 0, -1.4]} t={1} h={5.6} />
    <Figuur kleding={STALIN} hoofdExtra={<HoofdS />} position={[0, 1.2, 0]} rotation={[0, 0.2, 0]} pose={{ armR: omhoog(), wenk: 0.45 }} />
  </>
);

/* ================= montage ================= */

const SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14];
const DUUR = [140, 110, 120, 120, 110, 115, 115, 115, 115, 110, 110, 110, 115, 210];
/** Trial-reel-hooks: B = de oorlog gewonnen (de top), C = de bankoverval (schokdetail). */
export const STALIN_HOOKS: HookPlan = { B: 11, C: 3 };
export const STALIN_DUUR = DUUR.reduce((a, b) => a + b, 0);
if (STALIN_DUUR > MAX_SHORT_FRAMES) throw new Error(`STALIN_DUUR is ${STALIN_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = STALIN_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const KLANKEN: Klank[] = [
  { s: 0, src: 'menigte', vol: 0.1, lus: true },
  { s: 0, bij: 4, src: 'inslag', vol: 0.2 },
  { s: 1, src: 'vuur', vol: 0.05, lus: true },
  { s: 1, bij: 40, src: 'val', vol: 0.12 },
  { s: 2, src: 'vuur', vol: 0.04, lus: true },
  { s: 2, bij: 50, src: 'tik', vol: 0.16 },
  { s: 3, src: 'menigte', vol: 0.08, lus: true },
  { s: 3, bij: 12, src: 'inslag', vol: 0.22 },
  ...[40, 60, 80].map((bij) => ({ s: 3, bij, src: 'munt', vol: 0.12 })),
  { s: 4, src: 'wind', vol: 0.14, lus: true },
  { s: 4, bij: 60, src: 'val', vol: 0.12 },
  { s: 5, src: 'vuur', vol: 0.05, lus: true },
  { s: 5, bij: 40, src: 'glans', vol: 0.14 },
  { s: 6, src: 'wind', vol: 0.05, lus: true },
  { s: 6, bij: 50, src: 'tik', vol: 0.16 },
  { s: 7, src: 'menigte', vol: 0.1, lus: true },
  { s: 7, bij: 20, src: 'inslag', vol: 0.18 },
  { s: 8, src: 'wind', vol: 0.1, lus: true },
  { s: 8, bij: 50, src: 'val', vol: 0.14 },
  { s: 9, src: 'wind', vol: 0.06, lus: true },
  { s: 9, bij: 20, src: 'inslag', vol: 0.16 },
  { s: 10, src: 'zee', vol: 0.06, lus: true },
  { s: 10, bij: 45, src: 'glans', vol: 0.14 },
  { s: 11, src: 'wind', vol: 0.14, lus: true },
  { s: 11, bij: 10, src: 'inslag', vol: 0.2 },
  { s: 12, bij: 15, src: 'val', vol: 0.16 },
  { s: 13, src: 'menigte', vol: 0.12, lus: true },
  { s: 13, bij: 6, src: 'glans', vol: 0.12 },
];

export const WatAlsStalin = ({ muziek = true, muziekVanaf = 14, hook = 'A' }: { muziek?: boolean; muziekVanaf?: number; hook?: Hook }) => {
  const STARTS = startsVoor(DUUR, hookVolgorde(SCÈNES.length, STALIN_HOOKS, hook));
  return (
  <AbsoluteFill style={{ background: '#000' }}>
    {SCÈNES.map((C, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={DUUR[i]}>
        <C />
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
          <Audio
            src={sfx(k.src)}
            loop={k.lus}
            volume={(fr) => (k.lus ? interpolate(fr, [0, 8, lengte - 8, lengte], [0, k.vol, k.vol, 0], { extrapolateRight: 'clamp' }) : k.vol)}
          />
        </Sequence>
      );
    })}
    {muziek && (
      <Audio
        src={staticFile('lokaal/amour-plastique.mp3')}
        startFrom={Math.round(muziekVanaf * 30)}
        volume={(fr) => interpolate(fr, [0, 10, STALIN_DUUR - 45, STALIN_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
  );
};
