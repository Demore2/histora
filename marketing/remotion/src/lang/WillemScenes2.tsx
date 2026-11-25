import { useCurrentFrame } from 'remotion';
import { Bed, Galei, Leger, Paard, Rook, Tent, TekstVlak, Vuur } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, omhoog, Rol, wijs, Zwaard } from '../watals/Figuur';
import { Verband } from '../watals/WatAlsWillem';
import { ease, FPS, lin } from './basis';
import { N_1555, N_OPSTAND } from './KaarttafelNL';
import { JaarLabel, LangTeller } from './LangHud';
import { BoosTeken, Pijllabel, Stempel, TelTeller, Voorbehoud, Wolk, Zweet } from './LeonidasKit';
import { Citaat } from './SaladinScenes';
import {
  Acrostichon,
  ALVA_P,
  Boek,
  Bril,
  BURGER,
  CHARLOTTE,
  Flits,
  FiguurW,
  FILIPS_P,
  Gang,
  GERARD,
  GEUS,
  HofZaal,
  HoofdW,
  Kaars,
  KaartN,
  Kamer,
  Kist,
  kpN,
  Kraag,
  MiniSchip,
  MiniWillem,
  Munten,
  N_LAGE,
  N_VER,
  ORANJE,
  PAARD_W,
  Pistool,
  plN,
  PolderSet,
  Prinsenvlag,
  RAADSHEER,
  SPANJAARD,
  Standbeeld,
  Stoel,
  Straat,
  STUDENT,
  Tafel,
  TweeDocumenten,
  Universiteit,
  Veld,
  VloedSet,
  W,
  Wortel,
  ZEEGEUS,
  ZeeSet,
} from './WillemKit';

/**
 * Scènes voor "What if you were William of Orange?" deel 2: hoofdstuk V-IX en de outro.
 * Antwerpen en Delft: een flits en rook, geen wond; de dood is de muur, de baret, de laatste woorden.
 */

const t30 = (f: number) => f / FPS;
const ZANGER = { huid: '#E2B48E', haar: '#A0703A', tuniek: '#7A2A24', benen: '#4A3A2A', schoenen: '#2A1E16', riem: '#E9DFC8' };

/* ================= V · Going to war ================= */

/** Willem neemt een besluit: vuist op tafel. */
export const S_Besluit = () => {
  const f = useCurrentFrame();
  const klap = f > 40 && f < 48 ? 0.08 : 0;
  return (
    <Kamer avond cam={[1.2, 2.2, 4.6, 0.8, 2.1, 3.8]} kijk={[0, 1.6, -0.3]}>
      <Tafel position={[0, klap, 0.3]} b={2.0} d={0.9} />
      <Kaars position={[-0.6, 0.82 + klap, 0.3]} />
      <FiguurW {...W} position={[0, 0, -0.4]} pose={{ armR: { schouder: [f > 40 ? -1.0 : -2.2, 0, -0.1], elleboog: [0, -0.4] }, wenk: 0.8, mond: 'dicht' }} />
    </Kamer>
  );
};

/** Zilver en juwelen gaan de deur uit, munten naar de soldaten. */
export const S_Verkopen = () => {
  const f = useCurrentFrame();
  return (
    <Kamer cam={[1.8, 2.0, 5.6, 1.2, 1.9, 4.6]} kijk={[0, 1.2, 0]} over={<Stempel tekst="SOLD" vanaf={40} top={180} />}>
      <Tafel position={[0, 0, 0.2]} b={2.4} d={1.0} />
      <Munten position={[-0.6, 0.82, 0.2]} n={Math.round(lin(f, 0, 100, 24, 4))} kleur="#C9CDD2" />
      {[0.2, 0.5, 0.8].map((x, i) => <Blok key={x} p={[x, 0.95, 0.2]} s={[0.14, 0.28, 0.14]} c={['#C9CDD2', '#D8A945', '#C9CDD2'][i]} metal={0.8} rough={0.3} />)}
      <FiguurW {...W} position={[-0.9, 0, -0.6]} pose={{ armR: wijs(0.8) }} />
      <FiguurW kleding={RAADSHEER} baard position={[1.4, 0, -0.4]} rotation={[0, -0.6, 0]} pose={{ mond: 'lach', armR: omhoog() }} inHand={<group rotation={[0, 0, 0]}><Blok p={[0, -0.1, 0]} s={[0.2, 0.2, 0.2]} c="#8A6A3A" /></group>} />
    </Kamer>
  );
};

/** Heiligerlee: het oranje leger jaagt het rode op de vlucht. */
export const S_Heiligerlee = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Veld cam={[6, 3.2, 14, 4.4, 3.0, 12]} kijk={[0, 2.0, -4]} over={<JaarLabel jaar="23 May 1568" sub="Heiligerlee" />}>
      <Leger rijen={3} kolommen={10} position={[0, 0, ease(f, 0, 150, -3, -5)]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Leger rijen={3} kolommen={9} position={[0, 0, ease(f, 0, 150, -12, -18)]} rotation={[0, 0.15, 0]} kleur="#8E2A22" schild="#D8A945" t={t} />
      <Prinsenvlag position={[-3, 0, ease(f, 0, 150, -2, -4)]} t={t} />
    </Veld>
  );
};

/** Adolf sneuvelt: zijn helm met blauwe pluim in het gras. */
export const S_Adolf = () => (
  <Veld tijd="avond" cam={[1.0, 1.0, 3.6, 0.7, 0.9, 3.0]} kijk={[0, 0.3, 0]} over={<LangTeller label="Your brother" waarde="Adolf" pil="killed at Heiligerlee, age 28" />}>
    <group position={[0, 0.2, 0]} rotation={[0.2, 0.5, 1.3]}>
      <Blok p={[0, 0, 0]} s={[0.5, 0.4, 0.5]} c="#8D8A84" metal={0.7} rough={0.35} />
      <Blok p={[0, 0.3, 0]} s={[0.08, 0.3, 0.3]} c="#2A4A9A" />
    </group>
    <Prinsenvlag position={[1.4, 0, -1.2]} h={2.6} />
  </Veld>
);

