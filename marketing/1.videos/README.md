# Video's (16:9, lang)

Eerste: `2.gepost/01-napoleon/` (5:20, 2026-11-16). Tweede: `1.te-posten/02-saladin/` (10:31, 2026-11-17).

## Mappen

```
1.videos/
  kanaal/                  banner (kanaal-banner.png) + kanaaltekst (kanaal.md)
  1.te-posten/<nn>-<id>/   één map per persoon (sinds 26 nov)
    1.video/               de lange video
      upload/              alleen wat je uploadt: <id>.mp4, thumbnail.png (YouTube), omslag-reel.png (Instagram), post.md
      werk/                script.md, zinnen.json, stem/, renders/
    2.short/               de What-if-short (9:16), plat: mp4's, omslag.png, youtube.md, posten.json, trials/
  2.gepost/<nn>-<id>/      zodra alles van die persoon live is: hele map hierheen (mv, nooit rm) + stats.md
  2.gepost/yt-shorts/      de What-ifs van 23-25 nov (Mehmed t/m Stalin), allemaal live
```

**Opruimen hoort bij het posten.** In `1.te-posten/` staat alleen wat nog moet. Oudere mappen in `2.gepost/`
(01 t/m 09) hebben nog de oude indeling.

Vervallen (wordt niet meer gepost): `../9.archief/what-if-shorts/3.vervallen/` (Caesar-trailer).

## Stand 26 nov

| Map | Wat | Status |
|---|---|---|
| `1.te-posten/05-baibars` | lang #05 | alleen script en scènes, nog geen stem; later |
| `1.te-posten/10-ataturk` | lang #10 + short | ingepland vr 27 nov (lang 16:00, short 17:00); na livegang: short linken, reacties, map naar `2.gepost/` |
| `1.te-posten/12-baldwin` | short (+ trials A/B/C) | za 28 nov 17:00; eerste trial-reel-pilot op IG |
| `2.gepost/04-leonidas` | lang #04 + short | live 26 nov |

## Vast format (eigenaar + maat, 2026-11-16)

- **Teaser vooraf (~12-15 s)**, los gemaakt, niet uit de video geknipt. ⚠️ Sinds 26 nov géén knal + chaos meer aan het begin
  (eigenaar): eerst de hook-audit met de skills `viral-hooks` + `short-form-video`, zie skill `youtube-long-video`. Was: knal (kanonschot) + "What if you were <naam>?",
  dan 3 snelle klappen uit het leven in de "you"-vorm ("You'd…"), eindigend met een vraag ("So how does … get there?"),
  dan de titelkaart. Stem iets energieker (speech_rate 0). Daarna begint het verhaal.
- **Thumbnail**: gesplitst met schuine knip, links het begin ("AGE 9"), rechts de top ("EMPEROR"), dikke labels.
- **Muziek per hoofdstuk** (eigenaar koos stijl A "orkestraal"): ElevenLabs Music v2.5 via Higgsfield, instrumentaal,
  één stuk per hoofdstuk met de sfeer van dat hoofdstuk (teaser = timpani/brass-knal), elk genormaliseerd op −18 LUFS,
  in `public/lokaal/<id>-muziek/hN.mp3`; volume 0,2 onder het verhaal (~13 dB onder de stem), 0,42 in de teaser,
  1,5 s overlap tussen hoofdstukken. ~50 credits per 5 min. Prompts: zie de sessie van 2026-11-16 / `werk/muziek/`.

## Werkwijze, in deze volgorde

1. **Script** `script.md`: `## Hoofdstuk` + één zin per regel, ~750 woorden voor 5 min, feitentabel onderaan.
   Basis = het app-verhaal (8 hoofdstukken). Derde persoon, geen "you".
2. **Stem** Dylan via Higgsfield (`seed_audio`, voice `b847bc29-f184-583a-8ad9-d1f1e16d1a60`,
   `speech_rate: -10`), **per hoofdstuk** (per zin loopt tegen de limiet van ~10 tegelijk aan), max 5 tegelijk.
   ~15 credits per 5 min. Downloaden als `werk/stem/dylan/h0.mp3`, `h1.mp3`, ...
3. **Lange stiltes inkorten** (Seed Audio zet er soms 7 s stilte in): zie het numpy-stukje in de sessie van
   2026-11-16; alles boven 0,8 s → 0,6 s, naar `werk/stem/dylan-kort/`.
4. **Timing**: `node marketing/remotion/scripts/vo-hoofdstukken.mjs <map> zinnen.json` → `voice.mp3` +
   `timing.json` (zinsgrenzen gekozen op stiltes + verwachte zinslengte).
5. **Beeld**: `marketing/remotion/src/lang/`: `Kaarttafel.tsx` (3D-Europa, rijk groeit/krimpt), `LangHud.tsx`
   (jaartal-label, teller, ondertitels), `LangDecor.tsx` (zeilschip, driekleur, route, kaders, afsluiter),
   één shot per zin (`SHOTS` met `zin` + optioneel `na`). Check: render `--scale=0.5`, één frame per shot.
6. **Geluid**: per shot sfeer + accenten, whoosh op elke knip; daarna loudnorm 2 doorgangen naar −14 LUFS.
7. **Thumbnail** `lang-<id>-thumb` (1920×1080) en `post.md` (titel, beschrijving met hoofdstukken).
7b. **Vertaalde titel + beschrijving** (YouTube Studio → Talen): Arabisch, Perzisch, Hindi, Urdu, Maleis, Turks,
   gekozen op onze kijkers. Teksten in `kanaal/vertalingen.py` (nieuwe video erbij, `python -X utf8 vertalingen.py`).
   Gedaan voor Napoleon, Saladin en Caesar op 2026-11-19. Automatisch dubben bestaat nog niet voor dit kanaal.
8. **Renderen altijd met `--gl=angle`** (videokaart): zonder schiet een video van 10 minuten in 40 minuten nauwelijks op
   (SwiftShader op de processor), met angle duurt het ~13 minuten. Testframes per shot: `node scripts/stills.mjs`.

Stijl: de 3D-blokstijl van de What-if-shorts. Geen platte 2D-wereldkaart (eigenaar).
