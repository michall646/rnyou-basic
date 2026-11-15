import React from "react";
import { StyleProp, ViewStyle, PressableProps } from "react-native";
interface SwitchProps extends Omit<PressableProps, "style" | "onChange"> {
    value: boolean;
    onChange: (newVal: boolean) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    accessibilityLabel?: string;
}
declare const Switch: ({ value, onChange, disabled, style, accessibilityLabel, ...restProps }: SwitchProps) => React.JSX.Element;
export default Switch;
