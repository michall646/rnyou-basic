"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderIcon = renderIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const vector_icons_1 = require("@expo/vector-icons");
// ── Shared icon renderer ────────────────────────────────────────────────────
// Converts IconProp to a ReactNode with correct size/color.
// - string → <MaterialIcons name={icon} size color />
// - ReactElement → cloned with color/size (skips Fragment)
// - Other ReactNode → returned as-is
function renderIcon(icon, size, color) {
    if (!icon)
        return null;
    // String icon name → render MaterialIcons
    if (typeof icon === "string") {
        return (0, jsx_runtime_1.jsx)(vector_icons_1.MaterialIcons, { name: icon, size: size, color: color });
    }
    // Clone valid element to inject size/color
    if (react_1.default.isValidElement(icon) && icon.type !== react_1.default.Fragment) {
        return react_1.default.cloneElement(icon, {
            color: icon.props.color || color,
            size: icon.props.size || size,
        });
    }
    // Return non-element nodes (null, boolean, etc.) as-is
    return icon;
}
