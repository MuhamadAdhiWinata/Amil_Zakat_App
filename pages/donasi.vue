<template>
  <div class="pb-24">
    <UiAppHeader title="Semua Program" />
    
    <div class="p-4">
      <div v-if="campaigns && campaigns.length > 0" class="grid gap-4">
        <NuxtLink v-for="item in campaigns" :key="item.id" :to="`/campaign/${item.id}`">
          <UiAppCard hover no-padding class="overflow-hidden flex gap-3 h-[110px]">
            <div class="w-28 h-full bg-slate-200 shrink-0">
               <img :src="item.image" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 p-3 min-w-0 flex flex-col justify-between">
              <h3 class="font-bold text-slate-800 text-sm leading-snug line-clamp-2">{{ item.title }}</h3>
              <UiAppProgress :current="item.currentAmount" :target="item.targetAmount" />
            </div>
          </UiAppCard>
        </NuxtLink>
      </div>
      <div v-else-if="!pending" class="text-center py-12">
        <p class="text-slate-500">Belum ada program donasi.</p>
      </div>
      <div v-else class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: campaigns, pending } = useFetch<any[]>('/api/campaigns')
</script>
