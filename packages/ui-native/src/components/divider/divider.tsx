import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

export function Divider({ orientation = 'horizontal', style }: DividerProps) {
  const theme = useTheme();

  const dividerStyle: ViewStyle =
    orientation === 'horizontal'
      ? { height: 1, backgroundColor: theme.colors.border, width: '100%' }
      : { width: 1, backgroundColor: theme.colors.border, alignSelf: 'stretch' };

  return (
    <View
      accessibilityRole="none"
      style={[dividerStyle, style]}
    />
  );
}
