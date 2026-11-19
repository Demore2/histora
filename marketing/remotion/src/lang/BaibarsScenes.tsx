import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { Camera, Ketting, Paard, TekstVlak } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Kroon, omhoog, wijs, type V3 } from '../watals/Figuur';
import { ease, FPS, lin } from './basis';
import {
  Aydakin,
  B_STEPPE,
  B_VER,
  B_ZUID,
  Baibars,
  bk,
  Bord2D,
  bp,
  Brief,
  Cairo,
  Eskadron,
  Handelaar,
  Heuvelland,
  Joert,
  KaartB,
  KaartPijl,
  KOPER,
  Kist,
  Kruisboog,
  GevallenHelm,
  Leeuw,
  LeeuwVaandel,
  Lodewijk,
  Mameluk,
  Markt,
  MiniKaravaan,
  MiniRuiter,
  Mongool,
  MOEDER_K,
  Muntstapel,
  NekBordje,
  Nijl,
  OpPaard,
  Paleis,
  Ridder,
  Robert,
  Sabel,
  Schaap,
  Steppe,
  Straat,
  Strand,
  Weegschaal,
  Zamt,
  INSTRUCTEUR,
  Krokodil,
  KIPCHAK,
  Vaandel,
  Boog,
  Koker,
  Bontmuts,
  Malienkap,
  KroonOpHoofd,
} from './BaibarsKit';
import { B_1223, B_1237, B_1250, B_1258, opB } from './KaarttafelBaibars';
import { Zeilschip } from './LangDecor';
import { GroteTitel, JaarLabel, LangTeller } from './LangHud';
import { Baby, BoosTeken, FiguurL, Kat as KatK0, Pijllabel, Stempel, Streepjes, TelTeller, Wieg, Wolk, Zit, Zweet } from './LeonidasKit';

/**
 * Scènes voor "What if you were Baibars?" (lange video #05): teaser en hoofdstuk I-III (zin 0-38).
 * Eén scène per zin, zie werk/scratchboard.md. Geen bloed, geen lichamen; een val is een helm in het stof.
 */

const GOUD = '#E0A93A';

/* ================= teaser ================= */

/** Knal: Baibars te paard met zijn leeuwenvaandel, Mamelukken erachter, avondzon. */
export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.006 : 0;
  return (
    <Heuvelland tijd="avond" cam={[1.8 + schok, 2.4 + schok, 9.4, 1.6, 2.4, 8.4]} kijk={[0, 2.7, 0]} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="BAIBARS?" /> : undefined}>
      <Eskadron rijen={2} kolommen={9} position={[0, 0, -7]} t={t} />
      <LeeuwVaandel position={[-2.6, 0, -2.2]} t={t} h={4.4} />
      <OpPaard position={[0, 0, 0]} rotation={[0, 0.75, 0]} t={t} kleur="#ECE6D8" dek={GOUD}>
        <Baibars pose={{ armR: omhoog(), hoofd: [0, -0.6, 0], wenk: 0.6 }} inHand={<Sabel />} />
      </OpPaard>
    </Heuvelland>
  );
};

/** Prijsbordje op een stokje; `streep` trekt er een rode streep door. */
const Prijsbord = ({ position, tekst, streep = 0 }: { position: V3; tekst: string; streep?: number }) => (
  <group position={position} rotation={[0, 0.3, 0]}>
    <Blok p={[0, 0.6, 0]} s={[0.05, 1.2, 0.05]} c="#5A3B24" />
    <TekstVlak regels={[tekst]} b={0.6} h={0.34} achter="#E9DCBE" voor="#3A1E12" position={[0, 1.3, 0.03]} fontPx={190} />
    {streep > 0 && <Blok p={[-0.3 + streep * 0.3, 1.3, 0.06]} s={[0.66 * streep, 0.06, 0.01]} r={[0, 0, -0.35]} c="#E8382B" />}
  </group>
);

/** Teaser 1: op de kist; de koper wijst naar zijn oog, draait zich om en loopt weg. */
export const S_TeaserMarkt = () => {
  const f = useCurrentFrame();
  const draai = ease(f, 55, 75, -0.9, 2.0);
  const weg = ease(f, 70, 160, 0, 1.4);
  return (
    <Markt cam={[2.2, 1.9, 6.8, 1.6, 1.8, 5.6]} kijk={[0.3, 1.5, 0]}>
      <Kist position={[0, 0, 0]} />
      <Baibars leeftijd="tiener" position={[0, 0.6, 0]} rotation={[0, 0.25, 0]} pose={{ wenk: lin(f, 60, 80, 0, 0.8), ...ARMEN_GEKRUIST }} />
      <FiguurL kleding={KOPER} haar="kort" baard hoofddeksel="tulband" position={[1.5 + weg * 0.9, 0, 0.5 - weg * 0.4]} rotation={[0, draai, 0]} pose={{ armR: f < 58 ? wijs(1.55) : undefined, wenk: 0.6 }} />
      <Handelaar position={[-1.5, 0, 0.1]} rotation={[0, 0.6, 0]} pose={{ mond: f > 70 ? 'open' : 'lach', wenk: f > 70 ? -0.5 : 0 }} />
      <Prijsbord position={[-0.9, 0, 0.7]} tekst="800" streep={lin(f, 85, 100, 0, 1)} />
    </Markt>
  );
};

/** Teaser 2: de koning van Frankrijk te paard in een smalle straat, Baibars op het dak. */
export const S_TeaserStraat = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Straat cam={[1.5, 1.7, 5.6, 1.0, 1.9, 4.6]} kijk={[-0.7, 2.9, -1.6]} fov={42}>
      <OpPaard position={[0.4, 0, -0.6]} rotation={[0, 0.55, 0]} t={t} kleur="#ECE6D8" dek="#2F4F9E">
        <Lodewijk scheef={Math.sin(f / 5) * 0.12} pose={{ hoofd: [-0.25, -0.9, 0], wenk: -0.4, mond: 'open' }} />
      </OpPaard>
      <Baibars position={[-2.1, 3.0, -2.3]} rotation={[0, 0.85, 0]} pose={{ mond: 'lach', wenk: 0.5, ...ARMEN_GEKRUIST }} />
    </Straat>
  );
};

/** Ronde mamelukse schild (geel met leeuw), vlak naar +z. */
const LeeuwSchild = ({ scale = 1 }: { scale?: number }) => (
  <group scale={scale}>
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.5, 0.5, 0.08, 20]} />
      <meshStandardMaterial color={GOUD} metalness={0.5} roughness={0.35} />
    </mesh>
    <Leeuw position={[0.12, -0.25, 0.05]} scale={0.32} kleur="#7A2A24" />
  </group>
);

