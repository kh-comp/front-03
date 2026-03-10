<script setup>
  /**
   * TreeNode 컴포넌트
   * 트리 노드 (재귀 구조)
   */
  import { cn } from '@/lib/utils'
  import { inject, ref, computed, watch } from 'vue'
  import { ChevronRight, ChevronDown } from 'lucide-vue-next'

  const props = defineProps({
    node: {
      type: Object,
      required: true,
      // { id: string, label: string, checked?: boolean, children?: [] }
    },
    level: {
      type: Number,
      default: 0,
    },
  })

  // 컨텍스트 주입
  const treeContext = inject('treeContext')
  const { selectable, expandedIds, onNodeClick, onCheckChange } = treeContext

  // 자식 노드 존재 여부
  const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

  // 펼침 상태
  const isExpanded = ref(expandedIds.value.has(props.node.id))

  // 체크 상태
  const isChecked = ref(props.node.checked === true)

  // 노드 prop 변경 감지
  watch(
    () => props.node.checked,
    (newVal) => {
      isChecked.value = newVal === true
    },
  )

  // 펼침/접힘 토글
  const toggleExpand = () => {
    if (hasChildren.value) {
      isExpanded.value = !isExpanded.value
    }
  }

  // 체크박스 토글
  const toggleCheck = () => {
    isChecked.value = !isChecked.value
    onCheckChange(props.node.id, isChecked.value)
  }

  // 노드 클릭
  const handleNodeClick = () => {
    onNodeClick(props.node)
  }

  // 인덴트 계산
  const indentStyle = computed(() => ({
    paddingLeft: `${props.level * 20}px`,
  }))
</script>

<template>
  <li class="list-none">
    <!-- 노드 컨텐츠 -->
    <div
      :class="
        cn(
          'flex items-center gap-2 rounded-md py-1.5 transition-colors',
          'hover:bg-tree-node-hover cursor-pointer',
        )
      "
      :style="indentStyle"
    >
      <!-- 펼침/접힘 아이콘 -->
      <button
        v-if="hasChildren"
        type="button"
        class="text-tree-node-text flex h-4 w-4 flex-shrink-0 items-center justify-center"
        @click.stop="toggleExpand"
      >
        <ChevronDown v-if="isExpanded" class="h-4 w-4" />
        <ChevronRight v-else class="h-4 w-4" />
      </button>
      <span v-else class="w-4" />

      <!-- 체크박스 -->
      <input
        v-if="selectable"
        type="checkbox"
        :id="`tree-node-${node.id}`"
        :checked="isChecked"
        class="border-tree-border text-checkbox-checked-bg focus:ring-primary h-4 w-4 rounded focus:ring-2"
        @change="toggleCheck"
      />

      <!-- 라벨 -->
      <label
        :for="selectable ? `tree-node-${node.id}` : undefined"
        :class="cn('text-tree-node-text flex-1 cursor-pointer text-sm leading-normal select-none')"
        @click="handleNodeClick"
      >
        {{ node.label }}
      </label>
    </div>

    <!-- 자식 노드 -->
    <ul v-if="hasChildren && isExpanded" class="mt-1">
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" :level="level + 1" />
    </ul>
  </li>
</template>
