# @mono/ui

## 3.0.0

### Major Changes

- Rename dependency `@mono/shared` to `@mono/utils` and `@mono/lib` to `@mono/tokens`
- Point package exports directly to source files instead of dist

### Patch Changes

- Updated dependencies
  - @mono/utils@2.0.0
  - @mono/tokens@2.0.0

## 2.0.0

### Major Changes

- f1dab64: Add design system packages

  - **@mono/shared**: Rename from @mono/utils, add `cn()` and `cva` utilities
  - **@mono/lib**: New CSS design tokens package (tokens, semantic, typography)
  - **@mono/ui**: Complete web UI component library with 25+ components and Storybook
  - **@mono/ui-native**: React Native UI component library with theme system
  - **@mono/tsconfig**: Add react-library config updates
