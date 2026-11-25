import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { Berg, Binnenlicht, Boom, Camera, Daglicht, Duinen, Grond, Heuvels, Lucht, Moskee, Nachtlicht, Neerslag, Paard, Rook, TekstVlak, Vuur, Zee } from '../watals/Decor';
import { Blok, Figuur, type Kleding, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { KaarttafelTR, opTR, PLAATS_TR, SpeldTR, type PlaatsTR, type TRStand } from './KaarttafelTR';
import { ORANJE as HUD_ORANJE, SERIF } from './LangHud';
import { camPos, Vogels } from './LeonidasKit';
import { Bord, Flits, Hoofddoek, Huisje, Klok, Lamp, Land, Papier, Stad, Trein, Zaal } from './StalinKit';
import { Boek, Kaars, Stoel, Tafel } from './WillemKit';

/**
 * Kit voor "What if you were Mustafa Kemal Atatürk?" (lange video #10, 16:9). Respectvol (Turkse wet 5816):
 * geen spot met zijn persoon, geen geweld in beeld (een schot is een flits, Gallipoli zijn loopgraven en rook),
 * geen moskee-interieurs, geen kruisen. Zijn laatste jaren: de klok op 9:05, geen ziekbed-drama.
 */

export { Bord, Flits, Hoofddoek, Huisje, Klok, Lamp, Land, Papier, Stad, Trein, Zaal, Boek, Kaars, Stoel, Tafel, Moskee, Paard, Rook, Vuur, TekstVlak, ease, lin, FPS };

/* ================= hoofddeksels ================= */

/** Rode fez met zwarte kwast. */
export const Fez = ({ kleur = '#A8201E' }: { kleur?: string }) => (
  <>
    <mesh position={[0, 0.86, 0]} castShadow>
      <cylinderGeometry args={[0.25, 0.3, 0.32, 14]} />
      <meshStandardMaterial color={kleur} roughness={0.8} />
    </mesh>
    <Blok p={[0.12, 0.92, -0.18]} s={[0.04, 0.24, 0.04]} c="#141012" />
  </>
);
/** Kalpak: hoge grijze bontmuts (Onafhankelijkheidsoorlog). */
export const Kalpak = ({ kleur = '#3E3A38' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.9, 0]} s={[0.66, 0.4, 0.64]} c={kleur} rough={1} />
    <Blok p={[0, 1.11, 0]} s={[0.5, 0.04, 0.5]} c="#7A2A24" />
  </>
);
/** Kabalak: kaki doek om een helm (Gallipoli). */
export const Kabalak = ({ kleur = '#8A7E58' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.8, 0]} s={[0.72, 0.24, 0.68]} c={kleur} rough={1} />
    <Blok p={[0, 0.96, 0]} s={[0.54, 0.14, 0.52]} c={kleur} rough={1} />
    {[-0.2, 0, 0.2].map((y) => <Blok key={y} p={[0, 0.82 + y * 0.3, 0.345]} s={[0.66, 0.03, 0.01]} r={[0, 0, y]} c="#6E644A" />)}
  </>
);
/** Slappe hoed met brede rand (Anzac). */
export const Slaphoed = ({ kleur = '#7A6A4A' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.76, 0]} s={[1.04, 0.04, 1.0]} c={kleur} />
    <Blok p={[0, 0.9, 0]} s={[0.62, 0.26, 0.58]} c={kleur} />
    <Blok p={[-0.5, 0.86, 0]} s={[0.04, 0.2, 0.9]} c={kleur} />
    <Blok p={[0, 0.8, 0]} s={[0.64, 0.06, 0.6]} c="#3A2E22" />
  </>
);
/** Britse/Griekse pet met klep. */
export const Pet = ({ kleur = '#7A7252' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 0.76, 0]} s={[0.7, 0.14, 0.68]} c={kleur} />
    <Blok p={[0, 0.72, 0.38]} s={[0.56, 0.04, 0.2]} c="#2A2420" />
  </>
);
/** Hoed met rand: panama (licht) of gleufhoed (donker). */
export const Hoed = ({ kleur = '#E8DDBE', band = '#2A2420' }: { kleur?: string; band?: string }) => (
  <>
    <Blok p={[0, 0.76, 0]} s={[0.98, 0.04, 0.92]} c={kleur} />
    <Blok p={[0, 0.9, 0]} s={[0.6, 0.26, 0.56]} c={kleur} />
    <Blok p={[0, 0.81, 0]} s={[0.62, 0.07, 0.58]} c={band} />
  </>
);
/** Leren vliegmuts met brilletje (Sabiha). */
export const Vliegmuts = () => (
  <>
    <Blok p={[0, 0.66, -0.02]} s={[0.7, 0.34, 0.68]} c="#5A3A24" />
    <Blok p={[0, 0.4, -0.2]} s={[0.68, 0.4, 0.3]} c="#5A3A24" />
    <Blok p={[0, 0.72, 0.33]} s={[0.5, 0.1, 0.04]} c="#2A2A2E" metal={0.5} />
  </>
);
/** Wit overhemd met das voor een pak. */
const Das = ({ kleur = '#2A2A40' }: { kleur?: string }) => (
  <>
    <Blok p={[0, 1.5, 0.2]} s={[0.2, 0.28, 0.02]} c="#F2F0EA" />
    <Blok p={[0, 1.44, 0.215]} s={[0.07, 0.26, 0.02]} c={kleur} />
  </>
);

/* ================= figuren ================= */

