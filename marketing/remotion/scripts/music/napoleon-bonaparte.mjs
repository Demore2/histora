// Napoleon (v1) — C-mineur, Frans militair: snaartrom, pauken, koper. Bij de spotprent slaat het om naar
// speelse pizzicato (de kijker mag glimlachen), daarna groot koper in Es-groot op "He conquered an empire"
// en een harde stilte op "And lost to a cartoon", met één droge pluk erachteraan.
// Beats: 0 not short · 1 who made him small · 2 measured · 3 French inches · 4 English measures ·
//        5 average Frenchman · 6 cartoonists · 7 little corporal · 8 empire · 9 lost to a cartoon · 10 outro
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), piz = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const pauk = (t, gain = 1) => { drum(trom, t, { f0: 78, f1: 34, gain, decay: 1.1, noise: 0 }); rumble(fx, t, 1.6, { gain: 0.28 * gain, cut: 380, a: 0.025, rel: 1.2 }); };
  const snaar = (t, gain = 0.4, pan = 0) => drum(trom, t, { f0: 320, f1: 190, gain, decay: 0.11, noise: 0.85, pan });
  // Militair snaartrommelpatroon: tam, ta-ta-tam, met een roffel aan het eind van elke maat.
  const mars = (t0, t1, stap, gain = 0.4) => {
    const patroon = [1, 0, 0.45, 0.55, 0.9, 0, 0.4, 0.4];
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) {
      const p = patroon[k % 8];
      if (p) snaar(t, gain * p, k % 2 ? 0.15 : -0.15);
    }
  };
  const roffel = (t0, dur, gain = 0.35) => {
    for (let t = t0, k = 0; t < t0 + dur; t += 0.045, k++) snaar(t, gain * (0.35 + (0.65 * (t - t0)) / dur), k % 2 ? 0.1 : -0.1);
  };
  const pizzicato = (t0, t1, notes, stap) => {
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) if (notes[k % notes.length]) pluck(piz, t, m(notes[k % notes.length]), { gain: 0.16, dur: 0.6, bright: 0.35, pan: k % 2 ? 0.3 : -0.3 });
  };

  // 0. Koude opening: pauk + koperen fanfare op frame 0.
  pauk(0);
  ['C2', 'G2', 'C3', 'Eb3'].forEach((n, j) => brass(kop, 0, 1.3, m(n), { pan: j * 0.3 - 0.45, gain: 0.15 }));
  chord(0, s(1), ['C2', 'G2', 'Eb3'], { a: 0.1, rel: 0.2, gain: 0.1, cut: 700 });
  mars(0.3, s(1), 0.16, 0.42);
  // 1. "So who made him small?" Alleen een snaartromroffel die aanzwelt, en een open kwint.
  chord(s(1), s(2), ['Ab1', 'Eb2', 'C3'], { a: 0.2, rel: 0.3, gain: 0.08, cut: 650 });
  roffel(s(1), e(1) - s(1) + 0.2, 0.3);

  // 2. Sint-Helena, 1821: stil en ver, lage strijkers, één klok.
  pauk(s(2) - 0.05, 0.7);
  chord(s(2), s(3), ['C2', 'G2', 'Eb3', 'G3'], { a: 0.6, rel: 0.4, gain: 0.08, cut: 600 });
  bell(kop, s(2) + 0.2, m('G4'), { gain: 0.06, dur: 3.5 });

  // 3-5. De meting ontrafeld: een nieuwsgierig pizzicato-motief, dat optimistischer wordt bij de staven.
  pizzicato(s(3), s(4), ['C4', 'Eb4', 'G4', 'Eb4', 'D4', 'F4', 'Ab4', 'F4'], 0.2);
  chord(s(3), s(4), ['F2', 'C3', 'Ab3'], { a: 0.3, rel: 0.2, gain: 0.07, cut: 800 });
  snaar(s(4) - 0.05, 0.5);
  chord(s(4), s(6), ['Eb2', 'Bb2', 'G3', 'Bb3'], { a: 0.3, rel: 0.2, gain: 0.09, cut: 1000 });
  pizzicato(s(4), s(6), ['Eb4', 'G4', 'Bb4', 'G4', 'F4', 'Ab4', 'C5', 'Ab4'], 0.18);
  // De staven groeien één voor één: drie oplopende plukken, dan koper op Napoleons staaf.
  ['G4', 'Bb4', 'Eb5'].forEach((n, j) => pluck(piz, s(4) + 0.13 + j * 0.3, m(n), { gain: 0.15, dur: 1.2, bright: 0.6 }));
  ['Eb3', 'G3', 'Bb3'].forEach((n, j) => brass(kop, s(5), e(5) - s(5) + 0.6, m(n), { pan: j * 0.4 - 0.4, gain: 0.1 }));

  // 6. De spotprent, 1803: een flits, en een komisch, sluipend pizzicato in C-groot (fagotachtig laag).
  pauk(s(6) - 0.05, 0.8);
  whoosh(fx, s(6) - 0.25, 0.3, { gain: 0.35, lo: 400, hi: 4000 });
  pizzicato(s(6), s(7), ['C3', 0, 'G2', 0, 'C3', 'D3', 'Eb3', 'E3', 'G3', 0, 'G2', 0], 0.14);
  chord(s(6), s(7), ['C2', 'G2', 'E3'], { a: 0.1, rel: 0.2, gain: 0.06, cut: 700 });

  // 7. "The little corporal": warm, een marstrom ver weg, strijkers in As-groot.
  chord(s(7), s(8), ['Ab1', 'Eb2', 'C3', 'Ab3'], { a: 0.5, rel: 0.3, gain: 0.09, cut: 850 });
  mars(s(7), s(8), 0.2, 0.25);
  bell(kop, s(7) + (e(7) - s(7)) * 0.8, m('C5'), { gain: 0.05, dur: 3 });

  // 8. "He conquered an empire." Alles: pauk, roffel, koper in Es-groot.
  roffel(s(8) - 0.5, 0.5, 0.4);
  pauk(s(8) - 0.04);
  ['Eb2', 'Bb2', 'Eb3', 'G3', 'Bb3'].forEach((n, j) => brass(kop, s(8), e(8) - s(8) + 0.5, m(n), { pan: j * 0.3 - 0.6, gain: 0.14 }));
  chord(s(8), s(9), ['Eb1', 'Bb1', 'G2', 'Eb3'], { a: 0.2, rel: 0.1, gain: 0.13, cut: 1400 });
  mars(s(8), s(9), 0.14, 0.45);

  // 9. "And lost to a cartoon." Harde stilte direct bij de zin, en dan één droge pluk na "cartoon".
  const stil = s(9) - 0.02;
  pluck(piz, e(9) + 0.08, m('G2'), { gain: 0.2, dur: 0.5, bright: 0.3 });
  pluck(piz, e(9) + 0.3, m('C2'), { gain: 0.2, dur: 0.7, bright: 0.3 });

  // 10. Outro + CTA: de mars nog één keer, zacht, in C-mineur.
  chord(s(10), total, ['C2', 'G2', 'Eb3'], { a: 0.4, rel: 1, gain: 0.07, cut: 700 });
  mars(s(10), total - 0.4, 0.2, 0.22);
  pluck(piz, cta, m('C4'), { gain: 0.1, dur: 1.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(piz, 1); mus.add(fx, 0.75);
  mus.reverb(0.8, 0.3, 0.28);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [e(9) + 0.06, 0], [e(9) + 0.07, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
