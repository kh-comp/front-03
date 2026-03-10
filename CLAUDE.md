# 대한항공 사내시스템 - 프론트엔드 프로젝트 가이드

## 📋 프로젝트 개요

- **프로젝트명**: 대한항공 사내시스템
- **규모**: 중소형 사내시스템
- **시작일**: 2026-03

---

## 🛠 기술 스택

| 구분                 | 기술              | 버전   | 설명                        |
| -------------------- | ----------------- | ------ | --------------------------- |
| **프레임워크**       | Vue               | 3.5+   | Composition API 사용        |
| **빌드도구**         | Vite              | 7.x    | 개발 서버 및 번들링         |
| **상태관리**         | Pinia             | 3.x    | 전역 상태 관리              |
| **상태관리(비동기)** | Pinia Colada      | 1.x    | 비동기 상태 캐싱            |
| **라우팅**           | Vue Router        | 5.x    | SPA 라우팅                  |
| **폼관리**           | TanStack Vue Form | 1.x    | 폼 상태 및 검증             |
| **스타일링**         | Tailwind CSS      | 4.x    | 유틸리티 퍼스트 CSS         |
| **UI 컴포넌트**      | shadcn-vue 스타일 | -      | CVA + clsx + tailwind-merge |
| **아이콘**           | Lucide Vue Next   | 0.577+ | 아이콘 라이브러리           |
| **린트**             | Oxlint + ESLint   | -      | 코드 품질 관리              |
| **포맷팅**           | Prettier          | 3.x    | 코드 포맷팅                 |

---

## 📁 폴더 구조

```
src/
├── api/                          # API 통신 레이어
│   ├── index.js                  # API 인스턴스 (axios/fetch 래핑)
│   ├── endpoints.js              # 엔드포인트 상수
│   └── modules/                  # 도메인별 API 모듈
│       ├── auth.js               # 인증 관련 API
│       ├── user.js               # 사용자 관련 API
│       └── common.js             # 공통 API (코드 등)
│
├── assets/                       # 정적 리소스
│   ├── fonts/                    # 폰트 파일
│   ├── images/                   # 이미지
│   │   ├── common/               # 공통 이미지
│   │   └── icons/                # 아이콘
│   └── styles/                   # 스타일
│       ├── main.css              # 메인 스타일 (Tailwind import)
│       ├── fonts.css             # 폰트 정의
│       └── variables.css         # CSS 변수
│
├── components/                   # 컴포넌트
│   ├── common/                   # 공통 컴포넌트 (AppHeader, AppSidebar 등)
│   ├── ui/                       # 기본 UI 컴포넌트 (shadcn-vue 스타일)
│   └── layout/                   # 레이아웃 컴포넌트 (DefaultLayout 등)
│
├── composables/                  # 컴포저블 (재사용 로직)
│   ├── useAuth.js                # 인증 관련
│   ├── useAlert.js               # 알림/토스트
│   └── useTable.js               # 테이블 공통 로직
│
├── constants/                    # 상수
│   ├── codes.js                  # 공통 코드
│   └── messages.js               # 메시지
│
├── directives/                   # 커스텀 디렉티브
│
├── lib/                          # 유틸리티 라이브러리
│   └── utils.js                  # cn() 등 유틸 함수
│
├── plugins/                      # 플러그인
│
├── router/                       # 라우터
│   ├── index.js                  # 라우터 인스턴스
│   ├── guards.js                 # 네비게이션 가드
│   └── routes/                   # 라우트 모듈
│
├── stores/                       # Pinia 스토어
│   ├── auth.js                   # 인증 상태
│   ├── user.js                   # 사용자 상태
│   └── app.js                    # 앱 전역 상태
│
├── types/                        # TypeScript 타입 (선택)
│
├── utils/                        # 유틸리티
│   ├── format.js                 # 포맷팅 (날짜, 숫자)
│   ├── validate.js               # 유효성 검사
│   └── storage.js                # 로컬스토리지 래핑
│
├── views/                        # 페이지 컴포넌트
│   ├── auth/                     # 인증 관련 페이지
│   ├── errors/                   # 에러 페이지
│   ├── home/                     # 메인/대시보드
│   └── [도메인]/                 # 업무 도메인별 페이지
│
├── App.vue
└── main.js
```

