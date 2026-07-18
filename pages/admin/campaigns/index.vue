<template>
  <div>
    <UiAppHeader title="Kelola Campaign" />
    
    <div class="p-4">
      <div class="flex justify-end mb-4">
        <UiAppButton to="/admin/campaigns/create" size="sm">
          <Plus class="w-4 h-4 mr-1" /> Buat Campaign
        </UiAppButton>
      </div>

      <div class="space-y-4">
        <div v-for="item in campaigns" :key="item.id" class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
          <div class="w-24 shrink-0 bg-slate-200">
            <img :src="item.image" class="w-full h-full object-cover" />
          </div>
          <div class="p-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-slate-800 text-sm line-clamp-2 leading-tight mb-1">{{ item.title }}</h3>
              <div class="text-xs font-medium" :class="item.status === 'active' ? 'text-emerald-500' : 'text-slate-400'">
                {{ item.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </div>
            </div>
            <div class="flex justify-end gap-2 mt-2">
              <button @click="handleDelete(item.id)" class="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                <Trash2 class="w-4 h-4" />
              </button>
              <NuxtLink :to="`/admin/campaigns/${item.id}/edit`" class="p-1.5 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Edit class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Trash2 } from 'lucide-vue-next'
import type { Campaign } from '~/shared/types'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: campaigns, refresh } = useFetch<Campaign[]>('/api/campaigns')
const toast = useToast()

const handleDelete = async (id: string) => {
  if (!confirm('Apakah Anda yakin ingin menghapus campaign ini?')) return

  try {
    await $fetch(`/api/campaigns/${id}`, { method: 'DELETE' })
    toast.success('Campaign berhasil dihapus')
    refresh()
  } catch (err: any) {
    toast.error('Gagal menghapus campaign', err.data?.message)
  }
}
</script>
