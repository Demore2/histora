import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { AdBanner } from '@/components/ad-banner';
import { AnimatedPressable } from '@/components/animated-pressable';
import { LegeStaat } from '@/components/lege-staat';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ERA_KOP } from '@/constants/era-koppen';
import { Motion } from '@/constants/motion';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import { bepaalRoute, type Halte } from '@/content/queries';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import type { TijdperkId } from '@/lib/trivia';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * De routekaart van één tijdperk (1.4.2): de verhalen als haltes op een pad dat van boven naar
 * beneden zigzagt, in tijdlijnvolgorde (`bepaalRoute`). Was een raster van kaarten.
 *
 * - **Elke halte is vrij aan te klikken** (wens van de eigenaar): de route is een volgorde, geen
 *   slot. Personages blijven vrijgespeeld worden door uit te lezen.
 * - Verticaal en niet als slang naar links en rechts: op een telefoon scrol je omlaag, en het pad
 *   werkt zo even goed met drie haltes als met dertig.
 * - Het stuk pad ná een uitgelezen halte is doorgetrokken in de tijdperkkleur, de rest gestippeld.
 *   De volgende halte pulseert, en daar staat Phoxy.
 */

const RIJ_HOOGTE = 172;
const KNOOP = 88;
/** Waar de haltes staan, als fractie van de breedte: om en om links en rechts. */
const LINKS = 0.27;
const RECHTS = 0.73;
/** Phoxy bij de volgende halte: op weg, met kaart en tas (`scripts/prepare-route-fox.mjs`). */
const ROUTE_VOS = require('@/assets/images/vos/op-weg.png');

