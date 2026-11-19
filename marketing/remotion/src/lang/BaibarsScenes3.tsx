import { useCurrentFrame } from 'remotion';
import { Binnenlicht, Camera, Grond, Lucht, Menigte, TekstVlak } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, omhoog, wijs, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import {
  B_VER,
  B_ZUID,
  BAIBARS_SLAAF,
  Baibars,
  bk,
  bp,
  Bord2D,
  Brief,
  BURGER,
  BURGER2,
  Cairo,
  Duif,
  Haas,
  Heuvelland,
  KaartB,
  KaartPijl,
  Kaars,
  Kalief,
  Krak,
  Leeuw,
  LeeuwVaandel,
  Mameluk,
  Markt,
  MiniBaibars,
  MiniRuiter,
  OpPaard,
  Paleis,
  Palm,
  Qutuz,
  Ridder,
  Steppe,
  Valk,
  VERTELLER,
  Zegel,
  Beker,
  Joert,
  KIPCHAK,
  JaarTeller,
} from './BaibarsKit';
import { S_KindClose } from './BaibarsScenes';
import type { ShotDef } from './BaibarsShot';
import { B_1260B, B_1271, opB, BPLAATS, type BPlaats } from './KaarttafelBaibars';
import { JaarLabel, LangTeller, ORANJE, SERIF } from './LangHud';
import { BoosTeken, camPos, FiguurL, Pijllabel, TelTeller, Voorbehoud, Wolk, Zit, Zweet } from './LeonidasKit';

/**
 * Scènes voor "Baibars", hoofdstuk VII-IX en de outro (zin 69-99). De moord op Qutuz (zin 72-73) blijft buiten
 * beeld: twee handen, daarna een valk die opschrikt. De Kaaba, Mekka en gebedsruimtes komen niet in beeld.
 */

const GOUD = '#E0A93A';

/* ================= VII · The hunt ================= */

/** Kaart: hij vraagt Aleppo als beloning. */
export const S_VraagAleppo = () => (
  <KaartB van={B_1260B} cam={[{ lon: 36.6, lat: 34.2, h: 9, a: 6 }, bk('aleppo', 6, 4.4, 0.4)]} spelden={[['aleppo', GOUD]]} licht={['Syria']} over={<LangTeller label="Your reward" waarde="Aleppo?" />}>
    <group position={opB(37.0, 35.6, 0.5)}>
      <MiniBaibars />
    </group>
  </KaartB>
);

/** Qutuz schudt zijn hoofd; Baibars krijgt een boos-teken. */
export const S_Nee = () => {
  const f = useCurrentFrame();
  const schud = f > 14 && f < 70 ? Math.sin(f / 2.4) * 0.45 : 0;
  return (
    <Heuvelland cam={[0.4, 2.2, 6.0, 0.3, 2.1, 5.0]} kijk={[0, 1.8, 0]}>
      <Qutuz position={[-0.75, 0, 0]} rotation={[0, 0.7, 0]} pose={{ hoofd: [0, schud, 0], ...ARMEN_GEKRUIST, wenk: 0.5 }} />
      <Baibars position={[0.75, 0, 0]} rotation={[0, -0.7, 0]} pose={{ wenk: f > 60 ? 1 : 0.2, mond: f > 60 ? 'dicht' : 'lach' }} />
      {f > 60 && <BoosTeken p={[1.25, 2.6, 0.2]} s={0.45} />}
      {f > 14 && <Wolk p={[-1.5, 2.95, 0.2]} tekst="No." b={0.6} h={0.34} vanaf={14} staart={1} />}
    </Heuvelland>
  );
};

/** Op de terugweg gaat Qutuz op jacht: de valk op zijn arm, een haas kijkt op. */
export const S_Jacht = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Heuvelland cam={[4.6, 2.4, 9.4, 3.4, 2.2, 7.8]} kijk={[0, 2.0, 0]}>
      <OpPaard position={[-0.6, 0, 0]} rotation={[0, 0.9, 0]} t={t} kleur="#ECE6D8" dek="#3E8A4A">
        <Qutuz hof pose={{ armR: { schouder: [-1.3, 0, 0.3], elleboog: [0, -1.1] }, hoofd: [0, -0.7, 0], mond: 'lach' }} inHand={<group rotation={[2.4, 0, 0]} position={[0, -0.05, 0]}><Valk position={[0, 0, 0]} scale={1.1} /></group>} />
      </OpPaard>
      <OpPaard position={[-3.4, 0, -2.4]} rotation={[0, 0.9, 0]} t={t} dek="#B3312B">
        <Baibars pose={{ hoofd: [0, -0.7, 0], wenk: 0.4 }} />
      </OpPaard>
      <Haas position={[3.0, 0, 1.4]} rotation={[0, -0.8, 0]} op={f > 60} />
    </Heuvelland>
  );
};

/** Hij neemt zijn hand alsof hij hem wil kussen, en houdt hem vast. Close-up op de handen. */
export const S_Handen = () => {
  const f = useCurrentFrame();
  const knijp = ease(f, 50, 70, 0, 1);
  return (
    <Heuvelland cam={[0.1, 1.45, 2.4, 0.05, 1.4, 1.9]} kijk={[0, 1.25, 0]} scherpte={5} fov={30}>
      <Qutuz hof position={[0.72, 0, -0.1]} rotation={[0, -Math.PI / 2, 0]} pose={{ armR: { schouder: [-1.1, 0, 0], elleboog: [0, 0] } }} />
      <Baibars position={[-0.66, 0, -0.1]} rotation={[0, Math.PI / 2, 0]} pose={{ armR: { schouder: [-1.1 - knijp * 0.05, 0, 0], elleboog: [0, -0.05] }, armL: { schouder: [-1.0, 0, 0.3], elleboog: [0, 1.2] }, hoofd: [0.3, 0, 0] }} />
    </Heuvelland>
  );
};

