import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Avondlicht, Banier, Camera, Duinen, Fakkel, Grond, Kameel, Leger, Lucht, Nachtlicht, Scherpte, Zon } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, type V3 } from '../watals/Figuur';
import { SERIF } from './LangHud';
import { SALADIN, VROUW, YUSUF } from './SaladinScenes';

/** Thumbnail Saladin: links het vluchtende kind bij nacht ("REFUGEE"), rechts de sultan voor Jeruzalem ("SULTAN"). */
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

export const SaladinThumb = () => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Helft links focus={[0, 1.2, 0]}>
      <Lucht boven="#0A1020" horizon="#24345A" />
      <Nachtlicht />
      <Camera pos={[0.5, 1.3, 3.4]} kijk={[0.2, 1.2, 0]} fov={36} />
      <Grond kleur="#4A3E30" />
      <Blok p={[0, 2.5, -6]} s={[10, 5, 3]} c="#3A3A48" />
      <Fakkel position={[0.9, 0, 0.3]} />
      <pointLight position={[0.8, 1.8, 1.0]} intensity={8} distance={6} color="#FFA850" />
      <Kameel position={[-2.2, 0, -3.2]} rotation={[0, 1.2, 0]} />
      <Figuur kleding={VROUW} haar="lang" position={[-0.7, 0, -1.4]} rotation={[0, 0.4, 0]} scale={0.9} pose={{ wenk: -0.6 }} />
      <Figuur kleding={YUSUF} hoofddeksel="tulband" position={[0.2, 0, 0]} rotation={[0, 0.1, 0]} scale={0.6} pose={{ wenk: -0.9 }} />
    </Helft>
    <Helft links={false} focus={[0, 2.2, 0]}>
      <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
      <Zon position={[-14, 4, -90]} grootte={14} kleur="#FFC07A" />
      <Camera pos={[-0.2, 2.15, 4.8]} kijk={[-0.25, 2.25, 0]} fov={36} />
      <Avondlicht />
      <Grond kleur="#B8986A" />
      <Duinen kleur="#A8865A" />
      <Blok p={[0, 3, -16]} s={[30, 6, 2]} c="#CDB894" />
      <Leger rijen={2} kolommen={12} kleur="#E2D6BC" schild="#C99A2E" position={[0, 0, -9]} />
      <Banier position={[2.6, 0, -5]} kleur="#C99A2E" />
      <Banier position={[-3.2, 0, -6]} kleur="#ECE6D8" />
      <Figuur kleding={SALADIN} hoofddeksel="tulband" baard position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.6 }} />
      <pointLight position={[0.6, 3.4, 1.6]} intensity={4} distance={4} color="#FFE08A" />
    </Helft>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#FFF4E0" strokeWidth="14" />
      <line x1="1060" y1="0" x2="860" y2="1080" stroke="#1A120A" strokeWidth="4" />
    </svg>
    <Label tekst="REFUGEE" x={60} y={40} kleur="#FFFFFF" rot={-4} />
    <Label tekst="SULTAN" x={1200} y={40} kleur="#F2C25A" rot={-3} />
    <div style={{ position: 'absolute', left: 80, bottom: 46, fontFamily: SERIF, fontStyle: 'italic', fontSize: 60, color: '#FFF4E0', textShadow: '0 4px 14px rgba(0,0,0,0.9)' }}>fled the night he was born</div>
  </AbsoluteFill>
);
