import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avondlicht, Berg, Binnenlicht, Camera, Daglicht, Fakkel, Grond, Lucht, Nachtlicht, Neerslag, Paard, Rivier, Rook, Scherpte, Vuur, Zon } from './Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs, type Kleding, type V3 } from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';
import { Eskadron, Joert, MiniRuiter, MongoolHelm, Sabel } from '../lang/BaibarsKit';

/**
 * "What if you were Barsbek?" — 14 scènes, onder de 58 s. Fanverzoek onder de Napoleon-short (2026-11-23).
 * Barsbek (Bars Beg) is vooral bekend uit de Orkhon-inscripties (Kül Tegin 732, Tonyukuk ca. 726) en het Nieuwe Boek
 * van Tang; zijn geboortejaar en leeftijd zijn onbekend, dus geen leeftijdsteller. Hij draagt overal de witte vilten
 * kalpak met zwarte rand en de rode kaftan met gouden rand (kalpak = herkenningsteken voor het Kirgizische publiek,
 * geen bewezen 8e-eeuwse dracht; zie post). Geen dood in beeld: de val is de banier en de muts in de sneeuw.
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

export const BARSBEK: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#A8322B', rand: '#D8A945', benen: '#4A3424', schoenen: '#2A1E16', laarzen: '#3A2A1C', riem: '#D8A945' };
const KIRGIZ = ['#A8322B', '#3E6B8A', '#6B5A3A', '#8A2A24'];
const TURK: Kleding = { huid: '#C28C60', haar: '#1A1210', tuniek: '#5A4A30', borst: '#8D8A84', benen: '#4A3424', schoenen: '#2A1E16', laarzen: '#2A1E16', riem: '#C9A646' };
const TURK_EDEL: Kleding = { huid: '#C28C60', haar: '#1A1210', tuniek: '#2E5A4A', rok: '#2E5A4A', schoenen: '#2A1E16', cape: '#C9A646', riem: '#C9A646' };
const PRINSES: Kleding = { huid: '#D0A07A', haar: '#1A1210', tuniek: '#2E6A6A', rok: '#2E6A6A', schoenen: '#3A2A1C', cape: '#C9A646', riem: '#C9A646' };
const TANG_KEIZER: Kleding = { huid: '#E2B48E', haar: '#1A1210', tuniek: '#D8A92E', rok: '#D8A92E', schoenen: '#2A1E16', riem: '#8A2A24' };
const TANG_AMBT: Kleding = { huid: '#E2B48E', haar: '#1A1210', tuniek: '#8A2A2A', rok: '#8A2A2A', schoenen: '#2A1E16', riem: '#2A1E16' };
const SMID: Kleding = { huid: '#B98257', haar: '#2A1E16', tuniek: '#6B5A3A', benen: '#4A3A2A', schoenen: '#3A2A1C', riem: '#3A2A1C' };
const KIRGIZ_BODE: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#3E6B8A', rand: '#D8A945', benen: '#4A3424', schoenen: '#2A1E16', riem: '#D8A945' };
const SNEEUW = '#E9EEF2';

/** Witte vilten kalpak met zwarte, aan de voorkant opgeslagen rand (hoofdgroep: bovenkant hoofd op y 0,68). */
export const Kalpak = () => (
  <>
    <Blok p={[0, 0.74, -0.01]} s={[0.76, 0.12, 0.7]} c="#151210" />
    <Blok p={[-0.2, 0.82, 0.3]} s={[0.26, 0.12, 0.04]} c="#151210" r={[0, 0, 0.25]} />
    <Blok p={[0.2, 0.82, 0.3]} s={[0.26, 0.12, 0.04]} c="#151210" r={[0, 0, -0.25]} />
    <Blok p={[0, 0.92, -0.02]} s={[0.62, 0.24, 0.58]} c="#F2EEE6" rough={1} />
    <Blok p={[0, 1.1, -0.03]} s={[0.48, 0.2, 0.46]} c="#F2EEE6" rough={1} />
    <Blok p={[0, 1.25, -0.04]} s={[0.32, 0.14, 0.32]} c="#F2EEE6" rough={1} />
    <Blok p={[0, 0.98, 0.27]} s={[0.04, 0.3, 0.02]} c="#151210" />
    <Blok p={[0, 1.34, -0.04]} s={[0.1, 0.08, 0.1]} c="#151210" />
  </>
);

