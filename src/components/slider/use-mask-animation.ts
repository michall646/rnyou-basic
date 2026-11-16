import { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { MASK_GAP } from "./slider-constants";

/**
 * Shared animated mask-clip logic for overlay content (icons or dot indicators)
 * that sits on top of the slider track.
 *
 * Creates two animated mask views that clip content on each side of the thumb,
 * along with inner translations to keep the content visually pinned in place
 * as the masks expand/contract.
 *
 * Mask 1: clips from the start edge toward the thumb (shows e.g. onPrimary colored dots)
 * Mask 2: clips from the thumb toward the far edge (shows e.g. primary colored dots)
 *
 * @param position  SharedValue tracking the thumb position in pixels
 * @param length    Total track length in pixels
 * @param vertical  Whether the slider is vertical
 */
export function useMaskAnimation(
  position: SharedValue<number>,
  length: number,
  vertical: boolean,
) {
  // --- Mask 1 (start edge → thumb) ---
  const mask1Style = useAnimatedStyle(() => {
    const size = vertical ? length - position.value : position.value;
    const roundedSize = Math.round(size - MASK_GAP);
    const roundedOffset = Math.round(position.value + MASK_GAP);
    return {
      [vertical ? "height" : "width"]: Math.max(0, roundedSize),
      ...(vertical ? { top: roundedOffset } : {}),
    };
  });

  const inner1Style = useAnimatedStyle(() => {
    const translate = vertical ? -Math.round(position.value + MASK_GAP) : 0;
    return { transform: [{ translateY: translate }] };
  });

  // --- Mask 2 (thumb → far edge) ---
  const mask2Style = useAnimatedStyle(() => {
    const size = vertical ? position.value : length - position.value;
    const roundedSize = Math.round(size - MASK_GAP);
    const roundedOffset = Math.round(position.value + MASK_GAP);
    return {
      [vertical ? "height" : "width"]: Math.max(0, roundedSize),
      ...(vertical ? {} : { left: roundedOffset }),
    };
  });

  const inner2Style = useAnimatedStyle(() => {
    const translate = vertical ? 0 : -Math.round(position.value + MASK_GAP);
    return { transform: [{ translateX: translate }] };
  });

  return { mask1Style, mask2Style, inner1Style, inner2Style };
}