const OOG = '#4A88C8';
const HAAR_K = '#B08A58';
export const KEMAL_KIND: Kleding = { huid: '#EAC4A0', haar: HAAR_K, tuniek: '#EDE6D6', benen: '#3A3A4A', schoenen: '#2A1E16', riem: '#3A2A1C' };
export const KADET: Kleding = { huid: '#E6BC98', haar: HAAR_K, tuniek: '#2A3448', benen: '#2A3448', schoenen: '#151210', riem: '#C9A646' };
export const OFFICIER_K: Kleding = { huid: '#E2B892', haar: HAAR_K, tuniek: '#76704E', benen: '#655F42', schoenen: '#2A1E16', laarzen: '#3A2A1C', riem: '#4A3424' };
export const MAARSCHALK: Kleding = { ...OFFICIER_K, tuniek: '#6A644A', cape: '#3A3630' };
export const PAK: Kleding = { huid: '#E2B892', haar: HAAR_K, tuniek: '#2E2E36', benen: '#2E2E36', schoenen: '#151210' };
export const PAK_LICHT: Kleding = { ...PAK, tuniek: '#8A8478', benen: '#8A8478' };
export const ZUBEYDE: Kleding = { huid: '#E6BC98', haar: '#3A2A1C', tuniek: '#3A3440', rok: '#3A3440', schoenen: '#2A1E16' };
export const ALI_RIZA: Kleding = { huid: '#E2B48E', haar: '#3A2A1C', tuniek: '#3A3A44', benen: '#2E2E36', schoenen: '#151210' };
export const LERAAR: Kleding = { huid: '#DDAE88', haar: '#2A1E16', tuniek: '#4A3A2C', benen: '#3A3026', schoenen: '#151210' };
export const HOCA: Kleding = { huid: '#D8A880', haar: '#8A8478', tuniek: '#6A5A44', rok: '#5A4A38', schoenen: '#2A1E16', cape: '#E8E0CC' };
export const SULTAN: Kleding = { huid: '#E2B48E', haar: '#8A8478', tuniek: '#1E1E2A', benen: '#1E1E2A', schoenen: '#151210', riem: '#C9A646' };
export const OSM_SOLDAAT: Kleding = { huid: '#D8A880', haar: '#2A1E16', tuniek: '#7E7452', benen: '#6A6046', schoenen: '#3A2A1C', riem: '#4A3424' };
export const OSM_SOLDAAT2: Kleding = { ...OSM_SOLDAAT, huid: '#C99A70', tuniek: '#857A56' };
export const ANZAC: Kleding = { huid: '#E8C0A0', haar: '#8A6A40', tuniek: '#9A8A5E', benen: '#8A7C54', schoenen: '#3A2A1C', laarzen: '#6A5A40', riem: '#5A4A30' };
export const BRIT: Kleding = { huid: '#EAC4A4', haar: '#6B4A30', tuniek: '#8A7E58', benen: '#7A7050', schoenen: '#2A1E16', laarzen: '#6A5A40', riem: '#5A4A30' };
export const GRIEK: Kleding = { huid: '#DDB08A', haar: '#2A1E16', tuniek: '#6E7050', benen: '#5E6044', schoenen: '#2A1E16', laarzen: '#3A2A1C', riem: '#3A2A1C' };
export const ITALIAAN: Kleding = { huid: '#E2B48E', haar: '#2A1E16', tuniek: '#6E7468', benen: '#5E645A', schoenen: '#151210', laarzen: '#151210', riem: '#2A2420' };
export const BEDOEIEN: Kleding = { huid: '#B8845A', haar: '#1A1410', tuniek: '#E8DCC0', rok: '#D8CCB0', schoenen: '#6A4A2E', cape: '#8A6A4A' };
export const VROUW: Kleding = { huid: '#DDAE88', haar: '#2A1E16', tuniek: '#7A3A2E', rok: '#4A3A5A', schoenen: '#2A1E16' };
export const VROUW2: Kleding = { ...VROUW, huid: '#E6BC98', tuniek: '#3E5A4A', rok: '#5A3A2E' };
export const LATIFE: Kleding = { huid: '#EAC7A2', haar: '#1E1612', tuniek: '#2A2A3A', rok: '#2A2A3A', schoenen: '#1A1612', cape: '#5A5470' };
export const SABIHA: Kleding = { huid: '#EAC4A0', haar: '#2A1E16', tuniek: '#5A3A24', benen: '#3A3A2E', schoenen: '#151210', laarzen: '#2A1E16', riem: '#2A1E16' };
export const BURGER: Kleding = { huid: '#E2B48E', haar: '#5A4434', tuniek: '#4A4440', benen: '#3A3632', schoenen: '#2A1E16' };
export const BURGER2: Kleding = { huid: '#DDAE88', haar: '#2A1E16', tuniek: '#5A4E3A', benen: '#3A3632', schoenen: '#2A1E16' };
export const MEISJE: Kleding = { huid: '#EAC4A0', haar: '#3A2A1C', tuniek: '#8A4A4A', rok: '#6A3A3A', schoenen: '#2A1E16' };
export const KIND2: Kleding = { huid: '#E2B48E', haar: '#2A1E16', tuniek: '#4A6A8A', benen: '#3A3A4A', schoenen: '#2A1E16' };

