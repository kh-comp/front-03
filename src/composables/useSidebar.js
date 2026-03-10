/**
 * 사이드바 상태 관리 Composable
 * 사이드바 열기/닫기 및 메뉴 펼침/접힘 상태 관리
 */
import { ref } from 'vue'

// 전역 상태 (싱글톤 패턴)
const isOpen = ref(true)
const expandedMenuId = ref(null)

/**
 * 사이드바 상태 관리 훅
 * @returns {Object} 사이드바 상태 및 제어 함수
 */
export function useSidebar() {
  /**
   * 사이드바 토글
   */
  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  /**
   * 사이드바 열기
   */
  const open = () => {
    isOpen.value = true
  }

  /**
   * 사이드바 닫기
   */
  const close = () => {
    isOpen.value = false
  }

  /**
   * 메뉴 펼침/접힘 토글
   * @param {string} menuId - 메뉴 ID
   */
  const toggleMenu = (menuId) => {
    expandedMenuId.value = expandedMenuId.value === menuId ? null : menuId
  }

  /**
   * 특정 메뉴가 펼쳐져 있는지 확인
   * @param {string} menuId - 메뉴 ID
   * @returns {boolean} 펼쳐져 있으면 true
   */
  const isMenuExpanded = (menuId) => {
    return expandedMenuId.value === menuId
  }

  return {
    isOpen,
    toggle,
    open,
    close,
    expandedMenuId,
    toggleMenu,
    isMenuExpanded,
  }
}
