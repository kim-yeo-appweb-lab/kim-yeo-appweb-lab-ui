import { type Meta, type StoryObj } from "@storybook/react";

import { Container } from "./Container";

/**
 * 콘텐츠 영역의 max-width와 반응형 padding을 관리하는 레이아웃 컨테이너.
 * sm/md/lg/full 네 가지 사이즈를 제공하며, 브레이크포인트별 좌우 padding이 자동 조절된다.
 */
const meta = {
	title: "Layout/Container",
	component: Container,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg", "full"]
		}
	}
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 lg 사이즈. 대부분의 페이지 콘텐츠에 사용한다. */
export const Default: Story = {
	render: () => (
		<Container>
			<div className="bg-surface-alt rounded-lg border p-4">기본 Container (lg)</div>
		</Container>
	)
};

/** 모든 사이즈 비교. */
export const AllSizes: Story = {
	render: () => (
		<div className="space-y-4">
			<Container size="sm">
				<div className="bg-surface-alt rounded-lg border p-4">sm (max-w-screen-sm)</div>
			</Container>
			<Container size="md">
				<div className="bg-surface-alt rounded-lg border p-4">md (max-w-screen-md)</div>
			</Container>
			<Container size="lg">
				<div className="bg-surface-alt rounded-lg border p-4">lg (max-w-screen-lg)</div>
			</Container>
			<Container size="full">
				<div className="bg-surface-alt rounded-lg border p-4">full (max-w-full)</div>
			</Container>
		</div>
	)
};
