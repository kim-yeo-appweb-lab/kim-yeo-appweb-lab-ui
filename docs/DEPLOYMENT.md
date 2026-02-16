# 배포 가이드

## 자동 배포 파이프라인

이 프로젝트는 GitHub Actions를 통해 3가지 자동화 워크플로우를 제공합니다.

### 1. CI (Pull Request 검증)

**트리거:** PR 생성/업데이트 시
**워크플로우:** `.github/workflows/ci.yaml`

```
Type Check → Lint → Format Check → Build → Test
```

모든 검증이 통과해야 PR merge 가능합니다.

### 2. npm 배포 (Release)

**트리거:** `main` 브랜치에 코드 push 시
**워크플로우:** `.github/workflows/release.yaml`

Changesets 기반 자동 배포:

1. Changeset 파일이 있으면 → Release PR 자동 생성
2. Release PR을 merge하면 → npm 자동 배포

### 3. Storybook 문서 배포

**트리거:** `main` 브랜치에 코드 push 시
**워크플로우:** `.github/workflows/storybook.yaml`

GitHub Pages에 Storybook 자동 배포:

- URL: `https://kim-yeo-appweb-lab.github.io/kim-yeo-ui/`

---

## 초기 설정

### 1. NPM Token 설정

npm 패키지 배포를 위해 NPM_TOKEN이 필요합니다.

#### 1-1. npm Access Token 발급

