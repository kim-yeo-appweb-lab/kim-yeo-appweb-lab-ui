import { act, renderHook, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";

import { ThemeProvider } from "../../contexts";
import { useTheme } from "./useTheme";

function wrapper({ children }: { children: ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}

describe("useTheme", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-theme");
		// matchMedia 모킹은 test-setup.ts에서 처리됨
	});

	describe("초기화", () => {
		it("ThemeProvider 없이 사용하면 에러 발생", () => {
			expect(() => {
				renderHook(() => useTheme());
			}).toThrow("useTheme must be used within ThemeProvider");
		});

		it("초기 테마 값 설정됨", () => {
			const { result } = renderHook(() => useTheme(), { wrapper });
			// getResolvedTheme()의 결과에 따라 light 또는 dark
			expect(["light", "dark", "system"]).toContain(result.current.theme);
		});

		it("localStorage에 저장된 값이 있으면 해당 테마 사용", () => {
			localStorage.setItem("theme", "dark");
			const { result } = renderHook(() => useTheme(), { wrapper });
			expect(result.current.theme).toBe("dark");
		});
	});

	describe("setTheme", () => {
		it("테마 변경 시 상태 업데이트", () => {
			const { result } = renderHook(() => useTheme(), { wrapper });

			act(() => {
				result.current.setTheme("dark");
			});

			expect(result.current.theme).toBe("dark");
		});

		it("테마 변경 시 localStorage에 저장", async () => {
			const { result } = renderHook(() => useTheme(), { wrapper });

			act(() => {
				result.current.setTheme("light");
			});

			await waitFor(() => {
				expect(localStorage.getItem("theme")).toBe("light");
			});
		});

		it("여러 번 변경 가능", () => {
			const { result } = renderHook(() => useTheme(), { wrapper });

			act(() => {
				result.current.setTheme("dark");
			});
			expect(result.current.theme).toBe("dark");

			act(() => {
				result.current.setTheme("light");
			});
			expect(result.current.theme).toBe("light");

			act(() => {
				result.current.setTheme("system");
			});
			expect(result.current.theme).toBe("system");
		});
	});

	describe("시스템 테마 감지", () => {
		it("system 선택 시 내부적으로 matchMedia 사용", () => {
			const { result } = renderHook(() => useTheme(), { wrapper });

			act(() => {
				result.current.setTheme("system");
			});

			expect(result.current.theme).toBe("system");
			// data-theme 속성은 실제 resolved 값 (light/dark)
			expect(["light", "dark"]).toContain(document.documentElement.getAttribute("data-theme") || "");
		});
	});

	describe("HTML 속성 적용", () => {
		it("테마 변경 시 documentElement에 data-theme 적용", () => {
			const { result } = renderHook(() => useTheme(), { wrapper });

			act(() => {
				result.current.setTheme("dark");
			});
			expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

			act(() => {
				result.current.setTheme("light");
			});
			expect(document.documentElement.getAttribute("data-theme")).toBe("light");
		});
	});
});
