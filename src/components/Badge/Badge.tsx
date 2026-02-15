import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type BadgeVariant = "subtle" | "outline";

type BadgeColorScheme = "default" | "green" | "red" | "amber" | "blue" | "gray";

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
	green: {
		subtle: "bg-green-500/10 text-green-700 dark:text-green-400",
		outline: "border-green-600 text-green-700 dark:text-green-400 border"
	},
	red: {
		subtle: "bg-red-500/10 text-red-700 dark:text-red-400",
		outline: "border-red-600 text-red-700 dark:text-red-400 border"
	},
	amber: {
		subtle: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
		outline: "border-amber-600 text-amber-700 dark:text-amber-400 border"
	},
	blue: {
		subtle: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
		outline: "border-blue-600 text-blue-700 dark:text-blue-400 border"
	},
	gray: {
		subtle: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
		outline: "border-gray-600 text-gray-700 dark:text-gray-400 border"
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