/** Atatürk-varianten: lichtblauwe ogen en zandkleurig haar in elk tijdperk. */
export const KIND_P = { kleding: KEMAL_KIND, oogKleur: OOG, levend: true, scale: 0.62, hoofdExtra: <Fez /> } as const;
export const KIND_BLOOT_P = { kleding: KEMAL_KIND, oogKleur: OOG, levend: true, scale: 0.62 } as const;
export const KADET_P = { kleding: KADET, oogKleur: OOG, levend: true, scale: 0.86, hoofdExtra: <Fez /> } as const;
export const KAPITEIN_P = { kleding: { ...KADET, tuniek: '#2E3A4E' }, oogKleur: OOG, snor: true, levend: true, hoofdExtra: <Fez /> } as const;
export const OFF_P = { kleding: OFFICIER_K, oogKleur: OOG, snor: true, levend: true, hoofdExtra: <Kalpak /> } as const;
export const GAL_P = { kleding: OFFICIER_K, oogKleur: OOG, snor: true, levend: true, hoofdExtra: <Kabalak /> } as const;
export const JOURNALIST_P = { kleding: { ...PAK_LICHT, haar: HAAR_K }, oogKleur: OOG, snor: true, levend: true, hoofdExtra: <Hoed kleur="#5A4A3A" /> } as const;
export const MAARSCHALK_P = { kleding: MAARSCHALK, oogKleur: OOG, snor: true, levend: true, hoofdExtra: <Kalpak /> } as const;
export const PRES_P = { kleding: PAK, oogKleur: OOG, levend: true, hoofdExtra: <Das /> } as const;
export const PANAMA_P = { kleding: PAK_LICHT, oogKleur: OOG, levend: true, hoofdExtra: <><Hoed /><Das kleur="#7A2A24" /></> } as const;
export const ZUBEYDE_P = { kleding: ZUBEYDE, haar: 'lang' as const, levend: true, hoofdExtra: <Hoofddoek kleur="#EFEAE0" /> } as const;
export const ZUBEYDE_OUD_P = { ...ZUBEYDE_P, haar: 'grijs' as const } as const;
export const ALI_P = { kleding: ALI_RIZA, snor: true, levend: true, hoofdExtra: <Fez /> } as const;
export const LERAAR_P = { kleding: LERAAR, baard: true, levend: true, hoofdExtra: <Fez /> } as const;
export const HOCA_P = { kleding: HOCA, baard: true, haar: 'grijs' as const, hoofddeksel: 'tulband' as const, levend: true } as const;
export const SULTAN_P = { kleding: SULTAN, baard: true, haar: 'grijs' as const, levend: true, hoofdExtra: <Fez /> } as const;
export const SOLDAAT_P = { kleding: OSM_SOLDAAT, snor: true, levend: true, hoofdExtra: <Kabalak /> } as const;
export const SOLDAAT2_P = { kleding: OSM_SOLDAAT2, levend: true, hoofdExtra: <Kalpak kleur="#4A4440" /> } as const;
export const ANZAC_P = { kleding: ANZAC, levend: true, hoofdExtra: <Slaphoed /> } as const;
export const BRIT_P = { kleding: BRIT, snor: true, levend: true, hoofdExtra: <Pet /> } as const;
export const GRIEK_P = { kleding: GRIEK, snor: true, levend: true, hoofdExtra: <Pet kleur="#5E6044" /> } as const;
export const ITALIAAN_P = { kleding: ITALIAAN, levend: true, hoofdExtra: <Pet kleur="#5E645A" /> } as const;
export const BEDOEIEN_P = { kleding: BEDOEIEN, baard: true, hoofddeksel: 'tulband' as const, levend: true } as const;
export const VROUW_P = { kleding: VROUW, haar: 'lang' as const, levend: true, hoofdExtra: <Hoofddoek kleur="#E8DCC8" /> } as const;
export const VROUW2_P = { kleding: VROUW2, haar: 'lang' as const, levend: true, hoofdExtra: <Hoofddoek kleur="#C9A878" /> } as const;
export const LATIFE_P = { kleding: LATIFE, haar: 'lang' as const, levend: true, hoofdExtra: <Hoofddoek kleur="#F2EEE6" /> } as const;
export const SABIHA_P = { kleding: SABIHA, haar: 'bob' as const, levend: true, hoofdExtra: <Vliegmuts /> } as const;
export const BURGER_FEZ_P = { kleding: BURGER, snor: true, levend: true, hoofdExtra: <Fez /> } as const;
export const BURGER_HOED_P = { kleding: BURGER, snor: true, levend: true, hoofdExtra: <Hoed kleur="#3A3430" band="#1A1612" /> } as const;
export const BURGER2_FEZ_P = { kleding: BURGER2, levend: true, hoofdExtra: <Fez /> } as const;
export const BURGER2_HOED_P = { kleding: BURGER2, levend: true, hoofdExtra: <Hoed kleur="#5A4A3A" band="#2A1E16" /> } as const;
export const MEISJE_P = { kleding: MEISJE, haar: 'lang' as const, levend: true, scale: 0.62 } as const;
export const KIND2_P = { kleding: KIND2, levend: true, scale: 0.6 } as const;

export const FiguurA = (p: Parameters<typeof Figuur>[0]) => <Figuur levend {...p} />;

/* ================= rekwisieten ================= */

