import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel van West-Europa rond de Lage Landen (Willem van Oranje): kopie van KaarttafelGriek.tsx met een
 * projectie rond 2°O 47,5°N. Moderne grenzen, dus een benadering. Noorden = -z, zuiden = +z.
 * spanje = Habsburg-Spanje (rood), opstand = de opstandige provincies (oranje), frans = Frankrijk (blauw),
 * goud = oplichten (Willems bezit), duits = het Rijk (groen-grijs).
 */

export type NLStand = 'spanje' | 'opstand' | 'frans' | 'goud' | 'duits' | undefined;

const KLEUR: Record<string, string> = {
  spanje: '#B3412E',
  opstand: '#E8742A',
  frans: '#3E6FA8',
  goud: '#D1A23A',
  duits: '#8A9470',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { spanje: 0.34, opstand: 0.42, frans: 0.26, goud: 0.46, duits: 0.24, land: 0.14 };

const SCHAAL = 26 / 2000;
const projectie = geoAzimuthalEqualArea()
  .rotate([-2, -47.5])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opNL = (lon: number, lat: number, y = 0.45): V3 => {
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
const RIJK = { Germany: 'duits', Austria: 'duits', Switzerland: 'duits', Czechia: 'duits' } as const;
/** 1555: de Nederlanden en Spanje onder Habsburg, Frankrijk ernaast. */
export const N_1555: Record<string, NLStand> = { ...RIJK, Netherlands: 'spanje', Belgium: 'spanje', Luxembourg: 'spanje', Spain: 'spanje', France: 'frans' };
/** Alleen de Nederlanden gekleurd (Willems bezit licht op met `licht`). */
export const N_LEEG: Record<string, NLStand> = { ...RIJK, France: 'frans' };
/** Na 1572: het noorden in opstand, het zuiden Spaans. */
export const N_OPSTAND: Record<string, NLStand> = { ...N_1555, Netherlands: 'opstand' };
/** Willems erfenis: de Nederlanden goud. */
export const N_ERFENIS: Record<string, NLStand> = { ...RIJK, Netherlands: 'goud', Belgium: 'goud', Luxembourg: 'goud', France: 'frans', Spain: 'spanje' };

export const KaarttafelNL = ({
  van,
  naar,
  p = 1,
  licht,
  gloed = 0,
}: {
  van: Record<string, NLStand>;
  naar?: Record<string, NLStand>;
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

export const SpeldNL = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opNL(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};

/** Plaatsen die steeds terugkomen. */
export const PLAATS_NL = {
  dillenburg: [8.28, 50.74],
  brussel: [4.35, 50.85],
  orange: [4.81, 44.14],
  stdizier: [4.95, 48.64],
  parijs: [2.35, 48.86],
  briel: [4.16, 51.9],
  leiden: [4.49, 52.16],
  delft: [4.36, 52.01],
  heiligerlee: [7.02, 53.16],
  mook: [5.88, 51.75],
  antwerpen: [4.4, 51.22],
  utrecht: [5.12, 52.09],
  leuven: [4.7, 50.88],
  madrid: [-3.7, 40.42],
} as const;
export type PlaatsNL = keyof typeof PLAATS_NL;
