// Lokale, gratis voice-over met Kokoro-82M (Apache 2.0) via kokoro-js. Draait op de CPU.
//   npm run vo:kokoro -- <video-id> [stem,stem,...] [--speed 1.0] [--take]
// Zonder --take: één proefopname per stem in voice/kandidaten/kokoro-<stem>-<id>.mp3, om te vergelijken.
// Met --take (precies één stem): voice/<id>/take.mp3, de opname die `timing` gebruikt, plus
// voice/shared/cta-kokoro-<stem>.mp3 (timing: --cta). Zonder --take komt de CTA in kandidaten/.
// Het model (~90 MB, q8) wordt de eerste keer van Hugging Face gehaald en daarna gecachet.
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { RawAudio } from '@huggingface/transformers';
import { KokoroTTS } from 'kokoro-js';
import { VOICE, ff, laadConfig } from './hulp.mjs';

const args = process.argv.slice(2);
const videoId = args.find((a) => !a.startsWith('--'));
if (!videoId) throw new Error('Gebruik: npm run vo:kokoro -- <video-id> [stem,stem] [--speed 1.0] [--take]');
const stemArg = args.filter((a) => !a.startsWith('--'))[1];
const stemmen = (stemArg ?? 'am_onyx').split(',');
const si = args.indexOf('--speed');
const speed = si >= 0 ? Number(args[si + 1]) : 1;
const take = args.includes('--take');
if (take && stemmen.length !== 1) throw new Error('--take werkt met precies één stem.');

const config = await laadConfig(videoId);
// Per zin genereren: Kokoro kapt één lange invoer stilletjes af (~510 fonemen).
// Kokoro valt bij elke komma lang stil; zonder --kommas gaan ze eruit (alleen voor de stem, de captions houden ze).
const kommas = args.includes('--kommas');
const zinnen = config.beats.map((b) => (kommas ? b.say : b.say.replace(/,\s*/g, ' ')));
const PAUZE_S = 0.3;
const CTA = 'The full story is in Histora. Follow for more.';

const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });

for (const stem of stemmen) {
  const t0 = Date.now();
  const stukken = [];
  let sr = 24000;
  for (const zin of zinnen) {
    const a = await tts.generate(zin, { voice: stem, speed });
    sr = a.sampling_rate;
    stukken.push(a.audio, new Float32Array(Math.round(PAUZE_S * sr)));
  }
  const totaal = new Float32Array(stukken.reduce((n, x) => n + x.length, 0));
  let o = 0;
  for (const x of stukken) { totaal.set(x, o); o += x.length; }
  const audio = new RawAudio(totaal, sr);
  const map = take ? join(VOICE, videoId) : join(VOICE, 'kandidaten');
  mkdirSync(map, { recursive: true });
  const wav = join(tmpdir(), `kokoro-${stem}-${videoId}.wav`);
  const mp3 = take ? join(map, 'take.mp3') : join(map, `kokoro-${stem}-${videoId}.mp3`);
  await audio.save(wav);
  ff(['-i', wav, '-ar', '44100', '-b:a', '192k', mp3]);
  // De afsluiter in dezelfde stem; `timing` krijgt hem met --cta mee (voice/shared/cta.mp3 is Alistair).
  const ctaWav = join(tmpdir(), `kokoro-${stem}-cta.wav`);
  await (await tts.generate(CTA, { voice: stem, speed })).save(ctaWav);
  const ctaMp3 = join(VOICE, take ? 'shared' : 'kandidaten', `cta-kokoro-${stem}.mp3`);
  ff(['-i', ctaWav, '-ar', '44100', '-b:a', '192k', ctaMp3]);
  console.log(`${stem}: ${mp3} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
}
