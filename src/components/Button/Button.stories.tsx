import { type Meta, type StoryObj } from "@storybook/react";

import { Button } from "./Button";

/**
 * 다목적 버튼 컴포넌트. primary, secondary, ghost 세 가지 변형과 세 가지 크기를 제공한다.
 * asChild prop으로 a 태그 등 다른 요소로 렌더링할 수 있다 (Slot 패턴).
 */
const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "ghost"]
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"]
		},
		asChild: {
			control: "boolean"
		},
		disabled: {
			control: "boolean"
		}
	}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 primary 버튼. 페이지의 주요 액션에 사용한다. */
export const Primary: Story = {
	args: {
		children: "Primary 버튼",
		variant: "primary"
	}
};

/** Secondary 변형. 보조 액션에 사용한다. */
export const Secondary: Story = {
	args: {
		children: "Secondary 버튼",
		variant: "secondary"
	}
};

/** Ghost 변형. 배경 없이 텍스트만 표시한다. */
export const Ghost: Story = {
	args: {
		children: "Ghost 버튼",
		variant: "ghost"
	}
};

/** 작은 크기. 인라인 액션이나 좁은 공간에 적합하다. */
export const Small: Story = {
	args: {
		children: "작은 버튼",
		size: "sm"
	}
};

/** 중간 크기. 기본값이다. */
export const Medium: Story = {
	args: {
		children: "중간 버튼",
		size: "md"
	}
};

/** 큰 크기. 주요 CTA에 적합하다. */
export const Large: Story = {
	args: {
		children: "큰 버튼",
		size: "lg"
	}
};

/** 비활성화 상태. 클릭이 차단되고 시각적으로 흐리게 표시된다. */
export const Disabled: Story = {
	args: {
		children: "비활성화 버튼",
		disabled: true
	}
};

/** 모든 변형 비교. */
export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>`
			}
		}
	}
};

/** 모든 크기 비교. */
export const AllSizes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`
			}
		}
	}
};

/** asChild Slot 패턴. 버튼 스타일을 유지하면서 a 태그로 렌더링한다. */
export const AsChild: Story = {
	render: () => (
		<Button asChild variant="primary">
			<a href="https://example.com">링크로 렌더링</a>
		</Button>
	),
	parameters: {
		docs: {
			source: {
				code: `<Button asChild variant="primary">
  <a href="https://example.com">링크로 렌더링</a>
</Button>`
			}
		}
	}
};
