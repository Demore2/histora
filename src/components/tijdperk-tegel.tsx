import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { ERA_KOP } from '@/constants/era-koppen';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import type { Tijdperk } from '@/constants/types';
import { bepaalRoute } from '@/content/queries';
import { useVertaling } from '@/hooks/use-vertaling';
import type { TijdperkId } from '@/lib/trivia';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * Eén tijdperk op Home (1.4.2), over de volle breedte en onder elkaar — vervangt de carrousel per
 * tijdperk (`TijdperkRij`). Tikken opent de routekaart van dat tijdperk (`tijdperk/[id]`).
 *
 * Achtergrond: de openingsscène van het eerste verhaal op de tijdlijn van dat tijdperk, onder een
 * waas in de tijdperkkleur. Rechts Phoxy met het hoofddeksel van het tijdperk, dezelfde koppen als
 * op het wiel van Explore — zo horen Home en Explore bij elkaar.
 */
export function TijdperkTegel({ tijdperk }: { tijdperk: Tijdperk }) {
  const router = useRouter();
  const { t, v } = useVertaling();
  const voortgang = useStoryProgressStore((state) => state.progress);
  const uitgelezen = useVoortgangStore((state) => state.completedStories);

  const { haltes, uit } = bepaalRoute(tijdperk.id, voortgang, uitgelezen);
  const beeld = haltes[0]?.verhaal.chapters[0]?.afbeelding;
  const kop = ERA_KOP[tijdperk.id as TijdperkId];

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/tijdperk/[id]', params: { id: tijdperk.id } })}
      style={[styles.tegel, { backgroundColor: tijdperk.kleur }]}>
      {beeld ? <Image source={beeld} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} /> : null}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: withAlpha(tijdperk.kleur, 0.72) }]} />

      <View style={styles.tekst}>
        <ThemedText type="title" style={styles.wit} numberOfLines={2}>
          {v(tijdperk.titel)}
        </ThemedText>
        <ThemedText type="small" style={styles.zacht}>
          {v(tijdperk.periode)}
        </ThemedText>
        <View style={styles.stand}>
          <View style={styles.balk}>
            <View style={[styles.vulling, { width: `${haltes.length ? (uit / haltes.length) * 100 : 0}%` }]} />
          </View>
          <ThemedText type="caption" style={styles.wit}>
            {t((s) => s.reis.tijdperkGelezen)(uit, haltes.length)}
          </ThemedText>
        </View>
      </View>

      {kop ? <Image source={kop} style={styles.kop} contentFit="contain" /> : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  tegel: {
    marginHorizontal: Spacing.four,
    minHeight: 132,
    borderRadius: Radii.card,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tekst: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  wit: {
    color: '#FFFFFF',
  },
  zacht: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  stand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  balk: {
    flex: 1,
    maxWidth: 140,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  vulling: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  kop: {
    width: 104,
    height: 104,
    marginRight: Spacing.three,
  },
});
