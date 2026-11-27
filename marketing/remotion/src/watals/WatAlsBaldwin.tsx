import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Banier, Bed, Camera, Daglicht, Grond, Heuvels, Leger, Lucht, Menigte, Nachtlicht, Paard, Rots, Zon, Avondlicht, Binnenlicht } from './Decor';
import { Blok, Figuur, Kroon, omhoog, wijs, Zwaard, type Kleding } from './Figuur';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';
import { hookVolgorde, knippen, startsVoor, type Hook, type HookPlan } from './hooks';
import { ease, FPS, lin, Shot, ZonderOver } from '../lang/basis';
import { BOUDEWIJN, Hal, MONNIK, Muur, RIDDER, Ruiter, SALADIN, SARACEEN, S_Kameel, Stad, Woestijn } from '../lang/SaladinScenes';

/**
 * "What if you were the Leper King?" — Baldwin IV van Jeruzalem (1161-1185). What-if-short, 9:16, < 58 s, geen stem.
 * Gepland za 28 nov 2026 17:00 (fanbase-onderwerp: Kingdom of Heaven, en hij versloeg Saladin, onze winnaar).
 *
 * Kenmerken in elke scène: gouden kroon, witte tuniek + blauwe cape, verbonden handen (wit). De ziekte groeit mee:
 * vlekjes op het gezicht vanaf scène 5, troebele ogen vanaf de blindheid. Geen zilveren masker: dat komt uit de film
 * (2005), niet uit de bronnen. Zelfde gevoeligheden als Saladin: geen kruizen op kruisvaarders, geen geweld in beeld.
 * Bron voor bijna alles: Willem van Tyrus, zijn eigen leraar.
 */

/* ================= kit ================= */

export const VERBAND = '#EDE6D6';
export const BALDWIN: Kleding = { ...BOUDEWIJN, handen: VERBAND };
export const BALDWIN_KIND: Kleding = { ...BOUDEWIJN, borst: undefined, benen: '#5A4632', cape: undefined, tuniek: '#E8E0D0', handen: undefined };
export const JONGEN_A: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#8E3A2E', benen: '#5A4632', schoenen: '#3A2A1C' };
export const JONGEN_B: Kleding = { huid: '#DDAE88', haar: '#2E2622', tuniek: '#3E5A7A', benen: '#4A3A2E', schoenen: '#3A2A1C' };
export const WILLEM: Kleding = { ...MONNIK, tuniek: '#2A2A34', rok: '#2A2A34', haar: '#5A4A3A' };
export const PATRIARCH: Kleding = { huid: '#DDB08A', haar: '#B9B4AA', tuniek: '#F2ECE0', rok: '#F2ECE0', schoenen: '#B8912F', cape: '#C9A646' };
export const EDEL_A: Kleding = { huid: '#E2B48E', haar: '#4A3A2C', tuniek: '#6A2E4A', rok: '#6A2E4A', schoenen: '#2A1E16', cape: '#3A1E2E' };
export const EDEL_B: Kleding = { huid: '#DDAE88', haar: '#8A6A40', tuniek: '#2F5A4A', rok: '#2F5A4A', schoenen: '#2A1E16', cape: '#1E3A30' };
export const BLAUW = '#2F4F8E';
export const GOUD_VLAG = '#C99A2E';

