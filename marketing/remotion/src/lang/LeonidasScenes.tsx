import { useCurrentFrame } from 'remotion';
import { Camera as CameraLos, Fakkel, Galei, Ketting, Leger, Nachtlicht, Paard, Rivier, Sokkel, TekstVlak, Vuur, Neerslag } from '../watals/Decor';
import { ARMEN_GEKRUIST, BRONS, Blok, Figuur, Kroon, Rol, omhoog, wijs, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { Citaat } from './CaesarScenes';
import { G_480, G_INVAL, G_LEEG, G_PERZIE, G_SPARTA, opGriek, PLAATS, type PlaatsNaam } from './KaarttafelGriek';
import { GroteTitel, JaarLabel, LangTeller } from './LangHud';
import {
  Baby,
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
  Huis,
  KaartG,
  Klapster,
  kp,
  LEONIDAS,
  LEONIDAS_JONG,
  LEONIDAS_KAMP,
  LERAAR,
  MiniDorieus,
  MiniSpartaan,
  MOEDER,
  ONSTERFELIJKE,
  Pas,
  PAUSANIAS,
  PersLeger,
  PersSoldaat,
  PerzTent,
  pl,
  Potje,
  Put,
  PYTHIA,
  Regelbord,
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
  TWEEDE_VROUW,
  VADER,
  Voorbehoud,
  Vos,
  VREEMDE,
  VREEMDELING,
  Wieg,
  Wolk,
  XERXES,
  Zit,
  Zweet,
  FiguurL,
} from './LeonidasKit';

/**
 * Scènes voor "What if you were Leonidas?" (lange video #04), één per zin (zie werk/scratchboard.md).
 * Geen bloed, geen lichamen in beeld bij de dood, geen kruisvormen: de val is een helm in het stof.
 */

const GOUD_K = '#C99A2E';
const BLAUW = '#3E6FA8';
const PAARS = '#7A3B6E';
const KONING = { koning: true, kleding: LEONIDAS } as const;

/* ================= teaser ================= */

/** Knal: een bronzen schild valt met de Λ naar de camera en tolt na; erachter de falanx in de avondzon. */
export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.006 : 0;
  const kantel = f < 10 ? (1 - f / 10) * 1.3 : Math.sin((f - 10) / 3) * 0.12 * Math.max(0, 1 - (f - 10) / 40);
  return (
    <Pas tijd="avond" cam={[0.4 + schok, 2.0 + schok, 6.2, 0.4, 2.0, 5.6]} kijk={[0, 1.9, 0]} muur={false} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="LEONIDAS?" /> : undefined}>
      <Falanx rijen={2} kolommen={9} position={[0, 0, -5]} t={t} />
      <group position={[0, 1.9, 1.2]} rotation={[kantel, kantel * 0.4, 0]} scale={1.9}>
        <Hoplon />
      </group>
    </Pas>
  );
};

/** De jongen van zeven, die bij zijn moeder wordt weggehaald (teaser en zin 17). */
export const S_Weg = ({ jaar = false, teaser = false }: { jaar?: boolean; teaser?: boolean }) => {
  const f = useCurrentFrame();
  const loop = ease(f, 10, 120, 0, 1.1);
  return (
    <Sparta cam={[3.6, 2.0, 7.6, 2.8, 1.8, 6.4]} kijk={[0.4, 1.2, -1]} over={jaar ? <JaarLabel jaar="Age 7" sub="the agoge" /> : undefined}>
      <Blok p={[-2.6, 1.1, -3.6]} s={[3, 2.2, 2.6]} c="#D8C7A2" rough={1} />
      <Blok p={[-2.6, 2.32, -3.6]} s={[3.3, 0.25, 2.9]} c="#A0553A" />
      <FiguurL kleding={MOEDER} haar="lang" position={[-2.0, 0, -2.2]} rotation={[0, 0.6, 0]} pose={{ armR: omhoog(), traan: lin(f, 20, 80, 0, 1), wenk: -0.6 }} />
      <FiguurL kleding={LERAAR} baard position={[0.4 + loop, 0, -1.2]} rotation={[0, 1.4, 0]} />
      <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.62} position={[0.9 + loop, 0, -0.4]} rotation={[0, 1.1, 0]} pose={{ wenk: -0.3, mond: 'dicht' }} />
      {teaser && <Wolk p={[1.0 + loop, 1.75, -0.1]} tekst="GRRR" b={0.8} h={0.34} vanaf={30} staart={-1} />}
    </Sparta>
  );
};

