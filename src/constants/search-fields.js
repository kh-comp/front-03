/**
 * 엔진 UC 관리 검색 필드 정의
 * @type {import('@/types/form').SearchField[]}
 */
export const ENGINE_UC_SEARCH_FIELDS = [
  {
    key: 'ucName',
    label: 'UC Name',
    type: 'text',
    placeholder: 'UC Name을 입력하세요',
  },
  {
    key: 'item',
    label: 'Item',
    type: 'text',
    placeholder: 'Item을 입력하세요',
  },
  {
    key: 'instanceNumber',
    label: 'Instance Number',
    type: 'text',
    placeholder: 'Instance Number를 입력하세요',
  },
  {
    key: 'serialNumber',
    label: 'Serial Number',
    type: 'text',
    placeholder: 'Serial Number를 입력하세요',
  },
  {
    key: 'lotNumber',
    label: 'Lot Number',
    type: 'text',
    placeholder: 'Lot Number를 입력하세요',
  },
  {
    key: 'ucStatus',
    label: 'UC Status',
    type: 'select',
    options: [
      { value: '', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    key: 'mcName',
    label: 'MC Name',
    type: 'text',
    placeholder: 'MC Name을 입력하세요',
  },
  {
    key: 'mcStatus',
    label: 'MC Status',
    type: 'select',
    options: [
      { value: '', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    key: 'searchFor',
    label: 'Search for',
    type: 'select',
    options: [
      { value: '', label: 'All' },
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
  {
    key: 'mcRevision',
    label: 'MC Revision',
    type: 'text',
    placeholder: 'MC Revision을 입력하세요',
  },
]