/** Kaart: Willems leger trekt het zuiden in. */
export const S_Opmars = () => (
  <KaartN van={N_1555} cam={[kpN('dillenburg', 9, 7), N_LAGE]} route={[plN('dillenburg'), [5.7, 50.85], [4.7, 50.6], [4.4, 50.4]]} routeTijd={[10, 130]} kop={<MiniWillem />} over={<LangTeller label="Autumn 1568" waarde="into Brabant" pil="waiting for the cities to rise" />} />
);

/** De poorten blijven dicht. */
export const S_Poort = () => (
  <Straat cam={[1.6, 3.8, 11.5, 1.2, 3.8, 10.2]} kijk={[0, 4.0, -3]}>
    <Blok p={[0, 2.5, -3.2]} s={[10, 5, 1]} c="#8A6A52" />
    <Blok p={[0, 1.4, -2.68]} s={[2.2, 2.8, 0.05]} c="#3A2A1C" />
    {[-2.4, -1.2, 1.2, 2.4].map((x) => <FiguurW key={x} kleding={BURGER} haar="kort" position={[x, 5.0, -3.0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0, Math.sin(x) * 0.4, 0] }} />)}
    <Wolk p={[0, 6.8, -2.8]} tekst="No." b={0.8} h={0.4} vanaf={12} staart={0} />
  </Straat>
);

/** Alva volgt op afstand en vecht niet. */
export const S_Achtervolging = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Veld tijd="grijs" cam={[10, 5, 12, 8, 5, 10]} kijk={[0, 1.5, -6]} over={<LangTeller label="Battles Alba fought" waarde="0" pil="he just followed you" />}>
      <Leger rijen={2} kolommen={7} position={[-2, 0, ease(f, 0, 160, 0, -3)]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Leger rijen={3} kolommen={8} position={[2, 0, ease(f, 0, 160, -12, -15)]} kleur="#8E2A22" schild="#D8A945" t={t} />
      <Paard position={[2, 0, ease(f, 0, 160, -14, -17)]} rotation={[0, Math.PI, 0]} kleur="#151210" dek="#8E2A22" t={t} ruiter={<Figuur {...ALVA_P} pose={{ ...ARMEN_GEKRUIST }} />} />
    </Veld>
  );
};

/** Platzak: een lege kist, de soldaten gaan naar huis. */
export const S_Blut = () => {
  const f = useCurrentFrame();
  return (
    <Veld tijd="grijs" cam={[2.0, 1.8, 6.0, 1.4, 1.8, 5.0]} kijk={[0, 1.2, -1]} over={<TelTeller label="Money left" van={200000} tot={0} a={6} b={50} pil="your soldiers go home, unpaid" />}>
      <Tent position={[-3, 0, -4]} kleur="#C9B48E" />
      <Kist position={[0, 0, 0]} open={1} vol={false} />
      <FiguurW {...W} position={[0.9, 0, -0.5]} rotation={[0, -0.5, 0]} pose={{ wenk: -0.7, hoofd: [0.4, 0, 0] }} />
      {[0, 1, 2].map((i) => <Figuur key={i} kleding={{ ...BURGER, tuniek: ORANJE }} hoofddeksel="helm" position={[-2 - i * 0.8, 0, ease(f, 0, 160, -1, -7) - i]} rotation={[0, Math.PI, 0]} />)}
    </Veld>
  );
};

/** Hulp van zee: schepen met de Prinsenvlag. */
export const S_ZeeHulp = ({ briel = false }: { briel?: boolean }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <ZeeSet tijd={briel ? 'dag' : 'grijs'} cam={[7, 3.2, 12, 5.4, 3.0, 10]} kijk={[0, 1.8, -8]} over={briel ? <><Pijllabel tekst="the Sea Beggars" x={700} y={300} naar={[900, 460]} vanaf={14} /><LangTeller label="Port" waarde="Brill" pil="Den Briel" /></> : undefined}>
      {[-4, 0, 4].map((x, i) => (
        <group key={x} position={[x, 0, ease(f, 0, 160, -4, -14) + i * 1.5]}>
          <Galei position={[0, 0, 0]} rotation={[0, Math.PI, 0]} deining={t + i} schilden={ORANJE} />
          <Prinsenvlag position={[0, 0.6, -1]} t={t + i} h={3.4} />
          {briel && i === 1 && <Figuur kleding={ZEEGEUS} baard position={[0.4, 0.9, 0.4]} pose={{ armR: omhoog(), mond: 'open' }} inHand={<Zwaard />} />}
        </group>
      ))}
    </ZeeSet>
  );
};

/** 1 april 1572: een grote kalenderpagina. */
export const S_EenApril = () => (
  <ZeeSet tijd="dag" cam={[3, 2.6, 9, 2.4, 2.4, 8]} kijk={[0, 2.2, -4]} over={<JaarLabel jaar="1 April 1572" sub="April Fools' Day" />}>
    <group position={[0, 0, -4]}>
      <Galei position={[0, 0, 0]} rotation={[0, 0.6, 0]} deining={0} schilden={ORANJE} />
      <Prinsenvlag position={[0, 0.6, 0]} h={3.6} />
    </group>
  </ZeeSet>
);

/** Alva verliest zijn bril. */
export const S_Bril = () => {
  const f = useCurrentFrame();
  const val = ease(f, 36, 60, 0, 1);
  return (
    <HofZaal cam={[0.6, 2.25, 3.0, 0.4, 2.2, 2.5]} kijk={[0, 2.15, -0.5]} over={<Voorbehoud tekst="Brill = bril = glasses" />}>
      <FiguurW {...ALVA_P} position={[0, 0, -0.5]} pose={{ wenk: f > 40 ? -0.6 : 0.8, mond: f > 40 ? 'open' : 'dicht' }} hoofdExtra={<><Kraag /><Bril val={val} /></>} />
      {f > 50 && <Wolk p={[0.8, 2.7, -0.3]} tekst="MY GLASSES!" b={1.2} h={0.36} vanaf={50} staart={-1} />}
    </HofZaal>
  );
};

