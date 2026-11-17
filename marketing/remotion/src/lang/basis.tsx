import { ThreeCanvas } from '@remotion/three';
import { createContext, useContext, type ReactNode } from 'react';
import { AbsoluteFill, interpolate, useVideoConfig } from 'remotion';
import { Scherpte } from '../watals/Decor';
import { NAPOLEON, type V3 } from '../watals/Figuur';
import { opKaart } from './Kaarttafel';
import { LangVignet } from './LangHud';

export const FPS = 30;
export const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => 1 - (1 - x) ** 3 });
export const lin = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

/** In een short (9:16) de 16:9-overlays van een scène verbergen; de short zet er zijn eigen HUD overheen. */
export const ZonderOver = createContext(false);

export const Shot = ({ children, focus, scherpte = 3, mist, over }: { children: ReactNode; focus: V3; scherpte?: number; mist?: [string, number, number]; over?: ReactNode }) => {
  const { width, height } = useVideoConfig();
  const zonder = useContext(ZonderOver);
  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} shadows="soft" gl={{ antialias: true }} camera={{ fov: 35, near: 0.3, far: 400 }}>
        {mist && <fog attach="fog" args={mist} />}
        {children}
        <Scherpte focus={focus} sterkte={scherpte} />
      </ThreeCanvas>
      <LangVignet />
      {!zonder && over}
    </AbsoluteFill>
  );
};

export const NAP = { kleding: NAPOLEON, hoofddeksel: 'steek' as const };

/** Camerastand boven de kaarttafel: kijk naar (lon, lat), van `hoogte` boven en `afst` naar het zuiden. */
export type KaartStand = { lon: number; lat: number; hoogte: number; afst: number; dx?: number };
export const kaartCamera = (a: KaartStand, b: KaartStand, p: number) => {
  const m = (x: number, y: number) => x + (y - x) * p;
  const s = { lon: m(a.lon, b.lon), lat: m(a.lat, b.lat), hoogte: m(a.hoogte, b.hoogte), afst: m(a.afst, b.afst), dx: m(a.dx ?? 0, b.dx ?? 0) };
  const kijk = opKaart(s.lon, s.lat, 0.3);
  return { kijk, pos: [kijk[0] + s.dx, s.hoogte, kijk[2] + s.afst] as V3 };
};
