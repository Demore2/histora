import { useCurrentFrame } from 'remotion';
import { Galei, Leger, Paard, Rook, Sokkel, TekstVlak, Vuur } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, omhoog, Rol, wijs, Zwaard, type V3 } from '../watals/Figuur';
import { ease, FPS, lin } from './basis';
import { N_1555, N_ERFENIS, N_LEEG } from './KaarttafelNL';
import { GroteTitel, JaarLabel, LangTeller } from './LangHud';
import { BoosTeken, Pijllabel, Regelbord, Stempel, TelTeller, Voorbehoud, Wolk, Zweet } from './LeonidasKit';
import { Citaat } from './SaladinScenes';
import {
  ALVA_P,
  ANNA,
  Baret,
  Boek,
  BURGER,
  Dillenburg,
  EDEL,
  EGMONT,
  FiguurW,
  FILIPS_P,
  Gang,
  GEUS,
  HENDRIK_P,
  HofZaal,
  HoofdW,
  HORN,
  Kaars,
  KAREL_P,
  KaartN,
  Kamer,
  KIND,
  KIND2,
  Kist,
  kpN,
  Kraag,
  MARGARETHA,
  MiniWillem,
  MOEDER_W,
  Munten,
  N_LAGE,
  N_VER,
  Nap,
  ORANJE,
  PAARD_W,
  plN,
  PolderSet,
  Prinsenvlag,
  RAADSHEER,
  SPANJAARD,
  Stoel,
  Straat,
  Tafel,
  VADER_W,
  Veld,
  W,
  WILLEM_KIND,
  WJ,
  Woud,
  ZeeSet,
  ZOON,
} from './WillemKit';

/**
 * Scènes voor "What if you were William of Orange?" deel 1: teaser en hoofdstuk I-IV (zie werk/zinnen.json).
 */

const ROOD = '#B3412E';
const t30 = (f: number) => f / FPS;

/* ================= teaser ================= */

/** Knal: Willem te paard met de Prinsenvlag voor de molens, camera schudt, grote titel. */
export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.008 : 0;
  return (
    <PolderSet tijd="avond" cam={[3.4 + schok, 2.4 + schok, 11, 3.0, 2.6, 9.6]} kijk={[0, 3.0, 0]} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="WILLIAM OF ORANGE?" grootte={128} /> : undefined}>
      <Leger rijen={3} kolommen={10} position={[-2, 0, -9]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Prinsenvlag position={[-3.4, 0, -2.2]} t={t} />
      <Paard position={[0.8, 0, 0]} rotation={[0, Math.PI - 0.55, 0]} {...PAARD_W} t={t} ruiter={<Figuur {...W} pose={{ hoofd: [0, 0.3, 0], armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, wenk: 0.4 }} inHand={<Zwaard />} />} />
    </PolderSet>
  );
};

/** Teaser: het kind met een berg goud en een kroon die te groot is. */
export const S_TeaserGoud = () => {
  const f = useCurrentFrame();
  return (
    <Kamer cam={[1.0, 1.5, 4.0, 0.7, 1.3, 3.2]} kijk={[0, 0.9, 0]} over={<LangTeller label="Age" waarde="11" pil="a prince" />}>
      <Tafel position={[0, 0, 0.3]} b={2.2} d={0.9} />
      <Munten position={[-0.5, 0.82, 0.3]} n={Math.round(lin(f, 0, 60, 6, 30))} />
      <Munten position={[0.6, 0.82, 0.35]} n={18} />
      <FiguurW kleding={WILLEM_KIND} scale={0.72} position={[0, 0, -0.5]} pose={{ mond: 'open', armL: omhoog(), armR: omhoog() }} hoofdExtra={<group position={[0, 0.78, 0]} scale={0.9}><Kroon /></group>} />
      <Wolk p={[0.9, 1.75, -0.2]} tekst="ALL MINE?!" b={1.0} h={0.34} vanaf={20} staart={-1} />
    </Kamer>
  );
};

/** Keizer Karel leunt op Willems schouder (teaser en zin 28). */
export const S_Schouder = ({ close = false }: { close?: boolean }) => (
  <HofZaal cam={close ? [0.9, 2.2, 4.0, 0.5, 2.15, 3.4] : [1.8, 2.4, 6.6, 1.0, 2.3, 5.6]} kijk={[0, 2.0, -1]}>
    <FiguurW {...KAREL_P} position={[-0.45, 0, -1]} rotation={[0, 0.2, 0]} pose={{ armL: { schouder: [-0.25, 0, 1.65], elleboog: [0, 0.1] }, hoofd: [0.25, 0, 0], wenk: -0.3 }} />
    <FiguurW {...WJ} position={[0.45, 0, -0.9]} rotation={[0, -0.1, 0]} pose={{ mond: 'dicht' }} />
    {[-3, -2.2, 2.2, 3].map((x, i) => <FiguurW key={x} kleding={i % 2 ? EDEL : RAADSHEER} hoofdExtra={<Kraag />} baard position={[x, 0, 0.6]} rotation={[0, x < 0 ? 0.8 : -0.8, 0]} />)}
  </HofZaal>
);

