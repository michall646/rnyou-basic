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
exports.default = Slider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Haptics = __importStar(require("expo-haptics"));
const m3ThemeProvider_1 = require("../theme/m3ThemeProvider");
const inset_icon_1 = require("./inset-icon");
const stop_indicators_1 = require("./stop-indicators");
const slider_constants_1 = require("./slider-constants");
const slider_utils_1 = require("./slider-utils");
const animations_1 = require("../../constants/animations");
function Slider({ width = 250, height = 250, size = "medium", steps = 1, value, vertical = false, insetIcon, enableVibrations = true, onValueChange, accessibilityLabel, }) {
    const colors = (0, m3ThemeProvider_1.useSchemeColors)();
    const normalizeSize = (s) => {
        if (s === "S" || s === "small")
            return "small";
        if (s === "M" || s === "medium")
            return "medium";
        if (s === "L" || s === "large")
            return "large";
        if (s === "XS" || s === "xSmall")
            return "xSmall";
        if (s === "XL" || s === "xLarge")
            return "xLarge";
        return (slider_constants_1.SLIDER_METRICS[s] ? s : "medium");
    };
    const metrics = slider_constants_1.SLIDER_METRICS[normalizeSize(size)] || slider_constants_1.SLIDER_METRICS.medium;
    // Track dimensions
    const length = vertical ? height : width;
    const thickness = metrics.trackHeight;
    // Shared values for gesture-driven animation
    const position = (0, react_native_reanimated_1.useSharedValue)((0, slider_utils_1.getPositionFromValue)(value, length, vertical));
    const isHolding = (0, react_native_reanimated_1.useSharedValue)(false);
    const lastStepIndex = (0, react_native_reanimated_1.useSharedValue)(steps > 1 ? Math.round(value * (steps - 1)) : 0);
    // Helper to trigger haptic feedback
    const triggerVibration = () => {
        Haptics.selectionAsync().catch(() => { });
    };
    // Animate position when external value changes (e.g. reset, programmatic update)
    (0, react_1.useEffect)(() => {
        position.value = (0, react_native_reanimated_1.withSpring)((0, slider_utils_1.getPositionFromValue)(value, length, vertical), animations_1.SLIDER_POSITION);
        lastStepIndex.value = steps > 1 ? Math.round(value * (steps - 1)) : 0;
    }, [value, length, vertical, position, steps, lastStepIndex]);
    // Pan gesture: drag the thumb, clamp to bounds, and optionally snap to steps
    const panGesture = (0, react_1.useMemo)(() => react_native_gesture_handler_1.Gesture.Pan()
        .minDistance(0)
        .onUpdate((e) => {
        'worklet';
        const coord = vertical ? e.y : e.x;
        let newPos = (0, react_native_reanimated_1.clamp)(coord, slider_constants_1.TRACK_PADDING, length - slider_constants_1.TRACK_PADDING);
        // Snap to discrete steps (only in non-icon mode with steps > 1)
        if (steps > 1 && !insetIcon) {
            newPos = (0, slider_utils_1.snapToStep)(newPos, length, steps, vertical);
            // Calculate step index for haptics
            const activeLength = length - 2 * slider_constants_1.TRACK_PADDING;
            const intervals = steps - 1;
            const stepSize = activeLength / intervals;
            const relativePos = vertical
                ? length - slider_constants_1.TRACK_PADDING - newPos
                : newPos - slider_constants_1.TRACK_PADDING;
            const stepIndex = Math.round(relativePos / stepSize);
            if (lastStepIndex.value !== stepIndex) {
                lastStepIndex.value = stepIndex;
                if (enableVibrations) {
                    (0, react_native_reanimated_1.runOnJS)(triggerVibration)();
                }
            }
        }
        if (position.value !== newPos) {
            position.value = newPos;
            const newValue = (0, slider_utils_1.getValueFromPosition)(newPos, length, vertical);
            if (onValueChange) {
                (0, react_native_reanimated_1.runOnJS)(onValueChange)(newValue);
            }
        }
        isHolding.value = true;
    })
        .onEnd(() => {
        'worklet';
        isHolding.value = false;
    }), [vertical, length, steps, insetIcon, position, onValueChange, isHolding, enableVibrations, lastStepIndex]);
    // --- Animated styles ---
    /** Active track fill: grows from start edge toward the thumb */
    const trackActiveStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const size = vertical ? length - position.value : position.value;
        const dimension = Math.max(0, Math.round(size - slider_constants_1.GAP - slider_constants_1.THUMB_WIDTH / 2));
        return vertical ? { height: dimension } : { width: dimension };
    });
    /** Inactive track fill: grows from thumb toward the far edge */
    const trackInactiveStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const size = vertical ? position.value : length - position.value;
        const dimension = Math.max(0, Math.round(size - slider_constants_1.GAP - slider_constants_1.THUMB_WIDTH / 2));
        return vertical ? { height: dimension } : { width: dimension };
    });
    /** Thumb: translates along the track and scales on press */
    const thumbAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: vertical
            ? [
                { translateY: Math.round(position.value - metrics.handleWidth / 2) },
                { scaleY: (0, react_native_reanimated_1.withTiming)(isHolding.value ? 0.6 : 1, { duration: 100 }) },
            ]
            : [
                { translateX: Math.round(position.value - metrics.handleWidth / 2) },
                { scaleX: (0, react_native_reanimated_1.withTiming)(isHolding.value ? 0.6 : 1, { duration: 100 }) },
            ],
    }));
    // --- Layout ---
    const isVerticalMetric = vertical
        ? { height: length, width: thickness }
        : { width: length, height: thickness };
    return ((0, jsx_runtime_1.jsx)(react_native_gesture_handler_1.GestureDetector, { gesture: panGesture, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, isVerticalMetric], accessibilityRole: "adjustable", accessibilityLabel: accessibilityLabel ?? "Slider", accessibilityValue: {
                min: 0,
                max: 1,
                now: Math.round(value * 100) / 100,
            }, children: [(0, jsx_runtime_1.jsx)(Track, { edge: vertical ? "bottom" : "left", color: colors.primary, thickness: thickness, trackShape: metrics.trackShape, animatedStyle: trackActiveStyle }), (0, jsx_runtime_1.jsx)(Track, { edge: vertical ? "top" : "right", color: colors.secondaryContainer, thickness: thickness, trackShape: metrics.trackShape, animatedStyle: trackInactiveStyle }), insetIcon ? ((0, jsx_runtime_1.jsx)(inset_icon_1.InsetIcon, { icon: insetIcon, colors: colors, width: vertical ? thickness : length, height: vertical ? length : thickness, position: position, offset: metrics.trackShape, iconSize: metrics.iconSize, vertical: vertical })) : ((0, jsx_runtime_1.jsx)(stop_indicators_1.StopIndicators, { colors: colors, steps: steps, width: vertical ? thickness : length, height: vertical ? length : thickness, position: position, trackPadding: slider_constants_1.TRACK_PADDING, vertical: vertical })), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
                        styles.thumb,
                        {
                            backgroundColor: colors.primary,
                            zIndex: 20,
                            ...(vertical
                                ? {
                                    width: metrics.handleHeight,
                                    height: metrics.handleWidth,
                                    borderRadius: metrics.handleWidth / 2,
                                    left: (thickness - metrics.handleHeight) / 2,
                                }
                                : {
                                    width: metrics.handleWidth,
                                    height: metrics.handleHeight,
                                    borderRadius: metrics.handleWidth / 2,
                                    top: (thickness - metrics.handleHeight) / 2,
                                }),
                        },
                        thumbAnimatedStyle,
                    ] })] }) }));
}
/** Renders a rounded track segment anchored to one edge of the container. */
function Track({ edge, color, thickness, trackShape, animatedStyle }) {
    const isVertical = edge === "top" || edge === "bottom";
    const edgeType = isVertical ? "top-bottom" : "left-right";
    const isStart = edge === "left" || edge === "bottom";
    const borderRadius = (() => {
        if (edgeType === "top-bottom") {
            return isStart
                ? { borderBottomLeftRadius: trackShape, borderBottomRightRadius: trackShape }
                : { borderTopLeftRadius: trackShape, borderTopRightRadius: trackShape };
        }
        return isStart
            ? { borderTopLeftRadius: trackShape, borderBottomLeftRadius: trackShape }
            : { borderTopRightRadius: trackShape, borderBottomRightRadius: trackShape };
    })();
    const dimensionStyle = isVertical
        ? { width: thickness }
        : { height: thickness };
    const edgeStyle = edge === "left" ? { left: 0 }
        : edge === "right" ? { right: 0 }
            : edge === "top" ? { top: 0 }
                : { bottom: 0 };
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
            styles.track,
            edgeStyle,
            dimensionStyle,
            { backgroundColor: color, ...borderRadius },
            animatedStyle,
        ] }));
}
// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        position: "relative",
    },
    track: {
        position: "absolute",
    },
    thumb: {
        position: "absolute",
        top: 0,
        left: 0,
    },
});
