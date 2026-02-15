---
name: storybook
description: |
  Storybook for React with TypeScript. Component stories, Meta configuration, autodocs, argTypes,
  and visual testing patterns. Use when creating or updating Storybook stories.
  Keywords: storybook, stories.tsx, Meta, Story, args, argTypes, autodocs, CSF3
---

# Storybook for React

React 컴포넌트의 Storybook 스토리 작성 가이드

## Story 파일 구조

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./Component";

const meta = {
	title: "Components/Component",
	component: Component,
	tags: ["autodocs"], // 필수: 자동 문서 생성
	parameters: {
		layout: "centered" // "centered" | "fullscreen" | "padded"
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "primary", "secondary"],
			description: "컴포넌트 변형"
		}
	}
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Content"
	}
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex gap-3">
			<Component variant="default">Default</Component>
			<Component variant="primary">Primary</Component>
			<Component variant="secondary">Secondary</Component>
		</div>
	)
};
```

## Meta 설정

### title (필수)

컴포넌트 카테고리와 이름:

```tsx
title: "Components/Button"; // 입력 컴포넌트
title: "Layout/Card"; // 레이아웃 컴포넌트
title: "Foundation/Colors"; // 디자인 토큰 (MDX)
```

### tags (필수)

```tsx
tags: ["autodocs"]; // TypeScript Props 기반 자동 문서 생성
```

### parameters

```tsx
parameters: {
  layout: "centered",     // 컴포넌트 중앙 정렬
  backgrounds: {
    default: "dark",      // 다크 배경 기본값
  },
  docs: {
    description: {
      component: "컴포넌트 설명",
    },
  },
}
```

## argTypes

Props 컨트롤러 설정:

```tsx
argTypes: {
  // Select
  variant: {
    control: "select",
    options: ["default", "primary", "secondary"],
    description: "버튼 변형",
  },

  // Boolean
  disabled: {
    control: "boolean",
    description: "비활성화 상태",
  },

  // Number
  size: {
    control: { type: "range", min: 12, max: 48, step: 2 },
    description: "폰트 크기",
  },

  // Text
  placeholder: {
    control: "text",
    description: "플레이스홀더 텍스트",
  },

  // Color
  color: {
    control: "color",
    description: "배경 색상",
  },

  // Disable control
  children: {
    control: false,
    description: "자식 요소",
  },
}
```

## Story 타입

### 기본 Story

```tsx
export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button"
	}
};
```

### Render 함수

```tsx
export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	)
};
```

### Args 활용 Render

```tsx
export const Template: Story = {
	render: (args) => (
		<div style={{ padding: "2rem", background: args.background }}>
			<Component {...args} />
		</div>
	),
	args: {
		background: "#f0f0f0"
	}
};
```

## MDX 문서

Foundation 문서용 MDX:

```mdx
import { Meta } from "@storybook/blocks";

<Meta title="Foundation/Introduction" />

# Design System

디자인 시스템 소개

## 특징

- 특징 1
- 특징 2

## 예제

<div style={{ display: "grid", gap: "1rem" }}>{/* 컨텐츠 */}</div>
```

## 색상 팔레트 시각화

```mdx
<Meta title="Foundation/Colors" />

# 색상

## Primary

<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1rem" }}>
	{[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
		<div key={shade}>
			<div
				style={{
					height: "80px",
					backgroundColor: `var(--color-primary-${shade})`,
					borderRadius: "0.5rem",
					border: "1px solid var(--color-border)"
				}}
			></div>
			<p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>primary-{shade}</p>
		</div>
	))}
</div>
```

## Decorators

모든 스토리에 공통 래퍼 적용:

```tsx
const meta = {
	title: "Components/Modal",
	component: Modal,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ minHeight: "400px" }}>
				<Story />
			</div>
		)
	]
} satisfies Meta<typeof Modal>;
```

## Play Functions (인터랙션 테스트)

```tsx
import { expect, userEvent, within } from "@storybook/test";

export const Interaction: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");

		await userEvent.click(button);
		await expect(canvas.getByText("Clicked!")).toBeInTheDocument();
	}
};
```

## 파일 위치

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.stories.tsx  ← 컴포넌트 스토리
│       └── index.ts
└── stories/
    ├── Introduction.mdx        ← Foundation 문서
    ├── Colors.mdx
    ├── Typography.mdx
    └── Spacing.mdx
```

## Best Practices

1. **모든 스토리에 `tags: ["autodocs"]` 추가**
2. **주요 variant별 스토리 작성** (Default, Primary, Secondary 등)
3. **`AllVariants` 스토리로 모든 변형 한눈에** (render 함수 사용)
4. **argTypes로 interactive controls 제공**
5. **복잡한 레이아웃은 decorators 사용**
6. **MDX는 Foundation 문서용**, 컴포넌트는 TSX
7. **parameters.layout으로 적절한 배치** (centered/fullscreen/padded)

## 실행

```bash
pnpm storybook      # 개발 서버
pnpm build-storybook  # 프로덕션 빌드
```

## 참고

- [Storybook Docs](https://storybook.js.org/docs/react)
- [CSF 3.0](https://storybook.js.org/blog/component-story-format-3-0/)
- [Autodocs](https://storybook.js.org/docs/react/writing-docs/autodocs)
