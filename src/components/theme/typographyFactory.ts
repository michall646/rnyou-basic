import { TextStyle } from 'react-native';
import { FontPreset } from './types/font';
import { typeScale } from './presets';

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
export function buildTypographyScale(preset: FontPreset): Record<string, TextStyle> {
  const result: Record<string, TextStyle> = {};

  // Baseline for all standard M3 variants
  for (const [variant, scale] of Object.entries(typeScale)) {
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
