import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { Avondlicht, Binnenlicht, Boom, Camera, Daglicht, Galei, Grond, Heuvels, Lucht, Nachtlicht, Paard, Tent, TekstVlak, Vuur, Zee, Zon } from '../watals/Decor';
import { Blok, BRONS, Figuur, type Kleding, type V3 } from '../watals/Figuur';
import { Stadsmuur } from '../watals/MehmedKit';
import { ALVA, Baret, BURGER, CHARLOTTE, HENDRIK, HoofdW, KAREL, Kraag, Molen, ORANJE, PAARD_W, Prinsenvlag, Trapgevels, WILLEM, WILLEM_KIND, ZOON } from '../watals/WatAlsWillem';
import { ease, FPS, lin, Shot } from './basis';
import { KaarttafelNL, opNL, PLAATS_NL, SpeldNL, type NLStand, type PlaatsNL } from './KaarttafelNL';
import { ORANJE as HUD_ORANJE, SERIF } from './LangHud';
import { camPos, Vogels } from './LeonidasKit';

/**
 * Kit voor "What if you were William of Orange?" (lange video #08, 16:9). Hergebruikt de figuren en de
 * Hollandse decorstukken uit de Willem-short (WatAlsWillem.tsx). Geen geweld in beeld: een schot is een flits
 * en rook, de dood is de muur met de kogelgaten en de gevallen baret. Geen kruisen, geen kerkinterieurs.
 */

export { ORANJE, WILLEM, WILLEM_KIND, KAREL, HENDRIK, ALVA, ZOON, CHARLOTTE, BURGER, Baret, HoofdW, Kraag, Molen, Trapgevels, Prinsenvlag, PAARD_W };

/* ================= figuren ================= */

export const WILLEM_JONG: Kleding = { huid: '#E9C29E', haar: '#7A5636', tuniek: '#3A2A4A', benen: '#2A2236', schoenen: '#2A1E16', riem: ORANJE, cape: '#5A3A6A' };
export const VADER_W: Kleding = { huid: '#DDAE88', haar: '#5A4434', tuniek: '#5A4A36', benen: '#3A3026', schoenen: '#2A1E16', riem: '#8A6A3A' };
export const MOEDER_W: Kleding = { huid: '#E6BC98', haar: '#5A4434', tuniek: '#2E2A3A', rok: '#2E2A3A', schoenen: '#1A1612', cape: '#F2EEE6' };
export const KIND: Kleding = { huid: '#E9C29E', haar: '#8A6440', tuniek: '#6A7A4A', benen: '#4A3A2A', schoenen: '#2A1E16' };
export const KIND2: Kleding = { huid: '#E9C29E', haar: '#A07A4A', tuniek: '#8A4A3A', rok: '#8A4A3A', schoenen: '#2A1E16' };
export const FILIPS: Kleding = { huid: '#E4BC9A', haar: '#B08A52', tuniek: '#101010', benen: '#101010', schoenen: '#101010', riem: '#D8A945', cape: '#1A1A1A' };
export const ANNA: Kleding = { huid: '#EAC7A2', haar: '#8A5A34', tuniek: '#8E1F25', rok: '#8E1F25', schoenen: '#2A1E16', cape: '#D8A945' };
export const MARGARETHA: Kleding = { huid: '#E6BC98', haar: '#6B4A30', tuniek: '#1A1612', rok: '#1A1612', schoenen: '#1A1612', cape: '#F2EEE6' };
export const EGMONT: Kleding = { huid: '#E2B48E', haar: '#4A3424', tuniek: '#8E1F25', benen: '#3A1A14', schoenen: '#2A1E16', riem: '#D8A945', cape: '#5A1A14' };
export const HORN: Kleding = { huid: '#E2B48E', haar: '#6B5A4A', tuniek: '#2F4F6E', benen: '#1E2A3A', schoenen: '#2A1E16', riem: '#D8A945' };
export const EDEL: Kleding = { huid: '#E2B48E', haar: '#5A4434', tuniek: '#4A3A5A', benen: '#2A2236', schoenen: '#2A1E16', riem: '#C9A646', cape: '#2A2236' };
export const GEUS: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#8A8478', benen: '#5A5448', schoenen: '#2A1E16', riem: '#5A3B24' };
export const RAADSHEER: Kleding = { huid: '#DDAE88', haar: '#B9B4AA', tuniek: '#3A1A1A', rok: '#3A1A1A', schoenen: '#1A1612', riem: '#C9A646' };
export const GERARD: Kleding = { huid: '#E0B490', haar: '#4A3A2A', tuniek: '#5A5650', benen: '#3A3632', schoenen: '#2A1E16', cape: '#46423C' };
export const SPANJAARD: Kleding = { huid: '#D8A880', haar: '#2A1E16', tuniek: '#8E2A22', borst: '#6A6C72', benen: '#3A1A14', schoenen: '#1A1410', laarzen: '#1A1410' };
export const ZEEGEUS: Kleding = { huid: '#D8A880', haar: '#5A3A24', tuniek: '#3A4A5A', benen: '#5A4A3A', schoenen: '#2A1E16', riem: ORANJE };
export const STUDENT: Kleding = { huid: '#E9C29E', haar: '#6B4A30', tuniek: '#1A1612', benen: '#1A1612', schoenen: '#1A1612' };

