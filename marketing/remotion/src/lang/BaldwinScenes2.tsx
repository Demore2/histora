import { useCurrentFrame } from 'remotion';
import { Avondlicht, Banier, Camera, Kameel, Daglicht, Grond, Heuvels, Leger, Lucht, Menigte, Nachtlicht, Paard, Rook, Rots, Tent, Zon } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, Figuur, Kroon, omhoog, Rol, wijs, Zwaard, type V3 } from '../watals/Figuur';
import { BALDWIN_KIND, BW, EDEL_A, EDEL_B, GOUD_VLAG, Masker, PATRIARCH, S_Blind, S_Draagbaar, S_Sterfbed, S_Valt, WILLEM, BALDWIN } from '../watals/WatAlsBaldwin';
import { ease, FPS, lin, Shot } from './basis';
import {
  B_1174, B_1183, B_1187, BEDIENDE, BLAUW, GUY, HENRY, HUMPHREY, ISABELLA, KaartB, KleineKoning, Koning, Ziekbed, kp, MIDDEN_B, MiniB, MiniS, RAYMOND, REYNALD, SALADIN, SIBYLLA, VER_B, r,
} from './BaldwinKit';
import { Zeilschip, Schilderijlijst } from './LangDecor';
import { JaarLabel, LangTeller } from './LangHud';
import { Stempel } from './LeonidasKit';
import { Haven, InHal, InTent, Muur, Portret, RIDDER, S_Bed, S_Colonne, S_Eed, S_Hoorns, S_Kerak, S_Onderhandeling, S_TentHattin, SARACEEN, Slagveld, Stad, VoorMuur } from './SaladinScenes';

/** Baldwin IV lang — hoofdstuk V t/m het slot. */

const SAL = { kleding: SALADIN, hoofddeksel: 'tulband' as const, baard: true };
const SAL_ZIT: V3 = [0, 0, 0];
void SAL_ZIT;

/** Kerak op zijn rots (z = -12), met optioneel trouwbanieren, belegering en een uitgelichte toren. */
const Kerak = ({ banieren = false, toren = false, t = 0 }: { banieren?: boolean; toren?: boolean; t?: number }) => (
  <group position={[0, 0, -12]}>
    <Rots position={[0, -1, 0]} schaal={[12, 6, 6]} kleur="#8A7458" />
    <Blok p={[0, 2.5, 0]} s={[11, 5, 5.5]} c="#8A7458" rough={1} />
    <group position={[0, 5, 0]}>
      <Blok p={[0, 2, 0]} s={[9, 4, 4]} c="#8E7E66" />
      {[-3.8, 0, 3.8].map((x) => <Blok key={x} p={[x, 3.2, 0]} s={[1.4, 6.4, 1.4]} c={toren && x === 3.8 ? '#C9A646' : '#7E6E58'} emissive={toren && x === 3.8 ? '#6A4A10' : undefined} />)}
      {banieren && [-3.8, 0, 3.8].map((x, i) => <Banier key={x} position={[x, 6.4, 0]} kleur={i % 2 ? '#B07AA0' : BLAUW} t={t + i} />)}
    </group>
  </group>
);
const Katapult = ({ position, t = 0 }: { position: V3; t?: number }) => (
  <group position={position}>
    <Blok p={[0, 0.4, 0]} s={[1.6, 0.4, 1.0]} c="#5A3B24" />
    {[-0.4, 0.4].map((z) => <Blok key={z} p={[0, 1.0, z]} s={[0.15, 1.2, 0.15]} c="#4A2E1C" />)}
    <group position={[0, 1.5, 0]} rotation={[0, 0, -0.6 + Math.sin(t * 1.5) * 0.5]}><Blok p={[0.9, 0, 0]} s={[2.0, 0.12, 0.12]} c="#6A4A2E" /></group>
  </group>
);
const Woestijnvlakte = ({ avond = false }: { avond?: boolean }) => (
  <>
    <Lucht boven={avond ? '#4E3A5A' : '#6A7A8A'} horizon={avond ? '#F2A060' : '#D8C2A0'} />
    {avond ? <Avondlicht /> : <Daglicht zon={[-10, 12, 8]} kracht={1.6} />}
    <Grond kleur="#A88A62" />
  </>
);

/* ---------- V · The cracks ---------- */

