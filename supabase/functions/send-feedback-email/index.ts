/**
 * `send-feedback-email` — stuurt de twee mails die bij één feedbackregel horen.
 *
 * De app schrijft een rij in `public.feedback` (zie `src/components/feedback-modal.tsx`) en is
 * daarmee klaar. Een trigger op die tabel roept deze function aan, en die stuurt:
 *
 * 1. een **melding aan de beheerder** — de tekst, met wie, welke versie en welk platform erbij,
 *    en `Reply-To` op het adres van de lezer, zodat antwoorden gewoon antwoorden is;
 * 2. een **ontvangstbevestiging aan de lezer** — in zijn eigen taal, met zijn eigen tekst erin,
 *    zodat "verzonden" ook buiten de app bevestigd wordt.
 *
 * Vier dingen die bewust zo zijn:
 *
 * - **Dit hangt achter de insert, niet ervoor.** De trigger vuurt `after insert` en `net.http_post`
 *   is asynchroon, dus de rij staat er al voordat hier iets gebeurt. Een mail die niet weggaat
 *   kost dus nooit de feedback zelf — precies de volgorde die `feedback-modal.tsx` belooft als
 *   het zegt dat "verzonden" hier verzonden betekent.
 * - **Alleen de service role mag hier aankloppen**, net als bij `send-push`. `verify_jwt` laat elk
 *   geldig token door, dus ook dat van een gewone lezer; zonder deze controle kan iedereen die
 *   inlogt een willekeurig `feedback_id` opgeven en zo de mail over andermans bericht laten
 *   versturen — inclusief diens e-mailadres in de kop. De trigger stuurt de service-role-sleutel
 *   uit de Vault mee.
 * - **Ontbrekende configuratie is een 200, geen 500.** Zonder `RESEND_API_KEY` is er niets om mee
 *   te versturen; dan is het antwoord `overgeslagen` en niet een foutmelding die per feedbackregel
 *   een alarm in de logs achterlaat. Zelfde afweging als `firebase_niet_geconfigureerd` in
 *   `push-sweep`.
 * - **De bevestiging aan de lezer is optioneel, de melding aan de beheerder niet.** Resend levert
 *   vanaf het sandboxadres (`onboarding@resend.dev`) uitsluitend af op het adres van de
 *   Resend-account zelf. De beheerdersmail gaat naar precies dát adres en werkt dus meteen; een
 *   bevestiging naar een willekeurige lezer zou een 403 per feedbackregel opleveren. Daarom wordt
 *   die pas verstuurd zodra `FEEDBACK_MAIL_VAN` op een geverifieerd domein staat.
 *
 * Omgevingsvariabelen (`supabase secrets set …`, zie `supabase/README-feedback-mail.md`):
 *
 * | Naam | Verplicht | Betekenis |
 * |---|---|---|
 * | `RESEND_API_KEY` | ja | Zonder deze doet de function niets en zegt dat ook |
 * | `FEEDBACK_MAIL_VAN` | nee | Afzender op een geverifieerd domein; ontbreekt hij, dan sandbox + geen bevestiging |
 * | `FEEDBACK_MAIL_ADMIN` | nee | Waar de melding heen gaat; standaard `businessdemore@gmail.com` |
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

/** Het sandboxadres van Resend. Levert alleen af op het adres van de Resend-account zelf. */
const SANDBOX_AFZENDER = 'Histora <onboarding@resend.dev>';

/** Waar de melding heen gaat als `FEEDBACK_MAIL_ADMIN` niet gezet is. Zie `constants/app-info.ts`. */
const STANDAARD_ADMIN = 'businessdemore@gmail.com';

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
// Teksten
// --------------------------------------------------------------------------------------------
//
// Dezelfde afspraak als in `push-sweep`: de taal komt uit `profiles.language`, met Engels als
// terugval — precies de terugval die `src/i18n/index.ts` in de app ook doet.
//
// **Let op wat die kolom vandaag waard is.** Niets in de app schrijft hem na het aanmaken van de
// rij, dus hij draagt de waarde van dat moment en niet wat er in `taal-store` staat. Dat is een
// bekend gat (zie "Known gaps" in CLAUDE.md), geen reden om hier een tweede bron te verzinnen:
// gaat die kolom ooit meesynchroniseren, dan klopt deze mail vanzelf mee.

type Taal = 'en' | 'nl' | 'fr' | 'de';

const TALEN: Taal[] = ['en', 'nl', 'fr', 'de'];

