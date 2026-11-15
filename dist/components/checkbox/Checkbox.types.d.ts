import { PressableProps, StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../types/icons";
export type CheckboxSize = "small" | "medium" | "large";
export type CheckboxShape = "rounded" | "circle";
export interface CheckboxProps extends Omit<PressableProps, "style" | "onChange"> {
    checked: boolean;
    onChange: (newVal: boolean) => void;
    size?: CheckboxSize;
    shape?: CheckboxShape;
    indeterminate?: boolean;
    disabled?: boolean;
    icon?: IconName;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
