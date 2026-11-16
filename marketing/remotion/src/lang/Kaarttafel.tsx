import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landen from 'world-atlas/countries-50m.json';
import { Blok, type V3 } from '../watals/Figuur';

/**
 * De kaarttafel: Europa als uitgesneden 3D-landvlakken op een houten tafel, in de blokstijl van de
 * What-if-video's. Een land dat bij het rijk hoort groeit omhoog en kleurt blauw; zo zie je het
 * rijk groeien en krimpen. Moderne grenzen, dus een benadering (dat zegt de video er ook bij).
 * Noorden = -z (van de camera af), zuiden = +z.
 */

export type Stand = 'rijk' | 'bond' | 'vijand' | 'genua' | undefined;

const KLEUR: Record<string, string> = {
  rijk: '#2F5FA8',
  bond: '#8FB1DE',
  vijand: '#C98A6E',
  genua: '#C9A646',
  land: '#D9C9A0',
};
const HOOGTE: Record<string, number> = { rijk: 0.42, bond: 0.24, vijand: 0.2, genua: 0.24, land: 0.14 };

// projectie: Europa ~26 eenheden breed, middelpunt rond Duitsland
const SCHAAL = 26 / 3600;
const projectie = geoAzimuthalEqualArea()
  .rotate([-12, -50])
  .scale(6371 * SCHAAL)
  .translate([0, 0])
  .clipExtent([
    [-17, -11],
    [17, 11],
  ]);

/** lengte/breedte → wereldcoördinaat op het tafelblad (y = hoogte van het land). */
export const opKaart = (lon: number, lat: number, y = 0.45): V3 => {
  const p = projectie([lon, lat]) ?? [0, 0];
  return [p[0], y, p[1]];
};

type Ring = { naam: string; punten: [number, number][]; midden: [number, number] };

let cache: Ring[] | null = null;
const ringen = (): Ring[] => {
  if (cache) return cache;
  const fc = feature(landen as never, (landen as never as { objects: { countries: never } }).objects.countries) as unknown as {
    features: { properties: { name: string }; geometry: unknown }[];
  };
  const uit: Ring[] = [];
  for (const f of fc.features) {
    const naam = f.properties.name;
    if (['San Marino', 'Vatican', 'Monaco', 'Liechtenstein', 'Andorra'].includes(naam)) continue;
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
      // kleine eilandjes weg (ruis), rest houden
      let a = 0;
      for (let i = 0; i < r.length; i++) {
        const [x1, y1] = r[i];
        const [x2, y2] = r[(i + 1) % r.length];
        a += x1 * y2 - x2 * y1;
      }
      if (Math.abs(a) / 2 < 0.004) continue;
      const mx = r.reduce((s, p) => s + p[0], 0) / r.length;
      const my = r.reduce((s, p) => s + p[1], 0) / r.length;
      uit.push({ naam, punten: r, midden: [mx, my] });
    }
  }
  cache = uit;
  return uit;
};

/** Is deze ring Corsica? (hoort in de data bij Frankrijk) */
export const isCorsica = (r: { naam: string; midden: [number, number] }) => {
  const c = projectie([9.1, 42.1])!;
  return r.naam === 'France' && Math.hypot(r.midden[0] - c[0], r.midden[1] - c[1]) < 0.6;
};

const geometrieCache = new Map<string, THREE.ExtrudeGeometry>();
const geometrie = (r: Ring, i: number) => {
  const k = `${r.naam}#${i}`;
  let g = geometrieCache.get(k);
  if (!g) {
    const s = new THREE.Shape(r.punten.map(([x, y]) => new THREE.Vector2(x, -y)));
    g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false });
    geometrieCache.set(k, g);
  }
  return g;
};

const meng = (a: string, b: string, p: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), p).getHexString();

/**
 * @param van/naar  stand per land (of per ring via `ringStand`), p = overgang 0..1
 * @param licht     extra glans op ringen waarvoor `licht(ring)` waar is (Corsica laten oplichten)
 */
export const Kaarttafel = ({
  van,
  naar,
  p = 1,
  ringStand,
  licht,
  gloed = 0,
}: {
  van: Record<string, Stand>;
  naar?: Record<string, Stand>;
  p?: number;
  ringStand?: (r: Ring, fase: 'van' | 'naar') => Stand | null;
  licht?: (r: Ring) => boolean;
  gloed?: number;
}) => {
  const lijst = useMemo(ringen, []);
  const doel = naar ?? van;
  return (
    <group>
      {/* tafelblad, rand en zee */}
      <Blok p={[0, -0.6, 0]} s={[38, 1.0, 26]} c="#6B4428" rough={0.7} />
      <Blok p={[0, -0.05, 0]} s={[36, 0.1, 24]} c="#4F331F" rough={0.7} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[34, 22]} />
        <meshStandardMaterial color="#7FA3B4" roughness={0.9} />
      </mesh>
      {lijst.map((r, i) => {
        const sv = (ringStand?.(r, 'van') ?? van[r.naam]) ?? 'land';
        const sn = (ringStand?.(r, 'naar') ?? doel[r.naam]) ?? 'land';
        const h = HOOGTE[sv] + (HOOGTE[sn] - HOOGTE[sv]) * p;
        const kleur = meng(KLEUR[sv], KLEUR[sn], p);
        const oplicht = licht?.(r) ? gloed : 0;
        return (
          <mesh key={i} geometry={geometrie(r, i)} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} scale={[1, 1, h + oplicht * 0.25]} castShadow receiveShadow>
            <meshStandardMaterial color={kleur} roughness={0.85} flatShading emissive={oplicht ? '#FFD27A' : '#000000'} emissiveIntensity={oplicht * 0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Speld met vlaggetje op de kaart (stad, plaats). */
export const Speld = ({ lon, lat, kleur = '#B3312B', hoogte = 1.2, schaal = 1 }: { lon: number; lat: number; kleur?: string; hoogte?: number; schaal?: number }) => {
  const [x, , z] = opKaart(lon, lat);
  return (
    <group position={[x, 0.45, z]} scale={schaal}>
      <Blok p={[0, hoogte / 2, 0]} s={[0.05, hoogte, 0.05]} c="#3A2A1C" />
      <Blok p={[0.22, hoogte - 0.15, 0]} s={[0.4, 0.26, 0.03]} c={kleur} />
      <Blok p={[0, 0.03, 0]} s={[0.22, 0.06, 0.22]} c="#2A1E16" />
    </group>
  );
};