export const Z53 = () => (
  <InTent nacht over={<LangTeller label="Saladin" waarde="patient" />}>
    <Blok p={[0, 0.45, 0]} s={[2.2, 0.9, 1.2]} c="#6A4A2E" />
    <group position={[0, 0.95, 0]}><Rol open={0.8} /></group>
    <Figuur {...SAL} levend position={[0.9, 0, -0.6]} rotation={[0, -0.5, 0]} pose={{ armR: wijs(0.8), wenk: 0.4 }} />
  </InTent>
);
export const Z54 = () => {
  const f = useCurrentFrame();
  const h = lin(f, 0, 150, 0.35, 0.6);
  return (
    <Slagveld groen cam={[9, 4, 14, 6, 3.4, 11]} kijk={[0, 1.6, -2]} over={<JaarLabel jaar="1178" sub="a new castle at Jacob's Ford" />}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 4]}><planeGeometry args={[60, 3]} /><meshStandardMaterial color="#4A8AA8" roughness={0.3} /></mesh>
      <group position={[0, 0, -3]} scale={[1, h, 1]}><Blok p={[0, 2.5, 0]} s={[10, 5, 1.4]} c="#C9B48A" />{[-5, 5].map((x) => <Blok key={x} p={[x, 3, 0]} s={[2, 6, 2]} c="#BFA87E" />)}</group>
      {[-3, -0.5, 2.5].map((x, i) => <Figuur key={x} kleding={EDEL_B} levend position={[x, 0, 0]} rotation={[0, Math.PI + 0.3 * i, 0]} pose={{ armL: omhoog(), armR: omhoog() }} extra={<Blok p={[0, 2.4, 0]} s={[0.5, 0.35, 0.4]} c="#C9B48A" />} />)}
    </Slagveld>
  );
};
export const Z55 = () => <KaartB van={B_1183} cam={[MIDDEN_B, kp('marj', 8, 7)]} spelden={[['marj', GOUD_VLAG], ['jacob', BLAUW]]} jaar="June 1179" sub="Marj Ayyun" />;
/** 56 — een ridder draagt de gevallen koning op zijn rug weg; het paard zonder ruiter ernaast. */
export const Z56 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const x = lin(f, 0, 150, 2, -2);
  return (
    <Slagveld cam={[4, 2.4, 9, 3, 2.2, 8]} kijk={[x, 1.4, 0]} over={<LangTeller label="You can't hold" waarde="the reins" />}>
      <group position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <Figuur kleding={RIDDER} hoofddeksel="helm" levend pose={{ armL: { schouder: [-0.6, 0, 0.6], elleboog: [0, 1.4] }, armR: { schouder: [-0.6, 0, -0.6], elleboog: [0, -1.4] }, hoofd: [0.2, 0, 0] }} />
        <group position={[0, 1.7, -0.45]} rotation={[0.25, 0, 0]}><Koning ziek={1} scale={0.8} pose={{ wenk: -0.5, ogen: 'dicht' }} /></group>
      </group>
      <Paard position={[x + 3.2, 0, -2]} rotation={[0, -Math.PI / 2, 0]} kleur="#6A4A30" dek={BLAUW} t={t} />
    </Slagveld>
  );
};
export const Z57 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[10, 4, 15, 7, 3.4, 12]} kijk={[0, 2, -3]} over={<JaarLabel jaar="August 1179" sub="Jacob's Ford" />}>
      <group position={[0, 0, -3]} scale={[1, 0.55, 1]}><Blok p={[0, 2.5, 0]} s={[10, 5, 1.4]} c="#C9B48A" />{[-5, 5].map((x) => <Blok key={x} p={[x, 3, 0]} s={[2, 6, 2]} c="#BFA87E" />)}</group>
      <Leger rijen={3} kolommen={12} kleur="#E2D6BC" schild={GOUD_VLAG} position={[0, 0, 4]} rotation={[0, Math.PI, 0]} t={t} />
      <Katapult position={[-6, 0, 2]} t={t} />
      <Katapult position={[6, 0, 2]} t={t + 1} />
    </Slagveld>
  );
};
export const Z58 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld avond cam={[7, 3, 12, 5, 2.6, 10]} kijk={[0, 1, -3]} over={<LangTeller label="Your new castle" waarde="gone" />}>
      <Blok p={[-3, 0.8, -3]} s={[4, 1.6, 1.4]} c="#A8946E" r={[0, 0.1, 0.05]} />
      <Blok p={[2.4, 0.5, -3.2]} s={[3, 1.0, 1.4]} c="#A8946E" r={[0.1, -0.2, 0]} />
      {[-4, 0.5, 4].map((x, i) => <Blok key={x} p={[x, 0.25, -1.6 + i * 0.4]} s={[0.9, 0.5, 0.8]} c="#9A8662" r={[0.4, i, 0.3]} />)}
      {[-2, 3].map((x, i) => <Rook key={x} position={[x, 0, -4]} t={t + i} kleur="#6A5E52" />)}
    </Slagveld>
  );
};
export const Z59 = () => <S_Onderhandeling verdrag over={<JaarLabel jaar="1180" sub="a truce with Saladin" />} />;
export const Z60 = () => (
  <InHal over={<LangTeller label="Who comes next?" waarde="the fight begins" />}>
    <Koning ziek={2} scale={0.88} position={[0, 0.6, -4.4]} pose={{ wenk: -0.3 }} />
    <Figuur kleding={EDEL_A} snor levend position={[-1.6, 0, -1.2]} rotation={[0, 0.9, 0]} pose={{ armR: wijs(1.1), mond: 'open', wenk: 0.8 }} />
    <Figuur kleding={RAYMOND} baard haar="kort" levend position={[1.4, 0, -1.0]} rotation={[0, -0.9, 0]} pose={{ armL: wijs(1.1), mond: 'open', wenk: 0.8 }} />
  </InHal>
);
export const Z61 = () => (
  <InHal over={<LangTeller label="Guy of Lusignan" waarde="handsome" pil="and ambitious" />}>
    <Figuur kleding={GUY} haar="kort" levend position={[-0.5, 0, -0.4]} rotation={[0, 0.5, 0]} pose={{ mond: 'lach', wenk: 0.2 }} />
    <Figuur kleding={SIBYLLA} haar="lang" levend position={[0.7, 0, -0.6]} rotation={[0, -0.6, 0]} pose={{ mond: 'lach' }} />
  </InHal>
);
export const Z62 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.8, -1]} over={<JaarLabel jaar="Easter 1180" sub="Sibylla marries Guy" />}>
      <Figuur kleding={SIBYLLA} haar="lang" levend position={[-0.5, 0, -1]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach' }} />
      <Figuur kleding={GUY} haar="kort" levend position={[0.5, 0, -1]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach' }} />
      {[-2.6, -1.8, 2.0, 2.8].map((x, i) => <Figuur key={x} kleding={i % 2 ? EDEL_B : EDEL_A} levend position={[x, 0, 1.0]} rotation={[0, x < 0 ? 0.6 : -0.6, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.8 }} />)}
      {f < 0 && null}
    </InHal>
  );
};
/** 63 — twee kampen, een gat ertussen. */
export const Z63 = () => (
  <InHal kijk={[0, 1.8, -1]} van={[0, 3.2, 8]} naar={[0, 2.8, 6.6]} over={<LangTeller label="Your court" waarde="two camps" />}>
    <Figuur kleding={RAYMOND} baard haar="kort" levend position={[-2.2, 0, -1]} rotation={[0, 0.8, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.9 }} />
    {[-3.2, -2.8].map((x, i) => <Figuur key={x} kleding={i ? EDEL_B : EDEL_A} levend position={[x, 0, -2.2 + i * 2.2]} rotation={[0, 0.8, 0]} pose={{ wenk: 0.6 }} />)}
    <Figuur kleding={GUY} haar="kort" levend position={[2.2, 0, -1]} rotation={[0, -0.8, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.9 }} />
    <Figuur kleding={REYNALD} baard levend position={[3.2, 0, -2.0]} rotation={[0, -0.8, 0]} pose={{ wenk: 0.6 }} />
  </InHal>
);
export const Z64 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Portret ver={2.2} kijkY={1.8} over={<LangTeller label="Truce" waarde="broken" pil="Reynald raids caravans" />}
      wie={<group position={[lin(f, 0, 200, 3, 0), 0, -1]}>{[0, 1, 2, 3].map((i) => <Kameel key={i} position={[i * 2.6 - 4, 0, (i % 2) * 0.6]} rotation={[0, Math.PI / 2, 0]} t={t + i} loopt kleur={['#B88A55', '#C49A64', '#A87C4A', '#BE9460'][i]} />)}</group>}
      extra={<group position={[lin(f, 0, 200, -9, -4.5), 0, 2]}>{[0, 1].map((i) => <Paard key={i} position={[i * -1.8, 0, i * 1.2]} rotation={[0, Math.PI / 2, 0]} t={t + i} loopt kleur="#3A2A20" dek="#3A2A3A" ruiter={<Figuur kleding={i ? RIDDER : REYNALD} hoofddeksel={i ? 'helm' : null} baard={!i} pose={{ armR: omhoog(), hoofd: [0, -0.8, 0] }} inHand={<Zwaard />} />} />)}</group>}
    />
  );
};
export const Z65 = () => <KaartB van={B_1183} cam={[kp('aqaba', 12, 10, 2), { lon: 37.2, lat: 26.5, h: 14, a: 10, dx: 1 }]} route={[[35.0, 29.53], [35.6, 27.9], [36.6, 26.2], [37.6, 24.9]]} routeTijd={[10, 130]} kop={<group scale={0.12}><Zeilschip rotation={[0, Math.PI / 2, 0]} vlag="#3A2A3A" /></group>} jaar="1182-83" sub="Reynald's ships in the Red Sea" />;
export const Z66 = () => <S_Eed />;

