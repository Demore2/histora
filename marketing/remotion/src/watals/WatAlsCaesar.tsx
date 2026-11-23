import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  Avondlicht,
  Banier,
  Binnenlicht,
  Bos,
  Camera,
  Daglicht,
  Fakkel,
  Galei,
  Grond,
  Heuvels,
  Leger,
  Lucht,
  Menigte,
  Nachtlicht,
  Paard,
  riemPunten,
  Rivier,
  Scherpte,
  Schuim,
  Sokkel,
  Strijdwagen,
  Tent,
  Zee,
  Zon,
  Zuil,
  Zuilengang,
} from './Decor';
import {
  ARMEN_GEKRUIST,
  Blok,
  BRONS,
  CAESAR,
  CAESAR_GENERAAL,
  CALPURNIA,
  CLEOPATRA,
  Dolk,
  Figuur,
  GALLIËR,
  GOUD,
  omhoog,
  PIRAAT,
  Rol,
  SENATOR,
  wijs,
  ZIENER,
  Zwaard,
  type Kleding,
  type V3,
} from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';

/**
 * "What if you were Julius Caesar?" — 18 scènes + eindkaart, alles in code (Remotion + three.js).
 * Bronnen: Plutarchus (Caesar), Suetonius (Divus Julius). Geen stem; muziek alleen voor de preview,
 * of in de versie `-muziek` als de eigenaar hem erin wil.
 */

const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const D = 0.73; // dekhoogte van de galei

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

const CAESAR_KRANS = { kleding: CAESAR, hoofddeksel: 'krans' as const };
const TOGA_TRIOMF: Kleding = { ...CAESAR, tuniek: '#6B2D5C', rok: '#6B2D5C', rand: '#D8A945', cape: '#D8A945' };

/* ---------- 1-3: de piraten ---------- */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 1.2, 1]}
      scherpte={2}
      mist={['#E6D9C1', 30, 140]}
      teller={{ label: 'Year', waarde: '75 BC', pil: 'captured by pirates' }}
      tekst={[{ t: 'What if you were ' }, { t: 'Julius Caesar', accent: true }, { t: '?' }]}
    >
      <Lucht boven="#7FAED8" horizon="#EBDDC4" />
      <Camera pos={[ease(f, 0, 140, 19, 14.5), ease(f, 0, 140, 12, 8), ease(f, 0, 140, 23, 17.5)]} kijk={[0, 1.8, 0]} fov={34} />
      <Daglicht zon={[12, 16, 6]} />
      <Zee t={t} />
      <Galei deining={t * 1.3} />
      <Schuim punten={riemPunten()} t={t} />
      <Figuur kleding={CAESAR} position={[0.2, D, 3.1]} rotation={[0, 0.7, 0]} scale={0.55} pose={{ ...ARMEN_GEKRUIST, hoofd: [0, -0.3, 0] }} />
      <Figuur kleding={PIRAAT} hoofddeksel="bandana" position={[-0.6, D, 1.2]} rotation={[0, 0.4, 0]} scale={0.55} />
      <Figuur kleding={PIRAAT} hoofddeksel="bandana" baard position={[0.6, D, -2.2]} rotation={[0, 2.6, 0]} scale={0.55} />
    </Scène>
  );
};

const S2 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const bedrag = Math.round(ease(f, 62, 92, 20, 50));
  return (
    <Scène
      focus={[0, D + 2.0, 3.0]}
      scherpte={4}
      mist={['#DDD0B8', 14, 80]}
      teller={{ label: 'Ransom', waarde: `${bedrag} talents`, pil: 'Plutarch' }}
      tekst={[{ t: 'they want 20 talents. you tell them: ask for ' }, { t: '50', accent: true }]}
    >
      <Lucht boven="#8FB9DC" horizon="#E6D8BF" />
      <Camera pos={[ease(f, 0, 120, 10.5, 9.6), 3.0, ease(f, 0, 120, 3.3, 2.9)]} kijk={[0, 2.35, 2.85]} fov={27} />
      <Daglicht zon={[-6, 12, 10]} />
      <Zee t={t} />
      <Galei deining={t * 0.9} mast={false} />
      <Figuur
        kleding={CAESAR}
        position={[0, D, 3.6]}
        rotation={[0, 2.25, 0]}
        pose={{ ...ARMEN_GEKRUIST, hoofd: [0, ease(f, 55, 75, 0.25, 0.05), 0], mond: f > 66 && f < 100 ? 'lach' : 'dicht' }}
      />
      <Figuur
        kleding={PIRAAT}
        hoofddeksel="bandana"
        baard
        position={[0.05, D, 2.05]}
        rotation={[0, 0.85, 0]}
        pose={{ armR: wijs(ease(f, 4, 20, 0.1, 1.5)), mond: Math.floor(f / 5) % 2 === 0 && f < 55 ? 'open' : 'dicht', wenk: ease(f, 75, 95, 0, 1) }}
      />
    </Scène>
  );
};

