import { renderWithoutProviders as render, screen } from "../../testing";
import { Filter, FilterGroup } from "./Filter";

const options = [
	{ value: "all", label: "전체" },
	{ value: "active", label: "활성" },
	{ value: "inactive", label: "비활성" }
];

describe("Filter", () => {
	it("기본 렌더링", () => {
		const handleChange = vi.fn();
		render(<Filter label="상태" options={options} value="all" onChange={handleChange} />);
		expect(screen.getByText("상태")).toBeInTheDocument();
	});

	it("모든 옵션 렌더링", () => {
		const handleChange = vi.fn();
		render(<Filter label="상태" options={options} value="all" onChange={handleChange} />);
		expect(screen.getByRole("radio", { name: "전체" })).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "활성" })).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "비활성" })).toBeInTheDocument();
	});

	it("선택된 옵션에 aria-checked 적용", () => {
		const handleChange = vi.fn();
		render(<Filter label="상태" options={options} value="active" onChange={handleChange} />);
		expect(screen.getByRole("radio", { name: "활성" })).toHaveAttribute("aria-checked", "true");
		expect(screen.getByRole("radio", { name: "전체" })).toHaveAttribute("aria-checked", "false");
	});

	it("옵션 클릭 시 onChange 호출", async () => {
		const handleChange = vi.fn();
		const { user } = render(<Filter label="상태" options={options} value="all" onChange={handleChange} />);

		await user.click(screen.getByRole("radio", { name: "활성" }));
		expect(handleChange).toHaveBeenCalledWith("active");
	});

	it("radiogroup role 적용", () => {
		const handleChange = vi.fn();
		render(<Filter label="상태" options={options} value="all" onChange={handleChange} />);
		expect(screen.getByRole("radiogroup", { name: "상태" })).toBeInTheDocument();
	});

	it("커스텀 className 병합", () => {
		const handleChange = vi.fn();
		render(<Filter label="상태" options={options} value="all" onChange={handleChange} className="custom-filter" />);
		expect(screen.getByRole("radiogroup")).toHaveClass("custom-filter");
	});
});

describe("FilterGroup", () => {
	it("기본 렌더링", () => {
		render(
			<FilterGroup>
				<p>필터 내용</p>
			</FilterGroup>
		);
		expect(screen.getByRole("group", { name: "필터" })).toBeInTheDocument();
		expect(screen.getByText("필터 내용")).toBeInTheDocument();
	});

	it("커스텀 className 병합", () => {
		render(
			<FilterGroup className="custom-group">
				<p>내용</p>
			</FilterGroup>
		);
		expect(screen.getByRole("group")).toHaveClass("custom-group");
	});
});