/** Tang-ambtenarenmuts (futou) met de twee vleugels naar achteren. */
const Futou = () => (
  <>
    <Blok p={[0, 0.78, -0.03]} s={[0.66, 0.24, 0.6]} c="#151210" />
    <Blok p={[0, 0.98, -0.12]} s={[0.36, 0.2, 0.32]} c="#151210" />
    {[-1, 1].map((k) => <Blok key={k} p={[k * 0.48, 0.86, -0.3]} s={[0.4, 0.05, 0.1]} c="#151210" r={[0, k * -0.2, 0]} />)}
  </>
);

/** Hoge prinsessenhoed met gouden band. */
const Prinsessenhoed = () => (
  <>
    <Blok p={[0, 0.76, -0.02]} s={[0.66, 0.12, 0.62]} c="#C9A646" metal={0.5} rough={0.35} />
    <Blok p={[0, 1.0, -0.04]} s={[0.46, 0.4, 0.42]} c="#7A2A3A" />
    <Blok p={[0, 1.24, -0.04]} s={[0.12, 0.12, 0.12]} c="#E0B04E" metal={0.6} rough={0.3} />
  </>
);

const BB = { kleding: BARSBEK, snor: true, baard: true, hoofdExtra: <Kalpak />, levend: true };

/** Rode vlag met een gouden zon (rechtop, doek naar +x). */
const ZonVaandel = ({ position, t = 0, h = 4.4 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.1, h, 0.1]} c="#5A3B24" />
    <group position={[1.0, h - 1.05, 0.04]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      <Blok p={[0, 0, 0]} s={[1.9, 1.9, 0.04]} c="#B3241E" />
      <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.03, 20]} />
        <meshStandardMaterial color="#F2C232" roughness={0.6} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <Blok key={i} p={[Math.cos((i / 12) * Math.PI * 2) * 0.62, Math.sin((i / 12) * Math.PI * 2) * 0.62, 0.04]} s={[0.22, 0.07, 0.02]} r={[0, 0, (i / 12) * Math.PI * 2]} c="#F2C232" />
      ))}
    </group>
    <Blok p={[0, h + 0.1, 0]} s={[0.2, 0.25, 0.2]} c="#C9A646" metal={0.7} rough={0.3} />
  </group>
);

/** Spar: drie gestapelde kegels. */
const Spar = ({ position, schaal = 1, sneeuw = false }: { position: V3; schaal?: number; sneeuw?: boolean }) => (
  <group position={position} scale={schaal}>
    <Blok p={[0, 0.5, 0]} s={[0.3, 1.0, 0.3]} c="#4A3424" />
    {[0, 1, 2].map((i) => (
      <mesh key={i} position={[0, 1.4 + i * 1.0, 0]} castShadow>
        <coneGeometry args={[1.3 - i * 0.35, 1.6, 7]} />
        <meshStandardMaterial color={sneeuw && i === 2 ? '#DDE4E8' : ['#2E4A32', '#365A3A', '#2A4430'][i]} roughness={1} flatShading />
      </mesh>
    ))}
  </group>
);

const Taiga = ({ n = 40, x0 = -30, x1 = 30, z0 = -30, z1 = -8, sneeuw = false, zaad = 1 }: { n?: number; x0?: number; x1?: number; z0?: number; z1?: number; sneeuw?: boolean; zaad?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const x = x0 + (((i * 7.31 + zaad * 3.1) % 1) + (i * 0.618) % 1) * 0.5 * (x1 - x0);
      const z = z0 + ((i * 0.381 + zaad * 0.17) % 1) * (z1 - z0);
      return <Spar key={i} position={[x, 0, z]} schaal={0.9 + ((i * 3) % 5) * 0.15} sneeuw={sneeuw} />;
    })}
  </>
);

const Sajan = ({ z = -70, sneeuw = false }: { z?: number; sneeuw?: boolean }) => (
  <>
    {[-60, -35, -12, 10, 32, 58].map((x, i) => (
      <Berg key={x} position={[x, 0, z - (i % 2) * 14]} h={22 + (i % 3) * 7} r={15 + (i % 2) * 4} kleur={sneeuw ? '#B9C2CC' : '#6E7468'} />
    ))}
  </>
);

/** Gedenksteen met kolommen runentekens (Orkhon-schrift, gestileerd). */
const Gedenksteen = ({ position, rotation }: { position: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.3, 0]} s={[2.4, 0.6, 1.6]} c="#8A8478" rough={1} />
    <Blok p={[0, 2.9, 0]} s={[1.5, 4.6, 0.5]} c="#A8A294" rough={1} />
    <Blok p={[0, 5.45, 0]} s={[1.7, 0.6, 0.6]} c="#9A9486" rough={1} />
    {Array.from({ length: 6 }, (_, k) =>
      Array.from({ length: 11 }, (_, r) => (
        <Blok key={`${k}-${r}`} p={[-0.55 + k * 0.22, 4.7 - r * 0.36, 0.27]} s={[0.07, ((k * 3 + r * 5) % 3) * 0.06 + 0.1, 0.02]} r={[0, 0, ((k + r) % 3 - 1) * 0.5]} c="#4A463E" />
      )),
    )}
  </group>
);

