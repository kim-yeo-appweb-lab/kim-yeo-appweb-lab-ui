import { renderWithoutProviders as render, screen } from "../../testing";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
	it("title 렌더링", () => {
		render(<SectionHeader title="섹션 제목" />);
		expect(screen.getByRole("heading", { name: "섹션 제목" })).toBeInTheDocument();
	});

	it("href가 있으면 링크 렌더링", () => {
		render(<SectionHeader title="섹션" href="/more" />);
		const link = screen.getByRole("link", { name: "더보기" });
		expect(link).toHaveAttribute("href", "/more");
	});

	it("커스텀 linkLabel 적용", () => {
		render(<SectionHeader title="섹션" href="/all" linkLabel="전체 보기" />);
		expect(screen.getByRole("link", { name: "전체 보기" })).toBeInTheDocument();
	});

	it("href가 없으면 링크 미렌더링", () => {
		render(<SectionHeader title="섹션" />);
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("children 렌더링", () => {
		render(
			<SectionHeader title="섹션">
				<button>필터</button>
			</SectionHeader>
		);
		expect(screen.getByRole("button", { name: "필터" })).toBeInTheDocument();
	});

	it("children과 href 모두 렌더링", () => {
		render(
			<SectionHeader title="섹션" href="/more">
				<button>정렬</button>
			</SectionHeader>
		);
		expect(screen.getByRole("button", { name: "정렬" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "더보기" })).toBeInTheDocument();
	});

	it("커스텀 className 병합", () => {
		const { container } = render(<SectionHeader title="섹션" className="custom-header" />);
		expect(container.firstChild).toHaveClass("custom-header");
	});
});
