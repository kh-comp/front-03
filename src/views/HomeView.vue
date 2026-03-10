<script setup>
/**
 * 홈 화면
 * 대한항공 사내시스템 메인 대시보드
 */
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { createColumnHelper } from '@tanstack/vue-table'
import { DataTable } from '@/components/ui/data-table'

// 컬럼 헬퍼 생성
const columnHelper = createColumnHelper()

// 컬럼 정의
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('revision', {
    header: 'Revision',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('startDate', {
    header: 'Start Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('endDate', {
    header: 'End Date',
    cell: (info) => info.getValue(),
  }),
]

// 샘플 데이터
const tableData = ref([
  {
    id: 1,
    name: 'Engine-A001',
    revision: 'Rev 1.0',
    description: '메인 엔진 어셈블리',
    status: 'Active',
    priority: 'High',
    startDate: '2024/01/15',
    endDate: '2024/03/20',
  },
  {
    id: 2,
    name: 'Engine-A002',
    revision: 'Rev 2.1',
    description: '보조 엔진 시스템',
    status: 'In Progress',
    priority: 'Medium',
    startDate: '2024/02/01',
    endDate: '2024/04/15',
  },
  {
    id: 3,
    name: 'Turbine-B001',
    revision: 'Rev 1.5',
    description: '터빈 블레이드 세트',
    status: 'Completed',
    priority: 'Low',
    startDate: '2023/11/01',
    endDate: '2024/01/30',
  },
  {
    id: 4,
    name: 'Compressor-C001',
    revision: 'Rev 3.0',
    description: '압축기 모듈',
    status: 'Active',
    priority: 'High',
    startDate: '2024/01/20',
    endDate: '2024/05/10',
  },
  {
    id: 5,
    name: 'Fuel-System-D001',
    revision: 'Rev 1.2',
    description: '연료 분사 시스템',
    status: 'Pending',
    priority: 'Medium',
    startDate: '2024/03/01',
    endDate: '2024/06/15',
  },
  {
    id: 6,
    name: 'Hydraulic-E001',
    revision: 'Rev 2.0',
    description: '유압 제어 장치',
    status: 'Active',
    priority: 'High',
    startDate: '2024/02/15',
    endDate: '2024/04/30',
  },
  {
    id: 7,
    name: 'Sensor-F001',
    revision: 'Rev 1.8',
    description: '온도 센서 배열',
    status: 'In Progress',
    priority: 'Low',
    startDate: '2024/01/10',
    endDate: '2024/02/28',
  },
  {
    id: 8,
    name: 'Control-Unit-G001',
    revision: 'Rev 4.1',
    description: 'FADEC 컨트롤 유닛',
    status: 'Active',
    priority: 'Critical',
    startDate: '2024/02/01',
    endDate: '2024/07/01',
  },
  {
    id: 9,
    name: 'Bearing-H001',
    revision: 'Rev 1.0',
    description: '메인 베어링 어셈블리',
    status: 'Completed',
    priority: 'Medium',
    startDate: '2023/12/01',
    endDate: '2024/01/15',
  },
  {
    id: 10,
    name: 'Exhaust-I001',
    revision: 'Rev 2.3',
    description: '배기 시스템',
    status: 'Active',
    priority: 'High',
    startDate: '2024/03/05',
    endDate: '2024/05/20',
  },
  {
    id: 11,
    name: 'Gearbox-J001',
    revision: 'Rev 1.7',
    description: '기어박스 어셈블리',
    status: 'Pending',
    priority: 'Medium',
    startDate: '2024/04/01',
    endDate: '2024/06/30',
  },
  {
    id: 12,
    name: 'Lubricant-K001',
    revision: 'Rev 2.0',
    description: '윤활 시스템',
    status: 'In Progress',
    priority: 'Low',
    startDate: '2024/02/20',
    endDate: '2024/04/10',
  },
])

// 선택된 행 처리
function handleSelectionChange(selectedRows) {
  console.log('선택된 행:', selectedRows)
}

// 정렬 변경 처리
function handleSortingChange(sorting) {
  console.log('정렬 상태:', sorting)
}

// 페이지네이션 변경 처리
function handlePaginationChange(pagination) {
  console.log('페이지네이션:', pagination)
}
</script>

<template>
  <div class="space-y-6">
    <!-- 페이지 타이틀 -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-foreground">대시보드</h1>
    </div>

    <!-- DataTable 샘플 -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">DataTable 컴포넌트 테스트</h2>
      <DataTable
        :columns="columns"
        :data="tableData"
        :page-size="10"
        :page-size-options="[10, 20, 30, 50]"
        max-height="350px"
        @update:selected-rows="handleSelectionChange"
        @update:sorting="handleSortingChange"
        @update:pagination="handlePaginationChange"
      />
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
