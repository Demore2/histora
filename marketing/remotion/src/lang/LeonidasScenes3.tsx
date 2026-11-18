import { useCurrentFrame } from 'remotion';
import { Camera as CameraR } from '../watals/Decor';
import { Blok, omhoog, wijs, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { G_480 } from './KaarttafelGriek';
import { LangTeller } from './LangHud';
import {
  Baby,
  CLEOMENES,
  DORIEUS,
  FiguurL,
  G_GRIEKENLAND,
  GORGO_JONG,
  Hal,
  Huis,
  KaartG,
  LEONIDAS_JONG,
  LEONIDAS_KAMP,
  MiniDorieus,
  MOEDER,
  Pas,
  PersSoldaat,
  pl,
  Sparta,
  SPARTAAN,
  SPARTAAN2,
  Spartaan,
  THESPIER,
  VADER,
  Wieg,
  Wolk,
  Zit,
  Zweet,
} from './LeonidasKit';

/**
 * Tweede beelden voor de lange zinnen van "What if you were Leonidas?": elk shot dat langer dan ~6 s op één beeld
 * zou blijven staan krijgt halverwege een close-up of een kaart, met een eigen grapje. Zelfde regels als de rest.
 */

const BLAUW = '#3E6FA8';

/** Close-up van de vader die door de eforen wordt toegesproken: zweet, wolkje "TWO WIVES?!". */
export const S_VaderClose = () => (
  <Sparta cam={[0.2, 2.05, 3.2, 0.15, 2.05, 2.7]} kijk={[0, 2.0, 0]} dorp={false}>
    <FiguurL kleding={VADER} baard pose={{ wenk: -0.7, mond: 'open', armR: { schouder: [-2.6, 0, -0.5], elleboog: [0, -1.4] } }} />
    <Zweet p={[0.38, 2.3, 0.3]} n={3} />
    <Wolk p={[1.1, 2.15, 0.3]} tekst="TWO WIVES?!" b={0.9} h={0.3} vanaf={8} staart={-1} />
  </Sparta>
);

/** Close-up van de moeder in de deur: traan, maar ze zwaait dapper. */
export const S_MoederClose = () => {
  const f = useCurrentFrame();
  return (
    <Sparta cam={[0.25, 2.0, 3.3, 0.2, 2.0, 2.8]} kijk={[0, 1.95, 0]} dorp={false}>
      <Blok p={[0, 1.4, -0.7]} s={[2.4, 2.8, 0.3]} c="#CDB994" rough={1} />
      <Blok p={[0, 1.05, -0.54]} s={[1.0, 2.1, 0.05]} c="#2A1E14" />
      <FiguurL kleding={MOEDER} haar="lang" pose={{ armR: { schouder: [-2.3 + Math.sin(f / 4) * 0.2, 0, 0.9], elleboog: [0, -0.3] }, traan: lin(f, 6, 70, 0, 1), wenk: -0.6, mond: 'lach' }} />
    </Sparta>
  );
};

/** 's Nachts slapen de jongens op hun riet onder de sterren; één ligt te bibberen. */
export const S_Slapen = () => {
  const f = useCurrentFrame();
  return (
    <Shot focus={[0, 0.4, 0]} scherpte={3} mist={['#0E1220', 8, 40]}>
      <mesh><sphereGeometry args={[200, 16, 12]} /><meshBasicMaterial color="#0B0F1E" side={1} /></mesh>
      <hemisphereLight args={['#6A7CB0', '#1A1620', 0.9]} />
      <directionalLight position={[-6, 10, 6]} intensity={0.9} color="#A8BCE8" />
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#2A2E2A" /></mesh>
      {Array.from({ length: 40 }, (_, i) => <Blok key={i} p={[-30 + ((i * 7.7) % 60), 12 + ((i * 3.3) % 10), -30 - ((i * 5.1) % 10)]} s={[0.12, 0.12, 0.12]} c="#FFFFFF" emissive={(f + i * 9) % 60 < 30 ? '#FFFFFF' : '#8899BB'} />)}
      {[-1.2, 0, 1.2].map((x, i) => {
        const bibber = i === 1 ? Math.sin(f * 1.6) * 0.03 : 0;
        return (
          <group key={x} position={[x + bibber, 0, 0]}>
            <Blok p={[0, 0.05, 0]} s={[0.9, 0.1, 2.2]} c="#8A9A4A" />
            {Array.from({ length: 6 }, (_, k) => <Blok key={k} p={[-0.35 + k * 0.14, 0.11, 0]} s={[0.03, 0.03, 2.1]} c="#A8B05A" />)}
            <group position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.62} position={[0, -0.85, 0]} pose={{ ogen: i === 1 ? 'open' : 'dicht', wenk: i === 1 ? -0.6 : 0, mond: i === 1 ? 'open' : 'dicht' }} />
            </group>
            {i !== 1 && (f % 90) > 30 && <Wolk p={[0.3, 0.9, -0.9]} tekst="Zzz" b={0.5} h={0.22} vanaf={30} staart={0} />}
          </group>
        );
      })}
      <CamLos c={[2.4, 3.2, 4.4, 2.0, 2.9, 3.8]} kijk={[0, 0.3, -0.5]} />
    </Shot>
  );
};

