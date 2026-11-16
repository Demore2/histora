import type React from 'react';
import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Binnenlicht, Camera, Daglicht, Grond, Kanon, Kathedraal, Lucht, Menigte, Rots, Scherpte, Schuim, Sokkel, Zee, Zon } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, GOUD, BRONS, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, omhoog, PAUS, SCHOLIER, wijs, Zwaard, type Kleding, type V3 } from '../watals/Figuur';
import { CAESAR } from '../watals/Figuur';
import { isCorsica, Kaarttafel, opKaart, Speld } from './Kaarttafel';
import { GroteTitel, JaarLabel, LangTeller, LangVignet, LangWatermerk, Ondertitel } from './LangHud';
import timing from './napoleon-timing.json';
import * as S2 from './NapoleonScenes2';

/**
 * "Napoleon in 5 minutes" — lange YouTube-video, 16:9, stem Dylan (Higgsfield Seed Audio).
 * Opgebouwd op dylan/timing.json: elke knip valt op een zin. Nu: proefstuk hook + Corsica (0:00-0:53).
 */

const FPS = 30;
const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Shot = ({ children, focus, scherpte = 3, mist, over }: { children: ReactNode; focus: V3; scherpte?: number; mist?: [string, number, number]; over?: ReactNode }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
        {mist && <fog attach="fog" args={mist} />}
        {children}
        <Scherpte focus={focus} sterkte={scherpte} />
      </ThreeCanvas>
      <LangVignet />
      {over}
    </AbsoluteFill>
  );
};

const NAP = { kleding: NAPOLEON, hoofddeksel: 'steek' as const };
const JONG: Kleding = { ...NAPOLEON, laarzen: undefined, schoenen: '#2A211B' };
const CORSICAANTJE: Kleding = { huid: '#E2B48E', haar: '#3A2A1E', tuniek: '#EFE6D4', benen: '#6B5236', schoenen: '#3A2A1C', riem: '#8C6A3E' };
const ALEXANDER: Kleding = { huid: '#000', haar: '#000', tuniek: '#000', schoenen: '#000', cape: '#000', borst: '#000' };

const School = ({ dicht = false }: { dicht?: boolean }) => (
  <>
    <Grond kleur="#B7A88A" />
    <Blok p={[0, 3, -4]} s={[22, 6, 0.6]} c="#D9CDB6" rough={0.95} />
    {[-7.5, -5, -2.5, 0, 2.5, 5, 7.5].map((x) => (
      <group key={x}>
        <Blok p={[x, 2.1, -3.68]} s={[1.0, 1.5, 0.04]} c="#4A5A6A" rough={0.3} />
        <Blok p={[x, 4.4, -3.68]} s={[1.0, 1.3, 0.04]} c="#4A5A6A" rough={0.3} />
      </group>
    ))}
    <Blok p={[0, 6.3, -4]} s={[22.6, 0.6, 1.2]} c="#7A4A3A" />
    {!dicht && <Blok p={[0, 1.4, -3.66]} s={[1.6, 2.8, 0.06]} c="#5A3B24" />}
  </>
);

/* ---------- hook ---------- */

