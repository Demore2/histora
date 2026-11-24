import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avondlicht, Bed, Binnenlicht, Boom, Camera, Daglicht, Galei, Grond, Leger, Lucht, Nachtlicht, Paard, Scherpte, TekstVlak, Zee, Zon } from './Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, Rol, wijs, Zwaard, type Kleding, type V3 } from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';
import { Stadsmuur } from './MehmedKit';

/**
 * "What if you were William of Orange?" — 14 scènes, onder de 58 s. Fanverzoek onder de Saladin-short (2026-11-23).
 * Willem draagt overal zijn zwarte wambuis met witte kraag, zwarte baret en oranje sjerp; zijn vlag is de
 * Prinsenvlag (oranje-wit-blauw). Geen moord in beeld: Delft is de muur met de kogelgaten en de gevallen baret.
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

const ORANJE = '#E8742A';
export const WILLEM: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#1E1A18', benen: '#1E1A18', schoenen: '#2A1E16', riem: ORANJE, cape: '#2A2420' };
const WILLEM_KIND: Kleding = { huid: '#E9C29E', haar: '#7A5636', tuniek: '#2E4A7A', benen: '#2A2A3A', schoenen: '#2A1E16', riem: ORANJE };
const KAREL: Kleding = { huid: '#E2B48E', haar: '#3A2A1E', tuniek: '#151210', rok: '#151210', schoenen: '#151210', cape: '#5A3A24', riem: '#D8A945' };
const HENDRIK: Kleding = { huid: '#E2B48E', haar: '#2A1E16', tuniek: '#2F4F9E', benen: '#2F4F9E', schoenen: '#2A1E16', laarzen: '#3A2A1C', riem: '#D8A945', cape: '#1E3A7A' };
const ALVA: Kleding = { huid: '#D8A880', haar: '#B9B4AA', tuniek: '#151210', borst: '#5A5C62', benen: '#151210', schoenen: '#151210', laarzen: '#151210', riem: '#B3241E' };
const ZOON: Kleding = { huid: '#E9C29E', haar: '#7A5636', tuniek: '#1E1A18', benen: '#1E1A18', schoenen: '#2A1E16', riem: ORANJE };
const BURGER: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#5A4A3A', rok: '#4A3A2E', schoenen: '#2A1E16', riem: '#E9DFC8' };
const ZANGER: Kleding = { huid: '#E2B48E', haar: '#A0703A', tuniek: '#7A2A24', benen: '#4A3A2A', schoenen: '#2A1E16', riem: '#E9DFC8' };
const CHARLOTTE: Kleding = { huid: '#EAC7A2', haar: '#6B4A30', tuniek: '#151210', rok: '#151210', schoenen: '#2A1E16', cape: '#E9DFC8' };

/** Witte molensteenkraag + zwarte baret (in de hoofdgroep; oorsprong = hals). */
export const Baret = ({ veer = false, kleur = '#151210' }: { veer?: boolean; kleur?: string }) => (
  <>
    <Blok p={[0, 0.76, -0.02]} s={[0.74, 0.1, 0.7]} c={kleur} />
    <Blok p={[0.05, 0.84, -0.05]} s={[0.6, 0.08, 0.56]} c={kleur} />
    {veer && <Blok p={[0.3, 0.98, -0.05]} s={[0.06, 0.3, 0.06]} r={[0, 0, -0.5]} c="#F2EEE6" />}
  </>
);
const Kraag = () => <Blok p={[0, 0.02, 0]} s={[0.78, 0.12, 0.62]} c="#F4F0E6" rough={0.95} />;
const HoofdW = ({ veer = false }: { veer?: boolean }) => (
  <>
    <Baret veer={veer} />
    <Kraag />
  </>
);

const WL = { kleding: WILLEM, baard: true, snor: true, hoofdExtra: <HoofdW />, levend: true };

