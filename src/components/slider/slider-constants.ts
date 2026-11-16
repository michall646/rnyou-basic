import type { SliderMetrics, SliderSize } from "./slider.types";

/**
 * Size-dependent metrics for the slider.
 * Each tier specifies: track thickness, handle size, and icon dimensions.
 */
export const SLIDER_METRICS: Record<SliderSize, SliderMetrics> = {
  xSmall: { trackHeight: 16, handleHeight: 44, handleWidth: 4, trackShape: 8, iconSize: 12 },
  small:  { trackHeight: 24, handleHeight: 44, handleWidth: 4, trackShape: 8, iconSize: 16 },
  medium: { trackHeight: 40, handleHeight: 52, handleWidth: 4, trackShape: 12, iconSize: 24 },
  large:  { trackHeight: 56, handleHeight: 68, handleWidth: 4, trackShape: 16, iconSize: 32 },
  xLarge: { trackHeight: 96, handleHeight: 108, handleWidth: 4, trackShape: 28, iconSize: 48 },
};

/** Width of the thumb/handle bar in the sliding direction */
export const THUMB_WIDTH = 4;

/** Gap between the track fill and the thumb */
export const GAP = 4;

/** Padding at each end of the track (visual margin inside the track area) */
export const TRACK_PADDING = 4;

/** Diameter of the step-indicator dots */
export const DOT_SIZE = 4;

/** Combined mask gap used by mask-clip animations (thumb half-width + gap) */
export const MASK_GAP = THUMB_WIDTH / 2 + GAP;