const A_School = () => {
  const f = useCurrentFrame();
  const lach = Math.floor(f / 7) % 2 === 0 ? 'lach' : 'open';
  return (
    <Shot focus={[0, 1.4, 0.4]} scherpte={3.5} mist={['#DCCDB2', 12, 60]}>
      <Lucht boven="#A9C3D6" horizon="#E6DDC2" />
      <Camera pos={[ease(f, 0, 90, 1.4, 1.0), 1.75, ease(f, 0, 90, 6.4, 5.6)]} kijk={[0, 1.35, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} />
      <School />
      <Figuur kleding={JONG} position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} scale={0.72} pose={{ hoofd: [0.3, 0, 0], wenk: ease(f, 10, 40, 0, 0.9) }} />
      <Figuur kleding={SCHOLIER} position={[-1.4, 0, -0.3]} rotation={[0, 0.9, 0]} scale={0.74} pose={{ armR: wijs(1.35), mond: lach }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#6B4A30', haar: '#C9A050' }} position={[1.45, 0, -0.4]} rotation={[0, -0.85, 0]} scale={0.7} pose={{ armL: wijs(1.3), mond: lach === 'lach' ? 'open' : 'lach' }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#3A5A3A', haar: '#2B1E16' }} position={[2.6, 0, -1.4]} rotation={[0, -0.6, 0]} scale={0.76} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#7A3B26' }} position={[-2.7, 0, -1.5]} rotation={[0, 0.7, 0]} scale={0.72} pose={{ mond: 'lach' }} />
    </Shot>
  );
};

const B_Kroning = () => {
  const f = useCurrentFrame();
  const kroonY = ease(f, 15, 75, 3.15, 2.56);
  return (
    <Shot focus={[0, 2.5, 0]} scherpte={3} mist={['#C9BCA2', 14, 60]}>
      <Lucht boven="#6A5E50" horizon="#A8987E" />
      <Camera pos={[ease(f, 0, 115, 1.6, 1.0), 2.4, ease(f, 0, 115, 7.8, 6.8)]} kijk={[-0.3, 2.3, 0]} fov={36} />
      <Binnenlicht zon={[2, 14, 4]} kleur="#FFE6C0" />
      <pointLight position={[0, 6, 2]} intensity={10} distance={14} color="#FFE0B0" />
      <Kathedraal />
      <group position={[-4.5, 0, 3]} rotation={[0, Math.PI / 2, 0]}>
        <Menigte n={8} x0={-4} t={f / FPS} />
      </group>
      <group position={[4.5, 0, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <Menigte n={8} x0={-4} t={f / FPS + 1} />
      </group>
      <Blok p={[-1.9, 0.5, -1.6]} s={[1.2, 1.0, 1.0]} c="#8E1F2A" />
      <Blok p={[-1.9, 1.9, -2.05]} s={[1.2, 2.0, 0.2]} c="#B8912F" metal={0.5} rough={0.4} />
      <Figuur kleding={PAUS} haar="grijs" hoofddeksel="kap" position={[-1.9, 0.5, -1.45]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(0.9), wenk: -0.3 }} />
      <Figuur kleding={NAPOLEON_KROONMANTEL} hoofddeksel={f > 75 ? 'krans' : null} position={[0.2, 0, 0]} rotation={[0, -0.1, 0]} pose={{ armL: omhoog(), armR: omhoog(), hoofd: [-0.1, 0, 0] }} />
      {f <= 75 && <Kroon position={[0.2, kroonY, 0.02]} />}
    </Shot>
  );
};

const C_Helena = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot
      focus={[0, 1.8, 0]}
      scherpte={2}
      mist={['#A8B0B4', 30, 160]}
      over={<LangTeller label="Nearest coast" waarde={`~${Math.round(lin(f, 20, 150, 0, 1900)).toLocaleString('en-US')} km`} pil="Saint Helena" />}
    >
      <Lucht boven="#7A8A98" horizon="#C6CCCE" />
      <Camera pos={[ease(f, 0, 200, 5.5, 13), ease(f, 0, 200, 2.4, 7), ease(f, 0, 200, 8, 24)]} kijk={[0, ease(f, 0, 200, 1.9, 0.5), 0]} fov={34} />
      <Daglicht zon={[-8, 10, 6]} kleur="#E6E8EA" kracht={1.2} />
      <group position={[0, -6, 0]}>
        <Zee t={t} kleur="#355E7A" grootte={220} />
      </group>
      <Blok p={[0, -3, -1]} s={[7, 6, 7]} c="#5E5246" rough={1} />
      <Blok p={[0, 0.02, -1]} s={[6.6, 0.06, 6.6]} c="#6E7A4E" rough={1} />
      <Rots position={[3.6, -3, 2.4]} schaal={[1.6, 3, 1.6]} kleur="#54493E" />
      <Rots position={[-3.8, -3.4, -2.0]} schaal={[2, 3.2, 2]} kleur="#5A4E42" />
      <Figuur {...NAP} position={[0.2, 0.05, 0.6]} rotation={[0, 0.55, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.2, 0, 0], wenk: -0.5 }} />
    </Shot>
  );
};

