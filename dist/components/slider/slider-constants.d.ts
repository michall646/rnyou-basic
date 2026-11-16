import type { SliderMetrics, SliderSize } from "./slider.types";
/**
 * Size-dependent metrics for the slider.
 * Each tier specifies: track thickness, handle size, and icon dimensions.
 */
export declare const SLIDER_METRICS: Record<SliderSize, SliderMetrics>;
/** Width of the thumb/handle bar in the sliding direction */
export declare const THUMB_WIDTH = 4;
/** Gap between the track fill and the thumb */
export declare const GAP = 4;
/** Padding at each end of the track (visual margin inside the track area) */
export declare const TRACK_PADDING = 4;
/** Diameter of the step-indicator dots */
export declare const DOT_SIZE = 4;
/** Combined mask gap used by mask-clip animations (thumb half-width + gap) */
export declare const MASK_GAP: number;
