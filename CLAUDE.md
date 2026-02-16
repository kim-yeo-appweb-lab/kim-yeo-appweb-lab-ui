# kim-yeo-ui

범용 디자인 시스템 - React 19 + Tailwind CSS 4 UI 컴포넌트 라이브러리

## 프로젝트 개요

- React 19 + TypeScript 5.9 + Tailwind CSS 4 기반 UI 컴포넌트 라이브러리
- 빌드: Rollup + esbuild (ESM only, preserveModules)
- 패키지 매니저: pnpm
- Node.js: v24.13.0 (.nvmrc)

## 스크립트

- `pnpm dev` - 개발 모드 (Rollup watch + Storybook 병렬 실행)
- `pnpm build` - 프로덕션 빌드 (Rollup + tsc)
- `pnpm build:watch` - 빌드 watch 모드 (Rollup --watch)
- `pnpm storybook` - Storybook 개발 서버 (port 6006)
- `pnpm build-storybook` - Storybook 빌드
- `pnpm lint` / `pnpm lint:fix` - ESLint
- `pnpm format` / `pnpm format:check` - Prettier
- `pnpm type:check` - TypeScript 타입 체크
- `pnpm test` / `pnpm test:watch` - Vitest 테스트
- `pnpm changeset` - 변경 사항 기록
- `pnpm version` - 버전 업데이트 (changeset version)
- `pnpm release` - 빌드 + npm 배포

## 코드 규칙

### Import

- 상대 경로 사용 (path alias 미사용)
- named export 우선 (default export 지양)
- 순서: external → internal → relative (`eslint-plugin-simple-import-sort`로 자동 정렬)
- 타입 import: `import { type Foo }` 인라인 형식 (`consistent-type-imports`)

### 커밋 컨벤션

- Conventional Commits 형식: `<타입>: <제목>`
- 한국어 작성, 이모지 사용 금지
- 타입: feat, fix, docs, style, refactor, perf, test, chore
- 작은 작업 단위로 분리하여 커밋

### Git Hooks (lefthook)

- **pre-commit**: Prettier 포맷팅 → ESLint 검사 (staged 파일 대상)
- **pre-push**: type-check + lint + format:check (병렬 실행)

## 디렉토리 구조

```
src/
├── components/           # UI 컴포넌트
│   └── index.ts
├── hooks/                # 커스텀 훅
│   └── index.ts
├── lib/                  # 프로바이더, 컨텍스트
│   └── index.ts
├── utils/                # 유틸리티 함수
│   └── index.ts
├── styles/               # 디자인 토큰 및 테마
│   ├── tokens.css        # Raw Tokens (@theme) + Alias Tokens (:root)
│   ├── theme.css         # Semantic Tokens + 다크모드 값 전환 + @theme inline 등록
│   ├── base.css          # 기본 스타일 + 스크롤바 + 테마 전환 애니메이션
│   └── index.css         # 스타일 엔트리포인트
├── testing/              # 테스트 유틸리티
│   ├── setup.ts          # 테스트 설정
│   └── render.tsx        # 커스텀 렌더링 유틸리티
└── index.ts              # 메인 엔트리포인트
```

### 네이밍 규칙

- 컴포넌트 파일: PascalCase (`Button.tsx`, `Card.tsx`)
- 유틸리티/훅: camelCase (`cn.ts`, `useTheme.ts`)
- 스토리: `[ComponentName].stories.tsx`
- 테스트: `[name].test.tsx`
- 배럴 파일: `index.ts`로 re-export

## 테스트

### 테스트 전략

- **테스트 트로피** 전략 채택: 통합 테스트 중심 (사용자 관점)
- 정적 분석(TypeScript, ESLint) → 단위 테스트 → 통합 테스트 → E2E 순서
- 통합 테스트 60%, 단위 테스트 30%, E2E 10% 비중

### 테스트 도구

- Vitest + jsdom + @testing-library/react + @testing-library/user-event
- 커스텀 렌더 유틸리티: `src/testing/render.tsx`
- 테스트 setup: `src/testing/setup.ts`

### 테스트 작성 규칙

- 테스트 파일은 소스 파일과 같은 디렉토리에 위치 (colocation)
- 네이밍: `[name].test.tsx` (컴포넌트), `[name].test.ts` (유틸리티/훅)
- `describe` - `it` 패턴, 테스트명은 한국어로 작성
- `render`, `screen`, `userEvent`는 `src/testing/render.tsx`에서 import
- `fireEvent` 대신 `userEvent` 사용
- DOM 쿼리 우선순위: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- 내부 구현이 아닌 사용자 관점으로 테스트 (CSS 선택자, 내부 상태 직접 접근 금지)
- 스냅샷 테스트 사용 금지

### 커버리지

- 최소 기준: Statements, Branches, Functions, Lines 각 80%
- 커버리지 제외: stories, test 파일, index.ts(배럴), testing/\*\*

### TDD 워크플로우

1. 실패하는 테스트 작성 (Red)
2. 테스트를 통과하는 최소한의 코드 작성 (Green)
3. 리팩토링 (Refactor)
4. `pnpm test:watch`로 실시간 피드백 확인

### 새 컴포넌트 추가 시

1. `ComponentName.test.tsx` 테스트 파일 먼저 생성
2. 기본 렌더링, props, 사용자 상호작용, 접근성 테스트 작성
3. 컴포넌트 구현
4. `pnpm test` 전체 통과 확인

## 아키텍처 원칙

- **프레임워크 독립적**: Next.js, Vite, CRA 등 어떤 환경에서도 동작
- **React 19+ 전용**: "use client" 지시어, ref as prop 등 React 19 표준 사용
- **Tailwind CSS 4+ 전용**: @theme 블록 기반 토큰 시스템
- **도메인 무관**: 비즈니스 로직이나 도메인 타입 포함 금지
- **Tree-shakeable**: 사용하지 않는 컴포넌트는 번들에서 제외

## 소비자 사용법

```tsx
import { Button, Card, ThemeProvider } from "@kim-yeo-appweb-lab/ui";
import "@kim-yeo-appweb-lab/ui/styles";
```

## 참고 문서

- `docs/BRANCH_STRATEGY.md` - Git 브랜칭 전략 및 워크플로우 가이드
- `docs/DEPLOYMENT.md` - GitHub Actions 자동 배포 설정 가이드
- `docs/DESIGN_TOKENS.md` - 3단계 토큰 시스템 및 커스터마이징 가이드
- `docs/TESTING.md` - 테스트 전략, 작성 가이드라인, 실행 방법
- `docs/README.md` - 전체 문서 목차