type Bevestiging = {
  onderwerp: string;
  kop: string;
  dank: string;
  /** Boven het citaat van wat de lezer zelf schreef. */
  jouwBericht: string;
  soort: Record<FeedbackSoort, string>;
  /** Wat er nu gebeurt. Bewust geen belofte van een antwoord binnen X dagen. */
  vervolg: string;
  afsluiting: string;
  /** Onder de streep: waarom deze mail er is. */
  voet: string;
};

const BEVESTIGING: Record<Taal, Bevestiging> = {
  en: {
    onderwerp: 'We received your feedback',
    kop: 'Thank you',
    dank: 'Your message reached us. Someone reads every one of them.',
    jouwBericht: 'What you sent',
    soort: { bug: 'Bug report', idee: 'Idea' },
    vervolg:
      'We read everything that comes in. If your message needs an answer, you will get one at this address — simply reply to this mail.',
    afsluiting: 'The Histora team',
    voet: 'You are getting this mail because you sent feedback from inside the Histora app.',
  },
  nl: {
    onderwerp: 'We hebben je feedback ontvangen',
    kop: 'Bedankt',
    dank: 'Je bericht is aangekomen. Ze worden stuk voor stuk gelezen.',
    jouwBericht: 'Wat je stuurde',
    soort: { bug: 'Bugmelding', idee: 'Idee' },
    vervolg:
      'We lezen alles wat binnenkomt. Vraagt je bericht om een antwoord, dan krijg je dat op dit adres — je kunt gewoon op deze mail reageren.',
    afsluiting: 'Het Histora-team',
    voet: 'Je krijgt deze mail omdat je feedback verstuurde vanuit de Histora-app.',
  },
  fr: {
    onderwerp: 'Nous avons bien reçu votre message',
    kop: 'Merci',
    dank: 'Votre message nous est parvenu. Chacun d’eux est lu.',
    jouwBericht: 'Ce que vous avez envoyé',
    soort: { bug: 'Signalement de bug', idee: 'Idée' },
    vervolg:
      'Nous lisons tout ce qui arrive. Si votre message appelle une réponse, vous la recevrez à cette adresse — il suffit de répondre à ce courriel.',
    afsluiting: 'L’équipe Histora',
    voet: 'Vous recevez ce message parce que vous avez envoyé un retour depuis l’application Histora.',
  },
  de: {
    onderwerp: 'Wir haben dein Feedback erhalten',
    kop: 'Danke',
    dank: 'Deine Nachricht ist angekommen. Jede einzelne wird gelesen.',
    jouwBericht: 'Was du geschickt hast',
    soort: { bug: 'Fehlermeldung', idee: 'Idee' },
    vervolg:
      'Wir lesen alles, was hereinkommt. Braucht deine Nachricht eine Antwort, bekommst du sie an dieser Adresse — antworte einfach auf diese Mail.',
    afsluiting: 'Das Histora-Team',
    voet: 'Du bekommst diese Mail, weil du aus der Histora-App Feedback gesendet hast.',
  },
};

function taalVan(waarde: string | null | undefined): Taal {
  const code = (waarde ?? '').slice(0, 2).toLowerCase() as Taal;
  return TALEN.includes(code) ? code : 'en';
}

// --------------------------------------------------------------------------------------------
// HTML
// --------------------------------------------------------------------------------------------
//
// Alles staat inline. Mailclients strippen `<style>`-blokken (Gmail houdt er één over, Outlook.com
// niet) en kennen geen flexbox of grid, dus dit is opzettelijk saaie HTML: één gecentreerde tabel,
// inline stijlen, geen webfonts, geen afbeeldingen. De kleuren zijn die van `theme.ts` — beige
// `#F7F1E4`, tekst `#1C1A16`, accent `#3B6E7D` — zodat de mail bij de app hoort.

const KLEUR = {
  papier: '#F7F1E4',
  kaart: '#FFFFFF',
  tekst: '#1C1A16',
  zacht: '#6B6255',
  accent: '#3B6E7D',
  bug: '#B4482F',
  idee: '#3B6E7D',
  lijn: '#E4DAC6',
};

/**
 * Het bericht van de lezer gaat als HTML de mail in en is volledig door hem geschreven. Zonder
 * deze functie is `<img onerror=…>` in een bugmelding gewoon een `<img onerror=…>` in de inbox
 * van de beheerder. Ook de aanhalingstekens moeten mee: de tekst staat straks óók in een
 * `title`-loos, maar wel geneste, HTML-context.
 */