/** De kroon valt van een plank op zijn hoofd: "?!" */
export const S_KroonValt = () => {
  const f = useCurrentFrame();
  const y = f < 24 ? 3.4 - (f / 24) ** 2 * 1.04 : 2.36 + Math.max(0, Math.sin((f - 24) / 2) * 0.05 * (1 - (f - 24) / 20));
  return (
    <Hal cam={[1.4, 2.3, 5.0, 1.0, 2.2, 4.4]} kijk={[0, 2.1, 0]}>
      <Blok p={[0, 3.55, -0.6]} s={[1.4, 0.08, 0.8]} c="#6B4A2E" />
      <FiguurL kleding={LEONIDAS_KAMP} haar="lang" baard position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ hoofd: [-0.25, 0, 0], mond: f > 24 ? 'open' : 'dicht', wenk: f > 24 ? -0.4 : 0 }} />
      <group position={[0, y, 0.02]} rotation={[0, f * 0.05, 0]}><Kroon /></group>
      {f > 26 && <Wolk p={[0.95, 2.95, 0.2]} tekst="?!" b={0.6} h={0.4} vanaf={26} staart={-1} fontPx={200} />}
    </Hal>
  );
};

/** Teaser: Perzië op de kaart, één piepklein schildje in Griekenland. */
export const S_TeaserKaart = () => (
  <KaartG van={G_480} cam={[G_VER, { lon: 27, lat: 37, h: 16, a: 9 }]} over={<LangTeller label="Your army" waarde="300" pil="vs one of the biggest armies ever" />}>
    <MiniSchild />
  </KaartG>
);
const MiniSchild = () => {
  const f = useCurrentFrame();
  const [x, , z] = kpPos('thermopylae');
  return (
    <group position={[x, 0.75, z]} rotation={[-0.2, Math.sin(f / 4) * 0.25, 0]} scale={0.6}>
      <Hoplon />
    </group>
  );
};
const kpPos = (n: PlaatsNaam): V3 => opGriek(PLAATS[n][0], PLAATS[n][1], 0.45);

/** Teaser: hij vertrekt naar de pas, Gorgo blijft in de deur. */
export const S_Afscheid = () => {
  const f = useCurrentFrame();
  return (
    <Sparta tijd="avond" cam={[-2.6, 2.2, 7.6, -2.0, 2.0, 6.6]} kijk={[0, 1.8, -1.2]}>
      <Blok p={[-1.8, 1.1, -0.8]} s={[2.4, 2.2, 0.3]} c="#CDB994" rough={1} />
      <Blok p={[-1.8, 0.9, -0.62]} s={[0.9, 1.8, 0.05]} c="#2A1E14" />
      <FiguurL kleding={GORGO} haar="lang" position={[-1.8, 0, -0.3]} rotation={[0, 0.5, 0]} pose={{ traan: lin(f, 20, 70, 0, 1), wenk: lin(f, 70, 90, -0.5, 0.5), ...ARMEN_GEKRUIST }} />
      <Spartaan {...KONING} position={[1.6, 0, -2.6 - ease(f, 0, 150, 0, 1.4)]} rotation={[0, Math.PI - 0.3, 0]} />
    </Sparta>
  );
};