/** Kroon in de hoofdgroep (draait mee met het hoofd) plus, vanaf `ziek` 1, vlekjes op het gezicht. */
export const Hoofd = ({ ziek = 0, kroon = true }: { ziek?: number; kroon?: boolean }) => (
  <>
    {kroon && <Kroon position={[0, 0.58, 0]} />}
    {ziek >= 1 && (
      <>
        <Blok p={[0.2, 0.25, 0.283]} s={[0.07, 0.05, 0.01]} c="#C08A78" />
        <Blok p={[-0.22, 0.3, 0.283]} s={[0.05, 0.05, 0.01]} c="#C08A78" />
      </>
    )}
    {ziek >= 2 && (
      <>
        <Blok p={[-0.08, 0.6, 0.283]} s={[0.08, 0.05, 0.01]} c="#B8806E" />
        <Blok p={[0.12, 0.12, 0.283]} s={[0.05, 0.04, 0.01]} c="#B8806E" />
      </>
    )}
  </>
);
/** Zilveren masker + witte kap (de herkenning uit edits en de film; niet historisch, zie youtube.md). Hoofdgroep, oorsprong = hals. */
export const KAP = '#ECE8DE';
export const Masker = () => (
  <>
    <Blok p={[0, 0.74, -0.02]} s={[0.76, 0.14, 0.68]} c={KAP} rough={0.95} />
    {[-1, 1].map((k) => <Blok key={k} p={[k * 0.37, 0.36, -0.02]} s={[0.07, 0.76, 0.66]} c={KAP} rough={0.95} />)}
    <Blok p={[0, 0.36, -0.33]} s={[0.76, 0.78, 0.07]} c={KAP} rough={0.95} />
    <Blok p={[0, 0.66, 0.31]} s={[0.76, 0.07, 0.06]} c={KAP} rough={0.95} />
    <Blok p={[0, 0.62, 0.345]} s={[0.66, 0.03, 0.02]} c="#B8912F" metal={0.3} rough={0.4} />
    <Blok p={[0, 0.0, 0]} s={[0.86, 0.18, 0.66]} c={KAP} rough={0.95} />
    <Blok p={[0, 0.34, 0.33]} s={[0.56, 0.56, 0.04]} c="#E4ECF4" metal={0.45} rough={0.16} />
    <Blok p={[0, 0.3, 0.365]} s={[0.09, 0.16, 0.05]} c="#D8E0EA" metal={0.45} rough={0.16} />
    {[-0.14, 0.14].map((x) => <Blok key={x} p={[x, 0.42, 0.352]} s={[0.14, 0.08, 0.01]} c="#0C0A0C" />)}
    <Blok p={[0, 0.16, 0.352]} s={[0.15, 0.025, 0.01]} c="#161214" />
    <Blok p={[-0.1, 0.24, 0.351]} s={[0.22, 0.012, 0.006]} r={[0, 0, 0.5]} c="#3A3E46" />
    <Blok p={[0.16, 0.52, 0.351]} s={[0.16, 0.012, 0.006]} r={[0, 0, -0.4]} c="#3A3E46" />
    <Blok p={[0.08, 0.2, 0.351]} s={[0.012, 0.14, 0.006]} r={[0, 0, 0.2]} c="#3A3E46" />
  </>
);
export const BW = (ziek = 0, blind = false, masker = false) => ({ kleding: BALDWIN, haar: (masker ? 'kaal' : 'kort') as 'kaal' | 'kort', levend: true, hoofdExtra: masker ? <Masker /> : <Hoofd ziek={ziek} />, oogKleur: blind ? '#C9CED2' : undefined });

/** Draagbaar: vier ridders dragen een plank waarop Baldwin ligt, hoofd iets omhoog (lengte langs x). */
export const Draagbaar = ({ t = 0, masker = true }: { t?: number; masker?: boolean }) => {
  const deining = Math.sin(t * 5) * 0.04;
  return (
    <group position={[0, deining, 0]}>
      <Blok p={[0, 1.72, 0]} s={[2.8, 0.1, 1.1]} c="#5A3B24" />
      {[-0.5, 0.5].map((z) => <Blok key={z} p={[0, 1.74, z]} s={[4.2, 0.08, 0.08]} c="#4A2E1C" />)}
      <Blok p={[0, 1.8, 0]} s={[2.7, 0.06, 1.0]} c={BLAUW} />
      <Figuur {...BW(2, true, masker)} position={[1.2, 2.25, 0]} rotation={[0, 0, Math.PI / 2 - 0.12]} pose={{ wenk: 0.6, hoofd: [0, 0, -0.25] }} />
      {[[-1.9, -0.75], [1.9, -0.75], [-1.9, 0.75], [1.9, 0.75]].map(([x, z], i) => (
        <Figuur key={i} kleding={RIDDER} hoofddeksel="helm" levend position={[x, -deining, z]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [-0.2, 0, z < 0 ? 0.1 : -0.1], elleboog: [0, 0] }, armR: { schouder: [-0.2, 0, z < 0 ? 0.1 : -0.1], elleboog: [0, 0] } }} />
      ))}
    </group>
  );
};

/* ================= scènes ================= */

/** 1 — De hook: de jonge koning te paard, naar de camera, met zijn ridders en Jeruzalem achter zich. */
export const S_Hook = ({ omslag = false, masker = true }: { omslag?: boolean; masker?: boolean }) => {
  const fr = useCurrentFrame();
  const f = omslag ? 60 : fr;
  const t = f / FPS;
  return (
    <Shot focus={[0, 3.0, 0]} scherpte={2.4} mist={['#E8B888', 30, 170]}>
      <Lucht boven="#4E3A5A" horizon="#F2A060" />
      <Zon position={[-20, 10, -150]} grootte={16} kleur="#FFD08A" />
      <Camera pos={[ease(f, 0, 140, 2.4, 1.6), ease(f, 0, 140, 3.0, 3.3), ease(f, 0, 140, 9.6, 8.2)]} kijk={[0, 3.1, 0]} fov={34} />
      <Daglicht zon={[-6, 9, 10]} kleur="#FFC890" kracht={2.2} />
      <Grond kleur="#C8AC7A" />
      <Heuvels kleur="#A88A5A" />
      <group position={[0, 0, -34]} scale={1.4}>
        <Muur vlag={BLAUW} />
        <Stad z={-6} koepels={false} />
      </group>
      <Leger rijen={3} kolommen={11} kleur="#ECE6D8" schild={BLAUW} position={[0, 0, -10]} t={t} />
      {[-5, -2.6, 2.6, 5].map((x, i) => <Banier key={x} position={[x, 0, -6.5]} kleur={i % 2 ? GOUD_VLAG : BLAUW} t={t + i} />)}
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.35, 0]} kleur="#6A4A30" dek={BLAUW} t={t} ruiter={<Figuur {...BW(0, false, masker)} pose={{ armR: { schouder: [-2.3, 0, 0.35], elleboog: [0, -0.2] }, wenk: 0.3 }} inHand={<Zwaard />} />} />
      {[-2.6, 2.6].map((x, i) => <Ruiter key={x} k={RIDDER} hoofddeksel="helm" baard={false} position={[x, 0, -2.4]} rotation={[0, Math.PI - (i ? 0.5 : 0.2), 0]} t={t + i} kleur={i ? '#3A2A20' : '#8A7058'} dek={BLAUW} />)}
    </Shot>
  );
};

