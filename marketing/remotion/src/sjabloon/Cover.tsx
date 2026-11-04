import { AbsoluteFill, Img, staticFile } from 'remotion';
import type { ShortConfig } from './types';
import { kleurDelen } from './tijd';
import { FONT, H, KLEUR, TEKST_SCHADUW, W } from './theme';

/** Het middelste 3:4-vak: dit deel toont het profielraster; daarbuiten staat niets wat telt. */
const RASTER_TOP = (H - (W * 4) / 3) / 2; // 240
const RASTER_H = (W * 4) / 3; // 1440

const Gekleurd = ({ tekst }: { tekst: string }) => (
  <>
    {kleurDelen(tekst).map((d, i) => (
      <span key={i} style={{ color: d.oranje ? KLEUR.oranje : undefined }}>{d.tekst}</span>
    ))}
  </>
);

/**
 * Vaste omslag voor elke video, zelfde indeling als de eerdere omslagen (kicker, naam, claim, icoon + HISTORA),
 * maar met het portret héél in het rastervak. De naam staat onderin over een donkere gloed, zodat het gezicht
 * vrij blijft, en is zo groot dat hij ook als tegeltje in het raster te lezen is.
 */
export const Cover = ({ config }: { config: ShortConfig }) => {
  const { cover } = config;
  const aspect = cover.aspect ?? 3 / 4;
  const h = Math.min(RASTER_H, W / aspect);
  const w = h * aspect;
  // Een staand 9:16-beeld is precies het formaat van de omslag: schermvullend, geen strook met vage zijkanten.
  const vullend = aspect < 0.6;
  return (
    <AbsoluteFill style={{ backgroundColor: '#0C0B08', fontFamily: FONT }}>
      {vullend ? (
        <Img src={staticFile(cover.src)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (<>
      <Img src={staticFile(cover.src)} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        filter: 'blur(40px) brightness(0.35)', transform: 'scale(1.2)',
      }} />
      {/* Zachte boven- en onderrand: het portret loopt over in de vage achtergrond in plaats van een harde streep. */}
      <Img src={staticFile(cover.src)} style={{
        position: 'absolute', left: (W - w) / 2, top: RASTER_TOP + (RASTER_H - h) / 2, width: w, height: h,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 9%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 9%, black 90%, transparent 100%)',
      }} />
      </>)}
      {/* Donkere gloed van onderen, waar de tekst staat; het gezicht bovenin blijft schoon. */}
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(12,11,8,0) 0%, rgba(12,11,8,0) 46%, rgba(12,11,8,0.82) 68%, rgba(12,11,8,0.96) 100%)' }} />
      <div style={{ position: 'absolute', top: 1060, width: '100%', textAlign: 'center', textShadow: TEKST_SCHADUW }}>
        <div style={{ fontWeight: 900, fontSize: 40, letterSpacing: 8, color: KLEUR.oranje }}>30 SECONDS OF HISTORY</div>
        <div style={{ marginTop: 18, fontWeight: 900, fontSize: 132, lineHeight: 0.98, letterSpacing: -3, color: KLEUR.wit }}>
          {cover.name.map((regel, i) => <div key={i}><Gekleurd tekst={regel} /></div>)}
        </div>
        <div style={{ marginTop: 34, fontWeight: 900, fontSize: 56, letterSpacing: 1, color: KLEUR.wit }}>
          <Gekleurd tekst={cover.hook} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1560, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Img src={staticFile('app-icon.png')} style={{ width: 84, height: 84, borderRadius: 42 }} />
        <div style={{ fontWeight: 900, fontSize: 40, letterSpacing: 8, color: KLEUR.room, textShadow: TEKST_SCHADUW }}>HISTORA</div>
      </div>
    </AbsoluteFill>
  );
};
