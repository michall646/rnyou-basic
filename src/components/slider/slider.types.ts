import type { SharedValue } from "react-native-reanimated";
import type { MaterialColors } from "../theme/types/theme";

import type { IconName } from "../../types/icons";

export type SliderSize = "xSmall" | "small" | "medium" | "large" | "xLarge";

export interface SliderMetrics {
  trackHeight: number;
  handleHeight: number;
  handleWidth: number;
  trackShape: number;
  iconSize: number;
}

export interface SliderProps {
  /** Normalized value between 0 and 1 */
  value: number;
  /** Callback with normalized value between 0 and 1 */
  onValueChange: (value: number) => void;
  /** Track length in pixels (horizontal: width, vertical: height). Default 250 */
  width?: number;
  /** Track length in pixels (vertical: height). Default 250 */
  height?: number;
  /** Number of snap points. 0 or 1 = continuous. Default 1 */
  steps?: number;
  /** Orientation: false = horizontal, true = vertical. Default false */
  vertical?: boolean;
  /** Size tier. Default "medium" */
  size?: SliderSize;
  /** Material Icons icon name to display as an inset icon along the track */
  insetIcon?: IconName;
  /** Accessibility label for the slider */
  accessibilityLabel?: string;
  /** Whether to enable haptic feedback vibrations when snapping to steps. Default true */
  enableVibrations?: boolean;
}

export interface InsetIconProps {
  icon: IconName;
  colors: MaterialColors;
  width: number;
  height: number;
  position: SharedValue<number>;
  offset: number;
  iconSize: number;
  vertical: boolean;
}

export interface StopIndicatorsProps {
  colors: MaterialColors;
  steps: number;
  width: number;
  height: number;
  position: SharedValue<number>;
  trackPadding: number;
  vertical: boolean;
}

export interface DotProps {
  index: number;
  currentIndex: SharedValue<number>;
  color: string;
  dotPosition: number;
  vertical: boolean;
}
