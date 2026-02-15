# Implement

기능 구현을 위한 단계별 워크플로우

## 입력

$ARGUMENTS - 구현할 기능 설명 또는 이슈 번호

## 절차

### Phase 1: 분석

1. `docs/PRD.md`에서 관련 요구사항 확인
2. `CLAUDE.md`에서 아키텍처 원칙/디렉토리 구조 확인
3. 기존 코드에서 관련 파일 탐색
4. 영향 범위 파악

### Phase 2: 계획

1. 생성/수정할 파일 목록 정리
2. 컴포넌트 구조 설계
3. 타입 정의
4. 구현 순서 결정 (타입 → 서비스 → 컴포넌트 → 페이지)

### Phase 3: 구현

1. 타입 정의 (`features/{name}/types/`)
2. 서비스/데이터 로직 (`features/{name}/services/`)
3. 컴포넌트 구현 (`features/{name}/components/`)
4. 페이지 연결 (`app/(main)/{route}/page.tsx`)
5. 필요시 공통 모듈 추가 (`shared/`)

### Phase 4: 검증

1. `pnpm type:check` - 타입 에러 없음
2. `pnpm lint` - 린트 통과
3. `pnpm format:check` - 포맷 일관성
4. `pnpm build` - 빌드 성공

## 규칙

- Server Component 우선, Client Component는 최소화
- feature 모듈 간 직접 의존 금지
- 공통 타입/컴포넌트는 `shared/`에 배치
- 구현 완료 후 변경사항 요약 보고