---

## 🎨 스타일링 가이드

### CSS 변수 정의 방식

모든 스타일링 작업은 `@src/assets/styles/sample.css` 구조를 따른다.

#### 1단계: CSS 변수 정의 (:root)

```css
:root {
  /* 컴포넌트 전용 토큰 */
  --my-component-bg: oklch(1 0 0);
  --my-component-text: oklch(0.2 0 0);
}
```

#### 2단계: Tailwind 테마 매핑 (@theme inline)

```css
@theme inline {
  --color-my-component-bg: var(--my-component-bg);
  --color-my-component-text: var(--my-component-text);
}
```

#### 3단계: Tailwind 클래스 사용

```html
<div class="bg-my-component-bg text-my-component-text">콘텐츠</div>
```

### 색상 시스템

프로젝트는 **oklch 색상 공간**을 사용한다.

```css
/* oklch(밝기 채도 색상) */
--primary: oklch(0.588 0.158 241.966); /* 파란색 */
--danger: oklch(0.577 0.245 27.325); /* 빨간색 */
```

### 다크모드 지원

```css
.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.985 0.001 106.423);
}
```

---

## 🎯 Tailwind CSS 사용 규칙

### cn() 함수 사용 (필수)

모든 Tailwind 클래스 바인딩에는 `cn()` 함수를 사용한다.

```vue
<script setup>
  import { cn } from '@/lib/utils'
</script>

<template>
  <!-- 기본 사용 -->
  <div :class="cn('flex', 'items-center', 'gap-4')">콘텐츠</div>

  <!-- 조건부 스타일링 -->
  <button
    :class="
      cn(
        'rounded-md px-4 py-2',
        'bg-primary text-primary-foreground',
        isActive && 'bg-primary/80',
        isDisabled && 'cursor-not-allowed opacity-50',
      )
    "
  >
    버튼
  </button>

  <!-- props와 결합 -->
  <div :class="cn('base-class', props.class)">
    <slot />
  </div>
</template>
```

### cn() 함수의 장점

1. **조건부 클래스 처리**: `true && 'class'` 패턴 지원
2. **클래스 병합**: 중복 클래스 자동 처리
3. **가독성**: 템플릿 내 클래스 정리

### 금지 사항

```vue
<!-- ❌ 잘못된 예 -->
<div class="flex items-center">
<div :class="`flex ${isActive ? 'bg-blue' : 'bg-gray'}`">

<!-- ✅ 올바른 예 -->
<div :class="cn('flex', 'items-center')">
<div :class="cn('flex', isActive ? 'bg-blue' : 'bg-gray')">
```

---

## 📦 컴포넌트 작성 규칙

### shadcn-vue 스타일 컴포넌트

```vue
<script setup>
  import { cn } from '@/lib/utils'
  import { cva } from 'class-variance-authority'

  // CVA로 변형 정의
  const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground',
          outline: 'border border-input bg-background',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-md px-3',
          lg: 'h-11 rounded-md px-8',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
  )

  const props = defineProps({
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'default' },
    class: { type: String, default: '' },
  })
</script>

<template>
  <button :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </button>
</template>
```

---

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 린트 검사 및 수정
npm run lint

# 코드 포맷팅
npm run format
```

---

## 📝 네이밍 컨벤션

| 구분          | 컨벤션                 | 예시                |
| ------------- | ---------------------- | ------------------- |
| 컴포넌트 파일 | PascalCase             | `AppHeader.vue`     |
| 컴포저블      | camelCase + use 접두사 | `useAuth.js`        |
| 스토어        | camelCase              | `auth.js`           |
| 라우트 파일   | camelCase              | `auth.js`           |
| CSS 변수      | kebab-case             | `--header-bg`       |
| Tailwind 테마 | kebab-case             | `--color-header-bg` |

---

## 🌐 경로 별칭

```js
// vite.config.js
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

사용 예시:

```js
import { cn } from '@/lib/utils'
import AppHeader from '@/components/common/AppHeader.vue'
```

포트 종료 방법:

# 포트 사용 프로세스 확인

```cmd
netstat -ano | findstr ":포트번호"
```

# 프로세스 종료

```cmd
taskkill //F //PID [PID번호]
```
