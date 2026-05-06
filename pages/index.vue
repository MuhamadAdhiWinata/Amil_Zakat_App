<template>
  <div>
    <UiAppHeader>
      <template #actions>
        <NuxtLink to="/akun" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
          <UserIcon class="w-5 h-5 text-slate-500" />
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

      <!-- Menu Grid -->
      <section class="px-4 mb-8 -mt-2">
        <h2 class="text-sm font-bold text-slate-800 mb-4 px-1">Mau berbuat baik apa hari ini?</h2>
        <div class="grid grid-cols-4 gap-y-5 gap-x-2">
          <NuxtLink to="/donasi" class="flex flex-col items-center gap-2 group">
            <div class="w-[50px] h-[50px] rounded-[18px] bg-sky-50 flex items-center justify-center transition-transform group-hover:scale-95">
              <Heart class="w-6 h-6 text-sky-500 fill-sky-500/20" />
            </div>
            <span class="text-[11px] font-medium text-slate-700 text-center leading-tight">Donasi</span>
          </NuxtLink>

          <NuxtLink to="/donasi" class="flex flex-col items-center gap-2 group">
            <div class="w-[50px] h-[50px] rounded-[18px] bg-emerald-50 flex items-center justify-center transition-transform group-hover:scale-95">
              <Wallet class="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
            </div>
            <span class="text-[11px] font-medium text-slate-700 text-center leading-tight">Zakat</span>
          </NuxtLink>

          <NuxtLink to="/admin/campaigns/create" class="flex flex-col items-center gap-2 group">
            <div class="w-[50px] h-[50px] rounded-[18px] bg-amber-50 flex items-center justify-center transition-transform group-hover:scale-95">
              <Megaphone class="w-6 h-6 text-amber-500 fill-amber-500/20" />
            </div>
            <span class="text-[11px] font-medium text-slate-700 text-center leading-tight">Galang Dana</span>
          </NuxtLink>

          <NuxtLink v-if="isAdmin" to="/admin" class="flex flex-col items-center gap-2 group">
            <div class="w-[50px] h-[50px] rounded-[18px] bg-purple-50 flex items-center justify-center transition-transform group-hover:scale-95">
              <ShieldCheck class="w-6 h-6 text-purple-600 fill-purple-600/20" />
            </div>
            <span class="text-[11px] font-medium text-slate-700 text-center leading-tight">Admin Panel</span>
          </NuxtLink>
          
          <NuxtLink v-else to="/akun" class="flex flex-col items-center gap-2 group">
            <div class="w-[50px] h-[50px] rounded-[18px] bg-indigo-50 flex items-center justify-center transition-transform group-hover:scale-95">
              <UserCircle class="w-6 h-6 text-indigo-500 fill-indigo-500/20" />
            </div>
            <span class="text-[11px] font-medium text-slate-700 text-center leading-tight">Akun Saya</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Campaigns List -->
      <section id="campaigns" class="px-4">
        <div class="flex justify-between items-end mb-4">
          <h2 class="text-lg font-bold text-slate-800">Program Mendesak</h2>
          <NuxtLink to="/donasi" class="text-xs text-primary font-medium cursor-pointer">Lihat Semua</NuxtLink>
        </div>

        <div class="grid gap-4">
          <NuxtLink v-for="item in campaigns" :key="item.id" :to="`/campaign/${item.id}`">
            <UiAppCard hover no-padding>
              <template #image>
                <div class="absolute inset-0 bg-slate-200">
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
import { User as UserIcon, Heart, Wallet, Megaphone, ShieldCheck, UserCircle } from 'lucide-vue-next'

const { data: campaigns } = useFetch('/api/campaigns')
const { isAdmin } = useAuth()
</script>
