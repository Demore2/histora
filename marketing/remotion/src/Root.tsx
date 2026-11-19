import { Composition, Still } from 'remotion';
import { Cover } from './sjabloon/Cover';
import { ThirtySeconds } from './sjabloon/ThirtySeconds';
import { FPS, H, W } from './sjabloon/theme';
import { VIDEOS } from './videos';
import { CAESAR_DUUR, WatAlsCaesar } from './watals/WatAlsCaesar';
import { NAPOLEON_DUUR, WatAlsNapoleon } from './watals/WatAlsNapoleon';
import { KHALID_DUUR, WatAlsKhalid } from './watals/WatAlsKhalid';
import { SALADIN_KORT_DUUR, WatAlsSaladin } from './watals/WatAlsSaladin';
import { OmslagCaesar, OmslagKhalid, OmslagNapoleon, OmslagSaladin } from './watals/Omslagen';
import { NAPOLEON_LANG_DUUR, NapoleonLang } from './lang/NapoleonLang';
import { NapoleonThumb } from './lang/Thumbnail';
import { SALADIN_LANG_DUUR, SaladinLang } from './lang/SaladinLang';
import { SaladinThumb } from './lang/SaladinThumb';
import { CAESAR_LANG_DUUR, CaesarLang } from './lang/CaesarLang';
import { LEONIDAS_LANG_DUUR, LeonidasLang } from './lang/LeonidasLang';
import { BAIBARS_LANG_DUUR, BaibarsLang } from './lang/BaibarsLang';
import { BaibarsThumb, CaesarThumb, LeonidasThumb, NapoleonThumbBreed, SaladinThumbBreed } from './lang/CaesarThumb';
import { BaibarsOmslag, BaibarsReel, CaesarOmslag, CaesarOmslagSmal, CaesarReel, KhalidOmslag, KhalidReel, LeonidasOmslag, LeonidasReel, NapoleonReel, SaladinReel, NapoleonOmslag, NapoleonOmslagSmal, SaladinOmslag, SaladinOmslagSmal } from './lang/CaesarOmslag';
import { CAESAR_TRAILER_DUUR, WatAlsCaesarTrailer } from './watals/WatAlsCaesarTrailer';
import { CAESAR_SHORT_DUUR, WatAlsCaesarShort } from './watals/WatAlsCaesarShort';
import { NapoleonThumbStaand } from './lang/ThumbnailStaand';
import { KanaalBanner } from './lang/Banner';

