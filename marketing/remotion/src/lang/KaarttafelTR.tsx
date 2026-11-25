import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel van het Ottomaanse Rijk en Turkije (Atatürk): kopie van KaarttafelGriek.tsx met een projectie rond
 * 31°O 38°N (Tripoli tot Bagdad). Moderne grenzen, dus een benadering. Noorden = -z, zuiden = +z.
 * rijk = het Ottomaanse Rijk (bordeaux), turk = de Republiek Turkije (rood), bezet = geallieerd bezet (grijsblauw),
 * grieks = Griekenland (blauw), vijand = Italië en de Balkanstaten (groen).
 */

export type TRStand = 'rijk' | 'turk' | 'bezet' | 'grieks' | 'vijand' | undefined;

const KLEUR: Record<string, string> = {
  rijk: '#8E3A2E',
  turk: '#D0262E',
  bezet: '#6A7A8E',
  grieks: '#3E6FA8',
  vijand: '#5E8A5A',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { rijk: 0.34, turk: 0.46, bezet: 0.26, grieks: 0.3, vijand: 0.28, land: 0.14 };

const SCHAAL = 26 / 3500;
const projectie = geoAzimuthalEqualArea()
  .rotate([-31, -38])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opTR = (lon: number, lat: number, y = 0.45): V3 => {
  const p = projectie([lon, lat]) ?? [0, 0];
  return [p[0], y, p[1]];
};

type Ring = { naam: string; punten: [number, number][] };
let cache: Ring[] | null = null;
const ringen = (): Ring[] => {
  if (cache) return cache;
  const fc = feature(landen as never, (landen as never as { objects: { countries: never } }).objects.countries) as unknown as {
    features: { properties: { name: string }; geometry: unknown }[];
  };
  const uit: Ring[] = [];
  for (const f of fc.features) {
    const naam = f.properties.name;
    let huidig: [number, number][] = [];
    const lijst: [number, number][][] = [];
    const ctx = {
      moveTo: (x: number, y: number) => { huidig = [[x, y]]; },
      lineTo: (x: number, y: number) => { huidig.push([x, y]); },
      closePath: () => { if (huidig.length > 2) lijst.push(huidig); huidig = []; },
      arc: () => {},
      rect: () => {},
    };
    geoPath(projectie, ctx as never)(f as never);
    for (const r of lijst) {
      let a = 0;
      for (let i = 0; i < r.length; i++) {
        const [x1, y1] = r[i];
        const [x2, y2] = r[(i + 1) % r.length];
        a += x1 * y2 - x2 * y1;
      }
      if (Math.abs(a) / 2 < 0.004) continue;
      uit.push({ naam, punten: r });
    }
  }
  cache = uit;
  return uit;
};

const geoCache = new Map<string, THREE.ExtrudeGeometry>();
const geometrie = (r: Ring, i: number) => {
  const k = `${r.naam}#${i}`;
  let g = geoCache.get(k);
  if (!g) {
    g = new THREE.ExtrudeGeometry(new THREE.Shape(r.punten.map(([x, y]) => new THREE.Vector2(x, -y))), { depth: 1, bevelEnabled: false });
    geoCache.set(k, g);
  }
  return g;
};
const meng = (a: string, b: string, p: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), p).getHexString();

const maak = (namen: string[], s: TRStand) => Object.fromEntries(namen.map((n) => [n, s])) as Record<string, TRStand>;

/* Standen (moderne landen als benadering). */
const ARABISCH = ['Syria', 'Iraq', 'Lebanon', 'Israel', 'Palestine', 'Jordan'];
const BALKAN = ['Albania', 'North Macedonia', 'Kosovo'];
/** 1881: het rijk van de Balkan tot Bagdad, met Libië. */
export const TR_1881: Record<string, TRStand> = { ...maak(['Turkey', ...ARABISCH, ...BALKAN, 'Libya'], 'rijk'), Greece: 'grieks' };
/** 1912: Libië is Italiaans. */
export const TR_1912: Record<string, TRStand> = { ...TR_1881, Libya: 'vijand' };
/** 1913: de Balkan is weg. */
export const TR_1913: Record<string, TRStand> = { ...TR_1912, ...maak(BALKAN, 'vijand'), Bulgaria: 'vijand', Serbia: 'vijand', Montenegro: 'vijand' };
/** 1918: de Arabische provincies zijn bezet; alleen Anatolië blijft. */
export const TR_1918: Record<string, TRStand> = { ...TR_1913, ...maak(ARABISCH, 'bezet') };
/** 1920: Sèvres. Anatolië zelf wordt verdeeld (grijs), de Grieken trekken op. */
export const TR_SEVRES: Record<string, TRStand> = { ...TR_1918, Turkey: 'bezet' };
/** 1923: de Republiek Turkije. */
export const TR_1923: Record<string, TRStand> = { ...TR_1918, Turkey: 'turk' };

export const KaarttafelTR = ({
  van,
  naar,
  p = 1,
  licht,
  gloed = 0,
}: {
  van: Record<string, TRStand>;
  naar?: Record<string, TRStand>;
  p?: number;
  licht?: string[];
  gloed?: number;
}) => {
  const lijst = useMemo(ringen, []);
  const doel = naar ?? van;
  return (
    <group>
      <Blok p={[0, -0.6, 0]} s={[38, 1.0, 26]} c="#6B4428" rough={0.7} />
      <Blok p={[0, -0.05, 0]} s={[36, 0.1, 24]} c="#4F331F" rough={0.7} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[34, 22]} />
        <meshStandardMaterial color="#7FA3B4" roughness={0.9} />
      </mesh>
      {lijst.map((r, i) => {
        const sv = van[r.naam] ?? 'land';
        const sn = doel[r.naam] ?? 'land';
        const h = HOOGTE[sv] + (HOOGTE[sn] - HOOGTE[sv]) * p;
        const oplicht = licht?.includes(r.naam) ? gloed : 0;
        return (
          <mesh key={i} geometry={geometrie(r, i)} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} scale={[1, 1, h + oplicht * 0.25]} castShadow receiveShadow>
            <meshStandardMaterial color={meng(KLEUR[sv], KLEUR[sn], p)} roughness={0.85} flatShading emissive={oplicht ? '#FFD27A' : '#000000'} emissiveIntensity={oplicht * 0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

export const SpeldTR = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opTR(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};

/** Plaatsen die steeds terugkomen. */
export const PLAATS_TR = {
  saloniki: [22.94, 40.64],
  istanbul: [28.98, 41.01],
  monastir: [21.33, 41.03],
  damascus: [36.29, 33.51],
  tobruk: [23.96, 32.08],
  sofia: [23.32, 42.7],
  gallipoli: [26.29, 40.24],
  izmir: [27.14, 38.42],
  samsun: [36.33, 41.29],
  ankara: [32.85, 39.93],
  sakarya: [32.0, 39.55],
  dumlupinar: [30.0, 39.0],
  erzurum: [41.27, 39.9],
  sivas: [37.02, 39.75],
  amasya: [35.83, 40.65],
  rome: [12.5, 41.9],
} as const;
export type PlaatsTR = keyof typeof PLAATS_TR;
