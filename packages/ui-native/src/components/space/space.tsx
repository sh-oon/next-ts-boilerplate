import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

export type SpacePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface SpaceProps {
  size?: SpacePreset | number;
  direction?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

const presetMap: Record<SpacePreset, number> = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export function Space({ size = 'md', direction = 'vertical', style }: SpaceProps) {
  const px = typeof size === 'number' ? size : presetMap[size];
  const dimension = direction === 'vertical' ? { height: px } : { width: px };

  return <View style={[dimension, style]} />;
}
