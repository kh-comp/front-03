<script setup>
/**
 * Tabs 컴포넌트
 * 탭 컨테이너 - v-model로 활성 탭 관리
 */
import { cn } from '@/lib/utils'
import { provide, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  tabs: {
    type: Array,
    required: true,
    // [{ id: string, label: string, disabled?: boolean }]
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'pills'].includes(value),
  },
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

// 현재 활성 탭
const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})

// 탭 활성화 함수를 하위 컴포넌트에 제공
const setActiveTab = (tabId) => {
  const tab = props.tabs.find((t) => t.id === tabId)
  if (tab && !tab.disabled) {
    activeTab.value = tabId
  }
}

// 현재 활성 탭 ID를 하위 컴포넌트에 제공
provide('tabsContext', {
  activeTab,
  setActiveTab,
  tabs: computed(() => props.tabs),
  variant: computed(() => props.variant),
})
</script>

<template>
  <div :class="cn('flex flex-col h-full w-full', props.class)">
    <slot />
  </div>
</template>
