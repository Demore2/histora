import { useCurrentFrame } from 'remotion';
import { Kanon, Menigte, Tent } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, omhoog, wijs } from '../watals/Figuur';
import { JaarLabel, LangTeller } from './LangHud';
import { BoosTeken, Pijllabel, Stempel, TelTeller, Voorbehoud, Wolk, Zweet } from './LeonidasKit';
import { Citaat } from './SaladinScenes';
import { Hernoem } from './StalinKit';
import { TR_1913, TR_1918, TR_1923, TR_SEVRES } from './KaarttafelTR';
import {
  Alfabet, Anatolie, Biljet, Boek, Bord, BRIT_P, BURGER_FEZ_P, BURGER_HOED_P, BURGER2_FEZ_P, BURGER2_HOED_P, ease, FiguurA, Flits, FPS, Geweer, GRIEK_P,
  Granaat, Haven, Huisje, Kaars, KaartT, KaartVlag, Klok, kpT, Krijtbord, Lamp, LATIFE_P, lin, MAARSCHALK_P, Mausoleum, MiniGriek, MiniKemal, OFF_P,
  Oorlogsschip, Ossenkar, Paard, PANAMA_P, Papier, plT, PRES_P, SABIHA_P, Sirene, SOLDAAT_P, SOLDAAT2_P, Stoel, Stoomschip, Straat, SULTAN_P, T_ANATOLIE,
  T_VER, Tafel, TurkseVlag, Tweedekker, VROUW_P, VROUW2_P, Wagen, Werkkamer, Zaal, ZUBEYDE_OUD_P, KIND2_P, MEISJE_P, Dolmabahce,
} from './AtaturkKit';

/**
 * Scènes voor "What if you were Mustafa Kemal Atatürk?" deel 2: hoofdstuk V-IX en het slot.
 */

const t30 = (f: number) => f / FPS;
const ROOD = '#D0262E';
const GRIEKS = '#3E6FA8';

/* ================= V · Samsun ================= */

export const S_Verloren = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat tijd="grijs" cam={[2.4, 2.0, 8, 1.8, 2.0, 7]} kijk={[0, 2.2, -2]} over={<JaarLabel jaar="1918" sub="the empire loses the war" />}>
      <group position={[0, -lin(f, 10, 120, 0, 2.4), -2]}><TurkseVlag position={[0, 0, 0]} t={t} h={4.6} /></group>
      <Blok p={[0, 2.3, -2]} s={[0.1, 4.6, 0.1]} c="#4A3A2C" />
      {[-2.4, 2.4].map((x, i) => <FiguurA key={i} {...SOLDAAT_P} position={[x, 0, -0.6]} rotation={[0, x > 0 ? -0.5 : 0.5, 0]} pose={{ wenk: -0.6, hoofd: [0.3, 0, 0] }} />)}
    </Straat>
  );
};

export const S_Vloot = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Haven tijd="grijs" stad="paleis" cam={[10, 5, 22, 8, 4.6, 19]} kijk={[0, 2, -16]} over={<Pijllabel tekst="Allied warships" x={600} y={300} naar={[820, 520]} vanaf={20} />}>
      {[0, 1, 2, 3].map((i) => <Oorlogsschip key={i} position={[-18 + i * 12, 0, -10 - (i % 2) * 4]} rotation={[0, 0.1 * (i % 2 ? 1 : -1), 0]} t={t + i} vlag={['#2A3E7A', '#3E6FA8', '#2A3E7A', '#5E8A5A'][i]} />)}
    </Haven>
  );
};

export const S_Geldikleri = () => {
  const f = useCurrentFrame();
  return (
    <Haven tijd="grijs" stad="istanbul" cam={[1.8, 2.4, 5.4, 1.3, 2.4, 4.8]} kijk={[0, 2.4, 0]} over={<Citaat tekst="They will leave the way they came." wie="according to tradition, 13 November 1918" />}>
      <Blok p={[0, 0.2, 2]} s={[30, 0.8, 6]} c="#9A9480" />
      <FiguurA {...OFF_P} position={[-1.3, 0.6, 0.2]} rotation={[0, Math.PI - 1.0, 0]} pose={{ wenk: 0.6 }} />
      <Oorlogsschip position={[-8, 0, -14]} t={t30(f)} />
    </Haven>
  );
};

export const S_KaartVerdeling = () => (
  <KaartT van={TR_1918} naar={TR_SEVRES} wissel={[30, 80]} cam={[T_VER, T_ANATOLIE]} over={<LangTeller label="Dividing the empire" waarde="4 powers" pil="Britain, France, Italy, Greece" />} />
);

export const S_KaartIzmir = () => (
  <KaartT van={TR_1918} cam={[kpT('izmir', 11, 7), kpT('izmir', 8, 5.5)]} spelden={[['izmir', GRIEKS]]} routes={[{ punten: [[23.7, 37.9], [25.5, 38.3], plT('izmir')], kleur: GRIEKS }]} kop={<MiniGriek />} over={<JaarLabel jaar="May 1919" sub="Greek troops land in Izmir" />} />
);

export const S_Sultan = () => (
  <Zaal kleur="#E2D2B4" loper cam={[2.2, 2.1, 6.6, 1.4, 2.0, 5.6]} kijk={[0, 1.5, -2]} over={<Pijllabel tekst="keep the throne" x={1360} y={300} naar={[1000, 500]} vanaf={30} />}>
    <Stoel position={[0, 0, -2.6]} kleur="#8A6A2A" />
    <FiguurA {...SULTAN_P} position={[0, 0.1, -2.4]} pose={{ wenk: -0.3, hoofd: [0.1, -0.3, 0] }} />
    <FiguurA {...BRIT_P} position={[-1.0, 0, -2.0]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(0.8), mond: 'open' }} />
  </Zaal>
);

export const S_Opdracht = () => (
  <Zaal kleur="#E2D2B4" loper cam={[1.6, 1.8, 5.0, 1.0, 1.8, 4.2]} kijk={[0, 1.4, -1.6]} over={<Pijllabel tekst="go and disband the army" x={1380} y={300} naar={[1000, 520]} vanaf={24} />}>
    <FiguurA {...SULTAN_P} position={[-0.8, 0, -1.8]} rotation={[0, 0.8, 0]} pose={{ armR: { schouder: [-1.3, 0, 0.2], elleboog: [0, -0.2] } }} inHand={<Blok p={[0, -0.1, 0.12]} s={[0.32, 0.02, 0.24]} c="#F2EAD8" />} />
    <FiguurA {...OFF_P} position={[0.8, 0, -1.6]} rotation={[0, -0.8, 0]} pose={{ wenk: 0.3 }} />
  </Zaal>
);

