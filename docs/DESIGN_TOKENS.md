# 디자인 토큰

@kim-yeo-appweb-lab/ui는 Tailwind CSS 4의 `@theme` 블록을 활용한 3단계 토큰 시스템을 사용합니다.

## 토큰 아키텍처

```
Raw Tokens (@theme — 빌드 타임 정적값)
    ↓ var() 참조
Alias Tokens (:root — 브랜드 의미 매핑)
    ↓ var() 참조
Semantic Tokens (:root + @theme inline — 역할 기반, 다크모드 전환)
```

### 파일 구조

| 파일         | 역할                                                                |
| ------------ | ------------------------------------------------------------------- |
| `tokens.css` | Raw Tokens (`@theme`) + Alias Tokens (`:root`)                      |
| `theme.css`  | Semantic Tokens (`:root`) + 다크모드 값 전환 + `@theme inline` 등록 |
| `base.css`   | 기본 스타일 + 스크롤바 + 테마 전환 애니메이션                       |

### `@theme` vs `@theme inline`

- **`@theme`**: 빌드 타임에 값을 정적 컴파일. `var()` 참조가 있으면 **해석(flatten)** 됨. Raw 토큰처럼 변하지 않는 값에 사용.
- **`@theme inline`**: `var()` 참조를 **그대로 보존**. 런타임에 CSS 변수가 변경되면 유틸리티 클래스도 동적으로 반영됨. 다크모드 전환에 필수.

---

## 1. Raw Tokens (원시 토큰)

**파일**: `src/styles/tokens.css` — `@theme` 블록

브랜드/테마와 무관한 순수 색상 팔레트. Tailwind 유틸리티 클래스로 직접 사용 가능 (예: `bg-primary-500`, `text-neutral-700`).

### 색상 팔레트

```css
@theme {
	/* Neutral (회색 스케일) — neutral-0(white) ~ neutral-950(near-black) */
	--color-neutral-0: #ffffff;
	--color-neutral-50: #fafafa;
	--color-neutral-500: #71717a;
	--color-neutral-900: #18181b;
	--color-neutral-950: #0a0a0a;

	/* Primary (코랄 오렌지) — primary-50 ~ primary-950 */
	--color-primary-500: #ff6b47;
	--color-primary-600: #f04e2a;

	/* Secondary (딥 틸) — secondary-50 ~ secondary-950 */
	--color-secondary-500: #14b8a6;
	--color-secondary-600: #0d9488;

	/* Success (녹색) — success-50 ~ success-950 */
	--color-success-500: #22c55e;

	/* Warning (황색) — warning-50 ~ warning-950 */
	--color-warning-500: #eab308;

	/* Danger (적색) — danger-50 ~ danger-950 */
	--color-danger-500: #ef4444;

	/* Info (청색) — info-50 ~ info-950 */
	--color-info-500: #3b82f6;
}
```

### Spacing (4px 기반)

```css
@theme {
	--spacing-0: 0px;
	--spacing-1: 4px; /* 4px */
	--spacing-2: 8px; /* 8px */
	--spacing-3: 12px; /* 12px */
	--spacing-4: 16px; /* 16px */
	--spacing-6: 24px; /* 24px */
	--spacing-8: 32px; /* 32px */
	/* ... spacing-24: 96px */
}
```

### Border Radius

```css
@theme {
	--radius-xs: 2px;
	--radius-sm: 4px;
	--radius-md: 8px;
	--radius-lg: 12px;
	--radius-xl: 16px;
	--radius-2xl: 24px;
	--radius-full: 9999px;
}
```

### Typography

```css
@theme {
	--font-sans: system-ui, -apple-system, sans-serif;
	--font-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
}
```

### Motion

