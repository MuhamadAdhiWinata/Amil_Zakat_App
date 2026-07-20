export function usePwaInstall() {
  const deferredPrompt = useState<any | null>('pwa-deferred-prompt', () => null)
  const canInstall = useState('pwa-can-install', () => false)
  const pendingInstall = useState('pwa-pending-install', () => false)

  function init() {
    if (!import.meta.client) return

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = !window.matchMedia('(display-mode: standalone)').matches

      if (pendingInstall.value) {
        pendingInstall.value = false
        doInstall()
      }
    })

    window.addEventListener('appinstalled', () => {
      canInstall.value = false
      deferredPrompt.value = null
    })

    window.matchMedia('(display-mode: standalone)').addEventListener('change', () => {
      canInstall.value = !window.matchMedia('(display-mode: standalone)').matches
    })
  }

  async function doInstall() {
    const prompt = deferredPrompt.value
    if (!prompt) return

    prompt.prompt()
    await prompt.userChoice
    deferredPrompt.value = null
    canInstall.value = false
  }

  function install() {
    if (deferredPrompt.value) {
      doInstall()
    } else {
      pendingInstall.value = true
      location.reload()
    }
  }

  return { canInstall, install, init }
}
