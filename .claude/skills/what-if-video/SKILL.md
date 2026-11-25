---
name: what-if-video
description: Build a Histora "What if you were <person>?" short - a 3D video of at most 58 s with blocky figures, made entirely in code (Remotion + three.js, no Higgsfield), modelled on the owner's Instagram references. Use when the owner asks for a new What-if video, the next person in that series, or changes to the Caesar video / the 3D template in marketing/remotion/src/watals/.
---

> **Active again since 2026-11-23**: one What-if per day on fan request (YouTube Shorts + Instagram + TikTok), next
> to the long videos. New shorts go in `marketing/1.videos/1.te-posten/<nn>-<id>-short/` (flat: the mp4s,
> `omslag.png`, `youtube.md`); posting runs through `node marketing/posten-klaar.mjs <map>` → `posten.json` and the
> routes in `marketing/README.md`. Newest template to copy: `WatAlsStalin.tsx` / `WatAlsWillem.tsx` (14 scenes,
> `DUUR = [140,110,120,120,110,115,115,115,115,110,110,110,115,210]` = 57.2 s).

## Cheapest route (Stalin, 2026-11-24: script → posted on 3 platforms in one evening)

1. Script in your head first: 14 lines, each = teller (label/value/pill) + caption with one accent word. Facts checked.
2. Copy the newest `WatAls*.tsx`, keep `Scène`/montage/`KLANKEN` as is, write the kit (2-3 signature items) and S1-S14.
   Register in `Root.tsx` (`watals-<id>`, `watals-<id>-stil`, `Still watals-omslag-<id>`) and `Omslagen.tsx`.
3. `npx tsc --noEmit`, then ONE half-scale check render and
   `python marketing/remotion/scripts/watals-frames.py src/watals/WatAls<Id>.tsx out/<id>/check.mp4`
   → read `grid0.jpg` + `grid1.jpg` (2 images for 14 scenes). Fix, then re-check only the changed scenes with
   `npx remotion still … --frame=<n> --scale=0.4` instead of a full render.
4. Final renders + cover in one background command, then `node marketing/posten-klaar.mjs <map>`, write `youtube.md`
   (Titel, Beschrijving, Gerelateerde video, Vastgezette reactie, Instagram, TikTok, Vertalingen-tabel, Fact notes,
   Slagingskans) BEFORE running it, so `posten.json` carries all 14 translations.
5. Post via the routes in `marketing/README.md`; reply to the requester under their own comment.

# "What if you were …?" videos (format since 2026-11-15)

First video: **Julius Caesar** (`marketing/9.archief/what-if-shorts/2.gepost/01-julius-caesar/`, live 2026-11-15 23:45).

**Folders:** a new video goes in `marketing/9.archief/what-if-shorts/1.te-posten/<nn-id>/` with `upload/` (exactly what the
owner uploads: `<id>-zonder-muziek.mp4`, `omslag.png`, `post.md`) and `extra/` (`<id>-muziek.mp4`). After posting,
move the folder from `marketing/9.archief/what-if-shorts/1.te-posten/` to `marketing/9.archief/what-if-shorts/2.gepost/` (`mv`, never `rm`) and add `stats.md` there.
The owner loved it. Copy its structure; don't reinvent it.

## What the format is

- 9:16, **max 58 s (hard rule, owner 2026-11-23)**, **no voice**. Second person ("you cross", "you weep"), one life from start to end.
- **Never longer than 58 s (1740 frames).** Music added in the YouTube/IG app stops at 1:00, and a YouTube Short over
  1 min with a music claim is blocked worldwide. So: **12-14 scenes of ~4 s** plus the final scene (~7 s). Every
  composition checks `MAX_SHORT_FRAMES` from `watals/Afsluiter.tsx` and throws if it is longer. Writing the script,
  plan for the limit from the start; don't write 18 scenes and cut later (that happened to Caesar, Napoleon, Saladin
  and Mehmed on 2026-11-23, see `WEG` in those files).
