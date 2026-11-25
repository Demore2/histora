import { useCurrentFrame } from 'remotion';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs, type V3 } from '../watals/Figuur';
import { Menigte, Sokkel } from '../watals/Decor';
import { GroteTitel, JaarLabel, LangTeller } from './LangHud';
import { BoosTeken, Pijllabel, Stempel, TelTeller, Voorbehoud, Wolk, Zweet } from './LeonidasKit';
import { Citaat } from './SaladinScenes';
import { SU_RIJK, SU_USSR } from './KaarttafelSU';
import {
  ARBEIDER,
  ARBEIDER2,
  Auto,
  BESO_P,
  Biljetten,
  BOER,
  BOLSJEWIEK,
  Bord,
  Boortoren,
  BURGER,
  BURGERES,
  Colonne,
  Dossiers,
  ease,
  Flits,
  FiguurS,
  FPS,
  GENDARME,
  Gori,
  Graankar,
  Helm,
  Huisje,
  Kaars,
  Kaartenbord,
  KaartS,
  Kantoor,
  KEKE_P,
  Klep,
  KOBA_P,
  Land,
  Koets,
  kpS,
  LENIN_P,
  lin,
  MiniKoba,
  MiniTrein,
  MONNIK,
  OFFICIER,
  Paleis,
  Papier,
  Pet,
  Plein,
  plS,
  RodeVlag,
  ROOD,
  S_VER,
  S_WEST,
  SEMI_P,
  Seminarie,
  Siberie,
  SOLDAAT,
  SOSO_P,
  Stad,
  STALIN_P,
  STALIN_ZP,
  Standbeeld,
  Stoel,
  Tafel,
  Trein,
  TROTSKI_P,
  Weerhut,
  Werkbank,
  WITTE,
  WitteVlag,
  Zaal,
} from './StalinKit';
import { Bed, Rook } from '../watals/Decor';

/**
 * Scènes voor "What if you were Joseph Stalin?" deel 1: teaser en hoofdstuk I-IV (zie werk/zinnen.json).
 */

const t30 = (f: number) => f / FPS;
const GOUD = '#D8A945';

/* ================= teaser ================= */

/** Knal: Stalin op de tribune voor het Kremlin, colonnes, rode vlaggen; camera schudt, grote titel. */
export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.01 : 0;
  return (
    <Plein tijd="avond" cam={[3.2 + schok, 2.2 + schok, 11, 2.6, 2.6, 9.4]} kijk={[0, 3.0, 0]} mausoleum={false} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="JOSEPH STALIN?" grootte={140} /> : undefined}>
      <Colonne z={-7} n={12} t={t} x0={-10} />
      <Blok p={[0, 0.6, 0]} s={[3.4, 1.2, 2.2]} c="#7A2A24" />
      <RodeVlag position={[-2.6, 0, -1]} t={t} h={5.4} />
      <RodeVlag position={[2.4, 0, -1.4]} t={t + 1} h={5.4} />
      <FiguurS {...STALIN_P} position={[0, 1.2, 0]} rotation={[0, 0.25, 0]} pose={{ armR: omhoog(), wenk: 0.35 }} />
    </Plein>
  );
};

/** Teaser: de vader torent boven het kind (geen klap in beeld). */
export const S_TeaserVader = () => (
  <Huisje avond cam={[1.4, 1.2, 4.4, 0.9, 1.3, 3.6]} kijk={[0, 1.2, 0]} over={<LangTeller label="Age" waarde="7" pil="Gori, Georgia" />}>
    <Werkbank position={[1.6, 0, -0.9]} rotation={[0, -0.3, 0]} />
    <FiguurS {...SOSO_P} position={[-0.5, 0, 0.6]} rotation={[0, 0.4, 0]} pose={{ wenk: -0.7, ...ARMEN_GEKRUIST }} />
    <FiguurS {...BESO_P} position={[0.8, 0, -0.4]} rotation={[0, -0.6, 0]} pose={{ wenk: 0.9, mond: 'open', armR: omhoog() }} />
    <BoosTeken p={[1.2, 2.5, -0.3]} s={0.5} />
  </Huisje>
);

/** Teaser: bankbiljetten vliegen, Koba wandelt weg met een tas. */
export const S_TeaserBank = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Stad cam={[1.8, 1.9, 7.6, 1.2, 1.9, 6.6]} kijk={[0, 1.6, -1]} over={<LangTeller label="Stolen" waarde="341,000" pil="roubles" />}>
      <Biljetten midden={[0.4, 0.6, -1.2]} t={t} n={34} />
      <FiguurS {...KOBA_P} position={[-0.8 + lin(f, 0, 120, 0, 1.2), 0, 0.4]} rotation={[0, 1.2, 0]} pose={{ wenk: 0.5, armL: { schouder: [-0.2, 0, 0.1], elleboog: [0, 0] } }} inHand={<Blok p={[0, -0.12, 0]} s={[0.4, 0.3, 0.16]} c="#3A2418" />} />
    </Stad>
  );
};

/** Teaser: de kaart kleurt rood, "1/6 of the world". */
export const S_TeaserKaart = () => (
  <KaartS van={{}} naar={SU_USSR} wissel={[6, 50]} cam={[S_VER, { ...S_VER, h: 20 }]} over={<LangTeller label="You rule" waarde="1/6" pil="of all the land on Earth" />} />
);

/** Teaser-vraag: de jongen op de heuvel boven Gori in de avondzon. */
export const S_GoriAvond = () => {
  const f = useCurrentFrame();
  return (
    <Gori tijd="avond" cam={[2.4, 1.6, 6.4, 1.6, 1.8, 5.4]} kijk={[0, 1.4, -2]}>
      <FiguurS {...SOSO_P} position={[0, 0, 0]} rotation={[0, Math.PI + 0.4 + Math.sin(f / 60) * 0.05, 0]} pose={{ hoofd: [-0.1, 0, 0] }} />
    </Gori>
  );
};

/** Titelkaart: het standbeeld voor het Kremlin in de avondzon. */
export const T5_Titel = () => (
  <Plein tijd="avond" cam={[4.4, 2.4, 13, 3.4, 2.8, 11.4]} kijk={[0, 3.6, 0]} mausoleum={false} over={<GroteTitel boven="THE LIFE OF" naam="JOSEPH STALIN" onder="from a shoemaker's son to the man of steel" grootte={134} />}>
    <Standbeeld position={[0, 0, 0]} />
    <pointLight position={[2, 5, 4]} intensity={12} distance={9} color="#FFD8A0" />
  </Plein>
);

