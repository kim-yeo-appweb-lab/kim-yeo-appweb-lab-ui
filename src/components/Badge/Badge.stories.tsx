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
			options: ["default", "success", "danger", "warning", "info", "neutral"]
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

/** 성공/활성 상태 표시. */
export const Success: Story = {
	args: {
		colorScheme: "success",
		children: "Active"
	}
};

/** 긴급/에러 상태 표시. */
export const Danger: Story = {
	args: {
		colorScheme: "danger",
		children: "Urgent"
	}
};

/** 경고 상태 표시. */
export const Warning: Story = {
	args: {
		colorScheme: "warning",
		children: "Warning"
	}
};

/** 정보/신규 항목 표시. */
export const Info: Story = {
	args: {
		colorScheme: "info",
		children: "NEW"
	}
};

/** 비활성/종료 상태 표시. */
export const Neutral: Story = {
	args: {
		colorScheme: "neutral",
		children: "Closed"
	}
};

/** Outline 변형. 테두리로 상태를 구분한다. */
export const OutlineVariant: Story = {
	args: {
		variant: "outline",
		colorScheme: "success",
		children: "Active"
	}
};

/** 전체 색상 팔레트 비교 (subtle). */
export const AllColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>기본</Badge>
			<Badge colorScheme="success">Success</Badge>
			<Badge colorScheme="danger">Danger</Badge>
			<Badge colorScheme="warning">Warning</Badge>
			<Badge colorScheme="info">Info</Badge>
			<Badge colorScheme="neutral">Neutral</Badge>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Badge>기본</Badge>
<Badge colorScheme="success">Success</Badge>
<Badge colorScheme="danger">Danger</Badge>
<Badge colorScheme="warning">Warning</Badge>
<Badge colorScheme="info">Info</Badge>
<Badge colorScheme="neutral">Neutral</Badge>`
			}
		}
	}
};

/** 전체 색상 팔레트 비교 (outline). */
export const AllOutlineColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="outline">기본</Badge>
			<Badge variant="outline" colorScheme="success">
				Success
			</Badge>
			<Badge variant="outline" colorScheme="danger">
				Danger
			</Badge>
			<Badge variant="outline" colorScheme="warning">
				Warning
			</Badge>
			<Badge variant="outline" colorScheme="info">
				Info
			</Badge>
			<Badge variant="outline" colorScheme="neutral">
				Neutral
			</Badge>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Badge variant="outline">기본</Badge>
<Badge variant="outline" colorScheme="success">Success</Badge>
<Badge variant="outline" colorScheme="danger">Danger</Badge>
<Badge variant="outline" colorScheme="warning">Warning</Badge>
<Badge variant="outline" colorScheme="info">Info</Badge>
<Badge variant="outline" colorScheme="neutral">Neutral</Badge>`
			}
		}
	}
};
