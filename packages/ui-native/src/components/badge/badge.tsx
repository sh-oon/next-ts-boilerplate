import type React from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { destructive, success, warning } from '../../tokens/colors';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'outline';
export type BadgeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  rounded?: BadgeRounded;
  style?: ViewStyle;
}

export function Badge({ children, variant = 'default', rounded = 'full', style }: BadgeProps) {
  const theme = useTheme();

  const variantStyles: Record<
    BadgeVariant,
    { bg: string; text: string; borderWidth: number; borderColor: string }
  > = {
    default: {
      bg: theme.colors.primary,
      text: theme.colors.primaryForeground,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    secondary: {
      bg: theme.colors.muted,
      text: theme.colors.foreground,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    destructive: {
      bg: destructive[500],
      text: '#ffffff',
      borderWidth: 0,
      borderColor: 'transparent',
    },
    success: { bg: success[500], text: '#ffffff', borderWidth: 0, borderColor: 'transparent' },
    warning: { bg: warning[500], text: '#ffffff', borderWidth: 0, borderColor: 'transparent' },
    outline: {
      bg: 'transparent',
      text: theme.colors.foreground,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  };

  const vs = variantStyles[variant];
  const borderRadius = theme.radius[rounded === 'none' ? 'none' : rounded];
  const typography: Typography = 'label-sm-medium';

  return (
    <View
      style={[
        {
          backgroundColor: vs.bg,
          borderRadius,
          borderWidth: vs.borderWidth,
          borderColor: vs.borderColor,
          paddingHorizontal: 8,
          paddingVertical: 2,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          typography={typography}
          color="inherit"
          style={{ color: vs.text }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
