import React, { ReactNode } from "react";
import { MaterialColors, ThemeMode } from "./types/theme";
import { FontPreset } from "./types/font";
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
export declare const ThemeCompiler: ({ children, customColors, themeMode, scheme, customSchemes, fontPreset, setThemeMode, setScheme, setCustomColors, setFontPreset, }: ThemeCompilerProps) => React.JSX.Element;
export {};
