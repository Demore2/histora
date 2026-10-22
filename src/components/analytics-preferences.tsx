import { SettingsItem, SettingsSectie } from '@/components/settings-section';
import { useVertaling } from '@/hooks/use-vertaling';
import { toonPrivacyKeuzes } from '@/lib/advertenties';
import { useAdvertentieStore } from '@/store/advertentie-store';

/**
 * De privacysectie van Instellingen: de gebruiksstatistieken, en sinds v1.2 de advertentiekeuzes.
 *
 * **De schakelaar is eruit.** Het meten hoort bij de app en staat vast aan; wat overblijft is de
 * mededeling dát het gebeurt, met de voetnoot die zegt wát er gemeten wordt.
 *
 * **De voetnoot is ook eruit.** Die vertelde wát er gemeten wordt en hoe je er bezwaar tegen
 * maakt. Dat mocht niet zomaar verdwijnen — zonder schakelaar is die route het enige dat een
 * altijd-aan meting draaglijk maakt — maar het staat nu voluit in het privacybeleid, dat sinds
 * deze wijziging een echt scherm in de app is (`app/profiel/privacy.tsx`, Instellingen →
 * Privacy Policy) in plaats van een "binnenkort"-melding. Eén alinea op de plek waar iemand hem
 * zoekt is beter dan dezelfde alinea onder elke regel.
 *
 * **Verdwijnt die tekst uit dat scherm, dan staat hij nergens meer**, en dat is geen detail: de
 * AVG vraagt voor een meting die aan je account hangt om een weigergrond, en die is hier een
 * verzoek in plaats van een knop. `instellingen.analyticsVoet` blijft in i18n staan voor als de
 * regel terug moet. Zie ook `docs/README.md` en `docs/privacy-policy.html`.
 *
 * De uitleg zegt bewust niet "anoniem": zodra je bent ingelogd hangt de meting aan je account
 * (`analytics.zetGebruiker`). "Pseudoniem" is het juiste woord.
 *
 * **De advertentiekeuzes verschijnen alleen als Google's UMP zegt dat ze nodig zijn** (EU, VK,
 * Zwitserland). Daar is het geen gunst maar een eis: wie toestemming gaf moet die even makkelijk
 * kunnen intrekken. Buiten die landen, voor Pro (die komt nooit door de toestemmingsronde) en op
 * web is de regel er niet, en de sectie tekent dan ook geen scheidingslijn voor hem.
 */
export function AnalyticsVoorkeuren() {
  const { t } = useVertaling();
  const privacyKeuzesNodig = useAdvertentieStore((s) => s.privacyKeuzesNodig);

  return (
    <SettingsSectie titel={t((s) => s.instellingen.sectiePrivacy)}>
      <SettingsItem
        icoon="stats-chart-outline"
        label={t((s) => s.instellingen.analytics)}
        uitleg={t((s) => s.instellingen.analyticsUitleg)}
        waarde={t((s) => s.instellingen.altijdAan)}
      />
      {privacyKeuzesNodig && (
        <SettingsItem
          icoon="megaphone-outline"
          label={t((s) => s.instellingen.advertentieKeuzes)}
          uitleg={t((s) => s.instellingen.advertentieKeuzesUitleg)}
          onPress={() => void toonPrivacyKeuzes()}
        />
      )}
    </SettingsSectie>
  );
}