/** Kaart: de opstand verspreidt zich. */
export const S_Opstand = () => (
  <KaartN van={N_1555} naar={N_OPSTAND} wissel={[20, 110]} cam={[N_VER, N_LAGE]} spelden={[['briel', ORANJE], ['leiden', ORANJE], ['delft', ORANJE], ['utrecht', ORANJE]]} over={<LangTeller label="1572" waarde="city after city" pil="opens its gates to the rebels" />} />
);

/** Iemand schrijft een lied: de zanger op het plein. */
export const S_Lied = ({ letters = false }: { letters?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Straat cam={[2.0, 2.2, 8.4, 1.2, 2.1, 7.2]} kijk={[0, 1.8, -0.5]} over={letters ? <Acrostichon /> : <LangTeller label="c. 1570" waarde="a song" pil="about you" />}>
      <FiguurW kleding={ZANGER} hoofdExtra={<group><Blok p={[0, 0.76, -0.02]} s={[0.74, 0.1, 0.7]} c="#7A2A24" /></group>} position={[0, 0, 0]} pose={{ armR: omhoog(), mond: Math.floor(f / 6) % 2 ? 'open' : 'lach' }} />
      {[-2.6, -1.6, 1.6, 2.6, -2.1, 2.1].map((x, i) => <FiguurW key={i} kleding={{ ...BURGER, tuniek: [ORANJE, '#5A4A3A', '#3E5A7A'][i % 3] }} position={[x, 0, i > 3 ? -2 : -0.8]} rotation={[0, x < 0 ? 0.6 : -0.6, 0]} pose={{ mond: 'open', armR: i % 2 ? omhoog() : undefined }} />)}
    </Straat>
  );
};

/** Het Wilhelmus: een menigte in het oranje zingt. */
export const S_Wilhelmus = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <PolderSet tijd="avond" cam={[5, 3.0, 12, 4, 3.2, 10]} kijk={[0, 2.2, -2]} over={<LangTeller label="The Wilhelmus" waarde="Dutch anthem" pil="one of the oldest in the world" />}>
      {Array.from({ length: 24 }, (_, i) => {
        const x = (i % 8) * 1.3 - 4.55 + (Math.floor(i / 8) % 2) * 0.5;
        const z = -1 - Math.floor(i / 8) * 1.5;
        return <Figuur key={i} kleding={{ ...BURGER, tuniek: ORANJE, rok: ORANJE }} position={[x, Math.abs(Math.sin(t * 3 + i)) * 0.06, z]} pose={{ mond: 'open', armR: i % 3 === 0 ? omhoog() : undefined }} />;
      })}
      <Prinsenvlag position={[-5, 0, -3]} t={t} h={5} />
    </PolderSet>
  );
};

/* ================= VI · Water as a weapon ================= */

/** Het zuiden: grijs, regen, terugtrekkend leger. */
export const S_Mislukt = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Veld tijd="grijs" cam={[5, 3, 12, 4, 3, 10]} kijk={[0, 2, -4]} over={<LangTeller label="1572" waarde="in the south" pil="everything goes wrong" />}>
      <Leger rijen={2} kolommen={8} position={[0, 0, ease(f, 0, 160, -4, -10)]} rotation={[0, Math.PI, 0]} kleur={ORANJE} schild="#2A4A9A" t={t} />
    </Veld>
  );
};

/** Parijs bij nacht, fakkels (geen geweld in beeld). */
export const S_Parijs = () => {
  const f = useCurrentFrame();
  return (
    <Straat tijd="nacht" zaad={4} cam={[2.6, 2.6, 9, 1.8, 2.4, 7.6]} kijk={[0, 2, -3]} over={<LangTeller label="Paris, August 1572" waarde="St. Bartholomew's" pil="thousands of Protestants murdered" />}>
      {[-3, 3].map((x) => <Vuur key={x} position={[x, 0, -4]} t={t30(f) + x} grootte={0.8} />)}
      {[-3, 3].map((x) => <pointLight key={`l${x}`} position={[x, 1.6, -3]} intensity={5} distance={8} color="#FF8A3A" />)}
    </Straat>
  );
};

/** "Daar zal ik mijn graf maken." */
export const S_Graf = () => (
  <PolderSet tijd="grijs" cam={[2.6, 2.4, 7.0, 1.8, 2.5, 6.0]} kijk={[0, 2.8, 0]} over={<Citaat tekst="I will go to Holland, and make my grave there." wie="William, in a letter to his brother, 1572 (paraphrased)" />}>
    <Blok p={[0, 0.3, 0]} s={[30, 0.6, 3]} c="#6E7A52" />
    <FiguurW {...W} position={[0, 0.6, 0]} rotation={[0, 0.4, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0, -0.5, 0], wenk: -0.3 }} />
  </PolderSet>
);

/** Calvinist: Willem met een zwart boek in een kale, witte kamer. */
export const S_Calvinist = () => (
  <Gang donker={false} cam={[1.2, 2.2, 4.6, 0.8, 2.1, 3.8]} kijk={[0, 1.8, -0.5]} over={<JaarLabel jaar="1573" sub="you become a Calvinist" />}>
    <FiguurW {...W} position={[0, 0, -0.5]} pose={{ armR: { schouder: [-1.2, 0, -0.1], elleboog: [0, -0.9] }, hoofd: [0.3, 0, 0] }} inHand={<Boek position={[0, -0.05, 0.05]} rotation={[0.3, 0, 0]} kleur="#151210" />} />
  </Gang>
);