/** 2 — Leeftijd 9: de jongens knijpen elkaar en schreeuwen, Baldwin glimlacht. */
export const S_Knijpen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kneep = Math.sin(t * 6) * 0.15;
  return (
    <Shot focus={[0, 1.2, 0]} scherpte={3.2} mist={['#E6D2AE', 16, 90]}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-8, 12, 8]} />
      <Grond kleur="#D8C29A" />
      <Camera pos={[ease(f, 0, 115, 1.6, 0.8), ease(f, 0, 115, 1.7, 1.5), ease(f, 0, 115, 6.4, 5.4)]} kijk={[0, 1.2, 0]} fov={34} />
      <Blok p={[0, 2.5, -4]} s={[14, 5, 0.6]} c="#DCC9A2" rough={1} />
      {[-4, 0, 4].map((x) => <Blok key={x} p={[x, 2.6, -3.6]} s={[1.2, 2.2, 0.1]} c="#5A3B24" />)}
      <Figuur kleding={JONGEN_A} scale={0.72} levend position={[-1.05, 0, -0.2]} rotation={[0, 0.5, 0]} pose={{ mond: 'open', wenk: -0.7, armR: { schouder: [-1.2 + kneep, 0, -0.3], elleboog: [0, -0.4] }, armL: { schouder: [-0.6, 0, 0.5] } }} />
      <Figuur kleding={JONGEN_B} scale={0.72} levend position={[1.1, 0, -0.4]} rotation={[0, -0.5, 0]} pose={{ mond: 'open', wenk: -0.8, armL: { schouder: [-1.3 - kneep, 0, 0.3], elleboog: [0, 0.4] }, armR: omhoog() }} />
      <Figuur kleding={BALDWIN_KIND} haar="kort" scale={0.72} levend position={[0, 0, 0.3]} rotation={[0, 0.05, 0]} pose={{ mond: 'lach', armR: { schouder: [-0.9, 0, -0.2], elleboog: [0, -0.3] }, armL: { schouder: [-0.9, 0, 0.2], elleboog: [0, 0.3] } }} />
    </Shot>
  );
};

/** 3 — Zijn leraar Willem van Tyrus bekijkt de arm bij kaarslicht. */
export const S_Leraar = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.4, 0]} scherpte={3.8} mist={['#1A120C', 6, 22]}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.45]} />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#5A4232" />
      <Camera pos={[ease(f, 0, 110, 0.6, 0.2), ease(f, 0, 110, 1.9, 1.8), ease(f, 0, 110, 7.4, 6.6)]} kijk={[0.1, 1.4, 0]} fov={34} />
      <Blok p={[1.5, 0.45, -0.6]} s={[1.0, 0.9, 0.7]} c="#5A3B24" />
      <Blok p={[1.5, 1.06, -0.6]} s={[0.08, 0.24, 0.08]} c="#F2EAD8" />
      <Blok p={[1.5, 1.22, -0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <pointLight position={[1.3, 1.6, 0.2]} intensity={7} distance={7} color="#FFA850" />
      <Figuur kleding={BALDWIN_KIND} haar="kort" scale={0.74} levend position={[-0.35, 0, 0.3]} rotation={[0, 0.5, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.5], elleboog: [0, 0] }, hoofd: [0.1, 0.4, 0] }} />
      <Figuur kleding={WILLEM} haar="kort" levend position={[0.85, 0, -0.6]} rotation={[0, -0.75, 0]} pose={{ wenk: -0.7, mond: 'open', hoofd: [0.3, 0, 0], armR: { schouder: [-1.1, 0, -0.2], elleboog: [0, -0.4] }, armL: { schouder: [-1.0, 0, 0.3], elleboog: [0, 0.4] } }} />
    </Shot>
  );
};

