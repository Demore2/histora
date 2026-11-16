import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { Blok, type Overschrijf, type V3 } from './Figuur';

/* ---------------- camera, licht, lucht, scherptediepte ---------------- */

/** Zet de camera elke frame op een berekende plek (Remotion rendert frame voor frame). */
export const Camera = ({ pos, kijk, fov = 35 }: { pos: V3; kijk: V3; fov?: number }) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  camera.position.set(...pos);
  camera.lookAt(...kijk);
  if (camera.fov !== fov) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
  return null;
};

/** Scherptediepte: alles rond `focus` scherp, voor- en achtergrond zacht (zoals ref-01). */
export const Scherpte = ({ focus, sterkte = 3 }: { focus: V3; sterkte?: number }) => (
  <EffectComposer multisampling={4}>
    <DepthOfField target={focus} focalLength={0.035} bokehScale={sterkte} height={960} />
  </EffectComposer>
);

/** Lucht als grote bol met een kleurverloop (geen CSS: dan werkt de scherptediepte ook op de horizon). */
export const Lucht = ({ boven, horizon, onder }: { boven: string; horizon: string; onder?: string }) => {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(300, 32, 24);
    const kb = new THREE.Color(boven);
    const kh = new THREE.Color(horizon);
    const ko = new THREE.Color(onder ?? horizon);
    const pos = g.attributes.position;
    const kleuren: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 300;
      const c = y >= 0 ? kh.clone().lerp(kb, Math.min(1, Math.pow(y, 0.6) * 1.15)) : kh.clone().lerp(ko, Math.min(1, -y * 3));
      kleuren.push(c.r, c.g, c.b);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(kleuren, 3));
    return g;
  }, [boven, horizon, onder]);
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} />
    </mesh>
  );
};

export const Zon = ({ position, kleur = '#FFD58A', grootte = 18 }: { position: V3; kleur?: string; grootte?: number }) => (
  <mesh position={position}>
    <circleGeometry args={[grootte, 32]} />
    <meshBasicMaterial color={kleur} fog={false} transparent opacity={0.95} />
  </mesh>
);

type LichtProps = { zon?: V3; kleur?: string; kracht?: number; omgeving?: number; bereik?: number };

/** Zacht, warm daglicht zoals ref-01: veel omgevingslicht, één lage zon, zachte schaduwen. */
export const Daglicht = ({ zon = [10, 14, 8], kleur = '#FFE4BE', kracht = 2.0, omgeving = 1.2, bereik = 16 }: LichtProps) => (
  <>
    <hemisphereLight args={['#FFF3DF', '#7A6450', omgeving]} />
    <ambientLight intensity={0.22} color="#FFE9CC" />
    <directionalLight
      position={zon}
      intensity={kracht}
      color={kleur}
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0004}
      shadow-normalBias={0.02}
      shadow-radius={6}
      shadow-camera-left={-bereik}
      shadow-camera-right={bereik}
      shadow-camera-top={bereik}
      shadow-camera-bottom={-bereik}
      shadow-camera-near={1}
      shadow-camera-far={80}
    />
  </>
);

/** Binnen: warm, gedempt, licht van één kant (Senaat, tent, paleis). */
export const Binnenlicht = ({ zon = [-6, 9, 6] as V3, kleur = '#FFDDB0' }) => (
  <>
    <hemisphereLight args={['#F6E6CC', '#5A4636', 0.9]} />
    <directionalLight position={zon} intensity={1.7} color={kleur} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-radius={5}
      shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} />
  </>
);

/** Zonsondergang: tegenlicht van laag achter, oranje omgeving. */
export const Avondlicht = () => (
  <>
    <hemisphereLight args={['#FFB777', '#3A2216', 0.85]} />
    <directionalLight position={[0, 4, -30]} intensity={2.4} color="#FF9A55" />
    <directionalLight position={[6, 8, 10]} intensity={0.3} color="#FFD2A8" />
  </>
);

/** Nacht met fakkels: blauw maanlicht + de puntlichten van de fakkels zelf. */
export const Nachtlicht = () => (
  <>
    <hemisphereLight args={['#6A7CB0', '#1A1620', 0.8]} />
    <directionalLight position={[-10, 14, 8]} intensity={0.9} color="#A8BCE8" />
  </>
);

/* ---------------- water ---------------- */

/** Laag-poly zee met echte golven (vlakke facetten), geanimeerd op t. */
export const Zee = ({ t = 0, kleur = '#2F6E9C', grootte = 140, golf = 0.18 }: { t?: number; kleur?: string; grootte?: number; golf?: number }) => {
  const geo = useMemo(() => new THREE.PlaneGeometry(grootte, grootte, 90, 90).rotateX(-Math.PI / 2), [grootte]);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y =
      Math.sin(x * 0.55 + t * 1.3) * golf +
      Math.sin(z * 0.7 - t * 1.1) * golf * 0.8 +
      Math.sin((x + z) * 1.6 + t * 2.2) * golf * 0.25;
    pos.setY(i, y);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial color={kleur} roughness={0.28} metalness={0.08} flatShading />
    </mesh>
  );
};

