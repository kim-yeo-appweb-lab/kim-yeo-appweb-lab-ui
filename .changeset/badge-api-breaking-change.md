---
"@kim-yeo-appweb-lab/ui": minor
---

Badge colorScheme API 개선 및 테스트 인프라 구축

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
