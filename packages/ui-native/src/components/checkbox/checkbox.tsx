import React, { useCallback } from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: CheckboxSize;
  disabled?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { box: 16, icon: 10, labelTypography: 'text-sm-regular' as Typography },
  md: { box: 20, icon: 12, labelTypography: 'text-sm-regular' as Typography },
  lg: { box: 24, icon: 14, labelTypography: 'text-md-regular' as Typography },
} as const;

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  size = 'md',
  disabled = false,
  style,
}: CheckboxProps) {
  const theme = useTheme();
  const config = sizeConfig[size];
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

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
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      style={[
        { flexDirection: 'row', alignItems: 'flex-start', gap: 8, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      <View
        style={{
          width: config.box,
          height: config.box,
          borderRadius: theme.radius.sm,
          borderWidth: checked ? 0 : 2,
          borderColor: theme.colors.border,
          backgroundColor: checked ? theme.colors.controlChecked : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <Svg
            width={config.icon}
            height={config.icon}
            viewBox="0 0 12 12"
            fill="none"
          >
            <Path
              d="M2 6L5 9L10 3"
              stroke={theme.colors.primaryForeground}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
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
