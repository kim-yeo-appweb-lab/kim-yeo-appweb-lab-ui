import { renderWithoutProviders as render, screen } from "../../testing";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
	const items = [{ label: "홈", href: "/" }, { label: "카테고리", href: "/category" }, { label: "현재 페이지" }];

	it("기본 렌더링", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.getByLabelText("경로")).toBeInTheDocument();
	});

	it("모든 항목이 렌더링됨", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.getByText("홈")).toBeInTheDocument();
		expect(screen.getByText("카테고리")).toBeInTheDocument();
		expect(screen.getByText("현재 페이지")).toBeInTheDocument();
	});

	it("href가 있는 항목은 링크로 렌더링 (마지막 제외)", () => {
		render(<Breadcrumb items={items} />);
		const homeLink = screen.getByRole("link", { name: "홈" });
		expect(homeLink).toHaveAttribute("href", "/");

		const categoryLink = screen.getByRole("link", { name: "카테고리" });
		expect(categoryLink).toHaveAttribute("href", "/category");
	});

	it("마지막 항목은 링크가 아닌 텍스트로 렌더링", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.queryByRole("link", { name: "현재 페이지" })).not.toBeInTheDocument();
		expect(screen.getByText("현재 페이지")).toBeInTheDocument();
	});

	it("마지막 항목은 font-medium 클래스 적용", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.getByText("현재 페이지")).toHaveClass("font-medium");
	});

	it("단일 항목만 있을 때", () => {
		render(<Breadcrumb items={[{ label: "홈" }]} />);
		expect(screen.getByText("홈")).toBeInTheDocument();
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("커스텀 className 병합", () => {
		render(<Breadcrumb items={items} className="custom-breadcrumb" />);
		expect(screen.getByLabelText("경로")).toHaveClass("custom-breadcrumb");
	});
});
