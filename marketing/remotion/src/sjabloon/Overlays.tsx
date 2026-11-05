import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { ShortConfig, Timing } from './types';
import { f, kleurDelen, type GeplandShot } from './tijd';
import { FONT, KLEUR, TEKST_SCHADUW, VEILIG, W } from './theme';

const Gekleurd = ({ tekst }: { tekst: string }) => (
  <>
    {kleurDelen(tekst).map((d, i) => (
      <span key={i} style={{ color: d.oranje ? KLEUR.oranje : undefined }}>{d.tekst}</span>
    ))}
  </>
);

/** Donkere randen boven en onder, zodat witte tekst op elk schilderij leesbaar blijft. */
export const Vignet = () => (
  <AbsoluteFill style={{
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.62) 100%)',
  }} />
);

/**
 * Oranje voortgangsbalk: kijkers zien dat het kort is, en dat houdt ze vast. Een donker spoor eronder maakt hem
 * op elk beeld zichtbaar. `onder` staat op de rand van de veilige zone (80%), boven de knoppen en de caption van
 * TikTok/Reels/Shorts; helemaal onderin zou hij onder hun eigen UI verdwijnen. Sinds 2026-11-05 is `boven` de standaard
 * (eigenaar): onderin viel hij op Reels over de profielfoto en de knoppen; bovenin staat hij tussen de statusbalk en
 * "Reels".
 */
