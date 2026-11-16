import type { ReactNode } from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Blok, type V3 } from '../watals/Figuur';
import { opKaart } from './Kaarttafel';
import { APP_IN_BEELD } from '../watals/Afsluiter';
import { ORANJE, SERIF } from './LangHud';

/* ---------------- schepen en vlaggen ---------------- */

/** Linieschip rond 1800: romp met geschutpoorten, drie masten met zeilen. Boeg naar -z. */
export const Zeilschip = ({ position, rotation, t = 0, vlag = '#2F5FA8', schaal = 1, brand = false }: { position?: V3; rotation?: V3; t?: number; vlag?: string; schaal?: number; brand?: boolean }) => (
  <group position={position} rotation={[Math.sin(t * 0.9) * 0.02, rotation?.[1] ?? 0, Math.sin(t * 0.7) * 0.03]} scale={schaal}>
    <Blok p={[0, 0.5, 0]} s={[2.2, 1.2, 8]} c="#3A2618" />
    <Blok p={[0, 1.2, 0]} s={[2.0, 0.3, 7.6]} c="#C9A646" />
    <Blok p={[0, 1.55, 0]} s={[2.1, 0.5, 7.8]} c="#2A1C12" />
    <Blok p={[0, 1.9, 3.2]} s={[2.0, 0.8, 1.6]} c="#3A2618" />
    <Blok p={[0, 0.9, -4.4]} s={[0.4, 0.4, 1.4]} c="#3A2618" r={[0.4, 0, 0]} />
    {Array.from({ length: 7 }, (_, i) => [-1, 1].map((k) => <Blok key={`${i}${k}`} p={[k * 1.06, 1.0, -2.7 + i * 0.9]} s={[0.03, 0.18, 0.24]} c="#111" />))}
    {[-2.2, 0.2, 2.4].map((z, i) => (
      <group key={z} position={[0, 1.8, z]}>
        <Blok p={[0, 2.6, 0]} s={[0.14, 5.2 - i * 0.4, 0.14]} c="#4A3220" />
        {[1.4, 3.0, 4.2].map((y, k) => (
          <Blok key={y} p={[0, y - i * 0.2, 0.05]} s={[2.6 - k * 0.5, 1.2 - k * 0.2, 0.05]} c={brand && i === 1 ? '#3A2A20' : '#EFE8D8'} r={[0.06 + Math.sin(t + i) * 0.03, 0, 0]} rough={0.95} />
        ))}
      </group>
    ))}
    <Blok p={[0.3, 7.3, 3.2]} s={[0.6, 0.36, 0.03]} c={vlag} />
  </group>
);

/** Driekleur (blauw-wit-rood) aan een stok, wapperend. */
export const Driekleur = ({ position, t = 0, hoogte = 3.2, schaal = 1 }: { position: V3; t?: number; hoogte?: number; schaal?: number }) => (
  <group position={position} scale={schaal}>
    <Blok p={[0, hoogte / 2, 0]} s={[0.07, hoogte, 0.07]} c="#3A2A1C" />
    {['#1F3A8A', '#F2EEE6', '#C8282E'].map((c, i) => (
      <Blok key={c} p={[0.27 + i * 0.36, hoogte - 0.45, Math.sin(t * 3 + i) * 0.05]} s={[0.36, 0.8, 0.03]} c={c} r={[0, Math.sin(t * 3 + i * 0.8) * 0.15, 0]} />
    ))}
  </group>
);

/** De Bastille: donkere vestingmuur met ronde torens. */
export const Bastille = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 4, 0]} s={[18, 8, 3]} c="#5A5248" />
    {[-8, -2.6, 2.6, 8].map((x) => (
      <mesh key={x} position={[x, 5, 0.4]} castShadow>
        <cylinderGeometry args={[1.8, 1.9, 10, 10]} />
        <meshStandardMaterial color="#4E463E" roughness={0.95} flatShading />
      </mesh>
    ))}
    {Array.from({ length: 14 }, (_, i) => <Blok key={i} p={[-8.5 + i * 1.3, 8.4, 1.4]} s={[0.6, 0.8, 0.4]} c="#5A5248" />)}
  </group>
);

