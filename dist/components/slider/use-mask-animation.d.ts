import { SharedValue } from "react-native-reanimated";
/**
 * Shared animated mask-clip logic for overlay content (icons or dot indicators)
 * that sits on top of the slider track.
 *
 * Creates two animated mask views that clip content on each side of the thumb,
 * along with inner translations to keep the content visually pinned in place
 * as the masks expand/contract.
 *
 * Mask 1: clips from the start edge toward the thumb (shows e.g. onPrimary colored dots)
 * Mask 2: clips from the thumb toward the far edge (shows e.g. primary colored dots)
 *
 * @param position  SharedValue tracking the thumb position in pixels
 * @param length    Total track length in pixels
 * @param vertical  Whether the slider is vertical
 */
export declare function useMaskAnimation(position: SharedValue<number>, length: number, vertical: boolean): {
    mask1Style: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<{
        top?: number | undefined;
    }>;
    mask2Style: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<{
        left?: number | undefined;
    }>;
    inner1Style: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<{
        transform: {
            translateY: number;
        }[];
    }>;
    inner2Style: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<{
        transform: {
            translateX: number;
        }[];
    }>;
};
