import { useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Animated, Easing } from 'react-native';
import { useTheme } from 'styled-components/native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export function Skeleton({ variant = 'text', width, height, style }: SkeletonProps) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const defaultDimensions = {
    text: { width: width ?? ('100%' as ViewStyle['width']), height: height ?? 16 },
    circular: { width: width ?? 40, height: height ?? 40 },
    rectangular: { width: width ?? ('100%' as ViewStyle['width']), height: height ?? 100 },
  };

  const dims = defaultDimensions[variant];
  const borderRadius =
    variant === 'circular'
      ? typeof dims.width === 'number'
        ? dims.width / 2
        : 9999
      : theme.radius.md;

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[
        {
          width: dims.width,
          height: dims.height,
          borderRadius,
          backgroundColor: theme.colors.muted,
          opacity,
        },
        style,
      ]}
    />
  );
}
