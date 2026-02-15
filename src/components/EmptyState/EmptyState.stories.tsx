import { type Meta, type StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { EmptyState } from "./EmptyState";

/**
 * 빈 상태 표시. 데이터가 없거나 검색 결과가 없을 때 사용한다.
 * 아이콘, 설명, 액션 버튼을 선택적으로 포함할 수 있다.
 */
const meta = {
	title: "Components/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text"
		},
		description: {
			control: "text"
		}
	}
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 제목만 표시하는 최소 구성. */
export const Default: Story = {
	args: {
		title: "데이터가 없습니다"
	}
};

/** 설명 텍스트 포함. 사용자에게 다음 행동을 안내한다. */
export const WithDescription: Story = {
	args: {
		title: "검색 결과가 없습니다",
		description: "다른 키워드로 다시 검색해 보세요."
	}
};

/** 아이콘 포함. 시각적 맥락을 제공한다. */
export const WithIcon: Story = {
	args: {
		title: "즐겨찾기가 없습니다",
		description: "관심 있는 항목을 즐겨찾기에 추가해 보세요.",
		icon: (
			<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		)
	}
};

/** 액션 버튼 포함. 빈 상태에서 바로 생성 등의 행동을 유도한다. */
export const WithAction: Story = {
	args: {
		title: "항목이 없습니다",
		description: "첫 번째 항목을 생성해 보세요.",
		icon: (
			<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
			</svg>
		),
		action: <Button size="sm">생성하기</Button>
	}
};