/** Prinsenvlag: oranje-wit-blauw, doek naar +x. */
const Prinsenvlag = ({ position, t = 0, h = 4.6 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.1, h, 0.1]} c="#5A3B24" />
    <group position={[1.05, h - 0.9, 0.03]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      {[ORANJE, '#F4F0E6', '#2A4A9A'].map((c, i) => <Blok key={c} p={[0, 0.5 - i * 0.5, 0]} s={[2.0, 0.5, 0.04]} c={c} />)}
    </group>
  </group>
);

/** Molen: stenen romp, kap, vier draaiende wieken (naar +z). */
const Molen = ({ position, t = 0, schaal = 1 }: { position: V3; t?: number; schaal?: number }) => (
  <group position={position} scale={schaal}>
    <mesh position={[0, 2.6, 0]} castShadow>
      <cylinderGeometry args={[0.9, 1.4, 5.2, 8]} />
      <meshStandardMaterial color="#6A5A4A" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 5.5, 0]} castShadow>
      <coneGeometry args={[1.1, 1.2, 8]} />
      <meshStandardMaterial color="#3A3A3A" roughness={1} flatShading />
    </mesh>
    <group position={[0, 5.0, 1.1]} rotation={[0, 0, t * 0.8]}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
          <Blok p={[0, 1.9, 0]} s={[0.12, 3.8, 0.08]} c="#5A3B24" />
          <Blok p={[0.32, 2.2, 0]} s={[0.5, 3.0, 0.04]} c="#E9DFC8" />
        </group>
      ))}
    </group>
  </group>
);

/** Rij Hollandse trapgevelhuizen langs x, gevel naar +z. */
const Trapgevels = ({ position, n = 8, zaad = 1 }: { position: V3; n?: number; zaad?: number }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => {
      const h = 4 + ((i * 7 + zaad) % 3) * 0.8;
      const c = ['#8A3A2A', '#7A4A3A', '#9A5A40', '#6A3A2E', '#A0704A'][(i + zaad) % 5];
      const x = (i - (n - 1) / 2) * 2.6;
      return (
        <group key={i} position={[x, 0, 0]}>
          <Blok p={[0, h / 2, 0]} s={[2.5, h, 3]} c={c} rough={1} />
          {[0, 1, 2].map((s) => <Blok key={s} p={[0, h + 0.3 + s * 0.6, 1.2]} s={[2.1 - s * 0.7, 0.6, 0.6]} c={c} rough={1} />)}
          {[-0.6, 0.6].map((wx) => [1.2, 2.6].map((wy) => <Blok key={`${wx}${wy}`} p={[wx, wy, 1.52]} s={[0.55, 0.8, 0.04]} c="#E9DFC8" />))}
          <Blok p={[0, 0.7, 1.52]} s={[0.7, 1.4, 0.04]} c="#2E3A2A" />
        </group>
      );
    })}
  </group>
);

const Polder = ({ t = 0 }: { t?: number }) => (
  <>
    <Grond kleur="#7E9A4E" />
    {[-30, -12, 14, 34].map((x, i) => <Molen key={x} position={[x, 0, -40 - (i % 2) * 12]} t={t + i} schaal={1.4} />)}
    {[-40, -20, 0, 20, 40].map((x) => <Blok key={x} p={[x, 0.02, -20]} s={[0.4, 0.04, 60]} c="#4A7A9A" />)}
  </>
);

const Zaal = ({ kleur = '#D9C4A0' }: { kleur?: string }) => (
  <>
    <Grond kleur="#5A4030" />
    <Blok p={[0, 3, -3]} s={[16, 6, 0.3]} c={kleur} rough={0.95} />
    {[-4.5, 4.5].map((x) => <Blok key={x} p={[x, 2.6, -2.8]} s={[2.2, 3.2, 0.05]} c="#7A2A24" />)}
    <Blok p={[0, 0.02, 0.5]} s={[3.2, 0.04, 6]} c="#8E1F25" rough={1} />
  </>
);

const PAARD_W = { kleur: '#4A3424', manen: '#1A1310', dek: ORANJE };

