import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, type V3 } from '../watals/Figuur';
import { Avondlicht, Binnenlicht, Camera, Daglicht, Duinen, Fakkel, Grond, Leger, Lucht, Nachtlicht, Scherpte, Zon, Zuil } from '../watals/Decor';
import { CAESAR_JONG, TOGA_TRIOMF } from './CaesarScenes';
import { Driekleur } from './LangDecor';
import { SALADIN, YUSUF } from './SaladinScenes';

/**
 * Staande omslagen voor Instagram/TikTok, in de eerste frames van de 16:9-video. Die apps knippen er een 3:4-vlak uit het
 * midden uit (x 555-1365 van 1920), dus alles wat telt staat gestapeld in die strook: boven het boze kind, onder de held
 * met één woord, zoals Born in Lore. De brede YouTube-thumbnails zijn CaesarThumb / SaladinThumb / NapoleonThumb.
 * Losse 1080x1440-afbeelding: render met --scale=1.3334 en knip het midden uit.
 */
const Band = ({ boven, children, focus }: { boven: boolean; children: ReactNode; focus: V3 }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: boven ? 0 : 500,
      width: 1920,
      height: 580,
      clipPath: boven ? 'polygon(0 0, 1920px 0, 1920px 540px, 0 580px)' : 'polygon(0 40px, 1920px 0, 1920px 580px, 0 580px)',
    }}
  >
    <ThreeCanvas width={1920} height={580} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      {children}
      <Scherpte focus={focus} sterkte={3} />
    </ThreeCanvas>
  </div>
);

const Label = ({ tekst, top, kleur, rot, maat, links }: { tekst: string; top: number; kleur: string; rot: number; maat: number; links?: number }) => (
  <div style={{ position: 'absolute', left: links ?? 0, right: links === undefined ? 0 : undefined, top, textAlign: links === undefined ? 'center' : 'left', fontFamily: FONT, fontWeight: 900, fontSize: maat, color: kleur, WebkitTextStroke: '9px #1A120A', paintOrder: 'stroke fill', transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 7px 0 rgba(0,0,0,0.45))' }}>
    {tekst}
  </div>
);

const Boos = ({ x, y, maat }: { x: number; y: number; maat: number }) => (
  <svg width={maat} height={maat} viewBox="-50 -50 100 100" style={{ position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.35))' }}>
    {['#1A120A', '#E8382B'].map((k, j) =>
      [0, 90, 180, 270].map((r) => <path key={`${j}${r}`} transform={`rotate(${r})`} d="M 8 -40 Q 10 -12 40 -8" fill="none" stroke={k} strokeWidth={j ? 11 : 20} strokeLinecap="round" />),
    )}
  </svg>
);

/** Gedeelde opbouw: boven het kind (vaste camera, kind op schaal 0,45), onder de held, labels en boos-teken in de strook. */
const Stapel = ({ boven, onder, woordBoven, woordOnder, focusOnder = [0, 2.1, 0] }: { boven: ReactNode; onder: ReactNode; woordBoven: string; woordOnder: string; focusOnder?: V3 }) => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Band boven focus={[0.2, 0.95, 0.2]}>
      <Camera pos={[0.2, 0.92, 1.85]} kijk={[0.2, 0.95, 0.2]} fov={30} />
      {boven}
    </Band>
    <Band boven={false} focus={focusOnder}>
      {onder}
    </Band>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <line x1="0" y1="560" x2="1920" y2="520" stroke="#FFF4E0" strokeWidth="12" />
      <line x1="0" y1="560" x2="1920" y2="520" stroke="#1A120A" strokeWidth="3" />
    </svg>
    <Boos x={1085} y={175} maat={115} />
    <Label tekst={woordBoven} top={28} links={590} kleur="#FFFFFF" rot={-4} maat={96} />
    <Label tekst={woordOnder} top={478} kleur="#FF5436" rot={-3} maat={108} />
  </AbsoluteFill>
);

const Raam = ({ x = -0.35, glas = '#9FD0EE' }: { x?: number; glas?: string }) => (
  <>
    <Blok p={[x, 1.1, -0.95]} s={[0.6, 0.6, 0.05]} c="#8A5A32" />
    <Blok p={[x, 1.1, -0.92]} s={[0.5, 0.5, 0.05]} c={glas} />
    <Blok p={[x, 1.1, -0.88]} s={[0.04, 0.5, 0.04]} c="#8A5A32" />
    <Blok p={[x, 1.1, -0.88]} s={[0.5, 0.04, 0.04]} c="#8A5A32" />
  </>
);

