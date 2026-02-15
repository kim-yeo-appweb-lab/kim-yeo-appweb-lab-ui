"use client";

import { type Ref, type SelectHTMLAttributes } from "react";

import { cn } from "../../utils";

type SelectOption<T extends string> = {
	value: T;
	label: string;
};

type SelectProps<T extends string> = Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
	options: SelectOption<T>[];
	value: T;
	onChange: (value: T) => void;
	placeholder?: string;
	ref?: Ref<HTMLSelectElement>;
};

export function Select<T extends string>({
	options,
	value,
	onChange,
	placeholder,
	className,
	ref,
	...rest
}: SelectProps<T>) {
	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		onChange(e.target.value as T);
	}

	return (
		<div className="relative inline-block">
			<select
				ref={ref}
				value={value}
				onChange={handleChange}
				className={cn(
					"border-border bg-surface text-fg h-9 cursor-pointer appearance-none rounded-lg border py-2 pr-8 pl-3 text-sm transition-colors outline-none",
					"hover:border-border-strong focus:border-primary focus:ring-ring focus:ring-1",
					"disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...rest}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<svg
				className="text-fg-muted pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	);
}
