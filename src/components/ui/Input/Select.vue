<script setup>
/**
 * Select 컴포넌트
 * Reka UI 기반 공용 선택 필드
 */
import { cn } from '@/lib/utils'
import { Check, ChevronDown, X } from 'lucide-vue-next'
import { computed, useAttrs } from 'vue'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

defineOptions({
  inheritAttrs: false,
})

const EMPTY_SENTINEL = '__REKA_EMPTY_VALUE__'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '선택하세요',
  },
  allowEmpty: {
    type: Boolean,
    default: true,
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
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
const attrs = useAttrs()

const normalizedOptions = computed(() =>
  props.options.map((option, index) => {
    const isEmpty = String(option.value ?? '') === ''

    return {
      key: `${index}-${String(option.value ?? '')}`,
      label: option.label,
      originalValue: option.value,
      value: isEmpty ? EMPTY_SENTINEL : String(option.value),
      isEmpty,
    }
  }),
)

const hasEmptyOption = computed(() =>
  normalizedOptions.value.some((option) => option.isEmpty),
)

const selectedOption = computed(() => {
  const currentValue = String(props.modelValue ?? '')

  return normalizedOptions.value.find((option) => {
    if (option.isEmpty) {
      return currentValue === ''
    }

    return option.value === currentValue
  })
})

const rekaModelValue = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.value
  }

  return undefined
})

const hasValue = computed(() => String(props.modelValue ?? '') !== '')
const canClear = computed(() => props.allowEmpty && hasValue.value && !props.disabled && !props.readonly)
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

const selectClass = computed(() =>
  cn(
    'flex h-size-md w-full items-center rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm shadow-sm',
    'ring-offset-background transition-[border-color,box-shadow,background-color,color] duration-200',
    'hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input disabled:hover:bg-background',
    'data-[placeholder]:text-muted-foreground',
    props.error && 'border-destructive focus-visible:ring-destructive',
    hasValue.value ? 'font-medium text-foreground' : 'text-muted-foreground',
    props.class,
  ),
)

const contentClass = computed(() =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ),
)

function handleValueChange(value) {
  const nextOption = normalizedOptions.value.find((option) => option.value === value)

  if (nextOption) {
    emit('update:modelValue', nextOption.originalValue)
    emit('change', nextOption.originalValue)
    return
  }

  emit('update:modelValue', '')
  emit('change', '')
}

function clearValue() {
  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<template>
  <div class="w-full">
    <SelectRoot
      :model-value="rekaModelValue"
      :disabled="disabled || readonly"
      :name="name || undefined"
      @update:model-value="handleValueChange"
    >
      <div class="group relative w-full">
        <SelectTrigger
          v-bind="attrs"
          :id="id"
          :class="selectClass"
          :aria-invalid="error ? 'true' : 'false'"
          :aria-describedby="describedBy"
        >
          <SelectValue :placeholder="placeholder" />
          <SelectIcon as-child>
            <div
              class="pointer-events-none absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[0.4rem] border border-border/70 bg-muted/65 text-muted-foreground shadow-sm transition-colors duration-200 group-hover:border-foreground/10 group-focus-within:border-ring/30"
            >
              <ChevronDown class="h-3.5 w-3.5" />
            </div>
          </SelectIcon>
        </SelectTrigger>

        <button
          v-if="canClear"
          type="button"
          class="absolute top-1/2 right-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click.stop="clearValue"
        >
          <X class="h-3.5 w-3.5" />
        </button>
      </div>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="6"
          class="w-[var(--reka-select-trigger-width)]"
          :class="contentClass"
        >
          <SelectViewport class="p-1">
            <SelectItem
              v-for="option in normalizedOptions"
              :key="option.key"
              :value="option.value"
              class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 data-[state=checked]:font-medium"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
              <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectItemIndicator>
                  <Check class="h-3.5 w-3.5" />
                </SelectItemIndicator>
              </span>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

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