/* ================= I · The shoemaker's son ================= */

export const S_KaartGori = () => (
  <KaartS van={{}} naar={SU_RIJK} wissel={[10, 60]} cam={[S_VER, kpS('gori', 8, 6)]} spelden={[['gori', ROOD]]} over={<JaarLabel jaar="1878" sub="Gori, Georgia" />} />
);

export const S_Naam = () => {
  const f = useCurrentFrame();
  return (
    <Gori cam={[2.2, 1.7, 7.0, 1.4, 1.6, 6.0]} kijk={[0, 1.2, -1]} over={<Pijllabel tekst="Ioseb Jughashvili" x={1180} y={360} naar={[1000, 560]} vanaf={14} />}>
      <FiguurS {...SOSO_P} position={[0, 0, 0]} rotation={[0, -0.3, 0]} pose={{ mond: f > 60 ? 'lach' : 'dicht', hoofd: [0, f > 60 ? -0.6 : 0, 0] }} />
      <FiguurS {...KEKE_P} position={[-2.4, 0, -1.6]} rotation={[0, 0.7, 0]} pose={{ armR: omhoog(), mond: 'open' }} />
      <Wolk p={[-2.4, 2.65, -1.4]} tekst="SOSO!" b={0.9} h={0.34} vanaf={50} staart={0} />
    </Gori>
  );
};

export const S_Werkplaats = ({ fase }: { fase: 'vader' | 'drinkt' }) => {
  const f = useCurrentFrame();
  if (fase === 'vader')
    return (
      <Huisje cam={[1.4, 1.8, 4.6, 0.9, 1.6, 3.8]} kijk={[0, 1.0, 0]} over={<><LangTeller label="Your father" waarde="Beso" pil="a shoemaker" /><Pijllabel tekst="and he drinks" x={1350} y={360} naar={[1190, 560]} vanaf={72} /></>}>
        <Werkbank position={[0.2, 0, 0.1]} />
        <FiguurS {...BESO_P} position={[0.2, 0, -0.7]} pose={{ hoofd: [0.3, 0, 0], armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.6] }, armL: { schouder: [-1.0, 0, 0.1], elleboog: [0, 0.6] } }} />
      </Huisje>
    );
  return (
    <Huisje avond cam={[1.8, 1.6, 5.2, 1.2, 1.5, 4.4]} kijk={[0, 1.1, 0]}>
      <Werkbank position={[1.8, 0, -1.0]} rotation={[0, -0.3, 0]} />
      <FiguurS {...BESO_P} position={[1.0, 0, -0.2]} rotation={[0, -0.7, 0]} pose={{ wenk: 1, mond: 'open', armR: wijs(1.0) }} />
      <BoosTeken p={[1.3, 2.5, -0.1]} s={0.5} />
      <FiguurS {...KEKE_P} position={[-0.6, 0, 0.1]} rotation={[0, 0.7, 0]} pose={{ wenk: -0.6, armL: { schouder: [-0.5, 0, 0.9], elleboog: [0, 0.4] } }} />
      <FiguurS {...SOSO_P} position={[-1.1, 0, -0.4]} rotation={[0, 0.6, 0]} pose={{ wenk: -0.8, traan: lin(f, 30, 90, 0, 1) }} />
    </Huisje>
  );
};

export const S_Keke = () => {
  const f = useCurrentFrame();
  return (
    <Huisje rijk cam={[1.8, 1.9, 5.4, 1.2, 1.8, 4.6]} kijk={[0, 1.2, 0]} over={<LangTeller label="Your mother" waarde="Keke" pil="cleans houses for money" />}>
      <FiguurS {...KEKE_P} position={[-0.4, 0, -0.2]} rotation={[0, 0.5, 0]} pose={{ hoofd: [0.4, 0, 0], armR: { schouder: [-0.8 + Math.sin(f / 5) * 0.3, 0, 0], elleboog: [0, 0] } }} inHand={<Blok p={[0, -0.6, 0.1]} s={[0.05, 1.2, 0.05]} c="#8A6A3A" />} />
      <Blok p={[0.1, 0.05, 0.6]} s={[0.3, 0.1, 0.2]} c="#8A6A3A" />
      <Blok p={[0.6, 0.1, 0.3]} s={[0.3, 0.2, 0.3]} c="#6E7076" metal={0.5} />
      <FiguurS {...SOSO_P} position={[1.5, 0, -0.5]} rotation={[0, -0.5, 0]} pose={{ armR: { schouder: [-1.1, 0, 0], elleboog: [0, -0.6] }, hoofd: [0.3, 0, 0] }} inHand={<Blok p={[0, -0.05, 0.1]} s={[0.24, 0.06, 0.32]} c="#3A2418" />} />
    </Huisje>
  );
};

export const S_Pokken = () => (
  <Huisje avond cam={[1.8, 2.3, 5.4, 1.2, 2.2, 4.6]} kijk={[0, 1.1, -0.2]} over={<><LangTeller label="Age" waarde="6" pil="smallpox" /><Pijllabel tekst="scars for life" x={1300} y={330} naar={[1010, 500]} vanaf={40} /></>}>
    <Bed position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
    <group position={[-0.9, 0.9, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <Figuur kleding={SOSO_P.kleding} scale={0.62} pose={{ ogen: 'dicht', wenk: -0.5 }} />
    </group>
    <FiguurS {...KEKE_P} position={[-0.6, 0, -1.0]} rotation={[0, 0.2, 0]} pose={{ wenk: -0.7, hoofd: [0.4, 0, 0] }} />
    <Kaars position={[1.4, 0.0, -1.2]} />
  </Huisje>
);

export const S_Koets = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const val = ease(f, 30, 44, 0, 1);
  return (
    <Gori cam={[2.8, 1.8, 8.4, 2.0, 1.7, 7.4]} kijk={[0, 1.0, -1]} over={<><LangTeller label="Age" waarde="12" pil="hit by a carriage" />{f > 70 && <Pijllabel tekst="left arm, never fully heals" x={1240} y={380} naar={[930, 600]} vanaf={74} />}</>}>
      <Koets position={[lin(f, 0, 70, -14, 12), 0, -2.4]} t={t} />
      <group position={[0, 0, 0.2]} rotation={[0, 0, val * 0.25]}>
        <FiguurS {...SOSO_P} rotation={[0, 0.3, 0]} pose={{ wenk: -0.6, mond: val > 0.5 ? 'open' : 'dicht', armL: { schouder: [-1.4, 0, 0.3], elleboog: [0, 1.4] } }} />
      </group>
    </Gori>
  );
};

export const S_Koor = () => {
  const f = useCurrentFrame();
  return (
    <Gori cam={[2.0, 1.6, 6.8, 1.4, 1.6, 5.8]} kijk={[0, 1.0, -1]} over={<LangTeller label="Talent" waarde="singing" pil="and a fantastic memory" />}>
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
        <FiguurS key={x} {...(i === 2 ? SOSO_P : { kleding: { ...SOSO_P.kleding, tuniek: ['#5A4A6A', '#6A5A44', '#6A5A44', '#4A5A6A', '#6A4A44'][i] }, scale: 0.6 })} position={[x, 0, -0.4 + Math.abs(x) * 0.2]} pose={{ mond: Math.floor(f / 8 + i) % 2 ? 'open' : 'dicht', hoofd: [-0.15, 0, 0] }} />
      ))}
      <Wolk p={[0.2, 2.0, -0.2]} tekst="♪ LA LA ♪" b={1.1} h={0.34} vanaf={20} staart={0} />
    </Gori>
  );
};

