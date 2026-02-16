import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Badge } from "./Badge";

describe("Badge", () => {
	describe("콘텐츠", () => {
		it("children 텍스트 표시", () => {
			render(<Badge>신규</Badge>);
			expect(screen.getByText("신규")).toBeInTheDocument();
		});

		it("다양한 상태 표시", () => {
			const { rerender } = render(<Badge colorScheme="success">성공</Badge>);
			expect(screen.getByText("성공")).toBeInTheDocument();

			rerender(<Badge colorScheme="danger">실패</Badge>);
			expect(screen.getByText("실패")).toBeInTheDocument();

			rerender(<Badge colorScheme="warning">대기</Badge>);
			expect(screen.getByText("대기")).toBeInTheDocument();
		});
	});

	describe("Variants", () => {
		it("다양한 variant 지원 (subtle, outline)", () => {
			const { rerender } = render(<Badge variant="subtle">뱃지</Badge>);
			expect(screen.getByText("뱃지")).toBeInTheDocument();

			rerender(<Badge variant="outline">뱃지</Badge>);
			expect(screen.getByText("뱃지")).toBeInTheDocument();
		});

		it("다양한 colorScheme 지원", () => {
			const colorSchemes = ["success", "danger", "warning", "info", "neutral"] as const;
			const { rerender } = render(<Badge colorScheme="success">상태</Badge>);

			colorSchemes.forEach((scheme) => {
				rerender(<Badge colorScheme={scheme}>상태</Badge>);
				expect(screen.getByText("상태")).toBeInTheDocument();
			});
		});

		it("variant와 colorScheme 조합", () => {
			render(
				<Badge colorScheme="success" variant="outline">
					완료
				</Badge>
			);
			expect(screen.getByText("완료")).toBeInTheDocument();
		});
	});

	describe("React 19 ref", () => {
		it("ref를 prop으로 전달 (HTMLSpanElement)", () => {
			const ref = createRef<HTMLSpanElement>();
			render(<Badge ref={ref}>뱃지</Badge>);
			expect(ref.current).toBeInstanceOf(HTMLSpanElement);
			expect(ref.current?.tagName).toBe("SPAN");
		});
	});

	describe("커스터마이징", () => {
		it("커스텀 className 병합", () => {
			render(<Badge className="custom-badge">뱃지</Badge>);
			expect(screen.getByText("뱃지")).toHaveClass("custom-badge");
		});
	});
});
