"use strict";
// Shared spring animation configs — semantic, not component-specific
// Import from this file instead of hardcoding spring configs inline
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAB_INDICATOR = exports.SPLIT_ROTATION = exports.SLIDER_POSITION = exports.REFRESH_PULL = exports.NAV_LABEL_WIDTH = exports.MENU_ENTER = exports.LIST_SNAPPY = exports.DROPDOWN_SNAPPY = exports.BUTTON_GROUP_SNAP = exports.BADGE_POP = exports.BADGE_TRANSITION = exports.BADGE_APPEAR = exports.M3_SPRING_LIGHT = exports.M3_SPRING_MID = exports.INDICATOR_RAIL = exports.INDICATOR_PILL = exports.EXPAND_SNAPPY = exports.EXPAND_SMOOTH = exports.ACTIVE_TRANSITION = exports.FOCUS_TRANSITION = exports.PRESS_SCALE_SHARP = exports.PRESS_SCALE_LIGHT = exports.PRESS_SCALE = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
// ── Press / Tap Scale ─────────────────────────────────────
/** Standard press scale for buttons, FABs, icon buttons, and chips */
exports.PRESS_SCALE = {
    damping: 15,
    stiffness: 350,
    mass: 1,
    overshootClamping: true,
};
/** Lighter press scale for small/delicate elements like avatars */
exports.PRESS_SCALE_LIGHT = {
    damping: 15,
    stiffness: 450,
    mass: 0.8,
};
/** Sharp, instant-snap press scale for checkboxes and similar toggles */
exports.PRESS_SCALE_SHARP = {
    damping: 20,
    stiffness: 600,
    mass: 0.3,
    overshootClamping: true,
};
// ── Focus / Active State ──────────────────────────────────
/** Focus ring and border width transitions (TextField, Dropdown) */
exports.FOCUS_TRANSITION = {
    damping: 24,
    stiffness: 1000,
    overshootClamping: true,
};
/** Slow, smooth active state transition (Button toggle) */
exports.ACTIVE_TRANSITION = {
    damping: 16,
    stiffness: 180,
    mass: 1,
};
// ── Expand / Collapse ─────────────────────────────────────
/** Smooth expand/collapse for menus and overlays (FabMenu) */
exports.EXPAND_SMOOTH = {
    damping: 20,
    stiffness: 200,
    overshootClamping: true,
};
/** Snappy expand/collapse for list items and accordions */
exports.EXPAND_SNAPPY = {
    damping: 28,
    stiffness: 320,
    overshootClamping: true,
};
// ── Position Indicators ───────────────────────────────────
/** Pill indicator position tracking (NavigationBar) */
exports.INDICATOR_PILL = {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
};
/** Rail track width animation (NavigationRail) */
exports.INDICATOR_RAIL = {
    damping: 14,
    stiffness: 220,
    mass: 0.8,
};
// ── Material Design 3 Springs ─────────────────────────────
// Match M3 spec: https://m3.material.io/styles/motion/easing-and-duration
exports.M3_SPRING_MID = {
    damping: 60,
    stiffness: 1000,
    velocity: 200,
    mass: 4,
    energyThreshold: 0.0001,
};
exports.M3_SPRING_LIGHT = {
    damping: 60,
    stiffness: 500,
    velocity: 10,
    mass: 1,
    energyThreshold: 0.0001,
};
// ── Component-Specific (unique physics, not duplicated) ───
/** Badge appear/disappear */
exports.BADGE_APPEAR = {
    damping: 25,
    stiffness: 600,
    mass: 0.8,
    velocity: 20,
    energyThreshold: 0.0001,
};
/** Badge dot ↔ text transition */
exports.BADGE_TRANSITION = {
    damping: 18,
    stiffness: 350,
    mass: 0.8,
};
/** Badge content change pop */
exports.BADGE_POP = {
    damping: 16,
    stiffness: 500,
    mass: 0.7,
    velocity: 30,
};
/** ButtonGroup width adjustment snap */
exports.BUTTON_GROUP_SNAP = {
    damping: 24,
    stiffness: 400,
    overshootClamping: true,
    mass: 1,
};
/** Dropdown open/close snappy curve */
exports.DROPDOWN_SNAPPY = {
    damping: 20,
    stiffness: 450,
    mass: 0.4,
};
/** ListItem segmented border radii */
exports.LIST_SNAPPY = {
    damping: 24,
    stiffness: 320,
};
/** Menu scale/opacity enter */
exports.MENU_ENTER = {
    damping: 14,
    stiffness: 380,
    mass: 0.5,
};
/** NavItem label width expand */
exports.NAV_LABEL_WIDTH = {
    damping: 14,
    stiffness: 200,
    mass: 1,
};
/** RefreshControl pull-down */
exports.REFRESH_PULL = {
    damping: 15,
    stiffness: 300,
};
/** Slider position tracking */
exports.SLIDER_POSITION = {
    damping: 20,
    stiffness: 150,
};
/** SplitButton rotation */
exports.SPLIT_ROTATION = {
    damping: 12,
    stiffness: 350,
    mass: 0.5,
};
/** Tab active indicator slide (M3 elastic, 250ms) */
exports.TAB_INDICATOR = {
    duration: 250,
    easing: react_native_reanimated_1.Easing.bezier(0.2, 0, 0, 1),
};
