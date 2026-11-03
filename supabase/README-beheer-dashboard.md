# Beheerbord: externe bronnen (`beheer-dashboard`)

Het Overzicht van `docs/beheer/` haalt RevenueCat, Google Analytics, AdMob en Google Play op via de
edge function `beheer-dashboard`. De pagina zelf is publiek en bevat geen sleutels; alles hieronder
staat als **secret** in Supabase (Dashboard → Edge Functions → Secrets). Elke bron gaat apart aan:
zolang een secret ontbreekt, zegt het bord "Nog niet ingesteld" en werkt de rest gewoon.

## 0. Eenmalig

1. `supabase/feedback-beheer-migratie-10.sql` in de SQL Editor draaien (de cachetabel).
2. Deployen:
   ```bash
   npx supabase login
   npx supabase functions deploy beheer-dashboard --project-ref nxwdhuuouhbmykgykbov
   ```
   `verify_jwt` blijft aan; de function controleert daarna zelf of je in `beheerders` staat.

## 1. RevenueCat (MRR, omzet, proefperiodes)

- app.revenuecat.com → Project settings → **API keys** → **+ New secret API key** → versie **V2**,
  rechten: **Charts & metrics → Read only**, de rest *No access*.
- `REVENUECAT_V2_KEY` = die `sk_…`. (De bestaande `REVENUECAT_SECRET_KEY` van `revenuecat-sync` is
  v1 en kan dit niet.)
- `REVENUECAT_PROJECT_ID` = het id in de adresbalk: `app.revenuecat.com/projects/<dit>/…`.

## 2. Google-serviceaccount (voor Analytics én Play)

- console.cloud.google.com, project **histora-183dd** (het Firebase-project).
- APIs & Services → Library → **Google Analytics Data API** → Enable.
- IAM & Admin → Service accounts → **Create**: `histora-dashboard`, geen rollen.
  → Keys → Add key → **JSON**. Uit dat bestand:
  - `GOOGLE_SA_EMAIL` = `client_email`
  - `GOOGLE_SA_PRIVATE_KEY` = `private_key` (de hele tekst, met BEGIN/END; `\n` mag blijven staan)
- Het JSON-bestand daarna wegzetten in je wachtwoordkluis, niet in de repo.

### Analytics
- analytics.google.com → Beheer → **Toegangsbeheer voor property** → + → het `client_email` als
  **Kijker**.
- `GA4_PROPERTY_ID` = Beheer → **Propertygegevens** → het property-id (alleen cijfers).

### Google Play (downloads)
- Play Console → **Gebruikers en rechten** → Nieuwe gebruikers uitnodigen → het `client_email`,
  accountrecht **App-informatie bekijken en bulkrapporten downloaden (alleen lezen)**.
- Play Console → **Rapporten downloaden → Statistieken** → "Cloud Storage-URI kopiëren", iets als
  `gs://pubsite_prod_1234567890/stats/installs/`.
  `PLAY_REPORTS_BUCKET` = alleen `pubsite_prod_1234567890`.
- Let op: het recht kan tot **24 uur** duren voordat het werkt (tot dan: 403 op het bord).

## 3. AdMob (advertentie-inkomsten)

AdMob kent geen serviceaccounts, dus dit is een eenmalige login met je eigen Google-account.

- Zelfde Cloud-project → Library → **AdMob API** → Enable.
- **Google Auth Platform / OAuth-toestemmingsscherm**: type *Extern*, naam "Histora beheer", je eigen
  e-mail als ondersteuning. Zet de publicatiestatus op **In productie**. In *Testen* verloopt een
  refresh-token na 7 dagen; in productie niet. Het scherm "app niet geverifieerd" bij het inloggen
  is dan normaal (Geavanceerd → doorgaan), want alleen jij gebruikt hem.
- Credentials → Create credentials → **OAuth client ID** → type **Desktop app**.
- In je terminal:
  ```powershell
  $env:ADMOB_CLIENT_ID="…"; $env:ADMOB_CLIENT_SECRET="…"; node scripts/admob-refresh-token.mjs
  ```
  Log in met het account dat bij AdMob hoort.
- Secrets: `ADMOB_CLIENT_ID`, `ADMOB_CLIENT_SECRET`, `ADMOB_REFRESH_TOKEN` (uit het script) en
  `ADMOB_PUBLISHER_ID` = `pub-5960565412463172`.

## Controleren

Op het bord: Overzicht → Bronnen. Elke bron staat op **Live** (met de tijd van ophalen), **Uit**
(met welke secrets ontbreken) of **Fout** (met de melding van de API). De ↻-knop haalt alles vers op;
anders cachet de function een uur (Play zes uur, want die rapporten lopen een dag achter).
