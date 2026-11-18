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
