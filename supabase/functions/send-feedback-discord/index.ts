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
 * **Het bericht leeft mee met het feedbackbord** (`docs/beheer/`). Bij plaatsen vragen we Discord
 * met `?wait=true` om het bericht terug en bewaren we het id in `feedback.discord_bericht_id`.
 * De trigger `feedback_discord_na_update` roept ons daarna met `actie: 'bijwerken'` aan zodra
 * status of toewijzing verandert: dan wordt hetzelfde bericht ge-PATCHt (kleur, status, wie het
 * oppakt) in plaats van dat er een tweede bij komt. Een bewerking pingt in Discord nooit, dus
 * een toewijzing aan de ánder krijgt een eigen kort bericht met alleen díe beheerder in
 * `allowed_mentions.users`; jezelf toewijzen blijft stil. Is het oorspronkelijke bericht weg
 * (404), dan blijft het weg: alleen een nieuw ticket plaatst een bericht.
 *
 * **De webhook-URL's staan in de secrets `DISCORD_WEBHOOK_BUG` / `DISCORD_WEBHOOK_IDEE`, niet in
 * de code.** Een webhook-URL is een wachtwoord en `github.com/Demore2/histora` is publiek. Zie
 * `webhookVoor` hieronder.
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
  status: TicketStatus;
  toegewezen_aan: string | null;
  discord_bericht_id: string | null;
};

type TicketStatus = 'nieuw' | 'in_behandeling' | 'wacht' | 'klaar';

type Beheerder = { id: string; naam: string; discord_id: string | null };

/** Waar het bord staat; komt als link in elke embed. */
const BORD_URL = 'https://demore2.github.io/histora/beheer/';

// --------------------------------------------------------------------------------------------
// De twee kanalen
// --------------------------------------------------------------------------------------------

/**
 * Uit de secrets van de function, nergens anders: deze repository is publiek, en een webhook-URL
 * is een wachtwoord. `DISCORD_WEBHOOK_BUG` hoort bij "Bugs Bot" (kanaal Buggsy),
 * `DISCORD_WEBHOOK_IDEE` bij "Idea Bot" (kanaal Smartass). De URL's die hier tot 2026-10-21 als
 * constante stonden zijn in Discord verwijderd.
 *
 * Let op bij wisselen: Discord laat een bericht alleen bewerken door de webhook die het plaatste.
 * Na een nieuwe webhook geeft PATCH op een oud bericht een 404, en `plaatsEmbed` plaatst het
 * ticket dan opnieuw — er komt dus één nieuw bericht per ticket dat daarna bijgewerkt wordt.
 */
