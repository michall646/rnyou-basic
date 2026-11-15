"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFontLoader = useFontLoader;
const expo_font_1 = require("expo-font");
const EMPTY_FONTS = {};
/**
 * Loads fonts for the given preset via expo-font's useFonts.
 * Returns the standard expo-font load state.
 */
function useFontLoader(preset) {
    const fonts = preset?.fonts ?? EMPTY_FONTS;
    return (0, expo_font_1.useFonts)(fonts);
}
