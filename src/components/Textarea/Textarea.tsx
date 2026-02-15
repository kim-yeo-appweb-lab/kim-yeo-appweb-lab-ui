import { type Ref, type TextareaHTMLAttributes } from "react";

import { cn } from "../../utils";

type TextareaVariant = "default" | "filled";
type TextareaSize = "sm" | "md" | "lg";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
	variant?: TextareaVariant;
	size?: TextareaSize;
	ref?: Ref<HTMLTextAreaElement>;
};

const variantStyles: Record<TextareaVariant, string> = {
	default:
		"border border-border bg-surface hover:border-border-strong focus:border-primary focus:ring-ring focus:ring-1",
	filled:
		"border border-transparent bg-surface-alt hover:bg-subtle focus:border-primary focus:ring-ring focus:ring-1 focus:bg-surface"
};

const sizeStyles: Record<TextareaSize, string> = {
	sm: "px-3 py-2 text-sm min-h-20",
	md: "px-3 py-2.5 text-sm min-h-28",
	lg: "px-4 py-3 text-base min-h-40"
};

export function Textarea({ variant = "default", size = "md", className, ref, ...rest }: TextareaProps) {
	return (
		<textarea
			ref={ref}
			className={cn(
				"text-fg placeholder:text-fg-muted w-full resize-none rounded-lg transition-colors outline-none",
				"disabled:text-fg-disabled disabled:cursor-not-allowed disabled:opacity-50",
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			{...rest}
		/>
	);
}
