import { renderWithoutProviders as render, screen } from "../../testing";
import { TabList } from "./Tab";

const items = [
	{ value: "tab1", label: "탭 1" },
	{ value: "tab2", label: "탭 2" },
	{ value: "tab3", label: "탭 3" }
];

describe("TabList", () => {
	it("기본 렌더링", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab1" onChange={handleChange} />);
		expect(screen.getByRole("tablist")).toBeInTheDocument();
	});

	it("모든 탭 렌더링", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab1" onChange={handleChange} />);
		expect(screen.getByRole("tab", { name: "탭 1" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "탭 2" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "탭 3" })).toBeInTheDocument();
	});

	it("선택된 탭에 aria-selected 적용", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab2" onChange={handleChange} />);
		expect(screen.getByRole("tab", { name: "탭 2" })).toHaveAttribute("aria-selected", "true");
		expect(screen.getByRole("tab", { name: "탭 1" })).toHaveAttribute("aria-selected", "false");
	});

	it("선택된 탭은 tabIndex 0, 나머지는 -1", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab1" onChange={handleChange} />);
		expect(screen.getByRole("tab", { name: "탭 1" })).toHaveAttribute("tabIndex", "0");
		expect(screen.getByRole("tab", { name: "탭 2" })).toHaveAttribute("tabIndex", "-1");
	});

	it("탭 클릭 시 onChange 호출", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TabList items={items} value="tab1" onChange={handleChange} />);

		await user.click(screen.getByRole("tab", { name: "탭 2" }));
		expect(handleChange).toHaveBeenCalledWith("tab2");
	});

	it("filled variant 기본 적용", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab1" onChange={handleChange} />);
		expect(screen.getByRole("tab", { name: "탭 1" })).toHaveClass("rounded-full");
	});

	it("underline variant 적용", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab1" onChange={handleChange} variant="underline" />);
		expect(screen.getByRole("tab", { name: "탭 1" })).toHaveClass("border-b-2");
	});

	it("size에 따라 올바른 스타일 적용", () => {
		const handleChange = vi.fn();
		const { rerender } = render(<TabList items={items} value="tab1" onChange={handleChange} size="sm" />);
		expect(screen.getByRole("tab", { name: "탭 1" })).toHaveClass("text-xs");

		rerender(<TabList items={items} value="tab1" onChange={handleChange} size="md" />);
		expect(screen.getByRole("tab", { name: "탭 1" })).toHaveClass("text-sm");
	});

	it("커스텀 className 병합", () => {
		const handleChange = vi.fn();
		render(<TabList items={items} value="tab1" onChange={handleChange} className="custom-tabs" />);
		expect(screen.getByRole("tablist")).toHaveClass("custom-tabs");
	});
});