/** Schuimvlokjes rond een punt (riemen, boeg, paardenbenen). */
export const Schuim = ({ punten, t = 0 }: { punten: V3[]; t?: number }) => (
  <>
    {punten.map((p, i) => {
      const s = 0.25 + ((Math.sin(t * 4 + i * 1.7) + 1) / 2) * 0.25;
      return <Blok key={i} p={[p[0], p[1] + 0.05, p[2]]} s={[s, 0.04, s * 0.7]} c="#E8F2F7" rough={0.6} r={[0, i, 0]} />;
    })}
  </>
);

/* ---------------- schip ---------------- */

/** Galei van blokken. Lengte langs z, boeg naar -z. Riemen zitten aan de romp vast en raken het water. */
export const Galei = ({ position, rotation, deining = 0, mast = true, schilden = '#A8322B' }: { position?: V3; rotation?: V3; deining?: number; mast?: boolean; schilden?: string }) => {
  const hout = '#7A5232';
  const houtLicht = '#A0724A';
  const houtDonker = '#4F331F';
  const roeiSlag = Math.sin(deining * 2.2);
  return (
    <group
      position={position}
      rotation={[(rotation?.[0] ?? 0) + Math.sin(deining) * 0.02, rotation?.[1] ?? 0, Math.sin(deining * 0.8) * 0.025]}
    >
      {/* romp in lagen, smaller naar onderen */}
      <Blok p={[0, 0.45, 0]} s={[2.5, 0.55, 9]} c={hout} />
      <Blok p={[0, 0.0, 0]} s={[2.1, 0.45, 8.6]} c={houtDonker} />
      <Blok p={[0, -0.3, 0]} s={[1.5, 0.3, 7.8]} c={houtDonker} />
      {/* plankranden */}
      {[0.22, 0.48, 0.7].map((y) => [-1, 1].map((k) => <Blok key={`${y}${k}`} p={[k * 1.26, y, 0]} s={[0.03, 0.05, 8.9]} c={houtDonker} />))}
      {/* boeg met ram en geschilderd oog */}
      <Blok p={[0, 0.4, -5.0]} s={[1.7, 0.75, 1.4]} c={hout} r={[0.3, 0, 0]} />
      <Blok p={[0, -0.05, -5.9]} s={[0.35, 0.3, 1.4]} c="#8A6A3A" metal={0.6} rough={0.4} />
      <Blok p={[0, 0.95, -5.7]} s={[0.35, 0.5, 0.9]} c={houtDonker} r={[-0.35, 0, 0]} />
      {[-1, 1].map((k) => (
        <group key={k}>
          <Blok p={[k * 0.86, 0.45, -5.1]} s={[0.02, 0.22, 0.34]} c="#F2EAD8" r={[0.3, 0, 0]} />
          <Blok p={[k * 0.87, 0.45, -5.1]} s={[0.02, 0.12, 0.14]} c="#1A1410" r={[0.3, 0, 0]} />
        </group>
      ))}
      {/* achtersteven die omkrult */}
      <Blok p={[0, 0.95, 4.85]} s={[1.6, 1.0, 1.1]} c={hout} r={[-0.25, 0, 0]} />
      <Blok p={[0, 1.65, 5.45]} s={[0.35, 0.9, 0.35]} c={houtDonker} r={[-0.55, 0, 0]} />
      <Blok p={[0, 2.05, 5.95]} s={[0.35, 0.35, 0.5]} c={houtDonker} r={[-1.2, 0, 0]} />
      {/* stuurriemen */}
      {[-1, 1].map((k) => (
        <Blok key={k} p={[k * 1.35, 0.4, 4.4]} s={[0.12, 1.8, 0.12]} c={houtDonker} r={[0.5, 0, k * 0.15]} />
      ))}
      {/* dek met planken */}
      <Blok p={[0, 0.735, 0]} s={[2.3, 0.04, 8.6]} c={houtLicht} />
      {Array.from({ length: 6 }, (_, i) => (
        <Blok key={i} p={[-0.95 + i * 0.38, 0.758, 0]} s={[0.015, 0.01, 8.6]} c={hout} />
      ))}
      {/* reling + schilden */}
      {[-1.2, 1.2].map((x) => (
        <group key={x}>
          <Blok p={[x, 1.0, 0]} s={[0.1, 0.5, 8.6]} c={houtDonker} />
          {Array.from({ length: 9 }, (_, i) => (
            <group key={i} position={[x * 1.05, 1.0, -3.4 + i * 0.85]}>
              <Blok p={[0, 0, 0]} s={[0.04, 0.44, 0.44]} c={schilden} />
              <Blok p={[Math.sign(x) * 0.03, 0, 0]} s={[0.04, 0.12, 0.12]} c="#C9A646" metal={0.8} rough={0.3} />
            </group>
          ))}
        </group>
      ))}
      {/* roeipoorten + riemen: binnenkant in de romp, blad in het water */}
      {Array.from({ length: 8 }, (_, i) =>
        [-1, 1].map((k) => {
          const z = -3.2 + i * 0.9;
          const zwaai = roeiSlag * 0.25 * k;
          return (
            <group key={`${i}${k}`} position={[k * 1.26, 0.32, z]} rotation={[0, zwaai, 0]}>
              <Blok p={[k * 0.0, 0, 0]} s={[0.06, 0.16, 0.16]} c="#21160E" />
              <group rotation={[0, 0, -k * 0.5]}>
                <Blok p={[k * 1.0, 0, 0]} s={[2.0, 0.07, 0.08]} c={houtDonker} />
                <Blok p={[k * 1.95, 0, 0]} s={[0.5, 0.03, 0.2]} c={houtDonker} />
              </group>
            </group>
          );
        }),
      )}
      {mast && (
        <>
          <mesh position={[0, 3.6, -0.6]} castShadow>
            <cylinderGeometry args={[0.1, 0.13, 6, 8]} />
            <meshStandardMaterial color={houtDonker} roughness={0.8} />
          </mesh>
          <Blok p={[0, 6.0, -0.6]} s={[4.4, 0.14, 0.14]} c={houtDonker} />
          <Blok p={[0, 4.55, -0.45]} s={[4.0, 2.8, 0.06]} c="#EADFC8" r={[0.08, 0, 0]} rough={0.95} />
          <Blok p={[0, 4.55, -0.41]} s={[4.0, 0.35, 0.02]} c="#A8322B" r={[0.08, 0, 0]} />
        </>
      )}
    </group>
  );
};

