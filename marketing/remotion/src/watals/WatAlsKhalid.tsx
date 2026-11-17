import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
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
  Kameel,
  Ketting,
  Leger,
  Lucht,
  Moskee,
  Nachtlicht,
  Paard,
  Rots,
  Scherpte,
  Soldaat,
  Tent,
  Zon,
} from './Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, KHALID, KHALID_JONG, KRIJGER, omhoog, PERZ, Rol, wijs, Zwaard, type V3 } from './Figuur';
import { Afsluiter } from './Afsluiter';
import { Onderschrift, Teller, Vignet, Watermerk, type Deel } from './Hud';

/**
 * "What if you were Khalid ibn al-Walid?" — 15 scènes + afsluiter, alles in code.
 * Zelfde opbouw als WatAlsCaesar. Bronnen: zie marketing/1.shorts/2.gepost/03-khalid-ibn-al-walid/upload/post.md.
 * Bewust: de Profeet komt nergens in beeld, geen heilige plaatsen, geen standbeeld aan het eind
 * (een moskee met zijn naam). Khalid draagt overal rode tulband, zwarte baard, maliënkolder, donkerrode mantel.
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

const KH = { kleding: KHALID, hoofddeksel: 'tulband' as const, baard: true };
const ZWART_PAARD = { kleur: '#1E1814', manen: '#0E0A08', dek: '#6E1C1C' };
const ZAND = '#D9B57A';
const BYZANTIJN = { kleur: '#6B2D5C', schild: '#D8A945' };

/* ---------- 1-4: Mekka, Uhud, de overstap ---------- */

const S1 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 3.0, 0]}
      scherpte={2.5}
      mist={['#F0C890', 30, 160]}
      teller={{ label: 'Born', waarde: 'Mecca', pil: '6th century' }}
      tekst={[{ t: 'What if you were ' }, { t: 'Khalid ibn al-⁠Walid', accent: true }, { t: '?' }]}
    >
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[-30, 8, -120]} grootte={12} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 140, 6.5, 4.6), ease(f, 0, 140, 2.6, 2.9), ease(f, 0, 140, 12, 10)]} kijk={[0, 3.0, 0]} fov={34} />
      <Daglicht zon={[-12, 10, 6]} kleur="#FFD8A0" />
      <Grond kleur={ZAND} />
      <Duinen />
      <Banier position={[-1.8, 0, -0.6]} kleur="#141210" t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} {...ZWART_PAARD} t={t} ruiter={<Figuur {...KH} pose={{ hoofd: [0, -0.8, 0] }} />} />
    </Scène>
  );
};

const S2 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 120, -2.5, 2.0);
  return (
    <Scène
      focus={[x, 2.6, 0]}
      scherpte={3}
      mist={['#EED6A8', 25, 140]}
      teller={{ label: 'Clan', waarde: 'Makhzum', pil: 'Quraysh, Mecca' }}
      tekst={[{ t: 'you grow up on ' }, { t: 'horseback', accent: true }]}
    >
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[x + 3.5, 2.8, 10]} kijk={[x + 0.5, 2.6, 0]} fov={34} />
      <Daglicht zon={[8, 14, 10]} />
      <Grond kleur={ZAND} />
      <Duinen z={-25} />
      <Paard position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#8A5A32" manen="#3A2418" dek="#A3261F" t={t} loopt ruiter={<Figuur kleding={KHALID_JONG} hoofddeksel="tulband" scale={0.85} pose={{ hoofd: [0, -0.7, 0], mond: 'lach', armR: omhoog() }} />} />
    </Scène>
  );
};

