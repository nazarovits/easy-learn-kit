export enum TextColors {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
  MUTED = "muted",
  WHITE = "white",
}

/**
 * List of color names used in the application.
 */
export const colorNames: string[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  // ...add more as needed
];

/**
 * Type for a color name.
 */
export type ColorName = (typeof colorNames)[number];
