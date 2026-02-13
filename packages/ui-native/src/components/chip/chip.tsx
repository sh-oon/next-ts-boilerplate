import type React from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type ChipSize = 'sm' | 'md';

export interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  onDismiss?: () => void;
  size?: ChipSize;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: {
    height: 28,
    paddingHorizontal: 10,
    typography: 'text-xs-medium' as Typography,
    iconSize: 12,
  },
  md: {
    height: 32,
    paddingHorizontal: 12,
    typography: 'text-sm-medium' as Typography,
    iconSize: 14,
  },
} as const;

export function Chip({
  children,
  selected = false,
  disabled = false,
  onSelect,
  onDismiss,
  size = 'md',
  style,
}: ChipProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const bg = selected ? theme.colors.primary : theme.colors.muted;
  const textColor = selected ? theme.colors.primaryForeground : theme.colors.foreground;

  return (
    <Pressable
      onPress={onSelect}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      style={[
        {
          height: config.height,
          borderRadius: theme.radius.full,
          backgroundColor: bg,
          paddingHorizontal: config.paddingHorizontal,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          opacity: disabled ? 0.5 : 1,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
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
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          hitSlop={4}
          accessibilityLabel="Remove"
        >
          <Svg
            width={config.iconSize}
            height={config.iconSize}
            viewBox="0 0 12 12"
            fill="none"
          >
            <Path
              d="M3 3L9 9M9 3L3 9"
              stroke={textColor}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </Svg>
        </Pressable>
      )}
    </Pressable>
  );
}
