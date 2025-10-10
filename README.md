# Yarn Workspace 모노레포 보일러플레이트

TypeScript, Next.js, ESLint, Prettier를 사용하는 Yarn Workspace 기반 모노레포 보일러플레이트입니다.

## 프로젝트 구조

```
.
├── apps/
│   └── web/              # Next.js 웹 애플리케이션
├── packages/
│   ├── eslint-config/    # 공유 ESLint 설정
│   ├── tsconfig/         # 공유 TypeScript 설정
│   ├── ui/               # 공유 UI 컴포넌트
│   └── utils/            # 공유 유틸리티 함수
├── package.json          # 루트 package.json (workspace 설정)
├── tsconfig.json         # 루트 TypeScript 설정
├── .eslintrc.js          # 루트 ESLint 설정
├── .prettierrc.js        # Prettier 설정
└── turbo.json            # Turbo 빌드 시스템 설정
```

## 기능

- ✅ **Yarn Berry (v4)**: 최신 Yarn Workspace 기반 모노레포 관리
- ✅ **TypeScript**: 전체 프로젝트에 TypeScript 적용
- ✅ **Next.js**: React 기반 웹 프레임워크
- ✅ **Turbo**: 빠른 빌드 및 캐싱 시스템
- ✅ **ESLint**: 코드 품질 관리
  - import/order 자동 정렬 기능 포함
  - React, TypeScript 규칙 적용
- ✅ **Prettier**: 코드 포맷팅

## 시작하기

### 1. Yarn Berry 활성화

```bash
corepack enable
```

### 2. 의존성 설치

```bash
yarn install
```

### 3. 개발 서버 실행

```bash
yarn dev
```

웹 애플리케이션이 `http://localhost:3000`에서 실행됩니다.

### 4. 빌드

```bash
yarn build
```

### 5. 린트 실행

```bash
yarn lint
```

### 6. 코드 포맷팅

```bash
yarn format
```

## Workspace 패키지

### Apps

#### @mono/web

Next.js 기반의 웹 애플리케이션입니다.

### Packages

#### @mono/eslint-config

공유 ESLint 설정 패키지입니다 (Flat Config 방식).

- `base.js` - TypeScript + import/order
- `react.js` - React 라이브러리용
- `next.js` - Next.js 앱용

#### @mono/tsconfig

공유 TypeScript 설정 패키지입니다.

- `base.json` - 기본 설정
- `nextjs.json` - Next.js 앱용
- `react-library.json` - React 라이브러리용

#### @mono/ui

공유 UI 컴포넌트 라이브러리입니다.

```tsx
import { Button } from '@mono/ui';

<Button onClick={() => console.log('클릭')}>버튼</Button>;
```

#### @mono/utils

공유 유틸리티 함수 라이브러리입니다.

```ts
import { formatDate, debounce } from '@mono/utils';

const today = formatDate(new Date());
const debouncedFn = debounce(() => console.log('실행!'), 300);
```

## 새로운 앱 추가하기

```bash
mkdir -p apps/새로운앱
cd apps/새로운앱
yarn init -y
```

## 새로운 패키지 추가하기

```bash
mkdir -p packages/새로운패키지
cd packages/새로운패키지
yarn init -y
```

## 스크립트

- `yarn dev` - 모든 앱을 개발 모드로 실행
- `yarn build` - 모든 앱과 패키지 빌드
- `yarn lint` - 모든 프로젝트에 대해 린트 실행
- `yarn format` - Prettier로 코드 포맷팅
- `yarn type-check` - TypeScript 타입 체크

## Yarn Berry 특징

- **node_modules 모드**: 호환성을 위해 node_modules linker 사용
- **로컬 캐시**: `.yarn/cache` 디렉토리에 의존성 캐시
- **Zero-installs**: 선택적으로 캐시를 git에 커밋 가능 (현재는 .gitignore 처리)
- **Workspace 프로토콜**: 내부 패키지는 `*` 버전 사용

### VSCode 설정

Yarn Berry를 VSCode에서 사용하려면:

1. `ZipFS` 익스텐션 설치 (권장)
2. TypeScript 버전 선택 시 "Use Workspace Version" 선택
3. `.yarn/sdks` 디렉토리가 자동으로 생성됨

## ESLint import/order

import 구문은 다음 순서로 자동 정렬됩니다:

1. `react` 관련 import
2. `next` 관련 import
3. 외부 라이브러리 (node_modules)
4. 내부 패키지 (`@mono/*`)
5. 상대 경로 import
6. 타입 import

각 그룹 사이에는 빈 줄이 자동으로 추가되며, 알파벳 순으로 정렬됩니다.
