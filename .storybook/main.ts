import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	staticDirs: ["../public"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		{
			name: "@storybook/addon-docs",
			options: {
				mdxPluginOptions: {
					mdxCompileOptions: {
						remarkPlugins: [remarkGfm]
					}
				}
			}
		}
	],
	framework: "@storybook/react-vite",
	viteFinal: async (config) => {
		// GitHub Pages base path 설정 (production 환경에서만)
		if (process.env.NODE_ENV === "production") {
			config.base = "/kim-yeo-appweb-lab-ui/";
		}
		config.plugins = [...(config.plugins ?? []), tailwindcss()];
		return config;
	}
};

export default config;
