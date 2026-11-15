export declare function applyOpacity(color: string, opacity: number): string;
export declare function lightenColor(hex: string, amount: number): string;
export declare function darkenColor(hex: string, amount: number): string;
export interface TranslatedPalette {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    95: string;
    99: string;
    100: string;
}
export interface TranslatedTheme {
    seedColor: {
        hex: string;
        hue: number;
        chroma: number;
        tone: number;
    };
    light: Record<string, string>;
    dark: Record<string, string>;
    palettes: {
        primary: TranslatedPalette;
        secondary: TranslatedPalette;
        tertiary: TranslatedPalette;
        neutral: TranslatedPalette;
        neutralVariant: TranslatedPalette;
        error: TranslatedPalette;
    };
}
/**
 * Generates a complete Material Design 3 theme (light/dark schemes and tonal palettes)
 * from a seed color hex string.
 *
 * @param hex The seed color hex code (e.g., "#6750A4" or "6750a4")
 */
export declare function generateThemeFromColor(hex: string): TranslatedTheme;
/**
 * Generates a complete Material Design 3 theme from an array of ARGB pixel colors.
 * Runs Celebi quantization and M3 scoring to find the best seed color.
 *
 * @param pixels Array of ARGB pixel integers
 */
export declare function generateThemeFromPixels(pixels: number[]): TranslatedTheme;
/**
 * Generates a complete Material Design 3 theme from a photo/image source.
 *
 * - On Web: Supports HTMLImageElement, HTMLCanvasElement, or image URL string.
 * - On Native (iOS/Android): Image color extraction requires native platform APIs.
 *   For custom photos, use a native color extractor library to get the seed hex color,
 *   then pass it to `generateThemeFromColor`.
 *
 * @param photo The image element, canvas, or URL string.
 */
export declare function generateThemeFromImage(photo: any): Promise<TranslatedTheme>;
