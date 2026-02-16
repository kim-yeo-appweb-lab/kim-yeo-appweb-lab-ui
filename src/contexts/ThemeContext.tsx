"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";

import { getResolvedTheme, setStoredTheme, type Theme } from "../utils";

type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => getResolvedTheme() as Theme);

	useEffect(() => {
		const root = document.documentElement;
		const resolved = getResolvedTheme(theme);
		root.setAttribute("data-theme", resolved);
		root.style.colorScheme = resolved;

		if (theme !== "system") {
			setStoredTheme(theme);
		}
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