export const S_Droom = () => (
  <Huisje cam={[1.6, 1.9, 5.6, 1.1, 1.8, 4.8]} kijk={[0, 1.4, 0]}>
    <FiguurS {...KEKE_P} position={[-0.7, 0, 0]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(1.3), mond: 'lach' }} />
    <FiguurS {...SOSO_P} position={[0.6, 0, 0.3]} rotation={[0, -0.4, 0]} pose={{ hoofd: [0, -0.3, 0] }} />
    <Wolk p={[-2.1, 2.0, 0.1]} tekst={['YOU WILL BE', 'A PRIEST!']} b={1.3} h={0.5} vanaf={14} staart={1} />
  </Huisje>
);

/* ================= II · The priest who wasn't ================= */

export const S_Seminarie = () => (
  <Stad cam={[4, 2.4, 14, 2.6, 2.6, 12]} kijk={[0, 3.4, -6]} over={<><JaarLabel jaar="1894" sub="Tiflis seminary" /><LangTeller label="Age" waarde="15" /></>}>
    <Seminarie position={[0, 0, -4]} />
    <FiguurS {...SEMI_P} position={[0.6, 0, 0.6]} rotation={[0, Math.PI, 0]} />
    <FiguurS {...KEKE_P} position={[-0.4, 0, 1.0]} rotation={[0, Math.PI - 0.3, 0]} />
  </Stad>
);

