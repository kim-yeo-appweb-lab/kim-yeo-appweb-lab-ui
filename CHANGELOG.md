# @kim-yeo-appweb-lab/ui

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
