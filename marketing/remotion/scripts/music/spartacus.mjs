// Spartacus (v3) — E-mineur, nacht en opstand: lage drone, pauken, lier, koper.
// Dreun + koper op "Spartacus versus Rome", spanning bij de uitbraak, een mars die aanzwelt met het slavenleger,
// een daling op "turned back", een kale klok op "no one knows why", de zware dreun van Crassus, een stil slot op
// "never found", dan harde stilte in "And the mountain where it all began" en de vulkaan op "Vesuvius".
// Beats: 0 vs Rome · 1 breakout · 2 trapped · 3 vines/behind · 4 thousands · 5 army after army ·
//        6 north/back · 7 no one knows · 8 Crassus · 9 died fighting · 10 never found ·
//        11 the mountain … Vesuvius · 12 Pompeii · 13 thirty seconds of history
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, explosie, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), lier = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 75, f1: 30, gain, decay: 1.3, noise: 0 }); rumble(fx, t, 2, { gain: 0.35 * gain, cut: 380, a: 0.025, rel: 1.5 }); };
  const mars = (t0, t1, stap, gain = 0.55) => {
    for (let t = t0, k = 0; t < t1 - 0.1; t += stap, k++) drum(trom, t, { f0: k % 4 === 0 ? 105 : 130, f1: 45, gain: k % 4 === 0 ? gain : gain * 0.55, decay: 0.3, noise: 0.15, pan: k % 2 ? 0.2 : -0.2 });
  };
  const arpeggio = (t0, t1, notes, stap = 0.21, gain = 0.14) => {
    for (let t = t0, k = 0; t < t1 - 0.1; t += stap, k++) pluck(lier, t, m(notes[k % notes.length]), { gain, pan: (k % 3) * 0.3 - 0.3, bright: 0.6 });
  };
  const op = (i, f) => s(i) + (e(i) - s(i)) * f;

  // 0. Koude opening: dreun en koper op frame 0, nog een klap op "Rome".
  boem(0);
  ['E2', 'B2', 'E3'].forEach((n, j) => brass(kop, 0, 1.3, m(n), { pan: j * 0.4 - 0.4, gain: 0.14 }));
  boem(op(0, 0.7), 0.8);
  ['G2', 'D3', 'G3'].forEach((n, j) => brass(kop, op(0, 0.7), 1.4, m(n), { pan: j * 0.4 - 0.4, gain: 0.13 }));
  chord(0, s(2), ['E1', 'B1', 'E2'], { a: 0.03, rel: 0.2, gain: 0.11, cut: 500 });

  // 1. De uitbraak: flits-dreun, een gespannen lier en een licht roffeltje eronder.
  boem(s(1) - 0.04, 0.7);
  arpeggio(s(1), e(1), ['E4', 'G4', 'B4', 'G4'], 0.19, 0.12);
  mars(op(1, 0.4), e(1), 0.36, 0.35);

  // 2-3. In de val op de berg; de afdaling langs de ranken (klimmende lier), een klap op "from behind".
  chord(s(2), s(3), ['E1', 'B1', 'F2'], { a: 0.2, rel: 0.1, gain: 0.11, cut: 600 });
  whoosh(fx, s(2), e(2) - s(2) + 0.3, { gain: 0.25, lo: 120, hi: 1500 });
  chord(s(3), s(4), ['A1', 'E2', 'C3'], { a: 0.3, rel: 0.2, gain: 0.1 });
  arpeggio(s(3), op(3, 0.72), ['A3', 'C4', 'E4', 'A4', 'C5', 'E5'], 0.17, 0.13);
  boem(op(3, 0.75), 1);
  ['A2', 'E3', 'A3'].forEach((n, j) => brass(kop, op(3, 0.75), 1.4, m(n), { pan: j * 0.4 - 0.4, gain: 0.13 }));

  // 4-5. Het leger groeit: mars sneller, koper op "army after army".
  chord(s(4), s(6), ['E2', 'B2', 'E3', 'G3'], { a: 0.4, rel: 0.2, gain: 0.12, cut: 1100 });
  mars(s(4), s(6), 0.26, 0.6);
  arpeggio(s(4), s(6), ['E4', 'B4', 'G4', 'B4'], 0.13);
  boem(s(5) - 0.05, 0.8);
  ['C3', 'G3', 'C4', 'E4'].forEach((n, j) => brass(kop, s(5), e(5) - s(5) + 0.8, m(n), { pan: j * 0.3 - 0.45, gain: 0.13 }));

  // 6-7. Naar het noorden en terug: de mars loopt door en zakt weg; dan alleen een klok op "no one knows why".
  chord(s(6), s(7), ['D2', 'A2', 'F3'], { a: 0.3, rel: 0.2, gain: 0.1 });
  mars(s(6), op(6, 0.6), 0.26, 0.45);
  pluck(lier, op(6, 0.65), m('D4'), { gain: 0.12, dur: 2 });
  pluck(lier, op(6, 0.8), m('B3'), { gain: 0.12, dur: 2 });
  chord(s(7), s(8), ['E1', 'B1'], { a: 0.2, rel: 0.2, gain: 0.07, cut: 500 });
  bell(kop, s(7) + 0.05, m('B4'), { gain: 0.08, dur: 3 });

  // 8. Crassus: zware dreun en laag koper, een tweede slag op "crushed".
  boem(s(8) - 0.05, 1.1);
  ['E1', 'B1', 'E2', 'G2'].forEach((n, j) => brass(kop, s(8), e(8) - s(8) + 0.6, m(n), { pan: j * 0.3 - 0.45, gain: 0.14 }));
  drum(trom, op(8, 0.35), { f0: 80, f1: 32, gain: 0.8, decay: 0.9 });
  mars(op(8, 0.4), e(8), 0.3, 0.4);

  // 9-10. Gesneuveld, nooit gevonden: alles dooft uit tot een lage toon en twee noten lier.
  chord(s(9), s(11), ['E2', 'G2', 'B2'], { a: 0.2, rel: 0.4, gain: 0.08, cut: 700 });
  pluck(lier, s(9) + 0.1, m('G4'), { gain: 0.1, dur: 3 });
  pluck(lier, s(10) + 0.1, m('E4'), { gain: 0.09, dur: 3 });

  // 11. "And the mountain where it all began": harde stilte (automatisering hieronder), de vulkaan op "Vesuvius".
  const vesuvius = op(11, 0.72);
  boem(vesuvius - 0.04, 1.2);
  ['E1', 'B1', 'E2'].forEach((n, j) => brass(kop, vesuvius, e(11) - vesuvius + 1, m(n), { pan: j * 0.4 - 0.4, gain: 0.15 }));
  rumble(fx, vesuvius, total - vesuvius, { gain: 0.28, cut: 300, a: 0.05, rel: 1.5 });

  // 12-13. Pompeii: de uitbarsting klinkt in de pauze vóór de zin (de shot heeft lead 0.85 + de knip 0.1 s),
  // met een aanzwellend gegrom ernaartoe; daarna een blijvend gebulder, pauken en een donker E-mineur in het koper.
  const uitbarsting = s(12) - 0.95;
  rumble(fx, e(11), uitbarsting - e(11) + 0.1, { gain: 0.45, cut: 220, a: 0.3, rel: 0.05, swell: (t) => (t / (uitbarsting - e(11) + 0.1)) ** 2 });
  whoosh(fx, e(11) - 0.2, uitbarsting - e(11) + 0.2, { gain: 0.5, lo: 80, hi: 2500, curve: (x) => x * x * x });
  explosie(fx, uitbarsting, { gain: 2.2, dur: 5 });
  drum(trom, uitbarsting, { f0: 70, f1: 26, gain: 1.6, decay: 1.8, noise: 0.6 });
  rumble(fx, uitbarsting + 0.4, total - uitbarsting - 0.4, { gain: 0.42, cut: 260, a: 0.6, rel: 1.6, swell: (t) => 0.75 + 0.25 * Math.sin(t * 1.7) });
  ['E1', 'B1', 'E2', 'G2', 'B2'].forEach((n, j) => brass(kop, uitbarsting + 0.15, total - uitbarsting - 0.6, m(n), { pan: j * 0.3 - 0.6, gain: 0.13 }));
  chord(uitbarsting, total, ['E1', 'B1', 'E2', 'G2'], { a: 0.2, rel: 1.6, gain: 0.11, cut: 700 });
  for (let t = s(12) + 0.2, k = 0; t < s(13) - 0.15; t += 0.11, k++) drum(trom, t, { f0: 95, f1: 40, gain: 0.22 + 0.25 * (k / 20), decay: 0.25, noise: 0.2, pan: k % 2 ? 0.25 : -0.25 });
  boem(op(12, 0.82), 1);
  bell(kop, op(12, 0.84), m('E4'), { gain: 0.08, dur: 4 });
  pluck(lier, s(13), m('E4'), { gain: 0.12, dur: 2.5 });
  pluck(lier, s(13) + 0.2, m('B3'), { gain: 0.1, dur: 2.5 });
  pluck(lier, cta, m('G3'), { gain: 0.09, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.9); mus.add(lier, 1); mus.add(fx, 0.8);
  mus.reverb(0.84, 0.32, 0.32);
  const stil = s(11) - 0.05;
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [vesuvius - 0.06, 0], [vesuvius - 0.05, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
