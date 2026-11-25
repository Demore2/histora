import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { Avondlicht, Berg, Binnenlicht, Boom, Camera, Daglicht, Grond, Heuvels, Lucht, Nachtlicht, Neerslag, Paard, Rook, TekstVlak, Vuur, Zon } from '../watals/Decor';
import { Blok, Figuur, type Kleding, type V3 } from '../watals/Figuur';
import { Auto, Blokhut, BOER, BOERIN, Colonne, Fabriek, Helm, HoofdS, KHAKI, Kremlin, LENIN, Pet, Pijp, PRIESTER, RodeVlag, ROOD, Ruines, SL, SOLDAAT, SOSO, STALIN, VADER, WACHT, YEZHOV } from '../watals/WatAlsStalin';
import { ease, FPS, lin, Shot } from './basis';
import { KaarttafelSU, opSU, PLAATS_SU, SpeldSU, type PlaatsSU, type SUStand } from './KaarttafelSU';
import { ORANJE as HUD_ORANJE, SERIF } from './LangHud';
import { camPos, Vogels } from './LeonidasKit';
import { Bril, Kaars, Stoel, Tafel } from './WillemKit';

/**
 * Kit voor "What if you were Joseph Stalin?" (lange video #09, 16:9). Hergebruikt de figuren en decorstukken
 * uit de Stalin-short (WatAlsStalin.tsx). Geen geweld in beeld: een schot is een flits, de Terreur is een zwarte
 * auto en ramen die donker worden, de hongersnood een weggereden graankar, zijn dood een dichte deur.
 * Geen kruisen, geen kerkinterieurs, geen nazisymbolen (de Duitse vlag is effen grijs).
 */

export { STALIN, SOSO, VADER, PRIESTER, LENIN, YEZHOV, SOLDAAT, BOER, BOERIN, WACHT, ROOD, KHAKI, Helm, Pet, HoofdS, Pijp, RodeVlag, Kremlin, Fabriek, Auto, Blokhut, Colonne, Ruines, SL, Bril, Kaars, Stoel, Tafel };

/* ================= figuren ================= */

export const KEKE: Kleding = { huid: '#E2B48E', haar: '#2A1E16', tuniek: '#3A2E2A', rok: '#3A2E2A', schoenen: '#2A1E16', cape: '#1E1A18' };
export const KOBA: Kleding = { huid: '#DDAE88', haar: '#2E2622', tuniek: '#2E2A28', benen: '#2E2A28', schoenen: '#151210', cape: '#3A3430' };
export const STALIN_OUD: Kleding = { ...STALIN, tuniek: '#E8E2D2', benen: '#2A2A3A', riem: '#C9A646' };
export const MONNIK: Kleding = { huid: '#D8A880', haar: '#2A1E16', tuniek: '#151210', rok: '#151210', schoenen: '#151210' };
export const TROTSKI: Kleding = { huid: '#E2B48E', haar: '#1E1A18', tuniek: '#3A3A30', benen: '#3A3A30', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const GENDARME: Kleding = { huid: '#DDAE88', haar: '#3A2A1C', tuniek: '#3E4E6E', benen: '#2A2A3A', schoenen: '#151210', laarzen: '#151210', riem: '#C9A646' };
export const ARBEIDER: Kleding = { huid: '#D8A880', haar: '#4A3A2C', tuniek: '#4A5A6A', benen: '#3A3A3E', schoenen: '#2A1E16', riem: '#2A1E16' };
export const ARBEIDER2: Kleding = { huid: '#E2B48E', haar: '#6B4A30', tuniek: '#8A5A3A', benen: '#4A3A2E', schoenen: '#2A1E16' };
export const NADJA: Kleding = { huid: '#EAC7A2', haar: '#1E1612', tuniek: '#2E2A3A', rok: '#2E2A3A', schoenen: '#1A1612', cape: '#4A4258' };
export const KIROV: Kleding = { huid: '#DDAE88', haar: '#2A1E16', tuniek: '#5A5A44', benen: '#3A3A2C', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const OFFICIER: Kleding = { huid: '#DDAE88', haar: '#3A2A1C', tuniek: '#5E6448', benen: '#2A3A6A', schoenen: '#151210', laarzen: '#151210', riem: '#C9A646' };
export const DUITSER: Kleding = { huid: '#E2B48E', haar: '#8A6A40', tuniek: '#6A6E66', benen: '#5A5E58', schoenen: '#151210', laarzen: '#151210', riem: '#2A2A2A' };
export const YAKOV: Kleding = { huid: '#DDAE88', haar: '#2E2622', tuniek: '#6E6A4A', benen: '#5A563E', schoenen: '#151210', laarzen: '#151210', riem: '#3A2A1C' };
export const CHROESJTSJOV: Kleding = { huid: '#E8B898', haar: '#B9B4AA', tuniek: '#2E2E34', benen: '#2E2E34', schoenen: '#151210', riem: '#2E2E34' };
export const DOKTER: Kleding = { huid: '#E2B48E', haar: '#6A6058', tuniek: '#F2F0EA', benen: '#3A3A3E', schoenen: '#151210' };
export const BOLSJEWIEK: Kleding = { huid: '#DDAE88', haar: '#3A2A1C', tuniek: '#2E2A28', benen: '#2E2A28', schoenen: '#151210', riem: '#2A1E16' };
export const WITTE: Kleding = { huid: '#E2B48E', haar: '#8A6A40', tuniek: '#C9C4B4', benen: '#3A3A4A', schoenen: '#151210', laarzen: '#151210', riem: '#C9A646' };
export const BURGER: Kleding = { huid: '#E2B48E', haar: '#5A4434', tuniek: '#5A4E44', benen: '#3A3632', schoenen: '#2A1E16' };
export const BURGERES: Kleding = { huid: '#E6BC98', haar: '#6B4A30', tuniek: '#6A3A3A', rok: '#4A3A3A', schoenen: '#2A1E16' };

/** Grijze snor + pijp (de oude Stalin). */
const SnorGrijs = () => <Blok p={[0, 0.235, 0.3]} s={[0.36, 0.08, 0.05]} c="#8A8478" rough={1} />;
/** Hoofdhoed van de jonge revolutionair: platte pet. */
export const Klep = ({ kleur = '#2A2622' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.74, 0]} s={[0.7, 0.12, 0.66]} c={kleur} />
    <Blok p={[0, 0.7, 0.36]} s={[0.56, 0.04, 0.18]} c={kleur} />
  </>
);
/** Hoofddoek (Keke, boerinnen). */
export const Hoofddoek = ({ kleur = '#1E1A18' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.66, -0.02]} s={[0.7, 0.3, 0.66]} c={kleur} />
    <Blok p={[0, 0.4, -0.22]} s={[0.68, 0.5, 0.24]} c={kleur} />
  </>
);
/** Ronde bril (Trotski). */
export const RondeBril = () => (
  <group position={[0, 0.42, 0.33]}>
    {[-0.13, 0.13].map((x) => (
      <mesh key={x} position={[x, 0, 0]}>
        <torusGeometry args={[0.075, 0.014, 6, 16]} />
        <meshStandardMaterial color="#1A1612" />
      </mesh>
    ))}
    <Blok p={[0, 0.0, 0]} s={[0.1, 0.02, 0.02]} c="#1A1612" />
  </group>
);
/** Puntbaardje (Lenin, Trotski). */
export const Sik = ({ kleur = '#1E1A18' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.1, 0.3]} s={[0.2, 0.2, 0.08]} c={kleur} />
    <Blok p={[0, 0.235, 0.3]} s={[0.32, 0.06, 0.05]} c={kleur} />
  </>
);
/** Krullenbol (Trotski). */
const Krullen = () => (
  <>
    <Blok p={[0, 0.76, -0.04]} s={[0.76, 0.22, 0.72]} c="#1E1A18" />
    <Blok p={[-0.34, 0.5, -0.08]} s={[0.14, 0.4, 0.5]} c="#1E1A18" />
    <Blok p={[0.34, 0.5, -0.08]} s={[0.14, 0.4, 0.5]} c="#1E1A18" />
  </>
);
/** Pokkenlittekens: een paar donkere spikkels op de wangen. */
const Littekens = () => (
  <>
    {[[-0.18, 0.32], [-0.22, 0.2], [0.2, 0.3], [0.16, 0.18], [-0.08, 0.5], [0.12, 0.52]].map(([x, y], i) => <Blok key={i} p={[x, y, 0.302]} s={[0.035, 0.035, 0.01]} c="#B58A68" />)}
  </>
);

