import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel van Europa tot voorbij de Oeral (Stalin): kopie van KaarttafelNL.tsx met een projectie rond
 * 48°O 54°N. Moderne grenzen, dus een benadering. Noorden = -z, zuiden = +z.
 * rijk = het Russische keizerrijk, sovjet = de Sovjet-Unie (rood), blok = het Oostblok na 1945 (lichtrood),
 * duits = nazi-Duitsland en wat het bezet (grijs), honger = de hongergebieden (amber).
 */

export type SUStand = 'rijk' | 'sovjet' | 'blok' | 'duits' | 'honger' | undefined;

const KLEUR: Record<string, string> = {
  rijk: '#8E5A44',
  sovjet: '#B3241E',
  blok: '#D2786A',
  duits: '#6A6A6E',
  honger: '#D1A23A',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { rijk: 0.32, sovjet: 0.42, blok: 0.28, duits: 0.3, honger: 0.46, land: 0.14 };

const SCHAAL = 26 / 5200;
const projectie = geoAzimuthalEqualArea()
  .rotate([-48, -54])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opSU = (lon: number, lat: number, y = 0.45): V3 => {
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

/* Standen (moderne landen als benadering). */
const SU_KERN = ['Russia', 'Ukraine', 'Belarus', 'Kazakhstan', 'Georgia', 'Armenia', 'Azerbaijan', 'Uzbekistan', 'Turkmenistan', 'Kyrgyzstan', 'Tajikistan', 'Moldova'];
const BALTEN = ['Lithuania', 'Latvia', 'Estonia'];
const maak = (namen: string[], st: SUStand) => Object.fromEntries(namen.map((n) => [n, st])) as Record<string, SUStand>;
/** 1878: het Russische keizerrijk (met Finland, de Baltische staten en Oost-Polen; Polen als benadering). */
export const SU_RIJK: Record<string, SUStand> = { ...maak([...SU_KERN, ...BALTEN, 'Finland', 'Poland'], 'rijk') };
/** De Sovjet-Unie na 1922 (zonder de Baltische staten). */
export const SU_USSR: Record<string, SUStand> = { ...maak(SU_KERN, 'sovjet') };
/** Leeg: niets gekleurd. */
export const SU_LEEG: Record<string, SUStand> = {};
/** 1932-33: de hongergebieden licht op. */
export const SU_HONGER: Record<string, SUStand> = { ...SU_USSR, Ukraine: 'honger', Kazakhstan: 'honger' };
/** 1939-40: het pact, Baltische staten erbij; Duitsland en wat het in het westen heeft grijs. */
export const SU_PACT: Record<string, SUStand> = { ...SU_USSR, ...maak(BALTEN, 'sovjet'), Germany: 'duits', Austria: 'duits', Czechia: 'duits', Poland: 'duits' };
/** Eind 1941: Duitsland diep in de Sovjet-Unie (benadering: Oekraïne, Wit-Rusland en de Baltische staten grijs). */
export const SU_1941: Record<string, SUStand> = { ...SU_PACT, ...maak(BALTEN, 'duits'), Ukraine: 'duits', Belarus: 'duits', France: 'duits', Netherlands: 'duits', Belgium: 'duits', Denmark: 'duits', Norway: 'duits' };
/** Na 1945: de Sovjet-Unie plus het Oostblok. */
export const SU_BLOK: Record<string, SUStand> = { ...SU_USSR, ...maak(BALTEN, 'sovjet'), ...maak(['Poland', 'Czechia', 'Slovakia', 'Hungary', 'Romania', 'Bulgaria', 'Albania'], 'blok'), Germany: 'blok' };

export const KaarttafelSU = ({
  van,
  naar,
  p = 1,
  licht,
  gloed = 0,
}: {
  van: Record<string, SUStand>;
  naar?: Record<string, SUStand>;
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

export const SpeldSU = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opSU(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};

/** Plaatsen die steeds terugkomen. */
export const PLAATS_SU = {
  gori: [44.11, 41.98],
  tiflis: [44.79, 41.72],
  baku: [49.87, 40.41],
  petrograd: [30.31, 59.94],
  moskou: [37.62, 55.75],
  tsaritsyn: [44.5, 48.7],
  kureika: [87.0, 66.5],
  solvychegodsk: [46.9, 61.3],
  istanbul: [28.98, 41.0],
  berlijn: [13.4, 52.52],
  kiev: [30.52, 50.45],
  almaty: [76.9, 43.25],
  vorkuta: [64.0, 67.5],
  kolyma: [80.0, 62.0],
  magnitogorsk: [59.0, 53.4],
  karaganda: [73.1, 49.8],
  norilsk: [88.2, 69.3],
} as const;
export type PlaatsSU = keyof typeof PLAATS_SU;
