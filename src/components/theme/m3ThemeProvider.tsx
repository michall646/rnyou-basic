import { isDynamicThemeSupported } from "@pchmn/expo-material3-theme";
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Appearance, useColorScheme } from "react-native";
import {
  darkFallbackColors,
  lightFallbackColors,
} from "./fallback";
import { MaterialColors, ThemeMode } from "./types/theme";
import { FontPreset, FontPresetName } from "./types/font";
import { getPreset } from "./presets";
import { ThemeRenderer } from "./ThemeRenderer";
import { ThemeCompiler } from "./ThemeCompiler";
import type { MaterialThemeScheme } from "./ThemeContext";

export {
  useMaterialColors,
  useMaterialTheme,
  useSchemeColors,
  type MaterialThemeContext,
  type MaterialThemeScheme,
} from "./ThemeContext";

interface MaterialThemeProviderProps {
  children: ReactNode;
  customColors?: Partial<MaterialColors>;
  themeMode?: ThemeMode;
  scheme?: string;
  customSchemes?: Record<string, MaterialThemeScheme>;
  fontPreset?: FontPresetName | FontPreset;
}

function shallowEqualRecord(
  a?: Record<string, unknown>,
  b?: Record<string, unknown>,
): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => a[key] === b[key]);
}

export const MaterialThemeProvider = ({
  children,
  customColors: initialCustomColors,
  themeMode: initialThemeMode = "system",
  scheme: initialScheme = "default",
  customSchemes,
  fontPreset: initialFontPreset,
}: MaterialThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const [scheme, setSchemeState] = useState<string>(initialScheme);
  const [customColors, setCustomColorsState] = useState<
    Partial<MaterialColors> | undefined
  >(initialCustomColors);
  const [fontPreset, setFontPresetState] = useState<FontPreset | undefined>(
    () => {
      if (initialFontPreset) {
        if (typeof initialFontPreset === 'string') {
          return getPreset(initialFontPreset);
        }
        return initialFontPreset;
      }
      return getPreset('robotoFlex');
    },
  );

  // Re-sync state when the initial-* props change
  // (adjust state during render — React-sanctioned replacement for an effect)
  const [initialProps, setInitialProps] = useState({
    themeMode: initialThemeMode,
    scheme: initialScheme,
    customColors: initialCustomColors,
    fontPreset: initialFontPreset,
  });
  const customColorsChanged = !shallowEqualRecord(
    initialProps.customColors as Record<string, unknown> | undefined,
    initialCustomColors as Record<string, unknown> | undefined,
  );
  const fontPresetChanged =
    typeof initialProps.fontPreset === "string" || typeof initialFontPreset === "string"
      ? initialProps.fontPreset !== initialFontPreset
      : initialProps.fontPreset?.name !== initialFontPreset?.name;
  if (
    initialProps.themeMode !== initialThemeMode ||
    initialProps.scheme !== initialScheme ||
    customColorsChanged ||
    fontPresetChanged
  ) {
    setInitialProps({
      themeMode: initialThemeMode,
      scheme: initialScheme,
      customColors: initialCustomColors,
      fontPreset: initialFontPreset,
    });
    setThemeMode(initialThemeMode);
    setSchemeState(initialScheme);
    setCustomColorsState(initialCustomColors);
    if (initialFontPreset) {
      setFontPresetState(
        typeof initialFontPreset === "string"
          ? getPreset(initialFontPreset)
          : initialFontPreset,
      );
    }
  }

  const setCustomColors = useCallback(
    (
      colors:
        | Partial<MaterialColors>
        | ((
            prev: Partial<MaterialColors> | undefined,
          ) => Partial<MaterialColors>),
    ) => setCustomColorsState(colors),
    [],
  );

  const setFontPreset = useCallback(
    (preset: FontPreset | undefined) => setFontPresetState(preset),
    [],
  );

  const systemColorScheme = useColorScheme();
  const isDark = useMemo(() => {
    const schemeValue = systemColorScheme ?? Appearance.getColorScheme();
    return themeMode === "system"
      ? schemeValue === "dark"
      : themeMode === "dark";
  }, [systemColorScheme, themeMode]);

  if (!isDynamicThemeSupported) {
    const baseColors = isDark ? darkFallbackColors : lightFallbackColors;
    const fallbackColors: MaterialColors = {
      ...baseColors,
      ...(customSchemes?.[scheme] ?? {}),
      ...customColors,
    };

    return (
      <ThemeRenderer
        colors={fallbackColors}
        isDark={isDark}
        themeMode={themeMode}
        scheme={scheme}
        isMaterialYouEnabled={false}
        fontPreset={fontPreset}
        setThemeMode={setThemeMode}
        setScheme={setSchemeState}
        setCustomColors={setCustomColors}
        setFontPreset={setFontPreset}
      >
        {children}
      </ThemeRenderer>
    );
  }

  return (
    <ThemeCompiler
      customColors={customColors}
      themeMode={themeMode}
      scheme={scheme}
      customSchemes={customSchemes}
      fontPreset={fontPreset}
      setThemeMode={setThemeMode}
      setScheme={setSchemeState}
      setCustomColors={setCustomColors}
      setFontPreset={setFontPreset}
    >
      {children}
    </ThemeCompiler>
  );
};
