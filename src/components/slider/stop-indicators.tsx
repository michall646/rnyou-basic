import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import { DOT_SIZE, TRACK_PADDING } from "./slider-constants";
import { useMaskAnimation } from "./use-mask-animation";
import type { StopIndicatorsProps, DotProps } from "./slider.types";

/**
 * Step-indicator dots overlay that appears along the slider track.
 *
 * Dots are duplicated and masked on each side of the thumb:
 * - Active side: colored with `colors.onPrimary`
 * - Inactive side: colored with `colors.primary`
 *
 * The dot at the current thumb position is hidden (opacity → 0).
 * Hidden when `steps < 2`.
 */
export function StopIndicators({
  colors,
  steps,
  width,
  height,
  position,
  trackPadding,
  vertical,
}: StopIndicatorsProps) {
  const length = vertical ? height : width;
  const activeLength = length - 2 * trackPadding;
  const stepSize = steps > 1 ? activeLength / (steps - 1) : 0;

  const currentIndex = useDerivedValue(() => {
    const relativePos = vertical
      ? height - trackPadding - position.value
      : position.value - trackPadding;
    return Math.round(relativePos / stepSize);
  });

  const { mask1Style, mask2Style, inner1Style, inner2Style } = useMaskAnimation(
    position,
    length,
    vertical,
  );

  if (steps < 2) return null;

  const dots = Array.from<undefined>({ length: steps });

  return (
    <View
      style={[StyleSheet.absoluteFill, { width, height, zIndex: 10 }]}
      pointerEvents="none"
    >
      {/* Active side (onPrimary colored dots) */}
      <Animated.View style={[styles.mask, mask1Style]}>
        <Animated.View style={[{ width, height }, inner1Style]}>
          {renderDots(dots, currentIndex, colors.onPrimary, length, stepSize, vertical)}
        </Animated.View>
      </Animated.View>

      {/* Inactive side (primary colored dots) */}
      <Animated.View style={[styles.mask, mask2Style]}>
        <Animated.View style={[{ width, height }, inner2Style]}>
          {renderDots(dots, currentIndex, colors.primary, length, stepSize, vertical)}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function renderDots(
  dots: undefined[],
  currentIndex: SharedValue<number>,
  color: string,
  length: number,
  stepSize: number,
  vertical: boolean,
) {
  return (
    <View style={[vertical ? styles.dotsColumn : styles.dotsRow, { width: "100%", height: "100%" }]}>
      {dots.map((_, i) => (
        <DotStep
          key={i}
          index={i}
          currentIndex={currentIndex}
          color={color}
          dotPosition={
            vertical
              ? length - (TRACK_PADDING + i * stepSize)
              : TRACK_PADDING + i * stepSize
          }
          vertical={vertical}
        />
      ))}
    </View>
  );
}

/**
 * A single step indicator dot. Hides itself (opacity → 0) when it matches
 * the current step index (the thumb covers it).
 */
function DotStep({ index, currentIndex, color, dotPosition, vertical }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: currentIndex.value === index ? 0 : 1,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          backgroundColor: color,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          ...(vertical
            ? { left: "50%", marginLeft: -DOT_SIZE / 2, top: dotPosition - DOT_SIZE / 2 }
            : { top: "50%", marginTop: -DOT_SIZE / 2, left: dotPosition - DOT_SIZE / 2 }),
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  mask: {
    position: "absolute",
    overflow: "hidden",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotsColumn: {
    flexDirection: "column",
    alignItems: "center",
  },
});
