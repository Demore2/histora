import { useCurrentFrame } from 'remotion';
import { Bed, Menigte, Zee } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs } from '../watals/Figuur';
import { JaarLabel, LangTeller } from './LangHud';
import { BoosTeken, Pijllabel, Stempel, TelTeller, Voorbehoud, Wolk, Zweet } from './LeonidasKit';
import { Citaat } from './SaladinScenes';
import { SU_1941, SU_BLOK, SU_HONGER, SU_PACT, SU_USSR } from './KaarttafelSU';
import {
  ARBEIDER,
  ARBEIDER2,
  Auto,
  BOER,
  BOERIN,
  BOLSJEWIEK,
  Bord,
  BURGER,
  BURGERES,
  CHROES_P,
  Colonne,
  Deur,
  DOKTER,
  DUITSER,
  ease,
  Flits,
  FiguurS,
  FPS,
  Gang,
  Graankar,
  GrijzeVlag,
  Helm,
  Hek,
  Hernoem,
  Huisje,
  Kaars,
  Kaarsjes,
  KaartS,
  Kantoor,
  KIROV,
  Klep,
  Klok,
  kpS,
  Land,
  lin,
  MiniDuitser,
  MiniStalin,
  NADJA,
  OFFICIER,
  Paleis,
  Papier,
  Pet,
  Plein,
  plS,
  Poster,
  Puin,
  RodeVlag,
  RondeBril,
  ROOD,
  Ruilkaart,
  S_VER,
  S_WEST,
  Schaakbord,
  Siberie,
  Sik,
  SOLDAAT,
  Stad,
  STALIN_OUD_P,
  STALIN_P,
  STALIN_ZP,
  Standbeeld,
  Stoel,
  Tafel,
  TROTSKI_P,
  WACHT,
  YAKOV,
  YEZHOV,
  Zaal,
} from './StalinKit';

/**
 * Scènes voor "What if you were Joseph Stalin?" deel 2: hoofdstuk V-IX en de outro.
 */

const t30 = (f: number) => f / FPS;

/* ================= V · Man of steel ================= */

const SCHAAK = ['TROTSKY', 'ZINOVIEV', 'KAMENEV', 'BUKHARIN'];

/** Het schaakbord: rivalen vallen een voor een om. `tot` = hoeveel er aan het eind liggen. */
export const S_Schaak = ({ van = 0, tot = 0 }: { van?: number; tot?: number }) => {
  const f = useCurrentFrame();
  const vallen = SCHAAK.map((_, i) => (i < van ? 1 : i < tot ? ease(f, 20 + (i - van) * 22, 34 + (i - van) * 22, 0, 1) : 0));
  return (
    <Kantoor nacht cam={[0.6, 2.3, 3.0, 0.4, 2.2, 2.6]} kijk={[0, 1.35, -0.2]}>
      <Schaakbord position={[0, 0.82, 0.3]} labels={SCHAAK} vallen={vallen} />
      <FiguurS {...STALIN_P} position={[0, 0, -0.6]} pose={{ hoofd: [0.45, 0, 0], wenk: 0.5, armR: { schouder: [-1.0, 0, -0.1], elleboog: [0, -0.3] } }} />
    </Kantoor>
  );
};

export const S_TrotskiWeg = () => (
  <KaartS van={SU_USSR} cam={[S_WEST, { ...S_WEST, lon: 34, lat: 48 }]} routes={[{ punten: [plS('moskou'), plS('kiev'), plS('istanbul')] }]} kop={<group scale={0.24}><Figuur kleding={TROTSKI_P.kleding} haar="kaal" hoofdExtra={TROTSKI_P.hoofdExtra} /></group>} spelden={[['istanbul', '#5A6A8A']]} over={<JaarLabel jaar="1929" sub="Trotsky thrown out" />} />
);

export const S_Verjaardag = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Stad cam={[3.2, 2.4, 11, 2.4, 2.8, 9.4]} kijk={[0, 3.6, -4]} over={<JaarLabel jaar="1929" sub="your 50th birthday" />}>
      <Poster position={[0, 4.0, -4.4]} schaal={2.2} />
      <Menigte n={14} z={0} x0={-7.5} t={t} juich />
      <RodeVlag position={[-4.6, 0, -3]} t={t} h={5} />
      <RodeVlag position={[4.0, 0, -3]} t={t + 1} h={5} />
    </Stad>
  );
};

export const S_Plan = () => (
  <Kantoor cam={[1.6, 2.0, 5.2, 1.0, 1.9, 4.2]} kijk={[0.3, 1.8, -0.8]} over={<><JaarLabel jaar="1928" sub="the Five-Year Plan" /><LangTeller label="Goal" waarde="10 years" pil="to catch up with the West" /></>}>
    <group position={[0.8, 2.2, -1.8]}>
      <Blok p={[0, 0, 0]} s={[2.0, 1.4, 0.04]} c="#F2EAD8" />
      {[0.2, 0.35, 0.55, 0.8, 1.1].map((h, i) => <Blok key={i} p={[-0.7 + i * 0.35, -0.6 + h / 2, 0.03]} s={[0.24, h, 0.02]} c={ROOD} />)}
    </group>
    <FiguurS {...STALIN_P} position={[-0.7, 0, -0.6]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(1.4), wenk: 0.4 }} />
  </Kantoor>
);

export const S_Industrie = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Land tijd="avond" fabrieken={ease(f, 0, 110, 0.05, 1)} cam={[3, 2.2, 10, 2.2, 3.0, 8.6]} kijk={[0, 3.0, -8]} over={<LangTeller label="Built" waarde="1,500" pil="new factories, 1928 – 1932" />}>
      {[-3, -1, 1, 3].map((x, i) => <FiguurS key={x} kleding={i % 2 ? ARBEIDER : ARBEIDER2} hoofdExtra={<Klep />} position={[x, 0, 0]} rotation={[0, Math.PI, 0]} pose={{ armR: f > 60 && i % 2 ? omhoog() : undefined }} />)}
      <RodeVlag position={[-4.4, 0, -1]} t={t} h={4.2} />
    </Land>
  );
};