/** Aambeeld met gloeiend ijzer en vonken. */
const Smidse = ({ position, t = 0, slag = 0 }: { position: V3; t?: number; slag?: number }) => (
  <group position={position}>
    <Blok p={[0, 0.35, 0]} s={[0.5, 0.7, 0.5]} c="#5A3B24" />
    <Blok p={[0, 0.82, 0]} s={[0.9, 0.24, 0.42]} c="#3A3C42" metal={0.6} rough={0.4} />
    <Blok p={[0.15, 0.98, 0]} s={[0.7, 0.07, 0.1]} c="#FF8A2A" emissive="#FF6A1A" />
    {slag > 0.6 &&
      Array.from({ length: 8 }, (_, i) => (
        <Blok key={i} p={[0.15 + Math.cos(i * 0.8) * (slag - 0.6) * 2, 1.0 + Math.sin(i * 1.3 + 1) * (slag - 0.6) * 1.6, Math.sin(i * 2.1) * (slag - 0.6)]} s={[0.04, 0.04, 0.04]} c="#FFD27A" emissive="#FFB347" />
      ))}
    <Vuur position={[-1.6, 0, -0.4]} t={t} grootte={0.6} />
    <pointLight position={[0.2, 1.4, 0.4]} intensity={4} distance={5} color="#FF9A45" />
  </group>
);

const Tanghal = () => (
  <>
    <Grond kleur="#5A3A2A" />
    <Blok p={[0, 3.5, -4]} s={[16, 7, 0.3]} c="#E2D2B4" rough={0.95} />
    {[-5, -2.4, 2.4, 5].map((x) => <Blok key={x} p={[x, 3, -2]} s={[0.5, 6, 0.5]} c="#9E2A24" />)}
    <Blok p={[0, 6.2, -2]} s={[14, 0.4, 1]} c="#2E5A4A" />
    <Blok p={[0, 0.2, -2.6]} s={[4, 0.4, 2.2]} c="#B8912F" metal={0.3} rough={0.5} />
    <Blok p={[0, 1.0, -3.2]} s={[1.8, 1.4, 0.4]} c="#7A1620" />
    <Blok p={[0, 0.02, 1]} s={[2.4, 0.04, 6]} c="#8E1F25" rough={1} />
  </>
);

/** Turkse krijger te voet die zijn paard door de sneeuw leidt. */
const SneeuwMars = ({ t = 0, n = 7, z0 = 0 }: { t?: number; n?: number; z0?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const z = z0 - i * 3.2;
      const x = Math.sin(i * 0.9) * 1.4;
      const schom = Math.sin(t * 4 + i) * 0.06;
      return (
        <group key={i} position={[x, -0.55, z]}>
          <Figuur kleding={TURK} hoofdExtra={<MongoolHelm />} position={[0, 0, 0]} rotation={[0.28 + schom, 0, 0]} pose={{ armL: { schouder: [-0.6, 0, 0.2] } }} />
          <Paard position={[0.9, 0, -1.6]} rotation={[0, Math.PI, 0]} kleur={['#6B4A30', '#3A2A20', '#8A6A44'][i % 3]} t={t + i} />
        </group>
      );
    })}
  </>
);

const WIT_PAARD = { kleur: '#ECE6DA', manen: '#5A4030', dek: '#B3241E' };

/* ================= scènes ================= */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 3.2, 0]} scherpte={2.5} mist={['#F0C890', 30, 170]} teller={{ label: 'Title', waarde: 'Khagan', pil: 'Yenisei Kyrgyz, c. 700' }} tekst={[{ t: 'What if you were ' }, { t: 'Barsbek', accent: true }, { t: '?' }]}>
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[-30, 12, -140]} grootte={13} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 140, 6.5, 4.6), ease(f, 0, 140, 2.4, 2.8), ease(f, 0, 140, 12, 10)]} kijk={[0, 3.3, 0]} fov={34} />
      <Daglicht zon={[-12, 10, 6]} kleur="#FFD8A0" />
      <Grond kleur="#B8A46A" />
      <Sajan z={-90} sneeuw />
      <Taiga n={30} z0={-60} z1={-30} />
      <Eskadron rijen={3} kolommen={9} position={[-6, 0, -9]} soort="mongool" kleuren={KIRGIZ} t={t} />
      <ZonVaandel position={[-3.6, 0, -2.2]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.55, 0]} {...WIT_PAARD} t={t} ruiter={<Figuur {...BB} pose={{ hoofd: [0, 0.3, 0], armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, wenk: 0.6, mond: 'open' }} inHand={<Sabel />} />} />
    </Scène>
  );
};