/** Dan slaan de andere emirs toe: niet in beeld, wel de valk die opschrikt en wegvliegt. */
export const S_Valk = () => {
  const f = useCurrentFrame();
  const op = ease(f, 10, 90, 0, 1);
  return (
    <Heuvelland cam={[0.4, 1.4, 6.0, 0.3, 1.5, 5.4]} kijk={[0, 3.2, 0]} fov={40}>
      <Valk position={[op * 1.6, 2.4 + op * 3.4, -op * 1.4]} rotation={[-0.4, 0.4, 0]} scale={1.5} vliegt />
      {Array.from({ length: 5 }, (_, i) => <Blok key={i} p={[Math.sin(i * 2) * 0.6 * op + 0.2, 2.4 + op * 2 - i * 0.3 - lin(f, 20, 120, 0, 1.4), Math.cos(i * 2) * 0.3]} s={[0.04, 0.16, 0.03]} r={[0, 0, i + f * 0.05]} c="#6B4A2E" />)}
    </Heuvelland>
  );
};

/** De emirs in een kring om Baibars. */
export const S_Kring = () => (
  <Heuvelland cam={[0, 6.6, 6.4, 0, 5.8, 5.4]} kijk={[0, 1.2, 0]}>
    <Baibars position={[0, 0, 0]} rotation={[0, 0, 0]} pose={{ wenk: 0.3, hoofd: [-0.3, 0, 0] }} />
    {Array.from({ length: 7 }, (_, i) => {
      const a = (i / 7) * Math.PI * 2 + 0.4;
      return <Mameluk key={i} v={i} position={[Math.sin(a) * 2.2, 0, Math.cos(a) * 2.2 - 0.3]} rotation={[0, a + Math.PI, 0]} pose={{ hoofd: [0.2, 0, 0], wenk: 0.2 }} />;
    })}
  </Heuvelland>
);

/** Ze wijzen allemaal naar hem; hij wijst naar zichzelf: "me?" */
export const S_Kiezen = () => {
  const f = useCurrentFrame();
  return (
    <Heuvelland cam={[0.6, 2.4, 7.4, 0.4, 2.2, 6.2]} kijk={[0, 1.7, 0]}>
      <Baibars position={[0, 0, 0]} pose={{ armR: f > 10 ? { schouder: [-1.0, 0, -0.35], elleboog: [0, -2.0] } : undefined, mond: f > 10 ? 'open' : 'dicht', wenk: -0.3 }} />
      {f > 10 && <Wolk p={[0.75, 2.85, 0.3]} tekst="ME?" b={0.7} h={0.36} vanaf={10} staart={-1} />}
      {[-2.4, -1.4, 1.4, 2.4].map((x, i) => <Mameluk key={x} v={i} position={[x, 0, -0.6 + Math.abs(x) * 0.2]} rotation={[0, -Math.sign(x) * 1.1, 0]} pose={{ armR: f > 2 + i * 2 ? wijs(1.4) : undefined, mond: 'lach' }} />)}
    </Heuvelland>
  );
};

/** De nieuwe naam in goud op een banier. */
export const S_Naam = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Cairo tijd="avond" cam={[0.8, 2.3, 10.4, 0.6, 2.3, 9.4]} kijk={[0.3, 2.5, 0.6]} over={<Bord2D tekst="al-Malik al-Zahir" sub="“the victorious king”" vanaf={8} top={40} />}>
      <group position={[0, 0, 0.6]}>
        <Blok p={[0, 2.4, 0]} s={[0.08, 4.8, 0.08]} c="#5A3B24" />
        <Blok p={[0, 4.6, 0]} s={[3.2, 0.08, 0.08]} c="#5A3B24" />
        <Blok p={[0, 3.6, 0.03]} s={[3.0, 1.9, 0.04]} c="#8E2A2A" r={[Math.sin(t * 2) * 0.03, 0, 0]} />
        <Leeuw position={[0.4, 3.0, 0.08]} scale={0.8} kleur={GOUD} o />
      </group>
      <Baibars leeftijd="sultan" position={[0.9, 0, 1.8]} rotation={[0, -0.3, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach', wenk: 0.3 }} />
    </Cairo>
  );
};

/** Cairo was versierd voor Qutuz: groene slingers. */
export const S_Slingers = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Cairo slingers poort={1} vlag="#3E8A4A" cam={[3.4, 2.4, 11, 2.4, 2.4, 9.4]} kijk={[0, 2.6, -1]} over={<LangTeller label="Cairo" waarde="ready for Qutuz" />}>
      <Menigte n={9} z={2.4} x0={-5} t={t} juich />
      <QutuzBanier position={[3.6, 0, -1.2]} plak={0} />
    </Cairo>
  );
};
/** Grote banier van Qutuz aan de muur; `plak` schuift er een Baibars-plaat overheen. */
const QutuzBanier = ({ position, plak }: { position: V3; plak: number }) => (
  <group position={position}>
    <Blok p={[0, 3.2, 0]} s={[1.8, 2.4, 0.05]} c="#3E8A4A" />
    <Blok p={[0, 3.5, 0.04]} s={[0.7, 0.4, 0.02]} c="#ECE6D8" />
    <Blok p={[0, 3.0, 0.04]} s={[0.6, 0.6, 0.02]} c="#C28C60" />
    {plak > 0 && (
      <group position={[0, 3.2 + (1 - plak) * 2.6, 0.08]}>
        <Blok p={[0, 0, 0]} s={[1.9, 2.5, 0.03]} c="#E0A93A" />
        <Leeuw position={[0.25, -0.5, 0.03]} scale={0.6} kleur="#7A2A24" />
      </group>
    )}
  </group>
);

