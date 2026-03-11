<script setup>
  /**
   * Button 컴포넌트
   * CVA(class-variance-authority)를 사용한 버튼 변형 정의
   */
  import { cn } from '@/lib/utils'
  import { cva } from 'class-variance-authority'
  import { computed } from 'vue'
  import { Loader2 } from 'lucide-vue-next'

  // CVA 버튼 변형 정의
  const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      variants: {
        variant: {
          default: 'bg-brand text-white hover:bg-brand-hover',
          secondary: 'bg-brand-accent text-white hover:bg-brand-hover',
          outline: 'border border-brand text-brand hover:bg-brand-light font-semibold bg-white',
          ghost: 'hover:bg-brand-light hover:text-brand',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          link: 'text-brand underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-size-md px-4 py-2',
          sm: 'h-size-sm rounded-md px-3',
          lg: 'h-size-lg rounded-md px-8',
          icon: 'h-size-md w-size-md',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
  )

  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
      validator: (value) =>
        ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'].includes(value),
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'sm', 'lg', 'icon'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    class: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['click'])

  // 로딩 상태일 때도 disabled 처리
  const isDisabled = computed(() => props.disabled || props.loading)

  // 클릭 핸들러
  const handleClick = (event) => {
    if (!isDisabled.value) {
      emit('click', event)
    }
  }
</script>

<template>
  <button
    :type="type"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>
