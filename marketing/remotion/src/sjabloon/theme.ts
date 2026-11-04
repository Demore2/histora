import { loadFont } from '@remotion/google-fonts/Inter';

// Kleuren uit de histora-brand-skill. Video's zijn donker, dus oranje = de dark-variant.
export const KLEUR = {
  oranje: '#EE7A3E',
  oranjeLicht: '#C9541C',
  perkament: '#F7F1E4',
  perkamentHoog: '#EEE4D0',
  inkt: '#211F1A',
  donker: '#1C1A16',
  room: '#FFF1DC',
  wit: '#FFFFFF',
} as const;

export const W = 1080;
export const H = 1920;
export const FPS = 30;

export const { fontFamily: FONT } = loadFont('normal', { weights: ['700', '800', '900'], subsets: ['latin'] });

/** Dikke zachte schaduw onder witte tekst, leesbaar op elk schilderij. */
export const TEKST_SCHADUW = '0 4px 0 rgba(0,0,0,0.55), 0 0 28px rgba(0,0,0,0.65)';

// Veilige zone: TikTok/Reels/Shorts bedekken de onderste ~20% en de rechterrand (knoppen).
export const VEILIG = { boven: 230, onder: H * 0.8, links: 70, rechts: W - 150 } as const;
