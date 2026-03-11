<script setup>
/**
 * Reka UI 기반 DateRangePicker 프로토타입
 * 프로젝트 외부 API는 ISO 문자열을 유지하고 내부에서만 CalendarDate로 변환한다.
 */
import { parseDate } from '@internationalized/date'
import { cn } from '@/lib/utils'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { computed, useAttrs } from 'vue'
import {
  DateRangePickerAnchor,
  DateRangePickerCalendar,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
  DateRangePickerContent,
  DateRangePickerGrid,
  DateRangePickerGridBody,
  DateRangePickerGridHead,
  DateRangePickerGridRow,
  DateRangePickerHeadCell,
  DateRangePickerNext,
  DateRangePickerPrev,
  DateRangePickerRoot,
  DateRangePickerTrigger,
} from 'reka-ui'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '기간을 선택하세요',
  },
  min: {
    type: String,
    default: '',
  },
  max: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  ariaDescribedby: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  startName: {
    type: String,
    default: '',
  },
  endName: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:startDate', 'update:endDate', 'change'])
const attrs = useAttrs()

const displayFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
})

const pickerValue = computed(() => ({
  start: parseIsoDate(props.startDate),
  end: parseIsoDate(props.endDate),
}))

const minValue = computed(() => parseIsoDate(props.min))
const maxValue = computed(() => parseIsoDate(props.max))
const hasValue = computed(() => Boolean(props.startDate || props.endDate))
const triggerId = computed(() => props.id || undefined)
const startInputName = computed(() => props.startName || (props.name ? `${props.name}Start` : ''))
const endInputName = computed(() => props.endName || (props.name ? `${props.name}End` : ''))
const errorMessageId = computed(() =>
  props.id && props.errorMessage ? `${props.id}-error` : '',
)
const helperTextId = computed(() =>
  props.id && props.helperText ? `${props.id}-description` : '',
)
const describedBy = computed(() => {
  const ids = [props.ariaDescribedby, errorMessageId.value || helperTextId.value].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
})
const fieldLabel = computed(() => {
  if (props.startDate && props.endDate) {
    return `선택된 기간 ${formattedRange.value}`
  }

  return props.placeholder
})
const formattedRange = computed(() => {
  const start = formatDisplayDate(props.startDate)
  const end = formatDisplayDate(props.endDate)

  if (start && end) {
    return `${start} - ${end}`
  }

  if (start) {
    return `${start} - 종료일 선택`
  }

  if (end) {
    return `시작일 선택 - ${end}`
  }

  return props.placeholder
})

const triggerClass = computed(() =>
  cn(
    'flex h-size-md w-full items-center rounded-md border border-input bg-background px-3 py-2 pr-20 text-left text-sm shadow-sm',
    'ring-offset-background transition-[border-color,box-shadow,background-color,color] duration-200',
    'hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input disabled:hover:bg-background',
    props.error && 'border-destructive focus-visible:ring-destructive',
    hasValue.value ? 'font-medium text-foreground' : 'text-muted-foreground',
    props.class,
  ),
)

function parseIsoDate(value) {
  if (!value) {
    return undefined
  }

  try {
    return parseDate(value)
  } catch {
    return undefined
  }
}

function serializeDate(value) {
  return value?.toString?.() ?? ''
}

function formatDisplayDate(value) {
  const parsed = parseIsoDate(value)

  if (!parsed) {
    return ''
  }

  return displayFormatter.format(parsed.toDate('Asia/Seoul'))
}

function formatMonthLabel(value) {
  return monthFormatter.format(value.toDate('Asia/Seoul'))
}

function handleUpdate(value) {
  const nextStartDate = serializeDate(value?.start)
  const nextEndDate = serializeDate(value?.end)

  emit('update:startDate', nextStartDate)
  emit('update:endDate', nextEndDate)
  emit('change', { startDate: nextStartDate, endDate: nextEndDate })
}

function clearRange() {
  emit('update:startDate', '')
  emit('update:endDate', '')
  emit('change', { startDate: '', endDate: '' })
}
</script>

