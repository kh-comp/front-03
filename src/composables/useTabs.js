/**
 * useTabs 컴포저블
 * 탭 상태 관리
 */
import { ref, computed, watch } from 'vue'

/**
 * 탭 상태 관리 컴포저블
 * @param {Array} tabs - 탭 배열 [{ id: string, label: string, disabled?: boolean }]
 * @param {String} defaultTab - 기본 활성 탭 ID
 * @returns {Object} 탭 상태 및 메서드
 */
export function useTabs(tabs = [], defaultTab = '') {
  // 현재 활성 탭
  const activeTab = ref(defaultTab || (tabs.length > 0 ? tabs[0].id : ''))

  // 탭 목록
  const tabList = ref(tabs)

  // 활성 탭 인덱스
  const activeIndex = computed(() => {
    return tabList.value.findIndex((tab) => tab.id === activeTab.value)
  })

  // 이전 탭 존재 여부
  const hasPrevTab = computed(() => activeIndex.value > 0)

  // 다음 탭 존재 여부
  const hasNextTab = computed(() => {
    const nextEnabledIndex = tabList.value.findIndex(
      (tab, index) => index > activeIndex.value && !tab.disabled,
    )
    return nextEnabledIndex !== -1
  })

  // 탭 활성화
  const setActiveTab = (tabId) => {
    const tab = tabList.value.find((t) => t.id === tabId)
    if (tab && !tab.disabled) {
      activeTab.value = tabId
    }
  }

  // 이전 탭으로 이동
  const goToPrevTab = () => {
    if (!hasPrevTab.value) return

    for (let i = activeIndex.value - 1; i >= 0; i--) {
      if (!tabList.value[i].disabled) {
        activeTab.value = tabList.value[i].id
        break
      }
    }
  }

  // 다음 탭으로 이동
  const goToNextTab = () => {
    if (!hasNextTab.value) return

    for (let i = activeIndex.value + 1; i < tabList.value.length; i++) {
      if (!tabList.value[i].disabled) {
        activeTab.value = tabList.value[i].id
        break
      }
    }
  }

  // 첫 번째 탭으로 이동
  const goToFirstTab = () => {
    const firstEnabled = tabList.value.find((tab) => !tab.disabled)
    if (firstEnabled) {
      activeTab.value = firstEnabled.id
    }
  }

  // 마지막 탭으로 이동
  const goToLastTab = () => {
    for (let i = tabList.value.length - 1; i >= 0; i--) {
      if (!tabList.value[i].disabled) {
        activeTab.value = tabList.value[i].id
        break
      }
    }
  }

  // 탭 활성화 여부 확인
  const isActive = (tabId) => {
    return activeTab.value === tabId
  }

  // 탭 추가
  const addTab = (tab) => {
    tabList.value.push(tab)
  }

  // 탭 제거
  const removeTab = (tabId) => {
    const index = tabList.value.findIndex((t) => t.id === tabId)
    if (index > -1) {
      tabList.value.splice(index, 1)

      // 현재 활성 탭이 제거된 경우 첫 번째 탭으로 이동
      if (activeTab.value === tabId) {
        goToFirstTab()
      }
    }
  }

  return {
    activeTab,
    tabList,
    activeIndex,
    hasPrevTab,
    hasNextTab,
    setActiveTab,
    goToPrevTab,
    goToNextTab,
    goToFirstTab,
    goToLastTab,
    isActive,
    addTab,
    removeTab,
  }
}
