import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import GlobalStyles from '../styles';
import { COLORS } from '../constants';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button: React.FC<AppButtonProps> = ({
  title,
  textStyle,
  style,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonStyle = useMemo(() => {
    const baseStyle: ViewStyle[] = [GlobalStyles.button];

    if (variant === 'secondary') {
      baseStyle.push(GlobalStyles.buttonSecondary as ViewStyle);
    } else if (variant === 'outline') {
      baseStyle.push(GlobalStyles.buttonOutline as ViewStyle);
    }

    if (size === 'small') {
      baseStyle.push(GlobalStyles.buttonSmall as ViewStyle);
    } else if (size === 'large') {
      baseStyle.push(GlobalStyles.buttonLarge as ViewStyle);
    }

    if (isDisabled) {
      baseStyle.push(styles.disabled as ViewStyle);
    }

    return StyleSheet.flatten([baseStyle, style]);
  }, [variant, size, style, isDisabled]);

  const textStyleMemo = useMemo(() => {
    const baseTextStyle: TextStyle[] = [GlobalStyles.buttonText];

    if (variant === 'outline') {
      baseTextStyle.push(GlobalStyles.buttonTextOutline as TextStyle);
    }

    if (isDisabled) {
      baseTextStyle.push(styles.disabledText as TextStyle);
    }

    return StyleSheet.flatten([baseTextStyle, textStyle || {}]);
  }, [variant, textStyle, isDisabled]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.8}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={textStyleMemo}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});
