import { geoArea, geoGraticule10, geoMercator, geoPath } from 'd3-geo';
import { useMemo } from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import land50 from 'world-atlas/land-50m.json';
import type { MapStop, Territory } from './types';
import { FONT, H, KLEUR, TEKST_SCHADUW, W } from './theme';

type Props = {
  stops: MapStop[];
  fromStop: number;
  toStop: number;
  span: number;
  returnTo?: number;
  zoom?: [number, number];
  territory?: Territory;
  draw?: number;
};

type Punt = [number, number];

// Vaste projectie (schaal hangt van `span` af); de camera schuift en zoomt met een SVG-transform. Zo worden
// het land en het rijk één keer berekend in plaats van elk frame.
const maakProjectie = (span: number) => geoMercator().scale((W * 180) / (Math.PI * span)).translate([0, 0]).precision(0.3);

const lengtes = (pts: Punt[]) => {
  const uit = [0];
  for (let i = 1; i < pts.length; i++) uit.push(uit[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return uit;
};

/** Punt op afstand d langs de polylijn. */
const puntOp = (pts: Punt[], cum: number[], d: number): Punt => {
  const i = cum.findIndex((c) => c >= d);
  if (i <= 0) return i === 0 ? pts[0] : pts[pts.length - 1];
  const t = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
};

/** Hoogte van de camera: de kop staat op ~42%, zodat de ondertitels eronder niet over de lijn vallen. */
const CAM_Y = H * 0.42;

/**
 * Een donkere kaart (kustlijnen, geen moderne grenzen) waarop de route zich intekent en het gebied van de
 * figuur meegroeit: rond elke bereikte stad kleurt het rijk in een cirkel open, op het land geknipt, zodat
 * alleen grenzen over land te zien zijn. De camera volgt de kop van de lijn; met `zoom` schuift hij
 * tegelijk naar het midden van het rijk.
 */
export const RouteMap = ({ stops, fromStop, toStop, span, returnTo, zoom, territory, draw }: Props) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const { landPad, raster, pts, cum, terug, terugCum, rijk, rijkOost, midden, graad } = useMemo(() => {
    const proj = maakProjectie(span);
    const pad = geoPath(proj);
    const topo = land50 as unknown as Topology<{ land: GeometryCollection }>;
    // Antarctica wordt in Mercator eindeloos groot en is nooit nodig; eruit.
    const land = feature(topo, topo.objects.land) as unknown as { features: { geometry: { type: string; coordinates: number[][][][] } }[] };
    const landGeo = {
      type: 'MultiPolygon' as const,
      coordinates: land.features
        .flatMap((f) => (f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates as unknown as number[][][]]))
        .filter((poly) => poly[0].some(([, lat]) => lat > -58)),
    };
    const p = stops.map((s) => proj([s.lon, s.lat]) as Punt);
    const t = returnTo !== undefined ? ([p[p.length - 1], p[returnTo]] as Punt[]) : null;

    let rijkPad = '';
    let oost = 0;
    let centrum: Punt;
    if (territory) {
      // d3 rekent op de bol: een ring die "verkeerd om" loopt beslaat de rest van de wereld. Dan omdraaien.
      let ring = [...territory.polygon, territory.polygon[0]];
      if (geoArea({ type: 'Polygon', coordinates: [ring] }) > 2 * Math.PI) ring = ring.reverse();
      rijkPad = pad({ type: 'Polygon', coordinates: [ring] }) ?? '';
      oost = Math.max(...territory.polygon.map((q) => (proj(q) as Punt)[0]));
      const n = territory.polygon.length;
      centrum = proj([territory.polygon.reduce((a, q) => a + q[0], 0) / n, territory.polygon.reduce((a, q) => a + q[1], 0) / n]) as Punt;
    } else {
      const xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
      centrum = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
    }
    return {
      landPad: pad(landGeo) ?? '', raster: pad(geoGraticule10()) ?? '', pts: p, cum: lengtes(p),
      terug: t, terugCum: t ? lengtes(t) : null, rijk: rijkPad, rijkOost: oost, midden: centrum, graad: W / span,
    };
  }, [stops, span, returnTo, territory]);

  const aankomst = draw !== undefined ? Math.round(durationInFrames * draw) : durationInFrames - 8;
  const loop = interpolate(frame, [3, Math.max(4, aankomst)], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
  });
  const stilstaand = fromStop === toStop;
  const d = stilstaand ? cum[toStop] : cum[fromStop] + (cum[toStop] - cum[fromStop]) * loop;
  const terugModus = terug !== null && stilstaand;
  const dTerug = terugModus && terugCum ? terugCum[1] * loop : 0;
  const kop = terugModus && terug && terugCum ? puntOp(terug, terugCum, dTerug) : puntOp(pts, cum, d);

  // Camera.
  const [z0, z1] = zoom ?? [1, 1];
  const z = interpolate(frame, [0, durationInFrames], [z0, z1], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const zVol = Math.min(z0, z1);
  const naarMidden = zVol < 1 ? Math.min(1, (1 - z) / (1 - zVol)) : 0;
  const doel: Punt = [kop[0] + (midden[0] - kop[0]) * naarMidden, kop[1] + (midden[1] - kop[1]) * naarMidden];
  const k = 1 / z; // lijnen, stippen en labels houden hun schermgrootte bij het zoomen
  const intro = interpolate(frame, [0, 10], [1.05, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const totaal = cum[cum.length - 1];
  // Frames sinds de kop stop i bereikte. Uit de klok, niet uit de afstand: na aankomst staat de afstand stil,
  // en dan zou de laatste stop eeuwig op frame 0 van zijn veer blijven hangen (onzichtbaar label).
  const loopOp = (fr: number) => interpolate(fr, [3, Math.max(4, aankomst)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const framesSinds = (i: number) => {
    if (i <= fromStop) return Infinity;
    const doel = (cum[i] - cum[fromStop]) / (cum[toStop] - cum[fromStop] || 1);
    let fr = 0;
    while (fr < frame && loopOp(fr) < doel - 1e-6) fr++;
    return frame - fr;
  };

  // Rijk: een veroveringsfront dat met de kop mee naar het oosten schuift, met een zachte rand. Binnen het
  // front staan de echte grenzen van het rijk; bij `full` schuift het front door tot het hele rijk gekleurd is.
  const front0 = kop[0] + 2.5 * graad;
  const vol = territory?.full
    ? interpolate(frame, [0, durationInFrames * 0.7], [0, 1], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) })
    : 0;
  const front = front0 + (rijkOost + 3 * graad - front0) * vol;
  const rand = 4 * graad;
  const labelZicht = territory?.label && territory.full
    ? interpolate(frame, [durationInFrames * 0.3, durationInFrames * 0.55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 42%, #17150F 0%, #0C0B08 75%)' }}>
      <svg width={W} height={H} style={{ position: 'absolute', transform: `scale(${intro})` }}>
        <defs>
          <filter id="gloed" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={10} />
          </filter>
          <clipPath id="land"><path d={landPad} /></clipPath>
          <linearGradient id="frontRand" gradientUnits="userSpaceOnUse" x1={front - rand} y1={0} x2={front} y2={0}>
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </linearGradient>
          <mask id="veroverd" maskUnits="userSpaceOnUse" x={-1e5} y={-1e5} width={2e5} height={2e5}>
            <rect x={-1e5} y={-1e5} width={front + 1e5} height={2e5} fill="url(#frontRand)" />
          </mask>
        </defs>
        <g transform={`translate(${W / 2} ${CAM_Y}) scale(${z}) translate(${-doel[0]} ${-doel[1]})`}>
          <path d={raster} fill="none" stroke="rgba(255,241,220,0.06)" strokeWidth={2 * k} />
          <path d={landPad} fill="#5E523E" stroke="#A08B69" strokeWidth={3 * k} />
          {rijk && (
            <g clipPath="url(#land)" mask="url(#veroverd)">
              <path d={rijk} fill={KLEUR.oranje} fillOpacity={0.34} />
              <path d={rijk} fill="none" stroke={KLEUR.oranje} strokeWidth={6 * k} strokeLinejoin="round" />
            </g>
          )}
          {/* Gelopen route: gloed + lijn, via dasharray tot afstand d. */}
          <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={KLEUR.oranje} strokeWidth={22 * k} strokeOpacity={0.4}
            strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${d} ${totaal + 10}`} filter="url(#gloed)" />
          <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={KLEUR.room} strokeWidth={7 * k}
            strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${d} ${totaal + 10}`} />
          {/* Terugweg: gestippeld, groeit als losse lijn van de laatste stop tot de kop. */}
          {terugModus && terug && (
            <polyline points={[terug[0], kop].map((q) => q.join(',')).join(' ')} fill="none" stroke={KLEUR.room} strokeWidth={8 * k}
              strokeLinecap="round" strokeDasharray={`${2 * k} ${22 * k}`} />
          )}
          {stops.map((s, i) => {
            if (cum[i] > d + 0.5) return null;
            // Stops die in deze shot bereikt worden springen open; eerdere staan er al.
            const s0 = framesSinds(i);
            const pop = s0 === Infinity ? 1 : spring({ frame: Math.round(s0), fps, config: { damping: 11, stiffness: 190 } });
            const [x, y] = pts[i];
            return (
              <g key={s.name} transform={`translate(${x} ${y}) scale(${Math.max(0.01, pop) * k})`}>
                <circle r={18} fill={KLEUR.donker} stroke={KLEUR.room} strokeWidth={6} />
                <circle r={8} fill={KLEUR.oranje} />
                <text x={s.label === 'left' ? -34 : s.label === 'above' ? 0 : 34} y={s.label === 'above' ? -42 : 15}
                  textAnchor={s.label === 'left' ? 'end' : s.label === 'above' ? 'middle' : 'start'} fill={KLEUR.room}
                  style={{ fontFamily: FONT, fontWeight: 800, fontSize: 46, paintOrder: 'stroke', stroke: KLEUR.donker, strokeWidth: 10 }}>
                  {s.name}
                </text>
              </g>
            );
          })}
          {/* De kop: een fel punt dat pulseert. */}
          <circle cx={kop[0]} cy={kop[1]} r={(15 + Math.sin(frame / 3) * 3) * k} fill={KLEUR.oranje} stroke={KLEUR.wit} strokeWidth={5 * k} />
        </g>
      </svg>
      {territory?.label && labelZicht > 0 && (
        <div style={{
          position: 'absolute', top: 400, width: '100%', textAlign: 'center', opacity: labelZicht,
          transform: `translateY(${(1 - labelZicht) * 20}px)`, fontFamily: FONT, fontWeight: 900, fontSize: 52,
          letterSpacing: 8, color: KLEUR.oranje, textShadow: TEKST_SCHADUW,
        }}>
          {territory.label}
        </div>
      )}
    </AbsoluteFill>
  );
};
