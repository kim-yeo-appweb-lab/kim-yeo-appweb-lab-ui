import { type Meta, type StoryObj } from "@storybook/react";

import { Grid } from "./Grid";

/**
 * 반응형 다단 레이아웃 컴포넌트.
 * colsMobile/colsTablet/colsDesktop으로 브레이크포인트별 컬럼 수를 지정한다.
 */
const meta = {
	title: "Layout/Grid",
	component: Grid,
	tags: ["autodocs"],
	argTypes: {
		cols: {
			control: "select",
			options: [1, 2, 3, 4, 5, 6]
		},
		gap: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		}
	}
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-surface-alt rounded-lg border p-4 text-center">{children}</div>
);

/** 고정 3컬럼. */
export const ThreeColumns: Story = {
	render: () => (
		<Grid cols={3} gap="md">
			<Box>1</Box>
			<Box>2</Box>
			<Box>3</Box>
			<Box>4</Box>
			<Box>5</Box>
			<Box>6</Box>
		</Grid>
	)
};

/** 반응형 그리드. 모바일 1열, 태블릿 2열, 데스크탑 3열. */
export const Responsive: Story = {
	render: () => (
		<Grid colsMobile={1} colsTablet={2} colsDesktop={3} gap="md">
			<Box>1</Box>
			<Box>2</Box>
			<Box>3</Box>
			<Box>4</Box>
			<Box>5</Box>
			<Box>6</Box>
		</Grid>
	)
};

/** 모든 간격 비교. */
export const AllGaps: Story = {
	render: () => (
		<div className="space-y-6">
			{(["xs", "sm", "md", "lg", "xl"] as const).map((g) => (
				<div key={g}>
					<p className="text-fg-secondary mb-2 text-sm">gap: {g}</p>
					<Grid cols={3} gap={g}>
						<Box>A</Box>
						<Box>B</Box>
						<Box>C</Box>
					</Grid>
				</div>
			))}
		</div>
	)
};