```css
@theme {
	--duration-fast: 150ms;
	--duration-normal: 250ms;
	--duration-slow: 400ms;
	--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
	--ease-in: cubic-bezier(0.4, 0, 1, 1);
	--ease-out: cubic-bezier(0, 0, 0.2, 1);
	--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
	--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 2. Alias Tokens (별칭 토큰)

**파일**: `src/styles/tokens.css` — `:root` 블록

Raw 팔레트를 브랜드 의미에 연결. 브랜드 색상을 변경하려면 이 레이어만 수정하면 됨.

> `:root`를 사용하는 이유: `var()` 참조를 포함하므로 `@theme`에 넣으면 빌드 타임에 값이 flatten 됨.

```css
:root {
	/* 브랜드 색상 */
	--alias-brand-primary: var(--color-primary-500);
	--alias-brand-primary-light: var(--color-primary-400);
	--alias-brand-primary-dark: var(--color-primary-600);
	--alias-brand-primary-subtle: var(--color-primary-50);
	--alias-brand-secondary: var(--color-secondary-500);
	--alias-brand-secondary-light: var(--color-secondary-400);
	--alias-brand-secondary-dark: var(--color-secondary-600);
	--alias-brand-secondary-subtle: var(--color-secondary-50);
	--alias-brand-accent: var(--color-primary-400);

	/* 피드백 색상 */
	--alias-feedback-success: var(--color-success-500);
	--alias-feedback-success-light: var(--color-success-400);
	--alias-feedback-success-subtle: var(--color-success-50);
	--alias-feedback-warning: var(--color-warning-500);
	--alias-feedback-danger: var(--color-danger-500);
	--alias-feedback-info: var(--color-info-500);
	/* ... */
}
```

---

## 3. Semantic Tokens (의미론적 토큰)

**파일**: `src/styles/theme.css` — `:root` 블록

UI 역할에 따른 최종 토큰. **다크모드 전환은 이 레이어에서만 발생**합니다.

### 텍스트 (Text)

| 토큰                   | 라이트      | 다크        | 용도          |
| ---------------------- | ----------- | ----------- | ------------- |
| `--color-fg`           | neutral-900 | neutral-100 | 기본 텍스트   |
| `--color-fg-secondary` | neutral-600 | neutral-400 | 보조 텍스트   |
| `--color-fg-muted`     | neutral-400 | neutral-500 | 비활성 텍스트 |
| `--color-fg-inverse`   | neutral-50  | neutral-900 | 반전 텍스트   |
| `--color-fg-disabled`  | neutral-300 | neutral-700 | 비활성 상태   |

### 배경 (Background)

| 토큰                  | 라이트            | 다크               | 용도             |
| --------------------- | ----------------- | ------------------ | ---------------- |
| `--color-bg`          | neutral-50        | neutral-950        | 페이지 배경      |
| `--color-surface`     | neutral-0 (white) | neutral-900        | 카드/패널 배경   |
| `--color-surface-alt` | neutral-100       | neutral-800        | 대안 표면        |
| `--color-elevated`    | neutral-0 (white) | neutral-800        | 모달/팝오버      |
| `--color-brand-bg`    | brand-primary     | brand-primary-dark | 브랜드 강조 배경 |
| `--color-subtle`      | neutral-100       | neutral-800        | 미묘한 배경      |
| `--color-overlay`     | #00000040         | #00000066          | 오버레이         |

### 보더 (Border)

| 토큰                    | 라이트        | 다크                | 용도        |
| ----------------------- | ------------- | ------------------- | ----------- |
| `--color-border`        | neutral-200   | neutral-800         | 기본 보더   |
| `--color-border-alt`    | neutral-100   | neutral-700         | 가벼운 보더 |
| `--color-border-strong` | neutral-300   | neutral-600         | 강조 보더   |
| `--color-ring`          | brand-primary | brand-primary-light | 포커스 링   |

### 인터랙티브 (Interactive)

| 토큰                       | 라이트             | 다크                  | 용도        |
| -------------------------- | ------------------ | --------------------- | ----------- |
| `--color-primary`          | brand-primary      | brand-primary-light   | 기본 액션   |
| `--color-primary-hover`    | brand-primary-dark | brand-primary         | 호버 상태   |
| `--color-primary-active`   | primary-700        | primary-300           | 활성 상태   |
| `--color-primary-disabled` | primary-200        | primary-950           | 비활성 상태 |
| `--color-primary-fg`       | neutral-0          | neutral-950           | 버튼 텍스트 |
| `--color-secondary`        | brand-secondary    | brand-secondary-light | 보조 액션   |
| `--color-hover-bg`         | neutral-100        | neutral-800           | Ghost 호버  |
| `--color-active-bg`        | neutral-200        | neutral-700           | Ghost 활성  |

### 그림자 (Shadow)

| 토큰               | 용도          |
| ------------------ | ------------- |
| `--shadow-level-0` | 없음          |
| `--shadow-level-1` | 미세한 그림자 |
| `--shadow-level-2` | 카드 기본     |
| `--shadow-level-3` | 모달/드롭다운 |
| `--shadow-level-4` | 팝오버/토스트 |

> 다크모드에서 그림자 opacity가 자동으로 증가합니다.

---

## 다크모드

다크모드는 세 가지 메커니즘으로 작동합니다:

1. **시스템 선호도**: `@media (prefers-color-scheme: dark)` — 사용자 OS 설정에 따라 자동 전환
2. **수동 전환**: `:root[data-theme="dark"]` — `ThemeProvider`가 `data-theme` 속성으로 제어
3. **테마 전환 애니메이션**: View Transition API (지원 브라우저) 또는 `data-theme-transitioning` 폴백

```tsx
import { useTheme } from "@kim-yeo-appweb-lab/ui";