/* ================= scènes ================= */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 3.2, 0]} scherpte={2.5} mist={['#F0C890', 30, 170]} teller={{ label: 'Title', waarde: 'Prince of Orange', pil: 'Father of the Fatherland' }} tekst={[{ t: 'What if you were ' }, { t: 'William of Orange', accent: true }, { t: '?' }]}>
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[-30, 12, -140]} grootte={13} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 140, 6.5, 4.6), ease(f, 0, 140, 2.4, 2.8), ease(f, 0, 140, 12, 10)]} kijk={[0, 3.3, 0]} fov={34} />
      <Daglicht zon={[-12, 10, 6]} kleur="#FFD8A0" />
      <Polder t={t} />
      <Leger rijen={3} kolommen={9} position={[-5, 0, -10]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Prinsenvlag position={[-3.6, 0, -2.2]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.55, 0]} {...PAARD_W} t={t} ruiter={<Figuur {...WL} pose={{ hoofd: [0, 0.3, 0], armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, wenk: 0.4 }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

const S2 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 1.4, 0]} scherpte={3.5} mist={['#2A1E16', 10, 40]} teller={{ label: 'Age', waarde: '11', pil: '1544' }} tekst={[{ t: 'at eleven, a cousin leaves you a whole ' }, { t: 'principality', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 1.6, 0.8), ease(f, 0, 120, 2.0, 1.8), ease(f, 0, 120, 7.4, 6.4)]} kijk={[0, 1.5, 0]} fov={34} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFDDB0" />
      <pointLight position={[0, 3, 2]} intensity={5} distance={9} color="#FFC080" />
      <Zaal />
      <Prinsenvlag position={[2.2, 0, -2.6]} h={3.8} />
      <Figuur kleding={WILLEM_KIND} hoofdExtra={<Baret />} scale={0.72} levend position={[0, 0, 0]} pose={{ armR: wijs(1.1), mond: 'open' }} inHand={<Rol />} />
      <Figuur kleding={KAREL} hoofdExtra={<HoofdW />} baard position={[-1.5, 0, -1.0]} rotation={[0, 0.6, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Scène>
  );
};

const S3 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 2, -1]} scherpte={3.5} mist={['#2A1E16', 10, 40]} teller={{ label: 'Age', waarde: '22', pil: 'Brussels, 1555' }} tekst={[{ t: 'the emperor leans on your shoulder as he gives up his ' }, { t: 'throne', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 1.2, 0.4), ease(f, 0, 120, 2.4, 2.2), ease(f, 0, 120, 8, 7)]} kijk={[0, 2.1, -1]} fov={34} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFDDB0" />
      <pointLight position={[0, 3.5, 1]} intensity={6} distance={10} color="#FFC080" />
      <Zaal />
      <Blok p={[0, 1.6, -2.7]} s={[1.4, 3.2, 0.2]} c="#B8912F" metal={0.5} rough={0.35} />
      <Figuur kleding={KAREL} hoofdExtra={<HoofdW />} baard position={[-0.4, 0, -1]} rotation={[0, 0.15, 0]} pose={{ armL: { schouder: [-0.25, 0, 1.65], elleboog: [0, 0.1] }, hoofd: [0.25, 0, 0] }} />
      <Figuur {...WL} position={[0.5, 0, -0.9]} rotation={[0, -0.1, 0]} />
      {[-3, 3].map((x, i) => <Figuur key={x} kleding={BURGER} hoofdExtra={<HoofdW />} position={[x, 0, 0.8]} rotation={[0, i ? -0.8 : 0.8, 0]} />)}
    </Scène>
  );
};

