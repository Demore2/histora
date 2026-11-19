import { useCurrentFrame } from 'remotion';
import { Avondlicht, Camera, Fakkel, Lucht, Rook, TekstVlak, Zee } from '../watals/Decor';
import { ARMEN_GEKRUIST, Blok, omhoog, wijs, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import {
  Aqtay,
  B_VER,
  B_ZUID,
  Baibars,
  bk,
  bp,
  Brief,
  BURGER,
  BURGER2,
  Cairo,
  Eskadron,
  GevallenHelm,
  Heuvelland,
  Hulagu,
  KaartB,
  KaartPijl,
  Kaars,
  Kitbuqa,
  Mameluk,
  MiniBaibars,
  MiniRuiter,
  Mongool,
  OpPaard,
  Paleis,
  Qutuz,
  Sabel,
  Turanshah,
  Uitroep,
  Vaandel,
  VROUW,
  Zamt,
  Kraai,
  LeeuwVaandel,
  Beker,
  Zegel,
  MongoolHelm as Mongoolhelm0,
  JaarTeller,
} from './BaibarsKit';
import { SultanTroon } from './BaibarsScenes';
import type { ShotDef } from './BaibarsShot';
import { B_1250, B_1258, B_1260, B_1260B, opB, type BStand } from './KaarttafelBaibars';
import { JaarLabel, LangTeller, ORANJE, SERIF } from './LangHud';
import { BoosTeken, camPos, FiguurL, Pijllabel, TelTeller, Voorbehoud, Wolk, Zit, Zweet } from './LeonidasKit';

/**
 * Scènes voor "Baibars", hoofdstuk IV-VI (zin 39-68). Regel 10/11 uit het scratchboard: de moord op Turanshah en
 * Aqtay blijft buiten beeld (schaduw, gevallen beker, lege stoel), en zin 56 toont alleen de verscheurde brief en de
 * dichte poort met een kraai, geen hoofden.
 */

const GROEN = '#3E8A4A';

/* ================= IV · The blood oath ================= */

/** De nieuwe sultan op zijn troon, zijn ogen schieten heen en weer naar de Mamelukken. */
export const S_Turanshah = () => {
  const f = useCurrentFrame();
  const ogen = Math.sin(f / 7) * 0.7;
  return (
    <Paleis cam={[2.2, 2.4, 7.6, 1.5, 2.2, 6.4]} kijk={[0, 1.6, -0.6]} over={<Pijllabel tekst="Turanshah, the new sultan" x={1300} y={230} naar={[1010, 380]} vanaf={14} />}>
      <SultanTroon position={[0, 0, -1.4]} kussen />
      <Zit kleding={{ huid: '#D0A07A', haar: '#1A1210', tuniek: '#7B5BA0', rok: '#6A4A90', schoenen: '#B8912F', cape: '#D8A945', riem: '#D8A945' }} haar="kort" hoofddeksel="tulband" position={[0, 0.2, -1.3]} pose={{ hoofd: [0, ogen, 0], wenk: 0.8 }} />
      {[-3.4, -2.4, 2.4, 3.4].map((x, i) => <Mameluk key={x} v={i} position={[x, 0, -0.4 + (i % 2) * 0.4]} rotation={[0, -Math.sign(x) * 0.7, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.3 }} />)}
    </Paleis>
  );
};

/** Het feest: dronken slaat hij de kaarsen om met zijn zwaard en roept namen. */
export const S_Kaarsen = () => {
  const f = useCurrentFrame();
  const zwaai = Math.sin(f / 4);
  return (
    <Paleis donker cam={[1.6, 2.2, 6.4, 1.1, 2.1, 5.4]} kijk={[0, 1.4, 0]}>
      <Blok p={[0.6, 0.45, 0.2]} s={[2.6, 0.9, 0.9]} c="#6B4A2E" />
      {[-0.4, 0.0, 0.4, 0.8, 1.2, 1.6].map((x, i) => {
        const om = f > 20 + i * 14;
        return <Kaars key={x} position={[x, 0.9, 0.2]} uit={om ? Math.min(1.2, (f - 20 - i * 14) / 8) : 0} h={om ? 0.12 : 0.36} />;
      })}
      <Turanshah position={[-1.3, 0, 0]} rotation={[0, 0.8, 0]} pose={{ armR: { schouder: [-1.4 + zwaai * 0.5, 0, 0.6 + zwaai * 0.4], elleboog: [0, -0.2] }, armL: { schouder: [-0.8, 0, 0.3], elleboog: [0, 0.9] }, mond: 'open', wenk: 0.9 }} inHand={<Sabel />} />
      <group position={[-1.75, 1.95, 0.3]}><Beker /></group>
      <Wolk p={[-0.4, 2.7, 0.4]} tekst={['AQTAY!', 'BAIBARS!']} b={1.1} h={0.62} vanaf={26} staart={-1} />
      <pointLight position={[0.6, 1.6, 1.2]} intensity={3} distance={5} color="#FFB060" />
    </Paleis>
  );
};

/** De Mamelukken kijken elkaar aan, handen aan het gevest. */
export const S_Blikken = () => {
  const f = useCurrentFrame();
  return (
    <Paleis donker cam={[0.3, 2.1, 5.0, 0.2, 2.0, 4.2]} kijk={[0, 1.9, 0]}>
      {[-1.3, 0, 1.3].map((x, i) => (
        <group key={x}>
          {i === 1 ? (
            <Baibars position={[x, 0, -0.3]} pose={{ hoofd: [0, Math.sin(f / 18) * 0.5, 0], wenk: 0.8, armR: { schouder: [-0.3, 0, 0.3], elleboog: [0, -1.0] } }} />
          ) : (
            <Mameluk v={i + 1} position={[x, 0, 0]} rotation={[0, -Math.sign(x) * 0.6, 0]} pose={{ wenk: 0.8, armR: { schouder: [-0.3, 0, 0.3], elleboog: [0, -1.0] } }} />
          )}
        </group>
      ))}
      <pointLight position={[0, 2.4, 1.6]} intensity={3} distance={5} color="#FF9A50" />
    </Paleis>
  );
};

/** Zijn schaduw op de muur, een gevallen beker op de vloer. */
export const S_Schaduw = () => {
  const f = useCurrentFrame();
  const rol = ease(f, 10, 60, 0, 1);
  return (
    <Paleis donker cam={[0.2, 1.2, 4.8, 0.15, 1.2, 4.1]} kijk={[0.7, 0.85, -0.8]}>
      <Blok p={[1.2, 2.2, -2.62]} s={[3.0, 4.4, 0.1]} c="#D8C7A2" />
      <group position={[1.3, 0, -2.55]} scale={[1.2, 1.2, 0.02]}>
        <Baibars o={{ kleur: '#050404', metaal: 0, ruw: 1 }} pose={{ armR: { schouder: [-1.4, 0, -0.2], elleboog: [0, 0] } }} inHand={<Sabel />} />
      </group>
      <pointLight position={[0.4, 1.4, -0.6]} intensity={4} distance={5} color="#FFB060" />
      <group position={[0.0 + rol * 0.5, 0.08, 1.4]} rotation={[0, rol * 3, Math.PI / 2]}><Beker /></group>
      <Blok p={[-0.2 + rol * 0.25, 0.005, 1.5]} s={[0.4 * rol, 0.01, 0.3 * rol]} c="#5A1E2A" />
    </Paleis>
  );
};

/** De rij portretten van de familie van Saladin; het laatste valt van de muur. */
export const S_Portretten = () => {
  const f = useCurrentFrame();
  const val = f < 60 ? 0 : Math.min(1, ((f - 60) / 14) ** 2);
  return (
    <Paleis cam={[0.4, 2.4, 5.6, 0.3, 2.3, 4.8]} kijk={[0, 2.4, -3.4]} over={<LangTeller label="Saladin's family" waarde="the last sultan" pil="gone" />}>
      {[-2.4, -0.8, 0.8, 2.4].map((x, i) => {
        const laatste = i === 3;
        return (
          <group key={x} position={[x, laatste ? 2.6 - val * 2.4 : 2.6, -3.6 + (laatste ? val * 0.6 : 0)]} rotation={[laatste ? -val * 1.3 : 0, 0, laatste ? val * 0.4 : 0]}>
            <Blok p={[0, 0, 0]} s={[1.1, 1.4, 0.08]} c="#D8A945" metal={0.6} rough={0.3} />
            <Blok p={[0, 0, 0.05]} s={[0.92, 1.22, 0.02]} c={['#3A4A6A', '#4A3A5A', '#3A5A4A', '#5A3A3A'][i]} />
            <Blok p={[0, 0.12, 0.07]} s={[0.36, 0.38, 0.02]} c="#C9925F" />
            <Blok p={[0, 0.36, 0.08]} s={[0.4, 0.14, 0.02]} c="#ECE6D8" />
            <Blok p={[0, -0.3, 0.07]} s={[0.6, 0.4, 0.02]} c={['#C99A2E', '#ECE6D8', '#5E8A5A', '#7B5BA0'][i]} />
          </group>
        );
      })}
    </Paleis>
  );
};

/** Ze trekken van twee kanten aan de troon; hij kraakt. */
export const S_TroonTrek = () => {
  const f = useCurrentFrame();
  const ruk = Math.sin(f / 5) * 0.12;
  return (
    <Paleis cam={[0.6, 2.4, 7.2, 0.4, 2.2, 6.0]} kijk={[0, 1.3, -0.6]}>
      <group position={[ruk, 0, -0.6]} rotation={[0, 0, ruk * 0.4]}>
        <SultanTroon />
      </group>
      {[-1, 1].map((k) =>
        [0, 1].map((j) => (
          <Mameluk key={`${k}${j}`} v={k > 0 ? j + 2 : j} position={[k * (1.3 + j * 0.7) + ruk, 0, -0.5 + j * 0.3]} rotation={[0.25 * -k * 0, -k * Math.PI / 2, k * 0.12]} pose={{ armL: { schouder: [-1.5, 0, 0.2], elleboog: [0, 0] }, armR: { schouder: [-1.5, 0, -0.2], elleboog: [0, 0] }, wenk: 0.9, mond: 'open' }} />
        )),
      )}
      {f % 20 < 8 && <Wolk p={[0, 3.2, -0.4]} tekst="CREAK" b={0.9} h={0.36} vanaf={0} staart={0} />}
    </Paleis>
  );
};

/** Aqtay vermoord: een lege stoel met zijn tulband, de kaars dooft. */
export const S_LegeStoel = () => {
  const f = useCurrentFrame();
  return (
    <Paleis donker cam={[0.6, 1.7, 4.6, 0.4, 1.6, 3.8]} kijk={[0, 1.0, -0.4]} over={<Pijllabel tekst="Aqtay, your commander" x={1320} y={260} naar={[990, 470]} vanaf={12} />}>
      <group position={[0, 0, -0.6]}>
        <Blok p={[0, 0.45, 0]} s={[0.9, 0.12, 0.8]} c="#6B4A2E" />
        <Blok p={[0, 1.05, -0.36]} s={[0.9, 1.1, 0.1]} c="#6B4A2E" />
        {[-0.38, 0.38].map((x) => [-0.32, 0.32].map((z) => <Blok key={`${x}${z}`} p={[x, 0.2, z]} s={[0.08, 0.4, 0.08]} c="#5A3B24" />))}
        <group position={[0, 0.0, 0.05]} scale={0.8}><Zamt kap="#5E8A5A" /></group>
      </group>
      <Kaars position={[1.0, 0.6, -0.4]} uit={ease(f, 60, 90, 0, 1.2)} />
      <Blok p={[1.0, 0.3, -0.4]} s={[0.4, 0.6, 0.4]} c="#5A3B24" />
      {f < 90 && <pointLight position={[1.0, 1.2, -0.2]} intensity={3 * (1 - lin(f, 60, 90, 0, 1))} distance={4} color="#FFB060" />}
    </Paleis>
  );
};

/** Vlucht: 's nachts op een paard de poort van Cairo uit. */
export const S_Vlucht = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = ease(f, 10, 160, 0, 9);
  return (
    <Cairo tijd="nacht" poort={1} cam={[4.4, 2.4, 13, 3.2, 2.2, 11]} kijk={[0, 1.8, 2]}>
      <OpPaard position={[0, 0, -1.2 + loop]} rotation={[0, 0.55, 0]} t={t} loopt kleur="#2A1E16" dek="#B3312B">
        <Baibars pose={{ hoofd: [0, -0.5, 0], wenk: 0.6, mond: 'open' }} />
      </OpPaard>
      {[-1, 1].map((k) => <FakkelM key={k} position={[k * 2.9, 0, -0.6]} t={t} />)}
    </Cairo>
  );
};
const FakkelM = ({ position, t }: { position: V3; t: number }) => <Fakkel position={position} t={t} />;

