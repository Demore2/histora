// Alexander the Great (v5) — D-mineur, oudheid: lier, pauken, koper.
// Klap op frame 1 (strijd), een marsritme dat aanzwelt tot India, koper op "it was all his", harde stilte
// op "refused to go on", dan een lage toon en één klok bij "thirty-two"; de twist (het graf) krijgt
// een zachte dreun en een open, onopgeloste lier.
// Beats: 0 never lost · 1 who stopped him · 2 king · 3 Asia · 4 fled · 5 India · 6 all his · 7 refused ·
//        8 dead at 32 · 9 no one knows · 10 thirty seconds of history
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), lier = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 75, f1: 30, gain, decay: 1.3, noise: 0 }); rumble(fx, t, 2, { gain: 0.35 * gain, cut: 380, a: 0.025, rel: 1.5 }); };
  const mars = (t0, t1, stap, gain = 0.55) => {
    for (let t = t0, k = 0; t < t1 - 0.1; t += stap, k++) drum(trom, t, { f0: k % 4 === 0 ? 105 : 130, f1: 45, gain: k % 4 === 0 ? gain : gain * 0.55, decay: 0.3, noise: 0.15, pan: k % 2 ? 0.2 : -0.2 });
  };
  const arpeggio = (t0, t1, notes, stap = 0.21) => {
    for (let t = t0, k = 0; t < t1 - 0.1; t += stap, k++) pluck(lier, t, m(notes[k % notes.length]), { gain: 0.14, pan: (k % 3) * 0.3 - 0.3, bright: 0.6 });
  };

  // 0-1. Koude opening: dreun + koper op frame 0, mars eronder.
  boem(0);
  ['D2', 'A2', 'D3', 'F3'].forEach((n, j) => brass(kop, 0, 1.4, m(n), { pan: j * 0.3 - 0.45, gain: 0.15 }));
  chord(0, s(2), ['D2', 'A2', 'D3'], { a: 0.15, rel: 0.2, gain: 0.12, cut: 600 });
  mars(0.35, s(2), 0.36, 0.5);

  // 2. Koning op zijn twintigste: flits-dreun, lier, Bb-akkoord.
  boem(s(2) - 0.05, 0.8);
  chord(s(2), s(3), ['Bb1', 'F2', 'D3'], { a: 0.4, rel: 0.4, gain: 0.1 });
  arpeggio(s(2), s(3), ['D4', 'F4', 'A4', 'F4']);

  // 3-4. Azië in, de Perzische koning vlucht: mars terug, sneller; dreun + koper op de vlucht.
  chord(s(3), s(5), ['D2', 'A2', 'D3', 'F3'], { a: 0.3, rel: 0.2, gain: 0.11 });
  mars(s(3), s(5), 0.3, 0.55);
  arpeggio(s(3), s(5), ['D4', 'A4', 'F4', 'A4'], 0.15);
  boem(s(4) - 0.05);
  ['D3', 'A3', 'D4'].forEach((n, j) => brass(kop, s(4), 2, m(n), { pan: j * 0.4 - 0.4, gain: 0.14 }));

  // 5-6. Naar India, en het hele rijk: alles zwelt, koper in F-groot op "it was all his".
  chord(s(5), s(6), ['A1', 'E2', 'C#3', 'A3'], { a: 0.5, rel: 0.1, gain: 0.12, cut: 1000 });
  mars(s(5), s(6), 0.24, 0.6);
  boem(s(6) - 0.05, 0.9);
  ['F2', 'C3', 'F3', 'A3', 'C4'].forEach((n, j) => brass(kop, s(6), e(6) - s(6) + 1.2, m(n), { pan: j * 0.3 - 0.6, gain: 0.13 }));
  chord(s(6), s(7), ['F1', 'C2', 'A2', 'F3'], { a: 0.3, rel: 0.2, gain: 0.13, cut: 1300 });

  // 7. Hyphasis: spanning, dan valt alles hard weg midden in "his own soldiers refused".
  const stil = s(7) + (e(7) - s(7)) * 0.55;
  chord(s(7), stil, ['D2', 'A2', 'D3', 'F3'], { a: 0.2, rel: 0.05, gain: 0.12, cut: 900 });
  mars(s(7), stil, 0.22, 0.55);
  whoosh(fx, s(7), stil - s(7), { gain: 0.45, lo: 150, hi: 3500 });

  // 8. Na de stilte: dreun, lage toon, lier, één klok op "thirty-two".
  boem(s(8) - 0.05, 0.9);
  chord(s(8), s(9), ['D2', 'A2', 'F3'], { a: 1, rel: 0.6, gain: 0.08, cut: 650 });
  pluck(lier, s(8) + 0.2, m('F4'), { gain: 0.12, dur: 3 });
  bell(kop, s(8) + (e(8) - s(8)) * 0.75, m('D5'), { gain: 0.08, dur: 4 });

  // 9. De twist (het graf is zoek): zachte dreun, een open akkoord dat niet oplost, een verre klok.
  boem(s(9) - 0.05, 0.6);
  chord(s(9), total, ['Bb1', 'F2', 'C3', 'E3'], { a: 0.8, rel: 1.4, gain: 0.08, cut: 800 });
  pluck(lier, s(9) + 0.1, m('E4'), { gain: 0.11, dur: 3 });
  pluck(lier, s(9) + 0.6, m('C5'), { gain: 0.09, dur: 3 });
  bell(kop, e(9) - 0.2, m('A5'), { gain: 0.06, dur: 4 });
  // 10. "That's thirty seconds of history." en de CTA.
  pluck(lier, s(10), m('D4'), { gain: 0.12, dur: 2.5 });
  pluck(lier, s(10) + 0.2, m('A4'), { gain: 0.1, dur: 2.5 });
  pluck(lier, cta, m('F4'), { gain: 0.09, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.9); mus.add(lier, 1); mus.add(fx, 0.8);
  mus.reverb(0.84, 0.32, 0.32);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [s(8) - 0.06, 0], [s(8) - 0.05, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
