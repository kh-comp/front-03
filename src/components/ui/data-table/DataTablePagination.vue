<script setup>
/**
 * DataTable 페이지네이션 컴포넌트
 * 페이지 이동 및 페이지 크기 변경 기능 제공
 */
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-vue-next'

const props = defineProps({
  /** TanStack Table 인스턴스 */
  table: {
    type: Object,
    required: true,
  },
  /** 페이지 크기 옵션 */
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 30, 50],
  },
  /** 추가 클래스 */
  class: {
    type: String,
    default: '',
  },
})

/**
 * 페이지 크기 변경
 * @param {Event} e - 이벤트 객체
 */
function handlePageSizeChange(e) {
  const size = Number(e.target.value)
  props.table.setPageSize(size)
}

/**
 * 현재 페이지 (0-based)
 */
const currentPage = computed(() => props.table.getState().pagination.pageIndex)

/**
 * 전체 페이지 수
 */
const pageCount = computed(() => props.table.getPageCount())

/**
 * 전체 행 수
 */
const totalRows = computed(() => props.table.getFilteredRowModel().rows.length)

/**
 * 현재 페이지의 시작 행 번호 (1-based)
 */
const startRow = computed(() => currentPage.value * props.table.getState().pagination.pageSize + 1)

/**
 * 현재 페이지의 끝 행 번호
 */
const endRow = computed(() => {
  const pageSize = props.table.getState().pagination.pageSize
  const end = (currentPage.value + 1) * pageSize
  return end > totalRows.value ? totalRows.value : end
})

/**
 * 페이지 번호 배열 생성
 */
const visiblePages = computed(() => {
  const pages = []
  const total = pageCount.value
  const current = currentPage.value

  // 최대 5개의 페이지 버튼 표시
  let start = Math.max(0, current - 2)
  const end = Math.min(total - 1, start + 4)

  // 끝이 5개 미만이면 시작점 조정
  if (end - start < 4) {
    start = Math.max(0, end - 4)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-between px-2 py-3',
        'bg-pagination-bg border-t border-pagination-border',
        props.class,
      )
    "
  >
    <!-- 왼쪽: 행 개수 정보 -->
    <div class="flex items-center gap-2 text-sm text-pagination-text">
      <span>총 {{ totalRows }}건</span>
      <span class="text-muted-foreground">|</span>
      <span>{{ startRow }}-{{ endRow }}</span>
    </div>

    <!-- 오른쪽: 페이지네이션 컨트롤 -->
    <div class="flex items-center gap-4">
      <!-- 페이지 크기 선택 -->
      <div class="flex items-center gap-2">
        <select
          :value="table.getState().pagination.pageSize"
          class="h-8 rounded-md border border-pagination-border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          @change="handlePageSizeChange"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}개씩 보기
          </option>
        </select>
      </div>

      <!-- 페이지 번호 버튼 -->
      <div class="flex items-center gap-1">
        <!-- 처음으로 -->
        <button
          type="button"
          :disabled="!table.getCanPreviousPage()"
          :class="
            cn(
              'flex h-8 w-8 items-center justify-center rounded-md',
              'text-pagination-text hover:bg-pagination-hover-bg',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors',
            )
          "
          @click="table.firstPage()"
        >
          <ChevronsLeft class="h-4 w-4" />
        </button>

        <!-- 이전 -->
        <button
          type="button"
          :disabled="!table.getCanPreviousPage()"
          :class="
            cn(
              'flex h-8 w-8 items-center justify-center rounded-md',
              'text-pagination-text hover:bg-pagination-hover-bg',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors',
            )
          "
          @click="table.previousPage()"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>

        <!-- 페이지 번호 -->
        <template v-for="page in visiblePages" :key="page">
          <button
            type="button"
            :class="
              cn(
                'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium',
                'transition-colors',
                page === currentPage
                  ? 'bg-pagination-active-bg text-pagination-active-text'
                  : 'text-pagination-text hover:bg-pagination-hover-bg',
              )
            "
            @click="table.setPageIndex(page)"
          >
            {{ page + 1 }}
          </button>
        </template>

        <!-- 다음 -->
        <button
          type="button"
          :disabled="!table.getCanNextPage()"
          :class="
            cn(
              'flex h-8 w-8 items-center justify-center rounded-md',
              'text-pagination-text hover:bg-pagination-hover-bg',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors',
            )
          "
          @click="table.nextPage()"
        >
          <ChevronRight class="h-4 w-4" />
        </button>

        <!-- 마지막으로 -->
        <button
          type="button"
          :disabled="!table.getCanNextPage()"
          :class="
            cn(
              'flex h-8 w-8 items-center justify-center rounded-md',
              'text-pagination-text hover:bg-pagination-hover-bg',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors',
            )
          "
          @click="table.lastPage()"
        >
          <ChevronsRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
