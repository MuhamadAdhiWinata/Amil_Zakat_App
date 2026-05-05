<template>
  <div class="pb-24">
    <UiAppHeader title="Detail Program">
      <template #logo>
        <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
          <ArrowLeft class="w-5 h-5 text-slate-700" />
        </button>
      </template>
    </UiAppHeader>

    <div v-if="campaign">
      <div class="w-full aspect-video bg-slate-200 relative">
        <img :src="campaign.image" class="w-full h-full object-cover" />
      </div>

      <div class="px-4 py-5 bg-white mb-2 shadow-sm">
        <h1 class="text-xl font-bold text-slate-800 mb-4 leading-snug">{{ campaign.title }}</h1>
        <UiAppProgress :current="campaign.currentAmount" :target="campaign.targetAmount" />
        
        <div class="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold">AZ</div>
          <div>
            <div class="text-sm font-bold text-slate-800">Yayasan Amil Zakat</div>
            <div class="text-xs text-slate-500 flex items-center gap-1">
              <ShieldCheck class="w-3.5 h-3.5 text-primary" /> Terverifikasi
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 py-5 bg-white shadow-sm">
        <h2 class="font-bold text-slate-800 mb-3">Cerita Penggalangan Dana</h2>
        <div class="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            Panti Asuhan Harapan Baru saat ini menampung 45 anak yatim dan piatu. Namun, kondisi bangunan panti sangat memprihatinkan. Atap bocor di mana-mana saat hujan, dan tembok mulai retak membahayakan anak-anak.
          </p>
          <p>
            Mari bersama-sama bantu renovasi Panti Asuhan ini agar anak-anak bisa tidur dan belajar dengan aman dan nyaman. Setiap Rupiah yang Anda donasikan akan sangat berarti bagi mereka.
          </p>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom CTA -->
    <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div class="w-full max-w-[420px] bg-white border-t border-slate-200 pointer-events-auto shadow-[0_-4px_10px_rgba(0,0,0,0.03)] p-4 pb-safe-bottom">
        <UiAppButton full size="lg" :to="`/campaign/${route.params.id}/donasi`">
          Donasi Sekarang
        </UiAppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ShieldCheck } from 'lucide-vue-next'

const route = useRoute()

// Mock Data
const campaign = {
  id: route.params.id,
  title: 'Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh',
  currentAmount: 15500000,
  targetAmount: 50000000,
  image: 'https://images.unsplash.com/photo-1593113563332-e147ce827361?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}
</script>

<style scoped>
.pb-safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
}
</style>
