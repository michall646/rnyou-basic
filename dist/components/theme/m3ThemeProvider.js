"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialThemeProvider = exports.useSchemeColors = exports.useMaterialTheme = exports.useMaterialColors = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const expo_material3_theme_1 = require("@pchmn/expo-material3-theme");
const react_1 = require("react");
const react_native_1 = require("react-native");
const fallback_1 = require("./fallback");
const presets_1 = require("./presets");
const ThemeRenderer_1 = require("./ThemeRenderer");
const ThemeCompiler_1 = require("./ThemeCompiler");
var ThemeContext_1 = require("./ThemeContext");
Object.defineProperty(exports, "useMaterialColors", { enumerable: true, get: function () { return ThemeContext_1.useMaterialColors; } });
Object.defineProperty(exports, "useMaterialTheme", { enumerable: true, get: function () { return ThemeContext_1.useMaterialTheme; } });
Object.defineProperty(exports, "useSchemeColors", { enumerable: true, get: function () { return ThemeContext_1.useSchemeColors; } });
function shallowEqualRecord(a, b) {
    if (a === b)
        return true;
    if (!a || !b)
        return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length)
        return false;
    return keysA.every((key) => a[key] === b[key]);
}
const MaterialThemeProvider = ({ children, customColors: initialCustomColors, themeMode: initialThemeMode = "system", scheme: initialScheme = "default", customSchemes, fontPreset: initialFontPreset, }) => {
    const [themeMode, setThemeMode] = (0, react_1.useState)(initialThemeMode);
    const [scheme, setSchemeState] = (0, react_1.useState)(initialScheme);
    const [customColors, setCustomColorsState] = (0, react_1.useState)(initialCustomColors);
    const [fontPreset, setFontPresetState] = (0, react_1.useState)(() => {
        if (initialFontPreset) {
            if (typeof initialFontPreset === 'string') {
                return (0, presets_1.getPreset)(initialFontPreset);
            }
            return initialFontPreset;
        }
        return (0, presets_1.getPreset)('robotoFlex');
    });
    // Re-sync state when the initial-* props change
    // (adjust state during render — React-sanctioned replacement for an effect)
    const [initialProps, setInitialProps] = (0, react_1.useState)({
        themeMode: initialThemeMode,
        scheme: initialScheme,
        customColors: initialCustomColors,
        fontPreset: initialFontPreset,
    });
    const customColorsChanged = !shallowEqualRecord(initialProps.customColors, initialCustomColors);
    const fontPresetChanged = typeof initialProps.fontPreset === "string" || typeof initialFontPreset === "string"
        ? initialProps.fontPreset !== initialFontPreset
        : initialProps.fontPreset?.name !== initialFontPreset?.name;
    if (initialProps.themeMode !== initialThemeMode ||
        initialProps.scheme !== initialScheme ||
        customColorsChanged ||
        fontPresetChanged) {
        setInitialProps({
            themeMode: initialThemeMode,
            scheme: initialScheme,
            customColors: initialCustomColors,
            fontPreset: initialFontPreset,
        });
        setThemeMode(initialThemeMode);
        setSchemeState(initialScheme);
        setCustomColorsState(initialCustomColors);
        if (initialFontPreset) {
            setFontPresetState(typeof initialFontPreset === "string"
                ? (0, presets_1.getPreset)(initialFontPreset)
                : initialFontPreset);
        }
    }
    const setCustomColors = (0, react_1.useCallback)((colors) => setCustomColorsState(colors), []);
    const setFontPreset = (0, react_1.useCallback)((preset) => setFontPresetState(preset), []);
    const systemColorScheme = (0, react_native_1.useColorScheme)();
    const isDark = (0, react_1.useMemo)(() => {
        const schemeValue = systemColorScheme ?? react_native_1.Appearance.getColorScheme();
        return themeMode === "system"
            ? schemeValue === "dark"
            : themeMode === "dark";
    }, [systemColorScheme, themeMode]);
    if (!expo_material3_theme_1.isDynamicThemeSupported) {
        const baseColors = isDark ? fallback_1.darkFallbackColors : fallback_1.lightFallbackColors;
        const fallbackColors = {
            ...baseColors,
            ...(customSchemes?.[scheme] ?? {}),
            ...customColors,
        };
        return ((0, jsx_runtime_1.jsx)(ThemeRenderer_1.ThemeRenderer, { colors: fallbackColors, isDark: isDark, themeMode: themeMode, scheme: scheme, isMaterialYouEnabled: false, fontPreset: fontPreset, setThemeMode: setThemeMode, setScheme: setSchemeState, setCustomColors: setCustomColors, setFontPreset: setFontPreset, children: children }));
    }
    return ((0, jsx_runtime_1.jsx)(ThemeCompiler_1.ThemeCompiler, { customColors: customColors, themeMode: themeMode, scheme: scheme, customSchemes: customSchemes, fontPreset: fontPreset, setThemeMode: setThemeMode, setScheme: setSchemeState, setCustomColors: setCustomColors, setFontPreset: setFontPreset, children: children }));
};
exports.MaterialThemeProvider = MaterialThemeProvider;