/** Teaser 3: een rode Mongoolse pijl stuit op een geel schild bij Ain Jalut en buigt krom. */
export const S_TeaserKaart = () => {
  const f = useCurrentFrame();
  const [x, , z] = opB(...bp('ainJalut'), 0.45);
  return (
    <KaartB van={B_1258} cam={[B_VER, { lon: 38, lat: 34.5, h: 15, a: 8 }]} over={<LangTeller label="The Mongols" waarde="half the world" pil="until they met you" />}>
      <KaartPijl van={[47, 36.5]} naar={[35.9, 32.9]} p={ease(f, 6, 60, 0, 1)} stuit={ease(f, 60, 76, 0, 1.4)} />
      <group position={[x - 0.15, 1.0, z + 0.1]} rotation={[-0.5, -0.5, 0]} scale={ease(f, 40, 54, 0.001, 1.1)}>
        <LeeuwSchild />
      </group>
    </KaartB>
  );
};

/** Teaser 4 (en zin 74): de lege troon; zijn schaduw valt op de muur erachter. */
export const S_LegeTroon = ({ schaduw = true }: { schaduw?: boolean }) => {
  const f = useCurrentFrame();
  const sch = ease(f, 20, 90, 0.6, 1.25);
  return (
    <Paleis donker cam={[0.8, 2.0, 6.2, 0.5, 1.9, 5.0]} kijk={[0, 1.4, -1.6]}>
      <SultanTroon position={[0, 0, -1.6]} kussen />
      {schaduw && (
        <group position={[1.8 + (1 - sch) * 1.2, 0, -3.76]} scale={[sch * 1.25, sch * 1.25, 0.02]}>
          <Baibars o={{ kleur: '#050404', metaal: 0, ruw: 1 }} />
        </group>
      )}
      <pointLight position={[0, 2.6, 1.4]} intensity={5} distance={7} color="#FFB060" />
      <pointLight position={[1.4, 2.4, -2.4]} intensity={4} distance={4} color="#FFB060" />
    </Paleis>
  );
};

/** Troon van de sultan (rood en goud), zitvlak op y 0,55. */
export const SultanTroon = ({ position, rotation, kussen = false }: { position?: V3; rotation?: V3; kussen?: boolean }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.27, 0]} s={[1.3, 0.55, 0.9]} c="#C9A646" metal={0.5} rough={0.35} />
    <Blok p={[0, 1.3, -0.45]} s={[1.3, 1.9, 0.12]} c="#8E2A2A" />
    <Blok p={[0, 2.3, -0.45]} s={[1.0, 0.24, 0.12]} c="#C9A646" metal={0.5} rough={0.35} />
    <Blok p={[0, 2.5, -0.45]} s={[0.4, 0.2, 0.12]} c="#C9A646" metal={0.5} rough={0.35} />
    {[-0.62, 0.62].map((x) => <Blok key={x} p={[x, 0.8, -0.05]} s={[0.12, 0.14, 0.9]} c="#C9A646" metal={0.5} rough={0.35} />)}
    {kussen && <Blok p={[0, 0.6, 0]} s={[1.0, 0.1, 0.7]} c="#A8364A" />}
    {kussen && <Blok p={[0, 0.66, 0.05]} s={[0.5, 0.04, 0.35]} c="#8E2A3A" />}
  </group>
);

/** Teaser 5 (en zin 97): close-up van het kind met het witte vlekje, dat omhoog kijkt. */
export const S_KindClose = ({ slot = false }: { slot?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Markt menigte={false} scherpte={4} cam={slot ? [0.35, 1.62, 2.3, 0.2, 1.56, 1.45] : [0.5, 1.5, 2.6, 0.35, 1.52, 1.9]} kijk={[0, 1.56, 0]} fov={30}>
      <Kist position={[0, 0, -0.2]} />
      <Baibars leeftijd="tiener" position={[0, 0, 0]} scale={0.8} pose={{ hoofd: slot ? [0.05, 0.1, 0] : [-0.35, 0.15, 0], traan: slot ? undefined : lin(f, 10, 50, 0, 0.4), wenk: slot ? 0 : -0.4, mond: slot && f > 50 ? 'lach' : 'dicht' }} />
      {!slot && (
        <group position={[0.7, 2.3, -1.3]} rotation={[0.3, f * 0.02, 0]} scale={0.45}>
          <Kroon />
          <pointLight position={[0, 0.3, 0.6]} intensity={2} distance={3} color="#FFD27A" />
        </group>
      )}
    </Markt>
  );
};

/** Titelkaart: Baibars als sultan voor de poort van Cairo, in de avond. */
export const T5_Titel = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Cairo tijd="avond" cam={[3.4, 2.2, 10.6, 2.6, 2.2, 9.4]} kijk={[0, 3.6, 0]} over={<GroteTitel boven="THE LIFE OF" naam="BAIBARS" onder="from slave boy to sultan" />}>
      <Baibars leeftijd="sultan" position={[0, 0, 1.4]} rotation={[0, 0.35, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.4 }} />
      <LeeuwVaandel position={[-1.2, 0, 0.8]} t={t} />
    </Cairo>
  );
};

/* ================= I · The steppe ================= */

/** Wieg die aan een driepoot hangt, een paard snuffelt eraan. */
export const S_Wieg = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const zwaai = Math.sin(t * 1.4) * 0.12;
  return (
    <Steppe cam={[3.0, 2.0, 7.8, 2.3, 1.9, 6.6]} kijk={[0.6, 1.5, -0.4]} over={<JaarLabel jaar="c. 1223" sub="the Kipchak steppe" />}>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + 0.4;
        return <Blok key={i} p={[Math.sin(a) * 0.7, 1.4, Math.cos(a) * 0.7 - 0.2]} s={[0.07, 2.9, 0.07]} r={[Math.cos(a) * -0.24, 0, Math.sin(a) * 0.24]} c="#6B4A2E" />;
      })}
      <group position={[0, 2.75, -0.2]} rotation={[zwaai, 0, 0]}>
        {[-0.38, 0.38].map((x) => <Blok key={x} p={[x * 0.5, -0.55, 0]} s={[0.015, 1.1, 0.015]} r={[0, 0, x > 0 ? -0.3 : 0.3]} c="#3A2A1C" />)}
        <group position={[0, -1.6, 0]} scale={0.8}>
          <Wieg>
            <Baby position={[0, 0, 0]} boos={0.7} schildje={false} />
          </Wieg>
        </group>
      </group>
      <Paard position={[2.3, 0, -1.3]} rotation={[0, Math.PI / 2 - 0.5, 0]} kleur="#8A6A44" dek="#B3542A" t={t} />
    </Steppe>
  );
};

/** Het kamp: kudde, rook uit de tent, een schaap kauwt op een muts. */
export const S_Kamp = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Steppe joerten={false} cam={[5.6, 2.8, 10.4, 4.2, 2.4, 8.4]} kijk={[0, 1.2, -1]}>
      <Joert position={[-2.6, 0, -2.8]} rotation={[0, 0.5, 0]} rook t={t} />
      <Joert position={[2.8, 0, -4.2]} rotation={[0, -0.3, 0]} />
      <Joert position={[-6.4, 0, -6.4]} rotation={[0, 0.8, 0]} />
      <FiguurL kleding={MOEDER_K} haar="lang" hoofddeksel="kap" position={[-1.0, 0, -0.9]} rotation={[0, 0.7, 0]} pose={{ armR: { schouder: [-0.9, 0, -0.2], elleboog: [0, -1.2] } }} />
      <FiguurL kleding={KIPCHAK} haar="kort" snor hoofdExtra={<Bontmuts kleur="#3E6B8A" />} position={[1.6, 0, -1.4]} rotation={[0, -0.5, 0]} />
      {[[0.4, 0.6], [1.4, 1.2], [-0.6, 1.6], [2.6, 0.3]].map(([x, z], i) => <Schaap key={i} position={[x, 0, z]} rotation={[0, i * 1.7 + 0.4, 0]} t={t} eet={i !== 0} />)}
      {/* het schaap met de muts */}
      <group position={[0.42, 0.28, 1.06]} rotation={[0.5, 0.2, 0.1]} scale={0.5}>
        <Bontmuts />
      </group>
    </Steppe>
  );
};

