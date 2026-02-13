import type React from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { blue, destructive, success, warning } from '../../tokens/colors';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { paddingH: 6, paddingV: 2, typography: 'text-xs-medium' as Typography },
  md: { paddingH: 8, paddingV: 2, typography: 'text-sm-medium' as Typography },
} as const;

export function Tag({ children, variant = 'default', size = 'sm', style }: TagProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const variantStyles: Record<TagVariant, { bg: string; text: string }> = {
    default: { bg: theme.colors.muted, text: theme.colors.mutedForeground },
    success: { bg: success[50], text: success[700] },
    warning: { bg: warning[50], text: warning[700] },
    error: { bg: destructive[50], text: destructive[700] },
    info: { bg: blue[50], text: blue[700] },
  };

  const vs = variantStyles[variant];

  return (
    <View
      style={[
        {
          backgroundColor: vs.bg,
          borderRadius: theme.radius.md,
          paddingHorizontal: config.paddingH,
          paddingVertical: config.paddingV,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          typography={config.typography}
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
