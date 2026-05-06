<template>
  <NuxtLayout name="admin">
    <UiAppHeader title="Kelola Kategori" />
    
    <div class="p-4">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Daftar Kategori</h2>
          <p class="text-xs text-slate-500">Total {{ categories?.length || 0 }} kategori master</p>
        </div>
        <UiAppButton size="sm" to="/admin/categories/create">
          <Plus class="w-4 h-4 mr-1" /> Tambah
        </UiAppButton>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <div v-else-if="categories?.length === 0" class="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
        <Tag class="w-12 h-12 text-slate-200 mx-auto mb-2" />
        <p class="text-sm text-slate-500">Belum ada kategori.</p>
      </div>

      <div v-else class="space-y-3">
        <div v-for="cat in categories" :key="cat.id" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
              <component :is="iconMap[cat.icon] || Tag" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-sm">{{ cat.name }}</h3>
              <p class="text-[10px] text-slate-400 font-mono">{{ cat.slug }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink :to="`/admin/categories/${cat.id}/edit`" class="p-2 text-slate-400 hover:text-primary transition-colors">
              <Pencil class="w-4 h-4" />
            </NuxtLink>
            <button @click="deleteCategory(cat.id)" class="p-2 text-slate-400 hover:text-danger transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { 
  Plus, Tag, Pencil, Trash2,
  LayoutGrid, Flame, Landmark, GraduationCap, Stethoscope, Wallet 
} from 'lucide-vue-next'

const { data: categories, pending, refresh } = useFetch<any[]>('/api/categories')
const { showToast } = useToast()

const iconMap: Record<string, any> = {
  LayoutGrid, Flame, Landmark, GraduationCap, Stethoscope, Wallet
}

const deleteCategory = async (id: string) => {
  if (!confirm('Yakin ingin menghapus kategori ini?')) return
  
  try {
    await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    showToast('Kategori berhasil dihapus', 'success')
    refresh()
  } catch (e) {
    showToast('Gagal menghapus kategori', 'error')
  }
}

definePageMeta({
  middleware: 'admin'
})
</script>
