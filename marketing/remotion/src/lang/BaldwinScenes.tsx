import { useCurrentFrame } from 'remotion';
import { Avondlicht, Banier, Bed, Camera, Daglicht, Grond, Heuvels, Kameel, Leger, Lucht, Menigte, Nachtlicht, Paard, Rots, Tent, Vuur, Zon } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, omhoog, Rol, wijs, Zwaard, type V3 } from '../watals/Figuur';
import {
  BALDWIN_KIND, BW, EDEL_A, EDEL_B, GOUD_VLAG, JONGEN_A, JONGEN_B, PATRIARCH, S_Charge, S_Fluisteren, S_Knijpen, S_Kroning, S_Leraar, S_Ridders, S_Rijden, S_Saladin, WILLEM,
} from '../watals/WatAlsBaldwin';
import { ease, FPS, lin, Shot } from './basis';
import {
  AGNES, AMALRIC, B_1161, Ziekbed, B_1171, B_1174, B_1183, BEDIENDE, BLAUW, DOKTER, Kind, KaartB, Koning, kp, MELAATS, MIDDEN_B, MiniB, MiniS, MONTFERRAT, r, RAYMOND, REYNALD, SALADIN, SIBYLLA, TEMPELIER, VER_B,
} from './BaldwinKit';
import { GroteTitel, JaarLabel, LangTeller } from './LangHud';
import { Stempel } from './LeonidasKit';
import { InHal, InKamer, InTent, Muur, Portret, RIDDER, S_Bed, S_GrootLeger, S_Kameel, SARACEEN, Slagveld, Stad, VoorMuur, Woestijn } from './SaladinScenes';

/** Baldwin IV lang — teaser t/m hoofdstuk IV. Eén component per zin (Z<i>). */

const SAL = { kleding: SALADIN, hoofddeksel: 'tulband' as const, baard: true };
const tel = (f: number, a: number, b: number, tot: number, stap = 1) => (Math.round(lin(f, a, b, 0, tot) / stap) * stap).toLocaleString('en-US');

/* ---------- teaser ---------- */

/** 0 — stil openingsbeeld: de jonge koning in de lege hal, zachte push-in, titel. Geen knal. */
export const Z0 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.95, -1]} van={[0.9, 2.1, 5.6]} naar={[0.4, 2.0, 4.4]} over={f >= 8 ? <GroteTitel boven="WHAT IF YOU WERE" naam="THE LEPER KING?" /> : undefined}>
      <Koning position={[0, 0, -1]} pose={{ wenk: 0.2, armL: { schouder: [-0.4, 0, 0.2], elleboog: [0, 0.6] }, armR: { schouder: [-0.4, 0, -0.2], elleboog: [0, -0.6] } }} />
    </InHal>
  );
};
export const Z1 = () => <S_Kroning />;
export const Z2 = () => <S_Charge masker={false} />;
export const Z4 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.4, -4.6]} van={[1.6, 2.4, 3.2]} naar={[0.6, 2.0, 1.6]} over={<LangTeller label="Dead at" waarde="23" pil={f > 40 ? 'kingdom still standing' : undefined} />}>
      <Kroon position={[0, 1.02, -4.6]} />
    </InHal>
  );
};
export const Z5 = () => <S_Saladin />;
export const T5_Titel = ({ titel = 'leven' }: { titel?: 'leven' | 'welkom' | 'geen' }) => {
  const f = useCurrentFrame();
  const over = titel === 'leven' ? <GroteTitel boven="THE LIFE OF" naam="BALDWIN IV" onder="the Leper King of Jerusalem" /> : titel === 'welkom' && f >= 10 ? <GroteTitel boven="WELCOME TO" naam="WHAT IF" grootte={150} /> : undefined;
  return (
    <Shot focus={[0, 2.4, 0]} scherpte={2.5} mist={['#E8B888', 30, 160]} over={over}>
      <Lucht boven="#4E3A5A" horizon="#F2A060" />
      <Zon position={[-20, 8, -150]} grootte={16} kleur="#FFD08A" />
      <Avondlicht />
      <Grond kleur="#C8AC7A" />
      <Heuvels kleur="#A88A5A" />
      <Camera pos={[ease(f, 0, 200, 4.0, 3.0), 2.2, ease(f, 0, 200, 10, 8.6)]} kijk={[0, 3.0, 0]} fov={34} />
      <group position={[0, 0, -26]} scale={1.3}><Muur vlag={BLAUW} /><Stad z={-6} koepels={false} /></group>
      <Koning position={[0, 0, 0]} rotation={[0, 0.4, 0]} pose={ARMEN_GEKRUIST} />
    </Shot>
  );
};

