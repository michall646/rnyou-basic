import type { MaterialColors } from "./types/theme";
export type ButtonStyleVariant = "filled" | "tonal" | "outlined" | "elevated" | "text";
export type ButtonStyleState = {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    textColor: string;
    iconColor: string;
    rippleColor: string;
    elevation: number;
};
export declare const getButtonBackgroundColor: (colors: MaterialColors, active: boolean, variant: ButtonStyleVariant, disabled: boolean) => string;
export declare const getButtonBorderColor: (colors: MaterialColors, active: boolean, variant: ButtonStyleVariant, disabled: boolean) => string;
export declare const getButtonBorderWidth: (variant: ButtonStyleVariant, disabled: boolean) => 0 | 1;
export declare const getButtonTextColor: (colors: MaterialColors, active: boolean, variant: ButtonStyleVariant, disabled: boolean) => string;
export declare const getButtonIconColor: (colors: MaterialColors, active: boolean, variant: ButtonStyleVariant, disabled: boolean) => string;
export declare const iconSize: {
    small: number;
    medium: number;
    large: number;
};
export declare const getButtonRippleColor: (colors: MaterialColors, active: boolean, variant: ButtonStyleVariant, disabled: boolean) => string;
export declare const getButtonElevation: (variant: ButtonStyleVariant, disabled: boolean, active: boolean) => 2 | 0 | 1;
export declare const sizeStyles: {
    xSmall: {
        height: number;
        paddingHorizontal: number;
        fontSize: number;
        iconSize: number;
        labelMargin: number;
    };
    small: {
        height: number;
        paddingHorizontal: number;
        fontSize: number;
        iconSize: number;
        labelMargin: number;
    };
    medium: {
        height: number;
        paddingHorizontal: number;
        fontSize: number;
        iconSize: number;
        labelMargin: number;
    };
    large: {
        height: number;
        paddingHorizontal: number;
        fontSize: number;
        iconSize: number;
        labelMargin: number;
    };
    xLarge: {
        height: number;
        paddingHorizontal: number;
        fontSize: number;
        iconSize: number;
        labelMargin: number;
    };
};
export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export declare const getIconButtonStyles: (colors: MaterialColors, variant: IconButtonVariant, active: boolean, disabled: boolean) => ButtonStyleState;
export declare const getButtonStyleState: (colors: MaterialColors, disabled: boolean, active: boolean, variant: ButtonStyleVariant) => ButtonStyleState;
