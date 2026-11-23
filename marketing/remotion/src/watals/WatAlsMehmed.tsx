import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Banier, Binnenlicht, Camera, Daglicht, Fakkel, Galei, Grond, Heuvels, Lucht, Nachtlicht, Avondlicht, Paard, Rook, Scherpte, Soldaat, Tent, Vuur, Zee, Zon } from './Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs, Zwaard, type V3 } from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';
import {
  BYZANTIJN,
  Burcht,
  Ezel,
  GrootKanon,
  Huizen,
  Janitsaren,
  Kavuk,
  Koepelgebouw,
  MEHMED,
  MEHMED_KIND,
  MURAD,
  Os,
  Rolstammen,
  SCHILDER,
  Stadsmuur,
} from './MehmedKit';

/**
 * "What if you were Mehmed II?" — 18 scènes + afsluiter, alles in code. Opbouw als WatAlsKhalid.
 * Les uit Baibars (2026-11-22): frame 1 toont de held op zijn machtigst (te paard voor de muren), geen titelkaart
 * en geen huilend kind. Mehmed draagt overal zijn rode kaftan en de witte tulband met rode top (Bellini, 1480).
 * Bewust niet in beeld: de dood van keizer Constantijn XI, de omzetting van de Hagia Sophia, de broedermoordwet.
 * Bronnen: marketing/1.videos/2.gepost/07-mehmed-short/upload/post.md.
 */

const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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

const MH = { kleding: MEHMED, baard: true, hoofdExtra: <Kavuk /> };
const MH_KIND = { kleding: MEHMED_KIND, hoofdExtra: <Kavuk />, scale: 0.72 };
const MU = { kleding: MURAD, baard: true, haar: 'grijs' as const, hoofdExtra: <Kavuk kap="#2E5A3A" /> };
const WIT_PAARD = { kleur: '#ECE6DA', manen: '#CFC6B6', dek: '#9E1F25' };
const MUUR = '#C9B392';

/** Troonzaal: achterwand met bogen, tapijt, troon op een verhoging. */
const Troonzaal = () => (
  <>
    <Grond kleur="#6A4A30" />
    <Blok p={[0, 3, -3]} s={[14, 6, 0.3]} c="#D9C4A0" rough={0.95} />
    {[-4.5, -1.5, 1.5, 4.5].map((x) => (
      <group key={x}>
        <Blok p={[x, 2.4, -2.82]} s={[1.6, 3.2, 0.05]} c="#2E4A6A" />
        <Blok p={[x, 4.1, -2.82]} s={[1.0, 0.4, 0.05]} c="#2E4A6A" />
      </group>
    ))}
    <Blok p={[0, 0.03, 0.5]} s={[3.2, 0.04, 6]} c="#8E1F25" rough={1} />
    <Blok p={[0, 0.15, -1.6]} s={[3.6, 0.3, 2]} c="#B8912F" metal={0.4} rough={0.4} />
    <Blok p={[0, 0.8, -2.2]} s={[1.5, 1.0, 0.9]} c="#7A1620" />
    <Blok p={[0, 2.0, -2.55]} s={[1.5, 2.2, 0.2]} c="#B8912F" metal={0.6} rough={0.3} />
    <Blok p={[0, 3.2, -2.55]} s={[0.8, 0.3, 0.2]} c="#D8A945" metal={0.6} rough={0.3} />
  </>
);