/** Volwassen Willem met baret en kraag, met baard (vanaf ~1559). */
export const W = { kleding: WILLEM, baard: true, snor: true, hoofdExtra: <HoofdW />, levend: true } as const;
/** Jonge Willem aan het hof, zonder baard. */
export const WJ = { kleding: WILLEM_JONG, hoofdExtra: <><Baret veer /><Kraag /></>, levend: true } as const;
export const KAREL_P = { kleding: KAREL, baard: true, hoofdExtra: <HoofdW />, levend: true } as const;
export const FILIPS_P = { kleding: FILIPS, baard: true, hoofdExtra: <><Baret /><Kraag /></>, levend: true } as const;
export const ALVA_P = { kleding: ALVA, baard: true, hoofdExtra: <><Kraag /></>, levend: true, haar: 'grijs' as const } as const;
export const HENDRIK_P = { kleding: HENDRIK, baard: true, hoofdExtra: <Baret veer />, levend: true } as const;

export const FiguurW = (p: Parameters<typeof Figuur>[0]) => <Figuur levend {...p} />;

/* ================= rekwisieten ================= */

export const Tafel = ({ position, b = 2.4, d = 1.0, kleur = '#6B4A2E' }: { position: V3; b?: number; d?: number; kleur?: string }) => (
  <group position={position}>
    <Blok p={[0, 0.78, 0]} s={[b, 0.08, d]} c={kleur} />
    {[-1, 1].map((x) => [-1, 1].map((z) => <Blok key={`${x}${z}`} p={[x * (b / 2 - 0.1), 0.38, z * (d / 2 - 0.1)]} s={[0.08, 0.76, 0.08]} c="#4A3020" />))}
  </group>
);

export const Stoel = ({ position, rotation, kleur = '#5A3B24' }: { position: V3; rotation?: V3; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.45, 0]} s={[0.5, 0.06, 0.5]} c={kleur} />
    <Blok p={[0, 0.95, -0.22]} s={[0.5, 0.9, 0.06]} c={kleur} />
    {[-1, 1].map((x) => [-1, 1].map((z) => <Blok key={`${x}${z}`} p={[x * 0.2, 0.22, z * 0.2]} s={[0.05, 0.44, 0.05]} c={kleur} />))}
  </group>
);

export const Kaars = ({ position }: { position: V3 }) => {
  const f = useCurrentFrame();
  const k = 1 + Math.sin(f / 3 + position[0] * 5) * 0.15;
  return (
    <group position={position}>
      <Blok p={[0, 0.12, 0]} s={[0.06, 0.24, 0.06]} c="#F2EEE0" />
      <Blok p={[0, 0.28, 0]} s={[0.04, 0.08 * k, 0.04]} c="#FFC45A" emissive="#FF9A2A" />
    </group>
  );
};

/** Stapel munten (goud of zilver) die kan groeien. */
export const Munten = ({ position, n = 12, kleur = '#D8A945' }: { position: V3; n?: number; kleur?: string }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => (
      <Blok key={i} p={[((i * 37) % 7) * 0.07 - 0.2, 0.03 + Math.floor(i / 6) * 0.05, ((i * 53) % 5) * 0.07 - 0.14]} s={[0.12, 0.04, 0.12]} c={kleur} metal={0.8} rough={0.3} />
    ))}
  </group>
);

export const Boek = ({ position, rotation, kleur = '#3A2418', open = false }: { position: V3; rotation?: V3; kleur?: string; open?: boolean }) => (
  <group position={position} rotation={rotation}>
    {open ? (
      <>
        <Blok p={[-0.13, 0.02, 0]} s={[0.25, 0.03, 0.34]} c="#EFE3C4" r={[0, 0, 0.08]} />
        <Blok p={[0.13, 0.02, 0]} s={[0.25, 0.03, 0.34]} c="#EFE3C4" r={[0, 0, -0.08]} />
        <Blok p={[0, 0.0, 0]} s={[0.54, 0.02, 0.36]} c={kleur} />
      </>
    ) : (
      <>
        <Blok p={[0, 0.05, 0]} s={[0.3, 0.1, 0.4]} c={kleur} />
        <Blok p={[0.01, 0.05, 0]} s={[0.28, 0.08, 0.38]} c="#EFE3C4" />
      </>
    )}
  </group>
);

export const Kist = ({ position, rotation, open = 0, vol = true }: { position: V3; rotation?: V3; open?: number; vol?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.25, 0]} s={[0.9, 0.5, 0.55]} c="#6B4A2E" />
    {[-0.3, 0.3].map((x) => <Blok key={x} p={[x, 0.25, 0.28]} s={[0.06, 0.5, 0.02]} c="#3A3A3A" metal={0.6} />)}
    {vol && <Munten position={[0.05, 0.42, 0]} n={10} />}
    <group position={[0, 0.5, -0.27]} rotation={[-open * 1.6, 0, 0]}>
      <Blok p={[0, 0.04, 0.27]} s={[0.92, 0.08, 0.57]} c="#5A3B24" />
    </group>
  </group>
);

