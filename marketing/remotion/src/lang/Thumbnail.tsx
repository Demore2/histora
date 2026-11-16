import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Avondlicht, Binnenlicht, Camera, Daglicht, Grond, Leger, Lucht, Scherpte, Zon } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, SCHOLIER, wijs, type V3 } from '../watals/Figuur';
import { SERIF } from './LangHud';
import { Driekleur } from './LangDecor';

/** Eén helft van een gesplitste thumbnail: eigen 3D-canvas, afgeknipt op een schuine lijn. */
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
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: 132,
      letterSpacing: 2,
      color: kleur,
      WebkitTextStroke: '10px #1A120A',
      paintOrder: 'stroke fill',
      transform: `rotate(${rot}deg)`,
      filter: 'drop-shadow(0 8px 0 rgba(0,0,0,0.45))',
    }}
  >
    {tekst}
  </div>
);

/** YouTube-thumbnail: links de gepeste jongen ("AGE 9"), rechts de keizer ("EMPEROR"), schuine knip ertussen. */
export const NapoleonThumb = () => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Helft links focus={[0, 1.3, 0]}>
      <Lucht boven="#9EC1DB" horizon="#EADFC6" />
      <Camera pos={[0.35, 1.35, 3.0]} kijk={[0.15, 1.3, 0]} fov={36} />
      <Daglicht zon={[-5, 10, 8]} kracht={2.0} />
      <Grond kleur="#B7A88A" />
      <Blok p={[0, 3, -3]} s={[14, 6, 0.4]} c="#D9CDB6" />
      {[-3, 0, 3].map((x) => <Blok key={x} p={[x, 2.2, -2.78]} s={[1.0, 1.5, 0.04]} c="#4A5A6A" />)}
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#6B4A30', haar: '#C9A050' }} position={[-1.15, 0, -1.2]} rotation={[0, 0.7, 0]} scale={0.72} pose={{ armR: wijs(1.35), mond: 'lach' }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#3A5A3A' }} position={[1.25, 0, -1.4]} rotation={[0, -0.6, 0]} scale={0.7} pose={{ mond: 'lach' }} />
      <Figuur kleding={{ ...NAPOLEON, laarzen: undefined }} position={[0, 0, 0]} rotation={[0, 0.15, 0]} scale={0.72} pose={{ wenk: 1, mond: 'dicht', ...ARMEN_GEKRUIST }} />
    </Helft>
    <Helft links={false} focus={[0, 2.2, 0]}>
      <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
      <Zon position={[-14, 4, -90]} grootte={14} kleur="#FFC07A" />
      <Camera pos={[-0.2, 2.15, 4.6]} kijk={[-0.25, 2.25, 0]} fov={36} />
      <Avondlicht />
      <Binnenlicht zon={[4, 8, 10]} kleur="#FFD8A8" />
      <Grond kleur="#4A3424" />
      <Leger tijd="1800" rijen={2} kolommen={12} position={[0, 0, -11]} />
      <Driekleur position={[1.4, 0, -1.4]} hoogte={4} />
      <Driekleur position={[-1.9, 0, -2.0]} hoogte={3.6} />
      <Figuur kleding={NAPOLEON_KROONMANTEL} position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
      <group position={[0, 2.38, 0]} scale={1.15}>
        <Kroon />
      </group>
      <pointLight position={[0.6, 3.4, 1.6]} intensity={4} distance={4} color="#FFE08A" />
    </Helft>
    {/* witte schuine rand tussen de helften */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 0, transparent 100%)' }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <line x1="1060" y1="0" x2="860" y2="1080" stroke="#FFF4E0" strokeWidth="14" />
        <line x1="1060" y1="0" x2="860" y2="1080" stroke="#1A120A" strokeWidth="4" />
      </svg>
    </div>
    <Label tekst="AGE 9" x={70} y={40} kleur="#FFFFFF" rot={-4} />
    <Label tekst="EMPEROR" x={1150} y={40} kleur="#F2C25A" rot={-3} />
    <div style={{ position: 'absolute', left: 80, bottom: 46, fontFamily: SERIF, fontStyle: 'italic', fontSize: 64, color: '#FFF4E0', textShadow: '0 4px 14px rgba(0,0,0,0.9)' }}>
      mocked at school
    </div>
  </AbsoluteFill>
);
