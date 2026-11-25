// Maakt het JS-fragment voor YouTube Studio → Talen uit een vertalingen.json (lange video's).
//   node studio-aanvullen.mjs <pad/naar/upload/vertalingen.json>  > fragment.js
// Plak het fragment één keer in javascript_tool op studio.youtube.com/video/<id>/translations. Daarna per
// aanroep hooguit 3 talen: `const u=[];for(const k of ['de','fr','es'])u.push(await nieuw(k));u.join(' | ')`
// (meer tegelijk raakt de 45 s-timeout van de tool; de lus loopt dan wel door, controleer de tabel).
// Een taal die al als rij bestaat (Frans met automatische ondertiteling): klik die rij en roep `vul('fr')` aan.
import { readFileSync } from 'node:fs';

const v = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const T = {};
for (const [k, t] of Object.entries(v.talen)) {
  const hs = t.hoofdstukken.map((h, i) => `${v.tijden[i]} ${h}`).join('\n');
  T[k] = { titel: t.titel, besch: `${t.haak}\n\n${hs}\n\n${t.vraag}\n${t.engels}\n\n${t.tags}` };
}
const M = {
  nl: 'Nederlands', de: 'Duits', fr: 'Frans', es: 'Spaans', pt: 'Portugees (Brazilië)', it: 'Italiaans', ru: 'Russisch',
  tr: 'Turks', ar: 'Arabisch', fa: 'Perzisch', hi: 'Hindi', ur: 'Urdu', id: 'Indonesisch', ms: 'Maleis',
  el: 'Grieks', ky: 'Kirgizisch', mn: 'Mongools', pl: 'Pools', vi: 'Vietnamees',
};
process.stdout.write(`window.__T=${JSON.stringify(T)};window.__M=${JSON.stringify(M)};
const w=ms=>new Promise(r=>setTimeout(r,ms));
window.vul=async(k)=>{const d=[...document.querySelectorAll('tp-yt-paper-dialog, ytcp-dialog')].find(x=>x.offsetParent&&/Titel en beschrijving/.test(x.innerText));if(!d)return k+': geen dialoog';const tb=[...d.querySelectorAll('[contenteditable=true]')].filter(x=>x.offsetParent);if(tb.length<2)return k+': velden '+tb.length;
for(const [i,txt] of [[0,__T[k].titel],[1,__T[k].besch]]){tb[i].focus();document.execCommand('selectAll');document.execCommand('insertText',false,txt);await w(300);}
await w(500);const up=[...d.querySelectorAll('ytcp-button, button')].find(b=>/Updaten|Publiceren/.test(b.innerText));if(!up)return k+': geen knop';up.click();await w(2500);return k+' ok'};
window.nieuw=async(k)=>{[...document.querySelectorAll('ytcp-button, button')].find(b=>b.innerText.trim()==='Taal toevoegen').click();await w(1200);const it=[...document.querySelectorAll('tp-yt-paper-item')].find(e=>e.offsetParent&&e.textContent.trim()===__M[k]);if(!it)return k+': optie niet gevonden (bestaat de rij al?)';it.click();await w(2000);return vul(k)};
window.stand=()=>{const t=document.querySelector('main').innerText;const d=t.slice(t.indexOf('Thumbnail\\n')+10).split('\\n').filter(x=>x.trim());const r=[];for(let i=0;i+4<d.length;i+=5)r.push(d[i]+': '+d[i+3]);return r.join(' | ')};
'klaar: '+Object.keys(__T).join(',')
`);
