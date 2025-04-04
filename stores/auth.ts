export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24, // 1 days
  })

  const isLogin = computed(() => !!token.value)

  const login = (userName: string) => {
    token.value = userName
  }

  const logout = () => {
    token.value = ''
    navigateTo('/login')
  }

  return {
    isLogin,
    login,
    logout,
  }
})
