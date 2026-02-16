---
"@kim-yeo-appweb-lab/ui": patch
---

SSR 호환성 강화 및 다크 모드 토큰 누락 수정

- `getSystemTheme()`, `setStoredTheme()` SSR 가드 추가 (Next.js 프리렌더링 호환)
- 다크 모드에서 `--color-ring` 토큰 누락 수정 (포커스 링 가시성 보장)
