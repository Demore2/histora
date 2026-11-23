import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, KLEUR, TEKST_SCHADUW } from '../sjabloon/theme';

/**
 * De afsluiter van de oude shorts (sjabloon/Cta.tsx), over het laatste beeld: het beeld wordt
 * donkerder, de zwaaiende vos, "The full story is in Histora." en het app-icoon. Zonder de kicker
 * "30 SECONDS OF HISTORY" (ander format) en zonder de oude stem.
 */
/**
 * Eigenaar 2026-11-16: geen app-verwijzing in beeld tot de app op Android EN iOS live is.
 * Zet dan op true; dan komen "The full story is in Histora.", het icoon en "Link in bio" terug.
 */
export const APP_IN_BEELD = false;

/**
 * Vaste regel (eigenaar 2026-11-23): elke short/reel is hooguit 58 s. Langer en de muziek die je in de
 * YouTube-/IG-app toevoegt stopt op 1:00, en een YouTube-short > 1 min met een muziekclaim wordt geblokkeerd.
 * Elke What-if-compositie gooit bij het renderen als hij hierboven komt.
 */
export const MAX_SHORT_FRAMES = 58 * 30;

export const Afsluiter = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scrim = interpolate(frame, [0, 12], [0, 0.6], { extrapolateRight: 'clamp' });
  const vos = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });
  const tekst = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 200 } });
  const icoon = spring({ frame: frame - 9, fps, config: { damping: 12, stiffness: 200 } });
  const zwaai = Math.sin(frame / 4) * 4;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(28,26,22,${scrim})` }} />
      <Img
        src={staticFile('vos/zwaaiend.png')}
        style={{
          position: 'absolute', width: 560, left: (1080 - 560) / 2, top: 420,
          transform: `translateY(${(1 - vos) * 500}px) rotate(${zwaai}deg)`, transformOrigin: '50% 90%',
        }}
      />
      <div style={{ position: 'absolute', top: 1010, width: '100%', textAlign: 'center', transform: `scale(${tekst})`, fontFamily: FONT, fontWeight: 900, color: KLEUR.wit, textShadow: TEKST_SCHADUW }}>
        <div style={{ fontSize: 76, lineHeight: 1.1 }}>{APP_IN_BEELD ? 'The full story is in' : 'Who should be next?'}</div>
        <div style={{ fontSize: 76, lineHeight: 1.1, color: KLEUR.oranje }}>{APP_IN_BEELD ? 'Histora.' : 'Follow for more.'}</div>
      </div>
      {APP_IN_BEELD && <div style={{ position: 'absolute', top: 1250, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26, transform: `scale(${icoon})`, fontFamily: FONT }}>
        <Img src={staticFile('app-icon.png')} style={{ width: 120, height: 120, borderRadius: 28, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }} />
        <div style={{ fontWeight: 800, fontSize: 52, color: KLEUR.room, textShadow: TEKST_SCHADUW }}>Link in bio</div>
      </div>}
    </AbsoluteFill>
  );
};
