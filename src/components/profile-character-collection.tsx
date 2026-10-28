import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { CharacterCard, CHARACTER_CARD_BREEDTE } from '@/components/character-card';
import { HorizontaleRij } from '@/components/horizontale-rij';
import { SectieKop } from '@/components/sectie-kop';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { isEvent } from '@/content/queries';
import { verhalen } from '@/content/verhalen';
import { useVertaling } from '@/hooks/use-vertaling';
import { useCharacterUnlockStore } from '@/store/character-unlock-store';

/**
 * De personagecollectie op Profiel: kop met teller, een horizontale rij kaarten, en eronder wat er
 * nog te halen valt.
 *
 * Opvolger van `profile-card-collection.tsx` (het 70px-cirkelraster). Dezelfde gegevens, maar een
 * kaart per personage laat zien wíé je hebt vrijgespeeld — naam, tijdperk en de teaser van zijn
 * verhaal — in plaats van alleen dát je iemand hebt. De vergrendelde kaarten blijven bewust in de
 * rij staan: een collectie met gaten erin is de hele reden om verder te lezen.
 *
 * **De volgorde is de contentvolgorde, niet ontgrendeld-eerst.** Een rij die zichzelf herschikt bij
 * elke nieuwe ontgrendeling laat je je eigen collectie steeds opnieuw zoeken; zo blijft elk
 * personage op zijn plek staan, als een plakboek dat volloopt.
 *
 * Het totaal is het aantal verhalen zónder events: elk verhaal over een persoon levert precies één
 * personage op, dus een nieuw verhaal verhoogt de noemer vanzelf. Een event (2026-10-28) heeft geen
 * personage. Wie Rome of Pompeii vóór die wijziging ontgrendelde, houdt die rij in de store — ze
 * tellen mee voor de mijlpalen, anders springt een behaalde badge terug op slot — maar ze staan hier
 * niet als kaart, en de teller telt alleen de personages.
 */
const PERSONAGE_VERHALEN = verhalen.filter((verhaal) => !isEvent(verhaal));

export function ProfileCharacterCollection() {
  const { t } = useVertaling();
  const router = useRouter();
  const unlockedCharacters = useCharacterUnlockStore((state) => state.unlockedCharacters);

  const ontgrendeldeIds = new Set(unlockedCharacters.map((personage) => personage.verhaalId));
  const totaal = PERSONAGE_VERHALEN.length;
  const ontgrendeld = PERSONAGE_VERHALEN.filter((verhaal) => ontgrendeldeIds.has(verhaal.id)).length;
  const resterend = totaal - ontgrendeld;

  return (
    <View style={styles.sectie}>
      <SectieKop titel={t((s) => s.profiel.characterCollection)} />
      <ThemedText type="small" themeColor="textSecondary" style={styles.teller}>
        {t((s) => s.profiel.unlockedCounter)(ontgrendeld, totaal)}
      </ThemedText>

      <HorizontaleRij
        data={PERSONAGE_VERHALEN}
        keyExtractor={(verhaal) => verhaal.id}
        itemBreedte={CHARACTER_CARD_BREEDTE}
        contentContainerStyle={styles.rij}
        renderItem={({ item }) => (
          <CharacterCard
            verhaal={item}
            isUnlocked={ontgrendeldeIds.has(item.id)}
            onPress={() => router.push(`/verhaal/${item.id}`)}
          />
        )}
      />

      <ThemedText type="small" themeColor="textSecondary" style={styles.aanmoediging}>
        {resterend > 0
          ? t((s) => s.profiel.nogTeOntgrendelen)(resterend)
          : t((s) => s.profiel.collectieCompleet)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  sectie: {
    gap: Spacing.two,
  },
  teller: {
    paddingHorizontal: Spacing.four,
  },
  rij: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.one,
  },
  aanmoediging: {
    paddingHorizontal: Spacing.four,
  },
});
