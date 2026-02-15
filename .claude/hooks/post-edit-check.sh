#!/bin/bash

# 파일 수정 후 lint + type check 실행
# ts/tsx 파일이 변경된 경우에만 실행

FILE="$CLAUDE_FILE_PATH"

if [[ "$FILE" == *.ts ]] || [[ "$FILE" == *.tsx ]]; then
	echo "--- lint check ---"
	pnpm eslint --no-error-on-unmatched-pattern "$FILE" 2>&1 | tail -20

	echo "--- type check ---"
	pnpm tsc --noEmit 2>&1 | tail -20
fi
