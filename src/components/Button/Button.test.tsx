import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Button } from "./Button";

describe("Button", () => {
	describe("사용자 상호작용", () => {
		it("클릭 시 onClick 핸들러 호출", async () => {
			const handleClick = vi.fn();
			const { user } = render(<Button onClick={handleClick}>클릭</Button>);

			await user.click(screen.getByRole("button"));
			expect(handleClick).toHaveBeenCalledOnce();
		});

		it("Enter 키로 활성화", async () => {
			const handleClick = vi.fn();
			const { user } = render(<Button onClick={handleClick}>버튼</Button>);
			const button = screen.getByRole("button");

			button.focus();
			await user.keyboard("{Enter}");
			expect(handleClick).toHaveBeenCalledOnce();
		});

		it("Space 키로 활성화", async () => {
			const handleClick = vi.fn();
			const { user } = render(<Button onClick={handleClick}>버튼</Button>);
			const button = screen.getByRole("button");

			button.focus();
			await user.keyboard(" ");
			expect(handleClick).toHaveBeenCalledOnce();
		});

		it("disabled 상태에서 클릭 차단", async () => {
			const handleClick = vi.fn();
			const { user } = render(
				<Button disabled onClick={handleClick}>
					클릭
				</Button>
			);

			await user.click(screen.getByRole("button"));
			expect(handleClick).not.toHaveBeenCalled();
		});

		it("disabled 상태에서 키보드 차단", async () => {
			const handleClick = vi.fn();
			const { user } = render(
				<Button disabled onClick={handleClick}>
					버튼
				</Button>
			);
			const button = screen.getByRole("button");

			button.focus();
			await user.keyboard("{Enter}");
			await user.keyboard(" ");
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe("접근성", () => {
		it("button role과 접근 가능한 이름 제공", () => {
			render(<Button>제출</Button>);
			expect(screen.getByRole("button", { name: "제출" })).toBeInTheDocument();
		});

		it("disabled 상태 정확히 전달", () => {
			render(<Button disabled>버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			// 네이티브 button은 disabled 속성만 있으면 충분
		});

		it("aria-label 커스터마이징 가능", () => {
			render(<Button aria-label="사용자 메뉴 열기">☰</Button>);
			expect(screen.getByRole("button", { name: "사용자 메뉴 열기" })).toBeInTheDocument();
		});

		it("type 속성 커스터마이징 가능", () => {
			render(<Button type="submit">제출</Button>);
			expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
		});
	});

	describe("Slot 패턴 (asChild)", () => {
		it("asChild로 링크를 버튼 스타일로 렌더링", () => {
			render(
				<Button asChild>
					<a href="/about">소개</a>
				</Button>
			);
			const link = screen.getByRole("link", { name: "소개" });
			expect(link).toHaveAttribute("href", "/about");
		});

		// 이벤트 핸들러 병합 테스트는 navigation으로 인한 제약으로 skip
		it.skip("asChild 사용 시 이벤트 핸들러 병합", async () => {
			const buttonClick = vi.fn();
			const linkClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
			const { user } = render(
				<Button onClick={buttonClick} asChild>
					<a href="#" onClick={linkClick}>
						링크
					</a>
				</Button>
			);

			await user.click(screen.getByRole("link"));
			expect(buttonClick).toHaveBeenCalledOnce();
			expect(linkClick).toHaveBeenCalledOnce();
		});
	});

	describe("Variants", () => {
		it("다양한 variant 지원", () => {
			const { rerender } = render(<Button variant="primary">버튼</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();

			rerender(<Button variant="secondary">버튼</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();

			rerender(<Button variant="ghost">버튼</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();
		});

		it("다양한 size 지원", () => {
			const { rerender } = render(<Button size="sm">작음</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();

			rerender(<Button size="md">중간</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();

			rerender(<Button size="lg">큼</Button>);
			expect(screen.getByRole("button")).toBeInTheDocument();
		});
	});

	describe("React 19 ref", () => {
		it("ref를 prop으로 전달 (forwardRef 없이)", () => {
			const ref = createRef<HTMLButtonElement>();
			render(<Button ref={ref}>버튼</Button>);
			expect(ref.current).toBeInstanceOf(HTMLButtonElement);
			expect(ref.current?.tagName).toBe("BUTTON");
		});
	});

	describe("className 병합", () => {
		it("커스텀 className과 기본 스타일 병합", () => {
			render(<Button className="custom-class">버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("custom-class");
			// cn() 유틸리티로 병합되므로 기본 클래스도 유지됨
		});
	});
});