export const S_Slaapzaal = ({ fase }: { fase: 'controle' | 'nacht' }) => {
  const f = useCurrentFrame();
  if (fase === 'controle')
    return (
      <Zaal cam={[1.8, 1.9, 5.4, 1.2, 1.8, 4.6]} kijk={[0, 1.1, -0.6]}>
        {[-2.2, 0, 2.2].map((x) => <Bed key={x} position={[x, 0, -1.6]} />)}
        <FiguurS kleding={MONNIK} baard position={[-0.4, -0.6, -0.2]} rotation={[0.6, 0.3, 0]} pose={{ armR: { schouder: [-1.4, 0, 0], elleboog: [0, 0] } }} />
        <FiguurS {...SEMI_P} position={[1.3, 0, 0.4]} rotation={[0, -0.6, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: -0.3 }} />
        <Zweet p={[1.6, 2.1, 0.5]} />
      </Zaal>
    );
  return (
    <Zaal donker cam={[1.6, 2.6, 5.4, 1.2, 2.5, 4.8]} kijk={[0, 1.5, 0]} over={<Pijllabel tekst="banned books" x={1300} y={380} naar={[1040, 640]} vanaf={30} />}>
      <Bed position={[0, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} />
      <FiguurS {...SEMI_P} position={[-0.3, 0.2, -0.3]} pose={{ hoofd: [0.4, 0, 0], armR: { schouder: [-1.1, 0, -0.2], elleboog: [0, -0.6] }, armL: { schouder: [-1.1, 0, 0.2], elleboog: [0, 0.6] } }} />
      <Kaars position={[0.6, 0.72, 0.1]} />
      {['DARWIN', 'HUGO', 'MARX'].map((s, i) => <Papier key={s} position={[0.2 + i * 0.36, 0.76 + (f > 20 + i * 12 ? 0 : -2), 0.5]} rotation={[-Math.PI / 2 + 0.3, 0, 0]} regels={[s]} b={0.32} h={0.42} fontPx={80} kleur={['#7A2A1E', '#2A3A5A', ROOD][i]} />)}
    </Zaal>
  );
};

export const S_Krant = () => (
  <Huisje cam={[1.0, 1.7, 3.6, 0.7, 1.7, 3.0]} kijk={[0, 1.4, 0]} over={<LangTeller label="Published" waarde="poems" pil="as 'Soselo', 1895" />}>
    <FiguurS {...SEMI_P} position={[0, 0, -0.2]} pose={{ mond: 'lach', armR: { schouder: [-1.3, 0, -0.2], elleboog: [0, -0.4] }, armL: { schouder: [-1.3, 0, 0.2], elleboog: [0, 0.4] } }} />
    <Papier position={[0, 1.35, 0.45]} regels={['IVERIA', '~ poem ~']} b={0.7} h={0.5} fontPx={60} />
  </Huisje>
);

export const S_Marx = () => {
  const f = useCurrentFrame();
  return (
    <Land tijd="avond" fabrieken={1} cam={[3, 1.8, 10, 2.2, 2.0, 8.8]} kijk={[0, 2.0, -3]} over={<Citaat tekst="Workers of the world, unite!" wie="Karl Marx, 1848" />}>
      {[-3, -1.8, -0.6, 0.6, 1.8, 3].map((x, i) => <FiguurS key={x} kleding={i % 2 ? ARBEIDER : ARBEIDER2} hoofdExtra={<Klep kleur="#3A3430" />} position={[x, 0, -1 - (i % 2) * 0.8]} rotation={[0, Math.PI + (x < 0 ? -0.3 : 0.3), 0]} pose={{ armR: f > 30 + i * 6 ? omhoog() : undefined }} />)}
    </Land>
  );
};

export const S_Idee = () => (
  <Zaal donker cam={[0.7, 1.9, 3.2, 0.5, 1.9, 2.6]} kijk={[0, 1.8, 0]}>
    <FiguurS {...SEMI_P} position={[0, 0, 0]} pose={{ mond: 'lach', wenk: 0.4 }} />
    <Kaars position={[0.5, 1.0, 0.5]} />
    <Wolk p={[0.85, 2.3, 0.2]} tekst="I LIKE IT." b={1.0} h={0.32} vanaf={12} staart={-1} />
  </Zaal>
);

export const S_Geheim = () => (
  <Stad tijd="nacht" cam={[1.8, 1.8, 6.8, 1.2, 1.8, 5.8]} kijk={[0, 1.4, -0.6]}>
    <FiguurS {...SEMI_P} position={[-0.6, 0, 0]} rotation={[0, 0.8, 0]} pose={{ armR: wijs(1.0), mond: 'open' }} />
    {[[0.6, -0.3], [1.2, 0.4], [0.9, -1.1]].map(([x, z], i) => <FiguurS key={i} kleding={i % 2 ? ARBEIDER : ARBEIDER2} hoofdExtra={<Klep />} position={[x, 0, z]} rotation={[0, -1.2, 0]} />)}
    <Kaars position={[0.2, 0, 0.6]} />
    <pointLight position={[0.2, 0.6, 0.6]} intensity={3} distance={4} color="#FFB060" />
  </Stad>
);

export const S_Buiten = () => {
  const f = useCurrentFrame();
  return (
    <Stad cam={[2.6, 2.0, 9.4, 1.8, 2.0, 8.2]} kijk={[0, 2.4, -3]} over={<><JaarLabel jaar="1899" /><Stempel tekst="EXPELLED" vanaf={34} top={280} /></>}>
      <Seminarie position={[0, 0, -4]} />
      <FiguurS {...SEMI_P} position={[0, 0, ease(f, 0, 40, -1.2, 0.8)]} rotation={[0, 0, 0]} pose={{ wenk: 0.6, armL: { schouder: [-0.1, 0, 0.1], elleboog: [0, 0] } }} inHand={<Blok p={[0, -0.15, 0]} s={[0.5, 0.36, 0.18]} c="#5A3B24" />} />
    </Stad>
  );
};

export const S_Weerstation = ({ grap = false }: { grap?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Gori cam={grap ? [1.2, 1.8, 4.2, 0.9, 1.8, 3.6] : [3, 2.0, 8.4, 2.2, 2.1, 7.4]} kijk={[0.4, 1.6, -0.4]} over={grap ? <Pijllabel tekst="the only normal job you'll ever have" x={960} y={300} naar={[900, 560]} vanaf={10} /> : <LangTeller label="Job" waarde="weatherman" pil="Tiflis observatory, 1899" />}>
      <Weerhut position={[1.2, 0, -1]} t={t30(f)} />
      <FiguurS {...SEMI_P} kleding={{ ...SEMI_P.kleding, tuniek: '#4A4440', benen: '#3A3430' }} position={[0, 0, 0]} rotation={[0, 0.4, 0]} pose={{ hoofd: [0.3, 0.3, 0], armR: { schouder: [-1.1, 0, -0.2], elleboog: [0, -0.6] }, mond: grap ? 'lach' : 'dicht' }} inHand={<Blok p={[0, -0.05, 0.1]} s={[0.2, 0.04, 0.28]} c="#EFE8D8" />} />
    </Gori>
  );
};

/* ================= III · Koba ================= */

export const S_Inval = () => {
  const f = useCurrentFrame();
  return (
    <Gori cam={[3.4, 2.2, 9.4, 2.6, 2.2, 8.4]} kijk={[0.4, 1.4, -1]} over={<LangTeller label="1901" waarde="police raid" pil="you go underground" />}>
      <Weerhut position={[1.2, 0, -1.6]} t={t30(f)} />
      {[0.4, 1.4, 2.4].map((x, i) => <FiguurS key={x} kleding={GENDARME} hoofdExtra={<Pet kleur="#2A3A5A" />} position={[x + lin(f, 0, 80, 3, 0), 0, 0.4]} rotation={[0, -Math.PI / 2, 0]} pose={{ wenk: 0.6, armR: i === 0 ? wijs(1.2) : undefined }} />)}
      <FiguurS {...SEMI_P} kleding={{ ...SEMI_P.kleding, tuniek: '#4A4440', benen: '#3A3430' }} position={[lin(f, 10, 90, -0.6, -6), 0, -2.6]} rotation={[0, -Math.PI / 2, 0]} pose={{ armL: wijs(0.6), armR: { schouder: [0.6, 0, 0], elleboog: [0, 0] } }} />
    </Gori>
  );
};

export const S_Koba = () => (
  <Huisje avond cam={[1.4, 1.9, 4.8, 1.0, 1.9, 4.0]} kijk={[0, 1.6, 0]} over={<LangTeller label="New name" waarde="Koba" pil="an outlaw hero from a novel" />}>
    <FiguurS {...KOBA_P} position={[0, 0, -0.2]} pose={{ wenk: 0.5, armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.5] } }} inHand={<Blok p={[0, -0.05, 0.1]} s={[0.24, 0.32, 0.06]} c="#5A2A1E" />} />
  </Huisje>
);

export const S_Baku = () => {
  const f = useCurrentFrame();
  return (
    <Land grond="#B8A47A" cam={[4, 2.4, 11, 3, 2.4, 9.6]} kijk={[0, 2.2, -3]} over={<JaarLabel jaar="Baku" sub="the oil fields" />}>
      {[-10, -5, 2, 7, 12].map((x, i) => <Boortoren key={x} position={[x, 0, -8 - (i % 2) * 4]} h={7 + (i % 3)} />)}
      <FiguurS {...KOBA_P} position={[0, 0.6, 0]} pose={{ armR: omhoog(), mond: 'open', wenk: 0.5 }} />
      <Blok p={[0, 0.3, 0]} s={[1.0, 0.6, 1.0]} c="#5A3E28" />
      {[-2.4, -1.4, 1.4, 2.4].map((x, i) => <FiguurS key={x} kleding={i % 2 ? ARBEIDER : ARBEIDER2} hoofdExtra={<Klep />} position={[x, 0, 1.4 + (i % 2) * 0.6]} rotation={[0, Math.PI + (x < 0 ? 0.4 : -0.4), 0]} pose={{ armR: f > 40 && i % 2 ? omhoog() : undefined }} />)}
      {Array.from({ length: 12 }, (_, i) => <Blok key={i} p={[Math.sin(i * 2.3) * 3, ((f / 30) * 0.6 + i * 0.5) % 4, 1 + Math.cos(i * 1.7) * 1.5]} s={[0.22, 0.01, 0.3]} r={[f / 10 + i, i, 0]} c="#F2EAD8" />)}
    </Land>
  );
};

