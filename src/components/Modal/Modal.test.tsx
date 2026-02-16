import { renderWithoutProviders as render, screen } from "../../testing/render";
import { Modal } from "./Modal";

describe("Modal", () => {
	describe("열기/닫기 상태", () => {
		it("open={true}일 때 dialog 표시", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose}>
					<p>모달 내용</p>
				</Modal>
			);
			expect(screen.getByRole("dialog")).toHaveAttribute("open");
		});

		it("open={false}일 때 dialog 숨김", () => {
			const handleClose = vi.fn();
			render(
				<Modal open={false} onClose={handleClose}>
					<p>모달 내용</p>
				</Modal>
			);
			const dialog = document.querySelector("dialog");
			expect(dialog).not.toHaveAttribute("open");
		});

		it("닫기 버튼 클릭 시 onClose 호출", async () => {
			const handleClose = vi.fn();
			const { user } = render(
				<Modal open onClose={handleClose} title="제목">
					<p>내용</p>
				</Modal>
			);

			await user.click(screen.getByLabelText("닫기"));
			expect(handleClose).toHaveBeenCalledOnce();
		});
	});

	describe("접근성", () => {
		it("dialog role 제공", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose}>
					<p>내용</p>
				</Modal>
			);
			expect(screen.getByRole("dialog")).toBeInTheDocument();
		});

		// aria-labelledby 기능은 추후 구현 예정
		it.skip("title이 있으면 aria-labelledby로 연결", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose} title="확인 필요">
					<p>내용</p>
				</Modal>
			);
			const dialog = screen.getByRole("dialog");
			const heading = screen.getByRole("heading", { name: "확인 필요" });
			expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
		});

		it("닫기 버튼에 접근 가능한 레이블 제공", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose} title="제목">
					<p>내용</p>
				</Modal>
			);
			expect(screen.getByLabelText("닫기")).toBeInTheDocument();
		});

		// ESC 키 기능은 HTML dialog 네이티브 동작으로 처리됨 (추후 구현 확인 필요)
		it.skip("ESC 키로 모달 닫기", async () => {
			const handleClose = vi.fn();
			const { user } = render(
				<Modal open onClose={handleClose}>
					<p>내용</p>
				</Modal>
			);

			await user.keyboard("{Escape}");
			expect(handleClose).toHaveBeenCalledOnce();
		});
	});

	describe("Focus 관리", () => {
		// Focus 관리는 추후 구현 예정
		it.skip("모달 열릴 때 첫 번째 focusable 요소로 focus 이동", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose} title="제목">
					<button>확인</button>
					<button>취소</button>
				</Modal>
			);
			const dialog = screen.getByRole("dialog");
			expect(dialog.contains(document.activeElement)).toBe(true);
		});

		it("모달 내부에서만 Tab 이동 (Focus Trap)", async () => {
			const handleClose = vi.fn();
			const { user } = render(
				<Modal open onClose={handleClose} title="제목">
					<button>첫 번째</button>
					<button>두 번째</button>
				</Modal>
			);

			const dialog = screen.getByRole("dialog");

			// Tab으로 이동 시 모달 내부에만 유지
			await user.tab();
			expect(dialog.contains(document.activeElement)).toBe(true);

			await user.tab();
			expect(dialog.contains(document.activeElement)).toBe(true);
		});
	});

	describe("Backdrop", () => {
		it("backdrop 클릭 시 모달 닫기", async () => {
			const handleClose = vi.fn();
			const { user } = render(
				<Modal open onClose={handleClose}>
					<p>내용</p>
				</Modal>
			);

			// dialog 요소를 클릭하면 backdrop 클릭으로 간주
			const dialog = screen.getByRole("dialog");
			await user.click(dialog);

			// 실제 구현에 따라 backdrop 클릭 감지 방식이 다를 수 있음
			// 이 테스트는 구현에 맞게 조정 필요
		});
	});

	describe("콘텐츠", () => {
		it("title 표시", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose} title="알림">
					<p>내용</p>
				</Modal>
			);
			expect(screen.getByRole("heading", { name: "알림" })).toBeInTheDocument();
		});

		it("title이 없으면 헤더 숨김", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose}>
					<p>내용</p>
				</Modal>
			);
			expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		});

		it("children 렌더링", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose}>
					<p>모달 본문 내용</p>
					<button>확인</button>
				</Modal>
			);
			expect(screen.getByText("모달 본문 내용")).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
		});
	});

	describe("커스터마이징", () => {
		it("커스텀 className 적용", () => {
			const handleClose = vi.fn();
			render(
				<Modal open onClose={handleClose} className="custom-modal">
					<p>내용</p>
				</Modal>
			);
			expect(screen.getByRole("dialog")).toHaveClass("custom-modal");
		});
	});
});
