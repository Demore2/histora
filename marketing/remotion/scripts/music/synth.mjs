// Kleine offline synth: alles wordt in een stereo Float32-buffer opgeteld en als 48 kHz WAV geschreven.
import { writeFileSync } from 'node:fs';

export const SR = 48000;
export const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const N = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
export const m = (s) => { // 'D2', 'F#3', 'Bb4' → midi
  const r = /^([A-G])([#b]?)(-?\d)$/.exec(s);
  return 12 * (Number(r[3]) + 1) + N[r[1]] + (r[2] === '#' ? 1 : r[2] === 'b' ? -1 : 0);
};

let seed = 12345;
export const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

export class Mix {
  constructor(seconds) {
    this.n = Math.ceil(seconds * SR);
    this.L = new Float32Array(this.n);
    this.R = new Float32Array(this.n);
  }
  bus() { return new Mix(this.n / SR); }
  add(bus, gain = 1) { for (let i = 0; i < this.n; i++) { this.L[i] += bus.L[i] * gain; this.R[i] += bus.R[i] * gain; } }
  // Mono-signaal f(t-lokaal, i) van start tot start+dur, met panning (-1..1).
  write(start, dur, pan, f) {
    const i0 = Math.max(0, Math.floor(start * SR)), i1 = Math.min(this.n, Math.floor((start + dur) * SR));
    const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
    for (let i = i0; i < i1; i++) { const v = f((i - i0) / SR, i - i0); this.L[i] += v * gl; this.R[i] += v * gr; }
  }
  // Volumecurve over de hele bus: punten [[t, gain], ...], lineair; stappen met twee punten op ~dezelfde t.
  automate(points) {
    let k = 0;
    for (let i = 0; i < this.n; i++) {
      const t = i / SR;
      while (k < points.length - 2 && t > points[k + 1][0]) k++;
      const [t0, g0] = points[k], [t1, g1] = points[k + 1];
      const g = t <= t0 ? g0 : t >= t1 ? g1 : g0 + (g1 - g0) * (t - t0) / (t1 - t0);
      this.L[i] *= g; this.R[i] *= g;
    }
  }
  // Freeverb-achtig: 8 combs + 4 allpasses per kanaal.
  reverb(size = 0.84, damp = 0.3, wet = 0.3) {
    const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], aps = [556, 441, 341, 225];
    const sc = SR / 44100;
    for (const [ch, spread] of [[this.L, 0], [this.R, 23]]) {
      const inp = Float32Array.from(ch), out = new Float32Array(this.n);
      for (const c of combs) {
        const len = Math.round((c + spread) * sc), buf = new Float32Array(len); let p = 0, lp = 0;
        for (let i = 0; i < this.n; i++) {
          const y = buf[p]; lp = y * (1 - damp) + lp * damp;
          buf[p] = inp[i] * 0.015 + lp * size; out[i] += y; p = (p + 1) % len;
        }
      }
      for (const a of aps) {
        const len = Math.round((a + spread) * sc), buf = new Float32Array(len); let p = 0;
        for (let i = 0; i < this.n; i++) { const b = buf[p]; const y = -out[i] + b; buf[p] = out[i] + b * 0.5; out[i] = y; p = (p + 1) % len; }
      }
      for (let i = 0; i < this.n; i++) ch[i] = inp[i] * (1 - wet * 0.5) + out[i] * wet;
    }
  }
  save(file, peak = 0.89) {
    let mx = 1e-9; for (let i = 0; i < this.n; i++) mx = Math.max(mx, Math.abs(this.L[i]), Math.abs(this.R[i]));
    const g = peak / mx, buf = Buffer.alloc(44 + this.n * 4);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + this.n * 4, 4); buf.write('WAVEfmt ', 8);
    buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
    buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(this.n * 4, 40);
    for (let i = 0; i < this.n; i++) {
      buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, this.L[i] * g)) * 32767), 44 + i * 4);
      buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, this.R[i] * g)) * 32767), 46 + i * 4);
    }
    writeFileSync(file, buf);
  }
}

// Envelope: attack, release (exponentieel), totale duur.
export const env = (t, a, dur, rel) => (t < a ? t / a : 1) * (t > dur - rel ? Math.max(0, (dur - t) / rel) : 1);
const lp1 = (cut) => { const k = 1 - Math.exp(-2 * Math.PI * cut / SR); let y = 0; return (x) => (y += k * (x - y)); };

