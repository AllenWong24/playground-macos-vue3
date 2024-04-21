export default defineNuxtRouteMiddleware((to) => {
  const { isLogin } = useAuthStore()

  if (!isLogin && to.path !== '/login')
    return navigateTo('/login')
  else if (to.path === '/')
    return navigateTo('/desktop')
})
