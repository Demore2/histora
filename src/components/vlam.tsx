import Svg, { Path } from 'react-native-svg';

import { VLAM_BUITEN, VLAM_HART, VLAM_VIEWBOX } from '@/constants/vlam';

/** Het vlammetje van de widget, in de app. `hart` is de fasekleur (`FASE_KLEUR[fase].naar`). */
export function Vlam({ maat, hart }: { maat: number; hart: string }) {
  return (
    <Svg width={maat} height={maat} viewBox={VLAM_VIEWBOX} accessible={false}>
      <Path fill="#FFFFFF" d={VLAM_BUITEN} />
      <Path fill={hart} d={VLAM_HART} />
    </Svg>
  );
}
