"use client";

import { type PropsWithChildren } from "react";

import { cn } from "../../utils";

type FilterOption<T extends string> = {
	value: T;
	label: string;
};

type FilterProps<T extends string> = {
	label: string;
	options: FilterOption<T>[];
	value: T;
	onChange: (value: T) => void;
	className?: string;
};

export function Filter<T extends string>({ label, options, value, onChange, className }: FilterProps<T>) {
	function handleOptionClick(optionValue: T) {
		onChange(optionValue);
	}

	return (
		<fieldset className={cn("flex flex-col gap-2", className)} role="radiogroup" aria-label={label}>
			<legend className="text-fg-secondary text-sm font-medium">{label}</legend>
			<div className="flex flex-wrap gap-1.5">
				{options.map((option) => {
					const isSelected = option.value === value;
					return (
						<button
							key={option.value}
							type="button"
							role="radio"
							aria-checked={isSelected}
							className={cn(
								"cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
								isSelected ? "bg-primary text-primary-fg" : "bg-surface-alt text-fg-secondary hover:bg-hover-bg"
							)}
							onClick={() => handleOptionClick(option.value)}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</fieldset>
	);
}

type FilterGroupProps = PropsWithChildren<{
	className?: string;
}>;

export function FilterGroup({ children, className }: FilterGroupProps) {
	return (
		<div
			className={cn("border-border bg-surface flex flex-col gap-4 rounded-xl border p-4", className)}
			role="group"
			aria-label="필터"
		>
			{children}
		</div>
	);
}