const Kruis = ({ position, h = 3.8, kanteling = 0 }: { position: V3; h?: number; kanteling?: number }) => (
  <group position={position} rotation={[0, 0, kanteling]}>
    <Blok p={[0, h / 2, 0]} s={[0.24, h, 0.24]} c="#24150C" />
    <Blok p={[0, h - 0.8, 0]} s={[1.9, 0.22, 0.24]} c="#24150C" />
    {[-0.7, 0.7].map((x) => <Blok key={x} p={[x, h - 0.8, 0.13]} s={[0.1, 0.3, 0.04]} c="#5A4030" />)}
    <Blok p={[0, h - 1.5, 0.13]} s={[0.3, 0.1, 0.04]} c="#5A4030" />
    {[-0.3, 0.25].map((x, i) => <Blok key={i} p={[x, 0.12, 0.3]} s={[0.35, 0.22, 0.3]} c="#3A2A20" r={[0, i, 0]} />)}
  </group>
);

const S3 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 1.6, -5]}
      scherpte={2.5}
      mist={['#B8603A', 12, 70]}
      teller={{ label: 'Held', waarde: '38 days', pil: 'then he came back' }}
      tekst={[{ t: 'you swore you would crucify them. you ' }, { t: 'did', accent: true }]}
    >
      <Lucht boven="#4E3159" horizon="#F08A3C" onder="#3A2216" />
      <Zon position={[0, 4, -120]} grootte={14} kleur="#FFC77A" />
      <Camera pos={[ease(f, 0, 120, 0.5, 0.2), ease(f, 0, 120, 1.4, 1.75), ease(f, 0, 120, 8.5, 7.3)]} kijk={[0, 0.8, -6]} fov={38} />
      <Avondlicht />
      <Grond kleur="#2A170E" y={-1.2} />
      <Heuvels kleur="#3A2116" z={-70} />
      {[-5.2, -2.6, 0.2, 2.9, 5.4].map((x, i) => (
        <Kruis key={i} position={[x, -1.2, -6 - (i % 3) * 1.6]} h={3.6 + (i % 2) * 0.5} kanteling={((i % 3) - 1) * 0.04} />
      ))}
      <Figuur kleding={CAESAR} position={[-0.75, -1.2, -0.6]} rotation={[0, Math.PI + 0.25, 0]} pose={{ hoofd: [0.1, 0, 0] }} />
    </Scène>
  );
};

/* ---------- 4: Alexander ---------- */

const ALEXANDER: Kleding = { huid: '#000', haar: '#000', tuniek: '#000', schoenen: '#000', cape: '#000', borst: '#000' };

const S4 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0.7, 2.4, 2.6]}
      scherpte={4}
      mist={['#3A2A1E', 8, 30]}
      teller={{ label: 'Age', waarde: '31', pil: 'Alexander died at 32' }}
      tekst={[{ t: 'at your age, he ruled the world. you ' }, { t: 'weep', accent: true }]}
    >
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 0.6, 0.4), ease(f, 0, 120, 1.9, 2.1), ease(f, 0, 120, 7.8, 7.0)]} kijk={[0, 2.4, -0.6]} fov={38} />
      <Binnenlicht zon={[-3, 10, 2]} kleur="#FFD49A" />
      <pointLight position={[-0.5, 6, 1]} intensity={8} distance={10} color="#FFC070" />
      <Zuilengang lengte={3} breedte={7} h={6} />
      <Sokkel position={[-0.8, 0, -1.6]} h={0.7}>
        <Figuur kleding={ALEXANDER} o={GOUD} haar="lang" rotation={[0, 0.35, 0]} scale={1.15} pose={{ armR: wijs(1.6), hoofd: [-0.15, 0, 0] }} inHand={<Zwaard o={GOUD} />} />
      </Sokkel>
      <Figuur kleding={CAESAR} position={[0.7, 0, 2.6]} rotation={[0, -2.82, 0]} pose={{ hoofd: [-0.35, 0, 0], wenk: -0.8, traan: lin(f, 30, 110, 0, 1) }} />
    </Scène>
  );
};

/* ---------- 5-7: Gallië ---------- */

