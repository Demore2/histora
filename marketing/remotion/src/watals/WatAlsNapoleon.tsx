import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  Avondlicht,
  Berg,
  Binnenlicht,
  Bos,
  Camera,
  Daglicht,
  Grond,
  Heuvels,
  Kanon,
  Kathedraal,
  Koepelkerk,
  Leger,
  Lucht,
  Menigte,
  Nachtlicht,
  Neerslag,
  Paard,
  Piramide,
  Rivier,
  Rook,
  Rots,
  Scherpte,
  Schuim,
  Soldaat,
  Sokkel,
  TekstVlak,
  Vuur,
  Zee,
  Zon,
} from './Decor';
import {
  AFGEVAARDIGDE,
  ARMEN_GEKRUIST,
  Blok,
  BRONS,
  Figuur,
  GIDS,
  JOSEPHINE,
  Kroon,
  NAPOLEON,
  NAPOLEON_KROONMANTEL,
  omhoog,
  PAUS,
  SCHOLIER,
  Verrekijker,
  wijs,
  type V3,
} from './Figuur';
import { Afsluiter } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';

/**
 * "What if you were Napoleon?" — 19 scènes + afsluiter, alles in code (Remotion + three.js).
 * Zelfde opbouw als WatAlsCaesar. Bronnen: zie marketing/1.shorts/1.te-posten/02-napoleon/upload/post.md.
 * Napoleon draagt in elke scène dezelfde blauwe jas, witte broek, laarzen en steek
 * (alleen bij de kroning de lauwerkrans en de kroningsmantel).
 */

const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const getal = (n: number) => Math.round(n).toLocaleString('en-US');

/* ---------- gedeeld scène-frame ---------- */

type SceneProps = {
  children: ReactNode;
  focus: V3;
  scherpte?: number;
  mist?: [string, number, number];
  teller?: { label: string; waarde: string; pil?: string };
  tekst?: Deel[];
};

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

const NAP = { kleding: NAPOLEON, hoofddeksel: 'steek' as const };

/* ---------- 1-2: Corsica en de kostschool ---------- */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 1.9, 0.6]}
      scherpte={2.5}
      mist={['#EAD9BE', 30, 150]}
      teller={{ label: 'Born', waarde: '1769', pil: 'on Corsica' }}
      tekst={[{ t: 'What if you were ' }, { t: 'Napoleon', accent: true }, { t: '?' }]}
    >
      <Lucht boven="#7FAED8" horizon="#F1DDBC" />
      <Zon position={[-40, 10, -120]} grootte={10} kleur="#FFE2A8" />
      <Camera pos={[ease(f, 0, 140, 6.2, 4.6), ease(f, 0, 140, 3.2, 2.6), ease(f, 0, 140, 9.5, 7.6)]} kijk={[0, 1.9, 0.4]} fov={34} />
      <Daglicht zon={[-10, 14, 8]} />
      <group position={[0, -5, 0]}>
        <Zee t={t} />
      </group>
      {/* klif */}
      <Blok p={[0, -2.6, -1]} s={[9, 5.2, 8]} c="#9A8670" rough={1} />
      <Blok p={[0, 0.02, -1]} s={[8.6, 0.06, 7.6]} c="#8FA05A" rough={1} />
      <Rots position={[3.8, -2.2, 3.2]} schaal={[1.6, 2.6, 1.4]} kleur="#8A7864" />
      <Rots position={[-4.2, -3, 2.6]} schaal={[2, 2.2, 1.8]} kleur="#958169" rotation={[0.4, 1, 0]} />
      <Rots position={[-12, -4.5, -14]} schaal={[4, 3, 3]} kleur="#8A7864" />
      {[-2.6, 2.8, -3.4].map((x, i) => (
        <Blok key={i} p={[x, 0.35, -2.6 + i]} s={[0.9, 0.7, 0.9]} c="#5D7A3E" />
      ))}
      <Figuur {...NAP} position={[0, 0.05, 0.6]} rotation={[0, 0.45, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [-0.05, 0, 0] }} />
    </Scène>
  );
};

