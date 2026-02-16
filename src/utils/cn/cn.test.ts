import { cn } from "./cn";

describe("cn", () => {
	describe("Tailwind 충돌 해결 (핵심 기능)", () => {
		it("나중 값이 우선 (px)", () => {
			expect(cn("px-4", "px-6")).toBe("px-6");
		});

		it("나중 값이 우선 (text)", () => {
			expect(cn("text-sm", "text-lg")).toBe("text-lg");
		});

		it("비충돌 클래스는 모두 유지", () => {
			expect(cn("px-4", "py-2", "text-sm")).toBe("px-4 py-2 text-sm");
		});

		it("복잡한 충돌 해결", () => {
			// tailwind-merge는 충돌하는 클래스를 제거하고 나머지는 순서 유지
			expect(cn("bg-red-500", "px-4", "bg-blue-600", "py-2")).toBe("px-4 bg-blue-600 py-2");
		});
	});

	describe("조건부 클래스 (실제 사용 패턴)", () => {
		it("falsy 값 무시", () => {
			expect(cn("base", false, null, undefined, "active")).toBe("base active");
		});

		it("불린 조건부", () => {
			const isActive = true;
			const isDisabled = false;
			expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe("base active");
		});

		it("객체 형태 조건부", () => {
			expect(cn({ base: true, active: true, disabled: false })).toBe("base active");
		});

		it("배열 형태", () => {
			expect(cn(["base", "active"], "extra")).toBe("base active extra");
		});
	});

	describe("엣지 케이스", () => {
		it("중복 클래스 제거", () => {
			expect(cn("text-sm", "font-bold", "text-sm")).toBe("font-bold text-sm");
		});

		it("빈 문자열 무시", () => {
			expect(cn("base", "", "  ", "active")).toBe("base active");
		});
	});
});
