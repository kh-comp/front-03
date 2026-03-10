<script setup>
  /**
   * Radio 컴포넌트
   * 라디오 버튼
   */
  import { cn } from '@/lib/utils'
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
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

  // 선택 상태 계산
  const isSelected = computed(() => props.modelValue === props.value)

  // 라디오 변경 핸들러
  const handleChange = () => {
    if (!props.disabled) {
      emit('update:modelValue', props.value)
    }
  }

  // wrapper 클래스
  const wrapperClass = computed(() =>
    cn('inline-flex items-center gap-2', props.disabled && 'cursor-not-allowed opacity-50'),
  )

  // 라디오 아이콘 wrapper 클래스
  const radioClass = computed(() =>
    cn(
      'flex items-center justify-center flex-shrink-0 aspect-square h-4 w-4 rounded-full border border-primary',
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'cursor-pointer transition-colors',
      isSelected.value && 'border-primary bg-primary/10',
      props.class,
    ),
  )

  // 내부 원 클래스
  const innerDotClass = computed(() =>
    cn(
      'flex items-center justify-center rounded-full',
      isSelected.value ? 'bg-primary h-2 w-2' : 'h-0 w-0',
      'transition-all',
    ),
  )
</script>

<template>
  <div :class="wrapperClass">
    <button
      type="button"
      role="radio"
      :id="id"
      :name="name"
      :aria-checked="isSelected"
      :disabled="disabled"
      :class="radioClass"
      @click="handleChange"
    >
      <span :class="innerDotClass" />
    </button>
    <label
      v-if="label"
      :for="id"
      :class="
        cn(
          'flex h-4 cursor-pointer items-center text-sm select-none',
          disabled && 'cursor-not-allowed',
        )
      "
    >
      {{ label }}
    </label>
  </div>
</template>
