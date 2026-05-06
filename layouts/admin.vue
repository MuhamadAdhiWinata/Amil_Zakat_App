<template>
  <div class="app-container flex flex-col bg-slate-50 min-h-screen">
    <div class="flex-1 pb-20">
      <slot />
    </div>

    <!-- Admin Bottom Nav -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-slate-200 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50 px-2 py-1 pb-safe-bottom">
      <div class="flex items-center justify-around">
        <NuxtLink to="/admin" class="flex flex-col items-center p-2 min-w-[64px] rounded-xl transition-all text-slate-500 hover:text-slate-800" exact-active-class="!text-primary">
          <LayoutDashboard class="w-6 h-6 mb-1" :class="{ 'fill-primary/20 text-primary': $route.path === '/admin' }" />
          <span class="text-[10px] font-medium">Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/admin/campaigns" class="flex flex-col items-center p-2 min-w-[64px] rounded-xl transition-all" :class="$route.path.startsWith('/admin/campaigns') ? 'text-primary' : 'text-slate-500 hover:text-slate-800'">
          <Megaphone class="w-6 h-6 mb-1" :class="{ 'fill-primary/20 text-primary': $route.path.startsWith('/admin/campaigns') }" />
          <span class="text-[10px] font-medium">Campaigns</span>
        </NuxtLink>

        <NuxtLink to="/admin/donations" class="flex flex-col items-center p-2 min-w-[64px] rounded-xl transition-all" :class="$route.path.startsWith('/admin/donations') ? 'text-primary' : 'text-slate-500 hover:text-slate-800'">
          <Receipt class="w-6 h-6 mb-1" :class="{ 'fill-primary/20 text-primary': $route.path.startsWith('/admin/donations') }" />
          <span class="text-[10px] font-medium">Donations</span>
        </NuxtLink>

        <NuxtLink to="/" class="flex flex-col items-center p-2 min-w-[64px] rounded-xl transition-all text-slate-500 hover:text-slate-800">
          <Home class="w-6 h-6 mb-1" />
          <span class="text-[10px] font-medium">Public</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, Megaphone, Receipt, Home } from 'lucide-vue-next'
</script>

<style scoped>
.pb-safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 4px);
}
</style>
