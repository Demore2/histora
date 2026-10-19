# Billing: Google Play via RevenueCat

Hoe premium werkt, en wat er buiten de code nog moet gebeuren voordat iemand kan betalen.

```
App (react-native-purchases)  →  Google Play-aankoop
        │                              │
        │ appUserID = Supabase user.id │
        ▼                              ▼
   revenuecat-sync  ◀── webhook ── RevenueCat ── controleert de bon bij Google
        │
        │  GET /v1/subscribers/{id}  (de stand van nu, niet het event)
        ▼
public.user_subscriptions  →  subscription-store  →  useAbonnement()  →  Pro overal
```

- **Alleen `revenuecat-sync` zet premium.** Hij schrijft met de service role. Na de migratie
  heeft de app geen update-policy meer op `user_subscriptions`, en een insert mag alleen een
  gratis rij aanmaken.
- **De app laat Pro direct na het betalen zien** via `subscription-store.winkelPremiumTot`. Dat is
  alleen de weergave op dat toestel. Daarna vraagt hij `revenuecat-sync` om de serverrij bij te
  werken, en de webhook doet dat nog een keer.
- **Handmatig premium blijft staan.** Een rij met `product_id = null` (de testaccounts, het account
  van de eigenaar) wordt nooit door de sync naar free gezet.

## Stap voor stap

### 1. Supabase (eenmalig)

1. Lees `supabase/billing-migratie.sql` na en voer hem uit.
2. Deploy `supabase/functions/revenuecat-sync` met **`verify_jwt = false`**. RevenueCat stuurt geen
   Supabase-JWT; de function controleert zelf het webhookgeheim of het token van de lezer.
3. Zet de secrets van de function:
   - `REVENUECAT_SECRET_KEY`: de geheime API-sleutel (`sk_…`), uit RevenueCat → Project settings
     → API keys.
   - `REVENUECAT_WEBHOOK_AUTH`: een lange willekeurige string die je zelf kiest. Dezelfde waarde
     komt in stap 3.5.
   - Optioneel `REVENUECAT_ENTITLEMENT` als je entitlement niet `premium` heet.

### 2. Google Play Console

1. Een **betaalprofiel** (merchant account): Instellingen → Betalingsprofiel.
2. De app op een track met een build die **`react-native-purchases` bevat**. Zonder zo'n build laat
   de Console geen abonnementen aanmaken.
3. Monetisatie → Abonnementen: één abonnement `histora_pro` ("Histora Pro") met twee base plans,
   `monthly` en `yearly`. Een gratis proefperiode is een *offer* op het base plan
   (`trial-monthly`, `trial-yearly`), niet een apart product. Alles wat een lezer ziet is in het
   Engels (keuze van de eigenaar).
   **Gekozen op 2026-10-19:** €4,99/maand en €39,99/jaar (33% korting, €3,33/maand), met op
   beide base plans een offer van 7 dagen gratis voor *alleen nieuwe klanten*.
4. Een **serviceaccount** dat RevenueCat de aankopen laat controleren (RevenueCat legt de rechten
   stap voor stap uit onder *Google Play service credentials*).
5. Instellingen → License testing: je eigen Gmail erop, zodat testaankopen niets kosten.

### 3. RevenueCat

1. Project aanmaken, Android-app toevoegen met package `com.chronicles.historyapp`, en het
   JSON-bestand van het serviceaccount uploaden.
2. Producten importeren uit Play.
3. Entitlement **`premium`** aanmaken en beide producten eraan hangen.
4. Offering (de *current* offering) met twee packages: `$rc_monthly` en `$rc_annual`. De paywall
   herkent ze aan hun type (MONTHLY/ANNUAL).
5. Integrations → Webhooks:
   - URL `https://<project-ref>.supabase.co/functions/v1/revenuecat-sync`
   - Authorization header = de waarde van `REVENUECAT_WEBHOOK_AUTH`
   - Daarna "Send test event". Het antwoord hoort `{"ok":true,"test":true}` te zijn.

### 4. De app

1. De **publieke** Android-sleutel (`goog_…`) als `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`:
   - in `.env.local` voor lokale builds;
   - als EAS-projectvariabele (plain text, in development/preview/production) voor cloudbuilds:
     `npm run eas -- env:create`.
   Zonder deze sleutel blijft de paywall in de "binnenkort"-stand.
2. **Een nieuwe native build.** `react-native-purchases` is native, dus een JS-reload is niet
   genoeg: `npx expo run:android` voor de dev client, of `npm run build:android:prod` voor Play.
3. Testen met een license tester, op een echt toestel of een emulator **met Play Store**:
   - kopen → Instellingen toont Pro en "Abonnement beheren";
   - in Supabase: `tier = 'premium'` en een `product_id`;
   - opzeggen in Play → `auto_renew = false`, Pro blijft tot de einddatum;
   - testabonnementen verlopen snel (een maand is 5 minuten), daarna `tier = 'free'`.
4. Pas dan de vlaggen aan: `PRO_BANNER_ENABLED` (`pro-access-banner.tsx`) en eventueel
   `VERHAAL_LIMIET_ENABLED` (`constants/monetisatie.ts`). Ads (`ADS_ENABLED`,
   `AD_ONDERBREKING_ENABLED`) horen bij de AdMob-stap en blijven tot die tijd uit.
5. Werk de Data Safety-verklaring ("Purchase history") en `docs/privacy-policy.html` bij: RevenueCat
   is een nieuwe verwerker.

## Waar je op moet letten

- **Accountverwijdering:** `delete-account` wist de Supabase-rij, maar niet de klant bij
  RevenueCat, en zegt geen abonnement op. Google blijft afschrijven tot de lezer zelf opzegt in
  Play. Zeg dat in het verwijdervenster, of laat `delete-account` RevenueCats
  `DELETE /v1/subscribers/{id}` aanroepen.
- **Iemand die op twee accounts inlogt met hetzelfde Google-account:** RevenueCat verplaatst het
  abonnement naar het account dat herstelt (TRANSFER). De webhook werkt dan beide rijen bij.
- **iOS** staat bewust uit (`lib/aankopen.ts` laadt alleen op Android). Daarvoor is een
  `appl_…`-sleutel en een App Store-product nodig.