const S2 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 1.6, 3]} scherpte={2.5} mist={['#DCE4D8', 25, 140]} teller={{ label: 'Land', waarde: 'Yenisei', pil: 'Southern Siberia' }} tekst={[{ t: 'you rule a forest people on the river ' }, { t: 'Yenisei', accent: true }]}>
      <Lucht boven="#7FA8D2" horizon="#EAF0E2" />
      <Camera pos={[ease(f, 0, 120, 4.5, 3.2), ease(f, 0, 120, 3.4, 3.0), ease(f, 0, 120, 13, 11.5)]} kijk={[0, 1.8, 0]} fov={36} />
      <Daglicht zon={[8, 14, 10]} />
      <Rivier t={t} breed={8} nacht={false} />
      <Sajan z={-80} />
      <Taiga n={36} z0={-50} z1={-12} />
      {[-7, -3.5, 4.5, 8].map((x, i) => <Joert key={x} position={[x, 0.3, 6.5 + (i % 2)]} rotation={[0, 0.3 * i, 0]} rook={i === 1} t={t} />)}
      <Figuur {...BB} position={[0.8, 0.3, 3.2]} rotation={[0, -0.7, 0]} pose={{ armL: { schouder: [-1.3, 0, 0.6], elleboog: [0, -0.1] }, hoofd: [0, 0.3, 0] }} />
      <Spar position={[-10, 0.3, 9]} />
    </Scène>
  );
};

const S3 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const fase = (f % 24) / 24;
  const slag = fase;
  const arm = fase < 0.6 ? -2.6 + fase * 1.6 : -1.6 - (fase - 0.6) * 2.5;
  return (
    <Scène focus={[0, 1.4, 0]} scherpte={3.5} mist={['#2A1E16', 10, 40]} teller={{ label: 'Iron', waarde: 'Razor-sharp', pil: 'New Book of Tang' }} tekst={[{ t: 'your smiths forge iron even the Turks take as ' }, { t: 'tribute', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 2.6, 1.8), ease(f, 0, 120, 2.4, 2.2), ease(f, 0, 120, 8.4, 7.4)]} kijk={[-0.3, 1.5, 0]} fov={36} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFC890" />
      <Grond kleur="#4A3A2A" />
      <Blok p={[0, 3, -3]} s={[14, 6, 0.3]} c="#5A4030" rough={1} />
      <Smidse position={[0, 0, 0]} t={t} slag={slag} />
      <Figuur kleding={SMID} position={[0.6, 0, -0.8]} rotation={[0, -0.35, 0]} pose={{ armR: { schouder: [arm, 0, -0.1], elleboog: [0, -0.2] } }} inHand={<Blok p={[0, 0.1, 0.25]} s={[0.25, 0.18, 0.4]} c="#3A3C42" metal={0.6} rough={0.4} />} />
      <Figuur {...BB} position={[-1.0, 0, 0.9]} rotation={[0, 0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.3 }} />
    </Scène>
  );
};

const S4 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2, 0]} scherpte={3} mist={['#E8D2A8', 25, 140]} teller={{ label: 'Title', waarde: 'Khagan', pil: 'granted by the Turks' }} tekst={[{ t: 'to keep you quiet, the Turks make you ' }, { t: 'khagan', accent: true }]}>
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 120, 1.0, 0.2), ease(f, 0, 120, 2.2, 2.6), ease(f, 0, 120, 10.5, 9.2)]} kijk={[0, 2.4, 0]} fov={34} />
      <Daglicht zon={[8, 12, 10]} />
      <Grond kleur="#A89A62" />
      <Sajan z={-80} />
      <Joert position={[0, 0, -6]} schaal={2.2} />
      <Blok p={[0, 0.1, 0]} s={[2.6, 0.2, 2.6]} c="#EDE4D2" rough={1} />
      <Blok p={[0, 0.21, 0]} s={[2.2, 0.02, 2.2]} c="#B3542A" rough={1} />
      <Figuur {...BB} position={[0, 0.22, 0]} pose={{ armR: { schouder: [0, 0, -1.3] }, armL: { schouder: [0, 0, 1.3] }, mond: 'lach' }} />
      {[-2.6, 2.6].map((x, i) => <Figuur key={x} kleding={TURK_EDEL} hoofdExtra={<MongoolHelm />} position={[x, 0, 1.2]} rotation={[0.35, i ? -0.9 : 0.9, 0]} />)}
      <ZonVaandel position={[-3.6, 0, -2]} t={t} />
    </Scène>
  );
};

