import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
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
	},
	format: ["esm"],
	dts: {
		entry: "src/index.ts"
	},
	splitting: false,
	treeshake: true,
	clean: true,
	outDir: "dist",
	external: ["react", "react-dom", "tailwindcss"],
	esbuildOptions(options) {
		options.jsx = "automatic";
	},
	async onSuccess() {
		// tsup v8은 esbuild banner의 "use client" 지시어를 후처리 단계에서 제거하므로
		// 빌드 완료 후 모든 출력 파일 상단에 직접 삽입 (tsup#835 workaround)
		const distDir = resolve("dist");

		function addUseClientDirective(dir: string) {
			for (const file of readdirSync(dir)) {
				const filePath = join(dir, file);
				const stat = statSync(filePath);

				if (stat.isDirectory()) {
					addUseClientDirective(filePath);
				} else if (file.endsWith(".js")) {
					const content = readFileSync(filePath, "utf-8");
					if (!content.startsWith('"use client"')) {
						writeFileSync(filePath, `"use client";\n${content}`);
					}
				}
			}
		}

		addUseClientDirective(distDir);
	}
});
