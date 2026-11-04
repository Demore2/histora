// Tijdelijke stem met de ingebouwde Windows-stem (gratis, lokaal), één wav per beat. Alleen om timing
// en montage te beoordelen zolang de echte stem er niet is — nooit posten.
// Gebruik: npm run vo:placeholder -- <id> [--voice "Microsoft David Desktop"] [--rate 1]
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, VOICE, id, laadConfig } from './hulp.mjs';

const videoId = id();
const config = await laadConfig(videoId);
const arg = (naam, std) => { const i = process.argv.indexOf(naam); return i > 0 ? process.argv[i + 1] : std; };
const stem = arg('--voice', 'Microsoft David Desktop');
const tempo = arg('--rate', '1');

const map = join(VOICE, videoId, 'placeholder');
mkdirSync(map, { recursive: true });
mkdirSync(join(VOICE, 'shared'), { recursive: true });
const regels = config.beats.map((b, i) => ({ tekst: b.say, uit: join(map, `${String(i).padStart(2, '0')}.wav`) }));
regels.push({ tekst: 'The full story is in Histora. Follow for more.', uit: join(VOICE, 'shared', 'cta-placeholder.wav') });

const lijst = join(map, 'regels.json');
writeFileSync(lijst, JSON.stringify(regels));
const ps = `
Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.SelectVoice('${stem}')
$s.Rate = ${Number(tempo)}
foreach ($r in (Get-Content -Raw -Encoding UTF8 '${lijst}' | ConvertFrom-Json)) {
  $s.SetOutputToWaveFile($r.uit)
  $s.Speak($r.tekst)
}
$s.SetOutputToNull()
`;
execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { stdio: 'inherit', cwd: ROOT });
console.log(`${regels.length} placeholder-opnames in voice/${videoId}/placeholder/ (+ voice/shared/cta-placeholder.wav)`);
