import { type ReactNode } from "react";

import { cn } from "../../utils";

type EmptyStateProps = {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
	className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
	return (
		<div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
			{icon && <div className="text-fg-muted mb-4">{icon}</div>}
			<h3 className="text-fg text-lg font-semibold">{title}</h3>
			{description && <p className="text-fg-muted mt-2 max-w-sm text-sm">{description}</p>}
			{action && <div className="mt-6">{action}</div>}
		</div>
	);
}
