# @mono/tokens

## 2.0.0

### Major Changes

- aeeb9e3: Rename packages and point exports to source

  - `@mono/lib` -> `@mono/tokens`
  - `@mono/shared` -> `@mono/utils`
  - `bomb-boilerplate` -> `@ziclo/boilerplate`
  - Point package exports directly to source files instead of dist

## 1.1.0

### Minor Changes

- f1dab64: Add design system packages

  - **@mono/shared**: Rename from @mono/utils, add `cn()` and `cva` utilities
  - **@mono/lib**: New CSS design tokens package (tokens, semantic, typography)
  - **@mono/ui**: Complete web UI component library with 25+ components and Storybook
  - **@mono/ui-native**: React Native UI component library with theme system
  - **@mono/tsconfig**: Add react-library config updates
