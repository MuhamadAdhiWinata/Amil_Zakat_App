<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <UiAppHeader title="Simulasi Pembayaran" />

    <div class="p-4">
      <div class="bg-white rounded-2xl p-6 shadow-sm mb-4 text-center border-2 border-dashed border-slate-200">
        <h2 class="text-lg font-bold text-slate-800 mb-2">Mode Developer</h2>
        <p class="text-sm text-slate-500 mb-6">Pilih status pembayaran untuk donasi ini. Halaman ini digunakan sebagai pengganti payment gateway Pakasir.</p>

        <div class="space-y-3">
          <UiAppButton full size="lg" @click="simulatePayment('PAID')" :disabled="isSubmitting" class="bg-emerald-500 hover:bg-emerald-600 border-none">
            Simulasi Berhasil (PAID)
          </UiAppButton>
          <UiAppButton full variant="danger" size="lg" @click="simulatePayment('FAILED')" :disabled="isSubmitting">
            Simulasi Gagal (FAILED)
          </UiAppButton>
          <UiAppButton full variant="secondary" size="lg" @click="simulatePayment('EXPIRED')" :disabled="isSubmitting">
            Simulasi Kadaluarsa (EXPIRED)
          </UiAppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const toast = useToast()

const isSubmitting = ref(false)

const simulatePayment = async (status: string) => {
  if (!route.query.id) {
    toast.error('ID Donasi tidak valid')
    return
  }

  isSubmitting.value = true
  try {
    await $fetch(`/api/donations/${route.query.id}/confirm`, {
      method: 'POST',
      body: { status }
    })

    if (status === 'PAID') {
      toast.success('Pembayaran Berhasil')
      router.push(`/donasi/success?id=${route.query.id}`)
    } else {
      toast.warning(`Pembayaran diatur ke ${status}`)
      router.push('/riwayat')
    }
  } catch (err: any) {
    toast.error('Gagal memproses simulasi', err.data?.message || 'Terjadi kesalahan')
  } finally {
    isSubmitting.value = false
  }
}
</script>