const S4 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2.8, 0]} scherpte={3} mist={['#9AAA7A', 15, 80]} teller={{ label: 'Nickname', waarde: 'the Silent', pil: 'the legend, 1559' }} tekst={[{ t: 'a French king tells you a secret plan. you say ' }, { t: 'nothing', accent: true }]}>
      <Lucht boven="#86AEDA" horizon="#DDE6C8" />
      <Camera pos={[ease(f, 0, 120, 2.6, 1.8), ease(f, 0, 120, 3.0, 2.9), ease(f, 0, 120, 13.5, 12.5)]} kijk={[0, 2.9, 0]} fov={34} />
      <Daglicht zon={[6, 12, 8]} />
      <Grond kleur="#6E8A42" />
      {Array.from({ length: 22 }, (_, i) => <Boom key={i} position={[-22 + i * 2.1, 0, -8 - (i % 3) * 4]} schaal={1.3 + (i % 4) * 0.2} kleur={['#4E7A3A', '#5D8A40', '#3F6A32'][i % 3]} />)}
      <Paard position={[-1.3, 0, 0]} rotation={[0, Math.PI - 0.9, 0]} kleur="#ECE6DA" manen="#8A7A6A" dek="#2F4F9E" t={t} ruiter={<Figuur kleding={HENDRIK} hoofdExtra={<Baret veer />} baard levend pose={{ armR: wijs(0.8), mond: 'open', hoofd: [0, -0.5, 0] }} />} />
      <Paard position={[1.3, 0, 0.4]} rotation={[0, Math.PI + 0.5, 0]} {...PAARD_W} t={t + 1} ruiter={<Figuur {...WL} pose={{ ...ARMEN_GEKRUIST, hoofd: [0, 0.4, 0] }} />} />
    </Scène>
  );
};

const S5 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 115, -2, 2);
  return (
    <Scène focus={[0, 2.6, z]} scherpte={2.5} mist={['#8A6A6A', 20, 100]} teller={{ label: 'Year', waarde: '1567', pil: 'the Duke of Alba' }} tekst={[{ t: 'Spain sends an army. you flee to ' }, { t: 'Germany', accent: true }]}>
      <Lucht boven="#4E3159" horizon="#E08A5A" />
      <Camera pos={[ease(f, 0, 115, 4, 3), 2.8, z + 10]} kijk={[0, 2.6, z - 2]} fov={34} />
      <Avondlicht />
      <hemisphereLight args={['#FFC8A0', '#3A2A20', 0.5]} />
      <Grond kleur="#6A6A42" />
      <Leger rijen={4} kolommen={10} position={[0, 0, -26]} kleur="#B3241E" schild="#D8A945" t={t} />
      <Paard position={[0, 0, -21]} rotation={[0, Math.PI, 0]} kleur="#151210" dek="#B3241E" t={t} ruiter={<Figuur kleding={ALVA} baard hoofddeksel="helm" />} />
      <Paard position={[0, 0, z]} rotation={[0, Math.PI, 0]} {...PAARD_W} t={t} loopt ruiter={<Figuur {...WL} pose={{ wenk: 0.6 }} />} />
    </Scène>
  );
};