/** Mookerheide: twee helmen op de heide, broers Lodewijk en Hendrik. */
export const S_Mook = () => (
  <Veld heide tijd="grijs" cam={[1.4, 1.2, 4.2, 1.0, 1.1, 3.4]} kijk={[0, 0.4, 0]} over={<><JaarLabel jaar="1574" sub="Mookerheyde" /><Pijllabel tekst="Louis" x={760} y={420} naar={[880, 620]} vanaf={20} /><Pijllabel tekst="Henry" x={1180} y={420} naar={[1060, 620]} vanaf={30} /></>}>
    {[-0.45, 0.45].map((x, i) => (
      <group key={x} position={[x, 0.2, 0]} rotation={[0.2, i ? -0.5 : 0.5, i ? -1.3 : 1.3]}>
        <Blok p={[0, 0, 0]} s={[0.5, 0.4, 0.5]} c="#8D8A84" metal={0.7} rough={0.35} />
        <Blok p={[0, 0.3, 0]} s={[0.08, 0.3, 0.3]} c={i ? ORANJE : '#2A4A9A'} />
      </group>
    ))}
  </Veld>
);

/** Drie lege stoelen aan tafel. */
export const S_DrieStoelen = () => (
  <Kamer avond cam={[2.4, 2.4, 6.6, 1.8, 2.3, 5.6]} kijk={[0.3, 1.1, -0.2]} over={<LangTeller label="Brothers lost" waarde="3" pil="Adolf, Louis and Henry" />}>
    <Tafel position={[0, 0, 0]} b={3.2} d={1.0} />
    <Kaars position={[0, 0.82, 0]} />
    {[-1.0, 0, 1.0].map((x) => <Stoel key={x} position={[x, 0, -0.8]} />)}
    <FiguurW {...W} position={[1.9, 0, 0.5]} rotation={[0, -1.1, 0]} pose={{ wenk: -0.7, hoofd: [0.3, 0, 0] }} />
  </Kamer>
);

/** Het beleg van Leiden: Spaanse tenten om de muren. */
export const S_Leiden = () => {
  const f = useCurrentFrame();
  return (
    <VloedSet water={0} beleg cam={[8, 7, 14, 6, 6, 12]} kijk={[0, 2, -26]} over={<JaarLabel jaar="1574" sub="the siege of Leiden" />}>
      <Leger rijen={2} kolommen={10} position={[0, 0, -22]} kleur="#8E2A22" schild="#D8A945" t={t30(f)} />
    </VloedSet>
  );
};

/** Honger in de stad: magere mensen, een rat. */
export const S_Honger = () => {
  const f = useCurrentFrame();
  return (
    <Straat tijd="grijs" zaad={3} cam={[1.8, 1.8, 6.0, 1.2, 1.7, 5.0]} kijk={[0, 1.0, 0]} over={<LangTeller label="Inside Leiden" waarde="hunger" pil="and plague" />}>
      {[-1.2, 0, 1.2].map((x, i) => <FiguurW key={x} kleding={BURGER} haar={i === 1 ? 'lang' : 'kort'} position={[x, 0, -0.6]} pose={{ wenk: -0.8, hoofd: [0.35, 0, 0], armL: { schouder: [-0.6, 0, 0.5], elleboog: [0, 1.2] } }} />)}
      <group position={[ease(f, 10, 120, -2.5, 2.5), 0, 0.8]}>
        <Blok p={[0, 0.08, 0]} s={[0.16, 0.14, 0.32]} c="#6A6460" />
        <Blok p={[0, 0.1, 0.2]} s={[0.1, 0.1, 0.1]} c="#6A6460" />
        <Blok p={[0, 0.05, -0.3]} s={[0.03, 0.03, 0.3]} c="#9A8A80" />
      </group>
      <Zweet p={[0, 2.4, -0.4]} n={1} />
    </Straat>
  );
};

/** Een verschrikkelijke keuze: Willem kijkt naar de dijk. */
export const S_Keuze = () => (
  <PolderSet tijd="grijs" cam={[0.8, 2.3, 3.4, 0.6, 2.25, 2.8]} kijk={[0, 2.2, -0.4]}>
    <FiguurW {...W} position={[0, 0, -0.4]} pose={{ wenk: 0.9, mond: 'dicht', hoofd: [0, 0.3, 0] }} />
    <Wolk p={[0.9, 2.75, -0.2]} tekst="..." b={0.7} h={0.34} vanaf={20} staart={-1} />
  </PolderSet>
);

/** De dijken worden doorgestoken: het water stroomt binnen. */
export const S_Dijken = () => {
  const f = useCurrentFrame();
  return (
    <VloedSet water={lin(f, 10, 150, 0, 1)} cam={[6, 4, 12, 5, 3.6, 10]} kijk={[0, 0.5, -6]} over={<LangTeller label="Your order" waarde="cut the dikes" pil="flood your own land" />}>
      <Blok p={[-6, 0.4, -2]} s={[8, 1.4, 2]} c="#6E8A42" />
      <Blok p={[6, 0.4, -2]} s={[8, 1.4, 2]} c="#6E8A42" />
      {[-1, 1].map((x) => <Figuur key={x} kleding={BURGER} position={[x * 2.4, 1.1, -2]} rotation={[0, -x * 0.6, 0]} pose={{ armR: { schouder: [-1.8 + Math.sin(f / 4 + x) * 0.6, 0, -0.1], elleboog: [0, -0.3] } }} inHand={<Blok p={[0, -0.5, 0]} s={[0.06, 1.0, 0.06]} c="#5A3B24" />} />)}
    </VloedSet>
  );
};

/** Boerderijen en velden verdwijnen onder water. */
export const S_Water = () => <VloedSet water={1} cam={[9, 8, 18, 7, 7, 15]} kijk={[0, 0, -12]} />;

