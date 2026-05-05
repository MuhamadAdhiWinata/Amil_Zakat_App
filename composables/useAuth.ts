import type { User } from '~/shared/types'

export const useAuth = () => {
  // Use useAsyncData for SSR support
  const { data: user, pending, refresh } = useAsyncData<User | null>(
    'auth-user',
    async () => {
      try {
        return await $fetch<User>('/api/auth/me')
      } catch (err) {
        return null
      }
    },
    { server: true }
  )

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'super_admin')

  const loginWithGoogle = () => {
    window.location.href = '/api/auth/google'
  }

  const loginAsMockAdmin = () => {
    window.location.href = '/api/auth/mock'
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      await navigateTo('/')
    } catch (e) {
      console.error(e)
    }
  }

  return {
    user,
    pending,
    isLoggedIn,
    isAdmin,
    loginWithGoogle,
    loginAsMockAdmin,
    logout,
    refreshUser: refresh
  }
}
