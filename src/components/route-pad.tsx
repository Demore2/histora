import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState, type ReactNode } from 'react';
import { StyleSheet, View, type ImageSourcePropType } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Motion } from '@/constants/motion';
import { Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Het zigzagpad van de routekaarten (1.4.2): haltes om en om links en rechts, van boven naar
 * beneden, verbonden door een SVG-pad. Gedeeld door `tijdperk/[id]` (de verhalen van een tijdperk)
 * en `verhaal/[id]/chapters` (de hoofdstukken van een verhaal), zodat die twee nooit uit elkaar
 * groeien.
 *
 * - Verticaal en niet als slang naar links en rechts: op een telefoon scrol je omlaag, en het pad
 *   werkt zo even goed met drie haltes als met dertig.
 * - Het stuk pad ná een afgeronde halte is doorgetrokken in de routekleur, de rest gestippeld.
 *   De volgende halte pulseert, en daar staat Phoxy.
 * - Of een halte op slot zit beslist de aanroeper: zonder `onPress` is hij niet aan te tikken.
 */

export type RouteHalte = {
  sleutel: string;
  /** Afgerond: vinkje, en het pad naar de volgende halte is doorgetrokken. */
  af: boolean;
  /** Rand in de routekleur in plaats van grijs (bijvoorbeeld een half gelezen verhaal). */
  actief: boolean;
  achtergrond: string;
  afbeelding?: ImageSourcePropType;
  /** Gecentreerd over het beeld heen: een Romeins cijfer, een slot. */
  overlay?: ReactNode;
  titel: string;
  onder: string;
  /** In de week na het toevoegen een labeltje "New" boven de knoop (`isNieuw`). */
  nieuwLabel?: string;
  /** Weglaten = op slot: niet aan te tikken en gedimd. */
  onPress?: () => void;
};

const RIJ_HOOGTE = 172;
const KNOOP = 88;
/** Waar de haltes staan, als fractie van de breedte: om en om links en rechts. */
const LINKS = 0.27;
const RECHTS = 0.73;
/** Phoxy bij de volgende halte: op weg, met kaart en tas (`scripts/prepare-route-fox.mjs`). */
const ROUTE_VOS = require('@/assets/images/vos/op-weg.png');

export function RoutePad({
  haltes,
  volgende,
  kleur,
  volgendeLabel,
}: {
  haltes: RouteHalte[];
  /** Index van de halte die pulseert en waar Phoxy staat; `null` als alles af is. */
  volgende: number | null;
  kleur: string;
  /** Het kopje boven de volgende halte ("Next stop"). */
  volgendeLabel: string;
}) {
  const theme = useTheme();
  const [breedte, setBreedte] = useState(0);

  const xVan = (index: number) => breedte * (index % 2 === 0 ? LINKS : RECHTS);
  const yVan = (index: number) => index * RIJ_HOOGTE + RIJ_HOOGTE / 2;
  const hoogte = haltes.length * RIJ_HOOGTE;

  return (
    <View style={{ height: hoogte }} onLayout={(e) => setBreedte(e.nativeEvent.layout.width)}>
      {breedte > 0 ? (
        <>
          <Svg width={breedte} height={hoogte} style={StyleSheet.absoluteFill}>
            {haltes.slice(0, -1).map((halte, i) => {
              const x1 = xVan(i);
              const y1 = yVan(i);
              const x2 = xVan(i + 1);
              const y2 = yVan(i + 1);
              const bocht = RIJ_HOOGTE * 0.55;
              return (
                <Path
                  key={halte.sleutel}
                  d={`M ${x1} ${y1} C ${x1} ${y1 + bocht}, ${x2} ${y2 - bocht}, ${x2} ${y2}`}
                  stroke={halte.af ? kleur : withAlpha(theme.textSecondary, 0.35)}
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeDasharray={halte.af ? undefined : '2 16'}
                  fill="none"
                />
              );
            })}
          </Svg>

          {haltes.map((halte, i) => (
            <HalteKnoop
              key={halte.sleutel}
              halte={halte}
              links={i % 2 === 0}
              x={xVan(i)}
              y={yVan(i)}
              breedte={breedte}
              isVolgende={i === volgende}
              kleur={kleur}
              volgendeLabel={volgendeLabel}
            />
          ))}
        </>
      ) : null}
    </View>
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
  volgendeLabel,
}: {
  halte: RouteHalte;
  links: boolean;
  x: number;
  y: number;
  breedte: number;
  isVolgende: boolean;
  kleur: string;
  volgendeLabel: string;
}) {
  const theme = useTheme();
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

  const opSlot = halte.onPress === undefined;
  const randKleur = halte.af || halte.actief || isVolgende ? kleur : withAlpha(theme.textSecondary, 0.3);

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
        onPress={halte.onPress}
        disabled={opSlot}
        style={[
          styles.knoop,
          {
            left: x - KNOOP / 2,
            top: y - KNOOP / 2,
            borderColor: randKleur,
            // De grijze rand is half doorzichtig: onder een portret zou de portretKleur erdoorheen
            // schijnen en als de kleur van een ander tijdperk lezen. Alleen zonder beeld is hij de vulling.
            backgroundColor: halte.afbeelding ? theme.background : halte.achtergrond,
            opacity: opSlot ? 0.6 : 1,
          },
        ]}>
        {halte.afbeelding ? (
          <Image source={halte.afbeelding} style={styles.vul} contentFit="cover" />
        ) : null}
        {halte.overlay ? <View style={[StyleSheet.absoluteFill, styles.midden]}>{halte.overlay}</View> : null}
      </AnimatedPressable>

      {halte.nieuwLabel ? (
        // Gecentreerd onder de knoop, over de rand heen: boven zit het vinkje, opzij het label en Phoxy.
        <View pointerEvents="none" style={[styles.nieuwPlek, { left: x - KNOOP / 2, top: y + KNOOP / 2 - 12 }]}>
          <View style={[styles.nieuw, { backgroundColor: kleur, borderColor: theme.background }]}>
            <ThemedText type="caption" style={styles.nieuwTekst}>
              {halte.nieuwLabel}
            </ThemedText>
          </View>
        </View>
      ) : null}

      {halte.af ? (
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
            {volgendeLabel}
          </ThemedText>
        ) : null}
        <ThemedText
          type="smallBold"
          numberOfLines={2}
          themeColor={opSlot ? 'textSecondary' : undefined}
          style={{ textAlign: links ? 'left' : 'right' }}>
          {halte.titel}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary" style={{ textAlign: links ? 'left' : 'right' }}>
          {halte.onder}
        </ThemedText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  knoop: {
    position: 'absolute',
    width: KNOOP,
    height: KNOOP,
    borderRadius: KNOOP / 2,
    borderWidth: 4,
    overflow: 'hidden',
  },
  vul: {
    width: '100%',
    height: '100%',
  },
  midden: {
    alignItems: 'center',
    justifyContent: 'center',
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
  nieuwPlek: {
    position: 'absolute',
    width: KNOOP,
    alignItems: 'center',
  },
  nieuw: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 1,
    borderRadius: 999,
    borderWidth: 2,
  },
  nieuwTekst: {
    color: '#FFFFFF',
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
});
