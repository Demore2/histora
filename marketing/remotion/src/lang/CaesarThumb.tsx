import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Avondlicht, Binnenlicht, Camera, Daglicht, Duinen, Fakkel, Grond, Leger, Lucht, Nachtlicht, Scherpte, Zon, Zuil } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, CAESAR, Dolk, Figuur, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, SENATOR, type V3 } from '../watals/Figuur';
import { SERIF } from './LangHud';
import { AURELIA, CAESAR_JONG, TOGA_TRIOMF } from './CaesarScenes';
import { Driekleur } from './LangDecor';
import { SALADIN, YUSUF } from './SaladinScenes';
import { Baby, Falanx, LEONIDAS, PersLeger, Spartaan, Wieg } from './LeonidasKit';
import { Baibars, Eskadron, LeeuwVaandel, NekBordje } from './BaibarsKit';
import { Kremlin as KremlinS, RodeVlag as RodeVlagS, SOSO as SOSO_K, STALIN_P as STALIN_THUMB } from './StalinKit';
import { Fez as FezA, KEMAL_KIND, MAARSCHALK_P, Mausoleum as MausoleumA, TurkseVlag } from './AtaturkKit';
import { BALDWIN as BALDWIN_T, BALDWIN_KIND as BALDWIN_KIND_T, BW as BW_T, Masker as MaskerT, BLAUW as BLAUW_T } from '../watals/WatAlsBaldwin';
import { Muur as MuurT, Stad as StadT } from './SaladinScenes';
import { Banier as BanierT } from '../watals/Decor';
import { Molen, ORANJE as W_ORANJE, Prinsenvlag, W as WILLEM_P, WILLEM_KIND } from './WillemKit';

/**
 * Thumbnail Caesar in het vaste formaat (les van de concurrent): links de boze baby ("AGE 0"), rechts het hoogtepunt
 * met één woord ("DICTATOR"). Staat ook in de eerste frames van de video, zodat het bestand zo geüpload kan worden.
 */
const Helft = ({ links, children, focus }: { links: boolean; children: ReactNode; focus: V3 }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: links ? 0 : 860,
      width: 1060,
      height: 1080,
      clipPath: links ? 'polygon(0 0, 1060px 0, 860px 1080px, 0 1080px)' : 'polygon(200px 0, 1060px 0, 1060px 1080px, 0 1080px)',
    }}
  >
    <ThreeCanvas width={1060} height={1080} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      {children}
      <Scherpte focus={focus} sterkte={3} />
    </ThreeCanvas>
  </div>
);

