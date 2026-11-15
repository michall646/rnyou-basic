import { FontPreset } from './types/font';
/**
 * Loads fonts for the given preset via expo-font's useFonts.
 * Returns the standard expo-font load state.
 */
export declare function useFontLoader(preset?: FontPreset): [boolean, Error | null];
