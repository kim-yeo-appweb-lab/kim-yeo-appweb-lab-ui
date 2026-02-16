import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing/render";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	it("이미지가 있으면 img 렌더링", () => {
		render(<Avatar src="/avatar.jpg" name="홍길동" />);
		const img = screen.getByRole("img", { name: "홍길동" });
		expect(img).toHaveAttribute("src", "/avatar.jpg");
	});

	it("이미지가 없으면 이름의 첫 글자를 폴백으로 표시", () => {
		render(<Avatar name="홍길동" />);
		expect(screen.getByText("홍")).toBeInTheDocument();
		expect(screen.getByLabelText("홍길동")).toBeInTheDocument();
	});

	it("src가 null이면 폴백 표시", () => {
		render(<Avatar src={null} name="김철수" />);
		expect(screen.getByText("김")).toBeInTheDocument();
	});

	it("size에 따라 올바른 스타일 적용", () => {
		const { rerender } = render(<Avatar name="테스트" size="sm" />);
		expect(screen.getByLabelText("테스트")).toHaveClass("h-8", "w-8");

		rerender(<Avatar name="테스트" size="md" />);
		expect(screen.getByLabelText("테스트")).toHaveClass("h-10", "w-10");

		rerender(<Avatar name="테스트" size="lg" />);
		expect(screen.getByLabelText("테스트")).toHaveClass("h-16", "w-16");
	});

	it("이미지 모드에서 size 스타일 적용", () => {
		render(<Avatar src="/test.jpg" name="테스트" size="lg" />);
		expect(screen.getByRole("img")).toHaveClass("h-16", "w-16");
	});

	it("ref 전달 (폴백 모드)", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Avatar name="테스트" ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("커스텀 className 병합", () => {
		render(<Avatar name="테스트" className="my-avatar" />);
		expect(screen.getByLabelText("테스트")).toHaveClass("my-avatar");
	});

	it("영문 이름은 대문자로 폴백 표시", () => {
		render(<Avatar name="alice" />);
		expect(screen.getByText("A")).toBeInTheDocument();
	});
});
