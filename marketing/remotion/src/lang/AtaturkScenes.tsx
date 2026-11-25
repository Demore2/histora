import { useCurrentFrame } from 'remotion';
import { Bed, Kanon, Menigte, Tent } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs, type V3 } from '../watals/Figuur';
import { GroteTitel, JaarLabel, LangTeller } from './LangHud';
import { Baby, BoosTeken, Pijllabel, Stempel, TelTeller, Voorbehoud, Wolk, Zweet } from './LeonidasKit';
import { Citaat } from './SaladinScenes';
import { Hernoem, Koren } from './StalinKit';
import { TR_1881, TR_1912, TR_1913, TR_1918, TR_1923 } from './KaarttafelTR';
import {
  ALI_P, Anatolie, ANZAC_P, BEDOEIEN_P, Bord, BRIT_P, BURGER_FEZ_P, BURGER2_FEZ_P, ease, FiguurA, Flits, FPS, GAL_P, Geweer, GRIEK_P, Haven, HOCA_P,
  Huisje, JOURNALIST_P, KADET_P, KAPITEIN_P, Kaars, KaartT, KIND_P, KIND2_P, Klok, kpT, Krijtbord, Kust, Lamp, LATIFE_P, LERAAR_P, lin, Loopgraaf,
  MAARSCHALK_P, MEISJE_P, MiniKemal, MiniSchip, Mausoleum, OFF_P, Oorlogsschip, Papier, plT, Rook, SOLDAAT_P, SOLDAAT2_P, Stoel, Stoomschip, Straat,
  Struiken, SULTAN_P, T_VER, Tafel, TurkseVlag, Wagen, Werkkamer, Woestijn, Zaal, Zakhorloge, ZUBEYDE_P, Sirene, Boek, Paard, ITALIAAN_P,
} from './AtaturkKit';

/**
 * Scènes voor "What if you were Mustafa Kemal Atatürk?" deel 1: teaser en hoofdstuk I-IV (zie werk/zinnen.json).
 */

const t30 = (f: number) => f / FPS;
const ROOD = '#D0262E';
const GRIEKS = '#3E6FA8';

/* ================= teaser ================= */

/** Knal: Mustafa Kemal te paard op een heuvel, het leger erachter, de vlag; camera schudt, grote titel. */
export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.01 : 0;
  return (
    <Anatolie tijd="avond" cam={[3.6 + schok, 1.8 + schok, 10, 2.8, 2.2, 8.6]} kijk={[0, 2.6, 0]} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="ATATÜRK?" grootte={170} /> : undefined}>
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.5, 0]} kleur="#6B4428" manen="#2A1E16" dek="#7A2A24" t={t} ruiter={<Figuur {...MAARSCHALK_P} pose={{ hoofd: [0, 0.1, 0], wenk: 0.4 }} />} />
      <TurkseVlag position={[-2.4, 0, -1.6]} t={t} h={5.6} />
      {Array.from({ length: 12 }, (_, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[-7 + i * 1.3, 0, -5 - (i % 3) * 0.8]} rotation={[0, 0.2, 0]} inHand={<Geweer />} />)}
    </Anatolie>
  );
};

/** Teaser: de lege stoel met vaders fez; moeder en kind. */
export const S_TeaserVader = () => {
  const f = useCurrentFrame();
  return (
    <Huisje avond cam={[2.2, 1.8, 6.0, 1.6, 1.7, 5.2]} kijk={[0, 1.1, -0.2]} over={<LangTeller label="Age" waarde="7" pil="Salonica, 1888" />}>
      <Stoel position={[1.0, 0, -0.6]} rotation={[0, -0.4, 0]} />
      <mesh position={[1.0, 0.62, -0.6]}>
        <cylinderGeometry args={[0.13, 0.15, 0.16, 12]} />
        <meshStandardMaterial color="#A8201E" />
      </mesh>
      <Kaars position={[0.2, 0.0, -1.2]} />
      <FiguurA {...ZUBEYDE_P} position={[-0.8, 0, -0.2]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.6, hoofd: [0.3, 0, 0], armL: { schouder: [-0.5, 0, 0.6], elleboog: [0, 0.4] } }} />
      <FiguurA {...KIND_P} position={[-0.2, 0, 0.3]} rotation={[0, 0.2, 0]} pose={{ wenk: -0.7, traan: lin(f, 20, 80, 0, 1) }} />
    </Huisje>
  );
};

/** Teaser: het zakhorloge met de deuk. */
export const S_TeaserHorloge = () => {
  const f = useCurrentFrame();
  return (
    <Kust cam={[0.4, 1.6, 2.2, 0.2, 1.55, 1.8]} kijk={[0, 1.5, 0]} schepen={2} over={<LangTeller label="Gallipoli" waarde="1915" pil="a piece of shrapnel" />}>
      <Flits p={[0.4, 1.5, 0.3]} op={8} />
      <Zakhorloge position={[0, 1.5, 0]} rotation={[0.1, -0.2 + Math.sin(f / 30) * 0.08, 0]} schaal={0.7} />
    </Kust>
  );
};

/** Teaser: Turkije kleurt rood op de kaart. */
export const S_TeaserKaart = () => (
  <KaartT van={TR_1918} naar={TR_1923} wissel={[10, 60]} cam={[T_VER, { ...T_VER, lon: 33, lat: 39.2, h: 16, a: 9 }]} over={<LangTeller label="A new country" waarde="1923" pil="and a new alphabet" />} />
);

/** Teaser: de snelweg staat stil om 9:05. */
export const S_TeaserStil = () => {
  const f = useCurrentFrame();
  return (
    <Anatolie cam={[7, 2.6, 10, 5.6, 2.4, 8.4]} kijk={[0, 1.2, -2]} grond="#9A8A64" over={<LangTeller label="Every 10 November" waarde="09:05" pil="the whole country stops" />}>
      <Blok p={[0, 0.02, -2]} s={[80, 0.04, 6]} c="#4A4A4E" />
      {[-8, -3, 2, 7].map((x, i) => <Blok key={x} p={[x, 0.05, -2]} s={[2.4, 0.02, 0.14]} c="#E8E4D8" />)}
      {[[-6, -3.4, '#B8BCC0'], [-1, -3.4, '#7A2A24'], [4, -3.4, '#2A3A5A'], [-3, -0.6, '#D8D2C4'], [3, -0.6, '#3A4A3A']].map(([x, z, k], i) => <Wagen key={i} position={[x as number, 0, z as number]} kleur={k as string} />)}
      {[[-6, -4.6], [-1, -4.6], [4, -4.6], [-3, 0.8], [3, 0.8]].map(([x, z], i) => <FiguurA key={i} {...(i % 2 ? BURGER2_FEZ_P : BURGER_FEZ_P)} hoofdExtra={undefined} position={[x + 1.2, 0, z]} rotation={[0, i % 2 ? -0.6 : 0.6, 0]} pose={{ hoofd: [0.25, 0, 0], ogen: f > 40 ? 'dicht' : 'open' }} />)}
      <Sirene position={[10, 0, -6]} />
    </Anatolie>
  );
};