const Label = ({ tekst, x, y, kleur, rot, maat = 132 }: { tekst: string; x: number; y: number; kleur: string; rot: number; maat?: number }) => (
  <div style={{ position: 'absolute', left: x, top: y, fontFamily: FONT, fontWeight: 900, fontSize: maat, letterSpacing: 2, color: kleur, WebkitTextStroke: '10px #1A120A', paintOrder: 'stroke fill', transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 8px 0 rgba(0,0,0,0.45))' }}>
    {tekst}
  </div>
);

/** Het rode boos-teken (zoals in een manga) naast het hoofd van het kind. */
const Boos = ({ x, y, maat }: { x: number; y: number; maat: number }) => (
  <svg width={maat} height={maat} viewBox="-50 -50 100 100" style={{ position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.35))' }}>
    {[0, 90, 180, 270].map((r) => (
      <path key={r} transform={`rotate(${r})`} d="M 8 -40 Q 10 -12 40 -8" fill="none" stroke="#1A120A" strokeWidth="20" strokeLinecap="round" />
    ))}
    {[0, 90, 180, 270].map((r) => (
      <path key={r} transform={`rotate(${r})`} d="M 8 -40 Q 10 -12 40 -8" fill="none" stroke="#E8382B" strokeWidth="11" strokeLinecap="round" />
    ))}
  </svg>
);

export const CaesarThumb = () => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Helft links focus={[0.2, 0.95, 0.2]}>
      <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
      <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
      <Camera pos={[0.35, 1.0, 1.55]} kijk={[0.22, 0.86, 0.2]} fov={34} />
      <Grond kleur="#B08A62" />
      <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#E7C79C" />
      <Blok p={[-0.5, 1.3, -0.95]} s={[0.9, 0.9, 0.05]} c="#8A5A32" />
      <Blok p={[-0.5, 1.3, -0.92]} s={[0.76, 0.76, 0.05]} c="#9FD0EE" />
      <Blok p={[-0.5, 1.3, -0.88]} s={[0.05, 0.76, 0.04]} c="#8A5A32" />
      <Blok p={[-0.5, 1.3, -0.88]} s={[0.76, 0.05, 0.04]} c="#8A5A32" />
      <Figuur kleding={CAESAR_JONG} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: 1, mond: 'open', armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, -1.0] }, armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 1.0] } }} />
    </Helft>
    <Helft links={false} focus={[0, 2.2, 0]}>
      <Lucht boven="#C94A2E" horizon="#FFC36A" />
      <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
      <Daglicht zon={[6, 12, 8]} kracht={2.2} />
      <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.05, 0]} fov={36} />
      <Grond kleur="#D8B88A" />
      {[-2.6, 2.6].map((x) => <Zuil key={x} position={[x, 0, -3]} h={7} />)}
      <Leger rijen={2} kolommen={12} position={[0, 0, -10]} />
      <Figuur kleding={TOGA_TRIOMF} hoofddeksel="krans" position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
      <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
    </Helft>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#FFF4E0" strokeWidth="14" />
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#1A120A" strokeWidth="4" />
    </svg>
    <Boos x={640} y={250} maat={150} />
    <Label tekst="AGE 0" x={70} y={40} kleur="#FFFFFF" rot={-4} />
    <Label tekst="DICTATOR" x={1150} y={40} kleur="#FF5436" rot={-3} />
    {void [CAESAR, SENATOR, Dolk, AURELIA, Avondlicht, SERIF]}
  </AbsoluteFill>
);

/** Gedeelde opbouw van de brede thumbnail (sinds Caesar): close-ups, lichte achtergrond, boos-teken, geen kleine tekst. */
const Breed = ({ links, rechts, woordLinks, woordRechts, boos = [640, 250], rechtsX, rechtsMaat }: { links: ReactNode; rechts: ReactNode; woordLinks: string; woordRechts: string; boos?: [number, number]; rechtsX?: number; rechtsMaat?: number }) => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Helft links focus={[0.2, 0.95, 0.2]}>
      <Camera pos={[0.35, 1.0, 1.55]} kijk={[0.22, 0.86, 0.2]} fov={34} />
      {links}
    </Helft>
    <Helft links={false} focus={[0, 2.2, 0]}>
      {rechts}
    </Helft>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#FFF4E0" strokeWidth="14" />
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#1A120A" strokeWidth="4" />
    </svg>
    <Boos x={boos[0]} y={boos[1]} maat={150} />
    <Label tekst={woordLinks} x={70} y={40} kleur="#FFFFFF" rot={-4} />
    <Label tekst={woordRechts} x={rechtsX ?? (woordRechts.length > 7 ? 1150 : 1220)} y={40} kleur="#FF5436" rot={-3} maat={rechtsMaat} />
  </AbsoluteFill>
);

