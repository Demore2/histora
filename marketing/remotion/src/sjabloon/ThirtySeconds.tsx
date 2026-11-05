import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Captions } from './Captions';
import { Cta } from './Cta';
import { Flitsen, Hook, Jaartal, Stempels, Vignet, Voortgang } from './Overlays';
import { RouteMap } from './RouteMap';
import { Scene } from './Scene';
import { Staven } from './Staven';
import { Tijdlijn } from './Tijdlijn';
import type { ShortConfig, Timing } from './types';
import { f, planShots } from './tijd';

/** `balk`: plek van de voortgangsbalk; via `--props` te overschrijven voor een proefrender. */
export type ThirtySecondsProps = { config: ShortConfig; timing: Timing; balk?: 'boven' | 'onder' };

/** Muziek zakt onder de stem en komt terug in de pauzes (de oude montage deed dit met sidechain). */
const muziekVolume = (timing: Timing) => (frame: number) => {
  const sec = frame / 30;
  const spreekt = [...timing.beats, timing.cta].some(([a, e]) => sec >= a - 0.05 && sec <= e + 0.1);
  const basis = spreekt ? 0.32 : 0.75;
  const uit = interpolate(sec, [timing.total - 0.5, timing.total], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return basis * uit;
};

const Beelden = ({ config, timing }: ThirtySecondsProps) => {
  const shots = planShots(config, timing);
  return (
    <>
      {shots.map(({ shot, van, tot }, i) => (
        <Sequence key={i} from={van} durationInFrames={Math.max(1, tot - van)}>
          {shot.kind === 'scene' ? <Scene src={shot.src} aspect={shot.aspect ?? 16 / 9} motion={shot.motion} />
            : shot.kind === 'timeline' ? <Tijdlijn points={shot.points} gaps={shot.gaps} backdrop={shot.backdrop} />
            : shot.kind === 'bars' ? <Staven bars={shot.bars} floor={shot.floor} title={shot.title} backdrop={shot.backdrop} />
            : <RouteMap stops={shot.stops} fromStop={shot.fromStop} toStop={shot.toStop} span={shot.span ?? 22} returnTo={shot.returnTo} zoom={shot.zoom} territory={shot.territory} draw={shot.draw} />}
        </Sequence>
      ))}
      <Flitsen shots={shots} />
    </>
  );
};

export const ThirtySeconds = ({ config, timing, balk = 'boven' }: ThirtySecondsProps) => {
  const frame = useCurrentFrame();
  const ctaVan = f(timing.cta[0]);
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Beelden config={config} timing={timing} />
      <Vignet />
      <Hook config={config} timing={timing} />
      <Jaartal config={config} timing={timing} />
      <Stempels config={config} timing={timing} />
      <Captions config={config} timing={timing} />
      {frame >= ctaVan && (
        <Sequence from={ctaVan}>
          <Cta />
        </Sequence>
      )}
      <Voortgang plek={balk} />
      {timing.hasVoice && <Audio src={staticFile(`${config.id}/vo.wav`)} />}
      {timing.hasMusic && <Audio src={staticFile(`${config.id}/music.wav`)} volume={muziekVolume(timing)} />}
    </AbsoluteFill>
  );
};
