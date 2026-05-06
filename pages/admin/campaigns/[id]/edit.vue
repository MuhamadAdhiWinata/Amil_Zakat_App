<template>
  <div class="pb-24">
    <UiAppHeader title="Edit Campaign" />
    
    <div v-if="campaign" class="p-4">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Status</label>
          <select v-model="form.status" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
            <option value="active">Aktif</option>
            <option value="closed">Nonaktif / Ditutup</option>
          </select>
        </div>

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
        </div>

        <UiAppButton full size="lg" @click="handleSubmit" :disabled="isSubmitting" class="mt-6">
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </UiAppButton>
      </div>
    </div>
    <div v-else class="p-4 text-center text-slate-500">Memuat...</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { data: campaign } = await useFetch<any>(`/api/campaigns/${route.params.id}`)

const form = ref({
  title: '',
  description: '',
  targetAmount: '',
  image: '',
  status: 'active'
})

onMounted(() => {
  if (campaign.value) {
    form.value.title = campaign.value.title
    form.value.description = campaign.value.description
    form.value.targetAmount = campaign.value.targetAmount
    form.value.image = campaign.value.image
    form.value.status = campaign.value.status
  }
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.value.title || !form.value.description || !form.value.targetAmount) {
    toast.error('Gagal menyimpan', 'Pastikan judul, deskripsi, dan target terisi')
    return
  }

  isSubmitting.value = true
  try {
    await $fetch(`/api/campaigns/${route.params.id}`, {
      method: 'PUT',
      body: {
        ...form.value,
        targetAmount: parseInt(form.value.targetAmount)
      }
    })
    
    toast.success('Perubahan berhasil disimpan')
    router.push('/admin/campaigns')
  } catch (err: any) {
    toast.error('Gagal menyimpan perubahan', err.data?.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>
