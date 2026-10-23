#!/usr/bin/env node
/**
 * Vervangt de groene achtergrond van een Higgsfield-scène door het warme verloop van een andere
 * scène (store-afbeeldingen 1.3). Gemaakt voor scène 2, waar de prompt per ongeluk om een groene
 * achtergrond vroeg terwijl alle dia's het goud-oranje van scène 1 moeten hebben.
 *
 *   node scripts/vervang-achtergrond.mjs <scène.png> <voorbeeld.png> <uit.png>
 *
 * Hoe: per pixel schatten we hoeveel van de oude achtergrond erin zit (t, 0..1), uit de afstand
 * tot de achtergrondkleur op die plek. Dan is pixel ≈ voorgrond·(1−t) + oud·t, en wordt het nieuwe
 * pixel voorgrond·(1−t) + nieuw·t = pixel + t·(nieuw − oud). Daardoor krijgen ook de mengzones
 * (de gloed van de vlammen tegen het groen, de randen van de vos) de warme kleur, in plaats van een
 * olijfgroene zoom.
 *
 * De oude achtergrond wordt per rij gemeten aan de linker- en rechterrand van de scène en over de
 * breedte geïnterpoleerd (hij is niet egaal: rechtsonder donkerder). Het nieuwe verloop komt uit
 * de randen van <voorbeeld.png> — exact de kleuren van scène 1. Beide worden over een paar rijen
 * uitgesmeerd; per rij zou JPEG-ruis uit de bron als strepen terugkomen.
 *
 * Het chroma-groene telefoonscherm (#00FF00) blijft onaangeroerd: dat vult plaats-scherm.mjs.
 */

import fs from 'fs';
import { PNG } from 'pngjs';

const [sceneBestand, voorbeeldBestand, uitBestand] = process.argv.slice(2);
if (!uitBestand) {
  console.error('gebruik: node scripts/vervang-achtergrond.mjs <scène.png> <voorbeeld.png> <uit.png>');
  process.exit(1);
}

const scene = PNG.sync.read(fs.readFileSync(sceneBestand));
const voorbeeld = PNG.sync.read(fs.readFileSync(voorbeeldBestand));
const W = scene.width;
const H = scene.height;

/** Afstand (RGB) waarboven een pixel helemaal voorgrond is. */
const VOLLEDIG_VOORGROND = 150;
/** Rand waarover gemeten wordt, en hoeveel rijen er uitgesmeerd worden. */
const RAND = 16;
const SMEER = 24;

/** Gemiddelde kleur van een strook randpixels op rij y. */
function rand(png, y, vanX) {
  const som = [0, 0, 0];
  for (let x = vanX; x < vanX + RAND; x++) {
    const i = (y * png.width + x) * 4;
    for (let c = 0; c < 3; c++) som[c] += png.data[i + c];
  }
  return som.map((s) => s / RAND);
}

function uitgesmeerd(rijen) {
  return rijen.map((_, y) => {
    const som = [0, 0, 0];
    let n = 0;
    for (let k = Math.max(0, y - SMEER); k <= Math.min(rijen.length - 1, y + SMEER); k++) {
      for (let c = 0; c < 3; c++) som[c] += rijen[k][c];
      n++;
    }
    return som.map((s) => s / n);
  });
}

const oudLinks = uitgesmeerd(Array.from({ length: H }, (_, y) => rand(scene, y, 0)));
const oudRechts = uitgesmeerd(Array.from({ length: H }, (_, y) => rand(scene, y, W - RAND)));
const nieuw = uitgesmeerd(
  Array.from({ length: H }, (_, y) => {
    const vy = Math.round((y / (H - 1)) * (voorbeeld.height - 1));
    const l = rand(voorbeeld, vy, 0);
    const r = rand(voorbeeld, vy, voorbeeld.width - RAND);
    return l.map((v, c) => (v + r[c]) / 2);
  })
);

const px = (x, y) => (y * W + x) * 4;
// Het scherm is ±5,250,15; de achtergrond van scène 2 is zelf groen (±68,200,82), dus streng.
const isChroma = (i) => scene.data[i + 1] > 235 && scene.data[i] < 40 && scene.data[i + 2] < 50;

let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (isChroma(px(x, y))) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
}

let aangepast = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) continue;
    const i = px(x, y);
    const f = x / (W - 1);
    const oud = oudLinks[y].map((v, c) => v * (1 - f) + oudRechts[y][c] * f);
    const afstand = Math.hypot(scene.data[i] - oud[0], scene.data[i + 1] - oud[1], scene.data[i + 2] - oud[2]);
    // Donkere pixels (de rand van de telefoon met een groene weerkaatsing, de lijnen van de vos)
    // zijn nooit achtergrond: die kleurden anders roze aan. De groene achtergrond is overal licht.
    // Hetzelfde voor grijze pixels: de achtergrond is fel groen (max − min ≥ ±90), de rand van
    // de telefoon is grijs met hooguit een groene glans.
    const helderheid = Math.max(scene.data[i], scene.data[i + 1], scene.data[i + 2]);
    const kleurrijk = helderheid - Math.min(scene.data[i], scene.data[i + 1], scene.data[i + 2]);
    const t =
      helderheid < 120 || kleurrijk < 55 ? 0 : Math.max(0, Math.min(1, 1 - afstand / VOLLEDIG_VOORGROND));
    if (t === 0) continue;
    for (let c = 0; c < 3; c++) {
      scene.data[i + c] = Math.max(0, Math.min(255, Math.round(scene.data[i + c] + t * (nieuw[y][c] - oud[c]))));
    }
    aangepast++;
  }
}

fs.writeFileSync(uitBestand, PNG.sync.write(scene));
console.log(`${uitBestand}: ${aangepast} pixels bijgekleurd, scherm (${x0}, ${y0})–(${x1}, ${y1}) ongemoeid`);
