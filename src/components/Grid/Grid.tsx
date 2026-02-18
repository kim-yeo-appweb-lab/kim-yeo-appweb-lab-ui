import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
type GridCols = 1 | 2 | 3 | 4 | 5 | 6;

type GridProps = HTMLAttributes<HTMLDivElement> & {
	cols?: GridCols;
	colsMobile?: GridCols;
	colsTablet?: GridCols;
	colsDesktop?: GridCols;
	gap?: GridGap;
	ref?: Ref<HTMLDivElement>;
};

const gapStyles: Record<GridGap, string> = {
	xs: "gap-1",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
	xl: "gap-8"
};

const colsStyles: Record<GridCols, string> = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
	5: "grid-cols-5",
	6: "grid-cols-6"
};

const colsMobileStyles: Record<GridCols, string> = {
	1: "max-sm:grid-cols-1",
	2: "max-sm:grid-cols-2",
	3: "max-sm:grid-cols-3",
	4: "max-sm:grid-cols-4",
	5: "max-sm:grid-cols-5",
	6: "max-sm:grid-cols-6"
};

const colsTabletStyles: Record<GridCols, string> = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4",
	5: "sm:grid-cols-5",
	6: "sm:grid-cols-6"
};

const colsDesktopStyles: Record<GridCols, string> = {
	1: "lg:grid-cols-1",
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4",
	5: "lg:grid-cols-5",
	6: "lg:grid-cols-6"
};

export function Grid({
	cols,
	colsMobile,
	colsTablet,
	colsDesktop,
	gap = "md",
	className,
	ref,
	children,
	...rest
}: GridProps) {
	return (
		<div
			ref={ref}
			className={cn(
				"grid",
				cols && colsStyles[cols],
				colsMobile && colsMobileStyles[colsMobile],
				colsTablet && colsTabletStyles[colsTablet],
				colsDesktop && colsDesktopStyles[colsDesktop],
				gapStyles[gap],
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
}
