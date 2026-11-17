import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import {
  Avondlicht,
  Banier,
  Bed,
  Binnenlicht,
  Bos,
  Camera,
  Daglicht,
  Fakkel,
  Galei,
  Grond,
  Heuvels,
  Leger,
  Lucht,
  Menigte,
  Nachtlicht,
  Paard,
  Rivier,
  Rook,
  Schuim,
  Sokkel,
  Strijdwagen,
  TekstVlak,
  Tent,
  Vuur,
  Zee,
  Zon,
  Zuil,
  Zuilengang,
  riemPunten,
} from '../watals/Decor';
import {
  ARMEN_GEKRUIST,
  Blok,
  BRONS,
  CAESAR,
  CALPURNIA,
  CLEOPATRA,
  Dolk,
  Figuur,
  GALLIËR,
  GOUD,
  Kroon,
  omhoog,
  PIRAAT,
  POMPEIUS,
  Rol,
  SENATOR,
  wijs,
  ZIENER,
  Zwaard,
  type Kleding,
  type Pose,
  type V3,
} from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { KaarttafelRome, opRome, SpeldRome, STAD, type MOStand, type StadNaam } from './KaarttafelRome';
import { GroteTitel, JaarLabel, LangTeller, ORANJE, SERIF } from './LangHud';
import { Citaat } from './SaladinScenes';

/**
 * Scènes voor "What if you were Julius Caesar?" (lange video #03). Decors + kleine scènes per zin.
 * Geen bloed en geen kruisen: de piraten worden alleen gevangen genomen in beeld, de moord is schaduwen,
 * dolken in de lucht en de toga over het gezicht.
 */

export { Citaat };

/* ---------------- personages ---------------- */

export { CAESAR, CALPURNIA, CLEOPATRA, GALLIËR, PIRAAT, POMPEIUS, SENATOR, ZIENER };
export const CAESAR_JONG: Kleding = { ...CAESAR, cape: undefined };
export const VADER: Kleding = { ...SENATOR, haar: '#3B2A1E', rand: '#6B2D5C' };
export const AURELIA: Kleding = { ...CALPURNIA, tuniek: '#3E5F7A', rok: '#3E5F7A', cape: '#C9D6E2' };
export const CORNELIA: Kleding = { ...CALPURNIA, tuniek: '#B5543A', rok: '#B5543A', cape: '#F2D6C2' };
export const JULIA: Kleding = { ...CALPURNIA, tuniek: '#E2C9A0', rok: '#E2C9A0', cape: '#F4EEE2' };
export const SULLA: Kleding = { ...SENATOR, haar: '#B9A27A', rand: '#A8322B', cape: '#A8322B' };
export const CRASSUS: Kleding = { ...SENATOR, haar: '#6B5A4A', rand: '#C9A646', cape: '#C9A646' };
export const BRUTUS: Kleding = { ...SENATOR, haar: '#2A1E16', rand: '#3E4F7A' };
export const OCTAVIANUS: Kleding = { ...SENATOR, haar: '#8A6A40', rand: '#6B2D5C' };
export const BURGER: Kleding = { huid: '#D9A57A', haar: '#4A3424', tuniek: '#8A6A4A', schoenen: '#3A2A1C', riem: '#5A4030' };
export const BURGER2: Kleding = { huid: '#C98F62', haar: '#2A1E16', tuniek: '#5A6A3A', schoenen: '#3A2A1C', riem: '#3A2A1C' };
export const PTOLEMAEUS: Kleding = { huid: '#C9925F', haar: '#141010', tuniek: '#F2EAD8', rand: '#3E5F9A', schoenen: '#B8912F', riem: '#D8A945' };
export const EGYPTENAAR: Kleding = { huid: '#B07A4E', haar: '#1A1210', tuniek: '#F2EAD8', schoenen: '#B8912F', riem: '#D8A945' };
export const LEGIONAIR: Kleding = { huid: '#D9A57A', haar: '#3B2A1E', tuniek: '#A8322B', borst: '#8D8A84', schoenen: '#4A3424', riem: '#4A3424' };
export const GLADIATOR: Kleding = { huid: '#C98F62', haar: '#2A1E16', tuniek: '#8A6A4A', borst: '#7E8088', schoenen: '#3A2A1C', riem: '#5A3B24' };
export const TOGA_TRIOMF: Kleding = { ...CAESAR, tuniek: '#6B2D5C', rok: '#6B2D5C', rand: '#D8A945', cape: '#D8A945' };

export const KR = { kleding: CAESAR, hoofddeksel: 'krans' as const };
export const D = 0.73; // dekhoogte van de galei

/** Camera van a naar b in `duur` frames: [x0, y0, z0, x1, y1, z1]. */
const camPos = (f: number, c: number[], duur = 160): V3 => {
  const p = ease(f, 0, duur, 0, 1);
  return [c[0] + (c[3] - c[0]) * p, c[1] + (c[4] - c[1]) * p, c[2] + (c[5] - c[2]) * p];
};

/* ---------------- decors ---------------- */

/** Romeinse stadsblokken (insulae) aan weerszijden van een straat langs de z-as. */
const Huizen = ({ z0 = -30, z1 = 8, x = 3.6, kleur = '#C9A27A' }: { z0?: number; z1?: number; x?: number; kleur?: string }) => (
  <>
    {[-1, 1].map((k) =>
      Array.from({ length: Math.ceil((z1 - z0) / 3.2) }, (_, i) => {
        const h = 4.5 + ((i * 7 + (k > 0 ? 3 : 0)) % 4) * 1.2;
        const z = z0 + i * 3.2;
        return (
          <group key={`${k}${i}`}>
            <Blok p={[k * (x + 1.5), h / 2, z]} s={[3, h, 3.1]} c={i % 3 ? kleur : '#B8906A'} rough={0.95} />
            <Blok p={[k * (x + 1.5), h + 0.15, z]} s={[3.3, 0.3, 3.3]} c="#9E4A2E" />
            {[1.6, 3.4].map((y) => <Blok key={y} p={[k * x - k * 0.02, y, z]} s={[0.04, 0.7, 0.6]} c="#2A1E16" />)}
            <Blok p={[k * x, 0.9, z + 1]} s={[0.05, 1.8, 1.0]} c="#4A3020" />
          </group>
        );
      }),
    )}
  </>
);

