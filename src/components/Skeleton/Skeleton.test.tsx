import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
	it("기본 렌더링", () => {
		render(<Skeleton data-testid="skeleton" />);
		expect(screen.getByTestId("skeleton")).toBeInTheDocument();
	});

	it("aria-hidden 속성이 적용됨", () => {
		render(<Skeleton data-testid="skeleton" />);
		expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true");
	});

	it("animate-pulse 클래스 적용", () => {
		render(<Skeleton data-testid="skeleton" />);
		expect(screen.getByTestId("skeleton")).toHaveClass("animate-pulse");
	});

	it("커스텀 className 병합", () => {
		render(<Skeleton data-testid="skeleton" className="h-4 w-32" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("h-4", "w-32");
		expect(skeleton).toHaveClass("animate-pulse");
	});

	it("ref 전달", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Skeleton ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("HTML div 속성 전달", () => {
		render(<Skeleton data-testid="skeleton" role="presentation" />);
		expect(screen.getByTestId("skeleton")).toHaveAttribute("role", "presentation");
	});
});
