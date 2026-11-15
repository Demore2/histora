// De Titanic (v1) — E mineur, koud en ijl: hoge klokjes als sterren, lage pads als zwart water, en morse als ritme.
// Hook: een vuurpijl (whoosh + klokjes die neerdalen). De waarschuwing in morse; na "went to bed" valt alles stil,
// "Ten minutes later" komt binnen op een lage dreun en de ijsberg krijgt de klap. SOS in morse onder het noodsignaal.
// Bij "Nobody woke the radio operator" valt de muziek hard weg; daarna alleen één klok.
// Beats: 0 rockets · 1 didn't move · 2 Californian/ice · 3 warned · 4 shut up · 5 went to bed · 6 iceberg ·
//        7 two hours/help · 8 eight rockets · 9 told the captain · 10 nobody woke · 11 outro
import { Mix, pad, drum, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), tik = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 58, f1: 26, gain, decay: 1.5, noise: 0 }); rumble(fx, t, 2.2, { gain: 0.3 * gain, cut: 280, a: 0.02, rel: 1.6 }); };
  // Morse: punt = 1 eenheid, streep = 3, tussen tekens 1, tussen letters 3. Een zachte, hoge piep (geen klik).
  const morse = (t0, code, eenheid = 0.075, gain = 0.07, tot = Infinity) => {
    let t = t0;
    for (const c of code) {
      if (t > tot) return;
      if (c === ' ') { t += eenheid * 2; continue; }
      const d = c === '.' ? eenheid : eenheid * 3;
      bell(tik, t, m('B6'), { gain, dur: d + 0.04 });
      t += d + eenheid;
    }
  };
  // Een vuurpijl: opstijgende whoosh, dan een knal hoog en neerdalende klokjes.
  const vuurpijl = (t, gain = 1) => {
    whoosh(fx, t, 0.7, { gain: 0.25 * gain, lo: 300, hi: 5000 });
    drum(trom, t + 0.7, { f0: 900, f1: 300, gain: 0.25 * gain, decay: 0.12, noise: 0.8 });
    ['E7', 'B6', 'G6', 'E6'].forEach((n, j) => bell(kop, t + 0.75 + j * 0.12, m(n), { gain: 0.04 * gain, dur: 2.5, pan: j * 0.3 - 0.45 }));
  };

  // 0-1. Koude opening op frame 0: een lage dreun, een kale E-mineur, en de vuurpijl.
  boem(0, 0.8);
  chord(0, s(2), ['E2', 'B2', 'G3'], { a: 0.05, rel: 0.4, gain: 0.1, cut: 600 });
  vuurpijl(0.05, 1);
  bell(kop, s(1) + 0.05, m('E5'), { gain: 0.05, dur: 4 });

  // 2. De Californian in het ijs: ijle sterren, wijde pad.
  chord(s(2), s(3), ['E2', 'B2', 'E3', 'F#3', 'B3'], { a: 0.4, rel: 0.3, gain: 0.085, cut: 1000 });
  ['B5', 'E6', 'F#6', 'B6'].forEach((n, j) => bell(kop, s(2) + 0.2 + j * 0.4, m(n), { gain: 0.03, dur: 3, pan: j * 0.3 - 0.45 }));
  // 3-4. De waarschuwing in morse ("ICE"), dan het antwoord: korter, harder, een lage puls.
  morse(s(3) + 0.1, '.. -.-. .', 0.07, 0.06, e(3));
  chord(s(3), s(5), ['E2', 'G2', 'B2', 'C3'], { a: 0.2, rel: 0.1, gain: 0.09, cut: 800 });
  for (let t = s(4); t < e(4); t += 0.42) drum(trom, t, { f0: 55, f1: 34, gain: 0.3, decay: 0.4, noise: 0 });
  // 5. "He switched off his radio and went to bed." De pad dooft uit; de stilte valt na de zin.
  chord(s(5), e(5) + 0.2, ['E2', 'B2', 'D3'], { a: 0.1, rel: 0.4, gain: 0.07, cut: 600 });
  const stil1 = e(5) + 0.05;

  // 6. "Ten minutes later, the Titanic hit the iceberg." Dreun op de zin, klap op "iceberg".
  boem(s(6) - 0.04, 0.9);
  chord(s(6), s(8), ['E2', 'B2', 'C3', 'G3'], { a: 0.15, rel: 0.2, gain: 0.1, cut: 900 });
  whoosh(fx, s(6) + 0.3, (e(6) - s(6)) * 0.6, { gain: 0.3, lo: 100, hi: 2500 });
  boem(s(6) + (e(6) - s(6)) * 0.78, 1.1);
  // 7. Twee uur roepen om hulp: SOS in morse, twee keer.
  morse(s(7) + 0.05, '... --- ...', 0.065, 0.07, e(7) + 0.2);
  for (let t = s(7); t < e(7); t += 0.5) drum(trom, t, { f0: 55, f1: 34, gain: 0.22, decay: 0.4, noise: 0 });
  // 8-9. Acht vuurpijlen, de kapitein: kleine verre pijlen, spanning omhoog.
  chord(s(8), e(9) + 0.3, ['E2', 'B2', 'E3', 'F3'], { a: 0.2, rel: 0.1, gain: 0.09, cut: 850 });
  [0.1, 0.9, 1.7].forEach((d) => vuurpijl(s(8) + d, 0.5));
  for (let t = s(9); t < e(9) + 0.5; t += 0.3) drum(trom, t, { f0: 55, f1: 34, gain: 0.32, decay: 0.35, noise: 0 });
  const stil2 = e(9) + 0.45;

  // 10. "Nobody woke the radio operator." Muziek weg. 11: één klok en een zachte, open slotpad tot het eind.
  bell(kop, s(11), m('E5'), { gain: 0.06, dur: 4 });
  chord(s(11), total, ['E2', 'B2', 'E3', 'G3', 'B3'], { a: 0.6, rel: 1, gain: 0.08, cut: 900 });
  bell(kop, cta, m('B5'), { gain: 0.045, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(tik, 0.8); mus.add(fx, 0.75);
  mus.reverb(0.9, 0.38, 0.38);
  mus.automate([
    [0, 1], [stil1 - 0.03, 1], [stil1, 0], [s(6) - 0.06, 0], [s(6) - 0.05, 1],
    [stil2 - 0.03, 1], [stil2, 0], [s(11) - 0.06, 0], [s(11) - 0.05, 1], [total - 0.5, 1], [total, 0],
  ]);
  mus.save(out);
};
