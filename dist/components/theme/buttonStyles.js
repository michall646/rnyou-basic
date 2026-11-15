"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtonStyleState = exports.getIconButtonStyles = exports.sizeStyles = exports.getButtonElevation = exports.getButtonRippleColor = exports.iconSize = exports.getButtonIconColor = exports.getButtonTextColor = exports.getButtonBorderWidth = exports.getButtonBorderColor = exports.getButtonBackgroundColor = void 0;
function applyOpacity(color, opacityHex) {
    // Append alpha channel for 6-digit hex; pass through others
    if (color.startsWith("#") && color.length === 7) {
        return color + opacityHex;
    }
    return color;
}
const getButtonBackgroundColor = (colors, active, variant, disabled) => {
    if (disabled)
        return applyOpacity(colors.surfaceVariant, "61"); // 38% opacity
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
exports.getButtonBackgroundColor = getButtonBackgroundColor;
const getButtonBorderColor = (colors, active, variant, disabled) => {
    if (disabled)
        return variant === "outlined" ? colors.outlineVariant : "transparent";
    if (variant === "outlined")
        return active ? colors.primary : colors.outline;
    return "transparent";
};
exports.getButtonBorderColor = getButtonBorderColor;
const getButtonBorderWidth = (variant, disabled) => {
    return variant === "outlined" ? 1 : 0;
};
exports.getButtonBorderWidth = getButtonBorderWidth;
const getButtonTextColor = (colors, active, variant, disabled) => {
    if (disabled)
        return applyOpacity(colors.onSurface, "61"); // 38% opacity
    if (variant === "filled")
        return active ? colors.onPrimaryContainer : colors.onPrimary;
    if (variant === "tonal")
        return active ? colors.onPrimaryContainer : colors.onSecondaryContainer;
    if (variant === "outlined" || variant === "text" || variant === "elevated")
        return active ? colors.onPrimaryContainer : colors.primary;
    return colors.onPrimaryContainer;
};
exports.getButtonTextColor = getButtonTextColor;
const getButtonIconColor = (colors, active, variant, disabled) => {
    return (0, exports.getButtonTextColor)(colors, active, variant, disabled);
};
exports.getButtonIconColor = getButtonIconColor;
exports.iconSize = {
    small: 18,
    medium: 18,
    large: 24,
};
const getButtonRippleColor = (colors, active, variant, disabled) => {
    if (disabled)
        return "transparent";
    if (variant === "filled")
        return colors.onPrimary;
    return colors.primary;
};
exports.getButtonRippleColor = getButtonRippleColor;
const getButtonElevation = (variant, disabled, active) => {
    if (disabled)
        return 0;
    if (variant === "elevated")
        return active ? 2 : 1;
    if (variant === "filled" && active)
        return 1;
    return 0;
};
exports.getButtonElevation = getButtonElevation;
exports.sizeStyles = {
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
const getIconButtonStyles = (colors, variant, active, disabled) => {
    const bgMap = {
        standard: "transparent",
        filled: active ? colors.primaryContainer : colors.primary,
        tonal: active ? colors.primaryContainer : colors.secondaryContainer,
        outlined: active ? colors.primaryContainer : "transparent",
    };
    const borderMap = {
        standard: "transparent",
        filled: "transparent",
        tonal: "transparent",
        outlined: active ? colors.primary : colors.outline,
    };
    const borderWidthMap = {
        standard: 0,
        filled: 0,
        tonal: 0,
        outlined: 1,
    };
    const colorMap = {
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
exports.getIconButtonStyles = getIconButtonStyles;
const getButtonStyleState = (colors, disabled, active, variant) => ({
    backgroundColor: (0, exports.getButtonBackgroundColor)(colors, active, variant, disabled),
    borderColor: (0, exports.getButtonBorderColor)(colors, active, variant, disabled),
    borderWidth: (0, exports.getButtonBorderWidth)(variant, disabled),
    textColor: (0, exports.getButtonTextColor)(colors, active, variant, disabled),
    iconColor: (0, exports.getButtonIconColor)(colors, active, variant, disabled),
    rippleColor: (0, exports.getButtonRippleColor)(colors, active, variant, disabled),
    elevation: (0, exports.getButtonElevation)(variant, disabled, active),
});
exports.getButtonStyleState = getButtonStyleState;