function escapeHtml(waarde: string): string {
  return waarde
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escapen én regeleindes behouden — een bugmelding is bijna altijd meerdere regels. */
function alsAlinea(waarde: string): string {
  return escapeHtml(waarde).replace(/\r?\n/g, '<br />');
}

function omhulsel(inhoud: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px 12px;background:${KLEUR.papier};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${KLEUR.tekst};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background:${KLEUR.kaart};border-radius:12px;border:1px solid ${KLEUR.lijn};">
            ${inhoud}
          </table>
          <p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:18px;color:${KLEUR.zacht};text-align:center;">Histora</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Het citaatblok waarin de tekst van de lezer staat — in allebei de mails dezelfde. */
function berichtBlok(bericht: string, kleur: string): string {
  return `<div style="margin:0;padding:16px;background:${KLEUR.papier};border-left:3px solid ${kleur};border-radius:6px;font-size:15px;line-height:24px;white-space:normal;word-break:break-word;">${alsAlinea(bericht)}</div>`;
}

function regel(label: string, waarde: string): string {
  return `<tr>
    <td style="padding:4px 0;font-size:13px;line-height:20px;color:${KLEUR.zacht};width:34%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:4px 0;font-size:13px;line-height:20px;color:${KLEUR.tekst};word-break:break-all;">${escapeHtml(waarde)}</td>
  </tr>`;
}

function adminHtml(
  rij: FeedbackRij,
  lezerEmail: string | null,
  projectRef: string | null
): string {
  const isBug = rij.soort === 'bug';
  const kleur = isBug ? KLEUR.bug : KLEUR.idee;
  const label = isBug ? '🐞 Bug report' : '💡 Idea';

  // Diep linken naar de rij zelf kan Supabase niet; de tabelweergave met het id ernaast is wat
  // er wél altijd werkt, en het id staat hierboven bij de gegevens.
  const dashboard = projectRef
    ? `<p style="margin:20px 0 0;font-size:13px;line-height:20px;"><a href="https://supabase.com/dashboard/project/${projectRef}/editor" style="color:${KLEUR.accent};">Open the feedback table in Supabase</a></p>`
    : '';

  return omhulsel(`
    <tr>
      <td style="padding:20px 24px;background:${kleur};border-radius:12px 12px 0 0;">
        <p style="margin:0;font-size:17px;line-height:24px;font-weight:600;color:#FFFFFF;">${label}</p>
        <p style="margin:4px 0 0;font-size:13px;line-height:20px;color:rgba(255,255,255,0.85);">Histora — new feedback</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        ${berichtBlok(rij.bericht, kleur)}
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:20px;border-top:1px solid ${KLEUR.lijn};padding-top:12px;">
          ${regel('From', lezerEmail ?? '(address unknown)')}
          ${regel('User ID', rij.user_id)}
          ${regel('App version', rij.app_versie ?? '—')}
          ${regel('Platform', rij.platform ?? '—')}
          ${regel('Sent at', rij.created_at)}
          ${regel('Feedback ID', rij.id)}
        </table>
        ${dashboard}
      </td>
    </tr>`);
}

function bevestigingHtml(rij: FeedbackRij, taal: Taal): string {
  const tekst = BEVESTIGING[taal];
  const kleur = rij.soort === 'bug' ? KLEUR.bug : KLEUR.idee;

  return omhulsel(`
    <tr>
      <td style="padding:24px 24px 8px;">
        <p style="margin:0;font-size:20px;line-height:28px;font-weight:600;">${escapeHtml(tekst.kop)}</p>
        <p style="margin:8px 0 0;font-size:15px;line-height:24px;">${escapeHtml(tekst.dank)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 0;">
        <p style="margin:0 0 8px;font-size:12px;line-height:18px;text-transform:uppercase;letter-spacing:0.06em;color:${KLEUR.zacht};">${escapeHtml(tekst.jouwBericht)} · ${escapeHtml(tekst.soort[rij.soort])}</p>
        ${berichtBlok(rij.bericht, kleur)}
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px 24px;">
        <p style="margin:0;font-size:15px;line-height:24px;">${escapeHtml(tekst.vervolg)}</p>
        <p style="margin:16px 0 0;font-size:15px;line-height:24px;color:${KLEUR.zacht};">— ${escapeHtml(tekst.afsluiting)}</p>
        <p style="margin:20px 0 0;padding-top:12px;border-top:1px solid ${KLEUR.lijn};font-size:12px;line-height:18px;color:${KLEUR.zacht};">${escapeHtml(tekst.voet)}</p>
      </td>
    </tr>`);
}

// --------------------------------------------------------------------------------------------
// Resend
// --------------------------------------------------------------------------------------------

type Mail = {
  van: string;
  naar: string;
  onderwerp: string;
  html: string;
  antwoordAan?: string;
};

type Verstuurd = { ok: true; id: string } | { ok: false; fout: string };

/**
 * Drie pogingen, en alleen bij een fout die vanzelf overgaat: 429 (te snel) en 5xx (aan hun kant).
 * Een 422 om een niet-geverifieerd domein gaat bij poging drie niet ineens lukken.
 *
 * Dit is bewust anders dan de push-kant, waar niets herhaald wordt. Daar gaat het over een
 * melding die een dag later geen melding meer is; hier over een HTTP-aanroep die nu, binnen
 * dezelfde aanroep, een tweede kans krijgt. De feedback zelf staat al veilig in de tabel — wat
 * hier misgaat kost hoogstens de mail, en de rij blijft.
 */
const POGINGEN = 3;
const WACHT_MS = [400, 1600];

async function verstuur(apiKey: string, mail: Mail): Promise<Verstuurd> {
  let laatste = 'onbekend';

  for (let poging = 0; poging < POGINGEN; poging++) {
    let respons: Response;
    try {
      respons = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: mail.van,
          to: [mail.naar],
          subject: mail.onderwerp,
          html: mail.html,
          ...(mail.antwoordAan ? { reply_to: mail.antwoordAan } : {}),
        }),
      });
    } catch (fout) {
      laatste = `netwerk: ${String(fout)}`;
      if (poging < POGINGEN - 1) await new Promise((r) => setTimeout(r, WACHT_MS[poging]));
      continue;
    }

    if (respons.ok) {
      const data = await respons.json().catch(() => ({}));
      return { ok: true, id: String(data?.id ?? '') };
    }

    laatste = `${respons.status} ${(await respons.text()).slice(0, 300)}`;
    const tijdelijk = respons.status === 429 || respons.status >= 500;
    if (!tijdelijk || poging === POGINGEN - 1) break;
    await new Promise((r) => setTimeout(r, WACHT_MS[poging]));
  }

  return { ok: false, fout: laatste };
}