/** Peuter op een paard; zijn moeder rent erachteraan. */
export const S_Peuter = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = ease(f, 0, 170, -3.4, 2.6);
  return (
    <Steppe cam={[1.2, 2.0, 8.4, 0.8, 1.9, 7.4]} kijk={[x * 0.7, 1.6, 0]}>
      <OpPaard position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t} loopt kleur="#8A6A44" dek="#B3542A">
        <group position={[0, 0.25, 0]}>
          <Baibars leeftijd="kind" scale={0.45} pose={{ mond: 'lach', armL: omhoog(), hoofd: [0, -1.0, 0] }} />
        </group>
      </OpPaard>
      <FiguurL kleding={MOEDER_K} haar="lang" hoofddeksel="kap" position={[x - 2.4, Math.abs(Math.sin(t * 9)) * 0.08, 0.4]} rotation={[0, Math.PI / 2 - 0.4, 0]} pose={{ armR: { schouder: [-2.2, 0, -0.2], elleboog: [0, 0] }, armL: { schouder: [-1.0, 0, 0.2], elleboog: [0, 0.6] }, mond: 'open', wenk: -0.6 }} />
      <Zweet p={[x - 2.1, 2.6, 0.6]} n={2} />
    </Steppe>
  );
};

/** Jongens schieten vanaf het zadel op een strozak; één pijl zit in een schapenhoed. Met `nacht`: sterren. */
export const S_Boog = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = ease(f, 0, 160, -2.4, 2.0);
  return (
    <Steppe joerten={false} kudde={false} cam={[1.8, 2.2, 9.0, 1.2, 2.1, 7.6]} kijk={[0, 1.8, -1]}>
      <OpPaard position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t} loopt kleur="#5A3B24" dek="#3E6B8A">
        <Baibars leeftijd="kind" scale={0.7} rotation={[0, -0.9, 0]} pose={{ armR: { schouder: [-1.5, 0, -0.1], elleboog: [0, 0] }, armL: { schouder: [-1.3, 0, 0.5], elleboog: [0, 1.0] }, wenk: 0.5 }} inHand={<group rotation={[Math.PI / 2, 0, 0]}><Boog /></group>} extra={<Koker />} />
      </OpPaard>
      {/* strozak */}
      <group position={[2.6, 0, -3.4]}>
        <Blok p={[0, 0.6, 0]} s={[0.06, 1.2, 0.06]} c="#5A3B24" />
        <Blok p={[0, 1.4, 0]} s={[0.7, 0.9, 0.5]} c="#D8BE7A" rough={1} />
        <Blok p={[0, 1.45, 0.26]} s={[0.3, 0.3, 0.02]} c="#B3312B" />
        {f > 70 && <Blok p={[0.05, 1.45, 0.45]} s={[0.03, 0.03, 0.5]} c="#6B4A2E" />}
      </group>
      <Schaap position={[-2.6, 0, -3.0]} rotation={[0, 0.5, 0]} t={t} eet={false} />
      <group position={[-2.6, 0.92, -2.62]} rotation={[0.2, 0.5, 0]} scale={0.42}>
        <Bontmuts kleur="#5E8A5A" />
        <Blok p={[0.1, 0.95, 0.0]} s={[0.07, 0.07, 1.2]} r={[0, 0.5, 0]} c="#6B4A2E" />
      </group>
      <FiguurL kleding={KIPCHAK} haar="kort" scale={0.62} hoofdExtra={<Bontmuts kleur="#E39A2C" />} position={[-0.8, 0, -2.6]} rotation={[0, 0.4, 0]} pose={{ mond: 'open', armR: wijs(1.2) }} />
    </Steppe>
  );
};
/** Slapen onder de sterren. */
export const S_Sterren = () => {
  const f = useCurrentFrame();
  void f;
  return (
    <Steppe tijd="nacht" kudde={false} cam={[2.2, 1.4, 5.6, 1.6, 1.4, 4.8]} kijk={[0, 0.6, 0]}>
      {[-0.7, 0.7].map((x, i) => (
        <group key={x} position={[x, 0.18, 0]} rotation={[-Math.PI / 2, 0, i ? 0.15 : -0.1]}>
          <Baibars leeftijd="kind" scale={0.6} pose={{ ogen: 'dicht', mond: 'dicht' }} />
        </group>
      ))}
      <Blok p={[0, 0.05, 0.2]} s={[2.4, 0.1, 1.4]} c="#6B4A3A" rough={1} />
      <pointLight position={[1.6, 0.6, 1.2]} intensity={3} distance={6} color="#FF9A50" />
      <Blok p={[1.6, 0.15, 1.2]} s={[0.3, 0.3, 0.3]} c="#FF7A2A" emissive="#FF5A1A" />
    </Steppe>
  );
};

/** Aan de horizon: een stofwolk met rode vaandels. Het kind laat zijn kom vallen. */
export const S_Stofwolk = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kom = f < 50 ? 0 : Math.min(1, (f - 50) / 10);
  return (
    <Steppe cam={[1.4, 1.9, 4.6, 1.0, 1.8, 3.8]} kijk={[0, 1.5, -6]} scherpte={1.8}>
      <Baibars leeftijd="kind" scale={0.8} position={[-0.45, 0, 0.4]} rotation={[0, Math.PI - 0.3, 0]} pose={{ armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.8] }, mond: 'open' }} />
      <group position={[-0.45 + 0.32, 1.0 - kom * 0.95, 0.2 - kom * 0.1]} rotation={[kom * 2, 0, 0]}>
        <Blok p={[0, 0, 0]} s={[0.24, 0.1, 0.24]} c="#B5643A" />
      </group>
      {Array.from({ length: 12 }, (_, i) => (
        <Blok key={i} p={[-14 + i * 2.6, 1.2 + (i % 3) * 0.8 + Math.sin(t + i) * 0.2, -34 + ease(f, 0, 160, 0, 6)]} s={[3.4, 2.4 + (i % 2), 2]} r={[0, i, 0.2]} c="#B8A07A" rough={1} />
      ))}
      {[-8, -3, 2, 7].map((x, i) => <Vaandel key={x} position={[x, 0, -31 + ease(f, 0, 160, 0, 6)]} t={t + i} h={5} />)}
    </Steppe>
  );
};

