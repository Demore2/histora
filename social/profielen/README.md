# Histora: social profiles

Alles wat je nodig hebt om de accounts op Instagram, TikTok en YouTube in te richten. De
uitleg is Nederlands, de tekst die je in de apps plakt is Engels (merkregel: niets publieks mag
Nederlands lezen).

| Bestand | Wat erin staat |
|---|---|
| [instagram.md](instagram.md) | naam, bio, link, categorie, highlights, stap voor stap |
| [tiktok.md](tiktok.md) | naam, bio, link (en wat als die nog op slot zit), instellingen |
| [youtube.md](youtube.md) | kanaalnaam, About, banner, watermerk, trailer, instellingen |
| `beelden/` | alle afbeeldingen, klaar om te uploaden |
| `sjablonen/` + `render.mjs` | de bron van die afbeeldingen (zie onder) |

De short-scripts staan in `marketing/shorts/` en worden in een ander gesprek gemaakt; hier staat
alleen het profiel.

## Eerst: één handle overal

Gebruik op alle drie de platforms **dezelfde** @handle. Wie je op TikTok ziet en je op YouTube
zoekt, typt wat er is blijven hangen.

**De handle is `@gethistora`** (besloten 2026-10-29). Op YouTube waren `@histora`, `@historaapp`
en `@histora.app` al bezet; het kanaal stond eerst op `@Histora29` en is omgezet. Is
`@gethistora` op Instagram of TikTok onverhoopt bezet, kies dan daar iets dat er zo dicht
mogelijk bij ligt (`@get.histora`) en nooit cijfers.

| Platform | Profiel |
|---|---|
| YouTube | https://www.youtube.com/@gethistora |
| Instagram | https://www.instagram.com/gethistora |
| TikTok | https://www.tiktok.com/@gethistora |

## De link (Play Store met UTM)

Elke bio krijgt zijn eigen link, zodat je in de Play Console ziet welk platform installaties
oplevert. De `referrer`-waarde is URL-gecodeerd (`%3D` = `=`, `%26` = `&`); plak hem precies zo.

| Platform | Link |
|---|---|
| Instagram | `https://play.google.com/store/apps/details?id=com.chronicles.historyapp&referrer=utm_source%3Dinstagram%26utm_medium%3Dbio` |
| TikTok | `https://play.google.com/store/apps/details?id=com.chronicles.historyapp&referrer=utm_source%3Dtiktok%26utm_medium%3Dbio` |
| YouTube | `https://play.google.com/store/apps/details?id=com.chronicles.historyapp&referrer=utm_source%3Dyoutube%26utm_medium%3Dbio` |

- `com.chronicles.historyapp` is de echte package-naam (staat in `app.json`); het is de
  Play-identiteit en kan niet anders. **Maar Instagram (en mogelijk TikTok) tonen de URL als
  tekst op het profiel**, en dan staat "chronicles" publiek in beeld. Daarom gaat er een korte
  link in het profiel die naar deze lange link doorstuurt, per platform een eigen:
  `bit.ly/gethistora-ig`, `bit.ly/gethistora-tt`, `bit.ly/gethistora-yt` (aanmaken op bitly.com,
  uitleg in [instagram.md](instagram.md)). De UTM-code blijft werken.
- De Play Console toont UTM-verkeer onder *Statistieken → Acquisitie van winkelvermelding* (de naam
  kan iets verschillen). Wil je daar later ook per campagne kunnen splitsen, plak er dan
  `%26utm_campaign%3Dprofile` achter. Voor nu is source + medium genoeg.
- Test elke link één keer op je telefoon: hij moet de Histora-pagina in de Play Store openen.

## Profielfoto: overal dezelfde

**`beelden/profielfoto.png`**, een kopie van het app-icoon (`assets/images/app-icon.png`,
1024×1024). Niets aan bijsnijden of aanpassen:

- Alle drie de platforms knippen hem rond. Dan vallen de puntjes van de oren weg, maar ogen,
  bril, glimlach en sjaal blijven staan. Zie `beelden/controle-profielfoto-cirkel.png`: ook op
  24 px (naast een reactie) is het nog de vos.
- Het is precies wat mensen op hun telefoon zien als ze de app installeren. Dezelfde cirkel op
  TikTok en op hun startscherm is herkenning die je gratis krijgt.
- 1024 px en 450 KB zitten boven het minimum en onder het maximum van alle drie.

Een versie met hele oren zou betekenen dat de vos kleiner in de cirkel staat, en op 24 px is
"groter gezicht" belangrijker dan "hele oren".

## Afbeeldingen opnieuw maken

Gemaakt met headless Chrome uit de HTML in `sjablonen/`, met bestaande beelden uit de app.
**Er is niets met Higgsfield gegenereerd en het kostte niets.** Wil je iets veranderen (een
andere scène in de banner, een andere vos op een cover), pas dan de HTML aan en draai:

```bash
node social/profielen/render.mjs
```

De twee `controle-*.png` zijn alleen om te kijken (de cirkeluitsnede en de veilige zone van de
banner); upload die niet.

Moet er ooit een vos komen die er nog niet is (bijvoorbeeld een vos met een telefoon voor de
cover "The app"), dan kost dat met het recept uit de app 1,5 credit per beeld. Dat is nu niet
nodig: de bestaande houdingen dekken alle vijf de covers.

## Volgorde van werken

1. Handle kiezen en op alle drie claimen (ook als je één platform pas later gebruikt).
2. Per platform het bestand van boven naar beneden doorlopen.
3. Elke link testen op je telefoon.
4. Zodra de eerste shorts online staan: pinnen (Instagram, TikTok) en trailer zetten (YouTube);
   dat staat per platform onder "Later".
