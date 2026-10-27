import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import type { Verhaal } from '@/constants/types';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';

/**
 * "Pick up where you left off" op Home (1.4.4, wens van de eigenaar), direct onder de reiskaart.
 * De reiskaart is chronologisch; deze tegel is voor het verhaal dat je buiten die volgorde om bent
 * begonnen (`bepaalOppakken`). Twee losse tegels, omdat het twee vragen zijn: "wat is de volgende
 * halte" en "waar was ik". Vervangt de rij "Continue reading".
 *
 * Tikken gaat naar het hoofdstukkenoverzicht, net als de reiskaart: daar staan de poorten.
 */
export function OppakKaart({ verhaal, afgerond }: { verhaal: Verhaal; afgerond: number }) {
  const router = useRouter();
  const theme = useTheme();
  const { t, v } = useVertaling();
  const kleur = getTijdperk(verhaal.tijdperkId)?.kleur ?? theme.accent;
  const totaal = verhaal.chapters.length;
  const beeld = verhaal.chapters[Math.min(afgerond, totaal - 1)]?.afbeelding ?? verhaal.afbeelding;

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/verhaal/[id]', params: { id: verhaal.id } })}
      style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.beeld, { backgroundColor: verhaal.portretKleur, borderColor: kleur }]}>
        {beeld ? <Image source={beeld} style={styles.vul} contentFit="cover" /> : null}
      </View>

      <View style={styles.tekst}>
        <ThemedText type="caption" style={[styles.kop, { color: kleur }]}>
          {t((s) => s.reis.oppakkenKop)}
        </ThemedText>
        <ThemedText type="bodyBold" numberOfLines={1}>
          {v(verhaal.titel)}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {t((s) => s.reis.hoofdstukVan)(afgerond + 1, totaal)}
        </ThemedText>
        <View style={[styles.balk, { backgroundColor: withAlpha(kleur, 0.2) }]}>
          <View style={[styles.vulling, { backgroundColor: kleur, width: `${(afgerond / totaal) * 100}%` }]} />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  kaart: {
    marginHorizontal: Spacing.four,
    padding: Spacing.three,
    borderRadius: Radii.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  beeld: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    overflow: 'hidden',
  },
  vul: {
    width: '100%',
    height: '100%',
  },
  tekst: {
    flex: 1,
    gap: 2,
  },
  kop: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balk: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: Spacing.one,
  },
  vulling: {
    height: '100%',
    borderRadius: 3,
  },
});
