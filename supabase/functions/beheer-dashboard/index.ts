/**
 * `beheer-dashboard` — de externe cijfers voor het Overzicht van het beheerbord.
 *
 * Het bord (`docs/beheer/`) is een publieke statische pagina, dus de sleutels van RevenueCat,
 * Google en AdMob mogen daar nooit in. Deze function is de enige plek waar ze bestaan, als
 * secrets. Hij doet drie dingen:
 *
 * 1. **Toegang**: de aanroeper moet in `public.beheerders` staan. Dat vraagt hij aan
 *    `is_beheerder()` mét het token van de aanroeper, zodat het dezelfde regel is als op de rest van
 *    het bord. `verify_jwt` alleen laat elke ingelogde lezer door.
 * 2. **Ophalen** per bron, elk los: een bron zonder secrets antwoordt `niet_geconfigureerd`, een
 *    kapotte bron `fout` met een melding. Eén stuk API mag de andere drie nooit meenemen.
 * 3. **Cachen** in `public.beheer_cache` (`feedback-beheer-migratie-10.sql`). Het bord ververst
 *    elke minuut; zonder cache is dat 60 rondes per uur per open tabblad tegen vier API-quota.
 *    `{ vers: true }` slaat de cache over (de ↻-knop).
 *
 * Secrets (Supabase → Edge Functions → Secrets), per bron; ontbreekt er één, dan is die bron uit:
 *   RevenueCat:  REVENUECAT_V2_KEY (sk_…, v2, met "Charts & metrics" leesrecht), REVENUECAT_PROJECT_ID
 *   Google:      GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY (serviceaccount, voor Analytics én Play)
 *   Analytics:   GA4_PROPERTY_ID (het getal, niet de G-…-meet-id)
 *   AdMob:       ADMOB_CLIENT_ID, ADMOB_CLIENT_SECRET, ADMOB_REFRESH_TOKEN, ADMOB_PUBLISHER_ID (pub-…)
 *                AdMob kent geen serviceaccounts; het refresh-token komt uit
 *                `scripts/admob-refresh-token.mjs`.
 *   Play:        PLAY_REPORTS_BUCKET (pubsite_prod_…), PLAY_PACKAGE (standaard com.chronicles.historyapp)
 *
 * Deno-code: uitgesloten van tsconfig, eslint en .easignore, net als de andere functions.
 */

import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/** Hoe lang een antwoord in de cache blijft. Play werkt zijn rapporten maar één keer per dag bij. */
const TTL_MIN: Record<Bron, number> = { revenuecat: 60, analytics: 60, admob: 60, play: 360 };

type Bron = 'revenuecat' | 'analytics' | 'admob' | 'play';
type Uitkomst =
  | { status: 'ok'; opgehaald_op: string; data: unknown }
  | { status: 'niet_geconfigureerd'; ontbreekt: string[] }
  | { status: 'fout'; melding: string };