export const CaesarOmslag = () => (
  <Stapel
    woordBoven="AGE 0"
    woordOnder="DICTATOR"
    boven={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#B08A62" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#E7C79C" />
        <Raam />
        <Figuur kleding={CAESAR_JONG} position={[0.2, 0, 0.2]} scale={0.45} pose={{ wenk: 1, mond: 'open' }} />
      </>
    }
    onder={
      <>
        <Lucht boven="#C94A2E" horizon="#FFC36A" />
        <Zon position={[-16, 4, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[0, 2.05, 3.45]} kijk={[0, 2.12, 0]} fov={30} />
        <Grond kleur="#D8B88A" />
        {[-3.6, 3.6].map((x) => <Zuil key={x} position={[x, 0, -3]} h={7} />)}
        <Leger rijen={2} kolommen={12} position={[0, 0, -10]} />
        <Figuur kleding={TOGA_TRIOMF} hoofddeksel="krans" position={[0, 0, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Saladin: het kind in de nacht van de vlucht (fakkel, blauwe nacht), onder de sultan voor de muren van Jeruzalem. */
export const SaladinOmslag = () => (
  <Stapel
    woordBoven="AGE 0"
    woordOnder="SULTAN"
    boven={
      <>
        <Lucht boven="#1C2A4A" horizon="#3A5080" />
        <Nachtlicht />
        <hemisphereLight args={['#9DB4E0', '#3A2A20', 0.9]} />
        <Grond kleur="#6A5A44" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#7A6A58" />
        <Raam glas="#2A3A66" />
        <Fakkel position={[1.05, 0, -0.75]} />
        <pointLight position={[0.9, 1.0, -0.3]} intensity={2.2} distance={2.2} color="#FFA850" />
        <pointLight position={[0.45, 0.95, 0.9]} intensity={2.4} distance={2.5} color="#FFC890" />
        <Figuur kleding={YUSUF} hoofddeksel="tulband" position={[0.2, 0, 0.2]} scale={0.45} pose={{ wenk: 1, mond: 'open' }} />
      </>
    }
    onder={
      <>
        <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
        <Zon position={[-16, 4, -90]} grootte={16} kleur="#FFC07A" />
        <Avondlicht />
        <Daglicht zon={[4, 10, 10]} kracht={1.2} />
        <Camera pos={[0, 2.05, 3.45]} kijk={[0, 2.15, 0]} fov={30} />
        <Grond kleur="#B8986A" />
        <Duinen kleur="#A8865A" />
        <Blok p={[0, 3, -16]} s={[30, 6, 2]} c="#CDB894" />
        <Leger rijen={2} kolommen={12} kleur="#E2D6BC" schild="#C99A2E" position={[0, 0, -9]} />
        <Figuur kleding={SALADIN} hoofddeksel="tulband" baard position={[0, 0, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.6 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Napoleon: de gepeste scholier van negen voor een schoolbord, onder de keizer met kroon en driekleuren. */
export const NapoleonOmslag = () => (
  <Stapel
    woordBoven="AGE 9"
    woordOnder="EMPEROR"
    focusOnder={[0, 2.2, 0]}
    boven={
      <>
        <Lucht boven="#9EC1DB" horizon="#EADFC6" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#B7A88A" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#D9CDB6" />
        <Blok p={[-0.45, 1.05, -0.97]} s={[0.75, 0.45, 0.04]} c="#3A4A3A" />
        <Raam x={0.95} />
        <Figuur kleding={{ ...NAPOLEON, laarzen: undefined }} position={[0.2, 0, 0.2]} scale={0.45} pose={{ wenk: 1, mond: 'dicht' }} />
      </>
    }
    onder={
      <>
        <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
        <Zon position={[-16, 4, -90]} grootte={16} kleur="#FFC07A" />
        <Avondlicht />
        <Binnenlicht zon={[4, 8, 10]} kleur="#FFD8A8" />
        <Camera pos={[0, 2.15, 3.75]} kijk={[0, 2.4, 0]} fov={30} />
        <Grond kleur="#4A3424" />
        <Leger tijd="1800" rijen={2} kolommen={12} position={[0, 0, -11]} />
        <Driekleur position={[1.5, 0, -1.6]} hoogte={4} />
        <Driekleur position={[-1.9, 0, -2.0]} hoogte={3.6} />
        <Figuur kleding={NAPOLEON_KROONMANTEL} position={[0, 0, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
        <group position={[0, 2.38, 0]} scale={1.15}>
          <Kroon />
        </group>
        <pointLight position={[0.6, 3.2, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);
