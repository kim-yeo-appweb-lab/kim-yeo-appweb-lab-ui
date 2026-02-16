import { render, screen } from "../../testing";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
	it("기본 렌더링 (마운트 후 전환 버튼 표시)", () => {
		render(<ThemeToggle />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("버튼에 aria-label 적용", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label");
	});

	it("클릭 시 테마 전환", async () => {
		const { user } = render(<ThemeToggle />);
		const button = screen.getByRole("button");
		const initialLabel = button.getAttribute("aria-label");

		await user.click(button);

		const updatedLabel = screen.getByRole("button").getAttribute("aria-label");
		expect(updatedLabel).not.toBe(initialLabel);
	});
});
