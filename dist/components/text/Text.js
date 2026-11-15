"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const m3ThemeProvider_1 = require("../theme/m3ThemeProvider");
const Text = react_1.default.forwardRef(({ variant = 'bodyMedium', children, style, color, centerVertical, family, weight, ...props }, ref) => {
    const theme = (0, m3ThemeProvider_1.useMaterialColors)();
    const variantStyle = theme.typography[variant];
    const fontFamily = family ?? variantStyle.fontFamily;
    const fontWeight = weight ?? variantStyle.fontWeight;
    const isHeader = variant.startsWith("display") || variant.startsWith("headline") || variant.startsWith("title");
    const combinedStyle = [
        variantStyle,
        {
            fontFamily,
            fontWeight,
            color: color || theme.onSurface,
            includeFontPadding: false,
            textAlignVertical: 'center',
        },
        centerVertical &&
            react_native_1.Platform.select({
                web: {
                    lineHeight: undefined,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                default: {
                    lineHeight: undefined,
                    textAlignVertical: "center",
                },
            }),
        style,
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.Text, { ref: ref, accessibilityRole: isHeader ? "header" : "text", style: combinedStyle, ...props, children: children }));
});
Text.displayName = "Text";
exports.AnimatedText = react_native_reanimated_1.default.createAnimatedComponent(Text);
exports.default = Text;
