import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { ShortConfig, Timing } from './types';
import { f, kleurDelen } from './tijd';
import { FONT, KLEUR, TEKST_SCHADUW } from './theme';

type Woord = { tekst: string; oranje: boolean; van: number };
type Kaart = { van: number; tot: number; woorden: Woord[] };

/**
 * Elke beat wordt 1-3 kaarten; kaart- en woordtijden worden binnen de gesproken tijd van de beat
 * verdeeld naar het aantal tekens. Een echte opname levert alleen begin en eind van de zin, en dat is
 * nauwkeurig genoeg: het oog volgt het oplichtende woord, geen fonemen.
 */
const maakKaarten = (c: ShortConfig, t: Timing): Kaart[] => {
  const uit: Kaart[] = [];
  c.beats.forEach((beat, b) => {
    const [a, e] = t.beats[b];
    const volgendeStart = b + 1 < c.beats.length ? t.beats[b + 1][0] : t.cta[0];
    const kaarten = beat.cap ?? [beat.say];
    const lens = kaarten.map((k) => k.replace(/[{}]/g, '').length);
    const som = lens.reduce((x, y) => x + y, 0);
    let p = a;
    kaarten.forEach((k, j) => {
      const duur = ((e - a) * lens[j]) / som;
      const woorden: Woord[] = [];
      let q = p;
      for (const deel of kleurDelen(k)) {
        for (const w of deel.tekst.split(/\s+/).filter(Boolean)) {
          woorden.push({ tekst: w, oranje: deel.oranje, van: f(q) });
          q += (duur * (w.length + 1)) / (lens[j] + 1);
        }
      }
      const laatste = j === kaarten.length - 1;
      uit.push({ van: f(p), tot: f(laatste ? Math.min(volgendeStart, e + 0.35) : p + duur), woorden });
      p += duur;
    });
  });
  return uit;
};

export const Captions = ({ config, timing }: { config: ShortConfig; timing: Timing }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kaart = maakKaarten(config, timing).find((k) => frame >= k.van && frame < k.tot);
  if (!kaart) return null;

  // Alleen schaal bij binnenkomst, nooit doorzichtigheid: op frame 0 moet de tekst er volledig staan.
  const pop = spring({ frame: frame - kaart.van, fps, config: { damping: 14, stiffness: 260 }, from: 0.86, to: 1 });
  const huidig = kaart.woorden.findLastIndex((w) => frame >= w.van);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 1300 }}>
      <div style={{ width: 880, textAlign: 'center', transform: `scale(${pop})`, fontFamily: FONT, fontWeight: 900, fontSize: 84, lineHeight: 1.12, letterSpacing: -1 }}>
        {kaart.woorden.map((w, i) => {
          const gezegd = i <= huidig;
          const nu = i === huidig ? interpolate(frame - w.van, [0, 3, 7], [1, 1.08, 1.04], { extrapolateRight: 'clamp' }) : 1;
          return (
            <span key={i} style={{
              display: 'inline-block', margin: '0 15px', transform: `scale(${nu})`,
              color: w.oranje ? KLEUR.oranje : KLEUR.wit, opacity: gezegd ? 1 : 0.55, textShadow: TEKST_SCHADUW,
            }}>
              {w.tekst}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
