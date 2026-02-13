import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import { Animated, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { destructive, success, warning } from '../../tokens/colors';
import { Text } from '../text';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'accent' | 'success' | 'warning' | 'error';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  showLabel?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { height: 4 },
  md: { height: 8 },
  lg: { height: 12 },
} as const;

const colorMap: Record<ProgressColor, string> = {
  primary: '', // resolved from theme
  accent: '', // resolved from theme
  success: success[500],
  warning: warning[500],
  error: destructive[500],
};

export function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  style,
}: ProgressProps) {
  const theme = useTheme();
  const config = sizeConfig[size];
  const pct = Math.round(Math.min(Math.max(value / max, 0), 1) * 100);
  const fillColor =
    color === 'primary'
      ? theme.colors.primary
      : color === 'accent'
        ? theme.colors.accent
        : colorMap[color];

  const [trackWidth, setTrackWidth] = useState(0);
  const targetWidth = Math.round((trackWidth * pct) / 100);
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trackWidth === 0) return;
    Animated.timing(widthAnim, {
      toValue: targetWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [targetWidth, trackWidth, widthAnim]);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      style={style}
    >
      <View
        onLayout={onTrackLayout}
        style={{
          height: config.height,
          borderRadius: config.height / 2,
          backgroundColor: theme.colors.muted,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            borderRadius: config.height / 2,
            backgroundColor: fillColor,
            width: widthAnim,
          }}
        />
      </View>
      {showLabel && (
        <Text
          typography="text-xs-medium"
          color="muted"
          style={{ marginTop: 4 }}
        >
          {`${pct}%`}
        </Text>
      )}
    </View>
  );
}
