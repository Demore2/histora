#!/usr/bin/env node
/**
 * Zet een echt app-screenshot in het groene scherm van een Higgsfield-scène (store-afbeeldingen 1.3).
 *
 *   node scripts/plaats-scherm.mjs <scène.png> <screenshot.png> <uit.png>
 *
 * Higgsfield tekent de vos, de telefoon en de achtergrond, met een effen chroma-groen scherm
 * (#00FF00). AI-tekst in een nagetekende UI wordt kriebels, en Play wil dat screenshots de app
 * echt tonen — dus komt het scherm uit `store/screenshots-bron/`.
 *
 * Alleen de groene pixels worden vervangen, niet een rechthoek: zo blijven de ronde hoeken en
 * het camera-gaatje van de getekende telefoon staan. Randpixels die half groen zijn worden naar
 * verhouding gemengd, anders krijgt het scherm een groene zoom.
 *
 * Het screenshot (1080×2400) wordt op de breedte van het groen geschaald; de statusbalk van de
 * emulator valt bovenaan weg (wit op beige, onleesbaar) en wat dan nog te lang is, onderaan.
 */

import fs from 'fs';
import { PNG } from 'pngjs';

const [sceneBestand, schermBestand, uitBestand] = process.argv.slice(2);
if (!uitBestand) {
  console.error('gebruik: node scripts/plaats-scherm.mjs <scène.png> <screenshot.png> <uit.png>');
  process.exit(1);
}

/** Statusbalk van de emulator, in pixels van het 1080×2400-screenshot. */
const STATUSBALK = 110;

const scene = PNG.sync.read(fs.readFileSync(sceneBestand));
const scherm = PNG.sync.read(fs.readFileSync(schermBestand));

/** Hoe groen is een pixel: 0 = niet, 1 = zuiver chroma-groen. */
function groenheid(i) {
  const r = scene.data[i];
  const g = scene.data[i + 1];
  const b = scene.data[i + 2];
  return Math.max(0, Math.min(1, (g - Math.max(r, b) - 40) / 120));
}

// Het groene vlak opmeten.
let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
for (let y = 0; y < scene.height; y++) {
  for (let x = 0; x < scene.width; x++) {
    if (groenheid((y * scene.width + x) * 4) > 0.9) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
}
if (x1 < 0) throw new Error('geen groen scherm gevonden in ' + sceneBestand);
const breed = x1 - x0 + 1;
const hoog = y1 - y0 + 1;

// Schaal: de breedte van het groen. Is het groen naar verhouding langer dan het screenshot
// (zonder statusbalk), dan op de hoogte schalen en links en rechts gelijk een strookje afsnijden.
// Bron-y begint onder de statusbalk.
const schaal = Math.min(scherm.width / breed, (scherm.height - STATUSBALK) / hoog);
const bronX = (scherm.width - breed * schaal) / 2;

/** Bilineair bemonsteren van het screenshot. */
function monster(sx, sy, kanaal) {
  const xa = Math.max(0, Math.min(scherm.width - 1, Math.floor(sx)));
  const ya = Math.max(0, Math.min(scherm.height - 1, Math.floor(sy)));
  const xb = Math.min(scherm.width - 1, xa + 1);
  const yb = Math.min(scherm.height - 1, ya + 1);
  const fx = sx - xa;
  const fy = sy - ya;
  const p = (x, y) => scherm.data[(y * scherm.width + x) * 4 + kanaal];
  return (p(xa, ya) * (1 - fx) + p(xb, ya) * fx) * (1 - fy) + (p(xa, yb) * (1 - fx) + p(xb, yb) * fx) * fy;
}

// Een rand van een paar pixels rond het vlak meenemen, voor de half-groene randpixels.
const MARGE = 3;
for (let y = Math.max(0, y0 - MARGE); y <= Math.min(scene.height - 1, y1 + MARGE); y++) {
  for (let x = Math.max(0, x0 - MARGE); x <= Math.min(scene.width - 1, x1 + MARGE); x++) {
    const i = (y * scene.width + x) * 4;
    const a = groenheid(i);
    if (a === 0) continue;
    // Middelpunt van de doelpixel, terug naar het screenshot.
    const sx = bronX + (x - x0 + 0.5) * schaal - 0.5;
    const sy = STATUSBALK + (y - y0 + 0.5) * schaal - 0.5;
    for (let c = 0; c < 3; c++) {
      // Bij een half-groene randpixel ook het groen uit de oude kleur halen (de-spill).
      const oud = c === 1 ? Math.min(scene.data[i + 1], Math.max(scene.data[i], scene.data[i + 2])) : scene.data[i + c];
      scene.data[i + c] = Math.round(monster(sx, sy, c) * a + oud * (1 - a));
    }
  }
}

fs.writeFileSync(uitBestand, PNG.sync.write(scene));
console.log(`${uitBestand}: scherm ${breed}×${hoog} op (${x0}, ${y0}), schaal 1:${schaal.toFixed(2)}`);
