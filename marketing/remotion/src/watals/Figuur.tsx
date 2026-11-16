import type { ReactNode } from 'react';

/**
 * Eén blokkerig figuur voor de "What if you were…"-reeks. Iedereen heeft hetzelfde lijf;
 * een personage herken je aan twee of drie kenmerken (kleding, haar, hoofddeksel).
 * Oorsprong = tussen de voeten, y omhoog, ~2,4 eenheden hoog. Gezicht kijkt naar +z.
 */

export type V3 = [number, number, number];

/** Materiaal dat alles overschrijft: voor standbeelden (goud/brons) en silhouetten. */
export type Overschrijf = { kleur: string; metaal?: number; ruw?: number } | undefined;

export const Blok = ({
  p,
  s,
  c,
  r,
  rough = 0.85,
  metal = 0,
  o,
  emissive,
}: {
  p: V3;
  s: V3;
  c: string;
  r?: V3;
  rough?: number;
  metal?: number;
  o?: Overschrijf;
  emissive?: string;
}) => (
  <mesh position={p} rotation={r} castShadow receiveShadow>
    <boxGeometry args={s} />
    <meshStandardMaterial
      color={o ? o.kleur : c}
      roughness={o ? (o.ruw ?? 0.35) : rough}
      metalness={o ? (o.metaal ?? 0.3) : metal}
      emissive={emissive}
      emissiveIntensity={emissive ? 1.5 : 0}
    />
  </mesh>
);

export const GOUD: Overschrijf = { kleur: '#E0B04E', metaal: 0.35, ruw: 0.3 };
export const BRONS: Overschrijf = { kleur: '#7E6440', metaal: 0.3, ruw: 0.45 };

export type Kleding = {
  huid: string;
  haar: string;
  tuniek: string;
  rok?: string;
  rand?: string; // verticale strepen (clavus)
  benen?: string; // broek; zonder = blote benen
  schoenen: string;
  cape?: string;
  riem?: string;
  borst?: string; // borstpantser over de tuniek
  laarzen?: string; // kaplaarzen tot onder de knie
};

/** Arm: schouder- en elleboogrotatie. Elleboog: y = draai (naar binnen), x = buigen naar voren. */
export type ArmPose = { schouder?: V3; elleboog?: [number, number] };

export type Pose = {
  armL?: ArmPose;
  armR?: ArmPose;
  hoofd?: V3;
  mond?: 'dicht' | 'open' | 'lach';
  wenk?: number; // wenkbrauwen omlaag (boos), 0..1; negatief = verdrietig
  traan?: number; // 0..1, traan die over de wang loopt
  ogen?: 'open' | 'dicht';
};

export const ARMEN_GEKRUIST: Pick<Pose, 'armL' | 'armR'> = {
  armL: { schouder: [-0.18, 0, 0.12], elleboog: [1.25, -1.45] },
  armR: { schouder: [-0.18, 0, -0.12], elleboog: [-1.25, -1.55] },
};
export const ARMEN_LOS: Pick<Pose, 'armL' | 'armR'> = {
  armL: { schouder: [0, 0, 0.08], elleboog: [0, -0.15] },
  armR: { schouder: [0, 0, -0.08], elleboog: [0, -0.15] },
};
export const wijs = (op = 1.4): ArmPose => ({ schouder: [-op, 0, -0.1], elleboog: [0, -0.1] });
export const omhoog = (): ArmPose => ({ schouder: [-2.9, 0, -0.15], elleboog: [0, -0.2] });

export type Haar = 'kort' | 'bob' | 'lang' | 'kaal' | 'grijs';
export type Hoofddeksel = 'krans' | 'bandana' | 'helm' | 'hoofdband' | 'kap' | 'steek' | null;

type Props = {
  kleding: Kleding;
  pose?: Pose;
  haar?: Haar;
  hoofddeksel?: Hoofddeksel;
  baard?: boolean;
  snor?: boolean;
  position?: V3;
  rotation?: V3;
  scale?: number;
  o?: Overschrijf;
  inHand?: ReactNode; // in de rechterhand (bv. zwaard, rol)
  extra?: ReactNode;
};

