import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { TypographyVariant } from "../theme/types/theme";
import type { FontWeight } from "../theme/types/font";
declare const Text: React.ForwardRefExoticComponent<RNTextProps & {
    variant?: TypographyVariant;
    children?: React.ReactNode;
    color?: string;
    centerVertical?: boolean;
    family?: string;
    weight?: FontWeight;
} & React.RefAttributes<RNText>>;
export declare const AnimatedText: import("react-native-reanimated/lib/typescript/createAnimatedComponent").AnimatedComponentType<Readonly<RNTextProps & {
    variant?: TypographyVariant;
    children?: React.ReactNode;
    color?: string;
    centerVertical?: boolean;
    family?: string;
    weight?: FontWeight;
} & React.RefAttributes<RNText>>, React.ForwardRefExoticComponent<RNTextProps & {
    variant?: TypographyVariant;
    children?: React.ReactNode;
    color?: string;
    centerVertical?: boolean;
    family?: string;
    weight?: FontWeight;
} & React.RefAttributes<RNText>>>;
export default Text;
