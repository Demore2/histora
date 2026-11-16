import { Composition, Still } from 'remotion';
import { Cover } from './sjabloon/Cover';
import { ThirtySeconds } from './sjabloon/ThirtySeconds';
import { FPS, H, W } from './sjabloon/theme';
import { VIDEOS } from './videos';
import { CAESAR_DUUR, WatAlsCaesar } from './watals/WatAlsCaesar';
import { NAPOLEON_DUUR, WatAlsNapoleon } from './watals/WatAlsNapoleon';
import { KHALID_DUUR, WatAlsKhalid } from './watals/WatAlsKhalid';

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
    <Composition id="watals-caesar-stil" component={WatAlsCaesar} durationInFrames={CAESAR_DUUR} fps={FPS} width={W} height={H} defaultProps={{ muziek: false, muziekVanaf: 14 }} />
  </>
);
