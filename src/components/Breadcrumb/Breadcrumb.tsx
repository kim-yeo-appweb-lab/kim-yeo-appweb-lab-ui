import { cn } from "../../utils";

type BreadcrumbItem = {
	label: string;
	href?: string;
};

type BreadcrumbProps = {
	items: BreadcrumbItem[];
	className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
	return (
		<nav aria-label="경로" className={cn("flex items-center gap-1.5 text-sm", className)}>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;
				return (
					<span key={item.label} className="flex items-center gap-1.5">
						{index > 0 && (
							<svg className="text-fg-muted h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						)}
						{isLast || !item.href ? (
							<span className={cn(isLast ? "text-fg font-medium" : "text-fg-muted")}>{item.label}</span>
						) : (
							<a href={item.href} className="text-fg-muted hover:text-fg-secondary transition-colors">
								{item.label}
							</a>
						)}
					</span>
				);
			})}
		</nav>
	);
}
