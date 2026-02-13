import 'styled-components/native';
import type { AgentsTheme } from './theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AgentsTheme {}
}