/** Kaart: zes jaar ballingschap, een zigzag langs de Syrische steden. */
export const S_Ballingschap = () => (
  <KaartB
    van={B_1250}
    cam={[{ lon: 35.0, lat: 32.6, h: 13, a: 8 }, { lon: 35.6, lat: 33.4, h: 12, a: 7.5 }]}
    spelden={[['damascus', '#E39A2C'], ['kerak', '#E39A2C'], ['aleppo', '#E39A2C']]}
    route={[bp('cairo'), bp('gaza'), bp('kerak'), bp('damascus'), bp('aleppo'), bp('damascus'), bp('kerak')]}
    routeTijd={[6, 150]}
    kop={<MiniBaibars />}
    over={<JaarTeller label="In exile" van={1254} tot={1260} a={10} b={150} />}
  />
);

/* ================= V · The Mongols ================= */

/** Kaart: de Mongolen blijven komen, rode pijlen uit het oosten. */
export const S_MongolenOost = () => {
  const f = useCurrentFrame();
  return (
    <KaartB van={B_1250} cam={[B_VER, { lon: 41, lat: 36.5, h: 18, a: 10 }]}>
      {[[[54, 40], [45, 38]], [[54, 35], [46, 33.6]], [[52, 44], [44, 41]]].map(([a, b], i) => <KaartPijl key={i} van={a as [number, number]} naar={b as [number, number]} p={ease(f, 10 + i * 14, 90 + i * 14, 0, 1)} />)}
    </KaartB>
  );
};

