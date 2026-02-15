import { type Ref } from "react";

import { cn } from "../../utils";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
	src?: string | null;
	name: string;
	size?: AvatarSize;
	className?: string;
	ref?: Ref<HTMLDivElement>;
};

const sizeStyles: Record<AvatarSize, string> = {
	sm: "h-8 w-8 text-xs",
	md: "h-10 w-10 text-sm",
	lg: "h-16 w-16 text-lg"
};

export function Avatar({ src, name, size = "md", className, ref }: AvatarProps) {
	const fallback = name.charAt(0).toUpperCase();

	if (src) {
		return (
			<img
				ref={ref as Ref<HTMLImageElement>}
				src={src}
				alt={name}
				className={cn("shrink-0 rounded-full object-cover", sizeStyles[size], className)}
			/>
		);
	}

	return (
		<div
			ref={ref}
			className={cn(
				"bg-surface-alt text-fg-secondary flex shrink-0 items-center justify-center rounded-full font-medium",
				sizeStyles[size],
				className
			)}
			aria-label={name}
		>
			{fallback}
		</div>
	);
}
