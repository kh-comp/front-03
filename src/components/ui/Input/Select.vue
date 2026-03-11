<script setup>
/**
 * Select 컴포넌트
 * 셀렉트 박스
 */
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

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

// 선택값 변경 핸들러
const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event.target.value)
}

// select 클래스 계산
const selectClass = computed(() =>
  cn(
    'flex h-size-md w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm',
    'ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    props.error && 'border-destructive focus-visible:ring-destructive',
    !props.modelValue && 'text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <div class="relative w-full">
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :class="selectClass"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <ChevronDown
      class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
    />
  </div>
</template>