/** Waar de riembladen het water raken (voor Schuim), in wereldcoördinaten zonder deining. */
export const riemPunten = (offset: V3 = [0, 0, 0]): V3[] =>
  Array.from({ length: 8 }, (_, i) => [-1, 1].map((k) => [offset[0] + k * 1.85, offset[1], offset[2] - 3.2 + i * 0.9] as V3)).flat();

/* ---------------- land ---------------- */

export const Grond = ({ kleur = '#7E9A4E', y = 0, grootte = 300 }: { kleur?: string; y?: number; grootte?: number }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
    <planeGeometry args={[grootte, grootte]} />
    <meshStandardMaterial color={kleur} roughness={1} />
  </mesh>
);

/** Heuvelruggen in de verte (silhouet van blokken). */
export const Heuvels = ({ kleur = '#6B5A4A', z = -60, n = 9 }: { kleur?: string; z?: number; n?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const x = (i - n / 2) * 16 + (i % 2) * 5;
      const h = 6 + ((i * 7) % 5) * 2.5;
      return <Blok key={i} p={[x, h / 2 - 1, z - (i % 3) * 8]} s={[18, h, 10]} c={kleur} r={[0, (i % 3) * 0.3, 0]} rough={1} />;
    })}
  </>
);

export const Boom = ({ position, schaal = 1, kleur = '#4E7A3A' }: { position: V3; schaal?: number; kleur?: string }) => (
  <group position={position} scale={schaal}>
    <Blok p={[0, 1.0, 0]} s={[0.35, 2.0, 0.35]} c="#5A3B24" />
    <Blok p={[0, 2.6, 0]} s={[2.0, 1.6, 2.0]} c={kleur} />
    <Blok p={[0.2, 3.5, 0.1]} s={[1.4, 1.0, 1.4]} c={kleur} />
    <Blok p={[-0.5, 2.3, 0.6]} s={[0.9, 0.8, 0.9]} c={kleur} />
  </group>
);

export const Bos = ({ n = 40, straal = 30, vrij = 6, zaad = 1 }: { n?: number; straal?: number; vrij?: number; zaad?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const a = (i * 2.399 + zaad) % (Math.PI * 2);
      const r = vrij + ((i * 7.13 + zaad * 3) % (straal - vrij));
      const k = ['#4E7A3A', '#5D8A40', '#3F6A32'][i % 3];
      return <Boom key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r - 6]} schaal={0.9 + ((i * 3) % 5) * 0.12} kleur={k} />;
    })}
  </>
);

/** Rivier: donker water tussen twee oevers (langs x). */
export const Rivier = ({ t = 0, breed = 6, nacht = true }: { t?: number; breed?: number; nacht?: boolean }) => (
  <group>
    <group position={[0, -0.25, 0]} scale={[1, 1, breed / 40]}>
      <Zee t={t} kleur={nacht ? '#1E2E48' : '#4A7E98'} grootte={40} golf={0.06} />
    </group>
    <Blok p={[0, 0, -breed / 2 - 10]} s={[80, 0.6, 20]} c={nacht ? '#2A2A22' : '#7A8A48'} rough={1} />
    <Blok p={[0, 0, breed / 2 + 10]} s={[80, 0.6, 20]} c={nacht ? '#2A2A22' : '#7A8A48'} rough={1} />
  </group>
);

