<template>
  <div class="pb-24">
    <UiAppHeader title="Buat Campaign" />
    
    <div class="p-4">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Judul Campaign</label>
          <input v-model="form.title" type="text" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Masukkan judul">
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
          <textarea v-model="form.description" rows="4" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Ceritakan detail program"></textarea>
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Target Donasi (Rp)</label>
          <input v-model="form.targetAmount" type="number" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="0">
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">URL Gambar</label>
          <input v-model="form.image" type="url" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="https://example.com/image.jpg">
          <p class="text-xs text-slate-500 mt-1">Gunakan URL gambar (misal dari Unsplash).</p>
        </div>

        <UiAppButton full size="lg" @click="handleSubmit" :disabled="isSubmitting" class="mt-6">
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan Campaign' }}
        </UiAppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const router = useRouter()
const toast = useToast()

const form = ref({
  title: '',
  description: '',
  targetAmount: '',
  image: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.value.title || !form.value.description || !form.value.targetAmount) {
    toast.error('Gagal menyimpan', 'Pastikan judul, deskripsi, dan target terisi')
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/campaigns', {
      method: 'POST',
      body: {
        ...form.value,
        targetAmount: parseInt(form.value.targetAmount)
      }
    })
    
    toast.success('Campaign berhasil dibuat')
    router.push('/admin/campaigns')
  } catch (err: any) {
    toast.error('Gagal menyimpan campaign', err.data?.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>