const Arm = ({ x, pose, mouw, huid, o, inHand }: { x: number; pose: ArmPose; mouw: string; huid: string; o?: Overschrijf; inHand?: ReactNode }) => {
  const [draai, buig] = pose.elleboog ?? [0, 0];
  return (
    <group position={[x, 1.62, 0]} rotation={pose.schouder ?? [0, 0, 0]}>
      <Blok p={[0, -0.17, 0]} s={[0.22, 0.38, 0.24]} c={mouw} o={o} />
      <group position={[0, -0.34, 0]} rotation={[0, draai, 0]}>
        <group rotation={[buig, 0, 0]}>
          <Blok p={[0, -0.17, 0]} s={[0.19, 0.34, 0.21]} c={huid} o={o} />
          <Blok p={[0, -0.39, 0.01]} s={[0.18, 0.14, 0.2]} c={huid} o={o} />
          {inHand && <group position={[0, -0.4, 0.02]}>{inHand}</group>}
        </group>
      </group>
    </group>
  );
};

const HaarBlokken = ({ soort, kleur, o }: { soort: Haar; kleur: string; o?: Overschrijf }) => {
  if (soort === 'kaal') return null;
  const k = soort === 'grijs' ? '#B9B4AA' : kleur;
  return (
    <>
      <Blok p={[0, 0.71, -0.02]} s={[0.66, 0.14, 0.62]} c={k} o={o} />
      <Blok p={[0, 0.5, -0.27]} s={[0.66, soort === 'kort' || soort === 'grijs' ? 0.42 : 0.7, 0.1]} c={k} o={o} />
      <Blok p={[-0.32, 0.56, -0.05]} s={[0.05, 0.22, 0.5]} c={k} o={o} />
      <Blok p={[0.32, 0.56, -0.05]} s={[0.05, 0.22, 0.5]} c={k} o={o} />
      {soort !== 'grijs' && <Blok p={[0, 0.63, 0.27]} s={[0.62, 0.07, 0.06]} c={k} o={o} />}
      {(soort === 'bob' || soort === 'lang') && (
        <>
          <Blok p={[-0.34, soort === 'lang' ? 0.2 : 0.34, -0.02]} s={[0.08, soort === 'lang' ? 0.8 : 0.5, 0.56]} c={k} o={o} />
          <Blok p={[0.34, soort === 'lang' ? 0.2 : 0.34, -0.02]} s={[0.08, soort === 'lang' ? 0.8 : 0.5, 0.56]} c={k} o={o} />
          <Blok p={[0, soort === 'lang' ? 0.15 : 0.3, -0.3]} s={[0.7, soort === 'lang' ? 0.8 : 0.5, 0.08]} c={k} o={o} />
        </>
      )}
      {soort === 'bob' && <Blok p={[0, 0.6, 0.29]} s={[0.62, 0.12, 0.04]} c={k} o={o} />}
    </>
  );
};