export const S_Akker = ({ fase }: { fase: 'graan' | 'kolchoz' | 'leeg' }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  if (fase === 'graan')
    return (
      <Land koren cam={[2.6, 2.0, 8, 1.8, 2.0, 7]} kijk={[0, 1.2, -2]}>
        {[-1.6, 0, 1.6].map((x, i) => <FiguurS key={x} kleding={i === 1 ? BOERIN : BOER} haar={i === 1 ? 'lang' : 'kort'} position={[x, 0, -1]} rotation={[0, 0.2 * (i - 1), 0]} pose={{ armR: { schouder: [-1.2 + Math.sin(t * 3 + i) * 0.4, 0, 0], elleboog: [0, 0] } }} />)}
        {[-0.8, 0.8].map((x) => <Blok key={x} p={[x, 0.3, 0.6]} s={[0.6, 0.6, 0.5]} c="#C9B88E" rough={1} />)}
      </Land>
    );
  if (fase === 'kolchoz')
    return (
      <Land cam={[3, 3.4, 9.4, 2.2, 3.2, 8.2]} kijk={[0, 2.0, -2.4]} over={<LangTeller label="Collectivisation" waarde="your land" pil="now belongs to the state" />}>
        <group position={[0, 0, -3]}>
          {[-2.2, 2.2].map((x) => <Blok key={x} p={[x, 1.6, 0]} s={[0.4, 3.2, 0.4]} c="#5A3B24" />)}
          <Bord position={[0, 2.8, 0]} tekst={['KOLKHOZ']} b={4.2} h={0.8} achter={ROOD} voor="#F2EAD8" fontPx={110} />
          <Blok p={[0, 2, -6]} s={[14, 4, 6]} c="#8A7A60" rough={1} />
        </group>
        {[0, 1, 2, 3, 4].map((i) => <FiguurS key={i} kleding={i % 2 ? BOERIN : BOER} haar={i % 2 ? 'lang' : 'kort'} position={[-1 + i * 0.5, 0, lin(f, 0, 160, 3 - i * 0.8, -1 - i * 0.8)]} rotation={[0, Math.PI, 0]} pose={{ wenk: -0.6 }} />)}
        <FiguurS kleding={SOLDAAT} hoofdExtra={<Pet kleur="#2A3A6A" />} position={[2.6, 0, -1.4]} rotation={[0, -0.6, 0]} pose={{ armR: wijs(1.0) }} />
      </Land>
    );
  return (
    <Land grond="#8A7A58" cam={[1.6, 2.2, 9, 0.8, 2.2, 8.4]} kijk={[0.4, 1.4, -2.5]} over={<LangTeller label="Taken" waarde="the grain" pil="even the seed" />}>
      <Blok p={[-3.6, 1.2, -3]} s={[3, 2.4, 2.6]} c="#8A7A60" rough={1} />
      <Blok p={[-3.6, 2.7, -3]} s={[3.4, 0.6, 3]} c="#6A5A3A" rough={1} />
      <FiguurS kleding={BOERIN} haar="lang" position={[-0.9, 0, -0.6]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.8, traan: lin(f, 30, 100, 0, 1) }} />
      <FiguurS kleding={BOER} scale={0.7} position={[-0.1, 0, -0.2]} rotation={[0, 0.6, 0]} pose={{ wenk: -0.7 }} />
      <group position={[1 + lin(f, 0, 140, -1, 3), 0, -6]}>
        <Graankar position={[0, 0, 0]} t={t} loopt />
        <FiguurS kleding={SOLDAAT} hoofdExtra={<Pet kleur="#2A3A6A" />} position={[1.0, 0, 1.1]} rotation={[0, Math.PI / 2, 0]} />
      </group>
    </Land>
  );
};

export const S_KaartDeportatie = () => (
  <KaartS van={SU_USSR} cam={[S_VER, { ...S_VER, h: 21 }]} routeTijd={[10, 110]}
    routes={[{ punten: [plS('kiev'), plS('moskou'), [60, 61], [70, 62]] }, { punten: [[38, 48], [52, 55], [64, 58]] }, { punten: [[44, 46], [56, 52], plS('karaganda')] }]}
    over={<TelTeller label="Deported" van={0} tot={1800000} a={10} b={100} pil="branded as rich peasants, 1930 – 31" />} />
);

export const S_KaartHonger = () => (
  <KaartS van={SU_USSR} naar={SU_HONGER} wissel={[10, 50]} cam={[S_VER, { lon: 50, lat: 48, h: 16, a: 10 }]} licht={['Ukraine', 'Kazakhstan']} over={<JaarLabel jaar="1932 – 1933" sub="the famine" />} />
);

export const S_Honger = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Land tijd="grijs" grond="#7A6A4E" cam={[2.4, 1.8, 8.4, 1.6, 1.9, 7.4]} kijk={[0, 1.2, -2]} over={<LangTeller label="Famine dead" waarde="millions" pil="estimates: 5.5 to 8.7 million" />}>
      {[[-4, -4], [3.6, -5], [-0.4, -7]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <Blok p={[0, 1.1, 0]} s={[2.6, 2.2, 2.2]} c="#8A7A60" rough={1} />
          <Blok p={[0, 2.5, 0]} s={[3, 0.6, 2.6]} c="#5A4A30" rough={1} />
          <Blok p={[0, 0.8, 1.12]} s={[0.6, 1.4, 0.04]} c="#1A1410" />
        </group>
      ))}
      <FiguurS kleding={BOERIN} haar="lang" hoofdExtra={<Blok p={[0, 0.66, -0.02]} s={[0.7, 0.3, 0.66]} c="#4A3A2E" />} position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.9, armL: { schouder: [-0.6, 0, 0.6], elleboog: [0, 0.8] }, armR: { schouder: [-0.6, 0, -0.6], elleboog: [0, -0.8] } }} />
      <Blok p={[0, 1.2, 0.35]} s={[0.3, 0.4, 0.24]} c="#C9B88E" />
      <Graankar position={[lin(f, 0, 150, 2, 12), 0, -10]} t={t} loopt vol />
    </Land>
  );
};

export const S_Nadja = () => {
  const f = useCurrentFrame();
  return (
    <Huisje avond rijk cam={[1.4, 1.7, 4.6, 0.9, 1.6, 3.8]} kijk={[0, 1.1, 0]} over={<LangTeller label="Nadezhda" waarde="1901 – 1932" pil="your second wife" />}>
      <Tafel position={[0, 0, 0.2]} b={2.4} d={1.0} />
      <Kaars position={[0, 0.82, 0.2]} />
      <Stoel position={[0.8, 0, -0.5]} />
      <FiguurS {...STALIN_P} position={[-0.8, 0, -0.5]} rotation={[0, 0.5, 0]} pose={{ wenk: 0.8, mond: 'open', armR: wijs(1.0) }} />
      <FiguurS kleding={NADJA} haar="bob" position={[lin(f, 30, 150, 0.8, 2.4), 0, -0.5]} rotation={[0, f > 30 ? 1.4 : -0.5, 0]} pose={{ wenk: -0.7 }} />
    </Huisje>
  );
};