/** De vloot zeilt over de weilanden naar de muren. */
export const S_Vloot = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  const z = lin(f, 0, 160, 2, -6);
  return (
    <VloedSet water={1} cam={[7, 6, 16, 5.5, 5, 14]} kijk={[0, 1.5, -10]}>
      {[-3, 3].map((x, i) => (
        <group key={x} position={[x * 1.4, 0, z - 6 - i * 3]}>
          <Galei position={[0, 0, 0]} rotation={[0, Math.PI, 0]} deining={t + i} schilden={ORANJE} />
          <Prinsenvlag position={[0, 0.6, -1]} t={t} h={3.4} />
        </group>
      ))}
    </VloedSet>
  );
};

/** Haring en wittebrood. */
export const S_Haring = () => {
  const f = useCurrentFrame();
  return (
    <Straat zaad={3} cam={[2.0, 2.2, 7.0, 1.4, 2.0, 6.0]} kijk={[0, 1.4, 0]} over={<JaarLabel jaar="3 October 1574" sub="Leiden is free" />}>
      {Array.from({ length: 7 }, (_, i) => (
        <FiguurW key={i} kleding={{ ...BURGER, tuniek: i % 2 ? '#5A4A3A' : ORANJE }} haar={i % 2 ? 'kort' : 'lang'} position={[(i % 4) * 1.2 - 1.8, Math.abs(Math.sin(f / 5 + i)) * 0.1, Math.floor(i / 4) * -1.1]} pose={{ mond: 'lach', armR: omhoog() }} inHand={i % 2 ? <Blok p={[0, 0.1, 0]} s={[0.08, 0.36, 0.06]} c="#A8B4BA" metal={0.5} rough={0.3} /> : <Blok p={[0, 0.05, 0]} s={[0.22, 0.12, 0.14]} c="#E8D8A8" />} />
      ))}
      <Wolk p={[0, 3.4, -0.5]} tekst={['HERRING!', 'WHITE BREAD!']} b={1.6} h={0.6} vanaf={20} staart={0} />
    </Straat>
  );
};

/** De universiteit van Leiden. */
export const S_Universiteit = () => (
  <Straat zaad={2} cam={[3, 2.6, 10, 2.2, 3.0, 8.4]} kijk={[0, 4, -6]} over={<LangTeller label="1575" waarde="Leiden University" pil="the first in the north" />}>
    <Universiteit position={[0, 0, -7.5]} />
    {[-1.5, 0, 1.5].map((x) => <FiguurW key={x} kleding={STUDENT} haar="kort" position={[x, 0, -2]} rotation={[0, Math.PI, 0]} inHand={<Boek position={[0, 0, 0]} />} />)}
  </Straat>
);

/* ================= VII · Outlaw ================= */

/** De Unie van Utrecht: handtekeningen onder een rol. */
export const S_Unie = () => {
  const f = useCurrentFrame();
  return (
    <HofZaal troon={false} cam={[2.6, 2.6, 7, 1.8, 2.4, 6]} kijk={[0, 1.2, -0.4]} over={<JaarLabel jaar="1579" sub="the Union of Utrecht" />}>
      <Tafel position={[0, 0, -0.4]} b={3.6} d={1.2} />
      <Blok p={[0, 0.84, -0.3]} s={[1.4, 0.02, 0.9]} c="#EFE3C4" />
      {Array.from({ length: 6 }, (_, i) => <FiguurW key={i} kleding={[RAADSHEER, BURGER, GEUS][i % 3]} hoofdExtra={<Kraag />} baard={i % 2 === 0} position={[-2 + i * 0.8, 0, -1.4]} pose={{ armR: i === Math.floor(f / 25) % 6 ? wijs(0.6) : undefined }} />)}
    </HofZaal>
  );
};

/** Filips heeft er genoeg van. */
export const S_Genoeg = () => {
  const f = useCurrentFrame();
  return (
    <HofZaal donker cam={[1.2, 2.3, 5.0, 0.8, 2.2, 4.2]} kijk={[0, 1.8, -1.2]}>
      <FiguurW {...FILIPS_P} position={[0, 0, -1.6]} pose={{ wenk: 1, mond: 'dicht', armR: { schouder: [-1.4, 0, -0.1], elleboog: [0, -0.4] } }} inHand={<Rol open={lin(f, 20, 50, 1, 0.1)} />} />
      <BoosTeken p={[0.5, 2.9, -1.4]} s={0.6} />
    </HofZaal>
  );
};

/** Het WANTED-bord op het plein (vogelvrij). */
export const S_Gezocht = ({ bedrag = false }: { bedrag?: boolean }) => (
  <Straat cam={bedrag ? [0.8, 2.4, 5.6, 0.5, 2.4, 4.8] : [1.2, 2.4, 8, 0.4, 2.4, 6.8]} kijk={[0, 2.6, -1]} over={bedrag ? <TelTeller label="Reward" van={0} tot={25000} a={6} b={70} pil="gold crowns, plus a title" /> : <><JaarLabel jaar="1580" sub="outlaw" /><Voorbehoud tekst="an enemy of the human race" /></>}>
    <Blok p={[0, 1.4, -1.2]} s={[0.15, 2.8, 0.15]} c="#5A3B24" />
    <TekstVlak regels={['WANTED', 'WILLIAM', 'OF ORANGE']} b={1.6} h={1.8} achter="#E9DFC8" voor="#3A2A1C" position={[0, 2.4, -1.08]} fontPx={64} />
    {[-1.6, 1.6].map((x, i) => <FiguurW key={x} kleding={BURGER} hoofdExtra={<Kraag />} position={[x, 0, 0.6]} rotation={[0, Math.PI + (i ? 0.5 : -0.5), 0]} />)}
  </Straat>
);