function antwoord(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function env(naam: string): string | undefined {
  const w = Deno.env.get(naam)?.trim();
  return w ? w : undefined;
}

/** Welke secrets ontbreken. Leeg = deze bron kan aan. */
function ontbrekend(...namen: string[]): string[] {
  return namen.filter((n) => !env(n));
}

// --------------------------------------------------------------------------------------------
// Data: datums
// --------------------------------------------------------------------------------------------

/** YYYY-MM-DD in Amsterdam, dezelfde dag als op het bord. */
function dagSleutel(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(d);
}
function dagenTerug(n: number): Date {
  return new Date(Date.now() - n * 86_400_000);
}

// --------------------------------------------------------------------------------------------
// Google: serviceaccount-token (zelfde aanpak als send-push)
// --------------------------------------------------------------------------------------------

function base64url(bytes: Uint8Array): string {
  let binair = '';
  for (const byte of bytes) binair += String.fromCharCode(byte);
  return btoa(binair).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
const base64urlTekst = (w: string) => base64url(new TextEncoder().encode(w));

/** PEM naar DER; accepteert echte regeleindes én letterlijke `\n` uit een geplakt JSON-bestand. */
function pemNaarDer(pem: string): Uint8Array {
  const schoon = pem
    .replace(/\\n/g, '\n')
    .replace(/-----BEGIN [^-]+-----/, '')
    .replace(/-----END [^-]+-----/, '')
    .replace(/\s+/g, '');
  const binair = atob(schoon);
  const uit = new Uint8Array(binair.length);
  for (let i = 0; i < binair.length; i++) uit[i] = binair.charCodeAt(i);
  return uit;
}

async function serviceaccountToken(scope: string): Promise<string> {
  const nu = Math.floor(Date.now() / 1000);
  const header = base64urlTekst(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64urlTekst(JSON.stringify({
    iss: env('GOOGLE_SA_EMAIL'),
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: nu,
    exp: nu + 3600,
  }));
  const sleutel = await crypto.subtle.importKey(
    'pkcs8',
    pemNaarDer(env('GOOGLE_SA_PRIVATE_KEY')!),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const handtekening = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', sleutel, new TextEncoder().encode(`${header}.${claims}`));
  const respons = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${base64url(new Uint8Array(handtekening))}`,
    }),
  });
  const data = await respons.json();
  if (!respons.ok || !data.access_token) throw new Error(`Google-token mislukt (${respons.status}): ${data.error_description || data.error || ''}`);
  return data.access_token;
}

async function googleJson(url: string, token: string, body?: unknown): Promise<any> {
  const respons = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const tekst = await respons.text();
  let data: any = null;
  try { data = JSON.parse(tekst); } catch { /* geen JSON */ }
  if (!respons.ok) throw new Error(`${respons.status}: ${data?.error?.message || tekst.slice(0, 200)}`);
  return data;
}

// --------------------------------------------------------------------------------------------
// RevenueCat — v2 metrics overview (vaste vensters van 28 dagen, los van de gekozen periode)
// --------------------------------------------------------------------------------------------

async function haalRevenueCat(): Promise<unknown> {
  const respons = await fetch(
    `https://api.revenuecat.com/v2/projects/${encodeURIComponent(env('REVENUECAT_PROJECT_ID')!)}/metrics/overview`,
    { headers: { Authorization: `Bearer ${env('REVENUECAT_V2_KEY')}` } },
  );
  const data = await respons.json().catch(() => null);
  if (!respons.ok) throw new Error(`${respons.status}: ${data?.message || 'RevenueCat weigerde'}`);
  const m: Record<string, { value: number; unit?: string }> = {};
  for (const x of data?.metrics ?? []) m[x.id] = { value: Number(x.value) || 0, unit: x.unit };
  return {
    mrr: m.mrr?.value ?? 0,
    omzet_28d: m.revenue?.value ?? 0,
    actieve_abonnementen: m.active_subscriptions?.value ?? 0,
    actieve_proeven: m.active_trials?.value ?? 0,
    nieuwe_klanten_28d: m.new_customers?.value ?? 0,
    actieve_gebruikers_28d: m.active_users?.value ?? 0,
    // RevenueCat geeft bedragen in de valuta van het project; meestal "$".
    valuta: m.mrr?.unit || m.revenue?.unit || '$',
  };
}

// --------------------------------------------------------------------------------------------
// Google Analytics 4 — Data API, één batch van vijf rapporten
// --------------------------------------------------------------------------------------------

async function haalAnalytics(dagen: number): Promise<unknown> {
  const token = await serviceaccountToken('https://www.googleapis.com/auth/analytics.readonly');
  const bereik = [{ startDate: `${dagen - 1}daysAgo`, endDate: 'today' }];
  const data = await googleJson(
    `https://analyticsdata.googleapis.com/v1beta/properties/${env('GA4_PROPERTY_ID')}:batchRunReports`,
    token,
    {
      requests: [
        {
          dateRanges: bereik,
          metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'sessions' }, { name: 'averageSessionDuration' }, { name: 'screenPageViews' }],
        },
        {
          dateRanges: bereik,
          dimensions: [{ name: 'date' }],
          metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }],
          orderBys: [{ dimension: { dimensionName: 'date' } }],
        },
        {
          dateRanges: bereik,
          dimensions: [{ name: 'unifiedScreenName' }],
          metrics: [{ name: 'screenPageViews' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 8,
        },
        {
          dateRanges: bereik,
          dimensions: [{ name: 'country' }],
          metrics: [{ name: 'activeUsers' }],
          orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
          limit: 6,
        },
        {
          dateRanges: bereik,
          dimensions: [{ name: 'appVersion' }],
          metrics: [{ name: 'activeUsers' }],
          orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
          limit: 5,
        },
      ],
    },
  );
  const [totaal, perDag, schermen, landen, versies] = data.reports ?? [];
  const getal = (r: any, i: number) => Number(r?.metricValues?.[i]?.value) || 0;
  const t = totaal?.rows?.[0];
  const lijst = (rapport: any) => (rapport?.rows ?? []).map((r: any) => ({
    naam: r.dimensionValues?.[0]?.value || '(onbekend)',
    n: getal(r, 0),
  }));
  return {
    totaal: {
      actief: getal(t, 0),
      nieuw: getal(t, 1),
      sessies: getal(t, 2),
      gem_sessie_s: getal(t, 3),
      schermweergaven: getal(t, 4),
    },
    reeks: (perDag?.rows ?? []).map((r: any) => {
      const d = r.dimensionValues[0].value; // YYYYMMDD
      return { datum: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, actief: getal(r, 0), nieuw: getal(r, 1) };
    }),
    schermen: lijst(schermen),
    landen: lijst(landen),
    versies: lijst(versies),
  };
}

// --------------------------------------------------------------------------------------------
// AdMob — Network report per dag (OAuth met refresh-token, AdMob kent geen serviceaccounts)
// --------------------------------------------------------------------------------------------

async function admobToken(): Promise<string> {
  const respons = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: env('ADMOB_CLIENT_ID')!,
      client_secret: env('ADMOB_CLIENT_SECRET')!,
      refresh_token: env('ADMOB_REFRESH_TOKEN')!,
    }),
  });
  const data = await respons.json();
  if (!respons.ok || !data.access_token) throw new Error(`AdMob-token mislukt (${respons.status}): ${data.error_description || data.error || ''}`);
  return data.access_token;
}