/** Teaser-vraag: het jongetje op de kade van Saloniki in de avondzon. */
export const S_SalonikiAvond = () => {
  const f = useCurrentFrame();
  return (
    <Haven tijd="avond" stad="klein" cam={[2.4, 1.8, 6.4, 1.6, 1.8, 5.4]} kijk={[0, 1.2, -2]}>
      <Blok p={[0, 0.2, 2]} s={[30, 0.8, 6]} c="#9A9480" />
      <FiguurA {...KIND_P} position={[0, 0.6, 0.4]} rotation={[0, Math.PI + 0.3 + Math.sin(f / 60) * 0.05, 0]} />
      <Stoomschip position={[6, 0, -14]} t={t30(f)} schaal={0.9} />
    </Haven>
  );
};

/** Titelkaart: Anıtkabir in de avondzon. */
export const T5_Titel = () => (
  <Anatolie tijd="avond" cam={[8, 4, 34, 6, 4, 30]} kijk={[0, 6, 0]} over={<GroteTitel boven="THE LIFE OF" naam="ATATÜRK" onder="from a boy in Salonica to the father of a nation" grootte={160} />}>
    <Mausoleum position={[0, 0, -4]} />
  </Anatolie>
);

/* ================= I · Little Mustafa ================= */

export const S_KaartSaloniki = () => (
  <KaartT van={{}} naar={TR_1881} wissel={[10, 60]} cam={[T_VER, kpT('saloniki', 8, 6)]} spelden={[['saloniki', ROOD]]} over={<JaarLabel jaar="1881" sub="Salonica, Ottoman Empire" />} />
);

export const S_Thessaloniki = () => {
  const f = useCurrentFrame();
  return (
    <Haven stad="klein" cam={[8, 4, 16, 6, 3.6, 13]} kijk={[0, 2, -20]} over={<Hernoem oud="SALONICA" nieuw="THESSALONIKI, GREECE" />}>
      <Stoomschip position={[-6, 0, -12]} t={t30(f)} />
    </Haven>
  );
};

export const S_Verjaardag = () => (
  <Huisje rijk cam={[1.8, 2.0, 5.6, 1.2, 1.9, 4.8]} kijk={[0, 1.4, 0]} over={<Stempel tekst="BIRTHDAY: ?" vanaf={30} top={620} />}>
    <FiguurA {...ZUBEYDE_P} position={[0, 0, -0.2]} pose={{ hoofd: [0.4, 0, 0], mond: 'lach', armR: { schouder: [-1.2, 0, 0.4], elleboog: [0, -0.8] }, armL: { schouder: [-1.2, 0, -0.4], elleboog: [0, 0.8] } }} />
    <Baby position={[0, 1.15, 0.36]} scale={0.5} boos={0} schildje={false} mond="lach" />
  </Huisje>
);

export const S_Naam = () => {
  const f = useCurrentFrame();
  return (
    <Straat cam={[2.2, 1.7, 7.0, 1.4, 1.6, 6.0]} kijk={[0, 1.2, -1]} over={<Pijllabel tekst="Mustafa" x={1180} y={360} naar={[1000, 560]} vanaf={14} />}>
      <FiguurA {...KIND_P} position={[0, 0, 0]} rotation={[0, -0.3, 0]} pose={{ mond: f > 40 ? 'lach' : 'dicht' }} />
      <FiguurA {...KIND2_P} position={[-1.6, 0, -1.4]} rotation={[0, 0.7, 0]} pose={{ armR: omhoog() }} />
    </Straat>
  );
};

export const S_Vader = () => {
  const f = useCurrentFrame();
  const hout = f > 70;
  return (
    <Straat cam={[2.0, 1.8, 6.4, 1.4, 1.7, 5.4]} kijk={[0, 1.2, -0.6]} over={<><LangTeller label="Your father" waarde="Ali Riza" pil="customs officer" />{hout && <Pijllabel tekst="then: timber" x={1350} y={340} naar={[1150, 560]} vanaf={74} />}</>}>
      <Tafel position={[-0.6, 0, -0.4]} b={1.6} d={0.8} kleur="#5A3B24" />
      <Papier position={[-0.7, 0.83, -0.3]} rotation={[-Math.PI / 2, 0, 0]} regels={['CUSTOMS']} b={0.6} h={0.4} />
      <FiguurA {...ALI_P} position={[-0.6, 0, -1.1]} pose={{ hoofd: [0.2, 0, 0], armR: { schouder: [-1.0, 0, -0.1], elleboog: [0, -0.5] } }} />
      {Array.from({ length: hout ? 9 : 0 }, (_, i) => (
        <mesh key={i} position={[1.6 + (i % 3) * 0.05, 0.2 + Math.floor(i / 3) * 0.32, -0.2 + (i % 3) * 0.32]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 2.2, 8]} />
          <meshStandardMaterial color="#8A6A44" />
        </mesh>
      ))}
    </Straat>
  );
};

export const S_Moeder = () => (
  <Straat cam={[3, 2.2, 9, 2.2, 2, 7.6]} kijk={[0, 1.8, -4]} over={<><LangTeller label="Your mother" waarde="Zübeyde" pil="deeply religious" /><Pijllabel tekst="the old school" x={460} y={300} naar={[640, 480]} vanaf={40} /></>}>
    <group position={[-4.2, 0, -3.2]}>
      <Blok p={[0, 1.3, 0]} s={[3, 2.6, 2.4]} c="#E8DCC0" />
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[1.1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8E9AA0" flatShading />
      </mesh>
    </group>
    <FiguurA {...ZUBEYDE_P} position={[0, 0, 0]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.2) }} />
    <FiguurA {...KIND_P} position={[-0.7, 0, 0.5]} rotation={[0, 0.5, 0]} />
  </Straat>
);

export const S_ModerneSchool = () => (
  <Zaal cam={[1.8, 2.0, 6.4, 1.2, 1.9, 5.4]} kijk={[0, 1.4, -2]} over={<Pijllabel tekst="a modern school" x={1400} y={320} naar={[1180, 500]} vanaf={20} />}>
    <Krijtbord position={[0, 0, -3.4]} regels={['1 + 1 = 2', 'A B C']} />
    {[[-2, -1], [0, -1], [2, -1], [-2, 0.6], [0, 0.6], [2, 0.6]].map(([x, z], i) => (
      <group key={i}>
        <Tafel position={[x, 0, z]} b={1.2} d={0.6} kleur="#6B4A2E" />
        <Boek position={[x, 0.82, z]} />
      </group>
    ))}
    <FiguurA {...ALI_P} position={[-3, 0, -2]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.1), mond: 'lach' }} />
  </Zaal>
);

