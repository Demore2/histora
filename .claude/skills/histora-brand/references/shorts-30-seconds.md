# "30 seconds of history" — format spec

A recurring vertical short (TikTok, Reels, YouTube Shorts). One true story, told so well in
thirty seconds that the viewer wants the rest — which is in the app.

## Structure

| Time | Beat | What it does |
|---|---|---|
| 0–3 s | **Hook** | One surprising, true sentence. ≤ 12 words. Lands before the viewer can swipe. |
| 3–10 s | **Setup** | Who, where, when — only as much as the turn needs. |
| 10–22 s | **Build + turn** | The story moves; one unexpected twist the hook promised. |
| 22–27 s | **Payoff** | The line people repeat in the comments. Often loops back to the hook. |
| 27–33 s | **Close** | Spoken: "That's thirty seconds of history." then "The full story is in Histora. Follow for more." End card with the fox. |

- **75–85 spoken words** for the story itself, not counting the call to action. Under 70 sounds
  rushed-empty, over 90 doesn't fit.
- **The call to action is spoken, not only shown** (owner, 2026-10-29): viewers who aren't looking at
  the screen otherwise miss it. It is one fixed recording, "The full story is in Histora. Link in
  bio.", appended after "That's thirty seconds of history." — the story does not end on an ad. Since 2026-11-03 it ends on **"Follow for more."**, not "Link in bio." (owner and Mike: the line felt weak, and naming Histora already does the promoting; a follow is the action that helps the account).
- **One throughline.** If a fact doesn't serve the turn, cut it, however good it is.
- **Hook rules:** a statement, not "Did you know…?"; no clickbait the clip doesn't pay off;
  name the figure in the first 5 seconds (search + clarity).
- The payoff should make a good on-screen caption on its own.

## Visual grammar

- **9:16, 1080×1920.** The app's scenes are 16:9: place them full-height with a slow Ken Burns
  pan across the width (the subject is usually centred), or over a blurred copy of themselves.
- **Opening title card** (0–1.5 s, over the first scene): "30 SECONDS OF HISTORY" small, in
  orange `#EE7A3E` on dark; the figure's name large below it.
- **Burned-in captions**, 2–5 words per card, key word in orange. Keep inside the middle third
  (platform UI covers the bottom ~20% and the right edge).
- **Year stamp** in a corner when the date changes ("73 BC") — mirrors the app's
  "year in the margin" block.
- **End card** (last 2–3 s): parchment `#F7F1E4` background, the waving fox
  (`assets/images/vos/zwaaiend.png`), "The full story is in Histora", app icon. No counts.
- One scene per ~4–6 seconds; a cut on every beat change.

## Audio

- Voice-over: **Alistair** (owner's choice, 2026-11-03: "sounds like a historian", calm). Higgsfield `text2speech_v2`, `variant: elevenlabs`, voice_id `d9d5c263-f84e-4752-97b5-3750fcc6fd2f` (preset), 1.5 credits per take. One take per video plus the shared CTA recording. Not Benji (too weak). Built in `marketing/remotion/` at `voiceTempo` 1.1 by default, so videos land around 35-40 s.
  Pauses written as `—` or `[beat]` in the script are real pauses (~0.4 s).
- Music: low, cinematic, no lyrics, ducked under the VO; a soft hit on the turn.
- Voice and music can be generated with Higgsfield (the owner's subscription).

## Script template

```markdown
# 30 seconds of history: <Figure / event>

**Story in the app:** `<story-id>` · **Era:** <era> · **Spoken words:** <n>

## Hook
<one line, also the on-screen title>

## Script
| Time | Voice-over | On screen | Visual |
|---|---|---|---|
| 0–3 s | … | … | `assets/images/scenes/<id>-<n>.webp` … |
| … | … | … | … |
| 27–30 s | That's thirty seconds of history. | The full story is in Histora | End card: waving fox |
| 30–33 s | *(shared CTA recording)* The full story is in Histora. Follow for more. | The full story is in Histora | End card |

## Voice-over (clean, for TTS)
<the spoken text only, one paragraph>

## Caption
<1–2 sentences, ends with "Full story in Histora.">
#history #<topic> #<era> #30secondsofhistory #histora

## Fact notes
- <claim> — <source>
```
