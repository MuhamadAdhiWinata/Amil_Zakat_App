<template>
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-[400px] pointer-events-none">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="bg-white rounded-xl shadow-lg border border-slate-100 p-4 flex items-start gap-3 pointer-events-auto"
      >
        <div class="shrink-0 pt-0.5">
          <CheckCircle2 v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500" />
          <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500" />
          <AlertTriangle v-else-if="toast.type === 'warning'" class="w-5 h-5 text-amber-500" />
          <Info v-else class="w-5 h-5 text-blue-500" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-slate-800">{{ toast.title }}</h4>
          <p v-if="toast.message" class="text-xs text-slate-500 mt-0.5">{{ toast.message }}</p>
        </div>
        <button @click="remove(toast.id)" class="shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>
