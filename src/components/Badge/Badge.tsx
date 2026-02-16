import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type BadgeVariant = "subtle" | "outline";

type BadgeColorScheme = "default" | "success" | "danger" | "warning" | "info" | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	variant?: BadgeVariant;
	colorScheme?: BadgeColorScheme;
	ref?: Ref<HTMLSpanElement>;
};

const colorSchemeStyles: Record<BadgeColorScheme, Record<BadgeVariant, string>> = {
	default: {
		subtle: "bg-surface-alt text-fg-secondary",
		outline: "border-border text-fg-secondary border"
	},
	success: {
		subtle: "bg-success-500/15 text-success-700 dark:text-success-400",
		outline: "border-success-600 text-success-700 dark:text-success-400 border"
	},
	danger: {
		subtle: "bg-danger-500/15 text-danger-700 dark:text-danger-400",
		outline: "border-danger-600 text-danger-700 dark:text-danger-400 border"
	},
	warning: {
		subtle: "bg-warning-500/15 text-warning-700 dark:text-warning-400",
		outline: "border-warning-600 text-warning-700 dark:text-warning-400 border"
	},
	info: {
		subtle: "bg-info-500/15 text-info-700 dark:text-info-400",
		outline: "border-info-600 text-info-700 dark:text-info-400 border"
	},
	neutral: {
		subtle: "bg-neutral-500/15 text-neutral-700 dark:text-neutral-400",
		outline: "border-neutral-600 text-neutral-700 dark:text-neutral-400 border"
	}
};

export function Badge({ variant = "subtle", colorScheme = "default", className, ref, children, ...rest }: BadgeProps) {
	return (
		<span
			ref={ref}
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
				colorSchemeStyles[colorScheme][variant],
				className
			)}
			{...rest}
		>
			{children}
		</span>
	);
}
