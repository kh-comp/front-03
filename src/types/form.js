/**
 * 폼 필드 타입 정의
 */

/**
 * @typedef {Object} SearchField
 * @property {string} key - 필드 키 (v-model 바인딩용)
 * @property {string} label - 필드 라벨
 * @property {'text' | 'select'} type - 입력 타입
 * @property {string} [placeholder] - 플레이스홀더 텍스트
 * @property {Array<{value: string, label: string}>} [options] - select 옵션
 * @property {number} [colspan] - 그리드에서 차지할 컬럼 수
 * @property {boolean} [required] - 필수 여부
 * @property {boolean} [error] - 에러 상태
 */

/**
 * @typedef {Object} SelectOption
 * @property {string} value - 옵션 값
 * @property {string} label - 옵션 라벨
 */

export const FIELD_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  // 추후 확장
  // DATE: 'date',
  // NUMBER: 'number',
  // TEXTAREA: 'textarea',
}
