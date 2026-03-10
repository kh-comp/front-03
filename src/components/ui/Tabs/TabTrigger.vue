<script setup>
/**
 * TabTrigger 컴포넌트
 * 개별 탭 버튼
 */
import { cn } from '@/lib/utils'
import { inject, computed } from 'vue'

const props = defineProps({
  tabId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

// Tabs 컨텍스트 주입
const tabsContext = inject('tabsContext')
const { activeTab, setActiveTab, tabs, variant } = tabsContext

// 현재 탭 정보
const tab = computed(() => tabs.value.find((t) => t.id === props.tabId))

// 활성 상태 여부
const isActive = computed(() => activeTab.value === props.tabId)

// 비활성화 여부
const isDisabled = computed(() => tab.value?.disabled)

// 클릭 핸들러
const handleClick = () => {
  if (!isDisabled.value) {
    setActiveTab(props.tabId)
    emit('click', props.tabId)
  }
}

// 키보드 이벤트 핸들러
const handleKeydown = (event) => {
  if (isDisabled.value) return

  const currentIndex = tabs.value.findIndex((t) => t.id === props.tabId)
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.value.length - 1
      break
    case 'ArrowRight':
      newIndex = currentIndex < tabs.value.length - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      newIndex = 0
      break
    case 'End':
      newIndex = tabs.value.length - 1
      break
    default:
      return
  }

  // 비활성화된 탭 건너뛰기
  while (tabs.value[newIndex]?.disabled) {
    if (event.key === 'ArrowRight' || event.key === 'Home') {
      newIndex = newIndex < tabs.value.length - 1 ? newIndex + 1 : 0
    } else {
      newIndex = newIndex > 0 ? newIndex - 1 : tabs.value.length - 1
    }
  }

  event.preventDefault()
  setActiveTab(tabs.value[newIndex].id)

  // 포커스 이동
  const button = event.target.parentElement?.querySelector(
    `[data-tab-id="${tabs.value[newIndex].id}"]`,
  )
  button?.focus()
}

// 버튼 클래스 계산
const buttonClass = computed(() => {
  const baseClass =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

  if (variant.value === 'pills') {
    return cn(
      baseClass,
      'rounded-md',
      isActive.value && 'bg-tabs-active-bg text-tabs-active-text',
      !isActive.value && 'text-tabs-inactive-text hover:text-foreground',
      isDisabled.value && 'cursor-not-allowed opacity-50',
      props.class,
    )
  }

  return cn(
    baseClass,
    '-mb-px border-b-2',
    isActive.value && 'border-tabs-active-bg text-primary bg-transparent',
    !isActive.value && 'border-transparent text-tabs-inactive-text hover:text-foreground hover:border-muted',
    isDisabled.value && 'cursor-not-allowed opacity-50',
    props.class,
  )
})
</script>

<template>
  <button
    role="tab"
    :aria-selected="isActive"
    :aria-controls="`tabpanel-${tabId}`"
    :tabindex="isActive ? 0 : -1"
    :disabled="isDisabled"
    :data-tab-id="tabId"
    :class="buttonClass"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot>{{ tab?.label }}</slot>
  </button>
</template>