/** 4 — Gekroond op zijn dertiende: de kroon zakt op zijn hoofd. */
export const S_Kroning = () => {
  const f = useCurrentFrame();
  const y = ease(f, 15, 70, 1.0, 0);
  return (
    <Shot focus={[0, 1.9, -1]} scherpte={3} mist={['#3A2A20', 14, 60]}>
      <Hal />
      <Camera pos={[ease(f, 0, 115, 1.4, 0.6), ease(f, 0, 115, 2.2, 2.0), ease(f, 0, 115, 6.6, 5.6)]} kijk={[0, 1.9, -1]} fov={34} />
      <Figuur {...BW(0)} hoofdExtra={<group position={[0, y, 0]}><Kroon position={[0, 0.64, 0]} /></group>} scale={0.88} position={[0, 0, -1]} pose={{ armL: { schouder: [-0.5, 0, 0.2], elleboog: [0, 0.6] }, armR: { schouder: [-0.5, 0, -0.2], elleboog: [0, -0.6] }, wenk: 0.2 }} />
      <Figuur kleding={PATRIARCH} baard haar="grijs" levend position={[1.0, 0, -1.7]} rotation={[0, -0.6, 0]} pose={{ armR: { schouder: [-2.0, 0, -0.4], elleboog: [0, -0.3] } }} />
      {[-2.4, -1.6, 2.2].map((x, i) => <Figuur key={x} kleding={i % 2 ? EDEL_B : EDEL_A} levend position={[x, 0, 0.4 - i * 0.6]} rotation={[0, x < 0 ? 0.7 : -0.7, 0]} />)}
    </Shot>
  );
};

/** 5 — De hofadel fluistert achter zijn rug. */
export const S_Fluisteren = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[-0.8, 1.9, 0.6]} scherpte={3.2} mist={['#3A2A20', 14, 60]}>
      <Hal />
      <Camera pos={[ease(f, 0, 105, 0.4, 0), ease(f, 0, 105, 2.3, 2.2), ease(f, 0, 105, 7.6, 6.8)]} kijk={[0, 1.9, -1.8]} fov={34} />
      <Figuur {...BW(1)} position={[0.4, 0.6, -4.4]} pose={{ armL: { schouder: [-0.6, 0, 0.2], elleboog: [0, 0.5] }, armR: { schouder: [-0.6, 0, -0.2], elleboog: [0, -0.5] }, wenk: 0.4 }} />
      <Figuur kleding={EDEL_A} snor levend position={[-2.1, 0, 0.2]} rotation={[0, 0.9, 0]} pose={{ mond: 'lach', armR: { schouder: [-1.6, 0, -0.3], elleboog: [0, -1.2] } }} />
      <Figuur kleding={EDEL_B} baard levend position={[-0.7, 0, 0.5]} rotation={[0, -0.9, 0]} pose={{ wenk: 0.5, hoofd: [0, -0.3, 0] }} />
      <Figuur kleding={EDEL_A} levend position={[1.7, 0, -0.2]} rotation={[0, -0.9, 0]} pose={{ mond: 'lach', armR: { schouder: [-1.6, 0, -0.3], elleboog: [0, -1.2] } }} />
    </Shot>
  );
};

/** 6 — Met één verdoofde arm leert hij toch rijden: galop door groen land. */
export const S_Rijden = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 105, -5, 3);
  return (
    <Shot focus={[x, 2.4, 0]} scherpte={2.2} mist={['#E6D2AE', 24, 130]}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#9AA06A" />
      <Heuvels kleur="#7E8A56" />
      <Camera pos={[x - 0.8, 2.6, 10.5]} kijk={[x + 0.6, 2.5, 0]} fov={34} />
      <Paard position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#6A4A30" dek={BLAUW} t={t * 1.5} loopt ruiter={<Figuur {...BW(1)} pose={{ armL: { schouder: [-0.1, 0, 0.1] }, armR: { schouder: [-1.0, 0, -0.1], elleboog: [0, -0.4] }, wenk: 0.5, hoofd: [0, -0.8, 0] }} />} />
      {Array.from({ length: 10 }, (_, i) => <Blok key={i} p={[x - 1.6 - i * 0.35, 0.15 + ((t * 3 + i * 0.3) % 1) * 0.5, (i % 3) * 0.3 - 0.3]} s={[0.25, 0.25, 0.25]} c="#C8B48A" />)}
    </Shot>
  );
};

