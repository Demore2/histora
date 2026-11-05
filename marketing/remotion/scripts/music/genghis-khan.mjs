// Genghis Khan (v1) — E mineur pentatonisch (E G A B D), steppe: een keelzang-achtige drone (lage E met boventonen),
// galopperende trommen, morin-khuur-achtige pad. Het DNA-raadsel klinkt modern en ijl (klokjes), de jeugd kaal en koud,
// "He became Genghis Khan" breekt open in een galop met koper, harde stilte op "It has never been proven", en een
// verlaten slot (wind en één klok) bij het onvindbare graf.
// Beats: 0 one ancestor · 1 who · 2 geneticists · 3 Mongolia · 4 Temujin · 5 poisoned · 6 cast out · 7 Genghis Khan ·
//        8 largest empire · 9 China to Russia · 10 never proven · 11 grave never found · 12 outro
import { Mix, pad, brass, drum, pluck, bell, rumble, whoosh, m } from './synth.mjs';

export default ({ s, e, cta, total, out }) => {
  const mus = new Mix(total);
  const str = mus.bus(), kop = mus.bus(), trom = mus.bus(), snaar = mus.bus(), fx = mus.bus();
  const chord = (t0, t1, notes, o = {}) => notes.forEach((n, j) => pad(str, t0, t1 - t0 + 0.3, m(n), { pan: (j / (notes.length - 1 || 1)) * 1.2 - 0.6, ...o }));
  const boem = (t, gain = 1) => { drum(trom, t, { f0: 66, f1: 30, gain, decay: 1.2, noise: 0 }); rumble(fx, t, 1.8, { gain: 0.3 * gain, cut: 340, a: 0.025, rel: 1.3 }); };
  // Keelzang: een lage E met een zwevende boventoon.
  const keel = (t0, t1, gain = 0.1) => { pad(str, t0, t1 - t0 + 0.3, m('E1'), { gain, cut: 420, a: 0.3, rel: 0.4 }); pad(str, t0, t1 - t0 + 0.3, m('B4'), { gain: gain * 0.25, cut: 2400, a: 0.8, rel: 0.4, vib: 0.008 }); };
  // Galop: ta-ta-tam, ta-ta-tam.
  const galop = (t0, t1, stap, gain = 0.45) => {
    for (let t = t0, k = 0; t < t1 - 0.05; t += stap, k++) {
      const pos = k % 3;
      drum(trom, t, { f0: pos === 2 ? 95 : 210, f1: pos === 2 ? 48 : 140, gain: gain * (pos === 2 ? 1 : 0.55), decay: pos === 2 ? 0.35 : 0.1, noise: 0.3, pan: pos === 2 ? 0 : (k % 2 ? 0.25 : -0.25) });
    }
  };
  const khuur = (t0, t1, notes, stap = 0.2, gain = 0.12) => {
    for (let t = t0, k = 0; t < t1 - 0.08; t += stap, k++) pluck(snaar, t, m(notes[k % notes.length]), { gain, pan: (k % 3) * 0.3 - 0.3, bright: 0.5 });
  };

  // 0. Koude opening: dreun, keelzang-drone, een leger in de verte (galop zacht).
  boem(0);
  keel(0, s(2), 0.11);
  galop(0.1, e(0), 0.12, 0.3);
  ['E2', 'B2', 'E3'].forEach((n, j) => brass(kop, 0.02, e(0) + 0.4, m(n), { pan: j * 0.4 - 0.4, gain: 0.11 }));
  // 1. "So who was he?" Alles houdt in.
  bell(kop, s(1) + 0.1, m('B5'), { gain: 0.06, dur: 3 });

  // 2-3. Het DNA-onderzoek: ijl, modern, een rij klokjes die zich vertakt; bij Mongolië komt de drone terug.
  chord(s(2), s(4), ['E2', 'B2', 'D3', 'G3'], { a: 0.4, rel: 0.2, gain: 0.08, cut: 1200 });
  for (let t = s(2) + 0.1, k = 0; t < s(3) - 0.1; t += 0.2, k++) bell(kop, t, m(['E6', 'G6', 'B6', 'D7', 'B6', 'G6'][k % 6]), { gain: 0.025, dur: 1.4, pan: (k % 4) * 0.3 - 0.45 });
  keel(s(3), s(4), 0.09);
  boem(s(3) - 0.04, 0.6);

  // 4-6. Temüjin: koud en kaal, een trage khuur-melodie, de vader vergiftigd (een lage klap), verstoten.
  chord(s(4), s(7), ['E1', 'B1', 'G2'], { a: 0.5, rel: 0.2, gain: 0.08, cut: 520 });
  [['E4', 0], ['G4', 0.5], ['A4', 1], ['G4', 1.6]].forEach(([n, d]) => pluck(snaar, s(4) + d, m(n), { gain: 0.11, dur: 2.5, bright: 0.45 }));
  boem(s(5) + 0.05, 0.55);
  [['D4', 0], ['B3', 0.6]].forEach(([n, d]) => pluck(snaar, s(6) + d, m(n), { gain: 0.1, dur: 3, bright: 0.4 }));
  whoosh(fx, s(6), e(6) - s(6) + 0.4, { gain: 0.18, lo: 100, hi: 1200 });

  // 7. "He became Genghis Khan." Grote dreun, koper, de galop barst los.
  boem(s(7) - 0.05, 1.05);
  ['E2', 'B2', 'E3', 'G3'].forEach((n, j) => brass(kop, s(7), e(7) - s(7) + 0.8, m(n), { pan: j * 0.3 - 0.45, gain: 0.13 }));
  keel(s(7), s(10), 0.1);
  chord(s(7), s(10), ['E2', 'B2', 'E3', 'G3'], { a: 0.15, rel: 0.2, gain: 0.09, cut: 1000 });
  galop(s(7) + 0.1, s(10) - 0.05, 0.13, 0.5);
  // 8-9. Het rijk en de nakomelingen: de khuur in een snelle, rijdende figuur.
  khuur(s(8), s(10) - 0.05, ['E4', 'G4', 'A4', 'B4', 'D5', 'B4', 'A4', 'G4'], 0.13, 0.11);
  ['E3', 'B3', 'E4'].forEach((n, j) => brass(kop, s(9), e(9) - s(9) + 0.4, m(n), { pan: j * 0.4 - 0.4, gain: 0.1 }));

  // 10. "It has never been proven." Harde stilte.
  const stil = s(10) - 0.02;

  // 11. Het onvindbare graf: wind, drone, één klok.
  keel(s(11), total, 0.08);
  whoosh(fx, s(11), e(11) - s(11) + 1, { gain: 0.2, lo: 90, hi: 900 });
  bell(kop, s(11) + (e(11) - s(11)) * 0.75, m('E5'), { gain: 0.07, dur: 4 });
  // 12. Outro + CTA: de khuur, rustig.
  khuur(s(12), total - 0.4, ['E4', 'G4', 'B4', 'G4'], 0.22, 0.09);
  bell(kop, cta, m('B5'), { gain: 0.05, dur: 2.5 });

  mus.add(str, 1); mus.add(kop, 1); mus.add(trom, 0.85); mus.add(snaar, 1); mus.add(fx, 0.75);
  mus.reverb(0.85, 0.33, 0.33);
  mus.automate([[0, 1], [stil - 0.03, 1], [stil, 0], [s(11) - 0.06, 0], [s(11) - 0.05, 1], [total - 0.5, 1], [total, 0]]);
  mus.save(out);
};
