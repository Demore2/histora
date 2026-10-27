/**
 * Portrait images per verhaal-id (LAUNCH-PLAN.md B1).
 *
 * These are `require()`d from `assets/images/characters/`, so Metro bundles the bytes into the
 * app. Dat is het hele punt van B1: hiervoor stonden hier `via.placeholder.com`-stubs en in de
 * content-files verlopende `replicate.delivery`-URL's, die in een gepubliceerde build kapot zijn.
 * Een nieuw portret toevoegen = het bestand in `assets/images/characters/<verhaal-id>.webp`
 * zetten en hier een regel bijschrijven; het bestandsnaam-slug is altijd gelijk aan `Verhaal.id`.
 *
 * Relatieve paden (niet `@/assets/...`): assets worden door Metro opgelost, en een relatief pad
 * werkt daar altijd, onafhankelijk van tsconfig-path-resolutie.
 */

import type { ImageSourcePropType } from 'react-native';

const IMAGES = {
  // Oudheid
  'julius-caesar': require('../../assets/images/characters/julius-caesar.webp'),
  'spartacus': require('../../assets/images/characters/spartacus.webp'),
  'rome-rise': require('../../assets/images/characters/rome-rise.webp'),
  'pompeii-disaster': require('../../assets/images/characters/pompeii-disaster.webp'),
  'ashoka-maurya': require('../../assets/images/characters/ashoka-maurya.webp'),
  'alexander-the-great': require('../../assets/images/characters/alexander-the-great.webp'),
  'tutankhamun': require('../../assets/images/characters/tutankhamun.webp'),
  'socrates': require('../../assets/images/characters/socrates.webp'),
  'qin-shi-huang': require('../../assets/images/characters/qin-shi-huang.webp'),
  'hannibal': require('../../assets/images/characters/hannibal.webp'),
  'cleopatra': require('../../assets/images/characters/cleopatra.webp'),
  'nero': require('../../assets/images/characters/nero.webp'),

  // Middeleeuwen
  'joan-of-arc': require('../../assets/images/characters/joan-of-arc.webp'),
  'charlemagne': require('../../assets/images/characters/charlemagne.webp'),
  'richard-the-lionheart': require('../../assets/images/characters/richard-the-lionheart.webp'),
  'genghis-khan': require('../../assets/images/characters/genghis-khan.webp'),
  'william-the-conqueror': require('../../assets/images/characters/william-the-conqueror.webp'),
  'saladin': require('../../assets/images/characters/saladin.webp'),
  'marco-polo': require('../../assets/images/characters/marco-polo.webp'),
  'mansa-musa': require('../../assets/images/characters/mansa-musa.webp'),
  'vlad-the-impaler': require('../../assets/images/characters/vlad-the-impaler.webp'),
  'johannes-gutenberg': require('../../assets/images/characters/johannes-gutenberg.webp'),

  // Vroegmoderne Tijd
  'leonardo-da-vinci': require('../../assets/images/characters/leonardo-da-vinci.webp'),
  'galileo-galilei': require('../../assets/images/characters/galileo-galilei.webp'),
  'catherine-the-great': require('../../assets/images/characters/catherine-the-great.webp'),
  'henry-viii': require('../../assets/images/characters/henry-viii.webp'),
  'christopher-columbus': require('../../assets/images/characters/christopher-columbus.webp'),
  'martin-luther': require('../../assets/images/characters/martin-luther.webp'),
  'hernan-cortes': require('../../assets/images/characters/hernan-cortes.webp'),
  'suleiman-the-magnificent': require('../../assets/images/characters/suleiman-the-magnificent.webp'),
  'elizabeth-i': require('../../assets/images/characters/elizabeth-i.webp'),
  'louis-xiv': require('../../assets/images/characters/louis-xiv.webp'),
  'marie-antoinette': require('../../assets/images/characters/marie-antoinette.webp'),
  'mahatma-gandhi': require('../../assets/images/characters/mahatma-gandhi.webp'),
  'joseph-stalin': require('../../assets/images/characters/joseph-stalin.webp'),
  'albert-einstein': require('../../assets/images/characters/albert-einstein.webp'),
  'adolf-hitler': require('../../assets/images/characters/adolf-hitler.webp'),
  'mao-zedong': require('../../assets/images/characters/mao-zedong.webp'),
  'john-f-kennedy': require('../../assets/images/characters/john-f-kennedy.webp'),
  'neil-armstrong': require('../../assets/images/characters/neil-armstrong.webp'),

  // Industriele Revolutie
  'james-watt': require('../../assets/images/characters/james-watt.webp'),
  'florence-nightingale': require('../../assets/images/characters/florence-nightingale.webp'),
  'thomas-edison': require('../../assets/images/characters/thomas-edison.webp'),
  'napoleon-bonaparte': require('../../assets/images/characters/napoleon-bonaparte.webp'),
  'abraham-lincoln': require('../../assets/images/characters/abraham-lincoln.webp'),
  'queen-victoria': require('../../assets/images/characters/queen-victoria.webp'),
  'charles-darwin': require('../../assets/images/characters/charles-darwin.webp'),
  'nikola-tesla': require('../../assets/images/characters/nikola-tesla.webp'),
  'harriet-tubman': require('../../assets/images/characters/harriet-tubman.webp'),
  'otto-von-bismarck': require('../../assets/images/characters/otto-von-bismarck.webp'),

  // Twintigste Eeuw
  'marie-curie': require('../../assets/images/characters/marie-curie.webp'),
  'winston-churchill': require('../../assets/images/characters/winston-churchill.webp'),
  'martin-luther-king-jr': require('../../assets/images/characters/martin-luther-king-jr.webp'),

  // Hedendaags
  'steve-jobs': require('../../assets/images/characters/steve-jobs.webp'),
  'malala-yousafzai': require('../../assets/images/characters/malala-yousafzai.webp'),
  'nelson-mandela': require('../../assets/images/characters/nelson-mandela.webp'),
};

/** De verhaal-id's waarvoor een portret in de bundel zit. */
export type PortretId = keyof typeof IMAGES;

export const CHARACTER_IMAGES: Record<PortretId, ImageSourcePropType> = IMAGES;