export const S_Compromis = () => {
  const f = useCurrentFrame();
  const x = lin(f, 10, 130, -3.6, 3.4);
  return (
    <Straat cam={[0, 2.0, 9.2, 0, 1.9, 8.4]} kijk={[0, 1.4, -2]} over={<LangTeller label="The deal" waarde="a few days" pil="old school, then the new one" />}>
      <Bord position={[-4.2, 0, -2.2]} tekst={['OLD SCHOOL']} b={2.6} h={0.5} paal={1.6} achter="#3A2E22" fontPx={56} />
      <Bord position={[4.2, 0, -2.2]} tekst={['NEW SCHOOL']} b={2.6} h={0.5} paal={1.6} achter="#2A3A5A" fontPx={56} />
      <FiguurA {...KIND_P} position={[x, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} pose={{ mond: 'lach', armL: { schouder: [Math.sin(f / 4) * 0.5, 0, 0] }, armR: { schouder: [-Math.sin(f / 4) * 0.5, 0, 0] } }} />
    </Straat>
  );
};

export const S_VaderDood = () => (
  <Huisje avond cam={[1.4, 1.5, 4.2, 1.0, 1.4, 3.6]} kijk={[0.4, 0.9, -0.4]}>
    <Stoel position={[0.6, 0, -0.6]} rotation={[0, -0.3, 0]} />
    <mesh position={[0.6, 0.62, -0.6]}>
      <cylinderGeometry args={[0.13, 0.15, 0.16, 12]} />
      <meshStandardMaterial color="#A8201E" />
    </mesh>
    <Kaars position={[1.4, 0, -1.2]} />
    <FiguurA {...KIND_P} position={[-0.6, 0, 0.2]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.8, hoofd: [0.3, 0, 0] }} />
  </Huisje>
);

/** Op de boerderij van de oom: Mustafa en zijn zusje jagen kraaien van het bonenveld. */
export const S_Kraaien = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Anatolie cam={[3, 1.8, 8, 2, 1.7, 6.6]} kijk={[0, 1.0, -2]} grond="#8A8A58" over={<Pijllabel tekst="crow patrol" x={1380} y={300} naar={[1120, 480]} vanaf={30} />}>
      <Koren z={-3} rijen={5} kleur="#6E8A3E" />
      <FiguurA {...KIND_BLOOT} position={[-0.8, 0, 0.4]} rotation={[0, 0.3, 0]} pose={{ mond: 'open', armR: { schouder: [-2.6 + Math.sin(t * 8) * 0.4, 0, -0.2] }, armL: { schouder: [-2.4 - Math.sin(t * 8) * 0.4, 0, 0.2] } }} />
      <FiguurA {...MEISJE_P} position={[0.8, 0, 0.2]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach', armR: omhoog() }} />
      {Array.from({ length: 7 }, (_, i) => {
        const k = lin(f, 10 + i * 4, 70 + i * 4, 0, 1);
        return (
          <group key={i} position={[-3 + i * 1 + k * (i - 3) * 2, 1.4 + k * 5 + Math.sin(t * 9 + i) * 0.1, -3 - k * 6]}>
            <Blok p={[0, 0, 0]} s={[0.24, 0.14, 0.12]} c="#141216" />
            <Blok p={[0, 0.04, 0]} s={[0.1, 0.03, 0.7 * (0.5 + Math.abs(Math.sin(t * 12 + i)))]} c="#1E1A20" />
          </group>
        );
      })}
    </Anatolie>
  );
};
const KIND_BLOOT = { ...KIND_P, hoofdExtra: undefined };

export const S_MoederZorg = () => (
  <Anatolie cam={[2.2, 1.7, 6.2, 1.6, 1.6, 5.2]} kijk={[0, 1.4, -1]} grond="#8A8A58">
    <Blok p={[0, 1.4, -2.2]} s={[5, 2.8, 2.6]} c="#C9B490" rough={1} />
    <Blok p={[0, 2.9, -2.0]} s={[5.4, 0.2, 3]} c="#7A5A3E" />
    <Blok p={[0.6, 0.9, -0.88]} s={[0.9, 1.8, 0.04]} c="#4A3020" />
    <FiguurA {...ZUBEYDE_P} position={[0.6, 0, -0.4]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.6, armL: { schouder: [-0.4, 0, 0.6], elleboog: [0, 0.5] } }} />
    <Zweet p={[1.0, 2.3, -0.3]} />
    <Wolk p={[-0.2, 2.75, -0.4]} tekst="No school?!" b={1.3} h={0.36} vanaf={24} staart={1} />
  </Anatolie>
);

export const S_Officieren = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat cam={[3, 1.9, 9, 2.2, 1.8, 7.6]} kijk={[0, 1.5, -1]}>
      {[0, 1, 2].map((i) => <FiguurA key={i} {...KAPITEIN_P} position={[-5 + lin(f, 0, 150, 0, 3.6) + i * 1.3, 0, -1.6 - (i % 2) * 0.5]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [Math.sin(t * 6 + i) * 0.4, 0, 0] } }} />)}
      <FiguurA {...KIND_P} position={[1.8, 0, 0.8]} rotation={[0, -0.9, 0]} pose={{ mond: 'open', hoofd: [-0.1, 0, 0] }} />
    </Straat>
  );
};

export const S_Weten = () => (
  <Straat cam={[1.2, 1.2, 4.2, 0.9, 1.2, 3.8]} kijk={[0, 1.1, 0]}>
    <FiguurA {...KIND_P} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach', wenk: 0.3, ...ARMEN_GEKRUIST }} />
    <Wolk p={[0.5, 1.6, 0.2]} tekst="An officer." b={1.0} h={0.3} vanaf={18} staart={-1} />
  </Straat>
);

/* ================= II · Kemal ================= */

export const S_Examen = () => (
  <Zaal cam={[2.2, 2.2, 6.6, 1.4, 2.0, 5.6]} kijk={[0, 1.2, -1]} over={<Pijllabel tekst="Mum doesn't know" x={1400} y={320} naar={[1060, 540]} vanaf={30} />}>
    {[[-2, -1.4], [0, -1.4], [2, -1.4], [-2, 0.2], [2, 0.2]].map(([x, z], i) => (
      <group key={i}>
        <Tafel position={[x, 0, z]} b={1.2} d={0.6} kleur="#6B4A2E" />
        <FiguurA {...KIND2_P} position={[x, 0, z - 0.6]} pose={{ hoofd: [0.4, 0, 0] }} />
      </group>
    ))}
    <Tafel position={[0, 0, 0.2]} b={1.2} d={0.6} kleur="#6B4A2E" />
    <Papier position={[0, 0.83, 0.25]} rotation={[-Math.PI / 2, 0, 0]} regels={['EXAM']} b={0.5} h={0.34} />
    <FiguurA {...KIND_P} position={[0, 0, -0.4]} pose={{ hoofd: [0.4, 0, 0], wenk: 0.4, armR: { schouder: [-0.9, 0, 0.1], elleboog: [0, -0.4] } }} />
  </Zaal>
);

export const S_Geslaagd = () => (
  <Huisje cam={[2.0, 2.0, 6.0, 1.4, 1.9, 5.2]} kijk={[0, 1.4, 0]} over={<Stempel tekst="PASSED" vanaf={16} top={620} kleur="#2E8A4A" />}>
    <FiguurA {...KADET_P} position={[0.6, 0, 0]} rotation={[0, -0.4, 0]} pose={{ mond: 'lach', ...ARMEN_GEKRUIST }} />
    <FiguurA {...ZUBEYDE_P} position={[-0.8, 0, -0.2]} rotation={[0, 0.5, 0]} pose={{ wenk: -0.3, armR: { schouder: [-1.1, 0, 0], elleboog: [0, -0.4] } }} inHand={<Blok p={[0, -0.1, 0.12]} s={[0.3, 0.02, 0.4]} c="#F2EAD8" />} />
  </Huisje>
);

