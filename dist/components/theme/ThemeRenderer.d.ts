import React, { ReactNode } from "react";
import { MaterialColors, ThemeMode } from "./types/theme";
import { FontPreset } from "./types/font";
import { MaterialThemeContext } from "./ThemeContext";
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
export declare const ThemeRenderer: ({ children, colors, isDark, themeMode, scheme, isMaterialYouEnabled, fontPreset, setThemeMode, setScheme, setCustomColors, setFontPreset, }: ThemeRendererProps) => React.JSX.Element;
export {};
