<template>
  <div class="pb-24">
    <UiAppHeader title="Semua Program" />
    
    <div class="p-4">
      <div class="grid gap-4">
        <!-- Will map real data later, for now just reuse index list concept -->
        <NuxtLink v-for="i in 5" :key="i" :to="`/campaign/${i}`">
          <UiAppCard hover class="flex gap-4 p-3">
            <div class="w-24 h-24 bg-slate-200 rounded-xl flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1593113563332-e147ce827361?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover rounded-xl" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-slate-800 text-sm mb-2 leading-snug line-clamp-2">Program Kebaikan {{ i }}</h3>
              <UiAppProgress :current="1500000 * i" :target="10000000 * i" />
            </div>
          </UiAppCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
