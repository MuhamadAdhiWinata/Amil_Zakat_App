<template>
  <div 
    class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300"
    :class="hover ? 'hover:shadow-md hover:border-slate-200' : ''"
  >
    <div v-if="$slots.image" class="w-full aspect-[4/3] relative overflow-hidden bg-slate-100">
      <slot name="image" />
    </div>
    <div :class="noPadding ? '' : 'p-4'">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  hover?: boolean
  noPadding?: boolean
}>(), {
  hover: false,
  noPadding: false
})
</script>
