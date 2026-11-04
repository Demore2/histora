// Cleopatra (v1) — E Phrygisch-dominant (E F G# A B C D): een lage drone, lier, lijsttrom. De tijdlijn opent
// met een opstijgende glinstering per punt. Na "But Cleopatra wasn't Egyptian" (harde stilte) wisselt de
// toonsoort naar A-Dorisch: Grieks klinkt anders dan Egyptisch, en dat ís de twist.
// Beats: 0 closer to the Moon landing · 1 who was she · 2 queen at 18 · 3 Caesar · 4 Antony · 5 Actium ·
//        6 dead · 7 wasn't Egyptian · 8 Macedonian Greeks · 9 first to learn Egyptian · 10 outro
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), lier = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 72, f1: 32, gain, decay: 1.2, noise: 0 }); rumble(fx, t, 1.8, { gain: 0.3 * gain, cut: 360, a: 0.025, rel: 1.3 }); };
  // Lijsttrom (riq/tar): doem-tak-tak, doem-tak.
  const lijst = (t0, t1, stap, gain = 0.45) => {
    const patroon = [1, 0, 0.5, 0.45, 0.8, 0, 0.5, 0];
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) {
      const p = patroon[k % 8];
      if (!p) continue;
      const laag = k % 8 === 0 || k % 8 === 4;
      drum(trom, t, { f0: laag ? 140 : 380, f1: laag ? 70 : 260, gain: gain * p, decay: laag ? 0.26 : 0.07, noise: laag ? 0.2 : 0.7, pan: laag ? 0 : (k % 2 ? 0.3 : -0.3) });
    }
  };
  const arpeggio = (t0, t1, notes, stap = 0.2, gain = 0.13) => {
    for (let t = t0, k = 0; t < t1 - 0.08; t += stap, k++) pluck(lier, t, m(notes[k % notes.length]), { gain, pan: (k % 3) * 0.3 - 0.3, bright: 0.6 });
  };

  // 0. De tijdlijn: drone op E, en per punt een opstijgende klok (piramide, Cleopatra, maan).
  boem(0, 0.9);
  chord(0, s(2), ['E1', 'B1', 'E2'], { a: 0.08, rel: 0.3, gain: 0.11, cut: 520 });
  const lijnEind = s(0) + (s(2) - s(0)) * 0.42;
  ['E5', 'G#5', 'B5'].forEach((n, j) => bell(kop, 0.05 + ((lijnEind - 0.05) * j) / 2, m(n), { gain: 0.08, dur: 3, pan: j * 0.5 - 0.5 }));
  whoosh(fx, 0.05, lijnEind, { gain: 0.25, lo: 200, hi: 2600 });
  arpeggio(0.3, s(1), ['E4', 'F4', 'G#4', 'B4', 'G#4', 'F4'], 0.2, 0.1);
  // De twee afstanden die optellen: twee hoge klokjes.
  bell(kop, lijnEind + 0.25, m('E6'), { gain: 0.05, dur: 2.5 });
  bell(kop, lijnEind + 0.72, m('F6'), { gain: 0.05, dur: 2.5 });
  // 1. "So who was she, really?" De lier houdt in, een open akkoord.
  chord(s(1), s(2), ['A1', 'E2', 'C3'], { a: 0.3, rel: 0.3, gain: 0.08, cut: 650 });

  // 2. Koningin op achttien: dreun, koper, lijsttrom begint.
  boem(s(2) - 0.05, 0.85);
  ['E2', 'B2', 'E3', 'G#3'].forEach((n, j) => brass(kop, s(2), e(2) - s(2) + 0.7, m(n), { pan: j * 0.3 - 0.45, gain: 0.12 }));
  chord(s(2), s(3), ['E1', 'B1', 'G#2', 'E3'], { a: 0.2, rel: 0.2, gain: 0.1, cut: 900 });
  lijst(s(2) + 0.1, s(3), 0.2, 0.4);
  // 3-4. Caesar, dan Antonius: de lier wordt drukker, het ritme sneller.
  chord(s(3), s(5), ['F1', 'C2', 'A2', 'F3'], { a: 0.3, rel: 0.2, gain: 0.1, cut: 900 });
  lijst(s(3), s(5), 0.17, 0.48);
  arpeggio(s(3), s(4), ['F4', 'A4', 'C5', 'A4'], 0.17);
  arpeggio(s(4), s(5), ['G#4', 'B4', 'D5', 'B4'], 0.15);
  bell(kop, s(4) + 0.05, m('B5'), { gain: 0.05, dur: 2.5 });

  // 5. Actium: dreun, oorlogskoper, wind.
  boem(s(5) - 0.05);
  ['E2', 'F2', 'B2', 'E3'].forEach((n, j) => brass(kop, s(5), e(5) - s(5) + 0.8, m(n), { pan: j * 0.3 - 0.45, gain: 0.13 }));
  chord(s(5), s(6), ['E1', 'F1', 'B1', 'E2'], { a: 0.1, rel: 0.2, gain: 0.12, cut: 800 });
  lijst(s(5), s(6), 0.13, 0.6);
  whoosh(fx, s(5), e(5) - s(5) + 0.3, { gain: 0.4, lo: 150, hi: 3500 });

  // 6. Haar dood: alles valt terug, lage drone, één klok.
  chord(s(6), s(7), ['E1', 'B1', 'G2'], { a: 0.4, rel: 0.2, gain: 0.08, cut: 550 });
  bell(kop, s(6) + (e(6) - s(6)) * 0.7, m('E5'), { gain: 0.07, dur: 4 });
  pluck(lier, s(6) + 0.1, m('F4'), { gain: 0.11, dur: 3 });

  // 7. "But Cleopatra wasn't Egyptian." Harde stilte (de automatisering).
  const stil = s(7) - 0.02;

  // 8-9. De twist: A-Dorisch (Grieks), helder, een lichtere lier en een nieuwe kleur.
  boem(s(8) - 0.05, 0.85);
  chord(s(8), s(10), ['A1', 'E2', 'C3', 'F#3'], { a: 0.25, rel: 0.2, gain: 0.1, cut: 1100 });
  arpeggio(s(8), s(9), ['A4', 'C5', 'E5', 'F#5', 'E5', 'C5'], 0.16, 0.12);
  ['A2', 'E3', 'A3'].forEach((n, j) => brass(kop, s(8), e(8) - s(8) + 0.6, m(n), { pan: j * 0.4 - 0.4, gain: 0.1 }));
  lijst(s(8), s(10), 0.18, 0.38);
  arpeggio(s(9), s(10), ['D5', 'F#5', 'A5', 'F#5'], 0.16, 0.12);
  bell(kop, s(9) + (e(9) - s(9)) * 0.85, m('A5'), { gain: 0.07, dur: 3.5 });

  // 10. Outro + CTA: terug naar E, de drone, het opstijgende motief van de tijdlijn.
  chord(s(10), total, ['E1', 'B1', 'E2', 'G#2'], { a: 0.4, rel: 1, gain: 0.07, cut: 700 });
  arpeggio(s(10), total - 0.4, ['E4', 'G#4', 'B4', 'G#4'], 0.21, 0.09);
  bell(kop, cta, m('B5'), { gain: 0.05, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(lier, 1); mus.add(fx, 0.75);
  mus.reverb(0.84, 0.32, 0.32);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [s(8) - 0.06, 0], [s(8) - 0.05, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
