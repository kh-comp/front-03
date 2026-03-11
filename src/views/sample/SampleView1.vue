<script setup>
  /**
   * 샘플 페이지 1
   * UI 컴포넌트 테스트 페이지
   */
  import { ref } from 'vue'
  import { cn } from '@/lib/utils'

  // 공통 컴포넌트
  import PageHeader from '@/components/common/PageHeader.vue'

  // UI 컴포넌트
  import { Button } from '@/components/ui/Button'
  import { Input, DatePicker, Select, Checkbox, Radio, Textarea } from '@/components/ui/Input'
  import { Tabs, TabList, TabTrigger, TabContent } from '@/components/ui/Tabs'
  import { TreeMenu } from '@/components/ui/Tree'
  import { FormSection, FormTable } from '@/components/ui/Form'

  // PageHeader 액션
  const pageActions = ['delete', 'modify', 'enroll', 'excel', 'return']
  const handleActionClick = (action) => {
    console.log('Action clicked:', action)
    alert(`${action} 버튼 클릭!`)
  }

  // 탭 상태
  const activeTab = ref('main')
  const tabs = [
    { id: 'main', label: 'Main' },
    { id: 'sb-rule', label: 'SB Rule' },
    { id: 'documents', label: 'Documents' },
    { id: 'rules', label: 'Rules' },
  ]

  // 트리 데이터
  const treeData = ref([
    {
      id: '1',
      label: '1depth',
      checked: true,
      children: [
        {
          id: '1-1',
          label: '2depth',
          checked: false,
          children: [
            { id: '1-1-1', label: '3depth', checked: false },
            { id: '1-1-2', label: '3depth', checked: false },
          ],
        },
      ],
    },
    {
      id: '2',
      label: '1depth',
      checked: true,
      children: [
        {
          id: '2-1',
          label: '2depth',
          checked: false,
          children: [
            { id: '2-1-1', label: '3depth', checked: false },
            { id: '2-1-2', label: '3depth', checked: false },
          ],
        },
        {
          id: '2-2',
          label: '2depth',
          checked: false,
          children: [
            { id: '2-2-1', label: '3depth', checked: false },
            { id: '2-2-2', label: '3depth', checked: false },
          ],
        },
      ],
    },
    {
      id: '3',
      label: '1depth',
      checked: true,
      children: [
        {
          id: '3-1',
          label: '2depth',
          checked: true,
          children: [
            { id: '3-1-1', label: '3depth', checked: false },
            { id: '3-1-2', label: '3depth', checked: false },
            { id: '3-1-3', label: '3depth', checked: false },
            { id: '3-1-4', label: '3depth', checked: false },
          ],
        },
        {
          id: '3-2',
          label: '2depth',
          checked: true,
          children: [
            { id: '3-2-1', label: '3depth', checked: false },
            { id: '3-2-2', label: '3depth', checked: false },
          ],
        },
        {
          id: '3-3',
          label: '2depth',
          checked: true,
          children: [
            { id: '3-3-1', label: '3depth', checked: false },
            { id: '3-3-2', label: '3depth', checked: false },
          ],
        },
      ],
    },
  ])

  const handleNodeClick = (node) => {
    console.log('Node clicked:', node)
  }

  const handleCheckChange = (nodeId, checked) => {
    console.log('Check changed:', nodeId, checked)
  }

  // 폼 데이터
  const formData = ref({
    text1: '',
    text2: '',
    text3: '',
    textarea1: '',
    select1: '',
    select2: '',
    radio1: 'yes',
    checkbox1: false,
    date1: '',
  })

  const selectOptions = [
    { value: 'a', label: 'select A' },
    { value: 'b', label: 'select B' },
    { value: 'c', label: 'select C' },
    { value: 'd', label: 'select D' },
  ]

  // 버튼 상태
  const buttonLoading = ref(false)

  const handleButtonClick = () => {
    buttonLoading.value = true
    setTimeout(() => {
      buttonLoading.value = false
      alert('버튼 클릭!')
    }, 2000)
  }

  const handleFormSave = () => {
    alert('폼 저장!\n' + JSON.stringify(formData.value, null, 2))
  }

  // FormTable 컬럼 비율
  const formColumns = [20, 30, 20, 30]
</script>

