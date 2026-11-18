import type { ReactNode } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import {
  Avondlicht,
  Berg,
  Binnenlicht,
  Boom,
  Camera,
  Daglicht,
  Fakkel,
  Grond,
  Heuvels,
  Lucht,
  Nachtlicht,
  Rots,
  TekstVlak,
  Zee,
  Zon,
} from '../watals/Decor';
import { Blok, Figuur, type Kleding, type Pose, type V3 } from '../watals/Figuur';
import { ease, FPS, lin, Shot } from './basis';
import { KaarttafelGriek, opGriek, PLAATS, SpeldGriek, type MOStand, type PlaatsNaam } from './KaarttafelGriek';
import { LangTeller, ORANJE, SERIF } from './LangHud';

/**
 * Kit voor "What if you were Leonidas?" (lange video #04): figuren, rekwisieten, cartoon-tekens (zweet, boos-teken,
 * tekstwolk), decors (Sparta, de pas van Thermopylae, de tent van Xerxes, de Hellespont, Delphi) en de Griekse kaart.
 * Regels (scratchboard): niets tussen camera en onderwerp, geen half afgesneden figuren, geen kruisvormen of bloed.
 */

/* ---------------- personages ---------------- */

/** Figuur die leeft: knippert, ademt, beweegt zijn hoofd een beetje. Overal in Leonidas gebruiken. */
export const FiguurL = (p: Parameters<typeof Figuur>[0]) => <Figuur levend {...p} />;

const BRONS_K = '#B8863A';
export const LEONIDAS: Kleding = { huid: '#D9A57A', haar: '#2A1E16', tuniek: '#8E2A22', borst: BRONS_K, schoenen: '#5A3B24', cape: '#B3312B', riem: '#5A3B24' };
export const LEONIDAS_KAMP: Kleding = { ...LEONIDAS, borst: undefined };
export const LEONIDAS_JONG: Kleding = { huid: '#D9A57A', haar: '#2A1E16', tuniek: '#7A5A3A', schoenen: '#C9956A', riem: '#5A4030' };
export const SPARTAAN: Kleding = { ...LEONIDAS, haar: '#3B2A1E' };
export const SPARTAAN2: Kleding = { ...LEONIDAS, haar: '#6B4A30', huid: '#C98F62' };
export const SPARTAAN_BLOOT: Kleding = { ...LEONIDAS, borst: undefined, tuniek: '#D9A57A', cape: '#B3312B' };
export const DIENEKES: Kleding = { ...LEONIDAS, haar: '#4A3424', huid: '#C98F62' };
export const THESPIER: Kleding = { ...LEONIDAS, tuniek: '#2E4E7A', cape: '#3E6FA8', haar: '#4A3424' };
export const GORGO: Kleding = { huid: '#E6B98E', haar: '#1A1210', tuniek: '#5A6E8A', rok: '#4E6280', schoenen: '#6B4A2E', cape: '#E9E2D2', riem: '#C9A646' };
export const GORGO_JONG: Kleding = { ...GORGO, cape: undefined };
export const MOEDER: Kleding = { huid: '#E2B48E', haar: '#3A2418', tuniek: '#8A6A4A', rok: '#7A5A3A', schoenen: '#4A3424', cape: '#D8C9A8' };
export const TWEEDE_VROUW: Kleding = { ...MOEDER, tuniek: '#7B5BA0', rok: '#6A4A90', cape: '#E2D6EE', haar: '#5A3A24' };
export const EFOR: Kleding = { huid: '#D9AE88', haar: '#B9B4AA', tuniek: '#6E5A44', schoenen: '#4A3424', cape: '#8A7A62' };
export const VADER: Kleding = { huid: '#D9A57A', haar: '#5A4434', tuniek: '#8E2A22', schoenen: '#5A3B24', cape: '#A8322B', riem: '#C9A646' };
export const CLEOMENES: Kleding = { huid: '#D9A57A', haar: '#7A6A5A', tuniek: '#6B2D2A', schoenen: '#5A3B24', cape: '#8E2A22', riem: '#C9A646' };
export const DORIEUS: Kleding = { ...CLEOMENES, haar: '#A0522D', tuniek: '#8E2A22', cape: '#B3312B' };
export const XERXES: Kleding = { huid: '#C9925F', haar: '#140E0A', tuniek: '#4E2A6E', rok: '#3E1E5A', rand: '#D8A945', schoenen: '#B8912F', cape: '#7A2E8A', riem: '#D8A945' };
export const DARIUS: Kleding = { ...XERXES, tuniek: '#5A2A5E', cape: '#8A3A6A' };
export const ONSTERFELIJKE: Kleding = { huid: '#B07A4E', haar: '#1A1210', tuniek: '#3E5F9A', borst: '#C9A646', benen: '#4E3A7A', schoenen: '#2A1E16', riem: '#E9DFC8' };
export const BODE: Kleding = { huid: '#C9925F', haar: '#1A1210', tuniek: '#7A3B6E', benen: '#3A2A5A', schoenen: '#2A1E16', riem: '#D8A945' };
export const DEMARATUS: Kleding = { ...SPARTAAN, borst: undefined, tuniek: '#8E2A22', cape: '#5A2A6E' };
export const EPHIALTES: Kleding = { huid: '#C98F62', haar: '#3A2A1E', tuniek: '#8A7A5A', schoenen: '#3A2A1C', cape: '#E8DDC8', riem: '#5A4030' };
export const PYTHIA: Kleding = { huid: '#E6B98E', haar: '#2A1E16', tuniek: '#F2EAD8', rok: '#F2EAD8', schoenen: '#C9A646', cape: '#E2C9A0' };
export const VREEMDE: Kleding = { huid: '#E8C09A', haar: '#6B4A30', tuniek: '#C9A646', rok: '#B8912F', schoenen: '#6B4A2E', cape: '#F2E6C8', riem: '#8A5A32' };
export const VREEMDELING: Kleding = { huid: '#DDB08A', haar: '#3A2A1E', tuniek: '#3E6B8A', schoenen: '#4A3424', cape: '#E9DFCC', riem: '#C9A646' };
export const LERAAR: Kleding = { huid: '#D9A57A', haar: '#4A3A2C', tuniek: '#6E3A2A', schoenen: '#4A3424', cape: '#5A3A2A' };
export const PAUSANIAS: Kleding = { ...LEONIDAS, haar: '#4A3424' };

/** Spartaanse helden: helm (koning: dwarse kam), schild, speer. */
export const Spartaan = ({
  kleding = SPARTAAN,
  koning = false,
  helm = true,
  schild = 'zij',
  schildKleur = '#A8322B',
  speer = true,
  speerVoor = false,
  pose,
  position,
  rotation,
  scale,
  extra,
  o,
}: {
  kleding?: Kleding;
  koning?: boolean;
  helm?: boolean;
  schild?: 'zij' | 'voor' | false;
  schildKleur?: string;
  speer?: boolean;
  speerVoor?: boolean;
  pose?: Pose;
  position?: V3;
  rotation?: V3;
  scale?: number;
  extra?: ReactNode;
  o?: { kleur: string; metaal?: number; ruw?: number };
}) => (
  <FiguurL
    kleding={kleding}
    hoofddeksel={helm ? (koning ? 'korinthDwars' : 'korinth') : null}
    haar={helm ? 'kort' : 'lang'}
    baard
    o={o}
    position={position}
    rotation={rotation}
    scale={scale}
    pose={speerVoor ? { armR: { schouder: [-1.45, 0, -0.05], elleboog: [0, 0] }, ...pose } : pose}
    inHand={speer ? <Speer punt={speerVoor ? 'onder' : 'boven'} o={o} /> : undefined}
    extra={
      <>
        {schild === 'zij' && <group position={[-0.62, 1.15, 0.12]} rotation={[0, -0.25, 0]}><Hoplon kleur={schildKleur} o={o} /></group>}
        {schild === 'voor' && <group position={[-0.12, 1.22, 0.36]} rotation={[0, 0.1, 0]}><Hoplon kleur={schildKleur} o={o} /></group>}
        {extra}
      </>
    }
  />
);

/* ---------------- rekwisieten ---------------- */

/** Rond Grieks schild (hoplon), bronzen rand, rood vlak met een Λ (Lacedaemon). Vlak naar +z. */
export const Hoplon = ({ kleur = '#A8322B', letter = true, o }: { kleur?: string; letter?: boolean; o?: { kleur: string; metaal?: number; ruw?: number } }) => (
  <group>
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.46, 0.46, 0.07, 22]} />
      <meshStandardMaterial color={o ? o.kleur : BRONS_K} metalness={0.7} roughness={0.3} />
    </mesh>
    <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.39, 0.39, 0.02, 22]} />
      <meshStandardMaterial color={o ? o.kleur : kleur} roughness={o ? 0.35 : 0.6} metalness={o ? 0.6 : 0} />
    </mesh>
    {letter &&
      [-1, 1].map((k) => (
        <Blok key={k} p={[k * 0.09, -0.01, 0.065]} s={[0.075, 0.48, 0.02]} r={[0, 0, k * 0.37]} c="#F2E6C8" o={o} />
      ))}
  </group>
);

