/**
 * useTree 컴포저블
 * 트리 상태 관리
 */
import { ref, computed } from 'vue'

/**
 * 트리 노드 상태 관리 컴포저블
 * @param {Array} initialData - 초기 트리 데이터
 * @param {Array} defaultExpanded - 기본 펼침 노드 ID 배열
 * @returns {Object} 트리 상태 및 메서드
 */
export function useTree(initialData = [], defaultExpanded = []) {
  // 트리 데이터
  const treeData = ref(initialData)

  // 펼쳐진 노드 ID Set
  const expandedIds = ref(new Set(defaultExpanded))

  // 선택된 노드 ID
  const selectedId = ref(null)

  // 노드 펼침/접힘 토글
  const toggleExpand = (nodeId) => {
    if (expandedIds.value.has(nodeId)) {
      expandedIds.value.delete(nodeId)
    } else {
      expandedIds.value.add(nodeId)
    }
    // 반응성 유지를 위해 새 Set 생성
    expandedIds.value = new Set(expandedIds.value)
  }

  // 노드 펼침
  const expandNode = (nodeId) => {
    expandedIds.value.add(nodeId)
    expandedIds.value = new Set(expandedIds.value)
  }

  // 노드 접힘
  const collapseNode = (nodeId) => {
    expandedIds.value.delete(nodeId)
    expandedIds.value = new Set(expandedIds.value)
  }

  // 모든 노드 펼침
  const expandAll = () => {
    const collectIds = (nodes) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          expandedIds.value.add(node.id)
          collectIds(node.children)
        }
      })
    }
    collectIds(treeData.value)
    expandedIds.value = new Set(expandedIds.value)
  }

  // 모든 노드 접힘
  const collapseAll = () => {
    expandedIds.value = new Set()
  }

  // 노드 확장 여부 확인
  const isExpanded = (nodeId) => {
    return expandedIds.value.has(nodeId)
  }

  // 노드 선택
  const selectNode = (nodeId) => {
    selectedId.value = nodeId
  }

  // 노드 선택 해제
  const deselectNode = () => {
    selectedId.value = null
  }

  // 노드 선택 여부 확인
  const isSelected = (nodeId) => {
    return selectedId.value === nodeId
  }

  // 체크 상태 업데이트 (재귀)
  const updateCheckedState = (nodes, nodeId, checked) => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.checked = checked
        // 자식 노드들도 동일한 상태로 변경
        if (node.children) {
          setChildrenChecked(node.children, checked)
        }
        return true
      }
      if (node.children && updateCheckedState(node.children, nodeId, checked)) {
        // 부모 노드 체크 상태 업데이트
        updateParentCheckedState(treeData.value)
        return true
      }
    }
    return false
  }

  // 자식 노드 체크 상태 설정
  const setChildrenChecked = (children, checked) => {
    children.forEach((child) => {
      child.checked = checked
      if (child.children) {
        setChildrenChecked(child.children, checked)
      }
    })
  }

  // 부모 노드 체크 상태 업데이트
  const updateParentCheckedState = (nodes) => {
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        updateParentCheckedState(node.children)
        // 모든 자식이 체크되었는지 확인
        const allChecked = node.children.every((child) => child.checked === true)
        const someChecked = node.children.some(
          (child) => child.checked === true || child.checked === 'indeterminate',
        )

        if (allChecked) {
          node.checked = true
        } else if (someChecked) {
          node.checked = 'indeterminate'
        } else {
          node.checked = false
        }
      }
    })
  }

  // 체크박스 토글
  const toggleCheck = (nodeId) => {
    const findAndToggle = (nodes) => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          const newChecked = !node.checked
          node.checked = newChecked
          if (node.children) {
            setChildrenChecked(node.children, newChecked)
          }
          return true
        }
        if (node.children && findAndToggle(node.children)) {
          return true
        }
      }
      return false
    }

    if (findAndToggle(treeData.value)) {
      updateParentCheckedState(treeData.value)
      // 반응성 유지
      treeData.value = [...treeData.value]
    }
  }

  // 체크 상태 확인
  const isChecked = (nodeId) => {
    const findNode = (nodes) => {
      for (const node of nodes) {
        if (node.id === nodeId) return node.checked
        if (node.children) {
          const result = findNode(node.children)
          if (result !== undefined) return result
        }
      }
      return undefined
    }
    return findNode(treeData.value)
  }

  // 체크된 모든 노드 ID 가져오기
  const getCheckedIds = () => {
    const checkedIds = []
    const collectChecked = (nodes) => {
      nodes.forEach((node) => {
        if (node.checked === true) {
          checkedIds.push(node.id)
        }
        if (node.children) {
          collectChecked(node.children)
        }
      })
    }
    collectChecked(treeData.value)
    return checkedIds
  }

  // 노드 검색
  const findNode = (nodeId) => {
    const search = (nodes) => {
      for (const node of nodes) {
        if (node.id === nodeId) return node
        if (node.children) {
          const found = search(node.children)
          if (found) return found
        }
      }
      return null
    }
    return search(treeData.value)
  }

  // 트리 데이터 업데이트
  const setTreeData = (data) => {
    treeData.value = data
  }

  return {
    treeData,
    expandedIds,
    selectedId,
    toggleExpand,
    expandNode,
    collapseNode,
    expandAll,
    collapseAll,
    isExpanded,
    selectNode,
    deselectNode,
    isSelected,
    toggleCheck,
    isChecked,
    getCheckedIds,
    findNode,
    setTreeData,
  }
}