const D_Titel = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.9, 0.6]} scherpte={2.5} mist={['#EAD9BE', 30, 150]} over={<GroteTitel boven="THE LIFE OF" naam="NAPOLEON" onder="in five minutes" />}>
      <Lucht boven="#7FAED8" horizon="#F1DDBC" />
      <Zon position={[-40, 10, -120]} grootte={10} kleur="#FFE2A8" />
      <Camera pos={[ease(f, 0, 175, 5.6, 4.4), ease(f, 0, 175, 2.4, 2.2), ease(f, 0, 175, 8.6, 7.2)]} kijk={[0, 3.2, 0.4]} fov={34} />
      <Daglicht zon={[-10, 14, 8]} />
      <group position={[0, -5, 0]}>
        <Zee t={t} grootte={220} />
      </group>
      <Blok p={[0, -2.6, -1]} s={[12, 5.2, 8]} c="#9A8670" rough={1} />
      <Blok p={[0, 0.02, -1]} s={[11.6, 0.06, 7.6]} c="#8FA05A" rough={1} />
      <Rots position={[-6.2, -2.6, 2.6]} schaal={[2, 2.4, 1.8]} kleur="#958169" rotation={[0.4, 1, 0]} />
      <Figuur {...NAP} position={[0, 0.05, 0.6]} rotation={[0, 0.45, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Shot>
  );
};

/* ---------- de jongen van Corsica ---------- */

const E_Kaart1769 = () => {
  const f = useCurrentFrame();
  const corsica = opKaart(9.1, 42.2, 0.4);
  const zoom = ease(f, 0, 110, 0, 1);
  const kijk: V3 = [corsica[0] * zoom, 0.3, corsica[2] * zoom];
  const p = ease(f, 140, 185, 0, 1);
  const gloed = (Math.sin(f / 5) + 1) / 2;
  return (
    <Shot focus={kijk} scherpte={2.2} over={<JaarLabel jaar="1769" sub="Corsica" />}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={[kijk[0] + ease(f, 0, 110, 0, 1.8), ease(f, 0, 110, 23, 6.5), kijk[2] + ease(f, 0, 110, 13, 6.5)]} kijk={kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <Kaarttafel
        van={{ France: 'rijk' }}
        p={p}
        ringStand={(r, fase) => (isCorsica(r) ? (fase === 'van' ? 'genua' : 'rijk') : null)}
        licht={isCorsica}
        gloed={f > 40 ? gloed * (1 - p) : 0}
      />
      <Speld lon={8.93} lat={44.41} kleur="#C9A646" />
      <Speld lon={2.35} lat={48.86} kleur="#2F5FA8" />
      <group position={opKaart(8.74, 41.93, 0.62)}>
        <Figuur {...NAP} scale={0.22} rotation={[0, 0.4, 0]} pose={ARMEN_GEKRUIST} />
      </group>
    </Shot>
  );
};

const Huis = ({ position, r = 0 }: { position: V3; r?: number }) => (
  <group position={position} rotation={[0, r, 0]}>
    <Blok p={[0, 1.1, 0]} s={[2.2, 2.2, 2.0]} c="#E9DFCC" />
    <Blok p={[0, 2.4, 0]} s={[2.5, 0.5, 2.3]} c="#B5543A" />
    <Blok p={[0, 0.7, 1.01]} s={[0.6, 1.3, 0.04]} c="#5A3B24" />
    <Blok p={[0.6, 1.5, 1.01]} s={[0.4, 0.4, 0.04]} c="#3E5A6A" />
  </group>
);

const F_Dorp = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.2, 0.6]} scherpte={3} mist={['#E6D8BE', 20, 110]} over={<LangTeller label="First language" waarde="Corsican" pil="not French" />}>
      <Lucht boven="#86AEDA" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 120, 3.2, 2.4), 1.9, ease(f, 0, 120, 7.4, 6.4)]} kijk={[0, 1.4, 0]} fov={34} />
      <Daglicht zon={[8, 14, 8]} />
      <group position={[0, -0.6, -14]}>
        <Zee t={t} grootte={120} />
      </group>
      <Blok p={[0, -0.3, 0]} s={[40, 0.6, 18]} c="#B9A06A" rough={1} />
      <Huis position={[-3.4, 0, -3.5]} r={0.3} />
      <Huis position={[3.8, 0, -4.2]} r={-0.2} />
      <Huis position={[0.6, 0, -6.5]} />
      <Figuur kleding={CORSICAANTJE} position={[0, 0, 0.6]} rotation={[0, 0.2, 0]} scale={0.7} pose={{ mond: Math.floor(f / 6) % 2 ? 'open' : 'lach' }} />
      <Figuur kleding={{ huid: '#E2B48E', haar: '#2A1E16', tuniek: '#3A2A3A', rok: '#3A2A3A', schoenen: '#2A1E16' }} haar="lang" position={[-1.0, 0, 0.0]} rotation={[0, 0.7, 0]} pose={{ armR: wijs(0.8), mond: 'lach' }} />
    </Shot>
  );
};

