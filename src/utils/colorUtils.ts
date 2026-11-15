import * as m3 from "@material/material-color-utilities";

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

export function applyOpacity(color: string, opacity: number): string {
  const clamped = Math.max(0, Math.min(1, opacity));
  if (clamped <= 0) return "rgba(0, 0, 0, 0)";
  if (clamped >= 1) return color;

  const trimmed = color.trim();
  if (trimmed.startsWith("#")) {
    let hex = trimmed.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .slice(0, 3)
        .split("")
        .map((c) => c + c)
        .join("");
    } else if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }
    if (hex.length === 6) {
      const alpha = Math.round(clamped * 255)
        .toString(16)
        .padStart(2, "0");
      return `#${hex}${alpha}`;
    }
  }

  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*[\d.]+)?\s*\)$/i,
  );
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, ${Number(clamped.toFixed(3))})`;
  }

  return color;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) =>
    Math.round(Math.max(0, Math.min(255, c * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    default:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l, l, l];

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
}

export function lightenColor(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const newL = Math.min(1, l + amount);
  const [r2, g2, b2] = hslToRgb(h, s, newL);
  return rgbToHex(r2, g2, b2);
}

export function darkenColor(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const newL = Math.max(0, l - amount);
  const [r2, g2, b2] = hslToRgb(h, s, newL);
  return rgbToHex(r2, g2, b2);
}

// ---------------------------------------------------------------------------
// Material You (M3) Theme Generation & Translation Utilities
// ---------------------------------------------------------------------------

export interface TranslatedPalette {
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  95: string;
  99: string;
  100: string;
}

export interface TranslatedTheme {
  seedColor: {
    hex: string;
    hue: number;
    chroma: number;
    tone: number;
  };
  light: Record<string, string>;
  dark: Record<string, string>;
  palettes: {
    primary: TranslatedPalette;
    secondary: TranslatedPalette;
    tertiary: TranslatedPalette;
    neutral: TranslatedPalette;
    neutralVariant: TranslatedPalette;
    error: TranslatedPalette;
  };
}

function extractTones(tonalPalette: any): TranslatedPalette {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  const result: any = {};
  for (const t of tones) {
    result[t] = m3.hexFromArgb(tonalPalette.tone(t));
  }
  return result as TranslatedPalette;
}

function translateTheme(theme: any): TranslatedTheme {
  const hct = m3.Hct.fromInt(theme.source);
  
  const lightColors: Record<string, string> = {};
  const darkColors: Record<string, string> = {};
  
  const schemeKeys = [
    "primary", "onPrimary", "primaryContainer", "onPrimaryContainer",
    "secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer",
    "tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer",
    "error", "onError", "errorContainer", "onErrorContainer",
    "background", "onBackground", "surface", "onSurface",
    "surfaceVariant", "onSurfaceVariant", "outline", "outlineVariant",
    "shadow", "scrim", "inverseSurface", "inverseOnSurface", "inversePrimary",
    "surfaceContainerLowest", "surfaceContainerLow", "surfaceContainer", "surfaceContainerHigh", "surfaceContainerHighest"
  ];
  
  for (const key of schemeKeys) {
    if (theme.schemes.light[key] !== undefined) {
      lightColors[key] = m3.hexFromArgb(theme.schemes.light[key]);
    }
    if (theme.schemes.dark[key] !== undefined) {
      darkColors[key] = m3.hexFromArgb(theme.schemes.dark[key]);
    }
  }

  // Material 3 Surface & Container Hierarchy (Cards are lighter than canvas background in Light Mode)
  lightColors.background = m3.hexFromArgb(theme.palettes.neutral.tone(95));
  lightColors.surface = m3.hexFromArgb(theme.palettes.neutral.tone(95));
  lightColors.surfaceContainerLowest = m3.hexFromArgb(theme.palettes.neutral.tone(100)); // Tone 100 (pure white)
  lightColors.surfaceContainerLow = m3.hexFromArgb(theme.palettes.neutral.tone(99));    // Tone 99 (lighter than Tone 95 bg)
  lightColors.surfaceContainer = m3.hexFromArgb(theme.palettes.neutral.tone(98));       // Tone 98 (lighter than Tone 95 bg)
  lightColors.surfaceContainerHigh = m3.hexFromArgb(theme.palettes.neutral.tone(95));   // Tone 95
  lightColors.surfaceContainerHighest = m3.hexFromArgb(theme.palettes.neutral.tone(90)); // Tone 90

  darkColors.background = m3.hexFromArgb(theme.palettes.neutral.tone(10));
  darkColors.surface = m3.hexFromArgb(theme.palettes.neutral.tone(10));
  darkColors.surfaceContainerLowest = m3.hexFromArgb(theme.palettes.neutral.tone(10));
  darkColors.surfaceContainerLow = m3.hexFromArgb(theme.palettes.neutral.tone(20)); // Tone 20 (~#2b2d30 — clearly lighter than Tone 10 bg)
  darkColors.surfaceContainer = m3.hexFromArgb(theme.palettes.neutral.tone(20));    // Tone 20 (~#2b2d30 — clearly lighter than Tone 10 bg)
  darkColors.surfaceContainerHigh = m3.hexFromArgb(theme.palettes.neutral.tone(30)); // Tone 30 (~#36383b)
  darkColors.surfaceContainerHighest = m3.hexFromArgb(theme.palettes.neutral.tone(40)); // Tone 40 (~#484a4d)
  
  return {
    seedColor: {
      hex: m3.hexFromArgb(theme.source),
      hue: hct.hue,
      chroma: hct.chroma,
      tone: hct.tone
    },
    light: lightColors,
    dark: darkColors,
    palettes: {
      primary: extractTones(theme.palettes.primary),
      secondary: extractTones(theme.palettes.secondary),
      tertiary: extractTones(theme.palettes.tertiary),
      neutral: extractTones(theme.palettes.neutral),
      neutralVariant: extractTones(theme.palettes.neutralVariant),
      error: extractTones(theme.palettes.error)
    }
  };
}

/**
 * Generates a complete Material Design 3 theme (light/dark schemes and tonal palettes)
 * from a seed color hex string.
 * 
 * @param hex The seed color hex code (e.g., "#6750A4" or "6750a4")
 */
export function generateThemeFromColor(hex: string): TranslatedTheme {
  const cleanHex = hex.startsWith("#") ? hex : `#${hex}`;
  const seedArgb = m3.argbFromHex(cleanHex);
  const theme = m3.themeFromSourceColor(seedArgb);
  return translateTheme(theme);
}