export const Root = () => (
  <>
    {VIDEOS.map(({ config, timing }) => (
      <Composition
        key={config.id}
        id={config.id}
        component={ThirtySeconds}
        durationInFrames={Math.ceil(timing.total * FPS)}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{ config, timing }}
      />
    ))}
    {VIDEOS.map(({ config }) => (
      <Still key={`${config.id}-cover`} id={`${config.id}-cover`} component={Cover} width={W} height={H} defaultProps={{ config }} />
    ))}
    <Composition id="watals-caesar" component={WatAlsCaesar} durationInFrames={CAESAR_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-napoleon" component={WatAlsNapoleon} durationInFrames={NAPOLEON_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-napoleon-stil" component={WatAlsNapoleon} durationInFrames={NAPOLEON_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    <Composition id="watals-khalid" component={WatAlsKhalid} durationInFrames={KHALID_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-khalid-stil" component={WatAlsKhalid} durationInFrames={KHALID_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    <Composition id="watals-saladin" component={WatAlsSaladin} durationInFrames={SALADIN_KORT_DUUR} fps={FPS} width={W} height={H} />
    <Composition id="watals-saladin-muziek" component={WatAlsSaladin} durationInFrames={SALADIN_KORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true }} />
    <Still id="watals-omslag-khalid" component={OmslagKhalid} width={W} height={H} />
    <Still id="watals-omslag-napoleon" component={OmslagNapoleon} width={W} height={H} />
    <Still id="watals-omslag-saladin" component={OmslagSaladin} width={W} height={H} />
    <Still id="watals-omslag-caesar" component={OmslagCaesar} width={W} height={H} />
    <Composition id="lang-napoleon" component={NapoleonLang} durationInFrames={NAPOLEON_LANG_DUUR} fps={FPS} width={1920} height={1080} />
    <Still id="lang-napoleon-thumb" component={NapoleonThumb} width={1920} height={1080} />
    <Composition id="lang-saladin" component={SaladinLang} durationInFrames={SALADIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true }} />
    <Composition id="lang-saladin-stil" component={SaladinLang} durationInFrames={SALADIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: false }} />
    <Still id="lang-saladin-thumb" component={SaladinThumb} width={1920} height={1080} />
    <Composition id="lang-caesar" component={CaesarLang} durationInFrames={CAESAR_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true }} />
    <Composition id="watals-caesar-trailer" component={WatAlsCaesarTrailer} durationInFrames={CAESAR_TRAILER_DUUR} fps={FPS} width={W} height={H} />
    <Composition id="watals-caesar-short" component={WatAlsCaesarShort} durationInFrames={CAESAR_SHORT_DUUR} fps={FPS} width={W} height={H} />
    <Still id="lang-caesar-thumb" component={CaesarThumb} width={1920} height={1080} />
    <Composition id="lang-leonidas" component={LeonidasLang} durationInFrames={LEONIDAS_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Composition id="lang-leonidas-stem" component={LeonidasLang} durationInFrames={LEONIDAS_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Still id="lang-leonidas-thumb" component={LeonidasThumb} width={1920} height={1080} />
    <Still id="lang-leonidas-omslag" component={LeonidasOmslag} width={1920} height={1080} />
    <Still id="lang-leonidas-reel" component={LeonidasReel} width={1080} height={1920} />
    <Composition id="lang-baibars" component={BaibarsLang} durationInFrames={BAIBARS_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Still id="lang-baibars-thumb" component={BaibarsThumb} width={1920} height={1080} />
    <Still id="lang-baibars-omslag" component={BaibarsOmslag} width={1920} height={1080} />
    <Still id="lang-baibars-reel" component={BaibarsReel} width={1080} height={1920} />
    <Composition id="lang-baibars-stem" component={BaibarsLang} durationInFrames={BAIBARS_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Still id="lang-saladin-thumb-breed" component={SaladinThumbBreed} width={1920} height={1080} />
    <Still id="lang-napoleon-thumb-breed" component={NapoleonThumbBreed} width={1920} height={1080} />
    <Still id="lang-caesar-omslag" component={CaesarOmslag} width={1920} height={1080} />
    <Still id="lang-saladin-omslag" component={SaladinOmslag} width={1920} height={1080} />
    <Still id="lang-napoleon-omslag" component={NapoleonOmslag} width={1920} height={1080} />
    <Still id="lang-khalid-omslag" component={KhalidOmslag} width={1920} height={1080} />
    <Still id="lang-caesar-reel" component={CaesarReel} width={1080} height={1920} />
    <Still id="lang-saladin-reel" component={SaladinReel} width={1080} height={1920} />
    <Still id="lang-napoleon-reel" component={NapoleonReel} width={1080} height={1920} />
    <Still id="lang-khalid-reel" component={KhalidReel} width={1080} height={1920} />
    <Still id="lang-caesar-omslag-916" component={CaesarOmslagSmal} width={1920} height={1080} />
    <Still id="lang-saladin-omslag-916" component={SaladinOmslagSmal} width={1920} height={1080} />
    <Still id="lang-napoleon-omslag-916" component={NapoleonOmslagSmal} width={1920} height={1080} />
    <Still id="kanaal-banner" component={KanaalBanner} width={2560} height={1440} />
    <Still id="lang-napoleon-thumb-staand" component={NapoleonThumbStaand} width={1080} height={1920} />
    <Composition id="watals-caesar-stil" component={WatAlsCaesar} durationInFrames={CAESAR_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
  </>
);
