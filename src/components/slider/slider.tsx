import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSchemeColors } from "../theme/m3ThemeProvider";
import { InsetIcon } from "./inset-icon";
import { StopIndicators } from "./stop-indicators";
import {
  GAP,
  SLIDER_METRICS,
  THUMB_WIDTH,
  TRACK_PADDING,
} from "./slider-constants";
import { getPositionFromValue, getValueFromPosition, snapToStep } from "./slider-utils";
import type { SliderProps, SliderSize } from "./slider.types";
import { SLIDER_POSITION } from "../../constants/animations";

export default function Slider({
  width = 250,
  height = 250,
  size = "medium",
  steps = 1,
  value,
  vertical = false,
  insetIcon,
  enableVibrations = true,
  onValueChange,
  accessibilityLabel,
}: SliderProps) {
  const colors = useSchemeColors();
  const normalizeSize = (s: any): SliderSize => {
    if (s === "S" || s === "small") return "small";
    if (s === "M" || s === "medium") return "medium";
    if (s === "L" || s === "large") return "large";
    if (s === "XS" || s === "xSmall") return "xSmall";
    if (s === "XL" || s === "xLarge") return "xLarge";
    return (SLIDER_METRICS[s as SliderSize] ? s : "medium") as SliderSize;
  };

  const metrics = SLIDER_METRICS[normalizeSize(size)] || SLIDER_METRICS.medium;

  // Track dimensions
  const length = vertical ? height : width;
  const thickness = metrics.trackHeight;

  // Shared values for gesture-driven animation
  const position = useSharedValue(getPositionFromValue(value, length, vertical));
  const isHolding = useSharedValue(false);
  const lastStepIndex = useSharedValue(
    steps > 1 ? Math.round(value * (steps - 1)) : 0
  );

  // Helper to trigger haptic feedback
  const triggerVibration = () => {
    Haptics.selectionAsync().catch(() => {});
  };

  // Animate position when external value changes (e.g. reset, programmatic update)
  useEffect(() => {
    position.value = withSpring(getPositionFromValue(value, length, vertical), SLIDER_POSITION);
    lastStepIndex.value = steps > 1 ? Math.round(value * (steps - 1)) : 0;
  }, [value, length, vertical, position, steps, lastStepIndex]);

  // Pan gesture: drag the thumb, clamp to bounds, and optionally snap to steps
  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onUpdate((e: { x: number; y: number }) => {
          'worklet';
          const coord = vertical ? e.y : e.x;
          let newPos = clamp(coord, TRACK_PADDING, length - TRACK_PADDING);

          // Snap to discrete steps (only in non-icon mode with steps > 1)
          if (steps > 1 && !insetIcon) {
            newPos = snapToStep(newPos, length, steps, vertical);

            // Calculate step index for haptics
            const activeLength = length - 2 * TRACK_PADDING;
            const intervals = steps - 1;
            const stepSize = activeLength / intervals;
            const relativePos = vertical
              ? length - TRACK_PADDING - newPos
              : newPos - TRACK_PADDING;
            const stepIndex = Math.round(relativePos / stepSize);

            if (lastStepIndex.value !== stepIndex) {
              lastStepIndex.value = stepIndex;
              if (enableVibrations) {
                runOnJS(triggerVibration)();
              }
            }
          }

          if (position.value !== newPos) {
            position.value = newPos;
            const newValue = getValueFromPosition(newPos, length, vertical);
            if (onValueChange) {
              runOnJS(onValueChange)(newValue);
            }
          }
          isHolding.value = true;
        })
        .onEnd(() => {
          'worklet';
          isHolding.value = false;
        }),
    [vertical, length, steps, insetIcon, position, onValueChange, isHolding, enableVibrations, lastStepIndex],
  );

  // --- Animated styles ---

  /** Active track fill: grows from start edge toward the thumb */
  const trackActiveStyle = useAnimatedStyle(() => {
    const size = vertical ? length - position.value : position.value;
    const dimension = Math.max(0, Math.round(size - GAP - THUMB_WIDTH / 2));
    return vertical ? { height: dimension } : { width: dimension };
  });

  /** Inactive track fill: grows from thumb toward the far edge */
  const trackInactiveStyle = useAnimatedStyle(() => {
    const size = vertical ? position.value : length - position.value;
    const dimension = Math.max(0, Math.round(size - GAP - THUMB_WIDTH / 2));
    return vertical ? { height: dimension } : { width: dimension };
  });

  /** Thumb: translates along the track and scales on press */
  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: vertical
      ? [
          { translateY: Math.round(position.value - metrics.handleWidth / 2) },
          { scaleY: withTiming(isHolding.value ? 0.6 : 1, { duration: 100 }) },
        ]
      : [
          { translateX: Math.round(position.value - metrics.handleWidth / 2) },
          { scaleX: withTiming(isHolding.value ? 0.6 : 1, { duration: 100 }) },
        ],
  }));

  // --- Layout ---

  const isVerticalMetric = vertical
    ? { height: length, width: thickness }
    : { width: length, height: thickness };

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={[styles.container, isVerticalMetric]}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel ?? "Slider"}
        accessibilityValue={{
          min: 0,
          max: 1,
          now: Math.round(value * 100) / 100,
        }}
      >
        {/* Active track (left for horizontal, bottom for vertical) */}
        <Track
          edge={vertical ? "bottom" : "left"}
          color={colors.primary}
          thickness={thickness}
          trackShape={metrics.trackShape}
          animatedStyle={trackActiveStyle}
        />

        {/* Inactive track (right for horizontal, top for vertical) */}
        <Track
          edge={vertical ? "top" : "right"}
          color={colors.secondaryContainer}
          thickness={thickness}
          trackShape={metrics.trackShape}
          animatedStyle={trackInactiveStyle}
        />

        {/* Overlay: inset icon or step indicator dots */}
        {insetIcon ? (
          <InsetIcon
            icon={insetIcon}
            colors={colors}
            width={vertical ? thickness : length}
            height={vertical ? length : thickness}
            position={position}
            offset={metrics.trackShape}
            iconSize={metrics.iconSize}
            vertical={vertical}
          />
        ) : (
          <StopIndicators
            colors={colors}
            steps={steps}
            width={vertical ? thickness : length}
            height={vertical ? length : thickness}
            position={position}
            trackPadding={TRACK_PADDING}
            vertical={vertical}
          />
        )}

        {/* Draggable thumb handle */}
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: colors.primary,
              zIndex: 20,
              ...(vertical
                ? {
                    width: metrics.handleHeight,
                    height: metrics.handleWidth,
                    borderRadius: metrics.handleWidth / 2,
                    left: (thickness - metrics.handleHeight) / 2,
                  }
                : {
                    width: metrics.handleWidth,
                    height: metrics.handleHeight,
                    borderRadius: metrics.handleWidth / 2,
                    top: (thickness - metrics.handleHeight) / 2,
                  }),
            },
            thumbAnimatedStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}