export const S_Samsun = () => {
  const f = useCurrentFrame();
  return (
    <Haven tijd="ochtend" stad="klein" cam={[8, 3.4, 14, 6, 3, 12]} kijk={[0, 1.6, -10]} over={<JaarLabel jaar="19 May 1919" sub="Samsun, on the Black Sea" />}>
      <Stoomschip position={[-12 + lin(f, 0, 150, 0, 8), 0, -10]} t={t30(f)} />
    </Haven>
  );
};

export const S_Tegendeel = () => (
  <Haven tijd="ochtend" stad="klein" cam={[2.4, 3.3, 7.6, 1.8, 3.3, 6.8]} kijk={[0, 3.4, -1]} over={<Hernoem oud="DISBAND THE ARMY" nieuw="BUILD A NEW ONE" />}>
    <Blok p={[0, 0.2, 2]} s={[30, 0.8, 6]} c="#9A9480" />
    <FiguurA {...OFF_P} position={[0, 0.6, 0.4]} rotation={[0, 0.3, 0]} pose={{ wenk: 0.5, mond: 'lach' }} />
  </Haven>
);

export const S_KaartTelegram = () => (
  <KaartT van={TR_SEVRES} cam={[kpT('samsun', 11, 7), { ...T_ANATOLIE, lon: 37, lat: 40 }]} spelden={[['samsun', ROOD], ['amasya', ROOD], ['erzurum', ROOD], ['sivas', ROOD]]} routes={[{ punten: [plT('samsun'), plT('amasya'), plT('erzurum'), plT('sivas'), plT('ankara')] }]} routeTijd={[10, 140]} kop={<MiniKemal />} over={<LangTeller label="Telegrams" waarde="town by town" pil="Amasya, Erzurum, Sivas" />} />
);

export const S_Wil = () => {
  const f = useCurrentFrame();
  return (
    <Anatolie cam={[3, 2.6, 9, 2.2, 2.6, 7.6]} kijk={[0, 2.7, -2]} over={<Citaat tekst="The nation's independence will be saved by the nation's own will." wie="the Amasya Circular, June 1919" />}>
      <Menigte n={12} z={-2.6} x0={-6} t={t30(f)} />
      <FiguurA {...OFF_P} position={[0, 0.6, 0]} rotation={[0, Math.PI, 0]} pose={{ armR: omhoog(), mond: 'open' }} />
      <Blok p={[0, 0.3, 0]} s={[1.6, 0.6, 1.2]} c="#6B4A2E" />
    </Anatolie>
  );
};

export const S_Ontslag = () => (
  <Werkkamer cam={[1.8, 2.2, 5.6, 1.2, 2.1, 4.8]} kijk={[0, 1.4, -0.2]} over={<Stempel tekst="RESIGNED" vanaf={40} top={620} kleur="#2A3A5A" />}>
    <Papier position={[0, 0.84, 0.3]} rotation={[-Math.PI / 2, 0, 0]} regels={['RESIGNATION']} b={0.7} h={0.36} />
    <Blok p={[0.6, 0.86, 0.1]} s={[1.0, 0.06, 0.08]} r={[0, 0.3, 0]} c="#C9CDD2" metal={0.8} />
    <FiguurA {...OFF_P} kleding={{ ...OFF_P.kleding, tuniek: '#3A3430', benen: '#3A3430' }} position={[0, 0, -0.6]} pose={{ hoofd: [0.3, 0, 0], wenk: 0.3 }} />
  </Werkkamer>
);

export const S_Doodvonnis = () => (
  <Werkkamer nacht cam={[1.8, 2.2, 5.6, 1.2, 2.1, 4.8]} kijk={[0, 1.4, -0.2]} over={<Stempel tekst="SENTENCED TO DEATH" vanaf={20} top={620} />}>
    <Papier position={[0, 0.84, 0.3]} rotation={[-Math.PI / 2, 0, 0]} regels={['ISTANBUL', 'GAZETTE']} b={0.7} h={0.5} fontPx={60} />
    <FiguurA {...OFF_P} position={[0, 0, -0.6]} pose={{ hoofd: [0.3, 0, 0], wenk: 0.2, ...ARMEN_GEKRUIST }} />
  </Werkkamer>
);

export const S_Ankara = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat stof moskee={false} cam={[4, 2.4, 11, 3, 2.2, 9.4]} kijk={[0, 2, -3]} over={<JaarLabel jaar="23 April 1920" sub="a new parliament in Ankara" />}>
      <group position={[0, 0, -2.4]}>
        <Blok p={[0, 2.2, 0]} s={[9, 4.4, 4]} c="#C9A884" rough={1} />
        <Blok p={[0, 4.6, 0]} s={[9.6, 0.5, 4.6]} c="#9A4A34" />
        {[-3, -1, 1, 3].map((x) => <Blok key={x} p={[x, 3.0, 2.02]} s={[0.9, 1.2, 0.04]} c="#3A2A20" />)}
        <Blok p={[0, 1.1, 2.02]} s={[1.4, 2.2, 0.04]} c="#4A3020" />
      </group>
      <TurkseVlag position={[0, 4.9, -2.4]} t={t} h={2.6} />
      <Menigte n={10} z={1} x0={-5} t={t} juich />
    </Straat>
  );
};

export const S_Sevres = () => (
  <KaartT van={TR_1918} naar={TR_SEVRES} wissel={[10, 50]} cam={[T_ANATOLIE, { ...T_ANATOLIE, h: 10 }]} licht={['Turkey']} over={<><JaarLabel jaar="1920" sub="the Treaty of Sèvres" /><Stempel tekst="DIVIDED" vanaf={60} top={330} /></>} />
);