export const Figuur = ({
  kleding: k,
  pose = {},
  haar = 'kort',
  hoofddeksel = null,
  baard = false,
  snor = false,
  position,
  rotation,
  scale = 1,
  o,
  inHand,
  extra,
}: Props) => {
  const rok = k.rok ?? k.tuniek;
  const benen = k.benen ?? k.huid;
  const wenk = pose.wenk ?? 0;
  const armen = { ...ARMEN_LOS, ...pose };
  const oogDicht = pose.ogen === 'dicht';
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {[-0.14, 0.14].map((x) => (
        <group key={x}>
          <Blok p={[x, 0.42, 0]} s={[0.23, 0.68, 0.25]} c={benen} o={o} />
          <Blok p={[x, 0.06, 0.03]} s={[0.25, 0.12, 0.31]} c={k.schoenen} o={o} />
          {k.laarzen && <Blok p={[x, 0.27, 0]} s={[0.27, 0.42, 0.29]} c={k.laarzen} rough={0.45} o={o} />}
        </group>
      ))}
      <Blok p={[0, 0.86, 0]} s={[0.64, 0.42, 0.4]} c={rok} o={o} />
      <Blok p={[0, 0.66, 0]} s={[0.66, 0.05, 0.42]} c={rok} o={o} />
      <Blok p={[0, 1.33, 0]} s={[0.62, 0.62, 0.38]} c={k.tuniek} o={o} />
      {k.borst && <Blok p={[0, 1.36, 0.01]} s={[0.7, 0.58, 0.46]} c={k.borst} rough={0.4} metal={0.6} o={o} />}
      {k.riem && <Blok p={[0, 1.04, 0]} s={[0.66, 0.08, 0.43]} c={k.riem} o={o} />}
      {k.rand && !k.borst && (
        <>
          <Blok p={[-0.15, 1.12, 0.205]} s={[0.07, 1.0, 0.03]} c={k.rand} o={o} />
          <Blok p={[0.15, 1.12, 0.205]} s={[0.07, 1.0, 0.03]} c={k.rand} o={o} />
        </>
      )}
      {k.cape && (
        <>
          <Blok p={[0, 1.0, -0.25]} s={[0.72, 1.2, 0.06]} c={k.cape} r={[0.07, 0, 0]} o={o} />
          <Blok p={[-0.34, 1.56, -0.02]} s={[0.1, 0.17, 0.46]} c={k.cape} o={o} />
          <Blok p={[-0.34, 1.6, 0.2]} s={[0.12, 0.12, 0.04]} c="#C9A646" metal={0.8} rough={0.3} o={o} />
        </>
      )}
      <Arm x={-0.42} pose={armen.armL!} mouw={k.tuniek} huid={k.huid} o={o} />
      <Arm x={0.42} pose={armen.armR!} mouw={k.tuniek} huid={k.huid} o={o} inHand={inHand} />
      <group position={[0, 1.66, 0]} rotation={pose.hoofd}>
        <Blok p={[0, 0.06, 0]} s={[0.2, 0.12, 0.2]} c={k.huid} o={o} />
        <Blok p={[0, 0.38, 0]} s={[0.62, 0.6, 0.56]} c={k.huid} o={o} />
        {/* oren */}
        <Blok p={[-0.32, 0.38, 0]} s={[0.05, 0.14, 0.1]} c={k.huid} o={o} />
        <Blok p={[0.32, 0.38, 0]} s={[0.05, 0.14, 0.1]} c={k.huid} o={o} />
        <HaarBlokken soort={haar} kleur={k.haar} o={o} />
        {[-0.14, 0.14].map((x) => (
          <group key={x} position={[x, 0.42, 0.285]}>
            {oogDicht || o ? (
              <Blok p={[0, -0.02, 0]} s={[0.13, 0.03, 0.02]} c="#2A1A12" o={o} />
            ) : (
              <>
                <Blok p={[0, 0, 0]} s={[0.13, 0.15, 0.02]} c="#F4EFE6" rough={0.5} />
                <Blok p={[x > 0 ? -0.015 : 0.015, -0.01, 0.012]} s={[0.075, 0.1, 0.01]} c="#151210" rough={0.3} />
                <Blok p={[x > 0 ? -0.03 : 0, 0.02, 0.018]} s={[0.025, 0.025, 0.005]} c="#FFFFFF" rough={0.2} />
              </>
            )}
            <Blok
              p={[0, 0.12 - Math.abs(wenk) * 0.03, 0.01]}
              s={[0.17, 0.045, 0.03]}
              c={haar === 'grijs' ? '#8E887E' : k.haar}
              r={[0, 0, (x > 0 ? 1 : -1) * wenk * 0.35]}
              o={o}
            />
          </group>
        ))}
        <Blok p={[0, 0.31, 0.315]} s={[0.1, 0.15, 0.09]} c={k.huid} o={o} />
        {pose.mond === 'lach' ? (
          <>
            <Blok p={[0, 0.16, 0.285]} s={[0.16, 0.03, 0.02]} c="#3A1E18" o={o} />
            <Blok p={[-0.09, 0.18, 0.285]} s={[0.03, 0.04, 0.02]} c="#3A1E18" o={o} />
            <Blok p={[0.09, 0.18, 0.285]} s={[0.03, 0.04, 0.02]} c="#3A1E18" o={o} />
          </>
        ) : (
          <Blok p={[0, 0.17, 0.285]} s={pose.mond === 'open' ? [0.14, 0.09, 0.02] : [0.15, 0.03, 0.02]} c="#3A1E18" o={o} />
        )}
        {pose.traan !== undefined && pose.traan > 0 && (
          <Blok p={[0.17, 0.34 - pose.traan * 0.16, 0.29]} s={[0.035, 0.06, 0.02]} c="#BFE6FF" rough={0.05} metal={0.2} />
        )}
        {(baard || snor) && (
          <Blok p={[0, 0.22, 0.29]} s={[0.3, 0.05, 0.03]} c={haar === 'grijs' ? '#B9B4AA' : k.haar} o={o} />
        )}
        {snor && (
          <>
            <Blok p={[-0.15, 0.15, 0.29]} s={[0.05, 0.14, 0.03]} c={k.haar} o={o} />
            <Blok p={[0.15, 0.15, 0.29]} s={[0.05, 0.14, 0.03]} c={k.haar} o={o} />
          </>
        )}
        {baard && (
          <>
            <Blok p={[0, 0.12, 0.27]} s={[0.6, 0.2, 0.06]} c={haar === 'grijs' ? '#B9B4AA' : k.haar} o={o} />
            <Blok p={[0, 0.03, 0.22]} s={[0.4, 0.12, 0.1]} c={haar === 'grijs' ? '#B9B4AA' : k.haar} o={o} />
            <Blok p={[-0.29, 0.25, 0.1]} s={[0.05, 0.3, 0.36]} c={haar === 'grijs' ? '#B9B4AA' : k.haar} o={o} />
            <Blok p={[0.29, 0.25, 0.1]} s={[0.05, 0.3, 0.36]} c={haar === 'grijs' ? '#B9B4AA' : k.haar} o={o} />
          </>
        )}
        {hoofddeksel === 'krans' &&
          Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <Blok
                key={i}
                p={[Math.sin(a) * 0.35, 0.67, Math.cos(a) * 0.32]}
                s={[0.12, 0.07, 0.05]}
                c={i % 2 ? '#D8B54E' : '#B8912F'}
                r={[0.5, a, 0]}
                rough={0.3}
                metal={0.8}
                o={o}
              />
            );
          })}
        {hoofddeksel === 'bandana' && (
          <>
            <Blok p={[0, 0.7, 0]} s={[0.68, 0.2, 0.62]} c="#B3312B" o={o} />
            <Blok p={[0, 0.66, -0.35]} s={[0.16, 0.14, 0.1]} c="#B3312B" o={o} />
            <Blok p={[0.05, 0.52, -0.38]} s={[0.1, 0.22, 0.05]} c="#B3312B" r={[0.2, 0, 0.3]} o={o} />
          </>
        )}
        {hoofddeksel === 'helm' && (
          <>
            <Blok p={[0, 0.72, 0]} s={[0.7, 0.24, 0.64]} c="#8D8A84" rough={0.35} metal={0.8} o={o} />
            <Blok p={[0, 0.92, 0]} s={[0.1, 0.18, 0.5]} c="#A8322B" o={o} />
            <Blok p={[-0.34, 0.45, 0.12]} s={[0.04, 0.3, 0.2]} c="#8D8A84" rough={0.35} metal={0.8} o={o} />
            <Blok p={[0.34, 0.45, 0.12]} s={[0.04, 0.3, 0.2]} c="#8D8A84" rough={0.35} metal={0.8} o={o} />
          </>
        )}
        {hoofddeksel === 'hoofdband' && (
          <>
            <Blok p={[0, 0.62, 0.02]} s={[0.7, 0.07, 0.62]} c="#D8A945" rough={0.3} metal={0.9} o={o} />
            <Blok p={[0, 0.66, 0.33]} s={[0.1, 0.1, 0.03]} c="#2E7D7A" rough={0.2} metal={0.4} o={o} />
          </>
        )}
        {hoofddeksel === 'kap' && <Blok p={[0, 0.62, -0.06]} s={[0.72, 0.32, 0.64]} c={k.cape ?? k.tuniek} o={o} />}
        {hoofddeksel === 'steek' && (
          // Napoleons steek, "en bataille": dwars op het hoofd, punten naar links en rechts
          <>
            <Blok p={[0, 0.8, -0.01]} s={[0.72, 0.12, 0.66]} c="#141210" rough={0.7} o={o} />
            <Blok p={[0, 0.98, -0.02]} s={[0.9, 0.3, 0.3]} c="#141210" rough={0.7} o={o} />
            <Blok p={[0, 1.15, -0.02]} s={[0.56, 0.1, 0.26]} c="#141210" rough={0.7} o={o} />
            {[-1, 1].map((k2) => (
              <Blok key={k2} p={[k2 * 0.52, 1.0, -0.02]} s={[0.28, 0.2, 0.26]} r={[0, 0, k2 * 0.35]} c="#141210" rough={0.7} o={o} />
            ))}
            <Blok p={[-0.28, 1.0, 0.14]} s={[0.12, 0.12, 0.03]} c="#2A4D9A" o={o} />
            <Blok p={[-0.28, 1.0, 0.16]} s={[0.07, 0.07, 0.02]} c="#F2EEE6" o={o} />
            <Blok p={[-0.28, 1.0, 0.18]} s={[0.035, 0.035, 0.02]} c="#B3312B" o={o} />
          </>
        )}
      </group>
      {extra}
    </group>
  );
};