/** Kaart: de rode golf over de steppe; piepkleine joerten klappen om. */
export const S_GolfKaart = () => {
  const f = useCurrentFrame();
  return (
    <KaartB van={B_1223} naar={B_1237} wissel={[15, 90]} cam={[B_STEPPE, { ...B_STEPPE, lat: 46, h: 10, a: 6 }]} over={<JaarLabel jaar="c. 1237" sub="the Mongols arrive" />}>
      <KaartPijl van={[52, 47.5]} naar={[36, 47.5]} p={ease(f, 4, 80, 0, 1)} />
      {[[38, 47.8], [40.5, 48.6], [42.6, 47.2], [37, 46.6], [41.8, 49.6]].map(([lon, lat], i) => {
        const [x, , z] = opB(lon, lat);
        const val = ease(f, 30 + i * 10, 42 + i * 10, 0, 1.5);
        return (
          <group key={i} position={[x, 0.5, z]} rotation={[0, 0, val]} scale={0.14}>
            <Joert position={[0, 0, 0]} />
          </group>
        );
      })}
    </KaartB>
  );
};

/** Een rij gevangenen in de verte, Mongoolse ruiters erlangs. */
export const S_Gevangenen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = ease(f, 0, 170, 0, 1.4);
  return (
    <Steppe tijd="dageraad" joerten={false} kudde={false} cam={[4, 2.6, 12, 3.2, 2.4, 10.4]} kijk={[0, 1.2, -2]} scherpte={1.8}>
      {Array.from({ length: 9 }, (_, i) => (
        <FiguurL key={i} kleding={{ ...KIPCHAK, tuniek: ['#6B5A3A', '#5A4A3A', '#7A6A4A'][i % 3] }} haar="kort" scale={i % 4 === 2 ? 0.65 : 0.85} position={[-6 + i * 1.3 + loop, 0, -2.4]} rotation={[0, Math.PI / 2, 0]} pose={{ hoofd: [0.3, 0, 0], armL: { schouder: [-0.5, 0, 0.3], elleboog: [0, 0.6] }, armR: { schouder: [-0.5, 0, -0.3], elleboog: [0, -0.6] } }} />
      ))}
      <Blok p={[-0.8 + loop, 1.05, -2.4]} s={[10.4, 0.03, 0.03]} c="#8A6A44" />
      <MiniRuiter position={[-7.6 + loop, 0, -1.2]} rotation={[0, Math.PI / 2, 0]} soort="mongool" t={t} loopt />
      <MiniRuiter position={[5.6 + loop, 0, -3.8]} rotation={[0, Math.PI / 2, 0]} soort="mongool" kleur="#5A3A2A" t={t} loopt />
    </Steppe>
  );
};

/** Gevangen: touw om de pols, de handelaar telt munten en likt aan zijn duim. */
export const S_Verkocht = () => {
  const f = useCurrentFrame();
  const lik = Math.floor(f / 24) % 2 === 1;
  return (
    <Steppe tijd="dageraad" joerten={false} cam={[1.6, 1.9, 5.4, 1.1, 1.8, 4.4]} kijk={[0, 1.4, 0]}>
      <Baibars leeftijd="kind" scale={0.78} position={[-0.8, 0, 0]} rotation={[0, 0.5, 0]} pose={{ wenk: 0.9, armR: { schouder: [-0.6, 0, -0.3], elleboog: [0, -0.4] } }} />
      <BoosTeken p={[-0.4, 2.0, 0.2]} s={0.4} />
      <Blok p={[-0.05, 0.95, 0.15]} s={[1.2, 0.03, 0.03]} r={[0, 0.3, -0.1]} c="#8A6A44" />
      <Handelaar position={[0.9, 0, -0.2]} rotation={[0, -0.6, 0]} pose={{ armR: lik ? { schouder: [-2.2, 0, -0.3], elleboog: [0, -1.6] } : { schouder: [-0.9, 0, -0.1], elleboog: [0, -0.9] }, armL: { schouder: [-0.9, 0, 0.1], elleboog: [0, 0.9] }, mond: lik ? 'open' : 'lach' }} />
      <Muntstapel position={[0.62, 1.12, 0.35]} n={lin(f, 0, 120, 2, 9)} zilver={false} />
      <Mongool position={[2.4, 0, -1.6]} rotation={[0, -0.4, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Steppe>
  );
};

/* ================= II · Eight hundred coins ================= */

/** Kaart: van de steppe over de Zwarte Zee naar Anatolië en Syrië, een mini-karavaan voorop. */
export const S_RouteZuid = () => (
  <KaartB van={B_1250} cam={[B_STEPPE, { lon: 37, lat: 39.5, h: 15, a: 8 }]} camDuur={160} spelden={[['sivas', '#E39A2C'], ['hama', '#E39A2C']]} route={[bp('steppe'), bp('krim'), bp('samsun'), bp('sivas'), bp('aleppo'), bp('hama')]} routeTijd={[8, 150]} kop={<MiniKaravaan />} over={<LangTeller label="Sold south" waarde="Anatolia, Syria" />} />
);

/** Tiener naast een meetlat, roept "HEY!"; de handelaar houdt zijn oren dicht. */
export const S_Meetlat = () => {
  const f = useCurrentFrame();
  const roep = f > 40;
  return (
    <Markt cam={[1.6, 1.9, 6.0, 1.2, 1.9, 5.0]} kijk={[0, 1.6, 0]}>
      <group position={[-0.6, 0, -0.2]}><MeetlatK /></group>
      <Baibars leeftijd="tiener" scale={1.0} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ mond: roep ? 'open' : 'dicht', wenk: roep ? 0.6 : 0 }} />
      {roep && <Wolk p={[0.75, 2.75, 0.3]} tekst="HEY!" b={0.8} h={0.4} vanaf={40} staart={-1} />}
      <Handelaar position={[1.5, 0, 0.3]} rotation={[0, -0.6, 0]} pose={roep ? { armL: { schouder: [-2.3, 0, 0.9], elleboog: [0, 1.6] }, armR: { schouder: [-2.3, 0, -0.9], elleboog: [0, -1.6] }, ogen: 'dicht', wenk: -0.6 } : { mond: 'lach' }} />
      {roep && <Streepjes p={[0.9, 2.1, 0.4]} r={[0, 0, 0.3]} />}
    </Markt>
  );
};
const MeetlatK = () => (
  <group>
    {Array.from({ length: 12 }, (_, i) => <Blok key={i} p={[0, 0.125 + i * 0.25, 0]} s={[0.3, 0.25, 0.04]} c={i % 2 ? '#F2EEE6' : '#3E6B8A'} />)}
    <TekstVlak regels={['6 FT']} b={0.4} h={0.2} achter="#F2EEE6" voor="#1A120A" position={[0, 2.52, 0.04]} fontPx={150} />
  </group>
);

/** Extreme close-up van het oog: het witte vlekje. */
export const S_Oog = () => {
  const f = useCurrentFrame();
  return (
    <Markt menigte={false} scherpte={6} cam={[-0.08, 2.07, 2.1, -0.1, 2.05, 1.5]} kijk={[-0.08, 1.97, 0.2]} fov={26}>
      <Baibars leeftijd="tiener" scale={1.0} position={[0, 0, 0]} pose={{ wenk: 0.2 }} />
      {f > 30 && f < 60 && <pointLight position={[-0.1, 2.2, 0.6]} intensity={0.8} distance={1.2} color="#FFFFFF" />}
    </Markt>
  );
};

