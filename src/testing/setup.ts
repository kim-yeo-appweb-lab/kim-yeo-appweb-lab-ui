import "@testing-library/jest-dom/vitest";

// HTMLDialogElement의 showModal/close 메서드 모킹 (jsdom 미지원)
HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
	this.setAttribute("open", "");
});

HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
	this.removeAttribute("open");
});

// matchMedia 모킹
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});
