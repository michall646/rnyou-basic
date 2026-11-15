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
exports.ThemeRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SystemUI = __importStar(require("expo-system-ui"));
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const shape_1 = require("./types/shape");
const fontLoader_1 = require("./fontLoader");
const typographyFactory_1 = require("./typographyFactory");
const ThemeContext_1 = require("./ThemeContext");
const ThemeRenderer = ({ children, colors, isDark, themeMode, scheme, isMaterialYouEnabled, fontPreset, setThemeMode, setScheme, setCustomColors, setFontPreset, }) => {
    const typography = react_1.default.useMemo(() => fontPreset
        ? (0, typographyFactory_1.buildTypographyScale)(fontPreset)
        : (0, typographyFactory_1.buildTypographyScale)({ name: 'default', fonts: {}, typography: {} }), [fontPreset]);
    const [fontsLoaded] = (0, fontLoader_1.useFontLoader)(fontPreset);
    (0, react_1.useEffect)(() => {
        if (react_native_1.Platform.OS !== "web") {
            SystemUI.setBackgroundColorAsync(colors.background).catch(() => { });
        }
    }, [colors.background]);
    const value = react_1.default.useMemo(() => ({
        ...colors,
        isDark,
        themeMode,
        scheme,
        isMaterialYouEnabled,
        shape: shape_1.DEFAULT_SHAPE_TOKENS,
        typography,
        fontPreset,
        fontsLoaded,
        setThemeMode,
        setScheme,
        setCustomColors,
        setFontPreset,
    }), [
        colors,
        isDark,
        themeMode,
        scheme,
        isMaterialYouEnabled,
        typography,
        fontPreset,
        fontsLoaded,
        setThemeMode,
        setScheme,
        setCustomColors,
        setFontPreset,
    ]);
    const schemeColors = react_1.default.useMemo(() => ({ ...colors }), [colors]);
    return ((0, jsx_runtime_1.jsx)(ThemeContext_1.ColorContext.Provider, { value: schemeColors, children: (0, jsx_runtime_1.jsx)(ThemeContext_1.ThemeContext.Provider, { value: value, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.root, { backgroundColor: colors.background }], children: children }) }) }));
};
exports.ThemeRenderer = ThemeRenderer;
const styles = react_native_1.StyleSheet.create({
    root: {
        flex: 1,
    },
});
