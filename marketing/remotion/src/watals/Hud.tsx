import { loadFont } from '@remotion/google-fonts/EBGaramond';
import { interpolate, useCurrentFrame } from 'remotion';
import { KLEUR } from '../sjabloon/theme';

const { fontFamily: SERIF } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] });
loadFont('italic', { weights: ['400', '500'], subsets: ['latin'] });
export { SERIF };

export type Deel = { t: string; accent?: boolean };

const SCHADUW = '0 2px 14px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.5)';

/** Teller linksboven: klein label, groot getal/woord, oranje pilletje. */
export const Teller = ({ label, waarde, pil, start }: { label: string; waarde: string; pil?: string; start: number }) => {
  const f = useCurrentFrame() - start;
  const in1 = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(f, [0, 10], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 74, top: 210, color: 'white', textShadow: SCHADUW, opacity: in1 }}>
      <div style={{ fontFamily: SERIF, fontSize: 24, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.85 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontSize: 104, lineHeight: 1.0, marginTop: 4, transform: `translateY(${y}px)` }}>{waarde}</div>
      {pil && (
        <div
          style={{
            display: 'inline-block',
            marginTop: 10,
            padding: '5px 16px 6px',
            borderRadius: 999,
            background: KLEUR.oranje,
            color: '#2A1607',
            fontFamily: SERIF,
            fontSize: 24,
            fontWeight: 500,
            textShadow: 'none',
          }}
        >
          {pil}
        </div>
      )}
    </div>
  );
};

/** Onderschrift: schuine serif, woord voor woord in beeld, één woord in de accentkleur. */
export const Onderschrift = ({ delen, start, top = 520 }: { delen: Deel[]; start: number; top?: number }) => {
  const f = useCurrentFrame() - start;
  const woorden = delen.flatMap((d) => d.t.split(/(\s+)/).filter(Boolean).map((w) => ({ w, accent: d.accent })));
  let n = 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 150,
        top,
        textAlign: 'center',
        fontFamily: SERIF,
        fontStyle: 'italic',
        fontSize: 64,
        lineHeight: 1.18,
        color: 'white',
        textShadow: SCHADUW,
      }}
    >
      {woorden.map(({ w, accent }, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        const k = n++;
        const o = interpolate(f, [k * 3, k * 3 + 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <span key={i} style={{ opacity: o, color: accent ? '#F4B860' : undefined }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Watermerk = () => (
  <div style={{ position: 'absolute', right: 160, top: 214, fontFamily: SERIF, fontSize: 24, color: 'rgba(255,255,255,0.8)', textShadow: SCHADUW }}>
    @gethistora
  </div>
);

/** Zachte filmische vignet + een vleugje warmte. */
export const Vignet = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(20,10,0,0.42) 100%)',
      pointerEvents: 'none',
    }}
  />
);
