<script setup>
/**
 * 샘플 페이지 2
 * 검색 영역 컴포넌트 예제
 */
import { ref, reactive } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { cn } from '@/lib/utils'

// 공통 컴포넌트
import PageHeader from '@/components/common/PageHeader.vue'
import SearchSection from '@/components/common/SearchSection.vue'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { Button } from '@/components/ui/Button'
import { Search, RotateCcw } from 'lucide-vue-next'

// 상수
import { ENGINE_UC_SEARCH_FIELDS } from '@/constants/search-fields'

// 컬럼 헬퍼
const columnHelper = createColumnHelper()

// 테이블 컬럼 정의
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('revision', {
    header: 'Revision',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => info.getValue(),
    size: 80,
  }),
  columnHelper.accessor('startDate', {
    header: 'Start Date',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('endDate', {
    header: 'End Date',
    cell: (info) => info.getValue(),
    size: 120,
  }),
]

// 샘플 테이블 데이터
const tableData = ref([
  {
    id: 1,
    name: 'UC-001',
    revision: 'A',
    description: 'Engine Unit Configuration 1',
    status: 'Active',
    priority: 'High',
    startDate: '2024/01/15',
    endDate: '2024/06/30',
  },
  {
    id: 2,
    name: 'UC-002',
    revision: 'B',
    description: 'Engine Unit Configuration 2',
    status: 'Active',
    priority: 'Medium',
    startDate: '2024/02/01',
    endDate: '2024/07/31',
  },
  {
    id: 3,
    name: 'UC-003',
    revision: 'A',
    description: 'Engine Unit Configuration 3',
    status: 'Inactive',
    priority: 'Low',
    startDate: '2024/03/01',
    endDate: '2024/08/31',
  },
  {
    id: 4,
    name: 'UC-004',
    revision: 'C',
    description: 'Engine Unit Configuration 4',
    status: 'Active',
    priority: 'High',
    startDate: '2024/01/20',
    endDate: '2024/12/31',
  },
  {
    id: 5,
    name: 'UC-005',
    revision: 'A',
    description: 'Engine Unit Configuration 5',
    status: 'Active',
    priority: 'Medium',
    startDate: '2024/04/01',
    endDate: '2024/09/30',
  },
  {
    id: 6,
    name: 'UC-006',
    revision: 'B',
    description: 'Engine Unit Configuration 6',
    status: 'Inactive',
    priority: 'Low',
    startDate: '2024/05/01',
    endDate: '2024/10/31',
  },
  {
    id: 7,
    name: 'UC-007',
    revision: 'A',
    description: 'Engine Unit Configuration 7',
    status: 'Active',
    priority: 'High',
    startDate: '2024/06/01',
    endDate: '2024/11/30',
  },
  {
    id: 8,
    name: 'UC-008',
    revision: 'C',
    description: 'Engine Unit Configuration 8',
    status: 'Active',
    priority: 'Medium',
    startDate: '2024/07/01',
    endDate: '2024/12/31',
  },
])

// 검색 조건
const searchParams = reactive({
  ucName: '',
  item: '',
  instanceNumber: '',
  serialNumber: '',
  lotNumber: '',
  ucStatus: '',
  mcName: '',
  mcStatus: '',
  searchFor: '',
  mcRevision: '',
})

// 로딩 상태
const searchLoading = ref(false)

// 검색 실행
const handleSearch = async () => {
  console.log('검색 실행:', searchParams)
  searchLoading.value = true

  try {
    // API 호출 로직
    // const result = await api.searchEngineUc(searchParams)
    // tableData.value = result.data
  } catch (error) {
    console.error('검색 오류:', error)
  } finally {
    searchLoading.value = false
  }
}

// 검색 초기화
const handleReset = () => {
  console.log('검색 초기화')
  Object.assign(searchParams, {
    ucName: '',
    item: '',
    instanceNumber: '',
    serialNumber: '',
    lotNumber: '',
    ucStatus: '',
    mcName: '',
    mcStatus: '',
    searchFor: '',
    mcRevision: '',
  })
}
</script>

<template>
  <div
    :class="
      cn(
        'box-border flex h-[calc(100vh-60px)] flex-col overflow-hidden',
        'bg-slate-100 p-5 dark:bg-slate-900',
      )
    "
  >
    <!-- 페이지 헤더 -->
    <PageHeader title="샘플 페이지 2" class="shrink-0">
      <template #actions-right>
        <Button variant="default" :loading="searchLoading" @click="handleSearch">
          <Search class="h-4 w-4" />
          조회
        </Button>
        <Button variant="outline" @click="handleReset">
          <RotateCcw class="h-4 w-4" />
          초기화
        </Button>
      </template>
    </PageHeader>

    <!-- 메인 컨텐츠 (하나의 큰 컨테이너) -->
    <div
      :class="
        cn(
          'flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg p-4',
          'border border-slate-200 bg-white shadow-sm',
          'dark:border-slate-700 dark:bg-slate-800',
        )
      "
    >
      <!-- 검색 영역 -->
      <SearchSection
        v-model="searchParams"
        :fields="ENGINE_UC_SEARCH_FIELDS"
        :columns="5"
        :show-buttons="false"
        class="shrink-0 border-b border-slate-200 dark:border-slate-700"
      />

      <!-- 결과 영역 -->
      <div class="flex min-h-0 flex-1 flex-col mt-4">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Alternate Subconfigurations
          </h3>
          <!-- 추가 액션 버튼 영역 -->
          <div class="flex items-center gap-2">
            <select
              class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              <option>select A</option>
              <option>select B</option>
              <option>select C</option>
              <option>select D</option>
            </select>
            <button
              class="inline-flex h-9 items-center gap-1.5 rounded-md border border-brand bg-white px-3 text-sm font-semibold text-brand hover:bg-brand-light dark:border-brand-accent dark:bg-slate-700 dark:text-brand-accent"
            >
              실행
            </button>
          </div>
        </div>

        <!-- 테이블 영역 -->
        <DataTable
          :columns="columns"
          :data="tableData"
          :enable-row-selection="true"
          :enable-pagination="true"
          :page-size="10"
          max-height="400px"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>