const G_Aankomst = () => {
  const f = useCurrentFrame();
  const z = lin(f, 0, 130, 2.2, 0.2);
  return (
    <Shot focus={[0, 1.3, z]} scherpte={3} mist={['#D4C6AC', 14, 70]} over={<><JaarLabel jaar="1779" sub="Brienne, France" /><LangTeller label="Age" waarde="9" /></>}>
      <Lucht boven="#9EB6CC" horizon="#E2DDC8" />
      <Camera pos={[ease(f, 0, 130, 3.6, 2.8), 1.6, z + ease(f, 0, 130, 5.8, 5.4)]} kijk={[0, 1.4, z - 1.5]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.7} />
      <School />
      <Figuur
        kleding={JONG}
        position={[0, 0, z]}
        rotation={[0, Math.PI - 0.15, 0]}
        scale={0.72}
        pose={{ armR: { schouder: [-0.5, 0, -0.1], elleboog: [0, -0.8] }, armL: { schouder: [Math.sin(f / 5) * 0.3, 0, 0.08] } }}
        inHand={<Blok p={[0, 0, 0.1]} s={[0.5, 0.35, 0.3]} c="#6B4A2E" />}
      />
    </Shot>
  );
};

const H_Uitgelachen = () => {
  const f = useCurrentFrame();
  const lach = Math.floor(f / 6) % 2 === 0 ? 'lach' : 'open';
  return (
    <Shot focus={[0, 1.3, 0.3]} scherpte={4}>
      <Lucht boven="#A9C3D6" horizon="#E6DDC2" />
      <Camera pos={[ease(f, 0, 135, -0.8, -0.4), 1.4, ease(f, 0, 135, 4.2, 3.6)]} kijk={[0, 1.3, 0]} fov={34} />
      <Daglicht zon={[6, 12, 8]} />
      <School dicht />
      <Figuur kleding={JONG} position={[0, 0, 0.3]} rotation={[0, 0.0, 0]} scale={0.72} pose={{ hoofd: [0.35, 0, 0], wenk: -0.8 }} />
      {[[-1.3, -0.6, 0.6], [1.3, -0.5, -0.6], [0.4, -1.6, -0.2], [-0.6, -1.9, 0.3]].map(([x, z, r], i) => (
        <Figuur key={i} kleding={{ ...SCHOLIER, tuniek: ['#3E4F7A', '#6B4A30', '#3A5A3A', '#7A3B26'][i] }} position={[x, 0, z]} rotation={[0, r, 0]} scale={0.73} pose={{ ...(i % 2 ? { armR: wijs(1.3) } : {}), mond: i % 2 ? lach : lach === 'lach' ? 'open' : 'lach' }} />
      ))}
    </Shot>
  );
};