const S5 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2, 0]} scherpte={3} mist={['#F0C890', 25, 140]} teller={{ label: 'Wife', waarde: 'Princess', pil: 'sister of Bilge' }} tekst={[{ t: 'and a Turkish princess as your ' }, { t: 'wife', accent: true }]}>
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[20, 8, -120]} grootte={12} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 120, 1.6, 0.8), ease(f, 0, 120, 2.6, 2.4), ease(f, 0, 120, 9.5, 8.4)]} kijk={[0, 2.3, 0]} fov={34} />
      <Daglicht zon={[-6, 10, 8]} kleur="#FFE0B0" />
      <Grond kleur="#A89A62" />
      <Joert position={[-6, 0, -9]} schaal={1.4} rook t={t} />
      <Joert position={[6, 0, -11]} schaal={1.4} />
      <ZonVaandel position={[-3.2, 0, -2.5]} t={t} />
      <Figuur {...BB} position={[-0.6, 0, 0]} rotation={[0, 0.35, 0]} pose={{ armL: { schouder: [-0.5, 0, 0.6], elleboog: [0, -0.3] }, mond: 'lach' }} />
      <Figuur kleding={PRINSES} haar="lang" hoofdExtra={<Prinsessenhoed />} levend position={[0.7, 0, 0.1]} rotation={[0, -0.35, 0]} />
      {[-3, -2, 2.4, 3.4].map((x, i) => <Figuur key={x} kleding={i < 2 ? KIRGIZ_BODE : TURK_EDEL} hoofdExtra={i < 2 ? <Kalpak /> : <MongoolHelm />} position={[x, 0, -3.5]} rotation={[0, x < 0 ? 0.5 : -0.5, 0]} pose={{ armR: omhoog() }} />)}
    </Scène>
  );
};

const S6 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 1.6, 0]} scherpte={3.5} mist={['#1A140E', 8, 30]} teller={{ label: 'Allies', waarde: 'China + Türgesh', pil: 'Tonyukuk stone' }} tekst={[{ t: 'but in secret, you plot with China against ' }, { t: 'them', accent: true }]}>
      <Lucht boven="#1A140E" horizon="#2A2016" />
      <Camera pos={[ease(f, 0, 120, 2.2, 1.4), ease(f, 0, 120, 3.4, 3.0), ease(f, 0, 120, 7.8, 6.8)]} kijk={[0, 1.4, 0]} fov={34} />
      <Nachtlicht />
      <Grond kleur="#3A2A1E" />
      <Blok p={[0, 2.5, -3]} s={[12, 5, 0.3]} c="#5A4030" rough={1} />
      <Blok p={[0, 0.5, 0]} s={[1.8, 0.1, 1.2]} c="#6B4A2E" />
      <Blok p={[0, 0.25, 0]} s={[1.6, 0.4, 1.0]} c="#4A3424" />
      <Blok p={[0, 0.57, 0]} s={[1.2, 0.02, 0.8]} c="#D8C8A0" />
      <Vuur position={[0, 0.58, 0.1]} t={t} grootte={0.18} />
      <pointLight position={[0, 1.4, 0.6]} intensity={9} distance={7} color="#FFB060" />
      <Figuur {...BB} position={[0, 0, -1.1]} pose={{ armR: wijs(0.7), wenk: 0.6 }} />
      <Figuur kleding={TANG_AMBT} hoofdExtra={<Futou />} position={[1.4, 0, 0.2]} rotation={[0, -1.3, 0]} pose={{ armR: wijs(0.6) }} />
      <Figuur kleding={{ ...TURK_EDEL, tuniek: '#5A3A6E', rok: '#5A3A6E', cape: '#3A2A4A' }} hoofddeksel="tulband" position={[-1.4, 0, 0.2]} rotation={[0, 1.3, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.8, -1.6]} scherpte={3} mist={['#2A1E16', 12, 40]} teller={{ label: 'Emperor', waarde: 'Zhongzong', pil: 'Tang China, c. 708' }} tekst={[{ t: "China's emperor calls your people his " }, { t: 'kin', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, -2.4, -1.6), ease(f, 0, 120, 2.4, 2.7), ease(f, 0, 120, 9.4, 8.4)]} kijk={[0, 2.0, -1.6]} fov={34} />
      <Binnenlicht zon={[3, 8, 5]} kleur="#FFE0B0" />
      <pointLight position={[0, 3.5, 1]} intensity={6} distance={10} color="#FFC080" />
      <Tanghal />
      <Figuur kleding={TANG_KEIZER} hoofdExtra={<Futou />} baard position={[0, 0.4, -2.6]} pose={{ armR: { schouder: [-1.0, 0, -0.5], elleboog: [0, -0.2] }, armL: { schouder: [-1.0, 0, 0.5], elleboog: [0, -0.2] }, mond: 'lach' }} />
      {[-2.8, 2.8].map((x, i) => <Figuur key={x} kleding={TANG_AMBT} hoofdExtra={<Futou />} position={[x, 0, -0.4]} rotation={[0, i ? -1.0 : 1.0, 0]} />)}
      <Figuur kleding={KIRGIZ_BODE} hoofdExtra={<Kalpak />} snor position={[0.9, 0, 0.2]} rotation={[0.35, Math.PI + 0.5, 0]} />
    </Scène>
  );
};

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2, 0]} scherpte={2.5} mist={['#C8D2DC', 20, 160]} teller={{ label: 'Mountains', waarde: 'Kögmen', pil: 'the Sayan, in winter' }} tekst={[{ t: 'your mountains are buried in snow. no army can ' }, { t: 'cross', accent: true }]}>
      <Lucht boven="#8FA6C0" horizon="#E2E8EE" />
      <Camera pos={[ease(f, 0, 120, 3.2, 2.2), ease(f, 0, 120, 2.6, 3.2), ease(f, 0, 120, 8.5, 9.5)]} kijk={[0, 3.2, -10]} fov={36} />
      <Daglicht zon={[6, 12, 10]} kleur="#EAF0FF" kracht={1.6} />
      <Grond kleur={SNEEUW} />
      <Sajan z={-55} sneeuw />
      <Taiga n={30} z0={-40} z1={-10} sneeuw />
      <Neerslag t={t} n={160} breed={16} midden={[0, 0, 2]} />
      <Figuur {...BB} position={[0.6, 0, 0]} rotation={[0, Math.PI - 0.9, 0]} pose={{ ...ARMEN_GEKRUIST }} />
      <Joert position={[-4, 0, -2]} rook t={t} />
    </Scène>
  );
};