const S2 = () => {
  const f = useCurrentFrame();
  const lach = Math.floor(f / 7) % 2 === 0 ? 'lach' : 'open';
  return (
    <Scène
      focus={[0, 1.4, 0.4]}
      scherpte={3.5}
      mist={['#DCCDB2', 12, 60]}
      teller={{ label: 'Age', waarde: '9', pil: 'military school, France' }}
      tekst={[{ t: 'the other boys mock your ' }, { t: 'accent', accent: true }]}
    >
      <Lucht boven="#A9C3D6" horizon="#E6DDC2" />
      <Camera pos={[ease(f, 0, 120, 1.6, 1.2), ease(f, 0, 120, 1.9, 1.75), ease(f, 0, 120, 6.4, 5.4)]} kijk={[0, 1.35, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} />
      <Grond kleur="#B7A88A" />
      {/* schoolgebouw */}
      <Blok p={[0, 3, -4]} s={[16, 6, 0.6]} c="#D9CDB6" rough={0.95} />
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <group key={x}>
          <Blok p={[x, 2.1, -3.68]} s={[1.0, 1.5, 0.04]} c="#4A5A6A" rough={0.3} />
          <Blok p={[x, 4.4, -3.68]} s={[1.0, 1.3, 0.04]} c="#4A5A6A" rough={0.3} />
        </group>
      ))}
      <Blok p={[0, 6.3, -4]} s={[16.6, 0.6, 1.2]} c="#7A4A3A" />
      <Figuur kleding={NAPOLEON} position={[0, 0, 0.4]} rotation={[0, 0.25, 0]} scale={0.72} pose={{ hoofd: [0.3, 0, 0], wenk: ease(f, 20, 60, 0, 0.9) }} />
      <Figuur kleding={SCHOLIER} position={[-1.3, 0, -0.4]} rotation={[0, 0.9, 0]} scale={0.74} pose={{ armR: wijs(1.35), mond: lach }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#6B4A30', haar: '#C9A050' }} position={[1.35, 0, -0.5]} rotation={[0, -0.85, 0]} scale={0.7} pose={{ armL: wijs(1.3), mond: lach === 'lach' ? 'open' : 'lach' }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#3A5A3A', haar: '#2B1E16' }} position={[0.6, 0, -1.6]} rotation={[0, -0.3, 0]} scale={0.76} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
    </Scène>
  );
};

/* ---------- 3-5: Toulon, Joséphine, Lodi ---------- */

const S3 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const schotA = f >= 18 ? lin(f, 18, 48, 0.02, 1) : 0;
  const schotB = f >= 62 ? lin(f, 62, 92, 0.02, 1) : 0;
  return (
    <Scène
      focus={[0, 1.9, 0]}
      scherpte={3}
      mist={['#9A5A3A', 14, 80]}
      teller={{ label: 'Age', waarde: '24', pil: 'Toulon, 1793' }}
      tekst={[{ t: 'you take Toulon. at 24, you are a ' }, { t: 'general', accent: true }]}
    >
      <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
      <Zon position={[10, 5, -130]} grootte={12} kleur="#FFC07A" />
      <Camera pos={[ease(f, 0, 120, 2.0, 1.4), 2.5, ease(f, 0, 120, 8.4, 7.4)]} kijk={[0.1, 2.3, -0.6]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.5]} />
      <Grond kleur="#4A3424" />
      <Kanon position={[-1.9, 0, -2.0]} rotation={[0, Math.PI / 2, 0]} schot={schotA} />
      <Kanon position={[-3.0, 0, -4.8]} rotation={[0, Math.PI / 2 - 0.1, 0]} schot={schotB} />
      {/* fort in de verte, brandend */}
      <Blok p={[-45, 2, -30]} s={[24, 4, 4]} c="#3A2A22" r={[0, 0.6, 0]} />
      <Blok p={[-50, 4, -24]} s={[4, 8, 4]} c="#3A2A22" />
      <Vuur position={[-50, 8, -23]} t={t} grootte={2} />
      <Vuur position={[-40, 4, -32]} t={t + 1} grootte={1.6} />
      <Soldaat tijd="1800" position={[-1.6, 0, -3.4]} rotation={[0, -Math.PI / 2, 0]} t={t} />
      <Soldaat tijd="1800" position={[-1.9, 0, -6.0]} rotation={[0, -Math.PI / 2, 0]} t={t} />
      <Figuur {...NAP} position={[0.7, 0, 0.2]} rotation={[0, -1.15, 0]} pose={{ armR: wijs(ease(f, 5, 20, 0.2, 1.5)), wenk: 0.6, mond: f > 10 && f < 40 && Math.floor(f / 5) % 2 ? 'open' : 'dicht' }} />
    </Scène>
  );
};