/** Iemand plakt een Baibars-plaat over het vaandel van Qutuz; de menigte juicht voor jou. */
export const S_Plakken = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const plak = ease(f, 20, 60, 0, 1);
  return (
    <Cairo slingers vlag={GOUD} cam={[5.6, 2.6, 8.6, 4.8, 2.6, 7.2]} kijk={[3.0, 2.6, -1]}>
      <QutuzBanier position={[3.6, 0, -1.2]} plak={plak} />
      <group position={[2.4, 0, -0.6]}>
        {[0, 1, 2, 3, 4].map((i) => <Blok key={i} p={[0, 0.4 + i * 0.6, 0]} s={[0.7, 0.06, 0.06]} c="#6B4A2E" />)}
        {[-0.32, 0.32].map((x) => <Blok key={x} p={[x, 1.6, 0]} s={[0.06, 3.2, 0.06]} c="#6B4A2E" />)}
      </group>
      <FiguurL kleding={BURGER2} haar="kort" snor hoofddeksel="tulband" position={[2.6, 1.6, -0.3]} rotation={[0, 0.9, 0]} pose={{ armR: omhoog(), mond: 'lach' }} />
      <Menigte n={8} z={2.2} x0={-2} t={t} juich={plak > 0.8} />
    </Cairo>
  );
};

/* ================= VIII · The sultan ================= */

/** Zeventien jaar, nooit stil: Baibars te paard flitst steeds weer door het beeld. */
export const S_Flits = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = ((f * 0.22 + 4) % 13) - 6.5;
  return (
    <Heuvelland cam={[0, 2.2, 12.6, 0, 2.2, 12.0]} kijk={[0, 1.8, 0]} over={<JaarTeller label="Your reign" van={1260} tot={1277} a={6} b={150} />}>
      <OpPaard position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t * 1.4} loopt dek={GOUD}>
        <Baibars leeftijd="sultan" pose={{ hoofd: [0, -0.9, 0], mond: 'lach' }} />
      </OpPaard>
      {Array.from({ length: 4 }, (_, i) => <Blok key={i} p={[x - 1.8 - i * 0.5, 0.3 + (i % 2) * 0.2, -0.3]} s={[0.5 - i * 0.08, 0.4 - i * 0.06, 0.4]} c="#D8C29A" rough={1} />)}
    </Heuvelland>
  );
};

/** Een overlevende Abbasiden-prins wordt kalief in Cairo; Baibars buigt. */
export const S_Kalief = () => {
  const f = useCurrentFrame();
  const buig = ease(f, 20, 50, 0, 1);
  return (
    <Paleis cam={[2.4, 2.4, 7.2, 1.6, 2.2, 6.0]} kijk={[0, 1.6, -0.6]} over={<Pijllabel tekst="a surviving Abbasid, now caliph" x={560} y={230} naar={[760, 380]} vanaf={14} />}>
      <Kalief position={[-0.8, 0, -0.6]} rotation={[0, 0.6, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.2], elleboog: [0, -0.4] } }} />
      <Baibars leeftijd="sultan" position={[0.8, 0, 0]} rotation={[buig * 0.35, -0.9, 0]} pose={{ hoofd: [buig * 0.4, 0, 0], armR: { schouder: [-0.3, 0, 0.4], elleboog: [0, -1.2] } }} />
      {[-2.6, 2.6].map((x, i) => <Mameluk key={x} v={i} position={[x, 0, -1.2]} rotation={[0, -Math.sign(x) * 0.5, 0]} pose={{ ...ARMEN_GEKRUIST }} />)}
    </Paleis>
  );
};

/** Kaart: de post van Cairo naar Damascus, met relaispaarden en postduiven: ongeveer vier dagen. */
export const S_Post = () => {
  const f = useCurrentFrame();
  const route: [number, number][] = [bp('cairo'), [32.6, 30.9], bp('gaza'), [35.0, 32.3], bp('damascus')];
  const pts = route.map(([lon, lat]) => opB(lon, lat, 0.55));
  const pos = (p: number): V3 => {
    const n = pts.length - 1;
    const k = Math.min(n - 1, Math.floor(p * n));
    const q = p * n - k;
    return [pts[k][0] + (pts[k + 1][0] - pts[k][0]) * q, 0.55, pts[k][2] + (pts[k + 1][2] - pts[k][2]) * q];
  };
  const p = lin(f, 8, 150, 0, 1);
  return (
    <KaartB van={B_1260B} cam={[B_ZUID, { lon: 33.8, lat: 31.8, h: 9, a: 6 }]} spelden={[['cairo', GOUD], ['damascus', GOUD]]} route={route} routeTijd={[6, 150]} over={<LangTeller label="Cairo → Damascus" waarde="~4 days" pil="relay horses and carrier pigeons" />}>
      {[0.25, 0.5, 0.75].map((q) => <group key={q} position={pos(q)}><Blok p={[0, 0.1, 0]} s={[0.3, 0.2, 0.3]} c="#8A6A44" /></group>)}
      <group position={pos(p)} scale={0.22} rotation={[0, -0.9, 0]}><MiniRuiter position={[0, 0, 0]} t={f / FPS} loopt /></group>
      <group position={[pos(Math.min(1, p * 1.25))[0], 1.6, pos(Math.min(1, p * 1.25))[2]]} rotation={[0, -0.9, 0]}><Duif position={[0, 0, 0]} vliegt zakje scale={1.4} /></group>
    </KaartB>
  );
};