/* ---------- I · The boy who felt nothing ---------- */

export const Z6 = () => <KaartB van={B_1161} cam={[VER_B, kp('jerusalem', 9, 8)]} spelden={[['jerusalem', BLAUW]]} jaar="1161" sub="Kingdom of Jerusalem" />;
export const Z7 = () => (
  <InHal over={<LangTeller label="Your father" waarde="Amalric" pil="the king's brother" />}>
    <Figuur kleding={AMALRIC} baard haar="kort" levend position={[-0.7, 0, 0]} rotation={[0, 0.4, 0]} pose={{ mond: 'lach' }} />
    <Figuur kleding={AGNES} haar="lang" levend position={[0.8, 0, -0.2]} rotation={[0, -0.4, 0]} pose={{ armL: { schouder: [-1.0, 0, 0.5], elleboog: [0, 1.2] }, armR: { schouder: [-1.0, 0, -0.5], elleboog: [0, -1.2] } }} extra={<Blok p={[0, 1.25, 0.32]} s={[0.4, 0.26, 0.26]} c="#ECE6D8" />} />
  </InHal>
);
export const Z8 = () => (
  <InHal over={<JaarLabel jaar="1163" sub="your father is king" />}>
    <Figuur kleding={AMALRIC} baard haar="kort" levend position={[0, 0.6, -4.4]} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} pose={{ wenk: 0.3 }} />
    {[-2.4, -1.2, 1.4, 2.6].map((x, i) => <Figuur key={x} kleding={i % 2 ? EDEL_B : EDEL_A} levend position={[x, 0, -1 - (i % 2)]} rotation={[0, Math.PI + (x < 0 ? -0.6 : 0.6), 0]} />)}
  </InHal>
);
export const Z9 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.8, -1]} over={<LangTeller label="The condition" waarde="leave Agnes" />}>
      <Figuur kleding={AMALRIC} baard haar="kort" levend position={[-0.8, 0, 0]} rotation={[0, 0.6, 0]} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} pose={{ wenk: -0.6, hoofd: [0.3, 0, 0] }} />
      <Figuur kleding={AGNES} haar="lang" position={[lin(f, 0, 150, 1.2, 3.4), 0, lin(f, 0, 150, -0.6, -2.6)]} rotation={[0, 2.4, 0]} pose={{ wenk: -0.8, traan: lin(f, 20, 80, 0, 1) }} />
      <Kind position={[0.2, 0, 1.2]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.6 }} />
    </InHal>
  );
};
export const Z10 = () => (
  <InKamer kijk={[0.2, 1.5, 0]} over={<LangTeller label="Your teacher" waarde="William of Tyre" pil="he wrote it all down" />}>
    <Kind position={[-0.4, 0, 0.3]} rotation={[0, 0.6, 0]} pose={{ hoofd: [0.3, 0, 0] }} />
    <Figuur kleding={WILLEM} haar="kort" levend position={[0.7, 0, -0.5]} rotation={[0, -0.8, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.2], elleboog: [0, -0.5] }, mond: 'open' }} inHand={<Rol />} />
  </InKamer>
);
export const Z11 = () => <S_Knijpen />;
/** 12 — close-up: de anderen schreeuwen, hij glimlacht. */
export const Z12 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.4, 0.3]} scherpte={4} mist={['#E6D2AE', 12, 70]} over={f > 45 ? <Stempel tekst="NOTHING" vanaf={45} top={140} /> : undefined}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-8, 12, 8]} />
      <Grond kleur="#D8C29A" />
      <Blok p={[0, 2.5, -4]} s={[14, 5, 0.6]} c="#DCC9A2" rough={1} />
      <Camera pos={[ease(f, 0, 120, 0.5, 0.2), 1.45, ease(f, 0, 120, 3.4, 2.6)]} kijk={[0, 1.3, 0.3]} fov={34} />
      <Kind position={[0, 0, 0.3]} pose={{ mond: 'lach', armR: { schouder: [-0.9, 0, -0.2], elleboog: [0, -0.3] } }} />
      <Figuur kleding={JONGEN_A} scale={0.72} levend position={[-1.3, 0, -0.6]} rotation={[0, 0.6, 0]} pose={{ mond: 'open', wenk: -0.8 }} />
      <Figuur kleding={JONGEN_B} scale={0.72} levend position={[1.3, 0, -0.7]} rotation={[0, -0.6, 0]} pose={{ mond: 'open', wenk: -0.8, armR: omhoog() }} />
    </Shot>
  );
};
export const Z13 = () => <S_Leraar />;
export const Z14 = () => {
  const f = useCurrentFrame();
  return (
    <InKamer kijk={[0, 1.5, 0]} over={<LangTeller label="Treatment" waarde="nothing works" />}>
      <Kind position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} pose={{ armR: { schouder: [-1.3, 0, -0.6], elleboog: [0, 0] }, wenk: -0.3 }} />
      <Figuur kleding={DOKTER} baard haar="grijs" levend position={[-1.0, 0, -0.3]} rotation={[0, 0.7, 0]} pose={{ armR: { schouder: [-1.2 + Math.sin(f / 6) * 0.1, 0, -0.4], elleboog: [0, -0.6] } }} />
      <Figuur kleding={DOKTER} haar="kort" levend position={[1.1, 0, -0.5]} rotation={[0, -0.7, 0]} pose={{ armL: { schouder: [-1.1, 0, 0.4], elleboog: [0, 0.8] } }} extra={<Blok p={[0.0, 1.2, 0.4]} s={[0.3, 0.14, 0.3]} c="#8EA2A8" metal={0.4} />} />
    </InKamer>
  );
};
export const Z15 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.4, 0]} scherpte={4} mist={['#100C0A', 4, 16]} over={<Stempel tekst="LEPROSY" vanaf={50} top={150} />}>
      <Lucht boven="#0C0806" horizon="#16100C" />
      <hemisphereLight args={['#5A4A3A', '#0C0806', 0.3]} />
      <pointLight position={[1.0, 2.0, 1.6]} intensity={5} distance={6} color="#FFA850" />
      <Grond kleur="#2A2018" />
      <Camera pos={[ease(f, 0, 150, 0.4, 0.1), 1.9, ease(f, 0, 150, 4.2, 3.0)]} kijk={[0, 1.7, 0]} fov={34} />
      <Figuur kleding={{ ...BALDWIN_KIND, tuniek: '#E0D6C2' }} haar="kort" levend scale={0.82} position={[0, 0, 0]} pose={{ wenk: -0.5, hoofd: [0.35, 0, 0], armR: { schouder: [-1.0, 0, -0.5], elleboog: [0, -0.9] } }} />
    </Shot>
  );
};
export const Z16 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <VoorMuur cam={[4, 2.6, 13, 2, 2.2, 10]} over={<LangTeller label="Lepers" waarde="outside the walls" />}>
      {[-4.2, -2.4, 2.0, 3.8].map((x, i) => <Figuur key={x} kleding={MELAATS} hoofddeksel="kap" levend position={[x, 0, 2.0 + (i % 2) * 0.6]} rotation={[0, (i % 2 ? -0.4 : 0.4) + Math.sin(t + i) * 0.05, 0]} pose={{ wenk: -0.6, hoofd: [0.3, 0, 0] }} />)}
    </VoorMuur>
  );
};
export const Z17 = () => (
  <InHal kijk={[0, 1.4, -1]} over={<LangTeller label="Son of the king" waarde="stays inside" />}>
    <Kind position={[0, 0, -1]} pose={{ wenk: 0.1 }} />
    <Figuur kleding={BEDIENDE} levend position={[-1.4, 0, -1.6]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(0.9) }} />
    <Figuur kleding={BEDIENDE} levend position={[1.5, 0, -1.8]} rotation={[0, -0.6, 0]} />
  </InHal>
);
export const Z18 = () => <S_Rijden />;
/** 19 — hij wint de race van de andere jongens. */
export const Z19 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 150, -6, 3);
  return (
    <Shot focus={[x, 2.2, 0]} scherpte={2.2} mist={['#E6D2AE', 24, 130]} over={<LangTeller label="Best rider" waarde="you" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#9AA06A" />
      <Heuvels kleur="#7E8A56" />
      <Camera pos={[x - 1.5, 2.8, 12]} kijk={[x + 0.4, 2.2, 0]} fov={36} />
      <Paard position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#6A4A30" dek={BLAUW} t={t * 1.6} loopt ruiter={<Figuur kleding={BALDWIN_KIND} haar="kort" levend pose={{ mond: 'lach', hoofd: [0, -0.8, 0] }} />} />
      {[[-2.6, -1.6], [-3.8, 1.2]].map(([dx, z], i) => (
        <Paard key={i} position={[x + dx, 0, z]} rotation={[0, -Math.PI / 2, 0]} kleur={i ? '#8A7058' : '#3A2A20'} dek="#8A6A4A" t={t * 1.6 + i} loopt ruiter={<Figuur kleding={i ? JONGEN_A : JONGEN_B} haar="kort" pose={{ mond: 'open', wenk: -0.5, hoofd: [0, -0.8, 0] }} />} />
      ))}
    </Shot>
  );
};

