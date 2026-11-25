import { useCurrentFrame } from 'remotion';
import { Camera, Fakkel, Galei, Grond, Ketting, Leger, Nachtlicht, Paard, Rots, Sokkel, TekstVlak, Vuur, Zee } from '../watals/Decor';
import { ARMEN_GEKRUIST, BRONS, Blok, Figuur, Kroon, Rol, omhoog, wijs, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { Citaat } from './CaesarScenes';
import { G_480, G_INVAL, G_LEEG, G_PERZIE, G_SPARTA, opGriek, PLAATS } from './KaarttafelGriek';
import { JaarLabel, LangTeller } from './LangHud';
import {
  BODE,
  BoosTeken,
  camPos,
  CLEOMENES,
  Damp,
  DARIUS,
  Delphi,
  DEMARATUS,
  DIENEKES,
  DORIEUS,
  EFOR,
  EPHIALTES,
  Falanx,
  FilmLabels,
  G_GRIEKENLAND,
  G_VER,
  Geit,
  GORGO,
  GORGO_JONG,
  GrootGetal,
  Hal,
  Hellespont,
  Hoplon,
  Hopliet,
  Huis,
  KaartG,
  Klapster,
  LEONIDAS,
  LEONIDAS_JONG,
  LEONIDAS_KAMP,
  MiniSpartaan,
  Pas,
  PAUSANIAS,
  PersLeger,
  PersSoldaat,
  PerzTent,
  pl,
  Potje,
  Put,
  PYTHIA,
  Sparta,
  Spartaan,
  SPARTAAN,
  SPARTAAN2,
  SPARTAAN_BLOOT,
  Speer,
  Stempel,
  Streepjes,
  TelTeller,
  THESPIER,
  Troon,
  Voorbehoud,
  VREEMDE,
  VREEMDELING,
  Wolk,
  XERXES,
  Zit,
  Zweet,
  FiguurL,
} from './LeonidasKit';

/**
 * Scènes III-IX van "What if you were Leonidas?" (vervolg op LeonidasScenes.tsx).
 * De dood van Leonidas is een helm in het stof; geen lichamen, geen bloed, geen kruisvormen.
 */

const GOUD_K = '#C99A2E';
const BLAUW = '#3E6FA8';
const KONING = { koning: true, kleding: LEONIDAS } as const;

const CamF = ({ c, kijk, duur = 160 }: { c: number[]; kijk: V3; duur?: number }) => {
  const f = useCurrentFrame();
  return <Camera pos={camPos(f, c, duur)} kijk={kijk} />;
};

const ZeeDecor = ({ t }: { t: number }) => (
  <>
    <mesh>
      <sphereGeometry args={[200, 16, 12]} />
      <meshBasicMaterial color="#9EC1DB" side={1} />
    </mesh>
    <hemisphereLight args={['#BFD8EE', '#2A4A5E', 1]} />
    <directionalLight position={[-6, 12, 10]} intensity={2} color="#FFE4BE" castShadow />
    <Zee t={t} />
  </>
);

/* ================= III · King by accident ================= */

/** Cleomenes op de troon: tevreden, gek geworden, de lege troon met kettingen, Gorgo ernaast. */
export const S_Troon = ({ fase }: { fase: 'koning' | 'gek' | 'leeg' | 'gorgo' }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (fase === 'leeg' || fase === 'gorgo')
    return (
      <Hal donker={fase === 'leeg'} cam={[1.6, 2.0, 5.6, 1.1, 1.9, 4.6]} kijk={[0, 1.2, 0]}>
        {fase === 'leeg' && <pointLight position={[0.8, 2.4, 2.2]} intensity={6} distance={7} color="#FFB070" />}
        <Troon parasol={false} kleur="#A8865A" />
        {fase === 'leeg' && <Ketting van={-1.4} tot={1.4} y={0.06} z={0.9} />}
        {fase === 'gorgo' && (
          <>
            <FiguurL kleding={GORGO_JONG} haar="lang" scale={0.62} position={[1.0, Math.abs(Math.sin(f / 4)) * 0.03, 0.4]} rotation={[0, -0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
            <Wolk p={[1.45, 1.75, 0.5]} tekst="..." b={0.5} h={0.24} vanaf={30} staart={-1} />
          </>
        )}
      </Hal>
    );
  const gek = fase === 'gek';
  return (
    <Hal cam={[1.6, 2.2, 5.8, 1.1, 2.0, 4.8]} kijk={[0, 1.6, 0]} over={gek ? undefined : <LangTeller label="Cleomenes" waarde="King" pil="your half-brother" />}>
      <group rotation={[0, 0, gek ? 0.1 : 0]}>
        <Troon parasol={false} kleur="#A8865A" />
        <Zit
          kleding={CLEOMENES}
          baard
          haar="grijs"
          pose={gek ? { wenk: -0.8, mond: 'open', armL: omhoog(), armR: { schouder: [-2.4, 0, -0.6], elleboog: [0, -1] } } : { mond: 'lach', armL: { schouder: [0, 0, 0.5], elleboog: [0, 0] }, armR: { schouder: [0, 0, -0.5], elleboog: [0, 0] } }}
        />
        <group position={[0, 2.03, 0]}><Kroon /></group>
      </group>
      {gek && (
        <>
          {[0, 1, 2, 3].map((i) => <Blok key={i} p={[-0.25 + i * 0.16, 2.5 + (i % 2) * 0.1, -0.05]} s={[0.07, 0.3, 0.07]} r={[0, 0, (i - 1.5) * 0.4]} c="#7A6A5A" />)}
          {[0, 1, 2].map((i) => {
            const a = t * 3 + (i * Math.PI * 2) / 3;
            return <Blok key={`s${i}`} p={[Math.cos(a) * 0.55, 2.8, Math.sin(a) * 0.55]} s={[0.1, 0.1, 0.1]} r={[a, a, 0]} c="#FFE27A" emissive="#C99A2E" />;
          })}
          <Zweet p={[0.4, 1.95, 0.3]} n={2} />
        </>
      )}
    </Hal>
  );
};

/** Dorieus vaart boos weg (stoomwolkjes boven zijn hoofd). */
export const S_Dorieus = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.2, 0.6]} scherpte={3} mist={['#DDD0B8', 20, 120]} over={<LangTeller label="Dorieus" waarde="Leaves forever" pil="dies in Sicily" />}>
      <ZeeDecor t={t} />
      <group position={[0, 0, -ease(f, 0, 160, 0, 2)]}>
        <Galei deining={t * 0.9} mast />
        <FiguurL kleding={DORIEUS} baard position={[0, 0.73, 1.2]} rotation={[0, 0.4, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 1, mond: 'dicht' }} />
        <BoosTeken p={[0.45, 3.2, 1.3]} s={0.6} />
      </group>
      <CamF c={[5.6, 3.6, 7.6, 4.8, 3.2, 6.4]} kijk={[0, 2.2, 0.4]} />
    </Shot>
  );
};

/** De kroon zakt op het hoofd van Leonidas (490 v.Chr.), of: de koning van ~50 met grijs in zijn baard. */
export const S_Kroon = ({ fase }: { fase: 'zakt' | 'vijftig' }) => {
  const f = useCurrentFrame();
  const y = fase === 'zakt' ? ease(f, 6, 70, 3.4, 2.38) : 2.38;
  return (
    <Hal cam={[0.6, 2.25, 4.6, 0.4, 2.2, 3.8]} kijk={[0, 2.1, 0]} over={fase === 'zakt' ? <JaarLabel jaar="490 BC" sub="king of Sparta" /> : <LangTeller label="Age" waarde="~50" pil="training as king: 0 days" />}>
      <FiguurL kleding={LEONIDAS} haar="lang" baard pose={{ hoofd: fase === 'zakt' ? [-0.25, 0, 0] : [0, 0.2, 0], wenk: fase === 'zakt' ? -0.4 : 0.3, mond: fase === 'zakt' ? 'open' : 'dicht', ...(fase === 'vijftig' ? ARMEN_GEKRUIST : {}) }} />
      <group position={[0, y, 0.01]}><Kroon /></group>
      {fase === 'vijftig' && [-0.18, 0.18].map((x) => <Blok key={x} p={[x, 1.84, 0.315]} s={[0.07, 0.12, 0.02]} c="#C9C4BA" />)}
    </Hal>
  );
};

