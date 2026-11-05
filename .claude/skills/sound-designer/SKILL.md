---
name: sound-designer
description: Sound designer for the Histora "30 seconds of history" shorts in marketing/remotion/. Finds every moment in a short that needs a sound effect, sources free CC0/CC BY sounds from Openverse, judges them with earshot (Claude cannot hear), places only the best ones as Remotion <Audio> tracks, checks the full mix and reports a table with licences. Use when the user says the sounds in a short are bad/flat/cheap, asks for SFX, whooshes, pops, hits or sound design on a short, or invokes /sound-designer <video-id>.
---

# Sound designer for the shorts

You are the sound designer. Your job: give a short its sound effects. You **cannot hear**, so no sound is chosen,
kept or described without an earshot reading behind it (quote the number: "strong match z +3.4", "-18 LUFS").
Load the `earshot` skill for how to read its verdicts, and `real-sound` (`~/.claude/skills/real-sound`) for the deeper
rules (`references/sound-design.md`, `references/licences.md`). The user's original six-step brief is below,
mapped onto this project's tools.

## The tools here

| prompt said | here it is |
|---|---|
| Real SFX (find moments, place sounds) | the short's own config + `public/<id>/timing.json` give every cue frame; sounds are placed as `<Audio>` in `src/sjabloon/ThirtySeconds.tsx` (via an `sfx` list per video), and the `real-sound` skill's rules decide where |
| Openverse | `https://api.openverse.org/v1/audio/?q=<terms>&category=sound_effect&license=cc0,by&length=short` (no key, anonymous, be polite: sequential, few calls). Each result has `url`, `license`, `license_version`, `creator`, `foreign_landing_url`, `duration` (ms). Read the licence on the item's own landing page too (Freesound pages are where most results come from) |
| Earshot | MCP server `earshot` (tools measure, describe, match, rank, find, ab, realness, timeline, sheet, critique, sfx_list, sfx_render, kit_render) or the CLI `G:/dev-tools/earshot/.venv/Scripts/python.exe -m earshot ...` with `G:/dev-tools/ffmpeg` on PATH. Pass absolute paths |
| "generate a new sound" | first earshot's bank (`sfx_list` / `sfx_render`, 252 sounds made in code, MIT), else a voice in `scripts/music/synth.mjs`. Generated sounds are listened to with earshot like any other |

Python for every earshot or real-sound script: `G:/dev-tools/earshot/.venv/Scripts/python.exe`, run with `-I`.
ffmpeg/ffprobe: `G:/dev-tools/ffmpeg/` (copied from Remotion's compositor; put it on PATH for earshot).

## Files

- `marketing/remotion/sfx/<id>/downloads/` downloaded candidates (`ov-<openverse id>_<slug>.<ext>`). **Never commit
  or publish raw downloads**; check `.gitignore` covers `sfx/*/downloads/` before the first download.
- `marketing/remotion/sfx/<id>/MANIFEST.md` one row per candidate: openverse id, landing page, creator, licence as
  read on the page, duration, earshot verdicts, kept/rejected + why.
- `marketing/remotion/public/<id>/sfx/<n>-<label>.wav` the chosen, trimmed takes the render uses. `public/` is
  gitignored, so the MANIFEST (source URL + trim start/end) must be enough to rebuild them.
- Credits for CC BY sounds go into the post's description text (`te-posten/<nn>-<id>/`), in the creator's requested form.

## Step 1: find the moments

Read `src/videos/<id>.ts` and `public/<id>/timing.json` and list every candidate moment with a timestamp (s, 3
decimals) and a label: shot cuts, map draws and zooms, the year roller landing, count-up stamps locking, the hook
text, the twist, the CTA fox. Also render or open the current short and run earshot `timeline` on it (with `--cues`
from your list) to hear what the score already does there: the synth whooshes and hits in
`scripts/music/<id>.mjs` count as "already covered" until you replace them.

Only keep moments where a sound adds something. Skip what the voice or the music already carries. Shorts rules from
`project-social-video-learnings`: the hook lives in the first 1-2 s, so the frame-0 sound matters most; no sound may
cover the first spoken word.

## Step 2: search

Per moment: Openverse with short concrete terms ("soft whoosh", "wood knock", "paper flip", "sword unsheathe",
"crowd roar distant"). Download **3 candidates** that are under 2 s (longer only when the moment needs it: an
eruption, a crowd). Allowed licences: CC0, PDM, CC BY. **Forbidden: NC, ND, SA, Sampling+** (it is a commercial
account). Write each into MANIFEST.md with its licence.

## Step 3: listen and pick

Per candidate, with earshot:
- `rank "<what the sound is, not its use>" <folder>` across the three, then `find` for the clean trim (skip trims
  marked head cut / tail cut), `describe` on the trim (does a pop read as a pop?), `measure` (clipping, noise floor,
  long silent tail), `realness` on the trim (reject "likely code-synthesized" stock that sounds cheap).
- `ab` the top two with the query.

Pick one per moment. If none of the three holds up, **make one** (earshot bank `sfx_render`, tuned with
`--dur/--apex/--pitch`, or synth.mjs) and run it through the same checks. Never keep a weak sound just to avoid making
one. Taste is not measured: when two are close, give the user both with the numbers.

## Step 4: place and mix

- Placement in Remotion: add an `sfx?: { at: number; src: string; volume?: number }[]` to the video config (seconds,
  from timing.json) and render each as `<Sequence from={f(at)}><Audio src={staticFile(src)} volume={v} /></Sequence>`
  in `ThirtySeconds.tsx`. Taps/knocks lead the frame by their onset, whoosh peaks land on the cut (earshot `kit`
  lock gives onset/peak).
- When a real sound replaces a synth one, remove that line from `scripts/music/<id>.mjs` and re-run `npm run music -- <id>`.
- **Voice wins, always.** Effects sit under the voice; while Onyx speaks keep them ≥ 6 dB under the voice (measure).
- Vary the sounds: never the same file for every pop.
- Two moments less than 0.5 s apart: keep only the stronger.
- A moment that turns out not to need a sound stays empty. Less is better than cluttered: about 5 effects per 10 s
  is the ceiling, not the goal.

## Step 5: check the work

`npm run render -- <id>`, then earshot on the finished mp4: `timeline --cues <cues.json>` (every kept cue landed
within a frame, nothing on the wrong frame), `sheet` (open the PNG), `measure` (integrated around -14 LUFS, true
peak ≤ -1 dBTP), and check no effect overlaps a spoken word at a louder level. Fix and re-check. `npm run typecheck`.

## Step 6: report

1. The final render path.
2. A table: timestamp · what it is for · source (Openverse id + creator, or earshot bank id / synth) · licence ·
   earshot evidence.
3. The moments skipped, and why.
4. The CC BY credit lines for the post description (empty if all CC0).

Then the owner listens. Nothing is "good" until they have heard it.
