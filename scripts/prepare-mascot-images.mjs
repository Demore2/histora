#!/usr/bin/env node
/**
 * Maakt van de Higgsfield-plaatjes van de vos (`assets/images/vos/bron/fase-*.png`, egale grijze
 * achtergrond) transparante PNG's op één gemeenschappelijke schaal (`assets/images/vos/fase-*.png`).
 *
 *   node scripts/prepare-mascot-images.mjs
 *
 * - **De achtergrond gaat weg met een flood-fill vanaf de randen**, niet met een kleurfilter over het
 *   hele plaatje: grijs dat binnen een omlijning ligt (het ijsblok, de glazen van de bril) blijft
 *   zo staan. De pixels direct naast de achtergrond krijgen een gedeeltelijke alfa, zodat de
 *   omlijning niet gekarteld wordt.
 * - **Eén schaal voor alle fases.** De staande vos wordt in elke fase even hoog, de zittende en het
 *   ijsblok houden hun verhouding daartegenover. Per plaatje passend maken zou een zittende vos even
 *   groot maken als een staande, en dan groeit en krimpt hij in de widget van fase tot fase.
 * - Uitvoer is 1024×1024, onderkant op dezelfde hoogte, horizontaal gecentreerd. De bovenste derde
 *   blijft vrij voor het streakgetal dat de widget erover zet.
 *
 * pngjs zoals de andere beeldscripts, geen sharp: geen native module voor iets wat dit ook kan.
 */
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const BRON = 'assets/images/vos/bron';
const DOEL = 'assets/images/vos';
const MAAT = 1024;
const ONDERKANT = 1000; // y van de voeten
const STAANDE_HOOGTE = 640; // hoogte van een staande vos in de uitvoer
const STAAND = ['zwaaiend', 'fase-1-gevierd', 'fase-2-ochtend', 'fase-3-middag', 'fase-4-avond', 'fase-5-paniek'];
const ZEKER = 14; // afstand tot de achtergrondkleur waaronder een pixel zeker achtergrond is
const RAND = 70; // ... en waarboven hij zeker voorgrond is

function afstand(d, i, k) {
  return Math.hypot(d[i] - k[0], d[i + 1] - k[1], d[i + 2] - k[2]);
}

function verwijderAchtergrond(png) {
  const { width: b, height: h, data } = png;
  const hoeken = [0, b - 1, (h - 1) * b, h * b - 1];
  const k = [0, 1, 2].map((c) => hoeken.reduce((s, p) => s + data[p * 4 + c], 0) / hoeken.length);

  const uit = new Uint8ClampedArray(b * h * 4);
  const achter = new Uint8Array(b * h);
  const rij = [];
  for (let x = 0; x < b; x++) rij.push(x, (h - 1) * b + x);
  for (let y = 0; y < h; y++) rij.push(y * b, y * b + b - 1);
  while (rij.length) {
    const p = rij.pop();
    if (achter[p] || afstand(data, p * 4, k) > ZEKER) continue;
    achter[p] = 1;
    const x = p % b;
    const y = (p - x) / b;
    if (x > 0) rij.push(p - 1);
    if (x < b - 1) rij.push(p + 1);
    if (y > 0) rij.push(p - b);
    if (y < h - 1) rij.push(p + b);
  }

  for (let p = 0; p < b * h; p++) {
    const i = p * 4;
    if (achter[p]) continue;
    const x = p % b;
    const grenst =
      (x > 0 && achter[p - 1]) || (x < b - 1 && achter[p + 1]) || achter[p - b] || achter[p + b];
    let a = 1;
    if (grenst) {
      const d = afstand(data, i, k);
      a = Math.min(1, Math.max(0, (d - ZEKER) / (RAND - ZEKER)));
    }
    if (a <= 0) continue;
    // Haal de bijgemengde achtergrond eruit, zodat een randpixel niet grijs blijft op een gekleurde widget.
    for (let c = 0; c < 3; c++) uit[i + c] = (data[i + c] - k[c] * (1 - a)) / a;
    uit[i + 3] = a * 255;
  }
  return { b, h, d: uit };
}