/** Gorgo: de bruiloft, in de raad, als meisje tegen de omkoping, en haar antwoord. */
export const S_Gorgo = ({ fase }: { fase: 'bruiloft' | 'raad' | 'omkoping' | 'vrouwen' | 'antwoord' }) => {
  const f = useCurrentFrame();
  if (fase === 'bruiloft')
    return (
      <Sparta cam={[2.4, 2.2, 7.0, 1.6, 2.0, 5.8]} kijk={[0, 1.8, 0]} over={<LangTeller label="You marry" waarde="Gorgo" pil="your own niece" />}>
        <FiguurL kleding={LEONIDAS_KAMP} haar="lang" baard position={[0.55, 0, 0]} rotation={[0, -0.5, 0]} pose={{ mond: 'lach', armL: wijs(0.9) }} />
        <FiguurL kleding={GORGO} haar="lang" position={[-0.55, 0, 0]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(0.9), wenk: 0.2 }} />
        {[0, 1].map((i) => {
          const op = f > 40 ? Math.max(0, Math.sin((f - 40 - i * 10) / 8)) * 0.5 : 0;
          return <FiguurL key={i} kleding={EFOR} haar="grijs" baard position={[-2.4 - i * 0.9, 0, -1.4]} rotation={[0, 0.6, 0]} pose={{ armL: { schouder: [-0.2, 0, 0.6 + op], elleboog: [0, -1.2] }, armR: { schouder: [-0.2, 0, -0.6 - op], elleboog: [0, 1.2] }, hoofd: [0, i ? 0.6 : -0.6, 0] }} />;
        })}
      </Sparta>
    );
  if (fase === 'raad')
    return (
      <Hal cam={[2.8, 2.4, 6.8, 2.0, 2.2, 5.6]} kijk={[0.4, 1.7, 0]}>
        <FiguurL kleding={GORGO} haar="lang" position={[-1.0, 0, 0.4]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.4), wenk: 0.8, mond: Math.floor(f / 5) % 2 ? 'open' : 'dicht' }} />
        {[0, 1, 2].map((i) => (
          <FiguurL key={i} kleding={EFOR} haar="grijs" baard position={[0.8 + i * 0.8 + ease(f, 10, 50, 0, 0.5), 0, -0.4 + (i % 2) * 0.5]} rotation={[0, -1.1, 0]} pose={{ wenk: -0.6, mond: 'open' }} />
        ))}
        <Zweet p={[1.95, 2.3, 0.4]} n={1} />
      </Hal>
    );
  if (fase === 'omkoping')
    return (
      <Hal sepia cam={[2.2, 2.2, 6.2, 1.6, 2.0, 5.2]} kijk={[0, 1.4, 0]} over={<LangTeller label="Gorgo, age 8" waarde="No bribes" />}>
        <FiguurL kleding={CLEOMENES} baard haar="grijs" position={[-0.6, 0, 0]} rotation={[0, 0.7, 0]} pose={{ hoofd: [0.2, -0.4, 0] }} />
        <FiguurL kleding={GORGO_JONG} haar="lang" scale={0.55} position={[-0.1, 0, 0.6]} rotation={[0, -0.6, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.3], elleboog: [0, 0] }, armL: wijs(1.2), wenk: 0.8, mond: 'open' }} />
        <FiguurL kleding={VREEMDELING} baard position={[1.2, 0, -0.2]} rotation={[0, -1.1, 0]} pose={{ armR: wijs(1.1), mond: 'lach' }} inHand={<Blok p={[0, -0.1, 0]} s={[0.24, 0.26, 0.24]} c="#A8865A" />} />
        {[0, 1, 2].map((i) => <Blok key={i} p={[0.6 - i * 0.3 - ease(f, 30, 90, 0, 0.6), 0.07, 0.4 + i * 0.15]} s={[0.12, 0.12, 0.03]} r={[0, 0, f * 0.2]} c={GOUD_K} metal={0.8} rough={0.3} />)}
      </Hal>
    );
  return (
    <Sparta cam={[0.8, 2.2, 5.6, 0.6, 2.1, 4.6]} kijk={[0, 1.9, 0]} over={fase === 'antwoord' ? <Citaat tekst="Because we're the only ones who give birth to men." wie="Gorgo" /> : undefined}>
      <FiguurL kleding={VREEMDE} haar="lang" position={[0.8, 0, 0]} rotation={[0, -0.6, 0]} pose={{ armR: { schouder: [-0.7, 0, -0.35], elleboog: [0, -0.6] }, mond: fase === 'antwoord' ? 'open' : 'lach', wenk: fase === 'antwoord' ? -0.6 : 0 }} inHand={<Blok p={[0, -0.1, 0.1]} s={[0.4, 0.3, 0.02]} r={[0, 0, fase === 'antwoord' ? 0 : Math.sin(f / 2) * 0.4]} c="#E9C9D8" />} />
      <FiguurL kleding={GORGO} haar="lang" position={[-0.7, 0, 0.1]} rotation={[0, 0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: fase === 'antwoord' ? 0.8 : 0.4 }} />
      {fase === 'antwoord' && <FiguurL kleding={LEONIDAS_KAMP} haar="lang" baard position={[-1.9, 0, -2.2]} rotation={[0, 0.5, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach', hoofd: [Math.max(0, Math.sin(f / 6)) * 0.25, 0, 0] }} />}
    </Sparta>
  );
};

/* ================= IV · Earth and water ================= */

export const S_PerzieKaart = () => (
  <KaartG van={G_LEEG} naar={G_PERZIE} wissel={[10, 80]} cam={[G_VER, { lon: 36, lat: 35, h: 26, a: 14 }]} over={<LangTeller label="The Persian Empire" waarde="Largest on Earth" pil="c. 500 BC" />} />
);

/** Darius op zijn troon, boodschappers met potjes; of zijn lege troon met zwarte banieren. */
export const S_Darius = ({ dood = false }: { dood?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <PerzTent cam={[2.4, 2.6, 7.2, 1.6, 2.4, 6.0]} kijk={[0, 1.8, -0.6]} over={dood ? <JaarLabel jaar="486 BC" sub="Darius dies" /> : <LangTeller label="King Darius" waarde="Wants Greece" />}>
      <Troon position={[0, 0, -1.2]} />
      {!dood && <Zit kleding={DARIUS} haar="grijs" baard hoofddeksel="kidaris" position={[0, 0, -1.2]} pose={{ armR: wijs(1.0), wenk: 0.5 }} />}
      {dood && [-2.2, 2.2].map((x) => <Blok key={x} p={[x, 2.6, -2.0]} s={[1.0, 3.6, 0.06]} c="#141010" />)}
      {!dood &&
        [-1, 1].map((k, i) => (
          <group key={k} position={[k * (1.3 + ease(f, 10, 120, 0, 0.3)), 0, 0.6]}>
            <FiguurL kleding={BODE} rotation={[0, k * 1.6, 0]} pose={{ armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.4] } }} />
            <Potje position={[0, 1.0, k * 0.3]} water={i === 1} />
          </group>
        ))}
    </PerzTent>
  );
};

/** Twee potjes: aarde en water = overgave. */
export const S_Potjes = () => (
  <Huis cam={[0.2, 1.45, 2.4, 0.1, 1.4, 1.9]} kijk={[0, 1.0, 0]} over={<LangTeller label="Earth and water" waarde="= surrender" />}>
    <Blok p={[0, 0.4, 0]} s={[1.6, 0.8, 0.8]} c="#6B4A2E" />
    <Potje position={[-0.3, 0.8, 0.05]} scale={1.3} />
    <Potje position={[0.3, 0.8, 0.05]} scale={1.3} water />
    <TekstVlak regels={['EARTH']} b={0.36} h={0.11} achter="#F4E6C0" voor="#3A2418" position={[-0.3, 1.36, 0.08]} fontPx={120} />
    <TekstVlak regels={['WATER']} b={0.36} h={0.11} achter="#F4E6C0" voor="#3A2418" position={[0.3, 1.36, 0.08]} fontPx={120} />
  </Huis>
);

