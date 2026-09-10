/**
 * `send-feedback-discord` — zet een nieuwe regel uit `public.feedback` als embed in Discord.
 *
 * Twee kanalen, gekozen op `soort`: bugmeldingen gaan naar het ene webhook, ideeën naar het
 * andere. De trigger `feedback_meldingen_na_insert` op `public.feedback` roept deze function aan;
 * de app (`src/components/feedback-modal.tsx`) weet hier niets van en is niet gewijzigd.
 *
 * Vijf dingen die bewust zo zijn:
 *
 * - **Dit hangt achter de insert, niet ervoor.** De trigger vuurt `after insert` en `net.http_post`
 *   is asynchroon, dus de rij staat er al voordat hier iets gebeurt. Een Discord-storing kost dus
 *   nooit de feedback zelf — precies de volgorde die `feedback-modal.tsx` belooft als het zegt dat
 *   "verzonden" hier verzonden betekent.
 * - **Alleen de service role mag hier aankloppen**, net als bij `send-push` en
 *   `send-feedback-email`. `verify_jwt` laat elk geldig token door, dus ook dat van een gewone
 *   lezer; zonder de rolcontrole kan iedereen die inlogt een willekeurig `feedback_id` opgeven en
 *   zo andermans bericht — inclusief diens e-mailadres — in jouw Discord laten zetten.
 * - **Alleen het id komt binnen; de rij wordt hier teruggelezen.** Zo staat er in Discord per
 *   definitie wat er in de tabel staat, en is opnieuw plaatsen dezelfde POST met hetzelfde id.
 * - **`allowed_mentions: { parse: [] }`, altijd.** Het bericht is door een gebruiker getypt. Zonder
 *   die regel is `@everyone` in een bugmelding een `@everyone` in de server. Mentions in een embed
 *   pingen op zichzelf al niet, maar dat is gedrag van Discord en geen garantie van ons.
 * - **Een mislukte webhook is een logregel, geen 500.** Er is niemand die het antwoord leest en
 *   erop handelt; wat er misging hoort in de logs en in de body, niet in een statuscode.
 *
 * **De webhook-URL's staan hieronder in de code**, zoals gevraagd — dan werkt deze function
 * meteen na het deployen, zonder een tweede stap. Ze zijn te overschrijven met de omgevings-
 * variabelen `DISCORD_WEBHOOK_BUG` en `DISCORD_WEBHOOK_IDEE`, wat de weg is om ze te wisselen
 * zonder de code aan te raken. ⚠️ **Een webhook-URL is een wachtwoord**: wie hem heeft kan in dat
 * kanaal plaatsen wat hij wil. `github.com/Demore2/chronicles` is een publieke repository, dus
 * zodra dit bestand gepusht wordt staan ze op straat. Zie `supabase/README-feedback-discord.md`.
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function antwoord(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

type FeedbackSoort = 'bug' | 'idee';

type FeedbackRij = {
  id: string;
  user_id: string;
  soort: FeedbackSoort;
  bericht: string;
  app_versie: string | null;
  platform: string | null;
  created_at: string;
};

// --------------------------------------------------------------------------------------------
// De twee kanalen
// --------------------------------------------------------------------------------------------

/** Kanaal "Buggsy". */
const WEBHOOK_BUG =
  'https://discord.com/api/webhooks/1547696764289548378/gSdvRA3oExkD5jtyGwXdCPPJ4Y261ntV3TnY2YvmWSeM9_RYxAfsBLCu-gGKssljQa45';

/** Kanaal "Smartass". */
const WEBHOOK_IDEE =
  'https://discord.com/api/webhooks/1547697059975405689/KwjFSnBBMUlXCqxiDKtU1vTP-WQ9bQxpuYWYIek4XxvTaUxMxXkXY3oM9M52MOH-8QCt';

function webhookVoor(soort: FeedbackSoort): string {
  const uitOmgeving =
    soort === 'bug'
      ? Deno.env.get('DISCORD_WEBHOOK_BUG')
      : Deno.env.get('DISCORD_WEBHOOK_IDEE');
  return uitOmgeving?.trim() || (soort === 'bug' ? WEBHOOK_BUG : WEBHOOK_IDEE);
}

/** Rood voor bugs, blauw voor ideeën. Discord wil een getal, geen `#rrggbb`. */
const KLEUR: Record<FeedbackSoort, number> = {
  bug: 0xff0000,
  idee: 0x0099ff,
};

