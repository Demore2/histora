// De Eerste Wereldoorlog (v1) — C mineur, een stad op een zomerochtend die kantelt. Een droge mars-trom (de stoet) loopt
// onder de rit; de bom krijgt een dreun; vanaf de verkeerde afslag tikt de klok sneller. Na "Right in front of Princip"
// valt alles weg, "Two shots" = twee droge klappen in de stilte, en "Europe was at war" opent in zwaar koper.
// Beats: 0 wrong turn · 1 twenty million · 2 Sarajevo · 3 open car · 4 bomb · 5 Princip walked away · 6 within the hour ·
//        7 nobody told · 8 wrong turn/reverse · 9 in front of Princip · 10 two shots · 11 at war · 12 outro
import { Mix, pad, brass, drum, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), tik = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 58, f1: 26, gain, decay: 1.4, noise: 0 }); rumble(fx, t, 2, { gain: 0.3 * gain, cut: 300, a: 0.02, rel: 1.5 }); };
  // Mars-trom: een roffel-figuur (tik-tik-TAK) per tel.
  const mars = (t0, t1, tel = 0.5, gain = 0.16) => {
    for (let t = t0; t < t1 - 0.05; t += tel) {
      drum(tik, t, { f0: 320, f1: 180, gain: gain * 1.3, decay: 0.07, noise: 0.85 });
      drum(tik, t + tel * 0.5, { f0: 320, f1: 180, gain: gain * 0.6, decay: 0.05, noise: 0.85 });
      drum(tik, t + tel * 0.75, { f0: 320, f1: 180, gain: gain * 0.6, decay: 0.05, noise: 0.85 });
    }
  };
  const klok = (t0, t1, stap0, stap1, gain = 0.16) => {
    for (let t = t0; t < t1 - 0.03;) {
      const x = (t - t0) / (t1 - t0 || 1);
      drum(tik, t, { f0: 2400, f1: 1800, gain, decay: 0.025, noise: 0.6 });
      t += stap0 + (stap1 - stap0) * x;
    }
  };
  // Een schot: korte, harde knal met een galm.
  const schot = (t) => { drum(trom, t, { f0: 180, f1: 60, gain: 1, decay: 0.18, noise: 1 }); rumble(fx, t, 1.2, { gain: 0.25, cut: 900, a: 0.005, rel: 1.1 }); };

  // 0-1. Koude opening: dreun en een kaal C-mineur; bij "twenty million" zakt de bas.
  boem(0, 0.85);
  chord(0, s(1), ['C2', 'G2', 'Eb3'], { a: 0.05, rel: 0.3, gain: 0.1, cut: 650 });
  chord(s(1), s(2), ['Ab1', 'Eb2', 'C3'], { a: 0.1, rel: 0.3, gain: 0.11, cut: 600 });
  bell(kop, s(1) + 0.1, m('G4'), { gain: 0.05, dur: 4 });

  // 2-3. Sarajevo, de stoet: lichter, de mars-trom begint.
  chord(s(2), s(4), ['C2', 'G2', 'C3', 'D3', 'G3'], { a: 0.3, rel: 0.2, gain: 0.08, cut: 1100 });
  mars(s(2) + 0.1, s(4), 0.5, 0.14);
  ['G5', 'C6', 'D6'].forEach((n, j) => bell(kop, s(2) + 0.2 + j * 0.4, m(n), { gain: 0.03, dur: 3, pan: j * 0.3 - 0.3 }));
  // 4. De bom: dreun op "exploded".
  boem(s(4) + (e(4) - s(4)) * 0.55, 1);
  whoosh(fx, s(4), (e(4) - s(4)) * 0.55, { gain: 0.25, lo: 100, hi: 2000 });
  chord(s(4), s(6), ['C2', 'Gb2', 'C3', 'Eb3'], { a: 0.1, rel: 0.2, gain: 0.09, cut: 750 });
  // 5. Princip loopt weg: alleen een lage pad en één klok.
  bell(kop, s(5) + 0.1, m('Eb5'), { gain: 0.045, dur: 4 });

  // 6-9. Binnen het uur, de route, de afslag: mars terug, klok versnelt, puls naar de stilte.
  chord(s(6), e(9), ['C2', 'G2', 'Ab2', 'Eb3'], { a: 0.2, rel: 0.1, gain: 0.09, cut: 850 });
  mars(s(6), s(8), 0.46, 0.15);
  klok(s(8), e(9), 0.3, 0.1, 0.17);
  for (let t = s(8); t < e(9); t += 0.38) drum(trom, t, { f0: 55, f1: 34, gain: 0.34, decay: 0.4, noise: 0 });
  whoosh(fx, s(9) - 0.3, e(9) - s(9) + 0.3, { gain: 0.3, lo: 120, hi: 3500 });
  const stil = e(9) + 0.02;

  // 10. "Two shots." In de stilte, vlak vóór en ná het woord.
  schot(s(10) - 0.25);
  schot(e(10) + 0.12);

  // 11-12. Europa in oorlog: zwaar koper en grote trom, dan een open slotakkoord.
  boem(s(11) - 0.04, 1.1);
  ['C2', 'G2', 'C3', 'Eb3', 'G3'].forEach((n, j) => brass(kop, s(11), total - s(11), m(n), { pan: j * 0.3 - 0.6, gain: 0.12 }));
  chord(s(11), total, ['C2', 'G2', 'C3', 'Eb3', 'G3', 'C4'], { a: 0.15, rel: 1, gain: 0.1, cut: 1200 });
  for (let t = s(11); t < cta; t += 0.9) drum(trom, t, { f0: 60, f1: 30, gain: 0.45, decay: 0.8, noise: 0.05 });
  bell(kop, cta, m('G5'), { gain: 0.05, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(tik, 0.7); mus.add(fx, 0.75);
  mus.reverb(0.86, 0.34, 0.34);
  // Na "Princip" is het stil; het volume gaat alleen even open voor de twee schoten.
  mus.automate([
    [0, 1], [stil - 0.03, 1], [stil, 0], [s(10) - 0.3, 0], [s(10) - 0.27, 1], [s(10) - 0.05, 1], [s(10) - 0.03, 0.15],
    [e(10) + 0.08, 0.15], [e(10) + 0.1, 1], [e(10) + 0.5, 1], [e(10) + 0.55, 0], [s(11) - 0.06, 0], [s(11) - 0.05, 1],
    [total - 0.5, 1], [total, 0],
  ]);
  mus.save(out);
};
