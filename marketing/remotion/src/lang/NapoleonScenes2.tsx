import type React from 'react';
import { Sequence, useCurrentFrame } from 'remotion';
import {
  Avondlicht,
  Berg,
  Binnenlicht,
  Bos,
  Camera,
  Daglicht,
  Fakkel,
  Grond,
  Heuvels,
  Kanon,
  Kathedraal,
  Koepelkerk,
  Leger,
  Lucht,
  Menigte,
  Nachtlicht,
  Neerslag,
  Paard,
  Piramide,
  Rivier,
  Rook,
  Rots,
  Schuim,
  Soldaat,
  Sokkel,
  TekstVlak,
  Vuur,
  Zee,
  Zon,
  Zuil,
} from '../watals/Decor';
import { AFGEVAARDIGDE, ARMEN_GEKRUIST, Blok, BRONS, Figuur, GIDS, JOSEPHINE, Kroon, NAPOLEON, NAPOLEON_KROONMANTEL, omhoog, PAUS, Rol, Verrekijker, wijs, type Kleding, type V3 } from '../watals/Figuur';
import { ease, FPS, kaartCamera, lin, NAP, Shot, type KaartStand } from './basis';
import { Kaarttafel, opKaart, Speld, type Stand } from './Kaarttafel';
import { Bastille, Driekleur, Invalides, LangAfsluiter, Meetlat, Route, Schilderijlijst, Spotprent, Zeilschip } from './LangDecor';
import { JaarLabel, LangTeller } from './LangHud';
import timing from './napoleon-timing.json';

/** Elke scène krijgt `van` (begin van de shot in seconden) om latere zinnen lokaal te timen. */
export type ScèneProps = { van: number };
const lok = (zin: number, van: number) => ((timing as { start: number }[])[zin].start - van) * FPS;

/* ---------- rijken op de kaart (moderne grenzen, benadering) ---------- */
export const RIJK_1796: Record<string, Stand> = { France: 'rijk' };
export const RIJK_1797: Record<string, Stand> = { France: 'rijk', Belgium: 'rijk', Netherlands: 'bond', Italy: 'bond', Switzerland: 'bond' };
export const RIJK_1810: Record<string, Stand> = {
  France: 'rijk', Belgium: 'rijk', Netherlands: 'rijk', Luxembourg: 'rijk', Italy: 'rijk', Croatia: 'rijk', Slovenia: 'rijk',
  Germany: 'bond', Poland: 'bond', Switzerland: 'bond', Spain: 'bond', Denmark: 'bond', Austria: 'bond',
  'United Kingdom': 'vijand', Russia: 'vijand', Portugal: 'vijand',
};
const VIJANDEN_1814: Record<string, Stand> = {
  France: 'rijk', 'United Kingdom': 'vijand', Russia: 'vijand', Germany: 'vijand', Austria: 'vijand', Portugal: 'vijand', Spain: 'vijand', Sweden: 'vijand', Poland: 'vijand',
};
const CODE_LANDEN: Record<string, Stand> = { France: 'rijk', Belgium: 'bond', Luxembourg: 'bond', Netherlands: 'bond', Italy: 'bond', Spain: 'bond', Portugal: 'bond', Poland: 'bond', Romania: 'bond' };

const KaartLicht = () => (
  <>
    <Lucht boven="#2A2018" horizon="#3A2A1E" />
    <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
    <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
  </>
);

const KaartShot = ({ a, b, pc = [0, 110], van, naar, p, jaar, sub, over, children }: { a: KaartStand; b: KaartStand; pc?: [number, number]; van: Record<string, Stand>; naar?: Record<string, Stand>; p?: number; jaar?: string; sub?: string; over?: React.ReactNode; children?: React.ReactNode }) => {
  const f = useCurrentFrame();
  const { kijk, pos } = kaartCamera(a, b, ease(f, pc[0], pc[1], 0, 1));
  return (
    <Shot focus={kijk} scherpte={2.2} over={<>{jaar && <JaarLabel jaar={jaar} sub={sub} />}{over}</>}>
      <KaartLicht />
      <Camera pos={pos} kijk={kijk} fov={36} />
      <Kaarttafel van={van} naar={naar} p={p} />
      {children}
    </Shot>
  );
};
const KleinNap = ({ r = 0 }: { r?: number }) => <Figuur {...NAP} scale={0.22} rotation={[0, r, 0]} pose={ARMEN_GEKRUIST} />;

/* ---------- de Revolutie ---------- */

export const N11_Ontploft = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, -2]} scherpte={3} mist={['#2A1410', 12, 60]}>
      <Lucht boven="#140C12" horizon="#7A2E1A" />
      <Camera pos={[ease(f, 0, 75, 2.4, 1.6), 2.4, ease(f, 0, 75, 9, 7.6)]} kijk={[0, 2.2, -2]} fov={36} />
      <Nachtlicht />
      <hemisphereLight args={['#FF7A3A', '#1A0E0A', 0.5]} />
      <Grond kleur="#2A1E18" />
      <Bastille position={[0, 0, -18]} />
      <Vuur position={[-4, 0, -12]} t={t} grootte={1.6} />
      <Vuur position={[5, 0, -13]} t={t + 2} grootte={1.8} />
      <group position={[-6, 0, -3]}>
        <Menigte n={11} x0={0} t={t} juich />
      </group>
      {[-3, 0.5, 3.5].map((x, i) => <Fakkel key={i} position={[x, 0, -2.4]} t={t + i} />)}
      <Driekleur position={[1.5, 0, -2.8]} t={t} hoogte={4} />
    </Shot>
  );
};

export const N12_Bastille = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, -6]} scherpte={2.5} mist={['#C9B48E', 20, 100]} over={<JaarLabel jaar="1789" sub="the Revolution" />}>
      <Lucht boven="#8FAAC8" horizon="#E6D6B4" />
      <Camera pos={[ease(f, 0, 210, 6, 3.5), ease(f, 0, 210, 3.6, 3.0), ease(f, 0, 210, 12, 9.5)]} kijk={[0, 3.4, -8]} fov={36} />
      <Daglicht zon={[8, 14, 8]} />
      <Grond kleur="#9A8A6A" />
      <Bastille position={[0, 0, -16]} />
      {[0, 1, 2].map((r) => (
        <group key={r} position={[-8, 0, -6 + r * 1.6]}>
          <Menigte n={14} x0={0} t={t + r} juich />
        </group>
      ))}
      <Driekleur position={[-2, 0, -4]} t={t} hoogte={5} />
      <Driekleur position={[4, 0, -3]} t={t + 1} hoogte={4.4} />
    </Shot>
  );
};

export const N13_KaartToulon = () => (
  <KaartShot
    a={{ lon: 3, lat: 47, hoogte: 20, afst: 12 }}
    b={{ lon: 5.9, lat: 43.3, hoogte: 6, afst: 6, dx: 1.5 }}
    van={RIJK_1796}
    jaar="1793"
    sub="Toulon"
  >
    <Speld lon={5.93} lat={43.12} kleur="#B3312B" />
    <group position={opKaart(5.6, 42.6, 0.05)} rotation={[0, 0.3, 0]}>
      <Zeilschip schaal={0.1} vlag="#B3312B" />
    </group>
    <group position={opKaart(6.3, 42.7, 0.05)} rotation={[0, -0.2, 0]}>
      <Zeilschip schaal={0.1} vlag="#B3312B" />
    </group>
  </KaartShot>
);

export const N14_Toulon = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schotA = f >= 18 ? lin(f, 18, 48, 0.02, 1) : 0;
  const schotB = f >= 70 ? lin(f, 70, 100, 0.02, 1) : 0;
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={3} mist={['#9A5A3A', 14, 90]}>
      <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
      <Zon position={[-60, 5, -100]} grootte={12} kleur="#FFC07A" />
      <Camera pos={[ease(f, 0, 150, 2.0, 1.2), 2.5, ease(f, 0, 150, 8.4, 7.2)]} kijk={[0.1, 2.3, -0.6]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.5]} />
      <Grond kleur="#4A3424" />
      <Kanon position={[-1.9, 0, -2.0]} rotation={[0, Math.PI / 2, 0]} schot={schotA} />
      <Kanon position={[-3.0, 0, -4.8]} rotation={[0, Math.PI / 2 - 0.1, 0]} schot={schotB} />
      <group position={[-40, -0.8, -24]} rotation={[0, 1.2, 0]}>
        <Zeilschip vlag="#B3312B" brand t={t} schaal={1.4} />
      </group>
      <Vuur position={[-38, 2, -22]} t={t} grootte={2.2} />
      <Soldaat tijd="1800" position={[-1.6, 0, -3.4]} rotation={[0, -Math.PI / 2, 0]} t={t} />
      <Figuur {...NAP} position={[0.7, 0, 0.2]} rotation={[0, -1.15, 0]} pose={{ armR: wijs(ease(f, 5, 20, 0.2, 1.5)), wenk: 0.6, mond: f > 10 && f < 40 && Math.floor(f / 5) % 2 ? 'open' : 'dicht' }} />
    </Shot>
  );
};

