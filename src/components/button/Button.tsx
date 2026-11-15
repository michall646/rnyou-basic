import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, GestureResponderEvent, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Pressable from "../pressable/Pressable";
import Text from "../text/Text";
import { getButtonStyleState, sizeStyles } from "../theme/buttonStyles";
import type { ButtonStyleVariant } from "../theme/buttonStyles";
import { useSchemeColors, useMaterialColors } from "../theme/m3ThemeProvider";
import type { ButtonProps, MaterialIconName } from "./Button.types";
import { PRESS_SCALE, ACTIVE_TRANSITION } from "../../constants/animations";
import { renderIcon } from "../../types/icons";

const Button = ({
  label,
  children,
  leftIcon,
  rightIcon,
  isActive = false,
  isDisabled = false,
  disabled: propsDisabled,
  isLoading = false,
  onPress,
  onLongPress,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  variant = "filled",
  size = "medium",
  toggle = false,
  shape = "round",
  fullWidth = false,
  expandOnPress = false,
  isGrouped = false,
  labelVariant = "labelLarge",
  labelFamily,
  labelWeight,
  style,
  contentStyle,
  labelStyle,
  flex,
  accessibilityLabel,
  ...restProps
}: ButtonProps) => {
  const colors = useSchemeColors();
  const { shape: shapeTokens } = useMaterialColors();
  const disabled = isDisabled || propsDisabled || isLoading;

  const metrics =
    sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium;
  const defaultRadius =
    shape === "square" ? shapeTokens.medium : shapeTokens.full;
  const shapeSmall = shapeTokens.small;

  const isPressed = useSharedValue(false);

  const activeProgress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    activeProgress.value = withSpring(isActive ? 1 : 0, ACTIVE_TRANSITION);
  }, [isActive]);

  const isToggleMode = toggle || isGrouped;

  const resolvedVariant = useMemo(() => {
    if (isToggleMode && variant === "filled") {
      return isActive ? "filled" : "tonal";
    }
    return variant;
  }, [variant, isToggleMode, isActive]);

  const styleState = useMemo(
    () => {
      const effectiveActive = isToggleMode ? false : isActive;
      return getButtonStyleState(colors, disabled, effectiveActive, resolvedVariant as ButtonStyleVariant);
    },
    [colors, disabled, isActive, resolvedVariant, isToggleMode],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const activeRadius = Math.max(shapeSmall, defaultRadius - 8);
    const currentRadius = interpolate(
      activeProgress.value,
      [0, 1],
      [defaultRadius, activeRadius],
    );

    const extraPadding = expandOnPress && isPressed.value ? 8 : 0;

    const styles: any = {
      borderRadius: currentRadius,
      paddingHorizontal: extraPadding,
      transform: [
        {
          scale: withSpring(isPressed.value && !expandOnPress ? 0.98 : 1, PRESS_SCALE),
        },
      ],
    };

    if (flex !== undefined) {
      styles.flex = flex;
    }

    return styles;
  }, [defaultRadius, flex, expandOnPress, isActive]);

  const renderButtonIcon = (
    name: string | undefined,
    isLeading: boolean,
  ) => {
    if (
      isLoading &&
      ((isLeading && !rightIcon) || (!isLeading && !leftIcon && rightIcon))
    ) {
      return (
        <ActivityIndicator
          size={metrics.iconSize}
          color={styleState.iconColor}
        />
      );
    }
    return renderIcon(name, metrics.iconSize, styleState.iconColor);
  };

  const hasLeftIcon = leftIcon || (isLoading && !rightIcon);
  const hasRightIcon = rightIcon || (isLoading && !leftIcon && rightIcon);
  const paddingLeft = hasLeftIcon
    ? metrics.paddingHorizontal - 8
    : metrics.paddingHorizontal;
  const paddingRight = hasRightIcon
    ? metrics.paddingHorizontal - 8
    : metrics.paddingHorizontal;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          backgroundColor: styleState.backgroundColor,
          borderColor: styleState.borderColor,
          borderWidth: styleState.borderWidth,
          height: metrics.height,
          elevation: styleState.elevation,
        },
        fullWidth && styles.fullWidth,
        isGrouped && styles.grouped,
        !isGrouped && flex !== undefined && { flex },
        style,
        animatedStyle,
      ]}
    >
      <Pressable
        {...restProps}
        disabled={disabled}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityRole={restProps.accessibilityRole ?? "button"}
        accessibilityLabel={accessibilityLabel ?? label ?? "Button"}
        accessibilityState={{ disabled, ...restProps.accessibilityState }}
        onPressIn={(event: GestureResponderEvent) => {
          isPressed.value = true;
          if (onPressInProp) onPressInProp(event);
        }}
        onPressOut={(event: GestureResponderEvent) => {
          isPressed.value = false;
          if (onPressOutProp) onPressOutProp(event);
        }}
        rippleColor={styleState.rippleColor}
        style={styles.pressable}
      >
        <View
          style={[
            styles.container,
            { paddingLeft, paddingRight },
            contentStyle,
          ]}
        >
          {children ? (
            children
          ) : (
            <>
              {renderButtonIcon(leftIcon, true)}
              {label && (
                <Text
                  variant={labelVariant}
                  family={labelFamily}
                  weight={labelWeight}
                  numberOfLines={1}
                  style={[
                    styles.label,
                    {
                      color: styleState.textColor,
                      fontSize: metrics.fontSize,
                      fontWeight: "500",
                      marginLeft: hasLeftIcon ? metrics.labelMargin : 0,
                      marginRight: hasRightIcon ? metrics.labelMargin : 0,
                    },
                    labelStyle,
                  ]}
                >
                  {label}
                </Text>
              )}
              {renderButtonIcon(rightIcon, false)}
            </>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export type { ButtonProps, MaterialIconName };
export default Button;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  grouped: {
    alignSelf: "auto",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    maxWidth: "100%",
  },
  label: {
    textAlign: "center",
    flexShrink: 1,
  },
});
