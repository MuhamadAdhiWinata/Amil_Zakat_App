<template>
  <div>
    <UiAppHeader title="Kelola Transaksi" />
    
    <div class="p-4">
      <div class="space-y-3">
        <div v-for="item in donations" :key="item.id" class="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <div class="font-bold text-slate-800 text-sm">{{ item.guestName || 'Anonim' }}</div>
              <div class="text-xs text-slate-500">{{ item.guestEmail || 'Tanpa Email' }}</div>
            </div>
            <div class="text-xs font-bold px-2 py-1 rounded-full" :class="statusColor(item.status)">
              {{ item.status }}
            </div>
          </div>
          
          <div class="text-lg font-bold text-slate-800 mb-2">
            Rp {{ formatNumber(item.amount) }}
          </div>
          
          <div class="text-xs text-slate-400">
            {{ new Date(item.createdAt).toLocaleString('id-ID') }}
          </div>
        </div>
      </div>
      
      <div v-if="!donations || donations.length === 0" class="text-center text-slate-500 py-8">
        Belum ada donasi.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: donations } = useFetch<any[]>('/api/admin/donations')

const formatNumber = (num: string | number) => {
  return new Intl.NumberFormat('id-ID').format(Number(num))
}

const statusColor = (status: string) => {
  switch (status) {
    case 'PAID': return 'bg-emerald-100 text-emerald-600'
    case 'PENDING': return 'bg-amber-100 text-amber-600'
    case 'FAILED': return 'bg-red-100 text-red-600'
    case 'EXPIRED': return 'bg-slate-100 text-slate-600'
    default: return 'bg-slate-100 text-slate-600'
  }
}
</script>
