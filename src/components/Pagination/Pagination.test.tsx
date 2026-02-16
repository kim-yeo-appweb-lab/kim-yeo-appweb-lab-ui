import { renderWithoutProviders as render, screen } from "../../testing";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
	it("기본 렌더링", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
		expect(screen.getByLabelText("페이지 이동")).toBeInTheDocument();
	});

	it("현재 페이지에 aria-current 적용", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);
		expect(screen.getByRole("button", { name: "3" })).toHaveAttribute("aria-current", "page");
	});

	it("다른 페이지에는 aria-current 미적용", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);
		expect(screen.getByRole("button", { name: "1" })).not.toHaveAttribute("aria-current");
	});

	it("페이지 버튼 클릭 시 onPageChange 호출", async () => {
		const handlePageChange = vi.fn();
		const { user } = render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

		await user.click(screen.getByRole("button", { name: "3" }));
		expect(handlePageChange).toHaveBeenCalledWith(3);
	});

	it("이전 버튼 클릭 시 이전 페이지로 이동", async () => {
		const handlePageChange = vi.fn();
		const { user } = render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

		await user.click(screen.getByLabelText("이전 페이지"));
		expect(handlePageChange).toHaveBeenCalledWith(2);
	});

	it("다음 버튼 클릭 시 다음 페이지로 이동", async () => {
		const handlePageChange = vi.fn();
		const { user } = render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

		await user.click(screen.getByLabelText("다음 페이지"));
		expect(handlePageChange).toHaveBeenCalledWith(4);
	});

	it("첫 페이지에서 이전 버튼 비활성화", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
		expect(screen.getByLabelText("이전 페이지")).toBeDisabled();
	});

	it("마지막 페이지에서 다음 버튼 비활성화", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={5} totalPages={5} onPageChange={handlePageChange} />);
		expect(screen.getByLabelText("다음 페이지")).toBeDisabled();
	});

	it("많은 페이지에서 ellipsis 표시", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} />);
		const ellipsis = screen.getAllByText("...");
		expect(ellipsis.length).toBeGreaterThan(0);
	});

	it("커스텀 className 병합", () => {
		const handlePageChange = vi.fn();
		render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} className="custom-pagination" />);
		expect(screen.getByLabelText("페이지 이동")).toHaveClass("custom-pagination");
	});
});
