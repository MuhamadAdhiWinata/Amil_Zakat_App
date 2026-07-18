<template>
  <button
    v-if="canInstall"
    @click="install"
    class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all"
    title="Install Aplikasi"
  >
    <Download class="w-4 h-4" />
  </button>
</template>

<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const canInstall = ref(false)
let deferredPrompt: any = null
const { info } = useToast()

const onBeforeInstall = (e: Event) => {
  e.preventDefault()
  deferredPrompt = e
  canInstall.value = true
}

const onInstalled = () => {
  canInstall.value = false
  deferredPrompt = null
}

function checkStandalone() {
  if (import.meta.client) {
    canInstall.value = !window.matchMedia('(display-mode: standalone)').matches
  }
}

onMounted(() => {
  checkStandalone()
  window.addEventListener('beforeinstallprompt', onBeforeInstall)
  window.addEventListener('appinstalled', onInstalled)
  window.matchMedia('(display-mode: standalone)').addEventListener('change', checkStandalone)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  window.removeEventListener('appinstalled', onInstalled)
  window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkStandalone)
})

const install = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
    canInstall.value = false
  } else {
    info(
      'Install Aplikasi',
      'Buka menu browser, pilih "Add to Home Screen" atau "Install App"'
    )
  }
}
</script>