export const S_TweeRegeringen = () => {
  const label = (tekst: string, links: boolean) => (
    <div style={{ position: 'absolute', top: 180, [links ? 'left' : 'right']: 140, fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 56, color: '#FFF4E0', WebkitTextStroke: '2px #4A2A0C', textShadow: '0 6px 18px rgba(0,0,0,0.7)' }}>{tekst}</div>
  );
  return (
    <Anatolie cam={[0, 1.9, 7.4, 0, 1.9, 6.8]} kijk={[0, 1.4, 0]} over={<>{label('ISTANBUL', true)}{label('ANKARA', false)}</>}>
      <FiguurA {...SULTAN_P} position={[-2, 0, 0]} rotation={[0, 0.5, 0]} pose={{ wenk: 0.3 }} />
      <FiguurA {...OFF_P} position={[2, 0, 0]} rotation={[0, -0.5, 0]} pose={{ wenk: 0.5, ...ARMEN_GEKRUIST }} />
      <Blok p={[0, 1.5, 0]} s={[0.06, 3, 0.06]} c="#2A1E16" />
    </Anatolie>
  );
};

/* ================= VI · Independence ================= */

export const S_KaartOpmars = () => (
  <KaartT van={TR_SEVRES} cam={[kpT('izmir', 12, 8), T_ANATOLIE]} spelden={[['ankara', ROOD], ['izmir', GRIEKS]]} routes={[{ punten: [plT('izmir'), [29.0, 38.7], plT('dumlupinar'), [31.2, 39.4], plT('sakarya')], kleur: GRIEKS }]} routeTijd={[10, 130]} kop={<MiniGriek />} over={<JaarLabel jaar="1921" sub="the Greek army marches on Ankara" />} />
);

export const S_Tekort = () => (
  <Anatolie tijd="grijs" cam={[2.4, 1.6, 6.4, 1.6, 1.6, 5.4]} kijk={[0, 1.0, -1]} over={<><LangTeller label="Short of" waarde="everything" pil="guns, boots, food" /><Pijllabel tekst="no boots" x={1180} y={760} naar={[1010, 900]} vanaf={40} /></>}>
    {[-1.6, 0, 1.6].map((x, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} kleding={{ ...SOLDAAT_P.kleding, schoenen: '#D8A880' }} position={[x, 0, -0.6]} pose={{ wenk: -0.4, hoofd: [0.3, 0, 0] }} />)}
    <Blok p={[0, 0.2, 0.8]} s={[0.8, 0.4, 0.6]} c="#6B4A2E" />
  </Anatolie>
);

export const S_Vrouwen = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Anatolie tijd="grijs" sneeuw cam={[5, 2.2, 10, 3.6, 2.0, 8.6]} kijk={[0, 1.3, -1]} over={<Pijllabel tekst="women carry the shells" x={1380} y={300} naar={[1060, 520]} vanaf={30} />}>
      <Ossenkar position={[-4 + lin(f, 0, 150, 0, 2.4), 0, -1.6]} t={t} />
      {[0, 1, 2].map((i) => <FiguurA key={i} {...(i % 2 ? VROUW2_P : VROUW_P)} position={[-1 + i * 1.5 + lin(f, 0, 150, 0, 2.4), 0, 0.4]} rotation={[0, Math.PI / 2, 0]} pose={{ armR: { schouder: [-2.6, 0, -0.2], elleboog: [0, -0.6] }, armL: { schouder: [-2.6, 0, 0.2], elleboog: [0, 0.6] } }} extra={<Granaat position={[0, 2.85, 0]} rotation={[0, 0, Math.PI / 2]} />} />)}
    </Anatolie>
  );
};

export const S_Rib = () => {
  const f = useCurrentFrame();
  return (
    <Anatolie cam={[2.4, 1.6, 6.2, 1.6, 1.5, 5.2]} kijk={[0, 0.9, -1]} over={<><JaarLabel jaar="August 1921" sub="commander-in-chief" /><Pijllabel tekst="broken rib" x={1300} y={420} naar={[1010, 700]} vanaf={40} /></>}>
      <Paard position={[1.6, 0, -1.6]} rotation={[0, -0.6, 0]} kleur="#2A1E16" manen="#1A1310" dek="#7A2A24" t={t30(f)} />
      <group position={[-0.4, 0.35, 0]} rotation={[0, 0.3, 0]}>
        <Figuur {...MAARSCHALK_P} pose={{ wenk: 0.8, mond: 'open', armR: { schouder: [-0.6, 0, 0.7], elleboog: [0, -1.3] } }} position={[0, -0.35, 0]} rotation={[-0.2, 0, 0.15]} />
      </group>
      <Zweet p={[-0.2, 2.3, 0.2]} n={2} />
    </Anatolie>
  );
};

export const S_Hoofdkwartier = () => (
  <Anatolie tijd="avond" cam={[2.6, 2.8, 6.6, 1.8, 2.6, 5.8]} kijk={[0, 1.3, -0.8]} over={<LangTeller label="Sakarya" waarde="HQ" pil="commanding in pain" />}>
    <Tent position={[0, 0, -3.4]} kleur="#C9B48E" />
    <Tafel position={[0, 0, -0.4]} b={2.0} d={1.2} kleur="#5A3B24" />
    <Papier position={[0, 0.84, -0.4]} rotation={[-Math.PI / 2, 0, 0]} regels={['SAKARYA']} b={1.6} h={1.0} kleur="#E8D8B0" fontPx={50} />
    <Lamp position={[0.7, 0.82, -0.6]} aan />
    <FiguurA {...MAARSCHALK_P} position={[0, 0, -1.3]} pose={{ armR: wijs(0.6), armL: { schouder: [-0.4, 0, 0.6], elleboog: [0, -1.2] }, wenk: 0.6, hoofd: [0.3, 0, 0] }} />
    {[-1.3, 1.3].map((x, i) => <FiguurA key={i} {...OFF_P} oogKleur={undefined} snor={i === 0} kleding={{ ...OFF_P.kleding, haar: '#2A1E16' }} position={[x, 0, -1.0]} rotation={[0, x > 0 ? -0.7 : 0.7, 0]} pose={{ hoofd: [0.3, 0, 0] }} />)}
  </Anatolie>
);