export const S_Wiskunde = () => (
  <Zaal cam={[1.6, 1.9, 5.4, 1.0, 1.8, 4.6]} kijk={[0, 1.5, -2.6]} over={<Pijllabel tekst="top of the class" x={1380} y={300} naar={[1080, 520]} vanaf={30} />}>
    <Krijtbord position={[0, 0, -3.2]} regels={['x² + 2x = 15', 'x = 3']} />
    <FiguurA {...KADET_P} position={[0.9, 0, -2.6]} rotation={[0, -0.6, 0]} pose={{ armR: wijs(1.6), mond: 'lach' }} />
    <FiguurA {...LERAAR_P} position={[-1.4, 0, -2.0]} rotation={[0, 0.7, 0]} pose={{ mond: 'open', wenk: -0.2 }} />
  </Zaal>
);

export const S_Kemal = () => (
  <Zaal cam={[1.2, 1.7, 4.4, 0.8, 1.6, 3.8]} kijk={[0, 1.5, -2.2]} over={<><Voorbehoud tekst="according to the story" /><Pijllabel tekst="Kemal = perfection" x={1360} y={330} naar={[1090, 520]} vanaf={40} /></>}>
    <FiguurA {...LERAAR_P} position={[-0.7, 0, -2.2]} rotation={[0, 0.6, 0]} pose={{ armR: { schouder: [-1.3, 0, 0.2], elleboog: [0, -0.3] }, mond: 'lach' }} inHand={<Blok p={[0, -0.1, 0.12]} s={[0.36, 0.02, 0.26]} c="#F2EAD8" />} />
    <FiguurA {...KADET_P} position={[0.6, 0, -2.0]} rotation={[0, -0.6, 0]} pose={{ mond: 'lach', hoofd: [0.15, 0, 0] }} />
  </Zaal>
);

export const S_NaamKemal = () => (
  <Straat cam={[2.4, 2.6, 8.4, 1.8, 2.6, 7.4]} kijk={[0, 2.5, -1]} over={<Hernoem oud="MUSTAFA" nieuw="MUSTAFA KEMAL" />}>
    <FiguurA {...KADET_P} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
  </Straat>
);

export const S_Monastir = () => (
  <Huisje avond cam={[1.8, 1.9, 5.0, 1.2, 1.8, 4.4]} kijk={[0, 1.3, -0.4]} over={<LangTeller label="Monastir" waarde="French" pil="poetry, revolution" />}>
    <Tafel position={[0, 0, 0]} b={1.4} d={0.8} kleur="#5A3B24" />
    <Lamp position={[-0.5, 0.82, -0.1]} aan />
    <Boek position={[0.1, 0.82, 0.1]} open />
    <Papier position={[0.4, 1.4, -1.6]} regels={['LIBERTÉ', 'ÉGALITÉ']} b={0.8} h={0.5} fontPx={60} />
    <FiguurA {...KADET_P} position={[0, 0, -0.7]} pose={{ hoofd: [0.4, 0, 0], armR: { schouder: [-1.1, 0, 0.1], elleboog: [0, -0.4] }, armL: { schouder: [-1.1, 0, -0.1], elleboog: [0, 0.4] } }} />
  </Huisje>
);

export const S_KaartIstanbul = () => (
  <KaartT van={TR_1881} cam={[kpT('monastir', 9, 6), kpT('istanbul', 7, 5)]} spelden={[['monastir', ROOD], ['istanbul', ROOD]]} routes={[{ punten: [plT('saloniki'), plT('monastir'), plT('istanbul')] }]} kop={<MiniKemal kalpak={false} />} over={<JaarLabel jaar="1899" sub="War College, Istanbul" />} />
);

export const S_ZiekeMan = () => (
  <KaartT van={TR_1881} cam={[{ ...T_VER, h: 20 }, T_VER]} licht={['Turkey', 'Syria', 'Iraq', 'Libya', 'Albania', 'North Macedonia', 'Jordan', 'Lebanon', 'Israel', 'Palestine', 'Kosovo']} over={<Citaat tekst="the sick man of Europe" wie="what European papers called the empire" />} />
);

export const S_Spionnen = () => {
  const f = useCurrentFrame();
  return (
    <Zaal donker kleur="#7A5A48" cam={[2.2, 2.0, 6.4, 1.4, 1.9, 5.4]} kijk={[0, 1.4, -1]} over={<Stempel tekst="FORBIDDEN" vanaf={50} top={240} />}>
      <FiguurA {...SULTAN_P} position={[-1.6, 0, -2.6]} rotation={[0, 0.4, 0]} pose={{ wenk: 0.5 }} />
      {[[1.8, -2.8], [3.0, -1.6], [-3.2, -0.8]].map(([x, z], i) => (
        <FiguurA key={i} kleding={{ huid: '#D8A880', haar: '#2A1E16', tuniek: '#1E1E22', benen: '#1E1E22', schoenen: '#151210' }} position={[x, 0, z]} rotation={[0, x > 0 ? -0.8 : 0.8, 0]} pose={{ hoofd: [0, Math.sin(f / 20 + i) * 0.5, 0], armR: { schouder: [-1.6, 0, -0.2], elleboog: [0, -1.8] } }} />
      ))}
      <Boek position={[0.4, 0.02, 0.4]} />
    </Zaal>
  );
};

export const S_Krant = () => (
  <Huisje avond cam={[1.8, 1.9, 5.0, 1.2, 1.8, 4.4]} kijk={[0, 1.3, -0.4]} over={<Pijllabel tekst="secret student paper" x={1380} y={320} naar={[1060, 520]} vanaf={24} />}>
    <Tafel position={[0, 0, 0]} b={1.6} d={0.9} kleur="#5A3B24" />
    <Kaars position={[-0.5, 0.82, 0]} />
    <Papier position={[0.1, 0.83, 0.05]} rotation={[-Math.PI / 2, 0, 0]} regels={['THE TRUTH', '···· ···']} b={0.7} h={0.5} fontPx={60} />
    <FiguurA {...KADET_P} position={[-0.3, 0, -0.7]} pose={{ hoofd: [0.4, 0, 0], armR: { schouder: [-1.0, 0, 0.1], elleboog: [0, -0.5] } }} />
    <FiguurA {...KADET_P} oogKleur={undefined} kleding={{ ...KADET_P.kleding, haar: '#2A1E16' }} position={[0.7, 0, -0.5]} rotation={[0, -0.4, 0]} pose={{ hoofd: [0.3, 0, 0] }} />
  </Huisje>
);