/** In vermomming op de markt: zijn nepbaard valt half af. */
export const S_Vermomming = () => {
  const f = useCurrentFrame();
  const val = ease(f, 70, 90, 0, 1);
  return (
    <Markt cam={[1.8, 2.0, 6.4, 1.2, 1.9, 5.2]} kijk={[0, 1.6, 0]}>
      <FiguurL
        kleding={{ ...BAIBARS_SLAAF, cape: '#6B5A3A' }}
        haar="kort"
        hoofddeksel="kap"
        oogKleur="#4AA8E8"
        oogVlek
        position={[0, 0, 0.4]}
        rotation={[0, 0.2, 0]}
        pose={{ hoofd: [0, Math.sin(f / 20) * 0.4, 0], wenk: 0.3 }}
        hoofdExtra={
          <group position={[0.24 * val, 0.12 - val * 0.1, 0.3]} rotation={[0, 0, -val * 0.8]}>
            <Blok p={[0, 0, 0]} s={[0.6, 0.26, 0.06]} c="#5A3A22" />
            <Blok p={[0, -0.18, -0.02]} s={[0.42, 0.18, 0.06]} c="#5A3A22" />
          </group>
        }
      />
      <FiguurL kleding={BURGER} haar="kort" baard hoofddeksel="tulband" position={[-1.5, 0, -0.2]} rotation={[0, 0.7, 0]} pose={{ armR: wijs(1.0), mond: 'open' }} />
      <FiguurL kleding={BURGER2} haar="kort" snor hoofddeksel="tulband" position={[1.5, 0, -0.4]} rotation={[0, -0.6, 0]} pose={{ wenk: f > 85 ? -0.6 : 0, mond: f > 85 ? 'open' : 'dicht' }} />
      {f > 86 && <Zweet p={[0.4, 2.45, 0.6]} n={1} />}
    </Markt>
  );
};

/** De leeuw van Baibars op een munt en op een brug; de leeuw knipoogt. */
export const S_Leeuw = () => {
  const f = useCurrentFrame();
  return (
    <Heuvelland cam={[0.3, 1.9, 4.2, 0.2, 1.85, 3.4]} kijk={[0, 1.7, 0]} scherpte={3.6}>
      <group position={[0, 1.7, 0.4]} rotation={[0, Math.sin(f / 30) * 0.35, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.1, 28]} />
          <meshStandardMaterial color="#E6E9EC" metalness={0.3} roughness={0.4} />
        </mesh>
        <Leeuw position={[0.15, -0.36, 0.06]} scale={0.45} kleur="#9AA0A6" knipoog={f > 80 && f < 96} />
      </group>
      {/* de brug met leeuwen erachter */}
      <group position={[0, 0, -9]}>
        <Blok p={[0, 1.4, 0]} s={[10, 0.6, 2]} c="#BFA87E" />
        {[-3, 0, 3].map((x) => <Blok key={x} p={[x, 0.6, 0]} s={[1.2, 1.2, 2]} c="#B39868" />)}
        {[-4.6, 4.6].map((x, i) => <Leeuw key={x} position={[x, 1.7, 1.1]} rotation={[0, i ? Math.PI : 0, 0]} scale={0.9} kleur="#BFA87E" />)}
      </group>
    </Heuvelland>
  );
};

/** Een kasteeltje op de kaart. */
const MiniKasteel = ({ p, val = 0 }: { p: [number, number]; val?: number }) => {
  const [x, , z] = opB(p[0], p[1], 0.45);
  return (
    <group position={[x, 0.45, z]} scale={0.32}>
      <Blok p={[0, 0.4, 0]} s={[1, 0.8, 1]} c={val ? GOUD : '#B8B4AA'} />
      {[-0.4, 0.4].map((dx) => [-0.4, 0.4].map((dz) => <Blok key={`${dx}${dz}`} p={[dx, 0.95, dz]} s={[0.3, 0.3, 0.3]} c={val ? GOUD : '#B8B4AA'} />))}
      <Blok p={[0, 1.4, 0]} s={[0.04, 0.6, 0.04]} c="#3A2A1C" />
      <Blok p={[0.18, 1.6, 0]} s={[0.36, 0.22, 0.02]} c={val ? '#E39A2C' : '#7E8C9E'} />
    </group>
  );
};
const KASTELEN: BPlaats[] = ['caesarea', 'arsuf', 'safed', 'antiochie', 'krak'];