const S6 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 115, 0, -6);
  return (
    <Scène focus={[0, 1.5, z]} scherpte={3} mist={['#A8B4C0', 20, 90]} teller={{ label: 'Son', waarde: 'age 13', pil: 'taken to Spain, 1568' }} tekst={[{ t: 'they take your son to Spain. you never see him ' }, { t: 'again', accent: true }]}>
      <Lucht boven="#7E8EA2" horizon="#D2DAE2" />
      <Camera pos={[ease(f, 0, 115, 6, 5), 3.2, 10]} kijk={[0, 1.6, z]} fov={36} />
      <Daglicht zon={[6, 10, 8]} kleur="#E0E8F4" kracht={1.4} />
      <Zee t={t} kleur="#3A5A7A" />
      <group position={[0, 0, z]}>
        <Galei position={[0, 0, 0]} rotation={[0, Math.PI, 0]} deining={t} schilden="#B3241E" />
        <Figuur kleding={ZOON} hoofdExtra={<Kraag />} levend scale={0.8} position={[0.3, 0.9, 0.6]} rotation={[0, 0.4, 0]} pose={{ wenk: -0.6, armR: wijs(0.9) }} />
      </group>
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 3, 0]} scherpte={2.5} mist={['#D8C8A0', 25, 140]} teller={{ label: 'War', waarde: '80 years', pil: '1568 – 1648' }} tekst={[{ t: 'so you go to war with the mightiest empire on ' }, { t: 'earth', accent: true }]}>
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 115, 5, 3.5), ease(f, 0, 115, 2.6, 3.0), ease(f, 0, 115, 11, 9.5)]} kijk={[0, 3.2, -2]} fov={34} />
      <Daglicht zon={[8, 12, 10]} />
      <Polder t={t} />
      <Leger rijen={3} kolommen={10} position={[0, 0, -16]} rotation={[0, Math.PI, 0]} kleur="#B3241E" schild="#D8A945" t={t} />
      <Leger rijen={2} kolommen={8} position={[-2, 0, -4]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Prinsenvlag position={[2.4, 0, -1]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.5, 0]} {...PAARD_W} t={t} ruiter={<Figuur {...WL} pose={{ armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, wenk: 0.8, mond: 'open' }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 1.8, 0]} scherpte={3} mist={['#E8D2A8', 25, 120]} teller={{ label: 'Song', waarde: 'Wilhelmus', pil: 'c. 1570' }} tekst={[{ t: "they write a song about you. it's still the Dutch " }, { t: 'anthem', accent: true }]}>
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 115, 2, 1), ease(f, 0, 115, 2.4, 2.2), ease(f, 0, 115, 9, 8)]} kijk={[0, 2.0, -1]} fov={34} />
      <Daglicht zon={[6, 12, 10]} />
      <Grond kleur="#9A8A70" />
      <Trapgevels position={[0, 0, -7]} n={8} />
      <Figuur kleding={ZANGER} hoofdExtra={<Baret veer kleur="#7A2A24" />} levend position={[0, 0, 0]} pose={{ armR: omhoog(), mond: 'open' }} />
      {[-2.6, -1.6, 1.6, 2.6, -2.1, 2.1].map((x, i) => (
        <Figuur key={i} kleding={{ ...BURGER, tuniek: [ORANJE, '#5A4A3A', '#3E5A7A'][i % 3] }} levend position={[x, 0, i > 3 ? -2 : -0.8]} rotation={[0, x < 0 ? 0.6 : -0.6, 0]} pose={{ mond: 'open', armR: i % 2 ? omhoog() : undefined }} />
      ))}
    </Scène>
  );
};

const S9 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 115, 2, -4);
  return (
    <Scène focus={[0, 1.5, z]} scherpte={2.5} mist={['#C8D4DA', 25, 130]} teller={{ label: 'Leiden', waarde: '1574', pil: 'the dikes are cut' }} tekst={[{ t: 'to save Leiden, you flood your own ' }, { t: 'land', accent: true }]}>
      <Lucht boven="#8FAAC8" horizon="#DDE6EA" />
      <Camera pos={[ease(f, 0, 115, 7, 5.5), ease(f, 0, 115, 7, 6), 16]} kijk={[0, 1.5, -10]} fov={36} />
      <Daglicht zon={[10, 14, 6]} />
      <Zee t={t} kleur="#5A7E8E" golf={0.1} />
      {[-12, 8, 20].map((x, i) => <Molen key={x} position={[x, -0.4, -26 - i * 4]} t={t} schaal={1.2} />)}
      {[-6, -2, 3].map((x) => <Blok key={x} p={[x, 0.05, -10]} s={[0.4, 0.3, 3]} c="#6E8A42" />)}
      <Stadsmuur position={[0, 0, -36]} lengte={40} h={5} torens={5} kleur="#9A5A40" />
      <Trapgevels position={[0, 0, -42]} n={12} zaad={3} />
      {[-3, 3].map((x, i) => (
        <group key={x} position={[x * 1.4, 0, z - 6 - i * 3]}>
          <Galei position={[0, 0, 0]} rotation={[0, Math.PI, 0]} deining={t + i} schilden={ORANJE} />
          <Prinsenvlag position={[0, 0.6, -1]} t={t} h={3.4} />
        </group>
      ))}
    </Scène>
  );
};

