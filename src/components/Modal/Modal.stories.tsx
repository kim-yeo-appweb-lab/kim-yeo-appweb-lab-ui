import { type Meta, type StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";

import { Button } from "../Button";
import { Modal } from "./Modal";

/**
 * 다이얼로그 모달. 네이티브 dialog 요소 기반으로 접근성을 보장한다.
 * 배경 클릭 또는 ESC 키로 닫을 수 있다.
 */
const meta = {
	title: "Components/Modal",
	component: Modal,
	tags: ["autodocs"],
	args: {
		open: false,
		title: "모달 제목",
		children: "모달 본문 내용입니다."
	},
	argTypes: {
		open: {
			control: "boolean"
		},
		title: {
			control: "text"
		}
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handleOpen() {
			updateArgs({ open: true });
		}

		function handleClose() {
			updateArgs({ open: false });
		}

		return (
			<>
				<Button onClick={handleOpen}>모달 열기</Button>
				<Modal {...args} onClose={handleClose} />
			</>
		);
	}
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 모달. 제목과 본문을 포함한다. */
export const Default: Story = {
	parameters: {
		docs: {
			source: {
				code: `<Modal open={open} onClose={handleClose} title="모달 제목">
  모달 본문 내용입니다.
</Modal>`
			}
		}
	}
};

/** 제목 없는 모달. 간단한 안내 메시지에 적합하다. */
export const WithoutTitle: Story = {
	args: {
		title: undefined,
		children: "제목 없는 모달입니다."
	},
	parameters: {
		docs: {
			source: {
				code: `<Modal open={open} onClose={handleClose}>
  제목 없는 모달입니다.
</Modal>`
			}
		}
	}
};

/** 확인 다이얼로그. 삭제 등 되돌릴 수 없는 작업 전 사용자 확인에 사용한다. */
export const Confirmation: Story = {
	args: {
		title: "확인",
		children: undefined
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		function handleOpen() {
			updateArgs({ open: true });
		}

		function handleClose() {
			updateArgs({ open: false });
		}

		return (
			<>
				<Button onClick={handleOpen}>삭제 확인 모달</Button>
				<Modal {...args} onClose={handleClose}>
					<p className="text-fg-secondary text-sm">정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
					<div className="mt-4 flex justify-end gap-2">
						<Button variant="secondary" size="sm" onClick={handleClose}>
							취소
						</Button>
						<Button size="sm" onClick={handleClose}>
							삭제
						</Button>
					</div>
				</Modal>
			</>
		);
	},
	parameters: {
		docs: {
			source: {
				code: `<Modal open={open} onClose={handleClose} title="확인">
  <p>정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
  <div>
    <Button variant="secondary" size="sm" onClick={handleClose}>취소</Button>
    <Button size="sm" onClick={handleClose}>삭제</Button>
  </div>
</Modal>`
			}
		}
	}
};