/** Teaser: Willem keert de troon van Filips de rug toe en loopt naar zijn leger. */
export const S_TeaserBreuk = () => {
  const f = useCurrentFrame();
  return (
    <HofZaal cam={[2.4, 2.4, 7.4, 1.6, 2.3, 6.4]} kijk={[0, 1.8, -1.5]}>
      <FiguurW {...FILIPS_P} position={[0, 0.4, -3.2]} pose={{ wenk: 1, mond: 'open', armR: wijs(1.2) }} />
      <FiguurW {...W} position={[1.6, 0, ease(f, 10, 120, -0.6, 1.6)]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
      <BoosTeken p={[0.5, 3.4, -3.0]} s={0.6} />
    </HofZaal>
  );
};

/** De muur met de kogelgaten en de gevallen baret (teaser, en zin 107). */
export const S_Muur = ({ flits = false }: { flits?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Gang cam={[1.4, 1.8, 4.6, 0.9, 1.7, 3.8]} kijk={[-0.2, 0.9, -1.0]} over={flits ? <div style={{ position: 'absolute', inset: 0, background: '#FFF4D8', opacity: f < 8 ? 0.85 * (1 - f / 8) : 0 }} /> : undefined}>
      <group position={[-0.5, 0.02, 0.2]} rotation={[0.1, 0.6, 0.1]}>
        <group position={[0, -0.72, 0]}><Baret /></group>
      </group>
    </Gang>
  );
};

/** Teaser-vraag: Willem alleen op de dijk in de avondzon. */
export const S_Dijk = () => {
  const f = useCurrentFrame();
  return (
    <PolderSet tijd="avond" cam={[2.6, 1.8, 6.4, 1.8, 2.0, 5.4]} kijk={[0, 2.0, 0]}>
      <Blok p={[0, 0.3, 0]} s={[30, 0.6, 3]} c="#6E8A42" />
      <FiguurW {...W} position={[0, 0.6, 0]} rotation={[0, 0.4 + Math.sin(f / 60) * 0.05, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0, -0.5, 0] }} />
      <Prinsenvlag position={[-1.6, 0.6, -0.6]} t={t30(f)} h={3.6} />
    </PolderSet>
  );
};

/** Titelkaart: Willems ruiterstandbeeld in de avondzon. */
export const T5_Titel = () => (
  <PolderSet tijd="avond" cam={[4.2, 2.6, 13, 3.2, 2.8, 11.6]} kijk={[0, 3.8, 0]} over={<GroteTitel boven="THE LIFE OF" naam="WILLIAM OF ORANGE" onder="from a German castle to the father of a nation" grootte={134} />}>
    <Sokkel position={[0, 0, 0]} h={1.6}>
      <Paard rotation={[0, Math.PI - 0.4, 0]} kleur="#6E5A3A" manen="#6E5A3A" dek="#6E5A3A" ruiter={<Figuur {...W} levend={false} o={{ kleur: '#7A6038', metaal: 0.7, ruw: 0.35 }} pose={{ armR: { schouder: [-1.2, 0, -0.3], elleboog: [0, -0.1] } }} />} />
    </Sokkel>
    <pointLight position={[2, 5, 4]} intensity={12} distance={9} color="#FFD8A0" />
  </PolderSet>
);

/* ================= I · The boy from Dillenburg ================= */

export const S_Dillenburg = ({ avond = false }: { avond?: boolean }) => (
  <Dillenburg tijd={avond ? 'avond' : 'dag'} over={avond ? undefined : <JaarLabel jaar="1533" sub="Dillenburg" />} />
);

/** De familie: vader (graaf, niet rijk), moeder, en een kamer vol kinderen. */
export const S_Familie = ({ fase }: { fase: 'vader' | 'kinderen' | 'bijbel' | 'sepia' }) => {
  const f = useCurrentFrame();
  if (fase === 'vader')
    return (
      <Kamer cam={[1.2, 1.9, 4.8, 0.8, 1.8, 4.0]} kijk={[0, 1.4, 0]} over={<LangTeller label="Your father" waarde="a count" pil="but not a rich one" />}>
        <FiguurW kleding={VADER_W} baard haar="kort" position={[-0.2, 0, 0]} rotation={[0, 0.2, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.2], elleboog: [0, -0.9] }, mond: 'dicht', wenk: -0.3 }} />
        <Kist position={[1.1, 0, 0.2]} rotation={[0, -0.4, 0]} open={ease(f, 20, 50, 0, 1)} vol={false} />
        {f > 50 && <Wolk p={[1.1, 1.3, 0.3]} tekst="empty" b={0.8} h={0.3} vanaf={52} staart={0} />}
      </Kamer>
    );
  if (fase === 'kinderen')
    return (
      <Kamer cam={[2.2, 2.4, 6.6, 1.6, 2.2, 5.6]} kijk={[0, 1.0, 0]} over={<><LangTeller label="Children" waarde="12" pil="you're the oldest" /><Pijllabel tekst="you" x={1360} y={420} naar={[1240, 560]} vanaf={30} /></>}>
        <FiguurW kleding={MOEDER_W} haar="lang" position={[-2.2, 0, -0.6]} rotation={[0, 0.5, 0]} pose={{ armR: omhoog(), mond: 'open', wenk: 0.5 }} />
        {Array.from({ length: 11 }, (_, i) => {
          const x = -1.4 + (i % 6) * 0.65 + Math.sin(f / 7 + i) * 0.25;
          const z = -0.2 + Math.floor(i / 6) * 0.9 + Math.cos(f / 9 + i) * 0.2;
          return <FiguurW key={i} kleding={i % 2 ? KIND : KIND2} haar={i % 2 ? 'kort' : 'lang'} scale={0.38 + (i % 4) * 0.05} position={[x, Math.abs(Math.sin(f / 4 + i)) * 0.15, z]} rotation={[0, Math.sin(f / 10 + i) * 1.2, 0]} pose={{ mond: i % 3 ? 'open' : 'lach', armR: i % 2 ? omhoog() : undefined }} />;
        })}
        <FiguurW kleding={WILLEM_KIND} scale={0.6} position={[1.8, 0, 0.6]} rotation={[0, -0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.6 }} />
      </Kamer>
    );
  // bijbel / sepia: de familie aan tafel, vader leest voor
  return (
    <Kamer avond={fase === 'sepia'} sepia={fase === 'sepia'} cam={[1.6, 2.2, 5.4, 1.1, 2.0, 4.6]} kijk={[0, 1.1, 0]}>
      <Tafel position={[0, 0, 0]} b={3.0} d={1.1} />
      <Boek position={[-0.6, 0.83, 0.15]} open />
      <Kaars position={[0.4, 0.82, 0]} />
      <FiguurW kleding={VADER_W} baard position={[-0.6, 0, -0.9]} pose={{ hoofd: [0.35, 0, 0], mond: Math.floor(f / 6) % 2 ? 'open' : 'dicht' }} />
      <FiguurW kleding={MOEDER_W} haar="lang" position={[0.5, 0, -0.9]} pose={{ hoofd: [0.2, -0.3, 0] }} />
      {[-1.2, 1.2].map((x, i) => <FiguurW key={x} kleding={i ? KIND2 : WILLEM_KIND} haar={i ? 'lang' : 'kort'} scale={0.55} position={[x * 1.3, 0, 0.1]} rotation={[0, -Math.sign(x) * 1.2, 0]} />)}
    </Kamer>
  );
};

