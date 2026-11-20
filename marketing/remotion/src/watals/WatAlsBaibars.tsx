import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from 'remotion';
import { ZonderOver } from '../lang/basis';
import {
  S_Aydakin,
  S_Boeien,
  S_Damaged,
  S_Damiate,
  S_Daken,
  S_Hama,
  S_KindClose,
  S_Oog,
  S_Peuter,
  S_PoortOpen,
  S_Rij,
  S_Stofwolk,
  S_Training,
  S_Verkocht,
} from '../lang/BaibarsScenes';
import { S_GezantRit, S_Truc, S_Wereld } from '../lang/BaibarsScenes2';
import { S_Kiezen, S_Koffiehuis, S_Kumis, S_Valk, S_Vervalsen } from '../lang/BaibarsScenes3';
import { Afsluiter } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';
import { OmslagBaibars } from './Omslagen';

/**
 * "What if you were Baibars?" — Instagram/TikTok-short (9:16, ~80 s) uit de 3D-scènes van lange video #05, in het
 * concept van de What-if-shorts (Saladin, Caesar): géén stem, korte "you"-regels in beeld, tellers, effecten.
 * De moord op Qutuz blijft buiten beeld (twee handen + valk), net als in de lange video.
 */

type Scène = { C: React.FC; duur: number; teller?: { label: string; waarde: string; pil?: string }; tekst: Deel[]; klank?: { src: string; vol: number; bij?: number; lus?: boolean }[] };