export const S_Arrest = () => {
  const POLITIE = { kleding: { huid: '#D8A880', haar: '#2A1E16', tuniek: '#1E2430', benen: '#1E2430', schoenen: '#151210', riem: '#C9A646' }, snor: true, levend: true } as const;
  return (
    <Straat tijd="nacht" cam={[2.2, 1.8, 6.4, 1.6, 1.8, 5.4]} kijk={[0, 1.3, -0.6]} over={<><JaarLabel jaar="1905" sub="Captain Mustafa Kemal" /><Stempel tekst="ARRESTED" vanaf={30} top={620} /></>}>
      <FiguurA {...KAPITEIN_P} position={[0, 0, 0]} pose={{ wenk: 0.5, armR: { schouder: [0.3, 0, 0.3] }, armL: { schouder: [0.3, 0, -0.3] } }} />
      <FiguurA {...POLITIE} position={[-1.0, 0, -0.2]} rotation={[0, 0.8, 0]} hoofdExtra={<FezRood />} pose={{ armR: { schouder: [-1.2, 0, 0.3], elleboog: [0, -0.3] } }} />
      <FiguurA {...POLITIE} position={[1.0, 0, -0.3]} rotation={[0, -0.8, 0]} hoofdExtra={<FezRood />} pose={{ armL: { schouder: [-1.2, 0, -0.3], elleboog: [0, 0.3] } }} />
    </Straat>
  );
};
const FezRood = () => (
  <mesh position={[0, 0.86, 0]}>
    <cylinderGeometry args={[0.25, 0.3, 0.32, 14]} />
    <meshStandardMaterial color="#A8201E" />
  </mesh>
);

export const S_KaartDamascus = () => (
  <KaartT van={TR_1881} cam={[kpT('istanbul', 12, 8), kpT('damascus', 9, 6)]} spelden={[['damascus', ROOD]]} routes={[{ punten: [plT('istanbul'), [32.8, 39.9], plT('damascus')] }]} kop={<MiniKemal kalpak={false} />} over={<JaarLabel jaar="1905" sub="sent far away, to Damascus" />} />
);

export const S_Vatan = () => (
  <Huisje avond cam={[2.2, 2.6, 5.4, 1.6, 2.4, 4.8]} kijk={[0, 1.2, -0.3]} over={<Pijllabel tekst="Homeland and Freedom" x={1360} y={300} naar={[1000, 520]} vanaf={24} />}>
    <Tafel position={[0, 0, 0]} b={1.6} d={1.0} kleur="#5A3B24" />
    <Kaars position={[0, 0.82, 0]} />
    <FiguurA {...KAPITEIN_P} position={[0, 0, -0.8]} pose={{ armR: wijs(0.9), mond: 'open', wenk: 0.4 }} />
    {[[-1.1, -0.2, 1.2], [1.1, -0.2, -1.2], [-0.6, 0.8, 2.6]].map(([x, z, r], i) => <FiguurA key={i} {...KAPITEIN_P} oogKleur={undefined} kleding={{ ...KAPITEIN_P.kleding, haar: '#2A1E16' }} position={[x, 0, z]} rotation={[0, r, 0]} pose={{ hoofd: [0.2, 0, 0] }} />)}
  </Huisje>
);

/* ================= III · The young officer ================= */

export const S_Grondwet = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat cam={[3, 2.2, 9.4, 2.2, 2.0, 8.0]} kijk={[0, 1.8, -2]} over={<JaarLabel jaar="1908" sub="the constitution is back" />}>
      <Menigte n={14} z={-2.4} x0={-7} t={t} juich />
      <Bord position={[0, 0, -3.6]} tekst={['CONSTITUTION!']} b={4.0} h={0.7} paal={2.6} achter="#A8201E" fontPx={60} />
      <TurkseVlag position={[-4, 0, -3]} t={t} />
      <TurkseVlag position={[4, 0, -3.4]} t={t + 1} />
    </Straat>
  );
};

export const S_JongeTurken = () => (
  <Zaal cam={[2.4, 2.4, 7.4, 1.6, 2.3, 6.4]} kijk={[0, 1.7, -1]} over={<Pijllabel tekst="the Young Turks" x={560} y={300} naar={[760, 520]} vanaf={20} />}>
    {[[-2.2, -1.2], [-1.2, -1.6], [-0.2, -1.2]].map(([x, z], i) => <FiguurA key={i} {...KAPITEIN_P} oogKleur={undefined} kleding={{ ...KAPITEIN_P.kleding, haar: '#2A1E16' }} position={[x, 0, z]} rotation={[0, -0.4 + i * 0.3, 0]} pose={{ mond: i === 1 ? 'lach' : 'dicht' }} />)}
    <FiguurA {...KAPITEIN_P} position={[2.2, 0, -0.4]} rotation={[0, -0.9, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.4 }} />
    <Wolk p={[2.2, 2.6, -0.3]} tekst="Hmm." b={0.7} h={0.3} vanaf={40} staart={0} />
  </Zaal>
);

export const S_KaartLibie = () => (
  <KaartT van={TR_1881} naar={TR_1912} wissel={[30, 80]} cam={[T_VER, kpT('tobruk', 12, 8)]} spelden={[['tobruk', ROOD]]} routes={[{ punten: [plT('rome'), [18, 35], [13.2, 32.9]], kleur: '#5E8A5A' }]} over={<JaarLabel jaar="1911" sub="Italy invades Libya" />} />
);

export const S_Journalist = () => {
  const f = useCurrentFrame();
  return (
    <Woestijn cam={[2.0, 1.8, 6.0, 1.4, 1.7, 5.0]} kijk={[0, 1.4, -1]} over={<Pijllabel tekst="'a journalist'" x={1380} y={300} naar={[1080, 520]} vanaf={20} />}>
      <FiguurA {...JOURNALIST_P} position={[-1 + lin(f, 0, 150, 0, 1.4), 0, 0]} rotation={[0, 1.0, 0]} pose={{ armR: { schouder: [-1.0, 0, 0.1], elleboog: [0, -0.6] }, hoofd: [0, -0.5, 0], wenk: -0.2 }} inHand={<Blok p={[0, -0.1, 0.1]} s={[0.24, 0.32, 0.04]} c="#E8E0CC" />} />
    </Woestijn>
  );
};

export const S_Tobruk = () => {
  const f = useCurrentFrame();
  return (
    <Woestijn cam={[4, 2.2, 9, 3, 2.0, 7.6]} kijk={[0, 1.4, -1]} over={<JaarLabel jaar="1911" sub="near Tobruk" />}>
      <Tent position={[-4, 0, -4]} kleur="#E2D2B0" />
      <Tent position={[3, 0, -5]} kleur="#D8C49A" />
      <FiguurA {...GAL_P} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ armR: wijs(1.1), mond: 'open' }} />
      {[[-1.6, -1.2, 0.5], [1.6, -1.4, -0.5], [-0.6, -2.2, 0.2], [0.8, -2.4, -0.2]].map(([x, z, r], i) => <FiguurA key={i} {...BEDOEIEN_P} position={[x, 0, z]} rotation={[0, r, 0]} pose={{ hoofd: [0, Math.sin(f / 30 + i) * 0.2, 0] }} inHand={<Geweer />} />)}
    </Woestijn>
  );
};