/** Fakkel met echt licht. */
export const Fakkel = ({ position, t = 0, licht = true }: { position: V3; t?: number; licht?: boolean }) => {
  const flikker = 1 + Math.sin(t * 13 + position[0] * 3) * 0.15 + Math.sin(t * 7.3 + position[2]) * 0.1;
  return (
    <group position={position}>
      <Blok p={[0, 0.6, 0]} s={[0.07, 1.2, 0.07]} c="#3A2A1C" />
      <Blok p={[0, 1.28, 0]} s={[0.16 * flikker, 0.24 * flikker, 0.16 * flikker]} c="#FFB347" emissive="#FF8A2A" />
      {licht && <pointLight position={[0, 1.4, 0]} intensity={4 * flikker} distance={9} decay={1.6} color="#FF9A45" />}
    </group>
  );
};

/* ---------------- paard ---------------- */

export const Paard = ({
  position,
  rotation,
  kleur = '#3A2A20',
  manen = '#1A1310',
  dek = '#A8322B',
  t = 0,
  loopt = false,
  ruiter,
  ezel = false,
}: {
  ezel?: boolean; // muilezel: lange oren, korter hoofd
  position?: V3;
  rotation?: V3;
  kleur?: string;
  manen?: string;
  dek?: string;
  t?: number;
  loopt?: boolean;
  ruiter?: React.ReactNode;
}) => {
  const stap = loopt ? Math.sin(t * 7) * 0.45 : 0;
  const knik = loopt ? Math.sin(t * 7) * 0.05 : Math.sin(t * 1.5) * 0.03;
  return (
    <group position={position} rotation={rotation}>
      <group position={[0, Math.abs(stap) * 0.05, 0]}>
        <Blok p={[0, 1.5, 0]} s={[0.85, 0.85, 2.1]} c={kleur} />
        <Blok p={[0, 1.55, 0.05]} s={[0.92, 0.5, 1.0]} c={dek} />
        <Blok p={[0, 1.83, 0.05]} s={[0.6, 0.12, 0.7]} c="#5A3B24" />
        {/* nek + hoofd */}
        <group position={[0, 1.8, -0.95]} rotation={[0.55 + knik, 0, 0]}>
          <Blok p={[0, 0.4, 0]} s={[0.5, 0.95, 0.5]} c={kleur} />
          <Blok p={[0, 0.45, 0.28]} s={[0.14, 0.95, 0.12]} c={manen} />
          <group position={[0, 0.85, -0.1]} rotation={[-1.1, 0, 0]}>
            <Blok p={[0, 0, -0.32]} s={[0.42, 0.42, 0.85]} c={kleur} />
            <Blok p={[0, -0.05, -0.74]} s={[0.36, 0.34, 0.12]} c="#241A14" />
            {[-0.16, 0.16].map((x) => (
              <group key={x}>
                <Blok p={[x * (ezel ? 1.25 : 1), ezel ? 0.45 : 0.27, ezel ? 0.05 : 0.0]} s={ezel ? [0.12, 0.55, 0.08] : [0.1, 0.18, 0.08]} r={ezel ? [0.35, 0, x > 0 ? -0.3 : 0.3] : undefined} c={kleur} />
                <Blok p={[x * 1.3, 0.08, -0.32]} s={[0.02, 0.08, 0.08]} c="#0E0A08" />
              </group>
            ))}
          </group>
        </group>
        {/* staart */}
        <Blok p={[0, 1.4, 1.15]} s={[0.18, 0.9, 0.18]} c={manen} r={[-0.35 + knik, 0, 0]} />
      </group>
      {/* benen */}
      {[
        [-0.28, -0.8, stap],
        [0.28, -0.8, -stap],
        [-0.28, 0.8, -stap],
        [0.28, 0.8, stap],
      ].map(([x, z, r], i) => (
        <group key={i} position={[x, 1.15, z]} rotation={[r, 0, 0]}>
          <Blok p={[0, -0.55, 0]} s={[0.22, 1.1, 0.24]} c={kleur} />
          <Blok p={[0, -1.08, 0]} s={[0.24, 0.12, 0.26]} c="#1A1310" />
        </group>
      ))}
      {/* figuren kijken naar +z, het paard naar -z: ruiter omdraaien */}
      {ruiter && <group position={[0, 1.2, 0.05]} rotation={[0, Math.PI, 0]}>{ruiter}</group>}
    </group>
  );
};

/* ---------------- leger ---------------- */

/** Een eenvoudige soldaat (weinig blokken, voor menigten). */
export type Tijd = 'rome' | '1800';

