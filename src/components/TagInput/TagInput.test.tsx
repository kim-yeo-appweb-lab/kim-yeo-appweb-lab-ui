import { renderWithoutProviders as render, screen } from "../../testing/render";
import { TagInput } from "./TagInput";

describe("TagInput", () => {
	it("기본 렌더링", () => {
		const handleChange = vi.fn();
		render(<TagInput value={[]} onChange={handleChange} />);
		expect(screen.getByPlaceholderText("태그 입력 후 Enter")).toBeInTheDocument();
	});

	it("기존 태그 렌더링", () => {
		const handleChange = vi.fn();
		render(<TagInput value={["React", "TypeScript"]} onChange={handleChange} />);
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
	});

	it("Enter로 태그 추가", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TagInput value={[]} onChange={handleChange} />);

		const input = screen.getByPlaceholderText("태그 입력 후 Enter");
		await user.type(input, "새태그{Enter}");
		expect(handleChange).toHaveBeenCalledWith(["새태그"]);
	});

	it("중복 태그는 추가 불가", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TagInput value={["React"]} onChange={handleChange} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "React{Enter}");
		expect(handleChange).not.toHaveBeenCalled();
	});

	it("빈 값은 추가 불가", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TagInput value={[]} onChange={handleChange} />);

		const input = screen.getByPlaceholderText("태그 입력 후 Enter");
		await user.type(input, "{Enter}");
		expect(handleChange).not.toHaveBeenCalled();
	});

	it("태그 삭제 버튼 클릭", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TagInput value={["React", "Vue"]} onChange={handleChange} />);

		await user.click(screen.getByLabelText("React 태그 삭제"));
		expect(handleChange).toHaveBeenCalledWith(["Vue"]);
	});

	it("Backspace로 마지막 태그 삭제", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TagInput value={["React", "Vue"]} onChange={handleChange} />);

		const input = screen.getByRole("textbox");
		await user.click(input);
		await user.keyboard("{Backspace}");
		expect(handleChange).toHaveBeenCalledWith(["React"]);
	});

	it("maxTags 초과 시 입력 필드 숨김", () => {
		const handleChange = vi.fn();
		render(<TagInput value={["a", "b", "c"]} onChange={handleChange} maxTags={3} />);
		expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
	});

	it("maxTags 초과 시 태그 추가 불가", async () => {
		const handleChange = vi.fn();
		const { user } = render(<TagInput value={["a", "b"]} onChange={handleChange} maxTags={2} />);

		// maxTags에 도달하면 input이 숨겨짐
		expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
		expect(handleChange).not.toHaveBeenCalled();

		// 하지만 삭제는 가능해야 함
		await user.click(screen.getByLabelText("a 태그 삭제"));
		expect(handleChange).toHaveBeenCalledWith(["b"]);
	});

	it("커스텀 placeholder 적용", () => {
		const handleChange = vi.fn();
		render(<TagInput value={[]} onChange={handleChange} placeholder="키워드 입력" />);
		expect(screen.getByPlaceholderText("키워드 입력")).toBeInTheDocument();
	});

	it("태그가 있으면 placeholder 숨김", () => {
		const handleChange = vi.fn();
		render(<TagInput value={["태그"]} onChange={handleChange} />);
		const input = screen.getByRole("textbox");
		expect(input).not.toHaveAttribute("placeholder", "태그 입력 후 Enter");
	});

	it("커스텀 className 병합", () => {
		const handleChange = vi.fn();
		const { container } = render(<TagInput value={[]} onChange={handleChange} className="custom-tag-input" />);
		expect(container.firstChild).toHaveClass("custom-tag-input");
	});
});
