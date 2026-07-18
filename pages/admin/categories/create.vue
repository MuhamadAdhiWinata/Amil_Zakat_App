<template>
  <div>
    <UiAppHeader title="Tambah Kategori" show-back @back="$router.back()" />
    
    <div class="p-4">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Nama Kategori</label>
          <UiAppInput v-model="form.name" placeholder="Misal: Pendidikan" />
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Icon (Lucide)</label>
          <div class="grid grid-cols-6 gap-2">
            <button 
              v-for="(icon, name) in iconOptions" 
              :key="name"
              @click="form.icon = name"
              class="w-10 h-10 flex items-center justify-center rounded-xl border transition-all"
              :class="form.icon === name ? 'bg-primary border-primary text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-primary/30'"
            >
              <component :is="icon" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <UiAppButton full :loading="loading" @click="save">
          Simpan Kategori
        </UiAppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  LayoutGrid, Flame, Landmark, GraduationCap, Stethoscope, Wallet,
  Heart, Utensils, Droplets, Zap, ShieldCheck, Tag
} from 'lucide-vue-next'

const form = ref({
  name: '',
  icon: 'Tag'
})

const iconOptions = {
  Tag, LayoutGrid, Flame, Landmark, GraduationCap, Stethoscope, Wallet,
  Heart, Utensils, Droplets, Zap, ShieldCheck
}

const loading = ref(false)
const toast = useToast()
const router = useRouter()

const save = async () => {
  if (!form.value.name) return toast.error('Nama harus diisi')
  
  loading.value = true
  try {
    await $fetch('/api/admin/categories', {
      method: 'POST',
      body: form.value
    })
    toast.success('Kategori berhasil ditambahkan')
    router.push('/admin/categories')
  } catch (e) {
    toast.error('Gagal menyimpan kategori')
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})
</script>
