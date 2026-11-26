import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Anatolie, FiguurA, KIND_P, MEISJE_P } from '../lang/AtaturkKit';
import { Koren } from '../lang/StalinKit';
import { Blok, omhoog } from './Figuur';
import { ZonderOver } from '../lang/basis';
import { S_Bal, S_Horloge, S_Kemal, S_SalonikiVal, S_Sterven, S_TeaserVader, T0_Knal } from '../lang/AtaturkScenes';
import { S_Ataturk, S_Doodvonnis, S_Krijtbord, S_Middellandse, S_Stil, S_Vrouwen } from '../lang/AtaturkScenes2';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';
import { hookVolgorde, knippen, startsVoor, type Hook, type HookPlan } from './hooks';

/**
 * "What if you were Atatürk?" — What-if-short (9:16, < 58 s) uit de 3D-scènes van lange video #10, zoals Leonidas:
 * de 16:9-overlays staan uit via ZonderOver, de HUD van de What-ifs komt erover. Geen stem.
 * Gaat op vr 27 nov om 17:00 uit, een uur na de lange video (16:00), die als gerelateerde video eronder hangt.
 * Respectvol (wet 5816); het einde is de minuut stilte om 9:05.
 */

type Klank = { src: string; vol: number; bij?: number; lus?: boolean };
type Scène = { C: React.FC; duur: number; teller?: { label: string; waarde: string; pil?: string }; tekst: Deel[]; klank?: Klank[] };

/** De kraaien, staand: Mustafa en zijn zusje allebei in beeld. */
const S_KraaienStaand = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Anatolie cam={[0.6, 1.5, 6.4, 0.4, 1.5, 5.6]} kijk={[0, 1.1, -1]} grond="#8A8A58">
      <Koren z={-3} rijen={5} kleur="#6E8A3E" />
      <FiguurA {...KIND_P} hoofdExtra={undefined} position={[-0.45, 0, 0.4]} rotation={[0, 0.2, 0]} pose={{ mond: 'open', armR: { schouder: [-2.6 + Math.sin(t * 8) * 0.4, 0, -0.2] }, armL: { schouder: [-2.4 - Math.sin(t * 8) * 0.4, 0, 0.2] } }} />
      <FiguurA {...MEISJE_P} position={[0.5, 0, 0.2]} rotation={[0, -0.2, 0]} pose={{ mond: 'lach', armR: omhoog() }} />
      {Array.from({ length: 6 }, (_, i) => {
        const k = Math.min(1, Math.max(0, (f - 10 - i * 4) / 60));
        return (
          <group key={i} position={[-1.2 + i * 0.5 + k * (i - 2.5) * 0.8, 1.4 + k * 4 + Math.sin(t * 9 + i) * 0.1, -2 - k * 5]}>
            <Blok p={[0, 0, 0]} s={[0.24, 0.14, 0.12]} c="#141216" />
            <Blok p={[0, 0.04, 0]} s={[0.1, 0.03, 0.7 * (0.5 + Math.abs(Math.sin(t * 12 + i)))]} c="#1E1A20" />
          </group>
        );
      })}
    </Anatolie>
  );
};