/** 7 — Saladin komt met een enorm leger (teller loopt op naar 26.000). */
export const S_Saladin = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.4, -4]} scherpte={1.6} mist={['#E6D2AE', 30, 160]}>
      <Woestijn />
      <Camera pos={[ease(f, 0, 100, 2, 7), ease(f, 0, 100, 2.2, 8), ease(f, 0, 100, 9, 15)]} kijk={[0, 1.2, -6]} fov={38} />
      {[-14, 0, 14].map((x, i) => <Leger key={i} rijen={5} kolommen={11} kleur="#E2D6BC" schild={GOUD_VLAG} position={[x, 0, -12 + (i % 2) * 2]} t={t} />)}
      {[-8, -3, 3, 8].map((x, i) => <Banier key={i} position={[x, 0, -4]} kleur={i % 2 ? GOUD_VLAG : '#ECE6D8'} t={t + i} />)}
      <Ruiter k={SALADIN} position={[0, 0, 1.5]} rotation={[0, Math.PI, 0]} t={t} kleur="#ECE6D8" />
    </Shot>
  );
};

/** 8 — 375 ridders: klein groepje, Baldwin ervoor. */
export const S_Ridders = ({ masker = true }: { masker?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={2.6} mist={['#9A7A5A', 18, 110]}>
      <Lucht boven="#6A7A8A" horizon="#E0B07A" />
      <Daglicht zon={[-8, 10, 10]} kleur="#FFD8B0" kracht={1.8} />
      <Grond kleur="#B8A070" />
      <Heuvels kleur="#9A8A5A" />
      <Camera pos={[ease(f, 0, 95, 2.2, 1.2), ease(f, 0, 95, 2.4, 2.2), ease(f, 0, 95, 8.4, 7.0)]} kijk={[0, 2.0, -1]} fov={34} />
      <Leger rijen={2} kolommen={6} kleur="#ECE6D8" schild={BLAUW} position={[0, 0, -4.5]} t={t} />
      <Banier position={[-2.2, 0, -3]} kleur={BLAUW} t={t} />
      <Figuur {...BW(1, false, masker)} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ armR: wijs(1.3) }} inHand={<Zwaard />} />
      <Figuur kleding={RIDDER} hoofddeksel="helm" levend position={[-1.4, 0, -1.2]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.5 }} />
      <Figuur kleding={RIDDER} hoofddeksel="helm" levend position={[1.5, 0, -1.0]} rotation={[0, -0.4, 0]} pose={{ wenk: -0.6 }} />
    </Shot>
  );
};

/** 9 — Montgisard: de charge naar de camera, stof erachter. Hero moment. */
export const S_Charge = ({ masker = true }: { masker?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 110, -6, 1);
  return (
    <Shot focus={[0, 2.6, z]} scherpte={2.0} mist={['#C8A880', 14, 90]}>
      <Lucht boven="#8A8E98" horizon="#E8C08A" />
      <Daglicht zon={[-6, 10, 10]} kleur="#FFE0B8" kracht={2.0} />
      <Grond kleur="#B8A070" />
      <Heuvels kleur="#A08A5A" />
      <Camera pos={[1.2, ease(f, 0, 110, 2.0, 2.6), z + 9.5]} kijk={[0, 2.9, z]} fov={36} />
      <Paard position={[0, 0, z]} rotation={[0, Math.PI, 0]} kleur="#6A4A30" dek={BLAUW} t={t * 1.6} loopt ruiter={<Figuur {...BW(1, false, masker)} pose={{ armR: { schouder: [-2.5, 0, 0.4], elleboog: [0, -0.2] } }} inHand={<Zwaard />} />} />
      {[[-2.2, -1.8], [2.2, -1.6], [-4.2, -3.6], [4.0, -3.8], [-1.2, -4.4], [1.4, -5]].map(([x, dz], i) => (
        <Ruiter key={i} k={RIDDER} hoofddeksel="helm" baard={false} position={[x, 0, z + dz]} rotation={[0, Math.PI, 0]} t={t * 1.6 + i} loopt kleur={['#3A2A20', '#8A7058', '#5A4030'][i % 3]} dek={i % 2 ? '#ECE6D8' : BLAUW} pose={{ armR: omhoog() }} inHand={<Zwaard />} />
      ))}
    </Shot>
  );
};

/** 11 — Blind: alleen bij het raam, troebele ogen, verbonden handen. */
export const S_Blind = ({ masker = false }: { masker?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={3.6} mist={['#141418', 8, 30]}>
      <Lucht boven="#141418" horizon="#22222C" />
      <Nachtlicht />
      <Grond kleur="#2A2220" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#4A4036" />
      <Blok p={[-1.2, 3.0, -1.44]} s={[1.0, 1.6, 0.04]} c="#9AB0C8" emissive="#6A88A8" />
      <directionalLight position={[-3, 4, 4]} intensity={1.4} color="#B8CCE8" />
      <pointLight position={[1.4, 2.4, 1.6]} intensity={3} distance={6} color="#FFB060" />
      <Camera pos={[ease(f, 0, 120, 0.9, 0.3), ease(f, 0, 120, 2.1, 2.05), ease(f, 0, 120, 4.4, 3.2)]} kijk={[0, 1.95, 0]} fov={34} />
      <Figuur {...BW(2, true, masker)} position={[0, 0, 0]} rotation={[0, 0.1, 0]} pose={{ wenk: -0.4, hoofd: [-0.15, 0, 0], armR: { schouder: [-1.2, 0, -0.5], elleboog: [0, -0.5] }, armL: { schouder: [-1.2, 0, 0.5], elleboog: [0, 0.5] } }} />
    </Shot>
  );
};

