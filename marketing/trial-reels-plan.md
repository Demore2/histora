# Plan: trial reels op Instagram (vanaf 200 volgers)

Opgesteld 2026-11-26, naar aanleiding van "The NEW Way to Use Trial Reels in 2026" (Dominik, YouTube 2d9_E3MosXQ).
Stand die dag: 187 volgers, ~10 per dag erbij.

## Wat de video zegt (kort)

1. **Herpost bewezen winnaars** als trial. Of dat lukt hangt af van je "trust score" (accountreputatie: echte terugkerende kijkers, geen spam). Bij een lage score krijg je de melding "lijkt op iets wat je al deelde" en weinig bereik.
2. **"Trial reels maxing"**: Instagram vergelijkt vooral de **eerste 3 seconden**, de knippen en het beeld, minder de audio. Spiegelen en versnellen werkt bij een lage score niet. Wat wel werkt: een **nieuwe hook en nieuwe visuals** over dezelfde inhoud.
3. **Elk nieuw idee eerst als trial**, het liefst **3 hooks tegelijk**. Kijk na 24-48 uur naar retentiecurve, opslagen, delen en reacties, en zet alleen de winnaar op het raster. Kijk niet alleen naar views.
4. **"Franchise mode"**: melk een winnaar uit met remakes, sequels en spin-offs. Je beste formats worden zo je contentpijlers, gevonden uit data in plaats van vooraf bedacht.

Kanttekening: het is een verkoopvideo voor een workshop. De cijfers (50M views) zijn anekdotes van de beste klanten, en "trust score" is een theorie, geen gedocumenteerde Instagram-functie. De methode (A/B-testen met hooks) is wel gezond en past bij hoe Instagram trials bedoeld heeft.

## SWOT voor Histora

| | |
|---|---|
| **Sterktes** | • **Varianten kosten ons bijna niets.** Alles is code (Remotion), dus een andere eerste scène, teller, omslag of kleur is een andere prop en een render van ~10 min. Wat hun klanten met AI of opnieuw filmen doen, doen wij met één render.<br>• We hebben al een bewezen franchise: "What if you were X?", met winnaars Stalin (12,9K), Saladin (11,8K) en Khalid (5,3K).<br>• 96-99% van onze views komt al van niet-volgers. Het algoritme pusht ons, en dat is precies het publiek van een trial.<br>• Elke dag een fanverzoek als gratis ideeënstroom. |
| **Zwaktes** | • **Jong, klein account** (4 weken, ~200 volgers): waarschijnlijk een lage "trust score", dus letterlijk herposten zal vaak worden afgestraft.<br>• Geen stem: het verschil zit alleen in beeld en tekst. Dat is wel juist wat Instagram vooral vergelijkt.<br>• Altijd hetzelfde nummer ("Amour plastique"), dus de audio is overal gelijk.<br>• Van bereik naar volger is mager: ~2,5 follows per 1K views.<br>• Posten loopt via Meta Business Suite in Chrome. **Of MBS trial reels ondersteunt is onbekend**; misschien kan het alleen in de app, en dan moet de eigenaar het doen. |
| **Kansen** | • 3 hooks per What-if testen zonder het raster te vervuilen.<br>• **Oude winnaars opnieuw** met een nieuwe eerste 3 seconden: Stalin, Saladin, Khalid.<br>• **Nichepersonen als trial** (Barsbek-achtig) in plaats van op het raster: flops zijn onzichtbaar.<br>• **Sequels/spin-offs**: "What if you were Stalin's bodyguard / son / enemy", "What if you were a soldier at Saladin's Hattin".<br>• Data gebruiken voor de keuze van de volgende lange YouTube-video. |
| **Bedreigingen** | • Reputatie omlaag door te veel bijna-dubbele trials: dan zakt het bereik van alles.<br>• Omstreden figuren (Stalin, Atatürk) trekken felle discussies en meldingen. Meer bereik betekent meer risico op beperking.<br>• Religieuze kritiek (Khalid, Saladin) kan groter worden.<br>• Instagram verandert de regels voor trials vaak; wat nu werkt, kan over een maand weg zijn.<br>• Tijd: 3 varianten per dag is 3× posten. |

## Benchmarks (uit onze eigen data)

Een trial "wint" als hij na 24-48 uur haalt:

| Metriek | Drempel | Stalin | Saladin | Barsbek (flop) |
|---|---|---|---|---|
| Gem. kijktijd | ≥ 20 s | 25 s | 24 s | 11 s |
| Delen / weergaven | ≥ 0,5% | 1,27% | 0,42% | 0,07% |
| Opslagen / weergaven | ≥ 0,7% | 1,26% | 0,70% | 0,56% |
| Follows per 1K | ≥ 2 | 2,6 | 2,5 | 2,1 |

Views tellen pas als de rest klopt (zoals de video zegt).

