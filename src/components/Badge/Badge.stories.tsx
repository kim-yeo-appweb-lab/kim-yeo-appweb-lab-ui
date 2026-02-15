import { type Meta, type StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

/**
 * 상태 표시용 배지. subtle(배경)과 outline(테두리) 두 가지 변형,
 * 6가지 색상 팔레트를 제공한다.
 */
const meta = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["subtle", "outline"]
		},
		colorScheme: {
			control: "select",
			options: ["default", "green", "red", "amber", "blue", "gray"]
		}
	}
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 배지. default 색상의 subtle 변형이다. */
export const Default: Story = {
	args: {
		children: "기본 배지"
	}
};

/** 활성 상태 표시. */
export const Green: Story = {
	args: {
		colorScheme: "green",
		children: "Active"
	}
};

/** 긴급/에러 상태 표시. */
export const Red: Story = {
	args: {
		colorScheme: "red",
		children: "Urgent"
	}
};

/** 경고 상태 표시. */
export const Amber: Story = {
	args: {
		colorScheme: "amber",
		children: "Warning"
	}
};

/** 정보/신규 항목 표시. */
export const Blue: Story = {
	args: {
		colorScheme: "blue",
		children: "NEW"
	}
};

/** 비활성/종료 상태 표시. */
export const Gray: Story = {
	args: {
		colorScheme: "gray",
		children: "Closed"
	}
};

/** Outline 변형. 테두리로 상태를 구분한다. */
export const OutlineVariant: Story = {
	args: {
		variant: "outline",
		colorScheme: "green",
		children: "Active"
	}
};

/** 전체 색상 팔레트 비교 (subtle). */
export const AllColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>기본</Badge>
			<Badge colorScheme="green">Green</Badge>
			<Badge colorScheme="red">Red</Badge>
			<Badge colorScheme="amber">Amber</Badge>
			<Badge colorScheme="blue">Blue</Badge>
			<Badge colorScheme="gray">Gray</Badge>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Badge>기본</Badge>
<Badge colorScheme="green">Green</Badge>
<Badge colorScheme="red">Red</Badge>
<Badge colorScheme="amber">Amber</Badge>
<Badge colorScheme="blue">Blue</Badge>
<Badge colorScheme="gray">Gray</Badge>`
			}
		}
	}
};

/** 전체 색상 팔레트 비교 (outline). */
export const AllOutlineColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="outline">기본</Badge>
			<Badge variant="outline" colorScheme="green">
				Green
			</Badge>
			<Badge variant="outline" colorScheme="red">
				Red
			</Badge>
			<Badge variant="outline" colorScheme="amber">
				Amber
			</Badge>
			<Badge variant="outline" colorScheme="blue">
				Blue
			</Badge>
			<Badge variant="outline" colorScheme="gray">
				Gray
			</Badge>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Badge variant="outline">기본</Badge>
<Badge variant="outline" colorScheme="green">Green</Badge>
<Badge variant="outline" colorScheme="red">Red</Badge>
<Badge variant="outline" colorScheme="amber">Amber</Badge>
<Badge variant="outline" colorScheme="blue">Blue</Badge>
<Badge variant="outline" colorScheme="gray">Gray</Badge>`
			}
		}
	}
};
