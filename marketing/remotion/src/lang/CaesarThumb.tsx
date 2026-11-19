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
import { Baby, Falanx, LEONIDAS, Spartaan, Wieg } from './LeonidasKit';
import { Baibars, Eskadron, LeeuwVaandel, NekBordje } from './BaibarsKit';

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

const Label = ({ tekst, x, y, kleur, rot }: { tekst: string; x: number; y: number; kleur: string; rot: number }) => (
  <div style={{ position: 'absolute', left: x, top: y, fontFamily: FONT, fontWeight: 900, fontSize: 132, letterSpacing: 2, color: kleur, WebkitTextStroke: '10px #1A120A', paintOrder: 'stroke fill', transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 8px 0 rgba(0,0,0,0.45))' }}>
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
const Breed = ({ links, rechts, woordLinks, woordRechts, boos = [640, 250] }: { links: ReactNode; rechts: ReactNode; woordLinks: string; woordRechts: string; boos?: [number, number] }) => (
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
    <Label tekst={woordRechts} x={woordRechts.length > 7 ? 1150 : 1220} y={40} kleur="#FF5436" rot={-3} />
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
