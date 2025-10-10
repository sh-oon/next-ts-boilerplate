# @mono/eslint-config

모노레포 전체에서 사용하는 공유 ESLint 설정입니다.

## 설정 파일 (Flat Config)

- `base.js` - 기본 TypeScript + import/order 설정
- `react.js` - React 라이브러리용 설정 (base 포함)
- `next.js` - Next.js 앱용 설정 (react 포함)

## 포함된 기능

- TypeScript 지원
- React 및 React Hooks 규칙
- import/order 자동 정렬
- Prettier 통합

## 사용법

### 기본 (TypeScript만)

```js
import baseConfig from '@mono/eslint-config/base';

export default [...baseConfig];
```

### React 라이브러리

```js
import reactConfig from '@mono/eslint-config/react';

export default [...reactConfig];
```

### Next.js 앱

```js
import nextConfig from '@mono/eslint-config/next';

export default [...nextConfig];
```