/** Bedelnap aan een koord om de hals (het geuzenteken). */
export const Nap = () => (
  <group position={[0, 1.38, 0.26]}>
    <Blok p={[0, 0, 0]} s={[0.22, 0.08, 0.06]} c="#8A6A3A" />
    <Blok p={[0, 0.2, -0.02]} s={[0.02, 0.36, 0.02]} c="#3A2A1C" />
  </group>
);

/** Bril op de neus (in de hoofdgroep). */
export const Bril = ({ val = 0 }: { val?: number }) => (
  <group position={[0, 0.42 - val * 1.6, 0.33 + val * 0.4]} rotation={[val * 2.5, 0, val * 0.8]}>
    {[-0.13, 0.13].map((x) => (
      <group key={x} position={[x, 0, 0]}>
        <Blok p={[0, 0.07, 0]} s={[0.18, 0.025, 0.02]} c="#2A1E16" />
        <Blok p={[0, -0.07, 0]} s={[0.18, 0.025, 0.02]} c="#2A1E16" />
        <Blok p={[-0.08, 0, 0]} s={[0.025, 0.16, 0.02]} c="#2A1E16" />
        <Blok p={[0.08, 0, 0]} s={[0.025, 0.16, 0.02]} c="#2A1E16" />
        <Blok p={[0, 0, -0.005]} s={[0.14, 0.12, 0.005]} c="#CFE6F2" rough={0.05} />
      </group>
    ))}
    <Blok p={[0, 0.02, 0]} s={[0.1, 0.025, 0.02]} c="#2A1E16" />
  </group>
);

/** Wortel (oranje), ligt plat. */
export const Wortel = ({ position, rotation }: { position: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0, 0]} s={[0.12, 0.12, 0.42]} c="#EE7A2A" />
    <Blok p={[0, 0, 0.27]} s={[0.07, 0.07, 0.14]} c="#E06A1E" />
    {[-0.04, 0.04].map((x) => <Blok key={x} p={[x, 0.04, -0.28]} s={[0.03, 0.03, 0.2]} c="#5A8A3A" r={[0.4, x * 4, 0]} />)}
  </group>
);

/** Muur met twee kogelgaten (Prinsenhof, Delft). */
export const Kogelgaten = ({ position }: { position: V3 }) => (
  <group position={position}>
    {[[-0.4, 1.9], [0.15, 1.6]].map(([x, y]) => (
      <group key={x}>
        <Blok p={[x, y, 0]} s={[0.12, 0.12, 0.04]} c="#1A1410" />
        <Blok p={[x, y, -0.005]} s={[0.2, 0.2, 0.03]} c="#A89A86" />
      </group>
    ))}
  </group>
);

/** Flits van een pistoolschot (licht + witte ster), op frame `op`. */
export const Flits = ({ p, op = 10 }: { p: V3; op?: number }) => {
  const f = useCurrentFrame();
  const k = f >= op && f < op + 6 ? 1 - (f - op) / 6 : 0;
  if (!k) return null;
  return (
    <group position={p}>
      <pointLight intensity={30 * k} distance={10} color="#FFE6A0" />
      <Blok p={[0, 0, 0]} s={[0.5 * k, 0.12, 0.12]} c="#FFF6D0" emissive="#FFE080" />
      <Blok p={[0, 0, 0]} s={[0.12, 0.5 * k, 0.12]} c="#FFF6D0" emissive="#FFE080" />
    </group>
  );
};

/** Pistool (radslot), in de hand. */
export const Pistool = () => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <Blok p={[0, 0.06, 0]} s={[0.06, 0.14, 0.08]} c="#5A3B24" />
    <Blok p={[0, 0.22, 0.03]} s={[0.04, 0.3, 0.04]} c="#3A3A3E" metal={0.8} rough={0.3} />
  </group>
);

/** Bronzen ruiterstandbeeld van Willem op een sokkel. */
export const Standbeeld = ({ position, schaal = 1 }: { position: V3; schaal?: number }) => {
  return (
    <group position={position} scale={schaal}>
      <Blok p={[0, 0.9, 0]} s={[2.6, 1.8, 3.2]} c="#B8AE9C" />
      <Blok p={[0, 1.86, 0]} s={[2.8, 0.12, 3.4]} c="#A89E8C" />
      <group position={[0, 1.92, 0]}>
        <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.4, 0]} kleur={BRONS!.kleur} manen={BRONS!.kleur} dek={BRONS!.kleur} ruiter={<Figuur kleding={WILLEM} baard snor hoofdExtra={<HoofdW />} o={BRONS} pose={{ armR: { schouder: [-1.2, 0, -0.3], elleboog: [0, -0.1] } }} />} />
      </group>
    </group>
  );
};

