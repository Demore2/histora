# Feedback in Discord — wat er staat, en wat er nog moet

Deze map hoort bij `send-feedback-discord`: de edge function die een nieuwe regel uit
`public.feedback` als embed in Discord zet. Bugs gaan naar het ene kanaal, ideeën naar het andere.
De app-kant (`src/components/feedback-modal.tsx`) is **niet gewijzigd** en weet hier niets van.

Naast deze staat `send-feedback-email` met zijn eigen README. Eén trigger roept ze allebei aan.

## De webhook-URL's staan in secrets, niet in de code

**Een Discord-webhook-URL is een wachtwoord**, en `github.com/Demore2/chronicles` is publiek.
De function leest de URL's daarom uitsluitend uit twee secrets (Dashboard → Edge Functions →
Secrets):

| Secret | Webhook | Kanaal |
|---|---|---|
| `DISCORD_WEBHOOK_BUG` | Bugs Bot | Buggsy |
| `DISCORD_WEBHOOK_IDEE` | Idea Bot | Smartass |

Ontbreekt er een, dan antwoordt de function `overgeslagen: webhook_niet_ingesteld` (een 200).

Tot 2026-10-21 stonden de URL's als constante in `index.ts` en dus in de git-geschiedenis. Die
webhooks zijn in Discord verwijderd (geven 404) en vervangen; wat er in oude commits staat is
waardeloos. **Wissel je ooit weer van webhook**: Discord laat een bericht alleen bewerken door de
webhook die het plaatste, dus elk ticket krijgt bij de volgende statuswijziging één nieuw bericht.

## De stand van vandaag

| | Staat er | Werkt |
|---|---|---|
| Edge function `send-feedback-discord` | ✅ gedeployd, ACTIVE, `verify_jwt` aan | ✅ weigert alles behalve de service role (getest: 401 zonder token, 403 met een lezerstoken) |
| Beide webhooks | ✅ geldig, kanalen "Buggsy" en "Smartass", zelfde server | ✅ getest met een echte POST, allebei `204` |
| Trigger `feedback_meldingen_na_insert` | ✅ | ✅ vuurt en laat de insert staan (getest) |
| Vault-geheim `service_role_key` | ❌ ontbreekt | ⛔ **dit is het enige dat de keten nog tegenhoudt** |

Er staan al twee testberichten in je kanalen, één per kleur, met "TEST from Claude Code" erin.

## De keten

```
FeedbackModal  →  insert public.feedback  →  trigger stuur_feedback_meldingen()
                                                   │  net.http_post × 2 (asynchroon)
                                        ┌──────────┴───────────┐
                                        ▼                      ▼
                            send-feedback-discord      send-feedback-email
                              ├─ leest de rij terug      (inert zonder RESEND_API_KEY)
                              ├─ adres uit auth.users
                              └─ POST → 🐛 of 💡 kanaal
```

Vijf dingen die bewust zo zijn:

- **De trigger kan de insert niet laten mislukken.** `after insert`, een `exception`-blok dat alles
  opvangt, en `net.http_post` dat het verzoek in een wachtrij zet in plaats van erop te wachten.
  Ligt Discord plat, dan staat de feedback er nog steeds — dat is de reden dat feedback in een
  tabel landt en niet rechtstreeks in een chatbericht.
- **Zonder Vault-geheim gebeurt er niets**, zelfde `where`-truc als bij de cron
  `push-sweep-elk-uur`. Geen 401 per feedbackregel, geen halve poging.
- **Alleen het id gaat over de lijn.** De function leest de rij zelf terug, dus in Discord staat per
  definitie wat er in de tabel staat, en opnieuw plaatsen is dezelfde POST met hetzelfde id.
- **Alleen de service role mag de function aanroepen.** `verify_jwt` laat elk geldig token door, dus
  ook dat van een gewone lezer; zonder de rolcontrole kan iedereen die inlogt een willekeurig
  `feedback_id` opgeven en zo andermans bericht en e-mailadres in jouw Discord laten zetten.
- **`allowed_mentions: { parse: [] }` staat in elke POST.** Het bericht is door een gebruiker
  getypt. Zonder die regel is `@everyone` in een bugmelding een `@everyone` in je server.