/** Kaart: 1258, Bagdad kleurt rood. */
export const S_Bagdad = () => (
  <KaartB van={B_1250} naar={B_1258} wissel={[30, 80]} cam={[{ lon: 42, lat: 34.5, h: 12, a: 7 }, { ...bk('baghdad', 7, 5, 0.5) }]} spelden={[['baghdad', '#7A2A24']]} licht={['Iraq']} over={<JaarLabel jaar="1258" sub="Baghdad" />} />
);

/** "Honderdduizenden", volgens de kroniekschrijvers: een ver silhouet van de ronde stad met rook. */
export const S_Getal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Heuvelland tijd="avond" cam={[0, 2, 14, 0, 2, 12]} kijk={[0, 1, -20]} scherpte={1.2} over={<><GrootTekst tekst="HUNDREDS OF THOUSANDS" /><Voorbehoud tekst="according to the chroniclers" /></>}>
        <group position={[0, 0, -44]} scale={0.8}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[7, 7, 3.2, 20, 1, true]} />
            <meshStandardMaterial color="#3A2A22" side={2} />
          </mesh>
          {[-3, 0, 3].map((x, i) => <Blok key={x} p={[x, 2.8, -1 - i]} s={[1.6, 2.4, 1.6]} c="#2E221C" />)}
          {[-5, -1, 3, 6].map((x, i) => <Rook key={x} position={[x, 3, -2]} t={t + i} kleur="#2A2420" />)}
        </group>
    </Heuvelland>
  );
};
/** Grote tekst in het midden (geen getal). */
const GrootTekst = ({ tekst }: { tekst: string }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center', opacity: lin(f, 6, 20, 0, 1), transform: `scale(${ease(f, 6, 40, 0.92, 1)})` }}>
      <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 120, color: '#FFF4E0', WebkitTextStroke: '3px #4A2A0C', textShadow: '0 8px 24px rgba(0,0,0,0.7)' }}>{tekst}</div>
    </div>
  );
};

/** Kaart: rode pijlen Syrië in. */
export const S_SyrieKaart = () => {
  const f = useCurrentFrame();
  return (
    <KaartB van={B_1258} naar={B_1260} wissel={[50, 110]} cam={[{ lon: 39, lat: 35, h: 12, a: 7 }, { lon: 37.5, lat: 34.5, h: 10, a: 6 }]} over={<JaarLabel jaar="1260" sub="the Mongols in Syria" />}>
      <KaartPijl van={[43.5, 36.5]} naar={[37.6, 36.0]} p={ease(f, 6, 70, 0, 1)} />
      <KaartPijl van={[43, 34.5]} naar={[37.2, 33.9]} p={ease(f, 20, 90, 0, 1)} />
    </KaartB>
  );
};