export const STALIN_P = { ...SL, hoofdExtra: <><HoofdS /><Littekens /></> } as const;
export const STALIN_ZP = { ...SL, hoofdExtra: <><HoofdS pijp={false} /><Littekens /></> } as const;
export const STALIN_OUD_P = { kleding: STALIN_OUD, haar: 'grijs' as const, levend: true, hoofdExtra: <><SnorGrijs /><Pijp /><Littekens /></> } as const;
export const KOBA_P = { kleding: KOBA, haar: 'kort' as const, baard: true, levend: true, hoofdExtra: <><HoofdS pijp={false} /><Littekens /></> } as const;
export const SEMI_P = { kleding: { ...KOBA, tuniek: '#151210', benen: '#151210', cape: undefined }, haar: 'kort' as const, levend: true, hoofdExtra: <Littekens /> } as const;
export const SOSO_P = { kleding: SOSO, haar: 'kort' as const, levend: true, scale: 0.62 } as const;
export const LENIN_P = { kleding: LENIN, haar: 'kaal' as const, levend: true, hoofdExtra: <Sik kleur="#8A5A3A" /> } as const;
export const TROTSKI_P = { kleding: TROTSKI, haar: 'kaal' as const, levend: true, hoofdExtra: <><Krullen /><Sik /><RondeBril /></> } as const;
export const KEKE_P = { kleding: KEKE, haar: 'lang' as const, levend: true, hoofdExtra: <Hoofddoek /> } as const;
export const BESO_P = { kleding: VADER, haar: 'kort' as const, snor: true, levend: true } as const;
export const CHROES_P = { kleding: CHROESJTSJOV, haar: 'kaal' as const, levend: true } as const;

export const FiguurS = (p: Parameters<typeof Figuur>[0]) => <Figuur levend {...p} />;

/* ================= rekwisieten ================= */

/** Schoenmakersbank met schoenen en een fles. */
export const Werkbank = ({ position, rotation, fles = true }: { position: V3; rotation?: V3; fles?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.45, 0]} s={[1.6, 0.08, 0.7]} c="#5A3E28" />
    {[-0.7, 0.7].map((x) => <Blok key={x} p={[x, 0.22, 0]} s={[0.08, 0.44, 0.6]} c="#4A3020" />)}
    {[-0.4, 0, 0.35].map((x, i) => <Blok key={x} p={[x, 0.56, (i - 1) * 0.12]} s={[0.16, 0.14, 0.34]} c={i % 2 ? '#3A2418' : '#5A3420'} />)}
    {fles && (
      <group position={[0.62, 0.49, 0.1]}>
        <Blok p={[0, 0.16, 0]} s={[0.12, 0.32, 0.12]} c="#2E4A2E" rough={0.2} />
        <Blok p={[0, 0.38, 0]} s={[0.05, 0.12, 0.05]} c="#2E4A2E" rough={0.2} />
      </group>
    )}
  </group>
);

/** Krant of brief met een kop (plat of rechtop). */
export const Papier = ({ position, rotation, regels, b = 0.7, h = 0.5, fontPx = 70, kleur = '#EFE8D8' }: { position: V3; rotation?: V3; regels: string[]; b?: number; h?: number; fontPx?: number; kleur?: string }) => (
  <TekstVlak regels={regels} b={b} h={h} achter={kleur} voor="#1A1410" position={position} rotation={rotation} fontPx={fontPx} />
);

/** Bord aan de muur of op een paal. */
export const Bord = ({ position, rotation, tekst, b = 2.4, h = 0.6, achter = '#1E2A1E', voor = '#F2EAD8', paal = 0, fontPx = 90 }: { position: V3; rotation?: V3; tekst: string[]; b?: number; h?: number; achter?: string; voor?: string; paal?: number; fontPx?: number }) => (
  <group position={position} rotation={rotation}>
    {paal > 0 && [-b / 2 + 0.15, b / 2 - 0.15].map((x) => <Blok key={x} p={[x, paal / 2, -0.05]} s={[0.1, paal, 0.1]} c="#4A3A2C" />)}
    <TekstVlak regels={tekst} b={b} h={h} achter={achter} voor={voor} position={[0, paal + h / 2, 0]} fontPx={fontPx} />
  </group>
);

/** Stapel dossiers (map met lintje). */
export const Dossiers = ({ position, n = 6 }: { position: V3; n?: number }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => (
      <Blok key={i} p={[Math.sin(i * 1.7) * 0.03, 0.025 + i * 0.05, Math.cos(i * 2.1) * 0.03]} s={[0.36, 0.045, 0.46]} r={[0, Math.sin(i) * 0.15, 0]} c={['#C9A878', '#B8956A', '#D2B88A'][i % 3]} />
    ))}
  </group>
);

/** Groene bureaulamp. */
export const Lamp = ({ position, aan = true }: { position: V3; aan?: boolean }) => (
  <group position={position}>
    <Blok p={[0, 0.02, 0]} s={[0.2, 0.04, 0.16]} c="#2A2420" metal={0.5} />
    <Blok p={[0, 0.2, 0]} s={[0.03, 0.36, 0.03]} c="#C9A646" metal={0.7} />
    <Blok p={[0, 0.4, 0.05]} s={[0.34, 0.1, 0.16]} c="#2E6A3E" rough={0.3} />
    {aan && <pointLight position={[0, 0.3, 0.15]} intensity={3} distance={4} color="#FFE2A0" />}
  </group>
);

/** Klok aan de muur; wijzers draaien met `uren` (0..). */
export const Klok = ({ position, uren = 0 }: { position: V3; uren?: number }) => (
  <group position={position}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.34, 0.34, 0.06, 20]} />
      <meshStandardMaterial color="#F2EAD8" />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.02]}>
      <cylinderGeometry args={[0.38, 0.38, 0.05, 20]} />
      <meshStandardMaterial color="#5A3B24" />
    </mesh>
    <group position={[0, 0, 0.05]} rotation={[0, 0, -uren * (Math.PI / 6)]}>
      <Blok p={[0, 0.1, 0]} s={[0.04, 0.2, 0.02]} c="#1A1410" />
    </group>
    <group position={[0, 0, 0.06]} rotation={[0, 0, -uren * Math.PI * 2]}>
      <Blok p={[0, 0.14, 0]} s={[0.025, 0.28, 0.02]} c="#1A1410" />
    </group>
  </group>
);

