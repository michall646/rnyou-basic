import { TextStyle } from 'react-native';
import { FontPreset } from './types/font';
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
export declare function buildTypographyScale(preset: FontPreset): Record<string, TextStyle>;
