import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스를 병합하고 조건부로 적용하는 유틸리티 함수
 * clsx: 조건부 클래스 적용 지원
 * twMerge: 중복/충돌 클래스 자동 병합
 *
 * @param {...(string|undefined|null|boolean|Object)} inputs - 클래스명들
 * @returns {string} 병합된 클래스명
 *
 * @example
 * cn('flex', 'items-center') // 'flex items-center'
 * cn('px-4', isActive && 'bg-blue') // 조건부 적용
 * cn('p-4', 'p-2') // 'p-2' (충돌 시 나중이 우선)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
