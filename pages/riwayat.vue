<template>
  <div class="pb-24 min-h-screen bg-slate-50">
    <UiAppHeader title="Riwayat Donasi" />

    <div class="p-4">
      <div v-if="pending" class="flex justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
      
      <div v-else-if="!isLoggedIn" class="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <Lock class="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 class="font-bold text-lg text-slate-800 mb-2">Akses Terkunci</h2>
        <p class="text-sm text-slate-500 mb-6">Silakan masuk ke akun Anda untuk melihat riwayat donasi.</p>
        <UiAppButton to="/akun" full>Masuk Sekarang</UiAppButton>
      </div>

      <div v-else-if="history.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <FileX class="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 class="font-bold text-lg text-slate-800 mb-2">Belum Ada Riwayat</h2>
        <p class="text-sm text-slate-500 mb-6">Anda belum pernah melakukan donasi.</p>
        <UiAppButton to="/" full variant="outline">Mulai Berdonasi</UiAppButton>
      </div>

      <div v-else class="space-y-4">
        <NuxtLink v-for="item in history" :key="item.id" :to="`/riwayat-detail/${item.id}`">
          <UiAppCard no-padding class="flex flex-col hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] mb-3">
            <div class="p-4 border-b border-slate-100 flex justify-between items-center">
              <div class="text-xs text-slate-500">{{ formatDate(item.createdAt) }}</div>
              <span 
                class="px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider"
                :class="{
                  'bg-emerald-50 text-success border border-emerald-100': item.status === 'COMPLETED',
                  'bg-amber-50 text-warning border border-amber-100': ['WAITING_PAYMENT', 'INITIATED'].includes(item.status),
                  'bg-red-50 text-danger border border-red-100': ['CANCELLED'].includes(item.status),
                }"
              >
                {{ item.status === 'COMPLETED' ? 'BERHASIL' : (['WAITING_PAYMENT', 'INITIATED'].includes(item.status) ? 'PENDING' : item.status) }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-slate-800 mb-1 leading-tight line-clamp-1">{{ item.campaignTitle }}</h3>
              <div class="text-sm font-bold text-primary">{{ formatRupiah(item.amount) }}</div>
            </div>
          </UiAppCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, FileX } from 'lucide-vue-next'

const { isLoggedIn, pending } = useAuth()
const { formatRupiah, formatDate } = useFormat()

const { data: history } = useFetch('/api/user/donations', { default: () => [] })
</script>