/** Kaart: Saint-Dizier, waar neef René sneuvelt. */
export const S_StDizier = () => (
  <KaartN van={N_1555} cam={[N_VER, kpN('stdizier', 9, 6)]} spelden={[['stdizier', ROOD], ['dillenburg', '#2A4A9A']]} over={<LangTeller label="1544" waarde="René of Chalon" pil="your cousin, killed at Saint-Dizier" />} />
);

/** De bode met het testament. */
export const S_Testament = () => {
  const f = useCurrentFrame();
  return (
    <Kamer cam={[1.4, 1.7, 4.6, 0.9, 1.6, 3.8]} kijk={[0, 1.1, 0]}>
      <FiguurW kleding={RAADSHEER} baard haar="grijs" position={[-0.8, 0, 0]} rotation={[0, 0.7, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.1], elleboog: [0, -0.2] } }} inHand={<Rol open={lin(f, 10, 40, 0.2, 1)} />} />
      <FiguurW kleding={WILLEM_KIND} scale={0.66} position={[0.6, 0, 0.1]} rotation={[0, -0.6, 0]} pose={{ mond: f > 45 ? 'open' : 'dicht', wenk: f > 45 ? -0.4 : 0 }} />
      <Wolk p={[-0.7, 2.6, 0.1]} tekst={['EVERYTHING', 'GOES TO...']} b={1.3} h={0.55} vanaf={12} staart={-1} />
      {f > 50 && <Wolk p={[0.9, 1.8, 0.3]} tekst="ME?!" b={0.6} h={0.3} vanaf={52} staart={1} />}
    </Kamer>
  );
};

/** Kaart: het prinsdom Oranje in Zuid-Frankrijk. */
export const S_Oranje = () => (
  <KaartN van={N_LEEG} cam={[N_VER, kpN('orange', 8, 5.5)]} spelden={[['orange', ORANJE]]} over={<LangTeller label="Principality" waarde="Orange" pil="in the south of France" />} />
);

/** Kaart: de landgoederen in de Nederlanden lichten op. */
export const S_Landgoed = () => (
  <KaartN van={N_LEEG} naar={N_ERFENIS} cam={[kpN('orange', 10, 7), N_LAGE]} camDuur={110} licht={['Netherlands', 'Belgium', 'Luxembourg']} over={<LangTeller label="Plus" waarde="huge estates" pil="all over the Netherlands" />} />
);

/** Het kind is prins: Teller, kroon, munten. */
export const S_Prins = () => <S_TeaserGoud />;

/** "But there's a catch": het kind houdt op met juichen. */
export const S_Maar = () => (
  <Kamer cam={[0.8, 1.4, 3.4, 0.6, 1.3, 2.8]} kijk={[0, 1.1, 0]}>
    <FiguurW kleding={WILLEM_KIND} scale={0.72} position={[0, 0, 0]} pose={{ mond: 'dicht', wenk: -0.4 }} hoofdExtra={<group position={[0, 0.78, 0]} scale={0.9}><Kroon /></group>} />
    <Wolk p={[0.8, 1.7, 0.2]} tekst="...but?" b={0.8} h={0.32} vanaf={8} staart={-1} />
  </Kamer>
);

/** Karel V op zijn troon: katholiek opgevoed, in Brussel. */
export const S_KarelVoorwaarde = () => (
  <HofZaal cam={[1.6, 2.4, 6.6, 1.0, 2.3, 5.6]} kijk={[0, 1.9, -2]} over={<><Pijllabel tekst="Emperor Charles V" x={520} y={660} naar={[880, 640]} vanaf={10} /><Regelbord regels={[['Raised Catholic', true], ['In Brussels', true]]} /></>}>
    <FiguurW {...KAREL_P} position={[0, 0.4, -3.1]} pose={{ armR: wijs(1.1), mond: 'open' }} />
  </HofZaal>
);

/** Afscheid aan de poort van Dillenburg. */
export const S_Afscheid = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Dillenburg tijd="avond" cam={[3.4, 2.4, 9.4, 2.6, 2.3, 8.2]} kijk={[0, 1.6, 0]}>
      <FiguurW kleding={VADER_W} baard position={[-1.6, 0, -0.2]} rotation={[0, 0.4, 0]} pose={{ armR: omhoog(), wenk: -0.5 }} />
      <FiguurW kleding={MOEDER_W} haar="lang" position={[-0.9, 0, -0.4]} rotation={[0, 0.3, 0]} pose={{ traan: lin(f, 20, 80, 0, 1), wenk: -0.6 }} />
      <Paard position={[1.2, 0, ease(f, 0, 150, 1.0, 4.0)]} rotation={[0, 0.2, 0]} {...PAARD_W} loopt t={t} ruiter={<Figuur kleding={WILLEM_KIND} scale={0.8} pose={{ hoofd: [0, -1.2, 0], wenk: -0.6 }} />} />
    </Dillenburg>
  );
};

/* ================= II · The emperor's favourite ================= */

/** Lessen aan het hof: schermen (en daarna paardrijden in het bos). */
export const S_Schermen = () => {
  const f = useCurrentFrame();
  const stoot = Math.sin(f / 5) * 0.4;
  return (
    <HofZaal troon={false} cam={[2.4, 2.2, 6.4, 1.6, 2.1, 5.4]} kijk={[0, 1.6, 0]} over={<JaarLabel jaar="Brussels" sub="French, Spanish, fencing, dancing" />}>
      <FiguurW {...WJ} position={[-0.8, 0, 0]} rotation={[0, 1.2, 0]} pose={{ armR: { schouder: [-1.4 + stoot, 0, -0.1], elleboog: [0, 0] }, wenk: 0.5 }} inHand={<Zwaard />} />
      <FiguurW kleding={RAADSHEER} baard haar="grijs" position={[0.8, 0, 0]} rotation={[0, -1.2, 0]} pose={{ armR: { schouder: [-1.4 - stoot, 0, -0.1], elleboog: [0, 0] } }} inHand={<Zwaard />} />
    </HofZaal>
  );
};

