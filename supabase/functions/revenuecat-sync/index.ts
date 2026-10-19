/**
 * `revenuecat-sync` — zet `public.user_subscriptions` gelijk aan wat RevenueCat over een lezer weet.
 *
 * Dit is sinds Billing de **enige** schrijver van premium. De app kan het niet meer: de
 * update-policy op de tabel is weg en de insert-policy laat alleen een gratis rij toe (zie
 * `supabase/billing-migratie.sql`). Deze function schrijft met de service role.
 *
 * Twee ingangen, één afhandeling:
 *
 * - **De webhook van RevenueCat.** `Authorization` is het geheim dat in het RevenueCat-dashboard
 *   bij de webhook staat (`REVENUECAT_WEBHOOK_AUTH`). De lezer(s) komen uit het event:
 *   `app_user_id`, plus `transferred_from`/`transferred_to` bij een TRANSFER.
 * - **De app, direct na een aankoop of herstel** (`src/lib/aankopen.ts`). `Authorization` is dan
 *   het Supabase-token van de lezer, en het id komt uit `auth.getUser(token)`, **nooit uit de
 *   body**. Zo kan een lezer alleen zijn eigen rij laten bijwerken, en dan nog alleen naar wat
 *   RevenueCat werkelijk over hem weet. Zonder deze ingang wacht de lezer na het betalen op een
 *   webhook die seconden tot minuten kan duren, en een gemiste webhook herstelt zich nu bij de
 *   volgende app-start.
 *
 * **`verify_jwt` staat uit**, en moet uit blijven: RevenueCat stuurt geen Supabase-JWT, dus de
 * gateway zou elke webhook weigeren. Beide ingangen controleren hun eigen geheim hieronder.
 *
 * **Het event wordt niet geloofd, alleen als aanleiding gebruikt.** Bij elke aanroep wordt de
 * actuele stand opgehaald bij `GET /v1/subscribers/{id}`. Webhooks kunnen in een andere volgorde
 * aankomen dan ze gebeurden (een RENEWAL na de EXPIRATION die erop volgde), en dan schrijft wie
 * het event leest een verouderde stand. Wie de stand opvraagt schrijft altijd die van nu.
 *
 * **Ontbrekende configuratie is hier een 500, anders dan in `push-sweep`.** Daar is een
 * overgeslagen melding een gemiste melding; hier is een overgeslagen webhook een lezer die betaald
 * heeft en geen Pro krijgt. RevenueCat probeert een mislukte webhook opnieuw — een 200 zou dat
 * verhinderen.
 *
 * **Handmatig toegekend premium wordt nooit afgepakt.** Een rij met `product_id = null` is met de
 * hand gezet (de testaccounts, het account van de eigenaar). Heeft RevenueCat voor zo'n lezer
 * geen lopend recht, dan blijft de rij staan zoals hij is.
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/** Het entitlement-id zoals het in het RevenueCat-dashboard heet. Zelfde waarde als in de app. */
const ENTITLEMENT = Deno.env.get('REVENUECAT_ENTITLEMENT')?.trim() || 'premium';

/** Een levenslang recht heeft geen einddatum; de tabel wil er wél een om `isPremium` te laten kloppen. */
const LEVENSLANG = '2100-01-01T00:00:00.000Z';