export const S_Lenin = () => (
  <Zaal cam={[2.2, 2.0, 6.4, 1.5, 2.0, 5.4]} kijk={[0, 1.6, -0.8]} over={<Pijllabel tekst="Vladimir Lenin" x={760} y={300} naar={[880, 470]} vanaf={16} />}>
    <FiguurS {...LENIN_P} position={[-0.4, 0.4, -1.4]} rotation={[0, 0.3, 0]} pose={{ armR: wijs(1.6), mond: 'open', wenk: 0.4 }} />
    <Blok p={[-0.4, 0.2, -1.4]} s={[1.4, 0.4, 1.0]} c="#5A3E28" />
    <RodeVlag position={[-2.2, 0, -2.0]} h={3.6} />
    <FiguurS {...KOBA_P} position={[1.4, 0, 0.4]} rotation={[0, -0.9, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.3 }} />
    {[[-2.6, 0.8], [-1.6, 1.4]].map(([x, z], i) => <FiguurS key={i} kleding={BOLSJEWIEK} hoofdExtra={<Klep />} position={[x, 0, z]} rotation={[0, Math.PI - 0.2, 0]} />)}
  </Zaal>
);

export const S_Geld = () => {
  const f = useCurrentFrame();
  return (
    <Zaal donker cam={[1.2, 1.6, 4.2, 0.8, 1.5, 3.5]} kijk={[0, 1.0, 0]}>
      <Tafel position={[0, 0, 0]} b={2.0} d={0.9} />
      <group position={[0, 0.82, 0.1]}>
        <Blok p={[0, 0.12, 0]} s={[0.6, 0.24, 0.4]} c="#6E7076" metal={0.6} />
        <group position={[0, 0.24, -0.2]} rotation={[-ease(f, 10, 30, 0, 1.4), 0, 0]}><Blok p={[0, 0.02, 0.2]} s={[0.6, 0.04, 0.4]} c="#6E7076" metal={0.6} /></group>
      </group>
      <FiguurS {...LENIN_P} position={[-0.7, 0, -0.8]} rotation={[0, 0.3, 0]} pose={{ wenk: 0.5, hoofd: [0.3, 0, 0] }} />
      <FiguurS {...KOBA_P} position={[0.7, 0, -0.8]} rotation={[0, -0.3, 0]} pose={{ wenk: 0.6, hoofd: [0.3, 0, 0] }} />
      {f > 34 && <Wolk p={[0, 1.6, 0.4]} tekst="EMPTY" b={0.8} h={0.3} vanaf={36} staart={0} />}
    </Zaal>
  );
};

export const S_Overval = ({ fase }: { fase: 'koets' | 'knal' | 'koba' }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  if (fase === 'koets')
    return (
      <Stad cam={[4, 2.6, 11, 3, 2.4, 9.6]} kijk={[0, 1.6, -2]} over={<JaarLabel jaar="1907" sub="Erivan Square, Tiflis" />}>
        <Koets position={[lin(f, 0, 150, -10, 4), 0, -2]} t={t} />
        {[-6, -4, 3.6, 6].map((x, i) => <FiguurS key={x} kleding={i % 2 ? BURGER : BURGERES} haar={i % 2 ? 'kort' : 'lang'} position={[x, 0, 1.2 - (i % 2)]} rotation={[0, x < 0 ? 0.8 : -0.8, 0]} />)}
        {[-1.4, 1.4].map((x) => <FiguurS key={x} kleding={KOBA_P.kleding} hoofdExtra={<Klep />} position={[x, 0, 2]} rotation={[0, Math.PI, 0]} />)}
      </Stad>
    );
  if (fase === 'knal')
    return (
      <Stad cam={[2.4, 2.2, 8.6, 1.8, 2.2, 7.6]} kijk={[0, 1.6, -2]} over={<><TelTeller label="Stolen" van={0} tot={341000} a={12} b={80} pil="roubles" /><div style={{ position: 'absolute', inset: 0, background: '#FFF4D8', opacity: f < 8 ? 0.8 * (1 - f / 8) : 0 }} /></>}>
        <Koets position={[1, 0, -2]} t={0} loopt={false} />
        <Flits p={[0.6, 1.4, -1.0]} op={0} groot={2} />
        <Biljetten midden={[0.6, 0.4, -1.2]} t={t} n={40} breed={3} />
      </Stad>
    );
  return (
    <Stad cam={[1.2, 1.9, 5.0, 0.8, 1.9, 4.2]} kijk={[0, 1.7, -0.4]} over={<Voorbehoud tekst="his exact role is still debated" />}>
      <FiguurS {...KOBA_P} position={[0, 0, -0.4]} rotation={[0, 0.3, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.6, hoofd: [0, -0.4, 0] }} />
    </Stad>
  );
};

export const S_Arrest = () => {
  const f = useCurrentFrame();
  return (
    <Stad tijd="grijs" cam={[2.4, 2.0, 7.4, 1.6, 2.0, 6.4]} kijk={[0, 1.5, -0.6]} over={<LangTeller label="Arrested" waarde="again" pil="and again, and again" />}>
      <FiguurS {...KOBA_P} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.8 }} />
      {[-0.9, 0.9].map((x) => <FiguurS key={x} kleding={GENDARME} hoofdExtra={<Pet kleur="#2A3A5A" />} position={[x, 0, -0.3]} rotation={[0, x < 0 ? 0.6 : -0.6, 0]} pose={{ armR: x < 0 ? { schouder: [-0.9, 0, -0.6], elleboog: [0, 0] } : undefined, armL: x > 0 ? { schouder: [-0.9, 0, 0.6], elleboog: [0, 0] } : undefined }} />)}
      <Auto position={[lin(f, 0, 1, 4, 4), 0, -3]} />
    </Stad>
  );
};

export const S_KaartSiberie = ({ terug = false }: { terug?: boolean }) => (
  <KaartS van={SU_RIJK} cam={[S_VER, { ...S_VER, h: 20 }]} routes={[{ punten: terug ? [plS('solvychegodsk'), plS('moskou'), plS('baku')] : [plS('baku'), plS('moskou'), plS('solvychegodsk')] }]} kop={<MiniKoba />} spelden={[['solvychegodsk', '#5A6A8A']]} over={<LangTeller label="Exiled" waarde="Siberia" pil={terug ? 'and you escape again' : 'and you escape'} />} />
);