/** De put: Athene (kuil, van ver), Sparta (boodschapper erin, potje op de rand), "dig it out yourselves". */
export const S_Put = ({ fase }: { fase: 'athene' | 'sparta' | 'graaf' }) => {
  const f = useCurrentFrame();
  if (fase === 'athene')
    return (
      <Sparta cam={[5, 3.2, 11, 4, 3, 9]} kijk={[0, 1.2, -1]} over={<JaarLabel jaar="Athens" sub="into a pit" />} bomen={false}>
        <Blok p={[0, 0.01, -1]} s={[2.2, 0.02, 1.6]} c="#2A1E14" />
        {[0, 1].map((i) => <FiguurL key={i} kleding={VREEMDELING} baard position={[-1.8 - i * 0.9, 0, -1.6]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.1), mond: 'lach' }} />)}
        <Potje position={[0.2, Math.max(0.02, ease(f, 10, 30, 0.3, 2.4) - Math.max(0, f - 30) ** 2 * 0.002), -1]} />
      </Sparta>
    );
  if (fase === 'sparta') {
    const val = ease(f, 14, 40, 0, 1);
    return (
      <Sparta cam={[2.4, 2.4, 6.4, 1.8, 2.2, 5.4]} kijk={[0, 1.0, 0]} over={<JaarLabel jaar="Sparta" sub="down a well" />}>
        <Put />
        {val < 0.95 && (
          <group position={[0, 2.3 - val * 3.2, 0]} rotation={[Math.PI, 0, 0]}>
            <FiguurL kleding={BODE} scale={0.9} position={[0, 0, 0]} pose={{ armL: omhoog(), armR: omhoog() }} />
          </group>
        )}
        <Potje position={[0.55, 0.8, 0.45]} />
        {f > 40 && f < 70 && [0, 1, 2, 3].map((i) => <Blok key={i} p={[Math.sin(i * 1.6) * 0.4, 0.9 + (f - 40) * 0.03, Math.cos(i * 1.6) * 0.4]} s={[0.1, 0.1, 0.1]} c="#BFE6FF" />)}
        <Spartaan kleding={SPARTAAN} helm={false} speer={false} schild={false} position={[-1.4, 0, 0.1]} rotation={[0, 1.0, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
      </Sparta>
    );
  }
  return (
    <Sparta cam={[1.8, 2.4, 5.6, 1.4, 2.2, 4.6]} kijk={[0, 1.4, 0]}>
      <Put />
      <Spartaan kleding={SPARTAAN} helm={false} speer={false} schild={false} position={[-1.3, 0, 0.1]} rotation={[0, 0.9, 0]} pose={{ armR: { schouder: [-0.9, 0, -0.2], elleboog: [0, 0] }, mond: 'lach', wenk: 0.4 }} />
      <Wolk p={[-0.4, 2.55, 0.4]} tekst={['DIG IT OUT', 'YOURSELVES']} b={1.3} h={0.52} vanaf={8} staart={-1} />
      <Wolk p={[0.6, 1.25, 0.3]} tekst="help..." b={0.5} h={0.2} vanaf={50} staart={-1} />
    </Sparta>
  );
};

/** Xerxes onder de parasol: schrijft SPARTA op en onderstreept het drie keer. */
export const S_XerxesBoek = () => {
  const f = useCurrentFrame();
  const streep = Math.min(3, Math.floor(lin(f, 40, 100, 0, 3.99)));
  return (
    <PerzTent cam={[1.0, 2.3, 4.6, 0.7, 2.2, 3.8]} kijk={[0, 1.6, -0.4]} over={<LangTeller label="His son Xerxes" waarde="Never forgets" />}>
      <Troon position={[0, 0, -0.8]} />
      <Zit kleding={XERXES} baard hoofddeksel="kidaris" position={[0, 0, -0.8]} pose={{ wenk: 1, hoofd: [0.35, 0, 0], armR: { schouder: [-1.0, 0, -0.1], elleboog: [0, -0.5] }, armL: { schouder: [-1.0, 0, 0.1], elleboog: [0, 0.5] } }} />
      <group position={[0, 1.02, -0.1]} rotation={[-1.0, 0, 0]}>
        <TekstVlak regels={['SPARTA']} b={0.7} h={0.42} achter="#EFE3C4" voor="#7A1A12" fontPx={130} />
        {Array.from({ length: streep }, (_, i) => <Blok key={i} p={[0, -0.12 - i * 0.04, 0.03]} s={[0.5, 0.015, 0.01]} c="#7A1A12" />)}
      </group>
    </PerzTent>
  );
};

/** Vier jaar voorbereiding: smidsen, stapels pijlen, de teller. */
export const S_Smeden = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Sparta tijd="avond" bomen={false} cam={[5, 3.4, 12, 4, 3, 10]} kijk={[0, 1.2, -1]} over={<TelTeller label="Preparing" van={1} tot={4} a={10} b={110} na=" years" />}>
      {[-3, 0, 3].map((x, i) => (
        <group key={x} position={[x, 0, -2]}>
          <Vuur position={[0, 0, -0.6]} t={t + i} grootte={0.5} />
          <Blok p={[0.6, 0.4, 0]} s={[0.5, 0.8, 0.4]} c="#3A3A3A" metal={0.4} />
          <PersSoldaat position={[1.2, 0, 0.3]} rotation={[0, -1.2 + Math.sin(t * 6 + i) * 0.1, 0]} schild={false} kleur="#7A5A3A" />
        </group>
      ))}
      {Array.from({ length: 9 }, (_, i) => <Blok key={i} p={[-5 + i * 1.2, 0.3, 1.6]} s={[1.0, 0.6, 0.5]} c="#6B5236" />)}
      {Array.from({ length: 30 }, (_, i) => <Blok key={`p${i}`} p={[-5.3 + i * 0.36, 0.95, 1.6]} s={[0.03, 0.8, 0.03]} r={[0.2, 0, ((i % 3) - 1) * 0.2]} c="#3A2A1C" />)}
    </Sparta>
  );
};

/** De Hellespont: bouwen, de storm en de zweep, het leger dat zeven dagen oversteekt. */
export const S_Hellespont = ({ fase }: { fase: 'bouw' | 'zweep' | 'mars' }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (fase === 'bouw') return <Hellespont brug={lin(f, 0, 120, 0.3, 1)} over={<LangTeller label="Two bridges of boats" waarde="1+ km" pil="across the Hellespont" />} />;
  if (fase === 'zweep') {
    const slag = Math.max(1, Math.floor(lin(f, 10, 140, 1, 300)));
    return (
      <Hellespont storm brug={0.25} cam={[3, 2.6, 7.4, 2.4, 2.4, 6.4]} kijk={[0, 1.2, 1]} over={<LangTeller label="The sea is whipped" waarde={`${slag}`} pil="lashes" />}>
        {[-0.8, 0.9].map((x, i) => {
          const z = Math.sin(t * 8 + i * 2);
          return (
            <group key={x}>
              <Blok p={[x, 0.2, 1.4]} s={[1.4, 0.4, 1.2]} c="#7A5A3A" />
              <FiguurL kleding={BODE} position={[x, 0.4, 1.4]} rotation={[0, i ? -0.3 : 0.3, 0]} pose={{ armR: { schouder: [-2.4 + z * 0.9, 0, -0.2], elleboog: [0, -0.2] }, wenk: 0.6, mond: 'open', ogen: z > 0.5 ? 'dicht' : 'open' }} inHand={<Blok p={[0, -0.6, 0]} s={[0.03, 1.2, 0.03]} c="#3A2A1C" />} />
              {z > 0.6 && [0, 1, 2].map((k) => <Blok key={k} p={[x + (k - 1) * 0.15, 2.1 + k * 0.05, 1.75]} s={[0.07, 0.07, 0.07]} c="#BFE6FF" />)}
            </group>
          );
        })}
      </Hellespont>
    );
  }
  const dag = Math.min(7, Math.floor(lin(f, 0, 150, 1, 7.99)));
  const nacht = Math.floor(f / 22) % 2 === 1;
  return (
    <Hellespont nacht={nacht} cam={[6, 3.2, 9, 4.6, 2.8, 7.4]} kijk={[0, 1.0, 0]} over={<LangTeller label="Crossing" waarde={`Day ${dag}`} pil="7 days and 7 nights" />}>
      {Array.from({ length: 16 }, (_, i) => {
        const x = ((i * 1.4 + t * 1.2) % 22) - 11;
        return <PersSoldaat key={i} position={[x, 0.42, (i % 2) * 0.6 - 0.3]} rotation={[0, Math.PI / 2, 0]} t={t} loopt kleur={['#3E5F9A', '#7A3B6E', '#A8772E'][i % 3]} />;
      })}
      {nacht && <Fakkel position={[0, 0.42, 0.9]} t={t} />}
    </Hellespont>
  );
};

/* ================= V · The oracle ================= */

export const S_Getal = ({ streep = false }: { streep?: boolean }) => (
  <KaartG
    van={G_480}
    cam={[{ lon: 30, lat: 38, h: 20, a: 12 }, { lon: 28, lat: 38.5, h: 17, a: 10 }]}
    over={streep ? <><LangTeller label="Historians today" waarde="100–200 thousand" /><GrootGetal tot={2641610} streep onder="~150,000?" /></> : <><LangTeller label="Herodotus" waarde="The Persian army" /><GrootGetal tot={2641610} /></>}
  />
);

/** Breed: het Perzische leger tot aan de horizon. */
export const S_Leger = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Sparta tijd="avond" bomen={false} dorp={false} cam={[0, 6, 18, 0, 5, 14]} kijk={[0, 1, -8]} over={<LangTeller label="Still" waarde="Gigantic" pil="one of the biggest armies ever" />}>
      <PersLeger rijen={6} kolommen={22} position={[0, 0, -2]} t={t} />
      <PersLeger rijen={6} kolommen={30} position={[0, 0, -12]} t={t} />
      <Leger rijen={4} kolommen={40} position={[0, 0, -26]} kleur="#4E3A7A" schild="#C9A66B" t={t} />
    </Sparta>
  );
};

/** Delphi: de gezant gaat naar boven; de Pythia op haar driepoot met de damp erachter. */
export const S_Delphi = ({ fase }: { fase: 'tempel' | 'orakel' }) => {
  const f = useCurrentFrame();
  if (fase === 'tempel')
    return (
      <Delphi over={<JaarLabel jaar="480 BC" sub="the oracle at Delphi" />}>
        <Spartaan kleding={SPARTAAN} helm={false} speer={false} schild={false} position={[1.6, 0, 3.4 - ease(f, 0, 160, 0, 2.2)]} rotation={[0, Math.PI - 0.2, 0]} />
      </Delphi>
    );
  return (
    <Delphi binnen cam={[1.6, 2.2, 5.0, 1.1, 2.0, 4.0]} kijk={[0, 1.8, 0]} over={<Citaat tekst="Either Sparta falls, or Sparta mourns a dead king." wie="the oracle" />}>
      {[-1, 1].map((k) => <Blok key={k} p={[k * 0.3, 0.45, 0]} s={[0.06, 0.9, 0.06]} r={[0, 0, k * 0.2]} c={GOUD_K} metal={0.7} rough={0.3} />)}
      <Blok p={[0, 0.45, -0.3]} s={[0.06, 0.9, 0.06]} r={[0.2, 0, 0]} c={GOUD_K} metal={0.7} rough={0.3} />
      <Blok p={[0, 0.92, -0.05]} s={[0.8, 0.1, 0.7]} c={GOUD_K} metal={0.7} rough={0.3} />
      <Zit kleding={PYTHIA} haar="lang" hoofddeksel="krans" position={[0, 0.42, -0.05]} pose={{ ogen: 'dicht', armL: omhoog(), armR: omhoog() }} />
      <pointLight position={[0, 1.2, -0.8]} intensity={5} distance={4} color="#C8E0FF" />
      <Spartaan kleding={SPARTAAN} helm={false} speer={false} schild={false} position={[1.25, 0, 0.8]} rotation={[0, -1.3, 0]} pose={{ wenk: -0.6, mond: 'dicht' }} />
      {f > 30 && <Zweet p={[1.2, 2.3, 1.0]} n={1} />}
    </Delphi>
  );
};