/** De Subura: smalle straat, rook, mensen. */
export const Straat = ({ children, over, avond = false, cam = [0.8, 2.2, 9, 0.3, 2.0, 6.5], kijk = [0, 1.6, 0] as V3, mensen = true }: { children?: ReactNode; over?: ReactNode; avond?: boolean; cam?: number[]; kijk?: V3; mensen?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={2.8} mist={avond ? ['#5A3A2A', 10, 50] : ['#C8B49A', 12, 60]} over={over}>
      <Lucht boven={avond ? '#3E2E3A' : '#9CBCD8'} horizon={avond ? '#D0784A' : '#E6D6BA'} />
      {avond ? <Avondlicht /> : <Daglicht zon={[-6, 14, 4]} kracht={1.6} />}
      <Grond kleur="#8A7A62" />
      <Blok p={[0, 0.02, -10]} s={[7, 0.04, 44]} c="#7A6A54" />
      <Huizen />
      {[-1, 1].map((k) => <Rook key={k} position={[k * 4, 6, -12 - k * 4]} t={t + k} kleur="#6A5E52" />)}
      {mensen && (
        <>
          <Figuur kleding={BURGER} position={[-2.2, 0, -3]} rotation={[0, 0.4, 0]} pose={{ armR: wijs(0.8) }} />
          <Figuur kleding={BURGER2} position={[2.4, 0, -6]} rotation={[0, -0.6, 0]} />
          <Figuur kleding={BURGER} haar="grijs" position={[1.8, 0, -10]} rotation={[0, -2.6, 0]} />
          <Blok p={[-2.6, 0.5, -1.6]} s={[1.2, 1.0, 0.8]} c="#7A5A3A" />
          {[0, 1, 2].map((i) => <Blok key={i} p={[-2.9 + i * 0.3, 1.1, -1.6]} s={[0.24, 0.2, 0.24]} c={['#C9A646', '#B5543A', '#5D8A40'][i]} />)}
        </>
      )}
      <Camera pos={camPos(f, cam)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** Het Forum: zuilen, wit marmer, zon. */
export const Forum = ({ children, over, cam = [4, 3, 13, 2.5, 2.6, 10], kijk = [0, 1.8, 0] as V3, avond = false }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; avond?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={2.4} mist={avond ? ['#8A5A4A', 20, 100] : ['#E8DCC4', 20, 100]} over={over}>
      <Lucht boven={avond ? '#4A2E4A' : '#8DB6DA'} horizon={avond ? '#E88A4A' : '#EFE3CC'} />
      {avond ? <Avondlicht /> : <Daglicht zon={[8, 14, 6]} bereik={22} />}
      <Grond kleur="#D8CCB4" />
      <group position={[0, 0, -9]}>
        <Blok p={[0, 0.4, 0]} s={[16, 0.8, 5]} c="#E2D6C0" />
        {Array.from({ length: 8 }, (_, i) => <Zuil key={i} position={[-7 + i * 2, 0.8, 1.6]} h={6} />)}
        <Blok p={[0, 7.2, 0.6]} s={[17, 0.8, 4]} c="#E9DFCC" />
        <Blok p={[0, 4, -1]} s={[16, 7, 0.6]} c="#DCD0B8" />
      </group>
      {[-9, 9].map((x) => <Zuil key={x} position={[x, 0, -2]} h={7} />)}
      <Camera pos={camPos(f, cam)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** Binnen: zuilengang (senaat, huis, paleis). */
export const Zaal = ({ children, over, cam = [2.6, 2.6, 7.6, 1.4, 2.3, 6.2], kijk = [0, 1.8, -0.5] as V3, donker = false, warm = false, lengte = 5 }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; donker?: boolean; warm?: boolean; lengte?: number }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3} mist={donker ? ['#1A120C', 6, 26] : warm ? ['#4A3020', 8, 34] : ['#D8CCB4', 10, 45]} over={over}>
      <Lucht boven={donker ? '#120C08' : '#C9BEA8'} horizon={donker ? '#2A1E14' : '#E6DCC8'} />
      {donker ? (
        <>
          <hemisphereLight args={['#6A5A48', '#1A120C', 0.35]} />
          <pointLight position={[1.5, 2.6, 1.5]} intensity={7} distance={8} color="#FFA050" />
        </>
      ) : warm ? (
        <Binnenlicht zon={[-4, 9, 3]} kleur="#FFC680" />
      ) : (
        <Daglicht zon={[-5, 12, 4]} kracht={1.7} />
      )}
      <Zuilengang lengte={lengte} breedte={8} h={6} />
      <Camera pos={camPos(f, cam, 150)} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** Een kamer bij lamplicht. */
export const Kamer = ({ children, over, kijk = [0, 1.4, 0] as V3, cam = [2.8, 2.2, 4.8, 2.2, 2.0, 4.0], licht = 1 }: { children?: ReactNode; over?: ReactNode; kijk?: V3; cam?: number[]; licht?: number }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3.6} mist={['#1A120C', 6, 20]} over={over}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#8A7A68', '#2A1E14', 0.85]} />
      <ambientLight intensity={0.55} color="#FFD8B0" />
      <Grond kleur="#4A3426" />
      <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#7A4A32" />
      <Blok p={[0, 1.0, -2.24]} s={[12, 2.0, 0.04]} c="#9E3A2A" />
      <Blok p={[1.8, 0.45, 0.4]} s={[0.6, 0.9, 0.6]} c="#5A3B24" />
      <Blok p={[1.8, 0.96, 0.4]} s={[0.2, 0.1, 0.12]} c="#8A6A3A" />
      <Blok p={[1.8, 1.05, 0.4]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <pointLight position={[1.8, 1.6, 0.6]} intensity={7 * licht} distance={8} color="#FFA850" />
      <Camera pos={camPos(f, cam, 150)} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** Buiten op het land: heuvels, bos, dag of nacht. */
export const Land = ({ children, over, nacht = false, groen = true, bos = true, cam = [5, 3, 13, 3, 2.6, 10], kijk = [0, 1.6, 0] as V3, rook = false, avond = false }: { children?: ReactNode; over?: ReactNode; nacht?: boolean; groen?: boolean; bos?: boolean; cam?: number[]; kijk?: V3; rook?: boolean; avond?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={2.4} mist={nacht ? ['#0E1220', 10, 50] : rook ? ['#8A7A6A', 8, 60] : avond ? ['#8A5A3A', 20, 110] : ['#C9D3B8', 18, 90]} over={over}>
      <Lucht boven={nacht ? '#0B0F1E' : avond ? '#4A2E3A' : rook ? '#8A7E70' : '#9EC1DB'} horizon={nacht ? '#242A44' : avond ? '#E07A4A' : rook ? '#C8AE8A' : '#E3E0C6'} />
      {nacht ? <Nachtlicht /> : avond ? <Avondlicht /> : <Daglicht zon={[8, 14, -6]} kracht={rook ? 1.4 : 2} />}
      <Grond kleur={groen ? '#7E9A4E' : '#BFA06A'} />
      <Heuvels kleur={nacht ? '#1E2430' : groen ? '#6E8A46' : '#A88A5A'} />
      {bos && <Bos n={40} straal={36} vrij={9} />}
      <Camera pos={camPos(f, cam)} kijk={kijk} fov={36} />
      {children}
      {rook && [-9, -3, 4, 10].map((x, i) => <Rook key={i} position={[x, 0, -12 - i]} t={t + i} kleur="#6A5E52" />)}
    </Shot>
  );
};

/** Op zee, met een galei. */
export const OpZee = ({ children, over, avond = false, cam = [10.5, 3.6, 4, 9.6, 3.0, 3], kijk = [0, 2.0, 1] as V3, schip = true, mast = true }: { children?: ReactNode; over?: ReactNode; avond?: boolean; cam?: number[]; kijk?: V3; schip?: boolean; mast?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={3} mist={avond ? ['#8A5A4A', 20, 140] : ['#DDD0B8', 20, 120]} over={over}>
      <Lucht boven={avond ? '#4E3159' : '#8FB9DC'} horizon={avond ? '#F08A3C' : '#E6D8BF'} />
      {avond ? <Avondlicht /> : <Daglicht zon={[-6, 12, 10]} />}
      {avond && <Zon position={[0, 4, -120]} grootte={14} kleur="#FFC77A" />}
      <Zee t={t} />
      {schip && <Galei deining={t * 0.9} mast={mast} />}
      {schip && <Schuim punten={riemPunten()} t={t} />}
      <Camera pos={camPos(f, cam, 150)} kijk={kijk} fov={30} />
      {children}
    </Shot>
  );
};

/** In een legertent bij lamplicht. */
export const InTent = ({ children, over, kijk = [0, 1.7, 0] as V3 }: { children?: ReactNode; over?: ReactNode; kijk?: V3 }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3.4} mist={['#2A1E14', 6, 25]} over={over}>
      <Lucht boven="#2E2218" horizon="#4A3626" />
      <Binnenlicht zon={[3, 6, 4]} kleur="#FFC98A" />
      <pointLight position={[-1.0, 2.0, 1.0]} intensity={5} distance={7} color="#FFA04A" />
      <Grond kleur="#5A4636" />
      <Blok p={[0, 2.5, -2.2]} s={[9, 5, 0.1]} c="#BFA77E" rough={0.95} />
      <Blok p={[-1.3, 0.85, 0.6]} s={[1.2, 0.08, 0.8]} c="#6B4A2E" />
      {[-1.8, -0.8].map((x) => <Blok key={x} p={[x, 0.42, 0.6]} s={[0.08, 0.84, 0.08]} c="#4F331F" />)}
      <Blok p={[-1.1, 0.95, 0.6]} s={[0.22, 0.12, 0.14]} c="#8A6A3A" />
      <Blok p={[-1.1, 1.06, 0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      <Camera pos={[1.3, 2.4, ease(f, 0, 150, 5.4, 4.6)]} kijk={kijk} fov={32} />
      {children}
    </Shot>
  );
};

/** Egyptisch paleis: zandkleurige zuilen, warm licht. */
export const Paleis = ({ children, over, cam = [1.0, 2.6, 5.4, 0.6, 2.4, 4.4], kijk = [0, 1.6, -1] as V3, brand = false }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; brand?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={3.4} mist={['#4A3020', 8, 34]} over={over}>
      <Lucht boven="#2E1E14" horizon="#6A4A2E" />
      <Binnenlicht zon={[-4, 9, 3]} kleur="#FFC680" />
      <pointLight position={[0, 3, -1]} intensity={4} distance={8} color="#FFB060" />
      <Grond kleur="#C9A57A" />
      <Blok p={[0, 3, -5]} s={[14, 6, 0.4]} c="#B8946A" />
      {[-3.4, -1.2, 1.2, 3.4].map((x) => <Zuil key={x} position={[x, 0, -4]} h={6} kleur="#D9B988" />)}
      {brand && [-2.5, 2.5].map((x, i) => <Vuur key={x} position={[x, 0, -3.4]} t={t + i} grootte={1.4} />)}
      <Camera pos={camPos(f, cam, 150)} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/* ---------------- kaart ---------------- */

type KS = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KS, b: KS, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opRome(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
export const VER: KS = { lon: 12, lat: 42, h: 26, a: 14 };
export const ks = (s: StadNaam, h = 8, a = 7, dx = 1.5): KS => ({ lon: STAD[s][0], lat: STAD[s][1], h, a, dx });

const RouteRome = ({ punten, p, kleur = ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opRome(lon, lat, 0.5));
  const lengtes = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[2] - pts[i][2]));
  const totaal = lengtes.reduce((x, y) => x + y, 0);
  const blokjes: V3[] = [];
  let d = 0;
  for (let i = 0; i < lengtes.length; i++) {
    for (let s = 0; s < lengtes[i]; s += 0.32) {
      if ((d + s) / totaal > p) break;
      const q = s / lengtes[i];
      blokjes.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q]);
    }
    d += lengtes[i];
  }
  let rest = p * totaal;
  let kopPos: V3 = pts[0];
  for (let i = 0; i < lengtes.length; i++) {
    if (rest <= lengtes[i]) {
      const q = rest / lengtes[i];
      kopPos = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q];
      break;
    }
    rest -= lengtes[i];
    kopPos = pts[i + 1];
  }
  return (
    <>
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.14, 0.06, 0.14]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

export type KaartProps = {
  van: Record<string, MOStand>;
  naar?: Record<string, MOStand>;
  wissel?: [number, number];
  cam?: [KS, KS];
  camDuur?: number;
  spelden?: [StadNaam, string][];
  route?: [number, number][];
  routeTijd?: [number, number];
  kop?: ReactNode;
  licht?: string[];
  over?: ReactNode;
};
export const Kaart = ({ van, naar, wissel = [20, 70], cam = [VER, VER], camDuur = 150, spelden = [], route, routeTijd = [10, 120], kop, licht, over }: KaartProps) => {
  const f = useCurrentFrame();
  const c = kaartCam(cam[0], cam[1], ease(f, 0, camDuur, 0, 1));
  const gloed = licht ? (Math.sin(f / 5) + 1) / 2 : 0;
  return (
    <Shot focus={c.kijk} scherpte={2} over={over}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={c.pos} kijk={c.kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <KaarttafelRome van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldRome key={s} lon={STAD[s][0]} lat={STAD[s][1]} kleur={k} />)}
      {route && <RouteRome punten={route} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={kop} />}
    </Shot>
  );
};
export const MiniCaesar = () => <Figuur kleding={CAESAR} hoofddeksel="krans" scale={0.24} rotation={[0, 0.4, 0]} />;
export const MiniSchip = () => <group scale={0.1}><Galei mast /></group>;
export const MiniPompeius = () => <Figuur kleding={POMPEIUS} scale={0.24} rotation={[0, -0.4, 0]} />;

/* ---------------- titels ---------------- */

/** Hoofdstukkaart (Romeins cijfer + titel), zoals de hoofdstukken bij de concurrent. */
export const HoofdstukKaart = ({ nr, titel }: { nr: string; titel: string }) => {
  const f = useCurrentFrame();
  const o = lin(f, 0, 10, 0, 1) * lin(f, 70, 85, 1, 0);
  const s = ease(f, 0, 14, 0.92, 1);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', opacity: o, transform: `scale(${s})` }}>
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 120, lineHeight: 1, color: '#F2C25A', WebkitTextStroke: '2px #4A2A0C', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.7))' }}>{nr}</div>
      <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 52, letterSpacing: 6, color: '#FFF4E0', textTransform: 'uppercase', textShadow: '0 3px 14px rgba(0,0,0,0.8)' }}>{titel}</div>
    </div>
  );
};

export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.006 : 0;
  return (
    <Shot focus={[0, 2.6, 0]} scherpte={3} mist={['#9A5A3A', 18, 110]} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="JULIUS CAESAR?" /> : undefined}>
      <Lucht boven="#3E2E52" horizon="#F0904A" />
      <Avondlicht />
      <Zon position={[-30, 6, -110]} grootte={12} kleur="#FFB070" />
      <Grond kleur="#7A7A4A" />
      <Heuvels kleur="#4A4A36" />
      <Camera pos={[1.6 + schok, 2.0 + schok, ease(f, 0, 60, 8.6, 7.6)]} kijk={[0, 2.7, 0]} fov={36} />
      <Leger rijen={3} kolommen={10} position={[0, 0, -9]} t={t} />
      <Banier position={[-2.6, 0, -2]} tekst t={t} />
      <Banier position={[2.8, 0, -2.6]} tekst t={t + 1} />
      <Paard position={[0, 0, 0.3]} rotation={[0, 0.3, 0]} kleur="#ECE6DA" manen="#CFC6B6" t={t} ruiter={<Figuur {...KR} pose={{ armR: omhoog(), hoofd: [0, -0.5, 0], wenk: 0.6 }} inHand={<Zwaard />} />} />
    </Shot>
  );
};

export const T5_Titel = () => {
  const f = useCurrentFrame();
  return (
    <Forum avond cam={[ease(f, 0, 1, 4.4, 4.4), 2.2, 9.6, 3.4, 2.0, 8.2]} kijk={[0, 3.6, 0]} over={<GroteTitel boven="THE LIFE OF" naam="JULIUS CAESAR" onder="from the backstreets of Rome to the Ides of March" />}>
      <Sokkel position={[0, 0, 0]} h={1.2}>
        <Figuur {...KR} rotation={[0, 0.5, 0]} pose={ARMEN_GEKRUIST} />
      </Sokkel>
    </Forum>
  );
};

/* ---------------- losse scènes ---------------- */

/** Een baby in een wieg, moeder ernaast. */
export const S_Geboorte = () => (
  <Kamer kijk={[-0.3, 1.2, -0.2]} cam={[2.2, 2.0, 4.4, 1.6, 1.9, 3.8]}>
    <Blok p={[0, 0.35, 0]} s={[1.0, 0.5, 0.6]} c="#8A6A3A" />
    <Blok p={[0, 0.62, 0]} s={[0.9, 0.06, 0.5]} c="#F2EAD8" />
    <Blok p={[0, 0.68, 0.05]} s={[0.32, 0.12, 0.2]} c="#E6B98E" />
    <Blok p={[0, 0.72, -0.12]} s={[0.2, 0.18, 0.18]} c="#E6B98E" />
    <Figuur kleding={AURELIA} haar="lang" position={[-0.9, 0, -0.5]} rotation={[0, 0.8, 0]} pose={{ mond: 'lach', armR: wijs(0.7) }} />
  </Kamer>
);

/** De naam in grote letters op een marmeren plaat. */
export const S_Naam = () => {
  const f = useCurrentFrame();
  return (
    <Forum cam={[0.4, 2.4, 8.6, 0.2, 2.4, 7.4]} kijk={[0, 2.4, 0]}>
      <TekstVlak regels={['GAIVS IVLIVS', 'CAESAR']} b={5} h={2.2} achter="#E9DFCC" voor="#6B2D5C" position={[0, 2.5, 0]} fontPx={58} />
      {void f}
    </Forum>
  );
};

