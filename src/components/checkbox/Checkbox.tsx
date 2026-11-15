import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Pressable from "../pressable/Pressable";
import { useMaterialColors, useSchemeColors } from "../theme/m3ThemeProvider";
import type {
  CheckboxProps,
  CheckboxShape,
  CheckboxSize,
} from "./Checkbox.types";
import { PRESS_SCALE_SHARP } from "../../constants/animations";

const SIZE_MAP: Record<CheckboxSize, number> = {
  small: 20,
  medium: 24,
  large: 32,
};

const ICON_SIZE_MAP: Record<CheckboxSize, number> = {
  small: 14,
  medium: 18,
  large: 24,
};

const BORDER_WIDTH_MAP: Record<CheckboxSize, number> = {
  small: 2,
  medium: 2,
  large: 3,
};

const Checkbox = ({
  checked,
  onChange,
  size = "medium",
  shape = "rounded",
  indeterminate = false,
  disabled = false,
  icon,
  accessibilityLabel,
  style,
  ...restProps
}: CheckboxProps) => {
  const colors = useSchemeColors();
  const { shape: shapeTokens } = useMaterialColors();
  const boxSize = SIZE_MAP[size];
  const iconSize = ICON_SIZE_MAP[size];
  const borderWidth = BORDER_WIDTH_MAP[size];

  const isChecked = checked || indeterminate;
  const checkedSV = useSharedValue(isChecked ? 1 : 0);
  const pressScale = useSharedValue(1);

  React.useEffect(() => {
    checkedSV.value = withSpring(isChecked ? 1 : 0, {
      damping: 25,
      stiffness: 500,
      mass: 0.5,
      overshootClamping: true,
    });
  }, [isChecked]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      checkedSV.value,
      [0, 1],
      [colors.surfaceVariant, colors.primary],
    ),
    borderColor: interpolateColor(
      checkedSV.value,
      [0, 1],
      [colors.onSurfaceVariant, colors.primary],
    ),
    transform: [{ scale: pressScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: checkedSV.value,
    transform: [{ scale: checkedSV.value }],
  }));

  const borderRadius = shape === "circle" ? 9999 : shapeTokens.extraSmall;

  const handlePressIn = () => {
    pressScale.value = withSpring(0.92, PRESS_SCALE_SHARP);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, PRESS_SCALE_SHARP);
  };

  const iconName = indeterminate ? "remove" : (icon ?? "check");
  const showIcon = checked || indeterminate;

  return (
    <Pressable
      {...restProps}
      onPress={() => onChange(!checked)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole={restProps.accessibilityRole ?? "checkbox"}
      accessibilityLabel={accessibilityLabel ?? "Checkbox"}
      accessibilityState={{ checked, disabled, ...restProps.accessibilityState }}
      rippleColor={colors.primary}
      borderRadius={borderRadius}
    >
      <Animated.View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            borderRadius,
            borderWidth,
            opacity: disabled ? 0.38 : 1,
          },
          animatedStyle,
          style,
        ]}
      >
        {showIcon && (
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <MaterialIcons
              name={iconName as any}
              size={iconSize}
              color={colors.onPrimary}
            />
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export type { CheckboxProps, CheckboxShape, CheckboxSize };
export default Checkbox;

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