export const S_Vlak = () => (
  <KaartT van={TR_SEVRES} cam={[T_ANATOLIE, { ...T_ANATOLIE, h: 14, a: 8 }]} licht={['Turkey']} over={<Citaat tekst="There is no line of defence. There is a surface of defence. That surface is the whole country." wie="Mustafa Kemal, 1921" />} />
);

export const S_Sakarya = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Anatolie tijd="avond" cam={[6, 3, 14, 4.6, 2.8, 12]} kijk={[0, 1.4, -4]} over={<TelTeller label="Battle of Sakarya" van={1} tot={22} a={6} b={90} na=" days" pil="August - September 1921" />}>
      {Array.from({ length: 10 }, (_, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[-6 + i * 1.3, 0, 0]} rotation={[0, Math.PI, 0]} inHand={<Geweer />} />)}
      {Array.from({ length: 6 }, (_, i) => <Flits key={i} p={[-8 + i * 3.2, 1.4, -10 - (i % 2) * 2]} op={12 + i * 13} />)}
      <TurkseVlag position={[5, 0, -0.6]} t={t} />
    </Anatolie>
  );
};

export const S_Keert = () => (
  <KaartT van={TR_SEVRES} cam={[T_ANATOLIE, kpT('izmir', 12, 8)]} spelden={[['ankara', ROOD], ['sakarya', ROOD]]} routes={[{ punten: [plT('sakarya'), [31.2, 39.4], plT('dumlupinar')], kleur: GRIEKS }]} routeTijd={[10, 120]} kop={<MiniGriek />} over={<JaarLabel jaar="September 1921" sub="the Greek army turns back" />} />
);

export const S_Gazi = () => {
  const f = useCurrentFrame();
  return (
    <Zaal kleur="#D8C8A8" cam={[2.4, 3.8, 7.0, 1.8, 3.6, 6.2]} kijk={[0, 1.5, -2.6]} over={<LangTeller label="Your new title" waarde="Gazi" pil="the veteran, and marshal" />}>
      <FiguurA {...MAARSCHALK_P} position={[0, 0, -2.6]} pose={{ mond: 'lach' }} />
      {Array.from({ length: 8 }, (_, i) => <FiguurA key={i} {...(i % 2 ? BURGER_FEZ_P : BURGER2_FEZ_P)} position={[i < 4 ? -4.6 + i * 0.8 : 2.2 + (i - 4) * 0.8, 0, -0.6 + (i % 2) * 0.6]} rotation={[0, Math.PI + (i < 4 ? -0.5 : 0.5), 0]} pose={{ armR: { schouder: [-1.4 + Math.sin(f / 3 + i) * 0.2, 0, 0.3], elleboog: [0, -0.9] }, armL: { schouder: [-1.4 - Math.sin(f / 3 + i) * 0.2, 0, -0.3], elleboog: [0, 0.9] } }} />)}
    </Zaal>
  );
};

export const S_Opbouw = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Anatolie tijd="ochtend" cam={[5, 2.4, 12, 3.6, 2.2, 10]} kijk={[0, 1.4, -3]} over={<TelTeller label="Rebuilding the army" van={0} tot={12} a={6} b={80} na=" months" pil="in silence" />}>
      {Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, c) => <FiguurA key={`${r}${c}`} {...(c % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[-4.5 + c * 1.3, Math.abs(Math.sin(t * 6 + c)) * 0.05, -4 + r * 1.4]} rotation={[0, Math.PI / 2, 0]} inHand={<Geweer />} />))}
      <FiguurA {...MAARSCHALK_P} position={[5, 0, 0]} rotation={[0, -1.2, 0]} pose={{ ...ARMEN_GEKRUIST }} />
    </Anatolie>
  );
};

export const S_Aanval = () => {
  const f = useCurrentFrame();
  return (
    <Anatolie tijd="ochtend" cam={[4, 2.0, 10, 3, 1.9, 8.6]} kijk={[0, 1.2, -3]} over={<JaarLabel jaar="26 August 1922" sub="Dumlupınar" />}>
      {Array.from({ length: 10 }, (_, i) => <FiguurA key={i} {...(i % 2 ? SOLDAAT_P : SOLDAAT2_P)} position={[-6 + i * 1.3, 0, 0.4 + (i % 2) * 0.5]} rotation={[0, Math.PI, 0]} inHand={<Geweer />} />)}
      {[0, 1, 2].map((i) => <Flits key={i} p={[-4 + i * 4, 1.2, -2.4]} op={10 + i * 12} groot={1.4} />)}
      {[0, 1, 2].map((i) => <Flits key={`v${i}`} p={[-6 + i * 6, 3, -30]} op={30 + i * 14} groot={3} />)}
    </Anatolie>
  );
};

export const S_KaartDoorbraak = () => (
  <KaartT van={TR_SEVRES} naar={TR_1923} wissel={[60, 130]} cam={[kpT('dumlupinar', 11, 7), kpT('izmir', 10, 7)]} spelden={[['dumlupinar', ROOD], ['izmir', ROOD]]} routes={[{ punten: [plT('dumlupinar'), [28.6, 38.6], plT('izmir')] }]} routeTijd={[10, 110]} kop={<MiniKemal />} over={<JaarLabel jaar="August 1922" sub="the front breaks" />} />
);

export const S_Middellandse = () => (
  <Anatolie tijd="ochtend" cam={[2.0, 2.4, 6.0, 1.4, 2.4, 5.2]} kijk={[0, 2.5, -0.6]} over={<Citaat tekst="Armies, your first goal is the Mediterranean. Forward!" wie="Mustafa Kemal, 1 September 1922" />}>
    <FiguurA {...MAARSCHALK_P} position={[0, 0, 0]} rotation={[0, -0.8, 0]} pose={{ armR: wijs(1.8), mond: 'open', wenk: 0.5 }} />
  </Anatolie>
);

export const S_Izmir = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Haven stad="klein" cam={[6, 3.2, 14, 4.6, 3, 12]} kijk={[0, 1.9, -1]} over={<JaarLabel jaar="9 September 1922" sub="Izmir" />}>
      <Blok p={[0, 0.2, 2]} s={[40, 0.8, 8]} c="#9A9480" />
      {[0, 1, 2, 3].map((i) => <Paard key={i} position={[-8 + i * 2.6 + lin(f, 0, 150, 0, 6), 0.6, 1.2 + (i % 2) * 1.2]} rotation={[0, Math.PI / 2, 0]} kleur={['#5A3B24', '#2A1E16', '#7A5A3A', '#3A2A20'][i]} dek="#7A2A24" t={t + i * 0.3} loopt ruiter={<Figuur {...SOLDAAT2_P} levend={false} />} />)}
      <TurkseVlag position={[-3 + lin(f, 0, 150, 0, 6), 0.6, 0.4]} t={t} h={4.4} />
    </Haven>
  );
};

