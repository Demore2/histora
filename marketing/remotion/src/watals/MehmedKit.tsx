import { Blok, type Kleding, type V3 } from './Figuur';

/**
 * Bouwstenen voor "What if you were Mehmed II?": zijn kleding (rode kaftan, zoals op Bellini's portret van 1480),
 * de grote witte tulband met rode top, de landmuren van Constantinopel, het kanon van Orban, de koepelstad,
 * Rumeli Hisarı, de os, de rolstammen voor de schepen en een schildersezel.
 */

export const MEHMED: Kleding = { huid: '#D6A47A', haar: '#1E1610', tuniek: '#9E1F25', rok: '#9E1F25', benen: '#7A1620', schoenen: '#E0B04E', cape: '#5E1A1E', riem: '#D8A945' };
export const MEHMED_KIND: Kleding = { ...MEHMED, cape: undefined };
export const MURAD: Kleding = { huid: '#C9966C', haar: '#9A948A', tuniek: '#2E5A3A', rok: '#2E5A3A', benen: '#1E3A26', schoenen: '#B8912F', cape: '#1E3A26', riem: '#D8A945' };
export const JANITSAAR = { kleur: '#A8322B', schild: '#E2D6BC' };
export const BYZANTIJN = { kleur: '#6B2D5C', schild: '#D8A945' };
export const SCHILDER: Kleding = { huid: '#E2B48E', haar: '#5A3A24', tuniek: '#1E1A18', rok: '#1E1A18', schoenen: '#2A211B', riem: '#5A3A24' };

/** De Ottomaanse tulband (kavuk): hoog, rond en wit, met een rode kap bovenop. Via `hoofdExtra` (oorsprong = hals). */
export const Kavuk = ({ kap = '#B3312B' }: { kap?: string }) => (
  <>
    <Blok p={[0, 0.74, -0.01]} s={[0.78, 0.22, 0.72]} c="#F4F0E6" rough={0.9} />
    <Blok p={[0, 0.94, -0.01]} s={[0.84, 0.22, 0.78]} c="#F4F0E6" r={[0, 0.4, 0]} rough={0.9} />
    <Blok p={[0, 1.13, -0.01]} s={[0.74, 0.2, 0.7]} c="#ECE6D8" r={[0, -0.3, 0]} rough={0.9} />
    <Blok p={[0, 1.29, -0.01]} s={[0.5, 0.16, 0.48]} c="#F4F0E6" r={[0, 0.2, 0]} rough={0.9} />
    <Blok p={[0, 1.42, -0.01]} s={[0.26, 0.14, 0.26]} c={kap} rough={0.7} />
  </>
);

/** Byzantijnse kroon (voor de keizer op de muur). */
export const Keizerskroon = () => (
  <>
    <Blok p={[0, 0.76, 0]} s={[0.66, 0.2, 0.6]} c="#D8A945" rough={0.3} metal={0.8} />
    <Blok p={[0, 0.9, 0]} s={[0.5, 0.12, 0.44]} c="#D8A945" rough={0.3} metal={0.8} />
    <Blok p={[0, 0.78, 0.31]} s={[0.1, 0.1, 0.02]} c="#B3312B" rough={0.2} />
  </>
);

/** Eén stuk landmuur: muur met kantelen en vierkante torens, langs x, voorkant naar +z. */
export const Stadsmuur = ({ position, lengte = 40, h = 5, torens = 5, kleur = '#C9B392', schade = -1 }: { position: V3; lengte?: number; h?: number; torens?: number; kleur?: string; schade?: number }) => {
  const kantelen = Math.floor(lengte / 0.9);
  return (
    <group position={position}>
      <Blok p={[0, h / 2, 0]} s={[lengte, h, 1.6]} c={kleur} rough={0.95} />
      {/* lagen baksteen: dunne rode banden zoals de Theodosiaanse muur */}
      {[0.3, 0.6].map((f) => <Blok key={f} p={[0, h * f, 0.82]} s={[lengte, 0.18, 0.03]} c="#A0583A" rough={0.95} />)}
      {Array.from({ length: kantelen }, (_, i) => {
        const x = -lengte / 2 + 0.45 + i * 0.9;
        if (schade >= 0 && Math.abs(x - schade) < 2.2) return null;
        return <Blok key={i} p={[x, h + 0.3, 0.55]} s={[0.5, 0.6, 0.4]} c={kleur} rough={0.95} />;
      })}
      {Array.from({ length: torens }, (_, i) => {
        const x = -lengte / 2 + (lengte / (torens - 1)) * i;
        return (
          <group key={i} position={[x, 0, 0.3]}>
            <Blok p={[0, (h + 2.5) / 2, 0]} s={[3, h + 2.5, 3]} c={kleur} rough={0.95} />
            <Blok p={[0, (h + 2.5) * 0.45, 1.52]} s={[3, 0.2, 0.03]} c="#A0583A" rough={0.95} />
            {[-1.1, 0, 1.1].map((dx) => <Blok key={dx} p={[dx, h + 2.85, 1.25]} s={[0.55, 0.7, 0.45]} c={kleur} rough={0.95} />)}
            <Blok p={[0, h * 0.7, 1.52]} s={[0.35, 0.7, 0.03]} c="#3A2A20" />
          </group>
        );
      })}
      {schade >= 0 && (
        <>
          <Blok p={[schade, h - 0.8, 0.2]} s={[3.6, 1.8, 2.0]} c="#2A2018" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Blok key={i} p={[schade - 1.6 + i * 0.65, 0.3 + (i % 2) * 0.25, 1.6 + (i % 3) * 0.4]} s={[0.7, 0.5, 0.6]} c={kleur} r={[i, i * 1.3, 0]} rough={0.95} />
          ))}
        </>
      )}
    </group>
  );
};

