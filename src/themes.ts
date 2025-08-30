import { DarkTheme, DefaultTheme } from "@react-navigation/native";
export const Dark = {
  ...DarkTheme,
  colors: {
    primary: "rgb(10, 132, 255)",
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
    primary: "rgb(10, 132, 255)",
    background: "rgb(255,255,255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 69, 58)",
  },
} as const;
export type Theme = typeof DarkTheme | typeof Dark | typeof Light;
