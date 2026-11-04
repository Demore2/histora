import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Bar } from './types';
import { FONT, KLEUR, TEKST_SCHADUW } from './theme';

type Props = { bars: Bar[]; floor: number; title?: string; backdrop?: string };

/** Onderkant van de staven: boven de ondertitels (die beginnen op 1300). */
const BASIS_Y = 1170;
const MAX_H = 540;
const BREED = 196;
/** De staven staan binnen de veilige zone; rechts zitten de knoppen van de platforms. */
const LINKS = 90;
const RECHTS = 930;

/**
 * Staande staven die op schaal opgroeien, één voor één; de gemarkeerde (oranje) komt als laatste en krijgt
 * een gloed. Een mythe is gestreept en wordt doorgestreept zodra alles staat. Een stippellijn op de hoogte
 * van de gemarkeerde staaf maakt het verschil met de rest in één oogopslag zichtbaar.
 */
export const Staven = ({ bars, floor, title, backdrop }: Props) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const max = Math.max(...bars.map((b) => b.value));
  const hoogte = (v: number) => Math.max(40, ((v - floor) / (max - floor || 1)) * MAX_H);
  const stap = (RECHTS - LINKS) / bars.length;
  const midden = (i: number) => LINKS + stap * (i + 0.5);
  const begin = (i: number) => 4 + i * 9;
  const allesStaat = begin(bars.length - 1) + 20;
  const ref = bars.findIndex((b) => !b.highlight && !b.myth);
  const intro = interpolate(frame, [0, 10], [1.04, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 55%, #1C1812 0%, #0A0907 78%)', fontFamily: FONT }}>
      {backdrop && (
        <Img src={staticFile(backdrop)} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6,
          filter: 'blur(34px) brightness(0.35) saturate(1.1)', transform: `scale(${interpolate(frame, [0, durationInFrames], [1.25, 1.12])})`,
        }} />
      )}
      <AbsoluteFill style={{ transform: `scale(${intro})` }}>
        {title && (
          <div style={{
            position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontWeight: 900, fontSize: 48, letterSpacing: 8,
            color: KLEUR.oranje, textShadow: TEKST_SCHADUW,
          }}>{title}</div>
        )}
        {/* Stippellijn op de hoogte van de vergelijkingsstaaf (het gemiddelde): de mythe zit eronder, de held erboven. */}
        {ref >= 0 && (() => {
          const p = interpolate(frame, [allesStaat - 4, allesStaat + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          if (p <= 0) return null;
          const y = BASIS_Y - hoogte(bars[ref].value);
          return (
            <div style={{
              position: 'absolute', left: LINKS - 20, top: y - 3, height: 6, width: (RECHTS - LINKS + 40) * p,
              backgroundImage: `repeating-linear-gradient(90deg, ${KLEUR.room} 0 22px, transparent 22px 36px)`, opacity: 0.75,
            }} />
          );
        })()}
        {/* Grondlijn. */}
        <div style={{ position: 'absolute', left: LINKS - 20, top: BASIS_Y, width: RECHTS - LINKS + 40, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,241,220,0.55)' }} />

        {bars.map((b, i) => {
          const groei = spring({ frame: frame - begin(i), fps, config: { damping: 15, stiffness: 120 } });
          if (frame < begin(i)) return null;
          const h = hoogte(b.value) * groei;
          const kleur = b.highlight ? KLEUR.oranje : b.myth ? 'rgba(255,241,220,0.28)' : KLEUR.room;
          const x = midden(i) - BREED / 2;
          // De mythe wordt doorgestreept als alles staat.
          const streep = b.myth ? interpolate(frame, [allesStaat, allesStaat + 9], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) : 0;
          return (
            <div key={i}>
              <div style={{
                position: 'absolute', left: x, top: BASIS_Y - h, width: BREED, height: h, borderRadius: '18px 18px 4px 4px',
                background: b.myth ? `repeating-linear-gradient(135deg, ${kleur} 0 16px, rgba(255,241,220,0.12) 16px 32px)` : kleur,
                boxShadow: b.highlight ? `0 0 60px rgba(238,122,62,${0.6 * groei})` : '0 10px 30px rgba(0,0,0,0.5)',
                border: b.myth ? '4px dashed rgba(255,241,220,0.6)' : undefined, boxSizing: 'border-box',
              }} />
              {/* Waarde boven de staaf. */}
              <div style={{
                position: 'absolute', left: midden(i) - 170, width: 340, top: BASIS_Y - h - (b.sub ? 132 : 92), textAlign: 'center',
                opacity: Math.min(1, groei * 1.3), textShadow: TEKST_SCHADUW,
              }}>
                <div style={{ position: 'relative', display: 'inline-block', fontWeight: 900, fontSize: 68, letterSpacing: -1, color: b.highlight ? KLEUR.oranje : KLEUR.wit }}>
                  {b.display}
                  {streep > 0 && (
                    <div style={{ position: 'absolute', left: -12, top: '52%', height: 9, width: `calc(${streep * 100}% + 24px)`, backgroundColor: KLEUR.oranje, borderRadius: 5, transform: 'rotate(-8deg)' }} />
                  )}
                </div>
                {b.sub && <div style={{ fontWeight: 800, fontSize: 28, color: KLEUR.room, opacity: 0.85, whiteSpace: 'nowrap' }}>{b.sub}</div>}
              </div>
              {/* Naam onder de grondlijn. */}
              <div style={{
                position: 'absolute', left: midden(i) - 160, width: 320, top: BASIS_Y + 22, textAlign: 'center',
                fontWeight: 900, fontSize: 32, lineHeight: 1.1, letterSpacing: 2, color: b.highlight ? KLEUR.oranje : KLEUR.room,
                textShadow: TEKST_SCHADUW, opacity: Math.min(1, groei * 1.3),
              }}>{b.label.split('|').map((r, k) => <div key={k}>{r}</div>)}</div>
            </div>
          );
        })}


      </AbsoluteFill>
    </AbsoluteFill>
  );
};