/* ---------- 1: de haak ---------- */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 3.2, 0]}
      scherpte={2.5}
      mist={['#F0C890', 30, 160]}
      teller={{ label: 'Age', waarde: '21', pil: 'Constantinople, 1453' }}
      tekst={[{ t: 'What if you were ' }, { t: 'Mehmed II', accent: true }, { t: '?' }]}
    >
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[-30, 10, -120]} grootte={12} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 140, 6.5, 4.6), ease(f, 0, 140, 2.4, 2.8), ease(f, 0, 140, 12, 10)]} kijk={[0, 3.3, 0]} fov={34} />
      <Daglicht zon={[-12, 10, 6]} kleur="#FFD8A0" />
      <Grond kleur="#B39A6A" />
      <Stadsmuur position={[-6, 0, -34]} lengte={70} h={6} torens={8} kleur={MUUR} />
      <Koepelgebouw position={[-8, 0, -52]} schaal={1.1} />
      <Janitsaren rijen={3} kolommen={9} position={[-9, 0, -9]} t={t} />
      <Banier position={[-1.9, 0, -0.6]} kleur="#9E1F25" t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} {...WIT_PAARD} t={t} ruiter={<Figuur {...MH} pose={{ hoofd: [0, -0.8, 0], armR: wijs(1.3) }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

/* ---------- 2-5: Edirne, twee keer sultan ---------- */

const S2 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 1.6, 0]}
      scherpte={3}
      mist={['#EAD3A4', 20, 120]}
      teller={{ label: 'Born', waarde: 'Edirne', pil: '1432' }}
      tekst={[{ t: "you are born a sultan's " }, { t: 'son', accent: true }]}
    >
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 120, 3.4, 2.6), 2.8, ease(f, 0, 120, 10.5, 9.5)]} kijk={[0, 2.5, 0]} fov={34} />
      <Daglicht zon={[8, 12, 10]} />
      <Grond kleur="#D6CAB2" />
      <Blok p={[0, 3, -5]} s={[18, 6, 0.4]} c="#E6D8BE" rough={0.95} />
      {[-6, -3, 0, 3, 6].map((x) => <Blok key={x} p={[x, 2.2, -4.78]} s={[1.6, 3.4, 0.05]} c="#5A3A2A" />)}
      <Koepelgebouw position={[6, 0, -16]} schaal={0.7} />
      <Figuur {...MU} position={[-0.9, 0, -0.4]} rotation={[0, 0.35, 0]} pose={{ armR: wijs(0.9), hoofd: [0.2, 0.3, 0] }} />
      <Figuur {...MH_KIND} position={[0.7, 0, 0.3]} rotation={[0, -0.25, 0]} pose={{ mond: 'lach', armR: omhoog() }} inHand={<Zwaard />} />
    </Scène>
  );
};

const S3 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 1.5, -1.4]}
      scherpte={3.5}
      mist={['#2A1E16', 8, 30]}
      teller={{ label: 'Age', waarde: '12', pil: '1444' }}
      tekst={[{ t: 'at twelve, your father hands you the ' }, { t: 'throne', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 1.6, 1.0), ease(f, 0, 120, 2.4, 2.1), ease(f, 0, 120, 8.4, 7.2)]} kijk={[0, 2.2, -1.4]} fov={34} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFD6A0" />
      <pointLight position={[0, 3, 1]} intensity={6} distance={9} color="#FFB870" />
      <Troonzaal />
      <Figuur {...MH_KIND} position={[0, 0.3, -1.4]} pose={{ ...ARMEN_GEKRUIST, hoofd: [-0.1, 0, 0] }} />
      {[-2.2, 2.2].map((x, i) => (
        <Figuur key={x} kleding={{ huid: '#C9966C', haar: '#1E1610', tuniek: '#3E4F7A', rok: '#3E4F7A', schoenen: '#3A2A1C', riem: '#E2D6BC' }} hoofddeksel="tulband" baard position={[x, 0, 0.6]} rotation={[0.35, i ? -0.9 : 0.9, 0]} />
      ))}
    </Scène>
  );
};

const S4 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0.6, 1.6, -0.6]}
      scherpte={3.5}
      mist={['#2A1E16', 8, 30]}
      teller={{ label: 'Age', waarde: '14', pil: '1446' }}
      tekst={[{ t: 'two years later, he takes it ' }, { t: 'back', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 3.0, 2.4), 2.6, ease(f, 0, 120, 9.4, 8.4)]} kijk={[0.4, 2.5, -1]} fov={34} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFD6A0" />
      <pointLight position={[0, 3, 1]} intensity={6} distance={9} color="#FFB870" />
      <Troonzaal />
      <Figuur {...MU} position={[0, 0.3, -1.4]} pose={{ armR: wijs(0.6), wenk: 0.4 }} />
      <Figuur {...MH_KIND} scale={0.8} position={[1.8, 0, 0.2]} rotation={[0, -0.6, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7, hoofd: [0.15, 0, 0] }} />
    </Scène>
  );
};

