<script setup>
/**
 * 샘플 데이터 테이블 페이지
 * 현재 DataTable 구조와 상태를 검증하는 전용 화면
 */
import { computed, h, ref } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { cn } from '@/lib/utils'
import PageHeader from '@/components/common/PageHeader.vue'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { Download, Filter, Plus, RotateCcw, Search } from 'lucide-vue-next'

const columnHelper = createColumnHelper()

const baseRows = [
  {
    name: 'Engine Control Unit',
    revision: 'A',
    owner: 'Powertrain',
    status: 'Active',
    priority: 'High',
    updatedAt: '2026-03-02',
  },
  {
    name: 'Fuel Pump Assembly',
    revision: 'C',
    owner: 'Maintenance',
    status: 'Draft',
    priority: 'Medium',
    updatedAt: '2026-03-05',
  },
  {
    name: 'Cooling Valve Module',
    revision: 'B',
    owner: 'Powertrain',
    status: 'Active',
    priority: 'Low',
    updatedAt: '2026-03-07',
  },
  {
    name: 'Cabin Pressure Unit',
    revision: 'F',
    owner: 'Operations',
    status: 'Archived',
    priority: 'Medium',
    updatedAt: '2026-02-27',
  },
  {
    name: 'Hydraulic Sensor Kit',
    revision: 'D',
    owner: 'Maintenance',
    status: 'Active',
    priority: 'High',
    updatedAt: '2026-03-10',
  },
  {
    name: 'Navigation Relay Pack',
    revision: 'A',
    owner: 'Avionics',
    status: 'Draft',
    priority: 'Low',
    updatedAt: '2026-03-01',
  },
  {
    name: 'Compressor Interface',
    revision: 'E',
    owner: 'Powertrain',
    status: 'Active',
    priority: 'High',
    updatedAt: '2026-03-11',
  },
  {
    name: 'Generator Bracket',
    revision: 'B',
    owner: 'Structures',
    status: 'Archived',
    priority: 'Low',
    updatedAt: '2026-02-24',
  },
]

const rawRows = ref(
  Array.from({ length: 32 }, (_, index) => {
    const base = baseRows[index % baseRows.length]
    const sequence = index + 1

    return {
      id: `CFG-${String(sequence).padStart(3, '0')}`,
      name: `${base.name} ${String.fromCharCode(65 + (index % 5))}`,
      revision: base.revision,
      owner: base.owner,
      status: base.status,
      priority: base.priority,
      updatedAt: base.updatedAt,
    }
  }),
)

const keyword = ref('')
const statusFilter = ref('')

const statusOptions = [
  { value: '', label: '전체 상태' },
  { value: 'Active', label: 'Active' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Archived', label: 'Archived' },
]

const filteredRows = computed(() => {
  const term = keyword.value.trim().toLowerCase()

  return rawRows.value.filter((row) => {
    const matchesKeyword =
      !term ||
      [row.id, row.name, row.owner, row.status].some((value) =>
        String(value).toLowerCase().includes(term),
      )

    const matchesStatus = !statusFilter.value || row.status === statusFilter.value

    return matchesKeyword && matchesStatus
  })
})

function getStatusTone(status) {
  if (status === 'Active') {
    return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
  }

  if (status === 'Draft') {
    return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
  }

  return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
}

function getPriorityTone(priority) {
  if (priority === 'High') {
    return 'text-rose-600'
  }

  if (priority === 'Medium') {
    return 'text-amber-600'
  }

  return 'text-slate-500'
}

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    size: 110,
  }),
  columnHelper.accessor('name', {
    header: 'Configuration Name',
    cell: (info) => info.getValue(),
    size: 260,
  }),
  columnHelper.accessor('revision', {
    header: 'Revision',
    cell: (info) => info.getValue(),
    size: 90,
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
    cell: (info) => info.getValue(),
    size: 140,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) =>
      h(
        'span',
        {
          class: cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', getStatusTone(info.getValue())),
        },
        info.getValue(),
      ),
    size: 120,
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) =>
      h(
        'span',
        {
          class: cn('text-sm font-semibold', getPriorityTone(info.getValue())),
        },
        info.getValue(),
      ),
    size: 110,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => info.getValue(),
    size: 120,
  }),
]

function resetFilters() {
  keyword.value = ''
  statusFilter.value = ''
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
    <PageHeader title="Data Table" class="shrink-0">
      <template #actions-right>
        <Button variant="outline">
          <Download class="h-4 w-4" />
          Export
        </Button>
        <Button>
          <Plus class="h-4 w-4" />
          New Row
        </Button>
      </template>
    </PageHeader>

    <div class="mt-5 min-h-0 flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <DataTable
        :columns="columns"
        :data="filteredRows"
        :enable-row-selection="true"
        :enable-pagination="true"
        :page-size="10"
        max-height="calc(100vh - 260px)"
      >
        <template #toolbar>
          <div class="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div class="relative min-w-0 flex-1 sm:max-w-sm">
                <Search class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  v-model="keyword"
                  placeholder="구성명, ID, owner 검색"
                  class="pl-9"
                />
              </div>
              <div class="w-full sm:w-[180px] sm:shrink-0">
                <Select
                  v-model="statusFilter"
                  :options="statusOptions"
                />
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <Button variant="outline" @click="resetFilters">
                <RotateCcw class="h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline">
                <Filter class="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </template>

        <template #empty>
          <div class="mx-auto flex max-w-sm flex-col items-center gap-2 text-center">
            <p class="text-sm font-medium text-foreground">조건에 맞는 데이터가 없습니다.</p>
            <p class="text-sm text-muted-foreground">
              검색어나 상태 필터를 조정해서 다시 확인하세요.
            </p>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>
