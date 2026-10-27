# Play Store listing — Histora v1.0

Alle tekst die de Play Console vraagt, klaar om te kopiëren. **Engels**, want de verhalen zelf zijn
Engels (de UI is en/nl/fr/de, de content niet — zie LAUNCH-PLAN.md B5). Voeg later gerust extra
listing-talen toe; dat kan zonder nieuwe build.

De tekens tussen haakjes zijn getelde lengtes tegen de limiet van Play. Herteld je iets? Draai
`node scripts/check-listing-lengths.mjs`.

---

## App name (max 30)

```
Histora: Learn History
```

(22/30.) De **launcher**-naam blijft `Histora` — die staat in `app.json` en hoeft niet gelijk te
zijn aan de storenaam. Wil je puur merk, gebruik dan `Histora` (7/30); de suffix is er alleen
omdat "Histora" op zichzelf niets over de inhoud zegt in een zoekresultaat.

## Short description (max 80)

```
Read history one chapter at a time. Finish a story, unlock the figure.
```

(70/80.)

**Bewust zonder getallen** (wens van de eigenaar, 2026-10-22): er komen nog veel verhalen bij, en een
listing met "20 stories" veroudert bij elk nieuw verhaal. Hetzelfde geldt voor de volledige beschrijving
en de feature graphic. Het enige getal dat er nog in staat is de dagelijkse limiet ("two new stories a
day"), want dat is een regel van het product en geen telling van de inhoud.

Alternatieven binnen de limiet, mocht je willen A/B'en:

- `History as short stories. Real lives and events, one chapter at a time.` (71)
- `Short chapters about real people. Finish a story, unlock the figure.` (69)

(Hier stond twee keer "no ads". Sinds 1.2 heeft de gratis versie advertenties, dus die belofte is
eruit. Dat staat ook onder het kopje "Ads" verderop.)

## Full description (max 4000)

> **Herschreven voor 1.4 (2026-10-27, wens van de eigenaar): alleen de tijdperken, geen namen van
> personen en geen aantallen** — er komen verhalen bij, en een lijst met namen veroudert bij elk
> nieuw verhaal. De oude versie noemde ook nog peilingen en keuzepunten na een hoofdstuk; die
> staan sinds 1.4 niet meer in het vragenpaneel. De mascotte heet hier "a fox", nooit "Phoxy"
> (interne naam). Controleer bij elke wijziging of de tekst nog klopt met de app: een listing die
> meer belooft dan de app doet is precies waar reviews en Play-meldingen over gaan.

```
Histora turns history into something you actually finish.

Every famous person and every turning point is one true story, told in short chapters. Read one on the bus, one before bed. A chapter takes a few minutes.

ONE JOURNEY THROUGH TIME

Follow history in order, from the founding of Rome to the world today. Your journey card always shows where you are and what comes next. Every era has its own route to explore:

Antiquity
Middle Ages
Early Modern Period
Industrial Revolution
20th Century
Contemporary Era

New stories are added regularly, and they show up with a "New" label so you never miss one.

HOW IT READS

Every story is a path of chapters. Each chapter opens with an illustrated scene, and the next one unlocks when you finish, so you never have to remember where you left off. A fox in glasses walks the route with you.

LEARN AS YOU READ

After every chapter, the fox asks you one quick question about what you just read. Right or wrong, you see the answer and a short explanation, so the story sticks.

SPIN THE WHEEL

In Explore, spin the wheel, land on an era and answer a history question. Three right in a row earns a crown question. Win a crown for every era, or challenge the robot to a duel.

COLLECT THE PEOPLE

Finish a story and its figure joins your character collection. A card for every story, filled in one at a time.

KEEP YOUR STREAK

Read a chapter a day to build your streak, and add the streak widget to your home screen. Earn Ducats by reading and spend them on streak freezes for busy days.

BUILT TO STAY OUT OF THE WAY

No ads inside a chapter. The free version shows banners outside the reader and one short ad after you finish a story. Pro removes them.
Nothing sold to anyone.
A free account, so your progress, characters and streak follow you to a new phone.
One reminder a day, at a time you pick, and you can switch it off.

The interface and the questions are available in English, Dutch, French and German. The stories themselves are in English. Light and dark themes.

FREE AND PRO

Histora is free to download and read online: two new stories a day, and every story you have started stays open. Histora Pro removes the daily limit and all ads, gives you unlimited lives in Explore and lets you read offline. It is a monthly or yearly subscription through Google Play, with a 7-day free trial for new subscribers, and you can cancel any time in the Play Store.
```

---

## Categorisatie & overige velden

| Veld | Waarde | Toelichting |
|---|---|---|
| App or game | **App** | |
| Category | **Books & Reference** | Education is een verdedigbaar alternatief; het is lezen, geen cursus. |
| Tags | history, stories, reading, education | Max 5, Play stelt zelf een lijst voor. |
| Contact e-mail | businessdemore@gmail.com | Verplicht en **publiek zichtbaar** in de listing. Hetzelfde adres als `SUPPORT_EMAIL` in `src/constants/app-info.ts` en als de privacypagina — dat is met opzet: hier stond een persóónlijk adres, en dan staan er drie adressen voor één app waarvan de lezer niet weet welke gelezen wordt. Wijzig je er één, wijzig ze alle drie. |
| Website | — | Optioneel. Als je `docs/` via GitHub Pages publiceert kun je die repo-pagina gebruiken. |
| Phone | — | Optioneel, laat leeg. |
| Privacy policy | `https://demore2.github.io/histora/privacy-policy.html` | Dezelfde URL als `PRIVACY_BELEID_URL` in `src/constants/juridisch.ts`. Wijzig je de host, wijzig ze samen. |
| Ads | **Yes, my app contains ads** (vanaf 1.2) | AdMob: banners op Home en het tijdperk-scherm, een interstitial na een uitgelezen verhaal; Pro ziet niets. Zet dit pas om met de 1.2-build. 1.1.x had "No". Zie ook "Advertising ID" in `docs/README.md`. |
| In-app purchases | **Yes** (sinds 1.1.0) | Histora Pro via Google Play Billing / RevenueCat (`histora_pro`, maand en jaar). Hier stond "No" uit de tijd dat Billing nog een stub was. |
| Content rating | IARC-vragenlijst, zie hieronder | |
| Target audience | **13+** | Bewust niet onder 13: dan val je onder het Families-programma met een eigen set eisen. |
| App access | **All or some functionality is restricted** | De hele app zit achter `AuthPoort`, dus Play heeft **testgegevens** nodig: geef het account uit `docs/TEST_ACCOUNTS.md` op bij "App access → Add new instructions". Zonder dat komt de reviewer niet voorbij het loginscherm en volgt een afwijzing. |
| News app | **No** | |
| Government app | **No** | |
| Financial features | **None** | |
| Data safety | zie `docs/README.md` | **Niet** "no data collected": e-mailadres, gebruikersnaam, leesvoortgang, peilingantwoorden en feedback gaan naar Supabase. De ingevulde antwoorden staan in `docs/README.md` en horen gelijk te lopen met `docs/privacy-policy.html`. |

### IARC-vragenlijst

Antwoord gewoon eerlijk; de app komt dan op *Everyone* of *Everyone 10+* (PEGI 3 of 7) uit. Let op
deze twee, want ze zijn níét vanzelfsprekend "nee":

- **Geweld** — de verhalen beschrijven oorlog, slavernij, executies en moord (Caesar, Spartacus,
  Churchill, MLK) en de scènebeelden tonen legers, veldslagen en een brandende stad. Dat is *references to*
  of *mild depictions of* geweld in een historische, niet-interactieve context, geen realistisch of
  verheerlijkt geweld.
- **Gebruikersinteractie** — **nee**. Geen chat, geen delen, geen user-generated content, geen
  locatie. Dit is de vraag die anders in één klap een hogere rating oplevert.

Een uitkomst van *Everyone 10+* is geen probleem en geen reden om de vragenlijst te "verzachten" —
een onjuiste rating is wél een reden voor verwijdering.

---

## Grafische assets

Alles staat in `store/assets/`, gegenereerd met `npm run generate:store-assets`.

| Asset | Bestand | Eis van Play | Status |
|---|---|---|---|
| Hi-res icon | `assets/icon-512.png` | 512×512, 32-bit PNG | ✅ 512×512, alpha volledig opaak |
| Feature graphic | `assets/feature-graphic.png` | 1024×500, 24-bit PNG zonder alpha of JPEG | ✅ 1024×500, alfakanaal verwijderd |
| Phone screenshots | `assets/screenshots/phone-*.png` | min. 2, 9:16 of 16:9, zijden 320–3840 px | ✅ 8 stuks, 1080×1920 |
| Tablet screenshots | — | optioneel | Niet gemaakt; alleen nodig als je tablets wilt targeten |
| Promo video | — | optioneel | Geen |

De feature graphic is **geen** PNG die je met de hand bewerkt: de bron is `store/feature-graphic.html`
en het script rendert die met headless Chrome. Wijzig de HTML en draai het script opnieuw.

⚠️ De feature graphic zegt **"REAL PEOPLE · SHORT CHAPTERS · ROME TO TODAY"**, bewust zonder getallen,
zodat hij niet veroudert als er verhalen bijkomen. Tot 1.2 stond daar "NO ADS", en dat is sinds AdMob niet
meer waar.

### Screenshot-volgorde

De volgorde in de Play Console is de volgorde waarin ze geswipet worden; de eerste twee zijn de
enige die de meeste mensen zien. Upload deze acht in deze volgorde:

1. `phone-1-home.png` — Home: uitgelicht verhaal + "Continue reading"
2. `phone-2-chapters.png` — hoofdstukoverzicht, hoofdstuk I open met beeld, de rest op slot
3. `phone-3-reader-scene.png` — hoofdstuk 1 van Caesar: scènebeeld met bijschrift
4. `phone-4-reader-blocks.png` — sleutelmoment "60 BC" in de kantlijn
5. `phone-5-unlock-cta.png` — laatste hoofdstuk, footer "Unlock Malala Yousafzai"
6. `phone-6-unlock-modal.png` — "Character Unlocked!"
7. `phone-7-reader-dark.png` — reader in donker thema, met tussenkop
8. `phone-8-home-dark.png` — Home in donker thema

Alle acht zijn **1080×1920** (9:16), uit de **release-APK** op de Pixel_8-emulator, met de
statusbalk in SystemUI-demomode (vaste klok 9:00, volle batterij, geen meldingen).

**Twee opnames zijn er wél maar gingen bewust níét mee**, omdat ze een verkeerd beeld gaven:

- `extra-profile.png` — de personagecollectie. De teller "chapters done" telde geopende *verhalen*
  in plaats van hoofdstukken, en het rooster staat vol met "?"-cirkels.
- `extra-progress.png` — Voortgang. Zes lege balken en "1 day streak" bij een gebruiker die nog
  niets had gelezen.

> **Beide B6-bugs zijn in Fase 8 opgelost** — de teller leest nu `story-progress-store` en de
> streak begint op 0 met een eigen "No streak yet"-staat. **Alle acht de screenshots moeten
> opnieuw** vóór de productie-build, want in dezelfde fase kreeg de reader-header zijn
> safe-area-inset: `phone-3`, `phone-4` en `phone-7` toonden de klok bovenop de beige headerbalk.
> Maak bij die ronde meteen een Profiel- en een Voortgang-opname met echte voortgang; die zijn nu
> wél representatief en de set kan naar tien.