const S5 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, 2, -2);
  return (
    <Scène
      focus={[0, 2.4, z]}
      scherpte={3}
      mist={['#C9D3B8', 15, 70]}
      teller={{ label: 'Years', waarde: '8', pil: 'the war in Gaul' }}
      tekst={[{ t: 'you conquer all of ' }, { t: 'Gaul', accent: true }]}
    >
      <Lucht boven="#9EC1DB" horizon="#E3E0C6" />
      <Camera pos={[ease(f, 0, 120, 6.5, 5.2), 3.0, z + ease(f, 0, 120, -10, -8.5)]} kijk={[0, 2.5, z]} fov={34} />
      <Daglicht zon={[8, 14, -6]} />
      <Grond kleur="#7E9A4E" />
      <Bos n={60} straal={40} vrij={7} />
      <Paard position={[0, 0, z]} t={t} loopt ruiter={<Figuur kleding={CAESAR} hoofddeksel="krans" pose={{ armR: { schouder: [-0.5, 0, -0.1], elleboog: [0, -0.8] } }} />} />
      <Leger rijen={4} kolommen={5} position={[0, 0, z + 7.5]} rotation={[0, Math.PI, 0]} t={t} />
    </Scène>
  );
};

const S6 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const val = ease(f, 25, 45, 0, 1);
  return (
    <Scène
      focus={[0, 2.0, -1.2]}
      scherpte={3.5}
      mist={['#B9B49E', 12, 60]}
      teller={{ label: 'Year', waarde: '52 BC', pil: 'Alesia' }}
      tekst={[{ t: 'their king throws his sword at your ' }, { t: 'feet', accent: true }]}
    >
      <Lucht boven="#9AA9B8" horizon="#DCD5BE" />
      <Camera pos={[-2.6, 2.1, ease(f, 0, 120, 5.0, 4.3)]} kijk={[0.1, 2.0, -0.8]} fov={34} />
      <Daglicht zon={[-8, 12, 6]} kracht={1.7} />
      <Grond kleur="#7A8A50" />
      <Figuur {...CAESAR_KRANS} kleding={CAESAR_GENERAAL} position={[1.5, 0, 0.6]} rotation={[0, -2.38, 0]} pose={ARMEN_GEKRUIST} />
      <Figuur
        kleding={GALLIËR}
        haar="lang"
        snor
        position={[-0.3, 0, -1.3]}
        rotation={[0, 0.76, 0]}
        pose={{ armR: { schouder: [lin(f, 10, 30, -1.4, -0.5), 0, -0.1], elleboog: [0, -0.2] }, hoofd: [0.25, 0, 0], wenk: -0.6 }}
        inHand={f < 30 ? <Zwaard /> : undefined}
      />
      {f >= 30 && (
        <group position={[0.2, 0.05 + (1 - val) * 1.2, -0.2]} rotation={[-(1 - val) * 1.2, 0.6 + (1 - val) * 1.5, 0]}>
          <Zwaard />
        </group>
      )}
      <Leger rijen={2} kolommen={6} position={[1.5, 0, -6]} rotation={[0, 0, 0]} t={t} />
      {Array.from({ length: 7 }, (_, i) => (
        <Blok key={i} p={[-3 + i * 0.25, 0.1 + (i % 3) * 0.12, -2.2 + (i % 2) * 0.3]} s={[0.1, 0.9, 0.6]} c={['#3E6B3A', '#7A3B26', '#C9A050'][i % 3]} r={[1.3, i * 0.6, 0.2]} />
      ))}
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.1, 0.3]}
      scherpte={4}
      mist={['#2A1E16', 6, 25]}
      teller={{ label: 'Order', waarde: 'disband', pil: 'or be an enemy of Rome' }}
      tekst={[{ t: 'the Senate says: come home ' }, { t: 'alone', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[1.3, 2.4, ease(f, 0, 120, 5.2, 4.5)]} kijk={[0, 2.0, 0]} fov={32} />
      <Binnenlicht zon={[3, 6, 4]} kleur="#FFC98A" />
      <pointLight position={[-1.0, 2.0, 1.0]} intensity={5} distance={7} color="#FFA04A" />
      <Grond kleur="#5A4636" />
      {/* tentwand achter hem, tafel met olielamp ernaast */}
      <Blok p={[0, 2.5, -2.2]} s={[9, 5, 0.1]} c="#BFA77E" rough={0.95} />
      <Blok p={[0, 2.5, -2.14]} s={[0.12, 5, 0.04]} c="#8A7350" />
      <Blok p={[-1.3, 0.85, 0.6]} s={[1.2, 0.08, 0.8]} c="#6B4A2E" />
      {[-1.8, -0.8].map((x) => <Blok key={x} p={[x, 0.42, 0.6]} s={[0.08, 0.84, 0.08]} c="#4F331F" />)}
      <Blok p={[-1.1, 0.95, 0.6]} s={[0.22, 0.12, 0.14]} c="#8A6A3A" />
      <Blok p={[-1.1, 1.06, 0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <Figuur
        kleding={CAESAR}
        hoofddeksel="krans"
        position={[0, 0, 0]}
        rotation={[0, 0.15, 0]}
        pose={{
          armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] },
          armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] },
          hoofd: [0.3, 0, 0],
          wenk: ease(f, 40, 70, 0, 1),
        }}
        inHand={<Rol open={ease(f, 0, 20, 0.3, 1)} />}
      />
    </Scène>
  );
};

