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
export declare function getPositionFromValue(val: number, length: number, vertical: boolean): number;
/**
 * Convert a pixel position back to a normalized value (0–1).
 *
 * @param pos    Pixel position of the thumb
 * @param length Total track length in pixels
 * @param vertical Whether the slider is vertical
 * @returns Normalized value between 0 and 1
 */
export declare function getValueFromPosition(pos: number, length: number, vertical: boolean): number;
/**
 * Snap a pixel position to the nearest step when steps > 1.
 *
 * @param pos    Raw pixel position
 * @param length Total track length in pixels
 * @param steps  Number of snap points (must be >= 2)
 * @param vertical Whether the slider is vertical
 * @returns Snapped pixel position
 */
export declare function snapToStep(pos: number, length: number, steps: number, vertical: boolean): number;
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
export declare function getFillSize(length: number, position: number, maskGap: number, fromBottom: boolean): number;