/** Kaart: de kruisvaarderskastelen, één voor één. */
export const S_Kastelen = () => (
  <KaartB van={B_1260B} cam={[{ lon: 35.8, lat: 33.6, h: 11, a: 7 }, { lon: 35.6, lat: 33.8, h: 9, a: 6 }]} over={<LangTeller label="Crusader castles" waarde="one by one" />}>
    {KASTELEN.map((k) => <MiniKasteel key={k} p={[BPLAATS[k][0], BPLAATS[k][1]]} />)}
  </KaartB>
);
/** Kaart: Caesarea, Arsuf, Safed, Antiochië kleuren één voor één geel. */
export const S_Vier = () => {
  const f = useCurrentFrame();
  const STAP = [6, 24, 40, 58];
  return (
    <KaartB van={B_1260B} naar={B_1271} wissel={[10, 80]} cam={[{ lon: 35.6, lat: 33.8, h: 9, a: 6 }, { lon: 35.6, lat: 34.2, h: 10, a: 6.5 }]} over={<LangTeller label="Taken" waarde={['Caesarea', 'Arsuf', 'Safed', 'Antioch'][Math.min(3, STAP.filter((s) => f >= s).length - 1)] ?? '…'} pil="1265 – 1268" />}>
      {KASTELEN.map((k, i) => <MiniKasteel key={k} p={[BPLAATS[k][0], BPLAATS[k][1]]} val={i < 4 && f > STAP[i] ? 1 : 0} />)}
    </KaartB>
  );
};

/** NEVER TAKEN / NEVER TAKEN met een streep: 2D-bordje boven Krak des Chevaliers. */
const KrakBord = ({ streep = 0 }: { streep?: number }) => (
  <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
    <div style={{ background: 'rgba(28,26,22,0.86)', border: `3px solid ${ORANJE}`, borderRadius: 18, padding: '10px 40px 14px', fontFamily: SERIF, fontWeight: 800, fontSize: 76, color: '#FFF4E0', letterSpacing: 3, position: 'relative' }}>
      <span style={{ position: 'relative' }}>
        NEVER
        {streep > 0 && <span style={{ position: 'absolute', left: -8, top: '52%', height: 12, width: `${streep * 112}%`, background: '#E8382B', borderRadius: 6, transform: 'rotate(-6deg)' }} />}
      </span>{' '}
      TAKEN
    </div>
  </div>
);

/** Krak des Chevaliers, nooit gevallen. */
export const S_Krak = () => <Krak over={<><KrakBord /><Pijllabel tekst="Krak des Chevaliers" x={1360} y={420} naar={[1080, 540]} vanaf={20} /></>} />;

/** Een brief met lakzegel gaat naar het kasteel. */
export const S_BriefKrak = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Krak cam={[5.4, 7.6, 15.4, 4.0, 7.5, 13.2]} kijk={[0, 7.7, 5.2]}>
      <Ridder v={2} position={[0.6, 6.6, 5.6]} rotation={[0, 0.2, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.1], elleboog: [0, -0.3] }, mond: 'open', wenk: -0.5 }} />
      <group position={[0.95, 8.1, 6.25]} rotation={[-0.2, 0.2, 0]}>
        <Brief tekst={['SURRENDER.', '— your', 'commander']} b={0.55} h={0.62} />
        <Zegel p={[0.16, -0.24, 0.02]} />
      </group>
      <Ridder v={0} position={[-0.7, 6.6, 5.2]} rotation={[0, 0.4, 0]} pose={{ wenk: -0.4, mond: 'open' }} />
      {void t}
    </Krak>
  );
};

/** De brief is vervalst: Baibars oefent de handtekening, tong uit de mond. */
export const S_Vervalsen = () => {
  const f = useCurrentFrame();
  const pen = Math.sin(f / 3) * 0.08;
  return (
    <Paleis donker cam={[0.4, 2.2, 3.8, 0.3, 2.1, 3.1]} kijk={[0, 1.4, 0]}>
      <Blok p={[0, 0.45, 0.5]} s={[2.2, 0.9, 0.9]} c="#6B4A2E" />
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[-0.8 + (i % 3) * 0.55, 0.92, 0.35 + Math.floor(i / 3) * 0.32]} rotation={[-Math.PI / 2, 0, (i - 2) * 0.25]}>
          <TekstVlak regels={[i === 5 ? 'Hugues' : 'Hgu~s']} b={0.42} h={0.26} achter="#EFE3C4" voor={i === 5 ? '#1A3A8A' : '#5A4A3A'} fontPx={110} />
        </group>
      ))}
      <Baibars leeftijd="sultan" position={[0, 0, -0.35]} pose={{ hoofd: [0.45, 0.2, 0], armR: { schouder: [-0.9, 0, 0.1], elleboog: [0, -0.7 + pen] }, wenk: 0.6 }} extra={<Blok p={[0.05, 2.0, 0.3]} s={[0.07, 0.06, 0.04]} c="#E86A7A" />} inHand={<Blok p={[0, -0.05, 0.12]} s={[0.03, 0.3, 0.03]} r={[0.6, 0, 0]} c="#ECE6D8" />} />
      <Kaars position={[0.9, 0.9, 0.6]} />
      <pointLight position={[0.9, 1.6, 1.0]} intensity={4} distance={4} color="#FFB060" />
    </Paleis>
  );
};

