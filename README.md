<div align="center">
  <img src="./public/profile-picture.png" alt="kim-yeo-appweb-lab" width="120" height="120" />

# @kim-yeo-appweb-lab/ui

범용 디자인 시스템 - React 19 + Tailwind CSS 4 UI 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/@kim-yeo-appweb-lab/ui.svg)](https://www.npmjs.com/package/@kim-yeo-appweb-lab/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 특징

- **React 19+** - ref as prop, "use client" 등 최신 기능 지원
- **Tailwind CSS 4+** - @theme 블록 기반 디자인 토큰 시스템
- **프레임워크 독립적** - Next.js, Vite, CRA 모두 지원
- **TypeScript** - 완전한 타입 정의
- **다크모드** - ThemeProvider 기반 테마 시스템
- **Tree-shakeable** - ESM 빌드로 번들 크기 최적화
- **접근성** - WAI-ARIA 표준 준수

## 설치

### 패키지 매니저

```bash
# pnpm (권장)
pnpm add @kim-yeo-appweb-lab/ui

# npm
npm install @kim-yeo-appweb-lab/ui

# yarn
yarn add @kim-yeo-appweb-lab/ui
```

### Peer Dependencies

React 19+와 Tailwind CSS 4+가 필요합니다:

```bash
pnpm add react@^19 react-dom@^19 tailwindcss@^4
```

## 사용법

### 1. 스타일 import

**권장 방법** - JS/TS 파일에서 import:

```tsx
// main.tsx 또는 App.tsx
import "@kim-yeo-appweb-lab/ui/styles";
```

**대안** - CSS 파일에서 import:

```css
/* globals.css - 라이브러리만 사용하는 경우 */
@import "@kim-yeo-appweb-lab/ui/styles";
```

**프로젝트에서 Tailwind를 함께 사용하는 경우:**

```css
/* globals.css */
@import "tailwindcss"; /* 프로젝트의 커스텀 스타일을 위해 */
@import "@kim-yeo-appweb-lab/ui/styles"; /* 라이브러리 스타일 */
```

> **참고**: 라이브러리 스타일에 이미 Tailwind가 포함되어 있으므로, 라이브러리 컴포넌트만 사용한다면 별도로 `@import "tailwindcss";`를 추가할 필요가 없습니다.

### 2. ThemeProvider 설정

앱 최상단에 ThemeProvider를 추가합니다:

```tsx
import { ThemeProvider } from "@kim-yeo-appweb-lab/ui";

function App() {
	return <ThemeProvider>{/* 앱 컴포넌트 */}</ThemeProvider>;
}
```

### 3. 컴포넌트 사용

```tsx
import { Button, Card, Input } from "@kim-yeo-appweb-lab/ui";

function MyComponent() {
	return (
		<Card>
			<Input placeholder="이름을 입력하세요" />
			<Button variant="primary">제출</Button>
		</Card>
	);
}
```

## 컴포넌트 목록

### 입력 컴포넌트

- **Button** - 다양한 variant 지원 (primary, secondary, outline, ghost, danger)
- **Input** - 텍스트 입력 필드
- **Textarea** - 여러 줄 텍스트 입력
- **Select** - 드롭다운 선택
- **TagInput** - 태그 입력 및 관리

### 레이아웃 컴포넌트

- **Card** - 카드 컨테이너 (CardHeader, CardTitle, CardContent, CardFooter 포함)
- **Modal** - 모달 다이얼로그
- **SectionHeader** - 섹션 헤더

### 네비게이션

- **Breadcrumb** - 경로 네비게이션
- **Tab** - 탭 UI
- **Pagination** - 페이지네이션

### 데이터 표시

- **Avatar** - 사용자 아바타
- **Badge** - 라벨 배지 (success, danger, warning, info, neutral 지원)
- **EmptyState** - 빈 상태 표시
- **Skeleton** - 로딩 스켈레톤

### 필터링

- **Filter** - 필터 옵션 선택

### 테마

- **ThemeToggle** - 테마 전환 버튼
- **useTheme** - 테마 관리 훅

## 예제

### 버튼 variants

```tsx
import { Button } from "@kim-yeo-appweb-lab/ui";

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Badge colorScheme

```tsx
import { Badge } from "@kim-yeo-appweb-lab/ui";

<Badge colorScheme="success">성공</Badge>
<Badge colorScheme="danger">오류</Badge>
<Badge colorScheme="warning">경고</Badge>
<Badge colorScheme="info">정보</Badge>
<Badge colorScheme="neutral">비활성</Badge>
```

### 테마 전환

```tsx
import { useTheme, ThemeToggle } from "@kim-yeo-appweb-lab/ui";

function MyApp() {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			<p>현재 테마: {theme}</p>
			<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>테마 변경</button>

			{/* 또는 내장 토글 버튼 사용 */}
			<ThemeToggle />
		</div>
	);
}
```

### 모달

```tsx
import { Modal, Button } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