export const S_SneeuwVlucht = () => {
  const f = useCurrentFrame();
  return (
    <Siberie cam={[3.6, 2.2, 9.5, 2.6, 2.0, 8.4]} kijk={[0, 1.6, -1]}>
      <FiguurS {...KOBA_P} position={[lin(f, 0, 150, -1, 4), 0, 0]} rotation={[0, Math.PI / 2, 0]} pose={{ wenk: 0.6, armL: wijs(0.4), armR: { schouder: [0.4, 0, 0], elleboog: [0, 0] } }} />
      {Array.from({ length: 10 }, (_, i) => <Blok key={i} p={[-1 + i * 0.5, 0.02, (i % 2) * 0.3 - 0.15]} s={[0.18, 0.02, 0.26]} c="#C8D0D8" />)}
    </Siberie>
  );
};

export const S_NaamStalin = () => (
  <Huisje avond cam={[1.4, 2.4, 5.0, 1.0, 2.3, 4.3]} kijk={[0, 1.6, 0.2]} over={<LangTeller label="New name" waarde="Stalin" pil={'"man of steel", 1913'} />}>
    <Tafel position={[0, 0, 0.7]} b={1.8} d={0.9} />
    <Kaars position={[0.6, 0.82, 0.6]} />
    <Papier position={[-0.1, 0.84, 0.9]} rotation={[-Math.PI / 2 + 0.3, 0, 0]} regels={['STALIN']} b={1.0} h={0.36} fontPx={120} />
    <FiguurS {...KOBA_P} position={[0, 0, 0]} pose={{ armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.5] }, hoofd: [0.35, 0, 0], wenk: 0.4 }} inHand={<Blok p={[0, -0.1, 0.1]} s={[0.03, 0.03, 0.3]} c="#2A1A12" />} />
  </Huisje>
);

export const S_KaartKureika = () => (
  <KaartS van={SU_RIJK} cam={[S_VER, { lon: 68, lat: 61, h: 17, a: 10 }]} routes={[{ punten: [plS('petrograd'), plS('moskou'), [60, 58], plS('kureika')] }]} kop={<MiniKoba />} spelden={[['kureika', '#5A6A8A']]} over={<LangTeller label="1913" waarde="Kureika" pil="near the Arctic Circle" />} />
);

export const S_Vissen = () => {
  const f = useCurrentFrame();
  return (
    <Siberie rivier cam={[2.4, 1.8, 6.8, 1.6, 1.7, 5.8]} kijk={[0, 0.8, -1]} over={<LangTeller label="Exile" waarde="4 years" pil="1913 – 1917" />}>
      <Blok p={[0.8, 0.03, -1.4]} s={[0.6, 0.02, 0.6]} c="#1E2A3A" />
      <group position={[0, 0, -1]} rotation={[0, 0.5, 0]}>
        <FiguurS {...KOBA_P} kleding={{ ...KOBA_P.kleding, cape: '#5A4A3A' }} position={[0, -0.5, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.2], elleboog: [0, 0] }, hoofd: [0.3, 0, 0] }} inHand={<Blok p={[0, -0.6, 0.3]} s={[0.03, 1.2, 0.03]} r={[0.9, 0, 0]} c="#5A3B24" />} />
      </group>
      {f > 70 && <group position={[0.8, 0.2 + ease(f, 70, 90, 0, 0.6), -1.4]}><Blok p={[0, 0, 0]} s={[0.3, 0.12, 0.08]} c="#9AAAB4" metal={0.5} /></group>}
    </Siberie>
  );
};

export const S_Nieuws = () => {
  const f = useCurrentFrame();
  return (
    <Siberie sneeuwval={false} cam={[2.0, 1.8, 6.0, 1.3, 1.8, 5.0]} kijk={[0, 1.6, -0.8]} over={<JaarLabel jaar="1917" sub="the Tsar falls" />}>
      <FiguurS {...KOBA_P} position={[-0.5, 0, 0]} rotation={[0, 0.6, 0]} pose={{ mond: f > 50 ? 'open' : 'dicht', armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.4] }, armL: { schouder: [-1.2, 0, 0.2], elleboog: [0, 0.4] } }} />
      <Papier position={[-0.25, 1.45, 0.5]} rotation={[0, 0.6, 0]} regels={['THE TSAR', 'HAS FALLEN']} b={0.8} h={0.56} fontPx={64} />
      <FiguurS kleding={BOER} hoofdExtra={<Klep kleur="#5A4A3A" />} position={[1.2, 0, -0.6]} rotation={[0, -0.7, 0]} pose={{ armR: omhoog(), mond: 'open' }} />
    </Siberie>
  );
};

/* ================= IV · Revolution ================= */

export const S_Trein = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Siberie hut={false} sneeuwval={false} cam={[5, 2.4, 12, 3.6, 2.4, 10.6]} kijk={[0, 1.6, -2]} over={<JaarLabel jaar="March 1917" sub="back to Petrograd" />}>
      <group>
        {[-0.72, 0.72].map((dz) => <Blok key={dz} p={[0, 0.06, -2 + dz]} s={[120, 0.08, 0.08]} c="#6E6A66" metal={0.6} />)}
      </group>
      <Trein position={[lin(f, 0, 160, -14, 8), 0, -2]} t={t} wagons={3} />
    </Siberie>
  );
};

export const S_Oktober = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Stad tijd="nacht" cam={[5, 2.6, 13, 3.6, 2.8, 11]} kijk={[0, 3, -6]} over={<JaarLabel jaar="October 1917" sub="Petrograd" />}>
      <group position={[0, 0, -10]}><Paleis position={[0, 0, 0]} /></group>
      <Menigte n={14} z={-2} x0={-8} t={t} juich />
      <Menigte n={12} z={0} x0={-6.5} t={t + 1} juich />
      <RodeVlag position={[-3, 0, -1]} t={t} h={4.6} />
      <RodeVlag position={[3.4, 0, -1.6]} t={t + 1} h={4.6} />
      <pointLight position={[0, 4, 2]} intensity={10} distance={18} color="#FF9A50" />
      {f > 0 && <Flits p={[6, 6, -8]} op={40} />}
    </Stad>
  );
};

export const S_Minister = () => (
  <Kantoor cam={[2.4, 2.3, 6.6, 1.8, 2.2, 5.8]} kijk={[0, 1.5, -0.2]} over={<Pijllabel tekst="minister" x={1260} y={330} naar={[1090, 500]} vanaf={14} />}>
    <FiguurS {...LENIN_P} position={[-1.6, 0, 0.6]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.2), mond: 'open' }} />
    <FiguurS {...STALIN_ZP} position={[0.9, 0, 0.9]} rotation={[0, -0.6, 0]} pose={{ ...ARMEN_GEKRUIST }} />
  </Kantoor>
);