function MyComponent() {
	const { theme, setTheme } = useTheme();
	// theme: "light" | "dark" | "system"
	// setTheme: 테마 변경 + localStorage 저장 + data-theme 속성 갱신
}
```

---

## Tailwind 유틸리티 클래스 매핑

### Raw Tokens → 직접 사용

```tsx
// bg-{palette}-{shade} 형태로 사용
<div className="bg-primary-500 text-neutral-0" />
<div className="bg-success-100 text-success-700" />
```

### Semantic Tokens → 역할 기반 사용 (권장)

```tsx
// 다크모드 자동 전환됨
<div className="bg-surface text-fg" />
<div className="border-border bg-elevated shadow-level-2" />
<button className="bg-primary text-primary-fg hover:bg-primary-hover" />
```

---

## 커스터마이징

### 레벨 1: Raw 팔레트 변경

브랜드 색상으로 Primary 팔레트 전체를 교체합니다. Alias와 Semantic 토큰이 `var()` 참조를 통해 자동 반영됩니다.

```css
@theme {
	--color-primary-50: #f0f9ff;
	--color-primary-100: #e0f2fe;
	--color-primary-500: #0ea5e9; /* 브랜드 메인 색상 */
	--color-primary-600: #0284c7;
	--color-primary-900: #0c4a6e;
	/* ... 전체 shade 오버라이드 */
}
```

**영향 범위**: Primary 색상을 사용하는 모든 컴포넌트 (Button, Badge, Focus ring 등)

### 레벨 2: Alias 토큰 변경

브랜드 매핑만 변경하여 특정 의미의 색상을 바꿉니다:

```css
:root {
	/* Primary를 다른 shade로 매핑 */
	--alias-brand-primary: var(--color-primary-600);
	--alias-brand-primary-light: var(--color-primary-500);
	--alias-brand-primary-dark: var(--color-primary-700);
}
```

**영향 범위**: 해당 alias를 참조하는 모든 semantic 토큰

### 레벨 3: Semantic 토큰 변경

특정 UI 역할의 색상만 직접 변경합니다:

```css
:root {
	/* 페이지 배경색만 변경 */
	--color-bg: #fafafa;

	/* 포커스 링 색상만 변경 */
	--color-ring: #3b82f6;
}
```

**영향 범위**: 해당 토큰을 사용하는 컴포넌트만

### 다크모드 커스터마이징

다크모드 전용 값을 오버라이드합니다:

```css
:root[data-theme="dark"] {
	--color-bg: #0f172a;
	--color-surface: #1e293b;
	--color-border: #334155;
}
```

### 전체 테마 오버라이드 예시

```css
/* 1. Raw Tokens — 브랜드 팔레트 */
@theme {
	--color-primary-500: #8b5cf6;
	--color-primary-600: #7c3aed;
	--color-primary-700: #6d28d9;
}

/* 2. Semantic Tokens — 배경/보더 */
:root {
	--color-bg: #fafafa;
	--color-surface: #ffffff;
}

/* 3. 다크모드 */
:root[data-theme="dark"] {
	--color-bg: #0f0f23;
	--color-surface: #1a1a2e;
}
```

---

## 토큰 네이밍 규칙

### Raw Tokens

`--color-{scale}-{shade}` (예: `--color-primary-500`, `--color-neutral-200`)

### Alias Tokens

`--alias-{category}-{name}` (예: `--alias-brand-primary`, `--alias-feedback-success`)

### Semantic Tokens

`--color-{role}` 또는 `--color-{role}-{state}` (예: `--color-fg`, `--color-primary-hover`)

### 기타

- Spacing: `--spacing-{scale}` (예: `--spacing-4`)
- Radius: `--radius-{scale}` (예: `--radius-md`)
- Shadow: `--shadow-level-{n}` (예: `--shadow-level-2`)
- Duration: `--duration-{speed}` (예: `--duration-fast`)
- Easing: `--ease-{type}` (예: `--ease-default`)

## 참고 자료

- [Tailwind CSS 4 - @theme](https://tailwindcss.com/docs/theme)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/format/)
