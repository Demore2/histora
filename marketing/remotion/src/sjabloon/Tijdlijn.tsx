import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TimelinePoint } from './types';
import { FONT, KLEUR, TEKST_SCHADUW } from './theme';

type Props = {
  points: TimelinePoint[];
  gaps: { a: number; b: number; label: string; side: 'above' | 'below' }[];
  backdrop?: string;
};

/** De lijn loopt binnen de veilige zone: rechts zitten de knoppen van de platforms. */
const X0 = 160;
const X1 = 890;
/** Iets onder het midden: de hook boven kan vier regels hebben, de ondertitels beginnen op 1300. */
const LIJN_Y = 1000;
const ICOON = 156;

const glad = Easing.bezier(0.4, 0, 0.3, 1);

/** Telt het eerste getal in een label op ("2,530 YEARS" → 0 … 2,530), met duizendtallen. */
const telOp = (label: string, p: number) =>
  label.replace(/\d[\d,]*/, (n) => Math.round(Number(n.replace(/,/g, '')) * p).toLocaleString('en-US'));

const Piramide = () => (
  <svg width={ICOON} height={ICOON} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="zon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#F2C98A" />
        <stop offset="0.5" stopColor="#D9A25B" />
        <stop offset="0.5" stopColor="#A9743A" />
        <stop offset="1" stopColor="#8A5C2C" />
      </linearGradient>
    </defs>
    <circle cx={50} cy={50} r={48} fill="#2A2318" stroke={KLEUR.room} strokeWidth={3} />
    <polygon points="50,22 84,72 16,72" fill="url(#zon)" />
    <line x1={8} y1={72} x2={92} y2={72} stroke="#6E5530" strokeWidth={3} />
  </svg>
);

const Maan = () => (
  <svg width={ICOON} height={ICOON} viewBox="0 0 100 100">
    <defs>
      <radialGradient id="maan" cx="0.38" cy="0.35" r="0.7">
        <stop offset="0" stopColor="#F4F1E8" />
        <stop offset="1" stopColor="#8E8B84" />
      </radialGradient>
    </defs>
    <circle cx={50} cy={50} r={48} fill="#0B0D14" stroke={KLEUR.room} strokeWidth={3} />
    <circle cx={50} cy={50} r={33} fill="url(#maan)" />
    <circle cx={40} cy={42} r={6} fill="#A7A39A" />
    <circle cx={60} cy={58} r={8} fill="#A7A39A" />
    <circle cx={57} cy={36} r={3.5} fill="#A7A39A" />
    {/* Een vlaggetje: de landing, niet zomaar de maan. */}
    <line x1={70} y1={30} x2={70} y2={12} stroke={KLEUR.room} strokeWidth={2.5} />
    <rect x={70} y={12} width={13} height={8} fill={KLEUR.room} />
  </svg>
);

/**
 * Een tijdlijn op schaal. De lijn tekent zich van links naar rechts in; elk punt springt open als de lijn
 * er is. Daarna verschijnen de afstanden als accolades onder de lijn, en tellen hun jaren op.
 */