export const S_Trotski = ({ spot = false }: { spot?: boolean }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  if (!spot)
    return (
      <Land tijd="grijs" cam={[3, 3.4, 9.6, 2.2, 3.4, 8.4]} kijk={[0, 2.4, -1]} over={<LangTeller label="Leon Trotsky" waarde="the star" pil="builds the Red Army" />}>
        <Blok p={[0, 0.5, -1]} s={[2.0, 1.0, 1.4]} c="#5A3E28" />
        <FiguurS {...TROTSKI_P} position={[0, 1.0, -1]} pose={{ armR: omhoog(), mond: Math.floor(f / 7) % 2 ? 'open' : 'dicht', wenk: 0.5 }} />
        <RodeVlag position={[-1.6, 0, -1.6]} t={t} h={4.4} />
        {Array.from({ length: 12 }, (_, i) => <FiguurS key={i} kleding={SOLDAAT} hoofdExtra={<Helm />} position={[-3.3 + (i % 6) * 1.3, 0, 1.3 + Math.floor(i / 6) * 1.2]} rotation={[0, Math.PI, 0]} pose={{ armR: f > 50 && i % 3 === 0 ? omhoog() : undefined }} />)}
      </Land>
    );
  return (
    <Zaal cam={[2.4, 2.0, 6.6, 1.6, 2.0, 5.6]} kijk={[0, 1.6, -0.8]} over={<Pijllabel tekst='"a grey nobody"' x={1180} y={250} naar={[1270, 420]} vanaf={20} />}>
      <FiguurS {...TROTSKI_P} position={[-0.8, 0, -0.8]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.2), mond: 'lach' }} />
      {[[-1.8, -0.2], [-1.6, -1.6]].map(([x, z], i) => <FiguurS key={i} kleding={BOLSJEWIEK} hoofdExtra={<Klep />} position={[x, 0, z]} rotation={[0, 0.8, 0]} pose={{ mond: 'lach' }} />)}
      <FiguurS {...STALIN_ZP} position={[1.4, 0, 0.2]} rotation={[0, -0.8, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.9 }} />
      <BoosTeken p={[1.7, 2.4, 0.3]} s={0.45} />
    </Zaal>
  );
};

export const S_Burgeroorlog = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Land tijd="grijs" cam={[6, 3.0, 13, 4.4, 3.0, 11]} kijk={[0, 1.8, -3]} over={<LangTeller label="Civil war" waarde="Reds vs Whites" pil="1917 – 1922" />}>
      {Array.from({ length: 10 }, (_, i) => <FiguurS key={i} kleding={SOLDAAT} hoofdExtra={<Helm />} position={[-6 + (i % 5) * 1.1 + lin(f, 0, 160, 0, 0.8), 0, -2 - Math.floor(i / 5) * 1.2]} rotation={[0, Math.PI / 2, 0]} />)}
      {Array.from({ length: 10 }, (_, i) => <FiguurS key={`w${i}`} kleding={WITTE} hoofdExtra={<Pet kleur="#E8E2D2" />} position={[2 + (i % 5) * 1.1 - lin(f, 0, 160, 0, 0.8), 0, -2 - Math.floor(i / 5) * 1.2]} rotation={[0, -Math.PI / 2, 0]} />)}
      <RodeVlag position={[-7, 0, -3]} t={t} h={4.4} />
      <WitteVlag position={[8, 0, -3]} t={t} h={4.4} />
    </Land>
  );
};

export const S_KaartTsaritsyn = () => (
  <KaartS van={SU_RIJK} cam={[S_WEST, kpS('tsaritsyn', 9, 6)]} routes={[{ punten: [plS('moskou'), plS('tsaritsyn')] }]} kop={<MiniTrein />} spelden={[['tsaritsyn', ROOD], ['moskou', ROOD]]} over={<JaarLabel jaar="1918" sub="Tsaritsyn, on the Volga" />} />
);

export const S_Tsaritsyn = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Land tijd="grijs" grond="#8A8060" cam={[3, 2.0, 9, 2.2, 2.0, 7.8]} kijk={[0, 1.6, -1]} over={<Pijllabel tekst="he never forgets" x={1220} y={330} naar={[1010, 520]} vanaf={60} />}>
      <Graankar position={[lin(f, 0, 160, -8, 0), 0, -3]} t={t} loopt />
      <FiguurS {...STALIN_ZP} position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} pose={{ wenk: 0.8, armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.5] } }} inHand={<Blok p={[0, -0.05, 0.1]} s={[0.22, 0.04, 0.3]} c="#EFE8D8" />} />
      <FiguurS kleding={SOLDAAT} hoofdExtra={<Helm />} position={[-1.6, 0, -0.6]} rotation={[0, 0.6, 0]} />
    </Land>
  );
};

export const S_SecGen = ({ fase }: { fase: 'nieuw' | 'dossiers' | 'kaarten' | 'buigen' }) => {
  const f = useCurrentFrame();
  if (fase === 'nieuw')
    return (
      <Kantoor cam={[1.6, 2.2, 5.4, 1.1, 2.1, 4.6]} kijk={[0, 1.55, -0.2]} over={<JaarLabel jaar="1922" sub="General Secretary" />}>
        <FiguurS {...STALIN_ZP} position={[0, 0, -0.6]} pose={{ wenk: 0.2 }} />
        <Papier position={[0, 0.98, 0.65]} rotation={[-0.3, 0, 0]} regels={['GENERAL SECRETARY']} b={1.3} h={0.26} fontPx={44} kleur="#C9A646" />
      </Kantoor>
    );
  if (fase === 'dossiers')
    return (
      <Kantoor cam={[1.3, 2.1, 4.6, 0.9, 2.0, 3.9]} kijk={[0, 1.45, -0.2]}>
        <FiguurS {...STALIN_ZP} position={[0, 0, -0.6]} pose={{ hoofd: [0.3, 0, 0], mond: f > 60 ? 'open' : 'dicht', ogen: f > 60 && f < 90 ? 'dicht' : 'open' }} />
        <Dossiers position={[-0.5, 0.84, 0.1]} n={Math.round(lin(f, 0, 80, 4, 14))} />
        <Dossiers position={[0.5, 0.84, 0.2]} n={Math.round(lin(f, 10, 90, 3, 12))} />
        {f > 60 && <Wolk p={[0.75, 2.4, -0.4]} tekst="YAWN" b={0.7} h={0.28} vanaf={62} />}
      </Kantoor>
    );
  if (fase === 'kaarten')
    return (
      <Kantoor bureau={false} cam={[1.2, 1.8, 4.4, 0.8, 1.8, 3.6]} kijk={[0.4, 1.6, -1.2]} over={<LangTeller label="You decide" waarde="who gets" pil="which job, everywhere" />}>
        <Kaartenbord position={[0.6, 1.8, -1.75]} n={Math.round(lin(f, 0, 90, 4, 24))} />
        <FiguurS {...STALIN_ZP} position={[-0.6, 0, -0.6]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.3) }} />
      </Kantoor>
    );
  return (
    <Kantoor cam={[0.4, 3.8, 6.4, 0.2, 3.6, 5.8]} kijk={[0, 1.3, 0]}>
      <FiguurS {...STALIN_P} position={[0, 0, -0.6]} pose={{ wenk: 0.3 }} />
      {[-1.6, -0.6, 0.6, 1.6].map((x, i) => (
        <group key={x} position={[x, 0, 1.6]} rotation={[ease(f, 10 + i * 8, 30 + i * 8, 0, 0.5), Math.PI, 0]}>
          <FiguurS kleding={BOLSJEWIEK} hoofdExtra={<Klep />} pose={{}} />
        </group>
      ))}
    </Kantoor>
  );
};