/** Hama: de koper tilt zijn monocle, ziet het oog, zet hem terug op de kist. RETURNED. */
export const S_Hama = () => {
  const f = useCurrentFrame();
  const terug = ease(f, 70, 100, 0, 1);
  const tiltY = lin(f, 20, 40, 0, 0.12);
  return (
    <Markt cam={[0.4, 2.0, 7.2, 0.3, 1.9, 6.0]} kijk={[0, 1.5, 0]} over={<><Stempel tekst="RETURNED" vanaf={110} top={160} /><JaarLabel jaar="Hama" sub="Syria" /></>}>
      <Kist position={[-1.3, 0, -0.4]} />
      <Baibars leeftijd="tiener" position={[-0.3 - terug * 1.0, 0.6 * terug, 0.8 - terug * 1.2]} rotation={[0, 0.5, 0]} pose={{ wenk: 0.6 }} />
      <FiguurL
        kleding={KOPER}
        haar="kort"
        baard
        hoofddeksel="tulband"
        position={[1.0, 0, 0.9]}
        rotation={[0, -1.0, 0]}
        pose={{ hoofd: [0, 0, 0], armR: { schouder: [-2.4, 0, -0.5], elleboog: [0, -1.5] }, wenk: f > 45 ? -0.5 : 0.2, mond: f > 45 ? 'open' : 'dicht' }}
        hoofdExtra={<group position={[0.14, 0.42 + tiltY, 0.31]}><Blok p={[0, 0, 0]} s={[0.17, 0.17, 0.01]} c="#D8A945" metal={0.8} rough={0.3} /><Blok p={[0, 0, 0.006]} s={[0.12, 0.12, 0.01]} c="#BFE6FF" rough={0.05} /></group>}
      />
    </Markt>
  );
};

/** "Damaged goods": het bordje om zijn nek, boos. */
export const S_Damaged = () => (
  <Markt menigte={false} cam={[0.7, 1.75, 3.9, 0.5, 1.75, 3.3]} kijk={[0, 1.55, 0]}>
    <Baibars leeftijd="tiener" position={[0, 0, 0]} pose={{ wenk: 1 }} extra={<NekBordje tekst="DAMAGED|GOODS" y={1.18} />} />
    <BoosTeken p={[0.48, 2.6, 0.2]} s={0.45} />
  </Markt>
);

/** Aydakin telt 800 munten op een weegschaal; de munten stapelen tot een toren. */
export const S_Aydakin = () => {
  const f = useCurrentFrame();
  const n = lin(f, 10, 130, 0, 26);
  return (
    <Markt cam={[2.2, 2.0, 6.4, 1.5, 1.9, 5.2]} kijk={[0, 1.4, 0]} over={<TelTeller label="Silver coins" van={0} tot={800} a={10} b={130} />}>
      <Aydakin position={[-0.9, 0, -0.2]} rotation={[0, 0.55, 0]} pose={{ mond: 'lach', armR: { schouder: [-1.0, 0, -0.1], elleboog: [0, -0.8] } }} />
      <Blok p={[0.2, 0.45, 0.4]} s={[1.2, 0.9, 0.7]} c="#6B4A2E" />
      <Weegschaal position={[0.2, 0.9, 0.4]} scheef={lin(f, 10, 130, 0, -0.25)} links={<Muntstapel position={[0, 0, 0]} n={n} />} rechts={<Blok p={[0, 0.12, 0]} s={[0.18, 0.24, 0.18]} c="#6B6A64" metal={0.5} />} />
      <Baibars leeftijd="tiener" position={[1.5, 0, -0.4]} rotation={[0, -0.5, 0]} pose={{ wenk: 0.3 }} extra={<NekBordje tekst="DAMAGED|GOODS" y={1.18} />} />
    </Markt>
  );
};

/** Aydakin schiet met zijn kruisboog, de bout raakt een meloen; de naam verschijnt. */
export const S_Kruisboog = () => {
  const f = useCurrentFrame();
  const bout = lin(f, 30, 44, 0, 1);
  const raak = f > 44;
  return (
    <Markt menigte={false} cam={[0.4, 1.9, 7.4, 0.3, 1.9, 6.4]} kijk={[0, 1.5, -1]} over={<Bord2D tekst="Baibars al-Bunduqdari" sub="“the crossbowman’s man”" vanaf={70} />}>
      <Aydakin position={[-2.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} pose={{ armR: { schouder: [-1.5, 0, 0], elleboog: [0, 0] }, armL: { schouder: [-1.4, 0, 0.6], elleboog: [0, 1.2] }, wenk: 0.6 }} inHand={<Kruisboog />} />
      {bout > 0 && !raak && <Blok p={[-1.0 + bout * 3.1, 1.62, 0]} s={[0.4, 0.04, 0.04]} c="#6B4A2E" />}
      <group position={[2.4, 0, 0]}>
        <Blok p={[0, 0.6, 0]} s={[0.5, 1.2, 0.5]} c="#8A6A3A" />
        {!raak ? <Blok p={[0, 1.42, 0]} s={[0.44, 0.4, 0.44]} c="#4E8A3A" /> : [-1, 1].map((k) => <Blok key={k} p={[k * (0.2 + (f - 44) * 0.03), 1.4 + Math.max(0, 0.3 - (f - 44) * 0.01), 0]} s={[0.22, 0.4, 0.44]} r={[0, 0, k * (f - 44) * 0.08]} c={k > 0 ? '#E8483A' : '#4E8A3A'} />)}
      </group>
      <Baibars leeftijd="tiener" position={[0.3, 0, -1.6]} rotation={[0, 0.1, 0]} pose={{ mond: raak ? 'open' : 'dicht', wenk: raak ? -0.5 : 0 }} />
    </Markt>
  );
};

/** Doorverkocht aan de sultan: de stoet trekt de poort van Cairo binnen; Aydakin zwaait met een zakdoek. */
export const S_NaarCairo = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = ease(f, 0, 170, 0, 3.4);
  return (
    <Cairo poort={1} cam={[4.6, 2.4, 11.4, 3.4, 2.2, 9.6]} kijk={[0, 1.6, 0]}>
      {[0, 1, 2].map((i) => <Mameluk key={i} v={i} position={[-0.6 + i * 0.6, 0, 2.2 - loop - i * 0.9]} rotation={[0, Math.PI, 0]} />)}
      <Baibars leeftijd="tiener" position={[0.2, 0, 3.4 - loop]} rotation={[0, Math.PI - 2.6 * ease(f, 40, 70, 0, 1) + 2.6 * ease(f, 110, 140, 0, 1), 0]} pose={{ wenk: -0.3 }} />
      <Aydakin position={[2.8, 0, 4.6]} rotation={[0, -0.9, 0]} pose={{ armR: { schouder: [-2.7 + Math.sin(t * 9) * 0.3, 0, -0.4], elleboog: [0, -0.3] }, mond: 'lach' }} inHand={<Blok p={[0, -0.2, 0]} s={[0.3, 0.3, 0.02]} c="#F2EEE6" r={[0, 0, Math.sin(t * 9) * 0.4]} />} />
    </Cairo>
  );
};