/* ---------- VI · The blind king ---------- */

export const Z67 = () => <KaartB van={B_1183} cam={[VER_B, kp('belvoir', 8, 7)]} spelden={[['belvoir', BLAUW]]} route={r('damascus', 'belvoir')} routeTijd={[10, 100]} kop={<MiniS />} jaar="July 1182" sub="Belvoir castle" />;
export const Z68 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[12, 5, 16, 9, 4, 13]} kijk={[0, 1.2, 0]} over={<LangTeller label="Winner" waarde="nobody" />}>
      <Zon position={[30, 40, -80]} grootte={14} kleur="#FFF2C0" />
      <Leger rijen={3} kolommen={10} kleur="#ECE6D8" schild={BLAUW} position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t} />
      <Leger rijen={3} kolommen={10} kleur="#E2D6BC" schild={GOUD_VLAG} position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} t={t} />
    </Slagveld>
  );
};
/** 69 — close-up: hij kijkt naar zijn verbonden handen. */
export const Z69 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.8, 0]} scherpte={4} mist={['#1A120C', 5, 20]}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.5]} />
      <pointLight position={[1.2, 2.4, 1.6]} intensity={7} distance={7} color="#FFA850" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#5A4232" />
      <Camera pos={[ease(f, 0, 150, 0.8, 0.4), 2.0, ease(f, 0, 150, 5.0, 4.2)]} kijk={[0, 1.6, 0]} fov={34} />
      <Koning ziek={2} position={[0, 0, 0]} pose={{ wenk: -0.6, hoofd: [0.45, 0, 0], armR: { schouder: [-0.9, 0, -0.25], elleboog: [0, -0.8] }, armL: { schouder: [-0.9, 0, 0.25], elleboog: [0, 0.8] } }} />
    </Shot>
  );
};
/** 70 — op de troon, kan niet meer staan; twee dienaren ondersteunen hem. */
export const Z70 = () => (
  <InHal kijk={[0, 1.9, -4.2]} van={[1.4, 2.4, 2.6]} naar={[0.6, 2.2, 1.2]} over={<LangTeller label="Your feet" waarde="numb" pil="you can't walk" />}>
    <Koning ziek={2} scale={0.88} position={[0, 0.6, -4.4]} pose={{ wenk: -0.4 }} />
    <Figuur kleding={BEDIENDE} levend position={[-1.0, 0.6, -4.0]} rotation={[0, 0.6, 0]} pose={{ armR: wijs(0.7) }} />
    <Figuur kleding={BEDIENDE} levend position={[1.0, 0.6, -4.0]} rotation={[0, -0.6, 0]} pose={{ armL: wijs(0.7) }} />
  </InHal>
);
export const Z71 = () => <S_Blind />;
export const Z72 = () => <Ziekbed over={<JaarLabel jaar="1183" sub="a fever in Nazareth" />} wie={{ ...BW(2, true), pose: { ogen: 'dicht', wenk: -0.5 } }} bij={<Figuur kleding={WILLEM} haar="kort" levend position={[-0.6, 0, -1.4]} rotation={[0, 0.2, 0]} pose={{ wenk: -0.8, hoofd: [0.3, 0, 0] }} />} />;
export const Z73 = () => (
  <InHal over={<LangTeller label="Regent" waarde="Guy of Lusignan" />}>
    <Koning ziek={2} blind scale={0.88} position={[0, 0.6, -4.4]} pose={{ armR: wijs(0.9) }} />
    <Figuur kleding={GUY} haar="kort" levend position={[0, 0, -2.4]} rotation={[0, Math.PI, 0]} pose={{ armR: omhoog(), mond: 'lach' }} inHand={<Zwaard />} />
  </InHal>
);
export const Z74 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[12, 6, 17, 9, 5, 14]} kijk={[0, 1, -2]} over={<JaarLabel jaar="Autumn 1183" sub="two armies, side by side" />}>
      <Leger rijen={4} kolommen={12} kleur="#ECE6D8" schild={BLAUW} position={[-7, 0, 0]} rotation={[0, Math.PI / 2, 0]} t={t * 0.3} />
      {[3, 6, 9].map((x, i) => <Tent key={x} position={[x, 0, -4 + i * 2]} kleur="#E2D6BC" />)}
      <Leger rijen={3} kolommen={8} kleur="#E2D6BC" schild={GOUD_VLAG} position={[6, 0, 2]} rotation={[0, -Math.PI / 2, 0]} t={t} />
    </Slagveld>
  );
};
export const Z75 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Slagveld cam={[5, 2.6, 10, 3, 2.3, 8]} kijk={[0, 1.6, 0]} over={<LangTeller label="Guy" waarde="doesn't attack" />}>
      <Figuur kleding={GUY} haar="kort" levend position={[-0.6, 0, 0.4]} rotation={[0, 0.6, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: -0.3 }} />
      <Figuur kleding={RAYMOND} baard haar="kort" levend position={[0.9, 0, 0]} rotation={[0, -0.7, 0]} pose={{ armR: wijs(1.1), mond: 'open', wenk: 0.9 }} />
      <Figuur kleding={EDEL_A} snor levend position={[1.6, 0, -1.2]} rotation={[0, -0.7, 0]} pose={{ armL: omhoog(), mond: 'open', wenk: 0.9 }} />
      <Leger rijen={2} kolommen={10} kleur="#E2D6BC" schild={GOUD_VLAG} position={[lin(f, 0, 200, 0, 10), 0, -16]} rotation={[0, Math.PI / 2, 0]} t={t} />
    </Slagveld>
  );
};
export const Z76 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.9, 0]} scherpte={4} mist={['#1A120C', 5, 20]} over={f > 30 ? <Stempel tekst="FURIOUS" vanaf={30} top={560} /> : undefined}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#8A6A48', '#1A120C', 0.5]} />
      <pointLight position={[1.2, 2.4, 1.6]} intensity={8} distance={7} color="#FF9A50" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#5A4232" />
      <Camera pos={[ease(f, 0, 100, 0.5, 0.1), 2.0, ease(f, 0, 100, 5.0, 4.2)]} kijk={[0, 1.75, 0]} fov={34} />
      <Koning ziek={2} blind position={[0, 0, 0]} pose={{ wenk: 1, mond: 'open', armR: omhoog() }} />
    </Shot>
  );
};
export const Z77 = () => (
  <InHal over={<JaarLabel jaar="November 1183" sub="Baldwin V, co-king at five" />}>
    <Koning ziek={2} blind scale={0.88} position={[-1.0, 0.6, -4.4]} rotation={[0, 0.3, 0]} />
    <KleineKoning position={[0.6, 0.6, -4.2]} rotation={[0, -0.2, 0]} />
    <Figuur kleding={PATRIARCH} baard haar="grijs" levend position={[1.8, 0, -2.6]} rotation={[0, -0.8, 0]} pose={{ armR: { schouder: [-2.0, 0, -0.4], elleboog: [0, -0.3] } }} />
    <Figuur kleding={GUY} haar="kort" levend position={[-2.6, 0, 0.6]} rotation={[0, 0.6, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.9 }} />
  </InHal>
);
export const Z78 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={4} mist={['#1A120C', 5, 20]} over={<LangTeller label="Guy" waarde="not king" pil="not while you breathe" />}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.5]} />
      <pointLight position={[-1.2, 2.4, 1.6]} intensity={7} distance={7} color="#FFA850" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#5A4232" />
      <Camera pos={[ease(f, 0, 150, -0.6, -0.2), 2.0, ease(f, 0, 150, 5.0, 4.2)]} kijk={[0, 1.75, 0]} fov={34} />
      <Koning ziek={2} blind position={[0, 0, 0]} pose={{ wenk: 0.8 }} />
    </Shot>
  );
};

