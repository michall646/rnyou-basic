"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const Chip_1 = __importDefault(require("./Chip"));
/**
 * A group of Chips that handles selection logic.
 */
const ChipGroup = ({ data = [], variant = "filter", selectedValues = [], onSelectionChange, multiSelect = false, style, children, }) => {
    const handlePress = (value) => {
        if (!onSelectionChange)
            return;
        if (multiSelect) {
            if (selectedValues.includes(value)) {
                onSelectionChange(selectedValues.filter((v) => v !== value));
            }
            else {
                onSelectionChange([...selectedValues, value]);
            }
        }
        else {
            // For single select, clicking the same chip again deselects it
            if (selectedValues.includes(value)) {
                onSelectionChange([]);
            }
            else {
                onSelectionChange([value]);
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, style], accessibilityRole: "list", accessibilityLabel: variant === "filter" ? "Filter options" : "Options", children: [data?.map((item) => ((0, jsx_runtime_1.jsx)(Chip_1.default, { label: item.label, variant: variant, selected: selectedValues.includes(item.value), disabled: item.disabled, onPress: () => handlePress(item.value), leadingIcon: item.leadingIcon, trailingIcon: item.trailingIcon }, item.value))), children] }));
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        paddingVertical: 8,
    },
});
exports.default = ChipGroup;