/* ---------- 8-9: de Rubicon ---------- */

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.5, -4]}
      scherpte={3}
      mist={['#0E1220', 10, 45]}
      teller={{ label: 'Year', waarde: '49 BC', pil: 'the Rubicon' }}
      tekst={[{ t: 'a small river. cross it, and it is ' }, { t: 'war', accent: true }]}
    >
      <Lucht boven="#0B0F1E" horizon="#242A44" />
      <Camera pos={[ease(f, 0, 120, 1.5, 0.8), 1.2, ease(f, 0, 120, 7.5, 6.5)]} kijk={[0, 2.7, -4]} fov={36} />
      <Nachtlicht />
      <Rivier t={t} breed={6} />
      <Paard position={[0, 0.3, -4]} rotation={[0, Math.PI - 0.2, 0]} t={t} ruiter={<Figuur kleding={CAESAR_GENERAAL} hoofddeksel="krans" />} />
      <Leger rijen={3} kolommen={7} position={[0, 0.3, -7.5]} t={t} />
      {[-4, -2, 2, 4, -3, 3].map((x, i) => <Fakkel key={i} position={[x, 0.3, -5.5 - (i > 3 ? 3 : 0)]} t={t} licht={i < 4} />)}
    </Scène>
  );
};

const S9 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 120, -3, 2.2);
  return (
    <Scène
      focus={[x, 2.3, 0]}
      scherpte={3}
      mist={['#0E1220', 8, 40]}
      teller={{ label: 'War', waarde: 'civil war', pil: 'Suetonius' }}
      tekst={[{ t: '"the die is cast." you ' }, { t: 'cross', accent: true }]}
    >
      <Lucht boven="#0B0F1E" horizon="#242A44" />
      <Camera pos={[x * 0.7, 1.6, 11]} kijk={[x, 2.0, 0]} fov={34} />
      <Nachtlicht />
      <group rotation={[0, Math.PI / 2, 0]}>
        <Rivier t={t} breed={14} />
      </group>
      <Paard position={[x, -0.15, 0]} rotation={[0, -Math.PI / 2, 0]} t={t} loopt ruiter={<Figuur kleding={CAESAR_GENERAAL} hoofddeksel="krans" pose={{ armR: wijs(1.2) }} />} />
      <Schuim punten={[[x - 0.3, -0.2, 0.8], [x + 0.3, -0.2, -0.8], [x + 0.4, -0.2, 0.8], [x - 0.4, -0.2, -0.8], [x, -0.2, 1.1]]} t={t} />
      <Fakkel position={[x - 2.5, 0.3, -3]} t={t} />
      <Fakkel position={[x + 1.5, 0.3, -4]} t={t} />
    </Scène>
  );
};

/* ---------- 10-13: oorlog en Egypte ---------- */

const S10 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.4, 0]}
      scherpte={3}
      mist={['#D9D2B8', 15, 80]}
      teller={{ label: 'Year', waarde: '48 BC', pil: 'Pharsalus' }}
      tekst={[{ t: 'you beat Pompey, your old ' }, { t: 'friend', accent: true }]}
    >
      <Lucht boven="#A9C3D6" horizon="#E6DDC2" />
      <Camera pos={[ease(f, 0, 120, 3.0, 2.2), 3.0, ease(f, 0, 120, 7.5, 6.2)]} kijk={[0, 2.4, -3]} fov={36} />
      <Daglicht zon={[6, 12, 8]} />
      <Grond kleur="#86A05A" />
      <Paard position={[0, 0, 0]} rotation={[0, 0.3, 0]} kleur="#ECE6DA" manen="#CFC6B6" t={t} ruiter={<Figuur kleding={CAESAR_GENERAAL} hoofddeksel="krans" pose={{ armR: wijs(1.0) }} />} />
      <Leger rijen={3} kolommen={9} position={[0, 0, -6]} rotation={[0, Math.PI, 0]} t={t} />
      <Leger rijen={3} kolommen={12} position={[0, 0, -20]} kleur="#3E4F7A" schild="#3E4F7A" t={t} />
    </Scène>
  );
};

const EGYPTENAAR: Kleding = { huid: '#B07A4E', haar: '#1A1210', tuniek: '#F2EAD8', schoenen: '#B8912F', riem: '#D8A945' };

