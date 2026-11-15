import { createContext, useContext } from "react";
import { lightFallbackColors } from "./fallback";
import { DEFAULT_SHAPE_TOKENS, ShapeTokens } from "./types/shape";
import { MaterialColors, ThemeMode } from "./types/theme";
import { TypographyScale } from "./types/typography";
import { FontPreset } from "./types/font";
import { buildTypographyScale } from "./typographyFactory";

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
  setCustomColors: (
    colors:
      | Partial<MaterialColors>
      | ((prev: Partial<MaterialColors> | undefined) => Partial<MaterialColors>),
  ) => void;
  setFontPreset: (preset: FontPreset | undefined) => void;
}

const defaultTypography = buildTypographyScale({
  name: 'fallback',
  fonts: {},
  typography: {},
});

export const ThemeContext = createContext<MaterialThemeContext>({
  ...lightFallbackColors,
  isDark: false,
  themeMode: "light",
  scheme: "default",
  isMaterialYouEnabled: false,
  shape: DEFAULT_SHAPE_TOKENS,
  typography: defaultTypography,
  fontPreset: undefined,
  fontsLoaded: true,
  setThemeMode: () => {},
  setScheme: () => {},
  setCustomColors: () => {},
  setFontPreset: () => {},
});

/**
 * Serializable-only context for Reanimated worklets.
 * Contains just the flat color strings — no functions, typography, or nested objects.
 * Safe for `clonePlainJSObject` in Reanimated 4.x.
 */
export const ColorContext = createContext<MaterialColors>(lightFallbackColors);

export const useSchemeColors = (): MaterialColors =>
  useContext(ColorContext);

export const useMaterialColors = (): MaterialThemeContext =>
  useContext(ThemeContext);

export const useMaterialTheme = (): MaterialThemeContext =>
  useContext(ThemeContext);