/** Speer (dory): rechtop in de hand (punt boven) of naar voren gestoken (punt onder = voor de hand uit). */
export const Speer = ({ punt = 'boven', o }: { punt?: 'boven' | 'onder'; o?: { kleur: string; metaal?: number; ruw?: number } }) =>
  punt === 'boven' ? (
    <group>
      <Blok p={[0, 0.45, 0]} s={[0.05, 2.7, 0.05]} c="#6B4A2E" o={o} />
      <Blok p={[0, 1.9, 0]} s={[0.09, 0.3, 0.03]} c="#C9CDD2" metal={0.85} rough={0.25} o={o} />
    </group>
  ) : (
    <group>
      <Blok p={[0, -0.5, 0]} s={[0.05, 2.6, 0.05]} c="#6B4A2E" o={o} />
      <Blok p={[0, -1.9, 0]} s={[0.09, 0.3, 0.03]} c="#C9CDD2" metal={0.85} rough={0.25} o={o} />
    </group>
  );

/** De boze baby (AGE 0), rechtop in zijn doeken, met een piepklein schildje als rammelaar. */
export const Baby = ({ position, rotation, scale = 1, boos = 1, mond = 'dicht', schildje = true, knipoog = false, ogenOmhoog = false }: { position?: V3; rotation?: V3; scale?: number; boos?: number; mond?: 'dicht' | 'open' | 'lach'; schildje?: boolean; knipoog?: boolean; ogenOmhoog?: boolean }) => {
  const huid = '#E6B98E';
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.19, 0]} s={[0.4, 0.38, 0.32]} c="#EFE6D2" rough={0.95} />
      <Blok p={[0, 0.33, 0.165]} s={[0.36, 0.04, 0.02]} c="#C9B89A" />
      <Blok p={[0, 0.55, 0]} s={[0.38, 0.34, 0.34]} c={huid} />
      <Blok p={[0, 0.73, -0.02]} s={[0.3, 0.05, 0.26]} c="#2A1E16" />
      <Blok p={[0.04, 0.78, 0.04]} s={[0.06, 0.08, 0.06]} c="#2A1E16" r={[0, 0, -0.4]} />
      {[-1, 1].map((k) => (
        <group key={k} position={[k * 0.085, 0.57, 0.172]}>
          {knipoog && k > 0 ? (
            <Blok p={[0, -0.01, 0]} s={[0.07, 0.02, 0.01]} c="#151210" />
          ) : (
            <>
              <Blok p={[0, 0, 0]} s={[0.075, 0.085, 0.01]} c="#F4EFE6" />
              <Blok p={[-k * 0.008, ogenOmhoog ? 0.02 : -0.005, 0.006]} s={[0.042, 0.055, 0.006]} c="#151210" />
              <Blok p={[-k * 0.015, ogenOmhoog ? 0.035 : 0.012, 0.01]} s={[0.014, 0.014, 0.003]} c="#FFFFFF" />
            </>
          )}
          <Blok p={[0, 0.065 - boos * 0.012, 0.008]} s={[0.09, 0.022, 0.012]} c="#2A1E16" r={[0, 0, k * boos * 0.45]} />
        </group>
      ))}
      <Blok p={[0, 0.535, 0.18]} s={[0.05, 0.05, 0.03]} c="#D9A57A" />
      {mond === 'open' ? (
        <Blok p={[0, 0.46, 0.172]} s={[0.08, 0.06, 0.01]} c="#7A2A22" />
      ) : mond === 'lach' ? (
        <Blok p={[0, 0.465, 0.172]} s={[0.1, 0.02, 0.01]} c="#3A1E18" />
      ) : (
        <Blok p={[0, 0.465, 0.172]} s={[0.08, 0.018, 0.01]} c="#3A1E18" r={[0, 0, 0]} />
      )}
      {[-1, 1].map((k) => <Blok key={k} p={[k * 0.15, 0.49, 0.16]} s={[0.05, 0.03, 0.01]} c="#F0A898" />)}
      {schildje && (
        <group position={[0.23, 0.3, 0.14]} rotation={[0, -0.3, 0.2]} scale={0.26}>
          <Hoplon />
        </group>
      )}
    </group>
  );
};

/** Eenvoudige houten wieg met het label "AGE 0". */
export const Wieg = ({ position, label = true, children }: { position?: V3; label?: boolean; children?: ReactNode }) => (
  <group position={position}>
    <Blok p={[0, 0.2, 0]} s={[0.9, 0.4, 0.6]} c="#8A6A3A" />
    <Blok p={[0, 0.42, -0.27]} s={[0.9, 0.12, 0.06]} c="#7A5A32" />
    <Blok p={[0, 0.42, 0.27]} s={[0.9, 0.06, 0.06]} c="#7A5A32" />
    {[-0.42, 0.42].map((x) => <Blok key={x} p={[x, 0.46, 0]} s={[0.06, 0.2, 0.6]} c="#7A5A32" />)}
    <Blok p={[0, 0.41, 0]} s={[0.82, 0.02, 0.52]} c="#F2EAD8" />
    {label && <TekstVlak regels={['AGE 0']} b={0.46} h={0.17} achter="#F4E6C0" voor="#3A2418" position={[0, 0.2, 0.322]} fontPx={150} />}
    <group position={[0, 0.4, 0]}>{children}</group>
  </group>
);

/* ---------------- cartoon-tekens (3D, naast een hoofd) ---------------- */

/** Zweetdruppel(s). */
export const Zweet = ({ p, n = 1 }: { p: V3; n?: number }) => {
  const f = useCurrentFrame();
  return (
    <group position={p}>
      {Array.from({ length: n }, (_, i) => {
        const y = -((f * 0.012 + i * 0.4) % 0.5);
        return (
          <group key={i} position={[i * 0.14, y, 0]}>
            <Blok p={[0, 0, 0]} s={[0.09, 0.12, 0.05]} c="#BFE6FF" rough={0.05} metal={0.2} />
            <Blok p={[0, 0.08, 0]} s={[0.045, 0.06, 0.04]} c="#BFE6FF" rough={0.05} metal={0.2} />
          </group>
        );
      })}
    </group>
  );
};

/** Het rode boos-teken uit de manga: vier losse haakjes (geen kruis), kloppend. */
export const BoosTeken = ({ p, s = 1 }: { p: V3; s?: number }) => {
  const f = useCurrentFrame();
  const k = s * (1 + Math.max(0, Math.sin(f / 4)) * 0.15);
  return (
    <group position={p} scale={k}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
          <Blok p={[0.06, 0.15, 0]} s={[0.05, 0.14, 0.03]} c="#E8382B" emissive="#7A1A12" />
          <Blok p={[0.15, 0.06, 0]} s={[0.14, 0.05, 0.03]} c="#E8382B" emissive="#7A1A12" />
        </group>
      ))}
    </group>
  );
};