/** Kasteel Dillenburg op zijn heuvel: donjon, twee ronde torens, muur, leien daken. */
export const Kasteel = ({ position, schaal = 1 }: { position: V3; schaal?: number }) => (
  <group position={position} scale={schaal}>
    <mesh position={[0, 1.2, 0]} receiveShadow>
      <cylinderGeometry args={[9, 13, 2.4, 10]} />
      <meshStandardMaterial color="#6E8A42" roughness={1} flatShading />
    </mesh>
    <Blok p={[0, 4.4, 0]} s={[5, 4, 4]} c="#B8A88A" rough={1} />
    <Blok p={[0, 7.4, 0]} s={[3, 2, 3]} c="#B0A084" rough={1} />
    <mesh position={[0, 9.2, 0]} castShadow>
      <coneGeometry args={[2.3, 1.8, 4]} />
      <meshStandardMaterial color="#3A3E46" roughness={0.9} flatShading />
    </mesh>
    {[-3.6, 3.6].map((x) => (
      <group key={x} position={[x, 2.4, 1.6]}>
        <mesh position={[0, 2.6, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.2, 5.2, 10]} />
          <meshStandardMaterial color="#C0B092" roughness={1} flatShading />
        </mesh>
        <mesh position={[0, 6.0, 0]} castShadow>
          <coneGeometry args={[1.4, 1.8, 10]} />
          <meshStandardMaterial color="#3A3E46" roughness={0.9} flatShading />
        </mesh>
      </group>
    ))}
    <Blok p={[0, 3.4, 2.4]} s={[7, 2, 0.5]} c="#B0A084" rough={1} />
    <Blok p={[0, 3.0, 2.66]} s={[1.2, 1.4, 0.06]} c="#3A2A1C" />
    {[-1.2, 1.2].map((x) => [4.4, 5.6].map((y) => <Blok key={`${x}${y}`} p={[x, y, 2.02]} s={[0.5, 0.7, 0.04]} c="#2A2A34" />))}
    <group position={[0, 8.4, 0]}>
      <Blok p={[0, 1.2, 0]} s={[0.08, 2.4, 0.08]} c="#3A2A1C" />
      <Blok p={[0.6, 2.0, 0]} s={[1.1, 0.7, 0.04]} c="#2A4A9A" />
      <Blok p={[0.6, 2.0, 0.025]} s={[0.36, 0.42, 0.01]} c="#D8A945" />
    </group>
  </group>
);

/** Universiteitsgebouw (Leiden): brede gevel met torentje. */
export const Universiteit = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 3, 0]} s={[12, 6, 4]} c="#9A5A40" rough={1} />
    {[0, 1, 2].map((s) => <Blok key={s} p={[0, 6.4 + s * 0.7, 1.6]} s={[5 - s * 1.6, 0.7, 0.6]} c="#9A5A40" rough={1} />)}
    <Blok p={[0, 9.2, 0]} s={[1.4, 2.4, 1.4]} c="#E9DFC8" />
    <mesh position={[0, 11, 0]}>
      <coneGeometry args={[1.0, 1.4, 8]} />
      <meshStandardMaterial color="#3A3E46" roughness={0.9} flatShading />
    </mesh>
    {[-4.5, -2.5, 2.5, 4.5].map((x) => [1.6, 3.8].map((y) => <Blok key={`${x}${y}`} p={[x, y, 2.02]} s={[0.9, 1.3, 0.04]} c="#E9DFC8" />))}
    <Blok p={[0, 1.3, 2.02]} s={[1.6, 2.6, 0.04]} c="#3A2A1C" />
  </group>
);

/* ================= licht + lucht per tijd ================= */

export type TijdW = 'dag' | 'avond' | 'nacht' | 'grijs';
const LUCHT: Record<TijdW, { boven: string; horizon: string; mist: string }> = {
  dag: { boven: '#7FA6D4', horizon: '#E6DCC4', mist: '#D8D2C0' },
  avond: { boven: '#4E3A6A', horizon: '#F4A35A', mist: '#E8A070' },
  nacht: { boven: '#121A2E', horizon: '#2A3248', mist: '#1A2034' },
  grijs: { boven: '#6E7A86', horizon: '#B4B8B6', mist: '#A8ACAA' },
};
const LichtW = ({ tijd }: { tijd: TijdW }) =>
  tijd === 'avond' ? (
    <>
      <Avondlicht />
      <hemisphereLight args={['#FFC8A0', '#3A2A20', 0.5]} />
      <Zon position={[-20, 9, -140]} grootte={14} kleur="#FFD08A" />
    </>
  ) : tijd === 'nacht' ? (
    <Nachtlicht />
  ) : tijd === 'grijs' ? (
    <Daglicht zon={[6, 12, 8]} kleur="#D8DCE0" kracht={1.1} omgeving={1.2} />
  ) : (
    <Daglicht zon={[8, 12, 9]} />
  );

type SetProps = { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; tijd?: TijdW };

const Cam = ({ cam, kijk, duur }: { cam: number[]; kijk: V3; duur: number }) => {
  const f = useCurrentFrame();
  return <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />;
};

/* ================= sets ================= */