const S5 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.2, -1.4]}
      scherpte={3.5}
      mist={['#2A1E16', 8, 30]}
      teller={{ label: 'Age', waarde: '18', pil: '1451' }}
      tekst={[{ t: "at eighteen, it's yours for " }, { t: 'good', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 120, 0.4, 0), ease(f, 0, 120, 1.8, 2.2), ease(f, 0, 120, 9.8, 8.6)]} kijk={[0, 3.0, -1.4]} fov={34} />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFD6A0" />
      <pointLight position={[0, 3.5, 1]} intensity={7} distance={9} color="#FFB870" />
      <Troonzaal />
      <Figuur {...MH} position={[0, 0.3, -1.4]} pose={{ armR: { schouder: [-0.6, 0, -0.5], elleboog: [0, -0.3] }, armL: { schouder: [-0.6, 0, 0.5], elleboog: [0, -0.3] }, wenk: 0.3 }} />
      {[-2.2, 2.2].map((x, i) => (
        <Figuur key={x} kleding={{ huid: '#C9966C', haar: '#1E1610', tuniek: '#3E4F7A', rok: '#3E4F7A', schoenen: '#3A2A1C', riem: '#E2D6BC' }} hoofddeksel="tulband" baard position={[x, 0, 0.6]} rotation={[0.45, i ? -0.9 : 0.9, 0]} />
      ))}
    </Scène>
  );
};

/* ---------- 6-8: de stad, de burcht, het kanon ---------- */

const S6 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 4, -16]}
      scherpte={2}
      mist={['#E8D2A8', 30, 150]}
      teller={{ label: 'Land walls', waarde: '1,000 years', pil: 'never broken' }}
      tekst={[{ t: "Constantinople's walls have held for " }, { t: '1,000 years', accent: true }]}
    >
      <Lucht boven="#7FA8D2" horizon="#F1DDB4" />
      <Camera pos={[ease(f, 0, 130, 3.4, 2.4), ease(f, 0, 130, 4.4, 4.8), ease(f, 0, 130, 12, 10)]} kijk={[-0.5, 5.6, -16]} fov={38} />
      <Daglicht zon={[10, 16, 12]} />
      <Grond kleur="#A89A62" />
      <Stadsmuur position={[0, 0, -16]} lengte={70} h={7} torens={9} kleur={MUUR} />
      <Stadsmuur position={[0, 0, -21]} lengte={74} h={10} torens={9} kleur="#BDA684" />
      <Koepelgebouw position={[-4, 0, -42]} schaal={1.3} />
      <Huizen position={[0, 0, -32]} n={24} breed={60} diep={12} />
      {[-9, -5, -1, 3, 7].map((x, i) => <Soldaat key={i} position={[x, 7.0, -15.6]} {...BYZANTIJN} t={t} />)}
      <Paard position={[-2.6, 0, 0]} rotation={[0, -0.5, 0]} {...WIT_PAARD} t={t} ruiter={<Figuur {...MH} pose={{ hoofd: [-0.2, 0.6, 0] }} />} />
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const maanden = Math.max(1, Math.min(4, Math.ceil(lin(f, 5, 95, 0.01, 4))));
  return (
    <Scène
      focus={[0, 4, -6]}
      scherpte={2.5}
      mist={['#D9E2E6', 30, 150]}
      teller={{ label: 'Months', waarde: `${maanden}`, pil: 'Rumeli Hisarı, 1452' }}
      tekst={[{ t: 'you build a fortress on the Bosphorus in four ' }, { t: 'months', accent: true }]}
    >
      <Lucht boven="#7FA8D2" horizon="#E6EEF0" />
      <Camera pos={[ease(f, 0, 130, 24, 20), ease(f, 0, 130, 9.0, 8.0), ease(f, 0, 130, 30, 25)]} kijk={[0, 4, -4]} fov={36} />
      <Daglicht zon={[10, 16, 12]} />
      <Grond kleur="#7E8E52" />
      <group position={[0, -0.05, 14]}>
        <Zee t={t} kleur="#3A7AA0" />
      </group>
      <Heuvels kleur="#6E7E4A" z={-40} />
      <Burcht position={[0, 0, -6]} groei={ease(f, 0, 100, 0.25, 1)} />
      {[-4, -1.5, 1.5, 4].map((x, i) => (
        <Figuur key={i} kleding={{ huid: '#C9966C', haar: '#1E1610', tuniek: '#C9B48A', rok: '#B8A278', schoenen: '#5A3B24' }} position={[x, 0, 1.2 + (i % 2)]} rotation={[0, i * 0.8, 0]} pose={{ armR: { schouder: [-1.4 + Math.sin(t * 6 + i) * 0.4, 0, -0.1] } }} />
      ))}
      <Figuur {...MH} position={[7.5, 0, 4.5]} rotation={[0, -0.6, 0]} pose={{ armR: wijs(1.2) }} />
    </Scène>
  );
};

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 130, -3, 1);
  const ossen = Math.round(lin(f, 5, 100, 0, 60));
  return (
    <Scène
      focus={[x, 1.6, 0]}
      scherpte={3}
      mist={['#DCC9A4', 20, 110]}
      teller={{ label: 'Oxen', waarde: `${ossen}`, pil: 'to pull one cannon' }}
      tekst={[{ t: 'an engineer named Orban casts you a giant ' }, { t: 'cannon', accent: true }]}
    >
      <Lucht boven="#94B4D2" horizon="#EAD8B2" />
      <Camera pos={[x + 13, 3.4, 9]} kijk={[x + 3.5, 1.6, 0]} fov={36} />
      <Daglicht zon={[8, 14, 8]} />
      <Grond kleur="#B9A06A" />
      <Heuvels kleur="#8A7A56" z={-50} />
      <group position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <GrootKanon position={[0, 0, 0]} lengte={5.2} />
        {[0, 1, 2].map((r) => [-0.75, 0.75].map((dx) => <Os key={`${r}${dx}`} position={[dx, 0, -4.8 - r * 2.6]} t={t + r} kleur={r % 2 ? '#6A4A30' : '#8A6A48'} />))}
      </group>
      <Figuur kleding={{ huid: '#E2B48E', haar: '#8A6A40', tuniek: '#3E5A3A', rok: '#3E5A3A', benen: '#4A3A2A', schoenen: '#3A2A1C', riem: '#5A3B24' }} position={[x + 3.0, 0, -3.0]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.0) }} />
      <Figuur {...MH} position={[x + 1.4, 0, -3.2]} rotation={[0, 0.8, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Scène>
  );
};