/** Soldaat rond 1800: jas, wit front, witte broek, sjako met pluim, geweer met bajonet. */
const Soldaat1800 = ({ position, rotation, kleur = '#23376B', t = 0, geweerOmhoog = false, zwaai = false }: { position: V3; rotation?: V3; kleur?: string; t?: number; geweerOmhoog?: boolean; zwaai?: boolean }) => (
  <group position={position} rotation={rotation}>
    <group position={[0, Math.abs(Math.sin(t * 6 + position[0] + position[2])) * 0.04, 0]}>
      <Blok p={[0, 0.45, 0]} s={[0.5, 0.9, 0.3]} c="#E6E0D2" />
      <Blok p={[0, 0.12, 0.02]} s={[0.54, 0.24, 0.34]} c="#1A1612" />
      <Blok p={[0, 1.25, 0]} s={[0.6, 0.75, 0.36]} c={kleur} />
      <Blok p={[0, 1.25, 0.2]} s={[0.3, 0.6, 0.02]} c="#ECE6D8" />
      <Blok p={[0, 1.9, 0]} s={[0.5, 0.5, 0.46]} c="#D9A57A" />
      <Blok p={[0, 2.33, 0]} s={[0.54, 0.4, 0.5]} c="#151210" rough={0.6} />
      <Blok p={[0, 2.62, 0.12]} s={[0.08, 0.22, 0.08]} c="#B3312B" />
      {geweerOmhoog ? (
        <group position={[0.38, 1.55, 0.2]} rotation={[1.5, 0, 0]}>
          <Blok p={[0, 0.7, 0]} s={[0.06, 1.5, 0.08]} c="#5A3B24" />
          <Blok p={[0, 1.6, 0]} s={[0.03, 0.32, 0.03]} c="#C9CDD2" metal={0.9} rough={0.2} />
        </group>
      ) : (
        <group position={[0.36, 0.9, 0.05]} rotation={[0, 0, zwaai ? Math.sin(t * 6 + position[0]) * 0.3 - 0.3 : 0]}>
          <Blok p={[0, 0.75, 0]} s={[0.06, 1.5, 0.08]} c="#5A3B24" />
          <Blok p={[0, 1.65, 0]} s={[0.03, 0.32, 0.03]} c="#C9CDD2" metal={0.9} rough={0.2} />
        </group>
      )}
    </group>
  </group>
);

export const Soldaat = ({ position, rotation, kleur = '#A8322B', schild = '#A8322B', t = 0, helm = '#8D8A84', tijd = 'rome', geweerOmhoog, zwaai }: { position: V3; rotation?: V3; kleur?: string; schild?: string; t?: number; helm?: string; tijd?: Tijd; geweerOmhoog?: boolean; zwaai?: boolean }) =>
  tijd === '1800' ? <Soldaat1800 position={position} rotation={rotation} kleur={kleur === '#A8322B' ? undefined : kleur} t={t} geweerOmhoog={geweerOmhoog} zwaai={zwaai} /> : (
  <group position={position} rotation={rotation}>
    <group position={[0, Math.abs(Math.sin(t * 6 + position[0] + position[2])) * 0.04, 0]}>
      <Blok p={[0, 0.45, 0]} s={[0.5, 0.9, 0.3]} c="#4A3424" />
      <Blok p={[0, 1.25, 0]} s={[0.6, 0.75, 0.36]} c={kleur} />
      <Blok p={[0, 1.33, 0]} s={[0.68, 0.46, 0.44]} c="#8D8A84" metal={0.3} rough={0.45} />
      <Blok p={[0, 1.9, 0]} s={[0.5, 0.5, 0.46]} c="#D9A57A" />
      <Blok p={[0, 2.18, 0]} s={[0.56, 0.2, 0.52]} c={helm} metal={0.7} rough={0.35} />
      <Blok p={[0, 2.34, 0]} s={[0.08, 0.16, 0.42]} c="#A8322B" />
      <Blok p={[0.38, 1.1, 0.2]} s={[0.1, 1.1, 0.75]} c={schild} />
      <Blok p={[0.44, 1.1, 0.2]} s={[0.04, 0.2, 0.2]} c="#C9A646" metal={0.8} rough={0.3} />
      <Blok p={[-0.38, 1.6, 0.05]} s={[0.05, 2.6, 0.05]} c="#5A3B24" />
      <Blok p={[-0.38, 2.95, 0.05]} s={[0.07, 0.25, 0.04]} c="#C9CDD2" metal={0.9} rough={0.2} />
    </group>
  </group>
);

export const Leger = ({
  rijen = 4,
  kolommen = 8,
  afstand = 1.1,
  position = [0, 0, 0],
  rotation,
  kleur,
  schild,
  t = 0,
  tijd,
  geweerOmhoog,
  zwaai,
}: {
  rijen?: number;
  kolommen?: number;
  afstand?: number;
  position?: V3;
  rotation?: V3;
  kleur?: string;
  schild?: string;
  t?: number;
  tijd?: Tijd;
  geweerOmhoog?: boolean;
  zwaai?: boolean;
}) => (
  <group position={position} rotation={rotation}>
    {Array.from({ length: rijen }, (_, r) =>
      Array.from({ length: kolommen }, (_, c) => (
        <Soldaat
          key={`${r}-${c}`}
          position={[(c - (kolommen - 1) / 2) * afstand + (r % 2) * 0.3, 0, r * afstand * 1.2]}
          kleur={kleur}
          schild={schild}
          t={t}
          tijd={tijd}
          geweerOmhoog={geweerOmhoog}
          zwaai={zwaai}
        />
      )),
    )}
  </group>
);

