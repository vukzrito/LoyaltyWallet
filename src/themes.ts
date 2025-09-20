import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { COLORS } from "./constants";
export const Dark = {
  ...DarkTheme,
  colors: {
    primary: "Colors.primary",
    background: "rgb(18, 18, 18)",
    card: "rgb(28, 28, 30)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
} as const;
export const Light = {
  ...DefaultTheme,
  colors: {
    primary: COLORS.primary,
    background: COLORS.background,
    card: "rgb(255, 255, 255)",
    text: COLORS.text,
    border: COLORS.border,
    notification: COLORS.primary,
  },
} as const;
export type Theme = typeof DarkTheme | typeof Dark | typeof Light;