export const S_Gewonnen = () => (
  <Haven tijd="avond" stad="geen" cam={[3.4, 2.4, 8.0, 2.6, 2.4, 7.2]} kijk={[0, 2.0, -1]} over={<Stempel tekst="THE WAR IS WON" vanaf={20} top={620} kleur="#D0262E" />}>
    <Blok p={[0, 0.2, 2]} s={[30, 0.8, 6]} c="#9A9480" />
    <FiguurA {...MAARSCHALK_P} position={[0, 0.6, 0.6]} rotation={[0, Math.PI + 0.3, 0]} />
    <TurkseVlag position={[1.6, 0.6, 0]} t={t30(useCurrentFrame())} h={4} />
  </Haven>
);

/* ================= VII · The Republic ================= */

const Parlement = ({ kleuren = false, children, over, kijk = [0, 1.4, -2.6] as const }: { kleuren?: boolean; children?: React.ReactNode; over?: React.ReactNode; kijk?: readonly [number, number, number] }) => {
  const f = useCurrentFrame();
  return (
    <Zaal kleur="#D8C8A8" cam={[0.6, 4.4, 8.4, 0.4, 4.2, 7.6]} kijk={[...kijk]} over={over}>
      {Array.from({ length: 12 }, (_, i) => (
        <FiguurA key={i} {...(kleuren ? (i % 2 ? BURGER_HOED_P : BURGER2_HOED_P) : i % 2 ? BURGER_FEZ_P : BURGER2_FEZ_P)} hoofdExtra={kleuren ? undefined : (i % 2 ? BURGER_FEZ_P : BURGER2_FEZ_P).hoofdExtra} position={[(i % 6 < 3 ? -4.6 + (i % 6) * 1.0 : 1.8 + ((i % 6) - 3) * 1.0), 0, -0.6 + Math.floor(i / 6) * 1.4]} rotation={[0, Math.PI + (i % 6 < 3 ? -0.4 : 0.4), 0]} pose={{ armR: f > 30 && !kleuren ? omhoog() : undefined }} />
      ))}
      <TurkseVlag position={[-3, 0, -3.4]} t={f / FPS} h={3.4} />
      {children}
    </Zaal>
  );
};

export const S_Sultanaat = () => (
  <Parlement over={<><JaarLabel jaar="1 November 1922" sub="Grand National Assembly" /><Stempel tekst="SULTANATE ABOLISHED" vanaf={50} top={620} /></>}>
    <FiguurA {...MAARSCHALK_P} position={[1, 0, -2.6]} rotation={[0, 0, 0]} pose={{ armR: omhoog() }} />
  </Parlement>
);

export const S_SultanWeg = () => {
  const f = useCurrentFrame();
  return (
    <Haven tijd="ochtend" stad="istanbul" cam={[8, 3.4, 16, 6, 3, 14]} kijk={[0, 1.6, -10]} over={<JaarLabel jaar="17 November 1922" sub="the last Sultan leaves" />}>
      <Oorlogsschip position={[6 - lin(f, 0, 150, 0, 14), 0, -12]} rotation={[0, Math.PI, 0]} t={t30(f)} />
    </Haven>
  );
};

export const S_Lausanne = () => (
  <KaartT van={TR_SEVRES} naar={TR_1923} wissel={[20, 70]} cam={[T_VER, { ...T_ANATOLIE, h: 16, a: 9 }]} over={<JaarLabel jaar="1923" sub="the Treaty of Lausanne" />} />
);

export const S_Latife = () => (
  <Huisje rijk cam={[1.6, 1.8, 5.0, 1.0, 1.7, 4.2]} kijk={[0, 1.3, 0]} over={<LangTeller label="1923" waarde="Latife" pil="studied law in Europe" />}>
    <FiguurA {...MAARSCHALK_P} hoofdExtra={undefined} position={[-0.5, 0, 0]} rotation={[0, 0.4, 0]} pose={{ mond: 'lach' }} />
    <FiguurA {...LATIFE_P} position={[0.5, 0, 0]} rotation={[0, -0.4, 0]} pose={{ mond: 'lach' }} />
  </Huisje>
);

export const S_LatifePubliek = () => {
  const f = useCurrentFrame();
  return (
    <Straat cam={[3, 2.0, 9, 2.2, 1.9, 7.6]} kijk={[0, 1.4, -0.4]} over={<Pijllabel tekst="side by side, in public" x={1380} y={300} naar={[1010, 520]} vanaf={30} />}>
      <FiguurA {...PRES_P} kleding={{ ...PRES_P.kleding }} hoofdExtra={undefined} snor position={[-0.4, 0, 0]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach', armR: omhoog() }} />
      <FiguurA {...LATIFE_P} position={[0.4, 0, 0]} rotation={[0, -0.2, 0]} pose={{ mond: 'lach' }} />
      {[-3, -2, 2.4, 3.4].map((x, i) => <FiguurA key={i} {...(i % 2 ? BURGER_FEZ_P : BURGER2_FEZ_P)} position={[x, 0, -1.6]} rotation={[0, x > 0 ? -0.6 : 0.6, 0]} pose={{ mond: f > 30 ? 'open' : 'dicht', wenk: -0.3 }} />)}
    </Straat>
  );
};

export const S_Scheiding = () => (
  <Huisje rijk cam={[1.6, 1.8, 5.0, 1.0, 1.7, 4.2]} kijk={[0, 1.0, 0]} over={<LangTeller label="The marriage" waarde="2½ years" pil="divorced in 1925" />}>
    <Stoel position={[-1.2, 0, 0]} rotation={[0, 0.6, 0]} />
    <Stoel position={[1.2, 0, 0]} rotation={[0, -0.6, 0]} />
    <Kaars position={[0, 0, -1.2]} />
  </Huisje>
);

export const S_Republiek = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat tijd="nacht" stof moskee={false} cam={[4, 2.6, 11, 3, 2.4, 9.4]} kijk={[0, 2.4, -3]} over={<JaarLabel jaar="29 October 1923" sub="the Republic of Turkey" />}>
      {Array.from({ length: 8 }, (_, i) => <Flits key={i} p={[-8 + i * 2.3, 8 + (i % 3) * 2, -16]} op={6 + i * 12} groot={2.2} />)}
      <Menigte n={14} z={0} x0={-7} t={t} juich />
      <TurkseVlag position={[0, 0, -3]} t={t} h={5.4} />
    </Straat>
  );
};