export const S_LeninZiek = ({ fase }: { fase: 'beroerte' | 'dicteert' | 'brief' }) => {
  const f = useCurrentFrame();
  if (fase === 'beroerte')
    return (
      <Land cam={[2.2, 1.6, 6.4, 1.6, 1.6, 5.4]} kijk={[0, 1.0, -0.6]} over={<JaarLabel jaar="1922" sub="Lenin's stroke" />}>
        <Stoel position={[0, 0, -0.4]} kleur="#3A3A3A" />
        <FiguurS {...LENIN_P} kleding={{ ...LENIN_P.kleding, cape: '#6A6A5A' }} position={[0, -0.25, -0.4]} pose={{ wenk: -0.5, hoofd: [0.2, 0.2, 0.1], armR: { schouder: [-0.9, 0, -0.1], elleboog: [0, -0.6] }, armL: { schouder: [-0.9, 0, 0.1], elleboog: [0, 0.6] } }} />
      </Land>
    );
  return (
    <Huisje avond cam={fase === 'brief' ? [0.9, 1.6, 3.6, 0.6, 1.6, 3.0] : [1.6, 1.8, 4.8, 1.0, 1.7, 4.0]} kijk={[0, 1.0, 0]} over={fase === 'brief' ? <Citaat tekst="Stalin is too rude... remove him." wie="Lenin, January 1923 (shortened)" /> : <LangTeller label="Secret letter" waarde="Lenin's testament" pil="1922 – 1923" />}>
      <Bed position={[-0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <group position={[0.4, 0.82, 0]} rotation={[0, 0, Math.PI / 2 - 0.3]}>
        <Figuur kleding={LENIN_P.kleding} haar="kaal" hoofdExtra={LENIN_P.hoofdExtra} pose={{ mond: Math.floor(f / 8) % 2 ? 'open' : 'dicht', wenk: 0.4 }} />
      </group>
      <FiguurS kleding={BURGERES} haar="lang" position={[0.6, 0, -1.1]} rotation={[0, -0.5, 0]} pose={{ hoofd: [0.4, 0, 0], armR: { schouder: [-1.1, 0, -0.1], elleboog: [0, -0.6] } }} inHand={<Blok p={[0, -0.05, 0.1]} s={[0.22, 0.03, 0.3]} c="#EFE8D8" />} />
      <Kaars position={[0.4, 0.0, -1.2]} />
      {fase === 'brief' && <Papier position={[0.2, 1.1, 1.2]} rotation={[-0.2, 0, 0]} regels={['...remove', 'Stalin...']} b={0.7} h={0.5} fontPx={64} />}
    </Huisje>
  );
};

export const S_LeninDood = () => {
  const f = useCurrentFrame();
  return (
    <Plein tijd="winter" sneeuw cam={[5, 2.6, 13, 3.6, 2.6, 11.4]} kijk={[0, 2.6, -8]} over={<JaarLabel jaar="January 1924" sub="Lenin dies" />}>
      {Array.from({ length: 30 }, (_, i) => <FiguurS key={i} kleding={i % 3 ? BURGER : BURGERES} haar={i % 3 ? 'kort' : 'lang'} hoofdExtra={i % 3 ? <Klep kleur="#2A2622" /> : undefined} position={[-7 + (i % 10) * 1.5, 0, -6 + Math.floor(i / 10) * 1.6]} rotation={[0, Math.PI, 0]} pose={{ hoofd: [0.3, 0, 0], wenk: -0.6 }} />)}
      <RodeVlag position={[-8, 0, -5]} h={4} t={f / 30} />
    </Plein>
  );
};

export const S_Vergadering = ({ fase }: { fase: 'leest' | 'blijft' }) => {
  const f = useCurrentFrame();
  return (
    <Zaal loper cam={fase === 'leest' ? [2.6, 2.4, 7, 1.8, 2.3, 6] : [1.2, 1.8, 4.4, 0.8, 1.8, 3.6]} kijk={fase === 'leest' ? [0, 1.3, -0.8] : [0.6, 1.4, -0.6]}>
      <Tafel position={[0, 0, -0.8]} b={4.6} d={1.2} kleur="#4A2E1C" />
      <Blok p={[0, 0.83, -0.8]} s={[4.4, 0.02, 1.0]} c="#2E4A2E" />
      {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
        <FiguurS key={x} {...(i === 2 ? STALIN_P : { kleding: BOLSJEWIEK, haar: 'kort' as const, snor: i % 2 === 0, baard: i === 3 })} position={[x, 0, -1.7]} pose={{ wenk: i === 2 ? 0.3 : -0.2, hoofd: [0.15, i === 2 ? 0 : (i < 2 ? 0.4 : -0.4), 0], mond: i === 0 ? (Math.floor(f / 8) % 2 ? 'open' : 'dicht') : 'dicht' }} inHand={i === 0 ? <Blok p={[0, -0.05, 0.1]} s={[0.22, 0.03, 0.3]} c="#EFE8D8" /> : undefined} />
      ))}
      {fase === 'blijft' && <Wolk p={[1.0, 2.6, -1.5]} tekst="..." b={0.6} h={0.3} vanaf={30} staart={-1} />}
    </Zaal>
  );
};

