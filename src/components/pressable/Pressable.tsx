import React, { forwardRef, useCallback, useRef, useState } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable as RNPressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { MD3PressableProps } from "./Pressable.types";

const RIPPLE_BASE_SIZE = 100;
const RIPPLE_BASE_RADIUS = RIPPLE_BASE_SIZE / 2;

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

interface RippleCircleProps {
  x: number;
  y: number;
  color: string;
  opacity: number;
  duration: number;
  containerWidth: number;
  containerHeight: number;
  onComplete: () => void;
}

const distanceTo = (x1: number, y1: number, x2: number, y2: number): number => {
  "worklet";
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

const getFarthestCornerDistance = (
  x: number,
  y: number,
  width: number,
  height: number,
): number => {
  "worklet";
  const topLeft = distanceTo(x, y, 0, 0);
  const topRight = distanceTo(x, y, width, 0);
  const bottomLeft = distanceTo(x, y, 0, height);
  const bottomRight = distanceTo(x, y, width, height);
  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
};

const RippleCircle = ({
  x,
  y,
  color,
  opacity: rippleOpacity,
  duration,
  containerWidth,
  containerHeight,
  onComplete,
}: RippleCircleProps) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(
      1,
      { duration, easing: Easing.out(Easing.ease) },
      (finished) => {
        if (finished) runOnJS(onComplete)();
      },
    );

    return () => {
      cancelAnimation(progress);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const maxDistance = getFarthestCornerDistance(
      x,
      y,
      containerWidth,
      containerHeight,
    );
    const targetScale = Math.max(maxDistance / RIPPLE_BASE_RADIUS, 0.01);
    const scale = interpolate(progress.value, [0, 1], [0, targetScale]);
    const opacity = interpolate(
      progress.value,
      [0, 0.66, 1],
      [rippleOpacity, rippleOpacity, 0],
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ripple,
        {
          left: x - RIPPLE_BASE_RADIUS,
          top: y - RIPPLE_BASE_RADIUS,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
};

const Pressable = forwardRef<View, MD3PressableProps>(
  (
    {
      children,
      style,
      rippleColor = "#000000",
      rippleOpacity = 0.12,
      rippleDuration = 400,
      onPress,
      onLongPress,
      onPressOut,
      onPressIn,
      disabled,
      forceRipple = false,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      ...rest
    },
    ref,
  ) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [ripples, setRipples] = useState<RippleItem[]>([]);
    const uniqueIdRef = useRef(0);

    const isRippleEnabled =
      !disabled && (forceRipple || !!onPress || !!onLongPress);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setContainerSize({ width, height });
    }, []);

    const removeRipple = useCallback((id: number) => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, []);

    const startRipple = useCallback(
      (event: GestureResponderEvent) => {
        if (!isRippleEnabled) return;

        const { locationX, locationY } = event.nativeEvent;
        const x =
          typeof locationX === "number" ? locationX : containerSize.width / 2;
        const y =
          typeof locationY === "number"
            ? locationY
            : containerSize.height / 2;
        const id = uniqueIdRef.current++;

        setRipples((prev) => [...prev, { id, x, y }]);
      },
      [isRippleEnabled, containerSize.width, containerSize.height],
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        startRipple(event);
        onPressIn?.(event);
      },
      [startRipple, onPressIn],
    );

    const borderRadiusStyle = {
      ...(borderRadius !== undefined && { borderRadius }),
      ...(borderTopLeftRadius !== undefined && { borderTopLeftRadius }),
      ...(borderTopRightRadius !== undefined && { borderTopRightRadius }),
      ...(borderBottomLeftRadius !== undefined && { borderBottomLeftRadius }),
      ...(borderBottomRightRadius !== undefined && { borderBottomRightRadius }),
    };

    const containerStyle = [
      styles.container,
      style,
      borderRadiusStyle,
    ];

    return (
      <RNPressable
        ref={ref}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        onLayout={handleLayout}
        style={containerStyle}
        {...rest}
      >
        {children}
        {ripples.map((ripple) => (
          <RippleCircle
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            color={rippleColor}
            opacity={isRippleEnabled ? rippleOpacity : 0}
            duration={rippleDuration}
            containerWidth={containerSize.width}
            containerHeight={containerSize.height}
            onComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </RNPressable>
    );
  },
);

Pressable.displayName = "Pressable";

export default Pressable;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  ripple: {
    position: "absolute",
    width: RIPPLE_BASE_SIZE,
    height: RIPPLE_BASE_SIZE,
    borderRadius: RIPPLE_BASE_RADIUS,
  },
});