/* ---------- 9-12: het beleg ---------- */

const S9 = () => {
  const f = useCurrentFrame();
  const fase = (f % 60) / 60;
  const schot = f > 20 ? (fase < 0.6 ? fase / 0.6 : 0) : 0;
  const dag = Math.max(1, Math.round(lin(f, 5, 110, 1, 52)));
  return (
    <Scène
      focus={[0, 2.5, 0]}
      scherpte={3}
      mist={['#C9B48E', 20, 90]}
      teller={{ label: 'Day', waarde: `${dag}`, pil: 'from 6 April 1453' }}
      tekst={[{ t: 'you fire at the walls, day after ' }, { t: 'day', accent: true }]}
    >
      <Lucht boven="#A2AEB8" horizon="#E2D2B0" />
      <Camera pos={[ease(f, 0, 130, 5.5, 4.6), ease(f, 0, 130, 2.8, 3.2), ease(f, 0, 130, 9.5, 8.6)]} kijk={[-0.5, 3.2, -6]} fov={36} />
      <Daglicht zon={[6, 12, 8]} kracht={1.8} />
      <Grond kleur="#A89070" />
      <Stadsmuur position={[0, 0, -26]} lengte={60} h={7} torens={7} kleur={MUUR} schade={f > 70 ? 0 : -1} />
      <Rook position={[0, 6, -24]} t={f / 30} />
      <GrootKanon position={[0, 0, 0]} schot={schot} lengte={5.2} />
      <Figuur {...MH} position={[3.0, 0, 0.6]} rotation={[0, -0.5, 0]} pose={{ armR: wijs(1.4), hoofd: [0, -0.5, 0] }} />
      {[-2, -2.8].map((xx, i) => <Figuur key={i} kleding={{ huid: '#C9966C', haar: '#1E1610', tuniek: '#A8322B', benen: '#E2D6BC', schoenen: '#C9A040' }} position={[xx, 0, 1.4 + i]} rotation={[0, 0.8, 0]} pose={{ hoofd: [0.2, 0, 0] }} />)}
    </Scène>
  );
};

const Kettingspan = ({ z, t }: { z: number; t: number }) => (
  <>
    {Array.from({ length: 70 }, (_, i) => {
      const x = -28 + i * 0.8;
      return <Blok key={i} p={[x, 0.15 + Math.sin(t * 1.5 + i * 0.4) * 0.05, z]} s={[0.9, 0.28, i % 2 ? 0.3 : 0.1]} c="#4A4C52" metal={0.6} rough={0.4} />;
    })}
  </>
);

