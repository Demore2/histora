/**
 * Het vlammetje van de streak, gedeeld door de widget (`streak-widget.tsx`, als SVG-tekst) en de
 * app (`components/vlam.tsx`, via react-native-svg), zodat ze er op het homescreen en in de app
 * hetzelfde uitzien (1.4.5, wens van de eigenaar). Een tekening en geen 🔥: een emoji verschilt per
 * fabrikant. Wit met de fasekleur als hart, zodat hij op elke fase-achtergrond hoort.
 */
export const VLAM_VIEWBOX = '0 0 24 24';
export const VLAM_BUITEN =
  'M12 23c-4.4 0-8-3.1-8-7.8 0-3.2 2.1-6 4.4-8.3.4-.4 1.1-.1 1.1.5 0 1.3.8 2.6 1.9 3.1C11.1 7 12 3.9 14.2 1.6c.4-.4 1-.2 1.1.3.6 3 3.7 5.5 4.5 8.2.4 1.4.2 2.7.2 3.7 0 5.3-3.6 9.2-8 9.2z';
export const VLAM_HART =
  'M12 21c-2.2 0-4-1.6-4-3.9 0-1.9 1.4-3.2 2.6-4.5.3-.3.8-.1.8.3 0 .9.6 1.6 1.4 1.6.9 0 1.4-.8 1.3-1.7 0-.4.4-.6.7-.4C16 13.6 16 15.4 16 17c0 2.3-1.8 4-4 4z';