function kader({ b, h, d }) {
  let x0 = b, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < b; x++)
      if (d[(y * b + x) * 4 + 3] > 24) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  return { x0, y0, x1, y1 };
}

/** Bilineair, met voorvermenigvuldigde alfa, zodat transparante pixels geen grijze rand inmengen. */
function plaats(bron, kd, schaal) {
  const uit = new PNG({ width: MAAT, height: MAAT });
  const midden = (kd.x0 + kd.x1) / 2;
  const ox = MAAT / 2 - midden * schaal;
  const oy = ONDERKANT - kd.y1 * schaal;
  const lees = (x, y, c) => {
    x = Math.min(bron.b - 1, Math.max(0, x));
    y = Math.min(bron.h - 1, Math.max(0, y));
    const i = (y * bron.b + x) * 4;
    return c === 3 ? bron.d[i + 3] : (bron.d[i + c] * bron.d[i + 3]) / 255;
  };
  for (let y = 0; y < MAAT; y++)
    for (let x = 0; x < MAAT; x++) {
      const sx = (x + 0.5 - ox) / schaal - 0.5;
      const sy = (y + 0.5 - oy) / schaal - 0.5;
      if (sx < -1 || sy < -1 || sx > bron.b || sy > bron.h) continue;
      const fx = Math.floor(sx), fy = Math.floor(sy), tx = sx - fx, ty = sy - fy;
      const px = [0, 0, 0, 0];
      for (let c = 0; c < 4; c++)
        px[c] =
          lees(fx, fy, c) * (1 - tx) * (1 - ty) + lees(fx + 1, fy, c) * tx * (1 - ty) +
          lees(fx, fy + 1, c) * (1 - tx) * ty + lees(fx + 1, fy + 1, c) * tx * ty;
      const i = (y * MAAT + x) * 4;
      uit.data[i + 3] = px[3];
      if (px[3] > 0) for (let c = 0; c < 3; c++) uit.data[i + c] = Math.min(255, (px[c] * 255) / px[3]);
    }
  return uit;
}

// De fases plus de zwaaiende vos van het opstartscherm (`derive-fox-icon.mjs` snijdt die bij).
const bestanden = fs.readdirSync(BRON).filter((f) => /^(fase-.*|zwaaiend)\.png$/.test(f)).sort();
const vrij = bestanden.map((f) => {
  const bron = verwijderAchtergrond(PNG.sync.read(fs.readFileSync(path.join(BRON, f))));
  return { naam: f.replace(/\.png$/, ''), bron, kd: kader(bron) };
});

// Eén schaal: de mediaan van wat elke staande vos nodig heeft om STAANDE_HOOGTE te halen.
const staand = vrij.filter((v) => STAAND.includes(v.naam)).map((v) => STAANDE_HOOGTE / (v.kd.y1 - v.kd.y0));
staand.sort((a, b) => a - b);
const schaal = staand[Math.floor(staand.length / 2)];

for (const v of vrij) {
  // Een staande vos die net anders gegenereerd is (kleiner in beeld) wordt op zijn eigen maat gebracht.
  const s = STAAND.includes(v.naam) ? STAANDE_HOOGTE / (v.kd.y1 - v.kd.y0) : schaal;
  const breedte = (v.kd.x1 - v.kd.x0) * s;
  const hoogte = (v.kd.y1 - v.kd.y0) * s;
  const passend = Math.min(s, (MAAT - 48) / (v.kd.x1 - v.kd.x0), (ONDERKANT - 24) / (v.kd.y1 - v.kd.y0));
  fs.writeFileSync(path.join(DOEL, `${v.naam}.png`), PNG.sync.write(plaats(v.bron, v.kd, passend)));
  console.log(`${v.naam}: ${Math.round(breedte)}×${Math.round(hoogte)} px, schaal ${passend.toFixed(3)}`);
}