/** Dillenburg: kasteel op de heuvel, Duitse bossen eromheen. */
export const Dillenburg = ({ children, over, cam = [8, 4, 22, 6, 4.5, 18], kijk = [0, 5, -14] as V3, duur = 170, tijd = 'dag' }: SetProps) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.2} mist={[L.mist, 30, 160]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtW tijd={tijd} />
      <Grond kleur="#6E8A42" />
      <Heuvels kleur="#4E6A36" z={-60} />
      <Kasteel position={[0, 0, -16]} />
      {Array.from({ length: 34 }, (_, i) => {
        const a = (i / 34) * Math.PI * 2;
        const r = 20 + (i % 4) * 3;
        const x = Math.cos(a) * r;
        const z = -16 + Math.sin(a) * r;
        if (z > -6) return null;
        return <Boom key={i} position={[x, 0, z]} schaal={1.3 + (i % 3) * 0.3} kleur={['#3F6A32', '#4E7A3A', '#355A2C'][i % 3]} />;
      })}
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Kamer in Dillenburg of een herenhuis: houten lambrisering, haard, raam. */
export const Kamer = ({ children, over, cam = [1.6, 1.9, 5.2, 1.0, 1.8, 4.2], kijk = [0, 1.2, 0] as V3, duur = 160, avond = false, sepia = false }: SetProps & { avond?: boolean; sepia?: boolean }) => (
  <Shot focus={kijk} scherpte={3.2} mist={avond ? ['#2A1E14', 6, 28] : ['#E2D2B4', 8, 40]} over={<>{over}{sepia && <div style={{ position: 'absolute', inset: 0, background: 'rgba(140,96,40,0.3)', mixBlendMode: 'multiply' }} />}</>}>
    <Lucht boven={avond ? '#1E1610' : '#EADCC0'} horizon={avond ? '#2A1E14' : '#EADCC0'} />
    {avond ? (
      <>
        <hemisphereLight args={['#8A7A68', '#2A1E14', 0.6]} />
        <pointLight position={[1.0, 2.0, 1.2]} intensity={7} distance={8} color="#FFA850" />
      </>
    ) : (
      <Daglicht zon={[-4, 6, 6]} kracht={1.4} omgeving={1.4} />
    )}
    <Grond kleur="#7A5A3A" />
    <Blok p={[0, 3, -1.8]} s={[10, 6, 0.3]} c="#D8C4A0" />
    <Blok p={[0, 0.7, -1.6]} s={[10, 1.4, 0.1]} c="#6B4A2E" />
    <Blok p={[-4, 3, 0]} s={[0.3, 6, 6]} c="#CDB894" />
    <Blok p={[-1.8, 2.0, -1.63]} s={[1.1, 1.3, 0.05]} c="#5A3B24" />
    <Blok p={[-1.8, 2.0, -1.6]} s={[0.96, 1.16, 0.05]} c={avond ? '#1E2440' : '#A8D2EE'} />
    <Blok p={[-1.8, 2.0, -1.57]} s={[0.04, 1.16, 0.02]} c="#5A3B24" />
    <Blok p={[-1.8, 2.0, -1.57]} s={[0.96, 0.04, 0.02]} c="#5A3B24" />
    {/* haard */}
    <group position={[2.4, 0, -1.4]}>
      <Blok p={[0, 1.2, 0]} s={[1.8, 2.4, 0.5]} c="#A89A86" />
      <Blok p={[0, 0.6, 0.2]} s={[1.1, 1.0, 0.2]} c="#1A1410" />
      <Vuur position={[0, 0.15, 0.25]} t={0} grootte={0.5} />
      <pointLight position={[0, 0.6, 0.8]} intensity={3} distance={4} color="#FF9A40" />
    </group>
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/** De hofzaal in Brussel (en Madrid): rode wandkleden, gouden troon op een podium, zuilen, kaarsen. */
export const HofZaal = ({ children, over, cam = [2.8, 2.6, 8.4, 1.8, 2.4, 7.0], kijk = [0, 1.9, -1] as V3, duur = 160, donker = false, troon = true }: SetProps & { donker?: boolean; troon?: boolean }) => (
  <Shot focus={kijk} scherpte={3} mist={donker ? ['#120C08', 6, 26] : ['#3A2618', 10, 40]} over={over}>
    <Lucht boven={donker ? '#0E0A08' : '#2E1E14'} horizon={donker ? '#1E140C' : '#5A3E28'} />
    {donker ? (
      <>
        <hemisphereLight args={['#5A4A3A', '#120C08', 0.4]} />
        <pointLight position={[0, 3.4, 1.4]} intensity={7} distance={10} color="#FF9A50" />
      </>
    ) : (
      <>
        <Binnenlicht zon={[-4, 9, 4]} kleur="#FFD49A" />
        <pointLight position={[0, 3.4, 1]} intensity={4} distance={10} color="#FFB868" />
      </>
    )}
    <Grond kleur="#6A5A48" />
    <Blok p={[0, 3.5, -4.2]} s={[16, 7, 0.4]} c="#B8A88A" />
    {[-5.4, -2.2, 2.2, 5.4].map((x) => (
      <group key={x}>
        <Blok p={[x, 3.6, -3.95]} s={[2.2, 4.4, 0.06]} c="#7A1E22" />
        <Blok p={[x, 3.6, -3.92]} s={[1.9, 4.1, 0.04]} c="#8E2A28" />
        <Blok p={[x, 3.6, -3.9]} s={[1.2, 0.08, 0.02]} c="#D8A945" />
        <Blok p={[x, 5.82, -3.9]} s={[2.3, 0.1, 0.1]} c="#5A3B24" />
      </group>
    ))}
    {[-3.8, 3.8].map((x) => (
      <group key={`z${x}`} position={[x, 0, -2.6]}>
        <Blok p={[0, 3, 0]} s={[0.6, 6, 0.6]} c="#CFC4AE" />
        <Blok p={[0, 6.1, 0]} s={[0.85, 0.2, 0.85]} c="#BFB49C" />
      </group>
    ))}
    <Blok p={[0, 0.02, 0.4]} s={[3.4, 0.04, 9]} c="#7A1E22" />
    {troon && (
      <group position={[0, 0, -3.0]}>
        <Blok p={[0, 0.2, 0]} s={[3.2, 0.4, 1.8]} c="#5A3B24" />
        <Blok p={[0, 0.9, -0.2]} s={[1.1, 1.0, 0.9]} c="#B8912F" metal={0.5} rough={0.35} />
        <Blok p={[0, 1.9, -0.6]} s={[1.1, 2.0, 0.2]} c="#B8912F" metal={0.5} rough={0.35} />
        <Blok p={[0, 1.9, -0.48]} s={[0.8, 1.6, 0.04]} c="#7A1E22" />
      </group>
    )}
    {[-1.8, 1.8].map((x) => (
      <group key={`k${x}`} position={[x, 0, -2.2]}>
        <Blok p={[0, 0.7, 0]} s={[0.12, 1.4, 0.12]} c="#C9A646" metal={0.7} />
        <Kaars position={[0, 1.4, 0]} />
      </group>
    ))}
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/** Bos (jacht bij Parijs, vlucht naar Duitsland). */
export const Woud = ({ children, over, cam = [3, 2.8, 12, 2, 2.8, 10.5], kijk = [0, 2.6, 0] as V3, duur = 160, tijd = 'dag' }: SetProps) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={3} mist={[tijd === 'dag' ? '#9AAA7A' : L.mist, 14, 70]} over={over}>
      <Lucht boven={L.boven} horizon={tijd === 'dag' ? '#DDE6C8' : L.horizon} />
      <LichtW tijd={tijd} />
      <Grond kleur="#5E7A38" />
      {Array.from({ length: 30 }, (_, i) => <Boom key={i} position={[-26 + i * 1.8, 0, -7 - (i % 4) * 3.5]} schaal={1.4 + (i % 4) * 0.25} kleur={['#4E7A3A', '#5D8A40', '#3F6A32'][i % 3]} />)}
      {[-9, -6, 7, 10].map((x, i) => <Boom key={`v${x}`} position={[x, 0, 2 - i]} schaal={1.6} kleur="#3F6A32" />)}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Hollandse polder met molens. */
export const PolderSet = ({ children, over, cam = [5, 2.8, 12, 3.6, 3.0, 10], kijk = [0, 2.6, 0] as V3, duur = 160, tijd = 'dag' }: SetProps) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.6} mist={[L.mist, 30, 160]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtW tijd={tijd} />
      <Grond kleur={tijd === 'grijs' ? '#6E7A52' : '#7E9A4E'} />
      {[-30, -12, 14, 34].map((x, i) => <Molen key={x} position={[x, 0, -40 - (i % 2) * 12]} t={t + i} schaal={1.4} />)}
      {[-40, -20, 0, 20, 40].map((x) => <Blok key={x} p={[x, 0.02, -20]} s={[0.4, 0.04, 60]} c="#4A7A9A" />)}
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Straat met trapgevels aan beide kanten (Brussel, Antwerpen, Leiden, Delft). */
export const Straat = ({ children, over, cam = [2.4, 2.4, 9, 1.6, 2.2, 7.6], kijk = [0, 1.8, 0] as V3, duur = 160, tijd = 'dag', zaad = 1 }: SetProps & { zaad?: number }) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.8} mist={[L.mist, 18, 90]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtW tijd={tijd} />
      {tijd === 'nacht' && <pointLight position={[0, 3, 2]} intensity={5} distance={12} color="#FFB060" />}
      <Grond kleur="#8A7E6A" />
      {Array.from({ length: 10 }, (_, i) => <Blok key={i} p={[0, 0.01, 6 - i * 3]} s={[7, 0.02, 0.05]} c="#6E6454" />)}
      <Trapgevels position={[0, 0, -9]} n={9} zaad={zaad} />
      <group position={[-7.5, 0, -2]} rotation={[0, Math.PI / 2, 0]}>
        <Trapgevels position={[0, 0, 0]} n={5} zaad={zaad + 2} />
      </group>
      <group position={[7.5, 0, -2]} rotation={[0, -Math.PI / 2, 0]}>
        <Trapgevels position={[0, 0, 0]} n={5} zaad={zaad + 4} />
      </group>
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Zee met de kust van Holland aan de horizon. */
export const ZeeSet = ({ children, over, cam = [6, 3.4, 12, 4.6, 3.0, 10.4], kijk = [0, 1.4, -2] as V3, duur = 160, tijd = 'dag', stad = true }: SetProps & { stad?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.4} mist={[L.mist, 25, 140]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtW tijd={tijd} />
      <Zee t={t} kleur={tijd === 'grijs' ? '#4A6272' : '#3A6A8A'} golf={0.14} />
      {stad && (
        <group position={[0, 0, -34]}>
          <Blok p={[0, 0.3, 0]} s={[70, 0.8, 8]} c="#9A9472" />
          <Trapgevels position={[-6, 0.6, -1]} n={9} zaad={6} />
          <Molen position={[16, 0.6, -2]} t={t} schaal={1.2} />
        </group>
      )}
      <Vogels meeuw y={10} z={-30} />
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Overstroomd land: de molens tot hun knieën in het water, Leiden in de verte. */
export const VloedSet = ({ children, over, cam = [7, 6, 16, 5.5, 5, 14], kijk = [0, 1.5, -10] as V3, duur = 160, water = 1, beleg = false }: SetProps & { water?: number; beleg?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={2.4} mist={['#C8D4DA', 25, 130]} over={over}>
      <Lucht boven="#8FAAC8" horizon="#DDE6EA" />
      <Daglicht zon={[10, 14, 6]} />
      <Grond kleur="#7E9A4E" y={-0.6} />
      <group position={[0, -0.68 + water * 0.63, 0]}>
        <Zee t={t} kleur="#5A7E8E" golf={0.08 * water} />
      </group>
      {[-12, 8, 20].map((x, i) => <Molen key={x} position={[x, -0.4, -26 - i * 4]} t={t} schaal={1.2} />)}
      {[[-7, -6], [5, -4], [12, -12]].map(([x, z], i) => (
        <group key={i} position={[x, -0.5, z]}>
          <Blok p={[0, 0.8, 0]} s={[2, 1.6, 2]} c="#9A5A40" />
          <Blok p={[0, 1.9, 0]} s={[2.2, 0.6, 2.2]} c="#6A3A2E" r={[0, 0.78, 0]} />
        </group>
      ))}
      <Stadsmuur position={[0, 0, -36]} lengte={40} h={5} torens={5} kleur="#9A5A40" />
      <Trapgevels position={[0, 0, -42]} n={12} zaad={3} />
      {beleg && [-14, -8, 8, 14].map((x) => <Tent key={x} position={[x, 0, -26]} kleur="#C9B48E" />)}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Open veld / heide voor veldslagen en legers. */
export const Veld = ({ children, over, cam = [6, 3.2, 14, 4.4, 3.0, 12], kijk = [0, 2.2, -4] as V3, duur = 160, tijd = 'dag', heide = false }: SetProps & { heide?: boolean }) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.4} mist={[L.mist, 25, 140]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtW tijd={tijd} />
      <Grond kleur={heide ? '#7A6A5A' : '#7A8A4A'} />
      {heide && Array.from({ length: 30 }, (_, i) => <Blok key={i} p={[-20 + ((i * 13) % 40), 0.12, -4 - ((i * 7) % 24)]} s={[0.9, 0.24, 0.7]} c={i % 2 ? '#8A5A7A' : '#6A4A5A'} />)}
      <Heuvels kleur={heide ? '#5A5048' : '#5E7A3E'} z={-60} />
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** De gang in het Prinsenhof, Delft: witte muren, een trap, één raam. */
export const Gang = ({ children, over, cam = [1.6, 2.4, 6.2, 1.1, 2.3, 5.2], kijk = [0, 1.6, -1] as V3, duur = 160, donker = true, nu = false }: SetProps & { donker?: boolean; nu?: boolean }) => (
  <Shot focus={kijk} scherpte={3} mist={donker ? ['#1A1A24', 8, 30] : ['#E8E2D6', 10, 40]} over={over}>
    <Lucht boven={donker ? '#1A1A24' : '#EDE7DA'} horizon={donker ? '#2A2A34' : '#EDE7DA'} />
    {donker ? (
      <>
        <Nachtlicht />
        <pointLight position={[1.0, 2.6, 1.5]} intensity={7} distance={9} color="#E8D8B0" />
      </>
    ) : (
      <Daglicht zon={[-3, 6, 6]} kracht={1.3} omgeving={1.5} />
    )}
    <Grond kleur={nu ? '#8A7A66' : '#3A3430'} />
    <Blok p={[0, 2.5, -1.7]} s={[9, 5, 0.3]} c="#C9BCA6" rough={1} />
    <Blok p={[-4.2, 2.5, 0]} s={[0.3, 5, 6]} c="#BFB29C" rough={1} />
    {[0, 1, 2, 3, 4, 5].map((i) => <Blok key={i} p={[2.4, 0.15 + i * 0.3, -1.25 + i * 0.32]} s={[1.6, 0.3, 0.32]} c="#6A5A4A" />)}
    <Blok p={[-2.6, 2.6, -1.53]} s={[1.0, 1.4, 0.04]} c={donker ? '#2A3050' : '#BFE0F2'} />
    <Blok p={[-0.9, 1.1, -1.53]} s={[1.1, 2.2, 0.04]} c="#5A3B24" />
    <Kogelgaten position={[0.3, 0, -1.53]} />
    {nu && <TekstVlak regels={['10 JULY 1584']} b={1.2} h={0.3} achter="#2A2A2A" voor="#E9DFC8" position={[0.0, 1.0, -1.52]} fontPx={70} />}
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/* ================= kaart ================= */

export type KSN = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KSN, b: KSN, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opNL(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
export const N_VER: KSN = { lon: 2, lat: 46.5, h: 22, a: 12 };
export const N_LAGE: KSN = { lon: 5.2, lat: 51.6, h: 8, a: 5.5 };
export const kpN = (s: PlaatsNL, h = 6, a = 5, dx = 0.6): KSN => ({ lon: PLAATS_NL[s][0], lat: PLAATS_NL[s][1], h, a, dx });
export const plN = (s: PlaatsNL): [number, number] => [PLAATS_NL[s][0], PLAATS_NL[s][1]];

const RouteN = ({ punten, p, kleur = HUD_ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opNL(lon, lat, 0.55));
  const lengtes = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[2] - pts[i][2]));
  const totaal = lengtes.reduce((x, y) => x + y, 0);
  const blokjes: V3[] = [];
  let d = 0;
  for (let i = 0; i < lengtes.length; i++) {
    for (let s = 0; s < lengtes[i]; s += 0.2) {
      if ((d + s) / totaal > p) break;
      const q = s / lengtes[i];
      blokjes.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.55, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q]);
    }
    d += lengtes[i];
  }
  let rest = p * totaal;
  let kopPos: V3 = pts[0];
  for (let i = 0; i < lengtes.length; i++) {
    if (rest <= lengtes[i]) {
      const q = rest / lengtes[i];
      kopPos = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.55, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q];
      break;
    }
    rest -= lengtes[i];
    kopPos = pts[i + 1];
  }
  return (
    <>
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.09, 0.05, 0.09]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

export const KaartN = ({ van, naar, wissel = [20, 70], cam = [N_VER, N_VER], camDuur = 150, spelden = [], route, routeTijd = [10, 120], kop, licht, over, children }: {
  van: Record<string, NLStand>;
  naar?: Record<string, NLStand>;
  wissel?: [number, number];
  cam?: [KSN, KSN];
  camDuur?: number;
  spelden?: [PlaatsNL, string][];
  route?: [number, number][];
  routeTijd?: [number, number];
  kop?: ReactNode;
  licht?: string[];
  over?: ReactNode;
  children?: ReactNode;
}) => {
  const f = useCurrentFrame();
  const c = kaartCam(cam[0], cam[1], ease(f, 0, camDuur, 0, 1));
  const gloed = licht ? (Math.sin(f / 5) + 1) / 2 : 0;
  return (
    <Shot focus={c.kijk} scherpte={2} over={<>{over}<KaartVoet /></>}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={c.pos} kijk={c.kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <KaarttafelNL van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldNL key={s} lon={PLAATS_NL[s][0]} lat={PLAATS_NL[s][1]} kleur={k} schaal={0.7} hoogte={1.0} />)}
      {route && <RouteN punten={route} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={kop} />}
      {children}
    </Shot>
  );
};
const KaartVoet = () => (
  <div style={{ position: 'absolute', right: 60, bottom: 26, fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: 'rgba(255,244,224,0.7)' }}>modern borders, approximate</div>
);
export const MiniWillem = () => (
  <group scale={0.24}>
    <Paard rotation={[0, Math.PI - 0.4, 0]} {...PAARD_W} ruiter={<Figuur kleding={WILLEM} baard hoofdExtra={<HoofdW />} />} />
  </group>
);
export const MiniSchip = ({ kleur = ORANJE }: { kleur?: string }) => <Galei position={[0, 0, 0]} rotation={[0, Math.PI, 0]} schilden={kleur} />;

/* ================= 2D ================= */

/** Acrostichon: de letters van WILLEM VAN NASSOV lichten een voor een op, in een kolom links. */
export const Acrostichon = () => {
  const f = useCurrentFrame();
  const letters = 'WILLEMVANNASSOV'.split('');
  return (
    <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10 }}>
      {letters.map((l, i) => {
        const o = lin(f, 6 + i * 4, 12 + i * 4, 0.15, 1);
        const gat = i === 6 || i === 9;
        return (
          <span key={i} style={{ marginLeft: gat ? 34 : 0, fontFamily: SERIF, fontWeight: 800, fontSize: 104, color: o > 0.9 ? '#FFE7A0' : '#FFF4E0', opacity: o, WebkitTextStroke: '2px #4A2A0C', textShadow: '0 6px 16px rgba(0,0,0,0.7)' }}>{l}</span>
        );
      })}
    </div>
  );
};

/** Twee documenten naast elkaar met een pijl: 1581 → 1776. */
export const TweeDocumenten = () => {
  const f = useCurrentFrame();
  const kaart = (jaar: string, titel: string, o: number) => (
    <div style={{ opacity: o, width: 560, background: '#EFE3C4', border: '6px solid #6B4A2E', borderRadius: 10, padding: '26px 30px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 96, color: '#3A2A1C' }}>{jaar}</div>
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 40, color: '#5A3B24', lineHeight: 1.15 }}>{titel}</div>
    </div>
  );
  return (
    <div style={{ position: 'absolute', top: 200, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
      {kaart('1581', 'Act of Abjuration', lin(f, 4, 14, 0, 1))}
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 120, color: HUD_ORANJE, opacity: lin(f, 24, 32, 0, 1), textShadow: '0 4px 12px rgba(0,0,0,0.7)' }}>→</div>
      {kaart('1776', 'Declaration of Independence', lin(f, 38, 48, 0, 1))}
    </div>
  );
};

export { BURGER as BURGER_W };
