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
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <AppHeader />

    <!-- 사이드바 -->
    <AppSidebar />

    <!-- 메인 콘텐츠 영역 -->
    <main
      :class="
        cn(
          'pt-[60px] min-h-screen',
          'transition-all duration-300 ease-in-out',
          isOpen ? 'ml-[240px]' : 'ml-0'
        )
      "
    >
      <div class="p-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>
