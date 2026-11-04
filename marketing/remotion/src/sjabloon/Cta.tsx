import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Kicker } from './Overlays';
import { FONT, KLEUR, TEKST_SCHADUW } from './theme';

/**
 * De afsluiter: max ~2 s óver het laatste beeld, geen aparte beige eindkaart (daar halveerde de
 * YouTube-retentie). De zwaaiende vos, de zin die de stem ook zegt, en het app-icoon.
 */
export const Cta = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scrim = interpolate(frame, [0, 10], [0, 0.55], { extrapolateRight: 'clamp' });
  const vos = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });
  const tekst = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 200 } });
  const icoon = spring({ frame: frame - 9, fps, config: { damping: 12, stiffness: 200 } });
  const zwaai = Math.sin(frame / 4) * 4;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(28,26,22,${scrim})` }} />
      <Kicker zichtbaar={tekst} />
      <Img src={staticFile('vos/zwaaiend.png')} style={{
        position: 'absolute', width: 560, left: (1080 - 560) / 2, top: 420,
        transform: `translateY(${(1 - vos) * 500}px) rotate(${zwaai}deg)`, transformOrigin: '50% 90%',
      }} />
      <div style={{
        position: 'absolute', top: 1010, width: '100%', textAlign: 'center', transform: `scale(${tekst})`,
        fontFamily: FONT, fontWeight: 900, color: KLEUR.wit, textShadow: TEKST_SCHADUW,
      }}>
        <div style={{ fontSize: 76, lineHeight: 1.1 }}>The full story is in</div>
        <div style={{ fontSize: 76, lineHeight: 1.1, color: KLEUR.oranje }}>Histora.</div>
      </div>
      <div style={{
        position: 'absolute', top: 1250, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26,
        transform: `scale(${icoon})`, fontFamily: FONT,
      }}>
        <Img src={staticFile('app-icon.png')} style={{ width: 120, height: 120, borderRadius: 28, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }} />
        <div style={{ fontWeight: 800, fontSize: 52, color: KLEUR.room, textShadow: TEKST_SCHADUW }}>Follow for more</div>
      </div>
    </AbsoluteFill>
  );
};
