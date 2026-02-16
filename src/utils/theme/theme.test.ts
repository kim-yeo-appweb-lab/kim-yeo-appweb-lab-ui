import { getResolvedTheme, getStoredTheme, getSystemTheme, setStoredTheme } from "./theme";

describe("theme 유틸리티", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe("getStoredTheme", () => {
		it("저장된 테마가 없으면 null 반환", () => {
			expect(getStoredTheme()).toBeNull();
		});

		it("저장된 테마 반환", () => {
			localStorage.setItem("theme", "dark");
			expect(getStoredTheme()).toBe("dark");
		});
	});

	describe("setStoredTheme", () => {
		it("테마를 localStorage에 저장", () => {
			setStoredTheme("dark");
			expect(localStorage.getItem("theme")).toBe("dark");
		});

		it("테마를 덮어쓰기", () => {
			setStoredTheme("light");
			setStoredTheme("dark");
			expect(localStorage.getItem("theme")).toBe("dark");
		});
	});

	describe("getSystemTheme", () => {
		it("시스템 다크 모드면 dark 반환", () => {
			vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
			expect(getSystemTheme()).toBe("dark");
		});

		it("시스템 라이트 모드면 light 반환", () => {
			vi.mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
			expect(getSystemTheme()).toBe("light");
		});
	});

	describe("getResolvedTheme", () => {
		it("light 전달 시 light 반환", () => {
			expect(getResolvedTheme("light")).toBe("light");
		});

		it("dark 전달 시 dark 반환", () => {
			expect(getResolvedTheme("dark")).toBe("dark");
		});

		it("system 전달 시 시스템 테마 반환", () => {
			vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
			expect(getResolvedTheme("system")).toBe("dark");
		});

		it("인자 없이 호출 시 저장된 테마 사용", () => {
			localStorage.setItem("theme", "dark");
			expect(getResolvedTheme()).toBe("dark");
		});

		it("저장된 테마도 없으면 system 기본값 사용", () => {
			vi.mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
			expect(getResolvedTheme()).toBe("light");
		});
	});
});