/** Kaart: Aleppo valt. */
export const S_Aleppo = () => {
  const f = useCurrentFrame();
  return <KaartB van={B_1260} cam={[bk('aleppo', 7, 5, 0.6), bk('aleppo', 5.5, 4, 0.5)]} spelden={[['aleppo', f > 8 ? '#7A2A24' : '#E39A2C']]} licht={['Syria']} />;
};

/** De poort van Damascus gaat open; burgers met een witte vlag. */
export const S_Damascus = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Cairo poort={ease(f, 10, 60, 0, 1)} vlag="#ECE6D8" cam={[3.6, 2.4, 11.4, 2.6, 2.2, 9.6]} kijk={[0, 1.8, 0]} over={<JaarLabel jaar="Damascus" sub="no fight" />}>
      <FiguurL kleding={BURGER} haar="kort" baard hoofddeksel="tulband" position={[-0.5, 0, 0.6]} pose={{ armR: omhoog(), wenk: -0.5 }} inHand={<group rotation={[Math.PI / 2, 0, 0]}><Blok p={[0, 0.5, 0]} s={[0.04, 1.2, 0.04]} c="#5A3B24" /><Blok p={[0.3, 0.95, 0]} s={[0.6, 0.4, 0.02]} c="#F4F2EC" r={[0, Math.sin(t * 3) * 0.2, 0]} /></group>} />
      <FiguurL kleding={BURGER2} haar="kort" snor hoofddeksel="tulband" position={[0.7, 0, 0.3]} pose={{ ...ARMEN_GEKRUIST, wenk: -0.6 }} />
      <FiguurL kleding={VROUW} haar="lang" hoofddeksel="kap" position={[1.6, 0, -0.2]} pose={{ wenk: -0.5 }} />
    </Cairo>
  );
};

/** Een Mongoolse gezant rijdt de poort van Cairo binnen, de brief omhoog. */
export const S_GezantRit = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Cairo poort={1} cam={[3.6, 2.4, 11.6, 2.8, 2.3, 10.0]} kijk={[0, 2.0, 1.6]}>
      <OpPaard position={[0.4, 0, 6.4 - ease(f, 0, 150, 0, 5.2)]} rotation={[0, Math.PI - 0.35, 0]} t={t} loopt kleur="#5A3B24" dek="#7A2A24">
        <Mongool pose={{ armR: omhoog(), hoofd: [0, 0.6, 0], mond: 'lach' }} inHand={<group rotation={[Math.PI / 2, 0, 0]}><Blok p={[0, 0.1, 0]} s={[0.36, 0.06, 0.06]} c="#EFE3C4" /><Blok p={[0, 0.1, 0.04]} s={[0.08, 0.08, 0.02]} c="#9E1F25" /></group>} />
      </OpPaard>
      {[-1, 1].map((k) => <Mameluk key={k} v={k > 0 ? 1 : 3} position={[k * 2.6, 0, 0.2]} rotation={[0, -k * 0.5, 0]} pose={{ wenk: 0.7 }} />)}
    </Cairo>
  );
};

/** Een Mongoolse gezant met een brief voor Qutuz op zijn troon. */
export const S_Gezant = () => (
  <Paleis cam={[2.6, 2.4, 7.4, 1.8, 2.2, 6.2]} kijk={[0, 1.6, -0.8]} over={<Pijllabel tekst="Qutuz, the new sultan" x={760} y={210} naar={[870, 400]} vanaf={20} />}>
    <SultanTroon position={[-0.6, 0, -1.6]} kussen />
    <Zit kleding={{ huid: '#C28C60', haar: '#151210', tuniek: '#2E5A3A', rok: '#2E5A3A', schoenen: '#2A1E16', cape: '#1E3A26', riem: GROEN }} haar="kort" baard hoofddeksel="tulband" position={[-0.6, 0.2, -1.5]} rotation={[0, 0.3, 0]} pose={{ wenk: 0.8 }} />
    <Mongool position={[1.6, 0, 0.2]} rotation={[0, -1.2, 0]} pose={{ armR: { schouder: [-1.4, 0, -0.1], elleboog: [0, 0] }, mond: 'lach' }} inHand={<group rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0.1]}><Blok p={[0, 0, 0]} s={[0.36, 0.06, 0.06]} c="#EFE3C4" /><Blok p={[0, 0, 0.04]} s={[0.08, 0.08, 0.02]} c="#9E1F25" /></group>} />
  </Paleis>
);

/** De brief: SURRENDER, met het grijnzende portret van Hulagu ernaast. */
export const S_Brief = () => {
  const f = useCurrentFrame();
  return (
    <Paleis cam={[0.2, 2.2, 3.4, 0.1, 2.15, 2.9]} kijk={[0, 2.0, 0]} scherpte={3.6}>
      <group position={[-0.5, 2.0, 0.4]} rotation={[0, 0.15, 0.04]} scale={ease(f, 0, 20, 0.85, 1)}>
        <Brief tekst={['SURRENDER', 'or Baghdad', 'happens to you']} b={1.1} h={1.2} rood />
        <Zegel p={[0.35, -0.48, 0.02]} />
      </group>
      <group position={[0.85, 1.75, 0.0]} rotation={[0, -0.25, 0]}>
        <Blok p={[0, 0.35, -0.12]} s={[0.95, 1.25, 0.06]} c="#D8A945" metal={0.6} rough={0.3} />
        <Blok p={[0, 0.35, -0.08]} s={[0.82, 1.1, 0.02]} c="#2A2030" />
        <group position={[0, -1.5, -0.05]} scale={0.75}>
          <Hulagu pose={{ mond: 'lach', wenk: 0.5 }} />
        </group>
      </group>
    </Paleis>
  );
};