const Kamer = ({ kaars = true }: { kaars?: boolean }) => (
  <>
    <Grond kleur="#3A2A20" />
    <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#4A3426" />
    {/* bureau met boek en kaars */}
    <Blok p={[0.9, 0.9, 0.4]} s={[1.6, 0.08, 0.9]} c="#6B4A2E" />
    {[[0.2, 0.05], [1.6, 0.05], [0.2, 0.75], [1.6, 0.75]].map(([x, z], i) => <Blok key={i} p={[x, 0.45, z]} s={[0.08, 0.9, 0.08]} c="#4F331F" />)}
    <Blok p={[0.7, 0.97, 0.45]} s={[0.6, 0.05, 0.42]} c="#EFE3C4" r={[0, 0.2, 0]} />
    <Blok p={[0.7, 0.96, 0.45]} s={[0.02, 0.06, 0.42]} c="#8E2A24" r={[0, 0.2, 0]} />
    {kaars && (
      <>
        <Blok p={[1.4, 1.06, 0.3]} s={[0.08, 0.24, 0.08]} c="#F2EAD8" />
        <Blok p={[1.4, 1.22, 0.3]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
        <pointLight position={[1.4, 1.5, 0.5]} intensity={6} distance={6} color="#FFA850" />
      </>
    )}
    {/* boekenkast */}
    <Blok p={[-2.8, 1.8, -2.0]} s={[2.4, 3.6, 0.5]} c="#5A3B24" />
    {Array.from({ length: 12 }, (_, i) => (
      <Blok key={i} p={[-3.8 + (i % 6) * 0.38, 1.0 + Math.floor(i / 6) * 1.1, -1.76]} s={[0.3, 0.8, 0.06]} c={['#8E2A24', '#2F5A3A', '#3E4F7A', '#B8912F'][i % 4]} />
    ))}
  </>
);

const I_Lezen = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0.6, 1.2, 0.4]} scherpte={4} mist={['#1A120C', 5, 18]}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <Camera pos={[ease(f, 0, 45, 2.6, 2.4), 1.8, ease(f, 0, 45, 3.4, 3.1)]} kijk={[0.6, 1.1, 0.3]} fov={34} />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.35]} />
      <Kamer />
      <Figuur kleding={JONG} position={[0.7, 0, -0.35]} rotation={[0, 0.05, 0]} scale={0.72} pose={{ hoofd: [0.45, 0, 0], armL: { schouder: [-0.7, 0, 0.2], elleboog: [0, -0.4] }, armR: { schouder: [-0.7, 0, -0.2], elleboog: [0, -0.4] } }} />
    </Shot>
  );
};

const J_Helden = () => {
  const f = useCurrentFrame();
  const op = ease(f, 10, 60, -2.6, 0);
  return (
    <Shot focus={[0, 1.8, -1]} scherpte={3} mist={['#1A120C', 6, 22]} over={<LangTeller label="His heroes" waarde="Caesar, Alexander" />}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <Camera pos={[ease(f, 0, 150, 1.4, 0.5), ease(f, 0, 150, 2.0, 2.2), ease(f, 0, 150, 7.4, 6.6)]} kijk={[0, 2.2, -1.0]} fov={36} />
      <hemisphereLight args={['#8A7A64', '#2A1E14', 0.8]} />
      <Kamer />
      <pointLight position={[0, 4, 1.5]} intensity={14} distance={12} color="#FFD27A" />
      <group position={[-1.7, op, -1.4]}>
        <Sokkel position={[0, 0, 0]} h={0.8}>
          <Figuur kleding={CAESAR} o={BRONS} hoofddeksel="krans" rotation={[0, 0.4, 0]} pose={{ armR: wijs(1.4) }} />
        </Sokkel>
      </group>
      <group position={[1.9, op, -1.5]}>
        <Sokkel position={[0, 0, 0]} h={0.8}>
          <Figuur kleding={ALEXANDER} o={GOUD} haar="lang" rotation={[0, -0.4, 0]} pose={{ armR: omhoog() }} inHand={<Zwaard o={GOUD} />} />
        </Sokkel>
      </group>
      <Figuur kleding={JONG} position={[0.2, 0, 0.6]} rotation={[0, Math.PI, 0]} scale={0.72} pose={{ hoofd: [-0.25, 0, 0] }} />
    </Shot>
  );
};

const K_Officier = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.9, 0.3]} scherpte={3} mist={['#D9CDB0', 14, 80]} over={<><JaarLabel jaar="1785" sub="artillery officer" /><LangTeller label="Age" waarde="16" /></>}>
      <Lucht boven="#94B4D2" horizon="#EAD8B2" />
      <Camera pos={[ease(f, 0, 160, 3.6, 2.6), ease(f, 0, 160, 1.9, 2.1), ease(f, 0, 160, 6.6, 5.6)]} kijk={[0, 1.9, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} />
      <Grond kleur="#9AA06A" />
      <Kanon position={[-1.6, 0, -0.6]} rotation={[0, Math.PI / 2 + 0.3, 0]} />
      <Kanon position={[2.0, 0, -2.4]} rotation={[0, Math.PI / 2 + 0.3, 0]} />
      <Figuur kleding={NAPOLEON} hoofddeksel="steek" position={[0.3, 0, 0.3]} rotation={[0, -0.25, 0]} pose={{ armR: { schouder: [-2.5, 0, -0.9], elleboog: [0, -1.6] }, wenk: 0.3 }} />
      {[[-3.4, -2.2], [3.6, -3.4]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <Figuur kleding={{ ...NAPOLEON, laarzen: undefined, rand: undefined }} hoofddeksel="steek" rotation={[0, 0.3 - i * 0.6, 0]} pose={{ mond: Math.sin(t * 3 + i) > 0 ? 'dicht' : 'dicht' }} />
        </group>
      ))}
    </Shot>
  );
};

