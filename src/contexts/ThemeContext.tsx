"use client";

import { createContext, type PropsWithChildren, useEffect, useState } from "react";

import { getResolvedTheme, setStoredTheme, type Theme } from "../utils";

type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
	const [theme, setThemeState] = useState<Theme>(() => getResolvedTheme() as Theme);

	useEffect(() => {
		const root = document.documentElement;
		const resolved = getResolvedTheme(theme);

		// View Transition API 사용 (지원하는 브라우저)
		const doc = document as Document & {
			startViewTransition?: (callback: () => void) => void;
		};

		function updateTheme() {
			root.setAttribute("data-theme", resolved);
			root.style.colorScheme = resolved;
		}

		let rafId: number | undefined;

		if (doc.startViewTransition) {
			doc.startViewTransition(updateTheme);
		} else {
			root.setAttribute("data-theme-transitioning", "");
			updateTheme();

			rafId = requestAnimationFrame(() => {
				root.removeAttribute("data-theme-transitioning");
			});
		}

		if (theme !== "system") {
			setStoredTheme(theme);
		}

		return () => {
			if (rafId !== undefined) {
				cancelAnimationFrame(rafId);
			}
		};
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>{children}</ThemeContext.Provider>;
}