/** Ze geven zich toch over: de ridders lopen het kasteel uit; NEVER wordt doorgestreept. */
export const S_Overgave = () => {
  const f = useCurrentFrame();
  const loop = ease(f, 0, 170, 0, 3);
  return (
    <Krak cam={[5.6, 7.6, 16, 4.2, 7.5, 13.6]} kijk={[0.6, 7.8, 5.6]} over={<KrakBord streep={lin(f, 40, 60, 0, 1)} />}>
      {[0, 1, 2].map((i) => <Ridder key={i} v={i} position={[-0.5 + i * 0.5, 6.6, 4.9 + loop - i * 0.7]} rotation={[0, 0, 0]} pose={{ armL: omhoog(), wenk: -0.4 }} />)}
      <Baibars leeftijd="sultan" position={[2.4, 6.6, 7.2]} rotation={[0, -0.8, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach', wenk: 0.3 }} />
    </Krak>
  );
};

/* ================= IX · The cup ================= */

/** Kaart: 1277, nog één keer de Mongolen verslagen, diep in Anatolië. */
export const S_Elbistan = () => {
  const f = useCurrentFrame();
  return (
    <KaartB van={B_1271} cam={[{ lon: 36.5, lat: 35.5, h: 13, a: 8 }, bk('elbistan', 8, 6, 0.4)]} spelden={[['elbistan', GOUD]]} over={<JaarLabel jaar="1277" sub="Elbistan, Anatolia" />}>
      <KaartPijl van={[36.4, 34.0]} naar={[37.0, 37.8]} p={ease(f, 6, 70, 0, 1)} kleur="#F2B03A" dik={0.26} />
    </KaartB>
  );
};

/** Damascus: een beker kumis, gegiste merriemelk. */
export const S_Kumis = () => {
  const f = useCurrentFrame();
  return (
    <Paleis donker cam={[0.5, 2.0, 3.6, 0.35, 1.95, 3.0]} kijk={[0, 1.7, 0]} over={<Pijllabel tekst="kumis: fermented mare's milk" x={1320} y={250} naar={[1030, 470]} vanaf={30} />}>
      <Baibars leeftijd="sultan" position={[0, 0, -0.2]} pose={{ armR: { schouder: [-0.8, 0, -0.4], elleboog: [0, -1.1] }, mond: 'dicht', wenk: -0.2, hoofd: [0.25, 0, 0] }} inHand={<group position={[0, -0.02, 0.04]} rotation={[1.9, 0, 0]}><Beker melk /></group>} />
      <Kaars position={[1.0, 1.0, 0.4]} />
      <Blok p={[1.0, 0.5, 0.4]} s={[0.5, 1.0, 0.5]} c="#5A3B24" />
      <pointLight position={[0.8, 1.8, 1.0]} intensity={4} distance={4} color="#FFB060" />
      {void f}
    </Paleis>
  );
};
/** In de damp van de beker: de steppe waar hij vandaan kwam (sepia). */
export const S_KumisDroom = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Steppe tijd="avond" joerten={false} cam={[2.6, 2.0, 8.0, 2.0, 1.9, 6.8]} kijk={[0, 1.4, 0]} over={<div style={{ position: 'absolute', inset: 0, background: 'rgba(140,96,40,0.3)', mixBlendMode: 'multiply' }} />}>
      <Joert position={[-2.6, 0, -2.4]} rotation={[0, 0.5, 0]} />
      <Baibars leeftijd="kind" position={[0.4, 0, 0.4]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach' }} />
      <FiguurL kleding={KIPCHAK} haar="kort" snor position={[1.4, 0, -0.4]} rotation={[0, -0.6, 0]} pose={{ armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.4] } }} inHand={<group rotation={[1.5, 0, 0]}><Beker melk /></group>} />
      {void t}
    </Steppe>
  );
};

/** Een paar dagen later: de lege beker, de kaars dooft. */
export const S_LegeBeker = ({ teller = false }: { teller?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Paleis donker cam={teller ? [1.6, 2.2, 5.6, 1.2, 2.0, 4.8] : [0.6, 1.4, 2.8, 0.45, 1.3, 2.3]} kijk={[0.2, 0.95, 0.2]} over={teller ? <LangTeller label="Age" waarde="~54" /> : undefined}>
      <Blok p={[0.2, 0.45, 0.2]} s={[1.6, 0.9, 1.0]} c="#6B4A2E" />
      <group position={[0, 1.0, 0.3]} rotation={[0, 0.4, Math.PI / 2]}><Beker melk={false} /></group>
      <Kaars position={[0.6, 0.9, 0.0]} uit={teller ? 1.4 : ease(f, 50, 80, 0, 1.3)} />
      {(!teller && f < 80) && <pointLight position={[0.6, 1.5, 0.4]} intensity={3 * (1 - lin(f, 50, 80, 0, 1))} distance={4} color="#FFB060" />}
      {teller && <LeeuwVaandel position={[-1.6, 0, -1.6]} t={0} />}
      {teller && <pointLight position={[-0.6, 2.6, 0.6]} intensity={3} distance={6} color="#FFB060" />}
    </Paleis>
  );
};

/** Eén verhaal zegt dat de beker vergiftigd was, en voor iemand anders bedoeld: twee bekers wisselen van plaats. */
export const S_Bekers = () => {
  const f = useCurrentFrame();
  const w = ease(f, 30, 80, 0, 1);
  return (
    <Paleis cam={[0.2, 1.9, 3.0, 0.15, 1.85, 2.5]} kijk={[0, 1.0, 0.3]} over={<Voorbehoud tekst="one story says…" />}>
      <Blok p={[0, 0.45, 0.3]} s={[2.0, 0.9, 1.0]} c="#6B4A2E" />
      {[-1, 1].map((k) => {
        const x = k * 0.4 * (1 - 2 * w);
        const z = 0.35 + Math.sin(w * Math.PI) * 0.25 * k;
        return (
          <group key={k} position={[x, 0.9, z]}>
            <Beker melk />
            {k < 0 && <Blok p={[0, 0.32, 0]} s={[0.12, 0.12, 0.02]} c="#5E8A3A" />}
            <Blok p={[k * 0.12, 0.12, 0.6]} s={[0.12, 0.12, 1.1]} c="#C28C60" />
          </group>
        );
      })}
    </Paleis>
  );
};