const LABEL: Record<FeedbackSoort, string> = {
  bug: '🐛 Bug report',
  idee: '💡 Idea',
};

/** Gelijk aan de `check`-constraint op `public.feedback.bericht` en aan `MAX_TEKENS` in de app. */
const MAX_TEKENS = 2000;

/** Boven deze lengte krijgt de embed een regel die zegt hoe lang het bericht is. */
const LANG_VANAF = 280;

/** Harde grens van Discord op een embed-description. Ons bericht past er ruim in; dit is vangnet. */
const MAX_DESCRIPTION = 4000;

// --------------------------------------------------------------------------------------------
// De embed
// --------------------------------------------------------------------------------------------

type Veld = { name: string; value: string; inline?: boolean };

/**
 * Een leeg veld bestaat niet in Discord: een `value` van lege tekst maakt de hele POST ongeldig
 * (400 `BASE_TYPE_REQUIRED`). Eén streepje is het gebruikelijke antwoord daarop.
 */
function veld(naam: string, waarde: string | null | undefined, inline = true): Veld {
  return { name: naam, value: waarde && waarde.length > 0 ? waarde : '—', inline };
}

function bouwEmbed(
  rij: FeedbackRij,
  lezerEmail: string | null,
  projectRef: string | null
): Record<string, unknown> {
  const velden: Veld[] = [
    veld('Platform', rij.platform),
    veld('App version', rij.app_versie),
    veld('Submitted', `<t:${Math.floor(new Date(rij.created_at).getTime() / 1000)}:R>`),
  ];

  // Het adres is een gunst voor wie antwoordt en niet meer dan dat; ontbreekt het, dan blijft het
  // gebruiker-id over en dat is genoeg om de rij terug te vinden.
  if (lezerEmail) velden.push(veld('From', lezerEmail, false));
  velden.push(veld('User ID', `\`${rij.user_id}\``, false));

  if (rij.bericht.length > LANG_VANAF) {
    velden.push(veld('Length', `${rij.bericht.length} / ${MAX_TEKENS} characters`, true));
  }

  if (projectRef) {
    velden.push(
      veld(
        'Dashboard',
        `[Open the feedback table](https://supabase.com/dashboard/project/${projectRef}/editor)`,
        false
      )
    );
  }

  return {
    title: LABEL[rij.soort],
    // Het bericht zelf, zonder opsmuk. Markdown erin rendert gewoon; dat is voor een tekst die
    // iemand zelf typte eerder een dienst dan een probleem, en pingen kan het niet (zie
    // `allowed_mentions` hieronder).
    description: rij.bericht.slice(0, MAX_DESCRIPTION),
    color: KLEUR[rij.soort],
    fields: velden,
    timestamp: new Date(rij.created_at).toISOString(),
    footer: { text: `Histora · ${rij.id}` },
  };
}

// --------------------------------------------------------------------------------------------
// Versturen
// --------------------------------------------------------------------------------------------

type Uitkomst = { ok: true; status: number } | { ok: false; fout: string };

/**
 * Drie pogingen, en alleen bij iets dat vanzelf overgaat: een 429 of een 5xx. Een 404 (webhook
 * verwijderd) of een 400 (embed niet geldig) gaat bij poging drie niet ineens lukken.
 *
 * Discord vertelt bij een 429 zélf hoe lang je moet wachten, in `retry_after` (seconden, met
 * decimalen). Dat getal gebruiken is beter dan een eigen verdubbeling: bij een webhook-limiet van
 * vijf berichten per twee seconden is de echte wachttijd meestal een fractie van een seconde, en
 * blind een seconde wachten maakt van een hik een vertraging.
 */
const POGINGEN = 3;
const STANDAARD_WACHT_MS = 800;