/* ---------- VII · Kerak ---------- */

export const Z79 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 6, -12]} scherpte={1.8} mist={['#9A7A5A', 26, 140]} over={<JaarLabel jaar="Kerak, 1183" sub="a wedding" />}>
      <Woestijnvlakte />
      <Camera pos={[ease(f, 0, 150, 6, 3), ease(f, 0, 150, 3, 4), ease(f, 0, 150, 12, 9)]} kijk={[0, 6, -12]} fov={36} />
      <Kerak banieren t={f / FPS} />
    </Shot>
  );
};
export const Z80 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.4, -1]} over={<LangTeller label="Isabella" waarde="age 11" pil="marries Humphrey of Toron" />}>
      <Figuur kleding={ISABELLA} haar="lang" levend scale={0.74} position={[-0.4, 0, -1]} rotation={[0, 0.3, 0]} pose={{ mond: 'lach' }} />
      <Figuur kleding={HUMPHREY} haar="kort" levend scale={0.84} position={[0.5, 0, -1]} rotation={[0, -0.3, 0]} pose={{ mond: 'lach' }} />
      <Menigte n={8} z={2.6} x0={-4} t={f / FPS} juich />
    </InHal>
  );
};
export const Z81 = () => <S_Kerak />;
export const Z82 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 4, -10]} scherpte={1.8} mist={['#9A7A5A', 26, 140]} over={<LangTeller label="Saladin's catapults" waarde="day and night" />}>
      <Woestijnvlakte />
      <Camera pos={[ease(f, 0, 150, 12, 9), ease(f, 0, 150, 5, 4), ease(f, 0, 150, 14, 11)]} kijk={[0, 4, -10]} fov={38} />
      <Kerak t={t} />
      {[-7, 0, 7].map((x, i) => <Katapult key={x} position={[x, 0, 1 + (i % 2)]} t={t + i} />)}
      <Leger rijen={2} kolommen={12} kleur="#E2D6BC" schild={GOUD_VLAG} position={[0, 0, 4]} rotation={[0, Math.PI, 0]} t={t} />
      {[0, 1].map((i) => { const p = ((t * 0.6 + i * 0.5) % 1); return <Blok key={i} p={[-6 + p * 6 + i * 5, 2 + Math.sin(p * Math.PI) * 6, 1 - p * 11]} s={[0.4, 0.4, 0.4]} c="#7A6A58" />; })}
    </Shot>
  );
};
/** 83 — binnen gaat het feest door: tafel, muziek. */
export const Z83 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <InHal kijk={[0, 1.4, -1]} over={<LangTeller label="Inside" waarde="the party goes on" />}>
      <Blok p={[0, 0.45, -1]} s={[4, 0.9, 1.2]} c="#6A4A2E" />
      {[-1.4, -0.5, 0.4, 1.3].map((x, i) => <Blok key={x} p={[x, 0.98, -1 + (i % 2) * 0.2]} s={[0.3, 0.12, 0.3]} c={i % 2 ? '#C9CDD2' : '#B8912F'} metal={0.6} />)}
      <Figuur kleding={ISABELLA} haar="lang" levend scale={0.74} position={[-0.4, 0, -2]} pose={{ mond: 'lach' }} />
      <Figuur kleding={HUMPHREY} haar="kort" levend scale={0.84} position={[0.5, 0, -2]} pose={{ mond: 'lach' }} />
      {[-2.6, 2.6].map((x, i) => <Figuur key={x} kleding={i ? EDEL_B : EDEL_A} levend position={[x, 0, 0]} rotation={[0, x < 0 ? 0.7 : -0.7, 0]} pose={{ armR: omhoog(), mond: 'lach', hoofd: [0, Math.sin(t * 3 + i) * 0.2, 0] }} />)}
    </InHal>
  );
};
export const Z84 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 150, -4, 1.5);
  return (
    <Shot focus={[0, 1.6, z]} scherpte={2.4} mist={['#9A7A5A', 20, 120]} over={<LangTeller label="Legend" waarde="a plate of food" pil="from the groom's mother" />}>
      <Woestijnvlakte />
      <Camera pos={[2.6, 2.4, 8.5]} kijk={[0, 1.8, z]} fov={34} />
      <Kerak t={t} />
      <Figuur kleding={BEDIENDE} levend position={[0, 0, z]} rotation={[0, 0, 0]} pose={{ armL: { schouder: [-1.4, 0, 0.3], elleboog: [0, 0.6] }, armR: { schouder: [-1.4, 0, -0.3], elleboog: [0, -0.6] } }} extra={<><Blok p={[0, 1.55, 0.55]} s={[0.8, 0.06, 0.6]} c="#C9CDD2" metal={0.6} /><Blok p={[0, 1.66, 0.55]} s={[0.5, 0.16, 0.36]} c="#B87A3A" /></>} />
    </Shot>
  );
};
export const Z85 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 5, -12]} scherpte={1.6} mist={['#9A7A5A', 30, 160]} over={<LangTeller label="Saladin" waarde="spares that tower" />}>
      <Woestijnvlakte avond />
      <Camera pos={[ease(f, 0, 150, 6, 4), 3.0, ease(f, 0, 150, 10, 8)]} kijk={[2, 6, -12]} fov={36} />
      <Kerak toren t={f / FPS} />
      <Figuur {...SAL} levend position={[1.4, 0, 2.4]} rotation={[0, Math.PI + 0.3, 0]} pose={{ armR: wijs(1.7) }} />
    </Shot>
  );
};
export const Z86 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 6, -12]} scherpte={1.8} mist={['#7A5A4A', 26, 140]} over={<Stempel tekst="LEGEND?" vanaf={20} top={140} kleur="#E2BE58" />}>
      <Woestijnvlakte avond />
      <Zon position={[-30, 6, -110]} grootte={12} kleur="#FFB070" />
      <Camera pos={[ease(f, 0, 150, -4, -2), 3, ease(f, 0, 150, 11, 9)]} kijk={[0, 6, -12]} fov={36} />
      <Kerak toren banieren t={f / FPS} />
    </Shot>
  );
};
export const Z87 = () => <Ziekbed over={<LangTeller label="Your body" waarde="can't walk, can't see" />} wie={{ ...BW(2, true), pose: { wenk: 0.6, hoofd: [0, 0, -0.25] } }} />;
export const Z88 = () => <S_Draagbaar masker={false} />;
export const Z89 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3, -8]} scherpte={1.8} mist={['#9A7A5A', 26, 140]} over={<LangTeller label="Saladin" waarde="leaves" pil="December 1183" />}>
      <Woestijnvlakte />
      <Camera pos={[ease(f, 0, 150, 10, 12), ease(f, 0, 150, 5, 6), ease(f, 0, 150, 14, 16)]} kijk={[0, 3, -8]} fov={38} />
      <Kerak t={t} />
      <group position={[lin(f, 0, 200, 0, 14), 0, 2]}><Leger rijen={2} kolommen={10} kleur="#E2D6BC" schild={GOUD_VLAG} rotation={[0, Math.PI / 2, 0]} t={t} position={[0, 0, 0]} /></group>
    </Shot>
  );
};
export const Z90 = () => <KaartB van={B_1183} cam={[kp('jerusalem', 9, 8), kp('kerak', 9, 8)]} route={r('jerusalem', 'kerak')} routeTijd={[10, 100]} kop={<MiniB />} spelden={[['kerak', BLAUW]]} jaar="1184" sub="Kerak again" />;

