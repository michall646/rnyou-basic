// Shared spring animation configs — semantic, not component-specific
// Import from this file instead of hardcoding spring configs inline

import { Easing } from "react-native-reanimated";

// ── Press / Tap Scale ─────────────────────────────────────

/** Standard press scale for buttons, FABs, icon buttons, and chips */
export const PRESS_SCALE = {
  damping: 15,
  stiffness: 350,
  mass: 1,
  overshootClamping: true,
};

/** Lighter press scale for small/delicate elements like avatars */
export const PRESS_SCALE_LIGHT = {
  damping: 15,
  stiffness: 450,
  mass: 0.8,
};

/** Sharp, instant-snap press scale for checkboxes and similar toggles */
export const PRESS_SCALE_SHARP = {
  damping: 20,
  stiffness: 600,
  mass: 0.3,
  overshootClamping: true,
};

// ── Focus / Active State ──────────────────────────────────

/** Focus ring and border width transitions (TextField, Dropdown) */
export const FOCUS_TRANSITION = {
  damping: 24,
  stiffness: 1000,
  overshootClamping: true,
};

/** Slow, smooth active state transition (Button toggle) */
export const ACTIVE_TRANSITION = {
  damping: 16,
  stiffness: 180,
  mass: 1,
};

// ── Expand / Collapse ─────────────────────────────────────

/** Smooth expand/collapse for menus and overlays (FabMenu) */
export const EXPAND_SMOOTH = {
  damping: 20,
  stiffness: 200,
  overshootClamping: true,
};

/** Snappy expand/collapse for list items and accordions */
export const EXPAND_SNAPPY = {
  damping: 28,
  stiffness: 320,
  overshootClamping: true,
};

// ── Position Indicators ───────────────────────────────────

/** Pill indicator position tracking (NavigationBar) */
export const INDICATOR_PILL = {
  damping: 20,
  stiffness: 300,
  mass: 0.8,
};

/** Rail track width animation (NavigationRail) */
export const INDICATOR_RAIL = {
  damping: 14,
  stiffness: 220,
  mass: 0.8,
};

// ── Material Design 3 Springs ─────────────────────────────
// Match M3 spec: https://m3.material.io/styles/motion/easing-and-duration

export const M3_SPRING_MID = {
  damping: 60,
  stiffness: 1000,
  velocity: 200,
  mass: 4,
  energyThreshold: 0.0001,
};

export const M3_SPRING_LIGHT = {
  damping: 60,
  stiffness: 500,
  velocity: 10,
  mass: 1,
  energyThreshold: 0.0001,
};

// ── Component-Specific (unique physics, not duplicated) ───

/** Badge appear/disappear */
export const BADGE_APPEAR = {
  damping: 25,
  stiffness: 600,
  mass: 0.8,
  velocity: 20,
  energyThreshold: 0.0001,
};

/** Badge dot ↔ text transition */
export const BADGE_TRANSITION = {
  damping: 18,
  stiffness: 350,
  mass: 0.8,
};

/** Badge content change pop */
export const BADGE_POP = {
  damping: 16,
  stiffness: 500,
  mass: 0.7,
  velocity: 30,
};

/** ButtonGroup width adjustment snap */
export const BUTTON_GROUP_SNAP = {
  damping: 24,
  stiffness: 400,
  overshootClamping: true,
  mass: 1,
};

/** Dropdown open/close snappy curve */
export const DROPDOWN_SNAPPY = {
  damping: 20,
  stiffness: 450,
  mass: 0.4,
};

/** ListItem segmented border radii */
export const LIST_SNAPPY = {
  damping: 24,
  stiffness: 320,
};

/** Menu scale/opacity enter */
export const MENU_ENTER = {
  damping: 14,
  stiffness: 380,
  mass: 0.5,
};

/** NavItem label width expand */
export const NAV_LABEL_WIDTH = {
  damping: 14,
  stiffness: 200,
  mass: 1,
};

/** RefreshControl pull-down */
export const REFRESH_PULL = {
  damping: 15,
  stiffness: 300,
};

/** Slider position tracking */
export const SLIDER_POSITION = {
  damping: 20,
  stiffness: 150,
};

/** SplitButton rotation */
export const SPLIT_ROTATION = {
  damping: 12,
  stiffness: 350,
  mass: 0.5,
};

/** Tab active indicator slide (M3 elastic, 250ms) */
export const TAB_INDICATOR = {
  duration: 250,
  easing: Easing.bezier(0.2, 0, 0, 1),
};