export const N15_Generaal = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const wissel = lok(16, van);
  return (
    <Shot
      focus={[0, 2.1, 0]}
      scherpte={4}
      mist={['#C9B48E', 12, 60]}
      over={f < wissel ? <LangTeller label="Rank" waarde="General" pil="brigadier, 1793" /> : <LangTeller label="Age" waarde="24" />}
    >
      <Lucht boven="#94B4D2" horizon="#EAD8B2" />
      <Camera pos={[ease(f, 0, 90, 1.6, 0.9), ease(f, 0, 90, 2.2, 2.25), ease(f, 0, 90, 6.4, 4.8)]} kijk={[0, 2.2, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} />
      <Grond kleur="#9AA06A" />
      <Leger tijd="1800" rijen={2} kolommen={9} position={[0, 0, -7]} t={t} zwaai />
      <Driekleur position={[-2.2, 0, -2]} t={t} />
      <Figuur {...NAP} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'dicht', wenk: 0.3 }} />
    </Shot>
  );
};

const Paleis = ({ z = -20 }: { z?: number }) => (
  <group position={[0, 0, z]}>
    <Blok p={[0, 4, 0]} s={[22, 8, 2]} c="#E6DCC8" />
    <Blok p={[0, 8.5, 0]} s={[23, 1, 2.4]} c="#D9CDB6" />
    {Array.from({ length: 9 }, (_, i) => <Zuil key={i} position={[-9 + i * 2.25, 0, 1.4]} h={7.6} />)}
  </group>
);

export const N17_Royalisten = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 150, 0, -3);
  return (
    <Shot focus={[0, 1.8, z - 2]} scherpte={2.5} mist={['#B8AE98', 15, 80]} over={<JaarLabel jaar="1795" sub="Paris" />}>
      <Lucht boven="#9AA8B8" horizon="#DED4BE" />
      <Camera pos={[ease(f, 0, 150, 4.5, 3.6), 3.4, 8]} kijk={[0, 2, -4]} fov={36} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.6} />
      <Grond kleur="#B5A88C" />
      <Paleis />
      {[0, 1, 2, 3].map((r) => (
        <group key={r} position={[-7, 0, z - r * 1.4]}>
          <Menigte n={13} x0={0} t={t + r} />
        </group>
      ))}
      {[-4, 3].map((x, i) => (
        <Blok key={i} p={[x, 3.2, z - 1]} s={[1.4, 0.9, 0.03]} c="#F2EEE6" />
      ))}
    </Shot>
  );
};

export const N18_Kanonvuur = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schot = f >= 6 ? lin(f, 6, 36, 0.02, 1) : 0;
  return (
    <Shot focus={[0, 1.8, 0]} scherpte={3} mist={['#A89C84', 10, 50]}>
      <Lucht boven="#8A96A6" horizon="#D6CCB6" />
      <Camera pos={[3.6, 2.0, ease(f, 0, 60, 5.6, 5.0)]} kijk={[-0.4, 1.6, -1.4]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.5} />
      <Grond kleur="#B5A88C" />
      <Paleis z={-14} />
      <Kanon position={[-0.6, 0, -1.2]} rotation={[0, 0, 0]} schot={schot} />
      <Figuur {...NAP} position={[1.4, 0, 0.4]} rotation={[0, -0.5, 0]} pose={{ armR: wijs(1.5), wenk: 0.8, mond: 'open' }} />
      <Soldaat tijd="1800" position={[-1.8, 0, -0.4]} rotation={[0, 0.4, 0]} t={t} />
    </Shot>
  );
};

export const N19_Druivenhagel = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, 0]} scherpte={3} mist={['#B8B0A0', 6, 40]} over={<LangTeller label="Later called" waarde="a whiff of grapeshot" pil="by historians" />}>
      <Lucht boven="#9A9890" horizon="#CFC8B8" />
      <Camera pos={[ease(f, 0, 110, 0.8, 0.3), 2.2, ease(f, 0, 110, 7, 6)]} kijk={[0, 2.0, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.2} />
      <Grond kleur="#B5A88C" />
      <Paleis z={-12} />
      <Rook position={[-3, 0, -4]} t={t} kleur="#C8C2B6" />
      <Rook position={[3, 0, -5]} t={t + 3} kleur="#C8C2B6" />
      <Figuur {...NAP} position={[0, 0, 0]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.4 }} />
    </Shot>
  );
};

/* ---------- Italië en Egypte ---------- */

export const N20_Bruiloft = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={4} mist={['#3A2A1E', 8, 30]} over={<JaarLabel jaar="1796" sub="Paris" />}>
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 130, 0.8, 0.3), 2.3, ease(f, 0, 130, 7.4, 6.4)]} kijk={[0, 1.9, 0]} fov={34} />
      <Binnenlicht zon={[-4, 7, 5]} kleur="#FFD6A0" />
      <pointLight position={[1.6, 2.6, 1.2]} intensity={5} distance={7} color="#FFB060" />
      <Grond kleur="#6A4A34" />
      <Blok p={[0, 3, -2.2]} s={[12, 6, 0.3]} c="#C9B48E" />
      <Blok p={[0, 3.2, -2.03]} s={[1.6, 2.2, 0.04]} c="#4A5A7A" rough={0.3} />
      <Figuur {...NAP} position={[0.6, 0, 0]} rotation={[0, -0.8, 0]} pose={{ armR: { schouder: [-0.6, 0, -0.1], elleboog: [0, -0.3] }, mond: 'lach' }} />
      <Figuur kleding={JOSEPHINE} haar="bob" hoofddeksel="hoofdband" position={[-0.6, 0, 0.15]} rotation={[0, 0.8, 0]} pose={{ armL: { schouder: [-0.6, 0, 0.1], elleboog: [0, -0.3] }, mond: 'lach' }} />
      <Figuur kleding={{ ...NAPOLEON, tuniek: '#2F4A3A', laarzen: undefined }} position={[-1.7, 0, 0.6]} rotation={[0, 0.5, 0]} scale={0.66} pose={{ mond: 'lach' }} />
      <Figuur kleding={{ ...JOSEPHINE, tuniek: '#E8D2DA', rok: '#E8D2DA' }} haar="lang" position={[-2.5, 0, 0.2]} rotation={[0, 0.6, 0]} scale={0.6} pose={{ mond: 'lach' }} />
    </Shot>
  );
};

export const N21_NaarItalie = () => {
  const f = useCurrentFrame();
  return (
    <KaartShot a={{ lon: 5, lat: 47.5, hoogte: 15, afst: 10 }} b={{ lon: 7.5, lat: 45.5, hoogte: 10, afst: 8 }} pc={[0, 100]} van={RIJK_1796} jaar="1796" sub="to Italy">
      <Route punten={[[2.35, 48.86], [4.8, 45.76], [7.27, 43.7], [9.19, 45.46]]} p={ease(f, 10, 90, 0, 1)} kop={<KleinNap r={2.2} />} />
      <Speld lon={9.19} lat={45.46} kleur="#2F5FA8" />
    </KaartShot>
  );
};

export const N22_Haveloos = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.8, 0]} scherpte={3.5} mist={['#A6A08E', 10, 50]} over={<LangTeller label="Army of Italy" waarde="unpaid" />}>
      <Lucht boven="#8E98A4" horizon="#CFC6B0" />
      <Camera pos={[ease(f, 0, 60, 2.2, 1.6), 2.0, ease(f, 0, 60, 6.6, 6.0)]} kijk={[0, 1.7, -1]} fov={34} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.3} />
      <Grond kleur="#8A8460" />
      {[[-2.2, -1.2, 0.3], [-0.8, -2.2, -0.1], [0.9, -1.6, 0.2], [2.3, -2.4, -0.3], [0.2, -3.6, 0]].map(([x, z, r], i) => (
        <Soldaat key={i} tijd="1800" kleur="#3A4258" position={[x, 0, z]} rotation={[0.15, r, 0]} t={t * 0.3} />
      ))}
      <Figuur {...NAP} position={[0.4, 0, 1.0]} rotation={[0, Math.PI - 0.2, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Shot>
  );
};

export const N23_Lodi = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 60, 0, 1.2);
  return (
    <Shot focus={[0, 2.2, z]} scherpte={3} mist={['#D6D2BC', 18, 80]}>
      <Lucht boven="#94BCDD" horizon="#E8E0C6" />
      <Camera pos={[ease(f, 0, 60, 4.6, 4.0), 2.9, z + ease(f, 0, 60, 9.6, 8.6)]} kijk={[0, 2.2, z - 1]} fov={34} />
      <Daglicht zon={[8, 14, 6]} />
      <group rotation={[0, Math.PI / 2, 0]}>
        <Rivier t={t} breed={10} nacht={false} />
      </group>
      <Blok p={[0, 0.35, 0]} s={[3.2, 0.5, 26]} c="#BBAE96" rough={0.9} />
      {[-1.5, 1.5].map((x) => <Blok key={x} p={[x, 0.85, 0]} s={[0.2, 0.5, 26]} c="#A89B84" />)}
      <Bos n={30} straal={40} vrij={12} />
      <Leger tijd="1800" rijen={5} kolommen={2} afstand={1.15} position={[0, 0.6, -7.5]} t={t} zwaai />
      <Driekleur position={[0.8, 0.6, z - 0.4]} t={t} />
      <Figuur {...NAP} position={[0, 0.6, z]} rotation={[0, 0.15, 0]} pose={{ armR: omhoog(), mond: 'open' }} />
    </Shot>
  );
};

export const N23b_KaartItalie = () => {
  const f = useCurrentFrame();
  return (
    <KaartShot a={{ lon: 8, lat: 46, hoogte: 11, afst: 9 }} b={{ lon: 9, lat: 46.5, hoogte: 13, afst: 10 }} van={RIJK_1796} naar={RIJK_1797} p={ease(f, 5, 45, 0, 1)} jaar="1797" sub="peace with Austria" />
  );
};

