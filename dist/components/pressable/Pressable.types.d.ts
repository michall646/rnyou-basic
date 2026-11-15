import type { ReactNode } from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
export interface MD3PressableProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    rippleColor?: string;
    rippleOpacity?: number;
    rippleDuration?: number;
    onPress?: (event?: GestureResponderEvent) => void;
    onLongPress?: (event?: GestureResponderEvent) => void;
    onPressOut?: (event?: GestureResponderEvent) => void;
    onPressIn?: (event?: GestureResponderEvent) => void;
    disabled?: boolean;
    forceRipple?: boolean;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    [key: string]: any;
}