/* ---------- montage op de zinstijden ---------- */

type Zin = { hoofdstuk: string; zin: string; start: number; eind: number };
const ZINNEN = timing as Zin[];
type ShotDef = { zin: number; na?: number; C: (p: S2.ScèneProps) => React.ReactElement; sfeer?: string; vol?: number; accent?: { bij: number; src: string; vol: number }[] };

const SHOTS: ShotDef[] = [
  { zin: 0, C: A_School, sfeer: 'menigte', vol: 0.05 },
  { zin: 1, C: B_Kroning, sfeer: 'menigte', vol: 0.07, accent: [{ bij: 2.3, src: 'glans', vol: 0.18 }] },
  { zin: 2, C: C_Helena, sfeer: 'zee', vol: 0.16, accent: [{ bij: 0.2, src: 'wind', vol: 0.08 }] },
  { zin: 3, C: D_Titel, sfeer: 'zee', vol: 0.1, accent: [{ bij: 0.05, src: 'inslag', vol: 0.22 }, { bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 4, C: E_Kaart1769, sfeer: 'wind', vol: 0.04, accent: [{ bij: 4.7, src: 'tik', vol: 0.3 }, { bij: 4.9, src: 'glans', vol: 0.14 }] },
  { zin: 5, C: F_Dorp, sfeer: 'zee', vol: 0.09 },
  { zin: 6, C: G_Aankomst, sfeer: 'wind', vol: 0.06 },
  { zin: 7, C: H_Uitgelachen, sfeer: 'menigte', vol: 0.09 },
  { zin: 8, C: I_Lezen, sfeer: 'vuur', vol: 0.05 },
  { zin: 9, C: J_Helden, sfeer: 'vuur', vol: 0.05, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  { zin: 10, C: K_Officier, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.3, src: 'inslag', vol: 0.12 }] },
  // de Revolutie
  { zin: 11, C: S2.N11_Ontploft, sfeer: 'vuur', vol: 0.12, accent: [{ bij: 0.1, src: 'inslag', vol: 0.2 }] },
  { zin: 12, C: S2.N12_Bastille, sfeer: 'menigte', vol: 0.14 },
  { zin: 13, C: S2.N13_KaartToulon, sfeer: 'zee', vol: 0.05, accent: [{ bij: 2.2, src: 'tik', vol: 0.28 }] },
  { zin: 14, C: S2.N14_Toulon, sfeer: 'vuur', vol: 0.06, accent: [{ bij: 0.6, src: 'inslag', vol: 0.18 }, { bij: 2.33, src: 'inslag', vol: 0.16 }] },
  { zin: 15, C: S2.N15_Generaal, sfeer: 'menigte', vol: 0.1, accent: [{ bij: 0.2, src: 'glans', vol: 0.14 }] },
  { zin: 17, C: S2.N17_Royalisten, sfeer: 'menigte', vol: 0.13 },
  { zin: 18, C: S2.N18_Kanonvuur, accent: [{ bij: 0.2, src: 'inslag', vol: 0.24 }] },
  { zin: 19, C: S2.N19_Druivenhagel, sfeer: 'wind', vol: 0.08 },
  // Italië en Egypte
  { zin: 20, C: S2.N20_Bruiloft, sfeer: 'vuur', vol: 0.04, accent: [{ bij: 0.4, src: 'glans', vol: 0.12 }] },
  { zin: 21, C: S2.N21_NaarItalie, sfeer: 'wind', vol: 0.04 },
  { zin: 22, C: S2.N22_Haveloos, sfeer: 'wind', vol: 0.1 },
  { zin: 23, C: S2.N23_Lodi, sfeer: 'menigte', vol: 0.14 },
  { zin: 23, na: 2.0, C: S2.N23b_KaartItalie, accent: [{ bij: 0.2, src: 'tik', vol: 0.26 }] },
  { zin: 24, C: S2.N24_Vloot, sfeer: 'zee', vol: 0.16 },
  { zin: 25, C: S2.N25_Piramides, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.3, src: 'glans', vol: 0.14 }] },
  { zin: 26, C: S2.N26_Rosetta, sfeer: 'wind', vol: 0.06, accent: [{ bij: 1.0, src: 'glans', vol: 0.16 }] },
  { zin: 27, C: S2.N27_Nijl, sfeer: 'vuur', vol: 0.12, accent: [{ bij: 0.3, src: 'inslag', vol: 0.2 }, { bij: 1.5, src: 'val', vol: 0.14 }] },
  // Eerste Consul
  { zin: 28, C: S2.N28_Brumaire, sfeer: 'menigte', vol: 0.06 },
  { zin: 29, C: S2.N29_Zaal, sfeer: 'menigte', vol: 0.12, accent: [{ bij: 0.2, src: 'tik', vol: 0.25 }] },
  { zin: 30, C: S2.N30_Consul, accent: [{ bij: 0.3, src: 'glans', vol: 0.14 }] },
  { zin: 31, C: S2.N31_Alpen, sfeer: 'wind', vol: 0.16 },
  { zin: 32, C: S2.N32_Schilderij, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.2, src: 'glans', vol: 0.16 }] },
  { zin: 33, C: S2.N33_Muilezel, sfeer: 'wind', vol: 0.12, accent: [{ bij: 0.3, src: 'tik', vol: 0.28 }] },
  { zin: 34, C: S2.N34_Wetboek, accent: [{ bij: 0.5, src: 'inslag', vol: 0.14 }] },
  { zin: 35, C: S2.N35_KaartCode, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }] },
  // keizer
  { zin: 36, C: S2.N36_Kroning, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 4.5, src: 'glans', vol: 0.2 }] },
  { zin: 38, C: S2.N38_Austerlitz, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.3, src: 'inslag', vol: 0.14 }] },
  { zin: 39, C: S2.N39_Trafalgar, sfeer: 'zee', vol: 0.16, accent: [{ bij: 0.4, src: 'inslag', vol: 0.18 }, { bij: 2.0, src: 'inslag', vol: 0.14 }] },
  { zin: 40, C: S2.N40_Land, sfeer: 'zee', vol: 0.05, accent: [{ bij: 0.2, src: 'tik', vol: 0.26 }] },
  { zin: 42, C: S2.N42_Broers, accent: [{ bij: 0.4, src: 'glans', vol: 0.14 }, { bij: 0.8, src: 'tik', vol: 0.2 }] },
  { zin: 43, C: S2.N43_Scheiding, sfeer: 'vuur', vol: 0.04, accent: [{ bij: 2.8, src: 'glans', vol: 0.12 }] },
  // Rusland
  { zin: 44, C: S2.N44_Rusland, sfeer: 'wind', vol: 0.1 },
  { zin: 45, C: S2.N45_Verbrand, sfeer: 'vuur', vol: 0.16 },
  { zin: 46, C: S2.N46_Moskou, sfeer: 'wind', vol: 0.08 },
  { zin: 47, C: S2.N47_Leeg, sfeer: 'wind', vol: 0.14 },
  { zin: 48, C: S2.N48_Brand, sfeer: 'vuur', vol: 0.2, accent: [{ bij: 0.1, src: 'inslag', vol: 0.2 }] },
  { zin: 49, C: S2.N49_Wachten, sfeer: 'vuur', vol: 0.04 },
  { zin: 50, C: S2.N50_Terug, sfeer: 'wind', vol: 0.08 },
  { zin: 51, C: S2.N51_Winter, sfeer: 'wind', vol: 0.2 },
  { zin: 52, C: S2.N52_Terugkomst, sfeer: 'wind', vol: 0.16, accent: [{ bij: 0.6, src: 'val', vol: 0.14 }] },
  // Elba en Waterloo
  { zin: 53, C: S2.N53_Vijanden, accent: [{ bij: 0.2, src: 'inslag', vol: 0.16 }] },
  { zin: 54, C: S2.N54_Elba, sfeer: 'zee', vol: 0.1 },
  { zin: 55, C: S2.N55_Ontsnapping, sfeer: 'zee', vol: 0.14 },
  { zin: 56, C: S2.N56_Laffrey, sfeer: 'wind', vol: 0.06 },
  { zin: 59, C: S2.N59_HonderdDagen, sfeer: 'menigte', vol: 0.16 },
  { zin: 60, C: S2.N60_Waterloo, sfeer: 'rivier', vol: 0.14, accent: [{ bij: 0.6, src: 'inslag', vol: 0.18 }, { bij: 2.6, src: 'inslag', vol: 0.14 }] },
  // Sint-Helena
  { zin: 61, C: S2.N61_Bellerophon, sfeer: 'zee', vol: 0.16 },
  { zin: 62, C: S2.N62_Helena, sfeer: 'zee', vol: 0.16, accent: [{ bij: 0.2, src: 'wind', vol: 0.1 }] },
  { zin: 63, C: S2.N63_Dicteren, sfeer: 'wind', vol: 0.04 },
  { zin: 64, C: S2.N64_Sterfbed, sfeer: 'vuur', vol: 0.03, accent: [{ bij: 2.3, src: 'val', vol: 0.12 }] },
  { zin: 65, C: S2.N65_Invalides, sfeer: 'menigte', vol: 0.05, accent: [{ bij: 0.4, src: 'glans', vol: 0.16 }] },
  { zin: 66, C: S2.N66_Lengte, accent: [{ bij: 1.8, src: 'tik', vol: 0.28 }] },
  { zin: 68, C: S2.N68_Spotprent, accent: [{ bij: 0.2, src: 'tik', vol: 0.24 }] },
  { zin: 69, C: S2.N69_Krimp, accent: [{ bij: 0.4, src: 'val', vol: 0.14 }] },
  { zin: 70, C: S2.N70_Beeld, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'glans', vol: 0.16 }, { bij: 4.2, src: 'afsluiter', vol: 0.22 }] },
];
const STARTS = SHOTS.map((s) => (s.zin === 0 ? 0 : ZINNEN[s.zin].start - 0.3 + (s.na ?? 0)));
const EIND = ZINNEN.at(-1)!.eind + 2.2;
export const NAPOLEON_LANG_DUUR = Math.round(EIND * FPS);
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