const S10 = () => {
  const f = useCurrentFrame();
  const bedrag = Math.round(lin(f, 5, 90, 0, 25000) / 500) * 500;
  return (
    <Scène focus={[0, 2.2, -1]} scherpte={3} mist={['#D8C8A8', 20, 100]} teller={{ label: 'Bounty', waarde: bedrag.toLocaleString('en-US'), pil: 'crowns, Philip II, 1580' }} tekst={[{ t: 'the king of Spain puts a price on your ' }, { t: 'head', accent: true }]}>
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 115, 1.2, 0.4), ease(f, 0, 115, 2.4, 2.4), ease(f, 0, 115, 8, 6.8)]} kijk={[0, 3.4, -1]} fov={34} />
      <Daglicht zon={[6, 12, 10]} />
      <Grond kleur="#9A8A70" />
      <Trapgevels position={[0, 0, -8]} n={8} zaad={5} />
      <Blok p={[0, 1.4, -1.2]} s={[0.15, 2.8, 0.15]} c="#5A3B24" />
      <TekstVlak regels={['WANTED', 'WILLIAM', '25,000', 'CROWNS']} b={1.6} h={2.0} achter="#E9DFC8" voor="#3A2A1C" position={[0, 2.0, -1.08]} fontPx={90} />
      {[-1.6, 1.6].map((x, i) => <Figuur key={x} kleding={BURGER} hoofdExtra={<Baret />} levend position={[x, 0, 0.6]} rotation={[0, Math.PI + (i ? 0.5 : -0.5), 0]} />)}
    </Scène>
  );
};

const Verband = () => <Blok p={[-0.2, 0.33, 0.29]} s={[0.26, 0.2, 0.04]} c="#F4F0E6" />;

const S11 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[0, 2, 0]} scherpte={3.5} mist={['#2A1E16', 10, 40]} teller={{ label: 'Shot', waarde: '1582', pil: 'Antwerp, survived' }} tekst={[{ t: 'an assassin shoots you in the face. you ' }, { t: 'survive', accent: true }]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 115, 1.4, 0.8), ease(f, 0, 115, 2.4, 2.3), ease(f, 0, 115, 6.6, 5.8)]} kijk={[0, 2.2, 0]} fov={34} />
      <Binnenlicht zon={[-3, 7, 5]} kleur="#FFDDB0" />
      <pointLight position={[1, 3, 2]} intensity={5} distance={8} color="#FFC080" />
      <Zaal kleur="#C9B48E" />
      <Bed position={[-2.2, 0, -1.4]} rotation={[0, Math.PI / 2, 0]} />
      <Figuur kleding={{ ...WILLEM, cape: undefined }} baard snor levend hoofdExtra={<><Kraag /><Verband /></>} position={[0, 0, 0]} pose={{ wenk: 0.5 }} />
      <Figuur kleding={CHARLOTTE} haar="lang" levend position={[1.2, 0, -0.4]} rotation={[0, -0.8, 0]} pose={{ armR: wijs(0.9), wenk: -0.5 }} />
    </Scène>
  );
};