/* ---------- II · A crown at thirteen ---------- */

export const Z20 = () => <Ziekbed donker={0.8} over={<JaarLabel jaar="1174" sub="King Amalric dies" />} wie={{ kleding: AMALRIC, baard: true, haar: 'kort', pose: { ogen: 'dicht' } }} bij={<Kind position={[-0.6, 0, -1.2]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.8, traan: 1 }} />} />;
export const Z21 = () => (
  <>
    <S_Kroning />
    <JaarLabel jaar="15 July 1174" sub="you are 13" />
  </>
);
export const Z22 = () => (
  <InHal kijk={[0, 2.2, -4.4]} van={[1.2, 2.6, 2.4]} naar={[0.5, 2.4, 0.8]} over={<LangTeller label="King of Jerusalem" waarde="age 13" pil="with leprosy" />}>
    <Koning position={[0, 0.6, -4.4]} pose={{ wenk: 0.3, armL: { schouder: [-0.5, 0, 0.2], elleboog: [0, 0.6] }, armR: { schouder: [-0.5, 0, -0.2], elleboog: [0, -0.6] } }} />
  </InHal>
);
export const Z23 = () => <S_Fluisteren />;
/** 24 — Akko, nacht: een lege straat, een gevallen mantel bij een lantaarn. */
export const Z24 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 0.6, 0]} scherpte={3} mist={['#141820', 6, 40]} over={<JaarLabel jaar="Acre, autumn 1174" sub="the first regent is murdered" />}>
      <Lucht boven="#0E1220" horizon="#1E2638" />
      <Nachtlicht />
      <Grond kleur="#4A4436" />
      <Camera pos={[ease(f, 0, 150, 2.6, 1.6), ease(f, 0, 150, 2.4, 1.8), ease(f, 0, 150, 6.4, 5.0)]} kijk={[0, 0.5, 0]} fov={34} />
      {[-1, 1].map((k) => [-6, -2, 2].map((z) => <Blok key={`${k}${z}`} p={[k * 3.4, 2.4, z]} s={[2.4, 4.8 + ((z + 6) % 3) * 0.4, 3.6]} c={k > 0 ? '#5A5244' : '#4E473A'} />))}
      <Blok p={[0.2, 0.04, 0.2]} s={[1.4, 0.06, 0.9]} c="#6A2E4A" r={[0, 0.4, 0]} />
      <Blok p={[-2.0, 2.4, -1]} s={[0.2, 0.3, 0.2]} c="#FFB347" emissive="#FF8A2A" />
      <pointLight position={[-1.8, 2.2, -0.6]} intensity={6} distance={7} color="#FFA850" />
    </Shot>
  );
};
export const Z25 = () => (
  <InHal over={<LangTeller label="Regent" waarde="Raymond of Tripoli" pil="your father's cousin" />}>
    <Figuur kleding={RAYMOND} baard haar="kort" levend position={[-0.6, 0, 0]} rotation={[0, 0.5, 0]} pose={{ armR: wijs(1.0), mond: 'open' }} />
    <Koning scale={0.86} position={[0.9, 0, -0.4]} rotation={[0, -0.5, 0]} />
  </InHal>
);
export const Z26 = () => <KaartB van={B_1174} cam={[VER_B, MIDDEN_B]} spelden={[['jerusalem', BLAUW], ['acre', BLAUW], ['kerak', BLAUW], ['tripoli', BLAUW], ['ascalon', BLAUW]]} teller={['Your kingdom', 'a strip by the sea']} />;
export const Z27 = () => <KaartB van={B_1161} naar={B_1174} wissel={[15, 110]} cam={[MIDDEN_B, VER_B]} licht={['Egypt', 'Syria']} />;