/** Het fort op het eiland Roda in de Nijl, van boven; een krokodil kijkt op. */
export const S_Roda = () => {
  const f = useCurrentFrame();
  return (
    <Nijl over={<LangTeller label="Rawda island" waarde="the Bahri fort" pil="on the Nile" />}>
      <Krokodil position={[-10.8, 0.15, 5]} rotation={[0, 2.6, 0]} op={f > 70} />
    </Nijl>
  );
};

/** Een rij jonge Mamelukken, "MAMLUK = owned"; eentje zwaait naar de camera. */
export const S_Rij = () => {
  const f = useCurrentFrame();
  return (
    <Cairo cam={[1.4, 2.0, 7.4, 1.0, 1.9, 6.4]} kijk={[0, 1.5, 0]} over={<Bord2D tekst="MAMLUK = “OWNED”" vanaf={10} top={110} />}>
      {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
        <group key={x}>
          {i === 2 ? (
            <Baibars leeftijd="kamp" snor={false} position={[x, 0, 1.6]} pose={{ wenk: 0.3 }} />
          ) : (
            <Mameluk v={i} position={[x, 0, 1.6]} scale={0.95} pose={i === 4 && f > 30 ? { armR: { schouder: [-2.8 + Math.sin(f / 3) * 0.3, 0, -0.4], elleboog: [0, -0.3] }, mond: 'lach' } : { wenk: 0.2 }} />
          )}
        </group>
      ))}
    </Cairo>
  );
};

/** Training: Baibars galoppeert en schiet achterwaarts, raak; de instructeur valt van zijn kruk. */
export const S_Training = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = ease(f, 0, 140, -4.2, 3.0);
  const val = ease(f, 70, 88, 0, 1);
  return (
    <Heuvelland cam={[1.2, 2.4, 10.4, 0.9, 2.3, 9.2]} kijk={[0, 1.8, 0]}>
      <OpPaard position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t} loopt dek="#B3312B">
        <Baibars leeftijd="kamp" snor={false} rotation={[0, -2.0, 0]} pose={{ armR: { schouder: [-1.5, 0, -0.1], elleboog: [0, 0] }, armL: { schouder: [-1.3, 0, 0.5], elleboog: [0, 1.0] }, wenk: 0.6 }} inHand={<group rotation={[Math.PI / 2, 0, 0]}><Boog /></group>} extra={<Koker />} />
      </OpPaard>
      <group position={[-4.2, 0, -1.6]}>
        <Blok p={[0, 0.8, 0]} s={[0.06, 1.6, 0.06]} c="#5A3B24" />
        <Blok p={[0, 1.7, 0]} s={[0.7, 0.7, 0.1]} c="#F2EEE6" />
        <Blok p={[0, 1.7, 0.06]} s={[0.36, 0.36, 0.02]} c="#B3312B" />
        {f > 62 && <Blok p={[0, 1.7, 0.3]} s={[0.03, 0.03, 0.5]} c="#6B4A2E" />}
      </group>
      <group position={[2.6, 0, -2.6]}>
        <Blok p={[0, 0.3, 0]} s={[0.5, 0.06, 0.5]} c="#6B4A2E" r={[0, 0, val * 1.2]} />
        <group position={[val * 0.6, 0, 0]} rotation={[0, -0.5, -val * 1.4]}>
          <Zit kleding={INSTRUCTEUR} haar="grijs" baard hoofdExtra={<Zamt kap="#E39A2C" />} pose={{ mond: 'open', wenk: -0.6, armR: omhoog() }} />
        </group>
      </group>
    </Heuvelland>
  );
};

/** Een slaaf met een zwaard: hij heft de sabel; de ketting om zijn enkel breekt niet. */
export const S_SlaafZwaard = () => {
  const f = useCurrentFrame();
  const op = ease(f, 10, 40, 0, 1);
  return (
    <Heuvelland tijd="avond" cam={[1.6, 1.5, 6.4, 1.1, 1.5, 5.4]} kijk={[0, 1.3, 0]}>
      <Baibars leeftijd="kamp" position={[0, 0, 0]} rotation={[0, 0.25, 0]} pose={{ armR: { schouder: [-1.0 - op * 1.4, 0, 0.3 + op * 0.5], elleboog: [0, -0.3] }, wenk: 0.5 }} inHand={<Sabel />} />
      <Ketting van={-0.12} tot={1.6} y={0.12} z={0.05} />
      <Blok p={[1.7, 0.2, 0.05]} s={[0.3, 0.4, 0.3]} c="#5A5A5A" metal={0.4} />
    </Heuvelland>
  );
};

/* ================= III · A king in the streets ================= */

/** Damiate: schepen met lelievlaggen, de koning stapt aan land, een ridder valt in het water. */
export const S_Damiate = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const val = ease(f, 60, 80, 0, 1);
  return (
    <Strand cam={[4.4, 2.4, 9.4, 3.2, 2.2, 7.6]} kijk={[0, 1.4, -1]} over={<JaarLabel jaar="1249" sub="Damietta, Egypt" />}>
      <Zeilschip position={[-1.6, -0.2, -5.4]} rotation={[0, Math.PI / 2 + 0.3, 0]} t={t} vlag="#2F4F9E" schaal={1} />
      <Lodewijk position={[0.4, 0, ease(f, 0, 120, -0.6, 0.8)]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach', armR: omhoog() }} />
      <Ridder v={0} position={[-1.2, 0, 0.2]} rotation={[0, 0.4, 0]} />
      <group position={[1.9, -val * 0.9, -1.4 - val * 0.4]} rotation={[-val * 1.4, 0, 0]}>
        <Ridder v={1} pose={{ armL: omhoog(), armR: omhoog(), mond: 'open', wenk: -0.6 }} />
      </group>
      {val > 0.9 && <Blok p={[1.9, -0.05, -1.9]} s={[1.4, 0.08, 1.0]} c="#F2F6F8" />}
    </Strand>
  );
};

/** Lodewijk in een gouden lijst; een scheve aureool met "1297". */
export const S_Heilige = () => {
  const f = useCurrentFrame();
  return (
    <Paleis cam={[0.3, 2.3, 4.6, 0.2, 2.3, 3.8]} kijk={[0, 2.3, -1.6]} over={<Pijllabel tekst="made a saint in 1297" x={1380} y={240} naar={[1060, 330]} vanaf={30} />}>
      <group position={[0, 0, -2.0]}>
        <Blok p={[0, 2.2, -0.12]} s={[2.0, 2.4, 0.06]} c="#2A3A5A" />
        {[[0, 3.42, 2.2, 0.16], [0, 0.98, 2.2, 0.16], [-1.06, 2.2, 0.16, 2.6], [1.06, 2.2, 0.16, 2.6]].map(([x, y, b, h], i) => <Blok key={i} p={[x, y, -0.05]} s={[b, h, 0.12]} c="#D8A945" metal={0.7} rough={0.3} />)}
        <Lodewijk position={[0, 0.0, -0.3]} pose={{ mond: 'dicht', ...ARMEN_GEKRUIST }} />
        <group position={[0.08, 2.72 + Math.sin(f / 9) * 0.02, -0.25]} rotation={[1.2, 0, 0.35 + Math.sin(f / 13) * 0.05]}>
          <mesh>
            <torusGeometry args={[0.32, 0.05, 6, 16]} />
            <meshStandardMaterial color="#FFE27A" emissive="#C99A2E" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </group>
    </Paleis>
  );
};