const S12 = () => {
  const f = useCurrentFrame();
  return (
    <Scène focus={[-0.2, 1.0, -1.0]} scherpte={2.5} mist={['#1A1A24', 8, 30]} teller={{ label: 'Delft', waarde: '1584', pil: '10 July, Prinsenhof' }} tekst={[{ t: 'two years later, the next one does not ' }, { t: 'miss', accent: true }]}>
      <Lucht boven="#1A1A24" horizon="#2A2A34" />
      <Camera pos={[ease(f, 0, 115, 1.8, 1.2), ease(f, 0, 115, 2.6, 2.4), ease(f, 0, 115, 6.0, 5.0)]} kijk={[-0.2, 1.0, -1.0]} fov={36} />
      <Nachtlicht />
      <pointLight position={[1.0, 2.6, 1.5]} intensity={7} distance={9} color="#E8D8B0" />
      <Grond kleur="#3A3430" />
      <Blok p={[0, 2.5, -1.7]} s={[8, 5, 0.3]} c="#C9BCA6" rough={1} />
      {[0, 1, 2, 3, 4].map((i) => <Blok key={i} p={[2.2, 0.15 + i * 0.3, -1.2 + i * 0.35]} s={[1.6, 0.3, 0.35]} c="#6A5A4A" />)}
      {[[-0.4, 1.9], [0.15, 1.6]].map(([x, y]) => <Blok key={x} p={[x, y, -1.53]} s={[0.12, 0.12, 0.04]} c="#1A1410" />)}
      <group position={[-0.5, -0.72, 0.2]} rotation={[0.1, 0.6, 0.1]}>
        <Baret />
      </group>
    </Scène>
  );
};

const S13 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2, -4]} scherpte={2.5} mist={['#F0C890', 30, 150]} teller={{ label: 'Freedom', waarde: '1648', pil: 'Peace of Münster' }} tekst={[{ t: '64 years later, your country is ' }, { t: 'free', accent: true }]}>
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[20, 8, -130]} grootte={13} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 115, 7, 5.5), ease(f, 0, 115, 4, 3.4), ease(f, 0, 115, 12, 10.5)]} kijk={[0, 2.6, -8]} fov={36} />
      <Daglicht zon={[-6, 10, 8]} kleur="#FFE0B0" />
      <Zee t={t} kleur="#4A6E8A" golf={0.1} />
      <Blok p={[0, 0.3, -18]} s={[60, 0.8, 8]} c="#6A6A5A" />
      <Trapgevels position={[0, 0.6, -19]} n={14} zaad={2} />
      {[-6, 2, 9].map((x, i) => (
        <group key={x} position={[x, 0, -8 + i * 2]}>
          <Galei position={[0, 0, 0]} rotation={[0, 0.4, 0]} deining={t + i} schilden={ORANJE} />
          <Prinsenvlag position={[0, 0.6, 0]} t={t + i} h={3.6} />
        </group>
      ))}
    </Scène>
  );
};

const S14 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène focus={[0, 2, -2]} scherpte={2.2} mist={['#E89A60', 30, 160]} teller={{ label: 'Colour', waarde: 'Orange', pil: 'the House of Orange' }} tekst={[{ t: 'and a whole nation still wears your ' }, { t: 'colour', accent: true }]}>
      <Lucht boven="#4E3159" horizon="#F5A05A" onder="#3A2216" />
      <Zon position={[0, 8, -150]} grootte={16} kleur="#FFC77A" />
      <Camera pos={[ease(f, 0, 210, 6, 4), ease(f, 0, 210, 4.2, 3.4), ease(f, 0, 210, 13, 10)]} kijk={[0, 2.2, -4]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.6]} />
      <Polder t={t} />
      {Array.from({ length: 30 }, (_, i) => {
        const x = (i % 10) * 1.3 - 5.85 + (Math.floor(i / 10) % 2) * 0.5;
        const z = -2 - Math.floor(i / 10) * 1.6;
        return <Figuur key={i} kleding={{ ...BURGER, tuniek: ORANJE, rok: ORANJE, benen: '#2A2A3A' }} position={[x, Math.abs(Math.sin(t * 5 + i)) * 0.12, z]} pose={{ armR: i % 2 ? omhoog() : undefined, armL: i % 3 === 0 ? { schouder: [-2.8, 0, 0.2] } : undefined, mond: 'lach' }} />;
      })}
      <Prinsenvlag position={[-4.5, 0, -1]} t={t} h={5.5} />
      <Prinsenvlag position={[4, 0, -2.5]} t={t + 1} h={5.5} />
    </Scène>
  );
};

