import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from 'remotion';
import { ZonderOver } from '../lang/basis';
import { Afsluiter } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';
import {
  S_Alesia,
  S_Bevel,
  S_Dictator,
  S_Erfenis,
  S_Kring,
  S_Piraten,
  S_Rubicon,
  S_Samen,
  CAESAR_JONG,
  Straat,
  S_Tapijt,
  S_Veni,
  S_Ziener,
  T5_Titel,
} from '../lang/CaesarScenes';
import { Figuur } from './Figuur';

const S_Straat = () => (
  <Straat cam={[0.6, 1.6, 4, 0.2, 1.4, 1.5]} kijk={[0, 1.0, -2]}>
    <Figuur kleding={CAESAR_JONG} position={[0.2, 0, -2]} rotation={[0, 0.4, 0]} scale={0.62} pose={{ mond: 'lach' }} />
  </Straat>
);

/**
 * "What if you were Julius Caesar?" — trailer-short (9:16) bij lange video #03, in de "you"-vorm.
 * Hergebruikt de 3D-scènes van de lange video (hun 16:9-overlays staan uit via ZonderOver) met de HUD van de
 * What-if-shorts. Geen stem (geen credits), muziek = het Napoleon-stuk "ballingschap en laatste slag".
 */

type Scène = { C: () => React.ReactElement; duur: number; teller?: { label: string; waarde: string; pil?: string }; tekst: Deel[]; klank?: { src: string; vol: number; bij?: number; lus?: boolean }[] };

const SCÈNES: Scène[] = [
  { C: T5_Titel, duur: 120, teller: { label: 'Born', waarde: 'Rome', pil: '100 BC' }, tekst: [{ t: 'What if you were ' }, { t: 'Julius Caesar', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: S_Straat, duur: 115, tekst: [{ t: 'you grow up ' }, { t: 'broke', accent: true }, { t: ' in the backstreets' }], klank: [{ src: 'menigte', vol: 0.1, lus: true }] },
  { C: () => <S_Bevel nee />, duur: 115, teller: { label: 'Dictator Sulla', waarde: '"Divorce her"' }, tekst: [{ t: 'a dictator gives you an order. you say ' }, { t: 'no', accent: true }], klank: [{ src: 'inslag', vol: 0.18, bij: 20 }] },
  { C: () => <S_Piraten fase="lach" />, duur: 125, teller: { label: 'Ransom', waarde: '50 talents', pil: 'your own idea' }, tekst: [{ t: 'pirates kidnap you. you ' }, { t: 'raise', accent: true }, { t: ' your own ransom' }], klank: [{ src: 'zee', vol: 0.12, lus: true }, { src: 'munt', vol: 0.22, bij: 40 }] },
  { C: () => <S_Piraten fase="belofte" />, duur: 115, teller: { label: 'Held', waarde: '38 days' }, tekst: [{ t: 'you promise to come back and ' }, { t: 'kill them all', accent: true }], klank: [{ src: 'zee', vol: 0.1, lus: true }] },
  { C: () => <S_Alesia ringen={2} slag />, duur: 125, teller: { label: 'Alesia', waarde: '52 BC', pil: 'two walls' }, tekst: [{ t: 'you conquer all of ' }, { t: 'Gaul', accent: true }], klank: [{ src: 'menigte', vol: 0.14, lus: true }, { src: 'inslag', vol: 0.16, bij: 30 }] },
  { C: () => <S_Rubicon fase="teerling" />, duur: 120, teller: { label: 'The Rubicon', waarde: '49 BC' }, tekst: [{ t: '"let the ' }, { t: 'die', accent: true }, { t: ' be cast"' }], klank: [{ src: 'rivier', vol: 0.12, lus: true }] },
  { C: () => <S_Rubicon fase="over" />, duur: 110, teller: { label: 'Civil war', waarde: 'Rome' }, tekst: [{ t: 'you ' }, { t: 'cross', accent: true }], klank: [{ src: 'rivier', vol: 0.16, lus: true }, { src: 'inslag', vol: 0.2, bij: 6 }] },
  { C: S_Tapijt, duur: 120, teller: { label: 'Egypt', waarde: 'Cleopatra' }, tekst: [{ t: 'a queen arrives in a ' }, { t: 'bedding sack', accent: true }], klank: [{ src: 'glans', vol: 0.14, bij: 50 }] },
  { C: S_Veni, duur: 115, tekst: [{ t: 'I came. I saw. I ' }, { t: 'conquered', accent: true }], klank: [{ src: 'inslag', vol: 0.18, bij: 12 }, { src: 'inslag', vol: 0.18, bij: 34 }, { src: 'inslag', vol: 0.2, bij: 56 }] },
  { C: () => <S_Dictator koning />, duur: 115, teller: { label: 'February 44 BC', waarde: 'For life' }, tekst: [{ t: 'dictator ' }, { t: 'for life', accent: true }], klank: [{ src: 'glans', vol: 0.16, bij: 10 }] },
  { C: () => <S_Ziener />, duur: 110, teller: { label: 'Beware', waarde: '15 March' }, tekst: [{ t: 'a seer warns you about the ' }, { t: 'Ides of March', accent: true }], klank: [{ src: 'wind', vol: 0.06, lus: true }] },
  { C: () => <S_Kring fase="steek" />, duur: 120, teller: { label: 'Wounds', waarde: '23', pil: 'Brutus among them' }, tekst: [{ t: 'your friends stab you ' }, { t: '23 times', accent: true }], klank: [{ src: 'inslag', vol: 0.2, bij: 6 }] },
  { C: S_Erfenis, duur: 170, teller: { label: 'Caesar', waarde: 'Kaiser · Tsar' }, tekst: [{ t: 'your name becomes the word for ' }, { t: 'ruler', accent: true }], klank: [{ src: 'glans', vol: 0.14, bij: 30 }] },
];

const STARTS = SCÈNES.map((_, i) => SCÈNES.slice(0, i).reduce((x, s) => x + s.duur, 0));
export const CAESAR_TRAILER_DUUR = SCÈNES.reduce((a, s) => a + s.duur, 0);
const AFSLUITER_VANAF = CAESAR_TRAILER_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

export const WatAlsCaesarTrailer = ({ muziek = true }: { muziek?: boolean }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SCÈNES.map((s, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={s.duur}>
        <ZonderOver.Provider value>
          <s.C />
        </ZonderOver.Provider>
        {s.teller && <Teller label={s.teller.label} waarde={s.teller.waarde} pil={s.teller.pil} start={3} />}
        <Onderschrift start={9} delen={s.tekst} />
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
        <Audio src={sfx('whoosh')} volume={0.14} />
      </Sequence>
    ))}
    <Watermerk />
    {muziek && (
      <>
        <Audio src={staticFile('lokaal/caesar-muziek/m5.mp3')} volume={(fr) => interpolate(fr, [0, 15, 1060, 1100], [0, 0.5, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
        <Sequence from={1030}>
          <Audio src={staticFile('lokaal/caesar-muziek/m10.mp3')} volume={(fr) => interpolate(fr, [0, 75, CAESAR_TRAILER_DUUR - 1030 - 60, CAESAR_TRAILER_DUUR - 1030], [0, 0.5, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
        </Sequence>
      </>
    )}
    <Sequence from={AFSLUITER_VANAF}>
      <Afsluiter />
      <Audio src={sfx('afsluiter')} volume={0.2} />
    </Sequence>
  </AbsoluteFill>
);
