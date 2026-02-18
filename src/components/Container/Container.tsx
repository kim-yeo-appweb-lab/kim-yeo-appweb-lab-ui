import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type ContainerSize = "sm" | "md" | "lg" | "full";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
	size?: ContainerSize;
	ref?: Ref<HTMLDivElement>;
};

const sizeStyles: Record<ContainerSize, string> = {
	sm: "max-w-screen-sm",
	md: "max-w-screen-md",
	lg: "max-w-screen-lg",
	full: "max-w-full"
};

export function Container({ size = "lg", className, ref, children, ...rest }: ContainerProps) {
	return (
		<div ref={ref} className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeStyles[size], className)} {...rest}>
			{children}
		</div>
	);
}