/* ---------- personages ---------- */

export const CAESAR: Kleding = { huid: '#E6B98E', haar: '#3B2A1E', tuniek: '#F1ECE1', rand: '#6B2D5C', schoenen: '#6B4A2E', cape: '#A8322B', riem: '#8C6A3E' };
// Eigenaar: Caesar draagt overal zijn eigen tuniek + rode cape (geen bruin pantser).
export const CAESAR_GENERAAL: Kleding = CAESAR;
export const PIRAAT: Kleding = { huid: '#C98F62', haar: '#2B1E16', tuniek: '#5A4433', benen: '#3D3027', schoenen: '#2A211B', riem: '#2A211B' };
export const LEGIOEN: Kleding = { huid: '#D9A57A', haar: '#3B2A1E', tuniek: '#A8322B', borst: '#8D8A84', schoenen: '#4A3424', riem: '#4A3424' };
export const GALLIËR: Kleding = { huid: '#E2B48E', haar: '#C9A050', tuniek: '#3E6B3A', benen: '#6B5236', schoenen: '#3A2A1C', cape: '#7A3B26', riem: '#3A2A1C' };
export const SENATOR: Kleding = { huid: '#DDB08A', haar: '#4A3A2C', tuniek: '#ECE6D8', rand: '#7A2E4E', schoenen: '#5A4030' };
export const ZIENER: Kleding = { huid: '#C9A07A', haar: '#B9B4AA', tuniek: '#5C5248', schoenen: '#3A2E24', cape: '#3F362E' };
export const CALPURNIA: Kleding = { huid: '#E8BF98', haar: '#3A2418', tuniek: '#7B5BA0', rok: '#6A4A90', schoenen: '#4A3424', cape: '#D9C9E8' };
export const CLEOPATRA: Kleding = { huid: '#C9925F', haar: '#141010', tuniek: '#F2EAD8', rand: '#D8A945', schoenen: '#B8912F', riem: '#D8A945' };
export const POMPEIUS: Kleding = { huid: '#DDB08A', haar: '#6B4A30', tuniek: '#ECE6D8', rand: '#3E4F7A', schoenen: '#5A4030', cape: '#3E4F7A' };

