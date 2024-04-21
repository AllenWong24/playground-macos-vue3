const WHITE_LIST = ['/login', '/boot']

export default defineNuxtRouteMiddleware((to) => {
  const { isLogin } = useAuthStore()

  if (!isLogin && WHITE_LIST.every(item => !to.path.includes(item))) // 排除白名单
    return navigateTo('/login')
  else if (to.path === '/')
    return navigateTo('/desktop')
})