const S11 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.2, 0.6]}
      scherpte={4.5}
      mist={['#5A3E28', 6, 25]}
      teller={{ label: 'Pompey', waarde: 'killed', pil: 'in Egypt' }}
      tekst={[{ t: 'they bring you his head. you ' }, { t: 'cry', accent: true }]}
    >
      <Lucht boven="#3A2A1E" horizon="#7A5A3A" />
      <Camera pos={[0.8, 2.4, ease(f, 0, 120, 5.0, 4.2)]} kijk={[0.1, 2.1, 0]} fov={32} />
      <Binnenlicht zon={[4, 8, 5]} kleur="#FFCF8A" />
      <Zuil position={[-2.2, 0, -2.5]} h={6} kleur="#D9B988" />
      <Zuil position={[2.4, 0, -3]} h={6} kleur="#D9B988" />
      <Grond kleur="#B89060" />
      <Figuur kleding={CAESAR_GENERAAL} hoofddeksel="krans" position={[0, 0, 0.4]} rotation={[0, 0.1, 0]} pose={{ wenk: -1, traan: lin(f, 20, 100, 0, 1), mond: 'open', hoofd: [0.15, 0, 0] }} />
      <Figuur kleding={EGYPTENAAR} haar="kaal" position={[0.9, 0, 2.2]} rotation={[0, Math.PI - 0.3, 0]} pose={{ armL: { schouder: [-1.2, 0, 0.2], elleboog: [0, -0.4] }, armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.4] } }} />
      <Blok p={[0.85, 1.7, 1.55]} s={[0.6, 0.45, 0.5]} c="#8A6A3A" />
      <Blok p={[0.85, 1.95, 1.55]} s={[0.66, 0.08, 0.56]} c="#E9DFC8" />
    </Scène>
  );
};

const Tapijt = ({ uitgerold }: { uitgerold: number }) => (
  <group position={[0, 0.02, 0]}>
    <Blok p={[0, 0, -uitgerold * 1.1]} s={[1.6, 0.03, 0.01 + uitgerold * 2.2]} c="#8E2A24" />
    {[-0.55, 0, 0.55].map((x) => <Blok key={x} p={[x, 0.02, -uitgerold * 1.1]} s={[0.08, 0.02, uitgerold * 2.1]} c="#D8A945" />)}
    <mesh position={[0, 0.15, -uitgerold * 2.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.15 + (1 - uitgerold) * 0.25, 0.15 + (1 - uitgerold) * 0.25, 1.6, 12]} />
      <meshStandardMaterial color="#8E2A24" roughness={0.9} />
    </mesh>
  </group>
);

const S12 = () => {
  const f = useCurrentFrame();
  const rol = ease(f, 0, 35, 0, 1);
  const op = ease(f, 30, 55, 0, 1);
  return (
    <Scène
      focus={[0, 1.8, -2.3]}
      scherpte={3.5}
      mist={['#4A3020', 8, 30]}
      teller={{ label: 'Queen', waarde: 'Cleopatra', pil: 'Plutarch tells it' }}
      tekst={[{ t: 'a queen is carried in, rolled up in a ' }, { t: 'rug', accent: true }]}
    >
      <Lucht boven="#2E1E14" horizon="#6A4A2E" />
      <Camera pos={[1.0, 2.6, ease(f, 0, 120, 4.4, 3.6)]} kijk={[0, 1.5, -2.2]} fov={34} />
      <Binnenlicht zon={[-4, 9, 3]} kleur="#FFC680" />
      <pointLight position={[0, 3, -1]} intensity={4} distance={8} color="#FFB060" />
      <Grond kleur="#C9A57A" />
      {[-2.5, 2.5].map((x) => <Zuil key={x} position={[x, 0, -4]} h={6} kleur="#D9B988" />)}
      <group position={[0, 0, 0]}>
        <Tapijt uitgerold={rol} />
      </group>
      <Figuur kleding={CLEOPATRA} haar="bob" hoofddeksel="hoofdband" position={[0, -2.4 + op * 2.4, -2.3]} rotation={[0, 0, 0]} pose={{ mond: 'lach', armL: { schouder: [0, 0, 0.5], elleboog: [0, -1.2] }, armR: { schouder: [0, 0, -0.5], elleboog: [0, -1.2] } }} />
      <Figuur kleding={CAESAR_GENERAAL} hoofddeksel="krans" position={[1.2, 0, 1.2]} rotation={[0, Math.PI + 0.4, 0]} />
    </Scène>
  );
};