export const S_Telegram = () => (
  <Woestijn tijd="avond" cam={[2.0, 1.9, 5.6, 1.4, 1.8, 4.8]} kijk={[0, 1.5, -0.4]}>
    <Tent position={[-1.8, 0, -3]} kleur="#E2D2B0" />
    <FiguurA {...GAL_P} position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.4, hoofd: [0.3, 0, 0], armR: { schouder: [-1.2, 0, 0.1], elleboog: [0, -0.4] }, armL: { schouder: [-1.2, 0, -0.1], elleboog: [0, 0.4] } }} inHand={<Blok p={[0, -0.1, 0.12]} s={[0.32, 0.02, 0.24]} c="#F2EAD8" />} />
    <Wolk p={[0.3, 2.55, 0.1]} tekst="TELEGRAM" b={1.0} h={0.3} vanaf={10} staart={0} />
  </Woestijn>
);

export const S_KaartBalkan = () => (
  <KaartT van={TR_1912} naar={TR_1913} wissel={[20, 70]} cam={[{ lon: 23, lat: 41, h: 12, a: 7 }, { lon: 23.5, lat: 41.3, h: 9, a: 6 }]} spelden={[['saloniki', GRIEKS]]} over={<JaarLabel jaar="1912" sub="the Balkan Wars" />} />
);

export const S_SalonikiVal = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const daal = lin(f, 20, 100, 0, 1);
  return (
    <Straat tijd="grijs" cam={[2.4, 2.0, 8, 1.8, 2.0, 7]} kijk={[0, 2, -2]} over={<Pijllabel tekst="your hometown" x={560} y={300} naar={[800, 480]} vanaf={30} />}>
      <group position={[-1.8, -daal * 2.6, -2]}><TurkseVlag position={[0, 0, 0]} t={t} h={4.2} /></group>
      <Blok p={[-1.8, 2.1, -2]} s={[0.1, 4.2, 0.1]} c="#4A3A2C" />
      <group position={[1.8, 0, -2.4]}>
        <Blok p={[0, 2.1, 0]} s={[0.08, 4.2, 0.08]} c="#4A3A2C" />
        <group position={[0.8, 3.6 - (1 - daal) * 2.4, 0]}>
          {[0, 1, 2, 3, 4].map((i) => <Blok key={i} p={[0, 0.4 - i * 0.2, 0]} s={[1.5, 0.2, 0.03]} c={i % 2 ? '#F2F2EE' : GRIEKS} />)}
        </group>
      </group>
      {[-1, 0.4, 1.8].map((x, i) => <FiguurA key={i} {...GRIEK_P} position={[x + 2, 0, 0.2]} rotation={[0, -0.6, 0]} inHand={<Geweer />} />)}
    </Straat>
  );
};

export const S_Vluchten = () => {
  const f = useCurrentFrame();
  return (
    <Haven tijd="grijs" stad="klein" cam={[2.6, 1.8, 7, 1.8, 1.8, 6]} kijk={[0, 1.2, -2]} over={<Pijllabel tekst="refugees" x={1380} y={320} naar={[1080, 520]} vanaf={24} />}>
      <Blok p={[0, 0.2, 2]} s={[30, 0.8, 6]} c="#9A9480" />
      <Stoomschip position={[3, 0, -4]} t={t30(f)} />
      <FiguurA {...ZUBEYDE_P} position={[-1 + lin(f, 0, 150, 0, 1.2), 0.6, 0.6]} rotation={[0, 1.2, 0]} pose={{ wenk: -0.6, armR: { schouder: [-0.4, 0, 0], elleboog: [0, 0] } }} inHand={<Blok p={[0, -0.2, 0]} s={[0.5, 0.4, 0.4]} c="#8A6A4A" />} />
      <FiguurA {...MEISJE_P} scale={0.8} position={[-2 + lin(f, 0, 150, 0, 1.2), 0.6, 1.0]} rotation={[0, 1.2, 0]} pose={{ wenk: -0.6 }} />
    </Haven>
  );
};

