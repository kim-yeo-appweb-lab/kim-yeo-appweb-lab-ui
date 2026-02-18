# @kim-yeo-appweb-lab/ui

## 1.2.0

### Minor Changes

- [#20](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/20) [`820c035`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/820c0358e02d626e6619d76ea2d12197172ebd77) Thanks [@chan9yu](https://github.com/chan9yu)! - 레이아웃 컴포넌트 추가 및 디자인 시스템 개선
  - AspectRatio, Container, Grid, Stack 레이아웃 컴포넌트 추가
  - Card 컴포넌트에 padding prop 추가 (sm/md/lg/responsive)
  - Button, Input 컴포넌트 sm, md 사이즈 높이 조정 (h-8→h-9, h-10→h-11)

## 1.1.5

### Patch Changes

- [#16](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/16) [`c39c394`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/c39c394d671c3986d6a376d40e9e383efb94db14) Thanks [@chan9yu](https://github.com/chan9yu)! - 빌드 시스템을 tsup에서 Rollup으로 마이그레이션하여 Next.js SSR에서 발생하는 `createContext is not a function` 에러를 해결한다.
  - `preserveModules`로 소스 1:1 파일 구조를 유지하여 chunk 파일 생성을 방지하고 `"use client"` 지시어를 보존

## 1.1.4

### Patch Changes

- [#16](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/16) [`c39c394`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/c39c394d671c3986d6a376d40e9e383efb94db14) Thanks [@chan9yu](https://github.com/chan9yu)! - Server Component에서 유틸리티 함수 사용 시 발생하는 런타임 에러를 수정하고, Badge 컴포넌트의 라이트 모드 가독성을 개선한다.
  - `tsup` 빌드 설정에서 code splitting을 활성화하고 `"use client"` 지시어를 소스 파일 기준으로 선별 삽입하도록 변경
  - Badge subtle variant의 배경 불투명도를 10%에서 15%로 상향하여 라이트 모드에서의 시인성 향상
  - `package.json` exports에 `default` 조건을 추가하여 번들러 호환성 개선

## 1.1.3

### Patch Changes

- [#14](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/14) [`273946f`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/273946fc49450a430b24d48e6d39186d6e9b3fd3) Thanks [@chan9yu](https://github.com/chan9yu)! - 테마 전환 시스템 및 타입 안정성 개선

  **개선 사항:**
  - View Transition API 통합으로 부드러운 테마 전환 (지원 브라우저)
  - requestAnimationFrame cleanup 추가로 메모리 누수 방지
  - PropsWithChildren 패턴으로 코드 일관성 향상
  - 테스트 유틸리티 타입 정의 명시화

  **문서:**
  - 디자인 토큰 문서를 실제 코드와 100% 일치하도록 전면 재작성
  - 3계층 토큰 시스템 상세 설명 추가

## 1.1.2

### Patch Changes

- [#12](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/12) [`2246d55`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/2246d55a5da4c85bc9f27245bfc68dc33197f2bf) Thanks [@chan9yu](https://github.com/chan9yu)! - SSR 호환성 강화 및 다크 모드 토큰 누락 수정
  - `getSystemTheme()`, `setStoredTheme()` SSR 가드 추가 (Next.js 프리렌더링 호환)
  - 다크 모드에서 `--color-ring` 토큰 누락 수정 (포커스 링 가시성 보장)

## 1.1.1

### Patch Changes

- [#10](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/10) [`fbc382b`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/fbc382be6a67c08675e593211a573b33b08df65e) Thanks [@chan9yu](https://github.com/chan9yu)! - 소비자 환경 Tailwind 클래스 스캔 문제 수정
  - 라이브러리 스타일에 `@source` 디렉티브 추가하여 소비자 프로젝트에서 별도 설정 없이 Tailwind 클래스 자동 생성
  - README 문서에 `@source` 동작 설명 추가
  - GitHub 저장소 URL 수정

## 1.1.0

### Minor Changes

- [#8](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/8) [`f13eb05`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/f13eb055c980cfd04fcf7f1813b6f693963e6202) Thanks [@chan9yu](https://github.com/chan9yu)! - Badge colorScheme API 개선 및 테스트 인프라 구축

  **주요 변경사항:**

  Badge 컴포넌트의 colorScheme prop이 의미 기반 naming으로 개선되었습니다:
  - ❌ 기존: `green`, `red`, `amber`, `blue`, `gray`
  - ✅ 신규: `success`, `danger`, `warning`, `info`, `neutral`

  **마이그레이션 가이드:**

  ```tsx
  // Before
  <Badge colorScheme="green">활성</Badge>
  <Badge colorScheme="red">긴급</Badge>
  <Badge colorScheme="amber">경고</Badge>
  <Badge colorScheme="blue">정보</Badge>

  // After
  <Badge colorScheme="success">활성</Badge>
  <Badge colorScheme="danger">긴급</Badge>
  <Badge colorScheme="warning">경고</Badge>
  <Badge colorScheme="info">정보</Badge>
  ```

  **새로운 기능:**
  - 테스트 인프라 구축 (187개 테스트, 80% 커버리지)
  - Tree-shaking 지원으로 번들 크기 최적화
  - Testing Trophy 전략 적용 (통합 테스트 중심)

  **개선사항:**
  - 컴포넌트별 폴더 구조로 재조직 (colocation 원칙)
  - Storybook 문서 구조 개편
  - 전체 문서 업데이트 (TESTING.md, BEST_PRACTICES_2026.md 추가)

## 1.0.0

### Major Changes

- [#3](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/pull/3) [`34a59dc`](https://github.com/kim-yeo-appweb-lab/kim-yeo-appweb-lab-ui/commit/34a59dca153ece2ec6b487dd4a7f9e9442085b77) Thanks [@chan9yu](https://github.com/chan9yu)! - 🎉 Initial release

  범용 디자인 시스템 첫 릴리스

  ## 포함된 컴포넌트 (17개)
  - Avatar, Badge, Breadcrumb, Button, Card
  - EmptyState, Filter, Input, Modal, Pagination
  - SectionHeader, Select, Skeleton, Tab, TagInput
  - Textarea, ThemeToggle

  ## 주요 기능
  - React 19 + Tailwind CSS 4 기반
  - 프레임워크 독립적 (Next.js, Vite, CRA 모두 지원)
  - 다크모드 지원 (ThemeProvider + useTheme)
  - 3단계 디자인 토큰 시스템 (Raw → Alias → Semantic)
  - Tree-shakeable ESM 빌드
  - TypeScript 타입 정의 포함
  - Storybook 문서화
