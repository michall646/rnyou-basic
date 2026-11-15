import * as SystemUI from "expo-system-ui";
import React, { ReactNode, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DEFAULT_SHAPE_TOKENS } from "./types/shape";
import { MaterialColors, ThemeMode } from "./types/theme";
import { TypographyScale } from "./types/typography";
import { FontPreset } from "./types/font";
import { useFontLoader } from "./fontLoader";
import { buildTypographyScale } from "./typographyFactory";
import { ThemeContext, MaterialThemeContext, ColorContext } from "./ThemeContext";

interface ThemeRendererProps {
  children: ReactNode;
  colors: MaterialColors;
  isDark: boolean;
  themeMode: ThemeMode;
  scheme: string;
  isMaterialYouEnabled: boolean;
  fontPreset?: FontPreset;
  setThemeMode: (mode: ThemeMode) => void;
  setScheme: (scheme: string) => void;
  setCustomColors: MaterialThemeContext["setCustomColors"];
  setFontPreset: MaterialThemeContext["setFontPreset"];
}

export const ThemeRenderer = ({
  children,
  colors,
  isDark,
  themeMode,
  scheme,
  isMaterialYouEnabled,
  fontPreset,
  setThemeMode,
  setScheme,
  setCustomColors,
  setFontPreset,
}: ThemeRendererProps) => {
  const typography: TypographyScale = React.useMemo(
    () => fontPreset
      ? buildTypographyScale(fontPreset)
      : buildTypographyScale({ name: 'default', fonts: {}, typography: {} }),
    [fontPreset],
  );

  const [fontsLoaded] = useFontLoader(fontPreset);

  useEffect(() => {
    if (Platform.OS !== "web") {
      SystemUI.setBackgroundColorAsync(colors.background).catch(() => {});
    }
  }, [colors.background]);

  const value = React.useMemo<MaterialThemeContext>(
    () => ({
      ...colors,
      isDark,
      themeMode,
      scheme,
      isMaterialYouEnabled,
      shape: DEFAULT_SHAPE_TOKENS,
      typography,
      fontPreset,
      fontsLoaded,
      setThemeMode,
      setScheme,
      setCustomColors,
      setFontPreset,
    }),
    [
      colors,
      isDark,
      themeMode,
      scheme,
      isMaterialYouEnabled,
      typography,
      fontPreset,
      fontsLoaded,
      setThemeMode,
      setScheme,
      setCustomColors,
      setFontPreset,
    ],
  );

  const schemeColors = React.useMemo<MaterialColors>(
    () => ({ ...colors }),
    [colors],
  );

  return (
    <ColorContext.Provider value={schemeColors}>
      <ThemeContext.Provider value={value}>
        <View style={[styles.root, { backgroundColor: colors.background }]}>
          {children}
        </View>
      </ThemeContext.Provider>
    </ColorContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
