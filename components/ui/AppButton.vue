<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.98]',
      sizeClasses[size],
      variantClasses[variant],
      full ? 'w-full' : '',
      (disabled || loading) ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'
    ]"
    @click="handleClick"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ButtonSize
  full?: boolean
  disabled?: boolean
  loading?: boolean
  to?: string
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  full: false,
  disabled: false,
  loading: false,
  to: ''
})

const emit = defineEmits(['click'])

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3.5',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-teal-800',
  secondary: 'bg-emerald-50 text-primary hover:bg-emerald-100',
  outline: 'border-2 border-primary text-primary hover:bg-emerald-50',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  danger: 'bg-red-50 text-danger hover:bg-red-100',
}

const handleClick = (e: Event) => {
  if (props.disabled || props.loading) {
    e.preventDefault()
    return
  }
  
  if (props.to) {
    navigateTo(props.to)
    return
  }
  
  emit('click', e)
}
</script>