/** Tekstwolk (wit, zwarte letters) met een staartje naar de spreker. Verschijnt met een kleine sprong. */
export const Wolk = ({ p, tekst, b = 1.4, h = 0.55, r, vanaf = 6, staart = -1, fontPx }: { p: V3; tekst: string | string[]; b?: number; h?: number; r?: V3; vanaf?: number; staart?: -1 | 1 | 0; fontPx?: number }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [vanaf, vanaf + 6, vanaf + 10], [0.001, 1.12, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const regels = Array.isArray(tekst) ? tekst : [tekst];
  return (
    <group position={p} rotation={r} scale={s}>
      <Blok p={[0, 0, -0.03]} s={[b + 0.08, h + 0.08, 0.03]} c="#1A120A" />
      <TekstVlak regels={regels} b={b} h={h} achter="#FFFFFF" voor="#1A120A" fontPx={fontPx ?? Math.min(150, Math.round(380 / Math.max(...regels.map((x) => x.length)) * (b / 1.4)))} />
      {staart !== 0 && <Blok p={[staart * b * 0.28, -h / 2 - 0.08, 0]} s={[0.12, 0.18, 0.04]} r={[0, 0, staart * 0.5]} c="#FFFFFF" />}
    </group>
  );
};

/** Bewegingsstreepjes (voor een zwiepend rietje of een rennende boodschapper). */
export const Streepjes = ({ p, r, n = 3 }: { p: V3; r?: V3; n?: number }) => (
  <group position={p} rotation={r}>
    {Array.from({ length: n }, (_, i) => <Blok key={i} p={[0, i * 0.12, 0]} s={[0.35 - i * 0.06, 0.025, 0.02]} c="#FFFFFF" emissive="#888888" />)}
  </group>
);

/** Gele "CLANG"-ster bij een klap op een schild. */
export const Klapster = ({ p, op = 0 }: { p: V3; op?: number }) => {
  const f = useCurrentFrame();
  const fase = ((f - op) % 24) / 24;
  if (f < op) return null;
  const s = fase < 0.35 ? fase / 0.35 : Math.max(0, 1 - (fase - 0.35) * 2);
  return (
    <group position={p} scale={0.25 + s * 0.45}>
      {[0, 1, 2, 3].map((i) => <Blok key={i} p={[0, 0, 0]} s={[0.9, 0.16, 0.03]} r={[0, 0, (i * Math.PI) / 4 + 0.2]} c="#FFE27A" emissive="#C99A2E" />)}
    </group>
  );
};

/* ---------------- dieren ---------------- */

export const Vos = ({ position, rotation, scale = 1, kijk = 0 }: { position?: V3; rotation?: V3; scale?: number; kijk?: number }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Blok p={[0, 0.3, 0]} s={[0.34, 0.28, 0.7]} c="#E4682B" />
    {[-1, 1].map((k) => [-1, 1].map((z) => <Blok key={`${k}${z}`} p={[k * 0.12, 0.08, z * 0.25]} s={[0.08, 0.18, 0.08]} c="#2A1E16" />))}
    <group position={[0, 0.42, 0.38]} rotation={[0, kijk, 0]}>
      <Blok p={[0, 0, 0]} s={[0.32, 0.28, 0.28]} c="#E4682B" />
      <Blok p={[0, -0.06, 0.2]} s={[0.16, 0.12, 0.16]} c="#FFF1DC" />
      <Blok p={[0, -0.04, 0.29]} s={[0.06, 0.05, 0.04]} c="#1A120A" />
      {[-1, 1].map((k) => (
        <group key={k}>
          <Blok p={[k * 0.1, 0.2, -0.02]} s={[0.09, 0.14, 0.05]} c="#E4682B" />
          <Blok p={[k * 0.08, 0.05, 0.145]} s={[0.05, 0.05, 0.01]} c="#1A120A" />
        </group>
      ))}
    </group>
    <Blok p={[0, 0.36, -0.5]} s={[0.18, 0.18, 0.42]} c="#E4682B" r={[0.4, 0, 0]} />
    <Blok p={[0, 0.48, -0.7]} s={[0.16, 0.16, 0.14]} c="#FFF1DC" r={[0.4, 0, 0]} />
  </group>
);

export const Geit = ({ position, rotation, scale = 1, eet = false }: { position?: V3; rotation?: V3; scale?: number; eet?: boolean }) => {
  const f = useCurrentFrame();
  const kauw = eet ? Math.sin(f / 3) * 0.05 : 0;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Blok p={[0, 0.55, 0]} s={[0.42, 0.36, 0.8]} c="#EDE8DC" />
      {[-1, 1].map((k) => [-1, 1].map((z) => <Blok key={`${k}${z}`} p={[k * 0.14, 0.2, z * 0.3]} s={[0.09, 0.4, 0.09]} c="#D8D0C0" />))}
      <group position={[0, eet ? 0.55 : 0.82, 0.48]} rotation={[eet ? 0.6 : 0, 0, 0]}>
        <Blok p={[0, 0, 0]} s={[0.26, 0.26, 0.34]} c="#EDE8DC" />
        <Blok p={[0, -0.16 + kauw, 0.1]} s={[0.08, 0.12, 0.06]} c="#D8D0C0" />
        {[-1, 1].map((k) => (
          <group key={k}>
            <Blok p={[k * 0.08, 0.18, -0.08]} s={[0.05, 0.16, 0.05]} r={[-0.5, 0, 0]} c="#8A7A62" />
            <Blok p={[k * 0.15, 0.04, -0.04]} s={[0.12, 0.05, 0.08]} c="#EDE8DC" />
            <Blok p={[k * 0.08, 0.05, 0.175]} s={[0.05, 0.04, 0.01]} c="#1A120A" />
          </group>
        ))}
      </group>
      <Blok p={[0, 0.72, -0.44]} s={[0.1, 0.14, 0.08]} c="#EDE8DC" r={[0.6, 0, 0]} />
    </group>
  );
};

/* ---------------- dingen ---------------- */

/** Troon (goud) met optionele parasol; de zitter staat er los in via <Zit>. Zitvlak op y 0,55. */
export const Troon = ({ position, rotation, parasol = true, kleur = '#D8A945' }: { position?: V3; rotation?: V3; parasol?: boolean; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    <Blok p={[0, 0.27, 0]} s={[1.0, 0.55, 0.8]} c={kleur} rough={0.35} metal={0.6} />
    <Blok p={[0, 1.2, -0.42]} s={[1.0, 1.6, 0.1]} c={kleur} rough={0.35} metal={0.6} />
    <Blok p={[0, 2.05, -0.42]} s={[0.5, 0.2, 0.1]} c={kleur} rough={0.35} metal={0.6} />
    {[-0.5, 0.5].map((x) => <Blok key={x} p={[x, 0.75, -0.05]} s={[0.1, 0.12, 0.8]} c={kleur} rough={0.35} metal={0.6} />)}
    <Blok p={[0, 0.08, 0.62]} s={[0.7, 0.16, 0.36]} c={kleur} rough={0.35} metal={0.6} />
    {parasol && (
      <group position={[0, 0, -0.7]}>
        <Blok p={[0, 2.2, 0]} s={[0.06, 4.4, 0.06]} c="#B8912F" metal={0.6} rough={0.3} />
        <mesh position={[0, 4.35, 0.55]} castShadow>
          <cylinderGeometry args={[1.25, 1.35, 0.14, 12]} />
          <meshStandardMaterial color="#6A2E7A" roughness={0.8} />
        </mesh>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <Blok key={i} p={[Math.sin(a) * 1.3, 4.2, 0.55 + Math.cos(a) * 1.3]} s={[0.12, 0.16, 0.06]} r={[0, a, 0]} c="#D8A945" metal={0.6} rough={0.3} />;
        })}
      </group>
    )}
  </group>
);

/** Een figuur die zit: het lijf zakt 0,35 weg in het zitvlak, dijen en schenen worden ervoor gezet. */
export const Zit = ({ kleding, position, rotation, hop = 0, ...rest }: { kleding: Kleding; position?: V3; rotation?: V3; hop?: number } & Omit<Parameters<typeof Figuur>[0], 'kleding' | 'position' | 'rotation'>) => (
  <group position={position} rotation={rotation}>
    <FiguurL kleding={kleding} position={[0, -0.35 + hop, 0]} {...rest} />
    {hop < 0.05 &&
      [-0.14, 0.14].map((x) => (
        <group key={x}>
          <Blok p={[x, 0.6, 0.26]} s={[0.24, 0.2, 0.52]} c={kleding.rok ?? kleding.tuniek} />
          <Blok p={[x, 0.27, 0.5]} s={[0.21, 0.55, 0.21]} c={kleding.benen ?? kleding.huid} />
          <Blok p={[x, 0.05, 0.56]} s={[0.24, 0.1, 0.3]} c={kleding.schoenen} />
        </group>
      ))}
  </group>
);

/** Stenen waterput. */
export const Put = ({ position }: { position?: V3 }) => (
  <group position={position}>
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return <Blok key={i} p={[Math.sin(a) * 0.7, 0.4, Math.cos(a) * 0.7]} s={[0.46, 0.8, 0.26]} r={[0, a, 0]} c={i % 2 ? '#A89A84' : '#9A8C76'} />;
    })}
    <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.6, 16]} />
      <meshStandardMaterial color="#0E0A08" />
    </mesh>
    {[-0.85, 0.85].map((x) => <Blok key={x} p={[x, 1.1, 0]} s={[0.1, 1.4, 0.1]} c="#5A3B24" />)}
    <Blok p={[0, 1.78, 0]} s={[1.9, 0.1, 0.1]} c="#5A3B24" />
  </group>
);

/** Kleipotje (aarde of water). */
export const Potje = ({ position, water = false, scale = 1 }: { position?: V3; water?: boolean; scale?: number }) => (
  <group position={position} scale={scale}>
    <Blok p={[0, 0.16, 0]} s={[0.26, 0.3, 0.26]} c="#B5643A" />
    <Blok p={[0, 0.34, 0]} s={[0.18, 0.06, 0.18]} c="#A0552E" />
    <Blok p={[0, 0.33, 0]} s={[0.15, 0.03, 0.15]} c={water ? '#4A8EC0' : '#5A3E24'} rough={water ? 0.15 : 1} />
  </group>
);

/** Lage stenen muur dwars over de weg (de oude muur van de Phociërs). */
export const Muur = ({ z = 0, van = -4, tot = 4, h = 2, af = 1 }: { z?: number; van?: number; tot?: number; h?: number; af?: number }) => {
  const n = Math.round((tot - van) / 0.82);
  const stenen: ReactNode[] = [];
  for (let r = 0; r < h; r++) {
    for (let i = 0; i < n; i++) {
      const idx = r * n + i;
      if (idx / (h * n) > af) continue;
      const x = van + 0.41 + i * 0.82 + (r % 2 ? 0.2 : 0);
      if (x > tot - 0.2) continue;
      stenen.push(<Blok key={idx} p={[x, 0.35 + r * 0.68, z + ((i * 7) % 3) * 0.03]} s={[0.78, 0.66, 0.8]} c={['#A89A84', '#9A8C76', '#B4A690'][(i + r) % 3]} rough={1} />);
    }
  }
  return <>{stenen}</>;
};

/** Stoom uit de warme bronnen: kleine witte blokjes die opstijgen en kleiner worden (altijd ver van de camera zetten). */
export const Damp = ({ position, n = 6 }: { position: V3; n?: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <group position={position}>
      {Array.from({ length: n }, (_, i) => {
        const y = (t * 0.6 + i * 0.5) % 3;
        const s = 0.5 * (1 - y / 3) + 0.1;
        return <Blok key={i} p={[Math.sin(i * 1.7 + t) * 0.4 + (i % 3) * 0.5, 0.2 + y, (i % 2) * 0.5]} s={[s, s, s]} c="#F2EEE8" rough={1} r={[i, i, 0]} />;
      })}
    </group>
  );
};

