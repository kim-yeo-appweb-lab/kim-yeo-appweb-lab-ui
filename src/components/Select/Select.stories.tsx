import { type Meta, type StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";

import { Select } from "./Select";

const sortOptions = [
	{ value: "latest", label: "최신순" },
	{ value: "popular", label: "인기순" },
	{ value: "comments", label: "댓글순" }
];

const categoryOptions = [
	{ value: "all", label: "전체" },
	{ value: "frontend", label: "Frontend" },
	{ value: "backend", label: "Backend" },
	{ value: "design", label: "Design" },
	{ value: "devops", label: "DevOps" }
];

/**
 * 네이티브 select 기반 드롭다운. 정렬 순서, 카테고리 등 단일 값 선택에 사용한다.
 */
const meta = {
	title: "Components/Select",
	component: Select,
	tags: ["autodocs"],
	args: {
		options: sortOptions,
		value: "latest"
	},
	argTypes: {
		disabled: {
			control: "boolean"
		},
		placeholder: {
			control: "text"
		}
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handleChange(value: string) {
			updateArgs({ value });
		}

		return <Select {...args} onChange={handleChange} />;
	}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 상태. 첫 번째 옵션이 선택되어 있다. */
export const Default: Story = {
	parameters: {
		docs: {
			source: {
				code: `<Select
  options={[
    { value: "latest", label: "최신순" },
    { value: "popular", label: "인기순" },
    { value: "comments", label: "댓글순" },
  ]}
  value={value}
  onChange={setValue}
/>`
			}
		}
	}
};

/** 비활성화 상태. 사용자 입력을 차단한다. */
export const Disabled: Story = {
	args: {
		disabled: true
	},
	parameters: {
		docs: {
			source: {
				code: `<Select options={options} value={value} onChange={setValue} disabled />`
			}
		}
	}
};

/** placeholder 표시. 아직 값이 선택되지 않은 초기 상태를 나타낸다. */
export const WithPlaceholder: Story = {
	args: {
		options: categoryOptions,
		value: "" as string,
		placeholder: "카테고리를 선택하세요"
	},
	parameters: {
		docs: {
			source: {
				code: `<Select
  options={categories}
  value={value}
  onChange={setValue}
  placeholder="카테고리를 선택하세요"
/>`
			}
		}
	}
};