const S13 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.8, 0]}
      scherpte={2.5}
      mist={['#D8CDB0', 15, 80]}
      teller={{ label: 'Year', waarde: '47 BC', pil: 'Zela' }}
      tekst={[{ t: 'you came. you saw. you ' }, { t: 'won', accent: true }]}
    >
      <Lucht boven="#7FAAD0" horizon="#E8DDC2" />
      <Camera pos={[ease(f, 0, 120, 5.0, 4.0), ease(f, 0, 120, 2.0, 2.3), ease(f, 0, 120, 8.5, 7.2)]} kijk={[-0.5, 3.0, 0]} fov={38} />
      <Daglicht zon={[6, 10, 8]} />
      <Grond kleur="#9AA060" />
      <Banier position={[-1.7, 0, -0.8]} tekst t={t} />
      <Paard position={[0.4, 0, 0]} rotation={[0, 0.6, 0]} t={t} ruiter={<Figuur kleding={CAESAR_GENERAAL} hoofddeksel="krans" pose={{ armR: omhoog(), mond: 'open' }} inHand={<Zwaard />} />} />
      <Leger rijen={4} kolommen={8} position={[0, 0, -4]} t={t} />
    </Scène>
  );
};

/* ---------- 14-17: Rome ---------- */

const S14 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 120, 6, 1);
  return (
    <Scène
      focus={[0, 2.5, z]}
      scherpte={2.5}
      mist={['#E8DCC4', 20, 90]}
      teller={{ label: 'Dictator', waarde: 'for life', pil: 'February 44 BC' }}
      tekst={[{ t: 'Rome makes you master ' }, { t: 'forever', accent: true }]}
    >
      <Lucht boven="#8DB6DA" horizon="#EFE3CC" />
      <Camera pos={[2.8, 3.4, z - 9.5]} kijk={[0, 2.2, z]} fov={34} />
      <Daglicht zon={[8, 14, -4]} bereik={22} />
      <Grond kleur="#D8CCB4" />
      {/* straat: stenen, stoepranden, juichende Romeinen langs beide kanten */}
      <Blok p={[0, 0.02, 4]} s={[5, 0.04, 60]} c="#BFB29A" rough={0.9} />
      {[-2.6, 2.6].map((x) => <Blok key={x} p={[x, 0.12, 4]} s={[0.3, 0.24, 60]} c="#A89B84" />)}
      <group position={[-4, 0, 12]} rotation={[0, Math.PI / 2, 0]}>
        <Menigte n={22} z={0} x0={0} t={t} juich />
      </group>
      <group position={[4, 0, -13]} rotation={[0, -Math.PI / 2, 0]}>
        <Menigte n={22} z={0} x0={0} t={t + 1} juich />
      </group>
      {Array.from({ length: 7 }, (_, i) => [-1, 1].map((k) => <Zuil key={`${i}${k}`} position={[k * 6.2, 0, -4 + i * 4]} h={6} />))}
      {/* paleis aan het eind van de straat */}
      <group position={[0, 0, 26]}>
        <Blok p={[0, 4, 0]} s={[16, 8, 2]} c="#E9DFCC" rough={0.85} />
        <Blok p={[0, 8.6, 0]} s={[17, 1.2, 2.4]} c="#DCD0B8" />
        {Array.from({ length: 6 }, (_, i) => <Zuil key={i} position={[-6.25 + i * 2.5, 0, -1.4]} h={7.4} />)}
      </group>
      <Strijdwagen position={[0, 0, z]} t={t} ruiter={<Figuur kleding={TOGA_TRIOMF} hoofddeksel="krans" pose={{ armR: omhoog() }} />} />
    </Scène>
  );
};

const S15 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.3, 0]}
      scherpte={3.5}
      mist={['#E2D6C0', 10, 45]}
      teller={{ label: 'Date', waarde: '15 March', pil: 'the Ides of March' }}
      tekst={[{ t: 'a seer warned you about this ' }, { t: 'day', accent: true }]}
    >
      <Lucht boven="#B8C9D6" horizon="#EADFCC" />
      <Camera pos={[ease(f, 0, 120, 2.9, 2.3), 2.5, ease(f, 0, 120, 6.2, 5.3)]} kijk={[-0.5, 2.1, -0.2]} fov={32} />
      <Daglicht zon={[-6, 12, 6]} kracht={1.8} />
      <Zuilengang lengte={6} breedte={8} h={6} />
      <Figuur {...CAESAR_KRANS} position={[0.3, 0, 0.2]} rotation={[0, -0.9, 0]} pose={{ hoofd: [0, 0.3, 0] }} />
      <Figuur kleding={ZIENER} haar="grijs" baard hoofddeksel="kap" position={[-1.4, 0, -0.6]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.5), mond: Math.floor(f / 6) % 2 ? 'open' : 'dicht', wenk: 0.6 }} />
    </Scène>
  );
};

