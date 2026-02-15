# 디자인 토큰

@kim-yeo-appweb-lab/ui는 Tailwind CSS 4의 `@theme` 블록을 활용한 3단계 토큰 시스템을 사용합니다.

## 토큰 아키텍처

```
Raw Tokens (색상 팔레트)
    ↓
Alias Tokens (의미 부여)
    ↓
Semantic Tokens (컴포넌트별 용도)
```

### 1. Raw Tokens (원시 토큰)

색상 팔레트의 기본 shade (50~900):

```css
@theme {
	/* Primary 색상 팔레트 */
	--color-primary-50: #f0f9ff;
	--color-primary-100: #e0f2fe;
	--color-primary-500: #0ea5e9;
	--color-primary-600: #0284c7;
	--color-primary-900: #0c4a6e;

	/* 기타 색상 팔레트 */
	--color-gray-*
	--color-red-*
	--color-green-*
	--color-amber-*
	--color-blue-*
}
```

### 2. Alias Tokens (별칭 토큰)

UI 요소별 의미를 가진 토큰:

```css
@theme {
	/* 배경 */
	--color-background: var(--color-white);
	--color-foreground: var(--color-gray-900);

	/* 카드 */
	--color-card: var(--color-white);
	--color-card-foreground: var(--color-gray-900);

	/* Border */
	--color-border: var(--color-gray-200);

	/* Input */
	--color-input: var(--color-gray-200);
}
```

### 3. Semantic Tokens (의미론적 토큰)

컴포넌트별 용도에 맞는 토큰:

```css
@theme {
	/* Button Primary */
	--color-button-primary-bg: var(--color-primary-600);
	--color-button-primary-hover: var(--color-primary-700);
	--color-button-primary-text: var(--color-white);

	/* Button Secondary */
	--color-button-secondary-bg: var(--color-gray-100);
	--color-button-secondary-hover: var(--color-gray-200);
	--color-button-secondary-text: var(--color-gray-900);
}
```

## 커스터마이징 전략

### 레벨 1: 전체 팔레트 변경

브랜드 색상으로 Primary 팔레트 전체 교체:

```css
@theme {
	--color-primary-50: #f0f9ff;
	--color-primary-100: #e0f2fe;
	--color-primary-200: #bae6fd;
	--color-primary-300: #7dd3fc;
	--color-primary-400: #38bdf8;
	--color-primary-500: #0ea5e9; /* 브랜드 메인 색상 */
	--color-primary-600: #0284c7;
	--color-primary-700: #0369a1;
	--color-primary-800: #075985;
	--color-primary-900: #0c4a6e;
}
```

**영향 범위:** Primary 색상을 사용하는 모든 컴포넌트

### 레벨 2: Alias 토큰 변경

특정 UI 요소 색상만 변경:

```css
@theme {
	/* 배경색만 변경 */
	--color-background: #fafafa;
	--color-card: #ffffff;

	/* Border만 변경 */
	--color-border: #e5e7eb;
}
```

**영향 범위:** 해당 토큰을 참조하는 컴포넌트들

### 레벨 3: Semantic 토큰 변경

특정 컴포넌트 variant만 변경:

```css
@theme {
	/* Button Primary만 변경 */
	--color-button-primary-bg: #10b981;
	--color-button-primary-hover: #059669;

	/* 다른 Button variant는 그대로 */
}
```

**영향 범위:** Button Primary variant만

## 다크모드

다크모드는 자동으로 전환됩니다 (`prefers-color-scheme` 또는 `ThemeProvider`):

```css
@theme {
	/* Light 모드 */
	--color-background: #ffffff;
	--color-foreground: #0a0a0a;

	/* Dark 모드 자동 전환 */
	@media (prefers-color-scheme: dark) {
		--color-background: #0a0a0a;
		--color-foreground: #fafafa;
	}
}
```

### 다크모드 커스터마이징

```css
@theme {
	/* 다크모드 배경색 커스터마이징 */
	--color-background: #0a0a0a;
	--color-card: #171717;

	/* 다크모드 텍스트 */
	--color-foreground: #fafafa;
	--color-muted-foreground: #a1a1aa;
}
```

## 타이포그래피

### 폰트 패밀리

```css
@theme {
	--font-sans: system-ui, -apple-system, sans-serif;
	--font-mono: "Courier New", monospace;
}
```

### 폰트 크기

```css
@theme {
	--font-size-xs: 0.75rem; /* 12px */
	--font-size-sm: 0.875rem; /* 14px */
	--font-size-base: 1rem; /* 16px */
	--font-size-lg: 1.125rem; /* 18px */
	--font-size-xl: 1.25rem; /* 20px */
	--font-size-2xl: 1.5rem; /* 24px */
}
```

### 반응형 타이포그래피

```css
@theme {
	--font-size-base: 14px;

	@media (min-width: 768px) {
		--font-size-base: 16px;
	}
}
```

## 스페이싱

```css
@theme {
	--spacing-0: 0;
	--spacing-1: 0.25rem; /* 4px */
	--spacing-2: 0.5rem; /* 8px */
	--spacing-3: 0.75rem; /* 12px */
	--spacing-4: 1rem; /* 16px */
	--spacing-6: 1.5rem; /* 24px */
	--spacing-8: 2rem; /* 32px */
}
```

## Border Radius

```css
@theme {
	--radius-sm: 0.25rem; /* 4px */
	--radius-md: 0.5rem; /* 8px */
	--radius-lg: 0.75rem; /* 12px */
	--radius-xl: 1rem; /* 16px */
	--radius-full: 9999px;
}
```

## 그림자

```css
@theme {
	--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
	--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

## 실전 예제

### 브랜드 색상 적용

기존 Primary를 브랜드 그린으로 변경:

```css
@theme {
	--color-primary-500: #10b981;
	--color-primary-600: #059669;
	--color-primary-700: #047857;
}
```

### 다크모드 강조

다크모드에서 Primary 색상을 더 밝게:

```css
@theme {
	@media (prefers-color-scheme: dark) {
		--color-primary-500: #34d399;
		--color-primary-600: #10b981;
	}
}
```

### 버튼만 커스터마이징

Primary 버튼은 브랜드 색상, Secondary는 유지:

```css
@theme {
	--color-button-primary-bg: #3b82f6;
	--color-button-primary-hover: #2563eb;
	--color-button-primary-text: #ffffff;

	/* Secondary는 기본값 사용 */
}
```

### 전체 테마 오버라이드

완전한 커스텀 테마:

```css
@theme {
	/* 1. Raw Tokens */
	--color-primary-500: #8b5cf6;
	--color-primary-600: #7c3aed;

	/* 2. Alias Tokens */
	--color-background: #fafafa;
	--color-foreground: #171717;

	/* 3. Semantic Tokens */
	--color-button-primary-bg: var(--color-primary-500);
	--color-button-primary-hover: var(--color-primary-600);

	/* 4. Typography */
	--font-sans: "Inter", system-ui, sans-serif;
	--font-size-base: 15px;

	/* 5. Border Radius */
	--radius-md: 0.75rem;
}
```

## 토큰 네이밍 규칙

### 색상

- `--color-{scale}-{shade}` (Raw)
- `--color-{element}` (Alias)
- `--color-{component}-{variant}-{property}` (Semantic)

### 타이포그래피

- `--font-{family}`
- `--font-size-{scale}`

### 스페이싱

- `--spacing-{scale}`

### Border Radius

- `--radius-{scale}`

## 참고 자료

- [Tailwind CSS 4 - @theme](https://tailwindcss.com/docs/theme)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/format/)
