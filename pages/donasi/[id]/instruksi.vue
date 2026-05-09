<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <UiAppHeader title="Instruksi Pembayaran">
      <template #logo>
        <button @click="$router.push('/')" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
          <Home class="w-5 h-5 text-slate-700" />
        </button>
      </template>
    </UiAppHeader>

    <div class="p-4 max-w-[420px] mx-auto">
      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <div v-else-if="payment" class="space-y-4">
        <!-- Status Banner -->
        <div class="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
          <Clock class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div class="text-sm font-bold text-amber-800">Menunggu Pembayaran</div>
            <div class="text-xs text-amber-700">Segera selesaikan pembayaran Anda sebelum waktu habis.</div>
          </div>
        </div>

        <!-- QRIS Section -->
        <div v-if="payment.gatewayMethod === 'qris'" class="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div class="text-sm font-bold text-slate-700 mb-4 text-center">Scan QRIS Berikut</div>
          <div v-if="payment.qrString" class="flex justify-center mb-4 p-4 bg-white border-2 border-slate-100 rounded-2xl shadow-inner">
             <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payment.qrString)}`" class="w-48 h-48" alt="QRIS" />
          </div>
          <p class="text-xs text-slate-400 mb-6">Mendukung Gopay, OVO, Dana, LinkAja, dan Mobile Banking lainnya.</p>
          <UiAppButton variant="secondary" outline full @click="downloadQR">Unduh QRIS</UiAppButton>
        </div>

        <!-- VA Section -->
        <div v-else class="bg-white rounded-2xl p-4 shadow-sm">
          <div class="text-sm text-slate-500 mb-1 uppercase tracking-wider font-bold text-xs">Nomor Virtual Account</div>
          <div class="flex items-center justify-between">
            <div class="text-2xl font-mono font-bold text-primary">{{ payment.vaNumber }}</div>
            <button @click="copyVA" class="text-primary font-bold text-xs p-2 hover:bg-emerald-50 rounded-lg">SALIN</button>
          </div>
        </div>

        <!-- Amount -->
        <div class="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <span class="text-sm text-slate-600 font-medium">Total Tagihan</span>
          <span class="text-lg font-bold text-slate-800">Rp {{ formatNumber(Number(payment.amount)) }}</span>
        </div>

        <!-- Refresh / Check Status -->
        <div class="pt-4">
          <UiAppButton full @click="checkStatus" :loading="checking">Saya Sudah Bayar</UiAppButton>
          <p class="text-center text-xs text-slate-400 mt-4 px-8">Status akan terupdate otomatis dalam beberapa detik setelah pembayaran berhasil.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, Clock, QrCode } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const payment = ref<any>(null)
const loading = ref(true)
const checking = ref(false)

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num)
}

const fetchPayment = async () => {
  try {
    const paymentId = route.query.paymentId
    if (!paymentId) throw new Error('Missing paymentId')
    
    // We need a specific endpoint for payment details or just use general fetch
    // For now assume we have /api/payments/[id]
    const res = await $fetch(`/api/payments/${paymentId}`)
    payment.value = res
    
    if (res.status === 'PAID') {
       router.push(`/donasi/${res.donationId}/success`)
    }
  } catch (err) {
    toast.error('Gagal memuat data pembayaran')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPayment()
  // Auto check every 10 seconds
  const interval = setInterval(fetchPayment, 10000)
  onUnmounted(() => clearInterval(interval))
})

const copyVA = () => {
  navigator.clipboard.writeText(payment.value.vaNumber)
  toast.success('Nomor VA berhasil disalin')
}

const downloadQR = () => {
  toast.info('Fitur unduh QR sedang disiapkan')
}

const checkStatus = async () => {
  checking.value = true
  await fetchPayment()
  if (payment.value?.status !== 'PAID') {
    toast.info('Pembayaran belum diterima', 'Mohon tunggu sebentar atau coba lagi.')
  }
  checking.value = false
}
</script>
