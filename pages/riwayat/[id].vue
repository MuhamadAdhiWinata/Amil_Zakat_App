<template>
  <div class="pb-24 min-h-screen bg-slate-50">
    <UiAppHeader title="Detail Donasi">
      <template #logo>
        <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
          <ArrowLeft class="w-5 h-5 text-slate-700" />
        </button>
      </template>
    </UiAppHeader>

    <div v-if="loading" class="flex justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="donation" class="p-4 space-y-4">
      <!-- Status & ID -->
      <UiAppCard class="space-y-4">
        <div class="flex items-center justify-between">
          <span
            class="px-3 py-1 text-xs font-bold rounded uppercase tracking-wider"
            :class="donationStatusClass(donation.status)"
          >
            {{ donationStatusLabel(donation.status) }}
          </span>
          <span v-if="donation.paymentStatus" class="text-xs text-slate-400">
            Pembayaran:
            <span :class="paymentStatusClass(donation.paymentStatus)" class="font-bold ml-1">
              {{ paymentStatusLabel(donation.paymentStatus) }}
            </span>
          </span>
        </div>

        <div>
          <div class="text-xs text-slate-400 mb-1">Program</div>
          <div class="font-bold text-slate-800">{{ donation.campaignTitle }}</div>
        </div>

        <div class="space-y-2 pt-2 border-t border-slate-100">
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Nominal Donasi</span>
            <span class="font-bold text-slate-800">{{ formatRupiah(donation.amount) }}</span>
          </div>
          <div v-if="donation.gatewayOrderId" class="flex justify-between text-sm">
            <span class="text-slate-400">ID Transaksi</span>
            <span class="font-mono text-slate-600 text-xs">{{ donation.gatewayOrderId }}</span>
          </div>
          <div v-if="donation.gatewayMethod" class="flex justify-between text-sm">
            <span class="text-slate-400">Metode</span>
            <span class="font-medium text-slate-700">{{ paymentMethodLabel(donation.gatewayMethod) }}</span>
          </div>
          <div v-if="donation.vaNumber" class="flex justify-between text-sm">
            <span class="text-slate-400">VA Number</span>
            <span class="font-mono font-bold text-slate-800">{{ donation.vaNumber }}</span>
          </div>
        </div>
      </UiAppCard>

      <!-- Donatur Info -->
      <UiAppCard>
        <h3 class="font-bold text-slate-800 mb-3 text-sm">Informasi Donatur</h3>
        <div class="space-y-2 text-sm">
          <div v-if="donation.isAnonymous" class="text-slate-500 italic">
            Donasi Anonim
          </div>
          <template v-else>
            <div class="flex justify-between">
              <span class="text-slate-400">Nama</span>
              <span class="font-medium text-slate-700">{{ donation.donaturName || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Email</span>
              <span class="text-slate-600">{{ donation.donaturEmail || '-' }}</span>
            </div>
            <div v-if="donation.donaturPhone" class="flex justify-between">
              <span class="text-slate-400">Telepon</span>
              <span class="text-slate-600">{{ donation.donaturPhone }}</span>
            </div>
          </template>
        </div>
      </UiAppCard>

      <!-- Timeline / Dates -->
      <UiAppCard>
        <h3 class="font-bold text-slate-800 mb-3 text-sm">Waktu</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-400">Dibuat</span>
            <span class="text-slate-600">{{ formatDate(donation.createdAt) }}</span>
          </div>
          <div v-if="donation.completedAt" class="flex justify-between">
            <span class="text-slate-400">Selesai</span>
            <span class="text-slate-600">{{ formatDate(donation.completedAt) }}</span>
          </div>
          <div v-if="donation.paymentExpiredAt" class="flex justify-between">
            <span class="text-slate-400">Kadaluarsa</span>
            <span class="text-slate-600">{{ formatDate(donation.paymentExpiredAt) }}</span>
          </div>
          <div v-if="donation.paidAt" class="flex justify-between">
            <span class="text-slate-400">Dibayar</span>
            <span class="text-slate-600">{{ formatDate(donation.paidAt) }}</span>
          </div>
        </div>
      </UiAppCard>

      <!-- Actions -->
      <div class="pt-2 space-y-3">
        <UiAppButton full variant="outline" to="/riwayat">
          Kembali ke Riwayat
        </UiAppButton>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-slate-500">Data donasi tidak ditemukan.</p>
      <UiAppButton to="/riwayat" variant="outline" class="mt-4">Kembali</UiAppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const toast = useToast()
const { formatRupiah, formatDate } = useFormat()

const loading = ref(true)
const donation = ref<any>(null)

const donationStatusClass = (status: string) => {
  switch (status) {
    case 'COMPLETED': return 'bg-emerald-50 text-success border border-emerald-100'
    case 'WAITING_PAYMENT': return 'bg-amber-50 text-warning border border-amber-100'
    case 'INITIATED': return 'bg-blue-50 text-blue-600 border border-blue-100'
    case 'CANCELLED': return 'bg-red-50 text-danger border border-red-100'
    default: return 'bg-slate-50 text-slate-500 border border-slate-100'
  }
}

const donationStatusLabel = (status: string) => {
  switch (status) {
    case 'COMPLETED': return 'Berhasil'
    case 'WAITING_PAYMENT': return 'Menunggu Bayar'
    case 'INITIATED': return 'Dibuat'
    case 'CANCELLED': return 'Dibatalkan'
    default: return status
  }
}

const paymentStatusClass = (status: string) => {
  switch (status) {
    case 'PAID': return 'text-emerald-600'
    case 'PENDING': return 'text-amber-600'
    case 'FAILED': return 'text-red-600'
    case 'EXPIRED': return 'text-slate-400'
    default: return 'text-slate-500'
  }
}

const paymentStatusLabel = (status: string) => {
  switch (status) {
    case 'PAID': return 'Lunas'
    case 'PENDING': return 'Pending'
    case 'FAILED': return 'Gagal'
    case 'EXPIRED': return 'Kadaluarsa'
    default: return status
  }
}

const paymentMethodLabel = (method: string) => {
  const labels: Record<string, string> = {
    qris: 'QRIS',
    bri_va: 'BRI Virtual Account',
    bni_va: 'BNI Virtual Account',
    cimb_niaga_va: 'CIMB Niaga Virtual Account',
    permata_va: 'Permata Virtual Account',
    maybank_va: 'Maybank Virtual Account',
  }
  return labels[method] || method
}

onMounted(async () => {
  try {
    const res = await $fetch(`/api/donations/${route.params.id}`)
    donation.value = res
  } catch (err) {
    toast.error('Gagal memuat detail donasi')
  } finally {
    loading.value = false
  }
})
</script>