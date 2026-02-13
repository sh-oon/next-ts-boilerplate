import { useCallback, useRef, useState } from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';
import { Animated, TextInput, View } from 'react-native';
import { useTheme } from 'styled-components/native';

export type TextareaVariant = 'default' | 'error';
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<TextInputProps, 'style'> {
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  floatingLabel?: string;
  containerStyle?: ViewStyle;
}

// Web textarea: border-b-2, bg-transparent, px-1, py-2
// Floating label: default top-3(12px) text-sm, floated top-2(8px) scale-75
// Input padding when floating: pt-6(24px)
const sizeConfig = {
  sm: {
    minHeight: 96,      // web: min-h-24
    fontSize: 14,       // web: text-sm
    floatingFontSize: 11,
    floatingTopDefault: 24, // matches inputPaddingTop — text starts here (top-aligned)
    floatingTopFloated: 8,  // web: top-2(8px)
    inputPaddingTop: 24,    // web: pt-6
  },
  md: {
    minHeight: 128,     // web: min-h-32
    fontSize: 14,
    floatingFontSize: 11,
    floatingTopDefault: 24,
    floatingTopFloated: 8,
    inputPaddingTop: 24,
  },
  lg: {
    minHeight: 160,     // web: min-h-40
    fontSize: 16,       // web: text-base
    floatingFontSize: 12,
    floatingTopDefault: 24,
    floatingTopFloated: 8,
    inputPaddingTop: 24,
  },
} as const;

export function Textarea({
  variant = 'default',
  textareaSize = 'md',
  floatingLabel,
  containerStyle,
  value,
  onFocus,
  onBlur,
  placeholder,
  ...rest
}: TextareaProps) {
  const theme = useTheme();
  const config = sizeConfig[textareaSize];
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value);

  const floatAnim = useRef(new Animated.Value(hasValue ? 1 : 0)).current;

  const animateFloat = useCallback(
    (toValue: number) => {
      Animated.timing(floatAnim, {
        toValue,
        duration: 150,
        useNativeDriver: false,
      }).start();
    },
    [floatAnim],
  );

  const handleFocus: TextInputProps['onFocus'] = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      setFocused(true);
      animateFloat(1);
      onFocus?.(e);
    },
    [onFocus, animateFloat],
  );

  const handleBlur: TextInputProps['onBlur'] = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      setFocused(false);
      if (!value) animateFloat(0);
      onBlur?.(e);
    },
    [onBlur, value, animateFloat],
  );

  const borderBottomColor =
    variant === 'error'
      ? theme.colors.destructive
      : focused
        ? theme.colors.inputBorderFocus
        : theme.colors.border;

  const isFloating = !!floatingLabel;

  const floatingTop = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [config.floatingTopDefault, config.floatingTopFloated],
  });

  const floatingFontSize = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [config.fontSize, config.floatingFontSize],
  });

  const floatingColor = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.colors.mutedForeground,
      focused ? theme.colors.inputBorderFocus : theme.colors.mutedForeground,
    ],
  });

  return (
    <View
      style={[
        {
          minHeight: config.minHeight,
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor,
          paddingHorizontal: 4,
          paddingVertical: 8,
        },
        containerStyle,
      ]}
    >
      {isFloating && (
        <Animated.Text
          style={{
            position: 'absolute',
            top: floatingTop,
            left: 4,
            fontSize: floatingFontSize,
            color: floatingColor,
          }}
          pointerEvents="none"
        >
          {floatingLabel}
        </Animated.Text>
      )}
      <TextInput
        value={value}
        multiline
        textAlignVertical="top"
        placeholder={isFloating ? undefined : placeholder}
        placeholderTextColor={theme.colors.mutedForeground}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          flex: 1,
          fontSize: config.fontSize,
          color: theme.colors.foreground,
          padding: 0,
          paddingTop: isFloating ? config.inputPaddingTop : 0,
        }}
        accessibilityLabel={floatingLabel ?? placeholder}
        {...rest}
      />
    </View>
  );
}