export const S_Officieel = () => (
  <Huisje cam={[0.8, 1.6, 3.0, 0.6, 1.6, 2.6]} kijk={[0, 1.3, 0.6]} over={<Stempel tekst="OFFICIAL" vanaf={30} top={560} kleur="#B3241E" />}>
    <Papier position={[0, 1.35, 0.7]} regels={['PRAVDA', 'died of', 'appendicitis']} b={0.9} h={0.8} fontPx={60} />
  </Huisje>
);

export const S_Alleen = () => (
  <Kantoor nacht cam={[2.4, 2.1, 6.0, 1.8, 2.0, 5.2]} kijk={[-1.4, 1.7, -1.0]}>
    <FiguurS {...STALIN_P} position={[-1.7, 0, -1.2]} rotation={[0, Math.PI - 0.3, 0]} pose={{ ...ARMEN_GEKRUIST }} />
  </Kantoor>
);

/* ================= VI · The Terror ================= */

export const S_Kirov = () => {
  const f = useCurrentFrame();
  return (
    <Gang licht cam={[1.4, 1.8, 4.8, 0.9, 1.7, 4.0]} kijk={[-0.2, 1.0, -1.2]} over={<><JaarLabel jaar="December 1934" sub="Leningrad" /><LangTeller label="Sergei Kirov" waarde="shot" pil="popular party leader" /><div style={{ position: 'absolute', inset: 0, background: '#FFF4D8', opacity: f > 20 && f < 28 ? 0.8 * (1 - (f - 20) / 8) : 0 }} /></>}>
      <Deur position={[0.6, 0, -2.0]} />
      <group position={[-0.5, 0.02, 0.2]} rotation={[0.1, 0.6, 0.1]}>
        <group position={[0, -0.7, 0]}><Pet kleur="#5A5A44" /></group>
      </group>
      <Papier position={[0.3, 0.03, 0.3]} rotation={[-Math.PI / 2, 0, 0.4]} regels={['']} b={0.4} h={0.3} />
    </Gang>
  );
};

