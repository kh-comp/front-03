<script setup>
  /**
   * TreeMenu 컴포넌트
   * 트리 메뉴 컨테이너
   */
  import { cn } from '@/lib/utils'
  import { provide, computed } from 'vue'
  import TreeNode from './TreeNode.vue'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      required: true,
      // [{ id: string, label: string, checked?: boolean, children?: [] }]
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    defaultExpanded: {
      type: Array,
      default: () => [],
    },
    class: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['node-click', 'check-change'])

  // 펼쳐진 노드 ID Set
  const expandedIds = computed(() => new Set(props.defaultExpanded))

  // 노드 클릭 핸들러
  const handleNodeClick = (node) => {
    emit('node-click', node)
  }

  // 체크 변경 핸들러
  const handleCheckChange = (nodeId, checked) => {
    emit('check-change', nodeId, checked)
  }

  // 컨텍스트 제공
  provide('treeContext', {
    selectable: computed(() => props.selectable),
    expandedIds,
    onNodeClick: handleNodeClick,
    onCheckChange: handleCheckChange,
  })
</script>

<template>
  <div
    :class="cn('bg-tree-bg flex h-full flex-col rounded-md border border-slate-200', props.class)"
  >
    <!-- 헤더: 크기 고정 -->
    <div
      v-if="title"
      class="bg-tree-header-bg text-tree-header-text shrink-0 rounded-t-md px-5 py-4"
    >
      <span class="text-lg font-semibold">{{ title }}</span>
    </div>

    <!-- 트리 노드 목록: 스크롤 가능 -->
    <ul class="flex-1 space-y-1 overflow-y-auto p-4">
      <TreeNode v-for="node in data" :key="node.id" :node="node" :level="0" />
    </ul>
  </div>
</template>
