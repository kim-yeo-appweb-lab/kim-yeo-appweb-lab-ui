import { type Meta, type StoryObj } from "@storybook/react";

import { ThemeProvider } from "../../contexts/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

/**
 * 라이트/다크 테마 전환 토글. ThemeProvider 내부에서 사용해야 한다.
 * 현재 테마 상태에 따라 태양/달 아이콘이 전환된다.
 */
const meta = {
	title: "Components/ThemeToggle",
	component: ThemeToggle,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<ThemeProvider>
				<div className="bg-primary inline-flex rounded-lg p-2">
					<Story />
				</div>
			</ThemeProvider>
		)
	]
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 상태. 클릭하면 테마가 전환된다. */
export const Default: Story = {};
