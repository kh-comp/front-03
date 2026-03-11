<script setup>
  /**
   * TreeMenu 컴포넌트
   * 트리 메뉴 컨테이너 (Tailwind v4 마이그레이션)
   */
  import { cn } from '@/lib/utils'
  import { computed, provide, ref, watch } from 'vue'
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

  const emit = defineEmits(['node-click', 'check-change', 'expand-change'])

  const expandedNodeIds = ref(new Set())
  const rootNodes = computed(() => props.data ?? [])
  const treeAriaLabel = computed(() => props.title || 'Tree menu')
  const containerClass = computed(() => {
    return cn(
      'flex h-full min-h-0 flex-col overflow-hidden rounded-[16px] border border-[color:var(--color-tree-border)] bg-[color:var(--color-tree-bg)] shadow-[0_6px_18px_rgba(20,73,102,0.06)]',
      props.class,
    )
  })

  const syncExpandedIds = (ids = []) => {
    expandedNodeIds.value = new Set(ids)
  }

  watch(
    () => props.defaultExpanded,
    (ids) => {
      syncExpandedIds(ids)
    },
    { immediate: true, deep: true },
  )

  const isNodeExpanded = (nodeId) => {
    return expandedNodeIds.value.has(nodeId)
  }

  const updateExpandedNode = (nodeId, expanded) => {
    const nextExpandedIds = new Set(expandedNodeIds.value)

    if (expanded) {
      nextExpandedIds.add(nodeId)
    } else {
      nextExpandedIds.delete(nodeId)
    }

    expandedNodeIds.value = nextExpandedIds
  }

  // 노드 클릭 핸들러
  const handleNodeClick = (node) => {
    if (!props.selectable) {
      return
    }

    emit('node-click', node)
  }

  // 노드 펼침 상태 변경 핸들러
  const handleExpandChange = (node, expanded) => {
    updateExpandedNode(node.id, expanded)

    emit('expand-change', node, expanded)
    // `check-change` is kept as a compatibility alias for existing consumers.
    emit('check-change', node.id, expanded)
  }

  // 컨텍스트 제공
  provide('treeContext', {
    selectable: computed(() => props.selectable),
    isNodeExpanded,
    onNodeClick: handleNodeClick,
    onToggleExpand: handleExpandChange,
  })
</script>

<template>
  <div :class="containerClass">
    <div
      v-if="title"
      class="flex h-14 w-full shrink-0 items-center border-b border-[color-mix(in_oklab,var(--color-tree-header-bg)_70%,white)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-tree-header-bg)_84%,white)_0%,var(--color-tree-header-bg)_100%)] px-5"
    >
      <span
        class="truncate text-[18px] font-semibold tracking-[-0.02em] text-(--color-tree-header-text)"
      >
        {{ title }}
      </span>
    </div>

    <!-- 트리 노드 목록 -->
    <ul class="min-h-0 flex-1 overflow-y-auto px-3 py-3" role="tree" :aria-label="treeAriaLabel">
      <TreeNode
        v-for="(node, index) in rootNodes"
        :key="node.id"
        :node="node"
        :is-root="true"
        :is-last="index === rootNodes.length - 1"
      />
    </ul>
  </div>
</template>
