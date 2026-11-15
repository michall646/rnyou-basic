import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSchemeColors } from "../theme/m3ThemeProvider";
import Pressable from "../pressable/Pressable";

const TRACK_WIDTH = 68;
const TRACK_HEIGHT = 36;
const THUMB_SIZE = 24;
const THUMB_MARGIN = 4;
const BORDER_WIDTH = 3;

const TRANSLATE_X_DISTANCE =
  TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2 - BORDER_WIDTH * 2;

const TIMING = { duration: 100 };

interface SwitchProps extends Omit<PressableProps, "style" | "onChange"> {
  value: boolean;
  onChange: (newVal: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const Switch = ({
  value,
  onChange,
  disabled = false,
  style,
  accessibilityLabel,
  ...restProps
}: SwitchProps) => {
  const colors = useSchemeColors();

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      value ? colors.primary : colors.surfaceVariant,
      TIMING,
    ),
    borderColor: withTiming(value ? colors.primary : colors.outline, TIMING),
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(value ? TRANSLATE_X_DISTANCE : 0, TIMING),
      },
      {
        scale: withTiming(value ? 1 : 0.8, TIMING),
      },
    ],
    backgroundColor: withTiming(
      value ? colors.onPrimary : colors.outline,
      TIMING,
    ),
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(value ? 1 : 0, TIMING),
    transform: [{ scale: withSpring(value ? 1 : 0.5) }],
  }));

  return (
    <Pressable
      {...restProps}
      onPress={() => onChange(!value)}
      disabled={disabled}
      accessibilityRole={restProps.accessibilityRole ?? "switch"}
      accessibilityLabel={accessibilityLabel ?? "Switch"}
      accessibilityState={{ checked: value, disabled, ...restProps.accessibilityState }}
      rippleColor={colors.onPrimary}
      style={style}
    >
      <Animated.View
        style={[styles.track, disabled && styles.disabledTrack, animatedTrackStyle]}
        pointerEvents="none"
      >
        <Animated.View style={[styles.thumb, animatedThumbStyle]}>
          <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
            <MaterialIcons name="check" size={16} color={colors.primary} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default Switch;

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    borderWidth: BORDER_WIDTH,
    padding: THUMB_MARGIN,
    justifyContent: "center",
  },
  disabledTrack: {
    opacity: 0.38,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