/** Venus als gouden beeld, de familie kijkt omhoog. */
export const S_Venus = () => (
  <Zaal warm kijk={[0, 2.6, -1.6]} cam={[1.8, 1.8, 6.4, 1.0, 2.0, 5.2]}>
    <Sokkel position={[0, 0, -1.8]} h={1.2}>
      <Figuur kleding={CALPURNIA} o={GOUD} haar="lang" rotation={[0, 0.1, 0]} pose={{ armR: wijs(1.0) }} />
    </Sokkel>
    <Figuur kleding={VADER} position={[1.2, 0, 1.2]} rotation={[0, Math.PI + 0.4, 0]} pose={{ hoofd: [-0.3, 0, 0] }} />
    <Figuur kleding={CAESAR_JONG} position={[0.4, 0, 1.4]} rotation={[0, Math.PI + 0.1, 0]} scale={0.62} pose={{ hoofd: [-0.4, 0, 0] }} />
  </Zaal>
);

/** Arm: een kale kamer, lege kist. */
export const S_Arm = () => {
  const f = useCurrentFrame();
  const deksel = ease(f, 10, 45, 0, -1.5);
  return (
    <Kamer kijk={[0, 0.7, 0]} cam={[1.6, 2.0, 3.2, 0.8, 1.7, 2.4]} licht={0.7}>
      <Blok p={[0, 0.35, 0]} s={[1.4, 0.7, 0.9]} c="#6A4A2E" />
      <Blok p={[0, 0.69, 0]} s={[1.3, 0.02, 0.8]} c="#1A120C" />
      <group position={[0, 0.72, -0.45]} rotation={[deksel, 0, 0]}><Blok p={[0, 0.06, 0.45]} s={[1.42, 0.12, 0.92]} c="#7A5A3A" /></group>
      <Blok p={[0.3, 0.73, 0.1]} s={[0.14, 0.03, 0.14]} c="#9E7A4A" metal={0.6} />
    </Kamer>
  );
};

/** Een generaal met een privéleger tegenover een ander leger. */
export const S_Generaals = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land groen={false} bos={false} rook cam={[6, 4, 16, 3, 3.2, 12]} over={<LangTeller label="Rome" waarde="Civil wars" pil="Marius vs Sulla" />}>
      <Leger rijen={3} kolommen={7} position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t} />
      <Leger rijen={3} kolommen={7} kleur="#3E4F7A" schild="#3E4F7A" position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} t={t} />
    </Land>
  );
};

/** De vader die zijn schoen aantrekt en valt. */
export const S_Vader = () => {
  const f = useCurrentFrame();
  const val = ease(f, 50, 80, 0, 1);
  return (
    <Kamer kijk={[0, 1.0, 0]} over={<LangTeller label="Your father" waarde="Dies suddenly" pil="c. 85 BC" />}>
      <group position={[0, 0, 0]} rotation={[0, 0.4, -val * 1.4]}>
        <Figuur kleding={VADER} pose={{ hoofd: [0.4 + val * 0.4, 0, 0], armR: { schouder: [-0.8, 0, -0.1], elleboog: [-0.8, 0] }, ogen: val > 0.5 ? 'dicht' : 'open' }} />
      </group>
      <Blok p={[0.6, 0.06, 0.6]} s={[0.25, 0.12, 0.31]} c="#5A4030" r={[0, 0.6, 0]} />
    </Kamer>
  );
};

/** De jonge Caesar alleen, met de familie achter zich. */
export const S_Hoofd = () => (
  <Zaal warm kijk={[0, 1.8, 0.4]} cam={[1.6, 2.0, 5.6, 0.9, 2.0, 4.6]} over={<LangTeller label="Age" waarde="~15" pil="head of the family" />}>
    <Figuur kleding={CAESAR_JONG} position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.2 }} />
    <Figuur kleding={AURELIA} haar="lang" position={[-1.3, 0, -1.2]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(0.6) }} />
  </Zaal>
);

/** Huwelijk met Cornelia. */
export const S_Bruiloft = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Forum cam={[2.6, 2.4, 7.2, 1.6, 2.2, 5.8]} kijk={[0, 1.8, 0]} over={<LangTeller label="Married to" waarde="Cornelia" pil="daughter of Cinna" />}>
      <Figuur kleding={CAESAR_JONG} position={[0.55, 0, 0]} rotation={[0, -0.5, 0]} pose={{ mond: 'lach', armL: wijs(0.9) }} />
      <Figuur kleding={CORNELIA} haar="lang" position={[-0.55, 0, 0]} rotation={[0, 0.5, 0]} pose={{ mond: 'lach', armR: wijs(0.9) }} />
      <group position={[-4, 0, -3]}><Menigte n={7} t={t} juich /></group>
    </Forum>
  );
};

/** Sulla marcheert Rome binnen. */
export const S_Sulla = ({ dictator = false }: { dictator?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Forum cam={[5, 3.4, 13, 3, 2.8, 10]} over={dictator ? <LangTeller label="Sulla" waarde="Dictator" pil="82 BC" /> : <JaarLabel jaar="82 BC" sub="Sulla takes Rome" />}>
      <Paard position={[0, 0, 1]} rotation={[0, 0.5, 0]} kleur="#2A1E16" dek="#A8322B" t={t} loopt={!dictator} ruiter={<Figuur kleding={SULLA} haar="grijs" pose={{ armR: dictator ? omhoog() : wijs(1.1), wenk: 0.8, hoofd: [0, -0.6, 0] }} />} />
      <Leger rijen={3} kolommen={6} position={[0, 0, -3]} rotation={[0, 0.5, 0]} t={t} />
    </Forum>
  );
};

/** De lijst met namen (proscriptie). */
export const S_Lijst = ({ naam = false }: { naam?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Forum cam={[0.6, 2.4, 6.4, 0.2, 2.5, 4.6]} kijk={[0, 2.5, 0]} over={naam ? <LangTeller label="Your name" waarde="On the list" /> : <LangTeller label="Sulla's enemies" waarde="Hunted" />}>
      <TekstVlak regels={['PROSCRIPTI', 'MARIVS · CINNA', 'CARBO · NORBANVS', naam && f > 30 ? 'C · IVLIVS CAESAR' : '· · ·']} b={3.6} h={3.2} achter="#E9DFCC" voor="#3A2418" position={[0, 2.6, 0]} fontPx={40} />
      <Figuur kleding={BURGER} position={[-1.6, 0, 1.4]} rotation={[0, 2.6, 0]} pose={{ hoofd: [-0.2, 0, 0] }} />
    </Forum>
  );
};

/** Sulla geeft het bevel; Caesar weigert. */
export const S_Bevel = ({ nee = false }: { nee?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Zaal kijk={[0, 1.9, 0]} cam={[3, 2.4, 6, 2.0, 2.2, 5]} over={nee ? <Citaat tekst="No." /> : <LangTeller label="Sulla's order" waarde="Divorce her" />}>
      <Figuur kleding={SULLA} haar="grijs" position={[-1.0, 0, -0.4]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.4), wenk: 0.9, mond: nee ? 'dicht' : Math.floor(f / 5) % 2 ? 'open' : 'dicht' }} />
      <Figuur kleding={CAESAR_JONG} position={[1.0, 0, 0.3]} rotation={[0, -1.6, 0]} pose={nee ? { ...ARMEN_GEKRUIST, wenk: 0.7 } : { wenk: -0.3 }} />
    </Zaal>
  );
};

/** Onderduiken in de heuvels, ziek, 's nachts. */
export const S_Onderduiken = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land nacht cam={[3, 2.2, 9, 2, 2.0, 7]} kijk={[0, 1.4, 0]} over={<LangTeller label="Hiding" waarde="Every night" pil="a different house" />}>
      <Blok p={[-2, 1.4, -3]} s={[3, 2.8, 2.6]} c="#5A4A3A" />
      <Blok p={[-2, 3.0, -3]} s={[3.4, 0.4, 3]} c="#3A2A20" />
      <Blok p={[-1.4, 0.9, -1.68]} s={[0.6, 1.0, 0.04]} c="#FFB347" emissive="#FF8A2A" />
      <Fakkel position={[2.2, 0, -1]} t={t} />
      <Figuur kleding={{ ...CAESAR_JONG, cape: '#3A3028' }} position={[0.4, 0, 0.4]} rotation={[0, 0.6, 0]} pose={{ wenk: -0.6, hoofd: [0.2, 0, 0], armL: { schouder: [-0.8, 0, 0.4], elleboog: [0, -1.2] } }} />
    </Land>
  );
};

/** De familie smeekt bij Sulla. */
export const S_Smeken = ({ waarschuwing = false }: { waarschuwing?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Zaal kijk={[0, 1.8, 0]} cam={[2.6, 2.4, 6.8, 1.6, 2.2, 5.6]} over={waarschuwing ? <Citaat tekst="In this boy, I see many Mariuses." wie="Sulla" /> : undefined}>
      <Figuur kleding={SULLA} haar="grijs" position={[0, 0, -1.6]} pose={waarschuwing ? { armR: wijs(1.6), wenk: 0.9, mond: 'open' } : ARMEN_GEKRUIST} />
      <Figuur kleding={AURELIA} haar="lang" position={[-1.0, 0, 0.6]} rotation={[0, Math.PI - 0.4, 0]} pose={{ armL: wijs(1.4), armR: wijs(1.3), wenk: -0.8 }} />
      <Figuur kleding={{ ...SENATOR, haar: '#8A7A6A' }} haar="grijs" position={[1.0, 0, 0.6]} rotation={[0, Math.PI + 0.4, 0]} pose={{ armR: wijs(1.2), wenk: -0.6 }} />
      {void f}
    </Zaal>
  );
};

/** Marius als bronzen buste. */
export const S_Marius = () => (
  <Zaal warm kijk={[0, 2.4, -1]} cam={[1.2, 2.4, 5.4, 0.6, 2.5, 4.2]} over={<LangTeller label="Marius" waarde="Sulla's great enemy" pil="and Caesar's uncle" />}>
    <Sokkel position={[0, 0, -1]} h={1.0}>
      <Figuur kleding={SENATOR} o={BRONS} haar="grijs" baard pose={ARMEN_GEKRUIST} />
    </Sokkel>
  </Zaal>
);

/** Gladiatorenspelen voor het volk. */
export const S_Spelen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const steek = Math.sin(f * 0.3) * 0.5;
  return (
    <Shot focus={[0, 1.6, 0]} scherpte={2.4} mist={['#D8C49A', 18, 80]} over={<LangTeller label="Paid with" waarde="Borrowed money" pil="games · feasts · gladiators" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-8, 14, 6]} />
      <Grond kleur="#D8B880" />
      <Camera pos={camPos(f, [3.2, 2.2, 6.2, 2.4, 2.0, 5.0])} kijk={[0, 1.5, 0]} fov={36} />
      {[-1, 1].map((k) => <Blok key={k} p={[0, 1.4, k * -9]} s={[30, 2.8, 2]} c="#B89A6A" />)}
      <group position={[-10, 2.8, -9.5]}><Menigte n={18} t={t} juich /></group>
      <Figuur kleding={GLADIATOR} hoofddeksel="helm" position={[-0.8, 0, 0]} rotation={[0, 1.2, 0]} pose={{ armR: { schouder: [-1.6 + steek, 0, -0.1], elleboog: [0, -0.3] } }} inHand={<Zwaard />} />
      <Figuur kleding={{ ...GLADIATOR, tuniek: '#5A6A8A' }} hoofddeksel="helm" position={[0.8, 0, 0]} rotation={[0, -1.6, 0]} pose={{ armR: { schouder: [-1.6 - steek, 0, -0.1], elleboog: [0, -0.3] } }} inHand={<Zwaard />} />
    </Shot>
  );
};

