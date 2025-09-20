import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from './constants';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  input: {
    height: 40,
    borderColor: COLORS.gray[300],
    borderWidth: 1,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  // Primary button (default)
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  // Secondary button
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  // Outline button
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonTextOutline: {
    color: COLORS.primary,
  },
  // Size variations
  buttonSmall: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  buttonLarge: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
});

export default Styles;