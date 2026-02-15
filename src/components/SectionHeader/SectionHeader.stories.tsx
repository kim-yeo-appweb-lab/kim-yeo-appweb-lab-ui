import { type Meta, type StoryObj } from "@storybook/react";

import { Badge } from "../Badge";
import { SectionHeader } from "./SectionHeader";

/**
 * 섹션 헤더. 제목과 선택적 더보기 링크를 포함하며,
 * children으로 배지 등 추가 요소를 삽입할 수 있다.
 */
const meta = {
	title: "Components/SectionHeader",
	component: SectionHeader,
	tags: ["autodocs"],
	args: {
		title: "최근 항목"
	},
	argTypes: {
		title: {
			control: "text"
		},
		href: {
			control: "text"
		},
		linkLabel: {
			control: "text"
		}
	}
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 제목만 표시하는 기본 상태. */
export const Default: Story = {};

/** 더보기 링크 포함. linkLabel로 텍스트를 커스터마이즈할 수 있다. */
export const WithLink: Story = {
	args: {
		title: "인기 제품",
		href: "/products",
		linkLabel: "전체 보기"
	}
};

/** children으로 배지를 추가한 구성. */
export const WithChildren: Story = {
	render: (args) => (
		<SectionHeader {...args} title="새 소식" href="/news">
			<Badge colorScheme="blue">신규</Badge>
		</SectionHeader>
	),
	parameters: {
		docs: {
			source: {
				code: `<SectionHeader title="새 소식" href="/news">
  <Badge colorScheme="blue">신규</Badge>
</SectionHeader>`
			}
		}
	}
};
