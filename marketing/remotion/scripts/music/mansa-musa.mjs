// Mansa Musa (v1) — A-mineur pentatonisch (A C D E G): kora-achtige plucks, djembé, een lage trom en
// glinsterende klokjes voor het goud. Klap op frame 1, een karavaanritme door de Sahara, een glinsterregen
// in Cairo, en alles valt hard weg op "he ran out". Daarna een droge, ironische afsluiting.
// Beats: 0 so much gold · 1 in debt? · 2 this is Mansa Musa · 3 Sahara · 4 Cairo · 5 twelve years ·
//        6 ran out · 7 had to borrow · 8 thirty seconds of history
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), kora = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 70, f1: 32, gain, decay: 1.2, noise: 0 }); rumble(fx, t, 1.8, { gain: 0.3 * gain, cut: 360, a: 0.025, rel: 1.3 }); };
  // Djembé: lage "bass"-slag op de tel, hoge "slaps" ertussen, een vast patroon van acht.
  const djembe = (t0, t1, stap, gain = 0.5) => {
    const patroon = [1, 0, 0.5, 0.6, 0, 0.5, 0.7, 0.4];
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) {
      const p = patroon[k % 8];
      if (!p) continue;
      const laag = k % 8 === 0 || k % 8 === 6;
      drum(trom, t, { f0: laag ? 120 : 330, f1: laag ? 60 : 210, gain: gain * p, decay: laag ? 0.28 : 0.09, noise: laag ? 0.1 : 0.55, pan: laag ? 0 : (k % 2 ? 0.35 : -0.35) });
    }
  };
  const koraLoop = (t0, t1, notes, stap = 0.19, gain = 0.13) => {
    for (let t = t0, k = 0; t < t1 - 0.08; t += stap, k++) pluck(kora, t, m(notes[k % notes.length]), { gain, pan: (k % 4) * 0.25 - 0.375, bright: 0.75, dur: 1.6 });
  };
  const glinster = (t0, n = 7, laag = 'A5') => {
    const reeks = ['A5', 'C6', 'D6', 'E6', 'G6', 'A6', 'C7'];
    const start = reeks.indexOf(laag);
    for (let k = 0; k < n; k++) bell(kop, t0 + k * 0.07, m(reeks[(start + k) % reeks.length]), { gain: 0.045, dur: 2.2, pan: (k % 3) * 0.4 - 0.4 });
  };

  // 0-1. Koude opening: dreun, glinsterregen (het goud), kora en djembé eronder.
  boem(0);
  glinster(0.02, 7);
  chord(0, s(2), ['A1', 'E2', 'A2', 'C3'], { a: 0.12, rel: 0.2, gain: 0.11, cut: 650 });
  koraLoop(0.25, s(1), ['A3', 'E4', 'C4', 'E4', 'G4', 'E4']);
  djembe(0.3, s(1), 0.19, 0.45);
  // 1. De vraag: het ritme houdt in, alleen een open kwint en een verre klok.
  chord(s(1), s(2), ['D2', 'A2', 'E3'], { a: 0.3, rel: 0.3, gain: 0.08, cut: 700 });
  bell(kop, e(1) - 0.1, m('E5'), { gain: 0.06, dur: 3 });

  // 2. "This is Mansa Musa": flits-dreun, koper, koninklijk.
  boem(s(2) - 0.05, 0.85);
  ['A2', 'E3', 'A3', 'C4'].forEach((n, j) => brass(kop, s(2), e(2) - s(2) + 0.8, m(n), { pan: j * 0.3 - 0.45, gain: 0.11 }));
  koraLoop(s(2) + 0.1, s(3), ['A4', 'C5', 'E5', 'C5']);

  // 3. De Sahara: karavaanritme, lange drone, wind.
  chord(s(3), s(4), ['A1', 'E2', 'D3', 'E3'], { a: 0.5, rel: 0.2, gain: 0.1, cut: 800 });
  djembe(s(3), s(4), 0.17, 0.55);
  koraLoop(s(3), s(4), ['A3', 'C4', 'D4', 'E4', 'G4', 'E4', 'D4', 'C4'], 0.17);
  whoosh(fx, s(3), e(3) - s(3), { gain: 0.25, lo: 300, hi: 2200 });

  // 4. Cairo: alles aan, groot akkoord, glinsterregen op "gave it away".
  boem(s(4) - 0.05);
  chord(s(4), s(5), ['F1', 'C2', 'A2', 'E3', 'G3'], { a: 0.3, rel: 0.2, gain: 0.13, cut: 1300 });
  ['F2', 'C3', 'F3', 'A3', 'C4'].forEach((n, j) => brass(kop, s(4) + (e(4) - s(4)) * 0.45, (e(4) - s(4)) * 0.55 + 1, m(n), { pan: j * 0.3 - 0.6, gain: 0.11 }));
  djembe(s(4), s(5), 0.15, 0.6);
  koraLoop(s(4), s(5), ['C4', 'E4', 'G4', 'A4', 'G4', 'E4'], 0.15, 0.14);
  glinster(s(4) + (e(4) - s(4)) * 0.45, 7, 'C6');

  // 5. Twaalf jaar later: het tempo zakt, het goud klinkt dof (lage klokken).
  chord(s(5), s(6), ['D2', 'A2', 'C3', 'E3'], { a: 0.4, rel: 0.3, gain: 0.09, cut: 700 });
  djembe(s(5), s(6), 0.24, 0.4);
  bell(kop, s(5) + 0.15, m('A4'), { gain: 0.07, dur: 3.5 });
  bell(kop, s(5) + 0.75, m('E4'), { gain: 0.06, dur: 3.5 });

  // 6. "And on the way home, he ran out." Spanning bouwt op, en valt hard weg midden in de zin.
  const stil = s(6) + (e(6) - s(6)) * 0.62;
  chord(s(6), stil, ['A1', 'E2', 'A2', 'C3'], { a: 0.15, rel: 0.04, gain: 0.11, cut: 900 });
  djembe(s(6), stil, 0.13, 0.55);
  koraLoop(s(6), stil, ['E4', 'A4', 'C5', 'A4'], 0.13);
  whoosh(fx, s(6), stil - s(6), { gain: 0.4, lo: 180, hi: 3200 });

  // 7. De ironie: zachte dreun, één lage kora-noot, een klokje dat niet oplost.
  boem(s(7) - 0.05, 0.6);
  chord(s(7), s(8), ['D2', 'A2', 'F3'], { a: 0.8, rel: 0.5, gain: 0.07, cut: 600 });
  pluck(kora, s(7) + 0.15, m('A3'), { gain: 0.13, dur: 3 });
  pluck(kora, s(7) + 0.55, m('G3'), { gain: 0.1, dur: 3 });
  bell(kop, e(7) - 0.15, m('D5'), { gain: 0.06, dur: 3.5 });

  // 8. "That's thirty seconds of history." + CTA: het kora-motief nog één keer, licht.
  koraLoop(s(8), total - 0.3, ['A4', 'E4', 'C5', 'E4'], 0.21, 0.09);
  pluck(kora, cta, m('A3'), { gain: 0.1, dur: 2.5 });
  chord(s(8), total, ['A1', 'E2', 'A2', 'C3'], { a: 0.5, rel: 1, gain: 0.07, cut: 700 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(kora, 1); mus.add(fx, 0.75);
  mus.reverb(0.82, 0.3, 0.3);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [s(7) - 0.06, 0], [s(7) - 0.05, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
