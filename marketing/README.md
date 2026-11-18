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
`thumbnail.png` (breed, YouTube) en `omslag-3x4.png` (gestapeld, Instagram/TikTok; staat ook in de eerste 3 frames van de mp4).
Tussen twee posts op hetzelfde platform zit minstens 24 uur.

Ritme vanaf december (eigenaar, 2026-11-17): **3 lange video's per week, di/do/zo**, ondergrens 2. Tijdstip in test:
Saladin-IG (wo 18 nov), Caesar (do 19) en Leonidas (do 26) gaan om **06:00 NL** (het tijdslot van de hits van Born in Lore), te
vergelijken met Napoleon/Saladin om 16:00 op het eerste etmaal. De winnaar wordt de vaste tijd. Muziek komt uit een
vaste bibliotheek van ~10 sferen (eenmalig ~120 credits); per video kost dan alleen de stem nog ~55 credits (Higgsfield, 1.200/maand).

mp4, mp3 en wav en de testframes staan bewust niet in git (`.gitignore`).