export const N24_Vloot = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, -4]} scherpte={2} mist={['#E8C8A0', 30, 160]} over={<><JaarLabel jaar="1798" sub="to Egypt" /><LangTeller label="Scholars on board" waarde="100+" /></>}>
      <Lucht boven="#6E8CC0" horizon="#F6C98A" />
      <Zon position={[40, 6, -120]} grootte={12} kleur="#FFD890" />
      <Camera pos={[ease(f, 0, 150, 12, 9), ease(f, 0, 150, 4.5, 3.6), ease(f, 0, 150, 10, 8)]} kijk={[0, 3, -4]} fov={36} />
      <Daglicht zon={[20, 10, -10]} kleur="#FFD8A0" />
      <Zee t={t} grootte={260} />
      <Zeilschip position={[0, 0, -4]} rotation={[0, 0.5, 0]} t={t} />
      <Zeilschip position={[-10, 0, -16]} rotation={[0, 0.5, 0]} t={t + 1} />
      <Zeilschip position={[12, 0, -22]} rotation={[0, 0.5, 0]} t={t + 2} />
      <Zeilschip position={[-22, 0, -34]} rotation={[0, 0.5, 0]} t={t + 3} />
    </Shot>
  );
};

export const N25_Piramides = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3.0, 0]} scherpte={2.5} mist={['#EAD3A8', 30, 160]} over={<LangTeller label="Battle of the" waarde="Pyramids" pil="as he later told it" />}>
      <Lucht boven="#8DB3D2" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 170, 4.4, 3.2), ease(f, 0, 170, 2.6, 3.0), ease(f, 0, 170, 11.5, 10.0)]} kijk={[0, 3.0, 0]} fov={36} />
      <Daglicht zon={[10, 16, 10]} kracht={2.3} />
      <Grond kleur="#D9BE8A" />
      <Piramide position={[-14, 0, -70]} h={26} />
      <Piramide position={[12, 0, -85]} h={30} kleur="#D2AE72" />
      <Piramide position={[34, 0, -60]} h={14} />
      <Leger tijd="1800" rijen={3} kolommen={6} position={[-7, 0, -6]} rotation={[0, 0.3, 0]} t={t} />
      <Leger tijd="1800" rijen={3} kolommen={6} position={[7, 0, -7]} rotation={[0, -0.3, 0]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} pose={{ hoofd: [0, -0.8, 0], armR: wijs(ease(f, 10, 30, 0.3, 2.2)), mond: f > 30 && f < 120 && Math.floor(f / 5) % 2 ? 'open' : 'dicht' }} />} />
    </Shot>
  );
};

export const N26_Rosetta = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const op = ease(f, 5, 50, -1.2, 0.8);
  return (
    <Shot focus={[0, 1.2, 0]} scherpte={3.5} mist={['#E2C79A', 12, 60]} over={<LangTeller label="Found" waarde="the Rosetta Stone" pil="1799" />}>
      <Lucht boven="#9ABCE0" horizon="#F2DDB2" />
      <Camera pos={[ease(f, 0, 80, 2.2, 1.6), ease(f, 0, 80, 2.0, 1.7), ease(f, 0, 80, 5.6, 4.6)]} kijk={[0, 1.1, 0]} fov={34} />
      <Daglicht zon={[8, 14, 6]} kracht={2} />
      <Grond kleur="#D9BE8A" />
      <Blok p={[0, -0.2, 0]} s={[3, 0.5, 2]} c="#B89A68" />
      <group position={[0, op, -0.2]} rotation={[-0.15, 0.1, 0]}>
        <Blok p={[0, 0, 0]} s={[1.1, 1.4, 0.3]} c="#3A3836" rough={0.6} />
        {Array.from({ length: 18 }, (_, i) => (
          <Blok key={i} p={[0, 0.58 - i * 0.065, 0.16]} s={[0.92 - (i % 3) * 0.06, 0.018, 0.01]} c={i < 6 ? '#8A8478' : i < 12 ? '#7A7468' : '#9A9488'} />
        ))}
      </group>
      <Soldaat tijd="1800" position={[-1.6, 0, -0.8]} rotation={[0, 0.6, 0]} t={t * 0.2} />
      <Soldaat tijd="1800" position={[1.7, 0, -1.0]} rotation={[0, -0.6, 0]} t={t * 0.2} />
    </Shot>
  );
};

export const N27_Nijl = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, -6]} scherpte={2.5} mist={['#140C14', 20, 120]} over={<LangTeller label="The Nile" waarde="fleet destroyed" pil="Nelson, 1798" />}>
      <Lucht boven="#0B0F1E" horizon="#3A1A20" />
      <Camera pos={[ease(f, 0, 200, 10, 7), 4, ease(f, 0, 200, 12, 9)]} kijk={[0, 3, -6]} fov={36} />
      <Nachtlicht />
      <Zee t={t} kleur="#1A2638" grootte={260} />
      <Zeilschip position={[0, 0, -6]} rotation={[0, 0.8, 0]} t={t} brand />
      <Vuur position={[0, 2.5, -6]} t={t} grootte={2.6} />
      <Rook position={[0, 5, -7]} t={t} kleur="#2A2420" />
      <Zeilschip position={[-12, 0, -18]} rotation={[0, 0.8, 0]} t={t + 1} vlag="#B3312B" />
      <Zeilschip position={[14, 0, -20]} rotation={[0, -0.6, 0]} t={t + 2} vlag="#B3312B" />
    </Shot>
  );
};

/* ---------- Eerste Consul ---------- */

export const N28_Brumaire = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.1, 0.6]} scherpte={4} mist={['#3A2A1E', 8, 32]} over={<JaarLabel jaar="1799" sub="18 Brumaire" />}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 140, 1.4, 0.6), 2.6, ease(f, 0, 140, 9.6, 8.2)]} kijk={[0, 2.3, 0]} fov={34} />
      <Binnenlicht zon={[3, 8, 6]} kleur="#FFD3A0" />
      <Grond kleur="#7A5A40" />
      <Blok p={[0, 4, -5]} s={[18, 8, 0.4]} c="#BFA77E" />
      {[-6, -3, 0, 3, 6].map((x) => <Blok key={x} p={[x, 4, -4.75]} s={[0.6, 8, 0.1]} c="#D9C9A8" />)}
      <Soldaat tijd="1800" position={[-1.9, 0, -0.6]} rotation={[0, Math.PI, 0]} t={t} geweerOmhoog />
      <Soldaat tijd="1800" position={[2.0, 0, -0.8]} rotation={[0, Math.PI, 0]} t={t} geweerOmhoog />
      <Figuur {...NAP} position={[0, 0, 0.6]} rotation={[0, 0.05, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5 }} />
    </Shot>
  );
};

export const N29_Zaal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, -2]} scherpte={3} mist={['#3A2A1E', 10, 40]}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 70, 4, 3.4), 3.2, ease(f, 0, 70, 8, 7)]} kijk={[0, 2, -2.5]} fov={36} />
      <Binnenlicht zon={[3, 8, 6]} kleur="#FFD3A0" />
      <Grond kleur="#7A5A40" />
      <Blok p={[0, 4, -7]} s={[18, 8, 0.4]} c="#BFA77E" />
      {[-3, -1.6, -0.2, 1.2, 2.6, 4].map((x, i) => (
        <Figuur key={i} kleding={AFGEVAARDIGDE} position={[x, 0, -4 - lin(f, 0, 70, 0, 2) - (i % 2) * 0.6]} rotation={[0, Math.PI + (i - 2.5) * 0.25, 0]} pose={{ armL: omhoog(), mond: 'open' }} />
      ))}
      <Leger tijd="1800" rijen={1} kolommen={6} position={[0, 0, -0.5 - lin(f, 0, 70, 0, 1.2)]} rotation={[0, Math.PI, 0]} t={t} geweerOmhoog />
    </Shot>
  );
};

export const N30_Consul = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.6, 0]} scherpte={3} mist={['#E2D6C0', 14, 60]} over={<LangTeller label="Age" waarde="30" pil="First Consul" />}>
      <Lucht boven="#B8C9D6" horizon="#EADFCC" />
      <Camera pos={[ease(f, 0, 130, 2.6, 1.8), 2.4, ease(f, 0, 130, 8, 7)]} kijk={[0, 2.6, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 6]} kracht={1.8} />
      <Grond kleur="#C9BDA6" />
      {[-4, -2, 2, 4].map((x) => <Zuil key={x} position={[x, 0, -2.4]} h={7} />)}
      <Blok p={[0, 0.3, 0]} s={[3, 0.6, 2.2]} c="#8E1F2A" />
      <Driekleur position={[-1.8, 0.6, -0.6]} hoogte={3.6} t={f / FPS} />
      <Figuur {...NAP} position={[0, 0.6, 0]} rotation={[0, 0.1, 0]} pose={{ armR: wijs(1.1), wenk: 0.3 }} />
    </Shot>
  );
};

