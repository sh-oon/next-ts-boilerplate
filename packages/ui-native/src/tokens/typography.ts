import type { TextStyle } from 'react-native';

const sans = 'Pretendard';
/** JetBrains Mono — used by consuming apps for monospace text */
export const monoFontFamily = 'JetBrains Mono';

const weight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

/* ── Title 2xl · 36px / 44px / tracking-tight ── */
const title2xl = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 36,
  lineHeight: 44,
  fontWeight: fw,
  letterSpacing: -0.025 * 36,
});

/* ── Title xl · 30px / 36px / tracking-tight ── */
const titleXl = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 30,
  lineHeight: 36,
  fontWeight: fw,
  letterSpacing: -0.025 * 30,
});

/* ── Title lg · 24px / 32px ── */
const titleLg = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 24,
  lineHeight: 32,
  fontWeight: fw,
  letterSpacing: -0.02 * 24,
});

/* ── Title md · 20px / 28px ── */
const titleMd = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 20,
  lineHeight: 28,
  fontWeight: fw,
  letterSpacing: -0.01 * 20,
});

/* ── Title sm · 18px / 24px ── */
const titleSm = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 18,
  lineHeight: 24,
  fontWeight: fw,
});

/* ── Title xs · 16px / 24px ── */
const titleXs = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: fw,
});

/* ── Text lg · 18px / 28px ── */
const textLg = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 18,
  lineHeight: 28,
  fontWeight: fw,
});

/* ── Text md · 16px / 24px ── */
const textMd = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: fw,
});

/* ── Text sm · 14px / 20px ── */
const textSm = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 14,
  lineHeight: 20,
  fontWeight: fw,
});

/* ── Text xs · 12px / 16px ── */
const textXs = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 12,
  lineHeight: 16,
  fontWeight: fw,
});

/* ── Label lg · 16px / 20px ── */
const labelLg = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 16,
  lineHeight: 20,
  fontWeight: fw,
});

/* ── Label md · 14px / 16px ── */
const labelMd = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 14,
  lineHeight: 16,
  fontWeight: fw,
});

/* ── Label sm · 12px / 16px ── */
const labelSm = (fw: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: sans,
  fontSize: 12,
  lineHeight: 16,
  fontWeight: fw,
  letterSpacing: 0.01 * 12,
});

export const typography = {
  'title-2xl-bold': title2xl(weight.bold),
  'title-2xl-semibold': title2xl(weight.semibold),
  'title-2xl-medium': title2xl(weight.medium),
  'title-2xl-regular': title2xl(weight.regular),

  'title-xl-bold': titleXl(weight.bold),
  'title-xl-semibold': titleXl(weight.semibold),
  'title-xl-medium': titleXl(weight.medium),
  'title-xl-regular': titleXl(weight.regular),

  'title-lg-bold': titleLg(weight.bold),
  'title-lg-semibold': titleLg(weight.semibold),
  'title-lg-medium': titleLg(weight.medium),
  'title-lg-regular': titleLg(weight.regular),

  'title-md-bold': titleMd(weight.bold),
  'title-md-semibold': titleMd(weight.semibold),
  'title-md-medium': titleMd(weight.medium),
  'title-md-regular': titleMd(weight.regular),

  'title-sm-bold': titleSm(weight.bold),
  'title-sm-semibold': titleSm(weight.semibold),
  'title-sm-medium': titleSm(weight.medium),
  'title-sm-regular': titleSm(weight.regular),

  'title-xs-bold': titleXs(weight.bold),
  'title-xs-semibold': titleXs(weight.semibold),
  'title-xs-medium': titleXs(weight.medium),
  'title-xs-regular': titleXs(weight.regular),

  'text-lg-bold': textLg(weight.bold),
  'text-lg-semibold': textLg(weight.semibold),
  'text-lg-medium': textLg(weight.medium),
  'text-lg-regular': textLg(weight.regular),

  'text-md-bold': textMd(weight.bold),
  'text-md-semibold': textMd(weight.semibold),
  'text-md-medium': textMd(weight.medium),
  'text-md-regular': textMd(weight.regular),

  'text-sm-bold': textSm(weight.bold),
  'text-sm-semibold': textSm(weight.semibold),
  'text-sm-medium': textSm(weight.medium),
  'text-sm-regular': textSm(weight.regular),

  'text-xs-bold': textXs(weight.bold),
  'text-xs-semibold': textXs(weight.semibold),
  'text-xs-medium': textXs(weight.medium),
  'text-xs-regular': textXs(weight.regular),

  'label-lg-bold': labelLg(weight.bold),
  'label-lg-semibold': labelLg(weight.semibold),
  'label-lg-medium': labelLg(weight.medium),
  'label-lg-regular': labelLg(weight.regular),

  'label-md-bold': labelMd(weight.bold),
  'label-md-semibold': labelMd(weight.semibold),
  'label-md-medium': labelMd(weight.medium),
  'label-md-regular': labelMd(weight.regular),

  'label-sm-bold': labelSm(weight.bold),
  'label-sm-semibold': labelSm(weight.semibold),
  'label-sm-medium': labelSm(weight.medium),
  'label-sm-regular': labelSm(weight.regular),
} as const;

export type Typography = keyof typeof typography;