/** De Apologie: Willem schrijft bij kaarslicht. */
export const S_Apologie = ({ woorden = false }: { woorden?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Kamer avond cam={woorden ? [0.4, 1.9, 2.0, 0.3, 1.8, 1.6] : [1.4, 2.0, 4.6, 0.9, 1.9, 3.8]} kijk={[0, 1.0, 0.2]} over={woorden ? undefined : <JaarLabel jaar="1581" sub="the Apology" />}>
      <Tafel position={[0, 0, 0.3]} b={2.0} d={1.0} />
      <Kaars position={[0.6, 0.82, 0.2]} />
      <Blok p={[0, 0.84, 0.35]} s={[0.6, 0.02, 0.8]} c="#EFE3C4" />
      {woorden && <TekstVlak regels={['...A LIAR', 'AND A', 'MURDERER...']} b={0.56} h={0.6} achter="#EFE3C4" voor="#3A2A1C" position={[0, 0.86, 0.4]} rotation={[-Math.PI / 2, 0, 0]} fontPx={70} />}
      {Array.from({ length: 5 }, (_, i) => <Blok key={i} p={[-0.7, 0.85 + i * 0.02, 0.3]} s={[0.4, 0.02, 0.5]} c="#E6D8B8" />)}
      <FiguurW {...W} position={[0, -0.35, -0.4]} pose={{ armR: { schouder: [-1.0, 0, -0.1], elleboog: [0, -0.4] }, hoofd: [0.45, 0, 0], wenk: 0.7 }} inHand={<Blok p={[0, 0.1, 0]} s={[0.02, 0.3, 0.06]} c="#F2EEE6" r={[0, 0, Math.sin(f / 3) * 0.2]} />} />
    </Kamer>
  );
};

/** De Staten-Generaal staan op. */
export const S_Staten = () => (
  <HofZaal cam={[3.2, 2.8, 8, 2.4, 2.6, 7]} kijk={[0, 1.8, -1.5]} over={<JaarLabel jaar="1581" sub="the States General" />}>
    {Array.from({ length: 12 }, (_, i) => <FiguurW key={i} kleding={[RAADSHEER, BURGER, GEUS][i % 3]} hoofdExtra={<Kraag />} baard={i % 2 === 0} position={[(i % 6) * 1.0 - 2.5, 0, -1.6 + Math.floor(i / 6) * 1.2]} pose={{ armR: omhoog(), mond: 'open' }} />)}
  </HofZaal>
);

/** De Akte van Verlatinghe als citaat. */
export const S_Verlatinghe = () => (
  <HofZaal troon={false} cam={[1.2, 1.7, 5.4, 0.7, 1.7, 4.6]} kijk={[0, 2.3, -0.4]} over={<Citaat tekst="A king who oppresses his people is no longer their king." wie="Act of Abjuration, 1581 (paraphrased)" />}>
    <FiguurW kleding={RAADSHEER} baard haar="grijs" position={[0, 0, -0.4]} pose={{ armR: { schouder: [-1.3, 0, -0.1], elleboog: [0, -0.2] }, armL: { schouder: [-1.3, 0, 0.1], elleboog: [0, 0.2] }, mond: 'open' }} inHand={<Rol open={1} />} />
  </HofZaal>
);

/** 1581 → 1776. */
export const S_Amerika = () => (
  <Kamer cam={[1.4, 2.0, 5.0, 1.0, 1.9, 4.2]} kijk={[0, 1.2, 0]} over={<><TweeDocumenten /><Voorbehoud tekst="some historians see a link" /></>}>
    <Tafel position={[0, 0, 0.2]} b={2.4} d={1.0} />
  </Kamer>
);

/* ================= VIII · Two bullets ================= */

/** Antwerpen 1582: na het diner komt een jongeman naar je toe. */
export const S_Antwerpen = () => {
  const f = useCurrentFrame();
  return (
    <Kamer avond cam={[2.0, 2.2, 6.0, 1.4, 2.1, 5.0]} kijk={[0, 1.6, -0.2]} over={<JaarLabel jaar="18 March 1582" sub="Antwerp" />}>
      <Tafel position={[-1.2, 0, -0.4]} b={2.2} d={1.0} />
      <Kaars position={[-1.2, 0.82, -0.4]} />
      <FiguurW {...W} position={[0.2, 0, -0.2]} rotation={[0, 0.5, 0]} pose={{ mond: 'lach' }} />
      <FiguurW kleding={{ ...GERARD, tuniek: '#3A3632' }} haar="kort" position={[ease(f, 0, 140, 3.0, 1.4), 0, 0.4]} rotation={[0, -1.3, 0]} pose={{ wenk: 0.5 }} />
    </Kamer>
  );
};

/** Het schot: een flits, rook. */
export const S_Schot = ({ delft = false }: { delft?: boolean }) => {
  const f = useCurrentFrame();
  const over = <div style={{ position: 'absolute', inset: 0, background: '#FFF4D8', opacity: f >= 10 && f < 18 ? 0.8 * (1 - (f - 10) / 8) : 0 }} />;
  const inhoud = (
    <>
      <FiguurW kleding={GERARD} haar="kort" position={[1.4, 0, 0.4]} rotation={[0, -1.3, 0]} pose={{ armR: wijs(1.5), wenk: 0.8 }} inHand={<Pistool />} />
      <Flits p={[0.6, 2.0, 0.4]} op={10} />
      {!delft && <FiguurW {...W} position={[-0.6, 0, 0]} rotation={[0, 0.5 + (f > 12 ? 0.4 : 0), f > 12 ? 0.12 : 0]} pose={{ wenk: f > 12 ? -0.6 : 0, mond: f > 12 ? 'open' : 'lach' }} />}
    </>
  );
  return delft ? (
    <Gang cam={[1.8, 2.2, 5.0, 1.6, 2.2, 4.8]} kijk={[0.4, 1.8, 0]} over={over}>{inhoud}</Gang>
  ) : (
    <Kamer avond cam={[1.8, 2.2, 5.0, 1.6, 2.2, 4.8]} kijk={[0.4, 1.8, 0]} over={over}>{inhoud}</Kamer>
  );
};

