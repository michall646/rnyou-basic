"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypographyScale = buildTypographyScale;
const presets_1 = require("./presets");
/**
 * Builds the final typography scale from a preset.
 *
 * 1. Lays down M3 baseline type scale (fontSize, lineHeight, letterSpacing)
 *    for every standard variant + Prominent variant.
 * 2. Overlays the preset's typography on top.
 *
 * Result: all standard variants have at minimum the M3 sizes.
 * Custom variants from the preset pass through as-is.
 */
function buildTypographyScale(preset) {
    const result = {};
    // Baseline for all standard M3 variants
    for (const [variant, scale] of Object.entries(presets_1.typeScale)) {
        result[variant] = { ...scale };
        const prominentKey = `${variant}Prominent`;
        result[prominentKey] = { ...scale };
    }
    // Overlay preset typography
    for (const [variant, style] of Object.entries(preset.typography)) {
        result[variant] = { ...result[variant], ...style };
    }
    return result;
}
