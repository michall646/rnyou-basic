import React, { type ComponentProps } from "react";
import { MaterialIcons } from "@expo/vector-icons";

// ── Canonical icon name type ─────────────────────────────────────────────────
// Single source of truth for MaterialIcons glyph names.
// Import from here instead of redefining locally.

export type IconName = ComponentProps<typeof MaterialIcons>["name"];

// ── Universal icon prop ─────────────────────────────────────────────────────
// Accept either an icon name (string) or a pre-rendered React element.
// Components render both consistently via renderIcon().

export type IconProp = IconName | React.ReactNode;

// ── Shared icon renderer ────────────────────────────────────────────────────
// Converts IconProp to a ReactNode with correct size/color.
// - string → <MaterialIcons name={icon} size color />
// - ReactElement → cloned with color/size (skips Fragment)
// - Other ReactNode → returned as-is

export function renderIcon(
  icon: IconProp | undefined | null,
  size: number,
  color: string,
): React.ReactNode | null {
  if (!icon) return null;

  // String icon name → render MaterialIcons
  if (typeof icon === "string") {
    return <MaterialIcons name={icon as IconName} size={size} color={color} />;
  }

  // Clone valid element to inject size/color
  if (React.isValidElement(icon) && icon.type !== React.Fragment) {
    return React.cloneElement(icon as React.ReactElement<any>, {
      color: (icon.props as any).color || color,
      size: (icon.props as any).size || size,
    });
  }

  // Return non-element nodes (null, boolean, etc.) as-is
  return icon;
}