export const N31_Alpen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 110, -4, 2);
  return (
    <Shot focus={[x, 2, 0]} scherpte={2} mist={['#DCE2E8', 30, 170]} over={<JaarLabel jaar="1800" sub="the Alps" />}>
      <Lucht boven="#9FB8D0" horizon="#E8EDF1" />
      <Camera pos={[x + 5, 3.4, 9]} kijk={[x - 2, 2.2, 0]} fov={36} />
      <Daglicht zon={[-6, 14, 10]} kleur="#F4F0EA" kracht={1.8} />
      <Grond kleur="#EEF1F4" />
      <Berg position={[-22, 0, -40]} h={34} r={20} />
      <Berg position={[10, 0, -55]} h={44} r={24} kleur="#6E7078" />
      <Berg position={[40, 0, -35]} h={26} r={16} />
      <Leger tijd="1800" rijen={10} kolommen={2} afstand={1.0} position={[x - 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} t={t} />
      <Neerslag t={t} n={90} midden={[x, 0, 2]} breed={20} />
    </Shot>
  );
};

/** Steigerend paard (het schilderij). */
export const N32_Schilderij = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, 0]} scherpte={1.5} mist={['#5A5E66', 20, 90]} over={<Schilderijlijst titel="the famous painting" />}>
      <Lucht boven="#3A4252" horizon="#B8B0A0" />
      <Camera pos={[ease(f, 0, 100, 1.6, 1.0), 2.8, ease(f, 0, 100, 11.5, 10.5)]} kijk={[0.3, 3.1, 0]} fov={36} />
      <Daglicht zon={[-8, 10, 8]} kracht={2} />
      <Rots position={[0, -1.2, 0]} schaal={[4, 1.6, 3]} kleur="#6A645A" />
      <Berg position={[-16, -1, -40]} h={30} r={18} />
      <group position={[-0.9, 0.3, 0]} rotation={[0, 0, 0.5]}>
        <group position={[0.9, 0, 0]}>
          <Paard rotation={[0, -Math.PI / 2, 0]} kleur="#F2EEE6" manen="#D8D0C2" dek="#8E1F2A" t={t} ruiter={<Figuur kleding={{ ...NAPOLEON, cape: '#C8282E' }} hoofddeksel="steek" pose={{ armR: omhoog(), hoofd: [0, -0.8, 0] }} />} />
        </group>
      </group>
    </Shot>
  );
};

export const N33_Muilezel = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 110, -2.2, 1.4);
  return (
    <Shot focus={[x, 2.4, 0]} scherpte={3} mist={['#DCE2E8', 30, 170]} over={<LangTeller label="In reality" waarde="a mule" />}>
      <Lucht boven="#9FB8D0" horizon="#E8EDF1" />
      <Camera pos={[x + 5.5, 3.3, 8.8]} kijk={[x + 0.4, 2.9, 0]} fov={34} />
      <Daglicht zon={[-6, 14, 10]} kleur="#F4F0EA" kracht={1.8} />
      <Grond kleur="#EEF1F4" />
      <Berg position={[-18, 0, -40]} h={34} r={20} />
      <Berg position={[14, 0, -55]} h={44} r={24} kleur="#6E7078" />
      <Blok p={[0, 0.02, 0]} s={[60, 0.04, 2.2]} c="#C9CCD0" rough={1} />
      <Paard position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#7E766C" manen="#3A342E" dek="#1F3A6E" ezel t={t} loopt ruiter={<Figuur {...NAP} pose={{ ...ARMEN_GEKRUIST }} />} />
      <Figuur kleding={GIDS} position={[x + 1.9, 0, 0.3]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [-0.6, 0, 0.2], elleboog: [0, -0.4] }, armR: { schouder: [Math.sin(t * 7) * 0.4, 0, -0.08] } }} />
      <Neerslag t={t} n={90} midden={[x, 0, 1]} />
    </Shot>
  );
};

export const N34_Wetboek = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={3.5} mist={['#3A2A1E', 8, 30]} over={<JaarLabel jaar="1804" sub="the Civil Code" />}>
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 140, 2.4, 1.6), ease(f, 0, 140, 2.4, 2.2), ease(f, 0, 140, 5.8, 4.8)]} kijk={[-0.4, 1.7, 0]} fov={34} />
      <Binnenlicht zon={[-4, 8, 6]} kleur="#FFD6A0" />
      <Grond kleur="#5A4030" />
      <Blok p={[0, 3, -2.4]} s={[10, 6, 0.3]} c="#7A5A40" />
      <Blok p={[-0.9, 0.6, 0]} s={[0.5, 1.2, 0.5]} c="#6B4A2E" />
      <group position={[-0.9, 1.32, 0]} rotation={[-0.5, 0.2, 0]}>
        <TekstVlak regels={['CODE', 'CIVIL']} b={1.0} h={0.7} achter="#6E1C1C" voor="#E2BE58" fontPx={140} />
      </group>
      <Figuur {...NAP} position={[0.6, 0, -0.1]} rotation={[0, -0.6, 0]} pose={{ armR: wijs(1.0), wenk: 0.2 }} />
    </Shot>
  );
};

export const N35_KaartCode = () => {
  const f = useCurrentFrame();
  return (
    <KaartShot a={{ lon: 4, lat: 47, hoogte: 24, afst: 14 }} b={{ lon: 8, lat: 47, hoogte: 21, afst: 13 }} van={RIJK_1796} naar={CODE_LANDEN} p={ease(f, 5, 70, 0, 1)} over={<LangTeller label="Civil Code" waarde="still in use" pil="in many countries" />} />
  );
};

/* ---------- keizer ---------- */

export const N36_Kroning = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const k0 = lok(37, van);
  const kroonY = ease(f, k0, k0 + 60, 3.15, 2.56);
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.5, 0]} scherpte={3} mist={['#C9BCA2', 14, 60]} over={f < k0 ? <JaarLabel jaar="1804" sub="Notre-Dame" /> : undefined}>
      <Lucht boven="#6A5E50" horizon="#A8987E" />
      <Camera pos={[ease(f, 0, k0 + 60, 3.0, 0.9), ease(f, 0, k0 + 60, 3.4, 2.3), ease(f, 0, k0 + 60, 12, 6.6)]} kijk={[-0.3, 2.4, 0]} fov={36} />
      <Binnenlicht zon={[2, 14, 4]} kleur="#FFE6C0" />
      <pointLight position={[0, 6, 2]} intensity={10} distance={14} color="#FFE0B0" />
      <Kathedraal />
      <group position={[-4.5, 0, 3]} rotation={[0, Math.PI / 2, 0]}>
        <Menigte n={8} x0={-4} t={t} />
      </group>
      <group position={[4.5, 0, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <Menigte n={8} x0={-4} t={t + 1} />
      </group>
      <Blok p={[-1.9, 0.5, -1.6]} s={[1.2, 1.0, 1.0]} c="#8E1F2A" />
      <Blok p={[-1.9, 1.9, -2.05]} s={[1.2, 2.0, 0.2]} c="#B8912F" metal={0.5} rough={0.4} />
      <Figuur kleding={PAUS} haar="grijs" hoofddeksel="kap" position={[-1.9, 0.5, -1.45]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(0.9), wenk: -0.3 }} />
      <Figuur kleding={NAPOLEON_KROONMANTEL} hoofddeksel={f > k0 + 60 ? 'krans' : null} position={[0.2, 0, 0]} rotation={[0, -0.1, 0]} pose={f >= k0 ? { armL: omhoog(), armR: omhoog(), hoofd: [-0.1, 0, 0] } : { wenk: 0.2 }} />
      {f >= k0 && f <= k0 + 60 && <Kroon position={[0.2, kroonY, 0.02]} />}
    </Shot>
  );
};

export const N38_Austerlitz = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const zon = ease(f, 0, 90, 0.2, 1);
  return (
    <Shot focus={[0, 3.0, 0]} scherpte={2.5} mist={['#D9D2C2', lin(f, 0, 100, 6, 30), lin(f, 0, 100, 40, 140)]} over={<><JaarLabel jaar="1805" sub="Austerlitz" /><LangTeller label="Emperors beaten" waarde="2" /></>}>
      <Lucht boven="#8FB0CC" horizon="#F2E2C0" />
      <Zon position={[30, 20, -120]} grootte={14} kleur="#FFE08A" />
      <Camera pos={[ease(f, 0, 140, 6.4, 5.0), ease(f, 0, 140, 3.4, 3.2), ease(f, 0, 140, 8.6, 7.2)]} kijk={[0, 3.0, -1.5]} fov={36} />
      <Daglicht zon={[20, 16, -10]} kracht={0.8 + zon * 1.5} />
      <Grond kleur="#8E9A62" />
      <Heuvels kleur="#7A8A5A" z={-50} />
      <Leger tijd="1800" rijen={3} kolommen={10} kleur="#E9E4D8" position={[-9, -0.5, -18]} rotation={[0, 0.2, 0]} t={t} />
      <Leger tijd="1800" rijen={3} kolommen={10} kleur="#2F4A33" position={[9, -0.5, -22]} rotation={[0, -0.2, 0]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, -1.0, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} pose={{ armR: wijs(1.45), hoofd: [0, -0.7, 0] }} inHand={<Verrekijker />} />} />
    </Shot>
  );
};