export const S_Jacht = ({ henri = false, fase = 'rijden' }: { henri?: boolean; fase?: 'rijden' | 'praat' | 'plan' | 'stil' }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  if (!henri)
    return (
      <Woud cam={[4, 2.6, 11, 3, 2.6, 9.5]} kijk={[0, 2.4, 0]}>
        <Paard position={[ease(f, 0, 150, -2, 1), 0, 0]} rotation={[0, -Math.PI / 2 + 0.3, 0]} {...PAARD_W} loopt t={t} ruiter={<Figuur {...WJ} pose={{ ...ARMEN_GEKRUIST, mond: 'dicht' }} />} />
        <Wolk p={[ease(f, 0, 150, -2, 1), 4.1, 0]} tekst="..." b={0.7} h={0.36} vanaf={30} staart={0} />
      </Woud>
    );
  const praat = fase !== 'rijden';
  return (
    <Woud cam={praat ? [1.8, 3.1, 8.8, 1.2, 3.1, 7.8] :[2.6, 3.0, 13.5, 1.8, 2.9, 12.5]} kijk={[0, 2.9, 0]} over={fase === 'rijden' ? <JaarLabel jaar="1559" sub="hunting near Paris" /> : undefined}>
      <Paard position={[-1.3, 0, 0]} rotation={[0, Math.PI - 0.9, 0]} kleur="#ECE6DA" manen="#8A7A6A" dek="#2F4F9E" t={t} ruiter={<Figuur {...HENDRIK_P} pose={{ armR: wijs(0.8), mond: praat && Math.floor(f / 5) % 2 ? 'open' : 'dicht', hoofd: [0, -0.5, 0] }} />} />
      <Paard position={[1.3, 0, 0.4]} rotation={[0, Math.PI + 0.5, 0]} {...PAARD_W} t={t + 1} ruiter={<Figuur {...W} pose={{ ...(fase === 'stil' ? ARMEN_GEKRUIST : {}), hoofd: [0, 0.4, 0], wenk: fase === 'plan' ? -0.5 : 0, mond: 'dicht' }} />} />
      {fase === 'praat' && <Wolk p={[-1.4, 4.6, 0.3]} tekst="psst..." b={0.9} h={0.36} vanaf={10} staart={-1} />}
      {fase === 'plan' && <Wolk p={[-1.6, 4.4, 0.3]} tekst={['NO MORE', 'PROTESTANTS']} b={1.5} h={0.6} vanaf={8} staart={-1} />}
      {fase === 'stil' && <Wolk p={[1.4, 4.6, 0.6]} tekst="..." b={0.7} h={0.36} vanaf={10} staart={1} />}
    </Woud>
  );
};

/** Karel ziet Willem graag: hand op de schouder, glimlach. */
export const S_Favoriet = () => (
  <HofZaal cam={[1.4, 2.3, 5.4, 0.9, 2.2, 4.6]} kijk={[0, 2.0, -0.6]}>
    <FiguurW {...KAREL_P} position={[-0.5, 0, -0.6]} rotation={[0, 0.5, 0]} pose={{ armR: { schouder: [-1.4, 0, 0.9], elleboog: [0, 0.2] }, mond: 'lach' }} />
    <FiguurW {...WJ} position={[0.5, 0, -0.5]} rotation={[0, -0.4, 0]} pose={{ mond: 'lach' }} />
  </HofZaal>
);

/** Kaart: het rijk van Karel V. */
export const S_Rijk = () => (
  <KaartN van={N_LEEG} naar={{ ...N_1555, Italy: 'spanje' }} cam={[N_VER, { lon: 1, lat: 45, h: 24, a: 13 }]} over={<LangTeller label="Charles V rules" waarde="half of Europe" pil="Spain, Italy, the Netherlands, and America" />} />
);

/** "De zon gaat nooit onder": een galjoen op zee, de zon die blijft hangen. */
export const S_Zon = () => (
  <ZeeSet tijd="avond" stad={false} cam={[5, 2.6, 12, 4, 2.6, 10.6]} kijk={[0, 2.0, -4]} over={<Voorbehoud tekst="the sun never sets on his lands" />}>
    <Galei position={[0, 0, -4]} rotation={[0, 0.5, 0]} deining={0} schilden="#D8A945" />
  </ZeeSet>
);

