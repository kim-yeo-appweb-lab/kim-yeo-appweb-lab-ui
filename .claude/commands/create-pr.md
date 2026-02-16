# Create PR

현재 브랜치의 변경사항으로 Pull Request를 생성한다.

## 절차

1. `git log main..HEAD --oneline`으로 커밋 이력 확인
2. `git diff main...HEAD`로 전체 변경사항 파악
3. PR 제목과 본문 작성
4. **Changeset 생성** (`pnpm changeset` - 버전 관리 필수)
5. `gh pr create`로 PR 생성

## 브랜치 컨벤션

```
{type}/{description}
```

- `feat/` - 새 컴포넌트 추가 또는 기능 추가
- `fix/` - 버그 수정
- `refactor/` - 리팩토링 (기능 변경 없음)
- `chore/` - 설정/빌드/의존성 업데이트
- `docs/` - 문서/Storybook 개선
- `test/` - 테스트 추가/수정

예: `feat/add-tooltip-component`, `fix/button-focus-style`, `docs/update-design-tokens`

## PR 형식

```markdown
## Summary

- 변경사항 1~3줄 요약

## Component Changes

- **추가**: 새로 추가된 컴포넌트 (있는 경우)
- **수정**: 수정된 컴포넌트 (있는 경우)
- **삭제**: 삭제된 컴포넌트 (있는 경우)

## Design Tokens

- 디자인 토큰 변경사항 (있는 경우)

## Breaking Changes

- 호환성이 깨지는 변경사항 (있는 경우)
- 마이그레이션 가이드

## Test Plan

- [ ] 모든 테스트 통과 (`pnpm test`)
- [ ] 빌드 성공 (`pnpm build`)
- [ ] Storybook 시각적 확인
- [ ] 접근성 테스트 (키보드 네비게이션, ARIA)
- [ ] 다크모드 확인
- [ ] 반응형 확인
```

## 규칙

- PR 제목은 70자 이내
- base 브랜치는 `main`
- **Changeset 필수**: `pnpm changeset`로 변경사항 기록
- push 전 체크리스트:
  - [ ] `pnpm lint` - ESLint 검사
  - [ ] `pnpm type:check` - TypeScript 타입 검사
  - [ ] `pnpm format:check` - Prettier 포매팅 검사
  - [ ] `pnpm test` - 테스트 통과
  - [ ] `pnpm build` - 빌드 성공
  - [ ] Storybook에서 시각적 회귀 없는지 확인
