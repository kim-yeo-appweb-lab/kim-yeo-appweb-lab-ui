import { type Meta, type StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";

import { TabList } from "./Tab";

const items = [
	{ value: "all", label: "전체" },
	{ value: "active", label: "진행중" },
	{ value: "completed", label: "완료" },
	{ value: "pending", label: "대기" },
	{ value: "archived", label: "보관" }
];

/**
 * 탭 기반 내비게이션. 관련 콘텐츠 그룹 간 전환에 사용한다.
 * filled(pill 형태)와 underline(하단 라인) 두 가지 변형을 제공한다.
 */
const meta = {
	title: "Components/TabList",
	component: TabList,
	tags: ["autodocs"],
	args: {
		items,
		value: "all"
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["filled", "underline"]
		},
		size: {
			control: "select",
			options: ["sm", "md"]
		}
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handleChange(value: string) {
			updateArgs({ value });
		}

		return <TabList {...args} onChange={handleChange} />;
	}
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 filled 변형. 선택된 탭이 pill 형태의 배경색으로 강조된다. */
export const Filled: Story = {
	args: {
		variant: "filled"
	},
	parameters: {
		docs: {
			source: {
				code: `<TabList
  items={[
    { value: "all", label: "전체" },
    { value: "active", label: "진행중" },
    { value: "completed", label: "완료" },
  ]}
  value={value}
  onChange={setValue}
  variant="filled"
/>`
			}
		}
	}
};

/** Underline 변형. 선택된 탭 하단에 강조 라인이 표시된다. */
export const Underline: Story = {
	args: {
		variant: "underline"
	},
	parameters: {
		docs: {
			source: {
				code: `<TabList items={items} value={value} onChange={setValue} variant="underline" />`
			}
		}
	}
};

/** 작은 크기 탭. 공간이 제한된 영역에 적합하다. */
export const Small: Story = {
	args: {
		size: "sm"
	},
	parameters: {
		docs: {
			source: {
				code: `<TabList items={items} value={value} onChange={setValue} size="sm" />`
			}
		}
	}
};