/** Bruiloft met Anna van Egmond. */
export const S_Bruiloft = () => (
  <HofZaal troon={false} cam={[1.6, 2.2, 6.0, 1.0, 2.1, 5.0]} kijk={[0, 1.8, -0.6]} over={<><JaarLabel jaar="1551" sub="age 18" /><Pijllabel tekst="Anna of Egmond" x={700} y={300} naar={[870, 460]} vanaf={24} /><Pijllabel tekst="you" x={1250} y={330} naar={[1060, 460]} vanaf={36} /></>}>
    <FiguurW kleding={ANNA} haar="lang" position={[-0.45, 0, -0.6]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach', armR: { schouder: [-0.6, 0, 0.6], elleboog: [0, 0.4] } }} />
    <FiguurW {...WJ} position={[0.45, 0, -0.6]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach' }} />
    {[-2.8, -2.0, 2.0, 2.8].map((x, i) => <FiguurW key={x} kleding={i % 2 ? EDEL : ANNA} haar={i % 2 ? 'kort' : 'lang'} position={[x, 0, 0.4]} rotation={[0, x < 0 ? 0.8 : -0.8, 0]} pose={{ armR: omhoog(), mond: 'lach' }} />)}
  </HofZaal>
);

/** Feest: lange tafel, gasten, munten die rollen. */
export const S_Feest = () => {
  const f = useCurrentFrame();
  return (
    <HofZaal troon={false} cam={[4.6, 3.2, 6.8, 3.6, 3.0, 5.8]} kijk={[0, 1.4, -0.4]} over={<LangTeller label="Your parties" waarde="legendary" pil="money like water" />}>
      <Tafel position={[0, 0, -0.4]} b={7} d={1.2} kleur="#5A3B24" />
      {Array.from({ length: 8 }, (_, i) => <Blok key={i} p={[-3 + i * 0.85, 0.9, -0.3]} s={[0.3, 0.16, 0.3]} c={['#C9A66B', '#B5643A', '#8A3A2A', '#D9A55A'][i % 4]} />)}
      {Array.from({ length: 7 }, (_, i) => <FiguurW key={i} kleding={i === 3 ? WJ.kleding : i % 2 ? EDEL : ANNA} hoofdExtra={i === 3 ? WJ.hoofdExtra : undefined} haar={i % 2 ? 'kort' : 'lang'} position={[-3 + i, -0.3, -1.3]} pose={{ mond: 'lach', armR: i % 2 ? omhoog() : undefined }} />)}
      {Array.from({ length: 6 }, (_, i) => <Blok key={`m${i}`} p={[-2 + i * 0.8, 0.9 + ((f * 0.05 + i * 0.3) % 1.4), 0.4]} s={[0.12, 0.12, 0.03]} r={[0, f * 0.2 + i, 0]} c="#D8A945" metal={0.8} rough={0.3} />)}
    </HofZaal>
  );
};

/** Bevelhebber op 21: Willem te paard voor een keizerlijk leger. */
export const S_Bevel = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Veld cam={[4, 2.8, 11, 3, 2.9, 9.6]} kijk={[0, 2.8, 0]} over={<JaarLabel jaar="1555" sub="age 21, commander" />}>
      <Leger rijen={3} kolommen={10} position={[0, 0, -7]} kleur="#8E2A22" schild="#D8A945" t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.5, 0]} {...PAARD_W} t={t} ruiter={<Figuur {...WJ} pose={{ armR: { schouder: [-0.85, 0, -0.55], elleboog: [0, -0.1] }, mond: 'open' }} inHand={<Zwaard />} />} />
    </Veld>
  );
};

/** Karel oud en ziek, met een stok. */
export const S_KarelOud = () => (
  <HofZaal donker cam={[1.2, 1.9, 4.6, 0.8, 1.9, 3.8]} kijk={[0, 1.4, -0.5]} over={<LangTeller label="Charles V" waarde="55" pil="tired and sick" />}>
    <Stoel position={[0, 0, -0.6]} />
    <FiguurW {...KAREL_P} haar="grijs" position={[0, -0.35, -0.5]} pose={{ wenk: -0.7, hoofd: [0.3, 0, 0], armR: { schouder: [-0.7, 0, -0.2], elleboog: [0, -0.4] } }} inHand={<Blok p={[0, -0.4, 0]} s={[0.05, 1.0, 0.05]} c="#5A3B24" />} />
    <Zweet p={[0.35, 1.9, -0.3]} n={2} />
  </HofZaal>
);

/** De troonsafstand: volle zaal, Karel bij de troon. */
export const S_Afstand = () => (
  <HofZaal cam={[3.6, 3.0, 9.6, 2.6, 2.8, 8.2]} kijk={[0, 1.8, -2]} over={<JaarLabel jaar="25 October 1555" sub="Brussels" />}>
    <FiguurW {...KAREL_P} position={[-0.3, 0.4, -3.0]} pose={{ wenk: -0.3 }} />
    {Array.from({ length: 14 }, (_, i) => {
      const x = (i % 7) * 1.0 - 3 + (i > 6 ? 0.5 : 0);
      const z = 0.4 + Math.floor(i / 7) * 1.1;
      if (Math.abs(x) < 1.0) return null;
      return <FiguurW key={i} kleding={[EDEL, RAADSHEER, EGMONT, HORN][i % 4]} hoofdExtra={<Kraag />} baard={i % 2 === 0} position={[x, 0, z]} rotation={[0, Math.PI, 0]} />;
    })}
  </HofZaal>
);

/** "Yours.": close op de jonge Willem. */
export const S_Jouw = () => (
  <HofZaal cam={[0.5, 2.25, 2.6, 0.35, 2.2, 2.2]} kijk={[0.3, 2.2, -0.9]}>
    <FiguurW {...KAREL_P} position={[-0.45, 0, -1]} rotation={[0, 0.2, 0]} pose={{ armL: { schouder: [-0.25, 0, 1.65], elleboog: [0, 0.1] }, hoofd: [0.25, 0, 0] }} />
    <FiguurW {...WJ} position={[0.45, 0, -0.9]} rotation={[0, -0.1, 0]} pose={{ mond: 'dicht', wenk: 0.2 }} />
  </HofZaal>
);

/** Filips II op de troon (en hij mag Willem niet). */
export const S_Filips = ({ boos = false }: { boos?: boolean }) => (
  <HofZaal cam={boos ? [1.6, 2.3, 5.6, 1.1, 2.2, 4.8] : [1.2, 2.5, 6.8, 0.8, 2.4, 6.0]} kijk={[0, 1.9, -2]} over={boos ? undefined : <Pijllabel tekst="Philip II" x={700} y={260} naar={[920, 400]} vanaf={14} />}>
    <FiguurW {...FILIPS_P} position={[0, 0.4, -3.1]} pose={{ wenk: boos ? 1 : 0.3, mond: 'dicht', ...(boos ? ARMEN_GEKRUIST : {}) }} />
    {boos && <FiguurW {...W} baard={false} snor={false} kleding={WJ.kleding} hoofdExtra={WJ.hoofdExtra} position={[1.4, 0, -1.2]} rotation={[0, -0.6, 0]} pose={{ wenk: -0.3 }} />}
    {boos && <BoosTeken p={[0.5, 3.5, -2.9]} s={0.6} />}
  </HofZaal>
);

