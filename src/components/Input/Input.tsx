import { type InputHTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type InputVariant = "default" | "filled";
type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
	variant?: InputVariant;
	size?: InputSize;
	ref?: Ref<HTMLInputElement>;
};

const variantStyles: Record<InputVariant, string> = {
	default:
		"border border-border bg-surface hover:border-border-strong focus:border-primary focus:ring-ring focus:ring-1",
	filled:
		"border border-transparent bg-surface-alt hover:bg-subtle focus:border-primary focus:ring-ring focus:ring-1 focus:bg-surface"
};

const sizeStyles: Record<InputSize, string> = {
	sm: "h-9 px-3 text-sm",
	md: "h-11 px-3 text-sm",
	lg: "h-12 px-4 text-base"
};

export function Input({ variant = "default", size = "md", className, ref, ...rest }: InputProps) {
	return (
		<input
			ref={ref}
			className={cn(
				"text-fg placeholder:text-fg-muted w-full rounded-lg transition-colors outline-none",
				"disabled:text-fg-disabled disabled:cursor-not-allowed disabled:opacity-50",
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			{...rest}
		/>
	);
}
