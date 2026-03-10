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

    const validKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!validKeys.includes(event.key)) return

    event.preventDefault()

    const currentTabs = tabs.value
    const len = currentTabs.length
    const currentIndex = currentTabs.findIndex((t) => t.id === props.tabId)

    const step = event.key === 'ArrowLeft' || event.key === 'End' ? -1 : 1
    let searchIndex = currentIndex

    if (event.key === 'Home') searchIndex = -1
    else if (event.key === 'End') searchIndex = len

    let nextIndex = searchIndex

    // 최대 탭 개수만큼 순회하며 활성화된 다음 탭 찾기
    for (let i = 0; i < len; i++) {
      nextIndex = (nextIndex + step + len) % len
      if (!currentTabs[nextIndex]?.disabled) break
    }

    // 다음 탭이 유효하고 현재 탭과 다를 때만 탭 전환
    if (nextIndex !== currentIndex && !currentTabs[nextIndex]?.disabled) {
      const nextTabId = currentTabs[nextIndex].id
      setActiveTab(nextTabId)

      // 포커스 이동
      const button = event.target.parentElement?.querySelector(`[data-tab-id="${nextTabId}"]`)
      button?.focus()
    }
  }

  // 버튼 클래스 계산
  const buttonClass = computed(() => {
    const baseClass =
      'inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

    if (variant.value === 'pills') {
      return cn(
        baseClass,
        'px-4 py-2 font-medium rounded-md',
        isActive.value && 'bg-tabs-active-bg text-tabs-active-text',
        !isActive.value && 'text-tabs-inactive-text hover:text-foreground',
        isDisabled.value && 'cursor-not-allowed opacity-50',
        props.class,
      )
    }

    return cn(
      baseClass,
      'h-[30px] min-w-[120px] rounded-t-[4px] px-2.5 font-medium border',
      isActive.value && 'bg-tabs-active-bg text-tabs-active-text border-transparent',
      !isActive.value &&
        'bg-tabs-bg border-tabs-border text-tabs-inactive-text hover:text-foreground hover:bg-slate-200',
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
