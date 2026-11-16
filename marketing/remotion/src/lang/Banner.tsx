import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill } from 'remotion';
import { Camera, Daglicht, Lucht } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, CAESAR, CLEOPATRA, Figuur, KHALID, NAPOLEON, Phoxy, omhoog, wijs, Zwaard } from '../watals/Figuur';
import { SERIF } from './LangHud';

/**
 * YouTube-kanaalbanner 2560x1440. Alles wat telt staat in de veilige zone voor alle apparaten
 * (midden 1546x423, y 508-931): de titel in het midden, links en rechts de blokfiguren.
 * Op tv's zie je de hele afbeelding, op desktop een band van 2560x423.
 */
export const KanaalBanner = () => (
  <AbsoluteFill style={{ background: '#1C1A16' }}>
    <ThreeCanvas width={2560} height={1440} shadows="soft" gl={{ antialias: true }} camera={{ fov: 20, near: 0.3, far: 400 }}>
      <Lucht boven="#241A2E" horizon="#6A3A2A" />
      <Camera pos={[0, 1.45, 34]} kijk={[0, 1.2, 0]} fov={20} />
      <Daglicht zon={[-6, 10, 12]} kleur="#FFE0B8" kracht={2.2} omgeving={1.3} bereik={14} />
      <pointLight position={[0, 4, 8]} intensity={6} distance={30} color="#FFB070" />
      {/* lage stenen rand waar ze op staan */}
      <Blok p={[0, -0.25, 0]} s={[13.8, 0.5, 2.6]} c="#4F3A2A" />
      <Blok p={[0, 0.01, 0]} s={[13.2, 0.04, 2.4]} c="#6B4E36" />
      {/* links */}
      <Figuur kleding={CAESAR} hoofddeksel="krans" position={[-4.3, 0, 0]} rotation={[0, 0.45, 0]} pose={{ armR: wijs(1.3) }} />
      <Figuur kleding={CLEOPATRA} haar="bob" hoofddeksel="hoofdband" position={[-3.1, 0, 0.3]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach' }} />
      {/* rechts */}
      <Figuur kleding={NAPOLEON} hoofddeksel="steek" position={[3.2, 0, 0.3]} rotation={[0, -0.3, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.4 }} />
      <Figuur kleding={KHALID} hoofddeksel="tulband" baard position={[4.5, 0, 0]} rotation={[0, -0.45, 0]} pose={{ armR: wijs(1.2) }} inHand={<Zwaard />} />
      {/* de vos zwaait vanaf de rand */}
      <Phoxy position={[-5.5, 0, 0.6]} rotation={[0, 0.5, 0]} scale={0.8} pose={{ armR: omhoog() }} />
    </ThreeCanvas>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(10,6,2,0.55) 100%)' }} />
    <div style={{ position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center' }}>
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: 190,
          lineHeight: 0.95,
          background: 'linear-gradient(180deg, #FFE7A0 0%, #F2C25A 45%, #C9821E 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '4px #4A2A0C',
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.7))',
        }}
      >
        Histora
      </div>
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 58, color: '#FFF4E0', textShadow: '0 3px 14px rgba(0,0,0,0.85)', marginTop: 14 }}>
        What if you lived <span style={{ color: '#EE7A3E' }}>their</span> life?
      </div>
    </div>
  </AbsoluteFill>
);
