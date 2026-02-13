import type { ViewStyle } from 'react-native';

export interface ShadowStyle {
  ios: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
  };
  android: {
    elevation: number;
  };
}

const black = '#000000';

export const shadows = {
  xs: {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
    android: { elevation: 1 },
  },
  sm: {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: { elevation: 2 },
  },
  md: {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: { elevation: 4 },
  },
  lg: {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    android: { elevation: 8 },
  },
  xl: {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
  },
  'soft-sm': {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
  },
  'soft-md': {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: { elevation: 4 },
  },
  'soft-lg': {
    ios: {
      shadowColor: black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 32,
    },
    android: { elevation: 8 },
  },
  none: {
    ios: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: { elevation: 0 },
  },
} as const;

export type ShadowName = keyof typeof shadows;

export function applyShadow(name: ShadowName): ViewStyle {
  const s = shadows[name];
  return { ...s.ios, ...s.android };
}