const S4 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.1, 0]}
      scherpte={4}
      mist={['#3A2A1E', 8, 30]}
      teller={{ label: 'Year', waarde: '1796', pil: 'Paris' }}
      tekst={[{ t: 'you marry a widow named ' }, { t: 'Joséphine', accent: true }]}
    >
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 0.6, 0.3), 2.4, ease(f, 0, 120, 7.0, 6.0)]} kijk={[0, 2.2, 0]} fov={34} />
      <Binnenlicht zon={[-4, 7, 5]} kleur="#FFD6A0" />
      <pointLight position={[1.6, 2.6, 1.2]} intensity={5} distance={7} color="#FFB060" />
      <Grond kleur="#6A4A34" />
      <Blok p={[0, 3, -2.2]} s={[9, 6, 0.3]} c="#C9B48E" />
      {[-2.6, 2.6].map((x) => <Blok key={x} p={[x, 3, -2.03]} s={[0.25, 6, 0.04]} c="#D8B54E" metal={0.4} rough={0.4} />)}
      <Blok p={[0, 3.2, -2.03]} s={[1.6, 2.2, 0.04]} c="#4A5A7A" rough={0.3} />
      {/* kandelaar */}
      <Blok p={[1.6, 0.9, 1.2]} s={[0.06, 1.8, 0.06]} c="#B8912F" metal={0.6} rough={0.3} />
      <Blok p={[1.6, 1.9, 1.2]} s={[0.05, 0.14, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <Figuur {...NAP} position={[0.6, 0, 0]} rotation={[0, -0.8, 0]} pose={{ armR: { schouder: [-0.6, 0, -0.1], elleboog: [0, -0.3] }, mond: 'lach' }} />
      <Figuur kleding={JOSEPHINE} haar="bob" hoofddeksel="hoofdband" position={[-0.6, 0, 0.15]} rotation={[0, 0.8, 0]} pose={{ armL: { schouder: [-0.6, 0, 0.1], elleboog: [0, -0.3] }, mond: 'lach', ogen: f > 60 && f < 70 ? 'dicht' : 'open' }} />
    </Scène>
  );
};

const S5 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, 0, 1.6);
  return (
    <Scène
      focus={[0, 2.2, z]}
      scherpte={3}
      mist={['#D6D2BC', 18, 80]}
      teller={{ label: 'Age', waarde: '26', pil: 'Lodi, Italy' }}
      tekst={[{ t: 'your men call you the little ' }, { t: 'corporal', accent: true }]}
    >
      <Lucht boven="#94BCDD" horizon="#E8E0C6" />
      <Camera pos={[ease(f, 0, 120, 3.6, 3.0), 2.9, z + ease(f, 0, 120, 9.0, 7.6)]} kijk={[0, 2.2, z - 1]} fov={34} />
      <Daglicht zon={[8, 14, 6]} />
      <group rotation={[0, Math.PI / 2, 0]}>
        <Rivier t={t} breed={10} nacht={false} />
      </group>
      {/* brug van steen, dwars over de rivier (langs z) */}
      <Blok p={[0, 0.35, 0]} s={[3.2, 0.5, 26]} c="#BBAE96" rough={0.9} />
      {[-1.5, 1.5].map((x) => <Blok key={x} p={[x, 0.85, 0]} s={[0.2, 0.5, 26]} c="#A89B84" />)}
      <Bos n={30} straal={40} vrij={12} />
      <Leger tijd="1800" rijen={5} kolommen={2} afstand={1.15} position={[0, 0.6, -7.5]} t={t} zwaai />
      <Figuur {...NAP} position={[0, 0.6, z]} rotation={[0, 0.15, 0]} pose={{ armR: omhoog(), mond: 'open' }} />
    </Scène>
  );
};

/* ---------- 6-9: Egypte, Brumaire, de Alpen, de kroning ---------- */

