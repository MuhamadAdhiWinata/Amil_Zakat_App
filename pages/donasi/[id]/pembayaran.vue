<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <UiAppHeader title="Pilih Pembayaran">
      <template #logo>
        <button @click="router.back()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
          <ArrowLeft class="w-5 h-5 text-slate-700" />
        </button>
      </template>
    </UiAppHeader>

    <div class="p-4 max-w-[420px] mx-auto">
      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="mt-4 text-slate-500 text-sm">Memuat data donasi...</p>
      </div>

      <div v-else-if="donation" class="space-y-4">
        <!-- Summary -->
        <div class="bg-white rounded-2xl p-4 shadow-sm">
          <div class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Donasi</div>
          <div class="text-2xl font-bold text-slate-800">Rp {{ formatNumber(Number(donation.amount)) }}</div>
          <div class="mt-2 pt-2 border-t border-dashed border-slate-100 flex justify-between text-sm">
            <span class="text-slate-500">ID Donasi</span>
            <span class="font-mono text-slate-700">{{ donation.id.split('-')[0] }}...</span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="bg-white rounded-2xl p-4 shadow-sm">
          <label class="block text-sm font-bold text-slate-700 mb-4">Metode Pembayaran</label>
          
          <div class="space-y-3">
            <div 
              v-for="method in paymentMethods" 
              :key="method.id"
              @click="selectedMethod = method.id"
              class="flex items-center gap-4 p-3 border rounded-xl cursor-pointer transition-all"
              :class="selectedMethod === method.id ? 'border-primary bg-emerald-50' : 'border-slate-100 hover:border-slate-200'"
            >
              <div class="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                <img :src="method.icon" :alt="method.name" class="w-10 h-10 object-contain">
              </div>
              <div class="flex-1">
                <div class="text-sm font-bold text-slate-800">{{ method.name }}</div>
                <div class="text-xs text-slate-500">{{ method.description }}</div>
                <div class="text-xs text-amber-600 font-medium mt-0.5">{{ method.feeLabel }}</div>
              </div>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="selectedMethod === method.id ? 'border-primary bg-primary' : 'border-slate-200'">
                <div v-if="selectedMethod === method.id" class="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-slate-500">Donasi tidak ditemukan</p>
      </div>
    </div>

    <!-- Sticky Bottom CTA -->
    <div class="fixed bottom-16 left-0 right-0 z-40 flex justify-center">
      <div class="w-full max-w-[420px] bg-white border-t border-slate-200 p-4 pb-safe-bottom shadow-lg">
        <UiAppButton 
          full 
          size="lg" 
          @click="handleCheckout" 
          :disabled="!selectedMethod || isSubmitting"
          :loading="isSubmitting"
        >
          Bayar Sekarang
        </UiAppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { PaymentMethod, Donation } from '~/shared/types/donation'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const donation = ref<Donation | null>(null)
const loading = ref(true)
const selectedMethod = ref<PaymentMethod | null>(null)
const isSubmitting = ref(false)

const paymentMethods: { id: PaymentMethod; name: string; description: string; icon: string; feeLabel: string }[] = [
  { id: 'qris', name: 'QRIS', description: 'Gopay, OVO, Dana, LinkAja, ShopeePay', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg', feeLabel: 'Biaya admin: 0,7% + Rp 310' },
  { id: 'bri_va', name: 'BRI Virtual Account', description: 'Transfer Bank BRI', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'bni_va', name: 'BNI Virtual Account', description: 'Transfer Bank BNI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/03/BNI_logo.svg', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'cimb_niaga_va', name: 'CIMB Niaga Virtual Account', description: 'Transfer Bank CIMB Niaga', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_CIMB_Niaga.svg', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'permata_va', name: 'Permata Virtual Account', description: 'Transfer Bank Permata', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Permatabank_logo.svg', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'maybank_va', name: 'Maybank Virtual Account', description: 'Transfer Maybank', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Maybank_Logo.svg', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'sampoerna_va', name: 'Sampoerna Virtual Account', description: 'Transfer Bank Sampoerna', icon: '', feeLabel: 'Biaya admin: Rp 2.000' },
  { id: 'bnc_va', name: 'BNC Virtual Account', description: 'Transfer Bank Neo Commerce', icon: '', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'atm_bersama_va', name: 'ATM Bersama Virtual Account', description: 'Transfer via ATM Bersama', icon: '', feeLabel: 'Biaya admin: Rp 3.500' },
  { id: 'artha_graha_va', name: 'Artha Graha Virtual Account', description: 'Transfer Bank Artha Graha', icon: '', feeLabel: 'Biaya admin: Rp 2.000' },
]

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

const handleCheckout = async () => {
  if (!selectedMethod.value) return
  
  isSubmitting.value = true
  try {
    const res = await $fetch('/api/payments/checkout', {
      method: 'POST',
      body: {
        donationId: route.params.id,
        method: selectedMethod.value
      }
    })

    if (res.success) {
      toast.success('Instruksi pembayaran dibuat')
      // Redirect to instructions page
      router.push(`/donasi/${route.params.id}/instruksi?paymentId=${res.data.paymentId}`)
    }
  } catch (err: any) {
    toast.error('Gagal memproses pembayaran', err.data?.message || 'Terjadi kesalahan')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.pb-safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
}
</style>
