// 9/11: Flight 93 (v1) — A mineur, ingetogen. Geen klappen en geen dreunen: alleen strijkers, een paar klokjes en een
// zachte hartslag die versnelt tot "And they fought back". Daarna stilte; het veld krijgt een sober akkoord en
// "Twenty minutes from Washington" komt na een tweede stilte op één lage klok.
// Beats: 0 never reached Washington · 1 it was late · 2 25 minutes late · 3 Ohio · 4 towers · 5 called home ·
//        6 families · 7 a vote · 8 fought back · 9 field · 10 forty died · 11 twenty minutes · 12 outro
import { Mix, pad, drum, bell, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), hart = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  // Hartslag: twee zachte, lage tikken (lub-dub), met een interval dat van stap0 naar stap1 gaat.
  const hartslag = (t0, t1, stap0, stap1, gain = 0.22) => {
    for (let t = t0; t < t1 - 0.1;) {
      const x = (t - t0) / (t1 - t0 || 1);
      drum(hart, t, { f0: 70, f1: 45, gain, decay: 0.22, noise: 0 });
      drum(hart, t + 0.16, { f0: 62, f1: 40, gain: gain * 0.6, decay: 0.2, noise: 0 });
      t += stap0 + (stap1 - stap0) * x;
    }
  };

  // 0-2. Een kale, open quint op frame 0 en een hoge klok; geen dreun.
  chord(0, s(3), ['A2', 'E3', 'C4'], { a: 0.05, rel: 0.4, gain: 0.09, cut: 800 });
  bell(kop, 0.05, m('E5'), { gain: 0.05, dur: 4 });
  bell(kop, s(1) + 0.05, m('C5'), { gain: 0.045, dur: 4 });
  bell(kop, s(2) + 0.1, m('A4'), { gain: 0.04, dur: 4 });

  // 3-4. Ohio, de torens: het akkoord verduistert, de hartslag begint traag.
  chord(s(3), s(5), ['F2', 'C3', 'A3', 'E4'], { a: 0.4, rel: 0.3, gain: 0.085, cut: 750 });
  hartslag(s(3), s(5), 1.0, 0.9, 0.18);

  // 5-8. Bellen naar huis, de stemming, terugvechten: warmer akkoord, de hartslag versnelt.
  chord(s(5), s(7), ['A2', 'E3', 'A3', 'C4'], { a: 0.4, rel: 0.2, gain: 0.08, cut: 900 });
  bell(kop, s(5) + 0.1, m('E5'), { gain: 0.035, dur: 3.5 });
  chord(s(7), e(8) + 0.2, ['D3', 'A3', 'D4', 'F4'], { a: 0.2, rel: 0.1, gain: 0.09, cut: 1100 });
  hartslag(s(5), e(8), 0.85, 0.45, 0.22);
  const stil1 = e(8) + 0.05;

  // 9-10. Het veld en de veertig: een sober, open akkoord dat langzaam opkomt.
  chord(s(9), e(10) + 0.3, ['A2', 'E3', 'A3', 'B3', 'E4'], { a: 0.8, rel: 0.4, gain: 0.08, cut: 900 });
  bell(kop, s(10) + 0.1, m('A4'), { gain: 0.045, dur: 4 });
  const stil2 = e(10) + 0.2;

  // 11. "Twenty minutes from Washington." Eén lage klok in de stilte.
  bell(kop, s(11) - 0.05, m('A3'), { gain: 0.07, dur: 5 });

  // 12. Slot: een zacht, open A-akkoord tot het eind.
  chord(s(12), total, ['A2', 'E3', 'A3', 'C#4', 'E4'], { a: 0.6, rel: 1, gain: 0.075, cut: 900 });
  bell(kop, cta, m('E5'), { gain: 0.04, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(hart, 0.8);
  mus.reverb(0.9, 0.4, 0.4);
  mus.automate([
    [0, 1], [stil1 - 0.03, 1], [stil1, 0], [s(9) - 0.06, 0], [s(9) - 0.05, 1],
    [stil2 - 0.05, 1], [stil2, 0], [s(11) - 0.1, 0], [s(11) - 0.08, 0.8], [e(11) + 0.4, 0.8], [e(11) + 0.45, 0],
    [s(12) - 0.06, 0], [s(12) - 0.05, 1], [total - 0.5, 1], [total, 0],
  ]);
  mus.save(out);
};
