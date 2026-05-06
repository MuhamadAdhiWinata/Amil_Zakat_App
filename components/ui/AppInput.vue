<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-slate-700 mb-1">{{ label }}</label>
    <div class="relative">
      <div v-if="prefix" class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span class="text-slate-500 font-bold" :class="prefixClass">{{ prefix }}</span>
      </div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as any).value)"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        class="block w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        :class="[
          inputClass,
          prefix ? 'pl-12 pr-4 py-3' : 'px-4 py-3 text-sm'
        ]"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  prefix?: string
  prefixClass?: string
  inputClass?: string
}>()

defineEmits(['update:modelValue'])
</script>