/** Les Invalides: gevel met zuilen en een gouden koepel. */
export const Invalides = ({ position }: { position: V3 }) => (
  <group position={position}>
    <Blok p={[0, 3, 0]} s={[16, 6, 6]} c="#E6DCC8" />
    {Array.from({ length: 8 }, (_, i) => <Blok key={i} p={[-5.6 + i * 1.6, 3, 3.1]} s={[0.5, 5.6, 0.5]} c="#F2EAD8" />)}
    <Blok p={[0, 7.5, 0]} s={[7, 3, 6]} c="#E6DCC8" />
    <mesh position={[0, 9, 0]} castShadow>
      <cylinderGeometry args={[3.0, 3.2, 3, 16]} />
      <meshStandardMaterial color="#E6DCC8" roughness={0.8} />
    </mesh>
    <mesh position={[0, 10.5, 0]} castShadow>
      <sphereGeometry args={[3.0, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#D8B54E" metalness={0.6} roughness={0.3} />
    </mesh>
    <Blok p={[0, 14.2, 0]} s={[0.3, 1.6, 0.3]} c="#D8B54E" metal={0.6} rough={0.3} />
  </group>
);

/** Meetlat aan de muur: streepjes per 10 cm, lange streep + getal per 50 cm (in eenheden: figuur 2,4 = ~1,7 m). */
export const Meetlat = ({ position, schaalM = 2.4 / 1.69 }: { position: V3; schaalM?: number }) => (
  <group position={position}>
    <Blok p={[0, 1.4, 0]} s={[0.5, 2.8, 0.06]} c="#EFE3C4" />
    {Array.from({ length: 20 }, (_, i) => {
      const y = i * 0.1 * schaalM;
      if (y > 2.8) return null;
      return <Blok key={i} p={[i % 5 === 0 ? -0.05 : -0.12, y, 0.04]} s={[i % 5 === 0 ? 0.36 : 0.2, 0.02, 0.02]} c="#3A2A1C" />;
    })}
  </group>
);

/* ---------------- kaart ---------------- */

/** Route over de kaarttafel: stippellijn die tot fractie p is getekend, met optioneel een figuur aan de kop. */
export const Route = ({ punten, p, kleur = ORANJE, kop }: { punten: [number, number][]; p: number; kleur?: string; kop?: ReactNode }) => {
  const pts = punten.map(([lon, lat]) => opKaart(lon, lat, 0.5));
  const lengtes = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[2] - pts[i][2]));
  const totaal = lengtes.reduce((a, b) => a + b, 0);
  const stap = 0.32;
  const blokjes: V3[] = [];
  let d = 0;
  for (let i = 0; i < lengtes.length; i++) {
    for (let s = 0; s < lengtes[i]; s += stap) {
      if ((d + s) / totaal > p) break;
      const f = s / lengtes[i];
      blokjes.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * f]);
    }
    d += lengtes[i];
  }
  // kop
  let rest = p * totaal;
  let kopPos: V3 = pts[0];
  for (let i = 0; i < lengtes.length; i++) {
    if (rest <= lengtes[i]) {
      const f = rest / lengtes[i];
      kopPos = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, 0.5, pts[i][2] + (pts[i + 1][2] - pts[i][2]) * f];
      break;
    }
    rest -= lengtes[i];
    kopPos = pts[i + 1];
  }
  return (
    <>
      {blokjes.map((b, i) => <Blok key={i} p={b} s={[0.14, 0.06, 0.14]} c={kleur} />)}
      {kop && <group position={kopPos}>{kop}</group>}
    </>
  );
};

/* ---------------- 2D-overlays ---------------- */

/** Gouden lijst rond het beeld: "het schilderij". */
export const Schilderijlijst = ({ titel }: { titel?: string }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', inset: 0, border: '46px solid #B8862E', boxShadow: 'inset 0 0 0 10px #E2BE58, inset 0 0 0 16px #6E4A14, inset 0 0 60px rgba(0,0,0,0.6)' }} />
    {titel && (
      <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#E2BE58', color: '#3A2208', fontFamily: SERIF, fontSize: 28, padding: '6px 22px', border: '3px solid #6E4A14' }}>{titel}</div>
      </div>
    )}
  </AbsoluteFill>
);

/** Spotprent-look: vergeeld papier, sepia, inktrand. */
export const Spotprent = ({ titel }: { titel?: string }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(214,186,130,0.35)', mixBlendMode: 'multiply' }} />
    <div style={{ position: 'absolute', inset: 30, border: '6px solid #3A2A1C', boxShadow: '0 0 0 4px #EFE3C4' }} />
    {titel && <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 40, color: '#3A2A1C' }}>{titel}</div>}
  </AbsoluteFill>
);

/** Afsluiter in 16:9: beeld donkerder, zwaaiende vos, "The full story is in Histora.", app-icoon. */
export const LangAfsluiter = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scrim = interpolate(frame, [0, 12], [0, 0.62], { extrapolateRight: 'clamp' });
  const vos = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });
  const tekst = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 200 } });
  const icoon = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 200 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(28,26,22,${scrim})` }} />
      <Img src={staticFile('vos/zwaaiend.png')} style={{ position: 'absolute', left: 300, top: 250, height: 560, transform: `scale(${vos}) rotate(${Math.sin(frame / 4) * 3}deg)`, transformOrigin: 'bottom center' }} />
      <div style={{ position: 'absolute', left: 820, top: 330, opacity: tekst, transform: `translateY(${(1 - tekst) * 30}px)` }}>
        <div style={{ fontFamily: SERIF, fontSize: 84, fontWeight: 800, color: 'white', lineHeight: 1.05 }}>{APP_IN_BEELD ? 'The full story' : 'Who should be'}</div>
        <div style={{ fontFamily: SERIF, fontSize: 84, fontWeight: 800, color: 'white', lineHeight: 1.05 }}>
          {APP_IN_BEELD ? <>is in <span style={{ color: ORANJE }}>Histora.</span></> : <span style={{ color: ORANJE }}>next?</span>}
        </div>
        {!APP_IN_BEELD && <div style={{ fontFamily: SERIF, fontSize: 46, color: '#FFF4E0', marginTop: 26, opacity: icoon }}>Tell us in the comments. Subscribe for more.</div>}
        {APP_IN_BEELD && <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 34, transform: `scale(${icoon})`, transformOrigin: 'left center' }}>
          <Img src={staticFile('app-icon.png')} style={{ width: 110, height: 110, borderRadius: 26, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }} />
          <div style={{ fontFamily: SERIF, fontSize: 40, color: '#FFF4E0' }}>Link in the description</div>
        </div>}
      </div>
    </AbsoluteFill>
  );
};
