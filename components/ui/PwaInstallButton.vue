<template>
  <button
    v-if="canInstall"
    @click="install"
    class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all"
    title="Install Aplikasi"
  >
    <Download class="w-4 h-4" />
  </button>
</template>

<script setup lang="ts">
import { Download } from 'lucide-vue-next'

const { canInstall, install } = usePwaInstall()
</script>