/** Close-up van Leonidas: hij kijkt recht in de camera. */
export const S_Close = ({ dageraad = false, citaat = false }: { dageraad?: boolean; citaat?: boolean }) => (
  <Pas tijd={dageraad ? 'dageraad' : 'avond'} cam={[0.15, 2.05, 3.4, 0.1, 2.05, 2.8]} kijk={[0, 2.05, 0]} muur={false} scherpte={3.4} over={citaat ? <Citaat tekst="…or Sparta mourns a dead king." wie="the oracle" /> : undefined}>
    <Spartaan {...KONING} speer={false} schild={false} pose={{ wenk: 0.75, mond: 'dicht' }} />
    <pointLight position={[0.8, 2.6, 1.6]} intensity={3} distance={4} color="#FFE0A8" />
  </Pas>
);

/** Het feest: Spartanen dansen, de eforen met een bord "NO MARCHING", één soldaat staat al klaar. */
export const S_Feest = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Sparta cam={[3.6, 2.6, 9.4, 2.8, 2.4, 8.2]} kijk={[0.8, 1.7, -0.5]} over={<LangTeller label="The Carneia" waarde="Sacred festival" pil="the army may not march" />}>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = t * 1.2 + (i * Math.PI * 2) / 5;
        return <FiguurL key={i} kleding={i % 2 ? SPARTAAN_BLOOT : SPARTAAN2} haar="lang" baard position={[Math.cos(a) * 1.5 - 0.8, Math.abs(Math.sin(t * 5 + i)) * 0.15, Math.sin(a) * 1.0 - 1.4]} rotation={[0, -a, 0]} pose={{ armL: omhoog(), armR: omhoog(), mond: 'lach' }} />;
      })}
      <FiguurL kleding={EFOR} haar="grijs" baard position={[1.8, 0, -0.2]} rotation={[0, -0.5, 0]} pose={{ armR: { schouder: [-2.9, 0, -0.1], elleboog: [0, 0] } }} />
      <TekstVlak regels={['NO', 'MARCHING']} b={1.0} h={0.7} achter="#F4E6C0" voor="#7A1A12" position={[2.0, 3.25, 0.05]} rotation={[0, -0.3, 0]} fontPx={78} />
      <Spartaan kleding={SPARTAAN} position={[3.0, 0, -1.4]} rotation={[0, -0.6, 0]} pose={{ wenk: -0.6 }} />
      <Wolk p={[3.2, 3.2, -1.0]} tekst="sigh" b={0.6} h={0.24} vanaf={40} staart={-1} />
    </Sparta>
  );
};

/** De driehonderd marcheren de stad uit. */
export const S_Mars = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Sparta cam={[7, 2.4, 7, 5.6, 2.2, 6]} kijk={[0, 1.6, 0]} over={<LangTeller label="Your guard" waarde="300 men" />}>
      <group position={[0, 0, ease(f, 0, 180, -2, 1.5)]}>
        <Falanx rijen={5} kolommen={6} position={[0, 0, -1]} t={t * 1.4} />
        <Spartaan {...KONING} position={[0, 0, 0.6]} pose={{ wenk: 0.5 }} />
      </group>
    </Sparta>
  );
};

/** Vaders met hun zoontjes: alleen mannen die al een zoon hebben. */
export const S_Zonen = () => {
  const f = useCurrentFrame();
  return (
    <Sparta tijd="dageraad" cam={[2.0, 2.0, 6.0, 1.4, 1.8, 5.0]} kijk={[0, 1.3, 0]} over={<LangTeller label="Only men" waarde="Who have sons" />}>
      {[-1.6, 0, 1.6].map((x, i) => (
        <group key={x}>
          <Spartaan kleding={i % 2 ? SPARTAAN2 : SPARTAAN} position={[x, 0, -0.2]} rotation={[0, 0.2, 0]} pose={{ hoofd: [0.4, 0, 0] }} />
          <FiguurL kleding={LEONIDAS_JONG} haar="lang" scale={0.5} position={[x + 0.45, 0, 0.55]} rotation={[0, 2.8, 0]} pose={i === 1 ? { armR: { schouder: [-1.4, 0, -0.1], elleboog: [0, 0] }, mond: 'lach' } : { armR: omhoog(), mond: 'lach' }} inHand={i === 1 && f < 80 ? <Blok p={[0, -0.2, 0]} s={[0.05, 0.5, 0.03]} c="#A8865A" /> : undefined} />
        </group>
      ))}
    </Sparta>
  );
};

/** Op de kaart: van Sparta naar Thermopylae, de teller loopt van 300 naar 7.000. */
export const S_RouteKaart = () => (
  <KaartG
    van={G_SPARTA}
    cam={[{ ...G_GRIEKENLAND, lat: 37.6, h: 6.5, a: 5 }, { ...G_GRIEKENLAND, lat: 38.4, h: 5.4, a: 4.2 }]}
    route={[pl('sparta'), [22.25, 37.6], [22.9, 38.0], pl('thespiae'), [22.8, 38.6], pl('thermopylae')]}
    routeTijd={[6, 130]}
    kop={<MiniSpartaan />}
    spelden={[['sparta', '#B3312B'], ['thermopylae', GOUD_K]]}
    over={<TelTeller label="Your army" van={300} tot={7000} a={10} b={130} pil="Greeks join on the way" />}
  />
);

/** "That's the part the movies leave out": film-Spartaan tegen de echte, veelkleurige Griekse linie. */
export const S_Film = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Pas tijd="dag" cam={[0, 2.1, 7.6, 0, 2.0, 6.8]} kijk={[0, 1.6, 0]} muur={false} damp={false} over={<><FilmLabels /><Stempel tekst="REALITY" vanaf={40} top={700} /></>}>
      <Spartaan kleding={SPARTAAN_BLOOT} helm={false} schild="zij" position={[-2.2, 0, 0]} rotation={[0, 0.3, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach', wenk: 0.6 }} speer={false} />
      {[0, 1, 2].map((i) => {
        const a = t * 2 + i * 2.1;
        return <Blok key={i} p={[-2.2 + Math.cos(a) * 0.7, 1.4 + Math.sin(a * 1.3) * 0.4, 0.5]} s={[0.1, 0.1, 0.1]} r={[a, a, 0]} c="#FFE27A" emissive="#C99A2E" />;
      })}
      <Falanx rijen={3} kolommen={5} position={[2.4, 0, -0.6]} afstand={0.85} t={t} kleuren={['#A8322B', '#3E6FA8', '#5E8A5A', '#C9A646']} />
    </Pas>
  );
};

/* ================= VI · The hot gates ================= */