const S9 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, 0, 3);
  return (
    <Scène focus={[0, 1.4, z - 2]} scherpte={2.5} mist={['#B8C2CE', 12, 70]} teller={{ label: 'Snow', waarde: 'spear-deep', pil: 'winter 710' }} tekst={[{ t: 'the Turks cross anyway, through snow a spear ' }, { t: 'deep', accent: true }]}>
      <Lucht boven="#7E8EA2" horizon="#D2DAE2" />
      <Camera pos={[ease(f, 0, 120, 5.5, 4.5), ease(f, 0, 120, 3.6, 3.2), z + 7]} kijk={[0, 1.2, z - 4]} fov={36} />
      <Daglicht zon={[6, 12, 6]} kleur="#E0E8F4" kracht={1.3} />
      <group rotation={[0.12, 0, 0]}>
        <Grond kleur={SNEEUW} />
        <SneeuwMars t={t} n={7} z0={z} />
        <Taiga n={20} x0={-24} x1={-6} z0={-30} z1={4} sneeuw zaad={3} />
        <Taiga n={20} x0={6} x1={24} z0={-30} z1={4} sneeuw zaad={5} />
      </group>
      <Neerslag t={t} n={200} breed={18} midden={[0, 0, z]} />
    </Scène>
  );
};

const S10 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, -26, -16);
  return (
    <Scène focus={[0, 1.5, -6]} scherpte={2.5} mist={['#141A2A', 12, 60]} teller={{ label: 'Attack', waarde: 'at night', pil: 'Sunga forest' }} tekst={[{ t: 'they fall on your camp while it ' }, { t: 'sleeps', accent: true }]}>
      <Lucht boven="#0B0F1E" horizon="#28304A" />
      <Camera pos={[ease(f, 0, 120, 4, 3), ease(f, 0, 120, 3.4, 3.0), ease(f, 0, 120, 10, 8.5)]} kijk={[0, 1.8, -8]} fov={36} />
      <Nachtlicht />
      <Grond kleur="#C2CCD8" />
      <Taiga n={30} z0={-40} z1={-20} sneeuw />
      {[-4, 0, 4].map((x, i) => <Joert key={x} position={[x, 0, -4 - (i % 2) * 2]} />)}
      <Fakkel position={[-1.8, 0, -1.5]} t={t} />
      <Vuur position={[2, 0, -1]} t={t} grootte={0.4} />
      <Eskadron rijen={2} kolommen={7} afstand={1.6} position={[0, 0, z]} soort="mongool" t={t} loopt kleuren={['#3A3A3A', '#4A3A2A', '#2E3A4A']} />
    </Scène>
  );
};

