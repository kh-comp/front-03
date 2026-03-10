<script setup>
/**
 * 로그인 페이지
 * 대한항공 사내시스템 로그인
 */
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn } from 'lucide-vue-next'

const router = useRouter()

const userId = ref('')
const password = ref('')
const isLoading = ref(false)

/**
 * 로그인 처리
 */
const handleLogin = async () => {
  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 입력하세요.')
    return
  }

  isLoading.value = true

  try {
    // TODO: 실제 로그인 API 연동
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/')
  } catch (error) {
    alert('로그인에 실패했습니다.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    :class="
      cn(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-primary/5 to-primary/10'
      )
    "
  >
    <div
      :class="
        cn(
          'w-full max-w-md p-8',
          'bg-card rounded-xl shadow-lg',
          'border border-border'
        )
      "
    >
      <!-- 로고 및 타이틀 -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-foreground">대한항공</h1>
        <p class="mt-2 text-sm text-muted-foreground">
          차세대 친환경 항공기 엔진 정비기반 시스템
        </p>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label
            for="userId"
            class="block text-sm font-medium text-foreground mb-1.5"
          >
            아이디
          </label>
          <input
            id="userId"
            v-model="userId"
            type="text"
            placeholder="아이디를 입력하세요"
            :class="
              cn(
                'w-full h-10 px-3',
                'bg-background border border-input rounded-md',
                'text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring',
                'transition-shadow'
              )
            "
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-foreground mb-1.5"
          >
            비밀번호
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            :class="
              cn(
                'w-full h-10 px-3',
                'bg-background border border-input rounded-md',
                'text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring',
                'transition-shadow'
              )
            "
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          :class="
            cn(
              'w-full h-10 mt-6',
              'bg-primary text-primary-foreground rounded-md',
              'font-medium text-sm',
              'hover:bg-primary/90 active:bg-primary/80',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-colors',
              'flex items-center justify-center gap-2'
            )
          "
        >
          <LogIn v-if="!isLoading" class="w-4 h-4" />
          <span>{{ isLoading ? '로그인 중...' : '로그인' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>
