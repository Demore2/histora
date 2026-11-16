# Lange YouTube-video's (16:9)

Eerste: `01-napoleon/` (5:23, 2026-11-16). Werkwijze, in deze volgorde:

1. **Script** `script.md`: `## Hoofdstuk` + één zin per regel, ~750 woorden voor 5 min, feitentabel onderaan.
   Basis = het app-verhaal (8 hoofdstukken). Derde persoon, geen "you".
2. **Stem** Dylan via Higgsfield (`seed_audio`, voice `b847bc29-f184-583a-8ad9-d1f1e16d1a60`,
   `speech_rate: -10`), **per hoofdstuk** (per zin loopt tegen de limiet van ~10 tegelijk aan), max 5 tegelijk.
   ~15 credits per 5 min. Downloaden als `dylan/h0.mp3`, `h1.mp3`, ...
3. **Lange stiltes inkorten** (Seed Audio zet er soms 7 s stilte in): zie het numpy-stukje in de sessie van
   2026-11-16; alles boven 0,8 s → 0,6 s, naar `dylan-kort/`.
4. **Timing**: `node marketing/remotion/scripts/vo-hoofdstukken.mjs <map> zinnen.json` → `voice.mp3` +
   `timing.json` (zinsgrenzen gekozen op stiltes + verwachte zinslengte).
5. **Beeld**: `marketing/remotion/src/lang/`: `Kaarttafel.tsx` (3D-Europa, rijk groeit/krimpt), `LangHud.tsx`
   (jaartal-label, teller, ondertitels), `LangDecor.tsx` (zeilschip, driekleur, route, kaders, afsluiter),
   één shot per zin (`SHOTS` met `zin` + optioneel `na`). Check: render `--scale=0.5`, één frame per shot.
6. **Geluid**: per shot sfeer + accenten, whoosh op elke knip; daarna loudnorm 2 doorgangen naar −14 LUFS.
7. **Thumbnail** `lang-<id>-thumb` (1920×1080) en `post.md` (titel, beschrijving met hoofdstukken).

Stijl: de 3D-blokstijl van de What-if-shorts. Geen platte 2D-wereldkaart (eigenaar).