const S6 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 3.0, 0]}
      scherpte={2.5}
      mist={['#EAD3A8', 30, 160]}
      teller={{ label: 'Year', waarde: '1798', pil: 'Egypt, as he told it' }}
      tekst={[{ t: 'you tell your men: forty centuries look down on ' }, { t: 'you', accent: true }]}
    >
      <Lucht boven="#8DB3D2" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 120, 4.0, 3.0), ease(f, 0, 120, 2.6, 3.0), ease(f, 0, 120, 11.5, 10.0)]} kijk={[0, 3.0, 0]} fov={36} />
      <Daglicht zon={[10, 16, 10]} kracht={2.3} />
      <Grond kleur="#D9BE8A" />
      <Piramide position={[-14, 0, -70]} h={26} />
      <Piramide position={[12, 0, -85]} h={30} kleur="#D2AE72" />
      <Piramide position={[34, 0, -60]} h={14} />
      <Leger tijd="1800" rijen={3} kolommen={6} position={[-7, 0, -6]} rotation={[0, 0.3, 0]} t={t} />
      <Leger tijd="1800" rijen={3} kolommen={6} position={[7, 0, -7]} rotation={[0, -0.3, 0]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} pose={{ hoofd: [0, -0.8, 0], armR: wijs(ease(f, 10, 30, 0.3, 2.2)), mond: f > 30 && f < 80 && Math.floor(f / 5) % 2 ? 'open' : 'dicht' }} />} />
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.1, 0.6]}
      scherpte={4}
      mist={['#3A2A1E', 8, 32]}
      teller={{ label: 'Age', waarde: '30', pil: 'First Consul, 1799' }}
      tekst={[{ t: 'back in Paris, you seize ' }, { t: 'power', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 1.0, 0.5), 2.6, ease(f, 0, 120, 9.2, 8.0)]} kijk={[0, 2.3, 0]} fov={34} />
      <Binnenlicht zon={[3, 8, 6]} kleur="#FFD3A0" />
      <Grond kleur="#7A5A40" />
      <Blok p={[0, 4, -5]} s={[14, 8, 0.4]} c="#BFA77E" />
      {[-4, -1.5, 1.5, 4].map((x) => <Blok key={x} p={[x, 4, -4.75]} s={[0.6, 8, 0.1]} c="#D9C9A8" />)}
      {/* afgevaardigden vluchten weg naar achteren */}
      {[-2.4, -1.2, 1.0, 2.3].map((x, i) => (
        <Figuur key={i} kleding={AFGEVAARDIGDE} position={[x, 0, -2.6 - lin(f, 0, 120, 0, 1.2) - (i % 2) * 0.4]} rotation={[0, Math.PI + (i - 1.5) * 0.3, 0]} pose={{ armL: omhoog(), mond: 'open' }} />
      ))}
      <Soldaat tijd="1800" position={[-1.9, 0, -0.6]} rotation={[0, Math.PI, 0]} t={t} geweerOmhoog />
      <Soldaat tijd="1800" position={[2.0, 0, -0.8]} rotation={[0, Math.PI, 0]} t={t} geweerOmhoog />
      <Figuur {...NAP} position={[0, 0, 0.6]} rotation={[0, 0.05, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5 }} />
    </Scène>
  );
};

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 120, -2.2, 1.4);
  return (
    <Scène
      focus={[x, 2.4, 0]}
      scherpte={3}
      mist={['#DCE2E8', 30, 170]}
      teller={{ label: 'Year', waarde: '1800', pil: 'crossing the Alps' }}
      tekst={[{ t: 'the painting shows a horse. you rode a ' }, { t: 'mule', accent: true }]}
    >
      <Lucht boven="#9FB8D0" horizon="#E8EDF1" />
      <Camera pos={[x + 5.5, 3.3, 8.8]} kijk={[x + 0.4, 2.9, 0]} fov={34} />
      <Daglicht zon={[-6, 14, 10]} kleur="#F4F0EA" kracht={1.8} />
      <Grond kleur="#EEF1F4" />
      <Berg position={[-18, 0, -40]} h={34} r={20} />
      <Berg position={[14, 0, -55]} h={44} r={24} kleur="#6E7078" />
      <Berg position={[40, 0, -35]} h={26} r={16} />
      <Blok p={[0, 0.02, 0]} s={[60, 0.04, 2.2]} c="#C9CCD0" rough={1} />
      {[-9, -4, 6, 11].map((xx, i) => <Rots key={i} position={[xx, 0.2, -2.4 - i % 2]} schaal={[1.2, 0.9, 1]} kleur="#8A8C90" />)}
      <Paard position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#7E766C" manen="#3A342E" dek="#1F3A6E" ezel t={t} loopt ruiter={<Figuur {...NAP} pose={{ ...ARMEN_GEKRUIST }} />} />
      <Figuur kleding={GIDS} position={[x + 1.9, 0, 0.3]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [-0.6, 0, 0.2], elleboog: [0, -0.4] }, armR: { schouder: [Math.sin(t * 7) * 0.4, 0, -0.08] } }} />
      <Neerslag t={t} n={90} midden={[x, 0, 1]} />
    </Scène>
  );
};

const S9 = () => {
  const f = useCurrentFrame();
  const kroonY = ease(f, 40, 95, 3.15, 2.56);
  return (
    <Scène
      focus={[0, 2.5, 0]}
      scherpte={3}
      mist={['#C9BCA2', 14, 60]}
      teller={{ label: 'Year', waarde: '1804', pil: 'Notre-Dame, Paris' }}
      tekst={[{ t: 'the pope is there. you crown ' }, { t: 'yourself', accent: true }]}
    >
      <Lucht boven="#6A5E50" horizon="#A8987E" />
      <Camera pos={[ease(f, 0, 120, 1.6, 1.1), 2.2, ease(f, 0, 120, 8.8, 7.6)]} kijk={[-0.3, 2.8, 0]} fov={36} />
      <Binnenlicht zon={[2, 14, 4]} kleur="#FFE6C0" />
      <pointLight position={[0, 6, 2]} intensity={10} distance={14} color="#FFE0B0" />
      <Kathedraal />
      <group position={[-4.5, 0, 3]} rotation={[0, Math.PI / 2, 0]}>
        <Menigte n={8} x0={-4} t={f / 30} />
      </group>
      {/* paus op zijn troon, links achter */}
      <Blok p={[-1.9, 0.5, -1.6]} s={[1.2, 1.0, 1.0]} c="#8E1F2A" />
      <Blok p={[-1.9, 1.9, -2.05]} s={[1.2, 2.0, 0.2]} c="#B8912F" metal={0.5} rough={0.4} />
      <Figuur kleding={PAUS} haar="grijs" hoofddeksel="kap" position={[-1.9, 0.5, -1.45]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(0.9), wenk: -0.3 }} />
      <Figuur kleding={NAPOLEON_KROONMANTEL} hoofddeksel={f > 95 ? 'krans' : null} position={[0.2, 0, 0]} rotation={[0, -0.1, 0]} pose={{ armL: omhoog(), armR: omhoog(), mond: 'dicht', hoofd: [-0.1, 0, 0] }} />
      {f <= 95 && <Kroon position={[0.2, kroonY, 0.02]} />}
    </Scène>
  );
};

