<template>
  <div>
    <UiAppHeader title="Admin Dashboard" />
    
    <div class="p-4 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h3 class="text-sm font-bold text-slate-500 mb-1">Total Campaign</h3>
          <p class="text-2xl font-bold text-slate-800">{{ campaigns?.length || 0 }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h3 class="text-sm font-bold text-slate-500 mb-1">Total Donasi</h3>
          <p class="text-2xl font-bold text-slate-800">{{ donations?.length || 0 }}</p>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-4 border-b border-slate-100 bg-slate-50">
          <h3 class="font-bold text-slate-800">Menu Cepat</h3>
        </div>
        <div class="p-2 flex flex-col gap-2">
          <NuxtLink to="/admin/campaigns/create" class="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Plus class="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div class="font-bold text-slate-800 text-sm">Buat Campaign Baru</div>
              <div class="text-xs text-slate-500">Mulai penggalangan dana baru</div>
            </div>
            <ChevronRight class="w-5 h-5 text-slate-400 ml-auto" />
          </NuxtLink>
          
          <NuxtLink to="/admin/donations" class="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Receipt class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div class="font-bold text-slate-800 text-sm">Lihat Transaksi</div>
              <div class="text-xs text-slate-500">Cek status donasi masuk</div>
            </div>
            <ChevronRight class="w-5 h-5 text-slate-400 ml-auto" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Receipt, ChevronRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: campaigns } = useFetch('/api/campaigns')
const { data: donations } = useFetch('/api/admin/donations')
</script>