export const Voortgang = ({ plek = 'boven' }: { plek?: 'boven' | 'onder' }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const dik = 18;
  const pos = plek === 'onder' ? { top: VEILIG.onder } : { top: 0 };
  const breedte = plek === 'onder' ? W - 2 * VEILIG.links : W;
  const links = plek === 'onder' ? VEILIG.links : 0;
  const rond = plek === 'onder' ? dik / 2 : 0;
  return (
    <div style={{ position: 'absolute', ...pos, left: links, width: breedte, height: dik, borderRadius: rond, backgroundColor: 'rgba(0,0,0,0.35)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: (breedte * frame) / (durationInFrames - 1), backgroundColor: KLEUR.oranje, borderRadius: rond, boxShadow: '0 0 12px rgba(0,0,0,0.5)' }} />
    </div>
  );
};

const Kicker = ({ zichtbaar }: { zichtbaar: number }) => (
  <div style={{
    position: 'absolute', top: VEILIG.boven, width: '100%', textAlign: 'center', opacity: zichtbaar,
    fontFamily: FONT, fontWeight: 900, fontSize: 40, letterSpacing: 6, color: KLEUR.oranje, textShadow: TEKST_SCHADUW,
  }}>
    30 SECONDS OF HISTORY
  </div>
);

/**
 * De claim, volledig in beeld vanaf frame 0 (geen fade-in: zwarte of lege eerste frames kostten de
 * eerste video's hun kijkers). Alleen de uitgang beweegt.
 */
export const Hook = ({ config, timing }: { config: ShortConfig; timing: Timing }) => {
  const frame = useCurrentFrame();
  const eind = f(timing.beats[config.hookUntilBeat][1] + 0.15);
  if (frame >= eind) return null;
  const uit = interpolate(frame, [eind - 7, eind], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
  const adem = interpolate(frame, [0, eind], [1, 1.04]);
  return (
    <AbsoluteFill>
      <Kicker zichtbaar={1 - uit} />
      <div style={{
        position: 'absolute', top: VEILIG.boven + 64, width: '100%', textAlign: 'center',
        transform: `translateY(${-uit * 60}px) scale(${adem})`, opacity: 1 - uit,
        fontFamily: FONT, fontWeight: 900, fontSize: 108, lineHeight: 1.02, letterSpacing: -3, color: KLEUR.wit, textShadow: TEKST_SCHADUW,
      }}>
        {config.hook.split('|').map((regel, i) => <div key={i}><Gekleurd tekst={regel} /></div>)}
      </div>
    </AbsoluteFill>
  );
};

/** Jaartal linksboven; een nieuw jaar rolt van onderen in, het oude schuift omhoog weg. */
export const Jaartal = ({ config, timing }: { config: ShortConfig; timing: Timing }) => {
  const frame = useCurrentFrame();
  const momenten = config.years.map((y) => ({ ...y, van: f(timing.beats[y.beat][0] - (y.lead ?? 0)) }));
  const i = momenten.findLastIndex((m) => frame >= m.van);
  if (i < 0 || frame >= f(timing.cta[0])) return null;
  const sinds = frame - momenten[i].van;
  const rol = interpolate(sinds, [0, 8], [1, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const blok = (tekst: string, y: number, o: number) => (
    <div style={{ position: 'absolute', left: 0, top: y, opacity: o, whiteSpace: 'nowrap' }}>{tekst}</div>
  );
  return (
    <div style={{
      position: 'absolute', left: VEILIG.links, top: VEILIG.boven, height: 76, width: 330, overflow: 'hidden',
      fontFamily: FONT, fontWeight: 800, fontSize: 58, lineHeight: '76px', color: KLEUR.room, textShadow: TEKST_SCHADUW,
      borderLeft: `8px solid ${KLEUR.oranje}`, paddingLeft: 22,
    }}>
      <div style={{ position: 'relative', height: 76 }}>
        {i > 0 && rol > 0 && blok(momenten[i - 1].text, -76 * (1 - rol), rol)}
        {blok(momenten[i].text, 76 * rol, 1 - rol * 0.6)}
      </div>
    </div>
  );
};

/** Een groot getal of woord midden-boven ("KING AT 20"), dat optelt en met een veer in beeld springt. */
export const Stempels = ({ config, timing }: { config: ShortConfig; timing: Timing }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {config.stamps.map((s, k) => {
        const van = f(timing.beats[s.beat][0]);
        const volgende = s.beat + 1 < config.beats.length ? timing.beats[s.beat + 1][0] : timing.cta[0];
        const tot = f(Math.max(timing.beats[s.beat][1] + 0.4, volgende));
        if (frame < van || frame >= tot) return null;
        const pop = spring({ frame: frame - van, fps, config: { damping: 10, stiffness: 170 } });
        const weg = interpolate(frame, [tot - 6, tot], [1, 0], { extrapolateLeft: 'clamp' });
        const n = Number(s.big);
        const groot = s.countUp && Number.isInteger(n)
          ? String(Math.round(interpolate(frame - van, [0, 16], [0, n], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })))
          : s.big;
        return (
          <AbsoluteFill key={k} style={{ alignItems: 'center', top: 430, opacity: weg, fontFamily: FONT, textShadow: TEKST_SCHADUW }}>
            <div style={{ transform: `scale(${pop})`, textAlign: 'center' }}>
              {s.over && <div style={{ fontWeight: 900, fontSize: 70, letterSpacing: 4, color: KLEUR.room }}>{s.over}</div>}
              {/* Een lang woord ("VESUVIUS") krimpt tot het in de breedte past; getallen blijven 340. */}
              <div style={{ fontWeight: 900, fontSize: Math.min(340, Math.floor(960 / (s.big.length * 0.62))), lineHeight: 0.95, letterSpacing: -10, color: KLEUR.oranje }}>{groot}</div>
              {s.under && <div style={{ fontWeight: 900, fontSize: 60, letterSpacing: 4, color: KLEUR.room }}>{s.under}</div>}
            </div>
          </AbsoluteFill>
        );
      })}
    </>
  );
};

/** Witte flits op een knip die een klap in het verhaal markeert. */
export const Flitsen = ({ shots }: { shots: GeplandShot[] }) => {
  const frame = useCurrentFrame();
  const s = shots.find((g) => g.shot.flash && g.van > 0 && frame >= g.van && frame < g.van + 7);
  if (!s) return null;
  return <AbsoluteFill style={{ backgroundColor: KLEUR.room, opacity: interpolate(frame - s.van, [0, 6], [0.85, 0]) }} />;
};

export { Kicker };