// Napoleon: overal dezelfde blauwe jas met wit vest, witte broek, zwarte laarzen en de steek.
export const NAPOLEON: Kleding = { huid: '#E8C09A', haar: '#3A2A1E', tuniek: '#1F3A6E', rand: '#ECE6D8', benen: '#ECE6D8', schoenen: '#141210', laarzen: '#141210', riem: '#ECE6D8' };
export const NAPOLEON_KROONMANTEL: Kleding = { ...NAPOLEON, cape: '#8E1F2A' };
export const JOSEPHINE: Kleding = { huid: '#EEC9A6', haar: '#2E1E16', tuniek: '#F4EEE2', rok: '#F1E9DA', schoenen: '#D8C9A8', riem: '#C9A646' };
export const PAUS: Kleding = { huid: '#E2B892', haar: '#B9B4AA', tuniek: '#F4F1EA', schoenen: '#9E1F25', cape: '#9E1F25' };
export const AFGEVAARDIGDE: Kleding = { huid: '#DDB08A', haar: '#4A3A2C', tuniek: '#A8322B', rand: '#ECE6D8', schoenen: '#2A211B', benen: '#ECE6D8' };
export const GIDS: Kleding = { huid: '#C98F62', haar: '#3A2A1E', tuniek: '#6B5236', benen: '#4A3A2C', schoenen: '#2A211B', riem: '#2A211B' };
export const SCHOLIER: Kleding = { huid: '#E6BE98', haar: '#6B4A30', tuniek: '#3E4F7A', benen: '#ECE6D8', schoenen: '#2A211B' };

