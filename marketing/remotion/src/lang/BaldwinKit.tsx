import type React from 'react';
import type { ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { Bed, Binnenlicht, Camera, Grond, Lucht } from '../watals/Decor';
import { Blok, Figuur, Kroon, type Kleding, type Pose, type V3 } from '../watals/Figuur';
import { BALDWIN_KIND, BLAUW, BW } from '../watals/WatAlsBaldwin';
import { ease, lin, Shot } from './basis';
import { KaarttafelMO, SpeldMO, type MOStand } from './KaarttafelMO';
import { GUY, kaartCam, type KS, MONNIK, REYNALD, RIDDER, RouteMO, SALADIN, VROUW } from './SaladinScenes';
import { JaarLabel, LangTeller } from './LangHud';

/**
 * Kit voor "What if you were Baldwin IV?" (lange video #12). Bouwt op de Baldwin-short (BW, Draagbaar, de scènes) en
 * op de Saladin-kit (decors, kaarttafel Midden-Oosten). Geen masker behalve in de scène die het een filmmythe noemt.
 * Geen kruizen, geen kerkinterieurs, geen geweld in beeld.
 */

/* ---------- personages ---------- */
export const AMALRIC: Kleding = { huid: '#E2B48E', haar: '#7A5A36', tuniek: '#2F4F8E', rok: '#2F4F8E', schoenen: '#2A1E16', cape: '#8E1F2A', riem: '#C9A646' };
export const AGNES: Kleding = { ...VROUW, tuniek: '#7A3A5A', rok: '#7A3A5A', haar: '#4A3020' };
export const SIBYLLA: Kleding = { huid: '#E8D2BE', haar: '#C9A060', tuniek: '#5A7AB0', rok: '#5A7AB0', schoenen: '#3A2A1C', cape: '#ECE6D8', riem: '#C9A646' };
export const ISABELLA: Kleding = { huid: '#E8D2BE', haar: '#6B4A30', tuniek: '#B07AA0', rok: '#B07AA0', schoenen: '#3A2A1C', riem: '#ECE6D8' };
export const HUMPHREY: Kleding = { ...RIDDER, borst: undefined, tuniek: '#3E6A5A', haar: '#8A6A40' };
export const RAYMOND: Kleding = { ...RIDDER, tuniek: '#5A7A3A', cape: '#2E4A2A', haar: '#3A2A1E' };
export const MONTFERRAT: Kleding = { ...RIDDER, borst: undefined, tuniek: '#C9A646', cape: '#ECE6D8', haar: '#B5852E' };
export const DOKTER: Kleding = { huid: '#D9AE8A', haar: '#B9B4AA', tuniek: '#3E5A6A', rok: '#3E5A6A', schoenen: '#2A1E16' };
export const HENRY: Kleding = { ...RIDDER, borst: undefined, tuniek: '#A8322B', rok: '#A8322B', cape: '#7A1E1A', haar: '#B5652E', riem: '#C9A646' };
export const MELAATS: Kleding = { ...MONNIK, tuniek: '#7A7266', rok: '#7A7266', huid: '#D8B494' };
export const TEMPELIER: Kleding = { ...RIDDER, tuniek: '#F2EEE6', cape: '#F2EEE6' };
export const BEDIENDE: Kleding = { huid: '#C9925F', haar: '#2A1E16', tuniek: '#8A6A4A', rok: '#8A6A4A', schoenen: '#3A2A1C' };
export { BLAUW, GUY, REYNALD, SALADIN };

/** Baldwin per leeftijd: kind (9), tiener met kroon (13-16), ziek (19-21), blind (22+). */
export const Kind = (p: { position?: V3; rotation?: V3; pose?: Pose; scale?: number; extra?: ReactNode }) => (
  <Figuur kleding={BALDWIN_KIND} haar="kort" levend scale={p.scale ?? 0.72} position={p.position} rotation={p.rotation} pose={p.pose} extra={p.extra} />
);
export const Koning = ({ ziek = 0, blind = false, scale = 0.9, kroon = true, ...p }: { ziek?: number; blind?: boolean; scale?: number; kroon?: boolean; position?: V3; rotation?: V3; pose?: Pose; inHand?: ReactNode }) => {
  const b = BW(ziek, blind);
  return <Figuur {...b} hoofdExtra={kroon ? b.hoofdExtra : undefined} scale={scale} {...p} />;
};
export const KleineKoning = (p: { position?: V3; rotation?: V3 }) => (
  <Figuur kleding={BALDWIN_KIND} haar="kort" levend scale={0.58} position={p.position} rotation={p.rotation} hoofdExtra={<Kroon position={[0, 0.58, 0]} />} />
);

/* ---------- kaart ---------- */
export const RIJK_KLEUR = { vijand: '#3E6AB0' }; // het koninkrijk = blauw (jij), Saladin = goud
const KR = { Israel: 'vijand', Palestine: 'vijand', Lebanon: 'vijand', Jordan: 'vijand' } as const;
export const B_1161: Record<string, MOStand> = { ...KR, Syria: 'bond', Iraq: 'bond', Egypt: 'fatimid' };
export const B_1171: Record<string, MOStand> = { ...KR, Syria: 'bond', Iraq: 'bond', Egypt: 'rijk' };
export const B_1174: Record<string, MOStand> = { ...KR, Syria: 'rijk', Iraq: 'bond', Egypt: 'rijk' };
export const B_1183: Record<string, MOStand> = { ...KR, Syria: 'rijk', Iraq: 'rijk', Egypt: 'rijk' };
export const B_1187: Record<string, MOStand> = { Lebanon: 'vijand', Israel: 'rijk', Palestine: 'rijk', Jordan: 'rijk', Syria: 'rijk', Iraq: 'rijk', Egypt: 'rijk' };

export const PLEK = {
  jerusalem: [35.21, 31.77], acre: [35.07, 32.93], damascus: [36.29, 33.51], cairo: [31.24, 30.04], ascalon: [34.57, 31.67],
  gaza: [34.47, 31.5], kerak: [35.7, 31.18], nazareth: [35.3, 32.7], tripoli: [35.84, 34.44], belvoir: [35.52, 32.59],
  jacob: [35.63, 33.0], marj: [35.59, 33.36], montgisard: [34.92, 31.86], aqaba: [35.0, 29.53], tyre: [35.2, 33.27], hattin: [35.45, 32.8],
  ramla: [34.87, 31.93], jaffa: [34.75, 32.05],
} as const;
export type Plek = keyof typeof PLEK;
export const kp = (s: Plek, h = 8, a = 8, dx = 1.5): KS => ({ lon: PLEK[s][0], lat: PLEK[s][1], h, a, dx });
export const VER_B: KS = { lon: 35.5, lat: 31.5, h: 22, a: 12 };
export const MIDDEN_B: KS = { lon: 35.3, lat: 32.2, h: 13, a: 8, dx: 1 };

export const KaartB = ({ van, naar, wissel = [20, 70], cam = [VER_B, VER_B], camDuur = 150, spelden = [], route, routeTijd = [10, 120], kop, licht, over, jaar, sub, teller }: {
  van: Record<string, MOStand>; naar?: Record<string, MOStand>; wissel?: [number, number]; cam?: [KS, KS]; camDuur?: number; spelden?: [Plek, string][];
  route?: [number, number][]; routeTijd?: [number, number]; kop?: ReactNode; licht?: string[]; over?: ReactNode; jaar?: string; sub?: string; teller?: [string, string, string?];
}) => {
  const f = useCurrentFrame();
  const c = kaartCam(cam[0], cam[1], ease(f, 0, camDuur, 0, 1));
  const gloed = licht ? (Math.sin(f / 5) + 1) / 2 : 0;
  return (
    <Shot focus={c.kijk} scherpte={2} over={<>{jaar && <JaarLabel jaar={jaar} sub={sub} />}{teller && <LangTeller label={teller[0]} waarde={teller[1]} pil={teller[2]} />}{over}</>}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={c.pos} kijk={c.kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <KaarttafelMO van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} kleuren={RIJK_KLEUR} />
      {spelden.map(([s, k]) => <SpeldMO key={s} lon={PLEK[s][0]} lat={PLEK[s][1]} kleur={k} />)}
      {route && <RouteMO punten={route} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={kop} />}
    </Shot>
  );
};
export const r = (...p: Plek[]): [number, number][] => p.map((x) => [PLEK[x][0], PLEK[x][1]]);
export const MiniB = () => <Figuur kleding={RIDDER} hoofddeksel="helm" scale={0.22} rotation={[0, -0.4, 0]} />;
export const MiniS = () => <Figuur kleding={SALADIN} hoofddeksel="tulband" baard scale={0.22} rotation={[0, 0.4, 0]} />;

/** Sterfbed/ziekbed in de stijl van de short (die leest goed); `wie` = Figuur-props voor de liggende figuur. */
export const Ziekbed = ({ wie, bij, over, donker = 0 }: { wie: Record<string, unknown>; bij?: ReactNode; over?: ReactNode; donker?: number }) => {
  const f = useCurrentFrame();
  const kaars = 7 * (1 - donker * lin(f, 30, 150, 0, 0.85));
  return (
    <Shot focus={[0, 1.0, 0]} scherpte={3.4} mist={['#1A120C', 6, 24]} over={over}>
      <Lucht boven="#120C08" horizon="#1E1610" />
      <hemisphereLight args={['#6A5A48', '#1A120C', 0.4]} />
      <Grond kleur="#3A2A20" />
      <Blok p={[0, 3, -2.4]} s={[12, 6, 0.3]} c="#5A4232" />
      <pointLight position={[1.6, 1.8, 1.0]} intensity={kaars} distance={7} color="#FFA850" />
      <pointLight position={[-0.4, 2.0, 3.2]} intensity={4} distance={7} color="#FFC890" />
      <Camera pos={[ease(f, 0, 150, 0.5, 0.1), ease(f, 0, 150, 2.1, 1.9), ease(f, 0, 150, 7.4, 6.4)]} kijk={[-0.1, 1.3, 0]} fov={34} />
      <Bed position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Figuur {...(wie as unknown as React.ComponentProps<typeof Figuur>)} position={[1.25, 1.15, 0]} rotation={[0, 0, Math.PI / 2 - 0.08]} />
      <Blok p={[1.6, 0.45, -0.6]} s={[0.6, 0.9, 0.6]} c="#5A3B24" />
      <Blok p={[1.6, 1.06, -0.6]} s={[0.08, 0.24, 0.08]} c="#F2EAD8" />
      <Blok p={[1.6, 1.22, -0.6]} s={[0.05, 0.08, 0.05]} c="#FFB347" emissive="#FF8A2A" />
      {bij}
    </Shot>
  );
};