/** De kanonnen van 1453: lange bronzen buis op een houten slede, met lont-flits. */
export const GrootKanon = ({ position, rotation, schot = 0, lengte = 4.4 }: { position: V3; rotation?: V3; schot?: number; lengte?: number }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.3, 0]} s={[1.5, 0.6, lengte + 0.8]} c="#5A3B24" rough={0.9} />
    {[-0.8, 0.8].map((x) => <Blok key={x} p={[x, 0.15, 0]} s={[0.12, 0.3, lengte + 1.2]} c="#3E2A1A" />)}
    <mesh position={[0, 1.15, -0.1]} rotation={[Math.PI / 2 - 0.06, 0, 0]} castShadow>
      <cylinderGeometry args={[0.55, 0.7, lengte, 14]} />
      <meshStandardMaterial color="#9A7A3E" metalness={0.35} roughness={0.4} />
    </mesh>
    {[-1.4, 0, 1.4].map((z) => (
      <mesh key={z} position={[0, 1.15 - z * 0.03, z]} rotation={[Math.PI / 2 - 0.06, 0, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.18, 14]} />
        <meshStandardMaterial color="#7E6230" metalness={0.35} roughness={0.45} />
      </mesh>
    ))}
    <mesh position={[0, 1.28, -lengte / 2 - 0.12]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.36, 0.36, 0.05, 14]} />
      <meshStandardMaterial color="#120E0A" />
    </mesh>
    {schot > 0 && (
      <>
        <Blok p={[0, 1.3, -lengte / 2 - 0.6 - schot * 0.6]} s={[0.9 * (1 - schot) + 0.2, 0.9 * (1 - schot) + 0.2, 0.9]} c="#FFD27A" emissive="#FF9A2A" />
        {[0, 1, 2, 3].map((i) => (
          <Blok key={i} p={[i * 0.35 - 0.5, 1.4 + schot * (0.8 + i * 0.4), -lengte / 2 - 1 - schot * (1.4 + i * 0.6)]} s={[0.8 + schot * 1.4, 0.8 + schot * 1.4, 0.8 + schot * 1.4]} c="#D9D2C4" rough={1} r={[i, i * 2, 0]} />
        ))}
        <pointLight position={[0, 1.6, -lengte / 2 - 1.2]} intensity={(1 - schot) * 20} distance={12} color="#FFB060" />
      </>
    )}
  </group>
);

/** Janitsaar: rode jas, lange witte börk (de hoge vilten muts met slip achter), speer. Weinig blokken, voor legers. */
export const Janitsaar = ({ position, rotation, t = 0, juich = false }: { position: V3; rotation?: V3; t?: number; juich?: boolean }) => {
  const zw = juich ? Math.sin(t * 6 + position[0] * 1.7) * 0.4 : 0;
  return (
    <group position={position} rotation={rotation}>
      <group position={[0, Math.abs(Math.sin(t * 6 + position[0] + position[2])) * 0.04, 0]}>
        <Blok p={[0, 0.45, 0]} s={[0.5, 0.9, 0.3]} c="#E2D6BC" />
        <Blok p={[0, 0.12, 0.02]} s={[0.54, 0.24, 0.34]} c="#C9A040" />
        <Blok p={[0, 1.2, 0]} s={[0.62, 0.85, 0.38]} c="#A8322B" />
        <Blok p={[0, 1.05, 0]} s={[0.64, 0.08, 0.4]} c="#D8A945" />
        <Blok p={[0, 1.9, 0]} s={[0.5, 0.5, 0.46]} c="#C9966C" />
        <Blok p={[0, 2.0, 0.24]} s={[0.4, 0.06, 0.02]} c="#1E1610" />
        <Blok p={[0, 2.38, 0]} s={[0.5, 0.5, 0.48]} c="#F2EEE4" rough={0.9} />
        <Blok p={[0, 2.25, -0.38]} s={[0.4, 0.7, 0.12]} c="#F2EEE4" r={[0.35, 0, 0]} rough={0.9} />
        <Blok p={[0, 2.18, 0.26]} s={[0.12, 0.2, 0.04]} c="#D8A945" metal={0.6} rough={0.3} />
        <group position={[-0.38, 1.1, 0.05]} rotation={[zw, 0, 0]}>
          <Blok p={[0, 0.6, 0]} s={[0.05, 2.6, 0.05]} c="#5A3B24" />
          <Blok p={[0, 1.95, 0]} s={[0.07, 0.25, 0.04]} c="#C9CDD2" metal={0.9} rough={0.2} />
        </group>
      </group>
    </group>
  );
};

