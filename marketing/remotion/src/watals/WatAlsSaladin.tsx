import type React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from 'remotion';
import { ZonderOver } from '../lang/basis';
import { Figuur, Kroon } from './Figuur';
import { Afsluiter } from './Afsluiter';
import { Onderschrift, Teller, Watermerk, type Deel } from './Hud';
import {
  BOUDEWIJN,
  InHal,
  Portret,
  RICHARD,
  SALADIN_HOF,
  S_Brand,
  S_Fort,
  S_Hoorns,
  S_Kameel,
  S_Karavaan,
  S_Koning,
  S_Lezen,
  S_Onwillig,
  S_Poort,
  S_Schatkist,
  T5_Titel,
  InTent,
  SARACEEN,
  Slagveld,
} from '../lang/SaladinScenes';
import { Paard } from './Decor';
import { useCurrentFrame } from 'remotion';
import { lin } from '../lang/basis';

const Tentportret = () => (
  <InTent nacht kijk={[0, 1.8, 0]}>
    <Figuur kleding={SALADIN_HOF} hoofddeksel="tulband" baard position={[0, 0, 0]} pose={{ armR: { schouder: [-1.0, 0, -0.5], elleboog: [0, -0.3] } }} />
  </InTent>
);

const TweePaarden = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <Slagveld cam={[0, 2.6, 11, 0, 2.4, 9]} kijk={[0, 1.4, 0]}>
      <Figuur kleding={SARACEEN} hoofddeksel="tulband" baard position={[0, 0, lin(f, 0, 130, -2, 1)]} pose={{ armR: { schouder: [-1.0, 0, -0.4], elleboog: [0, 0] } }} />
      {[-1, 1].map((k) => <Paard key={k} position={[k * 1.3, 0, lin(f, 0, 130, -3.4, -0.4)]} rotation={[0, Math.PI, 0]} kleur={k > 0 ? '#3A2A20' : '#E6E0D6'} dek="#C99A2E" t={t + k} loopt />)}
    </Slagveld>
  );
};

/**
 * "What if you were Saladin?" — trailer-short (9:16) bij de lange video #02. Hergebruikt de 3D-scènes
 * van de lange video (hun 16:9-overlays staan uit via ZonderOver) met de HUD van de What-if-shorts.
 * Geen stem; zelfde gevoeligheden als de lange video (geen kruizen, geen heilige plaatsen, geen geweld in beeld).
 */

type Scène = { C: () => React.ReactElement; duur: number; teller?: { label: string; waarde: string; pil?: string }; tekst: Deel[]; klank?: { src: string; vol: number; bij?: number; lus?: boolean }[] };

