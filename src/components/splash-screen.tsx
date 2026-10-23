import { useEffect, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { ThemedText } from './themed-text';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const theme = useTheme();
  const { t } = useVertaling();
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(onFinish);
    }, 2500);

    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          opacity,
        },
      ]}>
      <View style={styles.content}>
        {/*
          Het merk heeft vaste kleuren en volgt `theme.accent` dus niet meer — een
          merkteken is in beide thema's één kleur, en #0EA5E9 draagt zowel op het
          beige #F7F1E4 als op het donkerbruine #1C1A16.
        */}
        {/* Sinds 1.2.1 de zwaaiende vos (de mascotte) in plaats van de blauwe H — hetzelfde
            beeld als het systeem-opstartscherm (`app-splash.png`), zodat de overgang van het ene
            naar het andere naadloos is. Het merk is groter dan de H was: een figuur heeft meer
            hoogte nodig dan een schijf om dezelfde aanwezigheid te hebben. */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/app-splash.png')}
            style={styles.vos}
            contentFit="contain"
            accessibilityIgnoresInvertColors
          />
        </View>

        {/*
          De merknaam. Hij komt uit i18n (`app.name`) zodat hij op één plek staat en niet
          in elk scherm opnieuw wordt overgetypt, maar hij is gelijk in alle vier de talen —
          een merknaam vertaal je niet. De hoofdletters zitten in de weergave en niet in de
          sleutel, want dezelfde sleutel wordt elders in normale schrijfwijze getoond.
        */}
        <ThemedText type="display" style={styles.title}>
          {t((s) => s.app.name).toUpperCase()}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          {t((s) => s.splash.ondertitel)}
        </ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  logoContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vos: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 200,
  },
});
