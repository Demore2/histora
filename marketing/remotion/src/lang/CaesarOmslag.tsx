import { ThreeCanvas } from '@remotion/three';
import { createContext, useContext, type ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT } from '../sjabloon/theme';
import { ARMEN_GEKRUIST, Blok, Figuur, KHALID, KHALID_JONG, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, type V3 } from '../watals/Figuur';
import { Avondlicht, Binnenlicht, Camera, Daglicht, Duinen, Fakkel, Grond, Leger, Lucht, Nachtlicht, Scherpte, Zon, Zuil } from '../watals/Decor';
import { CAESAR_JONG, TOGA_TRIOMF } from './CaesarScenes';
import { Driekleur } from './LangDecor';
import { SALADIN, YUSUF } from './SaladinScenes';
import { Baby, Falanx, LEONIDAS, Spartaan, Wieg } from './LeonidasKit';
import { Baibars, Eskadron, LeeuwVaandel, NekBordje } from './BaibarsKit';

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

/**
 * Smal = de 9:16-variant voor YouTube Shorts: die knipt de omslag tot het middelste 9:16-vlak (x 656-1264 van 1920),
 * nog smaller dan 3:4. Dan schuiven de woorden naar binnen en worden ze kleiner. Render met --scale=1.7778 en knip
 * 1080x1920 uit het midden.
 */
const Smal = createContext(false);

/**
 * Staand = de echte Reel-omslag (1080x1920). Instagram neemt een omslag als 9:16 en toont in het profielraster het
 * 3:4-midden daarvan (y 240-1680); TikTok doet hetzelfde. Dus: een volle 9:16-afbeelding waarin woorden en gezichten
 * binnen dat midden staan, en boven en onder alleen achtergrond. Twee banden van 1080x1000 met een schuine naad op ~960.
 */
const Staand = createContext(false);

const BandStaand = ({ boven, children, focus }: { boven: boolean; children: ReactNode; focus: V3 }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: boven ? 0 : 920,
      width: 1080,
      height: 1000,
      clipPath: boven ? 'polygon(0 0, 1080px 0, 1080px 940px, 0 1000px)' : 'polygon(0 60px, 1080px 0, 1080px 1000px, 0 1000px)',
    }}
  >
    <ThreeCanvas width={1080} height={1000} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
      {children}
      <Scherpte focus={focus} sterkte={3} />
    </ThreeCanvas>
  </div>
);

const StapelStaand = ({ boven, onder, woordBoven, woordOnder, focusOnder, kijkOnder }: { boven: ReactNode; onder: ReactNode; woordBoven: string; woordOnder: string; focusOnder: V3; kijkOnder: number }) => (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <BandStaand boven focus={[0.2, 0.92, 0.2]}>
      <Camera pos={[0.2, 0.98, 2.3]} kijk={[0.2, 1.06, 0.2]} fov={30} />
      {boven}
    </BandStaand>
    <BandStaand boven={false} focus={focusOnder}>
      {onder}
      <Camera pos={[0, kijkOnder, 3.45]} kijk={[0, kijkOnder, 0]} fov={30} />
    </BandStaand>
    <svg width="1080" height="1920" style={{ position: 'absolute', inset: 0 }}>
      <line x1="0" y1="980" x2="1080" y2="920" stroke="#FFF4E0" strokeWidth="12" />
      <line x1="0" y1="980" x2="1080" y2="920" stroke="#1A120A" strokeWidth="3" />
    </svg>
    <Boos x={700} y={540} maat={120} />
    <Label tekst={woordBoven} top={262} links={60} kleur="#FFFFFF" rot={-4} maat={120} />
    <Label tekst={woordOnder} top={880} kleur="#FF5436" rot={-3} maat={Math.min(140, Math.floor(1000 / woordOnder.length))} />
  </AbsoluteFill>
);

/** Gedeelde opbouw: boven het kind (vaste camera, kind op schaal 0,45), onder de held, labels en boos-teken in de strook. */
const Stapel = ({ boven, onder, woordBoven, woordOnder, focusOnder = [0, 2.1, 0], kijkOnder = 1.98 }: { boven: ReactNode; onder: ReactNode; woordBoven: string; woordOnder: string; focusOnder?: V3; kijkOnder?: number }) => {
  const smal = useContext(Smal);
  const staand = useContext(Staand);
  if (staand) return <StapelStaand boven={boven} onder={onder} woordBoven={woordBoven} woordOnder={woordOnder} focusOnder={focusOnder} kijkOnder={kijkOnder} />;
  return (
  <AbsoluteFill style={{ background: '#1A120A' }}>
    <Band boven focus={[0.2, 0.95, 0.2]}>
      <Camera pos={[0.2, 0.92, 1.85]} kijk={[0.2, smal ? 1.07 : 0.95, 0.2]} fov={30} />
      {boven}
    </Band>
    <Band boven={false} focus={focusOnder}>
      {onder}
    </Band>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      <line x1="0" y1="560" x2="1920" y2="520" stroke="#FFF4E0" strokeWidth="12" />
      <line x1="0" y1="560" x2="1920" y2="520" stroke="#1A120A" strokeWidth="3" />
    </svg>
    <Boos x={smal ? 1095 : 1085} y={smal ? 265 : 175} maat={smal ? 100 : 115} />
    <Label tekst={woordBoven} top={smal ? 104 : 28} links={smal ? 676 : 590} kleur="#FFFFFF" rot={-4} maat={smal ? 78 : 96} />
    <Label tekst={woordOnder} top={smal ? 490 : 478} kleur="#FF5436" rot={-3} maat={smal ? Math.min(100, Math.floor(600 / woordOnder.length)) : Math.min(108, Math.floor(864 / woordOnder.length))} />
  </AbsoluteFill>
  );
};