/** 12 — Kerak 1183: ze dragen hem op een draagbaar naar het slagveld; de burcht op de rots erachter. */
export const S_Draagbaar = ({ masker = true }: { masker?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 115, -2.5, 1.5);
  return (
    <Shot focus={[x, 2.0, 0]} scherpte={2.4} mist={['#9A7A5A', 20, 110]}>
      <Lucht boven="#6A7A8A" horizon="#D8C2A0" />
      <Daglicht zon={[-10, 12, 8]} kracht={1.6} />
      <Grond kleur="#A88A62" />
      <Camera pos={[x + 0.4, 2.4, 10.5]} kijk={[x, 2.4, 0]} fov={34} />
      <Rots position={[2, -1, -16]} schaal={[12, 6, 6]} kleur="#8A7458" />
      <group position={[2, 5, -16]}>
        <Blok p={[0, 2, 0]} s={[9, 4, 4]} c="#8E7E66" />
        {[-3.8, 0, 3.8].map((bx) => <Blok key={bx} p={[bx, 3.2, 0]} s={[1.4, 6.4, 1.4]} c="#7E6E58" />)}
      </group>
      <group position={[x, 0, 0]}>
        <Draagbaar t={t} masker={masker} />
      </group>
      <Leger rijen={2} kolommen={7} kleur="#ECE6D8" schild={BLAUW} position={[x - 1, 0, -7]} t={t} />
      <Banier position={[x - 3.4, 0, -2]} kleur={BLAUW} t={t} />
    </Shot>
  );
};

/** 13 — Sterfbed, Jeruzalem, maart 1185: de kroon ligt naast hem. */
export const S_Sterfbed = ({ masker = false }: { masker?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.0, 0]} scherpte={3.4} mist={['#1A120C', 6, 24]}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.4]} />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#5A4232" />
      <pointLight position={[1.6, 1.8, 1.0]} intensity={7} distance={7} color="#FFA850" />
      <pointLight position={[-0.4, 2.0, 3.2]} intensity={5} distance={7} color="#FFC890" />
      <Camera pos={[ease(f, 0, 115, 0.5, 0.1), ease(f, 0, 115, 2.1, 1.9), ease(f, 0, 115, 7.4, 6.4)]} kijk={[-0.1, 1.3, 0]} fov={34} />
      <Bed position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Figuur {...BW(2, true, masker)} hoofdExtra={masker ? <Masker /> : <Hoofd ziek={2} kroon={false} />} position={[1.25, 1.15, 0]} rotation={[0, 0, Math.PI / 2 - 0.08]} pose={{ ogen: 'dicht', hoofd: [0, 0, -0.2] }} />
      <Blok p={[2.2, 0.45, 0.4]} s={[0.6, 0.9, 0.6]} c="#5A3B24" />
      <Blok p={[2.2, 0.93, 0.4]} s={[0.5, 0.06, 0.5]} c="#8E1F2A" />
      <Kroon position={[2.2, 0.92, 0.4]} />
      <Blok p={[1.6, 0.45, -0.6]} s={[0.6, 0.9, 0.6]} c="#5A3B24" />
      <Blok p={[1.6, 1.06, -0.6]} s={[0.08, 0.24, 0.08]} c="#F2EAD8" />
      <Blok p={[1.6, 1.22, -0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <Figuur kleding={WILLEM} haar="kort" levend position={[-0.6, 0, -1.4]} rotation={[0, 0.2, 0]} pose={{ wenk: -0.8, traan: lin(f, 20, 90, 0, 1), hoofd: [0.3, 0, 0] }} />
    </Shot>
  );
};

