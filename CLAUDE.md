# kim-yeo-ui

범용 디자인 시스템 - React 19 + Tailwind CSS 4 UI 컴포넌트 라이브러리

## 프로젝트 개요

- React 19 + TypeScript 5.9 + Tailwind CSS 4 기반 UI 컴포넌트 라이브러리
- 빌드: tsup (ESM only)
- 패키지 매니저: pnpm
- Node.js: v24.13.0 (.nvmrc)

## 스크립트

- `pnpm dev` - 개발 모드 (tsup watch + Storybook 병렬 실행)
- `pnpm build` - 프로덕션 빌드 (tsup)
- `pnpm build:watch` - 빌드 watch 모드 (tsup --watch)
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
│   ├── tokens.css        # Raw Tokens + Alias Tokens
│   ├── theme.css         # Semantic Tokens + 다크모드
│   ├── base.css          # 기본 스타일
│   └── index.css         # 스타일 엔트리포인트
└── index.ts              # 메인 엔트리포인트
```

### 네이밍 규칙

- 컴포넌트 파일: PascalCase (`Button.tsx`, `Card.tsx`)
- 유틸리티/훅: camelCase (`cn.ts`, `useTheme.ts`)
- 스토리: `[ComponentName].stories.tsx`
- 테스트: `[name].test.tsx`
- 배럴 파일: `index.ts`로 re-export

## 아키텍처 원칙

- **프레임워크 독립적**: Next.js, Vite, CRA 등 어떤 환경에서도 동작
- **React 19+ 전용**: "use client" 지시어, ref as prop 등 React 19 표준 사용
- **Tailwind CSS 4+ 전용**: @theme 블록 기반 토큰 시스템
- **도메인 무관**: 비즈니스 로직이나 도메인 타입 포함 금지
- **Tree-shakeable**: 사용하지 않는 컴포넌트는 번들에서 제외

## 소비자 사용법

```tsx
import { Button, Card, ThemeProvider } from "@kim-yeo/ui";
import "@kim-yeo/ui/styles";
```
