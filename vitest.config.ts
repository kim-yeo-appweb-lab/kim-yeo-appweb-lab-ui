import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/testing/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		exclude: ["node_modules", "dist", "**/*.stories.tsx"],
		css: false,
		coverage: {
			provider: "v8",
			include: ["src/**/*.{ts,tsx}"],
			exclude: ["src/**/*.stories.tsx", "src/**/*.test.{ts,tsx}", "src/**/index.ts", "src/testing/**"],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80
			}
		}
	}
});
