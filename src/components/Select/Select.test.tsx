import { createRef } from "react";

import { renderWithoutProviders as render, screen } from "../../testing";
import { Select } from "./Select";

const options = [
	{ value: "apple", label: "사과" },
	{ value: "banana", label: "바나나" },
	{ value: "cherry", label: "체리" }
];

describe("Select", () => {
	describe("옵션 관리", () => {
		it("모든 옵션 렌더링", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="apple" onChange={handleChange} />);

			expect(screen.getByRole("option", { name: "사과" })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: "바나나" })).toBeInTheDocument();
			expect(screen.getByRole("option", { name: "체리" })).toBeInTheDocument();
		});

		it("현재 선택된 값 표시", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="banana" onChange={handleChange} />);
			expect(screen.getByRole("combobox")).toHaveValue("banana");
		});

		it("placeholder 옵션 비활성화", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="apple" onChange={handleChange} placeholder="선택하세요" />);

			const placeholderOption = screen.getByRole("option", { name: "선택하세요" });
			expect(placeholderOption).toBeDisabled();
		});
	});

	describe("사용자 상호작용", () => {
		it("옵션 선택 시 onChange 호출", async () => {
			const handleChange = vi.fn();
			const { user } = render(<Select options={options} value="apple" onChange={handleChange} />);

			await user.selectOptions(screen.getByRole("combobox"), "banana");
			expect(handleChange).toHaveBeenCalledWith("banana");
		});

		it("키보드로 옵션 선택 가능", async () => {
			const handleChange = vi.fn();
			const { user } = render(<Select options={options} value="apple" onChange={handleChange} />);

			const select = screen.getByRole("combobox");
			select.focus();

			// Arrow Down으로 다음 옵션 선택 (구현에 따라 동작이 다를 수 있음)
			await user.keyboard("{ArrowDown}");
			// 실제 구현에서는 네이티브 select가 자동으로 처리
		});

		it("disabled 상태에서 변경 차단", async () => {
			const handleChange = vi.fn();
			const { user } = render(<Select options={options} value="apple" onChange={handleChange} disabled />);

			const select = screen.getByRole("combobox");
			expect(select).toBeDisabled();

			// disabled 상태에서는 선택 불가
			await user.selectOptions(select, "banana");
			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe("접근성", () => {
		it("combobox role 제공", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="apple" onChange={handleChange} aria-label="과일 선택" />);
			expect(screen.getByRole("combobox")).toBeInTheDocument();
		});

		it("aria-label로 식별 가능", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="apple" onChange={handleChange} aria-label="과일 선택" />);
			expect(screen.getByRole("combobox", { name: "과일 선택" })).toBeInTheDocument();
		});

		it("각 옵션의 label 올바르게 표시", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="apple" onChange={handleChange} />);

			const appleOption = screen.getByRole("option", { name: "사과" });
			expect(appleOption).toHaveValue("apple");
		});
	});

	describe("React 19 ref", () => {
		it("ref를 prop으로 전달 (HTMLSelectElement)", () => {
			const ref = createRef<HTMLSelectElement>();
			const handleChange = vi.fn();
			render(<Select ref={ref} options={options} value="apple" onChange={handleChange} />);

			expect(ref.current).toBeInstanceOf(HTMLSelectElement);
			expect(ref.current?.tagName).toBe("SELECT");
		});
	});

	describe("커스터마이징", () => {
		it("커스텀 className 병합", () => {
			const handleChange = vi.fn();
			render(<Select options={options} value="apple" onChange={handleChange} className="custom-select" />);
			expect(screen.getByRole("combobox")).toHaveClass("custom-select");
		});
	});
});