/* ---------- III · Saladin ---------- */

export const Z28 = () => <Portret wie={<Figuur {...SAL} levend pose={{ ...ARMEN_GEKRUIST, wenk: 0.4 }} />} over={<LangTeller label="Saladin" waarde="Sultan of Egypt" />} />;
export const Z29 = () => <KaartB van={B_1171} naar={B_1174} wissel={[20, 80]} cam={[VER_B, kp('damascus', 9, 8)]} spelden={[['damascus', GOUD_VLAG]]} jaar="1174" sub="Saladin takes Damascus" kop={undefined} />;
export const Z30 = () => <KaartB van={B_1174} naar={B_1183} wissel={[10, 90]} cam={[kp('jerusalem', 8, 7), VER_B]} licht={['Egypt', 'Syria', 'Iraq']} spelden={[['jerusalem', BLAUW]]} />;
export const Z31 = () => <S_GrootLeger />;
export const Z32 = () => (
  <InHal over={<LangTeller label="Your advisers" waarde="wait" />}>
    <Koning scale={0.88} position={[0, 0.6, -4.4]} pose={{ wenk: 0.4 }} />
    <Figuur kleding={EDEL_A} baard levend position={[-1.3, 0, -1.6]} rotation={[0, Math.PI - 0.4, 0]} pose={{ armR: { schouder: [-1.4, 0, -0.3], elleboog: [0, -0.4] }, mond: 'open' }} />
    <Figuur kleding={RAYMOND} baard haar="kort" levend position={[1.3, 0, -1.4]} rotation={[0, Math.PI + 0.4, 0]} pose={{ armL: { schouder: [-1.2, 0, 0.4], elleboog: [0, 0.3] } }} />
  </InHal>
);
export const Z33 = () => (
  <InHal kijk={[0, 2.0, -1]} van={[1.8, 2.2, 5.6]} naar={[1.0, 2.1, 4.2]} over={<JaarLabel jaar="1176" sub="you rule on your own" />}>
    <Koning ziek={1} position={[0, 0, -1]} pose={{ wenk: 0.9, armR: omhoog() }} inHand={<Zwaard />} />
  </InHal>
);
export const Z34 = () => <KaartB van={B_1174} cam={[kp('jerusalem', 10, 9), kp('damascus', 10, 9)]} route={r('acre', 'tyre', 'damascus')} routeTijd={[10, 110]} kop={<MiniB />} spelden={[['damascus', GOUD_VLAG]]} jaar="1176" sub="your raid on Damascus" />;
export const Z35 = () => (
  <InHal over={<LangTeller label="Your sister" waarde="Sibylla" />}>
    <Koning ziek={1} scale={0.88} position={[-0.7, 0, 0]} rotation={[0, 0.5, 0]} />
    <Figuur kleding={SIBYLLA} haar="lang" levend position={[0.8, 0, -0.3]} rotation={[0, -0.5, 0]} pose={{ mond: 'lach' }} />
  </InHal>
);
export const Z36 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={4} mist={['#1A120C', 5, 20]} over={<LangTeller label="Heir" waarde="none" pil="you will have no children" />}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.45]} />
      <pointLight position={[1.2, 2.4, 1.6]} intensity={6} distance={7} color="#FFA850" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#5A4232" />
      <Camera pos={[ease(f, 0, 150, 0.7, 0.3), 1.95, ease(f, 0, 150, 5.0, 4.2)]} kijk={[0, 1.75, 0]} fov={34} />
      <Koning ziek={1} scale={0.9} position={[0, 0, 0]} pose={{ wenk: -0.4, hoofd: [0.35, 0, 0], armR: { schouder: [-0.5, 0, -0.2], elleboog: [0, -0.5] }, armL: { schouder: [-0.5, 0, 0.2], elleboog: [0, 0.5] } }} />
    </Shot>
  );
};
export const Z37 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.8, -1]} over={<JaarLabel jaar="1176" sub="Sibylla marries William of Montferrat" />}>
      <Figuur kleding={SIBYLLA} haar="lang" levend position={[-0.5, 0, -1]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach' }} />
      <Figuur kleding={MONTFERRAT} haar="kort" levend position={[0.5, 0, -1]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach' }} />
      <Menigte n={8} z={2.6} x0={-4} t={f / FPS} juich />
    </InHal>
  );
};
export const Z38 = () => <Ziekbed donker={0.9} over={<JaarLabel jaar="1177" sub="William dies of a fever" />} wie={{ kleding: MONTFERRAT, haar: 'kort', pose: { ogen: 'dicht' } }} bij={<Figuur kleding={SIBYLLA} haar="lang" levend position={[-0.6, 0, -1.3]} rotation={[0, 0.3, 0]} pose={{ wenk: -0.8, traan: 1 }} />} />;

