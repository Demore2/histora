import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import type { Verhaal } from '@/constants/types';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';

/**
 * "Nieuw verhaal: Napoleon" op Home (1.4.3). Vervangt de rij "New hot topics": die toonde wekenlang
 * dezelfde zes verhalen, en een rij die nooit iets nieuws zegt leer je over te slaan. Deze kaart
 * staat er alleen in de week na het toevoegen (`getNieuweVerhalen`, `NIEUW_DAGEN`) en verdwijnt
 * daarna vanzelf. Home toont hem niet voor een verhaal dat je al uit hebt, en ook niet als de
 * reiskaart erboven al hetzelfde verhaal noemt.
 */
export function NieuwVerhaalKaart({ verhaal }: { verhaal: Verhaal }) {
  const router = useRouter();
  const theme = useTheme();
  const { t, v } = useVertaling();
  const tijdperk = getTijdperk(verhaal.tijdperkId);
  const kleur = tijdperk?.kleur ?? theme.accent;

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/verhaal/[id]', params: { id: verhaal.id } })}
      style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.portret, { backgroundColor: verhaal.portretKleur, borderColor: kleur }]}>
        {verhaal.afbeelding ? <Image source={verhaal.afbeelding} style={styles.vul} contentFit="cover" /> : null}
      </View>

      <View style={styles.tekst}>
        <ThemedText type="caption" style={[styles.kop, { color: kleur }]}>
          {t((s) => s.ontdek.nieuwVerhaal)}
        </ThemedText>
        <ThemedText type="bodyBold" numberOfLines={2}>
          {v(verhaal.titel)}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
          {tijdperk ? `${v(tijdperk.titel)} · ${verhaal.periodeLabel}` : verhaal.periodeLabel}
        </ThemedText>
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
  portret: {
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
});