function ModalExample() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>모달 열기</Button>

			<Modal open={open} onClose={() => setOpen(false)} title="확인">
				<p>정말 삭제하시겠습니까?</p>
				<Button variant="danger" onClick={() => setOpen(false)}>
					삭제
				</Button>
			</Modal>
		</>
	);
}
```

## 커스터마이징

@kim-yeo-appweb-lab/ui는 3단계 토큰 시스템을 사용하여 유연한 커스터마이징을 지원합니다.

### 디자인 토큰 오버라이드

Tailwind CSS v4의 `@theme` 블록으로 브랜드 색상을 쉽게 변경할 수 있습니다:

#### 1. Raw 토큰 오버라이드 (전체 팔레트 변경)

특정 색상의 모든 shade를 한 번에 변경:

```css
@theme {
	/* Primary 색상 전체 팔레트 변경 */
	--color-primary-50: #f0f9ff;
	--color-primary-100: #e0f2fe;
	--color-primary-200: #bae6fd;
	--color-primary-300: #7dd3fc;
	--color-primary-400: #38bdf8;
	--color-primary-500: #0ea5e9;
	--color-primary-600: #0284c7;
	--color-primary-700: #0369a1;
	--color-primary-800: #075985;
	--color-primary-900: #0c4a6e;
}
```

#### 2. Semantic 토큰 오버라이드 (특정 컴포넌트 색상)

특정 UI 요소의 색상만 변경:

```css
@theme {
	/* 버튼 Primary variant 색상만 변경 */
	--color-button-primary-bg: #06b6d4;
	--color-button-primary-hover: #0891b2;
	--color-button-primary-text: #ffffff;
}
```

#### 3. 다크모드 커스터마이징

다크모드 전용 색상 오버라이드:

```css
@theme {
	/* 다크모드 배경색 커스터마이징 */
	--color-background: #0a0a0a;
	--color-card: #171717;

	/* 다크모드 텍스트 색상 */
	--color-foreground: #fafafa;
	--color-muted-foreground: #a1a1aa;
}
```

#### 4. 반응형 디자인 토큰

```css
@theme {
	/* 모바일 우선 폰트 크기 */
	--font-size-base: 14px;
	--font-size-lg: 16px;

	/* 태블릿 이상 */
	@media (min-width: 768px) {
		--font-size-base: 16px;
		--font-size-lg: 18px;
	}
}
```

### 컴포넌트 스타일 확장

모든 컴포넌트는 `className` prop을 지원하여 Tailwind 유틸리티로 확장 가능:

```tsx
{
	/* 전체 너비 버튼 */
}
<Button className="w-full" variant="primary">
	제출
</Button>;

{
	/* 그림자 + 둥근 모서리 커스터마이징 */
}
<Card className="border-primary-500 rounded-3xl border-2 shadow-2xl">
	<CardContent>커스텀 카드</CardContent>
</Card>;

{
	/* 애니메이션 추가 */
}
<Badge className="transition-all hover:scale-110" colorScheme="success">
	호버 애니메이션
</Badge>;

{
	/* 그리드 레이아웃 */
}
<div className="grid grid-cols-3 gap-4">
	<Input placeholder="필드 1" />
	<Input placeholder="필드 2" />
	<Input placeholder="필드 3" />
</div>;
```

## 요구사항

- React ≥ 19.0.0
- React DOM ≥ 19.0.0
- Tailwind CSS ≥ 4.0.0
- TypeScript ≥ 5.0.0 (선택사항, 권장)

## 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

## 개발 및 배포

### 로컬 개발

```bash
# 개발 모드 (watch)
pnpm dev

# Storybook 실행
pnpm storybook
```

### 테스트

Vitest + Testing Library 기반 테스트 환경을 제공합니다:

```bash
# 전체 테스트 실행
pnpm test

# Watch 모드 (개발 중 권장)
pnpm test:watch

# 커버리지 포함 실행
pnpm test -- --coverage
```

- **테스트 전략**: 사용자 관점의 통합 테스트 중심 (Testing Trophy)
- **커버리지 기준**: Statements, Branches, Functions, Lines 각 80%
- **테스트 파일 위치**: 소스 파일과 같은 디렉토리에 `*.test.tsx` 형식으로 작성

자세한 내용은 [테스트 가이드](docs/TESTING.md)를 참고하세요.

### 배포

이 프로젝트는 GitHub Actions를 통한 자동 배포를 지원합니다:

- **CI**: PR 생성 시 자동 검증 (lint, type-check, build, test)
- **Release**: Changesets 기반 npm 자동 배포
- **Storybook**: GitHub Pages 자동 배포

자세한 내용은 [배포 가이드](docs/DEPLOYMENT.md)를 참고하세요.

## 라이선스

MIT

## 기여

이슈와 PR을 환영합니다!

- GitHub: https://github.com/kim-yeo-appweb-lab/kim-yeo-ui
- Issues: https://github.com/kim-yeo-appweb-lab/kim-yeo-ui/issues
- Storybook: https://kim-yeo-appweb-lab.github.io/kim-yeo-ui/