/** Saladin (YouTube): links het kind in de nacht van de vlucht, rechts de sultan voor zijn leger. */
export const SaladinThumbBreed = () => (
  <Breed
    woordLinks="AGE 0"
    woordRechts="SULTAN"
    links={
      <>
        <Lucht boven="#1C2A4A" horizon="#3A5080" />
        <Nachtlicht />
        <hemisphereLight args={['#9DB4E0', '#3A2A20', 0.9]} />
        <Grond kleur="#6A5A44" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#7A6A58" />
        <Blok p={[-0.5, 1.3, -0.95]} s={[0.9, 0.9, 0.05]} c="#8A5A32" />
        <Blok p={[-0.5, 1.3, -0.92]} s={[0.76, 0.76, 0.05]} c="#2A3A66" />
        <Blok p={[-0.5, 1.3, -0.88]} s={[0.05, 0.76, 0.04]} c="#8A5A32" />
        <Blok p={[-0.5, 1.3, -0.88]} s={[0.76, 0.05, 0.04]} c="#8A5A32" />
        <Fakkel position={[0.85, 0, -0.6]} />
        <pointLight position={[0.8, 1.0, -0.2]} intensity={2.2} distance={2.2} color="#FFA850" />
        <pointLight position={[0.5, 0.95, 0.9]} intensity={2.4} distance={2.5} color="#FFC890" />
        <Figuur kleding={YUSUF} hoofddeksel="tulband" position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: 1, mond: 'open', armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, -1.0] }, armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 1.0] } }} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFC07A" />
        <Avondlicht />
        <Daglicht zon={[4, 10, 10]} kracht={1.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#B8986A" />
        <Duinen kleur="#A8865A" />
        <Blok p={[0, 3, -16]} s={[30, 6, 2]} c="#CDB894" />
        <Leger rijen={2} kolommen={12} kleur="#E2D6BC" schild="#C99A2E" position={[0, 0, -9]} />
        <Figuur kleding={SALADIN} hoofddeksel="tulband" baard position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.6 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Napoleon (YouTube): links de gepeste scholier van negen, rechts de keizer met kroon en driekleuren. */
export const NapoleonThumbBreed = () => (
  <Breed
    woordLinks="AGE 9"
    woordRechts="EMPEROR"
    links={
      <>
        <Lucht boven="#9EC1DB" horizon="#EADFC6" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#B7A88A" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#D9CDB6" />
        <Blok p={[-0.55, 1.25, -0.97]} s={[0.95, 0.6, 0.04]} c="#3A4A3A" />
        <Figuur kleding={{ ...NAPOLEON, laarzen: undefined }} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: 1, mond: 'dicht', ...ARMEN_GEKRUIST }} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFC07A" />
        <Avondlicht />
        <Binnenlicht zon={[4, 8, 10]} kleur="#FFD8A8" />
        <Camera pos={[-0.15, 2.3, 3.3]} kijk={[-0.15, 2.3, 0]} fov={36} />
        <Grond kleur="#4A3424" />
        <Leger tijd="1800" rijen={2} kolommen={12} position={[0, 0, -11]} />
        <Driekleur position={[2.0, 0, -2.6]} hoogte={3.2} />
        <Figuur kleding={NAPOLEON_KROONMANTEL} position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
        <group position={[0, 2.38, 0]} scale={1.15}>
          <Kroon />
        </group>
        <pointLight position={[0.6, 3.2, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Leonidas (YouTube): links de boze baby in zijn wieg, rechts de koning met de rode dwarskam voor de falanx bij zonsondergang. */
export const LeonidasThumb = () => (
  <Breed
    woordLinks="AGE 0"
    woordRechts="300"
    boos={[790, 140]}
    links={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#B08A62" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#E7C79C" />
        <Blok p={[-0.5, 1.3, -0.95]} s={[0.9, 0.9, 0.05]} c="#8A5A32" />
        <Blok p={[-0.5, 1.3, -0.92]} s={[0.76, 0.76, 0.05]} c="#9FD0EE" />
        <Blok p={[-0.5, 1.12, -0.89]} s={[0.74, 0.3, 0.02]} c="#8A8A7A" />
        <Wieg position={[0.22, 0, 0.0]} label={false}>
          <Baby position={[0, 0, 0.12]} boos={1} rotation={[0, 0.12, 0]} />
        </Wieg>
      </>
    }
    rechts={
      <>
        <Lucht boven="#C94A2E" horizon="#FFC36A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#C9A070" />
        <Falanx rijen={2} kolommen={12} position={[0, 0, -7]} />
        <Spartaan kleding={LEONIDAS} koning speer={false} schild={false} rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Baibars (YouTube): links de boze slavenjongen met het bordje "damaged goods" (wit vlekje in zijn oog), rechts de sultan
 * met het leeuwenvaandel voor zijn Mamelukken bij zonsondergang. */
export const BaibarsThumb = () => (
  <Breed
    woordLinks="AGE 14"
    woordRechts="SULTAN"
    boos={[790, 140]}
    links={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#CDB48A" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#E2D2AE" />
        <Blok p={[-0.55, 1.45, -0.98]} s={[0.6, 0.8, 0.05]} c="#5A3B24" />
        <Blok p={[-0.55, 1.95, -0.7]} s={[0.9, 0.04, 0.55]} r={[0.3, 0, 0]} c="#3E6B8A" />
        <Baibars leeftijd="kind" scale={0.45} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} pose={{ wenk: 1, mond: 'open' }} extra={<NekBordje tekst="DAMAGED|GOODS" y={1.18} />} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#C94A2E" horizon="#FFC36A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#C9A070" />
        <Eskadron rijen={2} kolommen={10} position={[0, 0, -8]} />
        <LeeuwVaandel position={[-1.9, 0, -4.6]} t={0.4} h={4.6} />
        <Baibars leeftijd="sultan" rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Leonidas links, gedeeld door de testvarianten B en C: de boze baby in een koude nachtkamer, één fakkel. */
const LeonidasBabyNacht = () => (
  <>
    <Lucht boven="#1C2A4A" horizon="#3A5080" />
    <Nachtlicht />
    <hemisphereLight args={['#9DB4E0', '#3A2A20', 0.9]} />
    <Grond kleur="#3A3A48" />
    <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#4A4E62" />
    <Blok p={[-0.5, 1.3, -0.95]} s={[0.9, 0.9, 0.05]} c="#5A3B24" />
    <Blok p={[-0.5, 1.3, -0.92]} s={[0.76, 0.76, 0.05]} c="#22325A" />
    <Fakkel position={[1.1, 0, -0.7]} />
    <pointLight position={[1.0, 1.0, 0.5]} intensity={2.2} distance={2.0} color="#FFB060" />
    <pointLight position={[-0.4, 1.1, 1.0]} intensity={0.9} distance={2.5} color="#9DB8FF" />
    <Wieg position={[0.22, 0, 0.0]} label={false}>
      <Baby position={[0, 0, 0.12]} boos={1} rotation={[0, 0.12, 0]} />
    </Wieg>
  </>
);

/** Testvariant B (YouTube "Testen en vergelijken"): zelfde woorden, maar koud tegen warm. Links de nacht, rechts een
 * diepe zonsondergang in rood en goud. */
export const LeonidasThumbB = () => (
  <Breed
    woordLinks="AGE 0"
    woordRechts="300"
    boos={[790, 140]}
    links={<LeonidasBabyNacht />}
    rechts={
      <>
        <Lucht boven="#5A1E2A" horizon="#FF9A3E" onder="#2A1A12" />
        <Zon position={[-12, 5, -90]} grootte={18} kleur="#FFD27A" />
        <Avondlicht />
        <Daglicht zon={[4, 10, 10]} kracht={1.1} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#8A5A3A" />
        <Falanx rijen={2} kolommen={12} position={[0, 0, -7]} />
        <Spartaan kleding={LEONIDAS} koning speer={false} schild={false} rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={5} distance={4} color="#FFD27A" />
      </>
    }
  />
);

/** Testvariant C: de overmacht. Leonidas met schild en speer vooraan, achter hem de Perzische massa onder een donkere
 * hemel; "VS 150,000" is het getal dat de video zelf noemt (moderne schatting, zin "Historians: 100-200k"). */
export const LeonidasThumbC = () => (
  <Breed
    woordLinks="AGE 0"
    woordRechts="VS 150,000"
    rechtsX={1090}
    rechtsMaat={112}
    boos={[790, 140]}
    links={<LeonidasBabyNacht />}
    rechts={
      <>
        <Lucht boven="#2A1A3A" horizon="#C9603A" onder="#1A1210" />
        <Avondlicht />
        <Daglicht zon={[4, 10, 10]} kracht={1.0} />
        <Camera pos={[-0.1, 3.0, 3.6]} kijk={[-0.1, 1.85, 0]} fov={40} />
        <Grond kleur="#6A4A34" />
        <PersLeger rijen={6} kolommen={18} afstand={0.9} position={[0, 0, -7]} />
        <PersLeger rijen={8} kolommen={24} afstand={0.9} position={[0, 0, -12]} />
        <PersLeger rijen={8} kolommen={34} afstand={0.9} position={[0, 0, -21]} />
        <Spartaan kleding={LEONIDAS} koning schild="voor" rotation={[0, -0.1, 0]} pose={{ wenk: 0.9 }} />
        <pointLight position={[0.6, 3.0, 1.8]} intensity={5} distance={4.5} color="#FFD27A" />
      </>
    }
  />
);

/** Willem van Oranje (YouTube): links het rijke jongetje van elf met een te grote kroon, rechts Willem met de
 * Prinsenvlag voor de molens bij zonsondergang: "VS SPAIN". */
export const WillemThumb = () => (
  <Breed
    woordLinks="AGE 11"
    woordRechts="VS SPAIN"
    boos={[790, 140]}
    links={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#7A5A3A" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#D8C4A0" />
        <Blok p={[-0.55, 1.35, -0.98]} s={[0.8, 0.9, 0.05]} c="#5A3B24" />
        <Blok p={[-0.55, 1.35, -0.95]} s={[0.68, 0.78, 0.05]} c="#A8D2EE" />
        <Figuur kleding={WILLEM_KIND} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: 1, mond: 'open', armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, -1.0] }, armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 1.0] } }} hoofdExtra={<group position={[0, 0.8, 0]} scale={0.95}><Kroon /></group>} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#C94A2E" horizon="#FFC36A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#7E9A4E" />
        {[-14, 10].map((x) => <Molen key={x} position={[x, 0, -30]} schaal={1.3} />)}
        <Leger rijen={2} kolommen={12} position={[0, 0, -9]} kleur={W_ORANJE} schild="#2A4A9A" />
        <Prinsenvlag position={[-2.6, 0, -2]} h={4.2} />
        <Figuur {...WILLEM_P} levend={false} rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);
/** Stalin (YouTube): links het boze jongetje van zeven in het arme huis in Gori, rechts Stalin met pijp voor het
 * Kremlin bij zonsondergang: "DICTATOR". */
export const StalinThumb = () => (
  <Breed
    woordLinks="AGE 7"
    woordRechts="DICTATOR"
    boos={[790, 140]}
    links={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#6A5A44" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#B8A88A" />
        <Blok p={[-0.55, 1.35, -0.98]} s={[0.8, 0.9, 0.05]} c="#5A3B24" />
        <Blok p={[-0.55, 1.35, -0.95]} s={[0.68, 0.78, 0.05]} c="#A8D2EE" />
        <Figuur kleding={SOSO_K} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: 1, mond: 'open', armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, -1.0] }, armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 1.0] } }} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#B83A2A" horizon="#FFC36A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#6E6A66" />
        <KremlinS position={[0, 0, -30]} />
        <RodeVlagS position={[-2.6, 0, -2]} h={4.2} />
        <Figuur {...STALIN_THUMB} rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Instagram-story (1080x1920) bij de lange Stalin-video: Stalin voor het Kremlin, "FULL VIDEO NOW ON YOUTUBE",
 * met een lege strook onderin voor de link-sticker die in de app wordt geplakt. */
