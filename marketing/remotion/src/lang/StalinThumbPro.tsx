import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { Camera, Grond, Lucht, Scherpte, Zon } from '../watals/Decor';
import { Figuur } from '../watals/Figuur';
import { Colonne, Kremlin, RodeVlag } from '../watals/WatAlsStalin';
import { STALIN_P } from './StalinKit';

/**
 * Thumbnail Stalin, in de "designer"-opzet van BaldwinThumbPro (27 nov, eigenaar: "dat wonderschone ding van Baldwin").
 * Eén focuspunt: Stalin groot links met pijp, randlicht van een winterse zonsondergang achter het Kremlin.
 * Tekst = het contrast van zijn leven: SHOEMAKER'S SON (label) → RULED 1/6 OF EARTH. Sneeuw, grading en vignet als 2D-lagen.
 */

const Sneeuw = () => (
  <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.8 }}>
    {Array.from({ length: 90 }, (_, i) => {
      const x = (i * 263) % 1920;
      const y = (i * 151) % 1080;
      const r = 1.8 + ((i * 7) % 5) * 1.0;
      return <circle key={i} cx={x} cy={y} r={r} fill="#FFF4E8" opacity={0.3 + ((i * 3) % 7) / 12} />;
    })}
  </svg>
);

const Woord = ({ tekst, kleur, maat, top, right, rot = -3, rand = 14 }: { tekst: string; kleur: string; maat: number; top: number; right: number; rot?: number; rand?: number }) => (
  <div
    style={{
      position: 'absolute', top, right, fontFamily: FONT, fontWeight: 900, fontSize: maat, lineHeight: 0.9, letterSpacing: -2, color: kleur,
      WebkitTextStroke: `${rand}px #120A06`, paintOrder: 'stroke fill', transform: `rotate(${rot}deg)`,
      textShadow: '0 10px 0 #120A06, 0 18px 30px rgba(0,0,0,0.55)', whiteSpace: 'nowrap',
    }}
  >
    {tekst}
  </div>
);

export const StalinThumbPro = () => (
  <AbsoluteFill style={{ background: '#140A0A' }}>
    <ThreeCanvas width={1920} height={1080} shadows="soft" gl={{ antialias: true }} camera={{ fov: 30, near: 0.2, far: 500 }}>
      <Lucht boven="#2A1A34" horizon="#FF8A4A" onder="#2A1412" />
      <Zon position={[-2, 11, -70]} grootte={13} kleur="#FFD8A0" />
      <hemisphereLight args={['#FFA878', '#1E1620', 0.5]} />
      {/* key: van voren-links, iets koel */}
      <directionalLight position={[-3, 4, 6]} intensity={1.4} color="#FFE2D0" />
      {/* randlicht: de zon achter zijn hoofd */}
      <pointLight position={[-1.6, 2.8, -1.6]} intensity={24} distance={6} color="#FF8A3A" />
      <pointLight position={[1.2, 2.6, -1.4]} intensity={12} distance={5} color="#FF6A4A" />
      <Camera pos={[0.55, 1.78, 4.1]} kijk={[0.78, 1.86, 0]} fov={30} />
      <Grond kleur="#C9BEB4" />
      {/* Rode Plein: Kremlinmuur, vlaggen en een colonne in de verte */}
      <Kremlin position={[26, 0, -34]} lengte={60} />
      <Colonne z={-18} n={14} x0={3} />
      {[0, 1, 2, 3].map((i) => <RodeVlag key={i} position={[3.5 + i * 3.6, 0, -12 - i * 2.5]} t={i * 0.7} h={5.2} />)}
      <fog attach="fog" args={['#E0906A', 12, 70]} />
      {/* Stalin */}
      <Figuur
        {...STALIN_P}
        position={[0, 0, 0]}
        rotation={[0, 0.22, 0]}
        pose={{ wenk: 0.7, hoofd: [-0.05, 0.1, 0], armR: { schouder: [-0.35, 0, -0.25], elleboog: [0, -0.3] }, armL: { schouder: [0.15, 0, 0.12], elleboog: [0, 0] } }}
      />
      <Scherpte focus={[0, 2.0, 0]} sterkte={2.2} />
    </ThreeCanvas>
    {/* grading: koud-warme toon, donkere randen, focus op het gezicht */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(20,6,6,0) 0%, rgba(20,6,6,0) 45%, rgba(30,8,8,0.4) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 75% at 30% 45%, rgba(0,0,0,0) 45%, rgba(10,3,3,0.78) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,60,40,0.08)', mixBlendMode: 'overlay' }} />
    <Sneeuw />
    {/* tekst */}
    <Woord tekst="RULED" kleur="#FFFFFF" maat={150} top={90} right={230} />
    <Woord tekst="1/6" kleur="#FF4A2E" maat={400} top={230} right={150} rand={16} />
    <Woord tekst="OF EARTH" kleur="#FFFFFF" maat={150} top={610} right={90} />
    <div
      style={{
        position: 'absolute', left: 300, bottom: 70, padding: '14px 34px', background: '#FFD15A', borderRadius: 18, border: '7px solid #120A06',
        fontFamily: FONT, fontWeight: 900, fontSize: 76, color: '#120A06', transform: 'rotate(-4deg)', boxShadow: '0 10px 0 #120A06', whiteSpace: 'nowrap',
      }}
    >
      SHOEMAKER'S SON
    </div>
  </AbsoluteFill>
);