export const S_Bal = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const DAME = { kleding: { huid: '#EAC7A2', haar: '#6B4A30', tuniek: '#7A3A5A', rok: '#7A3A5A', schoenen: '#2A1E16' }, haar: 'lang' as const, levend: true } as const;
  const DAME2 = { ...DAME, kleding: { ...DAME.kleding, tuniek: '#3A5A7A', rok: '#3A5A7A', haar: '#2A1E16' } } as const;
  return (
    <Zaal kleur="#E8D8B8" vloer="#7A5A3A" cam={[3.4, 2.6, 8.6, 2.4, 2.4, 7.6]} kijk={[0, 1.4, -1]} over={<LangTeller label="Sofia, 1913" waarde="balls" pil="and dancing lessons" />}>
      {[0, 1, 2].map((i) => <pointLight key={i} position={[-3 + i * 3, 4.5, -1]} intensity={4} distance={8} color="#FFE2B0" />)}
      <group position={[0, 0, 0]} rotation={[0, t * 1.2, 0]}>
        <FiguurA {...KAPITEIN_P} kleding={{ ...KAPITEIN_P.kleding, tuniek: '#1E2A44', riem: '#C9A646' }} position={[-0.35, 0, 0]} rotation={[0, Math.PI / 2, 0]} pose={{ mond: 'lach', armR: { schouder: [-1.0, 0, -0.4], elleboog: [0, -0.8] } }} />
        <FiguurA {...DAME} position={[0.35, 0, 0]} rotation={[0, -Math.PI / 2, 0]} pose={{ mond: 'lach', armL: { schouder: [-1.0, 0, 0.4], elleboog: [0, 0.8] } }} />
      </group>
      <group position={[-3, 0, -2]} rotation={[0, t * 1.1 + 1, 0]}>
        <FiguurA {...BRIT_P} hoofdExtra={undefined} position={[-0.35, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <FiguurA {...DAME2} position={[0.35, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </group>
    </Zaal>
  );
};

export const S_Verbond = () => {
  const DUITSER = { kleding: { huid: '#E8C0A0', haar: '#8A6A40', tuniek: '#6A6E66', benen: '#5A5E58', schoenen: '#151210', laarzen: '#151210', riem: '#2A2A2A' }, snor: true, levend: true } as const;
  return (
    <Werkkamer cam={[2.4, 2.3, 6.6, 1.6, 2.2, 5.8]} kijk={[0, 1.5, 0.4]} over={<JaarLabel jaar="1914" sub="the empire joins Germany's side" />}>
      <Papier position={[0, 0.84, 0.25]} rotation={[-Math.PI / 2, 0, 0]} regels={['ALLIANCE']} b={0.6} h={0.4} />
      <FiguurA {...KAPITEIN_P} kleding={{ ...KAPITEIN_P.kleding, tuniek: '#5E6448', haar: '#2A1E16' }} oogKleur={undefined} position={[-0.6, 0, 0.9]} rotation={[0, 0.9, 0]} pose={{ armR: { schouder: [-1.2, 0, 0.2], elleboog: [0, -0.4] }, mond: 'lach' }} />
      <FiguurA {...DUITSER} position={[0.6, 0, 0.9]} rotation={[0, -0.9, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, 0.4] }, mond: 'lach' }} />
    </Werkkamer>
  );
};

export const S_Fout = () => (
  <Werkkamer bureau={false} cam={[1.6, 1.9, 5.0, 1.1, 1.9, 4.4]} kijk={[-1.0, 1.5, -1.2]}>
    <FiguurA {...KAPITEIN_P} position={[-1.2, 0, -0.9]} rotation={[0, 0.4, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
    <BoosTeken p={[-0.8, 2.4, -0.8]} s={0.4} />
    <Wolk p={[-1.4, 2.55, -0.6]} tekst="A terrible mistake." b={1.6} h={0.34} vanaf={20} staart={1} />
  </Werkkamer>
);

/* ================= IV · Gallipoli ================= */

export const S_KaartDardanellen = () => (
  <KaartT van={TR_1913} cam={[T_VER, kpT('gallipoli', 9, 6)]} spelden={[['gallipoli', ROOD], ['istanbul', ROOD]]} routes={[{ punten: [[24.5, 38.5], [25.9, 39.9], plT('gallipoli'), [27.5, 40.6], plT('istanbul')], kleur: '#6A7A8E' }]} kop={<MiniSchip />} over={<JaarLabel jaar="1915" sub="Britain and France aim for Istanbul" />} />
);

export const S_Zeeslag = () => {
  const f = useCurrentFrame();
  return (
    <Kust cam={[6, 4, 14, 4.6, 3.6, 12]} kijk={[0, -2, -40]} schepen={5} over={<JaarLabel jaar="18 March 1915" sub="the Dardanelles" />}>
      {[0, 1, 2, 3].map((i) => <Flits key={i} p={[-24 + i * 16, -3, -58 - (i % 2) * 18]} op={10 + i * 18} groot={2} />)}
      {[0, 1].map((i) => <Flits key={`k${i}`} p={[-6 + i * 12, -1, -16]} op={30 + i * 30} groot={1.6} />)}
    </Kust>
  );
};

export const S_Landing = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Kust cam={[3, 2.0, 8, 2.2, 1.8, 6.8]} kijk={[0, 0.2, -6]} schepen={3} over={<JaarLabel jaar="25 April 1915" sub="British, French, Australians, New Zealanders" />}>
      {Array.from({ length: 6 }, (_, i) => <FiguurA key={i} {...ANZAC_P} position={[-4 + i * 1.6, 0, -5.6 + lin(f, 0, 150, 0, 2.4) + (i % 2) * 0.4]} rotation={[0, 0, 0]} pose={{ armR: { schouder: [-2.2 + Math.sin(t * 4 + i) * 0.4, 0, 0] } }} inHand={<Geweer />} />)}
      <Struiken n={30} z0={-4} diep={4} breed={30} />
    </Kust>
  );
};

export const S_Verrekijker = () => (
  <Kust cam={[1.8, 2.0, 5.4, 1.2, 1.9, 4.6]} kijk={[0, 1.6, -1]} schepen={4} over={<LangTeller label="Lieutenant colonel" waarde="Kemal" pil="a division in reserve" />}>
    <FiguurA {...GAL_P} position={[0, 0, 0]} rotation={[0, Math.PI - 0.2, 0]} pose={{ armR: { schouder: [-1.7, 0, -0.3], elleboog: [0, -1.6] }, armL: { schouder: [-1.7, 0, 0.3], elleboog: [0, 1.6] } }} />
  </Kust>
);

export const S_Terug = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Kust cam={[0.6, 1.8, 7, 0.4, 1.7, 6]} kijk={[0, 1.3, -2]} schepen={3} over={<Pijllabel tekst="out of ammunition" x={1360} y={300} naar={[1080, 520]} vanaf={24} />}>
      {[-1.6, -0.4, 0.9, 2.0].map((x, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[x, Math.abs(Math.sin(t * 9 + i)) * 0.08, -4 + lin(f, 0, 150, 0, 3)]} pose={{ mond: 'open', wenk: -0.5, armL: { schouder: [Math.sin(t * 9 + i) * 0.6, 0, 0] }, armR: { schouder: [-Math.sin(t * 9 + i) * 0.6, 0, 0] } }} />)}
      <FiguurA {...GAL_P} position={[2.2, 0, 1.0]} rotation={[0, Math.PI + 0.5, 0]} pose={{ armR: { schouder: [-1.5, 0, -0.6], elleboog: [0, 0] }, armL: { schouder: [-1.5, 0, 0.6], elleboog: [0, 0] } }} />
    </Kust>
  );
};

export const S_Liggen = () => (
  <Kust cam={[3, 2.6, 7.4, 2.2, 2.4, 6.4]} kijk={[0, 0.6, -2]} schepen={3} over={<Pijllabel tekst="fix bayonets, lie down" x={1360} y={280} naar={[1000, 560]} vanaf={20} />}>
    {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
      <group key={i} position={[x, 0.22, -1.6]} rotation={[Math.PI / 2, 0, 0]}>
        <Figuur kleding={i % 2 ? SOLDAAT_P.kleding : SOLDAAT2_P.kleding} hoofdExtra={i % 2 ? SOLDAAT_P.hoofdExtra : SOLDAAT2_P.hoofdExtra} pose={{ armR: { schouder: [-2.8, 0, 0] }, armL: { schouder: [-2.8, 0, 0] }, hoofd: [-0.9, 0, 0] }} inHand={<Geweer />} />
      </group>
    ))}
    <FiguurA {...GAL_P} position={[-3.6, 0, -0.6]} rotation={[0, 0.4, 0]} pose={{ armR: wijs(1.0) }} />
  </Kust>
);

export const S_Bevel = () => (
  <Kust cam={[2.4, 1.9, 7.2, 1.6, 1.8, 6.2]} kijk={[0, 1.4, -1.6]} schepen={2} over={<LangTeller label="Your order to" waarde="57th" pil="Infantry Regiment" />}>
    <FiguurA {...GAL_P} position={[0, 0, 0.8]} rotation={[0, Math.PI, 0]} pose={{ armR: wijs(1.0), mond: 'open', wenk: 0.5 }} />
    {Array.from({ length: 10 }, (_, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[-4.5 + i, 0, -2 - (i % 2) * 0.6]} pose={{ hoofd: [0.05, 0, 0] }} inHand={<Geweer />} />)}
  </Kust>
);

export const S_Sterven = () => (
  <Kust tijd="avond" cam={[0.9, 1.9, 3.6, 0.6, 1.9, 3.1]} kijk={[0, 1.95, 0]} schepen={2} over={<Citaat tekst="I don't order you to attack. I order you to die." wie="Mustafa Kemal, 25 April 1915" />}>
    <FiguurA {...GAL_P} position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ wenk: 0.6 }} />
  </Kust>
);

export const S_Plaats = () => {
  const f = useCurrentFrame();
  return (
    <Kust tijd="avond" cam={[5, 2.6, 11, 3.6, 2.4, 9.4]} kijk={[0, 1.2, -3]} schepen={3} over={<Citaat tekst="In the time it takes us to die, others can take our place." wie="the rest of the order" />}>
      {Array.from({ length: 12 }, (_, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[-6 + i * 1.1, 0, 4 - lin(f, 0, 150, 0, 3) - (i % 3) * 0.6]} rotation={[0, Math.PI, 0]} inHand={<Geweer />} />)}
    </Kust>
  );
};

