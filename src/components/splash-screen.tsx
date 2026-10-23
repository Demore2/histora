import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Typography } from '@/constants/theme';
import { useVertaling } from '@/hooks/use-vertaling';

interface SplashScreenProps {
  onFinish: () => void;
}

/** Zelfde maat als `imageWidth` van de `expo-splash-screen`-plugin in app.json. */
const VOS_MAAT = 200;

/**
 * Het tweede deel van het opstarten. Het eerste is het opstartscherm van Android zelf
 * (`app-splash.png` op `#F7F1E4`), en dat valt niet weg te halen: sinds Android 12 toont het
 * systeem het altijd. Dit scherm was een tweede blad met dezelfde vos op een andere plek, dus de
 * lezer zag de vos twee keer verschijnen (opmerking van de eigenaar, 1.3.1).
 *
 * Nu **neemt het het systeemscherm naadloos over**: dezelfde achtergrond (vast beige, ook in het
 * donkere thema — anders flitst het van beige naar bruin), dezelfde vos op exact dezelfde plek en
 * maat, en alleen de naam en de ondertitel komen eronder bij. Het leest als één scherm.
 */
export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { t } = useVertaling();
  const [opacity] = useState(() => new Animated.Value(1));
  const [tekst] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animatie = Animated.sequence([
      Animated.timing(tekst, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.delay(1100),
      Animated.timing(opacity, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]);
    animatie.start(({ finished }) => {
      if (finished) onFinish();
    });
    return () => animatie.stop();
  }, [opacity, tekst, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={require('@/assets/images/app-splash.png')}
        style={styles.vos}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
      {/* De merknaam komt uit i18n (`app.name`) maar is in alle talen gelijk; de hoofdletters zitten
          in de weergave, want dezelfde sleutel wordt elders in normale schrijfwijze getoond. */}
      <Animated.View
        style={[
          styles.tekst,
          {
            opacity: tekst,
            transform: [{ translateY: tekst.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
          },
        ]}>
        <Text style={styles.title}>{t((s) => s.app.name).toUpperCase()}</Text>
        <Text style={styles.subtitle}>{t((s) => s.splash.ondertitel)}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  vos: {
    width: VOS_MAAT,
    height: VOS_MAAT,
  },
  // Onder de vos gehangen, niet ernaast in de flex-stroom: dan blijft de vos precies in het
  // midden staan, waar het systeemscherm hem achterliet.
  tekst: {
    position: 'absolute',
    top: '50%',
    marginTop: VOS_MAAT / 2 + 12,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    ...Typography.display,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 220,
    color: Colors.light.textSecondary,
  },
});