/* ---------- VIII · The last months ---------- */

export const Z91 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={3.6} mist={['#2A1E18', 8, 30]} over={<LangTeller label="Age" waarde="23" pil="running out of time" />}>
      <Lucht boven="#2A1E18" horizon="#4A3020" />
      <hemisphereLight args={['#FFB070', '#1A120C', 0.5]} />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#5A4232" />
      <Blok p={[-1.4, 3.0, -1.44]} s={[1.2, 1.8, 0.04]} c="#F2A060" emissive="#C8602A" />
      <directionalLight position={[-3, 3, 2]} intensity={1.6} color="#FFB070" />
      <Camera pos={[ease(f, 0, 150, 1.4, 0.8), 2.1, ease(f, 0, 150, 4.6, 3.6)]} kijk={[0, 1.9, 0]} fov={34} />
      <Koning ziek={2} blind position={[0, 0, 0]} rotation={[0, -0.3, 0]} pose={{ wenk: -0.3, hoofd: [0.2, 0.3, 0] }} />
    </Shot>
  );
};
export const Z92 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Haven cam={[5, 2.6, 12, 3, 2.4, 10]} over={<JaarLabel jaar="1184" sub="the Patriarch sails to Europe" />}>
      <Zeilschip position={[lin(f, 0, 200, 0, -8), 0, -4]} rotation={[0, Math.PI / 2, 0]} t={t} vlag={BLAUW} />
    </Haven>
  );
};
const Sleutel = () => (
  <group>
    <Blok p={[0, 0, 0]} s={[0.08, 0.6, 0.08]} c="#E2BE58" metal={0.8} rough={0.25} />
    <Blok p={[0, 0.36, 0]} s={[0.26, 0.2, 0.06]} c="#E2BE58" metal={0.8} rough={0.25} />
    <Blok p={[0.08, -0.24, 0]} s={[0.14, 0.08, 0.06]} c="#E2BE58" metal={0.8} rough={0.25} />
  </group>
);
export const Z93 = () => (
  <InHal over={<LangTeller label="Offered" waarde="the keys of Jerusalem" pil="to Henry II of England" />}>
    <Figuur kleding={HENRY} baard haar="kort" levend position={[0.4, 0.6, -4.4]} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} pose={{ wenk: 0.2 }} />
    <Figuur kleding={PATRIARCH} baard haar="grijs" levend position={[-0.6, 0, -2.2]} rotation={[0, Math.PI - 0.3, 0]} pose={{ armR: { schouder: [-1.5, 0, -0.2], elleboog: [0, -0.2] } }} inHand={<Sleutel />} />
  </InHal>
);
export const Z94 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0.4, 2.2, -4.4]} van={[1.2, 2.6, 0.6]} naar={[0.8, 2.5, -0.4]} over={<Stempel tekst="NO" vanaf={24} top={600} />}>
      <Figuur kleding={HENRY} baard haar="kort" position={[0.4, 0.6, -4.4]} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} pose={{ hoofd: [0, Math.sin(f / 5) * 0.35, 0], armR: { schouder: [-1.0, 0, -0.4], elleboog: [0, -0.4] } }} />
    </InHal>
  );
};
export const Z95 = () => (
  <InHal over={<LangTeller label="The oath" waarde="Baldwin V king" pil="Raymond regent" />}>
    <Koning ziek={2} blind scale={0.88} position={[-1.0, 0.6, -4.4]} rotation={[0, 0.3, 0]} />
    <KleineKoning position={[0.6, 0.6, -4.2]} rotation={[0, -0.2, 0]} />
    {[-2.0, -0.6, 0.8, 2.2].map((x, i) => <Figuur key={x} kleding={[RAYMOND, EDEL_A, EDEL_B, RIDDER][i]} baard={i === 0} haar="kort" levend position={[x, 0, -1.6]} rotation={[0, Math.PI, 0]} pose={{ armR: omhoog() }} />)}
  </InHal>
);
export const Z96 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 1.8, 0]} scherpte={3} mist={['#1E1610', 6, 30]} over={<LangTeller label="Guy" waarde="no crown" />}>
      <Lucht boven="#1E1610" horizon="#3A2A20" />
      <hemisphereLight args={['#C8B8A0', '#3A2A20', 1.0]} />
      <pointLight position={[1.0, 2.6, 2.4]} intensity={8} distance={8} color="#FFC890" />
      <Grond kleur="#4A3A2C" />
      <Blok p={[0, 3, -1.2]} s={[10, 6, 0.6]} c="#8E7E66" />
      <Blok p={[0.8, 1.6, -0.86]} s={[1.6, 3.2, 0.1]} c="#5A3B24" />
      <Camera pos={[ease(f, 0, 150, 2.4, 1.6), 2.0, ease(f, 0, 150, 5.6, 4.6)]} kijk={[0, 1.7, 0]} fov={34} />
      <Figuur kleding={GUY} haar="kort" levend position={[-0.6, 0, 0.2]} rotation={[0, 0.5, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 1, mond: 'open' }} />
    </Shot>
  );
};
export const Z97 = () => (
  <>
    <S_Sterfbed />
    <JaarLabel jaar="Spring 1185" sub="Jerusalem" />
  </>
);
export const Z98 = () => {
  const f = useCurrentFrame();
  return (
    <InHal kijk={[0, 1.4, -4.6]} van={[2.2, 2.6, 4]} naar={[0.8, 2.1, 1.8]} over={<LangTeller label="Married" waarde="never" pil="no children" />}>
      <Kroon position={[0, 1.02, -4.6]} />
      {f < 0 && null}
    </InHal>
  );
};
/** 99 — "zoals in de film": het masker, in een gouden lijst. */
export const Z99 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={4} mist={['#1A120C', 6, 24]} over={<Schilderijlijst titel="the movie version" />}>
      <Lucht boven="#1A1410" horizon="#2A2018" />
      <hemisphereLight args={['#B8C4D0', '#1A120C', 0.6]} />
      <pointLight position={[1.4, 2.6, 2]} intensity={8} distance={8} color="#FFD8A0" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#3A3036" />
      <Camera pos={[ease(f, 0, 150, 0.5, 0.2), 2.1, ease(f, 0, 150, 3.6, 2.9)]} kijk={[0, 2.0, 0]} fov={34} />
      <Figuur kleding={BALDWIN} haar="kaal" levend hoofdExtra={<><Masker /><Kroon position={[0, 0.84, 0]} /></>} position={[0, 0, 0]} pose={{ wenk: 0.2 }} />
    </Shot>
  );
};
export const Z100 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.0, 0]} scherpte={4} mist={['#1A120C', 6, 24]} over={<><Schilderijlijst titel="the movie version" /><Stempel tekst="NO PROOF" vanaf={18} top={160} /><LangTeller label="The mask" waarde="a 2005 film" /></>}>
      <Lucht boven="#1A1410" horizon="#2A2018" />
      <hemisphereLight args={['#B8C4D0', '#1A120C', 0.6]} />
      <pointLight position={[1.4, 2.6, 2]} intensity={8} distance={8} color="#FFD8A0" />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#3A3036" />
      <Camera pos={[0.2, 2.1, ease(f, 0, 150, 2.9, 3.6)]} kijk={[0, 2.0, 0]} fov={34} />
      <Figuur kleding={BALDWIN} haar="kaal" hoofdExtra={<><Masker /><Kroon position={[0, 0.84, 0]} /></>} position={[0, 0, 0]} />
    </Shot>
  );
};
/** 101 — wat de bronnen zeggen: hij kwam opdagen. Draagbaar voor het leger bij dageraad. */
export const Z101 = () => <S_Draagbaar masker={false} />;

