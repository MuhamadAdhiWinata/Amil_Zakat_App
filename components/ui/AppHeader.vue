<template>
  <header class="bg-white sticky top-0 z-40 border-b border-slate-100 shadow-sm pt-safe-top">
    <div class="flex items-center justify-between px-4 h-14">
      <div class="flex items-center space-x-2">
        <slot name="logo">
          <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
            A
          </div>
          <span class="font-bold text-lg text-slate-800 tracking-tight">{{ title }}</span>
        </slot>
      </div>
      <div class="flex items-center space-x-3">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Amil Zakat'
})
</script>

<style scoped>
.pt-safe-top {
  padding-top: env(safe-area-inset-top);
}
</style>