const S10 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 1, -8]}
      scherpte={3}
      mist={['#C8D4DA', 25, 120]}
      teller={{ label: 'Golden Horn', waarde: 'Closed', pil: 'a chain across the harbour' }}
      tekst={[{ t: 'a giant chain locks your ships ' }, { t: 'out', accent: true }]}
    >
      <Lucht boven="#8FAAC8" horizon="#DDE6EA" />
      <Camera pos={[ease(f, 0, 130, 3, 1.5), ease(f, 0, 130, 4.4, 3.8), ease(f, 0, 130, 10, 8)]} kijk={[0, 1, -8]} fov={36} />
      <Daglicht zon={[10, 14, 6]} />
      <Zee t={t} kleur="#2F6E9C" />
      <Kettingspan z={-8} t={t} />
      <Koepelgebouw position={[-10, 0, -40]} schaal={1.1} />
      <Huizen position={[-6, 0, -34]} n={20} breed={40} diep={8} zaad={3} />
      <Stadsmuur position={[-8, 0, -28]} lengte={36} h={4} torens={5} kleur={MUUR} />
      {[-6, 6].map((x, i) => <Galei key={x} position={[x, 0, -16]} rotation={[0, 0, 0]} deining={t + i} schilden="#6B2D5C" />)}
      <Galei position={[-2.5, 0, 1]} deining={t} schilden="#9E1F25" />
    </Scène>
  );
};

const S11 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 130, 2, -2.5);
  const schepen = Math.round(lin(f, 5, 105, 1, 70));
  return (
    <Scène
      focus={[0, 2, z]}
      scherpte={3}
      mist={['#D8E0C8', 20, 110]}
      teller={{ label: 'Ships', waarde: `~${schepen}`, pil: '22 April 1453' }}
      tekst={[{ t: 'so you drag them over a ' }, { t: 'hill', accent: true }]}
    >
      <Lucht boven="#86AEDA" horizon="#EEF0DC" />
      <Camera pos={[ease(f, 0, 130, 17, 15), ease(f, 0, 130, 7.5, 6.5), z + 11]} kijk={[0, 1.2, z - 3]} fov={36} />
      <Daglicht zon={[8, 14, 8]} />
      <group rotation={[-0.12, 0, 0]}>
        <Grond kleur="#7E8E52" />
        <Rolstammen position={[0, 0, -10]} n={18} rol={t * 3} />
        <Galei position={[0, 0.85, z]} mast />
        {[-1, 1].map((k) =>
          [0, 1, 2].map((i) => (
            <Figuur
              key={`${k}${i}`}
              kleding={{ huid: '#C9966C', haar: '#1E1610', tuniek: '#A8322B', benen: '#E2D6BC', schoenen: '#C9A040' }}
              position={[k * 2.2, 0, z - 6.5 - i * 1.4]}
              rotation={[0.25, Math.PI, 0]}
              pose={{ armR: { schouder: [-1.2, 0, -0.1] }, armL: { schouder: [-1.2, 0, 0.1] } }}
            />
          )),
        )}
        <Figuur {...MH} position={[4.2, 0, z - 2]} rotation={[0, -1.0, 0]} pose={{ armR: wijs(1.5), mond: 'open' }} />
      </group>
      <Galei position={[-9, 0.6, -20]} rotation={[-0.12, 0.2, 0]} mast />
    </Scène>
  );
};

const S12 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.6, -8]}
      scherpte={3}
      mist={['#141A2A', 14, 60]}
      teller={{ label: 'Day', waarde: '53', pil: '29 May 1453' }}
      tekst={[{ t: 'day 53. the final ' }, { t: 'attack', accent: true }]}
    >
      <Lucht boven="#0B0F1E" horizon="#3A2A3A" />
      <Camera pos={[ease(f, 0, 130, 5, 3.6), ease(f, 0, 130, 3.0, 3.4), ease(f, 0, 130, 8, 5.6)]} kijk={[0, 3.4, -14]} fov={36} />
      <Nachtlicht />
      <Grond kleur="#3A3428" />
      <Stadsmuur position={[0, 0, -18]} lengte={60} h={7} torens={7} kleur="#8E7E66" schade={0} />
      {[-12, -6, 6, 12].map((x, i) => <Vuur key={x} position={[x, 7.2, -17.4]} t={t + i} grootte={1.4} />)}
      {[-3, 3].map((x, i) => <Fakkel key={x} position={[x, 0, -3 - i]} t={t + i} />)}
      <Vuur position={[0, 0.5, -16.5]} t={t} grootte={2.2} />
      <pointLight position={[0, 3, -14]} intensity={30} distance={22} color="#FF8A3A" />
      <Janitsaren rijen={4} kolommen={10} position={[0, 0, lin(f, 0, 130, -8, -11)]} rotation={[0, Math.PI, 0]} t={t * 1.6} />
      <Banier position={[-1.4, 0, -6]} kleur="#9E1F25" t={t} />
    </Scène>
  );
};

/* ---------- 13-14: de stad is van jou ---------- */