export const Banier = ({ position, tekst = false, kleur = '#A8322B', t = 0 }: { position: V3; tekst?: boolean; kleur?: string; t?: number }) => (
  <group position={position}>
    <Blok p={[0, 2.2, 0]} s={[0.1, 4.4, 0.1]} c="#5A3B24" />
    <Blok p={[0, 4.3, 0]} s={[1.9, 0.08, 0.08]} c="#5A3B24" />
    {tekst ? (
      <TekstVlak regels={['VENI', 'VIDI', 'VICI']} b={1.8} h={2.0} achter={kleur} position={[0, 3.25, 0.04]} rotation={[Math.sin(t * 2) * 0.05, 0, 0]} fontPx={150} />
    ) : (
      <Blok p={[0, 3.25, 0.04]} s={[1.8, 2.0, 0.04]} c={kleur} r={[Math.sin(t * 2) * 0.05, 0, 0]} />
    )}
    <Blok p={[0, 4.55, 0]} s={[0.35, 0.35, 0.08]} c="#C9A646" metal={0.8} rough={0.3} />
  </group>
);

/* ---------------- gebouwen ---------------- */

export const Zuil = ({ position, h = 5, kleur = '#EDE4D3', o }: { position: V3; h?: number; kleur?: string; o?: Overschrijf }) => (
  <group position={position}>
    <Blok p={[0, 0.15, 0]} s={[1.0, 0.3, 1.0]} c={kleur} o={o} rough={0.7} />
    <Blok p={[0, h / 2, 0]} s={[0.7, h - 0.6, 0.7]} c={kleur} o={o} rough={0.7} />
    {[0, 0.785].map((r) => <Blok key={r} p={[0, h / 2, 0]} s={[0.04, h - 0.6, 0.78]} c="#D6CBB6" r={[0, r, 0]} o={o} />)}
    <Blok p={[0, h - 0.15, 0]} s={[1.0, 0.3, 1.0]} c={kleur} o={o} rough={0.7} />
  </group>
);

/** Senaatszaal / zuilengang: tegelvloer + twee rijen zuilen. */
export const Zuilengang = ({ lengte = 7, breedte = 7, h = 5.5 }: { lengte?: number; breedte?: number; h?: number }) => (
  <group>
    {Array.from({ length: 14 }, (_, i) =>
      Array.from({ length: 14 }, (_, j) => (
        <Blok
          key={`${i}-${j}`}
          p={[(i - 7) * 1.4, -0.05, (j - 10) * 1.4]}
          s={[1.4, 0.1, 1.4]}
          c={(i + j) % 2 ? '#EDE4D3' : '#B5543A'}
          rough={0.55}
        />
      )),
    )}
    {Array.from({ length: lengte }, (_, i) =>
      [-1, 1].map((k) => <Zuil key={`${i}${k}`} position={[k * (breedte / 2), 0, -i * 2.6 + 3]} h={h} />),
    )}
    {[-1, 1].map((k) => <Blok key={k} p={[k * (breedte / 2), h + 0.25, -lengte * 1.3 + 4.3]} s={[1.2, 0.5, lengte * 2.6]} c="#E3D8C3" rough={0.8} />)}
    <Blok p={[0, h / 2, -lengte * 2.6 + 1.5]} s={[breedte + 2, h + 1, 0.5]} c="#E9DFCC" rough={0.9} />
  </group>
);

export const Sokkel = ({ position, h = 1.6, children }: { position: V3; h?: number; children?: React.ReactNode }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[1.6, h, 1.6]} c="#D9CFBC" rough={0.7} />
    <Blok p={[0, h + 0.06, 0]} s={[1.8, 0.12, 1.8]} c="#CFC4AF" rough={0.7} />
    <group position={[0, h + 0.12, 0]}>{children}</group>
  </group>
);

export const Tent = ({ position, rotation, kleur = '#D9C8A4' }: { position: V3; rotation?: V3; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[-1.1, 1.3, 0]} s={[0.1, 3.0, 4]} c={kleur} r={[0, 0, -0.7]} rough={0.95} />
    <Blok p={[1.1, 1.3, 0]} s={[0.1, 3.0, 4]} c={kleur} r={[0, 0, 0.7]} rough={0.95} />
    <Blok p={[0, 2.35, 0]} s={[0.12, 0.12, 4.1]} c="#5A3B24" />
  </group>
);

/** Strijdwagen met één paard ervoor (triomftocht). */
export const Strijdwagen = ({ position, rotation, t = 0, ruiter }: { position: V3; rotation?: V3; t?: number; ruiter?: React.ReactNode }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.9, 0]} s={[1.3, 0.9, 1.0]} c="#C9A646" metal={0.7} rough={0.35} />
    <Blok p={[0, 0.5, 0]} s={[1.4, 0.12, 1.1]} c="#7A5232" />
    {[-0.78, 0.78].map((x) => (
      <mesh key={x} position={[x, 0.55, 0.1]} rotation={[t * 3, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.1, 10]} />
        <meshStandardMaterial color="#5A3B24" roughness={0.8} />
      </mesh>
    ))}
    <Blok p={[0, 0.7, -1.4]} s={[0.1, 0.1, 2.0]} c="#5A3B24" />
    <Paard position={[0, 0, -3.0]} kleur="#EDE8DE" manen="#CFC6B6" dek="#6B2D5C" t={t} loopt />
    {ruiter && <group position={[0, 0.56, 0]} rotation={[0, Math.PI, 0]}>{ruiter}</group>}
  </group>
);