export const S_President = () => (
  <Werkkamer cam={[1.6, 1.8, 5.0, 1.0, 1.7, 4.2]} kijk={[0, 1.3, -0.4]} over={<LangTeller label="First president" waarde="Ankara" pil="the new capital" />}>
    <FiguurA {...PRES_P} snor position={[0, 0, -0.7]} pose={{ mond: 'lach', armR: { schouder: [-1.0, 0, 0.1], elleboog: [0, -0.4] } }} />
  </Werkkamer>
);

export const S_Kalifaat = () => (
  <Parlement over={<><JaarLabel jaar="3 March 1924" sub="Grand National Assembly" /><Stempel tekst="CALIPHATE ABOLISHED" vanaf={50} top={620} kleur="#5A4A3A" /></>}>
    <Papier position={[1, 1.2, -2.4]} regels={['LAW 431']} b={0.7} h={0.4} />
  </Parlement>
);

/* ================= VIII · The great change ================= */

export const S_Alles = () => {
  const f = useCurrentFrame();
  return (
    <Werkkamer cam={[1.8, 1.9, 5.4, 1.2, 1.8, 4.6]} kijk={[0, 1.3, -0.4]} over={<Pijllabel tekst="everything, and fast" x={1380} y={300} naar={[1060, 520]} vanaf={20} />}>
      {Array.from({ length: 14 }, (_, i) => <Blok key={i} p={[Math.sin(i * 2.1) * (0.4 + lin(f, 0, 120, 0, 1.6)), 1.0 + ((t30(f) * 0.8 + i * 0.29) % 2.2), 0.4 + Math.cos(i * 1.7) * 0.5]} s={[0.3, 0.01, 0.4]} r={[f / 10 + i, i, 0]} c="#F2EAD8" />)}
      <FiguurA {...PRES_P} position={[0, 0, -0.7]} pose={{ armR: wijs(1.2), mond: 'open', wenk: 0.5 }} />
    </Werkkamer>
  );
};

export const S_Fez = () => {
  const f = useCurrentFrame();
  const hoed = f > 60;
  return (
    <Straat cam={[2.6, 1.9, 7.6, 1.8, 1.8, 6.6]} kijk={[0, 1.7, -0.6]} over={<><JaarLabel jaar="1925" sub="the Hat Law" /><Pijllabel tekst={hoed ? 'hat' : 'fez'} x={1300} y={300} naar={[1060, 480]} vanaf={10} /></>}>
      {[-1.6, 0, 1.6].map((x, i) => <FiguurA key={i} {...(hoed ? (i % 2 ? BURGER_HOED_P : BURGER2_HOED_P) : i % 2 ? BURGER_FEZ_P : BURGER2_FEZ_P)} position={[x, 0, -0.2]} rotation={[0, (1 - i) * 0.3, 0]} pose={{ armR: f > 40 && f < 70 ? { schouder: [-2.6, 0, -0.3], elleboog: [0, -1.2] } : undefined, mond: hoed ? 'lach' : 'dicht' }} />)}
    </Straat>
  );
};

export const S_Panama = () => {
  const f = useCurrentFrame();
  return (
    <Straat cam={[3, 2.0, 8.4, 2.2, 1.9, 7.2]} kijk={[0, 1.6, -0.6]} over={<LangTeller label="Kastamonu, 1925" waarde="Panama hat" pil="showing how it's done" />}>
      <FiguurA {...PANAMA_P} position={[0, 0, 0]} pose={{ mond: 'lach', armR: { schouder: [-2.6 + Math.sin(f / 6) * 0.3, 0, -0.3], elleboog: [0, -0.4] } }} />
      <Menigte n={10} z={-2.6} x0={-5} t={t30(f)} juich />
    </Straat>
  );
};

export const S_Wetten = () => (
  <Werkkamer vlag cam={[2.2, 2.2, 6.4, 1.6, 2.1, 5.6]} kijk={[0, 1.4, 0.4]} over={<JaarLabel jaar="1926" sub="the new Civil Code" />}>
    <Papier position={[0, 0.84, 0.3]} rotation={[-Math.PI / 2, 0, 0]} regels={['EQUAL', 'RIGHTS']} b={0.6} h={0.4} />
    <FiguurA {...LATIFE_P} kleding={{ ...LATIFE_P.kleding, tuniek: '#7A3A5A', rok: '#7A3A5A' }} position={[-0.6, 0, -0.6]} rotation={[0, 0.2, 0]} pose={{ mond: 'lach' }} />
    <FiguurA {...BURGER2_HOED_P} hoofdExtra={undefined} position={[0.6, 0, -0.6]} rotation={[0, -0.2, 0]} pose={{ mond: 'lach' }} />
  </Werkkamer>
);

export const S_Alfabet = () => (
  <Zaal cam={[1.8, 2.0, 6.4, 1.2, 1.9, 5.4]} kijk={[0, 1.4, -2]} over={<><JaarLabel jaar="1928" sub="a new alphabet" /><Alfabet /></>}>
    <Krijtbord position={[0, 0, -3.2]} regels={['A B C Ç D', 'E F G Ğ H']} />
  </Zaal>
);