export const StalinStory = () => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <ThreeCanvas width={1080} height={1920} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      <Lucht boven="#B83A2A" horizon="#FFC36A" />
      <Zon position={[-6, 8, -90]} grootte={16} kleur="#FFE9A8" />
      <Daglicht zon={[6, 12, 8]} kracht={2.2} />
      <Camera pos={[0.4, 2.0, 5.2]} kijk={[0.1, 2.15, 0]} fov={42} />
      <Grond kleur="#6E6A66" />
      <KremlinS position={[0, 0, -30]} />
      <RodeVlagS position={[-2.4, 0, -2]} h={4.2} />
      <Figuur {...STALIN_THUMB} rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
      <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      <Scherpte focus={[0, 2.2, 0]} sterkte={2} />
    </ThreeCanvas>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,12,6,0.75) 0%, rgba(20,12,6,0) 30%, rgba(20,12,6,0) 55%, rgba(20,12,6,0.9) 78%)' }} />
    <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 92, color: '#FFFFFF', WebkitTextStroke: '9px #1A120A', paintOrder: 'stroke fill', letterSpacing: 2 }}>FULL VIDEO</div>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 168, color: '#FF5436', WebkitTextStroke: '12px #1A120A', paintOrder: 'stroke fill', lineHeight: 1, filter: 'drop-shadow(0 8px 0 rgba(0,0,0,0.45))' }}>STALIN</div>
    </div>
    <div style={{ position: 'absolute', top: 1290, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 26, background: '#FF0033', borderRadius: 30, padding: '22px 46px', boxShadow: '0 10px 0 rgba(0,0,0,0.4)' }}>
        <svg width="70" height="70" viewBox="0 0 70 70"><polygon points="20,12 60,35 20,58" fill="#FFFFFF" /></svg>
        <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 70, color: '#FFFFFF' }}>NOW ON YOUTUBE</span>
      </div>
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 52, color: '#FFF4E0', marginTop: 34 }}>his whole life in 9 minutes</div>
      <div style={{ fontFamily: SERIF, fontSize: 40, color: 'rgba(255,244,224,0.75)', marginTop: 150 }}>tap the link ↓</div>
    </div>
  </AbsoluteFill>
);