/* ================= III · The Silent ================= */

/** Kaart: Brussel → Parijs als gijzelaar. */
export const S_Gijzelaar = () => (
  <KaartN van={N_1555} cam={[N_LAGE, kpN('parijs', 8, 6)]} route={[plN('brussel'), plN('parijs')]} kop={<MiniWillem />} spelden={[['parijs', '#3E6FA8']]} over={<LangTeller label="1559" waarde="hostage" pil="for a peace treaty with France" />} />
);

/** Herinnering aan de familie (sepia). */
export const S_Herinnering = () => <S_Familie fase="sepia" />;

/** Voorbehoud: zo vertelde hij het zelf. */
export const S_Bijnaam = () => (
  <HofZaal donker troon={false} cam={[0.6, 2.3, 3.4, 0.4, 2.25, 2.8]} kijk={[0, 2.2, -0.5]} over={<><Voorbehoud tekst="his own account, written in 1581" /><LangTeller label="Nickname" waarde="the Silent" pil="William the Silent" /></>}>
    <FiguurW {...W} position={[0, 0, -0.5]} pose={{ ...ARMEN_GEKRUIST, mond: 'dicht' }} />
  </HofZaal>
);

/** Kaart: stadhouder van Holland, Zeeland en Utrecht. */
export const S_Stadhouder = () => (
  <KaartN van={N_1555} cam={[N_VER, N_LAGE]} licht={['Netherlands']} spelden={[['utrecht', ORANJE], ['leiden', ORANJE]]} over={<LangTeller label="Governor of" waarde="Holland, Zeeland, Utrecht" pil="stadtholder, 1559" />} />
);

/** Filips vaart weg naar Spanje. */
export const S_Wegvaren = () => {
  const f = useCurrentFrame();
  return (
    <ZeeSet tijd="grijs" cam={[5, 2.8, 12, 4, 2.6, 10]} kijk={[0, 1.6, -6]} over={<LangTeller label="Philip" waarde="sails to Spain" pil="never to return" />}>
      <Galei position={[0, 0, ease(f, 0, 160, -2, -12)]} rotation={[0, Math.PI, 0]} deining={t30(f)} schilden="#D8A945" />
    </ZeeSet>
  );
};

/** Bevelen uit Madrid. */
export const S_Bevelen = () => {
  const f = useCurrentFrame();
  return (
    <HofZaal cam={[1.2, 2.2, 5.0, 0.8, 2.1, 4.2]} kijk={[0, 1.6, -0.5]} over={<Pijllabel tekst="orders from Madrid" x={1300} y={250} naar={[1080, 430]} vanaf={20} />}>
      <FiguurW kleding={RAADSHEER} baard haar="grijs" position={[-0.4, 0, -0.5]} pose={{ armR: { schouder: [-1.3, 0, -0.1], elleboog: [0, -0.2] }, mond: 'open' }} inHand={<Rol open={lin(f, 6, 30, 0.2, 1)} />} />
      <Wolk p={[-1.5, 2.6, 0.2]} tekst={['HUNT DOWN', 'THE HERETICS']} b={1.6} h={0.6} vanaf={30} staart={-1} />
    </HofZaal>
  );
};

/** Boeken op de brandstapel op het plein (geen mensen). */
export const S_Boeken = () => {
  const f = useCurrentFrame();
  return (
    <Straat tijd="avond" cam={[2.0, 2.0, 7.0, 1.4, 1.9, 6.0]} kijk={[0, 1.0, 0]} over={<LangTeller label="Crime" waarde="the wrong book" pil="punished by death" />}>
      {Array.from({ length: 9 }, (_, i) => <Boek key={i} position={[((i * 37) % 9) * 0.12 - 0.5, 0.1 + Math.floor(i / 3) * 0.12, ((i * 17) % 5) * 0.1 - 0.2]} rotation={[0, i * 0.7, 0]} kleur={['#3A2418', '#5A2A1A', '#2A3A4A'][i % 3]} />)}
      <Vuur position={[0, 0.3, 0]} t={t30(f)} grootte={1.1} />
      <pointLight position={[0, 1.2, 0.6]} intensity={6} distance={8} color="#FF8A3A" />
      {[-2.2, 2.2].map((x) => <Figuur key={x} kleding={SPANJAARD} hoofddeksel="helm" baard position={[x, 0, -1.2]} rotation={[0, x < 0 ? 0.5 : -0.5, 0]} />)}
    </Straat>
  );
};

/** De Raad van State: Willem staat op. */
export const S_Raad = ({ spreekt = false }: { spreekt?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <HofZaal troon={false} cam={spreekt ? [0.2, 2.2, 5.8, 0.4, 2.1, 5.0] : [3.4, 3.0, 7.4, 2.6, 2.8, 6.4]} kijk={[0.6, 1.5, -0.6]} over={spreekt ? <Citaat tekst="No king has the right to rule over the consciences of his people." wie="William, Council of State, 1564 (paraphrased)" /> : <JaarLabel jaar="1564" sub="Council of State" />}>
      <Tafel position={[0, 0, -0.6]} b={4.4} d={1.4} kleur="#4A3020" />
      {[-1.6, -0.6, 0.6, 1.6].map((x, i) => <FiguurW key={x} kleding={i % 2 ? RAADSHEER : EGMONT} baard hoofdExtra={<Kraag />} position={[x, -0.35, -1.6]} pose={{ hoofd: [0, x * 0.2, 0], mond: spreekt && f > 30 ? 'open' : 'dicht' }} />)}
      <FiguurW {...W} position={[1.8, 0, 0.5]} rotation={[0, -1.0, 0]} pose={{ armR: spreekt ? wijs(1.2) : undefined, mond: spreekt && Math.floor(f / 5) % 2 ? 'open' : 'dicht', wenk: spreekt ? 0.6 : 0 }} />
    </HofZaal>
  );
};

/* ================= IV · The Iron Duke ================= */

