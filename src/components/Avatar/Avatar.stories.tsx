import { type Meta, type StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

/**
 * 사용자 아바타. 이미지가 없으면 이름에서 이니셜을 자동 생성한다.
 * sm, md, lg 세 가지 크기를 제공한다.
 */
const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg"]
		},
		src: {
			control: "text"
		},
		name: {
			control: "text"
		}
	}
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 이미지 없는 기본 상태. 이름에서 이니셜이 생성된다. */
export const Default: Story = {
	args: {
		name: "John Doe"
	}
};

/** 이미지가 있는 아바타. */
export const WithImage: Story = {
	args: {
		name: "John Doe",
		src: "https://picsum.photos/200"
	}
};

/** 작은 크기. 목록 항목 등에 적합하다. */
export const Small: Story = {
	args: {
		name: "Jane Smith",
		size: "sm"
	}
};

/** 중간 크기. 기본값이다. */
export const Medium: Story = {
	args: {
		name: "Jane Smith",
		size: "md"
	}
};

/** 큰 크기. 프로필 페이지 등에 적합하다. */
export const Large: Story = {
	args: {
		name: "Jane Smith",
		size: "lg"
	}
};

/** 모든 크기 비교. */
export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Avatar name="John Doe" size="sm" />
			<Avatar name="John Doe" size="md" />
			<Avatar name="John Doe" size="lg" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Avatar name="John Doe" size="sm" />
<Avatar name="John Doe" size="md" />
<Avatar name="John Doe" size="lg" />`
			}
		}
	}
};

/** 이니셜 폴백. 이름 첫 글자로 아바타를 생성한다. */
export const FallbackInitials: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Avatar name="Alice" />
			<Avatar name="Bob" />
			<Avatar name="Charlie" />
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `<Avatar name="Alice" />
<Avatar name="Bob" />
<Avatar name="Charlie" />`
			}
		}
	}
};