const S3 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 120, -3, 2.5);
  return (
    <Scène
      focus={[x, 2.6, 0]}
      scherpte={3}
      mist={['#DCC9A4', 20, 110]}
      teller={{ label: 'Year', waarde: '625', pil: 'Uhud' }}
      tekst={[{ t: 'you fight against the Muslims. your charge wins the ' }, { t: 'day', accent: true }]}
    >
      <Lucht boven="#94B4D2" horizon="#EAD8B2" />
      <Camera pos={[x + 4, 3.2, 11]} kijk={[x + 0.6, 2.7, 0]} fov={36} />
      <Daglicht zon={[8, 14, 8]} />
      <Grond kleur="#C9A870" />
      <Rots position={[2, -2, -16]} schaal={[10, 7, 6]} kleur="#9A7A56" />
      {[-1.5, 0.5, 2.5, 4.5].map((xx, i) => (
        <Soldaat key={i} position={[xx, lin(f, 0, 120, 3.6, 2.4) - (i % 2) * 0.3, -11.5]} rotation={[0, 0.2, 0]} kleur="#E2D6BC" helm="#8D8A84" schild="#8A6A44" t={t} />
      ))}
      {[[-1.6, -1.2], [-3.0, 1.0], [-4.4, -0.6]].map(([dx, z], i) => (
        <Paard key={i} position={[x + dx, 0, z]} rotation={[0, -Math.PI / 2, 0]} kleur={['#5A3B24', '#3A2A20', '#7A5A3A'][i]} dek="#6E1C1C" t={t + i} loopt ruiter={<Figuur kleding={KRIJGER} hoofddeksel="tulband" baard pose={{ armR: wijs(1.2) }} inHand={<Zwaard />} />} />
      ))}
      <Paard position={[x, 0, 0.3]} rotation={[0, -Math.PI / 2, 0]} {...ZWART_PAARD} t={t} loopt ruiter={<Figuur {...KH} pose={{ hoofd: [0, -0.6, 0], armR: wijs(1.4), mond: 'open' }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

const S4 = () => {
  const f = useCurrentFrame();
  const z = lin(f, 0, 120, 0, -1.6);
  return (
    <Scène
      focus={[0, 2.0, z]}
      scherpte={3}
      mist={['#EAD3A4', 25, 140]}
      teller={{ label: 'Year', waarde: '629', pil: 'to Medina' }}
      tekst={[{ t: 'then you switch ' }, { t: 'sides', accent: true }]}
    >
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 120, 6.0, 5.0), 3.4, z + ease(f, 0, 120, 11.5, 10.5)]} kijk={[-0.6, 2.4, z - 2]} fov={34} />
      <Daglicht zon={[-6, 12, -10]} />
      <Grond kleur={ZAND} />
      <Duinen z={-40} />
      {/* stad aan de horizon */}
      {[-10, -6, -3, 1, 4, 8, 11].map((x, i) => <Blok key={i} p={[x, 1.2 + (i % 3) * 0.6, -48 - (i % 2) * 4]} s={[3, 2.4 + (i % 3) * 1.2, 3]} c="#E6D8BE" />)}
      <Figuur {...KH} position={[0, 0, z]} rotation={[0, Math.PI - 0.6, 0]} pose={{ armR: { schouder: [Math.sin(f / 5) * 0.3, 0, -0.08] }, armL: { schouder: [-Math.sin(f / 5) * 0.3, 0, 0.08] } }} />
    </Scène>
  );
};

/* ---------- 5-7: Mu'tah ---------- */

