import React, { ReactNode } from "react";
import { MaterialColors, ThemeMode } from "./types/theme";
import { FontPreset, FontPresetName } from "./types/font";
import type { MaterialThemeScheme } from "./ThemeContext";
export { useMaterialColors, useMaterialTheme, useSchemeColors, type MaterialThemeContext, type MaterialThemeScheme, } from "./ThemeContext";
interface MaterialThemeProviderProps {
    children: ReactNode;
    customColors?: Partial<MaterialColors>;
    themeMode?: ThemeMode;
    scheme?: string;
    customSchemes?: Record<string, MaterialThemeScheme>;
    fontPreset?: FontPresetName | FontPreset;
}
export declare const MaterialThemeProvider: ({ children, customColors: initialCustomColors, themeMode: initialThemeMode, scheme: initialScheme, customSchemes, fontPreset: initialFontPreset, }: MaterialThemeProviderProps) => React.JSX.Element;