function admobDatum(d: Date) {
  const [year, month, day] = dagSleutel(d).split('-').map(Number);
  return { year, month, day };
}

async function haalAdmob(dagen: number): Promise<unknown> {
  const token = await admobToken();
  const pub = env('ADMOB_PUBLISHER_ID')!.replace(/^ca-app-/, '');
  const rijen = await googleJson(
    `https://admob.googleapis.com/v1/accounts/${encodeURIComponent(pub)}/networkReport:generate`,
    token,
    {
      reportSpec: {
        dateRange: { startDate: admobDatum(dagenTerug(dagen - 1)), endDate: admobDatum(new Date()) },
        dimensions: ['DATE'],
        metrics: ['ESTIMATED_EARNINGS', 'IMPRESSIONS', 'CLICKS'],
        sortConditions: [{ dimension: 'DATE', order: 'ASCENDING' }],
        localizationSettings: { currencyCode: 'EUR' },
      },
    },
  );
  // Het antwoord is een lijst: een header, dan één `{ row }` per dag, dan een footer.
  const reeks = (Array.isArray(rijen) ? rijen : [])
    .filter((x: any) => x.row)
    .map((x: any) => {
      const d = x.row.dimensionValues.DATE.value; // YYYYMMDD
      const m = x.row.metricValues;
      return {
        datum: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
        verdiensten: Number(m.ESTIMATED_EARNINGS?.microsValue || 0) / 1e6,
        vertoningen: Number(m.IMPRESSIONS?.integerValue || 0),
        klikken: Number(m.CLICKS?.integerValue || 0),
      };
    });
  const som = (k: 'verdiensten' | 'vertoningen' | 'klikken') => reeks.reduce((s: number, r: any) => s + r[k], 0);
  const verdiensten = som('verdiensten');
  const vertoningen = som('vertoningen');
  return {
    valuta: 'EUR',
    totaal: {
      verdiensten,
      vertoningen,
      klikken: som('klikken'),
      // eCPM: wat duizend vertoningen opleveren. Zelf uitgerekend, dan klopt hij met het totaal.
      ecpm: vertoningen ? (verdiensten / vertoningen) * 1000 : 0,
    },
    reeks,
  };
}