/** Schuldenteller: de kist met munten die steeds hoger wordt. */
export const S_Schulden = () => {
  const f = useCurrentFrame();
  const n = Math.round(lin(f, 10, 120, 0, 30));
  return (
    <Kamer kijk={[-0.4, 1.2, -0.3]} cam={[2.4, 2.2, 4.4, 1.8, 2.0, 3.8]} over={<LangTeller label="Your debts" waarde={`${Math.round(lin(f, 10, 120, 0, 25))}M sesterces`} pil="by 61 BC (Plutarch)" />}>
      <Blok p={[0, 0.4, 0]} s={[1.6, 0.8, 1.0]} c="#6A4A2E" />
      {Array.from({ length: n }, (_, i) => <Blok key={i} p={[-0.5 + (i % 6) * 0.2, 0.82 + Math.floor(i / 6) * 0.04, -0.2 + ((i * 3) % 4) * 0.12]} s={[0.16, 0.03, 0.16]} c="#E2BE58" metal={0.8} rough={0.25} />)}
      <Figuur kleding={CAESAR_JONG} position={[-1.2, 0, -0.8]} rotation={[0, 0.6, 0]} pose={{ mond: 'lach', armR: wijs(0.9) }} />
    </Kamer>
  );
};

/** Juichende menigte. */
export const S_Volk = ({ verkiezing = false }: { verkiezing?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Forum cam={[5, 3, 12, 3, 2.6, 9]} kijk={[0, 1.8, 0]} over={verkiezing ? <><JaarLabel jaar="63 BC" sub="Pontifex Maximus" /></> : undefined}>
      <group position={[-7, 0, 1.5]}><Menigte n={13} t={t} juich /></group>
      <group position={[-6.4, 0, 3.2]}><Menigte n={12} t={t + 0.5} juich /></group>
      <Figuur kleding={verkiezing ? { ...CAESAR_JONG, cape: '#ECE6D8' } : CAESAR_JONG} position={[0, 0, -1.4]} rotation={[0, 0.2, 0]} pose={{ armR: omhoog(), mond: 'lach' }} />
    </Forum>
  );
};

/** Twee oudere, rijkere tegenkandidaten. */
export const S_Kandidaten = () => (
  <Forum cam={[3, 2.6, 8, 2, 2.4, 6.4]} kijk={[0, 1.8, 0]} over={<LangTeller label="Chief priest" waarde="1 vs 2" pil="two older, richer men" />}>
    <Figuur kleding={CAESAR_JONG} position={[1.2, 0, 0.4]} rotation={[0, -0.6, 0]} pose={ARMEN_GEKRUIST} />
    <Figuur kleding={{ ...SENATOR, rand: '#C9A646' }} haar="grijs" position={[-0.6, 0, -0.2]} rotation={[0, 0.5, 0]} pose={{ wenk: 0.4 }} />
    <Figuur kleding={{ ...SENATOR, rand: '#3E5F9A' }} haar="grijs" baard position={[-1.6, 0, -0.6]} rotation={[0, 0.6, 0]} pose={ARMEN_GEKRUIST} />
  </Forum>
);

/** Afscheid van zijn moeder bij de deur. */
export const S_Moeder = () => (
  <Kamer kijk={[0, 1.7, 0]} cam={[2.4, 2.2, 4.4, 1.6, 2.1, 3.6]} over={<Citaat tekst="Today you'll see me chief priest, or an exile." wie="to his mother" />}>
    <Figuur kleding={CAESAR_JONG} position={[0.6, 0, 0]} rotation={[0, -1.0, 0]} pose={{ mond: 'lach', armL: wijs(0.8) }} />
    <Figuur kleding={AURELIA} haar="grijs" position={[-0.6, 0, 0.2]} rotation={[0, 1.1, 0]} pose={{ wenk: -0.6, armR: wijs(1.0) }} />
  </Kamer>
);

/** Drie mannen in een donkere kamer: het geheime verbond. */
export const S_Drie = ({ samen = false }: { samen?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Kamer kijk={[0, 1.6, 0]} cam={[0.4, 2.6, 4.8, 0.2, 2.4, 3.8]} over={samen ? <LangTeller label="The three" waarde="Run Rome" pil="the First Triumvirate" /> : <LangTeller label="A secret deal" waarde="Pompey · Crassus" />}>
      <Figuur kleding={POMPEIUS} position={[-1.1, 0, -0.2]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(samen ? 1.4 : 1.0) }} />
      <Figuur kleding={{ ...CAESAR_JONG, cape: '#A8322B' }} position={[0, 0, -0.6]} pose={{ armR: wijs(samen ? 1.4 : 0.6), armL: wijs(samen ? 1.4 : 0.6), mond: 'lach' }} />
      <Figuur kleding={CRASSUS} haar="grijs" position={[1.1, 0, -0.2]} rotation={[0, -0.6, 0]} pose={{ armL: wijs(samen ? 1.4 : 1.0) }} />
      {samen && <Blok p={[0, 1.5, 0.5]} s={[0.3, 0.3, 0.3]} c="#E2BE58" metal={0.8} />}
      {void f}
    </Kamer>
  );
};

/** Pompeius trouwt met Julia. */
export const S_Julia = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Forum cam={[2.6, 2.4, 7, 1.6, 2.2, 5.6]} over={<LangTeller label="Pompey marries" waarde="Julia" pil="your daughter" />}>
      <Figuur kleding={POMPEIUS} position={[0.55, 0, 0]} rotation={[0, -0.5, 0]} pose={{ mond: 'lach' }} />
      <Figuur kleding={JULIA} haar="lang" position={[-0.55, 0, 0]} rotation={[0, 0.5, 0]} pose={{ mond: 'lach' }} />
      <Figuur kleding={{ ...CAESAR_JONG, cape: '#A8322B' }} position={[2.2, 0, -1.2]} rotation={[0, -0.9, 0]} pose={ARMEN_GEKRUIST} />
      <group position={[-5, 0, -3]}><Menigte n={6} t={t} juich /></group>
    </Forum>
  );
};

/** Consul: in toga met lictoren. */
export const S_Consul = () => {
  const f = useCurrentFrame();
  return (
    <Forum cam={[1, 2.0, 8, 0.6, 2.2, 6]} kijk={[0, 2.0, 0]} over={<JaarLabel jaar="59 BC" sub="Consul" />}>
      <Figuur kleding={{ ...CAESAR, cape: '#ECE6D8' }} position={[0, 0, 0]} pose={{ armR: omhoog() }} />
      {[-1.4, 1.4].map((x) => <Figuur key={x} kleding={LEGIONAIR} position={[x, 0, -0.8]} rotation={[0, x > 0 ? -0.3 : 0.3, 0]} inHand={<Blok p={[0, 0.4, 0]} s={[0.12, 1.4, 0.12]} c="#6B4A2E" />} />)}
      {void f}
    </Forum>
  );
};

/** Galliërs in het bos. */
export const S_Stammen = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land cam={[4, 2.4, 10, 2.6, 2.2, 8]} kijk={[0, 1.6, 0]} over={<LangTeller label="Gaul" waarde="~60 tribes" pil="proud and warlike" />}>
      {[-2.4, -0.8, 0.8, 2.4].map((x, i) => (
        <Figuur key={x} kleding={{ ...GALLIËR, tuniek: ['#3E6B3A', '#7A3B26', '#3E4F7A', '#8A6A3A'][i] }} haar="lang" snor position={[x, 0, -0.5 - (i % 2)]} rotation={[0, -x * 0.1, 0]} pose={{ armR: i % 2 ? omhoog() : wijs(1.0), wenk: 0.8, mond: 'open' }} inHand={<Zwaard />} />
      ))}
      <Fakkel position={[3.6, 0, -2]} t={t} />
    </Land>
  );
};

/** De Rijnbrug: palen komen een voor een op. */
export const S_Brug = ({ af = false }: { af?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const n = af ? 16 : Math.round(lin(f, 0, 120, 2, 16));
  const weg = af ? ease(f, 60, 120, 0, 1) : 0;
  return (
    <Shot focus={[0, 1, 0]} scherpte={2} mist={['#C9D3B8', 20, 100]} over={af ? <LangTeller label="Then" waarde="Torn down" pil="after 18 days" /> : <LangTeller label="Bridge over the Rhine" waarde={`${Math.round(lin(f, 0, 120, 1, 10))} days`} pil="55 BC" />}>
      <Lucht boven="#9EC1DB" horizon="#E3E0C6" />
      <Daglicht zon={[8, 14, -6]} />
      <Grond kleur="#7E9A4E" />
      <group rotation={[0, Math.PI / 2, 0]}><Rivier t={t} breed={16} nacht={false} /></group>
      <Camera pos={camPos(f, [12, 7, 12, 9, 5.5, 9])} kijk={[0, 0.6, 0]} fov={36} />
      {Array.from({ length: n }, (_, i) => {
        const x = -8 + i;
        return (
          <group key={i} position={[x, -weg * 3 * (i % 3 === 0 ? 1 : 0.3), 0]}>
            {[-0.9, 0.9].map((z) => <Blok key={z} p={[0, 0.2, z]} s={[0.2, 1.6, 0.2]} c="#5A3B24" />)}
            {!weg && <Blok p={[0, 0.95, 0]} s={[1.02, 0.12, 2.0]} c="#8A6A44" />}
          </group>
        );
      })}
      {!af && <Leger rijen={2} kolommen={3} position={[-8 + n - 2, 1.0, 0]} rotation={[0, Math.PI / 2, 0]} t={t} afstand={0.7} />}
    </Shot>
  );
};

/** Landing in Brittannië: galeien bij witte kliffen. */
export const S_Brittannie = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <OpZee schip={false} cam={[12, 5, 20, 10, 4, 17]} kijk={[0, 2, -6]} over={<JaarLabel jaar="55 BC" sub="Britain" />}>
      <Blok p={[0, 3, -16]} s={[40, 8, 6]} c="#F2EEE6" />
      <Blok p={[0, 7.4, -16]} s={[40, 0.8, 6]} c="#6E8A46" />
      <Galei position={[-4, 0, -6]} rotation={[0, 0.3, 0]} deining={t} />
      <Galei position={[4, 0, -3]} rotation={[0, 0.2, 0]} deining={t + 1} />
    </OpZee>
  );
};

/** Vercingetorix voor zijn leger. */
export const S_Vercingetorix = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land cam={[3, 2.2, 9, 2, 2.2, 7]} kijk={[0, 2.2, 0]} over={<JaarLabel jaar="52 BC" sub="Vercingetorix" />}>
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI + 0.5, 0]} kleur="#ECE6DA" manen="#CFC6B6" dek="#3E6B3A" t={t} ruiter={<Figuur kleding={GALLIËR} haar="lang" snor pose={{ armR: omhoog(), hoofd: [0, -0.6, 0], mond: 'open' }} inHand={<Zwaard />} />} />
      <Leger rijen={3} kolommen={9} kleur="#3E6B3A" schild="#C9A050" position={[0, 0, -6]} t={t} />
    </Land>
  );
};

