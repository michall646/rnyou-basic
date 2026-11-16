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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopIndicators = StopIndicators;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const slider_constants_1 = require("./slider-constants");
const use_mask_animation_1 = require("./use-mask-animation");
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
function StopIndicators({ colors, steps, width, height, position, trackPadding, vertical, }) {
    const length = vertical ? height : width;
    const activeLength = length - 2 * trackPadding;
    const stepSize = steps > 1 ? activeLength / (steps - 1) : 0;
    const currentIndex = (0, react_native_reanimated_1.useDerivedValue)(() => {
        const relativePos = vertical
            ? height - trackPadding - position.value
            : position.value - trackPadding;
        return Math.round(relativePos / stepSize);
    });
    const { mask1Style, mask2Style, inner1Style, inner2Style } = (0, use_mask_animation_1.useMaskAnimation)(position, length, vertical);
    if (steps < 2)
        return null;
    const dots = Array.from({ length: steps });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [react_native_1.StyleSheet.absoluteFill, { width, height, zIndex: 10 }], pointerEvents: "none", children: [(0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.mask, mask1Style], children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [{ width, height }, inner1Style], children: renderDots(dots, currentIndex, colors.onPrimary, length, stepSize, vertical) }) }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.mask, mask2Style], children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [{ width, height }, inner2Style], children: renderDots(dots, currentIndex, colors.primary, length, stepSize, vertical) }) })] }));
}
function renderDots(dots, currentIndex, color, length, stepSize, vertical) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [vertical ? styles.dotsColumn : styles.dotsRow, { width: "100%", height: "100%" }], children: dots.map((_, i) => ((0, jsx_runtime_1.jsx)(DotStep, { index: i, currentIndex: currentIndex, color: color, dotPosition: vertical
                ? length - (slider_constants_1.TRACK_PADDING + i * stepSize)
                : slider_constants_1.TRACK_PADDING + i * stepSize, vertical: vertical }, i))) }));
}
/**
 * A single step indicator dot. Hides itself (opacity → 0) when it matches
 * the current step index (the thumb covers it).
 */
function DotStep({ index, currentIndex, color, dotPosition, vertical }) {
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: currentIndex.value === index ? 0 : 1,
    }));
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
            {
                position: "absolute",
                backgroundColor: color,
                width: slider_constants_1.DOT_SIZE,
                height: slider_constants_1.DOT_SIZE,
                borderRadius: slider_constants_1.DOT_SIZE / 2,
                ...(vertical
                    ? { left: "50%", marginLeft: -slider_constants_1.DOT_SIZE / 2, top: dotPosition - slider_constants_1.DOT_SIZE / 2 }
                    : { top: "50%", marginTop: -slider_constants_1.DOT_SIZE / 2, left: dotPosition - slider_constants_1.DOT_SIZE / 2 }),
            },
            animatedStyle,
        ] }));
}
const styles = react_native_1.StyleSheet.create({
    mask: {
        position: "absolute",
        overflow: "hidden",
    },
    dotsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    dotsColumn: {
        flexDirection: "column",
        alignItems: "center",
    },
});
