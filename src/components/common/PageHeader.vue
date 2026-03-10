<script setup>
  /**
   * PageHeader 컴포넌트
   * 페이지 타이틀 + 액션 버튼
   */
  import { cn } from '@/lib/utils'
  import { computed } from 'vue'
  import { Button } from '@/components/ui/Button'
  import { Trash2, Pencil, PlusCircle, FileSpreadsheet, ArrowLeft } from 'lucide-vue-next'

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
      // ['delete', 'modify', 'enroll', 'excel', 'return']
    },
    class: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['action-click'])

  // 액션 버튼 설정
  const actionConfig = {
    delete: {
      icon: Trash2,
      label: '삭제',
      variant: 'outline',
    },
    modify: {
      icon: Pencil,
      label: '수정',
      variant: 'outline',
    },
    enroll: {
      icon: PlusCircle,
      label: '등록',
      variant: 'outline',
    },
    excel: {
      icon: FileSpreadsheet,
      label: '엑셀',
      variant: 'outline',
    },
    return: {
      icon: ArrowLeft,
      label: '이전',
      variant: 'ghost',
    },
  }

  // 액션 버튼 목록
  const actionButtons = computed(() =>
    props.actions
      .map((action) => ({
        type: action,
        ...actionConfig[action],
      }))
      .filter((button) => button.label),
  )

  // 액션 버튼 클릭 핸들러
  const handleActionClick = (actionType) => {
    emit('action-click', actionType)
  }
</script>

<template>
  <div
    :class="
      cn(
        'mb-3 flex items-center justify-between pb-4',
        'border-page-header-border border-b',
        props.class,
      )
    "
  >
    <!-- 타이틀 -->
    <h2 class="text-page-header-title ml-4 flex items-center gap-2 text-2xl font-bold">
      <img src="@/assets/images/common/tit-ico.svg" alt="" />
      {{ title }}
    </h2>

    <!-- 액션 버튼 영역 -->
    <div class="flex items-center gap-2">
      <!-- 좌측 커스텀 액션 슬롯 -->
      <slot name="actions-left" />

      <!-- 기본 액션 버튼 -->
      <template v-for="button in actionButtons" :key="button.type">
        <Button
          :variant="button.variant"
          size="default"
          class="gap-1.5"
          @click="handleActionClick(button.type)"
        >
          <component :is="button.icon" :class="cn('h-4 w-4', button.iconColor)" />
          {{ button.label }}
        </Button>
      </template>

      <!-- 우측 커스텀 액션 슬롯 -->
      <slot name="actions-right" />
    </div>
  </div>
</template>