/** Begraven in Damascus, onder een koepel die nu bij een bibliotheek hoort. */
export const S_Koepel = () => {
  const f = useCurrentFrame();
  return (
    <Cairo cam={[4.4, 3.2, 15.6, 3.4, 3.2, 13.8]} kijk={[0, 3.6, 2.6]} over={<><JaarLabel jaar="Damascus" sub="today: al-Zahiriyya Library" /></>}>
      <group position={[0, 0, 2.6]}>
        <Blok p={[0, 2.2, 0]} s={[5, 4.4, 4]} c="#D8C7A2" rough={1} />
        <Blok p={[0, 4.5, 0]} s={[4.2, 0.4, 3.4]} c="#C9B48A" />
        <mesh position={[0, 4.7, 0]} castShadow>
          <sphereGeometry args={[1.7, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#B8A07A" roughness={0.9} flatShading />
        </mesh>
        <Blok p={[0, 1.4, 2.02]} s={[1.6, 2.8, 0.04]} c="#2A1E14" />
        {[0.5, 1.1, 1.7, 2.3].map((y) => <Blok key={y} p={[0, y, 1.96]} s={[1.4, 0.06, 0.3]} c="#6B4A2E" />)}
        {[0.5, 1.1, 1.7, 2.3].map((y, i) => Array.from({ length: 6 }, (_, j) => <Blok key={`${y}${j}`} p={[-0.55 + j * 0.22, y + 0.17, 1.98]} s={[0.12, 0.28, 0.2]} c={['#8E2A2A', '#3E6B8A', '#5E8A5A', '#C9A646'][(i + j) % 4]} />))}
      </group>
      <Palm position={[-3.8, 0, 3.6]} />
      {void f}
    </Cairo>
  );
};

/** Vertellers in de koffiehuizen: een Baibars-poppetje, een kind valt bijna van zijn kruk. */
export const S_Koffiehuis = () => {
  const f = useCurrentFrame();
  const kantel = Math.max(0, Math.sin(f / 20)) * 0.35;
  return (
    <Shot focus={[0, 1.3, 0]} scherpte={3.2} mist={['#2A1E14', 6, 26]}>
      <Lucht boven="#1E1610" horizon="#2A1E14" />
      <hemisphereLight args={['#8A7A68', '#2A1E14', 0.7]} />
      <pointLight position={[0, 3.0, 1.4]} intensity={8} distance={9} color="#FFA850" />
      <Binnenlicht zon={[3, 6, 6]} kleur="#FFB070" />
      <Grond kleur="#7A5A3A" />
      <Blok p={[0, 3, -2.4]} s={[10, 6, 0.3]} c="#C9A27A" />
      {[-2.6, 2.6].map((x) => <Blok key={x} p={[x, 2.6, -2.2]} s={[0.4, 0.4, 0.2]} c="#D8A945" emissive="#8A5A12" />)}
      <Blok p={[0, 0.3, -1.2]} s={[1.6, 0.6, 1.0]} c="#6B4A2E" />
      <Zit kleding={VERTELLER} haar="grijs" baard hoofddeksel="tulband" position={[0, 0.6, -1.2]} pose={{ armR: { schouder: [-1.6, 0, -0.4], elleboog: [0, -0.4] }, armL: omhoog(), mond: Math.floor(f / 6) % 2 ? 'open' : 'dicht' }} inHand={<group position={[0, -0.05, 0.1]} rotation={[Math.PI / 2, 0, 0]}><Baibars leeftijd="sultan" scale={0.22} rotation={[0, 0, 0]} /></group>} />
      {[-1.6, -0.6, 0.6, 1.6].map((x, i) => (
        <group key={x} position={[x, 0, 0.8 + (i % 2) * 0.3]} rotation={[i === 3 ? 0 : 0, Math.PI + (x < 0 ? -0.3 : 0.3), i === 3 ? kantel : 0]}>
          <Blok p={[0, 0.25, 0]} s={[0.4, 0.5, 0.4]} c="#5A3B24" />
          <Zit kleding={[BURGER, BURGER2, VERTELLER, { ...BURGER, tuniek: '#8E4A5A', rok: '#7A3E4E' }][i]} haar="kort" scale={0.6} position={[0, 0.5, 0]} pose={{ mond: 'open', hoofd: [-0.2, 0, 0] }} />
        </group>
      ))}
      {[[-2.4, 0.2], [2.4, 0.2]].map(([x, z], i) => <group key={i} position={[x, 0, z]}><Blok p={[0, 0.35, 0]} s={[0.6, 0.7, 0.6]} c="#6B4A2E" /><Blok p={[0, 0.78, 0]} s={[0.1, 0.16, 0.1]} c="#ECE6D8" /></group>)}
      <Camera pos={camPos(f, [0.6, 1.9, 6.0, 0.4, 1.8, 5.0], 160)} kijk={[0, 1.3, 0]} fov={36} />
    </Shot>
  );
};

/** Outro: de steppe bij avond, de jongen en een paard. */
export const S_Slot = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Steppe tijd="avond" cam={[3.4, 2.0, 9.4, 2.6, 2.0, 8.2]} kijk={[0, 1.4, 0]}>
      <Baibars leeftijd="kind" position={[-0.4, 0, 0.4]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach' }} />
      <OpPaard position={[1.4, 0, -0.4]} rotation={[0, -0.6, 0]} t={t} kleur="#8A6A44" dek="#B3542A">
        <group />
      </OpPaard>
    </Steppe>
  );
};

void B_VER;
void Duif;
void MiniBaibars;
void TekstVlak;

export const SHOTS_C: ShotDef[] = [
  // ---------- VII · The hunt ----------
  { zin: 69, C: S_VraagAleppo, hoofdstuk: ['VII', 'The hunt'], accent: [{ bij: 1.6, src: 'tik', vol: 0.2 }] },
  { zin: 70, C: S_Nee, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 71, C: S_Jacht, sfeer: 'wind', vol: 0.1 },
  { zin: 72, C: S_Handen, sfeer: 'wind', vol: 0.05 },
  { zin: 73, C: S_Valk, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.3, src: 'whoosh', vol: 0.18 }] },
  { zin: 74, C: () => <S_Kring />, sfeer: 'wind', vol: 0.06 },
  { zin: 75, C: S_Kiezen, accent: [{ bij: 1.0, src: 'glans', vol: 0.16 }] },
  { zin: 76, C: S_Naam, accent: [{ bij: 0.3, src: 'glans', vol: 0.18 }, { bij: 0.4, src: 'inslag', vol: 0.14 }] },
  { zin: 77, C: S_Slingers, sfeer: 'menigte', vol: 0.12 },
  { zin: 78, C: S_Plakken, sfeer: 'menigte', vol: 0.16, accent: [{ bij: 2.0, src: 'tik', vol: 0.18 }] },
  // ---------- VIII · The sultan ----------
  { zin: 79, C: S_Flits, hoofdstuk: ['VIII', 'The sultan'], accent: [{ bij: 1.0, src: 'whoosh', vol: 0.14 }, { bij: 3.2, src: 'whoosh', vol: 0.14 }] },
  { zin: 80, C: S_Kalief, accent: [{ bij: 1.2, src: 'glans', vol: 0.14 }] },
  { zin: 81, C: S_Post, accent: [{ bij: 1.0, src: 'tik', vol: 0.18 }, { bij: 2.4, src: 'tik', vol: 0.18 }, { bij: 3.8, src: 'tik', vol: 0.18 }] },
  { zin: 82, C: S_Vermomming, sfeer: 'menigte', vol: 0.08, accent: [{ bij: 2.6, src: 'val', vol: 0.12 }] },
  { zin: 83, C: S_Leeuw, accent: [{ bij: 0.4, src: 'munt', vol: 0.2 }, { bij: 2.9, src: 'glans', vol: 0.16 }] },
  { zin: 84, C: S_Kastelen, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 85, C: S_Vier, accent: [{ bij: 0.2, src: 'tik', vol: 0.22 }, { bij: 0.8, src: 'tik', vol: 0.22 }, { bij: 1.33, src: 'tik', vol: 0.22 }, { bij: 1.93, src: 'tik', vol: 0.22 }] },
  { zin: 86, C: S_Krak, sfeer: 'wind', vol: 0.12 },
  { zin: 87, C: S_BriefKrak, sfeer: 'wind', vol: 0.08, accent: [{ bij: 0.5, src: 'tik', vol: 0.16 }] },
  { zin: 88, C: S_Vervalsen, accent: [{ bij: 0.3, src: 'tik', vol: 0.16 }, { bij: 0.6, src: 'tik', vol: 0.14 }] },
  { zin: 89, C: S_Overgave, sfeer: 'wind', vol: 0.08, accent: [{ bij: 1.5, src: 'inslag', vol: 0.18 }] },
  // ---------- IX · The cup ----------
  { zin: 90, C: S_Elbistan, hoofdstuk: ['IX', 'The cup'], accent: [{ bij: 1.6, src: 'inslag', vol: 0.18 }] },
  { zin: 91, C: S_Kumis, sfeer: 'vuur', vol: 0.04 },
  { zin: 91, na: 3.4, C: S_KumisDroom, sfeer: 'wind', vol: 0.08 },
  { zin: 92, C: () => <S_LegeBeker />, sfeer: 'wind', vol: 0.06 },
  { zin: 93, C: () => <S_LegeBeker teller />, accent: [{ bij: 0.3, src: 'tik', vol: 0.2 }] },
  { zin: 94, C: S_Bekers, accent: [{ bij: 1.0, src: 'tik', vol: 0.16 }, { bij: 2.0, src: 'tik', vol: 0.16 }] },
  { zin: 95, C: S_Koepel, sfeer: 'wind', vol: 0.08 },
  { zin: 96, C: S_Koffiehuis, sfeer: 'menigte', vol: 0.08 },
  { zin: 97, C: () => <S_KindClose slot />, accent: [{ bij: 1.6, src: 'glans', vol: 0.16 }] },
  // ---------- outro ----------
  { zin: 98, C: S_Slot, sfeer: 'wind', vol: 0.05, accent: [{ bij: 0.2, src: 'afsluiter', vol: 0.22 }] },
];
