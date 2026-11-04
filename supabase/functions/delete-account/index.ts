/**
 * `delete-account` — verwijdert het account van de aanroeper, en al zijn gegevens.
 *
 * **Waarom dit een edge function is en geen `.delete()` in de app.**
 *
 * 1. De client kan `auth.users` niet aanraken. `supabase.auth.admin.deleteUser()` eist de
 *    service-role-sleutel, en die mag nooit in een app-bundel: wie hem eruit peutert kan elk
 *    account van elke lezer verwijderen. Hij bestaat alleen hier, als omgevingsvariabele.
 * 2. Rijen wissen vanuit de app zou sowieso niets doen. Op `profiles`, `voortgang`,
 *    `story_progress`, `character_unlocks`, `poll_responses` en `user_choices` staat RLS aan
 *    met alleen select/insert/update-policies. Een `delete` zonder policy raakt **nul rijen en
 *    geeft geen fout** — de app zou "verwijderd" melden terwijl alles er nog staat.
 * 3. Het hoeft ook niet: elke foreign key naar `auth.users` staat op `on delete cascade`.
 *    Eén `deleteUser` haalt de gebruiker én alle zes de tabellen leeg, in één transactie.
 *    Zes losse deletes zouden bij een fout halverwege een half account achterlaten.
 *
 * De function verwijdert **uitsluitend de aanroeper zelf**: het id komt uit het geverifieerde
 * token, nooit uit de request-body. Er is dus geen parameter waarmee je iemand anders opgeeft.
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

// ── Sign in with Apple intrekken ─────────────────────────────────────────────────────────────
//
// Secrets: APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY (de inhoud van het .p8-bestand, met
// "Sign in with Apple" aangevinkt bij de sleutel) en optioneel APPLE_CLIENT_ID (standaard de
// bundle id). Ontbreken ze, dan wordt er niets ingetrokken en gaat het verwijderen gewoon door.

const APPLE = 'https://appleid.apple.com';

function base64url(bytes: Uint8Array | string): string {
  const b = typeof bytes === 'string' ? new TextEncoder().encode(bytes) : bytes;
  let s = '';
  for (const byte of b) s += String.fromCharCode(byte);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Het client secret voor Apple: een ES256-JWT, getekend met de .p8-sleutel, 5 minuten geldig. */
async function appleClientSecret(teamId: string, keyId: string, clientId: string, pem: string) {
  const der = Uint8Array.from(
    atob(pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')),
    (c) => c.charCodeAt(0),
  );
  const sleutel = await crypto.subtle.importKey(
    'pkcs8',
    der.buffer as ArrayBuffer,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign'],
  );
  const nu = Math.floor(Date.now() / 1000);
  const kop = base64url(JSON.stringify({ alg: 'ES256', kid: keyId }));
  const inhoud = base64url(
    JSON.stringify({ iss: teamId, iat: nu, exp: nu + 300, aud: APPLE, sub: clientId }),
  );
  // WebCrypto levert ECDSA al als r||s (P1363), precies wat JWS voor ES256 wil.
  const handtekening = new Uint8Array(
    await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, sleutel, new TextEncoder().encode(`${kop}.${inhoud}`)),
  );
  return `${kop}.${inhoud}.${base64url(handtekening)}`;
}

async function trekAppleIn(code: string): Promise<string> {
  const teamId = Deno.env.get('APPLE_TEAM_ID');
  const keyId = Deno.env.get('APPLE_KEY_ID');
  const pem = Deno.env.get('APPLE_PRIVATE_KEY');
  const clientId = Deno.env.get('APPLE_CLIENT_ID') ?? 'com.chronicles.historyapp';
  if (!teamId || !keyId || !pem) return 'niet_geconfigureerd';

  try {
    const secret = await appleClientSecret(teamId, keyId, clientId, pem);

    // 1. Code inwisselen voor een refresh token (de code zelf kan niet ingetrokken worden).
    const wissel = await fetch(`${APPLE}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: secret,
        code,
        grant_type: 'authorization_code',
      }),
    });
    if (!wissel.ok) return `inwisselen_mislukt_${wissel.status}: ${await wissel.text()}`;
    const tokens = (await wissel.json()) as { refresh_token?: string; access_token?: string };
    const token = tokens.refresh_token ?? tokens.access_token;
    if (!token) return 'geen_token_van_apple';

    // 2. Intrekken. Een refresh token intrekken trekt de hele koppeling met deze app in.
    const intrek = await fetch(`${APPLE}/auth/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: secret,
        token,
        token_type_hint: tokens.refresh_token ? 'refresh_token' : 'access_token',
      }),
    });
    return intrek.ok ? 'ingetrokken' : `intrekken_mislukt_${intrek.status}`;
  } catch (fout) {
    return `fout: ${fout instanceof Error ? fout.message : String(fout)}`;
  }
}

Deno.serve(async (req: Request) => {
  // De browser stuurt een preflight voordat hij de POST met een Authorization-header doet.
  // Op Android bestaat die stap niet, maar de webpreview van deze app wel.
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return antwoord(405, { error: 'method_not_allowed' });

  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) {
    // Kan alleen bij een verkeerd geconfigureerd project. Luidruchtig falen: stilzwijgend
    // "gelukt" antwoorden op een verwijderverzoek is het ergste dat deze function kan doen.
    console.error('[delete-account] SUPABASE_URL of SUPABASE_SERVICE_ROLE_KEY ontbreekt');
    return antwoord(500, { error: 'server_niet_geconfigureerd' });
  }

  const header = req.headers.get('Authorization') ?? '';
  const token = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  if (!token) return antwoord(401, { error: 'geen_token' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // `getUser(token)` laat GoTrue het token controleren — handtekening, vervaldatum en of de
  // gebruiker nog bestaat. Zelf de payload uitlezen zou een vervalst token accepteren.
  const { data: gebruiker, error: tokenFout } = await admin.auth.getUser(token);
  if (tokenFout || !gebruiker.user) {
    return antwoord(401, { error: 'ongeldig_token' });
  }

  // Sign in with Apple (App Store-richtlijn 5.1.1(v)): de app stuurt een verse autorisatiecode mee
  // als de lezer met Apple is ingelogd. Intrekken mag het verwijderen nooit tegenhouden — het
  // account moet weg kunnen — dus een fout hier wordt gelogd en niet teruggegeven.
  let body: { appleAuthorizationCode?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    // Geen of geen geldige body: oudere app-versies sturen niets mee.
  }
  if (typeof body.appleAuthorizationCode === 'string' && body.appleAuthorizationCode) {
    const uitkomst = await trekAppleIn(body.appleAuthorizationCode);
    console.log('[delete-account] apple intrekken:', uitkomst);
  }

  const { error: verwijderFout } = await admin.auth.admin.deleteUser(gebruiker.user.id);
  if (verwijderFout) {
    console.error('[delete-account] verwijderen mislukt:', verwijderFout.message);
    return antwoord(500, { error: 'verwijderen_mislukt', details: verwijderFout.message });
  }

  return antwoord(200, { ok: true });
});
