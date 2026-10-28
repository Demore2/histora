import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import type { Tijdperk } from '@/constants/types';
import { bepaalRoute, isNieuw } from '@/content/queries';
import { useVandaag } from '@/hooks/use-vandaag';
import { useVertaling } from '@/hooks/use-vertaling';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * Eén tijdperk op Explore (sinds 1.4.5; 1.4.2-1.4.4 op Home), over de volle breedte en onder elkaar — vervangt de carrousel per
 * tijdperk (`TijdperkRij`). Tikken opent de routekaart van dat tijdperk (`tijdperk/[id]`).
 *
 * Achtergrond: de openingsscène van het eerste verhaal op de tijdlijn van dat tijdperk, onder een
 * waas in de tijdperkkleur. Hier stond rechts Phoxy met het hoofddeksel van het tijdperk; die is
 * eruit (wens van de eigenaar, 1.4.3): met een scène én een vos op elke tegel werd Home te druk.
 * Phoxy staat nog wel bovenaan de routekaart zelf en op het wiel van Explore. Ook geen pijltje:
 * de hele tegel is aan te tikken. Wel een labeltje "New" in de week na een nieuw verhaal.
 */
export function TijdperkTegel({ tijdperk }: { tijdperk: Tijdperk }) {
  const router = useRouter();
  const { t, v } = useVertaling();
  const voortgang = useStoryProgressStore((state) => state.progress);
  const uitgelezen = useVoortgangStore((state) => state.completedStories);

  const { haltes, uit } = bepaalRoute(tijdperk.id, voortgang, uitgelezen);
  const beeld = haltes[0]?.verhaal.chapters[0]?.afbeelding;
  const vandaag = useVandaag();
  const heeftNieuw = haltes.some((halte) => isNieuw(halte.verhaal, vandaag));

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
            {/* Een percentage in plaats van "4/12" (1.4.5, wens van de eigenaar): tijdperken van 12 en
                van 3 verhalen zijn zo naast elkaar te vergelijken. */}
            {t((s) => s.reis.tijdperkProcent)(haltes.length ? Math.round((uit / haltes.length) * 100) : 0)}
          </ThemedText>
        </View>
      </View>

      {heeftNieuw ? (
        <View style={styles.label}>
          <ThemedText type="caption" style={{ color: tijdperk.kleur }}>
            {t((s) => s.ontdek.nieuwLabel)}
          </ThemedText>
        </View>
      ) : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: Radii.button,
    backgroundColor: '#FFFFFF',
  },
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
});
