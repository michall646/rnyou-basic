import React from "react";
import type { ButtonProps, MaterialIconName } from "./Button.types";
declare const Button: ({ label, children, leftIcon, rightIcon, isActive, isDisabled, disabled: propsDisabled, isLoading, onPress, onLongPress, onPressIn: onPressInProp, onPressOut: onPressOutProp, variant, size, toggle, shape, fullWidth, expandOnPress, isGrouped, labelVariant, labelFamily, labelWeight, style, contentStyle, labelStyle, flex, accessibilityLabel, ...restProps }: ButtonProps) => React.JSX.Element;
export type { ButtonProps, MaterialIconName };
export default Button;
