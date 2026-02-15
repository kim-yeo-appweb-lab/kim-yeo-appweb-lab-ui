import { type Meta, type StoryObj } from "@storybook/react";

import { Input } from "./Input";

/**
 * 텍스트 입력 필드. default(아웃라인)와 filled(배경) 두 가지 변형,
 * sm, md, lg 세 가지 크기를 제공한다.
 */
const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "filled"]
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"]
		},
		disabled: {
			control: "boolean"
		}
	}
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 아웃라인 변형. */
export const Default: Story = {
	args: {
		placeholder: "텍스트를 입력하세요"
	}
};

/** Filled 변형. 배경색으로 입력 영역을 구분한다. */
export const Filled: Story = {
	args: {
		variant: "filled",
		placeholder: "텍스트를 입력하세요"
	}
};

/** 비활성화 상태. */
export const Disabled: Story = {
	args: {
		placeholder: "비활성화된 입력",
		disabled: true
	}
};

/** 모든 변형 비교. */
export const AllVariants: Story = {
	render: () => (
		<div className="flex max-w-sm flex-col gap-3">
			<Input variant="default" placeholder="Default 변형" />
			<Input variant="filled" placeholder="Filled 변형" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Input variant="default" placeholder="Default 변형" />
<Input variant="filled" placeholder="Filled 변형" />`
			}
		}
	}
};

/** 모든 크기 비교. */
export const AllSizes: Story = {
	render: () => (
		<div className="flex max-w-sm flex-col gap-3">
			<Input size="sm" placeholder="Small (32px)" />
			<Input size="md" placeholder="Medium (40px)" />
			<Input size="lg" placeholder="Large (48px)" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`
			}
		}
	}
};