/** Stoomlocomotief met wagons, neus naar +x. */
export const Trein = ({ position, rotation, t = 0, wagons = 3 }: { position: V3; rotation?: V3; t?: number; wagons?: number }) => (
  <group position={position} rotation={rotation}>
    <group>
      <mesh position={[0.4, 1.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 3.0, 12]} />
        <meshStandardMaterial color="#1E1E22" metalness={0.4} roughness={0.5} />
      </mesh>
      <Blok p={[-1.5, 1.5, 0]} s={[1.4, 1.9, 1.5]} c="#2A2A30" />
      <Blok p={[-1.5, 2.5, 0]} s={[1.6, 0.12, 1.6]} c="#1A1A1E" />
      <Blok p={[-1.5, 1.8, 0.76]} s={[0.6, 0.5, 0.02]} c="#E8B060" />
      <mesh position={[1.4, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.8, 8]} />
        <meshStandardMaterial color="#1A1A1E" />
      </mesh>
      <Blok p={[1.95, 1.3, 0]} s={[0.06, 0.3, 0.3]} c="#FFE8A0" emissive="#FFD070" />
      <Blok p={[0.2, 0.55, 0]} s={[4.4, 0.4, 1.4]} c="#7A1E1E" />
      {[-1.4, -0.4, 0.6, 1.5].map((x) => [-0.72, 0.72].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.4, z]} rotation={[Math.PI / 2, t * 4, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.1, 12]} />
          <meshStandardMaterial color="#5A1414" />
        </mesh>
      )))}
    </group>
    {Array.from({ length: wagons }, (_, i) => (
      <group key={i} position={[-4.6 - i * 3.6, 0, 0]}>
        <Blok p={[0, 1.4, 0]} s={[3.3, 1.8, 1.5]} c={i % 2 ? '#4A5A3A' : '#5A4A3A'} />
        <Blok p={[0, 2.38, 0]} s={[3.4, 0.16, 1.6]} c="#2A2A2E" />
        {[-1, 0, 1].map((x) => <Blok key={x} p={[x, 1.6, 0.76]} s={[0.6, 0.5, 0.02]} c="#E8B060" />)}
        {[-1.1, 1.1].map((x) => [-0.72, 0.72].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.36, z]} rotation={[Math.PI / 2, t * 4, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.1, 10]} />
            <meshStandardMaterial color="#2A2A2E" />
          </mesh>
        )))}
      </group>
    ))}
  </group>
);

/** Spoorbaan langs x. */
export const Spoor = ({ z = 0, lengte = 120 }: { z?: number; lengte?: number }) => (
  <>
    {[-0.72, 0.72].map((dz) => <Blok key={dz} p={[0, 0.06, z + dz]} s={[lengte, 0.08, 0.08]} c="#6E6A66" metal={0.6} />)}
    {Array.from({ length: Math.floor(lengte / 1.2) }, (_, i) => <Blok key={i} p={[-lengte / 2 + i * 1.2, 0.02, z]} s={[0.24, 0.05, 2.0]} c="#4A3A2C" />)}
  </>
);

/** Koets met paarden (de bankkoets van 1907), neus naar +x. */
export const Koets = ({ position, rotation, t = 0, loopt = true }: { position: V3; rotation?: V3; t?: number; loopt?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Paard position={[2.4, 0, -0.45]} rotation={[0, Math.PI / 2, 0]} kleur="#3A2A20" dek="#3A2A20" t={t} loopt={loopt} />
    <Paard position={[2.4, 0, 0.45]} rotation={[0, Math.PI / 2, 0]} kleur="#5A4030" dek="#5A4030" t={t + 0.3} loopt={loopt} />
    <Blok p={[-0.4, 1.4, 0]} s={[2.2, 1.4, 1.4]} c="#2A3A2E" />
    <Blok p={[-0.4, 2.15, 0]} s={[2.3, 0.1, 1.5]} c="#1E2A22" />
    <Blok p={[-0.4, 1.55, 0.71]} s={[0.8, 0.5, 0.02]} c="#C9D4E0" />
    <Blok p={[0.9, 1.0, 0]} s={[0.5, 0.6, 1.2]} c="#2A3A2E" />
    {[[-1.1, 0.75], [0.3, 0.75], [-1.1, -0.75], [0.3, -0.75]].map(([x, z]) => (
      <mesh key={`${x}${z}`} position={[x, 0.5, z]} rotation={[Math.PI / 2, loopt ? t * 5 : 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 12]} />
        <meshStandardMaterial color="#3A2A1C" />
      </mesh>
    ))}
  </group>
);

/** Rondvliegende bankbiljetten. */
export const Biljetten = ({ midden, t, n = 26, breed = 2.4 }: { midden: V3; t: number; n?: number; breed?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <Blok key={i} p={[midden[0] + Math.sin(i * 3.1) * (0.4 + t * breed * 0.5), midden[1] + ((t * 0.7 + i * 0.37) % 3), midden[2] + Math.cos(i * 2.3) * (0.4 + t * breed * 0.3)]} s={[0.26, 0.02, 0.14]} r={[t * 3 + i, i, 0]} c={i % 3 ? '#C9D4B0' : '#E2D6A8'} />
    ))}
  </>
);

/** Flits + witte ster (een schot of een bom, nooit een slachtoffer), op frame `op`. */
export const Flits = ({ p, op = 10, groot = 1 }: { p: V3; op?: number; groot?: number }) => {
  const f = useCurrentFrame();
  const k = f >= op && f < op + 7 ? 1 - (f - op) / 7 : 0;
  if (!k) return null;
  return (
    <group position={p} scale={groot}>
      <pointLight intensity={40 * k} distance={14} color="#FFE6A0" />
      <Blok p={[0, 0, 0]} s={[0.7 * k, 0.16, 0.16]} c="#FFF6D0" emissive="#FFE080" />
      <Blok p={[0, 0, 0]} s={[0.16, 0.7 * k, 0.16]} c="#FFF6D0" emissive="#FFE080" />
    </group>
  );
};

/** Boortoren (Baku): open vakwerk-piramide. */
export const Boortoren = ({ position, h = 8 }: { position: V3; h?: number }) => (
  <group position={position}>
    {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z]) => (
      <Blok key={`${x}${z}`} p={[x * 0.6, h / 2, z * 0.6]} s={[0.14, h, 0.14]} r={[z * -0.12, 0, x * 0.12]} c="#3A2E26" />
    ))}
    {[0.2, 0.45, 0.7].map((y) => <Blok key={y} p={[0, h * y, 0]} s={[1.6 - y * 1.4, 0.1, 1.6 - y * 1.4]} c="#3A2E26" />)}
    <Blok p={[0, h + 0.2, 0]} s={[0.5, 0.4, 0.5]} c="#3A2E26" />
  </group>
);

/** Graankar met zakken, neus naar +x (paard ervoor). */
export const Graankar = ({ position, rotation, t = 0, loopt = false, vol = true }: { position: V3; rotation?: V3; t?: number; loopt?: boolean; vol?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Paard position={[2.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} kleur="#5A4A3A" dek="#5A4A3A" t={t} loopt={loopt} />
    <Blok p={[-0.4, 0.9, 0]} s={[2.6, 0.5, 1.4]} c="#5A3E28" />
    {vol && [[-1.2, 0], [-0.4, 0.3], [0.4, -0.2], [-0.8, -0.4], [0.2, 0.4], [-0.2, 0]].map(([sx, sz], i) => <Blok key={i} p={[sx, 1.4 + (i === 5 ? 0.4 : 0), sz]} s={[0.6, 0.5, 0.5]} c="#C9B88E" rough={1} />)}
    {[[-1.3, 0.75], [0.6, 0.75], [-1.3, -0.75], [0.6, -0.75]].map(([x, z]) => (
      <mesh key={`${x}${z}`} position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 10]} />
        <meshStandardMaterial color="#3A2A1C" />
      </mesh>
    ))}
  </group>
);