/** Close-up aan tafel: jij lepelt de zwarte soep alsof het honing is. */
export const S_SoepClose = () => {
  const f = useCurrentFrame();
  const lepel = Math.max(0, Math.sin(f / 10));
  return (
    <Hal cam={[0.4, 2.0, 4.0, 0.3, 1.95, 3.4]} kijk={[0, 1.7, 0]}>
      <Blok p={[0, 0.75, 0.5]} s={[3, 0.1, 1.0]} c="#6B4A2E" />
      <Blok p={[0, 0.86, 0.55]} s={[0.34, 0.12, 0.34]} c="#2A1E16" />
      <Blok p={[0, 0.93, 0.55]} s={[0.28, 0.02, 0.28]} c="#140C08" />
      <FiguurL kleding={LEONIDAS_KAMP} haar="lang" baard position={[0, -0.35, -0.1]} pose={{ mond: 'lach', wenk: 0.1, armR: { schouder: [-1.2 - lepel * 0.6, 0, -0.1], elleboog: [0, -0.8] } }} />
      <FiguurL kleding={SPARTAAN2} haar="lang" baard position={[-1.05, -0.35, -0.7]} rotation={[0, 0.6, 0]} pose={{ wenk: -0.8, mond: 'open', hoofd: [0, 0.5, 0] }} />
      <Wolk p={[-1.0, 2.05, -0.3]} tekst="HOW?!" b={0.6} h={0.26} vanaf={30} staart={1} />
      <Wolk p={[0.5, 2.1, 0.3]} tekst="mmm" b={0.5} h={0.22} vanaf={50} staart={-1} />
    </Hal>
  );
};

/** De route van Dorieus naar Sicilië op de kaart. */
export const S_DorieusKaart = () => (
  <KaartG van={G_480} cam={[{ lon: 18, lat: 37.5, h: 11, a: 8 }, { lon: 15.5, lat: 37.8, h: 9, a: 6.5 }]} route={[pl('sparta'), [21.2, 36.6], [18, 37], pl('sicilie')]} routeTijd={[4, 110]} kop={<MiniDorieus />} spelden={[['sparta', '#B3312B'], ['sicilie', '#8A6A3A']]} over={<LangTeller label="Dorieus" waarde="To Sicily" pil="he never comes back" />} />
);

/** Close-up van de kleine Gorgo die met haar vinger zwaait: "FATHER, NO." */
export const S_GorgoNee = () => {
  const f = useCurrentFrame();
  return (
    <Hal sepia cam={[0.2, 1.35, 3.0, 0.15, 1.3, 2.5]} kijk={[0, 1.15, 0]}>
      <FiguurL kleding={GORGO_JONG} haar="lang" scale={0.55} pose={{ armR: { schouder: [-2.6, 0, 0.45 + Math.sin(f / 3) * 0.2], elleboog: [0, -0.3] }, wenk: 0.9, mond: 'open' }} />
      <FiguurL kleding={CLEOMENES} baard haar="grijs" position={[-1.3, 0, -1.6]} rotation={[0, 0.5, 0]} pose={{ hoofd: [0.3, 0, 0], wenk: -0.5 }} />
      <Wolk p={[0.5, 1.5, 0.2]} tekst={['FATHER,', 'NO.']} b={0.5} h={0.3} vanaf={8} staart={-1} />
    </Hal>
  );
};