/* ---------------- legers van blokken ---------------- */

/** Hopliet van blokken (voor de massa): helm met kam, rond schild voor het lijf, speer, rode mantel. */
export const Hopliet = ({ position, rotation, cape = '#B3312B', schild = '#A8322B', t = 0, speerVoor = false, letter = true }: { position: V3; rotation?: V3; cape?: string; schild?: string; t?: number; speerVoor?: boolean; letter?: boolean }) => (
  <group position={position} rotation={rotation}>
    <group position={[0, Math.abs(Math.sin(t * 6 + position[0] * 1.3 + position[2])) * 0.04, 0]}>
      <Blok p={[0, 0.45, 0]} s={[0.48, 0.9, 0.3]} c="#C98F62" />
      <Blok p={[0, 0.3, 0.02]} s={[0.52, 0.4, 0.32]} c={BRONS_K} metal={0.6} rough={0.35} />
      <Blok p={[0, 1.02, 0]} s={[0.6, 0.3, 0.34]} c="#8E2A22" />
      <Blok p={[0, 1.38, 0]} s={[0.66, 0.5, 0.42]} c={BRONS_K} metal={0.6} rough={0.35} />
      <Blok p={[0, 1.3, -0.24]} s={[0.62, 1.3, 0.06]} c={cape} />
      <Blok p={[0, 1.9, 0]} s={[0.5, 0.5, 0.46]} c="#D9A57A" />
      <Blok p={[0, 2.1, 0]} s={[0.56, 0.32, 0.52]} c={BRONS_K} metal={0.7} rough={0.3} />
      <Blok p={[0, 1.88, -0.25]} s={[0.56, 0.5, 0.06]} c={BRONS_K} metal={0.7} rough={0.3} />
      <Blok p={[0, 2.38, -0.02]} s={[0.08, 0.2, 0.58]} c="#B3312B" rough={1} />
      <group position={[-0.08, 1.25, 0.3]}><Hoplon kleur={schild} letter={letter} /></group>
      {speerVoor ? (
        <>
          <Blok p={[0.36, 1.5, 0.6]} s={[0.05, 0.05, 2.6]} c="#6B4A2E" />
          <Blok p={[0.36, 1.5, 1.95]} s={[0.03, 0.09, 0.3]} c="#C9CDD2" metal={0.85} rough={0.25} />
        </>
      ) : (
        <>
          <Blok p={[0.38, 1.6, 0.08]} s={[0.05, 2.7, 0.05]} c="#6B4A2E" />
          <Blok p={[0.38, 3.05, 0.08]} s={[0.09, 0.3, 0.03]} c="#C9CDD2" metal={0.85} rough={0.25} />
        </>
      )}
    </group>
  </group>
);

/** Perzische soldaat van blokken: broek, tuniek, zachte kap, hoog rieten schild. */
export const PersSoldaat = ({ position, rotation, kleur = '#3E5F9A', t = 0, loopt = false, goud = false, schild = true }: { position: V3; rotation?: V3; kleur?: string; t?: number; loopt?: boolean; goud?: boolean; schild?: boolean }) => {
  const stap = loopt ? Math.sin(t * 9 + position[0] * 2 + position[2]) : 0;
  return (
    <group position={position} rotation={rotation}>
      <group position={[0, Math.abs(stap) * 0.06, 0]}>
        {[-0.12, 0.12].map((x, i) => <Blok key={x} p={[x, 0.45, (i ? 1 : -1) * stap * 0.12]} s={[0.22, 0.9, 0.28]} c="#4E3A7A" />)}
        <Blok p={[0, 1.25, 0]} s={[0.62, 0.75, 0.38]} c={kleur} />
        {goud && <Blok p={[0, 1.32, 0.01]} s={[0.66, 0.5, 0.42]} c="#C9A646" metal={0.6} rough={0.35} />}
        <Blok p={[0, 1.9, 0]} s={[0.5, 0.5, 0.46]} c="#B07A4E" />
        <Blok p={[0, 1.72, 0.2]} s={[0.46, 0.22, 0.1]} c="#1A1210" />
        <Blok p={[0, 2.2, -0.02]} s={[0.54, 0.22, 0.52]} c={goud ? '#E9DFC8' : '#D8CBB0'} />
        {schild && <Blok p={[-0.3, 1.1, 0.32]} s={[0.66, 1.5, 0.06]} c="#C9A66B" rough={1} />}
        {schild && [0.5, 0.9, 1.3, 1.7].map((y) => <Blok key={y} p={[-0.3, y, 0.36]} s={[0.66, 0.03, 0.02]} c="#8A6A3A" />)}
        <Blok p={[0.38, 1.4, 0.1]} s={[0.05, 1.9, 0.05]} c="#5A3B24" />
        <Blok p={[0.38, 2.4, 0.1]} s={[0.08, 0.2, 0.03]} c="#C9CDD2" metal={0.85} rough={0.25} />
      </group>
    </group>
  );
};

/** Rijen hoplieten (Grieken), gezicht naar +z. */
export const Falanx = ({ rijen = 3, kolommen = 9, afstand = 0.95, position = [0, 0, 0] as V3, rotation, t = 0, cape, schild, speerVoor = false, kleuren }: { rijen?: number; kolommen?: number; afstand?: number; position?: V3; rotation?: V3; t?: number; cape?: string; schild?: string; speerVoor?: boolean; kleuren?: string[] }) => (
  <group position={position} rotation={rotation}>
    {Array.from({ length: rijen }, (_, r) =>
      Array.from({ length: kolommen }, (_, c) => (
        <Hopliet
          key={`${r}-${c}`}
          position={[(c - (kolommen - 1) / 2) * afstand, 0, -r * afstand * 1.15]}
          t={t}
          cape={cape}
          schild={kleuren ? kleuren[(r + c) % kleuren.length] : schild}
          letter={!kleuren}
          speerVoor={speerVoor && r < 2}
        />
      )),
    )}
  </group>
);

/** Rijen Perzen, gezicht naar +z. */
export const PersLeger = ({ rijen = 4, kolommen = 10, afstand = 1.05, position = [0, 0, 0] as V3, rotation, t = 0, loopt = false, goud = false, kleur }: { rijen?: number; kolommen?: number; afstand?: number; position?: V3; rotation?: V3; t?: number; loopt?: boolean; goud?: boolean; kleur?: string }) => (
  <group position={position} rotation={rotation}>
    {Array.from({ length: rijen }, (_, r) =>
      Array.from({ length: kolommen }, (_, c) => (
        <PersSoldaat
          key={`${r}-${c}`}
          position={[(c - (kolommen - 1) / 2) * afstand + (r % 2) * 0.35, 0, -r * afstand * 1.2]}
          t={t}
          loopt={loopt}
          goud={goud}
          kleur={kleur ?? ['#3E5F9A', '#7A3B6E', '#A8772E', '#3E6B5A'][(r * 3 + c) % 4]}
        />
      )),
    )}
  </group>
);

/* ---------------- camera ---------------- */

/** Camera van a naar b in `duur` frames: [x0, y0, z0, x1, y1, z1]. */
export const camPos = (f: number, c: number[], duur = 160): V3 => {
  const p = ease(f, 0, duur, 0, 1);
  const d = Math.hypot(c[3] - c[0], c[5] - c[2]) < 0.05 ? 1.4 : 1;
  return [
    c[0] + (c[3] - c[0]) * p + Math.sin(f / 53) * 0.035 * d,
    c[1] + (c[4] - c[1]) * p + Math.sin(f / 67 + 1.3) * 0.022 * d,
    c[2] + (c[5] - c[2]) * p + Math.sin(f / 71 + 2.1) * 0.02 * d,
  ];
};

/* ---------------- leven in de wereld ---------------- */

/** Vogeltjes (V-vorm) die ver weg door de lucht trekken. `meeuw` = wit, boven zee. */
export const Vogels = ({ n = 5, y = 16, z = -40, meeuw = false, x0 = -40, breed = 80 }: { n?: number; y?: number; z?: number; meeuw?: boolean; x0?: number; breed?: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const k = meeuw ? '#F4F2EC' : '#2A2420';
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + ((t * (2.2 + (i % 3) * 0.5) + i * 17) % breed);
        const slag = Math.sin(t * 9 + i * 1.7) * 0.5;
        return (
          <group key={i} position={[x, y + (i % 3) * 1.6 + Math.sin(t + i) * 0.4, z - (i % 2) * 6]} scale={meeuw ? 1.1 : 0.9}>
            <Blok p={[-0.28, 0, 0]} s={[0.55, 0.06, 0.14]} r={[0, 0, 0.35 + slag]} c={k} />
            <Blok p={[0.28, 0, 0]} s={[0.55, 0.06, 0.14]} r={[0, 0, -0.35 - slag]} c={k} />
          </group>
        );
      })}
    </>
  );
};

