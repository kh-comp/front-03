<script setup>
/**
 * FormField 컴포넌트
 * 라벨 + 입력요소를 포함한 재사용 가능한 폼 필드
 */
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import Input from '@/components/ui/Input/Input.vue'
import Select from '@/components/ui/Input/Select.vue'

const props = defineProps({
  // SearchField 타입 참조: @/types/form.js
  field: {
    type: Object,
    required: true,
    // { key, label, type, placeholder?, options?, required?, error? }
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const handleUpdate = (value) => {
  emit('update:modelValue', value)
}

const fieldId = computed(() => {
  if (props.field?.key) {
    return `field-${props.field.key}`
  }

  return ''
})
</script>

<template>
  <div class="flex flex-col">
    <!-- 라벨 -->
    <label
      v-if="field.label"
      :for="fieldId"
      :class="
        cn(
          'mb-1 flex items-center text-sm font-bold',
          'text-slate-700 dark:text-slate-300',
        )
      "
    >
      <span
        class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"
      />
      {{ field.label }}
      <span v-if="field.required" class="ml-0.5 text-destructive">*</span>
    </label>

    <!-- 텍스트 입력 -->
    <Input
      v-if="field.type === 'text'"
      :id="fieldId"
      :model-value="modelValue"
      :placeholder="field.placeholder"
      :error="field.error"
      @update:model-value="handleUpdate"
    />

    <!-- 셀렉트 -->
    <Select
      v-else-if="field.type === 'select'"
      :id="fieldId"
      :model-value="modelValue"
      :options="field.options"
      :placeholder="field.placeholder || '전체'"
      :error="field.error"
      @update:model-value="handleUpdate"
    />

    <!-- 추후 확장: date, number, textarea 등 -->
  </div>
</template>
