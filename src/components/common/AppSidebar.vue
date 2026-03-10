<script setup>
  /**
   * 사이드바 컴포넌트
   * 대한항공 사내시스템 LNB (Left Navigation Bar)
   * publish-sample/web/common.html 기반 재작성
   */
  import { cn } from '@/lib/utils'
  import { useSidebar } from '@/composables/useSidebar'
  import { MENU_ITEMS } from '@/constants/menu'
  import SidebarMenuItem from './SidebarMenuItem.vue'

  const { isOpen, toggle } = useSidebar()
</script>

<template>
  <!-- 사이드바 컨테이너 -->
  <aside
    :class="
      cn(
        'fixed top-[60px] left-0 z-40',
        'h-[calc(100vh-60px)]',
        'bg-lnb-bg',
        'transition-transform duration-300 ease-out',
        isOpen ? 'translate-x-0' : '-translate-x-[240px]',
      )
    "
    style="width: 240px"
  >
    <!-- 메뉴 영역 -->
    <nav class="h-full overflow-x-hidden overflow-y-auto p-4">
      <div class="lnb-menu">
        <ul class="w-full">
          <SidebarMenuItem v-for="menu in MENU_ITEMS" :key="menu.id" :menu="menu" />
        </ul>
      </div>
    </nav>

    <!-- 토글 버튼 (우측 외부 상단) -->
    <button
      type="button"
      :class="
        cn(
          'absolute top-0 -right-5',
          'h-[75px] w-5',
          'bg-lnb-toggle-bg',
          'rounded-r-lg',
          'flex items-center justify-center',
          'hover:bg-lnb-toggle-bg/90',
          'transition-colors',
        )
      "
      :title="isOpen ? '사이드바 닫기' : '사이드바 열기'"
      @click="toggle"
    >
      <!-- 열림 상태 아이콘 (왼쪽 화살표) -->
      <svg
        v-if="isOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-white"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <!-- 닫힘 상태 아이콘 (오른쪽 화살표) -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-white"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </aside>
</template>

<style scoped>
  /* 커스텀 스크롤바 */
  nav::-webkit-scrollbar {
    width: 6px;
  }

  nav::-webkit-scrollbar-track {
    background: transparent;
  }

  nav::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  nav::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
</style>