export type PasFase = 'boven' | 'weg' | 'wagen' | 'muur' | 'kammen' | 'haar' | 'wachten' | 'hoop' | 'pad' | 'leeg' | 'wegtrekken' | 'blijven';
export const S_Pas = ({ fase }: { fase: PasFase }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (fase === 'boven')
    return (
      <Pas cam={[16, 22, 30, 12, 18, 24]} kijk={[0, 0, -10]} scherpte={1.6} over={<JaarLabel jaar="Thermopylae" sub="the hot gates" />}>
        <Damp position={[-4.6, 0, -6]} />
      </Pas>
    );
  if (fase === 'weg')
    return (
      <Pas cam={[2.2, 1.6, 12, 1.6, 1.6, 9]} kijk={[-1, 1.6, -6]} muur={false} over={<LangTeller label="On one side" waarde="Mountains" pil="on the other: the sea" />}>
        <Geit position={[-5.0, 1.5, 2.6]} rotation={[0, 0.9, 0]} />
      </Pas>
    );
  if (fase === 'wagen') {
    const z = ease(f, 0, 160, -3, 1);
    return (
      <Pas cam={[0.6, 2.6, 8, 0.4, 2.4, 6.8]} kijk={[0, 1.0, 0]} muur={false} over={<LangTeller label="At the narrowest point" waarde="One wagon wide" />}>
        <Rots position={[-1.95, 1.4, 0]} schaal={[1.2, 2.4, 3]} kleur="#8A7A62" />
        <group position={[0.4, 0, z]}>
          <Blok p={[0, 0.7, 0]} s={[1.4, 0.4, 2.2]} c="#7A5A3A" />
          {[-0.75, 0.75].map((x) =>
            [-0.7, 0.7].map((zz) => (
              <mesh key={`${x}${zz}`} position={[x, 0.42, zz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.42, 0.42, 0.1, 12]} />
                <meshStandardMaterial color="#5A3B24" />
              </mesh>
            )),
          )}
          <FiguurL kleding={EPHIALTES} position={[0, 0.9, -0.3]} scale={0.8} pose={{ wenk: -0.7, mond: 'dicht' }} />
          <Zweet p={[0.35, 2.75, -0.1]} n={2} />
        </group>
      </Pas>
    );
  }
  if (fase === 'muur')
    return (
      <Pas muurAf={lin(f, 0, 110, 0.6, 1)} cam={[3.6, 2.4, 7.0, 2.6, 2.2, 5.8]} kijk={[0, 1.2, 0]}>
        <Spartaan {...KONING} speer={false} schild={false} position={[0.6, 0, -0.5]} rotation={[0, 0.5, 0]} pose={{ armL: omhoog(), armR: omhoog(), wenk: 0.3 }} extra={f < 100 ? <Blok p={[0, 3.1, 0]} s={[0.7, 0.5, 0.6]} c="#A89A84" /> : undefined} />
        <Spartaan kleding={SPARTAAN2} helm={false} speer={false} schild={false} position={[-1.6, 0, -0.8]} rotation={[0, 0.8, 0]} pose={{ armR: wijs(0.8), mond: 'lach' }} />
        <Falanx rijen={1} kolommen={6} position={[0, 0, -3.5]} t={t} />
      </Pas>
    );
  if (fase === 'kammen' || fase === 'haar')
    return (
      <Pas muur={false} cam={fase === 'haar' ? [0.8, 2.1, 4.0, 0.6, 2.0, 3.4] : [3.4, 2.6, 7.4, 2.6, 2.4, 6.2]} kijk={fase === 'haar' ? [0, 2.0, -0.6] : [0, 1.2, -0.8]} over={fase === 'haar' ? <Citaat tekst="When Spartans are about to risk their lives, they do their hair." wie="Demaratus" /> : <LangTeller label="The scout sees" waarde="Combing their hair" />}>
        <FiguurL kleding={SPARTAAN_BLOOT} haar="lang" baard position={[0, 0, -0.6]} rotation={[0, 0.3, 0]} pose={{ armR: { schouder: [-2.6, 0, -0.5 + Math.sin(t * 4) * 0.15], elleboog: [0, -1.4] }, mond: 'lach', ogen: 'dicht' }} inHand={<Blok p={[0, -0.05, 0]} s={[0.25, 0.04, 0.06]} c="#D8C9A8" />} />
        {fase === 'kammen' && (
          <>
            <group position={[-2.0, 0.35 + Math.abs(Math.sin(t * 3)) * 0.15, -1.0]} rotation={[-Math.PI / 2 + 0.12, 0, 0]}>
              <FiguurL kleding={SPARTAAN_BLOOT} haar="lang" baard pose={{ armL: { schouder: [-3.0, 0, 0], elleboog: [0, 0] }, armR: { schouder: [-3.0, 0, 0], elleboog: [0, 0] } }} />
            </group>
            <Spartaan kleding={SPARTAAN2} helm={false} speer={false} schild={false} position={[1.8, 0, -1.4]} rotation={[0, -0.4, 0]} pose={{ mond: 'lach', wenk: 0.3 }} extra={<group position={[0.2, 1.5, 0.7]} rotation={[0, Math.PI - 0.3, 0]}><Hoplon letter={false} /></group>} />
          </>
        )}
      </Pas>
    );
  if (fase === 'wachten') {
    const dag = Math.min(4, Math.floor(lin(f, 0, 140, 1, 4.99)));
    return (
      <Pas muur={false} cam={[2.6, 2.0, 5.6, 2.0, 1.8, 4.6]} kijk={[0, 0.9, -0.8]} over={<LangTeller label="Xerxes waits" waarde={`Day ${dag}`} />}>
        <Blok p={[0, 0.25, -0.8]} s={[1.2, 0.5, 0.8]} c="#A89A84" />
        {[-0.2, 0.15].map((x, i) => <Blok key={x} p={[x, 0.56 + (f % 40 < 10 && i === 0 ? 0.2 : 0), -0.7]} s={[0.12, 0.12, 0.12]} r={[f * 0.2 * (i ? 1 : -1), f * 0.1, 0]} c="#F2E6C8" />)}
        {[-1, 1].map((k) => <Zit key={k} kleding={k < 0 ? SPARTAAN : SPARTAAN2} baard haar="lang" position={[k * 1.1, 0, -0.8]} rotation={[0, -k * 1.3, 0]} pose={{ mond: k < 0 ? 'lach' : 'dicht', armR: wijs(0.7) }} />)}
        <Spartaan {...KONING} speer={false} position={[-0.4, 0, -2.6]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
      </Pas>
    );
  }
  if (fase === 'hoop')
    return (
      <Pas tijd="dag" cam={[4.6, 2.2, 7.6, 3.6, 2.0, 6.6]} kijk={[0, 2.0, -1]}>
        <Falanx rijen={3} kolommen={8} position={[0, 0, -1]} t={t} />
        {[0, 1, 2, 3].map((i) => <Blok key={i} p={[-6 + i * 4, 14, -24]} s={[0.6, 28, 0.6]} r={[0.3, 0, 0.3]} c="#FFF2C8" emissive={f > 6 ? '#E8C07A' : '#000000'} />)}
      </Pas>
    );
  if (fase === 'pad') {
    const p = lin(f, 6, 140, 0, 1);
    const route: V3[] = [[1, 0.1, 18], [-4, 2, 12], [-12, 9, 4], [-16, 14, -6], [-13, 10, -16], [-5, 2, -22], [0, 0.1, -26]];
    const blokjes: V3[] = [];
    for (let i = 0; i < route.length - 1; i++) {
      for (let s2 = 0; s2 < 1; s2 += 0.1) {
        if ((i + s2) / (route.length - 1) > p) break;
        const a = route[i];
        const b = route[i + 1];
        blokjes.push([a[0] + (b[0] - a[0]) * s2, a[1] + (b[1] - a[1]) * s2 + 0.5, a[2] + (b[2] - a[2]) * s2]);
      }
    }
    const kop = blokjes.at(-1) ?? route[0];
    return (
      <Pas cam={[20, 28, 30, 16, 24, 24]} kijk={[-4, 2, -4]} scherpte={1.4} over={<LangTeller label="The goat path" waarde="Around the pass" />}>
        {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.6, 0.3, 0.6]} c="#EE7A3E" emissive="#7A3A10" />)}
        <Geit position={kop} scale={2.4} rotation={[0, 3.4, 0]} />
        <Falanx rijen={1} kolommen={5} position={[0, 0, -1]} t={t} />
      </Pas>
    );
  }
  if (fase === 'wegtrekken')
    return (
      <Pas tijd="dageraad" cam={[5, 2.6, 6, 4, 2.4, 5]} kijk={[0, 1.6, -3]} over={<LangTeller label="Most Greeks" waarde="Sent home" />}>
        <group position={[0, 0, -ease(f, 0, 180, 1, 6)]}>
          <Falanx rijen={3} kolommen={6} position={[0, 0, -3]} rotation={[0, Math.PI, 0]} t={t * 1.4} kleuren={['#3E6FA8', '#5E8A5A', '#C9A646', '#7A5A3A']} />
        </group>
        <Spartaan {...KONING} speer={false} position={[1.4, 0, 0.0]} rotation={[0, Math.PI + 0.3, 0]} pose={{ armR: omhoog() }} />
      </Pas>
    );
  if (fase === 'blijven')
    return (
      <Pas tijd="dageraad" cam={[2.4, 2.4, 6.6, 1.8, 2.2, 5.6]} kijk={[0, 1.8, -0.6]} over={<LangTeller label="Who stays" waarde="300 + 700" pil="Spartans + Thespians" />}>
        <Spartaan {...KONING} position={[-0.6, 0, -0.4]} rotation={[0, 0.7, 0]} speer={false} pose={{ armR: wijs(0.9), mond: 'lach' }} />
        <Spartaan kleding={THESPIER} schildKleur={BLAUW} position={[0.6, 0, -0.4]} rotation={[0, -0.7, 0]} speer={false} pose={{ armR: wijs(0.9), mond: 'lach', wenk: 0.5 }} />
        <Falanx rijen={2} kolommen={4} position={[-2.4, 0, -2.6]} t={t} />
        <Falanx rijen={2} kolommen={4} position={[2.4, 0, -2.6]} t={t} schild={BLAUW} cape="#3E6FA8" />
      </Pas>
    );
  // leeg: de lege pas, één schild staat rechtop
  return (
    <Pas tijd="avond" cam={[3, 2.0, 8, 2.4, 1.8, 6.8]} kijk={[0, 0.8, -1]} muurAf={0.6}>
      <group position={[0.4, 0.46, -0.6]} rotation={[-0.15, 0.3, 0]}><Hoplon /></group>
    </Pas>
  );
};

/** De Perzische ruiter op een heuvel. */
export const S_Ruiter = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Pas cam={[-1, 3.2, 26, -1, 3.0, 23]} kijk={[0, 2.0, 16]} muur={false} over={<LangTeller label="A Persian scout" waarde="Watching you" />}>
      <Rots position={[0, 0, 16]} schaal={[3, 1.2, 3]} kleur="#9A8A70" />
      <Paard position={[0, 0.9, 16]} rotation={[0, Math.PI + 0.4, 0]} kleur="#5A3B24" t={t} ruiter={<FiguurL kleding={BODE} pose={{ armR: { schouder: [-2.3, 0, -0.4], elleboog: [0, -1.3] }, hoofd: [0, 0.3, 0] }} />} />
    </Pas>
  );
};

