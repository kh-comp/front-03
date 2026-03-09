# AI Skills (.claude/skills) 분석 가이드

프로젝트 내 `.claude/skills` 폴더에 포함된 19개의 스킬(Skill) 목록과 지정된 역할입니다.
이 스킬들은 AI 에이전트(Claude 등)가 특정 라이브러리나 기술 스택과 관련된 코드를 작성하거나 디버깅할 때, 해당 기술의 모범 사례(Best Practices)와 정확한 사용법을 참고하도록 돕는 **지식 베이스 엔진** 역할을 합니다.

각 스킬들은 목적과 기능에 따라 5가지 주요 그룹으로 분류됩니다.

---

## 1. Vue.js 코어 및 상태/라우팅 관리

Vue 프레임워크의 핵심 기능과 애플리케이션의 뼈대(상태, 라우팅, 데이터 패칭)를 구성하는 스킬들입니다.

- **`vue-skilld`**
  - **기능 및 역할:** Vue 최신 문법(Composition API 등)과 모던 웹 UI를 빌드하는 점진적 프레임워크 핵심 기능을 제공.
  - **사용 시기:** `*.vue` 컴포넌트 파일을 작성/수정하거나 `vue` 패키지를 임포트할 때.
- **`vue-router-skilld`**
  - **기능 및 역할:** 클라이언트 사이드 라우팅(Vue Router) 구조화 및 모범 사례.
  - **사용 시기:** 페이지 이동, 라우트 가드, 파라미터 제어 등 라우터 관련 작업 시.
- **`pinia-skilld`**
  - **기능 및 역할:** 타입 안전성이 보장되는 유연한 Vue 전역 상태 관리(Store) 설정.
  - **사용 시기:** `pinia`를 통해 전역 상태(Global State)를 정의하거나 사용할 때.
- **`pinia-colada-skilld`**
  - **기능 및 역할:** Pinia 기반의 스마트 데이터 패칭 로직과 서버 캐싱 메커니즘.
  - **사용 시기:** `@pinia/colada`로 원격 API 데이터를 가져오거나 뮤테이션(Mutation)을 구현할 때.

## 2. VueUse 생태계 (Composition Utilities)

Vue의 Composition API를 극대화하는 표준 유틸리티 라이브러리, VueUse 생태계입니다.

- **`vueuse-core-skilld`**: 핵심 유틸리티. 브라우저 상태, 센서, 네트워크 등을 제어 (`@vueuse/core`).
- **`vueuse-components-skilld`**: 렌더리스 컴포넌트 활용 (`@vueuse/components`).
- **`vueuse-math-skilld`**: 반응형 변수에 대한 수학 연산 처리 (`@vueuse/math`).
- **`vueuse-motion-skilld`**: UI 컴포넌트의 유려한 애니메이션/모션 트랜지션 처리 (`@vueuse/motion`).
- **`vueuse-integrations-skilld`**: 외부 유틸리티(Axios, JWT 등)를 Vue 반응형 모듈로 통합 (`@vueuse/integrations`).
- **`vueuse-shared-skilld`**: 기타 공유 유틸리티 함수/타입을 참조하기 위해 사용 (`@vueuse/shared`).

## 3. 스타일링 및 UI 컴포넌트

시각적 컴포넌트 구성 요소 및 Tailwind CSS 디자인 시스템을 제어합니다.

- **`tailwind-v4`**
  - **기능 및 역할:** Tailwind CSS v4 활용 가이드라인 (다크 모드, 반응형 패턴, UI 구조화).
  - **사용 시기:** Tailwind 기능을 사용하는 마크업 및 스타일링 전체 과정.
- **`tailwindcss-utility-classes`**
  - **기능 및 역할:** Tailwind 환경의 모든 유틸리티 클래스 레퍼런스(간격, 레이아웃, 컬러 등) 제공.
  - **사용 시기:** 구체적 클래스나 여백, 색상을 도출해야 할 때.
- **`shadcn-vue-skilld`**
  - **기능 및 역할:** 접근성 높은 뷰(Vue) 기반 Shadcn UI 통합 가이드.
  - **사용 시기:** `shadcn-vue` 제공 컴포넌트를 이식하거나 속성을 제어할 때.
- **`reka-ui-skilld`**
  - **기능 및 역할:** 접근성이 보장된 뼈대 라이브러리 Reka UI (구 Radix-vue) 스펙 참조.
  - **사용 시기:** `reka-ui` 프리미티브(Primitives) 기반으로 핵심 컴포넌트를 생성할 때.

## 4. 폼(Forms) 및 데이터 테이블 제어

사용자 폼 입력/검증 및 복잡한 엔터프라이즈급 데이터 관리를 지원합니다.

- **`tanstack-vue-form-skilld`**
  - **기능 및 역할:** 강력하고 타입 안정성이 보장되는 폼(Form) 상태/데이터 검증 메커니즘 제공.
  - **사용 시기:** `@tanstack/vue-form`을 활용해 복잡한 서브밋 처리나 유효성 검증 시.
- **`vee-validate-skilld`**
  - **기능 및 역할:** 직관적인 폼 검증(Validation) 및 입력 처리 룰(Rules).
  - **사용 시기:** `vee-validate` 생태계를 통한 입력 에러 관리 시.
- **`tanstack-vue-table-skilld`**
  - **기능 및 역할:** 헤드리스(Headless) 환경에서 강력한 데이터 표(Table)/그리드 구축 가이드.
  - **사용 시기:** `@tanstack/vue-table`을 통한 대규모 그리드 렌더링, 필터링, 정렬 기능 구현 시.

## 5. 테스트 및 메타 태그 최적화 (SEO)

- **`vue-test-utils-skilld`**
  - **기능 및 역할:** 컴포넌트를 마운트/조작/시뮬레이션하는 단위 테스트 공식 도구 지원.
  - **사용 시기:** `@vue/test-utils`에 의존하여 `.test.ts`, `.spec.ts` 파일을 만들고 검증할 때.
- **`unhead-vue-skilld`**
  - **기능 및 역할:** `<head>` 태그, 타이틀, 외부 메타데이터(OG 태그 등)를 통합 관리하는 툴.
  - **사용 시기:** `@unhead/vue`로 페이지 별 SEO 최적화를 구현하거나 제어할 때.

---

### 💡 활용 요약

본 시스템은 코드 내 관련 패키지 기술의 임포트(Import)가 감지되면 **자동으로 백그라운드 참조**되어 활용됩니다. 이를 통해 최신 문법(버전)과 베스트 프랙티스(Best Practice)에 맞는 안전하고 고도화된 프론트엔드 코드 작성을 도와줍니다.
