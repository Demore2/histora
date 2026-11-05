// Ashoka (v1) — D Bhairav-kleur (D Eb F# G A Bb C#): een tanpura-drone op D-A, tabla-achtige trommen, een harmonium-pad.
// Oorlog in het begin (dreun, koper, snel ritme), daarna rouw (alles valt terug), dan de wending naar D-groot bij de
// zuilen. Harde stilte op "Then he was forgotten", en het slot (de vlag) breekt open in een helder, warm D-groot.
// Beats: 0 bloodiest war · 1 why say sorry · 2 Kalinga · 3 100,000 killed · 4 remorse · 5 Buddhism, pillars ·
//        6 no cruelty · 7 every faith · 8 forgotten · 9 wheel on the flag · 10 outro
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), snaar = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 70, f1: 30, gain, decay: 1.2, noise: 0 }); rumble(fx, t, 1.8, { gain: 0.3 * gain, cut: 360, a: 0.025, rel: 1.3 }); };
  // Tabla-achtig: dha (laag + hoog), ta (hoog), na (droog).
  const tabla = (t0, t1, stap, gain = 0.45) => {
    const patroon = [1, 0.4, 0.6, 0, 0.8, 0.4, 0.6, 0.35];
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) {
      const p = patroon[k % 8];
      if (!p) continue;
      const laag = k % 4 === 0;
      drum(trom, t, { f0: laag ? 110 : 520, f1: laag ? 62 : 400, gain: gain * p, decay: laag ? 0.32 : 0.09, noise: laag ? 0.1 : 0.4, pan: laag ? 0 : (k % 2 ? 0.3 : -0.3) });
    }
  };
  const sitar = (t0, t1, notes, stap = 0.2, gain = 0.12) => {
    for (let t = t0, k = 0; t < t1 - 0.08; t += stap, k++) pluck(snaar, t, m(notes[k % notes.length]), { gain, pan: (k % 3) * 0.3 - 0.3, bright: 0.75 });
  };
  const tanpura = (t0, t1, gain = 0.09) => chord(t0, t1, ['D1', 'A1', 'D2'], { a: 0.08, rel: 0.3, gain, cut: 540 });

  // 0. Koude opening: de oorlog. Dreun op frame 0, koper, snelle trommen.
  boem(0);
  tanpura(0, s(2), 0.11);
  ['D2', 'A2', 'D3', 'Eb3'].forEach((n, j) => brass(kop, 0.02, e(0) + 0.6, m(n), { pan: j * 0.3 - 0.45, gain: 0.13 }));
  tabla(0.1, e(0), 0.13, 0.55);
  whoosh(fx, 0.05, e(0), { gain: 0.3, lo: 150, hi: 3200 });
  // 1. "So why did he say sorry?" Het ritme stopt, één open akkoord, een klok.
  chord(s(1), s(2), ['D2', 'A2', 'F#3'], { a: 0.25, rel: 0.3, gain: 0.08, cut: 650 });
  bell(kop, s(1) + 0.1, m('A5'), { gain: 0.06, dur: 3 });

  // 2. Kalinga: de kaart, de mars van een leger.
  boem(s(2) - 0.05, 0.8);
  tanpura(s(2), s(4));
  tabla(s(2) + 0.05, s(3), 0.18, 0.45);
  sitar(s(2), s(3), ['D4', 'Eb4', 'F#4', 'A4', 'F#4', 'Eb4'], 0.18);
  // 3. De doden: zwaar, lage koperen akkoorden, het ritme halveert.
  boem(s(3) - 0.05, 0.9);
  ['D2', 'Eb2', 'A2'].forEach((n, j) => brass(kop, s(3), e(3) - s(3) + 0.6, m(n), { pan: j * 0.4 - 0.4, gain: 0.12 }));
  chord(s(3), s(4), ['D1', 'Eb2', 'A2', 'Bb2'], { a: 0.2, rel: 0.2, gain: 0.1, cut: 700 });
  tabla(s(3), s(4), 0.26, 0.35);

  // 4. Spijt: alles valt terug. Lage drone, één trage sitar-frase.
  chord(s(4), s(5), ['D1', 'A1', 'F2'], { a: 0.5, rel: 0.2, gain: 0.08, cut: 520 });
  [['Bb4', 0], ['A4', 0.45], ['F#4', 0.9], ['D4', 1.45]].forEach(([n, d]) => pluck(snaar, s(4) + d, m(n), { gain: 0.11, dur: 2.5, bright: 0.55 }));

  // 5-7. De zuilen: wending naar D-groot, licht, rustig ritme. "No cruelty" en "every faith" krijgen elk een klok.
  boem(s(5) - 0.05, 0.6);
  chord(s(5), s(8), ['D2', 'A2', 'F#3', 'D4'], { a: 0.4, rel: 0.3, gain: 0.09, cut: 1000 });
  tabla(s(5), s(8), 0.22, 0.3);
  sitar(s(5), s(6), ['D4', 'F#4', 'A4', 'D5', 'A4', 'F#4'], 0.2, 0.1);
  bell(kop, s(6) + 0.05, m('D6'), { gain: 0.05, dur: 2.5 });
  bell(kop, s(7) + 0.05, m('F#6'), { gain: 0.05, dur: 2.5 });
  sitar(s(7), s(8), ['G4', 'B4', 'D5', 'B4'], 0.2, 0.1);

  // 8. "Then he was forgotten." Harde stilte (de automatisering), alleen een verre wind.
  const stil = s(8) - 0.02;

  // 9. De vlag: helder D-groot, koper, de trommen terug.
  boem(s(9) - 0.05);
  ['D3', 'A3', 'D4', 'F#4'].forEach((n, j) => brass(kop, s(9), e(9) - s(9) + 1.2, m(n), { pan: j * 0.3 - 0.45, gain: 0.12 }));
  chord(s(9), total, ['D2', 'A2', 'D3', 'F#3', 'A3'], { a: 0.3, rel: 1, gain: 0.09, cut: 1200 });
  tabla(s(9) + 0.05, total - 0.6, 0.18, 0.4);
  sitar(s(9), total - 0.4, ['D5', 'F#5', 'A5', 'F#5', 'E5', 'D5'], 0.18, 0.11);
  whoosh(fx, s(9) - 0.5, 0.55, { gain: 0.3, lo: 300, hi: 4000 });
  bell(kop, cta, m('A5'), { gain: 0.05, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(snaar, 1); mus.add(fx, 0.75);
  mus.reverb(0.84, 0.32, 0.32);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [s(9) - 0.56, 0], [s(9) - 0.55, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
