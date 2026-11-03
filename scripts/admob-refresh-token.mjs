#!/usr/bin/env node
/**
 * Haalt eenmalig een OAuth-refresh-token voor de AdMob API op, voor de edge function
 * `beheer-dashboard` (secret `ADMOB_REFRESH_TOKEN`).
 *
 * AdMob kent geen serviceaccounts: de API wil een echte Google-login van iemand met toegang tot
 * het AdMob-account. Dit script doet die login één keer via de "loopback"-flow van Google:
 *
 *   1. Het start een webservertje op 127.0.0.1 en opent de Google-inlogpagina in je browser.
 *   2. Je logt in met het account van AdMob en geeft leesrecht (`admob.readonly`).
 *   3. Google stuurt je terug naar het servertje, dat de code inwisselt en het refresh-token toont.
 *
 * Gebruik (in je eigen terminal; de client-gegevens komen uit Google Cloud → Credentials → een
 * OAuth-client van het type "Desktop app"):
 *
 *   $env:ADMOB_CLIENT_ID="…"; $env:ADMOB_CLIENT_SECRET="…"; node scripts/admob-refresh-token.mjs
 *
 * Het token is een wachtwoord: zet het direct in Supabase → Edge Functions → Secrets en plak het
 * nergens anders. Intrekken kan op https://myaccount.google.com/permissions.
 */

import http from 'node:http';
import { exec } from 'node:child_process';

const CLIENT_ID = process.env.ADMOB_CLIENT_ID?.trim();
const CLIENT_SECRET = process.env.ADMOB_CLIENT_SECRET?.trim();
const POORT = 53682;
const REDIRECT = `http://127.0.0.1:${POORT}`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Zet eerst ADMOB_CLIENT_ID en ADMOB_CLIENT_SECRET (zie de kop van dit bestand).');
  process.exit(1);
}

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT,
  response_type: 'code',
  scope: 'https://www.googleapis.com/auth/admob.readonly',
  // `offline` + `consent`: anders geeft Google bij een tweede keer geen refresh-token meer mee.
  access_type: 'offline',
  prompt: 'consent',
});

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get('code');
  const fout = url.searchParams.get('error');
  if (!code && !fout) { res.writeHead(404).end(); return; }

  if (fout) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end(`Geweigerd: ${fout}. Je kunt dit venster sluiten.`);
    console.error(`Google gaf een fout terug: ${fout}`);
    server.close();
    process.exitCode = 1;
    return;
  }

  try {
    const respons = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT,
        grant_type: 'authorization_code',
      }),
    });
    const data = await respons.json();
    if (!respons.ok || !data.refresh_token) throw new Error(JSON.stringify(data));
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Gelukt. Ga terug naar je terminal; je kunt dit venster sluiten.');
    console.log('\nRefresh-token (zet dit als secret ADMOB_REFRESH_TOKEN in Supabase):\n');
    console.log(data.refresh_token);
    console.log('');
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Inwisselen mislukt, zie de terminal.');
    console.error('Inwisselen mislukt:', e.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(POORT, '127.0.0.1', () => {
  console.log('Je browser opent de Google-login. Lukt dat niet, open dan zelf:\n');
  console.log(authUrl + '\n');
  const open = process.platform === 'win32' ? `start "" "${authUrl}"` : process.platform === 'darwin' ? `open "${authUrl}"` : `xdg-open "${authUrl}"`;
  exec(open);
});