const S5 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const gevallen = f < 25 ? 1 : f < 50 ? 2 : 3;
  const op = ease(f, 55, 90, 1.2, 0);
  return (
    <Scène
      focus={[0, 2.4, 0]}
      scherpte={3.5}
      mist={['#C9B48E', 14, 70]}
      teller={{ label: 'Commanders fallen', waarde: `${gevallen}`, pil: "Mu'tah, 629" }}
      tekst={[{ t: 'three commanders fall. you take the ' }, { t: 'banner', accent: true }]}
    >
      <Lucht boven="#A2AEB8" horizon="#E2D2B0" />
      <Camera pos={[ease(f, 0, 120, 3.0, 2.2), 2.9, ease(f, 0, 120, 10.0, 8.8)]} kijk={[0, 2.8, 0]} fov={36} />
      <Daglicht zon={[6, 12, 8]} kracht={1.8} />
      <Grond kleur="#BFA070" />
      <Leger rijen={3} kolommen={9} position={[0, 0, -12]} {...BYZANTIJN} t={t} />
      <Leger rijen={1} kolommen={5} position={[0, 0, -3]} kleur="#E2D6BC" schild="#8A6A44" rotation={[0, Math.PI, 0]} t={t} />
      <group position={[-0.5, 0, -0.7]} rotation={[0, 0, op]}>
        <Banier position={[0, 0, 0]} kleur="#141210" t={t} />
      </group>
      <Figuur {...KH} position={[0.3, 0, 0.6]} rotation={[0, -0.3, 0]} pose={{ armL: { schouder: [lin(f, 50, 70, 0, -1.6), 0, 0.5], elleboog: [0, -0.2] }, wenk: 0.7, mond: f > 60 ? 'open' : 'dicht' }} />
    </Scène>
  );
};

const Scherf = ({ i }: { i: number }) => (
  <group position={[Math.sin(i * 2.3) * 1.3, 0.05, Math.cos(i * 1.7) * 0.8 + 0.6]} rotation={[0, i * 1.1, 0]}>
    <Blok p={[0, 0, 0]} s={[0.07, 0.05, 0.18]} c="#4A3424" />
    <Blok p={[0, 0, 0.12]} s={[0.24, 0.04, 0.05]} c="#B8912F" metal={0.8} rough={0.3} />
    <Blok p={[0, 0, 0.3 + (i % 3) * 0.06]} s={[0.07, 0.02, 0.3 + (i % 3) * 0.12]} c="#C9CDD2" metal={0.9} rough={0.2} />
  </group>
);

const S6 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const n = Math.min(9, Math.floor(lin(f, 8, 100, 0, 9.99)));
  return (
    <Scène
      focus={[0, 1.9, 0.3]}
      scherpte={4}
      mist={['#B8A07A', 10, 50]}
      teller={{ label: 'Swords broken', waarde: `${n}`, pil: 'Sahih al-Bukhari' }}
      tekst={[{ t: 'nine swords break in your ' }, { t: 'hand', accent: true }]}
    >
      <Lucht boven="#9AA6B0" horizon="#DCC9A4" />
      <Camera pos={[ease(f, 0, 120, 1.8, 1.3), ease(f, 0, 120, 2.6, 2.4), ease(f, 0, 120, 7.4, 6.4)]} kijk={[0, 2.0, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.8} />
      <Grond kleur="#BFA070" />
      <Leger rijen={2} kolommen={7} position={[0, 0, -7]} {...BYZANTIJN} t={t} />
      {Array.from({ length: n }, (_, i) => <Scherf key={i} i={i} />)}
      <Figuur {...KH} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ armR: { schouder: [-2.4 + Math.abs(Math.sin(t * 5)) * 1.2, 0, -0.2], elleboog: [0, -0.3] }, wenk: 0.8, mond: 'open' }} inHand={<Zwaard />} />
    </Scène>
  );
};