/**
 * Generates a complete Material Design 3 theme from an array of ARGB pixel colors.
 * Runs Celebi quantization and M3 scoring to find the best seed color.
 * 
 * @param pixels Array of ARGB pixel integers
 */
export function generateThemeFromPixels(pixels: number[]): TranslatedTheme {
  const colorsToPopulation = m3.QuantizerCelebi.quantize(pixels, 128);
  const candidates = m3.Score.score(colorsToPopulation);
  const seedArgb = candidates[0];
  const theme = m3.themeFromSourceColor(seedArgb);
  return translateTheme(theme);
}

function extractPixelsFromCanvasOrImage(element: any): number[] {
  let canvas: any;
  let ctx: any;
  
  if (element.getContext) {
    // Canvas element
    canvas = element;
    ctx = canvas.getContext("2d");
  } else {
    // Image element
    canvas = document.createElement("canvas");
    canvas.width = element.naturalWidth || element.width;
    canvas.height = element.naturalHeight || element.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(element, 0, 0);
  }
  
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  
  const pixels: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    // ARGB: (a << 24) | (r << 16) | (g << 8) | b
    const argb = ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
    pixels.push(argb);
  }
  
  // Downsample to max 16,384 pixels for high-performance quantization
  const maxPixels = 16384;
  if (pixels.length <= maxPixels) {
    return pixels;
  }
  
  const stride = Math.max(1, Math.floor(pixels.length / maxPixels));
  const downsampled: number[] = [];
  for (let i = 0; i < pixels.length; i += stride) {
    downsampled.push(pixels[i]);
  }
  return downsampled;
}

/**
 * Generates a complete Material Design 3 theme from a photo/image source.
 * 
 * - On Web: Supports HTMLImageElement, HTMLCanvasElement, or image URL string.
 * - On Native (iOS/Android): Image color extraction requires native platform APIs.
 *   For custom photos, use a native color extractor library to get the seed hex color,
 *   then pass it to `generateThemeFromColor`.
 * 
 * @param photo The image element, canvas, or URL string.
 */
export async function generateThemeFromImage(photo: any): Promise<TranslatedTheme> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error(
      "generateThemeFromImage is only supported in browser/web environments. " +
      "On native iOS/Android, please extract the seed color using a native library and use generateThemeFromColor."
    );
  }

  let imgElement: any;

  if (typeof photo === "string") {
    imgElement = await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error("Failed to load image: " + err));
      img.src = photo;
    });
  } else {
    imgElement = photo;
  }

  const pixels = extractPixelsFromCanvasOrImage(imgElement);
  return generateThemeFromPixels(pixels);
}