const S11 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2, 0]} scherpte={3} mist={['#3A3040', 10, 60]} teller={{ label: 'Battle', waarde: 'Sunga', pil: '711' }} tekst={[{ t: 'you fight in the snow to the ' }, { t: 'end', accent: true }]}>
      <Lucht boven="#4A3A4A" horizon="#B8A0A0" />
      <Camera pos={[ease(f, 0, 120, 2.6, 1.6), ease(f, 0, 120, 1.8, 2.2), ease(f, 0, 120, 7.4, 6.4)]} kijk={[0, 2.2, 0]} fov={34} />
      <Daglicht zon={[-6, 8, 8]} kleur="#F0D0C0" kracht={1.3} />
      <Grond kleur="#D2D8E0" />
      <Taiga n={24} z0={-30} z1={-10} sneeuw />
      <Rook position={[-6, 0, -12]} t={t} kleur="#6A6070" />
      <Neerslag t={t} n={140} breed={14} midden={[0, 0, 1]} />
      {[-4, 4, -6].map((x, i) => <MiniRuiter key={x} position={[x, 0, -5 - i * 2]} rotation={[0, x < 0 ? 0.6 : -0.6, 0]} soort="mongool" t={t + i} loopt kleur="#4A3A2A" />)}
      <Figuur {...BB} position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ armR: { schouder: [-0.25, 0, -0.35], elleboog: [0, -0.1] }, wenk: 0.9, mond: 'open' }} inHand={<Sabel />} />
    </Scène>
  );
};

const S12 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 0.2, 0.6]} scherpte={3} mist={['#5A6070', 8, 50]} teller={{ label: 'Kingdom', waarde: 'Fallen', pil: 'Kül Tegin stone' }} tekst={[{ t: 'your kingdom falls with ' }, { t: 'you', accent: true }]}>
      <Lucht boven="#5A6274" horizon="#A8B0BC" />
      <Camera pos={[ease(f, 0, 120, 0.6, 0.2), ease(f, 0, 120, 3.4, 2.8), ease(f, 0, 120, 7.5, 6.4)]} kijk={[0, 0.2, 0.4]} fov={36} />
      <Daglicht zon={[-4, 8, 6]} kleur="#D8E0EC" kracht={1.0} />
      <Grond kleur="#D8DEE6" />
      <Taiga n={20} z0={-30} z1={-8} sneeuw />
      <group position={[-1.2, 0.08, 1.6]} rotation={[-Math.PI / 2 + 0.04, 0, 0.35]}>
        <ZonVaandel position={[0, 0, 0]} t={0} h={3.2} />
      </group>
      <group position={[1.0, -0.6, 1.0]} rotation={[0.25, -0.4, 0.4]}>
        <Kalpak />
      </group>
      <Neerslag t={t} n={160} breed={10} midden={[0, 0, 0]} />
    </Scène>
  );
};

const S13 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 3, 0]} scherpte={2.5} mist={['#E8C890', 30, 160]} teller={{ label: 'Carved', waarde: '732', pil: 'Orkhon valley, Mongolia' }} tekst={[{ t: 'your enemies carve your name in ' }, { t: 'stone', accent: true }]}>
      <Lucht boven="#7FA8D2" horizon="#F2D8A8" />
      <Zon position={[-20, 8, -130]} grootte={12} kleur="#FFE0A0" />
      <Camera pos={[ease(f, 0, 120, 4.5, 3.0), ease(f, 0, 120, 1.6, 2.2), ease(f, 0, 120, 14, 12)]} kijk={[0, 3.0, 0]} fov={34} />
      <Daglicht zon={[-8, 10, 10]} kleur="#FFE0B0" />
      <Grond kleur="#B8A46A" />
      <Gedenksteen position={[0, 0, 0]} rotation={[0, 0.25, 0]} />
      <Taiga n={14} z0={-80} z1={-50} />
      {[-12, 14].map((x) => <Berg key={x} position={[x * 4, 0, -110]} h={18} r={22} kleur="#8A7A5A" />)}
    </Scène>
  );
};