/** Korenveld (rijen gele blokjes). */
export const Koren = ({ z = -6, rijen = 6, kleur = '#D8B85A', leeg = 0 }: { z?: number; rijen?: number; kleur?: string; leeg?: number }) => (
  <>
    {Array.from({ length: rijen * 22 }, (_, i) => {
      const x = -22 + (i % 22) * 2.0;
      const r = Math.floor(i / 22);
      if ((i * 37) % 100 < leeg * 100) return <Blok key={i} p={[x, 0.05, z - r * 1.6]} s={[1.6, 0.1, 0.5]} c="#7A6040" />;
      return <Blok key={i} p={[x, 0.45, z - r * 1.6]} s={[1.6, 0.9, 0.5]} c={kleur} rough={1} />;
    })}
  </>
);

/** Schaakbord met stukken; `vallen` = per stuk 0..1 omgevallen. */
export const Schaakbord = ({ position, vallen = [], labels = [] }: { position: V3; vallen?: number[]; labels?: string[] }) => (
  <group position={position}>
    <Blok p={[0, 0.03, 0]} s={[1.7, 0.06, 1.7]} c="#4A3020" />
    {Array.from({ length: 64 }, (_, i) => <Blok key={i} p={[-0.7 + (i % 8) * 0.2, 0.065, -0.7 + Math.floor(i / 8) * 0.2]} s={[0.2, 0.01, 0.2]} c={(i + Math.floor(i / 8)) % 2 ? '#3A2418' : '#E8DCC0'} />)}
    {labels.map((l, i) => {
      const x = -0.57 + i * 0.38;
      const v = vallen[i] ?? 0;
      return (
        <group key={i} position={[x, 0.07, 0.1]} rotation={[0, 0, v * 1.5]}>
          <Blok p={[0, 0.12, 0]} s={[0.1, 0.24, 0.1]} c="#1A1612" />
          <Blok p={[0, 0.28, 0]} s={[0.12, 0.08, 0.12]} c="#1A1612" />
          <TekstVlak regels={[l]} b={0.3} h={0.09} achter="#FFF4E0" voor="#1A1410" position={[0, 0.45, 0]} fontPx={100} />
        </group>
      );
    })}
    <group position={[0.55, 0.07, -0.4]}>
      <Blok p={[0, 0.16, 0]} s={[0.14, 0.32, 0.14]} c={ROOD} />
      <Blok p={[0, 0.36, 0]} s={[0.16, 0.08, 0.16]} c={ROOD} />
    </group>
  </group>
);

/** Prikbord met namen (het kaartsysteem van de secretaris-generaal). */
export const Kaartenbord = ({ position, n = 20, kleur = '#F2EAD8' }: { position: V3; n?: number; kleur?: string }) => (
  <group position={position}>
    <Blok p={[0, 0, 0]} s={[3.2, 1.8, 0.06]} c="#6B4A2E" />
    {Array.from({ length: n }, (_, i) => (
      <group key={i} position={[-1.35 + (i % 8) * 0.38, 0.65 - Math.floor(i / 8) * 0.42, 0.04]}>
        <Blok p={[0, 0, 0]} s={[0.3, 0.2, 0.01]} c={kleur} />
        <Blok p={[0, 0.07, 0.01]} s={[0.04, 0.04, 0.02]} c={ROOD} />
      </group>
    ))}
  </group>
);

/** Groot portret/poster van Stalin (bordje met een grote kop erin). */
export const Poster = ({ position, rotation, schaal = 1, oud = false }: { position: V3; rotation?: V3; schaal?: number; oud?: boolean }) => (
  <group position={position} rotation={rotation} scale={schaal}>
    <Blok p={[0, 0, 0]} s={[1.6, 2.1, 0.04]} c={ROOD} />
    <Blok p={[0, 0.1, 0.02]} s={[1.3, 1.6, 0.02]} c="#E8D8B0" />
    <group position={[0, -0.95, 0.05]} scale={0.8}>
      <Figuur kleding={oud ? STALIN_OUD : STALIN} haar={oud ? 'grijs' : 'kort'} hoofdExtra={<HoofdS pijp={false} />} pose={{ wenk: 0.2 }} />
    </group>
  </group>
);

/** Deur (met optionele sloten en een bordje), naar +z, scharnier links. */
export const Deur = ({ position, open = 0, sloten = 0, bordje }: { position: V3; open?: number; sloten?: number; bordje?: string }) => (
  <group position={position}>
    <Blok p={[0, 1.45, -0.05]} s={[1.6, 2.9, 0.1]} c="#2A1E16" />
    {open > 0 && <Blok p={[0, 1.4, -0.08]} s={[1.3, 2.8, 0.02]} c="#FFE0A0" emissive="#FFD080" />}
    <group position={[-0.65, 0, 0]} rotation={[0, -open * 1.3, 0]}>
      <Blok p={[0.65, 1.4, 0.0]} s={[1.3, 2.8, 0.08]} c="#4A3020" />
      <Blok p={[0.65, 2.0, 0.045]} s={[0.9, 0.8, 0.01]} c="#3E2818" />
      <Blok p={[0.65, 0.8, 0.045]} s={[0.9, 0.8, 0.01]} c="#3E2818" />
      <Blok p={[1.15, 1.35, 0.06]} s={[0.1, 0.1, 0.06]} c="#C9A646" metal={0.6} rough={0.3} />
      {Array.from({ length: sloten }, (_, i) => <Blok key={i} p={[1.15, 1.7 + i * 0.22, 0.06]} s={[0.14, 0.1, 0.05]} c="#6E7076" metal={0.7} />)}
      {bordje && <TekstVlak regels={[bordje]} b={0.9} h={0.24} achter="#F2EAD8" voor="#7A1E1E" position={[0.65, 2.25, 0.07]} fontPx={64} />}
    </group>
    {open === 0 && (
      <mesh position={[0, 0.03, 0.05]}>
        <boxGeometry args={[1.3, 0.03, 0.06]} />
        <meshStandardMaterial color="#FFE0A0" emissive="#FFD080" emissiveIntensity={3} />
      </mesh>
    )}
  </group>
);

/** Prikkeldraadhek langs x. */
export const Hek = ({ z = 0, van = -8, tot = 8 }: { z?: number; van?: number; tot?: number }) => (
  <>
    {Array.from({ length: Math.round((tot - van) / 2) + 1 }, (_, i) => <Blok key={i} p={[van + i * 2, 1.0, z]} s={[0.12, 2.0, 0.12]} c="#4A3A2C" />)}
    {[0.5, 1.0, 1.5, 1.9].map((y) => <Blok key={y} p={[(van + tot) / 2, y, z]} s={[tot - van, 0.02, 0.02]} c="#6E7076" metal={0.6} />)}
  </>
);

/** Herdenkingsvlam met kaarsjes. */
export const Kaarsjes = ({ midden, n = 30, breed = 6 }: { midden: V3; n?: number; breed?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => <Kaars key={i} position={[midden[0] + ((i * 7.3) % breed) - breed / 2, midden[1], midden[2] + ((i * 3.7) % (breed / 2)) - breed / 4]} />)}
  </>
);

/* ================= licht + lucht per tijd ================= */

