import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Card } from "./Card";

describe("Card", () => {
	it("기본 렌더링", () => {
		render(<Card data-testid="card">내용</Card>);
		expect(screen.getByTestId("card")).toBeInTheDocument();
		expect(screen.getByText("내용")).toBeInTheDocument();
	});

	it("Card.Header 렌더링", () => {
		render(
			<Card>
				<Card.Header data-testid="header">헤더</Card.Header>
			</Card>
		);
		expect(screen.getByTestId("header")).toBeInTheDocument();
		expect(screen.getByText("헤더")).toBeInTheDocument();
	});

	it("Card.Title 렌더링", () => {
		render(
			<Card>
				<Card.Header>
					<Card.Title>제목</Card.Title>
				</Card.Header>
			</Card>
		);
		expect(screen.getByRole("heading", { level: 3, name: "제목" })).toBeInTheDocument();
	});

	it("Card.Content 렌더링", () => {
		render(
			<Card>
				<Card.Content data-testid="content">본문</Card.Content>
			</Card>
		);
		expect(screen.getByTestId("content")).toBeInTheDocument();
		expect(screen.getByText("본문")).toBeInTheDocument();
	});

	it("Card.Footer 렌더링", () => {
		render(
			<Card>
				<Card.Footer data-testid="footer">푸터</Card.Footer>
			</Card>
		);
		expect(screen.getByTestId("footer")).toBeInTheDocument();
		expect(screen.getByText("푸터")).toBeInTheDocument();
	});

	it("모든 서브 컴포넌트 조합", () => {
		render(
			<Card data-testid="card">
				<Card.Header>
					<Card.Title>카드 제목</Card.Title>
				</Card.Header>
				<Card.Content>카드 내용</Card.Content>
				<Card.Footer>카드 푸터</Card.Footer>
			</Card>
		);

		expect(screen.getByTestId("card")).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "카드 제목" })).toBeInTheDocument();
		expect(screen.getByText("카드 내용")).toBeInTheDocument();
		expect(screen.getByText("카드 푸터")).toBeInTheDocument();
	});

	it("Card에 ref 전달", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Card ref={ref}>내용</Card>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("커스텀 className 병합", () => {
		render(
			<Card className="custom-card" data-testid="card">
				내용
			</Card>
		);
		expect(screen.getByTestId("card")).toHaveClass("custom-card");
	});
});
