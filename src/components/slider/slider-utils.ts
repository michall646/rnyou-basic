import { TRACK_PADDING } from "./slider-constants";

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
export function getPositionFromValue(
  val: number,
  length: number,
  vertical: boolean,
): number {
  const activeLength = length - 2 * TRACK_PADDING;
  if (vertical) {
    return length - TRACK_PADDING - val * activeLength;
  }
  return TRACK_PADDING + val * activeLength;
}

/**
 * Convert a pixel position back to a normalized value (0–1).
 *
 * @param pos    Pixel position of the thumb
 * @param length Total track length in pixels
 * @param vertical Whether the slider is vertical
 * @returns Normalized value between 0 and 1
 */
export function getValueFromPosition(
  pos: number,
  length: number,
  vertical: boolean,
): number {
  const activeLength = length - 2 * TRACK_PADDING;
  if (vertical) {
    return (length - TRACK_PADDING - pos) / activeLength;
  }
  return (pos - TRACK_PADDING) / activeLength;
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
export function snapToStep(
  pos: number,
  length: number,
  steps: number,
  vertical: boolean,
): number {
  const activeLength = length - 2 * TRACK_PADDING;
  const intervals = steps - 1;
  const stepSize = activeLength / intervals;

  const relativePos = vertical
    ? length - TRACK_PADDING - pos
    : pos - TRACK_PADDING;

  const snappedRelativePos = Math.round(relativePos / stepSize) * stepSize;

  return vertical
    ? length - TRACK_PADDING - snappedRelativePos
    : snappedRelativePos + TRACK_PADDING;
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
export function getFillSize(
  length: number,
  position: number,
  maskGap: number,
  fromBottom: boolean,
): number {
  const size = fromBottom ? length - position : position;
  return Math.max(0, Math.round(size - maskGap));
}
