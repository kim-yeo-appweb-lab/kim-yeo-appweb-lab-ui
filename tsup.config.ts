import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { defineConfig } from "tsup";

const entry: Record<string, string> = {
	// 메인 엔트리포인트 (타입 정의 포함)
	index: "src/index.ts",
	// 개별 컴포넌트 (Tree-shaking용)
	"components/Avatar/Avatar": "src/components/Avatar/Avatar.tsx",
	"components/Badge/Badge": "src/components/Badge/Badge.tsx",
	"components/Breadcrumb/Breadcrumb": "src/components/Breadcrumb/Breadcrumb.tsx",
	"components/Button/Button": "src/components/Button/Button.tsx",
	"components/Card/Card": "src/components/Card/Card.tsx",
	"components/EmptyState/EmptyState": "src/components/EmptyState/EmptyState.tsx",
	"components/Filter/Filter": "src/components/Filter/Filter.tsx",
	"components/Input/Input": "src/components/Input/Input.tsx",
	"components/Modal/Modal": "src/components/Modal/Modal.tsx",
	"components/Pagination/Pagination": "src/components/Pagination/Pagination.tsx",
	"components/SectionHeader/SectionHeader": "src/components/SectionHeader/SectionHeader.tsx",
	"components/Select/Select": "src/components/Select/Select.tsx",
	"components/Skeleton/Skeleton": "src/components/Skeleton/Skeleton.tsx",
	"components/Tab/Tab": "src/components/Tab/Tab.tsx",
	"components/TagInput/TagInput": "src/components/TagInput/TagInput.tsx",
	"components/Textarea/Textarea": "src/components/Textarea/Textarea.tsx",
	"components/ThemeToggle/ThemeToggle": "src/components/ThemeToggle/ThemeToggle.tsx",
	// 유틸리티
	"utils/cn": "src/utils/cn/cn.ts",
	"utils/slot": "src/utils/slot/slot.tsx",
	"utils/theme": "src/utils/theme/theme.ts",
	// 훅
	"hooks/useTheme": "src/hooks/useTheme/useTheme.ts",
	// Context
	"contexts/ThemeContext": "src/contexts/ThemeContext.tsx"
};

export default defineConfig({
	entry,
	format: ["esm"],
	dts: {
		entry: "src/index.ts"
	},
	splitting: true,
	treeshake: true,
	clean: true,
	outDir: "dist",
	external: ["react", "react-dom", "tailwindcss"],
	esbuildOptions(options) {
		options.jsx = "automatic";
	},
	async onSuccess() {
		// tsup v8은 esbuild의 "use client" 지시어를 후처리 단계에서 제거하므로
		// 빌드 완료 후 소스에 "use client"가 있는 엔트리 파일에만 선별 삽입 (tsup#835 workaround)
		const distDir = resolve("dist");

		for (const [outName, srcPath] of Object.entries(entry)) {
			const srcContent = readFileSync(resolve(srcPath), "utf-8");
			const hasUseClient = srcContent.startsWith('"use client"');

			if (!hasUseClient) continue;

			const outPath = join(distDir, `${outName}.js`);
			const outContent = readFileSync(outPath, "utf-8");

			if (!outContent.startsWith('"use client"')) {
				writeFileSync(outPath, `"use client";\n${outContent}`);
			}
		}
	}
});
