<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 pb-24">
    <div v-if="loading" class="flex flex-col items-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="donation" class="w-full max-w-[420px] space-y-6">
      <!-- Success Card -->
      <div class="bg-white rounded-[32px] p-8 shadow-xl shadow-emerald-900/5 text-center relative overflow-hidden border border-emerald-50">
        <!-- Confetti Decoration -->
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-50"></div>
        <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-50"></div>

        <div class="relative z-10 flex flex-col items-center">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 scale-110">
            <CheckCircle2 class="w-10 h-10 text-emerald-600" />
          </div>
          
          <h1 class="text-2xl font-extrabold text-slate-800 mb-2">Donasi Berhasil!</h1>
          <p class="text-sm text-slate-500 mb-8 leading-relaxed px-4">
            Terima kasih {{ donation.donaturName }}. Semoga sedekah ini menjadi amal jariyah yang terus mengalir.
          </p>

          <div class="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div class="flex justify-between text-xs">
              <span class="text-slate-400 font-medium">Nominal Donasi</span>
              <span class="font-bold text-slate-700">Rp {{ formatNumber(Number(donation.amount)) }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400 font-medium">ID Transaksi</span>
              <span class="font-mono text-slate-500">{{ donation.gatewayOrderId || donation.id.split('-')[0].toUpperCase() }}</span>
            </div>
            <div class="pt-2 border-t border-slate-200/50 flex justify-between items-center">
              <span class="text-xs text-slate-400">Status</span>
              <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Lunas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <UiAppButton full size="lg" to="/">Bagikan Kebaikan</UiAppButton>
        <UiAppButton full variant="secondary" outline to="/riwayat">Lihat Riwayat Donasi</UiAppButton>
      </div>

      <p class="text-center text-[10px] text-slate-400 px-8">
        Kuitansi donasi resmi akan dikirimkan ke email Anda jika telah terverifikasi oleh amil kami.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'
import type { Donation } from '~/shared/types/donation'

const route = useRoute()
const toast = useToast()

const donation = ref<Donation | null>(null)
const loading = ref(true)

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num)
}

onMounted(async () => {
  try {
    const res = await $fetch(`/api/donations/${route.params.id}`)
    donation.value = res as any
  } catch (err) {
    toast.error('Gagal memuat data donasi')
  } finally {
    loading.value = false
  }
})
</script>
