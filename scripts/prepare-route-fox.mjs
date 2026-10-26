#!/usr/bin/env node
/**
 * Maakt van Phoxy "op weg" (`assets/images/vos/bron/op-weg.png`, Higgsfield, groen scherm) een
 * transparante PNG voor de routekaart van een tijdperk (`assets/images/vos/op-weg.png`, 1.4.2):
 * hij staat naast de volgende halte.
 *
 *   node scripts/prepare-route-fox.mjs
 *
 * Eén pose, dus geen gezamenlijke schaal zoals bij de leraar: de omhullende van alles wat niet
 * groen is wordt gemeten en met een kleine marge vierkant in de uitvoer gepast.
 */
import fs from 'node:fs';
import { PNG } from 'pngjs';
import { sleutelUit, verkleinNaar } from './groen-scherm.mjs';

const BRON = 'assets/images/vos/bron/op-weg.png';
const DOEL = 'assets/images/vos/op-weg.png';
const ZIJDE = 320;
const MARGE = 8;

const png = PNG.sync.read(fs.readFileSync(BRON));
const uit = sleutelUit(png);
const { width: b, height: h } = png;

let minX = b;
let minY = h;
let maxX = 0;
let maxY = 0;
for (let p = 0; p < b * h; p++) {
  if (uit[p * 4 + 3] < 0.5) continue;
  const x = p % b;
  const y = Math.floor(p / b);
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}

const schaal = (ZIJDE - 2 * MARGE) / Math.max(maxX - minX, maxY - minY);
const middenX = (minX + maxX) / 2;
const middenY = (minY + maxY) / 2;
const doel = new PNG({ width: ZIJDE, height: ZIJDE });
const afgekapt = verkleinNaar(doel, uit, b, h, Math.max(1, Math.ceil(1 / schaal)), (ux, uy) => [
  (ux - ZIJDE / 2) / schaal + middenX,
  (uy - ZIJDE / 2) / schaal + middenY,
]);
fs.writeFileSync(DOEL, PNG.sync.write(doel));
console.log(`  op-weg  schaal ${schaal.toFixed(3)}${afgekapt ? `  ! ${afgekapt} randpixels afgekapt` : ''}`);
