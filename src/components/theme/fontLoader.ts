import { useFonts as useExpoFonts } from 'expo-font';
import { FontPreset } from './types/font';

const EMPTY_FONTS: Record<string, any> = {};

/**
 * Loads fonts for the given preset via expo-font's useFonts.
 * Returns the standard expo-font load state.
 */
export function useFontLoader(preset?: FontPreset) {
  const fonts = preset?.fonts ?? EMPTY_FONTS;
  return useExpoFonts(fonts);
}