const SCÈNES: Scène[] = [
  { C: S_KindClose, duur: 120, teller: { label: 'Born', waarde: 'The steppe', pil: 'c. 1223' }, tekst: [{ t: 'What if you were ' }, { t: 'Baibars', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: S_Peuter, duur: 100, tekst: [{ t: 'you ride before you can ' }, { t: 'walk', accent: true }], klank: [{ src: 'wind', vol: 0.08, lus: true }] },
  { C: S_Stofwolk, duur: 105, teller: { label: 'Age', waarde: '~14' }, tekst: [{ t: 'then the ' }, { t: 'Mongols', accent: true }, { t: ' come' }], klank: [{ src: 'wind', vol: 0.1, lus: true }, { src: 'val', vol: 0.18, bij: 30 }] },
  { C: S_Verkocht, duur: 105, teller: { label: 'Status', waarde: 'Slave' }, tekst: [{ t: 'you are caught and ' }, { t: 'sold', accent: true }], klank: [{ src: 'munt', vol: 0.22, bij: 40 }] },
  { C: S_Oog, duur: 95, tekst: [{ t: 'but one eye has a ' }, { t: 'white spot', accent: true }], klank: [{ src: 'glans', vol: 0.12, bij: 20 }] },
  { C: S_Hama, duur: 110, teller: { label: 'Hama', waarde: 'Returned' }, tekst: [{ t: 'a buyer gives you ' }, { t: 'back', accent: true }], klank: [{ src: 'menigte', vol: 0.1, lus: true }, { src: 'tik', vol: 0.22, bij: 60 }] },
  { C: S_Damaged, duur: 90, tekst: [{ t: 'damaged', accent: true }, { t: ' goods' }], klank: [{ src: 'inslag', vol: 0.2, bij: 10 }] },
  { C: S_Aydakin, duur: 110, teller: { label: 'Price', waarde: '800', pil: 'silver coins' }, tekst: [{ t: 'an emir pays ' }, { t: '800', accent: true }, { t: ' silver coins' }], klank: [{ src: 'munt', vol: 0.22, bij: 20 }, { src: 'munt', vol: 0.22, bij: 55 }] },
  { C: S_Rij, duur: 105, teller: { label: 'Mamluk', waarde: '"Owned"' }, tekst: [{ t: 'you become a ' }, { t: 'Mamluk', accent: true }], klank: [{ src: 'tik', vol: 0.18, bij: 20 }] },
  { C: S_Training, duur: 110, tekst: [{ t: 'you shoot ' }, { t: 'backwards', accent: true }, { t: ' at a gallop' }], klank: [{ src: 'wind', vol: 0.08, lus: true }, { src: 'inslag', vol: 0.18, bij: 50 }] },
  { C: S_Damiate, duur: 110, teller: { label: '1249', waarde: 'Crusade', pil: 'Louis IX of France' }, tekst: [{ t: 'a ' }, { t: 'king', accent: true }, { t: ' invades Egypt' }], klank: [{ src: 'zee', vol: 0.12, lus: true }] },
  { C: S_PoortOpen, duur: 105, teller: { label: 'Mansoura', waarde: '1250' }, tekst: [{ t: 'you open the ' }, { t: 'gates', accent: true }], klank: [{ src: 'inslag', vol: 0.18, bij: 20 }] },
  { C: S_Daken, duur: 105, tekst: [{ t: 'the streets become a ' }, { t: 'trap', accent: true }], klank: [{ src: 'menigte', vol: 0.14, lus: true }, { src: 'inslag', vol: 0.16, bij: 40 }] },
  { C: S_Boeien, duur: 105, teller: { label: 'You', waarde: 'In your 20s' }, tekst: [{ t: 'the king ends up in ' }, { t: 'chains', accent: true }], klank: [{ src: 'tik', vol: 0.2, bij: 30 }] },
  { C: S_GezantRit, duur: 105, teller: { label: '1258', waarde: 'Baghdad falls' }, tekst: [{ t: 'the Mongols want ' }, { t: 'Egypt', accent: true }, { t: ' next' }], klank: [{ src: 'val', vol: 0.2, bij: 20 }] },
  { C: S_Truc, duur: 110, teller: { label: 'Ain Jalut', waarde: '1260' }, tekst: [{ t: 'you ' }, { t: 'fake', accent: true }, { t: ' a retreat' }], klank: [{ src: 'wind', vol: 0.08, lus: true }, { src: 'inslag', vol: 0.18, bij: 40 }] },
  { C: S_Wereld, duur: 115, teller: { label: 'Mongols', waarde: 'Beaten', pil: 'first great defeat' }, tekst: [{ t: 'and the Mongols ' }, { t: 'lose', accent: true }], klank: [{ src: 'inslag', vol: 0.22, bij: 10 }, { src: 'glans', vol: 0.14, bij: 40 }] },
  { C: S_Valk, duur: 105, tekst: [{ t: 'on a hunt, you ' }, { t: 'betray', accent: true }, { t: ' your sultan...' }], klank: [{ src: 'val', vol: 0.18, bij: 50 }] },
  { C: S_Kiezen, duur: 110, teller: { label: 'Sultan', waarde: '1260' }, tekst: [{ t: '...and his ' }, { t: 'throne', accent: true }], klank: [{ src: 'menigte', vol: 0.14, lus: true }, { src: 'glans', vol: 0.16, bij: 20 }] },
  { C: S_Vervalsen, duur: 110, teller: { label: 'Krak des Chevaliers', waarde: '1271' }, tekst: [{ t: 'one ' }, { t: 'fake letter', accent: true }, { t: ' takes a castle' }], klank: [{ src: 'tik', vol: 0.2, bij: 40 }] },
  { C: S_Kumis, duur: 105, teller: { label: 'Damascus', waarde: '1277' }, tekst: [{ t: 'one cup of ' }, { t: 'mare\'s milk', accent: true }, { t: ' ends it' }], klank: [{ src: 'val', vol: 0.18, bij: 60 }] },
  { C: S_Koffiehuis, duur: 175, tekst: [{ t: 'the boy they sent back becomes a ' }, { t: 'legend', accent: true }], klank: [{ src: 'vuur', vol: 0.1, lus: true }, { src: 'glans', vol: 0.14, bij: 30 }] },
];

const STARTS = SCÈNES.map((_, i) => SCÈNES.slice(0, i).reduce((x, s) => x + s.duur, 0));
export const BAIBARS_SHORT_DUUR = SCÈNES.reduce((a, s) => a + s.duur, 0);
export const BAIBARS_SHORT_STARTS = STARTS;
const AFSLUITER_VANAF = BAIBARS_SHORT_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

export const WatAlsBaibars = ({ muziek = true }: { muziek?: boolean }) => (
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
        volume={(fr) => interpolate(fr, [0, 10, BAIBARS_SHORT_DUUR - 45, BAIBARS_SHORT_DUUR], [0, 0.9, 0.9, 0], { extrapolateRight: 'clamp' })}
      />
    )}
    <Sequence from={AFSLUITER_VANAF}>
      <Afsluiter />
      <Audio src={sfx('afsluiter')} volume={0.22} />
    </Sequence>
    {/* de staande omslag in de eerste 3 frames: zo kiest Instagram hem vanzelf */}
    <Sequence from={0} durationInFrames={3}>
      <OmslagBaibars />
    </Sequence>
  </AbsoluteFill>
);
