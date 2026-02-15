import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	globalIgnores(["dist/**", "storybook-static/**", ".claude/**"]),
	{
		plugins: {
			"react-hooks": reactHooks,
			"simple-import-sort": simpleImportSort
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports"
				}
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_"
				}
			],
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error"
		}
	},
	prettier
]);

export default eslintConfig;
