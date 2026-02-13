import type React from 'react';
import { useCallback } from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator, Pressable } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const sizeConfig = {
  sm: { height: 40, paddingHorizontal: 16, typography: 'label-md-medium' as Typography },
  md: { height: 48, paddingHorizontal: 20, typography: 'label-lg-medium' as Typography },
  lg: { height: 56, paddingHorizontal: 24, typography: 'label-lg-medium' as Typography },
} as const;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'xl',
  disabled = false,
  loading = false,
  onPress,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const getBackgroundColor = useCallback(
    (pressed: boolean) => {
      if (disabled) {
        return variant === 'primary' ? theme.colors.buttonPrimaryDisabled : theme.colors.muted;
      }
      switch (variant) {
        case 'primary':
          return pressed ? theme.colors.buttonPrimaryPressed : theme.colors.buttonPrimary;
        case 'secondary':
          return pressed ? theme.colors.border : theme.colors.muted;
        case 'destructive':
          return pressed ? theme.colors.destructivePressed : theme.colors.destructive;
        case 'outline':
        case 'ghost':
          return pressed ? theme.colors.muted : 'transparent';
        default:
          return theme.colors.buttonPrimary;
      }
    },
    [variant, disabled, theme]
  );

  const getTextColor = useCallback(() => {
    if (disabled) {
      return variant === 'primary'
        ? theme.colors.buttonPrimaryForeground
        : theme.colors.mutedForeground;
    }
    switch (variant) {
      case 'primary':
        return theme.colors.buttonPrimaryForeground;
      case 'secondary':
        return theme.colors.foreground;
      case 'destructive':
        return theme.colors.destructiveForeground;
      case 'outline':
      case 'ghost':
        return theme.colors.foreground;
      default:
        return theme.colors.buttonPrimaryForeground;
    }
  }, [variant, disabled, theme]);

  const borderRadius = theme.radius[rounded === 'none' ? 'none' : rounded];
  const borderWidth = variant === 'outline' ? 1 : 0;
  const borderColor = variant === 'outline' ? theme.colors.border : undefined;
  const textColor = getTextColor();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || loading }}
      style={({ pressed }) => [
        {
          height: config.height,
          paddingHorizontal: config.paddingHorizontal,
          borderRadius,
          borderWidth,
          borderColor,
          backgroundColor: getBackgroundColor(pressed),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : typeof children === 'string' ? (
        <Text
          typography={config.typography}
          color="inherit"
          style={{ color: textColor }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
