import { Composition, Still } from 'remotion';
import { Cover } from './sjabloon/Cover';
import { ThirtySeconds } from './sjabloon/ThirtySeconds';
import { FPS, H, W } from './sjabloon/theme';
import { VIDEOS } from './videos';
import { CAESAR_DUUR, WatAlsCaesar } from './watals/WatAlsCaesar';
import { NAPOLEON_DUUR, WatAlsNapoleon } from './watals/WatAlsNapoleon';
import { KHALID_DUUR, WatAlsKhalid } from './watals/WatAlsKhalid';
import { MEHMED_DUUR, WatAlsMehmed } from './watals/WatAlsMehmed';
import { SALADIN_KORT_DUUR, WatAlsSaladin } from './watals/WatAlsSaladin';
import { OmslagBaldwin, OmslagAtaturk, OmslagLeonidas, OmslagBaibars, OmslagBarsbek, OmslagWillem, OmslagStalin, OmslagCaesar, OmslagKhalid, OmslagMehmed, OmslagNapoleon, OmslagSaladin } from './watals/Omslagen';
import { BAIBARS_SHORT_DUUR, WatAlsBaibars } from './watals/WatAlsBaibars';
import { BARSBEK_DUUR, WatAlsBarsbek } from './watals/WatAlsBarsbek';
import { WILLEM_DUUR, WatAlsWillem } from './watals/WatAlsWillem';
import { LEONIDAS_SHORT_DUUR, WatAlsLeonidas } from './watals/WatAlsLeonidas';
import { ATATURK_SHORT_DUUR, WatAlsAtaturk } from './watals/WatAlsAtaturk';
import { BALDWIN_DUUR, WatAlsBaldwin } from './watals/WatAlsBaldwin';
import { STALIN_DUUR, WatAlsStalin } from './watals/WatAlsStalin';
import { NAPOLEON_LANG_DUUR, NapoleonLang } from './lang/NapoleonLang';
import { NapoleonThumb } from './lang/Thumbnail';
import { SALADIN_LANG_DUUR, SaladinLang } from './lang/SaladinLang';
import { SaladinThumb } from './lang/SaladinThumb';
import { CAESAR_LANG_DUUR, CaesarLang } from './lang/CaesarLang';
import { LEONIDAS_LANG_DUUR, LeonidasLang } from './lang/LeonidasLang';
import { BAIBARS_LANG_DUUR, BaibarsLang } from './lang/BaibarsLang';
import { WILLEM_LANG_DUUR, WillemLang } from './lang/WillemLang';
import { STALIN_LANG_DUUR, StalinLang } from './lang/StalinLang';
import { BALDWIN_LANG_DUUR, BaldwinLang } from './lang/BaldwinLang';
import { BaldwinThumbPro } from './lang/BaldwinThumb';
import { StalinThumbPro } from './lang/StalinThumbPro';
import { ATATURK_LANG_DUUR, AtaturkLang } from './lang/AtaturkLang';
import { BaldwinThumb, BaldwinThumbB, AtaturkThumb, StalinStory, StalinThumb, WillemThumb, BaibarsThumb, CaesarThumb, LeonidasThumb, LeonidasThumbB, LeonidasThumbC, NapoleonThumbBreed, SaladinThumbBreed } from './lang/CaesarThumb';
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
    <Composition id="watals-saladin-amour" component={WatAlsSaladin} durationInFrames={SALADIN_KORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ amour: true }} />
    <Composition id="watals-saladin-muziek"component={WatAlsSaladin} durationInFrames={SALADIN_KORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true }} />
    <Still id="watals-omslag-khalid" component={OmslagKhalid} width={W} height={H} />
    <Still id="watals-omslag-willem" component={OmslagWillem} width={W} height={H} />
    <Still id="watals-omslag-leonidas" component={OmslagLeonidas} width={W} height={H} />
    <Still id="watals-omslag-baldwin" component={OmslagBaldwin} width={W} height={H} />
    <Composition id="watals-baldwin" component={WatAlsBaldwin} durationInFrames={BALDWIN_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-baldwin-stil" component={WatAlsBaldwin} durationInFrames={BALDWIN_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    {(["B", "C"] as const).map((h) => <Composition key={`baldwin-${h}`} id={`watals-baldwin-stil-${h}`} component={WatAlsBaldwin} durationInFrames={BALDWIN_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14, hook: h }} />)}
    <Still id="watals-omslag-ataturk" component={OmslagAtaturk} width={W} height={H} />
    <Composition id="watals-ataturk" component={WatAlsAtaturk} durationInFrames={ATATURK_SHORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-ataturk-stil" component={WatAlsAtaturk} durationInFrames={ATATURK_SHORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    {(["B", "C"] as const).map((h) => <Composition key={`ataturk-${h}`} id={`watals-ataturk-stil-${h}`} component={WatAlsAtaturk} durationInFrames={ATATURK_SHORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14, hook: h }} />)}
    <Composition id="watals-leonidas" component={WatAlsLeonidas} durationInFrames={LEONIDAS_SHORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-leonidas-stil" component={WatAlsLeonidas} durationInFrames={LEONIDAS_SHORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    <Composition id="watals-willem" component={WatAlsWillem} durationInFrames={WILLEM_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-willem-stil" component={WatAlsWillem} durationInFrames={WILLEM_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    <Still id="watals-omslag-stalin" component={OmslagStalin} width={W} height={H} />
    <Composition id="watals-stalin" component={WatAlsStalin} durationInFrames={STALIN_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-stalin-stil" component={WatAlsStalin} durationInFrames={STALIN_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    {(["B", "C"] as const).map((h) => <Composition key={`stalin-${h}`} id={`watals-stalin-stil-${h}`} component={WatAlsStalin} durationInFrames={STALIN_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14, hook: h }} />)}
    <Still id="watals-omslag-barsbek" component={OmslagBarsbek} width={W} height={H} />
    <Composition id="watals-barsbek" component={WatAlsBarsbek} durationInFrames={BARSBEK_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-barsbek-stil" component={WatAlsBarsbek} durationInFrames={BARSBEK_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    <Still id="watals-omslag-mehmed" component={OmslagMehmed} width={W} height={H} />
    <Composition id="watals-mehmed" component={WatAlsMehmed} durationInFrames={MEHMED_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: true, muziekVanaf: 14 }} />
    <Composition id="watals-mehmed-stil" component={WatAlsMehmed} durationInFrames={MEHMED_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
    <Still id="watals-omslag-napoleon" component={OmslagNapoleon} width={W} height={H} />
    <Still id="watals-omslag-saladin" component={OmslagSaladin} width={W} height={H} />
    <Still id="watals-omslag-baibars" component={OmslagBaibars} width={W} height={H} />
    <Still id="watals-omslag-caesar" component={OmslagCaesar} width={W} height={H} />
    <Composition id="lang-napoleon" component={NapoleonLang} durationInFrames={NAPOLEON_LANG_DUUR} fps={FPS} width={1920} height={1080} />
    <Still id="lang-napoleon-thumb" component={NapoleonThumb} width={1920} height={1080} />
    <Composition id="lang-saladin" component={SaladinLang} durationInFrames={SALADIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true }} />
    <Composition id="lang-saladin-stil" component={SaladinLang} durationInFrames={SALADIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: false }} />
    <Still id="lang-saladin-thumb" component={SaladinThumb} width={1920} height={1080} />
    <Composition id="lang-caesar" component={CaesarLang} durationInFrames={CAESAR_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true }} />
    <Composition id="watals-caesar-trailer" component={WatAlsCaesarTrailer} durationInFrames={CAESAR_TRAILER_DUUR} fps={FPS} width={W} height={H} />
    <Composition id="watals-caesar-short" component={WatAlsCaesarShort} durationInFrames={CAESAR_SHORT_DUUR} fps={FPS} width={W} height={H} />
    <Composition id="watals-baibars" component={WatAlsBaibars} durationInFrames={BAIBARS_SHORT_DUUR} fps={FPS} width={W} height={H} />
    <Composition id="watals-baibars-stil" component={WatAlsBaibars} durationInFrames={BAIBARS_SHORT_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false }} />
    <Still id="lang-caesar-thumb" component={CaesarThumb} width={1920} height={1080} />
    <Composition id="lang-leonidas" component={LeonidasLang} durationInFrames={LEONIDAS_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Composition id="lang-leonidas-stem" component={LeonidasLang} durationInFrames={LEONIDAS_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Still id="lang-leonidas-thumb" component={LeonidasThumb} width={1920} height={1080} />
    <Still id="lang-willem-thumb" component={WillemThumb} width={1920} height={1080} />
    <Composition id="lang-willem" component={WillemLang} durationInFrames={WILLEM_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Composition id="lang-willem-stem" component={WillemLang} durationInFrames={WILLEM_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Still id="lang-stalin-story" component={StalinStory} width={1080} height={1920} />
    <Still id="lang-stalin-thumb" component={StalinThumb} width={1920} height={1080} />
    <Still id="lang-stalin-thumb-pro" component={StalinThumbPro} width={1920} height={1080} />
    <Still id="lang-baldwin-thumb" component={BaldwinThumb} width={1920} height={1080} />
    <Still id="lang-baldwin-thumb-b" component={BaldwinThumbB} width={1920} height={1080} />
    <Still id="lang-baldwin-thumb-pro" component={BaldwinThumbPro} width={1920} height={1080} />
    <Composition id="lang-stalin" component={StalinLang} durationInFrames={STALIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Composition id="lang-stalin-stem" component={StalinLang} durationInFrames={STALIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Composition id="lang-baldwin" component={BaldwinLang} durationInFrames={BALDWIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Composition id="lang-baldwin-stem" component={BaldwinLang} durationInFrames={BALDWIN_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Still id="lang-ataturk-thumb" component={AtaturkThumb} width={1920} height={1080} />
    <Composition id="lang-ataturk" component={AtaturkLang} durationInFrames={ATATURK_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: false }} />
    <Composition id="lang-ataturk-stem" component={AtaturkLang} durationInFrames={ATATURK_LANG_DUUR} fps={FPS} width={1920} height={1080} defaultProps={{ muziek: true, stem: true }} />
    <Still id="lang-leonidas-thumb-b" component={LeonidasThumbB} width={1920} height={1080} />
    <Still id="lang-leonidas-thumb-c" component={LeonidasThumbC} width={1920} height={1080} />
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