/** Alesia van bovenaf: heuvel met fort, ring binnen, ring buiten. */
export const S_Alesia = ({ ringen = 1, slag = false }: { ringen?: 1 | 2; slag?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const p1 = ringen === 1 ? lin(f, 10, 130, 0, 1) : 1;
  const p2 = ringen === 2 && !slag ? lin(f, 20, 130, 0, 1) : ringen === 2 ? 1 : 0;
  const ring = (r: number, p: number, kleur: string) =>
    Array.from({ length: Math.round(64 * p) }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return <Blok key={i} p={[Math.cos(a) * r, 0.4, Math.sin(a) * r]} s={[r * 0.11, 0.8, 0.3]} c={kleur} r={[0, -a + Math.PI / 2, 0]} />;
    });
  return (
    <Shot focus={[0, 0, 0]} scherpte={1.4} mist={['#C9D3B8', 30, 120]} over={slag ? <LangTeller label="Alesia" waarde="Two fronts" pil="you fight in the middle" /> : ringen === 1 ? <LangTeller label="Inner wall" waarde={`${Math.round(p1 * 18)} km`} pil="Alesia, 52 BC" /> : <LangTeller label="Outer wall" waarde={`${Math.round(p2 * 22)} km`} pil="facing outward" />}>
      <Lucht boven="#9EC1DB" horizon="#E3E0C6" />
      <Daglicht zon={[8, 20, 6]} />
      <Grond kleur="#7E9A4E" />
      <Camera pos={camPos(f, [0, 24, 20, 0, 20, 16])} kijk={[0, 0, 0]} fov={40} />
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow><cylinderGeometry args={[3.2, 4.2, 1.6, 12]} /><meshStandardMaterial color="#8A9A56" roughness={0.9} flatShading /></mesh>
      {Array.from({ length: 10 }, (_, i) => <Blok key={i} p={[-1.6 + (i % 4) * 1.0, 1.9, -1 + Math.floor(i / 4) * 1.0]} s={[0.7, 0.6, 0.7]} c="#8A6A44" />)}
      {ring(7, p1, '#6B4A2E')}
      {ring(11, p2, '#5A3B24')}
      {(ringen === 2 || slag) && <Leger rijen={2} kolommen={8} kleur="#3E6B3A" schild="#C9A050" position={[0, 0, -15]} t={t} />}
      {slag && <Leger rijen={2} kolommen={6} position={[0, 0, -9]} rotation={[0, Math.PI, 0]} t={t} />}
      {slag && <Leger rijen={2} kolommen={6} position={[0, 0, 9]} t={t} />}
      {slag && [-9, 4, 10].map((x, i) => <Rook key={i} position={[x, 0, -10 + i * 6]} t={t + i} kleur="#6A5E52" />)}
    </Shot>
  );
};

/** Overwinning: legioen juicht, Caesar te paard. */
export const S_Zege = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land cam={[5, 2.0, 8.5, 4, 2.3, 7.2]} kijk={[-0.5, 3.0, 0]}>
      <Banier position={[-1.7, 0, -0.8]} tekst t={t} />
      <Paard position={[0.4, 0, 0]} rotation={[0, 0.6, 0]} t={t} ruiter={<Figuur {...KR} pose={{ armR: omhoog(), mond: 'open' }} inHand={<Zwaard />} />} />
      <Leger rijen={4} kolommen={8} position={[0, 0, -4]} t={t} />
    </Land>
  );
};

/** Vercingetorix legt zijn wapens neer (uit de short). */
export const S_Overgave = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const val = ease(f, 25, 45, 0, 1);
  return (
    <Land cam={[-2.6, 2.1, 5.0, -2.6, 2.1, 4.3]} kijk={[0.1, 2.0, -0.8]} bos={false}>
      <Figuur {...KR} position={[1.5, 0, 0.6]} rotation={[0, -2.38, 0]} pose={ARMEN_GEKRUIST} />
      <Figuur kleding={GALLIËR} haar="lang" snor position={[-0.3, 0, -1.3]} rotation={[0, 0.76, 0]} pose={{ armR: { schouder: [lin(f, 10, 30, -1.4, -0.5), 0, -0.1], elleboog: [0, -0.2] }, hoofd: [0.25, 0, 0], wenk: -0.6 }} inHand={f < 30 ? <Zwaard /> : undefined} />
      {f >= 30 && <group position={[0.2, 0.05 + (1 - val) * 1.2, -0.2]} rotation={[-(1 - val) * 1.2, 0.6 + (1 - val) * 1.5, 0]}><Zwaard /></group>}
      <Leger rijen={2} kolommen={6} position={[1.5, 0, -6]} t={t} />
    </Land>
  );
};

/** De prijs: een verlaten, rokend dorp. */
export const S_Prijs = ({ teller }: { teller?: ReactNode }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land rook avond bos={false} cam={[6, 3, 12, 4, 2.6, 9]} kijk={[0, 1.2, -2]} over={teller}>
      {[-5, -2, 1.5, 4.5].map((x, i) => (
        <group key={x} position={[x, 0, -3 - (i % 2) * 2]}>
          <Blok p={[0, 0.9, 0]} s={[2, 1.8, 2]} c="#6A5A44" />
          <Blok p={[0, 2.1, 0]} s={[2.4, 0.6, 2.4]} c="#3A2A1C" r={[0, 0, (i - 1.5) * 0.15]} />
          <Vuur position={[0.4, 1.8, 0.6]} t={t + i} grootte={0.8} />
        </group>
      ))}
    </Land>
  );
};

/** Caesar schrijft zijn boek. */
export const S_Boek = () => {
  const f = useCurrentFrame();
  return (
    <InTent over={<LangTeller label="Your book" waarde="The Gallic War" pil="written about yourself" />}>
      <Figuur {...KR} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] }, armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] }, hoofd: [0.3, 0, 0], mond: 'lach' }} inHand={<Rol open={ease(f, 0, 20, 0.3, 1)} />} />
    </InTent>
  );
};

/** Julia's dood: een lege stoel, een lamp. */
export const S_Rouw = () => (
  <Kamer kijk={[0, 1.2, 0]} licht={0.6} over={<LangTeller label="54 BC · 53 BC" waarde="Julia · Crassus" pil="both dead" />}>
    <Blok p={[-0.4, 0.45, 0]} s={[0.8, 0.9, 0.8]} c="#6A4A2E" />
    <Blok p={[-0.4, 1.3, -0.36]} s={[0.8, 0.9, 0.08]} c="#6A4A2E" />
    <Blok p={[-0.4, 0.92, 0]} s={[0.7, 0.04, 0.7]} c="#E2C9A0" />
    <Figuur kleding={POMPEIUS} position={[0.9, 0, -0.6]} rotation={[0, -0.6, 0]} pose={{ wenk: -1, hoofd: [0.3, 0, 0] }} />
  </Kamer>
);

/** Pompeius tussen de senatoren. */
export const S_PompeiusSenaat = () => (
  <Zaal cam={[3, 2.4, 7, 2, 2.2, 5.6]} over={<LangTeller label="Pompey" waarde="With the Senate" pil="against you" />}>
    <Figuur kleding={POMPEIUS} position={[0, 0, 0]} pose={ARMEN_GEKRUIST} />
    {[-1.4, 1.4, -2.4, 2.4].map((x, i) => <Figuur key={x} kleding={SENATOR} haar={i % 2 ? 'grijs' : 'kort'} position={[x, 0, -0.6 - (i > 1 ? 0.8 : 0)]} rotation={[0, -x * 0.2, 0]} pose={{ wenk: 0.6 }} />)}
  </Zaal>
);

/** Het bevel van de senaat in de tent (uit de short). */
export const S_Brief = ({ proces = false }: { proces?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <InTent over={proces ? <LangTeller label="Without an army" waarde="On trial" pil="your career over" /> : <LangTeller label="The Senate's order" waarde="Disband" pil="come home alone" />}>
      <Figuur {...KR} position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] }, armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] }, hoofd: [0.3, 0, 0], wenk: ease(f, 40, 70, 0, proces ? -0.6 : 1) }} inHand={<Rol open={ease(f, 0, 20, 0.3, 1)} />} />
    </InTent>
  );
};

/** De Rubicon bij nacht (uit de short). */
export const S_Rubicon = ({ fase }: { fase: 'staan' | 'twijfel' | 'teerling' | 'over' }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (fase === 'over') {
    const x = lin(f, 0, 120, -3, 2.2);
    return (
      <Shot focus={[x, 2.3, 0]} scherpte={3} mist={['#0E1220', 8, 40]}>
        <Lucht boven="#0B0F1E" horizon="#242A44" />
        <Camera pos={[x * 0.7, 1.6, 11]} kijk={[x, 2.0, 0]} fov={34} />
        <Nachtlicht />
        <group rotation={[0, Math.PI / 2, 0]}><Rivier t={t} breed={14} /></group>
        <Paard position={[x, -0.15, 0]} rotation={[0, -Math.PI / 2, 0]} t={t} loopt ruiter={<Figuur {...KR} pose={{ armR: wijs(1.2) }} />} />
        <Schuim punten={[[x - 0.3, -0.2, 0.8], [x + 0.3, -0.2, -0.8], [x + 0.4, -0.2, 0.8], [x - 0.4, -0.2, -0.8], [x, -0.2, 1.1]]} t={t} />
        <Fakkel position={[x - 2.5, 0.3, -3]} t={t} />
        <Fakkel position={[x + 1.5, 0.3, -4]} t={t} />
      </Shot>
    );
  }
  const dichtbij = fase !== 'staan';
  return (
    <Shot focus={[0, 2.5, -4]} scherpte={3} mist={['#0E1220', 10, 45]} over={fase === 'staan' ? <JaarLabel jaar="January 49 BC" sub="the Rubicon" /> : fase === 'teerling' ? <Citaat tekst="Let the die be cast." wie="Suetonius" /> : undefined}>
      <Lucht boven="#0B0F1E" horizon="#242A44" />
      <Camera pos={dichtbij ? [ease(f, 0, 120, 0.9, 0.5), 2.6, ease(f, 0, 120, 1.6, 1.0)] : [ease(f, 0, 120, 1.5, 0.8), 1.2, ease(f, 0, 120, 7.5, 6.5)]} kijk={[0, 2.7, -4]} fov={dichtbij ? 30 : 36} />
      <Nachtlicht />
      <Rivier t={t} breed={6} />
      <Paard position={[0, 0.3, -4]} rotation={[0, Math.PI - 0.2, 0]} t={t} ruiter={<Figuur {...KR} pose={{ hoofd: fase === 'twijfel' ? [0.3, 0.4 * Math.sin(f / 20), 0] : [0, 0, 0], wenk: fase === 'teerling' ? 0.8 : 0, mond: fase === 'teerling' ? 'open' : 'dicht' }} />} />
      <Leger rijen={3} kolommen={7} position={[0, 0.3, -7.5]} t={t} />
      {[-4, -2, 2, 4].map((x, i) => <Fakkel key={i} position={[x, 0.3, -5.5]} t={t} />)}
    </Shot>
  );
};

/** Senatoren vluchten de stad uit. */
export const S_Vlucht = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 150, -2, 6);
  return (
    <Straat mensen={false} cam={[3, 2.6, 12, 2, 2.4, 13]} kijk={[0, 1.4, z]} over={<LangTeller label="Pompey and the Senate" waarde="Flee Rome" pil="49 BC" />}>
      <Paard position={[0, 0, z]} rotation={[0, 0, 0]} t={t} loopt dek="#3E4F7A" ruiter={<Figuur kleding={POMPEIUS} pose={{ hoofd: [0, -0.6, 0], wenk: -0.5 }} />} />
      {[[-1.4, -1.6], [1.4, -2.2], [-0.8, -3.4], [1.0, -4.4]].map(([x, dz], i) => (
        <Figuur key={i} kleding={SENATOR} haar={i % 2 ? 'grijs' : 'kort'} position={[x, Math.abs(Math.sin(t * 8 + i)) * 0.1, z + dz]} rotation={[0, 0, 0]} pose={{ armL: wijs(0.6), armR: { schouder: [0.6, 0, 0], elleboog: [0, 0] }, wenk: -0.6, mond: 'open' }} />
      ))}
    </Straat>
  );
};

/** Pharsalus. */
export const S_Pharsalus = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land groen={false} bos={false} cam={[3.0, 3.0, 7.5, 2.2, 3.0, 6.2]} kijk={[0, 2.4, -3]} over={<JaarLabel jaar="48 BC" sub="Pharsalus, Greece" />}>
      <Paard position={[0, 0, 0]} rotation={[0, 0.3, 0]} kleur="#ECE6DA" manen="#CFC6B6" t={t} ruiter={<Figuur {...KR} pose={{ armR: wijs(1.0) }} />} />
      <Leger rijen={3} kolommen={9} position={[0, 0, -6]} rotation={[0, Math.PI, 0]} t={t} />
      <Leger rijen={3} kolommen={12} position={[0, 0, -20]} kleur="#3E4F7A" schild="#3E4F7A" t={t} />
    </Land>
  );
};

