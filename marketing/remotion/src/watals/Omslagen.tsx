import { loadFont } from '@remotion/google-fonts/EBGaramond';
import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { Banier, Camera, Daglicht, Duinen, Grond, Leger, Lucht, Paard, Scherpte, Zon, Zuil, Avondlicht } from './Decor';
import { ARMEN_GEKRUIST, CAESAR, Figuur, KHALID, NAPOLEON, omhoog, wijs, Zwaard, type V3 } from './Figuur';
import { SALADIN } from '../lang/SaladinScenes';

/**
 * Omslagen voor de "What if"-video's: held in close-up in zijn eigen scène, titel groot bovenaan.
 * De titel staat binnen het 3:4-midden (y 240-1680), zodat het Instagram-raster hem niet afsnijdt.
 */

const { fontFamily: SERIF } = loadFont('normal', { weights: ['600', '800'], subsets: ['latin'] });

const Titel = ({ naam, grootte = 190 }: { naam: string; grootte?: number }) => (
  <div style={{ position: 'absolute', top: 268, left: 0, right: 0, textAlign: 'center', padding: '0 50px' }}>
    <div
      style={{
        fontFamily: SERIF,
        fontWeight: 600,
        fontSize: 64,
        letterSpacing: 6,
        color: '#FFF4E0',
        textShadow: '0 4px 18px rgba(0,0,0,0.75), 0 2px 3px rgba(0,0,0,0.8)',
      }}
    >
      WHAT IF YOU WERE
    </div>
    <div
      style={{
        fontFamily: SERIF,
        fontWeight: 800,
        fontSize: grootte,
        lineHeight: 0.95,
        marginTop: 6,
        background: 'linear-gradient(180deg, #FFE7A0 0%, #F2C25A 45%, #C9821E 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextStroke: '3px #4A2A0C',
        filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.65))',
      }}
    >
      {naam}
    </div>
  </div>
);

const Omslag = ({ naam, grootte, focus, children }: { naam: string; grootte?: number; focus: V3; children: ReactNode }) => (
  <AbsoluteFill style={{ background: '#1C1A16' }}>
    <ThreeCanvas width={1080} height={1920} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      {children}
      <Scherpte focus={focus} sterkte={3.5} />
    </ThreeCanvas>
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(20,14,8,0.55) 0%, rgba(20,14,8,0) 38%, rgba(20,14,8,0) 80%, rgba(20,14,8,0.45) 100%)' }} />
    <Titel naam={naam} grootte={grootte} />
  </AbsoluteFill>
);

export const OmslagKhalid = () => (
  <Omslag naam="KHALID?" focus={[0, 3.2, 0]}>
    <fog attach="fog" args={['#E8A468', 20, 120]} />
    <Lucht boven="#4E3A6A" horizon="#F4A35A" />
    <Zon position={[6, 4, -110]} grootte={16} kleur="#FFD08A" />
    <Camera pos={[1.2, 1.9, 5.0]} kijk={[0, 2.35, 0]} fov={36} />
    <Daglicht zon={[-6, 8, 8]} kleur="#FFC890" kracht={2.2} />
    <Grond kleur="#D9A866" />
    <Duinen kleur="#C9925A" z={-22} />
    <Banier position={[-2.3, 0, -3.2]} kleur="#141210" />
    <Leger rijen={2} kolommen={8} position={[1, 0, -8]} kleur="#E2D6BC" schild="#8A6A44" />
    <Figuur kleding={KHALID} hoofddeksel="tulband" baard position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ armR: { schouder: [-0.55, 0, -0.55], elleboog: [0, -0.2] }, wenk: 0.7 }} inHand={<Zwaard />} />
  </Omslag>
);

export const OmslagNapoleon = () => (
  <Omslag naam="NAPOLEON?" grootte={150} focus={[0, 2.1, 0]}>
    <fog attach="fog" args={['#D9C29A', 14, 90]} />
    <Lucht boven="#6E8FB8" horizon="#F0D2A0" />
    <Camera pos={[1.2, 1.9, 5.0]} kijk={[0, 2.35, 0]} fov={36} />
    <Daglicht zon={[-6, 10, 8]} kleur="#FFE0B8" kracht={2.2} />
    <Grond kleur="#8E9A62" />
    <Leger tijd="1800" rijen={3} kolommen={9} position={[0, 0, -8]} />
    <Banier position={[-1.9, 0, -2.4]} kleur="#1F3A6E" />
    <Banier position={[2.2, 0, -3.2]} kleur="#B3312B" />
    <Figuur kleding={NAPOLEON} hoofddeksel="steek" position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5 }} />
  </Omslag>
);

export const OmslagCaesar = () => (
  <Omslag naam="CAESAR?" focus={[0, 2.1, 0]}>
    <fog attach="fog" args={['#E8D6B4', 14, 90]} />
    <Lucht boven="#7FAED8" horizon="#F1DDB8" />
    <Camera pos={[1.2, 1.9, 5.0]} kijk={[0, 2.35, 0]} fov={36} />
    <Avondlicht />
    <Daglicht zon={[-6, 10, 8]} kleur="#FFE0B8" kracht={1.8} />
    <Grond kleur="#D8CCB4" />
    {[-3, 3, -5.5, 5.5].map((x, i) => <Zuil key={i} position={[x, 0, -3 - (i > 1 ? 3 : 0)]} h={7} />)}
    <Leger rijen={2} kolommen={8} position={[0, 0, -9]} />
    <Figuur kleding={CAESAR} hoofddeksel="krans" position={[0, 0, 0]} rotation={[0, 0.65, 0]} pose={{ armR: wijs(1.2), wenk: 0.4, hoofd: [0, -0.45, 0] }} />
  </Omslag>
);

export const OmslagSaladin = () => (
  <Omslag naam="SALADIN?" grootte={170} focus={[0, 3.2, 0]}>
    <fog attach="fog" args={['#E8A468', 20, 120]} />
    <Lucht boven="#4E3A6A" horizon="#F4A35A" />
    <Zon position={[-6, 4, -110]} grootte={16} kleur="#FFD08A" />
    <Camera pos={[1.2, 1.9, 5.0]} kijk={[0, 2.35, 0]} fov={36} />
    <Daglicht zon={[-6, 8, 8]} kleur="#FFC890" kracht={2.2} />
    <Grond kleur="#D9A866" />
    <Duinen kleur="#C9925A" z={-22} />
    <Banier position={[-3.6, 0, -6]} kleur="#C99A2E" />
    <Banier position={[2.4, 0, -4.2]} kleur="#ECE6D8" />
    <Leger rijen={2} kolommen={8} position={[1, 0, -8]} kleur="#E2D6BC" schild="#C99A2E" />
    <Figuur kleding={SALADIN} hoofddeksel="tulband" baard position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ armR: { schouder: [-0.55, 0, -0.55], elleboog: [0, -0.2] }, wenk: 0.5 }} inHand={<Zwaard />} />
  </Omslag>
);
