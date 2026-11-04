import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Motion } from './types';
import { W } from './theme';

type Props = { src: string; aspect: number; motion: Motion };

const glad = Easing.bezier(0.4, 0, 0.3, 1);

/** Midden van het beeld (y), net boven het midden: de hook staat erboven, de ondertitels eronder. */
const MIDDEN_Y = 950;
/** Hoogte van het vak voor staande beelden (portretten). */
const STAAND_H = 960;

/**
 * Het schilderij staat er héél in, niets wordt afgesneden: een kaart over de volle breedte (of, staand, over
 * de volle hoogte van het middenvak), met een vage, donkere kopie van zichzelf als achtergrond. De beweging is
 * de kaart die langzaam groeit en een fractie meedrijft, plus de achtergrond die de andere kant op zoomt;
 * dat geeft diepte zonder ooit een rand van het beeld weg te nemen.
 */
export const Scene = ({ src, aspect, motion }: Props) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: 'clamp', easing: glad });
  const binnen = interpolate(frame, [0, 9], [0.94, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const liggend = aspect >= 1;
  // Liggend iets smaller dan het frame, zodat ook de groei (5%) binnen beeld blijft.
  const w = liggend ? W - 80 : STAAND_H * aspect;
  const h = liggend ? (W - 80) / aspect : STAAND_H;
  const groei = interpolate(p, [0, 1], [1, 1.05]) * binnen;
  // Pan = langzaam meedrijven naar de kant van de focus; push = groeien naar het focuspunt toe.
  const drift = motion.kind === 'pan' ? interpolate(p, [0, 1], [(0.5 - motion.x0) * 60, (0.5 - motion.x1) * 60]) : 0;
  const origin = motion.kind === 'push' ? `${motion.fx * 100}% ${motion.fy * 100}%` : '50% 50%';
  const achterZoom = interpolate(p, [0, 1], [1.25, 1.15]);

  // Staand 9:16 (voor de short zelf gemaakt): schermvullend, dus niets afgesneden en geen lege rand. Alleen een
  // langzame zoom naar het focuspunt, plus een waas boven en onder zodat hook, jaartal en ondertitels leesbaar blijven.
  if (aspect < 0.6) {
    const zoom = interpolate(p, [0, 1], [1, 1.07]) * interpolate(frame, [0, 9], [1.03, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    return (
      <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#0C0B08' }}>
        <Img src={staticFile(src)} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transform: `translateX(${drift}px) scale(${zoom})`, transformOrigin: origin,
        }} />
        <AbsoluteFill style={{
          background: 'linear-gradient(to bottom, rgba(12,11,8,0.7) 0%, rgba(12,11,8,0.15) 30%, rgba(12,11,8,0.25) 55%, rgba(12,11,8,0.75) 100%)',
        }} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#0C0B08' }}>
      <Img src={staticFile(src)} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        filter: 'blur(36px) brightness(0.42) saturate(1.15)', transform: `scale(${achterZoom})`,
      }} />
      <div style={{
        position: 'absolute', left: (W - w) / 2, top: MIDDEN_Y - h / 2, width: w, height: h,
        transform: `translateX(${drift}px) scale(${groei})`, transformOrigin: origin,
        borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.65), 0 0 0 2px rgba(255,241,220,0.12)',
      }}>
        <Img src={staticFile(src)} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </AbsoluteFill>
  );
};
