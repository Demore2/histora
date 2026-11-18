// Rendert één still per shot (midden van elk shot) voor een snelle visuele controle.
//   node scripts/stills.mjs <compositie> <uitmap> <frames,komma,gescheiden> [schaal]
import { bundle } from '@remotion/bundler';
import { openBrowser, renderStill, selectComposition } from '@remotion/renderer';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
const [id, uit, lijst, schaal = '0.5'] = process.argv.slice(2);
mkdirSync(uit, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const browser = await openBrowser('chrome', { chromiumOptions: { gl: 'angle' } });
const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser });
const frames = lijst.split(',').map(Number);
const opEen = async (fr) => {
  await renderStill({ composition, serveUrl, frame: fr, output: path.join(uit, `f${String(fr).padStart(6, '0')}.jpg`), imageFormat: 'jpeg', jpegQuality: 70, scale: Number(schaal), puppeteerInstance: browser });
};
const P = 4;
for (let i = 0; i < frames.length; i += P) await Promise.all(frames.slice(i, i + P).map(opEen));
await browser.close({ silent: true });
console.log('klaar', frames.length);
