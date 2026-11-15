/** Standard press scale for buttons, FABs, icon buttons, and chips */
export declare const PRESS_SCALE: {
    damping: number;
    stiffness: number;
    mass: number;
    overshootClamping: boolean;
};
/** Lighter press scale for small/delicate elements like avatars */
export declare const PRESS_SCALE_LIGHT: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** Sharp, instant-snap press scale for checkboxes and similar toggles */
export declare const PRESS_SCALE_SHARP: {
    damping: number;
    stiffness: number;
    mass: number;
    overshootClamping: boolean;
};
/** Focus ring and border width transitions (TextField, Dropdown) */
export declare const FOCUS_TRANSITION: {
    damping: number;
    stiffness: number;
    overshootClamping: boolean;
};
/** Slow, smooth active state transition (Button toggle) */
export declare const ACTIVE_TRANSITION: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** Smooth expand/collapse for menus and overlays (FabMenu) */
export declare const EXPAND_SMOOTH: {
    damping: number;
    stiffness: number;
    overshootClamping: boolean;
};
/** Snappy expand/collapse for list items and accordions */
export declare const EXPAND_SNAPPY: {
    damping: number;
    stiffness: number;
    overshootClamping: boolean;
};
/** Pill indicator position tracking (NavigationBar) */
export declare const INDICATOR_PILL: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** Rail track width animation (NavigationRail) */
export declare const INDICATOR_RAIL: {
    damping: number;
    stiffness: number;
    mass: number;
};
export declare const M3_SPRING_MID: {
    damping: number;
    stiffness: number;
    velocity: number;
    mass: number;
    energyThreshold: number;
};
export declare const M3_SPRING_LIGHT: {
    damping: number;
    stiffness: number;
    velocity: number;
    mass: number;
    energyThreshold: number;
};
/** Badge appear/disappear */
export declare const BADGE_APPEAR: {
    damping: number;
    stiffness: number;
    mass: number;
    velocity: number;
    energyThreshold: number;
};
/** Badge dot ↔ text transition */
export declare const BADGE_TRANSITION: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** Badge content change pop */
export declare const BADGE_POP: {
    damping: number;
    stiffness: number;
    mass: number;
    velocity: number;
};
/** ButtonGroup width adjustment snap */
export declare const BUTTON_GROUP_SNAP: {
    damping: number;
    stiffness: number;
    overshootClamping: boolean;
    mass: number;
};
/** Dropdown open/close snappy curve */
export declare const DROPDOWN_SNAPPY: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** ListItem segmented border radii */
export declare const LIST_SNAPPY: {
    damping: number;
    stiffness: number;
};
/** Menu scale/opacity enter */
export declare const MENU_ENTER: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** NavItem label width expand */
export declare const NAV_LABEL_WIDTH: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** RefreshControl pull-down */
export declare const REFRESH_PULL: {
    damping: number;
    stiffness: number;
};
/** Slider position tracking */
export declare const SLIDER_POSITION: {
    damping: number;
    stiffness: number;
};
/** SplitButton rotation */
export declare const SPLIT_ROTATION: {
    damping: number;
    stiffness: number;
    mass: number;
};
/** Tab active indicator slide (M3 elastic, 250ms) */
export declare const TAB_INDICATOR: {
    duration: number;
    easing: import("react-native-reanimated").EasingFunctionFactory;
};
