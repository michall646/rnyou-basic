"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Pressable_1 = __importDefault(require("../pressable/Pressable"));
const Text_1 = __importDefault(require("../text/Text"));
const buttonStyles_1 = require("../theme/buttonStyles");
const m3ThemeProvider_1 = require("../theme/m3ThemeProvider");
const animations_1 = require("../../constants/animations");
const icons_1 = require("../../types/icons");
const Button = ({ label, children, leftIcon, rightIcon, isActive = false, isDisabled = false, disabled: propsDisabled, isLoading = false, onPress, onLongPress, onPressIn: onPressInProp, onPressOut: onPressOutProp, variant = "filled", size = "medium", toggle = false, shape = "round", fullWidth = false, expandOnPress = false, isGrouped = false, labelVariant = "labelLarge", labelFamily, labelWeight, style, contentStyle, labelStyle, flex, accessibilityLabel, ...restProps }) => {
    const colors = (0, m3ThemeProvider_1.useSchemeColors)();
    const { shape: shapeTokens } = (0, m3ThemeProvider_1.useMaterialColors)();
    const disabled = isDisabled || propsDisabled || isLoading;
    const metrics = buttonStyles_1.sizeStyles[size] || buttonStyles_1.sizeStyles.medium;
    const defaultRadius = shape === "square" ? shapeTokens.medium : shapeTokens.full;
    const shapeSmall = shapeTokens.small;
    const isPressed = (0, react_native_reanimated_1.useSharedValue)(false);
    const activeProgress = (0, react_native_reanimated_1.useSharedValue)(isActive ? 1 : 0);
    (0, react_1.useEffect)(() => {
        activeProgress.value = (0, react_native_reanimated_1.withSpring)(isActive ? 1 : 0, animations_1.ACTIVE_TRANSITION);
    }, [isActive]);
    const isToggleMode = toggle || isGrouped;
    const resolvedVariant = (0, react_1.useMemo)(() => {
        if (isToggleMode && variant === "filled") {
            return isActive ? "filled" : "tonal";
        }
        return variant;
    }, [variant, isToggleMode, isActive]);
    const styleState = (0, react_1.useMemo)(() => {
        const effectiveActive = isToggleMode ? false : isActive;
        return (0, buttonStyles_1.getButtonStyleState)(colors, disabled, effectiveActive, resolvedVariant);
    }, [colors, disabled, isActive, resolvedVariant, isToggleMode]);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const activeRadius = Math.max(shapeSmall, defaultRadius - 8);
        const currentRadius = (0, react_native_reanimated_1.interpolate)(activeProgress.value, [0, 1], [defaultRadius, activeRadius]);
        const extraPadding = expandOnPress && isPressed.value ? 8 : 0;
        const styles = {
            borderRadius: currentRadius,
            paddingHorizontal: extraPadding,
            transform: [
                {
                    scale: (0, react_native_reanimated_1.withSpring)(isPressed.value && !expandOnPress ? 0.98 : 1, animations_1.PRESS_SCALE),
                },
            ],
        };
        if (flex !== undefined) {
            styles.flex = flex;
        }
        return styles;
    }, [defaultRadius, flex, expandOnPress, isActive]);
    const renderButtonIcon = (name, isLeading) => {
        if (isLoading &&
            ((isLeading && !rightIcon) || (!isLeading && !leftIcon && rightIcon))) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: metrics.iconSize, color: styleState.iconColor }));
        }
        return (0, icons_1.renderIcon)(name, metrics.iconSize, styleState.iconColor);
    };
    const hasLeftIcon = leftIcon || (isLoading && !rightIcon);
    const hasRightIcon = rightIcon || (isLoading && !leftIcon && rightIcon);
    const paddingLeft = hasLeftIcon
        ? metrics.paddingHorizontal - 8
        : metrics.paddingHorizontal;
    const paddingRight = hasRightIcon
        ? metrics.paddingHorizontal - 8
        : metrics.paddingHorizontal;
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
            styles.wrapper,
            {
                backgroundColor: styleState.backgroundColor,
                borderColor: styleState.borderColor,
                borderWidth: styleState.borderWidth,
                height: metrics.height,
                elevation: styleState.elevation,
            },
            fullWidth && styles.fullWidth,
            isGrouped && styles.grouped,
            !isGrouped && flex !== undefined && { flex },
            style,
            animatedStyle,
        ], children: (0, jsx_runtime_1.jsx)(Pressable_1.default, { ...restProps, disabled: disabled, onPress: onPress, onLongPress: onLongPress, accessibilityRole: restProps.accessibilityRole ?? "button", accessibilityLabel: accessibilityLabel ?? label ?? "Button", accessibilityState: { disabled, ...restProps.accessibilityState }, onPressIn: (event) => {
                isPressed.value = true;
                if (onPressInProp)
                    onPressInProp(event);
            }, onPressOut: (event) => {
                isPressed.value = false;
                if (onPressOutProp)
                    onPressOutProp(event);
            }, rippleColor: styleState.rippleColor, style: styles.pressable, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    styles.container,
                    { paddingLeft, paddingRight },
                    contentStyle,
                ], children: children ? (children) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderButtonIcon(leftIcon, true), label && ((0, jsx_runtime_1.jsx)(Text_1.default, { variant: labelVariant, family: labelFamily, weight: labelWeight, numberOfLines: 1, style: [
                                styles.label,
                                {
                                    color: styleState.textColor,
                                    fontSize: metrics.fontSize,
                                    fontWeight: "500",
                                    marginLeft: hasLeftIcon ? metrics.labelMargin : 0,
                                    marginRight: hasRightIcon ? metrics.labelMargin : 0,
                                },
                                labelStyle,
                            ], children: label })), renderButtonIcon(rightIcon, false)] })) }) }) }));
};
exports.default = Button;
const styles = react_native_1.StyleSheet.create({
    wrapper: {
        alignSelf: "flex-start",
        overflow: "hidden",
    },
    grouped: {
        alignSelf: "auto",
    },
    fullWidth: {
        alignSelf: "stretch",
    },
    pressable: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        maxWidth: "100%",
    },
    label: {
        textAlign: "center",
        flexShrink: 1,
    },
});
