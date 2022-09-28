<script setup lang="ts">
import { wallpapers, user } from "@/configs";
import { ref } from "vue";
import { useSystemStore } from "@/stores/system";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  (e: "setLogin", val: boolean): void;
  (e: "shutMac"): void;
  (e: "sleepMac"): void;
  (e: "restartMac"): void;
}>();

const password = ref("");
const sign = ref("Click to enter");
const { dark } = storeToRefs(useSystemStore());

const loginHandle = () => {
  if (user.password === "" || user.password === password.value) {
    // not set password or password correct
    emit("setLogin", true);
  } else if (password.value !== "") {
    // password not null and incorrect
    sign.value = "Incorrect password";
  }
};
</script>

<template>
  <div
    class="w-full h-full login text-center"
    :style="{
      background: `url(${
        dark ? wallpapers.night : wallpapers.day
      }) center/cover no-repeat`,
    }"
    @click="loginHandle"
  >
    <div class="inline-block w-auto relative top-1/2 -mt-40">
      <!-- Avatar -->
      <img
        class="rounded-full w-24 h-24 my-0 mx-auto"
        :src="user.avatar"
        alt="img"
      />
      <div class="font-semibold mt-2 text-xl text-white">{{ user.name }}</div>

      <!-- Password Input -->
      <div
        class="mx-auto grid grid-cols-5 w-44 h-8 mt-4 rounded-md backdrop-blur-2xl"
        bg="gray-300 opacity-50"
      >
        <input
          class="text-sm text-white col-start-1 col-span-4 no-outline bg-transparent px-2 border-0"
          type="password"
          placeholder="Enter Password"
          @click.stop="() => {}"
          @keyup.enter="loginHandle"
          v-model="password"
        />
        <div class="col-start-5 col-span-1 flex-center">
          <div class="ml-1 i-bi-question-square-fill" color="white" />
        </div>
      </div>
      <div class="text-sm mt-2 text-gray-200 cursor-pointer">{{ sign }}</div>
    </div>

    <!-- buttons -->
    <div
      class="text-sm fixed bottom-16 left-0 right-0 mx-auto flex flex-row space-x-4 w-max"
    >
      <div
        class="flex-center-v flex-col text-white w-24 cursor-pointer"
        @click="emit('sleepMac')"
      >
        <div class="h-10 w-10 bg-gray-700 rounded-full inline-flex-center">
          <div class="i-gg-sleep text-base w-full h-full" />
        </div>
        <span>Sleep</span>
      </div>
      <div
        class="flex-center-v flex-col text-white w-24 cursor-pointer"
        @click="emit('restartMac')"
      >
        <div class="h-10 w-10 bg-gray-700 rounded-full inline-flex-center">
          <div class="i-ri-restart-line text-base w-full h-full" />
        </div>
        <span>Restart</span>
      </div>
      <div
        class="flex-center-v flex-col text-white w-24 cursor-pointer"
        @click="emit('shutMac')"
      >
        <div class="h-10 w-10 bg-gray-700 rounded-full inline-flex-center">
          <div class="i-ri-shut-down-line text-base w-full h-full" />
        </div>
        <span>Shut Down</span>
      </div>
    </div>
  </div>
</template>