/** Stofjes die in het licht zweven (binnen), altijd achter het onderwerp. */
export const Stofjes = ({ midden = [0, 1.8, -1.6] as V3, n = 14, breed = 4 }: { midden?: V3; n?: number; breed?: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = midden[0] + (((i * 7.31) % breed) - breed / 2) + Math.sin(t * 0.3 + i) * 0.2;
        const y = midden[1] + (((i * 3.17 + t * 0.12) % 2.4) - 1.2);
        const z = midden[2] - ((i * 1.93) % 1.2);
        return <Blok key={i} p={[x, y, z]} s={[0.018, 0.018, 0.018]} c="#E8D8B0" emissive="#5A4A2A" />;
      })}
    </>
  );
};

/** Grasplukjes, steentjes en bloemetjes op de grond, in een ring rond het midden (het midden blijft vrij). */
export const Strooisel = ({ n = 70, straal = 16, vrij = 2.6, droog = false, zMax = 4, midden = [0, 0, 0] as V3 }: { n?: number; straal?: number; vrij?: number; droog?: boolean; zMax?: number; midden?: V3 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const a = (i * 2.399) % (Math.PI * 2);
      const rr = vrij + ((i * 5.17) % (straal - vrij));
      const x = midden[0] + Math.cos(a) * rr;
      const z = midden[2] + Math.sin(a) * rr;
      if (z > zMax) return null;
      const soort = i % 5;
      if (soort === 0) return <Blok key={i} p={[x, 0.06, z]} s={[0.22, 0.12, 0.18]} r={[0, i, 0]} c="#9A8E78" />;
      if (soort === 1 && !droog)
        return (
          <group key={i} position={[x, 0, z]}>
            <Blok p={[0, 0.12, 0]} s={[0.03, 0.24, 0.03]} c="#5E8A3A" />
            <Blok p={[0, 0.26, 0]} s={[0.09, 0.07, 0.09]} c={['#E8C84A', '#F2F2F2', '#C94A6A'][i % 3]} />
          </group>
        );
      return (
        <group key={i} position={[x, 0, z]} rotation={[0, i, 0]}>
          {[-0.06, 0, 0.06].map((dx, j) => <Blok key={j} p={[dx, 0.1, 0]} s={[0.03, 0.2 + j * 0.03, 0.03]} r={[0, 0, (j - 1) * 0.35]} c={droog ? '#B8A06A' : '#6E8A3E'} />)}
        </group>
      );
    })}
  </>
);

/** Kip van blokken (pikt, rent). */
export const Kip = ({ position, rotation, t = 0 }: { position: V3; rotation?: V3; t?: number }) => (
  <group position={position} rotation={rotation}>
    <group position={[0, Math.abs(Math.sin(t * 12)) * 0.05, 0]}>
      <Blok p={[0, 0.25, 0]} s={[0.26, 0.24, 0.36]} c="#F4F0E6" />
      <Blok p={[0, 0.42, 0.16]} s={[0.15, 0.16, 0.15]} c="#F4F0E6" />
      <Blok p={[0, 0.53, 0.16]} s={[0.04, 0.06, 0.1]} c="#D83A2A" />
      <Blok p={[0, 0.41, 0.26]} s={[0.05, 0.04, 0.06]} c="#E8A030" />
      {[-1, 1].map((k) => <Blok key={k} p={[k * 0.08, 0.07, 0]} s={[0.03, 0.14, 0.03]} c="#E8A030" />)}
      <Blok p={[0, 0.34, -0.2]} s={[0.12, 0.14, 0.06]} c="#E8E2D4" r={[-0.4, 0, 0]} />
    </group>
  </group>
);

/** Kat die ligt te slapen en met zijn staart zwiept; kijkt af en toe op. */
export const Kat = ({ position, rotation, kijk = false }: { position: V3; rotation?: V3; kijk?: boolean }) => {
  const f = useCurrentFrame();
  const op = kijk || (f % 150) > 110;
  return (
    <group position={position} rotation={rotation}>
      <Blok p={[0, 0.12, 0]} s={[0.42, 0.22, 0.24]} c="#8A6A4A" />
      <group position={[0.24, op ? 0.28 : 0.18, 0]}>
        <Blok p={[0, 0, 0]} s={[0.18, 0.16, 0.18]} c="#8A6A4A" />
        {[-1, 1].map((k) => <Blok key={k} p={[0.0, 0.1, k * 0.06]} s={[0.05, 0.07, 0.04]} c="#8A6A4A" />)}
        {[-1, 1].map((k) => <Blok key={`o${k}`} p={[0.09, 0.02, k * 0.045]} s={[0.01, op ? 0.035 : 0.01, 0.03]} c={op ? '#C9D84A' : '#2A1E16'} />)}
      </group>
      <Blok p={[-0.3, 0.1, 0.06]} s={[0.24, 0.05, 0.05]} r={[0, Math.sin(f / 9) * 0.6, 0]} c="#7A5A3A" />
    </group>
  );
};

/** Dorpelingen in de achtergrond van Sparta: iemand met een mand, een vrouw met een kruik op haar hoofd,
 * en een jongetje dat een kip achterna zit. Lopen over een vrije strook achter de huizen van de voorgrond. */
export const Dorpelingen = ({ z = -10.8 }: { z?: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const loop = (snel: number, start: number) => ((t * snel + start) % 34) - 17;
  const kip = loop(1.6, 9);
  return (
    <>
      <FiguurL kleding={MOEDER} haar="lang" position={[loop(0.7, 4), Math.abs(Math.sin(t * 5)) * 0.03, z]} rotation={[0, Math.PI / 2, 0]} pose={{ armR: omhoogArm, armL: omhoogArmL }} extra={<Blok p={[0, 2.62, 0]} s={[0.36, 0.4, 0.36]} c="#B5643A" />} />
      <FiguurL kleding={EFOR} haar="grijs" baard position={[-loop(0.5, 20), 0, z - 1.6]} rotation={[0, -Math.PI / 2, 0]} inHand={<Blok p={[0, -0.12, 0]} s={[0.4, 0.3, 0.3]} c="#A8865A" />} />
      <Kip position={[kip, 0, z + 1.0]} rotation={[0, Math.PI / 2, 0]} t={t} />
      <FiguurL kleding={LEONIDAS_JONG} haar="kort" scale={0.55} position={[kip - 1.3, Math.abs(Math.sin(t * 10)) * 0.06, z + 1.0]} rotation={[0, Math.PI / 2, 0]} pose={{ armL: { schouder: [-1.3, 0, 0.2], elleboog: [0, 0] }, armR: { schouder: [-1.3, 0, -0.2], elleboog: [0, 0] }, mond: 'open' }} />
    </>
  );
};
const omhoogArm = { schouder: [-2.9, 0, -0.15] as V3, elleboog: [0, -0.2] as [number, number] };
const omhoogArmL = { schouder: [-2.9, 0, 0.15] as V3, elleboog: [0, 0.2] as [number, number] };

/** De geit is de terugkerende grap: hij staat in bijna elk shot in de pas ergens hoog op de rotsen. */
export const KlifGeit = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Rots position={[-7.8, 1.5, -9]} schaal={[2.2, 1.9, 2.2]} kleur="#8A7A62" />
      <Geit position={[-7.6, 3.15, -9]} rotation={[0, 0.6 + Math.sin(f / 40) * 0.3, 0]} scale={1.2} eet={(f % 120) > 70} />
    </>
  );
};

/* ---------------- decors ---------------- */

type Tijd = 'dag' | 'avond' | 'nacht' | 'dageraad';
const LUCHT: Record<Tijd, { boven: string; horizon: string; mist: string; zee: string }> = {
  dag: { boven: '#8FB9DC', horizon: '#EADBB8', mist: '#DCD2BC', zee: '#2F6E9C' },
  avond: { boven: '#4A2E4A', horizon: '#F08A4A', mist: '#9A6A4A', zee: '#3A4E7A' },
  nacht: { boven: '#0B0F1E', horizon: '#242A44', mist: '#0E1220', zee: '#141E34' },
  dageraad: { boven: '#4E4A7A', horizon: '#F4A35A', mist: '#B0806A', zee: '#3A5A86' },
};
const Licht = ({ tijd }: { tijd: Tijd }) =>
  tijd === 'dag' ? (
    <Daglicht zon={[10, 16, 8]} kracht={1.9} />
  ) : tijd === 'avond' ? (
    <>
      <Avondlicht />
      <Zon position={[40, 6, -110]} grootte={14} kleur="#FFB070" />
    </>
  ) : tijd === 'nacht' ? (
    <Nachtlicht />
  ) : (
    <>
      <Daglicht zon={[30, 6, -20]} kleur="#FFC890" kracht={1.5} omgeving={1.0} />
      <Zon position={[60, 4, -110]} grootte={12} kleur="#FFC07A" />
    </>
  );

