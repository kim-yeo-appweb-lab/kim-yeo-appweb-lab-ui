# 테스트 가이드

@kim-yeo-appweb-lab/ui의 테스트 전략, 작성 가이드라인, 실행 방법을 설명합니다.

## 테스트 전략

### 테스트 트로피 (Testing Trophy)

이 프로젝트는 Kent C. Dodds의 **테스트 트로피** 전략을 채택합니다.

```
        ╱╲
       ╱ E2E ╲          적음 - 필요 시에만
      ╱────────╲
     ╱ 통합 테스트 ╲      가장 많음 (핵심)
    ╱──────────────╲
   ╱  단위 테스트     ╲    유틸리티, 순수 함수
  ╱────────────────────╲
 ╱   정적 분석 (TS/ESLint) ╲   자동화
╱──────────────────────────╲
```

### 선정 근거

UI 컴포넌트 라이브러리에서 **통합 테스트 중심** 접근이 적합한 이유:

1. **사용자 관점 테스트**: 컴포넌트는 렌더링 결과와 사용자 상호작용이 핵심이므로, 내부 구현이 아닌 동작을 검증
2. **리팩토링 내성**: 내부 구현 변경 시에도 테스트가 깨지지 않아 유지보수 비용 절감
3. **높은 신뢰도**: 실제 DOM 환경에서 컴포넌트가 올바르게 동작하는지 검증
4. **정적 분석 기반**: TypeScript strict mode와 ESLint가 타입 오류와 코드 품질을 자동으로 보장

### 테스트 유형별 비중

| 테스트 유형 | 비중 | 대상                       | 도구                  |
| ----------- | ---- | -------------------------- | --------------------- |
| 정적 분석   | 자동 | 전체 코드베이스            | TypeScript, ESLint    |
| 통합 테스트 | 60%  | 컴포넌트 렌더링 + 상호작용 | Testing Library       |
| 단위 테스트 | 30%  | 유틸리티, 훅, 순수 함수    | Vitest                |
| E2E 테스트  | 10%  | 복합 시나리오 (필요 시)    | Storybook Interaction |

---

## 기술 스택

| 도구                                                                                   | 버전     | 역할                       |
| -------------------------------------------------------------------------------------- | -------- | -------------------------- |
| [Vitest](https://vitest.dev/)                                                          | ^3.0.0   | 테스트 러너                |
| [jsdom](https://github.com/jsdom/jsdom)                                                | ^28.1.0  | DOM 환경                   |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) | ^16.0.0  | 컴포넌트 렌더링 및 쿼리    |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro)       | ^14.6.1  | 사용자 상호작용 시뮬레이션 |
| [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)       | ^6.0.0   | DOM 매칭 확장              |
| V8 Coverage                                                                            | built-in | 코드 커버리지              |

---

## 테스트 실행

### 기본 명령어

```bash
# 전체 테스트 실행
pnpm test

# Watch 모드 (개발 중 권장)
pnpm test:watch

# 커버리지 포함 실행
pnpm test -- --coverage

# 특정 파일 실행
pnpm test -- src/components/Button/Button.test.tsx

# 특정 패턴 매칭
pnpm test -- --grep "Button"
```

### Watch 모드 단축키

`pnpm test:watch` 실행 후 사용 가능한 키:

- `a` - 전체 테스트 실행
- `f` - 실패한 테스트만 실행
- `p` - 파일명으로 필터
- `t` - 테스트명으로 필터
- `q` - 종료

---

## 테스트 환경 구성

### Vitest 설정 (`vitest.config.ts`)

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/testing/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		exclude: ["node_modules", "dist", "**/*.stories.tsx"],
		css: false,
		coverage: {
			provider: "v8",
			include: ["src/**/*.{ts,tsx}"],
			exclude: ["src/**/*.stories.tsx", "src/**/*.test.{ts,tsx}", "src/**/index.ts", "src/testing/**"],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80
			}
		}
	}
});
```

### 테스트 Setup (`src/testing/setup.ts`)

테스트 실행 전 자동으로 로드되는 설정:

- jest-dom matchers: `toBeInTheDocument()`, `toHaveClass()` 등 DOM 매칭 함수 확장
- HTMLDialogElement 모킹: jsdom 미지원 `showModal()`, `close()` 메서드 폴리필
- matchMedia 모킹: 미디어 쿼리 API 모킹

### 테스트 유틸리티 (`src/testing/render.tsx`)

테스트 작성용 커스텀 렌더링 유틸리티:

```tsx
import { render, renderWithoutProviders, screen, userEvent, within } from "../testing/render";
```

| 함수                     | 용도                                |
| ------------------------ | ----------------------------------- |
| `render`                 | ThemeProvider 감싼 렌더링 (기본)    |
| `renderWithoutProviders` | 순수 렌더링 (Provider 없음)         |
| `screen`                 | DOM 쿼리 (`getByRole`, `getByText`) |
| `userEvent`              | 사용자 상호작용 (`click`, `type`)   |
| `within`                 | 특정 요소 내부 쿼리                 |

`render` 함수는 `userEvent.setup()`을 자동 포함하여 `user` 객체 반환:

```tsx
const { user } = render(<Button>클릭</Button>);
await user.click(screen.getByRole("button"));
```

---

## 테스트 작성 가이드라인

### 파일 위치 및 네이밍

테스트 파일은 소스 파일과 동일 디렉토리에 위치 (colocation):

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx              # 컴포넌트
│       ├── Button.stories.tsx      # 스토리
│       └── Button.test.tsx         # 테스트
├── hooks/
│   ├── useTheme.ts
│   └── useTheme.test.ts
├── utils/
│   ├── cn.ts
│   └── cn.test.ts
└── testing/
    ├── setup.ts                    # 테스트 설정
    └── render.tsx                  # 렌더링 유틸리티
```

