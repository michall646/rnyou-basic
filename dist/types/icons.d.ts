import React, { type ComponentProps } from "react";
import { MaterialIcons } from "@expo/vector-icons";
export type IconName = ComponentProps<typeof MaterialIcons>["name"];
export type IconProp = IconName | React.ReactNode;
export declare function renderIcon(icon: IconProp | undefined | null, size: number, color: string): React.ReactNode | null;
