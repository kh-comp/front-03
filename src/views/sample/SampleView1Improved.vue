<script setup>
/**
 * 샘플 페이지 1-1
 * 샘플 페이지 1의 개선안 레이아웃
 */
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import PageHeader from '@/components/common/PageHeader.vue'
import { Button } from '@/components/ui/Button'
import { Input, DatePicker, Select, Checkbox, Radio, Textarea } from '@/components/ui/Input'
import { Tabs, TabList, TabTrigger, TabContent } from '@/components/ui/Tabs'
import { TreeMenu } from '@/components/ui/Tree'
import { ChevronRight, Download, Pencil, Plus, Trash2 } from 'lucide-vue-next'

const activeTab = ref('main')
const tabs = [
  { id: 'main', label: 'Main' },
  { id: 'sb-rule', label: 'SB Rule' },
  { id: 'documents', label: 'Documents' },
  { id: 'rules', label: 'Rules' },
]

const treeData = ref([
  {
    id: '1',
    label: 'Master Configuration',
    checked: true,
    children: [
      { id: '1-1', label: 'Assembly Base', checked: false },
      { id: '1-2', label: 'Position Rule', checked: false },
    ],
  },
  {
    id: '2',
    label: 'Sub Configuration',
    checked: true,
    children: [
      { id: '2-1', label: 'Fuel System', checked: false },
      { id: '2-2', label: 'Cooling Module', checked: false },
    ],
  },
  {
    id: '3',
    label: 'Position Mapping',
    checked: true,
    children: [
      { id: '3-1', label: 'Engine Bay', checked: true },
      { id: '3-2', label: 'Left Wing', checked: false },
      { id: '3-3', label: 'Cabin Zone', checked: false },
    ],
  },
])

const formData = ref({
  configName: 'Master Configuration A',
  configCode: 'MC-2026-001',
  category: 'a',
  status: 'yes',
  enableTracking: true,
  owner: 'Powertrain Team',
  description:
    '엔진 기준 구성 마스터를 정의하는 기본 화면입니다. 레거시 테이블형 폼 대신 섹션 중심 구조와 명확한 저장 흐름을 검토하기 위한 개선 샘플입니다.',
  effectiveDate: '2026-03-11',
  positionType: 'b',
  remarks: '',
})

const selectOptions = [
  { value: 'a', label: 'Select A' },
  { value: 'b', label: 'Select B' },
  { value: 'c', label: 'Select C' },
  { value: 'd', label: 'Select D' },
]

const secondaryOptions = [
  { value: 'a', label: 'Base Option' },
  { value: 'b', label: 'Position Option' },
  { value: 'c', label: 'Rule Option' },
]

function handleNodeClick(node) {
  console.log('Node clicked:', node)
}

function handleCheckChange(nodeId, checked) {
  console.log('Check changed:', nodeId, checked)
}

function handleSave() {
  alert(`저장\n${JSON.stringify(formData.value, null, 2)}`)
}
</script>