/* ---------- 10-11: Austerlitz, de scheiding ---------- */

const S10 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const zon = ease(f, 0, 90, 0.2, 1);
  return (
    <Scène
      focus={[0, 3.0, 0]}
      scherpte={2.5}
      mist={['#D9D2C2', lin(f, 0, 100, 6, 30), lin(f, 0, 100, 40, 140)]}
      teller={{ label: 'Emperors', waarde: f > 70 ? '2 beaten' : '2', pil: 'Austerlitz, 1805' }}
      tekst={[{ t: 'two emperors fight you. both ' }, { t: 'lose', accent: true }]}
    >
      <Lucht boven="#8FB0CC" horizon="#F2E2C0" />
      <Zon position={[30, 20, -120]} grootte={14} kleur="#FFE08A" />
      <Camera pos={[ease(f, 0, 120, 5.6, 4.6), ease(f, 0, 120, 3.4, 3.2), ease(f, 0, 120, 7.6, 6.4)]} kijk={[0, 3.0, -1.5]} fov={36} />
      <Daglicht zon={[20, 16, -10]} kracht={0.8 + zon * 1.5} />
      <Grond kleur="#8E9A62" />
      <Heuvels kleur="#7A8A5A" z={-50} />
      <Leger tijd="1800" rijen={3} kolommen={8} kleur="#E9E4D8" position={[-8, -0.5, -18]} rotation={[0, 0.2, 0]} t={t} />
      <Leger tijd="1800" rijen={3} kolommen={8} kleur="#2F4A33" position={[8, -0.5, -22]} rotation={[0, -0.2, 0]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.0, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} pose={{ armR: wijs(1.45), hoofd: [0, -0.7, 0] }} inHand={<Verrekijker />} />} />
    </Scène>
  );
};

const S11 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.1, 0]}
      scherpte={4.5}
      mist={['#241A14', 6, 22]}
      teller={{ label: 'Year', waarde: '1809', pil: 'no heir' }}
      tekst={[{ t: 'Joséphine gives you no son. you end the ' }, { t: 'marriage', accent: true }]}
    >
      <Lucht boven="#1E1610" horizon="#3A2A1E" />
      <Camera pos={[1.6, 2.5, ease(f, 0, 120, 7.4, 6.4)]} kijk={[0, 2.2, 0]} fov={32} />
      <Binnenlicht zon={[4, 6, 6]} kleur="#FFB870" />
      <pointLight position={[-1.5, 2.2, 1.5]} intensity={5} distance={7} color="#FFA050" />
      <Grond kleur="#4A3426" />
      <Blok p={[0, 3, -2.4]} s={[8, 6, 0.3]} c="#5A3E2E" />
      <Figuur {...NAP} position={[0.7, 0, -0.3]} rotation={[0, -0.25, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.35, 0, 0], wenk: -0.4 }} />
      <Figuur kleding={JOSEPHINE} haar="bob" hoofddeksel="hoofdband" position={[-0.6, 0, 0.4]} rotation={[0, 0.9, 0]} pose={{ armL: wijs(1.0), armR: wijs(1.1), wenk: -1, traan: lin(f, 25, 110, 0, 1), mond: 'open' }} />
    </Scène>
  );
};

/* ---------- 12-14: Rusland ---------- */

const S12 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, 0, -3);
  return (
    <Scène
      focus={[0, 2.4, z]}
      scherpte={2}
      mist={['#C8CEC4', 25, 120]}
      teller={{ label: 'Army', waarde: getal(ease(f, 5, 90, 0, 600000)), pil: 'about, 1812' }}
      tekst={[{ t: 'you invade Russia with about 600,000 ' }, { t: 'men', accent: true }]}
    >
      <Lucht boven="#9EB6CC" horizon="#E2E4D6" />
      <Camera pos={[ease(f, 0, 120, 5.0, 4.0), ease(f, 0, 120, 5.0, 4.2), z - ease(f, 0, 120, 13, 11)]} kijk={[0, 2.9, z]} fov={36} />
      <Daglicht zon={[10, 14, 10]} />
      <Grond kleur="#9AA06A" />
      <Bos n={50} straal={60} vrij={16} />
      {[-4, 4].map((x) =>
        [0, 1, 2].map((k) => <Leger key={`${x}${k}`} tijd="1800" rijen={5} kolommen={5} position={[x, 0, z + 2.5 + k * 8]} rotation={[0, Math.PI, 0]} t={t} />),
      )}
      <Paard position={[0, 0, z]} rotation={[0, 0, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} loopt ruiter={<Figuur {...NAP} />} />
    </Scène>
  );
};

