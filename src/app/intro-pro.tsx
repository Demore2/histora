import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PRO_BANNER_ENABLED } from '@/components/pro-access-banner';
import { ProWinkel } from '@/components/pro-paywall';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MAX_LEESBREEDTE, Radii, Spacing, withAlpha } from '@/constants/theme';
import { useAbonnement } from '@/hooks/use-abonnement';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { aankopen } from '@/lib/aankopen';
import { useOnboardingStore } from '@/store/onboarding-store';

const PHOXY = require('@/assets/images/vos/leraar-juichend.png');

/** Een cel is tekst, of een vinkje / streepje. */
type Cel = string | boolean;

/**
 * Het Pro-aanbod aan het eind van de intro (1.4.5). **Na het registreren en niet ervoor**: een
 * aankoop wordt bij RevenueCat aan het Supabase-id gekoppeld (`useAankopen`), en vóór het
 * inloggen zou hij bij een anonieme klant terechtkomen die bij geen enkel account hoort.
 *
 * De auth-poort stuurt hier precies één keer heen (`onboarding-store.afrondenOpen`). Daarna — of
 * meteen, als er niets te koop is of de lezer al Pro heeft — gaat het naar Home en het eerste
 * verhaal uit de intro.
 *
 * De vergelijking noemt alleen verschillen die de app vandaag echt afdwingt (zie de toelichting bij
 * `pro.voordeel*` in `i18n/en.ts`). Pakketten, proefperiode, kopen en herstellen komen uit
 * dezelfde `ProWinkel` als de gewone paywall, met de prijzen en de proefduur van Google.
 */
export default function IntroProScreen() {
  const theme = useTheme();
  const { t } = useVertaling();
  const { isPremium } = useAbonnement();
  const startVerhaalId = useOnboardingStore((s) => s.startVerhaalId);
  const sluitAfronding = useOnboardingStore((s) => s.sluitAfronding);
  const overslaan = !PRO_BANNER_ENABLED || !aankopen.beschikbaar || isPremium;

  function klaar() {
    sluitAfronding();
    router.replace('/');
    if (startVerhaalId) {
      // Na de omleiding naar Home, zodat "terug" vanuit het verhaal op Home uitkomt.
      setTimeout(() => router.push({ pathname: '/verhaal/[id]', params: { id: startVerhaalId } }), 50);
    }
  }

  useEffect(() => {
    if (overslaan) klaar();
    // Eén keer bij het openen: `klaar` verandert niet van betekenis tussen renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overslaan]);

  if (overslaan) return <ThemedView style={styles.scherm} />;

  const rijen: { label: string; gratis: Cel; pro: Cel }[] = [
    { label: t((s) => s.intro.rijVerhalen), gratis: t((s) => s.intro.rijVerhalenGratis), pro: t((s) => s.intro.rijVerhalenPro) },
    { label: t((s) => s.intro.rijAds), gratis: false, pro: true },
    { label: t((s) => s.intro.rijOffline), gratis: false, pro: true },
    { label: t((s) => s.intro.rijLevens), gratis: t((s) => s.intro.rijLevensGratis), pro: t((s) => s.intro.rijLevensPro) },
    { label: t((s) => s.intro.rijBevriezers), gratis: t((s) => s.intro.rijBevriezersGratis), pro: t((s) => s.intro.rijBevriezersPro) },
    // De proef geldt voor nieuwe klanten, en dat is wie hier binnenkomt (wens van de eigenaar, 1.4.5).
    { label: t((s) => s.intro.rijProef), gratis: false, pro: t((s) => s.intro.rijProefPro) },
  ];

  const cel = (waarde: Cel, pro: boolean) =>
    typeof waarde === 'boolean' ? (
      <Ionicons
        name={waarde ? 'checkmark-circle' : 'close-circle-outline'}
        size={22}
        color={waarde ? theme.succes : theme.inactive}
      />
    ) : (
      <ThemedText type={pro ? 'smallBold' : 'small'} themeColor={pro ? 'accent' : 'textSecondary'} style={styles.midden}>
        {waarde}
      </ThemedText>
    );

  return (
    <ThemedView style={styles.scherm}>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.inhoud} showsVerticalScrollIndicator={false}>
          <Image source={PHOXY} style={styles.vos} contentFit="contain" accessible={false} />
          <View style={styles.kop}>
            <ThemedText type="display" style={styles.midden}>
              {t((s) => s.intro.proTitel)}
            </ThemedText>
            <ThemedText type="body" themeColor="textSecondary" style={styles.midden}>
              {t((s) => s.intro.proOndertitel)}
            </ThemedText>
          </View>

          <View style={[styles.tabel, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.rij}>
              <View style={styles.labelKolom} />
              <ThemedText type="smallBold" themeColor="textSecondary" style={[styles.kolom, styles.midden]}>
                {t((s) => s.intro.gratis)}
              </ThemedText>
              <View style={[styles.kolom, styles.proKop, { backgroundColor: withAlpha(theme.accent, 0.14) }]}>
                <ThemedText type="smallBold" themeColor="accent" style={styles.midden}>
                  {t((s) => s.intro.pro)}
                </ThemedText>
              </View>
            </View>
            {rijen.map((rij) => (
              <View key={rij.label} style={[styles.rij, styles.rijRand, { borderTopColor: withAlpha(theme.inactive, 0.25) }]}>
                <ThemedText type="small" style={styles.labelKolom}>
                  {rij.label}
                </ThemedText>
                <View style={styles.kolom}>{cel(rij.gratis, false)}</View>
                <View style={styles.kolom}>{cel(rij.pro, true)}</View>
              </View>
            ))}
          </View>

          <ProWinkel bron="intro" onGekocht={klaar} />

          <Pressable onPress={klaar} accessibilityRole="button" style={styles.gratisKnop}>
            <ThemedText type="bodyBold" themeColor="textSecondary">
              {t((s) => s.intro.gratisDoorgaan)}
            </ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scherm: { flex: 1 },
  flex: { flex: 1 },
  midden: { textAlign: 'center' },
  inhoud: {
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.four,
  },
  vos: { width: 140, height: 140, alignSelf: 'center' },
  kop: { gap: Spacing.two },
  tabel: { borderRadius: Radii.card, paddingVertical: Spacing.two, paddingHorizontal: Spacing.three },
  rij: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.two, gap: Spacing.two },
  rijRand: { borderTopWidth: StyleSheet.hairlineWidth },
  labelKolom: { flex: 1.4 },
  kolom: { flex: 1, alignItems: 'center' },
  proKop: { borderRadius: Radii.small, paddingVertical: Spacing.one },
  gratisKnop: { alignItems: 'center', paddingVertical: Spacing.three },
});
