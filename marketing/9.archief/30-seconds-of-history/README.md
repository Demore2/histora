# 30 seconds of history

Eén map per video. Zodra een video op alle platforms staat, verhuist zijn map van `te-posten/` naar
`gepost/` en krijgt hij het volgende nummer in **postvolgorde**.

```
te-posten/<nn>-<id>/   script.md (+ renders/ zodra gemonteerd, post.md zodra de captions klaar zijn)
gepost/<nn>-<id>/      script.md · post.md (captions en instellingen per platform) · stats.md · renders/
```

Sinds 05 worden de video's in code gemaakt: `marketing/remotion/` (zie de README daar).

`renders/` (mp4 + omslag-png) staat in `.gitignore` (`marketing/**/renders/`). Merkregels: skill `histora-brand`.

## Status

| # | Video | Live | Map |
|---|---|---|---|
| 01 | Tutankhamun | 2026-10-29 19:00 | `gepost/01-tutankhamun` |
| 02 | Julius Caesar | 2026-10-30 21:00 · v2 op IG 2026-11-01 | `gepost/02-julius-caesar` |
| 03 | Pompeii | 2026-10-31 21:00 | `gepost/03-pompeii` |
| 04 | Adolf Hitler | 2026-11-02 20:00 | `gepost/04-adolf-hitler` |
| 05 | Spartacus | 2026-11-03 20:00 | `gepost/05-spartacus` |
| 06 | Alexander the Great | 2026-11-04 20:00 (gepland) | `te-posten/06-alexander-the-great` |
| 07 | Mansa Musa | 2026-11-06 20:00 (gepland) | `te-posten/07-mansa-musa` |
| 08 | Napoleon Bonaparte | 2026-11-08 20:00 (gepland) | `te-posten/08-napoleon-bonaparte` |
| 09 | Cleopatra | 2026-11-09 20:00 (gepland) | `te-posten/09-cleopatra` |

Vast schema sinds 2026-11-04: **maandag, woensdag, vrijdag en zondag om 20:00** (NL-tijd), op alle drie tegelijk.

## Checklist vóór het renderen (uit de stats van 01-03)

1. Geen fade-in: frame 1 is volledig beeld.
2. Open op het meest verrassende bewegende beeld, met de claim als grote tekst in frame 1. Geen titelkaart.
3. De stem begint met de schok, niet met een raadsel.
4. Muziek en effecten blijven erin (dreun op de hook, harde stilte op de dramatische zin). De openingsklap met een aanzet van ~30 ms en zonder ruisklik: anders hoor je op een telefoon alleen een tik.
5. CTA max 2 s over het laatste beeld, geen beige eindkaart, totaal ≤ 30 s — langer mag als er een twist aan het eind zit (Pompeii: 34 s, 19% uitgekeken).
6. Een vraag in de video zelf als je reacties wilt.
7. De hook laat een vraag open — het sterkst als dramatische ironie (Pompeii: "didn't know they lived next to a volcano", 91/63/19% op IG): geef het antwoord niet in dezelfde zin (Hitler: likes-piek én afhaken op 0:01). Bijv. "He never won a majority. So who handed him power?", antwoord pas halverwege.
8. Vaste omslag met `cover.mjs` (zelfde indeling op elk profiel), en check per platform of de caption bij de video hoort.
