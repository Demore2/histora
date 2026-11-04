# Histora shorts in Remotion

Het sjabloon voor "30 seconds of history". De beelden, de kaart, de ondertitels en de muziek worden
allemaal in code gemaakt. Higgsfield is alleen nog nodig voor de **stem** (~1,5 credit per video), niet
meer voor Kling-clips (22,5 credits per video). Merkregels: skill `histora-brand`. Checklist: README in
`marketing/shorts/30-seconds-of-history/`.

Een apart npm-project, los van de app: eigen `node_modules`, uitgesloten in de `tsconfig.json`, de
`eslint.config.js` en de `.easignore` van de app.

## Een video maken

```bash
cd marketing/remotion
npm install                               # eenmalig
npm run assets -- <id>                    # beelden uit assets/images/ → public/
npm run vo:placeholder -- <id>            # optioneel: tijdelijke Windows-stem, om de montage te beoordelen
npm run timing -- <id>                    # stem strak knippen + src/videos/timing/<id>.json
npm run music -- <id>                     # eigen muziek op die timing (scripts/music/<id>.mjs)
npm run studio                            # live bekijken en bijschaven in de browser
npm run render -- <id>                    # mp4 + frame 1 + omslag naar de renders/-map van de video
```

**Na elke wijziging aan de tekst of de pauzes: `timing` en daarna `music` opnieuw draaien.** De muziek
is uitgerekend op de tijden van de stem.

Een render zonder echte stem krijgt `-placeholder` of `-estimate` in de bestandsnaam. Die zijn niet om te posten.

## De echte stem

1. Laat **Alistair** (de vaste stem, voice_id `d9d5c263-f84e-4752-97b5-3750fcc6fd2f`) de tekst uit `## Voice-over`
   van het script als **één opname** inspreken (Higgsfield, `text2speech_v2` met `variant: elevenlabs`, 1,5 credit). Elke beat is één hele zin, zodat `timing` de
   grenzen tussen de zinnen kan vinden.
2. Zet de opname neer als `voice/<id>/take.mp3` (of `.wav` / `.m4a`).
3. De afsluiter "The full story is in Histora. Follow for more." is één opname voor alle video's:
   `voice/shared/cta.mp3`. Neem die opnieuw op als er een andere stem komt.
4. `npm run timing -- <id>` vindt de zinnen met silencedetect en drukt per zin de lengte en het aantal woorden
   per seconde af. Een uitschieter betekent dat twee zinnen verkeerd zijn samengevoegd. Het tempo komt uit `voiceTempo` in de config
   (standaard 1,1: rustig, ~35-40 s; Alexander staat op 1,2). `--tempo` overschrijft dat.
   Met `--take <bestand>` en `--cta <bestand>` probeer je een andere opname zonder iets te verplaatsen.
   Vindt hij te veel zinnen, dan voegt hij de kortste pauzes samen. Vindt hij er te weinig, dan noemt hij wat hij wel vond.
   Pauzeert de stem bij een komma langer dan bij een punt, dan worden de verkeerde stukken samengevoegd: zet de
   zinsgrens vast met `--grens <s>` (seconden ná het tempo, herhaalbaar). Alexander v3: `--grens 12.4`.

De stem begint op frame 0. De pauzes tussen de zinnen komen uit `pauseAfter` in de config, niet uit de opname.

## Een nieuwe video

1. Kopieer `src/videos/alexander-the-great.ts` naar `src/videos/<id>.ts` en zet hem in
   `src/videos/index.ts` (draai eerst `npm run timing -- <id>`, zodat het timingbestand bestaat).
2. Kopieer `scripts/music/alexander-the-great.mjs` naar `scripts/music/<id>.mjs` en pas de partituur aan.
   `s(i)` en `e(i)` zijn het begin en het eind van beat `i`, `cta` is het begin van de afsluiter.

Wat een config bevat (`src/sjabloon/types.ts`):

| Veld | Wat |
|---|---|
| `hook` | De claim, volledig in beeld vanaf frame 1. `{deel}` = oranje, `\|` = nieuwe regel. |
| `beats` | Eén zin per beat: `say` (gesproken), `cap` (ondertitelkaarten), `pauseAfter`. |
| `shots` | `scene` (het hele schilderij als kaart over een vage kopie, met `pan`/`push` en `flash`), `map` (route die zich intekent, `zoom: [van, naar]`, `territory` = het gebied dat meegroeit, `draw` = wanneer de lijn aankomt), `timeline` (punten op schaal met de afstanden in jaren, Cleopatra) of `bars` (staven op schaal met een mythe en een gemarkeerde, Napoleon). |
| `years` | Jaartal linksboven vanaf een beat. Het rolt naar het volgende jaartal. |
| `stamps` | Groot getal midden-boven ("KING AT 20"), optioneel optellend. |
| `silenceOn` | Beats waarop de muziek hard stilvalt. Ter documentatie; de partituur regelt het. |

## Historische bronbeelden (`extra/`)

Echte beelden die niet in de app zitten (een middeleeuwse kaart, een spotprent) staan in `extra/<storyId>/`, en
`npm run assets` kopieert ze naar `public/extra/<storyId>/`. **Alleen publiek domein of CC0**, met de bron in
`extra/BRONNEN.md`. Een echt document uit de tijd zelf naast de geschilderde scènes is het sterkste beeld dat een
short kan hebben: het bewijst dat het verhaal waar is.

Let op bij de kaart: met een `territory` centreert het uitzoomen op het midden van dat gebied, niet op de route.
Moet de hele route in beeld (Mansa Musa), laat `territory` dan weg.

## Wat het sjabloon vastlegt (uit de stats van 01-03)

- Geen fade-in: frame 0 is volledig beeld met de hook. Tekst komt nooit binnen via doorzichtigheid.
- Geen titelkaart en geen beige eindkaart. De CTA staat ~2 s óver het laatste beeld.
- Een dunne voortgangsbalk bovenin.
- Ondertitels in het middelste derde; de onderste 20% en de rechterrand blijven vrij voor de knoppen van de platforms.
- Beelden worden nooit bijgesneden en schudden niet (eigenaar, 2026-11-03).
- De kaart toont alleen kustlijnen (Natural Earth via `world-atlas`), geen moderne grenzen.

Remotion is gratis voor individuen en bedrijven tot 3 medewerkers. Daarboven is een bedrijfslicentie nodig.