// Strijkers/pad: 3 ontstemde zaagtanden, laagdoorlaat, langzame aan/uit.
export function pad(bus, start, dur, midi, { gain = 0.12, cut = 900, a = 1.2, rel = 1.5, pan = 0, vib = 0.004 } = {}) {
  const f = hz(midi), dets = [-0.006, 0, 0.007], ph = [rnd(), rnd(), rnd()], fl = lp1(cut), fl2 = lp1(cut);
  bus.write(start, dur, pan, (t) => {
    let s = 0; const v = 1 + vib * Math.sin(2 * Math.PI * 5.2 * t);
    dets.forEach((d, j) => { ph[j] = (ph[j] + f * (1 + d) * v / SR) % 1; s += 2 * ph[j] - 1; });
    return fl2(fl(s / 3)) * gain * env(t, a, dur, rel);
  });
}
// Koperstoot: zaagtand met filter dat opengaat en weer dichtvalt.
export function brass(bus, start, dur, midi, { gain = 0.16, pan = 0 } = {}) {
  const f = hz(midi); let p1 = rnd(), p2 = rnd(), y = 0, y2 = 0;
  bus.write(start, dur, pan, (t) => {
    p1 = (p1 + f / SR) % 1; p2 = (p2 + f * 1.004 / SR) % 1;
    const cut = 300 + 2600 * Math.exp(-t * 3) * Math.min(1, t / 0.05) + 500;
    const k = 1 - Math.exp(-2 * Math.PI * cut / SR);
    y += k * ((p1 + p2 - 1) - y); y2 += k * (y - y2);
    return y2 * gain * env(t, 0.04, dur, 0.5);
  });
}
// Getokkelde lier (Karplus-Strong).
export function pluck(bus, start, midi, { gain = 0.22, dur = 2.5, pan = 0, bright = 0.5 } = {}) {
  const len = Math.round(SR / hz(midi)), buf = new Float32Array(len);
  for (let i = 0; i < len; i++) buf[i] = rnd() * 2 - 1;
  let p = 0, prev = 0;
  bus.write(start, dur, pan, (t) => {
    const y = buf[p]; const nxt = buf[(p + 1) % len];
    buf[p] = (y * (0.5 + bright * 0.5) + nxt * (0.5 - bright * 0.5)) * 0.996; p = (p + 1) % len;
    prev = prev * 0.3 + y * 0.7; return prev * gain * env(t, 0.002, dur, 0.4);
  });
}
// Trom/pauk: sinus met dalende toon + ruisklap.
export function drum(bus, start, { f0 = 120, f1 = 48, gain = 0.6, decay = 0.35, noise = 0.25, pan = 0 } = {}) {
  let ph = 0; const fl = lp1(1800);
  bus.write(start, decay * 5, pan, (t) => {
    ph += (f1 + (f0 - f1) * Math.exp(-t * 18)) / SR;
    const body = Math.sin(2 * Math.PI * ph) * Math.exp(-t / decay);
    const n = fl(rnd() * 2 - 1) * Math.exp(-t / 0.03) * noise;
    return Math.tanh((body + n) * 1.4) * gain;
  });
}
// Lage dreun: ruis door lage filters + sub-sinus, langzame aan/uit.
export function rumble(bus, start, dur, { gain = 0.5, cut = 140, a = 2, rel = 1, sub = 41, swell = null } = {}) {
  const f1 = lp1(cut), f2 = lp1(cut), fs = lp1(cut * 0.6); let ph = 0;
  bus.write(start, dur, 0, (t) => {
    ph += sub * (1 + 0.02 * Math.sin(t * 0.7)) / SR;
    const sw = swell ? swell(t) : 1;
    return (f2(f1(rnd() * 2 - 1)) * 3 + fs(rnd() * 2 - 1) * 2 + Math.sin(2 * Math.PI * ph) * 0.5) * gain * sw * env(t, a, dur, rel);
  });
}
// Explosie/uitbarsting: een diepe vallende dreun, een ruisklap waarvan het filter dichtloopt (de knal die verder
// rolt), en puin dat nog een paar seconden kraakt en steeds schaarser wordt. Geen klik: aanzet van 6 ms.
export function explosie(bus, start, { gain = 1, dur = 4.5 } = {}) {
  let ph = 0, y = 0, y2 = 0, c = 0, cy = 0;
  bus.write(start, dur, 0, (t) => {
    const aan = Math.min(1, t / 0.006);
    ph += (24 + 70 * Math.exp(-t * 2.2)) / SR;
    const sub = Math.sin(2 * Math.PI * ph) * Math.exp(-t / 1.6) * 1.1;
    const cut = 160 + 4200 * Math.exp(-t * 2.6), k = 1 - Math.exp(-2 * Math.PI * cut / SR);
    y += k * (rnd() * 2 - 1 - y); y2 += k * (y - y2);
    const klap = y2 * 2.6 * Math.exp(-t / 0.9);
    // Puin: korte gefilterde tikken, dicht in het begin en uitdunnend.
    if (rnd() < 0.0016 * Math.exp(-t * 0.7) && t > 0.15) c = 0.5 + rnd() * 0.5;
    c *= 0.9965; cy += 0.35 * ((rnd() * 2 - 1) * c - cy);
    return Math.tanh((sub + klap + cy * 0.9) * 1.25) * gain * aan;
  });
}
// Ruis-swell (wind/gloedwolk), filter opent mee met het volume.
export function whoosh(bus, start, dur, { gain = 0.4, lo = 200, hi = 3000, pan = 0, curve = (x) => x * x } = {}) {
  let y = 0, y2 = 0;
  bus.write(start, dur, pan, (t) => {
    const x = curve(Math.min(1, t / dur)), cut = lo + (hi - lo) * x, k = 1 - Math.exp(-2 * Math.PI * cut / SR);
    y += k * (rnd() * 2 - 1 - y); y2 += k * (y - y2); return y2 * gain * x;
  });
}
// Klok/belletje: een paar niet-harmonische sinussen.
export function bell(bus, start, midi, { gain = 0.15, dur = 4, pan = 0 } = {}) {
  const f = hz(midi), parts = [[1, 1], [2.76, 0.4], [5.4, 0.2], [8.9, 0.1]];
  bus.write(start, dur, pan, (t) => parts.reduce((s, [r, a]) => s + Math.sin(2 * Math.PI * f * r * t) * a * Math.exp(-t * (1 + r * 0.6)), 0) * gain * Math.min(1, t / 0.003));
}
