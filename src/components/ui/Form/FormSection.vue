<script setup>
/**
 * FormSection 컴포넌트
 * 폼 섹션 래퍼 - 타이틀 + 저장 버튼
 */
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  showSaveButton: {
    type: Boolean,
    default: true,
  },
  saveButtonText: {
    type: String,
    default: '저장',
  },
  saveButtonVariant: {
    type: String,
    default: 'default',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['save'])

// 저장 버튼 클릭 핸들러
const handleSave = () => {
  emit('save')
}
</script>

<template>
  <div :class="cn('space-y-4', props.class)">
    <!-- 섹션 헤더 -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-form-section-title">
        {{ title }}
      </h3>

      <!-- 저장 버튼 -->
      <div v-if="showSaveButton" class="flex items-center gap-2">
        <slot name="actions" />
        <Button
          :variant="saveButtonVariant"
          :loading="loading"
          @click="handleSave"
        >
          {{ saveButtonText }}
        </Button>
      </div>

      <!-- 액션 슬롯만 사용하는 경우 -->
      <div v-else-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- 폼 콘텐츠 -->
    <div class="space-y-4">
      <slot />
    </div>
  </div>
</template>