export const N39_Trafalgar = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const flits = (k: number) => (Math.floor(f / 9 + k) % 5 === 0 ? 1 : 0);
  return (
    <Shot focus={[0, 3, -6]} scherpte={2} mist={['#9AA4AE', 20, 140]} over={<><JaarLabel jaar="1805" sub="Trafalgar" /><LangTeller label="At sea" waarde="Nelson wins" /></>}>
      <Lucht boven="#7E8A98" horizon="#C8CED6" />
      <Camera pos={[ease(f, 0, 150, 14, 10), 5, ease(f, 0, 150, 14, 11)]} kijk={[0, 3, -6]} fov={36} />
      <Daglicht zon={[-8, 12, 6]} kleur="#E6E8EA" kracht={1.4} />
      <Zee t={t} kleur="#355E7A" grootte={260} />
      {[[-6, -6, 0.2, '#B3312B'], [4, -8, -0.3, '#2F5FA8'], [-14, -16, 0.4, '#B3312B'], [12, -18, -0.5, '#2F5FA8'], [0, -24, 0.1, '#B3312B']].map(([x, z, r, v], i) => (
        <group key={i}>
          <Zeilschip position={[x as number, 0, z as number]} rotation={[0, (r as number) + Math.PI / 2, 0]} t={t + i} vlag={v as string} />
          {flits(i) > 0 && <Blok p={[(x as number) + 1.2, 1.2, z as number]} s={[0.6, 0.6, 0.6]} c="#FFD27A" emissive="#FF9A2A" />}
        </group>
      ))}
      <Rook position={[-6, 0, -34]} t={t} kleur="#C8C2B6" />
    </Shot>
  );
};

export const N40_Land = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <KaartShot a={{ lon: 10, lat: 49, hoogte: 26, afst: 14 }} b={{ lon: -2, lat: 53, hoogte: 13, afst: 9 }} pc={[60, 130]} van={RIJK_1796} naar={RIJK_1810} p={ease(f, 0, 50, 0, 1)} jaar="1810" sub="his empire">
      {[[-6, 50], [-8, 53.5], [-4, 56.5], [1.5, 51.4], [-10, 51]].map(([lon, lat], i) => (
        <group key={i} position={opKaart(lon, lat, 0.05)} rotation={[0, i, 0]}>
          <Zeilschip schaal={0.12} vlag="#B3312B" t={t + i} />
        </group>
      ))}
    </KaartShot>
  );
};

export const N42_Broers = () => {
  const f = useCurrentFrame();
  const kronen: [number, number][] = [[-3.7, 40.4], [5.3, 52.2], [14.25, 40.85], [9.5, 51.6]];
  return (
    <KaartShot a={{ lon: 6, lat: 47, hoogte: 22, afst: 13 }} b={{ lon: 6, lat: 47, hoogte: 19, afst: 12 }} van={RIJK_1810} over={<LangTeller label="Kings" waarde="his brothers" pil="Spain, Holland, Naples, Westphalia" />}>
      {kronen.map(([lon, lat], i) => {
        const s = ease(f, 8 + i * 12, 24 + i * 12, 0, 1.6);
        const p = opKaart(lon, lat, 0.75);
        return (
          <group key={i} position={p} scale={s}>
            <Kroon />
          </group>
        );
      })}
    </KaartShot>
  );
};

export const N43_Scheiding = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const wissel = lok(43, van) + 2.8 * FPS;
  const MARIE_LOUISE: Kleding = { ...JOSEPHINE, haar: '#B8864E', tuniek: '#F4EEF2', rok: '#F4EEF2' };
  if (f < wissel)
    return (
      <Shot focus={[0, 2.1, 0]} scherpte={4.5} mist={['#241A14', 6, 22]}>
        <Lucht boven="#1E1610" horizon="#3A2A1E" />
        <Camera pos={[1.6, 2.5, ease(f, 0, wissel, 7.4, 6.6)]} kijk={[0, 2.2, 0]} fov={32} />
        <Binnenlicht zon={[4, 6, 6]} kleur="#FFB870" />
        <pointLight position={[-1.5, 2.2, 1.5]} intensity={5} distance={7} color="#FFA050" />
        <Grond kleur="#4A3426" />
        <Blok p={[0, 3, -2.4]} s={[10, 6, 0.3]} c="#5A3E2E" />
        <Figuur {...NAP} position={[0.7, 0, -0.3]} rotation={[0, -0.25, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.35, 0, 0], wenk: -0.4 }} />
        <Figuur kleding={JOSEPHINE} haar="bob" hoofddeksel="hoofdband" position={[-0.6, 0, 0.4]} rotation={[0, 0.9, 0]} pose={{ armL: wijs(1.0), armR: wijs(1.1), wenk: -1, traan: lin(f, 15, wissel, 0, 1), mond: 'open' }} />
      </Shot>
    );
  const g = f - wissel;
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={4} mist={['#C9BCA2', 10, 40]} over={<LangTeller label="1810" waarde="Marie-Louise" pil="Archduchess of Austria" />}>
      <Lucht boven="#6A5E50" horizon="#A8987E" />
      <Camera pos={[ease(g, 0, 120, 1.2, 0.6), 2.3, ease(g, 0, 120, 7, 6.2)]} kijk={[0, 2.0, 0]} fov={34} />
      <Binnenlicht zon={[2, 12, 4]} kleur="#FFE6C0" />
      <Kathedraal lengte={4} />
      <Figuur {...NAP} position={[0.6, 0, 0]} rotation={[0, -0.7, 0]} pose={{ mond: 'dicht' }} />
      <Figuur kleding={MARIE_LOUISE} haar="lang" hoofddeksel="hoofdband" position={[-0.6, 0, 0.1]} rotation={[0, 0.7, 0]} pose={{ mond: 'lach' }} />
    </Shot>
  );
};

/* ---------- Rusland ---------- */

const getal = (n: number) => Math.round(n).toLocaleString('en-US');

export const N44_Rusland = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 150, 0, -3);
  return (
    <Shot focus={[0, 2.4, z]} scherpte={2} mist={['#C8CEC4', 25, 120]} over={<><JaarLabel jaar="1812" sub="Russia" /><LangTeller label="Army" waarde={getal(ease(f, 5, 120, 0, 600000))} pil="about" /></>}>
      <Lucht boven="#9EB6CC" horizon="#E2E4D6" />
      <Camera pos={[ease(f, 0, 150, 5.0, 4.0), ease(f, 0, 150, 5.0, 4.2), z - ease(f, 0, 150, 13, 11)]} kijk={[0, 2.9, z]} fov={36} />
      <Daglicht zon={[10, 14, 10]} />
      <Grond kleur="#9AA06A" />
      <Bos n={50} straal={60} vrij={16} />
      {[-4, 4].map((x) => [0, 1, 2].map((k) => <Leger key={`${x}${k}`} tijd="1800" rijen={5} kolommen={5} position={[x, 0, z + 2.5 + k * 8]} rotation={[0, Math.PI, 0]} t={t} />))}
      <Paard position={[0, 0, z]} rotation={[0, 0, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} loopt ruiter={<Figuur {...NAP} />} />
    </Shot>
  );
};

const HoutHuis = ({ position, r = 0 }: { position: V3; r?: number }) => (
  <group position={position} rotation={[0, r, 0]}>
    <Blok p={[0, 1, 0]} s={[2.4, 2, 2]} c="#6B4A2E" />
    <Blok p={[0, 2.3, 0]} s={[2.7, 0.6, 2.3]} c="#4F331F" />
  </group>
);

export const N45_Verbrand = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, -6]} scherpte={2.5} mist={['#5A3A2A', 12, 70]} over={<LangTeller label="Russians" waarde="burn it all" pil="and retreat" />}>
      <Lucht boven="#3A2E2E" horizon="#B85A2A" />
      <Camera pos={[ease(f, 0, 100, 3, 1.5), 2.6, ease(f, 0, 100, 9, 7.6)]} kijk={[0, 2, -6]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FF9A5A', '#2A1A12', 0.5]} />
      <Grond kleur="#3A3424" />
      {[[-5, -7, 0.2], [0, -9, -0.1], [5, -6, 0.3], [-2, -14, 0], [7, -13, -0.4]].map(([x, z, r], i) => (
        <group key={i}>
          <HoutHuis position={[x, 0, z]} r={r} />
          <Vuur position={[x, 2.4, z]} t={t + i} grootte={1.3} />
        </group>
      ))}
    </Shot>
  );
};

const Moskou = ({ brand = 0, t = 0 }: { brand?: number; t?: number }) => (
  <>
    <Koepelkerk position={[-6, 0, -22]} h={8} koepel="#C9A646" />
    <Koepelkerk position={[1, 0, -26]} h={10} koepel="#3E7A5A" />
    <Koepelkerk position={[8, 0, -20]} h={7} koepel="#2F5A9A" />
    {[-11, -3, 4, 11].map((x, i) => <Blok key={i} p={[x, 2, -16 - (i % 2) * 3]} s={[4, 4, 3]} c="#8A7A66" />)}
    {brand > 0 && [[-11, -16], [-3, -16], [4, -19], [11, -16], [-7, -22], [7, -24]].map(([x, z], i) => <Vuur key={i} position={[x, 4, z]} t={t + i} grootte={(1.1 + (i % 3) * 0.25) * brand} />)}
  </>
);

export const N46_Moskou = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.4, -2]} scherpte={2.5} mist={['#C8CEC4', 25, 120]} over={<JaarLabel jaar="1812" sub="Moscow" />}>
      <Lucht boven="#9EB6CC" horizon="#E2E4D6" />
      <Camera pos={[ease(f, 0, 70, 3.4, 2.6), 2.4, ease(f, 0, 70, 6.6, 6)]} kijk={[-0.6, 2.6, -8]} fov={38} />
      <Daglicht zon={[10, 14, 10]} />
      <Grond kleur="#9AA06A" />
      <Moskou />
      <Paard position={[0.4, 0, 0]} rotation={[0, 0.4, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} />} />
    </Shot>
  );
};

