"use client";

import { cn } from "../../utils";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
};

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
	function getPageNumbers() {
		const pages: (number | "ellipsis")[] = [];
		const delta = 2;

		for (let i = 1; i <= totalPages; i++) {
			if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
				pages.push(i);
			} else if (pages[pages.length - 1] !== "ellipsis") {
				pages.push("ellipsis");
			}
		}
		return pages;
	}

	function handlePageClick(page: number) {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	}

	const pages = getPageNumbers();

	return (
		<nav aria-label="페이지 이동" className={cn("flex items-center justify-center gap-1", className)}>
			<button
				type="button"
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage <= 1}
				className="text-fg-muted hover:bg-hover-bg cursor-pointer rounded-lg p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="이전 페이지"
			>
				<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			{pages.map((page, index) =>
				page === "ellipsis" ? (
					<span key={`ellipsis-${index}`} className="text-fg-muted px-2">
						...
					</span>
				) : (
					<button
						key={page}
						type="button"
						onClick={() => handlePageClick(page)}
						className={cn(
							"min-w-9 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
							page === currentPage ? "bg-primary text-primary-fg" : "text-fg-muted hover:bg-hover-bg"
						)}
						aria-current={page === currentPage ? "page" : undefined}
					>
						{page}
					</button>
				)
			)}

			<button
				type="button"
				onClick={() => handlePageClick(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className="text-fg-muted hover:bg-hover-bg cursor-pointer rounded-lg p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="다음 페이지"
			>
				<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</nav>
	);
}
