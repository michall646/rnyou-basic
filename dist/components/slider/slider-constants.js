"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MASK_GAP = exports.DOT_SIZE = exports.TRACK_PADDING = exports.GAP = exports.THUMB_WIDTH = exports.SLIDER_METRICS = void 0;
/**
 * Size-dependent metrics for the slider.
 * Each tier specifies: track thickness, handle size, and icon dimensions.
 */
exports.SLIDER_METRICS = {
    xSmall: { trackHeight: 16, handleHeight: 44, handleWidth: 4, trackShape: 8, iconSize: 12 },
    small: { trackHeight: 24, handleHeight: 44, handleWidth: 4, trackShape: 8, iconSize: 16 },
    medium: { trackHeight: 40, handleHeight: 52, handleWidth: 4, trackShape: 12, iconSize: 24 },
    large: { trackHeight: 56, handleHeight: 68, handleWidth: 4, trackShape: 16, iconSize: 32 },
    xLarge: { trackHeight: 96, handleHeight: 108, handleWidth: 4, trackShape: 28, iconSize: 48 },
};
/** Width of the thumb/handle bar in the sliding direction */
exports.THUMB_WIDTH = 4;
/** Gap between the track fill and the thumb */
exports.GAP = 4;
/** Padding at each end of the track (visual margin inside the track area) */
exports.TRACK_PADDING = 4;
/** Diameter of the step-indicator dots */
exports.DOT_SIZE = 4;
/** Combined mask gap used by mask-clip animations (thumb half-width + gap) */
exports.MASK_GAP = exports.THUMB_WIDTH / 2 + exports.GAP;
