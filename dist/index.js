"use strict";
// rnyou-basic — Trimmed entry point for the rnyou-basic package.
// Ships only the core form components + the theme system they require.
//
// Exports are a subset of src/index.ts. Adding a component here also
// requires updating the scoped build (tsconfig.build-demo.json) and
// re-running `npm run pack:demo`.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateThemeFromImage = exports.generateThemeFromPixels = exports.generateThemeFromColor = exports.darkenColor = exports.lightenColor = exports.useFontLoader = exports.presets = exports.googleSansFlexPreset = exports.robotoFlexPreset = exports.lightFallbackColors = exports.darkFallbackColors = exports.useMaterialTheme = exports.useMaterialColors = exports.MaterialThemeProvider = exports.AnimatedText = exports.Text = exports.Switch = exports.ChipGroup = exports.Chip = exports.Checkbox = exports.Button = void 0;
// 1. Button
var Button_1 = require("./components/button/Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return __importDefault(Button_1).default; } });
// 2. Checkbox
var Checkbox_1 = require("./components/checkbox/Checkbox");
Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function () { return __importDefault(Checkbox_1).default; } });
__exportStar(require("./components/checkbox/Checkbox.types"), exports);
// 3. Chip & Chip Group
var Chip_1 = require("./components/chip/Chip");
Object.defineProperty(exports, "Chip", { enumerable: true, get: function () { return __importDefault(Chip_1).default; } });
var ChipGroup_1 = require("./components/chip/ChipGroup");
Object.defineProperty(exports, "ChipGroup", { enumerable: true, get: function () { return __importDefault(ChipGroup_1).default; } });
__exportStar(require("./components/chip/Chip.types"), exports);
// 4. Switch
var Switch_1 = require("./components/switch/Switch");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return __importDefault(Switch_1).default; } });
// 5. Typography (consumed internally by Button & Chip)
var Text_1 = require("./components/text/Text");
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return __importDefault(Text_1).default; } });
Object.defineProperty(exports, "AnimatedText", { enumerable: true, get: function () { return Text_1.AnimatedText; } });
// 6. Theme & Providers — required for the components above to render
var m3ThemeProvider_1 = require("./components/theme/m3ThemeProvider");
Object.defineProperty(exports, "MaterialThemeProvider", { enumerable: true, get: function () { return m3ThemeProvider_1.MaterialThemeProvider; } });
Object.defineProperty(exports, "useMaterialColors", { enumerable: true, get: function () { return m3ThemeProvider_1.useMaterialColors; } });
Object.defineProperty(exports, "useMaterialTheme", { enumerable: true, get: function () { return m3ThemeProvider_1.useMaterialTheme; } });
var fallback_1 = require("./components/theme/fallback");
Object.defineProperty(exports, "darkFallbackColors", { enumerable: true, get: function () { return fallback_1.darkFallbackColors; } });
Object.defineProperty(exports, "lightFallbackColors", { enumerable: true, get: function () { return fallback_1.lightFallbackColors; } });
var typography_1 = require("./components/theme/typography");
Object.defineProperty(exports, "robotoFlexPreset", { enumerable: true, get: function () { return typography_1.robotoFlexPreset; } });
Object.defineProperty(exports, "googleSansFlexPreset", { enumerable: true, get: function () { return typography_1.googleSansFlexPreset; } });
Object.defineProperty(exports, "presets", { enumerable: true, get: function () { return typography_1.presets; } });
Object.defineProperty(exports, "useFontLoader", { enumerable: true, get: function () { return typography_1.useFontLoader; } });
// 7. Color utilities used by the theme system
var colorUtils_1 = require("./utils/colorUtils");
Object.defineProperty(exports, "lightenColor", { enumerable: true, get: function () { return colorUtils_1.lightenColor; } });
Object.defineProperty(exports, "darkenColor", { enumerable: true, get: function () { return colorUtils_1.darkenColor; } });
Object.defineProperty(exports, "generateThemeFromColor", { enumerable: true, get: function () { return colorUtils_1.generateThemeFromColor; } });
Object.defineProperty(exports, "generateThemeFromPixels", { enumerable: true, get: function () { return colorUtils_1.generateThemeFromPixels; } });
Object.defineProperty(exports, "generateThemeFromImage", { enumerable: true, get: function () { return colorUtils_1.generateThemeFromImage; } });
