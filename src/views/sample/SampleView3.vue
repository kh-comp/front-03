<script setup>
/**
 * 샘플 페이지 3
 * FormField 라벨-컨트롤 연결 검증 페이지
 */
import { reactive } from 'vue'
import { cn } from '@/lib/utils'
import PageHeader from '@/components/common/PageHeader.vue'
import FormField from '@/components/ui/Form/FormField.vue'
import Input from '@/components/ui/Input/Input.vue'
import Select from '@/components/ui/Input/Select.vue'

const formData = reactive({
  ucName: '',
  ucStatus: '',
  mcRevision: '',
  partNumber: '',
  inspectorCode: '',
  step3Status: '',
  step3Filter: '',
  step4Search: '',
  step4PageSize: '20',
  step5UserId: '',
  step5Password: '',
})

const demoFields = [
  {
    key: 'ucName',
    label: 'UC Name',
    type: 'text',
    placeholder: '라벨을 클릭해 포커스를 확인하세요',
    required: true,
  },
  {
    key: 'ucStatus',
    label: 'UC Status',
    type: 'select',
    placeholder: '상태를 선택하세요',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  {
    key: 'mcRevision',
    label: 'MC Revision',
    type: 'text',
    placeholder: 'Revision 값을 입력하세요',
  },
]

const verificationSteps = [
  '각 라벨(UC Name, UC Status, MC Revision)을 마우스로 클릭합니다.',
  '클릭한 라벨과 연결된 입력 필드로 즉시 포커스가 이동하는지 확인합니다.',
  'Tab 키로 이동할 때 라벨 텍스트와 필드의 의미가 자연스럽게 매칭되는지 확인합니다.',
]

const errorAccessibilitySteps = [
  '아래 에러 상태 Input에 포커스를 두고 붉은 포커스 링과 에러 메시지를 확인합니다.',
  '브라우저 개발자도구에서 input 요소를 선택해 `aria-invalid=\"true\"`와 `aria-describedby`가 연결되었는지 확인합니다.',
  '정상 상태 Input은 helper text가 노출되고, 동일하게 `aria-describedby`가 helper text를 참조하는지 확인합니다.',
]

const selectResetSteps = [
  'Status Select에서 값을 한 번 선택한 뒤 드롭다운을 다시 열어 placeholder로 되돌릴 수 있는지 확인합니다.',
  'Filter Select는 빈 값 옵션이 이미 있으므로 placeholder가 중복으로 생기지 않는지 확인합니다.',
  '두 셀렉트 모두 현재 값 패널에 즉시 반영되는지 확인합니다.',
]

const step3StatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
]

const step3FilterOptions = [
  { value: '', label: '전체' },
  { value: 'engine', label: 'Engine' },
  { value: 'module', label: 'Module' },
  { value: 'tool', label: 'Tool' },
]

const step4ConsistencySteps = [
  'Search Input과 Page Size Select의 높이, border radius, focus ring이 같은 규칙으로 보이는지 확인합니다.',
  'Search Input에 Enter 키를 눌러도 입력 동작이 깨지지 않는지 확인합니다.',
  'Page Size Select를 열었을 때 기존 공용 Select와 동일한 placeholder/아이콘/간격 규칙을 따르는지 확인합니다.',
]

const step4PageSizeOptions = [
  { value: '10', label: '10개씩 보기' },
  { value: '20', label: '20개씩 보기' },
  { value: '30', label: '30개씩 보기' },
  { value: '50', label: '50개씩 보기' },
]

const step5LoginSteps = [
  'Step 5의 아이디/비밀번호 필드가 로그인 화면과 동일한 높이와 포커스 스타일을 유지하는지 확인합니다.',
  '공용 Input으로 바뀌었어도 placeholder, 입력, password masking 동작이 그대로인지 확인합니다.',
  '실제 로그인 페이지에서도 동일한 스타일로 보이는지 최종 확인합니다.',
]
</script>