export type TijdS = 'dag' | 'avond' | 'nacht' | 'grijs' | 'winter';
const LUCHT: Record<TijdS, { boven: string; horizon: string; mist: string }> = {
  dag: { boven: '#7FA6D4', horizon: '#E6DCC4', mist: '#D8D2C0' },
  avond: { boven: '#4E3A6A', horizon: '#F4A35A', mist: '#E8A070' },
  nacht: { boven: '#0E1220', horizon: '#1E2434', mist: '#141A28' },
  grijs: { boven: '#6E7A86', horizon: '#B4B8B6', mist: '#A8ACAA' },
  winter: { boven: '#8A9AB0', horizon: '#DDE4EA', mist: '#C8D2DC' },
};
const LichtS = ({ tijd }: { tijd: TijdS }) =>
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
  ) : tijd === 'winter' ? (
    <Daglicht zon={[6, 10, 8]} kleur="#E0E8F4" kracht={1.4} omgeving={1.3} />
  ) : (
    <Daglicht zon={[8, 12, 9]} />
  );

type SetProps = { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; tijd?: TijdS };

const Cam = ({ cam, kijk, duur }: { cam: number[]; kijk: V3; duur: number }) => {
  const f = useCurrentFrame();
  return <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />;
};

/** Stenen huisje met plat dak (Georgië). */
const GeoHuis = ({ position, rotation, kleur = '#C9B490', b = 4, h = 3 }: { position: V3; rotation?: V3; kleur?: string; b?: number; h?: number }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, h / 2, 0]} s={[b, h, 3]} c={kleur} rough={1} />
    <Blok p={[0, h + 0.1, 0.2]} s={[b + 0.3, 0.2, 3.5]} c="#7A5A3E" />
    <Blok p={[0, h - 0.4, 1.8]} s={[b, 0.1, 0.8]} c="#6B4A2E" />
    {[-b / 4, b / 4].map((x) => <Blok key={x} p={[x, h * 0.55, 1.52]} s={[0.6, 0.7, 0.04]} c="#2A2A34" />)}
    <Blok p={[0, 0.8, 1.52]} s={[0.8, 1.6, 0.04]} c="#4A3020" />
  </group>
);

/* ================= sets ================= */

