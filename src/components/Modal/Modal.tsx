"use client";

import { type ReactNode, type Ref, useEffect, useRef } from "react";

import { cn } from "../../utils";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	className?: string;
	ref?: Ref<HTMLDialogElement>;
};

export function Modal({ open, onClose, title, children, className, ref }: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const resolvedRef = (ref as React.RefObject<HTMLDialogElement>) ?? dialogRef;

	useEffect(() => {
		const dialog = resolvedRef.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [open, resolvedRef]);

	function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleCancel(e: React.SyntheticEvent<HTMLDialogElement>) {
		e.preventDefault();
		onClose();
	}

	return (
		<dialog
			ref={resolvedRef}
			className={cn(
				"border-border bg-surface shadow-level-3 fixed top-1/2 left-1/2 m-0 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-0 backdrop:bg-black/50",
				"open:animate-in open:fade-in",
				className
			)}
			onClick={handleBackdropClick}
			onCancel={handleCancel}
		>
			{title && (
				<div className="border-border flex items-center justify-between border-b px-6 py-4">
					<h2 className="text-fg text-lg font-semibold">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-fg-muted hover:bg-hover-bg hover:text-fg cursor-pointer rounded-md p-1 transition-colors"
						aria-label="닫기"
					>
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			)}
			<div className="px-6 py-4">{children}</div>
		</dialog>
	);
}