export const Tijdlijn = ({ points, gaps, backdrop }: Props) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const jaren = points.map((p) => p.year);
  const min = Math.min(...jaren), max = Math.max(...jaren);
  const x = (j: number) => X0 + ((j - min) / (max - min || 1)) * (X1 - X0);

  const tekenEind = Math.max(12, Math.round(durationInFrames * 0.42));
  const loop = interpolate(frame, [2, tekenEind], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: glad });
  const kopX = X0 + (X1 - X0) * loop;
  const intro = interpolate(frame, [0, 10], [1.04, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, #1C1812 0%, #0A0907 78%)', fontFamily: FONT }}>
      {backdrop && (
        <Img src={staticFile(backdrop)} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7,
          filter: 'blur(30px) brightness(0.5) saturate(1.1)', transform: `scale(${interpolate(frame, [0, durationInFrames], [1.25, 1.12])})`,
        }} />
      )}
      <AbsoluteFill style={{ transform: `scale(${intro})` }}>
        <svg width={1080} height={1920} style={{ position: 'absolute' }}>
          <defs>
            <filter id="lijnGloed" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation={8} /></filter>
          </defs>
          {/* Spoor van de hele lijn, daarover de getekende lijn met gloed. */}
          <line x1={X0} y1={LIJN_Y} x2={X1} y2={LIJN_Y} stroke="rgba(255,241,220,0.14)" strokeWidth={8} strokeLinecap="round" />
          <line x1={X0} y1={LIJN_Y} x2={kopX} y2={LIJN_Y} stroke={KLEUR.oranje} strokeWidth={22} strokeOpacity={0.45} strokeLinecap="round" filter="url(#lijnGloed)" />
          <line x1={X0} y1={LIJN_Y} x2={kopX} y2={LIJN_Y} stroke={KLEUR.room} strokeWidth={8} strokeLinecap="round" />
          {gaps.map((g, k) => {
            const van = tekenEind + 6 + k * 14;
            const p = interpolate(frame, [van, van + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
            if (p <= 0) return null;
            const xa = x(points[g.a].year) + 14, xb = x(points[g.b].year) - 14;
            const onder = g.side === 'below';
            const y = onder ? LIJN_Y + 184 : LIJN_Y - 250;
            const r = onder ? -1 : 1; // pootjes naar de lijn toe
            const midden = (xa + xb) / 2;
            const half = ((xb - xa) / 2) * p;
            return (
              <path key={k}
                d={`M ${midden - half} ${y + r * 26} L ${midden - half} ${y} L ${midden + half} ${y} L ${midden + half} ${y + r * 26}`}
                fill="none" stroke={KLEUR.oranje} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
            );
          })}
        </svg>

        {points.map((pt, i) => {
          const px = x(pt.year);
          const bereikt = (px - X0) / (X1 - X0);
          // Het eerste punt staat er al op frame 0; de rest staat gedimd klaar en licht op als de lijn er is.
          const sinds = frame - (i === 0 ? -14 : 2 + bereikt * (tekenEind - 2));
          const bereiktAl = sinds >= 0;
          const pop = bereiktAl ? spring({ frame: sinds, fps, config: { damping: 11, stiffness: 180 } }) : 0;
          const spook = bereiktAl ? 0 : 1;
          const uitlijn = i === 0 ? 'flex-start' : i === points.length - 1 ? 'flex-end' : 'center';
          const tekstX = i === 0 ? px - 50 : i === points.length - 1 ? px + 50 : px;
          const kleur = pt.highlight ? KLEUR.oranje : KLEUR.room;
          return (
            <div key={i}>
              {/* Stip op de lijn. */}
              <div style={{
                position: 'absolute', left: px - 24, top: LIJN_Y - 24, width: 48, height: 48, borderRadius: 24,
                backgroundColor: KLEUR.donker, border: `7px solid ${KLEUR.room}`, boxSizing: 'border-box',
                transform: `scale(${bereiktAl ? pop : 0.7})`, opacity: bereiktAl ? 1 : 0.35, boxShadow: pt.highlight && bereiktAl ? `0 0 30px ${KLEUR.oranje}` : undefined,
              }}>
                <div style={{ margin: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: KLEUR.oranje }} />
              </div>
              {/* Icoon of portret boven de stip. */}
              <div style={{
                position: 'absolute', left: px - ICOON / 2, top: LIJN_Y - 60 - ICOON, width: ICOON, height: ICOON,
                transform: bereiktAl ? `translateY(${(1 - pop) * 40}px) scale(${pop * (pt.highlight ? 1.12 : 1)})` : 'scale(0.9)',
                transformOrigin: '50% 100%', opacity: 1 - spook * 0.7, filter: spook ? 'grayscale(1) brightness(0.7)' : undefined,
              }}>
                {pt.img ? (
                  <Img src={staticFile(pt.img)} style={{
                    width: ICOON, height: ICOON, borderRadius: ICOON / 2, objectFit: 'cover', objectPosition: '50% 18%',
                    border: `6px solid ${KLEUR.oranje}`, boxSizing: 'border-box', boxShadow: `0 0 40px rgba(238,122,62,0.55)`,
                  }} />
                ) : pt.icon === 'moon' ? <Maan /> : <Piramide />}
              </div>
              {/* Jaartal en naam onder de lijn. */}
              <div style={{
                position: 'absolute', top: LIJN_Y + 38, left: tekstX - 300, width: 600, display: 'flex', flexDirection: 'column',
                alignItems: uitlijn === 'flex-start' ? 'flex-start' : uitlijn === 'flex-end' ? 'flex-end' : 'center',
                paddingLeft: uitlijn === 'flex-start' ? 300 : 0, paddingRight: uitlijn === 'flex-end' ? 300 : 0, boxSizing: 'border-box',
                opacity: Math.min(1, pop * 1.4), textShadow: TEKST_SCHADUW,
              }}>
                <div style={{ fontWeight: 900, fontSize: 46, color: kleur, whiteSpace: 'nowrap' }}>{pt.yearLabel}</div>
                <div style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.1, letterSpacing: 3, color: KLEUR.room, opacity: 0.85, whiteSpace: 'nowrap', textAlign: uitlijn === 'flex-start' ? 'left' : uitlijn === 'flex-end' ? 'right' : 'center' }}>
                  {pt.label.split('|').map((r, k) => <div key={k}>{r}</div>)}
                </div>
              </div>
            </div>
          );
        })}

        {gaps.map((g, k) => {
          const van = tekenEind + 6 + k * 14;
          const p = interpolate(frame, [van, van + 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          if (p <= 0) return null;
          const midden = (x(points[g.a].year) + x(points[g.b].year)) / 2;
          const onder = g.side === 'below';
          return (
            <div key={k} style={{
              position: 'absolute', left: midden - 260, width: 520, textAlign: 'center',
              top: onder ? LIJN_Y + 196 : LIJN_Y - 320, transform: `scale(${0.8 + 0.2 * p})`, opacity: p,
              fontWeight: 900, color: KLEUR.wit, textShadow: TEKST_SCHADUW, whiteSpace: 'nowrap', lineHeight: 1,
            }}>
              <div style={{ fontSize: 64, letterSpacing: -1 }}>{telOp(g.label, p).split(' ')[0]}</div>
              <div style={{ fontSize: 28, letterSpacing: 5, color: KLEUR.oranje, marginTop: 4 }}>{g.label.split(' ').slice(1).join(' ')}</div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
