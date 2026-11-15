# Upgrading from `rnyou-basic`

`rnyou-basic` is a clean subset of the full `rnyou` package. Every component, prop, hook, typography preset, and color utility in `rnyou-basic` shares the **exact same API** as `rnyou`—upgrading never breaks existing code.

---

## Option 1: Upgrade to UI Library (\$15 one-time)

Best if you already have an Expo / React Native app and want all **36 Material 3 components** (`BottomSheet`, `Dialog`, `Dropdown`, `Slider`, `TextField`, `NavigationBar`, `NavigationRail`, `FabMenu`, `SegmentedButton`, `Tabs`, `Skeleton`, `Snackbar`, etc.).

1. **Purchase & download** `rnyou-<version>.tgz` from [UI Library Checkout](https://rnyou.lemonsqueezy.com/checkout/buy/a012fc5a-7548-490f-94a8-2dd0eb7d034f?embed=1&checkout[discount_code]=UWNTQ4MG).
2. **Swap the dependency** in your project root:
   ```bash
   npm uninstall rnyou-basic
   npm install ./rnyou-<version>.tgz
   ```
   *(If you use Expo Router navigation components like `NavigationBar` or `FloatingNavBar`, ensure `expo-router` is also installed.)*
3. **Rename imports** from `'rnyou-basic'` to `'rnyou'`:
   ```diff
   - import { MaterialThemeProvider, Button, Switch } from 'rnyou-basic';
   + import { MaterialThemeProvider, Button, Switch, Dialog, Slider } from 'rnyou';
   ```
   All existing `Button`, `Checkbox`, `Chip`, `ChipGroup`, `Switch`, `Text`, and `MaterialThemeProvider` props remain 100% identical.

---

## Option 2: Upgrade to Template + CLI (\$25 one-time)

Best if you want the **production Expo starter app** (auth/OTP, RevenueCat paywalls, Sentry, MMKV + Zustand stores, onboarding, settings) **plus** the interactive `rnyou` CLI.

1. **Purchase & download** `rnyou-template-<version>.tar.gz` from [Template Checkout](https://rnyou.lemonsqueezy.com/checkout/buy/30bfebd0-643b-4c6f-b096-9073eb5beb81?embed=1&checkout[discount_code]=UWNTQ4MG).
2. **Extract the archive:**
   ```bash
   tar -xzf rnyou-template-<version>.tar.gz
   ```
3. **Choose your path:**
   * **Start a new app with the CLI:**
     ```bash
     npm install -g ./rnyou-template/libs/rnyou-cli-<version>.tgz
     rnyou init my-app --source ./rnyou-template-<version>.tar.gz
     ```
   * **Keep your existing app and upgrade the library:**
     Install the full UI library tarball included inside `libs/`:
     ```bash
     npm uninstall rnyou-basic
     npm install ./rnyou-template/libs/rnyou-<version>.tgz
     ```
     Then replace `'rnyou-basic'` imports with `'rnyou'` and run `rnyou doctor` to verify your project setup.
