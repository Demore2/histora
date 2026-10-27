import { Ionicons } from '@expo/vector-icons';
import { Stack, useFocusEffect } from 'expo-router';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AdBanner } from '@/components/ad-banner';
import { AnimatedPressable } from '@/components/animated-pressable';
import { KopActies } from '@/components/kop-acties';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { haptics } from '@/constants/haptics';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { useWinkelStore, type KoopUitkomst } from '@/store/winkel-store';

/**
 * De winkel (1.3): je Dukaten, je streakbevriezers en hoe je meer verdient.
 *
 * **Een stack-scherm, geen tabblad** (sinds de eigenaar het zo wilde, 2026-10-23): je komt hier via
 * het Dukaten-knopje rechtsboven op elk hoofdscherm (`KopActies`), en de terugknop van `AppHeader`
 * brengt je terug. `(tabs)/winkel.tsx` is een omleiding hierheen.
 *
 * **Alles wat hier staat is wat de server zegt.** Saldo, aantal en prijs komen uit `winkel-store`,
 * dat een kopie is van `winkel_stand()`; kopen gaat via `koop_bevriezer()`, dat zelf controleert of
 * je genoeg hebt. De knop rekent alleen vooruit om te kunnen zeggen *waarom* hij uit staat — de
 * beslissing ligt niet hier.
 *
 * Bewust nog geen Dukaten-pakketten voor echt geld (1.3b): die hebben producten in de Play Console
 * nodig en een `revenuecat-sync` die ze bijschrijft. De regel onderaan zegt dat ze eraan komen.
 */
