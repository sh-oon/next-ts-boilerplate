# @ziclo/create-next-boilerplate

Yarn Berry 기반 Next.js 모노레포 보일러플레이트를 빠르게 생성하는 CLI 도구입니다.

## 사용법

### NPM

```bash
npm create @ziclo/next-boilerplate my-project
# 또는
npx @ziclo/create-next-boilerplate my-project
```

### Yarn

```bash
yarn create @ziclo/next-boilerplate my-project
```

### PNPM

```bash
pnpm create @ziclo/next-boilerplate my-project
```

## 생성되는 프로젝트

- ✅ Yarn Berry (v4) workspace
- ✅ TypeScript 설정
- ✅ Biome (린터 + 포매터)
- ✅ Turbo (빌드 시스템)
- ✅ 예제 Next.js 앱
- ✅ 공유 패키지 (`@your-org/ui`, `@your-org/utils`)

## CLI 옵션

```bash
# 프로젝트명 지정
npx @ziclo/create-next-boilerplate my-awesome-project

# 대화형 모드
npx @ziclo/create-next-boilerplate
```

## 생성 후

```bash
cd my-project
yarn dev
```

## 라이선스

MIT
