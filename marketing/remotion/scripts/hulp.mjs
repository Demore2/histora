// Gedeeld door de scripts: paden, ffmpeg, en het laden van een video-config (Node 24 strip TypeScript zelf).
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
export const FFMPEG = require('ffmpeg-static');
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const REPO = resolve(ROOT, '../..');
export const ASSETS = join(REPO, 'assets/images');
export const PUBLIC = join(ROOT, 'public');
export const VOICE = join(ROOT, 'voice');
export const SHORTS = join(REPO, 'marketing/shorts/30-seconds-of-history');

export const ff = (args, opts = {}) => execFileSync(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit', ...opts });
/** ffmpeg draaien en zijn stderr teruggeven (silencedetect, duur). */
export const ffStderr = (args) => spawnSync(FFMPEG, ['-hide_banner', ...args], { encoding: 'utf8' }).stderr ?? '';
export const duurVan = (file) => {
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(ffStderr(['-i', file, '-f', 'null', '-']));
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : 0;
};

export const id = () => {
  const v = process.argv[2];
  if (!v || v.startsWith('-')) { console.error('Gebruik: npm run <script> -- <video-id>'); process.exit(1); }
  return v;
};
export const laadConfig = async (videoId) => (await import(pathToFileURL(join(ROOT, 'src/videos', `${videoId}.ts`)).href)).default;
export const timingPad = (videoId) => join(ROOT, 'src/videos/timing', `${videoId}.json`);
export const leesTiming = (videoId) => (existsSync(timingPad(videoId)) ? JSON.parse(readFileSync(timingPad(videoId), 'utf8')) : null);
/** Eerste bestaand bestand uit een lijst kandidaten. */
export const eerste = (...paden) => paden.find((p) => existsSync(p));