export const S_Vijanden = () => {
  const f = useCurrentFrame();
  return (
    <KaartS van={SU_USSR} cam={[S_VER, { ...S_VER, h: 20 }]} over={<Pijllabel tekst="enemies everywhere" x={960} y={220} naar={[960, 420]} vanaf={10} />}>
      {Array.from({ length: Math.round(lin(f, 0, 90, 0, 40)) }, (_, i) => {
        const lon = 30 + ((i * 37) % 60);
        const lat = 44 + ((i * 23) % 20);
        return <group key={i} position={[0, 0, 0]}><MiniPin lon={lon} lat={lat} /></group>;
      })}
    </KaartS>
  );
};
const MiniPin = ({ lon, lat }: { lon: number; lat: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const p = opPin(lon, lat);
  return (
    <group position={p}>
      <Blok p={[0, 0.3, 0]} s={[0.04, 0.6, 0.04]} c="#2A1E16" />
      <Blok p={[0, 0.62, 0]} s={[0.14, 0.14, 0.14]} c={ROOD} />
    </group>
  );
};
import { opSU as opPin } from './KaarttafelSU';

export const S_Proces = () => {
  const f = useCurrentFrame();
  return (
    <Zaal cam={[3.6, 3.4, 7.8, 2.8, 3.2, 7.0]} kijk={[0, 1.4, -1.8]} over={<LangTeller label="Show trials" waarde="1936 – 1938" pil="heroes of 1917 confess" />}>
      <Blok p={[0, 0.6, -3]} s={[5, 1.2, 1.0]} c="#4A2E1C" />
      {[-1.4, 0, 1.4].map((x) => <FiguurS key={x} kleding={OFFICIER} hoofdExtra={<Pet kleur="#2A3A6A" />} position={[x, 0.1, -3.6]} pose={{ wenk: 0.6 }} />)}
      {[-1.6, -0.6, 0.4, 1.4].map((x, i) => <FiguurS key={x} kleding={BOLSJEWIEK} haar={i % 2 ? 'grijs' : 'kort'} baard={i === 1} position={[x, 0, -0.6]} rotation={[0, Math.PI, 0]} pose={{ wenk: -0.6, hoofd: [0.3, 0, 0] }} />)}
      <Wolk p={[-0.2, 2.5, -0.4]} tekst="WE CONFESS" b={1.3} h={0.34} vanaf={30} staart={0} />
      {f > 0 && null}
    </Zaal>
  );
};

export const S_Quota = () => (
  <Kantoor cam={[1.0, 2.0, 3.6, 0.7, 1.9, 3.0]} kijk={[0, 1.2, 0.1]} over={<LangTeller label="Order 00447" waarde="quotas" pil="enemies to find, per region" />}>
    <Papier position={[0, 0.85, 0.3]} rotation={[-Math.PI / 2 + 0.25, 0, 0]} regels={['REGION 1 ..... 5,000', 'REGION 2 ..... 3,500', 'REGION 3 ..... 8,000', 'REGION 4 ..... 2,000']} b={1.0} h={0.8} fontPx={38} />
    <FiguurS kleding={YEZHOV} hoofdExtra={<Pet />} scale={0.85} position={[0, 0, -0.7]} pose={{ hoofd: [0.4, 0, 0] }} />
  </Kantoor>
);

export const S_Auto = () => {
  const f = useCurrentFrame();
  return (
    <Stad tijd="nacht" cam={[3.4, 2.6, 9, 2.4, 2.3, 7.8]} kijk={[0, 1.6, -2]}>
      <Auto position={[lin(f, 0, 70, -8, -1), 0, -1.8]} />
      {[1.4, 2.6].map((x, i) => <FiguurS key={x} kleding={i ? WACHT : YEZHOV} hoofdExtra={<Pet />} position={[x, 0, -0.2 - i * 0.6]} rotation={[0, -0.5 - i * 0.2, 0]} />)}
    </Stad>
  );
};

export const S_Ramen = () => {
  const f = useCurrentFrame();
  return (
    <Stad tijd="nacht" ramenUit={lin(f, 10, 140, 0, 0.85)} cam={[0.6, 3.4, 11, 0.2, 3.6, 10]} kijk={[0, 3.8, -6]} over={<TelTeller label="Executed" van={0} tot={700000} a={10} b={130} pil="around, in 1937 – 1938" />} />
  );
};

export const S_KaartGoelag = () => {
  const kampen: [number, number][] = [[64, 67.5], [80, 62], [73, 49.8], [88, 69.3], [60, 64], [55, 62], [86, 56], [70, 60], [50, 65], [76, 53]];
  const f = useCurrentFrame();
  return (
    <KaartS van={SU_USSR} cam={[S_VER, { lon: 66, lat: 60, h: 18, a: 10 }]} over={<TelTeller label="Sent to the Gulag" van={0} tot={1000000} a={10} b={110} na="+" pil="in 1937 – 1938 alone" />}>
      {kampen.slice(0, Math.round(lin(f, 0, 100, 0, kampen.length))).map(([lon, lat], i) => (
        <group key={i} position={opPin(lon, lat, 0.45)}>
          <Blok p={[0, 0.15, 0]} s={[0.5, 0.3, 0.5]} c="#3A3A3E" />
          <Blok p={[0, 0.34, 0]} s={[0.56, 0.06, 0.56]} c="#6E7076" />
        </group>
      ))}
    </KaartS>
  );
};

export const S_Generaals = () => {
  const f = useCurrentFrame();
  return (
    <Zaal cam={[1.2, 1.8, 4.4, 0.8, 1.8, 3.6]} kijk={[0, 1.0, 0]} over={<LangTeller label="Top commanders" waarde="shot" pil="3 of the 5 marshals" />}>
      <Tafel position={[0, 0, 0]} b={3.0} d={0.9} kleur="#4A2E1C" />
      {[-1.1, -0.55, 0, 0.55, 1.1].map((x, i) => {
        const weg = [1, 2, 4].includes(i) ? ease(f, 20 + i * 14, 34 + i * 14, 1, 0.001) : 1;
        return (
          <group key={x} position={[x, 0.85, 0]} scale={weg}>
            <Blok p={[0, 0.07, 0]} s={[0.4, 0.14, 0.38]} c="#4E5A3A" />
            <Blok p={[0, 0.02, 0.2]} s={[0.32, 0.03, 0.12]} c="#151210" />
            <Blok p={[0, 0.1, 0.2]} s={[0.08, 0.08, 0.02]} r={[0, 0, Math.PI / 4]} c={ROOD} />
          </group>
        );
      })}
    </Zaal>
  );
};

export const S_Yezhov = ({ fase }: { fase: 'baas' | 'weg' | 'foto' }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  if (fase === 'baas')
    return (
      <Kantoor cam={[1.6, 1.9, 5.0, 1.0, 1.8, 4.2]} kijk={[0, 1.4, -0.4]} over={<><LangTeller label="Nikolai Yezhov" waarde="NKVD chief" pil="1936 – 1938" /><Pijllabel tekst="1.51 m tall" x={1340} y={360} naar={[1150, 520]} vanaf={50} /></>}>
        <FiguurS {...STALIN_P} position={[-0.6, 0, -0.6]} rotation={[0, 0.4, 0]} pose={{ wenk: 0.3 }} />
        <FiguurS kleding={YEZHOV} hoofdExtra={<Pet />} scale={0.8} position={[0.7, 0, 0.6]} rotation={[0, -0.5, 0]} pose={{ armR: { schouder: [-1.1, 0, -0.2], elleboog: [0, -0.6] } }} inHand={<Blok p={[0, -0.05, 0.1]} s={[0.24, 0.05, 0.3]} c="#C9A878" />} />
      </Kantoor>
    );
  if (fase === 'weg')
    return (
      <Stad tijd="nacht" cam={[2.0, 2.0, 7, 1.4, 2.0, 6]} kijk={[0, 1.4, -1]} over={<><JaarLabel jaar="1939" sub="arrested" /><Stempel tekst="1940" vanaf={60} top={300} /></>}>
        <Auto position={[2.4, 0, -1.6]} />
        <FiguurS kleding={YEZHOV} scale={0.8} position={[lin(f, 0, 100, -1, 1.2), 0, -0.4]} rotation={[0, Math.PI / 2, 0]} pose={{ wenk: -0.8 }} />
        {[-1, 1].map((d) => <FiguurS key={d} kleding={WACHT} hoofdExtra={<Pet />} position={[lin(f, 0, 100, -1, 1.2) - 0.8, 0, -0.4 + d * 0.6]} rotation={[0, Math.PI / 2, 0]} />)}
      </Stad>
    );
  const weg = lin(f, 40, 75, 1, 0.001);
  return (
    <Land tijd="grijs" cam={[0, 1.7, 8.2, 0, 1.7, 8.2]} kijk={[0, 1.7, 0]} over={<div style={{ position: 'absolute', inset: 0, background: 'rgba(140,110,70,0.35)', mixBlendMode: 'multiply' }} />}>
      <group position={[0, 0, -9]}><Zee t={t} kleur="#7A8A84" golf={0.05} grootte={40} /></group>
      <Blok p={[0, 0.5, -3]} s={[20, 1, 0.4]} c="#9A8A70" />
      <FiguurS {...STALIN_ZP} position={[-0.6, 0, 0]} rotation={[0, 0.15, 0]} />
      <group position={[0.7, 0, 0.1]} scale={[weg, weg, weg]}>
        <FiguurS kleding={YEZHOV} hoofdExtra={<Pet />} scale={0.8} rotation={[0, -0.2, 0]} />
      </group>
      {[2.45, 0.95].map((y) => <Blok key={`h${y}`} p={[0, y, 5.2]} s={[1.0, 0.05, 0.01]} c="#F2EAD8" />)}
      {[-0.47, 0.47].map((x) => <Blok key={`v${x}`} p={[x, 1.7, 5.2]} s={[0.05, 1.55, 0.01]} c="#F2EAD8" />)}
    </Land>
  );
};

export const S_Mexico = ({ leeg = false }: { leeg?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Land grond="#C8A878" cam={[2.0, 1.8, 6.4, 1.3, 1.8, 5.4]} kijk={[0, 1.2, -0.6]} over={leeg ? <JaarLabel jaar="August 1940" sub="Coyoacán, Mexico" /> : <JaarLabel jaar="1940" sub="Mexico" />}>
      <Blok p={[0, 2, -3]} s={[10, 4, 0.4]} c="#D88A5A" rough={1} />
      {[-3.4, 3.2].map((x) => (
        <group key={x} position={[x, 0, -1.8]}>
          <Blok p={[0, 1.0, 0]} s={[0.4, 2.0, 0.4]} c="#4E7A3A" />
          <Blok p={[0.35, 1.3, 0]} s={[0.3, 0.8, 0.3]} c="#4E7A3A" />
        </group>
      ))}
      <Tafel position={[0, 0, 0]} b={1.8} d={0.9} />
      {!leeg && <FiguurS {...TROTSKI_P} position={[0, 0, -0.7]} pose={{ hoofd: [0.4, 0, 0], armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.5] } }} inHand={<Blok p={[0, -0.1, 0.1]} s={[0.03, 0.03, 0.3]} c="#2A1A12" />} />}
      {leeg && (
        <>
          <Stoel position={[0.2, 0, -0.8]} rotation={[0, 0, 1.4]} />
          <group position={[0.4, 0.04, 0.8]} rotation={[0, 0.6, 0]}><RondeBril /></group>
        </>
      )}
      {Array.from({ length: 6 }, (_, i) => <Papier key={i} position={[-0.6 + i * 0.25 + (leeg ? Math.sin(f / 20 + i) * 0.5 : 0), 0.83 + (leeg ? 0 : i * 0.002), 0.1 + (leeg ? i * 0.2 : 0)]} rotation={[-Math.PI / 2, 0, i * 0.3]} regels={['']} b={0.3} h={0.4} />)}
    </Land>
  );
};

