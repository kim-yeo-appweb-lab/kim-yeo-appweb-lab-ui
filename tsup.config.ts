import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	splitting: true,
	treeshake: true,
	clean: true,
	external: ["react", "react-dom", "tailwindcss"],
	outDir: "dist",
	esbuildOptions(options) {
		options.jsx = "automatic";
	},
	async onSuccess() {
		// tsup v8은 esbuild banner의 "use client" 지시어를 후처리 단계에서 제거하므로
		// 빌드 완료 후 출력 파일 상단에 직접 삽입 (tsup#835 workaround)
		const distDir = resolve("dist");
		for (const file of readdirSync(distDir)) {
			if (!file.endsWith(".js")) continue;
			const filePath = join(distDir, file);
			const content = readFileSync(filePath, "utf-8");
			writeFileSync(filePath, `"use client";\n${content}`);
		}
	}
});
