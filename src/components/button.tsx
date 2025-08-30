import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import GlobalStyles from '../styles';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<AppButtonProps> = ({
  title,
  textStyle,
  style,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  const buttonStyle = useMemo(() => {
    const baseStyle: ViewStyle[] = [GlobalStyles.button];
    
    // Add variant styles
    if (variant === 'secondary') {
      baseStyle.push(GlobalStyles.buttonSecondary as ViewStyle);
    } else if (variant === 'outline') {
      baseStyle.push(GlobalStyles.buttonOutline as ViewStyle);
    }
    
    // Add size styles
    if (size === 'small') {
      baseStyle.push(GlobalStyles.buttonSmall as ViewStyle);
    } else if (size === 'large') {
      baseStyle.push(GlobalStyles.buttonLarge as ViewStyle);
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  }, [variant, size, style]);

  const textStyleMemo = useMemo(() => {
    const baseTextStyle: TextStyle[] = [GlobalStyles.buttonText];
    
    if (variant === 'outline') {
      baseTextStyle.push(GlobalStyles.buttonTextOutline as TextStyle);
    }
    
    return StyleSheet.flatten([baseTextStyle, textStyle || {}]);
  }, [variant, textStyle]);

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      <Text style={textStyleMemo}>{title}</Text>
    </TouchableOpacity>
  );
};