async function plaats(webhook: string, embed: Record<string, unknown>): Promise<Uitkomst> {
  let laatste = 'onbekend';

  for (let poging = 1; poging <= POGINGEN; poging++) {
    let respons: Response;
    try {
      respons = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [embed],
          // Het bericht is door een gebruiker getypt. Zonder deze regel is `@everyone` in een
          // bugmelding een `@everyone` in de server.
          allowed_mentions: { parse: [] },
        }),
      });
    } catch (fout) {
      laatste = `netwerk: ${String(fout)}`;
      console.error(`[send-feedback-discord] poging ${poging}: ${laatste}`);
      if (poging < POGINGEN) await new Promise((r) => setTimeout(r, STANDAARD_WACHT_MS * poging));
      continue;
    }

    if (respons.ok) {
      console.log(`[send-feedback-discord] geplaatst (${respons.status}) na poging ${poging}`);
      return { ok: true, status: respons.status };
    }

    const tekst = await respons.text();
    laatste = `${respons.status} ${tekst.slice(0, 300)}`;
    console.error(`[send-feedback-discord] poging ${poging}: ${laatste}`);

    if (poging === POGINGEN) break;

    if (respons.status === 429) {
      let wacht = STANDAARD_WACHT_MS;
      try {
        const seconden = JSON.parse(tekst)?.retry_after;
        if (typeof seconden === 'number') wacht = Math.min(Math.ceil(seconden * 1000) + 100, 10000);
      } catch {
        // Geen JSON terug: dan is de standaardwachttijd wat we hebben.
      }
      await new Promise((r) => setTimeout(r, wacht));
      continue;
    }

    if (respons.status >= 500) {
      await new Promise((r) => setTimeout(r, STANDAARD_WACHT_MS * poging));
      continue;
    }

    // 4xx anders dan 429: hier verandert wachten niets aan.
    break;
  }

  return { ok: false, fout: laatste };
}

// --------------------------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return antwoord(405, { error: 'method_not_allowed' });

  // --- Alleen de service role ---
  //
  // Staat vóór alles, om dezelfde reden als in `send-push`: de poort laat elk geldig token door,
  // en de body bevat een `feedback_id` dat van iedereen kan zijn.
  const header = req.headers.get('Authorization') ?? '';
  const jwt = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  let rol = '';
  try {
    rol = JSON.parse(atob(jwt.split('.')[1] ?? '')).role ?? '';
  } catch {
    rol = '';
  }
  if (rol !== 'service_role') return antwoord(403, { error: 'alleen_service_role' });

  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) {
    console.error('[send-feedback-discord] SUPABASE_URL of SUPABASE_SERVICE_ROLE_KEY ontbreekt');
    return antwoord(500, { error: 'server_niet_geconfigureerd' });
  }

  // `{ feedback_id }` is wat de trigger stuurt. `{ record }` is de vorm van een Database Webhook
  // uit het Supabase-dashboard; die ook accepteren kost één regel en scheelt een aanroep die
  // zwijgend niets doet.
  let feedbackId = '';
  try {
    const body = await req.json();
    feedbackId = String(body?.feedback_id ?? body?.record?.id ?? '');
  } catch {
    return antwoord(400, { error: 'ongeldige_body' });
  }
  if (!feedbackId) return antwoord(400, { error: 'geen_feedback_id' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data: rij, error: leesFout } = await admin
    .from('feedback')
    .select('id, user_id, soort, bericht, app_versie, platform, created_at')
    .eq('id', feedbackId)
    .maybeSingle<FeedbackRij>();

  if (leesFout) {
    console.error('[send-feedback-discord] lezen mislukt:', leesFout.message);
    return antwoord(500, { error: 'lezen_mislukt', details: leesFout.message });
  }
  if (!rij) return antwoord(404, { error: 'feedback_niet_gevonden' });

  if (rij.soort !== 'bug' && rij.soort !== 'idee') {
    // Kan alleen na een schemawijziging met een derde soort. Luidruchtig, want dan is er een
    // kanaal bijgekomen dat hier nog niet bestaat en verdwijnt die feedback stilletjes.
    console.error(`[send-feedback-discord] onbekende soort '${rij.soort}' voor ${rij.id}`);
    return antwoord(200, { ok: true, overgeslagen: 'onbekende_soort', soort: rij.soort });
  }

  // Het adres komt uit `auth.users`: dat is waar de lezer op inlogt en dus het enige adres dat
  // gegarandeerd van hem is. `profiles.email` is een kopie die kan achterlopen.
  const { data: gebruiker } = await admin.auth.admin.getUserById(rij.user_id);
  const lezerEmail = gebruiker?.user?.email ?? null;

  // Het projectref zit al in de URL (`https://<ref>.supabase.co`) en hoeft geen eigen variabele.
  const projectRef = url.match(/^https:\/\/([a-z0-9]+)\.supabase\./)?.[1] ?? null;

  const uitkomst = await plaats(webhookVoor(rij.soort), bouwEmbed(rij, lezerEmail, projectRef));

  return antwoord(200, {
    ok: true,
    feedback_id: rij.id,
    soort: rij.soort,
    kanaal: rij.soort === 'bug' ? 'bugs' : 'ideas',
    discord: uitkomst.ok ? 'geplaatst' : `mislukt: ${uitkomst.fout}`,
  });
});