const S13 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.0, 0]}
      scherpte={3}
      mist={['#2A1410', 15, 80]}
      teller={{ label: 'Moscow', waarde: 'empty', pil: 'September 1812' }}
      tekst={[{ t: 'you take Moscow. then the city ' }, { t: 'burns', accent: true }]}
    >
      <Lucht boven="#120C14" horizon="#8A3A1E" onder="#1A0E0A" />
      <Camera pos={[ease(f, 0, 120, 4.2, 3.4), ease(f, 0, 120, 2.8, 2.6), ease(f, 0, 120, 10.0, 8.6)]} kijk={[-0.4, 2.6, -6]} fov={38} />
      <Nachtlicht />
      <hemisphereLight args={['#FF8A4A', '#1A0E0A', 0.5]} />
      <Grond kleur="#2A1E18" />
      <Koepelkerk position={[-6, 0, -22]} h={8} koepel="#C9A646" />
      <Koepelkerk position={[1, 0, -26]} h={10} koepel="#3E7A5A" />
      <Koepelkerk position={[8, 0, -20]} h={7} koepel="#2F5A9A" />
      {[-11, -3, 4, 11].map((x, i) => <Blok key={i} p={[x, 2, -16 - (i % 2) * 3]} s={[4, 4, 3]} c="#5A4436" />)}
      {[[-11, -16], [-3, -16], [4, -19], [11, -16], [-7, -22], [7, -24]].map(([x, z], i) => (
        <Vuur key={i} position={[x, 4, z]} t={t + i} grootte={1.1 + (i % 3) * 0.25} />
      ))}
      <Figuur {...NAP} position={[0.4, 0, 0]} rotation={[0, Math.PI - 0.35, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Scène>
  );
};

const S14 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, 0, 1.4);
  return (
    <Scène
      focus={[0, 2.1, z]}
      scherpte={3}
      mist={['#B8C0CA', 8, 45]}
      teller={{ label: 'Men left', waarde: getal(ease(f, 5, 100, 600000, 100000)), pil: 'estimates vary' }}
      tekst={[{ t: 'winter comes. most of them never get ' }, { t: 'home', accent: true }]}
    >
      <Lucht boven="#7E8A98" horizon="#C8CED6" />
      <Camera pos={[ease(f, 0, 120, 2.4, 1.8), 2.6, z + ease(f, 0, 120, 7.0, 6.0)]} kijk={[0, 2.4, z]} fov={34} />
      <Daglicht zon={[-6, 10, 6]} kleur="#DDE4EE" kracht={1.0} omgeving={1.0} />
      <Grond kleur="#E6EAEE" />
      {[-2.2, -1.1, 1.2, 2.3, -1.7, 0.6, 1.8].map((x, i) => (
        <Soldaat key={i} tijd="1800" position={[x, 0, z - 1.4 - (i % 3) * 1.6]} rotation={[0.18, (i % 2 ? 0.15 : -0.2), 0]} t={t * 0.4} />
      ))}
      <Figuur {...NAP} position={[0, 0, z]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.3, 0, 0], wenk: -0.6 }} />
      <Neerslag t={t} n={170} midden={[0, 0, z + 1]} />
    </Scène>
  );
};

/* ---------- 15-17: Elba, Laffrey, Waterloo ---------- */

const S15 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 1.6, 0]}
      scherpte={2.5}
      mist={['#E2E4DA', 30, 140]}
      teller={{ label: 'Year', waarde: '1814', pil: 'exiled to Elba' }}
      tekst={[{ t: 'they send you to a small ' }, { t: 'island', accent: true }]}
    >
      <Lucht boven="#7FAED8" horizon="#EBE2CC" />
      <Camera pos={[ease(f, 0, 140, 8, 6.2), ease(f, 0, 140, 4.6, 3.4), ease(f, 0, 140, 12, 9)]} kijk={[0, 1.4, 0]} fov={34} />
      <Daglicht zon={[10, 14, 8]} />
      <Zee t={t} />
      <Rots position={[0, -1.4, -0.6]} schaal={[4.2, 1.6, 3.4]} kleur="#A8946E" />
      <Rots position={[-2.6, -0.8, -2.2]} schaal={[2, 2, 2]} kleur="#8E7C5E" />
      <Blok p={[-1.4, 1.1, -2.2]} s={[1.4, 1.2, 1.4]} c="#5D7A3E" />
      <Schuim punten={[[3.6, 0, 1], [-3.8, 0, 1.4], [2, 0, 2.8], [-1.5, 0, 2.9], [4, 0, -1.5]]} t={t} />
      <Figuur {...NAP} position={[0.4, 0.05, 0.4]} rotation={[0, 0.6, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Scène>
  );
};