/** De oversteek op de kaart: van Azië naar Thermopylae, een rij Perzen. */
export const S_PersRoute = () => (
  <KaartG van={G_480} cam={[{ lon: 25.5, lat: 39.4, h: 9, a: 7 }, { lon: 23.8, lat: 39.2, h: 7.5, a: 6 }]} route={[pl('sardis'), pl('abydos'), [25.5, 40.9], [23, 40.6], [22.5, 39.6], pl('thermopylae')]} routeTijd={[4, 150]} kop={<group scale={0.2}><PersSoldaat position={[0, 0, 0]} rotation={[0, -1, 0]} /></group>} spelden={[['abydos', '#7A3B6E'], ['thermopylae', '#C99A2E']]} over={<LangTeller label="480 BC" waarde="Into Greece" pil="along the coast" />} />
);

/** Close-up van de Thespiër: "We stay." */
export const S_Thespier = () => (
  <Pas tijd="dageraad" muur={false} cam={[0.25, 2.05, 3.4, 0.2, 2.05, 2.9]} kijk={[0, 2.0, 0]} scherpte={3.4}>
    <Spartaan kleding={THESPIER} schildKleur={BLAUW} speer={false} pose={{ ...{ armL: { schouder: [-0.2, 0, 0.5], elleboog: [0, -1.6] } }, wenk: 0.7, mond: 'dicht' }} />
    <Wolk p={[0.95, 2.6, 0.2]} tekst="We stay." b={0.85} h={0.32} vanaf={10} staart={-1} />
  </Pas>
);

/** Close-up: jij neemt een hap brood en kijkt naar de berg. */
export const S_OntbijtClose = () => {
  const f = useCurrentFrame();
  const hap = Math.max(0, Math.sin(f / 14));
  return (
    <Pas tijd="dageraad" muur={false} cam={[0.3, 1.75, 3.0, 0.25, 1.7, 2.5]} kijk={[0, 1.65, 0]} scherpte={3.4}>
      <Zit kleding={LEONIDAS_KAMP} haar="lang" baard pose={{ mond: hap > 0.6 ? 'open' : 'lach', armR: { schouder: [-1.8 - hap * 0.6, 0, -0.25], elleboog: [0, -1.2] }, hoofd: [0, 0.2, 0] }} inHand={<Blok p={[0, -0.05, 0.05]} s={[0.22, 0.12, 0.14]} c="#D9A55A" />} />
      <FiguurL kleding={SPARTAAN} haar="lang" baard position={[1.3, -0.35, -0.6]} rotation={[0, -0.5, 0]} pose={{ mond: 'lach', armR: wijs(0.9) }} inHand={<Blok p={[0, -0.05, 0]} s={[0.07, 0.07, 0.09]} c="#3A4A22" />} />
    </Pas>
  );
};

/** Teaser: snel naar de knipogende baby ("a third son nobody wanted"). */
export const S_TeaserBaby = () => {
  const f = useCurrentFrame();
  return (
    <Huis cam={[0.5, 1.2, 2.3, 0.35, 1.1, 1.8]} kijk={[0.1, 0.85, 0]}>
      <Wieg position={[0.1, 0, 0]}><Baby boos={1} knipoog={f > 40 && f < 56} /></Wieg>
    </Huis>
  );
};

const CamLos = ({ c, kijk }: { c: number[]; kijk: V3 }) => {
  const f = useCurrentFrame();
  const p = ease(f, 0, 160, 0, 1);
  return <CameraR pos={[c[0] + (c[3] - c[0]) * p, c[1] + (c[4] - c[1]) * p, c[2] + (c[5] - c[2]) * p]} kijk={kijk} />;
};
void [omhoog, DORIEUS, G_GRIEKENLAND, FPS];
