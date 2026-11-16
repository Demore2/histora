import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Avondlicht, Binnenlicht, Camera, Daglicht, Grond, Leger, Lucht, Scherpte, Zon } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, SCHOLIER, wijs, type V3 } from '../watals/Figuur';
import { Driekleur } from './LangDecor';

/**
 * Staande omslag (1080x1920) voor TikTok/Reels: boven de gepeste jongen, onder de keizer, schuine knip.
 * Alles wat telt staat binnen het 3:4-midden (y 240-1680), want TikTok toont in het profiel alleen dat.
 */
const Vlak = ({ boven, children, focus }: { boven: boolean; children: ReactNode; focus: V3 }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: boven ? 0 : 880,
      width: 1080,
      height: 1040,
      clipPath: boven ? 'polygon(0 0, 1080px 0, 1080px 940px, 0 1040px)' : 'polygon(0 100px, 1080px 0, 1080px 1040px, 0 1040px)',
    }}
  >
    <ThreeCanvas width={1080} height={1040} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      {children}
      <Scherpte focus={focus} sterkte={3} />
    </ThreeCanvas>
  </div>
);

const Label = ({ tekst, top, kleur, rot }: { tekst: string; top: number; kleur: string; rot: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top,
      textAlign: 'center',
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: 150,
      color: kleur,
      WebkitTextStroke: '11px #1A120A',
      paintOrder: 'stroke fill',
      transform: `rotate(${rot}deg)`,
      filter: 'drop-shadow(0 8px 0 rgba(0,0,0,0.45))',
    }}
  >
    {tekst}
  </div>
);

export const NapoleonThumbStaand = () => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Vlak boven focus={[0, 1.3, 0]}>
      <Lucht boven="#9EC1DB" horizon="#EADFC6" />
      <Camera pos={[0.2, 1.3, 3.4]} kijk={[0.05, 1.74, 0]} fov={38} />
      <Daglicht zon={[-5, 10, 8]} kracht={2.0} />
      <Grond kleur="#B7A88A" />
      <Blok p={[0, 3, -3]} s={[14, 6, 0.4]} c="#D9CDB6" />
      {[-2.4, 0, 2.4].map((x) => <Blok key={x} p={[x, 2.4, -2.78]} s={[1.0, 1.5, 0.04]} c="#4A5A6A" />)}
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#6B4A30', haar: '#C9A050' }} position={[-0.95, 0, -1.0]} rotation={[0, 0.7, 0]} scale={0.72} pose={{ armR: wijs(1.35), mond: 'lach' }} />
      <Figuur kleding={{ ...SCHOLIER, tuniek: '#3A5A3A' }} position={[1.0, 0, -1.2]} rotation={[0, -0.6, 0]} scale={0.7} pose={{ mond: 'lach' }} />
      <Figuur kleding={{ ...NAPOLEON, laarzen: undefined }} position={[0, 0, 0]} rotation={[0, 0.12, 0]} scale={0.72} pose={{ wenk: 1, mond: 'dicht', ...ARMEN_GEKRUIST }} />
    </Vlak>
    <Vlak boven={false} focus={[0, 2.2, 0]}>
      <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
      <Zon position={[-12, 6, -90]} grootte={14} kleur="#FFC07A" />
      <Camera pos={[-0.15, 1.55, 4.9]} kijk={[-0.15, 1.62, 0]} fov={38} />
      <Avondlicht />
      <Binnenlicht zon={[4, 8, 10]} kleur="#FFD8A8" />
      <Grond kleur="#4A3424" />
      <Leger tijd="1800" rijen={2} kolommen={12} position={[0, 0, -11]} />
      <Driekleur position={[1.3, 0, -1.4]} hoogte={4} />
      <Driekleur position={[-1.8, 0, -2.0]} hoogte={3.6} />
      <Figuur kleding={NAPOLEON_KROONMANTEL} position={[0, 0, 0]} rotation={[0, -0.12, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
      <group position={[0, 2.38, 0]} scale={1.15}>
        <Kroon />
      </group>
      <pointLight position={[0.6, 3.4, 1.6]} intensity={4} distance={4} color="#FFE08A" />
    </Vlak>
    <svg width="1080" height="1920" style={{ position: 'absolute', inset: 0 }}>
      <line x1="0" y1="1040" x2="1080" y2="880" stroke="#FFF4E0" strokeWidth="14" />
      <line x1="0" y1="1040" x2="1080" y2="880" stroke="#1A120A" strokeWidth="4" />
    </svg>
    <Label tekst="AGE 9" top={260} kleur="#FFFFFF" rot={-3} />
    <Label tekst="EMPEROR" top={1505} kleur="#F2C25A" rot={-3} />
  </AbsoluteFill>
);
