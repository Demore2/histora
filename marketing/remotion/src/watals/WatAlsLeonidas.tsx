import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { ease, lin } from '../lang/basis';
import { FiguurL, LEONIDAS_JONG, LERAAR, MOEDER, Pas, Sparta } from '../lang/LeonidasKit';
import { Blok, omhoog } from './Figuur';
import { ZonderOver } from '../lang/basis';
import { S_Agoge, S_Broers, S_Keuring, S_KroonValt, T0_Knal } from '../lang/LeonidasScenes';
import { Helm, S_Delphi, S_Dienekes, S_Gorgo, S_Leger, S_Mars, S_Nachtpad, S_Pas } from '../lang/LeonidasScenes2';
import { Afsluiter, MAX_SHORT_FRAMES } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';

/**
 * "What if you were Leonidas?" — What-if-short (9:16, < 58 s) uit de 3D-scènes van lange video #04, zoals Baibars:
 * de 16:9-overlays staan uit via ZonderOver, de HUD van de What-ifs komt erover. Geen stem.
 * Gaat op 26 nov om 17:00 uit, een uur na de lange video (16:00), die als gerelateerde video eronder hangt.
 * Geen lichaam bij de dood: de koningshelm in het stof.
 */

type Klank = { src: string; vol: number; bij?: number; lus?: boolean };
type Scène = { C: React.FC; duur: number; teller?: { label: string; waarde: string; pil?: string }; tekst: Deel[]; klank?: Klank[] };

/** S_Weg uit de lange video, maar staand gekadreerd: moeder, leraar en jongen passen allemaal in 9:16. */
const S_WegStaand = () => {
  const f = useCurrentFrame();
  const loop = ease(f, 10, 115, 0, 0.35);
  return (
    <Sparta cam={[-0.4, 2.1, 11.5, -0.4, 1.9, 10]} kijk={[-0.5, 1.3, -1.4]} duur={115}>
      <Blok p={[-2.6, 1.1, -3.6]} s={[3, 2.2, 2.6]} c="#D8C7A2" rough={1} />
      <Blok p={[-2.6, 2.32, -3.6]} s={[3.3, 0.25, 2.9]} c="#A0553A" />
      <FiguurL kleding={MOEDER} haar="lang" position={[-1.9, 0, -2.2]} rotation={[0, 0.6, 0]} pose={{ armR: omhoog(), traan: lin(f, 20, 80, 0, 1), wenk: -0.6 }} />
      <FiguurL kleding={LERAAR} baard position={[-0.4 + loop, 0, -1.2]} rotation={[0, 1.4, 0]} />
      <FiguurL kleding={LEONIDAS_JONG} haar="kaal" scale={0.62} position={[0.0 + loop, 0, -0.4]} rotation={[0, 1.1, 0]} pose={{ wenk: -0.3, mond: 'dicht', hoofd: [0, -0.9, 0] }} />
    </Sparta>
  );
};

/** De koningshelm in het stof, staand: verder weg zodat de kam niet uit beeld valt. Geen lichaam in beeld. */
const S_HelmStaand = () => {
  const f = useCurrentFrame();
  return (
    <Pas tijd="avond" muur={false} damp={false} cam={[0.4, 1.5, 5.6, 0.35, 1.2, 4.4]} kijk={[0, 0.5, 0]} scherpte={3.4} duur={190}>
      <group position={[0, 0.38, 0]} rotation={[0, -0.35 + f * 0.0006, 0.42]}>
        <Helm />
      </group>
    </Pas>
  );
};