/** Xerxes lacht, Demaratus waarschuwt. */
export const S_XerxesLach = () => {
  const f = useCurrentFrame();
  return (
    <PerzTent cam={[2.6, 2.4, 6.4, 1.8, 2.2, 5.4]} kijk={[0.3, 1.8, -0.4]}>
      <Troon position={[-0.6, 0, -0.8]} />
      <Zit kleding={XERXES} baard hoofddeksel="kidaris" position={[-0.6, Math.abs(Math.sin(f / 3)) * 0.04, -0.8]} pose={{ mond: 'lach', hoofd: [-0.25 + Math.sin(f / 3) * 0.08, 0, 0], ogen: 'dicht' }} />
      <Wolk p={[-0.6, 3.15, -0.3]} tekst="HA HA" b={0.8} h={0.3} vanaf={6} staart={0} />
      <FiguurL kleding={DEMARATUS} baard haar="grijs" position={[1.4, 0, 0.3]} rotation={[0, -1.0, 0]} pose={{ armR: { schouder: [-2.8, 0, -0.1], elleboog: [0, -0.3] }, wenk: -0.5, mond: 'open' }} />
      {f > 40 && <Zweet p={[1.7, 2.3, 0.5]} n={1} />}
    </PerzTent>
  );
};

/** De boodschapper met de rol, en het antwoord in twee woorden. */
export const S_Boodschap = ({ antwoord = false }: { antwoord?: boolean }) => {
  const f = useCurrentFrame();
  const valt = antwoord ? ease(f, 20, 34, 0, 1) : 0;
  return (
    <Pas cam={[2.4, 2.3, 6.6, 1.8, 2.2, 5.8]} kijk={[0.2, 1.9, 0.3]} over={antwoord ? undefined : <LangTeller label="Xerxes' message" waarde="Hand over your weapons" />}>
      <Spartaan {...KONING} position={[-0.7, 0, -0.2]} rotation={[0, 0.6, 0]} pose={{ wenk: 0.8, mond: antwoord ? 'open' : 'dicht', ...(antwoord ? {} : ARMEN_GEKRUIST) }} speer={antwoord} />
      <FiguurL kleding={BODE} position={[1.5, 0, 0.9]} rotation={[0, -2.0, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.1], elleboog: [0, -0.2] }, mond: antwoord && f > 22 ? 'open' : 'dicht', wenk: antwoord ? -0.7 : 0.2 }} inHand={valt < 0.05 ? <Rol /> : undefined} />
      {valt >= 0.05 && <group position={[1.15, 1.0 - valt * 0.95, 0.75]} rotation={[valt * 1.4, 0, 0]}><Rol /></group>}
      {antwoord && <Wolk p={[-0.9, 3.05, 0.1]} tekst={['COME AND', 'TAKE THEM']} b={1.4} h={0.62} vanaf={4} staart={1} />}
    </Pas>
  );
};

/* ================= VII · Fighting in the shade ================= */

export type SlagFase = 'aanval' | 'muur' | 'list' | 'onsterfelijk' | 'dag2' | 'uit' | 'open' | 'lichaam';
/** De slag. Perzen komen van +z, de falanx staat achter de muur (en later ervoor). Zijaanzicht vanaf zee. */
export const S_Slag = ({ fase }: { fase: SlagFase }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (fase === 'aanval')
    return (
      <Pas cam={[8, 4.6, -6, 6.6, 4.0, -4.6]} kijk={[0, 1.2, 8]} over={<JaarLabel jaar="Day 1" sub="the attack begins" />}>
        <Falanx rijen={2} kolommen={8} position={[0, 0, -0.6]} t={t} speerVoor />
        <PersLeger rijen={5} kolommen={8} position={[0, 0, 22 - ease(f, 0, 180, 0, 12)]} rotation={[0, Math.PI, 0]} t={t} loopt />
      </Pas>
    );
  const voor = fase === 'uit' || fase === 'open' || fase === 'lichaam';
  const fz = fase === 'uit' ? ease(f, 0, 90, -0.6, 2.6) : voor ? 2.6 : -0.6;
  const golf = fase === 'muur' || fase === 'onsterfelijk' || fase === 'dag2' || fase === 'open';
  const terug = golf ? Math.abs(Math.sin(t * 1.6)) * 1.4 : 0;
  const list = fase === 'list' ? (f < 50 ? ease(f, 6, 26, 0, Math.PI) : ease(f, 70, 90, Math.PI, 0)) : 0;
  const achtervolg = fase === 'list' ? (f < 70 ? -ease(f, 20, 60, 0, 1.0) : ease(f, 80, 110, -1.0, 0.8)) : 0;
  return (
    <Pas
      tijd={fase === 'dag2' ? 'avond' : 'dag'}
      muur={fase !== 'open' && fase !== 'lichaam'}
      cam={[11, 3.2, 3, 9.6, 3.0, 2.4]}
      kijk={[0, 1.4, 2.2]}
      over={fase === 'dag2' ? <JaarLabel jaar="Day 2" sub="the same way" /> : fase === 'lichaam' ? <TelTeller label="Your body, dragged back" van={1} tot={4} a={10} b={120} na=" times" /> : fase === 'onsterfelijk' ? <LangTeller label="The Immortals" waarde="Fail too" /> : undefined}
    >
      <group position={[0, 0, fz]} rotation={[0, list, 0]}>
        <Falanx rijen={3} kolommen={8} position={[0, 0, 0]} t={t} speerVoor={list < 0.5} />
      </group>
      {!(fase === 'lichaam') && (
        <PersLeger rijen={3} kolommen={7} position={[0, 0, fz + 2.6 + terug + achtervolg]} rotation={[0, Math.PI, 0]} t={t} loopt goud={fase === 'onsterfelijk'} kleur={fase === 'onsterfelijk' ? '#3E5F9A' : undefined} />
      )}
      {fase === 'lichaam' && <PersLeger rijen={3} kolommen={7} position={[0, 0, fz + 3.2 + Math.abs(Math.sin(t * 2)) * 0.6]} rotation={[0, Math.PI, 0]} t={t} loopt />}
      {(golf || fase === 'lichaam') && [0, 1, 2].map((i) => <Klapster key={i} p={[-2 + i * 2, 1.8, fz + 1.1]} op={i * 8} />)}
      {fase === 'onsterfelijk' && <Blok p={[1.2, 0.04, fz + 2.2]} s={[0.66, 0.06, 1.5]} r={[0, 0.4, 0]} c="#C9A66B" />}
      {fase === 'dag2' && <Wolk p={[-1.5, 3.0, fz - 1.2]} tekst="yawn" b={0.6} h={0.24} vanaf={40} staart={0} r={[0, Math.PI / 2, 0]} />}
    </Pas>
  );
};

/** De lucht vol pijlen; de zon verdwijnt. */
export const S_Pijlen = () => {
  const f = useCurrentFrame();
  return (
    <Pas cam={[3, 1.6, 6, 2.4, 1.6, 5]} kijk={[0, 5, -10]} over={<LangTeller label="So many arrows" waarde="They'll block the sun" />}>
      {Array.from({ length: 90 }, (_, i) => {
        const x = ((i * 7.3) % 30) - 15;
        const z = -((i * 4.1) % 30) - 4;
        const y = 8 + ((i * 3.7) % 6) - ((f * 0.06 + i * 0.1) % 4);
        return <Blok key={i} p={[x, y, z + ((f * 0.2) % 6)]} s={[0.04, 0.04, 0.8]} r={[-0.4, 0, 0]} c="#2A1E16" />;
      })}
      <Spartaan kleding={DIENEKES} position={[0.4, 0, -0.6]} rotation={[0, 0.4, 0]} pose={{ hoofd: [-0.5, 0, 0] }} />
    </Pas>
  );
};

/** Dienekes grijnst in de schaduw. */
export const S_Dienekes = () => {
  const f = useCurrentFrame();
  return (
    <Pas tijd="avond" cam={[0.6, 2.1, 4.0, 0.4, 2.05, 3.4]} kijk={[0, 2.0, -0.5]} scherpte={3.2} over={<Citaat tekst="Good. Then we'll fight in the shade." wie="Dienekes" />}>
      <Spartaan kleding={DIENEKES} position={[0, 0, -0.5]} rotation={[0, 0.15, 0]} pose={{ mond: 'lach', wenk: 0.5, armL: f > 60 && f < 90 ? { schouder: [-2.6, 0, 0.4], elleboog: [0, 1.2] } : undefined }} />
    </Pas>
  );
};

/** De Onsterfelijken marcheren in perfecte rijen. */
export const S_Onsterfelijken = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Pas cam={[4, 2.4, 3.6, 3.2, 2.2, 4.6]} kijk={[0, 1.6, 12]} muur={false} over={<LangTeller label="The Immortals" waarde="10,000" pil="Xerxes' best troops" />}>
      <PersLeger rijen={6} kolommen={7} position={[0, 0, 14 - ease(f, 0, 180, 0, 3)]} rotation={[0, Math.PI, 0]} t={t} loopt goud kleur="#3E5F9A" />
    </Pas>
  );
};