/** Toeschouwers: een rij simpele figuurtjes in allerlei kleuren. */
export const Menigte = ({ n = 14, z = 0, x0 = -8, t = 0, juich = false }: { n?: number; z?: number; x0?: number; t?: number; juich?: boolean }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const k = ['#B5543A', '#3E6B8A', '#7B5BA0', '#C9A646', '#5D8A40', '#ECE6D8'][i % 6];
      const hop = juich ? Math.abs(Math.sin(t * 5 + i)) * 0.15 : 0;
      return (
        <group key={i} position={[x0 + i * 1.15, hop, z + (i % 2) * 0.7]}>
          <Blok p={[0, 0.5, 0]} s={[0.5, 1.0, 0.32]} c={k} />
          <Blok p={[0, 1.25, 0]} s={[0.5, 0.5, 0.45]} c={['#D9A57A', '#C98F62', '#E6B98E'][i % 3]} />
          <Blok p={[0, 1.55, -0.03]} s={[0.52, 0.12, 0.48]} c="#3B2A1E" />
          {juich && <Blok p={[0.32, 1.3 + hop, 0]} s={[0.14, 0.6, 0.14]} c={k} />}
        </group>
      );
    })}
  </>
);

/** Tekst op een vlak (banier, telefoonscherm) via een canvas-textuur. */
export const TekstVlak = ({ regels, b, h, achter, voor = '#F4E6C0', position, rotation, fontPx = 120 }: { regels: string[]; b: number; h: number; achter: string; voor?: string; position?: V3; rotation?: V3; fontPx?: number }) => {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = Math.round((512 * h) / b);
    const g = c.getContext('2d')!;
    g.fillStyle = achter;
    g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = voor;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `600 ${fontPx}px Georgia, 'Times New Roman', serif`;
    regels.forEach((r, i) => g.fillText(r, c.width / 2, ((i + 0.5) * c.height) / regels.length));
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regels.join('|'), b, h, achter, voor, fontPx]);
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[b, h, 0.04]} />
      <meshStandardMaterial map={tex} roughness={0.9} />
    </mesh>
  );
};

/* ---------------- Napoleon: kanon, piramide, bergen, rotsen, steden, weer ---------------- */

/** Veldkanon rond 1800. Loop wijst naar -z. `schot` 0..1 = mondingsvuur + rook. */
export const Kanon = ({ position, rotation, schot = 0 }: { position: V3; rotation?: V3; schot?: number }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.55, 0.4]} s={[0.5, 0.25, 1.8]} c="#5E7A4A" r={[-0.25, 0, 0]} />
    <mesh position={[0, 0.95, -0.25]} rotation={[Math.PI / 2 + 0.08, 0, 0]} castShadow>
      <cylinderGeometry args={[0.15, 0.2, 1.8, 10]} />
      <meshStandardMaterial color="#6E5A3A" metalness={0.35} roughness={0.45} />
    </mesh>
    {[-0.38, 0.38].map((x) => (
      <mesh key={x} position={[x, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 12]} />
        <meshStandardMaterial color="#5A3B24" roughness={0.8} />
      </mesh>
    ))}
    {schot > 0 && (
      <>
        <Blok p={[0, 1.0, -1.35 - schot * 0.4]} s={[0.4 * (1 - schot) + 0.1, 0.4 * (1 - schot) + 0.1, 0.5]} c="#FFD27A" emissive="#FF9A2A" />
        {[0, 1, 2].map((i) => (
          <Blok key={i} p={[i * 0.2 - 0.2, 1.1 + schot * (0.6 + i * 0.3), -1.6 - schot * (1 + i * 0.5)]} s={[0.5 + schot, 0.5 + schot, 0.5 + schot]} c="#D9D2C4" rough={1} r={[i, i * 2, 0]} />
        ))}
        <pointLight position={[0, 1.2, -1.6]} intensity={(1 - schot) * 12} distance={8} color="#FFB060" />
      </>
    )}
  </group>
);

export const Piramide = ({ position, h = 14, kleur = '#D9B57A' }: { position: V3; h?: number; kleur?: string }) => (
  <mesh position={[position[0], position[1] + h / 2, position[2]]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
    <coneGeometry args={[h * 1.1, h, 4]} />
    <meshStandardMaterial color={kleur} roughness={0.95} flatShading />
  </mesh>
);

/** Besneeuwde bergtop (kegel met een iets grotere witte kap, zodat de vlakken niet samenvallen). */
export const Berg = ({ position, h = 20, r = 14, kleur = '#7A7C82' }: { position: V3; h?: number; r?: number; kleur?: string }) => (
  <group position={position}>
    <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
      <coneGeometry args={[r, h, 7]} />
      <meshStandardMaterial color={kleur} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, h - h * 0.2, 0]}>
      <coneGeometry args={[r * 0.42, h * 0.42, 7]} />
      <meshStandardMaterial color="#F4F6F8" roughness={0.9} flatShading />
    </mesh>
  </group>
);