/* ---------- IX · After you ---------- */

export const Z102 = () => <Ziekbed donker={1} over={<JaarLabel jaar="1186" sub="the boy king dies" />} wie={{ kleding: BALDWIN_KIND, haar: 'kort', scale: 0.6, pose: { ogen: 'dicht' } }} />;
export const Z103 = () => (
  <InHal over={<JaarLabel jaar="1186" sub="Sibylla crowns Guy" />}>
    <Figuur kleding={GUY} haar="kort" levend position={[0, 0.6, -4.4]} pose={{ mond: 'lach' }} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} />
    <Figuur kleding={SIBYLLA} haar="lang" levend position={[-1.2, 0.6, -4.0]} rotation={[0, 0.7, 0]} pose={{ mond: 'lach', armR: wijs(1.2) }} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} />
    {[-2.4, 2.6].map((x, i) => <Figuur key={x} kleding={i ? RAYMOND : EDEL_A} baard={!!i} levend position={[x, 0, -0.8]} rotation={[0, Math.PI + (x < 0 ? -0.6 : 0.6), 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.9 }} />)}
  </InHal>
);
export const Z104 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 2.1, 0]} scherpte={4} mist={['#3A2A20', 8, 30]} over={<LangTeller label="Exactly what" waarde="you tried to stop" />}>
      <Lucht boven="#3A2A20" horizon="#5A4432" />
      <hemisphereLight args={['#FFD8A0', '#3A2A20', 0.7]} />
      <Grond kleur="#C9B48E" />
      <Blok p={[0, 4, -2]} s={[18, 8, 0.6]} c="#DCCAA6" />
      <Camera pos={[ease(f, 0, 150, 0.6, 0.2), 2.2, ease(f, 0, 150, 3.6, 2.8)]} kijk={[0, 2.1, 0]} fov={34} />
      <Figuur kleding={GUY} haar="kort" levend position={[0, 0, 0]} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} pose={{ mond: 'lach', wenk: 0.4 }} />
    </Shot>
  );
};
export const Z105 = () => <S_Colonne dorst />;
export const Z106 = () => <S_Hoorns />;
export const Z107 = () => <S_TentHattin fase="binnen" over={<LangTeller label="Saladin" waarde="keeps his promise" />} />;
export const Z108 = () => <S_Valt />;
export const Z109 = () => <KaartB van={B_1183} naar={B_1187} wissel={[15, 110]} cam={[MIDDEN_B, VER_B]} spelden={[['jerusalem', GOUD_VLAG]]} jaar="October 1187" sub="Jerusalem surrenders" />;
export const Z110 = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 5.4, 0]} scherpte={2.4} mist={['#141820', 10, 70]} over={<LangTeller label="What if" waarde="you had lived?" />}>
      <Lucht boven="#0E1220" horizon="#2A3450" />
      <Nachtlicht />
      <Grond kleur="#4A4436" />
      <Camera pos={[ease(f, 0, 150, 3.2, 2.2), 7.6, ease(f, 0, 150, 8.6, 7.4)]} kijk={[0, 6.8, 0]} fov={36} />
      <group rotation={[0, Math.PI, 0]}><Muur vlag={BLAUW} /></group>
      <Koning ziek={1} scale={0.85} position={[0, 5.5, 0.2]} rotation={[0, Math.PI + 0.2, 0]} pose={{ wenk: -0.2 }} />
    </Shot>
  );
};
/** 111 — Baldwin en Saladin tegenover elkaar, de zon ertussen: niet gewonnen, niet verloren. */
export const Z111 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 2.2, 0]} scherpte={2.2} mist={['#E8B888', 24, 150]} over={<LangTeller label="The war" waarde="never lost" pil="while you lived" />}>
      <Lucht boven="#4E3A5A" horizon="#F2A060" />
      <Zon position={[0, 6, -150]} grootte={20} kleur="#FFD08A" />
      <Avondlicht />
      <Grond kleur="#C8AC7A" />
      <Heuvels kleur="#A88A5A" />
      <Camera pos={[0, ease(f, 0, 150, 2.4, 2.8), ease(f, 0, 150, 13, 11)]} kijk={[0, 2.4, 0]} fov={36} />
      <Paard position={[-3.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} kleur="#6A4A30" dek={BLAUW} t={t} ruiter={<Figuur {...BW(1)} pose={{ hoofd: [0, -1.2, 0] }} />} />
      <Paard position={[3.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} kleur="#ECE6D8" dek={GOUD_VLAG} t={t + 1} ruiter={<Figuur {...SAL} pose={{ hoofd: [0, -1.2, 0] }} />} />
    </Shot>
  );
};
export const Z112 = () => (
  <>
    <Portret wie={<Koning ziek={1} pose={{ ...ARMEN_GEKRUIST, wenk: 0.3 }} />} avond kijkY={2.0} />
    <Schilderijlijst titel="Baldwin IV, the Leper King" />
  </>
);
export const Z113 = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 3.0, 0]} scherpte={2.4} mist={['#E8B888', 30, 170]} over={<LangTeller label="Couldn't feel his hands" waarde="held off Saladin" />}>
      <Lucht boven="#4E3A5A" horizon="#F2A060" />
      <Zon position={[-20, 10, -150]} grootte={16} kleur="#FFD08A" />
      <Daglicht zon={[-6, 9, 10]} kleur="#FFC890" kracht={2.2} />
      <Grond kleur="#C8AC7A" />
      <Heuvels kleur="#A88A5A" />
      <Camera pos={[ease(f, 0, 200, 1.6, 2.6), ease(f, 0, 200, 3.2, 3.6), ease(f, 0, 200, 8.2, 11)]} kijk={[0, 3.1, 0]} fov={34} />
      <group position={[0, 0, -30]} scale={1.3}><Muur vlag={BLAUW} /><Stad z={-6} koepels={false} /></group>
      <Leger rijen={2} kolommen={9} kleur="#ECE6D8" schild={BLAUW} position={[0, 0, -8]} t={t} />
      <Paard position={[0, 0, 0]} rotation={[0, Math.PI - 0.35, 0]} kleur="#6A4A30" dek={BLAUW} t={t} ruiter={<Figuur {...BW(1)} pose={{ armR: { schouder: [-2.3, 0, 0.35], elleboog: [0, -0.2] }, wenk: 0.3 }} inHand={<Zwaard />} />} />
    </Shot>
  );
};
export const Z114 = () => <Z113 />;

/* niet gebruikt maar handig: */
export { InTent, Menigte, Slagveld, VoorMuur, S_Blind, WILLEM, SARACEEN, B_1174, MiniS, Avondlicht };
