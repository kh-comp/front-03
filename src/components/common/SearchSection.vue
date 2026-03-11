<script setup>
/**
 * SearchSection 컴포넌트
 * 재사용 가능한 검색 영역
 */
import { cn } from '@/lib/utils'
import { computed, ref, watch } from 'vue'
import FormField from '@/components/ui/Form/FormField.vue'
import Button from '@/components/ui/Button/Button.vue'
import { Search, RotateCcw } from 'lucide-vue-next'

const props = defineProps({
  // 검색 필드 설정 배열
  fields: {
    type: Array,
    required: true,
    // SearchField[] 타입: { key, label, type, options?, placeholder?, colspan? }
  },
  // v-model 바인딩
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  // 그리드 컬럼 수
  columns: {
    type: Number,
    default: 5,
  },
  // 버튼 표시 여부
  showButtons: {
    type: Boolean,
    default: true,
  },
  // 로딩 상태
  loading: {
    type: Boolean,
    default: false,
  },
  // 추가 클래스
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'reset'])

// 내부 검색 데이터
const searchParams = ref({ ...props.modelValue })

// modelValue 변경 감지
watch(
  () => props.modelValue,
  (newVal) => {
    searchParams.value = { ...newVal }
  },
  { deep: true },
)

// 그리드 스타일 계산
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
}))

// 필드 값 변경 핸들러
const handleFieldChange = (key, value) => {
  searchParams.value[key] = value
  emit('update:modelValue', { ...searchParams.value })
}

// 검색 실행
const handleSearch = () => {
  emit('search', { ...searchParams.value })
}

// 초기화
const handleReset = () => {
  // 각 필드 초기값 설정
  const resetValue = {}
  props.fields.forEach((field) => {
    resetValue[field.key] = ''
  })
  searchParams.value = resetValue
  emit('update:modelValue', resetValue)
  emit('reset')
}
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50',
        'border border-slate-200 dark:border-slate-700',
        props.class,
      )
    "
  >
    <!-- 검색 필드 그리드 -->
    <div class="grid gap-4" :style="gridStyle">
      <div
        v-for="field in fields"
        :key="field.key"
        class="search-field"
        :style="field.colspan ? { gridColumn: `span ${field.colspan}` } : {}"
      >
        <!-- 폼 필드 -->
        <FormField
          :field="field"
          :model-value="searchParams[field.key]"
          @update:model-value="(val) => handleFieldChange(field.key, val)"
        />
      </div>
    </div>

    <!-- 버튼 영역 -->
    <div v-if="showButtons" class="mt-4 flex justify-center gap-3">
      <Button variant="default" :loading="loading" @click="handleSearch">
        <Search class="h-4 w-4" />
        조회
      </Button>
      <Button variant="outline" @click="handleReset">
        <RotateCcw class="h-4 w-4" />
        초기화
      </Button>
    </div>
  </div>
</template>
