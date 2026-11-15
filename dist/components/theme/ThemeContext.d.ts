import { ShapeTokens } from "./types/shape";
import { MaterialColors, ThemeMode } from "./types/theme";
import { TypographyScale } from "./types/typography";
import { FontPreset } from "./types/font";
export type MaterialThemeScheme = Partial<MaterialColors>;
export interface MaterialThemeContext extends MaterialColors {
    isDark: boolean;
    themeMode: ThemeMode;
    scheme: string;
    isMaterialYouEnabled: boolean;
    shape: ShapeTokens;
    typography: TypographyScale;
    fontPreset?: FontPreset;
    /** True once configured fonts have finished loading (async). */
    fontsLoaded: boolean;
    setThemeMode: (mode: ThemeMode) => void;
    setScheme: (scheme: string) => void;
    setCustomColors: (colors: Partial<MaterialColors> | ((prev: Partial<MaterialColors> | undefined) => Partial<MaterialColors>)) => void;
    setFontPreset: (preset: FontPreset | undefined) => void;
}
export declare const ThemeContext: import("react").Context<MaterialThemeContext>;
/**
 * Serializable-only context for Reanimated worklets.
 * Contains just the flat color strings — no functions, typography, or nested objects.
 * Safe for `clonePlainJSObject` in Reanimated 4.x.
 */
export declare const ColorContext: import("react").Context<MaterialColors>;
export declare const useSchemeColors: () => MaterialColors;
export declare const useMaterialColors: () => MaterialThemeContext;
export declare const useMaterialTheme: () => MaterialThemeContext;
