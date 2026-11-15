// rnyou-basic — Trimmed entry point for the rnyou-basic package.
// Ships only the core form components + the theme system they require.
//
// Exports are a subset of src/index.ts. Adding a component here also
// requires updating the scoped build (tsconfig.build-demo.json) and
// re-running `npm run pack:demo`.

// 1. Button
export { default as Button } from "./components/button/Button";
export type { ButtonProps, MaterialIconName } from "./components/button/Button.types";

// 2. Checkbox
export { default as Checkbox } from "./components/checkbox/Checkbox";
export * from "./components/checkbox/Checkbox.types";

// 3. Chip & Chip Group
export { default as Chip } from "./components/chip/Chip";
export { default as ChipGroup } from "./components/chip/ChipGroup";
export * from "./components/chip/Chip.types";

// 4. Switch
export { default as Switch } from "./components/switch/Switch";

// 5. Typography (consumed internally by Button & Chip)
export { default as Text, AnimatedText } from "./components/text/Text";

// Icon types (canonical exports)
export type { IconName, IconProp } from "./types/icons";

// 6. Theme & Providers — required for the components above to render
export {
  MaterialThemeProvider,
  useMaterialColors,
  useMaterialTheme,
} from "./components/theme/m3ThemeProvider";
export type {
  MaterialThemeContext,
  MaterialThemeScheme,
} from "./components/theme/m3ThemeProvider";
export {
  darkFallbackColors,
  lightFallbackColors,
} from "./components/theme/fallback";
export type {
  MaterialColors,
  ThemeMode,
} from "./components/theme/types/theme";
export type {
  FontPreset,
  FontPresetName,
  FontWeight,
  TypographyVariant,
} from "./components/theme/types/font";
export {
  robotoFlexPreset,
  googleSansFlexPreset,
  presets,
  useFontLoader,
} from "./components/theme/typography";

// 7. Color utilities used by the theme system
export {
  lightenColor,
  darkenColor,
  generateThemeFromColor,
  generateThemeFromPixels,
  generateThemeFromImage,
  type TranslatedTheme,
  type TranslatedPalette,
} from "./utils/colorUtils";
