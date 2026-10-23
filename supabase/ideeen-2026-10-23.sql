-- =============================================================================================
-- Ideeënhub vullen (2026-10-23): de openstaande ideeën na de release van 1.3
-- =============================================================================================
--
-- Eén keer draaien in de SQL Editor. Een idee waarvan de titel al in de hub staat wordt
-- overgeslagen, dus nog een keer draaien maakt geen dubbele kaarten.
-- Status 'open', zonder eigenaar: toewijzen doe je op het bord.

insert into public.beheer_notities (soort, titel, inhoud, prioriteit, status)
select i.soort, i.titel, i.inhoud, i.prioriteit, 'open'
  from (values
    ('idee', 'Trends-tab vullen met Google Trends',
     'Een GitHub Action haalt elke dag Google Trends op voor een vaste lijst zoekwoorden (history app, learn history, history facts, ancient rome, …), slaat het op in Supabase en de Trends-tab toont: stijgende zoekwoorden, verwante zoekopdrachten en verschillen per land. Voor ads én TikTok/Instagram-content. Let op: geen officiële API, dus het kan af en toe haperen. Mike levert de lijst zoekwoorden.',
     'medium'),
    ('idee', 'Google Ads Keyword Planner koppelen',
     'Zodra Mike een Google Ads-account heeft: developer token aanvragen (duurt een paar dagen) en zoekvolumes + prijs per klik in de Trends-tab tonen, naast de trends. Tot die tijd: de Keyword Planner in Google Ads zelf is gratis.',
     'lang'),
    ('idee', 'Dukaten-pakketten voor echt geld (1.3b)',
     'Dukaten kopen als Play-consumable (bijv. €1,99 = 500 Dukaten) via RevenueCat; revenuecat-sync schrijft ze in dukaten_mutaties. De winkel toont nu "Ducat bundles are coming soon".',
     'hoog'),
    ('idee', 'Phoxy naast de quizvragen',
     'De vos verschijnt in het vragenpaneel na "Mark Complete": juichend bij een goed antwoord, bemoedigend bij een fout antwoord. Plaatjes liggen al klaar in assets/images/vos/.',
     'medium'),
    ('idee', 'Standaard een quizvraag per hoofdstuk in plaats van peilingen',
     'Met weinig lezers zeggen peilingen nog niets. Elk hoofdstuk krijgt standaard een quizvraag (generate-interactive-content.mjs, daarna nalezen en --apply). Vereist SUPABASE_SERVICE_ROLE_KEY in .env.local.',
     'medium'),
    ('taak', 'Geplande Expo-patch-update (npm audit)',
     '29 meldingen in npm audit, allemaal build-tooling of onbereikbaar. Niet blind npm audit fix draaien (dat tilt expo-router 57.0.7 → 57.0.29), maar een geplande Expo-patch-update met een testronde op de telefoon.',
     'lang'),
    ('idee', 'Nieuwe verhalen met betere afbeeldingen',
     'Zodra de Higgsfield-credits terug zijn: nieuwe verhalen met beelden van hogere kwaliteit dan de huidige AI-plaatjes. Geen aantallen in de store-tekst zetten.',
     'hoog'),
    ('idee', 'Hoorverhalen (voice) via Higgsfield',
     'Verhalen laten voorlezen met een stem uit Higgsfield; mogelijk een Pro-voordeel.',
     'lang'),
    ('idee', 'Vrienden uitnodigen: code invoeren',
     'De uitnodigingskant bestaat al (referral-store, public.referrals); de andere kant niet: een vriend die de code invoert. Dat wordt een security definer RPC. Daarna eventueel vrienden en elkaars streaks.',
     'medium'),
    ('idee', 'Levens-model (lives) overwegen',
     'Duolingo-achtig levens-model als extra verdienmodel. Bewust uitgesteld; eerst kijken hoe de streakbevriezers en Dukaten vallen.',
     'lang'),
    ('idee', 'Higgsfield-scène voor de lees-dia in de store',
     'Store-screenshots 1.3: dia 1, 3 en 4 zijn Higgsfield-scènes, dia 2 (leesscherm) nog het eigen sjabloon. Eén scène met groen scherm erbij; scripts/plaats-scherm.mjs zet het echte scherm erin.',
     'lang'),
    ('taak', 'Supabase MCP-koppeling repareren',
     'De OAuth faalt ("Resource must be a valid MCP endpoint"), waarschijnlijk door de query-parameters in de URL in .mcp.json. Daarna kan Claude zelf SQL draaien in plaats van via de SQL Editor.',
     'lang'),
    ('taak', 'Eigen SMTP voor de mailbevestiging',
     'Confirm email staat sinds 2026-10-22 uit omdat de Supabase-mailer geblokkeerd was. Alleen terugzetten met een eigen SMTP (Resend met eigen domein), en dan liever een captcha bij registratie tegen bots.',
     'lang'),
    ('idee', 'Play-downloads in de statistieken',
     'De tegel "Downloads (Google Play)" staat op "Nog niet gekoppeld". Play exporteert rapporten naar een Google Cloud-bucket; die dagelijks ophalen en in het bord tonen.',
     'lang')
  ) as i(soort, titel, inhoud, prioriteit)
 where not exists (
   select 1 from public.beheer_notities n where lower(btrim(n.titel)) = lower(btrim(i.titel))
 );