1. [npmjs.com](https://www.npmjs.com/) 로그인
2. Profile → Access Tokens → Generate New Token
3. Token Type: **Automation** 선택
4. Token 복사

#### 1-2. GitHub Secret 등록

1. Repository Settings → Secrets and variables → Actions
2. **New repository secret** 클릭
3. Name: `NPM_TOKEN`
4. Value: 복사한 npm token 붙여넣기
5. **Add secret** 클릭

### 2. GitHub Pages 활성화

Storybook 문서 배포를 위해 GitHub Pages를 활성화합니다.

1. Repository Settings → Pages
2. Source: **GitHub Actions** 선택
3. 저장

### 3. GitHub Actions 권한 설정

**중요:** Changesets가 Release PR을 자동 생성하려면 GitHub Actions에 PR 생성 권한이 필요합니다.

1. Repository Settings → Actions → General
2. **Workflow permissions** 섹션으로 스크롤
3. 다음 옵션 선택:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests** (체크박스 활성화)
4. **Save** 클릭

**경로:** `https://github.com/{owner}/{repo}/settings/actions`

### 4. npm 패키지 이름 확인

`package.json`에서 패키지 이름이 npm에서 사용 가능한지 확인:

```bash
npm view @kim-yeo-appweb-lab/ui
# 404 에러가 나와야 정상 (아직 배포 안 됨)
```

---

## 배포 프로세스 이해하기

### 전체 흐름도

```
개발자 작업              GitHub Actions 자동화
─────────────────────   ─────────────────────────────

1. 기능 개발
   ├─ feature 브랜치 생성
   ├─ 코드 작성
   └─ changeset 생성
      (.changeset/*.md)

2. PR 생성
   └─ main으로 PR                → CI 워크플로우 실행
                                    ├─ Type Check
                                    ├─ Lint
                                    ├─ Format Check
                                    ├─ Build
                                    └─ Test

3. PR 머지
   └─ main에 merge              → Release 워크플로우 실행
                                    ├─ changeset 파일 확인
                                    ├─ CHANGELOG.md 생성
                                    ├─ package.json 버전 업데이트
                                    └─ Release PR 자동 생성 ✨

4. Release PR 확인
   ├─ 버전 확인 (1.0.0 → 1.1.0)
   ├─ CHANGELOG 확인
   └─ Release PR 머지           → npm 배포 + GitHub Release
                                    ├─ npm publish
                                    ├─ GitHub Release 생성
                                    ├─ Git tag 생성 (v1.1.0)
                                    └─ Storybook 배포

5. 배포 완료! 🎉
   └─ npm에서 설치 가능
      npm install @kim-yeo-appweb-lab/ui@1.1.0
```

### 각 단계 상세 설명

#### 1️⃣ 개발자: 기능 개발 + Changeset 생성

**작업:**

```bash
# 브랜치 생성
git checkout -b feature/tooltip

# 코드 작성
# ... Tooltip 컴포넌트 구현 ...

# Changeset 생성 (중요!)
pnpm changeset
# → Select: minor
# → Summary: "Tooltip 컴포넌트 추가"
```

**생성되는 파일:**

```
.changeset/
  └─ random-name-123.md  # Changeset 파일 생성
```

**Changeset 파일 내용:**

```markdown
---
"@kim-yeo-appweb-lab/ui": minor
---

Tooltip 컴포넌트 추가
```

**핵심:** Changeset 파일이 있어야 Release PR이 생성됩니다!

---

#### 2️⃣ 개발자: PR 생성

**작업:**

```bash
git push origin feature/tooltip
# GitHub에서 PR 생성
```

**GitHub Actions 자동 실행:**

- CI 워크플로우가 자동으로 코드 검증
- 모든 검증 통과 시 머지 가능

---

#### 3️⃣ 개발자: PR 머지 → GitHub Actions: Release PR 자동 생성

**개발자 작업:**

- PR에서 "Merge pull request" 클릭

**GitHub Actions 자동 작업:**

1. **Changeset 파일 확인**

   ```
   .changeset/random-name-123.md 발견!
   ```

2. **버전 계산**

   ```
   현재 버전: 1.0.0
   Changeset 타입: minor
   새 버전: 1.1.0 ✅
   ```

3. **파일 업데이트**

   ```
   ✓ package.json: "version": "1.1.0"
   ✓ CHANGELOG.md 생성/업데이트:

   # @kim-yeo-appweb-lab/ui

   ## 1.1.0

   ### Minor Changes

   - [#8](링크) Tooltip 컴포넌트 추가
   ```

4. **Changeset 파일 삭제**

   ```
   ✓ .changeset/random-name-123.md 삭제
   ```

5. **Release PR 자동 생성**
   ```
   제목: "chore: release"
   브랜치: changeset-release/main → main
   내용: 버전 변경사항 + CHANGELOG
   ```

**결과:** Release PR #7 생성 완료!

---

#### 4️⃣ 개발자: Release PR 머지 → GitHub Actions: npm 배포

**개발자 작업:**

- Release PR 내용 확인 (버전, CHANGELOG)
- "Merge pull request" 클릭

**GitHub Actions 자동 작업:**

1. **빌드**

   ```bash
   pnpm build
   # dist/ 디렉토리 생성
   ```

2. **npm 배포**

   ```bash
   npm publish
   # @kim-yeo-appweb-lab/ui@1.1.0 배포 완료!
   ```

3. **GitHub Release 생성**

   ```
   Tag: v1.1.0
   Title: v1.1.0
   Body: CHANGELOG 내용
   ```

4. **Storybook 배포**
   ```
   GitHub Pages에 자동 배포
   URL: https://kim-yeo-appweb-lab.github.io/kim-yeo-ui/
   ```

**결과:** 모든 배포 완료! 🎉

---

### 실제 예시: Tooltip 컴포넌트 추가

#### 시나리오

Tooltip 컴포넌트를 추가하고 배포하는 전체 과정

#### Day 1: 개발

```bash
# 1. 브랜치 생성
git checkout -b feature/tooltip

# 2. 코드 작성
# src/components/Tooltip/Tooltip.tsx 생성
# src/components/Tooltip/Tooltip.stories.tsx 생성

# 3. 커밋
git add .
git commit -m "feat: Tooltip 컴포넌트 추가"

# 4. Changeset 생성 ⭐
pnpm changeset
# Select: minor (새 기능이므로)
# Summary: "Tooltip 컴포넌트 추가"

# 5. Changeset 커밋
git add .
git commit -m "chore: Tooltip changeset 추가"

# 6. Push
git push origin feature/tooltip
```

**GitHub에서:**

- PR 생성 → CI 통과 → 리뷰 → 머지

---

#### Day 2: Release PR 확인

**main에 머지되면 자동으로:**

1. Release 워크플로우 실행 (약 30초)
2. Release PR #7 자동 생성

**Release PR 내용:**

```markdown
# Releases

## @kim-yeo-appweb-lab/ui@1.1.0

### Minor Changes

- [#8] Tooltip 컴포넌트 추가
```

**변경된 파일:**

- `package.json`: `"version": "1.1.0"`
- `CHANGELOG.md`: 새로운 릴리스 정보 추가
- `.changeset/random-name-123.md`: 삭제됨

---

#### Day 3: npm 배포

**Release PR 머지:**

- "Merge pull request" 클릭

**자동으로 실행됨 (약 1분):**

1. ✅ 빌드
2. ✅ npm 배포 → `@kim-yeo-appweb-lab/ui@1.1.0`
3. ✅ GitHub Release 생성 → `v1.1.0`
4. ✅ Storybook 업데이트

**사용자가 설치 가능:**

```bash
npm install @kim-yeo-appweb-lab/ui@1.1.0
# 또는
npm install @kim-yeo-appweb-lab/ui@latest
```

---

### 주요 파일 역할

| 파일                             | 역할                   | 누가 수정?                  |
| -------------------------------- | ---------------------- | --------------------------- |
| `.changeset/*.md`                | 릴리스할 변경사항 기록 | **개발자** (pnpm changeset) |
| `package.json`                   | 현재 버전 정보         | **GitHub Actions** (자동)   |
| `CHANGELOG.md`                   | 버전별 변경 이력       | **GitHub Actions** (자동)   |
| `.github/workflows/release.yaml` | Release 자동화 설정    | 개발자 (초기 설정만)        |

---

### 자주 묻는 질문 (FAQ)

#### Q1. Changeset을 깜빡하고 PR을 머지했어요!

**A.** 괜찮습니다! 다음에 추가하면 됩니다:

```bash
# main 브랜치에서
git checkout main
git pull

# 새 브랜치 생성
git checkout -b chore/add-missing-changeset

# Changeset 생성
pnpm changeset

# 커밋 & Push
git add .
git commit -m "chore: 누락된 changeset 추가"
git push origin chore/add-missing-changeset

# PR 생성 → 머지
```

---

#### Q2. Release PR이 생성되지 않아요!

**체크리스트:**

1. ✅ `.changeset/*.md` 파일이 있는가?
2. ✅ main 브랜치에 머지되었는가?
3. ✅ GitHub Actions 권한 설정이 되어 있는가?
   - Settings → Actions → "Allow GitHub Actions to create and approve pull requests" 체크

---

#### Q3. 여러 개의 changeset을 한 번에 배포할 수 있나요?

**A.** 네! Release PR은 모든 changeset을 모아서 처리합니다:

```
Changeset 1: minor (Tooltip 추가)
Changeset 2: patch (Button 버그 수정)
Changeset 3: minor (Modal 추가)

결과: 1.0.0 → 1.1.0 (가장 높은 타입인 minor)
```

---

#### Q4. 긴급 배포가 필요한데 Release PR 기다리기 싫어요!

**A.** 로컬에서 수동 배포 가능:

```bash
# 1. main 브랜치로 이동
git checkout main
git pull

# 2. 버전 업데이트
pnpm changeset version

# 3. 변경사항 커밋
git add .
git commit -m "chore: version 업데이트"
git push

# 4. 빌드 & 배포
pnpm build
pnpm release  # npm publish 실행
```

---

## 배포 워크플로우

### 일반적인 개발 흐름

1. **기능 개발 브랜치 생성**

   ```bash
   git checkout -b feature/new-component
   ```

2. **코드 작성 및 커밋**

   ```bash
   git add .
   git commit -m "feat: Button 컴포넌트 추가"
   ```

3. **Changeset 생성**

   ```bash
   pnpm changeset
   ```

   - 변경 타입 선택: `patch` / `minor` / `major`
   - 변경 내용 입력

4. **PR 생성**

   ```bash
   git push origin feature/new-component
   ```

   - GitHub에서 PR 생성
   - CI 워크플로우 자동 실행 (검증)

5. **PR Merge**
   - PR이 `main` 브랜치에 merge되면
   - Release 워크플로우가 **Release PR** 자동 생성

6. **Release PR Merge**
   - Release PR을 merge하면
   - npm에 자동 배포 🚀
   - GitHub Release 자동 생성
   - Storybook 문서 자동 업데이트

### Changeset 예제

#### Patch (버그 수정)

```bash
pnpm changeset
# Select: patch
# Summary: "Button hover 색상 버그 수정"
```

#### Minor (새 기능)

```bash
pnpm changeset
# Select: minor
# Summary: "Tooltip 컴포넌트 추가"
```

#### Major (Breaking Change)

```bash
pnpm changeset
# Select: major
# Summary: "Button API 변경 (variant prop 필수화)"
```

---

## 수동 배포 (로컬)

긴급 배포가 필요한 경우:

```bash
# 1. 버전 업데이트
pnpm changeset version

# 2. 빌드
pnpm build

# 3. npm 배포
pnpm release
```

---

## 트러블슈팅

### NPM_TOKEN 오류

```
npm ERR! code E401
npm ERR! 401 Unauthorized
```

**해결:**

1. npm token이 만료되었는지 확인
2. GitHub Secret의 `NPM_TOKEN` 값 재설정

### GitHub Pages 404

Storybook 배포 후 404 에러가 발생하는 경우:

**해결:**

1. Repository Settings → Pages 확인
2. Source가 **GitHub Actions**로 설정되어 있는지 확인
3. 워크플로우 로그에서 에러 확인

### Changeset이 없음

Release PR이 생성되지 않는 경우:

**해결:**

1. `.changeset/*.md` 파일이 있는지 확인
2. 없다면 `pnpm changeset` 실행 후 커밋

---

## 참고 링크

- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions - changesets/action](https://github.com/changesets/action)
- [npm Publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
