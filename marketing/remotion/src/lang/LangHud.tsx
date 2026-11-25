import { loadFont } from '@remotion/google-fonts/EBGaramond';
import { interpolate, useCurrentFrame } from 'remotion';

/**
 * HUD voor lange 16:9-video's: jaartal-label bovenaan in het midden (zoals de referenties), teller
 * linksboven, ondertitels onderaan op de zinstijden, watermerk. Zelfde lettertype en kleuren als de shorts.
 */

const { fontFamily: SERIF } = loadFont('normal', { weights: ['400', '500', '600', '800'], subsets: ['latin'] });
loadFont('italic', { weights: ['400', '500'], subsets: ['latin'] });
export { SERIF };

const SCHADUW = '0 2px 14px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.6)';
export const ORANJE = '#EE7A3E';

/** Jaartal-pil bovenaan in het midden; springt zacht in bij een nieuw jaar. */
export const JaarLabel = ({ jaar, sub }: { jaar: string; sub?: string }) => {
  const f = useCurrentFrame();
  const in1 = interpolate(f, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(f, [0, 10], [-14, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', top: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: in1, transform: `translateY(${y}px)` }}>
      <div
        style={{
          background: 'rgba(28,26,22,0.82)',
          border: `2px solid ${ORANJE}`,
          borderRadius: 14,
          padding: '6px 26px 8px',
          color: '#FFF4E0',
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: 50,
          letterSpacing: 2,
          boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
          textAlign: 'center',
        }}
      >
        {jaar}
        {sub && <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: 3, color: ORANJE, textTransform: 'uppercase', marginTop: -2 }}>{sub}</div>}
      </div>
    </div>
  );
};

/** Teller linksboven (zoals de shorts, maar op 16:9-maat). */
export const LangTeller = ({ label, waarde, pil }: { label: string; waarde: string; pil?: string }) => {
  const f = useCurrentFrame();
  const in1 = interpolate(f, [3, 11], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 70, top: 60, color: 'white', textShadow: SCHADUW, opacity: in1 }}>
      <div style={{ fontFamily: SERIF, fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.85 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontSize: 84, lineHeight: 1.0, marginTop: 2 }}>{waarde}</div>
      {pil && (
        <div style={{ display: 'inline-block', marginTop: 8, padding: '4px 14px 5px', borderRadius: 999, background: ORANJE, color: '#2A1607', fontFamily: SERIF, fontSize: 22, fontWeight: 500, textShadow: 'none' }}>
          {pil}
        </div>
      )}
    </div>
  );
};

/** Ondertitel onderaan: de lopende zin, woord voor woord over de duur van de zin. */
export const Ondertitel = ({ zin, start, eind, nu }: { zin: string; start: number; eind: number; nu: number }) => {
  if (nu < start - 0.1 || nu > eind + 0.5) return null;
  const woorden = zin.split(' ');
  const per = (eind - start) / woorden.length;
  const uit = interpolate(nu, [eind + 0.25, eind + 0.5], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 160, right: 160, bottom: 62, textAlign: 'center', opacity: uit }}>
      <span
        style={{
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 50,
          lineHeight: 1.25,
          color: 'white',
          textShadow: SCHADUW,
          background: 'rgba(20,14,8,0.32)',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
          padding: '2px 14px',
          borderRadius: 8,
        }}
      >
        {woorden.map((w, i) => {
          const o = interpolate(nu, [start + i * per - 0.05, start + i * per + 0.12], [0.25, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <span key={i} style={{ opacity: o }}>
              {w}{i < woorden.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export const LangWatermerk = () => (
  <div style={{ position: 'absolute', right: 60, top: 56, fontFamily: SERIF, fontSize: 26, color: 'rgba(255,255,255,0.8)', textShadow: SCHADUW }}>@gethistora</div>
);

/** Grote titel in het midden (de "NAPOLEON"-kaart na de hook). */
export const GroteTitel = ({ boven, naam, onder, grootte = 190 }: { boven: string; naam: string; onder?: string; grootte?: number }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 14], [0.88, 1], { extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
  const o = interpolate(f, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', opacity: o, transform: `scale(${s})` }}>
      <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 52, letterSpacing: 8, color: '#FFF4E0', textShadow: SCHADUW }}>{boven}</div>
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: grootte,
          lineHeight: 0.95,
          background: 'linear-gradient(180deg, #FFE7A0 0%, #F2C25A 45%, #C9821E 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '3px #4A2A0C',
          filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.65))',
        }}
      >
        {naam}
      </div>
      {onder && <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 46, color: '#FFF4E0', textShadow: SCHADUW, marginTop: 4 }}>{onder}</div>}
    </div>
  );
};

export const LangVignet = () => (
  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 60%, rgba(20,10,0,0.4) 100%)', pointerEvents: 'none' }} />
);