const S7 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 120, 0, -2.4);
  return (
    <Scène
      focus={[x + 1.5, 2.8, 0]}
      scherpte={3}
      mist={['#141A2A', 10, 50]}
      teller={{ label: 'Title', waarde: 'Sword of God', pil: 'Sayf Allah' }}
      tekst={[{ t: 'you bring the army home. they call you the Sword of ' }, { t: 'God', accent: true }]}
    >
      <Lucht boven="#0B0F1E" horizon="#28304A" />
      <Camera pos={[x + 5.0, 3.0, 9.5]} kijk={[x + 1.2, 2.7, 0]} fov={34} />
      <Nachtlicht />
      <Grond kleur="#3A3428" />
      {[-3, -5.5, -8, -4.2, -6.8].map((dx, i) => (
        <Soldaat key={i} position={[x + dx, 0, (i % 2) * 1.4 - 1]} rotation={[0, -Math.PI / 2, 0]} kleur="#C9BDA0" schild="#6A5236" t={t} />
      ))}
      {[-4, -7].map((dx, i) => <Fakkel key={i} position={[x + dx, 0, 1.2]} t={t + i} />)}
      <Fakkel position={[x + 2.6, 0, -1]} t={t} />
      <Paard position={[x + 1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} {...ZWART_PAARD} t={t} loopt ruiter={<Figuur {...KH} pose={{ hoofd: [0, 0.9, 0] }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

/* ---------- 8-10: Perzië, de woestijn, Yarmouk ---------- */

const S8 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const xs = [-3.0, -1.8, -0.6, 0.6, 1.8, 3.0];
  return (
    <Scène
      focus={[0, 2.0, -3]}
      scherpte={3}
      mist={['#DCC9A4', 15, 80]}
      teller={{ label: 'Year', waarde: '633', pil: 'Iraq, as al-Tabari tells it' }}
      tekst={[{ t: 'Persian soldiers chain themselves together. you still ' }, { t: 'win', accent: true }]}
    >
      <Lucht boven="#94B4D2" horizon="#EAD8B2" />
      <Camera pos={[ease(f, 0, 120, 4.4, 3.6), ease(f, 0, 120, 4.2, 3.9), ease(f, 0, 120, 10.0, 9.0)]} kijk={[0, 2.0, -3]} fov={36} />
      <Daglicht zon={[6, 14, 10]} />
      <Grond kleur="#C9B07A" />
      {xs.map((x, i) => (
        <Figuur key={i} kleding={PERZ} hoofddeksel="helm" snor position={[x, 0, -3.6]} rotation={[0, 0, 0]} pose={{ wenk: 0.6 }} />
      ))}
      {xs.slice(0, -1).map((x, i) => <Ketting key={i} van={x + 0.3} tot={x + 0.9} y={1.05} z={-3.35} />)}
      <Leger rijen={2} kolommen={8} position={[0, 0, -9]} kleur="#4E3A7A" schild="#B8912F" t={t} />
      <Paard position={[2.6, 0, -0.4]} rotation={[0, 0.64, 0]} {...ZWART_PAARD} t={t} ruiter={<Figuur {...KH} pose={{ armR: wijs(1.5), hoofd: [0, -0.5, 0] }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

const S9 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x = lin(f, 0, 120, -2, 1.6);
  return (
    <Scène
      focus={[x, 2.8, 0]}
      scherpte={2.5}
      mist={['#F2D8A8', 25, 140]}
      teller={{ label: 'Days without water', waarde: `${Math.max(1, Math.min(5, Math.ceil(lin(f, 5, 90, 0.01, 5))))}`, pil: '634, as told' }}
      tekst={[{ t: 'to reach Syria, you march five days without ' }, { t: 'water', accent: true }]}
    >
      <Lucht boven="#9ABCE0" horizon="#FBE3B4" />
      <Zon position={[20, 60, -100]} grootte={10} kleur="#FFF0C0" />
      <Camera pos={[x + 4.5, 3.6, 12]} kijk={[x - 1, 2.6, 0]} fov={36} />
      <Daglicht zon={[4, 20, 6]} kleur="#FFF0D0" kracht={2.4} />
      <Grond kleur="#E2C48C" />
      <Duinen kleur="#E2C48C" z={-24} />
      {[-3.6, -6.6, -9.6, -12.6].map((dx, i) => (
        <group key={i}>
          <Kameel position={[x + dx, 0, (i % 2) * 0.8]} rotation={[0, -Math.PI / 2, 0]} t={t} loopt kleur={['#B88A55', '#C49A64', '#A87C4A', '#BE9460'][i]} />
          <Figuur kleding={KRIJGER} hoofddeksel="tulband" position={[x + dx + 0.9, 0, (i % 2) * 0.8 + 1.0]} rotation={[0, Math.PI / 2, 0]} pose={{ hoofd: [0.3, 0, 0] }} />
        </group>
      ))}
      <Paard position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]} {...ZWART_PAARD} t={t} loopt ruiter={<Figuur {...KH} pose={{ hoofd: [0.15, -0.7, 0], wenk: 0.4 }} />} />
    </Scène>
  );
};

const S10 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 3.0, 0]}
      scherpte={2.5}
      mist={['#D2C2A0', 25, 150]}
      teller={{ label: 'Year', waarde: '636', pil: 'Yarmouk' }}
      tekst={[{ t: 'the Byzantine army is far bigger. you ' }, { t: 'win', accent: true }]}
    >
      <Lucht boven="#8FAAC8" horizon="#E6D6B4" />
      <Camera pos={[ease(f, 0, 120, 5.5, 4.4), ease(f, 0, 120, 4.0, 3.4), ease(f, 0, 120, 11.5, 10)]} kijk={[0, 3.0, -2]} fov={36} />
      <Daglicht zon={[10, 14, 10]} />
      <Grond kleur="#A89A62" />
      {[0, 1, 2].map((k) => <Leger key={k} rijen={3} kolommen={14} position={[(k - 1) * 16, 0, -24 - (k % 2) * 3]} {...BYZANTIJN} t={t + k} />)}
      <Leger rijen={2} kolommen={8} position={[0, 0, -4]} kleur="#E2D6BC" schild="#8A6A44" rotation={[0, Math.PI, 0]} t={t} />
      <Banier position={[-2.2, 0, -0.8]} kleur="#141210" t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} {...ZWART_PAARD} t={t} ruiter={<Figuur {...KH} pose={{ armR: omhoog(), hoofd: [0, -0.8, 0], mond: 'open' }} inHand={<Zwaard />} />} />
    </Scène>
  );
};

