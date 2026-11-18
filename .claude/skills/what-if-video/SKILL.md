---
name: what-if-video
description: Build a Histora "What if you were <person>?" short - a 70-90 s 3D video with blocky figures, made entirely in code (Remotion + three.js, no Higgsfield), modelled on the owner's Instagram references. Use when the owner asks for a new What-if video, the next person in that series, or changes to the Caesar video / the 3D template in marketing/remotion/src/watals/.
---

> **Retired 2026-11-18** (owner): no more shorts, only long videos (skill `youtube-long-video`). The What-if
> shorts are archived in `marketing/9.archief/what-if-shorts/`. Use this skill only if the owner explicitly asks for a short again.

# "What if you were …?" videos (format since 2026-11-15)

First video: **Julius Caesar** (`marketing/9.archief/what-if-shorts/2.gepost/01-julius-caesar/`, live 2026-11-15 23:45).

**Folders:** a new video goes in `marketing/9.archief/what-if-shorts/1.te-posten/<nn-id>/` with `upload/` (exactly what the
owner uploads: `<id>-zonder-muziek.mp4`, `omslag.png`, `post.md`) and `extra/` (`<id>-muziek.mp4`). After posting,
move the folder from `marketing/9.archief/what-if-shorts/1.te-posten/` to `marketing/9.archief/what-if-shorts/2.gepost/` (`mv`, never `rm`) and add `stats.md` there.
The owner loved it. Copy its structure; don't reinvent it.

## What the format is

- 9:16, 70-90 s, **no voice**. Second person ("you cross", "you weep"), one life from start to end.
- **16-20 scenes of ~4 s**, hard cuts. Each scene = one moment, a slow camera move, and:
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