export const CaesarOmslagSmal = () => <Smal.Provider value><CaesarOmslag /></Smal.Provider>;
export const SaladinOmslagSmal = () => <Smal.Provider value><SaladinOmslag /></Smal.Provider>;
export const NapoleonOmslagSmal = () => <Smal.Provider value><NapoleonOmslag /></Smal.Provider>;

export const CaesarReel = () => <Staand.Provider value><CaesarOmslag /></Staand.Provider>;
export const SaladinReel = () => <Staand.Provider value><SaladinOmslag /></Staand.Provider>;
export const NapoleonReel = () => <Staand.Provider value><NapoleonOmslag /></Staand.Provider>;
export const KhalidReel = () => <Staand.Provider value><KhalidOmslag /></Staand.Provider>;
export const LeonidasReel = () => <Staand.Provider value><LeonidasOmslag /></Staand.Provider>;
export const BaibarsReel = () => <Staand.Provider value><BaibarsOmslag /></Staand.Provider>;

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
    kijkOnder={2.1}
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

/**
 * Khalid ibn al-Walid (What-if-short, Instagram/TikTok): boven het kind in een woestijntent, onder de veldheer voor zijn
 * leger ("UNDEFEATED": nooit een veldslag verloren). Bewust zonder zwaard in beeld en zonder heilige plaatsen.
 */
export const KhalidOmslag = () => (
  <Stapel
    woordBoven="AGE 0"
    woordOnder="UNDEFEATED"
    boven={
      <>
        <Lucht boven="#F3D9B0" horizon="#F3D9B0" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#C9A070" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#D8B482" />
        {[-0.9, -0.45, 0.85, 1.3].map((x) => <Blok key={x} p={[x, 1.5, -0.97]} s={[0.18, 3, 0.04]} c="#A3261F" />)}
        <Figuur kleding={KHALID_JONG} hoofddeksel="tulband" position={[0.2, 0, 0.2]} scale={0.45} pose={{ wenk: 1, mond: 'open' }} />
      </>
    }
    onder={
      <>
        <fog attach="fog" args={['#E8A468', 20, 120]} />
        <Lucht boven="#4E3A6A" horizon="#F4A35A" />
        <Zon position={[-16, 4, -90]} grootte={16} kleur="#FFD08A" />
        <Daglicht zon={[-6, 8, 8]} kleur="#FFC890" kracht={2.2} />
        <Camera pos={[0, 2.05, 3.45]} kijk={[0, 2.15, 0]} fov={30} />
        <Grond kleur="#D9A866" />
        <Duinen kleur="#C9925A" z={-22} />
        <Leger rijen={2} kolommen={12} position={[0, 0, -9]} kleur="#E2D6BC" schild="#8A6A44" />
        <Figuur kleding={KHALID} hoofddeksel="tulband" baard position={[0, 0, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Leonidas: boven de boze baby in zijn wieg (Spartaans huis, raam met bergen), onder de koning met de dwarse kam bij zonsondergang. */
export const LeonidasOmslag = () => (
  <Stapel
    woordBoven="AGE 0"
    woordOnder="300"
    boven={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#B08A62" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#E7C79C" />
        <Raam />
        <Wieg position={[0.2, 0, 0.0]} label={false}>
          <Baby position={[0, 0, 0.12]} boos={1} />
        </Wieg>
      </>
    }
    onder={
      <>
        <Lucht boven="#C94A2E" horizon="#FFC36A" />
        <Zon position={[-16, 4, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[0, 2.05, 3.45]} kijk={[0, 2.12, 0]} fov={30} />
        <Grond kleur="#C9A070" />
        <Falanx rijen={2} kolommen={12} position={[0, 0, -7]} />
        <Spartaan kleding={LEONIDAS} koning speer={false} schild={false} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);

/** Baibars: boven de boze slavenjongen (AGE 14), onder de sultan met het leeuwenvaandel bij zonsondergang. */
export const BaibarsOmslag = () => (
  <Stapel
    woordBoven="AGE 14"
    woordOnder="SULTAN"
    boven={
      <>
        <Lucht boven="#F3E2C4" horizon="#F3E2C4" />
        <Daglicht zon={[3, 6, 6]} kracht={1.6} omgeving={1.5} />
        <Grond kleur="#CDB48A" />
        <Blok p={[0, 3, -1.2]} s={[8, 6, 0.4]} c="#E2D2AE" />
        <Blok p={[-0.55, 1.45, -0.98]} s={[0.6, 0.8, 0.05]} c="#5A3B24" />
        <Blok p={[-0.55, 1.95, -0.7]} s={[0.9, 0.04, 0.55]} r={[0.3, 0, 0]} c="#3E6B8A" />
        <Baibars leeftijd="kind" scale={0.45} position={[0.2, 0, 0.2]} rotation={[0, 0.12, 0]} pose={{ wenk: 1, mond: 'open' }} extra={<NekBordje tekst="DAMAGED|GOODS" y={1.18} />} />
      </>
    }
    onder={
      <>
        <Lucht boven="#C94A2E" horizon="#FFC36A" />
        <Zon position={[-12, 6, -90]} grootte={16} kleur="#FFE9A8" />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Camera pos={[0, 2.05, 3.45]} kijk={[0, 2.12, 0]} fov={30} />
        <Grond kleur="#C9A070" />
        <Eskadron rijen={2} kolommen={10} position={[0, 0, -8]} />
        <LeeuwVaandel position={[-1.9, 0, -4.6]} t={0.4} h={4.6} />
        <Baibars leeftijd="sultan" rotation={[0, -0.12, 0]} pose={{ wenk: 0.8 }} />
        <pointLight position={[0.6, 3.0, 1.6]} intensity={4} distance={4} color="#FFE08A" />
      </>
    }
  />
);