/** Eén leesbare regel over de bevestiging, voor het antwoord dat in `net._http_response` belandt. */
function bevestigingUitkomst(
  lezerEmail: string | null,
  bevestigingKan: boolean,
  uitkomst: Verstuurd | null
): string {
  if (!lezerEmail) return 'overgeslagen: geen_adres';
  if (!bevestigingKan) return 'overgeslagen: geen_geverifieerd_domein';
  if (!uitkomst) return 'overgeslagen: onbekend';
  return uitkomst.ok ? 'verzonden' : `mislukt: ${uitkomst.fout}`;
}

// --------------------------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return antwoord(405, { error: 'method_not_allowed' });

  // --- Alleen de service role ---
  //
  // Staat vóór alles, om dezelfde reden als in `send-push`: de poort laat elk geldig token door,
  // en de body bevat een `feedback_id` dat van iedereen kan zijn. Zonder deze controle is dit een
  // manier om het e-mailadres achter een willekeurige feedbackregel te laten uitmailen.
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
    console.error('[send-feedback-email] SUPABASE_URL of SUPABASE_SERVICE_ROLE_KEY ontbreekt');
    return antwoord(500, { error: 'server_niet_geconfigureerd' });
  }

  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) {
    // Geen fout: dit is de stand tot iemand de sleutel zet, en per feedbackregel een 500 in de
    // logs schrijven maakt van een openstaande taak een terugkerend alarm.
    console.warn('[send-feedback-email] RESEND_API_KEY ontbreekt — er gaat geen mail uit');
    return antwoord(200, { ok: true, overgeslagen: 'resend_niet_geconfigureerd' });
  }

  const afzender = Deno.env.get('FEEDBACK_MAIL_VAN')?.trim() || '';
  const beheerder = Deno.env.get('FEEDBACK_MAIL_ADMIN')?.trim() || STANDAARD_ADMIN;
  // Zonder eigen domein levert Resend alleen af op het adres van de account zelf. De beheerdersmail
  // is dat adres; een bevestiging naar een lezer zou een 403 per feedbackregel worden.
  const bevestigingKan = afzender.length > 0;
  const van = afzender || SANDBOX_AFZENDER;

  // --- Welke feedbackregel ---
  //
  // `{ feedback_id }` is wat de trigger stuurt. `{ record }` is wat een Database Webhook uit het
  // Supabase-dashboard zou sturen; die vorm accepteren kost één regel en scheelt een verdwaalde
  // aanroep die zwijgend niets doet.
  let feedbackId = '';
  try {
    const body = await req.json();
    feedbackId = String(body?.feedback_id ?? body?.record?.id ?? '');
  } catch {
    return antwoord(400, { error: 'ongeldige_body' });
  }
  if (!feedbackId) return antwoord(400, { error: 'geen_feedback_id' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // De rij wordt hier opnieuw gelezen in plaats van uit de body overgenomen: dan is de inhoud van
  // de mail per definitie wat er in de tabel staat, en niet wat de aanroeper beweerde.
  const { data: rij, error: leesFout } = await admin
    .from('feedback')
    .select('id, user_id, soort, bericht, app_versie, platform, created_at')
    .eq('id', feedbackId)
    .maybeSingle<FeedbackRij>();

  if (leesFout) {
    console.error('[send-feedback-email] lezen mislukt:', leesFout.message);
    return antwoord(500, { error: 'lezen_mislukt', details: leesFout.message });
  }
  if (!rij) return antwoord(404, { error: 'feedback_niet_gevonden' });

  // Het adres komt uit `auth.users`, want dat is het adres waarop de lezer inlogt en dus het enige
  // dat gegarandeerd van hem is. `profiles.email` is een kopie die kan achterlopen.
  const { data: gebruiker } = await admin.auth.admin.getUserById(rij.user_id);
  const lezerEmail = gebruiker?.user?.email ?? null;

  const { data: profiel } = await admin
    .from('profiles')
    .select('language')
    .eq('id', rij.user_id)
    .maybeSingle<{ language: string | null }>();
  const taal = taalVan(profiel?.language);

  // Het projectref zit in de URL (`https://<ref>.supabase.co`) en hoeft dus geen eigen variabele.
  const projectRef = url.match(/^https:\/\/([a-z0-9]+)\.supabase\./)?.[1] ?? null;

  // --- De melding aan de beheerder ---
  const soortLabel = rij.soort === 'bug' ? 'Bug' : 'Idea';
  const eersteRegel = rij.bericht.split(/\r?\n/)[0]?.slice(0, 60) ?? '';
  const naarBeheerder = await verstuur(apiKey, {
    van,
    naar: beheerder,
    // Het onderwerp draagt het begin van het bericht, zodat een volle inbox te scannen is zonder
    // hem open te klikken.
    onderwerp: `[Histora] ${soortLabel}: ${eersteRegel}${rij.bericht.length > 60 ? '…' : ''}`,
    html: adminHtml(rij, lezerEmail, projectRef),
    // Antwoorden gaat zo naar de lezer en niet naar het afzenderadres van de app.
    ...(lezerEmail ? { antwoordAan: lezerEmail } : {}),
  });
  if (!naarBeheerder.ok) {
    console.error('[send-feedback-email] beheerdersmail mislukt:', naarBeheerder.fout);
  }

  // --- De bevestiging aan de lezer ---
  let naarLezer: Verstuurd | null = null;
  if (!lezerEmail) {
    console.warn(`[send-feedback-email] geen e-mailadres voor ${rij.user_id}`);
  } else if (!bevestigingKan) {
    console.warn(
      '[send-feedback-email] FEEDBACK_MAIL_VAN ontbreekt — bevestiging aan de lezer overgeslagen'
    );
  } else {
    naarLezer = await verstuur(apiKey, {
      van,
      naar: lezerEmail,
      onderwerp: BEVESTIGING[taal].onderwerp,
      html: bevestigingHtml(rij, taal),
      antwoordAan: beheerder,
    });
    if (!naarLezer.ok) {
      console.error('[send-feedback-email] bevestiging mislukt:', naarLezer.fout);
    }
  }

  // Altijd 200 zodra de rij gevonden is. Er is niemand die dit antwoord leest en erop handelt —
  // pg_net bewaart het in `net._http_response`, en daar is een leesbare samenvatting meer waard
  // dan een statuscode. Wat er misging staat in de body én in de logs.
  return antwoord(200, {
    ok: true,
    feedback_id: rij.id,
    taal,
    beheerder: naarBeheerder.ok ? 'verzonden' : `mislukt: ${naarBeheerder.fout}`,
    bevestiging: bevestigingUitkomst(lezerEmail, bevestigingKan, naarLezer),
  });
});
