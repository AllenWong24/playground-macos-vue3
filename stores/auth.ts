export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('token')

  const isLogin = computed(() => !!token.value)

  const login = (userName: string) => {
    token.value = userName
  }

  return {
    isLogin,
    login,
  }
})
