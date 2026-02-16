# @kim-yeo-appweb-lab/ui

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
