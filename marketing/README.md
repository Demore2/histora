# Marketing

| Map | Wat erin staat |
|---|---|
| `1.videos/` | **De video's** (16:9, 8-12 min) voor YouTube en Instagram. `1.te-posten/` = klaar om te posten, `2.gepost/` = staat online, plus `kanaal/` (banner, kanaaltekst). Skill `youtube-long-video`. |
| `2.stats/` | Stats-metingen over alle platforms (`stats-<datum>.md`). Skill `social-stats`. Per video staat er ook een `stats.md` in zijn `2.gepost/`-map. |
| `3.profielen/` | Bio's en profielbeelden voor Instagram, TikTok (gestopt) en YouTube. |
| `referenties/` | Voorbeeldvideo's, stemmen en muziek als referentie (inhoud niet in git). |
| `remotion/` | De code waarmee alle video's gemaakt worden (Remotion + three.js). |
| `9.archief/` | Niet meer in gebruik: de What-if-shorts (`what-if-shorts/`, gestopt 2026-11-18: we maken alleen nog lange video's), de oude "30 seconds of history"-shorts (offline sinds 2026-11-17), de explainer en oude social-mappen. |

## Posten

Elke videomap heeft een **`upload/`** met precies wat je uploadt: de mp4, de thumbnail of omslag, en `post.md`
met titel, tekst, hashtags en tijdstip per platform. Daarnaast staat `werk/` (of `extra/`) met het
werkmateriaal. Na het posten verplaats je de map van `1.te-posten/` naar `2.gepost/`.

Sinds 2026-11-18 (eigenaar): **alleen nog lange video's, geen shorts meer** (ook niet op YouTube Shorts). Elke video krijgt
`thumbnail.png` (breed, YouTube) en `omslag-reel.png` (1080x1920, gestapeld, Instagram: upload hem als omslag via "filmrol"; woorden en gezichten staan binnen het 3:4-midden, y 240-1680, want dat toont het profielraster).
Tussen twee posts op hetzelfde platform zit minstens 24 uur.

Ritme vanaf december (eigenaar, 2026-11-17): **3 lange video's per week, di/do/zo**, ondergrens 2. Tijdstip in test:
Saladin-IG (wo 18 nov), Caesar (do 19) en Leonidas (do 26) gaan om **06:00 NL** (het tijdslot van de hits van Born in Lore), te
vergelijken met Napoleon/Saladin om 16:00 op het eerste etmaal. De winnaar wordt de vaste tijd. Muziek komt uit een
vaste bibliotheek van ~10 sferen (eenmalig ~120 credits); per video kost dan alleen de stem nog ~55 credits (Higgsfield, 1.200/maand).

mp4, mp3 en wav en de testframes staan bewust niet in git (`.gitignore`).

## Een What-if-short op YouTube + Instagram (sinds 2026-11-24)

> **TikTok is gestopt (eigenaar, 2026-11-26)**: elke video bleef hangen op ~600 views, 60-86% NL/BE, nul volgers.
> De TikTok-route en -trucs staan in de git-geschiedenis (commit 6109847) als we ooit terugkomen.

Elke short gaat in één keer naar **YouTube (19:00, 14 vaste talen) + Instagram (17:00)**. Alleen YouTube gaat om 19:00.

**Stap 1, lokaal (kost geen credits):**

```bash
node marketing/posten-klaar.mjs marketing/1.videos/1.te-posten/<nn>-<id>-short
```

Dat controleert de lengte (max 58 s), maakt `*-upload.mp4` van < 10 MB (de browser-uploadgrens), leest `youtube.md`
en schrijft **`posten.json`**: per platform het bestand, de caption, de reactie en de audio-instructie, met absolute
paden. `--check` = alleen kijken.

**Stap 2, in Chrome (Claude):** lees alleen `posten.json`, niet de hele map. Vaste route per platform:

| Platform | Route |
|---|---|
| YouTube | Studio, `bestanden.youtube` (nummer ingebakken), titel/beschrijving/gerelateerde video, inplannen 19:00, daarna Talen |
| Instagram | Meta Business Suite, `bestanden.instagram` + omslag, audio = bovenste gewone "Amour plastique", 17:00 |

YouTube-trucs (Studio, NL-interface; getest 2026-11-24 bij Stalin):
- **Upload**: klik het upload-icoon rechtsboven, dan bestaat er een verborgen `file-input` in het dialoog → `file_upload`.
  Omslag: de tweede `file-input` (onder "Thumbnail") → `omslag.png`.
- **Titel/beschrijving**: typ de titel, klik dan op de kop "Details" om het hashtag-menu te sluiten, en pas daarna in
  de beschrijving. Klik je meteen door, dan landt de klik in het hashtag-menu en komt alles in de titel. **Nooit Escape**,
  dat sluit het uploadvenster.
- **Gerelateerde video** zit niet bij Details maar in de stap **Video-elementen** → "Gerelateerde video" → Toevoegen.
- AI-gebruik **Nee**, betaalde promotie **Nee**. De check meldt "geclaimde content, geblokkeerd in Rusland": dat is
  het nummer, en dat is in orde.
- **Talen** (`studio.youtube.com/video/<id>/translations`): `posten.json → youtube.talen` heeft per taal `studio`
  (de naam in het menu), titel en beschrijving. Per taal, alles in één `browser_batch`:
  klik "Taal toevoegen" (818,205) → JS `[...document.querySelectorAll('tp-yt-paper-item')].find(e=>e.offsetParent&&e.textContent.trim()==='<studio>').click()`
  → klik titelveld (330,345) → typ → klik de kop (220,303) → klik beschrijving (330,450) → typ → klik de kop → "Publiceren" (703,265).
  Drie of vier talen per batch. **Staat de taal al als rij** (Frans heeft vaak automatische ondertiteling): klik de
  `button "Frans"` in de tabel; het dialoog staat dan 20 px hoger (330,325 / 330,430 / 220,283 / 703,245).
- **Reactie + vastzetten**: op de Shorts-pagina → reactie-icoon → typen → Reageren → ⋮ → Vastzetten → bevestigen.

Instagram-trucs (Meta Business Suite → `business.facebook.com/latest/reels_composer`):
- **Er bestaat geen file-input tot je klikt**, en klikken opent een onzichtbaar systeemvenster. Vang hem af in één
  `javascript_tool`-aanroep en upload daarna met `file_upload` op de gevonden `file-input`:
  ```js
  const o=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==='file'){window.__fi=this;
  if(!this.isConnected)document.body.appendChild(this);return}return o.call(this)};
  [...document.querySelectorAll('[role=button]')].find(b=>b.textContent.trim()==='Add Video').click();
  ```
  Omslag: tab "Upload image", dan dezelfde haak op de link "Upload image" (`window.__fi=null` vooraf) → `omslag.png`.
- Next → Edit → Audio: zoek "amour plastique" → bovenste gewone → Next → Share now / Schedule.
- **Reacties**: de webversie kan niet vastzetten, en de antwoordknop is via JS niet te raken. Plaats een losse reactie
  met `@gebruiker` ervoor. **Hooguit twee reacties kort na elkaar**: daarna geeft Instagram "Kan opmerking niet
  plaatsen" (en de MBS-inbox "Reply failed"). Blijf dan van het account af en probeer het later.

Reacties scannen op verzoeken (bijv. "wie willen ze hierna"):
- **YouTube**: `studio.youtube.com/channel/UC4zE-VpdoGv7uXAtLSF6sWw/comments/inbox?filter=%5B%7B%22name%22%3A%22SORT_BY%22%2C%22value%22%3A%22SORT_BY_NEWEST%22%7D%5D`
  → `get_page_text`. De zoekfilter in de URL werkt niet. Antwoorden: zoek de `ytcp-comment` met JS, klik zijn
  "Beantwoorden", focus `[contenteditable=true]` en typ. **Typ het `@handle` zelf**, Studio vult het niet aan.
- **Instagram**: per reel `document.querySelector('main').innerText` (reel-links op `instagram.com/gethistora/reels/`).
  De MBS-inbox (`latest/inbox/instagram`) toont de reacties per post handig, maar antwoorden faalt daar.
- Vaste lijnen van de eigenaar: verzoeken om **Mohammed** negeren. Antwoord op een verzoek = "Noted! <naam> is on the
  list …" plus "follow so you don't miss it (long videos are on the way too)". Een eigen reactie onder een nieuwe
  video krijgt geen tag; de aanvrager krijgt een antwoord onder zijn eigen verzoek.
