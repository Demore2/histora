---
name: youtube-long-video
description: Build a Histora long-form YouTube video (16:9, ~5 min, voiced) in the approved 3D blocky style - teaser cold open, 3D map table, one shot per sentence, Dylan voice, split thumbnail. Use when the owner asks for a new long video ("lange video", "YouTube video", "5 minutes of …"), the next person in that series, or changes to the Napoleon long video in marketing/remotion/src/lang/.
---

# Histora long-form YouTube videos (approved 2026-11-16: "echt goated")

First one: **Napoleon in 5 minutes** (`marketing/2.youtube/2.gepost/01-napoleon/`). Copy it; don't reinvent.
Full step-by-step in `marketing/2.youtube/README.md`.

## The style (what the owner approved)

- **3D blocky look of the What-if shorts**, 16:9, warm light, depth of field. Never a flat 2D world map.
- **Teaser cold open, 12-15 s, made separately** (not cut from the video): cannon bang + camera shake +
  big gold title "WHAT IF YOU WERE <NAME>?", then 3 quick "You'd …" highlights (rise, peak, fall), ending
  on a question ("So how does … get there?"), then the title card "THE LIFE OF <NAME> in five minutes".
- **Story in third person**, ~750 words, 8 chapters from the app story, one sentence per line.
- **One shot per sentence** (`SHOTS` with `zin`, optional `na` offset), slow camera moves, a whoosh on every cut,
  ambience per shot + accents (cannon hits, glints, ticks).
- **3D map table** (`Kaarttafel.tsx`): Europe from world-atlas as raised country plates on a wooden table;
  the empire rises in blue, allies light blue, enemies red-brown; routes as orange dotted lines with a mini
  figure at the head; pins with flags. Year label top-centre (`JaarLabel`), counter top-left (`LangTeller`),
  word-by-word subtitles at the bottom (`Ondertitel`).
- Fun beats that worked: the famous painting in a gold frame vs the real mule, a height chart for "not short",
  a sepia British cartoon with a tiny furious figure, counters that count up/down (army 600,000 → ~100,000).
- **Voice: Dylan** (Higgsfield `seed_audio`, preset `b847bc29-f184-583a-8ad9-d1f1e16d1a60`), story at
  `speech_rate: -10`, teaser at `0`; record **per chapter**, max 5 parallel; compress silences > 0.8 s (Seed
  Audio sometimes inserts 7 s); timing via `scripts/vo-hoofdstukken.mjs`. Rejected: Kokoro/Onyx, Alistair,
  Mark, Kevin, Andre, Xavier, Orion, Leo and others (too flat/old).
- **Thumbnail**: split with a slanted cut, left the humble start ("AGE 9", angry kid), right the peak
  ("EMPEROR", gold crown, sunset), Inter 900 labels with thick dark stroke.
  Since Caesar (2026-11-18, after Saladin got CTR 0.8%): **face close-ups** filling each half (head + shoulders, no
  half-cut extra figures), light/bright backgrounds with one clear prop (window, sunset), red manga anger mark
  next to the kid, right word in red-orange #FF5436, **no small italic line** (unreadable at 120 px). See `CaesarThumb.tsx`.
- **No app link / "in Histora"** until the app is live on Android and iOS (`APP_IN_BEELD` in
  `src/watals/Afsluiter.tsx`); outro: "Who should be next? Tell us in the comments. Subscribe for more."
- **Music**: orchestral style A (soft strings, light military snare, warm French horn), one ElevenLabs Music v2.5
  track per chapter via Higgsfield with that chapter's mood (teaser: timpani/brass hit), normalised to -18 LUFS,
  volume 0.2 under the story, 0.42 in the teaser, 1.5 s overlap. Mix: loudnorm two-pass to -14 LUFS.

## Folders

`marketing/2.youtube/1.te-posten/<nn-id>/upload/` = only what gets uploaded (mp4, thumbnail.png, post.md);
`werk/` = script, zinnen.json, stem/, renders/. Move from `1.te-posten/` to `2.gepost/` after posting.

## Rendering

**Always render with `--gl=angle`** (the GPU): `npx remotion render src/index.ts lang-<id> <out>.mp4 --gl=angle --concurrency=5 --timeout=180000`.
Without it, Remotion draws the three.js scenes with SwiftShader on the CPU: 10 minutes of video barely moved in
40 minutes (2026-11-17). With angle it ran at ~25 fps, about 13 minutes for 10:30. Don't render stills at the same
time as the full render: the extra load made an audio `delayRender` time out. For one still per shot use
`node scripts/stills.mjs <composition> <outdir> <frames,comma,separated> 0.4`.

## Checks before handing over

Half-scale render, one frame per shot in grids (`frames.py`), fix: smoke blocks in front of the camera,
horse heads covering faces (turn the rider's head with `hoofd: [0, -0.8, 0]`), anything cross-shaped in
sensitive scenes, captions over faces. Facts table in `script.md`; maps say "modern borders, approximate".