export default function ShopScreen() {
  const theme = useTheme();
  const { t } = useVertaling();
  const saldo = useWinkelStore((s) => s.saldo);
  const bevriezers = useWinkelStore((s) => s.bevriezers);
  const instellingen = useWinkelStore((s) => s.instellingen);
  const [bezig, setBezig] = useState(false);
  const [uitkomst, setUitkomst] = useState<KoopUitkomst | null>(null);

  // Bij elk bezoek opnieuw ophalen: de Dukaten van een net afgerond hoofdstuk zijn dan binnen.
  useFocusEffect(
    useCallback(() => {
      void useWinkelStore.getState().verzilver().then(() => useWinkelStore.getState().haalOp());
    }, []),
  );

  const vol = bevriezers >= instellingen.maxBevriezers;
  const tekort = Math.max(0, instellingen.bevriezerPrijs - saldo);

  async function koop() {
    setBezig(true);
    setUitkomst(null);
    const resultaat = await useWinkelStore.getState().koopBevriezer();
    setBezig(false);
    setUitkomst(resultaat);
    if (resultaat === 'gekocht') haptics.succes();
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: '' }} />
      {/* Geen bovenrand: `AppHeader` boven dit scherm vangt de statusbalk al op. */}
      <SafeAreaView edges={[]} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.inhoud} showsVerticalScrollIndicator={false}>
          <View style={styles.kop}>
            <View style={styles.kopRij}>
              <ThemedText type="display">{t((s) => s.winkel.titel)}</ThemedText>
              <KopActies toonWinkel={false} />
            </View>
            <ThemedText themeColor="textSecondary">{t((s) => s.winkel.ondertitel)}</ThemedText>
          </View>

          <View style={[styles.kaart, styles.saldoKaart, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={styles.munt}>🪙</ThemedText>
            <View style={styles.saldoTekst}>
              <ThemedText type="small" themeColor="textSecondary">
                {t((s) => s.winkel.saldoLabel)}
              </ThemedText>
              <ThemedText type="title">{t((s) => s.winkel.dukaten)(saldo)}</ThemedText>
            </View>
          </View>

          <View style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.artikel}>
              <Image
                source={require('@/assets/images/vos/widget/fase-8-ijs.png')}
                style={styles.artikelBeeld}
                contentFit="contain"
              />
              <View style={styles.artikelTekst}>
                <ThemedText type="subtitle">{t((s) => s.winkel.bevriezerTitel)}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {t((s) => s.winkel.bevriezerUitleg)}
                </ThemedText>
                <View style={styles.vakjes}>
                  {Array.from({ length: instellingen.maxBevriezers }, (_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.vakje,
                        {
                          backgroundColor:
                            i < bevriezers ? withAlpha('#38BDF8', 0.25) : theme.backgroundSelected,
                          borderColor: i < bevriezers ? '#38BDF8' : 'transparent',
                        },
                      ]}>
                      <ThemedText style={{ opacity: i < bevriezers ? 1 : 0.3 }}>❄️</ThemedText>
                    </View>
                  ))}
                  <ThemedText type="small" themeColor="textSecondary">
                    {t((s) => s.winkel.bevriezerStand)(bevriezers, instellingen.maxBevriezers)}
                  </ThemedText>
                </View>
              </View>
            </View>

            <AnimatedPressable
              onPress={koop}
              disabled={vol || tekort > 0 || bezig}
              accessibilityRole="button"
              style={[
                styles.knop,
                { backgroundColor: vol || tekort > 0 ? theme.backgroundSelected : theme.accent },
              ]}>
              <ThemedText
                type="bodyBold"
                style={{ color: vol || tekort > 0 ? theme.textSecondary : theme.background }}>
                {vol
                  ? t((s) => s.winkel.vol)
                  : tekort > 0
                    ? t((s) => s.winkel.tekort)(tekort)
                    : `${t((s) => s.winkel.koop)(instellingen.bevriezerPrijs)} 🪙`}
              </ThemedText>
            </AnimatedPressable>

            {uitkomst === 'gekocht' ? (
              <ThemedText type="small" style={[styles.melding, { color: theme.succes }]}>
                {t((s) => s.winkel.gekocht)}
              </ThemedText>
            ) : uitkomst && uitkomst !== 'maximum' ? (
              <ThemedText type="small" style={[styles.melding, { color: theme.gevaar }]}>
                {t((s) => s.winkel.mislukt)}
              </ThemedText>
            ) : null}

            <ThemedText type="caption" themeColor="textSecondary" style={styles.melding}>
              {t((s) => s.winkel.proRegel)(instellingen.proBevriezersPerMaand)}
            </ThemedText>
          </View>

          <View style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="smallBold">{t((s) => s.winkel.verdienKop)}</ThemedText>
            <View style={styles.regel}>
              <Ionicons name="book-outline" size={18} color={theme.accent} />
              <ThemedText type="small">
                {t((s) => s.winkel.verdienHoofdstuk)(instellingen.perHoofdstuk)}
              </ThemedText>
            </View>
            <View style={styles.regel}>
              <Ionicons name="star-outline" size={18} color={theme.accent} />
              <ThemedText type="small">
                {t((s) => s.winkel.verdienVerhaal)(instellingen.perVerhaal)}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="caption" themeColor="textSecondary" style={styles.voet}>
            {t((s) => s.winkel.pakkettenBinnenkort)}
          </ThemedText>

          {/* Onderaan, onder alles wat je kunt kopen (1.4.3): een banner tussen de producten zou
              op een knop lijken. Rendert niets voor Pro of zonder geladen advertentie. */}
          <AdBanner />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  inhoud: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  kop: { gap: Spacing.one },
  kopRij: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  kaart: {
    borderRadius: Radii.card,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  saldoKaart: { flexDirection: 'row', alignItems: 'center' },
  munt: { fontSize: 40, lineHeight: 48 },
  saldoTekst: { gap: Spacing.half },
  artikel: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
  artikelBeeld: { width: 96, height: 96 },
  artikelTekst: { flex: 1, gap: Spacing.one },
  vakjes: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: Spacing.one },
  vakje: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knop: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radii.button,
  },
  melding: { textAlign: 'center' },
  regel: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  voet: { textAlign: 'center' },
});
