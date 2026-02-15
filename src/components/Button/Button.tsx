"use client";

import { type ButtonHTMLAttributes, type Ref } from "react";

import { cn, Slot } from "../../utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	asChild?: boolean;
	ref?: Ref<HTMLButtonElement>;
};

const variantStyles: Record<ButtonVariant, string> = {
	primary: "bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active",
	secondary: "bg-surface-alt text-fg border border-border hover:bg-hover-bg active:bg-active-bg",
	ghost: "bg-transparent text-fg hover:bg-hover-bg active:bg-active-bg"
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-sm gap-1.5",
	md: "h-10 px-4 text-sm gap-2",
	lg: "h-12 px-6 text-base gap-2.5"
};

export function Button({ variant = "primary", size = "md", asChild = false, className, ref, ...rest }: ButtonProps) {
	const classes = cn(
		"focus-visible:outline-ring inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
		"disabled:cursor-not-allowed disabled:opacity-50",
		variantStyles[variant],
		sizeStyles[size],
		className
	);

	if (asChild) {
		return <Slot ref={ref as Ref<HTMLElement>} className={classes} {...rest} />;
	}

	return <button ref={ref} className={classes} {...rest} />;
}
