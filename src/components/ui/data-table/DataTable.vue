<script setup>
/**
 * DataTable 메인 컴포넌트
 * TanStack Vue Table 기반의 재사용 가능한 테이블
 *
 * @example
 * const columnHelper = createColumnHelper()
 * const columns = [
 *   columnHelper.accessor('name', { header: 'Name' }),
 *   columnHelper.accessor('status', { header: 'Status' }),
 * ]
 * const data = ref([...])
 * // 템플릿에서: <DataTable :columns="columns" :data="data" />
 */
import { ref, computed, useSlots } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  FlexRender,
} from '@tanstack/vue-table'
import { cn } from '@/lib/utils'
import DataTableCheckbox from './DataTableCheckbox.vue'
import DataTablePagination from './DataTablePagination.vue'

const slots = useSlots()

const props = defineProps({
  /** 컬럼 정의 (ColumnDef[]) */
  columns: {
    type: Array,
    required: true,
  },
  /** 테이블 데이터 */
  data: {
    type: [Array, Object], // Ref 또는 일반 배열
    required: true,
  },
  /** 행 선택 활성화 */
  enableRowSelection: {
    type: Boolean,
    default: true,
  },
  /** 정렬 활성화 */
  enableSorting: {
    type: Boolean,
    default: true,
  },
  /** 페이지네이션 활성화 */
  enablePagination: {
    type: Boolean,
    default: true,
  },
  /** 헤더 고정 */
  enableStickyHeader: {
    type: Boolean,
    default: true,
  },
  /** 페이지 크기 */
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 페이지 크기 옵션 */
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 30, 50],
  },
  /** 최대 높이 */
  maxHeight: {
    type: [String, Number],
    default: '350px',
  },
  /** 수동 페이지네이션 (서버 사이드) */
  manualPagination: {
    type: Boolean,
    default: false,
  },
  /** 수동 정렬 (서버 사이드) */
  manualSorting: {
    type: Boolean,
    default: false,
  },
  /** 전체 페이지 수 (manualPagination 시 필요) */
  pageCount: {
    type: Number,
    default: -1,
  },
  /** 전체 행 수 (manualPagination 시 필요) */
  rowCount: {
    type: Number,
    default: 0,
  },
  /** 추가 클래스 */
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits([
  'update:selectedRows',
  'update:sorting',
  'update:pagination',
])

// 선택된 행 상태
const rowSelection = ref({})

// 정렬 상태
const sorting = ref([])

// 페이지네이션 상태
const pagination = ref({
  pageIndex: 0,
  pageSize: props.pageSize,
})

const dataRef = computed(() => {
  return Array.isArray(props.data) ? props.data : props.data
})

/**
 * TanStack Table 인스턴스 생성
 */
const table = useVueTable({
  get data() {
    return dataRef.value
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.enableSorting ? getSortedRowModel() : undefined,
  getPaginationRowModel: props.enablePagination
    ? getPaginationRowModel()
    : undefined,
  getFilteredRowModel: getFilteredRowModel(),

  // 행 선택 설정
  enableRowSelection: props.enableRowSelection,

  // 상태 관리
  state: {
    get rowSelection() {
      return rowSelection.value
    },
    get sorting() {
      return sorting.value
    },
    get pagination() {
      return pagination.value
    },
  },

  // 상태 변경 핸들러
  onRowSelectionChange: (updater) => {
    rowSelection.value =
      typeof updater === 'function' ? updater(rowSelection.value) : updater
    emit('update:selectedRows', getSelectedRows())
  },
  onSortingChange: (updater) => {
    sorting.value =
      typeof updater === 'function' ? updater(sorting.value) : updater
    emit('update:sorting', sorting.value)
  },
  onPaginationChange: (updater) => {
    pagination.value =
      typeof updater === 'function' ? updater(pagination.value) : updater
    emit('update:pagination', {
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
    })
  },

  // 수동 모드 설정
  manualPagination: props.manualPagination,
  manualSorting: props.manualSorting,

  // 수동 페이지네이션 시 페이지 수 설정
  ...(props.manualPagination && props.pageCount > 0 && {
    pageCount: props.pageCount,
  }),
  ...(props.manualPagination && props.rowCount > 0 && {
    rowCount: props.rowCount,
  }),
})

/**
 * 선택된 행 데이터 가져오기
 */
function getSelectedRows() {
  return table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original)
}