function webhookVoor(soort: FeedbackSoort): string | null {
  const uitOmgeving =
    soort === 'bug'
      ? Deno.env.get('DISCORD_WEBHOOK_BUG')
      : Deno.env.get('DISCORD_WEBHOOK_IDEE');
  return uitOmgeving?.trim() || null;
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

/**
 * Zodra er iets mee gebeurt neemt de status de kleur over, met dezelfde kleuren als het bord:
 * oranje = iemand is ermee bezig, paars = wacht ergens op, groen = klaar. Een nieuw ticket houdt
 * de kleur van zijn soort.
 */
const STATUS_KLEUR: Partial<Record<TicketStatus, number>> = {
  in_behandeling: 0xfdab3d,
  wacht: 0x784bd1,
  klaar: 0x00c875,
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  nieuw: '🆕 New',
  in_behandeling: '🟠 In progress',
  wacht: '⏸️ Waiting',
  klaar: '✅ Done',
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
  projectRef: string | null,
  behandelaar: Beheerder | null
): Record<string, unknown> {
  const status: TicketStatus = rij.status ?? 'nieuw';
  const velden: Veld[] = [
    veld('Status', STATUS_LABEL[status]),
    // Een embed-mention pingt niet, maar toont wel de naam zoals Discord hem kent.
    veld(
      'Assigned to',
      behandelaar ? (behandelaar.discord_id ? `<@${behandelaar.discord_id}>` : behandelaar.naam) : null
    ),
    veld('Board', `[Open](${BORD_URL})`),
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
    title: status === 'klaar' ? `${LABEL[rij.soort]} — done` : LABEL[rij.soort],
    // Het bericht zelf, zonder opsmuk. Markdown erin rendert gewoon; dat is voor een tekst die
    // iemand zelf typte eerder een dienst dan een probleem, en pingen kan het niet (zie
    // `allowed_mentions` hieronder).
    description: rij.bericht.slice(0, MAX_DESCRIPTION),
    color: STATUS_KLEUR[status] ?? KLEUR[rij.soort],
    fields: velden,
    timestamp: new Date(rij.created_at).toISOString(),
    footer: { text: `Histora · ${rij.id}` },
  };
}

// --------------------------------------------------------------------------------------------
// Versturen
// --------------------------------------------------------------------------------------------

type Uitkomst =
  | { ok: true; status: number; data: Record<string, unknown> | null }
  | { ok: false; status: number | null; fout: string };

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

/**
 * Eén verzoek naar Discord, met de pogingen hierboven. `payload` moet zelf al
 * `allowed_mentions` bevatten — zie `plaatsEmbed` en `pingBehandelaar`.
 */
async function stuur(
  url: string,
  method: 'POST' | 'PATCH',
  payload: Record<string, unknown>
): Promise<Uitkomst> {
  let laatste = 'onbekend';
  let laatsteStatus: number | null = null;

  for (let poging = 1; poging <= POGINGEN; poging++) {
    let respons: Response;
    try {
      respons = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (fout) {
      laatste = `netwerk: ${String(fout)}`;
      console.error(`[send-feedback-discord] poging ${poging}: ${laatste}`);
      if (poging < POGINGEN) await new Promise((r) => setTimeout(r, STANDAARD_WACHT_MS * poging));
      continue;
    }

    if (respons.ok) {
      console.log(`[send-feedback-discord] ${method} ok (${respons.status}) na poging ${poging}`);
      let data: Record<string, unknown> | null = null;
      try {
        data = respons.status === 204 ? null : await respons.json();
      } catch {
        data = null;
      }
      return { ok: true, status: respons.status, data };
    }

    const tekst = await respons.text();
    laatsteStatus = respons.status;
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

  return { ok: false, status: laatsteStatus, fout: laatste };
}

/**
 * Plaatst de embed, of werkt het bestaande bericht bij als we het id hebben. `?wait=true` is
 * wat Discord het bericht laat teruggeven — zonder dat is het antwoord een lege 204 en kunnen
 * we het nooit meer terugvinden.
 */
async function plaatsEmbed(
  webhook: string,
  embed: Record<string, unknown>,
  berichtId: string | null,
  magPlaatsen: boolean
): Promise<{ uitkomst: Uitkomst; berichtId: string | null; kanaalId: string | null }> {
  // Het bericht is door een gebruiker getypt. Zonder deze regel is `@everyone` in een
  // bugmelding een `@everyone` in de server.
  const payload = { embeds: [embed], allowed_mentions: { parse: [] } };

  if (berichtId) {
    const bewerkt = await stuur(`${webhook}/messages/${berichtId}`, 'PATCH', payload);
    if (bewerkt.ok) {
      return {
        uitkomst: bewerkt,
        berichtId,
        kanaalId: typeof bewerkt.data?.channel_id === 'string' ? bewerkt.data.channel_id : null,
      };
    }
    // Elke andere fout dan 404 geven we door — opnieuw plaatsen zou een dubbel bericht opleveren.
    if (bewerkt.status !== 404) return { uitkomst: bewerkt, berichtId, kanaalId: null };
  }

  // Een bijwerking vanaf het bord plaatst nooit iets nieuws: is het bericht weggehaald (404) of
  // nooit bewaard, dan blijft het weg. Een statuswijziging hoort in Discord stil te zijn; alleen
  // een nieuw ticket komt binnen als bericht (wens van de eigenaar, 2026-10-21).
  if (!magPlaatsen) {
    return { uitkomst: { ok: true, status: 204, data: null }, berichtId: null, kanaalId: null };
  }

  const geplaatst = await stuur(`${webhook}?wait=true`, 'POST', payload);
  const nieuwId = geplaatst.ok && typeof geplaatst.data?.id === 'string' ? geplaatst.data.id : null;
  const kanaalId =
    geplaatst.ok && typeof geplaatst.data?.channel_id === 'string' ? geplaatst.data.channel_id : null;
  return { uitkomst: geplaatst, berichtId: nieuwId, kanaalId };
}

/**
 * Een kort bericht dat precies één beheerder pingt. Bewerkingen pingen in Discord nooit, dus een
 * toewijzing moet wel een nieuw bericht zijn. `allowed_mentions.users` met alleen dat id: de
 * lezerstekst staat hier niet in, maar ook een fragment ervan mag niemand anders pingen.
 */
async function pingBehandelaar(
  webhook: string,
  behandelaar: Beheerder & { discord_id: string },
  rij: FeedbackRij,
  berichtId: string | null,
  kanaalId: string | null
): Promise<Uitkomst> {
  let link = '';
  if (berichtId && kanaalId) {
    // De guild staat niet in het bericht zelf, wel in de webhook.
    try {
      const info = await (await fetch(webhook)).json();
      if (typeof info?.guild_id === 'string') {
        link = ` → https://discord.com/channels/${info.guild_id}/${kanaalId}/${berichtId}`;
      }
    } catch {
      // Zonder link is de ping nog steeds de ping.
    }
  }
  const fragment = rij.bericht.replace(/\s+/g, ' ').slice(0, 80);
  const meer = rij.bericht.length > 80 ? '…' : '';
  return await stuur(`${webhook}?wait=true`, 'POST', {
    content: `📌 <@${behandelaar.discord_id}> ${LABEL[rij.soort]} assigned to you: “${fragment}${meer}”${link}`,
    allowed_mentions: { parse: [], users: [behandelaar.discord_id] },
  });
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
  //
  // `actie: 'bijwerken'` komt van de trigger `feedback_discord_na_update` (status of toewijzing
  // gewijzigd op het bord), met `vorige_toegewezen` zodat we alleen pingen bij een échte nieuwe
  // toewijzing. Zonder `actie` is het een nieuw ticket; heeft dat al een bericht, dan werken we
  // dat bij in plaats van een tweede te plaatsen, zodat opnieuw aanroepen veilig is.
  let feedbackId = '';
  let actie: 'plaats' | 'bijwerken' = 'plaats';
  let vorigeToegewezen: string | null = null;
  let door: string | null = null;
  try {
    const body = await req.json();
    feedbackId = String(body?.feedback_id ?? body?.record?.id ?? '');
    if (body?.actie === 'bijwerken') actie = 'bijwerken';
    vorigeToegewezen = typeof body?.vorige_toegewezen === 'string' ? body.vorige_toegewezen : null;
    // Welke beheerder de wijziging deed (uit de trigger). Wie zichzelf toewijst, pingen we niet.
    door = typeof body?.door === 'string' ? body.door : null;
  } catch {
    return antwoord(400, { error: 'ongeldige_body' });
  }
  if (!feedbackId) return antwoord(400, { error: 'geen_feedback_id' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data: rij, error: leesFout } = await admin
    .from('feedback')
    .select(
      'id, user_id, soort, bericht, app_versie, platform, created_at, status, toegewezen_aan, discord_bericht_id'
    )
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

  let behandelaar: Beheerder | null = null;
  if (rij.toegewezen_aan) {
    const { data } = await admin
      .from('beheerders')
      .select('id, naam, discord_id')
      .eq('id', rij.toegewezen_aan)
      .maybeSingle<Beheerder>();
    behandelaar = data ?? null;
  }

  const webhook = webhookVoor(rij.soort);
  if (!webhook) {
    // Een 200, geen 500: zelfde afweging als `resend_niet_geconfigureerd` in de mail-function.
    console.error(`[send-feedback-discord] geen webhook-secret voor soort '${rij.soort}'`);
    return antwoord(200, { ok: true, overgeslagen: 'webhook_niet_ingesteld', soort: rij.soort });
  }
  const { uitkomst, berichtId, kanaalId } = await plaatsEmbed(
    webhook,
    bouwEmbed(rij, lezerEmail, projectRef, behandelaar),
    rij.discord_bericht_id,
    actie === 'plaats'
  );

  if (berichtId && berichtId !== rij.discord_bericht_id) {
    const { error } = await admin
      .from('feedback')
      .update({ discord_bericht_id: berichtId })
      .eq('id', rij.id);
    if (error) console.error('[send-feedback-discord] bericht-id bewaren mislukt:', error.message);
  }

  let ping: string | null = null;
  if (
    actie === 'bijwerken' &&
    behandelaar?.discord_id &&
    behandelaar.id !== vorigeToegewezen &&
    behandelaar.id !== door &&
    rij.status !== 'klaar'
  ) {
    const p = await pingBehandelaar(
      webhook,
      behandelaar as Beheerder & { discord_id: string },
      rij,
      berichtId,
      kanaalId
    );
    ping = p.ok ? 'verstuurd' : `mislukt: ${p.fout}`;
  }

  return antwoord(200, {
    ok: true,
    feedback_id: rij.id,
    actie,
    soort: rij.soort,
    kanaal: rij.soort === 'bug' ? 'bugs' : 'ideas',
    discord: !uitkomst.ok
      ? `mislukt: ${uitkomst.fout}`
      : !berichtId
        ? 'bericht_bestaat_niet_meer'
        : berichtId === rij.discord_bericht_id
          ? 'bijgewerkt'
          : 'geplaatst',
    ping,
  });
});