/** Geweer (in de rechterhand, loop omhoog). */
export const Geweer = () => (
  <group rotation={[0.1, 0, 0]}>
    <Blok p={[0, 0.2, 0.05]} s={[0.06, 1.3, 0.06]} c="#4A3424" />
    <Blok p={[0, 0.95, 0.05]} s={[0.03, 0.3, 0.03]} c="#5A5E62" metal={0.6} />
  </group>
);
/** Granaat (artilleriegranaat) die vrouwen dragen. */
export const Granaat = ({ position, rotation }: { position?: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <cylinderGeometry args={[0.1, 0.1, 0.5, 10]} />
      <meshStandardMaterial color="#8A6A3A" metalness={0.6} roughness={0.4} />
    </mesh>
    <mesh position={[0, 0.33, 0]}>
      <coneGeometry args={[0.1, 0.18, 10]} />
      <meshStandardMaterial color="#8A6A3A" metalness={0.6} roughness={0.4} />
    </mesh>
  </group>
);
/** Turkse (en Ottomaanse) vlag: rood met witte halve maan en ster. Wappert in de wind. */
export const TurkseVlag = ({ position, t = 0, h = 3.6, schaal = 1 }: { position: V3; t?: number; h?: number; schaal?: number }) => (
  <group position={position} scale={schaal}>
    <Blok p={[0, h / 2, 0]} s={[0.08, h, 0.08]} c="#4A3A2C" />
    <group position={[0.85, h - 0.6, 0]} rotation={[0, Math.sin(t * 2) * 0.12, 0]}>
      <Blok p={[0, 0, 0]} s={[1.6, 1.06, 0.04]} c="#D0262E" />
      <VlagTeken />
    </group>
  </group>
);
/** Halve maan + ster, plat (voor vlaggen en bordjes). */
export const VlagTeken = ({ z = 0.025, k = 1 }: { z?: number; k?: number }) => (
  <group scale={k}>
    <mesh position={[-0.2, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.012, 24]} />
      <meshStandardMaterial color="#F6F2EA" />
    </mesh>
    <mesh position={[-0.12, 0, z + 0.006]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.24, 0.24, 0.014, 24]} />
      <meshStandardMaterial color="#D0262E" />
    </mesh>
    {[0, 1, 2, 3, 4].map((i) => (
      <Blok key={i} p={[0.2 + Math.sin((i * Math.PI * 2) / 5) * 0.05, Math.cos((i * Math.PI * 2) / 5) * 0.05, z + 0.01]} s={[0.05, 0.11, 0.01]} r={[0, 0, (-i * Math.PI * 2) / 5]} c="#F6F2EA" />
    ))}
  </group>
);
/** Zakhorloge met deuk (Gallipoli), groot in beeld; `open` 0..1. */
export const Zakhorloge = ({ position, rotation, schaal = 1, deuk = true }: { position: V3; rotation?: V3; schaal?: number; deuk?: boolean }) => (
  <group position={position} rotation={rotation} scale={schaal}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.14, 28]} />
      <meshStandardMaterial color="#C9A646" metalness={0.85} roughness={0.25} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.06]}>
      <cylinderGeometry args={[0.42, 0.42, 0.04, 28]} />
      <meshStandardMaterial color="#F2EAD8" />
    </mesh>
    <Blok p={[0, 0.58, 0]} s={[0.12, 0.12, 0.12]} c="#C9A646" metal={0.85} rough={0.25} />
    <Blok p={[0, 0.08, 0.09]} s={[0.03, 0.18, 0.01]} c="#1A1410" />
    <Blok p={[0.06, 0, 0.09]} s={[0.14, 0.03, 0.01]} c="#1A1410" />
    {deuk && (
      <>
        <Blok p={[0.18, -0.16, 0.095]} s={[0.16, 0.14, 0.02]} r={[0, 0, 0.5]} c="#6A5A44" />
        {[0, 1, 2, 3].map((i) => <Blok key={i} p={[0.18 + Math.cos(i * 1.6) * 0.16, -0.16 + Math.sin(i * 1.6) * 0.16, 0.096]} s={[0.16, 0.012, 0.01]} r={[0, 0, i * 1.6]} c="#3A3026" />)}
      </>
    )}
  </group>
);
/** Krijtbord op een ezel met letters. */
export const Krijtbord = ({ position, rotation, regels = ['A B C Ç D', 'E F G Ğ H'] }: { position: V3; rotation?: V3; regels?: string[] }) => (
  <group position={position} rotation={rotation}>
    {[-0.6, 0.6].map((x) => <Blok key={x} p={[x, 0.9, 0]} s={[0.08, 1.8, 0.08]} r={[0.12, 0, 0]} c="#5A3B24" />)}
    <TekstVlak regels={regels} b={1.7} h={1.1} achter="#2A3A30" voor="#F2F2EA" position={[0, 1.55, 0.12]} rotation={[-0.12, 0, 0]} fontPx={120} />
    <Blok p={[0, 0.96, 0.18]} s={[1.6, 0.06, 0.1]} c="#5A3B24" />
  </group>
);
/** Loopgraaf langs x: zandzakken en een uitgegraven geul. */
export const Loopgraaf = ({ z = 0, van = -8, tot = 8 }: { z?: number; van?: number; tot?: number }) => (
  <>
    {Array.from({ length: Math.round((tot - van) / 0.7) }, (_, i) => (
      <group key={i}>
        <Blok p={[van + i * 0.7, 0.18, z - 0.4]} s={[0.66, 0.34, 0.4]} c={i % 2 ? '#B8A47A' : '#A8946A'} rough={1} />
        <Blok p={[van + i * 0.7 + 0.35, 0.5, z - 0.4]} s={[0.66, 0.3, 0.38]} c={i % 2 ? '#A8946A' : '#B8A47A'} rough={1} />
      </group>
    ))}
    <Blok p={[(van + tot) / 2, 0.01, z + 0.3]} s={[tot - van, 0.02, 1.0]} c="#5A4A36" />
  </>
);
/** Struikjes (Gallipoli-macchia). */
export const Struiken = ({ n = 30, z0 = -2, diep = 20, breed = 30 }: { n?: number; z0?: number; diep?: number; breed?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <Blok key={i} p={[-breed / 2 + ((i * 17.3) % breed), 0.25, z0 - ((i * 7.7) % diep)]} s={[0.7 + (i % 3) * 0.3, 0.5, 0.6]} c={i % 2 ? '#4E5E36' : '#5E6A3E'} rough={1} />
    ))}
  </>
);
/** Stoomschip (oud vrachtschip, zoals de Bandırma), neus naar +x. */
export const Stoomschip = ({ position, rotation, t = 0, schaal = 1, rook = true, kleur = '#2E2A2A' }: { position: V3; rotation?: V3; t?: number; schaal?: number; rook?: boolean; kleur?: string }) => (
  <group position={position} rotation={rotation} scale={schaal}>
    <group position={[0, Math.sin(t * 1.4) * 0.06, 0]} rotation={[Math.sin(t * 1.1) * 0.02, 0, 0]}>
      <Blok p={[0, 0.5, 0]} s={[7, 1.4, 1.8]} c={kleur} />
      <Blok p={[3.7, 0.7, 0]} s={[0.6, 1.0, 1.2]} c={kleur} />
      <Blok p={[0, 1.24, 0]} s={[7.1, 0.08, 1.86]} c="#7A2A24" />
      <Blok p={[-0.6, 1.8, 0]} s={[2.4, 1.0, 1.4]} c="#E8E0CC" />
      <Blok p={[-0.6, 2.35, 0]} s={[2.6, 0.1, 1.5]} c="#5A4A3A" />
      <mesh position={[0.4, 3.0, 0]}>
        <cylinderGeometry args={[0.26, 0.3, 1.4, 10]} />
        <meshStandardMaterial color="#1A1A1E" />
      </mesh>
      <Blok p={[0.4, 3.6, 0]} s={[0.62, 0.16, 0.62]} c="#D0262E" />
      {[2.6, -2.8].map((x) => <Blok key={x} p={[x, 2.6, 0]} s={[0.08, 2.8, 0.08]} c="#3A2A1C" />)}
      <group position={[2.6, 3.6, 0]}><Blok p={[0.35, 0, 0]} s={[0.6, 0.4, 0.02]} c="#D0262E" /></group>
      {rook && Array.from({ length: 6 }, (_, i) => {
        const k = (t * 0.6 + i / 6) % 1;
        return <Blok key={i} p={[0.4 - k * 3, 3.9 + k * 2.4, 0]} s={[0.5 + k, 0.4 + k * 0.8, 0.5 + k]} c="#5A5652" rough={1} />;
      })}
    </group>
  </group>
);
/** Grijs oorlogsschip met torens en schoorstenen, neus naar +x. */
export const Oorlogsschip = ({ position, rotation, t = 0, schaal = 1, vlag = '#2A3E7A' }: { position: V3; rotation?: V3; t?: number; schaal?: number; vlag?: string }) => (
  <group position={position} rotation={rotation} scale={schaal}>
    <group position={[0, Math.sin(t * 1.2) * 0.04, 0]}>
      <Blok p={[0, 0.5, 0]} s={[12, 1.6, 2.2]} c="#6E747A" />
      <Blok p={[6.4, 0.6, 0]} s={[1.2, 1.2, 1.2]} c="#6E747A" />
      <Blok p={[0, 1.6, 0]} s={[5, 0.8, 1.6]} c="#7A8086" />
      <Blok p={[-0.5, 2.5, 0]} s={[1.8, 1.0, 1.2]} c="#7A8086" />
      {[0.8, -1.6].map((x) => (
        <mesh key={x} position={[x, 3.2, 0]}>
          <cylinderGeometry args={[0.3, 0.32, 1.8, 10]} />
          <meshStandardMaterial color="#4A4E52" />
        </mesh>
      ))}
      {[4, -4].map((x) => (
        <group key={x} position={[x, 1.5, 0]}>
          <Blok p={[0, 0, 0]} s={[1.2, 0.6, 1.2]} c="#5E646A" />
          <Blok p={[x > 0 ? 1.0 : -1.0, 0.1, 0]} s={[1.4, 0.12, 0.12]} c="#3A3E42" />
        </group>
      ))}
      <Blok p={[-0.5, 4.8, 0]} s={[0.08, 3, 0.08]} c="#3A3E42" />
      <group position={[-0.1, 5.9, 0]}><Blok p={[0.35, 0, 0]} s={[0.7, 0.44, 0.02]} c={vlag} /></group>
    </group>
  </group>
);
/** Ossenkar met granaten, neus naar +x. */
export const Ossenkar = ({ position, rotation, t = 0, loopt = true }: { position: V3; rotation?: V3; t?: number; loopt?: boolean }) => {
  const stap = loopt ? Math.sin(t * 5) * 0.08 : 0;
  return (
    <group position={position} rotation={rotation}>
      {[-0.45, 0.45].map((z, i) => (
        <group key={z} position={[2.0, 0, z]}>
          <Blok p={[0, 0.95, 0]} s={[1.5, 0.75, 0.6]} c={i ? '#6A5644' : '#8A7058'} />
          <Blok p={[0.86, 1.05, 0]} s={[0.4, 0.42, 0.4]} c={i ? '#6A5644' : '#8A7058'} />
          <Blok p={[0.86, 1.32, 0.16]} s={[0.06, 0.2, 0.06]} c="#E8DCC0" />
          <Blok p={[0.86, 1.32, -0.16]} s={[0.06, 0.2, 0.06]} c="#E8DCC0" />
          {[[-0.55, 0.2], [0.55, -0.2]].map(([x, z2], j) => <Blok key={j} p={[x, 0.3, z2]} s={[0.16, 0.6, 0.16]} r={[0, 0, (j ? 1 : -1) * stap]} c={i ? '#5A4836' : '#7A624A'} />)}
        </group>
      ))}
      <Blok p={[1.2, 0.9, 0]} s={[1.6, 0.08, 0.08]} c="#4A3424" />
      <Blok p={[-0.4, 0.8, 0]} s={[2.2, 0.3, 1.3]} c="#6B4A2E" />
      {[[-1.1, 0], [-0.7, 0.3], [-0.3, -0.3], [0.1, 0.2], [-0.5, 0], [0.3, -0.1]].map(([x, z], i) => <Granaat key={i} position={[x, 1.2, z]} rotation={[Math.PI / 2, 0.3 * i, 0]} />)}
      {[-1.0, 0.4].map((x) => [-0.7, 0.7].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.45, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 10]} />
          <meshStandardMaterial color="#4A3424" />
        </mesh>
      )))}
    </group>
  );
};
/** Tweedekker (Sabiha Gökçen). Neus naar +x. */
export const Tweedekker = ({ position, rotation, t = 0, schaal = 1 }: { position: V3; rotation?: V3; t?: number; schaal?: number }) => (
  <group position={position} rotation={rotation} scale={schaal}>
    <Blok p={[0, 0, 0]} s={[3.2, 0.5, 0.6]} c="#6E7A5A" />
    <Blok p={[1.7, 0, 0]} s={[0.3, 0.44, 0.5]} c="#3A3A3E" />
    {[0.36, -0.42].map((y) => <Blok key={y} p={[0.5, y, 0]} s={[0.9, 0.06, 4.6]} c="#7A866A" />)}
    {[-1.6, 1.6].map((z) => <Blok key={z} p={[0.5, -0.03, z]} s={[0.05, 0.78, 0.05]} c="#3A3A3E" />)}
    <Blok p={[-1.5, 0.3, 0]} s={[0.5, 0.5, 0.05]} c="#6E7A5A" />
    <Blok p={[-1.5, 0.05, 0]} s={[0.4, 0.05, 1.4]} c="#7A866A" />
    <group position={[1.9, 0, 0]} rotation={[t * 40, 0, 0]}>
      <Blok p={[0, 0, 0]} s={[0.04, 1.4, 0.12]} c="#2A2420" />
    </group>
    <group position={[-1.5, 0.32, 0]}>
      <Blok p={[0, 0, 0.03]} s={[0.4, 0.4, 0.01]} c="#D0262E" />
    </group>
  </group>
);
/** Sirenemast. */
export const Sirene = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 3, 0]} s={[0.14, 6, 0.14]} c="#5A5E62" metal={0.5} />
    <mesh position={[0, 6.1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.4, 0.7, 10, 1, true]} />
      <meshStandardMaterial color="#8A8E92" metalness={0.6} side={2} />
    </mesh>
  </group>
);
/** Simpele auto (jaren '90/'00), neus naar +x. */
export const Wagen = ({ position, rotation, kleur = '#B8BCC0' }: { position: V3; rotation?: V3; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.5, 0]} s={[3.6, 0.6, 1.6]} c={kleur} metal={0.4} rough={0.4} />
    <Blok p={[-0.2, 1.0, 0]} s={[2.0, 0.5, 1.4]} c="#2A3A4A" rough={0.2} />
    {[-1.1, 1.1].map((x) => [-0.8, 0.8].map((z) => (
      <mesh key={`${x}${z}`} position={[x, 0.3, z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial color="#1A1A1E" />
      </mesh>
    )))}
    <Blok p={[1.81, 0.55, 0.5]} s={[0.02, 0.14, 0.3]} c="#FFF2C0" emissive="#FFE080" />
    <Blok p={[1.81, 0.55, -0.5]} s={[0.02, 0.14, 0.3]} c="#FFF2C0" emissive="#FFE080" />
  </group>
);
/** Huizen van een Ottomaanse stad: houten bovenverdiepingen (erkers) op stenen benedenverdiepingen. */
export const Huizen = ({ position, n = 6, zaad = 1 }: { position: V3; n?: number; zaad?: number }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => {
      const k = (i * 7 + zaad * 3) % 5;
      const b = 3.4 + (k % 2) * 0.8;
      const h = 4.2 + (k % 3) * 0.8;
      const x = (i - (n - 1) / 2) * 4.6;
      const muur = ['#E8DCC0', '#D8B890', '#C9A884', '#E2CDA8', '#B8907A'][k];
      return (
        <group key={i} position={[x, 0, 0]}>
          <Blok p={[0, 1.2, 0]} s={[b, 2.4, 3]} c="#B8AE9C" rough={1} />
          <Blok p={[0, 2.4 + (h - 2.4) / 2, 0.4]} s={[b + 0.2, h - 2.4, 3]} c={muur} rough={1} />
          <Blok p={[0, h + 0.25, 0.3]} s={[b + 0.8, 0.5, 3.8]} r={[0, 0, 0]} c="#9A4A34" />
          {[-b / 4, b / 4].map((wx) => <Blok key={wx} p={[wx, 3.4, 1.92]} s={[0.7, 0.9, 0.04]} c="#3A2A20" />)}
          <Blok p={[0, 0.9, 1.52]} s={[0.9, 1.8, 0.04]} c="#5A3A24" />
        </group>
      );
    })}
  </group>
);
/** Silhouet van Istanbul (koepels en minaretten) aan het water. */
export const Skyline = ({ position, schaal = 1 }: { position: V3; schaal?: number }) => (
  <group position={position} scale={schaal}>
    <Moskee position={[-14, 0, 0]} kleur="#D8CCB4" koepel="#7A8690" />
    <Moskee position={[12, 0, -4]} kleur="#E0D4BC" koepel="#8A96A0" />
    <Huizen position={[0, 0, 4]} n={5} zaad={4} />
    <Blok p={[0, -0.2, 6]} s={[60, 0.6, 6]} c="#9A9480" />
  </group>
);
/** Paleis aan het water (Dolmabahçe): lange witte gevel met zuilen. */
export const Dolmabahce = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 4, 0]} s={[34, 8, 7]} c="#F0EADC" rough={0.9} />
    <Blok p={[0, 8.3, 0]} s={[34.4, 0.6, 7.4]} c="#D8CCB0" />
    <Blok p={[0, 10, 0]} s={[8, 3.4, 6]} c="#F0EADC" />
    <Blok p={[0, 11.8, 0]} s={[8.4, 0.4, 6.4]} c="#D8CCB0" />
    {Array.from({ length: 17 }, (_, i) => <Blok key={i} p={[-16 + i * 2, 4, 3.6]} s={[0.4, 8, 0.4]} c="#FFFFFF" />)}
    {Array.from({ length: 16 }, (_, i) => [2.2, 5.8].map((y) => <Blok key={`${i}${y}`} p={[-15 + i * 2, y, 3.52]} s={[1.0, 1.8, 0.04]} c="#4A5A6A" />))}
    <Blok p={[0, 0.3, 6]} s={[40, 0.6, 3]} c="#D8D0C0" />
  </group>
);
/** Anıtkabir: rechthoekige zuilenhal op een hoog bordes. */
export const Mausoleum = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 1.2, 0]} s={[30, 2.4, 18]} c="#D8CEB8" />
    {[0, 1, 2, 3, 4, 5].map((i) => <Blok key={i} p={[0, 0.2 + i * 0.4, 9.4 + i * 0.4]} s={[14, 0.4, 0.8]} c="#CFC4AC" />)}
    <Blok p={[0, 6, 0]} s={[22, 7.2, 12]} c="#E2D8C2" />
    {Array.from({ length: 11 }, (_, i) => <Blok key={i} p={[-10 + i * 2, 6, 6.2]} s={[0.8, 7.2, 0.8]} c="#F2EADA" />)}
    <Blok p={[0, 10, 0]} s={[23, 0.8, 13]} c="#CFC4AC" />
    <TurkseVlag position={[-13, 2.4, 6]} h={7} schaal={1.2} />
  </group>
);