export const S_Krijtbord = () => {
  const f = useCurrentFrame();
  return (
    <Anatolie cam={[3, 2.6, 9, 2.2, 2.4, 7.8]} kijk={[0, 1.5, -0.6]} grond="#8A9A5A" over={<Pijllabel tekst="teaching it yourself" x={1380} y={300} naar={[1080, 500]} vanaf={30} />}>
      <Krijtbord position={[0.8, 0, -1.2]} regels={['A B C Ç D', 'TÜRKİYE']} />
      <FiguurA {...PRES_P} snor position={[-0.6, 0, -0.8]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.4), mond: 'open' }} inHand={<Blok p={[0, -0.05, 0.12]} s={[0.04, 0.04, 0.16]} c="#F2F2EA" />} />
      {[-3, -2, -1, 1, 2, 3].map((x, i) => <FiguurA key={i} {...(i % 3 === 0 ? VROUW_P : i % 2 ? BURGER_HOED_P : KIND2_P)} position={[x > 0 ? 2.2 + x * 0.8 : -2.6 + x * 0.8, 0, 0.2 + (i % 2) * 0.9]} rotation={[0, Math.PI + (x > 0 ? 0.9 : -0.9), 0]} pose={{ hoofd: [-0.1, 0, 0], mond: f > 50 && i % 2 ? 'open' : 'dicht' }} />)}
    </Anatolie>
  );
};

export const S_Basleraar = () => (
  <Zaal cam={[1.6, 1.8, 5.2, 1.0, 1.7, 4.4]} kijk={[0, 1.3, -1.6]} over={<LangTeller label="Your nickname" waarde="Head Teacher" pil="Başöğretmen" />}>
    <Krijtbord position={[0, 0, -3.0]} regels={['A B C Ç D', 'E F G Ğ H']} />
    <FiguurA {...PRES_P} snor position={[1.2, 0, -2.2]} rotation={[0, -0.7, 0]} pose={{ mond: 'lach', armR: wijs(1.2) }} />
    {[-1.6, -0.4, 0.8].map((x, i) => <FiguurA key={i} {...(i % 2 ? MEISJE_P : KIND2_P)} position={[x, 0, -0.6]} rotation={[0, Math.PI, 0]} pose={{ armR: i === 1 ? omhoog() : undefined }} />)}
  </Zaal>
);

export const S_Stemrecht = () => (
  <Zaal cam={[1.8, 1.8, 5.6, 1.2, 1.7, 4.8]} kijk={[0, 1.2, -1]} over={<><JaarLabel jaar="1934" sub="women vote and get elected" /><LangTeller label="Earlier than" waarde="France, Italy" pil="1944 and 1946" /></>}>
    <Blok p={[0, 0.5, -0.6]} s={[0.8, 1.0, 0.6]} c="#3A4A5A" />
    <Blok p={[0, 1.01, -0.6]} s={[0.3, 0.02, 0.05]} c="#141210" />
    <FiguurA {...VROUW_P} position={[-0.5, 0, 0.2]} rotation={[0, 0.5, 0]} pose={{ mond: 'lach', armR: { schouder: [-1.2, 0, 0.3], elleboog: [0, -0.4] } }} inHand={<Blok p={[0, -0.1, 0.12]} s={[0.2, 0.02, 0.26]} c="#F2EAD8" />} />
    <FiguurA {...VROUW2_P} position={[1.2, 0, 0.4]} rotation={[0, -0.6, 0]} pose={{ mond: 'lach' }} />
  </Zaal>
);

export const S_Achternaam = () => (
  <Werkkamer vlag={false} cam={[1.8, 1.9, 5.4, 1.2, 1.8, 4.6]} kijk={[0, 1.2, -0.2]} over={<><JaarLabel jaar="1934" sub="the Surname Law" /><Pijllabel tekst="Surname?" x={1380} y={300} naar={[1080, 520]} vanaf={30} /></>}>
    <Boek position={[0, 0.82, 0.2]} open kleur="#5A2A24" />
    <FiguurA {...BURGER_HOED_P} hoofdExtra={undefined} position={[0, 0, -0.6]} pose={{ armR: { schouder: [-1.0, 0, 0.1], elleboog: [0, -0.5] } }} />
    {[0, 1, 2].map((i) => <FiguurA key={i} {...(i % 2 ? VROUW_P : BURGER2_HOED_P)} position={[-2.0 - i * 0.7, 0, -0.4 - i * 0.2]} rotation={[0, 1.2, 0]} />)}
  </Werkkamer>
);

export const S_Ataturk = () => (
  <Zaal kleur="#D8C8A8" cam={[1.6, 1.8, 5.2, 1.0, 1.8, 4.4]} kijk={[0, 1.6, -1.6]} over={<Hernoem oud="MUSTAFA KEMAL" nieuw="ATATÜRK" />}>
    <FiguurA {...PRES_P} position={[0, 0, -1.6]} pose={{ mond: 'lach' }} />
  </Zaal>
);

export const S_Sabiha = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Anatolie cam={[6, 4, 14, 4.6, 4.4, 12]} kijk={[0, 5, -2]} over={<LangTeller label="Your adopted daughter" waarde="Sabiha Gökçen" pil="one of the first female fighter pilots" />}>
      <group position={[-8 + lin(f, 0, 150, 0, 14), 5 + Math.sin(t) * 0.3, -2]} rotation={[0.05, 0, Math.sin(t) * 0.06]}>
        <Tweedekker position={[0, 0, 0]} t={t} schaal={1.4} />
        <group position={[0.2, 0.3, 0]} scale={0.5}><Figuur {...SABIHA_P} levend={false} pose={{ armR: omhoog(), mond: 'lach' }} /></group>
      </group>
    </Anatolie>
  );
};

export const S_EenPartij = () => (
  <Parlement kleuren over={<><LangTeller label="Parties" waarde="1" pil="yours" /><Voorbehoud tekst="revolts against the reforms were put down hard" /></>} />
);

export const S_Vrede = () => (
  <Haven tijd="avond" stad="istanbul" cam={[4, 2.2, 10, 3, 2.0, 8.6]} kijk={[0, 1.6, -4]} over={<Citaat tekst="Peace at home, peace in the world." wie="Atatürk, 1931" />}>
    <TurkseVlag position={[0, 0, 0]} t={t30(useCurrentFrame())} h={4.6} />
  </Haven>
);

/* ================= IX · Five past nine ================= */

