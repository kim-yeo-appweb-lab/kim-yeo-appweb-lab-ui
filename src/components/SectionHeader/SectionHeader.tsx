import { type PropsWithChildren } from "react";

import { cn } from "../../utils";

type SectionHeaderProps = PropsWithChildren<{
	title: string;
	href?: string;
	linkLabel?: string;
	className?: string;
}>;

export function SectionHeader({ title, href, linkLabel = "더보기", children, className }: SectionHeaderProps) {
	return (
		<div className={cn("mb-6 flex items-center justify-between", className)}>
			<h2 className="text-fg text-lg font-bold">{title}</h2>
			<div className="flex items-center gap-2">
				{children}
				{href && (
					<a href={href} className="text-primary hover:text-primary-hover text-sm">
						{linkLabel}
					</a>
				)}
			</div>
		</div>
	);
}
