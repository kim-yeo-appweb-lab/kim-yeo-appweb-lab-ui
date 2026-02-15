import { type Meta, type StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";

import { TagInput } from "./TagInput";

/**
 * 태그 입력 컴포넌트. Enter로 태그를 추가하고 Backspace로 마지막 태그를 삭제한다.
 * maxTags로 최대 태그 수를 제한할 수 있다.
 */
const meta = {
	title: "Components/TagInput",
	component: TagInput,
	tags: ["autodocs"],
	args: {
		value: [],
		placeholder: "태그 입력 후 Enter"
	},
	argTypes: {
		maxTags: {
			control: { type: "number", min: 1, max: 20 }
		},
		placeholder: {
			control: "text"
		}
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handleChange(tags: string[]) {
			updateArgs({ value: tags });
		}

		return <TagInput {...args} onChange={handleChange} />;
	}
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 빈 상태. placeholder가 표시된다. */
export const Default: Story = {
	parameters: {
		docs: {
			source: {
				code: `<TagInput value={tags} onChange={setTags} placeholder="태그 입력 후 Enter" />`
			}
		}
	}
};

/** 태그가 미리 입력된 상태. */
export const WithTags: Story = {
	args: {
		value: ["Frontend", "Backend", "Design"]
	},
	parameters: {
		docs: {
			source: {
				code: `<TagInput value={["Frontend", "Backend", "Design"]} onChange={setTags} />`
			}
		}
	}
};

/** 최대 태그 수에 도달한 상태. 입력 필드가 숨겨진다. */
export const MaxReached: Story = {
	args: {
		value: ["Frontend", "Backend", "Design", "DevOps", "QA"],
		maxTags: 5
	},
	parameters: {
		docs: {
			source: {
				code: `<TagInput value={tags} onChange={setTags} maxTags={5} />`
			}
		}
	}
};
