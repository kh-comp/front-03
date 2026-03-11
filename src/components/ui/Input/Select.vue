<script setup>
/**
 * Select 컴포넌트
 * 셀렉트 박스
 */
import { cn } from '@/lib/utils'
import { computed, useAttrs } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
    // [{ value: '', label: '' }, ...]
  },
  placeholder: {
    type: String,
    default: '선택하세요',
  },
  allowEmpty: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
const attrs = useAttrs()

// 선택값 변경 핸들러
const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event.target.value)
}

const hasEmptyOption = computed(() =>
  props.options.some((option) => String(option.value) === ''),
)

const shouldRenderPlaceholderOption = computed(() =>
  Boolean(props.placeholder) && !hasEmptyOption.value,
)

const hasValue = computed(() => String(props.modelValue ?? '') !== '')

// select 클래스 계산
const selectClass = computed(() =>
  cn(
    'flex h-size-md w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm',
    'shadow-sm ring-offset-background transition-[border-color,box-shadow,background-color,color] duration-200',
    'hover:border-foreground/15 hover:bg-accent/20',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input disabled:hover:bg-background',
    props.error && 'border-destructive focus-visible:ring-destructive',
    hasValue.value ? 'font-medium text-foreground' : 'text-muted-foreground',
    props.class,
  ),
)

const iconWrapClass = computed(() =>
  cn(
    'pointer-events-none absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[0.4rem] border',
    'border-border/70 bg-muted/65 shadow-sm transition-colors duration-200',
    'group-hover:border-foreground/10 group-hover:bg-accent',
    'group-focus-within:border-ring/30 group-focus-within:bg-primary/5',
    props.error && 'border-destructive/30 bg-destructive/5',
    props.disabled && 'bg-muted/40',
  ),
)

const iconClass = computed(() =>
  cn(
    'h-3.5 w-3.5 text-muted-foreground transition-colors duration-200',
    hasValue.value && 'text-foreground/70',
    props.error && 'text-destructive',
  ),
)
</script>

<template>
  <div class="group relative w-full">
    <select
      v-bind="attrs"
      :id="id"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :class="selectClass"
      @change="handleChange"
    >
      <option
        v-if="shouldRenderPlaceholderOption"
        value=""
        :disabled="!allowEmpty"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div :class="iconWrapClass">
      <ChevronDown :class="iconClass" />
    </div>
  </div>
</template>
