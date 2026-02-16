import { renderWithoutProviders as render, screen } from "../../testing/render";
import { composeEventHandlers, Slot, Slottable } from "./slot";

describe("composeEventHandlers", () => {
	it("두 핸들러가 모두 없으면 undefined 반환", () => {
		expect(composeEventHandlers(undefined, undefined)).toBeUndefined();
	});

	it("첫 번째 핸들러만 실행", () => {
		const handler = vi.fn();
		const composed = composeEventHandlers(handler, undefined)!;
		composed(new Event("click"));
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("두 번째 핸들러만 실행", () => {
		const handler = vi.fn();
		const composed = composeEventHandlers(undefined, handler)!;
		composed(new Event("click"));
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("두 핸들러 모두 순서대로 실행", () => {
		const order: number[] = [];
		const first = vi.fn(() => order.push(1));
		const second = vi.fn(() => order.push(2));
		const composed = composeEventHandlers(first, second)!;

		composed(new Event("click"));
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).toHaveBeenCalledTimes(1);
		expect(order).toEqual([1, 2]);
	});

	it("첫 번째 핸들러에서 preventDefault 시 두 번째 핸들러 미실행", () => {
		const first = vi.fn((e: Event) => e.preventDefault());
		const second = vi.fn();
		const composed = composeEventHandlers(first, second)!;

		composed(new Event("click", { cancelable: true }));
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).not.toHaveBeenCalled();
	});
});

describe("Slot", () => {
	it("단일 자식 요소에 props 병합", () => {
		render(
			<Slot data-testid="slot" className="slot-class">
				<button className="child-class">클릭</button>
			</Slot>
		);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("slot-class");
		expect(button).toHaveClass("child-class");
	});

	it("이벤트 핸들러 합성", async () => {
		const slotClick = vi.fn();
		const childClick = vi.fn();
		const { user } = render(
			<Slot onClick={slotClick}>
				<button onClick={childClick}>클릭</button>
			</Slot>
		);

		await user.click(screen.getByRole("button"));
		expect(slotClick).toHaveBeenCalledTimes(1);
		expect(childClick).toHaveBeenCalledTimes(1);
	});

	it("자식이 없으면 null 반환", () => {
		const { container } = render(<Slot />);
		expect(container.innerHTML).toBe("");
	});

	it("여러 자식이 있으면 에러 발생", () => {
		expect(() => {
			render(
				<Slot>
					<span>1</span>
					<span>2</span>
				</Slot>
			);
		}).toThrow("Slot 컴포넌트는 단일 자식 요소만 허용합니다.");
	});
});

describe("Slottable", () => {
	it("Slot 내부에서 Slottable을 통해 콘텐츠 렌더링", () => {
		render(
			<Slot className="slot-class">
				<Slottable>
					<div>내용</div>
				</Slottable>
			</Slot>
		);
		expect(screen.getByText("내용")).toBeInTheDocument();
		expect(screen.getByText("내용").parentElement).toHaveClass("slot-class");
	});
});