/**
 * 전체 선택 토글
 */
function toggleAllRows() {
  table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
}

/**
 * 특정 행 선택 토글
 */
function toggleRow(row) {
  row.toggleSelected()
}

const maxHeightStyle = computed(() => {
  if (typeof props.maxHeight === 'number') {
    return `${props.maxHeight}px`
  }
  return props.maxHeight
})

const hasRows = computed(() => table.getRowModel().rows.length > 0)
const columnSpan = computed(() => props.columns.length + (props.enableRowSelection ? 1 : 0))
const hasToolbar = computed(() => Boolean(slots.toolbar))

// 외부에서 접근 가능한 메서드 노출
defineExpose({
  table,
  getSelectedRows,
  resetRowSelection: () => {
    rowSelection.value = {}
  },
  resetSorting: () => {
    sorting.value = []
  },
  resetPagination: () => {
    pagination.value = { pageIndex: 0, pageSize: props.pageSize }
  },
})
</script>

<template>
  <div :class="cn('space-y-4', props.class)">
    <div
      v-if="hasToolbar"
      class="flex flex-col gap-3 rounded-lg border border-slate-300 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <slot name="toolbar" :table="table" :selected-rows="getSelectedRows()" />
    </div>

    <div
      :class="
        cn(
          'overflow-hidden rounded-lg border border-slate-300 bg-card shadow-sm',
          enableStickyHeader && 'overflow-hidden',
        )
      "
    >
      <div
        :class="cn(enableStickyHeader && 'overflow-auto')"
        :style="enableStickyHeader ? { maxHeight: maxHeightStyle } : undefined"
      >
        <table class="w-full border-collapse">
          <thead
            :class="
              cn(
                'bg-muted/50',
                enableStickyHeader && 'sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-muted/45',
              )
            "
          >
            <template v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <tr>
                <th
                  v-if="enableRowSelection"
                  :class="
                    cn(
                      'h-12 w-12 px-3 text-center align-middle',
                      'border-b border-slate-300',
                    )
                  "
                >
                  <DataTableCheckbox
                    :checked="
                      table.getIsAllRowsSelected()
                        ? true
                        : table.getIsSomeRowsSelected()
                          ? 'indeterminate'
                          : false
                    "
                    @update:checked="toggleAllRows"
                  />
                </th>

                <!-- 데이터 컬럼 헤더 -->
                <th
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :class="
                    cn(
                      'h-12 px-4 text-left align-middle text-xs font-semibold tracking-[0.02em] text-foreground',
                      'border-b border-slate-300',
                      header.column.getCanSort() && 'cursor-pointer select-none',
                    )
                  "
                  :style="{
                    width: header.column.getSize() !== 150
                      ? `${header.column.getSize()}px`
                      : undefined,
                  }"
                >
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </th>
              </tr>
            </template>
          </thead>

          <tbody>
            <template v-if="hasRows">
              <template
                v-for="(row, index) in table.getRowModel().rows"
                :key="row.id"
              >
                <tr
                  :class="
                    cn(
                      'border-b border-slate-300',
                      'transition-colors hover:bg-muted/35',
                      index === table.getRowModel().rows.length - 1 && 'border-b-0',
                      row.getIsSelected() && 'bg-muted/50',
                      'transition-colors',
                    )
                  "
                >
                  <td
                    v-if="enableRowSelection"
                    :class="cn('w-12 px-3 py-3 text-center align-middle')"
                  >
                    <DataTableCheckbox
                      :checked="row.getIsSelected()"
                      :disabled="!row.getCanSelect()"
                      @update:checked="toggleRow(row)"
                    />
                  </td>

                  <td
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    :class="cn('px-4 py-3 align-middle text-sm text-foreground')"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </td>
                </tr>
              </template>
            </template>

            <tr v-else>
              <td
                :colspan="columnSpan"
                :class="cn('px-6 py-14 text-center')"
              >
                <slot name="empty">
                  <div class="mx-auto flex max-w-sm flex-col items-center gap-2">
                    <p class="text-sm font-medium text-foreground">데이터가 없습니다.</p>
                    <p class="text-sm text-muted-foreground">
                      현재 조건에 맞는 결과가 없어 표시할 행이 없습니다.
                    </p>
                  </div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <DataTablePagination
      v-if="enablePagination"
      :table="table"
      :page-size-options="pageSizeOptions"
    />
  </div>
</template>