/** Atatürk: links het jongetje met fez (AGE 7, net zijn vader verloren), rechts de maarschalk met kalpak en de vlag. */
export const AtaturkThumb = () => (
  <Breed
    woordLinks="AGE 7"
    woordRechts="FOUNDER"
    boos={[790, 140]}
    links={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#6A5A44" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#D8C8A8" />
        <Blok p={[-0.55, 1.35, -0.98]} s={[0.8, 0.9, 0.05]} c="#5A3B24" />
        <Blok p={[-0.55, 1.35, -0.95]} s={[0.68, 0.78, 0.05]} c="#A8D2EE" />
        <Figuur kleding={KEMAL_KIND} oogKleur="#4A88C8" hoofdExtra={<FezA />} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: 1, mond: 'open', armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, -1.0] }, armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 1.0] } }} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#B83A2A" horizon="#FFC36A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#A8966A" />
        <MausoleumA position={[6, 0, -40]} />
        <TurkseVlag position={[-2.6, 0, -2]} h={4.2} />
        <Figuur {...MAARSCHALK_P} rotation={[0, -0.12, 0]} pose={{ wenk: 0.5 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);


/** Baldwin IV (YouTube): links de jongen van 9 die naar zijn gevoelloze arm kijkt, rechts de koning voor Jeruzalem.
 * A = met het zilveren masker (de herkenning uit de film; de video zegt zelf dat het een mythe is), B = zonder. */
const BaldwinThumbBasis = ({ masker }: { masker: boolean }) => (
  <Breed
    woordLinks="AGE 9"
    woordRechts="LEPER KING"
    boos={[-600, -600]}
    rechtsX={1110}
    rechtsMaat={118}
    links={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#C8B48A" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#DCC9A2" />
        <Blok p={[-0.6, 1.35, -0.98]} s={[0.8, 0.9, 0.05]} c="#5A3B24" />
        <Blok p={[-0.6, 1.35, -0.95]} s={[0.68, 0.78, 0.05]} c="#A8D2EE" />
        <Figuur kleding={BALDWIN_KIND_T} haar="kort" position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} scale={0.45} pose={{ wenk: -0.6, mond: 'open', hoofd: [0.3, -0.35, 0], armR: { schouder: [-1.2, 0, 0.5], elleboog: [0, 0] } }} />
      </>
    }
    rechts={
      <>
        <Lucht boven="#5A3A6A" horizon="#FFB86A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[-0.15, 2.2, 3.0]} kijk={[-0.15, 2.1, 0]} fov={36} />
        <Grond kleur="#C8AC7A" />
        <group position={[0, 0, -26]} scale={1.3}><MuurT vlag={BLAUW_T} /><StadT z={-6} koepels={false} /></group>
        <BanierT position={[-2.6, 0, -2]} kleur={BLAUW_T} />
        {masker ? (
          <Figuur kleding={BALDWIN_T} haar="kaal" hoofdExtra={<><MaskerT /><Kroon position={[0, 0.74, 0]} /></>} rotation={[0, -0.12, 0]} pose={{ armL: { schouder: [-1.0, 0, 0.35], elleboog: [0, 0.9] } }} />
        ) : (
          <Figuur {...BW_T(2)} rotation={[0, -0.12, 0]} pose={{ wenk: 0.6, armL: { schouder: [-1.0, 0, 0.35], elleboog: [0, 0.9] } }} />
        )}
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);
export const BaldwinThumb = () => <BaldwinThumbBasis masker />;
export const BaldwinThumbB = () => <BaldwinThumbBasis masker={false} />;
