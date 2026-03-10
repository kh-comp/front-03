<script setup>
/**
 * 사이드바 메뉴 아이템 컴포넌트
 * publish-sample/web/common.html 기반 재작성
 * 1depth (펼침/접힘) + 2depth 서브메뉴
 */
import { cn } from '@/lib/utils'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSidebar } from '@/composables/useSidebar'

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()
const { expandedMenuId, toggleMenu } = useSidebar()

// 메뉴 펼침 상태
const isExpanded = computed(() => expandedMenuId.value === props.menu.id)

// 1depth 메뉴 활성화 여부 (자식 중 현재 경로가 있는지)
const isParentActive = computed(() => {
  if (props.menu.children) {
    return props.menu.children.some((child) => route.path === child.path)
  }
  return false
})

// 1depth 메뉴 클릭 핸들러
const handleDep1Click = () => {
  if (props.menu.children?.length) {
    toggleMenu(props.menu.id)
  } else if (props.menu.path) {
    router.push(props.menu.path)
  }
}

// 2depth 메뉴 활성화 여부
const isActiveDep2 = (path) => {
  return route.path === path
}
</script>

<template>
  <li :class="cn('dep1-1', isExpanded && 'on')">
    <!-- 1depth 메뉴 버튼 -->
    <button
      type="button"
      :class="
        cn(
          'lnb-dep1',
          'w-full inline-flex items-center justify-between',
          'px-3 py-3',
          'text-base font-medium text-lnb-text',
          'rounded-lg',
          'hover:bg-lnb-bg-hover hover:text-white',
          'transition-all duration-200',
          isExpanded && 'bg-lnb-bg-hover text-white',
          isParentActive && 'text-white'
        )
      "
      @click="handleDep1Click"
    >
      <span class="flex items-center gap-3">
        <component :is="menu.icon" v-if="menu.icon" class="w-5 h-5 shrink-0" />
        <span>{{ menu.title }}</span>
      </span>
      <!-- 화살표 아이콘 (2depth 있는 경우만) -->
      <svg
        v-if="menu.children?.length"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0 transition-transform duration-200"
        :class="isExpanded && 'rotate-180'"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <!-- 2depth 서브메뉴 -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul
        v-show="isExpanded && menu.children?.length"
        class="dep2 mt-2 bg-white/10 rounded-lg p-2"
      >
        <li
          v-for="child in menu.children"
          :key="child.id"
          class="no-bg"
        >
          <RouterLink
            :to="child.path"
            :class="
              cn(
                'lnb-dep2',
                'block w-full',
                'px-3 py-2 pl-4',
                'text-sm font-normal text-lnb-text',
                'rounded-md',
                'hover:bg-white/10 hover:text-white',
                'transition-all duration-200',
                isActiveDep2(child.path) && 'text-white font-medium bg-white/15',
                isActiveDep2(child.path) && 'before:content-[\'\'] before:inline-block before:w-0 before:h-0 before:mr-2 before:border-l-[8px] before:border-l-white before:border-t-[5px] before:border-t-transparent before:border-b-[5px] before:border-b-transparent'
              )
            "
          >
            {{ child.title }}
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
/* 2depth 서브메뉴 활성 상태 화살표 마커 */
:deep(.router-link-active) {
  color: white;
  font-weight: 500;
}

/* 활성 상태 before 가상요소 */
:deep(.router-link-active)::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  margin-right: 8px;
  border-left: 8px solid white;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
</style>
