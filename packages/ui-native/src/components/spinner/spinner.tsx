import { useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'primary' | 'muted' | 'inherit';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { dimension: 16, strokeWidth: 2 },
  md: { dimension: 24, strokeWidth: 2.5 },
  lg: { dimension: 32, strokeWidth: 3 },
} as const;

export function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Loading',
  style,
}: SpinnerProps) {
  const theme = useTheme();
  const config = sizeConfig[size];
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 750,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const strokeColor =
    color === 'primary'
      ? theme.colors.primary
      : color === 'muted'
        ? theme.colors.mutedForeground
        : theme.colors.foreground;

  const r = (config.dimension - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      style={[
        { width: config.dimension, height: config.dimension, transform: [{ rotate: spin }] },
        style,
      ]}
    >
      <Svg
        width={config.dimension}
        height={config.dimension}
        viewBox={`0 0 ${config.dimension} ${config.dimension}`}
      >
        <Circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={r}
          stroke={strokeColor}
          strokeWidth={config.strokeWidth}
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
        />
      </Svg>
    </Animated.View>
  );
}
