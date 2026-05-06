export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAdmin, pending } = useAuth()
  
  // Wait if auth state is still being fetched
  if (pending.value) {
    await new Promise((resolve) => {
      const unwatch = watch(pending, (isPending) => {
        if (!isPending) {
          unwatch()
          resolve(true)
        }
      })
    })
  }

  if (!isAdmin.value) {
    return navigateTo('/')
  }
})
