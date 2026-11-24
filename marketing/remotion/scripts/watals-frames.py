"""Eén frame per scène van een What-if-short, als twee rasterbeelden om in één keer te bekijken.

    python marketing/remotion/scripts/watals-frames.py <WatAlsX.tsx> <check.mp4> [uitmap]

Leest `const DUUR = [...]` uit het .tsx-bestand, pakt per scène het frame op 75% van die scène
(dan staat de tekst er volledig) en schrijft <uitmap>/grid0.jpg (scène 1-7) en grid1.jpg (8-14).
Gebruikt ffmpeg-static uit node_modules (de ffmpeg op PATH is een minimale build) en PIL.

Snelle check-render vooraf (~1,5 min):
    npx remotion render src/index.ts watals-<id>-stil out/<id>/check.mp4 --gl=angle --concurrency=4 --scale=0.5
Eén scène opnieuw bekijken zonder hele render:
    npx remotion still src/index.ts watals-<id>-stil out/<id>/s.png --frame=<n> --gl=angle --scale=0.4
"""
import os
import re
import subprocess
import sys

from PIL import Image

HIER = os.path.dirname(os.path.abspath(__file__))
FFMPEG = os.path.join(HIER, '..', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe' if os.name == 'nt' else 'ffmpeg')


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(2)
    tsx, mp4 = sys.argv[1], sys.argv[2]
    uit = sys.argv[3] if len(sys.argv) > 3 else os.path.dirname(os.path.abspath(mp4))
    bron = open(tsx, encoding='utf-8').read()
    m = re.search(r'const DUUR\s*=\s*\[([^\]]+)\]', bron)
    if not m:
        sys.exit('Geen "const DUUR = [...]" gevonden in ' + tsx)
    duur = [int(x) for x in re.findall(r'\d+', m.group(1))]
    start, tijden = 0, []
    for d in duur:
        tijden.append((start + d * 0.75) / 30)
        start += d
    beelden = []
    for i, t in enumerate(tijden):
        p = os.path.join(uit, f'f{i}.png')
        subprocess.run([os.path.abspath(FFMPEG), '-y', '-loglevel', 'error', '-ss', f'{t:.2f}', '-i', mp4, '-frames:v', '1', p], check=True)
        beelden.append(Image.open(p))
    w, h = beelden[0].size
    for deel in range(0, len(beelden), 7):
        rij = beelden[deel:deel + 7]
        g = Image.new('RGB', (w * len(rij), h))
        for j, b in enumerate(rij):
            g.paste(b, (j * w, 0))
        g.save(os.path.join(uit, f'grid{deel // 7}.jpg'), quality=85)
    print(f'{len(beelden)} scènes, totaal {start} frames ({start / 30:.1f} s) -> {uit}/grid*.jpg')


if __name__ == '__main__':
    main()