/** Qutuz scheurt de brief doormidden (en daarna: de dichte poort van Cairo met een kraai). */
export const S_Scheur = ({ poort = false }: { poort?: boolean }) => {
  const f = useCurrentFrame();
  const sch = ease(f, 20, 40, 0, 1);
  if (poort)
    return (
      <Cairo tijd="avond" cam={[1.4, 2.6, 9.0, 1.0, 2.9, 7.6]} kijk={[0, 4.4, -1.6]}>
        <Kraai position={[0.3, 5.32, -1.6]} rotation={[0, 0.6, 0]} scale={1.8} />
      </Cairo>
    );
  return (
    <Paleis cam={[0.9, 2.2, 4.2, 0.6, 2.1, 3.4]} kijk={[0, 1.9, 0]}>
      <Qutuz hof position={[0, 0, 0]} rotation={[0, 0.15, 0]} pose={{ armL: { schouder: [-1.4, 0, 0.3 + sch * 0.5], elleboog: [0, 0] }, armR: { schouder: [-1.4, 0, -0.3 - sch * 0.5], elleboog: [0, 0] }, wenk: 1, mond: sch > 0.5 ? 'open' : 'dicht' }} />
      {[-1, 1].map((k) => (
        <group key={k} position={[k * (0.04 + sch * 0.35), 1.5 - sch * 0.06, 0.62]} rotation={[0, 0, k * sch * 0.5]}>
          <TekstVlak regels={[k < 0 ? 'SURREN' : 'DER']} b={0.3} h={0.42} achter="#EFE3C4" voor="#9E1F25" position={[k * 0.15, 0, 0]} fontPx={130} />
        </group>
      ))}
    </Paleis>
  );
};

/** Geen weg terug: de houten brug achter Qutuz stort plank voor plank in de rivier. */
export const S_Brug = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={[0, 0.8, 0]} scherpte={2.4} mist={['#9A6A4A', 20, 110]}>
      <Lucht boven="#4A2E4A" horizon="#F08A4A" />
      <Avondlicht />
      <group position={[0, -1.6, 0]}>
        <Zee t={t} kleur="#3A4E6A" grootte={120} golf={0.1} />
      </group>
      <Blok p={[-9.6, -0.8, 0]} s={[14, 1.6, 30]} c="#B39868" rough={1} />
      <Blok p={[11.6, -0.8, 0]} s={[14, 1.6, 30]} c="#B39868" rough={1} />
      {Array.from({ length: 12 }, (_, i) => {
        const val = ease(f, 26 + (11 - i) * 5, 46 + (11 - i) * 5, 0, 1);
        return <Blok key={i} p={[-2.4 + i * 0.4, -val * 2.2, 0]} s={[0.36, 0.12, 1.8]} r={[val * 0.6, 0, val * (i % 2 ? 0.5 : -0.4)]} c={i % 2 ? '#8A6A44' : '#7A5A3A'} />;
      })}
      {[-0.9, 0.9].map((z) => <Blok key={z} p={[-2.7, 0.5, z]} s={[0.12, 1.0, 0.12]} c="#5A3B24" />)}
      <Qutuz position={[-3.8, 0, 0.3]} rotation={[0, 0.9, 0]} pose={{ hoofd: [0, 0.5, 0], wenk: -0.4, mond: f > 50 ? 'open' : 'dicht' }} />
      <Cam c={[-1.6, 2.4, 8.6, -1.2, 2.2, 7.4]} kijk={[-1.6, 0.6, 0]} />
    </Shot>
  );
};
const Cam = ({ c, kijk }: { c: number[]; kijk: V3 }) => {
  const f = useCurrentFrame();
  return <Camera pos={camPos(f, c, 160)} kijk={kijk} fov={36} />;
};

/** Qutuz telt zijn kleine rij soldaten op zijn vingers. */
export const S_Tellen = () => {
  const f = useCurrentFrame();
  const vinger = Math.floor(f / 18) % 5;
  return (
    <Cairo cam={[3.4, 2.4, 9.4, 2.4, 2.3, 8.0]} kijk={[0, 1.5, 0.6]}>
      <Qutuz position={[-2.2, 0, 1.6]} rotation={[0, 0.9, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.1], elleboog: [0, -1.0] }, armL: { schouder: [-1.0, 0, 0.2], elleboog: [0, 1.1] }, wenk: -0.4 }} />
      {[0, 1, 2, 3].map((i) => <Mameluk key={i} v={i} scale={0.95} position={[-0.4 + i * 1.0, 0, 0.6]} rotation={[0, -0.2, 0]} pose={{ wenk: 0.2 }} />)}
      <TekstVlak regels={[String(vinger + 1)]} b={0.4} h={0.4} achter="#FFF4E0" voor="#1A120A" position={[-1.7, 2.9, 1.9]} fontPx={260} />
    </Cairo>
  );
};

/** Baibars komt thuis: de twee schudden stijfjes de hand, allebei een zweetdruppel. */
export const S_Vrede = () => (
  <Paleis cam={[0.4, 2.2, 5.4, 0.3, 2.1, 4.6]} kijk={[0, 1.6, 0]} over={<JaarLabel jaar="1260" sub="back in Cairo" />}>
    <Baibars position={[-0.62, 0, 0]} rotation={[0, 0.9, 0]} pose={{ armR: { schouder: [-1.2, 0, 0.1], elleboog: [0, 0] }, mond: 'lach', wenk: 0.4 }} />
    <Qutuz hof position={[0.62, 0, 0]} rotation={[0, -0.9, 0]} pose={{ armR: { schouder: [-1.2, 0, -0.1], elleboog: [0, 0] }, mond: 'lach', wenk: 0.4 }} />
    <Zweet p={[-0.95, 2.45, 0.3]} n={1} />
    <Zweet p={[0.95, 2.45, 0.3]} n={1} />
  </Paleis>
);

