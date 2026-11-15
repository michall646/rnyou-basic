import { PressableProps, StyleProp, ViewStyle, TextStyle } from "react-native";
import type { TypographyVariant } from "../theme/types/theme";
import type { FontWeight } from "../theme/types/typography";
import type { IconName } from "../../types/icons";
export type ChipVariant = "assist" | "filter" | "input" | "suggestion";
export interface ChipProps extends Omit<PressableProps, "style" | "onPress"> {
    label?: string;
    children?: React.ReactNode;
    variant?: ChipVariant;
    selected?: boolean;
    disabled?: boolean;
    labelVariant?: TypographyVariant;
    labelFamily?: string;
    labelWeight?: FontWeight;
    onPress?: () => void;
    leadingIcon?: IconName;
    /** Leading icon shown when the chip is selected. Falls back to `leadingIcon` when omitted. */
    selectedLeadingIcon?: IconName;
    trailingIcon?: IconName;
    /** Trailing icon shown when the chip is selected. Falls back to `trailingIcon` when omitted. */
    selectedTrailingIcon?: IconName;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    accessibilityLabel?: string;
}