const SCÈNES: Scène[] = [
  { C: T0_Knal, duur: 120, teller: { label: 'Held the pass', waarde: '3 days', pil: 'Thermopylae, 480 BC' }, tekst: [{ t: 'What if you were ' }, { t: 'Leonidas', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: () => <S_Keuring fase="test" />, duur: 115, teller: { label: 'Age', waarde: '0', pil: 'Sparta, c. 540 BC' }, tekst: [{ t: 'the elders check if you are strong enough to ' }, { t: 'live', accent: true }], klank: [{ src: 'vuur', vol: 0.05, lus: true }, { src: 'tik', vol: 0.18, bij: 50 }] },
  { C: S_WegStaand, duur: 115, teller: { label: 'Age', waarde: '7', pil: 'the agoge' }, tekst: [{ t: 'they take you from your ' }, { t: 'mother', accent: true }], klank: [{ src: 'wind', vol: 0.08, lus: true }, { src: 'val', vol: 0.14, bij: 40 }] },
  { C: () => <S_Agoge fase="eten" />, duur: 115, teller: { label: 'Food', waarde: 'Barely' }, tekst: [{ t: 'they starve you on purpose, so you learn to ' }, { t: 'steal', accent: true }], klank: [{ src: 'wind', vol: 0.06, lus: true }, { src: 'tik', vol: 0.16, bij: 60 }] },
  { C: () => <S_Broers fase="jij" />, duur: 115, teller: { label: 'In line for the throne', waarde: '#3' }, tekst: [{ t: 'the third son. nobody expects you to ' }, { t: 'rule', accent: true }], klank: [{ src: 'glans', vol: 0.12, bij: 30 }] },
  { C: () => <S_Gorgo fase="bruiloft" />, duur: 115, teller: { label: 'Married', waarde: 'Gorgo' }, tekst: [{ t: 'you marry the sharpest mind in ' }, { t: 'Sparta', accent: true }], klank: [{ src: 'menigte', vol: 0.08, lus: true }, { src: 'glans', vol: 0.14, bij: 40 }] },
  { C: S_KroonValt, duur: 115, teller: { label: 'Age', waarde: '~50', pil: 'King of Sparta, c. 490 BC' }, tekst: [{ t: 'your brothers die. the crown lands on ' }, { t: 'you', accent: true }], klank: [{ src: 'val', vol: 0.18, bij: 24 }, { src: 'glans', vol: 0.12, bij: 30 }] },
  { C: S_Leger, duur: 120, teller: { label: 'Persian army', waarde: '150,000+', pil: 'modern estimate' }, tekst: [{ t: 'Xerxes invades with one of the ' }, { t: 'biggest armies', accent: true }, { t: ' ever' }], klank: [{ src: 'menigte', vol: 0.12, lus: true }, { src: 'inslag', vol: 0.2, bij: 12 }] },
  { C: () => <S_Delphi fase="orakel" />, duur: 115, teller: { label: 'The oracle', waarde: 'Delphi' }, tekst: [{ t: 'a king must die, or Sparta ' }, { t: 'falls', accent: true }], klank: [{ src: 'vuur', vol: 0.06, lus: true }, { src: 'glans', vol: 0.14, bij: 30 }] },
  { C: S_Mars, duur: 115, teller: { label: 'Your army', waarde: '300', pil: '+ ~7,000 Greek allies' }, tekst: [{ t: 'you march north with ' }, { t: '300', accent: true }, { t: ' men' }], klank: [{ src: 'menigte', vol: 0.08, lus: true }, { src: 'inslag', vol: 0.16, bij: 20 }] },
  { C: S_Dienekes, duur: 120, teller: { label: 'Day', waarde: '1' }, tekst: [{ t: '"their arrows will block the sun." then we fight in the ' }, { t: 'shade', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }, { src: 'inslag', vol: 0.18, bij: 15 }] },
  { C: S_Nachtpad, duur: 115, teller: { label: 'Day', waarde: '2', pil: 'Ephialtes' }, tekst: [{ t: 'a local shows the Persians a path ' }, { t: 'behind you', accent: true }], klank: [{ src: 'wind', vol: 0.08, lus: true }, { src: 'val', vol: 0.16, bij: 50 }] },
  { C: () => <S_Pas fase="blijven" />, duur: 120, teller: { label: 'Day', waarde: '3', pil: '300 Spartans, 700 Thespians' }, tekst: [{ t: 'you send the others home. and you ' }, { t: 'stay', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }, { src: 'inslag', vol: 0.2, bij: 20 }] },
  { C: S_HelmStaand, duur: 190, teller: { label: 'A year later', waarde: 'Greece wins', pil: 'Salamis & Plataea' }, tekst: [{ t: 'you fall. but 2,500 years later, they still say your ' }, { t: 'name', accent: true }], klank: [{ src: 'wind', vol: 0.12, lus: true }, { src: 'val', vol: 0.18, bij: 10 }] },
];

const STARTS = SCÈNES.map((_, i) => SCÈNES.slice(0, i).reduce((x, s) => x + s.duur, 0));
export const LEONIDAS_SHORT_DUUR = SCÈNES.reduce((a, s) => a + s.duur, 0);
export const LEONIDAS_SHORT_STARTS = STARTS;
if (LEONIDAS_SHORT_DUUR > MAX_SHORT_FRAMES) throw new Error(`LEONIDAS_SHORT_DUUR is ${LEONIDAS_SHORT_DUUR} frames, max ${MAX_SHORT_FRAMES} (58 s)`);
const AFSLUITER_VANAF = LEONIDAS_SHORT_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

export const WatAlsLeonidas = ({ muziek = true, muziekVanaf = 14 }: { muziek?: boolean; muziekVanaf?: number }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SCÈNES.map((s, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={s.duur}>
        <ZonderOver.Provider value>
          <s.C />
        </ZonderOver.Provider>
        {s.teller && <Teller label={s.teller.label} waarde={s.teller.waarde} pil={s.teller.pil} start={i === 0 ? 0 : 3} />}
        <Onderschrift start={i === 0 ? 0 : 9} delen={s.tekst} top={1330} />
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
    {STARTS.slice(1).map((st, i) => (
      <Sequence key={`w${i}`} from={Math.max(0, st - 8)} durationInFrames={20}>
        <Audio src={sfx('whoosh')} volume={0.1} />
      </Sequence>
    ))}
    <Watermerk />
    {muziek && (
      <Audio
        src={staticFile('lokaal/amour-plastique.mp3')}
        startFrom={Math.round(muziekVanaf * 30)}
        volume={(fr) => interpolate(fr, [0, 10, LEONIDAS_SHORT_DUUR - 45, LEONIDAS_SHORT_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
    <Sequence from={AFSLUITER_VANAF}>
      <Afsluiter />
      <Audio src={sfx('afsluiter')} volume={0.22} />
    </Sequence>
  </AbsoluteFill>
);
