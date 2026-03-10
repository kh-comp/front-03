<script setup>
  /**
   * TabList 컴포넌트
   * 탭 버튼 목록 컨테이너
   */
  import { cn } from '@/lib/utils'
  import { inject, computed } from 'vue'

  const props = defineProps({
    class: {
      type: String,
      default: '',
    },
  })

  // Tabs 컨텍스트 주입
  const tabsContext = inject('tabsContext')
  const { variant } = tabsContext

  // 리스트 클래스 계산
  const listClass = computed(() => {
    const baseClass = 'inline-flex items-center'

    if (variant.value === 'pills') {
      return cn(baseClass, 'gap-2 p-1 bg-tabs-bg rounded-lg', props.class)
    }

    return cn('flex w-full items-center justify-start gap-1 pb-2.5', props.class)
  })
</script>

<template>
  <div role="tablist" :class="listClass">
    <slot />
  </div>
</template>