/* ---------- 11-13: ontslag en de rest van zijn oorlogen ---------- */

const S11 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 2.1, 0]}
      scherpte={4}
      mist={['#2A1E16', 6, 25]}
      teller={{ label: 'Order', waarde: 'dismissed', pil: 'Caliph Umar' }}
      tekst={[{ t: 'the new caliph takes away your ' }, { t: 'command', accent: true }]}
    >
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[1.6, 2.6, ease(f, 0, 120, 8.6, 7.6)]} kijk={[0, 2.2, 0]} fov={32} />
      <Binnenlicht zon={[3, 6, 4]} kleur="#FFC98A" />
      <pointLight position={[-1.0, 2.0, 1.0]} intensity={5} distance={7} color="#FFA04A" />
      <Grond kleur="#6A5236" />
      <Blok p={[0, 2.5, -2.2]} s={[9, 5, 0.1]} c="#C9B48E" rough={0.95} />
      <Blok p={[-1.2, 0.04, 0.4]} s={[2.4, 0.04, 1.6]} c="#8E2A24" rough={0.95} />
      <Blok p={[-1.1, 0.25, 0.6]} s={[0.22, 0.12, 0.14]} c="#8A6A3A" />
      <Blok p={[-1.1, 0.36, 0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <Figuur
        {...KH}
        position={[0, 0, 0]}
        rotation={[0, 0.15, 0]}
        pose={{ armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] }, armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] }, hoofd: [0.3, 0, 0], wenk: ease(f, 40, 70, 0, -0.8) }}
        inHand={<Rol open={ease(f, 0, 20, 0.3, 1)} />}
      />
    </Scène>
  );
};