- **~4 s per scene**, hard cuts. Each scene = one moment, a slow camera move, and:
  - **counter top-left** (`Teller`): small label ("Year", "Age", "Wounds"), big value ("75 BC",
    "31", count-ups like 0→23), orange pill with context or source ("Plutarch", "Alesia").
  - **caption** (`Onderschrift`): EB Garamond italic, word by word, the **last word in accent**.
- Scene 1 = "What if you were *Name*?" + year. Last scene = the legacy, with the **old CTA overlay**
  (`Afsluiter.tsx`: darken, waving fox PNG, "The full story is in Histora.", app icon, "Link in bio").
  **No 3D fox end card, no "part 2"** (owner rejected both).
- Look: **soft warm daylight like ref-01** (not the bright ref-07), depth of field on every scene,
  flat-shaded low-poly water with foam.
- Music: the owner's track (`public/lokaal/amour-plastique.mp3`, from
  `marketing/referenties/muziek/`, starts at 0:14). It is a commercial song: always render a
  `-stil` version too (SFX only) so he can add the song in-app.

## Code (`marketing/remotion/src/watals/`)

| File | What |
|---|---|
| `Figuur.tsx` | `Figuur` (one body for everyone; `kleding`, `haar`, `hoofddeksel`, `baard`/`snor`, `pose` with shoulder+elbow arms, `traan`, `wenk`, `mond`, `inHand`, `o` = GOUD/BRONS statue), presets `ARMEN_GEKRUIST`, `wijs()`, `omhoog()`, costumes (CAESAR, PIRAAT, LEGIOEN, GALLIËR, SENATOR, ZIENER, CALPURNIA, CLEOPATRA, POMPEIUS), props `Zwaard`, `Dolk`, `Rol`, `Phoxy` (unused) |
| `Decor.tsx` | `Camera`, `Scherpte` (DOF), `Lucht` (sky sphere), `Zon`, lights (`Daglicht`, `Binnenlicht`, `Avondlicht`, `Nachtlicht`), `Zee`, `Schuim`, `Galei`, `Grond`, `Heuvels`, `Bos`, `Rivier`, `Fakkel`, `Paard`, `Soldaat`/`Leger`, `Banier` (VENI VIDI VICI), `Zuil`, `Zuilengang`, `Sokkel`, `Strijdwagen`, `Menigte`, `TekstVlak` |
| `Hud.tsx` | `Teller`, `Onderschrift`, `Watermerk` (@gethistora), `Vignet` |
| `WatAlsCaesar.tsx` | the video: `Scène` wrapper, S1-S18, `DUUR`, `KLANKEN` (SFX), montage |
| `Afsluiter.tsx` | the CTA overlay |

New person = new `WatAls<Name>.tsx` built like `WatAlsCaesar.tsx` (copy it), new costumes/props in
`Figuur.tsx`/`Decor.tsx` when needed, two compositions in `src/Root.tsx` (`watals-<id>` with music,
`watals-<id>-stil`).

**A person is recognised by 2-3 signature items, never a face**: Caesar = white tunic with purple
stripes + red cape + laurel; Napoleon = bicorne + blue coat; Cleopatra = black bob + gold band.
Keep a person in **the same costume in every scene** (owner noticed a brown armour swap).

## Cover (always, the owner asked for it)

Every video gets `omslag.png` (1080x1920) in its folder: the hero in close-up in his own scene,
"WHAT IF YOU WERE" + the name in gold at the top (`src/watals/Omslagen.tsx`, one `Still` per person
in `Root.tsx`, id `watals-omslag-<id>`). Keep the title inside the 3:4 middle (y 240-1680) so the
Instagram grid does not crop it, and the head under the title. Short name only ("KHALID?").
`npx remotion still src/index.ts watals-omslag-<id> ../9.archief/what-if-shorts/1.te-posten/<nn-id>/upload/omslag.png --gl=angle`

## Render and check

