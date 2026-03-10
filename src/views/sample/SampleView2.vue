<script setup>
/**
 * 샘플 페이지 2
 * 검색 영역 컴포넌트 예제
 */
import { ref, reactive } from 'vue'
import { cn } from '@/lib/utils'

// 공통 컴포넌트
import PageHeader from '@/components/common/PageHeader.vue'
import SearchSection from '@/components/common/SearchSection.vue'

// 상수
import { ENGINE_UC_SEARCH_FIELDS } from '@/constants/search-fields'

// PageHeader 액션
const pageActions = ['enroll', 'excel']

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
const handleSearch = async (params) => {
  console.log('검색 실행:', params)
  searchLoading.value = true

  try {
    // API 호출 로직
    // const result = await api.searchEngineUc(params)
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

// 페이지 헤더 액션 핸들러
const handleActionClick = (action) => {
  console.log('액션:', action)
  switch (action) {
    case 'enroll':
      // 등록 모달 오픈
      break
    case 'excel':
      // 엑셀 다운로드
      break
  }
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
    <PageHeader
      title="샘플 페이지 2"
      :actions="pageActions"
      class="shrink-0"
      @action-click="handleActionClick"
    />

    <!-- 메인 컨텐츠 -->
    <div class="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden">
      <!-- 검색 영역 -->
      <SearchSection
        v-model="searchParams"
        :fields="ENGINE_UC_SEARCH_FIELDS"
        :columns="5"
        :loading="searchLoading"
        class="shrink-0"
        @search="handleSearch"
        @reset="handleReset"
      />

      <!-- 결과 영역 -->
      <div
        :class="
          cn(
            'flex min-h-0 flex-1 flex-col rounded-lg',
            'border border-slate-200 bg-white p-6 shadow-sm',
            'dark:border-slate-700 dark:bg-slate-800',
          )
        "
      >
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

        <!-- 테이블 영역 (추후 DataTable 컴포넌트로 대체) -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-8 text-center text-slate-500 dark:text-slate-400">
            테이블 영역 - DataTable 컴포넌트 구현 필요
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
