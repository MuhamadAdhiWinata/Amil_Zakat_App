import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title: string
  message?: string
  type: ToastType
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const add = (toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID()
    toasts.value.push({ ...toast, id })
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration || 3000)
    }
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    add,
    remove,
    success: (title: string, message?: string) => add({ title, message, type: 'success' }),
    error: (title: string, message?: string) => add({ title, message, type: 'error' }),
    warning: (title: string, message?: string) => add({ title, message, type: 'warning' }),
    info: (title: string, message?: string) => add({ title, message, type: 'info' }),
  }
}
