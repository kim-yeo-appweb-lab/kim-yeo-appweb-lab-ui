import { render, type RenderOptions, type RenderResult, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactElement, type ReactNode } from "react";

import { ThemeProvider } from "../contexts";

type CustomRenderResult = RenderResult & {
	user: ReturnType<typeof userEvent.setup>;
};

function AllProviders({ children }: { children: ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">): CustomRenderResult {
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: AllProviders, ...options })
	};
}

// 프로바이더 없이 렌더링 (순수 UI 컴포넌트용)
function renderWithoutProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">): CustomRenderResult {
	return {
		user: userEvent.setup(),
		...render(ui, options)
	};
}

// 키보드 네비게이션 테스트 헬퍼
async function expectFocusedElement(expectedElement: HTMLElement, user: ReturnType<typeof userEvent.setup>) {
	await user.tab();
	expect(document.activeElement).toBe(expectedElement);
}

// 접근성 속성 검증 헬퍼
function expectAccessibleButton(
	element: HTMLElement,
	{ name, disabled = false }: { name?: string; disabled?: boolean }
) {
	expect(element).toHaveRole("button");
	if (name) expect(element).toHaveAccessibleName(name);
	if (disabled) {
		expect(element).toBeDisabled();
		expect(element).toHaveAttribute("aria-disabled", "true");
	}
}
export {
	expectAccessibleButton,
	expectFocusedElement,
	customRender as render,
	renderWithoutProviders,
	screen,
	userEvent,
	within
};
