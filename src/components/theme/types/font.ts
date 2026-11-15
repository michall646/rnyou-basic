import { TextStyle } from 'react-native';

export type FontWeight =
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type TypographyVariant =
  | 'displayLarge' | 'displayMedium' | 'displaySmall'
  | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
  | 'titleLarge' | 'titleMedium' | 'titleSmall'
  | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  | 'labelLarge' | 'labelMedium' | 'labelSmall'
  | 'displayLargeProminent' | 'displayMediumProminent' | 'displaySmallProminent'
  | 'headlineLargeProminent' | 'headlineMediumProminent' | 'headlineSmallProminent'
  | 'titleLargeProminent' | 'titleMediumProminent' | 'titleSmallProminent'
  | 'bodyLargeProminent' | 'bodyMediumProminent' | 'bodySmallProminent'
  | 'labelLargeProminent' | 'labelMediumProminent' | 'labelSmallProminent'
  | (string & {});

export type TypographyScale = Record<string, TextStyle>;

export interface FontPreset {
  name: string;
  fonts: Record<string, any>;
  typography: Record<string, TextStyle>;
}

export type FontPresetName = 'robotoFlex' | 'googleSansFlex';