/* ================= VII · The war ================= */

export const S_Pact = () => (
  <Zaal loper cam={[2.2, 2.2, 6.4, 1.4, 2.1, 5.4]} kijk={[0, 1.4, -0.8]} over={<JaarLabel jaar="August 1939" sub="a pact with Hitler" />}>
    <Tafel position={[0, 0, -0.6]} b={2.4} d={1.0} kleur="#4A2E1C" />
    <Papier position={[0, 0.84, -0.5]} rotation={[-Math.PI / 2, 0, 0]} regels={['PACT']} b={0.6} h={0.4} fontPx={100} />
    <FiguurS kleding={DUITSER} haar="kort" position={[0.9, 0, -0.5]} rotation={[0, -1.0, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.4], elleboog: [0, 0] } }} />
    <FiguurS kleding={BOLSJEWIEK} haar="kort" snor position={[-0.9, 0, -0.5]} rotation={[0, 1.0, 0]} pose={{ armR: { schouder: [-1.2, 0, 0.4], elleboog: [0, 0] } }} inHand={<RondeBril />} />
    <FiguurS {...STALIN_P} position={[0, 0, -1.8]} pose={{ mond: 'lach' }} />
    <RodeVlag position={[-2.4, 0, -2.4]} h={3.6} />
    <GrijzeVlag position={[1.8, 0, -2.4]} h={3.6} />
  </Zaal>
);

export const S_KaartPact = () => (
  <KaartS van={SU_USSR} naar={SU_PACT} wissel={[10, 60]} cam={[S_WEST, { ...S_WEST, lon: 24, lat: 54, h: 11 }]} licht={['Lithuania', 'Latvia', 'Estonia']} over={<LangTeller label="In secret" waarde="split" pil="Poland and the Baltic, 1939 – 40" />} />
);

export const S_Spion = ({ boos = false }: { boos?: boolean }) => (
  <Kantoor cam={[1.8, 2.2, 5.8, 1.3, 2.1, 5.0]} kijk={[0, 1.5, -0.2]}>
    <FiguurS {...STALIN_P} position={[-0.3, 0, -0.6]} rotation={[0, 0.3, 0]} pose={boos ? { armR: { schouder: [-1.6, 0, -0.6], elleboog: [0, 0] }, wenk: 1, mond: 'open' } : { wenk: 0.4, hoofd: [0.2, 0.3, 0] }} />
    <FiguurS kleding={OFFICIER} hoofdExtra={<Pet kleur="#2A3A6A" />} position={[1.1, 0, 0.6]} rotation={[0, -0.8, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, 0] }, wenk: -0.4 }} inHand={<Papier position={[0, -0.05, 0.1]} rotation={[-Math.PI / 2, 0, 0]} regels={['22 JUNE']} b={0.4} h={0.3} fontPx={90} />} />
    {boos && <Wolk p={[-0.3, 2.65, -0.4]} tekst="NONSENSE." b={1.1} h={0.34} vanaf={10} staart={0} />}
    {boos && <Zweet p={[1.3, 2.1, 0.7]} />}
  </Kantoor>
);

export const S_KaartInval = ({ verder = false }: { verder?: boolean }) => (
  <KaartS van={verder ? SU_PACT : SU_PACT} naar={verder ? SU_1941 : undefined} wissel={[10, 90]} cam={[S_WEST, verder ? kpS('moskou', 12, 8) : { ...S_WEST, h: 14 }]}
    routes={verder ? [{ punten: [plS('berlijn'), [27, 54], plS('moskou')], kleur: '#3A3A3E' }, { punten: [[20, 50], plS('kiev'), [42, 49]], kleur: '#3A3A3E' }] : [{ punten: [plS('berlijn'), [24, 53]], kleur: '#3A3A3E' }, { punten: [[18, 50], [26, 50]], kleur: '#3A3A3E' }, { punten: [[20, 55], [26, 57]], kleur: '#3A3A3E' }]}
    kop={<MiniDuitser />} spelden={verder ? [['moskou', ROOD]] : []}
    over={verder ? <LangTeller label="1941" waarde="Moscow" pil="the Germans close in" /> : <><JaarLabel jaar="22 June 1941" /><TelTeller label="German soldiers" van={0} tot={3000000} a={10} b={90} /></>} />
);

