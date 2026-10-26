import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { scheduleOnRN } from 'react-native-worklets';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { haptics } from '@/constants/haptics';
import { useTheme } from '@/hooks/use-theme';

/** Eén vak: de kleur van het tijdperk, Phoxy met het bijbehorende hoofddeksel, en of je de kroon al hebt. */
export type WielVak = { kleur: string; beeld: number; gekroond: boolean };

const GOUD = '#F2C230';

const VAKKEN = 6;
const HOEK = 360 / VAKKEN;
const DRAAITIJD = 3200;

/** Het pad van één taartpunt, met hoek 0 bovenaan en met de klok mee. */
function taartpunt(index: number, straal: number): string {
  const naarXY = (graden: number) => {
    const rad = ((graden - 90) * Math.PI) / 180;
    return [straal + straal * Math.cos(rad), straal + straal * Math.sin(rad)];
  };
  const [x1, y1] = naarXY(index * HOEK);
  const [x2, y2] = naarXY((index + 1) * HOEK);
  return `M ${straal} ${straal} L ${x1} ${y1} A ${straal} ${straal} 0 0 1 ${x2} ${y2} Z`;
}

/**
 * Het draaiwiel van Explore: zes vakken, één per tijdperk, en een knop in het midden.
 *
 * **Waar het wiel stopt wordt vooraf gekozen**, bij de tik, en daarna wordt er naartoe gedraaid —
 * niet andersom (los draaien en kijken waar hij uitkomt). Zo is de uitkomst eerlijk verdeeld en
 * weet het scherm zeker welk vak onder de wijzer staat, ook als de animatie op een traag toestel
 * frames overslaat.
 *
 * Het wiel draait eerst een paar volle rondes en remt dan af (`Easing.out(cubic)`), met een
 * kleine willekeurige verschuiving binnen het vak, zodat hij niet elke keer precies in het midden
 * stopt.
 */
export function TriviaWiel({
  vakken,
  maat,
  uitgeschakeld,
  knopTekst,
  onKlaar,
}: {
  vakken: WielVak[];
  maat: number;
  uitgeschakeld: boolean;
  knopTekst: string;
  onKlaar: (index: number) => void;
}) {
  const theme = useTheme();
  const [draait, setDraait] = useState(false);
  const rotatie = useSharedValue(0);
  const straal = maat / 2;

  const wielStijl = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotatie.get()}deg` }] }));
  // Reuzenrad: de koppen draaien precies tegen het wiel in en staan dus altijd rechtop — ook in
  // de onderste vakken, waar ze anders op hun kop zouden hangen.
  const rechtopStijl = useAnimatedStyle(() => ({ transform: [{ rotate: `${-rotatie.get()}deg` }] }));

  function draai() {
    if (draait || uitgeschakeld) return;
    setDraait(true);
    haptics.tik();

    const doel = Math.floor(Math.random() * VAKKEN);
    const verschuiving = (Math.random() - 0.5) * HOEK * 0.6;
    // Het vak onder de wijzer (bovenaan) is het vak op hoek (-rotatie mod 360).
    const huidig = ((rotatie.get() % 360) + 360) % 360;
    const gewenst = (360 - (doel * HOEK + HOEK / 2 + verschuiving)) % 360;
    const erbij = 360 * 5 + ((gewenst - huidig + 360) % 360);

    const klaar = () => {
      setDraait(false);
      haptics.succes();
      onKlaar(doel);
    };
    rotatie.set(
      withTiming(rotatie.get() + erbij, { duration: DRAAITIJD, easing: Easing.out(Easing.cubic) }, (af) => {
        if (af) scheduleOnRN(klaar);
      })
    );
  }

  return (
    <View style={[styles.vak, { width: maat, height: maat + 14 }]}>
      <Animated.View style={[{ width: maat, height: maat, marginTop: 14 }, wielStijl]}>
        <Svg width={maat} height={maat}>
          {vakken.map((v, i) => (
            <Path key={i} d={taartpunt(i, straal)} fill={v.kleur} stroke={theme.background} strokeWidth={3} />
          ))}
          <Circle cx={straal} cy={straal} r={straal - 2} stroke={theme.background} strokeWidth={4} fill="none" />
        </Svg>
        {vakken.map((v, i) => {
          const rad = (((i + 0.5) * HOEK - 90) * Math.PI) / 180;
          const afstand = straal * 0.66;
          const badge = maat * 0.22;
          return (
            <Animated.View
              key={i}
              style={[
                styles.badgeVak,
                {
                  width: badge,
                  height: badge,
                  left: straal + afstand * Math.cos(rad) - badge / 2,
                  top: straal + afstand * Math.sin(rad) - badge / 2,
                },
                rechtopStijl,
              ]}>
              {/* Rond, zodat de rechte onderkant van de schouders in het plaatje wegvalt. */}
              <View style={[styles.badge, { borderRadius: badge / 2, borderColor: v.gekroond ? GOUD : '#FFFFFF' }]}>
                <Image source={v.beeld} style={styles.kop} contentFit="cover" accessible={false} />
              </View>
              {v.gekroond && (
                <View style={[styles.kroon, { backgroundColor: GOUD }]}>
                  <MaterialCommunityIcons name="crown" size={14} color="#FFFFFF" />
                </View>
              )}
            </Animated.View>
          );
        })}
      </Animated.View>

      {/* De wijzer staat stil bovenaan; het wiel draait eronder. */}
      <View style={[styles.wijzer, { left: straal - 12, borderTopColor: theme.text }]} />

      <AnimatedPressable
        onPress={draai}
        disabled={draait || uitgeschakeld}
        haptisch={false}
        accessibilityRole="button"
        accessibilityState={{ disabled: draait || uitgeschakeld }}
        style={[
          styles.knop,
          {
            width: maat * 0.3,
            height: maat * 0.3,
            borderRadius: maat * 0.15,
            left: straal - maat * 0.15,
            top: 14 + straal - maat * 0.15,
            backgroundColor: theme.background,
            borderColor: theme.text,
            opacity: uitgeschakeld ? 0.5 : 1,
          },
        ]}>
        <ThemedText type="smallBold" style={styles.knopTekst}>
          {knopTekst}
        </ThemedText>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  vak: {
    alignSelf: 'center',
  },
  badgeVak: {
    position: 'absolute',
  },
  badge: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  kop: {
    width: '100%',
    height: '100%',
  },
  kroon: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wijzer: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  knop: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  knopTekst: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
