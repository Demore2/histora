import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from 'remotion';
import { ZonderOver } from '../lang/basis';
import { OmslagCaesar } from './Omslagen';
import {
  C_Alesia,
  C_Belofte,
  C_Bevel,
  C_Brutus,
  C_Dictator,
  C_Erfenis,
  C_Gevangen,
  C_Grap,
  C_Kring,
  C_Koning,
  C_Nee,
  C_NietGrap,
  C_Over,
  C_Overgave,
  C_Subura,
  C_Teerling,
  C_Tapijt,
  C_Toga,
  C_Twintig,
  C_Veni,
  C_Vijftig,
} from './CaesarShortScenes';
import { Afsluiter } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';

/**
 * "What if you were Julius Caesar?" — Instagram/TikTok-short (9:16, ~75 s) uit de 3D-scènes van lange video #03, in het
 * concept van de What-if-shorts (Saladin): géén stem, korte "you"-regels in beeld, tellers, effecten en het nummer
 * "Amour plastique" eronder (Instagram flagde dat bij de What-ifs niet).
 */

type Scène = { C: () => React.ReactElement; duur: number; teller?: { label: string; waarde: string; pil?: string }; tekst: Deel[]; klank?: { src: string; vol: number; bij?: number; lus?: boolean }[] };

const SCÈNES: Scène[] = [
  { C: C_Subura, duur: 120, teller: { label: 'Born', waarde: 'Rome', pil: '100 BC' }, tekst: [{ t: 'What if you were ' }, { t: 'Julius Caesar', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: C_Bevel, duur: 110, teller: { label: 'Dictator Sulla', waarde: '"Divorce her"' }, tekst: [{ t: 'a dictator orders you to ' }, { t: 'divorce', accent: true }, { t: ' your wife' }], klank: [{ src: 'tik', vol: 0.2, bij: 20 }] },
  { C: C_Nee, duur: 90, tekst: [{ t: 'you say ' }, { t: 'no', accent: true }], klank: [{ src: 'inslag', vol: 0.2, bij: 14 }] },
  { C: C_Gevangen, duur: 110, tekst: [{ t: 'at 25, ' }, { t: 'pirates', accent: true }, { t: ' kidnap you' }], klank: [{ src: 'zee', vol: 0.12, lus: true }, { src: 'inslag', vol: 0.16, bij: 30 }] },
  { C: C_Twintig, duur: 110, teller: { label: 'Ransom', waarde: '20 talents' }, tekst: [{ t: 'they ask ' }, { t: '20 talents', accent: true }, { t: ' of silver' }], klank: [{ src: 'zee', vol: 0.1, lus: true }, { src: 'munt', vol: 0.22, bij: 30 }] },
  { C: C_Vijftig, duur: 115, teller: { label: 'Ransom', waarde: '50 talents', pil: 'your own idea' }, tekst: [{ t: 'you laugh: "I\'m worth at least ' }, { t: '50', accent: true }, { t: '"' }], klank: [{ src: 'zee', vol: 0.1, lus: true }, { src: 'munt', vol: 0.22, bij: 45 }] },
  { C: C_Belofte, duur: 115, teller: { label: 'Held', waarde: '38 days' }, tekst: [{ t: 'you promise to come back and ' }, { t: 'kill them all', accent: true }], klank: [{ src: 'zee', vol: 0.08, lus: true }] },
  { C: C_Grap, duur: 90, tekst: [{ t: 'they think it\'s a ' }, { t: 'joke', accent: true }], klank: [{ src: 'zee', vol: 0.08, lus: true }] },
  { C: C_NietGrap, duur: 105, tekst: [{ t: 'it ' }, { t: 'isn\'t', accent: true }], klank: [{ src: 'zee', vol: 0.08, lus: true }, { src: 'inslag', vol: 0.2, bij: 12 }] },
  { C: C_Alesia, duur: 120, teller: { label: 'Alesia', waarde: '52 BC', pil: 'two walls' }, tekst: [{ t: 'you fight between ' }, { t: 'two armies', accent: true }], klank: [{ src: 'menigte', vol: 0.16, lus: true }, { src: 'inslag', vol: 0.18, bij: 30 }] },
  { C: C_Overgave, duur: 105, teller: { label: 'Gaul', waarde: 'Conquered' }, tekst: [{ t: 'and you ' }, { t: 'win', accent: true }], klank: [{ src: 'wind', vol: 0.06, lus: true }, { src: 'val', vol: 0.18, bij: 30 }] },
  { C: C_Teerling, duur: 120, teller: { label: 'The Rubicon', waarde: '49 BC', pil: 'no army may cross' }, tekst: [{ t: '"let the ' }, { t: 'die', accent: true }, { t: ' be cast"' }], klank: [{ src: 'rivier', vol: 0.12, lus: true }, { src: 'tik', vol: 0.3, bij: 40 }] },
  { C: C_Over, duur: 100, teller: { label: 'Civil war', waarde: 'Rome' }, tekst: [{ t: 'you ' }, { t: 'cross', accent: true }], klank: [{ src: 'rivier', vol: 0.16, lus: true }, { src: 'inslag', vol: 0.2, bij: 6 }] },
  { C: C_Tapijt, duur: 120, teller: { label: 'Egypt', waarde: 'Cleopatra' }, tekst: [{ t: 'a queen arrives in a ' }, { t: 'bedding sack', accent: true }], klank: [{ src: 'glans', vol: 0.14, bij: 50 }] },
  { C: C_Veni, duur: 115, tekst: [{ t: 'I came. I saw. I ' }, { t: 'conquered', accent: true }], klank: [{ src: 'inslag', vol: 0.18, bij: 12 }, { src: 'inslag', vol: 0.18, bij: 34 }, { src: 'inslag', vol: 0.2, bij: 56 }] },
  { C: C_Dictator, duur: 105, teller: { label: 'February 44 BC', waarde: 'For life' }, tekst: [{ t: 'dictator ' }, { t: 'for life', accent: true }], klank: [{ src: 'glans', vol: 0.16, bij: 10 }] },
  { C: C_Koning, duur: 105, tekst: [{ t: 'but Rome ' }, { t: 'hates kings', accent: true }], klank: [{ src: 'inslag', vol: 0.18, bij: 16 }] },
  { C: C_Kring, duur: 105, teller: { label: '15 March', waarde: 'The Ides' }, tekst: [{ t: 'your senators ' }, { t: 'surround', accent: true }, { t: ' you' }], klank: [{ src: 'inslag', vol: 0.22, bij: 8 }] },
  { C: C_Brutus, duur: 110, tekst: [{ t: 'then you see ' }, { t: 'Brutus', accent: true }, { t: ' among them' }], klank: [{ src: 'val', vol: 0.16, bij: 50 }] },
  { C: C_Toga, duur: 110, teller: { label: 'Wounds', waarde: '23', pil: 'only one deadly' }, tekst: [{ t: '23', accent: true }, { t: ' knives' }], klank: [{ src: 'tik', vol: 0.18, bij: 14 }] },
  { C: C_Erfenis, duur: 175, tekst: [{ t: 'your name becomes the word for ' }, { t: 'ruler', accent: true }], klank: [{ src: 'glans', vol: 0.14, bij: 30 }] },
];

const STARTS = SCÈNES.map((_, i) => SCÈNES.slice(0, i).reduce((x, s) => x + s.duur, 0));
export const CAESAR_SHORT_DUUR = SCÈNES.reduce((a, s) => a + s.duur, 0);
const AFSLUITER_VANAF = CAESAR_SHORT_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

export const WatAlsCaesarShort = ({ muziek = true }: { muziek?: boolean }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    {SCÈNES.map((s, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={s.duur}>
        <ZonderOver.Provider value>
          <s.C />
        </ZonderOver.Provider>
        {s.teller && <Teller label={s.teller.label} waarde={s.teller.waarde} pil={s.teller.pil} start={3} />}
        <Onderschrift start={9} delen={s.tekst} top={1330} />
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
        startFrom={14 * 30}
        volume={(fr) => interpolate(fr, [0, 10, CAESAR_SHORT_DUUR - 45, CAESAR_SHORT_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
    <Sequence from={AFSLUITER_VANAF}>
      <Afsluiter />
      <Audio src={sfx('afsluiter')} volume={0.22} />
    </Sequence>
    {/* de staande omslag in de eerste 3 frames: zo kiest Instagram hem vanzelf */}
    <Sequence from={0} durationInFrames={3}>
      <OmslagCaesar />
    </Sequence>
  </AbsoluteFill>
);
