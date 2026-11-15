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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const RIPPLE_BASE_SIZE = 100;
const RIPPLE_BASE_RADIUS = RIPPLE_BASE_SIZE / 2;
const distanceTo = (x1, y1, x2, y2) => {
    "worklet";
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
};
const getFarthestCornerDistance = (x, y, width, height) => {
    "worklet";
    const topLeft = distanceTo(x, y, 0, 0);
    const topRight = distanceTo(x, y, width, 0);
    const bottomLeft = distanceTo(x, y, 0, height);
    const bottomRight = distanceTo(x, y, width, height);
    return Math.max(topLeft, topRight, bottomLeft, bottomRight);
};
const RippleCircle = ({ x, y, color, opacity: rippleOpacity, duration, containerWidth, containerHeight, onComplete, }) => {
    const progress = (0, react_native_reanimated_1.useSharedValue)(0);
    react_1.default.useEffect(() => {
        progress.value = (0, react_native_reanimated_1.withTiming)(1, { duration, easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.ease) }, (finished) => {
            if (finished)
                (0, react_native_reanimated_1.runOnJS)(onComplete)();
        });
        return () => {
            (0, react_native_reanimated_1.cancelAnimation)(progress);
        };
    }, []);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const maxDistance = getFarthestCornerDistance(x, y, containerWidth, containerHeight);
        const targetScale = Math.max(maxDistance / RIPPLE_BASE_RADIUS, 0.01);
        const scale = (0, react_native_reanimated_1.interpolate)(progress.value, [0, 1], [0, targetScale]);
        const opacity = (0, react_native_reanimated_1.interpolate)(progress.value, [0, 0.66, 1], [rippleOpacity, rippleOpacity, 0]);
        return {
            transform: [{ scale }],
            opacity,
        };
    });
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { pointerEvents: "none", style: [
            styles.ripple,
            {
                left: x - RIPPLE_BASE_RADIUS,
                top: y - RIPPLE_BASE_RADIUS,
                backgroundColor: color,
            },
            animatedStyle,
        ] }));
};
const Pressable = (0, react_1.forwardRef)(({ children, style, rippleColor = "#000000", rippleOpacity = 0.12, rippleDuration = 400, onPress, onLongPress, onPressOut, onPressIn, disabled, forceRipple = false, borderRadius, borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius, ...rest }, ref) => {
    const [containerSize, setContainerSize] = (0, react_1.useState)({ width: 0, height: 0 });
    const [ripples, setRipples] = (0, react_1.useState)([]);
    const uniqueIdRef = (0, react_1.useRef)(0);
    const isRippleEnabled = !disabled && (forceRipple || !!onPress || !!onLongPress);
    const handleLayout = (0, react_1.useCallback)((event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    }, []);
    const removeRipple = (0, react_1.useCallback)((id) => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, []);
    const startRipple = (0, react_1.useCallback)((event) => {
        if (!isRippleEnabled)
            return;
        const { locationX, locationY } = event.nativeEvent;
        const x = typeof locationX === "number" ? locationX : containerSize.width / 2;
        const y = typeof locationY === "number"
            ? locationY
            : containerSize.height / 2;
        const id = uniqueIdRef.current++;
        setRipples((prev) => [...prev, { id, x, y }]);
    }, [isRippleEnabled, containerSize.width, containerSize.height]);
    const handlePressIn = (0, react_1.useCallback)((event) => {
        startRipple(event);
        onPressIn?.(event);
    }, [startRipple, onPressIn]);
    const borderRadiusStyle = {
        ...(borderRadius !== undefined && { borderRadius }),
        ...(borderTopLeftRadius !== undefined && { borderTopLeftRadius }),
        ...(borderTopRightRadius !== undefined && { borderTopRightRadius }),
        ...(borderBottomLeftRadius !== undefined && { borderBottomLeftRadius }),
        ...(borderBottomRightRadius !== undefined && { borderBottomRightRadius }),
    };
    const containerStyle = [
        styles.container,
        style,
        borderRadiusStyle,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { ref: ref, onPress: onPress, onLongPress: onLongPress, onPressIn: handlePressIn, onPressOut: onPressOut, disabled: disabled, onLayout: handleLayout, style: containerStyle, ...rest, children: [children, ripples.map((ripple) => ((0, jsx_runtime_1.jsx)(RippleCircle, { x: ripple.x, y: ripple.y, color: rippleColor, opacity: isRippleEnabled ? rippleOpacity : 0, duration: rippleDuration, containerWidth: containerSize.width, containerHeight: containerSize.height, onComplete: () => removeRipple(ripple.id) }, ripple.id)))] }));
});
Pressable.displayName = "Pressable";
exports.default = Pressable;
const styles = react_native_1.StyleSheet.create({
    container: {
        overflow: "hidden",
    },
    ripple: {
        position: "absolute",
        width: RIPPLE_BASE_SIZE,
        height: RIPPLE_BASE_SIZE,
        borderRadius: RIPPLE_BASE_RADIUS,
    },
});