/* ---------- rekwisieten ---------- */

/** Kroon, rechtop (ring horizontaal). Los in de scène plaatsen, niet in de hand. */
export const Kroon = ({ position }: { position?: V3 }) => (
  <group position={position}>
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return (
        <group key={i}>
          <Blok p={[Math.sin(a) * 0.3, 0.12, Math.cos(a) * 0.3]} s={[0.2, 0.14, 0.06]} r={[0, a, 0]} c="#D8B54E" rough={0.3} metal={0.6} />
          {i % 2 === 0 && <Blok p={[Math.sin(a) * 0.3, 0.27, Math.cos(a) * 0.3]} s={[0.07, 0.16, 0.05]} r={[0, a, 0]} c="#E2BE58" rough={0.3} metal={0.6} />}
        </group>
      );
    })}
    <Blok p={[0, 0.12, 0.31]} s={[0.07, 0.07, 0.03]} c="#9E1F25" rough={0.2} />
  </group>
);

export const Verrekijker = () => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <Blok p={[0, 0.12, 0]} s={[0.09, 0.4, 0.09]} c="#3A2A1C" />
    <Blok p={[0, 0.38, 0]} s={[0.12, 0.16, 0.12]} c="#B8912F" metal={0.7} rough={0.3} />
  </group>
);

export const Zwaard = ({ o }: { o?: Overschrijf }) => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <Blok p={[0, 0, 0]} s={[0.07, 0.18, 0.07]} c="#4A3424" o={o} />
    <Blok p={[0, 0.1, 0]} s={[0.24, 0.05, 0.08]} c="#B8912F" metal={0.8} rough={0.3} o={o} />
    <Blok p={[0, 0.5, 0]} s={[0.07, 0.75, 0.025]} c="#C9CDD2" metal={0.9} rough={0.2} o={o} />
  </group>
);

export const Dolk = () => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <Blok p={[0, 0, 0]} s={[0.06, 0.12, 0.06]} c="#3A2A1C" />
    <Blok p={[0, 0.25, 0]} s={[0.06, 0.38, 0.02]} c="#D2D6DB" metal={0.95} rough={0.15} />
  </group>
);

export const Rol = ({ open = 1 }: { open?: number }) => (
  <group rotation={[0, 0, Math.PI / 2]}>
    <Blok p={[0, 0, 0]} s={[0.06, 0.36, 0.06]} c="#8C6A3E" />
    <Blok p={[0, 0, 0.05 + open * 0.2]} s={[0.012, 0.32, open * 0.42]} c="#EFE3C4" rough={0.95} />
    <Blok p={[0.01, 0, 0.12]} s={[0.02, 0.06, 0.06]} c="#9E2A22" />
  </group>
);

