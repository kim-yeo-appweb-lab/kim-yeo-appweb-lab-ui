# Git 브랜칭 전략

## 개요

이 프로젝트는 **GitHub Flow** 기반의 단순하고 효율적인 브랜칭 모델을 사용합니다.

### 핵심 원칙

- `main` 브랜치는 항상 배포 가능한 상태 유지
- 모든 작업은 기능별 브랜치에서 진행
- Pull Request를 통한 코드 리뷰 필수
- CI/CD 자동 검증 통과 필수

---

## 브랜치 명명 규칙

### 기본 형식

```
<타입>/<설명>
```

### 타입별 용도

| 타입        | 용도                      | 예시                             |
| ----------- | ------------------------- | -------------------------------- |
| `feature/`  | 새로운 기능 개발          | `feature/button-component`       |
| `fix/`      | 버그 수정                 | `fix/button-hover-color`         |
| `hotfix/`   | 긴급 수정 (프로덕션 버그) | `hotfix/security-vulnerability`  |
| `refactor/` | 리팩토링 (기능 변경 없음) | `refactor/button-internal-logic` |
| `docs/`     | 문서 작업                 | `docs/update-readme`             |
| `chore/`    | 빌드/설정/도구 변경       | `chore/update-dependencies`      |

### 명명 규칙

- **영문 소문자 사용**
- **단어 구분은 하이픈(`-`)** 사용
- **간결하고 명확하게** 작성 (2~4단어 권장)
- **이슈 번호 포함** 가능: `feature/123-add-tooltip`

### 예시

**좋은 예:**

```
feature/tooltip-component
fix/button-disabled-state
refactor/theme-provider
docs/branch-strategy
```

**나쁜 예:**

```
feature/AddTooltipComponentWithCustomStyling  # 너무 길고 PascalCase
fix_button                                     # 언더스코어 사용
new-feature                                    # 타입 누락
```

---

## 워크플로우

### 1. 브랜치 생성

main 브랜치에서 최신 코드를 pull 받은 후 작업 브랜치 생성:

```bash
# main 브랜치로 이동
git checkout main

# 최신 코드 pull
git pull origin main

# 새 브랜치 생성 및 이동
git checkout -b feature/new-component
```

### 2. 작업 및 커밋

코드 작성 후 [Conventional Commits](https://www.conventionalcommits.org/) 형식으로 커밋:

```bash
# 변경 사항 스테이징
git add .

# 커밋 (한국어, 이모지 미사용)
git commit -m "feat: Button 컴포넌트 추가"
```

**커밋 타입:**

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

### 3. 원격 저장소에 Push

```bash
git push origin feature/new-component
```

### 4. Pull Request 생성

1. GitHub에서 **New Pull Request** 클릭
2. Base: `main` ← Compare: `feature/new-component`
3. PR 제목과 설명 작성
4. Reviewer 지정 (선택)
5. **Create Pull Request** 클릭

### 5. CI 자동 검증

PR 생성 시 자동으로 CI 워크플로우 실행:

```
Type Check → Lint → Format Check → Build → Test
```

모든 검증이 통과해야 merge 가능합니다.

### 6. 코드 리뷰 및 Merge

1. 팀원의 코드 리뷰 진행
2. 필요시 수정 후 추가 커밋
3. 모든 승인 완료 후 **Merge Pull Request**
4. 브랜치 삭제 (선택)

---

## 자동 검증

### 브랜치명 검증 (참고용)

다음 규칙을 권장합니다 (자동 검증은 미적용):

- 타입이 유효한지 확인: `feature/`, `fix/`, `hotfix/`, `refactor/`, `docs/`, `chore/`
- 설명이 있는지 확인: `feature/` (X) → `feature/tooltip` (O)
- 소문자와 하이픈만 사용: `Feature/MyComponent` (X) → `feature/my-component` (O)

### Git Hooks 실행 순서

#### Pre-commit (커밋 전)

```
Prettier → ESLint
```

Staged 파일만 대상으로 포맷팅 및 린트 실행

#### Pre-push (Push 전)

```
Type Check + Lint + Format Check (병렬 실행)
```

전체 프로젝트 대상 검증

---

## 필수 규칙

### 1. main 브랜치 직접 작업 금지

❌ **절대 금지:**

```bash
git checkout main
# main에서 직접 작업
git commit -m "feat: 직접 커밋"  # 금지!
```

✅ **올바른 방법:**

```bash
git checkout -b feature/new-work
# 브랜치에서 작업
git commit -m "feat: 새 기능 추가"
```

### 2. Pull Request 없이 Merge 금지

- 모든 코드 변경은 PR을 통해서만 main에 반영
- 혼자 작업하더라도 PR 생성 필수 (코드 리뷰 기록 보존)

### 3. Conventional Commits 준수

- 커밋 메시지는 `<타입>: <제목>` 형식 엄수
- 한국어 작성, 이모지 사용 금지
- 작은 단위로 나눠서 커밋 (한 번에 여러 기능 커밋 금지)

### 4. CI/CD 통과 필수

- PR merge 전 모든 CI 검증 통과 필수
- 실패 시 원인 파악 후 수정

---

## 시나리오별 명령어

### 새 기능 개발

```bash
# 1. main에서 최신 코드 pull
git checkout main
git pull origin main

# 2. feature 브랜치 생성
git checkout -b feature/tooltip

# 3. 작업 및 커밋
git add .
git commit -m "feat: Tooltip 컴포넌트 추가"

# 4. push 및 PR 생성
git push origin feature/tooltip
# GitHub에서 PR 생성
```

### 버그 수정

```bash
# 1. fix 브랜치 생성
git checkout main
git pull origin main
git checkout -b fix/button-hover

# 2. 버그 수정 및 커밋
git add .
git commit -m "fix: Button hover 상태 색상 버그 수정"

# 3. push 및 PR 생성
git push origin fix/button-hover
```

### 긴급 수정 (Hotfix)

```bash
# 1. hotfix 브랜치 생성
git checkout main
git pull origin main
git checkout -b hotfix/security-patch

# 2. 긴급 수정 및 커밋
git add .
git commit -m "fix: XSS 취약점 긴급 패치"

# 3. push 및 PR 생성 (우선 리뷰)
git push origin hotfix/security-patch
```

### main 브랜치 최신화 (Rebase)

작업 중인 브랜치에 main의 최신 변경사항 반영:

```bash
# 1. main 최신화
git checkout main
git pull origin main

# 2. 작업 브랜치로 돌아가기
git checkout feature/my-work

# 3. rebase로 main 변경사항 적용
git rebase main

# 4. 충돌 해결 (있는 경우)
# - 파일 수정 후
git add .
git rebase --continue

# 5. force push (rebase 이후)
git push origin feature/my-work --force-with-lease
```

### 마지막 커밋 수정

```bash
# 파일 수정 후
git add .
git commit --amend --no-edit

# 또는 커밋 메시지도 함께 수정
git commit --amend -m "feat: 수정된 커밋 메시지"

# force push
git push origin feature/my-work --force-with-lease
```

---

## 참고

- [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [CLAUDE.md](../CLAUDE.md) - 프로젝트 코드 규칙 및 워크플로우