/* ================= licht + lucht ================= */

export type TijdA = 'dag' | 'avond' | 'nacht' | 'grijs' | 'ochtend';
const LUCHT: Record<TijdA, { boven: string; horizon: string; mist: string }> = {
  dag: { boven: '#6E9ED6', horizon: '#E8DCC2', mist: '#D8D0BC' },
  avond: { boven: '#4E3A6A', horizon: '#F4A35A', mist: '#E8A070' },
  nacht: { boven: '#0E1220', horizon: '#1E2434', mist: '#141A28' },
  grijs: { boven: '#6E7A86', horizon: '#B4B8B6', mist: '#A8ACAA' },
  ochtend: { boven: '#8AA8D0', horizon: '#F6D2A8', mist: '#E8D2B8' },
};
const LichtA = ({ tijd }: { tijd: TijdA }) =>
  tijd === 'avond' ? (
    <>
      <Daglicht zon={[-12, 5, -10]} kleur="#FFB878" kracht={1.3} omgeving={0.9} />
      <hemisphereLight args={['#FFC8A0', '#3A2A20', 0.5]} />
    </>
  ) : tijd === 'nacht' ? (
    <Nachtlicht />
  ) : tijd === 'grijs' ? (
    <Daglicht zon={[6, 12, 8]} kleur="#D8DCE0" kracht={1.1} omgeving={1.2} />
  ) : tijd === 'ochtend' ? (
    <Daglicht zon={[10, 6, 6]} kleur="#FFE2C0" kracht={1.4} omgeving={1.1} />
  ) : (
    <Daglicht zon={[8, 12, 9]} />
  );