<template>
  <!-- 전체 컨테이너: 명시적 높이, 오버플로우 숨김 -->
  <div class="box-border flex h-[calc(100vh-60px)] flex-col overflow-hidden bg-slate-100 p-5">
    <!-- 페이지 헤더: 크기 고정 -->
    <PageHeader
      title="샘플 페이지 1"
      :actions="pageActions"
      class="shrink-0"
      @action-click="handleActionClick"
    />

    <!-- 메인 컨텐츠: 나머지 공간 차지 (상단 여백 줄임) -->
    <div class="flex min-h-0 flex-1 gap-5 overflow-hidden">
      <!-- 좌측: 트리 메뉴 - 높이 100% -->
      <div class="h-full w-[280px] shrink-0">
        <TreeMenu
          title="Master Configuration"
          :data="treeData"
          :default-expanded="['1', '2', '3']"
          class="h-full"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        />
      </div>

      <!-- 우측: 탭 컨텐츠 - flex 컬럼 구조 -->
      <div
        class="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Tabs v-model="activeTab" :tabs="tabs" class="flex min-h-0 flex-1 flex-col">
          <!-- 탭 리스트: 크기 고정 -->
          <TabList class="mb-4 shrink-0">
            <TabTrigger tab-id="main" />
            <TabTrigger tab-id="sb-rule" />
            <TabTrigger tab-id="documents" />
            <TabTrigger tab-id="rules" />
          </TabList>

          <!-- Main 탭 컨텐츠: 스크롤 가능 -->
          <TabContent tab-id="main" class="flex-1 overflow-y-auto">
            <!-- 폼 섹션 1 -->
            <FormSection title="Create Master Configuration" @save="handleFormSave">
              <FormTable :columns="formColumns">
                <tr class="border-form-border border-b">
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    텍스트
                  </th>
                  <td class="border-form-border border-r px-4 py-3 text-sm">text</td>
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    <label for="text2">텍스트</label>
                  </th>
                  <td class="px-4 py-3 text-sm">
                    <Input id="text2" v-model="formData.text2" />
                  </td>
                </tr>
                <tr class="border-form-border border-b">
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    <label for="select1">선택</label>
                  </th>
                  <td class="border-form-border border-r px-4 py-3 text-sm">
                    <Select id="select1" v-model="formData.select1" :options="selectOptions" />
                  </td>
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    라디오
                  </th>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center gap-4">
                      <Radio
                        id="radio-yes"
                        v-model="formData.radio1"
                        value="yes"
                        name="state"
                        label="yes"
                      />
                      <Radio
                        id="radio-no"
                        v-model="formData.radio1"
                        value="no"
                        name="state"
                        label="no"
                      />
                    </div>
                  </td>
                </tr>
                <tr class="border-form-border border-b">
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    체크박스
                  </th>
                  <td class="border-form-border border-r px-4 py-3 text-sm">
                    <Checkbox id="checkbox1" v-model="formData.checkbox1" label="체크박스" />
                  </td>
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    <label for="text3">텍스트</label>
                  </th>
                  <td class="px-4 py-3 text-sm">
                    <Input id="text3" v-model="formData.text3" />
                  </td>
                </tr>
                <tr>
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    텍스트
                  </th>
                  <td colspan="3" class="px-4 py-3 text-sm">
                    <Textarea v-model="formData.textarea1" :rows="3" />
                  </td>
                </tr>
              </FormTable>
            </FormSection>

            <!-- 폼 섹션 2 -->
            <FormSection title="Position Info" class="mt-6" @save="handleFormSave">
              <FormTable :columns="formColumns">
                <tr class="border-form-border border-b">
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    <label for="date1">날짜</label>
                  </th>
                  <td class="border-form-border border-r px-4 py-3 text-sm">
                    <DatePicker id="date1" v-model="formData.date1" />
                  </td>
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    <label for="select2">선택</label>
                  </th>
                  <td class="px-4 py-3 text-sm">
                    <Select id="select2" v-model="formData.select2" :options="selectOptions" />
                  </td>
                </tr>
                <tr class="border-form-border border-b">
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    텍스트
                  </th>
                  <td class="border-form-border border-r px-4 py-3 text-sm">
                    <Input v-model="formData.text1" />
                  </td>
                  <th
                    class="bg-form-label-bg text-form-label-text border-form-border border-r px-4 py-3 text-left text-sm font-medium"
                  >
                    텍스트
                  </th>
                  <td class="px-4 py-3 text-sm">
                    <Input v-model="formData.text1" />
                  </td>
                </tr>
              </FormTable>
            </FormSection>

            <!-- 버튼 테스트 섹션 -->
            <FormSection title="Button 테스트" :show-save-button="false" class="mt-6">
              <div class="space-y-4">
                <div class="flex flex-wrap gap-3">
                  <Button variant="default" @click="handleButtonClick">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div class="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <div class="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button :loading="buttonLoading">Loading</Button>
                </div>
              </div>
            </FormSection>

            <!-- Input 테스트 섹션 -->
            <FormSection title="Input 테스트" :show-save-button="false" class="mt-6">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="mb-2 block text-sm font-medium">기본 Input</label>
                    <Input v-model="formData.text1" placeholder="입력하세요" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium">에러 상태</label>
                    <Input v-model="formData.text1" :error="true" placeholder="에러 상태" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium">Disabled</label>
                    <Input v-model="formData.text1" :disabled="true" placeholder="비활성화" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium">Readonly</label>
                    <Input v-model="formData.text1" :readonly="true" placeholder="읽기 전용" />
                  </div>
                </div>
              </div>
            </FormSection>
          </TabContent>

          <!-- 다른 탭 컨텐츠들: 스크롤 가능 -->
          <TabContent tab-id="sb-rule" class="flex-1 overflow-y-auto">
            <div class="text-muted-foreground p-8 text-center">SB Rule 탭 컨텐츠</div>
          </TabContent>

          <TabContent tab-id="documents" class="flex-1 overflow-y-auto">
            <div class="text-muted-foreground p-8 text-center">Documents 탭 컨텐츠</div>
          </TabContent>

          <TabContent tab-id="rules" class="flex-1 overflow-y-auto">
            <div class="text-muted-foreground p-8 text-center">Rules 탭 컨텐츠</div>
          </TabContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