/** 14 — 1187: Saladins vlaggen op de muur van Jeruzalem bij zonsondergang. Einde (met de afsluiter). */
export const S_Valt = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const wissel = f > 70;
  return (
    <Shot focus={[0, 3, 0]} scherpte={2.2} mist={['#9A5A3A', 24, 130]}>
      <Lucht boven="#3E2A44" horizon="#E8864E" onder="#2A1A14" />
      <Zon position={[-10, 6, -150]} grootte={18} kleur="#FFB070" />
      <Avondlicht />
      <hemisphereLight args={['#FFC8A0', '#3A2A20', 0.6]} />
      <Grond kleur="#A8865A" />
      <Camera pos={[ease(f, 0, 210, 4, 2), ease(f, 0, 210, 2.2, 3.0), ease(f, 0, 210, 18, 14)]} kijk={[0, 3.4, 0]} fov={36} />
      <Muur vlag={wissel ? GOUD_VLAG : BLAUW} open={1} />
      <Stad z={-6} koepels={false} />
      {[-6, -4, 4, 6].map((x) => <Banier key={x} position={[x, 5, 0.3]} kleur={wissel ? GOUD_VLAG : BLAUW} t={t + x} />)}
      <Menigte n={10} z={4} x0={-7} t={t} />
      {[-2.6, 2.6].map((x, i) => <Figuur key={x} kleding={SARACEEN} hoofddeksel="tulband" baard levend position={[x, 0, 2.2]} rotation={[0, i ? -0.3 : 0.3, 0]} />)}
    </Shot>
  );
};


/* ================= montage ================= */

type Klank = { src: string; vol: number; bij?: number; lus?: boolean };
type TellerDef = { label: string; waarde: string | ((f: number) => string); pil?: string };
/** hookTekst/hookTeller: alleen als deze scène de video opent (trial-hook B/C), zie viral-hooks-audit in youtube.md. */
type Scène = { C: React.FC; duur: number; teller?: TellerDef; tekst: Deel[]; hookTekst?: Deel[]; hookTeller?: TellerDef; klank?: Klank[] };

const tel = (eind: number, a: number, b: number, stap: number) => (f: number) => (Math.round(lin(f, a, b, 0, eind) / stap) * stap).toLocaleString('en-US');

