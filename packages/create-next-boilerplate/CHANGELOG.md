# Changelog

## 3.0.0

### Major Changes

- aeeb9e3: Rename packages and point exports to source

  - `@mono/lib` -> `@mono/tokens`
  - `@mono/shared` -> `@mono/utils`
  - `bomb-boilerplate` -> `@ziclo/boilerplate`
  - Point package exports directly to source files instead of dist

## [1.0.0] - 2025-10-10

### Added

- 🎉 Initial release
- ✅ Yarn Berry (v4) workspace monorepo
- ✅ TypeScript support
- ✅ Biome (linter + formatter)
- ✅ Turbo build system
- ✅ Import auto-organize with custom groups
- ✅ Interactive CLI for project setup
- ✅ Automatic organization name replacement
- ✅ Example Next.js app
- ✅ Shared packages (`@mono/ui`, `@mono/utils`, `@mono/tsconfig`)

### Features

- **CLI**: `npx @ziclo/create-next-boilerplate my-project`
- **Custom import order**: react → next → libraries → @mono → relative → types
- **Auto setup**: Clones from GitHub and configures organization name
- **Zero config**: Works out of the box

---

## [1.0.1] - 2025-10-10

### Fixed

- **Docs**: Fix import auto-organize
- **Docs**: Fix interactive CLI
- **Docs**: Fix automatic organization name replacement
- **Docs**: Fix CLI usage