/** Xerxes springt drie keer op van zijn troon, op een heuvel boven de pas; of hij huilt om zijn verliezen. */
export const S_XerxesSpring = ({ verlies = false }: { verlies?: boolean }) => {
  const f = useCurrentFrame();
  const sprongen = [20, 55, 90];
  const hop = verlies ? 0 : Math.max(0, ...sprongen.map((s) => (f >= s && f < s + 18 ? Math.sin(((f - s) / 18) * Math.PI) * 0.6 : 0)));
  const keer = verlies ? 0 : sprongen.filter((s) => f >= s).length;
  return (
    <Pas tijd={verlies ? 'avond' : 'dag'} cam={[2.6, 2.4, 13.6, 2.0, 2.3, 14.8]} kijk={[0, 1.8, 20]} muur={false} over={verlies ? <LangTeller label="Persian losses" waarde="~20,000" pil="among them two of his brothers" /> : <LangTeller label="Xerxes jumps up" waarde={`${Math.max(1, keer)}×`} />}>
      <Troon position={[0, 0, 20]} rotation={[0, Math.PI, 0]} />
      <Zit kleding={XERXES} baard hoofddeksel="kidaris" position={[0, 0, 20]} rotation={[0, Math.PI, 0]} hop={hop} pose={hop > 0.05 ? { armL: omhoog(), armR: omhoog(), mond: 'open', wenk: -0.8 } : { wenk: verlies ? -0.8 : 0.3, traan: verlies ? lin(f, 20, 80, 0, 1) : 0 }} />
      {!verlies && <FiguurL kleding={BODE} position={[1.4, 0, 20.4]} rotation={[0, Math.PI + 0.2, hop * 0.5]} pose={{ wenk: -0.6, mond: hop > 0.05 ? 'open' : 'dicht' }} />}
    </Pas>
  );
};

/* ================= VIII · The goat path ================= */

export const S_Ephialtes = () => {
  const f = useCurrentFrame();
  return (
    <PerzTent cam={[2.2, 2.3, 6.0, 1.5, 2.1, 5.0]} kijk={[0.4, 1.7, 0]} over={<LangTeller label="Ephialtes" waarde="Wants a reward" />}>
      <Troon position={[-0.9, 0, -0.9]} />
      <Zit kleding={XERXES} baard hoofddeksel="kidaris" position={[-0.9, 0, -0.9]} rotation={[0, 0.4, 0]} pose={{ wenk: 0.4, mond: 'lach' }} />
      <FiguurL kleding={EPHIALTES} baard position={[1.0, 0, 0.4]} rotation={[0, -1.0, 0]} pose={{ mond: 'lach', wenk: 0.6, armR: wijs(1.0) }} inHand={<Blok p={[0, -0.12, 0]} s={[0.22, 0.24, 0.22]} c="#A8865A" />} />
      <Geit position={[1.9, 0, 0.9]} rotation={[0, -1.6, 0]} scale={0.9} eet={f > 60} />
    </PerzTent>
  );
};

/** 's Nachts: een rij fakkels kronkelt over de berg. Een uil kijkt toe. */
export const S_Nachtpad = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 6, -20]} scherpte={1.8} mist={['#0E1220', 20, 120]} over={<JaarLabel jaar="Night" sub="the Immortals climb" />}>
      <mesh>
        <sphereGeometry args={[200, 16, 12]} />
        <meshBasicMaterial color="#0B0F1E" side={1} />
      </mesh>
      <Nachtlicht />
      <Grond kleur="#1E2430" />
      {[[-14, -30, 20], [2, -40, 26], [18, -34, 18]].map(([x, z, h], i) => <Rots key={i} position={[x, h * 0.4, z]} schaal={[16, h, 12]} kleur="#262A34" rotation={[0, i, 0]} />)}
      {Array.from({ length: 14 }, (_, i) => {
        const q = (i / 14 + t * 0.03) % 1;
        const x = -16 + q * 32;
        const y = 6 + Math.sin(q * Math.PI * 3) * 2 + q * 4;
        return <Fakkel key={i} position={[x, y, -18 + Math.sin(q * 6) * 2]} t={t + i} licht={i % 3 === 0} />;
      })}
      <group position={[2.6, 2.4, 1.4]}>
        <Blok p={[0, 0, 0]} s={[2.4, 0.12, 0.12]} c="#2A1E14" />
        <Blok p={[0.4, 0.3, 0]} s={[0.32, 0.4, 0.3]} c="#6A5A48" />
        <Blok p={[0.4, 0.6, 0]} s={[0.3, 0.26, 0.28]} c="#6A5A48" />
        {[-1, 1].map((k) => <Blok key={k} p={[0.4 + k * 0.07, 0.62, 0.145]} s={[0.08, 0.08, 0.01]} c="#FFD84A" emissive="#C99A2E" />)}
      </group>
      <CamF c={[3.6, 3.0, 6.2, 3.0, 3.2, 5.0]} kijk={[0, 5, -20]} />
    </Shot>
  );
};

/** De uitkijk rent bij dageraad de berg af. */
export const S_Uitkijk = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Pas tijd="dageraad" muur={false} cam={[4, 2.6, 8, 3.2, 2.4, 6.8]} kijk={[-1, 1.4, -1]} over={<LangTeller label="At dawn" waarde="You're surrounded" />}>
      <group position={[-3.2 + ease(f, 0, 120, 0, 3), 0, -2 + ease(f, 0, 120, 0, 1.6)]} rotation={[0, 1.1, 0]}>
        <Spartaan kleding={SPARTAAN2} speer={false} schild={false} pose={{ armL: { schouder: [Math.sin(t * 12) * 0.9, 0, 0.1] }, armR: { schouder: [-Math.sin(t * 12) * 0.9, 0, -0.1] }, mond: 'open', wenk: -0.6 }} />
        <Streepjes p={[0, 1.2, -0.7]} r={[0, Math.PI / 2, 0]} />
      </group>
      <Spartaan {...KONING} position={[1.2, 0, -0.6]} rotation={[0, -0.8, 0]} pose={{ wenk: 0.5 }} />
    </Pas>
  );
};

/** Ontbijt: brood en olijven. Eén man neemt nog een olijf. */
export const S_Ontbijt = () => {
  const f = useCurrentFrame();
  return (
    <Pas tijd="dageraad" muur={false} cam={[1.4, 2.6, 4.8, 1.0, 2.4, 4.0]} kijk={[0, 1.0, -0.7]} over={<Voorbehoud tekst="according to later writers" />}>
      <Blok p={[0, 0.3, -0.4]} s={[2.4, 0.6, 1.0]} c="#A89A84" />
      {[-0.7, 0, 0.7].map((x) => <Blok key={x} p={[x, 0.66, -0.4]} s={[0.4, 0.12, 0.26]} c="#D9A55A" />)}
      {Array.from({ length: 8 }, (_, i) => <Blok key={i} p={[-0.9 + i * 0.26, 0.63, -0.1]} s={[0.07, 0.07, 0.09]} c="#3A4A22" />)}
      {[-1, 0, 1].map((k) => <Zit key={k} kleding={k ? SPARTAAN : LEONIDAS_KAMP} haar="lang" baard position={[k * 1.05, 0, -1.3]} pose={{ mond: k === 0 ? 'open' : 'lach', armR: k === 1 ? { schouder: [-1.1 - Math.max(0, Math.sin(f / 10)) * 0.3, 0, -0.1], elleboog: [0, -0.4] } : undefined }} />)}
    </Pas>
  );
};

/** Losse Korinthische helm met de dwarse koningskam (om in het stof te leggen). */
export const Helm = () => (
  <group>
    <Blok p={[0, 0.3, 0]} s={[0.7, 0.42, 0.66]} c="#B8863A" rough={0.3} metal={0.75} />
    <Blok p={[0, -0.12, -0.3]} s={[0.7, 0.5, 0.06]} c="#B8863A" rough={0.3} metal={0.75} />
    {[-1, 1].map((k) => (
      <group key={k}>
        <Blok p={[k * 0.33, -0.12, 0.0]} s={[0.05, 0.5, 0.6]} c="#B8863A" rough={0.3} metal={0.75} />
        <Blok p={[k * 0.21, -0.12, 0.3]} s={[0.24, 0.5, 0.05]} c="#B8863A" rough={0.3} metal={0.75} />
        <Blok p={[k * 0.15, 0.04, 0.33]} s={[0.12, 0.08, 0.02]} c="#140C08" />
      </group>
    ))}
    <Blok p={[0, 0.0, 0.32]} s={[0.07, 0.24, 0.04]} c="#A57630" rough={0.3} metal={0.75} />
    <Blok p={[0, 0.58, 0]} s={[0.07, 0.14, 0.07]} c="#5A3B24" />
    <Blok p={[0, 0.74, 0]} s={[1.0, 0.22, 0.14]} c="#B3312B" rough={1} />
    <Blok p={[0, 0.86, 0]} s={[0.8, 0.06, 0.12]} c="#C9443A" rough={1} />
  </group>
);

/** De helm met de dwarse kam ligt in het stof. Geen lichaam in beeld. */
export const S_Helm = () => {
  const f = useCurrentFrame();
  return (
    <Pas tijd="avond" muur={false} damp={false} cam={[0.5, 0.9, 3.0, 0.4, 0.8, 2.4]} kijk={[0, 0.4, 0]} scherpte={3.6} duur={200}>
      <group position={[0, 0.38, 0]} rotation={[0, -0.35 + f * 0.0006, 0.42]}>
        <Helm />
      </group>
    </Pas>
  );
};

/** Een gebroken speer valt in beeld. */
export const S_Speer = () => {
  const f = useCurrentFrame();
  return (
    <Pas tijd="avond" muur={false} damp={false} cam={[0.6, 1.0, 3.2, 0.5, 0.9, 2.8]} kijk={[0, 0.4, 0]} scherpte={3.4}>
      <group position={[0, ease(f, 0, 24, 2.2, 0.05), 0]} rotation={[ease(f, 0, 24, 0.4, Math.PI / 2), 0.4, 0]}>
        <Blok p={[0, 0, 0]} s={[0.06, 1.3, 0.06]} c="#6B4A2E" />
        <Blok p={[0.02, 0.68, 0]} s={[0.07, 0.08, 0.07]} r={[0, 0, 0.4]} c="#8A6A3E" />
      </group>
      
    </Pas>
  );
};

