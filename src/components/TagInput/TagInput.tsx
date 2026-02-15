"use client";

import { useState } from "react";

import { cn } from "../../utils";
import { Badge } from "../Badge";

type TagInputProps = {
	value: string[];
	onChange: (tags: string[]) => void;
	maxTags?: number;
	placeholder?: string;
	className?: string;
};

export function TagInput({
	value,
	onChange,
	maxTags = 5,
	placeholder = "태그 입력 후 Enter",
	className
}: TagInputProps) {
	const [inputValue, setInputValue] = useState("");

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
			const tag = inputValue.trim();
			if (tag && !value.includes(tag) && value.length < maxTags) {
				onChange([...value, tag]);
				setInputValue("");
			}
		}
		if (e.key === "Backspace" && !inputValue && value.length > 0) {
			onChange(value.slice(0, -1));
		}
	}

	function handleRemoveTag(tag: string) {
		onChange(value.filter((t) => t !== tag));
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	return (
		<div
			className={cn(
				"border-border bg-surface flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2",
				className
			)}
		>
			{value.map((tag) => (
				<Badge key={tag} className="gap-1">
					{tag}
					<button
						type="button"
						onClick={() => handleRemoveTag(tag)}
						className="text-fg-muted hover:text-fg ml-0.5 cursor-pointer"
						aria-label={`${tag} 태그 삭제`}
					>
						&times;
					</button>
				</Badge>
			))}
			{value.length < maxTags && (
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={value.length === 0 ? placeholder : ""}
					className="text-fg placeholder:text-fg-muted min-w-20 flex-1 border-none bg-transparent text-sm outline-none"
				/>
			)}
		</div>
	);
}
