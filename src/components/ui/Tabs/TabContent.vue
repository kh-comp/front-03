<script setup>
/**
 * TabContent 컴포넌트
 * 탭 패널 콘텐츠
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

// Tabs 컨텍스트 주입
const tabsContext = inject('tabsContext')
const { activeTab } = tabsContext

// 표시 여부
const isVisible = computed(() => activeTab.value === props.tabId)
</script>

<template>
  <div
    v-show="isVisible"
    :id="`tabpanel-${tabId}`"
    role="tabpanel"
    :aria-labelledby="`tab-${tabId}`"
    :tabindex="0"
    :class="cn('flex-1 overflow-y-auto focus-visible:outline-none', props.class)"
  >
    <slot v-if="isVisible" />
  </div>
</template>