function antwoord(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

/** Vergelijkt twee strings in constante tijd, zodat het webhookgeheim niet teken voor teken te raden is. */
function gelijk(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let verschil = 0;
  for (let i = 0; i < a.length; i++) verschil |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return verschil === 0;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Alleen Supabase-user-id's. De app configureert RevenueCat met `appUserID = user.id`; een
 * `$RCAnonymousID:…` hoort bij niemand in onze tabel en wordt overgeslagen.
 */
function lezerIds(event: Record<string, unknown>): string[] {
  const ids = new Set<string>();
  const voegToe = (waarde: unknown) => {
    if (typeof waarde === 'string' && UUID.test(waarde)) ids.add(waarde.toLowerCase());
  };
  voegToe(event.app_user_id);
  voegToe(event.original_app_user_id);
  for (const sleutel of ['aliases', 'transferred_from', 'transferred_to']) {
    const lijst = event[sleutel];
    if (Array.isArray(lijst)) lijst.forEach(voegToe);
  }
  return [...ids];
}

type RcEntitlement = {
  expires_date: string | null;
  grace_period_expires_date?: string | null;
  product_identifier: string;
};

type RcAbonnement = {
  expires_date: string | null;
  period_type?: 'normal' | 'trial' | 'intro' | string;
  unsubscribe_detected_at?: string | null;
  store?: string;
};

type RcKlant = {
  subscriber: {
    entitlements: Record<string, RcEntitlement>;
    subscriptions: Record<string, RcAbonnement>;
  };
};

async function haalKlantOp(id: string, sleutel: string): Promise<RcKlant> {
  const res = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${sleutel}`, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`revenuecat_${res.status}: ${await res.text()}`);
  return (await res.json()) as RcKlant;
}

/** Het laatste van twee momenten; `null` betekent "loopt niet af" en wint dus altijd. */
function laatste(a: string | null | undefined, b: string | null | undefined): string | null {
  if (a === null) return null;
  if (!b) return a ?? null;
  if (!a) return b;
  return new Date(a) > new Date(b) ? a : b;
}

type Uitkomst = { userId: string; tier: 'free' | 'premium' | 'ongewijzigd'; eind?: string | null };

async function synchroniseer(
  // deno-lint-ignore no-explicit-any
  admin: any,
  userId: string,
  rcSleutel: string,
): Promise<Uitkomst> {
  const klant = await haalKlantOp(userId, rcSleutel);
  const recht = klant.subscriber.entitlements?.[ENTITLEMENT];
  const nu = Date.now();

  // De grace period telt mee: Google geeft een lezer met een mislukte betaling nog toegang
  // terwijl hij zijn kaart bijwerkt, en die toegang hoort hier dan ook te gelden.
  const eind = recht ? laatste(recht.expires_date, recht.grace_period_expires_date) : undefined;
  const actief = recht !== undefined && (eind === null || new Date(eind as string).getTime() > nu);

  if (actief && recht) {
    const abonnement = klant.subscriber.subscriptions?.[recht.product_identifier];
    const eindMoment = eind ?? LEVENSLANG;
    const { error } = await admin.from('user_subscriptions').upsert(
      {
        user_id: userId,
        tier: 'premium',
        subscription_ends_at: eindMoment,
        trial_ends_at: abonnement?.period_type === 'trial' ? eindMoment : null,
        // Opgezegd is nog geen verlopen: de lezer houdt Pro tot de einddatum, alleen verlengt
        // het niet meer. `auto_renew` is wat Instellingen daarover zegt.
        auto_renew: eind !== null && !abonnement?.unsubscribe_detected_at,
        product_id: recht.product_identifier,
        winkel: abonnement?.store ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );
    if (error) throw error;
    return { userId, tier: 'premium', eind: eindMoment };
  }

  // Geen lopend recht. Alleen een rij die RevenueCat zelf ooit op premium zette gaat terug naar
  // gratis; een met de hand toegekend premium (product_id null) blijft staan.
  const { data: rij, error: leesFout } = await admin
    .from('user_subscriptions')
    .select('tier, product_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (leesFout) throw leesFout;
  if (!rij || rij.product_id === null || rij.tier !== 'premium') {
    return { userId, tier: 'ongewijzigd' };
  }

  const { error } = await admin
    .from('user_subscriptions')
    .update({ tier: 'free', auto_renew: false, trial_ends_at: null, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw error;
  return { userId, tier: 'free' };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return antwoord(405, { fout: 'alleen_post' });

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const rcSleutel = Deno.env.get('REVENUECAT_SECRET_KEY')?.trim();
  const webhookGeheim = Deno.env.get('REVENUECAT_WEBHOOK_AUTH')?.trim();

  if (!supabaseUrl || !serviceRole) return antwoord(500, { fout: 'supabase_niet_geconfigureerd' });
  // Een 500 en geen 200: zie de kop van dit bestand. RevenueCat moet het later opnieuw proberen.
  if (!rcSleutel) return antwoord(500, { fout: 'revenuecat_niet_geconfigureerd' });

  const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
  const kop = req.headers.get('Authorization')?.trim() ?? '';
  const token = kop.replace(/^Bearer\s+/i, '');

  let ids: string[];
  let bron: 'webhook' | 'app';

  if (webhookGeheim && (gelijk(kop, webhookGeheim) || gelijk(token, webhookGeheim))) {
    bron = 'webhook';
    let body: { event?: Record<string, unknown> };
    try {
      body = await req.json();
    } catch {
      return antwoord(400, { fout: 'geen_json' });
    }
    const event = body.event ?? {};
    // Het testevent uit het dashboard ("Send test event") bevestigt alleen dat de URL en het
    // geheim kloppen. Het noemt een verzonnen lezer, dus er valt niets te synchroniseren.
    if (event.type === 'TEST') return antwoord(200, { ok: true, test: true });
    ids = lezerIds(event);
    if (ids.length === 0) return antwoord(200, { ok: true, overgeslagen: 'geen_supabase_gebruiker' });
  } else {
    bron = 'app';
    const { data, error } = await admin.auth.getUser(token);
    if (error || !data.user) return antwoord(401, { fout: 'niet_ingelogd' });
    ids = [data.user.id];
  }

  try {
    const uitkomsten = [];
    for (const id of ids) uitkomsten.push(await synchroniseer(admin, id, rcSleutel));
    console.log(`[revenuecat-sync] ${bron}`, JSON.stringify(uitkomsten));
    return antwoord(200, { ok: true, bron, uitkomsten });
  } catch (fout) {
    console.error(`[revenuecat-sync] ${bron} mislukt`, fout);
    return antwoord(500, { fout: 'synchronisatie_mislukt', detail: String(fout) });
  }
});
