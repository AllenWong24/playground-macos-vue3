<script setup lang="ts">
useHead({
  title: 'Login',
})

const systemStore = useSystemStore()
const authStore = useAuthStore()

const password = ref('')
const sign = ref('Click to enter')

function login() {
  if (GLOBAL_CONFIG_USER.password === password.value || password.value === '') {
    // not set password or password correct
    authStore.login(GLOBAL_CONFIG_USER.name)
    navigateTo('/desktop')
  }
  else if (password.value !== '') {
    // password not null and incorrect
    sign.value = 'Password is "666" 🤣'
  }
}

const background = computed(() => {
  return `url(${
    systemStore.dark ? GLOBAL_CONFIG_WALLPAPERS.night : GLOBAL_CONFIG_WALLPAPERS.day
  }) center/cover no-repeat`
})
</script>

<template>
  <div
    class="login h-full w-full text-center"
    :style="{ background }"
    @click="login"
  >
    <div class="relative top-1/2 inline-block w-auto -mt-40">
      <!-- Avatar -->
      <img
        class="mx-auto my-0 h-24 w-24 rounded-full backdrop-blur"
        :src="GLOBAL_CONFIG_USER.avatar"
        alt="img"
      >
      <div class="mt-2 text-xl text-white font-semibold">
        {{ GLOBAL_CONFIG_USER.name }}
      </div>

      <!-- Password Input -->
      <div
        class="grid grid-cols-5 mx-auto mt-4 h-8 w-44 rounded-md backdrop-blur-2xl"
        bg="gray-300 opacity-50"
      >
        <input
          v-model="password"
          class="col-span-4 col-start-1 border-0 bg-transparent px-2 text-sm text-white no-outline"
          type="password"
          placeholder="Enter Password"
          @click.stop="() => {}"
          @keyup.enter="login"
        >
        <div class="col-span-1 col-start-5 flex-center">
          <Icon name="f7:question-square-fill" color="white" class="w-4/5 h-4/5" />
        </div>
      </div>
      <div class="mt-2 cursor-pointer text-sm text-gray-200">
        {{ sign }}
      </div>
    </div>

    <!-- buttons -->
    <div
      class="fixed bottom-16 left-0 right-0 mx-auto w-max flex flex-row text-sm space-x-4"
    >
      <div
        class="w-24 flex-center-v flex-col cursor-pointer text-white"
        @click="navigateTo('/boot/sleep')"
      >
        <div class="h-10 w-10 inline-flex-center rounded-full bg-gray-700">
          <Icon name="i-gg-sleep" class="h-full w-full text-base" />
        </div>
        <span>Sleep</span>
      </div>
      <div
        class="w-24 flex-center-v flex-col cursor-pointer text-white"
        @click="navigateTo('/boot/restart')"
      >
        <div class="h-10 w-10 inline-flex-center rounded-full bg-gray-700">
          <Icon name="i-ri-restart-line" class="h-full w-full text-base" />
        </div>
        <span>Restart</span>
      </div>
      <div
        class="w-24 flex-center-v flex-col cursor-pointer text-white"
        @click="navigateTo('/boot/shutdown')"
      >
        <div class="h-10 w-10 inline-flex-center rounded-full bg-gray-700">
          <Icon name="i-ri-shut-down-line" class="h-full w-full text-base" />
        </div>
        <span>Shut Down</span>
      </div>
    </div>
  </div>
</template>
