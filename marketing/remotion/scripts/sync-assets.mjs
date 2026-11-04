// Kopieert de beelden die een video gebruikt van assets/images/ naar public/ (Remotion serveert alleen
// public/; een symlink weigert Windows zonder ontwikkelaarsmodus). Gebruik: npm run assets -- <id>
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ASSETS, PUBLIC, ROOT, id, laadConfig } from './hulp.mjs';

const config = await laadConfig(id());
const nodig = new Set(['vos/zwaaiend.png', 'app-icon.png']);
for (const s of config.shots) if (s.kind === 'scene' && !s.src.startsWith('extra/')) nodig.add(s.src);
// Alle scènes van het verhaal, zodat je in de Studio vrij kunt wisselen.
for (let n = 1; n <= 8; n++) nodig.add(`scenes/${config.storyId}-${n}.webp`);
nodig.add(`characters/${config.storyId}.webp`);

let n = 0;
for (const rel of nodig) {
  const doel = join(PUBLIC, rel);
  mkdirSync(dirname(doel), { recursive: true });
  try { copyFileSync(join(ASSETS, rel), doel); n++; } catch { console.warn('ontbreekt:', rel); }
}
// Historische bronbeelden die niet in de app zitten (publiek domein, zie extra/BRONNEN.md): extra/<storyId>/ → public/extra/<storyId>/.
const extra = join(ROOT, 'extra', config.storyId);
if (existsSync(extra)) {
  for (const naam of readdirSync(extra)) {
    const doel = join(PUBLIC, 'extra', config.storyId, naam);
    mkdirSync(dirname(doel), { recursive: true });
    copyFileSync(join(extra, naam), doel);
    n++;
  }
}
console.log(`${n} beelden in public/`);
