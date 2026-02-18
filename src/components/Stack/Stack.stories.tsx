import { type Meta, type StoryObj } from "@storybook/react";

import { Stack } from "./Stack";

/**
 * Flexbox 기반의 동적 간격 관리 컴포넌트.
 * direction, spacing, responsive 옵션으로 유연한 레이아웃을 구성한다.
 */
const meta = {
	title: "Layout/Stack",
	component: Stack,
	tags: ["autodocs"],
	argTypes: {
		direction: {
			control: "select",
			options: ["row", "column"]
		},
		spacing: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		},
		responsive: {
			control: "boolean"
		}
	}
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-surface-alt rounded-lg border p-4 text-center">{children}</div>
);

/** 세로 방향 (기본). */
export const Column: Story = {
	render: () => (
		<Stack direction="column" spacing="md">
			<Box>항목 1</Box>
			<Box>항목 2</Box>
			<Box>항목 3</Box>
		</Stack>
	)
};

/** 가로 방향. */
export const Row: Story = {
	render: () => (
		<Stack direction="row" spacing="md">
			<Box>항목 1</Box>
			<Box>항목 2</Box>
			<Box>항목 3</Box>
		</Stack>
	)
};

/** 반응형 모드. 모바일에서 세로, 데스크탑에서 가로로 전환된다. */
export const Responsive: Story = {
	render: () => (
		<Stack responsive spacing="md">
			<Box>항목 1</Box>
			<Box>항목 2</Box>
			<Box>항목 3</Box>
		</Stack>
	)
};

/** 모든 간격 비교. */
export const AllSpacings: Story = {
	render: () => (
		<div className="space-y-6">
			{(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
				<div key={s}>
					<p className="text-fg-secondary mb-2 text-sm">{s}</p>
					<Stack direction="row" spacing={s}>
						<Box>A</Box>
						<Box>B</Box>
						<Box>C</Box>
					</Stack>
				</div>
			))}
		</div>
	)
};