/* ================= VI · The spring of Goliath ================= */

/** Kaart: twee legers trekken naar Ain Jalut. */
export const S_AinJalutKaart = () => {
  const f = useCurrentFrame();
  return (
    <KaartB van={B_1260} cam={[B_ZUID, bk('ainJalut', 9, 6, 0.6)]} spelden={[['ainJalut', '#E39A2C']]} over={<JaarLabel jaar="3 September 1260" sub="Ain Jalut, “the spring of Goliath”" />}>
      <KaartPijl van={[33.0, 30.6]} naar={[35.2, 32.4]} p={ease(f, 10, 100, 0, 1)} kleur="#F2B03A" dik={0.14} />
      <KaartPijl van={[36.6, 33.9]} naar={[35.5, 32.7]} p={ease(f, 20, 100, 0, 1)} dik={0.14} />
    </KaartB>
  );
};

/** Hij leidt de voorhoede, met het vaandel; Mamelukken erachter. */
export const S_Voorop = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Heuvelland cam={[3.6, 2.4, 9.4, 2.6, 2.3, 7.8]} kijk={[0, 2.2, 0]}>
      <OpPaard position={[0, 0, ease(f, 0, 160, 0, 1.2)]} rotation={[0, 0.2, 0]} t={t} loopt dek="#B3312B">
        <Baibars pose={{ armR: omhoog(), wenk: 0.7, mond: 'open', hoofd: [0, -0.3, 0] }} inHand={<Sabel />} />
      </OpPaard>
      <LeeuwVaandel position={[-1.8, 0, -1.2 + ease(f, 0, 160, 0, 1.2)]} t={t} />
      <Eskadron rijen={3} kolommen={7} position={[0, 0, -4 + ease(f, 0, 160, 0, 1.2)]} t={t} loopt />
    </Heuvelland>
  );
};

/** De truc: toeslaan, omdraaien, "RUN!" (met een knipoog). */
export const S_Truc = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const draai = ease(f, 50, 70, 0, Math.PI);
  return (
    <Heuvelland cam={[4.6, 2.4, 8.4, 3.8, 2.3, 7.4]} kijk={[0, 2.0, 0]}>
      <OpPaard position={[0, 0, 0]} rotation={[0, -0.6 + draai, 0]} t={t} loopt={f > 60} dek="#B3312B">
        <Baibars pose={{ armR: f < 50 ? { schouder: [-1.8 + Math.sin(f / 3) * 0.6, 0, -0.4], elleboog: [0, -0.2] } : undefined, mond: 'lach', wenk: 0.4, ogen: f > 80 && f < 92 ? 'dicht' : 'open' }} inHand={<Sabel />} />
      </OpPaard>
      <Eskadron rijen={2} kolommen={5} soort="mongool" position={[0, 0, -7]} rotation={[0, 0, 0]} t={t} />
      {f > 64 && <Wolk p={[1.2, 3.9, 0.6]} tekst="RUN!" b={0.9} h={0.42} vanaf={64} staart={-1} />}
    </Heuvelland>
  );
};

/** Het boekje "STEPPE TRICKS VOL. 1"; de Mongool leest hetzelfde boekje. */
const Boekje = ({ position, rotation }: { position: V3; rotation?: V3 }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0, -0.02]} s={[0.62, 0.8, 0.06]} c="#7A2A24" />
    <TekstVlak regels={['STEPPE', 'TRICKS', 'VOL. 1']} b={0.52} h={0.66} achter="#7A2A24" voor="#F2C25A" position={[0, 0, 0.02]} fontPx={120} />
  </group>
);
export const S_Boekje = () => {
  const f = useCurrentFrame();
  return (
    <Heuvelland cam={[0.3, 2.2, 6.0, 0.2, 2.1, 5.0]} kijk={[0, 1.8, 0]}>
      <Baibars position={[-1.0, 0, 0]} rotation={[0, 0.4, 0]} pose={{ hoofd: [0.35, 0, 0], armR: { schouder: [-1.1, 0, 0.2], elleboog: [0, -0.6] }, armL: { schouder: [-1.1, 0, -0.2], elleboog: [0, 0.6] }, mond: 'lach' }} />
      <Boekje position={[-0.62, 1.42, 0.62]} rotation={[-0.5, 0.4, 0]} />
      <Mongool position={[1.1, 0, 0]} rotation={[0, -0.4, 0]} pose={{ hoofd: [0.35, 0, 0], armR: { schouder: [-1.1, 0, 0.2], elleboog: [0, -0.6] }, armL: { schouder: [-1.1, 0, -0.2], elleboog: [0, 0.6] }, wenk: f > 60 ? -0.5 : 0, mond: f > 60 ? 'open' : 'dicht' }} />
      <Boekje position={[0.72, 1.42, 0.62]} rotation={[-0.5, -0.4, 0]} />
      {f > 60 && <Wolk p={[1.6, 3.1, 0.3]} tekst="hey…" b={0.7} h={0.32} vanaf={60} staart={-1} />}
    </Heuvelland>
  );
};

/** De Mongolen jagen hem na, een vallei in; op de heuvels wacht de rest van het mamelukse leger. */
export const S_Achtervolging = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = ease(f, 0, 170, 0, 10);
  return (
    <Heuvelland cam={[12, 9, 18, 9, 8, 14]} kijk={[0, 1, -4]}>
      {[-1, 1].map((k) => <Blok key={k} p={[k * 9, 1.6, -6]} s={[8, 3.2, 30]} r={[0, 0, k * -0.2]} c="#A8925E" rough={1} />)}
      {[-1, 1].map((k) => <Eskadron key={`e${k}`} rijen={2} kolommen={5} position={[k * 8.6, 3.0, -6]} rotation={[0, -k * Math.PI / 2, 0]} t={t} />)}
      <MiniRuiter position={[0, 0, 6 - loop]} rotation={[0, Math.PI, 0]} t={t} loopt kleur="#B3312B" />
      <Eskadron rijen={3} kolommen={4} soort="mongool" position={[0, 0, 11 - loop]} rotation={[0, Math.PI, 0]} t={t} loopt />
    </Heuvelland>
  );
};

