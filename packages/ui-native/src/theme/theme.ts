import { blue, destructive, gray } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens/shadows';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

interface ThemeColorTokens {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  primaryPressed: string;
  primaryDisabled: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  accent: string;
  accentForeground: string;
  accentLight: string;
  card: string;
  cardBorder: string;
  buttonPrimary: string;
  buttonPrimaryForeground: string;
  buttonPrimaryHover: string;
  buttonPrimaryPressed: string;
  buttonPrimaryDisabled: string;
  controlChecked: string;
  destructive: string;
  destructiveForeground: string;
  destructivePressed: string;
  inputBg: string;
  inputBgHover: string;
  inputBgFocus: string;
  inputBorderFocus: string;
}

const lightColors: ThemeColorTokens = {
  background: gray[50],
  foreground: gray[950],
  primary: gray[950],
  primaryForeground: '#ffffff',
  primaryHover: gray[800],
  primaryPressed: gray[700],
  primaryDisabled: gray[300],
  muted: gray[100],
  mutedForeground: gray[500],
  border: gray[200],
  ring: gray[950],
  accent: blue[500],
  accentForeground: '#ffffff',
  accentLight: blue[50],
  card: '#ffffff',
  cardBorder: gray[100],

  buttonPrimary: gray[950],
  buttonPrimaryForeground: '#ffffff',
  buttonPrimaryHover: gray[800],
  buttonPrimaryPressed: gray[700],
  buttonPrimaryDisabled: gray[300],

  controlChecked: gray[950],

  destructive: destructive[500],
  destructiveForeground: '#ffffff',
  destructivePressed: destructive[700],

  inputBg: gray[100],
  inputBgHover: gray[200],
  inputBgFocus: '#ffffff',
  inputBorderFocus: gray[950],
};

const darkColors: ThemeColorTokens = {
  background: gray[950],
  foreground: gray[50],
  primary: gray[50],
  primaryForeground: gray[950],
  primaryHover: gray[200],
  primaryPressed: gray[300],
  primaryDisabled: gray[700],
  muted: gray[900],
  mutedForeground: gray[400],
  border: gray[800],
  ring: gray[50],
  accent: blue[400],
  accentForeground: '#ffffff',
  accentLight: blue[950],
  card: gray[900],
  cardBorder: gray[800],

  buttonPrimary: gray[50],
  buttonPrimaryForeground: gray[950],
  buttonPrimaryHover: gray[200],
  buttonPrimaryPressed: gray[300],
  buttonPrimaryDisabled: gray[700],

  controlChecked: gray[50],

  destructive: destructive[500],
  destructiveForeground: '#ffffff',
  destructivePressed: destructive[700],

  inputBg: gray[900],
  inputBgHover: gray[800],
  inputBgFocus: gray[950],
  inputBorderFocus: gray[50],
};

export const lightTheme = {
  colors: lightColors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export const darkTheme = {
  colors: darkColors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export type AgentsTheme = typeof lightTheme;
export type ThemeColors = ThemeColorTokens;
