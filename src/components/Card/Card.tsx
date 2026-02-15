import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type CardRootProps = HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
};

function CardRoot({ className, ref, children, ...rest }: CardRootProps) {
	return (
		<div ref={ref} className={cn("border-border bg-surface shadow-level-1 rounded-xl border p-4", className)} {...rest}>
			{children}
		</div>
	);
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
};

function CardHeader({ className, ref, children, ...rest }: CardHeaderProps) {
	return (
		<div ref={ref} className={cn("mb-3 flex items-center justify-between", className)} {...rest}>
			{children}
		</div>
	);
}

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
	ref?: Ref<HTMLHeadingElement>;
};

function CardTitle({ className, ref, children, ...rest }: CardTitleProps) {
	return (
		<h3 ref={ref} className={cn("text-fg text-base font-semibold", className)} {...rest}>
			{children}
		</h3>
	);
}

type CardContentProps = HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
};

function CardContent({ className, ref, children, ...rest }: CardContentProps) {
	return (
		<div ref={ref} className={cn("text-fg-secondary text-sm", className)} {...rest}>
			{children}
		</div>
	);
}

type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
};

function CardFooter({ className, ref, children, ...rest }: CardFooterProps) {
	return (
		<div
			ref={ref}
			className={cn("border-border mt-3 flex items-center justify-between border-t pt-3", className)}
			{...rest}
		>
			{children}
		</div>
	);
}

export const Card = Object.assign(CardRoot, {
	Header: CardHeader,
	Title: CardTitle,
	Content: CardContent,
	Footer: CardFooter
});
