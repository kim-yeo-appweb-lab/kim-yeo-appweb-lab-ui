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
