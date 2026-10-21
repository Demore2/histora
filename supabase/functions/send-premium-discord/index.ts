/**
 * `send-premium-discord` — meldt in Discord dat iemand premium neemt, betalend wordt of opzegt.
 *
 * De trigger `premium_melding_na_wijziging` op `public.user_subscriptions` roept deze function aan
 * met `{ user_id, gebeurtenis }`. Die rij wordt geschreven door `revenuecat-sync` (na een aankoop
 * in de app of een webhook van RevenueCat); de app zelf weet hier niets van.
 *
 * Vier gebeurtenissen, door de trigger bepaald uit de oude en de nieuwe rij:
 *   proef      gratis → premium met een proefperiode           (ping)
 *   betalend   gratis → premium zonder proef, of proef → betaald (ping)
 *   opgezegd   auto_renew aan → uit terwijl premium nog loopt
 *   verlopen   premium → gratis
 *
 * Bewust zo:
 * - **Alleen de service role**, net als `send-feedback-discord`: `verify_jwt` laat ook een
 *   lezerstoken door, en dan kon iedereen die inlogt nep-aankopen in jullie kanaal zetten.
 * - **De rij wordt hier teruggelezen**, alleen het id komt binnen. Wat er in Discord staat is dus
 *   wat er in de tabel staat.
 * - **Pingen alleen bij goed nieuws** (proef en betalend), en dan alleen de beheerders met een
 *   `discord_id` — via `allowed_mentions.users`, zodat niets anders kan pingen.
 * - **De webhook staat in de secret `DISCORD_WEBHOOK_PREMIUM`**, niet in de code: deze repository
 *   is publiek. Ontbreekt hij, dan een 200 met `overgeslagen` — geen terugkerend alarm.
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

type Gebeurtenis = 'proef' | 'betalend' | 'opgezegd' | 'verlopen';

const OPMAAK: Record<Gebeurtenis, { titel: string; kleur: number; ping: boolean }> = {
  proef: { titel: '🎁 Nieuwe proefperiode', kleur: 0x1baf7a, ping: true },
  betalend: { titel: '💰 Nieuwe betalende abonnee', kleur: 0x00c875, ping: true },
  opgezegd: { titel: '😢 Abonnement opgezegd', kleur: 0xfdab3d, ping: false },
  verlopen: { titel: '⌛ Abonnement verlopen', kleur: 0x9699a6, ping: false },
};

function antwoord(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** `histora_pro:yearly` → "jaar". Zelfde regel als `beheer_statistieken`. */
function plan(productId: string | null): string {
  if (!productId) return '—';
  return /year|annual/i.test(productId) ? 'Jaar' : 'Maand';
}

function discordTijd(iso: string | null, stijl: 'D' | 'R' = 'D'): string {
  if (!iso) return '—';
  return `<t:${Math.floor(new Date(iso).getTime() / 1000)}:${stijl}>`;
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return antwoord(405, { error: 'method_not_allowed' });

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
  if (!url || !serviceKey) return antwoord(500, { error: 'server_niet_geconfigureerd' });

  const webhook = Deno.env.get('DISCORD_WEBHOOK_PREMIUM')?.trim();
  if (!webhook) {
    console.error('[send-premium-discord] secret DISCORD_WEBHOOK_PREMIUM ontbreekt');
    return antwoord(200, { ok: true, overgeslagen: 'webhook_niet_ingesteld' });
  }

  let userId = '';
  let gebeurtenis: Gebeurtenis | null = null;
  try {
    const body = await req.json();
    userId = String(body?.user_id ?? '');
    if (body?.gebeurtenis in OPMAAK) gebeurtenis = body.gebeurtenis;
  } catch {
    return antwoord(400, { error: 'ongeldige_body' });
  }
  if (!userId || !gebeurtenis) return antwoord(400, { error: 'user_id_of_gebeurtenis_ontbreekt' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data: abo } = await admin
    .from('user_subscriptions')
    .select('tier, product_id, trial_ends_at, subscription_ends_at, auto_renew')
    .eq('user_id', userId)
    .maybeSingle();
  const { data: gebruiker } = await admin.auth.admin.getUserById(userId);
  const email = gebruiker?.user?.email ?? null;

  // Hoeveel betalende abonnees er nu zijn — het getal waar je in het begin naar kijkt.
  const { count: betalend } = await admin
    .from('user_subscriptions')
    .select('user_id', { count: 'exact', head: true })
    .eq('tier', 'premium')
    .not('product_id', 'is', null)
    .is('trial_ends_at', null);

  const opmaak = OPMAAK[gebeurtenis];
  const velden = [
    { name: 'Plan', value: plan(abo?.product_id ?? null), inline: true },
    { name: 'Product', value: `\`${abo?.product_id ?? '—'}\``, inline: true },
  ];
  if (gebeurtenis === 'proef') {
    velden.push({ name: 'Proef loopt tot', value: discordTijd(abo?.trial_ends_at ?? null), inline: true });
  }
  if (gebeurtenis === 'betalend' || gebeurtenis === 'opgezegd') {
    velden.push({ name: 'Loopt tot', value: discordTijd(abo?.subscription_ends_at ?? null), inline: true });
  }
  velden.push({ name: 'Betalende abonnees nu', value: String(betalend ?? '—'), inline: true });
  if (email) velden.push({ name: 'Account', value: email, inline: false });

  let content: string | undefined;
  let mentions: string[] = [];
  if (opmaak.ping) {
    const { data: beheerders } = await admin.from('beheerders').select('discord_id');
    mentions = (beheerders ?? [])
      .map((b: { discord_id: string | null }) => b.discord_id)
      .filter((id: string | null): id is string => !!id);
    if (mentions.length) content = mentions.map((id) => `<@${id}>`).join(' ');
  }

  const respons = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      embeds: [{
        title: opmaak.titel,
        color: opmaak.kleur,
        fields: velden,
        timestamp: new Date().toISOString(),
        footer: { text: `Histora · ${userId}` },
      }],
      allowed_mentions: { parse: [], users: mentions },
    }),
  });

  if (!respons.ok) {
    const tekst = await respons.text();
    console.error(`[send-premium-discord] ${respons.status} ${tekst.slice(0, 300)}`);
    return antwoord(200, { ok: false, discord: `mislukt: ${respons.status}` });
  }
  return antwoord(200, { ok: true, gebeurtenis, discord: 'geplaatst' });
});
