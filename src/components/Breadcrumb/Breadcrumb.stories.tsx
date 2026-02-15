import { type Meta, type StoryObj } from "@storybook/react";

import { Breadcrumb } from "./Breadcrumb";

/**
 * 경로 탐색 내비게이션. 현재 페이지의 계층 구조를 표시하며,
 * 마지막 항목을 제외한 모든 항목이 링크로 동작한다.
 */
const meta = {
	title: "Components/Breadcrumb",
	component: Breadcrumb,
	tags: ["autodocs"]
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 3단계 기본 경로. */
export const Default: Story = {
	args: {
		items: [{ label: "홈", href: "/" }, { label: "제품", href: "/products" }, { label: "노트북" }]
	}
};

/** 2단계 얕은 경로. */
export const TwoLevels: Story = {
	args: {
		items: [{ label: "홈", href: "/" }, { label: "설정" }]
	}
};

/** 4단계 깊은 경로. 긴 경로의 레이아웃을 보여준다. */
export const DeepNesting: Story = {
	args: {
		items: [
			{ label: "홈", href: "/" },
			{ label: "문서", href: "/docs" },
			{ label: "가이드", href: "/docs/guides" },
			{ label: "시작하기" }
		]
	}
};

/** 단일 항목. 최상위 페이지에서의 표시 상태이다. */
export const SingleItem: Story = {
	args: {
		items: [{ label: "홈" }]
	}
};
