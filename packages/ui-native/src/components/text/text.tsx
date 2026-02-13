import type React from 'react';
import type { TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { ThemeColors } from '../../theme/theme';
import type { Typography } from '../../tokens/typography';

type TextColor = 'foreground' | 'muted' | 'primary' | 'inherit';

export interface TextProps {
  children: React.ReactNode;
  typography?: Typography;
  color?: TextColor;
  lineLimit?: number;
  align?: TextStyle['textAlign'];
  style?: TextStyle;
  accessibilityRole?: 'header' | 'text' | 'link' | 'none';
}

const colorMap: Record<Exclude<TextColor, 'inherit'>, keyof ThemeColors> = {
  foreground: 'foreground',
  muted: 'mutedForeground',
  primary: 'primary',
};

export function Text({
  children,
  typography: typographyKey = 'text-md-regular',
  color = 'foreground',
  lineLimit,
  align,
  style,
  ...rest
}: TextProps) {
  const theme = useTheme();
  const typoStyle = theme.typography[typographyKey];
  const colorStyle = color === 'inherit' ? {} : { color: theme.colors[colorMap[color]] };

  return (
    <RNText
      style={[typoStyle, colorStyle, align ? { textAlign: align } : undefined, style]}
      numberOfLines={lineLimit}
      ellipsizeMode={lineLimit ? 'tail' : undefined}
      {...rest}
    >
      {children}
    </RNText>
  );
}
