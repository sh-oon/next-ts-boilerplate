import type React from 'react';
import { useCallback, useState } from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import type { InputSize, InputVariant } from '../input';
import { Input } from '../input';
import { Text } from '../text';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: InputVariant;
  inputSize?: InputSize;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export function TextField({
  label,
  helperText,
  errorMessage,
  required,
  clearable,
  onClear,
  startIcon,
  endIcon,
  variant,
  inputSize = 'md',
  containerStyle,
  disabled,
  value,
  onChangeText,
  ...rest
}: TextFieldProps) {
  const theme = useTheme();
  const [internalValue, setInternalValue] = useState('');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChangeText = useCallback(
    (text: string) => {
      if (!isControlled) setInternalValue(text);
      onChangeText?.(text);
    },
    [isControlled, onChangeText],
  );

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue('');
    onChangeText?.('');
    onClear?.();
  }, [isControlled, onChangeText, onClear]);

  const showClear = clearable && currentValue !== '' && !disabled;
  const resolvedVariant = errorMessage ? 'error' : variant;

  const iconSize = inputSize === 'sm' ? 16 : inputSize === 'lg' ? 20 : 18;

  const endAdornment = showClear ? (
    <Pressable
      onPress={handleClear}
      hitSlop={8}
      accessibilityLabel="입력 지우기"
      accessibilityRole="button"
    >
      <Svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.colors.mutedForeground}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={true}
      >
        <Path d="M18 6L6 18M6 6l12 12" />
      </Svg>
    </Pressable>
  ) : endIcon ? (
    <View style={{ opacity: 0.5 }}>{endIcon}</View>
  ) : undefined;

  const startAdornment = startIcon ? (
    <View style={{ opacity: 0.5 }}>{startIcon}</View>
  ) : undefined;

  const floatingLabel = label
    ? required ? `${label} *` : label
    : undefined;

  return (
    <View style={{ gap: 6 }}>
      <Input
        value={currentValue}
        onChangeText={handleChangeText}
        variant={resolvedVariant}
        inputSize={inputSize}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        floatingLabel={floatingLabel}
        editable={!disabled}
        containerStyle={containerStyle}
        {...rest}
      />
      {(errorMessage || helperText) && (
        <Text
          typography="text-xs-regular"
          style={{ color: errorMessage ? theme.colors.destructive : theme.colors.mutedForeground }}
        >
          {errorMessage || helperText}
        </Text>
      )}
    </View>
  );
}
