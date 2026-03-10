<script setup>
/**
 * 홈 화면
 * 대한항공 사내시스템 메인 대시보드
 */
import { cn } from '@/lib/utils'
</script>

<template>
  <div class="space-y-6">
    <!-- 페이지 타이틀 -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-foreground">대시보드</h1>
    </div>

    <!-- 임시 콘텐츠 -->
    <div
      :class="
        cn(
          'p-8 rounded-lg border border-border bg-card',
          'text-center text-muted-foreground'
        )
      "
    >
      <p class="text-lg">대한항공 차세대 친환경 항공기 엔진 정비기반 시스템</p>
      <p class="mt-2 text-sm">메뉴를 선택하여 업무를 시작하세요.</p>
    </div>
  </div>
</template>

<style scoped></style>
