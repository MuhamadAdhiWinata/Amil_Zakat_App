<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-sm p-8 max-w-[400px] w-full text-center">
      <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 class="w-10 h-10 text-emerald-500" />
      </div>
      
      <h1 class="text-2xl font-bold text-slate-800 mb-2">Alhamdulillah</h1>
      <p class="text-slate-600 mb-8">Donasi Anda telah berhasil diproses. Semoga menjadi amal jariyah yang mengalir pahalanya.</p>

      <div class="space-y-3">
        <UiAppButton full size="lg" to="/riwayat">
          Lihat Riwayat Donasi
        </UiAppButton>
        <UiAppButton full variant="secondary" size="lg" to="/">
          Kembali ke Beranda
        </UiAppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'
</script>
