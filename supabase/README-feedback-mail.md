# Feedback per mail — wat er staat, en wat er nog moet

Deze map hoort bij `send-feedback-email`: de edge function die de twee mails stuurt zodra iemand
het spreekwolkje op Profiel gebruikt. De app-kant is `src/components/feedback-modal.tsx` en die is
**niet gewijzigd** — hij schrijft nog steeds één rij in `public.feedback` en is daarmee klaar.

> `supabase/functions/` is uitgesloten van `tsconfig.json`, `eslint.config.js` en `.easignore` —
> het is Deno-code en hoort niet in een app-build. Een fris Supabase-project heeft deze function
> dus **niet**; die moet apart gedeployd worden.

## De stand van vandaag

| | Staat er | Werkt |
|---|---|---|
| Edge function `send-feedback-email` | ✅ gedeployd, ACTIVE, `verify_jwt` aan | ✅ weigert alles behalve de service role (getest: 401 zonder token, 403 met een lezerstoken) |
| Trigger `feedback_meldingen_na_insert` op `public.feedback` | ✅ | ✅ vuurt en laat de insert staan (getest). Roept sinds de Discord-koppeling **twee** functions aan; zie `README-feedback-discord.md` |
| Vault-geheim `service_role_key` | ❌ ontbreekt | ⛔ **zolang dit ontbreekt gaat er geen aanroep uit** |
| `RESEND_API_KEY` op de function | ❌ ontbreekt | ⛔ zonder deze antwoordt de function `overgeslagen: resend_niet_geconfigureerd` |
| `FEEDBACK_MAIL_VAN` (geverifieerd domein) | ❌ ontbreekt | ⛔ zonder deze gaat alleen de beheerdersmail uit, niet de bevestiging aan de lezer |

Met andere woorden: **de leidingen liggen er en er staat nog geen druk op.** Dat is met opzet de
veilige tussenstand — niets in de app of de database gedraagt zich anders dan gisteren.

## De keten

```
FeedbackModal  →  insert public.feedback  →  trigger stuur_feedback_meldingen()
                                                   │  net.http_post (asynchroon)
                                                   ▼
                                          send-feedback-email
                                            ├─ leest de rij terug (service role)
                                            ├─ haalt het adres uit auth.users
                                            ├─ haalt de taal uit profiles.language
                                            ├─ Resend → beheerder   (met Reply-To = de lezer)
                                            └─ Resend → de lezer    (bevestiging, 4 talen)
```

Vier dingen die bewust zo zijn, en die je niet moet "vereenvoudigen":

- **De trigger kan de insert niet laten mislukken.** `after insert`, een `exception`-blok dat alles
  opvangt, en `net.http_post` dat het verzoek in een wachtrij zet in plaats van erop te wachten.
  `feedback-modal.tsx` belooft dat "verzonden" hier verzonden betekent en houdt de getypte tekst
  vast als het misgaat; een mail die de rij meesleurt maakt van die belofte een leugen.
- **Zonder Vault-geheim gebeurt er niets**, precies zoals bij de cron `push-sweep-elk-uur`. Geen
  401 per feedbackregel, geen logregel, geen halve poging.
- **Alleen het id gaat over de lijn.** De function leest de rij zelf terug, dus in de mail staat
  per definitie wat er in de tabel staat. Herzenden is daardoor dezelfde POST met hetzelfde id.
- **Alleen de service role mag de function aanroepen**, net als bij `send-push`. `verify_jwt` laat
  elk geldig token door, dus ook dat van een gewone lezer; zonder de rolcontrole kan iedereen die
  inlogt een willekeurig `feedback_id` opgeven en zo het e-mailadres achter andermans bericht laten
  uitmailen.

## Waarom Resend, en niet "de ingebouwde mail van Supabase"

Supabase heeft geen dienst waarmee je zelf een mail verstuurt. Wat er wél is, is de SMTP-instelling
onder *Authentication → Emails*, en die doet precies één ding: de mails van GoTrue zelf
(bevestiging, wachtwoord vergeten, magic link). Er is geen API waarmee een edge function daar een
eigen bericht doorheen duwt, en de ingebouwde afzender is bovendien hard begrensd op een handvol
mails per uur.

Voor een transactionele mail heb je dus een aanbieder nodig. Deze function praat met **Resend**
(één `fetch` naar `https://api.resend.com/emails`, geen SDK, geen extra afhankelijkheid). Wil je
SendGrid, Postmark of je eigen SMTP-relay, dan is `verstuur()` in `index.ts` de enige functie die
je hoeft te vervangen — de rest weet niet wie het versturen doet.