## Instellen — de enige stap die nog open staat

De trigger vraagt het geheim `service_role_key` op en doet niets als het er niet is. Zetten:

1. *Dashboard → Project Settings → API → `service_role` key* kopiëren (de lange, geheime; **niet**
   de publishable).
2. In de SQL Editor:

   ```sql
   select vault.create_secret(
     '<de service_role key>',
     'service_role_key',
     'Voor pg_cron/pg_net-aanroepen naar edge functions'
   );
   ```

3. Klaar. De volgende feedback uit de app verschijnt in Discord.

> ⚠️ **Dit is hetzelfde geheim dat de cron `push-sweep-elk-uur` inert houdt.** Zet je het, dan gaat
> die sweep óók elk uur draaien. Ongevaarlijk zolang Firebase niet is ingesteld: `push-sweep`
> controleert dat vóórdat hij iets claimt en antwoordt dan met `200 { overgeslagen:
> 'firebase_niet_geconfigureerd' }`, zonder een rij in `notifications_sent` te branden. Zie
> `README-push.md`. Wil je het toch los, dan is die job uit te zetten met
> `select cron.unschedule('push-sweep-elk-uur');`.

Terugdraaien kan met
`select vault.delete_secret(id) from vault.secrets where name = 'service_role_key';` — daarna is
alles meteen weer inert.

## Testen

### 1. Het webhook los, zonder Supabase

Dit is de snelste manier om te zien of een URL nog leeft en hoe een embed eruitziet. Plakt direct
in een terminal:

```bash
curl -X POST "$DISCORD_WEBHOOK_BUG" \
  -H "Content-Type: application/json" \
  -d '{
    "embeds": [{
      "title": "🐛 Bug report",
      "description": "Handmatige test.",
      "color": 16711680,
      "fields": [
        { "name": "Platform", "value": "android", "inline": true },
        { "name": "App version", "value": "1.0.0", "inline": true }
      ],
      "footer": { "text": "Histora" }
    }],
    "allowed_mentions": { "parse": [] }
  }'
```

Een geslaagde POST geeft **`204 No Content`** en dus geen uitvoer. Voor het ideeënkanaal: dezelfde
aanroep met het tweede webhook en `"color": 39423`.

Wil je alleen weten óf een webhook nog bestaat, zonder iets te plaatsen: `curl <webhook-url>`. Dat
geeft de naam en het kanaal terug, of een `10015 Unknown Webhook`.

### 2. De edge function los

Handig om een melding opnieuw te plaatsen zonder een tweede rij te maken. **Dit vraagt de
service-role key**; met de publishable key krijg je terecht een 403.

```bash
curl -X POST "https://nxwdhuuouhbmykgykbov.supabase.co/functions/v1/send-feedback-discord" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"feedback_id":"<uuid uit public.feedback>"}'
```

| Antwoord | Betekenis |
|---|---|
| `403 alleen_service_role` | Publishable key of lezerstoken gebruikt. Goed zo. |
| `200 { discord: "geplaatst" }` | Staat in het kanaal. |
| `200 { discord: "mislukt: 404 ..." }` | Webhook bestaat niet meer (opnieuw aangemaakt?). |
| `200 { discord: "mislukt: 400 ..." }` | Discord weigerde de embed; de melding zegt welk veld. |
| `404 feedback_niet_gevonden` | Het id bestaat niet. |

### 3. De hele keten, via SQL

Elke insert vuurt de trigger, dus dit is precies de weg die de app ook neemt:

```sql
insert into public.feedback (user_id, soort, bericht, app_versie, platform)
values ('<een echte user_id>', 'bug', 'Test vanuit SQL', '1.0.0', 'android');
```

Binnen een paar seconden hoort er een embed in het bugkanaal te staan. Met `'idee'` in het andere.

### 4. Uit de app

1. Log in, open Profiel, tik het spreekwolkje.
2. **Bug** kiezen, iets herkenbaars typen, versturen. In de app hoort er niets te veranderen.
3. Herhalen met **Idea**, en kijken of die in het ándere kanaal landt.