export const S_Regiment = () => (
  <Kust tijd="avond" cam={[3, 1.6, 8, 2.2, 1.6, 7]} kijk={[0, 0.8, -2]} schepen={2} over={<LangTeller label="The 57th" waarde="nearly all fell" pil="but the line holds" />}>
    <Loopgraaf z={-1.4} van={-7} tot={7} />
    {[-4, -2, 0, 2, 4].map((x, i) => <group key={i} position={[x, 0.5, -1.7]} rotation={[0.3, 0, 0.2 * (i % 2 ? 1 : -1)]}><Geweer /></group>)}
    {Array.from({ length: 30 }, (_, i) => <Blok key={i} p={[-7 + ((i * 3.7) % 14), 0.12, 0.6 + ((i * 1.3) % 2.4)]} s={[0.14, 0.1, 0.14]} c="#C8202A" />)}
  </Kust>
);

export const S_Loopgraven = () => (
  <Kust cam={[7, 3.2, 6, 6, 3, 5]} kijk={[0, 0.6, -2.2]} schepen={2} over={<TelTeller label="Trench war" van={0} tot={8} a={6} b={60} na=" months" pil="sometimes a few metres apart" />}>
    <Loopgraaf z={-0.2} van={-9} tot={9} />
    <group rotation={[0, Math.PI, 0]} position={[0, 0, -4.4]}><Loopgraaf z={0} van={-9} tot={9} /></group>
    {[-6, -2, 2, 6].map((x, i) => <FiguurA key={i} {...SOLDAAT_P} position={[x, -0.4, 0.4]} rotation={[0, Math.PI, 0]} />)}
    {[-5, -1, 3, 7].map((x, i) => <FiguurA key={`a${i}`} {...ANZAC_P} position={[x, -0.4, -5]} />)}
  </Kust>
);

export const S_Scherf = () => {
  const f = useCurrentFrame();
  const raak = f > 24;
  return (
    <Kust cam={[1.4, 1.8, 4.6, 1.0, 1.7, 3.9]} kijk={[0, 1.4, -0.4]} schepen={2} over={<JaarLabel jaar="August 1915" sub="Anafartalar" />}>
      <Loopgraaf z={-1.4} van={-4} tot={4} />
      <Flits p={[0.1, 1.5, 0.4]} op={22} />
      <FiguurA {...GAL_P} position={[0, 0, 0]} rotation={[raak ? -0.12 : 0, 0.3, 0]} pose={{ wenk: raak ? 0.8 : 0.3, mond: raak ? 'open' : 'dicht', armR: raak ? { schouder: [-0.8, 0, 0.6], elleboog: [0, -1.2] } : wijs(1.0) }} />
    </Kust>
  );
};

export const S_Horloge = () => {
  const f = useCurrentFrame();
  return (
    <Kust tijd="avond" cam={[0.3, 1.55, 1.6, 0.15, 1.5, 1.3]} kijk={[0, 1.45, 0]} schepen={1} over={<Pijllabel tekst="your pocket watch" x={1380} y={300} naar={[1080, 480]} vanaf={30} />}>
      <Zakhorloge position={[0, 1.45, 0]} rotation={[0.1, Math.sin(f / 40) * 0.1, 0]} schaal={0.5} />
    </Kust>
  );
};

export const S_Evacuatie = () => {
  const f = useCurrentFrame();
  return (
    <Kust tijd="nacht" cam={[5, 3, 12, 3.6, 2.6, 10]} kijk={[0, -2, -30]} schepen={0} over={<JaarLabel jaar="January 1916" sub="the Allies sail away" />}>
      {[0, 1, 2].map((i) => <Oorlogsschip key={i} position={[-20 + i * 16 - lin(f, 0, 150, 0, 8), -5.8, -40 - i * 10 - lin(f, 0, 150, 0, 12)]} rotation={[0, Math.PI - 0.3, 0]} t={t30(f) + i} schaal={1.2} />)}
      <pointLight position={[0, 6, -10]} intensity={10} distance={40} color="#C8D8FF" />
    </Kust>
  );
};

export const S_Prijs = () => (
  <Kust tijd="avond" cam={[4, 2.2, 10, 3, 2, 8.6]} kijk={[0, 0.8, -3]} schepen={0} over={<TelTeller label="Killed or wounded" van={0} tot={500000} a={6} b={70} voor="~" pil="both sides, approx." />}>
    {Array.from({ length: 28 }, (_, i) => <Blok key={i} p={[-7 + (i % 7) * 2.2, 0.45, -1 - Math.floor(i / 7) * 1.8]} s={[0.7, 0.9, 0.16]} c="#E8E2D2" />)}
  </Kust>
);

export const S_Johnnies = () => (
  <Kust tijd="avond" cam={[3, 2.2, 8.4, 2, 2.1, 7.4]} kijk={[0, 1.6, -1.6]} schepen={0} over={<Voorbehoud tekst="words attributed to Atatürk, Gallipoli memorial" />}>
    <Blok p={[0, 0.3, -1.8]} s={[5.4, 0.6, 1.2]} c="#B8AE9A" />
    <Blok p={[0, 1.9, -2.0]} s={[4.6, 2.6, 0.4]} c="#D8D0BC" />
    <Papier position={[0, 1.9, -1.78]} regels={['THERE IS NO', 'DIFFERENCE BETWEEN', 'THE JOHNNIES AND', 'THE MEHMETS']} b={4.2} h={2.2} fontPx={34} kleur="#D8D0BC" />
    <FiguurA {...ANZAC_P} position={[-3.2, 0, 0]} rotation={[0, 0.5, 0]} pose={{ hoofd: [0.2, 0, 0] }} />
    <FiguurA {...SOLDAAT_P} position={[3.2, 0, 0]} rotation={[0, -0.5, 0]} pose={{ hoofd: [0.2, 0, 0] }} />
  </Kust>
);

export const S_Pasja = () => (
  <Anatolie cam={[1.8, 1.9, 5.4, 1.2, 1.8, 4.6]} kijk={[0, 1.6, -0.8]} over={<LangTeller label="Age 35" waarde="Pasha" pil="general Mustafa Kemal" />}>
    <FiguurA {...GAL_P} hoofdExtra={<KalpakGoud />} position={[0, 0, 0]} pose={{ mond: 'lach', armR: { schouder: [-2.4, 0, -0.6], elleboog: [0, -1.6] } }} />
    {[-2.2, 2.2].map((x, i) => <FiguurA key={i} {...SOLDAAT2_P} position={[x, 0, -1]} rotation={[0, x > 0 ? -0.6 : 0.6, 0]} pose={{ armR: { schouder: [-2.4, 0, -0.6], elleboog: [0, -1.6] } }} />)}
  </Anatolie>
);
const KalpakGoud = () => (
  <>
    <Blok p={[0, 0.9, 0]} s={[0.66, 0.4, 0.64]} c="#3E3A38" rough={1} />
    <Blok p={[0, 0.9, 0.33]} s={[0.2, 0.12, 0.02]} c="#C9A646" metal={0.7} />
  </>
);

export { Bed, BURGER_FEZ_P, HOCA_P, ITALIAAN_P, LATIFE_P, OFF_P, Rook, Tent, Kanon, ease, Menigte, Klok, Sirene, BRIT_P, Stoel };
