<template>
  <div>
    <UiAppHeader>
      <template #actions>
        <NuxtLink to="/akun" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
          <User class="w-5 h-5 text-slate-500" />
        </NuxtLink>
      </template>
    </UiAppHeader>

    <main class="pb-24">
      <!-- Hero/Banner Section -->
      <section class="px-4 py-6">
        <div class="bg-gradient-to-br from-primary to-teal-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div class="absolute -left-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          
          <h1 class="text-2xl font-bold mb-2 relative z-10">Kebaikan Berawal<br/>dari Sini</h1>
          <p class="text-teal-50 text-sm mb-4 max-w-[200px] relative z-10">Tunaikan zakat dan sedekah dengan mudah dan aman.</p>
          <UiAppButton variant="secondary" size="sm" class="relative z-10" to="#campaigns">
            Mulai Donasi
          </UiAppButton>
        </div>
      </section>

      <!-- Campaigns List -->
      <section id="campaigns" class="px-4 mt-2">
        <div class="flex justify-between items-end mb-4">
          <h2 class="text-lg font-bold text-slate-800">Program Mendesak</h2>
          <span class="text-xs text-primary font-medium cursor-pointer">Lihat Semua</span>
        </div>

        <div class="grid gap-4">
          <NuxtLink v-for="item in campaigns" :key="item.id" :to="`/campaign/${item.id}`">
            <UiAppCard hover no-padding>
              <template #image>
                <div class="absolute inset-0 bg-slate-200">
                  <!-- Dummy Image placeholder -->
                  <img :src="item.image" class="w-full h-full object-cover" alt="Campaign Image" />
                </div>
              </template>
              
              <div class="p-4">
                <h3 class="font-bold text-slate-800 mb-2 leading-tight line-clamp-2">{{ item.title }}</h3>
                <UiAppProgress :current="item.currentAmount" :target="item.targetAmount" />
              </div>
            </UiAppCard>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { User } from 'lucide-vue-next'

// Mock Data
const campaigns = [
  {
    id: '1',
    title: 'Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh',
    currentAmount: 15500000,
    targetAmount: 50000000,
    image: 'https://images.unsplash.com/photo-1593113563332-e147ce827361?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Sedekah Air Bersih untuk Warga Desa Kekeringan',
    currentAmount: 3200000,
    targetAmount: 10000000,
    image: 'https://images.unsplash.com/photo-1541888078952-475267bfadcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Beasiswa Pendidikan Anak Yatim Berprestasi',
    currentAmount: 4800000,
    targetAmount: 5000000,
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]
</script>
