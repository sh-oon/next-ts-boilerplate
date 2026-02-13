import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';
import { Animated, TextInput, View } from 'react-native';
import { useTheme } from 'styled-components/native';

export type InputVariant = 'default' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: InputVariant;
  inputSize?: InputSize;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  floatingLabel?: string;
  containerStyle?: ViewStyle;
}

// Web equivalents:
// sm: h-10(40), text-sm(14), pt-4(16)  pb-0.5(2), floated top-1(4) scale-75
// md: h-12(48), text-sm(14), pt-5(20)  pb-1(4),   floated top-1(4) scale-75
// lg: h-14(56), text-base(16), pt-6(24) pb-1(4),  floated top-1(4) scale-75
//
// label default: top-1/2 -translate-y-1/2 = vertically centered
// label floated: top-1(4px) scale-75 → fontSize * 0.75
const sizeConfig = {
  sm: {
    height: 40,
    fontSize: 14,
    floatingFontSize: 11, // ~14 * 0.75
    floatingTopFloated: 4, // web: top-1(4px)
    inputPaddingTop: 16, // web: pt-4
    inputPaddingBottom: 2, // web: pb-0.5
  },
  md: {
    height: 48,
    fontSize: 14,
    floatingFontSize: 11,
    floatingTopFloated: 4,
    inputPaddingTop: 20, // web: pt-5
    inputPaddingBottom: 4, // web: pb-1
  },
  lg: {
    height: 56,
    fontSize: 16,
    floatingFontSize: 12, // ~16 * 0.75
    floatingTopFloated: 4,
    inputPaddingTop: 24, // web: pt-6
    inputPaddingBottom: 4, // web: pb-1
  },
} as const;

export function Input({
  variant = 'default',
  inputSize = 'md',
  startAdornment,
  endAdornment,
  floatingLabel,
  containerStyle,
  value,
  onFocus,
  onBlur,
  placeholder,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const config = sizeConfig[inputSize];
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
    [floatAnim]
  );

  const handleFocus: TextInputProps['onFocus'] = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      setFocused(true);
      animateFloat(1);
      onFocus?.(e);
    },
    [onFocus, animateFloat]
  );

  const handleBlur: TextInputProps['onBlur'] = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      setFocused(false);
      if (!value) animateFloat(0);
      onBlur?.(e);
    },
    [onBlur, value, animateFloat]
  );

  const borderBottomColor =
    variant === 'error'
      ? theme.colors.destructive
      : focused
        ? theme.colors.inputBorderFocus
        : theme.colors.border;

  const isFloating = !!floatingLabel;

  // Default position: center of content area (after paddingTop/paddingBottom)
  // Matches web's top-[Xpx] -translate-y-1/2 where X = paddingTop + contentArea/2
  const contentAreaHeight = config.height - config.inputPaddingTop - config.inputPaddingBottom;
  const floatingTopDefault = config.inputPaddingTop + (contentAreaHeight - config.fontSize) / 2;

  const floatingTop = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [floatingTopDefault, config.floatingTopFloated],
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
          height: config.height,
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor,
          flexDirection: 'row',
          alignItems: 'stretch',
          paddingHorizontal: 4,
          gap: 8,
        },
        containerStyle,
      ]}
    >
      {startAdornment && <View style={{ justifyContent: 'center' }}>{startAdornment}</View>}
      <View style={{ flex: 1, position: 'relative' }}>
        {isFloating && (
          <Animated.Text
            style={{
              position: 'absolute',
              top: floatingTop,
              left: 0,
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
            paddingBottom: isFloating ? config.inputPaddingBottom : 0,
          }}
          accessibilityLabel={floatingLabel ?? placeholder}
          {...rest}
        />
      </View>
      {endAdornment && <View style={{ justifyContent: 'center' }}>{endAdornment}</View>}
    </View>
  );
}