export const N47_Leeg = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2, -4]} scherpte={2.5} mist={['#B8BEB4', 15, 80]} over={<LangTeller label="Moscow" waarde="almost empty" />}>
      <Lucht boven="#9AA6B0" horizon="#D6D8CC" />
      <Camera pos={[0, 2.0, ease(f, 0, 50, 6, 5)]} kijk={[0, 2.4, -10]} fov={38} />
      <Daglicht zon={[-6, 12, 8]} kracht={1.3} />
      <Grond kleur="#A8A08A" />
      {[-5, 5].map((x) => [0, 1, 2, 3].map((k) => <Blok key={`${x}${k}`} p={[x, 2, -2 - k * 5]} s={[3, 4, 4]} c={['#C9B89A', '#B8A888', '#D2C2A4', '#BFAE90'][k]} />))}
      <Koepelkerk position={[0, 0, -26]} h={9} koepel="#3E7A5A" />
      <Figuur {...NAP} position={[0, 0, -4]} rotation={[0, Math.PI, 0]} scale={0.9} />
    </Shot>
  );
};

export const N48_Brand = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={3} mist={['#2A1410', 15, 80]}>
      <Lucht boven="#120C14" horizon="#8A3A1E" onder="#1A0E0A" />
      <Camera pos={[ease(f, 0, 50, 4.2, 3.6), 2.8, ease(f, 0, 50, 10, 9)]} kijk={[-0.4, 2.6, -6]} fov={38} />
      <Nachtlicht />
      <hemisphereLight args={['#FF8A4A', '#1A0E0A', 0.5]} />
      <Grond kleur="#2A1E18" />
      <Moskou brand={ease(f, 0, 25, 0.3, 1)} t={t} />
      <Figuur {...NAP} position={[0.4, 0, 0]} rotation={[0, Math.PI - 0.35, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Shot>
  );
};

export const N49_Wachten = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0.4, 1.6, 0]} scherpte={4} mist={['#1A120C', 6, 22]} over={<LangTeller label="Waiting" waarde="over a month" pil="no peace offer" />}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <Camera pos={[ease(f, 0, 110, 2.6, 2.0), 2.2, ease(f, 0, 110, 5.2, 4.4)]} kijk={[0.4, 1.6, 0]} fov={34} />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.4]} />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -2.4]} s={[10, 6, 0.3]} c="#5A2E24" />
      <Blok p={[0.9, 0.9, 0.4]} s={[1.6, 0.08, 0.9]} c="#6B4A2E" />
      <Blok p={[1.4, 1.06, 0.3]} s={[0.08, 0.24 - lin(f, 0, 110, 0, 0.14), 0.08]} c="#F2EAD8" />
      <Blok p={[1.4, 1.2 - lin(f, 0, 110, 0, 0.14), 0.3]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <pointLight position={[1.4, 1.5, 0.5]} intensity={6} distance={6} color="#FFA850" />
      <Figuur {...NAP} position={[0.6, 0, -0.4]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.2, 0, 0], wenk: 0.6 }} />
    </Shot>
  );
};

export const N50_Terug = () => {
  const f = useCurrentFrame();
  return (
    <KaartShot a={{ lon: 26, lat: 53, hoogte: 20, afst: 12 }} b={{ lon: 22, lat: 53, hoogte: 22, afst: 13 }} van={RIJK_1810} jaar="1812" sub="the retreat">
      <Route punten={[[2.35, 48.86], [13.4, 52.5], [21, 52.2], [27.5, 53.9], [37.6, 55.75]]} p={1} />
      <Route punten={[[37.6, 55.75], [27.5, 53.9], [21, 52.2]]} p={ease(f, 5, 90, 0, 1)} kleur="#F2F4F8" kop={<KleinNap r={-1.6} />} />
      <Speld lon={37.6} lat={55.75} kleur="#B3312B" />
    </KaartShot>
  );
};

export const N51_Winter = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, 0]} scherpte={2.5} mist={['#B8C0CA', 6, 40]} over={<LangTeller label="Enemies" waarde="cold, hunger, Cossacks" />}>
      <Lucht boven="#7E8A98" horizon="#C8CED6" />
      <Camera pos={[ease(f, 0, 130, 3, 2), 2.6, ease(f, 0, 130, 8, 7)]} kijk={[0, 2, -1]} fov={36} />
      <Daglicht zon={[-6, 10, 6]} kleur="#DDE4EE" kracht={1.0} omgeving={1.0} />
      <Grond kleur="#E6EAEE" />
      {[-2.2, -1.1, 0.4, 1.6, 2.6, -0.4].map((x, i) => (
        <Soldaat key={i} tijd="1800" position={[x, 0, -0.6 - (i % 3) * 1.4]} rotation={[0.2, (i % 2 ? 0.2 : -0.2), 0]} t={t * 0.3} />
      ))}
      {[-8, -5, -11].map((x, i) => (
        <Paard key={i} position={[x + lin(f, 0, 130, 0, 3), 0, -9 - i]} rotation={[0, -Math.PI / 2, 0]} kleur="#3A2A20" dek="#8E1F2A" t={t + i} loopt ruiter={<Figuur kleding={{ huid: '#D9A57A', haar: '#2A1E16', tuniek: '#2A3A2A', schoenen: '#1A1410', cape: '#8E1F2A', benen: '#1A1410' }} hoofddeksel="kap" baard pose={{ armR: wijs(1) }} />} />
      ))}
      <Neerslag t={t} n={200} midden={[0, 0, 1]} breed={18} />
    </Shot>
  );
};

export const N52_Terugkomst = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.1, 0]} scherpte={3} mist={['#B8C0CA', 8, 45]} over={<LangTeller label="Came home" waarde={getal(ease(f, 5, 110, 600000, 100000))} pil="estimates vary" />}>
      <Lucht boven="#7E8A98" horizon="#C8CED6" />
      <Camera pos={[ease(f, 0, 130, 2.4, 1.8), 2.6, ease(f, 0, 130, 7.0, 6.0)]} kijk={[0, 2.4, 0]} fov={34} />
      <Daglicht zon={[-6, 10, 6]} kleur="#DDE4EE" kracht={1.0} omgeving={1.0} />
      <Grond kleur="#E6EAEE" />
      {[-2.2, 1.2, 2.3].map((x, i) => <Soldaat key={i} tijd="1800" position={[x, 0, -1.4 - (i % 3) * 1.6]} rotation={[0.18, i % 2 ? 0.15 : -0.2, 0]} t={t * 0.4} />)}
      <Figuur {...NAP} position={[0, 0, 0]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.3, 0, 0], wenk: -0.6 }} />
      <Neerslag t={t} n={170} midden={[0, 0, 1]} />
    </Shot>
  );
};

/* ---------- Elba en Waterloo ---------- */

export const N53_Vijanden = () => {
  const f = useCurrentFrame();
  return <KaartShot a={{ lon: 10, lat: 50, hoogte: 26, afst: 15 }} b={{ lon: 6, lat: 48, hoogte: 20, afst: 12 }} van={RIJK_1810} naar={VIJANDEN_1814} p={ease(f, 0, 45, 0, 1)} jaar="1814" />;
};

export const N54_Elba = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const wissel = 3.0 * FPS;
  if (f < wissel)
    return (
      <KaartShot a={{ lon: 6, lat: 47, hoogte: 14, afst: 9 }} b={{ lon: 9, lat: 44, hoogte: 9, afst: 6 }} van={VIJANDEN_1814} jaar="1814" sub="exile">
        <Route punten={[[2.35, 48.86], [5.4, 43.3], [10.3, 42.8]]} p={ease(f, 5, wissel - 5, 0, 1)} kop={<KleinNap r={2.4} />} />
        <Speld lon={10.3} lat={42.8} kleur="#B3312B" />
      </KaartShot>
    );
  const g = f - wissel;
  void van;
  return (
    <Shot focus={[0, 1.6, 0]} scherpte={2.5} mist={['#E2E4DA', 30, 140]} over={<LangTeller label="Exiled to" waarde="Elba" />}>
      <Lucht boven="#7FAED8" horizon="#EBE2CC" />
      <Camera pos={[ease(g, 0, 60, 8, 6.4), ease(g, 0, 60, 4.6, 3.6), ease(g, 0, 60, 12, 9.6)]} kijk={[0, 1.4, 0]} fov={34} />
      <Daglicht zon={[10, 14, 8]} />
      <Zee t={t} grootte={220} />
      <Rots position={[0, -1.4, -0.6]} schaal={[4.2, 1.6, 3.4]} kleur="#A8946E" />
      <Rots position={[-2.6, -0.8, -2.2]} schaal={[2, 2, 2]} kleur="#8E7C5E" />
      <Blok p={[-1.4, 1.1, -2.2]} s={[1.4, 1.2, 1.4]} c="#5D7A3E" />
      <Schuim punten={[[3.6, 0, 1], [-3.8, 0, 1.4], [2, 0, 2.8], [-1.5, 0, 2.9], [4, 0, -1.5]]} t={t} />
      <Figuur {...NAP} position={[0.4, 0.05, 0.4]} rotation={[0, 0.6, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Shot>
  );
};

export const N55_Ontsnapping = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2, -4]} scherpte={2.5} mist={['#141A2A', 20, 120]} over={<JaarLabel jaar="1815" sub="the escape" />}>
      <Lucht boven="#0B0F1E" horizon="#28304A" />
      <mesh position={[18, 22, -100]}>
        <circleGeometry args={[4, 24]} />
        <meshBasicMaterial color="#F2EEDC" fog={false} />
      </mesh>
      <Camera pos={[ease(f, 0, 70, 8, 6), 3, ease(f, 0, 70, 10, 8)]} kijk={[0, 2, -4]} fov={36} />
      <Nachtlicht />
      <Zee t={t} kleur="#1A2638" grootte={220} />
      <Rots position={[-16, -2, -30]} schaal={[8, 4, 6]} kleur="#3A3428" />
      <Zeilschip position={[lin(f, 0, 70, -2, 2), 0, -4]} rotation={[0, -Math.PI / 2, 0]} t={t} schaal={0.6} />
    </Shot>
  );
};