export const Janitsaren = ({ rijen = 3, kolommen = 8, afstand = 1.1, position = [0, 0, 0], rotation, t = 0, juich = false }: { rijen?: number; kolommen?: number; afstand?: number; position?: V3; rotation?: V3; t?: number; juich?: boolean }) => (
  <group position={position} rotation={rotation}>
    {Array.from({ length: rijen }, (_, r) =>
      Array.from({ length: kolommen }, (_, c) => (
        <Janitsaar key={`${r}-${c}`} position={[(c - (kolommen - 1) / 2) * afstand + (r % 2) * 0.3, 0, r * afstand * 1.2]} t={t} juich={juich} />
      )),
    )}
  </group>
);

/** Een os (voor het kanon gespannen). Kijkt naar -z, net als het paard. */
export const Os = ({ position, rotation, t = 0, kleur = '#7A5A3E' }: { position: V3; rotation?: V3; t?: number; kleur?: string }) => {
  const stap = Math.sin(t * 4 + position[0]) * 0.3;
  return (
    <group position={position} rotation={rotation}>
      <Blok p={[0, 1.15, 0]} s={[1.0, 0.95, 2.0]} c={kleur} />
      <Blok p={[0, 1.3, -1.25]} s={[0.6, 0.6, 0.65]} c={kleur} />
      <Blok p={[0, 1.18, -1.6]} s={[0.46, 0.34, 0.12]} c="#3A2A20" />
      {[-1, 1].map((k) => <Blok key={k} p={[k * 0.42, 1.68, -1.25]} s={[0.36, 0.08, 0.08]} r={[0, 0, k * -0.5]} c="#E9DFC8" />)}
      <Blok p={[0, 1.66, -0.75]} s={[1.4, 0.12, 0.12]} c="#5A3B24" />
      {[[-0.32, -0.7, stap], [0.32, -0.7, -stap], [-0.32, 0.7, -stap], [0.32, 0.7, stap]].map(([x, z, r], i) => (
        <group key={i} position={[x, 0.75, z]} rotation={[r, 0, 0]}>
          <Blok p={[0, -0.38, 0]} s={[0.24, 0.76, 0.26]} c={kleur} />
        </group>
      ))}
    </group>
  );
};

