import React, { createContext, useCallback, useContext } from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { Typography } from '../../tokens/typography';
import { Text } from '../text';

export type RadioSize = 'sm' | 'md' | 'lg';

/* ── Context ── */

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  size: 'md',
});

/* ── RadioGroup ── */

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: RadioSize;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  orientation = 'vertical',
  size = 'md',
  children,
  style,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange: handleChange, disabled, size }}>
      <View
        accessibilityRole="radiogroup"
        style={[
          {
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: 12,
          },
          style,
        ]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

/* ── RadioItem ── */

export interface RadioItemProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { outer: 16, inner: 8, labelTypography: 'text-sm-regular' as Typography },
  md: { outer: 20, inner: 10, labelTypography: 'text-sm-regular' as Typography },
  lg: { outer: 24, inner: 12, labelTypography: 'text-md-regular' as Typography },
} as const;

export function RadioItem({
  value: itemValue,
  label,
  description,
  disabled: itemDisabled = false,
  style,
}: RadioItemProps) {
  const theme = useTheme();
  const ctx = useContext(RadioGroupContext);
  const disabled = ctx.disabled || itemDisabled;
  const checked = ctx.value === itemValue;
  const config = sizeConfig[ctx.size];

  const handlePress = useCallback(() => {
    if (!disabled) ctx.onValueChange?.(itemValue);
  }, [disabled, ctx, itemValue]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      style={[
        { flexDirection: 'row', alignItems: 'flex-start', gap: 8, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      <View
        style={{
          width: config.outer,
          height: config.outer,
          borderRadius: config.outer / 2,
          borderWidth: 2,
          borderColor: checked ? theme.colors.controlChecked : theme.colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <View
            style={{
              width: config.inner,
              height: config.inner,
              borderRadius: config.inner / 2,
              backgroundColor: theme.colors.controlChecked,
            }}
          />
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
