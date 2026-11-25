---
name: youtube-long-video
description: Build a Histora long-form YouTube video (16:9, 8-10 min, voiced) in the approved 3D blocky style - teaser cold open, 3D map table, one shot per sentence, local Chatterbox voice, split thumbnail - and finish it in YouTube Studio once the owner has uploaded it ("doe maar aanvullen"). Use when the owner asks for a new long video ("lange video", "YouTube video"), the next person in that series, changes to a long video in marketing/remotion/src/lang/, or says the uploaded video can be filled in.
---

# Histora long-form YouTube videos (approved 2026-11-16: "echt goated")

**Current template: William of Orange** (#08, 2026-11-25, built in one afternoon): `marketing/1.videos/1.te-posten/08-willem/`
and `marketing/remotion/src/lang/Willem*.tsx` + `KaarttafelNL.tsx`. Copy that one, not Napoleon: it uses the new
voice, the set-with-`fase` approach and the Studio routine below. Older notes in `marketing/1.videos/README.md`.

## The recipe that works (Willem, ~5 hours from zero to private upload)

1. **Script** `werk/zinnen.json` (`[{i, h, zin}]`), **you-form**, 115-125 sentences ≈ 8:30 with Chatterbox (it speaks
   ~2.8 words/s incl. pauses; aim ~1,450 words). Owner wants **8-10 min** (mid-roll ads from 8:00). Teaser = zin 0-5,
   then chapters I-IX, outro "Who should be born next? Tell us in the comments." / "Subscribe for more.".
   Check facts while writing; hedge legends in the text ("according to tradition", "probably a myth").
   **No one-word sentences** ("Yours.") — Chatterbox babbles on them; write "Your shoulder." instead.
2. **Voice right away, in the background** (~11 min for 8:30, GPU): `G:\dev-tools\stem\.venv\Scripts\python.exe
   G:\dev-tools\stem\stem.py <werk/zinnen.json> G:\dev-tools\stem\ref-dylan.wav <werk/stem>` → `voice.wav` + `timing.json`.
   Then **transcribe with faster-whisper** (in the same venv) and compare per sentence; a bad sentence is replaced in
   place with `vervang_zin.py <werk/stem> <i> "<text>" ref-dylan.wav` (tries seeds, checks, keeps the timing).
   Convert timing to `src/lang/<id>-timing.json` (`{hoofdstuk, zin, start, eind}`) and copy `voice.wav` to
   `public/lokaal/<id>-lang-voice.wav`. No Higgsfield (cancelled 2026-11-25).
3. **Build while the voice renders**: `<Id>Kit.tsx` = ~10 **sets** (interior, court, street, polder, sea, battlefield,
   map table …) that take `cam`/`kijk`/`over`/children; `<Id>Scenes.tsx` + `<Id>Scenes2.tsx` = one small component
   per sentence built from those sets with a `fase` prop; `<Id>Lang.tsx` = the `SHOTS` list (copy WillemLang.tsx:
   accents, ambience, Caesar music pieces via `STUK`). Reuse the What-if short's kit (export its pieces). 2D overlays
   (`Pijllabel`, `LangTeller`, `Citaat`, `Stempel` …) go in **`over`**, never as 3D children (R3F crash "Circle is not
   part of the THREE namespace"). Register `lang-<id>` / `lang-<id>-stem` + thumb Still in `Root.tsx`; `npx tsc --noEmit`.
4. **Stills check**: shot middle-frames from the SHOTS list → `node scripts/stills.mjs lang-<id> <dir> <frames> 0.4`,
   paste into contact sheets of 20 (PIL) and look at every one. Typical fixes: camera inside a tree/hill/wall, speech
   bubble off the top (keep Wolk y ≤ 2.75 in close-ups), quote over a face (raise `kijk` y), text sign overflowing
   (`fontPx`), `Rook` reading as a light slab (drop it), floating props. Re-render only the fixed shots.
5. **Render + master**: `npx remotion render src/index.ts lang-<id>-stem <werk/renders/ruw.mp4> --gl=angle --concurrency=5 --timeout=180000`
   (~12 min), loudnorm two-pass to −14 LUFS with `G:\dev-tools\ffmpeg-vol\ffmpeg.exe` → `upload/<id>.mp4`, then
   `qa_video.py` from the video-director skill (PATH with ffmpeg-vol first). Frozen-stretch warnings are normal here.
6. **Thumbnail** `<Id>Thumb` in `CaesarThumb.tsx` via `Breed` (AGE N kid left / one red word right) → `upload/thumbnail.png`.
7. **`upload/post.md`** (title, description with chapter times from the timing, pinned comment, Slagingskans) and
   **`upload/vertalingen.json`** (14 languages, see below). **The owner uploads** (the Chrome upload tool takes max 10 MB)
   and sets it **private**.

## "Doe maar aanvullen" — finishing a private upload in Studio (cheap in tokens)

Find the id: `studio.youtube.com/channel/UC4zE-VpdoGv7uXAtLSF6sWw/videos/upload` → one JS call that lists
`ytcp-video-row` titles + links + visibility. Then on `studio.youtube.com/video/<id>/edit`, **one JS call each**, no screenshots:
- click "Meer weergeven"/"Meer tonen"; read the radio states (`tp-yt-paper-radio-button` + `aria-checked`).
- set **betaalde promotie: Nee** and **AI-gebruik: Nee** (code-rendered 3D; narration is not one of YouTube's four cases).
- **tags** (~9, incl. the native name): focus the tags input, per tag set `.value`, dispatch `input` + `keydown Enter`.
- **Taal van titel en beschrijving → Engels** (`find` the dropdown, click, pick `tp-yt-paper-item` "Engels"), then
  click "Opslaan" — translations can't be added before this is set.
- leave the owner's title/description/thumbnail/kids setting alone unless asked.
- **Translations** on `/video/<id>/translations`: `node marketing/1.videos/kanaal/studio-aanvullen.mjs upload/vertalingen.json`
  prints a JS fragment (titles + descriptions + helpers `nieuw(k)`, `vul(k)`, `stand()`); paste it once, then
  **≤ 3 languages per call** (`for(const k of ['de','fr','es'])…await nieuw(k)`), finish with `stand()` to confirm
  "Gepubliceerd" for every row, and open one row to spot-check the text (Escape is safe in this dialog).
- Fixed set of 14: nl de fr es pt(-BR) it ru tr ar fa hi ur id ms (+ a topic language: el, ky, mn …).
  `vertalingen.json` = `{tijden[], talen{k:{studio,titel,haak,hoofdstukken[],vraag,engels,tags}}}`; copy 08-willem's.
- Then report what was set; the owner makes it public himself and links the short (`Gerelateerde video`).

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
- **Voice: local Chatterbox** cloned on a Dylan clip (`stem.py`, exaggeration 0.7, cfg 0.3; owner approved
  2026-11-25 "echt goed"). Pauses follow Dylan: 0.5-0.8 s between sentences, 1.0-1.2 s at a chapter change, the
  model's own edge silence trimmed (otherwise it sounds like a robot that stops mid-sentence). Rejected earlier:
  Kokoro/Onyx, Alistair, Mark, Kevin, Andre, Xavier, Orion, Leo (too flat/old).
- **Music**: the existing Caesar pieces (`public/lokaal/caesar-muziek/m0..m10`), one per chapter via `STUK` — no
  new credits. (The original Napoleon music was ElevenLabs via Higgsfield, which is gone.)
- **Thumbnail**: split with a slanted cut, left the humble start ("AGE 9", angry kid), right the peak
  ("EMPEROR", gold crown, sunset), Inter 900 labels with thick dark stroke.
  Since Caesar (2026-11-18, after Saladin got CTR 0.8%): **face close-ups** filling each half (head + shoulders, no
  half-cut extra figures), light/bright backgrounds with one clear prop (window, sunset), red manga anger mark
  next to the kid, right word in red-orange #FF5436, **no small italic line** (unreadable at 120 px). See `CaesarThumb.tsx`.
- **No app link / "in Histora"** until the app is live on Android and iOS (`APP_IN_BEELD` in
  `src/watals/Afsluiter.tsx`); outro: "Who should be next? Tell us in the comments. Subscribe for more."
- Music volume 0.2 under the story, 0.42 in the teaser, 2.5 s overlap. Mix: loudnorm two-pass to −14 LUFS.
- **Safety in scenes**: no violence on screen (a shot = flash only; death = the wall, the dropped hat, the last
  words), no crosses, no church interiors, no bodies.

## Token budget (owner: "weinig credits")

Run voice, stills and render **in the background** and build meanwhile; never poll their output. Use JS calls that
return short strings instead of screenshots or `get_page_text`; batch browser steps with `browser_batch`; check
stills as contact sheets (20 per image) instead of one by one; re-render only shots you changed.

## Folders

`marketing/1.videos/1.te-posten/<nn-id>/upload/` = only what gets uploaded (mp4, thumbnail.png, post.md);
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
