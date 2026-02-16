# Changeset

변경사항을 분석하여 자동으로 changeset을 생성한다.

## 절차

1. `git log main..HEAD --oneline`으로 커밋 이력 확인
2. `git diff main...HEAD`로 변경사항 분석
3. 변경 타입 결정 (patch/minor/major)
4. changeset 파일 생성 (`.changeset/` 디렉토리)
5. 생성된 파일 확인

## 변경 타입 결정 기준

### Patch (버그 수정, 패치)

**언제 사용:**

- 버그 수정
- 내부 리팩토링 (API 변경 없음)
- 문서 업데이트
- 의존성 패치 업데이트
- 성능 개선 (호환성 유지)

**예시:**

```
- Button hover 색상 버그 수정
- 내부 로직 리팩토링 (props 변경 없음)
- TypeScript 타입 개선
- README 업데이트
```

### Minor (새 기능, 하위 호환)

**언제 사용:**

- 새로운 컴포넌트 추가
- 기존 컴포넌트에 새로운 prop 추가 (선택적)
- 새로운 유틸리티 함수 추가
- 새로운 훅 추가
- 기능 추가 (기존 코드와 호환)

**예시:**

```
- Tooltip 컴포넌트 추가
- Button에 size="xs" 옵션 추가
- useDebounce 훅 추가
- Card에 hoverable prop 추가 (선택적)
```

### Major (Breaking Change)

**언제 사용:**

- 기존 API 변경 (prop 이름 변경, 제거)
- 필수 prop 추가
- 컴포넌트 삭제
- 기본 동작 변경
- peer dependency 메이저 버전 업그레이드

**예시:**

```
- Button variant prop 필수화
- Input의 onChange 시그니처 변경
- deprecated된 Card 컴포넌트 제거
- React 18 → 19 업그레이드 (필수)
```

## Changeset 파일 형식

```markdown
---
"@kim-yeo-appweb-lab/ui": patch
---

변경 내용 한 줄 요약

상세 설명 (선택사항):

- 변경 항목 1
- 변경 항목 2
```

## 규칙

- 변경 타입은 신중하게 선택 (사용자 코드 영향 고려)
- 요약은 한국어, 명확하게 작성
- 여러 변경사항이 있으면 bullet point로 나열
- Breaking change는 반드시 `major` 사용
- 문서만 변경한 경우 changeset 생성하지 않음 (선택사항)

## 예시

### Patch 예시

```markdown
---
"@kim-yeo-appweb-lab/ui": patch
---

Button disabled 상태 스타일 버그 수정

disabled prop이 적용되지 않던 이슈 해결
```

### Minor 예시

```markdown
---
"@kim-yeo-appweb-lab/ui": minor
---

Tooltip 컴포넌트 추가

새로운 Tooltip 컴포넌트 지원:

- position: top, bottom, left, right
- trigger: hover, click
- 다크모드 지원
```

### Major 예시

```markdown
---
"@kim-yeo-appweb-lab/ui": major
---

Button variant prop 필수화

**Breaking Change:**

- variant prop이 이제 필수입니다
- 기존: `<Button>` → 신규: `<Button variant="primary">`

마이그레이션:
모든 Button 컴포넌트에 variant prop 추가 필요
```
