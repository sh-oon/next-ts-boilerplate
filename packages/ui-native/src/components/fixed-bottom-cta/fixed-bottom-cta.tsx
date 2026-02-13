import { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Platform, type ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { ButtonProps } from '../button';
import { Button } from '../button';

export interface FixedBottomCTAProps extends ButtonProps {
  /** Bottom safe area inset (e.g. useSafeAreaInsets().bottom) */
  safeAreaBottom?: number;
  /** Style override for the outer container */
  containerStyle?: ViewStyle;
}

const SHOW_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const HIDE_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

export function FixedBottomCTA({
  safeAreaBottom = 0,
  containerStyle,
  style,
  rounded = 'xl',
  size = 'lg',
  ...buttonProps
}: FixedBottomCTAProps) {
  const theme = useTheme();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const bottom = useRef(new Animated.Value(0)).current;
  const paddingH = useRef(new Animated.Value(16)).current;
  const paddingTop = useRef(new Animated.Value(12)).current;
  const paddingBottom = useRef(new Animated.Value(12 + safeAreaBottom)).current;

  useEffect(() => {
    const show = Keyboard.addListener(SHOW_EVENT, (e) => {
      setKeyboardVisible(true);
      const duration = e.duration || 250;
      Animated.parallel([
        Animated.timing(bottom, { toValue: e.endCoordinates.height, duration, useNativeDriver: false }),
        Animated.timing(paddingH, { toValue: 0, duration, useNativeDriver: false }),
        Animated.timing(paddingTop, { toValue: 0, duration, useNativeDriver: false }),
        Animated.timing(paddingBottom, { toValue: 0, duration, useNativeDriver: false }),
      ]).start();
    });

    const hide = Keyboard.addListener(HIDE_EVENT, (e) => {
      setKeyboardVisible(false);
      const duration = e?.duration || 250;
      Animated.parallel([
        Animated.timing(bottom, { toValue: 0, duration, useNativeDriver: false }),
        Animated.timing(paddingH, { toValue: 16, duration, useNativeDriver: false }),
        Animated.timing(paddingTop, { toValue: 12, duration, useNativeDriver: false }),
        Animated.timing(paddingBottom, { toValue: 12 + safeAreaBottom, duration, useNativeDriver: false }),
      ]).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [bottom, paddingH, paddingTop, paddingBottom, safeAreaBottom]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom,
          left: 0,
          right: 0,
          paddingHorizontal: paddingH,
          paddingTop,
          paddingBottom,
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: keyboardVisible ? 'transparent' : theme.colors.border,
        },
        containerStyle,
      ]}
    >
      <Button
        size={size}
        rounded={keyboardVisible ? 'none' : rounded}
        {...buttonProps}
        style={style}
      />
    </Animated.View>
  );
}
