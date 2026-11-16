"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositionFromValue = getPositionFromValue;
exports.getValueFromPosition = getValueFromPosition;
exports.snapToStep = snapToStep;
exports.getFillSize = getFillSize;
const slider_constants_1 = require("./slider-constants");
/**
 * Convert a normalized value (0–1) to a pixel position along the track.
 *
 * For horizontal sliders: 0 = left edge, 1 = right edge.
 * For vertical sliders: 0 = bottom edge, 1 = top edge (inverted visually).
 *
 * @param val   Normalized value between 0 and 1
 * @param length Total track length in pixels
 * @param vertical Whether the slider is vertical
 * @returns Pixel position of the thumb
 */
function getPositionFromValue(val, length, vertical) {
    const activeLength = length - 2 * slider_constants_1.TRACK_PADDING;
    if (vertical) {
        return length - slider_constants_1.TRACK_PADDING - val * activeLength;
    }
    return slider_constants_1.TRACK_PADDING + val * activeLength;
}
/**
 * Convert a pixel position back to a normalized value (0–1).
 *
 * @param pos    Pixel position of the thumb
 * @param length Total track length in pixels
 * @param vertical Whether the slider is vertical
 * @returns Normalized value between 0 and 1
 */
function getValueFromPosition(pos, length, vertical) {
    const activeLength = length - 2 * slider_constants_1.TRACK_PADDING;
    if (vertical) {
        return (length - slider_constants_1.TRACK_PADDING - pos) / activeLength;
    }
    return (pos - slider_constants_1.TRACK_PADDING) / activeLength;
}
/**
 * Snap a pixel position to the nearest step when steps > 1.
 *
 * @param pos    Raw pixel position
 * @param length Total track length in pixels
 * @param steps  Number of snap points (must be >= 2)
 * @param vertical Whether the slider is vertical
 * @returns Snapped pixel position
 */
function snapToStep(pos, length, steps, vertical) {
    const activeLength = length - 2 * slider_constants_1.TRACK_PADDING;
    const intervals = steps - 1;
    const stepSize = activeLength / intervals;
    const relativePos = vertical
        ? length - slider_constants_1.TRACK_PADDING - pos
        : pos - slider_constants_1.TRACK_PADDING;
    const snappedRelativePos = Math.round(relativePos / stepSize) * stepSize;
    return vertical
        ? length - slider_constants_1.TRACK_PADDING - snappedRelativePos
        : snappedRelativePos + slider_constants_1.TRACK_PADDING;
}
/**
 * Calculate the number of pixels from an edge toward the thumb position,
 * accounting for the gap between track fill and thumb.
 *
 * Used by both the active-track fill and the mask clips.
 *
 * @param length     Total track length in pixels
 * @param position   Thumb pixel position
 * @param maskGap    Gap between mask edge and thumb center
 * @param fromBottom If true, measure from the bottom/top (vertical active fill)
 * @returns Pixel dimension for the fill or mask
 */
function getFillSize(length, position, maskGap, fromBottom) {
    const size = fromBottom ? length - position : position;
    return Math.max(0, Math.round(size - maskGap));
}
