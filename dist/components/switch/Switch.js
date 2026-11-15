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
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const m3ThemeProvider_1 = require("../theme/m3ThemeProvider");
const Pressable_1 = __importDefault(require("../pressable/Pressable"));
const TRACK_WIDTH = 68;
const TRACK_HEIGHT = 36;
const THUMB_SIZE = 24;
const THUMB_MARGIN = 4;
const BORDER_WIDTH = 3;
const TRANSLATE_X_DISTANCE = TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2 - BORDER_WIDTH * 2;
const TIMING = { duration: 100 };
const Switch = ({ value, onChange, disabled = false, style, accessibilityLabel, ...restProps }) => {
    const colors = (0, m3ThemeProvider_1.useSchemeColors)();
    const animatedTrackStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        backgroundColor: (0, react_native_reanimated_1.withTiming)(value ? colors.primary : colors.surfaceVariant, TIMING),
        borderColor: (0, react_native_reanimated_1.withTiming)(value ? colors.primary : colors.outline, TIMING),
    }));
    const animatedThumbStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [
            {
                translateX: (0, react_native_reanimated_1.withTiming)(value ? TRANSLATE_X_DISTANCE : 0, TIMING),
            },
            {
                scale: (0, react_native_reanimated_1.withTiming)(value ? 1 : 0.8, TIMING),
            },
        ],
        backgroundColor: (0, react_native_reanimated_1.withTiming)(value ? colors.onPrimary : colors.outline, TIMING),
    }));
    const animatedIconStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: (0, react_native_reanimated_1.withTiming)(value ? 1 : 0, TIMING),
        transform: [{ scale: (0, react_native_reanimated_1.withSpring)(value ? 1 : 0.5) }],
    }));
    return ((0, jsx_runtime_1.jsx)(Pressable_1.default, { ...restProps, onPress: () => onChange(!value), disabled: disabled, accessibilityRole: restProps.accessibilityRole ?? "switch", accessibilityLabel: accessibilityLabel ?? "Switch", accessibilityState: { checked: value, disabled, ...restProps.accessibilityState }, rippleColor: colors.onPrimary, style: style, children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.track, disabled && styles.disabledTrack, animatedTrackStyle], pointerEvents: "none", children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.thumb, animatedThumbStyle], children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.iconContainer, animatedIconStyle], children: (0, jsx_runtime_1.jsx)(vector_icons_1.MaterialIcons, { name: "check", size: 16, color: colors.primary }) }) }) }) }));
};
exports.default = Switch;
const styles = react_native_1.StyleSheet.create({
    track: {
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: TRACK_HEIGHT / 2,
        borderWidth: BORDER_WIDTH,
        padding: THUMB_MARGIN,
        justifyContent: "center",
    },
    disabledTrack: {
        opacity: 0.38,
    },
    thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
