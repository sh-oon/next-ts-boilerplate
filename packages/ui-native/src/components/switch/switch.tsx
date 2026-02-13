import React, { useCallback, useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Animated, Pressable, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: SwitchSize;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: {
    trackW: 36,
    trackH: 20,
    thumb: 16,
    travel: 16,
    labelTypography: 'text-sm-regular' as Typography,
  },
  md: {
    trackW: 44,
    trackH: 24,
    thumb: 20,
    travel: 20,
    labelTypography: 'text-sm-regular' as Typography,
  },
  lg: {
    trackW: 52,
    trackH: 28,
    thumb: 24,
    travel: 24,
    labelTypography: 'text-md-regular' as Typography,
  },
} as const;

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  size = 'md',
  style,
}: SwitchProps) {
  const theme = useTheme();
  const config = sizeConfig[size];
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  const translateX = useRef(new Animated.Value(checked ? config.travel : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: checked ? config.travel : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [checked, config.travel, translateX]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  }, [checked, disabled, isControlled, onCheckedChange]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: 8, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      <View
        style={{
          width: config.trackW,
          height: config.trackH,
          borderRadius: config.trackH / 2,
          backgroundColor: checked ? theme.colors.controlChecked : theme.colors.border,
          justifyContent: 'center',
          paddingHorizontal: 2,
        }}
      >
        <Animated.View
          style={{
            width: config.thumb,
            height: config.thumb,
            borderRadius: config.thumb / 2,
            backgroundColor: '#ffffff',
            transform: [{ translateX }],
          }}
        />
      </View>
      {(label || description) && (
        <View style={{ flex: 1, gap: 2 }}>
          {label && (
            <Text
              typography={config.labelTypography}
              color="foreground"
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              typography="text-xs-regular"
              color="muted"
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
