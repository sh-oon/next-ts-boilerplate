export const gray = {
  50: '#fafafa',
  100: '#f5f5f6',
  200: '#e4e4e7',
  300: '#d4d4d9',
  400: '#a1a1a8',
  500: '#70717a',
  600: '#54545c',
  700: '#3f3f46',
  800: '#262629',
  900: '#18181b',
  950: '#070709',
} as const;

export const blue = {
  50: '#eff6ff',
  100: '#d9e9ff',
  200: '#b9d7ff',
  300: '#89b7f7',
  400: '#5595f0',
  500: '#2679eb',
  600: '#0562d3',
  700: '#004fb1',
  800: '#013e8b',
  900: '#0c3164',
  950: '#071e40',
} as const;

export const destructive = {
  50: '#fff2f2',
  100: '#ffe3e1',
  200: '#ffc6c3',
  300: '#ffa29e',
  400: '#fc746e',
  500: '#ed4a48',
  600: '#df2224',
  700: '#b71a1b',
  800: '#941616',
  900: '#721c19',
  950: '#430f0d',
} as const;

export const success = {
  50: '#ecf9f0',
  100: '#d7f4e0',
  200: '#a9e5c0',
  300: '#69d49a',
  400: '#00bd75',
  500: '#009d56',
  600: '#008144',
  700: '#006634',
  800: '#004f2a',
  900: '#003e22',
  950: '#00220f',
} as const;

export const warning = {
  50: '#fef8ed',
  100: '#fff0d4',
  200: '#fce29f',
  300: '#ffcc5c',
  400: '#fbb100',
  500: '#ef9900',
  600: '#e07600',
  700: '#ba5000',
  800: '#933d03',
  900: '#753613',
  950: '#411904',
} as const;

export const palette = { gray, blue, destructive, success, warning } as const;