const SCÈNES: Scène[] = [
  { C: T5_Titel, duur: 130, teller: { label: 'Born', waarde: 'Tikrit', pil: 'c. 1137' }, tekst: [{ t: 'What if you were ' }, { t: 'Saladin', accent: true }, { t: '?' }], klank: [{ src: 'inslag', vol: 0.3 }, { src: 'wind', vol: 0.08, lus: true }] },
  { C: () => <S_Fort nacht />, duur: 125, tekst: [{ t: 'your family ' }, { t: 'flees', accent: true }, { t: ' the night you are born' }], klank: [{ src: 'wind', vol: 0.1, lus: true }] },
  { C: () => <S_Lezen />, duur: 120, teller: { label: 'Grew up in', waarde: 'Damascus' }, tekst: [{ t: 'you would rather ' }, { t: 'read', accent: true }, { t: ' than fight' }], klank: [{ src: 'vuur', vol: 0.05, lus: true }] },
  { C: S_Onwillig, duur: 125, teller: { label: 'Campaigns to Egypt', waarde: '3' }, tekst: [{ t: 'your uncle drags you to ' }, { t: 'Egypt', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }] },
  { C: () => <InHal kijk={[0, 2.0, -1.2]} van={[0.4, 2.3, 5.2]} naar={[0.2, 2.2, 4.2]}><Figuur kleding={SALADIN_HOF} hoofddeksel="tulband" baard position={[0, 0, -1.2]} pose={{ wenk: 0.6 }} /></InHal>, duur: 125, teller: { label: 'Age', waarde: '31', pil: 'vizier of Egypt' }, tekst: [{ t: 'at 31 you ' }, { t: 'rule Egypt', accent: true }], klank: [{ src: 'glans', vol: 0.14, bij: 20 }] },
  { C: () => <Portret wie={<group position={[0, 0, 0.4]} scale={0.88}><Figuur kleding={BOUDEWIJN} /><Kroon position={[0, 2.56, 0]} /></group>} />, duur: 130, teller: { label: 'Montgisard', waarde: '1177' }, tekst: [{ t: 'a 16-year-old ' }, { t: 'leper king', accent: true }, { t: ' beats you' }], klank: [{ src: 'inslag', vol: 0.14, bij: 30 }] },
  { C: S_Kameel, duur: 115, tekst: [{ t: 'you escape on a ' }, { t: 'racing camel', accent: true }], klank: [{ src: 'wind', vol: 0.14, lus: true }] },
  { C: () => <S_Karavaan aanval />, duur: 125, teller: { label: '1187', waarde: 'Truce broken' }, tekst: [{ t: 'a crusader lord raids your ' }, { t: 'caravans', accent: true }], klank: [{ src: 'wind', vol: 0.1, lus: true }, { src: 'inslag', vol: 0.12, bij: 50 }] },
  { C: () => <S_Brand teaser />, duur: 125, tekst: [{ t: 'you cut them off from ' }, { t: 'water', accent: true }, { t: ' and set the grass on fire' }], klank: [{ src: 'vuur', vol: 0.16, lus: true }] },
  { C: S_Hoorns, duur: 135, teller: { label: '4 July 1187', waarde: 'Hattin' }, tekst: [{ t: 'their army is ' }, { t: 'gone', accent: true }], klank: [{ src: 'menigte', vol: 0.14, lus: true }, { src: 'val', vol: 0.16, bij: 95 }] },
  { C: Tentportret, duur: 130, tekst: [{ t: '"' }, { t: 'Kings do not kill kings.', accent: true }, { t: '"' }], klank: [{ src: 'glans', vol: 0.12, bij: 15 }] },
  { C: () => <S_Poort uit />, duur: 135, teller: { label: 'Jerusalem', waarde: '1187', pil: 'no massacre' }, tekst: [{ t: 'you take ' }, { t: 'Jerusalem', accent: true }, { t: ' and let thousands go' }], klank: [{ src: 'menigte', vol: 0.08, lus: true }] },
  { C: () => <S_Koning k={RICHARD} label="" waarde="" vlag="#A8322B" />, duur: 125, teller: { label: 'Third Crusade', waarde: 'Richard', pil: 'the Lionheart' }, tekst: [{ t: 'then ' }, { t: 'Richard the Lionheart', accent: true }, { t: ' arrives' }], klank: [{ src: 'zee', vol: 0.1, lus: true }] },
  { C: TweePaarden, duur: 130, tekst: [{ t: 'his horse dies, you send him ' }, { t: 'two', accent: true }], klank: [{ src: 'wind', vol: 0.06, lus: true }, { src: 'glans', vol: 0.12, bij: 70 }] },
  { C: () => <S_Schatkist />, duur: 220, teller: { label: '1193', waarde: 'Damascus' }, tekst: [{ t: 'and you die with ' }, { t: 'one gold coin', accent: true }], klank: [{ src: 'munt', vol: 0.28, bij: 40 }] },
];

const STARTS = SCÈNES.map((_, i) => SCÈNES.slice(0, i).reduce((x, s) => x + s.duur, 0));
export const SALADIN_KORT_DUUR = SCÈNES.reduce((a, s) => a + s.duur, 0);
const AFSLUITER_VANAF = SALADIN_KORT_DUUR - 90;
const sfx = (n: string) => staticFile(`watals-sfx/${n}.wav`);

export const WatAlsSaladin = ({ muziek = false }: { muziek?: boolean }) => (
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
    {muziek && <Audio src={staticFile('lokaal/saladin-muziek/h4.mp3')} volume={(fr) => interpolate(fr, [0, 15, SALADIN_KORT_DUUR - 100, SALADIN_KORT_DUUR], [0, 0.5, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />}
    <Sequence from={AFSLUITER_VANAF}>
      <Afsluiter />
      <Audio src={sfx('afsluiter')} volume={0.2} />
    </Sequence>
  </AbsoluteFill>
);
