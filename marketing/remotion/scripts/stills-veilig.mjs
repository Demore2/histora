// Zoals stills.mjs, maar een fout in één frame stopt de rest niet: de fout wordt gelogd en de render gaat door.
//   node scripts/stills-veilig.mjs <compositie> <uitmap> <frames,komma,gescheiden> [schaal]
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
const fouten = [];
const opEen = async (fr, i) => {
  try {
    await renderStill({ composition, serveUrl, frame: fr, output: path.join(uit, `s${String(i).padStart(3, '0')}.jpg`), imageFormat: 'jpeg', jpegQuality: 70, scale: Number(schaal), puppeteerInstance: browser, chromiumOptions: { gl: 'angle' } });
  } catch (e) {
    fouten.push(`shot ${i} (frame ${fr}): ${String(e.message).split('\n')[0]}`);
  }
};
const P = 4;
for (let i = 0; i < frames.length; i += P) await Promise.all(frames.slice(i, i + P).map((fr, k) => opEen(fr, i + k)));
await browser.close({ silent: true });
console.log('klaar', frames.length - fouten.length, 'van', frames.length);
for (const f of fouten) console.log(f);