const S16 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.2, 0]}
      scherpte={4}
      mist={['#241A14', 6, 22]}
      teller={{ label: 'Wife', waarde: 'Calpurnia', pil: 'she dreamed of his death' }}
      tekst={[{ t: 'your wife begs you to stay ' }, { t: 'home', accent: true }]}
    >
      <Lucht boven="#1E1610" horizon="#3A2A1E" />
      <Camera pos={[3.4, 2.4, ease(f, 0, 120, 3.8, 3.2)]} kijk={[0, 2.05, 0]} fov={32} />
      <Binnenlicht zon={[4, 6, 6]} kleur="#FFB870" />
      <pointLight position={[1.5, 2.2, 1.5]} intensity={6} distance={7} color="#FFA050" />
      <Grond kleur="#4A3426" />
      <Blok p={[0, 3, -2.4]} s={[8, 6, 0.3]} c="#6A4632" />
      <Figuur {...CAESAR_KRANS} position={[0.55, 0, -0.2]} rotation={[0, -0.6, 0]} pose={{ hoofd: [0, 0.35, 0] }} />
      <Figuur
        kleding={CALPURNIA}
        haar="lang"
        position={[-0.55, 0, 0.35]}
        rotation={[0, 1.0, 0]}
        pose={{ armL: wijs(1.2), armR: wijs(1.3), wenk: -1, traan: lin(f, 30, 110, 0, 1), mond: 'open' }}
      />
    </Scène>
  );
};

const S17 = () => {
  const f = useCurrentFrame();
  const wonden = Math.round(lin(f, 10, 95, 0, 23));
  const steek = (i: number) => Math.sin(f * 0.35 + i * 1.3) * 0.25;
  return (
    <Scène
      focus={[0, 2.3, 0]}
      scherpte={3.5}
      mist={['#D8CCB4', 8, 35]}
      teller={{ label: 'Wounds', waarde: `${wonden}`, pil: 'Brutus among them' }}
      tekst={[{ t: 'your friends stab you 23 ' }, { t: 'times', accent: true }]}
    >
      <Lucht boven="#C9BEA8" horizon="#E6DCC8" />
      <Camera pos={[ease(f, 0, 120, 0.6, 0.2), ease(f, 0, 120, 4.8, 4.1), ease(f, 0, 120, 7.6, 6.4)]} kijk={[0, 1.9, 0]} fov={34} />
      <Daglicht zon={[-5, 12, 4]} kracht={1.7} />
      <Zuilengang lengte={4} breedte={9} h={6} />
      <Figuur {...CAESAR_KRANS} position={[0, 0, 0]} pose={{ armL: omhoog(), armR: { schouder: [-2.2, 0, -0.4], elleboog: [0, -0.6] }, mond: 'open', wenk: -0.7 }} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.5;
        return (
          <Figuur
            key={i}
            kleding={SENATOR}
            haar={i === 2 ? 'kort' : i % 2 ? 'grijs' : 'kort'}
            position={[Math.sin(a) * 1.5, 0, Math.cos(a) * 1.5 - 0.3]}
            rotation={[0, a + Math.PI, 0]}
            pose={{ armR: { schouder: [-2.4 + steek(i), 0, -0.1], elleboog: [0, -0.3] }, wenk: 1 }}
            inHand={<Dolk />}
          />
        );
      })}
    </Scène>
  );
};

/* ---------- 18: de erfenis ---------- */

const S18 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 3.4, 0]}
      scherpte={2}
      mist={['#E8DCC4', 20, 90]}
      teller={{ label: 'Caesar', waarde: 'Kaiser, Tsar', pil: 'and the month of July' }}
      tekst={[{ t: 'they killed you. your name became the word for ' }, { t: 'emperor', accent: true }]}
    >
      <Lucht boven="#7FAED8" horizon="#EFE3CC" />
      <Camera pos={[ease(f, 0, 120, 3.4, 2.6), ease(f, 0, 120, 1.4, 1.8), ease(f, 0, 120, 11, 9.6)]} kijk={[0, 3.3, 0]} fov={36} />
      <Daglicht zon={[6, 12, 8]} kracht={2.2} />
      <Grond kleur="#D6CAB2" />
      <Sokkel position={[0, 0, 0]} h={1.9}>
        <Figuur kleding={CAESAR} o={BRONS} hoofddeksel="krans" rotation={[0, 0.25, 0]} scale={1.2} pose={{ armR: wijs(1.45) }} />
      </Sokkel>
      {[-4, 4].map((x) => <Zuil key={x} position={[x, 0, -5]} h={7} />)}
    </Scène>
  );
};

/* ---------- montage ---------- */