/** Gori: stenen huisjes met platte daken, heuvels en de Kaukasus aan de horizon. */
export const Gori = ({ children, over, cam = [4, 2.4, 11, 2.8, 2.2, 9.4], kijk = [0, 1.6, 0] as V3, duur = 160, tijd = 'dag' }: SetProps) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.6} mist={[L.mist, 30, 170]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtS tijd={tijd} />
      <Grond kleur="#A89A70" />
      {[-14, -4, 8, 20].map((x, i) => <Berg key={x} position={[x * 3, -1, -110 - (i % 2) * 20]} h={34 + (i % 3) * 8} r={26} kleur="#7A7C86" />)}
      <Heuvels kleur="#8A8A5A" z={-50} />
      {[[-9, -6, 0.2], [-4.4, -8, -0.1], [0.6, -9, 0], [5.6, -7.5, 0.15], [10.4, -6, -0.3], [-12, -1, 0.9], [12, -1.5, -0.9]].map(([x, z, r], i) => (
        <GeoHuis key={i} position={[x, 0, z]} rotation={[0, r, 0]} kleur={['#C9B490', '#B8A27C', '#D2BE98'][i % 3]} b={3.4 + (i % 2)} h={2.6 + (i % 3) * 0.4} />
      ))}
      {[-15, -7, 3, 14].map((x, i) => <Boom key={x} position={[x, 0, -13 - (i % 2) * 3]} schaal={1.2} kleur="#5E7A3E" />)}
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Binnen: arm huisje (stenen muur, kachel, klein raam) of een rijk huis (`rijk`). */
export const Huisje = ({ children, over, cam = [1.4, 1.7, 4.8, 0.9, 1.6, 4.0], kijk = [0, 1.1, 0] as V3, duur = 160, avond = false, rijk = false, sepia = false }: SetProps & { avond?: boolean; rijk?: boolean; sepia?: boolean }) => (
  <Shot focus={kijk} scherpte={3.2} mist={avond ? ['#24180E', 6, 26] : ['#D8C8A8', 8, 40]} over={<>{over}{sepia && <div style={{ position: 'absolute', inset: 0, background: 'rgba(140,96,40,0.32)', mixBlendMode: 'multiply' }} />}</>}>
    <Lucht boven={avond ? '#1E1610' : '#E2D4B4'} horizon={avond ? '#2A1E14' : '#E2D4B4'} />
    {avond ? (
      <>
        <hemisphereLight args={['#8A7A68', '#2A1E14', 0.55]} />
        <pointLight position={[1.2, 1.8, 1.4]} intensity={7} distance={8} color="#FFA850" />
      </>
    ) : (
      <Daglicht zon={[-4, 6, 6]} kracht={1.3} omgeving={1.3} />
    )}
    <Grond kleur={rijk ? '#8A6A48' : '#6A5A44'} />
    <Blok p={[0, 3, -1.8]} s={[10, 6, 0.3]} c={rijk ? '#D8C8A8' : '#9A8A70'} rough={1} />
    <Blok p={[-4, 3, 0]} s={[0.3, 6, 6]} c={rijk ? '#CDB894' : '#8A7A62'} rough={1} />
    {rijk && <Blok p={[0, 0.7, -1.6]} s={[10, 1.4, 0.1]} c="#6B4A2E" />}
    <Blok p={[-1.8, 2.0, -1.63]} s={[1.0, 1.0, 0.05]} c="#5A3B24" />
    <Blok p={[-1.8, 2.0, -1.6]} s={[0.86, 0.86, 0.05]} c={avond ? '#1E2440' : '#A8D2EE'} />
    {!rijk && (
      <group position={[2.4, 0, -1.3]}>
        <Blok p={[0, 0.6, 0]} s={[1.0, 1.2, 0.8]} c="#4A4440" />
        <Blok p={[0, 2.4, -0.2]} s={[0.3, 2.4, 0.3]} c="#4A4440" />
        <Blok p={[0, 0.5, 0.41]} s={[0.5, 0.4, 0.02]} c="#FF8A3A" emissive="#FF6A1A" />
      </group>
    )}
    {rijk && <Blok p={[2.2, 2.6, -1.62]} s={[1.4, 1.0, 0.05]} c="#C9A646" metal={0.5} />}
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/** Kale zaal: seminarie, rechtbank, partijvergadering. Hoge ramen, gepleisterde muren; `kleur` = muur. */
export const Zaal = ({ children, over, cam = [2.4, 2.4, 7.2, 1.6, 2.3, 6.0], kijk = [0, 1.7, -1] as V3, duur = 160, donker = false, kleur = '#D9CDB4', vloer = '#5A4636', loper = false }: SetProps & { donker?: boolean; kleur?: string; vloer?: string; loper?: boolean }) => (
  <Shot focus={kijk} scherpte={3} mist={donker ? ['#141018', 6, 26] : ['#3A2E22', 12, 44]} over={over}>
    <Lucht boven={donker ? '#0E0C10' : '#2E241A'} horizon={donker ? '#1E1A20' : '#4A3A2A'} />
    {donker ? (
      <>
        <Nachtlicht />
        <pointLight position={[0, 3.2, 1.4]} intensity={6} distance={10} color="#FFC890" />
      </>
    ) : (
      <Binnenlicht zon={[-5, 9, 5]} kleur="#FFE2B8" />
    )}
    <Grond kleur={vloer} />
    <Blok p={[0, 3.5, -4.2]} s={[18, 7, 0.4]} c={kleur} rough={1} />
    <Blok p={[-7, 3.5, 0]} s={[0.4, 7, 10]} c={kleur} rough={1} />
    {[-5, -1.7, 1.7, 5].map((x) => (
      <group key={x}>
        <Blok p={[x, 3.8, -3.98]} s={[1.4, 2.8, 0.05]} c="#5A4A3A" />
        <Blok p={[x, 3.8, -3.95]} s={[1.2, 2.6, 0.05]} c={donker ? '#1E2440' : '#CFE2EE'} emissive={donker ? '#000000' : '#8AA8C0'} />
      </group>
    ))}
    {loper && <Blok p={[0, 0.02, 0.4]} s={[2.6, 0.04, 9]} c="#7A1E22" />}
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/** Straat in een Russische stad (Tiflis, Petrograd, Moskou): gebouwen van drie verdiepingen, keien. */
export const Stad = ({ children, over, cam = [2.6, 2.4, 9.4, 1.8, 2.2, 8.0], kijk = [0, 1.8, 0] as V3, duur = 160, tijd = 'dag', sneeuw = false, ramenUit = 0 }: SetProps & { sneeuw?: boolean; ramenUit?: number }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.8} mist={[L.mist, 16, 90]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtS tijd={tijd} />
      {tijd === 'nacht' && <pointLight position={[0, 3.5, 2]} intensity={6} distance={14} color="#FFC070" />}
      <Grond kleur={sneeuw ? '#E4E8EE' : '#7A7268'} />
      {Array.from({ length: 6 }, (_, i) => {
        const x = -12.5 + i * 5;
        const h = 7 + (i % 3);
        return (
          <group key={i} position={[x, 0, -6]}>
            <Blok p={[0, h / 2, 0]} s={[4.8, h, 3]} c={['#C9B48E', '#B8907A', '#D2C4A0', '#A8A090', '#C8A88A', '#B0B4A8'][i]} rough={1} />
            <Blok p={[0, h + 0.15, 0]} s={[5.0, 0.3, 3.2]} c={sneeuw ? '#F2F4F6' : '#6A5A4A'} />
            {[-1.5, 0, 1.5].map((wx) => [1.6, 3.6, 5.6].map((wy, j) => {
              const k = (i * 9 + j * 3 + Math.round(wx)) % 11;
              const uit = ramenUit > 0 && k / 11 < ramenUit;
              const aan = tijd === 'nacht' ? k % 3 !== 0 && !uit : false;
              return <Blok key={`${wx}${wy}`} p={[wx, wy, 1.52]} s={[0.8, 1.1, 0.04]} c={aan ? '#E8B060' : tijd === 'nacht' ? '#14161E' : '#3A4A5A'} emissive={aan ? '#B87A30' : '#000000'} />;
            }))}
          </group>
        );
      })}
      {Array.from({ length: 12 }, (_, i) => <Blok key={`k${i}`} p={[0, 0.01, 6 - i * 1.4]} s={[14, 0.02, 0.04]} c={sneeuw ? '#D4D8DE' : '#6A6258'} />)}
      {sneeuw && <Neerslag t={f / FPS} n={120} breed={16} />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Siberië: sneeuw, sparren, een blokhut; optioneel een bevroren rivier. */
export const Siberie = ({ children, over, cam = [3.4, 2.4, 9.5, 2.4, 2.2, 8.5], kijk = [0, 1.6, -1] as V3, duur = 160, tijd = 'winter', hut = true, sneeuwval = true, rivier = false }: SetProps & { hut?: boolean; sneeuwval?: boolean; rivier?: boolean }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={3} mist={[L.mist, 12, 70]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtS tijd={tijd} />
      <Grond kleur="#E4E8EE" />
      {rivier && <Blok p={[0, 0.02, -4]} s={[60, 0.03, 5]} c="#B8D0DE" rough={0.2} />}
      {Array.from({ length: 18 }, (_, i) => (
        <mesh key={i} position={[-22 + i * 2.6, 2.4, -12 - (i % 3) * 3]} castShadow>
          <coneGeometry args={[1.1, 4.8, 6]} />
          <meshStandardMaterial color={i % 2 ? '#2E4A3A' : '#3A5A44'} roughness={1} flatShading />
        </mesh>
      ))}
      {hut && <Blokhut position={[-3.2, 0, -5.5]} rotation={[0, 0.3, 0]} />}
      {sneeuwval && <Neerslag t={f / FPS} n={160} breed={16} />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Het kantoor in het Kremlin: lambrisering, bureau met groene lamp, raam met de rode ster, Lenin aan de muur. */
export const Kantoor = ({ children, over, cam = [1.6, 2.0, 5.4, 1.0, 1.9, 4.4], kijk = [0, 1.3, -0.4] as V3, duur = 160, nacht = false, bureau = true }: SetProps & { nacht?: boolean; bureau?: boolean }) => (
  <Shot focus={kijk} scherpte={3.2} mist={nacht ? ['#141210', 6, 26] : ['#3A2E22', 10, 40]} over={over}>
    <Lucht boven={nacht ? '#0E0C0A' : '#2E241A'} horizon={nacht ? '#1A1612' : '#4A3A2A'} />
    {nacht ? (
      <hemisphereLight args={['#5A5048', '#141210', 0.4]} />
    ) : (
      <Binnenlicht zon={[-4, 8, 6]} kleur="#FFE2B8" />
    )}
    <Grond kleur="#5A3E2A" />
    <Blok p={[0, 0.02, 0.4]} s={[4.4, 0.04, 6]} c="#6E1E22" rough={1} />
    <Blok p={[0, 3, -2.0]} s={[10, 6, 0.3]} c="#C9B48E" rough={1} />
    <Blok p={[0, 0.8, -1.82]} s={[10, 1.6, 0.06]} c="#5A3B24" />
    <Blok p={[-4, 3, 0]} s={[0.3, 6, 6]} c="#BBA680" rough={1} />
    <Blok p={[-1.9, 2.4, -1.84]} s={[1.2, 1.6, 0.05]} c="#4A3020" />
    <Blok p={[-1.9, 2.4, -1.81]} s={[1.0, 1.4, 0.05]} c={nacht ? '#141E36' : '#A8C8E0'} />
    <Blok p={[-1.6, 2.7, -1.78]} s={[0.16, 0.16, 0.02]} r={[0, 0, Math.PI / 4]} c="#D8302A" emissive="#A01010" />
    <group position={[1.6, 2.6, -1.8]}>
      <Blok p={[0, 0, 0]} s={[0.9, 1.1, 0.05]} c="#C9A646" metal={0.5} />
      <Blok p={[0, 0, 0.03]} s={[0.76, 0.96, 0.02]} c="#3A3A34" />
      <group position={[0, -0.32, 0.05]} scale={0.55}>
        <Figuur kleding={LENIN} haar="kaal" hoofdExtra={<Sik kleur="#8A5A3A" />} pose={{}} />
      </group>
    </group>
    {bureau && (
      <group position={[0, 0, 0.2]}>
        <Tafel position={[0, 0, 0]} b={2.6} d={1.1} kleur="#4A2E1C" />
        <Blok p={[0, 0.83, 0]} s={[2.0, 0.02, 0.8]} c="#2E4A2E" />
        <Lamp position={[-0.9, 0.82, -0.2]} aan />
      </group>
    )}
    {nacht && <pointLight position={[-0.6, 1.5, 0.6]} intensity={5} distance={6} color="#FFD890" />}
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/** Het Rode Plein: Kremlinmuur met torens, het mausoleum, kinderkopjes. */
export const Plein = ({ children, over, cam = [6, 3.2, 14, 4.4, 3.0, 12], kijk = [0, 3, -6] as V3, duur = 160, tijd = 'dag', sneeuw = false, mausoleum = true }: SetProps & { sneeuw?: boolean; mausoleum?: boolean }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.4} mist={[L.mist, 30, 170]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtS tijd={tijd} />
      <Grond kleur={sneeuw ? '#DCE0E6' : '#6E6A66'} />
      {Array.from({ length: 16 }, (_, i) => <Blok key={i} p={[0, 0.01, 8 - i * 1.6]} s={[60, 0.02, 0.05]} c={sneeuw ? '#C8CCD2' : '#5A5652'} />)}
      <Kremlin position={[0, 0, -24]} />
      {mausoleum && (
        <group position={[0, 0, -18]}>
          {[0, 1, 2, 3].map((s) => <Blok key={s} p={[0, 0.6 + s * 0.9, 0]} s={[7 - s * 1.5, 0.9, 4 - s * 0.7]} c={s % 2 ? '#3A1E1E' : '#6A2A26'} rough={0.6} />)}
          <TekstVlak regels={['LENIN']} b={2.4} h={0.5} achter="#3A1E1E" voor="#E8D8B0" position={[0, 2.3, 1.36]} fontPx={150} />
        </group>
      )}
      {sneeuw && <Neerslag t={f / FPS} n={150} breed={20} />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Open land: steppe, akkers, fabrieken aan de horizon (`fabrieken`), korenveld (`koren`). */
export const Land = ({ children, over, cam = [5, 2.8, 12, 3.6, 2.8, 10], kijk = [0, 1.8, -2] as V3, duur = 160, tijd = 'dag', grond = '#8A8A58', koren = false, korenLeeg = 0, fabrieken = 0, sneeuw = false }: SetProps & { grond?: string; koren?: boolean; korenLeeg?: number; fabrieken?: number; sneeuw?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.6} mist={[L.mist, 30, 170]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtS tijd={tijd} />
      <Grond kleur={sneeuw ? '#E4E8EE' : grond} />
      <Heuvels kleur={sneeuw ? '#C8D0D8' : '#6E7A4E'} z={-70} />
      {koren && <Koren z={-7} rijen={8} leeg={korenLeeg} />}
      {fabrieken > 0 && (
        <>
          <group scale={[1, fabrieken, 1]}><Fabriek position={[-12, 0, -28]} t={t} /></group>
          <group scale={[1, Math.max(0.01, fabrieken * 1.1 - 0.1), 1]}><Fabriek position={[10, 0, -34]} t={t + 2} schaal={1.2} /></group>
          <group scale={[1, Math.max(0.01, fabrieken * 1.2 - 0.2), 1]}><Fabriek position={[-30, 0, -40]} t={t + 4} schaal={1.1} /></group>
        </>
      )}
      {sneeuw && <Neerslag t={t} n={140} breed={16} />}
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** De datsja bij Moskou, binnen: een gang met parket, een dichte deur, wachters. */
export const Gang = ({ children, over, cam = [1.6, 2.0, 6.0, 1.0, 1.9, 5.0], kijk = [0, 1.5, -1.6] as V3, duur = 160, licht = false }: SetProps & { licht?: boolean }) => (
  <Shot focus={kijk} scherpte={2.6} mist={licht ? ['#3A2E24', 8, 30] : ['#14141C', 7, 28]} over={over}>
    <Lucht boven="#14141C" horizon="#22222C" />
    {licht ? <Binnenlicht zon={[-3, 7, 6]} kleur="#FFE2B8" /> : <Nachtlicht />}
    <pointLight position={[0, 3, 0.5]} intensity={4} distance={7} color="#D8D0B8" />
    <Grond kleur="#3A2A22" />
    <Blok p={[0, 0.02, -0.4]} s={[2, 0.04, 6]} c="#6E1E22" rough={1} />
    <Blok p={[0, 3, -2.2]} s={[10, 6, 0.3]} c="#7A6A52" rough={1} />
    <Blok p={[-3.4, 3, 0]} s={[0.3, 6, 6]} c="#6E5E48" rough={1} />
    <Cam cam={cam} kijk={kijk} duur={duur} />
    {children}
  </Shot>
);

/** Verwoeste stad (Stalingrad, Berlijn) met sneeuw of rook. */
export const Puin = ({ children, over, cam = [4, 2.0, 10.5, 3, 2.3, 9.5], kijk = [0, 2.8, -3] as V3, duur = 160, tijd = 'winter', sneeuw = true }: SetProps & { sneeuw?: boolean }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.5} mist={[L.mist, 15, 90]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtS tijd={tijd} />
      <Grond kleur={sneeuw ? '#DCE0E4' : '#7A7068'} />
      <Ruines z={-10} />
      {sneeuw && <Neerslag t={f / FPS} n={140} breed={16} />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/* ================= kaart ================= */

export type KSS = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KSS, b: KSS, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opSU(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
export const S_VER: KSS = { lon: 50, lat: 53, h: 24, a: 13 };
export const S_WEST: KSS = { lon: 30, lat: 52, h: 13, a: 8 };
export const kpS = (s: PlaatsSU, h = 7, a = 5, dx = 0.6): KSS => ({ lon: PLAATS_SU[s][0], lat: PLAATS_SU[s][1], h, a, dx });
export const plS = (s: PlaatsSU): [number, number] => [PLAATS_SU[s][0], PLAATS_SU[s][1]];

const RouteS = ({ punten, p, kleur = HUD_ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opSU(lon, lat, 0.55));
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
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.1, 0.05, 0.1]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

export const KaartS = ({ van, naar, wissel = [20, 70], cam = [S_VER, S_VER], camDuur = 150, spelden = [], routes = [], routeTijd = [10, 120], kop, licht, over, children }: {
  van: Record<string, SUStand>;
  naar?: Record<string, SUStand>;
  wissel?: [number, number];
  cam?: [KSS, KSS];
  camDuur?: number;
  spelden?: [PlaatsSU, string][];
  routes?: { punten: [number, number][]; kleur?: string }[];
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
      <KaarttafelSU van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldSU key={s} lon={PLAATS_SU[s][0]} lat={PLAATS_SU[s][1]} kleur={k} schaal={0.8} hoogte={1.1} />)}
      {routes.map((r, i) => <RouteS key={i} punten={r.punten} kleur={r.kleur} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={i === 0 ? kop : undefined} />)}
      {children}
    </Shot>
  );
};
const KaartVoet = () => (
  <div style={{ position: 'absolute', right: 60, bottom: 26, fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: 'rgba(255,244,224,0.7)' }}>modern borders, approximate</div>
);
export const MiniStalin = ({ oud = false }: { oud?: boolean }) => (
  <group scale={0.26} rotation={[0, 0.4, 0]}>
    <Figuur kleding={oud ? STALIN_OUD : STALIN} haar={oud ? 'grijs' : 'kort'} hoofdExtra={<HoofdS pijp={false} />} />
  </group>
);
export const MiniKoba = () => (
  <group scale={0.26} rotation={[0, 0.4, 0]}>
    <Figuur kleding={KOBA} baard hoofdExtra={<HoofdS pijp={false} />} />
  </group>
);
export const MiniTrein = () => <group scale={0.14} rotation={[0, -0.5, 0]}><Trein position={[0, 0, 0]} wagons={1} /></group>;
export const MiniDuitser = () => (
  <group scale={0.24} rotation={[0, -1.0, 0]}>
    <Figuur kleding={DUITSER} hoofdExtra={<Helm kleur="#5A5E58" />} />
  </group>
);

/* ================= overige decorstukken ================= */

/** Seminariegebouw (gevel met veel ramen en een poort; geen kruis). */
export const Seminarie = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 4, 0]} s={[18, 8, 5]} c="#D8CCB0" rough={1} />
    <Blok p={[0, 8.2, 0]} s={[18.4, 0.4, 5.4]} c="#8A6A4A" />
    {[-7, -5, -3, 3, 5, 7].map((x) => [2.2, 5.4].map((y) => <Blok key={`${x}${y}`} p={[x, y, 2.52]} s={[1.0, 1.6, 0.04]} c="#3A4A5A" />))}
    <Blok p={[0, 2, 2.52]} s={[2.4, 4, 0.04]} c="#4A3020" />
    <Blok p={[0, 4.4, 2.6]} s={[3.4, 0.6, 0.3]} c="#BFB298" />
  </group>
);

/** Weerstation: wit hokje op poten, windvaan, thermometer. */
export const Weerhut = ({ position, t = 0 }: { position: V3; t?: number }) => (
  <group position={position}>
    {[[-0.4, -0.3], [0.4, -0.3], [-0.4, 0.3], [0.4, 0.3]].map(([x, z]) => <Blok key={`${x}${z}`} p={[x, 0.6, z]} s={[0.08, 1.2, 0.08]} c="#F2F0EA" />)}
    <Blok p={[0, 1.6, 0]} s={[1.1, 0.9, 0.9]} c="#F2F0EA" />
    {[1.35, 1.5, 1.65, 1.8].map((y) => <Blok key={y} p={[0, y, 0.46]} s={[1.0, 0.04, 0.02]} c="#C8C4BA" />)}
    <Blok p={[0, 2.15, 0]} s={[1.3, 0.1, 1.1]} c="#E8E4DA" />
    <Blok p={[1.6, 2, 0]} s={[0.06, 4, 0.06]} c="#5A5A5E" />
    <group position={[1.6, 4.0, 0]} rotation={[0, Math.sin(t * 0.8) * 0.8, 0]}>
      <Blok p={[0.3, 0, 0]} s={[0.6, 0.04, 0.04]} c="#2A2A2E" />
      <Blok p={[0.6, 0, 0]} s={[0.04, 0.2, 0.2]} r={[Math.PI / 4, 0, 0]} c="#2A2A2E" />
    </group>
    {[0, 1, 2].map((i) => (
      <mesh key={i} position={[1.6, 3.6, 0]} rotation={[0, t * 4 + (i * Math.PI * 2) / 3, 0]}>
        <boxGeometry args={[0.9, 0.03, 0.03]} />
        <meshStandardMaterial color="#3A3A3E" />
      </mesh>
    ))}
  </group>
);

/** Groot gebouw met zuilen (Winterpaleis / Rijksdag), lengte langs x. */
export const Paleis = ({ position, kleur = '#7AA08A', koepel = false }: { position: V3; kleur?: string; koepel?: boolean }) => (
  <group position={position}>
    <Blok p={[0, 4, 0]} s={[26, 8, 6]} c={kleur} rough={1} />
    <Blok p={[0, 8.3, 0]} s={[26.4, 0.6, 6.4]} c="#E8E0CC" />
    {Array.from({ length: 13 }, (_, i) => <Blok key={i} p={[-12 + i * 2, 4, 3.1]} s={[0.4, 8, 0.4]} c="#F2EEE2" />)}
    {Array.from({ length: 12 }, (_, i) => [2, 5.6].map((y) => <Blok key={`${i}${y}`} p={[-11 + i * 2, y, 3.02]} s={[0.9, 1.6, 0.04]} c="#3A4A5A" />))}
    {koepel && (
      <mesh position={[0, 10, 0]}>
        <sphereGeometry args={[3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#5A6A6A" metalness={0.4} roughness={0.5} flatShading />
      </mesh>
    )}
  </group>
);

/** Effen grijze vlag (Duitsland, zonder symbolen). */
export const GrijzeVlag = ({ position, t = 0, h = 3 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.08, h, 0.08]} c="#3A2A1C" />
    <group position={[0.75, h - 0.5, 0]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      <Blok p={[0, 0, 0]} s={[1.4, 0.9, 0.04]} c="#5A5A5E" />
    </group>
  </group>
);

/** Witte vlag (de Witten in de burgeroorlog). */
export const WitteVlag = ({ position, t = 0, h = 3.6 }: { position: V3; t?: number; h?: number }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[0.08, h, 0.08]} c="#3A2A1C" />
    <group position={[0.75, h - 0.5, 0]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      <Blok p={[0, 0, 0]} s={[1.4, 0.9, 0.04]} c="#F2F0EA" />
    </group>
  </group>
);

/** Standbeeld van Stalin op een sokkel (brons). `val` 0..1 = omvallen naar +x. */
export const Standbeeld = ({ position, val = 0, schaal = 1.6 }: { position: V3; val?: number; schaal?: number }) => (
  <group position={position}>
    <Blok p={[0, 1.2, 0]} s={[2.2, 2.4, 2.2]} c="#B8AE9C" />
    <Blok p={[0, 2.46, 0]} s={[2.4, 0.12, 2.4]} c="#A89E8C" />
    <group position={[0.6, 2.5, 0]} rotation={[0, 0, -val * 1.45]}>
      <group position={[-0.6, 0, 0]}>
        <Figuur kleding={STALIN} hoofdExtra={<HoofdS />} scale={schaal} o={{ kleur: '#7E6440', metaal: 0.3, ruw: 0.45 }} pose={{ armR: { schouder: [-0.4, 0, -0.1], elleboog: [0, -0.8] } }} />
      </group>
    </group>
  </group>
);

/* ================= 2D ================= */

/** Twee kaarten met een ruilpijl (de aangeboden ruil). */
export const Ruilkaart = ({ links, rechts }: { links: string; rechts: string }) => {
  const f = useCurrentFrame();
  const kaart = (tekst: string, o: number) => (
    <div style={{ opacity: o, width: 520, background: '#EFE3C4', border: '6px solid #6B4A2E', borderRadius: 10, padding: '24px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 64, color: '#3A2A1C', lineHeight: 1.1 }}>{tekst}</div>
    </div>
  );
  return (
    <div style={{ position: 'absolute', top: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 50 }}>
      {kaart(links, lin(f, 4, 14, 0, 1))}
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 120, color: HUD_ORANJE, opacity: lin(f, 22, 30, 0, 1), textShadow: '0 4px 12px rgba(0,0,0,0.7)' }}>⇄</div>
      {kaart(rechts, lin(f, 34, 44, 0, 1))}
    </div>
  );
};

/** Naambord dat wordt doorgestreept en vervangen (Stalingrad → Volgograd). */
export const Hernoem = ({ oud, nieuw }: { oud: string; nieuw: string }) => {
  const f = useCurrentFrame();
  const streep = lin(f, 14, 26, 0, 1);
  const n = lin(f, 32, 42, 0, 1);
  return (
    <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ display: 'inline-block', position: 'relative', fontFamily: SERIF, fontWeight: 800, fontSize: 150, color: '#FFF4E0', WebkitTextStroke: '3px #4A2A0C', textShadow: '0 8px 24px rgba(0,0,0,0.7)', opacity: 1 - n * 0.4 }}>
        {oud}
        <div style={{ position: 'absolute', left: -20, top: '52%', height: 20, width: `${streep * 108}%`, background: '#E8382B', borderRadius: 8, transform: 'rotate(-4deg)' }} />
      </div>
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 130, color: HUD_ORANJE, WebkitTextStroke: '3px #4A2A0C', opacity: n, transform: `translateY(${(1 - n) * 20}px)` }}>{nieuw}</div>
    </div>
  );
};

export { ease, lin, FPS, Vuur, Rook, Neerslag, Boom, Paard, TekstVlak };
