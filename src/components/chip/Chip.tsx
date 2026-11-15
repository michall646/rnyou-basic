import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Pressable from "../pressable/Pressable";
import { AnimatedText } from "../text/Text";
import { useMaterialColors, useSchemeColors } from "../theme/m3ThemeProvider";
import type { ChipProps, ChipVariant } from "./Chip.types";
import { PRESS_SCALE } from "../../constants/animations";

const Chip: React.FC<ChipProps> = ({
  label,
  children,
  variant = "assist",
  selected = false,
  disabled = false,
  labelVariant = "labelLarge",
  labelFamily,
  labelWeight,
  onPress,
  leadingIcon,
  selectedLeadingIcon,
  trailingIcon,
  selectedTrailingIcon,
  style,
  labelStyle,
  accessibilityLabel,
  ...restProps
}) => {
  const colors = useSchemeColors();
  const { shape } = useMaterialColors();
  const isSelected = selected && (variant === "filter" || variant === "input");

  const scale = useSharedValue(1);
  const selectedSV = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    selectedSV.value = withTiming(isSelected ? 1 : 0, { duration: 150 });
  }, [isSelected]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      selectedSV.value,
      [0, 1],
      [colors.surfaceContainerLow, colors.secondaryContainer],
    ),
    borderColor: interpolateColor(
      selectedSV.value,
      [0, 1],
      [colors.outlineVariant, "transparent"],
    ),
    transform: [{ scale: scale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      selectedSV.value,
      [0, 1],
      [colors.onSurfaceVariant, colors.onSecondaryContainer],
    ),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(1.03, PRESS_SCALE);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, PRESS_SCALE);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { borderWidth: 1, borderRadius: shape.small },
        containerStyle,
        style,
      ]}
    >
      <Pressable
        {...restProps}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole={restProps.accessibilityRole ?? "button"}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ selected: isSelected, disabled, ...restProps.accessibilityState }}
        rippleColor={colors.onSurface}
        style={styles.pressable}
      >
        {children ? (
          children
        ) : (
          <>
            {leadingIcon || selectedLeadingIcon ? (
              <View style={styles.leadingIconContainer}>
                <MaterialIcons
                  name={(isSelected && selectedLeadingIcon ? selectedLeadingIcon : leadingIcon) as any}
                  size={18}
                  color={colors.primary}
                />
              </View>
            ) : null}
            <AnimatedText
              variant={labelVariant}
              family={labelFamily}
              weight={labelWeight}
              style={[
                textAnimatedStyle,
                {
                  marginLeft: leadingIcon ? 8 : 14,
                  marginRight: trailingIcon ? 8 : 14,
                },
                labelStyle,
              ]}
            >
              {label}
            </AnimatedText>
            {trailingIcon || selectedTrailingIcon ? (
              <View style={styles.trailingIconContainer}>
                <MaterialIcons
                  name={(isSelected && selectedTrailingIcon ? selectedTrailingIcon : trailingIcon) as any}
                  size={18}
                  color={colors.primary}
                />
              </View>
            ) : null}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

export type { ChipProps, ChipVariant };
export default Chip;

const styles = StyleSheet.create({
  container: {
    height: 32,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  pressable: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leadingIconContainer: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  trailingIconContainer: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  disabled: { opacity: 0.38 },
});