const S13 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const z = lin(f, 0, 140, -2, 1.5);
  return (
    <Scène
      focus={[0, 3.2, z]}
      scherpte={2.5}
      mist={['#F2C890', 25, 140]}
      teller={{ label: 'Age', waarde: '21', pil: '29 May 1453' }}
      tekst={[{ t: 'at twenty-one, Constantinople is ' }, { t: 'yours', accent: true }]}
    >
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[0, 14, -120]} grootte={12} kleur="#FFE0A0" />
      <Camera pos={[ease(f, 0, 140, -3.5, -2.6), ease(f, 0, 140, 2.4, 2.8), z + ease(f, 0, 140, 11, 10)]} kijk={[0, 4.0, z]} fov={34} />
      <Daglicht zon={[6, 14, 10]} kleur="#FFE0B0" />
      <Grond kleur="#C9B48E" />
      <Koepelgebouw position={[3, 0, -36]} schaal={1.5} />
      <Huizen position={[0, 0, -18]} n={18} breed={40} diep={8} zaad={5} />
      <Janitsaren rijen={2} kolommen={4} afstand={1.2} position={[-6.5, 0, -4]} rotation={[0, 0.9, 0]} t={t} juich />
      <Janitsaren rijen={2} kolommen={4} afstand={1.2} position={[6.5, 0, -4]} rotation={[0, -0.9, 0]} t={t} juich />
      <Paard position={[0, 0, z]} rotation={[0, Math.PI - 0.75, 0]} {...WIT_PAARD} t={t} loopt ruiter={<Figuur {...MH} pose={{ armR: omhoog(), mond: 'lach' }} />} />
    </Scène>
  );
};

const S14 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.6, 0]}
      scherpte={3}
      mist={['#C9603A', 20, 120]}
      teller={{ label: 'Title', waarde: 'Caesar of Rome', pil: 'Kayser-i Rûm' }}
      tekst={[{ t: 'you call yourself Caesar of ' }, { t: 'Rome', accent: true }]}
    >
      <Lucht boven="#4E3159" horizon="#F08A3C" onder="#3A2216" />
      <Zon position={[18, 8, -120]} grootte={14} kleur="#FFC77A" />
      <Camera pos={[ease(f, 0, 130, 2.2, 1.6), ease(f, 0, 130, 2.4, 2.6), ease(f, 0, 130, 8.6, 7.4)]} kijk={[0, 3.3, 0]} fov={34} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.6]} />
      <Grond kleur="#6A4A30" />
      <Koepelgebouw position={[-6, 0, -30]} schaal={1.3} kleur="#C9A87A" />
      <Banier position={[-1.6, 0, -0.8]} kleur="#9E1F25" t={f / 30} />
      <Figuur {...MH} position={[0, 0, 0]} rotation={[0, -0.2, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [-0.12, 0, 0] }} />
    </Scène>
  );
};

/* ---------- 15-18: Belgrado, Bellini, het einde, de erfenis ---------- */

const S15 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 130, 1.5, -2.5);
  return (
    <Scène
      focus={[x, 2.6, 0]}
      scherpte={3}
      mist={['#7E7A74', 10, 60]}
      teller={{ label: 'Belgrade', waarde: '1456', pil: 'John Hunyadi' }}
      tekst={[{ t: 'not every siege works. at Belgrade you are ' }, { t: 'wounded', accent: true }]}
    >
      <Lucht boven="#6E747C" horizon="#B4ACA0" />
      <Camera pos={[x - 3.5, 3.0, 10.5]} kijk={[x - 0.5, 2.6, 0]} fov={36} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.4} kleur="#E8E0D4" />
      <Grond kleur="#6E6448" />
      <Stadsmuur position={[6, 0, -24]} lengte={40} h={6} torens={5} kleur="#9A8E7A" />
      <Rook position={[2, 3, -16]} t={t} />
      <Rook position={[-6, 2, -12]} t={t + 2} />
      <Paard position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} {...WIT_PAARD} t={t} loopt ruiter={<Figuur {...MH} pose={{ wenk: -0.5, hoofd: [0.25, 0.4, 0], armL: { schouder: [-0.5, 0, 0.3], elleboog: [0.6, -0.6] } }} />} />
    </Scène>
  );
};

