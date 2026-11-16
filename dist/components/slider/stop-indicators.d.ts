import React from "react";
import type { StopIndicatorsProps } from "./slider.types";
/**
 * Step-indicator dots overlay that appears along the slider track.
 *
 * Dots are duplicated and masked on each side of the thumb:
 * - Active side: colored with `colors.onPrimary`
 * - Inactive side: colored with `colors.primary`
 *
 * The dot at the current thumb position is hidden (opacity → 0).
 * Hidden when `steps < 2`.
 */
export declare function StopIndicators({ colors, steps, width, height, position, trackPadding, vertical, }: StopIndicatorsProps): React.JSX.Element | null;
