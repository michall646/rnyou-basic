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
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Pressable_1 = __importDefault(require("../pressable/Pressable"));
const Text_1 = require("../text/Text");
const m3ThemeProvider_1 = require("../theme/m3ThemeProvider");
const animations_1 = require("../../constants/animations");
const Chip = ({ label, children, variant = "assist", selected = false, disabled = false, labelVariant = "labelLarge", labelFamily, labelWeight, onPress, leadingIcon, selectedLeadingIcon, trailingIcon, selectedTrailingIcon, style, labelStyle, accessibilityLabel, ...restProps }) => {
    const colors = (0, m3ThemeProvider_1.useSchemeColors)();
    const { shape } = (0, m3ThemeProvider_1.useMaterialColors)();
    const isSelected = selected && (variant === "filter" || variant === "input");
    const scale = (0, react_native_reanimated_1.useSharedValue)(1);
    const selectedSV = (0, react_native_reanimated_1.useSharedValue)(isSelected ? 1 : 0);
    (0, react_1.useEffect)(() => {
        selectedSV.value = (0, react_native_reanimated_1.withTiming)(isSelected ? 1 : 0, { duration: 150 });
    }, [isSelected]);
    const containerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        backgroundColor: (0, react_native_reanimated_1.interpolateColor)(selectedSV.value, [0, 1], [colors.surfaceContainerLow, colors.secondaryContainer]),
        borderColor: (0, react_native_reanimated_1.interpolateColor)(selectedSV.value, [0, 1], [colors.outlineVariant, "transparent"]),
        transform: [{ scale: scale.value }],
    }));
    const textAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        color: (0, react_native_reanimated_1.interpolateColor)(selectedSV.value, [0, 1], [colors.onSurfaceVariant, colors.onSecondaryContainer]),
    }));
    const handlePressIn = () => {
        scale.value = (0, react_native_reanimated_1.withSpring)(1.03, animations_1.PRESS_SCALE);
    };
    const handlePressOut = () => {
        scale.value = (0, react_native_reanimated_1.withSpring)(1, animations_1.PRESS_SCALE);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
            styles.container,
            { borderWidth: 1, borderRadius: shape.small },
            containerStyle,
            style,
        ], children: (0, jsx_runtime_1.jsx)(Pressable_1.default, { ...restProps, onPress: onPress, onPressIn: handlePressIn, onPressOut: handlePressOut, disabled: disabled, accessibilityRole: restProps.accessibilityRole ?? "button", accessibilityLabel: accessibilityLabel ?? label, accessibilityState: { selected: isSelected, disabled, ...restProps.accessibilityState }, rippleColor: colors.onSurface, style: styles.pressable, children: children ? (children) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [leadingIcon || selectedLeadingIcon ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.leadingIconContainer, children: (0, jsx_runtime_1.jsx)(vector_icons_1.MaterialIcons, { name: (isSelected && selectedLeadingIcon ? selectedLeadingIcon : leadingIcon), size: 18, color: colors.primary }) })) : null, (0, jsx_runtime_1.jsx)(Text_1.AnimatedText, { variant: labelVariant, family: labelFamily, weight: labelWeight, style: [
                            textAnimatedStyle,
                            {
                                marginLeft: leadingIcon ? 8 : 14,
                                marginRight: trailingIcon ? 8 : 14,
                            },
                            labelStyle,
                        ], children: label }), trailingIcon || selectedTrailingIcon ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.trailingIconContainer, children: (0, jsx_runtime_1.jsx)(vector_icons_1.MaterialIcons, { name: (isSelected && selectedTrailingIcon ? selectedTrailingIcon : trailingIcon), size: 18, color: colors.primary }) })) : null] })) }) }));
};
exports.default = Chip;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: 32,
        overflow: "hidden",
        alignSelf: "flex-start",
    },
    pressable: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    leadingIconContainer: {
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    trailingIconContainer: {
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    disabled: { opacity: 0.38 },
});
