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
const vector_icons_1 = require("@expo/vector-icons");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Pressable_1 = __importDefault(require("../pressable/Pressable"));
const m3ThemeProvider_1 = require("../theme/m3ThemeProvider");
const animations_1 = require("../../constants/animations");
const SIZE_MAP = {
    small: 20,
    medium: 24,
    large: 32,
};
const ICON_SIZE_MAP = {
    small: 14,
    medium: 18,
    large: 24,
};
const BORDER_WIDTH_MAP = {
    small: 2,
    medium: 2,
    large: 3,
};
const Checkbox = ({ checked, onChange, size = "medium", shape = "rounded", indeterminate = false, disabled = false, icon, accessibilityLabel, style, ...restProps }) => {
    const colors = (0, m3ThemeProvider_1.useSchemeColors)();
    const { shape: shapeTokens } = (0, m3ThemeProvider_1.useMaterialColors)();
    const boxSize = SIZE_MAP[size];
    const iconSize = ICON_SIZE_MAP[size];
    const borderWidth = BORDER_WIDTH_MAP[size];
    const isChecked = checked || indeterminate;
    const checkedSV = (0, react_native_reanimated_1.useSharedValue)(isChecked ? 1 : 0);
    const pressScale = (0, react_native_reanimated_1.useSharedValue)(1);
    react_1.default.useEffect(() => {
        checkedSV.value = (0, react_native_reanimated_1.withSpring)(isChecked ? 1 : 0, {
            damping: 25,
            stiffness: 500,
            mass: 0.5,
            overshootClamping: true,
        });
    }, [isChecked]);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        backgroundColor: (0, react_native_reanimated_1.interpolateColor)(checkedSV.value, [0, 1], [colors.surfaceVariant, colors.primary]),
        borderColor: (0, react_native_reanimated_1.interpolateColor)(checkedSV.value, [0, 1], [colors.onSurfaceVariant, colors.primary]),
        transform: [{ scale: pressScale.value }],
    }));
    const iconAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: checkedSV.value,
        transform: [{ scale: checkedSV.value }],
    }));
    const borderRadius = shape === "circle" ? 9999 : shapeTokens.extraSmall;
    const handlePressIn = () => {
        pressScale.value = (0, react_native_reanimated_1.withSpring)(0.92, animations_1.PRESS_SCALE_SHARP);
    };
    const handlePressOut = () => {
        pressScale.value = (0, react_native_reanimated_1.withSpring)(1, animations_1.PRESS_SCALE_SHARP);
    };
    const iconName = indeterminate ? "remove" : (icon ?? "check");
    const showIcon = checked || indeterminate;
    return ((0, jsx_runtime_1.jsx)(Pressable_1.default, { ...restProps, onPress: () => onChange(!checked), onPressIn: handlePressIn, onPressOut: handlePressOut, disabled: disabled, accessibilityRole: restProps.accessibilityRole ?? "checkbox", accessibilityLabel: accessibilityLabel ?? "Checkbox", accessibilityState: { checked, disabled, ...restProps.accessibilityState }, rippleColor: colors.primary, borderRadius: borderRadius, children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
                styles.box,
                {
                    width: boxSize,
                    height: boxSize,
                    borderRadius,
                    borderWidth,
                    opacity: disabled ? 0.38 : 1,
                },
                animatedStyle,
                style,
            ], children: showIcon && ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.iconContainer, iconAnimatedStyle], children: (0, jsx_runtime_1.jsx)(vector_icons_1.MaterialIcons, { name: iconName, size: iconSize, color: colors.onPrimary }) })) }) }));
};
exports.default = Checkbox;
const styles = react_native_1.StyleSheet.create({
    box: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
