import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Input } from "./Input";

describe("Input", () => {
	describe("사용자 상호작용", () => {
		it("텍스트 입력 처리", async () => {
			const handleChange = vi.fn();
			const { user } = render(<Input aria-label="입력" onChange={handleChange} />);

			await user.type(screen.getByRole("textbox"), "안녕하세요");
			expect(handleChange).toHaveBeenCalled();
			expect(screen.getByRole("textbox")).toHaveValue("안녕하세요");
		});

		it("Enter 키 이벤트 처리", async () => {
			const handleKeyDown = vi.fn();
			const { user } = render(<Input aria-label="검색" onKeyDown={handleKeyDown} />);

			const input = screen.getByRole("textbox");
			input.focus();
			await user.keyboard("{Enter}");
			expect(handleKeyDown).toHaveBeenCalled();
		});

		it("disabled 상태에서 입력 차단", async () => {
			const handleChange = vi.fn();
			const { user } = render(<Input aria-label="입력" disabled onChange={handleChange} />);

			const input = screen.getByRole("textbox");
			expect(input).toBeDisabled();

			await user.type(input, "테스트");
			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe("접근성", () => {
		it("textbox role 제공", () => {
			render(<Input aria-label="입력" />);
			expect(screen.getByRole("textbox")).toBeInTheDocument();
		});

		it("placeholder로 접근 가능", () => {
			render(<Input placeholder="이름을 입력하세요" />);
			expect(screen.getByPlaceholderText("이름을 입력하세요")).toBeInTheDocument();
		});

		it("aria-label로 식별 가능", () => {
			render(<Input aria-label="이메일 주소" />);
			expect(screen.getByRole("textbox", { name: "이메일 주소" })).toBeInTheDocument();
		});

		it("required 상태 전달", () => {
			render(<Input aria-label="이름" required />);
			expect(screen.getByRole("textbox")).toBeRequired();
		});

		it("type 속성으로 입력 형식 지정", () => {
			render(<Input aria-label="이메일" type="email" />);
			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("type", "email");
		});
	});

	describe("Variants", () => {
		it("다양한 variant 지원", () => {
			const { rerender } = render(<Input aria-label="입력" variant="default" />);
			expect(screen.getByRole("textbox")).toBeInTheDocument();

			rerender(<Input aria-label="입력" variant="filled" />);
			expect(screen.getByRole("textbox")).toBeInTheDocument();
		});

		it("다양한 size 지원", () => {
			const sizes = ["sm", "md", "lg"] as const;
			const { rerender } = render(<Input aria-label="입력" size="sm" />);

			sizes.forEach((size) => {
				rerender(<Input aria-label="입력" size={size} />);
				expect(screen.getByRole("textbox")).toBeInTheDocument();
			});
		});
	});

	describe("React 19 ref", () => {
		it("ref를 prop으로 전달 (HTMLInputElement)", () => {
			const ref = createRef<HTMLInputElement>();
			render(<Input ref={ref} aria-label="입력" />);
			expect(ref.current).toBeInstanceOf(HTMLInputElement);
			expect(ref.current?.tagName).toBe("INPUT");
		});
	});

	describe("커스터마이징", () => {
		it("커스텀 className 병합", () => {
			render(<Input aria-label="입력" className="custom-input" />);
			expect(screen.getByRole("textbox")).toHaveClass("custom-input");
		});
	});
});
