<script setup>
/**
 * DatePicker 컴포넌트
 * Reka UI 기반 단일 날짜 선택 필드
 */
import { parseDate } from '@internationalized/date'
import { cn } from '@/lib/utils'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { computed, useAttrs } from 'vue'
import {
  DatePickerAnchor,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '날짜를 선택하세요',
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
  min: {
    type: String,
    default: '',
  },
  max: {
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
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])
const attrs = useAttrs()

const displayFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const monthFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
})

const pickerValue = computed(() => parseIsoDate(props.modelValue))
const minValue = computed(() => parseIsoDate(props.min))
const maxValue = computed(() => parseIsoDate(props.max))
const hasValue = computed(() => Boolean(props.modelValue))
const formattedDate = computed(() => formatDisplayDate(props.modelValue) || props.placeholder)
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

const datePickerClass = computed(() =>
  cn(
    'flex h-size-md w-full items-center rounded-md border border-input bg-background px-3 py-2 pr-18 text-left text-sm shadow-sm',
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

  return displayFormatter.format(parsed.toDate('Asia/Seoul')).replace(/\.\s?/g, '-').replace(/-$/, '')
}

function formatMonthLabel(value) {
  return monthFormatter.format(value.toDate('Asia/Seoul'))
}

function handleUpdate(value) {
  const nextValue = serializeDate(value)
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}

function handleFocus(event) {
  emit('focus', event)
}

function handleBlur(event) {
  emit('blur', event)
}

function clearValue() {
  if (props.disabled || props.readonly) {
    return
  }

  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<template>
  <div class="w-full">
    <DatePickerRoot
      :model-value="pickerValue"
      :min-value="minValue"
      :max-value="maxValue"
      :disabled="disabled"
      :readonly="readonly"
      :close-on-select="true"
      @update:model-value="handleUpdate"
    >
      <DatePickerAnchor as-child>
        <div class="group relative w-full">
          <DatePickerTrigger as-child>
            <button
              v-bind="attrs"
              :id="id"
              type="button"
              :disabled="disabled"
              :class="datePickerClass"
              :aria-invalid="error ? 'true' : 'false'"
              :aria-describedby="describedBy"
              :aria-label="hasValue ? `선택된 날짜 ${formattedDate}` : placeholder"
              @focus="handleFocus"
              @blur="handleBlur"
            >
              <span class="truncate">{{ formattedDate }}</span>
            </button>
          </DatePickerTrigger>

          <button
            v-if="hasValue && !disabled && !readonly"
            type="button"
            class="absolute top-1/2 right-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            @click.stop="clearValue"
          >
            <X class="h-3.5 w-3.5" />
          </button>

          <div
            class="pointer-events-none absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[0.4rem] border border-border/70 bg-muted/65 text-muted-foreground shadow-sm transition-colors duration-200 group-hover:border-foreground/10 group-focus-within:border-ring/30 disabled:opacity-50"
          >
            <CalendarDays class="h-3.5 w-3.5" />
          </div>
        </div>
      </DatePickerAnchor>

      <input
        v-if="name"
        type="hidden"
        :name="name"
        :value="modelValue"
      />

      <DatePickerContent
        :side-offset="10"
        align="start"
        class="z-50 w-[min(92vw,320px)] rounded-xl border border-border bg-background p-3 shadow-lg outline-none"
      >
        <DatePickerCalendar v-slot="{ weekDays, grid }">
          <div class="mb-3 flex items-center justify-between gap-3">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Date
            </p>

            <div class="flex items-center gap-2">
              <DatePickerPrev
                class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ChevronLeft class="h-4 w-4" />
              </DatePickerPrev>
              <DatePickerNext
                class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ChevronRight class="h-4 w-4" />
              </DatePickerNext>
            </div>
          </div>

          <div
            v-for="month in grid"
            :key="month.value.toString()"
            class="rounded-lg border border-border bg-background p-2.5"
          >
            <div class="mb-2 text-sm font-semibold text-foreground">
              {{ formatMonthLabel(month.value) }}
            </div>

            <DatePickerGrid class="w-full border-separate border-spacing-y-0.5">
              <DatePickerGridHead>
                <DatePickerGridRow>
                  <DatePickerHeadCell
                    v-for="weekDay in weekDays"
                    :key="weekDay"
                    class="pb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {{ weekDay }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>

              <DatePickerGridBody>
                <DatePickerGridRow v-for="(week, weekIndex) in month.rows" :key="weekIndex">
                  <DatePickerCell v-for="dateValue in week" :key="dateValue.toString()" :date="dateValue">
                    <DatePickerCellTrigger
                      :day="dateValue"
                      :month="month.value"
                      as-child
                      v-slot="{ disabled: dayDisabled, outsideView, selected, today }"
                    >
                      <button
                        type="button"
                        :data-disabled="dayDisabled ? '' : undefined"
                        :data-outside-view="outsideView ? '' : undefined"
                        :data-selected="selected ? '' : undefined"
                        :data-today="today ? '' : undefined"
                        class="flex h-8 w-8 items-center justify-center rounded-md text-xs text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[outside-view]:text-muted-foreground/40 data-[today]:border data-[today]:border-border data-[selected]:bg-accent data-[selected]:font-semibold data-[selected]:text-accent-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-35 data-[disabled]:hover:bg-transparent hover:bg-accent hover:text-accent-foreground data-[selected]:hover:bg-accent data-[disabled]:hover:text-inherit"
                      >
                        {{ dateValue.day }}
                      </button>
                    </DatePickerCellTrigger>
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>

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
  </div>
</template>