<template>
  <DateRangePickerRoot
    :model-value="pickerValue"
    :min-value="minValue"
    :max-value="maxValue"
    :disabled="disabled"
    :readonly="readonly"
    :close-on-select="true"
    :number-of-months="2"
    @update:model-value="handleUpdate"
  >
    <DateRangePickerAnchor as-child>
      <div class="group relative w-full">
        <DateRangePickerTrigger as-child>
          <button
            v-bind="attrs"
            :id="triggerId"
            type="button"
            :disabled="disabled"
            :class="triggerClass"
            :aria-invalid="error ? 'true' : 'false'"
            :aria-describedby="describedBy"
            :aria-label="fieldLabel"
          >
            <span class="truncate">{{ formattedRange }}</span>
          </button>
        </DateRangePickerTrigger>

        <button
          v-if="hasValue && !disabled && !readonly"
          type="button"
          class="absolute top-1/2 right-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click.stop="clearRange"
        >
          <X class="h-3.5 w-3.5" />
        </button>

        <div
          class="pointer-events-none absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[0.4rem] border border-border/70 bg-muted/65 text-muted-foreground shadow-sm transition-colors duration-200 group-hover:border-foreground/10 group-hover:bg-accent group-focus-within:border-ring/30 group-focus-within:bg-primary/5"
        >
          <CalendarDays class="h-3.5 w-3.5" />
        </div>
      </div>
    </DateRangePickerAnchor>

    <input
      v-if="startInputName"
      type="hidden"
      :name="startInputName"
      :value="startDate"
    />
    <input
      v-if="endInputName"
      type="hidden"
      :name="endInputName"
      :value="endDate"
    />

    <DateRangePickerContent
      :side-offset="10"
      align="start"
      class="z-50 w-[min(92vw,620px)] rounded-xl border border-border bg-background p-3 shadow-lg outline-none"
    >
      <DateRangePickerCalendar v-slot="{ weekDays, grid }">
        <div class="mb-3 flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Date range</p>
            <p class="mt-1 text-sm text-muted-foreground">기간을 선택하세요</p>
          </div>

          <div class="flex items-center gap-2">
            <DateRangePickerPrev
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronLeft class="h-4 w-4" />
            </DateRangePickerPrev>
            <DateRangePickerNext
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronRight class="h-4 w-4" />
            </DateRangePickerNext>
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="month in grid"
            :key="month.value.toString()"
            class="rounded-lg border border-border bg-background p-2.5"
          >
            <div class="mb-2 text-sm font-semibold text-foreground">
              {{ formatMonthLabel(month.value) }}
            </div>

            <DateRangePickerGrid class="w-full border-separate border-spacing-y-0.5">
              <DateRangePickerGridHead>
                <DateRangePickerGridRow>
                  <DateRangePickerHeadCell
                    v-for="weekDay in weekDays"
                    :key="weekDay"
                    class="pb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {{ weekDay }}
                  </DateRangePickerHeadCell>
                </DateRangePickerGridRow>
              </DateRangePickerGridHead>

              <DateRangePickerGridBody>
                <DateRangePickerGridRow v-for="(week, weekIndex) in month.rows" :key="weekIndex">
                  <DateRangePickerCell v-for="dateValue in week" :key="dateValue.toString()" :date="dateValue">
                    <DateRangePickerCellTrigger
                      :day="dateValue"
                      :month="month.value"
                      as-child
                      v-slot="{
                        disabled: dayDisabled,
                        highlighted,
                        outsideView,
                        selectionEnd,
                        selectionStart,
                        selected,
                        today,
                      }"
                    >
                      <button
                        type="button"
                        :data-disabled="dayDisabled ? '' : undefined"
                        :data-highlighted="highlighted ? '' : undefined"
                        :data-outside-view="outsideView ? '' : undefined"
                        :data-selected="selected ? '' : undefined"
                        :data-selection-end="selectionEnd ? '' : undefined"
                        :data-selection-start="selectionStart ? '' : undefined"
                        :data-today="today ? '' : undefined"
                        class="flex h-8 w-8 items-center justify-center rounded-md text-xs text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[outside-view]:text-muted-foreground/40 data-[today]:border data-[today]:border-border data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[selected]:bg-accent data-[selected]:font-semibold data-[selected]:text-accent-foreground data-[selection-start]:rounded-l-lg data-[selection-end]:rounded-r-lg data-[disabled]:cursor-not-allowed data-[disabled]:opacity-35 data-[disabled]:hover:bg-transparent hover:bg-accent hover:text-accent-foreground data-[selected]:hover:bg-accent data-[disabled]:hover:text-inherit"
                      >
                        {{ dateValue.day }}
                      </button>
                    </DateRangePickerCellTrigger>
                  </DateRangePickerCell>
                </DateRangePickerGridRow>
              </DateRangePickerGridBody>
            </DateRangePickerGrid>
          </div>
        </div>
      </DateRangePickerCalendar>

      <div
        class="mt-3 flex flex-col gap-2 border-t border-border pt-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
      >
        <p class="truncate">
          {{ formattedRange }}
        </p>
        <button
          v-if="hasValue && !disabled && !readonly"
          type="button"
          class="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 font-medium text-foreground transition-colors hover:bg-accent"
          @click="clearRange"
        >
          전체 초기화
        </button>
      </div>
    </DateRangePickerContent>
  </DateRangePickerRoot>

  <p
    v-if="errorMessage"
    :id="errorMessageId"
    class="mt-2 text-sm text-destructive"
  >
    {{ errorMessage }}
  </p>
  <p
    v-else-if="helperText"
    :id="helperTextId"
    class="mt-2 text-sm text-muted-foreground"
  >
    {{ helperText }}
  </p>
</template>
