import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
	it("기본 렌더링", () => {
		render(<Textarea aria-label="내용" />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("variant에 따라 올바른 스타일 적용", () => {
		const { rerender } = render(<Textarea aria-label="내용" variant="default" />);
		expect(screen.getByRole("textbox")).toHaveClass("bg-surface");

		rerender(<Textarea aria-label="내용" variant="filled" />);
		expect(screen.getByRole("textbox")).toHaveClass("bg-surface-alt");
	});

	it("size에 따라 올바른 스타일 적용", () => {
		const { rerender } = render(<Textarea aria-label="내용" size="sm" />);
		expect(screen.getByRole("textbox")).toHaveClass("min-h-20");

		rerender(<Textarea aria-label="내용" size="md" />);
		expect(screen.getByRole("textbox")).toHaveClass("min-h-28");

		rerender(<Textarea aria-label="내용" size="lg" />);
		expect(screen.getByRole("textbox")).toHaveClass("min-h-40");
	});

	it("사용자 입력 처리", async () => {
		const handleChange = vi.fn();
		const { user } = render(<Textarea aria-label="내용" onChange={handleChange} />);

		await user.type(screen.getByRole("textbox"), "텍스트 입력");
		expect(handleChange).toHaveBeenCalled();
	});

	it("placeholder 표시", () => {
		render(<Textarea placeholder="내용을 입력하세요" />);
		expect(screen.getByPlaceholderText("내용을 입력하세요")).toBeInTheDocument();
	});

	it("disabled 상태", () => {
		render(<Textarea aria-label="내용" disabled />);
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("ref 전달", () => {
		const ref = createRef<HTMLTextAreaElement>();
		render(<Textarea ref={ref} aria-label="내용" />);
		expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
	});

	it("커스텀 className 병합", () => {
		render(<Textarea aria-label="내용" className="custom-textarea" />);
		expect(screen.getByRole("textbox")).toHaveClass("custom-textarea");
	});
});
