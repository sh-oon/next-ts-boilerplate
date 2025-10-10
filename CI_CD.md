# CI/CD 가이드

## GitHub Actions 워크플로우

### 1. CI (Continuous Integration)

`.github/workflows/ci.yml` - PR과 main 브랜치에 푸시 시 자동 실행

**실행 내용:**
- ✅ Lint 체크
- ✅ Type 체크
- ✅ Build 테스트
- ✅ Turbo 캐시 활용

**트리거:**
- `push` to `main`
- Pull Request to `main`

### 2. Publish (NPM 배포)

`.github/workflows/publish.yml` - GitHub Release 생성 시 자동 배포

**실행 내용:**
- ✅ create-hono-boilerplate 빌드
- ✅ npm 자동 배포
- ✅ Provenance 포함 (보안)

**트리거:**
- GitHub Release 발행 시

### 3. Dependabot

`.github/dependabot.yml` - 의존성 자동 업데이트

**기능:**
- 주간 의존성 체크
- 자동 PR 생성
- 워크스페이스별 관리

## NPM 배포 설정

### 1. NPM Token 생성

1. https://www.npmjs.com/ 로그인
2. Account Settings → Access Tokens
3. Generate New Token (Classic Token)
4. Token Type: **Automation**
5. 토큰 복사

### 2. GitHub Secret 등록

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. **New repository secret** 클릭
3. Name: `NPM_TOKEN`
4. Secret: 복사한 npm 토큰 붙여넣기
5. Add secret

### 3. 배포 방법

#### 방법 1: GitHub Release (자동 배포)

```bash
# 1. 버전 업데이트
cd packages/create-hono-boilerplate
# package.json에서 version 변경

# 2. 커밋 및 푸시
git add .
git commit -m "chore: bump version to 1.0.1"
git push

# 3. GitHub에서 Release 생성
# - Tag: v1.0.1
# - Title: v1.0.1
# - Description: 변경 사항 작성
# - Publish release 클릭

# 4. GitHub Actions가 자동으로 npm에 배포!
```

#### 방법 2: 수동 배포

```bash
# 1. 빌드
yarn workspace create-hono-boilerplate build

# 2. npm 로그인
npm login

# 3. 배포
cd packages/create-hono-boilerplate
npm publish --provenance --access public
```

## 워크플로우 모니터링

### CI 확인

- PR 생성 시 자동으로 CI 실행
- 체크 실패 시 머지 불가
- Actions 탭에서 로그 확인

### 배포 확인

```bash
# npm에서 확인
npm view create-hono-boilerplate

# 버전 확인
npm view create-hono-boilerplate version

# 최신 버전 테스트
npm create hono-boilerplate test-project
```

## 트러블슈팅

### CI 실패 시

```bash
# 로컬에서 먼저 체크
yarn lint
yarn type-check
yarn build
```

### NPM 배포 실패 시

**"401 Unauthorized"**
- NPM_TOKEN Secret 확인
- npm 토큰 유효성 확인

**"403 Forbidden"**
- npm 패키지 이름 중복 확인
- npm 계정 권한 확인

**"Version already exists"**
- package.json 버전 업데이트 필요

## 캐시 최적화

### Turbo Cache

- 로컬: `.turbo` 디렉토리
- GitHub Actions: actions/cache로 공유
- 빌드 시간 대폭 단축

### Yarn Cache

- Berry 캐시 활용
- GitHub Actions에서 재사용
- 의존성 설치 시간 단축

## 베스트 프랙티스

1. **PR 체크**: main 브랜치는 항상 CI 통과 상태 유지
2. **Release**: 버전 태그와 CHANGELOG 업데이트
3. **Dependabot**: 주간 의존성 업데이트 리뷰
4. **캐시**: Turbo 캐시로 빌드 속도 최적화