## Het plan

### Fase 0, nu (vóór 200 volgers) — gebouwd 2026-11-26

**Stand:** `src/watals/hooks.ts` (de helper), een `hook`-prop (A/B/C) in `WatAlsStalin.tsx` en `WatAlsAtaturk.tsx` (`STALIN_HOOKS` / `ATATURK_HOOKS`), composities `watals-<id>-stil-B/-C` in `Root.tsx`, het render-commando `scripts/trial-hooks.mjs` en het scorebord `2.stats/trials.md`. De eerste frames zijn nagekeken; de volledige mp4's worden pas gerenderd als de trials echt kunnen. Nog open: punt 3 (MBS of de app), want de trial-optie verschijnt pas bij 200. Andere personen: dezelfde vier aanpassingen als in Atatürk (import, `<NAAM>_HOOKS`, `starts` in de component, `knippen`).

1. **Varianten in de code inbouwen.** In `watals/` een prop `hook` (A/B/C) die alleen scène 1 (de eerste 2-3 s), de omslag en de eerste teller verandert, plus één render-commando dat de drie varianten in één keer maakt. Daarna is elke What-if ×3 een kwestie van renderen.
2. **Drie hooktypes vastleggen**, zodat we iets leren in plaats van willekeurig te variëren:
   - A = het gezicht in close-up met de vraag ("What if you were Stalin?"), zoals nu;
   - B = het einde eerst (de top: "You'd rule 200 million people");
   - C = een schok of detail ("Age 7: your father beats you").
3. **Uitzoeken waar trials gepost kunnen worden**: MBS in Chrome of alleen de app. Dat bepaalt of ik het doe of jij.
4. **Scorebord**: `marketing/2.stats/trials.md`, één rij per trial (persoon, hook, kijktijd, delen%, opslagen%, follows/1K, winnaar ja/nee). `/social-stats` vult het aan.

### ▶ Checklist zodra IG 200+ volgers heeft (eerst afwerken)
1. **MBS of de app?** Kijk of Meta Business Suite in Chrome de trial-optie toont. Zo niet, dan post de eigenaar de trials in de app.
2. **Stalin B herzien?** Die opent met "Hitler invades. you win the war". Inhoudelijk klopt het, maar het is de eerste zin van de hook. Kies met de eigenaar of dat blijft of dat B een andere scène wordt (`STALIN_HOOKS.B`).
3. **Saladin en Khalid de hook-schakelaar geven** (voor fase 2), zoals in `WatAlsAtaturk.tsx`/`WatAlsStalin.tsx`.
4. **Volledige mp4's renderen** met `node marketing/remotion/scripts/trial-hooks.mjs <id>` (tot nu toe alleen de openingsframes).

### Fase 1, week 1 na 200: pilot season
- Elke dag de nieuwe What-if als **3 trials (A/B/C)**. Na 24-48 uur gaat de winnaar als nieuwe reel op het raster (niet "delen vanuit trial", advies uit de video).
- Max ~3 trials per dag, zodat het niet als spam leest.
- Na 7 dagen: welk hooktype wint? Dat wordt de standaard.

### Fase 2, week 2: winnaars opnieuw
- Stalin, Saladin en Khalid opnieuw, met de winnende hook plus nieuwe visuals in de eerste 3 seconden (andere camera, andere openingsscène, ander fragment uit het nummer).
- Nooit een letterlijke herpost zolang de reputatie laag is. Verschijnt de melding "lijkt op eerder gedeeld", dan meer veranderen.
- Nichepersonen en fanverzoeken met twijfel (Barsbek-type) alleen nog als trial.

### Fase 3, week 3+: franchise mode
- Sequels en spin-offs van de top 3 ("What if you were Stalin's bodyguard?", "…a Janissary under Mehmed?").
- Wat als trial wint, gaat op het raster én wordt kandidaat voor de volgende lange YouTube-video.
- Na ~3-4 maanden: de grootste winnaars ongewijzigd opnieuw als trial (als de reputatie dan hoger is).

## Wie doet wat

| Ik (Claude) | Eigenaar |
|---|---|
| hook-varianten bouwen en renderen, `posten-klaar.mjs` laten werken voor ×3 | beslissen welke persoon, het nummer in de app |
| trials posten via MBS (als dat kan) | trials posten in de app (als MBS het niet kan) |
| na 24-48 u meten, scorebord bijwerken, winnaar aanwijzen | winnaar goedkeuren voor het raster |
| melding geven bij "te veel op elkaar"-meldingen of een dalend bereik | stoppen of afremmen als het misgaat |

## Stopregels
- Zakt het bereik van gewone reels 2 weken achter elkaar → minder trials, geen herposts.
- Meer dan 1 op de 3 trials krijgt de melding "lijkt op eerder gedeeld" → geen remakes meer, alleen nieuwe ideeën.