### 테스트 구조

`describe` - `it` 패턴을 사용합니다:

```tsx
describe("Button", () => {
	it("기본 렌더링이 정상적으로 동작한다", () => {
		render(<Button>클릭</Button>);
		expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
	});

	describe("variant", () => {
		it("primary variant가 기본값이다", () => {
			render(<Button>확인</Button>);
			expect(screen.getByRole("button")).toHaveClass("bg-primary");
		});
	});
});
```

### 핵심 원칙

#### 1. 사용자 관점으로 테스트

```tsx
// 좋은 예: 사용자가 보는 것을 기준으로 테스트
screen.getByRole("button", { name: "제출" });
screen.getByLabelText("이메일");
screen.getByText("환영합니다");

// 나쁜 예: 구현 세부사항에 의존
container.querySelector(".btn-primary");
screen.getByTestId("submit-button");
```

#### 2. 쿼리 우선순위

Testing Library의 [쿼리 우선순위](https://testing-library.com/docs/queries/about#priority)를 따릅니다:

1. **접근성 기반** (최우선): `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. **시맨틱 기반**: `getByAltText`, `getByTitle`
3. **Test ID** (최후 수단): `getByTestId`

#### 3. userEvent 사용

`fireEvent` 대신 `userEvent`를 사용하여 실제 사용자 동작에 가까운 이벤트를 발생시킵니다:

```tsx
// 좋은 예: userEvent (실제 사용자 동작 시뮬레이션)
const { user } = render(<Input />);
await user.type(screen.getByRole("textbox"), "hello");
await user.click(screen.getByRole("button"));

// 나쁜 예: fireEvent (저수준 이벤트)
fireEvent.change(input, { target: { value: "hello" } });
fireEvent.click(button);
```

#### 4. 비동기 처리

상태 변경이나 비동기 동작은 `waitFor` 또는 `findBy` 쿼리를 사용합니다:

```tsx
// findBy 쿼리 (요소가 나타날 때까지 대기)
const modal = await screen.findByRole("dialog");

// waitFor (상태 변경 대기)
await waitFor(() => {
	expect(screen.getByText("성공")).toBeInTheDocument();
});
```

### 테스트 유형별 예시

#### 컴포넌트 테스트 (통합)

```tsx
import { render, screen } from "../../testing/render";

import { Button } from "./Button";

describe("Button", () => {
	it("기본 렌더링", () => {
		render(<Button>클릭</Button>);
		expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
	});

	it("클릭 이벤트 호출", async () => {
		const handleClick = vi.fn();
		const { user } = render(<Button onClick={handleClick}>클릭</Button>);

		await user.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledOnce();
	});

	it("disabled 상태에서 클릭 무시", async () => {
		const handleClick = vi.fn();
		const { user } = render(
			<Button disabled onClick={handleClick}>
				클릭
			</Button>
		);

		await user.click(screen.getByRole("button"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("className 병합", () => {
		render(<Button className="custom-class">클릭</Button>);
		expect(screen.getByRole("button")).toHaveClass("custom-class");
	});
});
```

#### 유틸리티 테스트 (단위)

```tsx
import { cn } from "./cn";

describe("cn", () => {
	it("단일 클래스를 반환한다", () => {
		expect(cn("foo")).toBe("foo");
	});

	it("여러 클래스를 병합한다", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("Tailwind 클래스 충돌을 해결한다", () => {
		expect(cn("px-2", "px-4")).toBe("px-4");
	});

	it("falsy 값을 무시한다", () => {
		expect(cn("foo", null, undefined, false, "bar")).toBe("foo bar");
	});
});
```

#### 훅 테스트

```tsx
import { renderHook } from "@testing-library/react";

import { ThemeProvider } from "../contexts/ThemeContext";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
	it("ThemeProvider 없이 사용하면 에러를 던진다", () => {
		expect(() => renderHook(() => useTheme())).toThrow("useTheme must be used within ThemeProvider");
	});

	it("ThemeProvider 내에서 테마 값을 반환한다", () => {
		const { result } = renderHook(() => useTheme(), {
			wrapper: ThemeProvider
		});
		expect(result.current.theme).toBeDefined();
	});
});
```

---

## 무엇을 테스트해야 하는가

### 컴포넌트

| 항목            | 설명                               |
| --------------- | ---------------------------------- |
| 렌더링          | 기본 props로 정상 렌더링되는지     |
| Props 전달      | 각 prop에 따른 출력 변화           |
| 사용자 상호작용 | 클릭, 입력, 키보드 등 이벤트       |
| 접근성          | role, label, aria 속성             |
| className 병합  | 커스텀 className이 정상 적용되는지 |
| 조건부 렌더링   | 특정 조건에 따른 UI 표시/숨김      |

### 유틸리티 함수

| 항목        | 설명                         |
| ----------- | ---------------------------- |
| 정상 입력   | 기대 입력에 대한 올바른 출력 |
| 엣지 케이스 | 빈 값, null, undefined 등    |
| 에러 케이스 | 잘못된 입력 처리             |

### 훅

| 항목          | 설명                       |
| ------------- | -------------------------- |
| 반환 값       | 올바른 초기 값 반환        |
| 상태 변경     | 액션에 따른 상태 업데이트  |
| 에러 처리     | Provider 없이 사용 시 에러 |
| 사이드 이펙트 | DOM 변경, 이벤트 리스너 등 |

### 테스트하지 않는 것

- 서드파티 라이브러리 내부 동작 (clsx, tailwind-merge 등)
- CSS 스타일 계산 결과 (Tailwind 클래스 적용만 확인)
- 스냅샷 테스트 (유지보수 비용 대비 효용 낮음)

---

## 커버리지

### 목표

| 지표       | 최소 기준 |
| ---------- | --------- |
| Statements | 80%       |
| Branches   | 80%       |
| Functions  | 80%       |
| Lines      | 80%       |

### 측정 방법

```bash
# 커버리지 리포트 생성
pnpm test -- --coverage
```

커버리지 리포트는 `coverage/` 디렉토리에 생성됩니다.

### 커버리지 제외 대상

- `src/**/*.stories.tsx` - Storybook 스토리
- `src/**/*.test.{ts,tsx}` - 테스트 파일
- `src/**/index.ts` - 배럴 파일 (re-export)
- `src/testing/**` - 테스트 유틸리티

---

## CI/CD 통합

### PR 검증

CI 워크플로우에서 모든 PR에 대해 자동으로 테스트를 실행합니다:

```
Type Check → Lint → Format Check → Build → Test
```

테스트 실패 시 PR merge가 차단됩니다.

### 커버리지 기준 미달

커버리지 threshold(80%)를 충족하지 못하면 테스트가 실패합니다. 이는 CI에서도 동일하게 적용됩니다.

---

## 트러블슈팅

### jsdom 미지원 API

jsdom 미지원 브라우저 API는 `src/testing/setup.ts`에서 모킹:

```ts
// 예: HTMLDialogElement
HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
	this.setAttribute("open", "");
});
```

새로운 모킹은 `src/testing/setup.ts`에 추가.

### 테마 관련 테스트

ThemeProvider 필요 여부에 따라 렌더링 함수 선택:

```tsx
// ThemeProvider 필요
import { render, screen } from "../../testing/render";
render(<ThemeToggle />);

// ThemeProvider 불필요 (순수 UI 컴포넌트)
import { renderWithoutProviders, screen } from "../../testing/render";
renderWithoutProviders(<Button>클릭</Button>);
```

### CSS 관련

`css: false` 설정으로 CSS 처리 비활성화. 스타일 테스트는 클래스명 존재 확인(`toHaveClass`)으로 검증.

---

## 참고 자료

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Testing Library - Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Testing Library - Query Priority](https://testing-library.com/docs/queries/about#priority)
- [Kent C. Dodds - Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
