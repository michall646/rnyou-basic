import React from "react";
import { View } from "react-native";
import type { MD3PressableProps } from "./Pressable.types";
declare const Pressable: React.ForwardRefExoticComponent<Omit<MD3PressableProps, "ref"> & React.RefAttributes<View>>;
export default Pressable;