/** Omslag in de what.if.atlas-opbouw: Willem ten voeten uit te paard met de Prinsenvlag, molens en zijn leger. */
export const OmslagWillemScène = () => (
  <>
    <fog attach="fog" args={['#F0B878', 30, 170]} />
    <Lucht boven="#4E3A6A" horizon="#F4A35A" />
    <Zon position={[-4, 9, -140]} grootte={18} kleur="#FFD08A" />
    <Camera pos={[2.4, 2.6, 10.5]} kijk={[0, 2.9, 0]} fov={36} />
    <Daglicht zon={[-6, 8, 9]} kleur="#FFC890" kracht={2.3} />
    <Polder />
    <Leger rijen={3} kolommen={11} position={[0, 0, -8]} kleur={ORANJE} schild="#2A4A9A" />
    <Prinsenvlag position={[-4.2, 0, -3.4]} h={5} />
    <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.5, 0]} {...PAARD_W} ruiter={<Figuur kleding={WILLEM} baard snor hoofdExtra={<HoofdW />} pose={{ hoofd: [0, 0.25, 0], armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, wenk: 0.5 }} inHand={<Zwaard />} />} />
  </>
);

/* ================= montage ================= */

const SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14];
const DUUR = [140, 110, 120, 120, 110, 115, 115, 115, 115, 110, 110, 110, 115, 210];
const STARTS = DUUR.map((_, i) => DUUR.slice(0, i).reduce((x, y) => x + y, 0));
export const WILLEM_DUUR = DUUR.reduce((a, b) => a + b, 0);
if (WILLEM_DUUR > MAX_SHORT_FRAMES) throw new Error(`WILLEM_DUUR is ${WILLEM_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = WILLEM_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const KLANKEN: Klank[] = [
  { s: 0, src: 'wind', vol: 0.12, lus: true },
  { s: 0, bij: 4, src: 'inslag', vol: 0.2 },
  { s: 1, src: 'vuur', vol: 0.05, lus: true },
  { s: 1, bij: 30, src: 'glans', vol: 0.14 },
  { s: 2, src: 'menigte', vol: 0.06, lus: true },
  { s: 2, bij: 40, src: 'glans', vol: 0.12 },
  { s: 3, src: 'wind', vol: 0.08, lus: true },
  { s: 3, bij: 70, src: 'tik', vol: 0.16 },
  { s: 4, src: 'wind', vol: 0.12, lus: true },
  { s: 4, bij: 30, src: 'val', vol: 0.12 },
  { s: 5, src: 'zee', vol: 0.14, lus: true },
  { s: 5, bij: 50, src: 'val', vol: 0.12 },
  { s: 6, src: 'menigte', vol: 0.1, lus: true },
  { s: 6, bij: 20, src: 'inslag', vol: 0.2 },
  { s: 7, src: 'menigte', vol: 0.12, lus: true },
  { s: 7, bij: 20, src: 'glans', vol: 0.14 },
  { s: 8, src: 'zee', vol: 0.14, lus: true },
  { s: 8, bij: 30, src: 'inslag', vol: 0.14 },
  { s: 9, src: 'wind', vol: 0.06, lus: true },
  ...[20, 45, 70].map((bij) => ({ s: 9, bij, src: 'munt', vol: 0.14 })),
  { s: 10, src: 'vuur', vol: 0.05, lus: true },
  { s: 10, bij: 15, src: 'inslag', vol: 0.16 },
  { s: 11, bij: 10, src: 'inslag', vol: 0.18 },
  { s: 11, bij: 40, src: 'val', vol: 0.14 },
  { s: 12, src: 'zee', vol: 0.1, lus: true },
  { s: 12, bij: 20, src: 'glans', vol: 0.14 },
  { s: 13, src: 'menigte', vol: 0.14, lus: true },
  { s: 13, bij: 6, src: 'glans', vol: 0.12 },
];

export const WatAlsWillem = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
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
        volume={(fr) => interpolate(fr, [0, 10, WILLEM_DUUR - 45, WILLEM_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
);
