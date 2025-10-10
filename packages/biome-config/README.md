# @mono/biome-config

모노레포 전체에서 사용하는 공유 Biome 설정입니다.

## 설정 파일

- `biome.json` - 기본 TypeScript 설정
- `biome.react.json` - React 컴포넌트용 설정 (a11y 포함)
- `biome.library.json` - 라이브러리용 설정 (엄격한 규칙)

## 사용법

### 기본 (TypeScript만)

```json
{
  "extends": ["../../packages/biome-config/biome.json"]
}
```

### React 라이브러리

```json
{
  "extends": ["../../packages/biome-config/biome.react.json"]
}
```

### 일반 라이브러리

```json
{
  "extends": ["../../packages/biome-config/biome.library.json"]
}
```

## 포함된 규칙

- TypeScript 지원
- Import 자동 정렬
- 접근성 규칙 (React)
- 코드 품질 관리
- 일관된 포맷팅

