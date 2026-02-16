import { type Meta, type StoryObj } from "@storybook/react";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";

import { Filter, FilterGroup } from "./Filter";

const periodOptions = [
	{ value: "all", label: "전체" },
	{ value: "today", label: "오늘" },
	{ value: "week", label: "이번 주" },
	{ value: "month", label: "이번 달" },
	{ value: "year", label: "올해" }
];

const categoryOptions = [
	{ value: "all", label: "전체" },
	{ value: "frontend", label: "Frontend" },
	{ value: "backend", label: "Backend" },
	{ value: "design", label: "Design" },
	{ value: "devops", label: "DevOps" },
	{ value: "qa", label: "QA" }
];

/**
 * 칩 형태의 필터 컴포넌트. 단일 카테고리 내에서 하나의 옵션을 선택한다.
 * FilterGroup으로 여러 필터를 묶어 복합 필터 UI를 구성할 수 있다.
 */
const meta = {
	title: "Components/Filter",
	component: Filter,
	tags: ["autodocs"],
	args: {
		label: "기간",
		options: periodOptions,
		value: "all",
		onChange: () => {}
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handleChange(value: string) {
			updateArgs({ value });
		}

		return <Filter {...args} onChange={handleChange} />;
	}
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기간 필터. 기본 사용 예시이다. */
export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			source: {
				code: `<Filter
  label="기간"
  options={[
    { value: "all", label: "전체" },
    { value: "today", label: "오늘" },
    { value: "week", label: "이번 주" },
  ]}
  value={value}
  onChange={setValue}
/>`
			}
		}
	}
};

/** 카테고리 필터. 옵션 수가 많은 경우의 레이아웃을 보여준다. */
export const CategoryFilter: Story = {
	args: {
		label: "카테고리",
		options: categoryOptions,
		value: "all"
	},
	parameters: {
		docs: {
			source: {
				code: `<Filter label="카테고리" options={categories} value={value} onChange={setValue} />`
			}
		}
	}
};

/** FilterGroup으로 여러 필터를 묶은 복합 필터 구성. */
export const GroupedFilters: Story = {
	render: function Render() {
		const [period, setPeriod] = useState("all");
		const [category, setCategory] = useState("all");

		return (
			<FilterGroup>
				<Filter label="기간" options={periodOptions} value={period} onChange={setPeriod} />
				<Filter label="카테고리" options={categoryOptions} value={category} onChange={setCategory} />
			</FilterGroup>
		);
	},
	parameters: {
		docs: {
			source: {
				code: `<FilterGroup>
  <Filter label="기간" options={periodOptions} value={period} onChange={setPeriod} />
  <Filter label="카테고리" options={categoryOptions} value={category} onChange={setCategory} />
</FilterGroup>`
			}
		}
	}
};
