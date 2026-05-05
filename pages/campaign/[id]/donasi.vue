<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <UiAppHeader title="Masukkan Nominal">
      <template #logo>
        <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
          <ArrowLeft class="w-5 h-5 text-slate-700" />
        </button>
      </template>
    </UiAppHeader>

    <div class="p-4">
      <!-- Amount Selection -->
      <div class="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <label class="block text-sm font-bold text-slate-700 mb-3">Nominal Donasi</label>
        
        <div class="relative mb-4">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span class="text-slate-500 font-bold text-lg">Rp</span>
          </div>
          <input 
            v-model="amountRaw" 
            type="number" 
            class="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xl font-bold text-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="0"
          >
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="preset in presets" 
            :key="preset"
            @click="amountRaw = preset.toString()"
            class="py-2.5 px-3 border border-slate-200 rounded-xl text-sm font-medium transition-colors"
            :class="amountRaw === preset.toString() ? 'border-primary bg-emerald-50 text-primary' : 'text-slate-600 hover:bg-slate-50'"
          >
            Rp {{ formatNumber(preset) }}
          </button>
        </div>
      </div>

      <!-- Identity -->
      <div class="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div class="flex justify-between items-center mb-4">
          <label class="block text-sm font-bold text-slate-700">Identitas Diri</label>
          <NuxtLink v-if="!isLoggedIn" to="/akun" class="text-xs font-bold text-primary">Login</NuxtLink>
        </div>

        <div v-if="isLoggedIn" class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {{ user?.name.charAt(0) }}
          </div>
          <div>
            <div class="text-sm font-bold text-slate-800">{{ user?.name }}</div>
            <div class="text-xs text-slate-500">{{ user?.email }}</div>
          </div>
        </div>

        <div v-else class="space-y-3">
          <input 
            v-model="guestName"
            type="text" 
            class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Nama Lengkap"
          >
          <input 
            v-model="guestEmail"
            type="email" 
            class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Email (opsional)"
          >
        </div>

        <label class="flex items-center gap-2 mt-4 cursor-pointer">
          <input type="checkbox" v-model="isAnonymous" class="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary">
          <span class="text-sm text-slate-600">Sembunyikan nama saya (Hamba Allah)</span>
        </label>
      </div>
    </div>

    <!-- Sticky Bottom CTA -->
    <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div class="w-full max-w-[420px] bg-white border-t border-slate-200 pointer-events-auto shadow-[0_-4px_10px_rgba(0,0,0,0.03)] p-4 pb-safe-bottom">
        <UiAppButton full size="lg" @click="handleDonate" :disabled="!isValid">
          Lanjutkan Pembayaran
        </UiAppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

const { isLoggedIn, user } = useAuth()
const router = useRouter()

const amountRaw = ref('')
const guestName = ref('')
const guestEmail = ref('')
const isAnonymous = ref(false)

const presets = [10000, 20000, 50000, 100000, 500000, 1000000]

const isValid = computed(() => {
  const amount = parseInt(amountRaw.value)
  if (isNaN(amount) || amount < 10000) return false
  if (!isLoggedIn.value && guestName.value.trim().length < 3) return false
  return true
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num)
}

const handleDonate = () => {
  // Mock redirection to success or Pakasir later
  alert('Simulasi: Berhasil membuat donasi Rp ' + formatNumber(parseInt(amountRaw.value)))
  router.push('/riwayat')
}
</script>

<style scoped>
.pb-safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
}
</style>
