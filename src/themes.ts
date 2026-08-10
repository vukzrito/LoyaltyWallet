import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { COLORS } from "./constants";

export const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.primary,
    background: COLORS.gray[900],
    card: COLORS.gray[800],
    text: COLORS.gray[100],
    border: COLORS.gray[700],
    notification: COLORS.danger,
  },
} as const;

export const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.border,
    notification: COLORS.primary,
  },
} as const;

export type Theme = typeof DarkTheme | typeof Dark | typeof Light;
