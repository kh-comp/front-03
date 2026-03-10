<script setup>
/**
 * FormTable 컴포넌트
 * 폼 테이블 레이아웃
 * 4컬럼 구조: [label1, value1, label2, value2]
 */
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => [20, 30, 20, 30], // 퍼센트
  },
  class: {
    type: String,
    default: '',
  },
})

// colgroup 스타일 계산
const colStyles = computed(() =>
  props.columns.map((width) => ({
    width: `${width}%`,
  })),
)
</script>

<template>
  <div :class="cn('w-full overflow-x-auto', props.class)">
    <table class="w-full border-collapse">
      <caption class="sr-only">
        폼 입력 테이블
      </caption>
      <colgroup>
        <col
          v-for="(style, index) in colStyles"
          :key="index"
          :style="style"
        />
      </colgroup>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * FormRow 서브컴포넌트
 * 폼 테이블 행
 */
export const FormRow = {
  props: {
    colspan: {
      type: Number,
      default: 1,
    },
  },
  template: `
    <tr class="border-b border-form-border last:border-b-0">
      <slot />
    </tr>
  `,
}

/**
 * FormLabel 서브컴포넌트
 * 폼 라벨 셀
 */
export const FormLabel = {
  props: {
    for: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    colspan: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    labelClass() {
      return cn(
        'bg-form-label-bg text-form-label-text px-4 py-3 text-sm font-medium text-left',
        'border-r border-form-border last:border-r-0',
      )
    },
  },
  template: `
    <th
      :for="for"
      :colspan="colspan"
      :class="labelClass"
      scope="row"
    >
      <slot />
      <span v-if="required" class="text-destructive ml-0.5">*</span>
    </th>
  `,
}

/**
 * FormCell 서브컴포넌트
 * 폼 값 셀
 */
export const FormCell = {
  props: {
    colspan: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    cellClass() {
      return cn(
        'px-4 py-3 text-sm',
        'border-r border-form-border last:border-r-0',
      )
    },
  },
  template: `
    <td :colspan="colspan" :class="cellClass">
      <slot />
    </td>
  `,
}
</script>