/** Het hoofd van Pompeius in een kist; Caesar huilt (uit de short). */
export const S_Hoofd2 = ({ huil = false }: { huil?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Paleis kijk={[0.3, 2.0, 0.6]} cam={[-2.6, 2.4, 4.4, -2.2, 2.4, 3.8]}>
      <Figuur {...KR} position={[0, 0, 0.4]} rotation={[0, 0.1, 0]} pose={huil ? { wenk: -1, traan: lin(f, 10, 90, 0, 1), mond: 'open', hoofd: [0.15, 0, 0] } : { wenk: 0.2 }} />
      <Figuur kleding={EGYPTENAAR} haar="kaal" position={[0.9, 0, 2.2]} rotation={[0, Math.PI - 0.3, 0]} pose={{ armL: { schouder: [-1.2, 0, 0.2], elleboog: [0, -0.4] }, armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.4] } }} />
      <Blok p={[0.85, 1.7, 1.55]} s={[0.6, 0.45, 0.5]} c="#8A6A3A" />
      <Blok p={[0.85, 1.95, 1.55]} s={[0.66, 0.08, 0.56]} c="#E9DFC8" />
    </Paleis>
  );
};

/** Koning en zus tegenover elkaar. */
export const S_BroerZus = ({ buiten = false }: { buiten?: boolean }) => (
  <Paleis kijk={[0, 1.7, -0.6]} over={buiten ? <LangTeller label="Cleopatra" waarde="Shut out" pil="of her own palace" /> : <LangTeller label="Egypt" waarde="Civil war" pil="Ptolemy XIII vs Cleopatra" />}>
    <group position={[-1.0, 0, -0.6]} rotation={[0, 0.7, 0]}>
      <Figuur kleding={PTOLEMAEUS} haar="bob" scale={0.85} pose={{ wenk: 0.8, armR: wijs(1.3), mond: 'open' }} />
      <Kroon position={[0, 1.95, 0]} />
    </group>
    {!buiten && <Figuur kleding={CLEOPATRA} haar="bob" hoofddeksel="hoofdband" position={[1.0, 0, -0.4]} rotation={[0, -0.7, 0]} pose={{ wenk: 0.7, armL: wijs(1.2) }} />}
    {buiten && <Figuur kleding={LEGIONAIR} hoofddeksel="helm" position={[1.2, 0, -1.6]} rotation={[0, -0.3, 0]} inHand={<Blok p={[0, 0.4, 0]} s={[0.1, 2, 0.1]} c="#6B4A2E" />} />}
  </Paleis>
);

/** Cleopatra komt uit het tapijt (uit de short). */
export const S_Tapijt = () => {
  const f = useCurrentFrame();
  const rol = ease(f, 0, 35, 0, 1);
  const op = ease(f, 30, 55, 0, 1);
  return (
    <Paleis kijk={[0, 1.5, -2.2]} cam={[1.0, 2.6, 4.4, 1.0, 2.6, 3.6]} over={<LangTeller label="According to Plutarch" waarde="A bedding sack" />}>
      <group>
        <Blok p={[0, 0.02, -rol * 1.1]} s={[1.6, 0.03, 0.01 + rol * 2.2]} c="#8E2A24" />
        {[-0.55, 0, 0.55].map((x) => <Blok key={x} p={[x, 0.04, -rol * 1.1]} s={[0.08, 0.02, rol * 2.1]} c="#D8A945" />)}
        <mesh position={[0, 0.17, -rol * 2.2]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.15 + (1 - rol) * 0.25, 0.15 + (1 - rol) * 0.25, 1.6, 12]} /><meshStandardMaterial color="#8E2A24" roughness={0.9} /></mesh>
      </group>
      <Figuur kleding={CLEOPATRA} haar="bob" hoofddeksel="hoofdband" position={[0, -2.4 + op * 2.4, -2.3]} pose={{ mond: 'lach', armL: { schouder: [0, 0, 0.5], elleboog: [0, -1.2] }, armR: { schouder: [0, 0, -0.5], elleboog: [0, -1.2] } }} />
      <Figuur {...KR} position={[1.9, 0, 0.2]} rotation={[0, -1.9, 0]} />
    </Paleis>
  );
};

/** Caesar en Cleopatra naast elkaar. */
export const S_Samen = ({ teller, kind = false }: { teller?: ReactNode; kind?: boolean }) => (
  <Paleis kijk={[0, 1.8, 0]} cam={[0.6, 2.2, 5.6, 0.3, 2.1, 4.6]} over={teller}>
    <Figuur {...KR} position={[0.6, 0, 0]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach' }} />
    <Figuur kleding={CLEOPATRA} haar="bob" hoofddeksel="hoofdband" position={[-0.6, 0, 0]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach', ...(kind ? { armR: { schouder: [-1.0, 0, -0.3], elleboog: [0, -1.0] } } : {}) }} />
    {kind && <Figuur kleding={{ ...PTOLEMAEUS, rand: '#A8322B' }} haar="kort" position={[-0.1, 0, 0.6]} scale={0.45} rotation={[0, 0.1, 0]} pose={{ mond: 'lach' }} />}
    {!kind && <Kroon position={[-0.6, 2.32, 0]} />}
  </Paleis>
);

/** Straatgevechten in Alexandrië, met brand. */
export const S_Alexandrie = ({ brand = false }: { brand?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Straat avond cam={[3, 2.8, 10, 2, 2.4, 7.6]} mensen={false} over={brand ? <LangTeller label="Alexandria" waarde="Burning" pil="books lost from the library" /> : <JaarLabel jaar="48–47 BC" sub="Alexandria" />}>
      <Leger rijen={2} kolommen={4} position={[0, 0, -1]} t={t} afstand={1.0} />
      <Leger rijen={2} kolommen={4} kleur="#F2EAD8" schild="#C9A646" position={[0, 0, -6]} rotation={[0, Math.PI, 0]} t={t} afstand={1.0} />
      {brand && [-4, 3.6, -3.4].map((x, i) => <Vuur key={i} position={[x, 3 + i, -8 - i * 3]} t={t + i} grootte={2} />)}
      {brand && (
        <group position={[-4.6, 0, -2]}>
          {Array.from({ length: 8 }, (_, i) => <Blok key={i} p={[0, 0.2 + i * 0.12, (i % 3) * 0.3]} s={[0.6, 0.1, 0.25]} c="#EFE3C4" r={[0, i, 0]} />)}
        </group>
      )}
    </Straat>
  );
};

/** VENI VIDI VICI als drie woorden die één voor één verschijnen. */
export const S_Veni = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const woorden = ['VENI', 'VIDI', 'VICI'];
  return (
    <Land cam={[0.6, 2.2, 9, 0.2, 2.4, 7.4]} kijk={[0, 2.4, 0]} groen={false} bos={false} over={
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60 }}>
        {woorden.map((w, i) => (
          <div key={w} style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 150, color: '#F2C25A', WebkitTextStroke: '3px #4A2A0C', opacity: lin(f, 10 + i * 22, 18 + i * 22, 0, 1), filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.65))' }}>{w}</div>
        ))}
      </div>
    }>
      <Paard position={[0, 0, 0]} rotation={[0, 0.4, 0]} t={t} ruiter={<Figuur {...KR} pose={{ armR: omhoog() }} inHand={<Rol />} />} />
      <Leger rijen={3} kolommen={8} position={[0, 0, -5]} t={t} />
    </Land>
  );
};

/** Triomftocht. */
export const S_Triomf = ({ teller }: { teller?: ReactNode }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 150, 6, 1);
  return (
    <Forum cam={[2.8, 3.4, z - 9.5, 2.8, 3.4, z - 9.5]} kijk={[0, 2.2, z]} over={teller}>
      <group position={[-4, 0, 6]} rotation={[0, Math.PI / 2, 0]}><Menigte n={14} t={t} juich /></group>
      <group position={[4, 0, -6]} rotation={[0, -Math.PI / 2, 0]}><Menigte n={14} t={t + 1} juich /></group>
      <Strijdwagen position={[0, 0, z]} t={t} ruiter={<Figuur kleding={TOGA_TRIOMF} hoofddeksel="krans" pose={{ armR: omhoog() }} />} />
    </Forum>
  );
};

/** Een gouden stoel, een munt met zijn hoofd, en JULY. */
export const S_Eer = ({ fase }: { fase: 'stoel' | 'juli' }) => {
  const f = useCurrentFrame();
  if (fase === 'juli') {
    const p = lin(f, 20, 60, 0, 1);
    return (
      <Forum cam={[0.4, 2.4, 7, 0.2, 2.4, 5.6]} kijk={[0, 2.4, 0]} over={<LangTeller label="Quintilis" waarde="→ July" pil="still today" />}>
        <TekstVlak regels={[p < 0.5 ? 'QVINTILIS' : 'IVLIVS']} b={5} h={1.6} achter="#E9DFCC" voor={p < 0.5 ? '#6A5A4A' : '#6B2D5C'} position={[0, 2.5, 0]} fontPx={76} />
      </Forum>
    );
  }
  return (
    <Zaal warm kijk={[0, 1.4, -1]} cam={[1.6, 2.0, 5.2, 0.8, 1.8, 4.0]} over={<LangTeller label="Honours" waarde="Golden chair" pil="and your face on coins" />}>
      <Blok p={[0, 0.5, -1]} s={[1.0, 0.1, 0.9]} c="#E0B04E" metal={0.6} rough={0.3} />
      <Blok p={[0, 1.2, -1.4]} s={[1.0, 1.4, 0.1]} c="#E0B04E" metal={0.6} rough={0.3} />
      {[-0.4, 0.4].map((x) => <Blok key={x} p={[x, 0.25, -1]} s={[0.1, 0.5, 0.8]} c="#C9963A" metal={0.6} />)}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[1.4 + i * 0.4, 0.06, 0.6]} rotation={[-Math.PI / 2 + 0.4, 0, 0]}>
          <mesh castShadow><cylinderGeometry args={[0.18, 0.18, 0.04, 20]} /><meshStandardMaterial color="#C9CDD2" metalness={0.8} roughness={0.25} /></mesh>
        </group>
      ))}
    </Zaal>
  );
};

/** De kalender: dagen die doortellen tot 445. */
export const S_Kalender = ({ fase }: { fase: 'scheef' | 'teller' | 'eeuwen' }) => {
  const f = useCurrentFrame();
  const n = fase === 'teller' ? Math.round(lin(f, 5, 110, 355, 445)) : fase === 'eeuwen' ? Math.round(lin(f, 5, 110, 46, 1582)) : 0;
  return (
    <Zaal warm kijk={[0, 2.2, -1.2]} cam={[0.6, 2.2, 5.6, 0.3, 2.3, 4.4]} over={fase === 'teller' ? <LangTeller label="46 BC" waarde={`${n} days`} pil="the longest year" /> : fase === 'eeuwen' ? <LangTeller label="Julian calendar" waarde={n < 1582 ? `${n} AD` : '1582'} pil="1,600+ years" /> : <LangTeller label="The calendar" waarde="Months off" pil="seasons in the wrong place" />}>
      <Blok p={[0, 2.4, -1.6]} s={[3.6, 2.6, 0.1]} c="#EFE3C4" />
      {Array.from({ length: 28 }, (_, i) => (
        <Blok key={i} p={[-1.5 + (i % 7) * 0.5, 3.3 - Math.floor(i / 7) * 0.55, -1.52]} s={[0.4, 0.42, 0.02]} c={fase === 'scheef' && i % 5 === 2 ? '#B3412F' : i === 13 && fase === 'eeuwen' ? '#E0B04E' : '#E2D2B0'} />
      ))}
      <Figuur {...KR} position={[1.6, 0, 0.2]} rotation={[0, -0.8, 0]} pose={{ armL: wijs(1.3), hoofd: [0, 0.4, 0] }} />
    </Zaal>
  );
};

/** Vergeving: Caesar schudt een vijand de hand. */
export const S_Vergeving = ({ brutus = false }: { brutus?: boolean }) => (
  <Zaal cam={[2.6, 2.4, 6.4, 1.6, 2.2, 5.2]} over={brutus ? <LangTeller label="Pardoned" waarde="Brutus" pil="fought for Pompey" /> : <LangTeller label="Your enemies" waarde="Forgiven" />}>
    <Figuur {...KR} position={[0.6, 0, 0]} rotation={[0, -1.3, 0]} pose={{ armR: wijs(1.1), mond: 'lach' }} />
    <Figuur kleding={brutus ? BRUTUS : SENATOR} haar={brutus ? 'kort' : 'grijs'} position={[-0.6, 0, 0.1]} rotation={[0, 1.4, 0]} pose={{ armR: wijs(1.1), wenk: brutus ? 0.3 : -0.2 }} />
  </Zaal>
);

