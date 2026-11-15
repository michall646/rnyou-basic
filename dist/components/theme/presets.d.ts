import { FontPreset } from './types/font';
/**
 * M3 type scale baseline (fontSize, lineHeight, letterSpacing).
 * Presets overlay fontFamily, fontWeight, and variable font axes on top.
 */
export declare const typeScale: Record<string, {
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
}>;
export declare const robotoFlexPreset: FontPreset;
export declare const googleSansFlexPreset: FontPreset;
export declare const presets: Record<string, FontPreset>;
export declare function getPreset(name: string): FontPreset | undefined;