/** Willem in bed, met een verband, en Charlotte bij hem. */
export const S_Herstel = ({ charlotte = false }: { charlotte?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Kamer avond cam={[2.0, 2.5, 6.4, 1.4, 2.4, 5.4]} kijk={[0.2, 1.7, -0.2]} over={charlotte ? <Pijllabel tekst="Charlotte" x={1260} y={260} naar={[1060, 420]} vanaf={20} /> : <Stempel tekst="SURVIVED" vanaf={30} top={170} kleur="#4E9A4A" />}>
      <Bed position={[-0.6, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} />
      <FiguurW kleding={{ ...W.kleding, cape: undefined }} baard snor hoofdExtra={<><Kraag /><Verband /></>} position={[-0.3, 0, 0.2]} pose={{ wenk: -0.3 }} />
      {charlotte && (
        <>
          <FiguurW kleding={CHARLOTTE} haar="lang" position={[0.9, 0, 0]} rotation={[0, -0.8, 0]} pose={{ armR: wijs(0.9), wenk: -0.5, ogen: f > 80 && f < 90 ? 'dicht' : 'open' }} />
          <Kaars position={[1.6, 0, -0.8]} />
          <Zweet p={[1.1, 2.4, 0.1]} n={2} />
        </>
      )}
    </Kamer>
  );
};

/** De lege stoel met Charlottes witte sjaal. */
export const S_Charlotte = () => (
  <Kamer avond cam={[1.8, 2.3, 6.0, 1.2, 2.2, 5.0]} kijk={[-0.5, 1.4, -0.3]} over={<JaarLabel jaar="May 1582" sub="Charlotte dies" />}>
    <Stoel position={[0, 0, -0.2]} />
    <Blok p={[0, 0.95, -0.42]} s={[0.56, 0.5, 0.04]} c="#F2EEE6" />
    <Kaars position={[0.8, 0, 0.2]} />
    <FiguurW {...W} position={[-1.4, 0, -0.4]} rotation={[0, 0.7, 0]} pose={{ traan: 1, wenk: -0.8, hoofd: [0.3, 0, 0] }} />
  </Kamer>
);

/** Delft: het Prinsenhof aan de gracht. */
export const S_Prinsenhof = () => (
  <Straat zaad={5} cam={[3, 2.6, 10, 2.2, 2.6, 8.6]} kijk={[0, 3, -6]} over={<JaarLabel jaar="1584" sub="the Prinsenhof, Delft" />}>
    <Blok p={[0, 3, -8]} s={[12, 6, 3]} c="#9A5A40" />
    <Blok p={[0, 6.6, -8]} s={[12.4, 1.2, 3.4]} c="#3A3E46" />
    {[-4, -2, 2, 4].map((x) => [1.8, 4].map((y) => <Blok key={`${x}${y}`} p={[x, y, -6.48]} s={[1.0, 1.4, 0.04]} c="#E9DFC8" />))}
    <Blok p={[0, 1.2, -6.48]} s={[1.4, 2.4, 0.04]} c="#3A2A1C" />
    <Blok p={[0, 0.01, -3.5]} s={[30, 0.05, 2]} c="#4A6A7A" />
  </Straat>
);

/** Gérard, de stille jongeman, buigt. */
export const S_Gerard = ({ beloning = false }: { beloning?: boolean }) => (
  <Gang cam={beloning ? [0.6, 2.2, 3.0, 0.4, 2.15, 2.5] : [1.6, 2.2, 5.6, 1.1, 2.1, 4.8]} kijk={[0, 1.9, -0.2]} over={beloning ? <LangTeller label="He wants" waarde="the reward" pil="25,000 crowns" /> : <Pijllabel tekst="Balthasar Gérard" x={1300} y={260} naar={[1080, 420]} vanaf={20} />}>
    <FiguurW kleding={GERARD} haar="kort" position={[beloning ? 0 : 0.6, 0, -0.2]} rotation={[0, beloning ? 0 : -0.6, 0]} pose={{ hoofd: [beloning ? 0 : 0.4, 0, 0], wenk: beloning ? 0.8 : 0, mond: 'dicht' }} />
    {!beloning && <FiguurW {...W} position={[-0.8, 0, -0.4]} rotation={[0, 0.6, 0]} pose={{ mond: 'lach', armR: wijs(0.8) }} />}
  </Gang>
);

/** 10 juli 1584: Willem komt de eetkamer uit. */
export const S_TienJuli = () => {
  const f = useCurrentFrame();
  return (
    <Gang cam={[2.0, 2.2, 6.0, 1.4, 2.1, 5.2]} kijk={[0, 1.6, -0.6]} over={<JaarLabel jaar="10 July 1584" sub="Delft" />}>
      <FiguurW {...W} position={[ease(f, 0, 140, -1.2, 0.4), 0, -0.6]} rotation={[0, 1.2, 0]} />
    </Gang>
  );
};

/** De schaduw onderaan de trap. */
export const S_Trap = () => (
  <Gang cam={[0.4, 1.6, 5.0, 0.6, 1.8, 4.2]} kijk={[2.2, 1.2, -0.6]}>
    <FiguurW kleding={GERARD} haar="kort" position={[2.0, 0, 0.4]} rotation={[0, -1.0, 0]} pose={{ wenk: 0.8, armR: { schouder: [-0.3, 0, -0.1], elleboog: [0, -0.8] } }} inHand={<Pistool />} />
  </Gang>
);

/** De laatste woorden. */
export const S_Woorden = () => (
  <Gang cam={[1.0, 1.4, 4.0, 0.7, 1.3, 3.4]} kijk={[0, 0.8, -0.6]} over={<Citaat tekst="My God, have pity on my soul, and on this poor people." wie="William's last words, according to tradition" />}>
    <group position={[-0.3, 0.02, 0.2]} rotation={[0.1, 0.6, 0.1]}>
      <group position={[0, -0.72, 0]}>
        <Blok p={[0, 0.76, -0.02]} s={[0.74, 0.1, 0.7]} c="#151210" />
        <Blok p={[0.05, 0.84, -0.05]} s={[0.6, 0.08, 0.56]} c="#151210" />
      </group>
    </group>
  </Gang>
);

/** De kogelgaten vandaag, met een bordje. */
export const S_Vandaag = () => (
  <Gang donker={false} nu cam={[1.2, 2.0, 4.2, 0.8, 1.9, 3.4]} kijk={[0.1, 1.7, -1.5]} over={<Pijllabel tekst="still in the wall today" x={1340} y={300} naar={[1020, 430]} vanaf={20} />} />
);

/* ================= IX · Father of the Fatherland ================= */

export const S_Schulden = () => (
  <Kamer cam={[1.4, 2.0, 4.6, 0.9, 1.9, 3.8]} kijk={[0, 1.0, 0.2]} over={<LangTeller label="Age 51" waarde="deep in debt" pil="your fortune went to the war" />}>
    <Tafel position={[0, 0, 0.3]} b={2.0} d={1.0} />
    {Array.from({ length: 9 }, (_, i) => <Blok key={i} p={[-0.5 + (i % 3) * 0.4, 0.85 + Math.floor(i / 3) * 0.03, 0.2 + (i % 2) * 0.1]} s={[0.34, 0.02, 0.44]} r={[0, i * 0.3, 0]} c="#E6D8B8" />)}
    <Kist position={[1.6, 0, 0.2]} open={1} vol={false} />
  </Kamer>
);

export const S_Oorlog = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Veld tijd="grijs" cam={[6, 3.2, 14, 4.4, 3.0, 12]} kijk={[0, 2.0, -4]} over={<TelTeller label="The war goes on" van={0} tot={64} a={6} b={70} na=" years" pil="after your death" />}>
      <Leger rijen={3} kolommen={10} position={[0, 0, -3]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Leger rijen={3} kolommen={9} position={[0, 0, -14]} rotation={[0, Math.PI, 0]} kleur="#8E2A22" schild="#D8A945" t={t} />
    </Veld>
  );
};

