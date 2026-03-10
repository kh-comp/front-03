<script setup>
  /**
   * Checkbox 컴포넌트
   * 체크박스 입력
   */
  import { cn } from '@/lib/utils'
  import { computed } from 'vue'
  import { Check } from 'lucide-vue-next'

  const props = defineProps({
    modelValue: {
      type: [Boolean, Array],
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    disabled: {
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
    label: {
      type: String,
      default: '',
    },
    class: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  // 체크 상태 계산
  const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) {
      return props.value !== undefined && props.modelValue.includes(props.value)
    }
    return props.modelValue === true
  })

  // 체크박스 변경 핸들러
  const handleChange = () => {
    if (Array.isArray(props.modelValue)) {
      // 배열인 경우 value 토글
      const newValue = [...props.modelValue]
      if (isChecked.value) {
        const index = newValue.indexOf(props.value)
        if (index > -1) {
          newValue.splice(index, 1)
        }
      } else {
        newValue.push(props.value)
      }
      emit('update:modelValue', newValue)
    } else {
      // 불리언인 경우 토글
      emit('update:modelValue', !props.modelValue)
    }
  }

  // 체크박스 wrapper 클래스
  const wrapperClass = computed(() =>
    cn('inline-flex items-center gap-2', props.disabled && 'cursor-not-allowed opacity-50'),
  )

  // 체크박스 아이콘 wrapper 클래스
  const checkboxClass = computed(() =>
    cn(
      'flex items-center justify-center peer h-4 w-4 shrink-0 rounded-sm border border-primary',
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      isChecked.value &&
        'bg-checkbox-checked-bg border-checkbox-checked-bg text-primary-foreground',
      'cursor-pointer transition-colors',
      props.class,
    ),
  )
</script>

<template>
  <div :class="wrapperClass">
    <button
      type="button"
      role="checkbox"
      :id="id"
      :name="name"
      :aria-checked="isChecked"
      :disabled="disabled"
      :class="checkboxClass"
      @click="handleChange"
    >
      <Check v-if="isChecked" class="h-3 w-3 text-white" />
    </button>
    <label
      v-if="label"
      :for="id"
      :class="cn('cursor-pointer text-sm select-none', disabled && 'cursor-not-allowed')"
    >
      {{ label }}
    </label>
  </div>
</template>