const S12 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 2.2, 0.6]}
      scherpte={3}
      mist={['#D2C2A0', 15, 80]}
      teller={{ label: 'Commander', waarde: 'Abu Ubayda', pil: 'you serve under him' }}
      tekst={[{ t: "you keep fighting, under someone else's " }, { t: 'orders', accent: true }]}
    >
      <Lucht boven="#94B4D2" horizon="#EAD8B2" />
      <Camera pos={[ease(f, 0, 120, 3.2, 2.4), 2.8, ease(f, 0, 120, 8.6, 7.4)]} kijk={[0, 2.4, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} />
      <Grond kleur="#B9A06A" />
      <Leger rijen={2} kolommen={8} position={[0, 0, -10]} {...BYZANTIJN} t={t} />
      <Paard position={[-2.2, 0, -1.6]} rotation={[0, -0.6, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#3E6B3A" t={t} ruiter={<Figuur kleding={{ ...KRIJGER, cape: '#3E6B3A' }} hoofddeksel="tulband" baard pose={{ armR: wijs(1.4) }} />} />
      <Soldaat position={[2.0, 0, -0.6]} rotation={[0, Math.PI, 0]} kleur="#E2D6BC" schild="#8A6A44" t={t} />
      <Soldaat position={[-0.4, 0, -2.6]} rotation={[0, Math.PI, 0]} kleur="#E2D6BC" schild="#8A6A44" t={t} />
      <Figuur {...KH} position={[0.6, 0, 0.6]} rotation={[0, 0.2, 0]} pose={{ armR: omhoog(), mond: 'open', wenk: 0.6 }} inHand={<Zwaard />} />
    </Scène>
  );
};

const S13 = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Scène
      focus={[0, 3.0, 0]}
      scherpte={2.5}
      mist={['#C9603A', 14, 90]}
      teller={{ label: 'Battles lost', waarde: '0', pil: 'so tradition says' }}
      tekst={[{ t: 'about a hundred battles. you never ' }, { t: 'lose', accent: true }]}
    >
      <Lucht boven="#4E3159" horizon="#F08A3C" onder="#3A2216" />
      <Zon position={[0, 6, -120]} grootte={14} kleur="#FFC77A" />
      <Camera pos={[ease(f, 0, 120, 4.4, 3.4), ease(f, 0, 120, 2.2, 2.6), ease(f, 0, 120, 11, 9.6)]} kijk={[0, 3.0, 0]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.6]} />
      <Grond kleur="#5A3A22" />
      <Duinen kleur="#6A4628" z={-30} />
      <Banier position={[-1.8, 0, -0.6]} kleur="#141210" t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} {...ZWART_PAARD} t={t} ruiter={<Figuur {...KH} pose={{ hoofd: [0, -0.8, 0], ...ARMEN_GEKRUIST }} />} />
    </Scène>
  );
};

/* ---------- 14-15: Homs ---------- */

const S14 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 1.2, 0]}
      scherpte={4}
      mist={['#241A14', 6, 24]}
      teller={{ label: 'Died', waarde: '642', pil: 'Homs, as tradition tells' }}
      tekst={[{ t: 'you die in your bed. you wanted to die in ' }, { t: 'battle', accent: true }]}
    >
      <Lucht boven="#1E1610" horizon="#3A2A1E" />
      <Camera pos={[ease(f, 0, 120, 2.6, 2.2), ease(f, 0, 120, 6.6, 6.0), ease(f, 0, 120, 4.6, 4.0)]} kijk={[0, 0.8, -0.9]} fov={34} />
      <Binnenlicht zon={[4, 6, 6]} kleur="#FFB870" />
      <pointLight position={[1.5, 2.0, 1.5]} intensity={6} distance={7} color="#FFA050" />
      <Grond kleur="#4A3426" />
      <Blok p={[0, 3, -2.0]} s={[8, 6, 0.3]} c="#7A5A40" />
      <Bed position={[0, 0, 0]} />
      <group position={[0, 0.88, 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <Figuur {...KH} pose={{ ogen: lin(f, 60, 70, 0, 1) > 0.5 ? 'dicht' : 'open', wenk: -0.4 }} />
      </group>
    </Scène>
  );
};

