import { TextStyle } from 'react-native';
import { RobotoFlex_400Regular } from '@expo-google-fonts/roboto-flex';
import { GoogleSansFlex_400Regular } from '@expo-google-fonts/google-sans-flex';
import { FontPreset } from './types/font';

/**
 * M3 type scale baseline (fontSize, lineHeight, letterSpacing).
 * Presets overlay fontFamily, fontWeight, and variable font axes on top.
 */
export const typeScale: Record<string, { fontSize: number; lineHeight: number; letterSpacing: number }> = {
  displayLarge: { fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
  displayMedium: { fontSize: 45, lineHeight: 52, letterSpacing: 0 },
  displaySmall: { fontSize: 36, lineHeight: 44, letterSpacing: 0 },
  headlineLarge: { fontSize: 32, lineHeight: 40, letterSpacing: 0 },
  headlineMedium: { fontSize: 28, lineHeight: 36, letterSpacing: 0 },
  headlineSmall: { fontSize: 24, lineHeight: 32, letterSpacing: 0 },
  titleLarge: { fontSize: 22, lineHeight: 28, letterSpacing: 0 },
  titleMedium: { fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
  titleSmall: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  bodyLarge: { fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
  bodyMedium: { fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
  bodySmall: { fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  labelLarge: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  labelSmall: { fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
};

// M3 variable font spec: weight and optical size per category
const VAR_FONT_SPEC: Record<string, { weight: number; opsz: number }> = {
  displayLarge: { weight: 400, opsz: 57 },
  displayMedium: { weight: 400, opsz: 45 },
  displaySmall: { weight: 400, opsz: 36 },
  headlineLarge: { weight: 400, opsz: 32 },
  headlineMedium: { weight: 400, opsz: 28 },
  headlineSmall: { weight: 400, opsz: 24 },
  titleLarge: { weight: 400, opsz: 22 },
  titleMedium: { weight: 500, opsz: 16 },
  titleSmall: { weight: 500, opsz: 14 },
  bodyLarge: { weight: 400, opsz: 6 },
  bodyMedium: { weight: 400, opsz: 4 },
  bodySmall: { weight: 400, opsz: 2 },
  labelLarge: { weight: 500, opsz: 14 },
  labelMedium: { weight: 500, opsz: 12 },
  labelSmall: { weight: 500, opsz: 11 },
};

function buildVarFontVariant(
  family: string,
  variant: string,
  weight: number,
  opticalSize: number,
): TextStyle {
  const scale = typeScale[variant] ?? typeScale.bodyMedium;
  return {
    fontFamily: family,
    fontWeight: `${weight}` as any,
    fontSize: scale.fontSize,
    lineHeight: scale.lineHeight,
    letterSpacing: scale.letterSpacing,
    // @ts-ignore — fontVariationSettings supported on web and RN 0.73+
    fontVariationSettings: `'wght' ${weight}, 'opsz' ${opticalSize}`,
  };
}

function buildVarFontPreset(
  name: string,
  fonts: Record<string, any>,
  family: string,
): FontPreset {
  const typography: Record<string, TextStyle> = {};
  const prominentWeightOverrides: Record<string, number> = {
    display: 700,
    headline: 700,
    title: 700,
    body: 500,
    label: 700,
  };

  for (const [variant, spec] of Object.entries(VAR_FONT_SPEC)) {
    typography[variant] = buildVarFontVariant(family, variant, spec.weight, spec.opsz);

    const prominentKey = `${variant}Prominent`;
    const category = ['display', 'headline', 'title', 'body', 'label'].find(c => variant.startsWith(c)) ?? 'body';
    typography[prominentKey] = buildVarFontVariant(
      family,
      variant,
      prominentWeightOverrides[category] ?? 700,
      spec.opsz,
    );
  }

  return { name, fonts, typography };
}

export const robotoFlexPreset: FontPreset = buildVarFontPreset(
  'robotoFlex',
  { RobotoFlex: RobotoFlex_400Regular },
  'RobotoFlex',
);

export const googleSansFlexPreset: FontPreset = buildVarFontPreset(
  'googleSansFlex',
  { GoogleSansFlex: GoogleSansFlex_400Regular },
  'GoogleSansFlex',
);

export const presets: Record<string, FontPreset> = {
  robotoFlex: robotoFlexPreset,
  googleSansFlex: googleSansFlexPreset,
};

export function getPreset(name: string): FontPreset | undefined {
  return presets[name];
}
