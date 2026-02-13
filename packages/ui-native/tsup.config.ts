import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: [
    'react',
    'react-native',
    'react-native-svg',
    'styled-components',
    'styled-components/native',
  ],
});
