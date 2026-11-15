import type { MaterialColors } from "./types/theme";

export type ButtonStyleVariant =
  | "filled"
  | "tonal"
  | "outlined"
  | "elevated"
  | "text";

export type ButtonStyleState = {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
  iconColor: string;
  rippleColor: string;
  elevation: number;
};

function applyOpacity(color: string, opacityHex: string): string {
  // Append alpha channel for 6-digit hex; pass through others
  if (color.startsWith("#") && color.length === 7) {
    return color + opacityHex;
  }
  return color;
}

export const getButtonBackgroundColor = (
  colors: MaterialColors,
  active: boolean,
  variant: ButtonStyleVariant,
  disabled: boolean,
) => {
  if (disabled) return applyOpacity(colors.surfaceVariant, "61"); // 38% opacity
  if (variant === "filled")
    return active ? colors.primaryContainer : colors.primary;
  if (variant === "tonal")
    return active ? colors.primaryContainer : colors.secondaryContainer;
  if (variant === "outlined")
    return active ? colors.primaryContainer : "transparent";
  if (variant === "elevated")
    return active ? colors.primaryContainer : colors.surfaceContainerLow;
  if (variant === "text")
    return active ? colors.primaryContainer : "transparent";
  return "transparent";
};

export const getButtonBorderColor = (
  colors: MaterialColors,
  active: boolean,
  variant: ButtonStyleVariant,
  disabled: boolean,
) => {
  if (disabled) return variant === "outlined" ? colors.outlineVariant : "transparent";
  if (variant === "outlined") return active ? colors.primary : colors.outline;
  return "transparent";
};

export const getButtonBorderWidth = (
  variant: ButtonStyleVariant,
  disabled: boolean,
) => {
  return variant === "outlined" ? 1 : 0;
};

export const getButtonTextColor = (
  colors: MaterialColors,
  active: boolean,
  variant: ButtonStyleVariant,
  disabled: boolean,
) => {
  if (disabled) return applyOpacity(colors.onSurface, "61"); // 38% opacity
  if (variant === "filled")
    return active ? colors.onPrimaryContainer : colors.onPrimary;
  if (variant === "tonal")
    return active ? colors.onPrimaryContainer : colors.onSecondaryContainer;
  if (variant === "outlined" || variant === "text" || variant === "elevated")
    return active ? colors.onPrimaryContainer : colors.primary;
  return colors.onPrimaryContainer;
};

export const getButtonIconColor = (
  colors: MaterialColors,
  active: boolean,
  variant: ButtonStyleVariant,
  disabled: boolean,
) => {
  return getButtonTextColor(colors, active, variant, disabled);
};

export const iconSize = {
  small: 18,
  medium: 18,
  large: 24,
};

export const getButtonRippleColor = (
  colors: MaterialColors,
  active: boolean,
  variant: ButtonStyleVariant,
  disabled: boolean,
) => {
  if (disabled) return "transparent";
  if (variant === "filled") return colors.onPrimary;
  return colors.primary;
};

export const getButtonElevation = (
  variant: ButtonStyleVariant,
  disabled: boolean,
  active: boolean,
) => {
  if (disabled) return 0;
  if (variant === "elevated") return active ? 2 : 1;
  if (variant === "filled" && active) return 1;
  return 0;
};

export const sizeStyles = {
  xSmall: {
    height: 28,
    paddingHorizontal: 12,
    fontSize: 11,
    iconSize: 16,
    labelMargin: 4,
  },
  small: {
    height: 32,
    paddingHorizontal: 16,
    fontSize: 12,
    iconSize: 18,
    labelMargin: 4,
  },
  medium: {
    height: 40,
    paddingHorizontal: 24,
    fontSize: 14,
    iconSize: 18,
    labelMargin: 6,
  },
  large: {
    height: 48,
    paddingHorizontal: 32,
    fontSize: 16,
    iconSize: 24,
    labelMargin: 8,
  },
  xLarge: {
    height: 56,
    paddingHorizontal: 40,
    fontSize: 18,
    iconSize: 24,
    labelMargin: 8,
  },
};

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";

export const getIconButtonStyles = (
  colors: MaterialColors,
  variant: IconButtonVariant,
  active: boolean,
  disabled: boolean,
): ButtonStyleState => {
  const bgMap: Record<IconButtonVariant, string> = {
    standard: "transparent",
    filled: active ? colors.primaryContainer : colors.primary,
    tonal: active ? colors.primaryContainer : colors.secondaryContainer,
    outlined: active ? colors.primaryContainer : "transparent",
  };
  const borderMap: Record<IconButtonVariant, string> = {
    standard: "transparent",
    filled: "transparent",
    tonal: "transparent",
    outlined: active ? colors.primary : colors.outline,
  };
  const borderWidthMap: Record<IconButtonVariant, number> = {
    standard: 0,
    filled: 0,
    tonal: 0,
    outlined: 1,
  };
  const colorMap: Record<IconButtonVariant, string> = {
    standard: active ? colors.primary : colors.onSurfaceVariant,
    filled: active ? colors.onPrimaryContainer : colors.onPrimary,
    tonal: active ? colors.onPrimaryContainer : colors.onSecondaryContainer,
    outlined: active ? colors.onPrimaryContainer : colors.primary,
  };

  if (disabled) {
    return {
      backgroundColor: applyOpacity(colors.surfaceVariant, "61"),
      borderColor: variant === "outlined" ? colors.outlineVariant : "transparent",
      borderWidth: variant === "outlined" ? 1 : 0,
      textColor: applyOpacity(colors.onSurface, "61"),
      iconColor: applyOpacity(colors.onSurface, "61"),
      rippleColor: "transparent",
      elevation: 0,
    };
  }

  return {
    backgroundColor: bgMap[variant],
    borderColor: borderMap[variant],
    borderWidth: borderWidthMap[variant],
    textColor: colorMap[variant],
    iconColor: colorMap[variant],
    rippleColor: variant === "filled" ? colors.onPrimary : colors.primary,
    elevation: 0,
  };
};

export const getButtonStyleState = (
  colors: MaterialColors,
  disabled: boolean,
  active: boolean,
  variant: ButtonStyleVariant,
): ButtonStyleState => ({
  backgroundColor: getButtonBackgroundColor(colors, active, variant, disabled),
  borderColor: getButtonBorderColor(colors, active, variant, disabled),
  borderWidth: getButtonBorderWidth(variant, disabled),
  textColor: getButtonTextColor(colors, active, variant, disabled),
  iconColor: getButtonIconColor(colors, active, variant, disabled),
  rippleColor: getButtonRippleColor(colors, active, variant, disabled),
  elevation: getButtonElevation(variant, disabled, active),
});