/** Sparta: lage huizen zonder stadsmuur, olijfbomen, de Taygetos met sneeuw erachter. */
const HUIZEN: [number, number, number][] = [[-7, -7, 0.2], [6.5, -9, -0.3], [-3.5, -15, 0.1], [9.5, -17, 0.4], [-12, -13, -0.2], [2.5, -22, 0]];
export const Sparta = ({ children, over, tijd = 'dag', cam = [4, 2.6, 9, 2.6, 2.2, 7], kijk = [0, 1.4, 0] as V3, duur = 160, bomen = true, dorp = true }: { children?: ReactNode; over?: ReactNode; tijd?: Tijd; cam?: number[]; kijk?: V3; duur?: number; bomen?: boolean; dorp?: boolean }) => {
  const f = useCurrentFrame();
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={2.6} mist={[L.mist, 25, 150]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur={tijd === 'nacht' ? '#3A3A2E' : '#A8965E'} />
      <Berg position={[-28, 0, -80]} h={36} r={30} kleur="#7E7A70" />
      <Berg position={[12, 0, -92]} h={30} r={26} kleur="#86827A" />
      <Heuvels kleur={tijd === 'nacht' ? '#262A22' : '#8A8A5A'} z={-48} />
      {HUIZEN.map(([x, z, r], i) => (
        <group key={i} position={[x, 0, z]} rotation={[0, r, 0]}>
          <Blok p={[0, 1.1, 0]} s={[3, 2.2, 2.6]} c={i % 2 ? '#D8C7A2' : '#CDB994'} rough={1} />
          <Blok p={[0, 2.32, 0]} s={[3.3, 0.25, 2.9]} c="#A0553A" />
          <Blok p={[0.5, 0.75, 1.31]} s={[0.7, 1.5, 0.04]} c="#5A3B24" />
          <Blok p={[-0.8, 1.4, 1.31]} s={[0.45, 0.45, 0.04]} c="#3A2A1C" />
        </group>
      ))}
      {bomen && [[-5, -3], [5, -4], [-9, -6], [11, -10], [-2, -9]].map(([x, z], i) => <Boom key={i} position={[x, 0, z]} schaal={0.62} kleur={['#7A8E52', '#6E8448', '#86965A'][i % 3]} />)}
      {tijd !== 'nacht' && <Vogels />}
      <Strooisel />
      {dorp && tijd !== 'nacht' && <Dorpelingen />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** Kamer in een Spartaans huis, licht (zoals de thumbnail): lemen muur, raam met de bergen. */
export const Huis = ({ children, over, cam = [1.6, 1.6, 4.2, 1.1, 1.5, 3.4], kijk = [0, 1.0, 0] as V3, duur = 150, avond = false }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; avond?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3.4} mist={avond ? ['#2A1E14', 6, 30] : ['#E8D6B8', 8, 40]} over={over}>
      <Lucht boven={avond ? '#1E1610' : '#F3E2C4'} horizon={avond ? '#2A1E14' : '#F3E2C4'} />
      {avond ? (
        <>
          <hemisphereLight args={['#8A7A68', '#2A1E14', 0.7]} />
          <pointLight position={[1.2, 2.2, 1.2]} intensity={8} distance={9} color="#FFA850" />
        </>
      ) : (
        <Daglicht zon={[3, 6, 6]} kracht={1.5} omgeving={1.5} />
      )}
      <Grond kleur="#B08A62" />
      <Blok p={[0, 3, -1.6]} s={[10, 6, 0.3]} c="#E7C79C" />
      <Blok p={[-4, 3, 0]} s={[0.3, 6, 6]} c="#DDBB8E" />
      <Blok p={[-1.4, 1.6, -1.43]} s={[1.1, 0.9, 0.05]} c="#8A5A32" />
      <Blok p={[-1.4, 1.6, -1.4]} s={[0.96, 0.76, 0.05]} c={avond ? '#2A3050' : '#9FD0EE'} />
      {!avond && <Blok p={[-1.4, 1.42, -1.37]} s={[0.9, 0.3, 0.02]} c="#8A8A7A" />}
      {!avond && <Blok p={[-1.55, 1.56, -1.36]} s={[0.3, 0.18, 0.02]} c="#F4F6F8" />}
      <Blok p={[1.6, 1.9, -1.33]} s={[1.6, 0.06, 0.24]} c="#7A5A32" />
      {[1.05, 1.4, 1.8, 2.15].map((x, i) => <Blok key={x} p={[x, 2.05 + (i % 2) * 0.03, -1.33]} s={[0.2, 0.24 + (i % 2) * 0.06, 0.18]} c={['#B5643A', '#C9A66B', '#8A5A3A', '#B5643A'][i]} />)}
      <group position={[2.6, 2.4, -1.4]}><Hoplon /></group>
      <Kat position={[-2.6, 0, -0.9]} rotation={[0, 0.6, 0]} />
      {!avond && <Stofjes midden={[-1.0, 1.4, -0.9]} n={18} breed={1.6} />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** Raadszaal / paleis: stenen zuilen, warm licht. */
export const Hal = ({ children, over, cam = [2.6, 2.4, 7, 1.6, 2.2, 5.8], kijk = [0, 1.7, 0] as V3, duur = 150, donker = false, sepia = false }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; donker?: boolean; sepia?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={3} mist={donker ? ['#120C08', 5, 22] : ['#4A3020', 9, 36]} over={<>{over}{sepia && <div style={{ position: 'absolute', inset: 0, background: 'rgba(140,96,40,0.28)', mixBlendMode: 'multiply' }} />}</>}>
      <Lucht boven={donker ? '#0E0A08' : '#2E1E14'} horizon={donker ? '#1E140C' : '#6A4A2E'} />
      {donker ? (
        <>
          <hemisphereLight args={['#5A4A3A', '#120C08', 0.35]} />
          <pointLight position={[0, 3.4, 1.2]} intensity={6} distance={9} color="#FF9A50" />
        </>
      ) : (
        <Binnenlicht zon={[-4, 9, 3]} kleur="#FFC680" />
      )}
      <Grond kleur="#8A7458" />
      <Blok p={[0, 3, -4]} s={[14, 6, 0.4]} c="#A8916E" />
      {[-4.2, -1.4, 1.4, 4.2].map((x) => (
        <group key={x} position={[x, 0, -3.2]}>
          <Blok p={[0, 2.6, 0]} s={[0.7, 5.2, 0.7]} c="#D8C9A8" />
          <Blok p={[0, 5.3, 0]} s={[0.95, 0.25, 0.95]} c="#C9B994" />
          <Blok p={[0, 0.12, 0]} s={[0.95, 0.24, 0.95]} c="#C9B994" />
        </group>
      ))}
      <Blok p={[0, 0.02, 0]} s={[6, 0.04, 8]} c="#7A2E2A" />
      {!donker && <pointLight position={[0, 3, 1]} intensity={3} distance={9} color="#FFB060" />}
      {[-2.8, 2.8].map((x) => (
        <group key={x} position={[x, 3.4, -3.75]}>
          <Blok p={[0, 0, 0]} s={[1.1, 2.2, 0.04]} c="#9E2A22" />
          <TekstVlak regels={['Λ']} b={0.7} h={0.8} achter="#9E2A22" voor="#E9D9B8" position={[0, 0.2, 0.03]} fontPx={300} />
          <Blok p={[0, 1.12, 0]} s={[1.3, 0.08, 0.08]} c="#5A3B24" />
        </group>
      ))}
      {!donker && [-4.2, 4.2].map((x, i) => (
        <group key={x} position={[x, 0, -1.6]}>
          <Blok p={[0, 0.5, 0]} s={[0.4, 1.0, 0.4]} c="#6A5A48" />
          <VuurtjeK t={i} />
        </group>
      ))}
      {!donker && <Stofjes midden={[0, 2.4, -2.4]} n={22} breed={5} />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** Thermopylae: weg langs z, rotswanden links (x < -4), zee rechts (x > 4), de muur op z = 0, Grieken erachter
 * (z < 0) met het gezicht naar +z, de Perzen komen van +z. */
const KLIF = Array.from({ length: 16 }, (_, i) => ({
  z: -84 + i * 8,
  x: -11 - (i % 3) * 3,
  h: 14 + ((i * 7) % 5) * 3.2,
  k: ['#8A7A62', '#7A6A56', '#948468'][i % 3],
}));
export const Pas = ({ children, over, tijd = 'dag', cam = [6, 3.2, 9, 4.6, 2.8, 7.4], kijk = [0, 1.5, -1] as V3, duur = 160, muur = true, muurAf = 1, damp = false, scherpte = 2.6, fov = 36, geit = true }: { children?: ReactNode; over?: ReactNode; tijd?: Tijd; cam?: number[]; kijk?: V3; duur?: number; muur?: boolean; muurAf?: number; damp?: boolean; scherpte?: number; fov?: number; geit?: boolean }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const L = LUCHT[tijd];
  return (
    <Shot focus={kijk} scherpte={scherpte} mist={[L.mist, 28, 160]} over={over}>
      <Lucht boven={L.boven} horizon={L.horizon} />
      <Licht tijd={tijd} />
      <Grond kleur="#2E4A5A" y={-0.8} />
      <Blok p={[-16, -0.35, -20]} s={[40, 0.7, 220]} c={tijd === 'nacht' ? '#4A4234' : '#B8A27A'} rough={1} />
      <Blok p={[0, 0.01, -20]} s={[3.2, 0.02, 220]} c={tijd === 'nacht' ? '#3E382C' : '#A8926A'} rough={1} />
      <group position={[73, -0.16, -20]}>
        <Zee t={t} grootte={140} kleur={L.zee} golf={0.12} />
      </group>
      {KLIF.map((k, i) => (
        <group key={i}>
          <Rots position={[k.x - 3, k.h * 0.45, k.z]} schaal={[7, k.h, 6]} kleur={tijd === 'nacht' ? '#2E2A26' : k.k} rotation={[0, i * 0.7, 0]} />
          <Rots position={[-5.6, 0.6, k.z + 3]} schaal={[1.4, 1.2, 1.6]} kleur={tijd === 'nacht' ? '#2A2622' : '#9A8A70'} rotation={[0, i, 0]} />
        </group>
      ))}
      {muur && <Muur z={0.6} af={muurAf} />}
      {tijd !== 'nacht' && <Vogels meeuw y={7} z={-30} x0={6} breed={40} n={4} />}
      {[-3.6, 3.4].map((x) => Array.from({ length: 14 }, (_, i) => <Blok key={`${x}${i}`} p={[x + ((i * 0.37) % 0.5), 0.06, -24 + i * 3.1]} s={[0.22, 0.12, 0.18]} r={[0, i, 0]} c={i % 3 ? '#9A8C76' : '#B8A06A'} />))}
      {geit && <KlifGeit />}
      {damp && tijd !== 'nacht' && <Damp position={[-4.6, 0, -16]} />}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={fov} />
      {children}
    </Shot>
  );
};

/** De tent van Xerxes: paars en goud, tapijt, lampen. */
export const PerzTent = ({ children, over, cam = [2.4, 2.4, 6.6, 1.5, 2.2, 5.4], kijk = [0, 1.7, 0] as V3, duur = 150 }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <Shot focus={kijk} scherpte={3.2} mist={['#2A1420', 7, 30]} over={over}>
      <Lucht boven="#2A1420" horizon="#4A2A30" />
      <Binnenlicht zon={[3, 7, 5]} kleur="#FFC98A" />
      <Grond kleur="#5A3A2E" />
      <Blok p={[0, 0.02, 0]} s={[6, 0.04, 5]} c="#8E2A3A" />
      <Blok p={[0, 0.025, 0]} s={[5.4, 0.04, 4.4]} c="#A8364A" />
      {Array.from({ length: 12 }, (_, i) => <Blok key={i} p={[-5.5 + i, 3, -2.8]} s={[1.0, 6, 0.1]} c={i % 2 ? '#5A2A6E' : '#D8A945'} rough={0.9} />)}
      {[-3.2, 3.2].map((x, i) => <Fakkel key={x} position={[x, 0, -1.6]} t={t + i} />)}
      {[-2.4, -1.9, 1.9, 2.4].map((x, i) => <Blok key={x} p={[x, 0.3 + (i % 2) * 0.1, -2.4]} s={[0.3, 0.6 + (i % 2) * 0.2, 0.3]} c="#D8A945" metal={0.6} rough={0.3} />)}
      <Stofjes midden={[0, 2.2, -2.0]} n={24} breed={5} />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={34} />
      {children}
    </Shot>
  );
};

/** Delphi: tempel van Apollo op een berghelling. */
export const Delphi = ({ children, over, cam = [5, 3.4, 12, 3, 3, 9.5], kijk = [0, 2.2, -2] as V3, duur = 160, binnen = false }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; binnen?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Shot focus={kijk} scherpte={2.8} mist={binnen ? ['#2A1E16', 6, 26] : ['#D8D0C0', 25, 140]} over={over}>
      <Lucht boven={binnen ? '#1A120C' : '#94B8D6'} horizon={binnen ? '#2A1E16' : '#E6DCC4'} />
      {binnen ? (
        <>
          <hemisphereLight args={['#7A6A58', '#1A120C', 0.6]} />
          <pointLight position={[0, 3.2, 1.6]} intensity={9} distance={9} color="#FFB060" />
        </>
      ) : (
        <Daglicht zon={[-8, 14, 8]} kracht={1.9} />
      )}
      <Grond kleur="#9A9070" />
      <Berg position={[-6, 0, -40]} h={34} r={26} kleur="#8E8C84" />
      <Berg position={[22, 0, -50]} h={26} r={22} kleur="#9A968C" />
      <Blok p={[0, 0.3, -4]} s={[11, 0.6, 6]} c="#D8CFC0" />
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[-4 + i * 1.6, 0.6, -1.6]}>
          <Blok p={[0, 2.3, 0]} s={[0.55, 4.6, 0.55]} c="#EDE6D8" />
          <Blok p={[0, 4.7, 0]} s={[0.8, 0.22, 0.8]} c="#E2D9C8" />
        </group>
      ))}
      <Blok p={[0, 5.75, -3.6]} s={[10.6, 0.7, 5]} c="#E9E1D2" />
      <mesh position={[0, 6.6, -3.6]} rotation={[0, Math.PI / 4, 0]} scale={[1, 0.18, 1]}>
        <coneGeometry args={[5.6, 6, 4]} />
        <meshStandardMaterial color="#DCD2C0" roughness={0.9} flatShading />
      </mesh>
      <Blok p={[0, 3, -6]} s={[10, 6, 0.3]} c="#C9BEA8" />
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/** De Hellespont: zee met een brug van schepen langs x. */
export const Hellespont = ({ children, over, cam = [12, 6, 16, 9, 5, 12], kijk = [0, 0.8, 0] as V3, duur = 160, storm = false, nacht = false, brug = 1 }: { children?: ReactNode; over?: ReactNode; cam?: number[]; kijk?: V3; duur?: number; storm?: boolean; nacht?: boolean; brug?: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const n = 22;
  return (
    <Shot focus={kijk} scherpte={2.4} mist={storm ? ['#4A5058', 14, 90] : nacht ? ['#0E1220', 14, 90] : ['#D8D0BC', 25, 150]} over={over}>
      <Lucht boven={storm ? '#3A4048' : nacht ? '#0B0F1E' : '#8FB9DC'} horizon={storm ? '#6A7078' : nacht ? '#242A44' : '#E6D8BF'} />
      {storm ? <Daglicht zon={[-6, 12, 8]} kracht={0.9} kleur="#C8D0D8" /> : nacht ? <Nachtlicht /> : <Daglicht zon={[-6, 14, 10]} />}
      <Zee t={t * (storm ? 1.8 : 1)} golf={storm ? 0.45 : 0.15} kleur={storm ? '#2A4A5E' : nacht ? '#141E34' : '#2F6E9C'} />
      <Blok p={[0, 0.6, -40]} s={[200, 2.4, 20]} c={nacht ? '#22261E' : '#8A8A5A'} rough={1} />
      {Array.from({ length: n }, (_, i) => {
        if (i / n > brug) return null;
        const x = (i - n / 2) * 1.6;
        const wieg = Math.sin(t * (storm ? 3 : 1.2) + i) * (storm ? 0.18 : 0.04);
        return (
          <group key={i} position={[x, 0.05 + wieg, 0]} rotation={[storm ? wieg : 0, 0, 0]}>
            <Blok p={[0, 0.15, 0]} s={[0.9, 0.4, 3.0]} c="#6B4A2E" />
            <Blok p={[0, 0.38, 0]} s={[1.65, 0.08, 1.8]} c="#A8865A" />
          </group>
        );
      })}
      <Camera pos={camPos(f, cam, duur)} kijk={kijk} fov={36} />
      {children}
    </Shot>
  );
};

/* ---------------- kaart ---------------- */

type KS = { lon: number; lat: number; h: number; a: number; dx?: number };
const kaartCam = (a: KS, b: KS, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const kijk = opGriek(m(a.lon, b.lon), m(a.lat, b.lat), 0.3);
  return { kijk, pos: [kijk[0] + m(a.dx ?? 0, b.dx ?? 0), m(a.h, b.h), kijk[2] + m(a.a, b.a)] as V3 };
};
export const G_VER: KS = { lon: 31, lat: 36.5, h: 24, a: 13 };
export const G_GRIEKENLAND: KS = { lon: 23, lat: 38.2, h: 8, a: 6 };
export const kp = (s: PlaatsNaam, h = 6, a = 5, dx = 1): KS => ({ lon: PLAATS[s][0], lat: PLAATS[s][1], h, a, dx });
export const pl = (s: PlaatsNaam): [number, number] => [PLAATS[s][0], PLAATS[s][1]];

const RouteG = ({ punten, p, kleur = ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opGriek(lon, lat, 0.5));
  const lengtes = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[2] - pts[i][2]));
  const totaal = lengtes.reduce((x, y) => x + y, 0);
  const blokjes: V3[] = [];
  let d = 0;
  for (let i = 0; i < lengtes.length; i++) {
    for (let s = 0; s < lengtes[i]; s += 0.2) {
      if ((d + s) / totaal > p) break;
      const q = s / lengtes[i];
      blokjes.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q]);
    }
    d += lengtes[i];
  }
  let rest = p * totaal;
  let kopPos: V3 = pts[0];
  for (let i = 0; i < lengtes.length; i++) {
    if (rest <= lengtes[i]) {
      const q = rest / lengtes[i];
      kopPos = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * q];
      break;
    }
    rest -= lengtes[i];
    kopPos = pts[i + 1];
  }
  return (
    <>
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.09, 0.05, 0.09]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

