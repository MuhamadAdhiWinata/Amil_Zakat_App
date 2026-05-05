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

      <div v-else class="text-center py-12">
        <div class="w-20 h-20 bg-slate-100 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-6">
          <User class="w-10 h-10" />
        </div>
        <h2 class="font-bold text-xl text-slate-800 mb-2">Belum Masuk</h2>
        <p class="text-sm text-slate-500 mb-8 px-4">Masuk untuk melihat riwayat donasi dan mengelola profil Anda.</p>
        
        <UiAppButton @click="loginWithGoogle" full size="lg" class="mb-4">
          Masuk dengan Google
        </UiAppButton>

        <div v-if="isDev" class="mt-8 pt-8 border-t border-dashed border-slate-200">
          <p class="text-xs text-slate-400 mb-4">Mode Development</p>
          <UiAppButton @click="loginAsMockAdmin" variant="outline" full size="sm">
            Mock Login (Admin)
          </UiAppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Clock, LogOut, ChevronRight } from 'lucide-vue-next'

const { user, isLoggedIn, isAdmin, pending, loginWithGoogle, loginAsMockAdmin, logout } = useAuth()
const isDev = process.dev
</script>
