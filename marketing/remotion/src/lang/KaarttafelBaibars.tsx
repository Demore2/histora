import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * Kaarttafel voor "Baibars" (lange video #05): de blokstijl van KaarttafelMO (Saladin), maar groter van bereik,
 * van Cairo tot de Kipchak-steppe ten noorden van de Zwarte Zee. Moderne grenzen, dus een benadering.
 * Noorden = -z. mamluk = geel/oranje, mongool = donkerrood, kruis = blauwgrijs, steppe = Kipchak-groen,
 * ayyubid = de oude dynastie van Saladin (zandgoud).
 */

export type BStand = 'mamluk' | 'mongool' | 'kruis' | 'steppe' | 'ayyubid' | undefined;

const KLEUR: Record<string, string> = {
  mamluk: '#E39A2C',
  mongool: '#7A2A24',
  kruis: '#7E8C9E',
  steppe: '#93A866',
  ayyubid: '#C9A66B',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { mamluk: 0.44, mongool: 0.34, kruis: 0.28, steppe: 0.22, ayyubid: 0.24, land: 0.14 };

const SCHAAL = 21 / 2300;
const projectie = geoAzimuthalEqualArea()
  .rotate([-38, -39.5])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

export const opB = (lon: number, lat: number, y = 0.45): V3 => {
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
const STEPPE = { Ukraine: 'steppe', Russia: 'steppe', Kazakhstan: 'steppe', Moldova: 'steppe' } as const;
const MONGOOLS_N = { Ukraine: 'mongool', Russia: 'mongool', Kazakhstan: 'mongool', Moldova: 'mongool', Georgia: 'mongool', Armenia: 'mongool', Azerbaijan: 'mongool', Iran: 'mongool', Turkmenistan: 'mongool', Uzbekistan: 'mongool' } as const;
const KRUIS = { Lebanon: 'kruis', Israel: 'kruis' } as const;
const AYYUBID = { Egypt: 'ayyubid', Syria: 'ayyubid', Jordan: 'ayyubid', Palestine: 'ayyubid' } as const;
/** 1223: de steppe is vrij, Saladins familie regeert Egypte en Syrië. */
export const B_1223: Record<string, BStand> = { ...STEPPE, ...KRUIS, ...AYYUBID };
/** ~1237: de Mongolen over de steppe. */
export const B_1237: Record<string, BStand> = { ...KRUIS, ...AYYUBID, ...MONGOOLS_N };
/** 1250: de Mamelukken in Egypte; Anatolië is Mongoolse vazal. */
export const B_1250: Record<string, BStand> = { ...KRUIS, ...AYYUBID, ...MONGOOLS_N, Turkey: 'mongool', Egypt: 'mamluk' };
/** 1258: Bagdad. */
export const B_1258: Record<string, BStand> = { ...B_1250, Iraq: 'mongool' };
/** 1260, voorjaar: Syrië gevallen. */
export const B_1260: Record<string, BStand> = { ...B_1258, Syria: 'mongool', Jordan: 'mongool' };
/** 1260, na Ain Jalut. */
export const B_1260B: Record<string, BStand> = { ...B_1258, Syria: 'mamluk', Jordan: 'mamluk', Palestine: 'mamluk' };
/** 1271: de kastelen gevallen (Akko en Tripoli nog niet: benadering). */
export const B_1271: Record<string, BStand> = { ...B_1260B, Israel: 'mamluk' };

export const KaarttafelBaibars = ({
  van,
  naar,
  p = 1,
  licht,
  gloed = 0,
}: {
  van: Record<string, BStand>;
  naar?: Record<string, BStand>;
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

export const SpeldB = ({ lon, lat, kleur = '#B3312B', hoogte = 1.0, schaal = 0.8 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opB(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};

/** Plaatsen die steeds terugkomen. */
export const BPLAATS = {
  steppe: [40.5, 48.2],
  krim: [35.1, 45.0],
  samsun: [36.33, 41.29],
  sivas: [37.02, 39.75],
  aleppo: [37.16, 36.2],
  hama: [36.75, 35.13],
  damascus: [36.29, 33.51],
  cairo: [31.24, 30.04],
  damietta: [31.81, 31.42],
  mansoura: [31.38, 31.04],
  baghdad: [44.36, 33.31],
  ainJalut: [35.36, 32.55],
  caesarea: [34.9, 32.5],
  arsuf: [34.81, 32.2],
  safed: [35.5, 32.96],
  antiochie: [36.16, 36.2],
  krak: [36.29, 34.76],
  elbistan: [37.2, 38.2],
  gaza: [34.47, 31.5],
  kerak: [35.7, 31.18],
} as const;
export type BPlaats = keyof typeof BPLAATS;