## Instellen

### 1. Resend-account en API-sleutel

1. Maak een account op [resend.com](https://resend.com) **met het adres waar de feedback heen
   moet** (`businessdemore@gmail.com`). Dat is niet toevallig: zolang er geen eigen domein
   geverifieerd is, levert Resend uitsluitend af op het adres van de account zelf.
2. *API Keys → Create API Key*, rechten *Sending access*. De sleutel begint met `re_` en is
   daarna niet meer op te vragen.

### 2. De sleutel op de edge function zetten

Met de Supabase CLI:

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxx --project-ref nxwdhuuouhbmykgykbov
supabase secrets set FEEDBACK_MAIL_ADMIN=businessdemore@gmail.com --project-ref nxwdhuuouhbmykgykbov
```

Of zonder CLI: *Dashboard → Edge Functions → Secrets → Add new secret*.

| Naam | Verplicht | Wat het doet |
|---|---|---|
| `RESEND_API_KEY` | ja | Zonder deze doet de function niets en zegt dat ook (`overgeslagen`) |
| `FEEDBACK_MAIL_ADMIN` | nee | Waar de melding heen gaat; standaard `businessdemore@gmail.com` |
| `FEEDBACK_MAIL_VAN` | nee | Afzender op een **geverifieerd** domein, bijv. `Histora <feedback@histora.example>`. Ontbreekt hij, dan gaat de beheerdersmail vanaf `onboarding@resend.dev` en wordt de bevestiging aan de lezer **overgeslagen** |

`SUPABASE_URL` en `SUPABASE_SERVICE_ROLE_KEY` staan er al — die zet Supabase zelf op elke function.

### 3. Het Vault-geheim, dat de trigger in werking zet

De trigger vraagt het geheim `service_role_key` op en doet niets als het er niet is. Zetten:

```sql
select vault.create_secret(
  '<de service_role key uit Dashboard → Project Settings → API>',
  'service_role_key',
  'Voor pg_cron/pg_net-aanroepen naar edge functions'
);
```

> ⚠️ **Dit is hetzelfde geheim dat de cron `push-sweep-elk-uur` inert houdt.** Zet je het, dan gaat
> die sweep óók elk uur draaien. Dat is ongevaarlijk zolang Firebase niet is ingesteld: `push-sweep`
> controleert dat vóórdat hij iets claimt en antwoordt dan met `200 { overgeslagen:
> 'firebase_niet_geconfigureerd' }`, zonder een rij in `notifications_sent` te branden. Zie
> `README-push.md`. Wil je het toch los, dan is de job uit te zetten met
> `select cron.unschedule('push-sweep-elk-uur');`.

Weer uitzetten kan met `select vault.delete_secret(id) from vault.secrets where name =
'service_role_key';` — daarna is de feedbackmail meteen weer inert.

### 4. Een domein, voor de bevestiging aan de lezer

Dit is de enige stap waarvoor je iets buiten Supabase en Resend nodig hebt. Zonder geverifieerd
domein weigert Resend elke ontvanger behalve je eigen accountadres, en dan is een bevestiging aan
een willekeurige lezer een 403 per feedbackregel. Daarom wordt hij pas verstuurd zodra
`FEEDBACK_MAIL_VAN` gezet is.

*Resend → Domains → Add Domain*, de drie DNS-records (SPF, DKIM, en bij voorkeur DMARC) bij je
registrar zetten, wachten tot Resend `verified` zegt, en dan `FEEDBACK_MAIL_VAN` op een adres op
dat domein zetten.

**De app heeft nog geen domein.** `APP_DEEL_LINK` in `src/constants/app-info.ts` is een
placeholder (`histora.app.link`) en `PRIVACY_BELEID_URL` wijst naar GitHub Pages. Zolang dat zo is
werkt alleen de beheerdersmail, en dat is precies de helft die je nodig hebt om te weten dát er
feedback is.

## Testen

### Uit de app

1. Log in, open Profiel, tik het spreekwolkje.
2. Kies **Bug**, typ iets herkenbaars, verstuur. In de app hoort er niets te veranderen: dezelfde
   bevestiging als altijd.
3. Herhaal met **Idea**.
4. Kijk in de inbox van `FEEDBACK_MAIL_ADMIN`. Onderwerp: `[Histora] Bug: <eerste 60 tekens>`.
5. Antwoord op die mail — hij hoort naar de lezer te gaan, niet naar het afzenderadres.

### Zonder de app: één regel SQL

Elke insert vuurt de trigger, dus dit is dezelfde weg:

```sql
insert into public.feedback (user_id, soort, bericht, app_versie, platform)
values ('<een echte user_id>', 'idee', 'Test vanuit SQL', '1.0.0', 'android');
```

### De function los aanroepen

Handig om een mail opnieuw te sturen zonder een tweede rij te maken. **Dit vraagt de service-role
key** — met de publishable key krijg je terecht een 403.

```bash
curl -X POST "https://nxwdhuuouhbmykgykbov.supabase.co/functions/v1/send-feedback-email" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"feedback_id":"<uuid uit public.feedback>"}'
```

Verwachte antwoorden:

| Antwoord | Betekenis |
|---|---|
| `403 alleen_service_role` | Je gebruikte de publishable key of een lezerstoken. Goed zo. |
| `200 { overgeslagen: 'resend_niet_geconfigureerd' }` | `RESEND_API_KEY` staat er nog niet. |
| `200 { beheerder: 'verzonden', bevestiging: 'overgeslagen: geen_geverifieerd_domein' }` | Stap 4 is nog open; de beheerdersmail ging wél weg. |
| `200 { beheerder: 'verzonden', bevestiging: 'verzonden' }` | Alles staat. |
| `404 feedback_niet_gevonden` | Het id bestaat niet (of is verwijderd). |

## Debuggen

Er is bewust **geen `feedback_emails`-logtabel**. Wat een mail deed staat al op drie plekken, en
een vierde kopie die iemand moet onderhouden voegt niets toe:

1. **De logs van de function** — *Dashboard → Edge Functions → send-feedback-email → Logs*. Elke
   mislukking staat er als `console.error` met de statuscode en het antwoord van Resend erbij.
2. **Het antwoord dat pg_net bewaarde.** Dit is de plek die je zoekt als er in de app niets misging
   maar er ook niets aankwam:

   ```sql
   select created, status_code, content::text, error_msg
     from net._http_response
    order by created desc
    limit 10;
   ```

   Staat er niets: dan is de aanroep nooit gedaan, en ontbreekt het Vault-geheim. Staat er een
   time-out: de function draaide wel, maar langer dan de `timeout_milliseconds` van de trigger.
3. **Het dashboard van Resend** — *Emails* toont per bericht of het is afgeleverd, gebounced of
   als spam gemarkeerd. Dat is het enige van de drie dat over de laatste meter gaat.

Twee dingen die er ook níét zijn, en waarom:

- **Geen wachtrij en geen herpoging over aanroepen heen.** Mislukt de mail, dan blijft de rij in
  `public.feedback` staan en is er niets verloren — dat is de reden dat de feedback dáár landt en
  niet in een mailtje. Binnen één aanroep zit wél een herpoging, drie pogingen bij een 429 of een
  5xx, want dat is een hik en geen fout.
- **Geen mail bij een `update` of `delete`.** De trigger staat op `insert`. `public.feedback` heeft
  ook geen update- of delete-policy, dus er ís niets anders dat er gebeurt.

## Privacy

Dit voegt een **verwerker** toe die er nog niet was: het bericht, het e-mailadres en het
gebruiker-id van de lezer gaan naar Resend om afgeleverd te worden. `docs/privacy-policy.html`
beschrijft nu wel dat feedback wordt opgeslagen, maar niet dat er een mail over uitgaat naar een
derde partij. **Werk die pagina bij vóórdat je stap 1 t/m 3 doet** — de tekst hoort in dezelfde
alinea als die over feedback, samen met de verwerkingsregio die daar toch al ontbreekt (zie
`docs/README.md`).

De bevestigingsmail zelf is geen marketing en valt niet onder de e-mailvoorkeuren uit
`email-voorkeur-store.ts`: het is een transactioneel antwoord op iets dat de lezer zelf zojuist
verstuurde. Daarom staat er ook geen afmeldlink onder, maar wel een regel die uitlegt waaróm hij
hem krijgt.

## Opnieuw deployen

De function in `supabase/functions/send-feedback-email/index.ts` is de bron. Na een wijziging:

```bash
supabase functions deploy send-feedback-email --project-ref nxwdhuuouhbmykgykbov
```

Verandert het projectref (een fris Supabase-project), dan moet de URL in de trigger mee. Die staat
hardgecodeerd in `public.stuur_feedback_meldingen()`, net als in de cron-opdracht — een migratie
is de enige plek waar dat adres staat.
