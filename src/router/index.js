import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        // 기준정보관리
        {
          path: 'standard-info/engine-type',
          name: 'engine-type',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'standard-info/engine-mc',
          name: 'engine-mc',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'standard-info/engine-uc',
          name: 'engine-uc',
          component: () => import('@/views/HomeView.vue'),
        },
        // 샘플 페이지
        {
          path: 'sample/sample-1',
          name: 'sample-1',
          component: () => import('@/views/sample/SampleView1.vue'),
        },
        {
          path: 'sample/sample-2',
          name: 'sample-2',
          component: () => import('@/views/sample/SampleView2.vue'),
        },
        // TODO: 나머지 라우트는 해당 페이지 컴포넌트 생성 시 추가
      ],
    },
    // 로그인 페이지 (레이아웃 미적용)
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
  ],
})

export default router