/** De gele linie buigt, de rode dringt bijna door. */
export const S_Linie = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const buig = ease(f, 10, 120, 0, 1.6);
  return (
    <Heuvelland stof cam={[6, 7, 11, 4.6, 6.4, 9]} kijk={[0, 1, -1]}>
      {Array.from({ length: 9 }, (_, i) => {
        const x = (i - 4) * 1.3;
        const deuk = Math.max(0, 1 - Math.abs(x) / 3) * buig;
        return <MiniRuiter key={i} position={[x, 0, -deuk]} rotation={[0, 0, 0]} kleur={['#B3312B', '#E39A2C', '#3E6B8A'][i % 3]} t={t} />;
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const x = (i - 3) * 1.4;
        const in_ = Math.max(0, 1 - Math.abs(x) / 3.2) * buig;
        return <MiniRuiter key={`m${i}`} position={[x, 0, 2.6 - in_]} rotation={[0, Math.PI, 0]} soort="mongool" kleur={['#7A2A24', '#5A3A2A'][i % 2]} t={t} loopt />;
      })}
    </Heuvelland>
  );
};

/** Qutuz gooit zijn helm op de grond en roept; de helm stuitert. */
export const S_HelmGooi = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const vlucht = lin(f, 20, 40, 0, 1);
  const stuit = f > 40 ? Math.abs(Math.sin((f - 40) / 4)) * 0.4 * Math.max(0, 1 - (f - 40) / 30) : 0;
  return (
    <Heuvelland stof cam={[2.6, 2.2, 7.2, 2.0, 2.1, 6.2]} kijk={[0, 1.6, 0]}>
      <Qutuz position={[0, 0, 0]} rotation={[0, 0.3, 0]} pose={{ armR: f < 30 ? omhoog() : { schouder: [-0.6, 0, -0.2], elleboog: [0, -0.2] }, armL: f > 40 ? omhoog() : undefined, mond: f > 40 ? 'open' : 'dicht', wenk: 0.9 }} inHand={undefined} />
      <group position={[0.5 + vlucht * 0.9, f < 20 ? 3.1 : 3.1 - vlucht * 3.0 + stuit, 0.4 + vlucht * 0.6]} rotation={[vlucht * 3, vlucht * 2, 0]}>
        <GevallenHelm position={[0, 0, 0]} soort="qutuz" rotation={[0, 0, 0]} />
      </group>
      {f > 44 && <Wolk p={[-0.7, 3.2, 0.4]} tekst="O ISLAM!" b={1.2} h={0.42} vanaf={44} staart={1} />}
      <Eskadron rijen={2} kolommen={6} position={[0, 0, -6]} t={t} loopt={f > 60} />
    </Heuvelland>
  );
};

/** De Mongoolse generaal Kitbuqa sneuvelt: zijn helm met pluim valt in het gras. */
export const S_Kitbuqa = ({ portret = false }: { portret?: boolean }) => {
  const f = useCurrentFrame();
  if (portret)
    return (
      <Heuvelland cam={[1.2, 2.2, 5.4, 0.9, 2.1, 4.6]} kijk={[0, 1.9, 0]} over={<Pijllabel tekst="Kitbuqa, Mongol general" x={1320} y={250} naar={[1010, 400]} vanaf={10} />}>
        <Kitbuqa position={[0, 0, 0]} rotation={[0, 0.2, 0]} pose={{ ...ARMEN_GEKRUIST, wenk: 0.7 }} />
        <Vaandel position={[-1.6, 0, -1.2]} t={f / FPS} />
      </Heuvelland>
    );
  const val = f < 10 ? 0 : Math.min(1, ((f - 10) / 16) ** 2);
  return (
    <Heuvelland cam={[1.0, 0.9, 3.4, 0.8, 0.8, 2.8]} kijk={[0, 0.4, 0]} scherpte={4}>
      <group position={[0, 1.6 - val * 1.52, 0]} rotation={[val * 0.4, val * 0.8, val * 1.2]}>
        <group position={[0, -0.7, 0]}>
          <Mongoolhelm />
        </group>
      </group>
      {val >= 1 && Array.from({ length: 6 }, (_, i) => <Blok key={i} p={[Math.sin(i * 1.3) * (0.4 + (f - 26) * 0.01), 0.08 + Math.max(0, 0.3 - (f - 26) * 0.01), Math.cos(i * 1.3) * (0.3 + (f - 26) * 0.01)]} s={[0.08, 0.08, 0.08]} c="#C8B48A" rough={1} />)}
    </Heuvelland>
  );
};
const Mongoolhelm = () => <Mongoolhelm0 pluim />;

/** Kaart: de rode golf trekt terug; uitroeptekens springen op over de wereld. */
export const S_Wereld = () => {
  const f = useCurrentFrame();
  const plekken: [number, number][] = [[31, 30], [44, 33], [37, 39], [30, 41], [45, 45], [52, 37]];
  return (
    <KaartB van={B_1260} naar={B_1260B} wissel={[6, 60]} cam={[{ lon: 38, lat: 36, h: 16, a: 9 }, B_VER]} over={<LangTeller label="The Mongols" waarde="beaten" pil="for the first time, in a great battle" />}>
      {plekken.map(([lon, lat], i) => <Uitroep key={i} p={opB(lon, lat, 0.6)} vanaf={40 + i * 10} />)}
    </KaartB>
  );
};