const ALLE_SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18];
const ALLE_DUUR = [140, 120, 120, 120, 120, 120, 120, 120, 110, 120, 120, 125, 115, 120, 120, 120, 125, 210];
// Shorts/Reels altijd onder de minuut (max MAX_SHORT_FRAMES frames = 58 s): langer en de app-muziek stopt op 1:00 of
// YouTube blokkeert de short. Deze scènes vallen daarom weg (0-based); de volledige montage staat in ALLE_*.
const WEG = [3, 5, 6, 10, 15];
const BEHOUD = ALLE_SCÈNES.map((_, i) => i).filter((i) => !WEG.includes(i));
const SCÈNES = BEHOUD.map((i) => ALLE_SCÈNES[i]);
const DUUR = BEHOUD.map((i) => ALLE_DUUR[i]);
const STARTS = DUUR.map((_, i) => DUUR.slice(0, i).reduce((x, y) => x + y, 0));
export const CAESAR_DUUR = DUUR.reduce((a, b) => a + b, 0);
if (CAESAR_DUUR > MAX_SHORT_FRAMES) throw new Error(`CAESAR_DUUR is ${CAESAR_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = CAESAR_DUUR - 90; // laatste 3 s, over het bronzen beeld

/**
 * Geluid: minimaal en zacht, onder de muziek. Per scène een sfeerlaag (zee, wind, vuur, rivier,
 * menigte) en een paar accenten op momenten in beeld. Volumes bewust laag: je merkt het, het
 * overheerst niet.
 */
type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const ALLE_KLANKEN: Klank[] = [
  { s: 0, src: 'zee', vol: 0.16, lus: true },
  { s: 1, src: 'zee', vol: 0.1, lus: true },
  ...[64, 72, 80, 88].map((bij) => ({ s: 1, bij, src: 'munt', vol: 0.12 })),
  { s: 2, src: 'wind', vol: 0.12, lus: true },
  { s: 3, bij: 8, src: 'glans', vol: 0.14 },
  { s: 4, src: 'wind', vol: 0.07, lus: true },
  { s: 5, src: 'wind', vol: 0.07, lus: true },
  { s: 5, bij: 44, src: 'tik', vol: 0.3 },
  { s: 6, src: 'vuur', vol: 0.1, lus: true },
  { s: 7, src: 'rivier', vol: 0.09, lus: true },
  { s: 7, src: 'vuur', vol: 0.08, lus: true },
  { s: 8, src: 'rivier', vol: 0.14, lus: true },
  { s: 8, bij: 6, src: 'inslag', vol: 0.16 },
  { s: 9, src: 'wind', vol: 0.08, lus: true },
  { s: 10, bij: 8, src: 'val', vol: 0.16 },
  { s: 11, bij: 34, src: 'glans', vol: 0.12 },
  { s: 12, src: 'menigte', vol: 0.08, lus: true },
  { s: 12, bij: 8, src: 'inslag', vol: 0.14 },
  { s: 13, src: 'menigte', vol: 0.14, lus: true },
  { s: 14, src: 'wind', vol: 0.05, lus: true },
  { s: 15, src: 'vuur', vol: 0.07, lus: true },
  { s: 16, bij: 14, src: 'inslag', vol: 0.18 },
  { s: 16, bij: 60, src: 'val', vol: 0.12 },
  { s: 17, bij: 6, src: 'glans', vol: 0.12 },
];
const KLANKEN = ALLE_KLANKEN.filter((k) => BEHOUD.includes(k.s)).map((k) => ({ ...k, s: BEHOUD.indexOf(k.s) }));

export const WatAlsCaesar = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
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
    {/* zachte whoosh op elke knip */}
    {STARTS.slice(1).map((st, i) => (
      <Sequence key={`w${i}`} from={st - 12} durationInFrames={24}>
        <Audio src={sfx('whoosh')} volume={0.1} />
      </Sequence>
    ))}
    {KLANKEN.map((k, i) => {
      const van = STARTS[k.s] + (k.bij ?? 0);
      const lengte = k.lus ? DUUR[k.s] : 60;
      return (
        <Sequence key={`k${i}`} from={van} durationInFrames={lengte}>
          <Audio
            src={sfx(k.src)}
            loop={k.lus}
            volume={(f) => (k.lus ? interpolate(f, [0, 8, lengte - 8, lengte], [0, k.vol, k.vol, 0], { extrapolateRight: 'clamp' }) : k.vol)}
          />
        </Sequence>
      );
    })}
    {muziek && (
      <Audio
        src={staticFile('lokaal/amour-plastique.mp3')}
        startFrom={Math.round(muziekVanaf * 30)}
        volume={(f) => interpolate(f, [0, 10, CAESAR_DUUR - 45, CAESAR_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
);