export const S_Parade = ({ weg = false }: { weg?: boolean }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Plein tijd="winter" sneeuw cam={weg ? [8, 2.6, 10, 6, 2.4, 9] : [4, 2.6, 12, 3, 2.8, 10.4]} kijk={weg ? [4, 1.6, -4] : [0, 2.4, -6]} over={weg ? undefined : <JaarLabel jaar="7 November 1941" sub="the parade, Red Square" />}>
      <Colonne z={-4} n={14} t={t * (weg ? 1.6 : 1)} x0={-12 + (weg ? t * 1.2 : 0)} />
      <Colonne z={-7} n={14} t={t * (weg ? 1.6 : 1) + 0.5} x0={-12 + (weg ? t * 1.2 : 0)} />
      {!weg && <FiguurS {...STALIN_P} kleding={{ ...STALIN_P.kleding, cape: '#4A463A' }} position={[0, 2.6, -17]} />}
      <RodeVlag position={[-6, 0, -9]} t={t} h={5} />
    </Plein>
  );
};

export const S_Yakov = ({ fase }: { fase: 'gevangen' | 'ruil' | 'antwoord' | 'leeg' }) => {
  const f = useCurrentFrame();
  if (fase === 'gevangen')
    return (
      <Land tijd="grijs" cam={[2.4, 2.0, 7, 1.6, 1.9, 6]} kijk={[0, 1.5, -0.6]} over={<LangTeller label="Yakov" waarde="captured" pil="your oldest son, July 1941" />}>
        <FiguurS kleding={YAKOV} snor haar="kort" position={[0, 0, 0]} pose={{ wenk: -0.4, ...ARMEN_GEKRUIST }} />
        {[-1, 1].map((x) => <FiguurS key={x} kleding={DUITSER} hoofdExtra={<Helm kleur="#5A5E58" />} position={[x, 0, -0.4]} rotation={[0, x < 0 ? 0.5 : -0.5, 0]} />)}
        <Hek z={-3} van={-8} tot={8} />
      </Land>
    );
  if (fase === 'ruil')
    return (
      <Kantoor nacht cam={[1.4, 1.9, 4.8, 0.9, 1.8, 4.0]} kijk={[0, 1.4, -0.2]} over={<Ruilkaart links="YAKOV" rechts="FIELD MARSHAL PAULUS" />}>
        <FiguurS {...STALIN_P} position={[0, 0, -0.6]} pose={{ wenk: 0.6 }} />
      </Kantoor>
    );
  if (fase === 'antwoord')
    return (
      <Kantoor nacht cam={[0.8, 1.9, 3.2, 0.6, 1.9, 2.7]} kijk={[0, 1.7, -0.6]} over={<Citaat tekst="I don't trade a soldier for a field marshal." wie="Stalin, according to the story" />}>
        <FiguurS {...STALIN_P} position={[0, 0, -0.6]} pose={{ wenk: 0.7, hoofd: [0.1, 0, 0] }} />
      </Kantoor>
    );
  return (
    <Land tijd="grijs" cam={[1.6, 1.4, 5, 1.0, 1.4, 4.2]} kijk={[0, 0.8, -0.6]} over={<LangTeller label="Yakov" waarde="1907 – 1943" pil="died in a German camp" />}>
      <Hek z={-2} van={-8} tot={8} />
      <Blok p={[0, 0.4, -0.6]} s={[1.6, 0.08, 0.4]} c="#5A3E28" />
      <group position={[0.2, 0.44, -0.6]}><group position={[0, -0.7, 0]}><Pet kleur="#4E5A3A" /></group></group>
      {f > 0 && null}
    </Land>
  );
};

export const S_Stalingrad = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Puin cam={[4, 1.8, 10.5, 3, 2.2, 9.5]} kijk={[0, 3.2, -3]} over={<><JaarLabel jaar="1942 – 1943" sub="Stalingrad" /><LangTeller label="German 6th Army" waarde="surrounded" pil="about 91,000 surrender" /></>}>
      <Blok p={[0, 1.2, -3]} s={[4, 2.4, 1.6]} r={[0, 0.1, 0.04]} c="#7A7068" rough={1} />
      <RodeVlag position={[0.4, 2.4, -3]} t={t} h={3.4} />
      <FiguurS kleding={SOLDAAT} hoofdExtra={<Helm />} position={[-0.6, 2.4, -2.8]} pose={{ armR: omhoog(), mond: 'open' }} />
      {[-3, -1.8, 1.8, 3].map((x, i) => <FiguurS key={x} kleding={SOLDAAT} hoofdExtra={<Helm />} position={[x, 0, -0.6 - (i % 2)]} rotation={[0, Math.PI + (x < 0 ? 0.4 : -0.4), 0]} pose={{ armR: f > 50 && i % 2 ? omhoog() : undefined }} />)}
    </Puin>
  );
};

export const S_Berlijn = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const y = ease(f, 10, 90, 0, 1);
  return (
    <Puin tijd="grijs" sneeuw={false} cam={[5, 2.4, 14, 3.6, 3.6, 12]} kijk={[0, 7, -12]} over={<JaarLabel jaar="May 1945" sub="Berlin" />}>
      <group position={[0, 0, -14]}><Paleis position={[0, 0, 0]} kleur="#8A8478" koepel /></group>
      <group position={[2, 8.6, -12]}>
        <FiguurS kleding={SOLDAAT} hoofdExtra={<Helm />} position={[0, 0, 0]} pose={{ armR: omhoog(), armL: omhoog() }} />
        <group position={[0.2, 1.2 + y * 0.8, 0]}><RodeVlag position={[0, 0, 0]} t={t} h={2.4} /></group>
      </group>
    </Puin>
  );
};

export const S_Doden = () => {
  const f = useCurrentFrame();
  return (
    <Land tijd="avond" grond="#5A524A" cam={[2.2, 1.6, 7.4, 1.4, 1.8, 6.4]} kijk={[0, 1.0, -1.6]} over={<TelTeller label="Soviet dead" van={0} tot={27000000} a={10} b={110} pil="around, soldiers and civilians" />}>
      <Kaarsjes midden={[0, 0, -1.2]} n={Math.round(lin(f, 0, 90, 6, 60))} breed={7} />
      <group position={[0, 0, -3.4]}>
        <Blok p={[0, 0.15, 0]} s={[2, 0.3, 2]} c="#3A3A3E" />
        <Blok p={[0, 0.34, 0]} s={[0.6, 0.12, 0.6]} c="#FF9A3A" emissive="#FF6A1A" />
        <pointLight position={[0, 0.8, 0]} intensity={6} distance={6} color="#FF9A50" />
      </group>
      {[-2.4, 2.4].map((x) => <FiguurS key={x} kleding={BURGERES} haar="lang" hoofdExtra={<Blok p={[0, 0.66, -0.02]} s={[0.7, 0.3, 0.66]} c="#1E1A18" />} position={[x, 0, -1.8]} rotation={[0, x < 0 ? 0.5 : -0.5, 0]} pose={{ wenk: -0.8, hoofd: [0.4, 0, 0] }} />)}
    </Land>
  );
};