const SCÈNES: Scène[] = [
  { C: T0_Knal, duur: 120, teller: { label: 'Founded', waarde: 'a country', pil: 'Turkey, 1923' }, tekst: [{ t: 'What if you were ' }, { t: 'Atatürk', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: S_TeaserVader, duur: 115, teller: { label: 'Age', waarde: '7', pil: 'Salonica, 1888' }, tekst: [{ t: 'your father dies and the money ' }, { t: 'runs out', accent: true }], klank: [{ src: 'vuur', vol: 0.04, lus: true }] },
  { C: S_KraaienStaand, duur: 115, teller: { label: 'School', waarde: 'none' }, tekst: [{ t: 'you chase crows on your uncle’s ' }, { t: 'farm', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }] },
  { C: S_Kemal, duur: 115, teller: { label: 'Age', waarde: '12', pil: 'military school' }, tekst: [{ t: 'your teacher names you Kemal: ' }, { t: 'perfection', accent: true }], klank: [{ src: 'glans', vol: 0.16, bij: 40 }] },
  { C: S_SalonikiVal, duur: 115, teller: { label: 'Balkan Wars', waarde: '1912' }, tekst: [{ t: 'your hometown is handed to ' }, { t: 'Greece', accent: true }], klank: [{ src: 'wind', vol: 0.08, lus: true }] },
  { C: S_Bal, duur: 115, teller: { label: 'Sofia', waarde: '1913', pil: 'military attaché' }, tekst: [{ t: 'meanwhile you learn to ' }, { t: 'dance', accent: true }], klank: [{ src: 'menigte', vol: 0.06, lus: true }, { src: 'glans', vol: 0.12, bij: 20 }] },
  { C: S_Sterven, duur: 120, teller: { label: 'Gallipoli', waarde: '1915' }, tekst: [{ t: '"I don’t order you to attack. I order you to ' }, { t: 'die', accent: true }, { t: '."' }], klank: [{ src: 'wind', vol: 0.08, lus: true }, { src: 'inslag', vol: 0.2, bij: 10 }] },
  { C: S_Horloge, duur: 115, teller: { label: 'Shrapnel', waarde: 'chest', pil: 'August 1915' }, tekst: [{ t: 'it hits your ' }, { t: 'pocket watch', accent: true }], klank: [{ src: 'inslag', vol: 0.26, bij: 4 }, { src: 'tik', vol: 0.16, bij: 50 }] },
  { C: S_Doodvonnis, duur: 115, teller: { label: '1920', waarde: 'sentenced', pil: 'by the Sultan' }, tekst: [{ t: 'you defy the Sultan. he sentences you to ' }, { t: 'death', accent: true }], klank: [{ src: 'inslag', vol: 0.24, bij: 20 }] },
  { C: S_Vrouwen, duur: 115, teller: { label: 'Your army', waarde: 'no boots', pil: 'War of Independence' }, tekst: [{ t: 'women carry the shells to the ' }, { t: 'front', accent: true }], klank: [{ src: 'wind', vol: 0.14, lus: true }] },
  { C: S_Middellandse, duur: 120, teller: { label: 'August 1922', waarde: 'attack' }, tekst: [{ t: '"Armies, your first goal is the ' }, { t: 'Mediterranean', accent: true }, { t: '!"' }], klank: [{ src: 'inslag', vol: 0.26, bij: 6 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: S_Krijtbord, duur: 115, teller: { label: '1928', waarde: 'A B C', pil: 'a new alphabet' }, tekst: [{ t: 'you teach the new letters ' }, { t: 'yourself', accent: true }], klank: [{ src: 'tik', vol: 0.12, bij: 30 }, { src: 'tik', vol: 0.12, bij: 40 }] },
  { C: S_Ataturk, duur: 115, teller: { label: 'New surname', waarde: 'Atatürk', pil: 'Father of the Turks' }, tekst: [{ t: 'parliament gives you a new ' }, { t: 'name', accent: true }], klank: [{ src: 'glans', vol: 0.18, bij: 20 }] },
  { C: S_Stil, duur: 190, teller: { label: 'Every 10 November', waarde: '09:05' }, tekst: [{ t: 'and at 9:05, the whole country still ' }, { t: 'stops', accent: true }, { t: ' for you' }], klank: [{ src: 'wind', vol: 0.12, lus: true }] },
];

const STARTS = SCÈNES.map((_, i) => SCÈNES.slice(0, i).reduce((x, s) => x + s.duur, 0));
export const ATATURK_SHORT_DUUR = SCÈNES.reduce((a, s) => a + s.duur, 0);
export const ATATURK_SHORT_STARTS = STARTS;
/** Trial-reel-hooks: B = de aanval naar de Middellandse Zee (de top), C = "I order you to die" (schokdetail). */
export const ATATURK_HOOKS: HookPlan = { B: 10, C: 6 };
if (ATATURK_SHORT_DUUR > MAX_SHORT_FRAMES) throw new Error(`ATATURK_SHORT_DUUR is ${ATATURK_SHORT_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = ATATURK_SHORT_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

export const WatAlsAtaturk = ({ muziek = true, muziekVanaf = 14, hook = 'A' }: { muziek?: boolean; muziekVanaf?: number; hook?: Hook }) => {
  const starts = startsVoor(SCÈNES.map((s) => s.duur), hookVolgorde(SCÈNES.length, ATATURK_HOOKS, hook));
  return (
  <AbsoluteFill style={{ background: '#000' }}>
    {SCÈNES.map((s, i) => (
      <Sequence key={i} from={starts[i]} durationInFrames={s.duur}>
        <ZonderOver.Provider value>
          <s.C />
        </ZonderOver.Provider>
        {s.teller && <Teller label={s.teller.label} waarde={s.teller.waarde} pil={s.teller.pil} start={starts[i] === 0 ? 0 : 3} />}
        <Onderschrift start={starts[i] === 0 ? 0 : 9} delen={s.tekst} top={1330} />
        {s.klank?.map((k, j) =>
          k.lus ? (
            <Audio key={j} src={sfx(k.src)} loop volume={(fr) => interpolate(fr, [0, 8, s.duur - 8, s.duur], [0, k.vol, k.vol, 0], { extrapolateRight: 'clamp' })} />
          ) : (
            <Sequence key={j} from={k.bij ?? 0} durationInFrames={60}>
              <Audio src={sfx(k.src)} volume={k.vol} />
            </Sequence>
          ),
        )}
      </Sequence>
    ))}
    {knippen(starts).map((st, i) => (
      <Sequence key={`w${i}`} from={Math.max(0, st - 8)} durationInFrames={20}>
        <Audio src={sfx('whoosh')} volume={0.1} />
      </Sequence>
    ))}
    <Watermerk />
    {muziek && (
      <Audio
        src={staticFile('lokaal/amour-plastique.mp3')}
        startFrom={Math.round(muziekVanaf * 30)}
        volume={(fr) => interpolate(fr, [0, 10, ATATURK_SHORT_DUUR - 45, ATATURK_SHORT_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
    <Sequence from={AFSLUITER_VANAF}>
      <Afsluiter />
      <Audio src={sfx('afsluiter')} volume={0.22} />
    </Sequence>
  </AbsoluteFill>
  );
};
