"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsetIcon = InsetIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const use_mask_animation_1 = require("./use-mask-animation");
/**
 * Inset icon overlay that renders a Material Icon pinned to the track edge.
 *
 * The icon is duplicated and masked on each side of the thumb:
 * - Left/bottom side: colored with `colors.onPrimary` (appears on the active track)
 * - Right/top side: colored with `colors.primary` (appears on the inactive track)
 */
function InsetIcon({ icon, colors, width, height, position, offset, iconSize, vertical, }) {
    const length = vertical ? height : width;
    const { mask1Style, mask2Style, inner1Style, inner2Style } = (0, use_mask_animation_1.useMaskAnimation)(position, length, vertical);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [react_native_1.StyleSheet.absoluteFill, { width, height, zIndex: 10 }], pointerEvents: "none", children: [(0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.mask, mask1Style], children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [{ width, height }, inner1Style], children: renderIcon(icon, iconSize, colors.onPrimary, width, height, vertical, offset) }) }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.mask, mask2Style], children: (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [{ width, height }, inner2Style], children: renderIcon(icon, iconSize, colors.primary, width, height, vertical, offset) }) })] }));
}
function renderIcon(name, size, color, width, height, vertical, offset) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width, height, justifyContent: "center", alignItems: "center" }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                position: "absolute",
                ...(vertical ? { bottom: offset } : { left: offset }),
            }, children: (0, jsx_runtime_1.jsx)(vector_icons_1.MaterialIcons, { name: name, size: size, color: color }) }) }));
}
const styles = react_native_1.StyleSheet.create({
    mask: {
        position: "absolute",
        overflow: "hidden",
    },
});