const S16 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.2, 0]}
      scherpte={3.5}
      mist={['#2A1E16', 8, 30]}
      teller={{ label: 'Portrait', waarde: '1480', pil: 'Gentile Bellini, Venice' }}
      tekst={[{ t: 'a painter from Venice paints your ' }, { t: 'portrait', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 130, 0.8, 0.3), 2.7, ease(f, 0, 130, 11.5, 10.5)]} kijk={[0.2, 2.5, 0]} fov={34} />
      <Binnenlicht zon={[-4, 7, 5]} kleur="#FFDDB0" />
      <pointLight position={[-2, 3, 2]} intensity={6} distance={9} color="#FFC080" />
      <Grond kleur="#6A4A30" />
      <Blok p={[0, 3, -3]} s={[14, 6, 0.3]} c="#C9B48E" rough={0.95} />
      <Blok p={[-3.6, 2.4, -2.82]} s={[1.4, 2.4, 0.05]} c="#B8C6CE" emissive="#6A8090" />
      <Figuur {...MH} position={[-1.1, 0, -1.2]} rotation={[0, 0.4, 0]} pose={{ armR: { schouder: [-0.3, 0, -0.2], elleboog: [0.9, -0.6] }, armL: { schouder: [-0.3, 0, 0.2], elleboog: [-0.9, -0.6] } }} />
      <Ezel position={[0.8, 0, 0.9]} rotation={[0, -0.45, 0]} klaar={lin(f, 10, 110, 0, 1)} />
      <Figuur kleding={SCHILDER} haar="lang" position={[1.8, 0, 0.1]} rotation={[0, -1.9, 0]} pose={{ armR: { schouder: [-1.3 + Math.sin(f / 5) * 0.15, 0, -0.2], elleboog: [0, -0.2] } }} />
    </Scène>
  );
};

const S17 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 1.6, -1]}
      scherpte={3.5}
      mist={['#141A2A', 10, 50]}
      teller={{ label: 'Died', waarde: '1481', pil: 'age 49, on campaign' }}
      tekst={[{ t: 'you die on campaign, at ' }, { t: 'forty-nine', accent: true }]}
    >
      <Lucht boven="#0B0F1E" horizon="#28304A" />
      <Camera pos={[ease(f, 0, 130, 2.0, 1.2), ease(f, 0, 130, 4.0, 3.6), ease(f, 0, 130, 17, 15)]} kijk={[0, 2.6, -1.5]} fov={34} />
      <Nachtlicht />
      <Grond kleur="#2E2A22" />
      <Tent position={[0, 0, -1.5]} kleur="#9E1F25" />
      <Tent position={[-7, 0, -8]} kleur="#D9C8A4" />
      <Tent position={[6, 0, -9]} kleur="#D9C8A4" />
      <Fakkel position={[-2.2, 0, 0.6]} t={t} />
      <Fakkel position={[2.2, 0, 0.6]} t={t + 1} />
      <Banier position={[3.4, 0, -0.6]} kleur="#9E1F25" t={t * 0.5} />
      {[-3.0, 3.0].map((x) => <Figuur key={x} kleding={{ huid: '#C9966C', haar: '#1E1610', tuniek: '#A8322B', benen: '#E2D6BC', schoenen: '#C9A040' }} position={[x, 0, 1.4]} rotation={[0.3, 0, 0]} pose={{ hoofd: [0.45, 0, 0] }} />)}
    </Scène>
  );
};

const S18 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 6, -26]}
      scherpte={2}
      mist={['#E89A60', 40, 200]}
      teller={{ label: 'Capital', waarde: 'Istanbul', pil: '1453 – 1923' }}
      tekst={[{ t: "your city stays the empire's capital for " }, { t: '470 years', accent: true }]}
    >
      <Lucht boven="#4E3159" horizon="#F5A05A" onder="#3A2216" />
      <Zon position={[-20, 6, -150]} grootte={16} kleur="#FFC77A" />
      <Camera pos={[ease(f, 0, 200, 18, 13), ease(f, 0, 200, 10, 9), ease(f, 0, 200, 26, 20)]} kijk={[0, 4, -28]} fov={38} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.6]} />
      <Zee t={t} kleur="#5A5A7A" />
      <group position={[0, 0.2, -26]}>
        <Blok p={[0, 0.6, 0]} s={[90, 1.2, 30]} c="#8A7A5A" />
        <group position={[0, 1.2, 0]}>
          <Koepelgebouw position={[-4, 0, -2]} schaal={1.1} kleur="#D9B88A" />
          <Koepelgebouw position={[14, 0, -6]} schaal={0.8} kleur="#D9B88A" />
          <Huizen position={[0, 0, 4]} n={30} breed={70} diep={10} zaad={7} />
          <Stadsmuur position={[0, 0, 13]} lengte={80} h={3} torens={10} kleur={MUUR} />
        </group>
      </group>
      <Galei position={[8, 0, -4]} rotation={[0, 0.8, 0]} deining={t} schilden="#9E1F25" />
    </Scène>
  );
};

