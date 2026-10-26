import type { TijdperkId } from '@/lib/trivia';

/**
 * Phoxy met het hoofddeksel van elk tijdperk (1.5): het draaiwiel en de kroonkeuze in Explore, en
 * het kroontjesblok op Progress. Bron: `assets/images/vos/bron/era-*.png` (Higgsfield),
 * uitgeknipt met `scripts/prepare-era-heads.mjs`.
 */
export const ERA_KOP: Record<TijdperkId, number> = {
  oudheid: require('@/assets/images/vos/era-oudheid.png'),
  middeleeuwen: require('@/assets/images/vos/era-middeleeuwen.png'),
  'vroegmoderne-tijd': require('@/assets/images/vos/era-vroegmoderne-tijd.png'),
  'industriele-revolutie': require('@/assets/images/vos/era-industriele-revolutie.png'),
  'twintigste-eeuw': require('@/assets/images/vos/era-twintigste-eeuw.png'),
  hedendaags: require('@/assets/images/vos/era-hedendaags.png'),
};