/** Schepen vol paarden; één paard is zeeziek (groen). */
export const S_PaardSchepen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const wieg = Math.sin(t * 1.4) * 0.05;
  return (
    <Strand schepen={false} cam={[3.2, 2.6, 7.4, 2.4, 2.4, 6.2]} kijk={[0, 1.6, -3]} over={<LangTeller label="Crusaders" waarde="thousands" pil="and ships full of horses" />}>
      <group position={[0, -0.3 + wieg, -3.4]} rotation={[wieg, 0, wieg * 0.5]}>
        <Blok p={[0, 0.5, 0]} s={[7, 1.2, 2.4]} c="#6B4A2E" />
        <Blok p={[0, 1.15, 0]} s={[7.2, 0.12, 2.6]} c="#8A6A44" />
        {[-2.4, -0.8, 0.8, 2.4].map((x, i) => (
          <group key={x} position={[x, 0.6, 0]}>
            <Paard rotation={[0, Math.PI + (i % 2 ? 0.2 : -0.2), 0]} kleur={i === 2 ? '#7EB06A' : ['#6B4A30', '#3A2A20', '#7EB06A', '#ECE6D8'][i]} dek="#2F4F9E" t={t + i} />
          </group>
        ))}
        <Blok p={[0, 1.6, 1.25]} s={[7.2, 0.6, 0.1]} c="#5A3B24" />
      </group>
      {f > 30 && <Wolk p={[0.9, 4.0, -2.4]} tekst="BLEH" b={0.8} h={0.34} vanaf={30} staart={-1} />}
    </Strand>
  );
};

/** Kaart: Damiate ingenomen, een blauwe lijn langs de Nijl naar Mansoura. */
export const S_NijlKaart = () => (
  <KaartB van={B_1250} cam={[B_ZUID, { lon: 31.6, lat: 30.9, h: 8, a: 5.5 }]} spelden={[['damietta', '#2F4F9E'], ['mansoura', '#E39A2C']]} route={[bp('damietta'), [31.6, 31.25], bp('mansoura'), [31.25, 30.6]]} routeKleur="#2F4F9E" routeTijd={[20, 120]} kop={<MiniRidder />} />
);
const MiniRidder = () => <Ridder scale={0.16} rotation={[0, -0.6, 0]} />;

/** Zijn broer wacht niet: Robert stormt weg, Lodewijk roept "WAIT!". */
export const S_Wacht = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const weg = ease(f, 10, 150, 0, 7);
  return (
    <Heuvelland cam={[2.4, 2.2, 8.8, 1.8, 2.1, 7.6]} kijk={[0, 2.0, -1]}>
      <OpPaard position={[1.4, 0, -1.4 - weg]} rotation={[0, Math.PI, 0]} t={t} loopt kleur="#3A2A20" dek="#2F4F9E">
        <Robert pose={{ armR: omhoog() }} inHand={<Blok p={[0, 0, 0.5]} s={[0.05, 0.05, 1.6]} c="#6B4A2E" />} />
      </OpPaard>
      {[0, 1, 2].map((i) => <MiniRuiter key={i} position={[2.6 + i * 1.1, 0, -2.4 - weg * 0.95 - i * 0.6]} rotation={[0, Math.PI, 0]} soort="ridder" kleur={['#2F4F9E', '#A8322B', '#ECE6D8'][i]} t={t} loopt />)}
      <Lodewijk position={[-1.4, 0, 0.6]} rotation={[0, -0.4, 0]} pose={{ armR: omhoog(), armL: wijs(1.2), mond: 'open', wenk: -0.5 }} />
      <Wolk p={[-0.6, 2.95, 0.8]} tekst="WAIT!" b={0.9} h={0.42} vanaf={20} staart={-1} />
    </Heuvelland>
  );
};

/** Februari 1250: ridders galopperen de poort van Mansoura binnen (camera buiten de stad). */
export const S_Charge = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = ease(f, 0, 170, 0, 9);
  return (
    <Straat poort={1} cam={[3.6, 2.4, 17.4, 2.6, 2.2, 15.2]} kijk={[0, 2.2, 7]} over={<JaarLabel jaar="February 1250" sub="Mansoura" />}>
      <Blok p={[0, 0.01, 16]} s={[30, 0.02, 18]} c="#C2A87A" />
      {[[0, 0], [1.0, 1.6], [-1.0, 1.8], [0.4, 3.4], [-0.6, 4.4]].map(([x, z], i) => <MiniRuiter key={i} position={[x * 0.8, 0, 13.4 + z - loop]} rotation={[0, Math.PI, 0]} soort="ridder" kleur={['#2F4F9E', '#A8322B', '#ECE6D8'][i % 3]} t={t} loopt />)}
      {Array.from({ length: 6 }, (_, i) => <Blok key={i} p={[Math.sin(i * 2) * 1.2, 0.3 + (i % 2) * 0.2, 15 + i * 0.6 - loop * 0.9]} s={[0.7, 0.5, 0.6]} r={[0, i, 0]} c="#D8C29A" rough={1} />)}
    </Straat>
  );
};

/** Hij wacht achter de poort, grijnst, vinger op de lippen. */
export const S_Wachten = () => (
  <Straat poort={0} cam={[0.5, 2.0, 1.2, 0.3, 2.0, 1.9]} kijk={[-0.3, 2.0, 5.4]}>
    <Baibars position={[-0.5, 0, 5.0]} rotation={[0, Math.PI - 0.15, 0]} pose={{ mond: 'lach', wenk: 0.5, armR: { schouder: [-1.2, 0, -0.6], elleboog: [0, -2.3] } }} />
    <Mameluk v={1} position={[1.2, 0, 6.0]} rotation={[0, Math.PI + 0.4, 0]} pose={{ wenk: 0.4, ...ARMEN_GEKRUIST }} />
  </Straat>
);

/** De poort zwaait open, de ridders rijden binnen; een mameluk achter de poort knipoogt. */
export const S_PoortOpen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const open = ease(f, 6, 40, 0, 1);
  const loop = ease(f, 30, 170, 0, 6);
  return (
    <Straat poort={open} cam={[0.6, 2.0, -1.2, 0.4, 2.0, -0.2]} kijk={[0, 1.9, 7]}>
      {[[0, 0], [-0.7, 1.8], [0.7, 2.4]].map(([x, z], i) => <MiniRuiter key={i} position={[x, 0, 9.4 + z - loop]} rotation={[0, Math.PI, 0]} soort="ridder" kleur={['#2F4F9E', '#A8322B', '#ECE6D8'][i]} t={t} loopt />)}
      <group position={[1.6, 0, 5.8]} rotation={[0, Math.PI + 0.6, 0]}>
        <Mameluk v={0} pose={{ mond: 'lach', wenk: 0.4 }} />
      </group>
      {f > 70 && f < 84 && <Blok p={[1.7, 2.12, 5.5]} s={[0.14, 0.03, 0.02]} r={[0, 0.6, 0]} c="#151210" />}
    </Straat>
  );
};

