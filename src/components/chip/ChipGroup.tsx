import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Chip, { ChipVariant } from "./Chip";
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
const ChipGroup: React.FC<ChipGroupProps & { children?: React.ReactNode }> = ({
  data = [],
  variant = "filter",
  selectedValues = [],
  onSelectionChange,
  multiSelect = false,
  style,
  children,
}) => {
  const handlePress = (value: string) => {
    if (!onSelectionChange) return;

    if (multiSelect) {
      if (selectedValues.includes(value)) {
        onSelectionChange(selectedValues.filter((v) => v !== value));
      } else {
        onSelectionChange([...selectedValues, value]);
      }
    } else {
      // For single select, clicking the same chip again deselects it
      if (selectedValues.includes(value)) {
        onSelectionChange([]);
      } else {
        onSelectionChange([value]);
      }
    }
  };

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="list"
      accessibilityLabel={variant === "filter" ? "Filter options" : "Options"}
    >
      {data?.map((item) => (
        <Chip
          key={item.value}
          label={item.label}
          variant={variant}
          selected={selectedValues.includes(item.value)}
          disabled={item.disabled}
          onPress={() => handlePress(item.value)}
          leadingIcon={item.leadingIcon}
          trailingIcon={item.trailingIcon}
        />
      ))}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 8,
  },
});

export default ChipGroup;