export const KaartG = ({ van, naar, wissel = [20, 70], cam = [G_VER, G_VER], camDuur = 150, spelden = [], route, routeTijd = [10, 120], kop, licht, over, children }: {
  van: Record<string, MOStand>;
  naar?: Record<string, MOStand>;
  wissel?: [number, number];
  cam?: [KS, KS];
  camDuur?: number;
  spelden?: [PlaatsNaam, string][];
  route?: [number, number][];
  routeTijd?: [number, number];
  kop?: ReactNode;
  licht?: string[];
  over?: ReactNode;
  children?: ReactNode;
}) => {
  const f = useCurrentFrame();
  const c = kaartCam(cam[0], cam[1], ease(f, 0, camDuur, 0, 1));
  const gloed = licht ? (Math.sin(f / 5) + 1) / 2 : 0;
  return (
    <Shot focus={c.kijk} scherpte={2} over={<>{over}<KaartVoet /></>}>
      <Lucht boven="#2A2018" horizon="#3A2A1E" />
      <Camera pos={c.pos} kijk={c.kijk} fov={36} />
      <Binnenlicht zon={[-8, 16, 10]} kleur="#FFE2B8" />
      <pointLight position={[0, 12, 6]} intensity={8} distance={40} color="#FFD8A0" />
      <KaarttafelGriek van={van} naar={naar} p={naar ? ease(f, wissel[0], wissel[1], 0, 1) : 1} licht={licht} gloed={gloed} />
      {spelden.map(([s, k]) => <SpeldGriek key={s} lon={PLAATS[s][0]} lat={PLAATS[s][1]} kleur={k} schaal={0.7} hoogte={1.0} />)}
      {route && <RouteG punten={route} p={lin(f, routeTijd[0], routeTijd[1], 0, 1)} kop={kop} />}
      {children}
    </Shot>
  );
};
const KaartVoet = () => (
  <div style={{ position: 'absolute', right: 60, bottom: 26, fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: 'rgba(255,244,224,0.7)' }}>modern borders, approximate</div>
);
export const MiniSpartaan = () => <Spartaan koning scale={0.22} schild="voor" rotation={[0, 0.4, 0]} />;
export const MiniDorieus = () => <FiguurL kleding={DORIEUS} scale={0.22} rotation={[0, -0.4, 0]} />;