/** Grote koepelkerk/stad (Constantinopel, zonder minaretten zoals in 1453). */
export const Koepelgebouw = ({ position, schaal = 1, kleur = '#D9C4A0', koepel = '#8E9AA0' }: { position: V3; schaal?: number; kleur?: string; koepel?: string }) => (
  <group position={position} scale={[schaal, schaal, schaal]}>
    <Blok p={[0, 3, 0]} s={[12, 6, 12]} c={kleur} rough={0.9} />
    <Blok p={[0, 7, 0]} s={[8, 2, 8]} c={kleur} rough={0.9} />
    {[-1, 1].map((k) => (
      <mesh key={k} position={[0, 6, k * 4.6]} castShadow>
        <sphereGeometry args={[3.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={koepel} roughness={0.55} metalness={0.15} flatShading />
      </mesh>
    ))}
    <mesh position={[0, 8, 0]} scale={[1, 0.75, 1]} castShadow>
      <sphereGeometry args={[4.6, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={koepel} roughness={0.55} metalness={0.15} flatShading />
    </mesh>
    {Array.from({ length: 10 }, (_, i) => <Blok key={i} p={[-4.5 + i, 8.4, 4.02]} s={[0.3, 0.6, 0.04]} c="#3A2A20" />)}
  </group>
);

/** Stadswijk: blokjes huizen met rode daken. */
export const Huizen = ({ position, n = 14, breed = 30, diep = 10, zaad = 1 }: { position: V3; n?: number; breed?: number; diep?: number; zaad?: number }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => {
      const r = (k: number) => (Math.sin(i * 12.9898 + zaad * 78.233 + k * 3.1) * 43758.5453) % 1;
      const x = (Math.abs(r(1)) - 0.5) * breed;
      const z = (Math.abs(r(2)) - 0.5) * diep;
      const h = 1.6 + Math.abs(r(3)) * 2.2;
      const b = 1.8 + Math.abs(r(4)) * 1.6;
      return (
        <group key={i} position={[x, 0, z]}>
          <Blok p={[0, h / 2, 0]} s={[b, h, b]} c={i % 3 ? '#E6D8BE' : '#D9C4A0'} rough={0.95} />
          <Blok p={[0, h + 0.15, 0]} s={[b + 0.2, 0.3, b + 0.2]} c="#A8502E" rough={0.9} />
        </group>
      );
    })}
  </group>
);

/** Rumeli Hisarı: drie zware ronde torens met een muur ertussen. */
export const Burcht = ({ position, groei = 1, kleur = '#BDAE96' }: { position: V3; groei?: number; kleur?: string }) => (
  <group position={position}>
    {([[-6, 0, 2.6, 10], [6, -1, 2.4, 9], [0, -7, 2.8, 12]] as [number, number, number, number][]).map(([x, z, r, h], i) => {
      const hh = h * groei;
      return (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, hh / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[r, r * 1.08, hh, 14]} />
            <meshStandardMaterial color={kleur} roughness={0.95} flatShading />
          </mesh>
          {groei > 0.95 && (
            <mesh position={[0, hh + 1.1, 0]} castShadow>
              <coneGeometry args={[r * 1.12, 2.2, 14]} />
              <meshStandardMaterial color="#6E5A48" roughness={0.8} flatShading />
            </mesh>
          )}
        </group>
      );
    })}
    <Blok p={[0, 3 * groei, 0]} s={[12, 6 * groei, 1.2]} c={kleur} rough={0.95} />
    <Blok p={[-3, 3 * groei, -3.5]} s={[1.2, 6 * groei, 7]} c={kleur} r={[0, -0.5, 0]} rough={0.95} />
    <Blok p={[3, 3 * groei, -3.5]} s={[1.2, 6 * groei, 7]} c={kleur} r={[0, 0.5, 0]} rough={0.95} />
  </group>
);

/** Ingevette boomstammen waarover de schepen gesleept worden (langs z). */
export const Rolstammen = ({ position, n = 9, afstand = 1.4, rol = 0 }: { position: V3; n?: number; afstand?: number; rol?: number }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => (
      <mesh key={i} position={[0, 0.22, i * afstand]} rotation={[rol, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 3.6, 8]} />
        <meshStandardMaterial color={i % 2 ? '#8A6440' : '#7A5638'} roughness={0.7} flatShading />
      </mesh>
    ))}
  </group>
);

/** Schildersezel met doek; `klaar` 0..1 schildert het portret erop (rode kaftan, witte tulband). */
export const Ezel = ({ position, rotation, klaar = 1 }: { position: V3; rotation?: V3; klaar?: number }) => (
  <group position={position} rotation={rotation}>
    {[-0.5, 0.5].map((x) => <Blok key={x} p={[x, 1.2, 0]} s={[0.08, 2.4, 0.08]} c="#6B4A2E" r={[0, 0, x * -0.12]} />)}
    <Blok p={[0, 1.2, -0.45]} s={[0.08, 2.4, 0.08]} c="#6B4A2E" r={[0.3, 0, 0]} />
    <Blok p={[0, 0.95, 0.06]} s={[1.3, 0.08, 0.16]} c="#6B4A2E" />
    <Blok p={[0, 1.65, 0.1]} s={[1.2, 1.3, 0.06]} c="#8A6A3A" />
    <Blok p={[0, 1.65, 0.14]} s={[1.06, 1.16, 0.02]} c="#E8DCC2" rough={1} />
    {klaar > 0.15 && <Blok p={[0, 1.65, 0.152]} s={[1.06, 1.16, 0.01]} c="#2A2420" rough={1} />}
    {klaar > 0.35 && <Blok p={[0, 1.3, 0.162]} s={[0.6, 0.45, 0.01]} c="#9E1F25" rough={1} />}
    {klaar > 0.55 && <Blok p={[0, 1.7, 0.162]} s={[0.26, 0.32, 0.01]} c="#D6A47A" rough={1} />}
    {klaar > 0.7 && <Blok p={[0, 1.6, 0.17]} s={[0.24, 0.12, 0.01]} c="#1E1610" rough={1} />}
    {klaar > 0.85 && <Blok p={[0, 1.98, 0.17]} s={[0.4, 0.3, 0.01]} c="#F4F0E6" rough={1} />}
    {/* boog boven de figuur, zoals op het portret van Bellini */}
    {klaar > 0.95 && <Blok p={[0, 2.18, 0.17]} s={[0.9, 0.06, 0.01]} c="#D8A945" rough={0.5} />}
  </group>
);
