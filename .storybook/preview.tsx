import "../src/styles/index.css";

import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";

const preview: Preview = {
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme || "light";

			useEffect(() => {
				document.documentElement.setAttribute("data-theme", theme);
				document.documentElement.style.colorScheme = theme;
			}, [theme]);

			return <Story />;
		}
	],
	initialGlobals: {
		theme: "light"
	},
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		a11y: {
			config: {
				rules: [
					{
						id: "color-contrast",
						enabled: true
					},
					{
						id: "label",
						enabled: true
					},
					{
						id: "button-name",
						enabled: true
					},
					{
						id: "link-name",
						enabled: true
					}
				]
			}
		}
	}
};

export default preview;