/** Dictator voor het leven. */
export const S_Dictator = ({ koning = false }: { koning?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Zaal warm kijk={[0, 2.0, -1]} cam={koning ? [0.4, 1.4, 4.6, 0.2, 1.6, 3.6] : [1.6, 2.0, 6.4, 0.8, 2.0, 5.0]} over={koning ? undefined : <JaarLabel jaar="February 44 BC" sub="dictator for life" />}>
      <Blok p={[0, 0.5, -1]} s={[1.0, 0.1, 0.9]} c="#E0B04E" metal={0.6} rough={0.3} />
      <Blok p={[0, 1.2, -1.4]} s={[1.0, 1.4, 0.1]} c="#E0B04E" metal={0.6} rough={0.3} />
      <Figuur kleding={TOGA_TRIOMF} hoofddeksel="krans" position={[0, 0.55, -1]} pose={{ armR: koning ? omhoog() : wijs(0.8) }} />
      {koning && <Kroon position={[0, 2.85 + Math.sin(f / 10) * 0.05, -1]} />}
    </Zaal>
  );
};

/** Senatoren die fluisteren. */
export const S_Fluisteren = () => {
  const f = useCurrentFrame();
  return (
    <Zaal donker kijk={[0, 1.8, 0]} cam={[2.2, 2.2, 5.6, 1.4, 2.0, 4.6]} over={<LangTeller label="To many senators" waarde="A king" pil="Rome hates kings" />}>
      {[-1.0, 0, 1.0].map((x, i) => <Figuur key={x} kleding={i === 1 ? BRUTUS : SENATOR} haar={i === 0 ? 'grijs' : 'kort'} position={[x, 0, 0]} rotation={[0, -x * 0.7, 0]} pose={{ wenk: 0.8, mond: Math.floor(f / 7 + i) % 2 ? 'open' : 'dicht', hoofd: [0.1, -x * 0.3, 0] }} />)}
    </Zaal>
  );
};

/** De waarzegger (uit de short). */
export const S_Ziener = ({ grap = false }: { grap?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Zaal kijk={[-0.5, 2.1, -0.2]} cam={[2.9, 2.5, 6.2, 2.3, 2.5, 5.3]} over={grap ? <Citaat tekst="The Ides of March have come." wie="Caesar" /> : <JaarLabel jaar="15 March" sub="the Ides" />}>
      <Figuur {...KR} position={[0.3, 0, 0.2]} rotation={[0, -0.9, 0]} pose={{ hoofd: [0, 0.3, 0], mond: grap ? 'lach' : 'dicht' }} />
      <Figuur kleding={ZIENER} haar="grijs" baard hoofddeksel="kap" position={[-1.4, 0, -0.6]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.5), mond: !grap && Math.floor(f / 6) % 2 ? 'open' : 'dicht', wenk: 0.6 }} />
    </Zaal>
  );
};

/** Het antwoord van de waarzegger, close-up. */
export const S_ZienerAntwoord = () => {
  const f = useCurrentFrame();
  return (
    <Zaal kijk={[-1.4, 2.2, -0.6]} cam={[0.2, 2.3, 2.6, -0.4, 2.3, 2.0]} over={<Citaat tekst="Yes, but they have not gone." wie="the seer" />}>
      <Figuur kleding={ZIENER} haar="grijs" baard hoofddeksel="kap" position={[-1.4, 0, -0.6]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.5), mond: Math.floor(f / 6) % 2 ? 'open' : 'dicht', wenk: 0.8 }} />
    </Zaal>
  );
};

/** Calpurnia's droom en smeekbede (uit de short). */
export const S_Calpurnia = ({ droom = false }: { droom?: boolean }) => {
  const f = useCurrentFrame();
  if (droom) {
    return (
      <Shot focus={[0, 0.8, 0]} scherpte={3.6} mist={['#1A120C', 5, 18]} over={<LangTeller label="Calpurnia's dream" waarde="You die in her arms" />}>
        <Lucht boven="#0E0A14" horizon="#1E1626" />
        <hemisphereLight args={['#4A4A6A', '#1A120C', 0.35]} />
        <pointLight position={[1.6, 1.6, 0.6]} intensity={3} distance={6} color="#8A9AFF" />
        <Grond kleur="#2A2030" />
        <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#3A2A3A" />
        <Camera pos={[ease(f, 0, 150, 2.4, 1.8), 2.2, ease(f, 0, 150, 3.6, 3.0)]} kijk={[0, 0.7, 0]} fov={34} />
        <Bed position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <group position={[1.05, 0.95, 0]} rotation={[0, Math.PI / 2, 0]}><group rotation={[-Math.PI / 2, 0, 0]} scale={0.8}><Figuur kleding={CALPURNIA} haar="lang" pose={{ ogen: 'dicht', wenk: -0.8 }} /></group></group>
      </Shot>
    );
  }
  return (
    <Kamer kijk={[0, 2.05, 0]} cam={[3.4, 2.4, 3.8, 3.4, 2.4, 3.2]}>
      <Figuur {...KR} position={[0.55, 0, -0.2]} rotation={[0, -0.6, 0]} pose={{ hoofd: [0, 0.35, 0] }} />
      <Figuur kleding={CALPURNIA} haar="lang" position={[-0.55, 0, 0.35]} rotation={[0, 1.0, 0]} pose={{ armL: wijs(1.2), armR: wijs(1.3), wenk: -1, traan: lin(f, 30, 110, 0, 1), mond: 'open' }} />
    </Kamer>
  );
};

/** Caesar loopt door de straat naar de senaat. */
export const S_NaarSenaat = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 150, 2, -3);
  return (
    <Forum cam={[3, 2.4, z + 8, 2.4, 2.2, z + 7]} kijk={[0, 1.8, z]}>
      <Figuur {...KR} position={[0, Math.abs(Math.sin(t * 6)) * 0.04, z]} rotation={[0, Math.PI, 0]} />
      {[-1.2, 1.2].map((x) => <Figuur key={x} kleding={LEGIONAIR} position={[x, 0, z + 1.2]} rotation={[0, Math.PI, 0]} inHand={<Blok p={[0, 0.4, 0]} s={[0.12, 1.4, 0.12]} c="#6B4A2E" />} />)}
    </Forum>
  );
};

/** De moord: senatoren in een kring, dolken (zonder bloed). */
export const S_Kring = ({ fase }: { fase: 'om' | 'zestig' | 'steek' | 'brutus' | 'toga' }) => {
  const f = useCurrentFrame();
  const steek = (i: number) => (fase === 'steek' || fase === 'brutus' ? Math.sin(f * 0.35 + i * 1.3) * 0.25 : 0);
  const sluit = fase === 'om' ? ease(f, 0, 100, 2.6, 1.6) : 1.5;
  const n = fase === 'zestig' ? 12 : 6;
  const toga = fase === 'toga' ? ease(f, 10, 40, 0, 1) : 0;
  const caesarPose: Pose =
    fase === 'toga'
      ? { armL: { schouder: [-2.6 * toga, 0, 0.3], elleboog: [0, -1.6 * toga] }, armR: { schouder: [-2.6 * toga, 0, -0.3], elleboog: [0, -1.6 * toga] }, ogen: 'dicht', wenk: -0.8 }
      : fase === 'brutus'
        ? { hoofd: [0, 0.6, 0], wenk: -1, mond: 'open' }
        : fase === 'om'
          ? { wenk: 0.3 }
          : { armL: omhoog(), armR: { schouder: [-2.2, 0, -0.4], elleboog: [0, -0.6] }, mond: 'open', wenk: -0.7 };
  return (
    <Zaal
      kijk={[0, 1.9, 0]}
      cam={fase === 'brutus' ? [0.2, 3.8, 4.4, 0.1, 3.3, 3.6] : fase === 'zestig' ? [0.6, 6, 9, 0.4, 5.2, 8] : [0.6, 4.6, 7.4, 0.3, 4.0, 6.4]}
      lengte={4}
      over={fase === 'zestig' ? <LangTeller label="In on the plot" waarde="60+" pil="senators" /> : undefined}
    >
      <Figuur {...KR} position={[0, 0, 0]} pose={caesarPose} />
      {fase === 'toga' && <Blok p={[0, 2.1, 0.12]} s={[0.62 * toga, 0.6 * toga, 0.1]} c="#F1ECE1" />}
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + 0.5;
        const r = sluit + (i >= 6 ? 1.2 : 0);
        const isBrutus = i === 2;
        return (
          <Figuur
            key={i}
            kleding={isBrutus ? BRUTUS : SENATOR}
            haar={i % 2 ? 'grijs' : 'kort'}
            position={[Math.sin(a) * r, 0, Math.cos(a) * r - 0.3]}
            rotation={[0, a + Math.PI, 0]}
            pose={fase === 'om' || fase === 'zestig' ? { wenk: 0.9 } : { armR: { schouder: [-2.4 + steek(i), 0, -0.1], elleboog: [0, -0.3] }, wenk: 1 }}
            inHand={fase === 'om' || fase === 'zestig' ? undefined : <Dolk />}
          />
        );
      })}
    </Zaal>
  );
};

/** Aan de voet van het beeld van Pompeius; de wondteller. */
export const S_Beeld = ({ wonden = false }: { wonden?: boolean }) => {
  const f = useCurrentFrame();
  const n = Math.round(lin(f, 5, 90, 0, 23));
  return (
    <Zaal warm kijk={[0, 1.2, -0.6]} cam={[2.6, 2.0, 4.8, 2.0, 1.9, 4.0]} over={wonden ? <LangTeller label="Wounds" waarde={`${n}`} pil="only one was deadly" /> : <LangTeller label="Statue of" waarde="Pompey" />}>
      <Sokkel position={[0, 0, -1.6]} h={1.2}>
        <Figuur kleding={POMPEIUS} o={{ kleur: '#E9E4DA', ruw: 0.5 }} pose={{ armR: wijs(1.0) }} />
      </Sokkel>
      <group position={[0.5, 0.22, 1.6]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <Figuur {...KR} pose={{ ogen: 'dicht' }} />
      </group>
      <Blok p={[0.3, 0.08, 0.6]} s={[1.2, 0.06, 1.8]} c="#F1ECE1" r={[0, 0.3, 0]} />
    </Zaal>
  );
};

/** Lege senaat: de Republiek is dood. */
export const S_Republiek = ({ kapot = false }: { kapot?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Forum avond={kapot} cam={[4, 2.6, 12, 2.6, 2.4, 9]} over={kapot ? <LangTeller label="After Caesar" waarde="More civil war" pil="44–31 BC" /> : <LangTeller label="Their aim" waarde="Save the Republic" />}>
      {!kapot && [-1, 0, 1].map((x) => <Figuur key={x} kleding={x === 0 ? BRUTUS : SENATOR} position={[x * 1.2, 0, 0]} pose={{ armR: x === 0 ? omhoog() : wijs(0.8) }} inHand={x === 0 ? <Dolk /> : undefined} />)}
      {kapot && [-5, 0, 5].map((x, i) => <Rook key={x} position={[x, 0, -6]} t={t + i} kleur="#4A3E36" />)}
      {kapot && <Leger rijen={2} kolommen={6} position={[0, 0, 0]} rotation={[0, 0.4, 0]} t={t} />}
    </Forum>
  );
};

/** Het testament wordt voorgelezen. */
export const S_Testament = ({ octavianus = false }: { octavianus?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Forum cam={octavianus ? [1.2, 2.0, 5.4, 0.6, 2.0, 4.4] : [3, 2.6, 9, 2, 2.4, 7]} kijk={octavianus ? [0, 1.9, 0] : [0, 1.8, 0]} over={octavianus ? <LangTeller label="Octavian" waarde="Age 18" pil="your great-nephew" /> : <LangTeller label="Your will" waarde="Octavian" pil="adopted as your son" />}>
      {octavianus ? (
        <Figuur kleding={OCTAVIANUS} position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ wenk: 0.3 }} />
      ) : (
        <>
          <Figuur kleding={SENATOR} haar="grijs" position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] }, armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] }, mond: Math.floor(f / 6) % 2 ? 'open' : 'dicht' }} inHand={<Rol />} />
          <group position={[-6, 0, -2.5]}><Menigte n={11} t={t} /></group>
        </>
      )}
    </Forum>
  );
};