export default function TijdperkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { t, v } = useVertaling();
  const voortgang = useStoryProgressStore((state) => state.progress);
  const uitgelezen = useVoortgangStore((state) => state.completedStories);
  const [breedte, setBreedte] = useState(0);

  const tijdperk = getTijdperk(id);

  if (!tijdperk) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: t((s) => s.tijdperkScherm.titel) }} />
        <LegeStaat
          titel={t((s) => s.tijdperkScherm.nietGevondenTitel)}
          beschrijving={t((s) => s.tijdperkScherm.nietGevondenBeschrijving)}
        />
      </ThemedView>
    );
  }

  const { haltes, volgende, uit } = bepaalRoute(tijdperk.id, voortgang, uitgelezen);
  const kop = ERA_KOP[tijdperk.id as TijdperkId];
  const openVerhaal = (verhaalId: string) => router.push({ pathname: '/verhaal/[id]', params: { id: verhaalId } });

  const xVan = (index: number) => breedte * (index % 2 === 0 ? LINKS : RECHTS);
  const yVan = (index: number) => index * RIJ_HOOGTE + RIJ_HOOGTE / 2;

  const knopTekst =
    volgende === null
      ? t((s) => s.reis.routeKlaar)
      : uit === 0 && haltes[volgende].stand === 'open'
        ? t((s) => s.reis.routeBegin)
        : t((s) => s.reis.routeVerder);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.kop, { backgroundColor: tijdperk.kleur }]}>
          <View style={styles.kopTekst}>
            <ThemedText type="display" style={styles.wit} numberOfLines={2} adjustsFontSizeToFit>
              {v(tijdperk.titel)}
            </ThemedText>
            <ThemedText style={styles.wit}>{v(tijdperk.periode)}</ThemedText>
            <ThemedText type="smallBold" style={styles.wit}>
              {t((s) => s.reis.tijdperkGelezen)(uit, haltes.length)}
            </ThemedText>
          </View>
          {kop ? <Image source={kop} style={styles.kopVos} contentFit="contain" /> : null}
        </View>

        {haltes.length === 0 ? (
          <LegeStaat
            titel={t((s) => s.tijdperkScherm.geenVerhalenTitel)}
            beschrijving={t((s) => s.tijdperkScherm.geenVerhalenBeschrijving)}
          />
        ) : (
          <>
            {volgende === null ? (
              <View style={[styles.cta, { backgroundColor: theme.backgroundElement }]}>
                <Ionicons name="trophy" size={18} color={tijdperk.kleur} />
                <ThemedText type="smallBold">{knopTekst}</ThemedText>
              </View>
            ) : (
              <AnimatedPressable
                onPress={() => openVerhaal(haltes[volgende].verhaal.id)}
                style={[styles.cta, { backgroundColor: tijdperk.kleur }]}>
                <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
                  {knopTekst}
                </ThemedText>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </AnimatedPressable>
            )}

            <View
              style={{ height: haltes.length * RIJ_HOOGTE }}
              onLayout={(e) => setBreedte(e.nativeEvent.layout.width)}>
              {breedte > 0 ? (
                <>
                  <Svg width={breedte} height={haltes.length * RIJ_HOOGTE} style={StyleSheet.absoluteFill}>
                    {haltes.slice(0, -1).map((halte, i) => {
                      const x1 = xVan(i);
                      const y1 = yVan(i);
                      const x2 = xVan(i + 1);
                      const y2 = yVan(i + 1);
                      const bocht = RIJ_HOOGTE * 0.55;
                      const doorgetrokken = halte.stand === 'uit';
                      return (
                        <Path
                          key={halte.verhaal.id}
                          d={`M ${x1} ${y1} C ${x1} ${y1 + bocht}, ${x2} ${y2 - bocht}, ${x2} ${y2}`}
                          stroke={doorgetrokken ? tijdperk.kleur : withAlpha(theme.textSecondary, 0.35)}
                          strokeWidth={8}
                          strokeLinecap="round"
                          strokeDasharray={doorgetrokken ? undefined : '2 16'}
                          fill="none"
                        />
                      );
                    })}
                  </Svg>

                  {haltes.map((halte, i) => (
                    <HalteKnoop
                      key={halte.verhaal.id}
                      halte={halte}
                      links={i % 2 === 0}
                      x={xVan(i)}
                      y={yVan(i)}
                      breedte={breedte}
                      isVolgende={i === volgende}
                      kleur={tijdperk.kleur}
                      onPress={() => openVerhaal(halte.verhaal.id)}
                    />
                  ))}
                </>
              ) : null}
            </View>

            <View style={styles.advertentie}>
              <AdBanner />
            </View>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

/**
 * Eén halte. Een eigen component omdat de volgende halte een eigen puls (shared value) heeft, en
 * hooks niet in een `.map()` mogen — zelfde reden als `HoofdstukTegel`.
 */
function HalteKnoop({
  halte,
  links,
  x,
  y,
  breedte,
  isVolgende,
  kleur,
  onPress,
}: {
  halte: Halte;
  links: boolean;
  x: number;
  y: number;
  breedte: number;
  isVolgende: boolean;
  kleur: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  const { t, v } = useVertaling();
  const puls = useSharedValue(1);

  useEffect(() => {
    if (!isVolgende) return;
    puls.set(
      withRepeat(
        withSequence(
          withTiming(1.18, { duration: Motion.duration.traag * 2 }),
          withTiming(1, { duration: Motion.duration.traag * 2 })
        ),
        -1
      )
    );
  }, [isVolgende, puls]);

  const pulsStijl = useAnimatedStyle(() => ({
    transform: [{ scale: puls.get() }],
    opacity: 1.6 - puls.get(),
  }));

  const { verhaal, stand, afgerond } = halte;
  const randKleur = stand === 'uit' ? kleur : stand === 'bezig' || isVolgende ? kleur : withAlpha(theme.textSecondary, 0.3);

  // Het label staat aan de binnenkant (naar het midden toe), Phoxy aan de buitenkant. De afstand
  // houdt rekening met de pulsring (8 px buiten de knoop), anders plakt "Next stop" ertegenaan.
  const afstand = KNOOP / 2 + 8 + Spacing.three;
  const labelBreedte = breedte / 2 - afstand + Spacing.four;
  const labelStijl = links
    ? { left: x + afstand, alignItems: 'flex-start' as const }
    : { right: breedte - x + afstand, alignItems: 'flex-end' as const };

  return (
    <>
      {isVolgende ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.puls,
            { left: x - KNOOP / 2 - 8, top: y - KNOOP / 2 - 8, borderColor: kleur },
            pulsStijl,
          ]}
        />
      ) : null}

      <AnimatedPressable
        onPress={onPress}
        style={[styles.knoop, { left: x - KNOOP / 2, top: y - KNOOP / 2, borderColor: randKleur, backgroundColor: verhaal.portretKleur }]}>
        {verhaal.afbeelding ? (
          <Image source={verhaal.afbeelding} style={styles.portret} contentFit="cover" />
        ) : null}
      </AnimatedPressable>

      {stand === 'uit' ? (
        <View
          pointerEvents="none"
          style={[styles.vinkje, { left: x + KNOOP / 2 - 26, top: y - KNOOP / 2 - 2, backgroundColor: kleur, borderColor: theme.background }]}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
      ) : null}

      {isVolgende ? (
        <Image
          source={ROUTE_VOS}
          pointerEvents="none"
          style={[styles.vos, links ? { left: Math.max(0, x - KNOOP / 2 - 70) } : { left: Math.min(breedte - 64, x + KNOOP / 2 + 6) }, { top: y - 20 }]}
          contentFit="contain"
        />
      ) : null}

      <View pointerEvents="none" style={[styles.label, labelStijl, { top: y - 30, width: labelBreedte }]}>
        {isVolgende ? (
          <ThemedText type="caption" style={[styles.hoofdletters, { color: kleur }]}>
            {t((s) => s.reis.halteVolgende)}
          </ThemedText>
        ) : null}
        <ThemedText type="smallBold" numberOfLines={2} style={{ textAlign: links ? 'left' : 'right' }}>
          {v(verhaal.titel)}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {stand === 'bezig'
            ? t((s) => s.reis.halteBezig)(afgerond + 1, verhaal.chapters.length)
            : verhaal.periodeLabel}
        </ThemedText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  kop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.three,
  },
  kopTekst: {
    flex: 1,
    gap: Spacing.one,
  },
  kopVos: {
    width: 112,
    height: 112,
  },
  wit: {
    color: '#FFFFFF',
  },
  cta: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Radii.button,
  },
  knoop: {
    position: 'absolute',
    width: KNOOP,
    height: KNOOP,
    borderRadius: KNOOP / 2,
    borderWidth: 4,
    overflow: 'hidden',
  },
  portret: {
    width: '100%',
    height: '100%',
  },
  puls: {
    position: 'absolute',
    width: KNOOP + 16,
    height: KNOOP + 16,
    borderRadius: (KNOOP + 16) / 2,
    borderWidth: 3,
  },
  vinkje: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vos: {
    position: 'absolute',
    width: 64,
    height: 64,
  },
  label: {
    position: 'absolute',
    gap: 2,
  },
  hoofdletters: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  advertentie: {
    paddingHorizontal: Spacing.four,
  },
});
