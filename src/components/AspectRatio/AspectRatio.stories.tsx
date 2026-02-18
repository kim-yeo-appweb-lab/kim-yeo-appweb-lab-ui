import { type Meta, type StoryObj } from "@storybook/react";

import { AspectRatio } from "./AspectRatio";

/**
 * 이미지/미디어의 종횡비를 유지하는 래퍼 컴포넌트.
 * square(1:1), video(16:9), portrait(2:3), wide(21:9) 프리셋을 제공한다.
 */
const meta = {
	title: "Layout/AspectRatio",
	component: AspectRatio,
	tags: ["autodocs"],
	argTypes: {
		ratio: {
			control: "select",
			options: ["square", "video", "portrait", "wide"]
		}
	}
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ label }: { label: string }) => (
	<div className="bg-surface-alt text-fg-secondary flex h-full w-full items-center justify-center rounded-lg border text-sm">
		{label}
	</div>
);

/** 16:9 비디오 비율 (기본). */
export const Video: Story = {
	render: () => (
		<div className="w-80">
			<AspectRatio ratio="video">
				<Placeholder label="16:9" />
			</AspectRatio>
		</div>
	)
};

/** 1:1 정사각형. 프로필 이미지, 썸네일 등에 사용한다. */
export const Square: Story = {
	render: () => (
		<div className="w-48">
			<AspectRatio ratio="square">
				<Placeholder label="1:1" />
			</AspectRatio>
		</div>
	)
};

/** 모든 비율 비교. */
export const AllRatios: Story = {
	render: () => (
		<div className="flex flex-wrap items-start gap-4">
			{(["square", "video", "portrait", "wide"] as const).map((r) => (
				<div key={r} className="w-48">
					<p className="text-fg-secondary mb-2 text-sm">{r}</p>
					<AspectRatio ratio={r}>
						<Placeholder label={r} />
					</AspectRatio>
				</div>
			))}
		</div>
	)
};