/** Titelkaart: het bronzen beeld bij de pas. */
export const T5_Titel = () => (
  <Pas tijd="avond" cam={[3.4, 2.4, 9.4, 2.6, 2.4, 8.2]} kijk={[0, 3.4, 2.4]} muur={false} over={<GroteTitel boven="THE LIFE OF" naam="LEONIDAS" onder="from a Spartan crib to the hot gates" />}>
    <Sokkel position={[0, 0, 2.4]} h={1.4}>
      <Spartaan koning o={BRONS} speerVoor={false} rotation={[0, 0.3, 0]} pose={{ wenk: 0.6 }} />
    </Sokkel>
    <pointLight position={[1.6, 4.2, 4.6]} intensity={14} distance={8} color="#FFD8A0" />
  </Pas>
);

/* ================= I · Born in Sparta ================= */

/** De boze baby in zijn wieg, met de bergen door het raam. */
export const S_Wieg = () => {
  const f = useCurrentFrame();
  return (
    <Huis cam={[0.5, 1.25, 2.6, 0.35, 1.15, 2.0]} kijk={[0.1, 0.85, 0]} over={<JaarLabel jaar="c. 540 BC" sub="Sparta" />}>
      <Wieg position={[0.1, 0, 0]}>
        <Baby position={[0, 0, 0]} boos={0.8 + Math.max(0, Math.sin(f / 9)) * 0.2} />
      </Wieg>
      <BoosTeken p={[0.42, 1.25, 0.1]} s={0.55} />
    </Huis>
  );
};

/** Twee tronen, twee koningen die elkaar vals aankijken (en tegelijk een stukje opschuiven). */
export const S_TweeKoningen = () => {
  const f = useCurrentFrame();
  const schuif = ease(f, 50, 80, 0, 0.25);
  return (
    <Hal cam={[0.4, 2.2, 7.2, 0.3, 2.0, 6.2]} kijk={[0, 1.5, 0]}>
      {[-1, 1].map((k) => (
        <group key={k} position={[k * (1.3 + schuif), 0, 0]}>
          <Troon parasol={false} kleur="#A8865A" rotation={[0, -k * 0.3, 0]} />
          <Zit kleding={k < 0 ? VADER : CLEOMENES} baard haar={k < 0 ? 'kort' : 'grijs'} rotation={[0, -k * 0.3, 0]} pose={{ hoofd: [0, -k * 0.6, 0], wenk: 0.8 }} />
        </group>
      ))}
      <Wolk p={[0, 3.1, 0]} tekst="2 KINGS" b={1.3} h={0.42} staart={0} vanaf={8} />
    </Hal>
  );
};