export const S_Vrede = () => (
  <KaartN van={N_OPSTAND} cam={[N_VER, N_LAGE]} licht={['Netherlands']} over={<JaarLabel jaar="1648" sub="the Dutch Republic is free" />} />
);

export const S_Vader = () => (
  <Straat tijd="avond" zaad={5} cam={[4, 2.6, 13, 3, 3.0, 11]} kijk={[0, 3.6, -3]} over={<LangTeller label="The Dutch call you" waarde="Father of the Fatherland" pil="Vader des Vaderlands" />}>
    <Standbeeld position={[0, 0, -3]} />
    <pointLight position={[2, 6, 1]} intensity={10} distance={12} color="#FFD8A0" />
  </Straat>
);

export const S_Huis = () => (
  <HofZaal cam={[1.2, 2.2, 5.0, 0.8, 2.1, 4.2]} kijk={[0, 1.6, -1.6]} over={<LangTeller label="Still on the throne" waarde="the House of Orange" pil="Orange-Nassau" />}>
    <Blok p={[0, 0.5, -1.6]} s={[0.9, 1.0, 0.9]} c="#7A1E22" />
    <Blok p={[0, 1.04, -1.6]} s={[0.7, 0.1, 0.7]} c="#8E2A28" />
    <group position={[0, 1.1, -1.6]}><Kroon /></group>
    <Prinsenvlag position={[-1.8, 0, -2.2]} h={3.8} />
  </HofZaal>
);

export const S_Oranjefeest = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat zaad={2} cam={[3, 2.6, 10, 2.4, 2.8, 8.6]} kijk={[0, 1.8, -2]} over={<LangTeller label="King's Day" waarde="everyone in orange" />}>
      {Array.from({ length: 24 }, (_, i) => {
        const x = (i % 8) * 1.0 - 3.5 + (Math.floor(i / 8) % 2) * 0.4;
        const z = -0.5 - Math.floor(i / 8) * 1.4;
        return <Figuur key={i} kleding={{ ...BURGER, tuniek: ORANJE, rok: ORANJE, benen: '#2A2A3A' }} haar={i % 3 ? 'kort' : 'lang'} position={[x, Math.abs(Math.sin(t * 5 + i)) * 0.14, z]} pose={{ armR: i % 2 ? omhoog() : undefined, mond: 'lach' }} />;
      })}
      <Prinsenvlag position={[-4.5, 0, -4]} t={t} h={5} />
    </Straat>
  );
};

export const S_Wortels = () => {
  const f = useCurrentFrame();
  return (
    <Kamer cam={[0.9, 1.6, 2.8, 0.6, 1.5, 2.2]} kijk={[0, 0.9, 0.3]} over={<Stempel tekst="PROBABLY A MYTH" vanaf={60} top={160} />}>
      <Tafel position={[0, 0, 0.3]} b={1.8} d={0.9} />
      {Array.from({ length: 7 }, (_, i) => <Wortel key={i} position={[-0.6 + i * 0.2, 0.88 + (i % 2) * 0.04, 0.3 + Math.sin(i) * 0.1]} rotation={[0, 0.3 + i * 0.25, 0]} />)}
      <Wolk p={[0.6, 1.6, 0.2]} tekst="for William?" b={1.1} h={0.34} vanaf={14} staart={-1} />
      {f < 0 && <Rol />}
    </Kamer>
  );
};

/** Slot: Willem te paard voor de molens in de avondzon. */
export const S_Slot = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <PolderSet tijd="avond" cam={[5, 2.6, 13, 3.8, 2.8, 11]} kijk={[0, 3.0, 0]}>
      <Leger rijen={3} kolommen={10} position={[-2, 0, -9]} kleur={ORANJE} schild="#2A4A9A" t={t} />
      <Prinsenvlag position={[-3.4, 0, -2.2]} t={t} />
      <Paard position={[0.8, 0, 0]} rotation={[0, Math.PI - 0.55, 0]} {...PAARD_W} t={t} ruiter={<Figuur {...W} pose={{ hoofd: [0, 0.3, 0], armR: omhoog(), mond: 'lach' }} />} />
    </PolderSet>
  );
};

export { MiniSchip, HoofdW, SPANJAARD, Leger };
