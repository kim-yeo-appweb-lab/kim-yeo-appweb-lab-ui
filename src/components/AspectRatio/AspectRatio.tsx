import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

type AspectRatioValue = "square" | "video" | "portrait" | "wide";

type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
	ratio?: AspectRatioValue;
	ref?: Ref<HTMLDivElement>;
};

const ratioStyles: Record<AspectRatioValue, string> = {
	square: "aspect-square",
	video: "aspect-video",
	portrait: "aspect-2/3",
	wide: "aspect-21/9"
};

export function AspectRatio({ ratio = "video", className, ref, children, ...rest }: AspectRatioProps) {
	return (
		<div ref={ref} className={cn("relative overflow-hidden", ratioStyles[ratio], className)} {...rest}>
			{children}
		</div>
	);
}
