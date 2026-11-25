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

Elke short gaat in één keer naar **YouTube (19:00, 14 vaste talen) + Instagram (17:00) + TikTok (17:00, ingepland)**. Alleen YouTube gaat om 19:00.

**Stap 1, lokaal (kost geen credits):**

```bash
node marketing/posten-klaar.mjs marketing/1.videos/1.te-posten/<nn>-<id>-short
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
| TikTok | Studio upload → file-input → caption plakken → omslag → Sounds → Favorites → **01:00 "Amour plastique"** → Schedule **17:00** |

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
- **Reactie plaatsen** (vastzetten is niet nodig, eigenaar 2026-11-24): open de videopagina en draai in één
  `javascript_tool`-aanroep:
  ```js
  const w=ms=>new Promise(r=>setTimeout(r,ms));document.querySelector('[data-e2e=comment-icon]').click();await w(2500);
  const box=document.querySelector('[data-e2e=comment-text] [contenteditable=true]');box.focus();const dt=new DataTransfer();
  dt.setData('text/plain','<reactie uit posten.json>');box.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));
  await w(800);document.querySelector('[data-e2e=comment-post]').click();
  ```
  Typen met de muis/toetsen komt niet aan (en een losse "L" liket de video). Een ingeplande video kan pas een reactie
  krijgen als hij live is. De video-URL's staan als links op tiktok.com/tiktokstudio/content.

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
- **TikTok**: `tiktok.com/tiktokstudio/comment` → `get_page_text`.
- **Instagram**: per reel `document.querySelector('main').innerText` (reel-links op `instagram.com/gethistora/reels/`).
  De MBS-inbox (`latest/inbox/instagram`) toont de reacties per post handig, maar antwoorden faalt daar.
- Vaste lijnen van de eigenaar: verzoeken om **Mohammed** negeren. Antwoord op een verzoek = "Noted! <naam> is on the
  list …" plus "follow so you don't miss it (long videos are on the way too)". Een eigen reactie onder een nieuwe
  video krijgt geen tag; de aanvrager krijgt een antwoord onder zijn eigen verzoek.
