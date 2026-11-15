"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMaterialTheme = exports.useMaterialColors = exports.useSchemeColors = exports.ColorContext = exports.ThemeContext = void 0;
const react_1 = require("react");
const fallback_1 = require("./fallback");
const shape_1 = require("./types/shape");
const typographyFactory_1 = require("./typographyFactory");
const defaultTypography = (0, typographyFactory_1.buildTypographyScale)({
    name: 'fallback',
    fonts: {},
    typography: {},
});
exports.ThemeContext = (0, react_1.createContext)({
    ...fallback_1.lightFallbackColors,
    isDark: false,
    themeMode: "light",
    scheme: "default",
    isMaterialYouEnabled: false,
    shape: shape_1.DEFAULT_SHAPE_TOKENS,
    typography: defaultTypography,
    fontPreset: undefined,
    fontsLoaded: true,
    setThemeMode: () => { },
    setScheme: () => { },
    setCustomColors: () => { },
    setFontPreset: () => { },
});
/**
 * Serializable-only context for Reanimated worklets.
 * Contains just the flat color strings — no functions, typography, or nested objects.
 * Safe for `clonePlainJSObject` in Reanimated 4.x.
 */
exports.ColorContext = (0, react_1.createContext)(fallback_1.lightFallbackColors);
const useSchemeColors = () => (0, react_1.useContext)(exports.ColorContext);
exports.useSchemeColors = useSchemeColors;
const useMaterialColors = () => (0, react_1.useContext)(exports.ThemeContext);
exports.useMaterialColors = useMaterialColors;
const useMaterialTheme = () => (0, react_1.useContext)(exports.ThemeContext);
exports.useMaterialTheme = useMaterialTheme;