const S15 = () => {
  const f = useCurrentFrame();
  return (
    <Scène
      focus={[0, 4, -6]}
      scherpte={2}
      mist={['#EADFC6', 30, 120]}
      teller={{ label: 'Title', waarde: 'Sword of God', pil: 'Homs, Syria' }}
      tekst={[{ t: 'a mosque in Homs still carries your ' }, { t: 'name', accent: true }]}
    >
      <Lucht boven="#7FAED8" horizon="#F1E3C6" />
      <Camera pos={[ease(f, 0, 160, 10, 8), ease(f, 0, 160, 3.0, 3.6), ease(f, 0, 160, 32, 28)]} kijk={[0, 6.4, -7]} fov={38} />
      <Daglicht zon={[8, 14, 10]} kracht={2.1} />
      <Grond kleur="#D6CAB2" />
      <Blok p={[0, 0.02, 2]} s={[16, 0.04, 14]} c="#E9E0CE" rough={0.8} />
      <Moskee position={[0, 0, -7]} />
    </Scène>
  );
};

/* ---------- montage ---------- */

const SCÈNES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];
const DUUR = [140, 125, 130, 120, 135, 135, 140, 135, 135, 130, 125, 130, 125, 140, 210];
const STARTS = DUUR.map((_, i) => DUUR.slice(0, i).reduce((x, y) => x + y, 0));
export const KHALID_DUUR = DUUR.reduce((a, b) => a + b, 0);
const AFSLUITER_VANAF = KHALID_DUUR - 90;

type Klank = { s: number; bij?: number; src: string; vol: number; lus?: boolean };
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);
const KLANKEN: Klank[] = [
  { s: 0, src: 'wind', vol: 0.12, lus: true },
  { s: 1, src: 'wind', vol: 0.08, lus: true },
  { s: 2, src: 'menigte', vol: 0.12, lus: true },
  { s: 2, bij: 10, src: 'inslag', vol: 0.14 },
  { s: 3, src: 'wind', vol: 0.1, lus: true },
  { s: 4, src: 'menigte', vol: 0.1, lus: true },
  { s: 4, bij: 25, src: 'val', vol: 0.1 },
  { s: 4, bij: 50, src: 'val', vol: 0.1 },
  { s: 4, bij: 60, src: 'glans', vol: 0.12 },
  { s: 5, src: 'menigte', vol: 0.08, lus: true },
  ...[8, 18, 28, 38, 48, 58, 68, 79, 89].map((bij) => ({ s: 5, bij, src: 'tik', vol: 0.22 })),
  { s: 6, src: 'vuur', vol: 0.08, lus: true },
  { s: 6, src: 'wind', vol: 0.06, lus: true },
  { s: 7, src: 'menigte', vol: 0.1, lus: true },
  { s: 7, bij: 40, src: 'inslag', vol: 0.12 },
  { s: 8, src: 'wind', vol: 0.16, lus: true },
  { s: 9, src: 'menigte', vol: 0.16, lus: true },
  { s: 9, bij: 12, src: 'inslag', vol: 0.16 },
  { s: 10, src: 'vuur', vol: 0.06, lus: true },
  { s: 10, bij: 40, src: 'val', vol: 0.12 },
  { s: 11, src: 'menigte', vol: 0.1, lus: true },
  { s: 12, src: 'wind', vol: 0.1, lus: true },
  { s: 13, src: 'vuur', vol: 0.05, lus: true },
  { s: 14, bij: 6, src: 'glans', vol: 0.12 },
  { s: 14, src: 'wind', vol: 0.05, lus: true },
];

export const WatAlsKhalid = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
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
        volume={(fr) => interpolate(fr, [0, 10, KHALID_DUUR - 45, KHALID_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
  </AbsoluteFill>
);
