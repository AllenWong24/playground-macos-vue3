<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { user, wallpapers } from '@/configs'
import { useSystemStore } from '@/stores/system'

interface Emit {
  (e: 'setLogin', val: boolean): void
  (e: 'shutMac'): void
  (e: 'sleepMac'): void
  (e: 'restartMac'): void
}

const emit = defineEmits<Emit>()

const password = ref('')
const sign = ref('Click to enter')
const { dark } = storeToRefs(useSystemStore())

function loginHandle() {
  if (user.password === '' || user.password === password.value) {
    // not set password or password correct
    emit('setLogin', true)
  }
  else if (password.value !== '') {
    // password not null and incorrect
    sign.value = 'Incorrect password'
  }
}
</script>

<template>
  <div
    class="login h-full w-full text-center"
    :style="{
      background: `url(${
        dark ? wallpapers.night : wallpapers.day
      }) center/cover no-repeat`,
    }"
    @click="loginHandle"
  >
    <div class="relative top-1/2 inline-block w-auto -mt-40">
      <!-- Avatar -->
      <img
        class="mx-auto my-0 h-24 w-24 rounded-full"
        :src="user.avatar"
        alt="img"
      >
      <div class="mt-2 text-xl text-white font-semibold">
        {{ user.name }}
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
          @keyup.enter="loginHandle"
        >
        <div class="col-span-1 col-start-5 flex-center">
          <div class="i-bi-question-square-fill ml-1" color="white" />
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
        @click="emit('sleepMac')"
      >
        <div class="h-10 w-10 inline-flex-center rounded-full bg-gray-700">
          <div class="i-gg-sleep h-full w-full text-base" />
        </div>
        <span>Sleep</span>
      </div>
      <div
        class="w-24 flex-center-v flex-col cursor-pointer text-white"
        @click="emit('restartMac')"
      >
        <div class="h-10 w-10 inline-flex-center rounded-full bg-gray-700">
          <div class="i-ri-restart-line h-full w-full text-base" />
        </div>
        <span>Restart</span>
      </div>
      <div
        class="w-24 flex-center-v flex-col cursor-pointer text-white"
        @click="emit('shutMac')"
      >
        <div class="h-10 w-10 inline-flex-center rounded-full bg-gray-700">
          <div class="i-ri-shut-down-line h-full w-full text-base" />
        </div>
        <span>Shut Down</span>
      </div>
    </div>
  </div>
</template>
