import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel van de Grieks-Perzische wereld (Leonidas): kopie van KaarttafelRome.tsx met een projectie van Sicilië
 * tot Perzië. Moderne grenzen, dus een benadering. Noorden = -z, zuiden = +z.
 * rijk = Perzië (paars), bond = de Griekse steden (blauw), caesar = Sparta-goud (oplichten), vijand = groen (ongebruikt).
 */

export type MOStand = 'rijk' | 'vijand' | 'bond' | 'fatimid' | 'caesar' | undefined;

const KLEUR: Record<string, string> = {
  rijk: '#7A3B6E',
  caesar: '#D1A23A',
  vijand: '#5E8A5A',
  bond: '#3E6FA8',
  fatimid: '#C9A646',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { rijk: 0.34, caesar: 0.46, vijand: 0.26, bond: 0.3, fatimid: 0.26, land: 0.14 };

const SCHAAL = 26 / 3500;
const projectie = geoAzimuthalEqualArea()
  .rotate([-31, -37])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opGriek = (lon: number, lat: number, y = 0.45): V3 => {
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
const GRIEKEN = { Greece: 'bond' } as const;
const PERZIE = { Turkey: 'rijk', Iran: 'rijk', Iraq: 'rijk', Syria: 'rijk', Lebanon: 'rijk', Israel: 'rijk', Palestine: 'rijk', Jordan: 'rijk', Egypt: 'rijk', Cyprus: 'rijk', Armenia: 'rijk', Azerbaijan: 'rijk', Georgia: 'rijk', Kuwait: 'rijk', Turkmenistan: 'rijk', Afghanistan: 'rijk', Libya: 'rijk' } as const;
export const G_LEEG: Record<string, MOStand> = { ...GRIEKEN };
export const G_PERZIE: Record<string, MOStand> = { ...GRIEKEN, ...PERZIE };
/** 480: Thracië en Macedonië zijn onderworpen. */
export const G_480: Record<string, MOStand> = { ...G_PERZIE, Bulgaria: 'rijk', 'North Macedonia': 'rijk' };
/** Na Thermopylae: Perzië stroomt Griekenland in. */
export const G_INVAL: Record<string, MOStand> = { ...G_480, Greece: 'rijk' };
/** Sparta-goud: Griekenland licht op als 'Sparta en bondgenoten'. */
export const G_SPARTA: Record<string, MOStand> = { ...G_480, Greece: 'caesar' };

export const KaarttafelGriek = ({
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

export const SpeldGriek = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opGriek(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};

/** Plaatsen die steeds terugkomen. */
export const PLAATS = {
  sparta: [22.43, 37.07],
  thermopylae: [22.53, 38.8],
  delphi: [22.5, 38.48],
  athene: [23.73, 37.98],
  thespiae: [23.15, 38.3],
  salamis: [23.5, 37.93],
  plataea: [23.27, 38.21],
  sardis: [28.04, 38.49],
  abydos: [26.4, 40.2],
  susa: [48.25, 32.19],
  persepolis: [52.89, 29.93],
  sicilie: [12.6, 38.0],
} as const;
export type PlaatsNaam = keyof typeof PLAATS;
