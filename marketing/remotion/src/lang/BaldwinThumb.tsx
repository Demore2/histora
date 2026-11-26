import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Banier, Camera, Grond, Heuvels, Leger, Lucht, Paard, Scherpte, Zon } from '../watals/Decor';
import { Blok, Figuur, Zwaard } from '../watals/Figuur';
import { BLAUW, BW, GOUD_VLAG } from '../watals/WatAlsBaldwin';
import { SALADIN } from './SaladinScenes';

/**
 * Thumbnail Baldwin IV, "designer"-versie (26 nov, eigenaar: de split AGE/WOORD is te goedkoop).
 * Eén focuspunt: de jonge koning groot links, randlicht van de ondergaande zon, verbonden hand om het zwaard.
 * Rechts in stof en tegenlicht Saladins leger. Tekst = het contrast van Montgisard: 375 VS 26,000, plus AGE 16.
 * Kleurgrading, vignet en stofdeeltjes als 2D-lagen erover.
 */

const Stof = () => (
  <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0.55 }}>
    {Array.from({ length: 70 }, (_, i) => {
      const x = (i * 263) % 1920;
      const y = (i * 151) % 1080;
      const r = 1.5 + ((i * 7) % 5) * 0.8;
      return <circle key={i} cx={x} cy={y} r={r} fill="#FFD9A0" opacity={0.25 + ((i * 3) % 7) / 14} />;
    })}
  </svg>
);

const Getal = ({ tekst, kleur, maat, top, right, rot = -3 }: { tekst: string; kleur: string; maat: number; top: number; right: number; rot?: number }) => (
  <div
    style={{
      position: 'absolute', top, right, fontFamily: FONT, fontWeight: 900, fontSize: maat, lineHeight: 0.9, letterSpacing: -2, color: kleur,
      WebkitTextStroke: '14px #120A06', paintOrder: 'stroke fill', transform: `rotate(${rot}deg)`,
      textShadow: '0 10px 0 #120A06, 0 18px 30px rgba(0,0,0,0.55)',
    }}
  >
    {tekst}
  </div>
);

export const BaldwinThumbPro = () => (
  <AbsoluteFill style={{ background: '#1A0E08' }}>
    <ThreeCanvas width={1920} height={1080} shadows="soft" gl={{ antialias: true }} camera={{ fov: 30, near: 0.2, far: 500 }}>
      <Lucht boven="#3A1E3E" horizon="#FF9A4A" onder="#2A1410" />
      <Zon position={[-9, 3.2, -60]} grootte={11} kleur="#FFE2A0" />
      <hemisphereLight args={['#FFB878', '#2A1A20', 0.55]} />
      {/* key: koel, van voren-links */}
      <directionalLight position={[-3, 4, 6]} intensity={1.5} color="#FFE6D0" />
      {/* randlicht: de zon achter zijn hoofd */}
      <pointLight position={[-1.6, 2.8, -1.6]} intensity={22} distance={6} color="#FF9A3A" />
      <pointLight position={[1.2, 2.6, -1.4]} intensity={12} distance={5} color="#FFB45A" />
      <Camera pos={[0.55, 1.78, 4.1]} kijk={[0.78, 1.86, 0]} fov={30} />
      <Grond kleur="#9A6A44" />
      <Heuvels kleur="#7A5040" z={-80} />
      {/* Saladins leger, ver weg in stof */}
      {[0, 1, 2].map((i) => <Leger key={i} rijen={4} kolommen={14} kleur="#E2C8A0" schild={GOUD_VLAG} position={[5 + i * 9, 0, -24 - i * 6]} rotation={[0, -0.4, 0]} />)}
      {[0, 1, 2, 3, 4].map((i) => <Banier key={i} position={[3.5 + i * 3.2, 0, -19 - i * 2.5]} kleur={GOUD_VLAG} />)}
      <Paard position={[6.5, 0, -15]} rotation={[0, -0.9, 0]} kleur="#ECE6D8" dek={GOUD_VLAG} ruiter={<Figuur kleding={SALADIN} hoofddeksel="tulband" baard />} />
      <fog attach="fog" args={['#E89A60', 12, 60]} />
      {/* de koning */}
      {void BLAUW}
      <Figuur
        {...BW(1)}
        position={[0, 0, 0]}
        rotation={[0, 0.22, 0]}
        pose={{ wenk: 0.85, hoofd: [-0.05, 0.1, 0], armR: { schouder: [-0.45, 0, -0.4], elleboog: [0, -0.35] }, armL: { schouder: [-0.9, 0, 0.3], elleboog: [0, 1.1] } }}
        inHand={<group rotation={[0, 0, 0]}><Zwaard /></group>}
      />
      <Blok p={[0.0, 0.02, 0.6]} s={[0.01, 0.01, 0.01]} c="#000" />
      <Scherpte focus={[0, 2.0, 0]} sterkte={2.2} />
    </ThreeCanvas>
    {/* grading: warme toon, donkere randen, focus op het gezicht */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(20,8,4,0) 0%, rgba(20,8,4,0) 45%, rgba(30,10,6,0.35) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 75% at 30% 45%, rgba(0,0,0,0) 45%, rgba(10,4,2,0.75) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,140,60,0.08)', mixBlendMode: 'overlay' }} />
    <Stof />
    {/* tekst */}
    <Getal tekst="375" kleur="#FFFFFF" maat={250} top={70} right={120} />
    <div style={{ position: 'absolute', top: 340, right: 470, fontFamily: FONT, fontWeight: 900, fontSize: 92, color: '#FFD15A', WebkitTextStroke: '10px #120A06', paintOrder: 'stroke fill', transform: 'rotate(-3deg)', textShadow: '0 7px 0 #120A06' }}>VS</div>
    <Getal tekst="26,000" kleur="#FF4A2E" maat={250} top={440} right={60} />
    <div
      style={{
        position: 'absolute', left: 380, bottom: 70, padding: '14px 34px', background: '#FFD15A', borderRadius: 18, border: '7px solid #120A06',
        fontFamily: FONT, fontWeight: 900, fontSize: 86, color: '#120A06', transform: 'rotate(-4deg)', boxShadow: '0 10px 0 #120A06',
      }}
    >
      AGE 16
    </div>
  </AbsoluteFill>
);