export const S_Moe = () => (
  <Werkkamer nacht cam={[1.4, 1.7, 4.4, 0.9, 1.6, 3.8]} kijk={[0, 1.1, -0.2]} over={<Pijllabel tekst="little sleep" x={1380} y={300} naar={[1060, 520]} vanaf={30} />}>
    {Array.from({ length: 6 }, (_, i) => <Blok key={i} p={[0.5, 0.86 + i * 0.03, 0.2]} s={[0.5, 0.025, 0.7]} r={[0, i * 0.1, 0]} c="#F2EAD8" />)}
    <Klok position={[1.4, 2.6, -1.8]} uren={3} />
    <FiguurA {...PRES_P} position={[0, 0, -0.7]} pose={{ hoofd: [0.4, 0, 0], wenk: -0.4, armR: { schouder: [-1.0, 0, 0.1], elleboog: [0, -0.5] }, ogen: 'dicht' }} />
  </Werkkamer>
);

export const S_Dolmabahce = () => (
  <Haven tijd="grijs" stad="paleis" cam={[10, 4, 22, 8, 3.6, 19]} kijk={[0, 4, -24]} over={<JaarLabel jaar="1938" sub="Dolmabahçe Palace, Istanbul" />} />
);

export const S_Negen = () => (
  <Huisje rijk cam={[1.2, 2.0, 4.0, 0.8, 2.0, 3.4]} kijk={[0, 2.0, -1.4]} over={<><JaarLabel jaar="10 November 1938" sub="five past nine in the morning" /><LangTeller label="Age" waarde="57" /></>}>
    <Klok position={[0, 2.2, -1.5]} uren={9 + 5 / 60} />
    <pointLight position={[0.6, 2.6, 0.6]} intensity={4} distance={5} color="#E8E2D6" />
  </Huisje>
);

export const S_KlokStil = () => (
  <Huisje rijk cam={[0.4, 2.2, 1.6, 0.2, 2.2, 1.3]} kijk={[0, 2.2, -1.5]} over={<Voorbehoud tekst="according to tradition" />}>
    <Klok position={[0, 2.2, -1.5]} uren={9 + 5 / 60} />
  </Huisje>
);

export const S_Afscheid = () => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <Straat tijd="grijs" cam={[4, 2.6, 11, 3, 2.4, 9.4]} kijk={[0, 1.6, -2]} over={<LangTeller label="Saying goodbye" waarde="hundreds of thousands" />}>
      <Menigte n={18} z={-2.6} x0={-9} t={t * 0.2} />
      <Menigte n={14} z={1.4} x0={-7} t={t * 0.2} />
      <group position={[0, -1.6, -4]}><TurkseVlag position={[0, 0, 0]} t={t} h={6} /></group>
    </Straat>
  );
};

export const S_Anitkabir = () => (
  <Anatolie tijd="ochtend" cam={[10, 5, 40, 7, 4.4, 34]} kijk={[0, 6, 0]} over={<JaarLabel jaar="Anıtkabir" sub="Ankara" />}>
    <Mausoleum position={[0, 0, -4]} />
  </Anatolie>
);

export const S_Biljet = () => (
  <Zaal cam={[1.6, 2.0, 5.4, 1.0, 1.9, 4.6]} kijk={[0, 1.9, -3]} over={<Biljet />}>
    <group position={[0, 2.4, -3.7]}>
      <Blok p={[0, 0, 0]} s={[1.3, 1.6, 0.05]} c="#C9A646" metal={0.5} />
      <Blok p={[0, 0, 0.03]} s={[1.1, 1.4, 0.02]} c="#2A2A2E" />
      <group position={[0, -0.6, 0.05]} scale={0.55}><Figuur {...PRES_P} levend={false} /></group>
    </group>
  </Zaal>
);

export const S_Sirenes = () => (
  <Anatolie cam={[3, 1.6, 8, 2.2, 1.8, 7]} kijk={[0, 3.2, -4]} grond="#9A8A64" over={<LangTeller label="Every 10 November" waarde="09:05" pil="sirens" />}>
    <Sirene position={[0, 0, -4]} />
    <Blok p={[0, 0.02, 0]} s={[80, 0.04, 6]} c="#4A4A4E" />
  </Anatolie>
);

export const S_Stil = () => {
  const f = useCurrentFrame();
  return (
    <Anatolie cam={[4, 2.0, 8, 9, 5, 18]} kijk={[0, 1.2, -2]} grond="#9A8A64">
      <Blok p={[0, 0.02, -2]} s={[80, 0.04, 7]} c="#4A4A4E" />
      {[-12, -7, -2, 3, 8].map((x, i) => <Blok key={x} p={[x, 0.05, -2]} s={[2.4, 0.02, 0.14]} c="#E8E4D8" />)}
      {[[-9, -3.6, '#B8BCC0'], [-4, -3.6, '#7A2A24'], [1, -3.6, '#2A3A5A'], [6, -3.6, '#E2DCD0'], [-6, -0.4, '#D8D2C4'], [0, -0.4, '#3A4A3A'], [5, -0.4, '#8A6A3A']].map(([x, z, k], i) => <Wagen key={i} position={[x as number, 0, z as number]} kleur={k as string} />)}
      {[[-9, -4.9], [-4, -4.9], [1, -4.9], [6, -4.9], [-6, 0.9], [0, 0.9], [5, 0.9]].map(([x, z], i) => <FiguurA key={i} {...[BURGER_HOED_P, VROUW_P, BURGER2_HOED_P, VROUW2_P][i % 4]} hoofdExtra={i % 2 ? (i % 4 === 1 ? VROUW_P.hoofdExtra : VROUW2_P.hoofdExtra) : undefined} position={[x + 1.2, 0, z]} rotation={[0, i % 2 ? -0.4 : 0.4, 0]} pose={{ hoofd: [0.25, 0, 0], ogen: f > 30 ? 'dicht' : 'open' }} />)}
      <Sirene position={[12, 0, -7]} />
    </Anatolie>
  );
};

/** Slot: Anıtkabir in de avondzon met de vlag. */
export const S_Slot = () => (
  <Anatolie tijd="avond" cam={[8, 4, 34, 6, 4, 30]} kijk={[0, 6, 0]}>
    <Mausoleum position={[0, 0, -4]} />
  </Anatolie>
);

export { BoosTeken, Boek, Bord, ease, GRIEK_P, Kaars, KaartVlag, Lamp, MiniKemal, OFF_P, Stoomschip, Tafel, Tent, Wolk, ZUBEYDE_OUD_P, Dolmabahce, Granaat };