```bash
cd marketing/remotion
npx tsc --noEmit
npx remotion render src/index.ts watals-<id>-stil out/<id>/check.mp4 --gl=angle --concurrency=4 --scale=0.5   # ~1.5 min
# one frame per scene (local ffmpeg is a minimal build: put ffmpeg-static first on PATH)
PATH="$PWD/node_modules/ffmpeg-static:$PATH" python <scratchpad>/frames.py out/<id>/check.mp4 out/<id>/a.jpg 3.5,7.7,...
npx remotion render src/index.ts watals-<id> ../9.archief/what-if-shorts/1.te-posten/<nn-id>/extra/<id>-muziek.mp4 --gl=angle --concurrency=4
npx remotion render src/index.ts watals-<id>-stil ../9.archief/what-if-shorts/1.te-posten/<nn-id>/upload/<id>-zonder-muziek.mp4 --gl=angle --concurrency=4
```

`frames.py` = seek with ffmpeg per timestamp, paste the PNGs into one grid with PIL (rewrite it if the
scratchpad is gone; it is 15 lines). **Always look at one frame per scene before the final render.**

## Lessons that cost a round with the owner

- **Arm poses:** `schouder: [-1.9, 0, -0.35]` and `armL: [-2.5, 0, 0.5]` both put the hand in front of the face
  (S1 + cover of Stalin). For a raised/waving arm use `armR: omhoog()`. Check the cover too, it has its own pose.
- **Smoke (`Rook`) near the camera** grows into grey blocks that fill the frame; keep it ≥ 8 units behind the subject.
- **Fov 34 at distance 8 is only ~2.6 units wide**: two figures 2.4 apart already fall off the edge. Frames inside a
  shot (photo frame in Stalin S11) go at camera-z − 3, ~±0.47 wide.
- **Sensitive people** (dictators, wars): no violence in frame, but name the cost in numbers, end on a question
  ("hero or monster?"), and no ideological emoji (☭) in our own comments.

- **Scale:** a figure is ~2.4 units tall, horse + rider ~3.6. At fov 34 keep the camera **7-11 units**
  away (horse shots ~11), or the subject fills the frame. Faces belong below the caption (which sits
  at ~27-35% of the height).
- Figures face **+z**; the horse's head points **-z** and `Paard` turns the rider around for you.
  A chariot = horse in front pulling (`Strijdwagen` does it); crowds stand **along** the street.
- **Flicker = z-fighting**: two faces less than ~0.02 apart (stripes on a tunic, armour over a
  tunic). Keep offsets ≥ 0.02 and camera `near` 0.3.
- Metal without an environment map renders black: statues use `metaal` ~0.3.
- Something in front of the camera (a stern post, a tent roof, a back of a head) kills the shot:
  check every frame.
- Text in 3D (`TekstVlak`) needs a stable memo key (done).
- Ship: no ropes from the mast (owner: "rare stokken"); oars must start in the hull and end in
  the water.

## Sound (minimal, ~25 dB under the music)

`KLANKEN` in the video file: per scene an ambience loop + a few accents, whoosh 0.1 on every cut.
Files in `public/watals-sfx/` (gitignored):
- ambiences `zee`, `wind`, `rivier`, `vuur`, `menigte`: `python scripts/watals-sfx.py`
- accents via `mcp__earshot__sfx_render`: `whoosh` = swish/soft dur 0.8 apex 0.4 peak -6;
  `tik` = pro_tap/soft -6; `munt` = mallet/glock -6; `inslag` = pro_impact/deep -3;
  `glans` = pro_shimmer/m0 -6; `val` = pro_sub_drop/soft -3; `afsluiter` = logo_sting/soft_bloom -6.
- earshot's decoding tools fail on this PC (minimal ffmpeg on PATH); `sfx_render` works. Check levels
  with `node_modules/ffmpeg-static/ffmpeg.exe -i <mp4> -af volumedetect -vn -f null -`
  (Caesar: −15 dB mean with music, −40 dB SFX only).

## Copy and facts

Load the `histora-brand` skill. Write our own captions (don't copy the reference accounts' lines),
check every claim against Plutarch/Suetonius-level sources, put a Fact notes table + platform
captions (TikTok, YouTube title/description, Instagram) + a Slagingskans in `post.md`.