const S16 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const om = f > 62;
  return (
    <Scène
      focus={[0, 2.0, -1.6]}
      scherpte={3}
      mist={['#C9C6B4', 12, 60]}
      teller={{ label: 'Year', waarde: '1815', pil: 'back from Elba' }}
      tekst={[{ t: 'the soldiers sent to stop you join ' }, { t: 'you', accent: true }]}
    >
      <Lucht boven="#A6B8C8" horizon="#E2DDC8" />
      <Camera pos={[ease(f, 0, 120, 3.6, 3.0), 2.9, ease(f, 0, 120, 8.4, 7.4)]} kijk={[-0.4, 2.2, -3.6]} fov={36} />
      <Daglicht zon={[-6, 12, 8]} />
      <Grond kleur="#8E9A62" />
      <Blok p={[0, 0.02, -2]} s={[5, 0.04, 40]} c="#B5A88C" rough={1} />
      <Heuvels kleur="#7E8A6A" z={-50} />
      <Leger tijd="1800" rijen={2} kolommen={6} position={[0, 0, -6]} t={t} geweerOmhoog={!om} zwaai={om} />
      <Figuur
        {...NAP}
        position={[0, 0, ease(f, 0, 60, 0.8, -0.8)]}
        rotation={[0, Math.PI, 0]}
        pose={{ armL: { schouder: [-0.3, 0, ease(f, 20, 40, 0.1, 1.1)], elleboog: [0, -0.1] }, armR: { schouder: [-0.3, 0, ease(f, 20, 40, -0.1, -1.1)], elleboog: [0, -0.1] } }}
      />
    </Scène>
  );
};

const S17 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.9, 0]}
      scherpte={3}
      mist={['#7E827E', 10, 60]}
      teller={{ label: 'Date', waarde: '18 June', pil: 'Waterloo, 1815' }}
      tekst={[{ t: 'a few months later, it all ends at ' }, { t: 'Waterloo', accent: true }]}
    >
      <Lucht boven="#5A6068" horizon="#9A9C98" />
      <Camera pos={[ease(f, 0, 120, 4.0, 3.2), ease(f, 0, 120, 3.0, 3.2), ease(f, 0, 120, 10.5, 9.2)]} kijk={[0, 2.8, 0]} fov={36} />
      <Daglicht zon={[-6, 12, 6]} kleur="#C8CCD0" kracht={1.0} omgeving={0.9} />
      <Grond kleur="#5A4E3A" />
      <Leger tijd="1800" rijen={3} kolommen={10} kleur="#B0262B" position={[0, 0, -16]} t={t} />
      <Rook position={[-16, 0, -34]} t={t} kleur="#8A8682" />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} pose={{ hoofd: [0.2, -0.8, 0], wenk: -0.7 }} />} />
      <Neerslag t={t} n={160} regen midden={[0, 0, 2]} />
    </Scène>
  );
};

/* ---------- 18-19: Sint-Helena en de erfenis ---------- */

const S18 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 1.9, 0]}
      scherpte={2.5}
      mist={['#A8B0B4', 20, 120]}
      teller={{ label: 'Age', waarde: '51', pil: 'Saint Helena, 1821' }}
      tekst={[{ t: 'you die on a rock in the middle of the ' }, { t: 'ocean', accent: true }]}
    >
      <Lucht boven="#7A8A98" horizon="#C6CCCE" />
      <Camera pos={[ease(f, 0, 120, 6.5, 5.0), ease(f, 0, 120, 2.0, 2.3), ease(f, 0, 120, 9.0, 7.4)]} kijk={[0, 2.2, 0]} fov={34} />
      <Daglicht zon={[-8, 10, 6]} kleur="#E6E8EA" kracht={1.2} />
      <group position={[0, -6, 0]}>
        <Zee t={t} kleur="#355E7A" />
      </group>
      <Blok p={[0, -3, -1]} s={[7, 6, 7]} c="#5E5246" rough={1} />
      <Blok p={[0, 0.02, -1]} s={[6.6, 0.06, 6.6]} c="#6E7A4E" rough={1} />
      <Rots position={[3.6, -3, 2.4]} schaal={[1.6, 3, 1.6]} kleur="#54493E" />
      <Rots position={[-14, -5, -30]} schaal={[6, 6, 5]} kleur="#6A6058" />
      <Figuur {...NAP} position={[0.2, 0.05, 0.6]} rotation={[0, 0.55, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.2, 0, 0], wenk: -0.5 }} />
    </Scène>
  );
};

