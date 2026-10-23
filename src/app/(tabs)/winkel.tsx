// Deze route is vervangen: de winkel is sinds 1.3 geen tabblad meer maar een los scherm
// (`src/app/shop.tsx`), bereikbaar via het Dukaten-knopje rechtsboven (`KopActies`). Kon niet
// worden verwijderd (Remove-Item is geblokkeerd in dit project) — `href: null` in
// `(tabs)/_layout.tsx` verbergt hem, en een oude deeplink komt via deze omleiding goed terecht.
import { Redirect } from 'expo-router';

export default function OudeWinkelRoute() {
  return <Redirect href="/shop" />;
}
