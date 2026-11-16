import React from "react";
import type { InsetIconProps } from "./slider.types";
/**
 * Inset icon overlay that renders a Material Icon pinned to the track edge.
 *
 * The icon is duplicated and masked on each side of the thumb:
 * - Left/bottom side: colored with `colors.onPrimary` (appears on the active track)
 * - Right/top side: colored with `colors.primary` (appears on the inactive track)
 */
export declare function InsetIcon({ icon, colors, width, height, position, offset, iconSize, vertical, }: InsetIconProps): React.JSX.Element;
