"use client";

import { cn } from "../../utils";

type TabVariant = "underline" | "filled";
type TabSize = "sm" | "md";

type TabItem<T extends string> = {
	value: T;
	label: string;
};

type TabListProps<T extends string> = {
	items: TabItem<T>[];
	value: T;
	onChange: (value: T) => void;
	variant?: TabVariant;
	size?: TabSize;
	className?: string;
};

const variantStyles: Record<TabVariant, { list: string; base: string; active: string; inactive: string }> = {
	underline: {
		list: "border-b border-border gap-0",
		base: "border-b-2 border-transparent",
		active: "border-primary text-primary",
		inactive: "text-fg-muted hover:text-fg-secondary hover:border-border-strong"
	},
	filled: {
		list: "gap-1",
		base: "rounded-full",
		active: "bg-primary text-primary-fg",
		inactive: "text-fg-muted hover:bg-hover-bg"
	}
};

const sizeStyles: Record<TabSize, string> = {
	sm: "px-3 py-1 text-xs",
	md: "px-4 py-1.5 text-sm"
};

export function TabList<T extends string>({
	items,
	value,
	onChange,
	variant = "filled",
	size = "md",
	className
}: TabListProps<T>) {
	function handleTabClick(tabValue: T) {
		onChange(tabValue);
	}

	const styles = variantStyles[variant];

	return (
		<div className={cn("scrollbar-none flex overflow-x-auto", styles.list, className)} role="tablist">
			{items.map((item) => {
				const isActive = item.value === value;
				return (
					<button
						key={item.value}
						type="button"
						role="tab"
						aria-selected={isActive}
						tabIndex={isActive ? 0 : -1}
						className={cn(
							"shrink-0 cursor-pointer font-medium whitespace-nowrap transition-colors",
							styles.base,
							sizeStyles[size],
							isActive ? styles.active : styles.inactive
						)}
						onClick={() => handleTabClick(item.value)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
}
