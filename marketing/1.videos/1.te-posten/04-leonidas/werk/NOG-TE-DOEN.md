# Leonidas: wat er nog moet (vanaf 25 nov, na het aanvullen van de credits)

Stand 18 nov: script, scratchboard, alle 113 shots, thumbnail en reel-omslag zijn klaar en gecontroleerd
(`stills/vel-r1-*`, `vel-r2-*`). De timing is een **schatting** (2,35 woorden/s, net als Caesar), dus de beelden lopen
al, maar pas na de stem kloppen de knippen exact. Higgsfield stond op 1,33 credits; de stem kost ~44.

1. **Stem opnemen** (Dylan, `seed_audio`, voice `b847bc29-f184-583a-8ad9-d1f1e16d1a60`): de teaser op `speech_rate 0`,
   de hoofdstukken I-IX en de outro op `-10`. De teksten per hoofdstuk staan in `hoofdstuk-teksten.json` (11 stukken).
   Maximaal 5 tegelijk. Downloaden naar `stem/dylan/h0.mp3` … `h10.mp3`.
2. **Stiltes inkorten** (>0,8 s → 0,6 s) naar `stem/dylan-kort/` (zelfde numpy-stukje als bij Caesar).
3. **Timing**: `node marketing/remotion/scripts/vo-hoofdstukken.mjs <stem/dylan-kort> zinnen.json`, dan `timing.json`
   naar `marketing/remotion/src/lang/leonidas-timing.json` en `voice.mp3` naar `public/lokaal/leonidas-lang-voice.mp3`.
4. **Hoofdstuktijden** in `upload/post.md` invullen (CHAPTERS_HIER).
5. **Controle**: `node scripts/stills.mjs lang-leonidas-stem <map> <frames> 0.4` op een paar shots; luisteren doet de eigenaar.
6. **Render**: `npx remotion render src/index.ts lang-leonidas-stem ../1.videos/1.te-posten/04-leonidas/werk/renders/ruw.mp4 --gl=angle --concurrency=5 --timeout=180000`
   (~13 min), daarna loudnorm in 2 doorgangen naar -14 LUFS → `upload/leonidas.mp4`.
7. **Inplannen** voor do 26 nov 06:00 NL.

Muziek: hergebruikte Caesar-stukken, per hoofdstuk gekozen (`STUK` in `LeonidasLang.tsx`: VII = de Gallische veldslag,
VIII = de Iden van maart). Niet beluisterd door Claude; de eigenaar beslist op het gehoor.
