---
name: histora-brand
description: Histora's brand rules — voice, colours, mascot, naming, fact standards and the "30 seconds of history" short-video format. Load before writing or designing anything public for Histora (social posts, TikTok/Reels/Shorts scripts, store copy, release notes, ads, promo images, landing pages, press text), and before generating Histora marketing images or voice-overs.
---

# Histora brand

Histora is a history app that tells real lives and turning points as short, illustrated
stories, one chapter at a time. Public face: **Histora** (store title "Histora: Learn History",
developer "Histora Studio"). It should read as an international English product.

## Hard rules (break one and the piece is wrong)

1. **Public copy is English only.** Nothing may hint that the makers are Dutch: no Dutch
   examples, place names, idioms, "made in NL", Dutch spelling or Dutch-language captions.
2. **No content counts.** Never "40 stories", "6 eras", "300 chapters". Stories are added
   constantly, so numbers go stale. Say "stories from every era", "a new story every week" only if
   true, "real people from every era". Product rules (e.g. a daily limit) are fine.
3. **The mascot has no public name.** Internally it is "Phoxy". In anything public it is "a fox",
   "the fox in glasses", or simply shown. Never write "Phoxy" until the owner announces it.
4. **Facts are checked, and legend is labelled as legend.** History is the product; a wrong date
   in a 30-second clip is a reputation problem. See "Fact standards".
5. **Never promise what the app doesn't do.** No "your choices change the story", no
   "100+ stories", no free trial that doesn't exist, no "no ads" (the free tier has ads).
6. **The brand name is Histora.** Not "Historia", not "Chronicles" (an old internal name that
   survives only in identifiers).

## Voice

A good storyteller at a dinner table, not a textbook and not a hype account.

- **Concrete over grand.** "The paint was still wet when they sealed the tomb" beats "a hastily
  prepared burial". One vivid, true detail does more than three adjectives.
- **Short sentences, active verbs, plain words.** Write for the ear.
- **Curious, warm, a little wry.** Allowed: understatement, a dry punchline. Not allowed:
  "INSANE", "you won't believe", "mind-blowing", "🤯", clickbait that the clip doesn't pay off.
- **Respect the dead.** Massacres, slavery and disasters are told straight, never as a joke or
  as spectacle. No gore close-ups.
- **"You" is fine**, "we" for the brand sparingly. No emoji in story copy; at most one in a
  social caption.

Tagline-level lines that fit: *"History you actually finish."* · *"Real stories, one chapter at
a time."* · *"Finish a story, unlock the figure."*

## Visual identity

| Token | Hex | Use |
|---|---|---|
| Histora orange (accent, light) | `#C9541C` | buttons, highlights, key words in captions on light |
| Histora orange (accent, dark) | `#EE7A3E` | same, on dark backgrounds |
| Fox fur | `#E4682B` | mascot, app icon background — **not** for text on beige (too low contrast) |
| Parchment (background) | `#F7F1E4` | default background |
| Parchment, raised | `#EEE4D0` | cards, panels |
| Ink | `#211F1A` | body text on light |
| Muted ink | `#6B6355` | secondary text |
| Dark brown (dark mode bg) | `#1C1A16` | dark backgrounds — warm brown, never neutral black |
| Scarf blue | `#0EA5E9` | only as the fox's scarf; it is not a UI/brand colour any more |
| Cream | `#FFF1DC` | the fox's muzzle/chest |

- **Look:** warm, flat, beige-and-orange. Light mode is the default face of the brand.
- **Story art:** cinematic historical oil painting for antiquity–early modern; photorealistic
  35mm film still for the industrial and modern eras. Prompt suffix used across the app:
  `Cinematic historical oil painting, museum quality, dramatic natural light, rich earthy palette,
  painterly brushwork, historically accurate detail, no text, no lettering, no watermark.`
- **Existing art to reuse first** (it's already paid for and on-brand):
  `assets/images/scenes/<story-id>-<chapter>.webp` (16:9, one per chapter),
  `assets/images/characters/<story-id>.webp` (portraits), and the fox poses in
  `assets/images/vos/` (`zwaaiend.png` waving, `leraar-wijzend.png` pointing,
  `leraar-juichend.png` cheering, `op-weg.png` travelling, `era-<era>.png` era costumes).
- **The fox:** chubby red fox, round thick dark-brown glasses, sky-blue scarf, flat vector with
  thick soft outlines. No props unless an era costume. Never redraw it off-model.
- Type: clean sans-serif, bold for hooks. Captions sit in the middle third, never under
  platform UI.

## Fact standards

- Check every date, number and quote against a serious source (for antiquity: Plutarch, Arrian,
  Suetonius, Appian, Pliny's letters, or a modern scholarly summary). The story text in
  `src/content/verhalen/**` is a starting point, **not** a source — some older stories carry
  fiction-derived details (e.g. Spartacus "born into slavery", the line "I am not a slave"; these
  are not attested).
- Hedge what historians hedge: "about", "probably", "ancient writers say", "in the most famous
  version". Disputed dates (Pompeii: August or October 79) → don't state the contested day.
- Famous quotes need an attribution style that's honest: "as he later told it", "according to
  Plutarch".
- Every script carries a short **Fact notes** section listing claims and their source, so a
  reviewer can check it in two minutes.

## Format: "30 seconds of history"

Histora's recurring short-video series for TikTok, Instagram Reels and YouTube Shorts. Full spec
and template: [references/shorts-30-seconds.md](references/shorts-30-seconds.md). Finished scripts
live in `marketing/shorts/30-seconds-of-history/` — one folder per video under `te-posten/` or `gepost/`; see its README for the status table and the pre-render checklist.

The essentials:
- **75–85 spoken words** (~30 s at a calm 160 wpm). Count them.
- **Hook in the first line** (≤ 3 s, ≤ 12 words): a surprising true claim, not a question like
  "Did you know…?".
- One story, one throughline, a **turn** (the unexpected twist) and a **payoff** line.
- Fixed open on screen: **"30 SECONDS OF HISTORY"**; fixed spoken close:
  **"That's thirty seconds of history."** followed by the spoken call to action
  **"The full story is in Histora. Follow for more."** (one shared recording, appended to every video).
  End card: the fox + "The full story is in Histora".
- 9:16, burned-in captions, the story's own chapter scenes as visuals.

## Checklist before handing anything over

- [ ] English only, nothing that reads Dutch
- [ ] No content counts; no "Phoxy"
- [ ] Every fact in the Fact notes, legend marked as legend
- [ ] Promises match the live app
- [ ] Colours from the table above; orange text only `#C9541C`/`#EE7A3E`, never fur `#E4682B` on beige
