<script setup>
  /**
   * TreeNode 컴포넌트
   * 트리 노드 (재귀 구조, Tailwind v4 마이그레이션)
   */
  import { cn } from '@/lib/utils'
  import { ChevronDown, ChevronRight, FileText } from 'lucide-vue-next'
  import { computed, inject } from 'vue'

  const props = defineProps({
    node: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  })

  // 컨텍스트 주입
  const treeContext = inject('treeContext', null)

  if (!treeContext) {
    throw new Error('TreeNode must be used within TreeMenu.')
  }

  const { selectable, isNodeExpanded, onNodeClick, onToggleExpand } = treeContext

  // 자식 노드 존재 여부
  const hasChildren = computed(() => {
    return Array.isArray(props.node.children) && props.node.children.length > 0
  })

  const childNodes = computed(() => props.node.children ?? [])
  const nodeLabel = computed(() => props.node.label ?? '')
  const isSelectable = computed(() => selectable.value)
  const isExpanded = computed(() => isNodeExpanded(props.node.id))
  const isSelected = computed(() => Boolean(props.node.selected || props.node.active))
  const shouldRenderConnector = computed(() => !props.isRoot)
  const itemClass = computed(() => {
    return cn(
      'relative leading-[1.2]',
      props.isRoot ? 'pb-1 pl-4 last:pb-0' : 'pt-1 pl-6',
      shouldRenderConnector.value
        ? 'before:absolute before:left-[12px] before:block before:w-0 before:border-l before:border-[color-mix(in_oklab,var(--color-tree-border)_78%,#7b8794)] before:content-[\'\']'
        : '',
      shouldRenderConnector.value && props.isLast ? 'before:top-0 before:h-[21px]' : '',
      shouldRenderConnector.value && !props.isLast ? 'before:top-0 before:bottom-[-1px]' : '',
      shouldRenderConnector.value
        ? 'after:absolute after:top-[21px] after:left-[12px] after:block after:w-[11px] after:border-t after:border-[color-mix(in_oklab,var(--color-tree-border)_78%,#7b8794)] after:content-[\'\']'
        : ''
    )
  })

  // 펼침/접힘 토글
  const toggleExpand = () => {
    if (!hasChildren.value) {
      return
    }

    onToggleExpand(props.node, !isExpanded.value)
  }

  // 노드 클릭
  const handleNodeClick = () => {
    if (!isSelectable.value) {
      return
    }

    onNodeClick(props.node)
  }

  const treeItemAriaExpanded = computed(() => {
    if (!hasChildren.value) {
      return undefined
    }

    return String(isExpanded.value)
  })

  const rowClass = computed(() => {
    return cn(
      'group flex min-h-9 items-center gap-1.5 rounded-[8px] pr-2 transition-[background-color,color] duration-150',
      isSelected.value
        ? 'bg-[color-mix(in_oklab,var(--color-tree-node-hover)_82%,var(--color-tree-bg))] text-[color:var(--color-tree-node-text)]'
        : 'text-[color:var(--color-tree-node-text)] hover:bg-[color:var(--color-tree-node-hover)]'
    )
  })

  const toggleButtonClass = computed(() => {
    return cn(
      'inline-flex shrink-0 items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1597e5]',
      props.isRoot
        ? 'h-8 w-8 rounded-[8px] border border-[color-mix(in_oklab,var(--color-tree-header-bg)_35%,white)] bg-[color-mix(in_oklab,var(--color-tree-header-bg)_10%,white)] text-[color:var(--color-tree-header-bg)]'
        : 'h-5 w-5 rounded-[4px] border border-transparent bg-transparent text-[color-mix(in_oklab,var(--color-tree-node-text)_55%,white)] group-hover:text-[color:var(--color-tree-node-text)]'
    )
  })

  const leafIconClass = computed(() => {
    return cn(
      'h-3.5 w-3.5 shrink-0',
      isSelected.value
        ? 'text-[color:var(--color-tree-header-bg)]'
        : 'text-[color-mix(in_oklab,var(--color-tree-node-text)_52%,white)] group-hover:text-[color-mix(in_oklab,var(--color-tree-node-text)_72%,white)]'
    )
  })

  const labelClass = computed(() => {
    return cn(
      'min-w-0 flex-1 truncate rounded-[6px] px-2 py-[6px] text-left text-[15px] leading-[1.35] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1597e5]',
      hasChildren.value ? 'font-semibold' : 'font-medium',
      isSelected.value ? 'text-[color:var(--color-tree-node-text)]' : 'text-inherit',
      isSelectable.value ? 'cursor-pointer' : 'cursor-default',
      !isSelected.value && isSelectable.value
        ? 'group-hover:text-[color-mix(in_oklab,var(--color-tree-node-text)_88%,black)]'
        : ''
    )
  })

  const childGroupClass = computed(() => 'mt-[2px]')
</script>

<template>
  <li role="treeitem" :aria-expanded="treeItemAriaExpanded" :class="itemClass">
    <div :class="rowClass">
      <button
        v-if="hasChildren"
        type="button"
        :class="toggleButtonClass"
        :aria-label="isExpanded ? `${nodeLabel} 접기` : `${nodeLabel} 펼치기`"
        :aria-expanded="isExpanded"
        @click="toggleExpand"
      >
        <ChevronDown v-if="isExpanded" class="h-4 w-4" aria-hidden="true" />
        <ChevronRight v-else class="h-4 w-4" aria-hidden="true" />
      </button>
      <div
        v-else
        class="flex h-5 w-5 shrink-0 items-center justify-center"
        aria-hidden="true"
      >
        <FileText :class="leafIconClass" stroke-width="1.9" />
      </div>

      <button
        v-if="isSelectable"
        type="button"
        :class="labelClass"
        @click="handleNodeClick"
        :title="nodeLabel"
      >
        {{ nodeLabel }}
      </button>
      <span
        v-else
        :class="labelClass"
        :title="nodeLabel"
      >
        {{ nodeLabel }}
      </span>
    </div>

    <template v-if="hasChildren && isExpanded">
      <!-- 하위 노드가 순환 호출 -->
      <ul role="group" :class="childGroupClass">
        <TreeNode
          v-for="(child, index) in childNodes"
          :key="child.id"
          :node="child"
          :is-root="false"
          :is-last="index === childNodes.length - 1"
        />
      </ul>
    </template>
  </li>
</template>
