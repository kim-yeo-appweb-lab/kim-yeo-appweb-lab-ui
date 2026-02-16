---
"@kim-yeo-appweb-lab/ui": patch
---

Server Component에서 유틸리티 함수 사용 시 발생하는 런타임 에러를 수정하고, Badge 컴포넌트의 라이트 모드 가독성을 개선한다.

- `tsup` 빌드 설정에서 code splitting을 활성화하고 `"use client"` 지시어를 소스 파일 기준으로 선별 삽입하도록 변경
- Badge subtle variant의 배경 불투명도를 10%에서 15%로 상향하여 라이트 모드에서의 시인성 향상
- `package.json` exports에 `default` 조건을 추가하여 번들러 호환성 개선