/** Laag-poly rots (eiland, klif). */
export const Rots = ({ position, schaal = [1, 1, 1], kleur = '#8A7A66', rotation }: { position: V3; schaal?: V3; kleur?: string; rotation?: V3 }) => (
  <mesh position={position} scale={schaal} rotation={rotation} castShadow receiveShadow>
    <dodecahedronGeometry args={[1, 0]} />
    <meshStandardMaterial color={kleur} roughness={1} flatShading />
  </mesh>
);

/** Russische kerk met uikoepel (voor Moskou). */
export const Koepelkerk = ({ position, h = 6, kleur = '#E9DFCC', koepel = '#3E7A5A' }: { position: V3; h?: number; kleur?: string; koepel?: string }) => (
  <group position={position}>
    <Blok p={[0, h / 2, 0]} s={[2.2, h, 2.2]} c={kleur} />
    <mesh position={[0, h + 0.9, 0]} scale={[1, 1.25, 1]} castShadow>
      <sphereGeometry args={[1.05, 10, 8]} />
      <meshStandardMaterial color={koepel} roughness={0.5} metalness={0.2} flatShading />
    </mesh>
    <mesh position={[0, h + 2.4, 0]}>
      <coneGeometry args={[0.35, 1.2, 8]} />
      <meshStandardMaterial color={koepel} roughness={0.5} flatShading />
    </mesh>
    <Blok p={[0, h + 3.2, 0]} s={[0.06, 0.6, 0.06]} c="#D8B54E" metal={0.6} rough={0.3} />
  </group>
);

/** Vlammen met licht, flakkerend op t. */
export const Vuur = ({ position, t = 0, grootte = 1 }: { position: V3; t?: number; grootte?: number }) => (
  <group position={position} scale={grootte}>
    {[0, 1, 2, 3, 4].map((i) => {
      const f = 1 + Math.sin(t * 11 + i * 2.1) * 0.25;
      return <Blok key={i} p={[(i - 2) * 0.35, 0.5 * f, Math.sin(i) * 0.3]} s={[0.4, 1.0 * f, 0.4]} c={i % 2 ? '#FFB347' : '#FF7A2A'} emissive={i % 2 ? '#FF9A2A' : '#FF5A1A'} />;
    })}
    <pointLight position={[0, 1.5, 0]} intensity={10} distance={18} decay={1.4} color="#FF8A3A" />
  </group>
);

/** Rookpluim van langzaam stijgende grijze blokken. */
export const Rook = ({ position, t = 0, kleur = '#5A524A' }: { position: V3; t?: number; kleur?: string }) => (
  <group position={position}>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const y = ((t * 0.8 + i * 1.3) % 8);
      const s = 1 + y * 0.4;
      return <Blok key={i} p={[Math.sin(i * 2 + t * 0.3) * 0.6, y + 1, 0]} s={[s, s, s]} c={kleur} rough={1} r={[i, i * 0.7, 0]} />;
    })}
  </group>
);

/** Vallende sneeuw of regen rond de camera. */
export const Neerslag = ({ t = 0, n = 140, regen = false, midden = [0, 0, 0] as V3, breed = 14 }: { t?: number; n?: number; regen?: boolean; midden?: V3; breed?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const x = ((i * 7.37) % breed) - breed / 2;
      const z = ((i * 3.91) % breed) - breed / 2;
      const snel = regen ? 9 : 0.9;
      const y = 8 - ((t * snel + i * 0.53) % 8);
      const dw = regen ? 0 : Math.sin(t * 1.3 + i) * 0.3;
      return (
        <Blok
          key={i}
          p={[midden[0] + x + dw, midden[1] + y, midden[2] + z]}
          s={regen ? [0.015, 0.45, 0.015] : [0.07, 0.07, 0.07]}
          c={regen ? '#A8B8C8' : '#FFFFFF'}
          rough={0.6}
        />
      );
    })}
  </>
);

/** Gotisch schip (Notre-Dame): hoge zuilen, rood tapijt, licht van boven. */
export const Kathedraal = ({ lengte = 6 }: { lengte?: number }) => (
  <group>
    <Blok p={[0, -0.05, -4]} s={[16, 0.1, 30]} c="#BFB29A" rough={0.6} />
    <Blok p={[0, 0.01, -4]} s={[2.2, 0.02, 30]} c="#8E1F2A" rough={0.9} />
    {Array.from({ length: lengte }, (_, i) =>
      [-1, 1].map((k) => <Zuil key={`${i}${k}`} position={[k * 4, 0, 3 - i * 3]} h={12} kleur="#D8CDB8" />),
    )}
    <Blok p={[0, 6, -15]} s={[14, 12, 0.5]} c="#CFC3AC" />
    {/* roosvenster */}
    <mesh position={[0, 10, -14.7]}>
      <circleGeometry args={[1.5, 16]} />
      <meshBasicMaterial color="#7A9AD8" />
    </mesh>
    <mesh position={[0, 10, -14.68]}>
      <ringGeometry args={[0.7, 0.9, 16]} />
      <meshBasicMaterial color="#D86A5A" />
    </mesh>
  </group>
);
