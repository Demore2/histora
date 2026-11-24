# Marketing

| Map | Wat erin staat |
|---|---|
| `1.videos/` | **De video's** (16:9, 8-12 min) voor YouTube, TikTok en Instagram. `1.te-posten/` = klaar om te posten, `2.gepost/` = staat online, plus `kanaal/` (banner, kanaaltekst). Skill `youtube-long-video`. |
| `2.stats/` | Stats-metingen over alle platforms (`stats-<datum>.md`). Skill `social-stats`. Per video staat er ook een `stats.md` in zijn `2.gepost/`-map. |
| `3.profielen/` | Bio's en profielbeelden voor Instagram, TikTok en YouTube. |
| `referenties/` | Voorbeeldvideo's, stemmen en muziek als referentie (inhoud niet in git). |
| `remotion/` | De code waarmee alle video's gemaakt worden (Remotion + three.js). |
| `9.archief/` | Niet meer in gebruik: de What-if-shorts (`what-if-shorts/`, gestopt 2026-11-18: we maken alleen nog lange video's), de oude "30 seconds of history"-shorts (offline sinds 2026-11-17), de explainer en oude social-mappen. |

## Posten

Elke videomap heeft een **`upload/`** met precies wat je uploadt: de mp4, de thumbnail of omslag, en `post.md`
met titel, tekst, hashtags en tijdstip per platform. Daarnaast staat `werk/` (of `extra/`) met het
werkmateriaal. Na het posten verplaats je de map van `1.te-posten/` naar `2.gepost/`.

Sinds 2026-11-18 (eigenaar): **alleen nog lange video's, geen shorts meer** (ook niet op YouTube Shorts). Elke video krijgt
`thumbnail.png` (breed, YouTube) en `omslag-reel.png` (1080x1920, gestapeld, Instagram/TikTok: upload hem als omslag via "filmrol"; woorden en gezichten staan binnen het 3:4-midden, y 240-1680, want dat toont het profielraster).
Tussen twee posts op hetzelfde platform zit minstens 24 uur.

Ritme vanaf december (eigenaar, 2026-11-17): **3 lange video's per week, di/do/zo**, ondergrens 2. Tijdstip in test:
Saladin-IG (wo 18 nov), Caesar (do 19) en Leonidas (do 26) gaan om **06:00 NL** (het tijdslot van de hits van Born in Lore), te
vergelijken met Napoleon/Saladin om 16:00 op het eerste etmaal. De winnaar wordt de vaste tijd. Muziek komt uit een
vaste bibliotheek van ~10 sferen (eenmalig ~120 credits); per video kost dan alleen de stem nog ~55 credits (Higgsfield, 1.200/maand).

mp4, mp3 en wav en de testframes staan bewust niet in git (`.gitignore`).

## Een What-if-short op alle drie de platformen (sinds 2026-11-24)

Elke short gaat in één keer naar **YouTube (19:00, 14 vaste talen) + Instagram (17:00) + TikTok (19:00, ingepland)**.

**Stap 1, lokaal (kost geen credits):**

```bash
node marketing/posten-klaar.mjs marketing/1.videos/1.te-posten/yt-shorts/<map>
```

Dat controleert de lengte (max 58 s), maakt `*-upload.mp4` van < 10 MB (de browser-uploadgrens), leest `youtube.md`
en schrijft **`posten.json`**: per platform het bestand, de caption, de reactie en de audio-instructie, met absolute
paden. Staat er geen `## TikTok`-sectie in `youtube.md`, dan bouwt het script de caption uit de titel + beschrijving
(zonder `#shorts` en zonder "on the channel", 3 eigen tags + `#history #historytok`). `--check` = alleen kijken.

**Stap 2, in Chrome (Claude):** lees alleen `posten.json`, niet de hele map. Vaste route per platform:

| Platform | Route |
|---|---|
| YouTube | Studio, `bestanden.youtube` (nummer ingebakken), titel/beschrijving/gerelateerde video, inplannen 19:00, daarna Talen |
| Instagram | Meta Business Suite, `bestanden.instagram` + omslag, audio = bovenste gewone "Amour plastique", 17:00 |
| TikTok | Studio upload → file-input → caption plakken → omslag → Sounds → Favorites → **01:00 "Amour plastique"** → Schedule 19:00 |

TikTok-trucs die tijd (en dus credits) schelen:
- **Caption**: `ClipboardEvent('paste')` met een `DataTransfer` op `.public-DraftEditor-content`. Nooit
  `execCommand('insertParagraph')`, dat laat de editor crashen. TikTok zet de bestandsnaam vóór de geplakte tekst: klik
  in het veld, `ctrl+Home`, en `Delete` × de lengte van de bestandsnaam (zonder `.mp4`).
- **Omslag**: de file-input "Upload cover" bestaat al zodra het venster "Edit cover" open is; niet op de knop klikken.
- **Geluid**: het 1:00-fragment loopt bij een short ≤ 58 s vanzelf tot het einde. Langere video (Baibars 1:20): fade-out 3 s.
- **Inplannen**: de tijdkiezer reageert slecht op scrollen; klik de uren/minuten aan (elke klik op een zichtbare
  waarde centreert die). Loopt "Content check lite" nog, dan vraagt TikTok "Post now": klik Cancel, zet de schakelaar "Content check lite"
  uit en klik opnieuw op Schedule (de controle bleef bij Willem langer dan 5 min hangen).
- **AI-label uit** (standaard uit; code-gemaakte 3D, geen realistische AI).
- **Reactie vastzetten kan op TikTok alleen in de telefoon-app**; web en Studio bieden alleen Reply/Delete.
