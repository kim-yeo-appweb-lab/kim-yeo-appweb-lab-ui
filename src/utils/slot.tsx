import {
	Children,
	cloneElement,
	type HTMLAttributes,
	isValidElement,
	type ReactElement,
	type ReactNode,
	type Ref
} from "react";

import { cn } from "./cn";

// ── 이벤트 핸들러 병합 ──
// 원본 핸들러 실행 후 preventDefault가 호출되지 않았으면 추가 핸들러도 실행
export function composeEventHandlers<E>(originalHandler?: (event: E) => void, additionalHandler?: (event: E) => void) {
	if (!originalHandler && !additionalHandler) return undefined;
	return function handleEvent(event: E) {
		originalHandler?.(event);
		if (!(event as unknown as Event).defaultPrevented) {
			additionalHandler?.(event);
		}
	};
}

// ── Ref 병합 ──
function composeRefs<T>(...refs: (Ref<T> | undefined)[]) {
	return (node: T | null) => {
		for (const ref of refs) {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		}
	};
}

// ── Slottable: Slot 내부에서 자식 콘텐츠를 표시하는 마커 ──
export function Slottable({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

function isSlottable(child: ReactNode): child is ReactElement<{ children: ReactNode }> {
	return isValidElement(child) && child.type === Slottable;
}

// ── Slot 컴포넌트 ──
type SlotProps = HTMLAttributes<HTMLElement> & {
	children?: ReactNode;
	ref?: Ref<HTMLElement>;
};

export function Slot({ children, ref, ...slotProps }: SlotProps) {
	const childrenArray = Children.toArray(children);
	const slottable = childrenArray.find(isSlottable);

	if (slottable) {
		// Slottable이 있으면 그 children이 실제 렌더링 대상
		const renderElement = slottable.props.children as ReactNode;

		const newChildren = childrenArray.map((child) => {
			if (child !== slottable) return child;

			if (isValidElement(renderElement)) {
				// renderElement의 children을 Slottable 외 다른 자식들로 교체
				const otherChildren = childrenArray.filter((c) => c !== slottable);
				return otherChildren.length > 0 ? cloneElement(renderElement, undefined, ...otherChildren) : renderElement;
			}

			return null;
		});

		return isValidElement(renderElement) ? mergeSlotProps(renderElement, slotProps, ref, newChildren) : null;
	}

	// 단일 자식 요소에 props 병합
	if (isValidElement(children)) {
		return mergeSlotProps(children, slotProps, ref);
	}

	// 여러 자식이 있으면 오류
	if (childrenArray.length > 1) {
		throw new Error("Slot 컴포넌트는 단일 자식 요소만 허용합니다.");
	}

	return null;
}

// 자식 요소에 Slot의 props를 병합
function mergeSlotProps(
	element: ReactElement,
	slotProps: Record<string, unknown>,
	slotRef: Ref<HTMLElement> | undefined,
	children?: ReactNode[]
) {
	const elementProps = element.props as Record<string, unknown>;
	const elementRef = (element.props as { ref?: Ref<HTMLElement> }).ref;

	const mergedProps: Record<string, unknown> = { ...elementProps };

	// props 병합: 이벤트 핸들러는 compose, className은 cn, 나머지는 슬롯 우선
	for (const [key, slotValue] of Object.entries(slotProps)) {
		if (key === "className") {
			mergedProps[key] = cn(slotValue as string, elementProps[key] as string);
		} else if (key === "style") {
			mergedProps[key] = { ...(slotValue as object), ...(elementProps[key] as object) };
		} else if (/^on[A-Z]/.test(key)) {
			mergedProps[key] = composeEventHandlers(
				slotValue as (event: unknown) => void,
				elementProps[key] as (event: unknown) => void
			);
		} else if (!(key in elementProps)) {
			mergedProps[key] = slotValue;
		}
	}

	// ref 병합
	if (slotRef || elementRef) {
		mergedProps.ref = composeRefs(slotRef, elementRef);
	}

	return cloneElement(element, mergedProps, ...(children ?? []));
}
