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
import { ref, computed, toRef, watch } from 'vue'
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
import DataTableHeader from './DataTableHeader.vue'
import DataTablePagination from './DataTablePagination.vue'

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

// 데이터를 reactive로 변환
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

// 최대 높이 스타일 계산
const maxHeightStyle = computed(() => {
  if (typeof props.maxHeight === 'number') {
    return `${props.maxHeight}px`
  }
  return props.maxHeight
})

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
  <div :class="cn('w-full', props.class)">
    <!-- 테이블 컨테이너 -->
    <div
      :class="
        cn(
          'rounded-md border border-table-border bg-table-bg',
          enableStickyHeader && 'overflow-hidden',
        )
      "
    >
      <!-- 스크롤 영역 -->
      <div
        :class="cn(enableStickyHeader && 'overflow-auto')"
        :style="enableStickyHeader ? { maxHeight: maxHeightStyle } : undefined"
      >
        <table class="w-full border-collapse">
          <!-- 테이블 헤더 -->
          <thead
            :class="
              cn(
                'border-t-2 border-t-table-border-top',
                'bg-table-header-bg',
                enableStickyHeader && 'sticky top-0 z-10',
              )
            "
          >
            <template v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <tr>
                <!-- 체크박스 컬럼 (행 선택 활성화 시) -->
                <th
                  v-if="enableRowSelection"
                  :class="
                    cn(
                      'w-12 px-3 py-3 text-center',
                      'border-b border-table-border',
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
                      'px-4 py-3 text-left text-sm font-medium',
                      'text-foreground',
                      'border-b border-table-border',
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

          <!-- 테이블 바디 -->
          <tbody>
            <template v-if="table.getRowModel().rows.length > 0">
              <template
                v-for="(row, index) in table.getRowModel().rows"
                :key="row.id"
              >
                <tr
                  :class="
                    cn(
                      'border-b border-table-border',
                      'hover:bg-table-row-hover',
                      'transition-colors',
                      row.getIsSelected() && 'bg-table-row-selected',
                    )
                  "
                >
                  <!-- 체크박스 셀 -->
                  <td
                    v-if="enableRowSelection"
                    :class="cn('w-12 px-3 py-3 text-center')"
                  >
                    <DataTableCheckbox
                      :checked="row.getIsSelected()"
                      :disabled="!row.getCanSelect()"
                      @update:checked="toggleRow(row)"
                    />
                  </td>

                  <!-- 데이터 셀 -->
                  <td
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    :class="cn('px-4 py-3 text-sm text-foreground')"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </td>
                </tr>
              </template>
            </template>

            <!-- 데이터 없음 표시 -->
            <tr v-else>
              <td
                :colspan="columns.length + (enableRowSelection ? 1 : 0)"
                :class="cn('px-4 py-8 text-center text-muted-foreground')"
              >
                데이터가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <DataTablePagination
      v-if="enablePagination"
      :table="table"
      :page-size-options="pageSizeOptions"
    />
  </div>
</template>
