<script setup>
/**
 * DataTable 체크박스 컴포넌트
 * 행 선택 및 전체 선택 기능 지원
 */
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'

const props = defineProps({
  /** 체크 상태 (true | false | 'indeterminate') */
  checked: {
    type: [Boolean, String],
    default: false,
  },
  /** 비활성화 여부 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 추가 클래스 */
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:checked'])

/**
 * 체크박스 상태 토글
 */
function toggle() {
  if (props.disabled) return
  emit('update:checked', !props.checked)
}
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked === 'indeterminate' ? 'mixed' : checked"
    :disabled="disabled"
    :class="
      cn(
        'peer relative block h-4 w-4 shrink-0 rounded-[4px] leading-none',
        'border border-border bg-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors hover:border-foreground/30',
        'data-[state=checked]:border-foreground data-[state=checked]:bg-foreground',
        'data-[state=indeterminate]:border-foreground data-[state=indeterminate]:bg-foreground',
        props.class,
      )
    "
    :data-state="checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'"
    @click="toggle"
  >
    <!-- 체크 상태 아이콘 -->
    <span
      :class="
        cn(
          'absolute inset-0 flex items-center justify-center text-background transition-opacity',
          checked ? 'opacity-100' : 'opacity-0',
        )
      "
    >
      <Check v-if="checked === true" class="h-3 w-3" />
      <span
        v-else-if="checked === 'indeterminate'"
        class="h-0.5 w-2 rounded-full bg-background"
      />
    </span>
  </button>
</template>
