<script setup>
/**
 * DataTable 페이지네이션 컴포넌트
 * 페이지 이동 및 페이지 크기 변경 기능 제공
 */
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/Input'
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
 * @param {string} value - 선택된 값
 */
function handlePageSizeChange(value) {
  const size = Number(value)
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
const selectedRows = computed(() => props.table.getFilteredSelectedRowModel().rows.length)

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

const pageSizeSelectOptions = computed(() =>
  props.pageSizeOptions.map((size) => ({
    value: String(size),
    label: `${size}개씩 보기`,
  })),
)

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
        'flex flex-col gap-3 border-t border-border bg-card px-4 py-4',
        'md:flex-row md:items-center md:justify-between',
        props.class,
      )
    "
  >
    <div class="flex flex-wrap items-center gap-2">
      <div class="inline-flex h-9 items-center rounded-full border border-border bg-muted/40 px-3 text-sm">
        <span class="text-muted-foreground">총</span>
        <span class="ml-1.5 font-semibold text-foreground">{{ totalRows }}</span>
        <span class="ml-1 text-muted-foreground">건</span>
      </div>
      <div class="inline-flex h-9 items-center rounded-full border border-border bg-background px-3 text-sm">
        <span class="text-muted-foreground">선택</span>
        <span class="ml-1.5 font-semibold text-foreground">{{ selectedRows }}</span>
        <span class="ml-1 text-muted-foreground">건</span>
      </div>
      <div class="inline-flex h-9 items-center rounded-full border border-border bg-background px-3 text-sm">
        <span class="font-medium text-foreground">{{ startRow }}-{{ endRow }}</span>
        <span class="ml-1.5 text-muted-foreground">표시</span>
      </div>
    </div>

    <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Rows</span>
        <Select
          :model-value="String(table.getState().pagination.pageSize)"
          :options="pageSizeSelectOptions"
          :allow-empty="false"
          placeholder=""
          class="min-w-[132px]"
          @change="handlePageSizeChange"
        />
      </div>

      <div class="flex items-center gap-3">
        <div class="text-sm text-muted-foreground">
          Page <span class="font-medium text-foreground">{{ currentPage + 1 }}</span> of
          <span class="font-medium text-foreground">{{ Math.max(pageCount, 1) }}</span>
        </div>

        <div class="flex items-center gap-1">
        <button
          type="button"
          :disabled="!table.getCanPreviousPage()"
          :class="
            cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background',
              'text-muted-foreground hover:bg-accent hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
              'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background',
              'text-muted-foreground hover:bg-accent hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )
          "
          @click="table.previousPage()"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>

        <template v-for="page in visiblePages" :key="page">
          <button
            type="button"
            :class="
              cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                page === currentPage
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground',
              )
            "
            @click="table.setPageIndex(page)"
          >
            {{ page + 1 }}
          </button>
        </template>

        <button
          type="button"
          :disabled="!table.getCanNextPage()"
          :class="
            cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background',
              'text-muted-foreground hover:bg-accent hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )
          "
          @click="table.nextPage()"
        >
          <ChevronRight class="h-4 w-4" />
        </button>

        <button
          type="button"
          :disabled="!table.getCanNextPage()"
          :class="
            cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background',
              'text-muted-foreground hover:bg-accent hover:text-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )
          "
          @click="table.lastPage()"
        >
          <ChevronsRight class="h-4 w-4" />
        </button>
        </div>
      </div>
    </div>
  </div>
</template>
