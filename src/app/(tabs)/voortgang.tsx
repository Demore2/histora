// Progress is sinds 1.4.5 geen tabblad meer (wens van de eigenaar): de streak-kaart staat bovenaan
// Home, de mijlpalen (`AchievementsGrid`) en de kroontjes (`KroontjesBlok`) staan op Profiel, en
// "By era" (`EraProgressBars`, nu orphaned) viel weg omdat de tijdperktegels op Explore hetzelfde
// laten zien. Kon niet worden verwijderd (Remove-Item is geblokkeerd in dit project) — `href: null`
// in `(tabs)/_layout.tsx` verbergt hem, en een oude deeplink komt via deze omleiding op Profiel.
import { Redirect } from 'expo-router';

export default function OudeVoortgangRoute() {
  return <Redirect href="/profiel" />;
}
