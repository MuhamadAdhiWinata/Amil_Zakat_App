<template>
  <div class="pb-24">
    <UiAppHeader title="Akun Saya" />

    <div class="p-4">
      <div v-if="pending" class="flex justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
      
      <div v-else-if="isLoggedIn && user" class="space-y-4">
        <!-- Profile Card -->
        <UiAppCard class="text-center py-8">
          <div class="w-20 h-20 bg-primary text-white text-3xl font-bold flex items-center justify-center rounded-full mx-auto mb-4 shadow-md">
            {{ user.name.charAt(0) }}
          </div>
          <h2 class="font-bold text-lg text-slate-800">{{ user.name }}</h2>
          <p class="text-sm text-slate-500">{{ user.email }}</p>
          
          <div class="mt-6 flex justify-center gap-2">
            <span class="px-3 py-1 bg-emerald-50 text-primary text-xs font-bold rounded-full border border-emerald-100">
              Penderma
            </span>
            <span v-if="isAdmin" class="px-3 py-1 bg-amber-50 text-warning text-xs font-bold rounded-full border border-amber-100">
              Administrator
            </span>
          </div>
        </UiAppCard>

        <!-- Menu -->
        <UiAppCard no-padding>
          <div class="divide-y divide-slate-100">
            <NuxtLink to="/riwayat" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div class="flex items-center gap-3">
                <Clock class="w-5 h-5 text-slate-400" />
                <span class="text-sm font-medium text-slate-700">Riwayat Donasi</span>
              </div>
              <ChevronRight class="w-4 h-4 text-slate-300" />
            </NuxtLink>
            <button @click="logout" class="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div class="flex items-center gap-3">
                <LogOut class="w-5 h-5 text-danger" />
                <span class="text-sm font-medium text-danger">Keluar</span>
              </div>
            </button>
          </div>
        </UiAppCard>
      </div>

      <div v-else class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-slate-100 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-4">
            <UserIcon class="w-10 h-10" />
          </div>
          <h2 class="font-bold text-xl text-slate-800">{{ isRegister ? 'Daftar Akun' : 'Masuk' }}</h2>
          <p class="text-sm text-slate-500">Silakan {{ isRegister ? 'buat akun baru' : 'masuk ke akun Anda' }} untuk berdonasi lebih mudah.</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="isRegister">
            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Masukkan nama lengkap"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="email@contoh.com"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              required
              class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            >
          </div>

          <div v-if="error" class="text-xs text-danger bg-red-50 p-3 rounded-lg border border-red-100">
            {{ error }}
          </div>

          <UiAppButton :loading="loading" full size="lg" type="submit">
            {{ isRegister ? 'Daftar Sekarang' : 'Masuk' }}
          </UiAppButton>
        </form>

        <div class="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400 uppercase tracking-widest before:content-[''] before:h-px before:flex-1 before:bg-slate-100 after:content-[''] after:h-px after:flex-1 after:bg-slate-100">
          Atau
        </div>

        <button 
          @click="loginWithGoogle"
          class="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" />
          Masuk dengan Google
        </button>

        <p class="mt-8 text-center text-sm text-slate-500">
          {{ isRegister ? 'Sudah punya akun?' : 'Belum punya akun?' }}
          <button @click="isRegister = !isRegister" class="text-primary font-bold hover:underline ml-1">
            {{ isRegister ? 'Masuk di sini' : 'Daftar di sini' }}
          </button>
        </p>

        <!-- <div v-if="isDev" class="mt-8 pt-8 border-t border-dashed border-slate-200">
          <p class="text-xs text-slate-400 mb-4 text-center">Mode Development</p>
          <UiAppButton @click="loginAsMockAdmin" variant="outline" full size="sm">
            Mock Login (Admin)
          </UiAppButton>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User as UserIcon, Clock, LogOut, ChevronRight } from 'lucide-vue-next'

const { user, isLoggedIn, isAdmin, pending, loginWithGoogle, loginAsMockAdmin, loginWithPassword, register, logout } = useAuth()
const isDev = process.dev

const isRegister = ref(false)
const loading = ref(false)
const error = ref('')
const form = ref({
  email: '',
  password: '',
  name: ''
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  let res
  if (isRegister.value) {
    res = await register(form.value)
  } else {
    res = await loginWithPassword({ email: form.value.email, password: form.value.password })
  }

  if (res.success) {
    // Session is handled by useAuth refresh inside login/register functions
  } else {
    error.value = res.message || 'Terjadi kesalahan'
  }
  
  loading.value = false
}
</script>
