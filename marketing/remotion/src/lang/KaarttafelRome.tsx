import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel van de Romeinse wereld (Caesar): kopie van KaarttafelMO.tsx met een projectie van Brittannië
 * tot Egypte. Moderne grenzen, dus een benadering. Noorden = -z, zuiden = +z.
 * rijk = Rome (rood), vijand = Galliërs (groen), bond = Pompeius (blauw), fatimid = Egypte (goud).
 */

export type MOStand = 'rijk' | 'vijand' | 'bond' | 'fatimid' | 'caesar' | undefined;

const KLEUR: Record<string, string> = {
  rijk: '#B3412F',
  caesar: '#D1A23A',
  vijand: '#5E8A5A',
  bond: '#3E5F9A',
  fatimid: '#C9A646',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { rijk: 0.34, caesar: 0.46, vijand: 0.26, bond: 0.3, fatimid: 0.26, land: 0.14 };

const SCHAAL = 26 / 3500;
const projectie = geoAzimuthalEqualArea()
  .rotate([-12, -42])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opRome = (lon: number, lat: number, y = 0.45): V3 => {
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

/* Standen door de tijd (moderne landen als benadering). */
const REPUBLIEK = { Italy: 'rijk', Greece: 'rijk', Spain: 'rijk', Portugal: 'rijk', Tunisia: 'rijk', Albania: 'rijk', 'North Macedonia': 'rijk', Croatia: 'rijk', Slovenia: 'rijk' } as const;
const GALLIE = { France: 'vijand', Belgium: 'vijand', Switzerland: 'vijand', Luxembourg: 'vijand', Netherlands: 'vijand' } as const;
export const R_100: Record<string, MOStand> = { ...REPUBLIEK, ...GALLIE, Egypt: 'fatimid' };
export const R_75: Record<string, MOStand> = { ...R_100, Turkey: 'rijk' };
export const R_58: Record<string, MOStand> = { ...R_75, Syria: 'rijk', Lebanon: 'rijk', Israel: 'rijk' };
export const R_50: Record<string, MOStand> = { ...R_58, France: 'caesar', Belgium: 'caesar', Switzerland: 'caesar', Luxembourg: 'caesar', Netherlands: 'caesar' };
const POMP = { Spain: 'bond', Portugal: 'bond', Greece: 'bond', Albania: 'bond', 'North Macedonia': 'bond', Turkey: 'bond', Syria: 'bond', Lebanon: 'bond', Israel: 'bond', Tunisia: 'bond' } as const;
export const R_49: Record<string, MOStand> = { ...R_50, ...POMP, Italy: 'caesar' };
export const R_45: Record<string, MOStand> = { ...R_50, Italy: 'caesar', Spain: 'caesar', Portugal: 'caesar', Greece: 'caesar', Albania: 'caesar', 'North Macedonia': 'caesar', Turkey: 'caesar', Syria: 'caesar', Lebanon: 'caesar', Israel: 'caesar', Tunisia: 'caesar', Croatia: 'caesar', Slovenia: 'caesar' };

export const KaarttafelRome = ({
  van,
  naar,
  p = 1,
  licht,
  gloed = 0,
}: {
  van: Record<string, MOStand>;
  naar?: Record<string, MOStand>;
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

export const SpeldRome = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opRome(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};

/** Steden die steeds terugkomen. */
export const STAD = {
  rome: [12.5, 41.9],
  rhodos: [28.22, 36.43],
  pharmacusa: [27.2, 37.3],
  gades: [-6.29, 36.53],
  alesia: [4.5, 47.54],
  rijn: [7.1, 50.4],
  dover: [1.3, 51.12],
  rubicon: [12.4, 44.1],
  ravenna: [12.2, 44.42],
  pharsalus: [22.38, 39.3],
  alexandrie: [29.92, 31.2],
  zela: [35.9, 40.3],
  massilia: [5.37, 43.3],
} as const;
export type StadNaam = keyof typeof STAD;
