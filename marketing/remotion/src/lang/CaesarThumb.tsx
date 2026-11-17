import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Avondlicht, Camera, Daglicht, Grond, Leger, Lucht, Scherpte, Zon, Zuil } from '../watals/Decor';
import { Blok, CAESAR, Dolk, Figuur, SENATOR, type V3 } from '../watals/Figuur';
import { SERIF } from './LangHud';
import { AURELIA, CAESAR_JONG, TOGA_TRIOMF } from './CaesarScenes';

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

export const CaesarThumb = () => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Helft links focus={[0, 0.8, 0]}>
      <Lucht boven="#3E2E3A" horizon="#D0784A" />
      <Avondlicht />
      <Camera pos={[0.3, 1.0, 2.6]} kijk={[0.1, 0.75, 0]} fov={36} />
      <Grond kleur="#7A6A54" />
      {[-1, 1].map((k) => <Blok key={k} p={[k * 2.6, 3, -1.5]} s={[2, 6, 5]} c={k > 0 ? '#B8906A' : '#C9A27A'} />)}
      <Blok p={[0, 3, -4.5]} s={[4, 6, 1]} c="#A88060" />
      <Figuur kleding={AURELIA} haar="lang" position={[-0.9, 0, -1.0]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.4 }} />
      <Figuur kleding={CAESAR_JONG} position={[0.2, 0, 0.2]} rotation={[0, 0.1, 0]} scale={0.45} pose={{ wenk: 1, mond: 'open', armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, -1.0] }, armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 1.0] } }} />
    </Helft>
    <Helft links={false} focus={[0, 2.2, 0]}>
      <Lucht boven="#8DB6DA" horizon="#EFE3CC" />
      <Zon position={[-14, 10, -90]} grootte={10} kleur="#FFF0C0" />
      <Daglicht zon={[6, 12, 8]} kracht={2.0} />
      <Camera pos={[-0.2, 2.15, 4.8]} kijk={[-0.25, 2.25, 0]} fov={36} />
      <Grond kleur="#D8CCB4" />
      {[-3.2, 3.2].map((x) => <Zuil key={x} position={[x, 0, -3]} h={7} />)}
      <Leger rijen={2} kolommen={12} position={[0, 0, -10]} />
      <Figuur kleding={TOGA_TRIOMF} hoofddeksel="krans" position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ wenk: 0.7, armR: { schouder: [-2.9, 0, -0.15], elleboog: [0, -0.2] } }} />
      {[-1.4, 1.5].map((x, i) => (
        <group key={x} position={[x, 0, 1.2]} rotation={[0, x > 0 ? -2.6 : 2.6, 0]}>
          <Figuur kleding={SENATOR} haar={i ? 'grijs' : 'kort'} pose={{ armR: { schouder: [-2.4, 0, -0.1], elleboog: [0, -0.3] }, wenk: 1 }} inHand={<Dolk />} />
        </group>
      ))}
      <pointLight position={[0.6, 3.4, 1.6]} intensity={4} distance={4} color="#FFE08A" />
    </Helft>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#FFF4E0" strokeWidth="14" />
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#1A120A" strokeWidth="4" />
    </svg>
    <Label tekst="AGE 0" x={70} y={40} kleur="#FFFFFF" rot={-4} />
    <Label tekst="DICTATOR" x={1130} y={40} kleur="#F2C25A" rot={-3} />
    <div style={{ position: 'absolute', left: 80, bottom: 46, fontFamily: SERIF, fontStyle: 'italic', fontSize: 60, color: '#FFF4E0', textShadow: '0 4px 14px rgba(0,0,0,0.9)' }}>born broke in the backstreets of Rome</div>
    {void CAESAR}
  </AbsoluteFill>
);
