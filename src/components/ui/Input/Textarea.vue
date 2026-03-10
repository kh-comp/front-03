<script setup>
/**
 * Textarea 컴포넌트
 * 텍스트 영역 입력
 */
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [Number, String],
    default: 4,
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

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// 입력값 변경 핸들러
const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

// 포커스 핸들러
const handleFocus = (event) => {
  emit('focus', event)
}

// 블러 핸들러
const handleBlur = (event) => {
  emit('blur', event)
}

// textarea 클래스 계산
const textareaClass = computed(() =>
  cn(
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'resize-y',
    props.error && 'border-destructive focus-visible:ring-destructive',
    props.class,
  ),
)
</script>

<template>
  <textarea
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :class="textareaClass"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