<template>
  <div class="box-border flex h-[calc(100vh-60px)] flex-col overflow-hidden bg-slate-100 p-5">
    <PageHeader title="샘플 페이지 1-1" class="shrink-0">
      <template #actions-right>
        <Button variant="outline">
          <Trash2 class="h-4 w-4" />
          삭제
        </Button>
        <Button variant="outline">
          <Pencil class="h-4 w-4" />
          수정
        </Button>
        <Button>
          <Plus class="h-4 w-4" />
          등록
        </Button>
        <Button variant="outline">
          <Download class="h-4 w-4" />
          엑셀
        </Button>
      </template>
    </PageHeader>

    <div class="mt-5 grid min-h-0 flex-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside class="min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Navigation</p>
          <h2 class="mt-2 text-xl font-semibold">Master Configuration</h2>
          <p class="mt-1 text-sm text-slate-300">현재 구성 트리와 작업 대상을 한 곳에서 확인합니다.</p>
        </div>

        <div class="h-[calc(100%-112px)] overflow-y-auto p-4">
          <TreeMenu
            title="Configuration Tree"
            :data="treeData"
            :default-expanded="['1', '2', '3']"
            class="h-full border-0 shadow-none"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
          />
        </div>
      </aside>

      <section class="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 px-6 py-5">
          <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <span>Master Configuration</span>
                <ChevronRight class="h-4 w-4" />
                <span class="font-medium text-slate-900">Create</span>
              </div>
              <h2 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Create Master Configuration
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                레거시 표형 레이아웃 대신 정보 섹션 중심으로 재구성한 화면입니다. 기본 정보와
                포지션 정보를 분리하고, 전체 저장 액션은 하단에 하나로 통합했습니다.
              </p>
            </div>

            <div class="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Draft</p>
              <p class="mt-1 text-sm text-cyan-900">마지막 수정 2026-03-11 10:20</p>
            </div>
          </div>
        </div>

        <Tabs v-model="activeTab" :tabs="tabs" class="flex min-h-0 flex-1 flex-col">
          <div class="border-b border-slate-200 px-6 py-4">
            <TabList class="mb-0 grid w-full max-w-[520px] grid-cols-4 rounded-xl bg-slate-100 p-1">
              <TabTrigger tab-id="main" />
              <TabTrigger tab-id="sb-rule" />
              <TabTrigger tab-id="documents" />
              <TabTrigger tab-id="rules" />
            </TabList>
          </div>

          <TabContent tab-id="main" class="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div class="space-y-6">
              <section class="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                <div class="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Section 01</p>
                    <h3 class="mt-2 text-xl font-semibold text-slate-950">Basic Information</h3>
                    <p class="mt-2 text-sm text-slate-500">
                      가장 먼저 식별 정보와 상태를 입력하도록 정리했습니다.
                    </p>
                  </div>
                </div>

                <div class="grid gap-5 xl:grid-cols-2">
                  <div class="rounded-xl border border-slate-200 bg-white p-4">
                    <label for="config-name" class="text-sm font-semibold text-slate-900">Configuration Name</label>
                    <Input id="config-name" v-model="formData.configName" class="mt-2" />
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white p-4">
                    <label for="config-code" class="text-sm font-semibold text-slate-900">Configuration Code</label>
                    <Input id="config-code" v-model="formData.configCode" class="mt-2" />
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white p-4">
                    <label for="category" class="text-sm font-semibold text-slate-900">Category</label>
                    <Select id="category" v-model="formData.category" :options="selectOptions" class="mt-2" />
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white p-4">
                    <p class="text-sm font-semibold text-slate-900">Status</p>
                    <div class="mt-3 flex h-size-md items-center gap-5">
                      <Radio id="improved-radio-yes" v-model="formData.status" value="yes" name="improved-status" label="yes" />
                      <Radio id="improved-radio-no" v-model="formData.status" value="no" name="improved-status" label="no" />
                    </div>
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white p-4 xl:col-span-2">
                    <div class="flex items-center justify-between gap-4">
                      <div>
                        <p class="text-sm font-semibold text-slate-900">Tracking Option</p>
                        <p class="mt-1 text-sm text-slate-500">체크박스와 설명을 한 묶음으로 정리했습니다.</p>
                      </div>
                      <Checkbox id="tracking-option" v-model="formData.enableTracking" label="Enable tracking" />
                    </div>
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white p-4 xl:col-span-2">
                    <label for="description" class="text-sm font-semibold text-slate-900">Description</label>
                    <Textarea id="description" v-model="formData.description" :rows="4" class="mt-2" />
                  </div>
                </div>
              </section>

              <section class="rounded-2xl border border-slate-200 bg-white p-6">
                <div class="mb-5">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Section 02</p>
                  <h3 class="mt-2 text-xl font-semibold text-slate-950">Position Information</h3>
                  <p class="mt-2 text-sm text-slate-500">
                    날짜, 포지션, 담당 정보를 한 그룹으로 묶어 입력 흐름을 단순화했습니다.
                  </p>
                </div>

                <div class="grid gap-5 xl:grid-cols-3">
                  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <label for="effective-date" class="text-sm font-semibold text-slate-900">Effective Date</label>
                    <DatePicker id="effective-date" v-model="formData.effectiveDate" class="mt-2" />
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <label for="position-type" class="text-sm font-semibold text-slate-900">Position Type</label>
                    <Select id="position-type" v-model="formData.positionType" :options="secondaryOptions" class="mt-2" />
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <label for="owner" class="text-sm font-semibold text-slate-900">Owner</label>
                    <Input id="owner" v-model="formData.owner" class="mt-2" />
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 xl:col-span-3">
                    <label for="remarks" class="text-sm font-semibold text-slate-900">Remarks</label>
                    <Textarea id="remarks" v-model="formData.remarks" :rows="3" class="mt-2" />
                  </div>
                </div>
              </section>
            </div>
          </TabContent>

          <TabContent tab-id="sb-rule" class="flex-1 overflow-y-auto px-6 py-8">
            <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              SB Rule 개선안 영역
            </div>
          </TabContent>

          <TabContent tab-id="documents" class="flex-1 overflow-y-auto px-6 py-8">
            <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              Documents 개선안 영역
            </div>
          </TabContent>

          <TabContent tab-id="rules" class="flex-1 overflow-y-auto px-6 py-8">
            <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              Rules 개선안 영역
            </div>
          </TabContent>
        </Tabs>

        <div class="border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm font-medium text-slate-900">전체 저장 액션</p>
              <p class="text-sm text-slate-500">섹션별 저장 대신 페이지 하단에서 한 번에 저장합니다.</p>
            </div>
            <div class="flex items-center gap-2">
              <Button variant="outline">취소</Button>
              <Button @click="handleSave">저장</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