/** Laffrey: gericht → hij loopt op ze af met open armen → ze lopen over. */
export const N56_Laffrey = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = lok(57, van);
  const om = lok(58, van);
  const dicht = loop + 5 * FPS;
  const over = f >= om;
  const armen = ease(f, loop + 60, loop + 90, 0.1, 1.1);
  const close = f >= dicht && f < om;
  return (
    <Shot
      focus={close ? [0, 2.1, -0.8] : [0, 2.0, -2]}
      scherpte={close ? 4 : 3}
      mist={['#C9C6B4', 12, 60]}
      over={f < loop ? <LangTeller label="Near Grenoble" waarde="a regiment" pil="sent to stop him" /> : close ? <LangTeller label="As the story goes" waarde={'"here I am"'} /> : over ? <LangTeller label="The regiment" waarde="joins him" /> : undefined}
    >
      <Lucht boven="#A6B8C8" horizon="#E2DDC8" />
      {close ? (
        <Camera pos={[1.6, 2.2, -4.2]} kijk={[0, 2.1, -0.6]} fov={34} />
      ) : (
        <Camera pos={[ease(f, 0, om + 60, 7.4, 5.4), 2.9, ease(f, 0, om + 60, 2.0, 1.0)]} kijk={[0, 2.0, -2.2]} fov={36} />
      )}
      <Daglicht zon={[-6, 12, 8]} />
      <Grond kleur="#8E9A62" />
      <Blok p={[0, 0.02, -2]} s={[5, 0.04, 40]} c="#B5A88C" rough={1} />
      <Heuvels kleur="#7E8A6A" z={-50} />
      <Leger tijd="1800" rijen={2} kolommen={6} position={[0, 0, -6]} t={t} geweerOmhoog={!over} zwaai={over} />
      <Figuur
        {...NAP}
        position={[0, 0, ease(f, loop, loop + 120, 1.5, -1.0)]}
        rotation={[0, Math.PI, 0]}
        pose={{ armL: { schouder: [-0.3, 0, armen], elleboog: [0, -0.1] }, armR: { schouder: [-0.3, 0, -armen], elleboog: [0, -0.1] }, mond: close && Math.floor(f / 5) % 2 ? 'open' : 'dicht' }}
      />
    </Shot>
  );
};

export const N59_HonderdDagen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.6, -2]} scherpte={2.5} mist={['#C9B48E', 20, 100]} over={<LangTeller label="Back in power" waarde={`${Math.round(ease(f, 5, 55, 0, 100))} days`} pil="the Hundred Days" />}>
      <Lucht boven="#8FAAC8" horizon="#E6D6B4" />
      <Camera pos={[ease(f, 0, 60, 4, 3), 3, ease(f, 0, 60, 10, 9)]} kijk={[0, 2.6, -3]} fov={36} />
      <Daglicht zon={[8, 14, 8]} />
      <Grond kleur="#B5A88C" />
      <Paleis z={-12} />
      <Blok p={[0, 3.4, -10.2]} s={[3, 0.3, 1.4]} c="#E6DCC8" />
      <Figuur {...NAP} position={[0, 3.55, -10]} rotation={[0, 0, 0]} pose={{ armR: omhoog() }} />
      {[0, 1].map((r) => (
        <group key={r} position={[-7, 0, -4 + r * 1.5]}>
          <Menigte n={13} x0={0} t={t + r} juich />
        </group>
      ))}
      <Driekleur position={[-3, 0, -6]} t={t} hoogte={4} />
    </Shot>
  );
};

export const N60_Waterloo = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const wissel = lok(60, van) + 4.4 * FPS;
  if (f < wissel)
    return (
      <Shot focus={[0, 2.9, 0]} scherpte={2.5} mist={['#7E827E', 10, 70]} over={<JaarLabel jaar="18 June 1815" sub="Waterloo" />}>
        <Lucht boven="#5A6068" horizon="#9A9C98" />
        <Camera pos={[ease(f, 0, wissel, 6, 4), ease(f, 0, wissel, 4, 3.4), ease(f, 0, wissel, 13, 11)]} kijk={[0, 2.6, -4]} fov={36} />
        <Daglicht zon={[-6, 12, 6]} kleur="#C8CCD0" kracht={1.0} omgeving={0.9} />
        <Grond kleur="#5A4E3A" />
        <Leger tijd="1800" rijen={3} kolommen={12} kleur="#B0262B" position={[-2, 0, -16]} t={t} />
        <Leger tijd="1800" rijen={3} kolommen={6} kleur="#1E2A44" position={[14 - lin(f, 0, wissel, 0, 4), 0, -12]} rotation={[0, -0.9, 0]} t={t} />
        <Rook position={[-16, 0, -34]} t={t} kleur="#8A8682" />
        <Rook position={[6, 0, -26]} t={t + 2} kleur="#8A8682" />
        <Leger tijd="1800" rijen={2} kolommen={8} position={[0, 0, -5]} rotation={[0, Math.PI, 0]} t={t} />
        <Paard position={[0, 0, 0]} rotation={[0, -1.2, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#1F3A6E" t={t} ruiter={<Figuur {...NAP} pose={{ hoofd: [0, -0.8, 0], armR: wijs(1.3) }} />} />
        <Neerslag t={t} n={170} regen midden={[0, 0, 3]} breed={20} />
      </Shot>
    );
  const g = f - wissel;
  return (
    <Shot focus={[0, 2.1, 0]} scherpte={4} mist={['#7E827E', 6, 40]} over={<LangTeller label="Waterloo" waarde="defeat" />}>
      <Lucht boven="#5A6068" horizon="#9A9C98" />
      <Camera pos={[ease(g, 0, 120, 1.4, 0.8), 2.2, ease(g, 0, 120, 5.4, 4.4)]} kijk={[0, 2.2, 0]} fov={34} />
      <Daglicht zon={[-6, 12, 6]} kleur="#C8CCD0" kracht={0.9} omgeving={0.9} />
      <Grond kleur="#5A4E3A" />
      <Rook position={[-10, 0, -24]} t={t} kleur="#8A8682" />
      <Figuur {...NAP} position={[0, 0, 0]} rotation={[0, 0.1, 0]} pose={{ hoofd: [0.35, 0, 0], wenk: -1 }} />
      <Neerslag t={t} n={170} regen midden={[0, 0, 2]} />
    </Shot>
  );
};

/* ---------- Sint-Helena ---------- */

export const N61_Bellerophon = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.6, 0]} scherpte={3} mist={['#9AA4AE', 20, 120]} over={<LangTeller label="Prisoner of" waarde="the British" />}>
      <Lucht boven="#7E8A98" horizon="#C8CED6" />
      <Camera pos={[ease(f, 0, 100, 4.6, 3.6), 3.6, ease(f, 0, 100, 7.4, 6.4)]} kijk={[0, 2.6, 0]} fov={36} />
      <Daglicht zon={[-8, 12, 6]} kleur="#E6E8EA" kracht={1.4} />
      <Zee t={t} kleur="#355E7A" grootte={220} />
      <group position={[0, -0.4, -1]} rotation={[0, Math.PI / 2, 0]}>
        <Blok p={[0, 0.5, 0]} s={[4, 1.4, 12]} c="#3A2618" />
        <Blok p={[0, 1.25, 0]} s={[3.8, 0.1, 11.6]} c="#A0724A" />
      </group>
      <Figuur {...NAP} position={[0, 0.9, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.2, 0, 0] }} />
      {[-1.4, 1.4].map((x) => <Soldaat key={x} tijd="1800" kleur="#B0262B" position={[x, 0.9, -0.6]} rotation={[0, x > 0 ? -0.4 : 0.4, 0]} t={t * 0.2} />)}
    </Shot>
  );
};

export const N62_Helena = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 1.8, 0]} scherpte={2} mist={['#A8B0B4', 30, 160]} over={<><JaarLabel jaar="1815" sub="Saint Helena" /><LangTeller label="South Atlantic" waarde="~1,900 km" pil="from the nearest coast" /></>}>
      <Lucht boven="#7A8A98" horizon="#C6CCCE" />
      <Camera pos={[ease(f, 0, 150, 13, 6), ease(f, 0, 150, 7, 2.6), ease(f, 0, 150, 24, 9)]} kijk={[0, ease(f, 0, 150, 0.5, 1.9), 0]} fov={34} />
      <Daglicht zon={[-8, 10, 6]} kleur="#E6E8EA" kracht={1.2} />
      <group position={[0, -6, 0]}>
        <Zee t={t} kleur="#355E7A" grootte={220} />
      </group>
      <Rots position={[0, -4.5, -1]} schaal={[5, 5, 5]} kleur="#5E5246" />
      <Blok p={[0, 0.02, -1]} s={[3.2, 0.06, 3.2]} c="#6E7A4E" rough={1} />
      <Rots position={[3.6, -3, 2.4]} schaal={[1.6, 3, 1.6]} kleur="#54493E" />
      <Figuur {...NAP} position={[0.2, 0.05, 0.4]} rotation={[0, 0.55, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.2, 0, 0], wenk: -0.5 }} />
    </Shot>
  );
};

