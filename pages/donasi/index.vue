<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <UiAppHeader title="Donasi" />

    <div class="px-4 pt-3 pb-1">
      <div class="flex items-center gap-3">
        <div class="relative flex-1 group">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari program kebaikan..." 
            class="w-full pl-10 pr-4 py-3 bg-slate-100/50 border border-slate-200/50 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all shadow-inner"
          />
        </div>
        <button class="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
          <Filter class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Categories with Icons -->
    <div class="bg-white py-4 mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div class="flex items-center gap-3 overflow-x-auto px-4 no-scrollbar">
        <button 
          @click="activeCategory = 'Semua'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0"
          :class="activeCategory === 'Semua' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'"
        >
          <LayoutGrid class="w-4 h-4" />
          Semua
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="activeCategory = cat.name"
          class="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0"
          :class="activeCategory === cat.name ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'"
        >
          <component :is="iconMap[cat.icon] || LayoutGrid" class="w-4 h-4" />
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Featured Section Title -->
    <div class="px-5 mb-4 flex justify-between items-center">
      <h2 class="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
        {{ activeCategory === 'Semua' ? 'Program Pilihan' : activeCategory }}
      </h2>
      <div class="h-px flex-1 bg-slate-100 mx-4"></div>
    </div>

    <!-- Programs List -->
    <div class="px-4">
      <div v-if="filteredCampaigns && filteredCampaigns.length" class="grid gap-6">
        <NuxtLink v-for="item in filteredCampaigns" :key="item.id" :to="`/campaign/${item.id}`" class="block group">
          <UiAppCard hover no-padding class="border-none shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] bg-white overflow-hidden rounded-[24px]">
            <template #image>
              <div class="absolute inset-0 bg-slate-100">
                <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" :alt="item.title" />
                <div v-if="item.categoryName" class="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                  <div class="flex items-center gap-1.5">
                    <component :is="iconMap[item.categoryIcon] || Flame" class="w-3 h-3 text-primary" />
                    <span class="text-[10px] font-bold text-primary">{{ item.categoryName }}</span>
                  </div>
                </div>
              </div>
            </template>
            
            <div class="p-5">
              <h3 class="font-bold text-slate-800 text-base mb-4 leading-tight line-clamp-2 group-hover:text-primary transition-colors">{{ item.title }}</h3>
              
              <UiAppProgress :current="item.currentAmount" :target="item.targetAmount" />
              
              <div class="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div class="flex -space-x-2">
                  <div v-for="i in 3" :key="i" class="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img :src="`https://i.pravatar.cc/100?img=${i+10}`" class="w-full h-full object-cover" />
                  </div>
                  <div class="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                    +12
                  </div>
                </div>
                <div class="text-[10px] text-slate-400 font-medium">124 Donatur</div>
              </div>
            </div>
          </UiAppCard>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else-if="!pendingCampaigns && !pendingCategories" class="flex flex-col items-center justify-center py-24 text-center px-8">
        <div class="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50 border border-slate-50 rotate-6">
          <SearchX class="w-12 h-12 text-slate-200" />
        </div>
        <h3 class="font-bold text-slate-800 text-lg mb-2">Program Tidak Ditemukan</h3>
        <p class="text-sm text-slate-400 max-w-[200px] mx-auto">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
        <button 
          @click="searchQuery = ''; activeCategory = 'Semua'"
          class="mt-8 px-6 py-2.5 bg-primary/10 text-primary font-bold text-xs rounded-xl hover:bg-primary hover:text-white transition-all"
        >
          Reset Pencarian
        </button>
      </div>

      <!-- Loading State -->
      <div v-else class="space-y-6">
        <div v-for="i in 2" :key="i" class="bg-white rounded-[24px] animate-pulse shadow-sm border border-slate-50 overflow-hidden">
          <div class="w-full aspect-[4/3] bg-slate-100"></div>
          <div class="p-6 space-y-4">
            <div class="h-6 bg-slate-50 rounded-lg w-3/4"></div>
            <div class="h-4 bg-slate-50 rounded-lg w-full"></div>
            <div class="h-3 bg-slate-50 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Search, Filter, SearchX, 
  LayoutGrid, Flame, Landmark, GraduationCap, Stethoscope, Wallet 
} from 'lucide-vue-next'

const { data: campaigns, pending: pendingCampaigns } = useFetch<any[]>('/api/campaigns')
const { data: categories, pending: pendingCategories } = useFetch<any[]>('/api/categories')

const searchQuery = ref('')
const activeCategory = ref('Semua')

const iconMap: Record<string, any> = {
  LayoutGrid, Flame, Landmark, GraduationCap, Stethoscope, Wallet
}

const filteredCampaigns = computed(() => {
  if (!campaigns.value) return []
  return campaigns.value.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'Semua' || c.categoryName === activeCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