/* ================= VIII · The last door ================= */

export const S_KaartBlok = () => (
  <KaartS van={SU_USSR} naar={SU_BLOK} wissel={[10, 60]} cam={[S_WEST, { ...S_WEST, lon: 26, lat: 52, h: 14 }]} over={<LangTeller label="1949" waarde="the bomb" pil="the Soviet atomic bomb" />} />
);

export const S_Cultus = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Stad cam={[3.4, 2.2, 11, 2.4, 2.6, 9.6]} kijk={[0, 3.2, -4]}>
      <Poster position={[-5, 3.6, -4.4]} schaal={1.6} oud />
      <Poster position={[5, 3.6, -4.4]} schaal={1.6} oud />
      <Standbeeld position={[0, 0, -2]} />
      {[-3, 3].map((x) => <FiguurS key={x} kleding={x < 0 ? ARBEIDER : BURGERES} haar={x < 0 ? 'kort' : 'lang'} position={[x, 0, 1.4]} rotation={[0, Math.PI + (x < 0 ? -0.3 : 0.3), 0]} pose={{ armR: f > 40 ? omhoog() : undefined }} />)}
      <RodeVlag position={[-7, 0, -2]} t={t} h={4.6} />
    </Stad>
  );
};

export const S_Paranoia = () => {
  const f = useCurrentFrame();
  return (
    <Gang cam={[1.6, 1.8, 5.4, 1.0, 1.7, 4.4]} kijk={[0, 1.5, -1.6]}>
      <Deur position={[0.8, 0, -2.0]} sloten={Math.round(lin(f, 10, 90, 1, 6))} />
      <FiguurS {...STALIN_OUD_P} position={[-0.8, 0, -0.6]} rotation={[0, 0.7, 0]} pose={{ wenk: 0.6, hoofd: [0, 0.5, 0] }} />
      <Zweet p={[-0.5, 2.1, -0.4]} />
    </Gang>
  );
};

export const S_Dokters = () => (
  <Zaal cam={[2.4, 2.2, 6.8, 1.6, 2.1, 5.8]} kijk={[0, 1.6, -1]} over={<><JaarLabel jaar="January 1953" sub="the Doctors' Plot" /><Stempel tekst="PLOT?" vanaf={40} top={280} /></>}>
    {[-1.8, -0.6, 0.6, 1.8].map((x, i) => <FiguurS key={x} kleding={DOKTER} haar={i % 2 ? 'grijs' : 'kort'} baard={i === 0} position={[x, 0, -0.6]} pose={{ wenk: -0.7, ...ARMEN_GEKRUIST }} />)}
    {[-2.6, 2.6].map((x) => <FiguurS key={x} kleding={WACHT} hoofdExtra={<Pet />} position={[x, 0, 0.6]} rotation={[0, x < 0 ? 0.4 : -0.4, 0]} />)}
  </Zaal>
);

export const S_Datsja = () => (
  <Siberie tijd="nacht" hut={false} cam={[4, 2.2, 12, 3, 2.4, 10.6]} kijk={[0, 2.0, -6]} over={<JaarLabel jaar="1 March 1953" sub="your country house near Moscow" />}>
    <group position={[0, 0, -7]}>
      <Blok p={[0, 2, 0]} s={[10, 4, 6]} c="#4E6A4A" rough={1} />
      <Blok p={[0, 4.3, 0]} s={[10.6, 0.6, 6.6]} c="#E8ECF0" />
      {[-3.4, -1.2, 1.2, 3.4].map((x, i) => <Blok key={x} p={[x, 2.2, 3.02]} s={[1.0, 1.4, 0.04]} c={i === 2 ? '#E8B060' : '#141820'} emissive={i === 2 ? '#B87A30' : '#000000'} />)}
    </group>
    {[-2.4, 2.4].map((x) => <FiguurS key={x} kleding={{ ...WACHT, cape: '#3A3A30' }} hoofdExtra={<Pet />} position={[x, 0, -2.6]} />)}
  </Siberie>
);

/** De dichte deur met de wachters (teaser en hoofdstuk VIII). */
export const S_Deur = ({ fase = 'dicht' }: { fase?: 'dicht' | 'bordje' | 'wacht' | 'open' }) => {
  const f = useCurrentFrame();
  const open = fase === 'open' ? ease(f, 20, 60, 0, 0.6) : 0;
  return (
    <Gang cam={fase === 'open' ? [1.0, 1.7, 4.4, 0.7, 1.6, 3.6] : [1.6, 2.2, 7.0, 0.8, 2.0, 6.0]} kijk={[0, 1.4, -1.6]} over={fase === 'wacht' ? <LangTeller label="Waiting" waarde="hours" pil="nobody dares to knock" /> : undefined}>
      <Deur position={[0, 0, -2.0]} open={open} bordje={fase === 'bordje' ? 'DO NOT DISTURB' : undefined} />
      {fase === 'wacht' && <Klok position={[2.0, 2.6, -2.02]} uren={lin(f, 0, 150, 7, 22)} />}
      {[-1.4, 1.4].map((x, i) => (
        <FiguurS key={x} kleding={WACHT} hoofdExtra={<Pet />} position={[x, 0, -1.3]} rotation={[0, i ? -0.5 : 0.5, 0]} pose={fase === 'open' ? { wenk: -0.9, mond: 'open', hoofd: [0, i ? 0.8 : -0.8, 0] } : { wenk: -0.6, hoofd: [0, i ? 0.6 : -0.6, 0] }} />
      ))}
      {fase === 'wacht' && <Zweet p={[-1.2, 2.1, -1.2]} />}
      {fase === 'open' && f > 40 && (
        <group position={[0.4, 0.04, -2.6]} rotation={[0, 0.8, 0]}>
          <Blok p={[0, 0, 0]} s={[0.04, 0.04, 0.22]} r={[0.25, 0.3, 0]} c="#2A1A12" />
          <Blok p={[0.05, 0.03, 0.12]} s={[0.11, 0.14, 0.11]} c="#4A2A18" />
        </group>
      )}
    </Gang>
  );
};