// ─── Internal sub-components ────────────────────────────────────────────────

interface TrackProps {
  edge: "left" | "right" | "top" | "bottom";
  color: string;
  thickness: number;
  trackShape: number;
  animatedStyle: any;
}

/** Renders a rounded track segment anchored to one edge of the container. */
function Track({ edge, color, thickness, trackShape, animatedStyle }: TrackProps) {
  const isVertical = edge === "top" || edge === "bottom";
  const edgeType = isVertical ? "top-bottom" : "left-right";
  const isStart = edge === "left" || edge === "bottom";

  const borderRadius = (() => {
    if (edgeType === "top-bottom") {
      return isStart
        ? { borderBottomLeftRadius: trackShape, borderBottomRightRadius: trackShape }
        : { borderTopLeftRadius: trackShape, borderTopRightRadius: trackShape };
    }
    return isStart
      ? { borderTopLeftRadius: trackShape, borderBottomLeftRadius: trackShape }
      : { borderTopRightRadius: trackShape, borderBottomRightRadius: trackShape };
  })();

  const dimensionStyle = isVertical
    ? { width: thickness }
    : { height: thickness };

  const edgeStyle =
    edge === "left" ? { left: 0 }
    : edge === "right" ? { right: 0 }
    : edge === "top" ? { top: 0 }
    : { bottom: 0 };

  return (
    <Animated.View
      style={[
        styles.track,
        edgeStyle,
        dimensionStyle,
        { backgroundColor: color, ...borderRadius },
        animatedStyle,
      ]}
    />
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    position: "relative",
  },
  track: {
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