/** Edelen met het verzoekschrift. */
export const S_Edelen = () => {
  const f = useCurrentFrame();
  return (
    <HofZaal cam={[2.8, 2.6, 8.2, 2.0, 2.4, 7.0]} kijk={[0, 1.8, -1]} over={<><JaarLabel jaar="1566" sub="a petition" /><Pijllabel tekst="Margaret of Parma, governor" x={1360} y={220} naar={[1010, 380]} vanaf={30} /></>}>
      <FiguurW kleding={MARGARETHA} haar="lang" hoofdExtra={<Kraag />} position={[0, 0.4, -3.1]} pose={{ wenk: 0.3 }} />
      {Array.from({ length: 10 }, (_, i) => (
        <FiguurW key={i} kleding={[EDEL, EGMONT, HORN, GEUS][i % 4]} hoofdExtra={<Kraag />} baard={i % 2 === 0} position={[(i % 5) * 0.9 - 1.8, 0, ease(f, 0, 120, 3, 1) + Math.floor(i / 5) * 1.0]} rotation={[0, Math.PI, 0]} inHand={i === 2 ? <Rol /> : undefined} pose={i === 2 ? { armR: wijs(1.2) } : undefined} />
      ))}
    </HofZaal>
  );
};

/** De raadsman fluistert: "het zijn maar bedelaars". */
export const S_Bedelaars = () => (
  <HofZaal cam={[1.2, 2.6, 4.8, 0.8, 2.5, 4.0]} kijk={[0, 2.3, -2.4]}>
    <FiguurW kleding={MARGARETHA} haar="lang" hoofdExtra={<Kraag />} position={[0, 0.4, -3.1]} pose={{ hoofd: [0, 0.5, 0] }} />
    <FiguurW kleding={RAADSHEER} baard haar="grijs" position={[0.9, 0.4, -2.8]} rotation={[0, -0.7, 0]} pose={{ mond: 'open', wenk: 0.8, armR: wijs(0.6) }} />
    <Wolk p={[1.6, 3.4, -2.6]} tekst={["THEY'RE JUST", 'BEGGARS']} b={1.4} h={0.55} vanaf={10} staart={-1} />
  </HofZaal>
);

/** De Geuzen: nappen om de hals, juichend. */
export const S_Geuzen = () => {
  const f = useCurrentFrame();
  return (
    <Straat cam={[2.2, 2.2, 8, 1.6, 2.1, 6.8]} kijk={[0, 1.6, 0]} over={<LangTeller label="New name" waarde="the Beggars" pil="les Gueux, de Geuzen" />}>
      {Array.from({ length: 9 }, (_, i) => (
        <FiguurW key={i} kleding={i % 3 ? GEUS : EDEL} baard={i % 2 === 0} extra={<Nap />} position={[(i % 5) * 1.0 - 2, Math.abs(Math.sin(f / 5 + i)) * 0.1, Math.floor(i / 5) * -1.2]} pose={{ armR: i % 2 ? omhoog() : undefined, mond: 'lach' }} />
      ))}
      <Wolk p={[0, 3.6, 0]} tekst={['LONG LIVE', 'THE BEGGARS!']} b={1.8} h={0.6} vanaf={30} staart={0} />
    </Straat>
  );
};

/** De beeldenstorm: een (kaal) beeld valt van zijn sokkel op het plein. */
export const S_Beeldenstorm = () => {
  const f = useCurrentFrame();
  const val = ease(f, 30, 60, 0, 1.45);
  return (
    <Straat tijd="avond" cam={[2.6, 3.8, 9.0, 1.8, 3.6, 7.8]} kijk={[0, 1.8, -2.4]} over={<LangTeller label="Summer 1566" waarde="the Iconoclastic Fury" pil="statues smashed all over the country" />}>
      <Blok p={[0, 0.7, -2.4]} s={[1.0, 1.4, 1.0]} c="#B8AE9C" />
      <group position={[0, 1.4, -2.4]} rotation={[val, 0, 0]}>
        <Figuur kleding={BURGER} o={{ kleur: '#C9C0AE', metaal: 0, ruw: 1 }} haar="kort" />
      </group>
      {Array.from({ length: 8 }, (_, i) => <FiguurW key={i} kleding={i % 2 ? GEUS : BURGER} haar="kort" position={[(i % 4 < 2 ? -3.0 : 1.9) + (i % 2) * 1.0, 0, -1.4 + Math.floor(i / 4) * 1.2]} rotation={[0, i % 4 < 2 ? 2.4 : -2.4, 0]} pose={{ armR: omhoog(), mond: 'open' }} />)}
      {f > 55 && <Rook position={[0, 0.2, -1.2]} t={t30(f)} kleur="#A8A090" />}
    </Straat>
  );
};

/** Filips in Madrid, woedend. */
export const S_FilipsWoede = () => (
  <HofZaal donker cam={[1.2, 2.3, 5.2, 0.8, 2.2, 4.4]} kijk={[0, 1.8, -1.2]} over={<JaarLabel jaar="Madrid" sub="Philip is furious" />}>
    <Tafel position={[0, 0, -1.2]} b={2.2} d={1.0} kleur="#3A2418" />
    <FiguurW {...FILIPS_P} position={[0, 0, -2.0]} pose={{ wenk: 1, mond: 'open', armR: { schouder: [-1.6, 0, -0.1], elleboog: [0, -0.6] } }} />
    <BoosTeken p={[0.5, 2.8, -1.8]} s={0.6} />
    <Wolk p={[-1.0, 3.0, -1.8]} tekst="!!!" b={0.7} h={0.36} vanaf={8} staart={1} />
  </HofZaal>
);

/** Alva en zijn leger. */
export const S_Alva = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Veld tijd="avond" cam={[4, 2.8, 12, 3, 2.7, 10.4]} kijk={[0, 2.6, -2]} over={<><JaarLabel jaar="1567" sub="the Duke of Alba" /><TelTeller label="Veteran soldiers" van={0} tot={10000} a={10} b={70} pil="about" /></>}>
      <Leger rijen={4} kolommen={11} position={[0, 0, -9 + ease(f, 0, 160, 0, 2)]} kleur="#8E2A22" schild="#D8A945" t={t} />
      <Paard position={[0, 0, -2 + ease(f, 0, 160, 0, 2)]} rotation={[0, Math.PI, 0]} kleur="#151210" dek="#8E2A22" loopt t={t} ruiter={<Figuur {...ALVA_P} pose={{ wenk: 1 }} />} />
    </Veld>
  );
};

