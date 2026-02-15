import { type Meta, type StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

/**
 * 콘텐츠 로딩 플레이스홀더. className으로 크기와 형태를 지정하여
 * 실제 콘텐츠 레이아웃을 미리 보여준다.
 */
const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	tags: ["autodocs"]
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 직사각형 스켈레톤. */
export const Default: Story = {
	args: {
		className: "h-4 w-48"
	}
};

/** 원형 스켈레톤. 아바타 로딩에 적합하다. */
export const Circle: Story = {
	args: {
		className: "h-10 w-10 rounded-full"
	}
};

/** 카드 레이아웃의 스켈레톤 조합. */
export const CardSkeleton: Story = {
	render: () => (
		<div className="border-border bg-surface w-80 space-y-3 rounded-xl border p-4">
			<div className="flex items-center gap-3">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-16" />
				</div>
			</div>
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-32 w-full rounded-lg" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Skeleton className="h-10 w-10 rounded-full" />
<Skeleton className="h-4 w-24" />
<Skeleton className="h-3 w-16" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-32 w-full rounded-lg" />`
			}
		}
	}
};

/** 리스트 레이아웃의 스켈레톤 반복 패턴. */
export const ListSkeleton: Story = {
	render: () => (
		<div className="w-80 space-y-4">
			{Array.from({ length: 3 }, (_, i) => (
				<div key={i} className="flex items-center gap-3">
					<Skeleton className="h-12 w-12 rounded-lg" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Skeleton className="h-12 w-12 rounded-lg" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-3 w-1/2" />`
			}
		}
	}
};