// --------------------------------------------------------------------------------------------
// Google Play — maandelijkse install-rapporten in Cloud Storage (UTF-16, één dag vertraging)
// --------------------------------------------------------------------------------------------

function leesCsv(bytes: Uint8Array): string[][] {
  // Play schrijft UTF-16LE met een BOM; oudere rapporten soms UTF-8.
  const tekst = bytes[0] === 0xff && bytes[1] === 0xfe
    ? new TextDecoder('utf-16le').decode(bytes.subarray(2))
    : new TextDecoder('utf-8').decode(bytes);
  return tekst.split(/\r?\n/).filter((r) => r.trim()).map((r) => r.split(',').map((c) => c.replace(/^"|"$/g, '').trim()));
}

async function haalPlay(dagen: number): Promise<unknown> {
  const token = await serviceaccountToken('https://www.googleapis.com/auth/devstorage.read_only');
  const bucket = env('PLAY_REPORTS_BUCKET')!.replace(/^gs:\/\//, '').replace(/\/.*$/, '');
  const pakket = env('PLAY_PACKAGE') || 'com.chronicles.historyapp';

  // Alle maanden die de periode raakt (365 dagen = 13 bestanden). Een maand zonder rapport
  // (nog niet aangemaakt, of vóór de lancering) is geen fout.
  const maanden = new Set<string>();
  for (let i = 0; i < dagen; i++) maanden.add(dagSleutel(dagenTerug(i)).slice(0, 7).replace('-', ''));
  const perDag = new Map<string, { installaties: number; verwijderingen: number; actief: number }>();
  let gevonden = 0;

  for (const maand of [...maanden].sort()) {
    const pad = `stats/installs/installs_${pakket}_${maand}_overview.csv`;
    const respons = await fetch(
      `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(pad)}?alt=media`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (respons.status === 404) continue;
    if (!respons.ok) throw new Error(`${respons.status} op ${pad}: ${(await respons.text()).slice(0, 200)}`);
    gevonden++;
    const [kop, ...rijen] = leesCsv(new Uint8Array(await respons.arrayBuffer()));
    const kolom = (naam: string) => kop.findIndex((k) => k.toLowerCase() === naam.toLowerCase());
    const iDatum = kolom('Date');
    const iInst = kolom('Daily User Installs') >= 0 ? kolom('Daily User Installs') : kolom('Daily Device Installs');
    const iWeg = kolom('Daily User Uninstalls') >= 0 ? kolom('Daily User Uninstalls') : kolom('Daily Device Uninstalls');
    const iActief = kolom('Active Device Installs');
    for (const r of rijen) {
      perDag.set(r[iDatum], {
        installaties: Number(r[iInst]) || 0,
        verwijderingen: Number(r[iWeg]) || 0,
        actief: Number(r[iActief]) || 0,
      });
    }
  }
  if (!gevonden) throw new Error(`geen rapporten gevonden in ${bucket} voor ${pakket} (Play maakt ze pas na een dag aan, en rechten kunnen tot 24 uur duren)`);

  const vanaf = dagSleutel(dagenTerug(dagen - 1));
  const reeks = [...perDag.entries()]
    .filter(([d]) => d >= vanaf)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([datum, w]) => ({ datum, ...w }));
  return {
    totaal: {
      installaties: reeks.reduce((s, r) => s + r.installaties, 0),
      verwijderingen: reeks.reduce((s, r) => s + r.verwijderingen, 0),
    },
    actieve_installaties: reeks.at(-1)?.actief ?? 0,
    laatste_dag: reeks.at(-1)?.datum ?? null,
    reeks,
  };
}

// --------------------------------------------------------------------------------------------
// Per bron: configuratie, cache, ophalen
// --------------------------------------------------------------------------------------------

const BRONNEN: Record<Bron, { secrets: string[]; haal: (dagen: number) => Promise<unknown>; perPeriode: boolean }> = {
  revenuecat: { secrets: ['REVENUECAT_V2_KEY', 'REVENUECAT_PROJECT_ID'], haal: () => haalRevenueCat(), perPeriode: false },
  analytics: { secrets: ['GOOGLE_SA_EMAIL', 'GOOGLE_SA_PRIVATE_KEY', 'GA4_PROPERTY_ID'], haal: haalAnalytics, perPeriode: true },
  admob: { secrets: ['ADMOB_CLIENT_ID', 'ADMOB_CLIENT_SECRET', 'ADMOB_REFRESH_TOKEN', 'ADMOB_PUBLISHER_ID'], haal: haalAdmob, perPeriode: true },
  play: { secrets: ['GOOGLE_SA_EMAIL', 'GOOGLE_SA_PRIVATE_KEY', 'PLAY_REPORTS_BUCKET'], haal: haalPlay, perPeriode: true },
};

async function bron(admin: SupabaseClient, naam: Bron, dagen: number, vers: boolean): Promise<Uitkomst> {
  const b = BRONNEN[naam];
  const mist = ontbrekend(...b.secrets);
  if (mist.length) return { status: 'niet_geconfigureerd', ontbreekt: mist };

  const sleutel = b.perPeriode ? `${naam}:${dagen}` : naam;
  if (!vers) {
    const { data } = await admin.from('beheer_cache').select('data, opgehaald_op').eq('sleutel', sleutel).maybeSingle();
    if (data && Date.now() - new Date(data.opgehaald_op).getTime() < TTL_MIN[naam] * 60_000) {
      return { status: 'ok', opgehaald_op: data.opgehaald_op, data: data.data };
    }
  }
  try {
    const data = await b.haal(dagen);
    const opgehaald_op = new Date().toISOString();
    await admin.from('beheer_cache').upsert({ sleutel, data, opgehaald_op });
    return { status: 'ok', opgehaald_op, data };
  } catch (fout) {
    const melding = fout instanceof Error ? fout.message : String(fout);
    console.error(`[beheer-dashboard] ${naam}:`, melding);
    return { status: 'fout', melding };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return antwoord(405, { error: 'method_not_allowed' });

  const url = env('SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return antwoord(500, { error: 'server_niet_geconfigureerd' });

  const auth = req.headers.get('Authorization') ?? '';
  const token = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : '';
  if (!token) return antwoord(401, { error: 'geen_token' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Dezelfde regel als `is_beheerder()`: het e-mailadres van een geverifieerd token staat in
  // `beheerders`. `getUser(token)` laat GoTrue het token controleren; zelf decoderen zou een
  // vervalst token accepteren.
  const { data: gebruiker, error: tokenFout } = await admin.auth.getUser(token);
  const email = gebruiker?.user?.email?.toLowerCase();
  if (tokenFout || !email) return antwoord(401, { error: 'ongeldig_token' });
  const { data: beheerders } = await admin.from('beheerders').select('email');
  if (!(beheerders ?? []).some((b: { email: string }) => b.email?.toLowerCase() === email)) {
    return antwoord(403, { error: 'geen_beheerder' });
  }

  const body = await req.json().catch(() => ({}));
  const dagen = [7, 30, 84, 365].includes(Number(body?.dagen)) ? Number(body.dagen) : 30;
  const vers = body?.vers === true;
  const namen = Object.keys(BRONNEN) as Bron[];
  const uitkomsten = await Promise.all(namen.map((n) => bron(admin, n, dagen, vers)));
  return antwoord(200, {
    dagen,
    bronnen: Object.fromEntries(namen.map((n, i) => [n, uitkomsten[i]])),
  });
});
