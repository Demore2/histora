// Qin Shi Huang (v1) — A pentatonisch mineur (A C D E G): guzheng-plukken, grote taiko-achtige dreunen, een lage gong.
// Keizerlijk en zwaar in het begin, mysterieus bij de alchemist (glinsterende klokjes = kwik), een gong bij zijn dood,
// het leger als een mars, harde stilte op "never been opened", en een duister, zwevend slot boven het verzegelde graf.
// Beats: 0 live forever · 1 what killed him · 2 First Emperor · 3 ships · 4 pills · 5 mercury · 6 died on the road ·
//        7 clay soldiers · 8 never opened · 9 rivers of mercury · 10 soil · 11 outro
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), zheng = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const taiko = (t, gain = 1) => { drum(trom, t, { f0: 64, f1: 28, gain, decay: 1.3, noise: 0.05 }); rumble(fx, t, 1.9, { gain: 0.32 * gain, cut: 330, a: 0.02, rel: 1.4 }); };
  const gong = (t, gain = 1) => { bell(kop, t, m('A2'), { gain: 0.12 * gain, dur: 6 }); bell(kop, t, m('E3'), { gain: 0.06 * gain, dur: 5 }); rumble(fx, t, 3, { gain: 0.2 * gain, cut: 260, a: 0.01, rel: 2.5 }); };
  const mars = (t0, t1, stap, gain = 0.4) => {
    const patroon = [1, 0, 0.5, 0, 0.8, 0, 0.5, 0.5];
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) {
      const p = patroon[k % 8];
      if (p) drum(trom, t, { f0: k % 4 === 0 ? 90 : 200, f1: k % 4 === 0 ? 45 : 130, gain: gain * p, decay: k % 4 === 0 ? 0.4 : 0.12, noise: 0.25, pan: k % 2 ? 0.2 : -0.2 });
    }
  };
  const guzheng = (t0, t1, notes, stap = 0.18, gain = 0.12) => {
    for (let t = t0, k = 0; t < t1 - 0.08; t += stap, k++) pluck(zheng, t, m(notes[k % notes.length]), { gain, pan: (k % 3) * 0.3 - 0.3, bright: 0.7 });
  };

  // 0. Koude opening: taiko op frame 0, keizerlijk koper, een opgaande guzheng-glissando.
  taiko(0);
  chord(0, s(1), ['A1', 'E2', 'A2'], { a: 0.08, rel: 0.3, gain: 0.11, cut: 600 });
  ['A2', 'E3', 'A3'].forEach((n, j) => brass(kop, 0.02, e(0) + 0.5, m(n), { pan: j * 0.4 - 0.4, gain: 0.12 }));
  ['A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5'].forEach((n, j) => pluck(zheng, 0.1 + j * 0.06, m(n), { gain: 0.1, bright: 0.7, pan: j * 0.15 - 0.45 }));
  // 1. "So what killed him?" Een donker akkoord, een tik.
  chord(s(1), s(2), ['A1', 'C2', 'E2', 'G2'], { a: 0.2, rel: 0.3, gain: 0.08, cut: 520 });
  bell(kop, s(1) + 0.1, m('E5'), { gain: 0.05, dur: 3 });

  // 2. Eerste keizer: de kaart, taiko, groots.
  taiko(s(2) - 0.05, 0.9);
  ['A2', 'E3', 'A3', 'C4'].forEach((n, j) => brass(kop, s(2), e(2) - s(2) + 0.6, m(n), { pan: j * 0.3 - 0.45, gain: 0.12 }));
  chord(s(2), s(4), ['A1', 'E2', 'A2', 'C3'], { a: 0.25, rel: 0.2, gain: 0.1, cut: 850 });
  // 3. De vloot: guzheng golvend, wind.
  guzheng(s(3), s(4), ['A4', 'C5', 'D5', 'E5', 'D5', 'C5'], 0.17);
  whoosh(fx, s(3), e(3) - s(3) + 0.4, { gain: 0.22, lo: 120, hi: 1800 });

  // 4-5. De alchemist en het kwik: mysterieus, glinsterende klokjes, een lage puls.
  chord(s(4), s(6), ['A1', 'D2', 'G2', 'C3'], { a: 0.35, rel: 0.2, gain: 0.08, cut: 620 });
  for (let t = s(4) + 0.1, k = 0; t < s(6) - 0.2; t += 0.24, k++) bell(kop, t, m(['E6', 'G6', 'A6', 'C7', 'A6', 'G6'][k % 6]), { gain: 0.025, dur: 1.4, pan: k % 2 ? 0.4 : -0.4 });
  for (let t = s(4); t < s(6) - 0.1; t += 0.62) drum(trom, t, { f0: 58, f1: 36, gain: 0.25, decay: 0.5, noise: 0 });
  taiko(s(5) - 0.04, 0.6);

  // 6. Zijn dood onderweg: een gong, alles daalt.
  gong(s(6) + 0.05);
  chord(s(6), s(7), ['A1', 'E2', 'G2'], { a: 0.5, rel: 0.2, gain: 0.07, cut: 480 });

  // 7. Het terracottaleger: een mars, koper erbij.
  taiko(s(7) - 0.05);
  mars(s(7), s(8), 0.17, 0.45);
  ['A2', 'E3', 'A3'].forEach((n, j) => brass(kop, s(7), e(7) - s(7) + 0.5, m(n), { pan: j * 0.4 - 0.4, gain: 0.12 }));
  chord(s(7), s(8), ['A1', 'E2', 'A2', 'E3'], { a: 0.1, rel: 0.2, gain: 0.1, cut: 900 });

  // 8. "But his own tomb has never been opened." Harde stilte.
  const stil = s(8) - 0.02;

  // 9-10. De kwikrivieren en de grond: zwevend, duister, een lage drone met glinstering, een laatste taiko.
  taiko(s(9) - 0.05, 0.75);
  chord(s(9), total, ['A1', 'E2', 'C3', 'G3'], { a: 0.3, rel: 1, gain: 0.08, cut: 700 });
  for (let t = s(9) + 0.1, k = 0; t < s(11) - 0.2; t += 0.3, k++) bell(kop, t, m(['A5', 'C6', 'E6', 'G6', 'E6', 'C6'][k % 6]), { gain: 0.025, dur: 1.8, pan: k % 2 ? 0.35 : -0.35 });
  guzheng(s(10), s(11), ['E4', 'G4', 'A4', 'C5'], 0.22, 0.1);
  gong(s(10) + (e(10) - s(10)) * 0.8, 0.7);

  // 11. Outro + CTA.
  guzheng(s(11), total - 0.4, ['A4', 'C5', 'E5', 'C5'], 0.22, 0.09);
  bell(kop, cta, m('E5'), { gain: 0.05, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(zheng, 1); mus.add(fx, 0.75);
  mus.reverb(0.86, 0.34, 0.34);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [s(9) - 0.06, 0], [s(9) - 0.05, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
