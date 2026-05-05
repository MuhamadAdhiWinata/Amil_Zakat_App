<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
    <div class="w-full max-w-[420px] bg-white border-t border-slate-200 pointer-events-auto shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-safe-bottom">
      <div class="flex justify-around items-center h-16">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex flex-col items-center justify-center w-full h-full text-xs transition-colors duration-200"
          :class="route.path === item.path ? 'text-primary font-semibold' : 'text-slate-400 hover:text-slate-600'"
        >
          <component :is="item.icon" class="w-5 h-5 mb-1" :class="route.path === item.path ? 'stroke-[2.5px]' : 'stroke-2'" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, HandHeart, Clock, User } from 'lucide-vue-next'
const route = useRoute()

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Donasi', path: '/donasi', icon: HandHeart },
  { label: 'Riwayat', path: '/riwayat', icon: Clock },
  { label: 'Akun', path: '/akun', icon: User },
]
</script>

<style scoped>
.pb-safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
