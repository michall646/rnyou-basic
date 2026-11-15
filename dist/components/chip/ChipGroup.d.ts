import React from "react";
import { ViewStyle } from "react-native";
import { ChipVariant } from "./Chip";
import type { IconName } from "../../types/icons";
export interface ChipGroupItem {
    label: string;
    value: string;
    leadingIcon?: IconName;
    trailingIcon?: IconName;
    disabled?: boolean;
}
export interface ChipGroupProps {
    /** Array of items to display in the chip group */
    data: readonly ChipGroupItem[];
    /** Variant of the chips in the group */
    variant?: ChipVariant;
    /** Array of currently selected values */
    selectedValues?: string[];
    /** Callback triggered when selection changes */
    onSelectionChange?: (values: string[]) => void;
    /** Whether multiple chips can be selected at once */
    multiSelect?: boolean;
    /** Optional style for the group container */
    style?: ViewStyle;
}
/**
 * A group of Chips that handles selection logic.
 */
declare const ChipGroup: React.FC<ChipGroupProps & {
    children?: React.ReactNode;
}>;
export default ChipGroup;