/** De broers: Cleomenes, de eerste wiegen, de pijl "YOU". */
export const S_Broers = ({ fase }: { fase: 'eerste' | 'cleomenes' | 'drie' | 'jij' }) => {
  const f = useCurrentFrame();
  const wip = Math.abs(Math.sin(f / 6)) * 0.12;
  if (fase === 'cleomenes')
    return (
      <Huis cam={[1.4, 1.9, 4.6, 1.0, 1.8, 3.8]} kijk={[0, 1.3, 0]}>
        <FiguurL kleding={TWEEDE_VROUW} haar="lang" position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach', armL: { schouder: [-1.1, 0, 0.3], elleboog: [0, -0.9] }, armR: { schouder: [-1.1, 0, -0.3], elleboog: [0, 0.9] } }} />
        <Baby position={[0.02, 1.0, 0.45]} scale={0.6} boos={0.2} mond="lach" schildje={false} />
        <Wolk p={[0.95, 2.1, 0.4]} tekst="HEIR" b={0.8} h={0.32} staart={-1} vanaf={10} />
        <group position={[0.02, 1.62, 0.5]} scale={0.45}><Kroon /></group>
      </Huis>
    );
  if (fase === 'drie')
    return (
      <Huis cam={[1.0, 1.9, 6.0, 0.8, 1.8, 5.2]} kijk={[0.3, 1.1, 0]}>
        <FiguurL kleding={MOEDER} haar="lang" position={[-1.2, 0, -0.4]} rotation={[0, 0.5, 0]} pose={{ mond: 'lach' }} />
        <Wieg position={[0.5, 0, 0.1]} label={false}>
          {[-0.28, 0, 0.28].map((x, i) => <Baby key={x} position={[x, 0, 0]} scale={0.55} boos={i === 1 ? 1 : 0.2} mond={i === 1 ? 'dicht' : 'lach'} schildje={i === 1} />)}
        </Wieg>
        {[1.5, 2.15].map((x, i) => (
          <group key={x}>
            <FiguurL kleding={EFOR} haar="grijs" baard position={[x, 0, -0.9 - i * 0.5]} rotation={[0, -0.6, 0]} pose={{ mond: 'open', wenk: -0.6 }} />
            <Blok p={[x + 0.4, ease(f, 30 + i * 6, 44 + i * 6, 1.1, 0.06), -0.6 - i * 0.5]} s={[0.06, 2.1, 0.06]} r={[0, 0, ease(f, 30 + i * 6, 44 + i * 6, 0, 1.5)]} c="#5A3B24" />
          </group>
        ))}
      </Huis>
    );
  if (fase === 'jij')
    return (
      <Huis cam={[0.6, 1.15, 2.2, 0.55, 1.05, 1.6]} kijk={[0.5, 0.75, 0.1]}>
        <Wieg position={[0.5, 0, 0.1]} label={false}>
          {[-0.28, 0, 0.28].map((x, i) => <Baby key={x} position={[x, 0, 0]} scale={0.55} boos={i === 1 ? 1 : 0.2} mond={i === 1 ? 'dicht' : 'lach'} schildje={i === 1} knipoog={i === 1 && f > 30 && f < 46} />)}
        </Wieg>
        <Wolk p={[0.5, 1.32, 0.2]} tekst="YOU" b={0.5} h={0.22} staart={0} vanaf={8} />
      </Huis>
    );
  return (
    <Huis cam={[1.4, 1.7, 4.4, 1.0, 1.6, 3.6]} kijk={[0.3, 0.9, 0]}>
      <FiguurL kleding={{ ...CLEOMENES, haar: '#5A4434' }} scale={0.7} position={[-0.7, 0, 0.3]} rotation={[0, 0.4, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
      <Wieg position={[0.7, 0, -0.2]} label={false}><Baby scale={0.7} boos={1} /></Wieg>
      <Wolk p={[0.7, 1.4 + wip, -0.1]} tekst="YOU" b={0.6} h={0.26} staart={0} vanaf={8} />
    </Huis>
  );
};

/** Vijf eforen wijzen naar de vader: "neem een tweede vrouw". */
export const S_Eforen = () => (
  <Hal cam={[2.4, 2.4, 7.4, 1.6, 2.2, 6.2]} kijk={[0.4, 1.7, 0]}>
    <FiguurL kleding={VADER} baard position={[-1.6, 0, 0.4]} rotation={[0, 0.9, 0]} pose={{ armR: { schouder: [-2.6, 0, -0.5], elleboog: [0, -1.4] }, wenk: -0.5, mond: 'open' }} />
    <Zweet p={[-1.25, 2.3, 0.6]} n={2} />
    {[0, 1, 2, 3, 4].map((i) => (
      <FiguurL key={i} kleding={EFOR} haar="grijs" baard position={[0.2 + i * 0.75, 0, -0.8 + (i % 2) * 0.5]} rotation={[0, -1.2, 0]} pose={{ armR: wijs(1.3), wenk: 0.9 }} />
    ))}
  </Hal>
);

/** De keuring door de ouderen. */
export const S_Keuring = ({ fase }: { fase: 'test' | 'berg' | 'geslaagd' }) => {
  const f = useCurrentFrame();
  if (fase === 'berg')
    return (
      <Sparta tijd="avond" bomen={false} dorp={false} cam={[6, 2.4, 14, 5, 2.2, 12]} kijk={[-6, 4, -30]} over={<Voorbehoud tekst="according to Plutarch" />}>
        {[0, 1].map((i) => <FiguurL key={i} kleding={EFOR} haar="grijs" baard position={[-4 - i * 0.9, 0, -14 - i * 0.4]} rotation={[0, 2.6, 0]} scale={0.8} />)}
      </Sparta>
    );
  return (
    <Hal cam={[0.6, 2.6, 6.0, 0.4, 2.4, 5.2]} kijk={[0, 1.5, 0]} over={fase === 'geslaagd' ? <Stempel tekst="PASSED" vanaf={6} top={160} /> : undefined}>
      <Blok p={[0, 0.5, 0]} s={[1.6, 1.0, 0.9]} c="#8A6A3A" />
      <Blok p={[0, 1.01, 0]} s={[1.5, 0.02, 0.8]} c="#E9DFC8" />
      <Baby position={[0, 1.02, 0.05]} scale={0.8} boos={1} schildje={false} mond={fase === 'geslaagd' ? 'lach' : 'dicht'} />
      {[-1, 0, 1].map((k) => (
        <FiguurL key={k} kleding={EFOR} haar="grijs" baard position={[k * 1.1, 0, -0.95 + Math.abs(k) * 0.35]} rotation={[0, -k * 0.5, 0]} pose={{ hoofd: [0.45, 0, 0], wenk: k === 0 && fase === 'geslaagd' ? -0.5 : 0.7, mond: k === 0 && fase === 'geslaagd' ? 'open' : 'dicht', armR: k === 0 ? { schouder: [-1.0, 0, -0.1], elleboog: [-0.6, 0] } : undefined }} />
      ))}
      {fase === 'test' && <group position={[-1.1, 1.02, 0.25]}><Blok p={[0, 0.3, 0]} s={[0.05, 0.6, 0.05]} c={GOUD_K} metal={0.7} /><Blok p={[0, 0.6, 0]} s={[0.6, 0.04, 0.04]} c={GOUD_K} metal={0.7} r={[0, 0, Math.sin(f / 8) * 0.12]} /></group>}
    </Hal>
  );
};

/** De trap: Cleomenes en Dorieus bovenaan, jij onderaan op je tenen. */
export const S_Trap = () => {
  const f = useCurrentFrame();
  return (
    <Hal cam={[3.6, 2.6, 8.4, 2.8, 2.4, 7.2]} kijk={[0, 1.8, 0]}>
      {[0, 1, 2, 3].map((i) => <Blok key={i} p={[0, 0.25 + i * 0.5, -i * 0.7]} s={[3, 0.5 + i * 0.0, 0.7]} c="#C9B994" />)}
      {[0, 1, 2, 3].map((i) => <Blok key={`v${i}`} p={[0, i * 0.25, -i * 0.7]} s={[3, i * 0.5 + 0.01, 0.7]} c="#BFAE8A" />)}
      <FiguurL kleding={CLEOMENES} baard haar="grijs" position={[-0.5, 2.0, -2.1]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
      <FiguurL kleding={DORIEUS} baard position={[0.6, 1.5, -1.4]} pose={{ wenk: 0.6 }} />
      <FiguurL kleding={LEONIDAS_JONG} haar="lang" scale={0.7} position={[0.2, 0.06 + Math.abs(Math.sin(f / 5)) * 0.08, 0.6]} rotation={[0, 0.1, 0]} pose={{ hoofd: [-0.4, 0, 0], armR: omhoog() }} />
    </Hal>
  );
};

/* ================= II · The agoge ================= */

/** Agoge: kale kop, blote voeten, riet, honger, straf, vos, weinig woorden, soldaat, huis, soep. */
export const S_Agoge = ({ fase }: { fase: 'kaal' | 'riet' | 'eten' | 'straf' | 'vos' | 'vosweg' | 'woorden' | 'soldaat' | 'huis' | 'soep' }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (fase === 'kaal')
    return (
      <Sparta bomen={false} tijd="dageraad" cam={[1.6, 1.2, 4.2, 1.2, 1.0, 3.4]} kijk={[0, 0.9, 0]}>
        <Blok p={[0, 0.02, 0]} s={[8, 0.06, 8]} c="#F2F4F6" />
        <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.66} position={[0, 0.05, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5 }} />
        <Neerslag t={t} n={90} breed={8} midden={[0, -1, 0]} />
      </Sparta>
    );
  if (fase === 'riet')
    return (
      <Shot focus={[0, 1.0, 0]} scherpte={2.6} mist={['#DCD2BC', 20, 90]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[8, 12, 6]} intensity={2} color="#FFE4BE" castShadow />
        <hemisphereLight args={['#BFD8EE', '#6A5A3A', 1]} />
        <mesh><sphereGeometry args={[200, 16, 12]} /><meshBasicMaterial color="#9EC1DB" side={1} /></mesh>
        <Rivier t={t} breed={5} nacht={false} />
        {Array.from({ length: 18 }, (_, i) => <Blok key={i} p={[-6 + i * 0.7, 0.6, -2.0 + (i % 3) * 0.3]} s={[0.06, 1.4 + (i % 4) * 0.2, 0.06]} c="#8A9A4A" />)}
        {[-1.4, 0, 1.4].map((x, i) => (
          <FiguurL key={x} kleding={LEONIDAS_JONG} haar="kaal" scale={0.62} position={[x, -0.25, -1.4 + i * 0.2]} rotation={[0, 0.2 - i * 0.2, 0]} pose={{ armR: { schouder: [-0.9, 0, -0.1], elleboog: [0, -0.4] }, armL: i === 1 ? { schouder: [-2.4, 0, 0.4], elleboog: [0, 1.6] } : undefined, wenk: i === 1 ? -0.6 : 0.3, mond: i === 1 ? 'open' : 'dicht' }} />
        ))}
        <CamF c={[3, 2.0, 6.6, 2.2, 1.8, 5.4]} kijk={[0, 0.9, -1.4]} />
      </Shot>
    );
  if (fase === 'eten')
    return (
      <Huis avond cam={[0.6, 1.6, 3.4, 0.4, 1.5, 2.7]} kijk={[0, 1.0, 0]}>
        <Blok p={[0, 0.4, 0.4]} s={[2.2, 0.8, 0.8]} c="#6B4A2E" />
        {[-0.7, 0, 0.7].map((x) => (
          <group key={x} position={[x, 0.8, 0.5]}>
            <Blok p={[0, 0.05, 0]} s={[0.36, 0.1, 0.36]} c="#B5643A" />
            <Blok p={[0, 0.12, 0]} s={[0.07, 0.07, 0.09]} c="#3A4A22" />
          </group>
        ))}
        <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.66} position={[0, 0, -0.3]} pose={{ wenk: -0.7, mond: 'open', hoofd: [0.2, 0.5, 0] }} />
        <group position={[1.6, 0.8, -0.6]}><Blok p={[0, 0.15, 0]} s={[0.7, 0.3, 0.5]} c="#A8865A" />{[0, 1, 2].map((i) => <Blok key={i} p={[-0.2 + i * 0.2, 0.36, 0]} s={[0.2, 0.14, 0.3]} c="#D9A55A" />)}</group>
        <Wolk p={[-0.75, 1.5, 0.0]} tekst="GRRR" b={0.6} h={0.26} vanaf={20} staart={1} />
      </Huis>
    );
  if (fase === 'straf') {
    const zwiep = Math.sin(f / 3) * 0.6;
    return (
      <Sparta cam={[2.8, 2.0, 6.0, 2.2, 1.9, 5.0]} kijk={[0, 1.2, 0]} bomen={false}>
        <FiguurL kleding={LERAAR} baard position={[-0.9, 0, 0]} rotation={[0, 0.9, 0]} pose={{ armR: { schouder: [-2.2 + zwiep, 0, -0.2], elleboog: [0, -0.2] }, wenk: 0.9, mond: 'open' }} inHand={<Blok p={[0, -0.5, 0]} s={[0.03, 0.9, 0.03]} c="#8A9A4A" />} />
        <Streepjes p={[-0.1, 2.6, 0.2]} r={[0, 0, -0.6]} />
        <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.62} position={[0.8, 0, 0.2]} rotation={[0.25, -0.8, 0]} pose={{ armL: omhoog(), armR: omhoog(), wenk: -0.6, ogen: 'dicht' }} />
        <Zweet p={[1.1, 1.5, 0.3]} n={2} />
      </Sparta>
    );
  }
  if (fase === 'vos' || fase === 'vosweg') {
    const weg = fase === 'vosweg';
    return (
      <Sparta cam={[1.6, 1.8, 5.2, 1.2, 1.6, 4.4]} kijk={[0.6, 0.7, -0.3]} bomen={false}>
        {!weg && (
          <>
            <FiguurL kleding={{ ...LEONIDAS_JONG, cape: '#6B5236' }} haar="kaal" scale={0.66} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ wenk: 0.3 + lin(f, 20, 100, 0, 0.7), mond: 'dicht' }} extra={<Blok p={[0.05, 1.15, 0.26]} s={[0.5, 0.42, 0.16]} c="#6B5236" />} />
            <Blok p={[0.15, 1.2, 0.35]} s={[0.08, 0.1, 0.05]} c="#E4682B" r={[0, 0, Math.sin(f / 4) * 0.3]} />
            <Blok p={[-0.05, 1.2, 0.35]} s={[0.08, 0.1, 0.05]} c="#E4682B" r={[0, 0, -Math.sin(f / 4) * 0.3]} />
            <Blok p={[-0.3, 0.55, 0.12]} s={[0.1, 0.3, 0.1]} c="#E4682B" r={[0, 0, 0.4 + Math.sin(f / 5) * 0.2]} />
            <Blok p={[-0.36, 0.4, 0.12]} s={[0.09, 0.1, 0.09]} c="#FFF1DC" />
            {f > 40 && <Zweet p={[0.3, 1.55, 0.2]} n={2} />}
          </>
        )}
        {weg && (
          <>
            <Blok p={[0, 0.04, 0]} s={[1.0, 0.06, 0.7]} c="#6B5236" r={[0, 0.3, 0]} />
            <Vos position={[ease(f, 10, 140, 0.4, 1.7), 0, ease(f, 10, 140, 0.2, -0.8)]} rotation={[0, 2.2, 0]} scale={1.1} kijk={f > 60 && f < 100 ? -1.4 : 0} />
          </>
        )}
      </Sparta>
    );
  }
  if (fase === 'woorden')
    return (
      <Hal cam={[0.8, 2.2, 6.0, 0.6, 2.0, 5.0]} kijk={[0, 1.4, 0]}>
        <FiguurL kleding={LERAAR} baard position={[-1.0, 0, 0]} rotation={[0, 0.7, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.1], elleboog: [0, 0] }, mond: Math.floor(f / 4) % 2 ? 'open' : 'dicht' }} />
        <Blok p={[-0.55, ease(f, 6, 60, 1.4, 0.75), 0.75]} s={[0.5, ease(f, 6, 60, 0.2, 1.45), 0.02]} c="#EFE3C4" />
        <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.66} position={[0.9, 0, 0.2]} rotation={[0, -0.7, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.5 }} />
        <Wolk p={[1.3, 2.05, 0.3]} tekst="No." b={0.7} h={0.36} vanaf={70} staart={-1} />
      </Hal>
    );
  if (fase === 'soldaat')
    return (
      <Sparta cam={[0.6, 2.2, 5.4, 0.4, 2.1, 4.4]} kijk={[0, 1.9, 0]} over={<JaarLabel jaar="Age 20" sub="a soldier" />}>
        <Spartaan kleding={SPARTAAN} helm={false} speer={false} schild="voor" position={[0, 0, 0]} rotation={[0, 0.1, 0]} pose={{ mond: 'lach', wenk: 0.2, hoofd: [0.3, 0, 0] }} />
        <FiguurL kleding={EFOR} haar="grijs" baard position={[-1.2, 0, -0.5]} rotation={[0, 0.7, 0]} pose={{ armR: wijs(0.9) }} />
        <pointLight position={[-0.1, 1.4, 1.2]} intensity={3} distance={2} color="#FFE8A0" />
      </Sparta>
    );
  if (fase === 'huis')
    return (
      <Sparta cam={[3.2, 2.2, 7.2, 2.4, 2.0, 6.0]} kijk={[0, 1.4, -1]} over={<JaarLabel jaar="Age 30" sub="your own house" />}>
        <Blok p={[0, 1.1, -2.4]} s={[2.6, 2.2, 2.2]} c="#D8C7A2" rough={1} />
        <Blok p={[0, 2.32, -2.4]} s={[2.9, 0.25, 2.5]} c="#A0553A" />
        <Blok p={[0.4, 0.75, -1.29]} s={[0.7, 1.5, 0.04]} c="#5A3B24" />
        <FiguurL kleding={{ ...LEONIDAS_KAMP, tuniek: '#7A5A3A', borst: undefined }} haar="lang" baard position={[-0.4, 0, 0]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach', armR: wijs(0.9) }} inHand={<group rotation={[Math.PI / 2, 0, 0]}><Blok p={[0, 0.1, 0]} s={[0.04, 0.22, 0.04]} c={GOUD_K} metal={0.7} /><Blok p={[0.04, 0.2, 0]} s={[0.08, 0.04, 0.03]} c={GOUD_K} metal={0.7} /></group>} />
      </Sparta>
    );
  // soep: lange tafel met vijftien man, iedereen trekt een vies gezicht behalve jij
  return (
    <Hal cam={[4.6, 3.2, 6.4, 3.6, 2.9, 5.4]} kijk={[0, 1.5, -0.6]} over={<LangTeller label="Every night" waarde="Black soup" pil="with 15 other men" />}>
      <Blok p={[0, 0.75, -0.3]} s={[7.4, 0.1, 1.2]} c="#6B4A2E" />
      {[-3.2, 3.2].map((x) => <Blok key={x} p={[x, 0.36, -0.3]} s={[0.12, 0.72, 1.0]} c="#5A3B24" />)}
      {Array.from({ length: 7 }, (_, i) => {
        const x = -3 + i;
        const jij = i === 3;
        return (
          <group key={i}>
            <Blok p={[x, 0.86, 0.05]} s={[0.3, 0.12, 0.3]} c="#2A1E16" />
            <Blok p={[x, 0.93, 0.05]} s={[0.24, 0.02, 0.24]} c="#140C08" />
            <FiguurL kleding={jij ? LEONIDAS_KAMP : i % 2 ? SPARTAAN : SPARTAAN2} haar="lang" baard position={[x, -0.35, -1.05]} pose={{ wenk: jij ? 0.2 : -0.7, mond: jij ? 'lach' : 'open', hoofd: [0.25, 0, 0], armR: jij ? { schouder: [-0.9, 0, -0.1], elleboog: [0, -0.6] } : undefined }} />
            {!jij && i % 2 === 0 && <Wolk p={[x, 2.15, -0.9]} tekst="YUCK" b={0.6} h={0.24} vanaf={18 + i * 6} staart={0} />}
          </group>
        );
      })}
    </Hal>
  );
};

/** Camera als los element (voor zelfgebouwde Shots). */
const CamF = ({ c, kijk, duur = 160 }: { c: number[]; kijk: V3; duur?: number }) => {
  const f = useCurrentFrame();
  return <CameraLos pos={camPos(f, c, duur)} kijk={kijk} />;
};

export { HoofdstukKaart } from './CaesarScenes';
