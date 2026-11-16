import { useCurrentFrame } from 'remotion';
import { Camera, Daglicht, Grond, Kanon, Leger, Lucht, Neerslag, Soldaat, Avondlicht } from '../watals/Decor';
import { ARMEN_GEKRUIST, Figuur, wijs } from '../watals/Figuur';
import { ease, FPS, lin, NAP, Shot } from './basis';
import { Driekleur } from './LangDecor';
import { GroteTitel } from './LangHud';

/**
 * Teaser vóór de video (zoals de "What if you were born as…"-kanalen): een paar snelle klappen uit
 * het leven, eindigend met een vraag. Dit is shot 1: kanonschot achter hem, titel op de knal.
 */
export const T0_Knal = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const schot = f >= 2 ? lin(f, 2, 32, 0.02, 1) : 0;
  const schok = f < 14 ? Math.sin(f * 2.2) * (14 - f) * 0.006 : 0;
  return (
    <Shot focus={[0, 2.1, 0]} scherpte={3.5} mist={['#9A5A3A', 14, 90]} over={f >= 3 ? <GroteTitel boven="WHAT IF YOU WERE" naam="NAPOLEON?" /> : undefined}>
      <Lucht boven="#3E2E52" horizon="#F0904A" onder="#2A1A12" />
      <Camera pos={[0.6 + schok, 1.7 + schok, ease(f, 0, 50, 5.4, 4.6)]} kijk={[0, 2.35, 0]} fov={36} />
      <Avondlicht />
      <hemisphereLight args={['#FFD0A0', '#3A2A20', 0.6]} />
      <pointLight position={[-2, 2, -2]} intensity={schot > 0 ? (1 - schot) * 30 : 0} distance={14} color="#FFB060" />
      <Grond kleur="#4A3424" />
      <Kanon position={[-2.4, 0, -2.6]} rotation={[0, -0.5, 0]} schot={schot} />
      <Kanon position={[2.6, 0, -3.4]} rotation={[0, 0.5, 0]} schot={f >= 8 ? lin(f, 8, 38, 0.02, 1) : 0} />
      <Driekleur position={[1.6, 0, -1.6]} t={t} hoogte={3.6} />
      <Figuur {...NAP} position={[0, 0, 0.3]} rotation={[0, 0.05, 0]} pose={{ armR: wijs(ease(f, 0, 10, 0.4, 1.5)), wenk: 0.8, mond: 'open' }} />
    </Shot>
  );
};

/** Rusland: de colonne in de sneeuwstorm, hij voorop met gebogen hoofd. */
export const T3_Rusland = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const z = lin(f, 0, 110, 0, 1.2);
  return (
    <Shot focus={[0, 2.1, z]} scherpte={3} mist={['#B8C0CA', 6, 40]}>
      <Lucht boven="#7E8A98" horizon="#C8CED6" />
      <Camera pos={[ease(f, 0, 110, 3.0, 2.0), 2.6, z + ease(f, 0, 110, 7.6, 6.4)]} kijk={[0, 2.2, z]} fov={34} />
      <Daglicht zon={[-6, 10, 6]} kleur="#DDE4EE" kracht={1.0} omgeving={1.0} />
      <Grond kleur="#E6EAEE" />
      <Leger tijd="1800" rijen={4} kolommen={4} position={[0, 0, z - 7]} t={t * 0.4} />
      {[-2.2, 2.3].map((x, i) => <Soldaat key={i} tijd="1800" position={[x, 0, z - 1.6]} rotation={[0.2, i ? 0.2 : -0.2, 0]} t={t * 0.4} />)}
      <Figuur {...NAP} position={[0, 0, z]} rotation={[0, 0.1, 0]} pose={{ ...ARMEN_GEKRUIST, hoofd: [0.3, 0, 0], wenk: -0.7 }} />
      <Neerslag t={t} n={220} midden={[0, 0, z + 1]} breed={18} />
    </Shot>
  );
};
