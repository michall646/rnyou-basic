import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useMaskAnimation } from "./use-mask-animation";
import type { InsetIconProps } from "./slider.types";

/**
 * Inset icon overlay that renders a Material Icon pinned to the track edge.
 *
 * The icon is duplicated and masked on each side of the thumb:
 * - Left/bottom side: colored with `colors.onPrimary` (appears on the active track)
 * - Right/top side: colored with `colors.primary` (appears on the inactive track)
 */
export function InsetIcon({
  icon,
  colors,
  width,
  height,
  position,
  offset,
  iconSize,
  vertical,
}: InsetIconProps) {
  const length = vertical ? height : width;
  const { mask1Style, mask2Style, inner1Style, inner2Style } = useMaskAnimation(
    position,
    length,
    vertical,
  );

  return (
    <View
      style={[StyleSheet.absoluteFill, { width, height, zIndex: 10 }]}
      pointerEvents="none"
    >
      {/* Active side (onPrimary color) */}
      <Animated.View style={[styles.mask, mask1Style]}>
        <Animated.View style={[{ width, height }, inner1Style]}>
          {renderIcon(icon, iconSize, colors.onPrimary, width, height, vertical, offset)}
        </Animated.View>
      </Animated.View>

      {/* Inactive side (primary color) */}
      <Animated.View style={[styles.mask, mask2Style]}>
        <Animated.View style={[{ width, height }, inner2Style]}>
          {renderIcon(icon, iconSize, colors.primary, width, height, vertical, offset)}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function renderIcon(
  name: InsetIconProps["icon"],
  size: number,
  color: string,
  width: number,
  height: number,
  vertical: boolean,
  offset: number,
) {
  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          position: "absolute",
          ...(vertical ? { bottom: offset } : { left: offset }),
        }}
      >
        <MaterialIcons name={name} size={size} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mask: {
    position: "absolute",
    overflow: "hidden",
  },
});