export const N63_Dicteren = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2, 0]} scherpte={3.5} mist={['#2A1E16', 8, 30]} over={<LangTeller label="Six years" waarde="memoirs" pil="and quarrels with his jailer" />}>
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 180, 2.4, 1.4), 2.4, ease(f, 0, 180, 8, 7)]} kijk={[0, 2.0, 0]} fov={34} />
      <Binnenlicht zon={[-4, 7, 5]} kleur="#FFD6A0" />
      <Grond kleur="#5A4030" />
      <Blok p={[0, 3, -2.6]} s={[12, 6, 0.3]} c="#6A5A48" />
      <Blok p={[-1.4, 0.8, 0.2]} s={[1.4, 0.08, 0.8]} c="#6B4A2E" />
      <Figuur kleding={{ huid: '#E2B892', haar: '#4A3A2C', tuniek: '#3A3A44', benen: '#E6E0D2', schoenen: '#1A1410' }} position={[-1.4, 0, -0.5]} rotation={[0, 0.2, 0]} pose={{ armR: { schouder: [-0.8, 0, -0.2], elleboog: [0, -0.5] }, hoofd: [0.4, 0, 0] }} inHand={<Rol open={0.8} />} />
      <Figuur {...NAP} position={[0.6, 0, 0.2]} rotation={[0, -0.5, 0]} pose={{ armR: wijs(1.0), mond: Math.floor(f / 6) % 2 ? 'open' : 'dicht' }} />
      <Figuur kleding={{ huid: '#E8C09A', haar: '#8A6A4A', tuniek: '#B0262B', benen: '#E6E0D2', schoenen: '#1A1410', laarzen: '#1A1410' }} hoofddeksel="steek" position={[2.6, 0, -1.2]} rotation={[0, -0.9, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.8, mond: Math.floor(f / 8) % 2 ? 'open' : 'dicht' }} />
    </Shot>
  );
};

export const N64_Sterfbed = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.0, -0.6]} scherpte={4} mist={['#241A14', 6, 24]} over={<><JaarLabel jaar="1821" /><LangTeller label="Age" waarde="51" /></>}>
      <Lucht boven="#1E1610" horizon="#3A2A1E" />
      <Camera pos={[ease(f, 0, 100, 2.6, 2.2), ease(f, 0, 100, 6.4, 5.8), ease(f, 0, 100, 4.4, 3.8)]} kijk={[0, 0.8, -0.9]} fov={34} />
      <Binnenlicht zon={[4, 6, 6]} kleur="#FFB870" />
      <pointLight position={[1.5, 2.0, 1.5]} intensity={6} distance={7} color="#FFA050" />
      <Grond kleur="#4A3426" />
      <Blok p={[0, 3, -2.0]} s={[8, 6, 0.3]} c="#6A5A48" />
      <group>
        <Blok p={[0, 0.3, 0]} s={[1.2, 0.6, 2.8]} c="#6B4A2E" />
        <Blok p={[0, 0.66, 0]} s={[1.1, 0.14, 2.7]} c="#E9DFC8" rough={0.95} />
        <Blok p={[0, 0.8, -1.1]} s={[0.8, 0.16, 0.4]} c="#F2EAD8" rough={0.95} />
        <Blok p={[0, 0.76, 0.4]} s={[1.14, 0.06, 1.7]} c="#1F3A6E" rough={0.95} />
      </group>
      <group position={[0, 0.88, 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <Figuur kleding={NAPOLEON} pose={{ ogen: f > 70 ? 'dicht' : 'open', wenk: -0.4 }} />
      </group>
    </Shot>
  );
};

export const N65_Invalides = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 6, -8]} scherpte={2} mist={['#EADFC6', 30, 140]} over={<><JaarLabel jaar="1840" sub="Les Invalides, Paris" /><LangTeller label="Back in Paris" waarde="19 years later" /></>}>
      <Lucht boven="#7FAED8" horizon="#F1E3C6" />
      <Camera pos={[ease(f, 0, 220, 10, 7), ease(f, 0, 220, 2.4, 3.2), ease(f, 0, 220, 26, 21)]} kijk={[0, 6.6, -8]} fov={38} />
      <Daglicht zon={[8, 14, 10]} kracht={2.1} />
      <Grond kleur="#D6CAB2" />
      <Blok p={[0, 0.02, 2]} s={[24, 0.04, 16]} c="#E9E0CE" rough={0.8} />
      <Invalides position={[0, 0, -8]} />
    </Shot>
  );
};

export const N66_Lengte = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const teller = lok(67, van);
  return (
    <Shot focus={[0, 1.4, 0]} scherpte={3.5} mist={['#3A2A1E', 8, 30]} over={f >= teller ? <LangTeller label="Height" waarde="1.69 m" pil="average for his time" /> : undefined}>
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={[ease(f, 0, 160, 1.0, 0.4), 1.6, ease(f, 0, 160, 6.4, 5.6)]} kijk={[0, 1.4, 0]} fov={34} />
      <Binnenlicht zon={[-4, 8, 6]} kleur="#FFE0B8" />
      <Grond kleur="#6A5A48" />
      <Blok p={[0, 3, -0.6]} s={[10, 6, 0.3]} c="#C9B48E" />
      <Meetlat position={[0, 0, -0.42]} />
      <Figuur kleding={NAPOLEON} position={[-0.7, 0, 0]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, mond: f >= teller ? 'lach' : 'dicht' }} />
      <Figuur kleding={{ huid: '#E2B892', haar: '#6B4A30', tuniek: '#6B5236', benen: '#4A3A2C', schoenen: '#2A1E16' }} position={[0.7, 0, 0]} rotation={[0, -0.1, 0]} pose={{ mond: 'dicht' }} />
    </Shot>
  );
};

export const N68_Spotprent = () => {
  const f = useCurrentFrame();
  const spring = Math.abs(Math.sin(f / 4)) * 0.3;
  return (
    <Shot focus={[0, 1.6, 0]} scherpte={1.5} over={<Spotprent titel="as British cartoons drew him" />}>
      <Lucht boven="#E6D6B4" horizon="#E6D6B4" />
      <Camera pos={[0, 2.0, 6.4]} kijk={[0, 1.7, 0]} fov={34} />
      <Daglicht zon={[-4, 10, 8]} kleur="#FFF4E0" kracht={1.6} omgeving={1.6} />
      <Grond kleur="#E2D2AE" />
      <group position={[-0.8, spring, 0.4]}>
        <Figuur kleding={NAPOLEON} hoofddeksel="steek" scale={0.45} pose={{ armL: omhoog(), armR: omhoog(), mond: 'open', wenk: 1 }} />
      </group>
      <Figuur kleding={{ huid: '#E8B08A', haar: '#6B4A30', tuniek: '#B0262B', rok: '#4A3A2C', benen: '#E6E0D2', schoenen: '#1A1410', laarzen: '#1A1410' }} position={[1.0, 0, -0.4]} rotation={[0, -0.4, 0]} scale={1.5} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
    </Shot>
  );
};

export const N69_Krimp = () => {
  const f = useCurrentFrame();
  return <KaartShot a={{ lon: 10, lat: 49, hoogte: 26, afst: 14 }} b={{ lon: 5, lat: 48, hoogte: 22, afst: 13 }} van={RIJK_1810} naar={RIJK_1796} p={ease(f, 10, 70, 0, 1)} jaar="1804 - 1814" sub="his empire" />;
};

export const N70_Beeld = ({ van }: ScèneProps) => {
  const f = useCurrentFrame();
  const af = lok(71, van);
  return (
    <>
      <Shot focus={[0, 3.6, 0]} scherpte={2} mist={['#E8DCC4', 20, 90]} over={f < af ? <LangTeller label="Since 1804" waarde="Civil Code" pil="still French law" /> : undefined}>
        <Lucht boven="#7FAED8" horizon="#EFE3CC" />
        <Camera pos={[ease(f, 0, 240, 3.4, 2.4), ease(f, 0, 240, 1.8, 2.3), ease(f, 0, 240, 12.5, 10.5)]} kijk={[0, 4.1, 0]} fov={36} />
        <Daglicht zon={[6, 12, 8]} kracht={2.2} />
        <Grond kleur="#D6CAB2" />
        <Sokkel position={[0, 0, 0]} h={2.0}>
          <Figuur kleding={NAPOLEON} hoofddeksel="steek" o={BRONS} rotation={[0, 0.25, 0]} scale={1.2} pose={{ ...ARMEN_GEKRUIST }} />
        </Sokkel>
        <TekstVlak regels={['CODE', 'CIVIL']} b={1.2} h={0.9} achter="#7E6440" voor="#F1E4C4" position={[0, 1.1, 0.83]} fontPx={130} />
        {[-4, 4].map((x) => <Zuil key={x} position={[x, 0, -5]} h={7} />)}
        <Blok p={[0, 4, -8]} s={[16, 8, 0.6]} c="#E9DFCC" />
      </Shot>
      <Sequence from={Math.round(af)}>
        <LangAfsluiter />
      </Sequence>
    </>
  );
};