export const S_Dood = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Plein tijd="grijs" cam={[4, 2.4, 13, 3, 2.6, 11.4]} kijk={[0, 4, -10]} over={<LangTeller label="Age" waarde="74" pil="died 5 March 1953" />}>
      <group position={[0, -ease(f, 10, 120, 0, 1.6), 0]}><RodeVlag position={[0, 0, -10]} t={t} h={6} /></group>
    </Plein>
  );
};

export const S_Begrafenis = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Stad tijd="winter" sneeuw cam={[3, 3.4, 12, 2.2, 3.6, 10.6]} kijk={[0, 1.4, -2]} over={<LangTeller label="Funeral" waarde="crushed" pil="hundreds die in the crowds" />}>
      {Array.from({ length: 5 }, (_, r) => <Menigte key={r} n={14} z={1 - r * 1.0} x0={-7.5 + (r % 2) * 0.5} t={t + r} />)}
      {[-6.5, 6.5].map((x) => <RodeVlag key={x} position={[x, 0, -3]} t={t} h={4.2} />)}
      {f > 0 && null}
    </Stad>
  );
};

/* ================= IX · Hero or monster? ================= */

export const S_Toespraak = ({ zaal = false }: { zaal?: boolean }) => {
  const f = useCurrentFrame();
  if (!zaal)
    return (
      <Zaal loper cam={[1.4, 2.6, 5.6, 0.9, 2.5, 4.8]} kijk={[0, 1.9, -1.2]} over={<JaarLabel jaar="February 1956" sub="the secret speech" />}>
        <Blok p={[0, 0.45, -0.8]} s={[0.9, 0.9, 0.5]} c="#5A3B24" />
        <FiguurS {...CHROES_P} position={[0, 0, -1.4]} pose={{ mond: Math.floor(f / 7) % 2 ? 'open' : 'dicht', wenk: 0.5, armR: wijs(1.2) }} />
        <RodeVlag position={[-1.8, 0, -2.4]} h={3.6} />
      </Zaal>
    );
  return (
    <Zaal cam={[2.6, 2.2, 7, 1.8, 2.1, 6]} kijk={[0, 1.4, -1]}>
      {Array.from({ length: 12 }, (_, i) => <FiguurS key={i} kleding={i % 3 ? BOLSJEWIEK : BURGER} haar={i % 4 ? 'kort' : 'grijs'} position={[-2.75 + (i % 6) * 1.1, 0, -0.4 - Math.floor(i / 6) * 1.2]} pose={{ mond: f > 30 ? 'open' : 'dicht', wenk: -0.5 }} />)}
    </Zaal>
  );
};

export const S_BeeldValt = () => {
  const f = useCurrentFrame();
  return (
    <Stad tijd="grijs" cam={[4, 2.4, 12, 3, 2.6, 10.4]} kijk={[0, 3, -2]} over={<LangTeller label="1956 – 1961" waarde="de-Stalinisation" pil="statues down, body moved" />}>
      <Standbeeld position={[0, 0, -2]} val={ease(f, 40, 90, 0, 1)} />
      {[2.6, 3.6, 4.6].map((x, i) => <FiguurS key={x} kleding={i % 2 ? ARBEIDER : ARBEIDER2} hoofdExtra={<Klep />} position={[x, 0, -1.6]} rotation={[0, -Math.PI / 2, 0]} pose={{ armR: wijs(1.0), armL: wijs(1.0) }} />)}
      <Blok p={[1.8, 2.6, -1.8]} s={[2.6, 0.04, 0.04]} r={[0, 0, -0.5]} c="#C9B88E" />
    </Stad>
  );
};

export const S_Volgograd = () => (
  <Land tijd="dag" cam={[2, 1.8, 7, 1.4, 1.8, 6]} kijk={[0, 1.6, -2]} over={<Hernoem oud="STALINGRAD" nieuw="VOLGOGRAD" />}>
    <Blok p={[0, 0.02, -6]} s={[60, 0.03, 6]} c="#5A7E8E" />
  </Land>
);

export const S_Supermacht = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Land tijd="avond" fabrieken={1} cam={[3.4, 2.0, 11, 2.4, 2.6, 9.4]} kijk={[0, 2.6, -6]} over={<Pijllabel tekst="a superpower with the bomb" x={960} y={240} naar={[960, 430]} vanaf={30} />}>
      <group position={[-4, 0, -2]}>
        <Blok p={[0, 1.0, 0]} s={[2.4, 2.0, 2]} c="#8A7A60" rough={1} />
        <Blok p={[0, 2.3, 0]} s={[2.8, 0.6, 2.4]} c="#6A5A3A" rough={1} />
      </group>
      <RodeVlag position={[2, 0, -1]} t={t} h={4.6} />
      {f > 0 && null}
    </Land>
  );
};

export const S_Prijs = () => {
  const f = useCurrentFrame();
  return (
    <Land tijd="avond" grond="#4A443E" cam={[1.8, 1.2, 6, 1.2, 1.3, 5]} kijk={[0, 0.5, -1.4]}>
      <Kaarsjes midden={[0, 0, -1.4]} n={Math.round(lin(f, 0, 80, 20, 80))} breed={9} />
    </Land>
  );
};

export const S_Slot = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Plein tijd="avond" mausoleum={false} cam={[5, 1.6, 12, 3, 2.2, 9.5]} kijk={[0, 4.0, -4]} duur={210} over={<LangTeller label="Legacy" waarde="hero or monster?" pil="1878 – 1953" />}>
      <Standbeeld position={[0, 0, -4]} />
      {Array.from({ length: 16 }, (_, i) => {
        const x = (i % 8) * 1.4 - 4.9;
        const z = 0.2 + Math.floor(i / 8) * 1.3;
        const links = x < 0;
        return <FiguurS key={i} kleding={links ? { ...BOER, tuniek: ROOD } : BOERIN} haar={links ? 'kort' : 'lang'} position={[x, 0, z]} rotation={[0, Math.PI, 0]} pose={{ armR: links && i % 2 ? omhoog() : undefined }} />;
      })}
      <RodeVlag position={[-4.6, 0, 1]} t={t} h={4.6} />
    </Plein>
  );
};

/* ongebruikte imports bewust gebruikt houden voor latere shots */
void [Bed, BOLSJEWIEK, Colonne, Graankar, Huisje, Kaars, kpS, MiniStalin, Siberie, Sik, STALIN_ZP, BoosTeken, Voorbehoud, Flits, Bord, ARBEIDER2];