/** Silhouetten op de heuvel tegen de zon (ver weg). */
export const S_Heuvel = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Pas tijd="avond" muur={false} cam={[2, 1.2, 14, 1.6, 1.2, 12]} kijk={[0, 3.2, -8]} scherpte={1.6}>
      <Rots position={[0, 0, -8]} schaal={[6, 2.4, 4]} kleur="#3A2A22" />
      <Falanx rijen={1} kolommen={7} afstand={0.7} position={[0, 1.9, -8]} t={t} />
    </Pas>
  );
};

/* ================= IX · Go tell the Spartans ================= */

const AtheneVuur = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const [x, , z] = opGriek(PLAATS.athene[0], PLAATS.athene[1], 0.45);
  return f > 50 ? <Vuur position={[x, 0.45, z - 0.05]} t={t} grootte={0.16} /> : null;
};
export const S_InvalKaart = ({ terug = false }: { terug?: boolean }) => (
  <KaartG
    van={terug ? G_INVAL : G_480}
    naar={terug ? G_480 : G_INVAL}
    wissel={[10, 90]}
    cam={[{ ...G_GRIEKENLAND, lat: 38.6, h: 9, a: 7 }, { ...G_GRIEKENLAND, lat: 38.2, h: 7, a: 5.5 }]}
    spelden={terug ? [['plataea', BLAUW], ['salamis', BLAUW]] : [['thermopylae', GOUD_K]]}
    over={terug ? <LangTeller label="Persia" waarde="Never again" pil="never invades Greece again" /> : <LangTeller label="480 BC" waarde="Athens burns" />}
  >
    {!terug && <AtheneVuur />}
  </KaartG>
);

/** Grieken kijken op, de lucht breekt open. */
export const S_Grieken = () => {
  const f = useCurrentFrame();
  return (
    <Sparta cam={[0.6, 1.8, 6.0, 0.4, 1.7, 5.0]} kijk={[0, 2.0, 0]} over={<LangTeller label="The Greeks" waarde="Persia can be stopped" />}>
      {[-1.2, 0, 1.2].map((x, i) => <FiguurL key={x} kleding={[SPARTAAN_BLOOT, VREEMDELING, THESPIER][i]} haar="lang" baard position={[x, 0, 0]} rotation={[0, (i - 1) * -0.3, 0]} pose={{ hoofd: [-0.5, 0, 0], mond: 'lach', armR: i === 1 ? omhoog() : undefined }} />)}
      {[0, 1, 2].map((i) => <Blok key={i} p={[-4 + i * 4, 14, -20]} s={[0.8, 26, 0.8]} r={[0.25, 0, 0.2 - i * 0.2]} c="#FFF2C8" emissive={f > 10 ? '#E8C07A' : '#000000'} />)}
    </Sparta>
  );
};

/** Salamis: galeien botsen, een Perzisch schip zinkt. */
export const S_Salamis = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const zink = ease(f, 40, 160, 0, 1);
  return (
    <Shot focus={[0, 1.5, 0]} scherpte={2.4} mist={['#DDD0B8', 20, 120]} over={<JaarLabel jaar="Salamis" sub="the Persian navy is crushed" />}>
      <ZeeDecor t={t} />
      <Galei position={[-3, 0, 0]} rotation={[0, 0.5, 0]} deining={t} schilden="#3E6FA8" />
      <group position={[3, -zink * 1.6, -2]} rotation={[0, -0.7, zink * 0.5]}>
        <Galei deining={t} schilden="#7A3B6E" />
      </group>
      {zink > 0.2 && [0, 1, 2, 3].map((i) => <Blok key={i} p={[3 + Math.sin(i) * 0.6, (t * 1.4 + i * 0.3) % 1.2, -1.4 + i * 0.2]} s={[0.14, 0.14, 0.14]} c="#E8F2F7" />)}
      <Galei position={[-6, 0, -8]} rotation={[0, 0.3, 0]} deining={t + 1} schilden="#3E6FA8" />
      <CamF c={[9, 5.4, 15, 7.6, 4.8, 13]} kijk={[0, 0.8, -1.5]} />
    </Shot>
  );
};

/** Plataea: je neef Pausanias met de koningshelm voor het Griekse leger. */
export const S_Plataea = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Sparta tijd="dag" bomen={false} cam={[1.8, 2.3, 6.6, 1.3, 2.2, 5.6]} kijk={[0, 2.0, 0]} over={<JaarLabel jaar="479 BC" sub="your nephew wins at Plataea" />}>
      <Spartaan kleding={PAUSANIAS} koning speer={false} pose={{ armR: f > 40 && f < 70 ? { schouder: [-2.9, 0, -0.3], elleboog: [0, -1.4] } : wijs(1.0), mond: 'lach', wenk: 0.4 }} />
      <Falanx rijen={3} kolommen={10} position={[0, 0, -3]} t={t} kleuren={['#A8322B', '#3E6FA8', '#5E8A5A', '#C9A646']} />
    </Sparta>
  );
};

/** De gedenksteen met het gedicht van Simonides; een geit eet een bloem. */
export const S_Gedenk = ({ gedicht = false }: { gedicht?: boolean }) => (
  <Pas tijd="avond" muur={false} damp={false} cam={gedicht ? [0.2, 1.3, 3.2, 0.1, 1.25, 2.6] : [2.4, 1.8, 6.2, 1.8, 1.6, 5.2]} kijk={[0, 1.1, 0]} scherpte={gedicht ? 3.4 : 2.8}>
    <Blok p={[0, 0.9, 0]} s={[1.5, 1.8, 0.4]} c="#B4A690" />
    <TekstVlak regels={['GO TELL THE SPARTANS,', 'STRANGER PASSING BY,', 'THAT HERE, OBEYING', 'THEIR LAWS, WE LIE.']} b={1.3} h={1.2} achter="#B4A690" voor="#4A3E30" position={[0, 1.0, 0.205]} fontPx={32} />
    {[-0.5, -0.2, 0.3, 0.55].map((x, i) => <Blok key={x} p={[x, 0.06, 0.45]} s={[0.1, 0.1, 0.1]} c={['#E8382B', '#F2D24A', '#FFFFFF', '#E8382B'][i]} />)}
    {!gedicht && <Geit position={[1.6, 0, 0.8]} rotation={[0, -1.9, 0]} scale={0.8} eet />}
  </Pas>
);

/** Veertig jaar later: een stoet met een kist naar Sparta, de agoge-jongens in de rij. */
export const S_Stoet = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Sparta cam={[6, 2.6, 8, 4.8, 2.4, 6.6]} kijk={[0, 1.2, -1]} over={<LangTeller label="~440 BC" waarde="+40 years" pil="your bones come home" />}>
      <group position={[ease(f, 0, 180, -3, 1), 0, -1]}>
        <Blok p={[0, 1.4, 0]} s={[1.6, 0.6, 0.7]} c="#6B4A2E" />
        <Blok p={[0, 1.72, 0]} s={[1.7, 0.08, 0.8]} c="#B3312B" />
        {[-0.6, 0.6].map((x) => [-0.55, 0.55].map((z) => <Hopliet key={`${x}${z}`} position={[x, 0, z]} rotation={[0, Math.PI / 2, 0]} t={t} />))}
      </group>
      {[-2, -1, 0, 1, 2].map((x) => <FiguurL key={x} kleding={LEONIDAS_JONG} haar="kaal" scale={0.6} position={[x * 0.8, 0, 1.4]} rotation={[0, Math.PI, 0]} />)}
    </Sparta>
  );
};

/** Het bronzen beeld bij de pas (met een duif op de helm), of de letters op de sokkel. */
export const S_Beeld = ({ letters = false }: { letters?: boolean }) => (
  <Pas tijd="dag" muur={false} damp={false} cam={letters ? [0.4, 1.05, 3.9, 0.3, 1.0, 3.4] : [3.4, 2.2, 10, 2.6, 2.4, 8.4]} kijk={letters ? [0, 0.8, 0.6] : [0, 3.2, 0]} scherpte={letters ? 3.4 : 2.4} over={letters ? <Citaat tekst="Molon labe: come and take them." /> : <LangTeller label="Thermopylae today" waarde="A bronze statue" />}>
    <Sokkel position={[0, 0, 0]} h={1.6}>
      <Spartaan koning o={BRONS} pose={{ armR: wijs(1.2), wenk: 0.6 }} speerVoor />
    </Sokkel>
    <pointLight position={[1.4, 3.6, 2.6]} intensity={10} distance={7} color="#FFE0B0" />
    <TekstVlak regels={['ΜΟΛΩΝ ΛΑΒΕ']} b={1.6} h={0.36} achter="#5A4A36" voor="#E2C27A" position={[0, 0.8, 0.82]} fontPx={56} />
  </Pas>
);

/** Afsluiter: het beeld in de avondzon. */
export const S_Slot = () => (
  <Pas tijd="avond" muur={false} damp={false} cam={[4, 2.6, 12, 3.2, 2.4, 10]} kijk={[0, 2.6, 0]}>
    <Sokkel position={[0, 0, 0]} h={1.6}>
      <Spartaan koning o={BRONS} pose={{ armR: wijs(1.2), wenk: 0.6 }} speerVoor />
    </Sokkel>
  </Pas>
);

void [Leger, Huis, LEONIDAS_JONG, Hal, SPARTAAN, PersSoldaat, Klapster, Delphi];
