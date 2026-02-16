import { renderWithoutProviders as render, screen } from "../../testing";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
	it("title 렌더링", () => {
		render(<EmptyState title="데이터가 없습니다" />);
		expect(screen.getByRole("heading", { name: "데이터가 없습니다" })).toBeInTheDocument();
	});

	it("description 렌더링", () => {
		render(<EmptyState title="비어있음" description="항목을 추가해보세요" />);
		expect(screen.getByText("항목을 추가해보세요")).toBeInTheDocument();
	});

	it("description이 없으면 미렌더링", () => {
		const { container } = render(<EmptyState title="비어있음" />);
		expect(container.querySelector("p")).not.toBeInTheDocument();
	});

	it("icon 렌더링", () => {
		render(<EmptyState title="비어있음" icon={<span data-testid="icon">아이콘</span>} />);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("action 렌더링", () => {
		render(<EmptyState title="비어있음" action={<button>추가하기</button>} />);
		expect(screen.getByRole("button", { name: "추가하기" })).toBeInTheDocument();
	});

	it("커스텀 className 병합", () => {
		const { container } = render(<EmptyState title="비어있음" className="custom-empty" />);
		expect(container.firstChild).toHaveClass("custom-empty");
	});

	it("모든 props 조합 렌더링", () => {
		render(
			<EmptyState
				icon={<span data-testid="icon">아이콘</span>}
				title="결과 없음"
				description="검색 조건을 변경해보세요"
				action={<button>초기화</button>}
			/>
		);

		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "결과 없음" })).toBeInTheDocument();
		expect(screen.getByText("검색 조건을 변경해보세요")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "초기화" })).toBeInTheDocument();
	});
});
