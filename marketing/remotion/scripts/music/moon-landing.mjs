// De maanlanding (v1) — D mineur, filmisch en ruimtelijk: lange pads, een tikkende puls (de klok loopt), lage dreunen.
// Spanning bouwt op tot "There was no backup" (harde stilte), de speech krijgt een rouwend, sober akkoord, en na de
// viltstift volgt een tweede harde stilte waarna "It fired" openbreekt in een groot D-groot met koper.
// Beats: 0 speech ready · 1 never came home · 2 July 1969 · 3 one engine · 4 no backup · 5 air ran out ·
//        6 the speech · 7 broken switch · 8 armed that engine · 9 felt-tip pen · 10 it fired · 11 outro
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), tik = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 60, f1: 26, gain, decay: 1.4, noise: 0 }); rumble(fx, t, 2, { gain: 0.3 * gain, cut: 300, a: 0.02, rel: 1.5 }); };
  // De klok: een droge, hoge tik, steeds iets sneller.
  const klok = (t0, t1, stap0, stap1, gain = 0.18) => {
    for (let t = t0; t < t1 - 0.03;) {
      const x = (t - t0) / (t1 - t0 || 1);
      drum(tik, t, { f0: 2400, f1: 1800, gain, decay: 0.025, noise: 0.6 });
      t += stap0 + (stap1 - stap0) * x;
    }
  };

  // 0. Koude opening: een lage dreun op frame 0, een kale pad, de klok begint.
  boem(0, 0.9);
  chord(0, s(2), ['D2', 'A2', 'F3'], { a: 0.05, rel: 0.4, gain: 0.1, cut: 650 });
  bell(kop, 0.05, m('A5'), { gain: 0.06, dur: 4 });
  klok(0.2, s(2), 0.5, 0.5, 0.12);
  // 1. "In case they never came home." Een tweede, lagere klok.
  bell(kop, s(1) + 0.1, m('D5'), { gain: 0.05, dur: 4 });

  // 2. Juli 1969: ruimte, een opgaande pad, ijle klokjes.
  chord(s(2), s(3), ['D2', 'A2', 'D3', 'E3', 'A3'], { a: 0.4, rel: 0.3, gain: 0.09, cut: 1100 });
  ['D5', 'E5', 'A5', 'D6'].forEach((n, j) => bell(kop, s(2) + 0.2 + j * 0.35, m(n), { gain: 0.035, dur: 3, pan: j * 0.3 - 0.45 }));
  // 3-4. Eén motor, geen reserve: de klok versnelt, een lage puls, oplopende spanning tot de stilte.
  chord(s(3), s(4) + 0.4, ['D2', 'Eb2', 'A2', 'Bb2'], { a: 0.2, rel: 0.1, gain: 0.1, cut: 800 });
  klok(s(3), s(4) + 0.25, 0.32, 0.12, 0.17);
  for (let t = s(3); t < s(4) + 0.2; t += 0.44) drum(trom, t, { f0: 55, f1: 34, gain: 0.32, decay: 0.45, noise: 0 });
  whoosh(fx, s(3), s(4) - s(3) + 0.3, { gain: 0.3, lo: 100, hi: 2500 });
  // De harde stilte valt midden in beat 4, direct na "There was".
  const stil1 = s(4) + 0.35;

  // 5-6. De lucht raakt op, en de speech: sober, rouwend, alleen strijkers en een trage klok.
  chord(s(5), s(7), ['D2', 'A2', 'C3', 'F3'], { a: 0.6, rel: 0.3, gain: 0.08, cut: 600 });
  bell(kop, s(6) + 0.1, m('F5'), { gain: 0.05, dur: 4 });
  bell(kop, s(6) + (e(6) - s(6)) * 0.55, m('D5'), { gain: 0.05, dur: 4 });
  bell(kop, e(6) - 0.4, m('A4'), { gain: 0.05, dur: 4 });

  // 7-9. De kapotte schakelaar en de stift: de klok terug, sneller, de spanning omhoog.
  boem(s(7) - 0.05, 0.7);
  chord(s(7), s(9) + 0.5, ['D2', 'A2', 'D3', 'Eb3'], { a: 0.2, rel: 0.1, gain: 0.09, cut: 850 });
  klok(s(7), s(9) + (e(9) - s(9)) * 0.9, 0.28, 0.09, 0.18);
  for (let t = s(8); t < e(9); t += 0.36) drum(trom, t, { f0: 55, f1: 34, gain: 0.35, decay: 0.4, noise: 0 });
  whoosh(fx, s(9), e(9) - s(9) + 0.2, { gain: 0.35, lo: 120, hi: 3500 });
  const stil2 = e(9) - 0.02;

  // 10. "It fired." Grote dreun en een open D-groot met koper.
  boem(s(10) - 0.04, 1.1);
  ['D2', 'A2', 'D3', 'F#3', 'A3'].forEach((n, j) => brass(kop, s(10), total - s(10), m(n), { pan: j * 0.3 - 0.6, gain: 0.12 }));
  chord(s(10), total, ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'], { a: 0.15, rel: 1, gain: 0.1, cut: 1300 });
  ['D5', 'F#5', 'A5', 'D6'].forEach((n, j) => bell(kop, s(10) + 0.3 + j * 0.25, m(n), { gain: 0.045, dur: 3.5, pan: j * 0.3 - 0.45 }));
  bell(kop, cta, m('A5'), { gain: 0.05, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(tik, 0.7); mus.add(fx, 0.75);
  mus.reverb(0.88, 0.36, 0.36);
  mus.automate([
    [0, 1], [stil1 - 0.03, 1], [stil1, 0], [s(5) - 0.06, 0], [s(5) - 0.05, 1],
    [stil2 - 0.03, 1], [stil2, 0], [s(10) - 0.06, 0], [s(10) - 0.05, 1], [total - 0.5, 1], [total, 0],
  ]);
  mus.save(out);
};
