<script setup>
/**
 * DataTable 정렬 가능한 헤더 컴포넌트
 * 클릭 시 정렬 상태 토글 (오름차순 ↔ 내림차순 ↔ 정렬 없음)
 */
import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-vue-next'

const props = defineProps({
  /** 컬럼 객체 (TanStack Table Column) */
  column: {
    type: Object,
    required: true,
  },
  /** 헤더 제목 */
  title: {
    type: String,
    required: true,
  },
  /** 정렬 활성화 여부 */
  sortable: {
    type: Boolean,
    default: true,
  },
  /** 추가 클래스 */
  class: {
    type: String,
    default: '',
  },
})

/**
 * 정렬 상태 토글
 */
function handleSort() {
  if (!props.sortable) return
  props.column.toggleSorting(undefined, false)
}

/**
 * 현재 정렬 방향 가져오기
 */
function getSortDirection() {
  return props.column.getIsSorted()
}
</script>

<template>
  <button
    v-if="sortable"
    type="button"
    :class="
      cn(
        '-ml-4 flex items-center gap-2 px-4 py-2',
        'hover:text-foreground/80 transition-colors',
        'text-left w-full',
        props.class,
      )
    "
    @click="handleSort"
  >
    <span>{{ title }}</span>
    <!-- 정렬 아이콘 -->
    <span class="ml-auto">
      <ArrowUp
        v-if="getSortDirection() === 'asc'"
        class="h-4 w-4 text-foreground"
      />
      <ArrowDown
        v-else-if="getSortDirection() === 'desc'"
        class="h-4 w-4 text-foreground"
      />
      <ArrowUpDown v-else class="h-4 w-4 text-muted-foreground" />
    </span>
  </button>

  <!-- 정렬 불가능한 헤더 -->
  <div
    v-else
    :class="cn('px-4 py-2 text-left', props.class)"
  >
    {{ title }}
  </div>
</template>