/** Van boven: de straten sluiten zich om de ridders als een val. */
export const S_Doolhof = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Straat poort={ease(f, 50, 80, 1, 0)} cam={[0.2, 24, 4, 0.1, 20, 3]} kijk={[0, 0, -1]} fov={40}>
      {[[0, 1], [0.6, -0.8], [-0.5, -2.4], [0.2, -4.0]].map(([x, z], i) => <MiniRuiter key={i} position={[x, 0, z]} rotation={[0, Math.PI + Math.sin(t * 2 + i) * 0.6, 0]} soort="ridder" kleur={['#2F4F9E', '#A8322B', '#ECE6D8'][i % 3]} t={t} loopt />)}
      {[-6.4, 3.0].map((z, i) => (
        <group key={z}>
          {[-1, 1].map((k) => (
            <group key={k} position={[k * 1.2, 0, z]} rotation={[0, k * ease(f, 30 + i * 18, 52 + i * 18, 1.5, 0), 0]}>
              <Blok p={[-k * 0.6, 1.6, 0]} s={[1.2, 3.2, 0.2]} c="#4A2E1A" />
              <Blok p={[-k * 0.6, 3.25, 0]} s={[1.2, 0.1, 0.24]} c="#C9A646" />
            </group>
          ))}
        </group>
      ))}
    </Straat>
  );
};

/** Vanaf de daken: pijlen, stenen en potten (met bloemen); een kat kijkt toe. */
export const S_Daken = () => {
  const f = useCurrentFrame();
  const gooi = (k: number) => ((f + k * 20) % 50) / 50;
  return (
    <Straat cam={[0.3, 6.6, 10.4, 0.2, 6.4, 9.4]} kijk={[0, 4.2, 0.8]} fov={44}>
      {[0, 1].map((i) => <MiniRuiter key={i} position={[i ? 0.5 : -0.4, 0, -1.4 - i * 1.6]} rotation={[0, Math.PI + (i ? -0.4 : 0.3), 0]} soort="ridder" kleur={i ? '#A8322B' : '#2F4F9E'} />)}
      <Mameluk v={0} position={[-2.3, 4.2, 0.7]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [-1.5, 0, 0.3], elleboog: [0, 0] }, armR: { schouder: [-1.4, 0, -0.2], elleboog: [0, -1.4] }, wenk: 0.6 }} inHand={undefined} />
      <group position={[-2.0, 5.85, 0.95]} rotation={[0, Math.PI / 2, 0]}><Boog /></group>
      <FiguurL kleding={{ huid: '#C9925F', haar: '#1A1210', tuniek: '#8E4A5A', rok: '#7A3E4E', schoenen: '#3A2A1C', cape: '#E9DFC8' }} haar="lang" hoofddeksel="kap" position={[-2.4, 3.0, 4.0]} rotation={[0, Math.PI / 2, 0]} pose={{ armR: omhoog(), armL: omhoog(), mond: 'open' }} />
      <Mameluk v={2} position={[2.4, 3.6, 0.7]} rotation={[0, -Math.PI / 2, 0]} pose={{ armR: omhoog(), wenk: 0.6, mond: 'open' }} />
      {[0, 1].map((k) => {
        const g = gooi(k);
        return (
          <group key={k} position={[k ? 1.8 - g * 1.8 : -2.0 + g * 2.0, (k ? 5.4 : 4.6) + Math.sin(g * Math.PI) * 0.8 - g * 3, k ? 0.8 : 4.0]} rotation={[g * 4, g * 3, 0]}>
            <Blok p={[0, 0, 0]} s={[0.26, 0.3, 0.26]} c="#B5643A" />
            <Blok p={[0, 0.2, 0]} s={[0.2, 0.16, 0.2]} c="#5E8A3A" />
            <Blok p={[0, 0.3, 0]} s={[0.08, 0.08, 0.08]} c="#E84A6A" />
          </group>
        );
      })}
      <KatDak />
    </Straat>
  );
};
const KatDak = () => (
  <group position={[2.3, 4.8, 4.0]} rotation={[0, -1.2, 0]}>
    <KatK />
  </group>
);
const KatK = () => <KatK0 position={[0, 0, 0]} kijk />;

/** De broer van de koning sneuvelt: een gevallen helm met pluim in een lege straat. */
export const S_Helm = () => (
  <Straat cam={[1.0, 1.1, 3.4, 0.8, 0.95, 2.7]} kijk={[0, 0.45, 0]} scherpte={4}>
    <GevallenHelmR />
    <Blok p={[-0.3, 0.04, -0.9]} s={[0.06, 0.06, 2.6]} r={[0, 0.5, 0]} c="#6B4A2E" />
    <Blok p={[-0.95, 0.03, -1.9]} s={[0.4, 0.02, 0.5]} r={[0, 0.5, 0]} c="#2F4F9E" />
  </Straat>
);
const GevallenHelmR = () => <GevallenHelm position={[0, 0.0, 0]} />;

/** Lodewijk in boeien, kroon scheef, zweetdruppel. */
export const S_Boeien = () => {
  const f = useCurrentFrame();
  return (
    <Paleis cam={[0.8, 2.1, 4.8, 0.5, 2.0, 3.9]} kijk={[0, 1.8, 0]} over={<LangTeller label="Louis IX" waarde="captured" pil="a king in chains" />}>
      <Lodewijk scheef={0.35} position={[0, 0, 0]} pose={{ armL: { schouder: [-0.7, 0, 0.35], elleboog: [0, 0.9] }, armR: { schouder: [-0.7, 0, -0.35], elleboog: [0, -0.9] }, wenk: -0.7, hoofd: [0.15, 0, 0] }} />
      <Ketting van={-0.3} tot={0.3} y={1.0} z={0.48} />
      <Zweet p={[0.4, 2.55, 0.3]} n={1} />
      <Mameluk v={1} position={[-1.3, 0, -0.6]} rotation={[0, 0.4, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
      <Mameluk v={3} position={[1.4, 0, -0.7]} rotation={[0, -0.4, 0]} pose={{ ...ARMEN_GEKRUIST }} />
      {void f}
    </Paleis>
  );
};

/** Nog in de twintig: Baibars met zijn jonge snor. */
export const S_Twintig = () => (
  <Straat cam={[0.9, 2.1, 4.4, 0.6, 2.1, 3.6]} kijk={[0, 2.0, 0]} over={<LangTeller label="Age" waarde="~27" pil="still in your twenties" />}>
    <Baibars position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach', wenk: 0.3, ...ARMEN_GEKRUIST }} />
  </Straat>
);