const S14 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 3, 0]} scherpte={2.2} mist={['#E89A60', 30, 200]} teller={{ label: 'Year', waarde: '840', pil: 'Kyrgyz take the steppe' }} tekst={[{ t: '130 years later, your people rule the ' }, { t: 'steppe', accent: true }]}>
      <Lucht boven="#4E3159" horizon="#F5A05A" onder="#3A2216" />
      <Zon position={[10, 6, -150]} grootte={16} kleur="#FFC77A" />
      <Camera pos={[ease(f, 0, 200, 9, 7), ease(f, 0, 200, 4.4, 3.6), ease(f, 0, 200, 15, 12)]} kijk={[0, 2.6, -4]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.6]} />
      <Grond kleur="#9A7A4A" />
      <Sajan z={-100} />
      <Eskadron rijen={4} kolommen={10} afstand={1.5} position={[0, 0, lin(f, 0, 200, -2, 1)]} soort="mongool" kleuren={KIRGIZ} t={t} loopt />
      <ZonVaandel position={[-3, 0, 1.5]} t={t} />
      <ZonVaandel position={[4, 0, 0.5]} t={t + 1} />
    </Scène>
  );
};

/** Omslag: Barsbek te paard met geheven sabel, ten voeten uit midden in beeld, leger + vaandel + besneeuwde bergen in gouden licht. */
export const OmslagBarsbekScène = () => (
  <>
    <fog attach="fog" args={['#F0B878', 30, 170]} />
    <Lucht boven="#4E3A6A" horizon="#F4A35A" />
    <Zon position={[-4, 9, -140]} grootte={18} kleur="#FFD08A" />
    <Camera pos={[2.4, 2.6, 10.5]} kijk={[0, 2.9, 0]} fov={36} />
    <Daglicht zon={[-6, 8, 9]} kleur="#FFC890" kracht={2.3} />
    <Grond kleur="#C9A866" />
    <Sajan z={-95} sneeuw />
    <Taiga n={26} z0={-60} z1={-28} />
    <Eskadron rijen={3} kolommen={11} position={[0, 0, -8]} soort="mongool" kleuren={KIRGIZ} />
    <ZonVaandel position={[-4.2, 0, -3.4]} h={5} />
    <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.5, 0]} {...WIT_PAARD} ruiter={<Figuur kleding={BARSBEK} snor baard hoofdExtra={<Kalpak />} pose={{ hoofd: [0, 0.25, 0], armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, wenk: 0.6, mond: 'open' }} inHand={<Sabel />} />} />
  </>
);

/* ================= montage ================= */

const SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14];
const DUUR = [140, 115, 115, 115, 110, 115, 110, 115, 115, 115, 110, 110, 115, 210];
const STARTS = DUUR.map((_, i) => DUUR.slice(0, i).reduce((x, y) => x + y, 0));
export const BARSBEK_DUUR = DUUR.reduce((a, b) => a + b, 0);
if (BARSBEK_DUUR > MAX_SHORT_FRAMES) throw new Error(`BARSBEK_DUUR is ${BARSBEK_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = BARSBEK_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const KLANKEN: Klank[] = [
  { s: 0, src: 'wind', vol: 0.12, lus: true },
  { s: 0, bij: 4, src: 'inslag', vol: 0.2 },
  { s: 1, src: 'rivier', vol: 0.12, lus: true },
  { s: 2, src: 'vuur', vol: 0.08, lus: true },
  ...[24, 48, 72, 96].map((bij) => ({ s: 2, bij: bij - 10, src: 'tik', vol: 0.2 })),
  { s: 3, src: 'menigte', vol: 0.08, lus: true },
  { s: 3, bij: 20, src: 'glans', vol: 0.14 },
  { s: 4, src: 'menigte', vol: 0.08, lus: true },
  { s: 4, bij: 30, src: 'munt', vol: 0.14 },
  { s: 5, src: 'vuur', vol: 0.06, lus: true },
  { s: 5, bij: 50, src: 'val', vol: 0.1 },
  { s: 6, bij: 30, src: 'glans', vol: 0.12 },
  { s: 7, src: 'wind', vol: 0.14, lus: true },
  { s: 8, src: 'wind', vol: 0.16, lus: true },
  { s: 9, src: 'vuur', vol: 0.05, lus: true },
  { s: 9, bij: 40, src: 'val', vol: 0.14 },
  { s: 10, src: 'menigte', vol: 0.12, lus: true },
  ...[15, 65].map((bij) => ({ s: 10, bij, src: 'inslag', vol: 0.2 })),
  { s: 11, src: 'wind', vol: 0.12, lus: true },
  { s: 11, bij: 10, src: 'val', vol: 0.14 },
  { s: 12, src: 'wind', vol: 0.06, lus: true },
  { s: 12, bij: 20, src: 'glans', vol: 0.14 },
  { s: 13, src: 'menigte', vol: 0.12, lus: true },
  { s: 13, bij: 6, src: 'glans', vol: 0.12 },
];

export const WatAlsBarsbek = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
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
        volume={(fr) => interpolate(fr, [0, 10, BARSBEK_DUUR - 45, BARSBEK_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
);
