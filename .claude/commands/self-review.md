# Self Review

현재 변경사항을 다각도로 리뷰한다.

## 절차

1. `git diff`로 변경사항 확인
2. 아래 관점별로 리뷰 수행
3. 발견된 이슈를 심각도별로 분류하여 보고

## 리뷰 관점

### Component Architecture

- "use client" 지시어가 적절히 사용되었는가
- 컴포넌트 간 순환 의존이 없는가
- props 인터페이스가 명확하게 정의되었는가
- compound components 패턴이 올바르게 구현되었는가
- import 경로가 상대 경로인가
- React 19 패턴을 올바르게 사용하는가 (ref as prop 등)

### Design System Quality

- 디자인 토큰(CSS 변수)을 올바르게 사용하는가
- 컴포넌트 variants가 일관성 있게 정의되었는가
- Tailwind CSS 클래스가 디자인 토큰 기반인가 (var() 직접 사용 금지)
- 다크모드가 모든 컴포넌트에서 작동하는가
- cn() 유틸리티로 className을 병합하는가

### Accessibility & UX

- 시맨틱 HTML을 사용했는가
- ARIA 속성(role, aria-label 등)이 적절한가
- 키보드 네비게이션(Tab, Enter, Space, ESC, Arrow)이 가능한가
- Focus 관리가 적절한가 (Focus Trap, 초기 포커스 등)
- 반응형 디자인이 적용되었는가

### Code Quality

- TypeScript strict mode 에러가 없는가
- 미사용 변수/import가 없는가
- `import type`이 적절히 사용되었는가 (consistent-type-imports)
- 불필요한 주석이 없는가
- named export를 사용하는가 (default export 지양)
- import 순서가 올바른가 (external → internal → relative)

### Testing

- 테스트가 사용자 행동 중심인가 (Testing Library 원칙)
- 구현 세부사항을 테스트하지 않는가 (toHaveClass 지양)
- 접근성 테스트가 포함되었는가
- act() 경고가 없는가
- 테스트 커버리지가 80% 이상인가

### Documentation (Storybook)

- Storybook 스토리가 모든 variants를 커버하는가
- args와 argTypes가 명확히 정의되었는가
- 컴포넌트 사용 예제가 충분한가
- 스토리 파일명이 컴포넌트명과 일치하는가 (Button.stories.tsx)

## 보고 형식

```
## 리뷰 결과

### 심각 (즉시 수정)
- ...

### 권장 (개선 사항)
- ...

### 참고
- ...
```