/** Phoxy als blokfiguur: oranje vossenkop met oren, witte snuit, ronde bril (blokken), blauwe sjaal. */
export const Phoxy = ({ position, rotation, scale = 1, pose = {} }: { position?: V3; rotation?: V3; scale?: number; pose?: Pose }) => {
  const vacht = '#E4682B';
  const wit = '#FFF1DC';
  const bril = '#4A2F1E';
  const sjaal = '#0EA5E9';
  const armen = { ...ARMEN_LOS, ...pose };
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {[-0.14, 0.14].map((x) => (
        <group key={x}>
          <Blok p={[x, 0.36, 0]} s={[0.23, 0.6, 0.25]} c={vacht} />
          <Blok p={[x, 0.06, 0.04]} s={[0.25, 0.12, 0.31]} c="#3A2418" />
        </group>
      ))}
      <Blok p={[0, 1.08, 0]} s={[0.62, 0.84, 0.4]} c={vacht} />
      <Blok p={[0, 1.02, 0.205]} s={[0.36, 0.56, 0.01]} c={wit} />
      {/* staart */}
      <group position={[0.15, 0.75, -0.25]} rotation={[0.9, 0.3, 0]}>
        <Blok p={[0, -0.2, 0]} s={[0.26, 0.5, 0.26]} c={vacht} />
        <Blok p={[0, -0.5, 0]} s={[0.26, 0.16, 0.26]} c={wit} />
      </group>
      <Arm x={-0.42} pose={armen.armL!} mouw={vacht} huid={vacht} />
      <Arm x={0.42} pose={armen.armR!} mouw={vacht} huid={vacht} />
      {/* sjaal */}
      <Blok p={[0, 1.54, 0]} s={[0.68, 0.14, 0.46]} c={sjaal} />
      <Blok p={[0.18, 1.32, 0.22]} s={[0.14, 0.34, 0.05]} c={sjaal} r={[0, 0, 0.12]} />
      <group position={[0, 1.6, 0]} rotation={pose.hoofd}>
        <Blok p={[0, 0.34, 0]} s={[0.66, 0.56, 0.58]} c={vacht} />
        {/* oren */}
        {[-0.22, 0.22].map((x) => (
          <group key={x} position={[x, 0.68, -0.02]}>
            <Blok p={[0, 0, 0]} s={[0.18, 0.2, 0.12]} c={vacht} />
            <Blok p={[0, 0.14, 0]} s={[0.1, 0.12, 0.1]} c={vacht} />
            <Blok p={[0, 0.02, 0.065]} s={[0.08, 0.12, 0.01]} c="#3A2418" />
          </group>
        ))}
        {/* wangen + snuit */}
        <Blok p={[-0.24, 0.18, 0.28]} s={[0.16, 0.18, 0.04]} c={wit} />
        <Blok p={[0.24, 0.18, 0.28]} s={[0.16, 0.18, 0.04]} c={wit} />
        <Blok p={[0, 0.18, 0.36]} s={[0.3, 0.2, 0.18]} c={wit} />
        <Blok p={[0, 0.25, 0.46]} s={[0.1, 0.08, 0.04]} c="#211612" rough={0.3} />
        <Blok p={[0, 0.12, 0.455]} s={[0.12, 0.025, 0.02]} c="#3A1E18" />
        {/* ogen + bril */}
        {[-0.15, 0.15].map((x) => (
          <group key={x} position={[x, 0.4, 0.3]}>
            <Blok p={[0, 0, 0]} s={[0.1, 0.12, 0.01]} c="#F4EFE6" />
            <Blok p={[0, -0.01, 0.008]} s={[0.06, 0.08, 0.01]} c="#151210" />
            <Blok p={[0, 0.09, 0.02]} s={[0.22, 0.04, 0.02]} c={bril} />
            <Blok p={[0, -0.09, 0.02]} s={[0.22, 0.04, 0.02]} c={bril} />
            <Blok p={[-0.1, 0, 0.02]} s={[0.04, 0.22, 0.02]} c={bril} />
            <Blok p={[0.1, 0, 0.02]} s={[0.04, 0.22, 0.02]} c={bril} />
          </group>
        ))}
        <Blok p={[0, 0.42, 0.32]} s={[0.1, 0.03, 0.02]} c={bril} />
      </group>
    </group>
  );
};
