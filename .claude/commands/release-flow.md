# Release Flow

변경사항을 검증하고, 커밋 → Changeset → 푸시 → PR 생성까지 전체 릴리즈 플로우를 자동으로 수행한다.

**각 단계에서 실패 시 즉시 중단하고 사용자에게 보고한다.**

## 단계 1: 사전 검증

모든 검증을 통과해야 다음 단계로 진행한다.

```bash
pnpm lint
pnpm type:check
pnpm format:check
pnpm test
pnpm build
```

- 하나라도 실패하면 중단하고 에러 내용 보고
- 포맷팅 에러는 `pnpm format`으로 자동 수정 후 재검증 가능 (사용자 확인 필요)

## 단계 2: 셀프 리뷰

`/self-review` 커맨드의 기준으로 변경사항을 리뷰한다.

- `git diff`로 변경사항 확인
- Component Architecture, Design System Quality, Accessibility, Code Quality, Testing, Documentation 관점으로 리뷰
- **심각** 이슈가 발견되면 중단하고 보고
- **권장** 이슈는 보고 후 사용자 판단에 따라 계속 진행

## 단계 3: 커밋

`/commit` 커맨드의 기준으로 커밋을 생성한다.

- `git status`와 `git diff`로 변경사항 확인
- 변경사항을 논리적 단위로 분리하여 각각 커밋
- Conventional Commits 형식: `{type}: {subject}`
- 한국어, 이모지 사용 금지
- 커밋 완료 후 `git status`로 결과 확인

## 단계 4: 브랜치 확인

- 현재 브랜치가 `main`이면 새 브랜치 생성 권고 (사용자 확인)
- 브랜치명 컨벤션: `{type}/{description}`
  - `feat/` - 새 기능
  - `fix/` - 버그 수정
  - `refactor/` - 리팩토링
  - `chore/` - 설정/빌드
  - `docs/` - 문서
  - `test/` - 테스트

## 단계 5: Changeset 생성

`/changeset` 커맨드의 기준으로 changeset을 생성한다.

- `git log main..HEAD --oneline`으로 커밋 이력 확인
- `git diff main...HEAD`로 전체 변경사항 분석
- 변경 타입 결정:
  - **patch** - 버그 수정, 리팩토링, 문서
  - **minor** - 새 컴포넌트, 새 prop, 새 기능
  - **major** - Breaking Change (API 변경, 삭제)
- `.changeset/` 디렉토리에 파일 생성
- changeset 파일 커밋: `chore: changeset 추가`

## 단계 6: 푸시

- 리모트 브랜치가 없으면 `git push -u origin {branch}` 실행
- 리모트 브랜치가 있으면 `git push` 실행

## 단계 7: PR 생성

`/create-pr` 커맨드의 기준으로 PR을 생성한다.

- `git log main..HEAD --oneline`으로 커밋 이력 확인
- PR 제목 (70자 이내) 및 본문 작성
- base 브랜치: `main`
- PR 형식:

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

- PR URL을 사용자에게 보고

## 단계 8: 완료 보고

모든 단계 완료 후 요약 보고:

```
## Release Flow 완료

- 검증: lint ✅ | type-check ✅ | format ✅ | test ✅ | build ✅
- 커밋: {N}개 커밋 생성
- Changeset: {type} ({version 예상})
- 브랜치: {branch-name}
- PR: {PR URL}

### 다음 단계
- PR 리뷰 및 머지
- 머지 후 Changesets bot이 자동으로 Release PR 생성
- Release PR 머지 시 npm 배포 + GitHub Release 생성
```

## 규칙

- 각 단계에서 사용자에게 진행 상황 보고
- 파괴적 작업(force push, branch 삭제 등) 절대 금지
- main 브랜치에 직접 push 금지 (사용자가 명시적으로 허용한 경우 제외)
- 에러 발생 시 근본 원인 분석 후 해결 방안 제시
- 의미 없는 타이머나 우회 금지
