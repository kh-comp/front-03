<script setup>
/**
 * 샘플 컴포넌트 페이지
 * DatePicker 검증 전용 화면
 */
import { reactive } from 'vue'
import { cn } from '@/lib/utils'
import PageHeader from '@/components/common/PageHeader.vue'
import { DatePicker, DateRangePicker } from '@/components/ui/Input'

const formData = reactive({
  basicDate: '',
  scheduledDate: '2026-03-20',
  limitedDate: '',
  errorDate: '',
  disabledDate: '2026-03-11',
  rangeStart: '',
  rangeEnd: '',
  rangePresetStart: '2026-03-05',
  rangePresetEnd: '2026-03-14',
  rangeLimitedStart: '',
  rangeLimitedEnd: '',
  rangeErrorStart: '',
  rangeErrorEnd: '',
})

const checkpoints = [
  '우측 캘린더 아이콘이 포함된 트리거를 누르면 popover calendar가 열리는지 확인',
  '값이 있는 상태에서 clear 아이콘으로 즉시 초기화되는지 확인',
  'placeholder, 값 표시, 포커스 링이 다른 input/select와 톤이 맞는지 확인',
  'min/max 범위 제한과 disabled 상태가 의도대로 보이는지 확인',
  'DateRangePicker에서 시작일 이후 종료일만 선택 가능한지 확인',
  'DateRangePicker의 팝오버 캘린더와 범위 하이라이트가 자연스럽게 동작하는지 확인',
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
    <PageHeader title="Component" class="shrink-0" />

    <div class="mt-5 grid min-h-0 flex-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_360px]">
      <section
        class="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="mb-8">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            Component Review
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            DatePicker
          </h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            개선된 `DatePicker`를 전용 메뉴 안에서 확인할 수 있도록 구성했습니다. 단일 날짜 선택도
            `Reka UI` 기반 popover calendar로 통일하고, 기존 공용 입력 필드의 셸과 clear 동작을
            유지하는 방향으로 정리한 버전입니다.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/40">
            <label for="component-date-basic" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              기본 상태
            </label>
            <DatePicker
              id="component-date-basic"
              v-model="formData.basicDate"
              placeholder="날짜를 선택하세요"
            />
          </div>

          <div class="rounded-xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/30">
            <label for="component-date-filled" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              값이 있는 상태
            </label>
            <DatePicker
              id="component-date-filled"
              v-model="formData.scheduledDate"
              placeholder="일정을 선택하세요"
            />
          </div>

          <div class="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
            <label for="component-date-limited" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              범위 제한
            </label>
            <DatePicker
              id="component-date-limited"
              v-model="formData.limitedDate"
              min="2026-03-01"
              max="2026-03-31"
              placeholder="2026년 3월 안에서 선택"
            />
            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
              허용 범위: 2026-03-01 ~ 2026-03-31
            </p>
          </div>

          <div class="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/30">
            <label for="component-date-error" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              에러 상태
            </label>
            <DatePicker
              id="component-date-error"
              v-model="formData.errorDate"
              :error="true"
              placeholder="필수 날짜를 선택하세요"
            />
          </div>

          <div class="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/40">
            <label for="component-date-disabled" class="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
              비활성화
            </label>
            <DatePicker
              id="component-date-disabled"
              v-model="formData.disabledDate"
              :disabled="true"
            />
          </div>
        </div>

        <div class="my-8 h-px bg-slate-200 dark:bg-slate-700"></div>

        <div class="mb-8">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
            Range Selection
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            DateRangePicker
          </h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            시작일과 종료일을 한 묶음으로 다루는 범위 선택용 컴포넌트입니다. 기존 커스텀 구현은 제거했고,
            현재는 `Reka UI` 기반 팝오버 캘린더 버전을 공용 `DateRangePicker`로 사용합니다.
          </p>
        </div>

        <div class="grid gap-5">
          <div class="rounded-xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/30">
            <label class="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
              기본 범위 선택
            </label>
            <DateRangePicker
              :start-date="formData.rangeStart"
              :end-date="formData.rangeEnd"
              @update:start-date="(value) => (formData.rangeStart = value)"
              @update:end-date="(value) => (formData.rangeEnd = value)"
            />
          </div>

          <div class="rounded-xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/30">
            <label class="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
              값이 있는 상태
            </label>
            <DateRangePicker
              :start-date="formData.rangePresetStart"
              :end-date="formData.rangePresetEnd"
              @update:start-date="(value) => (formData.rangePresetStart = value)"
              @update:end-date="(value) => (formData.rangePresetEnd = value)"
            />
          </div>

          <div class="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
            <label class="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
              범위 제한
            </label>
            <DateRangePicker
              :start-date="formData.rangeLimitedStart"
              :end-date="formData.rangeLimitedEnd"
              min="2026-03-01"
              max="2026-03-31"
              placeholder="2026년 3월 범위를 선택하세요"
              @update:start-date="(value) => (formData.rangeLimitedStart = value)"
              @update:end-date="(value) => (formData.rangeLimitedEnd = value)"
            />
            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
              허용 범위: 2026-03-01 ~ 2026-03-31
            </p>
          </div>

          <div class="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/30">
            <label class="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
              에러 상태
            </label>
            <DateRangePicker
              :start-date="formData.rangeErrorStart"
              :end-date="formData.rangeErrorEnd"
              :error="true"
              placeholder="필수 기간을 선택하세요"
              @update:start-date="(value) => (formData.rangeErrorStart = value)"
              @update:end-date="(value) => (formData.rangeErrorEnd = value)"
            />
          </div>
        </div>
      </section>

      <aside
        class="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">확인 포인트</h3>
        <ol class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li v-for="(checkpoint, index) in checkpoints" :key="checkpoint">
            {{ index + 1 }}. {{ checkpoint }}
          </li>
        </ol>

        <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p class="text-sm font-medium text-slate-900 dark:text-white">현재 값</p>
          <pre
            class="mt-3 overflow-x-auto rounded-md bg-slate-950 p-4 text-xs leading-6 text-slate-100"
          >{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </aside>
    </div>
  </div>
</template>
