<script setup>
  /**
   * 헤더 컴포넌트
   * 대한항공 사내시스템 상단 헤더
   */
  import { cn } from '@/lib/utils'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Home, HelpCircle, Bell, LogOut } from 'lucide-vue-next'
  import logoImage from '@/assets/images/common/logo__koreanair.svg'

  const router = useRouter()
  const searchQuery = ref('')

  // 사용자 정보 (추후 스토어에서 가져오도록 수정)
  const userName = ref('관리자')

  /**
   * 검색 처리
   */
  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      console.log('검색어:', searchQuery.value)
      // 검색 로직 구현
    }
  }

  /**
   * 로그아웃 처리
   */
  const handleLogout = () => {
    // 로그아웃 로직 구현
    router.push('/login')
  }
</script>

<template>
  <header
    :class="
      cn(
        'fixed top-0 right-0 left-0 z-50',
        'bg-header-bg h-[60px]',
        'shadow-[0px_2px_3px_1px_rgba(0,0,0,0.1)]',
        'flex items-center justify-between px-3',
      )
    "
  >
    <!-- 좌측: 로고 + 검색창 -->
    <div class="flex items-center gap-3">
      <!-- 로고 (사이드바 너비 240px와 동일) -->
      <RouterLink to="/" class="flex w-[240px] shrink-0 items-center">
        <img :src="logoImage" alt="대한항공" class="h-10" />
      </RouterLink>

      <!-- 검색창 -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="검색어를 입력하세요"
          :class="
            cn(
              'h-9 w-64 px-4 pr-10',
              'border-search-border rounded-md border bg-white',
              'text-header-text placeholder:text-header-text/50 text-sm',
              'focus:ring-primary/20 focus:ring-2 focus:outline-none',
              'transition-shadow',
            )
          "
          @keyup.enter="handleSearch"
        />
        <button
          type="button"
          class="text-header-text/60 hover:text-header-text absolute top-1/2 right-3 -translate-y-1/2"
          @click="handleSearch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 우측: 메뉴 -->
    <nav>
      <ul class="flex items-center gap-1">
        <!-- HOME -->
        <li>
          <RouterLink
            to="/"
            :class="
              cn(
                'flex items-center gap-1.5 rounded-md px-3 py-2',
                'text-header-text text-sm',
                'hover:bg-header-hover-bg transition-colors',
              )
            "
          >
            <Home class="h-4 w-4" />
            <span>HOME</span>
          </RouterLink>
        </li>

        <!-- 도움말 -->
        <li>
          <button
            type="button"
            :class="
              cn(
                'flex items-center gap-1.5 rounded-md px-3 py-2',
                'text-header-text text-sm',
                'hover:bg-header-hover-bg transition-colors',
              )
            "
          >
            <HelpCircle class="h-4 w-4" />
            <span>도움말</span>
          </button>
        </li>

        <!-- 알림 -->
        <li>
          <button
            type="button"
            :class="
              cn(
                'relative flex items-center gap-1.5 rounded-md px-3 py-2',
                'text-header-text text-sm',
                'hover:bg-header-hover-bg transition-colors',
              )
            "
          >
            <Bell class="h-4 w-4" />
            <span>알림</span>
            <!-- 알림 배지 -->
            <span class="bg-destructive absolute top-1 right-1 h-2 w-2 rounded-full"></span>
          </button>
        </li>

        <!-- 구분선 -->
        <li class="bg-border mx-2 h-6 w-px"></li>

        <!-- 사용자명 -->
        <li>
          <span class="text-header-text px-2 text-sm">
            <span class="font-medium">{{ userName }}</span
            >님
          </span>
        </li>

        <!-- 로그아웃 -->
        <li>
          <button
            type="button"
            :class="
              cn(
                'flex items-center gap-1.5 rounded-md px-3 py-2',
                'text-header-text text-sm',
                'hover:bg-header-hover-bg transition-colors',
              )
            "
            @click="handleLogout"
          >
            <LogOut class="h-4 w-4" />
            <span>로그아웃</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
