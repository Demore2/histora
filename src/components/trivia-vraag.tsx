import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { haptics } from '@/constants/haptics';
import { Motion } from '@/constants/motion';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import {
  beantwoordVraag,
  toelichtingInTaal,
  vraagInTaal,
  type TriviaUitslag,
  type TriviaVraag as Vraag,
} from '@/lib/trivia';

const LETTERS = 'ABCD';

/**
 * Eén triviavraag. **Een tik op een optie is meteen het antwoord** — er is geen aparte
 * "controleer"-knop zoals bij de quizvraag na een hoofdstuk: dit is een spel, en tempo hoort erbij.
 *
 * Het antwoord gaat naar de server (`trivia_antwoord`), die pas dan zegt wat goed was en bij een
 * fout een leven afschrijft. Tot dat antwoord binnen is, staat er een draaiertje op de gekozen
 * optie en zijn de andere uitgeschakeld. Mislukt het, dan kun je opnieuw kiezen: er is dan ook
 * niets afgeschreven.
 */
export function TriviaVraag({
  vraag: bron,
  kleur,
  kop,
  onUitslag,
}: {
  vraag: Vraag;
  kleur: string;
  /** Tijdperknaam, of "Kroonvraag · …" bij een kroonvraag. */
  kop: string;
  onUitslag: (uitslag: TriviaUitslag) => void;
}) {
  const theme = useTheme();
  const { t, taal } = useVertaling();
  const vraag = vraagInTaal(bron, taal);

  const [gekozen, setGekozen] = useState<number | null>(null);
  const [bezig, setBezig] = useState(false);
  const [mislukt, setMislukt] = useState(false);
  const [uitslag, setUitslag] = useState<TriviaUitslag | null>(null);

  async function kies(index: number) {
    if (bezig || uitslag) return;
    setGekozen(index);
    setBezig(true);
    setMislukt(false);
    try {
      const u = await beantwoordVraag(vraag.id, index);
      if (u.goed) haptics.succes();
      else haptics.tik();
      setUitslag(u);
      onUitslag(u);
    } catch {
      setMislukt(true);
      setGekozen(null);
    } finally {
      setBezig(false);
    }
  }

  function rand(index: number): string {
    if (!uitslag) return index === gekozen ? kleur : withAlpha(theme.inactive, 0.4);
    if (index === uitslag.juiste) return theme.succes;
    if (index === gekozen) return theme.gevaar;
    return withAlpha(theme.inactive, 0.4);
  }

  const toelichting = uitslag ? toelichtingInTaal(uitslag, taal) : null;

  return (
    <View style={[styles.kaart, { backgroundColor: theme.backgroundElement, borderColor: withAlpha(kleur, 0.45) }]}>
      <View style={[styles.chip, { backgroundColor: kleur }]}>
        <ThemedText type="caption" style={styles.chipTekst}>
          {kop.toUpperCase()}
        </ThemedText>
      </View>

      <ThemedText type="subtitle">{vraag.vraag}</ThemedText>

      <View style={styles.opties} accessibilityRole="radiogroup">
        {vraag.opties.map((optie, index) => (
          <AnimatedPressable
            key={index}
            onPress={() => kies(index)}
            disabled={bezig || uitslag !== null}
            accessibilityRole="radio"
            accessibilityState={{ selected: gekozen === index, disabled: bezig || uitslag !== null }}
            accessibilityLabel={t((s) => s.interactief.optieLabel)(LETTERS[index], optie)}
            style={[styles.optie, { backgroundColor: theme.background, borderColor: rand(index) }]}>
            <View style={[styles.letter, { backgroundColor: withAlpha(theme.inactive, 0.25) }]}>
              <ThemedText type="caption">{LETTERS[index]}</ThemedText>
            </View>
            <ThemedText type="small" style={styles.optieTekst}>
              {optie}
            </ThemedText>
            {bezig && gekozen === index && <ActivityIndicator size="small" color={kleur} />}
            {uitslag && index === uitslag.juiste && <Ionicons name="checkmark-circle" size={18} color={theme.succes} />}
            {uitslag && index === gekozen && index !== uitslag.juiste && (
              <Ionicons name="close-circle" size={18} color={theme.gevaar} />
            )}
          </AnimatedPressable>
        ))}
      </View>

      {mislukt && (
        <ThemedText type="small" style={{ color: theme.gevaar }}>
          {t((s) => s.explore.antwoordMislukt)}
        </ThemedText>
      )}

      {uitslag && toelichting && (
        <Animated.View
          entering={FadeInDown.duration(Motion.duration.normaal)}
          style={[styles.uitleg, { backgroundColor: withAlpha(uitslag.goed ? theme.succes : theme.gevaar, 0.12) }]}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.uitlegTekst}>
            {toelichting}
          </ThemedText>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kaart: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radii.card,
    borderWidth: 1,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: Radii.button,
  },
  chipTekst: {
    color: '#FFFFFF',
  },
  opties: {
    gap: Spacing.two,
  },
  optie: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Radii.button,
    borderWidth: 1,
  },
  letter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optieTekst: {
    flex: 1,
  },
  uitleg: {
    padding: Spacing.three,
    borderRadius: Radii.button,
  },
  uitlegTekst: {
    fontStyle: 'italic',
  },
});
