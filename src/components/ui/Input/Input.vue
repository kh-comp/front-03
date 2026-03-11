<script setup>
/**
 * Input 컴포넌트
 * 텍스트 입력 필드
 */
import { cn } from '@/lib/utils'
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
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
  errorMessage: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  ariaDescribedby: {
    type: String,
    default: '',
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
const attrs = useAttrs()

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

const errorMessageId = computed(() =>
  props.id && props.errorMessage ? `${props.id}-error` : '',
)

const helperTextId = computed(() =>
  props.id && props.helperText ? `${props.id}-description` : '',
)

const describedBy = computed(() => {
  const ids = [props.ariaDescribedby, errorMessageId.value || helperTextId.value].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
})

// input 클래스 계산
const inputClass = computed(() =>
  cn(
    'flex h-size-md w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    props.error && 'border-destructive focus-visible:ring-destructive',
    props.class,
  ),
)
</script>

<template>
  <div class="w-full">
    <input
      v-bind="attrs"
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="describedBy"
      :class="inputClass"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <p
      v-if="errorMessage"
      :id="errorMessageId"
      class="mt-2 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>
    <p
      v-else-if="helperText"
      :id="helperTextId"
      class="mt-2 text-sm text-muted-foreground"
    >
      {{ helperText }}
    </p>
  </div>
</template>
