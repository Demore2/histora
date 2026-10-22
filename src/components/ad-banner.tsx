import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ADS_ENABLED } from '@/constants/advertenties';
import { Spacing } from '@/constants/theme';
import { useAbonnement } from '@/hooks/use-abonnement';
import { useVertaling } from '@/hooks/use-vertaling';
import { eenheidVoor, laadAdSdk } from '@/lib/advertenties';
import { useAdvertentieStore } from '@/store/advertentie-store';

/**
 * Een AdMob-banner (v1.2). Hier stond tot v1.1 een placeholder — een vakje met "Advertisement" —
 * dat achter `ADS_ENABLED = false` verstopt zat, omdat een placeholder bij Play-review afwijst.
 *
 * Rendert **niets** zolang er geen echte advertentie is: voor Pro, op web, vóór de toestemming,
 * zonder eenheid in een productiebuild, en ook als AdMob geen vulling heeft. Een lege grijze
 * strook waar een advertentie had kunnen staan is slechter dan geen strook.
 *
 * De breedte komt uit de eigen layout en niet van het scherm: de banner staat in gewone
 * scrollinhoud met marges, en een adaptieve banner op schermbreedte steekt daar aan beide kanten
 * uit. Staat op Home en het tijdperk-scherm (en de lege collectie-/regio-schermen), bewust niet in
 * de reader — zie `constants/advertenties.ts`.
 */
export function AdBanner() {
  const { isPremium } = useAbonnement();
  const klaar = useAdvertentieStore((s) => s.klaar);
  const { t } = useVertaling();
  const [breedte, setBreedte] = useState(0);
  const [geladen, setGeladen] = useState(false);
  const [mislukt, setMislukt] = useState(false);

  if (!ADS_ENABLED || isPremium || !klaar || mislukt) return null;
  const ad = laadAdSdk();
  const eenheid = eenheidVoor('banner');
  if (!ad || !eenheid) return null;

  return (
    <View style={styles.container} onLayout={(e) => setBreedte(Math.floor(e.nativeEvent.layout.width))}>
      {geladen && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
          {t((s) => s.advertentie.label)}
        </ThemedText>
      )}
      {breedte > 0 && (
        <ad.BannerAd
          unitId={eenheid}
          size={ad.BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          width={breedte}
          onAdLoaded={() => setGeladen(true)}
          onAdFailedToLoad={() => setMislukt(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: Spacing.four,
  },
  label: {
    fontSize: 11,
    marginBottom: Spacing.one,
  },
});
