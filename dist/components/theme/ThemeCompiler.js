"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeCompiler = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const expo_material3_theme_1 = require("@pchmn/expo-material3-theme");
const react_1 = require("react");
const react_native_1 = require("react-native");
const fallback_1 = require("./fallback");
const ThemeRenderer_1 = require("./ThemeRenderer");
const ThemeCompiler = ({ children, customColors = {}, themeMode, scheme, customSchemes, fontPreset, setThemeMode, setScheme, setCustomColors, setFontPreset, }) => {
    const { theme } = (0, expo_material3_theme_1.useMaterial3Theme)();
    const isMaterialYouEnabled = expo_material3_theme_1.isDynamicThemeSupported;
    const systemColorScheme = (0, react_native_1.useColorScheme)();
    const isDark = (0, react_1.useMemo)(() => {
        const schemeValue = systemColorScheme ?? react_native_1.Appearance.getColorScheme();
        return themeMode === "system"
            ? schemeValue === "dark"
            : themeMode === "dark";
    }, [systemColorScheme, themeMode]);
    const baseColors = (0, react_1.useMemo)(() => {
        if (scheme === "dynamic") {
            return (isDark ? theme.dark : theme.light);
        }
        return isDark ? fallback_1.darkFallbackColors : fallback_1.lightFallbackColors;
    }, [theme, isDark, scheme]);
    const schemeColors = (0, react_1.useMemo)(() => ({
        ...baseColors,
        ...(customSchemes?.[scheme] ?? {}),
    }), [baseColors, customSchemes, scheme]);
    const finalColors = (0, react_1.useMemo)(() => ({
        ...schemeColors,
        ...customColors,
    }), [schemeColors, customColors]);
    return ((0, jsx_runtime_1.jsx)(ThemeRenderer_1.ThemeRenderer, { colors: finalColors, isDark: isDark, themeMode: themeMode, scheme: scheme, isMaterialYouEnabled: isMaterialYouEnabled, fontPreset: fontPreset, setThemeMode: setThemeMode, setScheme: setScheme, setCustomColors: setCustomColors, setFontPreset: setFontPreset, children: children }));
};
exports.ThemeCompiler = ThemeCompiler;