<template>
  <div
    :class="
      cn(
        'box-border flex h-[calc(100vh-60px)] flex-col overflow-hidden',
        'bg-slate-100 p-5 dark:bg-slate-900',
      )
    "
  >
    <PageHeader title="샘플 페이지 3" class="shrink-0" />

    <div class="mt-5 grid min-h-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
      <section
        class="flex min-h-0 flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            Sequential Review
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            FormField 라벨 연결 검증
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            이번 단계에서는 `FormField`가 생성하는 라벨이 실제 입력 요소와 연결되는지 확인할 수
            있도록 구성했습니다. 라벨을 클릭했을 때 해당 필드로 바로 포커스가 이동해야 합니다.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div
            v-for="field in demoFields"
            :key="field.key"
            class="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40"
          >
            <FormField
              :field="field"
              :model-value="formData[field.key]"
              @update:model-value="(value) => (formData[field.key] = value)"
            />
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-dashed border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/40">
          <p class="text-sm font-medium text-sky-900 dark:text-sky-100">체크 포인트</p>
          <p class="mt-1 text-sm text-sky-800 dark:text-sky-200">
            라벨 클릭 시 포커스 링이 해당 필드에 나타나면 이번 수정은 의도대로 동작하는 것입니다.
          </p>
        </div>

        <div class="my-8 h-px bg-slate-200 dark:bg-slate-700"></div>

        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">
            Step 2
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Input 에러 접근성 검증
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            이번 단계에서는 시각적 에러 표시만 있던 Input에 접근성 속성과 설명 텍스트 연결을
            추가했습니다. 에러 필드는 `aria-invalid`와 에러 메시지를, 일반 필드는 helper text를
            연결합니다.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div class="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/30">
            <label for="sample3-part-number" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              Part Number
            </label>
            <Input
              id="sample3-part-number"
              v-model="formData.partNumber"
              :error="true"
              error-message="Part Number는 필수 입력값입니다."
              placeholder="에러 상태를 확인하세요"
            />
          </div>

          <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
            <label for="sample3-inspector-code" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              Inspector Code
            </label>
            <Input
              id="sample3-inspector-code"
              v-model="formData.inspectorCode"
              helper-text="영문과 숫자를 조합해 8자 이내로 입력합니다."
              placeholder="도움말 연결을 확인하세요"
            />
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-dashed border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900 dark:bg-rose-950/40">
          <p class="text-sm font-medium text-rose-900 dark:text-rose-100">체크 포인트</p>
          <p class="mt-1 text-sm text-rose-800 dark:text-rose-200">
            에러 필드는 메시지와 함께 표시되고, 정상 필드는 helper text가 보이며 각 텍스트가 input과
            접근성 속성으로 연결되어야 합니다.
          </p>
        </div>

        <div class="my-8 h-px bg-slate-200 dark:bg-slate-700"></div>

        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
            Step 3
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Select 초기 상태 복귀 검증
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            이번 단계에서는 셀렉트가 값을 선택한 뒤 다시 빈 상태로 돌아갈 수 있는지, 그리고 빈 값
            옵션이 이미 존재하는 경우 placeholder가 중복되지 않는지 확인합니다.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
            <label for="sample3-step3-status" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              Status Select
            </label>
            <Select
              id="sample3-step3-status"
              v-model="formData.step3Status"
              :options="step3StatusOptions"
              placeholder="상태를 선택하거나 다시 비우세요"
            />
          </div>

          <div class="rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900 dark:bg-cyan-950/30">
            <label for="sample3-step3-filter" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              Filter Select
            </label>
            <Select
              id="sample3-step3-filter"
              v-model="formData.step3Filter"
              :options="step3FilterOptions"
              placeholder="전체"
            />
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-dashed border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/40">
          <p class="text-sm font-medium text-amber-900 dark:text-amber-100">체크 포인트</p>
          <p class="mt-1 text-sm text-amber-800 dark:text-amber-200">
            첫 번째 셀렉트는 선택 후 다시 빈 값으로 되돌릴 수 있어야 하고, 두 번째 셀렉트는 `전체`
            옵션이 한 번만 보여야 합니다.
          </p>
        </div>

        <div class="my-8 h-px bg-slate-200 dark:bg-slate-700"></div>

        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
            Step 4
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            공용 컴포넌트 일관성 검증
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            이번 단계에서는 헤더 검색창, 테이블 페이지 크기 선택처럼 흩어져 있던 raw 폼 요소를 공용
            `Input`/`Select`로 전환한 뒤 일관된 시각 규칙과 인터랙션을 확인합니다.
          </p>
        </div>

        <div class="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/30">
          <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div class="w-full max-w-[320px]">
              <label for="sample3-step4-search" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                Search Input
              </label>
              <div class="relative">
                <Input
                  id="sample3-step4-search"
                  v-model="formData.step4Search"
                  type="search"
                  placeholder="공용 Input으로 통일된 검색창"
                  class="h-9 border-violet-200 bg-white pr-10 dark:border-violet-800 dark:bg-slate-900"
                />
                <span class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-violet-500">
                  ⌕
                </span>
              </div>
            </div>

            <div class="w-full max-w-[220px]">
              <label for="sample3-step4-page-size" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                Page Size Select
              </label>
              <Select
                id="sample3-step4-page-size"
                v-model="formData.step4PageSize"
                :options="step4PageSizeOptions"
                :allow-empty="false"
                placeholder=""
                class="h-9 border-violet-200 bg-white dark:border-violet-800 dark:bg-slate-900"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-dashed border-violet-200 bg-violet-50 px-4 py-3 dark:border-violet-900 dark:bg-violet-950/40">
          <p class="text-sm font-medium text-violet-900 dark:text-violet-100">체크 포인트</p>
          <p class="mt-1 text-sm text-violet-800 dark:text-violet-200">
            이제 검색창과 페이지 크기 선택도 동일한 공용 컴포넌트 위에서 동작해야 하며, 포커스/간격/
            모서리 규칙이 통일되어 보여야 합니다.
          </p>
        </div>

        <div class="my-8 h-px bg-slate-200 dark:bg-slate-700"></div>

        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-600">
            Step 5
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            로그인 화면 공용 Input 적용 검증
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            마지막 단계에서는 비주얼 커스터마이징이 있는 로그인 화면도 공용 `Input` 위에서
            동작하도록 맞춘 뒤, 스타일이 깨지지 않는지 확인합니다.
          </p>
        </div>

        <div class="rounded-lg border border-fuchsia-200 bg-fuchsia-50 p-4 dark:border-fuchsia-900 dark:bg-fuchsia-950/30">
          <div class="mx-auto w-full max-w-md rounded-xl border border-fuchsia-200 bg-white p-6 shadow-sm dark:border-fuchsia-900 dark:bg-slate-900">
            <p class="mb-6 text-center text-lg font-semibold text-slate-900 dark:text-white">
              Login Form Preview
            </p>

            <div class="space-y-4">
              <div>
                <label for="sample3-step5-user-id" class="mb-1.5 block text-sm font-medium text-slate-900 dark:text-white">
                  아이디
                </label>
                <Input
                  id="sample3-step5-user-id"
                  v-model="formData.step5UserId"
                  placeholder="아이디를 입력하세요"
                  class="h-10 bg-background text-sm"
                />
              </div>

              <div>
                <label for="sample3-step5-password" class="mb-1.5 block text-sm font-medium text-slate-900 dark:text-white">
                  비밀번호
                </label>
                <Input
                  id="sample3-step5-password"
                  v-model="formData.step5Password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  class="h-10 bg-background text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-dashed border-fuchsia-200 bg-fuchsia-50 px-4 py-3 dark:border-fuchsia-900 dark:bg-fuchsia-950/40">
          <p class="text-sm font-medium text-fuchsia-900 dark:text-fuchsia-100">체크 포인트</p>
          <p class="mt-1 text-sm text-fuchsia-800 dark:text-fuchsia-200">
            로그인 화면처럼 별도 시각 스타일이 있는 영역에서도 공용 Input이 무리 없이 적용되고,
            포커스/placeholder/입력 동작이 동일해야 합니다.
          </p>
        </div>
      </section>

      <aside
        class="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">확인 방법</h3>
        <ol class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li v-for="(step, index) in verificationSteps" :key="step">
            {{ index + 1 }}. {{ step }}
          </li>
        </ol>

        <div class="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Current Scope
          </p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">
            반영된 변경은 `FormField` 내부의 `label for`와 자식 `Input`/`Select`의 `id` 연결입니다.
          </p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">
            이어서 `Input`에는 `aria-invalid`, `aria-describedby`, 에러 메시지/도움말 연결이
            추가되었습니다.
          </p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">
            `Select`는 빈 값 옵션 중복을 피하면서도, 필요한 경우 다시 placeholder 상태로 복귀할 수
            있게 수정했습니다.
          </p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">
            헤더 검색창과 페이지네이션/샘플 액션 셀렉트도 공용 `Input`/`Select` 사용으로 통일했습니다.
          </p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">
            로그인 화면의 아이디/비밀번호 필드도 공용 `Input`으로 전환해 제품 전체의 입력 경험을
            맞췄습니다.
          </p>
        </div>

        <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p class="text-sm font-medium text-slate-900 dark:text-white">Step 2 확인 방법</p>
          <ol class="mt-3 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li v-for="(step, index) in errorAccessibilitySteps" :key="step">
              {{ index + 1 }}. {{ step }}
            </li>
          </ol>
        </div>

        <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p class="text-sm font-medium text-slate-900 dark:text-white">Step 3 확인 방법</p>
          <ol class="mt-3 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li v-for="(step, index) in selectResetSteps" :key="step">
              {{ index + 1 }}. {{ step }}
            </li>
          </ol>
        </div>

        <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p class="text-sm font-medium text-slate-900 dark:text-white">Step 4 확인 방법</p>
          <ol class="mt-3 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li v-for="(step, index) in step4ConsistencySteps" :key="step">
              {{ index + 1 }}. {{ step }}
            </li>
          </ol>
        </div>

        <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p class="text-sm font-medium text-slate-900 dark:text-white">Step 5 확인 방법</p>
          <ol class="mt-3 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li v-for="(step, index) in step5LoginSteps" :key="step">
              {{ index + 1 }}. {{ step }}
            </li>
          </ol>
        </div>

        <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p class="text-sm font-medium text-slate-900 dark:text-white">현재 입력값</p>
          <pre
            class="mt-3 overflow-x-auto rounded-md bg-slate-950 p-4 text-xs leading-6 text-slate-100"
          >{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </aside>
    </div>
  </div>
</template>