const S19 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 3.6, 0]}
      scherpte={2}
      mist={['#E8DCC4', 20, 90]}
      teller={{ label: 'Since 1804', waarde: 'Civil Code', pil: 'still French law' }}
      tekst={[{ t: 'they beat you. France still lives by your ' }, { t: 'laws', accent: true }]}
    >
      <Lucht boven="#7FAED8" horizon="#EFE3CC" />
      <Camera pos={[ease(f, 0, 120, 3.4, 2.6), ease(f, 0, 120, 1.8, 2.2), ease(f, 0, 120, 12.5, 11)]} kijk={[0, 4.1, 0]} fov={36} />
      <Daglicht zon={[6, 12, 8]} kracht={2.2} />
      <Grond kleur="#D6CAB2" />
      <Sokkel position={[0, 0, 0]} h={2.0}>
        <Figuur kleding={NAPOLEON} hoofddeksel="steek" o={BRONS} rotation={[0, 0.25, 0]} scale={1.2} pose={{ ...ARMEN_GEKRUIST }} />
      </Sokkel>
      <TekstVlak regels={['CODE', 'CIVIL']} b={1.2} h={0.9} achter="#7E6440" voor="#F1E4C4" position={[0, 1.1, 0.83]} fontPx={130} />
      {[-4, 4].map((x) => (
        <group key={x}>
          <Blok p={[x, 3.5, -5]} s={[0.7, 7, 0.7]} c="#EDE4D3" />
          <Blok p={[x, 7.1, -5]} s={[1.0, 0.3, 1.0]} c="#E3D8C3" />
        </group>
      ))}
      <Blok p={[0, 4, -8]} s={[14, 8, 0.6]} c="#E9DFCC" />
    </Scène>
  );
};

/* ---------- montage ---------- */

const SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19];
const DUUR = [140, 115, 120, 110, 115, 130, 110, 125, 120, 115, 115, 120, 115, 120, 110, 120, 115, 120, 210];
const STARTS = DUUR.map((_, i) => DUUR.slice(0, i).reduce((x, y) => x + y, 0));
export const NAPOLEON_DUUR = DUUR.reduce((a, b) => a + b, 0);
const AFSLUITER_VANAF = NAPOLEON_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const KLANKEN: Klank[] = [
  { s: 0, src: 'zee', vol: 0.14, lus: true },
  { s: 0, src: 'wind', vol: 0.06, lus: true },
  { s: 1, src: 'menigte', vol: 0.05, lus: true },
  { s: 2, src: 'vuur', vol: 0.08, lus: true },
  { s: 2, bij: 18, src: 'inslag', vol: 0.18 },
  { s: 2, bij: 62, src: 'inslag', vol: 0.16 },
  { s: 3, src: 'vuur', vol: 0.05, lus: true },
  { s: 3, bij: 10, src: 'glans', vol: 0.1 },
  { s: 4, src: 'rivier', vol: 0.08, lus: true },
  { s: 4, src: 'menigte', vol: 0.12, lus: true },
  { s: 5, src: 'wind', vol: 0.08, lus: true },
  { s: 6, src: 'menigte', vol: 0.07, lus: true },
  { s: 6, bij: 12, src: 'tik', vol: 0.25 },
  { s: 7, src: 'wind', vol: 0.12, lus: true },
  { s: 8, src: 'menigte', vol: 0.06, lus: true },
  { s: 8, bij: 95, src: 'glans', vol: 0.16 },
  { s: 9, src: 'wind', vol: 0.07, lus: true },
  { s: 9, bij: 70, src: 'inslag', vol: 0.12 },
  { s: 10, src: 'vuur', vol: 0.05, lus: true },
  { s: 10, bij: 30, src: 'val', vol: 0.12 },
  { s: 11, src: 'wind', vol: 0.07, lus: true },
  ...[20, 40, 60, 80, 100].map((bij) => ({ s: 11, bij, src: 'tik', vol: 0.12 })),
  { s: 12, src: 'vuur', vol: 0.16, lus: true },
  { s: 13, src: 'wind', vol: 0.16, lus: true },
  { s: 14, src: 'zee', vol: 0.14, lus: true },
  { s: 15, src: 'wind', vol: 0.05, lus: true },
  { s: 15, bij: 62, src: 'menigte', vol: 0.16, lus: false },
  { s: 16, src: 'rivier', vol: 0.12, lus: true },
  { s: 16, bij: 20, src: 'inslag', vol: 0.12 },
  { s: 17, src: 'zee', vol: 0.12, lus: true },
  { s: 17, src: 'wind', vol: 0.08, lus: true },
  { s: 18, bij: 6, src: 'glans', vol: 0.12 },
];

export const WatAlsNapoleon = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
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
    {STARTS.slice(1).map((st, i) => (
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
        volume={(fr) => interpolate(fr, [0, 10, NAPOLEON_DUUR - 45, NAPOLEON_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
);