/** Kaart: Willem vlucht naar Dillenburg. */
export const S_Vlucht = () => (
  <KaartN van={N_1555} cam={[N_LAGE, kpN('dillenburg', 8, 6, -1)]} route={[plN('brussel'), plN('dillenburg')]} routeTijd={[10, 100]} kop={<MiniWillem />} spelden={[['dillenburg', '#2A4A9A']]} over={<LangTeller label="1567" waarde="you flee" pil="back to Dillenburg" />} />
);

/** Egmont en Horn blijven. */
export const S_EgmontHorn = () => (
  <HofZaal troon={false} cam={[1.4, 2.2, 5.6, 0.9, 2.1, 4.8]} kijk={[0, 1.8, -0.6]} over={<><Pijllabel tekst="Count of Egmont" x={640} y={250} naar={[860, 400]} vanaf={12} /><Pijllabel tekst="Count of Horn" x={1290} y={250} naar={[1060, 400]} vanaf={26} /></>}>
    <FiguurW kleding={EGMONT} baard snor hoofdExtra={<HoofdW />} position={[-0.5, 0, -0.6]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach' }} />
    <FiguurW kleding={HORN} baard hoofdExtra={<Kraag />} position={[0.5, 0, -0.6]} pose={{ ...ARMEN_GEKRUIST }} />
  </HofZaal>
);

/** De Bloedraad: Alva met rechters bij kaarslicht. */
export const S_Bloedraad = () => (
  <HofZaal donker troon={false} cam={[2.0, 2.4, 6.2, 1.4, 2.3, 5.2]} kijk={[0, 1.4, -1]} over={<LangTeller label="Alba's court" waarde="the Council of Blood" pil="what the people called it" />}>
    <Tafel position={[0, 0, -1]} b={4} d={1.2} kleur="#2A1A12" />
    {[-1.2, 1.2].map((x) => <Kaars key={x} position={[x, 0.82, -0.8]} />)}
    <FiguurW {...ALVA_P} position={[0, -0.35, -1.9]} pose={{ wenk: 1 }} />
    {[-1.4, 1.4].map((x) => <FiguurW key={x} kleding={RAADSHEER} baard haar="grijs" position={[x, -0.35, -1.9]} pose={{ wenk: 0.6 }} />)}
  </HofZaal>
);

/** Teller: meer dan duizend executies (geen executie in beeld: een stil plein met wachters). */
export const S_Executies = () => (
  <Straat tijd="grijs" cam={[2.4, 2.6, 9, 1.8, 2.4, 7.8]} kijk={[0, 1.6, -2]} over={<TelTeller label="Executed" van={0} tot={1000} a={6} b={70} na="+" pil="among them Egmont and Horn, 1568" />}>
    {[-2.4, -0.8, 0.8, 2.4].map((x) => <Figuur key={x} kleding={SPANJAARD} hoofddeksel="helm" baard position={[x, 0, -3]} />)}
    {Array.from({ length: 7 }, (_, i) => <FiguurW key={i} kleding={BURGER} haar="kort" position={[(i % 4) * 1.3 - 2, 0, 1 + Math.floor(i / 4)]} rotation={[0, Math.PI, 0]} pose={{ hoofd: [0.4, 0, 0], wenk: -0.6 }} />)}
  </Straat>
);

/** Je bezit wordt in beslag genomen. */
export const S_Beslag = () => {
  const f = useCurrentFrame();
  return (
    <Kamer cam={[2.8, 2.3, 7.0, 2.1, 2.2, 6.0]} kijk={[0.4, 1.3, 0]} over={<Stempel tekst="CONFISCATED" vanaf={30} top={200} />}>
      <Kist position={[ease(f, 0, 120, -0.4, 1.6), 0.9, 0]} />
      {[-0.4, 0.4].map((x) => <Figuur key={x} kleding={SPANJAARD} hoofddeksel="helm" baard position={[ease(f, 0, 120, -0.4, 1.6) + x, 0, -0.2]} rotation={[0, -Math.PI / 2, 0]} pose={{ armL: { schouder: [-1.2, 0, 0.1] }, armR: { schouder: [-1.2, 0, -0.1] } }} />)}
    </Kamer>
  );
};

/** Je zoon op het schip naar Spanje. */
export const S_Zoon = () => {
  const f = useCurrentFrame();
  const z = lin(f, 0, 160, 0, -6);
  return (
    <ZeeSet tijd="grijs" cam={[6, 3.2, 10, 5, 3.2, 10]} kijk={[0, 1.6, z]} over={<LangTeller label="Your son" waarde="age 13" pil="taken to Spain, 1568" />}>
      <group position={[0, 0, z]}>
        <Galei position={[0, 0, 0]} rotation={[0, Math.PI, 0]} deining={t30(f)} schilden="#B3241E" />
        <FiguurW kleding={ZOON} hoofdExtra={<Kraag />} scale={0.8} position={[0.3, 0.9, 0.6]} rotation={[0, 0.4, 0]} pose={{ wenk: -0.6, armR: wijs(0.9) }} />
      </group>
    </ZeeSet>
  );
};

/** Willem met een traan, alleen in Dillenburg. */
export const S_Verdriet = () => {
  const f = useCurrentFrame();
  return (
    <Kamer avond cam={[0.8, 2.2, 3.4, 0.6, 2.15, 2.8]} kijk={[0, 2.1, -0.2]}>
      <FiguurW {...W} position={[0, 0, -0.2]} pose={{ traan: lin(f, 20, 90, 0, 1), wenk: -0.7, hoofd: [0.2, 0, 0] }} />
    </Kamer>
  );
};

export { S_Familie as S_FamilieAlias };