/* ---------- IV · Montgisard ---------- */

export const Z39 = () => <KaartB van={B_1174} cam={[kp('cairo', 12, 10), kp('ascalon', 9, 8)]} route={r('cairo', 'gaza', 'ascalon')} routeTijd={[10, 130]} kop={<MiniS />} spelden={[['jerusalem', BLAUW]]} jaar="November 1177" sub="Saladin invades" />;
export const Z40 = () => {
  const f = useCurrentFrame();
  return (
    <>
      <S_Saladin />
      <LangTeller label="Saladin's army" waarde={tel(f, 8, 70, 26000, 500)} pil="William of Tyre" />
    </>
  );
};
export const Z41 = () => {
  const f = useCurrentFrame();
  return (
    <>
      <S_Ridders masker={false} />
      <LangTeller label="Your knights" waarde={tel(f, 8, 60, 375, 5)} pil="you are 16" />
    </>
  );
};
/** 42 — Ascalon: Baldwin op de muur, Saladins leger trekt achter langs. */
export const Z42 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 5.6, 0]} scherpte={2} mist={['#E6D2AE', 26, 140]} over={<JaarLabel jaar="Ascalon" sub="Saladin marches past" />}>
      <Lucht boven="#8FB4D8" horizon="#F2DDB2" />
      <Daglicht zon={[-10, 14, 8]} />
      <Grond kleur="#C8AC7A" />
      <Camera pos={[ease(f, 0, 150, -5, -3.5), 9.2, ease(f, 0, 150, 9, 7.6)]} kijk={[0.5, 5.6, -8]} fov={38} />
      <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}><Muur vlag={BLAUW} /></group>
      <Koning ziek={1} scale={0.85} position={[0.6, 5.5, -0.2]} rotation={[0, Math.PI + 0.3, 0]} />
      <Figuur kleding={RIDDER} hoofddeksel="helm" position={[-1.0, 5.5, -0.2]} rotation={[0, Math.PI - 0.2, 0]} />
      <group position={[lin(f, 0, 200, -10, 4), 0, -18]}>
        {[0, 1, 2].map((i) => <Leger key={i} rijen={3} kolommen={10} kleur="#E2D6BC" schild={GOUD_VLAG} position={[i * -12, 0, (i % 2) * 2]} rotation={[0, Math.PI / 2, 0]} t={t + i} />)}
      </group>
    </Shot>
  );
};
export const Z43 = () => <KaartB van={B_1174} cam={[kp('ascalon', 8, 7), kp('jerusalem', 8, 7)]} route={r('ascalon', 'ramla', 'jerusalem')} routeTijd={[0, 140]} kop={<MiniS />} spelden={[['jerusalem', BLAUW], ['ascalon', BLAUW]]} teller={['Next stop', 'Jerusalem']} />;
export const Z44 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld groen cam={[7, 3.2, 12, 4, 2.6, 9]} kijk={[0, 1.2, -1]} over={<LangTeller label="His army" waarde="spreads out" pil="plundering villages" />}>
      {[-5, -1.4, 2.4].map((x, i) => <group key={x} position={[x, 0, -3 - (i % 2) * 2]}><Blok p={[0, 0.9, 0]} s={[2, 1.8, 1.8]} c="#D8C29A" /><Blok p={[0, 1.9, 0]} s={[2.2, 0.2, 2]} c="#B89A6A" /></group>)}
      {[0, 1, 2, 3].map((i) => <Figuur key={i} kleding={SARACEEN} hoofddeksel="tulband" baard levend position={[-4 + i * 2.6, 0, 0.4 + (i % 2)]} rotation={[0, (i % 2 ? 1 : -1) * 0.8 + Math.sin(t + i) * 0.2, 0]} pose={{ armL: omhoog() }} extra={<Blok p={[0, 2.5, 0]} s={[0.6, 0.5, 0.5]} c="#C8B48A" />} />)}
    </Slagveld>
  );
};
export const Z45 = () => <KaartB van={B_1174} cam={[kp('ascalon', 8, 7), kp('montgisard', 8, 7)]} route={r('ascalon', 'jaffa', 'ramla', 'montgisard')} routeTijd={[10, 140]} kop={<MiniB />} spelden={[['ascalon', BLAUW]]} teller={['You', 'follow him']} />;
export const Z46 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[5, 2.8, 11, 3, 2.4, 8.4]} kijk={[0, 1.6, 0]} over={<LangTeller label="Allies" waarde="Templars + Reynald" />}>
      <Leger rijen={2} kolommen={8} kleur="#F2EEE6" schild="#F2EEE6" position={[-3, 0, -4]} t={t} />
      <Figuur kleding={REYNALD} baard levend position={[1.2, 0, 0.6]} rotation={[0, -0.3, 0]} pose={{ ...ARMEN_GEKRUIST, mond: 'lach', wenk: 0.6 }} />
      <Figuur kleding={TEMPELIER} hoofddeksel="helm" levend position={[-0.8, 0, 0.2]} rotation={[0, 0.3, 0]} />
      <Koning ziek={1} scale={0.88} position={[-2.4, 0, 0.8]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(1.2) }} />
    </Slagveld>
  );
};
/** 47 — op de heuvel: Baldwin te paard kijkt neer op het verspreide leger. */
export const Z47 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3.2, 0]} scherpte={2.2} mist={['#C8A880', 18, 120]} over={<JaarLabel jaar="25 November 1177" sub="Montgisard" />}>
      <Lucht boven="#8A8E98" horizon="#E8C08A" />
      <Daglicht zon={[-6, 10, 10]} kleur="#FFE0B8" kracht={2.0} />
      <Grond kleur="#B8A070" />
      <Camera pos={[ease(f, 0, 150, -2.6, -1.8), 4.2, ease(f, 0, 150, 6.8, 5.6)]} kijk={[1, 2.8, -6]} fov={36} />
      <Rots position={[0, -1.6, 0]} schaal={[6, 2.6, 5]} kleur="#A08A5A" />
      <Paard position={[0, 1.0, 0]} rotation={[0, Math.PI + 0.3, 0]} kleur="#6A4A30" dek={BLAUW} t={t} ruiter={<Figuur {...BW(1)} pose={{ hoofd: [0, -0.5, 0], wenk: 0.7 }} />} />
      {[-12, -4, 5, 13].map((x, i) => <Leger key={x} rijen={2} kolommen={4} kleur="#E2D6BC" schild={GOUD_VLAG} position={[x, 0, -18 - (i % 2) * 4]} rotation={[0, i, 0]} t={t + i} afstand={1.2} />)}
    </Shot>
  );
};
export const Z48 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[8, 3.4, 13, 5, 2.8, 10]} kijk={[0, 1.4, -1]} over={<LangTeller label="Saladin's army" waarde="scattered" />}>
      {[0, 1, 2].map((i) => <Kameel key={i} position={[-3 + i * 2.4, 0, -1 + (i % 2)]} rotation={[0, 0.3 * i, 0]} t={t + i} kleur={['#B88A55', '#C49A64', '#A87C4A'][i]} />)}
      {[0, 1].map((i) => <group key={i} position={[2.8 + i * 2.2, 0, -2.6]}><Blok p={[0, 0.6, 0]} s={[1.8, 0.8, 1.2]} c="#8A6A44" />{[-0.7, 0.7].map((x) => <Blok key={x} p={[x, 0.3, 0.62]} s={[0.6, 0.6, 0.1]} c="#5A3B24" />)}</group>)}
      {[0, 1, 2, 3].map((i) => <Figuur key={i} kleding={SARACEEN} hoofddeksel="tulband" baard levend position={[-5 + i * 3.4, 0, 1.6 - (i % 2) * 3]} rotation={[0, i * 1.3, 0]} pose={{ wenk: -0.4 }} />)}
    </Slagveld>
  );
};
export const Z49 = () => <S_Charge masker={false} />;
export const Z50 = () => <S_Kameel />;
export const Z51 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Portret avond ver={2.2} kijkY={1.6} over={<LangTeller label="Back in Egypt" waarde="only a part" pil="of 26,000" />}
      wie={<group position={[lin(f, 0, 200, 2, -2), 0, -1]}>{[0, 1, 2].map((i) => <Figuur key={i} kleding={SARACEEN} hoofddeksel="tulband" baard levend position={[i * 1.6 - 1.6, 0, (i % 2) * 0.8]} rotation={[0, -Math.PI / 2 + Math.sin(t + i) * 0.1, 0]} pose={{ wenk: -0.8, hoofd: [0.3, 0, 0] }} />)}</group>}
    />
  );
};
/** 52 — de held: Baldwin (16) te paard in de avondzon, banieren. */
export const Z52 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3.0, 0]} scherpte={2.4} mist={['#E8B888', 30, 170]} over={<LangTeller label="Age 16" waarde="beat Saladin" />}>
      <Lucht boven="#4E3A5A" horizon="#F2A060" />
      <Zon position={[-20, 10, -150]} grootte={16} kleur="#FFD08A" />
      <Daglicht zon={[-6, 9, 10]} kleur="#FFC890" kracht={2.2} />
      <Grond kleur="#C8AC7A" />
      <Heuvels kleur="#A88A5A" />
      <Camera pos={[ease(f, 0, 150, 2.4, 1.6), ease(f, 0, 150, 3.0, 3.3), ease(f, 0, 150, 9.6, 8.2)]} kijk={[0, 3.1, 0]} fov={34} />
      <Leger rijen={2} kolommen={9} kleur="#ECE6D8" schild={BLAUW} position={[0, 0, -8]} t={t} />
      {[-4, 4].map((x, i) => <Banier key={x} position={[x, 0, -5.5]} kleur={i ? GOUD_VLAG : BLAUW} t={t + i} />)}
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.35, 0]} kleur="#6A4A30" dek={BLAUW} t={t} ruiter={<Figuur {...BW(1)} pose={{ armR: omhoog(), wenk: 0.3, mond: 'lach' }} inHand={<Zwaard />} />} />
    </Shot>
  );
};

/* hergebruikt in deel 2 */
export { InTent, Tent, Vuur, Bed, PATRIARCH, Rol };
export type { V3 };

/* ---------- nieuwe rustige intro (eigenaar 26 nov): welkom → wie → waarom → terug naar het begin ---------- */
export const I0 = () => <T5_Titel titel="welkom" />;
export const I1 = () => (
  <InHal kijk={[0, 2.2, -4.4]} van={[1.2, 2.6, 2.4]} naar={[0.5, 2.4, 0.8]} over={<LangTeller label="Today" waarde="Baldwin IV" pil="the Leper King of Jerusalem" />}>
    <Koning ziek={1} position={[0, 0.6, -4.4]} pose={{ wenk: 0.3, armL: { schouder: [-0.5, 0, 0.2], elleboog: [0, 0.6] }, armR: { schouder: [-0.5, 0, -0.2], elleboog: [0, -0.6] } }} />
  </InHal>
);
export const I3 = () => <T5_Titel titel="geen" />;
