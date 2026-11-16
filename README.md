# RNYou Basic

Free, MIT-licensed core of **RNYou** — Google's **Material You (Material 3)** design system for React Native and Expo with dynamic color extraction, variable typography, and Reanimated spring physics.

## What's Included

* **Core Components:** `Button`, `Checkbox`, `Chip`, `ChipGroup`, `Slider`, `Switch`, `Text`, `AnimatedText`
* **Dynamic Theme Engine:** `MaterialThemeProvider`, `useMaterialColors`, `useMaterialTheme`
* **Color Utilities:** `generateThemeFromColor`, `generateThemeFromImage`, `generateThemeFromPixels`, `lightenColor`, `darkenColor`
* **Typography Presets:** `googleSansFlexPreset`, `robotoFlexPreset`, `useFontLoader`

Want all **36 Material 3 components**, or the **full Expo starter template + interactive CLI**? See [Upgrading to UI Library or Template](#upgrading-to-ui-library-or-template) below.

---

## Installation

Install directly from GitHub:

```bash
npm install github:michall646/rnyou-basic
```

Install peer dependencies in your Expo project:

```bash
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler expo-haptics @expo/vector-icons expo-font expo-system-ui @pchmn/expo-material3-theme
```

Add the Reanimated worklets plugin **last** in `babel.config.js`:

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-worklets/plugin'],
};
```

---

## Quick Start

Wrap your root component with `GestureHandlerRootView` and `MaterialThemeProvider`:

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialThemeProvider, Button, Switch, Chip, Slider, Text } from 'rnyou-basic';

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState(0.5);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MaterialThemeProvider fontPreset="googleSansFlex">
        <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16 }}>
          <Text variant="headlineMedium">Hello Material You</Text>
          <Chip label="Dynamic Theme" variant="assist" onPress={() => {}} />
          <Slider value={value} width={260} onValueChange={setValue} />
          <Switch value={enabled} onChange={setEnabled} />
          <Button variant="filled" label="Get Started" onPress={() => {}} />
        </View>
      </MaterialThemeProvider>
    </GestureHandlerRootView>
  );
}
```

---

## Upgrading to UI Library or Template

`rnyou-basic` exports the **exact same component APIs, props, hooks, and theme tokens** as the full `rnyou` library—so upgrading later requires **zero component rewrites**.

| Feature | Basic (Free · MIT) | UI Library (\$15 one-time) | Template + CLI (\$25 one-time) |
|---|---|---|---|
| Core (`Button`, `Chip`, `Switch`, `Checkbox`, `Slider`, `Text`) | ✅ | ✅ | ✅ |
| Dynamic `MaterialThemeProvider` & Typography | ✅ | ✅ | ✅ |
| All 36 Material 3 Components (Sheets, Dialogs, Sliders, Rails, etc.) | — | ✅ | ✅ |
| Expo Router Navigation & Haptics | — | ✅ | ✅ |
| Full Expo Starter App (Auth, RevenueCat, Sentry, MMKV/Zustand) | — | — | ✅ |
| Interactive `rnyou` CLI (screen, store, palette generators) | — | — | ✅ |

### Quick Upgrade (3 Steps, Zero Rewrites)

1. **Get a paid plan:**
   * [Get UI Library (\$15)](https://rnyou.lemonsqueezy.com/checkout/buy/a012fc5a-7548-490f-94a8-2dd0eb7d034f?embed=1&checkout[discount_code]=UWNTQ4MG) — `rnyou-<version>.tgz`
   * [Get Template + CLI (\$25)](https://rnyou.lemonsqueezy.com/checkout/buy/30bfebd0-643b-4c6f-b096-9073eb5beb81?embed=1&checkout[discount_code]=UWNTQ4MG) — `rnyou-template-<version>.tar.gz`
2. **Swap the package:**
   ```bash
   npm uninstall rnyou-basic
   npm install ./rnyou-<version>.tgz
   ```
3. **Update your import path** (find-and-replace across `src/` or `app/`):
   ```diff
   - import { Button, MaterialThemeProvider } from 'rnyou-basic';
   + import { Button, MaterialThemeProvider, BottomSheet, Slider } from 'rnyou';
   ```

See [UPGRADING.md](./UPGRADING.md) for the full guide, including upgrading to the Template & CLI.

---

## License

MIT — see [LICENSE](./LICENSE).