/** Augustus als bronzen keizer. */
export const S_Augustus = () => (
  <Forum cam={[3.4, 1.4, 11, 2.6, 1.8, 9.6]} kijk={[0, 3.3, 0]} over={<JaarLabel jaar="27 BC" sub="Augustus, first emperor" />}>
    <Sokkel position={[0, 0, 0]} h={1.9}>
      <Figuur kleding={{ ...OCTAVIANUS, cape: '#A8322B', borst: '#8D8A84' }} o={BRONS} hoofddeksel="krans" rotation={[0, 0.25, 0]} scale={1.2} pose={{ armR: wijs(1.45) }} />
    </Sokkel>
  </Forum>
);

/** Het slotbeeld: bronzen Caesar, KAISER / TSAR (uit de short). */
export const S_Erfenis = () => (
  <Forum cam={[3.4, 1.4, 11, 2.6, 1.8, 9.6]} kijk={[0, 3.3, 0]} over={<LangTeller label="Caesar" waarde="Kaiser · Tsar" pil="the word for ruler" />}>
    <Sokkel position={[0, 0, 0]} h={1.9}>
      <Figuur kleding={CAESAR} o={BRONS} hoofddeksel="krans" rotation={[0, 0.25, 0]} scale={1.2} pose={{ armR: wijs(1.45) }} />
    </Sokkel>
  </Forum>
);

export const S_Slot = () => (
  <Forum avond cam={[3.4, 2.0, 8.2, 4.4, 2.0, 9.4]} kijk={[0, 3.0, 0]}>
    <Sokkel position={[0, 0, 0]} h={1.2}>
      <Figuur {...KR} rotation={[0, 0.5, 0]} pose={ARMEN_GEKRUIST} />
    </Sokkel>
  </Forum>
);

/* ---------------- piraten ---------------- */

/** Galei op zee met Caesar en piraten op het dek. */
export const S_Piraten = ({ fase }: { fase: 'vaart' | 'gevangen' | 'losgeld' | 'lach' | 'leider' | 'stil' | 'gedicht' | 'belofte' | 'grap' | 'vrij' }) => {
  const f = useCurrentFrame();
  const bedrag = fase === 'lach' ? Math.round(ease(f, 30, 60, 20, 50)) : 20;
  const ver = fase === 'vaart' || fase === 'gevangen' || fase === 'vrij';
  const over =
    fase === 'vaart' ? <JaarLabel jaar="c. 75 BC" sub="on the way to Rhodes" /> :
    fase === 'losgeld' || fase === 'lach' ? <LangTeller label="Ransom" waarde={`${bedrag} talents`} pil={fase === 'lach' ? 'your own idea' : 'of silver'} /> :
    fase === 'leider' ? <LangTeller label="Held" waarde={`${Math.round(lin(f, 0, 90, 1, 38))} days`} /> :
    fase === 'gedicht' ? <LangTeller label="Your poems" waarde="No applause" pil={'"savages!"'} /> :
    fase === 'belofte' ? <Citaat tekst="One day I'll come back and kill you all." /> :
    fase === 'vrij' ? <LangTeller label="Ransom" waarde="Paid" pil="you're free" /> : undefined;
  const piraatMond = (i: number) => (fase === 'grap' || fase === 'lach' ? (Math.floor(f / 5 + i) % 2 ? 'lach' : 'open') : 'dicht') as Pose['mond'];
  return (
    <OpZee avond={fase === 'belofte' || fase === 'grap'} mast={ver} cam={ver ? [19, 12, 23, 14.5, 8, 17.5] : [10.5, 3.0, 3.3, 9.6, 3.0, 2.9]} kijk={ver ? [0, 1.8, 0] : [0, 2.35, 2.85]} over={over}>
      <Figuur
        kleding={CAESAR_JONG}
        position={ver ? [0.2, D, 3.1] : [0, D, 3.6]}
        rotation={[0, ver ? 0.7 : 2.25, 0]}
        scale={ver ? 0.55 : 1}
        pose={
          fase === 'gedicht' ? { armR: { schouder: [-1.0, 0, -0.25], elleboog: [0.7, -0.9] }, armL: { schouder: [-1.0, 0, 0.25], elleboog: [-0.7, -0.9] }, mond: 'open' } :
          fase === 'stil' ? { armR: wijs(1.5), wenk: 0.9, mond: 'open' } :
          fase === 'belofte' ? { armR: wijs(1.3), mond: 'lach', wenk: 0.4 } :
          fase === 'lach' ? { ...ARMEN_GEKRUIST, mond: f > 20 ? 'lach' : 'dicht' } :
          fase === 'leider' ? { armR: omhoog(), mond: 'open' } :
          { ...ARMEN_GEKRUIST }
        }
        inHand={fase === 'gedicht' ? <Rol /> : undefined}
      />
      {[[0.05, 2.05, 0.85], [-0.9, 1.4, 1.2], [0.9, 1.0, 0.4]].map(([x, z, r], i) => (
        <Figuur
          key={i}
          kleding={PIRAAT}
          hoofddeksel="bandana"
          baard={i !== 1}
          position={ver ? [-0.6 + i * 0.6, D, 1.2 - i * 1.6] : [x, D, z]}
          rotation={[0, ver ? 0.4 + i : r, 0]}
          scale={ver ? 0.55 : 1}
          pose={{
            mond: piraatMond(i),
            ...(fase === 'gevangen' || fase === 'losgeld' ? { armR: wijs(1.4) } : fase === 'stil' ? { armR: { schouder: [-0.4, 0, -0.1] as V3, elleboog: [0, 0] as [number, number] } } : {}),
            wenk: fase === 'gedicht' ? -0.6 : fase === 'stil' ? -0.5 : 0,
          }}
          inHand={fase === 'gevangen' && i === 0 ? <Zwaard /> : undefined}
        />
      ))}
    </OpZee>
  );
};

/** Caesar komt terug met een vloot en neemt de piraten gevangen. */
export const S_Terug = ({ gevangen = false }: { gevangen?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (gevangen) {
    return (
      <OpZee avond schip={false} cam={[4, 2.4, 9, 3, 2.2, 7]} kijk={[0, 1.4, 0]} over={<LangTeller label="Promise" waarde="Kept" pil="Plutarch, Suetonius" />}>
        <Blok p={[0, -0.2, 0]} s={[12, 0.6, 6]} c="#8A7A62" />
        <Figuur kleding={CAESAR_JONG} position={[1.6, 0.1, 0.6]} rotation={[0, -1.2, 0]} pose={ARMEN_GEKRUIST} />
        {[-1.6, -0.6, 0.4].map((x, i) => <Figuur key={x} kleding={PIRAAT} hoofddeksel="bandana" baard={i !== 1} position={[x, 0.1, -0.6]} rotation={[0, 0.8, 0]} pose={{ armL: { schouder: [0.3, 0, 0.2], elleboog: [0, -0.6] }, armR: { schouder: [0.3, 0, -0.2], elleboog: [0, 0.6] }, wenk: -0.8, hoofd: [0.3, 0, 0] }} />)}
        <Figuur kleding={LEGIONAIR} hoofddeksel="helm" position={[-2.6, 0.1, 0.4]} rotation={[0, 1.0, 0]} inHand={<Blok p={[0, 0.4, 0]} s={[0.1, 2, 0.1]} c="#6B4A2E" />} />
      </OpZee>
    );
  }
  return (
    <OpZee schip={false} cam={[14, 6, 18, 11, 4.5, 14]} kijk={[0, 1, 0]} over={<LangTeller label="Your fleet" waarde="Hunting" pil="raised with your own money" />}>
      {[[-4, 2], [0, 0], [4, -2]].map(([x, z], i) => <Galei key={i} position={[x, 0, z]} rotation={[0, -0.3, 0]} deining={t + i} />)}
    </OpZee>
  );
};

/** Alexander als gouden standbeeld; Caesar huilt (uit de short). */
export const S_Alexander = ({ lang = false }: { lang?: boolean }) => {
  const f = useCurrentFrame();
  const ALEX: Kleding = { huid: '#000', haar: '#000', tuniek: '#000', schoenen: '#000', cape: '#000', borst: '#000' };
  return (
    <Shot focus={[0.7, 2.4, 2.6]} scherpte={4} mist={['#3A2A1E', 8, 30]} over={lang ? <LangTeller label="Alexander, at your age" waarde="The known world" pil="you: nothing yet" /> : <JaarLabel jaar="69 BC" sub="Gades, Spain" />}>
      <Lucht boven="#2A1E16" horizon="#4A3626" />
      <Camera pos={lang ? [ease(f, 0, 140, -1.4, -1.0), 2.6, ease(f, 0, 140, 5.6, 4.8)] : [ease(f, 0, 140, 0.6, 0.4), ease(f, 0, 140, 1.9, 2.1), ease(f, 0, 140, 7.8, 7.0)]} kijk={lang ? [-0.8, 3.2, -1.6] : [0, 2.4, -0.6]} fov={38} />
      <Binnenlicht zon={[-3, 10, 2]} kleur="#FFD49A" />
      <pointLight position={[-0.5, 6, 1]} intensity={8} distance={10} color="#FFC070" />
      <Zuilengang lengte={3} breedte={7} h={6} />
      <Sokkel position={[-0.8, 0, -1.6]} h={0.7}>
        <Figuur kleding={ALEX} o={GOUD} haar="lang" rotation={[0, 0.35, 0]} scale={1.15} pose={{ armR: wijs(1.6), hoofd: [-0.15, 0, 0] }} inHand={<Zwaard o={GOUD} />} />
      </Sokkel>
      <Figuur kleding={CAESAR_JONG} position={[0.7, 0, 2.6]} rotation={[0, -2.82, 0]} pose={{ hoofd: [-0.35, 0, 0], wenk: -0.8, traan: lin(f, 30, 110, 0, 1) }} />
    </Shot>
  );
};

/** "All in": Caesar gooit de dobbelsteen / munt op tafel. */
export const S_AllIn = () => {
  const f = useCurrentFrame();
  const y = 1.6 - ease(f, 5, 30, 0, 0.62);
  return (
    <Kamer kijk={[0, 1.2, 0]} cam={[1.6, 1.8, 3.6, 1.0, 1.6, 2.8]} over={<LangTeller label="Your plan" waarde="All in" />}>
      <Blok p={[0, 0.45, 0]} s={[1.6, 0.9, 0.9]} c="#6A4A2E" />
      <Blok p={[0.1, y, 0.1]} s={[0.16, 0.16, 0.16]} c="#F2EEE6" r={[f * 0.2 * (y > 1 ? 1 : 0), f * 0.15 * (y > 1 ? 1 : 0), 0]} />
      <Figuur kleding={CAESAR_JONG} position={[0.2, 0, -0.9]} rotation={[0, 0.1, 0]} pose={{ armR: wijs(1.0), mond: 'lach', wenk: 0.5 }} />
    </Kamer>
  );
};

/** Een tent in Gallië bij zonsondergang (provincies). */
export const S_Provincie = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Land avond cam={[5, 2.6, 11, 3.4, 2.4, 8.4]} kijk={[0, 1.8, 0]} over={<JaarLabel jaar="58 BC" sub="governor at the edge of Gaul" />}>
      <Tent position={[-3, 0, -3]} />
      <Tent position={[3, 0, -4]} />
      <Paard position={[0, 0, 0]} rotation={[0, 0.5, 0]} t={t} ruiter={<Figuur {...KR} pose={{ armR: wijs(1.2) }} />} />
    </Land>
  );
};