const SCÈNES: Scène[] = [
  { C: S_Hook, duur: 135, teller: { label: 'Dying of leprosy', waarde: 'King at 13', pil: 'Jerusalem, 1174' }, tekst: [{ t: 'What if you were the ' }, { t: 'Leper King', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: S_Knijpen, duur: 115, teller: { label: 'Age', waarde: '9', pil: 'William of Tyre' }, tekst: [{ t: 'the boys pinch each other and scream. you feel ' }, { t: 'nothing', accent: true }], hookTekst: [{ t: "You can't feel pain. Sounds like a superpower. " }, { t: "It's leprosy.", accent: true }], klank: [{ src: 'menigte', vol: 0.05, lus: true }, { src: 'tik', vol: 0.16, bij: 70 }] },
  { C: S_Leraar, duur: 110, teller: { label: 'Diagnosis', waarde: 'leprosy', pil: 'no cure' }, tekst: [{ t: 'your tutor realises what it is: ' }, { t: 'leprosy', accent: true }], klank: [{ src: 'vuur', vol: 0.05, lus: true }, { src: 'val', vol: 0.14, bij: 55 }] },
  { C: S_Kroning, duur: 115, teller: { label: 'Age', waarde: '13', pil: '15 July 1174' }, tekst: [{ t: 'your father dies. at 13, you get his ' }, { t: 'crown', accent: true }], klank: [{ src: 'glans', vol: 0.16, bij: 62 }] },
  { C: S_Fluisteren, duur: 105, teller: { label: 'The court', waarde: 'whispers' }, tekst: [{ t: 'the lords wonder how long you will ' }, { t: 'last', accent: true }], klank: [{ src: 'menigte', vol: 0.04, lus: true }] },
  { C: S_Rijden, duur: 105, teller: { label: 'Right arm', waarde: 'numb', pil: 'William of Tyre' }, tekst: [{ t: 'your arm goes numb. you learn to ride ' }, { t: 'anyway', accent: true }], klank: [{ src: 'wind', vol: 0.14, lus: true }] },
  { C: S_Saladin, duur: 100, teller: { label: "Saladin's army", waarde: tel(26000, 8, 60, 500), pil: 'William of Tyre, 1177' }, tekst: [{ t: 'Saladin marches on ' }, { t: 'Jerusalem', accent: true }], hookTeller: { label: "Saladin's army", waarde: '26,000', pil: 'William of Tyre, 1177' }, hookTekst: [{ t: "You're 16. You have leprosy. " }, { t: '26,000 men', accent: true }, { t: ' are coming for you.' }], klank: [{ src: 'menigte', vol: 0.1, lus: true }, { src: 'inslag', vol: 0.18, bij: 8 }] },
  { C: S_Ridders, duur: 95, teller: { label: 'Your knights', waarde: tel(375, 8, 50, 5), pil: 'you are 16' }, tekst: [{ t: 'you have 375 knights. you ride out to ' }, { t: 'meet him', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }] },
  { C: S_Charge, duur: 110, teller: { label: 'Montgisard', waarde: '25 Nov 1177' }, tekst: [{ t: 'and you ' }, { t: 'crush him', accent: true }], klank: [{ src: 'menigte', vol: 0.16, lus: true }, { src: 'inslag', vol: 0.34, bij: 6 }, { src: 'inslag', vol: 0.22, bij: 40 }] },
  { C: S_Kameel, duur: 95, teller: { label: 'Saladin', waarde: 'escapes' }, tekst: [{ t: 'Saladin flees on a racing ' }, { t: 'camel', accent: true }], klank: [{ src: 'wind', vol: 0.12, lus: true }] },
  { C: S_Blind, duur: 120, teller: { label: 'Age', waarde: '22', pil: '1183' }, tekst: [{ t: 'your eyes go dark. your hands and feet ' }, { t: 'stop working', accent: true }], klank: [{ src: 'wind', vol: 0.05, lus: true }, { src: 'val', vol: 0.16, bij: 50 }] },
  { C: S_Draagbaar, duur: 115, teller: { label: 'Kerak', waarde: '1183' }, tekst: [{ t: 'they carry you to war on a litter. Saladin ' }, { t: 'pulls back', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }, { src: 'glans', vol: 0.14, bij: 80 }] },
  { C: S_Sterfbed, duur: 115, teller: { label: 'Age', waarde: '23', pil: 'March 1185' }, tekst: [{ t: 'you die at 23, still ' }, { t: 'king', accent: true }], klank: [{ src: 'vuur', vol: 0.05, lus: true }] },
  { C: S_Valt, duur: 210, teller: { label: 'Two years later', waarde: '1187' }, tekst: [{ t: 'without you, ' }, { t: 'Jerusalem falls', accent: true }], klank: [{ src: 'wind', vol: 0.12, lus: true }, { src: 'val', vol: 0.18, bij: 70 }] },
];

const DUUR = SCÈNES.map((s) => s.duur);
export const BALDWIN_DUUR = DUUR.reduce((a, b) => a + b, 0);
/** Trial-reel-hooks (viral-hooks-audit 26 nov): B = midden in de actie (Saladins 26.000 komen eraan), C = verkeerde verwachting (geen pijn = superkracht? lepra). */
export const BALDWIN_HOOKS: HookPlan = { B: 6, C: 1 };
if (BALDWIN_DUUR > MAX_SHORT_FRAMES) throw new Error(`BALDWIN_DUUR is ${BALDWIN_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = BALDWIN_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const HudTeller = ({ teller, start }: { teller?: TellerDef; start: number }) => {
  const f = useCurrentFrame();
  if (!teller) return null;
  const w = typeof teller.waarde === 'function' ? teller.waarde(f) : teller.waarde;
  return <Teller label={teller.label} waarde={w} pil={teller.pil} start={start} />;
};

export const WatAlsBaldwin = ({ muziek = true, muziekVanaf = 14, hook = 'A' }: { muziek?: boolean; muziekVanaf?: number; hook?: Hook }) => {
  const starts = startsVoor(DUUR, hookVolgorde(SCÈNES.length, BALDWIN_HOOKS, hook));
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {SCÈNES.map((s, i) => {
        const eerste = starts[i] === 0;
        return (
          <Sequence key={i} from={starts[i]} durationInFrames={s.duur}>
            <ZonderOver.Provider value>
              <s.C />
            </ZonderOver.Provider>
            <HudTeller teller={(eerste && s.hookTeller) || s.teller} start={eerste ? -12 : 3} />
            <Onderschrift start={eerste ? (s.hookTekst ? -15 : -60) : 9} delen={(eerste && s.hookTekst) || s.tekst} top={1330} />
            {s.klank?.map((k, j) =>
              k.lus ? (
                <Audio key={j} src={sfx(k.src)} loop volume={(fr) => interpolate(fr, [0, 8, s.duur - 8, s.duur], [0, k.vol, k.vol, 0], { extrapolateRight: 'clamp' })} />
              ) : (
                <Sequence key={j} from={k.bij ?? 0} durationInFrames={60}>
                  <Audio src={sfx(k.src)} volume={k.vol} />
                </Sequence>
              ),
            )}
          </Sequence>
        );
      })}
      {knippen(starts).map((st, i) => (
        <Sequence key={`w${i}`} from={Math.max(0, st - 8)} durationInFrames={20}>
          <Audio src={sfx('whoosh')} volume={0.1} />
        </Sequence>
      ))}
      <Watermerk />
      {muziek && (
        <Audio
          src={staticFile('lokaal/amour-plastique.mp3')}
          startFrom={Math.round(muziekVanaf * 30)}
          volume={(fr) => interpolate(fr, [0, 10, BALDWIN_DUUR - 45, BALDWIN_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
        />
      )}
      <Sequence from={AFSLUITER_VANAF}>
        <Afsluiter />
        <Audio src={sfx('afsluiter')} volume={0.22} />
      </Sequence>
    </AbsoluteFill>
  );
};