/* ---------- montage ---------- */

const ALLE_SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18];
const ALLE_DUUR = [140, 115, 120, 115, 115, 130, 125, 130, 130, 120, 130, 120, 135, 120, 125, 125, 125, 210];
// Shorts/Reels altijd onder de minuut (max MAX_SHORT_FRAMES frames = 58 s): langer en de app-muziek stopt op 1:00 of
// YouTube blokkeert de short. Deze scènes vallen daarom weg (0-based); de volledige montage staat in ALLE_*.
const WEG = [4, 6, 13, 14, 15];
const BEHOUD = ALLE_SCÈNES.map((_, i) => i).filter((i) => !WEG.includes(i));
const SCÈNES = BEHOUD.map((i) => ALLE_SCÈNES[i]);
const DUUR = BEHOUD.map((i) => ALLE_DUUR[i]);
const STARTS = DUUR.map((_, i) => DUUR.slice(0, i).reduce((x, y) => x + y, 0));
export const MEHMED_DUUR = DUUR.reduce((a, b) => a + b, 0);
if (MEHMED_DUUR > MAX_SHORT_FRAMES) throw new Error(`MEHMED_DUUR is ${MEHMED_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = MEHMED_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const ALLE_KLANKEN: Klank[] = [
  { s: 0, src: 'wind', vol: 0.12, lus: true },
  { s: 0, bij: 4, src: 'inslag', vol: 0.2 },
  { s: 1, src: 'wind', vol: 0.06, lus: true },
  { s: 2, src: 'vuur', vol: 0.05, lus: true },
  { s: 2, bij: 30, src: 'glans', vol: 0.12 },
  { s: 3, src: 'vuur', vol: 0.05, lus: true },
  { s: 3, bij: 40, src: 'val', vol: 0.1 },
  { s: 4, src: 'vuur', vol: 0.05, lus: true },
  { s: 4, bij: 20, src: 'glans', vol: 0.14 },
  { s: 5, src: 'wind', vol: 0.1, lus: true },
  { s: 6, src: 'zee', vol: 0.12, lus: true },
  ...[30, 55, 80, 100].map((bij) => ({ s: 6, bij, src: 'tik', vol: 0.18 })),
  { s: 7, src: 'wind', vol: 0.08, lus: true },
  { s: 7, bij: 60, src: 'inslag', vol: 0.12 },
  { s: 8, src: 'menigte', vol: 0.08, lus: true },
  ...[20, 80].map((bij) => ({ s: 8, bij, src: 'inslag', vol: 0.22 })),
  { s: 9, src: 'zee', vol: 0.16, lus: true },
  { s: 9, bij: 30, src: 'val', vol: 0.12 },
  { s: 10, src: 'menigte', vol: 0.1, lus: true },
  { s: 10, bij: 50, src: 'glans', vol: 0.12 },
  { s: 11, src: 'vuur', vol: 0.12, lus: true },
  { s: 11, src: 'menigte', vol: 0.12, lus: true },
  { s: 11, bij: 30, src: 'inslag', vol: 0.18 },
  { s: 12, src: 'menigte', vol: 0.16, lus: true },
  { s: 12, bij: 10, src: 'glans', vol: 0.16 },
  { s: 13, src: 'wind', vol: 0.06, lus: true },
  { s: 13, bij: 20, src: 'munt', vol: 0.16 },
  { s: 14, src: 'wind', vol: 0.12, lus: true },
  { s: 14, bij: 40, src: 'val', vol: 0.14 },
  { s: 15, src: 'vuur', vol: 0.05, lus: true },
  { s: 15, bij: 105, src: 'glans', vol: 0.12 },
  { s: 16, src: 'vuur', vol: 0.06, lus: true },
  { s: 16, bij: 50, src: 'val', vol: 0.1 },
  { s: 17, src: 'zee', vol: 0.08, lus: true },
  { s: 17, bij: 6, src: 'glans', vol: 0.12 },
];
const KLANKEN = ALLE_KLANKEN.filter((k) => BEHOUD.includes(k.s)).map((k) => ({ ...k, s: BEHOUD.indexOf(k.s) }));

export const WatAlsMehmed = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
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
        volume={(fr) => interpolate(fr, [0, 10, MEHMED_DUUR - 45, MEHMED_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
);
