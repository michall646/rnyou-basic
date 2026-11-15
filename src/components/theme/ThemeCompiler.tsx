import { isDynamicThemeSupported, useMaterial3Theme } from "@pchmn/expo-material3-theme";
import React, { ReactNode, useMemo } from "react";
import { Appearance, useColorScheme } from "react-native";
import {
  darkFallbackColors,
  lightFallbackColors,
} from "./fallback";
import { MaterialColors, ThemeMode } from "./types/theme";
import { FontPreset } from "./types/font";
import { ThemeRenderer } from "./ThemeRenderer";
import type { MaterialThemeContext, MaterialThemeScheme } from "./ThemeContext";

interface ThemeCompilerProps {
  children: ReactNode;
  customColors?: Partial<MaterialColors>;
  themeMode: ThemeMode;
  scheme: string;
  customSchemes?: Record<string, MaterialThemeScheme>;
  fontPreset?: FontPreset;
  setThemeMode: (mode: ThemeMode) => void;
  setScheme: (scheme: string) => void;
  setCustomColors: MaterialThemeContext["setCustomColors"];
  setFontPreset: MaterialThemeContext["setFontPreset"];
}

export const ThemeCompiler = ({
  children,
  customColors = {},
  themeMode,
  scheme,
  customSchemes,
  fontPreset,
  setThemeMode,
  setScheme,
  setCustomColors,
  setFontPreset,
}: ThemeCompilerProps) => {
  const { theme } = useMaterial3Theme();
  const isMaterialYouEnabled = isDynamicThemeSupported;
  const systemColorScheme = useColorScheme();

  const isDark = useMemo(() => {
    const schemeValue = systemColorScheme ?? Appearance.getColorScheme();
    return themeMode === "system"
      ? schemeValue === "dark"
      : themeMode === "dark";
  }, [systemColorScheme, themeMode]);

  const baseColors = useMemo<MaterialColors>(
    () => {
      if (scheme === "dynamic") {
        return (isDark ? theme.dark : theme.light) as MaterialColors;
      }
      return isDark ? darkFallbackColors : lightFallbackColors;
    },
    [theme, isDark, scheme],
  );

  const schemeColors = useMemo<MaterialColors>(
    () => ({
      ...baseColors,
      ...(customSchemes?.[scheme] ?? {}),
    }),
    [baseColors, customSchemes, scheme],
  );

  const finalColors = useMemo<MaterialColors>(
    () => ({
      ...schemeColors,
      ...customColors,
    }),
    [schemeColors, customColors],
  );

  return (
    <ThemeRenderer
      colors={finalColors}
      isDark={isDark}
      themeMode={themeMode}
      scheme={scheme}
      isMaterialYouEnabled={isMaterialYouEnabled}
      fontPreset={fontPreset}
      setThemeMode={setThemeMode}
      setScheme={setScheme}
      setCustomColors={setCustomColors}
      setFontPreset={setFontPreset}
    >
      {children}
    </ThemeRenderer>
  );
};