type SetProps = { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; tijd?: TijdA };
const Cam = ({ cam, kijk, duur }: { cam: number[]; kijk: V3; duur: number }) => {
  const f = useCurrentFrame();
  return <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />;
};

/* ================= sets ================= */

/** Ottomaanse stadsstraat (Saloniki, Istanbul, Ankara): erkerhuizen, keien, een moskee met koepel in de verte. */
export const Straat = ({ children, over, cam = [2.6, 2.4, 9.4, 1.8, 2.2, 8.0], kijk = [0, 1.8, 0] as V3, duur = 160, tijd = 'dag', moskee = true, stof = false }: SetProps & { moskee?: boolean; stof?: boolean }) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.8} mist={[L.mist, 18, 100]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtA tijd={tijd} />
      {tijd === 'nacht' && <pointLight position={[0, 3.5, 2]} intensity={6} distance={14} color="#FFC070" />}
      <Grond kleur={stof ? '#B8A47E' : '#8A8070'} />
      <Huizen position={[0, 0, -6]} n={6} zaad={2} />
      {moskee && <Moskee position={[4, 0, -30]} />}
      {!stof && Array.from({ length: 12 }, (_, i) => <Blok key={i} p={[0, 0.01, 6 - i * 1.4]} s={[14, 0.02, 0.04]} c="#6A6258" />)}
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Kade aan zee (Saloniki, Istanbul, Samsun, Izmir): water vooraan, kade, stad op de achtergrond. */
export const Haven = ({ children, over, cam = [6, 3.0, 12, 4.6, 2.8, 10.4], kijk = [0, 1.4, -2] as V3, duur = 160, tijd = 'dag', stad = 'istanbul' }: SetProps & { stad?: 'istanbul' | 'klein' | 'paleis' | 'geen' }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.4} mist={[L.mist, 30, 160]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtA tijd={tijd} />
      <Zee t={t} kleur={tijd === 'grijs' ? '#4A6272' : tijd === 'nacht' ? '#1A2A3A' : '#2F6E9C'} golf={0.12} />
      {stad === 'istanbul' && <Skyline position={[0, 0, -46]} />}
      {stad === 'klein' && (
        <group position={[0, 0, -40]}>
          <Blok p={[0, -0.2, 3]} s={[60, 0.8, 8]} c="#9A9480" />
          <Huizen position={[0, 0, 2]} n={7} zaad={5} />
          <Heuvels kleur="#6E7A4E" z={-30} />
        </group>
      )}
      {stad === 'paleis' && <Dolmabahce position={[0, 0, -30]} />}
      <Vogels meeuw y={10} z={-30} />
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Gallipoli: een plateau met struiken boven een klif, de zee beneden en schepen aan de horizon. */
export const Kust = ({ children, over, cam = [5, 3.2, 12, 3.6, 2.8, 10.4], kijk = [0, 1.2, -4] as V3, duur = 160, tijd = 'dag', schepen = 4, rook = false }: SetProps & { schepen?: number; rook?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.4} mist={[L.mist, 30, 180]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtA tijd={tijd} />
      <group position={[0, -6, 0]}>
        <Zee t={t} kleur="#2F6E9C" golf={0.1} grootte={260} />
      </group>
      <Blok p={[0, -3.2, 14]} s={[120, 6.4, 40]} c="#9A8A62" rough={1} />
      <Blok p={[-30, -3.0, -8]} s={[30, 6.4, 6]} r={[0, 0.3, 0]} c="#8E7E58" rough={1} />
      <Grond kleur="#9A8A62" y={-0.02} grootte={1} />
      <Struiken n={40} z0={-2} diep={6} breed={40} />
      {[[-90, 0], [70, -20]].map(([x, z], i) => <Berg key={i} position={[x, -6, z - 150]} h={16} r={30} kleur="#8A8270" />)}
      {Array.from({ length: schepen }, (_, i) => <Oorlogsschip key={i} position={[-30 + i * 18, -5.8, -60 - (i % 2) * 18]} rotation={[0, 0.2 * (i % 2 ? 1 : -1), 0]} t={t + i} schaal={1.4} />)}
      {rook && <Rook position={[6, -2, -8]} t={t} />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Woestijn bij Tobroek: duinen, tenten, palmen. */
export const Woestijn = ({ children, over, cam = [5, 2.6, 11, 3.8, 2.4, 9.4], kijk = [0, 1.4, -2] as V3, duur = 160, tijd = 'dag' }: SetProps) => {
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.6} mist={[tijd === 'avond' ? L.mist : '#E8D8B0', 30, 160]} over={over}>
      <Lucht boven={tijd === 'avond' ? L.boven : '#7FA8D8'} horizon={tijd === 'avond' ? L.horizon : '#F0E2C0'} />
      <LichtA tijd={tijd} />
      <Grond kleur="#D9B57A" />
      <Duinen z={-24} />
      {[[-8, -8], [9, -10], [-14, -14]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <Blok p={[0, 2.5, 0]} s={[0.3, 5, 0.3]} r={[0, 0, 0.08]} c="#7A5A3A" />
          {[0, 1, 2, 3, 4].map((k) => <Blok key={k} p={[Math.cos(k * 1.26) * 0.9, 5, Math.sin(k * 1.26) * 0.9]} s={[1.8, 0.1, 0.4]} r={[0, -k * 1.26, -0.3]} c="#4E6A2E" />)}
        </group>
      ))}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Anatolië: kale heuvels, steppe; `bergen` = verre bergruggen. */
export const Anatolie = ({ children, over, cam = [5, 2.8, 12, 3.6, 2.6, 10], kijk = [0, 1.6, -2] as V3, duur = 160, tijd = 'dag', grond = '#A8966A', sneeuw = false }: SetProps & { grond?: string; sneeuw?: boolean }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.6} mist={[L.mist, 30, 170]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <LichtA tijd={tijd} />
      <Grond kleur={sneeuw ? '#E4E8EE' : grond} />
      <Heuvels kleur={sneeuw ? '#C8D0D8' : '#8A7A56'} z={-60} />
      {[-30, -6, 20, 44].map((x, i) => <Berg key={x} position={[x, -1, -120 - (i % 2) * 20]} h={26 + (i % 3) * 8} r={28} kleur="#8A8090" />)}
      {[-14, 10, 18].map((x, i) => <Boom key={x} position={[x, 0, -16 - i * 4]} schaal={0.9} kleur="#6E7A3E" />)}
      {sneeuw && <Neerslag t={f / FPS} n={140} breed={16} />}
      {tijd !== 'nacht' && <Vogels />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/** Binnen: kantoor/werkkamer met boekenkast, bureau, de Turkse vlag. */
export const Werkkamer = ({ children, over, cam = [1.6, 2.0, 5.4, 1.0, 1.9, 4.4], kijk = [0, 1.3, -0.4] as V3, duur = 160, nacht = false, bureau = true, vlag = true }: SetProps & { nacht?: boolean; bureau?: boolean; vlag?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3.2} mist={nacht ? ['#141210', 6, 26] : ['#3A2E22', 10, 40]} over={over}>
      <Lucht boven={nacht ? '#0E0C0A' : '#2E241A'} horizon={nacht ? '#1A1612' : '#4A3A2A'} />
      {nacht ? <hemisphereLight args={['#5A5048', '#141210', 0.4]} /> : <Binnenlicht zon={[-4, 8, 6]} kleur="#FFE2B8" />}
      <Grond kleur="#5A3E2A" />
      <Blok p={[0, 0.02, 0.4]} s={[4.4, 0.04, 6]} c="#7A2226" rough={1} />
      <Blok p={[0, 3, -2.0]} s={[10, 6, 0.3]} c="#D8C8A8" rough={1} />
      <Blok p={[0, 0.8, -1.82]} s={[10, 1.6, 0.06]} c="#5A3B24" />
      <Blok p={[-4, 3, 0]} s={[0.3, 6, 6]} c="#CDB894" rough={1} />
      <Blok p={[-1.9, 2.4, -1.84]} s={[1.2, 1.6, 0.05]} c="#4A3020" />
      <Blok p={[-1.9, 2.4, -1.81]} s={[1.0, 1.4, 0.05]} c={nacht ? '#141E36' : '#A8C8E0'} />
      <group position={[2.4, 0, -1.6]}>
        <Blok p={[0, 1.4, 0]} s={[1.6, 2.8, 0.5]} c="#4A2E1C" />
        {[0.6, 1.2, 1.8, 2.4].map((y) => Array.from({ length: 7 }, (_, i) => <Blok key={`${y}${i}`} p={[-0.6 + i * 0.2, y, 0.2]} s={[0.14, 0.42, 0.3]} c={['#7A2A24', '#2A3A5A', '#3A5A3A', '#8A6A3A'][(i + y * 10) % 4]} />))}
      </group>
      {vlag && <TurkseVlag position={[0.6, 0, -1.6]} t={f / FPS} h={2.6} schaal={0.7} />}
      {bureau && (
        <group position={[0, 0, 0.2]}>
          <Tafel position={[0, 0, 0]} b={2.6} d={1.1} kleur="#4A2E1C" />
          <Blok p={[0, 0.83, 0]} s={[2.0, 0.02, 0.8]} c="#2E3A4A" />
          <Lamp position={[-0.9, 0.82, -0.2]} aan />
        </group>
      )}
      {nacht && <pointLight position={[-0.6, 1.5, 0.6]} intensity={5} distance={6} color="#FFD890" />}
      <Cam cam={cam} kijk={kijk} duur={duur} />
      {children}
    </Shot>
  );
};

/* ================= kaart ================= */

export type KST = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KST, b: KST, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opTR(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
export const T_VER: KST = { lon: 31, lat: 37.5, h: 24, a: 13 };
export const T_ANATOLIE: KST = { lon: 33, lat: 39.4, h: 12, a: 7.5 };
export const kpT = (s: PlaatsTR, h = 7, a = 5, dx = 0.6): KST => ({ lon: PLAATS_TR[s][0], lat: PLAATS_TR[s][1], h, a, dx });
export const plT = (s: PlaatsTR): [number, number] => [PLAATS_TR[s][0], PLAATS_TR[s][1]];

const RouteT = ({ punten, p, kleur = HUD_ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opTR(lon, lat, 0.55));
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

export const KaartT = ({ van, naar, wissel = [20, 70], cam = [T_VER, T_VER], camDuur = 150, spelden = [], routes = [], routeTijd = [10, 120], kop, licht, over, children }: {
  van: Record<string, TRStand>;
  naar?: Record<string, TRStand>;
  wissel?: [number, number];
  cam?: [KST, KST];
  camDuur?: number;
  spelden?: [PlaatsTR, string][];
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
      <KaarttafelTR van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldTR key={s} lon={PLAATS_TR[s][0]} lat={PLAATS_TR[s][1]} kleur={k} schaal={0.8} hoogte={1.1} />)}
      {routes.map((r, i) => <RouteT key={i} punten={r.punten} kleur={r.kleur} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={i === 0 ? kop : undefined} />)}
      {children}
    </Shot>
  );
};
const KaartVoet = () => (
  <div style={{ position: 'absolute', right: 60, bottom: 26, fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: 'rgba(255,244,224,0.7)' }}>modern borders, approximate</div>
);
/** Mini-figuurtje op de kaart (Mustafa Kemal). */
export const MiniKemal = ({ kalpak = true }: { kalpak?: boolean }) => (
  <group scale={0.26} rotation={[0, 0.4, 0]}>
    <Figuur kleding={OFFICIER_K} snor hoofdExtra={kalpak ? <Kalpak /> : <Fez />} />
  </group>
);
export const MiniSchip = () => <group scale={0.1} rotation={[0, -0.6, 0]}><Stoomschip position={[0, 0, 0]} rook={false} /></group>;
export const MiniGriek = () => (
  <group scale={0.24} rotation={[0, -1.0, 0]}>
    <Figuur kleding={GRIEK} hoofdExtra={<Pet kleur="#5E6044" />} />
  </group>
);
/** Kleine rode vlag op een kaartspeld-hoogte. */
export const KaartVlag = ({ s }: { s: PlaatsTR }) => {
  const [x, , z] = opTR(PLAATS_TR[s][0], PLAATS_TR[s][1]);
  return <TurkseVlag position={[x, 0.45, z]} h={1.4} schaal={0.5} />;
};

/* ================= 2D ================= */

/** Bankbiljet met zijn gezicht (2D): Turkse lira, zonder echte nummers. */
export const Biljet = () => {
  const f = useCurrentFrame();
  const s = ease(f, 4, 20, 0.6, 1);
  return (
    <div style={{ position: 'absolute', top: 190, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: lin(f, 2, 10, 0, 1) }}>
      <div style={{ transform: `scale(${s}) rotate(-3deg)`, width: 760, height: 360, background: 'linear-gradient(135deg,#C9D8B8,#E8D8B0 60%,#C8B4D0)', border: '10px solid #6A5A7A', borderRadius: 14, boxShadow: '0 16px 40px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 40, top: 40, width: 230, height: 270, borderRadius: '50%', background: 'radial-gradient(circle at 50% 40%,#E8D2B8,#9A8A7A)', border: '4px solid #5A4A5A' }} />
        <div style={{ position: 'absolute', left: 40, top: 40, fontFamily: SERIF, fontWeight: 800, fontSize: 54, color: '#3A2A4A' }}>TÜRKİYE</div>
        <div style={{ position: 'absolute', left: 40, top: 110, fontFamily: SERIF, fontSize: 30, color: '#3A2A4A' }}>CUMHURİYET MERKEZ BANKASI</div>
        <div style={{ position: 'absolute', left: 40, bottom: 34, fontFamily: SERIF, fontWeight: 800, fontSize: 110, color: '#3A2A4A' }}>₺</div>
      </div>
    </div>
  );
};

/** Twee alfabetten: Arabisch schrift verdwijnt, Latijnse letters komen (de letterhervorming, 1928). */
export const Alfabet = () => {
  const f = useCurrentFrame();
  const oud = lin(f, 20, 40, 1, 0);
  const nieuw = lin(f, 34, 54, 0, 1);
  const stijl = { fontFamily: SERIF, fontWeight: 800, fontSize: 120, color: '#FFF4E0', WebkitTextStroke: '3px #4A2A0C', textShadow: '0 8px 24px rgba(0,0,0,0.7)' } as const;
  return (
    <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ ...stijl, opacity: oud, transform: `translateY(${(1 - oud) * -30}px)`, fontFamily: 'Arial, sans-serif', direction: 'rtl' }}>ا ب ت ث ج</div>
      <div style={{ ...stijl, opacity: nieuw, marginTop: -150, color: HUD_ORANJE }}>A B C Ç D</div>
    </div>
  );
};

export { opTR, PLAATS_TR, Paard as PaardA, Vuur as VuurA, Flits as FlitsA, Klok as KlokA, Boek as BoekA, Kaars as KaarsA, Stoel as StoelA, Trein as TreinA };
