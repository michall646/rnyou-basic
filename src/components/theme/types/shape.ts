// types/shape.ts

export type ShapeTokenCategory =
  | 'none'
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge'
  | 'full';

export type ShapeTokens = Record<ShapeTokenCategory, number>;

export const DEFAULT_SHAPE_TOKENS: ShapeTokens = {
  none: 0,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 28,
  full: 9999,
};
