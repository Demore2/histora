import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel van het Midden-Oosten (Saladin): zelfde blokstijl als Kaarttafel.tsx (Europa), andere
 * projectie en kleuren. Moderne grenzen, dus een benadering. Noorden = -z, zuiden = +z.
 * rijk = Saladin (Ayyubidisch goud), vijand = kruisvaarders (rood), bond = Zengiden (groen),
 * fatimid = Fatimiden (paars).
 */

export type MOStand = 'rijk' | 'vijand' | 'bond' | 'fatimid' | undefined;

const KLEUR: Record<string, string> = {
  rijk: '#D1A23A',
  vijand: '#B3412F',
  bond: '#5E8A5A',
  fatimid: '#7A5EA0',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { rijk: 0.42, vijand: 0.3, bond: 0.24, fatimid: 0.24, land: 0.14 };

const SCHAAL = 26 / 2300;
const projectie = geoAzimuthalEqualArea()
  .rotate([-38, -31])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opMO = (lon: number, lat: number, y = 0.45): V3 => {
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
const KRUIS = { Israel: 'vijand', Palestine: 'vijand', Lebanon: 'vijand' } as const;
export const MO_1137: Record<string, MOStand> = { ...KRUIS, Syria: 'bond', Iraq: 'bond', Egypt: 'fatimid' };
export const MO_1171: Record<string, MOStand> = { ...KRUIS, Syria: 'bond', Iraq: 'bond', Egypt: 'rijk' };
export const MO_1186: Record<string, MOStand> = { ...KRUIS, Syria: 'rijk', Iraq: 'rijk', Egypt: 'rijk', Jordan: 'rijk' };
export const MO_1187: Record<string, MOStand> = { Lebanon: 'vijand', Israel: 'rijk', Palestine: 'rijk', Syria: 'rijk', Iraq: 'rijk', Egypt: 'rijk', Jordan: 'rijk' };
export const MO_1192: Record<string, MOStand> = { Lebanon: 'vijand', Israel: 'vijand', Palestine: 'rijk', Syria: 'rijk', Iraq: 'rijk', Egypt: 'rijk', Jordan: 'rijk' };
export const MO_1193: Record<string, MOStand> = { Lebanon: 'vijand', Israel: 'vijand', Palestine: 'bond', Syria: 'fatimid', Iraq: 'bond', Egypt: 'rijk', Jordan: 'vijand' };

export const KaarttafelMO = ({
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

export const SpeldMO = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opMO(lon, lat);
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
  tikrit: [43.68, 34.6],
  damascus: [36.29, 33.51],
  aleppo: [37.16, 36.2],
  mosul: [43.13, 36.34],
  baghdad: [44.36, 33.31],
  cairo: [31.24, 30.04],
  jerusalem: [35.21, 31.77],
  acre: [35.07, 32.93],
  jaffa: [34.75, 32.05],
  tiberias: [35.53, 32.79],
  hattin: [35.45, 32.8],
  ramla: [34.87, 31.93],
  tyre: [35.2, 33.27],
  arsuf: [34.81, 32.2],
} as const;
export type StadNaam = keyof typeof STAD;
