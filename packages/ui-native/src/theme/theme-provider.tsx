import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import type { AgentsTheme } from './theme';
import { darkTheme, lightTheme } from './theme';

export type ColorMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  colorMode: ColorMode;
  resolvedColorMode: 'light' | 'dark';
  theme: AgentsTheme;
}

const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'system',
  resolvedColorMode: 'light',
  theme: lightTheme,
});

export interface AgentsThemeProviderProps {
  colorMode?: ColorMode;
  children: React.ReactNode;
}

export function AgentsThemeProvider({ colorMode = 'system', children }: AgentsThemeProviderProps) {
  const systemScheme = useColorScheme();

  const resolvedColorMode = useMemo(() => {
    if (colorMode === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return colorMode;
  }, [colorMode, systemScheme]);

  const theme = resolvedColorMode === 'dark' ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({ colorMode, resolvedColorMode, theme }),
    [colorMode, resolvedColorMode, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAgentsTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