## Er komt niets binnen — wat te controleren, in deze volgorde

1. **Staat het Vault-geheim er?**

   ```sql
   select name from vault.secrets where name = 'service_role_key';
   ```

   Leeg? Dan is dat het. De trigger doet met opzet niets en laat geen spoor na.

2. **Is de aanroep gedaan?** pg_net bewaart elk antwoord:

   ```sql
   select created, status_code, content::text, error_msg
     from net._http_response
    order by created desc
    limit 10;
   ```

   - Niets: de aanroep is nooit gedaan → terug naar stap 1.
   - `timeout`: de function draaide wél, maar langer dan de 15 seconden van de trigger. Het
     antwoord is dan niet bewaard; de logs van de function hebben het wel.
   - Een `content` met `"discord":"mislukt: ..."`: de function draaide en Discord weigerde. De
     reden staat er letterlijk in.

3. **De logs van de function** — *Dashboard → Edge Functions → send-feedback-discord → Logs*. Elke
   poging schrijft een regel: geslaagd met de statuscode, of mislukt met het antwoord van Discord.

4. **Leeft het webhook nog?** `curl <webhook-url>` (zie hierboven). Een verwijderd en opnieuw
   aangemaakt webhook heeft een **andere** URL; die moet dan in de code of in de secrets.

5. **Kijk je in het goede kanaal?** `soort = 'bug'` gaat naar "Buggsy", `soort = 'idee'` naar
   "Smartass". Een derde `soort` bestaat niet en zou als `overgeslagen: onbekende_soort` in de logs
   belanden.

## Wat er bewust niet is

- **Geen reacties op de berichten (👀 gezien, ✅ opgelost).** Dat kan een webhook niet. Een reactie
  plaatsen is `PUT /channels/{id}/messages/{id}/reactions/...` en dat endpoint eist een **bot
  token**; een webhook mag alleen berichten plaatsen in zijn eigen kanaal. Wil je dit toch, dan is
  het een Discord-applicatie met een bot in je server, een tweede geheim, en het bericht-id (dat
  je krijgt door `?wait=true` aan de webhook-URL te plakken). Dat is een grotere stap dan hij
  lijkt. Wat wél meteen werkt: reacties met de hand zetten, of in Discord een thread per melding
  openen.
- **Geen logtabel.** Wat een melding deed staat al in de logs van de function en in
  `net._http_response`. Een derde kopie die iemand moet onderhouden voegt niets toe.
- **Geen herpoging over aanroepen heen.** Binnen één aanroep wel: drie pogingen bij een 429 of een
  5xx, met de wachttijd die Discord zelf in `retry_after` meegeeft. Mislukt het daarna, dan staat
  de rij nog steeds in `public.feedback` en is er niets verloren.
- **Geen melding bij `update` of `delete`.** De trigger staat op `insert`, en `public.feedback`
  heeft ook geen update- of delete-policy.
- **De webhooknamen worden niet overschreven.** De payload zet geen `username` of `avatar_url`, dus
  de berichten verschijnen als "Buggsy" en "Smartass" — de namen die je zelf gaf.

## Privacy

Er gaat nu inhoud naar een derde partij die er eerder niet heen ging: het bericht, het gebruiker-id
en het e-mailadres van de lezer belanden in Discord. `docs/privacy-policy.html` beschrijft wel dat
feedback wordt opgeslagen, maar niet dat hij wordt doorgestuurd. **Werk die pagina bij** — dezelfde
alinea als bij de mailkant, zie `README-feedback-mail.md`.

Wil je het adres er niet in hebben: haal het `From`-veld uit `bouwEmbed()`. Het gebruiker-id blijft
dan staan en dat is genoeg om de rij terug te vinden.

## Opnieuw deployen

`supabase/functions/send-feedback-discord/index.ts` is de bron. Na een wijziging:

```bash
supabase functions deploy send-feedback-discord --project-ref nxwdhuuouhbmykgykbov
```

Verandert het projectref, dan moeten de twee URL's in `public.stuur_feedback_meldingen()` mee. Die
staan hardgecodeerd in de migratie, net als in de cron-opdracht.
