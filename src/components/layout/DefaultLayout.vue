<script setup>
/**
 * 기본 레이아웃 컴포넌트
 * 헤더 + 사이드바 + 메인 콘텐츠 구조
 */
import { cn } from '@/lib/utils'
import { useSidebar } from '@/composables/useSidebar'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'

const { isOpen } = useSidebar()
</script>

<template>
  <div class="h-screen bg-background overflow-hidden">
    <!-- 헤더: fixed로 상단 고정 -->
    <AppHeader />

    <!-- 사이드바 -->
    <AppSidebar />

    <!-- 메인 콘텐츠 영역: 헤더 높이(60px)만큼 아래로 이동, 높이는 헤더 제외 -->
    <main
      :class="
        cn(
          'mt-[60px] h-[calc(100vh-60px)] overflow-hidden',
          'transition-all duration-300 ease-in-out',
          isOpen ? 'ml-[240px]' : 'ml-0'
        )
      "
    >
      <RouterView />
    </main>
  </div>
</template>
