import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type StackDirection = "row" | "column";
type StackSpacing = "xs" | "sm" | "md" | "lg" | "xl";

type StackProps = HTMLAttributes<HTMLDivElement> & {
	direction?: StackDirection;
	spacing?: StackSpacing;
	responsive?: boolean;
	ref?: Ref<HTMLDivElement>;
};

const spacingStyles: Record<StackSpacing, string> = {
	xs: "gap-1",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
	xl: "gap-8"
};

const directionStyles: Record<StackDirection, string> = {
	row: "flex-row",
	column: "flex-col"
};

export function Stack({
	direction = "column",
	spacing = "md",
	responsive = false,
	className,
	ref,
	children,
	...rest
}: StackProps) {
	return (
		<div
			ref={ref}
			className={cn(
				"flex",
				responsive ? "flex-col sm:flex-row" : directionStyles[direction],
				spacingStyles[spacing],
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
}