/* ---------------- 2D-overlays ---------------- */

/** Teller die van `van` naar `tot` loopt tussen frame a en b. */
export const TelTeller = ({ label, van, tot, a = 6, b = 60, pil, voor = '', na = '' }: { label: string; van: number; tot: number; a?: number; b?: number; pil?: string; voor?: string; na?: string }) => {
  const f = useCurrentFrame();
  const w = Math.round(ease(f, a, b, van, tot));
  return <LangTeller label={label} waarde={`${voor}${w.toLocaleString('en-US')}${na}`} pil={pil} />;
};

/** Regelbord in het midden: twee regels met een vinkje en een kruisje (het "X" is een letter, geen kruisbeeld). */
export const Regelbord = ({ regels }: { regels: [string, boolean][] }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', top: 170, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(28,26,22,0.86)', border: `3px solid ${ORANJE}`, borderRadius: 18, padding: '20px 44px' }}>
        {regels.map(([tekst, goed], i) => {
          const o = lin(f, 8 + i * 22, 16 + i * 22, 0, 1);
          return (
            <div key={i} style={{ opacity: o, display: 'flex', alignItems: 'center', gap: 26, fontFamily: SERIF, fontWeight: 600, fontSize: 64, color: '#FFF4E0', lineHeight: 1.3 }}>
              <span style={{ color: goed ? '#7FD26A' : '#FF5436', fontWeight: 800, width: 60, textAlign: 'center' }}>{goed ? '✓' : '✗'}</span>
              {tekst}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Stempel die er schuin op valt. */
export const Stempel = ({ tekst, vanaf = 10, top = 300, kleur = '#E8382B' }: { tekst: string; vanaf?: number; top?: number; kleur?: string }) => {
  const f = useCurrentFrame();
  if (f < vanaf) return null;
  const s = interpolate(f, [vanaf, vanaf + 5, vanaf + 9], [2.2, 0.94, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <div style={{ transform: `rotate(-8deg) scale(${s})`, border: `10px solid ${kleur}`, borderRadius: 14, padding: '6px 40px', fontFamily: SERIF, fontWeight: 800, fontSize: 130, letterSpacing: 8, color: kleur, opacity: 0.92, background: 'rgba(255,244,224,0.12)' }}>
        {tekst}
      </div>
    </div>
  );
};

/** Getal in het midden dat oploopt; met `streep` krijgt het een rode streep en valt het om. */
export const GrootGetal = ({ tot, a = 4, b = 70, streep = false, onder }: { tot: number; a?: number; b?: number; streep?: boolean; onder?: string }) => {
  const f = useCurrentFrame();
  const w = streep ? tot : Math.round(ease(f, a, b, 0, tot));
  const val = streep ? ease(f, 40, 62, 0, 1) : 0;
  const lijn = streep ? lin(f, 8, 22, 0, 1) : 0;
  return (
    <div style={{ position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ display: 'inline-block', position: 'relative', transform: `rotate(${val * 14}deg) translateY(${val * 60}px)`, opacity: 1 - val * 0.55, transformOrigin: '90% 100%' }}>
        <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 210, color: '#FFF4E0', WebkitTextStroke: '3px #4A2A0C', textShadow: '0 8px 24px rgba(0,0,0,0.7)' }}>{w.toLocaleString('en-US')}</div>
        {streep && <div style={{ position: 'absolute', left: -20, top: '52%', height: 22, width: `${lijn * 108}%`, background: '#E8382B', borderRadius: 8, transform: 'rotate(-6deg)' }} />}
      </div>
      {onder && <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 92, color: ORANJE, textShadow: '0 4px 14px rgba(0,0,0,0.8)', opacity: lin(f, 50, 62, 0, 1), marginTop: -10 }}>{onder}</div>}
    </div>
  );
};

/** Klein voorbehoud-label onder het jaartal ("according to Plutarch"). */
export const Voorbehoud = ({ tekst }: { tekst: string }) => (
  <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center' }}>
    <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 40, color: '#FFF4E0', background: 'rgba(28,26,22,0.7)', borderRadius: 10, padding: '4px 22px', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{tekst}</span>
  </div>
);

/** Twee kolommen "THE MOVIE" / "REALITY" boven een 3D-scène. */
export const FilmLabels = () => {
  const f = useCurrentFrame();
  const st = { fontFamily: SERIF, fontWeight: 800, fontSize: 64, letterSpacing: 4, color: '#FFF4E0', textShadow: '0 4px 16px rgba(0,0,0,0.8)' } as const;
  const sub = { fontFamily: SERIF, fontSize: 52, color: ORANJE, textShadow: '0 3px 10px rgba(0,0,0,0.8)' } as const;
  return (
    <>
      <div style={{ position: 'absolute', top: 70, left: 180, width: 600, textAlign: 'center', opacity: lin(f, 4, 12, 0, 1) }}>
        <div style={st}>THE MOVIE</div>
        <div style={sub}>300 Spartans</div>
      </div>
      <div style={{ position: 'absolute', top: 70, right: 180, width: 600, textAlign: 'center', opacity: lin(f, 20, 28, 0, 1) }}>
        <div style={st}>REALITY</div>
        <div style={sub}>~7,000 Greeks</div>
      </div>
    </>
  );
};

void Heuvels;

/** Klein vuurtje op een komfoor (zonder eigen lamp, die heeft de hal al). */
const VuurtjeK = ({ t: zaad }: { t: number }) => {
  const f = useCurrentFrame();
  const t = f / FPS + zaad;
  return (
    <>
      {[0, 1, 2].map((i) => {
        const k = 1 + Math.sin(t * 11 + i * 2) * 0.25;
        return <Blok key={i} p={[(i - 1) * 0.1, 1.12 * 1 + 0.1 * k, 0]} s={[0.12, 0.24 * k, 0.12]} c={i % 2 ? '#FFB347' : '#FF7A2A'} emissive={i % 2 ? '#FF9A2A' : '#FF5A1A'} />;
      })}
    </>
  );
};

/** Labeltje met een lijntje naar iets in beeld ("the 5 ephors", "you"). Verschijnt met een kleine sprong. */
export const Pijllabel = ({ tekst, x, y, naar, vanaf = 12 }: { tekst: string; x: number; y: number; naar: [number, number]; vanaf?: number }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [vanaf, vanaf + 6, vanaf + 10], [0, 1.1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lijn = interpolate(f, [vanaf + 4, vanaf + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (f < vanaf) return null;
  return (
    <>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <line x1={x} y1={y} x2={x + (naar[0] - x) * lijn} y2={y + (naar[1] - y) * lijn} stroke="#FFF4E0" strokeWidth="4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.6))' }} />
        {lijn > 0.95 && <circle cx={naar[0]} cy={naar[1]} r="8" fill={ORANJE} stroke="#FFF4E0" strokeWidth="3" />}
      </svg>
      <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -100%) scale(${s})`, transformOrigin: '50% 100%' }}>
        <div style={{ whiteSpace: 'nowrap', fontFamily: SERIF, fontWeight: 600, fontSize: 38, color: '#2A1607', background: '#FFF4E0', border: `3px solid ${ORANJE}`, borderRadius: 12, padding: '2px 16px 4px', boxShadow: '0 6px 14px rgba(0,0,0,0.35)' }}>{tekst}</div>
      </div>
    </>
  );
};
