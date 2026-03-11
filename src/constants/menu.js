/**
 * 사이드바 메뉴 데이터
 * 대한항공 사내시스템 메뉴 구조
 */
import {
  Settings,
  FileText,
  CalendarCheck,
  Package,
  Wrench,
  Hammer,
  LayoutDashboard,
  FlaskConical,
} from 'lucide-vue-next'

export const MENU_ITEMS = [
  {
    id: 'standard-info',
    title: '기준정보관리',
    icon: Settings,
    children: [
      { id: 'engine-type', title: '엔진Type관리', path: '/standard-info/engine-type' },
      { id: 'engine-mc', title: '엔진MC관리', path: '/standard-info/engine-mc' },
      { id: 'engine-uc', title: '엔진UC관리', path: '/standard-info/engine-uc' },
      { id: 'rack', title: 'Rack관리', path: '/standard-info/rack' },
      { id: 'operation', title: 'Operation관리', path: '/standard-info/operation' },
      { id: 'route', title: 'Route관리', path: '/standard-info/route' },
      { id: 'mr', title: 'MR관리', path: '/standard-info/mr' },
    ],
  },
  {
    id: 'common',
    title: '공통관리',
    icon: FileText,
    children: [
      { id: 'common-code', title: '공통코드관리', path: '/common/code' },
      { id: 'common-user', title: '사용자관리', path: '/common/user' },
    ],
  },
  {
    id: 'maintenance-plan',
    title: '정비계획관리',
    icon: CalendarCheck,
    children: [
      { id: 'maintenance-schedule', title: '정비일정관리', path: '/maintenance-plan/schedule' },
      { id: 'maintenance-history', title: '정비이력관리', path: '/maintenance-plan/history' },
    ],
  },
  {
    id: 'engine-inout',
    title: '엔진입출고관리',
    icon: Package,
    children: [
      { id: 'engine-in', title: '엔진입고', path: '/engine-inout/in' },
      { id: 'engine-out', title: '엔진출고', path: '/engine-inout/out' },
    ],
  },
  {
    id: 'work',
    title: '작업관리',
    icon: Wrench,
    children: [
      { id: 'work-order', title: '작업지시', path: '/work/order' },
      { id: 'work-progress', title: '작업진행', path: '/work/progress' },
    ],
  },
  {
    id: 'tool',
    title: '공구관리',
    icon: Hammer,
    children: [
      { id: 'tool-list', title: '공구목록', path: '/tool/list' },
      { id: 'tool-rental', title: '공구대여', path: '/tool/rental' },
    ],
  },
  {
    id: 'dashboard',
    title: '대시보드관리',
    icon: LayoutDashboard,
    children: [
      { id: 'dashboard-main', title: '대시보드', path: '/dashboard' },
      { id: 'dashboard-stats', title: '통계', path: '/dashboard/stats' },
    ],
  },
  {
    id: 'sample',
    title: '샘플페이지',
    icon: FlaskConical,
    children: [
      { id: 'sample-1', title: '샘플페이지-1', path: '/sample/sample-1' },
      { id: 'sample-2', title: '샘플페이지-2', path: '/sample/sample-2' },
      { id: 'sample-3', title: '샘플페이지-3', path: '/sample/sample-3' },
      { id: 'sample-component', title: 'component', path: '/sample/component' },
      { id: 'sample-data-table', title: 'data table', path: '/sample/data-table' },
    ],
  },
]
