import React from "react";
import { Platform, Text as RNText, TextProps as RNTextProps } from "react-native";
import Animated from "react-native-reanimated";
import { TypographyVariant } from "../theme/types/theme";
import { useMaterialColors } from "../theme/m3ThemeProvider";
import type { FontWeight } from "../theme/types/font";

type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  children?: React.ReactNode;
  color?: string;
  centerVertical?: boolean;
  family?: string;
  weight?: FontWeight;
};

const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      variant = 'bodyMedium',
      children,
      style,
      color,
      centerVertical,
      family,
      weight,
      ...props
    },
    ref,
  ) => {
    const theme = useMaterialColors();

    const variantStyle = theme.typography[variant];

    const fontFamily = family ?? variantStyle.fontFamily;
    const fontWeight = weight ?? variantStyle.fontWeight;

    const isHeader = variant.startsWith("display") || variant.startsWith("headline") || variant.startsWith("title");

    const combinedStyle = [
      variantStyle,
      {
        fontFamily,
        fontWeight,
        color: color || theme.onSurface,
        includeFontPadding: false,
        textAlignVertical: 'center' as const,
      },
      centerVertical &&
        Platform.select({
          web: {
            lineHeight: undefined,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          default: {
            lineHeight: undefined,
            textAlignVertical: "center",
          },
        }),
      style,
    ];

    return (
      <Animated.Text
        ref={ref as any}
        accessibilityRole={isHeader ? "header" : "text"}
        style={combinedStyle as any}
        {...props}
      >
        {children}
      </Animated.Text>
    );
  },
);

Text.displayName = "Text";

export const AnimatedText = Animated.createAnimatedComponent(Text);

export default Text;
