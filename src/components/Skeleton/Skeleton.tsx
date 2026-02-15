import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
};

export function Skeleton({ className, ref, ...rest }: SkeletonProps) {
	return (
		<div ref={ref} className={cn("bg-surface-alt animate-pulse rounded-md", className)} aria-hidden="true" {...rest} />
	);
}
