import { type Meta, type StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";

import { Pagination } from "./Pagination";

/**
 * 페이지 내비게이션. 대량 데이터를 페이지 단위로 탐색할 때 사용한다.
 * 현재 페이지 주변 번호와 처음/끝 페이지를 표시하며, 중간은 ellipsis로 축약한다.
 */
const meta = {
	title: "Components/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	args: {
		currentPage: 1,
		totalPages: 10
	},
	argTypes: {
		currentPage: {
			control: { type: "number", min: 1 }
		},
		totalPages: {
			control: { type: "number", min: 1 }
		}
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handlePageChange(page: number) {
			updateArgs({ currentPage: page });
		}

		return <Pagination {...args} onPageChange={handlePageChange} />;
	}
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 첫 페이지 상태. 이전 버튼이 비활성화된다. */
export const FirstPage: Story = {
	args: {
		currentPage: 1,
		totalPages: 10
	},
	parameters: {
		docs: {
			source: {
				code: `<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />`
			}
		}
	}
};

/** 중간 페이지. 양쪽 ellipsis가 표시되는 상태이다. */
export const MiddlePage: Story = {
	args: {
		currentPage: 5,
		totalPages: 10
	},
	parameters: {
		docs: {
			source: {
				code: `<Pagination currentPage={5} totalPages={10} onPageChange={setPage} />`
			}
		}
	}
};

/** 마지막 페이지. 다음 버튼이 비활성화된다. */
export const LastPage: Story = {
	args: {
		currentPage: 10,
		totalPages: 10
	},
	parameters: {
		docs: {
			source: {
				code: `<Pagination currentPage={10} totalPages={10} onPageChange={setPage} />`
			}
		}
	}
};

/** 페이지 수가 적은 경우. ellipsis 없이 모든 번호가 표시된다. */
export const FewPages: Story = {
	args: {
		currentPage: 2,
		totalPages: 3
	},
	parameters: {
		docs: {
			source: {
				code: `<Pagination currentPage={2} totalPages={3} onPageChange={setPage} />`
			}
		}
	}
};

/** 페이지 수가 많은 경우. 양쪽 ellipsis로 축약된 상태이다. */
export const ManyPages: Story = {
	args: {
		currentPage: 15,
		totalPages: 50
	},
	parameters: {
		docs: {
			source: {
				code: `<Pagination currentPage={15} totalPages={50} onPageChange={setPage} />`
			}
		}
	}
};
