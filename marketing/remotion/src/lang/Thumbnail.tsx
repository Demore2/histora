import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill } from 'remotion';
import { Binnenlicht, Camera, Lucht, Scherpte } from '../watals/Decor';
import { ARMEN_GEKRUIST, Figuur, NAPOLEON } from '../watals/Figuur';
import { Kaarttafel } from './Kaarttafel';
import { SERIF } from './LangHud';
import { RIJK_1810 } from './NapoleonScenes2';

/** YouTube-thumbnail (1920x1080): Napoleon groot rechts, zijn rijk op de kaarttafel erachter, titel links. */
export const NapoleonThumb = () => (
  <AbsoluteFill style={{ background: '#1C1A16' }}>
    <ThreeCanvas width={1920} height={1080} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <directionalLight position={[6, 8, 12]} intensity={1.6} color="#FFE6C8" />
      <Camera pos={[2.6, 6.2, 12.5]} kijk={[1.6, 3.6, 0]} fov={36} />
      <Kaarttafel van={RIJK_1810} />
      <group position={[3.6, 0.5, 6.4]} rotation={[0, -0.35, 0]} scale={1.7}>
        <Figuur kleding={NAPOLEON} hoofddeksel="steek" pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
      </group>
      <Scherpte focus={[3.6, 3.6, 6.4]} sterkte={3} />
    </ThreeCanvas>
    <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(20,14,8,0.78) 0%, rgba(20,14,8,0.35) 45%, rgba(20,14,8,0) 65%)' }} />
    <div style={{ position: 'absolute', left: 90, top: 250 }}>
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: 230,
          lineHeight: 0.9,
          background: 'linear-gradient(180deg, #FFE7A0 0%, #F2C25A 45%, #C9821E 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '4px #4A2A0C',
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.7))',
        }}
      >
        NAPOLEON
      </div>
      <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 92, color: '#FFF4E0', textShadow: '0 4px 18px rgba(0,0,0,0.8)', marginTop: 10 }}>
        in <span style={{ color: '#EE7A3E' }}>5</span> minutes
      </div>
    </div>
  </AbsoluteFill>
);