void Aqtay;
void BoosTeken;
void wijs;
void ORANJE;
void B_1250;
void MiniRuiter;
void Rook;
type _B = BStand;

export const SHOTS_B: ShotDef[] = [
  // ---------- IV · The blood oath ----------
  { zin: 39, C: S_Turanshah, hoofdstuk: ['IV', 'The blood oath'], accent: [{ bij: 1.2, src: 'tik', vol: 0.18 }, { bij: 1.8, src: 'tik', vol: 0.18 }] },
  { zin: 40, C: S_Kaarsen, sfeer: 'vuur', vol: 0.05, accent: [{ bij: 0.7, src: 'whoosh', vol: 0.14 }, { bij: 1.2, src: 'whoosh', vol: 0.14 }, { bij: 1.6, src: 'whoosh', vol: 0.14 }, { bij: 2.1, src: 'whoosh', vol: 0.14 }] },
  { zin: 41, C: S_Blikken, accent: [{ bij: 0.5, src: 'tik', vol: 0.16 }] },
  { zin: 42, C: S_Schaduw, accent: [{ bij: 0.4, src: 'val', vol: 0.18 }] },
  { zin: 43, C: S_Portretten, accent: [{ bij: 2.5, src: 'val', vol: 0.2 }] },
  { zin: 44, C: S_TroonTrek, accent: [{ bij: 0.4, src: 'tik', vol: 0.16 }, { bij: 1.0, src: 'tik', vol: 0.16 }] },
  { zin: 45, C: S_LegeStoel, sfeer: 'wind', vol: 0.08 },
  { zin: 46, C: S_Vlucht, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.4, src: 'whoosh', vol: 0.16 }] },
  { zin: 47, C: S_Ballingschap, accent: [{ bij: 1.2, src: 'tik', vol: 0.18 }, { bij: 2.4, src: 'tik', vol: 0.18 }, { bij: 3.6, src: 'tik', vol: 0.18 }] },
  // ---------- V · The Mongols ----------
  { zin: 48, C: S_MongolenOost, hoofdstuk: ['V', 'The Mongols'], sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.6, src: 'inslag', vol: 0.14 }] },
  { zin: 49, C: S_Bagdad, accent: [{ bij: 1.2, src: 'inslag', vol: 0.2 }] },
  { zin: 50, C: S_Getal, sfeer: 'wind', vol: 0.1 },
  { zin: 51, C: S_SyrieKaart, accent: [{ bij: 0.5, src: 'tik', vol: 0.18 }] },
  { zin: 52, C: S_Aleppo, accent: [{ bij: 1.0, src: 'inslag', vol: 0.18 }] },
  { zin: 53, C: S_Damascus, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.4, src: 'val', vol: 0.14 }] },
  { zin: 54, C: S_GezantRit, sfeer: 'wind', vol: 0.06, accent: [{ bij: 0.4, src: 'whoosh', vol: 0.14 }] },
  { zin: 54, na: 2.4, C: S_Gezant, accent: [{ bij: 0.3, src: 'tik', vol: 0.16 }] },
  { zin: 55, C: S_Brief, accent: [{ bij: 0.3, src: 'tik', vol: 0.18 }] },
  { zin: 56, C: () => <S_Scheur />, accent: [{ bij: 0.8, src: 'whoosh', vol: 0.18 }] },
  { zin: 56, na: 2.6, C: () => <S_Scheur poort />, sfeer: 'wind', vol: 0.1 },
  { zin: 57, C: S_Brug, accent: [{ bij: 1.1, src: 'val', vol: 0.18 }, { bij: 1.7, src: 'inslag', vol: 0.14 }] },
  { zin: 58, C: S_Tellen, accent: [{ bij: 0.6, src: 'tik', vol: 0.14 }, { bij: 1.2, src: 'tik', vol: 0.14 }, { bij: 1.8, src: 'tik', vol: 0.14 }] },
  { zin: 59, C: S_Vrede, accent: [{ bij: 0.6, src: 'glans', vol: 0.14 }] },
  // ---------- VI · The spring of Goliath ----------
  { zin: 60, C: S_AinJalutKaart, hoofdstuk: ['VI', 'The spring of Goliath'], accent: [{ bij: 1.0, src: 'tik', vol: 0.2 }] },
  { zin: 61, C: S_Voorop, sfeer: 'menigte', vol: 0.12 },
  { zin: 62, C: S_Truc, sfeer: 'menigte', vol: 0.1, accent: [{ bij: 2.1, src: 'whoosh', vol: 0.16 }] },
  { zin: 63, C: S_Boekje, accent: [{ bij: 0.3, src: 'tik', vol: 0.16 }, { bij: 2.0, src: 'tik', vol: 0.16 }] },
  { zin: 64, C: S_Achtervolging, sfeer: 'menigte', vol: 0.14 },
  { zin: 65, C: S_Linie, sfeer: 'menigte', vol: 0.2, accent: [{ bij: 0.5, src: 'inslag', vol: 0.16 }, { bij: 1.5, src: 'inslag', vol: 0.16 }] },
  { zin: 66, C: S_HelmGooi, sfeer: 'menigte', vol: 0.18, accent: [{ bij: 1.33, src: 'val', vol: 0.2 }, { bij: 1.5, src: 'inslag', vol: 0.16 }] },
  { zin: 67, C: () => <S_Kitbuqa />, sfeer: 'wind', vol: 0.1, accent: [{ bij: 0.85, src: 'val', vol: 0.16 }] },
  { zin: 68, C: S_Wereld, accent: [{ bij: 1.4, src: 'inslag', vol: 0.18 }, { bij: 1.8, src: 'glans', vol: 0.14 }] },
];
