import { type Meta, type StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

/**
 * 여러 줄 텍스트 입력 영역. default(아웃라인)와 filled(배경) 두 가지 변형,
 * sm, md, lg 세 가지 크기를 제공한다.
 */
const meta = {
	title: "Components/Textarea",
	component: Textarea,
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 아웃라인 변형. */
export const Default: Story = {
	args: {
		placeholder: "내용을 입력하세요"
	}
};

/** Filled 변형. 배경색으로 입력 영역을 구분한다. */
export const Filled: Story = {
	args: {
		variant: "filled",
		placeholder: "내용을 입력하세요"
	}
};

/** 비활성화 상태. */
export const Disabled: Story = {
	args: {
		placeholder: "비활성화된 텍스트 영역",
		disabled: true
	}
};

/** 모든 변형 비교. */
export const AllVariants: Story = {
	render: () => (
		<div className="flex max-w-md flex-col gap-3">
			<Textarea variant="default" placeholder="Default 변형" />
			<Textarea variant="filled" placeholder="Filled 변형" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Textarea variant="default" placeholder="Default 변형" />
<Textarea variant="filled" placeholder="Filled 변형" />`
			}
		}
	}
};

/** 모든 크기 비교. */
export const AllSizes: Story = {
	render: () => (
		<div className="flex max-w-md flex-col gap-3">
			<Textarea size="sm" placeholder="Small" />
			<Textarea size="md" placeholder="Medium" />
			<Textarea size="lg" placeholder="Large" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`
			}
		}
	}
};