const Ondertitels = () => {
  const f = useCurrentFrame();
  const nu = f / FPS;
  return (
    <>
      {ZINNEN.map((z, i) => (
        <Ondertitel key={i} zin={z.zin.replace('Josephine', 'Joséphine')} start={z.start} eind={z.eind} nu={nu} />
      ))}
    </>
  );
};

export const NapoleonLang = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SHOTS.map((s, i) => {
      const van = Math.round(STARTS[i] * FPS);
      const tot = Math.round((i < SHOTS.length - 1 ? STARTS[i + 1] : EIND) * FPS);
      const duur = tot - van;
      return (
        <Sequence key={i} from={van} durationInFrames={duur}>
          <s.C van={STARTS[i]} />
          {s.sfeer && <Audio src={sfx(s.sfeer)} loop volume={(fr) => interpolate(fr, [0, 8, duur - 8, duur], [0, s.vol!, s.vol!, 0], { extrapolateRight: 'clamp' })} />}
          {s.accent?.map((a, k) => (
            <Sequence key={k} from={Math.round(a.bij * FPS)} durationInFrames={60}>
              <Audio src={sfx(a.src)} volume={a.vol} />
            </Sequence>
          ))}
        </Sequence>
      );
    })}
    {STARTS.slice(1).map((st, i) => (
      <Sequence key={`w${i}`} from={Math.max(0, Math.round(st * FPS) - 12)} durationInFrames={24}>
        <Audio src={sfx('whoosh')} volume={0.16} />
      </Sequence>
    ))}
    <Ondertitels />
    <LangWatermerk />
    <Audio src={staticFile('lokaal/napoleon-lang-voice.mp3')} volume={1.25} />
  </AbsoluteFill>
);
