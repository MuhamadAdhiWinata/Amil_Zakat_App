<template>
  <header class="bg-white sticky top-0 z-40 border-b border-slate-100 shadow-sm pt-safe-top">
    <div class="flex items-center justify-between px-4 h-14">
      <div class="flex items-center space-x-2">
        <slot name="logo">
          <img src="~/assets/images/image.png" class="w-8 h-8 rounded-lg object-cover" alt="Baitulmall" />
          <span class="font-bold text-sm sm:text-base text-slate-800 tracking-tight truncate">{{ title }}</span>
        </slot>
      </div>
      <div class="flex items-center space-x-3">
        <UiPwaInstallButton />
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Baitulmall Bangun Rakyat Sejahtera'
})
</script>

<style scoped>
.pt-safe-top {
  padding-top: env(safe-area-inset-top);
}
</style>
